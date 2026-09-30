import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MessageSquare, 
  Heart, 
  CheckCircle2, 
  Smile, 
  Frown, 
  HelpCircle, 
  MinusCircle, 
  Send, 
  Sparkles,
  ArrowUpDown,
  Tag
} from 'lucide-react';
import { InstagramIcon, TwitterIcon } from './SocialIcons';
import { PostDataset, CommentItem, SentimentType } from '../types';

interface InteractiveCommentExplorerProps {
  post: PostDataset;
  selectedCategoryId: string | null;
  selectedSentiment: SentimentType | 'all';
  onSelectCategory: (categoryId: string | null) => void;
  onSelectSentiment: (sentiment: SentimentType | 'all') => void;
  onAddComment: (commentText: string) => void;
}

export const InteractiveCommentExplorer: React.FC<InteractiveCommentExplorerProps> = ({
  post,
  selectedCategoryId,
  selectedSentiment,
  onSelectCategory,
  onSelectSentiment,
  onAddComment,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'likes' | 'recent' | 'confidence'>('likes');
  const [newCommentText, setNewCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Find active category name
  const activeCategoryObj = post.categories.find(c => c.id === selectedCategoryId);
  const activeCategoryName = activeCategoryObj?.name;

  // Filter comments
  const filteredComments = post.sampleComments.filter((comment) => {
    // Category match
    if (activeCategoryName && comment.category !== activeCategoryName) {
      return false;
    }
    // Sentiment match
    if (selectedSentiment !== 'all' && comment.sentiment !== selectedSentiment) {
      return false;
    }
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const textMatch = comment.text.toLowerCase().includes(q);
      const authorMatch = comment.author.toLowerCase().includes(q) || comment.handle.toLowerCase().includes(q);
      const keywordMatch = comment.detectedKeywords?.some(k => k.toLowerCase().includes(q));
      if (!textMatch && !authorMatch && !keywordMatch) return false;
    }
    return true;
  });

  // Sort comments
  const sortedComments = [...filteredComments].sort((a, b) => {
    if (sortBy === 'likes') return b.likes - a.likes;
    if (sortBy === 'confidence') return b.confidence - a.confidence;
    return 0; // default order
  });

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onAddComment(newCommentText.trim());
      setNewCommentText('');
      setIsSubmitting(false);
    }, 200);
  };

  const getSentimentBadge = (sentiment: SentimentType) => {
    switch (sentiment) {
      case 'positive':
        return {
          icon: <Smile className="w-3.5 h-3.5" />,
          label: 'Praise',
          style: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
        };
      case 'negative':
        return {
          icon: <Frown className="w-3.5 h-3.5" />,
          label: 'Critical',
          style: 'bg-rose-500/10 text-rose-400 border-rose-500/30'
        };
      case 'inquiry':
        return {
          icon: <HelpCircle className="w-3.5 h-3.5" />,
          label: 'Inquiry',
          style: 'bg-sky-500/10 text-sky-400 border-sky-500/30'
        };
      default:
        return {
          icon: <MinusCircle className="w-3.5 h-3.5" />,
          label: 'Neutral',
          style: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/30'
        };
    }
  };

  return (
    <div className="rounded-2xl bg-zinc-900/60 backdrop-blur-md border border-white/10 p-5 sm:p-6 shadow-xl space-y-5">
      
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-400" />
            Verified Comment Stream & Aspect Drill-Down
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Explore verbatim comments with AI confidence tags, aspect labels, and sentiment scores.
          </p>
        </div>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 self-start sm:self-auto">
          Showing {sortedComments.length} of {post.sampleComments.length} comments
        </span>
      </div>

      {/* Interactive Controls Bar: Search, Category, Sentiment, Sort */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 p-3 rounded-xl bg-zinc-950/70 border border-white/5">
        
        {/* Search Input */}
        <div className="md:col-span-5 relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search keywords, handles, or phrases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-900 border border-white/10 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Sentiment Filter */}
        <div className="md:col-span-4 flex items-center gap-1 overflow-x-auto scrollbar-none">
          {(['all', 'positive', 'negative', 'inquiry'] as const).map((sent) => (
            <button
              key={sent}
              onClick={() => onSelectSentiment(sent)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors whitespace-nowrap ${
                selectedSentiment === sent
                  ? 'bg-indigo-600 text-white'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {sent === 'all' ? 'All Tones' : sent}
            </button>
          ))}
        </div>

        {/* Sort selector */}
        <div className="md:col-span-3 flex items-center gap-2 justify-end">
          <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-zinc-900 border border-white/10 text-zinc-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
          >
            <option value="likes">Most Liked</option>
            <option value="confidence">AI Confidence</option>
            <option value="recent">Recent</option>
          </select>
        </div>

      </div>

      {/* Active Filter Tags Bar (if active) */}
      {(selectedCategoryId || selectedSentiment !== 'all' || searchQuery) && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-zinc-500">Active Filters:</span>
          
          {selectedCategoryId && activeCategoryName && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Tag className="w-3 h-3" />
              {activeCategoryName}
              <button 
                onClick={() => onSelectCategory(null)}
                className="hover:text-white font-bold ml-1"
              >
                ×
              </button>
            </span>
          )}

          {selectedSentiment !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30 capitalize">
              {selectedSentiment}
              <button 
                onClick={() => onSelectSentiment('all')}
                className="hover:text-white font-bold ml-1"
              >
                ×
              </button>
            </span>
          )}

          {searchQuery && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs bg-zinc-800 text-zinc-300 border border-white/10">
              Query: "{searchQuery}"
              <button 
                onClick={() => setSearchQuery('')}
                className="hover:text-white font-bold ml-1"
              >
                ×
              </button>
            </span>
          )}

          <button
            onClick={() => {
              onSelectCategory(null);
              onSelectSentiment('all');
              setSearchQuery('');
            }}
            className="text-xs text-indigo-400 hover:text-indigo-300 underline font-medium ml-auto"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
        {sortedComments.length === 0 ? (
          <div className="text-center py-12 bg-zinc-950/40 rounded-xl border border-white/5 space-y-2">
            <MessageSquare className="w-8 h-8 text-zinc-600 mx-auto" />
            <p className="text-sm font-semibold text-zinc-300">No comments match the selected filters</p>
            <p className="text-xs text-zinc-500">Try loosening your search query or reset category filter.</p>
          </div>
        ) : (
          sortedComments.map((comment) => {
            const badge = getSentimentBadge(comment.sentiment);
            const isIG = comment.platform === 'instagram';

            return (
              <div 
                key={comment.id}
                className="p-4 rounded-xl bg-zinc-950/70 border border-white/5 hover:border-white/15 transition-all duration-200 space-y-2.5 group"
              >
                {/* Author Info + Badges */}
                <div className="flex items-start justify-between gap-3">
                  
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={comment.avatar} 
                      alt={comment.author}
                      className="w-9 h-9 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white">{comment.author}</span>
                        {comment.isVerified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 fill-sky-400/20" />
                        )}
                        <span className="text-[11px] text-zinc-500">{comment.handle}</span>
                      </div>
                      <span className="text-[10px] text-zinc-500">{comment.timestamp}</span>
                    </div>
                  </div>

                  {/* Sentiment & Aspect Badge */}
                  <div className="flex items-center gap-2 flex-wrap justify-end">
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-zinc-900 text-zinc-300 border border-white/10 font-medium">
                      {comment.category}
                    </span>
                    <span className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md font-semibold border ${badge.style}`}>
                      {badge.icon}
                      <span>{badge.label}</span>
                    </span>
                  </div>

                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed pl-11">
                  {comment.text}
                </p>

                {/* Footer Tags & Likes */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 pl-11 text-xs text-zinc-400">
                  
                  {/* Detected Keywords Chips */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {comment.detectedKeywords?.map((kw, i) => (
                      <span key={i} className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        #{kw}
                      </span>
                    ))}
                    <span className="text-[10px] text-zinc-600">
                      Confidence: {Math.round(comment.confidence * 100)}%
                    </span>
                  </div>

                  {/* Likes Count */}
                  <div className="flex items-center gap-1 text-zinc-400 group-hover:text-rose-400 transition-colors">
                    <Heart className="w-3.5 h-3.5" />
                    <span className="font-semibold text-zinc-200">{comment.likes.toLocaleString()}</span>
                  </div>

                </div>

              </div>
            );
          })
        )}
      </div>

      {/* Real-time Interactive Comment Tester Bar */}
      <form onSubmit={handleCommentSubmit} className="pt-2 border-t border-white/10">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Test AI: Type a sample comment (e.g., '$210 is way too expensive, waiting for sale')..."
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-zinc-950 border border-indigo-500/30 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
            />
          </div>
          <button
            type="submit"
            disabled={!newCommentText.trim() || isSubmitting}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Classify & Add</span>
          </button>
        </div>
        <p className="text-[11px] text-zinc-500 mt-1.5">
          💡 Try typing positive praise, price complaints, or sizing questions to test the live semantic classification engine.
        </p>
      </form>

    </div>
  );
};
