import QRCode from "qrcode";

const generateQR = (url) => {
  return  QRCode.toDataURL(url)
}


export {generateQR};