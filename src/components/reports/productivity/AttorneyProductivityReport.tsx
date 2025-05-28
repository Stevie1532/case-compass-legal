
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

const AttorneyProductivityReport = () => {
  const [attorney, setAttorney] = useState('all');
  const [period, setPeriod] = useState('current-quarter');
  
  // Sample data
  const productivityData = [
    {
      id: "PROD-001",
      attorney: "Sarah Johnson",
      department: "Corporate Law",
      billableHours: 185,
      targetHours: 180,
      utilization: 92.5,
      revenue: 64750,
      targetRevenue: 63000,
      avgRate: 350,
      casesHandled: 12,
      completedCases: 8,
      clientSatisfaction: 4.8
    },
    {
      id: "PROD-002",
      attorney: "Michael Chen",
      department: "Litigation",
      billableHours: 172,
      targetHours: 175,
      utilization: 86.0,
      revenue: 60200,
      targetRevenue: 61250,
      avgRate: 350,
      casesHandled: 15,
      completedCases: 12,
      clientSatisfaction: 4.6
    },
    {
      id: "PROD-003",
      attorney: "Jessica Rodriguez",
      department: "Corporate Law",
      billableHours: 195,
      targetHours: 180,
      utilization: 97.5,
      revenue: 68250,
      targetRevenue: 63000,
      avgRate: 350,
      casesHandled: 10,
      completedCases: 7,
      clientSatisfaction: 4.9
    },
    {
      id: "PROD-004",
      attorney: "David Wilson",
      department: "IP Law",
      billableHours: 165,
      targetHours: 170,
      utilization: 82.5,
      revenue: 66000,
      targetRevenue: 68000,
      avgRate: 400,
      casesHandled: 8,
      completedCases: 6,
      clientSatisfaction: 4.7
    }
  ];

  const attorneys = [...new Set(productivityData.map(prod => prod.attorney))];
  
  const filteredData = attorney === 'all' 
    ? productivityData 
    : productivityData.filter(prod => prod.attorney === attorney);

  // Trend data for the chart
  const trendData = [
    { month: 'Oct', billableHours: 680, revenue: 238000 },
    { month: 'Nov', billableHours: 720, revenue: 252000 },
    { month: 'Dec', billableHours: 695, revenue: 243250 },
    { month: 'Jan', billableHours: 717, revenue: 259200 }
  ];

  const totalBillableHours = filteredData.reduce((sum, prod) => sum + prod.billableHours, 0);
  const totalRevenue = filteredData.reduce((sum, prod) => sum + prod.revenue, 0);
  const avgUtilization = filteredData.reduce((sum, prod) => sum + prod.utilization, 0) / filteredData.length;
  const avgSatisfaction = filteredData.reduce((sum, prod) => sum + prod.clientSatisfaction, 0) / filteredData.length;

  return (
    <ReportLayout
      title="Attorney Productivity Report"
      description="Comprehensive analysis of attorney performance and productivity metrics"
      filterable
      dateFilterable
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Billable Hours</p>
            <p className="text-2xl font-bold">{totalBillableHours}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Avg Utilization</p>
            <p className="text-2xl font-bold">{avgUtilization.toFixed(1)}%</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Client Satisfaction</p>
            <p className="text-2xl font-bold">{avgSatisfaction.toFixed(1)}/5.0</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Billable Hours by Attorney</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="attorney" width={120} />
                  <RechartsTooltip 
                    formatter={(value: any) => [`${Number(value)} hours`, 'Billable Hours']}
                  />
                  <Bar dataKey="billableHours" fill="#8884d8" />
                  <Bar dataKey="targetHours" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Monthly Productivity Trends</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="billableHours" stroke="#8884d8" name="Billable Hours" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Detailed Table */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium">Attorney Performance Details</h3>
            <Select value={attorney} onValueChange={setAttorney}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by attorney" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Attorneys</SelectItem>
                {attorneys.map(att => (
                  <SelectItem key={att} value={att}>{att}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Attorney</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Billable Hours</TableHead>
                <TableHead className="text-right">Utilization</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Cases Handled</TableHead>
                <TableHead className="text-right">Completion Rate</TableHead>
                <TableHead className="text-right">Satisfaction</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map(prod => (
                <TableRow key={prod.id}>
                  <TableCell className="font-medium">{prod.attorney}</TableCell>
                  <TableCell>{prod.department}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-2">
                      <span>{prod.billableHours}/{prod.targetHours}</span>
                      <Progress 
                        value={(prod.billableHours / prod.targetHours) * 100} 
                        className="w-16 h-2" 
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={prod.utilization >= 90 ? 'text-green-600' : prod.utilization >= 80 ? 'text-yellow-600' : 'text-red-600'}>
                      {prod.utilization}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right">${prod.revenue.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{prod.casesHandled}</TableCell>
                  <TableCell className="text-right">
                    {((prod.completedCases / prod.casesHandled) * 100).toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={prod.clientSatisfaction >= 4.5 ? 'text-green-600' : 'text-yellow-600'}>
                      {prod.clientSatisfaction}/5.0
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </ReportLayout>
  );
};

export default AttorneyProductivityReport;
