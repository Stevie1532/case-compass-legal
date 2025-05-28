
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ProfitLossByLocationReport = () => {
  const [selectedLocation, setSelectedLocation] = useState('all');
  
  const locationData = [
    {
      location: 'New York Office',
      revenue: 850000,
      expenses: 520000,
      profit: 330000,
      margin: 38.8
    },
    {
      location: 'Los Angeles Office',
      revenue: 720000,
      expenses: 480000,
      profit: 240000,
      margin: 33.3
    },
    {
      location: 'Chicago Office',
      revenue: 620000,
      expenses: 420000,
      profit: 200000,
      margin: 32.3
    },
    {
      location: 'Remote Workers',
      revenue: 180000,
      expenses: 85000,
      profit: 95000,
      margin: 52.8
    }
  ];

  const chartData = locationData.map(item => ({
    name: item.location.replace(' Office', ''),
    Revenue: item.revenue,
    Expenses: item.expenses,
    Profit: item.profit
  }));

  const pieData = locationData.map((item, index) => ({
    name: item.location,
    value: item.profit,
    color: ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'][index]
  }));

  const filteredData = selectedLocation === 'all' 
    ? locationData 
    : locationData.filter(item => item.location === selectedLocation);

  return (
    <ReportLayout
      title="Profit & Loss by Location"
      description="Compare profitability across different office locations"
      filterable
      dateFilterable
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold">${locationData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Expenses</p>
            <p className="text-2xl font-bold">${locationData.reduce((sum, item) => sum + item.expenses, 0).toLocaleString()}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Net Profit</p>
            <p className="text-2xl font-bold">${locationData.reduce((sum, item) => sum + item.profit, 0).toLocaleString()}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Avg Margin</p>
            <p className="text-2xl font-bold">{(locationData.reduce((sum, item) => sum + item.margin, 0) / locationData.length).toFixed(1)}%</p>
          </div>
        </div>

        {/* Location Filter */}
        <div className="flex gap-4">
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locationData.map(location => (
                <SelectItem key={location.location} value={location.location}>
                  {location.location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="text-lg font-medium mb-4">Revenue vs Expenses by Location</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                <Bar dataKey="Revenue" fill="#8884d8" />
                <Bar dataKey="Expenses" fill="#82ca9d" />
                <Bar dataKey="Profit" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <h3 className="text-lg font-medium mb-4">Profit Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({name, value}) => `${name}: $${Number(value).toLocaleString()}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Table */}
        <div>
          <h3 className="text-lg font-medium mb-3">Location Performance Details</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Expenses</TableHead>
                <TableHead className="text-right">Net Profit</TableHead>
                <TableHead className="text-right">Profit Margin</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map(location => (
                <TableRow key={location.location}>
                  <TableCell className="font-medium">{location.location}</TableCell>
                  <TableCell className="text-right">${location.revenue.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${location.expenses.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-medium text-green-600">
                    ${location.profit.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">{location.margin}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </ReportLayout>
  );
};

export default ProfitLossByLocationReport;
