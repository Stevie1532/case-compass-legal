
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Folder as FolderIcon, Plus, Search, Trash, Edit, FolderOpen } from "lucide-react";

const Folders = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FolderIcon className="h-5 w-5" />
          <span>Folders</span>
        </CardTitle>
        <CardDescription>Manage top-level document folders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search folders..." className="pl-10" />
            </div>
            <Button className="ml-2 flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>New Folder</span>
            </Button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="filter-category" className="text-sm font-medium">Filter by Category</label>
                <Select>
                  <SelectTrigger id="filter-category">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="legal">Legal</SelectItem>
                    <SelectItem value="admin">Administrative</SelectItem>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="finance">Financial</SelectItem>
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
                    <SelectItem value="items-count">Contents Count</SelectItem>
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
                      <label htmlFor="select-all" className="text-xs uppercase font-medium text-gray-500">Folder Name</label>
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subfolders
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
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
                  { id: 1, name: 'Contracts', category: 'Legal', subfolders: 5, items: 42, created: '2025-05-01' },
                  { id: 2, name: 'Court Documents', category: 'Legal', subfolders: 8, items: 67, created: '2025-05-02' },
                  { id: 3, name: 'Client Documents', category: 'Client', subfolders: 4, items: 78, created: '2025-05-03' },
                  { id: 4, name: 'Billing Records', category: 'Financial', subfolders: 3, items: 45, created: '2025-05-04' },
                  { id: 5, name: 'HR Documents', category: 'Administrative', subfolders: 2, items: 31, created: '2025-05-05' },
                ].map((folder) => (
                  <tr key={folder.id}>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Checkbox id={`select-${folder.id}`} />
                        <FolderOpen className="h-4 w-4 text-gray-500" />
                        <label htmlFor={`select-${folder.id}`} className="text-sm font-medium text-gray-900">{folder.name}</label>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{folder.category}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{folder.subfolders}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{folder.items}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {folder.created}
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
              Showing 5 of 12 folders
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

export default Folders;
