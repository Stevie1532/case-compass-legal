
import React from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const TimesheetReport = () => {
  // Sample data - would come from API in real app
  const employeeData = {
    name: "Sarah Johnson",
    id: "EMP-10045",
    position: "Senior Attorney",
    department: "Corporate Law",
    reportingPeriod: "May 1-15, 2025"
  };
  
  const timeEntries = [
    { id: "TE-001", date: "2025-05-01", client: "ABC Corporation", matter: "Merger Agreement", hours: 4.5, billable: true, rate: 350, status: "Approved" },
    { id: "TE-002", date: "2025-05-01", client: "Internal", matter: "Team Meeting", hours: 1.5, billable: false, rate: 0, status: "Approved" },
    { id: "TE-003", date: "2025-05-02", client: "XYZ Industries", matter: "Contract Review", hours: 6.0, billable: true, rate: 350, status: "Approved" },
    { id: "TE-004", date: "2025-05-03", client: "Smith & Associates", matter: "Due Diligence", hours: 7.5, billable: true, rate: 350, status: "Pending" },
    { id: "TE-005", date: "2025-05-06", client: "Internal", matter: "CLE Training", hours: 2.0, billable: false, rate: 0, status: "Approved" },
    { id: "TE-006", date: "2025-05-07", client: "ABC Corporation", matter: "Board Meeting", hours: 3.0, billable: true, rate: 350, status: "Pending" },
    { id: "TE-007", date: "2025-05-08", client: "Johnson Family Trust", matter: "Estate Planning", hours: 5.0, billable: true, rate: 350, status: "Approved" },
    { id: "TE-008", date: "2025-05-09", client: "Internal", matter: "Admin", hours: 1.0, billable: false, rate: 0, status: "Approved" },
  ];
  
  const totalHours = timeEntries.reduce((sum, entry) => sum + entry.hours, 0);
  const billableHours = timeEntries.filter(entry => entry.billable).reduce((sum, entry) => sum + entry.hours, 0);
  const nonBillableHours = totalHours - billableHours;
  const billableAmount = timeEntries.filter(entry => entry.billable).reduce((sum, entry) => sum + (entry.hours * entry.rate), 0);
  
  const approvedHours = timeEntries.filter(entry => entry.status === "Approved").reduce((sum, entry) => sum + entry.hours, 0);
  const pendingHours = timeEntries.filter(entry => entry.status === "Pending").reduce((sum, entry) => sum + entry.hours, 0);

  const [period, setPeriod] = React.useState("current");

  return (
    <ReportLayout
      title="Timesheet Report"
      description="Detailed breakdown of employee hours and billing"
    >
      <div className="space-y-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-medium">Employee: {employeeData.name}</h3>
            <p className="text-sm text-muted-foreground">Position: {employeeData.position} | Department: {employeeData.department}</p>
          </div>
          <div className="w-[180px]">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger>
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">May 1-15, 2025</SelectItem>
                <SelectItem value="previous">Apr 16-30, 2025</SelectItem>
                <SelectItem value="previous2">Apr 1-15, 2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Hours</p>
            <p className="text-2xl font-bold">{totalHours.toFixed(1)}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Billable Hours</p>
            <p className="text-2xl font-bold">{billableHours.toFixed(1)}</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Non-Billable Hours</p>
            <p className="text-2xl font-bold">{nonBillableHours.toFixed(1)}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Billable Amount</p>
            <p className="text-2xl font-bold">${billableAmount.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="flex justify-between items-center mb-2">
              <span>Hours Distribution</span>
              <div className="flex items-center gap-2">
                <span className="flex items-center text-xs"><div className="w-3 h-3 bg-blue-500 mr-1"></div>Billable</span>
                <span className="flex items-center text-xs"><div className="w-3 h-3 bg-amber-500 mr-1"></div>Non-Billable</span>
              </div>
            </div>
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-4 bg-blue-500" 
                style={{ width: `${(billableHours / totalHours) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              <span>{((billableHours / totalHours) * 100).toFixed(1)}% Billable</span>
              <span>{((nonBillableHours / totalHours) * 100).toFixed(1)}% Non-Billable</span>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span>Approval Status</span>
            </div>
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-4 bg-green-500" 
                style={{ width: `${(approvedHours / totalHours) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              <span>{((approvedHours / totalHours) * 100).toFixed(1)}% Approved</span>
              <span>{((pendingHours / totalHours) * 100).toFixed(1)}% Pending</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Time Entries</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Matter</TableHead>
                <TableHead className="text-right">Hours</TableHead>
                <TableHead className="text-right">Rate</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timeEntries.map(entry => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.client}</TableCell>
                  <TableCell>{entry.matter}</TableCell>
                  <TableCell className="text-right">{entry.hours.toFixed(1)}</TableCell>
                  <TableCell className="text-right">${entry.rate}</TableCell>
                  <TableCell className="text-right">${(entry.hours * entry.rate).toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={entry.status === "Approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
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

export default TimesheetReport;
