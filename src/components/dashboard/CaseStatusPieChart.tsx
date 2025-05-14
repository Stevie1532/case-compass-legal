
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Open', value: 65 },
  { name: 'Pending', value: 25 },
  { name: 'Closed', value: 45 },
  { name: 'Archived', value: 20 },
];

const COLORS = ['#9b87f5', '#F97316', '#0EA5E9', '#D946EF'];

const config = {
  open: { label: "Open", theme: { light: "#9b87f5", dark: "#9b87f5" } },
  pending: { label: "Pending", theme: { light: "#F97316", dark: "#F97316" } },
  closed: { label: "Closed", theme: { light: "#0EA5E9", dark: "#0EA5E9" } },
  archived: { label: "Archived", theme: { light: "#D946EF", dark: "#D946EF" } },
};

const CaseStatusPieChart = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Case Status Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="aspect-square">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value} cases`, 'Count']}
                contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CaseStatusPieChart;
