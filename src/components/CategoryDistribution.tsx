import React from 'react';
import { 
  Palette, 
  Tag, 
  Zap, 
  Package, 
  Smile, 
  Cpu, 
  CreditCard, 
  Briefcase, 
  Code, 
  UserX, 
  Lock, 
  Film, 
  Tv, 
  Sparkles, 
  Flame, 
  ShieldAlert, 
  Monitor,
  HelpCircle,
  ShieldCheck,
  Layers,
  ArrowRight,
  Check
} from 'lucide-react';
import { CommentCategory } from '../types';

interface CategoryDistributionProps {
  categories: CommentCategory[];
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

// Icon resolver helper
const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Palette': return <Palette className="w-4 h-4" />;
    case 'Tag': return <Tag className="w-4 h-4" />;
    case 'Zap': return <Zap className="w-4 h-4" />;
    case 'Package': return <Package className="w-4 h-4" />;
    case 'Smile': return <Smile className="w-4 h-4" />;
    case 'Cpu': return <Cpu className="w-4 h-4" />;
    case 'CreditCard': return <CreditCard className="w-4 h-4" />;
    case 'Briefcase': return <Briefcase className="w-4 h-4" />;
    case 'Code': return <Code className="w-4 h-4" />;
    case 'UserX': return <UserX className="w-4 h-4" />;
    case 'Lock': return <Lock className="w-4 h-4" />;
    case 'Film': return <Film className="w-4 h-4" />;
    case 'Tv': return <Tv className="w-4 h-4" />;
    case 'Sparkles': return <Sparkles className="w-4 h-4" />;
    case 'Flame': return <Flame className="w-4 h-4" />;
    case 'ShieldAlert': return <ShieldAlert className="w-4 h-4" />;
    case 'Monitor': return <Monitor className="w-4 h-4" />;
    case 'ShieldCheck': return <ShieldCheck className="w-4 h-4" />;
    default: return <HelpCircle className="w-4 h-4" />;
  }
};

export const CategoryDistribution: React.FC<CategoryDistributionProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
}) => {
  return (
    <div className="rounded-2xl bg-zinc-900/60 backdrop-blur-md border border-white/10 p-5 sm:p-6 shadow-xl space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            Aspect & Topic Categorization with Headcounts
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Click any category to filter the verbatim comments stream below
          </p>
        </div>

        {selectedCategoryId && (
          <button
            onClick={() => onSelectCategory(null)}
            className="text-xs text-indigo-400 hover:text-indigo-300 underline font-medium self-start sm:self-auto"
          >
            Reset Category Filter
          </button>
        )}
      </div>

      {/* Grid of Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {categories.map((cat) => {
          const isSelected = selectedCategoryId === cat.id;
          const { positive, negative, neutral, inquiries } = cat.sentimentSplit;
          const catTotal = positive + negative + neutral + inquiries || 1;
          const posPct = Math.round((positive / catTotal) * 100);
          const negPct = Math.round((negative / catTotal) * 100);
          const inqPct = Math.round((inquiries / catTotal) * 100);

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? null : cat.id)}
              role="button"
              tabIndex={0}
              className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden group ${
                isSelected
                  ? 'bg-indigo-950/40 border-indigo-500 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/50'
                  : 'bg-zinc-950/50 border-white/5 hover:border-white/20 hover:bg-zinc-900/80'
              }`}
            >
              {/* Category Color Accent Top Line */}
              <div 
                className="absolute top-0 left-0 right-0 h-1 transition-opacity duration-200"
                style={{ backgroundColor: cat.color }}
              />

              {/* Title & Icon & Count */}
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: `${cat.color}25`, color: cat.color }}
                    >
                      {getCategoryIcon(cat.icon)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {cat.name}
                      </h4>
                      <p className="text-[11px] text-zinc-400 line-clamp-1">{cat.description}</p>
                    </div>
                  </div>

                  {isSelected && (
                    <span className="p-1 rounded-full bg-indigo-500 text-white">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>

                {/* Headcount Numbers */}
                <div className="flex items-baseline justify-between mt-3 pt-2 border-t border-white/5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-white">{cat.peopleCount.toLocaleString()}</span>
                    <span className="text-xs text-zinc-400">people</span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                    {cat.sharePercent}% of post
                  </span>
                </div>
              </div>

              {/* Sentiment Breakdown within this Category */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[11px] font-medium text-zinc-400">
                  <span className="text-emerald-400 font-semibold">{posPct}% Pos ({positive})</span>
                  {inqPct > 0 && <span className="text-sky-400">{inqPct}% Inq ({inquiries})</span>}
                  <span className="text-rose-400 font-semibold">{negPct}% Neg ({negative})</span>
                </div>

                <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden flex gap-0.5">
                  <div style={{ width: `${posPct}%` }} className="bg-emerald-500 rounded-l-full" />
                  <div style={{ width: `${inqPct}%` }} className="bg-sky-500" />
                  <div style={{ width: `${negPct}%` }} className="bg-rose-500 rounded-r-full" />
                </div>
              </div>

              {/* Sample Sub-reasons list */}
              {cat.topReasons && cat.topReasons.length > 0 && (
                <div className="pt-2 border-t border-white/5 space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">
                    Key Drivers:
                  </span>
                  <ul className="text-xs text-zinc-300 space-y-1">
                    {cat.topReasons.slice(0, 2).map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-[11px] text-zinc-300">
                        <span className="text-indigo-400 font-bold">•</span>
                        <span className="line-clamp-1">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
