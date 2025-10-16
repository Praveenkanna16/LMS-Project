import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Courses from "./pages/Courses";
import StudentDashboard from "./pages/student/Dashboard";
import TeacherDashboard from "./pages/teacher/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import MyBatches from "./pages/student/MyBatches";
import Schedule from "./pages/student/Schedule";
import RecordedContent from "./pages/student/RecordedContent";
import Assessments from "./pages/student/Assessments";
import Notifications from "./pages/student/Notifications";
import Settings from "./pages/student/Settings";
import LiveClass from "./pages/LiveClass";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/layout/Layout";

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Layout>{children}</Layout>;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Landing Page - Public */}
      <Route path="/" element={<Index />} />

      {/* Auth Routes - Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Courses Catalog - Public */}
      <Route path="/courses" element={<Courses />} />

      {/* Protected Routes */}
      <Route
        path="/student/*"
        element={
          <ProtectedRoute>
            {user?.role === 'student' ? (
              <Routes>
                <Route path="/dashboard" element={<StudentDashboard />} />
                <Route path="/batches" element={<MyBatches />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/recorded-content" element={<RecordedContent />} />
                <Route path="/assessments" element={<Assessments />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/live-classes" element={<LiveClass />} />
                {/* Add more student routes here */}
              </Routes>
            ) : (
              <Navigate to={`/${user?.role}/dashboard`} replace />
            )}
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/*"
        element={
          <ProtectedRoute>
            {user?.role === 'teacher' ? (
              <Routes>
                <Route path="/dashboard" element={<TeacherDashboard />} />
                <Route path="/batches" element={<div>Teacher Batches Page - Coming Soon</div>} />
                <Route path="/schedule" element={<div>Teacher Schedule Page - Coming Soon</div>} />
                <Route path="/recorded-content" element={<div>Teacher Recorded Content Page - Coming Soon</div>} />
                <Route path="/earnings" element={<div>Teacher Earnings Page - Coming Soon</div>} />
                <Route path="/payouts" element={<div>Teacher Payouts Page - Coming Soon</div>} />
                <Route path="/reports" element={<div>Teacher Reports Page - Coming Soon</div>} />
                <Route path="/notifications" element={<div>Teacher Notifications Page - Coming Soon</div>} />
                <Route path="/settings" element={<div>Teacher Settings Page - Coming Soon</div>} />
                <Route path="/live-classes" element={<LiveClass />} />
                {/* Add more teacher routes here */}
              </Routes>
            ) : (
              <Navigate to={`/${user?.role}/dashboard`} replace />
            )}
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            {user?.role === 'admin' ? (
              <Routes>
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path="/users" element={<div>Admin Users Page - Coming Soon</div>} />
                <Route path="/teachers" element={<div>Admin Teachers Page - Coming Soon</div>} />
                <Route path="/students" element={<div>Admin Students Page - Coming Soon</div>} />
                <Route path="/live-classes" element={<div>Admin Live Classes Page - Coming Soon</div>} />
                <Route path="/batches" element={<div>Admin Batches Page - Coming Soon</div>} />
                <Route path="/analytics" element={<div>Admin Analytics Page - Coming Soon</div>} />
                <Route path="/payments" element={<div>Admin Payments Page - Coming Soon</div>} />
                <Route path="/payouts" element={<div>Admin Payouts Page - Coming Soon</div>} />
                <Route path="/recorded-content" element={<div>Admin Content Library Page - Coming Soon</div>} />
                <Route path="/notifications" element={<div>Admin Notifications Page - Coming Soon</div>} />
                <Route path="/settings" element={<div>Admin Settings Page - Coming Soon</div>} />
                <Route path="/data" element={<div>Admin Data Management Page - Coming Soon</div>} />
                {/* Add more admin routes here */}
              </Routes>
            ) : (
              <Navigate to={`/${user?.role}/dashboard`} replace />
            )}
          </ProtectedRoute>
        }
      />

      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
