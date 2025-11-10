const express = require('express');
const router = express.Router();

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
router.post('/iteration0/choose-organisation3', (req, res) => {
    res.redirect('/iteration0/choose-period3');
});
router.post('/iteration0/choose-organisation3bis', (req, res) => {
    res.redirect('/iteration0/upload-file3');
});
router.post('/iteration0/choose-period2', (req, res) => {
    res.redirect('/iteration0/upload-file2');
});

router.post('/iteration0/choose-period1', (req, res) => {
    res.redirect('/iteration0/upload-file1');
});
router.post('/iteration0/choose-period3', (req, res) => {
    res.redirect('/iteration0/upload-file3');
});

router.post("/iteration1/permission-management/select-role", (req, res) => {
  const role = req.session.data.role;

  if (role === "local-admin") {
    res.redirect("/iteration1/permission-management/local-admin-message");
  } else if (role === "submitter") {
    res.redirect("/iteration1/permission-management/submitter-terms");
  } else {
    res.redirect("/iteration1/permission-management/select-role-error");
  }
});

router.post("/iteration1/permission-management/local-admin-message", (req, res) => {
  const continueChoice = req.session.data.continue;

  if (continueChoice === "yes") {
    res.redirect("/iteration1/permission-management/add-ig-contact");
  } else if (continueChoice === "no") {
    res.redirect("/iteration1/permission-management/home-no-permission");
  } else {
    res.redirect("/iteration1/permission-management/local-admin-message");
  }
});

router.post("/iteration1/permission-management/submitter-message", (req, res) => {
  const continueChoice = req.session.data.continue;

  if (continueChoice === "yes") {
    res.redirect("/iteration1/permission-management/add-ig-contact2");
  } else if (continueChoice === "no") {
    res.redirect("/iteration1/permission-management/home-no-permission");
  } else {
    res.redirect("/iteration1/permission-management/local-admin-message");
  }
});

router.post("/iteration1/permission-management/select-collection", (req, res) => {
  const collection = req.session.data.collections;

  // Check if a collection was selected
  if (collection) {
    // If collection is selected, go to next page
    res.redirect("/iteration1/permission-management/select-organisation");
  } else {
    // If no collection selected, show error page
    res.redirect("/iteration1/permission-management/select-collection-error");
  }
});
module.exports = router;
