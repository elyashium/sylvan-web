import { useState } from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { mockPlantTweets } from '../utils/mockData';
import { PlantTweet } from '../types';

const TweetsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [emotionFilter, setEmotionFilter] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter tweets based on search term and emotion filter
  const filteredTweets = mockPlantTweets.filter((tweet) => {
    const matchesSearch = 
      tweet.plantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tweet.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (emotionFilter === 'all') return matchesSearch;
    return matchesSearch && tweet.emotion === emotionFilter;
  });

  // Get emoji based on emotion
  const getEmotionEmoji = (emotion: string) => {
    switch (emotion) {
      case 'happy':
        return '😊';
      case 'angry':
        return '😡';
      case 'stressed':
        return '😰';
      case 'anxious':
        return '😟';
      default:
        return '🌱';
    }
  };

  // Get background color based on emotion
  const getEmotionBackground = (emotion: string) => {
    switch (emotion) {
      case 'happy':
        return 'bg-green-50';
      case 'angry':
        return 'bg-red-50';
      case 'stressed':
        return 'bg-yellow-50';
      case 'anxious':
        return 'bg-blue-50';
      default:
        return 'bg-white';
    }
  };

  // Format timestamp for display
  const getFormattedTime = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      return 'Unknown time';
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call to refresh data
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-textPrimary">Plant Tweets</h1>
        
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-initial">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search size={16} className="text-textSecondary" />
            </div>
            <input
              type="text"
              placeholder="Search tweets..."
              className="input-field w-full pl-10 sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <select
              className="input-field appearance-none pr-8"
              value={emotionFilter}
              onChange={(e) => setEmotionFilter(e.target.value)}
            >
              <option value="all">All Emotions</option>
              <option value="happy">Happy</option>
              <option value="angry">Angry</option>
              <option value="stressed">Stressed</option>
              <option value="anxious">Anxious</option>
            </select>
            <Filter size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary" />
          </div>
          
          <button
            className="flex items-center rounded-md border border-border bg-white px-3 py-2 text-textPrimary transition-colors duration-200 hover:bg-bgMain"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw size={16} className={`mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {filteredTweets.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-border bg-white p-8 text-center">
          <div className="mb-4 rounded-full bg-bgMain p-4">
            <Search size={24} className="text-textSecondary" />
          </div>
          <h3 className="mb-2 text-lg font-medium text-textPrimary">No tweets found</h3>
          <p className="text-textSecondary">
            {searchTerm || emotionFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Your plants are quiet at the moment'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTweets.map((tweet) => (
            <TweetCard 
              key={tweet.id} 
              tweet={tweet} 
              getEmotionEmoji={getEmotionEmoji}
              getEmotionBackground={getEmotionBackground}
              getFormattedTime={getFormattedTime}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Tweet card component
const TweetCard = ({ 
  tweet, 
  getEmotionEmoji, 
  getEmotionBackground, 
  getFormattedTime 
}: { 
  tweet: PlantTweet; 
  getEmotionEmoji: (emotion: string) => string;
  getEmotionBackground: (emotion: string) => string;
  getFormattedTime: (timestamp: string) => string;
}) => {
  const emotionEmoji = getEmotionEmoji(tweet.emotion);
  const emotionBackground = getEmotionBackground(tweet.emotion);
  
  return (
    <div className={`rounded-lg border border-border p-4 shadow-sm ${emotionBackground}`}>
      <div className="flex items-start">
        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
          {emotionEmoji}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-textPrimary">{tweet.plantName}</h3>
            <span className="text-xs text-textSecondary">
              {getFormattedTime(tweet.timestamp)}
            </span>
          </div>
          <p className="mt-2 text-textPrimary">{tweet.content}</p>
          <div className="mt-2 flex items-center">
            <span className="text-xs text-textSecondary">
              Emotion: <span className="font-medium capitalize">{tweet.emotion}</span>
            </span>
            <span className="mx-2 text-textSecondary">•</span>
            <span className="text-xs text-textSecondary">
              Location: {tweet.location.lat.toFixed(4)}, {tweet.location.lng.toFixed(4)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get emoji based on emotion
function getEmotionEmoji(emotion: string) {
  switch (emotion) {
    case 'happy':
      return '😊';
    case 'angry':
      return '😡';
    case 'stressed':
      return '😰';
    case 'anxious':
      return '😟';
    default:
      return '🌱';
  }
}

// Helper function to get background color based on emotion
function getEmotionBackground(emotion: string) {
  switch (emotion) {
    case 'happy':
      return 'bg-green-50';
    case 'angry':
      return 'bg-red-50';
    case 'stressed':
      return 'bg-yellow-50';
    case 'anxious':
      return 'bg-blue-50';
    default:
      return 'bg-white';
  }
}

export default TweetsPage; 