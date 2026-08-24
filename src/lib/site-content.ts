export const UPLOADS = "https://sistergolfonline.com/wp-content/uploads";

export type ServiceCategory = {
  slug: string;
  name: string;
};

export const serviceCategories: ServiceCategory[] = [
  { slug: "workshops", name: "Workshops" },
  { slug: "private-coaching", name: "Private Coaching" },
  { slug: "online-course", name: "Online Course" },
];

export type ServiceBlock =
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "strong"; text: string }
  | { type: "list"; items: string[] };

export type Service = {
  slug: string;
  name: string;
  categorySlug: string;
  categoryName: string;
  cardImage: string;
  heroImage: string;
  subtitle?: string;
  blocks: ServiceBlock[];
  cta?: { label: string; url: string };
  ctaNote?: string;
  highlights: { title: string; body: string }[];
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: "ladies-business-golf",
    name: "Ladies Business Golf",
    categorySlug: "workshops",
    categoryName: "Workshops",
    cardImage: `${UPLOADS}/2018/12/ladies-business-golf-2-600x750.jpg`,
    heroImage: `${UPLOADS}/2018/12/ladies-business-golf-2.jpg`,
    subtitle: "How To Use Golf To Get Business For Ladies",
    blocks: [
      {
        type: "paragraph",
        text: "Join us for a Half Day Workshop that will teach you how to effectively use Golf, a well known but underutilized strategy, to catapult your Career or Business into OverDrive!",
      },
      { type: "heading", text: "Session Includes:" },
      {
        type: "paragraph",
        text: "Half-day workshop that covers Business Development Strategy, Game Fundamentals, and includes Hands-on Group Golf Lesson",
      },
      {
        type: "list",
        items: [
          "Business Development Strategy",
          "Game Fundamentals",
          "Hands-on Group Golf Lesson",
        ],
      },
    ],
    cta: { label: "Book Workshop", url: "https://sistergolf.kartra.com/page/lbg-signup" },
    highlights: [
      {
        title: "Build Relationships",
        body: "Create lasting relationships, close more deals and get promoted",
      },
      {
        title: "Make Connections",
        body: "Play golf to achieve business and career success.",
      },
    ],
    metaDescription:
      "A half-day SisterGolf workshop teaching women how to use golf to catapult their career or business, covering business development strategy, game fundamentals and a hands-on group lesson.",
  },
  {
    slug: "deals-on-the-green",
    name: "Deals on the Green",
    categorySlug: "private-coaching",
    categoryName: "Private Coaching",
    cardImage: `${UPLOADS}/2018/12/deals-on-the-green-3-600x750.jpg`,
    heroImage: `${UPLOADS}/2018/12/deals-on-the-green-3.jpg`,
    subtitle:
      "Best practices for mastering business etiquette on the golf course for women.",
    blocks: [
      { type: "strong", text: "Take your networking game to the next level!" },
      {
        type: "paragraph",
        text: "Join me for the \u201dDeals on the Green\u201d Lunch & Learn, a class designed for women playing golf with business owners, which will teach you the etiquette and skills you need to succeed on the course.",
      },
      {
        type: "paragraph",
        text: "In 90 minutes we will do a deep dive into various scenarios that take place while engaged in a round of business golf. We will discuss best practices for situations that arise whether playing one on one or in a Charity or Corporate Scramble, and provide solutions for dealing with each.",
      },
      { type: "heading", text: "Topics of Discussion" },
      {
        type: "list",
        items: [
          "When is it okay to talk business?",
          "How to handle a playing partner that cheats?",
          "What to do if they ask you to engage in a friendly wager?",
          "Should you drink alcohol if you\u2019re trying to close a client?",
          "Should you let them win (even if you\u2019re the better player)?",
          "And so much more.....",
        ],
      },
      {
        type: "paragraph",
        text: "We will also, cover different methods for keeping score and take an in-depth look at rules and etiquette. Participants will walk away from the workshop confident and empowered to accept a client or colleague\u2019s invitation to play golf one on one, or play in a Charity or Corporate Golf Tournament.",
      },
      { type: "strong", text: "Includes Lunch & Workshop Materials." },
      {
        type: "paragraph",
        text: "Call or email to schedule a session for your group or organization.",
      },
    ],
    cta: { label: "Request Now", url: "https://sistergolf.kartra.com/page/dotg-signup" },
    highlights: [
      {
        title: "Course Includes",
        body: "Includes lunch, workshop materials, and covers rules and etiquette.",
      },
      {
        title: "Best Practices",
        body: "Provides solutions for business dealings on the golf course.",
      },
    ],
    metaDescription:
      "Deals on the Green is a 90-minute Lunch & Learn on business golf etiquette for women: when to talk business, wagers, scoring, scrambles and more.",
  },
  {
    slug: "cubicle-to-course",
    name: "Cubicle to Course",
    categorySlug: "online-course",
    categoryName: "Online Course",
    cardImage: `${UPLOADS}/2018/10/cubicle-to-course-2-600x750.jpg`,
    heroImage: `${UPLOADS}/2018/10/cubicle-to-course-2.jpg`,
    blocks: [
      {
        type: "paragraph",
        text: "Upon completion of this course, the student will have all of the tools needed to participate in a Corporate or Charity Golf Tournament. In addition, the student will understand how playing golf creates relationships that lead to opportunities for growth and success in the workplace. This powerful course is delivered through 18 short, quality videos along with interactive lessons, workbook assignments, and quizzes.",
      },
      { type: "heading", text: "What You'll Learn" },
      {
        type: "paragraph",
        text: "Learn how how playing golf creates relationships that lead to opportunities for growth and success in the workplace.",
      },
      {
        type: "list",
        items: [
          "How Golf Facilitates Relationship Building",
          "When to Accept an Invitation",
          "Golf Attire, Accessories & Equipment",
          "Rules, Etiquette, Handicap & Scoring",
          "Golf Swing Technique Instruction Resources",
          "And So Much More",
        ],
      },
    ],
    ctaNote: "Coming soon",
    highlights: [
      {
        title: "18 Video Lessons",
        body: "Short, quality videos with interactive lessons, workbook assignments and quizzes.",
      },
      {
        title: "Tournament Ready",
        body: "All of the tools needed to participate in a Corporate or Charity Golf Tournament.",
      },
    ],
    metaDescription:
      "Cubicle to Course is SisterGolf's online course: 18 videos, interactive lessons, workbook assignments and quizzes to get you ready for a corporate or charity golf tournament.",
  },
  {
    slug: "private-coaching",
    name: "Private Coaching",
    categorySlug: "private-coaching",
    categoryName: "Private Coaching",
    cardImage: `${UPLOADS}/2018/10/private-coaching-small-group-600x750.jpg`,
    heroImage: `${UPLOADS}/2018/10/private-coaching-small-group.jpg`,
    subtitle: "The fastest way to get you ready for a corporate or charity event.",
    blocks: [
      {
        type: "paragraph",
        text: "This course is designed for women who can hit a golf ball consistently (meaning make contact with the ball without missing it). This is not to be confused with, can hit the ball beautifully or hit great shots every time, but have had enough instruction or familiarity with the sport to consistently make contact with the ball.",
      },
      { type: "heading", text: "Benefits of Private Instruction" },
      {
        type: "paragraph",
        text: "The Golf Course venue can be any Local course based on availability and your location. Sessions include Green fees and Cart fees, Continental Breakfast and Lunch.",
      },
      { type: "strong", text: "What you get from Private Instruction:" },
      {
        type: "list",
        items: [
          "30 minutes Driving Range Practice (includes balls)",
          "Private Coaching over 9 Holes of Golf (3 Hours)",
          "Golf Club Rentals & Sleeve of Golf Balls",
          "Closing wrap-up session (1-1/2 hours)",
          "Golf Tips Guide",
          "Learn Tee Box Signage & Course Terminology",
          "Learn Golf Course Etiquette",
          "How to play Scramble Format (used in Charity & Corporate Formats)",
          "Scoring, Handicap system & Cart Rules",
          "Course Management, Equipment & Accessories",
        ],
      },
      { type: "heading", text: "Schedule a Conversation with Shella." },
    ],
    cta: { label: "Schedule now", url: "https://calendly.com/sistergolf/30min" },
    highlights: [
      { title: "One-on-One", body: "Private on-course training for a single individual" },
      {
        title: "Small Groups",
        body: "Private on-course instruction for small groups of 2-4 people",
      },
    ],
    metaDescription:
      "Private on-course golf coaching from SisterGolf for individuals and small groups \u2014 range practice, nine holes, etiquette, scoring and a closing wrap-up session.",
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

export type Book = {
  title: string;
  description: string;
  image: string;
  url: string;
};

export const books: Book[] = [
  {
    title: "Golf Tournament Tracker",
    description:
      "Golf Tournament Tracker: A Fun and Easy-to-Use Journal for Keeping Track of Tournament Results!",
    image: `${UPLOADS}/2023/01/195365312X.01._SCLZZZZZZZ_SX500_-244x300.jpg`,
    url: "https://www.amazon.com/dp/195365312X",
  },
  {
    title: "Golf Progress Tracker",
    description:
      "Golf Progress Tracker: The Perfect and Easy Way to Track your Progress!",
    image: `${UPLOADS}/2023/01/41h6em2xz1L-244x300.jpg`,
    url: "https://www.amazon.com/dp/1953653111",
  },
  {
    title: "Golf Travel Journal",
    description:
      "Golf Travel Journal: The Perfect Way to Keep Track of Your Golf Adventures!",
    image: `${UPLOADS}/2023/01/1953653138.01._SCLZZZZZZZ_SX500_-201x300.jpg`,
    url: "https://www.amazon.com/Golf-Travel-Journal-Perfect-Adventures/dp/1953653138",
  },
];

export type PostBlock =
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | { type: "heading"; text: string }
  | { type: "ordered"; items: { lead: string; text: string }[] }
  | { type: "numbered"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  date: string;
  isoDate: string;
  longDate: string;
  author: string;
  category: string;
  tag: string;
  cardImage: string;
  heroImage: string;
  excerpt: string;
  blocks: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: "the-fusion-of-golf-and-business-tactics",
    title: "The Fusion of Golf and Business Tactics",
    date: "Dec 19, 2023",
    isoDate: "2023-12-19",
    longDate: "December 19, 2023",
    author: "Joel Snyder",
    category: "Golf Tips",
    tag: "business golf",
    cardImage: `${UPLOADS}/2024/05/sisters-640x420-1.jpg`,
    heroImage: `${UPLOADS}/2024/05/sisters-640x420-1.jpg`,
    excerpt:
      "SisterGolf teaches women business professionals how they can use golf as a tool for developing mutually beneficial business relationships.",
    blocks: [
      {
        type: "paragraph",
        text: "SisterGolf teaches women business professionals how they can use golf as a tool for developing mutually beneficial business relationships, and creating connections for professional advancement in the corporate workplace.",
      },
      {
        type: "paragraph",
        text: "The company is dedicated to empowering women through sports, exploring the myriad of benefits of golf, as well as driving impactful charitable efforts that bring about positive change in the community.",
      },
      {
        type: "paragraph",
        text: "By actively promoting inclusivity and breaking gender barriers, SisterGolf aspires to cultivate a community not of only strong women but also strong women golfers.",
      },
      {
        type: "paragraph",
        text: "SisterGolf\u2019s goals are to build relationships, close more deals, and get promoted.",
      },
      {
        type: "paragraph",
        text: "The women of SisterGolf believe in playing golf to achieve business and career success.",
      },
      {
        type: "paragraph",
        text: "Through private coaching, one-on-one training, and workshops \u2026 SisterGolf is all about bettering your business self through the great game of golf.",
      },
    ],
  },
  {
    slug: "should-you-mark-and-play-with-practice-balls",
    title: "Should you mark and play with \u201cpractice balls\u201d?",
    date: "Jan 21, 2021",
    isoDate: "2021-01-21",
    longDate: "January 21, 2021",
    author: "Shella Sylla",
    category: "Golf Tips",
    tag: "practice balls",
    cardImage: `${UPLOADS}/2021/01/Practice-balls-1024x1024-1-770x500.jpg`,
    heroImage: `${UPLOADS}/2021/01/Practice-balls-1024x1024-1.jpg`,
    excerpt:
      "A common question in golf groups \u2014 and a perspective on why beginners should absolutely mark and play with practice balls.",
    blocks: [
      {
        type: "paragraph",
        text: "I recently came across an interesting discussion in a golf group. The question was something to the effect of, \u201cWould you put your initials on practice balls that you found?\u201d. I have an interesting perspective or answer to that. But first some definitions. For purposes of this article, we will define marking your ball, as putting your initials or any other symbol that identifies a ball as yours, on the ball.",
      },
      {
        type: "paragraph",
        text: "Marking your ball is a common practice in golf because during the course of a round, it is very likely that you will come across other balls that are the exact same brand and color as the ball that you are playing with. Therefore, marking your ball prevents you from inadvertently picking up, or playing someone else\u2019s ball.",
      },
      {
        type: "paragraph",
        text: "Practice balls are typically balls used at the driving range, have the word \u201cpractice\u201d stamped on them, and are usually low quality balls that have been hit hundreds if not thousands of times by patrons practicing on the range.",
      },
      {
        type: "paragraph",
        text: "So back to our question, \u201cShould you mark and play with \u201cpractice balls\u201d? If you\u2019re a beginner, my answer is absolutely yes!! While some may view marking & playing with \u201cpractice balls\u201d as a negative, here are some positives to doing so:",
      },
      {
        type: "quote",
        text: "\u201cShould you mark and play with \u201cpractice balls\u201d? If you\u2019re a beginner, my answer is absolutely yes!!",
      },
      {
        type: "numbered",
        items: [
          "Depending on the type you use, balls can be expensive, and as a beginner golfer, you\u2019re going to lose a lot of them. Knowing this in advance will help you be detached from the ball. Meaning, if you lose it, no big deal, just grab another one out of your bag and keep playing.",
          "Playing with practice balls as a new golfer, will help with the pace of play; as it will spare you from wasting precious time looking for lost balls.",
          "There are many instances where practice balls from the golf range end up on the fairway. So if you were playing a round of golf with a practice ball you\u2019d definitely want to mark it so you can identify, and differentiate it from a practice ball that may have been left randomly on the course by someone who was practicing on the range.",
        ],
      },
      {
        type: "paragraph",
        text: "In addition to the above-mentioned benefits, I actually have a unique perspective on playing with \u201cPractice balls\u201d. I have a friend who works PGA tournaments, whether it be the Masters, whether it be the FedEx cup, or any of those large tournaments he travels with the PGA and works those tournaments.",
      },
      {
        type: "paragraph",
        text: "During those tournaments, the pros are given brand new Titleist Pro V1 balls stamped \u201cPractice\u201d to practice with. They hit those balls once or twice maximum, and then they\u2019re replaced with a fresh set of brand new practice balls. Since my friend works in those tournaments, he often gets a chance to collect the minimally used balls and gift them to friends like me.",
      },
      {
        type: "paragraph",
        text: "As a result, if I\u2019m playing a round of golf with friends, I happily mark and play with those barely used Titleist Pro V 1s. So if you are a newbie golfer and fortunate enough to be gifted with, or happen to find practice balls and you want to mark and use them during your rounds of golf; by all means, go ahead and do so.",
      },
    ],
  },
  {
    slug: "five-reasons-you-should-pick-up-a-golf-club-today",
    title: "5 Reasons to Pick Up a Golf Club Today",
    date: "Apr 20, 2020",
    isoDate: "2020-04-20",
    longDate: "April 20, 2020",
    author: "Shella Sylla",
    category: "Golf Tips",
    tag: "start playing golf",
    cardImage: `${UPLOADS}/2020/04/N1-1024-770x500.jpg`,
    heroImage: `${UPLOADS}/2020/04/N1-1024.jpg`,
    excerpt:
      "Golf incorporates cardiovascular work, strength training, balance and mental concentration \u2014 and it can propel your career too.",
    blocks: [
      {
        type: "paragraph",
        text: "Golf has been given a bad rap in the past for being the lazy man\u2019s sport. This is simply not true.",
      },
      {
        type: "paragraph",
        text: "Anytime you turn on the TV to watch professional golf, you see fit and incredible athletes. Golf is an amazing sport which incorporates cardiovascular, strength training, balance, and mental concentration. It\u2019s a health boost for the inside and out, which can be enjoyed no matter your age, sex, or finances.",
      },
      {
        type: "quote",
        text: "Golf is an amazing sport which incorporates cardiovascular, strength training, balance, and mental concentration.",
      },
      {
        type: "heading",
        text: "Here are your five amazing reasons to get out swinging today:",
      },
      {
        type: "ordered",
        items: [
          {
            lead: "Awesome workout",
            text: "The golf swing alone involves every muscle in the body to make a solid strike at the ball. Although it may not be as intense as running a marathon, the combination of walking up and down hills, carrying your clubs, and swinging the club during the round sure is a good blood pumping workout. During a typical round of golf, players will walk anywhere between 4 to 7 miles, not to mention burning close to 1200 calories for a 4 hour round of golf, not too shabby at all. Another amazing bonus is the use of balance to swing the club. Any time you have to stabilize your body, you use your core muscles in your abs, your lower back, and your glutes. Being able to strengthen these muscles means stronger posture and of course a flatter tummy.",
          },
          {
            lead: "Stress relief",
            text: "Much like at the gym, your body produces the same stress relieving hormones called endorphins while playing golf. And who wouldn\u2019t want an escape from your everyday stresses from time to time? This game demands your utmost attention to develop a game plan on the course and to swing the club. Having to concentrate on shot after shot gives your mind and body the vacation it may need to relax and recharge for what\u2019s going on in your life. Not to mention, playing golf may increase your life. A recent study of 500,000 golfers in Sweden concluded the average life expectancy increased by five years. This longer life may be a clear result of a happier, less stressful life lived by avid golfers.",
          },
          {
            lead: "You\u2019ll be Happier",
            text: "There\u2019s a good reason why our mothers were always pushing us to play outside, because it really is good for us. As a society, close to 1 billion people are deficient in Vitamin D. We need Vitamin D to help our bodies absorb calcium for vital bodily functions and to support strong bones. This essential vitamin also prevents depression, osteoporosis, heart disease, and lowers blood pressure. Although, there are supplements for Vitamin D, over-supplementing with this vitamin can actually be toxic for the body. Our body absorbs it best through sun exposure and natural food sources. Twenty minutes outside a couple of times a week is all that\u2019s needed of sun exposure. Getting outside increases energy levels, produces feelings of satisfaction and vitality, relieves tension or anger, and promotes a better night\u2019s sleep.",
          },
          {
            lead: "Fun Family Activity",
            text: "A family that plays together, stays together. It may seem like a dream that\u2019s out of reach to find an activity that the whole family can enjoy. However, golf allows parents and kids to get outside, have fun, and truly enjoy each other\u2019s company. This game equalizes everyone\u2019s skills, no matter what age or size, everyone has the ability to play and enjoy this game.",
          },
          {
            lead: "Use it to propel your career",
            text: "Even if you don\u2019t enjoy golf as a favorite past time, you should consider picking it up for career opportunities alone. Four hours on the golf course is a great way to build rapport with colleagues and your boss. On the course, CEOs can see how prospects and employees handle themselves in stressful and demanding situations. It will expose your true character, test your honesty, and humble even the best athletes. Any time you can spend with your boss in a carefree and relaxing environment which can ultimately promote your career, take it.",
          },
        ],
      },
    ],
  },
  {
    slug: "practice-the-way-you-play",
    title: "Practice the Way You Play",
    date: "Apr 02, 2019",
    isoDate: "2019-04-02",
    longDate: "April 2, 2019",
    author: "Shella Sylla",
    category: "Golf Tips",
    tag: "changing clubs",
    cardImage: `${UPLOADS}/2019/04/N6-1024-770x500.jpg`,
    heroImage: `${UPLOADS}/2019/04/N6-1024.jpg`,
    excerpt:
      "Golf is the one sport where the practice field is different from the actual playing field. Here is how to close the gap.",
    blocks: [
      {
        type: "paragraph",
        text: "Did you know that golf is the one sport where the practice field is different from the actual playing field? For the most part, golf is learned and practiced on the driving range, but played on the golf course. On the range, both newbie and seasoned golfers perfect their swing technique by hitting tens, hundreds, and in the case of professional golfers, thousands of balls into the field. The goal of this exercise is to get so comfortable with the feeling of striking the ball properly, that you no longer have to think about it, and it just comes naturally. Unfortunately, in the process of doing this, most beginner and amateur golfers develop poor habits.",
      },
      {
        type: "quote",
        text: "The number one habit that has been witnessed on the practice range time and time again, is hitting the same club over and over and over again in succession.",
      },
      {
        type: "paragraph",
        text: "This is good when you are a brand new golfer, and are attempting to get comfortable with the proper grip of the club, swing motion, and making contact with the ball. However, once, you\u2019ve reached the point where you\u2019re connecting with the ball consistently (even if all of your shots aren\u2019t pretty), it\u2019s now time to practice the way you play. This means, changing your club between shots to simulate what you would experience on the golf course.",
      },
      {
        type: "paragraph",
        text: "Here\u2019s an example: You\u2019re on the tee box on a Par 5, Club Sequence (Driver, Long Iron, Mid Iron, Putter).",
      },
      {
        type: "paragraph",
        text: "It has been said that practice makes perfect, but the more accurate statement is perfect practice makes perfect. If you practice the way you play, two things are bound to happen.",
      },
      {
        type: "paragraph",
        text: "#1 You\u2019ll achieve better results when you take your game from the range to the course.",
      },
      {
        type: "paragraph",
        text: "#2 You\u2019ll escape the prospect of being dubbed a range superstar.* Now that you\u2019re armed with a good strategy, who\u2019s ready to start practicing?",
      },
      {
        type: "paragraph",
        text: "*A range superstar, is one who hits great shots at the driving range, but bombs on the actual golf course.",
      },
    ],
  },
  {
    slug: "how-golf-acts-as-an-equalizer-in-business",
    title: "How Golf Acts as an Equalizer in Business",
    date: "Jan 22, 2019",
    isoDate: "2019-01-22",
    longDate: "January 22, 2019",
    author: "Shella Sylla",
    category: "Golf Tips",
    tag: "business equalizer",
    cardImage: `${UPLOADS}/2019/01/N5-1024-770x500.jpg`,
    heroImage: `${UPLOADS}/2019/01/N5-1024.jpg`,
    excerpt:
      "Golf is a game anyone can play regardless of gender, height, athletic ability or social status \u2014 and that makes it a business equalizer.",
    blocks: [
      {
        type: "paragraph",
        text: "Golf is often referred to as \u201cThe Gentleman\u2019s Game\u201d due to its status as a game that anyone can play regardless of their gender, height, athletic ability, or social status. As long as you understand the proper techniques, fundamentals, and terminology, you can always utilize golfing as a method to engage other players on an equal level.",
      },
      {
        type: "paragraph",
        text: "However, one glaring issue within the golfing world is the lack of diversity. With the exception of a few key figures, such as Tiger Woods and Michelle Wie, most golfing settings often involve white male players, which can often make the golf course feel like a boy\u2019s club.",
      },
      {
        type: "paragraph",
        text: "This is where SisterGolf comes into play. SisterGolf is dedicated to leveling the playing field by teaching women the fundamentals of golf in addition to professional development in order to enhance both their careers and personal relationships.",
      },
      {
        type: "quote",
        text: "SisterGolf is dedicated to leveling the playing field by teaching women the fundamentals of golf in addition to professional development in order to enhance both their careers and personal relationships.",
      },
      {
        type: "paragraph",
        text: "It\u2019s no secret that business deals are often closed on the course, and often the bonding experience of playing the \u201cgentleman\u2019s game\u201d as a lady makes you stand out even more amongst your peers, especially if you happen to be a person of color. Let\u2019s say you want to set a business meeting with a potential partner or investor with whom you didn\u2019t have a prior relationship. How about you invite them to a game of golf?",
      },
      {
        type: "paragraph",
        text: "Everyone from the most casual to seasoned golfer can enjoy a round of golf while networking, as long as you maintain the rules of etiquette while doing so. For example, allowing other players to take the first shot at the tee, marking your ball on the green, and raking the sand trap after your shot are all important aspects to the game, but they also demonstrate that you care about your fellow players and their enjoyment of the game.",
      },
      {
        type: "paragraph",
        text: "Showcasing traits such as generosity, patience, and a healthy dose of humor will not only make you stand out on the course, but they will allow you to network with other professionals who value these traits in both the green and the boardroom.",
      },
    ],
  },
  {
    slug: "what-is-sister-golf",
    title: "What is SisterGolf?",
    date: "Jan 15, 2019",
    isoDate: "2019-01-15",
    longDate: "January 15, 2019",
    author: "Shella Sylla",
    category: "Golf Tips",
    tag: "learning golf",
    cardImage: `${UPLOADS}/2019/01/N3-1024-770x500.jpg`,
    heroImage: `${UPLOADS}/2019/01/N3-1024.jpg`,
    excerpt:
      "Not a non-profit, not a membership group \u2014 a business development firm that equips women to leverage golf for career success.",
    blocks: [
      {
        type: "paragraph",
        text: "We get asked that question quite a bit? Are we a non-profit? Are we a membership group? Are we a coaching organization that teaches women to play golf? The answer is\u2026kinda sorta but not really.",
      },
      {
        type: "paragraph",
        text: "We are not a non-profit, we are not a membership group, and we don\u2019t just focus on teaching women to play golf. We are a business development firm that specializes in equipping women with the tools to leverage the sport of golf for business and career success!",
      },
      {
        type: "paragraph",
        text: "We do this via our online courses, periodic live workshops, and our one-on-one on course sessions.",
      },
      {
        type: "paragraph",
        text: "Through these various channels we share how golf has been used for centuries by men as a way to network and create relationships that lead to profitable business deals; and how when used correctly by women the benefits that golf bestows on their ability to gain more visibility and close more deals are immediate and exponential.",
      },
      {
        type: "quote",
        text: "We share how golf has been used for centuries by men as a way to network and create relationships that lead to profitable business deals.",
      },
      {
        type: "paragraph",
        text: "\u201cIf you give somebody else what you have discovered, that is the greatest joy!\u201d \u2013 Jean Nidetch",
      },
      {
        type: "paragraph",
        text: "I have made connections, gotten referrals, been offered job opportunities, made friends, and closed deals all as a result of golf. As a result, discovering that this sport is a catalyst for so many benefits, I am joyful every time I have the opportunity to share it with others. If you\u2019d like to experience the benefits golf can offer you, register for one of our programs.",
      },
    ],
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);

export type Press = { name: string; logo: string; url: string };

export const press: Press[] = [
  {
    name: "The Birmingham Times",
    logo: `${UPLOADS}/2023/01/ASA-Birmingham-Times-Logo.png`,
    url: "https://www.birminghamtimes.com/2017/04/sistergolf-takes-female-empowerment-to-the-green/",
  },
  {
    name: "Hoover Sun",
    logo: `${UPLOADS}/2023/01/ASA-Hoover-Sun-Logo.png`,
    url: "https://hooversun.com/peopleplaces/joining-the-club723/",
  },
  {
    name: "StyleBlueprint",
    logo: `${UPLOADS}/2023/01/ASA-Style-Blueprint-Logo.png`,
    url: "https://styleblueprint.com/birmingham/everyday/shella-sylla-sistergolf/",
  },
  {
    name: "Business Alabama",
    logo: `${UPLOADS}/2023/01/ASA-Business-Alabama-Lt.png`,
    url: "https://businessalabama.com/four-worth-studying/",
  },
  {
    name: "Doing More Today",
    logo: `${UPLOADS}/2023/01/ASA-Doing-More-Logo.png`,
    url: "https://doingmoretoday.com/golf-as-a-great-equalizer/",
  },
  {
    name: "Regions",
    logo: `${UPLOADS}/2023/01/As-Seen-On-Regions.png`,
    url: "https://www.3blmedia.com/news/golf-great-equalizer",
  },
];

export type Testimonial = { title: string; youtubeId: string };

export const testimonials: Testimonial[] = [
  { title: "SisterGolf Workshop \u2014 Meadows Testimonial", youtubeId: "eH6vxNEds90" },
  { title: "SisterGolf Workshop \u2014 Lyndsy & Jackie Testimonial", youtubeId: "7CTi6-fqxUQ" },
  { title: "SisterGolf Workshop \u2014 Pouncy Testimonial", youtubeId: "Xrjm6SJptik" },
];

export const links = {
  newsletter: "https://sistergolfonline.com/mailchimp-signup/",
  calendly: "https://calendly.com/sistergolf/30min",
};

export const images = {
  heroGolfer: `${UPLOADS}/2023/01/Red-woman-golfer-rev661.png`,
  heroBall: `${UPLOADS}/2020/02/thsn-ball.png`,
  founderMessage: `${UPLOADS}/2023/01/Shella-Message.jpg`,
  founderPortrait: `${UPLOADS}/2023/01/Shella-Message.jpg`,
  signature: `${UPLOADS}/2023/01/sella-sig.png`,
  history: [
    `${UPLOADS}/2023/01/Slide-1.jpg`,
    `${UPLOADS}/2023/01/Slide-2.jpg`,
    `${UPLOADS}/2023/01/Slide-3.jpg`,
    `${UPLOADS}/2023/01/Slide-4.jpg`,
  ],
};
