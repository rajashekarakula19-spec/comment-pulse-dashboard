import React from 'react';
import { 
  Smile, 
  Frown, 
  HelpCircle, 
  MinusCircle, 
  Sparkles, 
  Flame, 
  Users,
  Check
} from 'lucide-react';
import { PostDataset, SentimentType } from '../types';

interface PopularityScoreCardProps {
  post: PostDataset;
  activeSentimentFilter: SentimentType | 'all';
  onSelectSentimentFilter: (sentiment: SentimentType | 'all') => void;
}

export const PopularityScoreCard: React.FC<PopularityScoreCardProps> = ({
  post,
  activeSentimentFilter,
  onSelectSentimentFilter,
}) => {
  const { positive, negative, neutral, inquiries } = post.sentimentDistribution;
  const total = positive + negative + neutral + inquiries || 1;

  const posPct = Math.round((positive / total) * 100);
  const negPct = Math.round((negative / total) * 100);
  const inqPct = Math.round((inquiries / total) * 100);
  const neuPct = Math.round((neutral / total) * 100);

  // Score color grading
  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-emerald-400 from-emerald-500/20 to-teal-500/20 border-emerald-500/30';
    if (score >= 55) return 'text-indigo-300 from-indigo-500/20 to-purple-500/20 border-indigo-500/30';
    if (score >= 40) return 'text-amber-400 from-amber-500/20 to-yellow-500/20 border-amber-500/30';
    return 'text-rose-400 from-rose-500/20 to-red-500/20 border-rose-500/30';
  };

  return (
    <div className="rounded-2xl bg-zinc-900/60 backdrop-blur-md border border-white/10 p-5 sm:p-6 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Flame className="w-4 h-4 text-indigo-400" />
            Popularity & Sentiment Health Index
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Real-time quantified audience reaction & verified headcount consensus
          </p>
        </div>

        {activeSentimentFilter !== 'all' && (
          <button
            onClick={() => onSelectSentimentFilter('all')}
            className="text-xs text-indigo-400 hover:text-indigo-300 underline font-medium"
          >
            Clear Sentiment Filter
          </button>
        )}
      </div>

      {/* Primary Row: Gauge Score + High-level Verdict */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Large Popularity Radial / Metric Pill */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-5 rounded-2xl bg-gradient-to-b from-zinc-950/80 to-zinc-900/80 border border-white/5 shadow-inner text-center">
          <span className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-1">
            Audience Popularity Score
          </span>
          <div className="flex items-baseline gap-1 my-1">
            <span className={`text-5xl sm:text-6xl font-black tracking-tight ${
              post.popularityScore >= 70 ? 'text-emerald-400' :
              post.popularityScore >= 50 ? 'text-amber-400' : 'text-rose-400'
            }`}>
              {post.popularityScore}%
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-800/80 text-zinc-300 border border-white/10 mt-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>{post.receptionTier}</span>
          </div>
          <span className="text-[11px] text-zinc-500 mt-2">
            Derived from {post.uniqueCommenters.toLocaleString()} human opinions
          </span>
        </div>

        {/* Breakdown by Headcounts */}
        <div className="md:col-span-8 space-y-4">
          
          {/* Multi-segment Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium text-zinc-400">
              <span>Audience Sentiment Distribution</span>
              <span>{post.uniqueCommenters.toLocaleString()} Total Commenters</span>
            </div>
            <div className="h-3.5 w-full bg-zinc-950 rounded-full overflow-hidden flex p-0.5 gap-0.5 border border-white/5">
              <div 
                style={{ width: `${posPct}%` }} 
                className="bg-emerald-500 rounded-l-full transition-all duration-500 hover:brightness-125" 
                title={`Positive: ${positive} people (${posPct}%)`}
              />
              <div 
                style={{ width: `${inqPct}%` }} 
                className="bg-sky-500 transition-all duration-500 hover:brightness-125" 
                title={`Inquiries: ${inquiries} people (${inqPct}%)`}
              />
              <div 
                style={{ width: `${neuPct}%` }} 
                className="bg-zinc-500 transition-all duration-500 hover:brightness-125" 
                title={`Neutral: ${neutral} people (${neuPct}%)`}
              />
              <div 
                style={{ width: `${negPct}%` }} 
                className="bg-rose-500 rounded-r-full transition-all duration-500 hover:brightness-125" 
                title={`Critical: ${negative} people (${negPct}%)`}
              />
            </div>
          </div>

          {/* 4 Interactive Sentiment Filter Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            
            {/* Positive */}
            <button
              onClick={() => onSelectSentimentFilter(activeSentimentFilter === 'positive' ? 'all' : 'positive')}
              className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                activeSentimentFilter === 'positive'
                  ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                  : 'bg-zinc-950/60 border-white/5 hover:border-emerald-500/40 text-zinc-300 hover:bg-emerald-950/20'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <Smile className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  {posPct}%
                </span>
              </div>
              <div className="text-lg font-bold text-white">{positive.toLocaleString()}</div>
              <div className="text-[11px] text-zinc-400 flex items-center justify-between">
                <span>Praise / Likes</span>
                {activeSentimentFilter === 'positive' && <Check className="w-3 h-3 text-emerald-400" />}
              </div>
            </button>

            {/* Inquiries / Questions */}
            <button
              onClick={() => onSelectSentimentFilter(activeSentimentFilter === 'inquiry' ? 'all' : 'inquiry')}
              className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                activeSentimentFilter === 'inquiry'
                  ? 'bg-sky-500/20 border-sky-500 text-white shadow-lg shadow-sky-500/20'
                  : 'bg-zinc-950/60 border-white/5 hover:border-sky-500/40 text-zinc-300 hover:bg-sky-950/20'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <HelpCircle className="w-4 h-4 text-sky-400" />
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300">
                  {inqPct}%
                </span>
              </div>
              <div className="text-lg font-bold text-white">{inquiries.toLocaleString()}</div>
              <div className="text-[11px] text-zinc-400 flex items-center justify-between">
                <span>Inquiries / Ask</span>
                {activeSentimentFilter === 'inquiry' && <Check className="w-3 h-3 text-sky-400" />}
              </div>
            </button>

            {/* Critical / Negative */}
            <button
              onClick={() => onSelectSentimentFilter(activeSentimentFilter === 'negative' ? 'all' : 'negative')}
              className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                activeSentimentFilter === 'negative'
                  ? 'bg-rose-500/20 border-rose-500 text-white shadow-lg shadow-rose-500/20'
                  : 'bg-zinc-950/60 border-white/5 hover:border-rose-500/40 text-zinc-300 hover:bg-rose-950/20'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <Frown className="w-4 h-4 text-rose-400" />
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300">
                  {negPct}%
                </span>
              </div>
              <div className="text-lg font-bold text-white">{negative.toLocaleString()}</div>
              <div className="text-[11px] text-zinc-400 flex items-center justify-between">
                <span>Critiques / Hate</span>
                {activeSentimentFilter === 'negative' && <Check className="w-3 h-3 text-rose-400" />}
              </div>
            </button>

            {/* Neutral */}
            <button
              onClick={() => onSelectSentimentFilter(activeSentimentFilter === 'neutral' ? 'all' : 'neutral')}
              className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                activeSentimentFilter === 'neutral'
                  ? 'bg-zinc-500/30 border-zinc-400 text-white shadow-lg'
                  : 'bg-zinc-950/60 border-white/5 hover:border-zinc-500/40 text-zinc-300 hover:bg-zinc-900/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <MinusCircle className="w-4 h-4 text-zinc-400" />
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                  {neuPct}%
                </span>
              </div>
              <div className="text-lg font-bold text-white">{neutral.toLocaleString()}</div>
              <div className="text-[11px] text-zinc-400 flex items-center justify-between">
                <span>Neutral / Info</span>
                {activeSentimentFilter === 'neutral' && <Check className="w-3 h-3 text-zinc-300" />}
              </div>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};
