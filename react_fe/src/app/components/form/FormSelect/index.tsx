import { Form, Select } from 'antd';
import { useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const WrapperFormItem = styled(Form.Item)`
  height: max-content;
  width: 100%;
  margin-bottom: 10px;

  .ant-input {
    min-height: 38px;
    border-radius: 4px;
  }

  .ant-form-item-label {
    font-size: 14px;
    overflow: unset;
    white-space: unset;
    .ant-form-item-no-colon {
      height: 100%;
    }
  }

  .select__menu {
    z-index: 10;
  }

  .select__control {
    border: ${({ validateStatus, theme }) =>
      validateStatus === 'error' ? `1px solid ${theme.error_ant} !important` : ''};
    box-shadow: ${({ validateStatus }) => (validateStatus === 'error' ? 'none' : '')};
  }

  .ant-form-item-children-icon {
    display: none;
  }

  .select__dropdown-indicator {
    color: hsl(0, 0%, 60%);
  }
`;

const WrapperLabel = styled.div`
  width: 100%;
  font-size: 13px;
`;

const FormSelect = ({
  t,
  label,
  name,
  rules,
  defaultValue = '',
  wrapperProps,
  options = [],
  ...rest
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {
  const { control } = useFormContext();
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name, control, rules, defaultValue });
  const [trans] = useTranslation('common');

  const opts = useMemo(() => {
    if (t) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return options.map((opt: any) => ({ ...opt, label: t(opt.label) }));
    }
    return options;
  }, [options, t]);

  return (
    <WrapperFormItem
      {...wrapperProps}
      label={label && <WrapperLabel>{label}</WrapperLabel>}
      validateStatus={error ? 'error' : ''}
      help={error?.message}>
      <div className="wiss">
        <Select
          type="select"
          placeholder={trans('select')}
          notFoundContent={() => trans('noOption')}
          value={value}
          onChange={onChange}
          {...rest}
          options={opts}
        />
      </div>
    </WrapperFormItem>
  );
};

export default FormSelect;
