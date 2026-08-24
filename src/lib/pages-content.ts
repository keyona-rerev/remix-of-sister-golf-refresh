import { UPLOADS } from "./site-content";

/**
 * Content for the pages that exist on sistergolfonline.com but were missing
 * from the first build. All copy, image URLs and link targets are taken
 * verbatim from the live site.
 */

export const externalLinks = {
  donateGeneral: "https://www.paypal.com/donate/?hosted_button_id=FHFS8X5NLTZ4L",
  donateFoundation: "https://www.paypal.com/donate?hosted_button_id=7UAQCRKNUU858",
  membershipJoin: "https://sg-membership.vibepreview.com/",
  membershipPortal: "https://sistergolf.app.clientclub.net/login",
  giftCertificates: "https://sistergolf.kartra.com/page/giftcertificates",
  tShirt: "https://sistergolf.kartra.com/page/T-Shirt",
  calendly: "http://www.calendly.com/sistergolf",
  golfJourneyRoadmap: "https://golf-journey-roadmap.sistergolfonline.com/",
  playDatesRegister: "https://practice-playdate-sessions.sistergolfonline.com/",
  privateLessonCheckout: "https://portal.sistergolfonline.com/checkout-page",
  experienceRegister: "https://membership.sistergolfonline.com/",
  groupLessonsRegister: "https://portal.sistergolfonline.com/non-members-registration-page",
};

/* ---------------------------------------------------------------- Foundation */

export const foundation = {
  eyebrow: "Know About Us",
  title: "Welcome to The SisterGolf Foundation",
  intro: [
    "The SisterGolf Foundation is a non-profit organization dedicated to empowering women and underrepresented youth through the game of golf. Our mission is to provide access to education, instruction, and networking opportunities that foster personal and professional growth.",
    "We believe that golf is a powerful tool for building relationships, confidence, and career success. We create a supportive environment where women can learn, connect, and thrive through our golf clinics, workshops, and community events. By collaborating with local organizations and partnering with community groups, we extend our impact beyond the golf course, promoting diversity, equity, and inclusion in all we do.",
  ],
  donationsHeading: "What Your Donations Will Support",
  donationsIntro:
    "Your generous donation to The SisterGolf Foundation will help us continue to empower women and underrepresented youth in our community. Your gift will support:",
  donationsSupport: [
    {
      title: "Scholarships and Reduced Program Fees",
      body: "Providing access to our golf programs for women who face financial constraints, ensuring that our empowering golf programs remain accessible to a diverse range of participants.",
    },
    {
      title: "Community Events",
      body: "Hosting and attending charity golf tournaments, inclusive networking sessions, and other events that foster community engagement, support local causes, and create opportunities for women to connect and thrive.",
    },
    {
      title: "Amplifying Underrepresented Voices",
      body: "Showcasing the stories and experiences of underrepresented groups within the golfing community, promoting a more inclusive narrative around women in golf.",
    },
    {
      title: "Program Expansion and Growth",
      body: "Enhancing and expanding our golf programs, workshops, and clinics to reach even more women and youth in our community.",
    },
    {
      title: "Support Through Golf",
      body: "Your donations will provide our student members with more opportunities to play golf. They will have the chance to participate in exclusive golfing events and enhance their skills. By contributing to our cause, you help give people more time to hone their abilities and enjoy the game, all while supporting a greater mission.",
    },
  ],
  donationsClosing:
    "Thank you for joining us in our mission to empower and uplift women and youth through the game of golf!",
  involvedHeading: "How to Get Involved",
  involvedBody:
    "Want to learn more about The SisterGolf Foundation and how you can get involved? Contact Shella Sylla to request more information about our programs, events, and volunteer opportunities. We'd love to have you join our community of empowered women and changemakers!",
  highlightsHeading: "Highlights",
  highlightsCaption:
    "SisterGolf Foundation non-profit work. Shella volunteered with Girls, Inc. and facilitated an Intro to Golf workshop for young ladies aged 9 - 12 years old.",
  highlightsImage: `${UPLOADS}/2023/12/SD-614x453.png`,
  metaDescription:
    "The SisterGolf Foundation is a non-profit dedicated to empowering women and underrepresented youth through golf — providing access to education, instruction and networking opportunities.",
};

