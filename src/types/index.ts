export type Platform = 'instagram' | 'twitter';

export type SentimentType = 'positive' | 'negative' | 'neutral' | 'inquiry';

export type ReceptionTier = 
  | 'Viral Praise' 
  | 'Strong Positive' 
  | 'Mixed / Polarized' 
  | 'Critical Backlash' 
  | 'Heavy Disapproval';

export interface KeyReason {
  id: string;
  text: string;
  peopleCount: number;
  percentage: number;
  sentiment: 'positive' | 'negative' | 'inquiry';
  impactScore: number; // 1-10
  representativeQuotes: {
    text: string;
    author: string;
    likes: number;
  }[];
}

export interface CommentCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  peopleCount: number;
  sharePercent: number;
  sentimentSplit: {
    positive: number;
    negative: number;
    neutral: number;
    inquiries: number;
  };
  topReasons: string[];
  color: string;
}

export interface CommentItem {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  platform: Platform;
  text: string;
  likes: number;
  timestamp: string;
  category: string;
  subReason: string;
  sentiment: SentimentType;
  confidence: number;
  isVerified?: boolean;
  detectedKeywords?: string[];
}

export interface SentimentTimelinePoint {
  time: string;
  positive: number;
  negative: number;
  neutral: number;
  inquiries: number;
}

export interface ExecutiveSummary {
  headline: string;
  overview: string;
  audienceConsensus: string;
  recommendations: string[];
  keyRisksOrWins: string[];
}

export interface PostDataset {
  id: string;
  platform: Platform;
  title: string;
  author: string;
  handle: string;
  avatarUrl: string;
  postUrl: string;
  publishedAt: string;
  content: string;
  mediaUrl?: string;
  likesCount: number;
  repostsCount: number;
  commentsCount: number;
  
  // Analytics Metrics
  totalAnalyzedComments: number;
  uniqueCommenters: number;
  spamFilteredCount: number;
  popularityScore: number; // 0 to 100
  netSentimentScore: number; // -100 to +100
  receptionTier: ReceptionTier;
  
  sentimentDistribution: {
    positive: number;
    neutral: number;
    negative: number;
    inquiries: number;
  };
  
  categories: CommentCategory[];
  keyDrivers: {
    positiveReasons: KeyReason[];
    negativeReasons: KeyReason[];
    topInquiries: KeyReason[];
  };
  
  sentimentTimeline: SentimentTimelinePoint[];
  sampleComments: CommentItem[];
  executiveSummary: ExecutiveSummary;
}
