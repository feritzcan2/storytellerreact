import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';

// ----------------------------------------------------------------------

const steps = [
  'Files are uploaded',
  'Payment is done',
  'Appointment date is found',
  'Appointment is made',
];

export default function LinearAlternativeLabel({ activeStep = 0 }) {
  return (
    <>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </>
  );
}
