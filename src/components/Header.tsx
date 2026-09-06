import React from 'react';
import { Home, ClipboardCheck, BarChart3, Sparkles, AlertTriangle, ShieldCheck, HeartHandshake, KeyRound, Lock } from 'lucide-react';
import { APP_TITLE, APP_INTRO } from '../data/assessmentData';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  hasCompleted: boolean;
  answeredCount: number;
  totalQuestions: number;
  isKeyVerified?: boolean;
  onLockedTabClick?: (tabTitle: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  hasCompleted,
  answeredCount,
  totalQuestions,
  isKeyVerified = false,
  onLockedTabClick,
}) => {
  const handleTabClick = (tab: TabType, title: string) => {
    if (!isKeyVerified && tab !== 'landing') {
      if (onLockedTabClick) {
        onLockedTabClick(title);
      } else {
        setActiveTab('landing');
      }
      return;
    }
    setActiveTab(tab);
  };

  return (
    <header id="main-header" className="bg-[#FFFDF9] border-b border-[#E8DEC8] sticky top-0 z-30 shadow-xs">
      {/* Top Banner / Vintage Warm Context */}
      <div className="bg-[#2D2621] text-[#F7F2EC] py-2 px-4 sm:px-6 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-[#3D342E]">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#C87D6F] text-white tracking-wider">
            고용노동 고용센터
          </span>
          <span className="text-[#E6DBD0] font-medium">실업급여 상담원 마음건강 보호 및 정서소진 자가진단</span>
        </div>
        <div className="flex items-center gap-3 text-[#D5C7B8]">
          {isKeyVerified ? (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#8EB88B] bg-[#1E3E20] px-2.5 py-0.5 rounded-full border border-[#2F6131]">
              <Sparkles className="w-3 h-3 text-[#8EB88B]" />
              API Key 승인 완료 (모든 기능 사용 가능)
            </span>
          ) : (
            <button
              onClick={() => handleTabClick('landing', 'API Key 승인')}
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#FFBEB2] bg-[#542B23] hover:bg-[#68332A] px-2.5 py-0.5 rounded-full border border-[#8C3E30] transition-colors cursor-pointer"
            >
              <Lock className="w-3 h-3 text-[#FFBEB2]" />
              API Key 미승인 상태 (클릭하여 승인받기)
            </button>
          )}
          <span className="hidden sm:inline text-[#5A4E45]">|</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8EB88B]" />
            100% 완전 익명 보장
          </span>
        </div>
      </div>

      {/* Main App Title */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-5 pb-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#F9ECE8] text-[#8C3E30] border border-[#E9C4BC]">
              <span className="text-[#C87D6F]">✤</span>
              <span>현장 실효성 기반 맞춤 진단도구</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif-kr text-[#2C241E] tracking-tight leading-snug">
              {APP_TITLE}
            </h1>
            <p className="text-sm text-[#6E6155] leading-relaxed max-w-4xl font-normal">
              {APP_INTRO}
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav id="app-nav-tabs" className="flex items-center gap-1.5 sm:gap-2 mt-5 border-b border-[#EADBCE] -mb-3 overflow-x-auto pb-0.5">
          <button
            id="tab-landing-btn"
            onClick={() => setActiveTab('landing')}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'landing'
                ? 'border-[#C87D6F] text-[#8C3E30] bg-[#FAF1EE] rounded-t-lg'
                : 'border-transparent text-[#6B5E54] hover:text-[#2C241E] hover:border-[#D5C4B0]'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>서비스 소개 및 인증</span>
          </button>

          <button
            id="tab-survey-btn"
            onClick={() => handleTabClick('survey', '자가점검 문항지')}
            title={!isKeyVerified ? 'API Key 승인 후 이용 가능' : undefined}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'survey'
                ? 'border-[#C87D6F] text-[#8C3E30] bg-[#FAF1EE] rounded-t-lg'
                : !isKeyVerified
                ? 'border-transparent text-[#9E9084] hover:text-[#6E5F53] hover:bg-[#FAF4ED]'
                : 'border-transparent text-[#6B5E54] hover:text-[#2C241E] hover:border-[#D5C4B0]'
            }`}
          >
            {!isKeyVerified ? (
              <Lock className="w-3.5 h-3.5 text-[#B59C88]" />
            ) : (
              <ClipboardCheck className="w-4 h-4" />
            )}
            <span>[1] 자가점검 문항지</span>
            {!isKeyVerified ? (
              <span className="text-[10px] bg-[#EFE6DC] text-[#7A6A5E] px-1.5 py-0.5 rounded font-normal">
                승인 필요
              </span>
            ) : (
              <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full font-mono ${
                answeredCount === totalQuestions ? 'bg-[#EAF3EA] text-[#2F6131]' : 'bg-[#EFE8DD] text-[#554A40]'
              }`}>
                {answeredCount}/{totalQuestions}
              </span>
            )}
          </button>

          <button
            id="tab-result-btn"
            onClick={() => handleTabClick('result', '종합 결과 및 분석 리포트')}
            title={!isKeyVerified ? 'API Key 승인 후 이용 가능' : undefined}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'result'
                ? 'border-[#C87D6F] text-[#8C3E30] bg-[#FAF1EE] rounded-t-lg'
                : !isKeyVerified
                ? 'border-transparent text-[#9E9084] hover:text-[#6E5F53] hover:bg-[#FAF4ED]'
                : 'border-transparent text-[#6B5E54] hover:text-[#2C241E] hover:border-[#D5C4B0]'
            }`}
          >
            {!isKeyVerified ? (
              <Lock className="w-3.5 h-3.5 text-[#B59C88]" />
            ) : (
              <BarChart3 className="w-4 h-4" />
            )}
            <span>[2] 종합 결과 및 분석 리포트</span>
            {!isKeyVerified ? (
              <span className="text-[10px] bg-[#EFE6DC] text-[#7A6A5E] px-1.5 py-0.5 rounded font-normal">
                승인 필요
              </span>
            ) : (
              hasCompleted && <span className="w-2 h-2 rounded-full bg-[#C87D6F]"></span>
            )}
          </button>

          <button
            id="tab-practice-btn"
            onClick={() => handleTabClick('practice', '스트레스 완화 실천 방법')}
            title={!isKeyVerified ? 'API Key 승인 후 이용 가능' : undefined}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'practice'
                ? 'border-[#C87D6F] text-[#8C3E30] bg-[#FAF1EE] rounded-t-lg'
                : !isKeyVerified
                ? 'border-transparent text-[#9E9084] hover:text-[#6E5F53] hover:bg-[#FAF4ED]'
                : 'border-transparent text-[#6B5E54] hover:text-[#2C241E] hover:border-[#D5C4B0]'
            }`}
          >
            {!isKeyVerified ? (
              <Lock className="w-3.5 h-3.5 text-[#B59C88]" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>[3] 스트레스 완화 실천 방법</span>
            {!isKeyVerified && (
              <span className="text-[10px] bg-[#EFE6DC] text-[#7A6A5E] px-1.5 py-0.5 rounded font-normal">
                승인 필요
              </span>
            )}
          </button>

          <button
            id="tab-precautions-btn"
            onClick={() => handleTabClick('precautions', '운영 시 주의사항')}
            title={!isKeyVerified ? 'API Key 승인 후 이용 가능' : undefined}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'precautions'
                ? 'border-[#C87D6F] text-[#8C3E30] bg-[#FAF1EE] rounded-t-lg'
                : !isKeyVerified
                ? 'border-transparent text-[#9E9084] hover:text-[#6E5F53] hover:bg-[#FAF4ED]'
                : 'border-transparent text-[#6B5E54] hover:text-[#2C241E] hover:border-[#D5C4B0]'
            }`}
          >
            {!isKeyVerified ? (
              <Lock className="w-3.5 h-3.5 text-[#B59C88]" />
            ) : (
              <AlertTriangle className="w-4 h-4" />
            )}
            <span>[4] 운영 시 주의사항</span>
            {!isKeyVerified && (
              <span className="text-[10px] bg-[#EFE6DC] text-[#7A6A5E] px-1.5 py-0.5 rounded font-normal">
                승인 필요
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};
