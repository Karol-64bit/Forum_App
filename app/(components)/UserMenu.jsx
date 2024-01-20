"use client"
import Image from 'next/image';
import React, {useState} from 'react'

const UserMenu = ({userIconUrl, userName}) => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };
    return (
        <div>
            <div className="relative">
      <Image
        src={userIconUrl}
        alt="User Icon"
        className="w-8 h-8 rounded-full cursor-pointer"
        onClick={toggleMenu}
        width={100} height={100}
      />

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-md rounded-lg">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="p-2 hover:bg-gray-100 cursor-pointer">Option 1</td>
              </tr>
              <tr>
                <td className="p-2 hover:bg-gray-100 cursor-pointer">Option 2</td>
              </tr>
              <tr>
                <td className="p-2 hover:bg-gray-100 cursor-pointer">Option 3</td>
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
