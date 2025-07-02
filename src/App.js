import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Play, Pause, RotateCcw, TrendingUp, Star, MessageSquare, Brain, Target, Zap } from 'lucide-react';

const SentimentAnalysisApp = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [sentimentResult, setSentimentResult] = useState(null);

  // Sample data for visualization
  const sentimentData = [
    { name: 'Positive', value: 652, color: '#10B981' },
    { name: 'Negative', value: 348, color: '#EF4444' }
  ];

  const performanceData = [
    { metric: 'Accuracy', value: 87.3, color: '#3B82F6' },
    { metric: 'Precision', value: 89.1, color: '#8B5CF6' },
    { metric: 'Recall', value: 85.7, color: '#F59E0B' },
    { metric: 'F1-Score', value: 87.4, color: '#10B981' }
  ];

  const trainingHistory = [
    { epoch: 1, accuracy: 65.2, loss: 0.68 },
    { epoch: 2, accuracy: 72.1, loss: 0.54 },
    { epoch: 3, accuracy: 78.9, loss: 0.41 },
    { epoch: 4, accuracy: 83.4, loss: 0.32 },
    { epoch: 5, accuracy: 87.3, loss: 0.25 }
  ];

  const sampleReviews = [
    "This movie was absolutely fantastic! Great acting and storyline.",
    "Terrible plot, boring characters. Complete waste of time.",
    "Average movie, nothing special but watchable.",
    "Outstanding cinematography and brilliant performances throughout."
  ];

  // Training simulation
  const startTraining = () => {
    setIsTraining(true);
    setTrainingProgress(0);
    setAccuracy(0);
    
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          setAccuracy(87.3);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const analyzeSentiment = (text) => {
    const positiveWords = ['fantastic', 'great', 'outstanding', 'brilliant', 'amazing', 'excellent', 'wonderful'];
    const negativeWords = ['terrible', 'boring', 'waste', 'awful', 'horrible', 'bad', 'worst'];
    
    const words = text.toLowerCase().split(' ');
    let score = 0;
    
    words.forEach(word => {
      if (positiveWords.some(pw => word.includes(pw))) score += 1;
      if (negativeWords.some(nw => word.includes(nw))) score -= 1;
    });
    
    const sentiment = score > 0 ? 'Positive' : score < 0 ? 'Negative' : 'Neutral';
    const confidence = Math.min(Math.abs(score) * 20 + 60, 95);
    
    setSentimentResult({ sentiment, confidence, score });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20"></div>
        <div className="relative px-6 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Movie Review Sentiment Analysis
              </h1>
            </div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Advanced machine learning platform for analyzing sentiment in movie reviews. 
              Automatically classify reviews as positive or negative using state-of-the-art NLP models.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 z-40 bg-slate-800/80 backdrop-blur-xl border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'train', label: 'Train Model', icon: Brain },
              { id: 'analyze', label: 'Analyze Review', icon: MessageSquare },
              { id: 'performance', label: 'Performance', icon: Target }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-4 text-sm font-medium transition-all ${
                  activeTab === id
                    ? 'text-purple-400 border-b-2 border-purple-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Reviews', value: '1,000', icon: MessageSquare, color: 'from-blue-500 to-cyan-500' },
                { label: 'Model Accuracy', value: '87.3%', icon: Target, color: 'from-green-500 to-emerald-500' },
                { label: 'Positive Reviews', value: '652', icon: Star, color: 'from-yellow-500 to-orange-500' },
                { label: 'Processing Speed', value: '0.03s', icon: Zap, color: 'from-purple-500 to-pink-500' }
              ].map((stat, index) => (
                <div key={index} className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Sentiment Distribution */}
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-6">Sentiment Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sentimentData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={60}
                      paddingAngle={5}
                    >
                      {sentimentData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Performance Metrics */}
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-6">Model Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="metric" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'train' && (
          <div className="space-y-8">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700">
              <h3 className="text-2xl font-semibold text-white mb-6">Model Training</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={startTraining}
                    disabled={isTraining}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isTraining ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    {isTraining ? 'Training...' : 'Start Training'}
                  </button>
                  
                  <button
                    onClick={() => {
                      setTrainingProgress(0);
                      setAccuracy(0);
                      setSentimentResult(null);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition-all"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Reset
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Training Progress</span>
                    <span className="text-white">{trainingProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${trainingProgress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Accuracy Display */}
                {accuracy > 0 && (
                  <div className="bg-slate-700/50 rounded-xl p-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">{accuracy}%</div>
                      <div className="text-gray-400">Final Accuracy</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Training History */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-6">Training History</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trainingHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="epoch" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#fff'
                    }} 
                  />
                  <Line type="monotone" dataKey="accuracy" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'analyze' && (
          <div className="space-y-8">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700">
              <h3 className="text-2xl font-semibold text-white mb-6">Analyze Movie Review</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Enter Movie Review
                  </label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Type your movie review here..."
                    className="w-full h-32 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => analyzeSentiment(reviewText)}
                    disabled={!reviewText.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Analyze Sentiment
                  </button>
                  
                  <button
                    onClick={() => setReviewText(sampleReviews[Math.floor(Math.random() * sampleReviews.length)])}
                    className="px-6 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition-all"
                  >
                    Try Sample Review
                  </button>
                </div>

                {/* Results */}
                {sentimentResult && (
                  <div className="bg-slate-700/50 rounded-xl p-6 space-y-4">
                    <h4 className="text-lg font-semibold text-white">Analysis Results</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-slate-600/50 rounded-lg">
                        <div className={`text-2xl font-bold mb-2 ${
                          sentimentResult.sentiment === 'Positive' ? 'text-green-400' :
                          sentimentResult.sentiment === 'Negative' ? 'text-red-400' : 'text-yellow-400'
                        }`}>
                          {sentimentResult.sentiment}
                        </div>
                        <div className="text-gray-400 text-sm">Sentiment</div>
                      </div>
                      
                      <div className="text-center p-4 bg-slate-600/50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-400 mb-2">
                          {sentimentResult.confidence}%
                        </div>
                        <div className="text-gray-400 text-sm">Confidence</div>
                      </div>
                      
                      <div className="text-center p-4 bg-slate-600/50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-400 mb-2">
                          {sentimentResult.score > 0 ? '+' : ''}{sentimentResult.score}
                        </div>
                        <div className="text-gray-400 text-sm">Score</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-6">Model Metrics</h3>
                <div className="space-y-4">
                  {performanceData.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                      <span className="text-gray-300">{metric.metric}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-slate-600 rounded-full">
                          <div 
                            className="h-2 rounded-full transition-all duration-1000"
                            style={{ 
                              width: `${metric.value}%`,
                              backgroundColor: metric.color
                            }}
                          ></div>
                        </div>
                        <span className="text-white font-semibold w-12">{metric.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-6">Model Details</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Algorithm</div>
                    <div className="text-white font-semibold">Support Vector Machine</div>
                  </div>
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Training Data</div>
                    <div className="text-white font-semibold">1,000 Movie Reviews</div>
                  </div>
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Features</div>
                    <div className="text-white font-semibold">TF-IDF Vectorization</div>
                  </div>
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Cross-validation</div>
                    <div className="text-white font-semibold">5-Fold CV</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SentimentAnalysisApp;