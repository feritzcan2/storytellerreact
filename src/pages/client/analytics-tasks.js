import PropTypes from 'prop-types';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';

import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

const steps = [
  {
    id: 1,
    name: 'Files are uploaded',
  },
  {
    id: 2,
    name: 'Payment is done',
  },
  {
    id: 3,
    name: 'Appointment date is found',
  },
  {
    id: 4,
    name: 'Appointment is made',
  },
];
export default function AnalyticsTasks({ list = [0], ...other }) {
  // const [selected] = useState([1, 2]);

  return (
    <Card {...other}>
      <Label key={'info'} color={'info'} variant="soft" sx={{ mt: 1, mx: 1 }}>
        Status
      </Label>
      <Box padding={1} columnGap={1} rowGap={1} display="grid" gridTemplateColumns="repeat(2, 1fr)">
        {steps.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            checked={list.includes(task.id)}
            // onChange={() => {}}
          />
        ))}
      </Box>
    </Card>
  );
}

AnalyticsTasks.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function TaskItem({ task, checked }) {
  return (
    <>
      <Stack
        direction="row"
        sx={{
          textAlign: 'center',
          alignItems: 'center',
          pl: 1,
          pr: 1,
          py: 0,
          '&:not(:last-of-type)': {
            borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
          },
          ...(!checked && {
            color: 'text.disabled',
            textAlign: 'center',
            // textDecoration: 'line-through',
          }),
        }}
      >
        <Iconify
          icon="ei:check"
          sx={{
            color: checked ? 'primary.main' : 'text.disabled',
            marginRight: 0.5,
          }}
        />
        <Typography
          variant="caption"
          color={checked ? 'text.main' : 'text.disabled'}
          sx={{ m: 0, mx: 0, textAlign: 'center' }}
        >
          {task.name}
        </Typography>
        {/* <FormControlLabel
          control={<Checkbox checked={checked} />}
          label={task.name}
          sx={{ flexGrow: 1, m: 0 }}
        /> */}
      </Stack>
    </>
  );
}

TaskItem.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  task: PropTypes.object,
};
