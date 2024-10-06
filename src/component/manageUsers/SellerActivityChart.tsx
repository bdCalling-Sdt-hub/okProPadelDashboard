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
    Sales: 4000,
    Purchages: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    Sales: 3000,
    Purchages: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    Sales: 2000,
    Purchages: 9800,
    amt: 2290,
  },
  {
    name: "Apr",
    Sales: 2780,
    Purchages: 3908,
    amt: 2000,
  },
  {
    name: "May",
    Sales: 1890,
    Purchages: 4800,
    amt: 2181,
  },
  {
    name: "Jun",
    Sales: 2390,
    Purchages: 3800,
    amt: 2500,
  },
  {
    name: "Jul",
    Sales: 3490,
    Purchages: 4300,
    amt: 2100,
  },
  {
    name: "Aug",
    Sales: 3490,
    Purchages: 4300,
    amt: 2100,
  },
  {
    name: "Sep",
    Sales: 3490,
    Purchages: 4300,
    amt: 2100,
  },
  {
    name: "Oct",
    Sales: 3490,
    Purchages: 4300,
    amt: 2100,
  },
  {
    name: "Nov",
    Sales: 3490,
    Purchages: 4300,
    amt: 2100,
  },
  {
    name: "Dec",
    Sales: 3490,
    Purchages: 4300,
    amt: 2100,
  },
];
const SellerActivityChart = (props: Props) => {
  const [opacity, setOpacity] = React.useState({
    Sales: 1,
    Purchages: 1,
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
          <YAxis />
          <Tooltip />
          <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
          <Line
            type="monotone"
            dataKey="Sales"
            strokeOpacity={opacity.Sales}
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="Purchages"
            strokeOpacity={opacity.Purchages}
            stroke="#8884d8"
          />
        </LineChart>
      </ResponsiveContainer>
      {/* <p className="notes">Tips: Hover the legend!</p> */}
    </div>
  );
};

export default SellerActivityChart;
