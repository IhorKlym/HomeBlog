// @flow

import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';

import ScreenPage from 'components/ScreenPage';
import Logo from 'components/Logo';
import { parseStrBoolean } from 'helpers/methods';
import { IconBack } from 'styles/icons';

import stores from 'core/stores';
import store from './stepper.store';

import CredentialsForm from './components/CredentialsForm';
import AccountTypeForm from './components/AccountTypeForm';
import NameForm from './components/NameForm';
import LocationForm from './components/LocationForm';
import ProfilePictureForm from './components/ProfilePictureForm';
import BioForm from './components/BioForm';
import ThemeSettingsForm from './components/ThemeSettingsForm';
import InterestsTopicForm from './components/InterestsTopicForm';
import MutedTopicForm from './components/MutedTopicForm';
import PrivacySettingsForm from './components/PrivacySettingsForm';

import * as S from './styles';

const { LANDING_MODE_ENABLED } = process.env;

const stepper = [
  {
    StepComponent: CredentialsForm,
    optional: false,
    checkIsCompleted : (user: any) => !!user
  },
  {
    StepComponent: AccountTypeForm,
    optional: false,
    checkIsCompleted : (user: any) => !!user.profileType
  },
  {
    StepComponent: NameForm,
    optional: false,
    checkIsCompleted : (user: any) => (user.profileType === 'business' ? !!user.businessName : (user.firstName && user.lastName))
  },
  {
    StepComponent: LocationForm,
    optional: false,
    checkIsCompleted : (user: any) => !!user.location
  },
  {
    StepComponent: ProfilePictureForm,
    optional: true,
    checkIsCompleted : (user: any) => !!user.avatarUrl
  },
  {
    StepComponent: BioForm,
    optional: true,
    checkIsCompleted : (user: any) => !!user.bio
  },
  {
    StepComponent: ThemeSettingsForm,
    optional: false,
    checkIsCompleted : (user: any) => (user.skin && user.skin.id)
  },
  {
    StepComponent: InterestsTopicForm,
    optional: true,
    checkIsCompleted : (user: any) => (user.tagList && user.tagList.length)
  },
  ...(parseStrBoolean(LANDING_MODE_ENABLED) ? [] : [{
    StepComponent: MutedTopicForm,
    optional: true,
    checkIsCompleted : (user: any) => (user.antogonistTagList && user.antogonistTagList.length)
  }]),
  {
    StepComponent: PrivacySettingsForm,
    optional: false,
    checkIsCompleted : (user: any) => !!user.visibility
  }
];
const lastStepIdx = (stepper.length - 1);

const SignUpScreen = () => {
  const { sessionStore: { currentUser, setCurrentUser, logOutUser } } = stores;
  const [theme, setTheme] = useState(null);
  const history = useHistory();
  const { step } = useParams();

  const stepIdx = (step && (step === 'last' ? lastStepIdx : parseInt(step, 10))) || 0;
  const { StepComponent } = stepper[stepIdx] || stepper[lastStepIdx];

  const toNextStep = async (savedData?: any) => {
    const nextStep = stepIdx + 1;
    if (nextStep > lastStepIdx) {
      const user = savedData || currentUser;
      const data = await store.completeStep({ ...user, state: 'active' });
      if (!data) return;
      setCurrentUser(data);
      history.push('/sign-up/success');
    } else {
      history.push(`/sign-up/${nextStep}`);
    }
  };

  const goBack = () => {
    if (!stepIdx) {
      history.goBack();
    } else if (stepIdx === 1) {
      logOutUser();
    } else {
      history.replace(`/sign-up/${stepIdx - 1}`);
    }
  };

  useEffect(() => {
    const accessibleStep = store.getAccessibleStep(stepper, currentUser);
    if (accessibleStep < stepIdx) history.replace(`/sign-up/${accessibleStep}`);
  }, [currentUser, stepIdx]);

  return (
    <ScreenPage withTopBar
      progress={(stepIdx + 1) * 100 / (stepper.length + 1)}
      theme={theme}
    >

      <S.Toolbar>
        <S.BackButton onClick={goBack}>
          <IconBack /> Back
        </S.BackButton>
        <Logo />
      </S.Toolbar>

      <S.StepWrap>
        <StepComponent
          toNextStep={toNextStep}
          setTheme={setTheme}
        />
      </S.StepWrap>
    </ScreenPage>
  );
};

export default observer(SignUpScreen);
