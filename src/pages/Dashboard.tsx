import React from 'react';
import { useLocation } from 'react-router-dom';
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
import CaseMetrics from '@/components/dashboard/CaseMetrics';
import UpcomingMilestones from '@/components/dashboard/UpcomingMilestones';
import RecentIssues from '@/components/dashboard/RecentIssues';
import TeamWorkload from '@/components/dashboard/TeamWorkload';
import QuickActions from '@/components/dashboard/QuickActions';
import ClientAnalysis from '@/components/dashboard/ClientAnalysis';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

const Dashboard = () => {
  const location = useLocation();
  const path = location.pathname;
  
  // Render content based on current path
  const renderDashboardContent = () => {
    switch (path) {
      case '/':
      case '/general':
        return <GeneralDashboard />;
      case '/registrars':
        return <RegistrarDashboard />;
      case '/judges':
        return <JudgeDashboard />;
      case '/lawyers':
        return <LawyerDashboard />;
      case '/clerks':
        return <ClerkDashboard />;
      case '/court-detail':
        return <CourtDetailDashboard />;
      case '/juvenile-courts':
        return <JuvenileCourtsDashboard />;
      case '/cases-analysis':
        return <CasesAnalysisDashboard />;
      case '/court-schedules':
        return <CourtSchedulesDashboard />;
      case '/case-schedules':
        return <CaseSchedulesDashboard />;
      default:
        return <StandardDashboard />;
    }
  };

  return (
    <DashboardLayout>
      <DashboardHeader />
      {renderDashboardContent()}
    </DashboardLayout>
  );
};

// Standard Dashboard (used for routes not specifically handled)
const StandardDashboard = () => (
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
);

// General Dashboard
const GeneralDashboard = () => (
  <Tabs defaultValue="overview" className="mb-6">
    <TabsList>
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="metrics">Case Metrics</TabsTrigger>
      <TabsTrigger value="milestones">Milestones</TabsTrigger>
      <TabsTrigger value="issues">Issues</TabsTrigger>
      <TabsTrigger value="teams">Teams</TabsTrigger>
      <TabsTrigger value="clients">Clients</TabsTrigger>
    </TabsList>
    
    <TabsContent value="overview" className="mt-4 space-y-6">
      <QuickActions />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <CaseMetrics />
        <div className="grid grid-cols-1 gap-6">
          <CaseStatusPieChart />
          <CaseStatisticsChart />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentCases />
        <UpcomingMilestones />
      </div>
    </TabsContent>
    
    <TabsContent value="metrics" className="mt-4 space-y-6">
      <CaseMetrics />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CaseStatusPieChart />
        <CaseStatisticsChart />
        <CaseTableau />
      </div>
    </TabsContent>
    
    <TabsContent value="milestones" className="mt-4 space-y-6">
      <UpcomingMilestones />
      <CaseTableau />
    </TabsContent>
    
    <TabsContent value="issues" className="mt-4 space-y-6">
      <RecentIssues />
      <UpcomingDeadlines />
    </TabsContent>
    
    <TabsContent value="teams" className="mt-4 space-y-6">
      <TeamWorkload />
      <ActivityTimeline />
    </TabsContent>
    
    <TabsContent value="clients" className="mt-4 space-y-6">
      <ClientAnalysis />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DocumentActivity />
        <RecentCases />
      </div>
    </TabsContent>
  </Tabs>
);

// Registrar's Dashboard
const RegistrarDashboard = () => (
  <Tabs defaultValue="filings" className="mb-6">
    <TabsList>
      <TabsTrigger value="filings">Case Filings</TabsTrigger>
      <TabsTrigger value="documents">Documents</TabsTrigger>
      <TabsTrigger value="schedules">Court Schedules</TabsTrigger>
      <TabsTrigger value="fees">Fee Collection</TabsTrigger>
      <TabsTrigger value="settings">Settings</TabsTrigger>
    </TabsList>
    
    <TabsContent value="filings" className="mt-4 space-y-6">
      <CaseTableau />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CaseMetrics />
        <CaseStatisticsChart />
      </div>
    </TabsContent>
    
    <TabsContent value="documents" className="mt-4 space-y-6">
      <DocumentActivity />
      <RecentCases />
    </TabsContent>
    
    <TabsContent value="schedules" className="mt-4 space-y-6">
      <UpcomingMilestones />
      <UpcomingDeadlines />
    </TabsContent>
    
    <TabsContent value="fees" className="mt-4 space-y-6">
      <ClientAnalysis />
      <ActivityTimeline />
    </TabsContent>
    
    <TabsContent value="settings" className="mt-4 space-y-6">
      <QuickActions />
      <RecentIssues />
    </TabsContent>
  </Tabs>
);

