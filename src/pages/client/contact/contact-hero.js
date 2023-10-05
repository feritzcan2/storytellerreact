import { m } from 'framer-motion';
import PropTypes from 'prop-types';
//
import { MotionContainer, varFade } from 'src/components/animate';
import Iconify from 'src/components/iconify';

// import { bgGradient } from 'src/theme/css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// @mui
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import Logo from '../../../components/logo';

const imageBg = require('src/assets/Images/backgroud-red.jpg');
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
const sectionText = [
  {
    title: 'Country',
    details: 'Spain',
  },
  {
    title: 'Visa Type',
    details: 'Tourist',
  },
  {
    title: 'Status',
    details: 'Pending',
  },
  {
    title: 'Appointment Date',
    details: '12-2-2024',
  },
];
export default function ContactHero({ sectionText }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        // ...bgGradient({
        //   color: alpha('#d3d3d3', 0.1),
        //   imgUrl: { imageBg },
        // }),
        background: 'rgba(194,191,191,0.8)',
        // 'linear-gradient(90deg, rgba(25,31,40,0.4) 0%, rgba(25,31,40,0.1) 52%, rgba(194,191,191,0.8) 100%)',
        height: { md: 45, sx: 15 },
        py: { xs: 0, md: 0 },
        overflow: 'hidden',
        position: 'fixed',
        width: '100%',
        zIndex: 100,
      }}
      position={'sticky'}
    >
      <Container component={MotionContainer}>
        <Box
          sx={{
            bottom: { md: 0 },
            position: { md: 'absolute' },
            textAlign: { xs: 'center', md: 'center' },
          }}
        >
          {/* <TextAnimate text="Your" sx={{ color: 'primary.main' }} variants={varFade().inRight} /> */}
          <br />
          {/* 
          <Stack spacing={2} display="inline-flex" direction="row" sx={{ color: 'common.white' }}>
            <TextAnimate text="Visa" />
            <TextAnimate text="Application" />
          </Stack> */}

          <Stack
            spacing={{ xs: 2, md: 66 }}
            alignItems={{ xs: 'start', md: 'end' }}
            direction={{ xs: 'start', md: 'row' }}
            sx={{ mt: 1 }}
          >
            <Stack direction="row" sx={{ maxWidth: 350 }}>
              <m.div variants={varFade().in}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  color={'#000000'}
                  style={{
                    display: 'flex',
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Logo
                    disabledLink
                    sx={{
                      width: 24,
                      height: 24,
                      marginRight: 1,
                    }}
                    md={{
                      width: 34,
                      height: 34,
                      marginRight: 1,
                    }}
                  />
                  {sectionText?.name}
                </Typography>
              </m.div>
            </Stack>
            <Stack
              direction="row"
              spacing={{ xs: 2, md: 10 }}
              alignItems={{ xs: 'start', md: 'end' }}
              sx={{ mt: 1 }}
            >
              <Stack sx={{ maxWidth: 280 }}>
                <m.div variants={varFade().in}>
                  <Typography
                    variant="subtitle1"
                    color={'#000000'}
                    gutterBottom
                    style={{
                      display: 'flex',
                      textAlign: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Iconify
                      icon="line-md:email"
                      width={34}
                      height={34}
                      sx={{
                        color: theme.palette.success.dark,
                        marginRight: 1,
                        width: 24,
                        height: 24,
                      }}
                    />
                    {sectionText?.email}
                  </Typography>
                </m.div>
              </Stack>
              <Stack sx={{ maxWidth: 280 }}>
                <m.div variants={varFade().in}>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    color={'#000000'}
                    style={{
                      display: 'flex',
                      textAlign: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Iconify
                      icon="bi:phone"
                      width={34}
                      height={34}
                      sx={{
                        color: theme.palette.success.dark,
                        marginRight: 1,
                        width: 24,
                        height: 24,
                      }}
                    />
                    {sectionText?.contact}
                  </Typography>
                </m.div>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function TextAnimate({ text, variants, sx, ...other }) {
  return (
    <Box
      component={m.div}
      sx={{
        typography: 'h1',
        overflow: 'hidden',
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      {text.split('').map((letter, index) => (
        <m.span key={index} variants={variants || varFade().inUp}>
          {letter}
        </m.span>
      ))}
    </Box>
  );
}

TextAnimate.propTypes = {
  sx: PropTypes.object,
  text: PropTypes.string,
  variants: PropTypes.object,
};
