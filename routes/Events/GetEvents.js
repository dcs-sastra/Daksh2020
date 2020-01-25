const express = require('express');
const router = express.Router();
const Event = require('../../models/Events');



router.get('/', async (req, res) => {
  try {
    const data = await Event.find({});
    res.status(200).json({
      ok: true,
      message: `${data.length} record(s) retrieved.`,
      events: data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: "Something went wrong! Please try again"
    })
  }

})


module.exports = router;
