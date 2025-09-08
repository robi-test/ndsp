const express = require('express');
const router = express.Router();
//const organisation = req.session.data['organisation'];

router.post('/iteration0/choose-collection2', (req, res) => {
  const collection = req.session.data['collection'];
  const organisation = req.session.data['organisation'];
  const period = req.session.data['period'];
    console.log('Organisation selected:', organisation);

  if (collection === 'Diagnostic Imaging Dataset') {
    req.session.data['template'] = 'DID V2.0';
    res.redirect('/iteration0/choose-organisation2');
  } else if (collection === 'Diagnostics Waiting Times and Activity') {
    req.session.data['organisation'] = 'Sheffield Teaching Hospital NHS Foundation Trust';
    req.session.data['template'] = 'DWTA V1.4';
    res.redirect('/iteration0/upload-file2bis');
  } else {
    res.redirect('/iteration0/submit-collection-error');
  }
});

router.post('/iteration0/choose-organisation2', (req, res) => {
    res.redirect('/iteration0/choose-period2');
});
router.post('/iteration0/choose-organisation2bis', (req, res) => {
    res.redirect('/iteration0/upload-file2');
});
router.post('/iteration0/choose-period2', (req, res) => {
    res.redirect('/iteration0/upload-file2');
});

router.post('/iteration0/choose-period1', (req, res) => {
    res.redirect('/iteration0/upload-file1');
});

module.exports = router;





