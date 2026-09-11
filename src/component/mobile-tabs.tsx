import { useRef, type KeyboardEvent } from 'react'
import { dashboardTabs, type DashboardTab } from '../data/race-data'

type MobileTabsProps = {
  activeTab: DashboardTab
  onTabChange: (tab: DashboardTab) => void
}

export function MobileTabs({ activeTab, onTabChange }: MobileTabsProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % dashboardTabs.length
    else if (event.key === 'ArrowLeft') nextIndex = (index + dashboardTabs.length - 1) % dashboardTabs.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = dashboardTabs.length - 1
    else return

    event.preventDefault()
    onTabChange(dashboardTabs[nextIndex].id)
    tabRefs.current[nextIndex]?.focus()
  }

  return (
    <div className="mb-6 grid grid-cols-3 gap-1 bg-panel-deep p-1 md:hidden">
      {dashboardTabs.map((tab, index) => (
        <button
          key={tab.id}
          ref={(element) => { tabRefs.current[index] = element }}
          type="button"
          tabIndex={activeTab === tab.id ? 0 : -1}
          onClick={() => onTabChange(tab.id)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          className={`min-h-12 cursor-pointer px-4 text-sm font-extrabold transition-colors ${activeTab === tab.id ? 'bg-accent text-panel-deep' : 'text-accent hover:bg-accent/15 hover:text-white'}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
