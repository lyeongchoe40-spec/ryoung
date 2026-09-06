import {
  AssessmentResult,
  DomainCode,
  DomainInfo,
  PracticeCategory,
  PrecautionItem,
  Question,
  RiskTier,
  ScaleValue,
} from '../types';

export const APP_TITLE = '고용센터 실업급여 상담원 정서소진 알아차림 및 마음회복 가이드';

export const APP_INTRO =
  '이 자가점검 툴은 고용센터 실업급여팀 상담원들이 마주하는 과도한 업무 과부하와 감정노동 현실을 정교하게 진단하기 위해 심리학적 타당도와 현장 실효성을 높여 설계되었습니다. 단순한 척도 측정을 넘어 개인이 스스로 상태를 알아차리고, 조직적 관점에서 지원 방안을 모색할 수 있도록 구성되어 있습니다.';

export const NOTICE_TEXT =
  '이 체크리스트는 최근의 직무 스트레스와 회복·지원 필요성을 스스로 살펴보기 위한 교육용 자료입니다. 표준화된 심리검사나 의학적 진단도구가 아니며, 점수만으로 번아웃이나 정신건강 상태를 진단하지 않습니다. 최근 2주 동안의 업무 경험을 떠올리며 각 문항에 답해 보세요.';

export const SCALE_OPTIONS = [
  { value: 0, label: '0점', text: '전혀 없었다' },
  { value: 1, label: '1점', text: '거의 없었다' },
  { value: 2, label: '2점', text: '가끔 있었다' },
  { value: 3, label: '3점', text: '자주 있었다' },
  { value: 4, label: '4점', text: '매우 자주 있었다' },
] as const;

export const DOMAIN_INFO: Record<DomainCode, DomainInfo> = {
  A: {
    code: 'A',
    title: '⚡ 영역 A. 업무 과부하와 예측 불가능성',
    subTitle: '업무 과부하와 통제 곤란 / 0~12점',
    focusPoint: '점수가 높다면 담당 창구 업무량 조정, 서류 처리 타임 블로킹 및 인력 재배치가 필요합니다.',
    icon: 'Zap',
    colorClass: 'text-amber-700',
    bgColorClass: 'bg-amber-50',
    borderColorClass: 'border-amber-200',
    accentColor: '#d97706',
  },
  B: {
    code: 'B',
    title: '🌊 영역 B. 감정노동과 정서적 소진',
    subTitle: '감정노동과 정서적 소진 / 0~12점',
    focusPoint: '점수가 높다면 악성 민원 분리 응대, 창구 휴게시간 확보, 감정 완충 절차가 시급합니다.',
    icon: 'Waves',
    colorClass: 'text-sky-700',
    bgColorClass: 'bg-sky-50',
    borderColorClass: 'border-sky-200',
    accentColor: '#0284c7',
  },
  C: {
    code: 'C',
    title: '🔄 영역 C. 업무 후 반추와 회복 곤란',
    subTitle: '업무 후 반추와 회복 곤란 / 0~12점',
    focusPoint: '점수가 높다면 퇴근 후 업무 연락 차단, 물리적·정신적 퇴근 리추얼(Ritual) 형성이 필수적입니다.',
    icon: 'RotateCw',
    colorClass: 'text-indigo-700',
    bgColorClass: 'bg-indigo-50',
    borderColorClass: 'border-indigo-200',
    accentColor: '#4f46e5',
  },
  D: {
    code: 'D',
    title: '🛡️ 영역 D. 통제감과 대처 역량 (역채점 영역)',
    subTitle: '통제감 및 대처 역량 부족 / 0~12점',
    focusPoint: '점수가 높다면 직무 유능감이 하락한 상태이므로 셀프 컴패션(자기 자비) 강화 및 대응 매뉴얼 복기가 도움 됩니다.',
    icon: 'Shield',
    colorClass: 'text-emerald-700',
    bgColorClass: 'bg-emerald-50',
    borderColorClass: 'border-emerald-200',
    accentColor: '#059669',
  },
  E: {
    code: 'E',
    title: '🏢 영역 E. 동료·관리자·조직의 보호 자원 (역채점 영역)',
    subTitle: '조직적 보호 자원 부족 / 0~12점',
    focusPoint: '점수가 높다면 관리자의 즉각 개입 체계, 기관 차원의 법적·제도적 안전장치 및 고충 처리 절차점검이 요구됩니다.',
    icon: 'Building2',
    colorClass: 'text-rose-700',
    bgColorClass: 'bg-rose-50',
    borderColorClass: 'border-rose-200',
    accentColor: '#e11d48',
  },
};

