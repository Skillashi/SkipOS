import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Image constants
const imgVuesaxLinearWalletMinus = "https://www.figma.com/api/mcp/asset/1c650370-957a-4187-a27a-3ab71e005906";
const imgVuesaxLinearArrowDown = "https://www.figma.com/api/mcp/asset/3a684f2b-0eab-47aa-b03d-b0072531a374";
const imgVuesaxLinearArrowUp = "https://www.figma.com/api/mcp/asset/387f5450-d943-4a21-8eef-5d9c48c94b25";
const imgVuesaxLinearTrendUp = "https://www.figma.com/api/mcp/asset/f520cdd2-1331-412e-a168-58a7adb1bcae";
const imgLogo = "https://www.figma.com/api/mcp/asset/9387dd03-d23e-45d5-b1f6-47099fdb827d";
const imgSiAiLine = "https://www.figma.com/api/mcp/asset/e37f3c55-cead-4922-919e-5ba29ba71969";
const imgVuesaxLinearTrendUp1 = "https://www.figma.com/api/mcp/asset/19b2ec44-a87e-40a6-83ff-acb4623ecd70";
const imgVuesaxLinearActivity = "https://www.figma.com/api/mcp/asset/f723e6e2-1269-494f-be9d-518f0e5255dc";
const imgLogo1 = "https://www.figma.com/api/mcp/asset/bbafc16f-8c60-4d28-9f13-142aab90ab18";

// Icon Components — hardcoded size, no className stretch issues
function Icon({ src, size = 14 }: { src: string; size?: number }) {
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <img alt="" className="absolute inset-0 w-full h-full block" src={src} />
    </div>
  );
}

