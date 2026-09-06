/**
 * Gemini API Client Service
 * 
 * Supports Dual-Engine architecture:
 * 1. Primary: Server-side API routes (/api/verify-key and /api/gemini)
 * 2. Fallback: Direct Google Gemini API communication if server is unreachable
 *    (e.g., deployed as a static site or SPA on Vercel, Netlify, or GitHub Pages).
 * 
 * Never persists raw API key to localStorage or sessionStorage.
 */

export interface VerifyKeyResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface AiCounselorResponse {
  success: boolean;
  advice?: string;
  error?: string;
}

/**
 * Direct Google Gemini API Key validation fallback
 * Used when running on Vercel static hosting or when /api route is not available.
 */
async function verifyWithGoogleDirect(apiKey: string): Promise<VerifyKeyResponse> {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey.trim())}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMsg = data?.error?.message || '';
      const reason = data?.error?.details?.[0]?.reason || '';

      if (
        reason === 'API_KEY_INVALID' ||
        errorMsg.includes('API key not valid') ||
        errorMsg.includes('API_KEY_INVALID') ||
        response.status === 400
      ) {
        return {
          success: false,
          error: '유효하지 않은 Gemini API Key입니다. Google AI Studio에서 발급받은 올바른 키인지 다시 확인해 주세요.',
        };
      }
      if (response.status === 403 || reason === 'PERMISSION_DENIED') {
        return {
          success: false,
          error: 'Gemini API 접근 권한이 없거나 키가 비활성화되어 있습니다.',
        };
      }
      if (response.status === 429 || reason === 'RESOURCE_EXHAUSTED') {
        return {
          success: false,
          error: 'Google API 호출 한도를 초과했습니다. 잠시 후 다시 시도해 주세요.',
        };
      }
      return {
        success: false,
        error: errorMsg || `API Key 검증 오류 (상태 코드: ${response.status})`,
      };
    }

    return {
      success: true,
      message: 'Gemini API Key 승인이 완료되었습니다. AI 맞춤 정서 케어 서비스가 활성화되었습니다.',
    };
  } catch (err: unknown) {
    console.error('[Gemini API Direct] Verification error:', err);
    return {
      success: false,
      error: 'Google Gemini 서버와 통신할 수 없습니다. 인터넷 연결 및 브라우저 확장 프로그램(광고 차단기 등)을 확인해 주세요.',
    };
  }
}

/**
 * Direct Google Gemini content generation fallback
 * Used when running on Vercel static hosting or when /api route is not available.
 * Tries modern Flash models in order.
 */
async function generateAiCounselorAdviceDirect(
  apiKey: string,
  prompt: string
): Promise<AiCounselorResponse> {
  const candidateModels = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-2.0-flash'];
  let lastError = '';

  for (const model of candidateModels) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey.trim())}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          },
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        return {
          success: true,
          advice: data.candidates[0].content.parts[0].text,
        };
      }

      if (!response.ok) {
        lastError = data?.error?.message || `HTTP ${response.status}`;
        if (response.status === 404) {
          // Model not found, try next candidate model
          continue;
        }
        if (response.status === 400 || response.status === 403 || response.status === 429) {
          // Hard auth/quota failure, stop
          break;
        }
      }
    } catch (err) {
      console.warn(`[Gemini API Direct] Model ${model} request error, trying next...`, err);
    }
  }

  return {
    success: false,
    error: lastError || 'AI 맞춤 회복 처방 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
  };
}

/**
 * Gemini API Key validation
 * Tries server route (/api/verify-key) first, then falls back seamlessly to direct Google API call.
 */
export async function verifyApiKey(apiKey: string): Promise<VerifyKeyResponse> {
  const cleanKey = apiKey?.trim() || '';
  if (!cleanKey) {
    return {
      success: false,
      error: 'Gemini API Key를 입력해 주세요.',
    };
  }

  // 1. Try server route first (for Cloud Run / Express backend environments)
  try {
    const response = await fetch('/api/verify-key', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ apiKey: cleanKey }),
    });

    const contentType = response.headers.get('content-type') || '';
    if (response.ok && contentType.includes('application/json')) {
      const data = await response.json();

      if (data.valid === true) {
        return {
          success: true,
          message: data.message || 'Gemini API Key 승인이 완료되었습니다.',
        };
      }
      if (data.valid === false && data.error) {
        return {
          success: false,
          error: data.error,
        };
      }
    }

    // If server returned 404, 502, HTML (e.g. Vercel static build or SPA fallback), fall through to direct fallback
    console.warn('[Gemini API] Server route not responding with valid JSON status, switching to direct Google Gemini API for Vercel/Static hosting');
  } catch (err: unknown) {
    // Network error reaching /api (e.g. static hosting without backend server)
    console.warn('[Gemini API] Server route unreachable, switching to direct Google Gemini API for Vercel/Static hosting');
  }

  // 2. Direct fallback to Google Gemini endpoint (for Vercel, Netlify, GitHub Pages)
  return verifyWithGoogleDirect(cleanKey);
}

/**
 * Request AI Personalized Empathy & Recovery Prescription
 * Tries server route (/api/gemini) first, then falls back seamlessly to direct Google API call.
 */
export async function generateAiCounselorAdvice(
  apiKey: string,
  context: {
    totalScore: number;
    maxTotalScore: number;
    riskTierLabel: string;
    summaryTitle: string;
    highestRiskDomains: string[];
  }
): Promise<AiCounselorResponse> {
  const prompt = `
당신은 고용노동부 고용복지+센터 실업급여 지급 창구에서 근무하는 상담원들의 정서적 안전을 지키고 직무 소진을 보듬는 전문 심리 멘토입니다.

[상담원 검사 결과 데이터]
- 총점: ${context.totalScore}점 / ${context.maxTotalScore}점
- 소진 수준: ${context.riskTierLabel} (${context.summaryTitle})
- 중점 케어 필요 영역: ${context.highestRiskDomains.join(', ') || '전반적 양호'}

[작성 지침]
1. 상담원의 헌신과 노고를 깊이 인정하고, "당신의 탓이 아니며 제도의 한계와 민원 과부하에서 오는 필연적 반응"임을 따뜻하게 확인시켜 주세요.
2. 실업급여 창구 특유의 반복되는 수급자 불만(수급 자격 제한, 출석 대기 시간 불만, 서류 미비 등)과 악성 민원 상황에서 자신을 정서적으로 분리할 수 있는 1가지 현장 팁(단호하지만 공손한 방어 화법 등)을 제안해 주세요.
3. 퇴근 후 즉각 뇌의 긴장을 끄고 회복할 수 있는 작은 '퇴근 리추얼' 1가지를 구체적으로 추천해 주세요.
4. 문체: 정중하고 부드러운 한국어 경어체(~해요, ~합니다).
5. 분량: 3~4개 짧은 문단 (모바일에서 읽기 편하게).
`;

  // 1. Try server route first
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: apiKey.trim(),
        prompt,
      }),
    });

    const contentType = response.headers.get('content-type') || '';
    if (response.ok && contentType.includes('application/json')) {
      const data = await response.json();

      if (data.text) {
        return {
          success: true,
          advice: data.text,
        };
      }
    }

    console.warn('[Gemini API] Server returned non-OK or non-JSON, using direct generation for Vercel/Static hosting');
  } catch (err: unknown) {
    console.warn('[Gemini API] Server route unreachable, using direct generation for Vercel/Static hosting');
  }

  // 2. Direct fallback to Google Gemini endpoint
  return generateAiCounselorAdviceDirect(apiKey, prompt);
}
