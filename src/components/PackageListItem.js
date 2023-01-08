import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Checkbox,
  IconButton,
  ListItem, ListItemButton, ListItemText, ListItemIcon
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';

import TrackingLink from './TrackingLink';
import markAsDelivered from '../helpers/markAsDelivered';
import { formatToLongString, parseDateFromString } from '../helpers/dtHelpers';

export default function PackageListItem(props) {
  const navigate = useNavigate();

  const row = props.row;
  const id = row.id;
  const userID = props.uid;
  const kind = props.kind;

  function handleItemClick(event) {
    const elemType = event.target.tagName;
    if (elemType === 'A') {
      return;
    }
    console.log('handleItemClick', row, userID, kind, event);
    navigate(editURL);
  }

  function handleButtonClick(event) {
    console.log('handleButtonClick', row, userID, kind, event);
  }

  function handleCheckboxClick(event) {
    console.log('handleCheckboxClick', row, userID, kind, event);
    markAsDelivered(userID, kind, id, event.target.checked);
  }

  const editURL = `/edit/${kind}/${id}`;

  // Get the formatted date
  const dtExpected = parseDateFromString(row.dateExpected);
  const dtExpectedFormatted = formatToLongString(dtExpected);

  const myStyles = {};
  if (row.isOverdue) {
    myStyles['backgroundColor'] = '#ffebee';
  }
  if (row.isDueToday) {
    myStyles['backgroundColor'] = '#e3f2fd';
  }

  return (
    <ListItem
      sx={myStyles}
      key={row.id}
      secondaryAction={
        <IconButton edge="end" aria-label="edit" onClick={handleButtonClick}>
          <EditIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton role={undefined} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={row.delivered}
            tabIndex={-1}
            disableRipple
            onClick={handleCheckboxClick}
          />
        </ListItemIcon>
        <ListItemText
          onClick={handleItemClick}
          id={row.id}
          primary={row.from}
          secondary={
            <React.Fragment>
              <Box component="span" sx={{display: 'block'}}>
                {row.what}
              </Box>
              <Box component="span" sx={{display: 'block'}}>
                {dtExpectedFormatted}
              </Box>
              <TrackingLink row={row} />
            </React.Fragment>
          }
        />

      </ListItemButton>
    </ListItem>
  );
}
