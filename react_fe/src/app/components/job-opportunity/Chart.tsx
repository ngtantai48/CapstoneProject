import { Line } from 'react-chartjs-2';

interface Props {
  data: Types.IJobHistory;
}
const COLOR = ['#36a2eb', '#fa6384', '#4bc0c0'];
const JobPostingsChart = ({ data }: Props) => {
  const chartData = {
    labels: data.labels,
    datasets: data.data.map((cityData, index) => ({
      label: cityData.city,
      data: cityData.values,
      fill: false,
      borderColor: COLOR[index], // Function to get a random color
      tension: 0.1,
    })),
  };

  return (
    <Line
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Job Postings by Month',
          },
        },
      }}
    />
  );
};

export default JobPostingsChart;
