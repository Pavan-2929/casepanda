import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function MaterialChart({ materials }: { materials: any }) {
  return (
    <ResponsiveContainer width="90%" height={300}>
      <BarChart data={materials}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#16A34A" barSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
}
