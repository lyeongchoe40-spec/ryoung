import React, { useState } from 'react';
import {
  KeyRound,
  ShieldCheck,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Lock,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';
import { verifyApiKey } from '../lib/geminiApi';

interface ApiKeyActivationCardProps {
  isVerified: boolean;
  onKeyApproved: (apiKey: string) => void;
  onKeyCleared: () => void;
  onProceedToSurvey: () => void;
}

export const ApiKeyActivationCard: React.FC<ApiKeyActivationCardProps> = ({
  isVerified,
  onKeyApproved,
  onKeyCleared,
  onProceedToSurvey,
}) => {
  const [inputKey, setInputKey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | null;
    text: string;
  }>({
    type: null,
    text: '',
  });

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputKey.trim()) {
      setStatusMessage({
        type: 'error',
        text: 'Gemini API Key를 입력해 주세요.',
      });
      return;
    }

    setIsLoading(true);
    setStatusMessage({ type: null, text: '' });

    try {
      const result = await verifyApiKey(inputKey.trim());

      if (result.success) {
        setStatusMessage({
          type: 'success',
          text: result.message || 'API Key 승인이 완료되었습니다. AI 맞춤 정서 케어 서비스가 활성화되었습니다.',
        });
        onKeyApproved(inputKey.trim());
      } else {
        setStatusMessage({
          type: 'error',
          text: result.error || '유효하지 않은 API Key입니다. 키를 다시 확인해 주세요.',
        });
      }
    } catch {
      setStatusMessage({
        type: 'error',
        text: '키 검증 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetKey = () => {
    setInputKey('');
    setStatusMessage({ type: null, text: '' });
    onKeyCleared();
  };

  return (
    <div
      id="gemini-key-activation-section"
      className="bg-[#FFFDF9] rounded-3xl border-2 border-[#E7DCCE] p-6 sm:p-8 shadow-xs botanical-frame space-y-6"
    >
      {/* Header & Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EADBCE] pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F9ECE8] text-[#8C3E30] border border-[#E9C4BC]">
            <KeyRound className="w-3.5 h-3.5 text-[#C87D6F]" />
            <span>AI 맞춤 정서소진 케어 엔진</span>
            <span className="text-[#C87D6F]">~ ✤ ~</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#2C241E]">
            Gemini API Key 활성화 및 승인
          </h3>
          <p className="text-xs sm:text-sm text-[#7A6A5E] leading-relaxed">
            API Key를 승인하면 일반 자가점검 외에 <strong className="text-[#2C241E]">상담원 맞춤 AI 심리 분석 및 현장 회복 처방</strong>을 무료로 이용할 수 있습니다.
          </p>
        </div>

        {/* Verification Status Badge */}
        <div className="shrink-0">
          {isVerified ? (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#EAF3EA] text-[#2F6131] border border-[#BBD7B9] shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-[#2F6131]" />
              <span>승인 완료 (AI 활성화)</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#FAF6EE] text-[#8C7564] border border-[#EADBCE]">
              <Lock className="w-3.5 h-3.5 text-[#8C7564]" />
              <span>승인 대기 중</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Activation Form or Active State */}
      {!isVerified ? (
        <form onSubmit={handleVerify} className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="gemini-api-key-input"
                className="text-xs sm:text-sm font-bold text-[#2C241E] flex items-center gap-1.5"
              >
                <span>Google Gemini API Key</span>
                <span className="text-rose-600">*</span>
              </label>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#8C3E30] hover:text-[#5A241C] underline flex items-center gap-1 transition-colors"
              >
                <span>Google AI Studio에서 무료 키 발급받기</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Input with Show/Hide Toggle */}
            <div className="relative">
              <input
                id="gemini-api-key-input"
                type={showPassword ? 'text' : 'password'}
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="AIzaSy... 형식의 API Key를 입력해 주세요"
                disabled={isLoading}
                autoComplete="off"
                className="w-full pl-4 pr-11 py-3 text-xs sm:text-sm rounded-xl bg-[#FAF7F2] border-2 border-[#D8C7B5] focus:border-[#C87D6F] focus:bg-white text-[#2C241E] outline-none transition-all placeholder:text-[#9E8E81]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C7564] hover:text-[#2C241E] p-1 rounded-md transition-colors cursor-pointer"
                title={showPassword ? '키 숨기기' : '키 보기'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Action Button & Submit */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
            <button
              id="verify-gemini-key-btn"
              type="submit"
              disabled={isLoading || !inputKey.trim()}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#8C3729] hover:bg-[#6E2B1F] disabled:bg-[#D8C7B5] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Google 서버와 통신 및 유효성 확인 중...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>유효성 확인 및 승인</span>
                </>
              )}
            </button>

            <span className="text-xs text-[#7A6A5E]">
              서버 대 서버 통신으로 브라우저 CORS 오류 없이 즉시 검증됩니다.
            </span>
          </div>
        </form>
      ) : (
        /* Verified State UI */
        <div className="bg-[#EAF3EA]/80 border border-[#BBD7B9] rounded-2xl p-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#2F6131] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm sm:text-base font-bold text-[#1F4220]">
                  Gemini API Key가 성공적으로 승인 및 활성화되었습니다
                </h4>
                <p className="text-xs text-[#2F6131] leading-relaxed">
                  이제 15개 자가점검 문항 완료 후, AI가 상담원의 응답 패턴과 심리 소진 영역을 정밀 분석하여 개인화된 심리 처방전을 실시간 생성해 드립니다.
                </p>
              </div>
            </div>

            <button
              onClick={handleResetKey}
              className="text-xs text-[#6B5E54] hover:text-[#8C3729] flex items-center gap-1 shrink-0 p-1.5 rounded-lg hover:bg-white/60 transition-colors cursor-pointer"
              title="API Key 변경 또는 연결 해제"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>키 재설정</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#BBD7B9]/60">
            <span className="text-xs text-[#3B543D] font-medium">
              ✓ 브라우저 메모리에 일회성으로 안전하게 보관 중입니다.
            </span>

            <button
              onClick={onProceedToSurvey}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2F6131] hover:bg-[#234A25] text-white text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer"
            >
              <span>자가점검 바로 시작하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Alert / Status Message Display */}
      {statusMessage.type && (
        <div
          className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
            statusMessage.type === 'success'
              ? 'bg-[#EAF3EA] border-[#BBD7B9] text-[#1F4220]'
              : 'bg-[#FDF0EE] border-[#E8A599] text-[#7A1E12]'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-[#2F6131] shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-[#8C3729] shrink-0 mt-0.5" />
          )}
          <div className="space-y-0.5 flex-1">
            <strong className="text-xs sm:text-sm font-bold block">
              {statusMessage.type === 'success' ? '승인 성공 안내' : '확인 오류 안내'}
            </strong>
            <p className="text-xs leading-relaxed">{statusMessage.text}</p>
          </div>
        </div>
      )}

      {/* Security Guarantee Notice */}
      <div className="bg-[#FAF7F2] rounded-xl p-3.5 border border-[#EADBCE] flex items-center gap-2.5 text-xs text-[#6E6155]">
        <Lock className="w-4 h-4 text-[#8C3E30] shrink-0" />
        <p className="leading-relaxed">
          <strong className="text-[#2C241E]">🔒 보안 안내:</strong> 입력하신 API Key는 서버나 DB에 일절 저장되지 않으며, 요청 처리 순간에만 메모리에서 일회성으로 사용된 후 세션 종료(브라우저 창을 닫을 시) 시 즉시 파기됩니다.
        </p>
      </div>
    </div>
  );
};
