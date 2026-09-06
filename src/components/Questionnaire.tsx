import React from 'react';
import {
  Zap,
  Waves,
  RotateCw,
  Shield,
  Building2,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { DomainCode, ScaleValue } from '../types';
import { QUESTIONS, DOMAIN_INFO, SCALE_OPTIONS } from '../data/assessmentData';

interface QuestionnaireProps {
  answers: Record<number, ScaleValue>;
  onSelectAnswer: (questionId: number, value: ScaleValue) => void;
  onSubmit: () => void;
  onReset: () => void;
  onFillSample: (sampleType: 'moderate' | 'high' | 'low') => void;
}

const DOMAIN_ICONS: Record<DomainCode, React.ReactNode> = {
  A: <Zap className="w-5 h-5 text-[#8C6D3B]" />,
  B: <Waves className="w-5 h-5 text-[#8C3729]" />,
  C: <RotateCw className="w-5 h-5 text-[#6E3B85]" />,
  D: <Shield className="w-5 h-5 text-[#275A85]" />,
  E: <Building2 className="w-5 h-5 text-[#2F6131]" />,
};

export const Questionnaire: React.FC<QuestionnaireProps> = ({
  answers,
  onSelectAnswer,
  onSubmit,
  onReset,
  onFillSample,
}) => {
  const answeredCount = Object.keys(answers).length;
  const totalCount = QUESTIONS.length;
  const isAllAnswered = answeredCount === totalCount;
  const percentComplete = Math.round((answeredCount / totalCount) * 100);

  // Group questions by domain
  const domains: DomainCode[] = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div id="questionnaire-section" className="space-y-8 font-sans">
      {/* Progress & Quick Tools Bar */}
      <div className="bg-[#FFFDF9] rounded-2xl border-2 border-[#E7DCCE] p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 botanical-frame">
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center justify-between text-xs font-semibold text-[#4A3D34] font-serif-kr">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#C87D6F]" />
              <span>자가점검 응답 진행도</span>
              <span className="text-[#C87D6F]">~ ✤ ~</span>
            </span>
            <span className="font-serif-kr font-bold text-[#8C3729]">
              {answeredCount} / {totalCount} 문항 완료 ({percentComplete}%)
            </span>
          </div>
          <div className="w-full bg-[#FAF0E6] rounded-full h-2.5 overflow-hidden border border-[#E7DCCE]">
            <div
              className="bg-[#C87D6F] h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
        </div>

        {/* Quick Helper buttons */}
        <div className="flex items-center gap-2.5 self-end md:self-center shrink-0">
          <div className="relative inline-flex items-center">
            <select
              id="sample-selector"
              onChange={(e) => {
                if (e.target.value) {
                  onFillSample(e.target.value as any);
                  e.target.value = '';
                }
              }}
              defaultValue=""
              className="text-xs bg-[#FAF7F2] hover:bg-[#F2EADC] text-[#4E4035] font-serif-kr font-medium px-3 py-1.5 rounded-lg border border-[#D8C7B5] cursor-pointer transition-colors"
            >
              <option value="" disabled>
                ⚡ 빠른 예시 입력...
              </option>
              <option value="high">적극적 조율·전문 지원 필요 예시</option>
              <option value="moderate">알아차림·충전 필요 예시</option>
              <option value="low">안정 및 회복 유지 예시</option>
            </select>
          </div>

          <button
            id="reset-answers-btn"
            onClick={onReset}
            disabled={answeredCount === 0}
            className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-[#D8C7B5] text-[#6B5E54] bg-[#FFFDF9] hover:bg-[#FAF6EE] disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-serif-kr cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#8C3729]" />
            초기화
          </button>
        </div>
      </div>

      {/* Domain Groups */}
      <div className="space-y-8">
        {domains.map((domainCode) => {
          const domainInfo = DOMAIN_INFO[domainCode];
          const domainQuestions = QUESTIONS.filter((q) => q.domain === domainCode);
          const domainAnsweredCount = domainQuestions.filter((q) => answers[q.id] !== undefined).length;

          return (
            <section
              key={domainCode}
              id={`domain-section-${domainCode}`}
              className="bg-[#FFFDF9] rounded-2xl border-2 border-[#E7DCCE] overflow-hidden shadow-xs botanical-frame"
            >
              {/* Domain Header with Antique Label & Botanical Flourishes */}
              <div className="px-5 py-4 border-b border-[#EADBCE] bg-[#FAF7F2] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#FFFDF9] shadow-2xs border border-[#EADBCE]">
                    {DOMAIN_ICONS[domainCode]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-[#8C3E30] uppercase font-serif-kr tracking-wider">
                        ~ DOMAIN {domainCode} ~
                      </span>
                    </div>
                    <h2 className="text-base font-bold font-serif-kr text-[#2C241E]">
                      {domainInfo.title}
                    </h2>
                    <p className="text-xs text-[#6B5E54] font-serif-kr mt-0.5">
                      {domainInfo.subTitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs self-start sm:self-auto font-serif-kr">
                  {domainCode === 'D' || domainCode === 'E' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#EAF3EA] text-[#2F6131] border border-[#BBD7B9] font-medium">
                      역채점 산출
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#FAF0E6] text-[#8C3E30] border border-[#E9C4BC] font-medium">
                      일반 산출
                    </span>
                  )}
                  <span className="font-serif-kr text-[#7A6A5E] font-bold">
                    ({domainAnsweredCount}/{domainQuestions.length})
                  </span>
                </div>
              </div>

              {/* Domain Questions */}
              <div className="divide-y divide-[#F0E6D8] p-2 sm:p-4">
                {domainQuestions.map((q) => {
                  const currentVal = answers[q.id];
                  const isSelected = currentVal !== undefined;

                  return (
                    <div
                      key={q.id}
                      id={`question-card-${q.id}`}
                      className={`p-3.5 sm:p-4 rounded-xl transition-all ${
                        isSelected ? 'bg-[#FAF7F2]/80' : 'hover:bg-[#FAF6EE]/40'
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5">
                        {/* Question Text */}
                        <div className="space-y-1 lg:max-w-xl">
                          <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-[#F5ECE5] text-[#8C3E30] text-xs font-bold font-serif-kr flex items-center justify-center shrink-0 mt-0.5 border border-[#E5D2C0]">
                              {q.id}
                            </span>
                            <div>
                              <p className="text-sm font-semibold font-serif-kr text-[#2C241E] leading-snug">
                                {q.text} <span className="text-xs font-normal text-[#8C7564] font-sans">(0~4점)</span>
                              </p>
                              {q.isReverse && (
                                <p className="text-[11px] text-[#2F6131] font-medium font-serif-kr mt-1">
                                  ※ 긍정 대처 문항 (점수가 높을수록 소진 위험은 낮게 환산됩니다)
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Scale Choice Buttons */}
                        <div className="grid grid-cols-5 gap-1.5 sm:gap-2 shrink-0">
                          {SCALE_OPTIONS.map((opt) => {
                            const isChosen = currentVal === opt.value;
                            return (
                              <button
                                key={opt.value}
                                id={`q-${q.id}-opt-${opt.value}`}
                                type="button"
                                onClick={() => onSelectAnswer(q.id, opt.value as ScaleValue)}
                                className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all text-center cursor-pointer font-serif-kr ${
                                  isChosen
                                    ? 'bg-[#C87D6F] text-white border-[#B66B5D] shadow-xs font-bold scale-[1.02]'
                                    : 'bg-[#FFFDF9] hover:bg-[#FAF6EE] text-[#4E4035] border-[#E0D2C2] hover:border-[#D0BEAD]'
                                }`}
                              >
                                <span className={`text-xs font-bold ${isChosen ? 'text-white' : 'text-[#2C241E]'}`}>
                                  {opt.label}
                                </span>
                                <span
                                  className={`text-[11px] tracking-tight leading-tight mt-0.5 line-clamp-1 ${
                                    isChosen ? 'text-[#FAF0E6] font-medium' : 'text-[#756658]'
                                  }`}
                                >
                                  {opt.text}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* Submission Card at Bottom (Vintage Parlor Shelf Style) */}
      <div className="bg-[#FFFDF9] rounded-2xl border-2 border-[#E7DCCE] p-6 shadow-md sticky bottom-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-4 botanical-frame">
        <div>
          <div className="flex items-center gap-2">
            {isAllAnswered ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2F6131] bg-[#EAF3EA] px-3 py-1 rounded-full border border-[#BBD7B9] font-serif-kr">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#427A45]" />
                모든 문항 응답 완료 ({totalCount}/{totalCount})
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8C3729] bg-[#F9ECE8] px-3 py-1 rounded-full border border-[#E9C4BC] font-serif-kr">
                <AlertCircle className="w-3.5 h-3.5 text-[#C87D6F]" />
                {totalCount - answeredCount}개 문항 응답 필요
              </span>
            )}
          </div>
          <p className="text-xs text-[#7A6A5E] mt-1.5 font-serif-kr">
            총 0~60점 만점으로 종합 위험도 및 5대 영역별 맞춤 분석이 안전하게 도출됩니다.
          </p>
        </div>

        <button
          id="submit-assessment-btn"
          onClick={onSubmit}
          disabled={!isAllAnswered}
          className={`px-6 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-all font-serif-kr ${
            isAllAnswered
              ? 'bg-[#C87D6F] hover:bg-[#B66B5D] text-white cursor-pointer shadow-md'
              : 'bg-[#EADFCE] text-[#8C7B6D] cursor-not-allowed'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>종합 결과 및 분석 리포트 확인하기</span>
        </button>
      </div>
    </div>
  );
};
