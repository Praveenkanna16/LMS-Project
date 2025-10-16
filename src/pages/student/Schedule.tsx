import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  Users,
  BookOpen,
  PlayCircle,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search
} from 'lucide-react';

const Schedule: React.FC = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');

  // Mock data - replace with actual API calls
  const scheduleData = [
    {
      id: 1,
      title: 'Mathematics Advanced - Session 15',
      subject: 'Mathematics',
      teacher: 'Dr. Sarah Johnson',
      type: 'live_class',
      startTime: '10:00',
      endTime: '11:30',
      date: '2024-03-18',
      dayOfWeek: 'Monday',
      duration: '90 min',
      status: 'upcoming',
      meetingUrl: '#',
      room: 'Virtual Room 101',
      description: 'Advanced calculus concepts and problem solving',
      batchName: 'Mathematics Advanced',
      studentsCount: 25
    },
    {
      id: 2,
      title: 'Physics Fundamentals - Lab Session',
      subject: 'Physics',
      teacher: 'Prof. Michael Chen',
      type: 'lab_session',
      startTime: '14:00',
      endTime: '16:00',
      date: '2024-03-18',
      dayOfWeek: 'Monday',
      duration: '120 min',
      status: 'upcoming',
      meetingUrl: '#',
      room: 'Virtual Lab 205',
      description: 'Mechanics experiment and data analysis',
      batchName: 'Physics Fundamentals',
      studentsCount: 20
    },
    {
      id: 3,
      title: 'Chemistry Basics - Quiz Review',
      subject: 'Chemistry',
      teacher: 'Dr. Emily Rodriguez',
      type: 'review_session',
      startTime: '15:00',
      endTime: '16:00',
      date: '2024-03-19',
      dayOfWeek: 'Tuesday',
      duration: '60 min',
      status: 'upcoming',
      meetingUrl: '#',
      room: 'Virtual Room 103',
      description: 'Review of organic chemistry concepts',
      batchName: 'Chemistry Basics',
      studentsCount: 18
    },
    {
      id: 4,
      title: 'Mathematics Advanced - Assignment Due',
      subject: 'Mathematics',
      teacher: 'Dr. Sarah Johnson',
      type: 'assignment_deadline',
      startTime: '23:59',
      endTime: '23:59',
      date: '2024-03-20',
      dayOfWeek: 'Wednesday',
      duration: 'N/A',
      status: 'upcoming',
      meetingUrl: '#',
      room: 'Online Submission',
      description: 'Advanced Integration Problems Set 3',
      batchName: 'Mathematics Advanced',
      studentsCount: 25
    },
    {
      id: 5,
      title: 'Physics Fundamentals - Session 12',
      subject: 'Physics',
      teacher: 'Prof. Michael Chen',
      type: 'live_class',
      startTime: '14:00',
      endTime: '15:30',
      date: '2024-03-19',
      dayOfWeek: 'Tuesday',
      duration: '90 min',
      status: 'upcoming',
      meetingUrl: '#',
      room: 'Virtual Room 201',
      description: 'Thermodynamics principles and calculations',
      batchName: 'Physics Fundamentals',
      studentsCount: 20
    },
    {
      id: 6,
      title: 'Chemistry Basics - Session 10',
      subject: 'Chemistry',
      teacher: 'Dr. Emily Rodriguez',
      type: 'live_class',
      startTime: '15:00',
      endTime: '16:30',
      date: '2024-03-20',
      dayOfWeek: 'Wednesday',
      duration: '90 min',
      status: 'upcoming',
      meetingUrl: '#',
      room: 'Virtual Room 103',
      description: 'Inorganic chemistry and periodic trends',
      batchName: 'Chemistry Basics',
      studentsCount: 18
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'ongoing': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'upcoming': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'cancelled': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'live_class': return <Video className="w-4 h-4" />;
      case 'lab_session': return <BookOpen className="w-4 h-4" />;
      case 'review_session': return <FileText className="w-4 h-4" />;
      case 'assignment_deadline': return <Clock className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'live_class': return 'text-blue-600';
      case 'lab_session': return 'text-green-600';
      case 'review_session': return 'text-purple-600';
      case 'assignment_deadline': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setSelectedDate(newDate);
  };

  // Filter schedule for selected date
  const daySchedule = scheduleData.filter(item => item.date === selectedDate.toISOString().split('T')[0]);
  const weekSchedule = scheduleData.filter(item => {
    const itemDate = new Date(item.date);
    const weekStart = new Date(selectedDate);
    weekStart.setDate(selectedDate.getDate() - selectedDate.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    return itemDate >= weekStart && itemDate <= weekEnd;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-800 rounded-2xl p-8 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Schedule</h1>
              <p className="text-indigo-100 text-lg">View your class timetable and upcoming sessions</p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <Calendar className="w-10 h-10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateDate('prev')}
            className="p-2"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="text-center min-w-[200px]">
            <p className="font-semibold text-lg text-gray-900">
              {formatDate(selectedDate)}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateDate('next')}
            className="p-2"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('week')}
            className={viewMode === 'week' ? 'bg-gradient-to-r from-green-500 to-blue-500' : ''}
          >
            Week View
          </Button>
          <Button
            variant={viewMode === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('month')}
            className={viewMode === 'month' ? 'bg-gradient-to-r from-green-500 to-blue-500' : ''}
          >
            Month View
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Schedule */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <Calendar className="w-5 h-5" />
                {viewMode === 'week' ? 'Weekly Schedule' : 'Monthly Schedule'}
              </CardTitle>
              <CardDescription>
                {viewMode === 'week'
                  ? `Schedule for week of ${formatDate(selectedDate)}`
                  : `Schedule for ${selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {(viewMode === 'week' ? weekSchedule : daySchedule).map((item) => (
                <div key={item.id} className={`rounded-xl p-4 border hover:shadow-md transition-all duration-200 ${getStatusColor(item.status)}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg bg-white flex items-center justify-center ${getTypeColor(item.type)}`}>
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <Badge variant="outline" className={`${getStatusColor(item.status)}`}>
                          {item.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          <span>{item.startTime} - {item.endTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3" />
                          <span>{item.studentsCount} students</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3" />
                          <span>{item.room}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-3 w-3" />
                          <span>{item.batchName}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.type === 'live_class' || item.type === 'lab_session' || item.type === 'review_session' ? (
                          <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700">
                            <PlayCircle className="h-4 w-4 mr-2" />
                            Join Session
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline">
                            <Clock className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Video className="h-4 w-4 mr-2" />
                          Add to Calendar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {(viewMode === 'week' ? weekSchedule : daySchedule).length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium mb-2">No classes scheduled</p>
                  <p className="text-sm">You have no classes for the selected period.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Quick Info */}
        <div className="space-y-6">
          {/* Today's Summary */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <Clock className="w-5 h-5" />
                Today's Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {daySchedule.length}
                </div>
                <p className="text-sm text-gray-600">Sessions Today</p>
              </div>

              <div className="space-y-2">
                {daySchedule.slice(0, 3).map((item) => (
                  <div key={item.id} className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-3 border border-blue-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm text-gray-900">{item.title.split(' - ')[0]}</p>
                        <p className="text-xs text-gray-600">{item.startTime} - {item.endTime}</p>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${getTypeColor(item.type)}`}></div>
                    </div>
                  </div>
                ))}
              </div>

              {daySchedule.length > 3 && (
                <p className="text-xs text-center text-gray-500">
                  +{daySchedule.length - 3} more sessions
                </p>
              )}
            </CardContent>
          </Card>

          {/* Study Reminders */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <BookOpen className="w-5 h-5" />
                Study Reminders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-3 border border-orange-100">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-orange-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm text-gray-900">Upcoming Deadline</p>
                    <p className="text-xs text-gray-600">Assignment due in 2 days</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-3 border border-indigo-100">
                <div className="flex items-start gap-2">
                  <Video className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm text-gray-900">Live Class Reminder</p>
                    <p className="text-xs text-gray-600">Physics class starts in 30 minutes</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
