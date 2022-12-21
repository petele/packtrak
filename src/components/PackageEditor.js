import * as React from 'react';

import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel } from '@mui/material';
import { Button, Stack } from '@mui/material';

import getTrackingURL from './getTrackingURL';

class PackageEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.package?.id || 'new',
      saveLabel: props.package?.id ? 'Save' : 'Add',
      dateExpected: props.package?.dateExpected || '',
      from: props.package?.from || '',
      what: props.package?.what || '',
      orderLink: props.package?.orderLink || '',
      shipper: props.package?.shipper || '',
      trackingNumber: props.package?.trackingNumber || '',
      trackingLink: props.package?.trackingLink || '',
    };

    console.log('props', props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps, newProps) {
    console.log('did update', prevProps, newProps);
  }


  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    if (name === 'shipper' || name === 'trackingNumber') {
      this.updateTrackingURL(this.state.shipper, this.state.trackingNumber);
    }
  }

  updateTrackingURL(shipper, trackingNumber) {
    const url = getTrackingURL(shipper, trackingNumber);
    if (url) {
      this.setState({trackingLink: url});
    }
  }

  handleSubmit(event) {
    console.log('submit', this.state);
    event.preventDefault();
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
          name="orderLink"
          fullWidth
          id="pkg-order-link"
          label="Order Link"
          value={this.state.orderLink}
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
          name="trackingLink"
          fullWidth
          id="pkg-tracking-link"
          label="Tracking Link"
          value={this.state.trackingLink}
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
