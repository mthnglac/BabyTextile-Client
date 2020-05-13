import fetchMeSomeData from './request';

export async function fetchAllProducts(address, token) {
  const { responseJSON } = await fetchMeSomeData(
    `${address}/products/`,
    '',
    token,
    'GET',
    true,
  );

  return responseJSON;
}

export async function fetchAllProductFirstImages(address, token) {
  const { responseJSON } = await fetchMeSomeData(
    `${address}/product-images/get_first_images/`,
    '',
    token,
    'GET',
    true,
  );

  return responseJSON;
}
