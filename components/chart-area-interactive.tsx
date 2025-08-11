"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive area chart";

const chartData = [
  { date: "2024-06-01", enrollments: 100 },
  { date: "2024-06-02", enrollments: 120 },
  { date: "2024-06-03", enrollments: 150 },
  { date: "2024-06-04", enrollments: 130 },
  { date: "2024-06-05", enrollments: 170 },
  { date: "2024-06-06", enrollments: 200 },
  { date: "2024-06-07", enrollments: 220 },
  { date: "2024-06-08", enrollments: 250 },
  { date: "2024-06-09", enrollments: 300 },
  { date: "2024-06-10", enrollments: 280 },
  { date: "2024-06-11", enrollments: 320 },
  { date: "2024-06-12", enrollments: 350 },
  { date: "2024-06-13", enrollments: 370 },
  { date: "2024-06-14", enrollments: 400 },
  { date: "2024-06-15", enrollments: 450 },
  { date: "2024-06-16", enrollments: 480 },
  { date: "2024-06-17", enrollments: 500 },
  { date: "2024-06-18", enrollments: 550 },
  { date: "2024-06-19", enrollments: 600 },
  { date: "2024-06-20", enrollments: 650 },
  { date: "2024-06-21", enrollments: 700 },
  { date: "2024-06-22", enrollments: 750 },
  { date: "2024-06-23", enrollments: 800 },
  { date: "2024-06-24", enrollments: 850 },
  { date: "2024-06-25", enrollments: 900 },
  { date: "2024-06-26", enrollments: 950 },
  { date: "2024-06-27", enrollments: 1000 },
  { date: "2024-06-28", enrollments: 1050 },
  { date: "2024-06-29", enrollments: 1100 },
  { date: "2024-06-30", enrollments: 1200 },
];

const chartConfig = {
  enrollments: {
    label: "Enrollments",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface ChartAreaInteraciveProps {
  data: {
    date: string;
    enrollments: number;
  }[];
}

export function ChartAreaInteractive({ data }: ChartAreaInteraciveProps) {
  const totalEnrollmentsNumber = React.useMemo(
    () => data?.reduce((acc, curr) => acc + curr.enrollments, 0),
    [data]
  );

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Enrollment</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total Enrollment for the last 30 days: {totalEnrollmentsNumber}
          </span>
          <span className="@[540px]/card:hidden">last 30 days: {totalEnrollmentsNumber}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey={"date"}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={"preserveStartEnd"}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
              }
            />

            <Bar dataKey="enrollments" fill="var(--color-enrollments)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
