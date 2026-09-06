import React from 'react';
import { AlertTriangle, PhoneCall, HeartPulse, Building2, Lock, Scale } from 'lucide-react';
import { PRECAUTIONS } from '../data/assessmentData';

const PRECAUTION_ICONS = [
  <Scale className="w-5 h-5 text-[#8C6D3B]" />,
  <HeartPulse className="w-5 h-5 text-[#C87D6F]" />,
  <Building2 className="w-5 h-5 text-[#6E3B85]" />,
  <Lock className="w-5 h-5 text-[#8C3729]" />,
  <PhoneCall className="w-5 h-5 text-[#B83226]" />,
];

export const PrecautionsGuide: React.FC = () => {
  return (
    <div id="precautions-guide-section" className="space-y-6 font-sans">
      {/* Header */}
      <div className="bg-[#FFFDF9] rounded-2xl border-2 border-[#E7DCCE] p-6 shadow-xs space-y-2 botanical-frame font-serif-kr">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F9ECE8] text-[#8C3E30] border border-[#E9C4BC]">
          <AlertTriangle className="w-3.5 h-3.5 text-[#C87D6F]" />
          <span>윤리 및 운영 규정 준수 원칙</span>
          <span className="text-[#C87D6F]">~ ✤ ~</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#2C241E] tracking-tight">
          해석 및 운영 시 필수 주의사항 (5대 안심 원칙)
        </h2>
        <p className="text-xs sm:text-sm text-[#68594E] leading-relaxed font-normal">
          본 자가점검 도구의 오남용을 방지하고 상담원 보호라는 본래 취지를 달성하기 위해 반드시 지켜야 할 필수 안전 원칙입니다.
        </p>
      </div>

      {/* 5 Precautions Cards */}
      <div className="space-y-4 font-serif-kr">
        {PRECAUTIONS.map((item, idx) => (
          <div
            key={item.id}
            id={`precaution-item-${item.id}`}
            className="bg-[#FFFDF9] rounded-2xl border-2 border-[#E7DCCE] p-5 shadow-xs flex items-start gap-4 hover:border-[#D5C4B0] transition-colors botanical-frame"
          >
            <div className="p-2.5 rounded-xl bg-[#FAF6EE] border border-[#EADBCE] shrink-0 mt-0.5">
              {PRECAUTION_ICONS[idx]}
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#8C3729] text-white text-xs font-bold flex items-center justify-center font-mono shrink-0">
                  {item.id}
                </span>
                <h3 className="text-base font-bold text-[#2C241E]">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#5A4B40] leading-relaxed font-normal pt-1">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Crisis Contact Support Banner */}
      <div className="bg-[#FDF6F4] border-2 border-[#E9C4BC] rounded-3xl p-6 shadow-xs font-serif-kr">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-[#F9ECE8] text-[#8C3729] shrink-0 mt-0.5 border border-[#E9C4BC]">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div className="space-y-3.5 flex-1">
            <div>
              <span className="text-[11px] font-bold text-[#8C3E30] uppercase tracking-wider block mb-0.5">
                ~ EMERGENCY ASSISTANCE ~
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#421B14]">
                긴급 심리 지원 및 상담원 보호 채널 안내
              </h3>
              <p className="text-xs text-[#7A362B] mt-1 leading-relaxed">
                5번 수칙(위기 상황 시 즉각 개입)에 따라 극심한 공황, 신체적 안전 위협 또는 심각한 심리적 위기 시 총점과 무관하게 아래 전문 기관의 도움을 받을 수 있습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-[#FFFDF9] p-4 rounded-xl border border-[#E9C4BC] shadow-2xs">
                <span className="text-xs font-semibold text-[#8C7564] block">정신건강위기상담전화</span>
                <span className="text-base font-bold text-[#8C3729] font-mono">1577-0199</span>
                <span className="text-[11px] text-[#7A6A5E] block mt-0.5">24시간 전문가 상담</span>
              </div>
              <div className="bg-[#FFFDF9] p-4 rounded-xl border border-[#E9C4BC] shadow-2xs">
                <span className="text-xs font-semibold text-[#8C7564] block">자살예방상담전화</span>
                <span className="text-base font-bold text-[#8C3729] font-mono">109</span>
                <span className="text-[11px] text-[#7A6A5E] block mt-0.5">24시간 전국 무료</span>
              </div>
              <div className="bg-[#FFFDF9] p-4 rounded-xl border border-[#E9C4BC] shadow-2xs">
                <span className="text-xs font-semibold text-[#8C7564] block">고용노동부·근로복지공단 EAP</span>
                <span className="text-sm font-bold text-[#275A85] block">근로자지원프로그램</span>
                <span className="text-[11px] text-[#7A6A5E] block mt-0.5">센터 내 지정 전문상담</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
