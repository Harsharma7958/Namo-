import React from 'react'
import { useTheme } from '../store/ThemeContext'

const Footer = () => {

    const { themeToggle } = useTheme();

    return (
        <>
            <footer>
                <div className={`${themeToggle ? '' : 'dark'} footer-container bg-light px-5 sm:px-10 md:px-20 py-3 md:py-5 text-center text-secondary font-[Poppins] shadow-[0px_0px_20px_0px] dark:shadow-[0px_0px_20px_0px] z-10 dark:shadow-white dark:bg-black dark:text-primary`}>
                    <p>© 2025 <span className='font-amita font-bold'>Namoजपं</span> . All rights reserved</p>
                    <p className='my-1'>Your digital companion for spiritual mindfulness.</p>
                    <p>Built with ❤️ for the community</p>
                </div>
            </footer>
        </>
    )
}

export default Footer
