module.exports = (req, res, next) => {
  console.log(req.user)
  if (req.user.role == "Admin")
    next();
  else
    res.status(403).json({
      ok: false,
      error: "Access Denied"
    })
}
