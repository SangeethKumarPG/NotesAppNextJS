'use client';
import { useOthers, useSelf } from '@liveblocks/react';
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
  

function Avatars() {
    const others = useOthers();
    const self = useSelf();
    const all = [self, ...others];
  return (
    <div className='flex items-center gap-2'>
        <p className='font-light text-sm'>Users currently editing this page:</p>
        <div className="flex -space-x-5">
            {all?.length > 0 && all.map((user, i) => (
                <TooltipProvider key={user?.id! + i}>
                <Tooltip>
                  <TooltipTrigger>
                    <Avatar className='border-2 hover:z-50'>
                        <AvatarImage src={user?.info?.avatar}/>
                        <AvatarFallback>{user?.info?.name}</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{self?.id === user?.id? 'You' : user?.info?.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
            ))}
        </div>
    </div>
  )
}

export default Avatars