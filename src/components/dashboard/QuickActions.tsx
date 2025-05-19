
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, FolderPlus, HelpCircle, Plus } from 'lucide-react';

const QuickActions = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
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
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
