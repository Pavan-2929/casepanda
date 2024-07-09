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


export default function ModelChart({ modelLength }: { modelLength: any }) {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart data={modelLength}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#16A34A" barSize={80} />
      </BarChart>
    </ResponsiveContainer>
  );
}
