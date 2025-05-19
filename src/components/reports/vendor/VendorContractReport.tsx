
import React from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const VendorContractReport = () => {
  // Sample data - would come from API in real app
  const contractData = [
    {
      id: "CT-2025-001",
      vendor: "Legal Research Solutions",
      vendorId: "V-1001",
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      type: "Annual",
      amount: 95000,
      spent: 85000,
      remaining: 10000,
      autoRenew: true,
      status: "Active",
      paymentTerms: "Net 30",
      nextReviewDate: "2025-10-15"
    },
    {
      id: "CT-2025-002",
      vendor: "Office Supply Co.",
      vendorId: "V-1002",
      startDate: "2025-01-15",
      endDate: "2026-01-14",
      type: "Annual",
      amount: 45000,
      spent: 32000,
      remaining: 13000,
      autoRenew: true,
      status: "Active",
      paymentTerms: "Net 15",
      nextReviewDate: "2025-11-01"
    },
    {
      id: "CT-2025-003",
      vendor: "Tech Systems Inc.",
      vendorId: "V-1003",
      startDate: "2024-07-01",
      endDate: "2026-06-30",
      type: "Multi-year",
      amount: 150000,
      spent: 120000,
      remaining: 30000,
      autoRenew: false,
      status: "Active",
      paymentTerms: "Net 30",
      nextReviewDate: "2025-12-15"
    },
    {
      id: "CT-2025-004",
      vendor: "Premium Legal Publishing",
      vendorId: "V-1004",
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      type: "Annual",
      amount: 35000,
      spent: 28000,
      remaining: 7000,
      autoRenew: true,
      status: "Active",
      paymentTerms: "Net 45",
      nextReviewDate: "2025-09-30"
    },
    {
      id: "CT-2025-005",
      vendor: "Courier Express",
      vendorId: "V-1005",
      startDate: "2025-03-01",
      endDate: "2026-02-28",
      type: "Annual",
      amount: 24000,
      spent: 18000,
      remaining: 6000,
      autoRenew: true,
      status: "Active",
      paymentTerms: "Net 15",
      nextReviewDate: "2025-12-15"
    },
    {
      id: "CT-2025-006",
      vendor: "Elite Court Reporting",
      vendorId: "V-1006",
      startDate: "2025-02-15",
      endDate: "2026-02-14",
      type: "Annual",
      amount: 60000,
      spent: 45000,
      remaining: 15000,
      autoRenew: false,
      status: "Active",
      paymentTerms: "Net 30",
      nextReviewDate: "2025-11-30"
    },
    {
      id: "CT-2024-012",
      vendor: "Legacy Document Services",
      vendorId: "V-1012",
      startDate: "2024-05-01",
      endDate: "2025-04-30",
      type: "Annual",
      amount: 42000,
      spent: 42000,
      remaining: 0,
      autoRenew: false,
      status: "Expired",
      paymentTerms: "Net 30",
      nextReviewDate: "N/A"
    }
  ];
  
  const [status, setStatus] = React.useState("all");
  const [contractType, setContractType] = React.useState("all");
  
  const filteredData = contractData
    .filter(contract => status === "all" || contract.status === status)
    .filter(contract => contractType === "all" || contract.type === contractType);
  
  const totalContractValue = filteredData.reduce((sum, contract) => sum + contract.amount, 0);
  const totalSpent = filteredData.reduce((sum, contract) => sum + contract.spent, 0);
  const totalRemaining = filteredData.reduce((sum, contract) => sum + contract.remaining, 0);
  
  const expiringCount = contractData.filter(c => {
    const endDate = new Date(c.endDate);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 90 && c.status === "Active";
  }).length;
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>;
      case 'Expired':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Expired</Badge>;
      case 'Pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <ReportLayout
      title="Vendor Contract Report"
      description="Status and analysis of vendor contracts"
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center">
          <div>
            <h3 className="text-lg font-medium">Contract Analysis</h3>
          </div>
          <div className="flex gap-4">
            <div className="w-[150px]">
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Expired">Expired</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-[150px]">
              <Select value={contractType} onValueChange={setContractType}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Annual">Annual</SelectItem>
                  <SelectItem value="Multi-year">Multi-year</SelectItem>
                  <SelectItem value="Project">Project</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Contract Value</p>
            <p className="text-2xl font-bold">${totalContractValue.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Spent</p>
            <p className="text-2xl font-bold">${totalSpent.toLocaleString()}</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Budget Remaining</p>
            <p className="text-2xl font-bold">${totalRemaining.toLocaleString()}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Contracts Expiring Soon</p>
            <p className="text-2xl font-bold">{expiringCount}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Contract Details</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contract/Vendor</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Terms</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Auto-Renew</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map(contract => {
                  const usagePercent = (contract.spent / contract.amount) * 100;
                  
                  return (
                    <TableRow key={contract.id}>
                      <TableCell>
                        <div className="font-medium">{contract.vendor}</div>
                        <div className="text-xs text-muted-foreground">{contract.id}</div>
                      </TableCell>
                      <TableCell>
                        <div>{contract.startDate} to</div>
                        <div>{contract.endDate}</div>
                        <div className="text-xs text-muted-foreground">{contract.type}</div>
                      </TableCell>
                      <TableCell>{contract.paymentTerms}</TableCell>
                      <TableCell className="text-right">${contract.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={usagePercent} 
                            className="h-2" 
                          />
                          <span className="text-xs font-medium">
                            {usagePercent.toFixed(0)}%
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          ${contract.spent.toLocaleString()} spent, ${contract.remaining.toLocaleString()} remaining
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={contract.autoRenew ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                          {contract.autoRenew ? "Yes" : "No"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(contract.status)}
                        {contract.nextReviewDate !== "N/A" && (
                          <div className="text-xs text-muted-foreground mt-1">
                            Review: {contract.nextReviewDate}
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </ReportLayout>
  );
};

export default VendorContractReport;
