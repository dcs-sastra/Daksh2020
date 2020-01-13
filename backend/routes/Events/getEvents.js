const express = require('express');
const router = express.Router();

const authenticate = (req, res, next) => {
  next()
}


router.get('/', authenticate, (req, res) => {
  res.json({
    message: "This is GET / request"
  })
})


module.exports = router;
