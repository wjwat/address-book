// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

// Return an ID number that will not collide with a pre-existing ID number.
AddressBook.prototype.assignId = function() {
  // aB.currentId += 1;
  this.currentId += 1;
  // return aB.currentId
  return this.currentId;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};


// CREATE ADDRESSBOOK
let aB = new AddressBook();

// CREATE A CONTACT
let contact = new Contact("Ada", "Lovelace", "503-555-0100");

let contact2 = new Contact("Dad", "Lovelace", "503-555-0100");

// ADD THAT CONTACT TO OUR ADDRESSBOOK
aB.addContact(contact);
aB.addContact(contact2);

// DELETE THE CONTACT WITH ID OF 1

let cloneaB = JSON.parse(JSON.stringify(aB));
console.log(cloneaB);
console.log(aB.deleteContact(1));
console.log(aB.deleteContact(5));
console.log(aB);
