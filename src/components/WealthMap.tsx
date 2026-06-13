import { motion, AnimatePresence, useAnimationFrame } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const imgLogo = "https://www.figma.com/api/mcp/asset/a8cd5acc-0538-414d-a17d-c4131bc6913b";
const imgSiAiLine = "https://www.figma.com/api/mcp/asset/43d42681-d53c-457a-8e05-0b314a9925dc";
const imgVuesaxLinearArrowDown = "https://www.figma.com/api/mcp/asset/25e40c32-1d5f-45f5-a8c8-90241777334a";

interface NodeDef {
  id: string;
  label: string;
  value: string;
  bgColor: string;
  textColor: string;
  glowColor: string;
  details: {
    subtitle: string;
    metric: string;
    metricValue: string;
    metricColor: string;
    description: string;
  };
  order: number;
}

const NODE_DEFS: NodeDef[] = [
  {
    id: 'net-position', label: 'Net Position', value: '₦742,000',
    bgColor: 'rgba(135,163,48,0.12)', textColor: '#87a330', glowColor: 'rgba(135,163,48,0.5)',
    details: { subtitle: 'Overall financial health', metric: '87/100', metricValue: 'Health Score', metricColor: '#87a330', description: 'Your net position represents the sum of all your assets minus liabilities. You are in a healthy range.' },
    order: 0,
  },
  {
    id: 'income', label: 'Income', value: '₦870,000',
    bgColor: '#a7c957', textColor: '#243010', glowColor: 'rgba(167,201,87,0.5)',
    details: { subtitle: 'This month', metric: '+5%', metricValue: 'vs last month', metricColor: '#243010', description: 'Your income has been stable with a slight upward trend. Consider increasing your savings allocation.' },
    order: 1,
  },
  {
    id: 'savings', label: 'Savings', value: '₦480,000',
    bgColor: '#83c5be', textColor: '#023047', glowColor: 'rgba(131,197,190,0.5)',
    details: { subtitle: 'Goal progress', metric: '80%', metricValue: 'of target', metricColor: '#023047', description: 'You are 80% toward your savings goal. At current rate, you will hit your target in 6 weeks.' },
    order: 2,
  },
  {
    id: 'investments', label: 'Investment', value: '₦120,000',
    bgColor: '#c993e6', textColor: '#240046', glowColor: 'rgba(201,147,230,0.5)',
    details: { subtitle: 'Growth rate', metric: 'Moderate', metricValue: '+8% YTD', metricColor: '#240046', description: 'Your investments are growing moderately. Diversifying into index funds could improve returns.' },
    order: 3,
  },
  {
    id: 'spending', label: 'Spending', value: '₦220,000',
    bgColor: '#c73e1d', textColor: '#ffd5cc', glowColor: 'rgba(199,62,29,0.5)',
    details: { subtitle: 'This month', metric: '+12%', metricValue: 'Trending up', metricColor: '#ffb4a0', description: 'Your spending increased 12% this month, mostly from food delivery. Reducing by 25% frees ₦7,100/month.' },
    order: 4,
  },
  {
    id: 'debts', label: 'Debts', value: '₦40,000',
    bgColor: '#9d0208', textColor: '#f7b538', glowColor: 'rgba(157,2,8,0.5)',
    details: { subtitle: 'Status', metric: 'Unpaid', metricValue: 'Action needed', metricColor: '#f7b538', description: 'You have outstanding debts. Clearing these first will improve your financial health score significantly.' },
    order: 5,
  },
  {
    id: 'subscriptions', label: 'Subscriptions', value: '₦200,000',
    bgColor: '#ffd84d', textColor: '#76520e', glowColor: 'rgba(255,216,77,0.5)',
    details: { subtitle: 'Monthly recurring', metric: '₦600k', metricValue: 'last 3 months', metricColor: '#76520e', description: 'Netflix, Adobe, ChatGPT, After Effects. Review unused subscriptions — potential ₦50k/month savings.' },
    order: 6,
  },
];

// Node card dimensions by breakpoint
function getNodeSize(containerW: number) {
  if (containerW < 400) return { w: 110, h: 64, px: 'px-2.5 py-2', valueSz: 'text-[12px]', labelSz: 'text-[9px]', metricSz: 'text-[8px]', showBadge: false };
  if (containerW < 640) return { w: 138, h: 72, px: 'px-3 py-2.5', valueSz: 'text-[13px]', labelSz: 'text-[10px]', metricSz: 'text-[9px]', showBadge: false };
  if (containerW < 900) return { w: 170, h: 82, px: 'px-4 py-3', valueSz: 'text-[16px]', labelSz: 'text-[11px]', metricSz: 'text-[10px]', showBadge: false };
  return { w: 202, h: 90, px: 'px-5 py-[14px]', valueSz: 'text-[21px]', labelSz: 'text-sm', metricSz: 'text-[11px]', showBadge: true };
}

