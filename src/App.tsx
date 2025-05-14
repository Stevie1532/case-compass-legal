
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
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
            
            {/* Report routes */}
            <Route path="/reports/client/:reportType" element={<Dashboard />} />
            <Route path="/reports/compensation/:reportType" element={<Dashboard />} />
            <Route path="/reports/accounting/:reportType" element={<Dashboard />} />
            <Route path="/reports/vendor/:reportType" element={<Dashboard />} />
            <Route path="/reports/productivity/:reportType" element={<Dashboard />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
