"use client";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs';
import React from 'react'
import BreadCrumbs from './BreadCrumbs';

function Header() {
    const {user} = useUser();
  return (
    <div className='flex items-center justify-between p-5'>
        {user &&
            <h1 className='text-2xl'>
                {user?.firstName}{`'s`} space
            </h1>
        }

        {/* Bread Crumbs */}
        <BreadCrumbs/>
        <SignedOut>
            <SignInButton/>
        </SignedOut>
        <SignedIn>
            <UserButton/>
        </SignedIn>
    </div>
  )
}

export default Header