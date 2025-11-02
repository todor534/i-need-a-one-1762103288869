import React from 'react';

type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar: string;
  verified?: boolean;
};

const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Jake R.',
    role: 'Marathon Runner',
    quote:
      "DOMS was cut in half the next day. The BCAAs + electrolytes kept me cramp‑free through my long run and I actually felt fresh for strides.",
    rating: 5,
    avatar: 'https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762102512844-img-avatar-jake.png',
    verified: true,
  },
  {
    id: 't2',
    name: 'Mia T.',
    role: 'Strength Coach',
    quote:
      "My lifters sip this between sets. Noticeably less soreness and they hold quality volume deeper into sessions. Easy on the stomach.",
    rating: 5,
    avatar: 'https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762102554957-img-avatar-mia.png',
    verified: true,
  },
  {
    id: 't3',
    name: 'Daniel P.',
    role: 'Physical Therapist, DPT',
    quote:
      "Clients report better recovery within a week. Clean taste, mixes instantly, and the BCAA + glutamine combo is dialed at the right dose.",
    rating: 5,
    avatar: 'https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762102597915-img-avatar-daniel.png',
    verified: true,
  },
  {
    id: 't4',
    name: 'Sofia L.',
    role: 'New Mom & Lifter',
    quote:
      "Back‑to‑back workouts without the afternoon crash. I recover faster and still have energy for life outside the gym.",
    rating: 5,
    avatar: 'https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762102642127-img-avatar-sofia.png',
    verified: true,
  },
];

const Star: React.FC<{ filled?: boolean }> = ({ filled = true }) => (
  <svg
    aria-hidden="true"
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill={filled ? '#F59E0B' : 'none'}
    stroke="#F59E0B"
    strokeWidth="1"
    style={styles.star}
  >
    <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.78L10 14.96 4.8 17.5l1-5.78L1.6 7.62l5.81-.85L10 1.5z" />
  </svg>
);

const Rating: React.FC<{ value: number; outOf?: number; label?: string }> = ({
  value,
  outOf = 5,
  label,
}) => {
  const stars = Array.from({ length: outOf }, (_, i) => i < Math.round(value));
  return (
    <div style={styles.ratingWrap} aria-label={label || `Rating: ${value} out of ${outOf}`}>
      {stars.map((filled, idx) => (
        <Star key={idx} filled={filled} />
      ))}
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section style={styles.section} aria-labelledby="testimonials-heading">
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.headerTop}>
            <span style={styles.badge}>Trusted by athletes and coaches</span>
          </div>
          <h2 id="testimonials-heading" style={styles.title}>
            Real recovery. Real results.
          </h2>
          <p style={styles.subtitle}>
            BCAAs (500 mg) • Glutamine (400 mg) • Protein (600 mg) • Electrolytes (100 mg)
          </p>
          <div style={styles.aggregate}>
            <Rating value={5} />
            <span style={styles.aggregateText}>
              4.9 average rating • 1,247 reviews
            </span>
          </div>
        </div>

        <div style={styles.grid as React.CSSProperties}>
          {testimonials.map((t) => (
            <article key={t.id} style={styles.card} aria-label={`${t.name} testimonial`}>
              <div style={styles.cardTop}>
                <img
                  src={t.avatar}
                  alt={`${t.name} avatar`}
                  width={48}
                  height={48}
                  style={styles.avatar}
                />
                <div style={styles.person}>
                  <div style={styles.nameRow}>
                    <strong style={styles.name}>{t.name}</strong>
                    {t.verified && <span style={styles.verified}>Verified Purchase</span>}
                  </div>
                  <span style={styles.role}>{t.role}</span>
                </div>
              </div>
              <div style={styles.quoteWrap}>
                <span aria-hidden="true" style={styles.quoteMark}>
                  “
                </span>
                <p style={styles.quote}>{t.quote}</p>
              </div>
              <div style={styles.footerRow}>
                <Rating value={t.rating} />
                <span style={styles.dot} />
                <span style={styles.miniText}>Recovery you can feel in 7 days</span>
              </div>
            </article>
          ))}
        </div>

        <p style={styles.disclaimer}>
          Individual results may vary. Use as directed alongside a balanced diet and training plan.
        </p>
      </div>
    </section>
  );
};

const styles: { [k: string]: React.CSSProperties } = {
  section: {
    backgroundColor: '#F8FAFC',
    padding: '72px 16px',
  },
  container: {
    maxWidth: 1100,
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: 32,
  },
  headerTop: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 8,
  },
  badge: {
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 0.4,
    color: '#0F172A',
    backgroundColor: '#E2E8F0',
    borderRadius: 999,
    padding: '6px 10px',
  },
  title: {
    fontSize: 32,
    lineHeight: 1.2,
    margin: '8px 0 8px',
    color: '#0F172A',
    fontWeight: 800,
  },
  subtitle: {
    fontSize: 14,
    color: '#475569',
    margin: 0,
  },
  aggregate: {
    marginTop: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  aggregateText: {
    fontSize: 13,
    color: '#334155',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: 16,
    marginTop: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E7EB',
    borderRadius: 14,
    padding: 18,
    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    minHeight: 220,
  },
  cardTop: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #F1F5F9',
  },
  person: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  nameRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    color: '#0F172A',
    fontSize: 14,
  },
  verified: {
    fontSize: 11,
    color: '#0F766E',
    backgroundColor: '#CCFBF1',
    borderRadius: 6,
    padding: '2px 6px',
    fontWeight: 600,
  },
  role: {
    fontSize: 12,
    color: '#64748B',
  },
  quoteWrap: {
    position: 'relative',
    paddingTop: 6,
  },
  quoteMark: {
    position: 'absolute',
    top: -6,
    left: -2,
    fontSize: 32,
    color: '#E2E8F0',
    lineHeight: 1,
    userSelect: 'none',
  },
  quote: {
    margin: 0,
    color: '#0F172A',
    fontSize: 15,
    lineHeight: 1.55,
  },
  footerRow: {
    marginTop: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  ratingWrap: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 2,
  },
  star: {
    display: 'block',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#CBD5E1',
    display: 'inline-block',
  },
  miniText: {
    fontSize: 12,
    color: '#475569',
  },
  disclaimer: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 12,
    color: '#64748B',
  },
};

export default Testimonials;