const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

// CONTENT //

// Content (creaete)
router.get(['/content/edit/', '/content/create/', '/content/edit', '/content/create'], function (req, res) {
    console.log("In route");
    content = {
        "verb": "Create",
        "button_verb": "Create"
    }

    res.render('content/edit', { 'content': content });
});

// Content edit (specific)
router.get(['/content/edit/:id'], function (req, res) {
    console.log("In route");
    content =
    {
        "verb": "Edit",
        "button_verb": "Update",
        "id": 1,
        "title": "Test data",
        "explanatory_text": "Explanatory text",
        "url": "https://www.url.com"
    }

    res.render('content/edit', { 'content': content });
});

// Content approval screen
router.get(['/content/approve/:id'], function (req, res) {
    console.log("Approve");
    content =
    {
        "verb": "Approve or amend",
        "button_verb": "Approve",
        "id": 1,
        "title": "Test data",
        "explanatory_text": "Explanatory text",
        "url": "https://www.url.com"
    }

    res.render('content/edit', { 'content': content });
});

// Content rejection screen
router.get(['/content/reject/:id'], function (req, res) {
    id = req.params["id"];
    console.log("Reject");
    content =
    {
        "verb": "Reject",
        "button_verb": "Reject",
        "id": id,
        "title": "Test data",
        "explanatory_text": "Explanatory text",
        "url": "https://www.url.com"
    }

    res.render('content/reject', { 'content': content });
});

// CONTENT //

// MEASURE TYPES //


// measure type edit
router.get(['/measure_types/edit/:id'], function (req, res) {
    content =
    {
        "verb": "Edit",
        "button_verb": "Update",
        "id": 103,
        "description": "Third country duty",
        "overlay": "The duty that is for third countries",
        "overlay_welsh": "Y ddyletswydd sydd ar gyfer trydydd gwledydd"
    }

    res.render('measure_types/edit', { 'content': content });
});

// Measure type approval screen
router.get(['/measure_types/approve/:id'], function (req, res) {
    console.log("Approve measure type");
    content =
    {
        "verb": "Approve or amend",
        "button_verb": "Approve",
        "id": "C640",
        "title": "Test data",
        "explanatory_text": "Explanatory text",
        "url": "https://www.url.com"
    }

    res.render('measure_types/edit', { 'content': content });
});
// MEASURE TYPES //

// DOCUMENT CODES //
// document code edit
router.get(['/document_codes/edit/:id'], function (req, res) {
    content =
    {
        "verb": "Edit",
        "button_verb": "Update",
        "id": 9100,
        "description": "Lorem",
        "overlay": "The duty that is for third countries",
        "overlay_welsh": "Y ddyletswydd sydd ar gyfer trydydd gwledydd"
    }

    res.render('document_codes/edit', { 'content': content });
});


// Document code approval screen
router.get(['/document_codes/approve/:id'], function (req, res) {
    console.log("Approve document code");
    content =
    {
        "verb": "Approve or amend",
        "button_verb": "Approve",
        "id": "C640",
        "title": "Test data",
        "explanatory_text": "Explanatory text",
        "url": "https://www.url.com"
    }

    res.render('document_codes/edit', { 'content': content });
});


// Document code rejection screen
router.get(['/document_codes/reject/:id'], function (req, res) {
    id = req.params["id"];
    console.log("Reject");
    content =
    {
        "verb": "Reject",
        "button_verb": "Reject",
        "id": id,
        "title": "Test data",
        "explanatory_text": "Explanatory text",
        "url": "https://www.url.com"
    }

    res.render('document_codes/reject', { 'content': content });
});

// DOCUMENT CODES //

module.exports = router
