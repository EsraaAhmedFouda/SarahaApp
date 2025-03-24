import bcrypt from 'bcrypt';


export const hashing = ({plainText=""}={})=>{
    const hash = bcrypt.hashSync(plainText,parseInt(process.env.SALT))
    return hash
}