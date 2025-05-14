
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, FileText, FilePlus, FileEdit, FileX } from 'lucide-react';

const DocumentActivity = () => {
  // In a real app, this data would come from your API
  const activities = [
    {
      id: 'D-892',
      action: 'Created',
      document: 'Settlement Agreement.docx',
      user: 'Emma Warren',
      time: '2 hours ago',
      icon: <FilePlus className="h-4 w-4 text-green-500" />,
    },
    {
      id: 'D-891',
      action: 'Modified',
      document: 'Case Summary.pdf',
      user: 'Alex Chen',
      time: '4 hours ago',
      icon: <FileEdit className="h-4 w-4 text-blue-500" />,
    },
    {
      id: 'D-890',
      action: 'Viewed',
      document: 'Evidence Photos.zip',
      user: 'Michael Scott',
      time: '5 hours ago',
      icon: <FileText className="h-4 w-4 text-amber-500" />,
    },
    {
      id: 'D-889',
      action: 'Deleted',
      document: 'Draft Letter.docx',
      user: 'Sarah Johnson',
      time: 'Yesterday',
      icon: <FileX className="h-4 w-4 text-red-500" />,
    },
  ];

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Document Activity</CardTitle>
        <Button variant="ghost" size="sm" className="text-legal hover:text-legal-dark">
          View All <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start p-3 border border-gray-100 rounded-md hover:bg-gray-50 cursor-pointer"
            >
              <div className="mr-3 mt-0.5">
                {activity.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">{activity.document}</h4>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  <span className="font-medium">{activity.action}</span> by {activity.user}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentActivity;
