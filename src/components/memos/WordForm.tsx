
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Save, Download, Share2 } from "lucide-react";

const WordForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          <span>Word Document</span>
        </CardTitle>
        <CardDescription>Create and edit word processing documents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="document-title" className="text-sm font-medium">Document Title</label>
              <Input id="document-title" placeholder="Enter document title" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="document-category" className="text-sm font-medium">Category</label>
              <Select>
                <SelectTrigger id="document-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contracts">Contracts</SelectItem>
                  <SelectItem value="briefs">Legal Briefs</SelectItem>
                  <SelectItem value="letters">Letters</SelectItem>
                  <SelectItem value="memos">Memos</SelectItem>
                  <SelectItem value="filings">Court Filings</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="border rounded-md">
            <div className="bg-gray-100 p-2 border-b flex items-center gap-2 overflow-x-auto">
              {['Font', 'Size', 'Bold', 'Italic', 'Underline', 'Align', 'Bullets', 'Numbering', 'Indent', 'Outdent', 'Insert'].map((tool) => (
                <Button key={tool} variant="ghost" size="sm" className="whitespace-nowrap">
                  {tool}
                </Button>
              ))}
            </div>
            <div className="p-4 min-h-[400px] bg-white">
              <p className="text-gray-400 italic">Start typing your document content here...</p>
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
              Last saved: 14 May 2025, 10:45 AM
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="document-tags" className="text-sm font-medium">Tags</label>
            <Input id="document-tags" placeholder="Add tags separated by commas" />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="document-notes" className="text-sm font-medium">Notes</label>
            <Input id="document-notes" placeholder="Add any notes about this document" />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save Document</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WordForm;
