
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RevenueTrendsReport = () => {
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('year');
  const [practiceArea, setPracticeArea] = useState('all');
  
  // Sample data - Monthly revenue
  const monthlyRevenueData = [
    { month: 'Jan', Revenue: 285000, Target: 275000, Expenses: 190000, Profit: 95000 },
    { month: 'Feb', Revenue: 320000, Target: 290000, Expenses: 205000, Profit: 115000 },
    { month: 'Mar', Revenue: 305000, Target: 300000, Expenses: 210000, Profit: 95000 },
    { month: 'Apr', Revenue: 340000, Target: 310000, Expenses: 220000, Profit: 120000 },
    { month: 'May', Revenue: 380000, Target: 320000, Expenses: 235000, Profit: 145000 },
    { month: 'Jun', Revenue: 410000, Target: 330000, Expenses: 245000, Profit: 165000 },
    { month: 'Jul', Revenue: 395000, Target: 340000, Expenses: 240000, Profit: 155000 },
    { month: 'Aug', Revenue: 360000, Target: 350000, Expenses: 230000, Profit: 130000 },
    { month: 'Sep', Revenue: 425000, Target: 360000, Expenses: 250000, Profit: 175000 },
    { month: 'Oct', Revenue: 450000, Target: 370000, Expenses: 260000, Profit: 190000 },
    { month: 'Nov', Revenue: 470000, Target: 380000, Expenses: 270000, Profit: 200000 },
    { month: 'Dec', Revenue: 490000, Target: 390000, Expenses: 280000, Profit: 210000 },
  ];
  
  // Practice area revenue
  const practiceAreaData = [
    { 
      area: "Corporate Law", 
      revenue: 1250000, 
      prevRevenue: 1100000, 
      growth: 13.6, 
      clients: 35, 
      avgCaseValue: 35714,
      monthlyData: [95000, 100000, 98000, 105000, 110000, 115000, 105000, 100000, 118000, 125000, 130000, 142000]
    },
    { 
      area: "Family Law", 
      revenue: 850000, 
      prevRevenue: 820000, 
      growth: 3.7, 
      clients: 120, 
      avgCaseValue: 7083,
      monthlyData: [65000, 70000, 68000, 72000, 75000, 80000, 72000, 69000, 74000, 76000, 78000, 82000]
    },
    { 
      area: "Criminal Law", 
      revenue: 920000, 
      prevRevenue: 880000, 
      growth: 4.5, 
      clients: 95, 
      avgCaseValue: 9684,
      monthlyData: [70000, 75000, 74000, 76000, 78000, 82000, 80000, 78000, 82000, 86000, 90000, 95000]
    },
    { 
      area: "Real Estate Law", 
      revenue: 980000, 
      prevRevenue: 850000, 
      growth: 15.3, 
      clients: 65, 
      avgCaseValue: 15077,
      monthlyData: [75000, 78000, 82000, 85000, 88000, 95000, 90000, 86000, 92000, 98000, 102000, 106000]
    },
    { 
      area: "Intellectual Property", 
      revenue: 1380000, 
      prevRevenue: 1250000, 
      growth: 10.4, 
      clients: 42, 
      avgCaseValue: 32857,
      monthlyData: [105000, 112000, 115000, 120000, 125000, 130000, 125000, 120000, 128000, 135000, 140000, 150000]
    }
  ];
  
  // Client segment data
  const clientSegmentData = [
    { name: 'Corporate', value: 3580000, color: '#8884d8' },
    { name: 'Small Business', value: 1250000, color: '#82ca9d' },
    { name: 'Individual', value: 1120000, color: '#ffc658' },
    { name: 'Government', value: 680000, color: '#ff8042' },
    { name: 'Non-Profit', value: 450000, color: '#0088FE' },
  ];
  
  // Filter practice area data
  const filteredPracticeData = practiceArea === 'all' 
    ? practiceAreaData 
    : practiceAreaData.filter(area => area.area === practiceArea);
  
  // Calculate totals and growth
  const totalRevenue = practiceAreaData.reduce((sum, area) => sum + area.revenue, 0);
  const totalPrevRevenue = practiceAreaData.reduce((sum, area) => sum + area.prevRevenue, 0);
  const overallGrowth = ((totalRevenue - totalPrevRevenue) / totalPrevRevenue) * 100;
  const totalClients = practiceAreaData.reduce((sum, area) => sum + area.clients, 0);
  
  // Generate monthly data by practice area
  const getMonthlySeriesData = () => {
    return monthlyRevenueData.map((month, index) => {
      const result = { month: month.month };
      filteredPracticeData.forEach(practice => {
        result[practice.area] = practice.monthlyData[index];
      });
      return result;
    });
  };
  
  // Get chart colors
  const getChartColor = (index: number) => {
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#FFBB28'];
    return colors[index % colors.length];
  };

  return (
    <ReportLayout
      title="Revenue Trends Report"
      description="Analysis of revenue trends across practice areas and time periods"
      dateFilterable
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Annual Revenue</p>
            <p className="text-2xl font-bold">${(totalRevenue / 1000000).toFixed(2)}M</p>
            <p className={`text-xs ${overallGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {overallGrowth >= 0 ? '↑' : '↓'} {Math.abs(overallGrowth).toFixed(1)}% from previous year
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Monthly Average</p>
            <p className="text-2xl font-bold">${(totalRevenue / 12 / 1000).toFixed(0)}K</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Clients</p>
            <p className="text-2xl font-bold">{totalClients}</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Avg. Case Value</p>
            <p className="text-2xl font-bold">${(totalRevenue / totalClients).toFixed(0)}</p>
          </div>
        </div>
        
        <Tabs defaultValue="revenue-trends">
          <TabsList>
            <TabsTrigger value="revenue-trends">Revenue Trends</TabsTrigger>
            <TabsTrigger value="practice-areas">Practice Areas</TabsTrigger>
            <TabsTrigger value="client-segments">Client Segments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="revenue-trends">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Revenue Over Time</h3>
                <div className="flex gap-2">
                  <Select value={chartType} onValueChange={setChartType}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Chart Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="line">Line Chart</SelectItem>
                      <SelectItem value="bar">Bar Chart</SelectItem>
                      <SelectItem value="area">Area Chart</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Time Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quarter">Last Quarter</SelectItem>
                      <SelectItem value="half">Last 6 Months</SelectItem>
                      <SelectItem value="year">Full Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="h-80 bg-white p-4 rounded-md border">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === 'line' ? (
                    <LineChart data={monthlyRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                      <Legend />
                      <Line type="monotone" dataKey="Revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="Target" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="Expenses" stroke="#ff8042" />
                      <Line type="monotone" dataKey="Profit" stroke="#0088FE" />
                    </LineChart>
                  ) : chartType === 'bar' ? (
                    <BarChart data={monthlyRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                      <Legend />
                      <Bar dataKey="Revenue" fill="#8884d8" />
                      <Bar dataKey="Expenses" fill="#ff8042" />
                      <Bar dataKey="Profit" fill="#0088FE" />
                    </BarChart>
                  ) : (
                    <LineChart data={monthlyRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                      <Legend />
                      <Line type="monotone" dataKey="Revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} area />
                      <Line type="monotone" dataKey="Expenses" stroke="#ff8042" fill="#ff8042" fillOpacity={0.3} area />
                      <Line type="monotone" dataKey="Profit" stroke="#0088FE" fill="#0088FE" fillOpacity={0.3} area />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Monthly Revenue Summary</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">Target</TableHead>
                      <TableHead className="text-right">Variance</TableHead>
                      <TableHead className="text-right">Expenses</TableHead>
                      <TableHead className="text-right">Profit</TableHead>
                      <TableHead className="text-right">Margin</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {monthlyRevenueData.slice(-6).map((month, index) => {
                      const variance = month.Revenue - month.Target;
                      const margin = (month.Profit / month.Revenue) * 100;
                      
                      return (
                        <TableRow key={index}>
                          <TableCell>{month.month}</TableCell>
                          <TableCell className="text-right">${month.Revenue.toLocaleString()}</TableCell>
                          <TableCell className="text-right">${month.Target.toLocaleString()}</TableCell>
                          <TableCell className={`text-right ${variance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {variance >= 0 ? '+' : ''}{variance.toLocaleString()}
                            <span className="text-xs ml-1">
                              ({((variance / month.Target) * 100).toFixed(1)}%)
                            </span>
                          </TableCell>
                          <TableCell className="text-right">${month.Expenses.toLocaleString()}</TableCell>
                          <TableCell className="text-right">${month.Profit.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{margin.toFixed(1)}%</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="practice-areas">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Revenue by Practice Area</h3>
                <Select value={practiceArea} onValueChange={setPracticeArea}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by practice area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Practice Areas</SelectItem>
                    {practiceAreaData.map(area => (
                      <SelectItem key={area.area} value={area.area}>{area.area}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-80">
                  <h4 className="text-md font-medium mb-2">Annual Revenue Comparison</h4>
                  <ResponsiveContainer width="100%" height="90%">
                    <BarChart data={filteredPracticeData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="area" type="category" width={150} />
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                      <Legend />
                      <Bar dataKey="revenue" name="Current Year" fill="#8884d8" />
                      <Bar dataKey="prevRevenue" name="Previous Year" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="h-80">
                  <h4 className="text-md font-medium mb-2">Monthly Trend</h4>
                  <ResponsiveContainer width="100%" height="90%">
                    <LineChart data={getMonthlySeriesData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                      <Legend />
                      {filteredPracticeData.map((practice, index) => (
                        <Line 
                          key={practice.area} 
                          type="monotone" 
                          dataKey={practice.area} 
                          stroke={getChartColor(index)} 
                          activeDot={{ r: 8 }} 
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Practice Area Performance</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Practice Area</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">% of Total</TableHead>
                      <TableHead className="text-right">YoY Growth</TableHead>
                      <TableHead className="text-right">Clients</TableHead>
                      <TableHead className="text-right">Avg. Case Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPracticeData.map((area) => (
                      <TableRow key={area.area}>
                        <TableCell className="font-medium">{area.area}</TableCell>
                        <TableCell className="text-right">${area.revenue.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          {((area.revenue / totalRevenue) * 100).toFixed(1)}%
                        </TableCell>
                        <TableCell className={`text-right ${area.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {area.growth >= 0 ? '+' : ''}{area.growth.toFixed(1)}%
                        </TableCell>
                        <TableCell className="text-right">{area.clients}</TableCell>
                        <TableCell className="text-right">${area.avgCaseValue.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                    {practiceArea === 'all' && (
                      <TableRow className="bg-gray-50 font-medium">
                        <TableCell>Total / Average</TableCell>
                        <TableCell className="text-right">${totalRevenue.toLocaleString()}</TableCell>
                        <TableCell className="text-right">100.0%</TableCell>
                        <TableCell className={`text-right ${overallGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {overallGrowth >= 0 ? '+' : ''}{overallGrowth.toFixed(1)}%
                        </TableCell>
                        <TableCell className="text-right">{totalClients}</TableCell>
                        <TableCell className="text-right">
                          ${(totalRevenue / totalClients).toFixed(0)}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="client-segments">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-80">
                  <h4 className="text-md font-medium mb-2">Revenue by Client Segment</h4>
                  <ResponsiveContainer width="100%" height="90%">
                    <BarChart data={clientSegmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                      <Bar dataKey="value" name="Revenue">
                        {clientSegmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div>
                  <h4 className="text-md font-medium mb-2">Client Segment Analysis</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Segment</TableHead>
                        <TableHead className="text-right">Revenue</TableHead>
                        <TableHead className="text-right">% of Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clientSegmentData.map((segment, index) => {
                        const totalValue = clientSegmentData.reduce((sum, s) => sum + s.value, 0);
                        const percentage = (segment.value / totalValue) * 100;
                        
                        return (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }}></div>
                                {segment.name}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">${segment.value.toLocaleString()}</TableCell>
                            <TableCell className="text-right">{percentage.toFixed(1)}%</TableCell>
                          </TableRow>
                        );
                      })}
                      <TableRow className="bg-gray-50 font-medium">
                        <TableCell>Total</TableCell>
                        <TableCell className="text-right">
                          ${clientSegmentData.reduce((sum, segment) => sum + segment.value, 0).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">100.0%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  
                  <div className="mt-4">
                    <h4 className="text-md font-medium mb-2">Key Insights</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Corporate clients represent our largest revenue segment at {((clientSegmentData[0].value / clientSegmentData.reduce((sum, s) => sum + s.value, 0)) * 100).toFixed(1)}% of total revenue</li>
                      <li>Small business clients have shown the highest growth rate this year</li>
                      <li>Government contracts provide steady revenue but lower margins</li>
                      <li>Individual client revenue has increased by 8.5% year-over-year</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Revenue Concentration Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <h4 className="text-sm font-medium mb-2">Top Client Concentration</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Top 5 clients</span>
                          <span>24% of revenue</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: "24%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Top 10 clients</span>
                          <span>35% of revenue</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: "35%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Top 20 clients</span>
                          <span>52% of revenue</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: "52%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <h4 className="text-sm font-medium mb-2">Revenue Stability</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Recurring</span>
                          <span>45% of revenue</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Repeat clients</span>
                          <span>30% of revenue</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "30%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>New clients</span>
                          <span>25% of revenue</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className="bg-orange-500 h-2 rounded-full" style={{ width: "25%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <h4 className="text-sm font-medium mb-2">Year-over-Year Growth</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Corporate</span>
                          <span>+8.5%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Small Business</span>
                          <span>+12.2%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: "92%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Individual</span>
                          <span>+4.8%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ReportLayout>
  );
};

export default RevenueTrendsReport;
