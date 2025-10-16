import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, Users } from "lucide-react";

const courses = [
  {
    title: "Full-Stack Web Development",
    description: "Master React, Node.js, and MongoDB with real-world projects",
    level: "Intermediate",
    duration: "12 weeks",
    students: "2.5K",
    rating: "4.9",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Advanced TypeScript Patterns",
    description: "Deep dive into advanced TypeScript features and design patterns",
    level: "Advanced",
    duration: "8 weeks",
    students: "1.8K",
    rating: "4.8",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Frontend Masters Path",
    description: "Complete roadmap from basics to advanced frontend development",
    level: "Beginner",
    duration: "16 weeks",
    students: "5.2K",
    rating: "4.9",
    color: "from-violet-500 to-purple-500"
  },
];

export const FeaturedCourses = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Courses</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Handpicked courses designed by industry experts to accelerate your learning journey
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <Card key={index} className="group overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${course.color}`} />
              
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">{course.level}</Badge>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="font-semibold">{course.rating}</span>
                  </div>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {course.title}
                </CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.students}
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button className="w-full" variant="default">
                  Enroll Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
