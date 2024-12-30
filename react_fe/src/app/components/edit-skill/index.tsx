import { SaveOutlined } from '@ant-design/icons';
import { FormInput, FormSelect } from '@components/form';
import { Button } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';
import { MAJOR_CATEGORY, SKILL_CATEGORY, LEVEL_CATEGORY } from '@utils/constants';
import { useUser } from '@store/user/user.selector';
import Notification from '@components/notification';

import { WrapperStyled } from './styled';
import { useCallback, useEffect } from 'react';
const EditSkill = () => {
  const { onGetUserSkill, userSkill, onUpdateUserSkill } = useUser();
  const form = useForm<Types.IUpdateSkill>({
    defaultValues: {
      // major: userSkill?.major_category_id || '',
      // skill: userSkill?.skill || [],
      // level: userSkill?.level || '',
      // city: userSkill?.city,
      // years_exp: userSkill?.years_exp,
      major: '',
      skill: [],
      level: '',
      city: '',
      years_exp: 0,
    },
  });
  const { handleSubmit, setValue } = form;

  useEffect(() => {
    onGetUserSkill();
  }, []);
  const handleUpdateUserSkill = useCallback(
    (data: Types.IUpdateSkill) => {
      onUpdateUserSkill(data).then(() => {
        Notification.success("User's skills is updated");
      });
    },
    [form],
  );

  useEffect(() => {
    if (!userSkill) return;
    setValue('major', userSkill?.major_category_id);
    setValue('skill', userSkill?.skill);
    setValue('level', userSkill?.level);
    setValue('city', userSkill?.city);
    setValue('years_exp', userSkill?.years_exp);
  }, [userSkill]);

  return (
    <FormProvider {...form}>
      <WrapperStyled onSubmit={handleSubmit(handleUpdateUserSkill)}>
        <div className="header">
          <h2>Làm việc</h2>
          <div className="controller">
            <Button className="btn">Cancel</Button>
            <Button
              className="btn"
              htmlType="submit"
              type="primary"
              icon={<SaveOutlined />}>
              Save
            </Button>
          </div>
        </div>
        <section className="basic-info">
          <h2>Kinh nghiệm làm việc</h2>
          <div className="basic-info__container">
            <div className="row">
              <div className="field">
                <FormSelect
                  allowClear
                  label="Lĩnh vực"
                  name="major"
                  options={MAJOR_CATEGORY}
                  virtual={false}
                  placeholder="Tất cả ngành nghề"
                />
              </div>
              <div className="field">
                <FormInput
                  name="years_exp"
                  label="Kinh nghiệm (year)"
                  className="field"
                />
              </div>
            </div>
            <div className="row">
              <div className="field">
                <FormSelect
                  allowClear
                  mode="tags"
                  label="Kỹ năng"
                  name="skill"
                  options={SKILL_CATEGORY}
                  virtual={false}
                  placeholder=""
                />
              </div>
            </div>
            <div className="row">
              <div className="field">
                <FormInput
                  name="city"
                  label="Khu vực làm việc"
                  className="field"
                />
              </div>
              <div className="field">
                <FormSelect
                  name="level"
                  label="Trình độ"
                  options={LEVEL_CATEGORY}
                  className="field"
                />
              </div>
            </div>
          </div>
        </section>
      </WrapperStyled>
    </FormProvider>
  );
};

export default EditSkill;
