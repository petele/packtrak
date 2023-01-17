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
import deletePackage from '../helpers/deletePackage';
import { getKnownShippers, getTrackingURL, guessShipper } from '../helpers/shipHelper';

class PackageEditor extends React.Component {
  constructor(props) {
    super(props);

    const pkgData = props.pkgData;

    this.state = {
      uid: props.uid,
      mode: props.mode,
      kind: props.kind,

      saveLabel: props.mode === 'add' ? 'Add' : 'Save',

      id: props.id,
      delivered: pkgData?.delivered || false,
      dateExpected: pkgData?.dateExpected || '',
      dateDelivered: pkgData?.dateDelivered || '',
      from: pkgData?.from || '',
      what: pkgData?.what || '',
      orderURL: pkgData?.orderURL || '',
      shipper:  pkgData?.shipper || null,
      trackingNumber: pkgData?.trackingNumber || '',

      trackingLinkEditDisabled: pkgData?.shipper !== 'Custom',
      errorOnSave: false,
      errorOnDelete: false,
      confirmDialogVisible: false,
    };

    if (props.pkgData?.trackingURL) {
      this.state.trackingURL = pkgData?.trackingURL;
    } else {
      const url = getTrackingURL(pkgData?.shipper, pkgData?.trackingNumber);
      this.state.trackingURL = url || '';
    }

    this.returnToIncoming = props.fnReturn;
    this.savePackage = props.fnSave;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleShipperChange = this.handleShipperChange.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);

    this.handleBlurShipper = this.handleBlurShipper.bind(this);
    this.handleBlurTrackingNumber = this.handleBlurTrackingNumber.bind(this);

    this.shipperOptions = getKnownShippers();
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
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
      delivered: this.state.delivered,
      dateExpected: this.state.dateExpected,
      dateDelivered: this.state.delivered ? this.state.dateDelivered : null,
      from: this.state.from,
      what: this.state.what,
      trackingNumber: this.state.trackingNumber,
      shipper: this.state.shipper,
      orderURL: this.state.orderURL,
    };
    if (this.state.shipper === 'Custom') {
      pkg.trackingURL = this.state.trackingURL;
    }

    return this.savePackage(this.props.uid, pkg)
      .then((id) => {
        this.returnToIncoming();
      }).catch((ex) => {
        this.setState({errorOnSave: true});
        console.log(ex);
      });
  }

  handleBlurTrackingNumber(event) {
    const trackingNumber = this.state.trackingNumber;
    const currentShipper = this.state.shipper;
    const maybeShipper = guessShipper(trackingNumber);
    console.log('blur', currentShipper, maybeShipper);
    if (maybeShipper && !currentShipper) {
      const val = {shipper: maybeShipper};
      const url = getTrackingURL(maybeShipper, trackingNumber);
      if (url) {
        val.trackingURL = url;
      }
      this.setState(val);
    }
  }

  handleBlurShipper(event) {
    // console.log('blur', 'shipper', event, this.state.shipper);
  }

  preventSubmitOnEnter(event) {
    if (event.key === 'Enter' && event.target.tagName === 'INPUT') {
      event.preventDefault();
      event.defaultMuiPrevented = true;
    }
  }

  render() {
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
            <Stack direction="row" spacing={2}>
              <TextField
                autoFocus={this.state.mode === 'add'}
                name="dateExpected"
                required
                label="Date Expected"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={this.state.dateExpected}
                onChange={this.handleInputChange}
                fullWidth={true}
              />
              {this.state.kind === 'delivered' && (
                <TextField
                  name="dateDelivered"
                  required
                  label="Date Delivered"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={this.state.dateDelivered}
                  onChange={this.handleInputChange}
                  fullWidth={true}
                />
              )}
            </Stack>
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
            <TextField
              name="trackingNumber"
              fullWidth
              label="Tracking Number"
              onBlur={this.handleBlurTrackingNumber}
              value={this.state.trackingNumber}
              onChange={this.handleInputChange}
            />
            <Autocomplete
              label="Shipper"
              autoSelect={true}
              value={this.state.shipper}
              options={this.shipperOptions}
              renderInput={(params) => <TextField {...params} label="Shipper" />}
              onBlur={this.handleBlurShipper}
              onChange={this.handleShipperChange}
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
              <Button
                type="button" variant="outlined"
                onClick={this.returnToIncoming}>Cancel</Button>
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