/* ----------------------------------------------------------------- Programs */

export type Program = {
  slug: string;
  number: string;
  name: string;
  categoryName: string;
  cardImage: string;
  heroImage: string;
  blocks: { type: "paragraph" | "heading"; text: string }[];
  included?: { title: string; body: string }[];
  notes?: { heading: string; body: string }[];
  cta?: { label: string; url: string };
  metaDescription: string;
};

export const programs: Program[] = [
  {
    slug: "sistergolf-experience",
    number: "1",
    name: "Sistergolf Experience",
    categoryName: "Course",
    cardImage: `${UPLOADS}/2026/03/2026-sisterGlf-Experience-webcover-update-June3036-770x635.png`,
    heroImage: `${UPLOADS}/2026/03/2026-sisterGlf-Experience-webcover-update-June3036.png`,
    blocks: [],
    cta: { label: "Register Now", url: externalLinks.experienceRegister },
    metaDescription:
      "The SisterGolf Experience — register for SisterGolf's flagship course experience.",
  },
  {
    slug: "2026-group-golf-lessons",
    number: "2",
    name: "2026 Group Golf Lessons",
    categoryName: "Class Schedule",
    cardImage: `${UPLOADS}/2026/03/WebCover-2026GGL-5426Update-770x635.png`,
    heroImage: `${UPLOADS}/2026/03/WebCover-2026GGL-5426Update.png`,
    blocks: [
      {
        type: "paragraph",
        text: "Join SisterGolf\u2019s Group Golf Lessons, a comprehensive program designed to elevate your game and give you the confidence to start accepting invitations to play.",
      },
      {
        type: "paragraph",
        text: "Led by experienced golf instructors, this five-lesson series is perfect for beginners and early-stage golfers looking to improve their skills.",
      },
      {
        type: "paragraph",
        text: "With hands-on instruction and personalized feedback, you\u2019ll get the most out of each session. Practice what you learn on the range while connecting with like-minded professionals.",
      },
      {
        type: "paragraph",
        text: "Don\u2019t miss this chance to make this year a season of growth, fun, and progress. Sign up today!",
      },
    ],
    cta: { label: "Register Now", url: externalLinks.groupLessonsRegister },
    metaDescription:
      "SisterGolf 2026 Group Golf Lessons — a five-lesson series for beginners and early-stage golfers, led by experienced instructors with personalized feedback.",
  },
  {
    slug: "one-on-one",
    number: "3",
    name: "Sistergolf One-on-One Training / Please schedule with Shella",
    categoryName: "Course",
    cardImage: `${UPLOADS}/2023/03/1on1-770x635.png`,
    heroImage: `${UPLOADS}/2023/03/1on1.png`,
    blocks: [
      { type: "heading", text: "One-on-One Training!" },
      { type: "paragraph", text: "Would you like to improve your golf game?" },
      {
        type: "paragraph",
        text: "With SISTERGOLF 1 ON 1 TRAINING, you can receive personalized, on-course instruction designed to elevate your performance and take your game to the next level.",
      },
      { type: "paragraph", text: "Sessions are typically scheduled on Fridays." },
      {
        type: "paragraph",
        text: "Book your session to learn more about our personalized training experience.",
      },
    ],
    cta: { label: "Book Now", url: externalLinks.calendly },
    metaDescription:
      "SisterGolf One-on-One Training — personalized, on-course golf instruction with Shella, typically scheduled on Fridays.",
  },
  {
    slug: "sistergolf-private-lesson-experience",
    number: "4",
    name: "SisterGolf Private Lesson Experience",
    categoryName: "Course",
    cardImage: `${UPLOADS}/2026/02/Private-Golf-Lessons-5526Update-770x635.png`,
    heroImage: `${UPLOADS}/2026/02/Private-Golf-Lessons-5526Update.png`,
    blocks: [
      {
        type: "paragraph",
        text: "Anyone interested in private golf lessons, please fill out the form below. Prices range from $100 to $150, and Shella will match you up with the proper instructor.",
      },
    ],
    included: [
      {
        title: "Personalized Coaching",
        body: "Sessions are tailored to your goals, skill level, and learning style.",
      },
      {
        title: "Flexible Scheduling",
        body: "After purchase, you\u2019ll connect directly with your instructor to schedule based on your availability.",
      },
      {
        title: "Focused Skill Development",
        body: "Build confidence in grip, stance, alignment, ball striking, short game fundamentals, and more.",
      },
      {
        title: "Supportive Community",
        body: "Learn in a welcoming, women-centered environment. No judgment, just growth.",
      },
    ],
    notes: [
      {
        heading: "Cancellation and Reschedule Policy",
        body: "All scheduling, rescheduling, and cancellations are handled directly with your instructor. Your instructor\u2019s policies will be shared during your initial communication so you feel clear and confident moving forward.",
      },
      {
        heading: "Ready to Begin?",
        body: "Purchase your package or contact SisterGolf today and take the next step in your golf journey with confidence.",
      },
    ],
    cta: { label: "Purchase Now", url: externalLinks.privateLessonCheckout },
    metaDescription:
      "The SisterGolf Private Lesson Experience — personalized coaching, flexible scheduling and focused skill development in a welcoming, women-centered environment.",
  },
];

