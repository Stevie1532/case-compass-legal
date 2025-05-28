
import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const MatterRateCardsReport = () => {
  const [practiceArea, setPracticeArea] = useState('all');
  const [rateType, setRateType] = useState('all');
  
  // Sample data
  const rateCardData = [
    {
      id: "RC-001",
      client: "ABC Corporation",
      clientId: "CL-10025",
      matter: "Corporate Merger - Phase I",
      practiceArea: "Corporate Law",
      rateType: "Blended",
      partner: 650,
      seniorAssociate: 450,
      associate: 325,
      paralegal: 150,
      effectiveDate: "2024-01-01",
      expirationDate: "2024-12-31",
      status: "Active",
      lastUpdated: "2024-01-15"
    },
    {
      id: "RC-002",
      client: "XYZ Industries",
      clientId: "CL-10026",
      matter: "Contract Dispute Litigation",
      practiceArea: "Litigation",
      rateType: "Hourly",
      partner: 725,
      seniorAssociate: 525,
      associate: 375,
      paralegal: 175,
      effectiveDate: "2023-06-01",
      expirationDate: "2024-05-31",
      status: "Expiring Soon",
      lastUpdated: "2023-06-01"
    },
    {
      id: "RC-003",
      client: "Smith & Associates",
      clientId: "CL-10027",
      matter: "Personal Injury Defense",
      practiceArea: "Personal Injury",
      rateType: "Contingency",
      partner: 0,
      seniorAssociate: 0,
      associate: 0,
      paralegal: 0,
      effectiveDate: "2024-02-01",
      expirationDate: "2025-01-31",
      status: "Active",
      lastUpdated: "2024-02-01"
    },
    {
      id: "RC-004",
      client: "Johnson Family Trust",
      clientId: "CL-10028",
      matter: "Estate Planning Services",
      practiceArea: "Estate Planning",
      rateType: "Flat Fee",
      partner: 5000,
      seniorAssociate: 0,
      associate: 0,
      paralegal: 1200,
      effectiveDate: "2024-01-10",
      expirationDate: "2024-12-31",
      status: "Active",
      lastUpdated: "2024-01-10"
    },
    {
      id: "RC-005",
      client: "Tech Innovations LLC",
      clientId: "CL-10029",
      matter: "IP Portfolio Management",
      practiceArea: "Intellectual Property",
      rateType: "Hourly",
      partner: 695,
      seniorAssociate: 485,
      associate: 350,
      paralegal: 165,
      effectiveDate: "2023-12-01",
      expirationDate: "2024-11-30",
      status: "Active",
      lastUpdated: "2023-12-01"
    },
    {
      id: "RC-006",
      client: "Green Energy Solutions",
      clientId: "CL-10030",
      matter: "Regulatory Compliance",
      practiceArea: "Environmental Law",
      rateType: "Blended",
      partner: 625,
      seniorAssociate: 425,
      associate: 295,
      paralegal: 140,
      effectiveDate: "2023-08-01",
      expirationDate: "2024-07-31",
      status: "Expired",
      lastUpdated: "2023-08-01"
    }
  ];

  const practiceAreas = [...new Set(rateCardData.map(card => card.practiceArea))];
  const rateTypes = [...new Set(rateCardData.map(card => card.rateType))];
  
  const filteredData = rateCardData.filter(card => {
    const practiceMatch = practiceArea === 'all' || card.practiceArea === practiceArea;
    const typeMatch = rateType === 'all' || card.rateType === rateType;
    return practiceMatch && typeMatch;
  });

  // Rate comparison data for chart
  const rateComparisonData = practiceAreas.map(area => {
    const areaCards = rateCardData.filter(card => card.practiceArea === area && card.rateType === 'Hourly');
    if (areaCards.length === 0) return null;
    
    const avgPartner = areaCards.reduce((sum, card) => sum + card.partner, 0) / areaCards.length;
    const avgAssociate = areaCards.reduce((sum, card) => sum + card.associate, 0) / areaCards.length;
    
    return {
      practiceArea: area,
      partner: Math.round(avgPartner),
      associate: Math.round(avgAssociate)
    };
  }).filter(Boolean);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Expiring Soon': return 'bg-yellow-100 text-yellow-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const activeCards = rateCardData.filter(card => card.status === 'Active').length;
  const expiringCards = rateCardData.filter(card => card.status === 'Expiring Soon').length;
  const expiredCards = rateCardData.filter(card => card.status === 'Expired').length;
  const avgPartnerRate = Math.round(rateCardData.filter(card => card.partner > 0).reduce((sum, card) => sum + card.partner, 0) / rateCardData.filter(card => card.partner > 0).length);

  return (
    <ReportLayout
      title="Matter Rate Cards Report"
      description="Overview of billing rates and rate cards across different matters and practice areas"
      filterable
      dateFilterable
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Active Rate Cards</p>
            <p className="text-2xl font-bold">{activeCards}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Expiring Soon</p>
            <p className="text-2xl font-bold">{expiringCards}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Expired</p>
            <p className="text-2xl font-bold">{expiredCards}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Avg Partner Rate</p>
            <p className="text-2xl font-bold">${avgPartnerRate}</p>
          </div>
        </div>

        {/* Rate Comparison Chart */}
        <div>
          <h3 className="text-lg font-medium mb-3">Average Hourly Rates by Practice Area</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rateComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="practiceArea" />
                <YAxis />
                <RechartsTooltip formatter={(value: any) => [`$${value}`, 'Rate']} />
                <Bar dataKey="partner" fill="#8884d8" name="Partner" />
                <Bar dataKey="associate" fill="#82ca9d" name="Associate" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Rate Cards Table */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Rate Card Details</h3>
            <div className="flex gap-2">
              <Select value={practiceArea} onValueChange={setPracticeArea}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by practice area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Practice Areas</SelectItem>
                  {practiceAreas.map(area => (
                    <SelectItem key={area} value={area}>{area}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={rateType} onValueChange={setRateType}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by rate type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rate Types</SelectItem>
                  {rateTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Matter</TableHead>
                <TableHead>Practice Area</TableHead>
                <TableHead>Rate Type</TableHead>
                <TableHead className="text-right">Partner</TableHead>
                <TableHead className="text-right">Sr. Associate</TableHead>
                <TableHead className="text-right">Associate</TableHead>
                <TableHead className="text-right">Paralegal</TableHead>
                <TableHead>Effective Date</TableHead>
                <TableHead>Expiration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map(card => (
                <TableRow key={card.id}>
                  <TableCell className="font-medium">{card.client}</TableCell>
                  <TableCell>{card.matter}</TableCell>
                  <TableCell>{card.practiceArea}</TableCell>
                  <TableCell>{card.rateType}</TableCell>
                  <TableCell className="text-right">
                    {card.rateType === 'Hourly' || card.rateType === 'Blended' ? `$${card.partner}` : 
                     card.rateType === 'Flat Fee' ? `$${card.partner}` : 'N/A'}
                  </TableCell>
                  <TableCell className="text-right">
                    {card.rateType === 'Hourly' || card.rateType === 'Blended' ? `$${card.seniorAssociate}` : 'N/A'}
                  </TableCell>
                  <TableCell className="text-right">
                    {card.rateType === 'Hourly' || card.rateType === 'Blended' ? `$${card.associate}` : 'N/A'}
                  </TableCell>
                  <TableCell className="text-right">
                    {card.rateType === 'Hourly' || card.rateType === 'Blended' || card.rateType === 'Flat Fee' ? `$${card.paralegal}` : 'N/A'}
                  </TableCell>
                  <TableCell>{card.effectiveDate}</TableCell>
                  <TableCell>{card.expirationDate}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(card.status)}>
                      {card.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Edit Rates
                    </Button>
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

export default MatterRateCardsReport;
