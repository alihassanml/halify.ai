import { useState } from 'react';
import Reveal from './Reveal';

const FAQS = [
  { q: 'How long does a project take?', a: 'Project timelines depend on complexity. Small projects typically require two to four weeks, while enterprise platforms may take several months.' },
  { q: 'Can you improve existing software?', a: 'Yes. We modernize legacy systems, add AI capabilities, improve performance, and expand existing products.' },
  { q: 'Do you provide post-launch support?', a: 'Yes. We offer maintenance, monitoring, optimization, and continuous feature development after launch.' },
  { q: 'Can you sign an NDA?', a: 'Absolutely. Client confidentiality and data security are priorities for every engagement.' },
  { q: 'Do you work with startups?', a: 'Yes. We collaborate with startups, SMEs, and enterprise organizations worldwide.' },
  { q: 'How do we get started?', a: 'Book a call using the button above. We\'ll discuss your goals, scope the work, and follow up with a proposal within 48 hours.' },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-28 max-w-container mx-auto px-6">
      <Reveal className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-sm font-semibold text-primary uppercase tracking-wide">FAQ</span>
        <h2 className="font-display font-bold text-3xl md:text-[40px] tracking-tight text-ink mt-3 mb-4">
          Frequently asked questions
        </h2>
      </Reveal>

      <div className="max-w-2xl mx-auto divide-y divide-line border-t border-b border-line">
        {FAQS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.q}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 py-6 text-left"
              >
                <span className="font-display font-semibold text-base sm:text-lg text-ink">{item.q}</span>
                <span
                  className={`shrink-0 w-8 h-8 rounded-full border border-line flex items-center justify-center text-ink transition-transform duration-300 ${
                    isOpen ? 'rotate-45 bg-ink text-white border-ink' : ''
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              <div className={`accordion-panel ${isOpen ? 'is-open' : ''}`}>
                <div>
                  <p className="text-ink-soft text-[15px] leading-relaxed pb-6 pr-12">{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FAQ;