export const QUESTIONS: Question[] = [
  // 영역 A
  {
    id: 1,
    domain: 'A',
    domainName: '영역 A. 업무 과부하와 예측 불가능성',
    domainShortTitle: '업무 과부하와 통제 곤란',
    text: '갑작스러운 민원 상황으로 업무 흐름을 조절하기 어려웠다.',
    isReverse: false,
  },
  {
    id: 2,
    domain: 'A',
    domainName: '영역 A. 업무 과부하와 예측 불가능성',
    domainShortTitle: '업무 과부하와 통제 곤란',
    text: '주어진 시간 안에 처리하기 어려울 만큼 업무가 많다고 느꼈다.',
    isReverse: false,
  },
  {
    id: 3,
    domain: 'A',
    domainName: '영역 A. 업무 과부하와 예측 불가능성',
    domainShortTitle: '업무 과부하와 통제 곤란',
    text: '민원 대응이나 업무 진행을 내 힘으로 조절하기 어렵다고 느꼈다.',
    isReverse: false,
  },

  // 영역 B
  {
    id: 4,
    domain: 'B',
    domainName: '영역 B. 감정노동과 정서적 소진',
    domainShortTitle: '감정노동과 정서적 소진',
    text: '민원인의 강한 항의나 감정 표현을 응대하는 것이 정서적으로 힘들었다.',
    isReverse: false,
  },
  {
    id: 5,
    domain: 'B',
    domainName: '영역 B. 감정노동과 정서적 소진',
    domainShortTitle: '감정노동과 정서적 소진',
    text: '실제 감정과 다르게 침착한 태도를 유지해야 해서 지쳤다.',
    isReverse: false,
  },
  {
    id: 6,
    domain: 'B',
    domainName: '영역 B. 감정노동과 정서적 소진',
    domainShortTitle: '감정노동과 정서적 소진',
    text: '상담업무에 쏟을 정서적 에너지나 의욕이 부족하다고 느꼈다.',
    isReverse: false,
  },

  // 영역 C
  {
    id: 7,
    domain: 'C',
    domainName: '영역 C. 업무 후 반추와 회복 곤란',
    domainShortTitle: '업무 후 반추와 회복 곤란',
    text: '퇴근 후에도 업무 중 겪은 민원 상황이 떠올랐다.',
    isReverse: false,
  },
  {
    id: 8,
    domain: 'C',
    domainName: '영역 C. 업무 후 반추와 회복 곤란',
    domainShortTitle: '업무 후 반추와 회복 곤란',
    text: '업무에 대한 생각이나 긴장 때문에 충분히 쉬기 어려웠다.',
    isReverse: false,
  },
  {
    id: 9,
    domain: 'C',
    domainName: '영역 C. 업무 후 반추와 회복 곤란',
    domainShortTitle: '업무 후 반추와 회복 곤란',
    text: '업무로 지친 상태가 가까운 사람을 대하는 태도에 영향을 주었다.',
    isReverse: false,
  },

  // 영역 D (역채점)
  {
    id: 10,
    domain: 'D',
    domainName: '영역 D. 통제감과 대처 역량 (역채점 영역)',
    domainShortTitle: '통제감 및 대처 역량 부족',
    text: '어려운 민원 상황에서도 대응 순서를 정해 처리할 수 있었다.',
    isReverse: true,
  },
  {
    id: 11,
    domain: 'D',
    domainName: '영역 D. 통제감과 대처 역량 (역채점 영역)',
    domainShortTitle: '통제감 및 대처 역량 부족',
    text: '민원인의 감정적 반응을 나에 대한 개인적인 평가와 구분할 수 있었다.',
    isReverse: true,
  },
  {
    id: 12,
    domain: 'D',
    domainName: '영역 D. 통제감과 대처 역량 (역채점 영역)',
    domainShortTitle: '통제감 및 대처 역량 부족',
    text: '업무가 끝난 후 긴장을 완화하고 회복하는 시간을 가질 수 있었다.',
    isReverse: true,
  },

  // 영역 E (역채점)
  {
    id: 13,
    domain: 'E',
    domainName: '영역 E. 동료·관리자·조직의 보호 자원 (역채점 영역)',
    domainShortTitle: '조직적 보호 자원 부족',
    text: '도움이 필요할 때 조직 안에서 도움을 요청할 대상을 찾을 수 있었다.',
    isReverse: true,
  },
  {
    id: 14,
    domain: 'E',
    domainName: '영역 E. 동료·관리자·조직의 보호 자원 (역채점 영역)',
    domainShortTitle: '조직적 보호 자원 부족',
    text: '어려운 민원에 대응할 때 필요한 공식 절차나 지침을 확인할 수 있었다.',
    isReverse: true,
  },
  {
    id: 15,
    domain: 'E',
    domainName: '영역 E. 동료·관리자·조직의 보호 자원 (역채점 영역)',
    domainShortTitle: '조직적 보호 자원 부족',
    text: '힘든 민원 후 회복에 필요한 시간이나 지원을 요청할 수 있었다.',
    isReverse: true,
  },
];

