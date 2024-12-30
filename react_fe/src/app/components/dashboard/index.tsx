/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAnalyze } from '@store/analyze/analyze.selector';
import { useCallback, useEffect, useMemo } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { WrapperStyled } from './styled';
import 'chartjs-adapter-moment';
import moment from 'moment';
interface IUserData {
  month: string;
  total: number;
}
const Dashboard = () => {
  const { userAnalyze, onGetUserAnalyze, onGetCrawlAnalyze, crawlAnalyze } = useAnalyze();
  useEffect(() => {
    onGetUserAnalyze();
    onGetCrawlAnalyze();
  }, []);
  // Function to generate user views data
  const generateUserViews = useCallback(() => {
    const startDate = '2024-05-01';
    const endDate = moment();
    const userViews = [];
    const currentDate = moment(startDate);

    while (currentDate.isSameOrBefore(endDate)) {
      userViews.push({
        date: currentDate.format('YYYY-MM-DD'),
        views: Math.floor(Math.random() * (50 - 10 + 1)),
      });
      currentDate.add(1, 'days');
    }

    return userViews;
  }, []);
  // Sample user view data
  const userViews = useMemo(() => generateUserViews(), []);

  return (
    <WrapperStyled>
      <div className="figure-container">
        <div className="user-figure">
          {userAnalyze && (
            <Bar
              data={{
                labels: userAnalyze.map((i: IUserData) => i.month),
                datasets: [
                  {
                    label: `User`,
                    data: userAnalyze.map((i: IUserData) => i.total),
                    backgroundColor: '#9ad0f5',
                    borderColor: '#81c5f3',
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: true,
                    text: 'Thống kê lượng người dùng đăng ký mới',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          )}
          <p>
            Total:{' '}
            {userAnalyze.reduce((total: number, curr: IUserData) => (total += curr.total), 0)}
          </p>
        </div>
        <div className="user-figure">
          {crawlAnalyze && (
            <Bar
              data={{
                labels: crawlAnalyze.map((i: IUserData) => i.month),
                datasets: [
                  {
                    label: 'Crawl post',
                    data: crawlAnalyze.map((i: IUserData) => i.total),
                    backgroundColor: '#9ad0f5',
                    borderColor: '#81c5f3',
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: true,
                    text: 'Thống kê crawl data',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          )}
          <p>
            Total:{' '}
            {crawlAnalyze.reduce((total: number, curr: IUserData) => (total += curr.total), 0)}
          </p>
        </div>
      </div>
      <div className="view-figure">
        <Line
          data={{
            labels: userViews.map((item) => item.date),
            datasets: [
              {
                label: 'User Views',
                data: userViews.map((item) => item.views),
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1,
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: 'Thống kê lượt xem',
              },
            },
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'day',
                  tooltipFormat: 'yyyy-MM-dd',
                  displayFormats: {
                    day: 'yyyy-MM-dd',
                  },
                },
                title: {
                  display: true,
                  text: 'Date',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Number of Views',
                },
              },
            },
          }}
        />
      </div>
    </WrapperStyled>
  );
};

export default Dashboard;
