
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const BillableHoursReport = () => {
  const [period, setPeriod] = useState('monthly');
  const [attorney, setAttorney] = useState('all');
  
  const billableHoursData = [
    {
      date: "2024-01-20",
      attorney: "Sarah Johnson",
      client: "ABC Corporation",
      matter: "Contract Dispute",
      activity: "Legal Research",
      hours: 3.5,
      rate: 450,
      value: 1575,
      status: "Billable"
    },
    {
      date: "2024-01-20",
      attorney: "Michael Chen",
      client: "XYZ Industries",
      matter: "IP Litigation", 
      activity: "Document Review",
      hours: 6.0,
      rate: 350,
      value: 2100,
      status: "Billable"
    },
    {
      date: "2024-01-19",
      attorney: "Emily Davis",
      client: "Smith & Associates",
      matter: "Corporate Merger",
      activity: "Client Meeting",
      hours: 2.0,
      rate: 400,
      value: 800,
      status: "Billable"
    },
    {
      date: "2024-01-19",
      attorney: "David Wilson",
      client: "Internal",
      matter: "Administrative",
      activity: "Staff Meeting",
      hours: 1.5,
      rate: 475,
      value: 0,
      status: "Non-Billable"
    },
    {
      date: "2024-01-18",
      attorney: "Lisa Martinez",
      client: "Regional Bank",
      matter: "Regulatory Compliance",
      activity: "Regulatory Filing",
      hours: 4.5,
      rate: 325,
      value: 1462.50,
      status: "Billable"
    },
    {
      date: "2024-01-18",
      attorney: "Sarah Johnson",
      client: "ABC Corporation", 
      matter: "Contract Dispute",
      activity: "Brief Writing",
      hours: 5.0,
      rate: 450,
      value: 2250,
      status: "Billable"
    },
    {
      date: "2024-01-17",
      attorney: "Michael Chen",
      client: "Pro Bono",
      matter: "Immigration Case",
      activity: "Client Consultation",
      hours: 2.0,
      rate: 350,
      value: 0,
      status: "Pro Bono"
    }
  ];

  const dailyTrend = [
    { date: '01/15', billable: 28.5, nonBillable: 4.5 },
    { date: '01/16', billable: 32.0, nonBillable: 6.0 },
    { date: '01/17', billable: 29.5, nonBillable: 5.5 },
    { date: '01/18', billable: 35.0, nonBillable: 3.0 },
    { date: '01/19', billable: 31.5, nonBillable: 7.5 },
    { date: '01/20', billable: 33.0, nonBillable: 5.0 }
  ];

  const attorneyHours = [
    { name: 'Sarah Johnson', billable: 8.5, nonBillable: 1.0, proBono: 0 },
    { name: 'Michael Chen', billable: 6.0, nonBillable: 0.5, proBono: 2.0 },
    { name: 'Emily Davis', billable: 2.0, nonBillable: 1.5, proBono: 0 },
    { name: 'David Wilson', billable: 0, nonBillable: 1.5, proBono: 0 },
    { name: 'Lisa Martinez', billable: 4.5, nonBillable: 0.5, proBono: 0 }
  ];

  const attorneys = [...new Set(billableHoursData.map(item => item.attorney))];
  
  const filteredData = attorney === 'all' 
    ? billableHoursData 
    : billableHoursData.filter(item => item.attorney === attorney);

  const totalBillableHours = filteredData.filter(item => item.status === 'Billable').reduce((sum, item) => sum + item.hours, 0);
  const totalNonBillableHours = filteredData.filter(item => item.status === 'Non-Billable').reduce((sum, item) => sum + item.hours, 0);
  const totalProBonoHours = filteredData.filter(item => item.status === 'Pro Bono').reduce((sum, item) => sum + item.hours, 0);
  const totalValue = filteredData.reduce((sum, item) => sum + item.value, 0);

  return (
    <ReportLayout
      title="Billable Hours Report"
      description="Detailed time tracking and billable hours analysis"
      filterable
      dateFilterable
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Billable Hours</p>
            <p className="text-2xl font-bold">{totalBillableHours.toFixed(1)}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Value</p>
            <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Non-Billable Hours</p>
            <p className="text-2xl font-bold">{totalNonBillableHours.toFixed(1)}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Pro Bono Hours</p>
            <p className="text-2xl font-bold">{totalProBonoHours.toFixed(1)}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
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
            <h3 className="text-lg font-medium mb-4">Daily Hours Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="billable" stroke="#82ca9d" name="Billable" strokeWidth={2} />
                <Line type="monotone" dataKey="nonBillable" stroke="#8884d8" name="Non-Billable" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <h3 className="text-lg font-medium mb-4">Hours by Attorney</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attorneyHours}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="billable" stackId="a" fill="#82ca9d" name="Billable" />
                <Bar dataKey="nonBillable" stackId="a" fill="#8884d8" name="Non-Billable" />
                <Bar dataKey="proBono" stackId="a" fill="#ffc658" name="Pro Bono" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hours Summary by Attorney */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {attorneyHours.map(attorney => {
            const totalHours = attorney.billable + attorney.nonBillable + attorney.proBono;
            const billablePercent = totalHours > 0 ? (attorney.billable / totalHours) * 100 : 0;
            return (
              <div key={attorney.name} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium">{attorney.name}</p>
                <p className="text-lg font-bold">{totalHours.toFixed(1)} hrs</p>
                <p className="text-xs text-green-600">{billablePercent.toFixed(1)}% billable</p>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Billable</span>
                    <span>{attorney.billable}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Non-billable</span>
                    <span>{attorney.nonBillable}</span>
                  </div>
                  {attorney.proBono > 0 && (
                    <div className="flex justify-between text-xs text-purple-600">
                      <span>Pro Bono</span>
                      <span>{attorney.proBono}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Time Entries */}
        <div>
          <h3 className="text-lg font-medium mb-3">Time Entry Details</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Attorney</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Matter</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead className="text-right">Hours</TableHead>
                <TableHead className="text-right">Rate</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell className="font-medium">{entry.attorney}</TableCell>
                  <TableCell>{entry.client}</TableCell>
                  <TableCell>{entry.matter}</TableCell>
                  <TableCell>{entry.activity}</TableCell>
                  <TableCell className="text-right font-medium">{entry.hours}</TableCell>
                  <TableCell className="text-right">${entry.rate}</TableCell>
                  <TableCell className="text-right font-medium">
                    {entry.value > 0 ? `$${entry.value.toLocaleString()}` : '-'}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        entry.status === 'Billable' ? 'bg-green-100 text-green-800' :
                        entry.status === 'Non-Billable' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }
                    >
                      {entry.status}
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

export default BillableHoursReport;
