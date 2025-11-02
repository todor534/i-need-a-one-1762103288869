import { useCallback, useEffect, useMemo, useState } from 'react';

type StickyCTAProps = {
  // Optional: override price label and button label if needed
  priceLabel?: string;
  buttonLabel?: string;
};

export default function StickyCTA(props: StickyCTAProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const priceLabel = props.priceLabel ?? 'From $39 • 30-day supply';
  const buttonLabel = props.buttonLabel ?? 'Buy Now';

  useEffect(() => {
    try {
      const dismissedFlag = window.sessionStorage.getItem('sticky_cta_dismissed');
      if (dismissedFlag === '1') setDismissed(true);
    } catch {
      // ignore
    }
  }, []);

  const isElementInViewport = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    return rect.top < vh * 0.8 && rect.bottom > vh * 0.2;
  };

  const computeVisibility = useCallback(() => {
    if (dismissed) {
      setVisible(false);
      return;
    }
    const scrollY = window.scrollY || window.pageYOffset;
    const threshold = 240;
    let shouldShow = scrollY > threshold;

    // Hide when pricing section is in view (to avoid double CTA)
    const pricing = document.getElementById('pricing');
    if (pricing && isElementInViewport(pricing)) {
      shouldShow = false;
    }

    // Hide when footer is in view
    const footer = document.querySelector('footer');
    if (footer && footer instanceof HTMLElement && isElementInViewport(footer)) {
      shouldShow = false;
    }

    setVisible(shouldShow);
  }, [dismissed]);

  useEffect(() => {
    computeVisibility();
    const onScroll = () => computeVisibility();
    const onResize = () => computeVisibility();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [computeVisibility]);

  const handleBuyNow = useCallback(() => {
    const target =
      document.getElementById('pricing') ||
      document.getElementById('cta') ||
      document.getElementById('checkout');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  }, []);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    setVisible(false);
    try {
      window.sessionStorage.setItem('sticky_cta_dismissed', '1');
    } catch {
      // ignore
    }
  }, []);

  const styles = useMemo(() => {
    const base: React.CSSProperties = {
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0,
      transform: visible ? 'translateY(0)' : 'translateY(110%)',
      transition: 'transform 220ms ease, opacity 220ms ease',
      opacity: visible ? 1 : 0,
      zIndex: 999,
      background: 'rgba(255,255,255,0.9)',
      backdropFilter: 'saturate(140%) blur(8px)',
      boxShadow: '0 -6px 24px rgba(0,0,0,0.12)',
    };

    const wrap: React.CSSProperties = {
      maxWidth: 1100,
      margin: '0 auto',
      padding: '12px 16px',
      paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    };

    const badge: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: '#0f172a',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: 999,
      fontSize: 12,
      letterSpacing: 0.2,
      whiteSpace: 'nowrap',
    };

    const dot: React.CSSProperties = {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: '#22c55e',
      boxShadow: '0 0 0 3px rgba(34,197,94,0.25)',
      flex: '0 0 auto',
    };

    const content: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
      gap: 12,
      flexWrap: 'wrap',
    };

    const titleWrap: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      minWidth: 0,
      flex: 1,
    };

    const title: React.CSSProperties = {
      fontSize: 14,
      fontWeight: 700,
      color: '#0f172a',
      lineHeight: 1.2,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    };

    const tags: React.CSSProperties = {
      display: 'none',
      alignItems: 'center',
      gap: 8,
      color: '#334155',
      fontSize: 12,
      flexWrap: 'wrap',
    };

    const tag: React.CSSProperties = {
      border: '1px solid #e2e8f0',
      color: '#0f172a',
      background: '#f8fafc',
      borderRadius: 999,
      padding: '4px 8px',
      lineHeight: 1,
    };

    const price: React.CSSProperties = {
      fontWeight: 700,
      color: '#0f172a',
      fontSize: 14,
      whiteSpace: 'nowrap',
    };

    const actions: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    };

    const btn: React.CSSProperties = {
      appearance: 'none',
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      padding: '10px 16px',
      borderRadius: 10,
      fontWeight: 700,
      fontSize: 14,
      color: '#fff',
      background:
        'linear-gradient(180deg, #16a34a 0%, #16a34a 40%, #15803d 100%)',
      boxShadow:
        '0 6px 14px rgba(22,163,74,0.35), inset 0 1px 0 rgba(255,255,255,0.25)',
      transition: 'transform 80ms ease, box-shadow 120ms ease',
    };

    const btnHover: React.CSSProperties = {
      transform: 'translateY(-1px)',
      boxShadow:
        '0 10px 20px rgba(22,163,74,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
    };

    const ghost: React.CSSProperties = {
      appearance: 'none',
      border: '1px solid #e2e8f0',
      background: '#fff',
      color: '#0f172a',
      padding: '10px 12px',
      borderRadius: 10,
      fontWeight: 600,
      fontSize: 12,
      opacity: 0.9,
    };

    const close: React.CSSProperties = {
      appearance: 'none',
      border: 'none',
      background: 'transparent',
      color: '#64748b',
      padding: 8,
      borderRadius: 8,
      cursor: 'pointer',
      transition: 'background 120ms ease',
      flex: '0 0 auto',
    };

    const closeHover: React.CSSProperties = {
      background: '#f1f5f9',
      color: '#0f172a',
    };

    const responsive: React.CSSProperties = {
      // This object is here just for clarity. Media-query-like behavior is handled via JS below.
    };

    return {
      base,
      wrap,
      badge,
      dot,
      content,
      titleWrap,
      title,
      tags,
      tag,
      price,
      actions,
      btn,
      btnHover,
      ghost,
      close,
      closeHover,
      responsive,
    };
  }, [visible]);

  // Simple hover state to mimic :hover without CSS files
  const [hoverBuy, setHoverBuy] = useState(false);
  const [hoverClose, setHoverClose] = useState(false);

  // Responsive adjustments: show tags on wider screens
  const [showTags, setShowTags] = useState(false);
  useEffect(() => {
    const calc = () => setShowTags(window.innerWidth >= 840);
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  if (!visible) return null;

  return (
    <div style={styles.base} role="region" aria-label="Purchase call to action">
      <div style={styles.wrap}>
        <span style={styles.badge} aria-hidden="true">
          <span style={styles.dot} />
          Limited-time recovery boost
        </span>

        <div style={styles.content}>
          <div style={styles.titleWrap}>
            <div style={styles.title}>
              Recover faster with BCAAs + Glutamine
            </div>
            {showTags && (
              <div style={styles.tags}>
                <span style={styles.tag}>BCAAs 500 mg</span>
                <span style={styles.tag}>Glutamine 400 mg</span>
                <span style={styles.tag}>Protein 600 mg</span>
                <span style={styles.tag}>Electrolytes 100 mg</span>
              </div>
            )}
          </div>

          <div style={styles.actions}>
            <span style={styles.price} aria-label={`Price: ${priceLabel}`}>
              {priceLabel}
            </span>
            <button
              type="button"
              style={{ ...styles.btn, ...(hoverBuy ? styles.btnHover : {}) }}
              onMouseEnter={() => setHoverBuy(true)}
              onMouseLeave={() => setHoverBuy(false)}
              onClick={handleBuyNow}
              aria-label="Buy now"
            >
              {buttonLabel}
            </button>
            <button
              type="button"
              style={styles.ghost}
              onClick={handleBuyNow}
              aria-label="Subscribe and save"
              title="Subscribe & Save 15%"
            >
              Subscribe & Save 15%
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Hide this message"
          style={{ ...styles.close, ...(hoverClose ? styles.closeHover : {}) }}
          onMouseEnter={() => setHoverClose(true)}
          onMouseLeave={() => setHoverClose(false)}
        >
          ×
        </button>
      </div>
    </div>
  );
}