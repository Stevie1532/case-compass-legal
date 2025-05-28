
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const WriteOffReport = () => {
  const [filterPeriod, setFilterPeriod] = useState('current-year');
  const [writeOffType, setWriteOffType] = useState('all');
  
  const writeOffData = [
    {
      id: "WO-001",
      date: "2024-01-15",
      clientName: "ABC Corporation",
      matterNumber: "MAT-2023-1125",
      originalAmount: 15000,
      writeOffAmount: 2500,
      reason: "Client Financial Hardship",
      type: "Partial",
      approvedBy: "Managing Partner",
      status: "Approved"
    },
    {
      id: "WO-002", 
      date: "2024-01-10",
      clientName: "John Doe",
      matterNumber: "MAT-2023-1089",
      originalAmount: 8500,
      writeOffAmount: 8500,
      reason: "Uncollectible - Client Bankruptcy",
      type: "Full",
      approvedBy: "Managing Partner",
      status: "Approved"
    },
    {
      id: "WO-003",
      date: "2024-01-05",
      clientName: "XYZ Industries",
      matterNumber: "MAT-2023-1156",
      originalAmount: 12000,
      writeOffAmount: 1200,
      reason: "Billing Error Adjustment",
      type: "Partial",
      approvedBy: "Billing Manager",
      status: "Approved"
    },
    {
      id: "WO-004",
      date: "2023-12-28",
      clientName: "Smith & Associates",
      matterNumber: "MAT-2023-1203",
      originalAmount: 6800,
      writeOffAmount: 6800,
      reason: "Statute of Limitations",
      type: "Full",
      approvedBy: "Managing Partner",
      status: "Approved"
    },
    {
      id: "WO-005",
      date: "2023-12-15",
      clientName: "Tech Startup LLC",
      matterNumber: "MAT-2023-1178",
      originalAmount: 22000,
      writeOffAmount: 3500,
      reason: "Settlement Discount",
      type: "Partial",
      approvedBy: "Managing Partner",
      status: "Pending"
    }
  ];

  const reasonData = [
    { name: 'Client Financial Hardship', value: 2500, color: '#8884d8' },
    { name: 'Uncollectible', value: 8500, color: '#82ca9d' },
    { name: 'Billing Error', value: 1200, color: '#ffc658' },
    { name: 'Statute of Limitations', value: 6800, color: '#ff7300' },
    { name: 'Settlement Discount', value: 3500, color: '#0088fe' }
  ];

  const monthlyData = [
    { month: 'Oct', amount: 8500 },
    { month: 'Nov', amount: 12000 },
    { month: 'Dec', amount: 10300 },
    { month: 'Jan', amount: 22500 }
  ];

  const filteredData = writeOffData.filter(item => 
    writeOffType === 'all' || item.type === writeOffType
  );

  const totalWriteOffs = filteredData.reduce((sum, item) => sum + item.writeOffAmount, 0);
  const totalOriginal = filteredData.reduce((sum, item) => sum + item.originalAmount, 0);
  const writeOffPercentage = ((totalWriteOffs / totalOriginal) * 100).toFixed(1);

  return (
    <ReportLayout
      title="Write-Off Report"
      description="Analysis of fee write-offs and uncollectible accounts"
      filterable
      dateFilterable
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Write-Offs</p>
            <p className="text-2xl font-bold">${totalWriteOffs.toLocaleString()}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Original Amount</p>
            <p className="text-2xl font-bold">${totalOriginal.toLocaleString()}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Write-Off Rate</p>
            <p className="text-2xl font-bold">{writeOffPercentage}%</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Number of Write-Offs</p>
            <p className="text-2xl font-bold">{filteredData.length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <Select value={filterPeriod} onValueChange={setFilterPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-year">Current Year</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
              <SelectItem value="last-6-months">Last 6 Months</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
            </SelectContent>
          </Select>
          <Select value={writeOffType} onValueChange={setWriteOffType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Full">Full Write-Off</SelectItem>
              <SelectItem value="Partial">Partial Write-Off</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-legal-light hover:bg-legal-dark ml-auto">
            Create Write-Off
          </Button>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="text-lg font-medium mb-4">Write-Off Reasons</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={reasonData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({name, value}) => `${name}: $${value.toLocaleString()}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {reasonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <h3 className="text-lg font-medium mb-4">Monthly Write-Off Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Write-Off Details Table */}
        <div>
          <h3 className="text-lg font-medium mb-3">Write-Off Details</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Write-Off ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Matter</TableHead>
                <TableHead className="text-right">Original Amount</TableHead>
                <TableHead className="text-right">Write-Off Amount</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Approved By</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map(writeOff => (
                <TableRow key={writeOff.id}>
                  <TableCell className="font-mono">{writeOff.id}</TableCell>
                  <TableCell>{writeOff.date}</TableCell>
                  <TableCell className="font-medium">{writeOff.clientName}</TableCell>
                  <TableCell className="font-mono text-sm">{writeOff.matterNumber}</TableCell>
                  <TableCell className="text-right">${writeOff.originalAmount.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-medium text-red-600">
                    ${writeOff.writeOffAmount.toLocaleString()}
                  </TableCell>
                  <TableCell>{writeOff.reason}</TableCell>
                  <TableCell>
                    <Badge className={writeOff.type === 'Full' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'}>
                      {writeOff.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{writeOff.approvedBy}</TableCell>
                  <TableCell>
                    <Badge className={writeOff.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                      {writeOff.status}
                    </Badge>
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

export default WriteOffReport;
