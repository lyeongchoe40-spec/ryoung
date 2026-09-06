import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Waves,
  RotateCw,
  Shield,
  Building2,
  CheckSquare,
  Square,
  Bookmark,
  Filter,
  Copy,
  Check,
} from 'lucide-react';
import { DomainCode } from '../types';
import { PRACTICE_CATEGORIES, DOMAIN_INFO } from '../data/assessmentData';

interface PracticeGuideProps {
  selectedDomain?: DomainCode;
  highlightedDomains?: DomainCode[];
}

const CATEGORY_ICONS: Record<DomainCode, React.ReactNode> = {
  A: <Zap className="w-4 h-4 text-[#8C6D3B]" />,
  B: <Waves className="w-4 h-4 text-[#8C3729]" />,
  C: <RotateCw className="w-4 h-4 text-[#6E3B85]" />,
  D: <Shield className="w-4 h-4 text-[#275A85]" />,
  E: <Building2 className="w-4 h-4 text-[#2F6131]" />,
};

export const PracticeGuide: React.FC<PracticeGuideProps> = ({
  selectedDomain,
  highlightedDomains = [],
}) => {
  const [activeFilter, setActiveFilter] = useState<string>(selectedDomain || 'all');
  const [checkedPractices, setCheckedPractices] = useState<Record<string, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const toggleCheck = (id: string) => {
    setCheckedPractices((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const filteredCategories =
    activeFilter === 'all'
      ? PRACTICE_CATEGORIES
      : activeFilter === 'high-risk'
      ? PRACTICE_CATEGORIES.filter((c) => highlightedDomains.includes(c.domainCode))
      : PRACTICE_CATEGORIES.filter((c) => c.domainCode === activeFilter);

  const checkedCount = Object.values(checkedPractices).filter(Boolean).length;

  return (
    <div id="practice-guide-section" className="space-y-6 font-sans">
      {/* Section Header */}
      <div className="bg-[#FFFDF9] rounded-2xl border-2 border-[#E7DCCE] p-6 shadow-xs space-y-2 botanical-frame">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EAF3EA] text-[#2F6131] border border-[#BBD7B9] font-serif-kr">
          <Sparkles className="w-3.5 h-3.5 text-[#427A45]" />
          <span>현장 맞춤 실천 로드맵</span>
          <span className="text-[#C87D6F]">~ ✤ ~</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold font-serif-kr text-[#2C241E] tracking-tight">
          점수 영역별·수준별 스트레스 완화 실천 가이드
        </h2>
        <p className="text-xs sm:text-sm text-[#68594E] leading-relaxed font-serif-kr">
          상담원의 지친 상태와 취약한 영역에 맞추어 실무 현장에서 즉시 적용할 수 있는 25가지 세부 처방입니다.
        </p>

        {checkedCount > 0 && (
          <div className="mt-3 p-3.5 rounded-xl bg-[#EAF3EA] border border-[#BBD7B9] text-xs text-[#2F6131] flex items-center justify-between font-serif-kr">
            <span className="font-bold">
              ✓ 오늘 실천할 다짐 {checkedCount}개를 선택하셨습니다.
            </span>
            <button
              onClick={() => setCheckedPractices({})}
              className="text-xs underline text-[#427A45] hover:text-[#1F4220] cursor-pointer"
            >
              선택 초기화
            </button>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 font-serif-kr">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-[#C87D6F] text-white shadow-xs'
              : 'bg-[#FFFDF9] border border-[#D8C7B5] text-[#5A4B40] hover:bg-[#FAF6EE]'
          }`}
        >
          전체 보기 (25개 실천 수칙)
        </button>

        {highlightedDomains.length > 0 && (
          <button
            onClick={() => setActiveFilter('high-risk')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeFilter === 'high-risk'
                ? 'bg-[#8C3729] text-white shadow-xs'
                : 'bg-[#F9ECE8] border border-[#E9C4BC] text-[#8C3E30] hover:bg-[#F2DCD6]'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>내 진단 취약 영역만 보기 ({highlightedDomains.join(', ')})</span>
          </button>
        )}

        {PRACTICE_CATEGORIES.map((cat) => (
          <button
            key={cat.domainCode}
            onClick={() => setActiveFilter(cat.domainCode)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeFilter === cat.domainCode
                ? 'bg-[#C87D6F] text-white shadow-xs'
                : 'bg-[#FFFDF9] border border-[#D8C7B5] text-[#5A4B40] hover:bg-[#FAF6EE]'
            }`}
          >
            {CATEGORY_ICONS[cat.domainCode]}
            <span>영역 {cat.domainCode}</span>
          </button>
        ))}
      </div>

      {/* Practice Categories */}
      <div className="space-y-6">
        {filteredCategories.map((category) => {
          const domainInfo = DOMAIN_INFO[category.domainCode];
          const isHighRisk = highlightedDomains.includes(category.domainCode);

          return (
            <div
              key={category.domainCode}
              id={`practice-category-${category.domainCode}`}
              className={`bg-[#FFFDF9] rounded-2xl border-2 shadow-xs overflow-hidden botanical-frame ${
                isHighRisk ? 'border-[#C87D6F] ring-2 ring-[#F9ECE8]' : 'border-[#E7DCCE]'
              }`}
            >
              {/* Category Header */}
              <div className="p-4 sm:p-5 border-b border-[#EADBCE] bg-[#FAF7F2] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#FFFDF9] shadow-2xs border border-[#EADBCE]">
                    {CATEGORY_ICONS[category.domainCode]}
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-serif-kr text-[#2C241E]">
                      {category.categoryTitle}
                    </h3>
                    <p className="text-xs text-[#7A6A5E] font-serif-kr mt-0.5">
                      {domainInfo.focusPoint}
                    </p>
                  </div>
                </div>

                {isHighRisk && (
                  <span className="text-[11px] font-bold px-3 py-0.5 rounded-full bg-[#F9ECE8] text-[#8C3E30] border border-[#E9C4BC] font-serif-kr">
                    취약 영역 집중 추천
                  </span>
                )}
              </div>

              {/* Action Item List */}
              <div className="divide-y divide-[#F0E6D8] p-2 sm:p-3">
                {category.items.map((itemText, idx) => {
                  const itemKey = `${category.domainCode}-${idx}`;
                  const isChecked = !!checkedPractices[itemKey];

                  // Parse bold title before colon if present
                  const colonIndex = itemText.indexOf(':');
                  let title = '';
                  let description = itemText;

                  if (colonIndex !== -1) {
                    title = itemText.substring(0, colonIndex);
                    description = itemText.substring(colonIndex + 1).trim();
                  }

                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl transition-all flex items-start justify-between gap-3 ${
                        isChecked ? 'bg-[#EAF3EA]/70' : 'hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <button
                          type="button"
                          onClick={() => toggleCheck(itemKey)}
                          className="mt-0.5 text-[#8C7564] hover:text-[#2F6131] transition-colors shrink-0 cursor-pointer"
                          title="오늘의 실천 항목으로 체크"
                        >
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-[#2F6131]" />
                          ) : (
                            <Square className="w-4 h-4 text-[#8C7564]" />
                          )}
                        </button>

                        <div className="space-y-0.5 text-xs sm:text-sm font-serif-kr leading-relaxed">
                          {title && (
                            <span className="font-bold text-[#2C241E] mr-1.5 inline-block">
                              {title}:
                            </span>
                          )}
                          <span className={`${isChecked ? 'text-[#1E4520] font-medium' : 'text-[#5A4B40]'}`}>
                            {description}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopy(itemText, itemKey)}
                        className="p-1.5 rounded-lg text-[#8C7564] hover:text-[#2C241E] hover:bg-[#F2EADC] transition-colors shrink-0 cursor-pointer"
                        title="수칙 텍스트 복사하기"
                      >
                        {copiedKey === itemKey ? (
                          <Check className="w-3.5 h-3.5 text-[#2F6131]" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
