import React, { useMemo, useState } from 'react';

type Plan = 'subscribe' | 'one-time';

const styles: { [k: string]: React.CSSProperties } = {
  section: {
    padding: '64px 24px',
    background: '#0b0f14',
    color: '#f6f8fa',
  },
  container: {
    maxWidth: 1120,
    margin: '0 auto',
  },
  headerWrap: {
    textAlign: 'center',
    marginBottom: 32,
  },
  eyebrow: {
    display: 'inline-block',
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: '#7fd18b',
    fontWeight: 700,
    padding: '6px 10px',
    border: '1px solid rgba(127,209,139,0.4)',
    borderRadius: 999,
    marginBottom: 12,
  },
  h2: {
    fontSize: 36,
    lineHeight: 1.15,
    margin: '8px 0 10px',
    fontWeight: 800,
  },
  sub: {
    fontSize: 16,
    color: '#b8c1cc',
    margin: 0,
  },
  quantityWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    flexWrap: 'wrap',
    margin: '28px 0 8px',
  },
  qtyLabel: {
    fontSize: 14,
    color: '#c6d0db',
    marginRight: 6,
  },
  qtyBtn: {
    appearance: 'none',
    border: '1px solid #2a3441',
    background: '#121923',
    color: '#e9eef4',
    padding: '10px 14px',
    borderRadius: 10,
    cursor: 'pointer',
    fontWeight: 700,
    minWidth: 52,
  },
  qtyBtnActive: {
    borderColor: '#65d48c',
    background: 'linear-gradient(180deg, #1b272f 0%, #12201a 100%)',
    color: '#eafff0',
    boxShadow: '0 0 0 3px rgba(101,212,140,0.15) inset',
  },
  grid: {
    display: 'flex',
    gap: 20,
    flexWrap: 'wrap',
    alignItems: 'stretch',
    justifyContent: 'center',
    marginTop: 18,
  },
  card: {
    flex: '1 1 320px',
    minWidth: 300,
    maxWidth: 520,
    border: '1px solid #1f2732',
    borderRadius: 16,
    padding: 22,
    background: 'linear-gradient(180deg, #0e141b 0%, #0b1016 100%)',
  },
  featured: {
    borderColor: '#2a5c3b',
    boxShadow: '0 10px 30px rgba(22, 185, 92, 0.12), inset 0 0 0 1px rgba(101,212,140,0.12)',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -12,
    right: 16,
    background: '#65d48c',
    color: '#08210f',
    padding: '6px 10px',
    borderRadius: 999,
    fontWeight: 800,
    fontSize: 12,
    letterSpacing: 0.3,
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 10,
  },
  planName: {
    fontSize: 18,
    fontWeight: 800,
    margin: 0,
  },
  planTag: {
    fontSize: 12,
    color: '#8fb49c',
    fontWeight: 700,
    padding: '6px 8px',
    borderRadius: 8,
    border: '1px solid rgba(101,212,140,0.3)',
    background: 'rgba(101,212,140,0.08)',
  },
  priceWrap: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  price: {
    fontSize: 36,
    fontWeight: 900,
    color: '#eafff0',
  },
  per: {
    color: '#9cb3c6',
    fontSize: 14,
    fontWeight: 600,
  },
  savings: {
    color: '#65d48c',
    fontSize: 13,
    fontWeight: 800,
  },
  total: {
    color: '#a9b6c4',
    fontSize: 13,
    marginTop: 2,
  },
  features: {
    listStyle: 'none',
    padding: 0,
    margin: '14px 0 18px',
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '8px 0',
    borderTop: '1px dashed rgba(255,255,255,0.06)',
  },
  featureFirst: {
    borderTop: 'none',
  },
  ctaBtn: {
    width: '100%',
    padding: '14px 16px',
    borderRadius: 12,
    border: 'none',
    fontWeight: 900,
    letterSpacing: 0.3,
    cursor: 'pointer',
    transition: 'transform 0.05s ease',
  },
  ctaPrimary: {
    background: 'linear-gradient(180deg, #7be69a 0%, #65d48c 100%)',
    color: '#08210f',
    boxShadow: '0 8px 18px rgba(101,212,140,0.24)',
  },
  ctaSecondary: {
    background: 'linear-gradient(180deg, #182330 0%, #131c27 100%)',
    color: '#dbe7f2',
    border: '1px solid #2a3441',
  },
  subcopy: {
    textAlign: 'center',
    color: '#94a4b7',
    fontSize: 12,
    marginTop: 10,
  },
  trustRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
    flexWrap: 'wrap',
    marginTop: 20,
  },
  trustItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    color: '#a7b6c7',
    fontSize: 12,
    fontWeight: 700,
  },
  note: {
    textAlign: 'center',
    color: '#7f8c9b',
    fontSize: 12,
    marginTop: 20,
  },
  err: {
    color: '#ff9393',
    background: 'rgba(255, 67, 67, 0.08)',
    border: '1px solid rgba(255, 67, 67, 0.25)',
    padding: '10px 12px',
    borderRadius: 10,
    marginTop: 10,
    fontSize: 13,
  },
  small: {
    fontSize: 12,
    color: '#8ba0b4',
    marginTop: 8,
  },
};

