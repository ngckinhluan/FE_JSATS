import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Iconify from 'src/components/iconify';

export default function UserTableToolbar({ numSelected, filterName, filterType, onFilterName, onFilterType, jewTypes }) {
  const handleNameChange = (event) => {
    onFilterName(event);
  };

  const handleTypeChange = (event) => {
    onFilterType(event);
  };

  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <>
          <OutlinedInput
            value={filterName}
            onChange={handleNameChange}
            placeholder="Search jewellery..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: 'text.disabled', width: 20, height: 20 }}
                />
              </InputAdornment>
            }
          />
          <Select
            value={filterType}
            onChange={handleTypeChange}
            displayEmpty
            sx={{ ml: 2, minWidth: 120 }}
          >
            <MenuItem value="">
              <em>All Types</em>
            </MenuItem>
            {jewTypes.map((type) => (
              <MenuItem key={type.jewelryTypeId} value={type.jewelryTypeId}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

UserTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  filterType: PropTypes.string,
  onFilterName: PropTypes.func,
  onFilterType: PropTypes.func,
  jewTypes: PropTypes.array.isRequired,
};