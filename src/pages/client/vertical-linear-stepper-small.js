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
    label: 'Files are uploaded',
    description: ``,
  },
  {
    label: 'Payment is done',
    description: ``,
  },
  {
    label: 'Appointment date is found',
    description: ``,
  },
  {
    label: 'Appointment is made',
    description: ``,
  },
  
];
export default function VerticalLinearStepper({step}) {
  const [activeStep, setActiveStep] = useState(step || 0);

  return (
    <div style={{ marginTop: 15}}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
            >
              <Typography variant='caption' color={index < activeStep ? 'black': 'grey'} >{step.label}</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant='caption'>{step.description}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
