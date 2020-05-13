import oneButtonAlert from '../components/alerts/OneButtonAlert';

export default function CheckError(error) {
  let alertTitle;
  let alertMessage;
  let alertBtnText;
  const networkRegex = /Network/;
  const unexpectedToken = /Unexpected/;

  if (error.message.match(networkRegex)) {
    alertTitle = 'Hata';
    alertMessage = 'Bilinmeyen bir ağ hatası oluştu.';
    alertBtnText = 'Yok Say';
    oneButtonAlert(alertTitle, alertMessage, alertBtnText);
  } else if (error.message.match(unexpectedToken)) {
    alertTitle = 'Hata';
    alertMessage = 'Sunucu ile alakali bir sorun olustu.';
    alertBtnText = 'Yok Say';
    oneButtonAlert(alertTitle, alertMessage, alertBtnText);
  } else {
    alertTitle = 'Hata';
    alertMessage = 'Hata oluştu.';
    alertBtnText = 'Yok Say';
    oneButtonAlert(alertTitle, alertMessage, alertBtnText);
  }
}
