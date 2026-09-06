import React, { useState } from 'react';
import {
  BarChart3,
  AlertTriangle,
  Printer,
  ChevronRight,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  FileSpreadsheet,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { AssessmentResult, DomainCode } from '../types';
import {
  DOMAIN_INFO,
  RISK_TIERS,
  SCORING_LOGIC_EXPLANATION,
  QUESTIONS,
  SCALE_OPTIONS,
} from '../data/assessmentData';
import { AiCounselorPrescriptionCard } from './AiCounselorPrescriptionCard';

interface ResultReportProps {
  result: AssessmentResult;
  apiKey: string;
  isKeyVerified: boolean;
  onNavigateToPractice: (domainCode?: DomainCode) => void;
  onNavigateToKeyActivation: () => void;
  onRetest: () => void;
  onPrint: () => void;
}

export const ResultReport: React.FC<ResultReportProps> = ({
  result,
  apiKey,
  isKeyVerified,
  onNavigateToPractice,
  onNavigateToKeyActivation,
  onRetest,
  onPrint,
}) => {
  const [showItemDetail, setShowItemDetail] = useState(false);

  const { totalScore, maxTotalScore, riskTier, domainScores, completedAt } = result;
  const scorePercent = Math.round((totalScore / maxTotalScore) * 100);

  const getTierColorBadge = (tierId: string) => {
    switch (tierId) {
      case 'green':
        return 'bg-[#2F6131] text-white';
      case 'yellow':
        return 'bg-[#8C6D3B] text-white';
      case 'orange':
        return 'bg-[#C87D6F] text-white';
      case 'red':
        return 'bg-[#8C3729] text-white';
      default:
        return 'bg-[#52443A] text-white';
    }
  };

  const domainCodes: DomainCode[] = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div id="result-report-section" className="space-y-8 font-sans">
      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FFFDF9] p-4 rounded-2xl border-2 border-[#E7DCCE] shadow-xs botanical-frame">
        <div className="flex items-center gap-2 text-xs font-serif-kr">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2F6131]"></span>
          <span className="font-semibold text-[#5A4B40]">진단 완료 일시:</span>
          <span className="font-mono text-[#2C241E] font-medium">{completedAt}</span>
        </div>
        <div className="flex items-center gap-2.5 font-serif-kr">
          <button
            id="print-result-btn"
            onClick={onPrint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[#D8C7B5] text-xs font-semibold text-[#4A3D34] bg-[#FFFDF9] hover:bg-[#FAF6EE] transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#8C7564]" />
            <span>결과 인쇄 / PDF 저장</span>
          </button>
          <button
            id="retest-btn"
            onClick={onRetest}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#F9ECE8] text-[#8C3729] border border-[#E9C4BC] text-xs font-semibold hover:bg-[#F2DCD6] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>다시 진단하기</span>
          </button>
        </div>
      </div>

      {/* Section [2] Header */}
      <div className="border-b border-[#EADBCE] pb-3 text-center sm:text-left">
        <span className="text-xs font-bold text-[#8C3E30] tracking-widest uppercase font-serif-kr">
          ~ ASSESSMENT DIAGNOSTIC REPORT ~
        </span>
        <h2 className="text-xl sm:text-2xl font-bold font-serif-kr text-[#2C241E] mt-1 flex items-center justify-center sm:justify-start gap-2">
          <span>채점 방법 및 종합 결과 해석 가이드</span>
        </h2>
        <p className="text-xs text-[#7A6A5E] mt-1 font-serif-kr">
          실업급여 창구 상담원 맞춤형 채점 산출 로직에 따른 실시간 분석 결과입니다.
        </p>
      </div>

      {/* 1. Scoring Logic Explanation Box */}
      <div id="scoring-logic-box" className="bg-[#FAF7F2] border-2 border-[#EADBCE] rounded-2xl p-4 sm:p-5 font-serif-kr">
        <h3 className="text-sm font-bold text-[#2C241E] mb-2 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#C87D6F]" />
          <span>1. {SCORING_LOGIC_EXPLANATION.title}</span>
        </h3>
        <ul className="text-xs text-[#5A4B40] space-y-1.5 list-disc list-inside">
          <li>
            <strong className="text-[#2C241E]">{SCORING_LOGIC_EXPLANATION.normalItems}</strong>
          </li>
          <li>
            <strong className="text-[#2C241E]">{SCORING_LOGIC_EXPLANATION.reversedItems}</strong>
            <span className="text-[#7A6A5E] font-mono ml-1.5">{SCORING_LOGIC_EXPLANATION.conversionRule}</span>
          </li>
        </ul>
      </div>

      {/* Comprehensive Status Banner (Highlighted User Score) */}
      <div
        id="user-score-highlight-card"
        className="rounded-3xl border-2 border-[#E7DCCE] p-6 sm:p-7 shadow-xs bg-[#FFFDF9] botanical-frame"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 font-serif-kr">
            <div className="flex items-center gap-2.5">
              <span className={`px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-2xs ${getTierColorBadge(riskTier.id)}`}>
                {riskTier.label}
              </span>
              <span className="text-xs text-[#7A6A5E] font-medium">
                (구간 기준: {riskTier.rangeText})
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg sm:text-xl font-bold text-[#2C241E]">
                {riskTier.summaryTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#5A4B40] leading-relaxed max-w-2xl font-normal">
                {riskTier.description}
              </p>
            </div>
          </div>

          {/* Big Score Gauge (Vintage Florist Box Style) */}
          <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-[#FAF6EE] border-2 border-[#EADBCE] shadow-2xs shrink-0 sm:min-w-[210px] font-serif-kr">
            <span className="text-xs font-semibold text-[#8C7564] uppercase tracking-wider">나의 종합 총점</span>
            <div className="flex items-baseline gap-1 my-1">
              <span className="text-4xl font-extrabold text-[#2C241E] tracking-tight font-mono">
                {totalScore}
              </span>
              <span className="text-[#8C7564] font-semibold text-sm">/ {maxTotalScore}점</span>
            </div>

            {/* Score Progress Bar */}
            <div className="w-full bg-[#EADFCE] rounded-full h-2 mt-1.5 overflow-hidden">
              <div
                className={`h-2 rounded-full ${
                  riskTier.id === 'green'
                    ? 'bg-[#2F6131]'
                    : riskTier.id === 'yellow'
                    ? 'bg-[#8C6D3B]'
                    : riskTier.id === 'orange'
                    ? 'bg-[#C87D6F]'
                    : 'bg-[#8C3729]'
                }`}
                style={{ width: `${scorePercent}%` }}
              />
            </div>
            <span className="text-[11px] text-[#7A6A5E] font-medium mt-1.5">소진 지수 {scorePercent}%</span>
          </div>
        </div>
      </div>

      {/* AI Counselor Personalized Prescription Card */}
      <AiCounselorPrescriptionCard
        result={result}
        apiKey={apiKey}
        isKeyVerified={isKeyVerified}
        onNavigateToKeyActivation={onNavigateToKeyActivation}
      />

      {/* 2. Total Score Level Standards Table */}
      <div id="risk-tiers-table-container" className="bg-[#FFFDF9] rounded-2xl border-2 border-[#E7DCCE] overflow-hidden shadow-xs font-serif-kr">
        <div className="px-5 py-4 bg-[#FAF7F2] border-b border-[#EADBCE]">
          <h3 className="text-sm font-bold text-[#2C241E]">
            2. 총점 수준별 종합 해석 기준 (4단계)
          </h3>
          <p className="text-xs text-[#7A6A5E] mt-0.5 leading-relaxed">
            현재 산출된 총점에 해당하는 단계가 강조되어 표시됩니다. 위협 대신 회복과 보호에 초점을 맞춘 단계입니다.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5ECE5] text-[#4A3D34] font-bold border-b border-[#EADBCE]">
              <tr>
                <th className="py-2.5 px-4 w-28">총점 구간</th>
                <th className="py-2.5 px-4 w-44">마음 상태 및 지원 단계</th>
                <th className="py-2.5 px-4">종합 상태 및 권고사항</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0E6D8]">
              {RISK_TIERS.map((tier) => {
                const isCurrent = tier.id === riskTier.id;
                return (
                  <tr
                    key={tier.id}
                    className={`transition-colors ${
                      isCurrent ? 'bg-[#F9ECE8]/80 font-medium' : 'hover:bg-[#FAF7F2]/50'
                    }`}
                  >
                    <td className="py-3 px-4 font-bold font-mono text-[#2C241E]">
                      <div className="flex items-center gap-1.5">
                        {isCurrent && (
                          <span className="w-2 h-2 rounded-full bg-[#C87D6F] animate-ping" />
                        )}
                        <span>{tier.rangeText}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] inline-block border ${
                        tier.id === 'green'
                          ? 'bg-[#EAF3EA] text-[#2F6131] border-[#BBD7B9]'
                          : tier.id === 'yellow'
                          ? 'bg-[#FCF6EC] text-[#8C6D3B] border-[#EADBCE]'
                          : tier.id === 'orange'
                          ? 'bg-[#F9ECE8] text-[#8C3729] border-[#E9C4BC]'
                          : 'bg-[#FDF0EE] text-[#7A1E12] border-[#E8A599]'
                      }`}>
                        {tier.label}
                      </span>
                    </td>
                    <td className="py-3 px-4 leading-relaxed text-[#2C241E]">
                      <strong>{tier.summaryTitle}</strong>
                      <br />
                      <span className="text-[#6B5E54] font-normal">{tier.description}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Five Domains Breakdown */}
      <div id="domains-breakdown-container" className="space-y-4 font-serif-kr">
        <div>
          <h3 className="text-base font-bold text-[#2C241E]">
            3. 5개 영역별 확인 및 집중 조치 포인트
          </h3>
          <p className="text-xs text-[#7A6A5E] mt-0.5">
            각 영역별 점수(0~12점)를 비교하여 우선적으로 조치해야 할 취약 요인을 식별합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {domainCodes.map((code) => {
            const ds = domainScores[code];
            const info = DOMAIN_INFO[code];
            const isHigh = ds.calculatedScore >= 7;

            return (
              <div
                key={code}
                id={`domain-score-card-${code}`}
                className={`bg-[#FFFDF9] rounded-2xl border-2 p-5 shadow-xs transition-all botanical-frame ${
                  isHigh ? 'border-[#C87D6F] ring-2 ring-[#F9ECE8]' : 'border-[#E7DCCE]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#FAF0E6] text-[#8C3E30] border border-[#E9C4BC]">
                        영역 {code}
                      </span>
                      <h4 className="text-sm font-bold text-[#2C241E]">
                        {info.subTitle}
                      </h4>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xl font-bold font-mono text-[#2C241E]">
                      {ds.calculatedScore}
                    </span>
                    <span className="text-xs text-[#8C7564] font-medium"> / {ds.maxScore}점</span>
                    <div className="mt-0.5">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          ds.riskStatus.includes('안정')
                            ? 'bg-[#EAF3EA] text-[#2F6131] border-[#BBD7B9]'
                            : ds.riskStatus.includes('충전') || ds.riskStatus.includes('주의')
                            ? 'bg-[#FCF6EC] text-[#8C6D3B] border-[#EADBCE]'
                            : ds.riskStatus.includes('조율') || ds.riskStatus.includes('경고')
                            ? 'bg-[#F9ECE8] text-[#8C3E30] border-[#E9C4BC]'
                            : 'bg-[#FDF0EE] text-[#7A1E12] border-[#E8A599]'
                        }`}
                      >
                        {ds.riskStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#EADFCE] rounded-full h-2 mt-3 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      ds.calculatedScore <= 3
                        ? 'bg-[#2F6131]'
                        : ds.calculatedScore <= 7
                        ? 'bg-[#8C6D3B]'
                        : ds.calculatedScore <= 10
                        ? 'bg-[#C87D6F]'
                        : 'bg-[#8C3729]'
                    }`}
                    style={{ width: `${(ds.calculatedScore / ds.maxScore) * 100}%` }}
                  />
                </div>

                {/* Focus Point Verbatim Text */}
                <div className="mt-3.5 p-3 rounded-xl bg-[#FAF7F2] border border-[#EADBCE] text-xs text-[#5A4B40] leading-relaxed">
                  <strong className="text-[#2C241E] font-semibold block mb-0.5">
                    집중 조치 포인트:
                  </strong>
                  {info.focusPoint}
                </div>

                {/* Action button */}
                <button
                  onClick={() => onNavigateToPractice(code)}
                  className="mt-3 w-full flex items-center justify-center gap-1 text-xs text-[#8C3729] hover:text-[#5A241C] font-semibold py-1.5 rounded-xl hover:bg-[#F9ECE8] transition-colors cursor-pointer font-serif-kr"
                >
                  <span>영역 {code} 완화 실천 방법 확인</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Item-by-item scoring detail toggle */}
      <div className="bg-[#FFFDF9] rounded-2xl border-2 border-[#E7DCCE] p-4 sm:p-5 shadow-xs font-serif-kr">
        <button
          onClick={() => setShowItemDetail(!showItemDetail)}
          className="w-full flex items-center justify-between text-xs font-semibold text-[#4A3D34] hover:text-[#2C241E] cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-[#C87D6F]" />
            <span>문항별 세부 응답 및 채점 환산표 {showItemDetail ? '접기' : '펼쳐보기'}</span>
          </div>
          {showItemDetail ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showItemDetail && (
          <div className="mt-4 pt-3 border-t border-[#EADBCE] overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] text-[#5A4B40] font-semibold border-b border-[#EADBCE]">
                <tr>
                  <th className="py-2 px-3 w-12 text-center">번호</th>
                  <th className="py-2 px-3 w-28">영역</th>
                  <th className="py-2 px-3">문항 내용</th>
                  <th className="py-2 px-3 w-28 text-center">응답 내용</th>
                  <th className="py-2 px-3 w-24 text-center">원점수</th>
                  <th className="py-2 px-3 w-24 text-center">환산 점수</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0E6D8]">
                {QUESTIONS.map((q) => {
                  const rawVal = result.answers[q.id] ?? 0;
                  const effectiveVal = q.isReverse ? 4 - rawVal : rawVal;
                  const optionInfo = SCALE_OPTIONS.find((o) => o.value === rawVal);

                  return (
                    <tr key={q.id} className="hover:bg-[#FAF7F2]">
                      <td className="py-2 px-3 text-center font-bold text-[#2C241E]">{q.id}</td>
                      <td className="py-2 px-3 text-[#5A4B40] font-medium">영역 {q.domain}</td>
                      <td className="py-2 px-3 text-[#2C241E]">
                        {q.text}
                        {q.isReverse && (
                          <span className="ml-1 text-[10px] text-[#2F6131] font-medium">(역채점)</span>
                        )}
                      </td>
                      <td className="py-2 px-3 text-center text-[#6B5E54]">
                        {optionInfo?.text}
                      </td>
                      <td className="py-2 px-3 text-center font-mono text-[#8C7564]">{rawVal}점</td>
                      <td className="py-2 px-3 text-center font-mono font-bold text-[#8C3729]">
                        {effectiveVal}점
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Callout to Practice Section */}
      <div className="bg-[#2D2621] text-[#FAF6EE] rounded-3xl p-6 sm:p-7 border-2 border-[#3D342E] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 font-serif-kr">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#423730] text-[#E5A496] text-xs font-medium border border-[#52443C]">
            <Sparkles className="w-3.5 h-3.5 text-[#E5A496]" />
            <span>다음 추천 단계</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1">
            [3] 점수 영역별·수준별 스트레스 완화 실천 가이드
          </h3>
          <p className="text-xs text-[#D5C7B8] max-w-xl">
            타임 블로킹, 감정노동 방어 화법, 퇴근 리추얼 등 실업급여팀 현장에 맞춤화된 25가지 실천 수칙을 확인하고 적용해 보세요.
          </p>
        </div>

        <button
          id="goto-practice-btn"
          onClick={() => onNavigateToPractice()}
          className="px-5 py-2.5 rounded-xl bg-[#F5D5CE] hover:bg-[#EAC0B7] text-[#2D2621] font-bold text-xs shrink-0 flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
        >
          <span>실천 방법 전체 보기</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
