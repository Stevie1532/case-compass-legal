
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';

const ChartOfAccountsReport = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [accountType, setAccountType] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const chartOfAccounts = [
    {
      code: "1000",
      name: "Cash and Cash Equivalents",
      type: "Asset",
      category: "Current Assets",
      balance: 125000,
      status: "Active",
      description: "Operating cash accounts and short-term investments"
    },
    {
      code: "1100",
      name: "Accounts Receivable",
      type: "Asset",
      category: "Current Assets", 
      balance: 85000,
      status: "Active",
      description: "Outstanding client invoices and fees receivable"
    },
    {
      code: "1200",
      name: "Office Equipment",
      type: "Asset",
      category: "Fixed Assets",
      balance: 45000,
      status: "Active",
      description: "Computers, furniture, and office equipment"
    },
    {
      code: "1210",
      name: "Accumulated Depreciation - Equipment",
      type: "Asset",
      category: "Fixed Assets",
      balance: -15000,
      status: "Active",
      description: "Accumulated depreciation on office equipment"
    },
    {
      code: "1300",
      name: "Law Library",
      type: "Asset",
      category: "Fixed Assets",
      balance: 25000,
      status: "Active",
      description: "Legal books, research materials, and databases"
    },
    {
      code: "2000",
      name: "Accounts Payable",
      type: "Liability",
      category: "Current Liabilities",
      balance: 25000,
      status: "Active",
      description: "Outstanding vendor bills and expenses"
    },
    {
      code: "2100",
      name: "Accrued Expenses",
      type: "Liability",
      category: "Current Liabilities",
      balance: 15000,
      status: "Active",
      description: "Accrued payroll, benefits, and other expenses"
    },
    {
      code: "2200",
      name: "Client Trust Liability",
      type: "Liability",
      category: "Current Liabilities",
      balance: 50000,
      status: "Active",
      description: "Client funds held in trust"
    },
    {
      code: "3000",
      name: "Owner's Equity",
      type: "Equity",
      category: "Equity",
      balance: 180000,
      status: "Active",
      description: "Owner's investment and retained earnings"
    },
    {
      code: "4000",
      name: "Legal Fees Revenue",
      type: "Revenue",
      category: "Operating Revenue",
      balance: 420000,
      status: "Active",
      description: "Fees from legal services and representation"
    },
    {
      code: "4100",
      name: "Consultation Revenue",
      type: "Revenue",
      category: "Operating Revenue",
      balance: 85000,
      status: "Active",
      description: "Revenue from legal consultations"
    },
    {
      code: "5000",
      name: "Salary Expenses",
      type: "Expense",
      category: "Operating Expenses",
      balance: 280000,
      status: "Active",
      description: "Attorney and staff salaries"
    },
    {
      code: "5100",
      name: "Office Rent",
      type: "Expense",
      category: "Operating Expenses",
      balance: 120000,
      status: "Active",
      description: "Monthly office rent and facilities"
    },
    {
      code: "5200",
      name: "Professional Insurance",
      type: "Expense",
      category: "Operating Expenses",
      balance: 24000,
      status: "Active",
      description: "Malpractice and professional liability insurance"
    },
    {
      code: "5300",
      name: "Legal Research",
      type: "Expense",
      category: "Operating Expenses",
      balance: 18000,
      status: "Inactive",
      description: "Westlaw, Lexis, and other research tools"
    }
  ];

  const accountTypes = [...new Set(chartOfAccounts.map(item => item.type))];
  
  const filteredData = chartOfAccounts.filter(account => 
    (accountType === 'all' || account.type === accountType) &&
    (statusFilter === 'all' || account.status === statusFilter) &&
    (searchTerm === '' || 
     account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     account.code.includes(searchTerm) ||
     account.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalAccounts = chartOfAccounts.length;
  const activeAccounts = chartOfAccounts.filter(acc => acc.status === 'Active').length;

  return (
    <ReportLayout
      title="Chart of Accounts"
      description="Complete listing of all accounts used in the general ledger"
      filterable
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Accounts</p>
            <p className="text-2xl font-bold">{totalAccounts}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Active Accounts</p>
            <p className="text-2xl font-bold">{activeAccounts}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Inactive Accounts</p>
            <p className="text-2xl font-bold">{totalAccounts - activeAccounts}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Account Types</p>
            <p className="text-2xl font-bold">{accountTypes.length}</p>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-4 flex-1">
            <div className="flex-1">
              <Input
                placeholder="Search accounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={accountType} onValueChange={setAccountType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {accountTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-legal-light hover:bg-legal-dark">
            <Plus className="h-4 w-4 mr-2" />
            Add Account
          </Button>
        </div>

        {/* Accounts Table */}
        <div>
          <h3 className="text-lg font-medium mb-3">Account Details</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Account Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map(account => (
                <TableRow key={account.code}>
                  <TableCell className="font-mono font-medium">{account.code}</TableCell>
                  <TableCell className="font-medium">{account.name}</TableCell>
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
                  <TableCell className="text-sm text-muted-foreground">{account.category}</TableCell>
                  <TableCell className="text-right font-medium">
                    ${Math.abs(account.balance).toLocaleString()}
                    {account.balance < 0 && <span className="text-red-500"> (CR)</span>}
                  </TableCell>
                  <TableCell>
                    <Badge className={account.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {account.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                    {account.description}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-4 w-4" />
                      </Button>
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

export default ChartOfAccountsReport;
