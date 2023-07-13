import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Alert,
  Autocomplete,
  Box,
  Button,
  IconButton,
  Link,
  Stack,
  TextField,
} from '@mui/material';

import OpenInNew from '@mui/icons-material/OpenInNew';

import ConfirmDialog from './ConfirmDialog';
import deletePackage from '../helpers/deletePackage';
import { getKnownShippers, getTrackingURL, guessShipper } from '../helpers/shipHelper';
import { gaError, gaEvent } from '../helpers/gaHelper';

export default function PackageEditor(props) {
  const navigate = useNavigate();

  const id = props.id;
  const kind = props.kind;
  const pkgData = props.pkgData;
  const mode = pkgData ? 'edit' : 'add';
  const savePackage = props.fnSave;

  const [dateExpected, setDateExpected] = React.useState(pkgData?.dateExpected || '');
  const [dateDelivered, setDateDelivered] = React.useState(pkgData?.dateDelivered || '');
  const [pkgFrom, setPkgFrom] = React.useState(pkgData?.from || '');
  const [pkgWhat, setPkgWhat] = React.useState(pkgData?.what || '');
  const [orderURL, setOrderURL] = React.useState(pkgData?.orderURL || '');
  const [pkgShipper, setPkgShipper] = React.useState(pkgData?.shipper || null);
  const [trackingNumber, setTrackingNumber] = React.useState(pkgData?.trackingNumber || '');
  const [amzOrderID, setAmzOrderID] = React.useState(pkgData?.amzOrderID || '');

  const trackingURLTemp =
    pkgData?.trackingURL ||
    getTrackingURL(pkgData?.shipper, pkgData?.trackingNumber) ||
    '';
  const [trackingURL, setTrackingURL] = React.useState(trackingURLTemp);

  const [errorMessage, setErrorMessage] = React.useState(null);
  const [confirmDialogVisible, setConfirmDialogVisible] = React.useState(false);

  const isFromAmazon = pkgData?.from.toLowerCase() === 'amazon';
  const [amzOrderIDVisible, setAmzOrderIDVisible] = React.useState(isFromAmazon);

  // const [saveDisabled, setSaveDisabled] = React.useState(false);
  const saveDisabled = false;

  const saveButtonLabel = mode === 'edit' ? 'Save' : 'Add';
  const shipperOptions = getKnownShippers();

  /**
   * Returns a trimmed string, or null for empty strings.
   *
   * @param {string} val String value to trim
   * @return {?string}
   */
  function trimString(val) {
    if (val === null || val === undefined) {
      return null;
    }
    if (typeof val === 'string') {
      const result = val.trim();
      if (result === '') {
        return null;
      }
      return result;
    }
    return null;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage(null);

    const pkg = {
      dateExpected: trimString(dateExpected),
      dateDelivered: trimString(dateDelivered),
      from: trimString(pkgFrom),
      what: trimString(pkgWhat),
      trackingNumber: trimString(trackingNumber),
      shipper: trimString(pkgShipper),
      orderURL: trimString(orderURL),
    };
    const trimmedTrackingURL = trimString(trackingURL);
    if (pkg.shipper === 'Custom' && trimmedTrackingURL) {
      pkg.trackingURL = trimmedTrackingURL;
    }
    const trimmedOrderID = trimString(amzOrderID);
    if (pkg.from.toLowerCase() === 'amazon' && trimmedOrderID) {
      pkg.amzOrderID = trimmedOrderID;
    }

    return savePackage(pkg)
      .then((id) => {
        gaEvent(`${mode}_package`);
        return navigateBack();
      })
      .catch((ex) => {
        gaError(`${mode}_package_failed`, false, ex);
        const msg = `Unable to save package.`;
        setErrorMessage(msg);
      });
  }

  function preventSubmitOnEnter(event) {
    if (event.key === 'Enter' && event.target.tagName === 'INPUT') {
      event.preventDefault();
      event.defaultMuiPrevented = true;
    }
  }

  function navigateBack() {
    const backURL = mode === 'edit' ? `/${kind}` : -1;
    return navigate(backURL);
  }

  function handleDelete(event) {
    event.preventDefault();
    setConfirmDialogVisible(true);
  }

  function handleConfirmDelete(confirmed) {
    setConfirmDialogVisible(false);
    if (confirmed === false) {
      return;
    }
    deletePackage(kind, id)
      .then(() => {
        gaEvent('delete_package');
        return navigateBack();
      })
      .catch((ex) => {
        gaError('delete_package_failed', false, ex);
        const msg = `An error occured while trying to delete the package.`;
        setErrorMessage(msg);
      });
  }

  function recalcTrackingURL(ship, tNum) {
    if (ship === 'Custom') {
      return;
    }
    const url = getTrackingURL(ship, tNum) || '';
    setTrackingURL(url);
  }

  function dateExpectedChange(event) {
    const value = event.target.value;
    setDateExpected(value);
  }

  function dateDeliveredChange(event) {
    const value = event.target.value;
    setDateDelivered(value);
  }

  function pkgFromChange(event) {
    const value = event.target.value;
    setPkgFrom(value);
  }

  function pkgFromBlur(event) {
    const trimmed = event.target.value.trim();
    if (trimmed !== pkgFrom) {
      setPkgFrom(trimmed);
    }
    setAmzOrderIDVisible(trimmed.toLowerCase() === 'amazon');
  }

  function pkgWhatChange(event) {
    const value = event.target.value;
    setPkgWhat(value);
  }

  function pkgWhatBlur(event) {
    const trimmed = event.target.value.trim();
    if (trimmed !== pkgWhat) {
      setPkgWhat(trimmed);
    }
  }

  function orderURLChange(event) {
    const value = event.target.value.trim();
    setOrderURL(value);
  }

  function pkgShipperChange(event, value) {
    setPkgShipper(value);
    recalcTrackingURL(value, trackingNumber);
  }

  function trackingNumberChange(event) {
    const value = event.target.value.trim();
    setTrackingNumber(value);
  }

  function trackingNumberBlur() {
    const maybeShipper = guessShipper(trackingNumber);
    if (maybeShipper && !pkgShipper) {
      setPkgShipper(maybeShipper);
    }
    const shipper = maybeShipper || pkgShipper;
    recalcTrackingURL(shipper, trackingNumber);
  }

  function trackingURLChange(event) {
    const value = event.target.value.trim();
    setTrackingURL(value);
  }

  function amzOrderIDBlur(event) {
    const value = trimString(event.target.value);
    if (pkgFrom.toLowerCase() === 'amazon' && value) {
      const urlBase = `https://www.amazon.com/gp/your-account/order-details?orderID`
      setOrderURL(`${urlBase}=${value}`);
    }
  }

  function amzOrderIDChange(event) {
    const value = event.target.value;
    setAmzOrderID(value);
  }

  function clickTrackingLink() {
    gaEvent('open_link_tracking');
  }

  function clickOrderLink() {
    gaEvent('open_link_order');
  }

  return (
    <Box component="main" sx={{marginTop: 4}}>
      <ConfirmDialog
        open={confirmDialogVisible}
        callback={handleConfirmDelete}
        details="This will permanently delete this package from your list."
        label="Delete"
      />
      <Box component="form"
        onSubmit={handleSubmit}
        onKeyDown={preventSubmitOnEnter}
      >
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <TextField
              autoFocus={mode === 'add'}
              name="dateExpected"
              required
              label="Date Expected"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={dateExpected}
              onChange={dateExpectedChange}
              fullWidth
            />
            {kind === 'delivered' && (
              <TextField
                name="dateDelivered"
                required
                label="Date Delivered"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={dateDelivered}
                onChange={dateDeliveredChange}
                fullWidth
              />
            )}
          </Stack>
          <TextField
            name="from"
            required
            fullWidth
            label="From"
            value={pkgFrom}
            onBlur={pkgFromBlur}
            onChange={pkgFromChange}
          />
          <TextField
            name="what"
            required
            fullWidth
            label="What"
            value={pkgWhat}
            onBlur={pkgWhatBlur}
            onChange={pkgWhatChange}
          />
          {amzOrderIDVisible === true && (
            <TextField
              name="amzOrderNum"
              fullWidth
              label="Amazon Order ID"
              value={amzOrderID}
              onBlur={amzOrderIDBlur}
              onChange={amzOrderIDChange}
            />
          )}
          <TextField
            name="trackingNumber"
            fullWidth
            label="Tracking Number"
            value={trackingNumber}
            onBlur={trackingNumberBlur}
            onChange={trackingNumberChange}
          />
          <Autocomplete
            label="Shipper"
            autoSelect
            options={shipperOptions}
            renderInput={(params) => <TextField {...params} label="Shipper" />}
            value={pkgShipper}
            onChange={pkgShipperChange}
          />
          <Stack direction="row" spacing={2}>
            <TextField
              name="trackingURL"
              fullWidth
              type="url"
              inputMode="url"
              disabled={pkgShipper !== 'Custom'}
              label="Tracking URL"
              value={trackingURL}
              onChange={trackingURLChange}
            />
            <IconButton component={Link} onClick={clickTrackingLink} href={trackingURL} disabled={trackingURL === ''}  target="_blank" rel="noreferrer" aria-label="open tracking link in new window">
              <OpenInNew />
            </IconButton>
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField
              name="orderURL"
              type="url"
              inputMode="url"
              fullWidth
              label="Order URL"
              value={orderURL}
              onChange={orderURLChange}
            />
            <IconButton component={Link} onClick={clickOrderLink} href={orderURL} disabled={orderURL === ''} target="_blank" rel="noreferrer" aria-label="open order link in new window">
              <OpenInNew />
            </IconButton>
          </Stack>
          {errorMessage && (
            <Alert severity="error">
              {errorMessage}
            </Alert>
          )}
          <Stack direction="row" sx={{ mt: 2 }} justifyContent="flex-end" spacing={2}>
            <Button type="submit" value="submit" variant="contained" disabled={saveDisabled}>
              {saveButtonLabel}
            </Button>
            <Button
              type="button" variant="outlined"
              onClick={navigateBack}>
                Cancel
            </Button>
            {mode === 'edit' && (
              <Button
                type="button" variant="contained" color="error"
                onClick={handleDelete}>
                  Delete
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
