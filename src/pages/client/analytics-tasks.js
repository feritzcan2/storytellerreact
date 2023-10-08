import PropTypes from 'prop-types';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';

import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { _descriptions } from '../../_mock/assets';

// ----------------------------------------------------------------------

export default function AnalyticsTasks({ list = [0], ...other }) {
  // const [selected] = useState([1, 2]);

  return (
    <Card {...other}>
      <Label key={'info'} color={'info'} variant="soft" sx={{ mt: 1, mx: 1 }}>
        Status
      </Label>
      <Box padding={1} columnGap={1} rowGap={1} display="grid" gridTemplateColumns="repeat(2, 1fr)">
        {list.map((task, index) => (
          <TaskItem
            key={`${index}${task.order}`}
            task={task}
            // checked={list.includes(task.succeed)}
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

function TaskItem({ task }) {
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
          ...(!task.succeed && {
            color: 'text.disabled',
            textAlign: 'center',
            // textDecoration: 'line-through',
          }),
        }}
      >
        <Iconify
          icon="ei:check"
          sx={{
            color: task.succeed ? 'primary.main' : 'text.disabled',
            marginRight: 0.5,
          }}
        />
        <Typography
          variant="caption"
          color={task.succeed ? 'text.main' : 'text.disabled'}
          sx={{ m: 0, mx: 0, textAlign: 'center' }}
        >
          {task.description}
        </Typography>
      </Stack>
    </>
  );
}

TaskItem.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  task: PropTypes.object,
};
