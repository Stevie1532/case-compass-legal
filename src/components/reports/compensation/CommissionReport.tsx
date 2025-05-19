
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CommissionReport = () => {
  const [timeframe, setTimeframe] = useState('current-month');
  const [userFilter, setUserFilter] = useState('all');
  
  // Sample data
  const commissionData = [
    {
      employeeId: "EMP-001",
      name: "John Smith",
      department: "Corporate",
      salesAmount: 125000.00,
      commissionRate: 0.05,
      commission: 6250.00,
      tier: "Senior",
    },
    {
      employeeId: "EMP-002",
      name: "Sarah Johnson",
      department: "Family Law",
      salesAmount: 87500.00,
      commissionRate: 0.04,
      commission: 3500.00,
      tier: "Mid-level",
    },
    {
      employeeId: "EMP-003",
      name: "Michael Chen",
      department: "Criminal",
      salesAmount: 210000.00,
      commissionRate: 0.06,
      commission: 12600.00,
      tier: "Executive",
    },
    {
      employeeId: "EMP-004",
      name: "Jessica Taylor",
      department: "Corporate",
      salesAmount: 95000.00,
      commissionRate: 0.04,
      commission: 3800.00,
      tier: "Mid-level",
    },
    {
      employeeId: "EMP-005",
      name: "David Wilson",
      department: "Real Estate",
      salesAmount: 150000.00,
      commissionRate: 0.05,
      commission: 7500.00,
      tier: "Senior",
    },
    {
      employeeId: "EMP-006",
      name: "Emily Rodriguez",
      department: "Tax",
      salesAmount: 175000.00,
      commissionRate: 0.055,
      commission: 9625.00,
      tier: "Senior",
    },
  ];
  
  const filteredData = commissionData.filter(employee => {
    return userFilter === 'all' || employee.tier === userFilter;
  });
  
  const chartColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#FFBB28'];
  
  const chartData = filteredData.map(employee => ({
    name: employee.name,
    commission: employee.commission,
  }));
  
  const totals = filteredData.reduce(
    (acc, curr) => ({
      salesAmount: acc.salesAmount + curr.salesAmount,
      commission: acc.commission + curr.commission,
    }),
    { salesAmount: 0, commission: 0 }
  );

  return (
    <ReportLayout
      title="Sales Commission Report"
      description="Analysis of commission earnings by employee"
      filterable
      dateFilterable
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-medium mb-1">Commission Summary</h3>
            <p className="text-sm text-muted-foreground">
              Showing data for {timeframe === 'current-month' ? 'Current Month' : 
                            timeframe === 'last-quarter' ? 'Last Quarter' : 'Year to Date'}
            </p>
          </div>
          <div className="flex gap-2">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-month">Current Month</SelectItem>
                <SelectItem value="last-quarter">Last Quarter</SelectItem>
                <SelectItem value="ytd">Year to Date</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={userFilter} onValueChange={setUserFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="Executive">Executive</SelectItem>
                <SelectItem value="Senior">Senior</SelectItem>
                <SelectItem value="Mid-level">Mid-level</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Sales Amount</p>
            <p className="text-2xl font-bold">${totals.salesAmount.toFixed(2)}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Commission Paid</p>
            <p className="text-2xl font-bold">${totals.commission.toFixed(2)}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Average Commission Rate</p>
            <p className="text-2xl font-bold">
              {(totals.commission / totals.salesAmount * 100).toFixed(2)}%
            </p>
          </div>
        </div>
        
        <div className="h-80">
          <h3 className="text-lg font-medium mb-3">Commission by Employee</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              <Bar dataKey="commission" name="Commission Amount">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Commission Details</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead className="text-right">Sales Amount</TableHead>
                <TableHead className="text-right">Rate</TableHead>
                <TableHead className="text-right">Commission</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map(employee => (
                <TableRow key={employee.employeeId}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.tier}</TableCell>
                  <TableCell className="text-right">${employee.salesAmount.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{(employee.commissionRate * 100).toFixed(2)}%</TableCell>
                  <TableCell className="text-right font-medium">${employee.commission.toFixed(2)}</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-gray-50 font-medium">
                <TableCell colSpan={3}>Totals</TableCell>
                <TableCell className="text-right">${totals.salesAmount.toFixed(2)}</TableCell>
                <TableCell className="text-right">—</TableCell>
                <TableCell className="text-right">${totals.commission.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </ReportLayout>
  );
};

export default CommissionReport;
