import { useState, type FormEvent } from 'react';

const FOOTER_LINKS = {
  Services: [
    { label: 'AI Development', href: '#services' },
    { label: 'AI Agents', href: '#services' },
    { label: 'Full Stack Dev', href: '#services' },
    { label: 'Cloud & DevOps', href: '#services' },
  ],
  Company: [
    { label: 'Our Process', href: '#process' },
    { label: 'Case Studies', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
};

function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer className="bg-paper-alt pt-20 pb-10 border-t border-line">
      <div className="max-w-container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        <div className="md:col-span-5">
          <a href="#top" className="flex items-center gap-2.5 mb-5">
            <img alt="Halify Logo" className="w-9 h-9 rounded-lg object-contain" src="/logo.png" />
            <span className="font-display font-bold text-lg tracking-tight text-ink">Halify</span>
          </a>
          <p className="text-ink-soft text-[15px] leading-relaxed mb-6 max-w-sm">
            An AI-first software development studio building intelligent digital products for
            startups, growing businesses, and enterprise teams.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-ink-soft hover:text-primary transition-colors font-semibold text-sm">GitHub</a>
            <a href="#" className="text-ink-soft hover:text-primary transition-colors font-semibold text-sm">LinkedIn</a>
            <a href="mailto:hello@halify.ai" className="text-ink-soft hover:text-primary transition-colors font-semibold text-sm">Email</a>
          </div>
        </div>

        <div className="md:col-span-2">
          <h5 className="font-display font-semibold text-ink mb-5 text-sm">Services</h5>
          <ul className="space-y-3.5 text-ink-soft text-sm">
            {FOOTER_LINKS.Services.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-primary transition-colors">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h5 className="font-display font-semibold text-ink mb-5 text-sm">Company</h5>
          <ul className="space-y-3.5 text-ink-soft text-sm">
            {FOOTER_LINKS.Company.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-primary transition-colors">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h5 className="font-display font-semibold text-ink mb-5 text-sm">Stay Updated</h5>
          <p className="text-ink-soft text-sm mb-4">Get the latest insights on AI and software development.</p>
          {subscribed ? (
            <p className="text-sm font-semibold text-success">You're subscribed  thank you!</p>
          ) : (
            <form onSubmit={handleSubscribe} className="relative">
              <input
                required
                type="email"
                placeholder="Email address"
                className="w-full bg-paper border border-line rounded-xl pl-4 pr-12 py-3.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-1.5 top-1.5 bottom-1.5 aspect-square bg-ink text-white rounded-lg hover:bg-primary transition-colors flex items-center justify-center"
              >
                →
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="max-w-container mx-auto px-6 pt-8 border-t border-line-soft flex flex-col md:flex-row justify-between items-center gap-4 text-ink-faint text-sm">
        <p>© {new Date().getFullYear()} Halify. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