function getNodePositions(containerW: number, containerH: number) {
  const cx = containerW / 2;
  const cy = containerH / 2;

  // Scale radius relative to container, clamp so nodes don't overflow
  const nw = getNodeSize(containerW).w;
  const maxRx = containerW / 2 - nw / 2 - 8;
  const maxRy = containerH / 2 - 50;
  const rx = Math.min(containerW * 0.31, maxRx, 300);
  const ry = Math.min(containerH * 0.30, maxRy, 230);

  const angles = [-90, -150, -30, 150, 30, 90];
  const surroundingIds = ['income', 'savings', 'investments', 'spending', 'debts', 'subscriptions'];
  const positions: Record<string, { x: number; y: number }> = { 'net-position': { x: cx, y: cy } };
  angles.forEach((angle, i) => {
    const rad = (angle * Math.PI) / 180;
    positions[surroundingIds[i]] = { x: cx + rx * Math.cos(rad), y: cy + ry * Math.sin(rad) };
  });
  return positions;
}

function AnimatedConnection({ x1, y1, x2, y2, delay, isHighlighted, isDimmed, gradId }: {
  x1: number; y1: number; x2: number; y2: number;
  delay: number; isHighlighted: boolean; isDimmed: boolean; gradId: string;
}) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: isDimmed ? 0.08 : isHighlighted ? 1 : 0.35 }}
      transition={{ duration: 0.3 }}
    >
      <defs>
        <linearGradient id={gradId} x1={x1} y1={y1} x2={x2} y2={y2} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#87a330" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#c9f542" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#87a330" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <motion.line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={`url(#${gradId})`}
        strokeWidth={isHighlighted ? 2.5 : 1.5}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay, ease: 'easeInOut' }}
        style={{ vectorEffect: 'non-scaling-stroke' }}
      />
      {isHighlighted && (
        <motion.circle r={4} fill="#c9f542" style={{ filter: 'blur(1px)' }}
          animate={{ cx: [x1, x2, x1], cy: [y1, y2, y1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </motion.g>
  );
}

function WealthNode({ def, x, y, isCenter, isSelected, isHovered, isDimmed, floatOffset, containerW, onHover, onLeave, onClick }: {
  def: NodeDef; x: number; y: number;
  isCenter: boolean; isSelected: boolean; isHovered: boolean; isDimmed: boolean;
  floatOffset: number; containerW: number;
  onHover: () => void; onLeave: () => void; onClick: () => void;
}) {
  const { w, h, px, valueSz, labelSz, metricSz, showBadge } = getNodeSize(containerW);

  return (
    <motion.div
      className="absolute cursor-pointer select-none"
      style={{ left: x - w / 2, top: y - h / 2, width: w, y: floatOffset }}
      initial={isCenter ? { opacity: 0, scale: 0.85 } : { opacity: 0, y: 15 }}
      animate={isCenter ? { opacity: isDimmed ? 0.25 : 1, scale: 1 } : { opacity: isDimmed ? 0.2 : 1, y: 0 }}
      transition={{
        duration: isCenter ? 0.7 : 0.55,
        delay: isCenter ? 0.1 : 0.4 + def.order * 0.12,
        opacity: { duration: 0.3 },
        scale: { duration: 0.7, delay: 0.1 },
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <motion.div
        animate={{
          boxShadow: isHovered
            ? `0 0 0 2px ${def.glowColor}, 0 0 28px ${def.glowColor}, 0 0 55px ${def.glowColor}`
            : isSelected ? `0 0 0 2px ${def.glowColor}, 0 0 18px ${def.glowColor}` : `0 0 0px transparent`,
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{ duration: 0.25 }}
        style={{ backgroundColor: def.bgColor, borderRadius: 10 }}
        className={px}
      >
        <div className="flex items-center justify-between mb-1">
          <p className={`font-['General_Sans'] font-normal ${labelSz} leading-tight`} style={{ color: def.textColor }}>
            {def.label}
          </p>
          {showBadge && (
            <div className="bg-[#fffdf7] flex gap-[4px] items-center px-[5px] py-[2px] rounded-[4px]">
              <img alt="" className="size-3" src={imgVuesaxLinearArrowDown} />
              <p className="font-['General_Sans'] font-normal text-[#023047] text-[11px]">Jun</p>
            </div>
          )}
        </div>
        <p className={`font-['General_Sans'] font-semibold text-black ${valueSz} mb-0.5 leading-tight`}>
          {def.value}
        </p>
        <div className="flex gap-1 items-center flex-wrap">
          <p className={`font-['General_Sans'] text-gray-500 ${metricSz}`}>{def.details.subtitle}:</p>
          <p className={`font-['General_Sans'] font-medium ${metricSz}`} style={{ color: def.details.metricColor }}>
            {def.details.metric}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DetailPanel({ node, isOpen, onClose, isMobile }: {
  node: NodeDef | null; isOpen: boolean; onClose: () => void; isMobile: boolean;
}) {
  return (
    <AnimatePresence>
      {isOpen && node && (
        <>
          <motion.div
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.25)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed z-50 overflow-y-auto"
            style={
              isMobile
                ? { bottom: 0, left: 0, right: 0, maxHeight: '85vh', background: '#fffdf7', borderRadius: '20px 20px 0 0' }
                : { right: 0, top: 0, height: '100%', width: 380, background: '#fffdf7' }
            }
            initial={isMobile ? { y: '100%', opacity: 0 } : { x: 380, opacity: 0 }}
            animate={isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
            exit={isMobile ? { y: '100%', opacity: 0 } : { x: 380, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
          >
            {isMobile && (
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 bg-[rgba(0,0,0,0.15)] rounded-full" />
              </div>
            )}
            <div className="w-full h-[6px]" style={{ background: node.bgColor }} />
            <div className={`${isMobile ? 'p-5' : 'p-8'} flex flex-col gap-5`}>
              <button onClick={onClose} className="self-end text-gray-400 hover:text-gray-700 text-xl leading-none">✕</button>
              <div>
                <p className="font-['General_Sans'] text-[#848482] text-[11px] sm:text-[13px] mb-1">{node.label}</p>
                <p className="font-['General_Sans'] font-semibold text-[#1b1b1b] text-2xl sm:text-[36px] leading-tight">{node.value}</p>
              </div>
              <div className="rounded-[10px] p-4 flex items-center justify-between gap-4" style={{ background: node.bgColor }}>
                <div>
                  <p className="font-['General_Sans'] text-[11px] sm:text-[13px] text-gray-500 mb-1">{node.details.subtitle}</p>
                  <p className="font-['General_Sans'] font-semibold text-xl sm:text-2xl" style={{ color: node.details.metricColor }}>{node.details.metric}</p>
                </div>
                <p className="font-['General_Sans'] text-[11px] sm:text-[13px] font-medium" style={{ color: node.details.metricColor }}>{node.details.metricValue}</p>
              </div>
              <div className="border-t border-[rgba(0,0,0,0.06)] pt-4">
                <p className="font-['General_Sans'] text-[11px] text-[#848482] mb-2 uppercase tracking-wider">Analysis</p>
                <p className="font-['General_Sans'] text-[11px] sm:text-[13px] text-[#1b1b1b] leading-relaxed">{node.details.description}</p>
              </div>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-[8px] font-['General_Sans'] font-medium text-[13px] sm:text-[14px] text-white transition-colors hover:opacity-90"
                style={{ background: '#87a330' }}
              >
                Back to Wealth Map
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function WealthMap({ onBackHome }: { onBackHome?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(1200);
  const [size, setSize] = useState({ w: 1200, h: 600 });
  const [isMobile, setIsMobile] = useState(false);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeDef | null>(null);
  const [floatOffsets, setFloatOffsets] = useState<Record<string, number>>({});
  const startTime = useRef(Date.now());

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      setContainerW(width);
      setIsMobile(width < 640);
      setSize({ w: width, h: height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  useEffect(() => {
    setPositions(getNodePositions(size.w, size.h));
  }, [size]);

  useAnimationFrame(() => {
    const t = (Date.now() - startTime.current) / 1000;
    const offsets: Record<string, number> = {};
    NODE_DEFS.forEach((n, i) => { offsets[n.id] = Math.sin(t * (0.22 + i * 0.04) + i * 1.1) * 3; });
    setFloatOffsets(offsets);
  });

  const surroundingIds = ['income', 'savings', 'investments', 'spending', 'debts', 'subscriptions'];
  const center = positions['net-position'];

  const isNodeDimmed = (id: string) => {
    if (!hoveredNode) return false;
    if (id === hoveredNode || id === 'net-position' || hoveredNode === 'net-position') return false;
    return true;
  };

  // Canvas height: tall enough to show nodes, not so tall it scrolls forever
  const canvasH = isMobile
    ? Math.max(window.innerWidth * 0.85, 320)
    : Math.max(window.innerHeight - 200, 500);

  return (
    <div className="w-full min-h-screen bg-[#fffdf7] flex flex-col overflow-x-hidden">

      {/* Header */}
      <div className="w-full bg-[#fffdf7] border-b border-[rgba(0,0,0,0.05)] sticky top-0 z-20">
        <div className="max-w-[880px] mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5 min-w-0">
            <div className="flex gap-2 items-center">
              <div className="flex-shrink-0 size-6 sm:size-7 flex items-center justify-center">
                <div className="-rotate-90">
                  <img alt="" className="size-6 sm:size-7" src={imgLogo} />
                </div>
              </div>
              <p className="font-['General_Sans'] font-medium text-[#1b1b1b] text-[13px] sm:text-base truncate">
                Wealth Map
              </p>
            </div>
            <div className="flex gap-1.5 items-center pl-8">
              <img alt="" className="size-3 flex-shrink-0" src={imgSiAiLine} />
              <p className="font-['General_Sans'] text-[#848482] text-[11px] sm:text-[13px] truncate">
                Tap any node to explore your finances.
              </p>
            </div>
          </div>
          {onBackHome && (
            <motion.button
              onClick={onBackHome}
              className="flex-shrink-0 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-['General_Sans'] font-medium text-[11px] sm:text-[13px]"
              style={{ background: '#87a330' }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              ← Back
            </motion.button>
          )}
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ height: canvasH }}
      >
        {center && Object.keys(positions).length > 1 && (
          <svg
            className="absolute inset-0 pointer-events-none"
            width={size.w}
            height={size.h}
            style={{ overflow: 'visible' }}
          >
            {surroundingIds.map((id, i) => {
              const pos = positions[id];
              if (!pos) return null;
              const isHighlighted = !!hoveredNode && (hoveredNode === id || hoveredNode === 'net-position');
              const isDimmed = !!hoveredNode && !isHighlighted;
              return (
                <AnimatedConnection
                  key={id} gradId={`g-${id}`}
                  x1={center.x} y1={center.y} x2={pos.x} y2={pos.y}
                  delay={0.6 + i * 0.15}
                  isHighlighted={isHighlighted}
                  isDimmed={isDimmed}
                />
              );
            })}
          </svg>
        )}

        {NODE_DEFS.map((def) => {
          const pos = positions[def.id];
          if (!pos) return null;
          return (
            <WealthNode
              key={def.id}
              def={def} x={pos.x} y={pos.y}
              isCenter={def.id === 'net-position'}
              isSelected={selectedNode?.id === def.id}
              isHovered={hoveredNode === def.id}
              isDimmed={isNodeDimmed(def.id)}
              floatOffset={floatOffsets[def.id] ?? 0}
              containerW={containerW}
              onHover={() => setHoveredNode(def.id)}
              onLeave={() => setHoveredNode(null)}
              onClick={() => setSelectedNode(def)}
            />
          );
        })}
      </div>

      {/* Footer insight */}
      <div className="w-full bg-[#fffdf7] border-t border-[rgba(0,0,0,0.05)]">
        <div className="max-w-[880px] mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="bg-white border border-[rgba(0,0,0,0.07)] rounded-[12px] p-4 sm:p-5">
            <div className="flex gap-2 items-center mb-2.5">
              <img alt="" className="size-3.5 flex-shrink-0" src={imgSiAiLine} />
              <p className="font-['General_Sans'] font-medium text-[#848482] text-[11px] sm:text-[13px]">
                AI Insight
              </p>
            </div>
            <p className="font-['General_Sans'] text-[#1b1b1b] text-[11px] sm:text-[13px] leading-relaxed mb-2">
              Your spending is growing faster than your savings. At this pace, your savings goal will be delayed by{' '}
              <span className="text-[#87a330] font-medium">43 days</span>.
            </p>
            <p className="font-['General_Sans'] text-[#848482] text-[11px] sm:text-[13px] leading-relaxed">
              Reduce discretionary spending by 10% to save an extra{' '}
              <span className="text-[#87a330] font-medium">₦264,000</span> yearly.
            </p>
          </div>
        </div>
      </div>

      <DetailPanel
        node={selectedNode}
        isOpen={!!selectedNode}
        onClose={() => setSelectedNode(null)}
        isMobile={isMobile}
      />
    </div>
  );
}