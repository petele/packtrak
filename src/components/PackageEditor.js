import * as React from 'react';

import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
} from '@mui/material';

import ConfirmDialog from './ConfirmDialog';
import LoadingSpinner from '../components/LoadingSpinner';
import getTrackingURL from '../helpers/getTrackingURL';
import deletePackage from '../helpers/deletePackage';

class PackageEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: props.mode,
      kind: props.kind,
      uid: props.uid,

      ready: props.mode === 'add' ? true : !!props.pkgData,
      saveLabel: props.mode === 'add' ? 'Add' : 'Save',
      backURL: `/${props.kind}`,

      id: props.id,
      dateExpected: '',
      from: '',
      what: '',
      orderURL: '',
      shipper:  null,
      trackingNumber: '',
      trackingURL: '',

      trackingLinkEditDisabled: true,
      errorOnSave: false,
      errorOnDelete: false,
      confirmDialogVisible: false,
    };

    this.returnToIncoming = props.fnReturn;
    this.savePackage = props.fnSave;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleShipperChange = this.handleShipperChange.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);

    this.shipperOptions = [
      'CDL', 'DHL', 'FedEx', 'LaserShip', 'TBA', 'UPS',
      'USPS', 'Custom',
    ];

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.pkgData === null && this.props.pkgData) {
      const pkgData = this.props.pkgData;
      const newState = {
        dateExpected: pkgData.dateExpected || '',
        from: pkgData.from || '',
        what: pkgData.what || '',
        orderURL: pkgData.orderURL || '',
        shipper: pkgData.shipper || null,
        trackingNumber: pkgData.trackingNumber || '',
        trackingLinkEditDisabled: true,
        ready: true,
      };
      if (pkgData.trackingURL) {
        newState.trackingURL = pkgData.trackingURL;
        newState.trackingLinkEditDisabled = false;
      } else if (pkgData.shipper === 'Custom') {
        newState.trackingLinkEditDisabled = false;
      } else {
        const url = getTrackingURL(pkgData.shipper, pkgData.trackingNumber);
        newState.trackingURL = url || '';
      }
      this.setState(newState);
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });

    if (name === 'trackingNumber') {
      this.updateTrackingURL(this.state.shipper, value);
    }
  }

  handleShipperChange(event, newVal) {
    const state = {
      shipper: newVal,
    };
    if (newVal === 'Custom') {
      state.trackingLinkEditDisabled = false;
      state.trackingURL = '';
    } else {
      state.trackingLinkEditDisabled = true;
    }
    this.setState(state);
    this.updateTrackingURL(newVal, this.state.trackingNumber);
  }

  updateTrackingURL(shipper, trackingNumber) {
    if (trackingNumber === '' || shipper === 'Custom') {
      return;
    }
    const url = getTrackingURL(shipper, trackingNumber);
    this.setState({trackingURL: url || ''});
  }

  handleDelete(event) {
    event.preventDefault();
    this.setState({confirmDialogVisible: true});
  }

  handleConfirmDelete(confirmed) {
    this.setState({confirmDialogVisible: false});
    if (confirmed === false) {
      return;
    }
    deletePackage(this.props.uid, this.props.kind, this.props.id)
      .then(() => {
        this.returnToIncoming();
      })
      .catch((ex) => {
        this.setState({errorOnDelete: true});
        console.log('Unable to delete', ex);
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({errorOnSave: false});

    const pkg = {
      dateExpected: this.state.dateExpected,
      from: this.state.from.trim(),
      what: this.state.what.trim(),
    };
    if (this.state.shipper) {
      pkg.shipper = this.state.shipper;
    }
    if (this.state.orderURL) {
      pkg.orderURL = this.state.orderURL.trim();
    }
    if (this.state.trackingNumber) {
      pkg.trackingNumber = this.state.trackingNumber.trim();
    }
    if (this.state.shipper === 'Custom' && this.state.trackingURL) {
      pkg.trackingURL = this.state.trackingURL.trim();
    }

    return this.savePackage(this.props.uid, pkg).then((id) => {
      this.returnToIncoming();
    }).catch((ex) => {
      this.setState({errorOnSave: true});
      console.log(ex);
    });
  }

  preventSubmitOnEnter(event) {
    if (event.key === 'Enter' && event.target.tagName === 'INPUT') {
      event.preventDefault();
      event.defaultMuiPrevented = true;
    }
  }

  render() {
    if (!this.state.ready) {
      return (
        <LoadingSpinner />
      );
    }

    return (
      <Box component="main" sx={{marginTop: 4}}>
        <ConfirmDialog
          open={this.state.confirmDialogVisible}
          callback={this.handleConfirmDelete}
          details="This will permanently delete this package from your list."
          label="Delete"
        />
        <Box component="form"
          onSubmit={this.handleSubmit}
          onKeyDown={this.preventSubmitOnEnter}
        >
          <Stack spacing={2}>
            <TextField
              name="dateExpected"
              required
              label="Date Expected"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.dateExpected}
              onChange={this.handleInputChange}
            />
            <TextField
              name="from"
              required
              fullWidth
              label="From"
              value={this.state.from}
              onChange={this.handleInputChange}
            />
            <TextField
              name="what"
              required
              fullWidth
              label="What"
              value={this.state.what}
              onChange={this.handleInputChange}
            />
            <Autocomplete
              label="Shipper"
              autoSelect={true}
              value={this.state.shipper}
              options={this.shipperOptions}

              renderInput={(params) => <TextField {...params} label="Shipper" />}
              onChange={this.handleShipperChange}
            />
            <TextField
              name="trackingNumber"
              fullWidth
              label="Tracking Number"
              value={this.state.trackingNumber}
              onChange={this.handleInputChange}
            />
            <TextField
              name="trackingURL"
              fullWidth
              type="url"
              inputMode="url"
              disabled={this.state.trackingLinkEditDisabled}
              label="Tracking URL"
              value={this.state.trackingURL}
              onChange={this.handleInputChange}
            />
            <TextField
              name="orderURL"
              type="url"
              inputMode="url"
              fullWidth
              label="Order URL"
              value={this.state.orderURL}
              onChange={this.handleInputChange}
            />
            {this.state.errorOnDelete && (
              <Alert severity="error">Sorry, something went wrong.</Alert>
            )}
            {this.state.errorOnSave && (
              <Alert severity="error">Sorry, something went wrong.</Alert>
            )}
            <Stack direction="row" sx={{ mt: 2 }} justifyContent="flex-end" spacing={2}>
              <Button type="submit" value="submit" variant="contained">
                {this.state.saveLabel}
              </Button>
              <Button href={this.state.backURL} variant="outlined">Cancel</Button>
              {this.state.mode === 'edit' && (
                <Button
                  type="button" variant="contained" color="error"
                  onClick={this.handleDelete}>Delete</Button>
              )}
            </Stack>
          </Stack>
        </Box>
      </Box>
    );
  }
}

export default PackageEditor;
