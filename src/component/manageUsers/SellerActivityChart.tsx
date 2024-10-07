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
   created : 40,
    Played: 24,
    amt: 24,
  },
  {
    name: "Feb",
   created : 30,
    Played: 13,
    amt: 22,
  },
  {
    name: "Mar",
   created : 20,
    Played: 98,
    amt: 22,
  },
  {
    name: "Apr",
   created : 27,
    Played: 39,
    amt: 20,
  },
  {
    name: "May",
   created : 18,
    Played: 48,
    amt: 21,
  },
  {
    name: "Jun",
   created : 23,
    Played: 38,
    amt: 25,
  },
  {
    name: "Jul",
   created : 34,
    Played: 43,
    amt: 10,
  },
  {
    name: "Aug",
   created : 34,
    Played: 43,
    amt: 20,
  },
  {
    name: "Sep",
   created : 34,
    Played: 43,
    amt: 40,
  },
  {
    name: "Oct",
   created : 34,
    Played: 43,
    amt: 60,
  },
  {
    name: "Nov",
   created : 34,
    Played: 43,
    amt: 80,
  },
  {
    name: "Dec",
   created : 34,
    Played: 43,
    amt: 100,
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
