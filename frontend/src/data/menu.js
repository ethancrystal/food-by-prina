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
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'How to Order', href: '/#order' },
  { label: 'Contact', href: '/#contact' },
];

// Opening hours drive the "Open now / Closed" badge. Times are 24h, Eastern.
// TODO: PLACEHOLDER HOURS — confirm Prina's real days and hours before launch.
export const TIMEZONE = 'America/New_York';
export const HOURS = [
  { day: 'Sunday', open: '13:00', close: '20:00' },
  { day: 'Monday', open: null, close: null },
  { day: 'Tuesday', open: null, close: null },
  { day: 'Wednesday', open: null, close: null },
  { day: 'Thursday', open: '13:00', close: '20:00' },
  { day: 'Friday', open: '13:00', close: '20:00' },
  { day: 'Saturday', open: '13:00', close: '20:00' },
];

// TODO: add pickup address/area once confirmed.
export const LOCATION = 'Pickup & delivery available';

export const CHICKEN_STYLES = ['Fried', 'BBQ', 'Buffalo', 'Thai Chili'];
export const SIDES_PER_PLATTER = 2;

export const HERO_IMAGE = '/images/menu/seafood-pan.jpg';

export const MEATS = [
  {
    id: 'salmon',
    name: 'Salmon',
    price: 40,
    desc: 'Seasoned salmon fillet with yellow rice and 2 sides.',
    img: '/images/menu/salmon.jpg',
  },
  {
    id: 'stuffed-salmon',
    name: 'Stuffed Salmon w/ Crab',
    price: 45,
    desc: 'Salmon stuffed with crab, served with yellow rice and 2 sides.',
    img: '/images/menu/stuffed-salmon.jpg',
  },
  {
    id: 'lamb-chops',
    name: 'Lamb Chops (3)',
    price: 45,
    desc: 'Three lamb chops with yellow rice and 2 sides.',
    img: '/images/menu/lamb-chops.jpg',
  },
  {
    id: 'oxtails',
    name: 'Oxtails',
    price: 45,
    desc: 'Tender oxtails with yellow rice and 2 sides.',
    img: '/images/menu/oxtails.jpg',
  },
  {
    id: 'chicken',
    name: 'Chicken',
    price: 30,
    desc: 'Your choice of Fried, BBQ, Buffalo or Thai Chili, with yellow rice and 2 sides.',
    styles: CHICKEN_STYLES,
    note: 'Fried, BBQ, Buffalo or Thai Chili',
    img: '/images/menu/chicken.jpg',
  },
];

export const MEATS_NOTE = 'All platters come with yellow rice & choice of 2 sides.';

export const SEAFOOD_PAN = {
  id: 'seafood-pan',
  name: 'Seafood Pan',
  desc: 'Alaskan crab, jumbo shrimp, corn on the cob and broccoli.',
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

// Items for the ordering page. Platters (sides: true) require picking 2 sides.
export const FOOD = [
  ...MEATS.map((m) => ({ ...m, sides: true })),
  { ...SEAFOOD_PAN, sides: false },
];

// TODO: the client wants Desserts and Beverages tabs but has not sent items yet.
// Add entries shaped like { id, name, price, desc, img } and they appear automatically.
export const DESSERTS = [];
export const BEVERAGES = [];

export const DELIVERY_NOTES = [
  'Delivery fee applies',
  '3 or more platters = free delivery',
];

export const PAYMENT_METHODS = [
  { label: 'Apple Pay', value: BRAND.phone },
  { label: 'Cashapp', value: BRAND.cashapp },
];

export const PAYMENT_NOTE = 'Please send an extra $1 for these payment methods.';
export const PAYMENT_SURCHARGE = 1;
export const FREE_DELIVERY_MIN_PLATTERS = 3;

export const GALLERY = [
  SEAFOOD_PAN.img,
  ...MEATS.map((m) => m.img),
  ...SIDES.map((s) => s.img),
];

export const FAQ = [
  {
    q: 'How do I place an order?',
    a: `Tap "Order online", choose pickup or delivery, add your platters and sides, then check out. Your order is sent to ${BRAND.phone} by text and we'll confirm it. You can also just text or call us.`,
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
