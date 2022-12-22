/**
 * Get a package from the database
 *
 * @param {string} id Package ID
 * @return {Promise<Object>} Package details
 */
export default async function getPackage(id) {
  const resp = await fetch(`/tempData/pack1234.json`);
  const asJSON = await resp.json();
  asJSON.id = id;
  return asJSON;
}
