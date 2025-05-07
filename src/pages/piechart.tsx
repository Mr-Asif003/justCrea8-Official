"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, Label, Tooltip } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Default Dummy Data
const defaultData = [
  { name: "Chrome", value: 400 },
  { name: "Safari", value: 300 },
  { name: "Firefox", value: 300 },
  { name: "Edge", value: 200 },
];

// Default Colors (Red, Green, Blue, Yellow)
const defaultColors = ["#EF4444", "#22C55E", "#3B82F6", "#FACC15"];

export function DonutChart({
  data = defaultData,
  colors = defaultColors,
  title = "Pie Chart - Donut with Text",
  description = "January - June 2024",
  valueKey = "value",
  nameKey = "name",
  innerRadius = 60,
  outerRadius = 100,
  totalLabel = "Visitors",
}) {
  const total = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + (curr[valueKey] || 0), 0);
  }, [data, valueKey]);

  return (
    <Card className="flex flex-col bg-black">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0 flex flex-col items-center">
        <div className="mx-auto aspect-square max-h-[250px]">
          <PieChart width={250} height={250}>
            <Pie
              data={data}
              dataKey={valueKey}
              nameKey={nameKey}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              strokeWidth={5}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
              <Label
                position="center"
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          {totalLabel}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* 👇 Legends Section */}
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="text-muted-foreground">{entry[nameKey]}</span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total {totalLabel} for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}

{/* <DonutChart
title="Sales by Region"
description="First Half 2025"
totalLabel="Sales"
data={[
  { name: "North", value: 500 },
  { name: "South", value: 300 },
  { name: "East", value: 200 },
  { name: "West", value: 400 },
]}
colors={["#F87171", "#34D399", "black", "#FBBF24"]}  // light red, green, blue, yellow
/> */}