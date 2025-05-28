
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TrialBalanceReport = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [accountType, setAccountType] = useState('all');
  
  const trialBalanceData = [
    {
      accountCode: "1000",
      accountName: "Cash and Cash Equivalents",
      type: "Asset",
      debit: 125000,
      credit: 0
    },
    {
      accountCode: "1100",
      accountName: "Accounts Receivable",
      type: "Asset", 
      debit: 85000,
      credit: 0
    },
    {
      accountCode: "1200",
      accountName: "Office Equipment",
      type: "Asset",
      debit: 45000,
      credit: 0
    },
    {
      accountCode: "2000",
      accountName: "Accounts Payable",
      type: "Liability",
      debit: 0,
      credit: 25000
    },
    {
      accountCode: "2100",
      accountName: "Accrued Expenses",
      type: "Liability",
      debit: 0,
      credit: 15000
    },
    {
      accountCode: "3000",
      accountName: "Owner's Equity",
      type: "Equity",
      debit: 0,
      credit: 180000
    },
    {
      accountCode: "4000",
      accountName: "Legal Fees Revenue",
      type: "Revenue",
      debit: 0,
      credit: 420000
    },
    {
      accountCode: "4100",
      accountName: "Consultation Revenue",
      type: "Revenue",
      debit: 0,
      credit: 85000
    },
    {
      accountCode: "5000",
      accountName: "Salary Expenses",
      type: "Expense",
      debit: 280000,
      credit: 0
    },
    {
      accountCode: "5100",
      accountName: "Office Rent",
      type: "Expense",
      debit: 120000,
      credit: 0
    },
    {
      accountCode: "5200",
      accountName: "Utilities",
      type: "Expense",
      debit: 18000,
      credit: 0
    },
    {
      accountCode: "5300",
      accountName: "Professional Development",
      type: "Expense",
      debit: 12000,
      credit: 0
    }
  ];

  const accountTypes = [...new Set(trialBalanceData.map(item => item.type))];
  
  const filteredData = trialBalanceData.filter(account => 
    (accountType === 'all' || account.type === accountType) &&
    (searchTerm === '' || 
     account.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     account.accountCode.includes(searchTerm))
  );

  const totalDebits = trialBalanceData.reduce((sum, account) => sum + account.debit, 0);
  const totalCredits = trialBalanceData.reduce((sum, account) => sum + account.credit, 0);
  const isBalanced = totalDebits === totalCredits;

  return (
    <ReportLayout
      title="Trial Balance Report"
      description="Summary of all general ledger accounts with debit and credit balances"
      filterable
      dateFilterable
    >
      <div className="space-y-6">
        {/* Balance Check */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Debits</p>
            <p className="text-2xl font-bold">${totalDebits.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Credits</p>
            <p className="text-2xl font-bold">${totalCredits.toLocaleString()}</p>
          </div>
          <div className={`p-4 rounded-lg ${isBalanced ? 'bg-green-50' : 'bg-red-50'}`}>
            <p className="text-sm text-muted-foreground">Status</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{isBalanced ? 'Balanced' : 'Unbalanced'}</p>
              <Badge className={isBalanced ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {isBalanced ? '✓' : '⚠'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search accounts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={accountType} onValueChange={setAccountType}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {accountTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Account Type Summary */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {accountTypes.map(type => {
            const typeAccounts = trialBalanceData.filter(acc => acc.type === type);
            const typeTotal = typeAccounts.reduce((sum, acc) => sum + acc.debit + acc.credit, 0);
            return (
              <div key={type} className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">{type}</p>
                <p className="font-medium">${typeTotal.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{typeAccounts.length} accounts</p>
              </div>
            );
          })}
        </div>

        {/* Trial Balance Table */}
        <div>
          <h3 className="text-lg font-medium mb-3">Account Balances</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account Code</TableHead>
                <TableHead>Account Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Debit</TableHead>
                <TableHead className="text-right">Credit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map(account => (
                <TableRow key={account.accountCode}>
                  <TableCell className="font-mono">{account.accountCode}</TableCell>
                  <TableCell className="font-medium">{account.accountName}</TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        account.type === 'Asset' ? 'bg-blue-100 text-blue-800' :
                        account.type === 'Liability' ? 'bg-red-100 text-red-800' :
                        account.type === 'Equity' ? 'bg-purple-100 text-purple-800' :
                        account.type === 'Revenue' ? 'bg-green-100 text-green-800' :
                        'bg-orange-100 text-orange-800'
                      }
                    >
                      {account.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {account.debit > 0 ? `$${account.debit.toLocaleString()}` : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    {account.credit > 0 ? `$${account.credit.toLocaleString()}` : '-'}
                  </TableCell>
                </TableRow>
              ))}
              {/* Totals Row */}
              <TableRow className="border-t-2 border-gray-300 font-bold">
                <TableCell colSpan={3}>TOTALS</TableCell>
                <TableCell className="text-right">${totalDebits.toLocaleString()}</TableCell>
                <TableCell className="text-right">${totalCredits.toLocaleString()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </ReportLayout>
  );
};

export default TrialBalanceReport;
