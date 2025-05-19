
import React from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CaseProductivityReport = () => {
  // Sample data - would come from API in real app
  const caseData = [
    {
      name: "Corporate Law",
      casesAssigned: 48,
      casesCompleted: 35,
      avgDuration: 65,
      targetDuration: 75,
      efficiency: 115,
      backlog: 13
    },
    {
      name: "Litigation",
      casesAssigned: 62,
      casesCompleted: 45,
      avgDuration: 120,
      targetDuration: 105,
      efficiency: 88,
      backlog: 17
    },
    {
      name: "IP Law",
      casesAssigned: 35,
      casesCompleted: 30,
      avgDuration: 45,
      targetDuration: 50,
      efficiency: 111,
      backlog: 5
    },
    {
      name: "Family Law",
      casesAssigned: 42,
      casesCompleted: 38,
      avgDuration: 30,
      targetDuration: 35,
      efficiency: 117,
      backlog: 4
    },
    {
      name: "Real Estate",
      casesAssigned: 28,
      casesCompleted: 22,
      avgDuration: 40,
      targetDuration: 40,
      efficiency: 100,
      backlog: 6
    }
  ];
  
  const [period, setPeriod] = React.useState("ytd");
  
  // Calculate totals
  const totalAssigned = caseData.reduce((sum, dept) => sum + dept.casesAssigned, 0);
  const totalCompleted = caseData.reduce((sum, dept) => sum + dept.casesCompleted, 0);
  const totalBacklog = caseData.reduce((sum, dept) => sum + dept.backlog, 0);
  const avgEfficiency = caseData.reduce((sum, dept) => sum + dept.efficiency, 0) / caseData.length;
  
  const completionRate = ((totalCompleted / totalAssigned) * 100).toFixed(1);
  
  // Format for chart
  const chartData = caseData.map(dept => ({
    name: dept.name,
    Assigned: dept.casesAssigned,
    Completed: dept.casesCompleted,
    Backlog: dept.backlog
  }));

  return (
    <ReportLayout
      title="Case Productivity Report"
      description="Analysis of case processing efficiency by department"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Productivity Analysis</h3>
          </div>
          <div className="w-[180px]">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger>
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ytd">Year to Date</SelectItem>
                <SelectItem value="q1">Q1 2025</SelectItem>
                <SelectItem value="q2">Q2 2025</SelectItem>
                <SelectItem value="q3">Q3 2025</SelectItem>
                <SelectItem value="q4">Q4 2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Cases Assigned</p>
            <p className="text-2xl font-bold">{totalAssigned}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Cases Completed</p>
            <p className="text-2xl font-bold">{totalCompleted}</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Current Backlog</p>
            <p className="text-2xl font-bold">{totalBacklog}</p>
          </div>
          <div className={`p-4 rounded-lg ${avgEfficiency >= 100 ? 'bg-green-50' : 'bg-amber-50'}`}>
            <p className="text-sm text-muted-foreground">Average Efficiency</p>
            <p className="text-2xl font-bold">{avgEfficiency.toFixed(1)}%</p>
          </div>
        </div>
        
        <div className="h-72">
          <h3 className="text-lg font-medium mb-3">Department Case Distribution</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Assigned" stackId="a" fill="#3b82f6" />
              <Bar dataKey="Completed" stackId="b" fill="#10b981" />
              <Bar dataKey="Backlog" stackId="c" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Department Performance</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Assigned</TableHead>
                <TableHead className="text-right">Completed</TableHead>
                <TableHead>Completion Rate</TableHead>
                <TableHead className="text-right">Avg Duration</TableHead>
                <TableHead>Efficiency</TableHead>
                <TableHead className="text-right">Backlog</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {caseData.map(dept => {
                const deptCompletionRate = (dept.casesCompleted / dept.casesAssigned) * 100;
                
                return (
                  <TableRow key={dept.name}>
                    <TableCell className="font-medium">{dept.name}</TableCell>
                    <TableCell className="text-right">{dept.casesAssigned}</TableCell>
                    <TableCell className="text-right">{dept.casesCompleted}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={deptCompletionRate} 
                          className="h-2" 
                        />
                        <span className="text-xs font-medium">
                          {deptCompletionRate.toFixed(1)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {dept.avgDuration} days
                      <span className="text-xs text-muted-foreground ml-1">
                        (target: {dept.targetDuration})
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className={`text-sm font-medium ${dept.efficiency >= 100 ? 'text-green-600' : 'text-amber-600'}`}>
                        {dept.efficiency}%
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{dept.backlog}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Productivity Notes</h3>
          <p className="text-sm text-muted-foreground">
            <strong>Efficiency Rating:</strong> Calculated as target duration ÷ actual duration × 100%. 
            Values over 100% indicate cases are being resolved faster than targeted timeframes.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            <strong>Overall Completion Rate:</strong> {completionRate}% of assigned cases have been completed during this period.
          </p>
        </div>
      </div>
    </ReportLayout>
  );
};

export default CaseProductivityReport;
