
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const ClientAnalysis = () => {
  // This would come from your API in a real application
  const clients = [
    {
      id: 1,
      name: 'ABC Corporation',
      activeCases: 3,
      billingStatus: 'Current',
      relationship: 'Key Client',
      lastInteraction: '1 day ago'
    },
    {
      id: 2,
      name: 'Johnson Family Trust',
      activeCases: 1,
      billingStatus: 'Overdue',
      relationship: 'Regular',
      lastInteraction: '3 days ago'
    },
    {
      id: 3,
      name: 'Tech Innovations LLC',
      activeCases: 4,
      billingStatus: 'Current',
      relationship: 'Key Client',
      lastInteraction: 'Today'
    },
    {
      id: 4,
      name: 'Main Street Properties',
      activeCases: 2,
      billingStatus: 'Pending',
      relationship: 'Regular',
      lastInteraction: '1 week ago'
    },
    {
      id: 5,
      name: 'Smith & Associates',
      activeCases: 2,
      billingStatus: 'Current',
      relationship: 'New Client',
      lastInteraction: '2 days ago'
    }
  ];

  const getBillingStatusColor = (status: string) => {
    switch(status) {
      case 'Current': return 'bg-green-100 text-green-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRelationshipColor = (type: string) => {
    switch(type) {
      case 'Key Client': return 'bg-purple-100 text-purple-800';
      case 'New Client': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Client Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead className="text-right">Active Cases</TableHead>
              <TableHead>Billing Status</TableHead>
              <TableHead>Relationship</TableHead>
              <TableHead className="text-right">Last Interaction</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell className="text-right">{client.activeCases}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getBillingStatusColor(client.billingStatus)}>
                    {client.billingStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getRelationshipColor(client.relationship)}>
                    {client.relationship}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">{client.lastInteraction}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ClientAnalysis;
