import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Video,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  Plus,
  Settings,
  FileText,
  Eye,
  PlayCircle
} from 'lucide-react';

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data - replace with actual API calls
  const todayClasses = [
    {
      id: 1,
      batchName: 'Math Advanced',
      subject: 'Mathematics',
      time: '10:00 AM - 11:00 AM',
      studentsCount: 25,
      status: 'upcoming'
    },
    {
      id: 2,
      batchName: 'Physics Fundamentals',
      subject: 'Physics',
      time: '2:00 PM - 3:00 PM',
      studentsCount: 20,
      status: 'upcoming'
    }
  ];

  const recentEarnings = {
    thisMonth: 4500,
    lastMonth: 3800,
    total: 15600,
    pendingPayouts: 1200
  };

  const myBatches = [
    {
      id: 1,
      name: 'Math Advanced',
      subject: 'Mathematics',
      studentsCount: 25,
      schedule: 'Mon, Wed, Fri 10:00 AM',
      nextClass: 'Today 10:00 AM',
      status: 'active'
    },
    {
      id: 2,
      name: 'Physics Fundamentals',
      subject: 'Physics',
      studentsCount: 20,
      schedule: 'Tue, Thu 2:00 PM',
      nextClass: 'Today 2:00 PM',
      status: 'active'
    },
    {
      id: 3,
      name: 'Chemistry Basics',
      subject: 'Chemistry',
      studentsCount: 15,
      schedule: 'Mon, Wed 3:00 PM',
      nextClass: 'Tomorrow 3:00 PM',
      status: 'active'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'class_completed',
      title: 'Math Advanced - Session 12',
      time: '2 hours ago',
      earnings: 150
    },
    {
      id: 2,
      type: 'new_enrollment',
      title: 'New student joined Physics batch',
      time: '1 day ago',
      earnings: 0
    },
    {
      id: 3,
      type: 'class_completed',
      title: 'Physics Fundamentals - Session 8',
      time: '2 days ago',
      earnings: 120
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 rounded-2xl p-8 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
              <p className="text-emerald-100 text-lg">Ready to inspire your students today?</p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-3xl">🎯</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: 'Total Students',
            value: myBatches.reduce((acc, batch) => acc + batch.studentsCount, 0).toString(),
            subtitle: 'Across all batches',
            icon: Users,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
          },
          {
            title: 'This Month',
            value: `$${recentEarnings.thisMonth}`,
            subtitle: 'Earnings',
            icon: DollarSign,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-50'
          },
          {
            title: 'Pending Payout',
            value: `$${recentEarnings.pendingPayouts}`,
            subtitle: 'Available',
            icon: TrendingUp,
            color: 'text-amber-600',
            bgColor: 'bg-amber-50'
          },
          {
            title: 'Active Batches',
            value: myBatches.length.toString(),
            subtitle: 'Currently teaching',
            icon: Video,
            color: 'text-teal-600',
            bgColor: 'bg-teal-50'
          }
        ].map((stat, index) => (
          <Card key={index} className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.subtitle}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Today's Classes */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-600">
                <Video className="w-5 h-5" />
                Today's Classes
              </CardTitle>
              <CardDescription>Your scheduled classes for today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {todayClasses.map((cls) => (
                <div key={cls.id} className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{cls.batchName}</h4>
                        <Badge variant="outline" className="text-emerald-600 border-emerald-200">
                          {cls.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{cls.subject}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {cls.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {cls.studentsCount} students
                        </span>
                      </div>
                    </div>
                    <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Start Class
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          {/* My Batches */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-violet-600">
                  <Users className="w-5 h-5" />
                  My Batches
                </CardTitle>
                <CardDescription>Manage your active batches</CardDescription>
              </div>
              <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Create New Batch
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myBatches.map((batch) => (
                  <div key={batch.id} className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-6 border border-violet-100 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{batch.name}</h4>
                          <Badge variant={batch.status === 'active' ? 'default' : 'secondary'}>
                            {batch.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{batch.subject}</p>
                        <p className="text-sm text-gray-600 mb-1">{batch.schedule}</p>
                        <p className="text-xs text-gray-500">Next class: {batch.nextClass}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          {batch.studentsCount} students
                        </span>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <FileText className="w-5 h-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your recent teaching activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-3 border border-emerald-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'class_completed' ? 'bg-emerald-500' : 'bg-teal-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    {activity.earnings > 0 && (
                      <div className="text-sm font-medium text-emerald-600">
                        +${activity.earnings}
                      </div>
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
                <Video className="h-4 w-4 mr-2" />
                Start Live Class
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create Batch
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Earnings
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
