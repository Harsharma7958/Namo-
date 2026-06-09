import React, { useEffect, useRef, useState } from 'react'

// ─── Inline ProgressRing (replaces import) ───────────────────────────
const ProgressRing = ({ count }) => {
  const total = 108;
  const r = 70;
  const cx = 90;
  const cy = 90;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (count / total) * circumference;
  const pct = Math.round((count / total) * 100);

  return (
    <div style={{ position: 'relative', width: 180, height: 180 }}>
      <svg width="180" height="180" viewBox="0 0 180 180">
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FF6B00" />
          </linearGradient>
          <filter id="glowRing">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* Track */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,200,50,0.15)" strokeWidth="10" />
        {/* Progress */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
          filter="url(#glowRing)"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
        {/* Dot marker */}
        {count > 0 && (() => {
          const angle = ((count / total) * 360 - 90) * (Math.PI / 180);
          const dx = cx + r * Math.cos(angle);
          const dy = cy + r * Math.sin(angle);
          return <circle cx={dx} cy={dy} r={6} fill="#FFD700" filter="url(#glowRing)" />;
        })()}
      </svg>
      {/* Center count */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center'
      }}>
        <span style={{ fontFamily: "'Cinzel', serif", fontSize: 36, fontWeight: 700, color: '#FFD700', lineHeight: 1, textShadow: '0 0 20px rgba(255,215,0,0.6)' }}>{count}</span>
        <span style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color: 'rgba(255,220,100,0.7)', letterSpacing: 3, textTransform: 'uppercase' }}>of 108</span>
        {pct > 0 && <span style={{ fontFamily: "'Cinzel', serif", fontSize: 10, color: 'rgba(255,200,80,0.5)', marginTop: 2 }}>{pct}%</span>}
      </div>
    </div>
  );
};

// ─── Mandala / lotus SVG background ──────────────────────────────────
const MandalaBg = () => (
  <svg
    viewBox="0 0 600 600"
    style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%) rotate(0deg)', width: '110%', height: '110%', opacity: 0.04, pointerEvents: 'none' }}
  >
    {Array.from({ length: 12 }).map((_, i) => (
      <g key={i} transform={`rotate(${i * 30} 300 300)`}>
        <ellipse cx="300" cy="160" rx="18" ry="55" fill="#FFD700" />
        <ellipse cx="300" cy="210" rx="10" ry="35" fill="#FF8C00" />
      </g>
    ))}
    {Array.from({ length: 8 }).map((_, i) => (
      <g key={i + 20} transform={`rotate(${i * 45} 300 300)`}>
        <ellipse cx="300" cy="110" rx="12" ry="40" fill="#FFD700" opacity="0.6" />
      </g>
    ))}
    <circle cx="300" cy="300" r="240" fill="none" stroke="#FFD700" strokeWidth="1" />
    <circle cx="300" cy="300" r="200" fill="none" stroke="#FF8C00" strokeWidth="0.5" />
    <circle cx="300" cy="300" r="160" fill="none" stroke="#FFD700" strokeWidth="1" />
    <circle cx="300" cy="300" r="80" fill="none" stroke="#FFD700" strokeWidth="0.5" />
    <circle cx="300" cy="300" r="40" fill="rgba(255,215,0,0.3)" />
  </svg>
);

// ─── Floating particles ───────────────────────────────────────────────
const Particles = () => {
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
          position: 'absolute', bottom: '10%', left: p.left,
          width: p.size, height: p.size, borderRadius: '50%',
          background: '#FFD700',
          '--op': p.opacity,
          animation: `floatUp ${p.animDur} ${p.animDelay} infinite ease-in-out, sway 3s ${p.animDelay} infinite ease-in-out`,
          pointerEvents: 'none',
        }} />
      ))}
    </>
  );
};

