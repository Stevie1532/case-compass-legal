
import React from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const BonusReport = () => {
  // Sample data - would come from API in real app
  const bonusData = [
    {
      employee: "Sarah Johnson",
      id: "EMP-10045",
      position: "Senior Attorney",
      department: "Corporate Law",
      baseSalary: 175000,
      bonusTarget: 35000,
      bonusActual: 32000,
      performance: 92,
      billingGoal: 1900,
      billingActual: 1850,
      billingPercent: 97,
    },
    {
      employee: "Michael Chen",
      id: "EMP-10046",
      position: "Associate Attorney",
      department: "Litigation",
      baseSalary: 130000,
      bonusTarget: 20000,
      bonusActual: 22000,
      performance: 105,
      billingGoal: 1800,
      billingActual: 1920,
      billingPercent: 107,
    },
    {
      employee: "Jessica Rodriguez",
      id: "EMP-10047",
      position: "Senior Associate",
      department: "Corporate Law",
      baseSalary: 145000,
      bonusTarget: 25000,
      bonusActual: 26500,
      performance: 102,
      billingGoal: 1850,
      billingActual: 1905,
      billingPercent: 103,
    },
    {
      employee: "David Wilson",
      id: "EMP-10048",
      position: "Partner",
      department: "IP Law",
      baseSalary: 210000,
      bonusTarget: 60000,
      bonusActual: 67000,
      performance: 112,
      billingGoal: 1650,
      billingActual: 1830,
      billingPercent: 111,
    },
    {
      employee: "Amanda Lee",
      id: "EMP-10049",
      position: "Associate Attorney",
      department: "Litigation",
      baseSalary: 125000,
      bonusTarget: 18000,
      bonusActual: 16400,
      performance: 91,
      billingGoal: 1750,
      billingActual: 1705,
      billingPercent: 97,
    }
  ];
  
  const [year, setYear] = React.useState("2025");
  const [department, setDepartment] = React.useState("all");

  const filteredData = department === "all" 
    ? bonusData 
    : bonusData.filter(item => item.department === department);
  
  const totals = filteredData.reduce((acc, curr) => ({
    bonusTarget: acc.bonusTarget + curr.bonusTarget,
    bonusActual: acc.bonusActual + curr.bonusActual,
  }), { bonusTarget: 0, bonusActual: 0 });

  return (
    <ReportLayout
      title="Compensation & Bonus Report"
      description="Analysis of compensation and performance bonuses"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Fiscal Year: {year}</h3>
          </div>
          <div className="flex gap-4">
            <div className="w-[180px]">
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">FY 2025</SelectItem>
                  <SelectItem value="2024">FY 2024</SelectItem>
                  <SelectItem value="2023">FY 2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-[180px]">
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Corporate Law">Corporate Law</SelectItem>
                  <SelectItem value="Litigation">Litigation</SelectItem>
                  <SelectItem value="IP Law">IP Law</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Bonus Target</p>
            <p className="text-2xl font-bold">${totals.bonusTarget.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Bonus Actual</p>
            <p className="text-2xl font-bold">${totals.bonusActual.toLocaleString()}</p>
          </div>
          <div className={`p-4 rounded-lg ${totals.bonusActual >= totals.bonusTarget ? 'bg-green-50' : 'bg-amber-50'}`}>
            <p className="text-sm text-muted-foreground">Target Achievement</p>
            <p className="text-2xl font-bold">{((totals.bonusActual / totals.bonusTarget) * 100).toFixed(1)}%</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Individual Performance & Bonus</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Position</TableHead>
                <TableHead className="text-right">Base Salary</TableHead>
                <TableHead className="text-right">Bonus Target</TableHead>
                <TableHead className="text-right">Bonus Actual</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Billing Goal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map(emp => (
                <TableRow key={emp.id}>
                  <TableCell className="font-medium">{emp.employee}</TableCell>
                  <TableCell>{emp.position}<br/><span className="text-xs text-muted-foreground">{emp.department}</span></TableCell>
                  <TableCell className="text-right">${emp.baseSalary.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${emp.bonusTarget.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${emp.bonusActual.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={emp.performance} 
                        className="h-2" 
                      />
                      <span className={`text-xs font-medium ${emp.performance >= 100 ? 'text-green-600' : 'text-amber-600'}`}>
                        {emp.performance}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={emp.billingPercent} 
                        className="h-2" 
                      />
                      <span className={`text-xs font-medium ${emp.billingPercent >= 100 ? 'text-green-600' : 'text-amber-600'}`}>
                        {emp.billingActual}/{emp.billingGoal} hrs ({emp.billingPercent}%)
                      </span>
                    </div>
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

export default BonusReport;
