import  CryptoJs  from "crypto-js";

export const encrypt = ({plainText="",SIGN=process.env.SIGNITURE}={}) => {
const encrypt = CryptoJs.AES.encrypt(plainText,SIGN ).toString();
return encrypt;
}