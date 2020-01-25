const express = require('express');
const app = express.Router();
const Events = require('../../models/Events');

/**
 * @api_params /:id - Event Id to delete the event
*/

app.delete('/:id', async (req, res) => {
  try {
    const ret = await Events.findByIdAndDelete(req.params.id);
    if (ret === undefined || ret === null) {
      throw new Error("Event not found!")
    }
    res.status(201).json({
      ok: true,
      message: "Removed 1 entries",
      event: ret
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: "Something went wrong!",
      error: error.message
    });
  }

})


module.exports = app;
