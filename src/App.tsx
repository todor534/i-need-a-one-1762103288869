import React from 'react';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Ingredients from './components/Ingredients';
import HowItWorks from './components/HowItWorks';
import PricingCTA from './components/PricingCTA';
import Testimonials from './components/Testimonials';
import Guarantee from './components/Guarantee';
import FAQ from './components/FAQ';
import TrustBar from './components/TrustBar';
import StickyCTA from './components/StickyCTA';
import Footer from './components/Footer';

const styles: { [k: string]: React.CSSProperties } = {
  app: {
    minHeight: '100dvh',
    display: 'flex',
    flexDirection: 'column',
    background: '#0b0e13',
    color: '#f5f7fa',
    lineHeight: 1.6,
  },
  container: {
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 20px',
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    background: 'rgba(11,14,19,0.8)',
    backdropFilter: 'blur(8px)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  headerInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 64,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontWeight: 800,
    letterSpacing: 0.5,
    fontSize: 18,
  },
  brandDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    background: 'linear-gradient(135deg,#3b82f6,#06b6d4)',
    boxShadow: '0 0 12px rgba(59,130,246,0.7)',
  },
  nav: {
    display: 'flex',
    gap: 18,
    alignItems: 'center',
  },
  navLink: {
    fontSize: 14,
    color: '#cbd5e1',
    textDecoration: 'none',
    padding: '8px 10px',
    borderRadius: 8,
    transition: 'color .2s, background .2s',
    cursor: 'pointer',
  },
  navCTA: {
    padding: '9px 14px',
    fontSize: 14,
    borderRadius: 999,
    background: 'linear-gradient(135deg,#22c55e,#16a34a)',
    color: '#081018',
    fontWeight: 700 as React.CSSProperties['fontWeight'],
    boxShadow: '0 6px 18px rgba(34,197,94,0.35)',
    cursor: 'pointer',
    border: 'none',
  },
  main: {
    flex: 1,
  },
  section: {
    padding: '56px 0',
  },
  sectionTight: {
    padding: '40px 0',
  },
  sectionAlt: {
    padding: '56px 0',
    background:
      'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0))',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  footerWrap: {
    borderTop: '1px solid rgba(255,255,255,0.06)',
    marginTop: 24,
  },
  srOnly: {
    position: 'absolute',
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: 0,
  },
};

function App() {
  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={styles.app}>
      <a href="#pricing" style={styles.srOnly}>
        Skip to pricing
      </a>
      <header style={styles.header}>
        <div style={{ ...styles.container, ...styles.headerInner }}>
          <div style={styles.brand}>
            <span style={styles.brandDot} />
            RecoverX
          </div>
          <nav style={styles.nav} aria-label="Primary">
            <a
              href="#benefits"
              onClick={(e) => handleNavClick(e, 'benefits')}
              style={styles.navLink}
            >
              Benefits
            </a>
            <a
              href="#how"
              onClick={(e) => handleNavClick(e, 'how')}
              style={styles.navLink}
            >
              How it works
            </a>
            <a
              href="#ingredients"
              onClick={(e) => handleNavClick(e, 'ingredients')}
              style={styles.navLink}
            >
              Ingredients
            </a>
            <a
              href="#testimonials"
              onClick={(e) => handleNavClick(e, 'testimonials')}
              style={styles.navLink}
            >
              Results
            </a>
            <a
              href="#faq"
              onClick={(e) => handleNavClick(e, 'faq')}
              style={styles.navLink}
            >
              FAQ
            </a>
            <a
              href="#pricing"
              onClick={(e) => handleNavClick(e, 'pricing')}
              style={styles.navCTA}
            >
              Buy now
            </a>
          </nav>
        </div>
      </header>

      <main style={styles.main}>
        <div id="hero" style={styles.section}>
          <div style={styles.container}>
            <Hero />
          </div>
        </div>

        <div style={styles.sectionTight}>
          <div style={styles.container}>
            <TrustBar />
          </div>
        </div>

        <div id="benefits" style={styles.sectionAlt}>
          <div style={styles.container}>
            <Benefits />
          </div>
        </div>

        <div id="how" style={styles.section}>
          <div style={styles.container}>
            <HowItWorks />
          </div>
        </div>

        <div id="ingredients" style={styles.sectionAlt}>
          <div style={styles.container}>
            <Ingredients />
          </div>
        </div>

        <div id="testimonials" style={styles.section}>
          <div style={styles.container}>
            <Testimonials />
          </div>
        </div>

        <div id="pricing" style={styles.sectionAlt}>
          <div style={styles.container}>
            <PricingCTA />
          </div>
        </div>

        <div id="guarantee" style={styles.section}>
          <div style={styles.container}>
            <Guarantee />
          </div>
        </div>

        <div id="faq" style={styles.sectionAlt}>
          <div style={styles.container}>
            <FAQ />
          </div>
        </div>
      </main>

      <div style={styles.footerWrap}>
        <div style={styles.container}>
          <Footer />
        </div>
      </div>

      <StickyCTA />
    </div>
  );
}

export default App;