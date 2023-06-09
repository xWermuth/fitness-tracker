import React from 'react';
import BaseNav from '../../components/nav/BaseNav';
import CustomStepper from '../../components/stepper/CustomStepper';
import { useStepper } from '../../hooks/useStepper';
import ErrorAlert from '../../components/alert/ErrorAlert';
import Startworkout from './startworkout';

const index: React.FC = () => {
  const { prev, next, activeStep } = useStepper(3);

  const _router = (activeStep: number) => {
    switch (activeStep) {
      case 0:
        return <Startworkout next={next} />;

      default:
        <ErrorAlert msg={`Unkown step: ${activeStep}`} />;
    }
  };

  return (
    <div className="w-full h-full">
      <BaseNav />

      <CustomStepper activeStep={activeStep} />
      <div className="w-full h-full">{_router(activeStep)}</div>
    </div>
  );
};

export default index;
