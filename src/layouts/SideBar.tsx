
import React from 'react';
import { Calendar, CalendarClock, HandPlatter, Settings2, LogOut, LogIn, LockKeyhole, LockOpenIcon, LogInIcon, LayoutDashboard } from 'lucide-react';
import LargeSideBarSection from '../components/LargeSideBarSection';
import LargeSideBarItems from '../components/LargeSideBarItems';
import { ToastContainer, toast } from 'react-toastify';

function SideBar({ isSidebarCollapsed }: { isSidebarCollapsed: boolean }) {
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    toast.success("Logout successful!");
    setTimeout(() => {
      window.location.reload();
    }, 2000)
  };

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <aside className={`w-56 lg:sticky lg:block absolute top-0 overflow-y-auto pb-4 flex-col gap-2 px-2 ${isSidebarCollapsed ? 'lg:hidden' : 'lg:flex'} hidden`}>
      <LargeSideBarSection>
        {isLoggedIn ? (
          <>
          <LargeSideBarItems Icon={LayoutDashboard} title="Dashboard" url="/home" isActive={false} />
            <LargeSideBarItems Icon={Calendar} title="Calendar" url="/" isActive={false} />
            <LargeSideBarItems Icon={CalendarClock} title="Events" url="/events" isActive={false} />
            <LargeSideBarItems Icon={HandPlatter} title="Offer & Deals" url="/" isActive={false} />
            <LargeSideBarItems Icon={Settings2} title="Settings" url="/" isActive={false} />
            <LargeSideBarItems
              Icon={LogOut}
              title="Logout"
              url="/"
              isActive={false}
              onClick={handleLogout}
            />
          </>
        ) : (
          <>
            <LargeSideBarItems Icon={LogInIcon} title="Login" url="/login" isActive={false} />
            <LargeSideBarItems Icon={LockKeyhole} title="Register" url="/register" isActive={false} />
          </>
        )}
      </LargeSideBarSection>
    </aside>
  );
}

export default SideBar;
