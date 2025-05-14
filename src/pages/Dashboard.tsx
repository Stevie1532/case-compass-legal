
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import MetricsCards from '@/components/dashboard/MetricsCards';
import RecentCases from '@/components/dashboard/RecentCases';
import PriorityTasks from '@/components/dashboard/PriorityTasks';
import DocumentActivity from '@/components/dashboard/DocumentActivity';
import UpcomingDeadlines from '@/components/dashboard/UpcomingDeadlines';
import QuickAccess from '@/components/dashboard/QuickAccess';
import CaseStatisticsChart from '@/components/dashboard/CaseStatisticsChart';
import CaseStatusPieChart from '@/components/dashboard/CaseStatusPieChart';
import ActivityTimeline from '@/components/dashboard/ActivityTimeline';
import TeamChat from '@/components/dashboard/TeamChat';
import CaseTableau from '@/components/dashboard/CaseTableau';
import TaskTableau from '@/components/dashboard/TaskTableau';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Welcome to your legal management dashboard</p>
      </div>
      
      <Tabs defaultValue="overview" className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cases">Cases</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4 space-y-6">
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
        </TabsContent>
        
        <TabsContent value="cases" className="mt-4 space-y-6">
          <CaseTableau />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <CaseStatusPieChart />
            <ActivityTimeline />
            <div className="lg:col-span-1 h-full">
              <QuickAccess />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="tasks" className="mt-4 space-y-6">
          <TaskTableau />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PriorityTasks />
            <UpcomingDeadlines />
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-4 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <CaseStatisticsChart />
            <CaseStatusPieChart />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DocumentActivity />
            <ActivityTimeline />
          </div>
        </TabsContent>
        
        <TabsContent value="communication" className="mt-4 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
            <TeamChat />
            <ActivityTimeline />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentCases />
            <UpcomingDeadlines />
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Dashboard;
