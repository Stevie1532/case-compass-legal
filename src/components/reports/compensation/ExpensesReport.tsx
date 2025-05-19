
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const ExpensesReport = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data
  const expenseCategories = [
    { name: "Travel", amount: 12500.00, color: "#8884d8" },
    { name: "Office Supplies", amount: 3200.00, color: "#82ca9d" },
    { name: "Client Entertainment", amount: 8400.00, color: "#ffc658" },
    { name: "Professional Development", amount: 6700.00, color: "#ff8042" },
    { name: "Research Materials", amount: 4300.00, color: "#0088FE" },
    { name: "Software Subscriptions", amount: 7200.00, color: "#FFBB28" },
  ];
  
  const expenseData = [
    { id: "EXP-001", date: "2025-04-05", employee: "John Smith", category: "Travel", description: "Flight to New York for client meeting", amount: 850.00, status: "Approved" },
    { id: "EXP-002", date: "2025-04-07", employee: "Sarah Johnson", category: "Office Supplies", description: "Printer toner and paper", amount: 320.00, status: "Approved" },
    { id: "EXP-003", date: "2025-04-10", employee: "Michael Chen", category: "Client Entertainment", description: "Dinner with ABC Corp executives", amount: 780.00, status: "Pending" },
    { id: "EXP-004", date: "2025-04-12", employee: "Jessica Taylor", category: "Professional Development", description: "Legal conference registration", amount: 1200.00, status: "Approved" },
    { id: "EXP-005", date: "2025-04-15", employee: "David Wilson", category: "Research Materials", description: "Industry reports subscription", amount: 550.00, status: "Rejected" },
    { id: "EXP-006", date: "2025-04-18", employee: "Emily Rodriguez", category: "Software Subscriptions", description: "Legal research database access", amount: 980.00, status: "Approved" },
    { id: "EXP-007", date: "2025-04-20", employee: "John Smith", category: "Travel", description: "Hotel stay in Chicago", amount: 720.00, status: "Approved" },
    { id: "EXP-008", date: "2025-04-22", employee: "Sarah Johnson", category: "Client Entertainment", description: "Lunch with Smith & Associates team", amount: 420.00, status: "Pending" },
    { id: "EXP-009", date: "2025-04-25", employee: "Michael Chen", category: "Professional Development", description: "Online legal course", amount: 380.00, status: "Approved" },
    { id: "EXP-010", date: "2025-04-28", employee: "Jessica Taylor", category: "Office Supplies", description: "Office furniture", amount: 950.00, status: "Rejected" },
  ];
  
  const filteredExpenses = expenseData.filter(expense => 
    expense.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalAmount = expenseData
    .filter(expense => expense.status === "Approved")
    .reduce((sum, expense) => sum + expense.amount, 0);
  
  const pendingAmount = expenseData
    .filter(expense => expense.status === "Pending")
    .reduce((sum, expense) => sum + expense.amount, 0);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Approved</Badge>;
      case 'Pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'Rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <ReportLayout
      title="Expense Report"
      description="Summary and breakdown of employee expenses"
      dateFilterable
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Approved Expenses</p>
            <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Pending Approval</p>
            <p className="text-2xl font-bold">${pendingAmount.toFixed(2)}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Transactions</p>
            <p className="text-2xl font-bold">{expenseData.length}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Expenses by Category</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseCategories}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="amount"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {expenseCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Expense Categories</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">% of Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenseCategories.map((category) => {
                  const totalCategoryAmount = expenseCategories.reduce((sum, cat) => sum + cat.amount, 0);
                  const percentage = (category.amount / totalCategoryAmount) * 100;
                  
                  return (
                    <TableRow key={category.name}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                          {category.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">${category.amount.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{percentage.toFixed(2)}%</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Expense Transactions</h3>
            <div className="w-64">
              <Input
                type="text"
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.map(expense => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.id}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.employee}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell className="max-w-xs truncate">{expense.description}</TableCell>
                  <TableCell className="text-right">${expense.amount.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(expense.status)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Details</Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredExpenses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">No expenses found matching your search</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </ReportLayout>
  );
};

export default ExpensesReport;
