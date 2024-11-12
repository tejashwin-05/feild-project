"use client"
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'

function Header() {

  const path=usePathname();
  useEffect(()=>{
    console.log(path)
  },[])


  return (
    <div className='flex p-4 items-center justify-between bg-black shadow-sm text-white'>
        <Image src={'/logo.svg'} width={160} height={100} alt='logo' />
        <ul className='hidden md:flex gap-6'>
          <li className={`hover:text-pink-300 hover:font-bold transition-all cursor-pointer
            ${path=='/dashboard'&&'text-pink-300 font-bold'}
          `}>Dashboard</li>
          <li className={`hover:text-pink-300 hover:font-bold transition-all cursor-pointer
            ${path=='/dashboard/question'&&'text-pink-300 font-bold'}
            `}>Questions</li>
          {/* <li className={`hover:text-pink-300 hover:font-bold transition-all cursor-pointer
            ${path=='/dashboard/upgrade'}
            `}>Upgrade</li> */}
          <li className={`hover:text-pink-300 hover:font-bold transition-all cursor-pointer
            ${path=='/dashboard/how'}
            `}>How it works?</li>
        </ul>
        <UserButton />
    </div>
  )
}

export default Header;