export const programBySlug = (slug: string) => programs.find((p) => p.slug === slug);

/* ------------------------------------------------------------- Golf journey */

export const golfJourney = {
  eyebrow: "Start here",
  title: "Choose Your SisterGolf Journey",
  lede: "Two programs. Two very different goals.",
  body: "Whether you are new to golf or looking to sharpen the swing you already have, there is a program designed for where you are today. Compare the programs or take the 30-second quiz to find the path that is right for you.",
  cta: { label: "Learn more", url: externalLinks.golfJourneyRoadmap },
  image: `${UPLOADS}/2023/12/MI_Final-514x453.jpg`,
  metaDescription:
    "Two SisterGolf programs, two very different goals. Compare the programs or take the 30-second quiz to find the path that is right for you.",
};

/* --------------------------------------------------------------- Play dates */

export const playDates = {
  eyebrow: "Improve your game",
  title: "SisterGolf Play Dates & Practice Sessions",
  body: "These experiences combine golf exposure, relationship building, confidence building, and community.",
  cta: { label: "Register Here", url: externalLinks.playDatesRegister },
  image: `${UPLOADS}/2023/12/MI_Final-514x453.jpg`,
  metaDescription:
    "SisterGolf Play Dates & Practice Sessions combine golf exposure, relationship building, confidence building and community.",
};

/* --------------------------------------------------------------- Membership */

export const membership = {
  eyebrow: "Know About Us",
  title: "SisterGolf Annual Membership",
  body: "SisterGolf is happy to invite you to be part of our exclusive membership portal. Being a member grants you access to various benefits, such as discounted rates, access to exclusive events, networking opportunities, discount on 4 free 30 minute one-on-one zoom calls with Shella, and more.",
  subheading: "Woman On The Golf Course",
  callout:
    "Join SisterGolf today and embark on a journey of golf, empowerment, and camaraderie like never before!",
  join: { label: "Join Now", url: externalLinks.membershipJoin },
  portalHeading: "Exclusive Membership Portal",
  portal: { label: "Login Here", url: externalLinks.membershipPortal },
  image: `${UPLOADS}/2023/12/MI_Final-514x453.jpg`,
  metaDescription:
    "The SisterGolf Annual Membership grants access to discounted rates, exclusive events, networking opportunities and one-on-one Zoom calls with Shella.",
};

/* ----------------------------------------------------------------- Products */

export type GiftCard = { title: string; image: string; url: string };