function LockIcon(props: { size?: number; color?: string }) {
  const { size = 16, color = '#a7b6c7' } = props;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 10V8a6 6 0 1 1 12 0v2" stroke={color} strokeWidth="2" />
      <rect x="4" y="10" width="16" height="10" rx="2" stroke={color} strokeWidth="2" />
      <circle cx="12" cy="15" r="2" fill={color} />
    </svg>
  );
}

function CheckIcon(props: { size?: number; color?: string }) {
  const { size = 16, color = '#65d48c' } = props;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20 6L9 17l-5-5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LightningIcon(props: { size?: number; color?: string }) {
  const { size = 16, color = '#d7ffea' } = props;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" fill={color} />
    </svg>
  );
}

function BottleIcon(props: { size?: number; color?: string }) {
  const { size = 16, color = '#cfe7db' } = props;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path d="M9 2h6v3a3 3 0 0 1-3 3h0a3 3 0 0 1-3-3V2Z" fill={color} />
      <rect x="7" y="7" width="10" height="15" rx="3" fill={color} opacity="0.7" />
    </svg>
  );
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

export default function PricingCTA() {
  const [quantity, setQuantity] = useState<number>(3);
  const [loadingPlan, setLoadingPlan] = useState<Plan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pricing = useMemo(() => {
    // price per bottle tiers
    const tiers = {
      subscribe: { 1: 39, 3: 35, 6: 32 } as Record<number, number>,
      'one-time': { 1: 49, 3: 45, 6: 39 } as Record<number, number>,
    };
    const perBottleSub = tiers.subscribe[quantity as 1 | 3 | 6] ?? 39;
    const perBottleOnce = tiers['one-time'][quantity as 1 | 3 | 6] ?? 49;

    return {
      perBottleSub,
      perBottleOnce,
      totalSub: perBottleSub * quantity,
      totalOnce: perBottleOnce * quantity,
      savePerBottle: perBottleOnce - perBottleSub,
      saveTotal: (perBottleOnce - perBottleSub) * quantity,
    };
  }, [quantity]);

  const handleCheckout = async (plan: Plan) => {
    try {
      setError(null);
      setLoadingPlan(plan);
      const endpoint = plan === 'subscribe' ? '/api/subscribe' : '/api/checkout';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quantity,
          plan,
          // these can be used by backend if needed
          item: 'Muscle Recovery Supplement',
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to start checkout.');
      }
      const data = (await res.json()) as { url?: string; message?: string };
      if (data?.url) {
        window.location.href = data.url;
      } else {
        setError(data?.message || 'Unexpected response. Please try again.');
      }
    } catch (e: any) {
      setError(e?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section id="pricing" aria-labelledby="pricing-heading" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.headerWrap}>
          <div style={styles.eyebrow}>Limited-Time Offer</div>
          <h2 id="pricing-heading" style={styles.h2}>Choose your recovery plan</h2>
          <p style={styles.sub}>Clinically-dosed formula: BCAAs 500 mg • Glutamine 400 mg • Protein 600 mg • Electrolytes 100 mg</p>
        </div>

        <div style={styles.quantityWrap}>
          <span style={styles.qtyLabel}>Select quantity:</span>
          {[1, 3, 6].map((q) => {
            const active = q === quantity;
            return (
              <button
                key={q}
                type="button"
                aria-pressed={active}
                onClick={() => setQuantity(q)}
                style={{ ...styles.qtyBtn, ...(active ? styles.qtyBtnActive : {}) }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <BottleIcon size={16} />
                  {q} {q === 1 ? 'Bottle' : 'Bottles'}
                </span>
              </button>
            );
          })}
        </div>

        <div style={styles.grid}>
          <article style={{ ...styles.card, ...styles.featured }} aria-label="Subscribe and Save">
            <div style={styles.badge}>Best Value</div>
            <div style={styles.cardHeader}>
              <h3 style={styles.planName}>Subscribe & Save</h3>
              <div style={styles.planTag}>Cancel anytime</div>
            </div>
            <div style={styles.priceWrap}>
              <div style={styles.price}>{formatCurrency(pricing.perBottleSub)}</div>
              <div style={styles.per}>per bottle</div>
            </div>
            <div style={styles.savings}>Save {formatCurrency(pricing.savePerBottle)} per bottle • {formatCurrency(pricing.saveTotal)} total vs. one-time</div>
            <div style={styles.total}>Today's total: {formatCurrency(pricing.totalSub)} • Renews based on selected quantity</div>

            <ul style={styles.features} aria-label="Subscription benefits">
              <li style={{ ...styles.feature, ...styles.featureFirst }}>
                <CheckIcon />
                15% off + priority stock
              </li>
              <li style={styles.feature}>
                <CheckIcon />
                Free US shipping on every delivery
              </li>
              <li style={styles.feature}>
                <CheckIcon />
                Flexible schedule, skip or cancel anytime
              </li>
              <li style={styles.feature}>
                <CheckIcon />
                60-day money-back guarantee
              </li>
            </ul>

            <button
              type="button"
              onClick={() => handleCheckout('subscribe')}
              disabled={loadingPlan === 'subscribe'}
              style={{ ...styles.ctaBtn, ...styles.ctaPrimary, opacity: loadingPlan === 'subscribe' ? 0.7 : 1 }}
              aria-busy={loadingPlan === 'subscribe'}
            >
              {loadingPlan === 'subscribe' ? 'Starting secure checkout…' : 'Start Subscription'}
            </button>
            <div style={styles.subcopy}>Ships immediately • Manage deliveries in your account</div>
            {error && loadingPlan === null && (
              <div role="alert" style={styles.err}>{error}</div>
            )}
          </article>

          <article style={styles.card} aria-label="One-Time Purchase">
            <div style={styles.cardHeader}>
              <h3 style={styles.planName}>One-Time Purchase</h3>
              <div style={{ ...styles.planTag, borderColor: '#2a3441', background: 'rgba(255,255,255,0.03)', color: '#a9b6c4' }}>No subscription</div>
            </div>
            <div style={styles.priceWrap}>
              <div style={styles.price}>{formatCurrency(pricing.perBottleOnce)}</div>
              <div style={styles.per}>per bottle</div>
            </div>
            <div style={styles.total}>Total today: {formatCurrency(pricing.totalOnce)} for {quantity} {quantity === 1 ? 'bottle' : 'bottles'}</div>

            <ul style={styles.features} aria-label="One-time purchase benefits">
              <li style={{ ...styles.feature, ...styles.featureFirst }}>
                <CheckIcon />
                Fast recovery support: BCAAs, Glutamine, Protein, Electrolytes
              </li>
              <li style={styles.feature}>
                <CheckIcon />
                Free US shipping on 3+ bottles
              </li>
              <li style={styles.feature}>
                <CheckIcon />
                60-day money-back guarantee
              </li>
              <li style={styles.feature}>
                <CheckIcon />
                Made in USA • GMP certified
              </li>
            </ul>

            <button
              type="button"
              onClick={() => handleCheckout('one-time')}
              disabled={loadingPlan === 'one-time'}
              style={{ ...styles.ctaBtn, ...styles.ctaSecondary, opacity: loadingPlan === 'one-time' ? 0.7 : 1 }}
              aria-busy={loadingPlan === 'one-time'}
            >
              {loadingPlan === 'one-time' ? 'Starting secure checkout…' : 'Buy Now'}
            </button>
            <div style={styles.small}>No commitment • One-time charge only</div>
            {error && loadingPlan === null && (
              <div role="alert" style={styles.err}>{error}</div>
            )}
          </article>
        </div>

        <div style={styles.trustRow} aria-label="Trust and security">
          <div style={styles.trustItem}>
            <LockIcon />
            SSL Secure Checkout
          </div>
          <div style={styles.trustItem}>
            <LightningIcon />
            Fast shipping from USA
          </div>
          <div style={styles.trustItem}>
            <CheckIcon />
            60-Day Money-Back Guarantee
          </div>
        </div>

        <p style={styles.note}>
          Each bottle includes 30 servings. Formula per serving: BCAAs 500 mg • Glutamine 400 mg • Protein 600 mg • Electrolytes 100 mg.
          Consult your physician before use if you are pregnant, nursing, or have a medical condition.
        </p>
      </div>
    </section>
  );
}