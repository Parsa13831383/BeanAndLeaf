/* =========================================================================
   content.js — single source of truth.
   Everything here is drawn from Bean & Leaf's real public presence
   (their site/about copy, Instagram, independent reviews, Companies House,
   the Good Food Awards). Swap copy freely; nothing here is invented brand
   fact. Where a value is a placeholder for the owners to confirm, it is
   marked with a // CONFIRM comment.
   ========================================================================= */

export const brand = {
  name: 'Bean & Leaf',
  full: 'Bean & Leaf Coffee House',
  tagline: 'Speciality coffee & loose-leaf tea',
  city: 'Coventry',
  established: '2017',
  email: 'beanandleafcoffee@outlook.com',
  website: 'beanandleafcoffeehouse.co.uk',
  instagram: 'https://www.instagram.com/beanandleafcoffeehouse/',
  facebook: 'https://www.facebook.com/beanandleafcoffeehouse/',
  instagramHandle: '@beanandleafcoffeehouse',
};

export const nav = [
  { label: 'Story', href: '#story' },
  { label: 'Coffee & Tea', href: '#craft' },
  { label: 'The Bar', href: '#bar' },
  { label: 'Visit', href: '#visit' },
];

/* --- Story ----------------------------------------------------------- */
export const story = {
  eyebrow: 'Est. 2017 · Hertford Street',
  heading: 'A family of coffee\nfanatics and bakers.',
  body: [
    'It began as a simple dream — to open a family-run speciality coffee shop in the heart of Coventry. Nearly a decade on, that dream has become one of the city’s most quietly beloved rooms.',
    'We sit just off Hertford Street, tucked beside the grand 1930 arch of the old NatWest building: a sheltered doorway, high ceilings, a basement full of armchairs, plants on every ledge and a bookshelf that asks only that you leave one behind when you take one home.',
    'Two things have never changed — a passion for serving the best coffee in the city, sourced from independent roasters, and the belief that a café should feel like somewhere worth slowing down for.',
  ],
  stat: { value: '4.9', label: 'across 600+ reviews' },
};

/* --- Craft: the Bean & the Leaf ------------------------------------- */
export const craft = {
  eyebrow: 'The name says it twice',
  heading: 'The Bean\n& the Leaf',
  intro:
    'Most coffee shops treat tea as an afterthought. We never have. Our name is a promise — both halves taken just as seriously as the other.',
  columns: [
    {
      mark: 'Bean',
      title: 'Speciality coffee',
      lines: [
        'A rotating cast of independent roasters from around the country.',
        'Espresso, batch brew and V60 pour-over — or a flight, served three ways.',
        'Latte art on every cup that asks for it.',
      ],
    },
    {
      mark: 'Leaf',
      title: 'Loose-leaf tea',
      lines: [
        'A wide range of loose-leaf, sourced from a proper tea emporium.',
        'Served in pots, with a coloured timer so your brew is poured at its best.',
        'Considered, never an afterthought.',
      ],
    },
  ],
};

