export default function TermsPage() {
  return (
    <section className="min-h-screen pt-32 pb-24 px-6" style={{ background: '#090b0f' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-px bg-amber/60" />
          <span className="text-xs uppercase tracking-[0.28em] text-amber/80">Legal</span>
        </div>
        <h1 className="font-serif text-5xl text-white mb-3 tracking-wide">Terms of Service</h1>
        <p className="text-xs uppercase tracking-widest text-muted/40 mb-16">Last updated — coming soon</p>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '48px' }}>
          <p className="text-silver/50 text-sm leading-loose mb-12">
            These terms govern your use of Friday's Fragrance and its services. By accessing or purchasing from our store, you agree to the following conditions.
            Full terms will be published here before our public launch.
          </p>

          {[
            { title: 'Acceptance of Terms', body: 'By using our website and purchasing our products, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.' },
            { title: 'Products & Pricing', body: 'All prices are listed in USD. We reserve the right to modify prices at any time. Product descriptions are made in good faith, but we do not warrant that descriptions are complete or error-free.' },
            { title: 'Orders & Payment', body: 'By placing an order, you represent that you are authorized to use the payment method provided. We reserve the right to cancel or refuse any order at our discretion.' },
            { title: 'Shipping & Returns', body: 'Orders are processed within 1–3 business days. Returns are accepted within 14 days of delivery for unopened, unused products in original packaging.' },
            { title: 'Intellectual Property', body: 'All content on this site — including text, graphics, logos, and product images — is the property of Friday\'s Fragrance and may not be reproduced without written permission.' },
            { title: 'Contact', body: 'For any questions regarding these terms, contact us at legal@fridaysfragrance.com.' },
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
