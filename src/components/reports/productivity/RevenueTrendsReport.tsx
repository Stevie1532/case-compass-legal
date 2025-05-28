import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, LineChart, Line } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

const RevenueTrendsReport = () => {
  const [period, setPeriod] = useState('monthly');
  const [department, setDepartment] = useState('all');
  
  // Sample data
  const revenueData = [
    { month: 'Jan', litigation: 85000, corporate: 120000, family: 45000, criminal: 32000, realEstate: 28000, total: 310000 },
    { month: 'Feb', litigation: 92000, corporate: 115000, family: 48000, criminal: 35000, realEestate: 31000, total: 321000 },
    { month: 'Mar', litigation: 88000, corporate: 135000, family: 52000, criminal: 38000, realEstate: 29000, total: 342000 },
    { month: 'Apr', litigation: 95000, corporate: 142000, family: 49000, criminal: 41000, realEstate: 33000, total: 360000 },
    { month: 'May', litigation: 98000, corporate: 138000, family: 55000, criminal: 39000, realEstate: 35000, total: 365000 },
    { month: 'Jun', litigation: 102000, corporate: 145000, family: 58000, criminal: 42000, realEstate: 38000, total: 385000 }
  ];

  const departmentData = [
    { department: 'Corporate Law', revenue: 795000, growth: 8.2, cases: 45, avgRate: 425 },
    { department: 'Litigation', revenue: 560000, growth: 12.5, cases: 32, avgRate: 385 },
    { department: 'Family Law', revenue: 317000, growth: 15.3, cases: 28, avgRate: 295 },
    { department: 'Criminal Law', revenue: 227000, growth: 22.1, cases: 24, avgRate: 275 },
    { department: 'Real Estate', revenue: 194000, growth: 18.7, cases: 19, avgRate: 325 }
  ];

  const clientRevenueData = [
    { client: 'ABC Corporation', revenue: 125000, percentage: 32.5, matters: 3 },
    { client: 'XYZ Industries', revenue: 98000, percentage: 25.5, matters: 2 },
    { client: 'Smith & Associates', revenue: 76000, percentage: 19.7, matters: 4 },
    { client: 'Johnson Family Trust', revenue: 45000, percentage: 11.7, matters: 1 },
    { client: 'Tech Innovations LLC', revenue: 41000, percentage: 10.6, matters: 2 }
  ];

  const filteredData = department === 'all' ? revenueData : revenueData;
  const totalRevenue = revenueData.reduce((sum, month) => sum + month.total, 0);
  const avgMonthlyGrowth = 12.8;
  const currentMonthRevenue = revenueData[revenueData.length - 1].total;

  return (
    <ReportLayout
      title="Revenue Trends Report"
      description="Analysis of revenue trends across departments and time periods"
      filterable
      dateFilterable
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Revenue (YTD)</p>
            <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Current Month</p>
            <p className="text-2xl font-bold">${currentMonthRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Avg Monthly Growth</p>
            <p className="text-2xl font-bold">{avgMonthlyGrowth}%</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Avg Monthly Revenue</p>
            <p className="text-2xl font-bold">${(totalRevenue / revenueData.length).toLocaleString()}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium">Revenue Trends by Department</h3>
              <div className="flex gap-2">
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="corporate">Corporate Law</SelectItem>
                    <SelectItem value="litigation">Litigation</SelectItem>
                    <SelectItem value="family">Family Law</SelectItem>
                    <SelectItem value="criminal">Criminal Law</SelectItem>
                    <SelectItem value="realEstate">Real Estate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Area type="monotone" dataKey="litigation" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="corporate" stackId="1" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="family" stackId="1" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Department Performance</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <RechartsTooltip formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Revenue']} />
                    <Bar dataKey="revenue" name="Revenue">
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${index * 60}, 70%, 50%)`} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Top Clients by Revenue</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={clientRevenueData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="client" width={120} />
                    <RechartsTooltip formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Revenue']} />
                    <Bar dataKey="revenue" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Department Performance Table */}
        <div>
          <h3 className="text-lg font-medium mb-3">Department Revenue Analysis</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Revenue (YTD)</TableHead>
                <TableHead className="text-right">Growth Rate</TableHead>
                <TableHead className="text-right">Active Cases</TableHead>
                <TableHead className="text-right">Avg Hourly Rate</TableHead>
                <TableHead>Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departmentData.map((dept) => (
                <TableRow key={dept.department}>
                  <TableCell className="font-medium">{dept.department}</TableCell>
                  <TableCell className="text-right">${dept.revenue.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <span className={dept.growth > 10 ? 'text-green-600' : 'text-blue-600'}>
                      +{dept.growth}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{dept.cases}</TableCell>
                  <TableCell className="text-right">${dept.avgRate}</TableCell>
                  <TableCell>
                    <Progress 
                      value={dept.growth * 4} 
                      className="w-20 h-2" 
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Client Revenue Breakdown */}
        <div>
          <h3 className="text-lg font-medium mb-3">Top Client Revenue Contributors</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Percentage</TableHead>
                <TableHead className="text-right">Active Matters</TableHead>
                <TableHead>Revenue Share</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientRevenueData.map((client) => (
                <TableRow key={client.client}>
                  <TableCell className="font-medium">{client.client}</TableCell>
                  <TableCell className="text-right">${client.revenue.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{client.percentage}%</TableCell>
                  <TableCell className="text-right">{client.matters}</TableCell>
                  <TableCell>
                    <Progress 
                      value={client.percentage} 
                      className="w-24 h-2" 
                    />
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

export default RevenueTrendsReport;
