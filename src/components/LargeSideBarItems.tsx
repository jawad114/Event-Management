import React, { ElementType } from 'react'
import { twMerge } from 'tailwind-merge'
import { buttonStyles } from './Button'


type LargeSideBarItemsProps = {
    Icon: ElementType,
    title: string,
    url: string,
    isActive: boolean
}
function LargeSideBarItems({Icon,  title, url, isActive=false}: LargeSideBarItemsProps) {
  return (
    <a href={url} className={twMerge(buttonStyles({variant: 'ghost'}), `w-full flex items-center gap-4 rounded-lg p-3 ${isActive ? "bg-slate-200 font-bold hover:bg-secondary ": undefined}`)}>
        <Icon className='w-6 h-6' />
        <div className='whitespace-nowrap overflow-hidden text-ellipsis'>{title}</div>
    </a>
  )
}

export default LargeSideBarItems