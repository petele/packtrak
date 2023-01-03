import * as React from 'react';

import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel } from '@mui/material';
import { Button, Stack } from '@mui/material';

import getTrackingURL from '../helpers/getTrackingURL';
import addPackage from '../helpers/addPackage';
import updatePackage from '../helpers/updatePackage';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { db } from '../helpers/fbHelper';
import { get, ref } from 'firebase/database';

const theme = createTheme();

class PackageEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: props.mode,
      kind: props.kind,
      uid: props.uid,

      id: props.id,
      dateExpected: '',
      from: '',
      what: '',
      orderURL: '',
      shipper:  '',
      trackingNumber: '',
      trackingURL: '',

      saveLabel: props.mode === 'add' ? 'Add' : 'Save',
      trackingLinkEditDisabled: true,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.state.mode === 'add') {
      return;
    }
    this.getPackage(this.state.kind, this.state.id);
  }

  async getPackage(kind, id) {
    const userID = window.localStorage.getItem('pktk_uid');
    const queryPath = `userData/${userID}/${kind}/${id}`;
    const query = ref(db, queryPath);
    const snapshot = await get(query);
    if (!snapshot.exists()) {
      console.log('no data');
      return;
    }
    const pkgObj = snapshot.val();
    pkgObj.beforeEdit = Object.assign({}, pkgObj);
    if (pkgObj.shipper === 'Custom') {
      pkgObj.trackingLinkEditDisabled = false;
    } else {
      pkgObj.trackingLinkEditDisabled = true;
      const shipper = pkgObj.shipper;
      const trackingNumber = pkgObj.trackingNumber;
      const url = getTrackingURL(shipper, trackingNumber);
      if (url) {
        pkgObj.trackingURL = url;
      }
    }
    this.setState(pkgObj);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    // console.log('inputChange', name, value);
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

    if (this.state.mode === 'add') {
      return addPackage(this.state.uid, pkg)
        .then((id) => {
          alert(`package ${id} added.`);
          // TODO: redirect to listing page.
        });
    }
    if (this.state.mode === 'edit') {
      const kind = this.state.kind;
      const id = this.state.id;
      const before = this.state.beforeEdit;
      return updatePackage(this.state.uid, kind, id, pkg, before)
        .then((success) => {
          alert(`success: ${success}`);
          // TODO: redirect
        });
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" onSubmit={this.handleSubmit} sx={{ mt: 1 }}>
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
              <Button type="submit" value="submit" variant='contained'>
                {this.state.saveLabel}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    );
  }
}

export default PackageEditor;
