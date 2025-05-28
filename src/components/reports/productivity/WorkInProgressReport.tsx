
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const WorkInProgressReport = () => {
  const [filterBy, setFilterBy] = useState('all');
  const [attorney, setAttorney] = useState('all');
  
  const wipData = [
    {
      matterId: "MAT-2024-001",
      clientName: "ABC Corporation",
      matterName: "Contract Dispute",
      attorney: "Sarah Johnson",
      startDate: "2024-01-05",
      totalHours: 45.5,
      billableRate: 450,
      totalValue: 20475,
      billedAmount: 0,
      wipAmount: 20475,
      lastActivity: "2024-01-20",
      status: "Active",
      percentage: 65
    },
    {
      matterId: "MAT-2024-002", 
      clientName: "XYZ Industries",
      matterName: "IP Litigation",
      attorney: "Michael Chen",
      startDate: "2023-12-15",
      totalHours: 128.0,
      billableRate: 475,
      totalValue: 60800,
      billedAmount: 40000,
      wipAmount: 20800,
      lastActivity: "2024-01-19",
      status: "Active",
      percentage: 85
    },
    {
      matterId: "MAT-2024-003",
      clientName: "Smith & Associates", 
      matterName: "Corporate Merger",
      attorney: "Emily Davis",
      startDate: "2024-01-10",
      totalHours: 89.25,
      billableRate: 425,
      totalValue: 37931,
      billedAmount: 15000,
      wipAmount: 22931,
      lastActivity: "2024-01-18",
      status: "Active",
      percentage: 45
    },
    {
      matterId: "MAT-2023-098",
      clientName: "Tech Startup LLC",
      matterName: "Securities Filing",
      attorney: "David Wilson",
      startDate: "2023-11-20",
      totalHours: 156.75,
      billableRate: 400,
      totalValue: 62700,
      billedAmount: 62700,
      wipAmount: 0,
      lastActivity: "2024-01-15",
      status: "Completed",
      percentage: 100
    },
    {
      matterId: "MAT-2024-004",
      clientName: "Regional Bank",
      matterName: "Regulatory Compliance",
      attorney: "Lisa Martinez",
      startDate: "2024-01-08",
      totalHours: 72.5,
      billableRate: 450,
      totalValue: 32625,
      billedAmount: 0,
      wipAmount: 32625,
      lastActivity: "2024-01-17",
      status: "Active",
      percentage: 30
    }
  ];

  const attorneyData = [
    { name: 'Sarah Johnson', wip: 20475, matters: 1 },
    { name: 'Michael Chen', wip: 20800, matters: 1 },
    { name: 'Emily Davis', wip: 22931, matters: 1 },
    { name: 'David Wilson', wip: 0, matters: 0 },
    { name: 'Lisa Martinez', wip: 32625, matters: 1 }
  ];

  const statusData = [
    { name: 'Active', value: wipData.filter(m => m.status === 'Active').length, color: '#8884d8' },
    { name: 'Completed', value: wipData.filter(m => m.status === 'Completed').length, color: '#82ca9d' }
  ];

  const attorneys = [...new Set(wipData.map(item => item.attorney))];
  
  const filteredData = wipData.filter(matter => 
    (filterBy === 'all' || matter.status === filterBy) &&
    (attorney === 'all' || matter.attorney === attorney)
  );

  const totalWIP = filteredData.reduce((sum, matter) => sum + matter.wipAmount, 0);
  const totalValue = filteredData.reduce((sum, matter) => sum + matter.totalValue, 0);
  const totalBilled = filteredData.reduce((sum, matter) => sum + matter.billedAmount, 0);
  const activeMatters = filteredData.filter(matter => matter.status === 'Active').length;

  return (
    <ReportLayout
      title="Work in Progress Report"
      description="Unbilled time and expenses by matter and attorney"
      filterable
      dateFilterable
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total WIP</p>
            <p className="text-2xl font-bold">${totalWIP.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Billed</p>
            <p className="text-2xl font-bold">${totalBilled.toLocaleString()}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Value</p>
            <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Active Matters</p>
            <p className="text-2xl font-bold">{activeMatters}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={attorney} onValueChange={setAttorney}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Attorney" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Attorneys</SelectItem>
              {attorneys.map(att => (
                <SelectItem key={att} value={att}>{att}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="text-lg font-medium mb-4">WIP by Attorney</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attorneyData.filter(a => a.wip > 0)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                <Bar dataKey="wip" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <h3 className="text-lg font-medium mb-4">Matter Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({name, value}) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attorney WIP Summary */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {attorneyData.map(attorney => (
            <div key={attorney.name} className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-sm font-medium">{attorney.name}</p>
              <p className="text-lg font-bold">${attorney.wip.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{attorney.matters} active matters</p>
            </div>
          ))}
        </div>

        {/* WIP Details Table */}
        <div>
          <h3 className="text-lg font-medium mb-3">Matter WIP Details</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Matter ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Matter Name</TableHead>
                <TableHead>Attorney</TableHead>
                <TableHead className="text-right">Hours</TableHead>
                <TableHead className="text-right">Total Value</TableHead>
                <TableHead className="text-right">Billed</TableHead>
                <TableHead className="text-right">WIP Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Last Activity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map(matter => (
                <TableRow key={matter.matterId}>
                  <TableCell className="font-mono">{matter.matterId}</TableCell>
                  <TableCell className="font-medium">{matter.clientName}</TableCell>
                  <TableCell>{matter.matterName}</TableCell>
                  <TableCell>{matter.attorney}</TableCell>
                  <TableCell className="text-right">{matter.totalHours}</TableCell>
                  <TableCell className="text-right">${matter.totalValue.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${matter.billedAmount.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-medium text-blue-600">
                    ${matter.wipAmount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={matter.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {matter.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="w-full">
                      <Progress value={matter.percentage} className="w-full h-2" />
                      <p className="text-xs text-muted-foreground mt-1">{matter.percentage}%</p>
                    </div>
                  </TableCell>
                  <TableCell>{matter.lastActivity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </ReportLayout>
  );
};

export default WorkInProgressReport;
