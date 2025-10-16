import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  MessageSquare,
  Users,
  Settings,
  Hand,
  Share,
  Circle,
  PhoneOff,
  MoreHorizontal,
  Send,
  Smile,
  Pen,
  Eraser,
  Square,
  Type,
  Image as ImageIcon,
  Download,
  Upload,
  Maximize,
  Minimize
} from 'lucide-react';

interface WhiteboardProps {
  isVisible: boolean;
  onClose: () => void;
}

const Whiteboard: React.FC<WhiteboardProps> = ({ isVisible, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pen' | 'eraser' | 'square' | 'circle' | 'text'>('pen');
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(2);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      }
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = tool === 'eraser' ? 'white' : color;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-6xl h-[80vh] m-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Interactive Whiteboard</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={clearCanvas}>
              Clear All
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="flex items-center gap-2 p-2 border-b">
            <div className="flex items-center gap-1">
              <Button
                variant={tool === 'pen' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTool('pen')}
              >
                <Pen className="h-4 w-4" />
              </Button>
              <Button
                variant={tool === 'eraser' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTool('eraser')}
              >
                <Eraser className="h-4 w-4" />
              </Button>
            </div>

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            <div className="flex items-center gap-1">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-8 h-8 rounded border"
              />
              <input
                type="range"
                min="1"
                max="10"
                value={lineWidth}
                onChange={(e) => setLineWidth(Number(e.target.value))}
                className="w-16"
              />
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="w-full h-full cursor-crosshair"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const LiveClass: React.FC = () => {
  const { user } = useAuth();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Dr. Smith', message: 'Welcome to the class everyone!', time: '10:00 AM', type: 'teacher' },
    { id: 2, user: 'Alice Johnson', message: 'Good morning Dr. Smith!', time: '10:01 AM', type: 'student' },
    { id: 3, user: 'Bob Wilson', message: 'Ready to learn!', time: '10:01 AM', type: 'student' },
  ]);

  // Mock participants
  const participants = [
    { id: 1, name: 'Dr. Smith', role: 'teacher', isActive: true, avatar: '👨‍🏫', isMuted: false, hasHandRaised: false },
    { id: 2, name: 'Alice Johnson', role: 'student', isActive: true, avatar: '👩‍🎓', isMuted: true, hasHandRaised: false },
    { id: 3, name: 'Bob Wilson', role: 'student', isActive: true, avatar: '👨‍🎓', isMuted: false, hasHandRaised: true },
    { id: 4, name: 'Carol Davis', role: 'student', isActive: false, avatar: '👩‍🎓', isMuted: true, hasHandRaised: false },
  ];

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        user: user?.name || 'You',
        message: chatMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: user?.role === 'teacher' ? 'teacher' : 'student'
      };
      setChatMessages([...chatMessages, newMessage]);
      setChatMessage('');
    }
  };

  const isTeacher = user?.role === 'teacher';

  return (
    <div className="h-screen flex bg-gray-900">
      {/* Main Video Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Controls */}
        <div className="bg-gray-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-white border-white">
              🔴 LIVE
            </Badge>
            <span className="text-white">Mathematics - Algebra Basics</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">25 students</span>
          </div>

          <div className="flex items-center gap-2">
            {isTeacher && (
              <>
                <Button
                  variant={isRecording ? "destructive" : "outline"}
                  size="sm"
                  onClick={() => setIsRecording(!isRecording)}
                  className="text-white"
                >
                  <Circle className="h-4 w-4 mr-2" />
                  {isRecording ? 'Stop' : 'Record'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowWhiteboard(true)}
                  className="text-white"
                >
                  <Square className="h-4 w-4 mr-2" />
                  Whiteboard
                </Button>
              </>
            )}

            <Button variant="outline" size="sm" className="text-white">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Video Grid */}
        <div className="flex-1 p-4 grid grid-cols-3 gap-4">
          {/* Teacher Video (Large) */}
          <div className="col-span-2 bg-gray-800 rounded-lg flex items-center justify-center relative">
            <div className="text-white text-center">
              <div className="text-6xl mb-4">👨‍🏫</div>
              <div className="text-lg font-medium">Dr. Smith (Teacher)</div>
              <div className="text-sm text-gray-400">Teaching Mathematics</div>
            </div>

            {/* Video Controls Overlay */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              <Button
                variant={isMuted ? "destructive" : "outline"}
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
                className="bg-black/50 text-white border-white/50 hover:bg-black/70"
              >
                {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>

              <Button
                variant={isVideoOn ? "outline" : "destructive"}
                size="sm"
                onClick={() => setIsVideoOn(!isVideoOn)}
                className="bg-black/50 text-white border-white/50 hover:bg-black/70"
              >
                {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
              </Button>

              <Button
                variant="destructive"
                size="sm"
                className="bg-red-600 hover:bg-red-700"
              >
                <PhoneOff className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Students Grid */}
          <div className="space-y-2">
            {participants.filter(p => p.role === 'student').slice(0, 4).map((participant) => (
              <div key={participant.id} className="bg-gray-800 rounded-lg p-3 flex items-center gap-3">
                <div className="text-2xl relative">
                  {participant.avatar}
                  {participant.hasHandRaised && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Hand className="h-2 w-2 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-white text-sm font-medium">{participant.name}</div>
                  <div className="text-gray-400 text-xs">
                    {participant.isActive ? 'Active' : 'Away'}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  {participant.isMuted && (
                    <MicOff className="h-3 w-3 text-red-400" />
                  )}
                  {participant.isActive && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}

            {/* More Students Indicator */}
            <div className="bg-gray-800 rounded-lg p-3 flex items-center justify-center">
              <span className="text-gray-400 text-sm">+{participants.filter(p => p.role === 'student').length - 4} more</span>
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="bg-gray-800 p-4 flex items-center justify-center gap-4">
          <Button
            variant={isMuted ? "destructive" : "outline"}
            size="lg"
            onClick={() => setIsMuted(!isMuted)}
            className="text-white"
          >
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>

          <Button
            variant={isVideoOn ? "outline" : "destructive"}
            size="lg"
            onClick={() => setIsVideoOn(!isVideoOn)}
            className="text-white"
          >
            {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </Button>

          {!isTeacher && (
            <Button
              variant={isHandRaised ? "default" : "outline"}
              size="lg"
              onClick={() => setIsHandRaised(!isHandRaised)}
              className={`${isHandRaised ? 'bg-yellow-500 hover:bg-yellow-600' : ''} text-white`}
            >
              <Hand className="h-5 w-5" />
            </Button>
          )}

          <Button variant="outline" size="lg" className="text-white">
            <MessageSquare className="h-5 w-5" />
          </Button>

          <Button variant="outline" size="lg" className="text-white">
            <Users className="h-5 w-5" />
          </Button>

          <Button variant="destructive" size="lg">
            <PhoneOff className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2 m-4 mb-0">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="participants">Participants</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex-1 flex flex-col m-0">
            {/* Chat Messages */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {chatMessages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'teacher' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.type === 'teacher'
                      ? 'bg-blue-100 text-blue-900'
                      : 'bg-green-100 text-green-900'
                  }`}>
                    <div className="text-xs font-medium mb-1">{message.user}</div>
                    <div className="text-sm">{message.message}</div>
                    <div className="text-xs text-gray-500 mt-1">{message.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button size="sm" variant="outline">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button size="sm" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="participants" className="flex-1 p-4 m-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Participants (25)</h4>
                <Badge variant="outline">Live</Badge>
              </div>

              {participants.map((participant) => (
                <div key={participant.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                  <div className="text-2xl relative">
                    {participant.avatar}
                    {participant.hasHandRaised && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Hand className="h-2 w-2 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{participant.name}</div>
                    <div className="text-xs text-gray-500 capitalize">{participant.role}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    {participant.isMuted && (
                      <MicOff className="h-3 w-3 text-red-400" />
                    )}
                    {participant.isActive && (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Whiteboard Modal */}
      <Whiteboard
        isVisible={showWhiteboard}
        onClose={() => setShowWhiteboard(false)}
      />
    </div>
  );
};

export default LiveClass;
