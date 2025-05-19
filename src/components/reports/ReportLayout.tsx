
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Printer, FileText, Filter, Calendar } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface ReportLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  downloadable?: boolean;
  printable?: boolean;
  exportable?: boolean;
  filterable?: boolean;
  dateFilterable?: boolean;
}

const ReportLayout = ({
  title,
  description,
  children,
  downloadable = true,
  printable = true,
  exportable = true,
  filterable = false,
  dateFilterable = false
}: ReportLayoutProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [filterValue, setFilterValue] = useState("all");

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
          {dateFilterable && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex gap-2">
                  <Calendar className="h-4 w-4" />
                  {date ? format(date, 'PP') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
          
          {filterable && (
            <Select value={filterValue} onValueChange={setFilterValue}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="active">Active Only</SelectItem>
                <SelectItem value="completed">Completed Only</SelectItem>
                <SelectItem value="pending">Pending Only</SelectItem>
              </SelectContent>
            </Select>
          )}
          
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
