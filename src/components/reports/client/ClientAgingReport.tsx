
import React from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';

const ClientAgingReport = () => {
  // Sample data - would come from API in real app
  const agingData = [
    {
      client: "ABC Corporation",
      clientId: "CL-10025",
      current: 4200.00,
      days30: 950.00,
      days60: 0,
      days90: 0,
      days90Plus: 0,
      total: 5150.00
    },
    {
      client: "XYZ Industries",
      clientId: "CL-10026",
      current: 1500.00,
      days30: 3200.00,
      days60: 850.00,
      days90: 0,
      days90Plus: 0,
      total: 5550.00
    },
    {
      client: "Smith & Associates",
      clientId: "CL-10027",
      current: 3000.00,
      days30: 0,
      days60: 2100.00,
      days90: 1500.00,
      days90Plus: 0,
      total: 6600.00
    },
    {
      client: "Johnson Family Trust",
      clientId: "CL-10028",
      current: 0,
      days30: 2400.00,
      days60: 0,
      days90: 0,
      days90Plus: 3200.00,
      total: 5600.00
    },
    {
      client: "Tech Innovations LLC",
      clientId: "CL-10029",
      current: 5200.00,
      days30: 0,
      days60: 0,
      days90: 0,
      days90Plus: 0,
      total: 5200.00
    }
  ];
  
  const totals = agingData.reduce((acc, curr) => ({
    current: acc.current + curr.current,
    days30: acc.days30 + curr.days30,
    days60: acc.days60 + curr.days60,
    days90: acc.days90 + curr.days90,
    days90Plus: acc.days90Plus + curr.days90Plus,
    total: acc.total + curr.total
  }), { current: 0, days30: 0, days60: 0, days90: 0, days90Plus: 0, total: 0 });

  return (
    <ReportLayout
      title="AR Aging Summary"
      description="Analysis of accounts receivable by aging brackets"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Current</p>
            <p className="text-xl font-bold">${totals.current.toFixed(2)}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">1-30 Days</p>
            <p className="text-xl font-bold">${totals.days30.toFixed(2)}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">31-60 Days</p>
            <p className="text-xl font-bold">${totals.days60.toFixed(2)}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">61-90 Days</p>
            <p className="text-xl font-bold">${totals.days90.toFixed(2)}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">90+ Days</p>
            <p className="text-xl font-bold">${totals.days90Plus.toFixed(2)}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Aging Breakdown by Client</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Current</TableHead>
                <TableHead>1-30 Days</TableHead>
                <TableHead>31-60 Days</TableHead>
                <TableHead>61-90 Days</TableHead>
                <TableHead>90+ Days</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agingData.map(client => (
                <TableRow key={client.clientId}>
                  <TableCell className="font-medium">{client.client}</TableCell>
                  <TableCell>${client.current.toFixed(2)}</TableCell>
                  <TableCell>${client.days30.toFixed(2)}</TableCell>
                  <TableCell>${client.days60.toFixed(2)}</TableCell>
                  <TableCell>${client.days90.toFixed(2)}</TableCell>
                  <TableCell>${client.days90Plus.toFixed(2)}</TableCell>
                  <TableCell className="text-right font-medium">${client.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-gray-50 font-medium">
                <TableCell>Totals</TableCell>
                <TableCell>${totals.current.toFixed(2)}</TableCell>
                <TableCell>${totals.days30.toFixed(2)}</TableCell>
                <TableCell>${totals.days60.toFixed(2)}</TableCell>
                <TableCell>${totals.days90.toFixed(2)}</TableCell>
                <TableCell>${totals.days90Plus.toFixed(2)}</TableCell>
                <TableCell className="text-right">${totals.total.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Aging Distribution</h3>
          {agingData.map(client => (
            <div key={client.clientId} className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">{client.client}</span>
                <span className="text-sm text-muted-foreground">${client.total.toFixed(2)}</span>
              </div>
              <div className="flex h-2 mb-2">
                {client.current > 0 && (
                  <div 
                    className="bg-green-500" 
                    style={{ width: `${(client.current / client.total) * 100}%` }}
                    title={`Current: $${client.current.toFixed(2)}`}
                  ></div>
                )}
                {client.days30 > 0 && (
                  <div 
                    className="bg-blue-500" 
                    style={{ width: `${(client.days30 / client.total) * 100}%` }}
                    title={`1-30 Days: $${client.days30.toFixed(2)}`}
                  ></div>
                )}
                {client.days60 > 0 && (
                  <div 
                    className="bg-yellow-500" 
                    style={{ width: `${(client.days60 / client.total) * 100}%` }}
                    title={`31-60 Days: $${client.days60.toFixed(2)}`}
                  ></div>
                )}
                {client.days90 > 0 && (
                  <div 
                    className="bg-orange-500" 
                    style={{ width: `${(client.days90 / client.total) * 100}%` }}
                    title={`61-90 Days: $${client.days90.toFixed(2)}`}
                  ></div>
                )}
                {client.days90Plus > 0 && (
                  <div 
                    className="bg-red-500" 
                    style={{ width: `${(client.days90Plus / client.total) * 100}%` }}
                    title={`90+ Days: $${client.days90Plus.toFixed(2)}`}
                  ></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ReportLayout>
  );
};

export default ClientAgingReport;
