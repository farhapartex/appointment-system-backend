const jwt = require("jsonwebtoken");

const authTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    try {
        //const token = authHeader && authHeader.split(' ')[1];
        let token = null;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.slice(7, authHeader.length)
        }
        if (token == null) return res.status(403).send({ message: 'Access denied. No token provided.' });

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).send({ message: 'Invalid token.' });
            };
            req.user = user;
            next();
        });

    } catch (err) {
        res.status(403).send({ message: 'Invalid token.' })
    }
}

module.exports = {
    authTokenMiddleware
}