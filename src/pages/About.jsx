import React from 'react'
import { useTheme } from '../store/ThemeContext'

const About = () => {

  const { themeToggle } = useTheme();

  return (
    <>
      <section>
        <div className={`${themeToggle ? "" : 'dark'}  about-container min-h-full `}>
          <div className="about-intro relative overflow-hidden px-5 sm:px-10 md:px-20 py-3 md:py-6 bg-primary/50 dark:bg-black/95 flex flex-col items-center">
            <h2 className='text-center mt-30 md:mt-40 font-[Segoe_UI] mb-7 text-xs md:text-sm  font-semibold bg-[rgba(255,255,255,0.3)] w-fit self-center px-2 md:px-5 py-2 rounded-full backdrop-blur-xs border border-primary flex gap-2 items-center'> <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg> Your Digital Companion for Japa Meditation</h2>
            <h1 className='text-center font-[Segoe_UI] text-3xl sm:text-4xl md:text-6xl tracking-tight font-bold bg-[linear-gradient(145deg,#0D4715_50%,#41644A_60%)] text-transparent bg-clip-text mb-5'>About Us</h1>

            <p className='text-center text-gray-800 sm:w-[75%] lg:w-1/2 font-semibold mb-12'>Welcome to our platform, dedicated to nurturing your spiritual journey through the ancient practice of Japa meditation. We blend tradition with technology, providing intuitive tools designed to help you focus, count, and connect with the divine names and sacred mantras.</p>

            <div className='w-14 h-27 border rounded-full border-gray-500/50 relative flex justify-center animate-[bounce_5s_infinite]'>
              <div className='w-8 h-8  absolute bottom-3 self-center rounded-full bg-gray-500/50 '>
              </div>
            </div>
          </div>


          {/* Our Mission */}
          <div className="our-mission px-7 sm:px-15 md:px-25 py-3 md:py-6 my-10 font-poppins">
            <div className="our-mission-box w-full shadow-[0px_0px_5px_1px] border border-gray-500 p-7 rounded-2xl md:flex justify-between">
               <div className="md:w-[70%] flex flex-col gap-10 md:order-last ">
                <h2 className='text-2xl sm:text-3xl md:text-5xl font-bold text-secondary'>Our Mission</h2>
                <p className=''>Our mission is to make the practice of Japa accessible and effortless in a busy modern world. We believe in the power of conscious repetition of divine names and mantras to bring peace, clarity, and spiritual elevation.</p>
              </div>
              <div className="w-full md:w-[30%] content-between md:order-first ">
                <img src="/images/hand_bid.png" alt="hand_bid" className='w-70 h-70 mx-auto' />
              </div>
             

            </div>
          </div>

        </div>
      </section>
    </>
  )
}

export default About
