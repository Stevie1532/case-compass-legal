
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const ReferralReport = () => {
  const [period, setPeriod] = useState('current-quarter');
  const [referralSource, setReferralSource] = useState('all');
  
  // Sample data
  const referralData = [
    {
      id: "REF-001",
      referralSource: "John Smith Law Firm",
      referralType: "Client Referral",
      clientName: "ABC Corporation",
      caseType: "Corporate Law",
      referralDate: "2024-01-15",
      referralFee: 5000,
      referralRate: 10,
      totalBilled: 50000,
      status: "Active",
      attorney: "Sarah Johnson"
    },
    {
      id: "REF-002",
      referralSource: "Legal Directory",
      referralType: "Online Lead",
      clientName: "XYZ Industries",
      caseType: "Litigation",
      referralDate: "2024-01-20",
      referralFee: 3500,
      referralRate: 7.5,
      totalBilled: 46666,
      status: "Completed",
      attorney: "Michael Chen"
    },
    {
      id: "REF-003",
      referralSource: "Former Client",
      referralType: "Word of Mouth",
      clientName: "Smith & Associates",
      caseType: "Personal Injury",
      referralDate: "2024-02-01",
      referralFee: 7500,
      referralRate: 15,
      totalBilled: 50000,
      status: "Active",
      attorney: "Jessica Rodriguez"
    },
    {
      id: "REF-004",
      referralSource: "Bar Association",
      referralType: "Professional Network",
      clientName: "Johnson Family Trust",
      caseType: "Estate Planning",
      referralDate: "2024-02-10",
      referralFee: 2000,
      referralRate: 8,
      totalBilled: 25000,
      status: "Pending",
      attorney: "David Wilson"
    }
  ];

  const sources = [...new Set(referralData.map(ref => ref.referralSource))];
  
  const filteredData = referralSource === 'all' 
    ? referralData 
    : referralData.filter(ref => ref.referralSource === referralSource);

  // Chart data for referral sources
  const sourceData = sources.map(source => {
    const sourceReferrals = referralData.filter(ref => ref.referralSource === source);
    const totalFees = sourceReferrals.reduce((sum, ref) => sum + ref.referralFee, 0);
    return {
      source: source.length > 15 ? source.substring(0, 15) + '...' : source,
      fees: totalFees,
      count: sourceReferrals.length
    };
  });

  const pieColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00'];

  const totalFees = filteredData.reduce((sum, ref) => sum + ref.referralFee, 0);
  const totalBilled = filteredData.reduce((sum, ref) => sum + ref.totalBilled, 0);
  const avgReferralRate = filteredData.reduce((sum, ref) => sum + ref.referralRate, 0) / filteredData.length;

  return (
    <ReportLayout
      title="Referral Reports"
      description="Analysis of client referrals and referral fees"
      filterable
      dateFilterable
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Referral Fees</p>
            <p className="text-2xl font-bold">${totalFees.toLocaleString()}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Cases Referred</p>
            <p className="text-2xl font-bold">{filteredData.length}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Billed Amount</p>
            <p className="text-2xl font-bold">${totalBilled.toLocaleString()}</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Avg Referral Rate</p>
            <p className="text-2xl font-bold">{avgReferralRate.toFixed(1)}%</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Referral Fees by Source</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sourceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="source" />
                  <YAxis />
                  <RechartsTooltip 
                    formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Referral Fees']}
                  />
                  <Bar dataKey="fees" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Referral Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="count"
                    label={({ source, count }) => `${source}: ${count}`}
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Detailed Table */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium">Referral Details</h3>
            <Select value={referralSource} onValueChange={setReferralSource}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                {sources.map(source => (
                  <SelectItem key={source} value={source}>{source}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Referral Source</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Case Type</TableHead>
                <TableHead>Attorney</TableHead>
                <TableHead className="text-right">Referral Rate</TableHead>
                <TableHead className="text-right">Total Billed</TableHead>
                <TableHead className="text-right">Referral Fee</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map(referral => (
                <TableRow key={referral.id}>
                  <TableCell className="font-medium">{referral.referralSource}</TableCell>
                  <TableCell>{referral.clientName}</TableCell>
                  <TableCell>{referral.caseType}</TableCell>
                  <TableCell>{referral.attorney}</TableCell>
                  <TableCell className="text-right">{referral.referralRate}%</TableCell>
                  <TableCell className="text-right">${referral.totalBilled.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${referral.referralFee.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        referral.status === 'Active' ? 'bg-green-100 text-green-800' :
                        referral.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }
                    >
                      {referral.status}
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

export default ReferralReport;
