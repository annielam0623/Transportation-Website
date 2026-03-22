'use client'
import Navbar from '@/components/layout/Navbar'
import Topbar from '@/components/layout/Topbar'

export default function HeroSection() {
  return (
    <div style={{ background: '#020c18' }}>
      <Topbar />
      <Navbar />
      <div style={{
        background: 'linear-gradient(to bottom, #020c18 0%, #04101E 8%, #071828 18%, #0D2548 38%, #1A3F6E 50%, #0D2548 62%, #071828 80%, #04101E 92%, #020c18 100%)',
        position: 'relative',
        overflow: 'hidden',
        // ✅ 改用 clamp 让高度随屏幕宽度缩放，不跳变
        minHeight: 'clamp(480px, 90vh, 960px)',
        display: 'flex',
        alignItems: 'center',
      }}>

        {/* Subtle glow */}
        <div style={{
          position: 'absolute', top: '20%', left: 0, right: 0, height: '60%',
          background: 'radial-gradient(ellipse at 30% 50%, rgba(30,80,180,.18) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        {/* Sprinter fade from right */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0,
          // ✅ 图片宽度随屏幕比例缩放
          width: 'clamp(55%, 75%, 85%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 15%, #000 30%)',
          maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.8) 15%, #000 30%)',
          pointerEvents: 'none',
        }}>
          <img
            src="/Sprinter-Hero.png"
            alt=""
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center 40%',
              opacity: 0.95,
            }}
          />
        </div>

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          // ✅ padding 用 clamp 平滑缩放，不再跳变
          paddingLeft: 'clamp(1.5rem, 6vw, 6rem)',
          paddingRight: 'clamp(1.5rem, 6vw, 6rem)',
          paddingTop: 'clamp(3rem, 5vw, 5rem)',
          paddingBottom: 'clamp(3rem, 5vw, 5rem)',
        }}>
          <div style={{
            // ✅ 内容区宽度用 vw 比例，不用固定 580px
            maxWidth: 'clamp(320px, 42vw, 600px)',
          }}>

            {/* Eyebrow */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              // ✅ 字号用 clamp 缩放
              fontSize: 'clamp(8px, 0.8vw, 11px)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#9AA8B8',
              marginBottom: 'clamp(1rem, 2.5vw, 2rem)',
            }}>
              <span style={{ display: 'block', width: '1.75rem', height: '1px', background: '#9AA8B8' }} />
              Charter Bus &amp; Fly &amp; Drive
              <span style={{ display: 'block', width: '1.75rem', height: '1px', background: '#9AA8B8' }} />
            </div>

            {/* H1 */}
            <h1 style={{
              fontFamily: 'serif',
              // ✅ 原来就是 clamp，保持不变
              fontSize: 'clamp(32px, 4.5vw, 72px)',
              fontWeight: 700,
              lineHeight: 1.03,
              marginBottom: 'clamp(1rem, 1.5vw, 1.5rem)',
              color: '#fff',
            }}>
              Drive. Be Driven.<br />
              <span style={{ color: '#9AA8B8' }}>Or Both.</span>
            </h1>

            {/* Body */}
            <p style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: 'clamp(12px, 1.1vw, 15px)',
              fontWeight: 300,
              lineHeight: 1.8,
              marginBottom: 'clamp(1.25rem, 2vw, 2rem)',
              maxWidth: 'clamp(260px, 32vw, 420px)',
            }}>
              Group charter buses for tours and transfers. AI-powered Fly &amp; Drive decisions — choose self-drive, professional chauffeur, or the smart hybrid of both.
            </p>

            {/* Buttons */}
            <div style={{
              display: 'flex',
              gap: 'clamp(0.5rem, 1vw, 0.75rem)',
              marginBottom: 'clamp(1.25rem, 2vw, 2rem)',
              flexWrap: 'wrap',
            }}>
              <a href="#booking" style={{
                background: '#9AA8B8',
                color: '#020c18',
                fontSize: 'clamp(9px, 0.85vw, 11px)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 700,
                padding: 'clamp(0.6rem, 0.9vw, 0.875rem) clamp(1.25rem, 2.5vw, 2rem)',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'background 0.2s',
              }}>
                Book a Tour →
              </a>
              <a href="#services" style={{
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff',
                fontSize: 'clamp(9px, 0.85vw, 11px)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: 'clamp(0.6rem, 0.9vw, 0.875rem) clamp(1.25rem, 2.5vw, 2rem)',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'border-color 0.2s',
              }}>
                View Schedule →
              </a>
            </div>

            {/* Badges */}
            <div style={{
              display: 'flex',
              gap: 'clamp(0.75rem, 2vw, 1.5rem)',
              flexWrap: 'wrap',
            }}>
              {['Fully Insured', 'Daily Service', '5-Star Rated'].map(b => (
                <div key={b} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: 'clamp(8px, 0.75vw, 10px)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.3)',
                }}>
                  <div style={{
                    width: 5, height: 5,
                    borderRadius: '50%',
                    background: '#9AA8B8',
                    flexShrink: 0,
                  }} />
                  {b}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
