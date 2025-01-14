import { CaretDownOutlined } from '@ant-design/icons';
import { Button, DatePicker, Space } from 'antd';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { CITY_PREDICT, JOB_PREDICT } from 'utils/constants';
import JobPostingsChart from './Chart';

import { WrapperStyled } from './styled';

import { usePredict } from '@store/predict/predict.selector';
import { TFunction } from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { FormSelect } from '@components/form';
import { yupResolver } from '@hookform/resolvers/yup';

interface IFormItem {
  job: string;
  city: string;
  future_periods?: number;
}

const scheme = (t: TFunction) =>
  yup.object().shape({
    job: yup
      .string()
      .trim()
      .required(
        t('error_message:validation.required', {
          key: t('common:validate.job'),
        }),
      ),
    city: yup
      .string()
      .trim()
      .required(
        t('error_message:validation.required', {
          key: t('common:validate.city'),
        }),
      ),
    future_periods: yup.number(),
  });

const JobOpportunity = () => {
  const { t } = useTranslation(['common']);
  const [isShowAll, setIsShowAll] = useState<boolean>(true);
  const form = useForm<IFormItem>({
    defaultValues: {
      future_periods: 12,
    },
    resolver: yupResolver(scheme(t)),
  });
  const { handleSubmit } = form;

  const [rangeMonth, setRangeMonth] = useState<number>(0);
  const {
    onGetPredictJobOpportunity,
    jobOpportunity,
    label,
    onGetHistoricalJobOpportunity,
    jobHistorical,
  } = usePredict();
  const handleGetPredict = useCallback(
    (values: IFormItem) => {
      const { job, city } = values;
      const payload: Types.IJobPredictRequest = { job, city };
      if (rangeMonth) payload.future_periods = rangeMonth;
      setIsShowAll(false);
      onGetPredictJobOpportunity(payload);
    },
    [rangeMonth],
  );

  useEffect(() => {
    onGetHistoricalJobOpportunity();
  }, []);

  const handleResetPredict = useCallback(() => {
    setIsShowAll(true);
    form.reset();
  }, []);

  const handleChangeRangeMonth = useCallback((dateString: string | string[]) => {
    if (!dateString) return;
    const startDate = moment('2025-01');
    const endDate = moment(dateString);

    const periods = endDate.diff(startDate, 'months', true) + 1;
    console.log(Math.round(periods));

    setRangeMonth(Math.round(periods));
  }, []);
  const generateDateList = useCallback(() => {
    const startDate = moment('2023-01', 'YYYY-MM');
    const list = jobOpportunity.map((num: number, index: number) => {
      return startDate.clone().add(index, 'months').format('YYYY-MM');
    });
    return list;
  }, [jobOpportunity]);

  return (
    <WrapperStyled>
      <h2 className="header">Job opportunity</h2>
      <div className="container">
        <FormProvider {...form}>
          <form
            className="toolbar"
            onSubmit={handleSubmit(handleGetPredict)}>
            <Space wrap>
              <FormSelect
                name="job"
                style={{ width: 220 }}
                options={JOB_PREDICT}
                suffixIcon={<CaretDownOutlined />}
                // onChange={(value: SetStateAction<string>) => setJob(value)}
                placeholder="Enter job to predict"
                allowClear
              />
              <FormSelect
                name="city"
                style={{ width: 220 }}
                options={CITY_PREDICT}
                suffixIcon={<CaretDownOutlined />}
                // onChange={(value: SetStateAction<string>) => setCity(value)}
                placeholder="Enter city to predict"
                allowClear
              />
              <div className="date_picker">
                <DatePicker
                  picker="month"
                  style={{ width: 120 }}
                  allowClear
                  inputReadOnly
                  disabledDate={(current) => {
                    return (
                      moment().add(-1, 'days') >= current || moment().add(12, 'month') <= current
                    );
                  }}
                  onChange={(date, dateString: string | string[]) =>
                    handleChangeRangeMonth(dateString)
                  }
                />
              </div>
            </Space>
            <div className="buttons">
              <Button onClick={() => handleResetPredict()}>Reset</Button>
              <Button
                type="primary"
                htmlType="submit">
                Predict
              </Button>
            </div>
          </form>
        </FormProvider>
        <div className="chart">
          {isShowAll ? (
            <JobPostingsChart data={jobHistorical} />
          ) : (
            <Line
              data={{
                labels: generateDateList(),
                datasets: [
                  {
                    label: form.getValues('job'),
                    data: jobOpportunity,
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
                    text: label,
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
        </div>
      </div>
    </WrapperStyled>
  );
};

export default JobOpportunity;
