
import React from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const ClientStatementReport = () => {
  // Sample data - would come from API in real app
  const clientData = {
    name: "ABC Corporation",
    id: "CL-10025",
    billingAddress: "123 Corporate Way, Business Park, NY 10001",
    contactPerson: "John Smith",
    contactEmail: "jsmith@abccorp.com",
    contactPhone: "(555) 123-4567"
  };
  
  const invoices = [
    { id: "INV-2025-001", date: "2025-04-15", amount: 3500.00, description: "Legal consultation services", status: "Paid" },
    { id: "INV-2025-002", date: "2025-04-22", amount: 1200.00, description: "Contract drafting", status: "Paid" },
    { id: "INV-2025-003", date: "2025-05-01", amount: 4200.00, description: "Case research and preparation", status: "Pending" },
    { id: "INV-2025-004", date: "2025-05-10", amount: 950.00, description: "Court filing fees", status: "Pending" },
    { id: "INV-2025-005", date: "2025-05-17", amount: 2800.00, description: "Deposition preparation", status: "Overdue" }
  ];
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Paid</Badge>;
      case 'Pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'Overdue':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidAmount = invoices
    .filter(invoice => invoice.status === 'Paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingAmount = totalAmount - paidAmount;

  return (
    <ReportLayout
      title="Client Statement of Account"
      description="Financial summary for client's account and transaction history"
    >
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-3">Client Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Client Name</p>
              <p className="font-medium">{clientData.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Client ID</p>
              <p>{clientData.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Billing Address</p>
              <p>{clientData.billingAddress}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Contact Person</p>
              <p>{clientData.contactPerson}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p>{clientData.contactEmail}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p>{clientData.contactPhone}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Amount</p>
            <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Paid Amount</p>
            <p className="text-2xl font-bold">${paidAmount.toFixed(2)}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Pending Amount</p>
            <p className="text-2xl font-bold">${pendingAmount.toFixed(2)}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Transaction History</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map(invoice => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.description}</TableCell>
                  <TableCell className="text-right">${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </ReportLayout>
  );
};

export default ClientStatementReport;
