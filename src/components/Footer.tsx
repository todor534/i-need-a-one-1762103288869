import React, { useState } from 'react';

const styles: { [k: string]: React.CSSProperties } = {
  footer: {
    backgroundColor: '#0a0e14',
    color: '#e6edf5',
    padding: '48px 20px 20px',
    borderTop: '1px solid rgba(255,255,255,0.08)',
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
  },
  topRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 32,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  brandCol: {
    flex: '1 1 260px',
    minWidth: 220,
  },
  navCol: {
    flex: '1 1 220px',
    minWidth: 180,
  },
  subscribeCol: {
    flex: '1 1 320px',
    minWidth: 260,
  },
  logoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  logoImg: {
    width: 40,
    height: 40,
    objectFit: 'contain',
  },
  brandName: {
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: 0.3,
  },
  tagline: {
    margin: '6px 0 0',
    color: '#b7c2cf',
    fontSize: 14,
    lineHeight: 1.5,
  },
  navTitle: {
    fontSize: 14,
    color: '#9fb0c3',
    marginBottom: 10,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  navList: {
    display: 'grid',
    gap: 8,
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  navLink: {
    color: '#e6edf5',
    textDecoration: 'none',
    fontSize: 14,
    opacity: 0.9,
  },
  navLinkHover: {
    textDecoration: 'underline',
  },
  subscribeTitle: {
    fontSize: 14,
    color: '#9fb0c3',
    marginBottom: 10,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  subscribeText: {
    color: '#b7c2cf',
    fontSize: 14,
    lineHeight: 1.5,
    margin: '0 0 12px',
  },
  form: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    width: '100%',
  },
  input: {
    flex: 1,
    minWidth: 0,
    background: '#0f141b',
    border: '1px solid rgba(255,255,255,0.12)',
    color: '#e6edf5',
    borderRadius: 8,
    padding: '10px 12px',
    fontSize: 14,
    outline: 'none',
  },
  button: {
    background: '#27c17a',
    color: '#071017',
    border: 'none',
    borderRadius: 8,
    padding: '10px 14px',
    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
  },
  formNote: {
    fontSize: 12,
    color: '#94a6ba',
    marginTop: 8,
  },
  feedback: {
    marginTop: 8,
    fontSize: 13,
  },
  success: {
    color: '#27c17a',
  },
  error: {
    color: '#ff6b6b',
  },
  divider: {
    height: 1,
    background: 'rgba(255,255,255,0.08)',
    margin: '28px 0',
  },
  badgesRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  payments: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  badgeImg: {
    height: 22,
    width: 'auto',
    objectFit: 'contain',
    filter: 'grayscale(0)',
  },
  secureRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  bottomRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  legal: {
    color: '#8ea1b5',
    fontSize: 12,
    lineHeight: 1.6,
  },
  legalLinks: {
    display: 'flex',
    gap: 12,
    alignItems: 'center',
    fontSize: 12,
  },
  legalLink: {
    color: '#b7c2cf',
    textDecoration: 'none',
    opacity: 0.9,
  },
  disclaimer: {
    color: '#94a6ba',
    fontSize: 12,
    lineHeight: 1.6,
    marginTop: 12,
  },
};

function Footer(): JSX.Element {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  const year = new Date().getFullYear();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }
    try {
      setStatus('loading');
      setMessage('');
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        throw new Error('Request failed');
      }
      setStatus('success');
      setMessage('Thanks! You’re subscribed.');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <footer style={styles.footer} role="contentinfo">
      <div style={styles.container}>
        <div style={styles.topRow}>
          <div style={styles.brandCol}>
            <div style={styles.logoRow}>
              <img src="https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762102868767-img-logo.png" alt="Brand logo" style={styles.logoImg} />
              <div style={styles.brandName}>RecoverX</div>
            </div>
            <p style={styles.tagline}>
              Clean, effective recovery support crafted for athletes and high-performers.
            </p>
          </div>

          <nav style={styles.navCol} aria-label="Footer">
            <div style={styles.navTitle}>Explore</div>
            <ul style={styles.navList}>
              <li><a href="#benefits" style={styles.navLink}>Benefits</a></li>
              <li><a href="#ingredients" style={styles.navLink}>Ingredients</a></li>
              <li><a href="#how-it-works" style={styles.navLink}>How It Works</a></li>
              <li><a href="#testimonials" style={styles.navLink}>Testimonials</a></li>
              <li><a href="#pricing" style={styles.navLink}>Pricing</a></li>
              <li><a href="#faq" style={styles.navLink}>FAQ</a></li>
            </ul>
          </nav>

          <div style={styles.subscribeCol}>
            <div style={styles.subscribeTitle}>Stay in the loop</div>
            <p style={styles.subscribeText}>
              Get recovery tips and early access to promos. One-click unsubscribe anytime.
            </p>
            <form onSubmit={onSubmit} style={styles.form} noValidate>
              <input
                type="email"
                name="email"
                aria-label="Email address"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                disabled={status === 'loading'}
                required
              />
              <button
                type="submit"
                style={styles.button}
                disabled={status === 'loading'}
                aria-live="polite"
              >
                {status === 'loading' ? 'Submitting...' : 'Subscribe'}
              </button>
            </form>
            {message ? (
              <div
                style={{
                  ...styles.feedback,
                  ...(status === 'success' ? styles.success : styles.error),
                }}
                role={status === 'error' ? 'alert' : 'status'}
              >
                {message}
              </div>
            ) : null}
            <div style={styles.formNote}>We respect your privacy. No spam.</div>
          </div>
        </div>

        <div style={styles.divider} />

        <div style={styles.badgesRow}>
          <div style={styles.payments} aria-label="Accepted payment methods">
            <img src="https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762102916339-img-payment-visa.png" alt="Visa" style={styles.badgeImg} />
            <img src="https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762102954988-img-payment-mastercard.png" alt="Mastercard" style={styles.badgeImg} />
            <img src="https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762102993621-img-payment-amex.png" alt="American Express" style={styles.badgeImg} />
            <img src="https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762103049806-img-payment-paypal.png" alt="PayPal" style={styles.badgeImg} />
          </div>
          <div style={styles.secureRow}>
            <img src="https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762102157304-img-secure.png" alt="Secure checkout" style={styles.badgeImg} />
            <span style={{ color: '#b7c2cf', fontSize: 13 }}>
              256-bit SSL encryption • Secure checkout
            </span>
          </div>
        </div>

        <div style={styles.divider} />

        <div style={styles.bottomRow}>
          <div style={styles.legal}>
            © {year} RecoverX. All rights reserved.
          </div>
          <div style={styles.legalLinks}>
            <a href="#privacy" style={styles.legalLink}>Privacy</a>
            <a href="#terms" style={styles.legalLink}>Terms</a>
            <a href="#refund" style={styles.legalLink}>Refund Policy</a>
            <a href="mailto:support@recoverx.com" style={styles.legalLink}>Contact</a>
          </div>
        </div>

        <p style={styles.disclaimer}>
          Disclaimer: This product is a dietary supplement. Statements on this site have not been
          evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent
          any disease. Consult your physician before use if you are pregnant, nursing, have a
          medical condition, or are taking medications.
        </p>
      </div>
    </footer>
  );
}

export default Footer;