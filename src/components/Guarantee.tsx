import React from 'react';

const styles: { [key: string]: React.CSSProperties } = {
  section: {
    padding: '56px 20px',
    background: '#0f172a',
    color: '#e2e8f0',
  },
  container: {
    maxWidth: 1100,
    margin: '0 auto',
    borderRadius: 16,
    background: 'linear-gradient(180deg,#111827 0%, #0b1224 100%)',
    border: '1px solid rgba(148,163,184,0.18)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
    padding: '32px',
    display: 'flex',
    gap: 24,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  media: {
    flex: '0 1 260px',
    textAlign: 'center',
  },
  seal: {
    width: '180px',
    height: '180px',
    objectFit: 'contain',
    display: 'block',
    margin: '0 auto',
    filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.45))',
  },
  textWrap: {
    flex: '1 1 480px',
    minWidth: 280,
  },
  title: {
    fontSize: 28,
    lineHeight: 1.15,
    margin: '4px 0 12px',
    color: '#f8fafc',
    fontWeight: 800,
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 1.6,
    margin: '0 0 16px',
    color: '#cbd5e1',
  },
  highlight: {
    color: '#34d399',
    fontWeight: 700,
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: '12px 0 16px',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(180px, 1fr))',
    gap: 12,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(148,163,184,0.18)',
    padding: '10px 12px',
    borderRadius: 10,
    color: '#d1d5db',
    fontSize: 14,
  },
  checkIcon: {
    width: 18,
    height: 18,
    flex: '0 0 18px',
    color: '#34d399',
  },
  small: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 10,
  },
  badgeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginTop: 14,
    flexWrap: 'wrap',
  },
  badge: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '8px 12px',
    borderRadius: 999,
    border: '1px solid rgba(148,163,184,0.18)',
    background: 'rgba(2,6,23,0.5)',
  },
  badgeImg: {
    width: 22,
    height: 22,
    objectFit: 'contain',
  },
  badgeText: {
    fontSize: 12,
    color: '#cbd5e1',
    fontWeight: 600,
    letterSpacing: '0.02em',
    textTransform: 'uppercase',
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(120px, 1fr))',
    gap: 12,
    width: '100%',
    marginTop: 20,
  },
  statCard: {
    background: 'rgba(17,24,39,0.7)',
    border: '1px solid rgba(148,163,184,0.18)',
    borderRadius: 12,
    padding: '12px 14px',
    textAlign: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 800,
    color: '#f8fafc',
    margin: 0,
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
    margin: 0,
  },
};

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" style={styles.checkIcon} aria-hidden="true">
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Guarantee() {
  return (
    <section aria-labelledby="guarantee-heading" style={styles.section} id="guarantee">
      <div style={styles.container}>
        <div style={styles.media}>
          <img
            src="https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762101964128-img-guarantee-seal.png"
            width={180}
            height={180}
            alt="60-Day Money-Back Guarantee Seal"
            loading="lazy"
            style={styles.seal}
          />
        </div>
        <div style={styles.textWrap}>
          <p style={{ color: '#34d399', fontWeight: 700, margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: 12 }}>
            100% Risk-Free
          </p>
          <h2 id="guarantee-heading" style={styles.title}>
            60-Day Money‑Back Guarantee
          </h2>
          <p style={styles.subtitle}>
            Try our Muscle Recovery formula for a full 60 days. If you don’t feel faster recovery, less soreness, and stronger performance,
            we’ll refund your purchase. No questions asked.
          </p>

          <ul style={styles.list} aria-label="Guarantee benefits">
            <li style={styles.listItem}>
              <CheckIcon />
              Full refund within 60 days
            </li>
            <li style={styles.listItem}>
              <CheckIcon />
              Fast support via email
            </li>
            <li style={styles.listItem}>
              <CheckIcon />
              One-time or subscription orders
            </li>
            <li style={styles.listItem}>
              <CheckIcon />
              Secure checkout and data privacy
            </li>
          </ul>

          <p style={styles.small}>
            Our blend features BCAAs (500 mg), Glutamine (400 mg), Protein (600 mg), and Electrolytes (100 mg) to support muscle repair and hydration.
            Results may vary by individual. If you’re not satisfied, contact us within 60 days for a full refund of the product price.
          </p>

          <div style={styles.badgeRow} aria-label="Quality and safety badges">
            <div style={styles.badge}>
              <img src="https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762102003515-img-gmp-badge.png" alt="" width={22} height={22} style={styles.badgeImg} loading="lazy" />
              <span style={styles.badgeText}>GMP Compliant</span>
            </div>
            <div style={styles.badge}>
              <img src="https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762102057272-img-lab-tested-badge.png" alt="" width={22} height={22} style={styles.badgeImg} loading="lazy" />
              <span style={styles.badgeText}>Third‑Party Tested</span>
            </div>
            <div style={styles.badge}>
              <img src="https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762102102994-img-made-in-usa-badge.png" alt="" width={22} height={22} style={styles.badgeImg} loading="lazy" />
              <span style={styles.badgeText}>Made in USA</span>
            </div>
          </div>

          <div style={styles.statsRow} role="group" aria-label="Satisfaction stats">
            <div style={styles.statCard}>
              <p style={styles.statNumber}>60 Days</p>
              <p style={styles.statLabel}>Risk‑Free Trial</p>
            </div>
            <div style={styles.statCard}>
              <p style={styles.statNumber}>4.8/5</p>
              <p style={styles.statLabel}>Average Rating</p>
            </div>
            <div style={styles.statCard}>
              <p style={styles.statNumber}>24/7</p>
              <p style={styles.statLabel}>Customer Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}