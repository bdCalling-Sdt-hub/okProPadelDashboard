import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Props = {};
const data = [
  {
    name: "Jan",
   created : 4000,
    Played: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
   created : 3000,
    Played: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
   created : 2000,
    Played: 9800,
    amt: 2290,
  },
  {
    name: "Apr",
   created : 2780,
    Played: 3908,
    amt: 2000,
  },
  {
    name: "May",
   created : 1890,
    Played: 4800,
    amt: 2181,
  },
  {
    name: "Jun",
   created : 2390,
    Played: 3800,
    amt: 2500,
  },
  {
    name: "Jul",
   created : 3490,
    Played: 4300,
    amt: 2100,
  },
  {
    name: "Aug",
   created : 3490,
    Played: 4300,
    amt: 2100,
  },
  {
    name: "Sep",
   created : 3490,
    Played: 4300,
    amt: 2100,
  },
  {
    name: "Oct",
   created : 3490,
    Played: 4300,
    amt: 2100,
  },
  {
    name: "Nov",
   created : 3490,
    Played: 4300,
    amt: 2100,
  },
  {
    name: "Dec",
   created : 3490,
    Played: 4300,
    amt: 2100,
  },
];
const SellerActivityChart = (props: Props) => {
  const [opacity, setOpacity] = React.useState({
    created : 1,
    Played: 1,
  });

  const handleMouseEnter = (o) => {
    const { dataKey } = o;

    setOpacity((op) => ({ ...op, [dataKey]: 0.5 }));
  };

  const handleMouseLeave = (o) => {
    const { dataKey } = o;

    setOpacity((op) => ({ ...op, [dataKey]: 1 }));
  };

  return (
    <div style={{ width: "100%" }}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey='amt'/>
          <Tooltip />
          <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
          <Line
            type="monotone"
            dataKey="created"
            strokeOpacity={opacity.Sales}
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="Played"
            strokeOpacity={opacity.Played}
            stroke="#8884d8"
          />
        </LineChart>
      </ResponsiveContainer>
      {/* <p className="notes">Tips: Hover the legend!</p> */}
    </div>
  );
};

export default SellerActivityChart;
