import { CSSProperties } from 'react';

type Benefit = {
  title: string;
  description: string;
  points: string[];
  icon: React.ReactNode;
};

const styles: Record<string, CSSProperties> = {
  section: {
    padding: '72px 16px',
    background: '#f8fafc',
    color: '#0f172a',
  },
  container: {
    maxWidth: 1120,
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: 32,
  },
  kicker: {
    display: 'inline-block',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    fontWeight: 700,
    fontSize: 12,
    color: '#2563eb',
    background: '#e0e7ff',
    padding: '6px 10px',
    borderRadius: 9999,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    lineHeight: 1.2,
    margin: '8px 0',
    fontWeight: 800,
  },
  subtitle: {
    maxWidth: 740,
    margin: '0 auto',
    color: '#475569',
    fontSize: 16,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: 16,
    marginTop: 28,
  },
  card: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: 14,
    padding: 18,
    boxShadow: '0 6px 18px rgba(2, 6, 23, 0.06)',
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    background: '#eef2ff',
    color: '#2563eb',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    boxShadow: 'inset 0 0 0 1px #c7d2fe',
  },
  emoji: {
    fontSize: 24,
    lineHeight: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 700,
    margin: '4px 0 6px',
  },
  cardDesc: {
    color: '#475569',
    fontSize: 14,
    marginBottom: 8,
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 8,
    color: '#1f2937',
    fontSize: 14,
    margin: '8px 0',
  },
  checkIcon: {
    display: 'inline-flex',
    width: 18,
    height: 18,
    color: '#16a34a',
    flex: '0 0 18px',
    marginTop: 2,
  },
  pillRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginTop: 28,
  },
  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    background: '#e2e8f0',
    color: '#0f172a',
    borderRadius: 9999,
    padding: '8px 12px',
    fontWeight: 700,
    boxShadow: '0 2px 6px rgba(2, 6, 23, 0.06)',
  },
  pillDot: {
    width: 8,
    height: 8,
    borderRadius: 9999,
    background: '#2563eb',
    boxShadow: '0 0 0 2px rgba(37, 99, 235, 0.2)',
  },
  ctaRow: {
    textAlign: 'center',
    marginTop: 20,
  },
  cta: {
    display: 'inline-block',
    padding: '12px 18px',
    borderRadius: 10,
    background: '#2563eb',
    color: '#ffffff',
    fontWeight: 800,
    textDecoration: 'none',
    boxShadow: '0 10px 22px rgba(37, 99, 235, 0.25)',
  },
  disclaimer: {
    marginTop: 16,
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
};

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" style={styles.checkIcon} aria-hidden="true">
      <path
        d="M16.7 5.7a1 1 0 0 0-1.4-1.4L8 11.6 4.7 8.3a1 1 0 1 0-1.4 1.4l4 4a1 1 0 0 0 1.4 0l8-8z"
        fill="currentColor"
      />
    </svg>
  );
}

const emojiIcon = (symbol: string, label: string) => (
  <span role="img" aria-label={label} style={styles.emoji}>
    {symbol}
  </span>
);

const benefits: Benefit[] = [
  {
    title: 'Rapid muscle repair',
    description: 'Give your body what it needs to rebuild after every workout.',
    points: [
      '600 mg protein supplies essential building blocks',
      '500 mg BCAAs support muscle protein synthesis',
      '400 mg glutamine helps recovery between sessions',
    ],
    icon: emojiIcon('💪', 'muscle'),
  },
  {
    title: 'Less soreness, faster bounce‑back',
    description: 'Feel ready for your next session sooner.',
    points: [
      'Amino blend helps limit muscle breakdown',
      'Supports a quicker post‑workout recovery window',
      'Use pre‑, intra‑, or post‑workout',
    ],
    icon: emojiIcon('🔁', 'recovery'),
  },
  {
    title: 'Hydration and cramp defense',
    description: 'Replenish minerals lost in sweat and keep training.',
    points: [
      '100 mg electrolytes support fluid balance',
      'Helps maintain performance on longer sessions',
      'Refreshing, easy‑mixing formula',
    ],
    icon: emojiIcon('💧', 'hydration'),
  },
  {
    title: 'Endurance and performance support',
    description: 'Stay strong from first rep to last.',
    points: [
      'Amino acids help reduce perceived fatigue',
      'Electrolytes keep nerves and muscles firing',
      'Light enough for training days',
    ],
    icon: emojiIcon('⚡', 'energy'),
  },
  {
    title: 'Immune and gut support',
    description: 'Glutamine plays a role in gut integrity and immune function.',
    points: [
      '400 mg glutamine per serving',
      'Helpful during heavy training blocks',
      'Supports overall recovery',
    ],
    icon: emojiIcon('🛡️', 'shield'),
  },
  {
    title: 'Transparent and convenient',
    description: 'No guesswork—just clean, effective amounts.',
    points: [
      'Clearly labeled: BCAAs 500 mg, Protein 600 mg, Glutamine 400 mg, Electrolytes 100 mg',
      'Mixes smooth—no clumps or grit',
      'Works with water or your favorite shake',
    ],
    icon: emojiIcon('✅', 'check'),
  },
];

export default function Benefits() {
  return (
    <section id="benefits" aria-label="Benefits" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.kicker}>Why it works</div>
          <h2 style={styles.title}>Recover faster. Train harder. Keep progressing.</h2>
          <p style={styles.subtitle}>
            A focused blend of BCAAs, glutamine, protein, and electrolytes designed to support recovery,
            hydration, and performance—so you can show up strong every time.
          </p>
        </div>

        <div style={styles.grid}>
          {benefits.map((b) => (
            <article key={b.title} style={styles.card} aria-label={b.title}>
              <div style={styles.iconWrap}>{b.icon}</div>
              <h3 style={styles.cardTitle}>{b.title}</h3>
              <p style={styles.cardDesc}>{b.description}</p>
              <ul style={styles.list}>
                {b.points.map((p) => (
                  <li key={p} style={styles.listItem}>
                    <CheckIcon />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div style={styles.pillRow} aria-label="Active ingredients per serving">
          <span style={styles.pill}>
            <span style={styles.pillDot} />
            BCAAs 500 mg
          </span>
          <span style={styles.pill}>
            <span style={styles.pillDot} />
            Glutamine 400 mg
          </span>
          <span style={styles.pill}>
            <span style={styles.pillDot} />
            Protein 600 mg
          </span>
          <span style={styles.pill}>
            <span style={styles.pillDot} />
            Electrolytes 100 mg
          </span>
        </div>

        <div style={styles.ctaRow}>
          <a href="#pricing" style={styles.cta} aria-label="See plans and pricing">
            See plans & pricing
          </a>
        </div>

        <p style={styles.disclaimer}>
          These statements have not been evaluated by the Food and Drug Administration. This product is not
          intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </section>
  );
}