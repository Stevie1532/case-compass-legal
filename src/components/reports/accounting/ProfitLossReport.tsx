
import React from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AreaChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const ProfitLossReport = () => {
  // Sample data - would come from API in real app
  const financialData = {
    revenue: {
      clientFees: 1250000,
      consultingFees: 320000,
      otherRevenue: 75000
    },
    expenses: {
      salaries: 680000,
      benefits: 185000,
      rent: 120000,
      equipment: 45000,
      marketing: 35000,
      utilities: 28000,
      travel: 42000,
      professional: 55000,
      other: 30000
    }
  };
  
  const [period, setPeriod] = React.useState("ytd");
  const [compareWith, setCompareWith] = React.useState("none");
  
  // Calculate totals
  const totalRevenue = Object.values(financialData.revenue).reduce((a, b) => a + b, 0);
  const totalExpenses = Object.values(financialData.expenses).reduce((a, b) => a + b, 0);
  const netIncome = totalRevenue - totalExpenses;
  
  // Monthly data for chart
  const monthlyData = [
    { month: 'Jan', revenue: 135000, expenses: 98000, profit: 37000 },
    { month: 'Feb', revenue: 142000, expenses: 102000, profit: 40000 },
    { month: 'Mar', revenue: 158000, expenses: 110000, profit: 48000 },
    { month: 'Apr', revenue: 165000, expenses: 115000, profit: 50000 },
    { month: 'May', revenue: 172000, expenses: 118000, profit: 54000 },
    { month: 'Jun', revenue: 168000, expenses: 116000, profit: 52000 },
    { month: 'Jul', revenue: 175000, expenses: 120000, profit: 55000 },
    { month: 'Aug', revenue: 180000, expenses: 123000, profit: 57000 },
    { month: 'Sep', revenue: 178000, expenses: 125000, profit: 53000 },
    { month: 'Oct', revenue: 185000, expenses: 130000, profit: 55000 },
    { month: 'Nov', revenue: 190000, expenses: 132000, profit: 58000 },
    { month: 'Dec', revenue: 197000, expenses: 136000, profit: 61000 }
  ];

  return (
    <ReportLayout
      title="Profit & Loss Report"
      description="Financial performance summary"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Year-to-Date Performance</h3>
          </div>
          <div className="flex gap-4">
            <div className="w-[180px]">
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ytd">Year to Date</SelectItem>
                  <SelectItem value="q1">Q1 2025</SelectItem>
                  <SelectItem value="q2">Q2 2025</SelectItem>
                  <SelectItem value="q3">Q3 2025</SelectItem>
                  <SelectItem value="q4">Q4 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-[180px]">
              <Select value={compareWith} onValueChange={setCompareWith}>
                <SelectTrigger>
                  <SelectValue placeholder="Compare With" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Comparison</SelectItem>
                  <SelectItem value="prev">Previous Year</SelectItem>
                  <SelectItem value="budget">Budget</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Expenses</p>
            <p className="text-2xl font-bold">${totalExpenses.toLocaleString()}</p>
          </div>
          <div className={`p-4 rounded-lg ${netIncome > 0 ? 'bg-green-50' : 'bg-amber-50'}`}>
            <p className="text-sm text-muted-foreground">Net Income</p>
            <p className="text-2xl font-bold">${netIncome.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Profit Margin: {((netIncome / totalRevenue) * 100).toFixed(1)}%</p>
          </div>
        </div>
        
        <div className="h-80">
          <h3 className="text-lg font-medium mb-3">Monthly Trend</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`$${Number(value).toLocaleString()}`]}
              />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" name="Revenue" />
              <Line type="monotone" dataKey="expenses" stroke="#ef4444" name="Expenses" />
              <Line type="monotone" dataKey="profit" stroke="#10b981" name="Profit" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Revenue Breakdown</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">% of Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Client Fees</TableCell>
                  <TableCell className="text-right">${financialData.revenue.clientFees.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{((financialData.revenue.clientFees / totalRevenue) * 100).toFixed(1)}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Consulting Fees</TableCell>
                  <TableCell className="text-right">${financialData.revenue.consultingFees.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{((financialData.revenue.consultingFees / totalRevenue) * 100).toFixed(1)}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Other Revenue</TableCell>
                  <TableCell className="text-right">${financialData.revenue.otherRevenue.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{((financialData.revenue.otherRevenue / totalRevenue) * 100).toFixed(1)}%</TableCell>
                </TableRow>
                <TableRow className="font-medium">
                  <TableCell>Total Revenue</TableCell>
                  <TableCell className="text-right">${totalRevenue.toLocaleString()}</TableCell>
                  <TableCell className="text-right">100%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Expense Breakdown</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">% of Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(financialData.expenses).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</TableCell>
                    <TableCell className="text-right">${value.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{((value / totalExpenses) * 100).toFixed(1)}%</TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-medium">
                  <TableCell>Total Expenses</TableCell>
                  <TableCell className="text-right">${totalExpenses.toLocaleString()}</TableCell>
                  <TableCell className="text-right">100%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </ReportLayout>
  );
};

export default ProfitLossReport;
