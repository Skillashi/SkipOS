import { useState } from 'react'
import MissionControl from './components/MissionControl'
import AICoPilot from './components/AICoPilot'
import WealthMap from './components/WealthMap'

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'mission-control' | 'ai-copilot' | 'wealth-map'>('mission-control')

  return (
    <div className="w-full h-full overflow-x-hidden">
      {currentScreen === 'mission-control' && (
        <MissionControl 
          onNavigateToAI={() => setCurrentScreen('ai-copilot')}
          onNavigateToWealth={() => setCurrentScreen('wealth-map')}
        />
      )}
      {currentScreen === 'ai-copilot' && (
        <AICoPilot onBackHome={() => setCurrentScreen('mission-control')} />
      )}
      {currentScreen === 'wealth-map' && (
        <WealthMap onBackHome={() => setCurrentScreen('mission-control')} />
      )}
    </div>
  )
}
