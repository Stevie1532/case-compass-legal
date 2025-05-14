
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: number;
  sender: {
    name: string;
    avatar?: string;
    initials: string;
  };
  text: string;
  time: string;
  isMe: boolean;
}

const initialMessages: Message[] = [
  {
    id: 1,
    sender: { name: 'Sarah Johnson', initials: 'SJ' },
    text: 'Has anyone reviewed the Thompson contract yet?',
    time: '9:32 AM',
    isMe: false
  },
  {
    id: 2,
    sender: { name: 'David Lee', initials: 'DL' },
    text: 'I\'m working on it now. Should be done by noon.',
    time: '9:45 AM',
    isMe: false
  },
  {
    id: 3,
    sender: { name: 'You', initials: 'ME' },
    text: 'Great. We need to have the reviewed version ready for tomorrow\'s meeting.',
    time: '10:03 AM',
    isMe: true
  },
  {
    id: 4,
    sender: { name: 'Maria Garcia', initials: 'MG' },
    text: 'I\'ve prepared the presentation slides for the meeting. Do you want me to email them to everyone?',
    time: '10:12 AM',
    isMe: false
  },
  {
    id: 5,
    sender: { name: 'You', initials: 'ME' },
    text: 'Yes, please. And make sure to include the updated financial projections.',
    time: '10:15 AM',
    isMe: true
  }
];

const TeamChat = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: { name: 'You', initials: 'ME' },
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true
      };
      
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Team Chat</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-hidden">
        <ScrollArea className="h-[330px] px-6">
          <div className="space-y-4 pt-3">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex items-start gap-2 ${message.isMe ? 'flex-row-reverse' : ''}`}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                  <AvatarFallback className={message.isMe ? 'bg-primary text-primary-foreground' : ''}>
                    {message.sender.initials}
                  </AvatarFallback>
                </Avatar>
                <div className={`space-y-1 max-w-[75%] ${message.isMe ? 'items-end' : ''}`}>
                  <div className="flex flex-col">
                    <div 
                      className={`rounded-lg p-3 text-sm ${
                        message.isMe 
                          ? 'bg-primary text-primary-foreground ml-auto' 
                          : 'bg-muted'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                  <div className={`flex text-xs text-muted-foreground gap-2 ${message.isMe ? 'justify-end' : ''}`}>
                    {!message.isMe && <span>{message.sender.name}</span>}
                    <span>{message.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-2 border-t">
        <div className="flex w-full items-center space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button size="sm" onClick={handleSendMessage}>Send</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TeamChat;
