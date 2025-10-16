import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  Clock,
  Calendar,
  BookOpen,
  Video,
  FileText,
  Star,
  TrendingUp,
  Award,
  PlayCircle,
  Eye,
  MessageSquare,
  Bell
} from 'lucide-react';

const MyBatches: React.FC = () => {
  const { user } = useAuth();

  const enrolledBatches = [
    {
      id: 1,
      name: 'Mathematics Advanced',
      subject: 'Mathematics',
      teacher: 'Dr. Sarah Johnson',
      progress: 75,
      totalLessons: 45,
      completedLessons: 34,
      nextClass: 'Tomorrow 10:00 AM',
      schedule: 'Mon, Wed, Fri 10:00 AM',
      status: 'active',
      studentsCount: 25,
      rating: 4.8,
      thumbnail: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=200&h=120&fit=crop',
      batchCode: 'MATH-ADV-2024'
    },
    {
      id: 2,
      name: 'Physics Fundamentals',
      subject: 'Physics',
      teacher: 'Prof. Michael Chen',
      progress: 60,
      totalLessons: 38,
      completedLessons: 23,
      nextClass: 'Today 2:00 PM',
      schedule: 'Tue, Thu 2:00 PM',
      status: 'active',
      studentsCount: 20,
      rating: 4.6,
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=200&h=120&fit=crop',
      batchCode: 'PHYS-FUN-2024'
    },
    {
      id: 3,
      name: 'Chemistry Basics',
      subject: 'Chemistry',
      teacher: 'Dr. Emily Rodriguez',
      progress: 90,
      totalLessons: 32,
      completedLessons: 29,
      nextClass: 'Wednesday 3:00 PM',
      schedule: 'Mon, Wed, Fri 3:00 PM',
      status: 'active',
      studentsCount: 18,
      rating: 4.9,
      thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=200&h=120&fit=crop',
      batchCode: 'CHEM-BAS-2024'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'class_completed',
      title: 'Mathematics - Session 12: Advanced Calculus',
      time: '2 hours ago',
      batchName: 'Mathematics Advanced'
    },
    {
      id: 2,
      type: 'assignment_submitted',
      title: 'Physics Lab Report - Experiment 5',
      time: '1 day ago',
      batchName: 'Physics Fundamentals'
    },
    {
      id: 3,
      type: 'quiz_completed',
      title: 'Chemistry Quiz #3 - Organic Chemistry',
      time: '2 days ago',
      batchName: 'Chemistry Basics'
    }
  ];

  const upcomingAssignments = [
    {
      id: 1,
      title: 'Advanced Integration Problems',
      subject: 'Mathematics',
      dueDate: '2024-03-20',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Physics Lab Report - Mechanics',
      subject: 'Physics',
      dueDate: '2024-03-22',
      priority: 'medium'
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6">
      <div className="mb-8">
        <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-800 rounded-2xl p-8 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Batches</h1>
              <p className="text-indigo-100 text-lg">Track your learning progress across all enrolled batches</p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Users className="w-10 h-10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-600">
                <Users className="w-5 h-5" />
                My Enrolled Batches
              </CardTitle>
              <CardDescription>Your active learning batches and progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {enrolledBatches.map((batch) => (
                <div key={batch.id} className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-100 hover:shadow-md transition-all duration-200">
                  <div className="flex gap-4">
                    <img
                      src={batch.thumbnail}
                      alt={batch.name}
                      className="w-24 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-gray-900">{batch.name}</h3>
                            <Badge variant="outline" className="text-indigo-600 border-indigo-200">
                              {batch.batchCode}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">by {batch.teacher}</p>
                        </div>
                        <Badge variant={batch.status === 'active' ? 'default' : 'secondary'}>
                          {batch.status}
                        </Badge>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                          <span>Progress: {batch.completedLessons}/{batch.totalLessons} lessons</span>
                          <span className="font-medium">{batch.progress}% Complete</span>
                        </div>
                        <Progress value={batch.progress} className="h-2 mb-3" />

                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Next: {batch.nextClass}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{batch.schedule}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700">
                          <Video className="h-4 w-4 mr-2" />
                          Join Class
                        </Button>
                        <Button size="sm" variant="outline">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Study Materials
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Discussion
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4 mr-2" />
                          Assignments
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-violet-600">
                <Bell className="w-5 h-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest learning activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="bg-gradient-to-r from-violet-50 to-indigo-50 rounded-lg p-3 border border-violet-100">
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'class_completed' ? 'bg-emerald-500' :
                      activity.type === 'assignment_submitted' ? 'bg-blue-500' : 'bg-violet-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500 mb-1">{activity.batchName}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-600">
                <FileText className="w-5 h-5" />
                Upcoming Assignments
              </CardTitle>
              <CardDescription>Deadlines to keep track of</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingAssignments.map((assignment) => (
                <div key={assignment.id} className={`rounded-lg p-3 border ${getPriorityColor(assignment.priority)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900 mb-1">{assignment.title}</p>
                      <p className="text-xs text-gray-600 mb-1">{assignment.subject}</p>
                      <p className="text-xs text-gray-500">Due: {formatDate(assignment.dueDate)}</p>
                    </div>
                    <Badge variant="outline" className={`text-xs ${assignment.priority === 'high' ? 'border-red-300 text-red-600' : assignment.priority === 'medium' ? 'border-orange-300 text-orange-600' : 'border-blue-300 text-blue-600'}`}>
                      {assignment.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-600">
                <TrendingUp className="w-5 h-5" />
                My Learning Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {enrolledBatches.reduce((acc, batch) => acc + batch.completedLessons, 0)}
                </div>
                <p className="text-sm text-gray-600">Lessons Completed</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-indigo-600">
                    {enrolledBatches.length}
                  </div>
                  <p className="text-xs text-gray-600">Active Batches</p>
                </div>
                <div>
                  <div className="text-xl font-bold text-emerald-600">
                    {Math.round(enrolledBatches.reduce((acc, batch) => acc + batch.progress, 0) / enrolledBatches.length)}%
                  </div>
                  <p className="text-xs text-gray-600">Avg Progress</p>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">This Week's Goal</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Study Sessions</span>
                  <span className="font-medium">12/15</span>
                </div>
                <Progress value={80} className="h-2 mt-1" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyBatches;
