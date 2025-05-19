
import React from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

const VendorSummaryReport = () => {
  // Sample data - would come from API in real app
  const vendorData = [
    {
      id: "V-1001",
      name: "Legal Research Solutions",
      category: "Research Services",
      yearToDateSpend: 85000,
      lastYearSpend: 78000,
      contractAmount: 95000,
      contractUsage: 89,
      lastPayment: "2025-05-10",
      lastPaymentAmount: 7500,
      status: "Active"
    },
    {
      id: "V-1002",
      name: "Office Supply Co.",
      category: "Office Supplies",
      yearToDateSpend: 32000,
      lastYearSpend: 35000,
      contractAmount: 45000,
      contractUsage: 71,
      lastPayment: "2025-05-05",
      lastPaymentAmount: 2800,
      status: "Active"
    },
    {
      id: "V-1003",
      name: "Tech Systems Inc.",
      category: "IT Services",
      yearToDateSpend: 120000,
      lastYearSpend: 105000,
      contractAmount: 150000,
      contractUsage: 80,
      lastPayment: "2025-05-12",
      lastPaymentAmount: 12500,
      status: "Active"
    },
    {
      id: "V-1004",
      name: "Premium Legal Publishing",
      category: "Publications",
      yearToDateSpend: 28000,
      lastYearSpend: 30000,
      contractAmount: 35000,
      contractUsage: 80,
      lastPayment: "2025-04-28",
      lastPaymentAmount: 3500,
      status: "Active"
    },
    {
      id: "V-1005",
      name: "Courier Express",
      category: "Courier Services",
      yearToDateSpend: 18000,
      lastYearSpend: 15000,
      contractAmount: 24000,
      contractUsage: 75,
      lastPayment: "2025-05-08",
      lastPaymentAmount: 2200,
      status: "Active"
    },
    {
      id: "V-1006",
      name: "Elite Court Reporting",
      category: "Court Services",
      yearToDateSpend: 45000,
      lastYearSpend: 42000,
      contractAmount: 60000,
      contractUsage: 75,
      lastPayment: "2025-05-02",
      lastPaymentAmount: 5800,
      status: "Active"
    },
    {
      id: "V-1007",
      name: "General Staffing Agency",
      category: "Staffing Services",
      yearToDateSpend: 65000,
      lastYearSpend: 70000,
      contractAmount: 80000,
      contractUsage: 81,
      lastPayment: "2025-05-15",
      lastPaymentAmount: 8200,
      status: "Active"
    }
  ];
  
  const [searchTerm, setSearchTerm] = React.useState("");
  const [category, setCategory] = React.useState("all");
  
  const filteredData = vendorData
    .filter(vendor => vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       vendor.id.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(vendor => category === "all" || vendor.category === category);
  
  const totalYTDSpend = filteredData.reduce((sum, vendor) => sum + vendor.yearToDateSpend, 0);
  const totalLastYearSpend = filteredData.reduce((sum, vendor) => sum + vendor.lastYearSpend, 0);
  const spendChange = ((totalYTDSpend - totalLastYearSpend) / totalLastYearSpend) * 100;
  
  const categories = Array.from(new Set(vendorData.map(vendor => vendor.category)));

  return (
    <ReportLayout
      title="Vendor Summary Report"
      description="Overview of vendor relationships and spending"
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="w-[200px]">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Year-To-Date Spend</p>
            <p className="text-2xl font-bold">${totalYTDSpend.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Last Year Spend</p>
            <p className="text-2xl font-bold">${totalLastYearSpend.toLocaleString()}</p>
          </div>
          <div className={`p-4 rounded-lg ${spendChange >= 0 ? 'bg-green-50' : 'bg-amber-50'}`}>
            <p className="text-sm text-muted-foreground">YOY Change</p>
            <p className="text-2xl font-bold">{spendChange.toFixed(1)}%</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Vendor Details</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">YTD Spend</TableHead>
                  <TableHead className="text-right">Last Year</TableHead>
                  <TableHead className="text-right">% Change</TableHead>
                  <TableHead>Contract Usage</TableHead>
                  <TableHead>Last Payment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map(vendor => {
                  const changePercent = ((vendor.yearToDateSpend - vendor.lastYearSpend) / vendor.lastYearSpend) * 100;
                  
                  return (
                    <TableRow key={vendor.id}>
                      <TableCell>
                        <div className="font-medium">{vendor.name}</div>
                        <div className="text-xs text-muted-foreground">{vendor.id}</div>
                      </TableCell>
                      <TableCell>{vendor.category}</TableCell>
                      <TableCell className="text-right">${vendor.yearToDateSpend.toLocaleString()}</TableCell>
                      <TableCell className="text-right">${vendor.lastYearSpend.toLocaleString()}</TableCell>
                      <TableCell className={`text-right ${changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {changePercent.toFixed(1)}%
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={vendor.contractUsage} 
                            className="h-2" 
                          />
                          <span className="text-xs font-medium">
                            {vendor.contractUsage}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>{vendor.lastPayment}</div>
                        <div className="text-xs text-muted-foreground">${vendor.lastPaymentAmount.toLocaleString()}</div>
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

export default VendorSummaryReport;
