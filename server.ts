import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser for JSON
  app.use(express.json({ limit: '2mb' }));

  // CORS headers for safety across any deployment environment
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
  });

  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // 1. API Key Verification & Approval Route
  // Validates user-provided Gemini API Key server-to-server without logging secrets
  app.post('/api/verify-key', async (req: Request, res: Response) => {
    const { apiKey } = req.body || {};

    if (!apiKey || typeof apiKey !== 'string' || apiKey.trim() === '') {
      return res.status(400).json({
        valid: false,
        error: 'API Key가 입력되지 않았습니다. 올바른 키를 입력해 주세요.',
      });
    }

    const trimmedKey = apiKey.trim();

    // Security check: Basic pattern verification (Google API keys usually start with 'AIzaSy' and are 39 characters)
    if (trimmedKey.length < 20) {
      return res.status(400).json({
        valid: false,
        error: '입력하신 키의 길이가 너무 짧거나 유효한 Google API Key 형식이 아닙니다.',
      });
    }

    try {
      // Ephemeral in-memory client initialization (never saved to database or file system)
      const ai = new GoogleGenAI({ apiKey: trimmedKey });
      const verifyModels = ['gemini-3.7-flash', 'gemini-3.6-flash', 'gemini-flash-latest', 'gemini-3.8-flash'];
      let verified = false;
      let lastErr: unknown = null;

      for (const m of verifyModels) {
        try {
          const response = await ai.models.generateContent({
            model: m,
            contents: 'Ping',
            config: {
              thinkingConfig: { thinkingBudget: 0 },
              maxOutputTokens: 20,
              temperature: 0.1,
            },
          });

          if (response && (response.text || response.candidates?.length)) {
            verified = true;
            break;
          }
        } catch (mErr) {
          lastErr = mErr;
          const msg = mErr instanceof Error ? mErr.message : String(mErr);
          if (msg.includes('API_KEY_INVALID') || msg.includes('API key not valid') || msg.includes('401')) {
            break; // No need to try other models for invalid API key
          }
        }
      }

      if (verified) {
        return res.json({
          valid: true,
          message: 'Gemini API Key가 성공적으로 검증 및 승인되었습니다.',
        });
      }

      if (lastErr) {
        throw lastErr;
      }

      return res.status(500).json({
        valid: false,
        error: 'API 응답 확인 중 예상치 못한 결과가 반환되었습니다.',
      });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      
      // Categorize common Gemini error responses safely without leaking sensitive information
      if (errorMsg.includes('API_KEY_INVALID') || errorMsg.includes('API key not valid') || errorMsg.includes('400')) {
        return res.status(401).json({
          valid: false,
          error: '유효하지 않은 Gemini API Key입니다. Google AI Studio에서 올바른 키인지 다시 확인해 주세요.',
        });
      }

      if (errorMsg.includes('PERMISSION_DENIED') || errorMsg.includes('403')) {
        return res.status(403).json({
          valid: false,
          error: '해당 API Key의 접근 권한이 없거나 제한되었습니다.',
        });
      }

      if (errorMsg.includes('RESOURCE_EXHAUSTED') || errorMsg.includes('429')) {
        return res.status(429).json({
          valid: false,
          error: 'Google Gemini API 요청 한도(Quota)를 초과하였습니다. 잠시 후 다시 시도해 주세요.',
        });
      }

      return res.status(500).json({
        valid: false,
        error: 'Google 서버와의 통신 중 오류가 발생했습니다. 네트워크 상태 및 키 설정을 확인해 주세요.',
      });
    }
  });

  // 2. Gemini AI Counselor & Report Generation Route
  // Generates personalized empathy message and custom recovery prescription using the verified key in memory
  app.post('/api/gemini', async (req: Request, res: Response) => {
    const { apiKey, prompt, systemInstruction } = req.body || {};

    const effectiveKey = (typeof apiKey === 'string' && apiKey.trim()) ? apiKey.trim() : process.env.GEMINI_API_KEY;

    if (!effectiveKey) {
      return res.status(401).json({
        error: '승인된 Gemini API Key가 없습니다. 먼저 랜딩페이지에서 API Key를 승인해 주세요.',
      });
    }

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({
        error: '요청 프롬프트가 누락되었습니다.',
      });
    }

    try {
      const ai = new GoogleGenAI({ apiKey: effectiveKey });
      const geminiModels = ['gemini-3.7-flash', 'gemini-3.6-flash', 'gemini-flash-latest', 'gemini-3.8-flash'];
      let outputText: string | undefined;
      let lastErr: unknown = null;

      for (const modelName of geminiModels) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
              systemInstruction:
                systemInstruction ||
                '당신은 고용센터 실업급여팀 상담원의 극심한 직무 스트레스와 정서소진을 보듬고 공감하며 실무적인 대응 방안을 조언하는 따뜻하고 전문적인 심리 회복 멘토입니다.',
              temperature: 0.7,
            },
          });

          if (response && response.text) {
            outputText = response.text;
            break;
          }
        } catch (mErr) {
          lastErr = mErr;
          const msg = mErr instanceof Error ? mErr.message : String(mErr);
          if (msg.includes('RESOURCE_EXHAUSTED') || msg.includes('429')) {
            return res.status(429).json({
              error: 'API 요청 한도를 초과했습니다. 잠시 후 다시 시도해 주세요.',
            });
          }
          console.warn(`[server.ts] Model ${modelName} request failed, trying next candidate...`, msg);
        }
      }

      if (outputText) {
        return res.json({
          text: outputText,
        });
      }

      if (lastErr) {
        throw lastErr;
      }

      return res.status(500).json({
        error: 'AI 응답을 생성하지 못했습니다. 잠시 후 다시 시도해 주세요.',
      });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);

      if (errorMsg.includes('RESOURCE_EXHAUSTED') || errorMsg.includes('429')) {
        return res.status(429).json({
          error: 'API 요청 한도를 초과했습니다. 잠시 후 다시 시도해 주세요.',
        });
      }

      return res.status(500).json({
        error: 'AI 응답 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
