
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BarChart3, 
  Users, 
  Gavel, 
  BarChart, 
  ClipboardList, 
  Building, 
  UserCircle,
  Calendar
} from 'lucide-react';

const DashboardHeader = () => {
  const location = useLocation();
  const path = location.pathname;
  
  const getDashboardInfo = () => {
    switch (path) {
      case '/':
      case '/general':
        return {
          title: 'General Dashboard',
          description: 'Overview of all legal operations and KPIs',
          icon: <BarChart3 className="h-8 w-8 text-legal-light" />,
          color: 'bg-legal-light/10'
        };
      case '/registrars':
        return {
          title: 'Registrar\'s Dashboard',
          description: 'Case filing and document management',
          icon: <ClipboardList className="h-8 w-8 text-orange-500" />,
          color: 'bg-orange-500/10'
        };
      case '/judges':
        return {
          title: 'Judge\'s Dashboard',
          description: 'Case assignments, hearings and opinions',
          icon: <Gavel className="h-8 w-8 text-indigo-600" />,
          color: 'bg-indigo-600/10'
        };
      case '/lawyers':
        return {
          title: 'Lawyer\'s Dashboard',
          description: 'Active cases, documents, and deadlines',
          icon: <UserCircle className="h-8 w-8 text-blue-500" />,
          color: 'bg-blue-500/10'
        };
      case '/clerks':
        return {
          title: 'Clerk\'s Dashboard',
          description: 'Document processing and case logistics',
          icon: <ClipboardList className="h-8 w-8 text-green-500" />,
          color: 'bg-green-500/10'
        };
      case '/court-detail':
        return {
          title: 'Court Detail Dashboard',
          description: 'Court-specific case metrics and session information',
          icon: <Building className="h-8 w-8 text-purple-500" />,
          color: 'bg-purple-500/10'
        };
      case '/juvenile-courts':
        return {
          title: 'Juvenile Courts Dashboard',
          description: 'Specialized juvenile case management',
          icon: <Users className="h-8 w-8 text-pink-500" />,
          color: 'bg-pink-500/10'
        };
      case '/cases-analysis':
        return {
          title: 'Cases Analysis Dashboard',
          description: 'Performance metrics and case outcome trends',
          icon: <BarChart className="h-8 w-8 text-amber-500" />,
          color: 'bg-amber-500/10'
        };
      case '/court-schedules':
        return {
          title: 'Court Schedules Dashboard',
          description: 'Court session planning and conflict resolution',
          icon: <Calendar className="h-8 w-8 text-red-500" />,
          color: 'bg-red-500/10'
        };
      case '/case-schedules':
        return {
          title: 'Case Schedules Dashboard',
          description: 'Hearing dates and milestone planning',
          icon: <Calendar className="h-8 w-8 text-cyan-500" />,
          color: 'bg-cyan-500/10'
        };
      default:
        return {
          title: 'Dashboard',
          description: 'Legal management system dashboard',
          icon: <BarChart3 className="h-8 w-8 text-gray-500" />,
          color: 'bg-gray-500/10'
        };
    }
  };

  const dashboardInfo = getDashboardInfo();

  return (
    <Card className={`border-none shadow-none mb-6 ${dashboardInfo.color}`}>
      <CardContent className="flex items-center gap-4 p-4">
        <div className={`p-2 rounded-lg ${dashboardInfo.color}`}>
          {dashboardInfo.icon}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{dashboardInfo.title}</h1>
          <p className="text-gray-500">{dashboardInfo.description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardHeader;
