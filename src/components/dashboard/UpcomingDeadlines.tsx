
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, Calendar } from 'lucide-react';

const UpcomingDeadlines = () => {
  // In a real app, this data would come from your API
  const deadlines = [
    {
      date: '2025-05-16',
      title: 'File Motion for Summary Judgment',
      case: 'Smith vs Anderson Corp',
      formattedDate: 'May 16, 2025',
      daysLeft: 2
    },
    {
      date: '2025-05-20',
      title: 'Submit Trademark Response',
      case: 'Trademark Infringement - TechGo',
      formattedDate: 'May 20, 2025',
      daysLeft: 6
    },
    {
      date: '2025-05-25',
      title: 'Contract Signature Deadline',
      case: 'Employee Contract Review',
      formattedDate: 'May 25, 2025',
      daysLeft: 11
    },
    {
      date: '2025-05-30',
      title: 'Property Closing Date',
      case: 'Property Acquisition - Downtown',
      formattedDate: 'May 30, 2025',
      daysLeft: 16
    }
  ];

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Upcoming Deadlines</CardTitle>
        <Button variant="ghost" size="sm" className="text-legal hover:text-legal-dark">
          View Calendar <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deadlines.map((deadline, index) => (
            <div 
              key={index}
              className="flex items-start gap-3 p-3 border border-gray-100 rounded-md hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center min-w-[50px] h-12 bg-legal-muted rounded-md">
                <Calendar className="h-4 w-4 text-legal mb-1" />
                <span className="text-xs font-medium text-legal">{deadline.daysLeft} days</span>
              </div>
              <div>
                <h4 className="font-medium">{deadline.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{deadline.case}</p>
                <p className="text-xs text-gray-500 mt-1">{deadline.formattedDate}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingDeadlines;
