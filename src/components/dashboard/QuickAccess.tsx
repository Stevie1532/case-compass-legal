
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FilePlus, FolderPlus, FileText, UserPlus, PlusCircle } from 'lucide-react';

const QuickAccess = () => {
  const quickActions = [
    {
      title: 'New Case',
      icon: <FolderPlus className="h-5 w-5" />,
      color: 'bg-blue-50 text-blue-700 hover:bg-blue-100'
    },
    {
      title: 'New Document',
      icon: <FilePlus className="h-5 w-5" />,
      color: 'bg-amber-50 text-amber-700 hover:bg-amber-100'
    },
    {
      title: 'New Task',
      icon: <PlusCircle className="h-5 w-5" />,
      color: 'bg-green-50 text-green-700 hover:bg-green-100'
    },
    {
      title: 'New Memo',
      icon: <FileText className="h-5 w-5" />,
      color: 'bg-purple-50 text-purple-700 hover:bg-purple-100'
    },
    {
      title: 'New Contact',
      icon: <UserPlus className="h-5 w-5" />,
      color: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
    },
  ];

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Quick Access</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className={`${action.color} border-none flex items-center gap-2`}
            >
              {action.icon}
              {action.title}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickAccess;
