const asynHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const { constants } = require("../constants");
//@desc get all contacts
//@route GET /api/contacts
//@access public

const getContacts = asynHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//@desc create contact
//@route Post /api/contacts
//@access public

const createContact = asynHandler(async (req, res) => {
  console.log(req.body);

  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Missing Contact Field");
  }
  const contact = await Contact.create({ name, phone, email });
  res.status(201).json(contact);
});

//@desc get contact
//@route GET /api/contacts/:id
//@access public

const getContact = asynHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(constants.NOT_FOUND);
    throw new Error("Contact Not Found");
  }
  res.status(200).json(contact);
});

//@desc update contact
//@route PUT /api/contacts/:id
//@access public

const updateContact = asynHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(constants.NOT_FOUND);
    throw new Error("Contact Not Found");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});
//@desc delete contact
//@route DELETE /api/contacts/:id
//@access public

const deleteContact = asynHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(constants.NOT_FOUND);
    throw new Error("Contact Not Found");
  }

  console.log(Contact);
  await Contact.deleteOne(contact);
  console.log("after await");
  res.status(200).json(contact);
});
module.exports = {
  getContact,
  createContact,
  getContacts,
  updateContact,
  deleteContact,
};
