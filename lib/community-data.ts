export interface CommunityPost {
  id: string;
  type: 'ROOM' | 'JOB';
  title: string;
  description: string;
  country: 'japan' | 'korea';
  city: string;
  area: string;
  // Financials
  price: number; // Monthly rent for ROOM, hourly wage or monthly salary for JOB
  priceUnit: 'PER_MONTH' | 'PER_HOUR' | 'PER_DAY';
  currency: 'JPY' | 'KRW';
  serviceCharge: number; // 0 = Free, or specific amount for agent/referral facilitation fee
  serviceChargeNote?: string;
  // Duration & Scheduling
  duration: string; // e.g. "Part-time (28h/wk)", "Full-time", "1-3 Months", "Long-term (1yr+)"
  // Poster & Verification
  authorId: string;
  authorName: string;
  authorPhone?: string;
  isPhoneVerified: boolean;
  contactPreference: 'IN_APP' | 'WHATSAPP' | 'PHONE';
  // Additional metadata
  tags: string[];
  deposit?: number; // For rooms
  maintenanceFee?: number; // For rooms
  viewsCount: number;
  likesCount: number;
  sharesCount?: number;
  status: 'ACTIVE' | 'FILLED' | 'EXPIRED';
  createdAt: string;
}

export interface PostComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
}