// Scrambled Text
function ScrambleText({ value, duration = 1.8, delay = 0 }: { value: string; duration?: number; delay?: number }) {
  const [display, setDisplay] = useState('');
  const chars = '0123456789₦';

  useEffect(() => {
    let startTime: number | null = null;
    let frame: number;

    const scramble = (timestamp: number) => {
      if (!startTime) startTime = timestamp + delay * 1000;
      const elapsed = Math.max(0, timestamp - startTime);
      const progress = Math.min(elapsed / (duration * 1000), 1);

      // How many characters are "locked" from left to right
      const lockedCount = Math.floor(progress * value.length);

      const scrambled = value
        .split('')
        .map((char, i) => {
          if (i < lockedCount) return char; // locked in
          if (char === ' ' || char === ',' || char === '/') return char; // keep symbols
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      setDisplay(scrambled);

      if (progress < 1) {
        frame = requestAnimationFrame(scramble);
      } else {
        setDisplay(value); // snap to final value
      }
    };

    frame = requestAnimationFrame(scramble);
    return () => cancelAnimationFrame(frame);
  }, [value, duration, delay]);

  return <>{display}</>;
}
// KPI Card
function KPICard({
  bgColor,
  label,
  value,
  subtitle,
  showIcon = true,
  delay = 0,
}: {
  bgColor: string;
  label: string;
  value: string | number;
  subtitle: string;
  showIcon?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      className={`${bgColor} flex flex-col gap-2 items-start px-4 py-3 rounded-[10px] w-full min-w-0`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="flex gap-2 items-center min-w-0">
        <p className="font-['General_Sans'] text-[#87a330] text-[11px] sm:text-[13px] leading-normal break-words min-w-0">
          {label}
        </p>
        {showIcon && <Icon src={imgVuesaxLinearTrendUp} size={13} />}
      </div>
      <p className="font-['General_Sans'] font-semibold text-[#87a330] text-xl sm:text-2xl leading-tight break-words w-full">
        <ScrambleText value={String(value)} duration={1.8} delay={delay} />
      </p>
      <p className="font-['General_Sans'] text-[#87a330] text-[11px] sm:text-[13px] leading-normal break-words w-full">
        {subtitle}
      </p>
    </motion.div>
  );
}

// Insight Card
function InsightCard({
  bgColor,
  title,
  lines,
}: {
  bgColor: string;
  title: string;
  lines: string[];
}) {
  return (
    <div className={`${bgColor} flex flex-col gap-2 p-3 rounded-[8px] w-full`}>
      <p className="font-['General_Sans'] font-semibold text-black text-[11px] sm:text-[13px] leading-normal break-words">
        {title}
      </p>
      <div className="flex flex-col gap-1.5">
        {lines.map((line, i) => (
          <p key={i} className="font-['General_Sans'] text-[#848482] text-[11px] sm:text-[13px] leading-normal break-words">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

// Bill Card
function BillCard({
  bgColor,
  title,
  lines,
}: {
  bgColor: string;
  title: string;
  lines: string[];
}) {
  return (
    <div className={`${bgColor} flex flex-col gap-2 p-3 rounded-[8px] w-full`}>
      <p className="font-['General_Sans'] font-semibold text-black text-[11px] sm:text-[13px] leading-normal">
        {title}
      </p>
      <div className="flex flex-col gap-1.5">
        {lines.map((line, i) => (
          <p key={i} className="font-['General_Sans'] text-[#848482] text-[11px] sm:text-[13px] leading-normal break-words">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function MissionControl({
  onNavigateToAI,
  onNavigateToWealth,
}: {
  onNavigateToAI?: () => void;
  onNavigateToWealth?: () => void;
}) {
  const kpiDelays = [0.1, 0.2, 0.3];

  return (
    <div className="bg-[#fffdf7] w-full min-h-screen overflow-x-hidden">
      <div className="mx-auto max-w-[880px] px-4 sm:px-6 pt-6 sm:pt-8 pb-20">
        <div className="flex flex-col gap-6 items-start w-full">

          {/* Greeting */}
          <motion.div
            className="flex flex-col gap-2.5 items-start w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex gap-2.5 items-center">
              <div className="flex-shrink-0 size-7 sm:size-8 flex items-center justify-center">
                <div className="-rotate-90">
                  <img alt="" className="size-7 sm:size-8" src={imgLogo} />
                </div>
              </div>
              <div className="font-['General_Sans']">
                <p className="font-medium text-[#1b1b1b] text-[13px] sm:text-base">Good Morning</p>
                <p className="text-[#1b1b1b] text-[11px] sm:text-[13px]">Adedamola</p>
              </div>
            </div>

            <motion.div
              className="flex gap-2.5 items-start px-2.5 py-2 w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Icon src={imgSiAiLine} size={14} />
              <div className="flex flex-col gap-0.5 min-w-0">
                <p className="font-['General_Sans'] font-medium text-[#1b1b1b] text-[11px] sm:text-[13px] uppercase leading-normal break-words">
                  You're 73% on track to achieve your goals.
                </p>
                <p className="font-['General_Sans'] text-[#848482] text-[11px] sm:text-[13px] leading-normal break-words">
                  Seems you're ahead of your savings goal, but spending patterns are slightly unstable.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full">
            {/* Financial Health */}
            <KPICard
              bgColor="bg-[rgba(102,255,0,0.1)]"
              label="Financial Health"
              value="73/100"
              subtitle="Slightly Unstable"
              delay={kpiDelays[0]}
            />

            {/* Financial Runway */}
            <motion.div
              className="bg-[#243010] flex flex-col gap-3 items-start px-4 py-3 rounded-[10px] w-full min-w-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: kpiDelays[1] }}
            >
              <div className="flex gap-2 items-center">
                <p className="font-['General_Sans'] text-[#87a330] text-[11px] sm:text-[13px] leading-normal">
                  Financial Runway
                </p>
                <Icon src={imgVuesaxLinearTrendUp} size={13} />
              </div>
              <p className="font-['General_Sans'] font-semibold text-[#87a330] text-xl sm:text-2xl leading-tight">
                <ScrambleText value="114 DAYS" duration={1.8} delay={0.2} />
              </p>
              <p className="font-['General_Sans'] text-[#87a330] text-[11px] sm:text-[13px] leading-normal break-words">
                Time you can survive without income
              </p>
            </motion.div>

            {/* Monthly Burn Rate */}
            <motion.div
              className="bg-[#c73e1d] flex flex-col gap-3 items-start px-4 py-3 rounded-[10px] w-full min-w-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: kpiDelays[2] }}
            >
              <div className="flex gap-2 items-center">
                <p className="font-['General_Sans'] text-[#a6d49f] text-[11px] sm:text-[13px] leading-normal">
                  Monthly Burn Rate
                </p>
                <Icon src={imgVuesaxLinearTrendUp1} size={13} />
              </div>
              <p className="font-['General_Sans'] font-semibold text-[#a6d49f] text-xl sm:text-2xl leading-tight">
                <ScrambleText value="₦128,000" duration={1.8} delay={0.3} />
              </p>
              <div className="flex gap-1.5 items-center">
                <Icon src={imgVuesaxLinearArrowUp} size={12} />
                <p className="font-['General_Sans'] text-[#a6d49f] text-[11px] sm:text-[13px] leading-normal">
                  8% increase this month
                </p>
              </div>
            </motion.div>
          </div>

          {/* AI Insight Section */}
          <motion.div
            className="border border-[rgba(20,20,20,0.1)] flex flex-col gap-5 items-start px-3 sm:px-4 py-5 rounded-[8px] w-full"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {/* Section Header */}
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-2.5 items-center">
                <Icon src={imgSiAiLine} size={14} />
                <p className="font-['General_Sans'] font-medium text-[#848482] text-[13px] sm:text-base capitalize">
                  Skip Co-Pilot Insight
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <Icon src={imgVuesaxLinearArrowDown} size={16} />
                <p className="font-['General_Sans'] font-medium text-[#1b1b1b] text-[13px] sm:text-base capitalize">
                  June
                </p>
              </div>
            </div>

            {/* Analysis + Bills — stacked on mobile, side by side on desktop */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">

              {/* Analysis */}
              <div className="border border-[rgba(0,0,0,0.05)] rounded-[10px] flex-1 min-w-0 overflow-hidden">
                <div className="border-b border-[rgba(20,20,20,0.1)] flex gap-2 items-center p-2.5">
                  <Icon src={imgVuesaxLinearActivity} size={14} />
                  <p className="font-['General_Sans'] font-medium text-[#1b1b1b] text-[11px] sm:text-[13px]">
                    Analysis
                  </p>
                </div>
                <div className="flex flex-col gap-2.5 p-2.5">
                  <InsightCard
                    bgColor="bg-[rgba(225,187,128,0.5)]"
                    title="You spent ₦28,400 on food delivery this month."
                    lines={[
                      "At this pace, you'll spend approximately ₦340,800 yearly.",
                      "Reducing this by 25% could fund your emergency account 2 months earlier.",
                    ]}
                  />
                  <InsightCard
                    bgColor="bg-[rgba(169,131,96,0.2)]"
                    title="Your spending becomes unpredictable 3 days after payday."
                    lines={[
                      "Most impulse purchases occur between the 4th and 7th day after receiving income. Tranquillo. Your future is expensive.",
                    ]}
                  />
                  <InsightCard
                    bgColor="bg-[rgba(127,149,116,0.2)]"
                    title="You haven't increased your savings despite a 15% income increase."
                    lines={[
                      "Your lifestyle expenses are growing at the same rate as your income.",
                      "You might cause a lifestyle inflation soon so tranquillo.",
                    ]}
                  />
                </div>
              </div>

              {/* Bills & Payments */}
              <div className="border border-[rgba(0,0,0,0.05)] rounded-[10px] flex-1 min-w-0 overflow-hidden">
                <div className="border-b border-[rgba(20,20,20,0.1)] flex gap-2 items-center p-2.5">
                  <Icon src={imgVuesaxLinearWalletMinus} size={14} />
                  <p className="font-['General_Sans'] font-medium text-[#141414] text-[11px] sm:text-[13px]">
                    Bills & Payments
                  </p>
                </div>
                <div className="flex flex-col gap-2.5 p-2.5">
                  <BillCard
                    bgColor="bg-[rgba(173,193,120,0.4)]"
                    title="Rent"
                    lines={[
                      "₦4,500,000/Year",
                      "You've saved ₦2,180,321 in 3 Months",
                    ]}
                  />
                  <BillCard
                    bgColor="bg-[rgba(169,132,103,0.4)]"
                    title="Internet"
                    lines={[
                      "₦120,000/Month",
                      "You spent 360k in the last 3 months",
                    ]}
                  />
                  <BillCard
                    bgColor="bg-[#f0ead2]"
                    title="Subscriptions"
                    lines={[
                      "₦200,000/Month",
                      "You've spent ₦600,000 in the last 3 months on subscriptions.",
                      "Netflix, Adobe Photoshop, Chat GPT, and Adobe After Effects.",
                    ]}
                  />
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 w-full">
              <motion.button
                className="bg-[#243010] flex gap-2 h-11 items-center justify-center px-8 rounded-[8px] w-400px cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onNavigateToAI}
              >
                <p className="font-['General_Sans'] font-medium text-[#87a330] text-[13px] sm:text-base capitalize">
                  View
                </p>
                <div className="flex-shrink-0 size-6 flex items-center justify-center">
                  <div className="-rotate-90">
                    <img alt="" className="size-6" src={imgLogo1} />
                  </div>
                </div>
                <p className="font-['General_Sans'] font-medium text-[#87a330] text-[13px] sm:text-base capitalize">
                  Co-Pilot
                </p>
              </motion.button>

              {onNavigateToWealth && (
                <motion.button
                  className="bg-[#87a330] flex gap-2 h-11 items-center justify-center px-4 rounded-[8px] w-full cursor-pointer hover:bg-[#7a9228] transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onNavigateToWealth}
                >
                  <p className="font-['General_Sans'] font-medium text-bg-[#243010] text-[13px] sm:text-base capitalize">
                    View Wealth Map
                  </p>
                </motion.button>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}