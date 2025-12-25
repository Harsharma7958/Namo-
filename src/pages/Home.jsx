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
                <div className={`${themeToggle ? "" : 'dark'}  home-container min-h-full px-5 sm:px-10 md:px-20 py-3 md:py-6 bg-[radial-gradient(circle_at_center,#ffae42_0%,#ff4500_100%)] dark:bg-[linear-gradient(black)] `}>


                    <h1 className='text-center font-amita flex flex-col gap-1 md:gap-4 text-3xl sm:text-4xl md:text-6xl mt-22 md:mt-27'><span className='tracking-widest text-secondary-light dark:text-primary animate-pulse-glow'>Welcome to</span> <span className='text-light text-shadow-lg animate-pulse-glow2'>Namoजपं</span></h1>
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

                                <button className='bg-secondary-light text-light px-6 py-2 rounded-full font-bold tracking-wider shadow-[0px_0px_10px_5px] hover:-translate-y-1.5 transition-all duration-500 shadow-light dark:shadow-black dark:bg-primary dark:text-secondary-light cursor-pointer' onClick={() => { count > 0 ? handleReset() : handlePlaySpeech() }}>{pause ? isLoading ? "Loading..." : count > 0 ? "Reset" : "Play Now" : count > 0 ? "Reset" : "Play Now"}</button>

                                {count > 0 ? <button className='bg-secondary-light text-light px-6 py-2 rounded-full font-bold tracking-wider transition-all duration-500 shadow-[0px_0px_10px_5px] hover:-translate-y-1.5  shadow-light dark:shadow-black dark:bg-primary dark:text-secondary-light cursor-pointer' onClick={() => { pause ? handlePauseSpeech() : handleResumeSpeech() }}>{pause ? 'Pause' : "resume"}</button> : ""}
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
