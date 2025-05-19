
import React from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Badge } from '@/components/ui/badge';

const BillingEfficiencyReport = () => {
  // Sample data - would come from API in real app
  const employeeData = [
    {
      id: "EMP-10045",
      name: "Sarah Johnson",
      position: "Senior Attorney",
      department: "Corporate Law",
      billableTarget: 1900,
      billableHours: 1850,
      hourlyRate: 350,
      realization: 92,
      collection: 95,
      utilizationRate: 85,
      monthlyData: [
        { month: "Jan", billable: 155, target: 158 },
        { month: "Feb", billable: 148, target: 158 },
        { month: "Mar", billable: 162, target: 158 },
        { month: "Apr", billable: 155, target: 158 },
        { month: "May", billable: 160, target: 158 }
      ]
    },
    {
      id: "EMP-10046",
      name: "Michael Chen",
      position: "Associate Attorney",
      department: "Litigation",
      billableTarget: 1800,
      billableHours: 1920,
      hourlyRate: 275,
      realization: 88,
      collection: 96,
      utilizationRate: 90,
      monthlyData: [
        { month: "Jan", billable: 150, target: 150 },
        { month: "Feb", billable: 160, target: 150 },
        { month: "Mar", billable: 175, target: 150 },
        { month: "Apr", billable: 165, target: 150 },
        { month: "May", billable: 172, target: 150 }
      ]
    },
    {
      id: "EMP-10047",
      name: "Jessica Rodriguez",
      position: "Senior Associate",
      department: "Corporate Law",
      billableTarget: 1850,
      billableHours: 1905,
      hourlyRate: 300,
      realization: 90,
      collection: 93,
      utilizationRate: 88,
      monthlyData: [
        { month: "Jan", billable: 158, target: 154 },
        { month: "Feb", billable: 162, target: 154 },
        { month: "Mar", billable: 160, target: 154 },
        { month: "Apr", billable: 155, target: 154 },
        { month: "May", billable: 165, target: 154 }
      ]
    },
    {
      id: "EMP-10048",
      name: "David Wilson",
      position: "Partner",
      department: "IP Law",
      billableTarget: 1650,
      billableHours: 1830,
      hourlyRate: 425,
      realization: 95,
      collection: 98,
      utilizationRate: 75,
      monthlyData: [
        { month: "Jan", billable: 140, target: 138 },
        { month: "Feb", billable: 148, target: 138 },
        { month: "Mar", billable: 160, target: 138 },
        { month: "Apr", billable: 155, target: 138 },
        { month: "May", billable: 170, target: 138 }
      ]
    },
    {
      id: "EMP-10049",
      name: "Amanda Lee",
      position: "Associate Attorney",
      department: "Litigation",
      billableTarget: 1750,
      billableHours: 1705,
      hourlyRate: 265,
      realization: 87,
      collection: 92,
      utilizationRate: 85,
      monthlyData: [
        { month: "Jan", billable: 145, target: 146 },
        { month: "Feb", billable: 140, target: 146 },
        { month: "Mar", billable: 148, target: 146 },
        { month: "Apr", billable: 138, target: 146 },
        { month: "May", billable: 142, target: 146 }
      ]
    }
  ];
  
  const [period, setPeriod] = React.useState("ytd");
  const [selectedEmployee, setSelectedEmployee] = React.useState(employeeData[0].id);
  
  // Calculate totals
  const totalTargetHours = employeeData.reduce((sum, emp) => sum + emp.billableTarget, 0);
  const totalBillableHours = employeeData.reduce((sum, emp) => sum + emp.billableHours, 0);
  const avgRealization = employeeData.reduce((sum, emp) => sum + emp.realization, 0) / employeeData.length;
  const avgCollection = employeeData.reduce((sum, emp) => sum + emp.collection, 0) / employeeData.length;
  
  // Calculate potential revenue and actual revenue
  const potentialRevenue = employeeData.reduce((sum, emp) => sum + (emp.billableHours * emp.hourlyRate), 0);
  const actualRevenue = potentialRevenue * (avgRealization / 100) * (avgCollection / 100);
  const lostRevenue = potentialRevenue - actualRevenue;
  
  // For the chart
  const selectedEmp = employeeData.find(emp => emp.id === selectedEmployee) || employeeData[0];

  return (
    <ReportLayout
      title="Billing Efficiency Report"
      description="Analysis of billable hours, realization, and collection rates"
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center">
          <div>
            <h3 className="text-lg font-medium">Billing Analysis</h3>
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
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Billable Hours</p>
            <p className="text-2xl font-bold">{totalBillableHours.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">vs Target: {totalTargetHours.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Potential Revenue</p>
            <p className="text-2xl font-bold">${potentialRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Lost Revenue</p>
            <p className="text-2xl font-bold">${lostRevenue.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Due to realization/collection gaps</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h3 className="text-lg font-medium mb-3">Monthly Billable Hours Trend</h3>
            <div>
              <div className="mb-2">
                <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employeeData.map(emp => (
                      <SelectItem key={emp.id} value={emp.id}>{emp.name} - {emp.position}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={selectedEmp.monthlyData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="billable" name="Billable Hours" stroke="#3b82f6" />
                    <Line type="monotone" dataKey="target" name="Target" stroke="#ef4444" strokeDasharray="3 3" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Efficiency Metrics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Average Realization Rate</span>
                  <span className="text-sm font-medium">{avgRealization.toFixed(1)}%</span>
                </div>
                <Progress value={avgRealization} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Average Collection Rate</span>
                  <span className="text-sm font-medium">{avgCollection.toFixed(1)}%</span>
                </div>
                <Progress value={avgCollection} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Billable Hours Achievement</span>
                  <span className="text-sm font-medium">{((totalBillableHours / totalTargetHours) * 100).toFixed(1)}%</span>
                </div>
                <Progress value={(totalBillableHours / totalTargetHours) * 100} className="h-2" />
              </div>
              <div className="text-sm text-muted-foreground mt-4">
                <p><strong>Realization Rate:</strong> Percentage of recorded time that is actually billed to clients.</p>
                <p className="mt-2"><strong>Collection Rate:</strong> Percentage of billed amounts that are collected from clients.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Attorney Performance</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Attorney</TableHead>
                <TableHead>Hours Target</TableHead>
                <TableHead>Hours Billed</TableHead>
                <TableHead className="text-right">Rate</TableHead>
                <TableHead>Realization</TableHead>
                <TableHead>Collection</TableHead>
                <TableHead>Target Achievement</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeeData.map(emp => {
                const targetAchievement = (emp.billableHours / emp.billableTarget) * 100;
                
                return (
                  <TableRow key={emp.id}>
                    <TableCell>
                      <div className="font-medium">{emp.name}</div>
                      <div className="text-xs text-muted-foreground">{emp.position} - {emp.department}</div>
                    </TableCell>
                    <TableCell>{emp.billableTarget.toLocaleString()}</TableCell>
                    <TableCell>{emp.billableHours.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${emp.hourlyRate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={emp.realization} 
                          className="h-2" 
                        />
                        <span className="text-xs font-medium">
                          {emp.realization}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={emp.collection} 
                          className="h-2" 
                        />
                        <span className="text-xs font-medium">
                          {emp.collection}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={targetAchievement >= 100 
                          ? "bg-green-100 text-green-800" 
                          : targetAchievement >= 90 
                            ? "bg-yellow-100 text-yellow-800" 
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {targetAchievement.toFixed(1)}%
                      </Badge>
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

export default BillingEfficiencyReport;
