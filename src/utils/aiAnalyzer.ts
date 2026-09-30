import { PostDataset, CommentItem, CommentCategory, KeyReason, Platform } from '../types';

interface CustomPostInput {
  platform: Platform;
  title: string;
  author: string;
  handle: string;
  content: string;
  rawComments: string[];
}

// Keyword & Rule sets for fast client-side Aspect-Based Categorization
const CATEGORY_RULES = [
  {
    id: 'pricing',
    name: 'Pricing & Value',
    icon: 'Tag',
    color: '#f43f5e',
    description: 'Price, expensive, cheap, cost, subscription, refund, worth, discount, scam, ripoff, dollars, $',
    keywords: ['price', 'expensive', 'cost', 'subscription', 'refund', 'worth', 'discount', 'scam', 'ripoff', '$', 'dollar', 'pay', 'overpriced', 'money', 'charge'],
  },
  {
    id: 'design',
    name: 'Design & Visuals',
    icon: 'Palette',
    color: '#6366f1',
    description: 'Looks, beautiful, clean, ugly, UI, aesthetic, color, style, design, graphics, visual, art, drip',
    keywords: ['look', 'looks', 'beautiful', 'clean', 'ugly', 'ui', 'aesthetic', 'color', 'style', 'design', 'graphics', 'visual', 'art', 'drip', 'gorgeous', 'fire', 'clean'],
  },
  {
    id: 'quality',
    name: 'Quality & Performance',
    icon: 'Zap',
    color: '#10b981',
    description: 'Speed, bug, crash, durable, broken, fast, slow, smooth, battery, lag, reliable, quality',
    keywords: ['speed', 'bug', 'crash', 'durable', 'broken', 'fast', 'slow', 'smooth', 'battery', 'lag', 'reliable', 'quality', 'works', 'failed', 'performance', 'latency', 'fix'],
  },
  {
    id: 'support-policy',
    name: 'Support & Policy',
    icon: 'ShieldCheck',
    color: '#f59e0b',
    description: 'Customer service, policy, terms, ban, locked out, sharing, help, update, support, canceled',
    keywords: ['support', 'service', 'help', 'policy', 'terms', 'ban', 'locked', 'sharing', 'cancel', 'canceled', 'email', 'contact', 'account', 'security', 'privacy'],
  },
  {
    id: 'inquiries',
    name: 'Questions & Availability',
    icon: 'HelpCircle',
    color: '#06b6d4',
    description: 'When, where, how, release date, sizing, international, android, ios, available, question, ?',
    keywords: ['when', 'where', 'how', 'release', 'date', 'sizing', 'international', 'android', 'ios', 'available', 'ship', 'shipping', 'size', '?'],
  },
  {
    id: 'humor',
    name: 'Humor & Banter',
    icon: 'Smile',
    color: '#ec4899',
    description: 'Lmao, lol, meme, haha, clown, crying, rip, bro, no way, wild',
    keywords: ['lmao', 'lol', 'meme', 'haha', 'clown', 'crying', 'rip', 'bro', 'no way', 'wild', '💀', '🤡', '😭', '😂', 'bank account'],
  },
];

const POSITIVE_WORDS = ['love', 'great', 'amazing', 'best', 'fire', 'clean', 'insane', 'good', 'cop', 'excited', 'phenomenal', 'bravo', 'w', 'banger', 'perfect', 'huge', 'hype', 'goat', 'solid', '10/10'];
const NEGATIVE_WORDS = ['hate', 'terrible', 'worst', 'expensive', 'cancel', 'canceled', 'broken', 'scam', 'ripoff', 'l', 'trash', 'disappointed', 'boring', 'unusable', 'greed', 'clown', 'stop', 'failed', 'fail', 'bad', 'waste'];
const INQUIRY_WORDS = ['when', 'where', 'how', 'is there', 'can we', 'will it', 'what about', '?', 'available', 'compatible'];

const SPAM_KEYWORDS = ['dm me', 'invest in', 'whatsapp', 'crypto', 'telegram', 'send pic', 'promote on', 'check bio'];

