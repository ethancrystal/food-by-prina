// ------------------------------------------------------------------
// PRINA'S KITCHEN — site content, sourced from the client-provided menu
// flyer. Fields marked TODO are not on the flyer and need real details
// from the client (service area, socials, exact hours/cutoff).
// ------------------------------------------------------------------

export const BRAND = {
  name: "Prina's Kitchen",
  tagline: 'Made with love. Served with pride.',
  blurb:
    "A home-kitchen soul food & seafood platter service — every order cooked fresh, seasoned right, and packed up with care.",
  phone: '(215) 397-0159',
  phoneHref: 'tel:+12153970159',
  smsHref: 'sms:+12153970159',
  cashapp: '$prina4453',
  serviceArea: 'Delivery & pickup — ask about your area', // TODO: confirm exact service area/city
  instagram: '#', // TODO: add real Instagram handle/link
  facebook: '#', // TODO: add real Facebook page link
};

export const NAV = [
  { label: 'Menu', href: '#menu' },
  { label: 'How to Order', href: '#order' },
  { label: 'Sides', href: '#sides' },
  { label: 'Contact', href: '#contact' },
];

export const HERO_IMAGE = '/images/menu/seafood-pan.jpg';

export const MEATS = [
  {
    name: 'Salmon',
    price: 40,
    img: '/images/menu/salmon.jpg',
  },
  {
    name: 'Stuffed Salmon w/ Crab',
    price: 45,
    img: '/images/menu/stuffed-salmon.jpg',
  },
  {
    name: 'Lamb Chops (3)',
    price: 45,
    img: '/images/menu/lamb-chops.jpg',
  },
  {
    name: 'Oxtails',
    price: 45,
    img: '/images/menu/oxtails.jpg',
  },
  {
    name: 'Chicken',
    price: 30,
    note: 'Fried, BBQ, Buffalo or Thai Chili',
    img: '/images/menu/chicken.jpg',
  },
];

export const MEATS_NOTE = 'All platters come with yellow rice & choice of 2 sides.';

export const SEAFOOD_PAN = {
  name: 'Seafood Pan',
  price: 80,
  includes: ['Alaskan Crab', 'Jumbo Shrimp', 'Corn on the Cob', 'Broccoli'],
  img: '/images/menu/seafood-pan.jpg',
};

export const SIDES = [
  {
    name: 'Mac & Cheese',
    img: '/images/menu/mac-cheese.jpg',
  },
  {
    name: 'Yams',
    img: '/images/menu/yams.jpg',
  },
  {
    name: 'Collard Greens',
    img: '/images/menu/collard-greens.jpg',
  },
  {
    name: 'String Beans',
    img: '/images/menu/string-beans.jpg',
  },
];

export const DELIVERY_NOTES = [
  'Delivery fee applies',
  '3 or more platters = free delivery',
];

export const PAYMENT_METHODS = [
  { label: 'Apple Pay', value: BRAND.phone },
  { label: 'Cashapp', value: BRAND.cashapp },
];

export const PAYMENT_NOTE = 'Please send an extra $1 for these payment methods.';

export const GALLERY = [
  SEAFOOD_PAN.img,
  ...MEATS.map((m) => m.img),
  ...SIDES.map((s) => s.img),
];

export const FAQ = [
  {
    q: 'How do I place an order?',
    a: `Call or text ${BRAND.phone} with your platter picks and choice of 2 sides. We'll confirm your total and pickup/delivery details.`,
  },
  {
    q: 'How do I pay?',
    a: `We accept Apple Pay (${BRAND.phone}) and Cashapp (${BRAND.cashapp}). Please add an extra $1 when paying by Apple Pay or Cashapp.`,
  },
  {
    q: 'Is delivery available?',
    a: 'Yes — a delivery fee applies per order, but it’s free when you order 3 or more platters. Ask about delivery to your area.',
  },
  {
    q: 'What comes with each platter?',
    a: 'Every meat platter is served with yellow rice and your choice of 2 sides: Mac & Cheese, Yams, Collard Greens, or String Beans.',
  },
];
