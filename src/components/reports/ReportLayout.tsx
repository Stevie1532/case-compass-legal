
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Printer, FileText } from 'lucide-react';

interface ReportLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  downloadable?: boolean;
  printable?: boolean;
  exportable?: boolean;
}

const ReportLayout = ({
  title,
  description,
  children,
  downloadable = true,
  printable = true,
  exportable = true
}: ReportLayoutProps) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF or CSV
    console.log('Downloading report:', title);
  };

  const handleExport = () => {
    // In a real app, this would export to Excel/CSV
    console.log('Exporting report to Excel:', title);
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-gray-50 border-b flex-row justify-between items-center">
        <div>
          <CardTitle className="text-xl">{title}</CardTitle>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
        <div className="flex gap-2">
          {downloadable && (
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="mr-1 h-4 w-4" /> Download
            </Button>
          )}
          {printable && (
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="mr-1 h-4 w-4" /> Print
            </Button>
          )}
          {exportable && (
            <Button variant="outline" size="sm" onClick={handleExport}>
              <FileText className="mr-1 h-4 w-4" /> Export
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  );
};

export default ReportLayout;
