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

// Additional reports
import ARAgingSummaryReport from '@/components/reports/client/ARAgingSummaryReport';
import PaymentHistoryReport from '@/components/reports/client/PaymentHistoryReport';
import CommissionReport from '@/components/reports/compensation/CommissionReport';
import ExpensesReport from '@/components/reports/compensation/ExpensesReport';
import BalanceSheetReport from '@/components/reports/accounting/BalanceSheetReport';
import ExpenseAnalysisReport from '@/components/reports/accounting/ExpenseAnalysisReport';
import VendorPerformanceReport from '@/components/reports/vendor/VendorPerformanceReport';
import VendorPaymentReport from '@/components/reports/vendor/VendorPaymentReport';
import StaffUtilizationReport from '@/components/reports/productivity/StaffUtilizationReport';
import RevenueTrendsReport from '@/components/reports/productivity/RevenueTrendsReport';

// Client reports
import SalesTaxClientsReport from '@/components/reports/client/SalesTaxClientsReport';
import MatterRateCardsReport from '@/components/reports/client/MatterRateCardsReport';
import TotalBillingsReport from '@/components/reports/client/TotalBillingsReport';

const Reports = () => {
  const { reportType } = useParams<{ reportType: string }>();
  const location = useLocation();
  const path = location.pathname;

  // Determine which report to show based on the URL
  const renderReport = () => {
    if (path.includes('/reports/client/')) {
      switch(reportType) {
        case 'statement':
        case 'statement-of-account':
          return <ClientStatementReport />;
        case 'aging':
          return <ClientAgingReport />;
        case 'ar-aging-summary':
          return <ARAgingSummaryReport />;
        case 'payment-history':
        case 'client-payments':
          return <PaymentHistoryReport />;
        case 'sales-tax':
        case 'sales-tax-clients':
          return <SalesTaxClientsReport />;
        case 'matter-rate-cards':
          return <MatterRateCardsReport />;
        case 'total-billings':
          return <TotalBillingsReport />;
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
        case 'commission':
          return <CommissionReport />;
        case 'expenses':
          return <ExpensesReport />;
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
        case 'balance-sheet':
          return <BalanceSheetReport />;
        case 'expense-analysis':
          return <ExpenseAnalysisReport />;
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
        case 'performance':
          return <VendorPerformanceReport />;
        case 'payments':
          return <VendorPaymentReport />;
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
        case 'staff-utilization':
          return <StaffUtilizationReport />;
        case 'revenue-trends':
          return <RevenueTrendsReport />;
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
