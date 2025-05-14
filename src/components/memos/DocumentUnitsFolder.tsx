
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Folder, FolderOpen } from "lucide-react";

const DocumentUnitsFolder = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FolderOpen className="h-5 w-5" />
          <span>Document Units Folder Assignment</span>
        </CardTitle>
        <CardDescription>Assign document units to specific folders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="document-unit" className="text-sm font-medium">Document Unit</label>
              <Select>
                <SelectTrigger id="document-unit">
                  <SelectValue placeholder="Select document unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="doc-001">DOC-001: Contract Review</SelectItem>
                  <SelectItem value="doc-002">DOC-002: Legal Brief</SelectItem>
                  <SelectItem value="doc-003">DOC-003: Client Agreement</SelectItem>
                  <SelectItem value="doc-004">DOC-004: Court Filing</SelectItem>
                  <SelectItem value="doc-005">DOC-005: Internal Memo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="folder-selection" className="text-sm font-medium">Destination Folder</label>
              <Select>
                <SelectTrigger id="folder-selection">
                  <SelectValue placeholder="Select folder" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contracts">Contracts</SelectItem>
                  <SelectItem value="briefs">Legal Briefs</SelectItem>
                  <SelectItem value="client-docs">Client Documents</SelectItem>
                  <SelectItem value="court">Court Documents</SelectItem>
                  <SelectItem value="internal">Internal Documents</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="assignment-date" className="text-sm font-medium">Assignment Date</label>
              <Input id="assignment-date" type="date" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="assigned-by" className="text-sm font-medium">Assigned By</label>
              <Input id="assigned-by" placeholder="Enter name" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="assignment-notes" className="text-sm font-medium">Assignment Notes</label>
            <Input id="assignment-notes" placeholder="Add any notes regarding this assignment" />
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Folder className="h-4 w-4" />
              Current Assignments
            </h3>
            <div className="space-y-2">
              <div className="p-3 bg-white rounded border flex justify-between items-center">
                <div>
                  <p className="font-medium">DOC-002: Legal Brief</p>
                  <p className="text-sm text-gray-500">Assigned to: Legal Briefs</p>
                </div>
                <Button variant="outline" size="sm">Reassign</Button>
              </div>
              <div className="p-3 bg-white rounded border flex justify-between items-center">
                <div>
                  <p className="font-medium">DOC-001: Contract Review</p>
                  <p className="text-sm text-gray-500">Assigned to: Contracts</p>
                </div>
                <Button variant="outline" size="sm">Reassign</Button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline">Clear</Button>
            <Button>Assign to Folder</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentUnitsFolder;
