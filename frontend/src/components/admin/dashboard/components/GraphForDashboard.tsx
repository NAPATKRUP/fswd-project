import { FC } from 'react';
import { Datum, ResponsiveLine } from '@nivo/line';

interface GraphforDashboardProps {
  data?: Datum[];
}

const GraphforDashboard: FC<GraphforDashboardProps> = ({ data }: GraphforDashboardProps) => {
  return data ? (
    <ResponsiveLine
      data={[
        {
          id: 'ยอดขายน้ำหอม',
          color: 'hsl(68, 70%, 50%)',
          data: data,
        },
      ]}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      pointSize={10}
      colors={{ scheme: 'dark2' }}
      enableGridX={false}
      enableGridY={false}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 10,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  ) : (
    <></>
  );
};

export default GraphforDashboard;