export const giftCards: GiftCard[] = [
  {
    title: "Gift Certificate $100",
    image: `${UPLOADS}/2023/11/1-1-300x300.png`,
    url: externalLinks.giftCertificates,
  },
  {
    title: "Gift Certificate $250",
    image: `${UPLOADS}/2023/11/2-1-300x300.png`,
    url: externalLinks.giftCertificates,
  },
  {
    title: "Gift Certificate $350",
    image: `${UPLOADS}/2023/11/3-1-300x300.png`,
    url: externalLinks.giftCertificates,
  },
];

export type Merch = {
  title: string;
  image: string;
  details: string[];
  action: { label: string; url?: string; to?: string };
};

export const merch: Merch[] = [
  {
    title: "Limited Pink & White SisterGolf Long-Sleeve T-Shirt",
    image: `${UPLOADS}/2024/11/SGs-T-SHIRT-300x300.jpg`,
    details: ["Size: Small Only", "Limited Quantity"],
    action: { label: "Order now", url: externalLinks.tShirt },
  },
  {
    title: "SisterGolf Sleeveless Polo Shirt",
    image: `${UPLOADS}/2023/01/SisterGolf-Sleeveless.png`,
    details: ["Sizes: Large, Medium and Small"],
    action: { label: "Contact Us", to: "/contact" },
  },
  {
    title: "SisterGolf White Golf Visor",
    image: `${UPLOADS}/2023/01/SG-Visor-White.png`,
    details: ["Sizes: Large, Medium and Small"],
    action: { label: "Contact Us", to: "/contact" },
  },
  {
    title: "Newbie Golfer Accessories Starter Kit",
    image: `${UPLOADS}/2023/01/Newbie-Golf-Accessories.jpg`,
    details: [
      "Kit includes Sleeve of Golf Balls, Golf Glove, Golf Hat, Wooden Tees, and Ball Marker",
      "Unavailable at this time.",
    ],
    action: { label: "Contact Us", to: "/contact" },
  },
];

/* ---------------------------------------------------------------- Galleries */

export type GalleryImage = { src: string; caption?: string };

export type Gallery = {
  slug: string;
  year: string;
  navLabel: string;
  title: string;
  body: string[];
  bannerImage: string;
  winnersHeading: string;
  winners: GalleryImage[];
  sections: { heading: string; images: GalleryImage[] }[];
  metaDescription: string;
};

