
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const AccountPayableAgingReport = () => {
  const [agingPeriod, setAgingPeriod] = useState('all');
  const [vendorFilter, setVendorFilter] = useState('all');
  
  const agingData = [
    {
      vendorName: "Legal Forms Inc",
      totalOwed: 15000,
      current: 5000,
      days30: 8000,
      days60: 2000,
      days90: 0,
      over90: 0,
      lastPayment: "2024-01-10",
      contact: "billing@legalforms.com"
    },
    {
      vendorName: "Office Supplies Plus", 
      totalOwed: 3500,
      current: 1500,
      days30: 2000,
      days60: 0,
      days90: 0,
      over90: 0,
      lastPayment: "2024-01-15",
      contact: "accounts@officesupplies.com"
    },
    {
      vendorName: "Westlaw Research",
      totalOwed: 25000,
      current: 12000,
      days30: 8000,
      days60: 3000,
      days90: 2000,
      over90: 0,
      lastPayment: "2023-12-20",
      contact: "billing@westlaw.com"
    },
    {
      vendorName: "Property Management Co",
      totalOwed: 48000,
      current: 12000,
      days30: 12000,
      days60: 12000,
      days90: 8000,
      over90: 4000,
      lastPayment: "2023-11-15",
      contact: "billing@propmanage.com"
    },
    {
      vendorName: "IT Services LLC",
      totalOwed: 8500,
      current: 3500,
      days30: 3000,
      days60: 2000,
      days90: 0,
      over90: 0,
      lastPayment: "2024-01-05",
      contact: "billing@itservices.com"
    }
  ];

  const agingSummary = [
    { period: 'Current', amount: agingData.reduce((sum, vendor) => sum + vendor.current, 0), color: '#82ca9d' },
    { period: '1-30 Days', amount: agingData.reduce((sum, vendor) => sum + vendor.days30, 0), color: '#8884d8' },
    { period: '31-60 Days', amount: agingData.reduce((sum, vendor) => sum + vendor.days60, 0), color: '#ffc658' },
    { period: '61-90 Days', amount: agingData.reduce((sum, vendor) => sum + vendor.days90, 0), color: '#ff7300' },
    { period: '90+ Days', amount: agingData.reduce((sum, vendor) => sum + vendor.over90, 0), color: '#dd0000' }
  ];

  const vendorChartData = agingData.map(vendor => ({
    name: vendor.vendorName.replace(/\s+/g, ' ').split(' ')[0],
    Current: vendor.current,
    '1-30': vendor.days30,
    '31-60': vendor.days60,
    '61-90': vendor.days90,
    '90+': vendor.over90
  }));

  const vendors = agingData.map(vendor => vendor.vendorName);
  
  const filteredData = vendorFilter === 'all' 
    ? agingData 
    : agingData.filter(vendor => vendor.vendorName === vendorFilter);

  const totalPayables = agingData.reduce((sum, vendor) => sum + vendor.totalOwed, 0);
  const overdueAmount = agingData.reduce((sum, vendor) => sum + vendor.days30 + vendor.days60 + vendor.days90 + vendor.over90, 0);

  return (
    <ReportLayout
      title="Accounts Payable Aging Report"
      description="Outstanding vendor payments by aging periods"
      filterable
      dateFilterable
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Payables</p>
            <p className="text-2xl font-bold">${totalPayables.toLocaleString()}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Overdue Amount</p>
            <p className="text-2xl font-bold">${overdueAmount.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Current Amount</p>
            <p className="text-2xl font-bold">${agingSummary[0].amount.toLocaleString()}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Vendors</p>
            <p className="text-2xl font-bold">{agingData.length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <Select value={agingPeriod} onValueChange={setAgingPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Aging period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Periods</SelectItem>
              <SelectItem value="current">Current Only</SelectItem>
              <SelectItem value="overdue">Overdue Only</SelectItem>
              <SelectItem value="90plus">90+ Days</SelectItem>
            </SelectContent>
          </Select>
          <Select value={vendorFilter} onValueChange={setVendorFilter}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select vendor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Vendors</SelectItem>
              {vendors.map(vendor => (
                <SelectItem key={vendor} value={vendor}>{vendor}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="text-lg font-medium mb-4">Aging Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={agingSummary}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({period, amount}) => `${period}: $${amount.toLocaleString()}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {agingSummary.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <h3 className="text-lg font-medium mb-4">Vendor Aging Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vendorChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                <Bar dataKey="Current" stackId="a" fill="#82ca9d" />
                <Bar dataKey="1-30" stackId="a" fill="#8884d8" />
                <Bar dataKey="31-60" stackId="a" fill="#ffc658" />
                <Bar dataKey="61-90" stackId="a" fill="#ff7300" />
                <Bar dataKey="90+" stackId="a" fill="#dd0000" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Aging Summary Table */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          {agingSummary.map((period, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-sm font-medium" style={{color: period.color}}>{period.period}</p>
              <p className="text-lg font-bold">${period.amount.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">
                {((period.amount / totalPayables) * 100).toFixed(1)}%
              </p>
            </div>
          ))}
        </div>

        {/* Detailed Aging Table */}
        <div>
          <h3 className="text-lg font-medium mb-3">Vendor Aging Details</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor Name</TableHead>
                <TableHead className="text-right">Total Owed</TableHead>
                <TableHead className="text-right">Current</TableHead>
                <TableHead className="text-right">1-30 Days</TableHead>
                <TableHead className="text-right">31-60 Days</TableHead>
                <TableHead className="text-right">61-90 Days</TableHead>
                <TableHead className="text-right">90+ Days</TableHead>
                <TableHead>Last Payment</TableHead>
                <TableHead>Contact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map(vendor => (
                <TableRow key={vendor.vendorName}>
                  <TableCell className="font-medium">{vendor.vendorName}</TableCell>
                  <TableCell className="text-right font-bold">${vendor.totalOwed.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${vendor.current.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    {vendor.days30 > 0 ? (
                      <span className="text-orange-600 font-medium">${vendor.days30.toLocaleString()}</span>
                    ) : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    {vendor.days60 > 0 ? (
                      <span className="text-red-600 font-medium">${vendor.days60.toLocaleString()}</span>
                    ) : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    {vendor.days90 > 0 ? (
                      <span className="text-red-700 font-bold">${vendor.days90.toLocaleString()}</span>
                    ) : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    {vendor.over90 > 0 ? (
                      <span className="text-red-800 font-bold">${vendor.over90.toLocaleString()}</span>
                    ) : '-'}
                  </TableCell>
                  <TableCell>{vendor.lastPayment}</TableCell>
                  <TableCell className="text-sm text-blue-600">{vendor.contact}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </ReportLayout>
  );
};

export default AccountPayableAgingReport;
