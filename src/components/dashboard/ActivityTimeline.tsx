
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, FileText, CheckSquare, Calendar } from 'lucide-react';

const activities = [
  {
    id: 1,
    user: 'Sarah Johnson',
    action: 'added a comment',
    target: 'Smith vs. Jones case',
    time: '10 minutes ago',
    icon: MessageSquare,
    type: 'comment'
  },
  {
    id: 2,
    user: 'David Lee',
    action: 'uploaded',
    target: 'Legal Brief.docx',
    time: '1 hour ago',
    icon: FileText,
    type: 'document'
  },
  {
    id: 3,
    user: 'Maria Garcia',
    action: 'completed task',
    target: 'Review contract amendments',
    time: '2 hours ago',
    icon: CheckSquare,
    type: 'task'
  },
  {
    id: 4,
    user: 'James Wilson',
    action: 'scheduled',
    target: 'Client meeting with ABC Corp',
    time: '3 hours ago',
    icon: Calendar,
    type: 'event'
  },
  {
    id: 5,
    user: 'Emily Chen',
    action: 'updated',
    target: 'Estate Planning documents',
    time: '5 hours ago',
    icon: FileText,
    type: 'document'
  }
];

const getBadgeColor = (type: string) => {
  switch (type) {
    case 'comment':
      return 'bg-blue-100 text-blue-800';
    case 'document':
      return 'bg-purple-100 text-purple-800';
    case 'task':
      return 'bg-green-100 text-green-800';
    case 'event':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const ActivityTimeline = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <div className="mt-1 rounded-full bg-muted p-2">
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{activity.user}</span>
                  <Badge variant="outline" className={getBadgeColor(activity.type)}>
                    {activity.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {activity.action} <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityTimeline;
