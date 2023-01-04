import * as React from 'react';

import {
  Box,
  Button,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
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
    if (name === 'shipper') {
      this.setState(
        {trackingLinkEditDisabled: value !== 'Custom'}
      );
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
      from: this.state.from,
      what: this.state.what,
    };
    if (this.state.shipper) {
      pkg.shipper = this.state.shipper;
    }
    if (this.state.orderURL) {
      pkg.orderURL = this.state.orderURL;
    }
    if (this.state.trackingNumber) {
      pkg.trackingNumber = this.state.trackingNumber;
    }
    if (this.state.shipper === 'Custom' && this.state.trackingURL) {
      pkg.trackingURL = this.state.trackingURL;
    }

    return this.savePackage(pkg).then((id) => {
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
      <Box component="form" onSubmit={this.handleSubmit} sx={{ mt: 1 }}>

        <TextField
          placeholder=''
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
        <FormControl fullWidth margin="normal">
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
        <Stack direction="row" margin="normal" spacing={2}>
          <Button href="/incoming" variant='outlined'>Cancel</Button>
          {this.state.mode === 'edit' && (
            <Button type="button" variant='outlined' onClick={this.handleDelete}>
              Delete
            </Button>
          )}
          <Button type="submit" value="submit" variant='contained'>
            {this.state.saveLabel}
          </Button>
        </Stack>
      </Box>
    );
  }
}

export default PackageEditor;
