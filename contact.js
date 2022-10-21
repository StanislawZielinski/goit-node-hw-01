const fs = require('fs').promises;
const path = require('path');
const {nanoid} = require("nanoid");

const contactsPath = path.resolve('./db/contacts.json');

// TODO: udokumentuj każdą funkcję
const listContacts = async() => {
  try {
      const contactsTMP = await fs.readFile(contactsPath);
      const contacts = await JSON.parse(contactsTMP);
      return contacts 
  }
  catch(error) {
      console.log(error.message)
  }
}
  
const getContactById = async(contactId) => {
  try {
    const contactsTMP = await listContacts();
    const contact = await contactsTMP.filter((elem)=>elem.id===contactId.toString());
    return contact
  } 
  catch (error) {
    console.log(error.message)
  }
}
  
const removeContact = async(contactId) => {
  try {
    const contactsTMP = await listContacts();
    const contacts = await contactsTMP.filter((elem)=>elem.id !== contactId);
    await fs.writeFile(contactsPath,JSON.stringify(contacts));
    return contacts

  } 
  catch (error) {
    console.log(error.message)
  }
}
  
const addContact = async(name, email, phone) => {
  try {
    const contactsTMP = await listContacts();
    const newContact = {
      id:nanoid(),
      name: name,
      email: email,
      phone: phone,
    }

    const contacts = [...contactsTMP, newContact]
    await fs.writeFile(contactsPath,JSON.stringify(contacts));
    return contacts
  } 
  catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};