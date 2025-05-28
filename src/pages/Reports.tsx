
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
  const location = useLocation();
  const path = location.pathname;

  console.log('Current path:', path); // Debug log

  // Determine which report to show based on the exact URL path
  const renderReport = () => {
    // Client reports - use exact path matching
    if (path === '/reports/client/statement' || path === '/reports/client/statement-of-account') {
      return <ClientStatementReport />;
    }
    if (path === '/reports/client/aging') {
      return <ClientAgingReport />;
    }
    if (path === '/reports/client/ar-aging-summary') {
      return <ARAgingSummaryReport />;
    }
    if (path === '/reports/client/payment-history' || path === '/reports/client/client-payments') {
      return <PaymentHistoryReport />;
    }
    if (path === '/reports/client/sales-tax' || path === '/reports/client/sales-tax-clients') {
      return <SalesTaxClientsReport />;
    }
    if (path === '/reports/client/matter-rate-cards') {
      return <MatterRateCardsReport />;
    }
    if (path === '/reports/client/total-billings') {
      return <TotalBillingsReport />;
    }

    // Compensation reports
    if (path === '/reports/compensation/timesheet') {
      return <TimesheetReport />;
    }
    if (path === '/reports/compensation/bonus') {
      return <BonusReport />;
    }
    if (path === '/reports/compensation/commission') {
      return <CommissionReport />;
    }
    if (path === '/reports/compensation/expenses') {
      return <ExpensesReport />;
    }

    // Accounting reports
    if (path === '/reports/accounting/profit-loss') {
      return <ProfitLossReport />;
    }
    if (path === '/reports/accounting/cash-flow') {
      return <CashFlowReport />;
    }
    if (path === '/reports/accounting/balance-sheet') {
      return <BalanceSheetReport />;
    }
    if (path === '/reports/accounting/expense-analysis') {
      return <ExpenseAnalysisReport />;
    }

    // Vendor reports
    if (path === '/reports/vendor/summary') {
      return <VendorSummaryReport />;
    }
    if (path === '/reports/vendor/contracts') {
      return <VendorContractReport />;
    }
    if (path === '/reports/vendor/performance') {
      return <VendorPerformanceReport />;
    }
    if (path === '/reports/vendor/payments') {
      return <VendorPaymentReport />;
    }

    // Productivity reports
    if (path === '/reports/productivity/case-productivity') {
      return <CaseProductivityReport />;
    }
    if (path === '/reports/productivity/billing-efficiency') {
      return <BillingEfficiencyReport />;
    }
    if (path === '/reports/productivity/staff-utilization') {
      return <StaffUtilizationReport />;
    }
    if (path === '/reports/productivity/revenue-trends') {
      return <RevenueTrendsReport />;
    }
    
    // Default fallback
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
