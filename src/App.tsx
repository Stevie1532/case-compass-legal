
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import { useState } from "react";

const App = () => {
  // Create a client inside the component to avoid React hook issues
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/general" element={<Dashboard />} />
            <Route path="/registrars" element={<Dashboard />} />
            <Route path="/judges" element={<Dashboard />} />
            <Route path="/lawyers" element={<Dashboard />} />
            <Route path="/clerks" element={<Dashboard />} />
            <Route path="/court-detail" element={<Dashboard />} />
            <Route path="/juvenile-courts" element={<Dashboard />} />
            <Route path="/cases-analysis" element={<Dashboard />} />
            <Route path="/court-schedules" element={<Dashboard />} />
            <Route path="/case-schedules" element={<Dashboard />} />
            <Route path="/cases" element={<Dashboard />} />
            <Route path="/tasks" element={<Dashboard />} />
            <Route path="/documents" element={<Dashboard />} />
            <Route path="/memos" element={<Dashboard />} />
            <Route path="/settings" element={<Dashboard />} />
            
            {/* Client Report routes */}
            <Route path="/reports/client/statement" element={<Reports />} />
            <Route path="/reports/client/statement-of-account" element={<Reports />} />
            <Route path="/reports/client/aging" element={<Reports />} />
            <Route path="/reports/client/ar-aging-summary" element={<Reports />} />
            <Route path="/reports/client/payment-history" element={<Reports />} />
            <Route path="/reports/client/client-payments" element={<Reports />} />
            <Route path="/reports/client/sales-tax" element={<Reports />} />
            <Route path="/reports/client/sales-tax-clients" element={<Reports />} />
            <Route path="/reports/client/matter-rate-cards" element={<Reports />} />
            <Route path="/reports/client/total-billings" element={<Reports />} />
            
            {/* Compensation Report routes */}
            <Route path="/reports/compensation/timesheet" element={<Reports />} />
            <Route path="/reports/compensation/bonus" element={<Reports />} />
            <Route path="/reports/compensation/commission" element={<Reports />} />
            <Route path="/reports/compensation/expenses" element={<Reports />} />
            
            {/* Accounting Report routes */}
            <Route path="/reports/accounting/profit-loss" element={<Reports />} />
            <Route path="/reports/accounting/cash-flow" element={<Reports />} />
            <Route path="/reports/accounting/balance-sheet" element={<Reports />} />
            <Route path="/reports/accounting/expense-analysis" element={<Reports />} />
            
            {/* Vendor Report routes */}
            <Route path="/reports/vendor/summary" element={<Reports />} />
            <Route path="/reports/vendor/contracts" element={<Reports />} />
            <Route path="/reports/vendor/performance" element={<Reports />} />
            <Route path="/reports/vendor/payments" element={<Reports />} />
            
            {/* Productivity Report routes */}
            <Route path="/reports/productivity/case-productivity" element={<Reports />} />
            <Route path="/reports/productivity/billing-efficiency" element={<Reports />} />
            <Route path="/reports/productivity/staff-utilization" element={<Reports />} />
            <Route path="/reports/productivity/revenue-trends" element={<Reports />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
