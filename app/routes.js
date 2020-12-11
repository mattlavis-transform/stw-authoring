const express = require('express')
const axios = require('axios');
const { response } = require('express');
const router = express.Router()

// Add your routes here - above the module.exports line
// CONTENT //

// Content (actions)
router.get(['/content/actions/:id/'], function (req, res) {
    var id = req.params["id"];
    var confirm_delete = req.query["confirm_delete"];
    if (confirm_delete == "yes") {
        res.redirect('/content/delete_confirmation/' + id);
    } else {
        res.redirect('/content');
    }
});

// Content (create)
router.get(['/content/edit/', '/content/create/', '/content/edit', '/content/create'], function (req, res) {
    console.log("In route");
    content = {
        "verb": "Create",
        "button_verb": "Create",
        "id": ""
    }

    res.render('content/edit', { 'content': content });
});

// Content edit (specific ID)
router.get(['/content/edit/:id', '/content/edit_elevated/:id',], function (req, res) {
    var privileges, locked;
    var url = req.url;
    var id = req.params["id"];

    if (url.indexOf("edit_elevated") > -1) {
        console.log("Elevated");
        privileges = "elevated";
    } else {
        privileges = "standard";
    }
    if (id == 2) {
        locked = true;
    } else {
        locked = false;
    }
    content =
    {
        "verb": "Edit",
        "button_verb": "Update",
        "id": 1,
        "locked": locked,
        "privileges": privileges,
        "title": "Test data",
        "explanatory_text": "Explanatory text",
        "url": "https://www.url.com"
    }

    res.render('content/edit', { 'content': content });
});


// Content delete (specific ID)
router.get(['/content/delete/:id', '/content/delete_elevated/:id',], function (req, res) {
    var privileges, locked;
    var url = req.url;
    var id = req.params["id"];

    if (url.indexOf("edit_elevated") > -1) {
        console.log("Elevated");
        privileges = "elevated";
    } else {
        privileges = "standard";
    }
    if (id == 2) {
        locked = true;
    } else {
        locked = false;
    }
    content =
    {
        "verb": "Delete",
        "button_verb": "Delete",
        "id": 1,
        "locked": locked,
        "privileges": privileges,
        "title": "Test data",
        "explanatory_text": "Explanatory text",
        "url": "https://www.url.com"
    }

    res.render('content/delete', { 'content': content });
});

// Content approval screen
router.get(['/content/approve/:id/:action'], function (req, res) {
    var id = req.params["id"];
    var action = req.params["action"];
    content =
    {
        "verb": "Approve change to",
        "button_verb": "Approve",
        "action": action,
        "id": id,
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
        "verb": "Reject update to",
        "button_verb": "Reject",
        "id": id,
        "title": "Test data",
        "explanatory_text": "Explanatory text",
        "url": "https://www.url.com"
    }

    res.render('content/reject', { 'content': content });
});

// Content creation confirmation
router.get(['/content/confirmation',], function (req, res) {
    console.log("Content confirmation");
    id = 47;
    content =
    {
        "id": id,
        "action": "Content created",
        "message1": "Content item " + id + " has been successfully created",
        "message2": "Change awaiting approval",
        "links": [
            {
                "text": "Link this content",
                "url": "/content/link/" + id
            },
            {
                "text": "View this content item",
                "url": "/content/edit/" + id
            },
            {
                "text": "View all content",
                "url": "/content"
            },
            {
                "text": "Create more content",
                "url": "/content/edit"
            }
        ]

    }

    res.render('content/confirmation', { 'content': content });
});

// Content update confirmation
router.get(['/content/confirmation/:id', '/content/confirmation_elevated/:id',], function (req, res) {
    var url = req.url;
    var id = req.params["id"];

    if (url.indexOf("elevated") > -1) {
        message2 = "Changes are now live";
    } else {
        message2 = "Change awaiting approval";
    }

    content =
    {
        "id": id,
        "action": "Content updated",
        "message1": "Content item " + id + " has been successfully updated",
        "message2": message2,
        "links": [
            {
                "text": "View this content item",
                "url": "/content/edit/" + id
            },
            {
                "text": "View all content",
                "url": "/content"
            }
        ]
    }

    res.render('content/confirmation', { 'content': content });
});


