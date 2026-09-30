import React from 'react';
import { 
  Download, 
  PlusCircle, 
  Flame,
} from 'lucide-react';
import { PostDataset } from '../types';
import { InstagramIcon, TwitterIcon } from './SocialIcons';
import confetti from 'canvas-confetti';

interface NavbarProps {
  posts: PostDataset[];
  selectedPost: PostDataset;
  onSelectPost: (post: PostDataset) => void;
  onOpenCustomModal: () => void;
  onExportReport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  posts,
  selectedPost,
  onSelectPost,
  onOpenCustomModal,
  onExportReport
}) => {
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.2 },
      colors: ['#6366f1', '#a855f7', '#ec4899', '#10b981']
    });
    onExportReport();
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-zinc-950/80 border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-[2px] shadow-lg shadow-indigo-500/20">
                <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                  <Flame className="w-5 h-5 text-indigo-400 animate-pulse" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  PulseSense<span className="text-indigo-400">.AI</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  Comment Intelligence
                </span>
              </div>
              <p className="text-xs text-zinc-400 hidden sm:block">
                Aspect Categorization · Headcounts · Why It's Popular
              </p>
            </div>
          </div>

          {/* Dataset Switcher Pills */}
          <div className="hidden md:flex items-center gap-1.5 p-1 bg-zinc-900/90 rounded-xl border border-white/5 shadow-inner">
            {posts.map((post) => {
              const isSelected = selectedPost.id === post.id;
              const isIG = post.platform === 'instagram';

              return (
                <button
                  key={post.id}
                  onClick={() => onSelectPost(post)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25 scale-[1.02]'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                  }`}
                >
                  {isIG ? (
                    <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
                  ) : (
                    <TwitterIcon className="w-3.5 h-3.5 text-sky-400" />
                  )}
                  <span className="max-w-[130px] truncate">{post.author}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    post.popularityScore >= 70 ? 'bg-emerald-500/20 text-emerald-300' :
                    post.popularityScore >= 50 ? 'bg-amber-500/20 text-amber-300' :
                    'bg-rose-500/20 text-rose-300'
                  }`}>
                    {post.popularityScore}%
                  </span>
                </button>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenCustomModal}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-white/10 hover:border-indigo-500/40 transition-all duration-200 shadow-sm hover:shadow-indigo-500/10 group cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-indigo-400 group-hover:rotate-90 transition-transform duration-300" />
              <span>Analyze Any Post</span>
            </button>

            <button
              onClick={triggerConfetti}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/25 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export CSV Report</span>
            </button>
          </div>

        </div>

        {/* Mobile Dataset Selector Bar */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1.5 scrollbar-none border-t border-white/5">
          {posts.map((post) => (
            <button
              key={post.id}
              onClick={() => onSelectPost(post)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs cursor-pointer ${
                selectedPost.id === post.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-zinc-900 text-zinc-400'
              }`}
            >
              {post.platform === 'instagram' ? <InstagramIcon className="w-3 h-3 text-pink-400" /> : <TwitterIcon className="w-3 h-3 text-sky-400" />}
              <span>{post.author}</span>
            </button>
          ))}
        </div>

      </div>
    </header>
  );
};