// ─── Main Home component ──────────────────────────────────────────────
const Home = () => {
  const [speech] = useState(new SpeechSynthesisUtterance());
  const [name, setName] = useState('राधा...');
  const [voices, setVoices] = useState([]);
  const [pause, setPause] = useState(true);
  const [count, setCount] = useState(0);
  const [malas, setMalas] = useState(() => Number(localStorage.getItem('totalMalas') || 0));
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [dark, setDark] = useState(false);
  const [ripple, setRipple] = useState(false);
  const voiceSelectRef = useRef(null);

  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      setVoices(window.speechSynthesis.getVoices());
    };
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  const handleName = (e) => setName(e.target.value || 'राधा...');

  const handlePlaySpeech = () => {
    setIsLoading(true);
    setRipple(true);
    setTimeout(() => setRipple(false), 600);
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
      }
      speech.text = name;
      speech.pitch = 0.8;
      speech.rate = 0.7;
      speech.lang = 'hi-IN';
      speech.voice = voices.find(v => v.name === 'Google हिन्दी' && v.lang === 'hi-IN') || null;
      speech.onstart = () => { setIsLoading(false); currentIteration++; setCount(currentIteration); };
      speech.onend = () => { if (currentIteration < maxIteration && isPlaying) speakMantra(); };
      speech.onerror = () => setIsLoading(false);
      window.speechSynthesis.speak(speech);
    };
    window.speechSynthesis.cancel();
    speakMantra();
  };

  const handlePauseSpeech = () => {
    window.speechSynthesis.pause();
    setIsPlaying(false);
    setPause(false);
  };
  const handleResumeSpeech = () => {
    window.speechSynthesis.resume();
    setPause(true);
  };
  const handleReset = () => {
    setCount(0);
    window.speechSynthesis.cancel();
    setName('राधा...');
    setPause(true);
    setIsPlaying(true);
  };

  // ─── Design tokens ────────────────────────────────────────────────
  const bg = dark
    ? 'linear-gradient(160deg, #0a0500 0%, #1a0800 40%, #0d0300 100%)'
    : 'linear-gradient(160deg, #7B1F00 0%, #C84B00 35%, #E8761A 65%, #FFB347 100%)';

  const cardBg = dark
    ? 'rgba(60,20,0,0.55)'
    : 'rgba(255,255,255,0.12)';

  const textPrimary = '#FFF8E7';
  const textGold = '#FFD700';
  const textSaffron = '#FF9933';
  const borderGold = 'rgba(255,215,0,0.35)';

  const benefitCards = [
    { icon: '🕊️', label: 'Inner Peace', desc: 'Dissolves stress, stills the mind', color: 'rgba(255,100,50,0.25)', border: 'rgba(255,120,60,0.5)' },
    { icon: '🔮', label: 'Clarity', desc: 'Sharpens focus and awareness', color: 'rgba(100,100,255,0.2)', border: 'rgba(130,130,255,0.45)' },
    { icon: '🌿', label: 'Divine Bond', desc: 'Deepens spiritual connection', color: 'rgba(50,180,80,0.2)', border: 'rgba(80,200,100,0.45)' },
    { icon: '✨', label: 'Purification', desc: 'Cleanses mind, heart, and soul', color: 'rgba(255,215,0,0.18)', border: 'rgba(255,215,0,0.5)' },
  ];

  const names = ['राधा', 'राम', 'शिव', 'कृष्ण', 'श्याम', 'हरि', 'जय माता दी'];

  const btnStyle = (accent = textGold) => ({
    background: `linear-gradient(135deg, ${accent}22, ${accent}44)`,
    border: `1.5px solid ${accent}88`,
    color: accent,
    padding: '12px 28px',
    borderRadius: 50,
    fontFamily: "'Cinzel', serif",
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: 1.5,
    cursor: 'pointer',
    backdropFilter: 'blur(8px)',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    boxShadow: `0 0 18px ${accent}33`,
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Tiro+Devanagari+Sanskrit:ital@0;1&display=swap');

        .home-root * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes pulse-glow {
          0%, 100% { text-shadow: 0 0 10px rgba(255,215,0,0.4); }
          50% { text-shadow: 0 0 30px rgba(255,215,0,0.9), 0 0 60px rgba(255,150,0,0.5); }
        }
        @keyframes omRotate {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.08); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes divya-enter {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes rippleOut {
          0% { transform: scale(0.9); opacity: 0.8; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes borderGlow {
          0%,100% { box-shadow: 0 0 15px rgba(255,215,0,0.2), inset 0 0 15px rgba(255,150,0,0.05); }
          50% { box-shadow: 0 0 40px rgba(255,215,0,0.5), inset 0 0 30px rgba(255,150,0,0.1); }
        }

        .benefit-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .benefit-card:hover { transform: translateY(-5px) scale(1.03); }
        .god-btn:hover { transform: scale(1.06); box-shadow: 0 0 30px rgba(255,215,0,0.5) !important; }
        .action-btn:hover { transform: translateY(-3px); box-shadow: 0 4px 30px rgba(255,215,0,0.5) !important; }
        .action-btn:active { transform: scale(0.96); }
        .select-name {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23FFD700' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 1.5rem;
          padding-right: 40px;
        }
        .select-name option { background: #3B1500; color: #FFD700; }
      `}</style>

      <div
        className="home-root"
        style={{ minHeight: '100vh', background: bg, fontFamily: "'Cinzel', serif", position: 'relative', overflow: 'hidden' }}
      >
        {/* Background mandala */}
        <MandalaBg />
        <Particles />

        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px 24px', position: 'relative', zIndex: 10 }}>
          <button
            onClick={() => setDark(d => !d)}
            style={{ ...btnStyle('rgba(255,215,0,0.8)'), padding: '8px 18px', fontSize: 12 }}
            className="action-btn"
          >
            {dark ? '☀ Light' : '☽ Dark'}
          </button>
        </div>

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', padding: '10px 20px 0', position: 'relative', zIndex: 5, animation: 'divya-enter 1s ease both' }}>

          {/* Om symbol */}
          <div style={{
            fontSize: 52,
            animation: 'omRotate 12s linear infinite',
            display: 'inline-block',
            marginBottom: 8,
            filter: 'drop-shadow(0 0 12px rgba(255,215,0,0.8))',
          }}>🕉️</div>

          {/* Welcome text */}
          <p style={{ color: textSaffron, letterSpacing: 6, fontSize: 12, fontWeight: 400, textTransform: 'uppercase', marginBottom: 6, opacity: 0.85 }}>
            Welcome to
          </p>

          {/* Brand name */}
          <h1 style={{
            fontSize: 'clamp(38px, 8vw, 72px)',
            fontWeight: 700,
            background: `linear-gradient(135deg, #FFD700 0%, #FFA500 40%, #FFD700 70%, #FFFACD 100%)`,
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmer 4s linear infinite, pulse-glow 3s ease-in-out infinite',
            lineHeight: 1.1,
            marginBottom: 12,
            letterSpacing: 2,
          }}>
            Namoजपं
          </h1>

          {/* Sanskrit tagline */}
          <h2 style={{
            fontFamily: "'Tiro Devanagari Sanskrit', serif",
            fontSize: 'clamp(13px, 2.5vw, 16px)',
            color: 'rgba(255,248,231,0.85)',
            fontWeight: 400,
            marginBottom: 6,
            textShadow: '0 1px 8px rgba(0,0,0,0.4)',
            animation: 'divya-enter 1s 0.3s ease both',
          }}>
            दिव्य मंत्रोच्चारण के माध्यम से आंतरिक शांति प्राप्त करें
          </h2>
          <p style={{
            fontFamily: "'Tiro Devanagari Sanskrit', serif",
            fontSize: 'clamp(11px, 2vw, 13px)',
            color: 'rgba(255,220,150,0.65)',
            maxWidth: 560,
            margin: '0 auto',
            lineHeight: 1.7,
            animation: 'divya-enter 1s 0.5s ease both',
          }}>
            ईश्वर के विभिन्न नामों का अन्वेषण करें और अपने ध्यान अभ्यास को गहरा करें
          </p>
        </div>

        {/* ── Benefits ──────────────────────────────────────────────── */}
        <section style={{
          maxWidth: 900,
          margin: '36px auto 0',
          padding: '0 20px',
          position: 'relative',
          zIndex: 5,
          animation: 'divya-enter 1s 0.4s ease both',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ height: 1, flex: 1, background: 'linear-gradient(to right, transparent, rgba(255,215,0,0.4))' }} />
            <span style={{ fontFamily: "'Cinzel', serif", color: textGold, fontSize: 13, letterSpacing: 4, textTransform: 'uppercase' }}>Key Benefits</span>
            <div style={{ height: 1, flex: 1, background: 'linear-gradient(to left, transparent, rgba(255,215,0,0.4))' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
            {benefitCards.map((b, i) => (
              <div key={i} className="benefit-card" style={{
                background: b.color,
                border: `1px solid ${b.border}`,
                borderRadius: 16,
                padding: '18px 16px',
                backdropFilter: 'blur(12px)',
                textAlign: 'center',
                animation: `divya-enter 0.8s ${0.1 * i + 0.6}s ease both`,
              }}>
                <div style={{ fontSize: 28, marginBottom: 8, animation: 'float 4s ease-in-out infinite', animationDelay: `${i * 0.5}s` }}>{b.icon}</div>
                <div style={{ fontFamily: "'Cinzel', serif", color: textGold, fontWeight: 700, fontSize: 13, letterSpacing: 1, marginBottom: 4 }}>{b.label}</div>
                <div style={{ color: 'rgba(255,240,200,0.7)', fontSize: 12, lineHeight: 1.5 }}>{b.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Main Japa Section ─────────────────────────────────────── */}
        <section style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '40px 20px 60px',
          position: 'relative',
          zIndex: 5,
        }}>

          {/* God name selector */}
          <div style={{ marginBottom: 28, animation: 'divya-enter 1s 0.8s ease both' }}>
            <p style={{ color: 'rgba(255,220,130,0.65)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', textAlign: 'center', marginBottom: 10 }}>
              Choose Your Deity
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              {names.map((n, i) => (
                <button
                  key={i}
                  className="god-btn action-btn"
                  onClick={() => setName(`${n}...`)}
                  style={{
                    background: name === `${n}...`
                      ? `linear-gradient(135deg, #FFD700, #FF6B00)`
                      : 'rgba(255,215,0,0.08)',
                    border: `1px solid ${name === `${n}...` ? '#FFD700' : 'rgba(255,215,0,0.3)'}`,
                    color: name === `${n}...` ? '#1a0500' : textGold,
                    padding: '8px 18px',
                    borderRadius: 50,
                    fontFamily: "'Tiro Devanagari Sanskrit', serif",
                    fontSize: 15,
                    cursor: 'pointer',
                    fontWeight: name === `${n}...` ? 700 : 400,
                    backdropFilter: 'blur(8px)',
                    transition: 'all 0.25s ease',
                    boxShadow: name === `${n}...` ? '0 0 20px rgba(255,215,0,0.5)' : 'none',
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Main Japa Card */}
          <div style={{
            width: '100%',
            maxWidth: 440,
            background: cardBg,
            border: `1.5px solid ${borderGold}`,
            borderRadius: 28,
            padding: '36px 28px',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
            position: 'relative',
            overflow: 'hidden',
            animation: 'borderGlow 4s ease-in-out infinite, divya-enter 1s 1s ease both',
          }}>

            {/* Corner decorations */}
            {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(pos => (
              <div key={pos} style={{
                position: 'absolute',
                ...(pos.includes('top') ? { top: 12 } : { bottom: 12 }),
                ...(pos.includes('left') ? { left: 12 } : { right: 12 }),
                width: 20,
                height: 20,
                borderTop: pos.includes('top') ? `2px solid ${textGold}` : 'none',
                borderBottom: pos.includes('bottom') ? `2px solid ${textGold}` : 'none',
                borderLeft: pos.includes('left') ? `2px solid ${textGold}` : 'none',
                borderRight: pos.includes('right') ? `2px solid ${textGold}` : 'none',
                opacity: 0.5,
              }} />
            ))}

            {/* Current mantra display */}
            <div style={{
              fontFamily: "'Tiro Devanagari Sanskrit', serif",
              fontSize: 28,
              color: textGold,
              textShadow: '0 0 20px rgba(255,215,0,0.6)',
              animation: 'pulse-glow 3s ease-in-out infinite',
              letterSpacing: 2,
            }}>
              {name.replace('...', '')}
            </div>

            {/* Progress ring */}
            <div style={{ position: 'relative' }}>
              <ProgressRing count={count} />
              {/* Ripple on play */}
              {ripple && (
                <div style={{
                  position: 'absolute', inset: -10,
                  borderRadius: '50%',
                  border: '3px solid rgba(255,215,0,0.6)',
                  animation: 'rippleOut 0.6s ease-out forwards',
                }} />
              )}
            </div>

            {/* Mala count */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: 'rgba(255,215,0,0.08)',
              border: `1px solid rgba(255,215,0,0.2)`,
              borderRadius: 50,
              padding: '10px 24px',
            }}>
              <span style={{ fontSize: 18 }}>📿</span>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'rgba(255,220,130,0.6)', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 2 }}>Total Malas</div>
                <div style={{ color: textGold, fontSize: 24, fontWeight: 700, lineHeight: 1, textShadow: '0 0 12px rgba(255,215,0,0.5)' }}>{malas}</div>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                className="action-btn"
                onClick={() => count > 0 ? handleReset() : handlePlaySpeech()}
                style={{
                  ...btnStyle(count > 0 ? '#FF6B6B' : textGold),
                  minWidth: 130,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {isLoading ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', border: '2px solid currentColor', borderTopColor: 'transparent', display: 'inline-block', animation: 'omRotate 0.8s linear infinite' }} />
                    Loading
                  </span>
                ) : count > 0 ? '↺ Reset' : '▶ Begin Japa'}
              </button>

              {count > 0 && (
                <button
                  className="action-btn"
                  onClick={() => pause ? handlePauseSpeech() : handleResumeSpeech()}
                  style={btnStyle('rgba(180,220,255,0.9)')}
                >
                  {pause ? '⏸ Pause' : '▶ Resume'}
                </button>
              )}
            </div>

            {/* Progress bar */}
            {count > 0 && (
              <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ color: 'rgba(255,220,130,0.5)', fontSize: 10, letterSpacing: 1 }}>PROGRESS</span>
                  <span style={{ color: textGold, fontSize: 10, letterSpacing: 1 }}>{Math.round(count / 108 * 100)}%</span>
                </div>
                <div style={{ height: 4, background: 'rgba(255,215,0,0.15)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${(count / 108) * 100}%`,
                    background: 'linear-gradient(90deg, #FFD700, #FF6B00)',
                    borderRadius: 2,
                    transition: 'width 0.5s ease',
                    boxShadow: '0 0 8px rgba(255,215,0,0.6)',
                  }} />
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '40px 0 0', opacity: 0.35, width: '100%', maxWidth: 440 }}>
            <div style={{ flex: 1, height: '0.5px', background: textGold }} />
            <span style={{ fontSize: 16 }}>🙏</span>
            <div style={{ flex: 1, height: '0.5px', background: textGold }} />
          </div>

          <p style={{
            fontFamily: "'Tiro Devanagari Sanskrit', serif",
            color: 'rgba(255,220,130,0.45)',
            fontSize: 12,
            marginTop: 14,
            letterSpacing: 1,
            textAlign: 'center',
          }}>
            हरे राम हरे राम, राम राम हरे हरे ॥ हरे कृष्ण हरे कृष्ण, कृष्ण कृष्ण हरे हरे ॥
          </p>
        </section>

        {/* Hidden voice select */}
        <select ref={voiceSelectRef} hidden />
      </div>
    </>
  );
};

export default Home;