
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, FolderPlus, HelpCircle, Plus, BarChart2, DollarSign, Users, CreditCard, TrendingUp } from 'lucide-react';

const QuickActions = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <Button variant="outline" className="flex flex-col h-24 items-center justify-center space-y-2 hover:bg-legal-light hover:text-white">
            <Plus className="h-6 w-6" />
            <span className="text-xs">Create New Case</span>
          </Button>
          <Button variant="outline" className="flex flex-col h-24 items-center justify-center space-y-2 hover:bg-legal-light hover:text-white">
            <FolderPlus className="h-6 w-6" />
            <span className="text-xs">Upload Document</span>
          </Button>
          <Button variant="outline" className="flex flex-col h-24 items-center justify-center space-y-2 hover:bg-legal-light hover:text-white">
            <HelpCircle className="h-6 w-6" />
            <span className="text-xs">Log Issue</span>
          </Button>
          <Button variant="outline" className="flex flex-col h-24 items-center justify-center space-y-2 hover:bg-legal-light hover:text-white">
            <FileText className="h-6 w-6" />
            <span className="text-xs">Generate Report</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col h-24 items-center justify-center space-y-2 hover:bg-legal-light hover:text-white md:hidden"
          >
            <TrendingUp className="h-6 w-6" />
            <span className="text-xs">View Metrics</span>
          </Button>
        </div>
        
        <div className="mt-6">
          <h4 className="text-sm font-medium mb-3">Reports</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <Button 
              asChild 
              variant="outline" 
              className="justify-start h-10 px-3"
            >
              <Link to="/reports/client/statement">
                <DollarSign className="mr-2 h-4 w-4" />
                <span className="text-xs">Client Statement</span>
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              className="justify-start h-10 px-3"
            >
              <Link to="/reports/compensation/timesheet">
                <FileText className="mr-2 h-4 w-4" />
                <span className="text-xs">Timesheet</span>
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              className="justify-start h-10 px-3"
            >
              <Link to="/reports/accounting/profit-loss">
                <BarChart2 className="mr-2 h-4 w-4" />
                <span className="text-xs">P&L Report</span>
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              className="justify-start h-10 px-3"
            >
              <Link to="/reports/vendor/summary">
                <CreditCard className="mr-2 h-4 w-4" />
                <span className="text-xs">Vendor Summary</span>
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              className="justify-start h-10 px-3"
            >
              <Link to="/reports/productivity/case-productivity">
                <TrendingUp className="mr-2 h-4 w-4" />
                <span className="text-xs">Productivity</span>
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
