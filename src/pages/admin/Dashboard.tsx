import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Users,
  UserCheck,
  Video,
  BookOpen,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Plus
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  // Mock data - replace with actual API calls
  const stats = {
    totalUsers: 1247,
    totalTeachers: 45,
    totalStudents: 1202,
    activeClasses: 23,
    totalBatches: 67,
    monthlyRevenue: 15600,
    pendingPayouts: 3200,
    systemHealth: 'good'
  };

  const recentActivities = [
    {
      id: 1,
      type: 'user_registered',
      message: 'New teacher registration: Dr. Sarah Johnson',
      time: '2 minutes ago',
      status: 'info'
    },
    {
      id: 2,
      type: 'payment_completed',
      message: 'Payment received for Math Advanced batch - $450',
      time: '15 minutes ago',
      status: 'success'
    },
    {
      id: 3,
      type: 'payout_requested',
      message: 'Teacher payout requested: Prof. Michael - $1200',
      time: '1 hour ago',
      status: 'warning'
    },
    {
      id: 4,
      type: 'class_completed',
      message: 'Live class completed: Physics Fundamentals - Session 12',
      time: '2 hours ago',
      status: 'success'
    }
  ];

  const systemAlerts = [
    {
      id: 1,
      type: 'warning',
      message: 'Server load is high. Consider scaling resources.',
      time: '30 minutes ago'
    },
    {
      id: 2,
      type: 'error',
      message: 'Payment gateway experiencing intermittent issues.',
      time: '1 hour ago'
    }
  ];

  const topPerformingTeachers = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      subject: 'Mathematics',
      students: 45,
      rating: 4.9,
      earnings: 2400
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      subject: 'Physics',
      students: 38,
      rating: 4.8,
      earnings: 2100
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      subject: 'Chemistry',
      students: 32,
      rating: 4.9,
      earnings: 1900
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-slate-700 via-purple-700 to-slate-900 rounded-2xl p-8 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-slate-200 text-lg">Platform overview and management</p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-3xl">👑</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: 'Total Users',
            value: stats.totalUsers.toLocaleString(),
            subtitle: '+12% from last month',
            icon: Users,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
          },
          {
            title: 'Active Teachers',
            value: stats.totalTeachers.toString(),
            subtitle: '+3 new this month',
            icon: UserCheck,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-50'
          },
          {
            title: 'Live Classes',
            value: stats.activeClasses.toString(),
            subtitle: 'Currently active',
            icon: Video,
            color: 'text-slate-600',
            bgColor: 'bg-slate-50'
          },
          {
            title: 'Monthly Revenue',
            value: `$${stats.monthlyRevenue.toLocaleString()}`,
            subtitle: '+18% from last month',
            icon: DollarSign,
            color: 'text-violet-600',
            bgColor: 'bg-violet-50'
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
          {/* Top Performing Teachers */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-emerald-600">
                  <TrendingUp className="w-5 h-5" />
                  Top Performing Teachers
                </CardTitle>
                <CardDescription>Based on student count and ratings</CardDescription>
              </div>
              <Button className="bg-gradient-to-r from-emerald-600 to-slate-600 hover:from-emerald-700 hover:to-slate-700">
                <Plus className="h-4 w-4 mr-2" />
                View All Teachers
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformingTeachers.map((teacher) => (
                  <div key={teacher.id} className="bg-gradient-to-r from-emerald-50 to-slate-50 rounded-xl p-6 border border-emerald-100 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{teacher.name}</h4>
                          <Badge variant="outline" className="text-emerald-600 border-emerald-200">
                            {teacher.subject}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {teacher.students} students
                          </span>
                          <span className="flex items-center gap-1">
                            <span>⭐</span>
                            {teacher.rating}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-emerald-600">
                          ${teacher.earnings}
                        </div>
                        <p className="text-xs text-gray-500">This month</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Alerts */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <AlertCircle className="w-5 h-5" />
                System Alerts
              </CardTitle>
              <CardDescription>Important notifications requiring attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className={`rounded-xl p-4 border hover:shadow-md transition-all duration-200 ${
                  alert.type === 'error' ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-100' : 'bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-100'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      alert.type === 'error' ? 'bg-red-500' : 'bg-orange-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Fix
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <Activity className="w-5 h-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest platform activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="bg-gradient-to-r from-slate-50 to-purple-50 rounded-lg p-3 border border-slate-100">
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'success' ? 'bg-emerald-500' :
                      activity.status === 'warning' ? 'bg-amber-500' : 'bg-slate-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Pending Actions */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-600">
                <Clock className="w-5 h-5" />
                Pending Actions
              </CardTitle>
              <CardDescription>Items requiring attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm text-gray-900">Payout Requests</p>
                    <p className="text-xs text-gray-500">3 pending approvals</p>
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Review
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm text-gray-900">New Teacher Applications</p>
                    <p className="text-xs text-gray-500">2 awaiting review</p>
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Review
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm text-gray-900">Content Moderation</p>
                    <p className="text-xs text-gray-500">5 items flagged</p>
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Check
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-600">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Manage Users
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <DollarSign className="h-4 w-4 mr-2" />
                Financial Reports
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Activity className="h-4 w-4 mr-2" />
                System Health
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
