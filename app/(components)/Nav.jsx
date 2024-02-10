import Link from 'next/link'
import React from 'react'
import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'
import Settings from '../(models)/Settings'
import UserMenu from './UserMenu'

const Nav = async () => {
  
  const session = await getServerSession(options);
  const userName = session?.user?.name
  const role = session?.user?.role

  const settings = await Settings.findOne();


  return (
    <div>
      <header className='bg-gray-600 text-gray-100' style={{ backgroundColor: settings.navColor }}>
        <nav className='flex justify-between items-center w-full px-10 py-4'>
          <div>
            <Link href="/">{settings.title}</Link>
          </div>
          <div className='flex gap-10'>     
            <Link href="/Member">Member</Link>
            {role == "admin"?<Link href="/AdminDashboard">Panel Administracyjny</Link>:""}
            {session ? (
              // <LogoutButton />
              <UserMenu userIconUrl={session?.user?.avatar} userName={userName} />
            ) : (
              <Link href="/Login">Logowanie</Link>
            )}
            
          </div>
        </nav>

      </header>
    </div>
  )
}

export default Nav
