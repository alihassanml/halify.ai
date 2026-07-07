import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Work', href: '#work' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleLinkClick = () => setOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100]">
      <div
        className={`transition-all duration-300 ${
          scrolled ? 'bg-paper/90 shadow-nav backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-container mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5 shrink-0">
            <img alt="Halify Logo" className="w-9 h-9 rounded-lg object-contain" src="/logo.png" />
            <span className="font-display font-bold text-lg tracking-tight text-ink">Halify</span>
          </a>

          <div className="hidden md:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink-soft hover:text-ink transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 bg-ink text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-primary transition-colors"
            >
              Book a Call
            </a>
            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full border border-line text-ink"
            >
              <span className="relative w-5 h-4 block">
                <span
                  className={`absolute left-0 top-0 w-5 h-0.5 bg-ink rounded-full transition-all duration-300 ${
                    open ? 'rotate-45 top-[7px]' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] w-5 h-0.5 bg-ink rounded-full transition-all duration-300 ${
                    open ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 bottom-0 w-5 h-0.5 bg-ink rounded-full transition-all duration-300 ${
                    open ? '-rotate-45 bottom-[7px]' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      <div
        className={`md:hidden fixed inset-x-0 top-20 bottom-0 bg-paper transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col px-6 py-8 gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="text-lg font-semibold text-ink py-4 border-b border-line-soft"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={handleLinkClick}
            className="mt-6 inline-flex items-center justify-center bg-ink text-white px-6 py-4 rounded-full font-semibold text-base"
          >
            Book a Call
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
