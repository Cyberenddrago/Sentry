import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MessageCircle,
  Send,
  Users,
  Camera,
  Minimize2,
  Maximize2,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { io, Socket } from "socket.io-client";

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  message: string;
  timestamp: string;
  type: 'message' | 'image_notification';
  jobId?: string;
}

interface ConnectedUser {
  id: string;
  name: string;
  role: string;
  socketId: string;
}

interface ChatSystemProps {
  className?: string;
}

export function ChatSystem({ className }: ChatSystemProps) {
  const { user } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (user) {
      // Connect to socket.io server
      const newSocket = io();
      setSocket(newSocket);

      // Register user
      newSocket.emit('register', {
        id: user.id,
        name: user.name,
        role: user.role
      });

      // Socket event listeners
      newSocket.on('connect', () => {
        setIsConnected(true);
        console.log('Connected to chat server');
      });

      newSocket.on('disconnect', () => {
        setIsConnected(false);
        console.log('Disconnected from chat server');
      });

      newSocket.on('message_history', (history: ChatMessage[]) => {
        setMessages(history);
        scrollToBottom();
      });

      newSocket.on('new_message', (message: ChatMessage) => {
        setMessages(prev => [...prev, message]);
        
        // Increment unread count if chat is minimized and message is not from current user
        if (isMinimized && message.senderId !== user.id) {
          setUnreadCount(prev => prev + 1);
        }
        
        scrollToBottom();
      });

      newSocket.on('users_updated', (users: ConnectedUser[]) => {
        setConnectedUsers(users);
      });

      newSocket.on('user_typing', (userData: { name: string; role: string }) => {
        setTypingUsers(prev => [...prev, userData.name]);
        setTimeout(() => {
          setTypingUsers(prev => prev.filter(name => name !== userData.name));
        }, 3000);
      });

      newSocket.on('user_stopped_typing', (userData: { name: string; role: string }) => {
        setTypingUsers(prev => prev.filter(name => name !== userData.name));
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isMinimized) {
      setUnreadCount(0);
    }
  }, [isMinimized]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!socket || !newMessage.trim() || !user) return;

    socket.emit('send_message', {
      senderId: user.id,
      senderName: user.name,
      senderRole: user.role,
      message: newMessage.trim()
    });

    setNewMessage("");
    handleStopTyping();
  };

  const handleStartTyping = () => {
    if (!socket || !user || isTyping) return;
    
    setIsTyping(true);
    socket.emit('typing_start', {
      name: user.name,
      role: user.role
    });

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set timeout to stop typing
    typingTimeoutRef.current = setTimeout(() => {
      handleStopTyping();
    }, 3000);
  };

  const handleStopTyping = () => {
    if (!socket || !user || !isTyping) return;
    
    setIsTyping(false);
    socket.emit('typing_stop', {
      name: user.name,
      role: user.role
    });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    if (e.target.value.trim()) {
      handleStartTyping();
    } else {
      handleStopTyping();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'apollo': return 'bg-purple-100 text-purple-800';
      case 'supervisor': return 'bg-blue-100 text-blue-800';
      case 'staff': return 'bg-green-100 text-green-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!user) return null;

  // Floating chat button when minimized
  if (isMinimized) {
    return (
      <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
        <Button
          onClick={() => setIsMinimized(false)}
          className="relative h-12 w-12 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
        >
          <MessageCircle className="h-6 w-6" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
        {!isConnected && (
          <div className="absolute bottom-full right-0 mb-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Disconnected
          </div>
        )}
      </div>
    );
  }

  // Expanded chat window
  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <Card className="w-80 h-96 shadow-xl">
        <CardHeader className="p-3 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-sm">Team Chat</CardTitle>
              <div className="flex items-center space-x-1">
                {isConnected ? (
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                ) : (
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                )}
                <Badge variant="outline" className="text-xs px-1">
                  {connectedUsers.length}
                </Badge>
              </div>
            </div>
            <div className="flex space-x-1">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Users className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Connected Users</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-2">
                    {connectedUsers.map((connectedUser) => (
                      <div key={connectedUser.id} className="flex items-center justify-between">
                        <span className="font-medium">{connectedUser.name}</span>
                        <Badge className={getRoleColor(connectedUser.role)}>
                          {connectedUser.role}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsMinimized(true)}
                className="h-6 w-6 p-0"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-3 pt-0 h-full flex flex-col">
          <ScrollArea className="flex-1 pr-3">
            <div className="space-y-3">
              {messages.map((message) => (
                <div key={message.id} className="space-y-1">
                  {message.type === 'image_notification' ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                      <div className="flex items-start space-x-2">
                        <Camera className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm text-blue-800">{message.message}</p>
                          <p className="text-xs text-blue-600">{formatTime(message.timestamp)}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={`flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] rounded-lg px-3 py-2 ${
                        message.senderId === user.id 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        {message.senderId !== user.id && (
                          <div className="flex items-center space-x-1 mb-1">
                            <span className="text-xs font-medium">{message.senderName}</span>
                            <Badge className={`text-xs ${getRoleColor(message.senderRole)}`}>
                              {message.senderRole}
                            </Badge>
                          </div>
                        )}
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${
                          message.senderId === user.id ? 'text-blue-200' : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {typingUsers.length > 0 && (
                <div className="text-xs text-gray-500 italic">
                  {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <div className="mt-3 flex space-x-2">
            <Input
              value={newMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 text-sm"
              disabled={!isConnected}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || !isConnected}
              size="sm"
              className="px-3"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
