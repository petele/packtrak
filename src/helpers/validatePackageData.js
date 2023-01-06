
const _regExDate = new RegExp(/20[2-9]\d-[0-1]\d-[0-3]\d/);
const _regExURL = new RegExp(/https?:\/\/.*/);

export default function validatePackageData(data) {
  let hasErrors = false;

  if (!_regExDate.test(data.dateExpected)) {
    hasErrors = true;
  }
  if (!isValidString(data.from)) {
    hasErrors = true;
  }
  if (!isValidString(data.what)) {
    hasErrors = true;
  }
  if (hasErrors) {
    return {valid: false, reason: 'Required fields missing or invalid.'};
  }

  if (data.orderURL && !_regExURL.test(data.orderURL)) {
    hasErrors = true;
  }
  if (data.trackingURL && !_regExURL.test(data.trackingURL)) {
    hasErrors = true;
  }
  if (hasErrors) {
    return {valid: false, reason: 'Invalid URL in URL field.'};
  }

  return {valid: true};
}

function isValidString(value) {
  if ((typeof value === 'string') && (value.length > 0)) {
    return true;
  }
  return false;
}
