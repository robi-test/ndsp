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

router.post('/iteration1/data-submission/choose-period', (req, res) => {
  // Store the period data in session
  req.session.data['period'] = req.session.data['period'];


  // Redirect back to the details page
  res.redirect("/iteration1/data-submission/upload-file1");
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
router.post('/iteration1/data-submission/choose-period', (req, res) => {
    res.redirect('/iteration1/data-submission/upload-file1');
});

router.post("/iteration1/permission-management/existing-local-admin/select-role", (req, res) => {
  const role = req.session.data.role;

  if (role === "local-admin") {
    res.redirect("/iteration1/permission-management/existing-local-admin/local-admin-message");
  } else if (role === "submitter") {
    res.redirect("/iteration1/permission-management/existing-local-admin/submitter-terms");
  } else {
    res.redirect("/iteration1/permission-management/existing-local-admin/select-role");
  }
});


router.post("/iteration1/permission-management/no-existing-local-admin/select-role", (req, res) => {
  const role = req.session.data.role;

  if (role === "local-admin") {
    res.redirect("/iteration1/permission-management/no-existing-local-admin/add-ig-contact");
  } else if (role === "submitter") {
    res.redirect("/iteration1/permission-management/no-existing-local-admin/submitter-message");
  } else {
    res.redirect("/iteration1/permission-management/no-existing-local-admin/select-role");
  }
});



router.post("/iteration1/permission-management/existing-local-admin/local-admin-message", (req, res) => {
  const continueChoice = req.session.data.continue;

  if (continueChoice === "yes") {
    res.redirect("/iteration1/permission-management/existing-local-admin/add-ig-contact");
  } else if (continueChoice === "no") {
    res.redirect("/iteration1/permission-management/existing-local-admin/home-no-permission");
  } else {
    res.redirect("/iteration1/permission-management/existing-local-admin/local-admin-message");
  }
});

router.post("/iteration1/permission-management/no-existing-local-admin/submitter-message", (req, res) => {
  const continueChoice = req.session.data.continue;

  if (continueChoice === "yes") {
    res.redirect("/iteration1/permission-management/no-existing-local-admin/add-ig-contact2");
  } else if (continueChoice === "no") {
    res.redirect("/iteration1/permission-management/no-existing-local-admin/home-no-permission");
  } else {
    res.redirect("/iteration1/permission-management/no-existing-local-admin/submitter-message");
  }
});

router.post("/iteration1/permission-management/existing-local-admin/select-collection", (req, res) => {
  const collection = req.session.data.collections;

  // Check if a collection was selected
  if (collection) {
    // If collection is selected, go to next page
    req.session.data.collection = collection;
    res.redirect("/iteration1/permission-management/existing-local-admin/select-organisation");
  } else {
    // If no collection selected, show error page
    res.redirect("/iteration1/permission-management/existing-local-admin/select-collection-error");
  }
});


router.post("/iteration1/permission-management/existing-local-admin/select-collection-error", (req, res) => {
  const collection = req.session.data.collections;

  // Check if a collection was selected
  if (collection) {
    // If collection is selected, go to next page
    req.session.data.collection = collection;
    res.redirect("/iteration1/permission-management/existing-local-admin/select-organisation");
  } else {
    // If no collection selected, show error page
    res.redirect("/iteration1/permission-management/existing-local-admin/select-collection-error");
  }
});

router.post("/iteration1/permission-management/no-existing-local-admin/select-collection", (req, res) => {
  const collection = req.session.data.collections;

  // Check if a collection was selected
  if (collection) {
    // If collection is selected, go to next page
    req.session.data.collection = collection;
    res.redirect("/iteration1/permission-management/no-existing-local-admin/select-organisation");
  } else {
    // If no collection selected, show error page
    res.redirect("/iteration1/permission-management/no-existing-local-admin/select-collection-error");
  }
});


router.post("/iteration1/permission-management/no-existing-local-admin/select-collection-error", (req, res) => {
  const collection = req.session.data.collections;

  // Check if a collection was selected
  if (collection) {
    // If collection is selected, go to next page
    req.session.data.collection = collection;
    res.redirect("/iteration1/permission-management/no-existing-local-admin/select-organisation");
  } else {
    // If no collection selected, show error page
    res.redirect("/iteration1/permission-management/no-existing-local-admin/select-collection-error");
  }
});


router.post("/iteration1/permission-management/existing-local-admin/add-ig-contact", (req, res) => {
  // Store the IG contact data in session
  req.session.data['ig-name'] = req.session.data['ig-name'];
  req.session.data['email-address-field'] = req.session.data['email-address-field'];
  req.session.data['telephone-number-field'] = req.session.data['telephone-number-field'];
  
  // Redirect back to the details page
  res.redirect("/iteration1/permission-management/existing-local-admin/add-ig-context");
});
 
router.post("/iteration1/permission-management/existing-local-admin/add-ig-context", (req, res) => {
  // Store the team data in session
  req.session.data['team'] = req.session.data['team'];
  req.session.data['job-title'] = req.session.data['job-title'];
  req.session.data['reason'] = req.session.data['reason'];

  // Redirect back to the details page
  res.redirect("/iteration1/permission-management/existing-local-admin/local-admin-terms");
});

router.post("/iteration1/permission-management/no-existing-local-admin/add-ig-contact", (req, res) => {
  // Store the IG contact data in session
  req.session.data['ig-name'] = req.session.data['ig-name'];
  req.session.data['email-address-field'] = req.session.data['email-address-field'];
  req.session.data['telephone-number-field'] = req.session.data['telephone-number-field'];
  
  // Redirect back to the details page
  res.redirect("/iteration1/permission-management/no-existing-local-admin/add-ig-context");
});
 
router.post("/iteration1/permission-management/no-existing-local-admin/add-ig-context", (req, res) => {
  // Store the team data in session
  req.session.data['team'] = req.session.data['team'];
  req.session.data['job-title'] = req.session.data['job-title'];
  req.session.data['reason'] = req.session.data['reason'];

  // Redirect back to the details page
  res.redirect("/iteration1/permission-management/no-existing-local-admin/local-admin-terms");
});

router.post("/iteration1/permission-management/no-existing-local-admin/add-ig-contact2", (req, res) => {
  // Store the IG contact data in session
  req.session.data['ig-name2'] = req.session.data['ig-name2'];
  req.session.data['email-address-field2'] = req.session.data['email-address-field2'];
  req.session.data['telephone-number-field2'] = req.session.data['telephone-number-field2'];
  
  // Redirect back to the details page
  res.redirect("/iteration1/permission-management/no-existing-local-admin/add-ig-context2");
});
 
router.post("/iteration1/permission-management/no-existing-local-admin/add-ig-context2", (req, res) => {
  // Store the team data in session
  req.session.data['team2'] = req.session.data['team2'];
  req.session.data['job-title2'] = req.session.data['job-title2'];
  req.session.data['reason2'] = req.session.data['reason2'];

  // Redirect back to the details page
  res.redirect("/iteration1/permission-management/no-existing-local-admin/submitter2-terms");
});
 
router.post('/iteration2/data-submission/choose-period', (req, res) => {
  // Store the period data in session
  req.session.data['period'] = req.session.data['period'];

router.post('/iteration2/data-submission/choose-period', (req, res) => {
    res.redirect('/iteration2/data-submission/upload-file1');
}); 

module.exports = router;
