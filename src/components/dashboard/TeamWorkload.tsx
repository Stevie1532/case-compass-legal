
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';

const TeamWorkload = () => {
  // This would come from your API in a real application
  const teams = [
    {
      id: 1,
      name: 'Litigation Team A',
      lead: 'Maria Garcia',
      activeCases: 18,
      capacity: 85, // percentage
      members: 7
    },
    {
      id: 2,
      name: 'Corporate Law Team',
      lead: 'John Smith',
      activeCases: 14,
      capacity: 65,
      members: 5
    },
    {
      id: 3,
      name: 'Intellectual Property',
      lead: 'Sarah Johnson',
      activeCases: 22,
      capacity: 95,
      members: 8
    },
    {
      id: 4,
      name: 'Family Law Team',
      lead: 'Robert Lee',
      activeCases: 12,
      capacity: 60,
      members: 4
    },
    {
      id: 5,
      name: 'Real Estate Team',
      lead: 'David Kim',
      activeCases: 16,
      capacity: 75,
      members: 6
    }
  ];

  const getCapacityColor = (capacity: number) => {
    if (capacity >= 90) return 'text-red-600';
    if (capacity >= 75) return 'text-amber-600';
    return 'text-green-600';
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Team Workload Snapshot</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Team</TableHead>
              <TableHead>Lead</TableHead>
              <TableHead className="text-right">Active Cases</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead className="text-right">Members</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.map((team) => (
              <TableRow key={team.id}>
                <TableCell className="font-medium">{team.name}</TableCell>
                <TableCell>{team.lead}</TableCell>
                <TableCell className="text-right">{team.activeCases}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={team.capacity} className="h-2" />
                    <span className={`text-xs font-medium ${getCapacityColor(team.capacity)}`}>
                      {team.capacity}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">{team.members}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TeamWorkload;
