import { useEffect, useRef, useState } from 'react';
import { ActiveClock } from './training';

export function useQuestionTimer() {
  const [clock] = useState(() => {
    const value = new ActiveClock();
    if (document.visibilityState !== 'hidden' && document.hasFocus())
      value.resume(performance.now());
    return value;
  });
  const [elapsedMs, setElapsed] = useState(0);
  const [paused, setPaused] = useState(
    !document.hasFocus() || document.visibilityState === 'hidden',
  );
  const [autoPaused, setAutoPaused] = useState(
    !document.hasFocus() || document.visibilityState === 'hidden',
  );
  const [manualPaused, setManualPaused] = useState(false);
  const manual = useRef(false);
  const frozen = useRef(false);
  const focused = useRef(document.hasFocus());
  const syncRef = useRef<() => void>(() => {});
  useEffect(() => {
    const sync = () => {
      const stop =
        frozen.current ||
        manual.current ||
        !focused.current ||
        document.visibilityState === 'hidden';
      if (stop) clock.pause(performance.now());
      else clock.resume(performance.now());
      setPaused(stop);
      setAutoPaused(!focused.current || document.visibilityState === 'hidden');
      setElapsed(clock.elapsed(performance.now()));
    };
    syncRef.current = sync;
    const blur = () => {
      focused.current = false;
      sync();
    };
    const focus = () => {
      focused.current = true;
      sync();
    };
    window.addEventListener('blur', blur);
    window.addEventListener('focus', focus);
    document.addEventListener('visibilitychange', sync);
    // Reattach after StrictMode's cleanup without losing accumulated time.
    if (
      !frozen.current &&
      !manual.current &&
      focused.current &&
      document.visibilityState !== 'hidden'
    )
      clock.resume(performance.now());
    const interval = window.setInterval(
      () => setElapsed(clock.elapsed(performance.now())),
      250,
    );
    return () => {
      clock.pause(performance.now());
      window.clearInterval(interval);
      window.removeEventListener('blur', blur);
      window.removeEventListener('focus', focus);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [clock]);
  return {
    elapsedMs,
    paused,
    autoPaused,
    manualPaused,
    togglePause() {
      if (!focused.current || document.visibilityState === 'hidden') return;
      manual.current = !manual.current;
      setManualPaused(manual.current);
      syncRef.current();
    },
    finish() {
      frozen.current = true;
      const ms = clock.pause(performance.now());
      setElapsed(ms);
      return ms;
    },
  };
}
