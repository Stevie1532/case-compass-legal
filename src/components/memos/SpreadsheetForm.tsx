
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, Save, Download, Share2 } from "lucide-react";

const SpreadsheetForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sheet className="h-5 w-5" />
          <span>Spreadsheet</span>
        </CardTitle>
        <CardDescription>Create and edit spreadsheet documents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="spreadsheet-title" className="text-sm font-medium">Spreadsheet Title</label>
              <Input id="spreadsheet-title" placeholder="Enter spreadsheet title" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="spreadsheet-category" className="text-sm font-medium">Category</label>
              <Select>
                <SelectTrigger id="spreadsheet-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="billing">Billing</SelectItem>
                  <SelectItem value="case-tracking">Case Tracking</SelectItem>
                  <SelectItem value="expense">Expense Records</SelectItem>
                  <SelectItem value="time-tracking">Time Tracking</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="border rounded-md">
            <div className="bg-gray-100 p-2 border-b flex items-center gap-2 overflow-x-auto">
              {['Format', 'Formula', 'Sort', 'Filter', 'Cell', 'Row', 'Column', 'Functions', 'Charts'].map((tool) => (
                <Button key={tool} variant="ghost" size="sm" className="whitespace-nowrap">
                  {tool}
                </Button>
              ))}
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="w-10 border bg-gray-50 px-2 py-1"></th>
                    {Array.from({ length: 8 }, (_, i) => String.fromCharCode(65 + i)).map((col) => (
                      <th key={col} className="border bg-gray-50 px-2 py-1 text-center font-medium text-xs text-gray-500">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((row) => (
                    <tr key={row}>
                      <td className="border bg-gray-50 px-2 py-1 text-center font-medium text-xs text-gray-500">
                        {row}
                      </td>
                      {Array.from({ length: 8 }, (_, i) => i).map((col) => (
                        <td key={col} className="border px-2 py-1 min-w-[100px] h-8">
                          {row === 1 && col === 0 ? 'Sample Data' : ''}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-1">
                <Save className="h-4 w-4" />
                <span>Save</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-1">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
            
            <div className="text-sm text-gray-500">
              Last saved: 14 May 2025, 11:20 AM
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="spreadsheet-tags" className="text-sm font-medium">Tags</label>
            <Input id="spreadsheet-tags" placeholder="Add tags separated by commas" />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="spreadsheet-notes" className="text-sm font-medium">Notes</label>
            <Input id="spreadsheet-notes" placeholder="Add any notes about this spreadsheet" />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save Spreadsheet</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpreadsheetForm;
