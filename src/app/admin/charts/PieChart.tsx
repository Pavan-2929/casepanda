import React, { useCallback, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#18181B", "#450A0A", "#172554"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function PieChartComponent({
  colorsLength,
}: {
  colorsLength: any;
}) {
  return (
    <PieChart width={300} height={300} className="">
      <Pie
        data={colorsLength}
        cx={150}
        cy={150}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={110}
        fill="#8884d8"
        dataKey="value"
      >
        {colorsLength.map((entry: any, index: any) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
