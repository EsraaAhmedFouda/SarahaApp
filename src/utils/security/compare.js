
import bcrypt from 'bcrypt';


export const compareHash = ({plainText="",hashValue=""}={})=>{
    const compare = bcrypt.compareSync(plainText,hashValue)
        return compare
}