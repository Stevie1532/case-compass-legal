
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const StaffUtilizationReport = () => {
  const [department, setDepartment] = useState('all');
  const [timeframe, setTimeframe] = useState('current-month');
  
  // Sample data
  const staffData = [
    { 
      id: "EMP-001",
      name: "John Smith",
      title: "Senior Partner",
      department: "Corporate Law",
      billableHours: 142,
      totalHours: 168,
      utilization: 84.5,
      billableTarget: 80,
      activeMatters: 12,
      avgHoursPerMatter: 11.8,
      trend: [78, 82, 80, 84.5]
    },
    { 
      id: "EMP-002",
      name: "Sarah Johnson",
      title: "Associate",
      department: "Family Law",
      billableHours: 156,
      totalHours: 172,
      utilization: 90.7,
      billableTarget: 85,
      activeMatters: 8,
      avgHoursPerMatter: 19.5,
      trend: [82, 89, 91, 90.7]
    },
    { 
      id: "EMP-003",
      name: "Michael Chen",
      title: "Partner",
      department: "Criminal Law",
      billableHours: 138,
      totalHours: 165,
      utilization: 83.6,
      billableTarget: 80,
      activeMatters: 14,
      avgHoursPerMatter: 9.9,
      trend: [79, 81, 84, 83.6]
    },
    { 
      id: "EMP-004",
      name: "Jessica Taylor",
      title: "Senior Associate",
      department: "Corporate Law",
      billableHours: 144,
      totalHours: 170,
      utilization: 84.7,
      billableTarget: 85,
      activeMatters: 10,
      avgHoursPerMatter: 14.4,
      trend: [87, 85, 84.2, 84.7]
    },
    { 
      id: "EMP-005",
      name: "David Wilson",
      title: "Junior Associate",
      department: "Real Estate Law",
      billableHours: 162,
      totalHours: 176,
      utilization: 92.0,
      billableTarget: 90,
      activeMatters: 6,
      avgHoursPerMatter: 27.0,
      trend: [88, 90, 93, 92]
    },
    { 
      id: "EMP-006",
      name: "Emily Rodriguez",
      title: "Associate",
      department: "Tax Law",
      billableHours: 130,
      totalHours: 168,
      utilization: 77.4,
      billableTarget: 85,
      activeMatters: 9,
      avgHoursPerMatter: 14.4,
      trend: [82, 80, 78, 77.4]
    },
    { 
      id: "EMP-007",
      name: "Robert Kim",
      title: "Partner",
      department: "Intellectual Property",
      billableHours: 126,
      totalHours: 160,
      utilization: 78.8,
      billableTarget: 80,
      activeMatters: 11,
      avgHoursPerMatter: 11.5,
      trend: [76, 75, 77, 78.8]
    }
  ];
  
  const departments = [...new Set(staffData.map(staff => staff.department))];
  
  const filteredStaff = department === 'all' 
    ? staffData 
    : staffData.filter(staff => staff.department === department);
  
  // Helper functions for calculations
  const getStatusColor = (utilization: number, target: number) => {
    if (utilization >= target + 5) return '#4ade80'; // Excellent
    if (utilization >= target) return '#60a5fa';     // Good
    if (utilization >= target - 5) return '#facc15'; // Average
    return '#f87171';                                // Below Target
  };
  
  const chartData = filteredStaff.map(staff => ({
    name: staff.name,
    utilization: staff.utilization,
    target: staff.billableTarget,
    color: getStatusColor(staff.utilization, staff.billableTarget)
  }));
  
  // Department averages
  const departmentData = departments.map(dept => {
    const deptStaff = staffData.filter(staff => staff.department === dept);
    const avgUtilization = deptStaff.reduce((sum, staff) => sum + staff.utilization, 0) / deptStaff.length;
    
    return {
      department: dept,
      utilization: avgUtilization,
      staffCount: deptStaff.length,
      activeMatters: deptStaff.reduce((sum, staff) => sum + staff.activeMatters, 0),
      color: getStatusColor(avgUtilization, deptStaff[0]?.billableTarget || 80)
    };
  });
  
  // Trends over time
  const periodLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  const trendData = periodLabels.map((period, index) => {
    const avgUtilization = staffData.reduce((sum, staff) => sum + staff.trend[index], 0) / staffData.length;
    
    return {
      period,
      utilization: avgUtilization.toFixed(1)
    };
  });
  
  // Summary calculations
  const firmwideUtilization = staffData.reduce((sum, staff) => sum + staff.utilization, 0) / staffData.length;
  const aboveTargetCount = staffData.filter(staff => staff.utilization >= staff.billableTarget).length;
  const belowTargetCount = staffData.length - aboveTargetCount;
  const totalBillableHours = staffData.reduce((sum, staff) => sum + staff.billableHours, 0);
  const totalActiveMatters = staffData.reduce((sum, staff) => sum + staff.activeMatters, 0);

  return (
    <ReportLayout
      title="Staff Utilization Report"
      description="Analysis of staff billable hours and utilization rates"
      dateFilterable
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Firmwide Utilization</p>
            <p className="text-2xl font-bold">{firmwideUtilization.toFixed(1)}%</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Billable Hours</p>
            <p className="text-2xl font-bold">{totalBillableHours}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Staff Meeting Target</p>
            <p className="text-2xl font-bold">{aboveTargetCount}/{staffData.length} ({((aboveTargetCount / staffData.length) * 100).toFixed(0)}%)</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Active Matters</p>
            <p className="text-2xl font-bold">{totalActiveMatters}</p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium">Utilization by Staff Member</h3>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis type="category" dataKey="name" width={100} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Utilization Rate']}
                    labelFormatter={() => ''}
                  />
                  <Bar dataKey="utilization" name="Utilization Rate">
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                  <Bar dataKey="target" name="Target" fill="#888888" opacity={0.5} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="w-full md:w-1/3">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium">Trend Analysis</h3>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current-month">This Month</SelectItem>
                  <SelectItem value="last-quarter">Last Quarter</SelectItem>
                  <SelectItem value="ytd">Year to Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis domain={[75, 95]} />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Line type="monotone" dataKey="utilization" stroke="#8884d8" activeDot={{ r: 8 }} name="Avg. Utilization" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Utilization Details by Staff</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Billable Hours</TableHead>
                <TableHead className="text-right">Total Hours</TableHead>
                <TableHead className="text-right">Utilization</TableHead>
                <TableHead className="text-right">Target</TableHead>
                <TableHead className="text-right">Variance</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((staff) => {
                const variance = staff.utilization - staff.billableTarget;
                const statusColor = getStatusColor(staff.utilization, staff.billableTarget);
                
                return (
                  <TableRow key={staff.id}>
                    <TableCell className="font-medium">{staff.name}</TableCell>
                    <TableCell>{staff.title}</TableCell>
                    <TableCell>{staff.department}</TableCell>
                    <TableCell className="text-right">{staff.billableHours}</TableCell>
                    <TableCell className="text-right">{staff.totalHours}</TableCell>
                    <TableCell className="text-right">{staff.utilization.toFixed(1)}%</TableCell>
                    <TableCell className="text-right">{staff.billableTarget}%</TableCell>
                    <TableCell className={`text-right ${variance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {variance >= 0 ? '+' : ''}{variance.toFixed(1)}%
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: statusColor }}></div>
                        <span className="text-xs">
                          {staff.utilization >= staff.billableTarget + 5 ? 'Excellent' :
                           staff.utilization >= staff.billableTarget ? 'Good' :
                           staff.utilization >= staff.billableTarget - 5 ? 'Average' : 'Below Target'}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Department Averages</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department</TableHead>
                  <TableHead className="text-right">Staff Count</TableHead>
                  <TableHead className="text-right">Avg Utilization</TableHead>
                  <TableHead className="text-right">Active Matters</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departmentData.map((dept) => (
                  <TableRow key={dept.department}>
                    <TableCell className="font-medium">{dept.department}</TableCell>
                    <TableCell className="text-right">{dept.staffCount}</TableCell>
                    <TableCell className="text-right">{dept.utilization.toFixed(1)}%</TableCell>
                    <TableCell className="text-right">{dept.activeMatters}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Utilization Distribution</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Excellent (90%+)</span>
                  <span className="text-sm">{staffData.filter(s => s.utilization >= 90).length} staff</span>
                </div>
                <Progress value={(staffData.filter(s => s.utilization >= 90).length / staffData.length) * 100} className="h-2 bg-gray-200" indicatorClassName="bg-green-500" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Good (85-89%)</span>
                  <span className="text-sm">{staffData.filter(s => s.utilization >= 85 && s.utilization < 90).length} staff</span>
                </div>
                <Progress value={(staffData.filter(s => s.utilization >= 85 && s.utilization < 90).length / staffData.length) * 100} className="h-2 bg-gray-200" indicatorClassName="bg-blue-500" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Average (80-84%)</span>
                  <span className="text-sm">{staffData.filter(s => s.utilization >= 80 && s.utilization < 85).length} staff</span>
                </div>
                <Progress value={(staffData.filter(s => s.utilization >= 80 && s.utilization < 85).length / staffData.length) * 100} className="h-2 bg-gray-200" indicatorClassName="bg-yellow-500" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Below Target (< 80%)</span>
                  <span className="text-sm">{staffData.filter(s => s.utilization < 80).length} staff</span>
                </div>
                <Progress value={(staffData.filter(s => s.utilization < 80).length / staffData.length) * 100} className="h-2 bg-gray-200" indicatorClassName="bg-red-500" />
              </div>
              
              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm">View Detailed Breakdown</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReportLayout>
  );
};

export default StaffUtilizationReport;
