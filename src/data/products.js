export const products = [
  {
    id: 'aelia',
    name: 'Aelia',
    tagline: 'The scent of ambition after dark.',
    description: 'An electrifying composition that opens with luminous clarity, deepens into smoky seduction, and settles into a warm, magnetic trail.',
    longDescription:
      "Aelia is the cornerstone of the Friday's collection — a bold olfactory statement designed for the moment when day transitions to night. The opening is bright and electric, charged with bergamot and black pepper. As the fragrance evolves, a heart of lavender absolute and saffron emerges — complex, magnetic, and undeniably sophisticated. The trail settles into an enduring foundation of amber resin and cedarwood musk, leaving a lasting impression that commands attention. High-concentration oil formula ensures projection for 12+ hours.",
    category: 'Eau de Parfum',
    sizes: [
      { ml: 50, price: 30, label: '50 ml' },
    ],
    defaultSize: 50,
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
    bottleGradient: 'linear-gradient(160deg, #1e1030 0%, #120a20 55%, #3a1040 100%)',
    glowColor: 'rgba(90,139,255,0.38)',
    accentColor: '#5a8bff',
    badge: 'Bestseller',
    featured: true,
  },
  {
    id: 'azura',
    name: 'Azura',
    tagline: 'Industrial edge. Velvet finish.',
    description: 'A chrome-cool concentration of neroli, smoked incense, and polished woods. Engineered, not blended.',
    longDescription:
      'Azura strips fragrance down to its architectural bones. This extrait de parfum opens with a cold, clean neroli accord before revealing a smoky incense heart that is both meditative and arresting. The base is a study in contrasts — gleaming sandalwood against raw vetiver — creating a scent that feels engineered rather than blended. Wear it when you need to be unmistakable.',
    category: 'Extrait de Parfum',
    sizes: [
      { ml: 50, price: 30, label: '50 ml' },
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
    bottleGradient: 'linear-gradient(160deg, #191c28 0%, #303850 55%, #141824 100%)',
    glowColor: 'rgba(200,210,255,0.32)',
    accentColor: '#c8d2ff',
    badge: 'New',
    featured: true,
  },
  {
    id: 'kayaan',
    name: 'Kayaan',
    tagline: 'The warmth between day and dark.',
    description: 'Golden hour captured in amber, rose oxide, and sun-warmed oud. Radiant, lush, enduring.',
    longDescription:
      'Kayaan is an ode to that fleeting moment when the sky bleeds amber and the air carries warmth but no heat. Rose oxide and aldehydes create an opening that is radiant and slightly abstract — neither floral nor not. The heart is lush with Damascene rose absolute and a whisper of precious oud that elevates rather than dominates. The base of amber, labdanum, and vanilla musk anchors the fragrance with an enveloping warmth that lasts until morning.',
    category: 'Eau de Parfum',
    sizes: [
      { ml: 50, price: 30, label: '50 ml' },
    ],
    defaultSize: 50,
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
    bottleGradient: 'linear-gradient(160deg, #1c1014 0%, #371c20 55%, #160e12 100%)',
    glowColor: 'rgba(220,120,100,0.35)',
    accentColor: '#e08070',
    badge: null,
    featured: true,
  },
  {
    id: 'dreams',
    name: 'Dreams',
    tagline: 'Memory bottled. Darkness preserved.',
    description: 'A library of rare absolutes — leather, iris, tonka, and old smoke. Deep, literary, unforgettable.',
    longDescription:
      "Dreams is an olfactory document of richness and restraint. Inspired by late nights and quiet moments, this fragrance opens with a cool iris absolute before unfolding into a warm leather heart dusted with orris and heliotrope. The base is deep and lasting: tonka bean, birch, and a touch of castoreum absolute, rounded by a faint whisper of woodsmoke. A fragrance for those who leave a lasting impression.",
    category: 'Extrait de Parfum',
    sizes: [
      { ml: 50, price: 30, label: '50 ml' },
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
    bottleGradient: 'linear-gradient(160deg, #120a28 0%, #301858 30%, #502888 55%, #3a1a68 80%, #1c0e38 100%)',
    glowColor: 'rgba(150,80,255,0.7)',
    accentColor: '#9650ff',
    badge: null,
    featured: false,
  },
  {
    id: 'loruun',
    name: 'Loruun',
    tagline: 'Off-duty elegance. Anywhere.',
    description: 'A fresh concentrate of sea salt, cedar, and Sicilian lime. Clean, confident, effortless.',
    longDescription:
      'Loruun was built for movement. A concentrate designed to travel with you — to rooftop parties, weekend escapes, and everything in between. The opening is sparkling and fresh: Sicilian lime, sea salt accord, and a whisper of cucumber. The heart is airy and clean, a light cedar and ambergris combination that feels completely effortless. The dry-down is warm skin musk — the scent of your best self.',
    category: 'Eau de Parfum',
    sizes: [
      { ml: 50, price: 30, label: '50 ml' },
    ],
    defaultSize: 50,
    scentNotes: {
      top: ['Sicilian Lime', 'Sea Salt Accord', 'Cucumber'],
      heart: ['Light Cedar', 'Ambergris', 'White Tea'],
      base: ['Skin Musk', 'Sandalwood', 'Driftwood'],
    },
    ingredients:
      'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Citral, Geraniol, Benzyl Benzoate, Citronellol, Farnesol, Benzyl Alcohol, Coumarin.',
    reviews: [
      { author: 'Priya N.', rating: 4, text: 'Perfect summer fragrance. Light, fresh, surprisingly long-lasting.', date: 'Mar 2025' },
      { author: 'Tyler R.', rating: 5, text: 'Wore it every single day on a trip. Already ordered a second one.', date: 'Feb 2025' },
    ],
    bottleGradient: 'linear-gradient(160deg, #051810 0%, #0e3a22 30%, #1a6040 55%, #104828 80%, #082010 100%)',
    glowColor: 'rgba(40,200,120,0.7)',
    accentColor: '#28c878',
    badge: null,
    featured: false,
  },
  {
    id: 'liara',
    name: 'Liara',
    tagline: 'The complete sensory experience.',
    description: 'Soft florals meet warm musk in a fragrance that feels like sunlight through silk.',
    longDescription:
      "Liara is a celebration of quiet elegance. Opening with a burst of white peach and jasmine petals, it softens into a heart of rose absolute and warm sandalwood. The base of vanilla musk and cedarwood creates a deeply comforting, skin-close warmth that lingers for hours. Delicate yet unforgettable — Liara is the scent you reach for when you want to feel like yourself.",
    category: 'Eau de Parfum',
    sizes: [
      { ml: 50, price: 30, label: '50 ml' },
    ],
    defaultSize: 50,
    scentNotes: {
      top: ['White Peach', 'Jasmine Petals', 'Bergamot'],
      heart: ['Rose Absolute', 'Sandalwood', 'Muguet'],
      base: ['Vanilla Musk', 'Cedarwood', 'White Amber'],
    },
    ingredients:
      'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Benzyl Benzoate, Linalool, Limonene, Coumarin, Citronellol, Geraniol, Eugenol, Benzyl Salicylate, Farnesol.',
    reviews: [
      { author: 'Emma C.', rating: 5, text: 'Smells like a dream. Soft, warm, and incredibly long-lasting. My new everyday scent.', date: 'Jan 2025' },
      { author: 'Felix A.', rating: 5, text: "Bought this for my girlfriend and she hasn't put it down since. Absolutely stunning.", date: 'Feb 2025' },
    ],
    bottleGradient: 'linear-gradient(160deg, #281808 0%, #6a3c10 30%, #a86020 55%, #7a4818 80%, #3a2208 100%)',
    glowColor: 'rgba(220,160,60,0.75)',
    accentColor: '#dca03c',
    badge: null,
    featured: false,
  },
]

export const getFeatured = () => products.filter(p => p.featured)
export const getById = (id) => products.find(p => p.id === id)
export const getByCategory = (cat) => products.filter(p => p.category === cat)
