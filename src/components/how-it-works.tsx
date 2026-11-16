'use client';

import { useEffect, useRef, useState } from 'react';

import { PhoneFrame, STEP_SCREENS } from '@/components/phone';
import type { Step } from '@/content/site';

/**
 * Three steps beside one phone. As each step reaches the middle of the screen the phone shows that
 * step's app screen. On narrow screens each step carries its own screen instead.
 */
export function HowItWorks({ steps, details }: { steps: Step[]; details: string[][] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i)); }),
      { rootMargin: '-45% 0px -45% 0px' },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="story">
      <ol className="story__steps">
        {steps.map((s, i) => {
          const S = STEP_SCREENS[i];
          return (
            <li key={s.title} ref={(el) => { refs.current[i] = el; }} data-i={i} data-active={i === active} className="story__step">
              <span className="story__num" aria-hidden>{i + 1}</span>
              <h3 className="story__title">{s.title}</h3>
              <p className="story__body">{s.body}</p>
              <ul className="story__chips">{details[i]?.map((d) => <li key={d}>{d}</li>)}</ul>
              <div className="story__mini"><PhoneFrame className="phone--mini"><S /></PhoneFrame></div>
            </li>
          );
        })}
      </ol>
      <div className="story__stage">
        <PhoneFrame>
          {STEP_SCREENS.map((S, i) => (
            <div key={i} className="story__screen" data-active={i === active}><S /></div>
          ))}
        </PhoneFrame>
        <div className="story__progress" aria-hidden>
          {steps.map((s, i) => <span key={s.title} data-active={i <= active} />)}
        </div>
      </div>
    </div>
  );
}
