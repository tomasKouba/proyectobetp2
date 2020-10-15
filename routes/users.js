let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Ejemplo de usuarios');
});

module.exports = router;
