
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const FlatFeeProductivityReport = () => {
  const [period, setPeriod] = useState('monthly');
  const [attorney, setAttorney] = useState('all');
  
  const flatFeeData = [
    {
      matterId: "FF-2024-001",
      clientName: "Quick Divorce LLC",
      matterType: "Uncontested Divorce",
      attorney: "Sarah Johnson",
      flatFeeAmount: 2500,
      hoursSpent: 8.5,
      hourlyEquivalent: 294,
      targetHours: 10,
      efficiency: 117.6,
      status: "Completed",
      startDate: "2024-01-05",
      completionDate: "2024-01-15",
      profitMargin: 85.2
    },
    {
      matterId: "FF-2024-002",
      clientName: "Startup Incorporation Inc",
      matterType: "Business Formation",
      attorney: "Michael Chen",
      flatFeeAmount: 1500,
      hoursSpent: 6.0,
      hourlyEquivalent: 250,
      targetHours: 8,
      efficiency: 133.3,
      status: "Completed",
      startDate: "2024-01-08",
      completionDate: "2024-01-12",
      profitMargin: 88.7
    },
    {
      matterId: "FF-2024-003",
      clientName: "Estate Planning Plus",
      matterType: "Simple Will",
      attorney: "Emily Davis",
      flatFeeAmount: 800,
      hoursSpent: 3.5,
      hourlyEquivalent: 228,
      targetHours: 4,
      efficiency: 114.3,
      status: "Completed",
      startDate: "2024-01-10",
      completionDate: "2024-01-12",
      profitMargin: 82.5
    },
    {
      matterId: "FF-2024-004",
      clientName: "Property Transfer Co",
      matterType: "Real Estate Closing",
      attorney: "David Wilson",
      flatFeeAmount: 1200,
      hoursSpent: 7.5,
      hourlyEquivalent: 160,
      targetHours: 5,
      efficiency: 66.7,
      status: "Completed",
      startDate: "2024-01-12",
      completionDate: "2024-01-18",
      profitMargin: 65.8
    },
    {
      matterId: "FF-2024-005",
      clientName: "Contract Review Services",
      matterType: "Contract Review",
      attorney: "Lisa Martinez",
      flatFeeAmount: 1000,
      hoursSpent: 4.0,
      hourlyEquivalent: 250,
      targetHours: 5,
      efficiency: 125.0,
      status: "In Progress",
      startDate: "2024-01-15",
      completionDate: "",
      profitMargin: 78.3
    }
  ];

  const matterTypeData = [
    { type: 'Uncontested Divorce', count: 1, revenue: 2500, avgHours: 8.5 },
    { type: 'Business Formation', count: 1, revenue: 1500, avgHours: 6.0 },
    { type: 'Simple Will', count: 1, revenue: 800, avgHours: 3.5 },
    { type: 'Real Estate Closing', count: 1, revenue: 1200, avgHours: 7.5 },
    { type: 'Contract Review', count: 1, revenue: 1000, avgHours: 4.0 }
  ];

  const attorneyPerformance = [
    { name: 'Sarah Johnson', matters: 1, revenue: 2500, avgEfficiency: 117.6 },
    { name: 'Michael Chen', matters: 1, revenue: 1500, avgEfficiency: 133.3 },
    { name: 'Emily Davis', matters: 1, revenue: 800, avgEfficiency: 114.3 },
    { name: 'David Wilson', matters: 1, revenue: 1200, avgEfficiency: 66.7 },
    { name: 'Lisa Martinez', matters: 1, revenue: 1000, avgEfficiency: 125.0 }
  ];

  const efficiencyData = [
    { name: 'High Efficiency (>110%)', value: 3, color: '#82ca9d' },
    { name: 'Target Efficiency (90-110%)', value: 1, color: '#8884d8' },
    { name: 'Low Efficiency (<90%)', value: 1, color: '#ffc658' }
  ];

  const attorneys = [...new Set(flatFeeData.map(item => item.attorney))];
  
  const filteredData = attorney === 'all' 
    ? flatFeeData 
    : flatFeeData.filter(item => item.attorney === attorney);

  const totalRevenue = filteredData.reduce((sum, matter) => sum + matter.flatFeeAmount, 0);
  const totalHours = filteredData.reduce((sum, matter) => sum + matter.hoursSpent, 0);
  const avgEfficiency = filteredData.reduce((sum, matter) => sum + matter.efficiency, 0) / filteredData.length;
  const avgProfitMargin = filteredData.reduce((sum, matter) => sum + matter.profitMargin, 0) / filteredData.length;

  return (
    <ReportLayout
      title="Flat Fee Productivity Report"
      description="Analysis of flat fee matter efficiency and profitability"
      filterable
      dateFilterable
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Hours</p>
            <p className="text-2xl font-bold">{totalHours.toFixed(1)}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Avg Efficiency</p>
            <p className="text-2xl font-bold">{avgEfficiency.toFixed(0)}%</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Avg Profit Margin</p>
            <p className="text-2xl font-bold">{avgProfitMargin.toFixed(1)}%</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="annual">Annual</SelectItem>
            </SelectContent>
          </Select>
          <Select value={attorney} onValueChange={setAttorney}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Attorney" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Attorneys</SelectItem>
              {attorneys.map(att => (
                <SelectItem key={att} value={att}>{att}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="text-lg font-medium mb-4">Revenue by Matter Type</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={matterTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                <Bar dataKey="revenue" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <h3 className="text-lg font-medium mb-4">Efficiency Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={efficiencyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({name, value}) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {efficiencyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Matter Type Analysis */}
        <div>
          <h3 className="text-lg font-medium mb-3">Matter Type Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {matterTypeData.map(matterType => (
              <div key={matterType.type} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium">{matterType.type}</p>
                <p className="text-lg font-bold">${matterType.revenue.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{matterType.avgHours} avg hours</p>
                <p className="text-xs text-blue-600">${(matterType.revenue / matterType.avgHours).toFixed(0)}/hour</p>
              </div>
            ))}
          </div>
        </div>

        {/* Attorney Performance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Most Efficient</h4>
            {attorneyPerformance
              .sort((a, b) => b.avgEfficiency - a.avgEfficiency)
              .slice(0, 3)
              .map((att, index) => (
                <div key={att.name} className="flex justify-between items-center py-2">
                  <span className="text-sm">{index + 1}. {att.name}</span>
                  <span className="font-medium">{att.avgEfficiency.toFixed(0)}%</span>
                </div>
              ))}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Top Revenue</h4>
            {attorneyPerformance
              .sort((a, b) => b.revenue - a.revenue)
              .slice(0, 3)
              .map((att, index) => (
                <div key={att.name} className="flex justify-between items-center py-2">
                  <span className="text-sm">{index + 1}. {att.name}</span>
                  <span className="font-medium">${att.revenue.toLocaleString()}</span>
                </div>
              ))}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Most Active</h4>
            {attorneyPerformance
              .sort((a, b) => b.matters - a.matters)
              .slice(0, 3)
              .map((att, index) => (
                <div key={att.name} className="flex justify-between items-center py-2">
                  <span className="text-sm">{index + 1}. {att.name}</span>
                  <span className="font-medium">{att.matters} matters</span>
                </div>
              ))}
          </div>
        </div>

        {/* Detailed Flat Fee Table */}
        <div>
          <h3 className="text-lg font-medium mb-3">Flat Fee Matter Details</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Matter ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Matter Type</TableHead>
                <TableHead>Attorney</TableHead>
                <TableHead className="text-right">Flat Fee</TableHead>
                <TableHead className="text-right">Hours Spent</TableHead>
                <TableHead className="text-right">Target Hours</TableHead>
                <TableHead className="text-right">Hourly Equiv.</TableHead>
                <TableHead>Efficiency</TableHead>
                <TableHead>Profit Margin</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map(matter => (
                <TableRow key={matter.matterId}>
                  <TableCell className="font-mono">{matter.matterId}</TableCell>
                  <TableCell className="font-medium">{matter.clientName}</TableCell>
                  <TableCell>{matter.matterType}</TableCell>
                  <TableCell>{matter.attorney}</TableCell>
                  <TableCell className="text-right font-bold">${matter.flatFeeAmount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{matter.hoursSpent}</TableCell>
                  <TableCell className="text-right">{matter.targetHours}</TableCell>
                  <TableCell className="text-right">${matter.hourlyEquivalent}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={Math.min(matter.efficiency, 150)} className="w-16 h-2" />
                      <span className={`text-sm font-medium ${matter.efficiency >= 110 ? 'text-green-600' : matter.efficiency >= 90 ? 'text-blue-600' : 'text-red-600'}`}>
                        {matter.efficiency.toFixed(0)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${matter.profitMargin >= 80 ? 'text-green-600' : matter.profitMargin >= 70 ? 'text-orange-600' : 'text-red-600'}`}>
                      {matter.profitMargin.toFixed(1)}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge className={matter.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                      {matter.status}
                    </Badge>
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

export default FlatFeeProductivityReport;
