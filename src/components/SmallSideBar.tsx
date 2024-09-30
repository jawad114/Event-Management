import React from 'react'
import { ElementType } from 'react'
import { buttonStyles } from './Button'
import { twMerge } from 'tailwind-merge'
type SmallSideBarProps = {
    Icon: ElementType,
    title: string,
    url: string
}

function SmallSideBar({ Icon, title, url }: SmallSideBarProps) {
  return (
    <a href={url} className={twMerge(buttonStyles({ variant: 'ghost'}),"py-4 px-1 flex flex-col items-center rounded-lg gap-1 mr-5")} >
        <Icon className='w-6 h-6' />
        <span className='text-sm'>{title}</span>
    </a>
  )
}

export default SmallSideBar