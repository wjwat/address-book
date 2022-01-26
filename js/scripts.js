// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, emailAddress, nickName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emailAddress = emailAddress;
  this.nickName = nickName;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

// User Interface Logic ---------
let addressBook = new AddressBook();

$(document).ready(function() {
  $('#add-contact').on('click', () => {
    let newContact = new Contact;

    $('form input').each((i, e) => {
      newContact[$(e).attr('name')] = $(e).val();
    })

    // s = ['h', 'e', 'l', 'l', 'o']
    // s.forEach((e, i) => {
    //   // e === 'h'
    //   // i === 0
    //   // s[i] === 'h' is true
    // })

    addressBook.addContact(newContact);
    console.log(addressBook);
  });
});