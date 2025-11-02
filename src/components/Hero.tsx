import React from "react";

const styles: { [k: string]: React.CSSProperties } = {
  section: {
    width: "100%",
    boxSizing: "border-box",
    padding: "48px 20px",
    background: "linear-gradient(180deg, #ffffff 0%, #f7fbff 100%)",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "32px",
    flexWrap: "wrap",
  },
  left: {
    flex: "1 1 520px",
    minWidth: "300px",
  },
  eyebrow: {
    display: "inline-block",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#0B6AF0",
    background: "rgba(11,106,240,0.08)",
    padding: "6px 10px",
    borderRadius: "999px",
    marginBottom: "12px",
  },
  headline: {
    fontSize: "44px",
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
    fontWeight: 800,
    color: "#0B1B34",
    margin: "8px 0 12px",
  },
  subhead: {
    fontSize: "18px",
    lineHeight: 1.6,
    color: "#354e6b",
    margin: "0 0 20px",
  },
  highlights: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    margin: "18px 0 4px",
  },
  pill: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#0B1B34",
    background: "#E9F3FF",
    border: "1px solid #CFE6FF",
    padding: "6px 10px",
    borderRadius: "999px",
  },
  ratingRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "10px 0 18px",
    color: "#0B1B34",
  },
  stars: {
    fontSize: "16px",
    color: "#FFB800",
  },
  ctas: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "18px",
    flexWrap: "wrap",
  },
  primaryBtn: {
    appearance: "none",
    border: "none",
    cursor: "pointer",
    padding: "14px 20px",
    borderRadius: "10px",
    background: "linear-gradient(180deg, #0B6AF0 0%, #064BB9 100%)",
    color: "#fff",
    fontWeight: 700,
    fontSize: "16px",
    boxShadow: "0 8px 20px rgba(11,106,240,0.25)",
    transition: "transform 120ms ease, box-shadow 120ms ease",
  },
  secondaryBtn: {
    appearance: "none",
    cursor: "pointer",
    padding: "12px 18px",
    borderRadius: "10px",
    background: "#ffffff",
    color: "#0B6AF0",
    border: "2px solid #CFE6FF",
    fontWeight: 700,
    fontSize: "14px",
    transition: "transform 120ms ease, border-color 120ms ease",
  },
  guaranteeRow: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginTop: "14px",
    flexWrap: "wrap",
  },
  guaranteeItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#2a3e57",
    fontSize: "13px",
    background: "#f2f8ff",
    padding: "8px 10px",
    borderRadius: "8px",
    border: "1px solid #e5f1ff",
  },
  right: {
    flex: "1 1 420px",
    minWidth: "280px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  productCard: {
    width: "100%",
    maxWidth: "520px",
    background: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #E6ECF5",
    boxShadow: "0 12px 30px rgba(14, 32, 66, 0.08)",
    padding: "16px",
    boxSizing: "border-box",
  },
  productImageWrap: {
    width: "100%",
    overflow: "hidden",
    borderRadius: "12px",
    background: "#f7fbff",
  },
  productImage: {
    width: "100%",
    height: "auto",
    display: "block",
  },
  doseRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "8px",
    marginTop: "12px",
  },
  dosePill: {
    background: "#0B1B34",
    color: "#fff",
    padding: "10px",
    borderRadius: "10px",
    textAlign: "center",
  },
  doseTitle: {
    fontSize: "11px",
    opacity: 0.9,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },
  doseValue: {
    fontSize: "16px",
    fontWeight: 800,
    marginTop: "2px",
    letterSpacing: "-0.01em",
  },
  smallNote: {
    fontSize: "12px",
    color: "#6a819f",
    marginTop: "10px",
    textAlign: "center",
  },
};

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const Hero: React.FC = () => {
  return (
    <section id="hero" style={styles.section} aria-label="Muscle recovery supplement hero">
      <div style={styles.container}>
        <div style={styles.left}>
          <span style={styles.eyebrow}>New • Advanced Recovery Formula</span>
          <h1 style={styles.headline}>
            Recover Faster. Train Harder.
          </h1>
          <p style={styles.subhead}>
            Rebuild+ supercharges post‑workout recovery with a precise blend of BCAAs, Glutamine,
            complete Protein, and Electrolytes — designed to reduce soreness, repair muscle tissue,
            and rehydrate so you’re ready for your next session.
          </p>

          <div style={styles.highlights} aria-label="Key ingredient highlights">
            <span style={styles.pill}>BCAAs 500 mg</span>
            <span style={styles.pill}>Glutamine 400 mg</span>
            <span style={styles.pill}>Protein 600 mg</span>
            <span style={styles.pill}>Electrolytes 100 mg</span>
          </div>

          <div style={styles.ratingRow} aria-label="Customer rating">
            <span style={styles.stars}>★★★★★</span>
            <span style={{ fontWeight: 700, color: "#0B1B34" }}>4.9/5</span>
            <span style={{ color: "#6a819f" }}>Trusted by 2,300+ athletes</span>
          </div>

          <div style={styles.ctas}>
            <button
              style={styles.primaryBtn}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onClick={() => scrollToId("pricing")}
              aria-label="Get Rebuild Plus now"
            >
              Get Rebuild+ Now
            </button>
            <button
              style={styles.secondaryBtn}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onClick={() => scrollToId("ingredients")}
              aria-label="See full ingredient profile"
            >
              See Ingredients
            </button>
          </div>

          <div style={styles.guaranteeRow} aria-label="Trust and guarantees">
            <div style={styles.guaranteeItem}>
              <span role="img" aria-label="shield">🛡️</span>
              <span>60‑Day Money‑Back Guarantee</span>
            </div>
            <div style={styles.guaranteeItem}>
              <span role="img" aria-label="lab">🧪</span>
              <span>3rd‑Party Tested</span>
            </div>
            <div style={styles.guaranteeItem}>
              <span role="img" aria-label="flag">🇺🇸</span>
              <span>Made in USA • GMP Certified</span>
            </div>
          </div>
        </div>

        <div style={styles.right}>
          <div style={styles.productCard} aria-label="Product image and dosage">
            <div style={styles.productImageWrap}>
              <img
                src={"https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762101925792-img-hero.png"}
                alt="Rebuild+ Muscle Recovery Supplement"
                style={styles.productImage}
                loading="eager"
              />
            </div>
            <div style={styles.doseRow}>
              <div style={styles.dosePill}>
                <div style={styles.doseTitle}>BCAAs</div>
                <div style={styles.doseValue}>500 mg</div>
              </div>
              <div style={styles.dosePill}>
                <div style={styles.doseTitle}>Glutamine</div>
                <div style={styles.doseValue}>400 mg</div>
              </div>
              <div style={styles.dosePill}>
                <div style={styles.doseTitle}>Protein</div>
                <div style={styles.doseValue}>600 mg</div>
              </div>
              <div style={styles.dosePill}>
                <div style={styles.doseTitle}>Electrolytes</div>
                <div style={styles.doseValue}>100 mg</div>
              </div>
            </div>
            <div style={styles.smallNote}>
              Mix one scoop with 12–16 oz water post‑workout. For intense training,
              use intra‑workout for added hydration and endurance.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;