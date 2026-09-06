import React from 'react';
import {
  ArrowRight,
  ArrowDown,
  ShieldCheck,
  Clock,
  HeartHandshake,
  Sparkles,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Lock,
  MessageSquareHeart,
  FileSpreadsheet,
  Brain,
  Coffee,
  ChevronRight,
  PhoneCall,
  Heart,
  Flower2,
  KeyRound,
} from 'lucide-react';
import mascotImg from '../assets/images/refined_calm_companion_1788674125139.jpg';
import { TabType } from '../types';
import { ApiKeyActivationCard } from './ApiKeyActivationCard';

interface LandingPageProps {
  onStartSurvey: () => void;
  onNavigateTab: (tab: TabType) => void;
  hasCompleted: boolean;
  isKeyVerified: boolean;
  onKeyApproved: (apiKey: string) => void;
  onKeyCleared: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartSurvey,
  onNavigateTab,
  hasCompleted,
  isKeyVerified,
  onKeyApproved,
  onKeyCleared,
}) => {
  const scrollToKeyActivation = (menuName?: string) => {
    const el = document.getElementById('gemini-activation-wrapper');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-4', 'ring-[#C87D6F]', 'rounded-3xl', 'transition-all');
      setTimeout(() => {
        el.classList.remove('ring-4', 'ring-[#C87D6F]');
      }, 2500);
    }
  };

  return (
    <div id="landing-page-root" className="space-y-12 pb-16 font-sans">
      {/* 0. MANDATORY API KEY GATEWAY BANNER (Shown when key is not verified) */}
      {!isKeyVerified && (
        <div
          id="key-gate-notice"
          className="rounded-2xl bg-[#FFF6F3] border-2 border-[#E8A599] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm font-serif-kr animate-fade-in"
        >
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#8C3729] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5 sm:mt-0">
              <Lock className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#FBE6E2] text-[#8C3E30] text-[11px] font-bold">
                <KeyRound className="w-3 h-3" />
                필수 승인 단계
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#5A241C]">
                Gemini API Key 승인 후 검사 시작 및 전체 메뉴 이용이 가능합니다
              </h3>
              <p className="text-xs text-[#7A362B]">
                실업급여 상담원의 정서 보호 및 맞춤 AI 심리 분석을 위해, 아래 인증 카드에서 유효한 Gemini API Key를 등록하고 승인을 완료해 주세요.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => scrollToKeyActivation('API Key 승인')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#8C3729] hover:bg-[#73291E] text-white text-xs sm:text-sm font-bold transition-all shrink-0 shadow-xs cursor-pointer whitespace-nowrap"
          >
            <span>API Key 승인받기</span>
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 1. HERO SECTION: Vintage Botanical Tearoom Parlor Aesthetic */}
      <section
        id="hero-section"
        className="relative overflow-hidden rounded-3xl bg-[#FFFDF9] text-[#2D2621] p-6 sm:p-10 lg:p-12 border-2 border-[#E7DCCE] shadow-sm botanical-frame"
      >
        {/* Subtle Decorative Floral Flourishes at Corners */}
        <div className="absolute top-3 left-4 text-[#D8C7B5] text-sm pointer-events-none select-none">
          ❧
        </div>
        <div className="absolute top-3 right-4 text-[#D8C7B5] text-sm pointer-events-none select-none">
          ☙
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Hero Text Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#F9ECE8] text-[#8C3E30] border border-[#E9C4BC]">
                <span className="text-[#C87D6F]">✤</span>
                <span>전국 고용센터 실업급여 상담원 마음보호 프로젝트</span>
                <span className="text-[#C87D6F]">✤</span>
              </div>

              <div className="pt-2">
                <span className="text-xs uppercase tracking-widest text-[#8C7564] font-serif-kr block mb-1">
                  ~ SANCTUARY FOR EMOTIONAL RECOVERY ~
                </span>
                <h1 className="text-2xl sm:text-4xl lg:text-[2.6rem] font-bold font-serif-kr tracking-tight leading-tight sm:leading-snug text-[#2C241E]">
                  오늘도 민원인의 고함 뒤에 <br />
                  <span className="text-[#8C3729] underline decoration-[#E9C4BC] underline-offset-8">
                    삼켜버린 눈물이 있으신가요?
                  </span>
                </h1>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#68594E] leading-relaxed max-w-2xl font-normal font-serif-kr">
              수급 자격 심사, 반복되는 억지 민원과 폭언, 퇴근 후에도 귓가에 맴도는 잔상... <br className="hidden sm:inline" />
              지친 것은 결코 당신이 나약해서가 아닙니다. 너무 무거운 짐을 제도적 지원 없이 홀로 짊어졌기 때문입니다.
            </p>

            {/* Botanical Dotted Proof Badges */}
            <div className="rounded-2xl bg-[#FAF6EE] border border-[#EADBCE] p-4 sm:p-5 space-y-2.5">
              <div className="flex items-center justify-between text-xs sm:text-sm text-[#4E4238]">
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#C87D6F]" />
                  <span>15개 실무 특화 자가진단</span>
                </span>
                <span className="dotted-line" />
                <span className="font-serif-kr font-bold text-[#8C3729]">약 3분 소요</span>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm text-[#4E4238]">
                <span className="flex items-center gap-1.5 font-medium">
                  <Lock className="w-3.5 h-3.5 text-[#7E9E7A]" />
                  <span>인사기록 미저장 · 외부 비수집</span>
                </span>
                <span className="dotted-line" />
                <span className="font-serif-kr font-bold text-[#2F6131]">100% 완전 익명</span>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm text-[#4E4238]">
                <span className="flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4A86A]" />
                  <span>5대 영역별 즉시 처방</span>
                </span>
                <span className="dotted-line" />
                <span className="font-serif-kr font-bold text-[#8C3E30]">25가지 회복 수칙</span>
              </div>
            </div>

            {/* Action Buttons - Gated by API Key Verification */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              {isKeyVerified ? (
                <button
                  type="button"
                  onClick={onStartSurvey}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold text-white bg-[#C87D6F] hover:bg-[#B66B5D] transition-all shadow-md hover:shadow-lg cursor-pointer font-serif-kr"
                >
                  <span>지금 내 마음 상태 알아차리기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => scrollToKeyActivation('검사 시작')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold text-white bg-[#8C3E30] hover:bg-[#783326] transition-all shadow-md cursor-pointer font-serif-kr"
                >
                  <Lock className="w-4 h-4" />
                  <span>API Key 승인 후 검사 시작하기</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  if (!isKeyVerified) {
                    scrollToKeyActivation('회복 수칙');
                  } else {
                    onNavigateTab('practice');
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-[#5A4B40] bg-[#FAF6EE] hover:bg-[#F2EADC] border border-[#D8C7B5] transition-colors cursor-pointer font-serif-kr"
              >
                {!isKeyVerified ? (
                  <Lock className="w-3.5 h-3.5 text-[#8C7564]" />
                ) : (
                  <Sparkles className="w-4 h-4 text-[#C87D6F]" />
                )}
                <span>25가지 회복 수칙 {!isKeyVerified ? '(승인 필요)' : '둘러보기'}</span>
              </button>
            </div>

            {hasCompleted && isKeyVerified && (
              <div className="inline-flex items-center gap-2 text-xs text-[#2F6131] font-medium bg-[#EAF3EA] px-3.5 py-2 rounded-xl border border-[#BBD7B9]">
                <CheckCircle2 className="w-4 h-4 text-[#427A45]" />
                <span>이전에 완료한 자가진단 결과가 보관되어 있습니다.</span>
                <button
                  onClick={() => onNavigateTab('result')}
                  className="underline hover:text-[#1F4220] font-bold ml-1 cursor-pointer font-serif-kr"
                >
                  결과 확인하기 →
                </button>
              </div>
            )}
          </div>

          {/* Right Companion Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-[#FFFDF9] p-5 sm:p-6 border-2 border-[#E7DCCE] shadow-md ring-4 ring-[#FAF6EE] text-[#2C241E] space-y-4">
              <div className="text-center pb-2 border-b border-[#EADBCE]">
                <span className="text-[11px] font-bold text-[#8C3E30] tracking-widest uppercase font-serif-kr">
                  ~ COMFORT COMPANION ~
                </span>
                <div className="text-xs text-[#8C7564] mt-0.5">✦ ✤ ✦</div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-sm border-2 border-[#E7DCCE] bg-[#FAF6EE] shrink-0">
                  <img
                    src={mascotImg}
                    alt="실업급여 상담원을 응원하는 컴패니언 캐릭터"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold font-serif-kr text-[#2C241E]">
                    "오늘도 참 많이 애쓰셨습니다"
                  </h2>
                  <p className="text-xs text-[#756557] mt-1 font-serif-kr">
                    창구 너머 쏟아지는 감정의 파도 속에서도 최선을 다한 당신에게
                  </p>
                </div>
              </div>

              <div className="bg-[#FAF7F2] rounded-xl p-3.5 text-xs sm:text-sm text-[#4E4238] leading-relaxed border border-[#EADBCE] font-serif-kr">
                "상담원으로서 친절해야 한다는 무게감 때문에, 정작 상처받은 내 마음을 방치하고 있지는 않나요?
                평가받기 위한 검사가 아닙니다. 오직 <strong>소진된 에너지를 알아차리고 보호받기 위한 도구</strong>입니다."
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-[#8C7564] font-serif-kr">
                <span className="flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5 text-[#C87D6F]" />
                  따뜻한 차 한 잔의 위로
                </span>
                <span className="italic text-[#8C3729]">Arranged with care and love</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1.5. GEMINI API KEY ACTIVATION & APPROVAL SECTION (MANDATORY GATEWAY) */}
      <section id="gemini-activation-wrapper" className="scroll-mt-24">
        <ApiKeyActivationCard
          isVerified={isKeyVerified}
          onKeyApproved={onKeyApproved}
          onKeyCleared={onKeyCleared}
          onProceedToSurvey={onStartSurvey}
        />
      </section>

      {/* 2. PAIN POINTS: Empathy & Grounded Reality (Arched Botanical Cards) */}
      <section id="pain-points-section" className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#8C3E30] tracking-widest uppercase bg-[#F9ECE8] px-3.5 py-1 rounded-full border border-[#E9C4BC] font-serif-kr">
            실업급여 창구의 숨겨진 현실
          </span>
          <h2 className="text-xl sm:text-3xl font-bold font-serif-kr text-[#2C241E] tracking-tight">
            혹시 이런 순간들을 매일 견디고 계신가요?
          </h2>
          <div className="text-xs text-[#C87D6F] font-serif-kr">~ ✤ ~</div>
          <p className="text-sm text-[#6E6155] font-serif-kr">
            고용센터 실업급여 창구는 민원인의 생계 불안과 절박함이 여과 없이 쏟아지는 최전선입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1 */}
          <div className="bg-[#FFFDF9] rounded-2xl p-5 border-2 border-[#E7DCCE] shadow-2xs hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F9ECE8] text-[#8C3E30] flex items-center justify-center font-bold border border-[#E9C4BC]">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-serif-kr text-[#2C241E]">
              "내가 낸 세금인데 왜 안 줘!"
            </h3>
            <p className="text-xs sm:text-sm text-[#6E6155] leading-relaxed font-normal">
              법정 수급 요건을 성실히 안내했을 뿐인데 무차별적인 고함, 삿대질, 인신공격의 감정 쓰레기통이 됩니다.
            </p>
            <div className="pt-2 text-[11px] text-[#8C3729] italic font-serif-kr border-t border-[#F0E6D8]">
              ~ 부당한 폭언과 감정 고갈 ~
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#FFFDF9] rounded-2xl p-5 border-2 border-[#E7DCCE] shadow-2xs hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FCF6EC] text-[#8C6D3B] flex items-center justify-center font-bold border border-[#EADBCE]">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-serif-kr text-[#2C241E]">
              퇴근길에도 멈추지 않는 잔상
            </h3>
            <p className="text-xs sm:text-sm text-[#6E6155] leading-relaxed font-normal">
              창구 셔터가 내려가도 낮에 겪은 폭언과 악성 민원인의 표정이 밤새 머릿속을 맴돌며 불면으로 이어집니다.
            </p>
            <div className="pt-2 text-[11px] text-[#8C6D3B] italic font-serif-kr border-t border-[#F0E6D8]">
              ~ 퇴근 후 반추와 수면 곤란 ~
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#FFFDF9] rounded-2xl p-5 border-2 border-[#E7DCCE] shadow-2xs hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF3EA] text-[#2F6131] flex items-center justify-center font-bold border border-[#BBD7B9]">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-serif-kr text-[#2C241E]">
              화장실 갈 틈 없는 서류의 산
            </h3>
            <p className="text-xs sm:text-sm text-[#6E6155] leading-relaxed font-normal">
              끝없는 대기 번호표, 쏟아지는 전화벨, 당일 처리해야 할 수급자격 인정 서류의 압박에 숨이 턱 끝까지 찹니다.
            </p>
            <div className="pt-2 text-[11px] text-[#2F6131] italic font-serif-kr border-t border-[#F0E6D8]">
              ~ 업무 과부하와 압박감 ~
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-[#FFFDF9] rounded-2xl p-5 border-2 border-[#E7DCCE] shadow-2xs hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5EEF8] text-[#6E3B85] flex items-center justify-center font-bold border border-[#DFC8E6]">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-serif-kr text-[#2C241E]">
              "나만 유독 멘탈이 약한 걸까?"
            </h3>
            <p className="text-xs sm:text-sm text-[#6E6155] leading-relaxed font-normal">
              동료들은 잘 버티는 것처럼 보여 나 혼자 부족하고 예민한 탓이라며 스스로를 끝없이 책망하게 됩니다.
            </p>
            <div className="pt-2 text-[11px] text-[#6E3B85] italic font-serif-kr border-t border-[#F0E6D8]">
              ~ 혼자만의 자책과 고립 ~
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMPARISON & STRENGTHS: Vintage Price-List Menu Style (Like Attached Image) */}
      <section
        id="features-comparison"
        className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 border-2 border-[#E7DCCE] shadow-sm space-y-8 botanical-frame"
      >
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#8C3E30] tracking-widest uppercase bg-[#F9ECE8] px-3.5 py-1 rounded-full border border-[#E9C4BC] font-serif-kr">
            차별화된 핵심 강점
          </span>
          <h2 className="text-xl sm:text-3xl font-bold font-serif-kr text-[#2C241E] tracking-tight">
            시중의 뻔한 번아웃 테스트와 무엇이 다른가요?
          </h2>
          <div className="text-xs text-[#C87D6F] font-serif-kr">~ ✤ ~</div>
          <p className="text-sm text-[#6E6155] font-serif-kr">
            추상적인 심리검사가 아닙니다. 실업급여 창구의 실제 업무 프로세스와 전문 심리학적 타당도를 정밀하게 결합했습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Column A: Traditional Generic Tests */}
          <div className="rounded-2xl bg-[#FAF6EE] p-6 border-2 border-[#EADBCE] space-y-5">
            <div className="text-center pb-3 border-b border-[#E0D2C2]">
              <h3 className="font-serif-kr font-bold text-base uppercase tracking-wider text-[#6B5E54]">
                일반 온라인 스트레스 검사
              </h3>
              <div className="text-xs text-[#9E8E81] mt-0.5 font-serif-kr">~ ✕ ~</div>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-[#5C4F44] font-serif-kr">
              <div className="flex items-center justify-between">
                <span>질문 내용</span>
                <span className="dotted-line" />
                <span className="text-[#8C7564] font-medium">두루뭉술하고 추상적</span>
              </div>
              <div className="flex items-center justify-between">
                <span>진단 결과</span>
                <span className="dotted-line" />
                <span className="text-[#8C7564] font-medium">점수 통보 후 방치</span>
              </div>
              <div className="flex items-center justify-between">
                <span>원인 규명</span>
                <span className="dotted-line" />
                <span className="text-[#8C7564] font-medium">개인 멘탈 탓으로 치부</span>
              </div>
              <div className="flex items-center justify-between">
                <span>보안 우려</span>
                <span className="dotted-line" />
                <span className="text-[#8C7564] font-medium">사내 전산 유출 불안</span>
              </div>
            </div>

            <div className="pt-2 text-center text-xs text-[#9E8E81] italic font-serif-kr">
              Generic assessments lacking counseling context.
            </div>
          </div>

          {/* Column B: Tailored Assessment (Rose & Botanical Highlight) */}
          <div className="rounded-2xl bg-[#FFF9F7] p-6 border-2 border-[#C87D6F] space-y-5 shadow-xs">
            <div className="text-center pb-3 border-b border-[#E9C4BC]">
              <h3 className="font-serif-kr font-bold text-base uppercase tracking-wider text-[#8C3729]">
                실업급여팀 맞춤형 자가진단
              </h3>
              <div className="text-xs text-[#C87D6F] mt-0.5 font-serif-kr">~ ✤ ~</div>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-[#422C27] font-serif-kr font-medium">
              <div className="flex items-center justify-between">
                <span>질문 내용</span>
                <span className="dotted-line" />
                <span className="text-[#8C3729] font-bold">수급 심사 실무 100% 반영</span>
              </div>
              <div className="flex items-center justify-between">
                <span>진단 결과</span>
                <span className="dotted-line" />
                <span className="text-[#8C3729] font-bold">25가지 현장 처방 연계</span>
              </div>
              <div className="flex items-center justify-between">
                <span>원인 규명</span>
                <span className="dotted-line" />
                <span className="text-[#8C3729] font-bold">조직의 보호 책임(E) 진단</span>
              </div>
              <div className="flex items-center justify-between">
                <span>보안 우려</span>
                <span className="dotted-line" />
                <span className="text-[#2F6131] font-bold">100% 완전 익명 (로컬 저장)</span>
              </div>
            </div>

            <div className="pt-2 text-center text-xs text-[#8C3729] italic font-serif-kr">
              Carefully designed with warmth, empathy, and protection.
            </div>
          </div>
        </div>
      </section>

      {/* 4. 5 DOMAINS PREVIEW (Botanical Catalog Cards - Like Bouquet / Arrangement Boxes) */}
      <section id="domains-preview" className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#2F6131] tracking-widest uppercase bg-[#EAF3EA] px-3.5 py-1 rounded-full border border-[#BBD7B9] font-serif-kr">
            정교한 5차원 다각도 진단
          </span>
          <h2 className="text-xl sm:text-3xl font-bold font-serif-kr text-[#2C241E] tracking-tight">
            내 마음의 어느 곳에 비상벨이 켜졌을까요?
          </h2>
          <div className="text-xs text-[#C87D6F] font-serif-kr">~ ✤ ~</div>
          <p className="text-sm text-[#6E6155] font-serif-kr">
            총점뿐만 아니라 취약 영역을 5가지 축으로 세밀하게 분리하여 맞춤 회복 포인트를 짚어냅니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Domain A */}
          <div className="bg-[#FFFDF9] p-5 rounded-2xl border-2 border-[#EADBCE] shadow-2xs space-y-3">
            <div className="text-center pb-2 border-b border-[#F0E6D8]">
              <span className="text-[11px] font-bold font-serif-kr text-[#8C6D3B] uppercase tracking-wider block">
                DOMAIN A
              </span>
              <div className="text-[10px] text-[#C87D6F]">~ ✤ ~</div>
              <h3 className="text-sm font-bold font-serif-kr text-[#2C241E] mt-1">업무 과부하 & 예측불가</h3>
            </div>
            <p className="text-xs text-[#6E6155] leading-relaxed font-serif-kr">
              창구 대기 민원 밀림, 돌발 수급 문의, 서류 폭증으로 인한 시간 부족
            </p>
            <div className="pt-2 text-[11px] text-[#8C6D3B] italic font-serif-kr text-center border-t border-[#F0E6D8]">
              Workload & Strain
            </div>
          </div>

          {/* Domain B */}
          <div className="bg-[#FFFDF9] p-5 rounded-2xl border-2 border-[#E9C4BC] shadow-2xs space-y-3">
            <div className="text-center pb-2 border-b border-[#F0E6D8]">
              <span className="text-[11px] font-bold font-serif-kr text-[#8C3729] uppercase tracking-wider block">
                DOMAIN B
              </span>
              <div className="text-[10px] text-[#C87D6F]">~ ✤ ~</div>
              <h3 className="text-sm font-bold font-serif-kr text-[#2C241E] mt-1">감정노동 & 정서소진</h3>
            </div>
            <p className="text-xs text-[#6E6155] leading-relaxed font-serif-kr">
              억지 민원 앞 친절 강요, 속마음 억제, 퇴근할 때 영혼이 빠져나간 듯한 탈진
            </p>
            <div className="pt-2 text-[11px] text-[#8C3729] italic font-serif-kr text-center border-t border-[#F0E6D8]">
              Emotional Exhaustion
            </div>
          </div>

          {/* Domain C */}
          <div className="bg-[#FFFDF9] p-5 rounded-2xl border-2 border-[#DFC8E6] shadow-2xs space-y-3">
            <div className="text-center pb-2 border-b border-[#F0E6D8]">
              <span className="text-[11px] font-bold font-serif-kr text-[#6E3B85] uppercase tracking-wider block">
                DOMAIN C
              </span>
              <div className="text-[10px] text-[#C87D6F]">~ ✤ ~</div>
              <h3 className="text-sm font-bold font-serif-kr text-[#2C241E] mt-1">업무 후 반추 & 불면</h3>
            </div>
            <p className="text-xs text-[#6E6155] leading-relaxed font-serif-kr">
              집에 가서도 낮의 고함소리가 떠오르고, 내일 출근 생각에 가슴이 답답함
            </p>
            <div className="pt-2 text-[11px] text-[#6E3B85] italic font-serif-kr text-center border-t border-[#F0E6D8]">
              Rumination & Sleep
            </div>
          </div>

          {/* Domain D */}
          <div className="bg-[#FFFDF9] p-5 rounded-2xl border-2 border-[#C9DCED] shadow-2xs space-y-3">
            <div className="text-center pb-2 border-b border-[#F0E6D8]">
              <span className="text-[11px] font-bold font-serif-kr text-[#275A85] uppercase tracking-wider block">
                DOMAIN D (역채점)
              </span>
              <div className="text-[10px] text-[#C87D6F]">~ ✤ ~</div>
              <h3 className="text-sm font-bold font-serif-kr text-[#2C241E] mt-1">통제감 & 대처 역량</h3>
            </div>
            <p className="text-xs text-[#6E6155] leading-relaxed font-serif-kr">
              업무 우선순위 조절 능력, 스스로 마이크로 쉼을 부여하는 심리적 회복탄력성
            </p>
            <div className="pt-2 text-[11px] text-[#275A85] italic font-serif-kr text-center border-t border-[#F0E6D8]">
              Autonomy & Coping
            </div>
          </div>

          {/* Domain E */}
          <div className="bg-[#FFFDF9] p-5 rounded-2xl border-2 border-[#BBD7B9] shadow-2xs space-y-3">
            <div className="text-center pb-2 border-b border-[#F0E6D8]">
              <span className="text-[11px] font-bold font-serif-kr text-[#2F6131] uppercase tracking-wider block">
                DOMAIN E (역채점)
              </span>
              <div className="text-[10px] text-[#C87D6F]">~ ✤ ~</div>
              <h3 className="text-sm font-bold font-serif-kr text-[#2C241E] mt-1">조직적 보호 자원</h3>
            </div>
            <p className="text-xs text-[#6E6155] leading-relaxed font-serif-kr">
              악성 민원 시 관리자 적극 개입, 동료의 즉각적 공감, 안전한 물리적 환경
            </p>
            <div className="pt-2 text-[11px] text-[#2F6131] italic font-serif-kr text-center border-t border-[#F0E6D8]">
              Institutional Support
            </div>
          </div>
        </div>
      </section>

      {/* 5. 3-STEP PROCESS: Warm Parlor Parchment & Classic Numerals */}
      <section
        id="process-steps"
        className="bg-[#2D2621] text-[#FAF6EE] rounded-3xl p-6 sm:p-10 border-2 border-[#3D342E] space-y-8"
      >
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#E5A496] tracking-widest uppercase font-serif-kr">
            ~ SIMPLE 3-STEP RECOVERY ~
          </span>
          <h2 className="text-xl sm:text-3xl font-bold font-serif-kr text-white">
            단 3분, 나를 돌보는 가장 따뜻한 첫걸음
          </h2>
          <div className="text-xs text-[#E5A496] font-serif-kr">✦ ✤ ✦</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <div className="bg-[#3D342F] rounded-2xl p-6 border border-[#52463F] space-y-3 text-[#E6DBD0]">
            <div className="w-10 h-10 rounded-full bg-[#C87D6F] text-white font-serif-kr font-bold text-base flex items-center justify-center border border-[#E9C4BC]">
              I
            </div>
            <h3 className="text-base font-bold font-serif-kr text-white">15개 문항 솔직하게 체크</h3>
            <p className="text-xs sm:text-sm text-[#D5C7B8] leading-relaxed font-serif-kr">
              최근 2주간 실업급여 창구와 심사 업무에서 겪은 경험을 0점부터 4점까지 편안하게 선택합니다.
            </p>
          </div>

          <div className="bg-[#3D342F] rounded-2xl p-6 border border-[#52463F] space-y-3 text-[#E6DBD0]">
            <div className="w-10 h-10 rounded-full bg-[#8C6D3B] text-white font-serif-kr font-bold text-base flex items-center justify-center border border-[#EADBCE]">
              II
            </div>
            <h3 className="text-base font-bold font-serif-kr text-white">4단계 지지적 리포트 확인</h3>
            <p className="text-xs sm:text-sm text-[#D5C7B8] leading-relaxed font-serif-kr">
              위협적인 낙인 대신 '안정 유지 - 알아차림 - 조율 필요 - 집중 지원'의 따뜻한 회복 관점에서 종합 해석을 확인합니다.
            </p>
          </div>

          <div className="bg-[#3D342F] rounded-2xl p-6 border border-[#52463F] space-y-3 text-[#E6DBD0]">
            <div className="w-10 h-10 rounded-full bg-[#7E9E7A] text-white font-serif-kr font-bold text-base flex items-center justify-center border border-[#BBD7B9]">
              III
            </div>
            <h3 className="text-base font-bold font-serif-kr text-white">25가지 현장 솔루션 실천</h3>
            <p className="text-xs sm:text-sm text-[#D5C7B8] leading-relaxed font-serif-kr">
              나의 취약 영역에 맞는 즉각적 행동 요령을 확인하고, 필요 시 EAP 및 긴급 전문 지원 체계와 즉각 연결합니다.
            </p>
          </div>
        </div>

        <div className="text-center pt-2">
          {isKeyVerified ? (
            <button
              type="button"
              onClick={onStartSurvey}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold text-[#2D2621] bg-[#F5D5CE] hover:bg-[#EAC0B7] transition-all shadow-md cursor-pointer font-serif-kr"
            >
              <span>지금 3분 자가점검 시작하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => scrollToKeyActivation('자가점검')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold text-white bg-[#8C3E30] hover:bg-[#783326] transition-all shadow-md cursor-pointer font-serif-kr"
            >
              <Lock className="w-4 h-4" />
              <span>API Key 승인 후 자가점검 시작하기</span>
            </button>
          )}
        </div>
      </section>

      {/* 6. ETHICAL PRINCIPLES & COUNSELOR VOICE */}
      <section
        id="ethical-guarantee"
        className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border-2 border-[#BBD7B9] flex flex-col md:flex-row items-center justify-between gap-6 botanical-frame"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 bg-[#2F6131] text-white rounded-2xl shrink-0 mt-1 shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold font-serif-kr text-[#2C241E]">
              상담원의 안전이 최우선입니다 (안심 3대 원칙)
            </h3>
            <p className="text-xs sm:text-sm text-[#5C4F44] leading-relaxed font-serif-kr">
              ① 어떠한 외부 서버나 인사 데이터베이스에도 기록되지 않습니다. <br />
              ② 본 진단 점수는 인사 평가나 근태 관리, 불이익 처분의 근거로 절대 활용될 수 없습니다. <br />
              ③ 고위험 상태는 개인의 결함이 아니며, 기관의 특별한 보호 조치와 쉼을 요구할 당당한 권리입니다.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            if (!isKeyVerified) {
              scrollToKeyActivation('운영 및 보호 원칙');
            } else {
              onNavigateTab('precautions');
            }
          }}
          className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#2F6131] bg-[#EAF3EA] hover:bg-[#DEECDD] border border-[#BBD7B9] transition-colors shadow-2xs cursor-pointer font-serif-kr"
        >
          {!isKeyVerified && <Lock className="w-3.5 h-3.5 text-[#2F6131]" />}
          <span>운영 및 보호 원칙 전문 {!isKeyVerified ? '(승인 필요)' : '보기'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </section>

      {/* 7. EMERGENCY HOTLINE FOOTNOTE */}
      <section
        id="emergency-support-card"
        className="bg-[#FDF6F4] rounded-2xl p-5 border-2 border-[#E9C4BC] text-xs text-[#8C3729] flex flex-col sm:flex-row items-center justify-between gap-4 font-serif-kr"
      >
        <div className="flex items-center gap-3">
          <PhoneCall className="w-5 h-5 text-[#C87D6F] shrink-0" />
          <div>
            <span className="font-bold text-[#5A241C] block sm:inline mr-2">
              지금 당장 숨이 막히거나 극심한 심리적 위기 상태이신가요?
            </span>
            <span className="text-[#753429]">
              정신건강 위기상담(1577-0199), 자살예방상담(109) 또는 사내 EAP(근로자지원프로그램)를 통해 즉시 비밀 전문 상담을 요청할 수 있습니다.
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            if (!isKeyVerified) {
              scrollToKeyActivation('위기 상담망');
            } else {
              onNavigateTab('precautions');
            }
          }}
          className="shrink-0 px-3.5 py-1.5 rounded-lg bg-[#C87D6F] hover:bg-[#B66B5D] text-white font-bold transition-colors text-[11px] cursor-pointer inline-flex items-center gap-1"
        >
          {!isKeyVerified && <Lock className="w-3 h-3" />}
          <span>위기 상담망 안내</span>
        </button>
      </section>
    </div>
  );
};
