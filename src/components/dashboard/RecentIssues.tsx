
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const RecentIssues = () => {
  // This would come from your API in a real application
  const issues = [
    {
      id: 1,
      title: 'Document server access issue',
      category: 'IT',
      status: 'Open',
      reporter: 'James Smith',
      priority: 'High',
      reported: '4h ago'
    },
    {
      id: 2,
      title: 'Case management system error',
      category: 'Software',
      status: 'In Progress',
      reporter: 'Emily Johnson',
      priority: 'Medium',
      reported: '8h ago'
    },
    {
      id: 3,
      title: 'Missing client information',
      category: 'Data',
      status: 'Open',
      reporter: 'Michael Williams',
      priority: 'High',
      reported: '1d ago'
    },
    {
      id: 4,
      title: 'Printer in conference room not working',
      category: 'Hardware',
      status: 'Resolved',
      reporter: 'Jessica Brown',
      priority: 'Low',
      reported: '2d ago'
    },
    {
      id: 5,
      title: 'Network connectivity issues',
      category: 'IT',
      status: 'In Progress',
      reporter: 'Robert Davis',
      priority: 'Medium',
      reported: '2d ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Open': return 'bg-red-100 text-red-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Recent Issues Reported</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Issue</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Reporter</TableHead>
              <TableHead className="text-right">Reported</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {issues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell className="font-medium">{issue.title}</TableCell>
                <TableCell>{issue.category}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(issue.status)}>
                    {issue.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getPriorityColor(issue.priority)}>
                    {issue.priority}
                  </Badge>
                </TableCell>
                <TableCell>{issue.reporter}</TableCell>
                <TableCell className="text-right text-muted-foreground">{issue.reported}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentIssues;
