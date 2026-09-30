import React from 'react';
import { 
  Bot, 
  Lightbulb, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';
import { ExecutiveSummary } from '../types';

interface StrategicMemoCardProps {
  summary: ExecutiveSummary;
}

export const StrategicMemoCard: React.FC<StrategicMemoCardProps> = ({ summary }) => {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-indigo-950/40 via-zinc-900/60 to-purple-950/30 backdrop-blur-md border border-indigo-500/30 p-5 sm:p-6 shadow-2xl space-y-5">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              AI Strategic Intelligence Memo
            </h3>
            <p className="text-xs text-indigo-300/80">
              Automated executive brief for brand, social & product teams
            </p>
          </div>
        </div>

        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
          Executive Tier
        </span>
      </div>

      {/* Headline & Overview */}
      <div className="space-y-2">
        <h4 className="text-sm sm:text-base font-bold text-zinc-100">
          {summary.headline}
        </h4>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-950/60 p-3.5 rounded-xl border border-white/5">
          {summary.overview}
        </p>
      </div>

      {/* Grid: Recommendations vs Wins & Risks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Recommended Actions */}
        <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/5 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Recommended Strategic Actions</span>
          </div>
          <ul className="space-y-2 text-xs text-zinc-300">
            {summary.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="flex-shrink-0 w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold flex items-center justify-center mt-0.5">
                  {idx + 1}
                </span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Key Wins & Friction Points */}
        <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/5 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Consensus Highlights</span>
          </div>
          <ul className="space-y-2 text-xs text-zinc-300">
            {summary.keyRisksOrWins.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
};
