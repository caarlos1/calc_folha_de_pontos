import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import * as storage from '../util/storage'

function SwitchTheme () {
    const [darkTheme, setTheme] = useState(storage.get('darkTheme') || false);

    const changeTheme = () => {
      storage.set('darkTheme',!darkTheme)
      setTheme(!darkTheme)
    }

    useEffect(() => {
      if (darkTheme || (!('darkTheme' in storage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }, [darkTheme]);
    
    return (
        <button 
          className='w-12 h-6 mb-2 rounded-full dark:bg-white bg-gray-700 flex items-center transition duration-500 focus:outline-none shadow hover:after:translate-x-1'
          onClick={()=> changeTheme()}
        >
          <div
            className='w-8 h-8 relative rounded-full bg-gray-900 text-white -translate-x-2 dark:bg-gray-200 dark:text-black dark:translate-x-3/4 transition duration-500 transform p-1'>
            {
              darkTheme ? 
              <SunIcon className='h-6 w-6' />:
              <MoonIcon className='h-6 w-6' />
            }
          </div>
      </button>
    )
}

export default SwitchTheme;