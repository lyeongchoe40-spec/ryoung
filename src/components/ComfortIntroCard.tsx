import React, { useState } from 'react';
import { Coffee, Heart, RefreshCw, Sparkles } from 'lucide-react';
import mascotImg from '../assets/images/refined_calm_companion_1788674125139.jpg';

const COMFORT_MESSAGES = [
  '오늘도 수많은 민원인의 목소리를 묵묵히 경청하느라 정말 애쓰셨습니다.',
  '잠시 따뜻한 차 한 잔 내려놓고, 그동안 타인에게만 건넸던 다정함을 나 자신에게 건네보세요.',
  '민원인의 거친 감정은 결코 당신의 탓이 아닙니다. 창구 문을 닫는 순간, 그 무거운 짐은 그곳에 내려두세요.',
  '지금 지치고 힘든 것은 당신이 그만큼 성실하고 진심을 다해 일해왔다는 증거입니다.',
  '이곳은 평가받거나 응대하는 자리가 아닙니다. 지친 내 마음을 솔직하게 알아차리고 쉬어가는 시간입니다.',
];

export const ComfortIntroCard: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [isDrinking, setIsDrinking] = useState(false);

  const handleNextMessage = () => {
    setMessageIndex((prev) => (prev + 1) % COMFORT_MESSAGES.length);
  };

  const handleDrinkTea = () => {
    setIsDrinking(true);
    setTimeout(() => setIsDrinking(false), 2400);
  };

  return (
    <div
      id="comfort-intro-card"
      className="relative overflow-hidden rounded-2xl bg-[#FFFDF9] border border-[#E7DCCE] p-6 sm:p-7 shadow-xs botanical-frame"
    >
      {/* Corner botanical accents */}
      <div className="absolute top-2 left-3 text-[#D8C7B5] text-xs pointer-events-none select-none">
        ❧
      </div>
      <div className="absolute top-2 right-3 text-[#D8C7B5] text-xs pointer-events-none select-none">
        ☙
      </div>

      <div className="relative flex flex-col md:flex-row items-center gap-6 sm:gap-8">
        {/* Refined Vintage Botanical Character Portrait Frame */}
        <div className="relative shrink-0">
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-sm border-2 border-[#E7DCCE] bg-[#FAF6EE] ring-4 ring-[#FAF2EA]">
            <img
              src={mascotImg}
              alt="지친 상담원에게 따뜻한 차를 건네는 차분하고 다정한 컴패니언 캐릭터"
              className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Minimalist Tea Badge */}
          <div className="absolute -bottom-1.5 -right-1.5 bg-[#8C3729] text-[#FAF6EE] p-1.5 rounded-full shadow-md border-2 border-white flex items-center justify-center">
            <Coffee className="w-3.5 h-3.5 text-[#F5D5CE]" />
          </div>
        </div>

        {/* Comforting Text & Botanical Header Architecture */}
        <div className="flex-1 text-center md:text-left space-y-3.5 w-full">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F9ECE8] text-[#8C3E30] border border-[#E9C4BC]">
              <Heart className="w-3.5 h-3.5 text-[#C87D6F] fill-[#C87D6F]" />
              상담원을 위한 따뜻한 마음 쉼터
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-[#827265] font-medium">
              <span className="text-[#C87D6F]">✤</span>
              따뜻한 캐모마일 티타임
            </span>
          </div>

          {/* Ornate Quote Box */}
          <div className="bg-[#FAF7F2] rounded-xl p-4 sm:p-5 border border-[#EADBCE] relative">
            <p className="text-sm sm:text-base text-[#2C241E] font-serif-kr font-medium leading-relaxed tracking-tight">
              "{COMFORT_MESSAGES[messageIndex]}"
            </p>
            <p className="text-xs text-[#8C3729] italic font-serif-kr mt-2.5">
              ~ Seasonal comfort arranged with warmth and care ~
            </p>
          </div>

          {/* Clean Botanical Action Buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 pt-0.5">
            <button
              type="button"
              onClick={handleNextMessage}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#52443A] bg-[#FFFDF9] hover:bg-[#F5ECE5] border border-[#D5C4B0] transition-colors shadow-2xs cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#8C3729]" />
              따뜻한 한마디 더 듣기
            </button>

            <button
              type="button"
              onClick={handleDrinkTea}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#2F6131] bg-[#EAF3EA] hover:bg-[#DEECDD] border border-[#BBD7B9] transition-colors shadow-2xs cursor-pointer"
            >
              <Coffee className="w-3.5 h-3.5 text-[#427A45]" />
              {isDrinking ? '호- 호- 깊게 호흡하며 차를 마십니다... 🍵' : '따뜻한 차 한 모금 마시기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
