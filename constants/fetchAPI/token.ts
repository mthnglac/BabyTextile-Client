import oneButtonAlert from '../../components/alerts/OneButtonAlert';
import fetchMeSomeData from './request';

type ResponseType = {
  responseOK: boolean;
  responseStatus: number;
  responseJSON: any;
}

export default async function fetchJSONWebTokens(
  address = '',
  data = {},
): Promise<{ accessToken: string; refreshToken: string }> {
  // initial variables
  let alertTitle;
  let alertMessage;
  let alertBtnText;

  const { responseOK, responseStatus, responseJSON }: ResponseType = await fetchMeSomeData(
    `${address}/auth/jwt/create/`,
    data,
    '',
    'POST',
    false,
  );

  // exception for username & password
  if (!responseOK) {
    if (responseStatus === 401) {
      alertTitle = 'Yanlış Kullanıcı Adı ya da Şifre';
      alertMessage = 'Girdiğin kullanıcı adı veya şifre hatalı. Lütfen bilgileri kontrol edip tekrar dene.';
      alertBtnText = 'Tekrar Dene';
      oneButtonAlert(alertTitle, alertMessage, alertBtnText);
    } else {
      alertTitle = 'Hata';
      alertMessage = 'Kullanici adi ya da sifre giriniz.';
      alertBtnText = 'Tekrar Dene';
      oneButtonAlert(alertTitle, alertMessage, alertBtnText);
    }
  }

  // defining access&refresh tokens
  const accessToken: string = responseJSON.access;
  const refreshToken: string = responseJSON.refresh;

  return { accessToken, refreshToken };
}
