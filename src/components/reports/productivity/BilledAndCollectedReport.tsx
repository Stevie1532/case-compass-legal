
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const BilledAndCollectedReport = () => {
  const [period, setPeriod] = useState('monthly');
  const [attorney, setAttorney] = useState('all');
  
  const billedCollectedData = [
    {
      attorney: "Sarah Johnson",
      timeRecorded: 165,
      timeBilled: 155,
      billableRate: 450,
      totalBilled: 69750,
      totalCollected: 62000,
      outstandingAR: 7750,
      collectionRate: 88.9,
      billingEfficiency: 93.9,
      avgDaysToCollect: 45
    },
    {
      attorney: "Michael Chen",
      timeRecorded: 185,
      timeBilled: 175,
      billableRate: 350,
      totalBilled: 61250,
      totalCollected: 58000,
      outstandingAR: 3250,
      collectionRate: 94.7,
      billingEfficiency: 94.6,
      avgDaysToCollect: 32
    },
    {
      attorney: "Emily Davis",
      timeRecorded: 155,
      timeBilled: 140,
      billableRate: 400,
      totalBilled: 56000,
      totalCollected: 48500,
      outstandingAR: 7500,
      collectionRate: 86.6,
      billingEfficiency: 90.3,
      avgDaysToCollect: 52
    },
    {
      attorney: "David Wilson",
      timeRecorded: 140,
      timeBilled: 135,
      billableRate: 475,
      totalBilled: 64125,
      totalCollected: 60000,
      outstandingAR: 4125,
      collectionRate: 93.6,
      billingEfficiency: 96.4,
      avgDaysToCollect: 38
    },
    {
      attorney: "Lisa Martinez",
      timeRecorded: 170,
      timeBilled: 162,
      billableRate: 325,
      totalBilled: 52650,
      totalCollected: 45000,
      outstandingAR: 7650,
      collectionRate: 85.5,
      billingEfficiency: 95.3,
      avgDaysToCollect: 48
    }
  ];

  const monthlyTrend = [
    { month: 'Jul', billed: 58000, collected: 52000 },
    { month: 'Aug', billed: 62000, collected: 56000 },
    { month: 'Sep', billed: 65000, collected: 59000 },
    { month: 'Oct', billed: 68000, collected: 63000 },
    { month: 'Nov', billed: 71000, collected: 66000 },
    { month: 'Dec', billed: 69000, collected: 64000 }
  ];

  const efficiencyData = billedCollectedData.map(attorney => ({
    name: attorney.attorney.split(' ')[0],
    billingEfficiency: attorney.billingEfficiency,
    collectionRate: attorney.collectionRate
  }));

  const attorneys = billedCollectedData.map(attorney => attorney.attorney);
  
  const filteredData = attorney === 'all' 
    ? billedCollectedData 
    : billedCollectedData.filter(att => att.attorney === attorney);

  const totalBilled = filteredData.reduce((sum, att) => sum + att.totalBilled, 0);
  const totalCollected = filteredData.reduce((sum, att) => sum + att.totalCollected, 0);
  const totalOutstanding = filteredData.reduce((sum, att) => sum + att.outstandingAR, 0);
  const avgCollectionRate = filteredData.reduce((sum, att) => sum + att.collectionRate, 0) / filteredData.length;

  return (
    <ReportLayout
      title="Billed and Collected Report"
      description="Analysis of billing efficiency and collection performance"
      filterable
      dateFilterable
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Billed</p>
            <p className="text-2xl font-bold">${totalBilled.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Collected</p>
            <p className="text-2xl font-bold">${totalCollected.toLocaleString()}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Outstanding A/R</p>
            <p className="text-2xl font-bold">${totalOutstanding.toLocaleString()}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Avg Collection Rate</p>
            <p className="text-2xl font-bold">{avgCollectionRate.toFixed(1)}%</p>
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
            <h3 className="text-lg font-medium mb-4">Monthly Billed vs Collected</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                <Line type="monotone" dataKey="billed" stroke="#8884d8" name="Billed" strokeWidth={2} />
                <Line type="monotone" dataKey="collected" stroke="#82ca9d" name="Collected" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <h3 className="text-lg font-medium mb-4">Efficiency Metrics by Attorney</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={efficiencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `${Number(value).toFixed(1)}%`} />
                <Bar dataKey="billingEfficiency" fill="#8884d8" name="Billing Efficiency" />
                <Bar dataKey="collectionRate" fill="#82ca9d" name="Collection Rate" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Top Billing Efficiency</h4>
            {billedCollectedData
              .sort((a, b) => b.billingEfficiency - a.billingEfficiency)
              .slice(0, 3)
              .map((att, index) => (
                <div key={att.attorney} className="flex justify-between items-center py-2">
                  <span className="text-sm">{index + 1}. {att.attorney}</span>
                  <span className="font-medium">{att.billingEfficiency.toFixed(1)}%</span>
                </div>
              ))}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Top Collection Rate</h4>
            {billedCollectedData
              .sort((a, b) => b.collectionRate - a.collectionRate)
              .slice(0, 3)
              .map((att, index) => (
                <div key={att.attorney} className="flex justify-between items-center py-2">
                  <span className="text-sm">{index + 1}. {att.attorney}</span>
                  <span className="font-medium">{att.collectionRate.toFixed(1)}%</span>
                </div>
              ))}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Fastest Collection</h4>
            {billedCollectedData
              .sort((a, b) => a.avgDaysToCollect - b.avgDaysToCollect)
              .slice(0, 3)
              .map((att, index) => (
                <div key={att.attorney} className="flex justify-between items-center py-2">
                  <span className="text-sm">{index + 1}. {att.attorney}</span>
                  <span className="font-medium">{att.avgDaysToCollect} days</span>
                </div>
              ))}
          </div>
        </div>

        {/* Collection Performance Summary */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-3">Overall Collection Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{((totalCollected / totalBilled) * 100).toFixed(1)}%</p>
              <p className="text-sm text-muted-foreground">Overall Collection Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">${(totalCollected / 1000).toFixed(0)}K</p>
              <p className="text-sm text-muted-foreground">Cash Collected</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">${(totalOutstanding / 1000).toFixed(0)}K</p>
              <p className="text-sm text-muted-foreground">Outstanding A/R</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {(billedCollectedData.reduce((sum, att) => sum + att.avgDaysToCollect, 0) / billedCollectedData.length).toFixed(0)}
              </p>
              <p className="text-sm text-muted-foreground">Avg Days to Collect</p>
            </div>
          </div>
        </div>

        {/* Detailed Performance Table */}
        <div>
          <h3 className="text-lg font-medium mb-3">Attorney Performance Details</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Attorney</TableHead>
                <TableHead className="text-right">Time Recorded</TableHead>
                <TableHead className="text-right">Time Billed</TableHead>
                <TableHead className="text-right">Total Billed</TableHead>
                <TableHead className="text-right">Collected</TableHead>
                <TableHead className="text-right">Outstanding A/R</TableHead>
                <TableHead>Collection Rate</TableHead>
                <TableHead>Billing Efficiency</TableHead>
                <TableHead className="text-right">Avg Days to Collect</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map(attorney => (
                <TableRow key={attorney.attorney}>
                  <TableCell className="font-medium">{attorney.attorney}</TableCell>
                  <TableCell className="text-right">{attorney.timeRecorded}</TableCell>
                  <TableCell className="text-right font-medium">{attorney.timeBilled}</TableCell>
                  <TableCell className="text-right">${attorney.totalBilled.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-medium text-green-600">
                    ${attorney.totalCollected.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-orange-600">
                    ${attorney.outstandingAR.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={attorney.collectionRate} className="w-16 h-2" />
                      <span className={`text-sm font-medium ${attorney.collectionRate >= 90 ? 'text-green-600' : attorney.collectionRate >= 80 ? 'text-orange-600' : 'text-red-600'}`}>
                        {attorney.collectionRate.toFixed(1)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={attorney.billingEfficiency} className="w-16 h-2" />
                      <span className={`text-sm font-medium ${attorney.billingEfficiency >= 95 ? 'text-green-600' : attorney.billingEfficiency >= 90 ? 'text-orange-600' : 'text-red-600'}`}>
                        {attorney.billingEfficiency.toFixed(1)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{attorney.avgDaysToCollect} days</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </ReportLayout>
  );
};

export default BilledAndCollectedReport;
