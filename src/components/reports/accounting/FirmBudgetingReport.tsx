
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const FirmBudgetingReport = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  
  const budgetData = [
    {
      category: "Revenue",
      department: "Litigation",
      budgeted: 500000,
      actual: 485000,
      variance: -15000,
      variancePercent: -3.0,
      ytdBudgeted: 100000,
      ytdActual: 98500
    },
    {
      category: "Revenue",
      department: "Corporate Law",
      budgeted: 400000,
      actual: 420000,
      variance: 20000,
      variancePercent: 5.0,
      ytdBudgeted: 80000,
      ytdActual: 85200
    },
    {
      category: "Revenue",
      department: "Real Estate",
      budgeted: 300000,
      actual: 285000,
      variance: -15000,
      variancePercent: -5.0,
      ytdBudgeted: 60000,
      ytdActual: 57800
    },
    {
      category: "Expenses",
      department: "Salaries & Benefits",
      budgeted: 600000,
      actual: 585000,
      variance: -15000,
      variancePercent: -2.5,
      ytdBudgeted: 120000,
      ytdActual: 118500
    },
    {
      category: "Expenses", 
      department: "Office Rent",
      budgeted: 120000,
      actual: 120000,
      variance: 0,
      variancePercent: 0.0,
      ytdBudgeted: 24000,
      ytdActual: 24000
    },
    {
      category: "Expenses",
      department: "Marketing",
      budgeted: 50000,
      actual: 65000,
      variance: 15000,
      variancePercent: 30.0,
      ytdBudgeted: 10000,
      ytdActual: 13200
    },
    {
      category: "Expenses",
      department: "Professional Development",
      budgeted: 25000,
      actual: 18000,
      variance: -7000,
      variancePercent: -28.0,
      ytdBudgeted: 5000,
      ytdActual: 3600
    }
  ];

  const monthlyTrend = [
    { month: 'Jan', budgeted: 100000, actual: 95000 },
    { month: 'Feb', budgeted: 100000, actual: 105000 },
    { month: 'Mar', budgeted: 100000, actual: 98000 },
    { month: 'Apr', budgeted: 100000, actual: 112000 },
    { month: 'May', budgeted: 100000, actual: 108000 },
    { month: 'Jun', budgeted: 100000, actual: 115000 }
  ];

  const departments = [...new Set(budgetData.map(item => item.department))];
  
  const filteredData = selectedDepartment === 'all' 
    ? budgetData 
    : budgetData.filter(item => item.department === selectedDepartment);

  const totalBudgetedRevenue = budgetData.filter(item => item.category === 'Revenue').reduce((sum, item) => sum + item.budgeted, 0);
  const totalActualRevenue = budgetData.filter(item => item.category === 'Revenue').reduce((sum, item) => sum + item.actual, 0);
  const totalBudgetedExpenses = budgetData.filter(item => item.category === 'Expenses').reduce((sum, item) => sum + item.budgeted, 0);
  const totalActualExpenses = budgetData.filter(item => item.category === 'Expenses').reduce((sum, item) => sum + item.actual, 0);

  const budgetedNetIncome = totalBudgetedRevenue - totalBudgetedExpenses;
  const actualNetIncome = totalActualRevenue - totalActualExpenses;

  return (
    <ReportLayout
      title="Firm Budgeting Report"
      description="Budget vs actual performance analysis"
      filterable
      dateFilterable
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Budgeted Revenue</p>
            <p className="text-2xl font-bold">${totalBudgetedRevenue.toLocaleString()}</p>
            <p className="text-sm text-green-600">Actual: ${totalActualRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Budgeted Expenses</p>
            <p className="text-2xl font-bold">${totalBudgetedExpenses.toLocaleString()}</p>
            <p className="text-sm text-red-600">Actual: ${totalActualExpenses.toLocaleString()}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Budgeted Net Income</p>
            <p className="text-2xl font-bold">${budgetedNetIncome.toLocaleString()}</p>
            <p className="text-sm text-blue-600">Actual: ${actualNetIncome.toLocaleString()}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Net Variance</p>
            <p className={`text-2xl font-bold ${(actualNetIncome - budgetedNetIncome) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${Math.abs(actualNetIncome - budgetedNetIncome).toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">
              {((actualNetIncome - budgetedNetIncome) / budgetedNetIncome * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map(dept => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="text-lg font-medium mb-4">Monthly Budget vs Actual</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                <Line type="monotone" dataKey="budgeted" stroke="#8884d8" name="Budgeted" />
                <Line type="monotone" dataKey="actual" stroke="#82ca9d" name="Actual" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <h3 className="text-lg font-medium mb-4">Department Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={budgetData.filter(item => item.category === 'Revenue')}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                <Bar dataKey="budgeted" fill="#8884d8" name="Budgeted" />
                <Bar dataKey="actual" fill="#82ca9d" name="Actual" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Budget Performance Table */}
        <div>
          <h3 className="text-lg font-medium mb-3">Budget Performance Details</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Budgeted</TableHead>
                <TableHead className="text-right">Actual</TableHead>
                <TableHead className="text-right">Variance</TableHead>
                <TableHead className="text-right">Variance %</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Badge className={item.category === 'Revenue' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {item.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{item.department}</TableCell>
                  <TableCell className="text-right">${item.budgeted.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${item.actual.toLocaleString()}</TableCell>
                  <TableCell className={`text-right font-medium ${item.variance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${Math.abs(item.variance).toLocaleString()}
                  </TableCell>
                  <TableCell className={`text-right ${item.variancePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {item.variancePercent > 0 ? '+' : ''}{item.variancePercent}%
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      Math.abs(item.variancePercent) <= 5 ? 'bg-green-100 text-green-800' :
                      Math.abs(item.variancePercent) <= 15 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }>
                      {Math.abs(item.variancePercent) <= 5 ? 'On Target' :
                       Math.abs(item.variancePercent) <= 15 ? 'Caution' : 'Off Target'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="w-full">
                      <Progress 
                        value={(item.actual / item.budgeted) * 100} 
                        className="w-full h-2"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {((item.actual / item.budgeted) * 100).toFixed(0)}%
                      </p>
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

export default FirmBudgetingReport;
