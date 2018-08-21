const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
    // se nao chamar o next não avança para o controlador
    const authHeader = req.headers.authorization;
   
    if(!authHeader)
        return res.status(401).send({ error: 'No token provided' });

    const parts = authHeader.split(' ');

    if(!parts.length == 2)
        return res.status(401).send({ error: 'Token error' });

    const [ scheme, token ]  = parts;  
    // Bearer vvfsdfsd76f5sd78s8df65s8d7fs8d76fsdf;

    //se começa com Bearer  o i é case insensitive
    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({ error: 'Token malformado' });
    }


    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).send({ error: 'Token invalid' });
        /* decoded.id porque 
        no authController tem
        res.send({ user, 
        token: generateToken({ id: user.id}) });
        */
        req.userId = decoded.id;

        return next();
    });
};