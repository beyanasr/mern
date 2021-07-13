const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const controllers = require("../controllers/contact.controllers");

// post contact**
// get all contacts**
// get conatct by id**
// delete contact by id**
// update a contact by id**

// @POST method
// @desc post a contact
// @Public
// @path : http://localhost:5000/api/contact/
// Params Body
router.post("/add", controllers.postContact);

// @Method GET
// @desc GET all contacts
// @ Path: http://localhost:5000/api/contact/
router.get("/", async (req, res) => {
  try {
    const result = await Contact.find();
    res.send({ response: result, message: "geting contacts successfully" });
  } catch (error) {
    res.status(400).send({ message: "can not get contacts" });
  }
});

// @Method GET
// @desc GET one contact
// @ Path: http://localhost:5000/api/contact/:id
// @Params id
router.get("/:id", async (req, res) => {
  try {
    const result = await Contact.findOne({ _id: req.params.id });
    res.send({ response: result, message: "geting contact successfully" });
  } catch (error) {
    res.status(400).send({ message: "there is no contact with this id" });
  }
});

//@Method DELETE
// @des delete one contact by id
// Path http://localhost:5000/api/contact/:id
// @Params id
router.delete("/:id", async (req, res) => {
  try {
    const result = await Contact.deleteOne({ _id: req.params.id });
    result.n
      ? res.send({ response: "user deleted" })
      : res.send("there is no user with this id");
  } catch (error) {
    res.send("there is no id ");
  }
});

//@method PUT
//@desc update a contact by id
// @PATH  http://localhost:5000/api/contact/:id
// @Params id Body
router.put("/:id", async (req, res) => {
  try {
    const result = await Contact.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );

    result.nModified
      ? res.send({ message: "user updated" })
      : res.send({ message: "contact already updated" });
  } catch (error) {
    res.status(400).send({ message: "there is no user with this id" });
  }
});

module.exports = router;
