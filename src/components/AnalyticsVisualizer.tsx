import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Legend 
} from 'recharts';
import { 
  TrendingUp, 
  BarChart3, 
  Clock, 
  Layers 
} from 'lucide-react';
import { PostDataset } from '../types';

interface AnalyticsVisualizerProps {
  post: PostDataset;
}

export const AnalyticsVisualizer: React.FC<AnalyticsVisualizerProps> = ({ post }) => {
  // Prepare category comparison data for Recharts
  const categoryBarData = post.categories.map((cat) => ({
    name: cat.name.split('&')[0].trim(),
    Positive: cat.sentimentSplit.positive,
    Negative: cat.sentimentSplit.negative,
    Inquiries: cat.sentimentSplit.inquiries,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Chart 1: Sentiment Velocity Over Time */}
      <div className="rounded-2xl bg-zinc-900/60 backdrop-blur-md border border-white/10 p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-400" />
            <h4 className="text-sm font-bold text-white">Sentiment Velocity Timeline</h4>
          </div>
          <span className="text-[11px] text-zinc-400">Comment Flow Rate</span>
        </div>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={post.sentimentTimeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorNeg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#71717a" fontSize={11} tickLine={false} />
              <YAxis stroke="#71717a" fontSize={11} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#09090b', 
                  borderColor: '#27272a', 
                  borderRadius: '0.75rem', 
                  fontSize: '12px' 
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="positive" 
                stroke="#10b981" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorPos)" 
                name="Positive Praise"
              />
              <Area 
                type="monotone" 
                dataKey="negative" 
                stroke="#f43f5e" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorNeg)" 
                name="Critical Backlash"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Aspect Sentiment Breakdown */}
      <div className="rounded-2xl bg-zinc-900/60 backdrop-blur-md border border-white/10 p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-indigo-400" />
            <h4 className="text-sm font-bold text-white">Category Sentiment Volumes</h4>
          </div>
          <span className="text-[11px] text-zinc-400">Headcounts by Aspect</span>
        </div>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryBarData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#71717a" fontSize={11} tickLine={false} />
              <YAxis stroke="#71717a" fontSize={11} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#09090b', 
                  borderColor: '#27272a', 
                  borderRadius: '0.75rem', 
                  fontSize: '12px' 
                }} 
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Bar dataKey="Positive" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Negative" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Inquiries" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
