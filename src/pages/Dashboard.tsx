
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import MetricsCards from '@/components/dashboard/MetricsCards';
import RecentCases from '@/components/dashboard/RecentCases';
import PriorityTasks from '@/components/dashboard/PriorityTasks';
import DocumentActivity from '@/components/dashboard/DocumentActivity';
import UpcomingDeadlines from '@/components/dashboard/UpcomingDeadlines';
import QuickAccess from '@/components/dashboard/QuickAccess';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Welcome to your legal management dashboard</p>
      </div>
      
      <div className="mb-6">
        <QuickAccess />
      </div>
      
      <div className="mb-6">
        <MetricsCards />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RecentCases />
        <PriorityTasks />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DocumentActivity />
        <UpcomingDeadlines />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
