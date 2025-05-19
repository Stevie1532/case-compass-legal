
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const VendorPaymentReport = () => {
  const [period, setPeriod] = useState('monthly');
  const [vendorFilter, setVendorFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data
  const payments = [
    { id: "VP-2025-001", date: "2025-04-05", vendor: "LegalTech Solutions", amount: 7500.00, invoiceNumber: "INV-3245", category: "Software", status: "Paid", paymentMethod: "Bank Transfer" },
    { id: "VP-2025-002", date: "2025-04-07", vendor: "Office Depot Enterprise", amount: 3200.00, invoiceNumber: "INV-7621", category: "Office Supplies", status: "Paid", paymentMethod: "Credit Card" },
    { id: "VP-2025-003", date: "2025-04-10", vendor: "Global Research Partners", amount: 12000.00, invoiceNumber: "INV-9872", category: "Research Services", status: "Pending", paymentMethod: "Bank Transfer" },
    { id: "VP-2025-004", date: "2025-04-12", vendor: "Pro Travel Services", amount: 8500.00, invoiceNumber: "INV-4532", category: "Travel", status: "Paid", paymentMethod: "Credit Card" },
    { id: "VP-2025-005", date: "2025-04-15", vendor: "QuickPrint Solutions", amount: 1800.00, invoiceNumber: "INV-1178", category: "Printing Services", status: "Paid", paymentMethod: "Credit Card" },
    { id: "VP-2025-006", date: "2025-04-18", vendor: "Corporate Catering Ltd", amount: 4200.00, invoiceNumber: "INV-6524", category: "Food & Beverages", status: "Pending", paymentMethod: "Bank Transfer" },
    { id: "VP-2025-007", date: "2025-04-20", vendor: "Tech Maintenance Inc.", amount: 6500.00, invoiceNumber: "INV-8879", category: "IT Services", status: "Paid", paymentMethod: "Credit Card" },
    { id: "VP-2025-008", date: "2025-04-22", vendor: "LegalTech Solutions", amount: 7500.00, invoiceNumber: "INV-3246", category: "Software", status: "Scheduled", paymentMethod: "Bank Transfer", scheduledDate: "2025-05-05" },
    { id: "VP-2025-009", date: "2025-04-25", vendor: "Office Depot Enterprise", amount: 1700.00, invoiceNumber: "INV-7644", category: "Office Supplies", status: "Paid", paymentMethod: "Credit Card" },
    { id: "VP-2025-010", date: "2025-04-28", vendor: "Global Research Partners", amount: 9500.00, invoiceNumber: "INV-9901", category: "Research Services", status: "Scheduled", paymentMethod: "Bank Transfer", scheduledDate: "2025-05-10" }
  ];
  
  const vendors = [...new Set(payments.map(payment => payment.vendor))];
  
  const filteredPayments = payments
    .filter(payment => vendorFilter === 'all' || payment.vendor === vendorFilter)
    .filter(payment => 
      payment.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  // Monthly payment data for charts
  const monthlyData = [
    { month: 'Jan', amount: 48000 },
    { month: 'Feb', amount: 52000 },
    { month: 'Mar', amount: 58000 },
    { month: 'Apr', amount: 62500 },
  ];
  
  // Category data for charts
  const categoryData = [
    { name: 'Software', value: 15000 },
    { name: 'Office Supplies', value: 4900 },
    { name: 'Research Services', value: 21500 },
    { name: 'Travel', value: 8500 },
    { name: 'Printing Services', value: 1800 },
    { name: 'Food & Beverages', value: 4200 },
    { name: 'IT Services', value: 6500 },
  ];
  
  const totalPaid = payments
    .filter(payment => payment.status === 'Paid')
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  const totalPending = payments
    .filter(payment => payment.status === 'Pending')
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  const totalScheduled = payments
    .filter(payment => payment.status === 'Scheduled')
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Paid</Badge>;
      case 'Pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'Scheduled':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Scheduled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <ReportLayout
      title="Vendor Payment Report"
      description="Summary of all payments made to vendors"
      dateFilterable
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Payments (YTD)</p>
            <p className="text-2xl font-bold">${(totalPaid + totalPending + totalScheduled).toLocaleString()}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Paid</p>
            <p className="text-2xl font-bold">${totalPaid.toLocaleString()}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold">${totalPending.toLocaleString()}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Scheduled</p>
            <p className="text-2xl font-bold">${totalScheduled.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-80">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium">Payment Trends</h3>
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
            </div>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} name="Payment Amount" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="h-80">
            <h3 className="text-lg font-medium mb-3">Payments by Category</h3>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Bar dataKey="value" fill="#8884d8" name="Amount" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Payment Transactions</h3>
            <div className="flex gap-2">
              <div className="w-64">
                <Input
                  type="text"
                  placeholder="Search payments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={vendorFilter} onValueChange={setVendorFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Vendors</SelectItem>
                  {vendors.map(vendor => (
                    <SelectItem key={vendor} value={vendor}>{vendor}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map(payment => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.vendor}</TableCell>
                  <TableCell>{payment.invoiceNumber}</TableCell>
                  <TableCell>{payment.category}</TableCell>
                  <TableCell className="text-right">${payment.amount.toLocaleString()}</TableCell>
                  <TableCell>{payment.paymentMethod}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Details</Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredPayments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-4">No payments found matching your search</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-3">Payment Method Distribution</h3>
            <div>
              {(() => {
                const methodCounts = payments.reduce((acc: Record<string, number>, payment) => {
                  if (!acc[payment.paymentMethod]) {
                    acc[payment.paymentMethod] = 0;
                  }
                  acc[payment.paymentMethod] += payment.amount;
                  return acc;
                }, {});
                
                const totalAmount = Object.values(methodCounts).reduce((sum: number, value) => sum + value, 0);
                
                return Object.entries(methodCounts).map(([method, amount]) => {
                  const percentage = (amount / totalAmount) * 100;
                  return (
                    <div key={method} className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{method}</span>
                        <span className="text-sm text-muted-foreground">${amount.toLocaleString()} ({percentage.toFixed(1)}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`bg-${method === 'Credit Card' ? 'blue' : 'purple'}-500 h-2 rounded-full`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-3">Top Vendors by Payment Volume</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead className="text-right">Total Payments</TableHead>
                  <TableHead className="text-right">% of Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(() => {
                  const vendorTotals = payments.reduce((acc: Record<string, number>, payment) => {
                    if (!acc[payment.vendor]) {
                      acc[payment.vendor] = 0;
                    }
                    acc[payment.vendor] += payment.amount;
                    return acc;
                  }, {});
                  
                  const sortedVendors = Object.entries(vendorTotals)
                    .sort(([_, amountA], [__, amountB]) => (amountB as number) - (amountA as number))
                    .slice(0, 5);
                  
                  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
                  
                  return sortedVendors.map(([vendor, amount]) => {
                    const percentage = ((amount as number) / totalAmount) * 100;
                    return (
                      <TableRow key={vendor}>
                        <TableCell className="font-medium">{vendor}</TableCell>
                        <TableCell className="text-right">${(amount as number).toLocaleString()}</TableCell>
                        <TableCell className="text-right">{percentage.toFixed(1)}%</TableCell>
                      </TableRow>
                    );
                  });
                })()}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </ReportLayout>
  );
};

export default VendorPaymentReport;
