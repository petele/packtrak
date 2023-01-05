import * as React from 'react';

import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
} from '@mui/material';

import LoadingSpinner from '../components/LoadingSpinner';
import getTrackingURL from '../helpers/getTrackingURL';
import deletePackage from '../helpers/deletePackage';
import { formatToISODate } from '../helpers/dtHelpers';

class PackageEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: props.mode,
      kind: props.kind,
      uid: props.uid,

      ready: props.mode === 'add' ? true : !!props.pkgData,
      saveLabel: props.mode === 'add' ? 'Add' : 'Save',

      id: props.id,
      dateExpected: formatToISODate(new Date()),
      from: '',
      what: '',
      orderURL: '',
      shipper:  '',
      trackingNumber: '',
      trackingURL: '',

      trackingLinkEditDisabled: true,
    };

    this.returnToIncoming = props.fnReturn;
    this.savePackage = props.fnSave;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleShipperChange = this.handleShipperChange.bind(this);

    this.shipperOptions = [
      '', 'CDL', 'DHL', 'FedEx', 'LaserShip', 'TBA', 'UPS', 'USPS',
      'Unknown', 'Custom'
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
        shipper: pkgData.shipper || '',
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
    const was = this.state.shipper;
    console.log('shipper changed', was, newVal);
    const state = {
      shipper: newVal,
      trackingLinkEditDisabled: newVal !== 'Custom',
    };
    if (was !== 'Custom' && newVal === 'Custom') {
      state.trackingURL = '';
    }
    this.setState(state);
    this.updateTrackingURL(newVal, this.state.trackingNumber);
  }

  updateTrackingURL(shipper, trackingNumber) {
    const url = getTrackingURL(shipper, trackingNumber);
    if (shipper === 'Custom') {
      this.setState({trackingLinkEditDisabled: false});
      return;
    }
    this.setState({
      trackingURL: url || '',
      trackingLinkEditDisabled: true,
    });
    // console.log('updateTrackingURL', shipper, trackingNumber, url);
  }

  handleDelete(event) {
    event.preventDefault();
    const sure = window.confirm('Are you sure?');
    if (sure) {
      deletePackage(this.props.uid, this.props.kind, this.props.id)
        .then(() => {
          this.returnToIncoming();
        })
        .catch((ex) => {
          console.log('TODO: unable to delete', ex);
        });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

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
      alert(`TODO: '${this.state.mode}' ${this.state.id} failed`);
      console.log(ex);
    });
  }

  render() {
    if (!this.state.ready) {
      return (
        <LoadingSpinner />
      );
    }

    return (
      <Box component="form" onSubmit={this.handleSubmit}>
        <TextField
          margin="normal"
          name="dateExpected"
          required
          id="date-expected"
          label="Date Expected"
          type="date"
          value={this.state.dateExpected}
          onChange={this.handleInputChange}
        />
        <TextField
          margin="normal"
          name="from"
          required
          fullWidth
          id="pkg-from"
          label="From"
          value={this.state.from}
          onChange={this.handleInputChange}
        />
        <TextField
          name="what"
          margin="normal"
          required
          fullWidth
          id="pkg-what"
          label="What"
          value={this.state.what}
          onChange={this.handleInputChange}
        />
        <TextField
          name="orderURL"
          type="url"
          fullWidth
          margin="normal"
          id="pkg-order-url"
          label="Order URL"
          value={this.state.orderURL}
          onChange={this.handleInputChange}
        />
        <Autocomplete
          label="Shipper"
          value={this.state.shipper}
          options={this.shipperOptions}
          renderInput={(params) => <TextField {...params} label="Shipper" />}
          onChange={this.handleShipperChange}
        />
        <TextField
          name="trackingNumber"
          fullWidth
          margin="normal"
          id="pkg-tracking-number"
          label="Tracking Number"
          value={this.state.trackingNumber}
          onChange={this.handleInputChange}
        />
        <TextField
          name="trackingURL"
          fullWidth
          margin="normal"
          type="url"
          disabled={this.state.trackingLinkEditDisabled}
          id="pkg-tracking-url"
          label="Tracking URL"
          value={this.state.trackingURL}
          onChange={this.handleInputChange}
        />
        <Stack direction="row" sx={{ mt: 2 }} justifyContent="flex-end" spacing={2}>
          {this.state.mode === 'edit' && (
            <Button
              type="button" variant="contained" color="error"
              onClick={this.handleDelete}>Delete</Button>
          )}
          <Button href="/incoming" variant="outlined">Cancel</Button>
          <Button type="submit" value="submit" variant="contained">
            {this.state.saveLabel}
          </Button>
        </Stack>
      </Box>
    );
  }
}

export default PackageEditor;
