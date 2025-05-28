import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, PieChart, Pie, LineChart, Line } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const ExpenseAnalysisReport = () => {
  const [category, setCategory] = useState('all');
  const [timeframe, setTimeframe] = useState('current-month');
  
  // Sample data
  const expenseData = [
    {
      id: "EXP-001",
      category: "Office Supplies",
      description: "Legal pads, pens, printing paper",
      amount: 245.50,
      date: "2024-01-15",
      vendor: "Office Depot",
      department: "General",
      status: "Approved",
      budgetCategory: "Supplies"
    },
    {
      id: "EXP-002",
      category: "Travel",
      description: "Client meeting - airfare to Chicago",
      amount: 680.00,
      date: "2024-01-18",
      vendor: "American Airlines",
      department: "Corporate Law",
      status: "Approved",
      budgetCategory: "Travel"
    },
    {
      id: "EXP-003",
      category: "Technology",
      description: "Software licenses - Westlaw subscription",
      amount: 1250.00,
      date: "2024-01-20",
      vendor: "Thomson Reuters",
      department: "Research",
      status: "Approved",
      budgetCategory: "Technology"
    },
    {
      id: "EXP-004",
      category: "Professional Services",
      description: "Expert witness consultation",
      amount: 3500.00,
      date: "2024-01-22",
      vendor: "Medical Experts Inc",
      department: "Personal Injury",
      status: "Pending",
      budgetCategory: "Professional Services"
    },
    {
      id: "EXP-005",
      category: "Marketing",
      description: "Website maintenance and SEO",
      amount: 850.00,
      date: "2024-01-25",
      vendor: "Digital Solutions",
      department: "Marketing",
      status: "Approved",
      budgetCategory: "Marketing"
    }
  ];

  const categories = [...new Set(expenseData.map(expense => expense.category))];
  
  const filteredExpenses = category === 'all' 
    ? expenseData 
    : expenseData.filter(expense => expense.category === category);

  // Calculate category totals
  const categoryTotals = categories.map(cat => {
    const categoryExpenses = expenseData.filter(exp => exp.category === cat);
    const total = categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    
    return {
      category: cat,
      total,
      count: categoryExpenses.length,
      avgAmount: total / categoryExpenses.length
    };
  });

  // Trend data (last 4 months)
  const trendData = [
    { month: 'Oct', total: 8500, budget: 10000 },
    { month: 'Nov', total: 9200, budget: 10000 },
    { month: 'Dec', total: 11800, budget: 12000 },
    { month: 'Jan', total: 10300, budget: 11000 }
  ];

  const totalExpenses = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const pendingExpenses = expenseData.filter(exp => exp.status === 'Pending').reduce((sum, exp) => sum + exp.amount, 0);
  const approvedExpenses = expenseData.filter(exp => exp.status === 'Approved').reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <ReportLayout
      title="Expense Analysis Report"
      description="Detailed analysis of firm expenses by category and department"
      filterable
      dateFilterable
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Expenses</p>
            <p className="text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Approved</p>
            <p className="text-2xl font-bold">${approvedExpenses.toFixed(2)}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold">${pendingExpenses.toFixed(2)}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Avg per Expense</p>
            <p className="text-2xl font-bold">${(totalExpenses / filteredExpenses.length).toFixed(2)}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium">Expenses by Category</h3>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryTotals}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <RechartsTooltip 
                    formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Total Amount']}
                  />
                  <Bar dataKey="total" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Expense Trends</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip 
                    formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Amount']}
                  />
                  <Line type="monotone" dataKey="total" stroke="#8884d8" name="Actual" />
                  <Line type="monotone" dataKey="budget" stroke="#82ca9d" name="Budget" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Detailed Table */}
        <div>
          <h3 className="text-lg font-medium mb-3">Expense Details</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.map(expense => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.vendor}</TableCell>
                  <TableCell>{expense.department}</TableCell>
                  <TableCell className="text-right">${expense.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      expense.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {expense.status}
                    </span>
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

export default ExpenseAnalysisReport;
