"use client"
import Image from 'next/image';
import React, {useState} from 'react'
import LogoutButton from './LogoutButton'
import Link from 'next/link'

const UserMenu = ({userIconUrl, userName}) => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };
    return (
        <div>
            <div className="relative">
              {userIconUrl?.length > 1 || userIconUrl ? 
              <Image
                src={userIconUrl}
                // src={"/images/user.png"}
                alt="User Icon"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={toggleMenu}
                width={100} height={100}
              />
              :
              <Image
                src={"/images/user.png"}
                alt="User Icon"
                className="w-8 h-8 rounded-full cursor-pointer"
                onClick={toggleMenu}
                width={100} height={100}
              />}

              {isMenuOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 shadow-md rounded-lg">
                  <table className="w-full text-black">
                    <tbody>
                      <tr>
                        <td className="p-2 cursor-pointer"><Link href="/User">Profil</Link></td>
                      </tr>
                      <tr>
                        <td className="p-2 cursor-pointer"><LogoutButton /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
        </div>
    )
}

export default UserMenu
