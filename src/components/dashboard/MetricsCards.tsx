
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Folder, CheckSquare, Clock, AlertTriangle } from 'lucide-react';

const MetricsCards = () => {
  // In a real app, this data would come from your API
  const metrics = [
    { 
      title: 'Active Cases', 
      value: '24', 
      change: '+3 this month', 
      icon: <Folder className="h-6 w-6 text-legal" />,
      color: 'bg-blue-50 text-legal' 
    },
    { 
      title: 'Pending Tasks', 
      value: '18', 
      change: '5 due today', 
      icon: <CheckSquare className="h-6 w-6 text-amber-600" />,
      color: 'bg-amber-50 text-amber-600'
    },
    { 
      title: 'Documents Awaiting', 
      value: '7', 
      change: '2 requiring action', 
      icon: <Clock className="h-6 w-6 text-indigo-600" />,
      color: 'bg-indigo-50 text-indigo-600'
    },
    { 
      title: 'Urgent Matters', 
      value: '3', 
      change: 'High priority', 
      icon: <AlertTriangle className="h-6 w-6 text-red-600" />,
      color: 'bg-red-50 text-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{metric.title}</p>
                <p className="text-2xl font-bold mt-1">{metric.value}</p>
                <p className="text-xs mt-1 text-gray-500">{metric.change}</p>
              </div>
              <div className={`p-2 rounded-lg ${metric.color}`}>
                {metric.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsCards;
