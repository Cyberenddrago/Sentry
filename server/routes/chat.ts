import { Server } from "socket.io";
import { Server as HttpServer } from "http";

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

let messages: ChatMessage[] = [];
let connectedUsers: ConnectedUser[] = [];

export function initializeSocket(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Handle user authentication/registration
    socket.on('register', (userData: { id: string; name: string; role: string }) => {
      const existingUserIndex = connectedUsers.findIndex(user => user.id === userData.id);
      
      if (existingUserIndex >= 0) {
        // Update existing user's socket ID
        connectedUsers[existingUserIndex].socketId = socket.id;
      } else {
        // Add new user
        connectedUsers.push({
          id: userData.id,
          name: userData.name,
          role: userData.role,
          socketId: socket.id
        });
      }

      // Send current users list to all clients
      io.emit('users_updated', connectedUsers);
      
      // Send message history to the newly connected user
      socket.emit('message_history', messages.slice(-50)); // Last 50 messages
      
      console.log(`User registered: ${userData.name} (${userData.role})`);
    });

    // Handle new messages
    socket.on('send_message', (messageData: { 
      senderId: string; 
      senderName: string; 
      senderRole: string; 
      message: string 
    }) => {
      const newMessage: ChatMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        senderId: messageData.senderId,
        senderName: messageData.senderName,
        senderRole: messageData.senderRole,
        message: messageData.message,
        timestamp: new Date().toISOString(),
        type: 'message'
      };

      messages.push(newMessage);
      
      // Keep only last 1000 messages in memory
      if (messages.length > 1000) {
        messages = messages.slice(-1000);
      }

      // Broadcast message to all connected users
      io.emit('new_message', newMessage);
      
      console.log(`Message from ${messageData.senderName}: ${messageData.message}`);
    });

    // Handle image upload notifications
    socket.on('image_uploaded', (notificationData: {
      jobId: string;
      jobTitle: string;
      uploaderName: string;
      uploaderRole: string;
      photoCount: number;
    }) => {
      const notification: ChatMessage = {
        id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        senderId: 'system',
        senderName: 'System',
        senderRole: 'system',
        message: `📸 ${notificationData.uploaderName} uploaded a photo to job "${notificationData.jobTitle}". Total photos: ${notificationData.photoCount}`,
        timestamp: new Date().toISOString(),
        type: 'image_notification',
        jobId: notificationData.jobId
      };

      messages.push(notification);
      
      // Notify only admins and apollo users about image uploads
      connectedUsers
        .filter(user => user.role === 'admin' || user.role === 'apollo')
        .forEach(adminUser => {
          io.to(adminUser.socketId).emit('new_message', notification);
        });

      console.log(`Image upload notification: ${notification.message}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      connectedUsers = connectedUsers.filter(user => user.socketId !== socket.id);
      io.emit('users_updated', connectedUsers);
      console.log('User disconnected:', socket.id);
    });

    // Handle typing indicators
    socket.on('typing_start', (userData: { name: string; role: string }) => {
      socket.broadcast.emit('user_typing', userData);
    });

    socket.on('typing_stop', (userData: { name: string; role: string }) => {
      socket.broadcast.emit('user_stopped_typing', userData);
    });
  });

  return io;
}

// Function to notify about image uploads (called from photo upload route)
export function notifyImageUpload(io: Server, data: {
  jobId: string;
  jobTitle: string;
  uploaderName: string;
  uploaderRole: string;
  photoCount: number;
}) {
  const notification: ChatMessage = {
    id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    senderId: 'system',
    senderName: 'System',
    senderRole: 'system',
    message: `📸 ${data.uploaderName} uploaded a photo to job "${data.jobTitle}". Total photos: ${data.photoCount}`,
    timestamp: new Date().toISOString(),
    type: 'image_notification',
    jobId: data.jobId
  };

  messages.push(notification);
  
  // Keep only last 1000 messages in memory
  if (messages.length > 1000) {
    messages = messages.slice(-1000);
  }
  
  // Notify all connected users
  io.emit('new_message', notification);
}
