import React from 'react';
import { Info, HelpCircle, ShieldAlert } from 'lucide-react';
import { NOTICE_TEXT, SCALE_OPTIONS, SCORING_LOGIC_EXPLANATION } from '../data/assessmentData';

export const NoticeBanner: React.FC = () => {
  return (
    <div id="notice-banner-container" className="bg-[#FFFDF9] rounded-2xl border-2 border-[#E7DCCE] p-5 sm:p-6 shadow-xs space-y-4 botanical-frame">
      <div className="flex items-start gap-3.5">
        <div className="p-2 rounded-xl bg-[#F9ECE8] text-[#8C3E30] shrink-0 mt-0.5 border border-[#E9C4BC]">
          <Info className="w-5 h-5" />
        </div>
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#8C3E30] font-serif-kr tracking-wider uppercase">
              ~ GUIDELINES FOR SELF-CHECK ~
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold font-serif-kr text-[#2C241E] flex items-center gap-2">
            자가점검 참여 전 안내사항
          </h2>
          <p className="text-xs sm:text-sm text-[#5C4F44] leading-relaxed font-serif-kr">
            {NOTICE_TEXT}
          </p>
        </div>
      </div>

      {/* Rating Scale Legend */}
      <div className="pt-3 border-t border-[#EADBCE]">
        <div className="text-xs font-semibold text-[#8C7564] uppercase tracking-wider mb-2.5 flex items-center gap-1.5 font-serif-kr">
          <HelpCircle className="w-3.5 h-3.5 text-[#C87D6F]" />
          <span>응답 척도 기준 (최근 2주간 경험 기준)</span>
          <span className="text-[#C87D6F]">~ ✤ ~</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {SCALE_OPTIONS.map((opt) => (
            <div
              key={opt.value}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#EADBCE] text-xs font-serif-kr"
            >
              <span className="w-6 h-6 rounded-md bg-[#F9ECE8] text-[#8C3729] font-bold flex items-center justify-center shrink-0 border border-[#E9C4BC]">
                {opt.value}
              </span>
              <div className="leading-tight">
                <span className="font-semibold text-[#2C241E]">{opt.label}: </span>
                <span className="text-[#6E6155]">{opt.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reverse scoring notification */}
      <div className="p-3.5 rounded-xl bg-[#FAF6EE] border border-[#D8C7B5] text-xs text-[#5C4F44] flex items-start gap-2.5 font-serif-kr">
        <ShieldAlert className="w-4 h-4 text-[#8C6D3B] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-[#3D322A]">역채점 안내 (영역 D·E): </span>
          <span>
            {SCORING_LOGIC_EXPLANATION.reversedItems} {SCORING_LOGIC_EXPLANATION.conversionRule}
            <span className="text-[#6E5949] ml-1 font-normal block sm:inline">
              (높은 대처 역량이나 조직 보호 자원이 확인될수록 스트레스 점수는 낮아집니다.)
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
