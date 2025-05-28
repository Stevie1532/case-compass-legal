
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

const AccountReconciliationReport = () => {
  const [selectedAccount, setSelectedAccount] = useState('1000');
  
  const reconciliationData = [
    {
      accountCode: "1000",
      accountName: "Operating Cash Account",
      bankBalance: 125000,
      bookBalance: 124750,
      difference: 250,
      status: "Needs Review",
      lastReconciled: "2024-01-15",
      reconciler: "Sarah Johnson"
    },
    {
      accountCode: "1100", 
      accountName: "Client Trust Account",
      bankBalance: 85000,
      bookBalance: 85000,
      difference: 0,
      status: "Reconciled",
      lastReconciled: "2024-01-20",
      reconciler: "Michael Chen"
    },
    {
      accountCode: "1200",
      accountName: "Business Savings",
      bankBalance: 45000,
      bookBalance: 45000,
      difference: 0,
      status: "Reconciled", 
      lastReconciled: "2024-01-18",
      reconciler: "Emily Davis"
    },
    {
      accountCode: "2000",
      accountName: "Credit Card - Operations",
      bankBalance: -8500,
      bookBalance: -8200,
      difference: -300,
      status: "In Progress",
      lastReconciled: "2024-01-10",
      reconciler: "Sarah Johnson"
    }
  ];

  const reconciliationItems = [
    {
      date: "2024-01-20",
      description: "Client payment - ABC Corp",
      bookAmount: 15000,
      bankAmount: 15000,
      status: "Matched",
      reference: "CHK-001234"
    },
    {
      date: "2024-01-19",
      description: "Office rent payment",
      bookAmount: -10000,
      bankAmount: -10000,
      status: "Matched",
      reference: "ACH-567890"
    },
    {
      date: "2024-01-18",
      description: "Bank service charges",
      bookAmount: 0,
      bankAmount: -25,
      status: "Bank Only",
      reference: "FEE-789012"
    },
    {
      date: "2024-01-17",
      description: "Vendor payment - Legal Forms Inc",
      bookAmount: -250,
      bankAmount: 0,
      status: "Outstanding",
      reference: "CHK-001235"
    },
    {
      date: "2024-01-16",
      description: "Interest earned",
      bookAmount: 0,
      bankAmount: 125,
      status: "Bank Only",
      reference: "INT-345678"
    }
  ];

  const selectedAccountData = reconciliationData.find(acc => acc.accountCode === selectedAccount);
  const totalUnreconciled = reconciliationData.filter(acc => acc.status !== 'Reconciled').length;

  return (
    <ReportLayout
      title="Account Reconciliation Report"
      description="Bank reconciliation status and outstanding items"
      filterable
      dateFilterable
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Reconciled Accounts</p>
            <p className="text-2xl font-bold">
              {reconciliationData.filter(acc => acc.status === 'Reconciled').length}
            </p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Needs Review</p>
            <p className="text-2xl font-bold">{totalUnreconciled}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Difference</p>
            <p className="text-2xl font-bold">
              ${Math.abs(reconciliationData.reduce((sum, acc) => sum + acc.difference, 0)).toLocaleString()}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Accounts</p>
            <p className="text-2xl font-bold">{reconciliationData.length}</p>
          </div>
        </div>

        {/* Account Selection */}
        <div className="flex gap-4 items-center">
          <label className="text-sm font-medium">Select Account:</label>
          <Select value={selectedAccount} onValueChange={setSelectedAccount}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Select account to reconcile" />
            </SelectTrigger>
            <SelectContent>
              {reconciliationData.map(account => (
                <SelectItem key={account.accountCode} value={account.accountCode}>
                  {account.accountCode} - {account.accountName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Account Status Overview */}
        <div>
          <h3 className="text-lg font-medium mb-3">Reconciliation Status Overview</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account</TableHead>
                <TableHead className="text-right">Bank Balance</TableHead>
                <TableHead className="text-right">Book Balance</TableHead>
                <TableHead className="text-right">Difference</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Reconciled</TableHead>
                <TableHead>Reconciler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reconciliationData.map(account => (
                <TableRow key={account.accountCode}>
                  <TableCell className="font-medium">
                    {account.accountCode} - {account.accountName}
                  </TableCell>
                  <TableCell className="text-right">${account.bankBalance.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${account.bookBalance.toLocaleString()}</TableCell>
                  <TableCell className={`text-right font-medium ${account.difference !== 0 ? 'text-red-600' : 'text-green-600'}`}>
                    ${Math.abs(account.difference).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        account.status === 'Reconciled' ? 'bg-green-100 text-green-800' :
                        account.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                      }
                    >
                      {account.status === 'Reconciled' && <CheckCircle className="h-3 w-3 mr-1" />}
                      {account.status === 'In Progress' && <Clock className="h-3 w-3 mr-1" />}
                      {account.status === 'Needs Review' && <AlertCircle className="h-3 w-3 mr-1" />}
                      {account.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{account.lastReconciled}</TableCell>
                  <TableCell>{account.reconciler}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Selected Account Detail */}
        {selectedAccountData && (
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium">
                Reconciliation Details: {selectedAccountData.accountName}
              </h3>
              <Button className="bg-legal-light hover:bg-legal-dark">
                Start Reconciliation
              </Button>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Bank Balance</p>
                  <p className="text-lg font-bold">${selectedAccountData.bankBalance.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Book Balance</p>
                  <p className="text-lg font-bold">${selectedAccountData.bookBalance.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Difference</p>
                  <p className={`text-lg font-bold ${selectedAccountData.difference !== 0 ? 'text-red-600' : 'text-green-600'}`}>
                    ${Math.abs(selectedAccountData.difference).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge 
                    className={
                      selectedAccountData.status === 'Reconciled' ? 'bg-green-100 text-green-800' :
                      selectedAccountData.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-orange-100 text-orange-800'
                    }
                  >
                    {selectedAccountData.status}
                  </Badge>
                </div>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead className="text-right">Book Amount</TableHead>
                  <TableHead className="text-right">Bank Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reconciliationItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className="font-mono text-sm">{item.reference}</TableCell>
                    <TableCell className="text-right">
                      {item.bookAmount !== 0 ? `$${item.bookAmount.toLocaleString()}` : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.bankAmount !== 0 ? `$${item.bankAmount.toLocaleString()}` : '-'}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          item.status === 'Matched' ? 'bg-green-100 text-green-800' :
                          item.status === 'Outstanding' ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </ReportLayout>
  );
};

export default AccountReconciliationReport;
