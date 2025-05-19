
import React from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';

const CashFlowReport = () => {
  // Sample data - would come from API in real app
  const cashFlowData = {
    operating: {
      collectionsFromClients: 1420000,
      otherOperatingCash: 65000,
      paymentsToVendors: -320000,
      paymentsToEmployees: -850000,
      otherOperatingPayments: -65000
    },
    investing: {
      equipmentPurchases: -85000,
      proceedsFromSales: 12000,
      softwareAcquisitions: -35000
    },
    financing: {
      loanProceeds: 50000,
      loanRepayments: -75000,
      capitalContributions: 0,
      distributions: -120000
    }
  };
  
  const [period, setPeriod] = React.useState("ytd");
  
  // Calculate totals
  const netOperatingCash = Object.values(cashFlowData.operating).reduce((a, b) => a + b, 0);
  const netInvestingCash = Object.values(cashFlowData.investing).reduce((a, b) => a + b, 0);
  const netFinancingCash = Object.values(cashFlowData.financing).reduce((a, b) => a + b, 0);
  const netCashChange = netOperatingCash + netInvestingCash + netFinancingCash;
  
  // Monthly data for chart
  const monthlyData = [
    { month: 'Jan', cash: 250000, operating: 42000, investing: -5000, financing: -15000 },
    { month: 'Feb', cash: 272000, operating: 45000, investing: -8000, financing: -15000 },
    { month: 'Mar', cash: 294000, operating: 50000, investing: -13000, financing: -15000 },
    { month: 'Apr', cash: 316000, operating: 47000, investing: -10000, financing: -15000 },
    { month: 'May', cash: 338000, operating: 52000, investing: -15000, financing: -15000 },
    { month: 'Jun', cash: 360000, operating: 49000, investing: -12000, financing: -15000 },
    { month: 'Jul', cash: 382000, operating: 52000, investing: -15000, financing: -15000 },
    { month: 'Aug', cash: 404000, operating: 55000, investing: -18000, financing: -15000 },
    { month: 'Sep', cash: 426000, operating: 50000, investing: -13000, financing: -15000 },
    { month: 'Oct', cash: 448000, operating: 51000, investing: -14000, financing: -15000 },
    { month: 'Nov', cash: 470000, operating: 53000, investing: -16000, financing: -15000 },
    { month: 'Dec', cash: 492000, operating: 57000, investing: -20000, financing: -15000 }
  ];

  return (
    <ReportLayout
      title="Cash Flow Report"
      description="Analysis of cash movement and liquidity"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Year-to-Date Cash Flow</h3>
          </div>
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
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Net Operating Cash</p>
            <p className="text-2xl font-bold">${netOperatingCash.toLocaleString()}</p>
          </div>
          <div className={`p-4 rounded-lg ${netInvestingCash >= 0 ? 'bg-blue-50' : 'bg-amber-50'}`}>
            <p className="text-sm text-muted-foreground">Net Investing Cash</p>
            <p className="text-2xl font-bold">${netInvestingCash.toLocaleString()}</p>
          </div>
          <div className={`p-4 rounded-lg ${netFinancingCash >= 0 ? 'bg-blue-50' : 'bg-amber-50'}`}>
            <p className="text-sm text-muted-foreground">Net Financing Cash</p>
            <p className="text-2xl font-bold">${netFinancingCash.toLocaleString()}</p>
          </div>
          <div className={`p-4 rounded-lg ${netCashChange >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
            <p className="text-sm text-muted-foreground">Net Change in Cash</p>
            <p className="text-2xl font-bold">${netCashChange.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="h-80">
          <h3 className="text-lg font-medium mb-3">Cash Balance Trend</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={monthlyData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`]} />
              <Area type="monotone" dataKey="cash" stroke="#3b82f6" fill="#93c5fd" name="Cash Balance" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Operating Activities</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Collections from Clients</TableCell>
                  <TableCell className="text-right text-green-600">${cashFlowData.operating.collectionsFromClients.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Other Operating Cash</TableCell>
                  <TableCell className="text-right text-green-600">${cashFlowData.operating.otherOperatingCash.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Payments to Vendors</TableCell>
                  <TableCell className="text-right text-red-600">${cashFlowData.operating.paymentsToVendors.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Payments to Employees</TableCell>
                  <TableCell className="text-right text-red-600">${cashFlowData.operating.paymentsToEmployees.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Other Operating Payments</TableCell>
                  <TableCell className="text-right text-red-600">${cashFlowData.operating.otherOperatingPayments.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow className="font-medium bg-gray-50">
                  <TableCell>Net Operating Cash</TableCell>
                  <TableCell className={`text-right ${netOperatingCash >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${netOperatingCash.toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Investing Activities</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Equipment Purchases</TableCell>
                  <TableCell className="text-right text-red-600">${cashFlowData.investing.equipmentPurchases.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Proceeds from Sales</TableCell>
                  <TableCell className="text-right text-green-600">${cashFlowData.investing.proceedsFromSales.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Software Acquisitions</TableCell>
                  <TableCell className="text-right text-red-600">${cashFlowData.investing.softwareAcquisitions.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow className="font-medium bg-gray-50">
                  <TableCell>Net Investing Cash</TableCell>
                  <TableCell className={`text-right ${netInvestingCash >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${netInvestingCash.toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Financing Activities</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Loan Proceeds</TableCell>
                  <TableCell className="text-right text-green-600">${cashFlowData.financing.loanProceeds.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Loan Repayments</TableCell>
                  <TableCell className="text-right text-red-600">${cashFlowData.financing.loanRepayments.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Capital Contributions</TableCell>
                  <TableCell className="text-right">${cashFlowData.financing.capitalContributions.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Partner Distributions</TableCell>
                  <TableCell className="text-right text-red-600">${cashFlowData.financing.distributions.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow className="font-medium bg-gray-50">
                  <TableCell>Net Financing Cash</TableCell>
                  <TableCell className={`text-right ${netFinancingCash >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${netFinancingCash.toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </ReportLayout>
  );
};

export default CashFlowReport;
