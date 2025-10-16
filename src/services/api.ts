import {
  User,
  Batch,
  Notification,
  Course,
  Enrollment,
  Review,
  Schedule
} from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem('genzed_token');

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Authentication
  async login(email: string, password: string) {
    return this.request<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: { name: string; email: string; password: string; role: string }) {
    return this.request<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getBatches() {
    return this.request<Batch[]>('/batches');
  }

  async getBatchById(id: string) {
    return this.request<Batch>(`/batches/${id}`);
  }

  async createBatch(batchData: Partial<Batch>) {
    return this.request<Batch>('/batches', {
      method: 'POST',
      body: JSON.stringify(batchData),
    });
  }

  async updateBatch(id: string, batchData: Partial<Batch>) {
    return this.request<Batch>(`/batches/${id}`, {
      method: 'PUT',
      body: JSON.stringify(batchData),
    });
  }

  // Notifications
  async getNotifications(userId: string) {
    return this.request<Notification[]>(`/notifications/${userId}`);
  }

  async markNotificationAsRead(notificationId: string) {
    return this.request<Notification>(`/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
  }

  // Students
  async getStudents() {
    return this.request<User[]>('/students');
  }

  async enrollStudentInBatch(studentId: string, batchId: string) {
    return this.request<{ success: boolean }>(`/students/${studentId}/enroll`, {
      method: 'POST',
      body: JSON.stringify({ batchId }),
    });
  }

  // Courses
  async getCourses(filters?: {
    category?: string;
    level?: string;
    search?: string;
    sortBy?: string;
  }) {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.level) params.append('level', filters.level);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);

    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<Course[]>(`/courses${query}`);
  }

  async getCourseById(id: string) {
    return this.request<Course>(`/courses/${id}`);
  }

  async enrollInCourse(courseId: string) {
    return this.request<{ success: boolean; enrollment: Enrollment }>('/enrollments', {
      method: 'POST',
      body: JSON.stringify({ courseId }),
    });
  }

  async getMyCourses() {
    return this.request<Course[]>('/my-courses');
  }

  async getCourseReviews(courseId: string) {
    return this.request<Review[]>(`/courses/${courseId}/reviews`);
  }

  async submitReview(courseId: string, rating: number, comment: string) {
    return this.request<Review>('/reviews', {
      method: 'POST',
      body: JSON.stringify({ courseId, rating, comment }),
    });
  }
}

export const apiService = new ApiService();