export interface DirectMessage {
  id: string;
  postId: string;
  postTitle: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

// Initial rich seed listings
export const INITIAL_POSTS: CommunityPost[] = [
  // ── JAPAN ROOMS ──
  {
    id: 'room-jp-1',
    type: 'ROOM',
    title: 'Private 1K Apartment near Shin-Okubo Station (No Key Money / Reikin)',
    description: `Clean and spacious 1K apartment located just 4 minutes walk from JR Shin-Okubo station. 
Surrounded by halal groceries, Nepali restaurants, and Asian supermarkets.

• Layout: 1K (approx 20 sqm) with separate bathroom and toilet
• Furnishing: Air conditioner, mini-fridge, washing machine hookup included
• Wi-Fi: Free high-speed fiber internet
• Requirements: Gaijin-friendly, no guarantor company needed for students with valid student visa.
• Deposit (Shikikin): 1 month (refundable upon move-out)
• Key Money (Reikin): ¥0 (Zero!)`,
    country: 'japan',
    city: 'Tokyo',
    area: 'Shin-Okubo / Shinjuku-ku',
    price: 68000,
    priceUnit: 'PER_MONTH',
    currency: 'JPY',
    serviceCharge: 0,
    serviceChargeNote: 'Direct owner listing — Free assistance, no agent commission!',
    duration: 'Long-term (6+ Months)',
    authorId: 'user-suraj-tokyo',
    authorName: 'Suraj Shrestha',
    authorPhone: '+81-80-9123-4567',
    isPhoneVerified: true,
    contactPreference: 'IN_APP',
    tags: ['Near Station', 'No Reikin', 'Gaijin Friendly', 'Free Wi-Fi', 'Furnished'],
    deposit: 68000,
    maintenanceFee: 3000,
    viewsCount: 420,
    likesCount: 38,
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
  },
  {
    id: 'room-jp-2',
    type: 'ROOM',
    title: 'Spacious Sharehouse Bed in Ikebukuro — All Utilities Included',
    description: `Looking for a friendly roommate to share a neat 2DK apartment in Ikebukuro. 
Only 7 minutes walk to Ikebukuro West Exit.

• Rent: ¥42,000 per month
• Utilities: Electricity, gas, water, and 1Gbps Wi-Fi fully included in rent!
• Shared spaces: Clean kitchen, cooking utensils, washing machine, balcony
• Roommate vibe: Quiet Nepali & Vietnamese university students. Non-smoking room.
• Immediate move-in available.`,
    country: 'japan',
    city: 'Tokyo',
    area: 'Ikebukuro / Toshima-ku',
    price: 42000,
    priceUnit: 'PER_MONTH',
    currency: 'JPY',
    serviceCharge: 3000,
    serviceChargeNote: 'Small ¥3,000 paperwork and key preparation facilitation fee',
    duration: 'Short or Long-term (3+ Months)',
    authorId: 'user-bikash-ikebukuro',
    authorName: 'Bikash Adhikari',
    authorPhone: '+81-90-8877-1122',
    isPhoneVerified: true,
    contactPreference: 'IN_APP',
    tags: ['All Bills Included', 'Ikebukuro Hub', 'Immediate Move-in', 'Nepali Friendly'],
    deposit: 20000,
    maintenanceFee: 0,
    viewsCount: 310,
    likesCount: 24,
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: 'room-jp-3',
    type: 'ROOM',
    title: 'Osaka Namba UR Housing Studio — Zero Agent Fee & Zero Guarantor',
    description: `UR Renaissance housing complex near Namba & Nihonbashi station.
UR apartments have strictly ZERO key money, ZERO renewal fees, and NO guarantor company requirement!

• Floor space: 28 sqm large studio with balcony
• Excellent sunlight and soundproof concrete building
• Perfect for couple or 2 student roommates sharing rent (¥35,000 each)
• Move-in paperwork assistance available in Nepali/English.`,
    country: 'japan',
    city: 'Osaka',
    area: 'Namba / Chuo-ku',
    price: 70000,
    priceUnit: 'PER_MONTH',
    currency: 'JPY',
    serviceCharge: 0,
    serviceChargeNote: 'Free official UR orientation & document submission support',
    duration: 'Long-term (1 Year+)',
    authorId: 'user-ram-osaka',
    authorName: 'Ram Gurung',
    authorPhone: '+81-70-1234-9876',
    isPhoneVerified: true,
    contactPreference: 'IN_APP',
    tags: ['UR Housing', 'No Key Money', 'Osaka Namba', 'Couples Welcome', 'Zero Guarantor'],
    deposit: 140000,
    maintenanceFee: 4500,
    viewsCount: 280,
    likesCount: 19,
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
  },

  // ── KOREA ROOMS ──
  {
    id: 'room-kr-1',
    type: 'ROOM',
    title: 'Hongdae Premium Goshiwon with Private Bathroom & Free Rice/Ramen',
    description: `Modern renovated Goshiwon right next to Hongik University Station Exit 9.
Perfect for D-4 language trainees or D-2 students seeking zero-deposit budget living in Seoul!

• Rent: ₩450,000 / month (Zero deposit! No ₩5M/₩10M Wolse deposit required)
• Private ensuite bathroom with hot shower and toilet
• Individual AC, desk, ergonomic chair, wardrobe, and mini fridge
• Free kitchen amenities: Unlimited warm steamed rice, instant ramen, kimchi, and coffee
• 24-hour CCTV security, separate male and female floors.`,
    country: 'korea',
    city: 'Seoul',
    area: 'Hongdae / Mapo-gu',
    price: 450000,
    priceUnit: 'PER_MONTH',
    currency: 'KRW',
    serviceCharge: 0,
    serviceChargeNote: 'Direct Goshiwon manager listing — ₩0 Free referral!',
    duration: 'Flexible (1 Month to 1 Year)',
    authorId: 'user-minho-seoul',
    authorName: 'Suman Thapa (Manager)',
    authorPhone: '+82-10-5544-3322',
    isPhoneVerified: true,
    contactPreference: 'IN_APP',
    tags: ['Zero Deposit', 'Free Food', 'Private Shower', 'Hongdae', 'Student Friendly'],
    deposit: 0,
    maintenanceFee: 0,
    viewsCount: 512,
    likesCount: 47,
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: 'room-kr-2',
    type: 'ROOM',
    title: 'Bright One-Room Studio in Dongdaemun (Wolse ₩500,000 / Deposit ₩3,000,000)',
    description: `Sun-lit 2nd floor One-room studio situated between Dongdaemun History & Culture Park and Sinseol-dong.
Close to D-2 universities (Korea Univ, Hankuk University of Foreign Studies, Hanyang Univ).

• Size: 24 sqm
• Deposit: ₩3,000,000 (standard Wolse)
• Monthly Rent: ₩500,000 + ₩50,000 building maintenance (includes water & internet)
• Facilities: Induction cooktop, washing machine, microwave, large wardrobe
• Clean contract registered with local Dong community center.`,
    country: 'korea',
    city: 'Seoul',
    area: 'Dongdaemun-gu',
    price: 500000,
    priceUnit: 'PER_MONTH',
    currency: 'KRW',
    serviceCharge: 50000,
    serviceChargeNote: '₩50,000 real estate translation & contract witness fee',
    duration: '1 Year Lease',
    authorId: 'user-kiran-dongdaemun',
    authorName: 'Kiran Karki',
    authorPhone: '+82-10-9988-7766',
    isPhoneVerified: true,
    contactPreference: 'IN_APP',
    tags: ['One-Room', 'Wolse', 'Dongdaemun', 'Near Universities', 'Furnished'],
    deposit: 3000000,
    maintenanceFee: 50000,
    viewsCount: 390,
    likesCount: 31,
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
  },

  // ── JAPAN JOBS ──
  {
    id: 'job-jp-1',
    type: 'JOB',
    title: '7-Eleven Night Shift Cashier & Stocking Staff (Shinjuku Area)',
    description: `Convenience store staff needed for night shifts at 7-Eleven near Shinjuku Kabukicho / Okubo.
Friendly store owner welcoming foreign international students!

• Hourly Rate: ¥1,400 / hour (includes 25% late night statutory allowance between 22:00–05:00)
• Daytime Rate: ¥1,120 / hour
• Shifts Available: 22:00 – 06:00 (Friday, Saturday, Sunday) or 17:00 – 22:00
• Work Limit: Strictly adheres to 28 hours/week student visa legal limit
• Transportation allowance: Fully covered up to ¥15,000 / month
• Requirements: Basic conversational Japanese (JLPT N4 or JFT-Basic equivalent to handle cash register)
• Uniform provided.`,
    country: 'japan',
    city: 'Tokyo',
    area: 'Shinjuku-ku',
    price: 1400,
    priceUnit: 'PER_HOUR',
    currency: 'JPY',
    serviceCharge: 0,
    serviceChargeNote: 'Zero fees — direct employer recruitment!',
    duration: 'Part-time (28h/week limit)',
    authorId: 'user-tanaka-manager',
    authorName: 'Yamada Store Manager',
    authorPhone: '+81-3-3366-9900',
    isPhoneVerified: true,
    contactPreference: 'IN_APP',
    tags: ['Night Shift', '¥1,400/hr', 'Transit Paid', 'JLPT N4 OK', 'Student Friendly'],
    viewsCount: 640,
    likesCount: 55,
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 'job-jp-2',
    type: 'JOB',
    title: 'SSW-1 Food Service / Restaurant Kitchen & Hall Staff (Osaka Umeda)',
    description: `Full-time Specified Skilled Worker (SSW-1) recruitment for famous Yakiniku / Dining chain in Osaka.
Visa change from Student Visa or SSW Skill Test passers warmly welcome.

• Salary: ¥235,000 – ¥265,000 / month + Annual Bonus
• Work Visa: Official SSW-1 visa sponsorship & certificate of eligibility processing covered by employer
• Working hours: 8 hours/day, 2 days off per week
• Social Insurance: Full Shakai Hoken (Health, Pension, Employment Insurance)
• Free Staff Meal (Makanai) provided every shift!
• Requirements: Passed SSW Food Service Skill Test + JLPT N4 or JFT-Basic.`,
    country: 'japan',
    city: 'Osaka',
    area: 'Umeda / Kita-ku',
    price: 245000,
    priceUnit: 'PER_MONTH',
    currency: 'JPY',
    serviceCharge: 10000,
    serviceChargeNote: '¥10,000 interview coaching and immigration paperwork review fee',
    duration: 'Full-time SSW Visa (5 Years)',
    authorId: 'user-deepak-osaka',
    authorName: 'Deepak Sharma (Recruiter)',
    authorPhone: '+81-90-4433-2211',
    isPhoneVerified: true,
    contactPreference: 'IN_APP',
    tags: ['SSW-1 Visa', 'Full-time', 'Visa Sponsorship', 'Free Makanai', 'Osaka Umeda'],
    viewsCount: 780,
    likesCount: 68,
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
  {
    id: 'job-jp-3',
    type: 'JOB',
    title: 'Yamato Logistics Night Parcel Sorting (Shinagawa Hub)',
    description: `High-paying student night shift at major logistics terminal in Tokyo.
Minimal Japanese required — perfect for newly arrived students who just passed N5!

• Hourly Rate: ¥1,380 / hour (Late night shift)
• Schedule: 23:00 to 06:30 (flexible days 2–4 days/week)
• Job duty: Sorting barcoded parcels onto conveyors by prefecture
• No heavy conversation needed. Nepali team leaders on-site to train you.
• Weekly pay or bi-weekly bank transfer.`,
    country: 'japan',
    city: 'Tokyo',
    area: 'Shinagawa / Ota-ku',
    price: 1380,
    priceUnit: 'PER_HOUR',
    currency: 'JPY',
    serviceCharge: 0,
    serviceChargeNote: 'Free introduction — no deductions or commission fees',
    duration: 'Part-time (Flexible shifts)',
    authorId: 'user-prakash-tokyo',
    authorName: 'Prakash Rana',
    authorPhone: '+81-80-6677-8899',
    isPhoneVerified: true,
    contactPreference: 'IN_APP',
    tags: ['No Japanese Required', 'Weekly Pay', '¥1,380/hr', 'Nepali Team', 'Logistics'],
    viewsCount: 530,
    likesCount: 42,
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
  },

  // ── KOREA JOBS ──
  {
    id: 'job-kr-1',
    type: 'JOB',
    title: 'CU / GS25 Convenience Store Evening Cashier (Seoul Sillim)',
    description: `Weekend & Evening part-time alba (알바) position for foreign university students in Seoul.
Located 2 mins from Sillim Station (Line 2).

• Hourly Wage: ₩10,500 / hour (above Korea 2026 minimum wage of ₩10,030)
• Schedule: Saturdays & Sundays 15:00 – 23:00 (16 hrs/week, complies with D-2 permit)
• Free coffee, drink, and snack perks during shifts
• Duties: POS cashier, shelving instant cup noodles, light floor tidying
• Requirements: TOPIK Level 2 or basic conversational Korean. Valid D-2 Part-Time Work Permit.`,
    country: 'korea',
    city: 'Seoul',
    area: 'Sillim / Gwanak-gu',
    price: 10500,
    priceUnit: 'PER_HOUR',
    currency: 'KRW',
    serviceCharge: 0,
    serviceChargeNote: 'Direct store owner recruitment — ₩0 Free!',
    duration: 'Part-time (16h/week)',
    authorId: 'user-choi-sillim',
    authorName: 'Mr. Choi (Owner)',
    authorPhone: '+82-10-8877-6655',
    isPhoneVerified: true,
    contactPreference: 'IN_APP',
    tags: ['Part-time Alba', '₩10,500/hr', 'Sillim Line 2', 'TOPIK 2 OK', 'Weekend Shift'],
    viewsCount: 460,
    likesCount: 39,
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
  {
    id: 'job-kr-2',
    type: 'JOB',
    title: 'EPS E-9 Manufacturing Machine Operator & Packaging (Incheon Namdong)',
    description: `Official EPS E-9 manufacturing factory located in Namdong Industrial Complex.
Clean auto parts assembly line.

• Salary: ₩2,350,000 – ₩2,750,000 / month (includes overtime & holiday allowances)
• Dormitory & 3 hot meals provided daily for minimal cost
• Four Major Insurances (국민건강보험, 국민연금, 고용보험, 산재보험) fully enrolled
• Return Cost Insurance & Departure Guarantee Insurance covered
• E-7-4 point upgrade support for hardworking employees after 4 years!
• Requirements: EPS-TOPIK passed, assigned through HRD Korea roster.`,
    country: 'korea',
    city: 'Incheon',
    area: 'Namdong Industrial Complex',
    price: 2450000,
    priceUnit: 'PER_MONTH',
    currency: 'KRW',
    serviceCharge: 0,
    serviceChargeNote: 'Official Government EPS System — Strictly zero private brokerage fees!',
    duration: 'Full-time E-9 (3 Years + 1 Year 10 Months)',
    authorId: 'user-rajesh-incheon',
    authorName: 'Rajesh Chaudhari (Team Leader)',
    authorPhone: '+82-10-3322-1144',
    isPhoneVerified: true,
    contactPreference: 'IN_APP',
    tags: ['E-9 EPS', 'Dormitory Included', 'Overtime Bonus', 'E-7-4 Pathway', 'Incheon'],
    viewsCount: 890,
    likesCount: 76,
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 16).toISOString(),
  },
];

// In-memory runtime storage for persistence across API requests during session
let memoryPosts: CommunityPost[] = [...INITIAL_POSTS];
let memoryComments: PostComment[] = [
  {
    id: 'c-1',
    postId: 'room-jp-1',
    authorId: 'u-ashok',
    authorName: 'Ashok Thapa',
    content: 'Is this apartment available for move-in starting next month on October 1st? I have a student visa.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 'c-2',
    postId: 'room-jp-1',
    authorId: 'user-suraj-tokyo',
    authorName: 'Suraj Shrestha (Poster)',
    content: 'Yes Ashok! October 1st move-in is completely fine. Please send me a direct message so we can arrange a room viewing!',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'c-3',
    postId: 'job-jp-1',
    authorId: 'u-manish',
    authorName: 'Manish Neupane',
    content: 'I passed JFT-Basic last month and currently study at language school. Can I apply for Friday and Saturday night shifts?',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
];

let memoryMessages: DirectMessage[] = [
  {
    id: 'msg-1',
    postId: 'room-jp-1',
    postTitle: 'Private 1K Apartment near Shin-Okubo Station',
    senderId: 'guest-seeker',
    senderName: 'Suman Shrestha',
    receiverId: 'user-suraj-tokyo',
    receiverName: 'Suraj Shrestha',
    content: 'Namaste dai! I am currently staying at hostel in Shinjuku and looking for 1K room. Can we view this tomorrow evening?',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: 'msg-2',
    postId: 'room-jp-1',
    postTitle: 'Private 1K Apartment near Shin-Okubo Station',
    senderId: 'user-suraj-tokyo',
    senderName: 'Suraj Shrestha',
    receiverId: 'guest-seeker',
    receiverName: 'Suman Shrestha',
    content: 'Namaste bhai! Sure, tomorrow around 6:30 PM works great. Meet me at Shin-Okubo station ticket gate!',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
  },
];

let memoryBookmarks: Record<string, string[]> = {
  'default-user': ['room-jp-1', 'job-jp-1'],
};

// ── GET POSTS WITH ADVANCED MULTI-CRITERIA FILTERS ──
export function getCommunityPosts(params: {
  type?: string;
  country?: string;
  city?: string;
  area?: string;
  minPrice?: number;
  maxPrice?: number;
  maxDeposit?: number;
  zeroDepositOnly?: boolean;
  duration?: string;
  serviceChargeOnly?: boolean;
  search?: string;
}): CommunityPost[] {
  return memoryPosts.filter(post => {
    // Type Filter (ROOM vs JOB vs ALL)
    if (params.type && params.type !== 'ALL') {
      if (post.type !== params.type) return false;
    }

    // Country Filter
    if (params.country && params.country !== 'ALL' && params.country !== 'both') {
      if (post.country.toLowerCase() !== params.country.toLowerCase()) return false;
    }

    // City Filter
    if (params.city && params.city !== 'ALL') {
      if (post.city.toLowerCase() !== params.city.toLowerCase()) return false;
    }

    // Area substring match
    if (params.area && params.area.trim()) {
      if (!post.area.toLowerCase().includes(params.area.toLowerCase().trim())) return false;
    }

    // Price / Rent / Salary range
    if (params.minPrice !== undefined && post.price < params.minPrice) return false;
    if (params.maxPrice !== undefined && params.maxPrice > 0 && post.price > params.maxPrice) return false;

    // Security Deposit Filter (for housing/rooms)
    if (params.zeroDepositOnly && (post.deposit ?? 0) > 0) return false;
    if (params.maxDeposit !== undefined && params.maxDeposit >= 0 && (post.deposit ?? 0) > params.maxDeposit) return false;

    // Duration filter
    if (params.duration && params.duration !== 'ALL') {
      if (!post.duration.toLowerCase().includes(params.duration.toLowerCase())) return false;
    }

    // Free vs Service Charge filter
    if (params.serviceChargeOnly !== undefined) {
      if (params.serviceChargeOnly && post.serviceCharge === 0) return false;
    }

    // Text Search in Title, Description, Area, and Tags
    if (params.search && params.search.trim()) {
      const q = params.search.toLowerCase().trim();
      const match =
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.area.toLowerCase().includes(q) ||
        post.city.toLowerCase().includes(q) ||
        post.tags.some(t => t.toLowerCase().includes(q));
      if (!match) return false;
    }

    return true;
  });
}

// ── GET SINGLE POST DETAILS ──
export function getCommunityPostById(id: string): CommunityPost | null {
  const found = memoryPosts.find(p => p.id === id);
  if (found) {
    found.viewsCount += 1;
    return found;
  }
  return null;
}

// ── CREATE NEW POST (PHONE VERIFIED) ──
export function createCommunityPost(data: Omit<CommunityPost, 'id' | 'viewsCount' | 'likesCount' | 'status' | 'createdAt'>): CommunityPost {
  const newPost: CommunityPost = {
    ...data,
    id: `post-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    viewsCount: 1,
    likesCount: 0,
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
  };
  memoryPosts.unshift(newPost);
  return newPost;
}

// ── COMMENTS ──
export function getCommentsByPostId(postId: string): PostComment[] {
  return memoryComments.filter(c => c.postId === postId);
}

export function addComment(postId: string, authorId: string, authorName: string, content: string): PostComment {
  const comment: PostComment = {
    id: `comment-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    postId,
    authorId,
    authorName,
    content: content.trim(),
    createdAt: new Date().toISOString(),
  };
  memoryComments.push(comment);
  return comment;
}

// ── DIRECT MESSAGES ──
export function getMessagesForUser(userId: string): DirectMessage[] {
  return memoryMessages.filter(m => m.senderId === userId || m.receiverId === userId);
}

export function sendDirectMessage(data: {
  postId: string;
  postTitle: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  content: string;
}): DirectMessage {
  const msg: DirectMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    ...data,
    isRead: false,
    createdAt: new Date().toISOString(),
  };
  memoryMessages.push(msg);
  return msg;
}

// ── BOOKMARKS ──
export function togglePostBookmark(userId: string, postId: string): boolean {
  if (!memoryBookmarks[userId]) {
    memoryBookmarks[userId] = [];
  }
  const index = memoryBookmarks[userId].indexOf(postId);
  if (index > -1) {
    memoryBookmarks[userId].splice(index, 1);
    return false; // Removed
  } else {
    memoryBookmarks[userId].push(postId);
    return true; // Added
  }
}

export function getUserBookmarkedPostIds(userId: string): string[] {
  return memoryBookmarks[userId] || [];
}

// ── LIKES & SHARES (FACEBOOK ENGAGEMENT COUNTERS) ──
export function incrementPostLike(postId: string): number {
  const post = memoryPosts.find(p => p.id === postId);
  if (post) {
    post.likesCount = (post.likesCount || 0) + 1;
    return post.likesCount;
  }
  return 0;
}

export function decrementPostLike(postId: string): number {
  const post = memoryPosts.find(p => p.id === postId);
  if (post) {
    post.likesCount = Math.max(0, (post.likesCount || 1) - 1);
    return post.likesCount;
  }
  return 0;
}

export function incrementPostShare(postId: string): number {
  const post = memoryPosts.find(p => p.id === postId);
  if (post) {
    post.sharesCount = (post.sharesCount || 0) + 1;
    return post.sharesCount;
  }
  return 0;
}
