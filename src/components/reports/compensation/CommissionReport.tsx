import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

const CommissionReport = () => {
  const [employee, setEmployee] = useState('all');
  const [period, setPeriod] = useState('current-quarter');
  
  // Sample data
  const commissionData = [
    {
      id: "COMM-001",
      employee: "John Smith",
      title: "Senior Partner",
      baseSalary: 120000,
      commissionRate: 0.15,
      revenue: 245000,
      commission: 36750,
      totalCompensation: 156750,
      target: 200000,
      achievement: 122.5
    },
    {
      id: "COMM-002",
      employee: "Sarah Johnson",
      title: "Associate",
      baseSalary: 85000,
      commissionRate: 0.12,
      revenue: 180000,
      commission: 21600,
      totalCompensation: 106600,
      target: 150000,
      achievement: 120.0
    },
    {
      id: "COMM-003",
      employee: "Michael Chen",
      title: "Partner",
      baseSalary: 110000,
      commissionRate: 0.18,
      revenue: 320000,
      commission: 57600,
      totalCompensation: 167600,
      target: 300000,
      achievement: 106.7
    },
    {
      id: "COMM-004",
      employee: "Jessica Taylor",
      title: "Senior Associate",
      baseSalary: 95000,
      commissionRate: 0.10,
      revenue: 165000,
      commission: 16500,
      totalCompensation: 111500,
      target: 175000,
      achievement: 94.3
    }
  ];

  const employees = [...new Set(commissionData.map(comm => comm.employee))];
  
  const filteredCommissions = employee === 'all' 
    ? commissionData 
    : commissionData.filter(comm => comm.employee === employee);

  // Quarterly trends
  const quarterlyData = [
    { quarter: 'Q1 2023', commission: 95000, revenue: 850000 },
    { quarter: 'Q2 2023', commission: 108000, revenue: 920000 },
    { quarter: 'Q3 2023', commission: 118000, revenue: 980000 },
    { quarter: 'Q4 2023', commission: 132450, revenue: 910000 }
  ];

  const totalCommission = filteredCommissions.reduce((sum, comm) => sum + comm.commission, 0);
  const totalRevenue = filteredCommissions.reduce((sum, comm) => sum + comm.revenue, 0);
  const avgAchievement = filteredCommissions.reduce((sum, comm) => sum + comm.achievement, 0) / filteredCommissions.length;

  return (
    <ReportLayout
      title="Commission Report"
      description="Analysis of employee commissions and performance against targets"
      filterable
      dateFilterable
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Commission</p>
            <p className="text-2xl font-bold">${totalCommission.toFixed(2)}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Revenue Generated</p>
            <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Avg Achievement</p>
            <p className="text-2xl font-bold">{avgAchievement.toFixed(1)}%</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Commission Rate</p>
            <p className="text-2xl font-bold">{((totalCommission / totalRevenue) * 100).toFixed(1)}%</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Commission by Employee</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredCommissions} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="employee" width={100} />
                  <RechartsTooltip 
                    formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Commission']}
                  />
                  <Bar dataKey="commission" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Quarterly Commission Trends</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={quarterlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <RechartsTooltip formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Amount']} />
                  <Line type="monotone" dataKey="commission" stroke="#8884d8" name="Commission" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Commission Details Table */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium">Commission Details</h3>
            <Select value={employee} onValueChange={setEmployee}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by employee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Employees</SelectItem>
                {employees.map(emp => (
                  <SelectItem key={emp} value={emp}>{emp}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="text-right">Base Salary</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Commission Rate</TableHead>
                <TableHead className="text-right">Commission</TableHead>
                <TableHead className="text-right">Total Comp</TableHead>
                <TableHead className="text-right">Target Achievement</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCommissions.map(comm => (
                <TableRow key={comm.id}>
                  <TableCell className="font-medium">{comm.employee}</TableCell>
                  <TableCell>{comm.title}</TableCell>
                  <TableCell className="text-right">${comm.baseSalary.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${comm.revenue.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{(comm.commissionRate * 100).toFixed(1)}%</TableCell>
                  <TableCell className="text-right">${comm.commission.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${comm.totalCompensation.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-2">
                      <span className={comm.achievement >= 100 ? 'text-green-600' : 'text-red-600'}>
                        {comm.achievement.toFixed(1)}%
                      </span>
                      <Progress 
                        value={Math.min(comm.achievement, 150)} 
                        className="w-16 h-2" 
                      />
                    </div>
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

export default CommissionReport;
