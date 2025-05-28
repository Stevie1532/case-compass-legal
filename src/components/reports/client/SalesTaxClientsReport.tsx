
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const SalesTaxClientsReport = () => {
  const [taxStatus, setTaxStatus] = useState('all');
  const [jurisdiction, setJurisdiction] = useState('all');
  
  // Sample data
  const salesTaxData = [
    {
      id: "STX-001",
      client: "ABC Corporation",
      clientId: "CL-10025",
      taxId: "TX123456789",
      jurisdiction: "California",
      status: "Compliant",
      lastFiling: "2024-01-31",
      nextDue: "2024-02-29",
      quarterlyRevenue: 245000,
      taxOwed: 19600,
      filingFee: 150,
      penaltiesInterest: 0,
      totalDue: 19750
    },
    {
      id: "STX-002",
      client: "XYZ Industries",
      clientId: "CL-10026",
      taxId: "TX987654321",
      jurisdiction: "New York",
      status: "Overdue",
      lastFiling: "2023-10-31",
      nextDue: "2024-01-31",
      quarterlyRevenue: 180000,
      taxOwed: 14400,
      filingFee: 125,
      penaltiesInterest: 720,
      totalDue: 15245
    },
    {
      id: "STX-003",
      client: "Smith & Associates",
      clientId: "CL-10027",
      taxId: "TX456789123",
      jurisdiction: "Texas",
      status: "Pending Review",
      lastFiling: "2024-01-15",
      nextDue: "2024-02-15",
      quarterlyRevenue: 320000,
      taxOwed: 20800,
      filingFee: 100,
      penaltiesInterest: 0,
      totalDue: 20900
    },
    {
      id: "STX-004",
      client: "Johnson Family Trust",
      clientId: "CL-10028",
      taxId: "TX789123456",
      jurisdiction: "Florida",
      status: "Exempt",
      lastFiling: "N/A",
      nextDue: "N/A",
      quarterlyRevenue: 0,
      taxOwed: 0,
      filingFee: 0,
      penaltiesInterest: 0,
      totalDue: 0
    },
    {
      id: "STX-005",
      client: "Tech Innovations LLC",
      clientId: "CL-10029",
      taxId: "TX321654987",
      jurisdiction: "Washington",
      status: "Compliant",
      lastFiling: "2024-01-20",
      nextDue: "2024-02-20",
      quarterlyRevenue: 420000,
      taxOwed: 42000,
      filingFee: 175,
      penaltiesInterest: 0,
      totalDue: 42175
    },
    {
      id: "STX-006",
      client: "Green Energy Solutions",
      clientId: "CL-10030",
      taxId: "TX654987321",
      jurisdiction: "Colorado",
      status: "Late Filing",
      lastFiling: "2024-02-05",
      nextDue: "2024-03-05",
      quarterlyRevenue: 156000,
      taxOwed: 11700,
      filingFee: 125,
      penaltiesInterest: 234,
      totalDue: 12059
    }
  ];

  const jurisdictions = [...new Set(salesTaxData.map(client => client.jurisdiction))];
  const statuses = [...new Set(salesTaxData.map(client => client.status))];
  
  const filteredData = salesTaxData.filter(client => {
    const statusMatch = taxStatus === 'all' || client.status === taxStatus;
    const jurisdictionMatch = jurisdiction === 'all' || client.jurisdiction === jurisdiction;
    return statusMatch && jurisdictionMatch;
  });

  // Status distribution for pie chart
  const statusData = statuses.map(status => ({
    name: status,
    value: salesTaxData.filter(client => client.status === status).length,
    color: status === 'Compliant' ? '#22c55e' : 
           status === 'Overdue' ? '#ef4444' : 
           status === 'Late Filing' ? '#f59e0b' :
           status === 'Pending Review' ? '#3b82f6' : '#6b7280'
  }));

  // Revenue by jurisdiction
  const jurisdictionRevenue = jurisdictions.map(jur => ({
    jurisdiction: jur,
    revenue: salesTaxData.filter(client => client.jurisdiction === jur)
                         .reduce((sum, client) => sum + client.quarterlyRevenue, 0),
    taxOwed: salesTaxData.filter(client => client.jurisdiction === jur)
                        .reduce((sum, client) => sum + client.taxOwed, 0)
  }));

  const totalRevenue = filteredData.reduce((sum, client) => sum + client.quarterlyRevenue, 0);
  const totalTaxOwed = filteredData.reduce((sum, client) => sum + client.taxOwed, 0);
  const totalPenalties = filteredData.reduce((sum, client) => sum + client.penaltiesInterest, 0);
  const overdueClients = salesTaxData.filter(client => client.status === 'Overdue').length;

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Compliant': return 'bg-green-100 text-green-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Late Filing': return 'bg-yellow-100 text-yellow-800';
      case 'Pending Review': return 'bg-blue-100 text-blue-800';
      case 'Exempt': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <ReportLayout
      title="Sales Tax Clients Report"
      description="Comprehensive overview of client sales tax compliance and obligations"
      filterable
      dateFilterable
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Quarterly Revenue</p>
            <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Tax Owed</p>
            <p className="text-2xl font-bold">${totalTaxOwed.toLocaleString()}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Penalties & Interest</p>
            <p className="text-2xl font-bold">${totalPenalties.toLocaleString()}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Overdue Clients</p>
            <p className="text-2xl font-bold">{overdueClients}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Compliance Status Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Revenue by Jurisdiction</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={jurisdictionRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="jurisdiction" />
                  <YAxis />
                  <RechartsTooltip formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Revenue']} />
                  <Bar dataKey="revenue" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Filters and Table */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Client Sales Tax Details</h3>
            <div className="flex gap-2">
              <Select value={taxStatus} onValueChange={setTaxStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={jurisdiction} onValueChange={setJurisdiction}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by jurisdiction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Jurisdictions</SelectItem>
                  {jurisdictions.map(jur => (
                    <SelectItem key={jur} value={jur}>{jur}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Tax ID</TableHead>
                <TableHead>Jurisdiction</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Filing</TableHead>
                <TableHead>Next Due</TableHead>
                <TableHead className="text-right">Quarterly Revenue</TableHead>
                <TableHead className="text-right">Tax Owed</TableHead>
                <TableHead className="text-right">Penalties</TableHead>
                <TableHead className="text-right">Total Due</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map(client => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.client}</TableCell>
                  <TableCell>{client.taxId}</TableCell>
                  <TableCell>{client.jurisdiction}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(client.status)}>
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{client.lastFiling}</TableCell>
                  <TableCell>{client.nextDue}</TableCell>
                  <TableCell className="text-right">${client.quarterlyRevenue.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${client.taxOwed.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${client.penaltiesInterest.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-medium">${client.totalDue.toLocaleString()}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
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

export default SalesTaxClientsReport;
