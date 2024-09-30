import React from 'react'
import SmallSideBar from '../components/SmallSideBar'
import { Calendar, CalendarClock, Clapperboard, Gamepad, HandPlatter, History, Home, LayoutDashboard, Library, LibraryBig, LibraryIcon, MoreHorizontal, Newspaper, Play, Repeat, Settings2, ThumbsUpIcon, TrendingUp, VideoIcon, Watch } from 'lucide-react'
import LargeSideBarSection from '../components/LargeSideBarSection'
import LargeSideBarItems from '../components/LargeSideBarItems'
function SideBar({isSidebarCollapsed}: {isSidebarCollapsed: boolean}) {
  return (
    <>
   <aside className={`sticky top-0 overflow-y-auto pb-4 flex-col ml-1 ${isSidebarCollapsed ? 'lg:flex' : 'lg:hidden'} hidden`}>
        <SmallSideBar Icon={Home} title="Home" url="/" />
        <SmallSideBar Icon={Repeat} title="Shorts" url="/" />
      <SmallSideBar Icon={Clapperboard} title="Subscriptions" url="/"/>
      <SmallSideBar Icon={Library} title="Library" url="/"/>
      <SmallSideBar Icon={History} title="Home" url="/"/>
      <SmallSideBar Icon={Watch} title="Watch later" url="/"/>
      <SmallSideBar Icon={TrendingUp} title="Trending" url="/"/>
      <SmallSideBar Icon={MoreHorizontal} title="Show more" url="/"/>
    </aside>

    <aside className={`w-56 lg:sticky lg:block absolute top-0 overflow-y-auto pb-4 flex-col gap-2 px-2 ${isSidebarCollapsed ? 'lg:hidden' : 'lg:flex'} hidden`}>
  <LargeSideBarSection>
  <LargeSideBarItems Icon={LayoutDashboard} title="Dashboard" url="/" isActive={true} /> 
              <LargeSideBarItems Icon={Calendar} title="Calendar" url="/" isActive={false} /> 
              <LargeSideBarItems Icon={CalendarClock} title="Events" url="/" isActive={false} /> 
              <LargeSideBarItems Icon={HandPlatter} title="Offer & Deals" url="/" isActive={false} /> 
              <LargeSideBarItems Icon={Settings2} title="Settings" url="/" isActive={false} /> 
  </LargeSideBarSection>
</aside>

    </>
  )
}

export default SideBar