import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, hideLogo = false, sx, ...other }, ref) => {
  // const theme = useTheme();

  // If hideLogo is true, return nothing
  if (hideLogo) {
    return null;
  }

  // OR using local (public folder)
  // -------------------------------------------------------
  const logo = (
    <Box
      component="img"
      src="/assets/logo.svg" 
      sx={{ width: 50, height: 50, cursor: 'pointer', color: 'blue', ...sx }}
    />
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {null}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  hideLogo: PropTypes.bool, // Add new prop type for hideLogo
  sx: PropTypes.object,
};

export default Logo;
