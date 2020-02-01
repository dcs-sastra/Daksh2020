const express = require('express')
const router = express.Router();
const Event = require('../../models/Events');
const toCsv = require('json2csv').parse;
const fs = require('fs');
const path = require('path')

const fields = ["title", "eventData", "poster", "description", "venue"]

router.get('/', async (req, res) => {
  try {
    const data = await Event.find({});
    console.log(data);
    const csv = toCsv(data, { fields });
    const fileName = new Date().toISOString();
    const filePath = path.join(global.appRoot, "public", "exports", "csv-" + fileName + ".csv")
    console.log(filePath)
    fs.writeFile(filePath, csv, (err) => {
      if (err) {
        throw new Error(err);
      }
      setTimeout(() => {
        fs.unlinkSync(filePath)
      }, 40000);
      const ret = `/exports/csv-${fileName}.csv`
      return res.status(201).download(filePath);
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      ok: false,
      error: err
    });
  }
})


module.exports = router;
