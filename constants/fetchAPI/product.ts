import fetchMeSomeData from './request';

export async function fetchAllProducts(address: string, token: string): Promise<any> {
  const { responseJSON }: any = await fetchMeSomeData(
    `${address}/products/`,
    '',
    token,
    'GET',
    true,
  );

  return responseJSON;
}

export async function fetchAllProductsByCategory(
  address: string, categoryName: string, token: string,
): Promise<any> {
  const { responseJSON }: any = await fetchMeSomeData(
    `${address}/products/?category__name=${categoryName}`,
    '',
    token,
    'GET',
    true,
  );

  return responseJSON;
}

export async function fetchAllProductFirstImages(address: string, token: string): Promise<any> {
  const { responseJSON }: any = await fetchMeSomeData(
    `${address}/product-images/get_first_images/`,
    '',
    token,
    'GET',
    true,
  );

  return responseJSON;
}
