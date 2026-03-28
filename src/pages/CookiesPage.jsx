export default function CookiesPage() {
  return (
    <section className="min-h-screen pt-32 pb-24 px-6" style={{ background: '#090b0f' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-px bg-amber/60" />
          <span className="text-xs uppercase tracking-[0.28em] text-amber/80">Legal</span>
        </div>
        <h1 className="font-serif text-5xl text-white mb-3 tracking-wide">Cookie Policy</h1>
        <p className="text-xs uppercase tracking-widest text-muted/40 mb-16">Last updated — coming soon</p>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '48px' }}>
          <p className="text-silver/50 text-sm leading-loose mb-12">
            Friday's Fragrance uses cookies to improve your experience. This policy explains what cookies we use and why.
            A full cookie management interface will be available before public launch.
          </p>

          {[
            { title: 'What Are Cookies', body: 'Cookies are small text files placed on your device when you visit a website. They help us remember your preferences and understand how you interact with our site.' },
            { title: 'Essential Cookies', body: 'These are required for the site to function — including your shopping cart, session authentication, and security features. They cannot be disabled.' },
            { title: 'Analytics Cookies', body: 'We use anonymized analytics to understand which pages are visited and how users navigate the site. This helps us improve the experience for everyone.' },
            { title: 'Marketing Cookies', body: 'If you opt in, we use cookies to show you relevant Friday\'s content and offers across partner platforms. You can opt out at any time.' },
            { title: 'Managing Cookies', body: 'You can control cookies through your browser settings. Note that disabling certain cookies may affect site functionality.' },
            { title: 'Contact', body: 'For cookie-related questions, contact us at privacy@fridaysfragrance.com.' },
          ].map(({ title, body }) => (
            <div key={title} style={{ marginBottom: '40px', paddingBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <h2 className="font-serif text-xl text-white mb-3">{title}</h2>
              <p className="text-silver/55 text-sm leading-loose">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
