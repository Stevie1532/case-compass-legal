
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

type TaskPriority = 'High' | 'Medium' | 'Low';
type TaskStatus = 'Completed' | 'In Progress' | 'Not Started' | 'Overdue';

interface Task {
  id: string;
  title: string;
  assignedTo: string;
  dueDate: string;
  relatedCase: string;
  priority: TaskPriority;
  status: TaskStatus;
}

const tasks: Task[] = [
  {
    id: 'TSK-2023-4589',
    title: 'Prepare deposition questions',
    assignedTo: 'Sarah Johnson',
    dueDate: '2023-05-20',
    relatedCase: 'Thompson v. City of Oakland',
    priority: 'High',
    status: 'In Progress'
  },
  {
    id: 'TSK-2023-4590',
    title: 'Review financial disclosures',
    assignedTo: 'David Lee',
    dueDate: '2023-05-18',
    relatedCase: 'Estate of Williams',
    priority: 'Medium',
    status: 'Not Started'
  },
  {
    id: 'TSK-2023-4591',
    title: 'Draft cease and desist letter',
    assignedTo: 'Maria Garcia',
    dueDate: '2023-05-15',
    relatedCase: 'Smith Commercial Lease Dispute',
    priority: 'High',
    status: 'Overdue'
  },
  {
    id: 'TSK-2023-4592',
    title: 'Finalize settlement agreement',
    assignedTo: 'James Wilson',
    dueDate: '2023-05-25',
    relatedCase: 'Johnson Divorce Settlement',
    priority: 'Medium',
    status: 'In Progress'
  },
  {
    id: 'TSK-2023-4593',
    title: 'Conduct patent search',
    assignedTo: 'Emily Chen',
    dueDate: '2023-05-12',
    relatedCase: 'ABC Corp Intellectual Property',
    priority: 'Low',
    status: 'Completed'
  }
];

const getPriorityColor = (priority: TaskPriority) => {
  switch (priority) {
    case 'High':
      return 'bg-red-100 text-red-800 hover:bg-red-200';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
    case 'Low':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
};

const getStatusIcon = (status: TaskStatus) => {
  switch (status) {
    case 'Completed':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'In Progress':
      return <Clock className="h-4 w-4 text-blue-600" />;
    case 'Not Started':
      return <Clock className="h-4 w-4 text-gray-500" />;
    case 'Overdue':
      return <AlertCircle className="h-4 w-4 text-red-600" />;
    default:
      return null;
  }
};

const TaskTableau = () => {
  return (
    <Card className="col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Task Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Task ID</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Related Case</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium">{task.id}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.assignedTo}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell className="truncate max-w-[150px]" title={task.relatedCase}>
                  {task.relatedCase}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(task.status)}
                    <span>{task.status}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TaskTableau;
