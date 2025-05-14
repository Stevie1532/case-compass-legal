
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Plus, Search, Trash } from "lucide-react";

const DocumentUnits = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          <span>Document Units</span>
        </CardTitle>
        <CardDescription>Manage document units in the system</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search document units..." className="pl-10" />
            </div>
            <Button className="ml-2 flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>New Unit</span>
            </Button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <label htmlFor="filter-type" className="text-sm font-medium">Filter by Type</label>
                <Select>
                  <SelectTrigger id="filter-type">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="brief">Legal Brief</SelectItem>
                    <SelectItem value="memo">Memo</SelectItem>
                    <SelectItem value="filing">Court Filing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="filter-status" className="text-sm font-medium">Filter by Status</label>
                <Select>
                  <SelectTrigger id="filter-status">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="review">Under Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="finalized">Finalized</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="border rounded-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Checkbox id="select-all" />
                      <label htmlFor="select-all" className="text-xs uppercase font-medium text-gray-500">ID</label>
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { id: 'DOC-001', name: 'Contract Review', type: 'Contract', status: 'Approved', created: '2025-05-01' },
                  { id: 'DOC-002', name: 'Legal Brief', type: 'Brief', status: 'Draft', created: '2025-05-02' },
                  { id: 'DOC-003', name: 'Client Agreement', type: 'Contract', status: 'Under Review', created: '2025-05-03' },
                  { id: 'DOC-004', name: 'Court Filing', type: 'Filing', status: 'Finalized', created: '2025-05-04' },
                  { id: 'DOC-005', name: 'Internal Memo', type: 'Memo', status: 'Draft', created: '2025-05-05' },
                ].map((doc) => (
                  <tr key={doc.id}>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Checkbox id={`select-${doc.id}`} />
                        <label htmlFor={`select-${doc.id}`} className="text-sm text-gray-900">{doc.id}</label>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{doc.type}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        doc.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                        doc.status === 'Under Review' ? 'bg-blue-100 text-blue-800' :
                        doc.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.created}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">Edit</Button>
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
              Showing 5 of 24 document units
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

export default DocumentUnits;
