import React from 'react';

type Step = {
  id: number;
  title: string;
  text: string;
  imgAlt: string;
  imgSrc: string;
};

const steps: Step[] = [
  {
    id: 1,
    title: 'Mix one scoop',
    text: 'Add 1 scoop to 8–12 oz of cold water. Shake or stir until fully dissolved for a smooth, refreshing drink.',
    imgAlt: 'Mixing supplement into water',
    imgSrc: 'https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762103088204-img-mix.png',
  },
  {
    id: 2,
    title: 'Perfect timing',
    text: 'Sip during your workout or drink within 30 minutes after. This is when your muscles are primed to refuel.',
    imgAlt: 'Timer indicating post-workout window',
    imgSrc: 'https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762103123318-img-timer.png',
  },
  {
    id: 3,
    title: 'Targeted recovery',
    text: 'BCAAs kickstart muscle protein synthesis, Glutamine supports repair, Protein feeds muscles, and Electrolytes restore hydration.',
    imgAlt: 'Muscle recovery and hydration illustration',
    imgSrc: 'https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762103162674-img-muscle.png',
  },
  {
    id: 4,
    title: 'Feel the difference',
    text: 'Wake up with less next‑day soreness, better hydration, and the stamina to train again—consistency made easier.',
    imgAlt: 'Lightning bolt representing energy and recovery',
    imgSrc: 'https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762103223116-img-lightning.png',
  },
];

const HowItWorks: React.FC = () => {
  const handleScrollToPricing = () => {
    const el = document.getElementById('pricing');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="how-it-works" style={styles.root} aria-label="How the muscle recovery supplement works">
      <div style={styles.container}>
        <header style={styles.header}>
          <h2 style={styles.title}>How it works</h2>
          <p style={styles.subtitle}>
            Simple routine. Science-backed nutrients. Faster bounce-back between workouts.
          </p>
        </header>

        <div style={styles.stepsGrid}>
          {steps.map((step) => (
            <article key={step.id} style={styles.stepCard} aria-label={`Step ${step.id}: ${step.title}`}>
              <div style={styles.stepIndex}>{step.id}</div>
              <div style={styles.stepMedia}>
                <img
                  src={step.imgSrc}
                  alt={step.imgAlt}
                  loading="lazy"
                  width={72}
                  height={72}
                  style={styles.stepImage}
                />
              </div>
              <h3 style={styles.stepTitle}>{step.title}</h3>
              <p style={styles.stepText}>{step.text}</p>
            </article>
          ))}
        </div>

        <div style={styles.callout}>
          <div style={styles.calloutHeader}>
            <strong style={styles.calloutTitle}>What one scoop delivers</strong>
            <span style={styles.calloutBadge}>1,600 mg active matrix</span>
          </div>
          <div style={styles.pillsRow} role="list" aria-label="Active ingredients per serving">
            <div style={styles.pill} role="listitem">
              <span style={styles.pillDot} aria-hidden="true" /> BCAAs 500 mg
            </div>
            <div style={styles.pill} role="listitem">
              <span style={styles.pillDot} aria-hidden="true" /> Glutamine 400 mg
            </div>
            <div style={styles.pill} role="listitem">
              <span style={styles.pillDot} aria-hidden="true" /> Protein 600 mg
            </div>
            <div style={styles.pill} role="listitem">
              <span style={styles.pillDot} aria-hidden="true" /> Electrolytes 100 mg
            </div>
          </div>
          <ul style={styles.benefitList} aria-label="Benefits you can expect">
            <li style={styles.benefitItem}>Supports muscle repair and protein synthesis</li>
            <li style={styles.benefitItem}>Replenishes hydration for better performance</li>
            <li style={styles.benefitItem}>Helps reduce next‑day soreness</li>
          </ul>
        </div>

        <div style={styles.ctaRow}>
          <button type="button" style={styles.ctaButton} onClick={handleScrollToPricing} aria-label="Go to pricing and choose your plan">
            Get Started — Recover Faster
          </button>
          <p style={styles.ctaNote}>30-day money‑back guarantee</p>
        </div>

        <p style={styles.disclaimer}>
          These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </section>
  );
};

