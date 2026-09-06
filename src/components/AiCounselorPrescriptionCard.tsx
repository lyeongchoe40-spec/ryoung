import React, { useState } from 'react';
import {
  Sparkles,
  HeartHandshake,
  Loader2,
  Copy,
  Check,
  RotateCcw,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import { AssessmentResult } from '../types';
import { generateAiCounselorAdvice } from '../lib/geminiApi';

interface AiCounselorPrescriptionCardProps {
  result: AssessmentResult;
  apiKey: string;
  isKeyVerified: boolean;
  onNavigateToKeyActivation: () => void;
}

export const AiCounselorPrescriptionCard: React.FC<AiCounselorPrescriptionCardProps> = ({
  result,
  apiKey,
  isKeyVerified,
  onNavigateToKeyActivation,
}) => {
  const [adviceText, setAdviceText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerateAdvice = async () => {
    if (!isKeyVerified || !apiKey) {
      onNavigateToKeyActivation();
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const highestDomainTitles = result.highestRiskDomains.map((code) => {
      const names: Record<string, string> = {
        A: '영역 A(업무량·예측불가성)',
        B: '영역 B(정서적 소진·악성민원)',
        C: '영역 C(퇴근 후 잔여 스트레스·불면)',
        D: '영역 D(업무 통제감·대처자원 부족)',
        E: '영역 E(조직적 지지·안전망 부재)',
      };
      return names[code] || code;
    });

    try {
      const res = await generateAiCounselorAdvice(apiKey, {
        totalScore: result.totalScore,
        maxTotalScore: result.maxTotalScore,
        riskTierLabel: result.riskTier.label,
        summaryTitle: result.riskTier.summaryTitle,
        highestRiskDomains: highestDomainTitles,
      });

      if (res.success && res.advice) {
        setAdviceText(res.advice);
      } else {
        setErrorMessage(res.error || '처방전 생성에 실패했습니다. 다시 시도해 주세요.');
      }
    } catch {
      setErrorMessage('AI 서버와의 통신 중 문제가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!adviceText) return;
    navigator.clipboard.writeText(adviceText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div
      id="ai-counselor-prescription-card"
      className="bg-[#FFFDF9] rounded-3xl border-2 border-[#E7DCCE] p-6 sm:p-7 shadow-xs botanical-frame space-y-5"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EADBCE] pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F9ECE8] text-[#8C3E30] border border-[#E9C4BC]">
            <Sparkles className="w-3.5 h-3.5 text-[#C87D6F]" />
            <span>Gemini AI 심리 멘토링</span>
            <span className="text-[#C87D6F]">~ ✤ ~</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#2C241E]">
            상담원 전용 AI 맞춤 정서 케어 처방전
          </h3>
          <p className="text-xs sm:text-sm text-[#7A6A5E] leading-relaxed">
            자가점검 응답 지수를 기반으로 실업급여 창구 현장 맞춤형 감정 분리 팁과 회복 리추얼을 실시간 생성합니다.
          </p>
        </div>

        <div className="shrink-0">
          {isKeyVerified ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EAF3EA] text-[#2F6131] border border-[#BBD7B9]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Gemini 활성화됨</span>
            </span>
          ) : (
            <button
              onClick={onNavigateToKeyActivation}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF6EE] text-[#8C3E30] hover:bg-[#F9ECE8] border border-[#EADBCE] transition-colors cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>API Key 승인 필요</span>
            </button>
          )}
        </div>
      </div>

      {/* Content Area */}
      {!adviceText ? (
        <div className="bg-[#FAF7F2] rounded-2xl p-6 text-center space-y-4 border border-[#EADBCE]">
          <div className="w-12 h-12 rounded-2xl bg-[#FFFDF9] text-[#C87D6F] flex items-center justify-center mx-auto border border-[#EADBCE] shadow-2xs">
            <HeartHandshake className="w-6 h-6" />
          </div>

          <div className="space-y-1.5 max-w-lg mx-auto">
            <h4 className="text-base font-bold text-[#2C241E]">
              나의 소진 지수에 맞춘 AI 맞춤형 조언을 받아보세요
            </h4>
            <p className="text-xs sm:text-sm text-[#6E6155] leading-relaxed">
              현재 총점 <strong className="text-[#8C3729] font-mono">{result.totalScore}점</strong>({result.riskTier.label})과 취약 영역에 맞추어 실무 현장에서 바로 적용할 수 있는 따뜻한 멘토링 텍스트를 구성합니다.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-[#FDF0EE] border border-[#E8A599] text-xs text-[#7A1E12] max-w-md mx-auto">
              {errorMessage}
            </div>
          )}

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            {isKeyVerified ? (
              <button
                onClick={handleGenerateAdvice}
                disabled={isLoading}
                className="px-6 py-3 rounded-xl bg-[#8C3729] hover:bg-[#6E2B1F] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>AI가 맞춤 처방전을 정성껏 작성 중입니다...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>AI 맞춤 마음 처방전 생성하기</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={onNavigateToKeyActivation}
                className="px-6 py-3 rounded-xl bg-[#C87D6F] hover:bg-[#B66B5D] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Gemini API Key 승인하고 AI 처방받기</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Rendered Prescription */
        <div className="space-y-4">
          <div className="bg-[#FAF6EE] rounded-2xl p-6 sm:p-7 border-2 border-[#EADBCE] shadow-2xs space-y-4 relative">
            <div className="flex items-center justify-between border-b border-[#EADBCE] pb-3">
              <span className="text-xs font-bold text-[#8C3E30] uppercase tracking-wider">
                ~ PERSONALIZED MENTORING PRESCRIPTION ~
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#D8C7B5] text-xs font-semibold text-[#5A4B40] hover:bg-[#FAF7F2] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#2F6131]" />
                      <span className="text-[#2F6131]">복사 완료</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>처방전 복사</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleGenerateAdvice}
                  disabled={isLoading}
                  className="p-1.5 rounded-lg bg-white border border-[#D8C7B5] text-[#5A4B40] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                  title="다시 생성하기"
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Advice Body */}
            <div className="text-xs sm:text-sm text-[#2C241E] leading-relaxed whitespace-pre-line font-normal space-y-2">
              {adviceText}
            </div>

            <div className="pt-3 border-t border-[#EADBCE] flex items-center justify-between text-[11px] text-[#7A6A5E]">
              <span>* 실업급여 창구 상담원을 위한 심리 응원 메시지입니다.</span>
              <span className="font-mono">Google Gemini AI</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
