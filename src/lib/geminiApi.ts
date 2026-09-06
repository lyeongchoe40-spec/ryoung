/**
 * Gemini API Client Service
 * 
 * Communicates ONLY with backend server routes (/api/verify-key and /api/gemini).
 * Never communicates directly from browser to Google endpoints.
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
 * Server-to-Server Gemini API Key validation
 */
export async function verifyApiKey(apiKey: string): Promise<VerifyKeyResponse> {
  if (!apiKey || apiKey.trim() === '') {
    return {
      success: false,
      error: 'Gemini API Key를 입력해 주세요.',
    };
  }

  try {
    const response = await fetch('/api/verify-key', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ apiKey: apiKey.trim() }),
    });

    const data = await response.json();

    if (!response.ok || !data.valid) {
      return {
        success: false,
        error: data.error || 'API Key 검증에 실패하였습니다. 다시 확인해 주세요.',
      };
    }

    return {
      success: true,
      message: data.message || 'Gemini API Key 승인이 완료되었습니다.',
    };
  } catch (err: unknown) {
    console.error('[Gemini API] Verification request failed');
    return {
      success: false,
      error: '서버와 통신할 수 없습니다. 네트워크 연결 상태를 확인해 주세요.',
    };
  }
}

/**
 * Request AI Personalized Empathy & Recovery Prescription via server-side route
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
  try {
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

    const data = await response.json();

    if (!response.ok || !data.text) {
      return {
        success: false,
        error: data.error || 'AI 맞춤 회복 처방을 생성하는 중 오류가 발생했습니다.',
      };
    }

    return {
      success: true,
      advice: data.text,
    };
  } catch (err: unknown) {
    console.error('[Gemini API] Generation request failed');
    return {
      success: false,
      error: '서버와 통신하는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    };
  }
}
