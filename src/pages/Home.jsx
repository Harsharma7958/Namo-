import React, { useEffect, useReducer, useRef, useState } from 'react'
import ProgressRing from '../components/ProgressRing';
import MovingStars from '../components/MovingStars'
import { useTheme } from '../store/ThemeContext';

const Home = () => {

    const [speech, setSpeech] = useState(new SpeechSynthesisUtterance());
    const [name, setName] = useState("राधा...")
    const [voices, setVoices] = useState([]);
    const [pause, setPause] = useState(true);
    const [count, setCount] = useState(0);
    const [malas, setMalas] = useState(
        localStorage.getItem('totalMalas') || 0
    );
    const [isLoading, setIsLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);

    const { themeToggle } = useTheme()

    const voiceSelectRef = useRef(null);

    useEffect(() => {
        if (voiceSelectRef.current) {
            window.speechSynthesis.onvoiceschanged = () => {
                setVoices(window.speechSynthesis.getVoices());
                if (voices.length > 0) {
                    speech.voice = voices.find(voice => voice.name === "Google हिन्दी" && voice.lang === "hi-IN");
                }
            }
        }
        return () => {
            window.speechSynthesis.onvoiceschanged = null
        };
    }, [])

    const handleVoice = () => {
        if (voiceSelectRef.current) {
            speech.voice = voices[voiceSelectRef.current.value];
        }
    }

    const handleName = (e) => {

        setName(e.target.value || "राधा...");

    }

    const handlePlaySpeech = () => {

        setIsLoading(true);

        let currentIteration = 0;
        const maxIteration = 108;

        setCount(0);

        const speakMantra = () => {
            if (!isPlaying) return;

            setIsLoading(true);

            if (currentIteration >= maxIteration) {
                setCount(0);
                setMalas(prev => {
                    const newVal = Number(prev) + 1;
                    localStorage.setItem('totalMalas', newVal);
                    setIsLoading(false);
                    return newVal;
                });
                return;
            };

            speech.text = name;
            // console.log(speech.text)
            speech.pitch = 0.8;
            speech.rate = 0.7
            speech.lang = 'hi-IN';
            // console.log(voices)
            speech.voice = voices.find(voice => voice.name === "Google हिन्दी" && voice.lang === "hi-IN");
            console.log(speech.voice)

            speech.onstart = () => {
                setIsLoading(false);
                currentIteration++;
                setCount(currentIteration);
            }

            speech.onend = () => {
                if (currentIteration < maxIteration) {
                    if (isPlaying) {
                        speakMantra();
                    }
                }
            }

            speech.onerror = () => setIsLoading(false);

            window.speechSynthesis.speak(speech);

        }

        window.speechSynthesis.cancel();
        speakMantra();
    }

    const handlePauseSpeech = () => {
        console.log('paused')
        window.speechSynthesis.pause();
        setIsPlaying(false);
        setPause(prev => !prev);
    }

    const handleResumeSpeech = () => {
        console.log('resume');
        window.speechSynthesis.resume();
        setPause(prev => !prev);
    }

    const handleReset = () => {
        setCount(0)
        window.speechSynthesis.cancel();
        setName('राधा...')
        setPause(true)
    }

    const randomeNumberGenerate = () => {
        console.log(Math.floor(Math.random() * 1000))
        return Math.floor(Math.random() * 1000);

    }

    return (
        <>
            <MovingStars />
            <section>
                <div className={`${themeToggle ? "" : 'dark'}  home-container min-h-full px-5 sm:px-10 md:px-20 py-3 md:py-6 bg-[radial-gradient(circle_at_center,#ffae42_0%,#ff4500_100%)] dark:bg-[linear-gradient(black)]`}>


                    <h1 className='text-center font-amita flex flex-col gap-1 md:gap-4 text-3xl sm:text-4xl md:text-6xl mt-22 md:mt-27'><span className='tracking-widest text-secondary-light dark:text-primary animate-pulse-glow'>Welcome to</span> <span className='text-light text-shadow-lg animate-pulse-glow2'>Namoजपं</span></h1>
                    <h2 className='text-center mt-2 font-semibold dark:text-white'>दिव्य मंत्रोच्चारण के माध्यम से आंतरिक शांति प्राप्त करें।</h2>
                    <p className='text-center dark:text-white'>ईश्वर के विभिन्न नामों का अन्वेषण करें, निर्देशित मंत्रोच्चार सत्रों में भाग लें और अपने ध्यान अभ्यास को गहरा करने के लिए उपकरणों का उपयोग करें।</p>

                    {/* Key Benefits */}
                    <section>
                        <div className="why-japam mt-5 flex flex-col items-center">
                            <h3 className='text-2xl sm:text-3xl md:text-4xl flex items-center '><span className='text-lg sm:text-xl md:text-2xl  '>🕉️</span> <span className='font-[Segoe_UI] font-bold bg-[linear-gradient(123deg,#030c23_60%,#fff)] dark:bg-[linear-gradient(123deg,gray_60%,#fff)] text-transparent bg-clip-text bg-position-[200%_auto] p-1'>Key Benefits?</span></h3>
                            <div className="benefits w-full flex justify-between gap-3 flex-wrap pt-5">
                                <div className="benefits-box relative overflow-hidden bg-red-500/30 w-full border-red-600 border-2 sm:w-[23%]  rounded-xl dark:text-white"><p className='p-4'>Reduces stress and promotes inner peace.</p></div>
                                <div className="benefits-box relative overflow-hidden bg-blue-500/30 w-full border-blue-500 border-2 sm:w-[23%]  rounded-xl dark:text-white"><p className='p-4'>Enhances concentration and mental clarity.</p></div>
                                <div className="benefits-box relative overflow-hidden bg-green-500/30 w-full border-green-500 border-2 sm:w-[23%] rounded-xl dark:text-white"><p className='p-4'>Strengthens the connection with the Divine.</p></div>
                                <div className="benefits-box relative overflow-hidden bg-yellow-300/30 w-full border-yellow-300 border-2 sm:w-[23%] rounded-xl dark:text-white"><p className='p-4'>Purifies the mind and heart.</p></div>
                            </div>
                        </div>
                    </section>

                    <section className='main flex flex-col items-center my-10 '>
                        <select onChange={handleName} name="bhagvanName" id="bhagvanName" className=' z-0 cursor-pointer mb-5 outline-none dark:bg-light/30 dark:text-primary bg-red-800/10 text-light font-bold px-7 py-2 text-center appearance-none text-lg bg-[url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%23ffffff%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E)] bg-no-repeat bg-position-[right_3px_center] bg-size-[2rem] rounded-full border-light border' defaultValue={"राधा"}>
                            {['राधा', 'राम', 'शिव', 'कृष्ण', 'श्याम', 'हरि', 'जय माता दी'].map((name, i) => {
                                return (
                                    <option className='bg-orange-500 font-bold text-light' key={i} value={`${name}...`}>{name}</option>
                                )
                            })}

                        </select>

                        <div className='circle-outer border-primary dark:border-light border-3 w-[90%] md:w-[80%] lg:w-1/2 bg-red-800/20 dark:bg-light/30 rounded-4xl shadow-[0px_0px_10px] lg:shadow-none lg:hover:shadow-[0px_0px_20px] dark:shadow-white dark:shadow-[0px_0px_20px] dark:lg:shadow-none dark:lg:hover:shadow-[0px_0px_20px] flex flex-col items-center justify-between px-3 lg:px-10 py-10 transition-all duration-500 z-0'>
                            <ProgressRing count={count} />

                            <div className="total-malas my-5 text-lg text-secondary dark:text-black">
                                Total Malas: {malas}
                            </div>

                            <div className="btns flex items-center gap-5 transition-all duration-500">

                                <button className='bg-secondary-light text-light px-6 py-2 rounded-full font-bold tracking-wider shadow-[0px_0px_10px_5px] md:hover:-translate-y-1.5 transition-all duration-500 shadow-light dark:shadow-black dark:bg-primary dark:text-secondary-light cursor-pointer' onClick={() => { count > 0 ? handleReset() : handlePlaySpeech() }}>{pause ? isLoading ? "Loading..." : count > 0 ? "Reset" : "Play Now" : count > 0 ? "Reset" : "Play Now"}</button>

                                {count > 0 ? <button className='bg-secondary-light text-light px-6 py-2 rounded-full font-bold tracking-wider transition-all duration-500 shadow-[0px_0px_10px_5px] md:hover:-translate-y-1.5  shadow-light dark:shadow-black dark:bg-primary dark:text-secondary-light cursor-pointer' onClick={() => { pause ? handlePauseSpeech() : handleResumeSpeech() }}>{pause ? 'Pause' : "resume"}</button> : ""}
                            </div>
                        </div>

                        <select ref={voiceSelectRef} onChange={handleVoice} hidden></select>


                    </section>
                </div>
            </section>
        </>
    )
}

export default Home
