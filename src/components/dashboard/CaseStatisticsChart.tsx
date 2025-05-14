
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Jan', civil: 20, criminal: 18, family: 12, corporate: 9 },
  { name: 'Feb', civil: 24, criminal: 16, family: 14, corporate: 12 },
  { name: 'Mar', civil: 27, criminal: 21, family: 15, corporate: 14 },
  { name: 'Apr', civil: 25, criminal: 19, family: 16, corporate: 15 },
  { name: 'May', civil: 29, criminal: 22, family: 17, corporate: 13 },
  { name: 'Jun', civil: 32, criminal: 20, family: 19, corporate: 16 },
];

const config = {
  civil: { label: "Civil Cases", theme: { light: "#9b87f5", dark: "#9b87f5" } },
  criminal: { label: "Criminal Cases", theme: { light: "#F97316", dark: "#F97316" } },
  family: { label: "Family Cases", theme: { light: "#0EA5E9", dark: "#0EA5E9" } },
  corporate: { label: "Corporate Cases", theme: { light: "#D946EF", dark: "#D946EF" } },
};

const CaseStatisticsChart = () => {
  return (
    <Card className="col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Case Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="aspect-[4/3]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="civil" fill="var(--color-civil)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="criminal" fill="var(--color-criminal)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="family" fill="var(--color-family)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="corporate" fill="var(--color-corporate)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-md">
        <div className="font-medium">{label}</div>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center gap-2 text-sm">
            <div 
              className="h-2 w-2 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span>{entry.name}: {entry.value} cases</span>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default CaseStatisticsChart;
