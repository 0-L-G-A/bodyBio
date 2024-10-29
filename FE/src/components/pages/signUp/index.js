import Button from 'components/commonComponents/button';
import InputWithValidation from 'components/commonComponents/inputWithValidation';
import SelectWithValidation from 'components/commonComponents/selectWithValidation';
import { USER_ROLE_TYPES } from 'components/types/roles';
import { SEX_TYPES } from 'components/types/sex';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from 'store/actions/auth';

const SignUp = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector((state) => state.auth);
  const [repeatedPasword, setRepeatedPasword] = useState('');
  const [data, setData] = useState({
    name: '',
    surname: '',
    role: '',
    email: '',
    password: '',
    contactNumber: '',
    insuranceId: '',
    patientsIds: [],
    doctorsIds: [],
    adminsIds: [],
    trustPersonsIds: [],
    isAlive: true,
    sex: '',
  });

  useEffect(() => {
    console.log({ data, userData, error, loading });
  }, [data, userData, error, loading]);

  const validateInput = (value) => value.trim().length > 1;

  const validateSelect = (value) => value !== '';

  const handleSubmit = () => {
    dispatch(signUpUser(data));
  };

  return (
    <div className="max-w-screen-md mx-auto mt-10 flex flex-col align-center">
      <InputWithValidation
        label={t('COMMON.name')}
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
        placeholder={t('LOGIN.enterYour') + ' ' + t('COMMON.name')}
        validate={validateInput}
        errorMessage={t('LOGIN.fieldIsRequired')}
        tooltipText={t('LOGIN.lengthShouldBeLonger') + ' 2'}
      />

      <InputWithValidation
        label={t('COMMON.surname')}
        value={data.surname}
        onChange={(e) => setData({ ...data, surname: e.target.value })}
        placeholder={t('LOGIN.enterYour') + ' ' + t('COMMON.surname')}
        validate={validateInput}
        errorMessage={t('LOGIN.fieldIsRequired')}
        tooltipText={t('LOGIN.lengthShouldBeLonger') + ' 2'}
      />

      <InputWithValidation
        label={t('COMMON.email')}
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        placeholder={t('LOGIN.enterYour') + ' ' + t('COMMON.email')}
        validate={validateInput}
        errorMessage={t('LOGIN.fieldIsRequired')}
        tooltipText={t('LOGIN.lengthShouldBeLonger') + ' 2'}
      />

      <InputWithValidation
        label={t('COMMON.contactNumber')}
        value={data.contactNumber}
        onChange={(e) => setData({ ...data, contactNumber: e.target.value })}
        placeholder={t('LOGIN.enterYour') + ' ' + t('COMMON.contactNumber')}
        validate={validateInput}
        errorMessage={t('LOGIN.fieldIsRequired')}
        tooltipText={t('LOGIN.lengthShouldBeLonger') + ' 2'}
      />

      <InputWithValidation
        label={t('COMMON.password')}
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
        placeholder={t('LOGIN.create') + ' ' + t('COMMON.password')}
        validate={validateInput}
        errorMessage={t('LOGIN.fieldIsRequired')}
        tooltipText={t('LOGIN.lengthShouldBeLonger') + ' 2'}
      />

      <InputWithValidation
        label={t('COMMON.password')}
        value={repeatedPasword}
        onChange={(e) => setRepeatedPasword(e.target.value)}
        placeholder={t('LOGIN.repeat') + ' ' + t('COMMON.password')}
        validate={validateInput}
        errorMessage={t('LOGIN.fieldIsRequired')}
        tooltipText={t('LOGIN.lengthShouldBeLonger') + ' 2'}
      />

      <InputWithValidation
        label={t('COMMON.insuranceId')}
        value={data.password}
        onChange={(e) => setData({ ...data, insuranceId: e.target.value })}
        placeholder={t('LOGIN.enterYour') + ' ' + t('COMMON.insuranceId')}
        validate={validateInput}
        errorMessage={t('LOGIN.fieldIsRequired')}
        tooltipText={t('LOGIN.lengthShouldBeLonger') + ' 2'}
      />

      <InputWithValidation
        label={t('COMMON.insuranceId')}
        value={data.password}
        onChange={(e) => setData({ ...data, insuranceId: e.target.value })}
        placeholder={t('LOGIN.enterYour') + ' ' + t('COMMON.insuranceId')}
        validate={validateInput}
        errorMessage={t('LOGIN.fieldIsRequired')}
        tooltipText={t('LOGIN.lengthShouldBeLonger') + ' 2'}
      />

      <SelectWithValidation
        label={t('COMMON.role')}
        value={data.role}
        options={USER_ROLE_TYPES}
        onChange={(e) => setData({ ...data, role: e.target.value })}
        validate={validateSelect}
        errorMessage={t('LOGIN.fieldIsRequired')}
        tooltipText={t('LOGIN.selectYourRole')}
      />

      <SelectWithValidation
        label={t('COMMON.sex')}
        value={data.role}
        options={SEX_TYPES}
        onChange={(e) => setData({ ...data, sex: e.target.value })}
        validate={validateSelect}
        errorMessage={t('LOGIN.fieldIsRequired')}
      />

      <Button onClick={handleSubmit} type="submit" disabled={loading}>
        {t('NAVIGATION.logIn')}
      </Button>
    </div>
  );
};

export default SignUp;
