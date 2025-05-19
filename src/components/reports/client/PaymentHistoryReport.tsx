
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Input } from '@/components/ui/input';

const PaymentHistoryReport = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data
  const payments = [
    { id: "PMT-2025-001", date: "2025-01-15", clientName: "ABC Corporation", amount: 3500.00, method: "Credit Card", status: "Completed", invoice: "INV-2025-001" },
    { id: "PMT-2025-002", date: "2025-01-22", clientName: "XYZ Industries", amount: 1200.00, method: "Bank Transfer", status: "Completed", invoice: "INV-2025-002" },
    { id: "PMT-2025-003", date: "2025-02-01", clientName: "Smith & Associates", amount: 4200.00, method: "Check", status: "Processing", invoice: "INV-2025-003" },
    { id: "PMT-2025-004", date: "2025-02-10", clientName: "Johnson Family Trust", amount: 950.00, method: "Credit Card", status: "Completed", invoice: "INV-2025-004" },
    { id: "PMT-2025-005", date: "2025-02-17", clientName: "ABC Corporation", amount: 2800.00, method: "Bank Transfer", status: "Failed", invoice: "INV-2025-005" },
    { id: "PMT-2025-006", date: "2025-03-05", clientName: "Tech Innovations LLC", amount: 5200.00, method: "Credit Card", status: "Completed", invoice: "INV-2025-006" },
    { id: "PMT-2025-007", date: "2025-03-12", clientName: "XYZ Industries", amount: 3700.00, method: "Bank Transfer", status: "Completed", invoice: "INV-2025-007" },
    { id: "PMT-2025-008", date: "2025-03-20", clientName: "Smith & Associates", amount: 1900.00, method: "Check", status: "Processing", invoice: "INV-2025-008" },
    { id: "PMT-2025-009", date: "2025-04-02", clientName: "ABC Corporation", amount: 4500.00, method: "Credit Card", status: "Completed", invoice: "INV-2025-009" },
    { id: "PMT-2025-010", date: "2025-04-15", clientName: "Tech Innovations LLC", amount: 2200.00, method: "Bank Transfer", status: "Completed", invoice: "INV-2025-010" }
  ];
  
  const filteredPayments = payments.filter(payment => 
    payment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.invoice.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Group payments by month for the chart
  const monthlyTotals = payments.reduce((acc, payment) => {
    const month = payment.date.substring(0, 7);
    if (!acc[month]) {
      acc[month] = 0;
    }
    if (payment.status === "Completed") {
      acc[month] += payment.amount;
    }
    return acc;
  }, {});
  
  const chartData = Object.entries(monthlyTotals).map(([month, total]) => ({
    month: month,
    total: total
  })).sort((a, b) => a.month.localeCompare(b.month));
  
  const totalAmount = filteredPayments
    .filter(payment => payment.status === "Completed")
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Completed</Badge>;
      case 'Processing':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Processing</Badge>;
      case 'Failed':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <ReportLayout
      title="Payment History Report"
      description="Comprehensive view of all client payment transactions"
      dateFilterable
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Payments Collected</p>
            <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Transactions</p>
            <p className="text-2xl font-bold">{filteredPayments.length}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Average Payment Amount</p>
            <p className="text-2xl font-bold">${(totalAmount / filteredPayments.filter(p => p.status === "Completed").length).toFixed(2)}</p>
          </div>
        </div>
        
        <div className="h-80">
          <h3 className="text-lg font-medium mb-3">Monthly Payment Trends</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Payment Transactions</h3>
            <div className="w-64">
              <Input
                type="text"
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map(payment => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.clientName}</TableCell>
                  <TableCell>{payment.invoice}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell className="text-right">${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Details</Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredPayments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">No payments found matching your search</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </ReportLayout>
  );
};

export default PaymentHistoryReport;
