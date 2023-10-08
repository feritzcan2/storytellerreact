// @mui
import Dialog from '@mui/material/Dialog';
// _mock
// assets
// components
// components
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import BasicPopover from '../PopOver';
// ----------------------------------------------------------------------

export default function HandDeliverFilesDialog({ customer, open, onClose }) {
  const renderFiles = (
    <div>
      <Label key={'info'} color={'info'} variant="soft" sx={{ mt: 1, mx: 1, mt: 10 }}>
        <Iconify icon={'jam:document'}></Iconify>
        <Typography sx={{ ml: 1 }} variant="h6">
          Yanınızda getirmeniz gerekenler
        </Typography>
      </Label>
      <Stack spacing={1} sx={{ pt: 1, pl: 1, pb: 0 }}>
        {customer?.files
          .filter((file) => !file?.requiredFileDetails?.uploadRequired)
          .map((file, index) => (
            <div key={`${index}_${file.name}`}>
              <Stack
                direction="row"
                alignItems="center"
                sx={{ color: 'text.main', typography: 'caption', ml: 0 }}
              >
                <Stack direction="row" alignItems="center">
                  <Iconify icon="fluent-mdl2:radio-bullet" width={10} sx={{}} />
                  <Typography sx={{ ml: 1 }} variant="subtitle2">
                    {file.requiredFileDetails?.fileName}
                  </Typography>
                </Stack>
                <BasicPopover
                  popoverText={file.requiredFileDetails.description}
                  helpLink={file.requiredFileDetails.helpLink}
                  iconSize={30}
                  cricleSize={30}
                />
              </Stack>
              <Divider sx={{ borderStyle: 'dashed' }} />
            </div>
          ))}
      </Stack>
    </div>
  );
  return (
    <Dialog onClose={() => {}} fullWidth open={open} PaperProps={{}}>
      <DialogContent> {renderFiles}</DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={onClose}>
          Kapat
        </Button>
      </DialogActions>
    </Dialog>
  );
}
