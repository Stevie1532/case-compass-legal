
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Plus, Search, Copy, Trash, Edit } from "lucide-react";

const DocumentTemplate = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          <span>Document Templates</span>
        </CardTitle>
        <CardDescription>Create and manage reusable document templates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search templates..." className="pl-10" />
            </div>
            <Button className="ml-2 flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>New Template</span>
            </Button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-sm font-medium mb-4">Create New Template</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="template-name" className="text-sm font-medium">Template Name</label>
                  <Input id="template-name" placeholder="Enter template name" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="template-category" className="text-sm font-medium">Category</label>
                  <Select>
                    <SelectTrigger id="template-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="letter">Letter</SelectItem>
                      <SelectItem value="memo">Memo</SelectItem>
                      <SelectItem value="brief">Legal Brief</SelectItem>
                      <SelectItem value="filing">Court Filing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="template-description" className="text-sm font-medium">Description</label>
                <Input id="template-description" placeholder="Enter template description" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="template-content" className="text-sm font-medium">Template Content</label>
                <Textarea id="template-content" placeholder="Enter template content with placeholder variables using {VARIABLE_NAME}..." rows={8} />
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Variables</h4>
                <p className="text-xs text-gray-500 mb-2">Define placeholder variables that can be replaced when using this template.</p>
                
                <div className="border rounded-md bg-white p-3">
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <Input placeholder="Variable name" />
                      <Input placeholder="Default value (optional)" />
                      <div>
                        <Button variant="outline" size="sm" className="w-full">Add Variable</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 pt-2 border-t">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{'{CLIENT_NAME}'}</span>
                          <span className="text-xs text-gray-500">Default: "Client"</span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-red-600 h-7 w-7 p-0">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{'{MATTER_REF}'}</span>
                          <span className="text-xs text-gray-500">Default: "REF-0001"</span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-red-600 h-7 w-7 p-0">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{'{ATTORNEY_NAME}'}</span>
                          <span className="text-xs text-gray-500">Default: "Attorney"</span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-red-600 h-7 w-7 p-0">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Checkbox id="make-public" />
                  <div className="grid gap-1.5 leading-none">
                    <label htmlFor="make-public" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Make Available to All Users
                    </label>
                    <p className="text-sm text-gray-500">If unchecked, only you will be able to use this template</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Template</Button>
              </div>
            </div>
          </div>
          
          <div className="border rounded-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Template Name
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created By
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usage Count
                  </th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { id: 1, name: 'Standard NDA', category: 'Contract', createdBy: 'John Doe', updated: '2025-05-01', usage: 47 },
                  { id: 2, name: 'Client Engagement Letter', category: 'Letter', createdBy: 'Jane Smith', updated: '2025-05-02', usage: 32 },
                  { id: 3, name: 'Court Motion Template', category: 'Filing', createdBy: 'Mark Johnson', updated: '2025-05-03', usage: 18 },
                  { id: 4, name: 'Internal Memo Format', category: 'Memo', createdBy: 'Sarah Williams', updated: '2025-05-04', usage: 56 },
                  { id: 5, name: 'Legal Opinion', category: 'Brief', createdBy: 'Robert Brown', updated: '2025-05-05', usage: 24 },
                ].map((template) => (
                  <tr key={template.id}>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-900">{template.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{template.category}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{template.createdBy}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {template.updated}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {template.usage}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing 5 of 18 templates
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentTemplate;
