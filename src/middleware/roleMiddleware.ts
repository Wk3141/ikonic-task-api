const roleMiddleware = function (roles:string[]) {
    return function (req:any, res:any, next:any) {
      try {
    
        const userRole = req.role;
        console.log(userRole,"....")
       
        if (!roles.includes(userRole)) {
        
          res.status(403).json({ message: 'Forbidden' });
        } else {
         next();
        }
      } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
      }
    };
  };
  
  module.exports = roleMiddleware;