export const SCORING_LOGIC_EXPLANATION = {
  title: '채점 산출 로직 (총점: 0~60점 만점)',
  normalItems: '일반 문항 (영역 A·B·C): 기재한 응답 점수(0~4점)를 그대로 합산합니다.',
  reversedItems: '역채점 문항 (영역 D·E): 점수를 반대로 환산하여 합산합니다.',
  conversionRule: '(0점 ➔ 4점 / 1점 ➔ 3점 / 2점 ➔ 2점 / 3점 ➔ 1점 / 4점 ➔ 0점)',
};

export const RISK_TIERS: RiskTier[] = [
  {
    id: 'green',
    rangeText: '0 ~ 20점',
    min: 0,
    max: 20,
    label: '안정 및 회복 유지 (Green)',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-800',
    borderClass: 'border-emerald-300',
    bgLight: 'bg-emerald-50/70',
    summaryTitle: '현재 직무 스트레스와 소진 수준이 비교적 잘 관리되고 있습니다.',
    description: '일상적인 회복 루틴을 유지하고, 동료 간의 긍정적인 지지 관계를 이어나가세요.',
  },
  {
    id: 'yellow',
    rangeText: '21 ~ 35점',
    min: 21,
    max: 35,
    label: '알아차림과 충전 필요 (Yellow)',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-800',
    borderClass: 'border-amber-300',
    bgLight: 'bg-amber-50/70',
    summaryTitle: '업무 과부하 및 민원 응대로 인한 심리적 피로가 누적되기 시작했습니다.',
    description: '마이크로 휴식을 도입하고 일과 삶의 경계를 명확히 설정할 필요가 있습니다. [3]번 섹션의 취약 영역별 실천 수칙을 적용해 보세요.',
  },
  {
    id: 'orange',
    rangeText: '36 ~ 48점',
    min: 36,
    max: 48,
    label: '적극적 조율과 쉼 필요 (Orange)',
    badgeBg: 'bg-orange-100',
    badgeText: 'text-orange-800',
    borderClass: 'border-orange-300',
    bgLight: 'bg-orange-50/70',
    summaryTitle: '정서적 소진과 업무 후 반추 경향이 높은 경고 상태입니다.',
    description: '개인의 노력만으로 극복하기 어려울 수 있으므로, 동료 지원 및 관리자 면담을 통한 업무량 조정과 조직적 자원 요청이 시급합니다.',
  },
  {
    id: 'red',
    rangeText: '49 ~ 60점',
    min: 49,
    max: 60,
    label: '집중 보호와 전문 지원 필요 (Red)',
    badgeBg: 'bg-rose-100',
    badgeText: 'text-rose-800',
    borderClass: 'border-rose-300',
    bgLight: 'bg-rose-50/70',
    summaryTitle: '만성적 번아웃 상태이며 개인 대처 기제가 거의 고갈된 상태입니다.',
    description: '즉시 센터 내 EAP 전문 심리상담 프로그램이나 외부 전문 의료기관의 지원을 받고, 관리자의 즉각적인 민원 응대 보호 조치가 필요합니다.',
  },
];

