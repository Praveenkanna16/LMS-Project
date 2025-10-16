import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Video,
  BookOpen,
  Calendar,
  Clock,
  Users,
  PlayCircle,
  FileText,
  TrendingUp,
  Star,
  Award,
  Target,
  Zap,
  CheckCircle,
  AlertCircle,
  Trophy,
  Flame,
  BookMarked,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data - replace with actual API calls
  const upcomingClasses = [
    {
      id: 1,
      subject: 'Mathematics',
      teacher: 'Dr. Smith',
      time: '10:00 AM',
      date: 'Today',
      duration: '60 min',
      status: 'upcoming',
      batchName: 'Math Advanced',
      meetingUrl: '#'
    },
    {
      id: 2,
      subject: 'Physics',
      teacher: 'Prof. Johnson',
      time: '2:00 PM',
      date: 'Today',
      duration: '45 min',
      status: 'upcoming',
      batchName: 'Physics Fundamentals',
      meetingUrl: '#'
    }
  ];

  const enrolledCourses = [
    {
      id: 1,
      name: 'React Development Masterclass',
      subject: 'Web Development',
      progress: 75,
      totalLessons: 45,
      completedLessons: 34,
      nextLesson: 'Advanced Hooks',
      instructor: 'Sarah Johnson',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=120&fit=crop'
    },
    {
      id: 2,
      name: 'Python for Data Science',
      subject: 'Data Science',
      progress: 45,
      totalLessons: 62,
      completedLessons: 28,
      nextLesson: 'Machine Learning Basics',
      instructor: 'Michael Chen',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=120&fit=crop'
    },
    {
      id: 3,
      name: 'UI/UX Design Fundamentals',
      subject: 'Design',
      progress: 90,
      totalLessons: 28,
      completedLessons: 25,
      nextLesson: 'Design Systems',
      instructor: 'Emily Rodriguez',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=120&fit=crop'
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'First Course Completed',
      description: 'Completed your first online course',
      icon: Trophy,
      earned: true,
      rarity: 'common'
    },
    {
      id: 2,
      title: 'Study Streak Master',
      description: '7-day learning streak',
      icon: Flame,
      earned: true,
      rarity: 'uncommon'
    },
    {
      id: 3,
      title: 'Quiz Champion',
      description: 'Score 100% on 5 quizzes',
      icon: Star,
      earned: false,
      rarity: 'rare'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'lesson_completed',
      title: 'Completed: React Hooks Deep Dive',
      course: 'React Development Masterclass',
      time: '2 hours ago',
      points: 50
    },
    {
      id: 2,
      type: 'quiz_passed',
      title: 'Passed: JavaScript Fundamentals Quiz',
      course: 'React Development Masterclass',
      time: '1 day ago',
      points: 25
    },
    {
      id: 3,
      type: 'course_enrolled',
      title: 'Enrolled in: UI/UX Design Fundamentals',
      course: 'Design',
      time: '3 days ago',
      points: 0
    }
  ];

  const stats = [
    {
      title: 'Study Streak',
      value: '12',
      subtitle: 'Days in a row',
      icon: Flame,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      trend: '+2'
    },
    {
      title: 'Courses Completed',
      value: '3',
      subtitle: 'This month',
      icon: Award,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      trend: '+1'
    },
    {
      title: 'Learning Points',
      value: '2,847',
      subtitle: 'Total earned',
      icon: Star,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      trend: '+156'
    },
    {
      title: 'Study Time',
      value: '24h',
      subtitle: 'This week',
      icon: Clock,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      trend: '+4h'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-800 rounded-2xl p-8 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
              <p className="text-indigo-100 text-lg">Ready to continue your learning journey?</p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-3xl">🚀</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.subtitle}</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <span className="text-xs text-green-600 font-medium">{stat.trend}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Courses & Classes */}
        <div className="lg:col-span-2 space-y-8">
          {/* Upcoming Classes */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-600">
                <Video className="w-5 h-5" />
                Upcoming Live Classes
              </CardTitle>
              <CardDescription>Join your scheduled live sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingClasses.map((cls) => (
                <div key={cls.id} className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-100 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{cls.subject}</h4>
                        <Badge variant="outline" className="text-indigo-600 border-indigo-200">
                          {cls.batchName}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">with {cls.teacher}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {cls.time} • {cls.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {cls.date}
                        </span>
                      </div>
                    </div>
                    <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Join Class
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* My Courses */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-600">
                <BookOpen className="w-5 h-5" />
                My Courses
              </CardTitle>
              <CardDescription>Continue your learning journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="bg-gradient-to-r from-emerald-50 to-indigo-50 rounded-xl p-6 border border-emerald-100 hover:shadow-md transition-all duration-200">
                  <div className="flex gap-4">
                    <img
                      src={course.thumbnail}
                      alt={course.name}
                      className="w-20 h-12 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{course.name}</h4>
                          <p className="text-sm text-gray-600">by {course.instructor}</p>
                        </div>
                        <Badge variant="outline" className="text-emerald-600 border-emerald-200">
                          {course.progress}% Complete
                        </Badge>
                      </div>

                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                          <span>Progress: {course.completedLessons}/{course.totalLessons} lessons</span>
                          <span>Next: {course.nextLesson}</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>

                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Play className="h-4 w-4 mr-2" />
                          Continue
                        </Button>
                        <Button size="sm" variant="outline">
                          <BookMarked className="h-4 w-4 mr-2" />
                          Notes
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Activities & Achievements */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-violet-600">
                <FileText className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="bg-gradient-to-r from-violet-50 to-indigo-50 rounded-lg p-3 border border-violet-100">
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'lesson_completed' ? 'bg-emerald-500' :
                      activity.type === 'quiz_passed' ? 'bg-blue-500' : 'bg-violet-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500 mb-1">{activity.course}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">{activity.time}</p>
                        {activity.points > 0 && (
                          <Badge variant="outline" className="text-xs">
                            +{activity.points} XP
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-600">
                <Trophy className="w-5 h-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement) => (
                <div key={achievement.id} className={`bg-gradient-to-r ${achievement.earned ? 'from-amber-50 to-orange-50 border-amber-200' : 'from-gray-50 to-gray-100 border-gray-200'} rounded-lg p-3 border`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${achievement.earned ? 'bg-amber-500' : 'bg-gray-400'} rounded-lg flex items-center justify-center`}>
                      {achievement.earned ? (
                        <achievement.icon className="w-5 h-5 text-white" />
                      ) : (
                        <div className="w-5 h-5 bg-white/50 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium text-sm ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                        {achievement.title}
                      </p>
                      <p className={`text-xs ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.earned && (
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-600">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                Browse Courses
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Video className="h-4 w-4 mr-2" />
                View Recordings
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Award className="h-4 w-4 mr-2" />
                My Certificates
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Target className="h-4 w-4 mr-2" />
                Learning Goals
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
