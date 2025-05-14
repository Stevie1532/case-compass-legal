
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Plus, Search, Trash, Edit, Eye } from "lucide-react";

const DocItems = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          <span>Document Items</span>
        </CardTitle>
        <CardDescription>Manage individual document items</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search document items..." className="pl-10" />
            </div>
            <Button className="ml-2 flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>New Item</span>
            </Button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="filter-type" className="text-sm font-medium">Filter by Type</label>
                <Select>
                  <SelectTrigger id="filter-type">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="table">Table</SelectItem>
                    <SelectItem value="attachment">Attachment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="filter-folder" className="text-sm font-medium">Filter by Folder</label>
                <Select>
                  <SelectTrigger id="filter-folder">
                    <SelectValue placeholder="All Folders" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Folders</SelectItem>
                    <SelectItem value="contracts">Contracts</SelectItem>
                    <SelectItem value="briefs">Legal Briefs</SelectItem>
                    <SelectItem value="client-docs">Client Documents</SelectItem>
                    <SelectItem value="court">Court Documents</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="sort-by" className="text-sm font-medium">Sort By</label>
                <Select>
                  <SelectTrigger id="sort-by">
                    <SelectValue placeholder="Date Created (Newest)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date-newest">Date Created (Newest)</SelectItem>
                    <SelectItem value="date-oldest">Date Created (Oldest)</SelectItem>
                    <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    <SelectItem value="size">Size</SelectItem>
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
                      <label htmlFor="select-all" className="text-xs uppercase font-medium text-gray-500">Item Name</label>
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
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
                  { id: 1, name: 'Contract Clause 1.2', type: 'Text', size: '2 KB', location: 'Contracts/Agreements', created: '2025-05-01' },
                  { id: 2, name: 'Client Signature', type: 'Image', size: '45 KB', location: 'Client Documents', created: '2025-05-02' },
                  { id: 3, name: 'Fee Schedule', type: 'Table', size: '4 KB', location: 'Billing/Agreements', created: '2025-05-03' },
                  { id: 4, name: 'Reference Document', type: 'Attachment', size: '1.2 MB', location: 'Court Documents', created: '2025-05-04' },
                  { id: 5, name: 'Exhibit A', type: 'Attachment', size: '3.5 MB', location: 'Court Documents/Exhibits', created: '2025-05-05' },
                ].map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Checkbox id={`select-${item.id}`} />
                        <label htmlFor={`select-${item.id}`} className="text-sm font-medium text-gray-900">{item.name}</label>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{item.type}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{item.size}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{item.location}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.created}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
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
              Showing 5 of 28 document items
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

export default DocItems;
