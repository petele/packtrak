import * as React from 'react';

import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel } from '@mui/material';
import { Button, Stack } from '@mui/material';

import getTrackingURL from '../helpers/getTrackingURL';
import addPackage from '../helpers/addPackage';

class PackageEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      id: props.package?.id || 'new',
      dateExpected: props.package?.dateExpected || '',
      from: props.package?.from || '',
      what: props.package?.what || '',
      orderURL: props.package?.orderURL || '',
      shipper: props.package?.shipper || '',
      trackingNumber: props.package?.trackingNumber || '',
      trackingURL: props.package?.trackingURL || '',

      saveLabel: props.package?.id ? 'Save' : 'Add',
      trackingLinkEditDisabled: true,
    };

    // console.log('props', props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps, newProps) {
    // console.log('did update', prevProps, newProps);
  }


  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    // console.log('inputChange', name, value);
    this.setState({
      [name]: value
    });

    if (name === 'shipper') {
      this.setState(
        {trackingLinkEditDisabled: value !== 'Custom'}
      );
    }
    if (name === 'shipper' && value === 'TBD') {
      this.setState({
        trackingNumber: null,
        trackingURL: null,
      });
    }
    if (name === 'shipper' || name === 'trackingNumber') {
      const shipper = name === 'shipper' ? value : this.state.shipper;
      const number = name === 'trackingNumber' ? value : this.state.trackingNumber;
      this.updateTrackingURL(shipper, number);
    }
  }

  updateTrackingURL(shipper, trackingNumber) {
    const url = getTrackingURL(shipper, trackingNumber);
    if (url) {
      this.setState({trackingURL: url});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const pkg = {
      dateExpected: this.state.dateExpected,
      from: this.state.from,
      what: this.state.what,
      shipper: this.state.shipper,
    }
    if (this.state.orderURL.length > 0) {
      pkg.orderURL = this.state.orderURL;
    }
    if (this.state.trackingNumber.length > 0) {
      pkg.trackingNumber = this.state.trackingNumber;
    }
    if (this.state.shipper === 'custom' && this.state.trackingURL.length > 0) {
      pkg.trackingURL = this.state.trackingURL;
    }
    addPackage(pkg)
      .then((id) => {
        alert(`package ${id} added.`);
        // TODO: redirect to listing page.
      });
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          name="dateExpected"
          required
          id="date-expected"
          label="Date Expected"
          type="date"
          value={this.state.dateExpected}
          onChange={this.handleInputChange}
        />
        <TextField
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
          id="pkg-order-url"
          label="Order URL"
          value={this.state.orderURL}
          onChange={this.handleInputChange}
        />
        <FormControl fullWidth>
          <InputLabel id="select-shipper">Shipper</InputLabel>
          <Select
            name="shipper"
            id="select-shipper"
            label="Shipper"
            value={this.state.shipper}
            onChange={this.handleInputChange}
          >
            <MenuItem value="CDL">CDL</MenuItem>
            <MenuItem value="DHL">DHL</MenuItem>
            <MenuItem value="FedEx">FedEx</MenuItem>
            <MenuItem value="LaserShip">LaserShip</MenuItem>
            <MenuItem value="TBA">TBA</MenuItem>
            <MenuItem value="UPS">UPS</MenuItem>
            <MenuItem value="USPS">USPS</MenuItem>
            <MenuItem value="Unknown">Unknown</MenuItem>
            <MenuItem value="Custom">Custom</MenuItem>
          </Select>
        </FormControl>
        <TextField
          name="trackingNumber"
          fullWidth
          id="pkg-tracking-number"
          label="Tracking Number"
          value={this.state.trackingNumber}
          onChange={this.handleInputChange}
        />
        <TextField
          name="trackingURL"
          fullWidth
          type="url"
          disabled={this.state.trackingLinkEditDisabled}
          id="pkg-tracking-url"
          label="Tracking URL"
          value={this.state.trackingURL}
          onChange={this.handleInputChange}
        />
        <Stack direction="row" spacing={2}>
          <Button href="/incoming" variant='outlined'>Cancel</Button>
          <Button type="submit" value="submit" variant='contained'>
            {this.state.saveLabel}
          </Button>
        </Stack>
      </form>
    );
  }
}

export default PackageEditor;
