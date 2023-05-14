
const jwt_auth = require("jsonwebtoken");
const Auth_JWT_SECRET = process.env.JWT_SECRET 

const authMiddleware = function(req :any, res:any, next:any) {
  try {

    const AUTH_HEADER_KEY = 'x-access-token';
    const token = req.headers[AUTH_HEADER_KEY];
    let decodedData;

    if (token) {
     
      decodedData = jwt_auth.verify(token, Auth_JWT_SECRET);
      req.userID= decodedData ? decodedData.id : null;
      req.role = decodedData ? decodedData.role : null;
    
    }
 

    next();
  } catch (error) {

    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
