import React from 'react';
import { AssessmentResult, DomainCode } from '../types';
import { APP_TITLE, DOMAIN_INFO, QUESTIONS, SCALE_OPTIONS, PRECAUTIONS } from '../data/assessmentData';

interface PrintReportViewProps {
  result: AssessmentResult | null;
}

export const PrintReportView: React.FC<PrintReportViewProps> = ({ result }) => {
  if (!result) return null;

  const domainCodes: DomainCode[] = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div className="hidden print:block p-8 bg-white text-black max-w-4xl mx-auto space-y-6">
      {/* Print Header */}
      <div className="border-b-2 border-slate-900 pb-4 text-center space-y-2">
        <span className="text-xs uppercase tracking-widest text-slate-600 font-semibold">
          고용노동부 고용복지플러스센터 실업급여팀 자가진단 리포트
        </span>
        <h1 className="text-xl font-extrabold text-slate-900">
          {APP_TITLE}
        </h1>
        <div className="flex justify-between text-xs text-slate-600 pt-2">
          <span>진단일시: {result.completedAt}</span>
          <span>익명 자가점검 평가서</span>
        </div>
      </div>

      {/* Total Score & Risk Tier Summary */}
      <div className="border border-slate-300 p-4 rounded-md space-y-2 bg-slate-50">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-slate-800">종합 진단 결과</span>
          <div className="text-right">
            <span className="text-2xl font-black">{result.totalScore}</span>
            <span className="text-xs text-slate-600"> / {result.maxTotalScore}점</span>
            <span className="ml-3 px-2 py-0.5 rounded font-bold text-xs bg-slate-800 text-white">
              {result.riskTier.label}
            </span>
          </div>
        </div>
        <div className="pt-2 border-t border-slate-200">
          <p className="text-sm font-bold text-slate-900">{result.riskTier.summaryTitle}</p>
          <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">{result.riskTier.description}</p>
        </div>
      </div>

      {/* 5 Domains Table */}
      <div className="space-y-2">
        <h2 className="text-sm font-bold text-slate-900">5대 영역별 환산 점수 및 집중 조치 포인트</h2>
        <table className="w-full border-collapse border border-slate-300 text-xs">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 p-2 w-16 text-center">영역</th>
              <th className="border border-slate-300 p-2">영역명 및 기준</th>
              <th className="border border-slate-300 p-2 w-20 text-center">점수(0~12)</th>
              <th className="border border-slate-300 p-2 w-16 text-center">상태</th>
              <th className="border border-slate-300 p-2">집중 조치 포인트</th>
            </tr>
          </thead>
          <tbody>
            {domainCodes.map((code) => {
              const ds = result.domainScores[code];
              const info = DOMAIN_INFO[code];
              return (
                <tr key={code}>
                  <td className="border border-slate-300 p-2 text-center font-bold">영역 {code}</td>
                  <td className="border border-slate-300 p-2 font-medium">{info.subTitle}</td>
                  <td className="border border-slate-300 p-2 text-center font-bold font-mono">{ds.calculatedScore}점</td>
                  <td className="border border-slate-300 p-2 text-center">{ds.riskStatus}</td>
                  <td className="border border-slate-300 p-2 text-[11px] leading-snug">{info.focusPoint}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Item Responses Table */}
      <div className="space-y-2 page-break-inside-avoid">
        <h2 className="text-sm font-bold text-slate-900">문항별 응답 상세</h2>
        <table className="w-full border-collapse border border-slate-300 text-[11px]">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 p-1.5 w-10 text-center">번호</th>
              <th className="border border-slate-300 p-1.5">문항</th>
              <th className="border border-slate-300 p-1.5 w-24 text-center">응답 내용</th>
              <th className="border border-slate-300 p-1.5 w-16 text-center">환산점수</th>
            </tr>
          </thead>
          <tbody>
            {QUESTIONS.map((q) => {
              const rawVal = result.answers[q.id] ?? 0;
              const effectiveVal = q.isReverse ? 4 - rawVal : rawVal;
              const opt = SCALE_OPTIONS.find((o) => o.value === rawVal);
              return (
                <tr key={q.id}>
                  <td className="border border-slate-300 p-1.5 text-center">{q.id}</td>
                  <td className="border border-slate-300 p-1.5">
                    {q.text} {q.isReverse && <span className="text-[10px] text-slate-500">(역채점)</span>}
                  </td>
                  <td className="border border-slate-300 p-1.5 text-center">{opt?.text}</td>
                  <td className="border border-slate-300 p-1.5 text-center font-bold font-mono">{effectiveVal}점</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Precautions Footer */}
      <div className="border-t border-slate-300 pt-3 text-[10px] text-slate-600 space-y-1">
        <p className="font-bold text-slate-800">※ 운영 및 해석 시 주의사항 준수</p>
        <p>• 비표준 자가점검 도구로 임상적 진단용이 아닙니다. • 개인 책임으로 환원 금지 및 인사평가 활용이 엄격히 금지됩니다. • 위기 상황 시 1577-0199(정신건강위기) 또는 109(자살예방)로 즉시 도움을 요청하세요.</p>
      </div>
    </div>
  );
};
