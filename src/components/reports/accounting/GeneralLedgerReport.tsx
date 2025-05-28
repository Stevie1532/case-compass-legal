
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const GeneralLedgerReport = () => {
  const [account, setAccount] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data
  const ledgerEntries = [
    {
      id: "GL-001",
      date: "2024-01-15",
      account: "1000 - Cash",
      description: "Client payment - ABC Corporation",
      reference: "INV-2024-001",
      debit: 15000,
      credit: 0,
      balance: 15000,
      type: "Receipt"
    },
    {
      id: "GL-002",
      date: "2024-01-15",
      account: "4000 - Legal Revenue",
      description: "Legal services rendered",
      reference: "INV-2024-001",
      debit: 0,
      credit: 15000,
      balance: -15000,
      type: "Revenue"
    },
    {
      id: "GL-003",
      date: "2024-01-16",
      account: "6000 - Office Expenses",
      description: "Office supplies purchase",
      reference: "EXP-2024-015",
      debit: 245,
      credit: 0,
      balance: 245,
      type: "Expense"
    },
    {
      id: "GL-004",
      date: "2024-01-16",
      account: "1000 - Cash",
      description: "Office supplies payment",
      reference: "EXP-2024-015",
      debit: 0,
      credit: 245,
      balance: 14755,
      type: "Payment"
    },
    {
      id: "GL-005",
      date: "2024-01-18",
      account: "5000 - Salary Expense",
      description: "Monthly salary - Sarah Johnson",
      reference: "PAY-2024-001",
      debit: 8500,
      credit: 0,
      balance: 8500,
      type: "Payroll"
    },
    {
      id: "GL-006",
      date: "2024-01-18",
      account: "1000 - Cash",
      description: "Salary payment",
      reference: "PAY-2024-001",
      debit: 0,
      credit: 8500,
      balance: 6255,
      type: "Payment"
    },
    {
      id: "GL-007",
      date: "2024-01-20",
      account: "1200 - Accounts Receivable",
      description: "Invoice sent - XYZ Industries",
      reference: "INV-2024-002",
      debit: 22000,
      credit: 0,
      balance: 22000,
      type: "Invoice"
    },
    {
      id: "GL-008",
      date: "2024-01-20",
      account: "4000 - Legal Revenue",
      description: "Legal services rendered",
      reference: "INV-2024-002",
      debit: 0,
      credit: 22000,
      balance: -37000,
      type: "Revenue"
    }
  ];

  const accounts = [...new Set(ledgerEntries.map(entry => entry.account))];
  
  const filteredEntries = ledgerEntries.filter(entry => 
    (account === 'all' || entry.account === account) &&
    (searchTerm === '' || 
     entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
     entry.reference.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalDebits = filteredEntries.reduce((sum, entry) => sum + entry.debit, 0);
  const totalCredits = filteredEntries.reduce((sum, entry) => sum + entry.credit, 0);

  return (
    <ReportLayout
      title="General Ledger Report"
      description="Detailed view of all accounting transactions"
      filterable
      dateFilterable
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Debits</p>
            <p className="text-2xl font-bold">${totalDebits.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Credits</p>
            <p className="text-2xl font-bold">${totalCredits.toLocaleString()}</p>
          </div>
          <div className={`p-4 rounded-lg ${totalDebits === totalCredits ? 'bg-green-50' : 'bg-red-50'}`}>
            <p className="text-sm text-muted-foreground">Balance Check</p>
            <p className="text-2xl font-bold">{totalDebits === totalCredits ? 'Balanced' : 'Out of Balance'}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={account} onValueChange={setAccount}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Filter by account" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Accounts</SelectItem>
              {accounts.map(acc => (
                <SelectItem key={acc} value={acc}>{acc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Detailed Table */}
        <div>
          <h3 className="text-lg font-medium mb-3">Ledger Entries</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead className="text-right">Debit</TableHead>
                <TableHead className="text-right">Credit</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map(entry => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell className="font-medium">{entry.account}</TableCell>
                  <TableCell>{entry.description}</TableCell>
                  <TableCell>{entry.reference}</TableCell>
                  <TableCell className="text-right">
                    {entry.debit > 0 ? `$${entry.debit.toLocaleString()}` : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    {entry.credit > 0 ? `$${entry.credit.toLocaleString()}` : '-'}
                  </TableCell>
                  <TableCell className="text-right">${entry.balance.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        entry.type === 'Revenue' ? 'bg-green-100 text-green-800' :
                        entry.type === 'Expense' ? 'bg-red-100 text-red-800' :
                        entry.type === 'Payment' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }
                    >
                      {entry.type}
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

export default GeneralLedgerReport;