// Judge's Dashboard
const JudgeDashboard = () => (
  <Tabs defaultValue="assigned" className="mb-6">
    <TabsList>
      <TabsTrigger value="assigned">Assigned Cases</TabsTrigger>
      <TabsTrigger value="analysis">Case Analysis</TabsTrigger>
      <TabsTrigger value="hearings">Hearings</TabsTrigger>
      <TabsTrigger value="milestones">Milestones</TabsTrigger>
      <TabsTrigger value="opinions">Draft Opinions</TabsTrigger>
    </TabsList>
    
    <TabsContent value="assigned" className="mt-4 space-y-6">
      <CaseTableau />
      <CaseStatusPieChart />
    </TabsContent>
    
    <TabsContent value="analysis" className="mt-4 space-y-6">
      <CaseMetrics />
      <CaseStatisticsChart />
    </TabsContent>
    
    <TabsContent value="hearings" className="mt-4 space-y-6">
      <UpcomingMilestones />
      <UpcomingDeadlines />
    </TabsContent>
    
    <TabsContent value="milestones" className="mt-4 space-y-6">
      <UpcomingMilestones />
      <ActivityTimeline />
    </TabsContent>
    
    <TabsContent value="opinions" className="mt-4 space-y-6">
      <DocumentActivity />
      <RecentCases />
    </TabsContent>
  </Tabs>
);

// Lawyer's Dashboard
const LawyerDashboard = () => (
  <Tabs defaultValue="active" className="mb-6">
    <TabsList>
      <TabsTrigger value="active">Active Cases</TabsTrigger>
      <TabsTrigger value="shared">Shared with Me</TabsTrigger>
      <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
      <TabsTrigger value="documents">Documents</TabsTrigger>
      <TabsTrigger value="billing">Billing</TabsTrigger>
      <TabsTrigger value="support">Support</TabsTrigger>
    </TabsList>
    
    <TabsContent value="active" className="mt-4 space-y-6">
      <CaseTableau />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CaseStatusPieChart />
        <CaseStatisticsChart />
      </div>
    </TabsContent>
    
    <TabsContent value="shared" className="mt-4 space-y-6">
      <TaskTableau />
      <RecentCases />
    </TabsContent>
    
    <TabsContent value="deadlines" className="mt-4 space-y-6">
      <UpcomingMilestones />
      <UpcomingDeadlines />
    </TabsContent>
    
    <TabsContent value="documents" className="mt-4 space-y-6">
      <DocumentActivity />
      <RecentCases />
    </TabsContent>
    
    <TabsContent value="billing" className="mt-4 space-y-6">
      <ClientAnalysis />
      <ActivityTimeline />
    </TabsContent>
    
    <TabsContent value="support" className="mt-4 space-y-6">
      <RecentIssues />
      <TeamChat />
    </TabsContent>
  </Tabs>
);

// Clerk's Dashboard
const ClerkDashboard = () => (
  <Tabs defaultValue="queue" className="mb-6">
    <TabsList>
      <TabsTrigger value="queue">Doc Queue</TabsTrigger>
      <TabsTrigger value="assignments">Assignments</TabsTrigger>
      <TabsTrigger value="logistics">Court Logistics</TabsTrigger>
      <TabsTrigger value="support">IT Support</TabsTrigger>
    </TabsList>
    
    <TabsContent value="queue" className="mt-4 space-y-6">
      <DocumentActivity />
      <RecentCases />
    </TabsContent>
    
    <TabsContent value="assignments" className="mt-4 space-y-6">
      <TaskTableau />
      <TeamWorkload />
    </TabsContent>
    
    <TabsContent value="logistics" className="mt-4 space-y-6">
      <UpcomingMilestones />
      <UpcomingDeadlines />
    </TabsContent>
    
    <TabsContent value="support" className="mt-4 space-y-6">
      <RecentIssues />
      <TeamChat />
    </TabsContent>
  </Tabs>
);

// Court Detail Dashboard
const CourtDetailDashboard = () => (
  <Tabs defaultValue="counts" className="mb-6">
    <TabsList>
      <TabsTrigger value="counts">Case Counts</TabsTrigger>
      <TabsTrigger value="sessions">Daily Sessions</TabsTrigger>
      <TabsTrigger value="resources">Resources</TabsTrigger>
      <TabsTrigger value="access">Document Access</TabsTrigger>
    </TabsList>
    
    <TabsContent value="counts" className="mt-4 space-y-6">
      <CaseMetrics />
      <CaseStatusPieChart />
    </TabsContent>
    
    <TabsContent value="sessions" className="mt-4 space-y-6">
      <UpcomingMilestones />
      <UpcomingDeadlines />
    </TabsContent>
    
    <TabsContent value="resources" className="mt-4 space-y-6">
      <TeamWorkload />
      <ActivityTimeline />
    </TabsContent>
    
    <TabsContent value="access" className="mt-4 space-y-6">
      <DocumentActivity />
      <RecentIssues />
    </TabsContent>
  </Tabs>
);

