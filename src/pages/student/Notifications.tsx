import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Bell,
  BellOff,
  Trash2,
  CheckCircle,
  Filter,
  Search,
  Calendar,
  Clock,
  Video,
  FileText,
  Users,
  Award,
  AlertCircle,
  Info,
  Settings,
  Volume2,
  VolumeX
} from 'lucide-react';

const Notifications: React.FC = () => {
  const { user } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Mock data - replace with actual API calls
  const notifications = [
    {
      id: 1,
      title: 'Live Class Starting Soon',
      message: 'Your Mathematics Advanced class starts in 15 minutes. Join now to not miss anything!',
      type: 'class_reminder',
      priority: 'high',
      read: false,
      timestamp: '2024-03-18T09:45:00Z',
      actionUrl: '/student/live-classes',
      actionText: 'Join Class',
      icon: Video,
      color: 'text-blue-600'
    },
    {
      id: 2,
      title: 'Assignment Due Tomorrow',
      message: 'Advanced Integration Problems Set 3 is due tomorrow at 11:59 PM. Don\'t forget to submit!',
      type: 'deadline_reminder',
      priority: 'high',
      read: false,
      timestamp: '2024-03-18T08:30:00Z',
      actionUrl: '/student/assessments',
      actionText: 'View Assignment',
      icon: FileText,
      color: 'text-orange-600'
    },
    {
      id: 3,
      title: 'New Study Material Available',
      message: 'Dr. Sarah Johnson has uploaded new lecture notes for tomorrow\'s class.',
      type: 'content_update',
      priority: 'medium',
      read: false,
      timestamp: '2024-03-17T16:20:00Z',
      actionUrl: '/student/recorded-content',
      actionText: 'View Content',
      icon: FileText,
      color: 'text-green-600'
    },
    {
      id: 4,
      title: 'Quiz Results Available',
      message: 'Your Chemistry Quiz #3 results are now available. You scored 92/100!',
      type: 'grade_update',
      priority: 'medium',
      read: true,
      timestamp: '2024-03-17T14:15:00Z',
      actionUrl: '/student/assessments',
      actionText: 'View Results',
      icon: Award,
      color: 'text-purple-600'
    },
    {
      id: 5,
      title: 'Class Recording Uploaded',
      message: 'The recording of today\'s Physics Fundamentals class has been uploaded and is now available.',
      type: 'content_update',
      priority: 'low',
      read: true,
      timestamp: '2024-03-17T12:00:00Z',
      actionUrl: '/student/recorded-content',
      actionText: 'Watch Recording',
      icon: Video,
      color: 'text-blue-600'
    },
    {
      id: 6,
      title: 'Study Group Invitation',
      message: 'You\'ve been invited to join a study group for Mathematics Advanced. 5 students are already participating.',
      type: 'social',
      priority: 'low',
      read: true,
      timestamp: '2024-03-16T18:45:00Z',
      actionUrl: '/student/batches',
      actionText: 'View Group',
      icon: Users,
      color: 'text-indigo-600'
    },
    {
      id: 7,
      title: 'Achievement Unlocked!',
      message: 'Congratulations! You\'ve earned the "Study Streak Master" achievement for completing 7 days in a row.',
      type: 'achievement',
      priority: 'low',
      read: true,
      timestamp: '2024-03-16T10:30:00Z',
      actionUrl: '/student/dashboard',
      actionText: 'View Achievement',
      icon: Award,
      color: 'text-yellow-600'
    },
    {
      id: 8,
      title: 'System Maintenance Notice',
      message: 'Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM. Platform may be temporarily unavailable.',
      type: 'system',
      priority: 'low',
      read: true,
      timestamp: '2024-03-15T16:00:00Z',
      actionUrl: null,
      actionText: null,
      icon: Settings,
      color: 'text-gray-600'
    }
  ];

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = selectedFilter === 'all' ||
                         (selectedFilter === 'unread' && !notification.read) ||
                         (selectedFilter === notification.type);

    return matchesSearch && matchesFilter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-orange-500 bg-orange-50';
      case 'low': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return <Badge className="bg-red-100 text-red-800 text-xs">High</Badge>;
      case 'medium': return <Badge className="bg-orange-100 text-orange-800 text-xs">Medium</Badge>;
      case 'low': return <Badge className="bg-blue-100 text-blue-800 text-xs">Low</Badge>;
      default: return null;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - notificationTime.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-800 rounded-2xl p-8 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Notifications</h1>
              <p className="text-indigo-100 text-lg">Stay updated with your learning activities and announcements</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <Bell className="w-10 h-10" />
                </div>
              </div>
              {unreadCount > 0 && (
                <Badge className="bg-white/20 text-white border-white/30">
                  {unreadCount} unread
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-2">
              {['all', 'unread', 'class_reminder', 'deadline_reminder', 'content_update', 'grade_update'].map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                  className={selectedFilter === filter ? 'bg-gradient-to-r from-blue-500 to-purple-500' : ''}
                >
                  {filter === 'all' ? 'All' :
                   filter === 'unread' ? 'Unread' :
                   filter.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={soundEnabled ? 'text-green-600' : 'text-gray-400'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
            <Button variant="outline" size="sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content - Notifications */}
        <div className="lg:col-span-3">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-600">
                <Bell className="w-5 h-5" />
                Recent Notifications
              </CardTitle>
              <CardDescription>
                {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''} found
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`rounded-xl p-4 border-l-4 hover:shadow-md transition-all duration-200 ${getPriorityColor(notification.priority)} ${!notification.read ? 'bg-indigo-50/30' : ''}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg bg-white flex items-center justify-center ${notification.color}`}>
                        <notification.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                              {notification.title}
                              {!notification.read && (
                                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                              )}
                            </h3>
                            <div className="flex items-center gap-2 mb-2">
                              {getPriorityBadge(notification.priority)}
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatTimeAgo(notification.timestamp)}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {!notification.read && (
                              <Button size="sm" variant="ghost" className="text-indigo-600 hover:text-indigo-800">
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                            )}
                            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-gray-600">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-3">{notification.message}</p>

                        {notification.actionText && (
                          <div className="flex items-center gap-2">
                            <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700">
                              {notification.actionText}
                            </Button>
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium mb-2">No notifications found</p>
                  <p className="text-sm">You're all caught up! New notifications will appear here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Notification Settings */}
        <div className="space-y-6">
          {/* Notification Summary */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <Info className="w-5 h-5" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {unreadCount}
                </div>
                <p className="text-sm text-gray-600">Unread Notifications</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center text-sm">
                <div>
                  <div className="text-lg font-bold text-indigo-600">
                    {notifications.filter(n => n.type === 'class_reminder').length}
                  </div>
                  <p className="text-gray-600">Class Reminders</p>
                </div>
                <div>
                  <div className="text-lg font-bold text-orange-600">
                    {notifications.filter(n => n.type === 'deadline_reminder').length}
                  </div>
                  <p className="text-gray-600">Deadlines</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-600">
                <Settings className="w-5 h-5" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm text-gray-900">Class Reminders</p>
                    <p className="text-xs text-gray-500">Get notified before classes start</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Bell className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm text-gray-900">Assignment Deadlines</p>
                    <p className="text-xs text-gray-500">Reminders for upcoming deadlines</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Bell className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm text-gray-900">Grade Updates</p>
                    <p className="text-xs text-gray-500">When new grades are posted</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Bell className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm text-gray-900">Study Materials</p>
                    <p className="text-xs text-gray-500">When new content is uploaded</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Bell className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm text-gray-900">Achievements</p>
                    <p className="text-xs text-gray-500">When you earn badges</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Bell className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <Button className="w-full" variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Advanced Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-indigo-600">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600" size="sm">
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark All as Read
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All Notifications
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Notification Preferences
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
