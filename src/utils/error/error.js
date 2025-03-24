export const asyncHandler = (fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch(error=>{
            return next(new Error(error,{cause:500}));
        })
    }
}

export const globalError = (err,req,res,next)=>{
    err.message = err.message || "something went wrong";
    err.status = err.status || 500;
    return res.status(err.status).json({message:err.message,stack:err.stack});
}   