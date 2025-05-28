
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, AlertTriangle, CheckCircle } from 'lucide-react';

const Vendor1099Report = () => {
  const [taxYear, setTaxYear] = useState('2024');
  const [status, setStatus] = useState('all');
  
  const vendor1099Data = [
    {
      vendorId: "V-001",
      vendorName: "Johnson Legal Consulting",
      address: "123 Main St, Los Angeles, CA 90210",
      taxId: "12-3456789",
      totalPaid: 25000,
      requires1099: true,
      threshold: 600,
      status: "Required",
      w9Status: "Complete",
      lastW9Date: "2024-01-15",
      generated: false
    },
    {
      vendorId: "V-002",
      vendorName: "Expert Witness Services",
      address: "456 Oak Ave, San Francisco, CA 94105",
      taxId: "98-7654321",
      totalPaid: 15000,
      requires1099: true,
      threshold: 600,
      status: "Required",
      w9Status: "Complete",
      lastW9Date: "2024-02-01",
      generated: true
    },
    {
      vendorId: "V-003",
      vendorName: "Court Reporter Inc",
      address: "789 Pine St, Sacramento, CA 95814",
      taxId: "55-1234567",
      totalPaid: 8500,
      requires1099: true,
      threshold: 600,
      status: "Required",
      w9Status: "Missing",
      lastW9Date: "",
      generated: false
    },
    {
      vendorId: "V-004",
      vendorName: "Office Depot",
      address: "Corporate Office, Atlanta, GA 30309",
      taxId: "58-1234567",
      totalPaid: 350,
      requires1099: false,
      threshold: 600,
      status: "Not Required",
      w9Status: "N/A",
      lastW9Date: "N/A",
      generated: false
    },
    {
      vendorId: "V-005",
      vendorName: "Freelance Paralegal",
      address: "321 Elm St, San Diego, CA 92101",
      taxId: "77-9876543",
      totalPaid: 12000,
      requires1099: true,
      threshold: 600,
      status: "Required",
      w9Status: "Expired",
      lastW9Date: "2022-12-15",
      generated: false
    },
    {
      vendorId: "V-006",
      vendorName: "Document Translation Services",
      address: "654 Maple Dr, Fresno, CA 93702",
      taxId: "33-4567890",
      totalPaid: 2200,
      requires1099: true,
      threshold: 600,
      status: "Required",
      w9Status: "Complete",
      lastW9Date: "2024-01-10",
      generated: true
    }
  ];

  const filteredData = vendor1099Data.filter(vendor => 
    status === 'all' || vendor.status === status
  );

  const totalRequired = vendor1099Data.filter(v => v.requires1099).length;
  const totalGenerated = vendor1099Data.filter(v => v.generated).length;
  const missingW9 = vendor1099Data.filter(v => v.w9Status === 'Missing' || v.w9Status === 'Expired').length;
  const totalPayments = vendor1099Data.filter(v => v.requires1099).reduce((sum, v) => sum + v.totalPaid, 0);

  return (
    <ReportLayout
      title="1099 Reporting"
      description="Vendor 1099 tax form generation and compliance tracking"
      filterable
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">1099 Required</p>
            <p className="text-2xl font-bold">{totalRequired}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Forms Generated</p>
            <p className="text-2xl font-bold">{totalGenerated}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Missing W-9</p>
            <p className="text-2xl font-bold">{missingW9}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Reportable</p>
            <p className="text-2xl font-bold">${totalPayments.toLocaleString()}</p>
          </div>
        </div>

        {/* Alert Banner */}
        {missingW9 > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <div>
              <p className="font-medium text-red-800">Action Required</p>
              <p className="text-red-600">
                {missingW9} vendor(s) have missing or expired W-9 forms. Please collect updated forms before generating 1099s.
              </p>
            </div>
          </div>
        )}

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-4">
            <Select value={taxYear} onValueChange={setTaxYear}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Tax Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Vendors</SelectItem>
                <SelectItem value="Required">1099 Required</SelectItem>
                <SelectItem value="Not Required">Not Required</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
            <Button className="bg-legal-light hover:bg-legal-dark">
              Generate 1099s
            </Button>
          </div>
        </div>

        {/* Compliance Checklist */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-3">1099 Filing Checklist</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              {missingW9 === 0 ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-red-600" />
              )}
              <span className={missingW9 === 0 ? 'text-green-700' : 'text-red-700'}>
                All W-9 Forms Collected
              </span>
            </div>
            <div className="flex items-center gap-2">
              {totalGenerated === totalRequired ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-orange-600" />
              )}
              <span className={totalGenerated === totalRequired ? 'text-green-700' : 'text-orange-700'}>
                Forms Generated ({totalGenerated}/{totalRequired})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-gray-400" />
              <span className="text-gray-600">IRS Filing (Due Jan 31)</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-gray-400" />
              <span className="text-gray-600">Vendor Distribution</span>
            </div>
          </div>
        </div>

        {/* Vendor 1099 Table */}
        <div>
          <h3 className="text-lg font-medium mb-3">1099 Vendor Details</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Tax ID</TableHead>
                <TableHead className="text-right">Total Paid</TableHead>
                <TableHead>1099 Status</TableHead>
                <TableHead>W-9 Status</TableHead>
                <TableHead>Last W-9 Date</TableHead>
                <TableHead>Generated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map(vendor => (
                <TableRow key={vendor.vendorId}>
                  <TableCell className="font-medium">{vendor.vendorName}</TableCell>
                  <TableCell className="text-sm">{vendor.address}</TableCell>
                  <TableCell className="font-mono">{vendor.taxId}</TableCell>
                  <TableCell className="text-right font-medium">${vendor.totalPaid.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={vendor.requires1099 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}>
                      {vendor.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        vendor.w9Status === 'Complete' ? 'bg-green-100 text-green-800' :
                        vendor.w9Status === 'Missing' ? 'bg-red-100 text-red-800' :
                        vendor.w9Status === 'Expired' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }
                    >
                      {vendor.w9Status}
                    </Badge>
                  </TableCell>
                  <TableCell>{vendor.lastW9Date}</TableCell>
                  <TableCell>
                    <Badge className={vendor.generated ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {vendor.generated ? 'Yes' : 'No'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {vendor.requires1099 && !vendor.generated && (
                        <Button variant="outline" size="sm" disabled={vendor.w9Status !== 'Complete'}>
                          Generate
                        </Button>
                      )}
                      {vendor.generated && (
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Important Dates */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-3">Important 1099 Filing Dates</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="font-medium">January 31, 2025</p>
              <p className="text-sm text-muted-foreground">File 1099s with IRS & distribute to vendors</p>
            </div>
            <div>
              <p className="font-medium">February 28, 2025</p>
              <p className="text-sm text-muted-foreground">File Form 1096 (Annual Summary)</p>
            </div>
            <div>
              <p className="font-medium">March 31, 2025</p>
              <p className="text-sm text-muted-foreground">Electronic filing deadline (if filing electronically)</p>
            </div>
          </div>
        </div>
      </div>
    </ReportLayout>
  );
};

export default Vendor1099Report;
