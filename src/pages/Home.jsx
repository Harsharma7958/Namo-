import React, { useEffect, useReducer, useRef, useState } from 'react'

const Home = () => {

    const [speech, useSpeech] = useState(new SpeechSynthesisUtterance());
    let voices = [];

    const handleSpeech = () => {

        speech.text = "राधा...";
        speech.pitch = 0.8;
        speech.rate = 0.7
        speech.voice = voices[12];

        window.speechSynthesis.speak(speech);

    }

    // let voiceSelect = document.querySelector(".have")

    const voiceSelectRef = useRef(null);

    useEffect(() => {
        if (voiceSelectRef.current) {
            window.speechSynthesis.onvoiceschanged = () => {
                voices = window.speechSynthesis.getVoices();
                if (voices.length > 0) {
                    speech.voice = voices[12];
                }
            }
        }

        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, [])


    const handleVoice = () => {
        if (voiceSelectRef.current) {
            speech.voice = voices[voiceSelectRef.current.value];
        }
    }

    return (
        <>
            <section>
                <div className='home-container min-h-full'>
                    <select ref={voiceSelectRef} onChange={handleVoice} hidden></select>
                    <button onClick={handleSpeech}>Play now</button>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. In ea eveniet soluta quia cum, eos aspernatur sapiente doloremque ducimus error saepe alias, dolorem velit corrupti, natus autem! Recusandae libero, debitis fuga quidem possimus eos facere impedit modi cumque temporibus corporis vel aliquam quos quam provident tempore. Obcaecati, magnam minus ut rerum, temporibus eos magni similique tempore aliquam enim esse accusantium. Quisquam quia odio pariatur debitis iste. Dolorem error, ullam nulla expedita soluta, in repellat deserunt blanditiis labore voluptatem dignissimos. Quisquam consectetur iure eveniet eum repellendus, at aspernatur perferendis assumenda non, alias necessitatibus provident deleniti odio veritatis cum minima eligendi. Omnis perspiciatis, reprehenderit labore molestiae veniam aliquid maxime hic quis adipisci voluptatibus, aut architecto incidunt eum, quia sed iure consequuntur cumque deleniti. Accusamus culpa odio consequatur numquam corporis voluptates repellendus sit eum eligendi aliquid maxime assumenda, doloribus tempore quae doloremque, sapiente magnam consequuntur! Nesciunt sint sequi sunt. Optio at molestiae eveniet dolores velit iste vel? Mollitia tempora, eligendi sequi labore magnam voluptate minus ad. Eos facere, dolore saepe optio quasi voluptates laudantium. Alias in quasi repellat vero ad libero maxime expedita explicabo accusamus eligendi perspiciatis laudantium quos optio a nemo debitis iste animi, accusantium dolorem. Assumenda dolorem velit vitae? Soluta aliquam quis voluptate commodi? Vero, assumenda, nemo magnam ad labore architecto odio earum hic temporibus delectus eos optio eligendi nostrum veniam? Dolorum dolores, animi cum quibusdam excepturi tempore et mollitia totam debitis, impedit nam voluptates natus magnam! Eveniet cum distinctio dolorem, animi error libero molestias sunt, voluptas nesciunt culpa laborum voluptatibus sequi dolor ipsam hic sed. Ex, saepe amet suscipit nam accusantium, quaerat molestiae iste deleniti ipsam veritatis quo, voluptatem provident? Dolor, velit doloribus obcaecati quisquam id culpa odio commodi repudiandae voluptatum dolorem iure animi dolorum! Dolor, perferendis laborum quos aut sunt, sapiente molestiae distinctio in nemo culpa reiciendis animi autem quisquam quae ipsam consequuntur, mollitia qui accusamus adipisci esse suscipit tempore sequi quaerat quibusdam? Quia saepe doloremque tempora voluptates in repellat a quae! Cumque quas veritatis cupiditate officiis, vitae ab laborum! Accusamus quibusdam neque praesentium commodi laudantium debitis magni, fuga mollitia, repellendus soluta vero quia laboriosam hic rerum! Debitis corrupti harum libero? Eius ratione accusantium, blanditiis eaque nihil obcaecati deleniti dolores pariatur dolore quo voluptas veritatis. Nisi necessitatibus iure doloribus quod dicta nihil omnis maxime, perspiciatis quaerat quisquam libero architecto corrupti optio vel ipsa incidunt neque aspernatur officiis adipisci. Omnis quas velit molestiae odio, doloribus natus expedita deserunt, voluptatibus quidem animi a hic nulla tenetur laborum repudiandae incidunt porro similique. Neque inventore veritatis, repellendus cum, ipsam doloremque porro esse tempore eaque, sequi qui? Sapiente eos odit, voluptate illum quidem ratione cumque distinctio. Cumque perferendis consequuntur magni optio ratione assumenda odit eos cupiditate totam quidem similique molestias velit, sapiente rerum in qui? Magni quod atque accusamus aliquid ea magnam doloribus sapiente quaerat neque ex inventore deleniti voluptate nam sint fuga voluptatem voluptatum quis corrupti est iure, earum alias! Eligendi laudantium maxime impedit alias magnam a illo placeat. Facilis, eos ipsam, accusantium in accusamus sequi suscipit magnam repellendus animi consectetur expedita earum.</p>
                </div>
            </section>
        </>
    )
}

export default Home
