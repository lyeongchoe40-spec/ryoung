export type ScaleValue = 0 | 1 | 2 | 3 | 4;

export type DomainCode = 'A' | 'B' | 'C' | 'D' | 'E';

export interface Question {
  id: number;
  domain: DomainCode;
  domainName: string;
  domainShortTitle: string;
  text: string;
  isReverse: boolean;
}

export interface DomainInfo {
  code: DomainCode;
  title: string;
  subTitle: string;
  focusPoint: string;
  icon: string;
  colorClass: string;
  bgColorClass: string;
  borderColorClass: string;
  accentColor: string;
}

export type RiskLevel = 'green' | 'yellow' | 'orange' | 'red';

export interface RiskTier {
  id: RiskLevel;
  rangeText: string;
  min: number;
  max: number;
  label: string;
  badgeBg: string;
  badgeText: string;
  borderClass: string;
  bgLight: string;
  summaryTitle: string;
  description: string;
}

export interface DomainScore {
  code: DomainCode;
  domainName: string;
  rawScoreSum: number; // raw sum
  calculatedScore: number; // after reversing D and E (0~12)
  maxScore: number;
  percentage: number;
  riskStatus: string;
  focusPoint: string;
}

export interface AssessmentResult {
  totalScore: number;
  maxTotalScore: number;
  riskTier: RiskTier;
  domainScores: Record<DomainCode, DomainScore>;
  highestRiskDomains: DomainCode[];
  completedAt: string;
  answers: Record<number, ScaleValue>;
}

export interface PracticeCategory {
  domainCode: DomainCode;
  categoryTitle: string;
  items: string[];
}

export interface PrecautionItem {
  id: number;
  title: string;
  description: string;
}

export type TabType = 'landing' | 'survey' | 'result' | 'practice' | 'precautions';

export interface ApiKeyStatus {
  isVerified: boolean;
  apiKey: string; // ephemeral React state memory only, never written to disk or localStorage
  verifiedAt?: string;
}
