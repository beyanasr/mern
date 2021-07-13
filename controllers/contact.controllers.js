const Contact = require("../models/Contact");

exports.postContact = async (req, res) => {
  try {
    // create a new contact with the model contact
    const newContact = new Contact(req.body);
    // test if the user has an email
    if (!req.body.email) {
      res.status(400).send({ message: "email is required check again" });
      return;
    }
    // test 2: if the email ele=ready exist => email should be unique
    const user = await Contact.findOne({ email: req.body.email });
    if (user) {
      res
        .status(400)
        .send({ message: "user already exist email should be unique" });
      return;
    }
    // save the contact
    const response = await newContact.save();
    res.send({ response: response, message: "user is saved" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "can not save it" });
  }
};
