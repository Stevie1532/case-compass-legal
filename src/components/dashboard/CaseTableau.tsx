
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

type CaseStatus = 'Open' | 'Pending' | 'Closed' | 'Archived';

interface CaseData {
  id: string;
  title: string;
  client: string;
  attorneyAssigned: string;
  dateLastUpdated: string;
  nextHearing: string | null;
  status: CaseStatus;
}

const cases: CaseData[] = [
  {
    id: 'CAS-2023-1245',
    title: 'Thompson v. City of Oakland',
    client: 'Mark Thompson',
    attorneyAssigned: 'Sarah Johnson',
    dateLastUpdated: '2023-05-14',
    nextHearing: '2023-06-25',
    status: 'Open'
  },
  {
    id: 'CAS-2023-0892',
    title: 'Estate of Williams',
    client: 'Robert Williams',
    attorneyAssigned: 'David Lee',
    dateLastUpdated: '2023-05-12',
    nextHearing: null,
    status: 'Pending'
  },
  {
    id: 'CAS-2023-1103',
    title: 'Smith Commercial Lease Dispute',
    client: 'Smith Enterprises',
    attorneyAssigned: 'Maria Garcia',
    dateLastUpdated: '2023-05-10',
    nextHearing: '2023-06-15',
    status: 'Open'
  },
  {
    id: 'CAS-2022-3356',
    title: 'Johnson Divorce Settlement',
    client: 'Emily Johnson',
    attorneyAssigned: 'James Wilson',
    dateLastUpdated: '2023-05-09',
    nextHearing: null,
    status: 'Closed'
  },
  {
    id: 'CAS-2023-0945',
    title: 'ABC Corp Intellectual Property',
    client: 'ABC Corporation',
    attorneyAssigned: 'Emily Chen',
    dateLastUpdated: '2023-05-08',
    nextHearing: '2023-07-10',
    status: 'Open'
  }
];

const getStatusColor = (status: CaseStatus) => {
  switch (status) {
    case 'Open':
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
    case 'Closed':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    case 'Archived':
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
};

const CaseTableau = () => {
  return (
    <Card className="col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Case Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Case ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Attorney</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Next Hearing</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cases.map((caseItem) => (
              <TableRow key={caseItem.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium">{caseItem.id}</TableCell>
                <TableCell>{caseItem.title}</TableCell>
                <TableCell>{caseItem.client}</TableCell>
                <TableCell>{caseItem.attorneyAssigned}</TableCell>
                <TableCell>{caseItem.dateLastUpdated}</TableCell>
                <TableCell>{caseItem.nextHearing || 'N/A'}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(caseItem.status)}>
                    {caseItem.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CaseTableau;
