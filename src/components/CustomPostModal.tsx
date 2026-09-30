import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
} from 'lucide-react';
import { Platform } from '../types';
import { InstagramIcon, TwitterIcon } from './SocialIcons';

interface CustomPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalyze: (data: {
    platform: Platform;
    title: string;
    author: string;
    handle: string;
    content: string;
    rawComments: string[];
  }) => void;
}

const PRESET_COMMENT_SAMPLES = {
  ecommerce: [
    'The color is gorgeous! Just bought mine 🔥',
    'Why is shipping $25 for standard delivery? That is crazy.',
    'Is this available in size XL for Europe?',
    'Terrible quality, mine ripped in 2 days. Scam!',
    'Best purchase I made this summer, so comfortable.',
    'When is the black version restocking?',
    'Price is way too expensive for what you get, $180 is wild.',
    'Obsessed with the packaging and clean design ❤️',
    'Customer support has ignored my email for 4 days.',
    'Haha my wallet is in tears again 😭💀',
    'Do you guys ship to Canada and Australia?',
    'Instant cop! The aesthetic matches everything.'
  ],
  saas: [
    'The speed of this update is incredible, cut our build time by 50% 🚀',
    'Why did you raise subscription prices from $19 to $49 without notice?',
    'Does this support Python 3.12 and Docker containers?',
    'Best UI redesign you guys have ever done, super clean.',
    'Canceling my account immediately. Greed ruins every good tool.',
    'When will the VS Code extension be available?',
    'Encountered a bug where exports fail on large CSV files.',
    'Amazing job to the engineering team! 10/10 update.',
    'Customer support answered in 2 minutes and fixed my issue.'
  ]
};

export const CustomPostModal: React.FC<CustomPostModalProps> = ({
  isOpen,
  onClose,
  onAnalyze
}) => {
  const [platform, setPlatform] = useState<Platform>('instagram');
  const [author, setAuthor] = useState('TechBrand');
  const [handle, setHandle] = useState('@techbrand');
  const [title, setTitle] = useState('New Product Announcement');
  const [content, setContent] = useState('Excited to introduce our new release today. Available now on our store.');
  const [commentsText, setCommentsText] = useState(PRESET_COMMENT_SAMPLES.ecommerce.join('\n'));
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLoadSample = (key: 'ecommerce' | 'saas') => {
    setCommentsText(PRESET_COMMENT_SAMPLES[key].join('\n'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const splitComments = commentsText
      .split('\n')
      .map(c => c.trim())
      .filter(c => c.length > 0);

    if (splitComments.length === 0) return;

    setIsLoading(true);
    setTimeout(() => {
      onAnalyze({
        platform,
        title,
        author,
        handle,
        content,
        rawComments: splitComments,
      });
      setIsLoading(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-2xl p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Analyze Custom Social Media Post</h3>
              <p className="text-xs text-zinc-400">Ingest, cluster aspects, calculate popularity & headcounts</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Platform Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">Social Platform</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPlatform('instagram')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  platform === 'instagram'
                    ? 'bg-pink-500/20 border-pink-500 text-pink-300 shadow-md'
                    : 'bg-zinc-900 border-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                <InstagramIcon className="w-4 h-4 text-pink-400" />
                <span>Instagram</span>
              </button>

              <button
                type="button"
                onClick={() => setPlatform('twitter')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  platform === 'twitter'
                    ? 'bg-sky-500/20 border-sky-500 text-sky-300 shadow-md'
                    : 'bg-zinc-900 border-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                <TwitterIcon className="w-4 h-4 text-sky-400" />
                <span>X (Twitter)</span>
              </button>
            </div>
          </div>

          {/* Post Author & Handle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-300">Author / Brand Name</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-300">Handle</label>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          {/* Post Content */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-300">Post Caption / Text</label>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          {/* Comments Input (Multi-line) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-zinc-300">
                Comments Batch (One comment per line)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-zinc-500">Presets:</span>
                <button
                  type="button"
                  onClick={() => handleLoadSample('ecommerce')}
                  className="text-[11px] text-indigo-400 hover:underline cursor-pointer"
                >
                  D2C Drop
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadSample('saas')}
                  className="text-[11px] text-indigo-400 hover:underline cursor-pointer"
                >
                  Tech / SaaS
                </button>
              </div>
            </div>
            
            <textarea
              rows={6}
              value={commentsText}
              onChange={(e) => setCommentsText(e.target.value)}
              placeholder="Paste comments here, each on a new line..."
              className="w-full p-3 text-xs font-mono bg-zinc-900 border border-white/10 rounded-xl text-zinc-200 focus:outline-none focus:border-indigo-500"
              required
            />
            <p className="text-[11px] text-zinc-500">
              {commentsText.split('\n').filter(c => c.trim().length > 0).length} raw comments ready for AI clustering.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isLoading ? 'Clustering & Categorizing...' : 'Run Ingestion & Categorize'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
