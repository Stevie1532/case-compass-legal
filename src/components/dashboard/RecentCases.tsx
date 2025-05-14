
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const RecentCases = () => {
  // In a real app, this data would come from your API
  const cases = [
    {
      id: 'C-2023-042',
      title: 'Smith vs Anderson Corp',
      client: 'John Smith',
      status: 'Active',
      priority: 'High',
      statusColor: 'bg-green-100 text-green-800',
      priorityColor: 'bg-red-100 text-red-800'
    },
    {
      id: 'C-2023-039',
      title: 'Trademark Infringement - TechGo',
      client: 'TechGo Inc.',
      status: 'Active',
      priority: 'Medium',
      statusColor: 'bg-green-100 text-green-800',
      priorityColor: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'C-2023-036',
      title: 'Employee Contract Review',
      client: 'Global Industries',
      status: 'In Review',
      priority: 'Low',
      statusColor: 'bg-blue-100 text-blue-800',
      priorityColor: 'bg-gray-100 text-gray-800'
    },
    {
      id: 'C-2023-034',
      title: 'Property Acquisition - Downtown',
      client: 'Real Estate Holdings LLC',
      status: 'Active',
      priority: 'Medium',
      statusColor: 'bg-green-100 text-green-800',
      priorityColor: 'bg-amber-100 text-amber-800'
    },
  ];

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Recent Cases</CardTitle>
        <Button variant="ghost" size="sm" className="text-legal hover:text-legal-dark">
          View All <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-100">
                <th className="pb-3 font-medium text-gray-500">Case ID</th>
                <th className="pb-3 font-medium text-gray-500">Title</th>
                <th className="pb-3 font-medium text-gray-500">Client</th>
                <th className="pb-3 font-medium text-gray-500">Status</th>
                <th className="pb-3 font-medium text-gray-500">Priority</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((caseItem) => (
                <tr key={caseItem.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="py-3 text-gray-600">{caseItem.id}</td>
                  <td className="py-3 font-medium">{caseItem.title}</td>
                  <td className="py-3 text-gray-600">{caseItem.client}</td>
                  <td className="py-3">
                    <Badge variant="outline" className={`${caseItem.statusColor} border-none`}>
                      {caseItem.status}
                    </Badge>
                  </td>
                  <td className="py-3">
                    <Badge variant="outline" className={`${caseItem.priorityColor} border-none`}>
                      {caseItem.priority}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentCases;
