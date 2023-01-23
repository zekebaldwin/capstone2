const express = require("express");
const router = express.Router();
const db = require("../db.js");

router.get("/data", (req, res) => {
  db.query(
    "SELECT *, (success_rate::numeric * 100)::text||'%' AS success_rate, (cmp_pct::numeric)::text||'%' AS cmp_pct, (cpoe::numeric)::text||'%' AS cpoe, trunc((TD_pct::numeric * 100),2)::text||'%' AS TD_pct, trunc((int_pct::numeric * 100),2)::text||'%' AS INT_pct, trunc((bad_throw_pct::numeric * 100),2)::text||'%' AS bad_throw_pct, (TWP_pct::numeric)::text||'%' AS TWP_pct FROM qbstats ",
    (error, results) => {
      if (error) {
        throw error;
      }
      return res.status(200).json(results.rows);
    }
  );
});

module.exports = router;
