
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ExpensesReport = () => {
  const [expenseType, setExpenseType] = useState('all');
  const [employee, setEmployee] = useState('all');
  
  // Sample data
  const expenseData = [
    {
      id: "EXP-001",
      employee: "John Smith",
      employeeId: "EMP-001",
      department: "Corporate Law",
      date: "2024-01-15",
      category: "Travel",
      description: "Client meeting in San Francisco",
      amount: 1250.00,
      status: "Approved",
      reimbursable: true,
      clientChargeable: true,
      client: "ABC Corporation",
      receipt: "Yes"
    },
    {
      id: "EXP-002",
      employee: "Sarah Johnson",
      employeeId: "EMP-002",
      department: "Family Law",
      date: "2024-01-18",
      category: "Meals",
      description: "Client dinner meeting",
      amount: 185.50,
      status: "Pending",
      reimbursable: true,
      clientChargeable: true,
      client: "Johnson Family",
      receipt: "Yes"
    },
    {
      id: "EXP-003",
      employee: "Michael Chen",
      employeeId: "EMP-003",
      department: "Criminal Law",
      date: "2024-01-20",
      category: "Office Supplies",
      description: "Case file folders and supplies",
      amount: 125.75,
      status: "Approved",
      reimbursable: true,
      clientChargeable: false,
      client: "N/A",
      receipt: "Yes"
    },
    {
      id: "EXP-004",
      employee: "Jessica Taylor",
      employeeId: "EMP-004",
      department: "Corporate Law",
      date: "2024-01-22",
      category: "Technology",
      description: "Legal research software subscription",
      amount: 299.00,
      status: "Approved",
      reimbursable: true,
      clientChargeable: false,
      client: "N/A",
      receipt: "Yes"
    },
    {
      id: "EXP-005",
      employee: "David Wilson",
      employeeId: "EMP-005",
      department: "Real Estate",
      date: "2024-01-25",
      category: "Travel",
      description: "Property inspection trip",
      amount: 850.00,
      status: "Rejected",
      reimbursable: false,
      clientChargeable: true,
      client: "Green Properties LLC",
      receipt: "No"
    }
  ];

  const employees = [...new Set(expenseData.map(expense => expense.employee))];
  const categories = [...new Set(expenseData.map(expense => expense.category))];
  
  const filteredData = expenseData.filter(expense => {
    const typeMatch = expenseType === 'all' || expense.category === expenseType;
    const employeeMatch = employee === 'all' || expense.employee === employee;
    return typeMatch && employeeMatch;
  });

  // Category breakdown for pie chart
  const categoryData = categories.map(category => {
    const categoryExpenses = filteredData.filter(expense => expense.category === category);
    const total = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    return {
      name: category,
      value: total,
      count: categoryExpenses.length
    };
  });

  // Monthly trends
  const monthlyData = [
    { month: 'Oct', expenses: 3200, count: 15 },
    { month: 'Nov', expenses: 4100, count: 18 },
    { month: 'Dec', expenses: 2800, count: 12 },
    { month: 'Jan', expenses: 2710, count: 8 }
  ];

  const totalExpenses = filteredData.reduce((sum, expense) => sum + expense.amount, 0);
  const approvedExpenses = expenseData.filter(expense => expense.status === 'Approved').reduce((sum, expense) => sum + expense.amount, 0);
  const pendingExpenses = expenseData.filter(expense => expense.status === 'Pending').reduce((sum, expense) => sum + expense.amount, 0);
  const reimbursableExpenses = expenseData.filter(expense => expense.reimbursable).reduce((sum, expense) => sum + expense.amount, 0);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const pieColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe'];

  return (
    <ReportLayout
      title="Expenses Report"
      description="Employee expenses and reimbursement tracking"
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
            <p className="text-sm text-muted-foreground">Reimbursable</p>
            <p className="text-2xl font-bold">${reimbursableExpenses.toFixed(2)}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Expenses by Category</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: $${Number(value).toLocaleString()}`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Amount']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Monthly Expense Trends</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip 
                    formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Expenses']}
                  />
                  <Line type="monotone" dataKey="expenses" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Expense Details Table */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Expense Details</h3>
            <div className="flex gap-2">
              <Select value={expenseType} onValueChange={setExpenseType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={employee} onValueChange={setEmployee}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by employee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Employees</SelectItem>
                  {employees.map(emp => (
                    <SelectItem key={emp} value={emp}>{emp}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Client</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Reimbursable</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map(expense => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell className="font-medium">{expense.employee}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.client}</TableCell>
                  <TableCell className="text-right">${expense.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={expense.reimbursable ? 'default' : 'secondary'}>
                      {expense.reimbursable ? 'Yes' : 'No'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(expense.status)}>
                      {expense.status}
                    </Badge>
                  </TableCell>
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

export default ExpensesReport;
