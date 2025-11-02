import React, { useId, useState } from 'react';

type FAQItem = {
  q: string;
  a: string;
};

const faqs: FAQItem[] = [
  {
    q: 'What is this supplement and how does it help recovery?',
    a: `It’s a post‑workout recovery blend designed to support muscle repair, reduce soreness, and replenish what you lose in training. Each serving combines fast‑acting BCAAs (branched‑chain amino acids) and glutamine to support muscle protein synthesis, complete protein to feed muscles, and electrolytes to help rehydrate after sweat-heavy sessions.`,
  },
  {
    q: 'How do I take it for best results?',
    a: `Mix 1 serving with 8–14 oz of cold water (or your favorite smoothie) and drink within 30 minutes after training. On rest days, take 1 serving between meals. On especially intense days, you may take up to 2 servings spread out. Always follow the label, stay hydrated, and consult your healthcare professional if you have any questions.`,
  },
  {
    q: 'What’s in one serving?',
    a: `One serving includes:
• BCAAs – 500 mg
• Glutamine – 400 mg
• Protein – 600 mg
• Electrolytes – 100 mg
No stimulants and no caffeine are added.`,
  },
  {
    q: 'When should I expect to feel a difference?',
    a: `Most people notice better hydration and less post‑workout fatigue within the first week of consistent use. Muscle recovery benefits are generally felt over 1–3 weeks when paired with good sleep, nutrition, and training consistency. Individual results vary.`,
  },
  {
    q: 'Is it safe? Any side effects or allergens?',
    a: `The formula uses commonly used recovery nutrients and contains no caffeine. If you have allergies or dietary restrictions, review the full ingredient panel and consult your healthcare provider before use. Do not use if you are pregnant or nursing, have a medical condition, or are under 18 without medical guidance.`,
  },
  {
    q: 'Can I take it with other supplements or medications?',
    a: `Often, yes—many customers stack it with a multivitamin or pre‑workout. If you are on medication or under medical care, speak with your healthcare professional before adding any supplement.`,
  },
  {
    q: 'Do I have to subscribe?',
    a: `No. You can choose a one‑time purchase or subscribe to save and get automatic deliveries. You can skip, pause, or cancel your subscription anytime before your next renewal.`,
  },
  {
    q: 'What about shipping and returns?',
    a: `Orders typically ship quickly and arrive in a few business days within the continental U.S. Your purchase is protected by our risk‑free money‑back guarantee—if you’re not satisfied, contact us and we’ll make it right.`,
  },
];

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: '64px 16px',
    backgroundColor: '#ffffff',
  },
  container: {
    maxWidth: '960px',
    margin: '0 auto',
  },
  headerWrap: {
    textAlign: 'center',
    marginBottom: '28px',
  },
  eyebrow: {
    color: '#6b7280',
    fontSize: '12px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    fontWeight: 600,
    marginBottom: '8px',
  },
  title: {
    fontSize: '28px',
    lineHeight: 1.2,
    margin: 0,
    fontWeight: 800,
    color: '#0f172a',
  },
  grid: {
    display: 'grid',
    gap: '12px',
  },
  item: {
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 2px rgba(16,24,40,0.04)',
    overflow: 'hidden',
  },
  button: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
    gap: '12px',
    padding: '16px 18px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  } as React.CSSProperties,
  question: {
    flex: 1,
    fontSize: '16px',
    lineHeight: 1.4,
    fontWeight: 700,
    color: '#0f172a',
    margin: 0,
  },
  iconWrap: {
    width: '28px',
    height: '28px',
    minWidth: '28px',
    minHeight: '28px',
    borderRadius: '8px',
    backgroundColor: '#f1f5f9',
    display: 'grid',
    placeItems: 'center',
  },
  panel: {
    padding: '0 18px 16px 18px',
    color: '#334155',
    fontSize: '15px',
    lineHeight: 1.6,
    whiteSpace: 'pre-line',
  },
  divider: {
    height: '1px',
    backgroundColor: '#e5e7eb',
    margin: '0 18px',
  },
  footerNote: {
    marginTop: '16px',
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '13px',
  },
  srOnly: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    width: '1px',
  } as React.CSSProperties,
};

function PlusMinusIcon({ open }: { open: boolean }) {
  const color = '#0f172a';
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      style={{ transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 180ms ease' }}
    >
      <path d="M12 5v14M5 12h14" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const uid = useId();

  const toggle = (i: number) => {
    setOpenIndex((curr) => (curr === i ? null : i));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle(i);
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = document.querySelector<HTMLButtonElement>(
        `#${uid.replaceAll(':', '-')}-btn-${(i + 1) % faqs.length}`
      );
      next?.focus();
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (i - 1 + faqs.length) % faqs.length;
      const prev = document.querySelector<HTMLButtonElement>(
        `#${uid.replaceAll(':', '-')}-btn-${prevIndex}`
      );
      prev?.focus();
    }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.slice(0, 6).map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const uidSafe = uid.replaceAll(':', '-');

  return (
    <section id="faq" style={styles.section} aria-labelledby={`${uidSafe}-title`}>
      <div style={styles.container}>
        <div style={styles.headerWrap}>
          <div style={styles.eyebrow}>Answers</div>
          <h2 id={`${uidSafe}-title`} style={styles.title}>
            Frequently Asked Questions
          </h2>
        </div>

        <div style={styles.grid} role="list">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            const buttonId = `${uidSafe}-btn-${i}`;
            const panelId = `${uidSafe}-panel-${i}`;
            return (
              <div key={i} style={styles.item} role="listitem">
                <button
                  id={buttonId}
                  style={styles.button}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                >
                  <span style={styles.iconWrap} aria-hidden="true">
                    <PlusMinusIcon open={isOpen} />
                  </span>
                  <span style={styles.question}>{item.q}</span>
                  <span style={styles.srOnly}>{isOpen ? 'Collapse answer' : 'Expand answer'}</span>
                </button>
                {isOpen && <div style={styles.divider} aria-hidden="true" />}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  style={{
                    ...styles.panel,
                    display: isOpen ? 'block' : 'none',
                  }}
                >
                  {item.a}
                </div>
              </div>
            );
          })}
        </div>

        <div style={styles.footerNote}>
          Still have questions? Email us at support@example.com
        </div>

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </div>
    </section>
  );
}