
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, CheckCircle2, Clock, CalendarDays } from 'lucide-react';

const PriorityTasks = () => {
  // In a real app, this data would come from your API
  const tasks = [
    {
      id: 'T-476',
      title: 'Prepare discovery documents',
      case: 'Smith vs Anderson Corp',
      dueDate: '2025-05-15',
      status: 'In Progress',
      icon: <Clock className="h-4 w-4 text-amber-500" />,
    },
    {
      id: 'T-475',
      title: 'Review client deposition',
      case: 'Trademark Infringement - TechGo',
      dueDate: '2025-05-14',
      status: 'Due Today',
      icon: <Clock className="h-4 w-4 text-red-500" />,
    },
    {
      id: 'T-473',
      title: 'Prepare contract amendments',
      case: 'Employee Contract Review',
      dueDate: '2025-05-16',
      status: 'Scheduled',
      icon: <CalendarDays className="h-4 w-4 text-blue-500" />,
    },
    {
      id: 'T-472',
      title: 'Send settlement proposal',
      case: 'Property Acquisition - Downtown',
      dueDate: '2025-05-17',
      status: 'Complete',
      icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    },
  ];

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Priority Tasks</CardTitle>
        <Button variant="ghost" size="sm" className="text-legal hover:text-legal-dark">
          View All <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start p-3 border border-gray-100 rounded-md hover:bg-gray-50 cursor-pointer"
            >
              <div className="mr-3 mt-0.5">
                {task.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">{task.title}</h4>
                  <span className="text-xs text-gray-500">#{task.id}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{task.case}</p>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PriorityTasks;
