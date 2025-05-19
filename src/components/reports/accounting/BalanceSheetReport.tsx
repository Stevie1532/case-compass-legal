
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const BalanceSheetReport = () => {
  const [period, setPeriod] = useState('current');
  
  // Sample data
  const currentPeriodData = {
    assets: [
      { name: "Cash & Cash Equivalents", amount: 250000.00 },
      { name: "Accounts Receivable", amount: 420000.00 },
      { name: "Prepaid Expenses", amount: 35000.00 },
      { name: "Office Equipment", amount: 180000.00 },
      { name: "Furniture & Fixtures", amount: 90000.00 },
      { name: "Accumulated Depreciation", amount: -85000.00 },
      { name: "Leasehold Improvements", amount: 120000.00 },
    ],
    liabilities: [
      { name: "Accounts Payable", amount: 95000.00 },
      { name: "Accrued Expenses", amount: 58000.00 },
      { name: "Short-term Debt", amount: 75000.00 },
      { name: "Deferred Revenue", amount: 110000.00 },
      { name: "Long-term Debt", amount: 250000.00 },
    ],
    equity: [
      { name: "Partner Capital", amount: 300000.00 },
      { name: "Retained Earnings", amount: 122000.00 },
    ]
  };
  
  const previousPeriodData = {
    assets: [
      { name: "Cash & Cash Equivalents", amount: 210000.00 },
      { name: "Accounts Receivable", amount: 380000.00 },
      { name: "Prepaid Expenses", amount: 28000.00 },
      { name: "Office Equipment", amount: 180000.00 },
      { name: "Furniture & Fixtures", amount: 90000.00 },
      { name: "Accumulated Depreciation", amount: -70000.00 },
      { name: "Leasehold Improvements", amount: 120000.00 },
    ],
    liabilities: [
      { name: "Accounts Payable", amount: 80000.00 },
      { name: "Accrued Expenses", amount: 45000.00 },
      { name: "Short-term Debt", amount: 100000.00 },
      { name: "Deferred Revenue", amount: 95000.00 },
      { name: "Long-term Debt", amount: 280000.00 },
    ],
    equity: [
      { name: "Partner Capital", amount: 300000.00 },
      { name: "Retained Earnings", amount: 38000.00 },
    ]
  };
  
  const data = period === 'current' ? currentPeriodData : previousPeriodData;
  
  const totalAssets = data.assets.reduce((sum, item) => sum + item.amount, 0);
  const totalLiabilities = data.liabilities.reduce((sum, item) => sum + item.amount, 0);
  const totalEquity = data.equity.reduce((sum, item) => sum + item.amount, 0);
  const totalLiabilitiesAndEquity = totalLiabilities + totalEquity;
  
  const calculateDifference = (current: number, previous: number) => {
    const diff = ((current - previous) / previous) * 100;
    return diff === Infinity ? 100 : isNaN(diff) ? 0 : diff;
  };
  
  const getCurrentVsPrevious = (field: string, section: 'assets' | 'liabilities' | 'equity') => {
    const currentItem = currentPeriodData[section].find(item => item.name === field);
    const previousItem = previousPeriodData[section].find(item => item.name === field);
    
    if (!currentItem || !previousItem) return { amount: 0, percentage: 0 };
    
    const difference = currentItem.amount - previousItem.amount;
    const percentage = calculateDifference(currentItem.amount, previousItem.amount);
    
    return { amount: difference, percentage };
  };

  return (
    <ReportLayout
      title="Balance Sheet"
      description="Statement of financial position as of the reporting date"
      dateFilterable
    >
      <div className="space-y-6">
        <Tabs defaultValue="summary" className="w-full">
          <TabsList>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="detailed">Detailed View</TabsTrigger>
            <TabsTrigger value="comparative">Comparative</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary">
            <Card>
              <CardHeader>
                <CardTitle>Financial Position Summary</CardTitle>
                <CardDescription>
                  As of {period === 'current' ? 'April 30, 2025' : 'December 31, 2024'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Assets</p>
                    <p className="text-2xl font-bold">${totalAssets.toFixed(2)}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Liabilities</p>
                    <p className="text-2xl font-bold">${totalLiabilities.toFixed(2)}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Equity</p>
                    <p className="text-2xl font-bold">${totalEquity.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Assets</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.assets.map((item) => (
                          <TableRow key={item.name}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="bg-gray-50 font-medium">
                          <TableCell>Total Assets</TableCell>
                          <TableCell className="text-right">${totalAssets.toFixed(2)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Liabilities & Equity</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.liabilities.map((item) => (
                          <TableRow key={item.name}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="bg-gray-50">
                          <TableCell className="font-medium">Total Liabilities</TableCell>
                          <TableCell className="text-right">${totalLiabilities.toFixed(2)}</TableCell>
                        </TableRow>
                        
                        {data.equity.map((item) => (
                          <TableRow key={item.name}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="bg-gray-50">
                          <TableCell className="font-medium">Total Equity</TableCell>
                          <TableCell className="text-right">${totalEquity.toFixed(2)}</TableCell>
                        </TableRow>
                        
                        <TableRow className="bg-gray-100 font-medium">
                          <TableCell>Total Liabilities & Equity</TableCell>
                          <TableCell className="text-right">${totalLiabilitiesAndEquity.toFixed(2)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="detailed">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Detailed Balance Sheet</h3>
                <div>
                  <select 
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="current">Current Period (Apr 2025)</option>
                    <option value="previous">Previous Period (Dec 2024)</option>
                  </select>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-medium mb-2">Assets</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">% of Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.assets.map((item) => (
                      <TableRow key={item.name}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          {((item.amount / totalAssets) * 100).toFixed(2)}%
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-gray-50 font-medium">
                      <TableCell>Total Assets</TableCell>
                      <TableCell className="text-right">${totalAssets.toFixed(2)}</TableCell>
                      <TableCell className="text-right">100.00%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div>
                <h4 className="text-md font-medium mb-2">Liabilities</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">% of Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.liabilities.map((item) => (
                      <TableRow key={item.name}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          {((item.amount / totalLiabilities) * 100).toFixed(2)}%
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-gray-50 font-medium">
                      <TableCell>Total Liabilities</TableCell>
                      <TableCell className="text-right">${totalLiabilities.toFixed(2)}</TableCell>
                      <TableCell className="text-right">100.00%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div>
                <h4 className="text-md font-medium mb-2">Equity</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">% of Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.equity.map((item) => (
                      <TableRow key={item.name}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          {((item.amount / totalEquity) * 100).toFixed(2)}%
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-gray-50 font-medium">
                      <TableCell>Total Equity</TableCell>
                      <TableCell className="text-right">${totalEquity.toFixed(2)}</TableCell>
                      <TableCell className="text-right">100.00%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="comparative">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Comparative Balance Sheet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Comparison between April 30, 2025 and December 31, 2024
                </p>
                
                <div>
                  <h4 className="text-md font-medium mb-2">Assets</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Account</TableHead>
                        <TableHead className="text-right">Current</TableHead>
                        <TableHead className="text-right">Previous</TableHead>
                        <TableHead className="text-right">Change ($)</TableHead>
                        <TableHead className="text-right">Change (%)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentPeriodData.assets.map((item) => {
                        const previous = previousPeriodData.assets.find(a => a.name === item.name);
                        const diff = getCurrentVsPrevious(item.name, 'assets');
                        
                        return (
                          <TableRow key={item.name}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                            <TableCell className="text-right">${previous?.amount.toFixed(2) || "0.00"}</TableCell>
                            <TableCell className={`text-right ${diff.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {diff.amount >= 0 ? '+' : ''}{diff.amount.toFixed(2)}
                            </TableCell>
                            <TableCell className={`text-right ${diff.percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {diff.percentage >= 0 ? '+' : ''}{diff.percentage.toFixed(2)}%
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      <TableRow className="bg-gray-50 font-medium">
                        <TableCell>Total Assets</TableCell>
                        <TableCell className="text-right">${totalAssets.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          ${previousPeriodData.assets.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          ${(totalAssets - previousPeriodData.assets.reduce((sum, item) => sum + item.amount, 0)).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          {calculateDifference(
                            totalAssets, 
                            previousPeriodData.assets.reduce((sum, item) => sum + item.amount, 0)
                          ).toFixed(2)}%
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-md font-medium mb-2">Liabilities & Equity</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Account</TableHead>
                        <TableHead className="text-right">Current</TableHead>
                        <TableHead className="text-right">Previous</TableHead>
                        <TableHead className="text-right">Change ($)</TableHead>
                        <TableHead className="text-right">Change (%)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentPeriodData.liabilities.map((item) => {
                        const previous = previousPeriodData.liabilities.find(a => a.name === item.name);
                        const diff = getCurrentVsPrevious(item.name, 'liabilities');
                        
                        return (
                          <TableRow key={item.name}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                            <TableCell className="text-right">${previous?.amount.toFixed(2) || "0.00"}</TableCell>
                            <TableCell className={`text-right ${diff.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {diff.amount >= 0 ? '+' : ''}{diff.amount.toFixed(2)}
                            </TableCell>
                            <TableCell className={`text-right ${diff.percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {diff.percentage >= 0 ? '+' : ''}{diff.percentage.toFixed(2)}%
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      <TableRow className="bg-gray-50">
                        <TableCell className="font-medium">Total Liabilities</TableCell>
                        <TableCell className="text-right">${totalLiabilities.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          ${previousPeriodData.liabilities.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          ${(totalLiabilities - previousPeriodData.liabilities.reduce((sum, item) => sum + item.amount, 0)).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          {calculateDifference(
                            totalLiabilities, 
                            previousPeriodData.liabilities.reduce((sum, item) => sum + item.amount, 0)
                          ).toFixed(2)}%
                        </TableCell>
                      </TableRow>
                      
                      {currentPeriodData.equity.map((item) => {
                        const previous = previousPeriodData.equity.find(a => a.name === item.name);
                        const diff = getCurrentVsPrevious(item.name, 'equity');
                        
                        return (
                          <TableRow key={item.name}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                            <TableCell className="text-right">${previous?.amount.toFixed(2) || "0.00"}</TableCell>
                            <TableCell className={`text-right ${diff.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {diff.amount >= 0 ? '+' : ''}{diff.amount.toFixed(2)}
                            </TableCell>
                            <TableCell className={`text-right ${diff.percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {diff.percentage >= 0 ? '+' : ''}{diff.percentage.toFixed(2)}%
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      <TableRow className="bg-gray-50">
                        <TableCell className="font-medium">Total Equity</TableCell>
                        <TableCell className="text-right">${totalEquity.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          ${previousPeriodData.equity.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          ${(totalEquity - previousPeriodData.equity.reduce((sum, item) => sum + item.amount, 0)).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          {calculateDifference(
                            totalEquity, 
                            previousPeriodData.equity.reduce((sum, item) => sum + item.amount, 0)
                          ).toFixed(2)}%
                        </TableCell>
                      </TableRow>
                      
                      <TableRow className="bg-gray-100 font-medium">
                        <TableCell>Total Liabilities & Equity</TableCell>
                        <TableCell className="text-right">${totalLiabilitiesAndEquity.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          ${(previousPeriodData.liabilities.reduce((sum, item) => sum + item.amount, 0) + 
                            previousPeriodData.equity.reduce((sum, item) => sum + item.amount, 0)).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          ${(totalLiabilitiesAndEquity - 
                            (previousPeriodData.liabilities.reduce((sum, item) => sum + item.amount, 0) + 
                            previousPeriodData.equity.reduce((sum, item) => sum + item.amount, 0))).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          {calculateDifference(
                            totalLiabilitiesAndEquity, 
                            (previousPeriodData.liabilities.reduce((sum, item) => sum + item.amount, 0) + 
                            previousPeriodData.equity.reduce((sum, item) => sum + item.amount, 0))
                          ).toFixed(2)}%
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ReportLayout>
  );
};

export default BalanceSheetReport;
