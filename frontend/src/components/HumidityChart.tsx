import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: any[];
}

export default function HumidityChart({ data }: Props) {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="fecha"
            tickFormatter={(value) =>
              new Date(value).toLocaleTimeString()
            }
          />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="humedad"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}