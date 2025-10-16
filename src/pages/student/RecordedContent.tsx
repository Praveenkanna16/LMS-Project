import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  PlayCircle,
  Search,
  Filter,
  Clock,
  Eye,
  Download,
  ThumbsUp,
  MessageSquare,
  Share2,
  Bookmark,
  BookmarkCheck,
  Calendar,
  BookOpen,
  Video,
  FileText,
  Image,
  Music
} from 'lucide-react';

const RecordedContent: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');

  // Mock data - replace with actual API calls
  const recordedContent = [
    {
      id: 1,
      title: 'Advanced Calculus - Integration Techniques',
      subject: 'Mathematics',
      teacher: 'Dr. Sarah Johnson',
      duration: '45:32',
      views: 1250,
      likes: 89,
      comments: 12,
      uploadDate: '2024-03-15',
      thumbnail: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=300&h=200&fit=crop',
      description: 'Comprehensive guide to advanced integration techniques including substitution, integration by parts, and partial fractions.',
      category: 'lecture',
      tags: ['calculus', 'integration', 'advanced'],
      fileSize: '245 MB',
      downloadUrl: '#',
      watchUrl: '#',
      isBookmarked: true,
      transcript: 'Available',
      notes: 'Available'
    },
    {
      id: 2,
      title: 'Physics Lab - Mechanics Experiment',
      subject: 'Physics',
      teacher: 'Prof. Michael Chen',
      duration: '32:18',
      views: 890,
      likes: 67,
      comments: 8,
      uploadDate: '2024-03-14',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=200&fit=crop',
      description: 'Step-by-step demonstration of mechanics experiment with data analysis and conclusion.',
      category: 'lab_demo',
      tags: ['physics', 'mechanics', 'experiment'],
      fileSize: '180 MB',
      downloadUrl: '#',
      watchUrl: '#',
      isBookmarked: false,
      transcript: 'Available',
      notes: 'Not Available'
    },
    {
      id: 3,
      title: 'Organic Chemistry - Reaction Mechanisms',
      subject: 'Chemistry',
      teacher: 'Dr. Emily Rodriguez',
      duration: '38:45',
      views: 756,
      likes: 54,
      comments: 15,
      uploadDate: '2024-03-13',
      thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=300&h=200&fit=crop',
      description: 'Detailed explanation of organic reaction mechanisms with examples and practice problems.',
      category: 'lecture',
      tags: ['chemistry', 'organic', 'mechanisms'],
      fileSize: '210 MB',
      downloadUrl: '#',
      watchUrl: '#',
      isBookmarked: true,
      transcript: 'Available',
      notes: 'Available'
    },
    {
      id: 4,
      title: 'Mathematics - Problem Solving Session',
      subject: 'Mathematics',
      teacher: 'Dr. Sarah Johnson',
      duration: '52:12',
      views: 1456,
      likes: 123,
      comments: 28,
      uploadDate: '2024-03-12',
      thumbnail: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=300&h=200&fit=crop',
      description: 'Interactive problem solving session with challenging problems and detailed solutions.',
      category: 'problem_solving',
      tags: ['mathematics', 'problems', 'solutions'],
      fileSize: '320 MB',
      downloadUrl: '#',
      watchUrl: '#',
      isBookmarked: false,
      transcript: 'Available',
      notes: 'Available'
    },
    {
      id: 5,
      title: 'Chemistry Lab - Titration Techniques',
      subject: 'Chemistry',
      teacher: 'Dr. Emily Rodriguez',
      duration: '28:33',
      views: 634,
      likes: 41,
      comments: 6,
      uploadDate: '2024-03-11',
      thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=300&h=200&fit=crop',
      description: 'Practical demonstration of titration techniques with safety protocols and data interpretation.',
      category: 'lab_demo',
      tags: ['chemistry', 'titration', 'lab'],
      fileSize: '165 MB',
      downloadUrl: '#',
      watchUrl: '#',
      isBookmarked: true,
      transcript: 'Available',
      notes: 'Not Available'
    },
    {
      id: 6,
      title: 'Physics - Thermodynamics Principles',
      subject: 'Physics',
      teacher: 'Prof. Michael Chen',
      duration: '41:27',
      views: 987,
      likes: 78,
      comments: 19,
      uploadDate: '2024-03-10',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=200&fit=crop',
      description: 'Fundamental concepts of thermodynamics with real-world applications and examples.',
      category: 'lecture',
      tags: ['physics', 'thermodynamics', 'principles'],
      fileSize: '280 MB',
      downloadUrl: '#',
      watchUrl: '#',
      isBookmarked: false,
      transcript: 'Available',
      notes: 'Available'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Content', count: recordedContent.length },
    { id: 'lecture', label: 'Lectures', count: recordedContent.filter(c => c.category === 'lecture').length },
    { id: 'lab_demo', label: 'Lab Demos', count: recordedContent.filter(c => c.category === 'lab_demo').length },
    { id: 'problem_solving', label: 'Problem Solving', count: recordedContent.filter(c => c.category === 'problem_solving').length }
  ];

  const subjects = [
    { id: 'all', label: 'All Subjects' },
    { id: 'Mathematics', label: 'Mathematics' },
    { id: 'Physics', label: 'Physics' },
    { id: 'Chemistry', label: 'Chemistry' }
  ];

  const filteredContent = recordedContent.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || content.category === selectedCategory;
    const matchesSubject = selectedSubject === 'all' || content.subject === selectedSubject;

    return matchesSearch && matchesCategory && matchesSubject;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'lecture': return <Video className="w-4 h-4" />;
      case 'lab_demo': return <BookOpen className="w-4 h-4" />;
      case 'problem_solving': return <FileText className="w-4 h-4" />;
      default: return <Video className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'lecture': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'lab_demo': return 'text-green-600 bg-green-50 border-green-200';
      case 'problem_solving': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-800 rounded-2xl p-8 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Recorded Content</h1>
              <p className="text-indigo-100 text-lg">Access your recorded lectures, lab demos, and study materials</p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <PlayCircle className="w-10 h-10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search videos, topics, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>{subject.label}</option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.label} ({category.count})</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content - Video Grid */}
        <div className="lg:col-span-3">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-600">
                <PlayCircle className="w-5 h-5" />
                Video Library
              </CardTitle>
              <CardDescription>
                {filteredContent.length} video{filteredContent.length !== 1 ? 's' : ''} found
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredContent.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredContent.map((video) => (
                    <div key={video.id} className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 overflow-hidden">
                      {/* Thumbnail */}
                      <div className="relative">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                          <Button size="sm" className="bg-white/90 text-gray-900 hover:bg-white">
                            <PlayCircle className="w-5 h-5 mr-2" />
                            Watch Now
                          </Button>
                        </div>
                        <div className="absolute top-2 right-2">
                          <Badge variant="outline" className="bg-black/70 text-white border-0">
                            {video.duration}
                          </Badge>
                        </div>
                        <div className="absolute top-2 left-2">
                          <Badge className={`${getCategoryColor(video.category)}`}>
                            {getCategoryIcon(video.category)}
                            <span className="ml-1 capitalize">{video.category.replace('_', ' ')}</span>
                          </Badge>
                        </div>
                      </div>

                      {/* Content Info */}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">by {video.teacher}</p>
                        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{video.description}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {video.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {video.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-3 h-3" />
                              {video.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="w-3 h-3" />
                              {video.comments}
                            </span>
                          </div>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(video.uploadDate).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Additional Resources */}
                        <div className="flex items-center gap-2 mb-3 text-xs text-gray-600">
                          <span className={`px-2 py-1 rounded ${video.transcript === 'Available' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-500'}`}>
                            Transcript: {video.transcript}
                          </span>
                          <span className={`px-2 py-1 rounded ${video.notes === 'Available' ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-500'}`}>
                            Notes: {video.notes}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700">
                              <PlayCircle className="w-4 h-4 mr-2" />
                              Watch
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button size="sm" variant="ghost">
                              <Share2 className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              {video.isBookmarked ? (
                                <BookmarkCheck className="w-4 h-4 text-purple-600" />
                              ) : (
                                <Bookmark className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <PlayCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium mb-2">No videos found</p>
                  <p className="text-sm">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Categories & Quick Stats */}
        <div className="space-y-6">
          {/* Categories */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-600">
                <Filter className="w-5 h-5" />
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{category.label}</span>
                    <Badge variant="outline" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-green-600">Study Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {recordedContent.length}
                </div>
                <p className="text-sm text-gray-600">Total Videos</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-blue-600">
                    {Math.floor(recordedContent.reduce((acc, video) => acc + parseInt(video.duration.split(':')[0]) * 60 + parseInt(video.duration.split(':')[1]), 0) / 60)}h
                  </div>
                  <p className="text-xs text-gray-600">Watch Time</p>
                </div>
                <div>
                  <div className="text-xl font-bold text-green-600">
                    {recordedContent.filter(v => v.isBookmarked).length}
                  </div>
                  <p className="text-xs text-gray-600">Bookmarked</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recently Watched */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <Clock className="w-5 h-5" />
                Recently Watched
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recordedContent.slice(0, 3).map((video) => (
                <div key={video.id} className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-3 border border-orange-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-12 h-8 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900 line-clamp-1">{video.title}</p>
                      <p className="text-xs text-gray-500">{video.duration}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <PlayCircle className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecordedContent;