export const PRACTICE_CATEGORIES: PracticeCategory[] = [
  {
    domainCode: 'A',
    categoryTitle: '1. 과부하 및 통제 곤란 영역 집중 실천',
    items: [
      '타임 블로킹(Time Blocking) 적용: 하루 업무 중 집중 민원 응대 시간과 서류 처리 시간을 명확히 구분하여 멀티태스킹 줄이기',
      '마이크로 휴식 인터벌: 민원 처리 건수가 5건을 넘을 때마다 1~2분간 모니터에서 눈을 떼고 심호흡하며 뇌 휴식 취하기',
      '업무 우선순위 재조정: 당일 처리해야 할 필수 핵심 업무 외에 유연하게 조정 가능한 서류는 과감히 다음 시간대로 미루기',
      '동료 간 업무 헬프 라인 가동: 창구 대기 인원이나 민원 압박이 극심할 때 주저하지 말고 동료에게 지원 신호 보내기',
      "'오늘의 완수' 기준 낮추기: 완벽한 처리를 고집하기보다, 규정에 맞춰 공정하게 최선을 다했다면 그것으로 충분하다고 스스로 인정하기",
    ],
  },
  {
    domainCode: 'B',
    categoryTitle: '2. 감정노동 및 정서적 소진 영역 집중 실천',
    items: [
      "'인격'과 '민원 업무' 분리 선언: 민원인의 분노는 상담원 개인을 향한 공격이 아니라 실업급여 제도의 한계에 대한 불만임을 머릿속으로 되새기기",
      '창구용 방어 화법 장착: 감정이 격앙된 민원인에게 "담당자인 제가 임의로 처리할 수 없는 법정 사무입니다"라며 공적 규정을 방패로 삼기',
      '정서적 거리두기 멘탈 리허설: 출근 전 "오늘 만나는 민원인의 감정은 그들의 몫, 내 감정은 나의 몫"이라고 마음속 선 긋기',
      '감정 배출 저널링(글쓰기): 근무 중 쌓인 억울하고 답답한 감정을 퇴근 직후 메모장에 거칠게라도 쏟아내어 머릿속에서 비워내기',
      '동료와의 5분 공감 디브리핑: 힘든 민원을 겪은 직후 동료와 서로 "정말 고생 많았다"며 감정의 찌꺼기를 즉시 털어내고 공감 받기',
    ],
  },
  {
    domainCode: 'C',
    categoryTitle: '3. 업무 후 반추 및 회복 곤란 영역 집중 실천',
    items: [
      "퇴근길 물리적 의식(Ritual) 치르기: 센터 문을 나서는 순간 가상의 '업무 차단 버튼'을 누르는 상상을 하며 퇴근길 음악이나 팟캐스트에 집중하기",
      '저녁 시간 디지털 디톡스: 퇴근 후 스마트폰의 업무 관련 알림을 무음으로 전환하고 일과 삶의 공간 철저히 분리하기',
      '일상의 가벼운 신체 활동: 퇴근 후 가벼운 산책이나 스트레칭을 통해 머릿속에 가득 찬 생각 에너지를 신체 감각으로 분산시키기',
      '이완 호흡 및 명상: 잠들기 전 5분간 깊은 복식호흡을 하며 하루 동안 경직된 신경계와 근육 이완시키기',
      '일상 관계에서의 스위치 켜기: 가족이나 친구와 대화할 때 오늘 겪은 민원 이야기를 반복하기보다, 일상적이고 소소한 주제로 대화 전환하기',
    ],
  },
  {
    domainCode: 'D',
    categoryTitle: '4. 통제감 및 대처 역량 부족 영역 집중 실천',
    items: [
      '작은 성취 기록하기: 오늘 하루 원칙에 맞게 잘 처리했거나 무사히 넘긴 민원 건들을 떠올리며 스스로 작은 칭찬 건네기',
      '대응 매뉴얼 복기 및 숙지: 막연한 불안감을 줄이기 위해, 까다로운 규정이나 지침을 다시 한번 눈으로 확인하며 업무 전문성 다지기',
      '셀프 컴패션(자기 자비) 연습: "지금 내가 힘든 것은 역량이 부족해서가 아니라, 감정 소모가 큰 고강도 업무를 하고 있기 때문이다"라며 스스로 다독이기',
      '긍정적 피드백 수렴하기: 원만하게 해결되었거나 고마움을 표하고 간 민원인의 기억을 떠올리며 상담사로서의 보람 되새기기',
      '전문 심리 프로그램(EAP) 활용: 내 힘만으로 감정 조절이나 대처가 버거울 때, 기관에서 지원하는 전문 상담 프로그램을 주저하지 않고 이용하기',
    ],
  },
  {
    domainCode: 'E',
    categoryTitle: '5. 조직적 보호 자원 부족 영역 집중 실천',
    items: [
      '관리자 에스컬레이션 적극 활용: 악성 민원이나 폭언이 발생할 경우, 혼자 감당하지 않고 즉시 팀장 개입 및 지원 요청하기',
      '기관 보호 장치 적극 가동: 창구 녹음기 안내 방송, 비상벨, 통화 종료 지침 등 조직이 제공하는 안전장치를 주저 없이 사용하기',
      '팀 내 공식 지원 창구 활용: 개인의 고충으로 삭이지 말고, 팀 내 고충 처리나 동료 지원 프로그램을 통해 조직적 대책 요구하기',
      '법적 보호 절차 확인: 폭언·위협 민원에 대한 기관 차원의 고발 및 법적 대응 매뉴얼을 미리 숙지하고 사측에 보호 요구하기',
      '동료 집단 지성 공유: 까다로운 민원 응대 사례와 효과적인 대처 노하우를 팀원들과 공유하여 개인이 고립되지 않는 환경 만들기',
    ],
  },
];

