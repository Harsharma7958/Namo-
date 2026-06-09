import React, { useEffect, useReducer, useRef, useState } from 'react'
import ProgressRing from '../components/ProgressRing';
import { useTheme } from '../store/ThemeContext';
import SpaceBackground from '../components/MovingStars';

// ─── Floating particles ───────────────────────────────────────────────
const Particles = React.memo(() => {
    // This array generates ONCE when the component mounts
    const particles = Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        animDelay: `${Math.random() * 8}s`,
        animDur: `${6 + Math.random() * 8}s`,
        size: Math.random() > 0.5 ? 4 : 6,
        opacity: 0.2 + Math.random() * 0.4,
    }));

    return (
        <>
            <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: var(--op); }
          50% { transform: translateY(-60px) scale(1.2); opacity: calc(var(--op) * 1.5); }
          100% { transform: translateY(-120px) scale(0.5); opacity: 0; }
        }
        @keyframes sway { 0%,100% { margin-left: 0 } 50% { margin-left: 12px } }
      `}</style>
            {particles.map(p => (
                <div key={p.id} style={{
                    position: 'absolute', bottom: '0%', left: p.left,
                    width: `${p.size}px`, height: `${p.size}px`, borderRadius: '50%',
                    background: '#FFD700',
                    '--op': p.opacity,
                    animation: `floatUp ${p.animDur} ${p.animDelay} infinite ease-in-out, sway 3s ${p.animDelay} infinite ease-in-out`,
                    pointerEvents: 'none',
                }} />
            ))}
        </>
    );
});

const Home = () => {

    const [speech, setSpeech] = useState(new SpeechSynthesisUtterance());
    const [name, setName] = useState("राधा...")
    const [voices, setVoices] = useState([]);
    const [pause, setPause] = useState(true);
    const [count, setCount] = useState(0);
    const [malas, setMalas] = useState(0);
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

            // if (currentIteration >= maxIteration) {
            //     setCount(0);
            //     setMalas(prev => {
            //         const newVal = Number(prev) + 1;
            //         // localStorage.setItem('totalMalas', newVal);
            //         // setIsLoading(false);
            //         return newVal;
            //     });
            //     return;
            // };

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
                } else {
                    setCount(0)
                    window.speechSynthesis.cancel();
                    setName('राधा...')
                    setPause(true)
                    setMalas(prev => {
                        const newVal = Number(prev) + 1;
                        return newVal;
                    })
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

    const benefitCards = [
        { icon: '🕊️', label: 'Inner Peace', desc: 'Dissolves stress, stills the mind', color: 'rgba(255,100,50,0.25)', border: 'rgba(255,120,60,0.5)' },
        { icon: '🔮', label: 'Clarity', desc: 'Sharpens focus and awareness', color: 'rgba(100,100,255,0.2)', border: 'rgba(130,130,255,0.45)' },
        { icon: '🌿', label: 'Divine Bond', desc: 'Deepens spiritual connection', color: 'rgba(50,180,80,0.2)', border: 'rgba(80,200,100,0.45)' },
        { icon: '✨', label: 'Purification', desc: 'Cleanses mind, heart, and soul', color: 'rgba(255,215,0,0.18)', border: 'rgba(255,215,0,0.5)' },
    ];





    return (
        <>
            {/* <SpaceBackground /> */}
            <section className='z-10'>
                <div className={`${themeToggle ? "" : 'dark'}  home-container min-h-full px-5 sm:px-10 md:px-20 py-3 md:py-6 bg-[linear-gradient(160deg,#7B1F00_0%,#C84B00_35%,#E8761A_65%,#FFB347_100%)] dark:bg-[linear-gradient(black)]`}>


                    <h1 className='text-center font-amita flex flex-col gap-1 md:gap-4 text-3xl sm:text-4xl md:text-6xl mt-22 md:mt-27'><span className='tracking-widest text-secondary-light dark:text-primary animate-pulse-glow text-2xl'>Welcome to</span> <span className='text-gold text-shadow-textgoldshadow animate-pulse-glow2'>Namoजपं</span></h1>
                    <h2 className='text-center my-2 font-semibold text-white'>दिव्य मंत्रोच्चारण के माध्यम से आंतरिक शांति प्राप्त करें।</h2>
                    <p className='text-center text-white'>ईश्वर के विभिन्न नामों का अन्वेषण करें और अपने ध्यान अभ्यास को गहरा करें</p>


                    <section className='main flex flex-col items-center my-10 relative  '>
                        <select onChange={handleName} name="bhagvanName" id="bhagvanName" disabled={count > 0} className={`${count > 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}z-0 cursor-pointer mb-5 outline-none dark:bg-light/30 dark:text-primary bg-orange-400/50 text-gold text-shadow-textgoldshadow shadow-boxgoldshadow animate-[pulse-glow_3s_ease-in-out_infinite] font-bold px-7 py-2 text-center appearance-none text-lg bg-[url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%23FFD700%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E)] bg-no-repeat bg-position-[right_3px_center] bg-size-[2rem] rounded-full border-primary border-2`} defaultValue={"राधा"}>
                            {['राधा', 'राम', 'शिव', 'कृष्ण', 'श्याम', 'हरि', 'जय माता दी'].map((name, i) => {
                                return (
                                    <option className='bg-orange-500 font-bold text-light' key={i} value={`${name}...`}>{name}</option>
                                )
                            })}

                        </select>

                        <div className='circle-outer border-primary dark:border-light border-3 w-[90%] md:w-[80%] lg:w-1/2 bg-red-800/20 dark:bg-light/30 rounded-4xl shadow-[0px_0px_10px] lg:shadow-none lg:hover:shadow-[0px_0px_20px] dark:shadow-white dark:shadow-[0px_0px_20px] dark:lg:shadow-none dark:lg:hover:shadow-[0px_0px_20px] flex flex-col items-center justify-between px-3 lg:px-10 py-10 transition-all duration-500 z-0'>
                            <div className='mb-5 px-5 py-3 text-gold text-shadow-textgoldshadow font-bold text-xl'>
                                <p>{name.slice(0,name.length-3)}</p>
                            </div>
                            <ProgressRing count={count} />

                            <div className="total-malas my-10 text-lg text-gold text-shadow-textgoldshadow shadow-boxgoldshadow animate-[pulse-glow_3s_ease-in-out_infinite] text-shadow-goldshadow dark:text-black border-primary p-2 rounded-full bg-yellow-300/20">
                                <span>📿</span>
                                Total Malas: {malas}
                            </div>

                            <div className="btns flex items-center gap-5 transition-all duration-500">

                                <button className='bg-secondary text-light px-6 py-2 rounded-full font-bold tracking-wider shadow-[0px_0px_10px_5px] md:hover:-translate-y-1.5 transition-all duration-500 shadow-light dark:shadow-black dark:bg-primary dark:text-secondary-light cursor-pointer' onClick={() => { count > 0 ? handleReset() : handlePlaySpeech() }}>{pause ? isLoading ? "Loading..." : count > 0 ? "Reset" : "BEGIN JAPA" : count > 0 ? "Reset" : "BEGIN JAPA"}</button>

                                {count > 0 && count <= 108 ? <button className='bg-secondary-light text-light px-6 py-2 rounded-full font-bold tracking-wider transition-all duration-500 shadow-[0px_0px_10px_5px] md:hover:-translate-y-1.5  shadow-light dark:shadow-black dark:bg-primary dark:text-secondary-light cursor-pointer' onClick={() => { pause ? handlePauseSpeech() : handleResumeSpeech() }}>{pause ? 'Pause' : "resume"}</button> : ""}
                            </div>
                        </div>

                        <select ref={voiceSelectRef} onChange={handleVoice} hidden></select>

                        <Particles />

                    </section>
                    {/* Key Benefits */}
                    <section>
                        <div className="why-japam mt-16 mb-10 flex flex-col items-center">
                            <div className="flex w-full items-center justify-between">
                                <div className="h-0.5 w-full bg-[linear-gradient(to_right,transparent,rgb(13_71_21/0.7))]" />
                                <h3 className="ml-5 mr-5 text-xl font-serif uppercase tracking-widest text-secondary sm:text-2xl md:text-3xl whitespace-nowrap">
                                    Key benefits
                                </h3>
                                <div className="h-0.5 w-full bg-[linear-gradient(to_left,transparent,rgb(13_71_21/0.7))]" />
                            </div>

                            <div className="benefits w-full flex justify-between gap-3 flex-wrap mt-10">
                                {benefitCards.map((v, i) => (
                                    <div key={i} style={{ background: v.color, border: `1px solid ${v.border}` }} className={`benefits-box p-5 relative overflow-hidden w-full sm:w-[23%] rounded-xl dark:text-white flex flex-col items-center`}>
                                        <span className='text-4xl animate-pulse-glow' >{v.icon}</span>
                                        <h3 className='mt-3 font-semibold uppercase font-serif tracking-widest'>{v.label}</h3>
                                        <p className='text-[14px] text-center'>{v.desc}</p>
                                    </div>
                                )
                                )}

                            </div>
                        </div>
                    </section>

                    {/* Divider */}
                    <section>
                        <div className="why-japam mt-10 mb-10 flex flex-col items-center">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '40px 0 0', width: '100%' }}>
                                <div className="h-0.5 w-full bg-[linear-gradient(to_right,transparent,rgb(13_71_21/0.7))]" />
                                <span style={{ fontSize: 16 }}>🙏</span>
                                <div className="h-0.5 w-full bg-[linear-gradient(to_left,transparent,rgb(13_71_21/0.7))]" />
                            </div>

                            <p style={{
                                color: 'rgba(255,220,130)',
                                fontSize: 12,
                                marginTop: 14,
                                letterSpacing: 1,
                                textAlign: 'center',
                            }}>
                                हरे राम हरे राम, राम राम हरे हरे ॥ हरे कृष्ण हरे कृष्ण, कृष्ण कृष्ण हरे हरे ॥
                            </p>
                        </div>
                    </section>

                </div >
            </section >
        </>
    )
}

export default Home
