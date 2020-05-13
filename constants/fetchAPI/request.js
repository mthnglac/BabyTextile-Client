export default async function fetchMeSomeData(
  url,
  data = {},
  token = '',
  requestMethod = 'GET',
  auth = true,
) {
  // Header
  const headerInitialObject = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  if (!auth) {
    delete headerInitialObject.Authorization;
  }
  // eslint-disable-next-line no-undef
  const apiHeaders = new Headers(headerInitialObject);


  // Request
  const requestInitialObject = {
    method: requestMethod,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: apiHeaders,
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  };
  if (Object.entries(data).length === 0) {
    delete requestInitialObject.body;
  }
  // eslint-disable-next-line no-undef
  const apiRequest = new Request(url, requestInitialObject);


  // Fetch data from RestAPI
  const response = await fetch(apiRequest);
  const responseOK = response.ok;
  const responseStatus = response.status;
  const responseJSON = await response.json();

  // return JSON data
  return {
    responseOK,
    responseStatus,
    responseJSON,
  };
}
