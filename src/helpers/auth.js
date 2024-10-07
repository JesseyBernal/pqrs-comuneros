
function isAuthenticated (req, res, next) {
  if(req.session.loggedin == true){
    return next();
  }
  res.redirect('/login')
}
export {isAuthenticated}