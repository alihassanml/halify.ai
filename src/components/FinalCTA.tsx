import { useState, type FormEvent } from 'react';
import Reveal from './Reveal';
import { IconCheck } from './icons';

function FinalCTA() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 md:py-28 max-w-container mx-auto px-6">
      <Reveal>
        <div className="relative rounded-3xl bg-ink px-8 py-16 md:p-16 overflow-hidden">
          <div
            className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-gradient-to-br from-primary to-violet blur-3xl opacity-30"
            aria-hidden="true"
          />
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display font-bold text-3xl md:text-[40px] tracking-tight text-white mb-5">
                Ready to build your next AI product?
              </h2>
              <p className="text-white/70 text-lg mb-4 max-w-md">
                Whether you're launching a startup, modernizing a platform, or integrating AI into
                your business, Halify has the expertise to turn your vision into reality.
              </p>
              <p className="text-white/90 font-semibold">
                Let's build intelligent software that delivers measurable business impact.
              </p>
            </div>

            <div className="bg-paper rounded-2xl p-6 sm:p-8">
              {submitted ? (
                <div className="py-10 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary-soft text-primary flex items-center justify-center mx-auto mb-4">
                    <IconCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-ink mb-2">Thanks  got it!</h3>
                  <p className="text-ink-soft text-sm">
                    We'll reply within one business day to schedule your call.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      required
                      type="text"
                      placeholder="Full name"
                      className="w-full bg-paper-alt border border-line rounded-xl px-4 py-3.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Work email"
                      className="w-full bg-paper-alt border border-line rounded-xl px-4 py-3.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                  </div>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell us about your project"
                    className="w-full bg-paper-alt border border-line rounded-xl px-4 py-3.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-ink text-white px-6 py-4 rounded-xl font-semibold text-sm hover:bg-primary transition-colors"
                  >
                    Start Your Project Today
                    <span aria-hidden="true">→</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default FinalCTA;
