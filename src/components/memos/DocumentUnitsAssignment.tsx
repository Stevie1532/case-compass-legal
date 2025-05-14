
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Users, Calendar } from "lucide-react";

const DocumentUnitsAssignment = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          <span>Document Units Assignment</span>
        </CardTitle>
        <CardDescription>Assign document units to team members</CardDescription>
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
              <label htmlFor="assignee" className="text-sm font-medium">Assign To</label>
              <Select>
                <SelectTrigger id="assignee">
                  <SelectValue placeholder="Select team member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john-doe">John Doe (Attorney)</SelectItem>
                  <SelectItem value="jane-smith">Jane Smith (Paralegal)</SelectItem>
                  <SelectItem value="mark-johnson">Mark Johnson (Legal Assistant)</SelectItem>
                  <SelectItem value="sarah-williams">Sarah Williams (Attorney)</SelectItem>
                  <SelectItem value="robert-brown">Robert Brown (Partner)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="priority" className="text-sm font-medium">Priority</label>
              <Select>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="due-date" className="text-sm font-medium">Due Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <Input id="due-date" type="date" className="pl-10" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="assignment-instructions" className="text-sm font-medium">Instructions</label>
            <Input id="assignment-instructions" placeholder="Enter special instructions for this assignment" />
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Current Assignments
            </h3>
            <div className="space-y-2">
              <div className="p-3 bg-white rounded border flex justify-between items-center">
                <div>
                  <p className="font-medium">DOC-003: Client Agreement</p>
                  <p className="text-sm text-gray-500">Assigned to: Jane Smith (Paralegal)</p>
                  <p className="text-xs text-gray-400">Due: 05/25/2025</p>
                </div>
                <Button variant="outline" size="sm">Reassign</Button>
              </div>
              <div className="p-3 bg-white rounded border flex justify-between items-center">
                <div>
                  <p className="font-medium">DOC-004: Court Filing</p>
                  <p className="text-sm text-gray-500">Assigned to: John Doe (Attorney)</p>
                  <p className="text-xs text-gray-400">Due: 05/16/2025</p>
                </div>
                <Button variant="outline" size="sm">Reassign</Button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline">Clear</Button>
            <Button>Assign Document</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentUnitsAssignment;
