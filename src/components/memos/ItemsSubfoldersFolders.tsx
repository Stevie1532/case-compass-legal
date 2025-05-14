
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Folder, FolderOpen, FileText, Search, Plus } from "lucide-react";

const ItemsSubfoldersFolders = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Folder className="h-5 w-5" />
          <span>Items, Subfolders & Folders</span>
        </CardTitle>
        <CardDescription>Integrated management of all document organization elements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search across all items..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Add New..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="item">Add New Item</SelectItem>
                  <SelectItem value="subfolder">Add New Subfolder</SelectItem>
                  <SelectItem value="folder">Add New Folder</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Tabs defaultValue="hierarchy" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="hierarchy">Hierarchy View</TabsTrigger>
              <TabsTrigger value="combined">Combined List</TabsTrigger>
              <TabsTrigger value="tree">Tree View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="hierarchy" className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium">Document Hierarchy</h3>
                  <Button variant="outline" size="sm">Expand All</Button>
                </div>
                
                <div className="space-y-3">
                  {/* Folder 1 */}
                  <div className="border rounded-md bg-white overflow-hidden">
                    <div className="flex justify-between items-center p-3 bg-gray-50 border-b">
                      <div className="flex items-center gap-2">
                        <Folder className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">Contracts</span>
                        <span className="text-xs text-gray-500">(2 subfolders, 12 items)</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">Manage</Button>
                        <Button variant="outline" size="sm">Expand</Button>
                      </div>
                    </div>
                    
                    {/* Hidden content */}
                    <div className="hidden p-3">
                      {/* Subfolders and items would go here */}
                    </div>
                  </div>
                  
                  {/* Folder 2 - expanded */}
                  <div className="border rounded-md bg-white overflow-hidden">
                    <div className="flex justify-between items-center p-3 bg-gray-50 border-b">
                      <div className="flex items-center gap-2">
                        <FolderOpen className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">Court Documents</span>
                        <span className="text-xs text-gray-500">(3 subfolders, 18 items)</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">Manage</Button>
                        <Button variant="outline" size="sm">Collapse</Button>
                      </div>
                    </div>
                    
                    <div className="p-3">
                      {/* Subfolder 1 */}
                      <div className="ml-6 mt-2 border rounded-md bg-white overflow-hidden">
                        <div className="flex justify-between items-center p-2 bg-gray-50 border-b">
                          <div className="flex items-center gap-2">
                            <FolderOpen className="h-4 w-4 text-gray-500" />
                            <span className="font-medium text-sm">Supreme Court</span>
                            <span className="text-xs text-gray-500">(5 items)</span>
                          </div>
                          <Button variant="ghost" size="sm">Manage</Button>
                        </div>
                        <div className="p-2">
                          <div className="space-y-1">
                            {/* Items */}
                            {['Brief Draft.docx', 'Exhibit A.pdf', 'Case Notes.txt'].map((item, idx) => (
                              <div key={idx} className="flex items-center gap-2 p-1 hover:bg-gray-50 rounded">
                                <FileText className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">{item}</span>
                              </div>
                            ))}
                            <Button variant="ghost" size="sm" className="w-full justify-start text-gray-500">
                              <Plus className="h-3 w-3 mr-1" />
                              <span className="text-xs">Add item here</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Subfolder 2 */}
                      <div className="ml-6 mt-2 border rounded-md bg-white overflow-hidden">
                        <div className="flex justify-between items-center p-2 bg-gray-50 border-b">
                          <div className="flex items-center gap-2">
                            <Folder className="h-4 w-4 text-gray-500" />
                            <span className="font-medium text-sm">Federal</span>
                            <span className="text-xs text-gray-500">(7 items)</span>
                          </div>
                          <Button variant="ghost" size="sm">Manage</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional folders */}
                  {['Client Documents', 'Billing Records', 'HR Documents'].map((folder, idx) => (
                    <div key={idx} className="border rounded-md bg-white overflow-hidden">
                      <div className="flex justify-between items-center p-3 bg-gray-50 border-b">
                        <div className="flex items-center gap-2">
                          <Folder className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">{folder}</span>
                          <span className="text-xs text-gray-500">(multiple items)</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">Manage</Button>
                          <Button variant="outline" size="sm">Expand</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="combined" className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium">Combined Files & Folders</h3>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter By Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="folders">Folders Only</SelectItem>
                      <SelectItem value="subfolders">Subfolders Only</SelectItem>
                      <SelectItem value="items">Items Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="border rounded-md bg-white">
                  <div className="p-2 bg-gray-50 border-b grid grid-cols-5 gap-4 text-xs font-medium text-gray-500 uppercase">
                    <div className="col-span-2">Name</div>
                    <div>Type</div>
                    <div>Modified</div>
                    <div>Size</div>
                  </div>
                  
                  <div className="divide-y">
                    {[
                      { name: 'Contracts', type: 'Folder', modified: '2025-05-01', size: '-' },
                      { name: 'Court Documents', type: 'Folder', modified: '2025-05-02', size: '-' },
                      { name: 'Supreme Court', type: 'Subfolder', modified: '2025-05-03', size: '-' },
                      { name: 'Brief Draft.docx', type: 'Document', modified: '2025-05-04', size: '45 KB' },
                      { name: 'Exhibit A.pdf', type: 'Document', modified: '2025-05-05', size: '1.2 MB' },
                      { name: 'Client Documents', type: 'Folder', modified: '2025-05-06', size: '-' },
                      { name: 'Fee Schedule.xlsx', type: 'Spreadsheet', modified: '2025-05-07', size: '28 KB' },
                      { name: 'Federal', type: 'Subfolder', modified: '2025-05-08', size: '-' },
                    ].map((item, idx) => (
                      <div key={idx} className="p-3 grid grid-cols-5 gap-4 items-center hover:bg-gray-50">
                        <div className="col-span-2 flex items-center gap-2">
                          {item.type === 'Folder' && <Folder className="h-4 w-4 text-gray-500" />}
                          {item.type === 'Subfolder' && <FolderOpen className="h-4 w-4 text-gray-500" />}
                          {(item.type === 'Document' || item.type === 'Spreadsheet') && <FileText className="h-4 w-4 text-gray-500" />}
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                        <div className="text-sm text-gray-500">{item.type}</div>
                        <div className="text-sm text-gray-500">{item.modified}</div>
                        <div className="text-sm text-gray-500">{item.size}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-500">
                    Showing 8 of 120+ items
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="tree" className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium">Document Tree View</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Expand All</Button>
                    <Button variant="outline" size="sm">Collapse All</Button>
                  </div>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <div className="space-y-1">
                    {/* Top level folders with tree structure */}
                    <div className="flex items-center gap-2 p-1">
                      <Button variant="ghost" size="sm" className="w-6 h-6 p-0">+</Button>
                      <Folder className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Contracts</span>
                    </div>
                    
                    <div className="flex items-center gap-2 p-1">
                      <Button variant="ghost" size="sm" className="w-6 h-6 p-0">-</Button>
                      <FolderOpen className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Court Documents</span>
                    </div>
                    
                    {/* Subfolders */}
                    <div className="ml-8 flex items-center gap-2 p-1">
                      <Button variant="ghost" size="sm" className="w-6 h-6 p-0">-</Button>
                      <FolderOpen className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Supreme Court</span>
                    </div>
                    
                    {/* Items */}
                    <div className="ml-16 flex items-center gap-2 p-1 hover:bg-gray-50 rounded">
                      <span className="w-6"></span>
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Brief Draft.docx</span>
                    </div>
                    
                    <div className="ml-16 flex items-center gap-2 p-1 hover:bg-gray-50 rounded">
                      <span className="w-6"></span>
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Exhibit A.pdf</span>
                    </div>
                    
                    <div className="ml-16 flex items-center gap-2 p-1 hover:bg-gray-50 rounded">
                      <span className="w-6"></span>
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Case Notes.txt</span>
                    </div>
                    
                    {/* Subfolder collapsed */}
                    <div className="ml-8 flex items-center gap-2 p-1">
                      <Button variant="ghost" size="sm" className="w-6 h-6 p-0">+</Button>
                      <Folder className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Federal</span>
                    </div>
                    
                    {/* More folders */}
                    <div className="flex items-center gap-2 p-1">
                      <Button variant="ghost" size="sm" className="w-6 h-6 p-0">+</Button>
                      <Folder className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Client Documents</span>
                    </div>
                    
                    <div className="flex items-center gap-2 p-1">
                      <Button variant="ghost" size="sm" className="w-6 h-6 p-0">+</Button>
                      <Folder className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Billing Records</span>
                    </div>
                    
                    <div className="flex items-center gap-2 p-1">
                      <Button variant="ghost" size="sm" className="w-6 h-6 p-0">+</Button>
                      <Folder className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">HR Documents</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemsSubfoldersFolders;
