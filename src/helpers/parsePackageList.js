

function compareDates(pkgA, pkgB) {
  return Date.parse(pkgA.dateExpected) - Date.parse(pkgB.dateExpected);
}

/**
 *
 * @param {object} pkgList Raw package list from server
 * @param {boolean} reverse Reverse list sort
 * @returns
 */
export default function parsePackageList(pkgList, reverse) {
  if (!pkgList) {
    return [];
  }
  if (typeof pkgList !== 'object') {
    return [];
  }
  const result = Object.keys(pkgList).map((key) => {
    const pkg = pkgList[key];
    pkg.id = key;
    return pkg;
  });

  result.sort(compareDates);
  if (reverse) {
    result.reverse();
  }

  return result;
}
