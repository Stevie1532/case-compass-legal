import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const PaymentHistoryReport = () => {
  const [client, setClient] = useState('all');
  const [timeframe, setTimeframe] = useState('current-month');
  
  // Sample data
  const paymentData = [
    {
      id: "PMT-001",
      client: "ABC Corporation",
      clientId: "CL-10025",
      invoiceNumber: "INV-2024-001",
      amount: 2500.00,
      paymentDate: "2024-01-15",
      paymentMethod: "Wire Transfer",
      reference: "WT240115001",
      matter: "Corporate Merger",
      status: "Cleared"
    },
    {
      id: "PMT-002",
      client: "XYZ Industries",
      clientId: "CL-10026",
      invoiceNumber: "INV-2024-002",
      amount: 1800.00,
      paymentDate: "2024-01-18",
      paymentMethod: "Check",
      reference: "CHK-5678",
      matter: "Contract Review",
      status: "Cleared"
    },
    {
      id: "PMT-003",
      client: "Smith & Associates",
      clientId: "CL-10027",
      invoiceNumber: "INV-2024-003",
      amount: 3200.00,
      paymentDate: "2024-01-20",
      paymentMethod: "ACH",
      reference: "ACH240120001",
      matter: "Litigation Defense",
      status: "Pending"
    },
    {
      id: "PMT-004",
      client: "Johnson Family Trust",
      clientId: "CL-10028",
      invoiceNumber: "INV-2024-004",
      amount: 950.00,
      paymentDate: "2024-01-22",
      paymentMethod: "Credit Card",
      reference: "CC-1234567890",
      matter: "Estate Planning",
      status: "Cleared"
    },
    {
      id: "PMT-005",
      client: "Tech Innovations LLC",
      clientId: "CL-10029",
      invoiceNumber: "INV-2024-005",
      amount: 4200.00,
      paymentDate: "2024-01-25",
      paymentMethod: "Wire Transfer",
      reference: "WT240125001",
      matter: "IP Protection",
      status: "Cleared"
    }
  ];

  const clients = [...new Set(paymentData.map(payment => payment.client))];
  
  const filteredPayments = client === 'all' 
    ? paymentData 
    : paymentData.filter(payment => payment.client === client);

  // Monthly payment trends
  const monthlyData = [
    { month: 'Oct', payments: 8500, count: 12 },
    { month: 'Nov', payments: 12300, count: 15 },
    { month: 'Dec', payments: 9800, count: 11 },
    { month: 'Jan', payments: 12650, count: 18 }
  ];

  // Payment method breakdown
  const methodData = [
    { method: 'Wire Transfer', amount: 6700, count: 2 },
    { method: 'Check', amount: 1800, count: 1 },
    { method: 'ACH', amount: 3200, count: 1 },
    { method: 'Credit Card', amount: 950, count: 1 }
  ];

  const totalPayments = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const pendingPayments = paymentData.filter(payment => payment.status === 'Pending').reduce((sum, payment) => sum + payment.amount, 0);
  const clearedPayments = paymentData.filter(payment => payment.status === 'Cleared').reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <ReportLayout
      title="Payment History Report"
      description="Comprehensive view of client payments and transaction history"
      filterable
      dateFilterable
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Payments</p>
            <p className="text-2xl font-bold">${totalPayments.toFixed(2)}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Cleared</p>
            <p className="text-2xl font-bold">${clearedPayments.toFixed(2)}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold">${pendingPayments.toFixed(2)}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Avg Payment</p>
            <p className="text-2xl font-bold">${(totalPayments / filteredPayments.length).toFixed(2)}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Monthly Payment Trends</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip 
                    formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Payments']}
                  />
                  <Line type="monotone" dataKey="payments" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Payment Methods</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={methodData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="method" />
                  <YAxis />
                  <RechartsTooltip formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Amount']} />
                  <Bar dataKey="amount" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Payment Details Table */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium">Payment Details</h3>
            <Select value={client} onValueChange={setClient}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Clients</SelectItem>
                {clients.map(clientName => (
                  <SelectItem key={clientName} value={clientName}>{clientName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead>Matter</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map(payment => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.paymentDate}</TableCell>
                  <TableCell className="font-medium">{payment.client}</TableCell>
                  <TableCell>{payment.invoiceNumber}</TableCell>
                  <TableCell>{payment.matter}</TableCell>
                  <TableCell>{payment.paymentMethod}</TableCell>
                  <TableCell>{payment.reference}</TableCell>
                  <TableCell className="text-right">${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={payment.status === 'Cleared' ? 'default' : 'secondary'}>
                      {payment.status}
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

export default PaymentHistoryReport;
