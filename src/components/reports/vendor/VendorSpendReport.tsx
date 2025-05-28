
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const VendorSpendReport = () => {
  const [vendor, setVendor] = useState('all');
  const [category, setCategory] = useState('all');
  
  // Sample data
  const vendorSpendData = [
    {
      id: "VS-001",
      vendor: "Legal Research Inc",
      category: "Research Services",
      amount: 15000,
      month: "January",
      invoiceCount: 8,
      avgInvoice: 1875,
      paymentTerms: "Net 30",
      status: "Active"
    },
    {
      id: "VS-002",
      vendor: "Office Supply Plus",
      category: "Office Supplies",
      amount: 3500,
      month: "January",
      invoiceCount: 12,
      avgInvoice: 292,
      paymentTerms: "Net 15",
      status: "Active"
    },
    {
      id: "VS-003",
      vendor: "TechSoft Solutions",
      category: "Software & Technology",
      amount: 8200,
      month: "January",
      invoiceCount: 3,
      avgInvoice: 2733,
      paymentTerms: "Net 30",
      status: "Active"
    },
    {
      id: "VS-004",
      vendor: "Expert Witnesses LLC",
      category: "Professional Services",
      amount: 25000,
      month: "January",
      invoiceCount: 5,
      avgInvoice: 5000,
      paymentTerms: "Net 45",
      status: "Active"
    },
    {
      id: "VS-005",
      vendor: "Cleaning Services Co",
      category: "Facilities",
      amount: 2800,
      month: "January",
      invoiceCount: 4,
      avgInvoice: 700,
      paymentTerms: "Net 15",
      status: "Active"
    }
  ];

  const vendors = [...new Set(vendorSpendData.map(spend => spend.vendor))];
  const categories = [...new Set(vendorSpendData.map(spend => spend.category))];
  
  const filteredData = vendorSpendData.filter(spend => 
    (vendor === 'all' || spend.vendor === vendor) &&
    (category === 'all' || spend.category === category)
  );

  // Monthly trend data
  const trendData = [
    { month: 'Oct', spend: 48000 },
    { month: 'Nov', spend: 52000 },
    { month: 'Dec', spend: 59000 },
    { month: 'Jan', spend: 54500 }
  ];

  // Category breakdown
  const categoryData = categories.map(cat => {
    const catSpend = vendorSpendData.filter(spend => spend.category === cat);
    const total = catSpend.reduce((sum, spend) => sum + spend.amount, 0);
    return {
      category: cat,
      amount: total,
      vendors: catSpend.length
    };
  });

  const pieColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00'];

  const totalSpend = filteredData.reduce((sum, spend) => sum + spend.amount, 0);
  const totalInvoices = filteredData.reduce((sum, spend) => sum + spend.invoiceCount, 0);
  const avgInvoiceAmount = totalSpend / totalInvoices;

  return (
    <ReportLayout
      title="Vendor Spend Analysis"
      description="Comprehensive analysis of vendor spending and invoice patterns"
      filterable
      dateFilterable
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Spend</p>
            <p className="text-2xl font-bold">${totalSpend.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Invoices</p>
            <p className="text-2xl font-bold">{totalInvoices}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Avg Invoice Amount</p>
            <p className="text-2xl font-bold">${avgInvoiceAmount.toFixed(0)}</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Active Vendors</p>
            <p className="text-2xl font-bold">{vendors.length}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Spending by Category</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="amount"
                    label={({ category, amount }) => `${category}: $${amount.toLocaleString()}`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
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
            <h3 className="text-lg font-medium mb-3">Monthly Spending Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip 
                    formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Spend']}
                  />
                  <Line type="monotone" dataKey="spend" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Detailed Table */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium">Vendor Spend Details</h3>
            <div className="flex gap-2">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={vendor} onValueChange={setVendor}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Vendors</SelectItem>
                  {vendors.map(v => (
                    <SelectItem key={v} value={v}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Total Spend</TableHead>
                <TableHead className="text-right">Invoice Count</TableHead>
                <TableHead className="text-right">Avg Invoice</TableHead>
                <TableHead>Payment Terms</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map(spend => (
                <TableRow key={spend.id}>
                  <TableCell className="font-medium">{spend.vendor}</TableCell>
                  <TableCell>{spend.category}</TableCell>
                  <TableCell className="text-right">${spend.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{spend.invoiceCount}</TableCell>
                  <TableCell className="text-right">${spend.avgInvoice.toLocaleString()}</TableCell>
                  <TableCell>{spend.paymentTerms}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800">
                      {spend.status}
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

export default VendorSpendReport;
