import { PostDataset } from '../types';

export const MOCK_DATASETS: PostDataset[] = [
  {
    id: 'nike-air-max-nova',
    platform: 'instagram',
    title: 'Nike Air Max Nova Global Launch',
    author: 'Nike',
    handle: '@nike',
    avatarUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&auto=format&fit=crop&q=80',
    postUrl: 'https://instagram.com/p/nike-air-max-nova',
    publishedAt: 'Yesterday, 10:00 AM',
    content: 'The blueprint for next-generation cushioning. Introducing the Air Max Nova — tuned for all-day velocity and unmatched energy return. Available worldwide Friday. #AirMax #NikeRunning',
    mediaUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80',
    likesCount: 142800,
    repostsCount: 18400,
    commentsCount: 2840,
    
    totalAnalyzedComments: 2840,
    uniqueCommenters: 2510,
    spamFilteredCount: 330,
    popularityScore: 78,
    netSentimentScore: 56,
    receptionTier: 'Strong Positive',
    
    sentimentDistribution: {
      positive: 1780,
      negative: 580,
      neutral: 240,
      inquiries: 240,
    },
    
    categories: [
      {
        id: 'design',
        name: 'Design & Aesthetics',
        icon: 'Palette',
        description: 'Silhouette, color palette, translucent bubble unit, futuristic look',
        peopleCount: 1420,
        sharePercent: 50,
        sentimentSplit: { positive: 1240, negative: 110, neutral: 50, inquiries: 20 },
        topReasons: ['Clean retro-futuristic gradient', 'Best Air Max shape in 5 years', 'Subtle branding on tongue'],
        color: '#6366f1',
      },
      {
        id: 'pricing',
        name: 'Pricing & Value',
        icon: 'Tag',
        description: 'Retail pricing ($210 MSRP), inflation, value comparison with rivals',
        peopleCount: 910,
        sharePercent: 32,
        sentimentSplit: { positive: 110, negative: 720, neutral: 60, inquiries: 20 },
        topReasons: ['Retail $210 is too steep for daily runners', 'Should be priced under $160', 'Resale market markup fears'],
        color: '#f43f5e',
      },
      {
        id: 'comfort',
        name: 'Comfort & Performance',
        icon: 'Zap',
        description: 'Foam density, arch support, heel cushioning feedback',
        peopleCount: 680,
        sharePercent: 24,
        sentimentSplit: { positive: 560, negative: 40, neutral: 50, inquiries: 30 },
        topReasons: ['Dual-chamber air unit feels promising', 'Breathable upper knit mesh', 'Excited to test marathon recovery'],
        color: '#10b981',
      },
      {
        id: 'availability',
        name: 'Availability & Sizing',
        icon: 'Package',
        description: 'SNKRS app bot drops, wide foot fit, regional release dates',
        peopleCount: 540,
        sharePercent: 19,
        sentimentSplit: { positive: 60, negative: 180, neutral: 60, inquiries: 240 },
        topReasons: ['Fears of instant bot sellouts on SNKRS', 'Inquiries on EU/Asia release dates', 'True-to-size vs half size up?'],
        color: '#f59e0b',
      },
      {
        id: 'memes',
        name: 'Banter & Culture',
        icon: 'Smile',
        description: 'Hype jokes, dad shoe memes, outfit pairings',
        peopleCount: 380,
        sharePercent: 13,
        sentimentSplit: { positive: 310, negative: 20, neutral: 40, inquiries: 10 },
        topReasons: ['My bank account is crying again', 'Matches my gym fit perfectly', 'Travis Scott collab when?'],
        color: '#ec4899',
      }
    ],
    
    keyDrivers: {
      positiveReasons: [
        {
          id: 'pos-1',
          text: 'Stunning modern silhouette and midnight cyan colorway',
          peopleCount: 1240,
          percentage: 43.6,
          sentiment: 'positive',
          impactScore: 9.4,
          representativeQuotes: [
            { text: 'That gradient fade on the sole unit is pure art. Instant cop! 🔥', author: '@kicks_collector', likes: 1420 },
            { text: 'Nike finally made a fresh silhouette that does not look like a rehashed 90s model. Bravo design team.', author: '@marcus_run', likes: 890 }
          ]
        },
        {
          id: 'pos-2',
          text: 'Enthusiasm for updated dual-density Air cushioning',
          peopleCount: 560,
          percentage: 19.7,
          sentiment: 'positive',
          impactScore: 8.1,
          representativeQuotes: [
            { text: 'If the foam under the ball of foot is softer than the 270s, this will be my daily walker.', author: '@fitlife_jen', likes: 410 },
            { text: 'Finally extra heel stabilization. Needed this for long city walks.', author: '@sole_seeker', likes: 275 }
          ]
        },
        {
          id: 'pos-3',
          text: 'High cultural excitement and lifestyle pairing potential',
          peopleCount: 310,
          percentage: 10.9,
          sentiment: 'positive',
          impactScore: 7.2,
          representativeQuotes: [
            { text: 'These with baggy cargo pants are going to go crazy this spring.', author: '@streetstyle_tokyo', likes: 630 }
          ]
        }
      ],
      negativeReasons: [
        {
          id: 'neg-1',
          text: 'Price point perceived as overly expensive ($210 MSRP)',
          peopleCount: 720,
          percentage: 25.3,
          sentiment: 'negative',
          impactScore: 8.8,
          representativeQuotes: [
            { text: 'Two hundred and ten dollars for running shoes? The sneaker economy is completely out of touch with reality.', author: '@sneaker_realist', likes: 3240 },
            { text: 'Looks gorgeous but $210 during this economy is a tough sell. Waiting for the outlet discount.', author: '@dave_deals', likes: 1120 }
          ]
        },
        {
          id: 'neg-2',
          text: 'SNKRS app bot frustration and drop anxiety',
          peopleCount: 320,
          percentage: 11.2,
          sentiment: 'negative',
          impactScore: 7.6,
          representativeQuotes: [
            { text: 'Cannot wait to take an L to bots in 0.2 seconds on Friday morning 🤡', author: '@snkrs_victim', likes: 2190 },
            { text: 'Please put bot protections. Regular sneakerheads never get to buy retail.', author: '@real_runner_99', likes: 840 }
          ]
        }
      ],
      topInquiries: [
        {
          id: 'inq-1',
          text: 'Sizing recommendations (True to size vs wide feet)',
          peopleCount: 210,
          percentage: 7.4,
          sentiment: 'inquiry',
          impactScore: 6.8,
          representativeQuotes: [
            { text: 'Are these narrow in the toe box like the 97s or true to size for wider feet?', author: '@runner_dan', likes: 340 }
          ]
        },
        {
          id: 'inq-2',
          text: 'International drop schedule & regional color exclusives',
          peopleCount: 160,
          percentage: 5.6,
          sentiment: 'inquiry',
          impactScore: 6.2,
          representativeQuotes: [
            { text: 'Is the white/cyan color dropping in the UK and Europe on the same day?', author: '@london_kicks', likes: 180 }
          ]
        }
      ]
    },
    
    sentimentTimeline: [
      { time: '10:00 AM', positive: 120, negative: 15, neutral: 20, inquiries: 30 },
      { time: '12:00 PM', positive: 540, negative: 140, neutral: 70, inquiries: 85 },
      { time: '02:00 PM', positive: 480, negative: 210, neutral: 65, inquiries: 60 },
      { time: '04:00 PM', positive: 390, negative: 130, neutral: 50, inquiries: 40 },
      { time: '06:00 PM', positive: 250, negative: 85, neutral: 35, inquiries: 25 },
    ],
    
    sampleComments: [
      {
        id: 'c1',
        author: 'Alex Rivers',
        handle: '@alex_rivers',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
        platform: 'instagram',
        text: 'That gradient fade on the sole unit is pure art. Instant cop on Friday! 🔥👟',
        likes: 1420,
        timestamp: '3h ago',
        category: 'Design & Aesthetics',
        subReason: 'Clean retro-futuristic gradient',
        sentiment: 'positive',
        confidence: 0.98,
        isVerified: true,
        detectedKeywords: ['art', 'cop', 'fire', 'gradient']
      },
      {
        id: 'c2',
        author: 'Dave Miller',
        handle: '@dave_deals',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
        platform: 'instagram',
        text: 'Two hundred and ten dollars for running shoes? The sneaker economy is completely out of touch with reality.',
        likes: 3240,
        timestamp: '4h ago',
        category: 'Pricing & Value',
        subReason: 'Retail $210 is too steep for daily runners',
        sentiment: 'negative',
        confidence: 0.96,
        isVerified: false,
        detectedKeywords: ['dollars', 'out of touch', 'expensive', 'economy']
      },
      {
        id: 'c3',
        author: 'Samantha Lee',
        handle: '@sam_kicks',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
        platform: 'instagram',
        text: 'Are these narrow in the toe box like the 97s or true to size for wider feet? Need to know before launch!',
        likes: 340,
        timestamp: '2h ago',
        category: 'Availability & Sizing',
        subReason: 'True-to-size vs half size up?',
        sentiment: 'inquiry',
        confidence: 0.94,
        isVerified: false,
        detectedKeywords: ['toe box', 'true to size', 'wide feet', 'sizing']
      },
      {
        id: 'c4',
        author: 'HypeSnkrs Daily',
        handle: '@hypesnkrs',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
        platform: 'instagram',
        text: 'Cannot wait to take an L to bots in 0.2 seconds on Friday morning 🤡 SNKRS please protect regular buyers!',
        likes: 2190,
        timestamp: '5h ago',
        category: 'Availability & Sizing',
        subReason: 'Fears of instant bot sellouts on SNKRS',
        sentiment: 'negative',
        confidence: 0.91,
        isVerified: true,
        detectedKeywords: ['bots', 'SNKRS', 'take an L', 'clown']
      },
      {
        id: 'c5',
        author: 'Dr. Marcus Vance',
        handle: '@marcus_run',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&auto=format&fit=crop&q=80',
        platform: 'instagram',
        text: 'Nike finally made a fresh silhouette that does not look like a rehashed 90s model. Bravo design team.',
        likes: 890,
        timestamp: '6h ago',
        category: 'Design & Aesthetics',
        subReason: 'Best Air Max shape in 5 years',
        sentiment: 'positive',
        confidence: 0.97,
        isVerified: false,
        detectedKeywords: ['fresh', 'silhouette', 'bravo', 'design']
      }
    ],
    
    executiveSummary: {
      headline: 'Highly Anticipated Aesthetic Hit with Pricing & SNKRS Bot Friction',
      overview: 'The Air Max Nova launch has generated enthusiastic viral reception (78% popularity score) driven largely by design innovation and futuristic colorways. 50% of all discussions centered on the visual aesthetic.',
      audienceConsensus: 'Customers consider it the most visually appealing Air Max silhouette in years, but $210 price sensitivity and past SNKRS app bot frustration represent the main sources of community backlash.',
      recommendations: [
        'Run an educational campaign highlighting the engineering justification for the $210 price tag (materials + dual-chamber tooling).',
        'Publish an official fit & sizing guide before drop day to convert the 240+ sizing inquiries into buyers.',
        'Address bot protection measures publicly on SNKRS to restore buyer confidence.'
      ],
      keyRisksOrWins: [
        'Win: 1,420 people explicitly praised aesthetic design and colorways.',
        'Risk: 720 people expressed resistance to the $210 price point.',
        'Action: High inquiry volume for wide-foot sizing represents high conversion intent.'
      ]
    }
  },

  {
    id: 'openai-omnicode-launch',
    platform: 'twitter',
    title: 'OpenAI OmniCode-2 Engine Announcement',
    author: 'OpenAI',
    handle: '@OpenAI',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    postUrl: 'https://x.com/OpenAI/status/178492019482',
    publishedAt: 'Today, 8:30 AM',
    content: 'Introducing OmniCode-2. Our new reasoning-native AI developer engine. It plans multi-file refactors, detects subtle race conditions, and runs automated sandbox unit testing. Rolling out to API and ChatGPT Plus today.',
    mediaUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    likesCount: 89400,
    repostsCount: 24300,
    commentsCount: 5420,
    
    totalAnalyzedComments: 5420,
    uniqueCommenters: 4890,
    spamFilteredCount: 530,
    popularityScore: 86,
    netSentimentScore: 72,
    receptionTier: 'Viral Praise',
    
    sentimentDistribution: {
      positive: 3820,
      negative: 640,
      neutral: 480,
      inquiries: 480,
    },
    
    categories: [
      {
        id: 'capabilities',
        name: 'Technical Capabilities & Speed',
        icon: 'Cpu',
        description: 'Multi-file refactoring, sandbox testing, context window, debugging accuracy',
        peopleCount: 2860,
        sharePercent: 53,
        sentimentSplit: { positive: 2640, negative: 80, neutral: 90, inquiries: 50 },
        topReasons: ['Sandbox auto-execution is game changing', 'Deep reasoning without hallucinations', 'Massive leap in Python/Rust synthesis'],
        color: '#3b82f6',
      },
      {
        id: 'pricing-limits',
        name: 'API Cost & Rate Limits',
        icon: 'CreditCard',
        description: 'Token pricing per million, ChatGPT Plus 40-msg limit, enterprise tiers',
        peopleCount: 1450,
        sharePercent: 27,
        sentimentSplit: { positive: 380, negative: 820, neutral: 120, inquiries: 130 },
        topReasons: ['Plus 40 msg per 3-hour limit is too restrictive', 'Token pricing beats Claude 3.5 Sonnet', 'Need unlimited subscription for solo devs'],
        color: '#f59e0b',
      },
      {
        id: 'dev-impact',
        name: 'Industry & Job Impact',
        icon: 'Briefcase',
        description: 'Junior developer hiring, software engineering shifts, IDE integration',
        peopleCount: 890,
        sharePercent: 16,
        sentimentSplit: { positive: 450, negative: 310, neutral: 110, inquiries: 20 },
        topReasons: ['10x multiplier for senior architects', 'Concerns for junior entry level positions', 'Will supercharge open source velocity'],
        color: '#8b5cf6',
      },
      {
        id: 'sdk-integration',
        name: 'SDK & Tooling Inquiries',
        icon: 'Code',
        description: 'Cursor IDE support, Python/TypeScript SDK endpoints, local execution',
        peopleCount: 740,
        sharePercent: 14,
        sentimentSplit: { positive: 180, negative: 40, neutral: 80, inquiries: 440 },
        topReasons: ['When will this be available in Cursor?', 'Can we supply custom Docker sandboxes?', 'Is streaming latency fast enough for autocomplete?'],
        color: '#06b6d4',
      }
    ],
    
    keyDrivers: {
      positiveReasons: [
        {
          id: 'omni-pos-1',
          text: 'Automated sandbox testing and multi-file coherence',
          peopleCount: 2640,
          percentage: 48.7,
          sentiment: 'positive',
          impactScore: 9.7,
          representativeQuotes: [
            { text: 'The auto-running sandbox unit test loop is literally what we have been waiting for since GPT-4.', author: '@swyx_dev', likes: 4890 },
            { text: 'Just tested it on a 25-file React refactor. It fixed 3 TypeScript type mismatches on the first try.', author: '@tech_guillermo', likes: 3120 }
          ]
        },
        {
          id: 'omni-pos-2',
          text: 'Competitive API pricing compared to rivals',
          peopleCount: 380,
          percentage: 7.0,
          sentiment: 'positive',
          impactScore: 8.2,
          representativeQuotes: [
            { text: 'Input token pricing at $3/M with full reasoning trace is ridiculously aggressive.', author: '@ai_cost_tracker', likes: 1420 }
          ]
        }
      ],
      negativeReasons: [
        {
          id: 'omni-neg-1',
          text: 'ChatGPT Plus 40-message rate limits are too restrictive for continuous coding',
          peopleCount: 820,
          percentage: 15.1,
          sentiment: 'negative',
          impactScore: 8.9,
          representativeQuotes: [
            { text: 'You hit the 40 message limit in literally 25 minutes of coding. We need a dedicated Pro Dev tier.', author: '@dan_builds', likes: 5890 },
            { text: 'Why give us reasoning models if we are capped before we can finish a single feature branch?', author: '@frontend_fan', likes: 2100 }
          ]
        },
        {
          id: 'omni-neg-2',
          text: 'Anxiety over junior engineering onboarding',
          peopleCount: 310,
          percentage: 5.7,
          sentiment: 'negative',
          impactScore: 6.9,
          representativeQuotes: [
            { text: 'Amazing tech, but companies will use this as an excuse to hire zero junior engineers this year.', author: '@sarah_codes', likes: 2450 }
          ]
        }
      ],
      topInquiries: [
        {
          id: 'omni-inq-1',
          text: 'Integration timeline for Cursor, VS Code, and JetBrains',
          peopleCount: 440,
          percentage: 8.1,
          sentiment: 'inquiry',
          impactScore: 8.4,
          representativeQuotes: [
            { text: 'Is the API compatible with standard OpenAI SDK or do we need new endpoints in Cursor?', author: '@cursor_user', likes: 870 }
          ]
        }
      ]
    },
    
    sentimentTimeline: [
      { time: '08:30 AM', positive: 650, negative: 40, neutral: 50, inquiries: 80 },
      { time: '10:00 AM', positive: 1420, negative: 180, neutral: 140, inquiries: 160 },
      { time: '12:00 PM', positive: 980, negative: 240, neutral: 160, inquiries: 130 },
      { time: '03:00 PM', positive: 770, negative: 180, neutral: 130, inquiries: 110 },
    ],
    
    sampleComments: [
      {
        id: 'tw1',
        author: 'Guillermo Vance',
        handle: '@tech_guillermo',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80',
        platform: 'twitter',
        text: 'The auto-running sandbox unit test loop is literally what we have been waiting for since GPT-4. Massive leap.',
        likes: 3120,
        timestamp: '1h ago',
        category: 'Technical Capabilities & Speed',
        subReason: 'Sandbox auto-execution is game changing',
        sentiment: 'positive',
        confidence: 0.99,
        isVerified: true,
        detectedKeywords: ['sandbox', 'unit test', 'leap', 'GPT-4']
      },
      {
        id: 'tw2',
        author: 'Dan Builds',
        handle: '@dan_builds',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&auto=format&fit=crop&q=80',
        platform: 'twitter',
        text: 'You hit the 40 message limit in literally 25 minutes of coding. We need a dedicated Pro Dev tier without message caps!',
        likes: 5890,
        timestamp: '2h ago',
        category: 'API Cost & Rate Limits',
        subReason: 'Plus 40 msg per 3-hour limit is too restrictive',
        sentiment: 'negative',
        confidence: 0.95,
        isVerified: true,
        detectedKeywords: ['limit', 'message cap', 'rate limit', 'tier']
      }
    ],
    
    executiveSummary: {
      headline: 'Extraordinary Technical Reception with Strong Demand for Higher Rate Limits',
      overview: 'OmniCode-2 has achieved an 86% viral popularity score. Over 53% of all discourse focuses on the revolutionary impact of sandbox auto-execution and multi-file reasoning.',
      audienceConsensus: 'Developers view this as a landmark leap in agentic coding; however, ChatGPT Plus 40-message rate limits are causing heavy friction among active coders.',
      recommendations: [
        'Introduce a tiered "Developer Turbo" addon with continuous session tokens.',
        'Expedite official partnership / API plugins with Cursor, Copilot, and VS Code.',
        'Publish benchmarks proving junior dev onboarding velocity when paired with OmniCode.'
      ],
      keyRisksOrWins: [
        'Win: 2,640 developers praised sandbox automated testing as best-in-class.',
        'Risk: 820 developers reported hitting rate limits too quickly during active workflows.'
      ]
    }
  },

  {
    id: 'cinestream-price-hike',
    platform: 'instagram',
    title: 'CineStream Subscription Price Hike & Account Sharing Update',
    author: 'CineStream Plus',
    handle: '@cinestream_official',
    avatarUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=120&auto=format&fit=crop&q=80',
    postUrl: 'https://instagram.com/p/cinestream-update',
    publishedAt: '2 days ago',
    content: 'To continue investing in award-winning cinema and next-gen 4K streaming technology, we are updating our monthly subscription tiers starting next billing cycle. Members outside the primary household will require a sub-account profile.',
    mediaUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80',
    likesCount: 12400,
    repostsCount: 8900,
    commentsCount: 4180,
    
    totalAnalyzedComments: 4180,
    uniqueCommenters: 3920,
    spamFilteredCount: 260,
    popularityScore: 22,
    netSentimentScore: -68,
    receptionTier: 'Critical Backlash',
    
    sentimentDistribution: {
      positive: 480,
      negative: 2980,
      neutral: 420,
      inquiries: 300,
    },
    
    categories: [
      {
        id: 'cancellation',
        name: 'Churn Threats & Cancellations',
        icon: 'UserX',
        description: 'Members announcing instant subscription cancellations, moving to piracy/competitors',
        peopleCount: 2450,
        sharePercent: 58,
        sentimentSplit: { positive: 0, negative: 2380, neutral: 70, inquiries: 0 },
        topReasons: ['Immediate cancellation of Premium plan', 'Moving to rival services (HBO/Apple)', 'Returning to physical media/torrents'],
        color: '#ef4444',
      },
      {
        id: 'household-policy',
        name: 'Household & Travel Lockout',
        icon: 'Lock',
        description: 'Students in college, military personnel, frequent travelers locked out of family plans',
        peopleCount: 1890,
        sharePercent: 45,
        sentimentSplit: { positive: 20, negative: 1780, neutral: 40, inquiries: 50 },
        topReasons: ['Punishing college students away from home', 'Traveling for work causes IP lockout error', 'Family plan definition is anti-consumer'],
        color: '#f97316',
      },
      {
        id: 'content-quality',
        name: 'Content Value vs Price',
        icon: 'Film',
        description: 'Complaints about library cancellations of favorite shows vs price jump',
        peopleCount: 1120,
        sharePercent: 27,
        sentimentSplit: { positive: 60, negative: 980, neutral: 50, inquiries: 30 },
        topReasons: ['Canceling good shows after 1 season', 'Too much low quality filler content', 'Not worth $22.99/mo without HBO catalog'],
        color: '#eab308',
      },
      {
        id: 'features-tech',
        name: '4K & Audio Upgrades',
        icon: 'Tv',
        description: 'Bitrate quality, Dolby Atmos support, app performance',
        peopleCount: 280,
        sharePercent: 7,
        sentimentSplit: { positive: 210, negative: 30, neutral: 20, inquiries: 20 },
        topReasons: ['Bitrate improvements noticeable on OLEDs', 'Dolby Vision color grading praise'],
        color: '#10b981',
      }
    ],
    
    keyDrivers: {
      positiveReasons: [
        {
          id: 'cine-pos-1',
          text: 'Uncompressed 4K bitrate and Dolby Atmos enhancements',
          peopleCount: 210,
          percentage: 5.0,
          sentiment: 'positive',
          impactScore: 4.2,
          representativeQuotes: [
            { text: 'At least the 4K bitrate got bumped to 30Mbps on Apple TV. Visuals are crisp.', author: '@audiophile_sam', likes: 180 }
          ]
        }
      ],
      negativeReasons: [
        {
          id: 'cine-neg-1',
          text: 'Explicit intent to cancel subscriptions immediately',
          peopleCount: 2380,
          percentage: 56.9,
          sentiment: 'negative',
          impactScore: 9.9,
          representativeQuotes: [
            { text: 'Just canceled my 7-year continuous subscription. $23 a month to watch shows you cancel after 1 season is a joke.', author: '@movie_buff_99', likes: 14200 },
            { text: 'Canceled! Vote with your wallet people. They will only learn when subscriber count drops.', author: '@consumer_watch', likes: 8900 }
          ]
        },
        {
          id: 'cine-neg-2',
          text: 'Account sharing crackdown penalizes college students and travel',
          peopleCount: 1780,
          percentage: 42.5,
          sentiment: 'negative',
          impactScore: 9.3,
          representativeQuotes: [
            { text: 'My daughter is at college 2 hours away on our FAMILY plan and got blocked. Unbelievable greed.', author: '@mom_reviews', likes: 11400 },
            { text: 'I travel 3 weeks a month for business. I get locked out of my own account constantly.', author: '@traveler_dan', likes: 6200 }
          ]
        },
        {
          id: 'cine-neg-3',
          text: 'Content library perceived as declining while price climbs',
          peopleCount: 980,
          percentage: 23.4,
          sentiment: 'negative',
          impactScore: 8.2,
          representativeQuotes: [
            { text: 'You remove classic movies every month and expect us to pay 30% more for reality TV shows.', author: '@cinema_fan', likes: 4300 }
          ]
        }
      ],
      topInquiries: [
        {
          id: 'cine-inq-1',
          text: 'How to manage family member travel exceptions',
          peopleCount: 220,
          percentage: 5.2,
          sentiment: 'inquiry',
          impactScore: 7.1,
          representativeQuotes: [
            { text: 'What is the verification code procedure for military deployments overseas?', author: '@vet_support', likes: 450 }
          ]
        }
      ]
    },
    
    sentimentTimeline: [
      { time: 'Hour 1', positive: 50, negative: 620, neutral: 60, inquiries: 40 },
      { time: 'Hour 6', positive: 120, negative: 1200, neutral: 140, inquiries: 90 },
      { time: 'Hour 12', positive: 180, negative: 850, neutral: 120, inquiries: 110 },
      { time: 'Hour 24', positive: 130, negative: 310, neutral: 100, inquiries: 60 },
    ],
    
    sampleComments: [
      {
        id: 'cine-c1',
        author: 'Movie Buff 99',
        handle: '@movie_buff_99',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
        platform: 'instagram',
        text: 'Just canceled my 7-year continuous subscription. $23 a month to watch shows you cancel after 1 season is a joke.',
        likes: 14200,
        timestamp: '1d ago',
        category: 'Churn Threats & Cancellations',
        subReason: 'Immediate cancellation of Premium plan',
        sentiment: 'negative',
        confidence: 0.99,
        isVerified: false,
        detectedKeywords: ['canceled', 'joke', 'continuous', 'expensive']
      },
      {
        id: 'cine-c2',
        author: 'Sarah Jenkins',
        handle: '@mom_reviews',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80',
        platform: 'instagram',
        text: 'My daughter is at college 2 hours away on our FAMILY plan and got blocked. Unbelievable corporate greed.',
        likes: 11400,
        timestamp: '1d ago',
        category: 'Household & Travel Lockout',
        subReason: 'Punishing college students away from home',
        sentiment: 'negative',
        confidence: 0.98,
        isVerified: true,
        detectedKeywords: ['college', 'family plan', 'blocked', 'greed']
      }
    ],
    
    executiveSummary: {
      headline: 'Severe Public Relations & Churn Crisis (22% Net Approval)',
      overview: 'The pricing and password restriction announcement triggered overwhelming backlash, with 2,450 users explicitly stating cancellation intent.',
      audienceConsensus: 'Customers feel alienated by simultaneous price increases and restrictions on college student / traveling family members.',
      recommendations: [
        'Introduce an immediate "Student & Military Family Exemption" grace period to stem high-churn cohorts.',
        'Pause annual renewal billing notifications and offer a 6-month price freeze retention incentive.',
        'Clarify the travel device verification mechanism to reduce accidental lockouts.'
      ],
      keyRisksOrWins: [
        'Severe Risk: 2,380 people declared immediate subscription cancellation.',
        'Reputation Risk: 1,780 users highlighted anti-consumer penalties on college kids.'
      ]
    }
  },

  {
    id: 'cyberpunk-orion-teaser',
    platform: 'twitter',
    title: 'Cyberpunk Project Orion Unreal Engine 5 Teaser',
    author: 'Cyberpunk 2077',
    handle: '@CyberpunkGame',
    avatarUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=120&auto=format&fit=crop&q=80',
    postUrl: 'https://x.com/CyberpunkGame/status/18902847291',
    publishedAt: '3 days ago',
    content: 'Welcome back to Night City. Here is our first architectural tech teaser for Project Orion, built entirely in Unreal Engine 5 with native hardware path tracing. See you in the underground. 🌃⚡',
    mediaUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    likesCount: 184500,
    repostsCount: 42100,
    commentsCount: 6850,
    
    totalAnalyzedComments: 6850,
    uniqueCommenters: 6210,
    spamFilteredCount: 640,
    popularityScore: 91,
    netSentimentScore: 82,
    receptionTier: 'Viral Praise',
    
    sentimentDistribution: {
      positive: 5240,
      negative: 580,
      neutral: 610,
      inquiries: 420,
    },
    
    categories: [
      {
        id: 'graphics',
        name: 'Graphics Fidelity & Ray Tracing',
        icon: 'Sparkles',
        description: 'Unreal Engine 5 Nanite/Lumen, path tracing reflections, atmosphere',
        peopleCount: 4100,
        sharePercent: 60,
        sentimentSplit: { positive: 3950, negative: 40, neutral: 80, inquiries: 30 },
        topReasons: ['Lighting and rain puddles look photorealistic', 'UE5 Nanite geometry looks breathtaking', 'True next-gen benchmark'],
        color: '#e11d48',
      },
      {
        id: 'hype-lore',
        name: 'Night City Lore & Story Hype',
        icon: 'Flame',
        description: 'Johnny Silverhand references, Edgerunners easter eggs, new districts',
        peopleCount: 2340,
        sharePercent: 34,
        sentimentSplit: { positive: 2180, negative: 30, neutral: 90, inquiries: 40 },
        topReasons: ['Excitement for Pacifica expansion', 'Soundtrack bass drop gave goosebumps', 'Hope Lucy from Edgerunners appears'],
        color: '#8b5cf6',
      },
      {
        id: 'release-caution',
        name: 'Launch Readiness Caution',
        icon: 'ShieldAlert',
        description: 'Reminders of 2020 launch bugs, request not to rush the release date',
        peopleCount: 1420,
        sharePercent: 21,
        sentimentSplit: { positive: 90, negative: 1180, neutral: 120, inquiries: 30 },
        topReasons: ['Take as much time as you need, do not rush', 'Please ensure console optimization at launch', 'No crunch for developers'],
        color: '#f59e0b',
      },
      {
        id: 'platforms-specs',
        name: 'System Requirements & VR',
        icon: 'Monitor',
        description: 'PC GPU requirement inquiries, PS6 / next-gen specs, VR mode',
        peopleCount: 620,
        sharePercent: 9,
        sentimentSplit: { positive: 140, negative: 60, neutral: 140, inquiries: 280 },
        topReasons: ['Will an RTX 4080 run this in 60fps path tracing?', 'Is there first-person VR support planned?', 'Will this release on current-gen PS5?'],
        color: '#06b6d4',
      }
    ],
    
    keyDrivers: {
      positiveReasons: [
        {
          id: 'cb-pos-1',
          text: 'Stunning Unreal Engine 5 visual fidelity and lighting',
          peopleCount: 3950,
          percentage: 57.6,
          sentiment: 'positive',
          impactScore: 9.8,
          representativeQuotes: [
            { text: 'The neon reflections bouncing off the wet asphalt look better than real life. My GPU is ready.', author: '@pc_master_alex', likes: 7200 },
            { text: 'UE5 was the best choice CDPR could have made. The scale of the mega-buildings is unreal.', author: '@cyber_junkie', likes: 4500 }
          ]
        },
        {
          id: 'cb-pos-2',
          text: 'Soundtrack and atmosphere acclaim',
          peopleCount: 2180,
          percentage: 31.8,
          sentiment: 'positive',
          impactScore: 8.9,
          representativeQuotes: [
            { text: 'That dark synthwave bass drop at 0:45 literally gave me chills.', author: '@synth_nerd', likes: 3100 }
          ]
        }
      ],
      negativeReasons: [
        {
          id: 'cb-neg-1',
          text: 'Strong community caution against rushing the release date (2020 trauma)',
          peopleCount: 1180,
          percentage: 17.2,
          sentiment: 'negative',
          impactScore: 7.9,
          representativeQuotes: [
            { text: 'Please CDPR, take until 2029 if you have to. Cook it slowly, no crunch, launch when 100% polished.', author: '@gamer_wisdom', likes: 18900 },
            { text: 'Looks phenomenal but I will not pre-order until verified day 1 reviews drop.', author: '@cautious_player', likes: 5400 }
          ]
        }
      ],
      topInquiries: [
        {
          id: 'cb-inq-1',
          text: 'Hardware targets (Target frame rates for current vs next-gen GPUs)',
          peopleCount: 280,
          percentage: 4.1,
          sentiment: 'inquiry',
          impactScore: 6.9,
          representativeQuotes: [
            { text: 'Will this require Frame Generation 3.0 to hit 60fps on 40-series cards?', author: '@benchmarks_pro', likes: 620 }
          ]
        }
      ]
    },
    
    sentimentTimeline: [
      { time: 'Day 1', positive: 2100, negative: 180, neutral: 220, inquiries: 140 },
      { time: 'Day 2', positive: 1940, negative: 240, neutral: 230, inquiries: 160 },
      { time: 'Day 3', positive: 1200, negative: 160, neutral: 160, inquiries: 120 },
    ],
    
    sampleComments: [
      {
        id: 'cb1',
        author: 'Alex Mercer',
        handle: '@pc_master_alex',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
        platform: 'twitter',
        text: 'The neon reflections bouncing off the wet asphalt look better than real life. My GPU is ready! 🔥🌃',
        likes: 7200,
        timestamp: '2d ago',
        category: 'Graphics Fidelity & Ray Tracing',
        subReason: 'Lighting and rain puddles look photorealistic',
        sentiment: 'positive',
        confidence: 0.99,
        isVerified: true,
        detectedKeywords: ['neon', 'reflections', 'real life', 'GPU']
      },
      {
        id: 'cb2',
        author: 'Gaming Wisdom',
        handle: '@gamer_wisdom',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&auto=format&fit=crop&q=80',
        platform: 'twitter',
        text: 'Please CDPR, take until 2029 if you have to. Cook it slowly, no crunch, launch when 100% polished.',
        likes: 18900,
        timestamp: '2d ago',
        category: 'Launch Readiness Caution',
        subReason: 'Take as much time as you need, do not rush',
        sentiment: 'negative',
        confidence: 0.92,
        isVerified: false,
        detectedKeywords: ['cook it', 'no crunch', 'polished', 'rushed']
      }
    ],
    
    executiveSummary: {
      headline: 'Phenomenal Anticipation & Visual Acclaim with Deep Quality Vigilance',
      overview: 'Project Orion has captured peak excitement across gaming communities with a 91% popularity score. Unreal Engine 5 visuals account for 60% of all positive engagement.',
      audienceConsensus: 'Audiences are overwhelmingly thrilled with the visual direction but strongly advise the studio to avoid premature launch timelines.',
      recommendations: [
        'Emphasize stability milestones and transparency reports in future devlogs.',
        'Release official technical deep dives detailing Lumen and Nanite implementations.',
        'Feature community modders and soundtrack composers early in teaser campaigns.'
      ],
      keyRisksOrWins: [
        'Win: 3,950 gamers praised path-tracing visuals as defining next-gen standards.',
        'Community Sentiment: 1,180 fans proactively pleaded for extended polish time.'
      ]
    }
  }
];
