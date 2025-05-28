
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const VendorReimbursementsReport = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [vendorFilter, setVendorFilter] = useState('all');
  
  const reimbursementData = [
    {
      id: "REI-001",
      date: "2024-01-20",
      vendorName: "Sarah Johnson",
      category: "Travel",
      description: "Client meeting - Los Angeles",
      amount: 850,
      receipts: true,
      status: "Approved",
      approvedBy: "Finance Manager",
      approvedDate: "2024-01-21",
      paidDate: "2024-01-22"
    },
    {
      id: "REI-002",
      date: "2024-01-18",
      vendorName: "Michael Chen",
      category: "Office Supplies",
      description: "Emergency printer paper and toner",
      amount: 125,
      receipts: true,
      status: "Paid",
      approvedBy: "Office Manager",
      approvedDate: "2024-01-18",
      paidDate: "2024-01-19"
    },
    {
      id: "REI-003",
      date: "2024-01-15",
      vendorName: "Emily Davis",
      category: "Professional Development",
      description: "CLE Conference Registration",
      amount: 450,
      receipts: true,
      status: "Pending",
      approvedBy: "",
      approvedDate: "",
      paidDate: ""
    },
    {
      id: "REI-004",
      date: "2024-01-12",
      vendorName: "David Wilson",
      category: "Client Entertainment",
      description: "Client dinner - settlement celebration",
      amount: 320,
      receipts: false,
      status: "Rejected",
      approvedBy: "Finance Manager",
      approvedDate: "2024-01-13",
      paidDate: ""
    },
    {
      id: "REI-005",
      date: "2024-01-10",
      vendorName: "Lisa Martinez",
      category: "Travel",
      description: "Court appearance - Sacramento",
      amount: 1200,
      receipts: true,
      status: "Approved",
      approvedBy: "Managing Partner",
      approvedDate: "2024-01-11",
      paidDate: ""
    }
  ];

  const categoryData = [
    { category: 'Travel', amount: 2050, count: 2 },
    { category: 'Office Supplies', amount: 125, count: 1 },
    { category: 'Professional Development', amount: 450, count: 1 },
    { category: 'Client Entertainment', amount: 320, count: 1 }
  ];

  const monthlyTrend = [
    { month: 'Oct', amount: 2500 },
    { month: 'Nov', amount: 1800 },
    { month: 'Dec', amount: 3200 },
    { month: 'Jan', amount: 2945 }
  ];

  const vendors = [...new Set(reimbursementData.map(item => item.vendorName))];
  
  const filteredData = reimbursementData.filter(item => 
    (statusFilter === 'all' || item.status === statusFilter) &&
    (vendorFilter === 'all' || item.vendorName === vendorFilter)
  );

  const totalReimbursements = filteredData.reduce((sum, item) => sum + item.amount, 0);
  const pendingAmount = reimbursementData.filter(item => item.status === 'Pending').reduce((sum, item) => sum + item.amount, 0);
  const approvedAmount = reimbursementData.filter(item => item.status === 'Approved').reduce((sum, item) => sum + item.amount, 0);

  return (
    <ReportLayout
      title="Vendor Reimbursements Report"
      description="Employee expense reimbursements and approval status"
      filterable
      dateFilterable
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Reimbursements</p>
            <p className="text-2xl font-bold">${totalReimbursements.toLocaleString()}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Pending Approval</p>
            <p className="text-2xl font-bold">${pendingAmount.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Approved Unpaid</p>
            <p className="text-2xl font-bold">${approvedAmount.toLocaleString()}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Claims</p>
            <p className="text-2xl font-bold">{filteredData.length}</p>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={vendorFilter} onValueChange={setVendorFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Employee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Employees</SelectItem>
                {vendors.map(vendor => (
                  <SelectItem key={vendor} value={vendor}>{vendor}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-legal-light hover:bg-legal-dark">
            New Reimbursement
          </Button>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="text-lg font-medium mb-4">Reimbursements by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <h3 className="text-lg font-medium mb-4">Monthly Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categoryData.map(category => (
            <div key={category.category} className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium">{category.category}</p>
              <p className="text-lg font-bold">${category.amount.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{category.count} claims</p>
            </div>
          ))}
        </div>

        {/* Reimbursements Table */}
        <div>
          <h3 className="text-lg font-medium mb-3">Reimbursement Details</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Receipts</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Approved By</TableHead>
                <TableHead>Paid Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map(reimbursement => (
                <TableRow key={reimbursement.id}>
                  <TableCell className="font-mono">{reimbursement.id}</TableCell>
                  <TableCell>{reimbursement.date}</TableCell>
                  <TableCell className="font-medium">{reimbursement.vendorName}</TableCell>
                  <TableCell>{reimbursement.category}</TableCell>
                  <TableCell className="max-w-xs truncate">{reimbursement.description}</TableCell>
                  <TableCell className="text-right font-medium">${reimbursement.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={reimbursement.receipts ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {reimbursement.receipts ? 'Yes' : 'No'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        reimbursement.status === 'Paid' ? 'bg-green-100 text-green-800' :
                        reimbursement.status === 'Approved' ? 'bg-blue-100 text-blue-800' :
                        reimbursement.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }
                    >
                      {reimbursement.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{reimbursement.approvedBy || '-'}</TableCell>
                  <TableCell>{reimbursement.paidDate || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </ReportLayout>
  );
};

export default VendorReimbursementsReport;