export const galleries: Gallery[] = [
  {
    slug: "woodfin-golf-2025",
    year: "2025",
    navLabel: "Woodfin Golf 2025",
    title: "Randall L. Woodfin Charity Golf Tournament presented by Cardiac Solutions",
    body: [
      "SisterGolf sends a heartfelt and resounding thank you to all our incredible sponsors, dedicated volunteers, and amazing golfers who came together to make the Randall L. Woodfin Charity Golf Tournament an extraordinary success!",
    ],
    bannerImage: `${UPLOADS}/2025/12/2025-Woodfin-Golf_-Gallery-Cover.png`,
    winnersHeading: "Winners of Randall L. Woodfin 4th Annual Charity Golf Tournament",
    winners: [
      {
        src: `${UPLOADS}/2025/12/img_9790-scaled-650x400.jpg`,
        caption: "First Place Winner (Morning Wave)",
      },
      {
        src: `${UPLOADS}/2025/12/img_9788-scaled-650x400.jpg`,
        caption: "Second Place Winner (Morning Wave)",
      },
    ],
    sections: [
      {
        heading: "Charity Donations",
        images: [
          { src: `${UPLOADS}/2025/12/img_9737-1-scaled-650x400.jpg` },
          { src: `${UPLOADS}/2025/12/img_9740-02.43.59-scaled-650x400.jpg` },
        ],
      },
      {
        heading: "Thank You to Our Sponsors",
        images: [{ src: `${UPLOADS}/2025/12/2025-SG-Website-Event-Cover.png` }],
      },
    ],
    metaDescription:
      "Photo gallery from the 4th Annual Randall L. Woodfin Charity Golf Tournament presented by Cardiac Solutions, hosted by SisterGolf.",
  },
  {
    slug: "woodfin-golf-2024",
    year: "2024",
    navLabel: "Woodfin Golf 2024",
    title: "Randall L. Woodfin's 3rd Annual Charity Golf Tournament",
    body: [
      "SisterGolf sends a heartfelt and resounding thank you to all our incredible sponsors, dedicated volunteers, and amazing golfers who came together to make the Randall L. Woodfin Charity Golf Tournament an extraordinary success!",
    ],
    bannerImage: `${UPLOADS}/2024/12/Woodfin-2024.png`,
    winnersHeading: "Winners of Randall L. Woodfin 3rd Annual Charity Golf Tournament",
    winners: [
      {
        src: `${UPLOADS}/2024/12/1St-Place-Team-Morning-Wave-650x400.jpg`,
        caption: "First Place Winner (Morning Wave)",
      },
      {
        src: `${UPLOADS}/2024/12/1st-Place-Winner-Team-afternoos-Wave-650x400.png`,
        caption: "First Place Winner (Afternoon Wave)",
      },
      {
        src: `${UPLOADS}/2024/12/Second-Place-Team-Morning-Wave-650x400.jpg`,
        caption: "Second Place Winner (Morning Wave)",
      },
      {
        src: `${UPLOADS}/2024/12/Second-Place-afternoon-scaled-650x400.jpg`,
        caption: "Second Place Winner (Afternoon Wave)",
      },
    ],
    sections: [
      {
        heading: "Charity Donations",
        images: [
          {
            src: `${UPLOADS}/2024/12/Birmingham-Promise-Check-Presentation-650x400.png`,
            caption: "Birmingham Promise Check Presentation",
          },
          {
            src: `${UPLOADS}/2024/12/Miles-College-Check-Presentation-650x400.png`,
            caption: "Miles College Check Presentation",
          },
        ],
      },
      {
        heading: "Sponsorships",
        images: [
          { src: `${UPLOADS}/2023/11/Banner-Sign-Sponsors-4ft-x-2ft-banner.png` },
        ],
      },
    ],
    metaDescription:
      "Photo gallery from Randall L. Woodfin's 3rd Annual Charity Golf Tournament, hosted by SisterGolf.",
  },
  {
    slug: "woodfin-golf-2023",
    year: "2023",
    navLabel: "Woodfin Golf 2023",
    title: "Randall L. Woodfin's 2nd Annual Charity Golf Tournament",
    body: [
      "SisterGolf wants to extend a tremendous and heartfelt thank you to all our sponsors, volunteers, and golfers who made the Randall L Woodfin Charity Golf Tournament a sweeping success!",
      "Once again, with our tireless union, we have raised $30,000 for Birmingham Promise, and $20,000 was presented to Miles College. These funds will be used to enrich the lives of the citizens through education for our youth and the improvement of the neighborhoods.",
      "For those who missed it, don\u2019t worry; we\u2019ll be back next year!",
    ],
    bannerImage: `${UPLOADS}/2023/10/Randall-L.-Woodfin-Banner.png`,
    winnersHeading: "Winners of Randall L. Woodfin 2nd Annual Charity Golf Tournament",
    winners: [
      {
        src: `${UPLOADS}/2023/10/MG_7068-scaled-650x400.jpg`,
        caption: "First Place Winner is Knight Eady (Morning Wave)",
      },
      {
        src: `${UPLOADS}/2023/11/1st-650x400.jpg`,
        caption: "First Place Winner is Studio2HD (Afternoon Wave)",
      },
      {
        src: `${UPLOADS}/2023/10/MG_7065-scaled-650x400.jpg`,
        caption: "Second Place Winner is ServisFirst Bank (Morning Wave)",
      },
      {
        src: `${UPLOADS}/2023/11/2nd-650x400.jpg`,
        caption: "Second Place Winner is Dunn Construction (Afternoon Wave)",
      },
    ],
    sections: [
      {
        heading: "Charity Donations",
        images: [
          { src: `${UPLOADS}/2023/10/MG_6954-scaled-650x400.jpg` },
          { src: `${UPLOADS}/2023/10/MG_6966-scaled-650x400.jpg` },
          {
            src: `${UPLOADS}/2023/11/391610334_865816224911209_3153622397386432051_n-650x400.jpg`,
          },
        ],
      },
      {
        heading: "Sponsorships",
        images: [
          { src: `${UPLOADS}/2023/11/Banner-Sign-Sponsors-4ft-x-2ft-banner.png` },
        ],
      },
    ],
    metaDescription:
      "Photo gallery from Randall L. Woodfin's 2nd Annual Charity Golf Tournament, which raised $30,000 for Birmingham Promise and $20,000 for Miles College.",
  },
  {
    slug: "woodfin-golf-2022",
    year: "2022",
    navLabel: "Woodfin Golf 2022",
    title: "Randall L. Woodfin Charity Golf Tournament",
    body: [
      "SisterGolf would like to extend a Tremendous and Heartfelt Thank You to all our sponsors, volunteers, and golfers who made the Inaugural Randall L Woodfin Charity Golf Tournament a sweeping success!",
      "We had 42 teams participate, and raised over $90,000. Miles College and The Birmingham Promise each received $10,000, with the remaining funds benefiting the RLW Charity Golf Tournament Fund at The Penny Foundation. These funds will be used to enrich the lives of the citizens through education for our youth and improvement of the neighborhoods.",
      "For those who missed it, don\u2019t worry we\u2019ll be back next year!",
    ],
    bannerImage: `${UPLOADS}/2025/05/2022-Randall-Final.png`,
    winnersHeading: "Winners of the Randall L. Woodfin Charity Golf Tournament",
    winners: [
      {
        src: `${UPLOADS}/2018/12/First-Place-Winner-Morning-Group-1200-650x400.jpg`,
        caption: "First Place Winner (Morning Group)",
      },
      {
        src: `${UPLOADS}/2018/12/Second-Place-Winner-Morning-Group-1200-650x400.jpg`,
        caption: "Second Place Winner (Morning Group)",
      },
      {
        src: `${UPLOADS}/2018/12/First-Place-Winner-Evening-Group-1200-650x400.jpg`,
        caption: "First Place Winner (Evening Group)",
      },
      {
        src: `${UPLOADS}/2018/12/Second-Place-Winner-Evening-Group-1200CR-650x400.jpg`,
        caption: "Second Place Winner (Evening Group)",
      },
    ],
    sections: [
      {
        heading: "Charity Donations",
        images: [
          { src: `${UPLOADS}/2018/12/Miles-College-1200-770x513.jpg` },
          { src: `${UPLOADS}/2018/12/Miles-College-2-1200-770x513.jpg` },
          { src: `${UPLOADS}/2018/12/Birmingham-Promise-1200-770x513.jpg` },
          { src: `${UPLOADS}/2018/12/Birmingham-Promise-2-1200-770x513.jpg` },
        ],
      },
      {
        heading: "Sponsorships",
        images: [
          {
            src: `${UPLOADS}/2018/12/Thank-You-to-Our-Sponsors_page-0001-1200-770x1155.jpg`,
          },
          {
            src: `${UPLOADS}/2018/12/Thank-You-In-Kind-Sponsors_page-0001-1200-770x1155.jpg`,
          },
        ],
      },
    ],
    metaDescription:
      "Photo gallery from the Inaugural Randall L. Woodfin Charity Golf Tournament — 42 teams, over $90,000 raised for Miles College, Birmingham Promise and The Penny Foundation.",
  },
];

export const galleryBySlug = (slug: string) => galleries.find((g) => g.slug === slug);

/* ------------------------------------------------------------------ Contact */

export const contactDetails = {
  address: ["2539 John Hawkins Pkwy #329", "Hoover, AL 35244"],
  email: "shella@sistergolf.com",
  phone: "305-815-3571",
  tagline: "Teaching Golf as a Way To Achieve Business Success",
  logo: `${UPLOADS}/2023/01/SG-Ftr-Logo-Rnd.png`,
  social: [
    { label: "Facebook", url: "https://facebook.com/sistergolf" },
    { label: "Twitter", url: "https://twitter.com/sistergolf" },
    { label: "Instagram", url: "https://www.instagram.com/sistergolf/?hl=en" },
  ],
};
