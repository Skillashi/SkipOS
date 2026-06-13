import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// Image constants
const imgVuesaxLinearSend2 = "https://www.figma.com/api/mcp/asset/4647ba5a-34be-4f74-bf48-2e2a2145d7dd";
const imgLogo = "https://www.figma.com/api/mcp/asset/a8cd5acc-0538-414d-a17d-c4131bc6913b";
const imgVector33 = "https://www.figma.com/api/mcp/asset/ad004a66-6af2-4c08-9969-5afa8ab0ce56";
const imgVuesaxLinearMicrophone2 = "https://www.figma.com/api/mcp/asset/9f9141c2-90d1-4ab3-98cc-2cbf60cb0f57";
const imgLogo1 = "https://www.figma.com/api/mcp/asset/b886ba39-72ed-45ef-83bf-a28e69529da0";

// Safe icon component — always fixed 16px, never stretches
function Icon({ src, size = 16 }: { src: string; size?: number }) {
  return (
    <div className="flex-shrink-0" style={{ width: size, height: size, position: 'relative' }}>
      <img alt="" src={src} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
}

// Animated Counter
function AnimatedCounter({ to, duration = 1.5 }: { to: number; duration?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const timer = setInterval(() => {
      const progress = Math.min((Date.now() - start) / (duration * 1000), 1);
      setCount(Math.floor(to * progress));
      if (progress === 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [to, duration]);
  return <>{count}</>;
}

// Loading dots + message
function LoadingMessage({ message }: { message: string }) {
  return (
    <motion.div
      className="flex items-center gap-2 justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {[0, 0.2, 0.4].map((delay, i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 bg-[#87a330] rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, delay }}
        />
      ))}
      <p className="font-['General_Sans'] text-[#848482] text-[11px] sm:text-[14px] ml-2">{message}</p>
    </motion.div>
  );
}

// Results
function ResultsDisplay({ onClose, onBackHome }: { onClose: () => void; onBackHome?: () => void }) {
  const [showCTAs, setShowCTAs] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowCTAs(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  const riskColors: Record<string, string> = {
    Low: 'bg-[#a7c957]',
    Medium: 'bg-[#ffd84d]',
    High: 'bg-[#c73e1d]',
  };
  const currentRisk = 'Medium';

  return (
    <motion.div className="flex flex-col gap-4 items-start w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

      {/* Analysis */}
      <motion.div
        className="bg-[rgba(102,255,0,0.1)] border border-[rgba(135,163,48,0.2)] rounded-[12px] p-4 sm:p-5 w-full"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h3 className="font-['General_Sans'] font-semibold text-[#87a330] text-[14px] sm:text-base mb-3">
          Analysis
        </h3>
        <p className="font-['General_Sans'] text-[#848482] text-[11px] sm:text-[14px] leading-relaxed">
          Based on your current spending patterns, reducing food delivery expenses by 25% could accelerate emergency fund accumulation by 2 months.
        </p>
      </motion.div>

      {/* Financial Impact */}
      <motion.div
        className="bg-[rgba(102,255,0,0.1)] border border-[rgba(135,163,48,0.2)] rounded-[12px] p-4 sm:p-5 w-full"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="font-['General_Sans'] font-semibold text-[#87a330] text-[14px] sm:text-base mb-3">
          Financial Impact
        </h3>
        <div className="flex gap-5 justify-between">
          <div>
            <p className="font-['General_Sans'] text-[#848482] text-[11px] sm:text-[13px] mb-1">Monthly Savings</p>
            <p className="font-['General_Sans'] font-semibold text-[#87a330] text-lg sm:text-xl">
              ₦<AnimatedCounter to={7100} />
            </p>
          </div>
          <div>
            <p className="font-['General_Sans'] text-[#848482] text-[11px] sm:text-[13px] mb-1">Yearly Impact</p>
            <p className="font-['General_Sans'] font-semibold text-[#87a330] text-lg sm:text-xl">
              ₦<AnimatedCounter to={85200} />
            </p>
          </div>
        </div>
      </motion.div>

      {/* Recommendation */}
      <motion.div
        className="bg-[#a7c957] rounded-[12px] p-4 sm:p-5 w-full"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h3 className="font-['General_Sans'] font-semibold text-[#243010] text-[14px] sm:text-base mb-3">
          Recommendation
        </h3>
        <p className="font-['General_Sans'] text-[#243010]text-[14px] sm:text-[14px] leading-relaxed">
          Set up an automatic transfer of ₦7,100 to your emergency fund every month. This sustainable reduction in food delivery spending will significantly improve your financial runway.
        </p>
      </motion.div>

      {/* Risk Indicator */}
      <motion.div
        className={`${riskColors[currentRisk]} rounded-[12px] p-4 sm:p-5 w-full`}
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.7 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-['General_Sans'] text-white text-[11px] sm:text-[13px] mb-1">Financial Risk Level</p>
            <p className="font-['General_Sans'] font-semibold text-white text-xl sm:text-2xl">{currentRisk}</p>
          </div>
          <motion.div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white bg-opacity-20 flex-shrink-0"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* CTAs */}
      <AnimatePresence>
        {showCTAs && (
          <motion.div
            className="flex flex-col gap-2.5 w-full mt-2"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={onBackHome}
              className="w-full py-3 px-4 rounded-[8px] font-['General_Sans'] font-medium text-[11px] sm:text-[14px] transition-colors bg-[#243010] text-white hover:bg-[#7a9228]"
            >
              Explore Wealth Plans
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 px-4 rounded-[8px] font-['General_Sans'] font-medium text-[11px] sm:text-[14px] transition-colors bg-white text-[#1b1b1b] border border-[rgba(0,0,0,0.1)] hover:bg-[#f5f5f5]"
            >
              Try Another Decision
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Main AICoPilot
export default function AICoPilot({ onBackHome }: { onBackHome?: () => void }) {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentLoadingStep, setCurrentLoadingStep] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const loadingMessages = [
    'Analyzing financial behavior...',
    'Projecting future outcomes...',
    'Calculating financial risk...',
  ];

  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    setIsLoading(true);
    setShowResults(false);
    setCurrentLoadingStep(0);

    const messageInterval = setInterval(() => {
      setCurrentLoadingStep(prev => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
    }, 700);

    setTimeout(() => {
      clearInterval(messageInterval);
      setIsLoading(false);
      setShowResults(true);
    }, 2100);
  };

  const handleReset = () => {
    setInputValue('');
    setShowResults(false);
    setIsLoading(false);
    setCurrentLoadingStep(0);
  };

  return (
    <div className="bg-[#fffdf7] w-full min-h-screen flex flex-col items-center overflow-x-hidden">

      {/* Header */}
      <div className="w-full bg-[#fffdf7] sticky top-0 z-10 border-b border-[rgba(0,0,0,0.05)]">
        <div className="max-w-[880px] mx-auto px-4 sm:px-5 py-4 sm:py-5 flex items-center justify-between">
          <div className="flex gap-2.5 items-center">
            <div className="flex items-center justify-center size-5 sm:size-6 flex-shrink-0">
              <div className="-rotate-90">
                <img alt="" className="size-5 sm:size-6" src={imgLogo1} />
              </div>
            </div>
            <p className="font-['General_Sans'] font-medium text-[#1b1b1b] text-[13px] sm:text-base">
              Skip Co-Pilot
            </p>
          </div>
          <button
            onClick={onBackHome}
            className="flex gap-2 items-center px-3 py-2 hover:bg-[rgba(0,0,0,0.05)] rounded-[8px] transition-colors"
          >
            <p className="font-['General_Sans'] text-[#1b1b1b] text-[11px] sm:text-[14px]">
              Back
            </p>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full max-w-[880px] mx-auto px-4 sm:px-5 py-8 sm:py-10 flex flex-col items-center">

        {/* Idle state */}
        {!showResults && !isLoading && (
          <motion.div
            className="flex flex-col gap-6 sm:gap-8 items-center w-full"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Welcome */}
            <div className="flex gap-2.5 items-center w-full">
              <p className="font-['General_Sans'] font-medium text-[#1b1b1b] text-[17px] sm:text-xl leading-snug text-center w-full">
                Ask anything about your money, Adedamola
              </p>
            </div>

            {/* Input box */}
            <motion.div
              className="w-full sm:max-w-[500px] bg-[#f7f8f9] rounded-[16px] p-4 flex flex-col gap-3"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder="Ask anything about your finances..."
                rows={3}
                className="w-full bg-transparent resize-none outline-none font-['General_Sans'] text-[#1b1b1b] text-[15px] sm:text-[14px] placeholder:text-[#848482] leading-relaxed"
              />
              <div className="flex items-center justify-between">
                <Icon src={imgVuesaxLinearMicrophone2} size={16} />
                <motion.button
                  onClick={handleSubmit}
                  disabled={!inputValue.trim()}
                  className="bg-[#243010] p-2 rounded-[6px] disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon src={imgVuesaxLinearSend2} size={16} />
                </motion.button>
              </div>
            </motion.div>

            {/* Quick actions */}
            <motion.div
              className="flex gap-2 items-center flex-wrap justify-center"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {['View impact', 'Recalculate', 'Set savings goal'].map((label) => (
                <button
                  key={label}
                  className="bg-white px-3 py-1.5 rounded-[6px] font-['General_Sans'] text-[11px] sm:text-[13px] border border-[rgba(0,0,0,0.1)] hover:bg-[#f5f5f5] transition-colors"
                >
                  {label}
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Loading state */}
        {isLoading && (
          <motion.div
            className="flex flex-col gap-5 items-center justify-center w-full py-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <LoadingMessage key={currentLoadingStep} message={loadingMessages[currentLoadingStep]} />
            </AnimatePresence>
          </motion.div>
        )}

        {/* Results state */}
        {showResults && (
          <motion.div
            className="w-full sm:max-w-[600px]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ResultsDisplay onClose={handleReset} onBackHome={onBackHome} />
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div className="w-full border-t border-[rgba(0,0,0,0.05)] bg-[#fffdf7]">
        <div className="max-w-[880px] mx-auto px-5 py-4 flex gap-6 items-center justify-center">
          {['Terms', 'Privacy', 'Support'].map((item) => (
            <p key={item} className="font-['General_Sans'] font-medium text-[rgba(20,20,20,0.5)] text-[11px] sm:text-[13px] cursor-pointer hover:text-[rgba(20,20,20,0.8)] transition-colors">
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}