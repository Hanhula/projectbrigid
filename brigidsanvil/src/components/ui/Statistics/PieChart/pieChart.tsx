import { selectWorld } from "@/components/store/apiSlice";
import { selectWorldArticlesByWorld } from "@/components/store/articlesSlice";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

export function PieChartComponent({ data }: { data: any[] }) {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  const colors = [
    "#e31a1a",
    "#6574c3",
    "#E68618",
    "#46A2CC",
    "#F9C80E",
    "#7effbe",
    "#DD7B38",
    "#7887AB",
    "#B492A2",
    "#4dfd5c",
    "#439D62",
    "#ce6cf5",
    "#ECEB93",
    "#8D8741",
    "#9BC53D",
    "#FA7A35",
    "#18A75E",
    "#acecff",
    "#C4A35A",
    "#00A68C",
    "#999390",
    "#F5D0C5",
    "#BB6373",
    "#bb52a3",
    "#ff79db",
    "#E1CDA5",
    "#94D0CC",
    "#D90429",
    "#12EAEA",
    "#FF9A8B",
  ];

  let testSize = isMobile ? 100 : 300;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        {" "}
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={testSize}
          fill="#8884d8"
          dataKey="value"
          label={({
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            value,
            index,
          }) => {
            const RADIAN = Math.PI / 180;
            const radius = 25 + innerRadius + (outerRadius - innerRadius);
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <text
                x={x}
                y={y}
                fill={colors[index % colors.length]}
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
              >
                {data[index].name} ({value})
              </text>
            );
          }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend verticalAlign="top" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
}