/* --- From the bar ---------------------------------------------------- */
// Each item's `image` is optional — drop a photo into /public/menu/ using
// the exact filename below and it will appear automatically next to the
// item. Nothing to touch in the components. Until a file exists at that
// path, the thumbnail quietly renders as a soft blank swatch (no broken
// image, no layout shift) — see Bar.jsx's MenuThumb.
export const bar = {
  eyebrow: 'From the bar',
  heading: 'A short, serious menu',
  note: 'Prices are indicative of a speciality café and should be confirmed in-store.', // CONFIRM
  items: [
    {
      name: 'Flat White',
      detail: 'Velvet milk, a double ristretto, the house favourite.',
      tag: 'Espresso',
      image: '/menu/flat-white.jpg', // CHANGE: drop photo at public/menu/flat-white.jpg
    },
    {
      name: 'Filter / Batch Brew',
      detail: 'The guest roaster, brewed clean and served by the cup.',
      tag: 'Filter',
      image: '/menu/filter-batch-brew.jpg', // CHANGE: drop photo at public/menu/filter-batch-brew.jpg
    },
    {
      name: 'V60 Pour-Over',
      detail: 'A single-origin, brewed to order — a rare thing in Coventry.',
      tag: 'Hand-brewed',
      image: '/menu/v60-pour-over.jpg', // CHANGE: drop photo at public/menu/v60-pour-over.jpg
    },
    {
      name: 'Coffee Flight',
      detail: 'One coffee, three ways: espresso, macchiato and filter side by side.',
      tag: 'For the curious',
      image: '/menu/coffee-flight.jpg', // CHANGE: drop photo at public/menu/coffee-flight.jpg
    },
    {
      name: 'Chai Latte',
      detail: 'Warm spice and steamed milk — a long-standing regular’s order.',
      tag: 'Comfort',
      image: '/menu/chai-latte.jpg', // CHANGE: drop photo at public/menu/chai-latte.jpg
    },
    {
      name: 'Loose-Leaf Pot',
      detail: 'Chosen from the range, timed and poured at its peak.',
      tag: 'Tea',
      image: '/menu/loose-leaf-pot.jpg', // CHANGE: drop photo at public/menu/loose-leaf-pot.jpg
    },
  ],
};

/* --- Seasonal: the guest roaster rotation ---------------------------- */
export const roasters = {
  eyebrow: 'This month at the bar',
  heading: 'A new roaster,\nevery month',
  intro:
    'Alongside our house espresso, a guest roaster takes over the second hopper each month — a second espresso, a batch brew and a single-origin on pour-over. It’s how a small room keeps tasting like the whole country.',
  house: { name: 'Blossom Coffee Roasters', place: 'Manchester', role: 'House espresso' }, // CONFIRM current
  guests: [
    { name: 'Colonna Coffee', place: 'Bath' },
    { name: 'Carter Coffee', place: 'Guest' },
    { name: 'Roundhill Roastery', place: 'Somerset' },
    { name: 'Coborn Coffee', place: 'Guest' },
  ],
  cupping: ['Stone fruit', 'Brown sugar', 'Bright, clean finish'], // illustrative tasting notes
};

/* --- Kitchen --------------------------------------------------------- */
export const kitchen = {
  eyebrow: 'From the kitchen',
  heading: 'Baked here,\ngone by lunch',
  body:
    'Homemade cakes and pastries, freshly prepared toasties and sandwiches — restocked through the morning and, more often than not, sold out by lunch. Vegan options always among them.',
  list: [
    'Homemade cakes',
    'Cinnamon rolls',
    'Toasted bagels',
    'Brownies',
    'Banana loaf',
    'Bakewell tart',
    'Freshly made toasties',
    'Housemade marshmallows',
  ],
};

/* --- Gallery: a rotating look at what's in the case today ------------ */
export const gallery = [
  { src: '/cakes/p1.jpg', alt: 'A slice of chocolate loaf cake with chocolate buttercream' },
  { src: '/cakes/p2.jpg', alt: 'A jam-filled shortbread biscuit' },
  { src: '/cakes/p3.jpg', alt: 'A frangipane bar, dusted with icing sugar' },
  { src: '/cakes/p4.jpg', alt: 'A cinnamon roll, dusted with icing sugar' },
  { src: '/cakes/p5.jpg', alt: 'A pistachio and cranberry blondie' },
  { src: '/cakes/p6.jpg', alt: 'Two loaded chocolate chip cookies' },
  { src: '/cakes/p7.jpg', alt: 'A slice of berry-glazed loaf cake, with a second slice alongside' },
  { src: '/cakes/p8.jpg', alt: 'A stack of loaded chocolate chip cookies studded with colourful chocolate pieces' },
  { src: '/cakes/p9.jpg', alt: 'Peanut butter sandwich cookies filled with cream' },
  { src: '/cakes/p10.jpg', alt: 'Two oat and honey flapjack bars' },
  { src: '/cakes/p11.jpg', alt: 'A blondie bar, dusted with icing sugar' },
  { src: '/cakes/p12.jpg', alt: 'Three frosted cupcakes topped with edible flowers' },
];

