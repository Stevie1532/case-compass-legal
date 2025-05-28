
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const ARAgingSummaryReport = () => {
  const [agingPeriod, setAgingPeriod] = useState('30-days');
  const [client, setClient] = useState('all');
  
  // Sample data
  const agingData = [
    {
      id: "AG-001",
      client: "ABC Corporation",
      clientId: "CL-10025",
      current: 15000,
      days30: 8500,
      days60: 3200,
      days90: 1800,
      over90: 500,
      totalOutstanding: 28000,
      lastPayment: "2024-01-15",
      creditLimit: 50000
    },
    {
      id: "AG-002",
      client: "XYZ Industries",
      clientId: "CL-10026",
      current: 22000,
      days30: 12000,
      days60: 5500,
      days90: 0,
      over90: 0,
      totalOutstanding: 39500,
      lastPayment: "2024-01-20",
      creditLimit: 75000
    },
    {
      id: "AG-003",
      client: "Smith & Associates",
      clientId: "CL-10027",
      current: 8500,
      days30: 4200,
      days60: 2100,
      days90: 1500,
      over90: 2200,
      totalOutstanding: 18500,
      lastPayment: "2023-12-10",
      creditLimit: 30000
    },
    {
      id: "AG-004",
      client: "Johnson Family Trust",
      clientId: "CL-10028",
      current: 5200,
      days30: 0,
      days60: 0,
      days90: 0,
      over90: 0,
      totalOutstanding: 5200,
      lastPayment: "2024-01-25",
      creditLimit: 15000
    }
  ];

  const clients = [...new Set(agingData.map(item => item.client))];
  
  const filteredData = client === 'all' 
    ? agingData 
    : agingData.filter(item => item.client === client);

  // Calculate totals
  const totals = filteredData.reduce((acc, item) => ({
    current: acc.current + item.current,
    days30: acc.days30 + item.days30,
    days60: acc.days60 + item.days60,
    days90: acc.days90 + item.days90,
    over90: acc.over90 + item.over90,
    total: acc.total + item.totalOutstanding
  }), { current: 0, days30: 0, days60: 0, days90: 0, over90: 0, total: 0 });

  // Chart data for aging buckets
  const chartData = [
    { name: 'Current', value: totals.current, color: '#22c55e' },
    { name: '1-30 Days', value: totals.days30, color: '#3b82f6' },
    { name: '31-60 Days', value: totals.days60, color: '#f59e0b' },
    { name: '61-90 Days', value: totals.days90, color: '#ef4444' },
    { name: '90+ Days', value: totals.over90, color: '#7c2d12' }
  ];

  // Bar chart data
  const barData = filteredData.map(item => ({
    client: item.client,
    current: item.current,
    days30: item.days30,
    days60: item.days60,
    days90: item.days90,
    over90: item.over90
  }));

  const getRiskLevel = (item: any) => {
    const overdue = item.days30 + item.days60 + item.days90 + item.over90;
    const overduePercentage = (overdue / item.totalOutstanding) * 100;
    
    if (overduePercentage === 0) return { level: 'Low', color: 'bg-green-100 text-green-800' };
    if (overduePercentage < 25) return { level: 'Medium', color: 'bg-yellow-100 text-yellow-800' };
    if (overduePercentage < 50) return { level: 'High', color: 'bg-orange-100 text-orange-800' };
    return { level: 'Critical', color: 'bg-red-100 text-red-800' };
  };

  return (
    <ReportLayout
      title="AR Aging Summary Report"
      description="Summary of accounts receivable aging across all clients"
      filterable
      dateFilterable
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Current</p>
            <p className="text-2xl font-bold">${totals.current.toLocaleString()}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">1-30 Days</p>
            <p className="text-2xl font-bold">${totals.days30.toLocaleString()}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">31-60 Days</p>
            <p className="text-2xl font-bold">${totals.days60.toLocaleString()}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">61-90 Days</p>
            <p className="text-2xl font-bold">${totals.days90.toLocaleString()}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">90+ Days</p>
            <p className="text-2xl font-bold">${totals.over90.toLocaleString()}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Aging Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Amount']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">AR by Client</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="client" />
                  <YAxis />
                  <RechartsTooltip 
                    formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Amount']}
                  />
                  <Bar dataKey="current" stackId="a" fill="#22c55e" name="Current" />
                  <Bar dataKey="days30" stackId="a" fill="#3b82f6" name="1-30 Days" />
                  <Bar dataKey="days60" stackId="a" fill="#f59e0b" name="31-60 Days" />
                  <Bar dataKey="days90" stackId="a" fill="#ef4444" name="61-90 Days" />
                  <Bar dataKey="over90" stackId="a" fill="#7c2d12" name="90+ Days" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Detailed Table */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium">Aging Details</h3>
            <Select value={client} onValueChange={setClient}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Clients</SelectItem>
                {clients.map(clientName => (
                  <SelectItem key={clientName} value={clientName}>{clientName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead className="text-right">Current</TableHead>
                <TableHead className="text-right">1-30 Days</TableHead>
                <TableHead className="text-right">31-60 Days</TableHead>
                <TableHead className="text-right">61-90 Days</TableHead>
                <TableHead className="text-right">90+ Days</TableHead>
                <TableHead className="text-right">Total Outstanding</TableHead>
                <TableHead>Last Payment</TableHead>
                <TableHead>Risk Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map(item => {
                const risk = getRiskLevel(item);
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.client}</TableCell>
                    <TableCell className="text-right">${item.current.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${item.days30.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${item.days60.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${item.days90.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${item.over90.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-medium">${item.totalOutstanding.toLocaleString()}</TableCell>
                    <TableCell>{item.lastPayment}</TableCell>
                    <TableCell>
                      <Badge className={risk.color}>{risk.level}</Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </ReportLayout>
  );
};

export default ARAgingSummaryReport;
