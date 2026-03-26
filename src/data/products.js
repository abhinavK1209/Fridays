export const products = [
  {
    id: 'noir-ember',
    name: 'Noir Ember',
    tagline: 'The scent of ambition after dark.',
    description: 'An electrifying composition that opens with luminous clarity, deepens into smoky seduction, and settles into a warm, magnetic trail.',
    longDescription:
      "Noir Ember is the cornerstone of the Friday's collection — a bold olfactory statement designed for the moment when day transitions to night. The opening is bright and electric, charged with bergamot and black pepper. As the fragrance evolves, a heart of lavender absolute and saffron emerges — complex, magnetic, and undeniably sophisticated. The trail settles into an enduring foundation of amber resin and cedarwood musk, leaving a lasting impression that commands attention. High-concentration oil formula ensures projection for 12+ hours.",
    category: 'Eau de Parfum',
    sizes: [
      { ml: 30, price: 72, label: '30 ml' },
      { ml: 50, price: 108, label: '50 ml' },
      { ml: 100, price: 148, label: '100 ml' },
    ],
    defaultSize: 100,
    scentNotes: {
      top: ['Bergamot', 'Black Pepper', 'Iced Mandarin'],
      heart: ['Lavender Absolute', 'Saffron', 'Violet Leaf'],
      base: ['Amber Resin', 'Vetiver Smoke', 'Cedarwood Musk'],
    },
    ingredients:
      'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Benzyl Benzoate, Linalool, Limonene, Coumarin, Citronellol, Geraniol, Cinnamal, Eugenol, Benzyl Salicylate, Citral.',
    reviews: [
      { author: 'Marcus T.', rating: 5, text: 'The most sophisticated fragrance I\'ve owned. The amber base is unreal — lasts all day and into the next morning on fabric.', date: 'Jan 2025' },
      { author: 'Sophia R.', rating: 5, text: 'Wore this on a first date. Got three compliments within the first hour. Converted immediately.', date: 'Feb 2025' },
      { author: 'Jordan K.', rating: 4, text: 'Projection is incredible, longevity even more so. Easily 12 hours. The saffron in the heart is a nice touch.', date: 'Mar 2025' },
    ],
    bottleGradient: 'linear-gradient(160deg, rgba(20,24,32,0.95) 0%, rgba(50,60,82,0.9) 45%, rgba(18,22,30,0.98) 100%)',
    glowColor: 'rgba(90,139,255,0.45)',
    accentColor: '#5a8bff',
    badge: 'Bestseller',
    featured: true,
  },
  {
    id: 'midnight-alloy',
    name: 'Midnight Alloy',
    tagline: 'Industrial edge. Velvet finish.',
    description: 'A chrome-cool concentration of neroli, smoked incense, and polished woods. Engineered, not blended.',
    longDescription:
      'Midnight Alloy strips fragrance down to its architectural bones. Named for the precision of metallurgy, this extrait de parfum opens with a cold, clean neroli accord before revealing a smoky incense heart that is both meditative and arresting. The base is a study in contrasts — gleaming sandalwood against raw vetiver — creating a scent that feels engineered rather than blended. Wear it when you need to be unmistakable.',
    category: 'Extrait de Parfum',
    sizes: [
      { ml: 30, price: 88, label: '30 ml' },
      { ml: 50, price: 128, label: '50 ml' },
    ],
    defaultSize: 50,
    scentNotes: {
      top: ['Cold Neroli', 'Grey Musk', 'Aldehydes'],
      heart: ['Smoked Incense', 'Orris Root', 'Birch Tar'],
      base: ['Sandalwood', 'Vetiver', 'Iso E Super'],
    },
    ingredients:
      'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Benzyl Benzoate, Linalool, Limonene, Farnesol, Geraniol, Citronellol, Eugenol, Benzyl Alcohol, Butylphenyl Methylpropional.',
    reviews: [
      { author: 'Alex W.', rating: 5, text: 'Smoky without being overwhelming. The longevity is ridiculous — three days on my scarf.', date: 'Dec 2024' },
      { author: 'Nina P.', rating: 4, text: 'My new winter signature. Rich, complex, and unlike anything else in my collection.', date: 'Jan 2025' },
    ],
    bottleGradient: 'linear-gradient(160deg, rgba(25,28,40,0.95) 0%, rgba(48,56,80,0.9) 45%, rgba(20,24,36,0.98) 100%)',
    glowColor: 'rgba(200,210,255,0.3)',
    accentColor: '#c8d2ff',
    badge: 'New',
    featured: true,
  },
  {
    id: 'dusk-meridian',
    name: 'Dusk Meridian',
    tagline: 'The warmth between day and dark.',
    description: 'Golden hour captured in amber, rose oxide, and sun-warmed oud. Radiant, lush, enduring.',
    longDescription:
      'Dusk Meridian is an ode to that fleeting moment when the sky bleeds amber and the air carries warmth but no heat. Rose oxide and aldehydes create an opening that is radiant and slightly abstract — neither floral nor not. The heart is lush with Damascene rose absolute and a whisper of precious oud that elevates rather than dominates. The base of amber, labdanum, and vanilla musk anchors the fragrance with an enveloping warmth that lasts until morning.',
    category: 'Eau de Parfum',
    sizes: [
      { ml: 50, price: 115, label: '50 ml' },
      { ml: 100, price: 165, label: '100 ml' },
    ],
    defaultSize: 100,
    scentNotes: {
      top: ['Rose Oxide', 'Aldehydes', 'Pink Peppercorn'],
      heart: ['Damascene Rose Absolute', 'Oud', 'Iris'],
      base: ['Labdanum', 'Amber', 'Vanilla Musk'],
    },
    ingredients:
      'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Benzyl Benzoate, Linalool, Limonene, Benzyl Alcohol, Geraniol, Citronellol, Coumarin, Eugenol, Cinnamyl Alcohol, Farnesol.',
    reviews: [
      { author: 'Leila M.', rating: 5, text: 'The most romantic scent in the collection. Absolutely sublime — I get stopped everywhere I wear it.', date: 'Feb 2025' },
      { author: 'Chris B.', rating: 5, text: 'Unisex but leans soft. My partner and I both wear it. The oud is exquisite.', date: 'Mar 2025' },
    ],
    bottleGradient: 'linear-gradient(160deg, rgba(28,16,20,0.95) 0%, rgba(55,28,32,0.9) 45%, rgba(22,14,18,0.98) 100%)',
    glowColor: 'rgba(220,120,100,0.35)',
    accentColor: '#e08070',
    badge: null,
    featured: true,
  },
  {
    id: 'velvet-archive',
    name: 'Velvet Archive',
    tagline: 'Memory bottled. Darkness preserved.',
    description: 'A library of rare absolutes — leather, iris, tonka, and old smoke. Deep, literary, unforgettable.',
    longDescription:
      "Velvet Archive is an olfactory document of richness and restraint. Inspired by the atmosphere of a rare book library — leather bindings, aged paper, candlewax — this fragrance opens with a cool iris absolute before unfolding into a warm leather heart dusted with orris and heliotrope. The base is deep and lasting: tonka bean, birch, and a touch of castoreum absolute, rounded by a faint whisper of woodsmoke. An introvert's fragrance for people who make a lasting impression.",
    category: 'Extrait de Parfum',
    sizes: [
      { ml: 30, price: 95, label: '30 ml' },
      { ml: 50, price: 138, label: '50 ml' },
    ],
    defaultSize: 50,
    scentNotes: {
      top: ['Iris Absolute', 'Violet', 'Cardamom'],
      heart: ['Russian Leather', 'Orris Butter', 'Heliotrope'],
      base: ['Tonka Bean', 'Birch', 'Woodsmoke'],
    },
    ingredients:
      'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Linalool, Benzyl Benzoate, Coumarin, Limonene, Farnesol, Geraniol, Citronellol, Benzyl Alcohol, Benzyl Cinnamate.',
    reviews: [
      { author: 'Diana L.', rating: 5, text: "Unlike anything else I've tried. The leather accord is perfectly balanced — present but never overbearing.", date: 'Jan 2025' },
      { author: 'Rahul S.', rating: 5, text: "A collector's item. This one stays in my rotation permanently. The iris opening is stunning.", date: 'Feb 2025' },
    ],
    bottleGradient: 'linear-gradient(160deg, rgba(16,14,24,0.95) 0%, rgba(38,32,58,0.9) 45%, rgba(14,12,22,0.98) 100%)',
    glowColor: 'rgba(150,100,220,0.35)',
    accentColor: '#9664dc',
    badge: null,
    featured: false,
  },
  {
    id: 'weekend-code',
    name: 'Weekend Code',
    tagline: 'Off-duty elegance. Anywhere.',
    description: 'A travel-ready concentrate of sea salt, cedar, and Sicilian lime. Clean, confident, effortless.',
    longDescription:
      'Weekend Code was built for movement. A compact 30ml concentrate designed to travel with you — to rooftop parties, weekend escapes, and everything in between. The opening is sparkling and fresh: Sicilian lime, sea salt accord, and a whisper of cucumber. The heart is airy and clean, a light cedar and ambergris combination that feels completely effortless. The dry-down is warm skin musk — the scent of your best self after sun.',
    category: 'Travel Concentration',
    sizes: [
      { ml: 30, price: 72, label: '30 ml' },
    ],
    defaultSize: 30,
    scentNotes: {
      top: ['Sicilian Lime', 'Sea Salt Accord', 'Cucumber'],
      heart: ['Light Cedar', 'Ambergris', 'White Tea'],
      base: ['Skin Musk', 'Sandalwood', 'Driftwood'],
    },
    ingredients:
      'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Citral, Geraniol, Benzyl Benzoate, Citronellol, Farnesol, Benzyl Alcohol, Coumarin.',
    reviews: [
      { author: 'Priya N.', rating: 4, text: 'Perfect summer fragrance. Light, fresh, surprisingly long-lasting for a travel size.', date: 'Mar 2025' },
      { author: 'Tyler R.', rating: 5, text: 'Bought this for a trip to Miami. Wore it every single day. Already ordered a second one.', date: 'Feb 2025' },
    ],
    bottleGradient: 'linear-gradient(160deg, rgba(12,22,16,0.95) 0%, rgba(24,42,28,0.9) 45%, rgba(10,18,14,0.98) 100%)',
    glowColor: 'rgba(80,200,140,0.3)',
    accentColor: '#50c88c',
    badge: 'Travel Size',
    featured: false,
  },
  {
    id: 'fridays-ritual',
    name: "Friday's Ritual",
    tagline: 'The complete sensory experience.',
    description: 'A curated body and scent layering kit — shower gel, body oil, and 50ml EDP. Presented in signature black box.',
    longDescription:
      "Friday's Ritual is the ultimate layering system. Start with the Noir Ember-infused shower gel, follow with the luxurious body oil that prolongs projection and softens skin, then apply the included 50ml Eau de Parfum. Each product is formulated to work in concert, creating a scent presence that is exponentially richer than any single product alone. Presented in a signature matte black box with magnetic closure and satin ribbon pull. The definitive Friday's experience.",
    category: 'Ritual Set',
    sizes: [
      { ml: 0, price: 96, label: 'Full Set' },
    ],
    defaultSize: 0,
    scentNotes: {
      top: ['Bergamot', 'Black Pepper', 'Iced Mandarin'],
      heart: ['Lavender Absolute', 'Saffron', 'Violet Leaf'],
      base: ['Amber Resin', 'Vetiver Smoke', 'Cedarwood Musk'],
    },
    ingredients:
      "Includes: Noir Ember 50ml EDP, Noir Ember Shower Gel 200ml, Noir Ember Body Oil 100ml. See individual products for full ingredient lists.",
    reviews: [
      { author: 'Emma C.', rating: 5, text: 'The perfect gift. Or the perfect self-treat. The layering actually works — the scent lasts twice as long.', date: 'Jan 2025' },
      { author: 'Felix A.', rating: 5, text: "The body oil alone is worth the price. But together? This is how fragrance should be done.", date: 'Feb 2025' },
    ],
    bottleGradient: 'linear-gradient(160deg, rgba(24,18,12,0.95) 0%, rgba(48,34,20,0.9) 45%, rgba(20,14,10,0.98) 100%)',
    glowColor: 'rgba(223,149,80,0.45)',
    accentColor: '#df9550',
    badge: 'Kit',
    featured: false,
  },
]

export const getFeatured = () => products.filter(p => p.featured)
export const getById = (id) => products.find(p => p.id === id)
export const getByCategory = (cat) => products.filter(p => p.category === cat)
