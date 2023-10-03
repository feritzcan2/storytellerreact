import { useState } from 'react';

// @mui
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

const steps = [
  {
    label: 'Uploading',
    description: ``,
  },
  {
    label: 'Verifying',
    description: ``,
  },
  {
    label: 'Payment',
    description: ``,
  },
  {
    label: 'Appointments',
    description: ``,
  },
  {
    label: 'Complete',
    description: ``,
  },
  
];
export default function VerticalLinearStepper({step}) {
  const [activeStep, setActiveStep] = useState(step || 0);

  return (
    <>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={index === 4 ? <Typography variant="caption">Last step</Typography> : null}
            >
              <Typography variant='h5' color={index < activeStep ? 'white': 'grey'} >{step.label}</Typography>
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </>
  );
}