export const PRECAUTIONS: PrecautionItem[] = [
  {
    id: 1,
    title: '비표준 자가점검 도구',
    description:
      '이 문항지는 PSS-10을 그대로 번안한 검사가 아니며, 신뢰도·타당도 검증이 완료된 임상적 진단도구가 아닙니다. 점수만으로 ‘정상’, ‘번아웃’, ‘고위험군’을 판정해서는 안 됩니다.',
  },
  {
    id: 2,
    title: '영역별 종합 해석',
    description:
      '총점만으로 상태를 단정하면 중요한 정보가 가려질 수 있으므로, 5개 영역별 점수와 최근의 변화 양상을 함께 살펴야 합니다.',
  },
  {
    id: 3,
    title: '개인 책임으로의 환원 금지',
    description:
      '점수가 높게 나타난 원인을 상담원 개인의 대처 능력 부족으로만 해석해서는 안 되며, 업무량, 민원 강도, 관리자 지원, 휴식 보장 등 조직적 요인을 함께 점검해야 합니다.',
  },
  {
    id: 4,
    title: '인사 평가 활용 금지',
    description:
      '본 자가점검 결과는 인사평가, 근무성적 평가, 배치 불이익이나 징계의 근거로 절대 사용할 수 없습니다. 비밀이 철저히 보장되어야 하며, 집단 통계는 개인을 식별할 수 없도록 처리해야 합니다.',
  },
  {
    id: 5,
    title: '위기 상황 시 즉각 개입',
    description:
      '심각한 불면, 공황, 일상생활 곤란, 자해·자살 사고 또는 신체적 안전 위협이 있는 경우에는 총점과 관계없이 즉시 전문적인 도움과 공식 보호 절차를 이용하도록 안내해야 합니다.',
  },
];

