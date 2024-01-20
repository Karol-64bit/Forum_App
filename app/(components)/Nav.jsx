import Link from 'next/link'
import React from 'react'
import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'
import LogoutButton from './LogoutButton'
import UserMenu from './UserMenu'
const Nav = async () => {
  const session = await getServerSession(options);
  const userName = session?.user?.name
  return (
    <div>
      <header className='bg-gray-600 text-gray-100'>
        <nav className='flex justify-between items-center w-full px-10 py-4'>
          <div>
            My Site
          </div>
          <div className='flex gap-10'>
            <Link href="/">Home</Link>
            <Link href="/CreateUser">Create User</Link>
            <Link href="/ClientMember">Client Member</Link>
            <Link href="/Member">Member</Link>
            <Link href="/Public">Public</Link>
            {session ? (
              <LogoutButton />
            ) : (
              <Link href="/Login">Login</Link>
            )}
            {/* <UserMenu userIconUrl={session?.user?.avatar} userName={userName} /> */}
          </div>
        </nav>

      </header>
      {/* <nav class="bg-white border-gray-200 dark:bg-gray-900">
   <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
   <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
       <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
       <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
   </a>
   <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
       <button type="button" class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
         <span class="sr-only">Open user menu</span>
         <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" />
       </button>

       <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
         <div class="px-4 py-3">
           <span class="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
           <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
         </div>
         <ul class="py-2" aria-labelledby="user-menu-button">
           <li>
             <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
           </li>
           <li>
             <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
           </li>
           <li>
             <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
           </li>
           <li>
             <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
           </li>
         </ul>
       </div>

   </div>
   </div>
 </nav> */}
    </div>
  )
}

export default Nav
