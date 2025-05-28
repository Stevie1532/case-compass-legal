
import React from 'react';
import { useLocation } from 'react-router-dom';
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

// New reports
import ReferralReport from '@/components/reports/compensation/ReferralReport';
import VendorSpendReport from '@/components/reports/vendor/VendorSpendReport';
import GeneralLedgerReport from '@/components/reports/accounting/GeneralLedgerReport';
import AttorneyProductivityReport from '@/components/reports/productivity/AttorneyProductivityReport';

// New accounting reports
import ProfitLossByLocationReport from '@/components/reports/accounting/ProfitLossByLocationReport';
import TrialBalanceReport from '@/components/reports/accounting/TrialBalanceReport';
import ChartOfAccountsReport from '@/components/reports/accounting/ChartOfAccountsReport';
import AccountReconciliationReport from '@/components/reports/accounting/AccountReconciliationReport';
import WriteOffReport from '@/components/reports/accounting/WriteOffReport';
import FirmBudgetingReport from '@/components/reports/accounting/FirmBudgetingReport';

// New vendor reports
import AccountPayableAgingReport from '@/components/reports/vendor/AccountPayableAgingReport';
import VendorReimbursementsReport from '@/components/reports/vendor/VendorReimbursementsReport';
import Vendor1099Report from '@/components/reports/vendor/Vendor1099Report';

// New productivity reports
import WorkInProgressReport from '@/components/reports/productivity/WorkInProgressReport';
import TimekeeperProductivityReport from '@/components/reports/productivity/TimekeeperProductivityReport';
import BillableHoursReport from '@/components/reports/productivity/BillableHoursReport';
import TimekeeperGoalsReport from '@/components/reports/productivity/TimekeeperGoalsReport';
import BilledAndCollectedReport from '@/components/reports/productivity/BilledAndCollectedReport';
import FlatFeeProductivityReport from '@/components/reports/productivity/FlatFeeProductivityReport';

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
    if (path === '/reports/compensation/referral-reports') {
      return <ReferralReport />;
    }

    // Accounting reports
    if (path === '/reports/accounting/profit-loss') {
      return <ProfitLossReport />;
    }
    if (path === '/reports/accounting/profit-loss-by-location') {
      return <ProfitLossByLocationReport />;
    }
    if (path === '/reports/accounting/cash-flow') {
      return <CashFlowReport />;
    }
    if (path === '/reports/accounting/balance-sheet') {
      return <BalanceSheetReport />;
    }
    if (path === '/reports/accounting/trial-balance') {
      return <TrialBalanceReport />;
    }
    if (path === '/reports/accounting/chart-of-accounts') {
      return <ChartOfAccountsReport />;
    }
    if (path === '/reports/accounting/account-reconciliation') {
      return <AccountReconciliationReport />;
    }
    if (path === '/reports/accounting/write-off') {
      return <WriteOffReport />;
    }
    if (path === '/reports/accounting/firm-budgeting') {
      return <FirmBudgetingReport />;
    }
    if (path === '/reports/accounting/expense-analysis') {
      return <ExpenseAnalysisReport />;
    }
    if (path === '/reports/accounting/general-ledger') {
      return <GeneralLedgerReport />;
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
    if (path === '/reports/vendor/spend-analysis') {
      return <VendorSpendReport />;
    }
    if (path === '/reports/vendor/account-payable-aging-summary') {
      return <AccountPayableAgingReport />;
    }
    if (path === '/reports/vendor/vendor-reimbursements') {
      return <VendorReimbursementsReport />;
    }
    if (path === '/reports/vendor/1099-reporting') {
      return <Vendor1099Report />;
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
    if (path === '/reports/productivity/attorney-productivity') {
      return <AttorneyProductivityReport />;
    }
    if (path === '/reports/productivity/work-in-progress') {
      return <WorkInProgressReport />;
    }
    if (path === '/reports/productivity/timekeeper-productivity') {
      return <TimekeeperProductivityReport />;
    }
    if (path === '/reports/productivity/billable-hours') {
      return <BillableHoursReport />;
    }
    if (path === '/reports/productivity/timekeeper-goals') {
      return <TimekeeperGoalsReport />;
    }
    if (path === '/reports/productivity/billed-and-collected') {
      return <BilledAndCollectedReport />;
    }
    if (path === '/reports/productivity/flat-fee-productivity') {
      return <FlatFeeProductivityReport />;
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
