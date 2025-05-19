
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';

const VendorPerformanceReport = () => {
  const [vendorFilter, setVendorFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data
  const vendorData = [
    { 
      id: "VEN-0001",
      name: "LegalTech Solutions",
      category: "Software",
      onTimeDelivery: 98,
      qualityScore: 95,
      responseTime: 4.8,
      costEfficiency: 92,
      totalSpend: 85000,
      lastOrderDate: "2025-04-15",
      performanceScore: 96,
      status: "Preferred"
    },
    { 
      id: "VEN-0002",
      name: "Office Depot Enterprise",
      category: "Office Supplies",
      onTimeDelivery: 94,
      qualityScore: 88,
      responseTime: 4.2,
      costEfficiency: 96,
      totalSpend: 42000,
      lastOrderDate: "2025-04-08",
      performanceScore: 92,
      status: "Approved"
    },
    { 
      id: "VEN-0003",
      name: "Global Research Partners",
      category: "Research Services",
      onTimeDelivery: 86,
      qualityScore: 98,
      responseTime: 4.9,
      costEfficiency: 85,
      totalSpend: 110000,
      lastOrderDate: "2025-04-22",
      performanceScore: 91,
      status: "Preferred"
    },
    { 
      id: "VEN-0004",
      name: "Pro Travel Services",
      category: "Travel",
      onTimeDelivery: 90,
      qualityScore: 92,
      responseTime: 4.6,
      costEfficiency: 88,
      totalSpend: 65000,
      lastOrderDate: "2025-03-28",
      performanceScore: 90,
      status: "Approved"
    },
    { 
      id: "VEN-0005",
      name: "QuickPrint Solutions",
      category: "Printing Services",
      onTimeDelivery: 82,
      qualityScore: 78,
      responseTime: 3.9,
      costEfficiency: 94,
      totalSpend: 28000,
      lastOrderDate: "2025-04-05",
      performanceScore: 80,
      status: "Under Review"
    },
    { 
      id: "VEN-0006",
      name: "Corporate Catering Ltd",
      category: "Food & Beverages",
      onTimeDelivery: 95,
      qualityScore: 94,
      responseTime: 4.7,
      costEfficiency: 87,
      totalSpend: 35000,
      lastOrderDate: "2025-04-18",
      performanceScore: 93,
      status: "Approved"
    },
    { 
      id: "VEN-0007",
      name: "Tech Maintenance Inc.",
      category: "IT Services",
      onTimeDelivery: 88,
      qualityScore: 91,
      responseTime: 4.5,
      costEfficiency: 89,
      totalSpend: 72000,
      lastOrderDate: "2025-04-12",
      performanceScore: 89,
      status: "Approved"
    }
  ];
  
  const categories = [...new Set(vendorData.map(vendor => vendor.category))];
  
  const filteredVendors = vendorData
    .filter(vendor => vendorFilter === 'all' || vendor.category === vendorFilter)
    .filter(vendor => 
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Preferred':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Preferred</Badge>;
      case 'Approved':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Approved</Badge>;
      case 'Under Review':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Under Review</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Performance chart data
  const chartData = filteredVendors.map(vendor => ({
    name: vendor.name,
    score: vendor.performanceScore,
    color: vendor.performanceScore >= 95 ? '#4ade80' : 
           vendor.performanceScore >= 90 ? '#60a5fa' : 
           vendor.performanceScore >= 85 ? '#facc15' : 
           vendor.performanceScore >= 80 ? '#fb923c' : '#f87171'
  }));

  return (
    <ReportLayout
      title="Vendor Performance Analysis"
      description="Evaluation and comparison of vendor performance metrics"
      filterable
      dateFilterable
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Vendors</p>
            <p className="text-2xl font-bold">{vendorData.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Preferred Vendors</p>
            <p className="text-2xl font-bold">
              {vendorData.filter(vendor => vendor.status === 'Preferred').length}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Spend (YTD)</p>
            <p className="text-2xl font-bold">
              ${vendorData.reduce((sum, vendor) => sum + vendor.totalSpend, 0).toLocaleString()}
            </p>
          </div>
        </div>
        
        <div className="h-80">
          <h3 className="text-lg font-medium mb-3">Performance Score by Vendor</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="score" name="Performance Score">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Vendor Performance Details</h3>
            <div className="flex gap-2">
              <div className="w-64">
                <Input
                  type="text"
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={vendorFilter} onValueChange={setVendorFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">On-Time Delivery</TableHead>
                <TableHead className="text-right">Quality Score</TableHead>
                <TableHead className="text-right">Response Time</TableHead>
                <TableHead className="text-right">Cost Efficiency</TableHead>
                <TableHead className="text-right">Performance Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell className="font-medium">{vendor.name}</TableCell>
                  <TableCell>{vendor.category}</TableCell>
                  <TableCell className="text-right">{vendor.onTimeDelivery}%</TableCell>
                  <TableCell className="text-right">{vendor.qualityScore}%</TableCell>
                  <TableCell className="text-right">{vendor.responseTime}/5.0</TableCell>
                  <TableCell className="text-right">{vendor.costEfficiency}%</TableCell>
                  <TableCell className="text-right font-medium">{vendor.performanceScore}%</TableCell>
                  <TableCell>{getStatusBadge(vendor.status)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Details</Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredVendors.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-4">No vendors found matching your search</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-3">Performance by Category</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Avg. Performance</TableHead>
                  <TableHead className="text-right">Total Vendors</TableHead>
                  <TableHead className="text-right">Total Spend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map(category => {
                  const categoryVendors = vendorData.filter(vendor => vendor.category === category);
                  const avgPerformance = categoryVendors.reduce((sum, vendor) => sum + vendor.performanceScore, 0) / categoryVendors.length;
                  const totalSpend = categoryVendors.reduce((sum, vendor) => sum + vendor.totalSpend, 0);
                  
                  return (
                    <TableRow key={category}>
                      <TableCell className="font-medium">{category}</TableCell>
                      <TableCell className="text-right">{avgPerformance.toFixed(1)}%</TableCell>
                      <TableCell className="text-right">{categoryVendors.length}</TableCell>
                      <TableCell className="text-right">${totalSpend.toLocaleString()}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-3">Performance Distribution</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Excellent (95%+)</span>
                  <span className="text-sm">{vendorData.filter(v => v.performanceScore >= 95).length} vendors</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${(vendorData.filter(v => v.performanceScore >= 95).length / vendorData.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Good (90-94%)</span>
                  <span className="text-sm">{vendorData.filter(v => v.performanceScore >= 90 && v.performanceScore < 95).length} vendors</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${(vendorData.filter(v => v.performanceScore >= 90 && v.performanceScore < 95).length / vendorData.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Average (85-89%)</span>
                  <span className="text-sm">{vendorData.filter(v => v.performanceScore >= 85 && v.performanceScore < 90).length} vendors</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full" 
                    style={{ width: `${(vendorData.filter(v => v.performanceScore >= 85 && v.performanceScore < 90).length / vendorData.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Below Average (80-84%)</span>
                  <span className="text-sm">{vendorData.filter(v => v.performanceScore >= 80 && v.performanceScore < 85).length} vendors</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full" 
                    style={{ width: `${(vendorData.filter(v => v.performanceScore >= 80 && v.performanceScore < 85).length / vendorData.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Poor (Below 80%)</span>
                  <span className="text-sm">{vendorData.filter(v => v.performanceScore < 80).length} vendors</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full" 
                    style={{ width: `${(vendorData.filter(v => v.performanceScore < 80).length / vendorData.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReportLayout>
  );
};

export default VendorPerformanceReport;
