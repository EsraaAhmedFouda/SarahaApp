import CryptoJs from "crypto-js";

export const decrypt = ({ sipherText = "", SIGN = process.env.SIGNITURE } = {}) => {
    const encrypt = CryptoJs.AES.decrypt(sipherText, SIGN).toString(CryptoJs.enc.UTf8);
    return encrypt;
}