
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Clock } from 'lucide-react';

const UpcomingMilestones = () => {
  // This would come from your API in a real application
  const milestones = [
    {
      id: 1,
      name: 'Filing Final Arguments',
      caseNumber: 'CAS-2023-0145',
      caseTitle: 'State v. Johnson',
      dueDate: '2025-05-25',
      daysLeft: 6,
      assignedTo: 'Sarah Lind'
    },
    {
      id: 2,
      name: 'Expert Witness Deposition',
      caseNumber: 'CAS-2023-0178',
      caseTitle: 'Roberts LLC v. Marcus Corp',
      dueDate: '2025-05-27',
      daysLeft: 8,
      assignedTo: 'James Wong'
    },
    {
      id: 3,
      name: 'Discovery Deadline',
      caseNumber: 'CAS-2023-0193',
      caseTitle: 'Alvarez Family Trust',
      dueDate: '2025-05-29',
      daysLeft: 10,
      assignedTo: 'Michael Chen'
    },
    {
      id: 4,
      name: 'Settlement Conference',
      caseNumber: 'CAS-2023-0212',
      caseTitle: 'Williams v. City Hospital',
      dueDate: '2025-06-02',
      daysLeft: 14,
      assignedTo: 'Emma Rodriguez'
    },
    {
      id: 5,
      name: 'Motion Hearing',
      caseNumber: 'CAS-2023-0156',
      caseTitle: 'Thompson Estate',
      dueDate: '2025-06-05',
      daysLeft: 17,
      assignedTo: 'Daniel Kim'
    }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Upcoming Milestones</CardTitle>
        <Calendar className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Milestone</TableHead>
              <TableHead>Case</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-right">Days Left</TableHead>
              <TableHead>Assigned To</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {milestones.map((milestone) => (
              <TableRow key={milestone.id}>
                <TableCell className="font-medium">{milestone.name}</TableCell>
                <TableCell>
                  <div>{milestone.caseNumber}</div>
                  <div className="text-xs text-muted-foreground">{milestone.caseTitle}</div>
                </TableCell>
                <TableCell>{milestone.dueDate}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    <Clock className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                    <span className={milestone.daysLeft <= 7 ? "text-red-500 font-medium" : ""}>{milestone.daysLeft} days</span>
                  </div>
                </TableCell>
                <TableCell>{milestone.assignedTo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UpcomingMilestones;
