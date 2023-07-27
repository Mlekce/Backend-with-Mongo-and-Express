function protectRoute(req, res, next) {
  if (!res.locals.isAuthenticated) {
    return res.status(401).redirect("/401");
  }
  next();
}

module.exports = protectRoute;
