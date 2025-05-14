
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FolderOpen, Plus, Search, Trash, Edit, FolderTree } from "lucide-react";

const Subfolders = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FolderOpen className="h-5 w-5" />
          <span>Subfolders</span>
        </CardTitle>
        <CardDescription>Manage document subfolders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search subfolders..." className="pl-10" />
            </div>
            <Button className="ml-2 flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>New Subfolder</span>
            </Button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="filter-parent-folder" className="text-sm font-medium">Filter by Parent Folder</label>
                <Select>
                  <SelectTrigger id="filter-parent-folder">
                    <SelectValue placeholder="All Parent Folders" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Parent Folders</SelectItem>
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
                    <SelectValue placeholder="Name (A-Z)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    <SelectItem value="date-newest">Date Created (Newest)</SelectItem>
                    <SelectItem value="date-oldest">Date Created (Oldest)</SelectItem>
                    <SelectItem value="items-count">Items Count</SelectItem>
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
                      <label htmlFor="select-all" className="text-xs uppercase font-medium text-gray-500">Subfolder Name</label>
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parent Folder
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created By
                  </th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { id: 1, name: 'Agreements', parent: 'Contracts', items: 23, created: '2025-05-01', createdBy: 'John Doe' },
                  { id: 2, name: 'Corporate', parent: 'Contracts', items: 15, created: '2025-05-02', createdBy: 'Jane Smith' },
                  { id: 3, name: 'Supreme Court', parent: 'Court Documents', items: 8, created: '2025-05-03', createdBy: 'Mark Johnson' },
                  { id: 4, name: 'Federal', parent: 'Court Documents', items: 12, created: '2025-05-04', createdBy: 'Sarah Williams' },
                  { id: 5, name: 'Individual', parent: 'Client Documents', items: 34, created: '2025-05-05', createdBy: 'Robert Brown' },
                ].map((folder) => (
                  <tr key={folder.id}>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Checkbox id={`select-${folder.id}`} />
                        <FolderTree className="h-4 w-4 text-gray-500" />
                        <label htmlFor={`select-${folder.id}`} className="text-sm font-medium text-gray-900">{folder.name}</label>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{folder.parent}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{folder.items}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {folder.created}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {folder.createdBy}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
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
              Showing 5 of 15 subfolders
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

export default Subfolders;
