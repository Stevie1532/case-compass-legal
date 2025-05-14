
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from '@/components/layout/DashboardLayout';
import MemoForm from '@/components/memos/MemoForm';
import DocumentUnitsFolder from '@/components/memos/DocumentUnitsFolder';
import DocumentUnitsAssignment from '@/components/memos/DocumentUnitsAssignment';
import DocumentUnits from '@/components/memos/DocumentUnits';
import CircularForm from '@/components/memos/CircularForm';
import WordForm from '@/components/memos/WordForm';
import SpreadsheetForm from '@/components/memos/SpreadsheetForm';
import DocItems from '@/components/memos/DocItems';
import Subfolders from '@/components/memos/Subfolders';
import Folders from '@/components/memos/Folders';
import ItemsSubfoldersFolders from '@/components/memos/ItemsSubfoldersFolders';
import DocumentTemplate from '@/components/memos/DocumentTemplate';

const Memos = () => {
  const [activeTab, setActiveTab] = useState("memo-form");
  
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Memos Management</h1>
        <p className="text-gray-500">Create and manage memos and related documents</p>
      </div>
      
      <Tabs defaultValue="memo-form" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-1 mb-8">
          <TabsTrigger value="memo-form">Memo Form</TabsTrigger>
          <TabsTrigger value="document-units-folder">Document Units Folder</TabsTrigger>
          <TabsTrigger value="document-units-assignment">Document Units Assignment</TabsTrigger>
          <TabsTrigger value="document-units">Document Units</TabsTrigger>
          <TabsTrigger value="circular-form">Circular Form</TabsTrigger>
          <TabsTrigger value="word-form">Word Form</TabsTrigger>
          <TabsTrigger value="spreadsheet-form">Spreadsheet Form</TabsTrigger>
          <TabsTrigger value="doc-items">Doc Items</TabsTrigger>
          <TabsTrigger value="subfolders">Subfolders</TabsTrigger>
          <TabsTrigger value="folders">Folders</TabsTrigger>
          <TabsTrigger value="items-subfolders-folders">Items, Subfolders, Folders</TabsTrigger>
          <TabsTrigger value="document-template">Document Template</TabsTrigger>
        </TabsList>
        
        <TabsContent value="memo-form" className="space-y-4">
          <MemoForm />
        </TabsContent>
        
        <TabsContent value="document-units-folder" className="space-y-4">
          <DocumentUnitsFolder />
        </TabsContent>
        
        <TabsContent value="document-units-assignment" className="space-y-4">
          <DocumentUnitsAssignment />
        </TabsContent>
        
        <TabsContent value="document-units" className="space-y-4">
          <DocumentUnits />
        </TabsContent>
        
        <TabsContent value="circular-form" className="space-y-4">
          <CircularForm />
        </TabsContent>
        
        <TabsContent value="word-form" className="space-y-4">
          <WordForm />
        </TabsContent>
        
        <TabsContent value="spreadsheet-form" className="space-y-4">
          <SpreadsheetForm />
        </TabsContent>
        
        <TabsContent value="doc-items" className="space-y-4">
          <DocItems />
        </TabsContent>
        
        <TabsContent value="subfolders" className="space-y-4">
          <Subfolders />
        </TabsContent>
        
        <TabsContent value="folders" className="space-y-4">
          <Folders />
        </TabsContent>
        
        <TabsContent value="items-subfolders-folders" className="space-y-4">
          <ItemsSubfoldersFolders />
        </TabsContent>
        
        <TabsContent value="document-template" className="space-y-4">
          <DocumentTemplate />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Memos;
