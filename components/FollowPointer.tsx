import React from 'react'
import {  motion, useMotionValue } from 'framer-motion'
import stringToColor from '../lib/stringToColor'

function FollowPointer({
    x, y, info
}: {
    x: number,
    y: number,
    info: {
        name: string;
        email: string;
        avatar: string;
    }
}) {
    const color = stringToColor(info.email || '1');
    return (
        <motion.div
            className='h-4 w-4 rounded-full absolute z-50'
            style={{
                top: x,
                left: y,
                pointerEvents: 'none',
            }}
            initial={{
                scale: 1,
                opacity: 1
            }}
            animate={{
                scale: 1,
                opacity: 1,
            }}
            exit={{
                scale: 0,
                opacity: 0,
            }}
        >
            <svg fill={color} stroke={color}
                width='1em'
                height='1em'
                viewBox="-96 0 512 512" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M302.189 329.126H196.105l55.831 135.993c3.889 9.428-.555 19.999-9.444 23.999l-49.165 21.427c-9.165 4-19.443-.571-23.332-9.714l-53.053-129.136-86.664 89.138C18.729 472.71 0 463.554 0 447.977V18.299C0 1.899 19.921-6.096 30.277 5.443l284.412 292.542c11.472 11.179 3.007 31.141-12.5 31.141z"></path></g></svg>
            <motion.div
                style={{
                    backgroundColor: color,
                }}
                initial={{
                    scale: 0.5,
                    opacity: 0
                }}
                animate={{
                    scale: 1,
                    opacity: 1,
                }}
                exit={{
                    scale: 0.5,
                    opacity: 0,
                }}
                className='px-2 py-2 bg-neutral-200 text-black font-bold white-space-nowrap min-w-max text-xs rounded-full'
            >
                {info?.name || info?.email}
            </motion.div>
        </motion.div>
    )
}

export default FollowPointer