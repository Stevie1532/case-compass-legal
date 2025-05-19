
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const ExpenseAnalysisReport = () => {
  const [viewType, setViewType] = useState('monthly');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data - Monthly expenses by category
  const monthlyData = [
    { 
      month: 'Jan', 
      Rent: 15000, 
      Utilities: 5200, 
      'Office Supplies': 3800, 
      'Professional Services': 12000, 
      Travel: 8500, 
      'Software & IT': 7200 
    },
    { 
      month: 'Feb', 
      Rent: 15000, 
      Utilities: 4800, 
      'Office Supplies': 2500, 
      'Professional Services': 15000, 
      Travel: 6800, 
      'Software & IT': 7200 
    },
    { 
      month: 'Mar', 
      Rent: 15000, 
      Utilities: 4900, 
      'Office Supplies': 4200, 
      'Professional Services': 9000, 
      Travel: 9500, 
      'Software & IT': 7500 
    },
    { 
      month: 'Apr', 
      Rent: 16000, 
      Utilities: 5100, 
      'Office Supplies': 3100, 
      'Professional Services': 16000, 
      Travel: 12000, 
      'Software & IT': 7800 
    }
  ];
  
  // Sample data - Department expenses
  const departmentData = [
    {
      department: 'Administration',
      Rent: 5000, 
      Utilities: 1800, 
      'Office Supplies': 1200, 
      'Professional Services': 5000, 
      Travel: 3000, 
      'Software & IT': 2500,
      total: 18500
    },
    {
      department: 'Legal',
      Rent: 6000, 
      Utilities: 2000, 
      'Office Supplies': 1500, 
      'Professional Services': 8000, 
      Travel: 6000, 
      'Software & IT': 3500,
      total: 27000
    },
    {
      department: 'Finance',
      Rent: 3000, 
      Utilities: 800, 
      'Office Supplies': 800, 
      'Professional Services': 2000, 
      Travel: 1200, 
      'Software & IT': 1500,
      total: 9300
    },
    {
      department: 'Marketing',
      Rent: 2000, 
      Utilities: 500, 
      'Office Supplies': 600, 
      'Professional Services': 1000, 
      Travel: 1800, 
      'Software & IT': 800,
      total: 6700
    }
  ];
  
  const filteredDepartments = departmentData.filter(dept => 
    departmentFilter === 'all' || dept.department === departmentFilter
  ).filter(dept =>
    dept.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Monthly totals for trend analysis
  const monthlyTotals = monthlyData.map(month => {
    const sum = Object.entries(month)
      .filter(([key]) => key !== 'month')
      .reduce((acc, [_, value]) => acc + (value as number), 0);
    
    return {
      month: month.month,
      total: sum
    };
  });
  
  // Category totals for April
  const currentMonthData = monthlyData[monthlyData.length - 1];
  const categoryTotals = Object.entries(currentMonthData)
    .filter(([key]) => key !== 'month')
    .map(([category, amount]) => ({
      category,
      amount
    }));
  
  // Helper function to sum category expenses
  const calculateTotal = (data: typeof monthlyData) => {
    return data.reduce((acc, month) => {
      let monthTotal = 0;
      Object.entries(month).forEach(([key, value]) => {
        if (key !== 'month') {
          monthTotal += value as number;
        }
      });
      return acc + monthTotal;
    }, 0);
  };
  
  // Chart colors
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", "#FFBB28"];

  return (
    <ReportLayout
      title="Expense Analysis Report"
      description="Detailed breakdown of firm expenses by category and department"
      filterable
      dateFilterable
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">YTD Total Expenses</p>
            <p className="text-2xl font-bold">${calculateTotal(monthlyData).toFixed(2)}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Current Month Expenses</p>
            <p className="text-2xl font-bold">
              ${Object.entries(currentMonthData)
                .filter(([key]) => key !== 'month')
                .reduce((sum, [_, value]) => sum + (value as number), 0).toFixed(2)}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Largest Expense Category</p>
            <p className="text-2xl font-bold">
              {categoryTotals.sort((a, b) => (b.amount as number) - (a.amount as number))[0].category}
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Departments Tracked</p>
            <p className="text-2xl font-bold">{departmentData.length}</p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-2/3">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium">Expense Trends</h3>
              <Select value={viewType} onValueChange={setViewType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="View Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly View</SelectItem>
                  <SelectItem value="category">By Category</SelectItem>
                  <SelectItem value="trend">Trend Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="h-80 bg-white p-4 rounded-md border">
              <ResponsiveContainer width="100%" height="100%">
                {viewType === 'monthly' ? (
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                    <Legend />
                    {Object.keys(monthlyData[0])
                      .filter(key => key !== 'month')
                      .map((key, index) => (
                        <Bar 
                          key={key} 
                          dataKey={key} 
                          stackId="a" 
                          fill={colors[index % colors.length]} 
                        />
                      ))
                    }
                  </BarChart>
                ) : viewType === 'category' ? (
                  <BarChart data={categoryTotals}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                    <Bar dataKey="amount" fill="#8884d8" />
                  </BarChart>
                ) : (
                  <LineChart data={monthlyTotals}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="total" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                      name="Monthly Total" 
                    />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="w-full md:w-1/3">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium">Current Month Breakdown</h3>
            </div>
            <div className="bg-white p-4 rounded-md border h-80">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">%</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categoryTotals.sort((a, b) => (b.amount as number) - (a.amount as number)).map((category, index) => {
                    const total = categoryTotals.reduce((sum, cat) => sum + (cat.amount as number), 0);
                    const percentage = ((category.amount as number) / total) * 100;
                    
                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{category.category}</TableCell>
                        <TableCell className="text-right">${(category.amount as number).toFixed(2)}</TableCell>
                        <TableCell className="text-right">{percentage.toFixed(2)}%</TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow className="bg-gray-50 font-medium">
                    <TableCell>Total</TableCell>
                    <TableCell className="text-right">
                      ${categoryTotals.reduce((sum, cat) => sum + (cat.amount as number), 0).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">100.00%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Expenses by Department</h3>
            <div className="flex gap-2">
              <div className="w-64">
                <Input
                  type="text"
                  placeholder="Search departments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departmentData.map(dept => (
                    <SelectItem key={dept.department} value={dept.department}>{dept.department}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Rent</TableHead>
                <TableHead className="text-right">Utilities</TableHead>
                <TableHead className="text-right">Office Supplies</TableHead>
                <TableHead className="text-right">Prof. Services</TableHead>
                <TableHead className="text-right">Travel</TableHead>
                <TableHead className="text-right">Software & IT</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDepartments.map((dept) => (
                <TableRow key={dept.department}>
                  <TableCell className="font-medium">{dept.department}</TableCell>
                  <TableCell className="text-right">${dept.Rent.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${dept.Utilities.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${dept['Office Supplies'].toFixed(2)}</TableCell>
                  <TableCell className="text-right">${dept['Professional Services'].toFixed(2)}</TableCell>
                  <TableCell className="text-right">${dept.Travel.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${dept['Software & IT'].toFixed(2)}</TableCell>
                  <TableCell className="text-right font-medium">${dept.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
              {filteredDepartments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">No departments found matching your search</TableCell>
                </TableRow>
              ) : (
                <TableRow className="bg-gray-50 font-medium">
                  <TableCell>Totals</TableCell>
                  <TableCell className="text-right">
                    ${filteredDepartments.reduce((sum, dept) => sum + dept.Rent, 0).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${filteredDepartments.reduce((sum, dept) => sum + dept.Utilities, 0).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${filteredDepartments.reduce((sum, dept) => sum + dept['Office Supplies'], 0).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${filteredDepartments.reduce((sum, dept) => sum + dept['Professional Services'], 0).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${filteredDepartments.reduce((sum, dept) => sum + dept.Travel, 0).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${filteredDepartments.reduce((sum, dept) => sum + dept['Software & IT'], 0).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${filteredDepartments.reduce((sum, dept) => sum + dept.total, 0).toFixed(2)}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </ReportLayout>
  );
};

export default ExpenseAnalysisReport;
