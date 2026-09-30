import React from 'react';
import { 
  CheckCircle2, 
  ExternalLink, 
  Users, 
  ShieldAlert, 
  MessageSquare, 
  Heart, 
  Repeat,
  Sparkles,
  Zap,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { PostDataset } from '../types';
import { InstagramIcon, TwitterIcon } from './SocialIcons';

interface PostHeroCardProps {
  post: PostDataset;
}

export const PostHeroCard: React.FC<PostHeroCardProps> = ({ post }) => {
  const isIG = post.platform === 'instagram';
  
  const getTierBadge = (tier: PostDataset['receptionTier']) => {
    switch (tier) {
      case 'Viral Praise':
        return {
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          icon: <Sparkles className="w-3.5 h-3.5" />,
          label: 'Viral Praise Consensus'
        };
      case 'Strong Positive':
        return {
          bg: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
          icon: <TrendingUp className="w-3.5 h-3.5" />,
          label: 'Strong Positive Reception'
        };
      case 'Critical Backlash':
      case 'Heavy Disapproval':
        return {
          bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          icon: <AlertTriangle className="w-3.5 h-3.5" />,
          label: 'Heavy Audience Backlash'
        };
      default:
        return {
          bg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
          icon: <Zap className="w-3.5 h-3.5" />,
          label: 'Mixed / Polarized'
        };
    }
  };

  const tierMeta = getTierBadge(post.receptionTier);

  return (
    <div className="relative rounded-2xl bg-zinc-900/60 backdrop-blur-md border border-white/10 p-5 sm:p-6 shadow-xl overflow-hidden">
      {/* Subtle background glow */}
      <div 
        className={`absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none ${
          post.popularityScore >= 70 ? 'bg-indigo-500' :
          post.popularityScore >= 50 ? 'bg-amber-500' : 'bg-rose-600'
        }`}
      />

      <div className="flex flex-col lg:flex-row gap-6 items-start justify-between">
        
        {/* Left: Author & Content Details */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Platform Badge */}
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
              isIG 
                ? 'bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-amber-500/10 text-pink-300 border-pink-500/30'
                : 'bg-sky-500/10 text-sky-300 border-sky-500/30'
            }`}>
              {isIG ? <InstagramIcon className="w-3.5 h-3.5 text-pink-400" /> : <TwitterIcon className="w-3.5 h-3.5 text-sky-400" />}
              <span>{isIG ? 'Instagram Post' : 'X (Twitter) Post'}</span>
            </div>

            {/* Reception Tier Badge */}
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${tierMeta.bg}`}>
              {tierMeta.icon}
              <span>{tierMeta.label}</span>
            </div>

            <span className="text-xs text-zinc-500">{post.publishedAt}</span>
          </div>

          {/* Author Profile */}
          <div className="flex items-center gap-3">
            <img 
              src={post.avatarUrl} 
              alt={post.author} 
              className="w-12 h-12 rounded-xl object-cover border border-white/10 shadow-md"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-lg font-bold text-white tracking-tight">{post.author}</h2>
                <CheckCircle2 className="w-4 h-4 text-sky-400 fill-sky-400/20" />
              </div>
              <p className="text-xs text-zinc-400">{post.handle}</p>
            </div>
          </div>

          {/* Post Text */}
          <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-normal bg-zinc-950/40 p-3.5 rounded-xl border border-white/5">
            "{post.content}"
          </p>

          {/* Post Engagements */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-1">
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-400" />
              <span className="font-semibold text-zinc-200">{post.likesCount.toLocaleString()}</span> likes
            </div>
            <div className="flex items-center gap-1.5">
              <Repeat className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-zinc-200">{post.repostsCount.toLocaleString()}</span> shares
            </div>
            <div className="flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              <span className="font-semibold text-zinc-200">{post.commentsCount.toLocaleString()}</span> total comments
            </div>
            <a 
              href={post.postUrl} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 ml-auto hover:underline"
            >
              <span>View Source</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right: Comment Intelligence Stat Metrics */}
        <div className="w-full lg:w-80 grid grid-cols-2 gap-2.5 p-3.5 rounded-xl bg-zinc-950/60 border border-white/5">
          
          {/* Total Analyzed Comments */}
          <div className="p-3 rounded-lg bg-zinc-900/70 border border-white/5">
            <div className="flex items-center justify-between text-zinc-400 mb-1">
              <span className="text-[11px] font-medium">Comments Ingested</span>
              <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="text-xl font-bold text-white">{post.totalAnalyzedComments.toLocaleString()}</div>
            <div className="text-[10px] text-emerald-400 mt-0.5">100% Ingested</div>
          </div>

          {/* Unique People Headcount */}
          <div className="p-3 rounded-lg bg-zinc-900/70 border border-white/5">
            <div className="flex items-center justify-between text-zinc-400 mb-1">
              <span className="text-[11px] font-medium">Unique People</span>
              <Users className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <div className="text-xl font-bold text-sky-300">{post.uniqueCommenters.toLocaleString()}</div>
            <div className="text-[10px] text-zinc-400 mt-0.5">Verified Accounts</div>
          </div>

          {/* Spam / Bot Filtered */}
          <div className="p-3 rounded-lg bg-zinc-900/70 border border-white/5">
            <div className="flex items-center justify-between text-zinc-400 mb-1">
              <span className="text-[11px] font-medium">Spam & Bots</span>
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-xl font-bold text-amber-300">{post.spamFilteredCount.toLocaleString()}</div>
            <div className="text-[10px] text-zinc-500 mt-0.5">Auto-Filtered Out</div>
          </div>

          {/* Net Sentiment Score */}
          <div className="p-3 rounded-lg bg-zinc-900/70 border border-white/5">
            <div className="flex items-center justify-between text-zinc-400 mb-1">
              <span className="text-[11px] font-medium">Net Sentiment</span>
              <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className={`text-xl font-bold ${
              post.netSentimentScore >= 40 ? 'text-emerald-400' :
              post.netSentimentScore >= 0 ? 'text-amber-400' : 'text-rose-400'
            }`}>
              {post.netSentimentScore > 0 ? `+${post.netSentimentScore}` : post.netSentimentScore}
            </div>
            <div className="text-[10px] text-zinc-400 mt-0.5">Scale -100 to +100</div>
          </div>

        </div>

      </div>
    </div>
  );
};
