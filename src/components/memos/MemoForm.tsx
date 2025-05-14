
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FilePlus, Users, Calendar } from "lucide-react";

const MemoForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FilePlus className="h-5 w-5" />
          <span>Create New Memo</span>
        </CardTitle>
        <CardDescription>Fill in the details to create a new memo</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="memo-title" className="text-sm font-medium">Memo Title</label>
              <Input id="memo-title" placeholder="Enter memo title" />
            </div>
            <div className="space-y-2">
              <label htmlFor="memo-ref" className="text-sm font-medium">Reference Number</label>
              <Input id="memo-ref" placeholder="REF-0001" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="memo-date" className="text-sm font-medium">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <Input id="memo-date" type="date" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="memo-from" className="text-sm font-medium">From</label>
              <div className="relative">
                <Users className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <Input id="memo-from" placeholder="Sender Name" className="pl-10" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="memo-to" className="text-sm font-medium">To</label>
            <Input id="memo-to" placeholder="Recipient(s)" />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="memo-subject" className="text-sm font-medium">Subject</label>
            <Input id="memo-subject" placeholder="Memo subject" />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="memo-content" className="text-sm font-medium">Content</label>
            <Textarea id="memo-content" placeholder="Enter memo content here..." rows={8} />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="memo-attachments" className="text-sm font-medium">Attachments</label>
            <Input id="memo-attachments" type="file" multiple />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button>Submit Memo</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MemoForm;