// Content delete confirmation
router.get(['/content/delete_confirmation/:id', '/content/delete_confirmation_elevated/:id',], function (req, res) {
    var url = req.url;
    var id = req.params["id"];

    if (url.indexOf("elevated") > -1) {
        message2 = "Changes are now live";
    } else {
        message2 = "Change awaiting approval";
    }

    content =
    {
        "id": id,
        "action": "Delete content",
        "message1": "Content item " + id + " has been successfully deleted",
        "message2": message2,
        "links": [
            {
                "text": "View all content",
                "url": "/content"
            }
        ]
    }

    res.render('content/confirmation', { 'content': content });
});

// Content approval confirmation
router.get(['/content/approved/:id',], function (req, res) {
    console.log("Approval confirmation");
    id = req.params["id"];
    content =
    {
        "id": id,
        "action": "Update approved",
        "message1": "Changes to content item " + id + " have been approved",
        "message2": "Changes are now live",
        "links": [
            {
                "text": "View your workstack",
                "url": "/workstack"
            }
        ]
    }

    res.render('content/confirmation', { 'content': content });
});

// Content rejection confirmation
router.get(['/content/rejection/:id',], function (req, res) {
    console.log("Approval rejection");
    id = req.params["id"];
    content =
    {
        "id": id,
        "action": "Update rejected",
        "message1": "Changes to content " + id + " have been rejected",
        "message2": "The author has been informed",
        "links": [
            {
                "text": "View your workstack",
                "url": "/workstack"
            }
        ]
    }

    res.render('content/confirmation', { 'content': content });
});

// Content link 001
router.get(['/content/link/:id',], function (req, res) {
    console.log("Link content");
    id = req.params["id"];
    content =
    {
        "id": id
    }
    res.render('content/link_01', { 'content': content });
});

// Content link 002
router.get(['/content/link2/:id',], function (req, res) {
    console.log("Link content");
    id = req.params["id"];
    content =
    {
        "id": id
    }
    res.render('content/link_02', { 'content': content });
});

// Content link created - confirmation
router.get(['/content/link_confirmation/:id',], function (req, res) {
    console.log("Link content");
    id = req.params["id"];
    content =
    {
        "id": id,
        "action": "Link created",
        "message1": "Content item " + id + " has been successfully linked",
        "message2": "Change awaiting approval",
        "links": [
            {
                "text": "Link this content again",
                "url": "/content/link/" + id
            },
            {
                "text": "View this content item",
                "url": "/content/edit/" + id
            },
            {
                "text": "View all content",
                "url": "/content"
            }
        ]
    }
    res.render('content/confirmation', { 'content': content });
});

// CONTENT //











// MEASURE TYPES //


// measure type edit
router.get(['/measure_types/edit/:id'], function (req, res) {
    var locked;
    var id = req.params["id"];
    if (id == "103") {
        locked = true;
    } else {
        locked = false;
    }
    content =
    {
        "verb": "Edit",
        "button_verb": "Update",
        "id": 103,
        "locked": locked,
        "description": "Third country duty",
        "overlay": "The duty that is for third countries",
        "overlay_welsh": "Y ddyletswydd sydd ar gyfer trydydd gwledydd"
    }

    res.render('measure_types/edit', { 'content': content });
});

// Measure type approval screen
router.get(['/measure_types/approve/:id'], function (req, res) {
    id = req.params["id"];
    console.log("Approve measure type");
    content =
    {
        "verb": "Approve change to",
        "button_verb": "Approve",
        "id": id,
        "title": "Test data",
        "explanatory_text": "Explanatory text",
        "url": "https://www.url.com"
    }

    res.render('measure_types/edit', { 'content': content });
});



// Measure type rejection screen
router.get(['/measure_types/reject/:id'], function (req, res) {
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

    res.render('measure_types/reject', { 'content': content });
});

