import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  FileText,
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
  PlayCircle,
  Eye,
  Download,
  TrendingUp,
  Award,
  BookOpen,
  Target,
  Star,
  Filter,
  Search
} from 'lucide-react';

const Assessments: React.FC = () => {
  const { user } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with actual API calls
  const assignments = [
    {
      id: 1,
      title: 'Advanced Integration Problems Set 3',
      subject: 'Mathematics',
      type: 'assignment',
      status: 'pending',
      dueDate: '2024-03-20T23:59:59Z',
      submittedDate: null,
      points: 100,
      maxPoints: 100,
      description: 'Solve the advanced integration problems using substitution, integration by parts, and partial fractions.',
      instructions: 'Submit your solutions as a PDF file. Show all work and include explanations.',
      attachments: ['problems.pdf', 'hints.txt'],
      submissions: 0,
      totalStudents: 25,
      averageScore: null
    },
    {
      id: 2,
      title: 'Physics Lab Report - Mechanics Experiment',
      subject: 'Physics',
      type: 'lab_report',
      status: 'submitted',
      dueDate: '2024-03-18T23:59:59Z',
      submittedDate: '2024-03-18T14:30:00Z',
      points: 85,
      maxPoints: 100,
      description: 'Write a comprehensive lab report for the mechanics experiment conducted in class.',
      instructions: 'Include hypothesis, methodology, data analysis, and conclusions.',
      attachments: ['lab_manual.pdf', 'data_sheet.xlsx'],
      submissions: 1,
      totalStudents: 20,
      averageScore: 78
    },
    {
      id: 3,
      title: 'Chemistry Quiz #3 - Organic Reactions',
      subject: 'Chemistry',
      type: 'quiz',
      status: 'completed',
      dueDate: '2024-03-15T23:59:59Z',
      submittedDate: '2024-03-15T16:45:00Z',
      points: 92,
      maxPoints: 100,
      description: 'Multiple choice quiz covering organic reaction mechanisms and synthesis.',
      instructions: '20 questions, 45 minutes time limit.',
      attachments: [],
      submissions: 1,
      totalStudents: 18,
      averageScore: 84
    },
    {
      id: 4,
      title: 'Mathematics Mid-term Exam',
      subject: 'Mathematics',
      type: 'exam',
      status: 'graded',
      dueDate: '2024-03-10T23:59:59Z',
      submittedDate: '2024-03-10T15:20:00Z',
      points: 88,
      maxPoints: 100,
      description: 'Comprehensive mid-term examination covering calculus, algebra, and geometry.',
      instructions: '3 hours duration, closed book examination.',
      attachments: [],
      submissions: 1,
      totalStudents: 25,
      averageScore: 82
    }
  ];

  const upcomingQuizzes = [
    {
      id: 1,
      title: 'Physics Thermodynamics Quiz',
      subject: 'Physics',
      date: '2024-03-22',
      time: '10:00 AM',
      duration: '45 min',
      questions: 15
    },
    {
      id: 2,
      title: 'Chemistry Inorganic Compounds',
      subject: 'Chemistry',
      date: '2024-03-25',
      time: '2:00 PM',
      duration: '60 min',
      questions: 20
    }
  ];

  const recentScores = [
    { subject: 'Mathematics', score: 88, maxScore: 100, grade: 'A-', trend: 'up' },
    { subject: 'Physics', score: 85, maxScore: 100, grade: 'B+', trend: 'up' },
    { subject: 'Chemistry', score: 92, maxScore: 100, grade: 'A', trend: 'stable' }
  ];

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = selectedFilter === 'all' ||
                         (selectedFilter === 'pending' && assignment.status === 'pending') ||
                         (selectedFilter === 'submitted' && assignment.status === 'submitted') ||
                         (selectedFilter === 'graded' && assignment.status === 'graded');

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'submitted': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'graded': return 'text-green-600 bg-green-50 border-green-200';
      case 'overdue': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'assignment': return <FileText className="w-4 h-4" />;
      case 'quiz': return <Target className="w-4 h-4" />;
      case 'exam': return <BookOpen className="w-4 h-4" />;
      case 'lab_report': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-orange-600';
    return 'text-red-600';
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && !assignments.find(a => a.dueDate === dueDate)?.submittedDate;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-800 rounded-2xl p-8 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Assessments</h1>
              <p className="text-indigo-100 text-lg">Track your assignments, quizzes, and exam results</p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <Target className="w-10 h-10" />
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
            <input
              type="text"
              placeholder="Search assessments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex gap-2">
            {['all', 'pending', 'submitted', 'graded'].map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter(filter)}
                className={selectedFilter === filter ? 'bg-gradient-to-r from-orange-500 to-red-500' : ''}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Assessments */}
        <div className="lg:col-span-2 space-y-8">
          {/* Assessment Cards */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <FileText className="w-5 h-5" />
                My Assessments
              </CardTitle>
              <CardDescription>Your assignments, quizzes, and exams</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredAssignments.map((assignment) => (
                <div key={assignment.id} className={`rounded-xl p-6 border hover:shadow-md transition-all duration-200 ${getStatusColor(assignment.status)}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-white flex items-center justify-center ${assignment.status === 'pending' ? 'text-orange-600' : assignment.status === 'submitted' ? 'text-blue-600' : 'text-green-600'}`}>
                      {getTypeIcon(assignment.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{assignment.title}</h3>
                          <p className="text-sm text-gray-600">{assignment.subject} • {assignment.type}</p>
                        </div>
                        <Badge variant="outline" className={`${getStatusColor(assignment.status)}`}>
                          {isOverdue(assignment.dueDate) ? 'Overdue' : assignment.status}
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-600 mb-3">{assignment.description}</p>

                      {/* Due Date & Progress */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                        </div>
                        {assignment.points && (
                          <div className="text-sm font-medium">
                            Score: {assignment.points}/{assignment.maxPoints}
                          </div>
                        )}
                      </div>

                      {assignment.points && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                            <span>Your Score</span>
                            <span className={`font-medium ${getGradeColor(assignment.points >= 90 ? 'A' : assignment.points >= 80 ? 'B' : assignment.points >= 70 ? 'C' : 'D')}`}>
                              {assignment.points >= 90 ? 'A' : assignment.points >= 80 ? 'B' : assignment.points >= 70 ? 'C' : 'D'}
                            </span>
                          </div>
                          <Progress value={assignment.points} className="h-2" />
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        {assignment.status === 'pending' ? (
                          <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700">
                            <FileText className="h-4 w-4 mr-2" />
                            Submit Assignment
                          </Button>
                        ) : assignment.status === 'submitted' ? (
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            View Submission
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            View Results
                          </Button>
                        )}

                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>

                        {assignment.attachments.length > 0 && (
                          <Button size="sm" variant="outline">
                            <FileText className="h-4 w-4 mr-2" />
                            Attachments ({assignment.attachments.length})
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Performance & Upcoming */}
        <div className="space-y-6">
          {/* Performance Summary */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <TrendingUp className="w-5 h-5" />
                Performance Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentScores.map((score, index) => (
                <div key={index} className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3 border border-green-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm text-gray-900">{score.subject}</span>
                    <div className={`text-sm font-bold ${getGradeColor(score.grade)}`}>
                      {score.grade}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>{score.score}/{score.maxScore} points</span>
                    <div className={`flex items-center gap-1 ${score.trend === 'up' ? 'text-green-600' : 'text-gray-500'}`}>
                      <TrendingUp className={`w-3 h-3 ${score.trend === 'up' ? '' : 'opacity-50'}`} />
                      <span className="text-xs">{score.trend}</span>
                    </div>
                  </div>
                  <Progress value={score.score} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Quizzes */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <Target className="w-5 h-5" />
                Upcoming Quizzes
              </CardTitle>
              <CardDescription>Prepare for these upcoming assessments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingQuizzes.map((quiz) => (
                <div key={quiz.id} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 border border-blue-100">
                  <h4 className="font-medium text-sm text-gray-900 mb-1">{quiz.title}</h4>
                  <p className="text-xs text-gray-600 mb-2">{quiz.subject}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(quiz.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {quiz.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{quiz.questions} questions</span>
                    <span>{quiz.duration}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-purple-600">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Submit Assignment
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Target className="h-4 w-4 mr-2" />
                Take Practice Quiz
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                Study Materials
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Award className="h-4 w-4 mr-2" />
                View Grades
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Assessments;
