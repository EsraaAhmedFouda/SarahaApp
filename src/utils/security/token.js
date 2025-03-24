

export const generateToken = ({payload={},signature=process.env.TOKEN_SIGNITURE,options}={})=>{
    const token = jwt.sign({ payload }, signature,options)
    return token
}

export const verifyToken = ({token="",signature=process.env.TOKEN_SIGNITURE}={})=>{
    const sign = jwt.verify(token, signature)
    return sign
}