router.get(['/measure_types/confirmation/:id',], function (req, res) {
    console.log("Confirmation");
    id = req.params["id"];
    content =
    {
        "id": id,
        "action": "Update confirmed",
        "message1": "Measure type " + id + " has been successfully updated",
        "message2": "Change awaiting approval"
    }

    res.render('measure_types/confirmation', { 'content': content });
});



// Measure types rejection confirmation
router.get(['/measure_types/rejection/:id',], function (req, res) {
    console.log("Approval rejection");
    id = req.params["id"];
    content =
    {
        "id": id,
        "action": "Update rejected",
        "message1": "Changes to measure type " + id + " have been rejected",
        "message2": "The author has been informed"
    }

    res.render('measure_types/confirmation', { 'content': content });
});
// MEASURE TYPES //


// DOCUMENT CODES //
// document code edit
router.get(['/document_codes/edit/:id'], function (req, res) {
    var locked;
    var id = req.params["id"];
    var certificate_type_code = id.substr(0, 1);
    if (id == "9100") {
        locked = true;
    } else {
        locked = false;
    }
    content =
    {
        "verb": "Edit",
        "button_verb": "Update",
        "id": id,
        "locked": locked,
        "description": "Lorem",
        "overlay": "The duty that is for third countries",
        "overlay_welsh": "Y ddyletswydd sydd ar gyfer trydydd gwledydd"
    }

    url = 'https://www.trade-tariff.service.gov.uk/api/v2/certificates/search?code=' + id + '&type=' + certificate_type_code + '&page=1'
    console.log(url)
    axios.get(url)
        .then((response) => {
            res.render('document_codes/edit', { 'content': content, 'certificates': response.data.included });
        });
});

// document code edit_approve
router.get(['/document_codes/edit_approve/:id'], function (req, res) {
    var locked;
    var id = req.params["id"];
    if (id == "9100") {
        locked = true;
    } else {
        locked = false;
    }
    content =
    {
        "verb": "Edit and approve",
        "button_verb": "Update",
        "id": id,
        "locked": locked,
        "description": "Lorem",
        "overlay": "The duty that is for third countries",
        "overlay_welsh": "Y ddyletswydd sydd ar gyfer trydydd gwledydd"
    }

    res.render('document_codes/edit', { 'content': content });
});


// Document code approval screen
router.get(['/document_codes/approve/:id'], function (req, res) {
    var locked;
    var id = req.params["id"];
    console.log("Approve document code");
    content =
    {
        "verb": "Approve change to",
        "button_verb": "Approve",
        "id": id,
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
        "verb": "Reject update to",
        "button_verb": "Reject update to",
        "id": id,
        "title": "Test data",
        "explanatory_text": "Explanatory text",
        "url": "https://www.url.com"
    }

    res.render('document_codes/reject', { 'content': content });
});

// Document code confirmation
router.get(['/document_codes/confirmation/:id',], function (req, res) {
    console.log("Confirmation");
    id = req.params["id"];
    content =
    {
        "id": id,
        "action": "Update confirmed",
        "message1": "Document code " + id + " has been successfully updated",
        "message2": "Change awaiting approval"
    }

    res.render('document_codes/confirmation', { 'content': content });
});

// Document code approval confirmation
router.get(['/document_codes/approved/:id',], function (req, res) {
    console.log("Approval confirmation");
    id = req.params["id"];
    content =
    {
        "id": id,
        "action": "Update approved",
        "message1": "Changes to document code " + id + " have been approved",
        "message2": "Changes are now live"
    }

    res.render('document_codes/confirmation', { 'content': content });
});

// Document code rejection confirmation
router.get(['/document_codes/rejection/:id',], function (req, res) {
    console.log("Approval rejection");
    id = req.params["id"];
    content =
    {
        "id": id,
        "action": "Update rejected",
        "message1": "Changes to document code " + id + " have been rejected",
        "message2": "The author has been informed"
    }

    res.render('document_codes/confirmation', { 'content': content });
});

// DOCUMENT CODES //

module.exports = router
