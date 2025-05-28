
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const TimekeeperProductivityReport = () => {
  const [period, setPeriod] = useState('current-month');
  const [timekeeper, setTimekeeper] = useState('all');
  
  const productivityData = [
    {
      name: "Sarah Johnson",
      role: "Senior Partner",
      billableHours: 165,
      nonBillableHours: 25,
      totalHours: 190,
      billableRate: 450,
      revenue: 74250,
      utilizationRate: 86.8,
      target: 160,
      efficiency: 103.1,
      clientCount: 8
    },
    {
      name: "Michael Chen",
      role: "Associate",
      billableHours: 185,
      nonBillableHours: 15,
      totalHours: 200,
      billableRate: 350,
      revenue: 64750,
      utilizationRate: 92.5,
      target: 180,
      efficiency: 102.8,
      clientCount: 12
    },
    {
      name: "Emily Davis",
      role: "Senior Associate",
      billableHours: 155,
      nonBillableHours: 35,
      totalHours: 190,
      billableRate: 400,
      revenue: 62000,
      utilizationRate: 81.6,
      target: 160,
      efficiency: 96.9,
      clientCount: 6
    },
    {
      name: "David Wilson",
      role: "Partner",
      billableHours: 140,
      nonBillableHours: 45,
      totalHours: 185,
      billableRate: 475,
      revenue: 66500,
      utilizationRate: 75.7,
      target: 150,
      efficiency: 93.3,
      clientCount: 5
    },
    {
      name: "Lisa Martinez",
      role: "Associate",
      billableHours: 170,
      nonBillableHours: 20,
      totalHours: 190,
      billableRate: 325,
      revenue: 55250,
      utilizationRate: 89.5,
      target: 180,
      efficiency: 94.4,
      clientCount: 9
    }
  ];

  const weeklyTrend = [
    { week: 'Week 1', billable: 42, nonBillable: 8 },
    { week: 'Week 2', billable: 45, nonBillable: 5 },
    { week: 'Week 3', billable: 38, nonBillable: 12 },
    { week: 'Week 4', billable: 40, nonBillable: 10 }
  ];

  const revenueData = productivityData.map(tk => ({
    name: tk.name.split(' ')[0],
    revenue: tk.revenue,
    hours: tk.billableHours
  }));

  const timekeepers = productivityData.map(tk => tk.name);
  
  const filteredData = timekeeper === 'all' 
    ? productivityData 
    : productivityData.filter(tk => tk.name === timekeeper);

  const totalRevenue = filteredData.reduce((sum, tk) => sum + tk.revenue, 0);
  const totalBillableHours = filteredData.reduce((sum, tk) => sum + tk.billableHours, 0);
  const avgUtilization = filteredData.reduce((sum, tk) => sum + tk.utilizationRate, 0) / filteredData.length;
  const avgEfficiency = filteredData.reduce((sum, tk) => sum + tk.efficiency, 0) / filteredData.length;

  return (
    <ReportLayout
      title="Timekeeper Productivity Report"
      description="Individual attorney and staff productivity metrics"
      filterable
      dateFilterable
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Billable Hours</p>
            <p className="text-2xl font-bold">{totalBillableHours}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Avg Utilization</p>
            <p className="text-2xl font-bold">{avgUtilization.toFixed(1)}%</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Avg Efficiency</p>
            <p className="text-2xl font-bold">{avgEfficiency.toFixed(1)}%</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-month">Current Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timekeeper} onValueChange={setTimekeeper}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Timekeeper" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Timekeepers</SelectItem>
              {timekeepers.map(tk => (
                <SelectItem key={tk} value={tk}>{tk}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="text-lg font-medium mb-4">Revenue by Timekeeper</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                <Bar dataKey="revenue" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <h3 className="text-lg font-medium mb-4">Weekly Hours Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="billable" stroke="#8884d8" name="Billable" strokeWidth={2} />
                <Line type="monotone" dataKey="nonBillable" stroke="#82ca9d" name="Non-Billable" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Top Performers - Utilization</h4>
            {productivityData
              .sort((a, b) => b.utilizationRate - a.utilizationRate)
              .slice(0, 3)
              .map((tk, index) => (
                <div key={tk.name} className="flex justify-between items-center py-2">
                  <span className="text-sm">{index + 1}. {tk.name}</span>
                  <span className="font-medium">{tk.utilizationRate.toFixed(1)}%</span>
                </div>
              ))}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Top Performers - Revenue</h4>
            {productivityData
              .sort((a, b) => b.revenue - a.revenue)
              .slice(0, 3)
              .map((tk, index) => (
                <div key={tk.name} className="flex justify-between items-center py-2">
                  <span className="text-sm">{index + 1}. {tk.name}</span>
                  <span className="font-medium">${tk.revenue.toLocaleString()}</span>
                </div>
              ))}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Target Achievement</h4>
            {productivityData
              .sort((a, b) => b.efficiency - a.efficiency)
              .slice(0, 3)
              .map((tk, index) => (
                <div key={tk.name} className="flex justify-between items-center py-2">
                  <span className="text-sm">{index + 1}. {tk.name}</span>
                  <span className="font-medium">{tk.efficiency.toFixed(1)}%</span>
                </div>
              ))}
          </div>
        </div>

        {/* Detailed Productivity Table */}
        <div>
          <h3 className="text-lg font-medium mb-3">Productivity Details</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timekeeper</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Billable Hours</TableHead>
                <TableHead className="text-right">Non-Billable</TableHead>
                <TableHead className="text-right">Rate</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Utilization</TableHead>
                <TableHead className="text-right">Target</TableHead>
                <TableHead>Efficiency</TableHead>
                <TableHead className="text-right">Clients</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map(timekeeper => (
                <TableRow key={timekeeper.name}>
                  <TableCell className="font-medium">{timekeeper.name}</TableCell>
                  <TableCell>{timekeeper.role}</TableCell>
                  <TableCell className="text-right font-medium">{timekeeper.billableHours}</TableCell>
                  <TableCell className="text-right">{timekeeper.nonBillableHours}</TableCell>
                  <TableCell className="text-right">${timekeeper.billableRate}</TableCell>
                  <TableCell className="text-right font-bold text-green-600">
                    ${timekeeper.revenue.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">{timekeeper.utilizationRate.toFixed(1)}%</TableCell>
                  <TableCell className="text-right">{timekeeper.target}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={Math.min(timekeeper.efficiency, 100)} className="w-16 h-2" />
                      <span className={`text-sm font-medium ${timekeeper.efficiency >= 100 ? 'text-green-600' : 'text-orange-600'}`}>
                        {timekeeper.efficiency.toFixed(1)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{timekeeper.clientCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </ReportLayout>
  );
};

export default TimekeeperProductivityReport;
