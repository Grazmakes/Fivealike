'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ExternalLink, Clock } from 'lucide-react';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

interface NewsCarouselProps {
  userGenres: string[];
}

export default function NewsCarousel({ userGenres }: NewsCarouselProps) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Map user genres to news categories
      const categoryMapping: { [key: string]: string } = {
        'Movies & TV': 'entertainment',
        'Music': 'entertainment', 
        'Books': 'general',
        'Games': 'technology',
        'Sports': 'sports',
        'Food': 'general',
        'Technology': 'technology',
        'Health': 'health',
        'Business': 'business',
        'Science': 'science'
      };

      // Get all relevant categories based on user's genres
      const userCategories = userGenres
        .map(genre => categoryMapping[genre])
        .filter(category => category) // Remove undefined values
        .filter((category, index, arr) => arr.indexOf(category) === index); // Remove duplicates

      // Use the most specific category or fallback to general
      const category = userCategories.length > 0 ? userCategories[0] : 'general';

      // Using mock data for reliable demo experience
      throw new Error('Using mock data for demo');

    } catch (error) {
      // Always use mock data based on user's genres
      // Recalculate category mapping for mock data
      const categoryMapping: { [key: string]: string } = {
        'Movies & TV': 'entertainment',
        'Music': 'entertainment', 
        'Books': 'general',
        'Games': 'technology',
        'Sports': 'sports',
        'Food': 'general',
        'Technology': 'technology',
        'Health': 'health',
        'Business': 'business',
        'Science': 'science'
      };
      
      const userCategories = userGenres
        .map(genre => categoryMapping[genre])
        .filter(category => category)
        .filter((category, index, arr) => arr.indexOf(category) === index);
      
      const category = userCategories.length > 0 ? userCategories[0] : 'general';
      
      const genreBasedMockData: { [key: string]: NewsArticle[] } = {
        'entertainment': [
          {
            title: "New Album 'Midnight Dreams' Takes the Charts by Storm",
            description: "The indie artist's latest release combines dreamy synthpop with introspective lyrics, earning critical acclaim from music reviewers worldwide.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
            publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            source: { name: "Music Today" }
          },
          {
            title: "Sci-Fi Blockbuster 'Quantum Horizons' Breaks Opening Weekend Records",
            description: "The highly anticipated space epic featuring stunning visual effects and an ensemble cast has exceeded all box office expectations.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1489599047837-8ef17b8b62fb?w=400&h=300&fit=crop",
            publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
            source: { name: "Entertainment Weekly" }
          },
          {
            title: "Grammy Awards 2024: Surprising Winners and Memorable Performances",
            description: "This year's Grammy ceremony featured unexpected upsets and show-stopping performances that had audiences talking all night.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop",
            publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
            source: { name: "Music Awards Daily" }
          },
          {
            title: "Streaming Wars: New Platform Launches with Exclusive Content",
            description: "A fresh streaming service enters the competitive market with original series and films from acclaimed directors.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
            publishedAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
            source: { name: "Streaming Report" }
          },
          {
            title: "Pop Icon Returns with Surprise Album Drop",
            description: "The chart-topping artist shocked fans with an unexpected midnight release, featuring collaborations with industry legends.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?w=400&h=300&fit=crop",
            publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
            source: { name: "Pop Culture Daily" }
          },
          {
            title: "Marvel's Next Phase Announced at Comic-Con",
            description: "Studio executives reveal ambitious plans for the next decade of superhero films, including surprising character returns.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            publishedAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
            source: { name: "Comic Con News" }
          },
          {
            title: "Broadway Show Wins Record Number of Tony Awards",
            description: "The groundbreaking musical takes home 12 Tonys, setting a new record for most wins by a single production.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
            publishedAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
            source: { name: "Theatre Weekly" }
          },
          {
            title: "Documentary Film Festival Showcases Climate Change Stories",
            description: "Independent filmmakers gather to premiere powerful documentaries highlighting environmental issues and solutions.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=300&fit=crop",
            publishedAt: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
            source: { name: "Documentary Today" }
          },
          {
            title: "Celebrity Chef Opens Plant-Based Restaurant Chain",
            description: "The renowned chef expands into sustainable dining with a new chain focused on innovative plant-based cuisine.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
            publishedAt: new Date(Date.now() - 34 * 60 * 60 * 1000).toISOString(),
            source: { name: "Culinary Arts" }
          },
          {
            title: "Fashion Week Highlights Sustainable Design Trends",
            description: "Designers showcase eco-friendly collections that prove sustainable fashion can be both stylish and accessible.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=300&fit=crop",
            publishedAt: new Date(Date.now() - 38 * 60 * 60 * 1000).toISOString(),
            source: { name: "Fashion Forward" }
          }
        ],
        'technology': [
          {
            title: "Revolutionary RPG 'Ethereal Realms' Redefines Gaming Experience",
            description: "The open-world fantasy game introduces groundbreaking AI-driven storytelling and immersive virtual reality integration.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=300&fit=crop",
            publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
            source: { name: "Gaming Central" }
          },
          {
            title: "AI Breakthrough: New Technology Reads Human Emotions",
            description: "Scientists have developed an advanced AI system that can accurately interpret human emotions through facial recognition and voice analysis.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
            publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
            source: { name: "Tech Review" }
          },
          {
            title: "Virtual Reality Gaming Reaches New Heights with Haptic Feedback",
            description: "The latest VR systems now include advanced haptic technology that lets players feel textures and impacts in virtual worlds.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=400&h=300&fit=crop",
            publishedAt: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(),
            source: { name: "VR World" }
          },
          {
            title: "Quantum Computing Breakthrough Could Revolutionize Cryptography",
            description: "Researchers achieve significant progress in quantum computing, potentially changing how we approach data security.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
            publishedAt: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(),
            source: { name: "Quantum Tech" }
          },
          {
            title: "Smartphone Innovation: Foldable Screens Get Major Upgrade",
            description: "New flexible display technology promises more durable foldable phones with improved battery life and processing power.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
            publishedAt: new Date(Date.now() - 19 * 60 * 60 * 1000).toISOString(),
            source: { name: "Mobile Tech" }
          },
          {
            title: "Electric Vehicle Charging Network Expands Globally",
            description: "Major charging infrastructure improvements make long-distance EV travel more convenient than ever before.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400&h=300&fit=crop",
            publishedAt: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
            source: { name: "EV Today" }
          },
          {
            title: "NASA's Mars Mission Discovers Evidence of Ancient Water",
            description: "The latest rover findings suggest Mars had extensive water systems billions of years ago, supporting theories about past life.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop",
            publishedAt: new Date(Date.now() - 27 * 60 * 60 * 1000).toISOString(),
            source: { name: "Space Exploration" }
          },
          {
            title: "5G Network Rollout Accelerates in Rural Areas",
            description: "Telecommunications companies make major investments to bring high-speed internet to previously underserved communities.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop",
            publishedAt: new Date(Date.now() - 31 * 60 * 60 * 1000).toISOString(),
            source: { name: "Telecom News" }
          },
          {
            title: "Cybersecurity Alert: New Protection Against Ransomware",
            description: "Security experts develop innovative defense systems to protect businesses and individuals from increasingly sophisticated attacks.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop",
            publishedAt: new Date(Date.now() - 35 * 60 * 60 * 1000).toISOString(),
            source: { name: "Cyber Security" }
          },
          {
            title: "Smart Home Technology Becomes More Affordable",
            description: "New budget-friendly smart devices make home automation accessible to more families, with easy installation and setup.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
            publishedAt: new Date(Date.now() - 39 * 60 * 60 * 1000).toISOString(),
            source: { name: "Smart Living" }
          }
        ],
        'general': [
          {
            title: "Mystery Novel 'The Silent Witness' Becomes Instant Bestseller",
            description: "Author Sarah Mitchell's psychological thriller has captivated readers with its intricate plot twists and compelling character development.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
            publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
            source: { name: "Literary Review" }
          },
          {
            title: "Local Community Garden Project Transforms Neighborhood",
            description: "Residents come together to create a beautiful shared space that provides fresh produce and strengthens community bonds.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
            publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
            source: { name: "Community News" }
          },
          {
            title: "Art Exhibition Showcases Local Talent and Cultural Heritage",
            description: "The annual art showcase brings together diverse artists to celebrate creativity and cultural expression in the community.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
            publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
            source: { name: "Arts Weekly" }
          },
          {
            title: "Historic Library Renovation Preserves Literary Heritage",
            description: "The century-old library gets a modern makeover while maintaining its historic charm and expanding its digital collection.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
            publishedAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
            source: { name: "Heritage News" }
          }
        ],
        'sports': [
          {
            title: "Underdog Team Wins Championship in Thrilling Final",
            description: "Against all odds, the rookie team defeated seasoned veterans in an exciting match that went into overtime.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop",
            publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            source: { name: "Sports Central" }
          },
          {
            title: "Olympic Preparations Begin as Athletes Train for Paris 2024",
            description: "Top athletes from around the world are ramping up their training as the Olympic Games approach.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1544720788-c2a66498e2c9?w=400&h=300&fit=crop",
            publishedAt: new Date(Date.now() - 13 * 60 * 60 * 1000).toISOString(),
            source: { name: "Olympic News" }
          },
          {
            title: "Youth Soccer League Sees Record Participation This Season",
            description: "Local youth soccer programs report highest enrollment ever as kids return to organized sports activities.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop",
            publishedAt: new Date(Date.now() - 17 * 60 * 60 * 1000).toISOString(),
            source: { name: "Youth Sports" }
          },
          {
            title: "Tennis Tournament Brings International Players to Local Courts",
            description: "The city hosts its annual tennis championship with players from over 20 countries competing.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=300&fit=crop",
            publishedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
            source: { name: "Tennis Today" }
          }
        ],
        'health': [
          {
            title: "New Study Reveals Benefits of 10-Minute Daily Walks",
            description: "Research shows that even short daily walks can significantly improve mental health and physical wellness.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1571019613914-85e2dd6312a4?w=400&h=300&fit=crop",
            publishedAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
            source: { name: "Health Today" }
          },
          {
            title: "Mental Health Awareness Week Promotes Community Wellbeing",
            description: "Local health organizations team up to provide resources and support for mental health awareness.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
            publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
            source: { name: "Wellness Weekly" }
          },
          {
            title: "Breakthrough in Nutrition Science Changes Diet Recommendations",
            description: "New research provides fresh insights into optimal nutrition for different age groups and lifestyles.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop",
            publishedAt: new Date(Date.now() - 21 * 60 * 60 * 1000).toISOString(),
            source: { name: "Nutrition Science" }
          },
          {
            title: "Local Fitness Centers Introduce Accessible Exercise Programs",
            description: "Community gyms launch new programs designed to make fitness accessible to people of all abilities.",
            url: "#",
            urlToImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
            publishedAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
            source: { name: "Fitness Today" }
          }
        ]
      };

      // Get mock articles based on the selected category
      const mockArticles = genreBasedMockData[category] || genreBasedMockData['general'];
      
      if (mockArticles && mockArticles.length > 0) {
        setArticles(mockArticles);
        setError(null); // Clear error since we have fallback data
      } else {
        setError('No news available at the moment');
        setArticles([]);
      }
    } finally {
      setLoading(false);
    }
  }, [userGenres]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const maxVisibleItems = 4;
  const maxIndex = Math.max(0, articles.length - maxVisibleItems);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const publishedDate = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Latest News</h3>
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 h-32 rounded-lg mb-2"></div>
              <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded mb-1"></div>
              <div className="bg-gray-200 dark:bg-gray-700 h-3 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || articles.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Latest News</h3>
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {error || 'No news available at the moment'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">Latest News</h3>
        <div className="flex space-x-2">
          <button
            onClick={prevSlide}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={16} className="text-gray-500 dark:text-gray-400" />
          </button>
          <button
            onClick={nextSlide}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentIndex >= maxIndex}
          >
            <ChevronRight size={16} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="flex gap-4 overflow-x-hidden">
          {articles.map((article, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-64"
              style={{
                transform: `translateX(-${currentIndex * (256 + 16)}px)`,
                transition: 'transform 0.3s ease-in-out'
              }}
            >
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer block"
              >
                <div className="relative overflow-hidden rounded-lg mb-2">
                  <Image
                    src={article.urlToImage}
                    alt={article.title}
                    width={300}
                    height={128}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink size={14} className="text-white" />
                  </div>
                </div>
                
                <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {article.title}
                </h4>
                
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {article.source.name}
                  </span>
                  <div className="flex items-center text-xs text-gray-400 dark:text-gray-500">
                    <Clock size={10} className="mr-1" />
                    {formatTimeAgo(article.publishedAt)}
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      {articles.length > maxVisibleItems && (
        <div className="flex justify-center mt-4 space-x-1">
          {[...Array(maxIndex + 1)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentIndex === index
                  ? 'bg-green-600'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}