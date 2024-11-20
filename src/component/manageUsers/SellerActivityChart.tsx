import React, { useMemo } from "react";
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
import { useChartDatasQuery } from "../../redux/features/getDashChartData";

type Props = {};

const SellerActivityChart = (props: Props) => {
  const [opacity, setOpacity] = React.useState({
    created: 1,
    played: 1,
  });

  const { data: chartData, isLoading, isError } = useChartDatasQuery();

  // Process the chart data
  const processedData = useMemo(() => {
    if (chartData?.success && Array.isArray(chartData.data)) {
      return chartData.data.map((item) => ({
        name: item.month, // Month names for the X-axis
        created: item.created, // Created communities
        played: item.played, // Played matches
      }));
    }
    return []; // Return empty array if data is invalid
  }, [chartData]);

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
      {isLoading ? (
        <p>Loading chart data...</p>
      ) : isError ? (
        <p>Error loading chart data.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            width={500}
            height={300}
            data={processedData}
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
            <Legend
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            <Line
              type="monotone"
              dataKey="created"
              strokeOpacity={opacity.created}
              stroke="#82ca9d"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="played"
              strokeOpacity={opacity.played}
              stroke="#8884d8"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default SellerActivityChart;