const styles: { [k: string]: React.CSSProperties } = {
  root: {
    background: 'linear-gradient(180deg, #0f172a 0%, #0b1324 100%)',
    color: '#e5e7eb',
    padding: '72px 16px',
  },
  container: {
    maxWidth: 1100,
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: 28,
  },
  title: {
    margin: 0,
    fontSize: 36,
    lineHeight: 1.2,
    color: '#f8fafc',
    letterSpacing: 0.2,
    fontWeight: 800,
  },
  subtitle: {
    margin: '12px auto 0',
    maxWidth: 720,
    color: '#cbd5e1',
    fontSize: 18,
    lineHeight: 1.6,
  },
  stepsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
    marginTop: 24,
  },
  stepCard: {
    background: '#0b162e',
    border: '1px solid rgba(148,163,184,0.18)',
    borderRadius: 14,
    padding: 18,
    width: '100%',
    flex: '1 1 240px',
    maxWidth: 260,
    boxShadow: '0 6px 24px rgba(0,0,0,0.25)',
  },
  stepIndex: {
    width: 34,
    height: 34,
    borderRadius: 8,
    background: 'rgba(99,102,241,0.15)',
    color: '#a5b4fc',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    marginBottom: 12,
    border: '1px solid rgba(99,102,241,0.35)',
  },
  stepMedia: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  stepImage: {
    width: 48,
    height: 48,
    objectFit: 'contain',
    filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.35))',
  },
  stepTitle: {
    margin: '6px 0 6px',
    color: '#f1f5f9',
    fontSize: 18,
    fontWeight: 700,
  },
  stepText: {
    margin: 0,
    color: '#cdd6e5',
    fontSize: 14.5,
    lineHeight: 1.6,
  },
  callout: {
    marginTop: 28,
    background: '#0a1a33',
    border: '1px solid rgba(148,163,184,0.18)',
    borderRadius: 16,
    padding: 18,
  },
  calloutHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 10,
  },
  calloutTitle: {
    fontSize: 16,
    color: '#e2e8f0',
    fontWeight: 700,
  },
  calloutBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px 10px',
    borderRadius: 999,
    background: 'rgba(34,197,94,0.12)',
    color: '#86efac',
    border: '1px solid rgba(34,197,94,0.35)',
    fontSize: 12.5,
    fontWeight: 700,
    whiteSpace: 'nowrap',
  },
  pillsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 6,
  },
  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 10px',
    borderRadius: 999,
    background: 'rgba(99,102,241,0.12)',
    color: '#c7d2fe',
    border: '1px solid rgba(99,102,241,0.35)',
    fontSize: 13.5,
    fontWeight: 600,
  },
  pillDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    background: '#c7d2fe',
    display: 'inline-block',
  },
  benefitList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    listStyle: 'none',
    padding: 0,
    margin: '14px 0 0',
    gap: 8,
  },
  benefitItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    color: '#cbd5e1',
    fontSize: 14.5,
    padding: '8px 10px',
    borderRadius: 10,
    background: 'rgba(2,6,23,0.45)',
    border: '1px solid rgba(148,163,184,0.12)',
  },
  ctaRow: {
    marginTop: 24,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 8,
  },
  ctaButton: {
    cursor: 'pointer',
    background: 'linear-gradient(180deg, #6366f1 0%, #4f46e5 100%)',
    color: '#ffffff',
    border: 'none',
    borderRadius: 12,
    padding: '14px 18px',
    fontSize: 16,
    fontWeight: 800,
    letterSpacing: 0.2,
    boxShadow: '0 8px 24px rgba(79,70,229,0.35)',
    transition: 'transform 0.08s ease-out, box-shadow 0.2s ease-out',
  },
  ctaNote: {
    margin: 0,
    color: '#9ca3af',
    fontSize: 13,
  },
  disclaimer: {
    marginTop: 18,
    color: '#8391a6',
    fontSize: 12,
    textAlign: 'center' as const,
  },
};

export default HowItWorks;