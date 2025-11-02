import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type StickyCTAOptions = {
  targetId?: string; // Element to scroll to when CTA is clicked, and to hide CTA when visible
  sentinelTopId?: string; // Element near the top (e.g., hero). When out of view, CTA can appear
  footerId?: string; // Element near the bottom; when visible, hide CTA
  rootMargin?: string; // Root margin for intersection observers
  bottomBufferPx?: number; // Additional px from bottom to consider "near footer"
};

type UseStickyCTAResult = {
  visible: boolean;
  atBottom: boolean;
  onClick: () => void;
};

const getEl = (id?: string | null): HTMLElement | null => {
  if (!id) return null;
  return document.getElementById(id);
};

export function useStickyCTA(options?: StickyCTAOptions): UseStickyCTAResult {
  const {
    targetId = 'pricing',
    sentinelTopId = 'hero',
    footerId = 'footer',
    rootMargin = '0px',
    bottomBufferPx = 0,
  } = options || {};

  const [isTargetVisible, setIsTargetVisible] = useState(false);
  const [passedTopSentinel, setPassedTopSentinel] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

  const hasWindow = typeof window !== 'undefined';
  const supportsIO = hasWindow && typeof IntersectionObserver !== 'undefined';

  const targetEl = useMemo(() => (hasWindow ? getEl(targetId) : null), [hasWindow, targetId]);
  const topEl = useMemo(() => (hasWindow ? getEl(sentinelTopId) : null), [hasWindow, sentinelTopId]);
  const footerEl = useMemo(() => (hasWindow ? getEl(footerId) : null), [hasWindow, footerId]);

  const observersRef = useRef<IntersectionObserver[]>([]);

  const cleanupObservers = useCallback(() => {
    observersRef.current.forEach((obs) => {
      try {
        obs.disconnect();
      } catch {
        // ignore
      }
    });
    observersRef.current = [];
  }, []);

  // Compute visibility based on booleans
  const [visible, setVisible] = useState(false);
  const computeVisibility = useCallback(
    (vals?: { target?: boolean; top?: boolean; bottom?: boolean }) => {
      const curTarget = vals?.target ?? isTargetVisible;
      const curTop = vals?.top ?? passedTopSentinel;
      const curBottom = vals?.bottom ?? nearFooter;
      const next = curTop && !curTarget && !curBottom;
      setVisible(next);
    },
    [isTargetVisible, passedTopSentinel, nearFooter]
  );

  useEffect(() => {
    computeVisibility();
  }, [computeVisibility]);

  // IntersectionObserver strategy
  useEffect(() => {
    if (!supportsIO) return;

    cleanupObservers();

    // Observe target section to hide CTA when target is visible
    if (targetEl) {
      const targetObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          const v = !!entry?.isIntersecting;
          setIsTargetVisible(v);
          computeVisibility({ target: v });
        },
        {
          root: null,
          rootMargin,
          threshold: [0, 0.01, 0.1],
        }
      );
      targetObserver.observe(targetEl);
      observersRef.current.push(targetObserver);
    } else {
      // If no target, assume not visible
      setIsTargetVisible(false);
      computeVisibility({ target: false });
    }

    // Observe top sentinel (hero). When out of view, we say passedTopSentinel = true
    if (topEl) {
      const topObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          // If hero is not intersecting, we have passed it
          const passed = !entry?.isIntersecting;
          setPassedTopSentinel(passed);
          computeVisibility({ top: passed });
        },
        {
          root: null,
          rootMargin,
          threshold: [0, 0.01],
        }
      );
      topObserver.observe(topEl);
      observersRef.current.push(topObserver);
    } else {
      // Fallback: after slight scroll, consider passed
      const handle = () => {
        const scrolled = window.scrollY > 200;
        setPassedTopSentinel(scrolled);
        computeVisibility({ top: scrolled });
      };
      handle();
      window.addEventListener('scroll', handle, { passive: true });
      window.addEventListener('resize', handle);
      return () => {
        window.removeEventListener('scroll', handle);
        window.removeEventListener('resize', handle);
      };
    }

    // Observe footer to avoid overlaying bottom content
    if (footerEl) {
      const footerObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          let near = !!entry?.isIntersecting;
          if (bottomBufferPx && entry) {
            // If not intersecting but we're within bottomBufferPx from bottom, also mark near
            const viewportH = window.innerHeight || document.documentElement.clientHeight;
            const distFromBottom = document.documentElement.scrollHeight - (window.scrollY + viewportH);
            if (distFromBottom <= bottomBufferPx) near = true;
          }
          setNearFooter(near);
          computeVisibility({ bottom: near });
        },
        {
          root: null,
          rootMargin,
          threshold: [0, 0.01],
        }
      );
      footerObserver.observe(footerEl);
      observersRef.current.push(footerObserver);
    } else {
      // Fallback: calculate when near bottom by buffer
      const handle = () => {
        const viewportH = window.innerHeight || document.documentElement.clientHeight;
        const distFromBottom = document.documentElement.scrollHeight - (window.scrollY + viewportH);
        const near = distFromBottom <= Math.max(0, bottomBufferPx);
        setNearFooter(near);
        computeVisibility({ bottom: near });
      };
      handle();
      window.addEventListener('scroll', handle, { passive: true });
      window.addEventListener('resize', handle);
      return () => {
        window.removeEventListener('scroll', handle);
        window.removeEventListener('resize', handle);
      };
    }

    return () => {
      cleanupObservers();
    };
  }, [supportsIO, targetEl, topEl, footerEl, rootMargin, bottomBufferPx, cleanupObservers, computeVisibility]);

  // No-IO full fallback (older browsers). If supportsIO true, this effect essentially no-ops.
  useEffect(() => {
    if (supportsIO) return;
    if (!hasWindow) return;

    const calc = () => {
      const winH = window.innerHeight || document.documentElement.clientHeight;

      // Target visible?
      let targetVisible = false;
      if (targetEl) {
        const r = targetEl.getBoundingClientRect();
        targetVisible = r.top < winH && r.bottom > 0;
      }

      // Passed top sentinel?
      let passedTop = false;
      if (topEl) {
        const r = topEl.getBoundingClientRect();
        passedTop = r.bottom <= 0; // top el is above viewport
      } else {
        passedTop = window.scrollY > 200;
      }

      // Near footer?
      let bottomNear = false;
      if (footerEl) {
        const r = footerEl.getBoundingClientRect();
        bottomNear = r.top < winH && r.bottom > 0;
      } else {
        const distFromBottom =
          document.documentElement.scrollHeight - (window.scrollY + winH);
        bottomNear = distFromBottom <= Math.max(0, bottomBufferPx);
      }

      setIsTargetVisible(targetVisible);
      setPassedTopSentinel(passedTop);
      setNearFooter(bottomNear);
      setVisible(passedTop && !targetVisible && !bottomNear);
    };

    calc();
    window.addEventListener('scroll', calc, { passive: true });
    window.addEventListener('resize', calc);
    return () => {
      window.removeEventListener('scroll', calc);
      window.removeEventListener('resize', calc);
    };
  }, [supportsIO, hasWindow, targetEl, topEl, footerEl, bottomBufferPx]);

  const onClick = useCallback(() => {
    if (!hasWindow) return;
    const el = targetEl || document.querySelector('[data-cta-target="pricing"]') as HTMLElement | null;
    if (el && typeof el.scrollIntoView === 'function') {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    // Fallback: scroll to top of page if target not found
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [hasWindow, targetEl]);

  return {
    visible,
    atBottom: nearFooter,
    onClick,
  };
}

export default useStickyCTA;