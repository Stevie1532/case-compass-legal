
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const TimekeeperGoalsReport = () => {
  const [period, setPeriod] = useState('monthly');
  const [goalType, setGoalType] = useState('all');
  
  const goalsData = [
    {
      timekeeper: "Sarah Johnson",
      role: "Senior Partner",
      billingGoal: 1800,
      billingActual: 1650,
      revenueGoal: 810000,
      revenueActual: 742500,
      utilizationGoal: 85,
      utilizationActual: 86.8,
      clientGoal: 10,
      clientActual: 8,
      status: "On Track"
    },
    {
      timekeeper: "Michael Chen",
      role: "Associate",
      billingGoal: 2000,
      billingActual: 1850,
      revenueGoal: 700000,
      revenueActual: 647500,
      utilizationGoal: 90,
      utilizationActual: 92.5,
      clientGoal: 15,
      clientActual: 12,
      status: "Ahead"
    },
    {
      timekeeper: "Emily Davis",
      role: "Senior Associate",
      billingGoal: 1800,
      billingActual: 1550,
      revenueGoal: 720000,
      revenueActual: 620000,
      utilizationGoal: 85,
      utilizationActual: 81.6,
      clientGoal: 8,
      clientActual: 6,
      status: "Behind"
    },
    {
      timekeeper: "David Wilson",
      role: "Partner",
      billingGoal: 1600,
      billingActual: 1400,
      revenueGoal: 760000,
      revenueActual: 665000,
      utilizationGoal: 80,
      utilizationActual: 75.7,
      clientGoal: 6,
      clientActual: 5,
      status: "Behind"
    },
    {
      timekeeper: "Lisa Martinez",
      role: "Associate",
      billingGoal: 2000,
      billingActual: 1700,
      revenueGoal: 650000,
      revenueActual: 552500,
      utilizationGoal: 90,
      utilizationActual: 89.5,
      clientGoal: 12,
      clientActual: 9,
      status: "Behind"
    }
  ];

  const monthlyProgress = [
    { month: 'Jan', target: 167, actual: 145 },
    { month: 'Feb', target: 167, actual: 158 },
    { month: 'Mar', target: 167, actual: 162 },
    { month: 'Apr', target: 167, actual: 171 },
    { month: 'May', target: 167, actual: 165 },
    { month: 'Jun', target: 167, actual: 169 }
  ];

  const achievementData = goalsData.map(tk => ({
    name: tk.timekeeper.split(' ')[0],
    billing: (tk.billingActual / tk.billingGoal) * 100,
    revenue: (tk.revenueActual / tk.revenueGoal) * 100,
    utilization: (tk.utilizationActual / tk.utilizationGoal) * 100
  }));

  const filteredData = goalType === 'all' 
    ? goalsData 
    : goalsData.filter(tk => tk.status === goalType);

  const onTrackCount = goalsData.filter(tk => tk.status === 'On Track' || tk.status === 'Ahead').length;
  const behindCount = goalsData.filter(tk => tk.status === 'Behind').length;
  const avgBillingAchievement = goalsData.reduce((sum, tk) => sum + (tk.billingActual / tk.billingGoal), 0) / goalsData.length * 100;
  const avgRevenueAchievement = goalsData.reduce((sum, tk) => sum + (tk.revenueActual / tk.revenueGoal), 0) / goalsData.length * 100;

  return (
    <ReportLayout
      title="Timekeeper Goals Report"
      description="Individual performance tracking against annual goals"
      filterable
      dateFilterable
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">On Track</p>
            <p className="text-2xl font-bold">{onTrackCount}</p>
            <p className="text-sm text-green-600">timekeepers</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Behind Goals</p>
            <p className="text-2xl font-bold">{behindCount}</p>
            <p className="text-sm text-red-600">timekeepers</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Avg Billing Achievement</p>
            <p className="text-2xl font-bold">{avgBillingAchievement.toFixed(0)}%</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Avg Revenue Achievement</p>
            <p className="text-2xl font-bold">{avgRevenueAchievement.toFixed(0)}%</p>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
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
            <Select value={goalType} onValueChange={setGoalType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Ahead">Ahead</SelectItem>
                <SelectItem value="On Track">On Track</SelectItem>
                <SelectItem value="Behind">Behind</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-legal-light hover:bg-legal-dark">
            Set New Goals
          </Button>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="text-lg font-medium mb-4">Goal Achievement by Timekeeper</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={achievementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `${Number(value).toFixed(1)}%`} />
                <Bar dataKey="billing" fill="#8884d8" name="Billing Hours" />
                <Bar dataKey="revenue" fill="#82ca9d" name="Revenue" />
                <Bar dataKey="utilization" fill="#ffc658" name="Utilization" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <h3 className="text-lg font-medium mb-4">Monthly Progress Tracking</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="target" stroke="#8884d8" name="Target" strokeWidth={2} strokeDasharray="5 5" />
                <Line type="monotone" dataKey="actual" stroke="#82ca9d" name="Actual" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Goal Achievement Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Billing Hours Leaders</h4>
            {goalsData
              .sort((a, b) => (b.billingActual / b.billingGoal) - (a.billingActual / a.billingGoal))
              .slice(0, 3)
              .map((tk, index) => (
                <div key={tk.timekeeper} className="flex justify-between items-center py-2">
                  <span className="text-sm">{index + 1}. {tk.timekeeper}</span>
                  <span className="font-medium">{((tk.billingActual / tk.billingGoal) * 100).toFixed(0)}%</span>
                </div>
              ))}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Revenue Leaders</h4>
            {goalsData
              .sort((a, b) => (b.revenueActual / b.revenueGoal) - (a.revenueActual / a.revenueGoal))
              .slice(0, 3)
              .map((tk, index) => (
                <div key={tk.timekeeper} className="flex justify-between items-center py-2">
                  <span className="text-sm">{index + 1}. {tk.timekeeper}</span>
                  <span className="font-medium">{((tk.revenueActual / tk.revenueGoal) * 100).toFixed(0)}%</span>
                </div>
              ))}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Utilization Leaders</h4>
            {goalsData
              .sort((a, b) => (b.utilizationActual / b.utilizationGoal) - (a.utilizationActual / a.utilizationGoal))
              .slice(0, 3)
              .map((tk, index) => (
                <div key={tk.timekeeper} className="flex justify-between items-center py-2">
                  <span className="text-sm">{index + 1}. {tk.timekeeper}</span>
                  <span className="font-medium">{((tk.utilizationActual / tk.utilizationGoal) * 100).toFixed(0)}%</span>
                </div>
              ))}
          </div>
        </div>

        {/* Detailed Goals Table */}
        <div>
          <h3 className="text-lg font-medium mb-3">Goal Tracking Details</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timekeeper</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Billing Hours</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Utilization</TableHead>
                <TableHead>Client Count</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Overall Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map(timekeeper => {
                const billingProgress = (timekeeper.billingActual / timekeeper.billingGoal) * 100;
                const revenueProgress = (timekeeper.revenueActual / timekeeper.revenueGoal) * 100;
                const utilizationProgress = (timekeeper.utilizationActual / timekeeper.utilizationGoal) * 100;
                const clientProgress = (timekeeper.clientActual / timekeeper.clientGoal) * 100;
                const overallProgress = (billingProgress + revenueProgress + utilizationProgress + clientProgress) / 4;
                
                return (
                  <TableRow key={timekeeper.timekeeper}>
                    <TableCell className="font-medium">{timekeeper.timekeeper}</TableCell>
                    <TableCell>{timekeeper.role}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{timekeeper.billingActual} / {timekeeper.billingGoal}</span>
                          <span>{billingProgress.toFixed(0)}%</span>
                        </div>
                        <Progress value={Math.min(billingProgress, 100)} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>${(timekeeper.revenueActual / 1000).toFixed(0)}K / ${(timekeeper.revenueGoal / 1000).toFixed(0)}K</span>
                          <span>{revenueProgress.toFixed(0)}%</span>
                        </div>
                        <Progress value={Math.min(revenueProgress, 100)} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{timekeeper.utilizationActual.toFixed(1)}% / {timekeeper.utilizationGoal}%</span>
                          <span>{utilizationProgress.toFixed(0)}%</span>
                        </div>
                        <Progress value={Math.min(utilizationProgress, 100)} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{timekeeper.clientActual} / {timekeeper.clientGoal}</span>
                          <span>{clientProgress.toFixed(0)}%</span>
                        </div>
                        <Progress value={Math.min(clientProgress, 100)} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          timekeeper.status === 'Ahead' ? 'bg-green-100 text-green-800' :
                          timekeeper.status === 'On Track' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }
                      >
                        {timekeeper.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={Math.min(overallProgress, 100)} className="w-16 h-2" />
                        <span className="text-sm font-medium">{overallProgress.toFixed(0)}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </ReportLayout>
  );
};

export default TimekeeperGoalsReport;
