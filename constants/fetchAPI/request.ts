export default async function fetchMeSomeData(
  url: string,
  data = {},
  token: string,
  requestMethod: string,
  auth = true,
): Promise<{ responseOK: boolean; responseStatus: number; responseJSON: any}> {
  // Header
  const headerInitialObject = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  if (!auth) {
    delete headerInitialObject.Authorization;
  }
  const apiHeaders: Headers = new Headers(headerInitialObject);


  // Request
  const requestInitialObject: any = {
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
  const apiRequest: Request = new Request(url, requestInitialObject);


  // Fetch data from RestAPI
  const response: any = await fetch(apiRequest);
  const responseOK: boolean = response.ok;
  const responseStatus: number = response.status;
  const responseJSON: any = await response.json();

  // return JSON data
  return {
    responseOK,
    responseStatus,
    responseJSON,
  };
}
