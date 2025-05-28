
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

const TotalBillingsReport = () => {
  const [period, setPeriod] = useState('current-month');
  const [client, setClient] = useState('all');
  
  // Sample data
  const billingData = [
    {
      id: "BILL-001",
      client: "ABC Corporation",
      clientId: "CL-10025",
      matter: "Corporate Merger - Phase I",
      practiceArea: "Corporate Law",
      partner: "John Smith",
      billedHours: 45.5,
      partnerHours: 12.0,
      associateHours: 28.5,
      paralegalHours: 5.0,
      hourlyFees: 18250,
      expenses: 850,
      totalBilled: 19100,
      invoiceDate: "2024-01-31",
      status: "Paid",
      collectionRate: 100
    },
    {
      id: "BILL-002",
      client: "XYZ Industries",
      clientId: "CL-10026",
      matter: "Contract Dispute",
      practiceArea: "Litigation",
      partner: "Sarah Johnson",
      billedHours: 38.0,
      partnerHours: 15.0,
      associateHours: 20.0,
      paralegalHours: 3.0,
      hourlyFees: 21500,
      expenses: 1200,
      totalBilled: 22700,
      invoiceDate: "2024-01-28",
      status: "Outstanding",
      collectionRate: 0
    },
    {
      id: "BILL-003",
      client: "Smith & Associates",
      clientId: "CL-10027",
      matter: "Personal Injury Defense",
      practiceArea: "Personal Injury",
      partner: "Michael Chen",
      billedHours: 52.0,
      partnerHours: 18.0,
      associateHours: 25.0,
      paralegalHours: 9.0,
      hourlyFees: 28750,
      expenses: 2100,
      totalBilled: 30850,
      invoiceDate: "2024-01-25",
      status: "Partial Payment",
      collectionRate: 65
    },
    {
      id: "BILL-004",
      client: "Johnson Family Trust",
      clientId: "CL-10028",
      matter: "Estate Planning",
      practiceArea: "Estate Planning",
      partner: "Emily Rodriguez",
      billedHours: 22.5,
      partnerHours: 8.0,
      associateHours: 12.0,
      paralegalHours: 2.5,
      hourlyFees: 12250,
      expenses: 125,
      totalBilled: 12375,
      invoiceDate: "2024-01-22",
      status: "Paid",
      collectionRate: 100
    },
    {
      id: "BILL-005",
      client: "Tech Innovations LLC",
      clientId: "CL-10029",
      matter: "IP Portfolio Management",
      practiceArea: "Intellectual Property",
      partner: "David Wilson",
      billedHours: 41.0,
      partnerHours: 14.0,
      associateHours: 22.0,
      paralegalHours: 5.0,
      hourlyFees: 24850,
      expenses: 650,
      totalBilled: 25500,
      invoiceDate: "2024-01-20",
      status: "Paid",
      collectionRate: 100
    }
  ];

  const clients = [...new Set(billingData.map(bill => bill.client))];
  const practiceAreas = [...new Set(billingData.map(bill => bill.practiceArea))];
  
  const filteredData = client === 'all' 
    ? billingData 
    : billingData.filter(bill => bill.client === client);

  // Monthly billing trends
  const monthlyTrends = [
    { month: 'Oct', billings: 85000, collections: 78000, hours: 180 },
    { month: 'Nov', billings: 98000, collections: 91000, hours: 210 },
    { month: 'Dec', billings: 76000, collections: 72000, hours: 165 },
    { month: 'Jan', billings: 110525, collections: 82000, hours: 199 }
  ];

  // Practice area distribution
  const practiceAreaData = practiceAreas.map(area => {
    const areaBillings = billingData.filter(bill => bill.practiceArea === area);
    const total = areaBillings.reduce((sum, bill) => sum + bill.totalBilled, 0);
    
    return {
      area,
      total,
      percentage: (total / billingData.reduce((sum, bill) => sum + bill.totalBilled, 0)) * 100
    };
  });

  // Summary calculations
  const totalBillings = filteredData.reduce((sum, bill) => sum + bill.totalBilled, 0);
  const totalHours = filteredData.reduce((sum, bill) => sum + bill.billedHours, 0);
  const totalExpenses = filteredData.reduce((sum, bill) => sum + bill.expenses, 0);
  const avgHourlyRate = (totalBillings - totalExpenses) / totalHours;
  const paidInvoices = billingData.filter(bill => bill.status === 'Paid').length;
  const outstandingInvoices = billingData.filter(bill => bill.status === 'Outstanding').length;
  const partialPayments = billingData.filter(bill => bill.status === 'Partial Payment').length;

  const pieData = [
    { name: 'Paid', value: paidInvoices, color: '#22c55e' },
    { name: 'Outstanding', value: outstandingInvoices, color: '#ef4444' },
    { name: 'Partial', value: partialPayments, color: '#f59e0b' }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Paid': return 'text-green-600';
      case 'Outstanding': return 'text-red-600';
      case 'Partial Payment': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <ReportLayout
      title="Total Billings Report"
      description="Comprehensive overview of billing activity, collections, and revenue analysis"
      filterable
      dateFilterable
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Billings</p>
            <p className="text-2xl font-bold">${totalBillings.toLocaleString()}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Hours</p>
            <p className="text-2xl font-bold">{totalHours.toFixed(1)}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Avg Hourly Rate</p>
            <p className="text-2xl font-bold">${avgHourlyRate.toFixed(0)}</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Collection Rate</p>
            <p className="text-2xl font-bold">74.2%</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Monthly Billing Trends</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Amount']} />
                  <Line type="monotone" dataKey="billings" stroke="#8884d8" name="Billings" />
                  <Line type="monotone" dataKey="collections" stroke="#82ca9d" name="Collections" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Invoice Status Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Practice Area Revenue */}
        <div>
          <h3 className="text-lg font-medium mb-3">Revenue by Practice Area</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={practiceAreaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="area" />
                <YAxis />
                <RechartsTooltip formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Revenue']} />
                <Bar dataKey="total" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Billing Details Table */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Billing Details</h3>
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
                <TableHead>Invoice Date</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Matter</TableHead>
                <TableHead>Practice Area</TableHead>
                <TableHead className="text-right">Hours</TableHead>
                <TableHead className="text-right">Hourly Fees</TableHead>
                <TableHead className="text-right">Expenses</TableHead>
                <TableHead className="text-right">Total Billed</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Collection Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map(bill => (
                <TableRow key={bill.id}>
                  <TableCell>{bill.invoiceDate}</TableCell>
                  <TableCell className="font-medium">{bill.client}</TableCell>
                  <TableCell>{bill.matter}</TableCell>
                  <TableCell>{bill.practiceArea}</TableCell>
                  <TableCell className="text-right">{bill.billedHours}</TableCell>
                  <TableCell className="text-right">${bill.hourlyFees.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${bill.expenses.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-medium">${bill.totalBilled.toLocaleString()}</TableCell>
                  <TableCell className={getStatusColor(bill.status)}>{bill.status}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-2">
                      <span>{bill.collectionRate}%</span>
                      <Progress value={bill.collectionRate} className="w-16 h-2" />
                    </div>
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

export default TotalBillingsReport;
