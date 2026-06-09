import React, { useState } from 'react'
import { useTheme } from '../store/ThemeContext'

const About = () => {

  const { themeToggle } = useTheme();
  const [activeContent, setActiveContent] = useState(0);

  const showContent = (i) => {
    setActiveContent(i);
  }

  return (
    <>
      <section>
        <div className={`${themeToggle ? "" : 'dark'}  about-container min-h-full dark:bg-black/95`}>
          <div className="about-intro relative overflow-hidden px-5 sm:px-10 md:px-20 py-3 md:py-6 bg-primary/50 dark:bg-black/1 flex flex-col items-center">
            <h2 className='text-center mt-30 md:mt-40 font-[Segoe_UI] mb-7 text-xs md:text-sm  font-semibold bg-[rgba(255,255,255,0.3)] w-fit self-center px-2 md:px-5 py-2 rounded-full backdrop-blur-xs border border-primary flex gap-2 items-center dark:text-white'> <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg> Your Digital Companion for Japa Meditation</h2>
            <h1 className='text-center font-serif text-3xl sm:text-4xl md:text-6xl tracking-tight font-bold bg-[linear-gradient(145deg,#0D4715_50%,#41644A_60%)] text-transparent bg-clip-text mb-5 dark:bg-[linear-gradient(145deg,#E9762B_50%,#41644A_60%)]'>About Us</h1>

            <p className='text-center text-gray-800 dark:text-white sm:w-[75%] lg:w-1/2 font-semibold mb-12'>Welcome to our platform, dedicated to nurturing your spiritual journey through the ancient practice of Japa meditation. We blend tradition with technology, providing intuitive tools designed to help you focus, count, and connect with the divine names and sacred mantras.</p>

            <div className='w-14 h-27 border rounded-full border-gray-500/50 relative flex justify-center animate-[bounce_5s_infinite] mb-10'>
              <div className='w-8 h-8  absolute bottom-3 self-center rounded-full bg-gray-500/50 '>
              </div>
            </div>
          </div>

          {/* Content  */}
          <div className="AboutContentContainer px-5 sm:px-10 md:px-20 ">
            <div className='-mt-8.5 bg-white w-[90%] relative mx-auto p-2 rounded-2xl shadow-lg'>
              <div className="flex flex-col sm:flex-row sm:w-fit mx-auto gap-1">
                {
                  ['Our Mission', 'What We Offer', 'Our Philosophy'].map((value, i) => {
                    return (
                      <h3 className={`${activeContent == i ? 'bg-primary/25 text-primary hover:bg-primary/25 aboutContentHeading' : ""}  relative px-5 py-4 rounded-2xl hover:bg-primary/8 hover:text-primary text-[#4a5568] font-semibold text-l cursor-pointer transition-all duration-300 text-center`} onClick={() => { showContent(i) }}>{value}</h3>
                    )
                  })
                }
              </div>
            </div>
            <div className="AboutContentContainerBox shadow-xl my-15 rounded-3xl p-10 border border-gray-200">
              {activeContent == 0 ?
                <>
                  <div className='md:flex justify-between'>
                    <div class="md:w-[70%] flex flex-col gap-10 md:order-last "><h2 class="text-2xl sm:text-3xl md:text-5xl font-bold text-secondary">Our Mission</h2><p class="text-gray-600">Our mission is to make the practice of Japa accessible and effortless in a busy modern world. We believe in the power of conscious repetition of divine names and mantras to bring peace, clarity, and spiritual elevation.</p></div>
                    <div class="w-full md:w-[30%] content-between md:order-first "><img alt="hand_bid" class="w-70 h-70 mx-auto" src="/images/hand_bid.png" /></div>
                  </div>
                </>
                : activeContent == 1 ?
                  <>
                    <h4 className='mx-auto text-center font-[Segoe_UI] font-bold text-xl sm:text-2xl md:text-4xl w-full lg:w-[70%] text-primary text-shadow-xl'>We provide a comprehensive suite of tools to assist your practice</h4>
                    <div className="cards flex mt-10 justify-between flex-wrap gap-y-5">
                      <div className="card w-full md:w-[49%] lg:w-[31%] border-t-primary border-t-4 border-gray-500/50 border shadow-md p-5 hover:shadow-xl transition-all duration-300 hover:scale-101 rounded-xl">
                        <div className="card-top flex items-center gap-4">
                          <div className="icon bg-primary/70 w-15 h-15 p-3 rounded-xl shadow-xl">
                            <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>voice_line</title> <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Media" transform="translate(-960.000000, -96.000000)" fill-rule="nonzero"> <g id="voice_line" transform="translate(960.000000, 96.000000)"> <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fill-rule="nonzero"> </path> <path d="M12,3 C12.51285,3 12.9355092,3.38604429 12.9932725,3.88337975 L13,4 L13,20 C13,20.5523 12.5523,21 12,21 C11.48715,21 11.0644908,20.613973 11.0067275,20.1166239 L11,20 L11,4 C11,3.44772 11.4477,3 12,3 Z M8,6 C8.55228,6 9,6.44772 9,7 L9,17 C9,17.5523 8.55228,18 8,18 C7.44772,18 7,17.5523 7,17 L7,7 C7,6.44772 7.44772,6 8,6 Z M16,6 C16.5523,6 17,6.44772 17,7 L17,17 C17,17.5523 16.5523,18 16,18 C15.4477,18 15,17.5523 15,17 L15,7 C15,6.44772 15.4477,6 16,6 Z M4,9 C4.55228,9 5,9.44772 5,10 L5,14 C5,14.5523 4.55228,15 4,15 C3.44772,15 3,14.5523 3,14 L3,10 C3,9.44772 3.44772,9 4,9 Z M20,9 C20.51285,9 20.9355092,9.38604429 20.9932725,9.88337975 L21,10 L21,14 C21,14.5523 20.5523,15 20,15 C19.48715,15 19.0644908,14.613973 19.0067275,14.1166239 L19,14 L19,10 C19,9.44772 19.4477,9 20,9 Z" id="形状" fill="#ffffff"> </path> </g> </g> </g> </g></svg>
                          </div>
                          <h5 className='font-semibold text-xl'>Automatic Japa with Audio</h5>
                        </div>
                        <p className='mt-5 text-gray-600'>Immerse yourself in uninterrupted devotion. Our unique feature automatically recites your chosen god’s name or mantra aloud at a customizable pace. Simply listen and meditate while the digital counter tracks your progress seamlessly.</p>
                      </div>
                      <div className="card w-full md:w-[49%] lg:w-[31%] border-t-primary border-t-4 border-gray-500/50 border shadow-md p-5 hover:shadow-xl transition-all duration-300 hover:scale-101 rounded-xl ">
                        <div className="card-top flex items-center gap-4">
                          <div className="icon bg-primary/70 w-15 h-15 p-3 rounded-xl shadow-xl">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#E9762B"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 2.00024C6 3.10481 5.10457 4.00024 4 4.00024C2.89543 4.00024 2 3.10481 2 2.00024C2 0.895675 2.89543 0.000244141 4 0.000244141C5.10457 0.000244141 6 0.895675 6 2.00024Z" fill="#ffffff"></path> <path d="M18.5 3.00024C19.3284 3.00024 20 2.32867 20 1.50024C20 0.671817 19.3284 0.000244141 18.5 0.000244141C17.6716 0.000244141 17 0.671817 17 1.50024C17 2.32867 17.6716 3.00024 18.5 3.00024Z" fill="#ffffff"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M13 6.50024V9.05025C13.1616 9.01746 13.3288 9.00024 13.5 9.00024C14.3886 9.00024 15.169 9.46387 15.6123 10.1624C15.8882 10.0576 16.1874 10.0002 16.5 10.0002C17.3886 10.0002 18.169 10.4639 18.6123 11.1624C18.8882 11.0576 19.1874 11.0002 19.5 11.0002C20.8807 11.0002 22 12.1195 22 13.5002V16.189C22 20.503 18.5028 24.0002 14.1888 24.0002C11.5541 24.0002 9.05855 22.8176 7.39016 20.7785L2.69971 15.0457C1.34381 13.3885 2.34402 10.887 4.46869 10.6214C5.36552 10.5093 6.25951 10.8497 6.85467 11.5298L8 12.8388V6.50024C8 5.11953 9.11929 4.00024 10.5 4.00024C11.8807 4.00024 13 5.11953 13 6.50024ZM10 6.50024C10 6.2241 10.2239 6.00024 10.5 6.00024C10.7761 6.00024 11 6.2241 11 6.50024V13.0002C11 13.5525 11.4477 14.0002 12 14.0002C12.5523 14.0002 13 13.5525 13 13.0002V11.5002C13 11.2241 13.2239 11.0002 13.5 11.0002C13.7761 11.0002 14 11.2241 14 11.5002V13.0002C14 13.5525 14.4477 14.0002 15 14.0002C15.5523 14.0002 16 13.5525 16 13.0002V12.5002C16 12.2241 16.2239 12.0002 16.5 12.0002C16.7761 12.0002 17 12.2241 17 12.5002V13.0002C17 13.5525 17.4477 14.0002 18 14.0002C18.5523 14.0002 19 13.5525 19 13.0002C19 13.0002 19.2239 13.0002 19.5 13.0002C19.7761 13.0002 20 13.2241 20 13.5002V16.189C20 19.3985 17.3982 22.0002 14.1888 22.0002C12.154 22.0002 10.2266 21.0869 8.93808 19.512L4.24763 13.7793C3.88805 13.3398 4.15329 12.6764 4.71676 12.6059C4.9546 12.5762 5.19168 12.6665 5.34952 12.8469L7.89691 15.7582C8.62656 16.592 10 16.076 10 14.968V6.50024Z" fill="#ffffff"></path> <path d="M20 6.50024C20 7.32867 19.3284 8.00024 18.5 8.00024C17.6716 8.00024 17 7.32867 17 6.50024C17 5.67182 17.6716 5.00024 18.5 5.00024C19.3284 5.00024 20 5.67182 20 6.50024Z" fill="#ffffff"></path> <path d="M11.5 3.00024C12.3284 3.00024 13 2.32867 13 1.50024C13 0.671817 12.3284 0.000244141 11.5 0.000244141C10.6716 0.000244141 10 0.671817 10 1.50024C10 2.32867 10.6716 3.00024 11.5 3.00024Z" fill="#ffffff"></path> <path d="M4 8.00024C4.55228 8.00024 5 7.55253 5 7.00024C5 6.44796 4.55228 6.00024 4 6.00024C3.44772 6.00024 3 6.44796 3 7.00024C3 7.55253 3.44772 8.00024 4 8.00024Z" fill="#ffffff"></path> </g></svg>
                          </div>
                          <h5 className='font-semibold text-xl'>Manual Japa Counter</h5>
                        </div>
                        <p className='mt-5 text-gray-600'>For those who prefer a traditional, tactile experience, our intuitive manual counter allows you to keep track of your self-recited Japa. It’s perfect for use with your own mala beads or simply as a mindful way to log your counts.</p>
                      </div>
                      <div className="card w-full md:w-[49%] lg:w-[31%] border-t-primary border-t-4 border-gray-500/50 border shadow-md p-5 hover:shadow-xl transition-all duration-300 hover:scale-101 rounded-xl ">
                        <div className="card-top flex items-center gap-4">
                          <div className="icon bg-primary/70 w-15 h-15 p-3 rounded-xl shadow-xl">
                            <svg viewBox="0 0 64 64" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><polyline points="50.83 18.04 55.47 18.04 55.47 51.97 8.53 51.97 8.53 18.04 13.05 18.04" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></polyline><path d="M49.83,47V12c-13.57.44-17.89,6-17.89,6s-5.44-6.23-17.88-6V47a44.38,44.38,0,0,1,17.88,5S41.8,47.33,49.83,47Z" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path><line x1="31.94" y1="18.04" x2="31.94" y2="51.97" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></line></g></svg>
                          </div>
                          <h5 className='font-semibold text-xl'>A Library of Mantras</h5>
                        </div>
                        <p className='mt-5 text-gray-600'>Explore our extensive collection of powerful mantras and sacred texts. Whether you are seeking specific benefits, exploring different deities, or looking for daily inspiration, our library is a valuable resource for your study and practice.</p>
                      </div>
                    </div>
                  </>
                  : <>
                    <p>We respect the sanctity of Japa. Our tools are built with reverence, ensuring a peaceful, ad-free environment conducive to deep meditation and devotion. We are here to support your consistency and dedication to your personal spiritual goals.
                      Join us on this path of sound, silence, and self-realization. </p>
                  </>
              }
            </div>
          </div>

        </div>
      </section>
    </>
  )
}

export default About