/* --- A small pause (editorial interlude, between Kitchen and Recognition) */
export const pause = {
  eyebrow: 'A small ritual',
  heading: 'Worth slowing\ndown for.',
  body: 'A fresh bag from this month’s guest roaster, a seat that isn’t rushed, and a room that doesn’t mind if you stay a while.',
};

/* --- Recognition ----------------------------------------------------- */
export const recognition = {
  eyebrow: 'Kindly said',
  heading: 'Coventry’s coffee,\nput plainly',
  accolades: [
    { value: '4.9★', label: 'Google & Tripadvisor, 600+ reviews' },
    { value: 'Gold Seal', label: 'Good Food Award 2025 / 26' },
    { value: 'Featured', label: 'European Coffee Trip guide' },
  ],
  // Real, attributed Google reviews (first name + quote), supplied by the owner.
  google: {
    rating: 4.9,
    count: '600+',
    link: 'https://www.google.com/maps/place/Bean+%26+Leaf+Coffee+House/@52.4073652,-1.5103828,17z/data=!4m8!3m7!1s0x48774bbac335fec9:0x867334924328779!8m2!3d52.4073652!4d-1.5103828!9m1!1b1!16s%2Fg%2F11f3qwzw5l?entry=ttu&g_ep=EgoyMDI2MDYyOC4wIKXMDSoASAFQAw%3D%3D',
    reviews: [
      {
        name: 'David',
        rating: 5,
        quote:
          'A genuinely remarkable little spot. They take their coffee exceptionally seriously and have a great atmosphere.',
      },
      {
        name: 'Kim',
        rating: 5,
        quote: 'Speciality coffee in Coventry city centre. I’ve had lovely espresso and tasty natural process pour-overs already.',
      },
      {
        name: 'Eden',
        rating: 5,
        quote: 'Best coffee selection in Coventry. If you know good coffee, this is the place to go.',
      },
      {
        name: 'Ben',
        rating: 5,
        quote: 'The coffee is excellent and the rotating guest menu highlights interesting coffees from a range of roasters.',
      },
      {
        name: 'Leo',
        rating: 5,
        quote: 'A little haven in the heart of Coventry. The coffee was excellent and the staff are genuinely friendly.',
      },
      {
        name: 'Keith',
        rating: 5,
        quote: 'The coffee was delicious, a real step above any other cup I had in the city.',
      },
      {
        name: 'Chloe',
        rating: 5,
        quote: 'Bean and Leaf is my number one stop for a coffee when I’m in town. Best coffee in Coventry.',
      },
    ],
  },
};

/* --- Visit ----------------------------------------------------------- */
export const visit = {
  eyebrow: 'Find us',
  heading: 'In the heart\nof the city',
  address: ['76 Hertford Street', 'Coventry', 'CV1 1LB'],
  landmark: 'Beside the grand arch of the old NatWest building, just off Broadgate.',
  details: [
    { k: 'Order', v: 'At the counter' },
    { k: 'Payment', v: 'Cards only' },
    { k: 'Wifi', v: 'Free, with a code' },
    { k: 'Power', v: 'Sockets at the tables' },
  ],
  hours: [
    { day: 'Monday', time: '10:00 – 16:00' },
    { day: 'Tuesday', time: '08:30 – 16:00' },
    { day: 'Wednesday', time: '08:30 – 17:00' },
    { day: 'Thursday', time: '08:30 – 17:00' },
    { day: 'Friday', time: '08:30 – 17:00' },
    { day: 'Saturday', time: '10:00 – 17:00' },
    { day: 'Sunday', time: 'Closed' },
  ],
};

/* --- A new chapter (their announced move) ---------------------------- */
export const chapter = {
  eyebrow: 'A new chapter',
  heading: 'Same beans.\nSame leaves.\nA new home.',
  body:
    'After nine years on Hertford Street, we’re taking a bold step forward and moving to a new home in the city. The room will change — the coffee, the care and the welcome won’t. Follow along as the next chapter takes shape.',
};