/**
 * Score calculating helper
 */
export function calculateAssessmentResult(answers: Record<number, ScaleValue>): AssessmentResult {
  const domainScores: Record<DomainCode, any> = {
    A: { code: 'A', domainName: DOMAIN_INFO.A.title, rawScoreSum: 0, calculatedScore: 0, maxScore: 12, percentage: 0, riskStatus: '안정', focusPoint: DOMAIN_INFO.A.focusPoint },
    B: { code: 'B', domainName: DOMAIN_INFO.B.title, rawScoreSum: 0, calculatedScore: 0, maxScore: 12, percentage: 0, riskStatus: '안정', focusPoint: DOMAIN_INFO.B.focusPoint },
    C: { code: 'C', domainName: DOMAIN_INFO.C.title, rawScoreSum: 0, calculatedScore: 0, maxScore: 12, percentage: 0, riskStatus: '안정', focusPoint: DOMAIN_INFO.C.focusPoint },
    D: { code: 'D', domainName: DOMAIN_INFO.D.title, rawScoreSum: 0, calculatedScore: 0, maxScore: 12, percentage: 0, riskStatus: '안정', focusPoint: DOMAIN_INFO.D.focusPoint },
    E: { code: 'E', domainName: DOMAIN_INFO.E.title, rawScoreSum: 0, calculatedScore: 0, maxScore: 12, percentage: 0, riskStatus: '안정', focusPoint: DOMAIN_INFO.E.focusPoint },
  };

  let totalScore = 0;

  QUESTIONS.forEach((q) => {
    const rawVal = answers[q.id] ?? 0;
    domainScores[q.domain].rawScoreSum += rawVal;

    let effectiveScore = rawVal;
    if (q.isReverse) {
      // 0->4, 1->3, 2->2, 3->1, 4->0
      effectiveScore = 4 - rawVal;
    }
    domainScores[q.domain].calculatedScore += effectiveScore;
  });

  // Calculate total and percentages
  (Object.keys(domainScores) as DomainCode[]).forEach((code) => {
    const ds = domainScores[code];
    totalScore += ds.calculatedScore;
    ds.percentage = Math.round((ds.calculatedScore / ds.maxScore) * 100);

    // Domain status: 0~3 안정 유지, 4~7 충전 권장, 8~10 조율 필요, 11~12 집중 지원
    if (ds.calculatedScore <= 3) {
      ds.riskStatus = '안정 유지';
    } else if (ds.calculatedScore <= 7) {
      ds.riskStatus = '충전 권장';
    } else if (ds.calculatedScore <= 10) {
      ds.riskStatus = '조율 필요';
    } else {
      ds.riskStatus = '집중 지원';
    }
  });

  // Determine overall risk tier
  let riskTier = RISK_TIERS[0];
  for (const tier of RISK_TIERS) {
    if (totalScore >= tier.min && totalScore <= tier.max) {
      riskTier = tier;
      break;
    }
  }

  // Find highest risk domains (sorted by calculated score desc)
  const sortedDomains = (Object.keys(domainScores) as DomainCode[]).sort(
    (a, b) => domainScores[b].calculatedScore - domainScores[a].calculatedScore
  );
  const highestRiskDomains = sortedDomains.filter(
    (code) => domainScores[code].calculatedScore >= 6
  );

  return {
    totalScore,
    maxTotalScore: 60,
    riskTier,
    domainScores,
    highestRiskDomains: highestRiskDomains.length > 0 ? highestRiskDomains : [sortedDomains[0]],
    completedAt: new Date().toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    answers,
  };
}
