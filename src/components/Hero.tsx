import { useEffect, useRef } from 'react';
import heroShape from '../assets/hero.png';
import Reveal from './Reveal';
import useInView from '../hooks/useInView';
import useCountUp from '../hooks/useCountUp';
import { IconArrowDown } from './icons';

const TRUST_ITEMS = [
  { value: '60+', label: 'Products shipped' },
  { value: '98%', label: 'Client retention' },
  { value: '24/7', label: 'Support coverage' },
];

function TrustStat({ value, label }: { value: string; label: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.6);
  const display = useCountUp(value, inView);

  return (
    <div ref={ref}>
      <div className="font-display font-bold text-2xl text-ink tabular-nums">{display}</div>
      <div className="text-sm text-ink-faint">{label}</div>
    </div>
  );
}

function Hero() {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      if (orbRef.current) {
        const offset = Math.min(window.scrollY * 0.12, 60);
        orbRef.current.style.transform = `translateY(${offset}px)`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="top" className="relative pt-40 pb-16 md:pt-48 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 grid-backdrop pointer-events-none" />
      <div
        className="absolute -top-24 right-[-10%] w-[520px] h-[520px] rounded-full bg-gradient-to-br from-primary-soft to-violet-soft blur-3xl opacity-70 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-container mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <Reveal delay={1}>
              <h1 className="font-display font-bold text-[42px] leading-[1.1] sm:text-[54px] sm:leading-[1.08] lg:text-[64px] lg:leading-[1.05] tracking-tight text-ink mb-6">
                Build AI products that drive{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet">
                  real business growth
                </span>
              </h1>
            </Reveal>

            <Reveal delay={2}>
              <p className="text-lg leading-relaxed text-ink-soft max-w-xl mb-10">
                Halify turns ideas into production-ready software  AI agents, RAG systems,
                full-stack apps, mobile, and cloud infrastructure  built to scale and engineered
                to deliver measurable results.
              </p>
            </Reveal>

            <Reveal delay={3}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-14">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 bg-ink text-white px-7 py-4 rounded-full font-semibold text-base w-full sm:w-auto hover:bg-primary transition-colors"
                >
                  Start Your Project
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  href="#work"
                  className="inline-flex items-center justify-center gap-2 bg-paper border border-line text-ink px-7 py-4 rounded-full font-semibold text-base w-full sm:w-auto hover:border-ink/30 transition-colors"
                >
                  View Case Studies
                </a>
              </div>
            </Reveal>

            <Reveal delay={4}>
              <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
                {TRUST_ITEMS.map((item) => (
                  <TrustStat key={item.label} value={item.value} label={item.label} />
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 relative hidden lg:block">
            <Reveal delay={2} className="relative">
              <div ref={orbRef} className="relative mx-auto w-full max-w-sm aspect-square flex items-center justify-center transition-transform duration-100 ease-out">
                <img
                  src={heroShape}
                  alt=""
                  className="hero-orb w-72 h-72 object-contain drop-shadow-2xl"
                />
                <div className="absolute top-6 -left-4 bg-paper border border-line rounded-2xl shadow-card px-4 py-3">
                  <div className="text-xs text-ink-faint mb-1">Deployment status</div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-success">
                    <span className="w-1.5 h-1.5 rounded-full bg-success" />
                    Live in production
                  </div>
                </div>
                <div className="absolute bottom-8 -right-6 bg-paper border border-line rounded-2xl shadow-card px-4 py-3">
                  <div className="text-xs text-ink-faint mb-1">Avg. delivery</div>
                  <div className="text-sm font-semibold text-ink">3–6 weeks</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={5} className="flex justify-center mt-16 md:mt-20">
          <a
            href="#services"
            className="group flex flex-col items-center gap-2 text-ink-faint hover:text-ink transition-colors"
          >
            <span className="text-xs font-semibold uppercase tracking-widest">Scroll to explore</span>
            <span className="w-9 h-9 rounded-full border border-line flex items-center justify-center animate-bounce group-hover:border-ink/30">
              <IconArrowDown className="w-4 h-4" />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export default Hero;
