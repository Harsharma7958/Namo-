import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Navbar = () => {

    const [themeToggle, setThemeToggle] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved === null ? true : saved === 'light';
    });
    const [menuToggle, setMenuToggle] = useState(false);

    const handleMenu = () => {
        setMenuToggle(prev => !prev);
    }

    const themeToggleRef = useRef()

    const themeToggleFun = () => {
        setThemeToggle(prev => !prev);
    }

    useEffect(() => {
        const themename = themeToggle ? 'light' : 'dark';
        localStorage.setItem('theme', themename);
    }, [themeToggleFun])




    const menuRef = useRef();
    const tl = useRef();
    const navRef = useRef()


    useGSAP(() => {

        gsap.from(navRef.current, {
            y: -100,
            duration: 0.8,
            opacity: 0
        })

        gsap.set(menuRef.current, { right: "-100%" })

        tl.current = gsap.timeline({ paused: true })
            .to(menuRef.current, {
                right: 0,
                duration: 0.4,
                ease: "power1.out",
            })
            .from(".navlinkEffect", {
                opacity: 0
            })
            .to(".navlinkEffect", {
                opacity: 1,
                duration: 0.2,
                stagger: 0.1,
            })
    }, { scope: menuRef })

    useEffect(() => {
        menuToggle ? tl.current.play() : tl.current.reverse();
    }, [menuToggle]);


    return (
        <>
            <header className={`${themeToggle ? '' : 'dark'} `}>
                <div ref={navRef} className="nav-container bg-light px-5 sm:px-10 md:px-20 py-3 md:py-6 flex justify-between items-center text-secondary font-[Poppins] shadow-xl dark:shadow-lg z-10 dark:shadow-white dark:bg-black dark:text-primary ">
                    <div className="nav-logo font-[Amita] font-bold text-2xl md:text-4xl bg-[linear-gradient(to_right,#0D4715_20%,#fff_40%,#fff_60%,#0D4715_80%)] dark:bg-[linear-gradient(to_right,#E9762B_20%,#fff_40%,#fff_60%,#E9762B_80%)]">
                        Namoजपं
                    </div>
                    <div className='md:hidden nav-left-mobile flex items-center gap-10 font-bold'>
                        <div className='bg-white hover:bg-[#e9772b46] dark:bg-white dark:hover:bg-light transition-all duration-300 rounded-full p-2 cursor-pointer ' ref={themeToggleRef} onClick={themeToggleFun}>
                            <svg className='not-dark:hidden ' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                                <path d="M 24.984375 3.9863281 A 1.0001 1.0001 0 0 0 24 5 L 24 11 A 1.0001 1.0001 0 1 0 26 11 L 26 5 A 1.0001 1.0001 0 0 0 24.984375 3.9863281 z M 10.847656 9.8476562 A 1.0001 1.0001 0 0 0 10.150391 11.564453 L 14.394531 15.808594 A 1.0001 1.0001 0 1 0 15.808594 14.394531 L 11.564453 10.150391 A 1.0001 1.0001 0 0 0 10.847656 9.8476562 z M 39.123047 9.8476562 A 1.0001 1.0001 0 0 0 38.435547 10.150391 L 34.191406 14.394531 A 1.0001 1.0001 0 1 0 35.605469 15.808594 L 39.849609 11.564453 A 1.0001 1.0001 0 0 0 39.123047 9.8476562 z M 25 15 A 1.0001 1.0001 0 0 0 24.589844 15.083984 C 19.284905 15.312748 15 19.640816 15 25 C 15 30.505414 19.495611 35 25 35 C 30.50528 35 35 30.50528 35 25 C 35 19.642276 30.717945 15.314763 25.414062 15.083984 A 1.0001 1.0001 0 0 0 25 15 z M 25 17 C 29.420586 17 33 20.580389 33 25 C 33 29.42072 29.42072 33 25 33 C 20.580389 33 17 29.420586 17 25 C 17 20.580523 20.580523 17 25 17 z M 5 24 A 1.0001 1.0001 0 1 0 5 26 L 11 26 A 1.0001 1.0001 0 1 0 11 24 L 5 24 z M 39 24 A 1.0001 1.0001 0 1 0 39 26 L 45 26 A 1.0001 1.0001 0 1 0 45 24 L 39 24 z M 15.082031 33.890625 A 1.0001 1.0001 0 0 0 14.394531 34.193359 L 10.150391 38.435547 A 1.0001 1.0001 0 1 0 11.564453 39.849609 L 15.808594 35.607422 A 1.0001 1.0001 0 0 0 15.082031 33.890625 z M 34.888672 33.890625 A 1.0001 1.0001 0 0 0 34.191406 35.607422 L 38.435547 39.849609 A 1.0001 1.0001 0 1 0 39.849609 38.435547 L 35.605469 34.193359 A 1.0001 1.0001 0 0 0 34.888672 33.890625 z M 24.984375 37.986328 A 1.0001 1.0001 0 0 0 24 39 L 24 45 A 1.0001 1.0001 0 1 0 26 45 L 26 39 A 1.0001 1.0001 0 0 0 24.984375 37.986328 z"></path>
                            </svg>
                            <svg className='dark:hidden' xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="black" viewBox="0 0 16 16">
                                <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286" />
                            </svg>
                        </div>
                        <div className="menu-icon relative z-10" onClick={handleMenu}>
                            <hr className={`${menuToggle ? 'hidden' : 'block'} bg-secondary  transition-all duration-700 dark:bg-primary h-1 w-7 rounded-full`} />
                            <hr className={`${menuToggle ? 'my-0 rotate-130' : 'my-1'} bg-secondary  transition-all duration-300 dark:bg-primary h-1 w-7 rounded-full`} />
                            <hr className={`${menuToggle ? 'rotate-45 absolute top-0' : 'rotate-0'} bg-secondary  transition-all duration-300 dark:bg-primary h-1 w-7 rounded-full`} />

                        </div>
                        <div className={` nav-link-mobile absolute top-0 p-7 w-full bg-[rgba(255,255,255,0.3)] dark:bg-[rgba(0,0,0,0.5)] backdrop-blur-xs min-h-screen max-h-screen`} ref={menuRef}>
                            <ul className='flex flex-col gap-4 items-center'>
                                {['home', 'about', 'counter', 'contact', 'developer'].map((element, i) => {
                                    return (
                                        <li key={i}>
                                            <NavLink className="navlinkEffect opacity-100 hover:text-primary dark:hover:text-light capitalize" onClick={handleMenu} to={element === 'home' ? '/' : `/${element}`}>{element}</NavLink >
                                        </li>
                                    )
                                })}


                            </ul>
                        </div>
                    </div>
                    <div className="nav-left-pc hidden md:block font-semibold text-lg sticky right-0 left-0">
                        <ul className='flex gap-4 lg:gap-10 items-center'>
                            {['home', 'about', 'counter', 'contact', 'developer'].map((element, i) => {
                                return (
                                    <li key={i}>
                                        <NavLink className="navlinkEffect text-base hover:text-primary dark:hover:text-light capitalize" to={element === 'home' ? '/' : `/${element}`}>{element}</NavLink >
                                    </li>
                                )
                            })}

                            <li className='bg-white hover:bg-[#e9772b46] dark:bg-white dark:hover:bg-light transition-all duration-300 rounded-full p-2 cursor-pointer' ref={themeToggleRef} onClick={themeToggleFun}>
                                <svg className='not-dark:hidden' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                                    <path d="M 24.984375 3.9863281 A 1.0001 1.0001 0 0 0 24 5 L 24 11 A 1.0001 1.0001 0 1 0 26 11 L 26 5 A 1.0001 1.0001 0 0 0 24.984375 3.9863281 z M 10.847656 9.8476562 A 1.0001 1.0001 0 0 0 10.150391 11.564453 L 14.394531 15.808594 A 1.0001 1.0001 0 1 0 15.808594 14.394531 L 11.564453 10.150391 A 1.0001 1.0001 0 0 0 10.847656 9.8476562 z M 39.123047 9.8476562 A 1.0001 1.0001 0 0 0 38.435547 10.150391 L 34.191406 14.394531 A 1.0001 1.0001 0 1 0 35.605469 15.808594 L 39.849609 11.564453 A 1.0001 1.0001 0 0 0 39.123047 9.8476562 z M 25 15 A 1.0001 1.0001 0 0 0 24.589844 15.083984 C 19.284905 15.312748 15 19.640816 15 25 C 15 30.505414 19.495611 35 25 35 C 30.50528 35 35 30.50528 35 25 C 35 19.642276 30.717945 15.314763 25.414062 15.083984 A 1.0001 1.0001 0 0 0 25 15 z M 25 17 C 29.420586 17 33 20.580389 33 25 C 33 29.42072 29.42072 33 25 33 C 20.580389 33 17 29.420586 17 25 C 17 20.580523 20.580523 17 25 17 z M 5 24 A 1.0001 1.0001 0 1 0 5 26 L 11 26 A 1.0001 1.0001 0 1 0 11 24 L 5 24 z M 39 24 A 1.0001 1.0001 0 1 0 39 26 L 45 26 A 1.0001 1.0001 0 1 0 45 24 L 39 24 z M 15.082031 33.890625 A 1.0001 1.0001 0 0 0 14.394531 34.193359 L 10.150391 38.435547 A 1.0001 1.0001 0 1 0 11.564453 39.849609 L 15.808594 35.607422 A 1.0001 1.0001 0 0 0 15.082031 33.890625 z M 34.888672 33.890625 A 1.0001 1.0001 0 0 0 34.191406 35.607422 L 38.435547 39.849609 A 1.0001 1.0001 0 1 0 39.849609 38.435547 L 35.605469 34.193359 A 1.0001 1.0001 0 0 0 34.888672 33.890625 z M 24.984375 37.986328 A 1.0001 1.0001 0 0 0 24 39 L 24 45 A 1.0001 1.0001 0 1 0 26 45 L 26 39 A 1.0001 1.0001 0 0 0 24.984375 37.986328 z"></path>
                                </svg>
                                <svg className='dark:hidden' xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="black" viewBox="0 0 16 16">
                                    <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286" />
                                </svg>
                            </li>
                        </ul>
                    </div>
                </div >
            </header >
        </>
    )
}

export default Navbar
