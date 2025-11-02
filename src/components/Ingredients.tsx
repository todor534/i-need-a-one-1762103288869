import React from 'react';

type Ingredient = {
  name: string;
  amount: number;
  unit: string;
  color: string;
  icon: string;
  description: string;
};

const INGREDIENTS: Ingredient[] = [
  {
    name: 'Protein',
    amount: 600,
    unit: 'mg',
    color: '#7C3AED',
    icon: 'https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762102698195-img-icon-protein.png',
    description: 'Complete protein to support lean muscle and daily recovery needs.'
  },
  {
    name: 'BCAAs',
    amount: 500,
    unit: 'mg',
    color: '#10B981',
    icon: 'https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762102736578-img-icon-bcaas.png',
    description: 'Leucine, isoleucine, and valine to support muscle repair after training.'
  },
  {
    name: 'Glutamine',
    amount: 400,
    unit: 'mg',
    color: '#3B82F6',
    icon: 'https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762102778071-img-icon-glutamine.png',
    description: 'A key amino acid used by muscles during recovery from intense sessions.'
  },
  {
    name: 'Electrolytes',
    amount: 100,
    unit: 'mg',
    color: '#F59E0B',
    icon: 'https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762102834703-img-icon-electrolytes.png',
    description: 'Sodium, potassium, and magnesium to help maintain hydration balance.'
  }
];

const styles: { [k: string]: React.CSSProperties } = {
  section: {
    padding: '72px 0',
    background: '#0b0f14',
    color: '#e8eef5'
  },
  container: {
    maxWidth: 1100,
    margin: '0 auto',
    padding: '0 20px'
  },
  headerWrap: {
    textAlign: 'center' as const,
    marginBottom: 36
  },
  eyebrow: {
    display: 'inline-block',
    padding: '6px 10px',
    borderRadius: 999,
    background: 'rgba(124, 58, 237, 0.15)',
    color: '#C4B5FD',
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase' as const,
    marginBottom: 10
  },
  title: {
    fontSize: 32,
    lineHeight: 1.15,
    margin: 0,
    fontWeight: 800
  },
  subtitle: {
    marginTop: 10,
    color: '#a7b3c2',
    fontSize: 16
  },
  layout: {
    display: 'flex',
    gap: 24,
    alignItems: 'stretch',
    flexWrap: 'wrap' as const
  },
  leftCol: {
    flex: '1 1 380px',
    minWidth: 280,
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(148, 163, 184, 0.18)',
    borderRadius: 14,
    padding: 18
  },
  rightCol: {
    flex: '1 1 380px',
    minWidth: 280,
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(148, 163, 184, 0.18)',
    borderRadius: 14,
    padding: 18
  },
  labelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10
  },
  total: {
    fontSize: 13,
    color: '#a7b3c2'
  },
  stackedBar: {
    display: 'flex',
    height: 16,
    borderRadius: 999,
    overflow: 'hidden',
    border: '1px solid rgba(148, 163, 184, 0.25)',
    background: 'rgba(148, 163, 184, 0.12)',
    marginBottom: 14
  },
  legend: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: 10,
    marginTop: 10
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center'
  },
  swatch: {
    width: 12,
    height: 12,
    borderRadius: 3,
    marginRight: 8,
    flex: '0 0 auto'
  },
  ingredientList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 16,
    marginTop: 8
  },
  card: {
    background: 'rgba(2,6,12,0.35)',
    border: '1px solid rgba(148, 163, 184, 0.18)',
    borderRadius: 12,
    padding: 14,
    display: 'flex',
    gap: 12,
    alignItems: 'flex-start'
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(148,163,184,0.12)',
    border: '1px solid rgba(148, 163, 184, 0.18)',
    flex: '0 0 auto'
  },
  icon: {
    width: 22,
    height: 22,
    objectFit: 'contain' as const
  },
  cardTitleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    width: '100%'
  },
  cardTitle: {
    fontWeight: 700,
    fontSize: 16,
    margin: 0
  },
  cardAmount: {
    fontWeight: 700,
    fontSize: 14,
    color: '#C4B5FD'
  },
  cardDesc: {
    marginTop: 6,
    color: '#a7b3c2',
    fontSize: 14,
    lineHeight: 1.4
  },
  note: {
    marginTop: 14,
    fontSize: 12,
    color: '#8fa1b4'
  },
  pill: {
    display: 'inline-block',
    padding: '6px 10px',
    borderRadius: 999,
    border: '1px solid rgba(148, 163, 184, 0.18)',
    background: 'rgba(148,163,184,0.10)',
    color: '#c7d2df',
    fontSize: 12,
    marginTop: 10
  }
};

const Ingredients: React.FC = () => {
  const totalMg = INGREDIENTS.reduce((sum, i) => sum + i.amount, 0);

  return (
    <section id="ingredients" style={styles.section} aria-label="Ingredients">
      <div style={styles.container}>
        <div style={styles.headerWrap}>
          <div style={styles.eyebrow}>What’s inside</div>
          <h2 style={styles.title}>Clinically-dosed ingredients for recovery</h2>
          <p style={styles.subtitle}>
            A clean, balanced formula designed to support post-workout repair, hydration, and daily performance.
          </p>
        </div>

        <div style={styles.layout}>
          <div style={styles.leftCol} aria-label="Ingredient breakdown">
            <div style={styles.labelRow}>
              <strong>Per serving</strong>
              <span style={styles.total}>Total: {totalMg} mg</span>
            </div>
            <div style={styles.stackedBar} role="meter" aria-valuemin={0} aria-valuemax={totalMg} aria-valuenow={totalMg}>
              {INGREDIENTS.map((ing) => {
                const widthPct = (ing.amount / totalMg) * 100;
                return (
                  <div
                    key={ing.name}
                    title={`${ing.name}: ${ing.amount} ${ing.unit}`}
                    style={{ width: `${widthPct}%`, background: ing.color }}
                  />
                );
              })}
            </div>
            <div style={styles.legend}>
              {INGREDIENTS.map((ing) => (
                <div key={ing.name} style={styles.legendItem}>
                  <span style={{ ...styles.swatch, background: ing.color }} />
                  <span>{ing.name} — {ing.amount} {ing.unit}</span>
                </div>
              ))}
            </div>
            <div style={styles.pill}>No sugar • No artificial colors • Gluten-free</div>
          </div>

          <div style={styles.rightCol} aria-label="Ingredient details">
            <div style={styles.ingredientList}>
              {INGREDIENTS.map((ing) => (
                <div key={ing.name} style={styles.card}>
                  <div style={styles.iconWrap} aria-hidden="true">
                    <img src={ing.icon} alt="" style={styles.icon} />
                  </div>
                  <div style={{ width: '100%' }}>
                    <div style={styles.cardTitleRow}>
                      <h3 style={styles.cardTitle}>{ing.name}</h3>
                      <span style={styles.cardAmount}>{ing.amount} {ing.unit}</span>
                    </div>
                    <p style={styles.cardDesc}>{ing.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <p style={styles.note}>
              Formulation optimized to be taken right after training or any time during the day. Amounts listed are per serving.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ingredients;