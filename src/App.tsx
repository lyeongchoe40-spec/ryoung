import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { NoticeBanner } from './components/NoticeBanner';
import { ComfortIntroCard } from './components/ComfortIntroCard';
import { Questionnaire } from './components/Questionnaire';
import { ResultReport } from './components/ResultReport';
import { PracticeGuide } from './components/PracticeGuide';
import { PrecautionsGuide } from './components/PrecautionsGuide';
import { PrintReportView } from './components/PrintReportView';
import { LandingPage } from './components/LandingPage';
import { AssessmentResult, DomainCode, ScaleValue, TabType } from './types';
import { QUESTIONS, calculateAssessmentResult, APP_TITLE } from './data/assessmentData';
import {
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  ClipboardList,
  Sparkles,
} from 'lucide-react';

const STORAGE_KEY = 'employment_counselor_stress_assessment_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('landing');
  const [answers, setAnswers] = useState<Record<number, ScaleValue>>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [practiceDomainFilter, setPracticeDomainFilter] = useState<DomainCode | undefined>(undefined);
  
  // Ephemeral In-Memory Gemini API Key state (Never persisted to localStorage/sessionStorage)
  const [apiKey, setApiKey] = useState<string>('');
  const [isKeyVerified, setIsKeyVerified] = useState<boolean>(false);

  // Gating: If API key is not verified, strictly lock to landing page
  useEffect(() => {
    if (!isKeyVerified && activeTab !== 'landing') {
      setActiveTab('landing');
    }
  }, [isKeyVerified, activeTab]);

  const scrollToKeyActivation = () => {
    setActiveTab('landing');
    setTimeout(() => {
      const el = document.getElementById('gemini-activation-wrapper');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-4', 'ring-[#C87D6F]', 'rounded-3xl', 'transition-all');
        setTimeout(() => {
          el.classList.remove('ring-4', 'ring-[#C87D6F]');
        }, 2500);
      }
    }, 100);
  };

  const handleTabChange = (tab: TabType) => {
    if (!isKeyVerified && tab !== 'landing') {
      scrollToKeyActivation();
      return;
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Load saved state on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.answers && Object.keys(parsed.answers).length > 0) {
          setAnswers(parsed.answers);
          if (parsed.result) {
            setResult(parsed.result);
          }
        }
      }
    } catch (e) {
      console.error('Failed to parse saved assessment data', e);
    }
  }, []);

  // Save state on change
  const persistState = (newAnswers: Record<number, ScaleValue>, newResult: AssessmentResult | null) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          answers: newAnswers,
          result: newResult,
        })
      );
    } catch (e) {
      console.error('Failed to save assessment to localStorage', e);
    }
  };

  const handleSelectAnswer = (questionId: number, value: ScaleValue) => {
    setAnswers((prev) => {
      const updated = { ...prev, [questionId]: value };
      // If result already existed, update result in real time
      let newResult: AssessmentResult | null = null;
      if (Object.keys(updated).length === QUESTIONS.length) {
        newResult = calculateAssessmentResult(updated);
        setResult(newResult);
      }
      persistState(updated, newResult || result);
      return updated;
    });
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < QUESTIONS.length) {
      return;
    }
    const computed = calculateAssessmentResult(answers);
    setResult(computed);
    persistState(answers, computed);
    setActiveTab('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    if (window.confirm('자가점검 응답 내용을 모두 초기화하시겠습니까?')) {
      setAnswers({});
      setResult(null);
      persistState({}, null);
      setActiveTab('survey');
    }
  };

  const handleFillSample = (sampleType: 'moderate' | 'high' | 'low') => {
    const sampleAnswers: Record<number, ScaleValue> = {};

    QUESTIONS.forEach((q) => {
      if (sampleType === 'high') {
        // High burnout scenario
        // Regular items A, B, C: high stress (3 or 4)
        // Reverse items D, E: low coping (0 or 1) -> reverses to 4 or 3
        if (q.isReverse) {
          sampleAnswers[q.id] = (Math.random() > 0.5 ? 0 : 1) as ScaleValue;
        } else {
          sampleAnswers[q.id] = (Math.random() > 0.4 ? 3 : 4) as ScaleValue;
        }
      } else if (sampleType === 'moderate') {
        // Moderate/Warning scenario
        if (q.isReverse) {
          sampleAnswers[q.id] = (Math.random() > 0.5 ? 2 : 1) as ScaleValue;
        } else {
          sampleAnswers[q.id] = (Math.random() > 0.5 ? 2 : 3) as ScaleValue;
        }
      } else {
        // Low/Stable scenario
        if (q.isReverse) {
          sampleAnswers[q.id] = (Math.random() > 0.4 ? 4 : 3) as ScaleValue;
        } else {
          sampleAnswers[q.id] = (Math.random() > 0.5 ? 1 : 0) as ScaleValue;
        }
      }
    });

    setAnswers(sampleAnswers);
    const computed = calculateAssessmentResult(sampleAnswers);
    setResult(computed);
    persistState(sampleAnswers, computed);
  };

  const handleNavigateToPractice = (domainCode?: DomainCode) => {
    setPracticeDomainFilter(domainCode);
    setActiveTab('practice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetest = () => {
    setActiveTab('survey');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  const answeredCount = Object.keys(answers).length;
  const isAllAnswered = answeredCount === QUESTIONS.length;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2621] font-sans flex flex-col selection:bg-[#F5D5CE] selection:text-[#5A241C]">
      {/* Printable Report (hidden on screen, visible when printing) */}
      <PrintReportView result={result} />

      {/* Screen App Container */}
      <div className="print:hidden flex-1 flex flex-col">
        {/* Header & Tabs */}
        <Header
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          hasCompleted={!!result}
          answeredCount={answeredCount}
          totalQuestions={QUESTIONS.length}
          isKeyVerified={isKeyVerified}
          onLockedTabClick={scrollToKeyActivation}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
          {/* Landing / Introduction Overview */}
          {activeTab === 'landing' && (
            <LandingPage
              onStartSurvey={() => {
                if (!isKeyVerified) {
                  scrollToKeyActivation();
                  return;
                }
                setActiveTab('survey');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateTab={(tab) => {
                handleTabChange(tab);
              }}
              hasCompleted={!!result}
              isKeyVerified={isKeyVerified}
              onKeyApproved={(key: string) => {
                setApiKey(key);
                setIsKeyVerified(true);
              }}
              onKeyCleared={() => {
                setApiKey('');
                setIsKeyVerified(false);
                setActiveTab('landing');
              }}
            />
          )}

          {/* Tab 1: Survey Form */}
          {activeTab === 'survey' && (
            <div className="space-y-6">
              <ComfortIntroCard />
              <NoticeBanner />
              <Questionnaire
                answers={answers}
                onSelectAnswer={handleSelectAnswer}
                onSubmit={handleSubmit}
                onReset={handleReset}
                onFillSample={handleFillSample}
              />
            </div>
          )}

          {/* Tab 2: Result Report */}
          {activeTab === 'result' && (
            <div>
              {result ? (
                <ResultReport
                  result={result}
                  apiKey={apiKey}
                  isKeyVerified={isKeyVerified}
                  onNavigateToPractice={handleNavigateToPractice}
                  onNavigateToKeyActivation={() => {
                    setActiveTab('landing');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onRetest={handleRetest}
                  onPrint={handlePrint}
                />
              ) : (
                <div className="bg-[#FFFDF9] rounded-3xl border-2 border-[#E7DCCE] p-8 text-center space-y-4 shadow-xs botanical-frame font-serif-kr">
                  <div className="w-12 h-12 rounded-full bg-[#F9ECE8] text-[#8C3E30] flex items-center justify-center mx-auto border border-[#E9C4BC]">
                    <ClipboardList className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#8C3E30] tracking-wider uppercase block">
                      ~ PENDING ASSESSMENT ~
                    </span>
                    <h3 className="text-lg font-bold text-[#2C241E]">
                      자가점검이 아직 완료되지 않았습니다
                    </h3>
                    <p className="text-xs text-[#7A6A5E] max-w-md mx-auto leading-relaxed">
                      15개 문항에 모두 응답하시면 점수 산출 로직에 따라 종합 해석과 5개 영역별 분석 리포트가 생성됩니다.
                    </p>
                  </div>
                  <div className="pt-2 flex flex-wrap justify-center gap-3">
                    <button
                      onClick={() => setActiveTab('survey')}
                      className="px-5 py-2.5 rounded-xl bg-[#C87D6F] hover:bg-[#B66B5D] text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <span>문항지로 이동하여 답변하기</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        handleFillSample('moderate');
                        setActiveTab('result');
                      }}
                      className="px-4 py-2.5 rounded-xl bg-[#FAF6EE] hover:bg-[#F2EADC] text-[#5A4B40] border border-[#D8C7B5] font-semibold text-xs transition-colors cursor-pointer"
                    >
                      예시 데이터로 리포트 미리보기
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Practice Guide */}
          {activeTab === 'practice' && (
            <PracticeGuide
              selectedDomain={practiceDomainFilter}
              highlightedDomains={result?.highestRiskDomains || []}
            />
          )}

          {/* Tab 4: Precautions */}
          {activeTab === 'precautions' && <PrecautionsGuide />}
        </main>

        {/* Footer */}
        <footer className="bg-[#FFFDF9] border-t-2 border-[#E7DCCE] mt-12 py-8 text-xs text-[#7A6A5E] font-serif-kr">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <p className="font-bold text-[#2C241E]">
                {APP_TITLE}
              </p>
              <p className="text-[11px] text-[#8C7564]">
                본 자가점검 도구는 상담원 개인의 회복 및 조직적 보호 자원 지원을 목적으로 제공되며, 인사 평가 및 불이익 근거로 활용될 수 없습니다.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium text-[#6B5E54]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#2F6131]" />
                개인정보 비수집 원칙
              </span>
              <span className="text-[#C87D6F]">✤</span>
              <span className="flex items-center gap-1">
                <HeartHandshake className="w-4 h-4 text-[#C87D6F]" />
                상담원 심리 안전망
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

