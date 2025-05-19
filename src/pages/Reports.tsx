
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ClientStatementReport from '@/components/reports/client/ClientStatementReport';
import ClientAgingReport from '@/components/reports/client/ClientAgingReport';
import TimesheetReport from '@/components/reports/compensation/TimesheetReport';
import BonusReport from '@/components/reports/compensation/BonusReport';
import ProfitLossReport from '@/components/reports/accounting/ProfitLossReport';
import CashFlowReport from '@/components/reports/accounting/CashFlowReport';
import VendorSummaryReport from '@/components/reports/vendor/VendorSummaryReport';
import VendorContractReport from '@/components/reports/vendor/VendorContractReport';
import CaseProductivityReport from '@/components/reports/productivity/CaseProductivityReport';
import BillingEfficiencyReport from '@/components/reports/productivity/BillingEfficiencyReport';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

const Reports = () => {
  const { reportType } = useParams<{ reportType: string }>();
  const location = useLocation();
  const path = location.pathname;

  // Determine which report to show based on the URL
  const renderReport = () => {
    if (path.includes('/reports/client/')) {
      switch(reportType) {
        case 'statement':
          return <ClientStatementReport />;
        case 'aging':
          return <ClientAgingReport />;
        default:
          return <ClientStatementReport />;
      }
    } 
    else if (path.includes('/reports/compensation/')) {
      switch(reportType) {
        case 'timesheet':
          return <TimesheetReport />;
        case 'bonus':
          return <BonusReport />;
        default:
          return <TimesheetReport />;
      }
    }
    else if (path.includes('/reports/accounting/')) {
      switch(reportType) {
        case 'profit-loss':
          return <ProfitLossReport />;
        case 'cash-flow':
          return <CashFlowReport />;
        default:
          return <ProfitLossReport />;
      }
    }
    else if (path.includes('/reports/vendor/')) {
      switch(reportType) {
        case 'summary':
          return <VendorSummaryReport />;
        case 'contracts':
          return <VendorContractReport />;
        default:
          return <VendorSummaryReport />;
      }
    }
    else if (path.includes('/reports/productivity/')) {
      switch(reportType) {
        case 'case-productivity':
          return <CaseProductivityReport />;
        case 'billing-efficiency':
          return <BillingEfficiencyReport />;
        default:
          return <CaseProductivityReport />;
      }
    }
    
    // Default to client statement report if no match
    return <ClientStatementReport />;
  };

  return (
    <DashboardLayout>
      <DashboardHeader />
      <div className="mb-6">
        {renderReport()}
      </div>
    </DashboardLayout>
  );
};

export default Reports;
