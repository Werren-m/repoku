const {tokenVerifier} = require('../helpers/jwt');

const authentication = (req,res,next) => {
    const { token } = req.headers;
    if(!token){
        res.status(404).json({
            msg: "Token not found"
        })
    }else{
        try{
            const decode = tokenVerifier(token);
            req.userData = decode;
            next()
        }catch(err){
            res.status(400).json(err);
        }
    }
}

module.exports = {
    authentication
}