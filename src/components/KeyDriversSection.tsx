import React, { useState } from 'react';
import { 
  Flame, 
  ThumbsUp, 
  ThumbsDown, 
  HelpCircle, 
  Quote, 
  Heart, 
  Users, 
  Sparkles,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  TrendingUp
} from 'lucide-react';
import { PostDataset, KeyReason } from '../types';

interface KeyDriversSectionProps {
  post: PostDataset;
}

export const KeyDriversSection: React.FC<KeyDriversSectionProps> = ({ post }) => {
  const { positiveReasons, negativeReasons, topInquiries } = post.keyDrivers;
  const [expandedReasonId, setExpandedReasonId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedReasonId(expandedReasonId === id ? null : id);
  };

  return (
    <div className="rounded-2xl bg-zinc-900/60 backdrop-blur-md border border-white/10 p-5 sm:p-6 shadow-xl space-y-6">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-bold text-white tracking-tight">
            Root Cause Intelligence: Why is this Post {post.popularityScore >= 50 ? 'Popular' : 'Unpopular'}?
          </h3>
        </div>
        <p className="text-xs text-zinc-400 mt-1">
          AI-synthesized drivers with quantified human headcounts and verified verbatim quotations.
        </p>
      </div>

      {/* Grid: 2 Main Columns (Positive Drivers vs Negative Drivers) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Why People Love It (Positive Drivers) */}
        <div className="space-y-3.5 p-4 rounded-xl bg-emerald-950/10 border border-emerald-500/20">
          <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                <ThumbsUp className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-emerald-300">
                Key Reasons for Popularity ({positiveReasons.length} Drivers)
              </h4>
            </div>
            <span className="text-xs text-emerald-400/80 font-medium">Positive Consensus</span>
          </div>

          {positiveReasons.length === 0 ? (
            <p className="text-xs text-zinc-400 italic py-4">No significant positive clusters detected.</p>
          ) : (
            <div className="space-y-2.5">
              {positiveReasons.map((reason, idx) => {
                const isExpanded = expandedReasonId === reason.id;

                return (
                  <div 
                    key={reason.id}
                    className="p-3.5 rounded-xl bg-zinc-950/80 border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-200"
                  >
                    <div 
                      onClick={() => toggleExpand(reason.id)}
                      className="cursor-pointer flex items-start justify-between gap-3"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center justify-center mt-0.5">
                          #{idx + 1}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-zinc-100">{reason.text}</p>
                          <div className="flex flex-wrap items-center gap-2 mt-1.5">
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                              <Users className="w-3 h-3" />
                              {reason.peopleCount.toLocaleString()} people ({reason.percentage}%)
                            </span>
                            <span className="text-[11px] text-zinc-400">
                              Impact: <strong className="text-zinc-200">{reason.impactScore}/10</strong>
                            </span>
                          </div>
                        </div>
                      </div>

                      <button className="text-zinc-400 hover:text-white p-1">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Expandable Representative Quotes */}
                    {isExpanded && reason.representativeQuotes.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-white/5 space-y-2">
                        <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider flex items-center gap-1">
                          <Quote className="w-3 h-3 text-emerald-400" />
                          Representative User Quotes:
                        </span>
                        {reason.representativeQuotes.map((quote, qIdx) => (
                          <div key={qIdx} className="p-2.5 rounded-lg bg-zinc-900/90 border border-white/5 text-xs">
                            <p className="text-zinc-300 italic">"{quote.text}"</p>
                            <div className="flex items-center justify-between mt-1.5 text-[10px] text-zinc-400">
                              <span className="font-semibold text-emerald-400">{quote.author}</span>
                              <span className="flex items-center gap-1">
                                <Heart className="w-3 h-3 text-rose-400" />
                                {quote.likes.toLocaleString()} likes
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Why People Dislike It (Backlash Drivers) */}
        <div className="space-y-3.5 p-4 rounded-xl bg-rose-950/10 border border-rose-500/20">
          <div className="flex items-center justify-between pb-2 border-b border-rose-500/20">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
                <ThumbsDown className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-rose-300">
                Key Reasons for Discontent / Friction ({negativeReasons.length} Drivers)
              </h4>
            </div>
            <span className="text-xs text-rose-400/80 font-medium">Pain Points</span>
          </div>

          {negativeReasons.length === 0 ? (
            <p className="text-xs text-zinc-400 italic py-4">No significant negative backlash clusters found.</p>
          ) : (
            <div className="space-y-2.5">
              {negativeReasons.map((reason, idx) => {
                const isExpanded = expandedReasonId === reason.id;

                return (
                  <div 
                    key={reason.id}
                    className="p-3.5 rounded-xl bg-zinc-950/80 border border-rose-500/10 hover:border-rose-500/30 transition-all duration-200"
                  >
                    <div 
                      onClick={() => toggleExpand(reason.id)}
                      className="cursor-pointer flex items-start justify-between gap-3"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold flex items-center justify-center mt-0.5">
                          #{idx + 1}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-zinc-100">{reason.text}</p>
                          <div className="flex flex-wrap items-center gap-2 mt-1.5">
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/20">
                              <Users className="w-3 h-3" />
                              {reason.peopleCount.toLocaleString()} people ({reason.percentage}%)
                            </span>
                            <span className="text-[11px] text-zinc-400">
                              Friction Severity: <strong className="text-rose-300">{reason.impactScore}/10</strong>
                            </span>
                          </div>
                        </div>
                      </div>

                      <button className="text-zinc-400 hover:text-white p-1">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Expandable Representative Quotes */}
                    {isExpanded && reason.representativeQuotes.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-white/5 space-y-2">
                        <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider flex items-center gap-1">
                          <Quote className="w-3 h-3 text-rose-400" />
                          Representative User Quotes:
                        </span>
                        {reason.representativeQuotes.map((quote, qIdx) => (
                          <div key={qIdx} className="p-2.5 rounded-lg bg-zinc-900/90 border border-white/5 text-xs">
                            <p className="text-zinc-300 italic">"{quote.text}"</p>
                            <div className="flex items-center justify-between mt-1.5 text-[10px] text-zinc-400">
                              <span className="font-semibold text-rose-400">{quote.author}</span>
                              <span className="flex items-center gap-1">
                                <Heart className="w-3 h-3 text-rose-400" />
                                {quote.likes.toLocaleString()} likes
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* Third Row: Top Emerging Questions & Customer Inquiries */}
      {topInquiries && topInquiries.length > 0 && (
        <div className="p-4 rounded-xl bg-sky-950/10 border border-sky-500/20 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-sky-500/20">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400">
                <HelpCircle className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-sky-300">
                Top Audience Inquiries & High-Intent Questions
              </h4>
            </div>
            <span className="text-xs text-sky-400/80 font-medium">Unresolved Demand</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {topInquiries.map((inq, idx) => (
              <div key={inq.id} className="p-3 rounded-lg bg-zinc-950/70 border border-sky-500/10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-100">{inq.text}</span>
                  <span className="text-[11px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                    {inq.peopleCount.toLocaleString()} people
                  </span>
                </div>
                {inq.representativeQuotes[0] && (
                  <p className="text-[11px] text-zinc-400 italic">
                    "{inq.representativeQuotes[0].text}" — <span className="text-sky-300">{inq.representativeQuotes[0].author}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
