export default function PrivacyPage() {
  return (
    <section className="min-h-screen pt-32 pb-24 px-6" style={{ background: '#090b0f' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-px bg-amber/60" />
          <span className="text-xs uppercase tracking-[0.28em] text-amber/80">Legal</span>
        </div>
        <h1 className="font-serif text-[clamp(2.2rem,4vw,3.2rem)] text-white mb-3 tracking-wide">Privacy Policy</h1>
        <p className="text-xs uppercase tracking-widest text-muted/40 mb-16">Last updated — coming soon</p>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '48px' }}>
          <p className="text-silver/50 text-sm leading-loose mb-12">
            This page is under construction. Friday's Fragrance is committed to protecting your privacy.
            Our full privacy policy — covering data collection, usage, storage, and your rights — will be published here before our public launch.
          </p>

          {[
            { title: 'Information We Collect', body: 'We collect information you provide directly to us, such as your name, email address, shipping address, and payment information when you make a purchase or create an account.' },
            { title: 'How We Use Your Information', body: 'We use the information we collect to process transactions, send transactional and promotional communications, and improve our services.' },
            { title: 'Data Retention', body: 'We retain personal information for as long as necessary to fulfill the purposes for which it was collected, including legal, accounting, or reporting requirements.' },
            { title: 'Your Rights', body: 'Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, or delete your data.' },
            { title: 'Contact', body: 'If you have questions about this policy, please contact us at privacy@fridaysfragrance.com.' },
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
