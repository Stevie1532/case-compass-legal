
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, FilePlus, Users } from "lucide-react";

const CircularForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FilePlus className="h-5 w-5" />
          <span>Circular Form</span>
        </CardTitle>
        <CardDescription>Create a circular for distribution to multiple recipients</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="circular-title" className="text-sm font-medium">Circular Title</label>
              <Input id="circular-title" placeholder="Enter circular title" />
            </div>
            <div className="space-y-2">
              <label htmlFor="circular-ref" className="text-sm font-medium">Reference Number</label>
              <Input id="circular-ref" placeholder="CIR-0001" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="circular-date" className="text-sm font-medium">Issue Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <Input id="circular-date" type="date" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="circular-from" className="text-sm font-medium">From</label>
              <div className="relative">
                <Users className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <Input id="circular-from" placeholder="Sender Department/Name" className="pl-10" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Distribution List</label>
            <div className="border rounded-md p-4 space-y-2">
              <div className="flex items-start space-x-2">
                <Checkbox id="all-departments" />
                <div className="grid gap-1.5 leading-none">
                  <label htmlFor="all-departments" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    All Departments
                  </label>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                {['Legal Department', 'Executive Office', 'Human Resources', 'Finance', 'Operations', 'IT Department', 'Administration', 'Marketing'].map((dept) => (
                  <div key={dept} className="flex items-start space-x-2">
                    <Checkbox id={`dept-${dept.toLowerCase().replace(/\s+/g, '-')}`} />
                    <div className="grid gap-1.5 leading-none">
                      <label htmlFor={`dept-${dept.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {dept}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="circular-subject" className="text-sm font-medium">Subject</label>
            <Input id="circular-subject" placeholder="Subject of the circular" />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="circular-content" className="text-sm font-medium">Content</label>
            <Textarea id="circular-content" placeholder="Enter circular content here..." rows={8} />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="circular-attachments" className="text-sm font-medium">Attachments</label>
            <Input id="circular-attachments" type="file" multiple />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <Checkbox id="require-acknowledgment" />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="require-acknowledgment" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Require Acknowledgment
                </label>
                <p className="text-sm text-gray-500">Recipients will be required to acknowledge receipt</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline">Save Draft</Button>
            <Button>Issue Circular</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CircularForm;
