const express = require('express');
const router = express.Router();
const dataVirus = require('./../data/virus');

/* Obtiene el total de datos del virus. */
router.get('/', async (req, res) => {
    res.json(await dataVirus.getTotals());
});

module.exports = router;
