import React from 'react';

function UserCard({ userData, setUserData, newCustomerBase }) {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');

  // const { name, ratingNumber, postedDate, content, avatarUrl } = testimonial;

  return (
    <Box
      sx={{
        py: { md: 10 },
        height: { md: 1 },
        overflow: 'scroll',
        scrollbarColor: 'red',
        hideScroll: true,
        overflowX: 'hidden',
        // ...(mdUp && {
        //   ...hideScroll.y,
        // }),
      }}
    >
      <Masonry spacing={3} columns={{ xs: 1, md: 2 }} sx={{ ml: 0 }}>
        {userData?.customers && (
          <FormDialog
            SelectedCustomerData={newCustomerBase}
            userData={userData}
            setUserData={setUserData}
            customerIndex={userData.customers.length}
          />
        )}
        {userData?.customers &&
          userData?.customers?.map((customer) => (
            <Stack
              spacing={3}
              sx={{
                ...bgBlur({
                  color: theme.palette.common.white,
                  opacity: 0.08,
                }),
                p: 3,
                borderRadius: 2,
                color: 'common.white',
                // ...sx,
                justifyContent: 'start',
                alignItems: 'start',
              }}
              // {...other}
            >
              <CardHeader title={`${customer.name} ${customer.surname}`} />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'start',
                  alignContent: 'start',
                  gap: '5px',
                  padding: 2,
                }}
              >
                <Iconify icon="ic:baseline-email" sx={{ color: 'primary.main' }} />
                <Typography variant="body2">{customer.email}</Typography>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  gap: '5px',
                }}
              >
                <Iconify icon="ic:outline-phone" sx={{ color: 'primary.main' }} />
                <Typography variant="body2">{customer.phone}</Typography>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'start',
                  alignItems: 'start',
                  alignContent: 'start',
                  gap: '5px',
                }}
              >
                {customer.files.map(
                  (file, index) =>
                    file?.fileName && (
                      <div key={index}>
                        <Iconify icon="ph:files" sx={{ color: 'primary.main' }} /> {file.fileName}{' '}
                      </div>
                    )
                )}
              </div>
            </Stack>
          ))}
      </Masonry>
    </Box>
  );
}

export default UserCard;
