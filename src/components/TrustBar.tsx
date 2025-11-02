import React from 'react';

const styles: { [k: string]: React.CSSProperties } = {
  bar: {
    width: '100%',
    background: '#ffffff',
    borderTop: '1px solid rgba(0,0,0,0.06)',
    borderBottom: '1px solid rgba(0,0,0,0.06)',
  },
  inner: {
    maxWidth: 1100,
    margin: '0 auto',
    padding: '10px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    flexWrap: 'wrap',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '6px 8px',
    borderRadius: 8,
    background: 'rgba(0,0,0,0.02)',
    flex: '1 1 220px',
    minWidth: 220,
  },
  icon: {
    width: 28,
    height: 28,
    objectFit: 'contain',
    display: 'block',
    flexShrink: 0,
  },
  textWrap: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.1,
  },
  heading: {
    fontSize: 14,
    fontWeight: 700,
    color: '#0f172a',
    letterSpacing: 0.2,
  },
  sub: {
    fontSize: 12,
    color: '#475569',
    marginTop: 2,
  },
  paymentsItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '6px 8px',
    borderRadius: 8,
    background: 'rgba(0,0,0,0.02)',
    flex: '2 1 280px',
    minWidth: 280,
  },
  paymentRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
    flexWrap: 'wrap',
  },
  paymentIcon: {
    height: 18,
    width: 'auto',
    objectFit: 'contain',
    display: 'block',
  },
};

export default function TrustBar(): JSX.Element {
  return (
    <div style={styles.bar} aria-label="Trust and security information">
      <div style={styles.inner} role="list">
        <div style={styles.item} role="listitem" aria-label="Secure checkout">
          <img
            src="https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762102157304-img-secure.png"
            alt="Secure checkout"
            style={styles.icon}
            loading="lazy"
          />
          <div style={styles.textWrap}>
            <span style={styles.heading}>Secure Checkout</span>
            <span style={styles.sub}>256-bit SSL encryption</span>
          </div>
        </div>

        <div style={styles.item} role="listitem" aria-label="Fast shipping">
          <img
            src="https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762102192992-img-shipping.png"
            alt="Fast shipping"
            style={styles.icon}
            loading="lazy"
          />
          <div style={styles.textWrap}>
            <span style={styles.heading}>Fast Shipping</span>
            <span style={styles.sub}>Orders ship within 24 hours</span>
          </div>
        </div>

        <div style={styles.item} role="listitem" aria-label="Money-back guarantee">
          <img
            src="https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762102255387-img-guarantee.png"
            alt="Money-back guarantee"
            style={styles.icon}
            loading="lazy"
          />
          <div style={styles.textWrap}>
            <span style={styles.heading}>Money‑Back Guarantee</span>
            <span style={styles.sub}>Risk-free, try it for yourself</span>
          </div>
        </div>

        <div style={styles.item} role="listitem" aria-label="Quality manufacturing">
          <img
            src="https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762102296579-img-quality.png"
            alt="Quality manufacturing"
            style={styles.icon}
            loading="lazy"
          />
          <div style={styles.textWrap}>
            <span style={styles.heading}>Quality Manufacturing</span>
            <span style={styles.sub}>Stringent quality standards</span>
          </div>
        </div>

        <div style={styles.paymentsItem} role="listitem" aria-label="Accepted payments">
          <img
            src="https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762102157304-img-secure.png"
            alt="Payments"
            style={styles.icon}
            loading="lazy"
          />
          <div style={styles.textWrap}>
            <span style={styles.heading}>We Accept</span>
            <div style={styles.paymentRow} aria-label="Payment methods">
              <img src="https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762102339277-img-visa.png" alt="Visa" style={styles.paymentIcon} loading="lazy" />
              <img src="https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762102374524-img-mastercard.png" alt="Mastercard" style={styles.paymentIcon} loading="lazy" />
              <img src="https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762102412199-img-amex.png" alt="American Express" style={styles.paymentIcon} loading="lazy" />
              <img src="https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762102454172-img-paypal.png" alt="PayPal" style={styles.paymentIcon} loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}