export function analyzeRawComments(input: CustomPostInput): PostDataset {
  const { platform, title, author, handle, content, rawComments } = input;
  
  let spamCount = 0;
  const processedComments: CommentItem[] = [];
  
  rawComments.forEach((rawText, index) => {
    const textLower = rawText.toLowerCase();
    
    // Check spam
    const isSpam = SPAM_KEYWORDS.some(k => textLower.includes(k)) || (rawText.length < 3 && !['🔥', '❤️', '👏', '⚡', '💯'].includes(rawText.trim()));
    if (isSpam) {
      spamCount++;
      return;
    }

    // Determine sentiment
    const posScore = POSITIVE_WORDS.filter(w => textLower.includes(w)).length;
    const negScore = NEGATIVE_WORDS.filter(w => textLower.includes(w)).length;
    const isInquiry = INQUIRY_WORDS.some(w => textLower.includes(w)) || textLower.includes('?');

    let sentiment: CommentItem['sentiment'] = 'neutral';
    if (isInquiry && posScore === 0 && negScore === 0) {
      sentiment = 'inquiry';
    } else if (posScore > negScore) {
      sentiment = 'positive';
    } else if (negScore > posScore) {
      sentiment = 'negative';
    } else if (posScore === negScore && posScore > 0) {
      sentiment = 'neutral';
    }

    // Determine category
    let matchedCategory = CATEGORY_RULES[1]; // default design
    let maxCatMatches = 0;
    
    for (const cat of CATEGORY_RULES) {
      const matchCount = cat.keywords.filter(k => textLower.includes(k)).length;
      if (matchCount > maxCatMatches) {
        maxCatMatches = matchCount;
        matchedCategory = cat;
      }
    }

    // Extract detected keywords
    const detected = [...POSITIVE_WORDS, ...NEGATIVE_WORDS, ...matchedCategory.keywords].filter(k => textLower.includes(k)).slice(0, 4);

    const mockAuthor = `user_${Math.floor(1000 + Math.random() * 9000)}`;
    const mockLikes = Math.floor(Math.random() * 450);

    processedComments.push({
      id: `custom-c-${index + 1}`,
      author: mockAuthor,
      handle: `@${mockAuthor}`,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${mockAuthor}`,
      platform,
      text: rawText,
      likes: mockLikes,
      timestamp: `${Math.floor(Math.random() * 12) + 1}h ago`,
      category: matchedCategory.name,
      subReason: rawText.length > 55 ? `${rawText.slice(0, 52)}...` : rawText,
      sentiment,
      confidence: Math.round((0.85 + Math.random() * 0.14) * 100) / 100,
      isVerified: Math.random() > 0.8,
      detectedKeywords: detected,
    });
  });

  const totalValid = processedComments.length || 1;
  const posCount = processedComments.filter(c => c.sentiment === 'positive').length;
  const negCount = processedComments.filter(c => c.sentiment === 'negative').length;
  const neuCount = processedComments.filter(c => c.sentiment === 'neutral').length;
  const inqCount = processedComments.filter(c => c.sentiment === 'inquiry').length;

  const popularityScore = Math.round(((posCount + (inqCount * 0.5) + (neuCount * 0.5)) / totalValid) * 100);
  const netSentimentScore = Math.round(((posCount - negCount) / totalValid) * 100);

  let receptionTier: PostDataset['receptionTier'] = 'Mixed / Polarized';
  if (popularityScore >= 80) receptionTier = 'Viral Praise';
  else if (popularityScore >= 65) receptionTier = 'Strong Positive';
  else if (popularityScore <= 30) receptionTier = 'Critical Backlash';
  else if (popularityScore <= 45) receptionTier = 'Heavy Disapproval';

  // Build Categories with actual headcounts
  const categoryStats: CommentCategory[] = CATEGORY_RULES.map(rule => {
    const matching = processedComments.filter(c => c.category === rule.name);
    const catPos = matching.filter(c => c.sentiment === 'positive').length;
    const catNeg = matching.filter(c => c.sentiment === 'negative').length;
    const catNeu = matching.filter(c => c.sentiment === 'neutral').length;
    const catInq = matching.filter(c => c.sentiment === 'inquiry').length;

    return {
      id: rule.id,
      name: rule.name,
      icon: rule.icon,
      description: rule.description,
      peopleCount: matching.length,
      sharePercent: Math.round((matching.length / totalValid) * 100),
      sentimentSplit: {
        positive: catPos,
        negative: catNeg,
        neutral: catNeu,
        inquiries: catInq,
      },
      topReasons: matching.slice(0, 3).map(c => c.subReason),
      color: rule.color,
    };
  }).filter(c => c.peopleCount > 0);

  // Build Key Drivers (Top 3 Positive & Top 3 Negative Reasons)
  const posComments = processedComments.filter(c => c.sentiment === 'positive');
  const negComments = processedComments.filter(c => c.sentiment === 'negative');
  const inqComments = processedComments.filter(c => c.sentiment === 'inquiry');

  const positiveReasons: KeyReason[] = posComments.slice(0, 3).map((c, i) => ({
    id: `custom-pos-${i}`,
    text: `Praise for ${c.category.toLowerCase()} and user satisfaction`,
    peopleCount: Math.max(1, Math.round(posCount * (0.6 / (i + 1)))),
    percentage: Math.round((posCount / totalValid) * 100),
    sentiment: 'positive',
    impactScore: Math.round((8 + Math.random() * 1.8) * 10) / 10,
    representativeQuotes: [{ text: c.text, author: c.handle, likes: c.likes }]
  }));

  const negativeReasons: KeyReason[] = negComments.slice(0, 3).map((c, i) => ({
    id: `custom-neg-${i}`,
    text: `Friction point regarding ${c.category.toLowerCase()}`,
    peopleCount: Math.max(1, Math.round(negCount * (0.5 / (i + 1)))),
    percentage: Math.round((negCount / totalValid) * 100),
    sentiment: 'negative',
    impactScore: Math.round((7 + Math.random() * 2.5) * 10) / 10,
    representativeQuotes: [{ text: c.text, author: c.handle, likes: c.likes }]
  }));

  const topInquiries: KeyReason[] = inqComments.slice(0, 2).map((c, i) => ({
    id: `custom-inq-${i}`,
    text: `Customer inquiries regarding availability or specifications`,
    peopleCount: Math.max(1, Math.round(inqCount * 0.8)),
    percentage: Math.round((inqCount / totalValid) * 100),
    sentiment: 'inquiry',
    impactScore: 6.5,
    representativeQuotes: [{ text: c.text, author: c.handle, likes: c.likes }]
  }));

  return {
    id: `custom-${Date.now()}`,
    platform,
    title: title || 'Custom Post Analysis',
    author: author || 'Creator',
    handle: handle || '@creator',
    avatarUrl: `https://api.dicebear.com/7.x/identicon/svg?seed=${author || 'custom'}`,
    postUrl: 'https://social.media/post/custom',
    publishedAt: 'Just now',
    content: content || 'Custom social post comment batch analysis',
    likesCount: totalValid * 15,
    repostsCount: Math.round(totalValid * 2.5),
    commentsCount: rawComments.length,
    totalAnalyzedComments: rawComments.length,
    uniqueCommenters: totalValid,
    spamFilteredCount: spamCount,
    popularityScore,
    netSentimentScore,
    receptionTier,
    sentimentDistribution: {
      positive: posCount,
      neutral: neuCount,
      negative: negCount,
      inquiries: inqCount,
    },
    categories: categoryStats,
    keyDrivers: {
      positiveReasons: positiveReasons.length ? positiveReasons : [{
        id: 'no-pos',
        text: 'General neutral engagement',
        peopleCount: 0,
        percentage: 0,
        sentiment: 'positive',
        impactScore: 5.0,
        representativeQuotes: []
      }],
      negativeReasons: negativeReasons.length ? negativeReasons : [],
      topInquiries: topInquiries.length ? topInquiries : [],
    },
    sentimentTimeline: [
      { time: 'T-0h', positive: Math.round(posCount * 0.2), negative: Math.round(negCount * 0.2), neutral: Math.round(neuCount * 0.2), inquiries: Math.round(inqCount * 0.2) },
      { time: 'T-2h', positive: Math.round(posCount * 0.5), negative: Math.round(negCount * 0.4), neutral: Math.round(neuCount * 0.5), inquiries: Math.round(inqCount * 0.4) },
      { time: 'T-4h', positive: Math.round(posCount * 0.8), negative: Math.round(negCount * 0.8), neutral: Math.round(neuCount * 0.8), inquiries: Math.round(inqCount * 0.8) },
      { time: 'Now', positive: posCount, negative: negCount, neutral: neuCount, inquiries: inqCount },
    ],
    sampleComments: processedComments,
    executiveSummary: {
      headline: `${receptionTier}: ${posCount} Positive vs ${negCount} Critical Comments`,
      overview: `Analyzed ${totalValid} legitimate comments (${spamCount} spam excluded). Primary discussion concentrated in ${categoryStats[0]?.name || 'General'} (${categoryStats[0]?.sharePercent || 0}% share).`,
      audienceConsensus: popularityScore > 60 ? 'Audience displays strong positive intent and satisfaction.' : 'Audience expresses clear friction and critical feedback.',
      recommendations: [
        `Amplify positive aspects identified in ${categoryStats[0]?.name || 'the post'}.`,
        negCount > 0 ? `Directly address the ${negCount} critical comments to mitigate audience churn.` : 'Continue monitoring community responses.',
        `Answer top inquiries to accelerate community trust.`
      ],
      keyRisksOrWins: [
        `Total Positive Volume: ${posCount} people`,
        `Total Negative Friction: ${negCount} people`,
        `Filtered Noise / Spam Rate: ${Math.round((spamCount / (rawComments.length || 1)) * 100)}%`
      ]
    }
  };
}
