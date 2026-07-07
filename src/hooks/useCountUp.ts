import { useEffect, useState } from 'react';

const PARTS_RE = /^(\D*)([\d.]+)(.*)$/;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function useCountUp(target: string, start: boolean, duration = 1200) {
  const match = target.match(PARTS_RE);
  const [display, setDisplay] = useState(match ? `${match[1]}0${match[3]}` : target);

  useEffect(() => {
    if (!start || !match) {
      if (!match) setDisplay(target);
      return;
    }

    const [, prefix, numStr, suffix] = match;
    const endValue = parseFloat(numStr);
    const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
    let frame: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = (endValue * eased).toFixed(decimals);
      setDisplay(`${prefix}${current}${suffix}`);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, target]);

  return display;
}

export default useCountUp;
