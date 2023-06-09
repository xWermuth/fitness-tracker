import { useCallback, useState } from 'react';

export const useStepper = (numSteps: number) => {
  const [activeStep, setActiveStep] = useState(0);
  const next = useCallback(() => setActiveStep((prev) => (prev === numSteps ? prev : prev + 1)), [numSteps]);
  const prev = useCallback(() => setActiveStep((prev) => (prev === 0 ? prev : prev - 1)), []);

  return { next, prev, activeStep };
};
