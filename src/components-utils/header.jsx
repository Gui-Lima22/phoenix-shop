"use client"

import { Fragment } from 'react'
import { Disclosure, Menu, MenuItems, MenuItem, Transition, MenuButton } from '@headlessui/react'
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline'
import { Saira_Stencil_One } from 'next/font/google'

const sairaStencil = Saira_Stencil_One({
  weight: ['400'],
  subsets: ['latin']
})

const Header = () => {
  
  return (
    <Disclosure as="nav" className="nav">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">

          <div className="flex flex-1 items-stretch justify-start">
            <div className="flex flex-shrink-0 items-center">
              <a className={sairaStencil.className + " cursor-pointer text-gray-600 text-4xl"} href="/">Phoenix Shop</a>
            </div>

          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full p-1 text-gray-900 hover:text-gray-700 focus:outline-none ring-2 ring-gray-800 ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative rounded-full p-1 text-gray-900 hover:text-gray-700 focus:outline-none ring-2 ring-gray-800 ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <UserIcon className="h-6 w-6" aria-hidden="true" />
                </MenuButton>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                      Your Profile
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                      Settings
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                      Sign out
                    </a>
                  </MenuItem>
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}

export default Header;