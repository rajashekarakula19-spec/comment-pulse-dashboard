import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { PostHeroCard } from './components/PostHeroCard';
import { PopularityScoreCard } from './components/PopularityScoreCard';
import { CategoryDistribution } from './components/CategoryDistribution';
import { KeyDriversSection } from './components/KeyDriversSection';
import { AnalyticsVisualizer } from './components/AnalyticsVisualizer';
import { InteractiveCommentExplorer } from './components/InteractiveCommentExplorer';
import { StrategicMemoCard } from './components/StrategicMemoCard';
import { CustomPostModal } from './components/CustomPostModal';
import { MOCK_DATASETS } from './data/mockPosts';
import { PostDataset, SentimentType, Platform } from './types';
import { analyzeRawComments } from './utils/aiAnalyzer';
import { 
  Sparkles, 
  Layers, 
  Flame, 
  HelpCircle, 
  BarChart2, 
  FileSpreadsheet,
  CheckCircle2,
  X
} from 'lucide-react';

export function App() {
  const [posts, setPosts] = useState<PostDataset[]>(MOCK_DATASETS);
  const [selectedPostId, setSelectedPostId] = useState<string>(MOCK_DATASETS[0].id);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedSentiment, setSelectedSentiment] = useState<SentimentType | 'all'>('all');
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [exportToast, setExportToast] = useState<string | null>(null);

  // Active Post
  const activePost = posts.find(p => p.id === selectedPostId) || posts[0];

  // Handle Post Switch
  const handleSelectPost = (post: PostDataset) => {
    setSelectedPostId(post.id);
    setSelectedCategoryId(null);
    setSelectedSentiment('all');
  };

  // Handle Custom Post Analysis
  const handleAnalyzeCustom = (data: {
    platform: Platform;
    title: string;
    author: string;
    handle: string;
    content: string;
    rawComments: string[];
  }) => {
    const newAnalyzedPost = analyzeRawComments(data);
    setPosts([newAnalyzedPost, ...posts]);
    setSelectedPostId(newAnalyzedPost.id);
    setSelectedCategoryId(null);
    setSelectedSentiment('all');
    setExportToast(`Analyzed ${newAnalyzedPost.title} with ${newAnalyzedPost.totalAnalyzedComments} comments.`);
    setTimeout(() => setExportToast(null), 4000);
  };

  // Handle Live Single Comment Insertion (Real-time testing)
  const handleAddLiveComment = (commentText: string) => {
    const rawList = [...activePost.sampleComments.map(c => c.text), commentText];
    
    const updatedPost = analyzeRawComments({
      platform: activePost.platform,
      title: activePost.title,
      author: activePost.author,
      handle: activePost.handle,
      content: activePost.content,
      rawComments: rawList,
    });

    // Preserve original ID & metadata
    updatedPost.id = activePost.id;
    updatedPost.publishedAt = activePost.publishedAt;
    updatedPost.avatarUrl = activePost.avatarUrl;
    updatedPost.likesCount = activePost.likesCount + 1;
    updatedPost.commentsCount = activePost.commentsCount + 1;

    setPosts(posts.map(p => p.id === activePost.id ? updatedPost : p));
  };

  // Export CSV Report Action
  const handleExportReport = () => {
    const csvRows = [
      ['Author', 'Platform', 'Sentiment', 'Category', 'Comment', 'Likes', 'Keywords'].join(','),
      ...activePost.sampleComments.map(c => [
        `"${c.author}"`,
        `"${c.platform}"`,
        `"${c.sentiment}"`,
        `"${c.category}"`,
        `"${c.text.replace(/"/g, '""')}"`,
        c.likes,
        `"${(c.detectedKeywords || []).join('; ')}"`
      ].join(','))
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activePost.id}-comment-intelligence.csv`;
    link.click();
    URL.revokeObjectURL(url);

    setExportToast(`Exported comment intelligence dataset (${activePost.sampleComments.length} categorized comments) to CSV.`);
    setTimeout(() => setExportToast(null), 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-indigo-500 selection:text-white">
      
      {/* Navbar */}
      <Navbar
        posts={posts}
        selectedPost={activePost}
        onSelectPost={handleSelectPost}
        onOpenCustomModal={() => setIsCustomModalOpen(true)}
        onExportReport={handleExportReport}
      />

      {/* Main Dashboard Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Toast Alert */}
        {exportToast && (
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-medium shadow-lg animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{exportToast}</span>
            </div>
            <button onClick={() => setExportToast(null)} className="hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 1. Post Overview & Ingestion Context Card */}
        <PostHeroCard post={activePost} />

        {/* 2. Popularity Health Gauge & Net Sentiment Index */}
        <PopularityScoreCard
          post={activePost}
          activeSentimentFilter={selectedSentiment}
          onSelectSentimentFilter={setSelectedSentiment}
        />

        {/* 3. Aspect Categorization with Headcounts */}
        <CategoryDistribution
          categories={activePost.categories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
        />

        {/* 4. Root Cause Intelligence: Why is it Popular / Unpopular */}
        <KeyDriversSection post={activePost} />

        {/* 5. Sentiment Velocity & Aspect Distribution Charts */}
        <AnalyticsVisualizer post={activePost} />

        {/* 6. Strategic AI Executive Brief */}
        <StrategicMemoCard summary={activePost.executiveSummary} />

        {/* 7. Granular Comment Explorer & Verbatim Drill-Down */}
        <InteractiveCommentExplorer
          post={activePost}
          selectedCategoryId={selectedCategoryId}
          selectedSentiment={selectedSentiment}
          onSelectCategory={setSelectedCategoryId}
          onSelectSentiment={setSelectedSentiment}
          onAddComment={handleAddLiveComment}
        />

      </main>

      {/* Modal for Analyzing Custom URL / Posts */}
      <CustomPostModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        onAnalyze={handleAnalyzeCustom}
      />

      {/* Sleek Minimal Footer */}
      <footer className="w-full border-t border-white/5 py-6 bg-zinc-950/80 backdrop-blur-md mt-12 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold text-zinc-300">PulseSense AI</span>
            <span>— Aspect-Based Social Comment Intelligence</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <span>Instagram Graph & X API Spec Compatible</span>
            <span>•</span>
            <span>Real-time Semantic Clustering</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
