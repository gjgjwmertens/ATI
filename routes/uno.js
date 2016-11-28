/**
 * Created by G on 28-11-2016.
 */

let router = require('express').Router();

/* GET home page. */
router.get('/uno', function (req, res) {
   res.render('uno', {         // pass vars to the render template
      pageTitle: 'Uno',
      pageID: 'uno_interface'
   });
});

module.exports = router;