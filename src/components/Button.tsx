import React from 'react'
import {VariantProps, cva } from 'class-variance-authority'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
export const buttonStyles = cva(
    ["hover:bg-secondary-hover0", "transition-colors"], {
        variants: {
            variant: {
                default: ["bg-secondary"],
                ghost:["hover:bg-gray-100"],
                dark:["bg-secondary-dark",
                    "hover:bg-secondary-dark-hover",
                    "text-secondary-white",
                    "active:bg-secondary-dark-active",
                ]
                ,
            },
            size:{
                default:[],
                icon:["rounded-full", "w-10", "h-10", "flex","items-center","justify-center", "p-2.5"],

            }
        }
    }
)

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">
function Button({variant, size,className, ...props}:ButtonProps) {
  return (
    <button {...props} className={twMerge(className,buttonStyles({variant, size, }),className, )}></button>
  )
}

export default Button