// Juvenile Courts Dashboard
const JuvenileCourtsDashboard = () => (
  <Tabs defaultValue="active" className="mb-6">
    <TabsList>
      <TabsTrigger value="active">Active Cases</TabsTrigger>
      <TabsTrigger value="hearings">Review Hearings</TabsTrigger>
      <TabsTrigger value="services">Support Services</TabsTrigger>
      <TabsTrigger value="templates">Templates</TabsTrigger>
    </TabsList>
    
    <TabsContent value="active" className="mt-4 space-y-6">
      <CaseTableau />
      <CaseStatusPieChart />
    </TabsContent>
    
    <TabsContent value="hearings" className="mt-4 space-y-6">
      <UpcomingMilestones />
      <UpcomingDeadlines />
    </TabsContent>
    
    <TabsContent value="services" className="mt-4 space-y-6">
      <RecentIssues />
      <TeamWorkload />
    </TabsContent>
    
    <TabsContent value="templates" className="mt-4 space-y-6">
      <DocumentActivity />
      <ActivityTimeline />
    </TabsContent>
  </Tabs>
);

// Cases Analysis Dashboard
const CasesAnalysisDashboard = () => (
  <Tabs defaultValue="trends" className="mb-6">
    <TabsList>
      <TabsTrigger value="trends">Duration Trends</TabsTrigger>
      <TabsTrigger value="ratios">Win/Loss Ratios</TabsTrigger>
      <TabsTrigger value="heatmap">Priority/Impact</TabsTrigger>
      <TabsTrigger value="teams">Team Performance</TabsTrigger>
    </TabsList>
    
    <TabsContent value="trends" className="mt-4 space-y-6">
      <CaseStatisticsChart />
      <CaseTableau />
    </TabsContent>
    
    <TabsContent value="ratios" className="mt-4 space-y-6">
      <CaseStatusPieChart />
      <CaseMetrics />
    </TabsContent>
    
    <TabsContent value="heatmap" className="mt-4 space-y-6">
      <CaseMetrics />
      <CaseStatisticsChart />
    </TabsContent>
    
    <TabsContent value="teams" className="mt-4 space-y-6">
      <TeamWorkload />
      <ActivityTimeline />
    </TabsContent>
  </Tabs>
);

// Court Schedules Dashboard
const CourtSchedulesDashboard = () => (
  <Tabs defaultValue="calendar" className="mb-6">
    <TabsList>
      <TabsTrigger value="calendar">Calendar</TabsTrigger>
      <TabsTrigger value="conflicts">Conflicts</TabsTrigger>
      <TabsTrigger value="agenda">7-Day Agenda</TabsTrigger>
      <TabsTrigger value="new">New Session</TabsTrigger>
    </TabsList>
    
    <TabsContent value="calendar" className="mt-4 space-y-6">
      <UpcomingMilestones />
      <UpcomingDeadlines />
    </TabsContent>
    
    <TabsContent value="conflicts" className="mt-4 space-y-6">
      <RecentIssues />
      <TaskTableau />
    </TabsContent>
    
    <TabsContent value="agenda" className="mt-4 space-y-6">
      <UpcomingMilestones />
      <CaseTableau />
    </TabsContent>
    
    <TabsContent value="new" className="mt-4 space-y-6">
      <QuickActions />
      <TeamWorkload />
    </TabsContent>
  </Tabs>
);

// Case Schedules Dashboard
const CaseSchedulesDashboard = () => (
  <Tabs defaultValue="hearings" className="mb-6">
    <TabsList>
      <TabsTrigger value="hearings">Hearing Dates</TabsTrigger>
      <TabsTrigger value="reschedule">Reschedule Requests</TabsTrigger>
      <TabsTrigger value="gaps">Milestone Gaps</TabsTrigger>
      <TabsTrigger value="new">New Hearing</TabsTrigger>
    </TabsList>
    
    <TabsContent value="hearings" className="mt-4 space-y-6">
      <UpcomingMilestones />
      <CaseTableau />
    </TabsContent>
    
    <TabsContent value="reschedule" className="mt-4 space-y-6">
      <RecentIssues />
      <TaskTableau />
    </TabsContent>
    
    <TabsContent value="gaps" className="mt-4 space-y-6">
      <CaseMetrics />
      <CaseStatisticsChart />
    </TabsContent>
    
    <TabsContent value="new" className="mt-4 space-y-6">
      <QuickActions />
      <ActivityTimeline />
    </TabsContent>
  </Tabs>
);

export default Dashboard;
