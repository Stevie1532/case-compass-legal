
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart3, Users, FileText, CheckSquare } from 'lucide-react';

type MetricCardProps = {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
};

const MetricCard = ({ title, value, description, icon }: MetricCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const CaseMetrics = () => {
  // This would come from your API in a real application
  const metrics = {
    activeCases: 78,
    pendingCases: 23,
    completedCases: 145,
    casesWon: 112,
    employees: 42,
    legalTasks: 156,
    pendingTasks: 38,
    completedTasks: 118,
    legalDocuments: 312,
    legalTeams: 8,
    issuesReported: 14,
    totalClients: 65,
  };

  const caseStatusData = [
    { status: 'Open', count: 45, percentage: '35%' },
    { status: 'In Progress', count: 33, percentage: '25%' },
    { status: 'Pending Review', count: 23, percentage: '18%' },
    { status: 'Closed', count: 29, percentage: '22%' },
  ];

  const casePriorityData = [
    { priority: 'High', count: 18, percentage: '14%' },
    { priority: 'Medium', count: 67, percentage: '52%' },
    { priority: 'Low', count: 44, percentage: '34%' },
  ];

  const caseImpactData = [
    { impact: 'Critical', count: 12, percentage: '9%' },
    { impact: 'Major', count: 36, percentage: '28%' },
    { impact: 'Moderate', count: 58, percentage: '45%' },
    { impact: 'Minor', count: 24, percentage: '18%' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Active Cases" 
          value={metrics.activeCases} 
          description="Current active legal cases" 
          icon={<BarChart3 className="h-4 w-4 text-legal-light" />}
        />
        <MetricCard 
          title="Total Pending Cases" 
          value={metrics.pendingCases} 
          description="Cases awaiting action" 
          icon={<BarChart3 className="h-4 w-4 text-orange-500" />}
        />
        <MetricCard 
          title="Total Completed Cases" 
          value={metrics.completedCases} 
          description="Successfully closed cases" 
          icon={<BarChart3 className="h-4 w-4 text-blue-500" />}
        />
        <MetricCard 
          title="Total Cases Won" 
          value={metrics.casesWon} 
          description="Favorable outcomes" 
          icon={<BarChart3 className="h-4 w-4 text-green-500" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Employees" 
          value={metrics.employees} 
          description="Lawyers and staff" 
          icon={<Users className="h-4 w-4 text-indigo-500" />}
        />
        <MetricCard 
          title="Total Legal Tasks" 
          value={metrics.legalTasks} 
          description="All assigned tasks" 
          icon={<CheckSquare className="h-4 w-4 text-legal-light" />}
        />
        <MetricCard 
          title="Pending Tasks" 
          value={metrics.pendingTasks} 
          description="Tasks in progress" 
          icon={<CheckSquare className="h-4 w-4 text-orange-500" />}
        />
        <MetricCard 
          title="Total Legal Documents" 
          value={metrics.legalDocuments} 
          description="Across all cases" 
          icon={<FileText className="h-4 w-4 text-blue-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Case Status</CardTitle>
            <CardDescription>Distribution of cases by status</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Count</TableHead>
                  <TableHead className="text-right">Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {caseStatusData.map((row) => (
                  <TableRow key={row.status}>
                    <TableCell>{row.status}</TableCell>
                    <TableCell className="text-right">{row.count}</TableCell>
                    <TableCell className="text-right">{row.percentage}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Case Priority</CardTitle>
            <CardDescription>Distribution of cases by priority</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Priority</TableHead>
                  <TableHead className="text-right">Count</TableHead>
                  <TableHead className="text-right">Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {casePriorityData.map((row) => (
                  <TableRow key={row.priority}>
                    <TableCell>{row.priority}</TableCell>
                    <TableCell className="text-right">{row.count}</TableCell>
                    <TableCell className="text-right">{row.percentage}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Case Impact</CardTitle>
            <CardDescription>Distribution of cases by impact level</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Impact</TableHead>
                  <TableHead className="text-right">Count</TableHead>
                  <TableHead className="text-right">Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {caseImpactData.map((row) => (
                  <TableRow key={row.impact}>
                    <TableCell>{row.impact}</TableCell>
                    <TableCell className="text-right">{row.count}</TableCell>
                    <TableCell className="text-right">{row.percentage}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CaseMetrics;
