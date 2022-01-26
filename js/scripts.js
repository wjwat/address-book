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
function Contact(firstName, lastName, phoneNumber, emailAddress, nickName, address) {
  this.firstName = firstName || '';
  this.lastName = lastName || '';
  this.phoneNumber = phoneNumber || '';
  this.emailAddress = emailAddress || '';
  this.nickName = nickName || '';
  this.address = address || [];
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

// User Interface Logic ---------
let addressBook = new AddressBook();

function populateContact() {
  console.log('hola!');
  let newContact = new Contact;

  $('form input').each((i, e) => {
    newContact[$(e).attr('name')] = $(e).val();
  })

  // We should probably move each address into a div of class address
  // so when we grab each address we can pull in the sibling addressNickname
  // to associate it with that.
  $('.address').each((i, e) => {

    let t = [];


    // console.log($(e).find('input'));
    // console.log($(e).find('textarea'));

    t.push($(e).find('input[name=addressNickname]')[0].value);
    t.push($(e).find('textarea[name=address]')[0].value);

    newContact['address'].push(t);
  })

  addressBook.addContact(newContact);
  console.log(addressBook);
}

$(document).ready(function() {
  $('#add-contact').on('click', populateContact);
  // $('#add-contact').on('click', () => {
  //   let newContact = new Contact;

  //   $('form input').each((i, e) => {
  //     newContact[$(e).attr('name')] = $(e).val();
  //   })

  //   // We should probably move each address into a div of class address
  //   // so when we grab each address we can pull in the sibling addressNickname
  //   // to associate it with that.
  //   $('.address').each((i, e) => {

  //     let t = [];


  //     // console.log($(e).find('input'));
  //     // console.log($(e).find('textarea'));

  //     t.push($(e).find('input[name=addressNickname]')[0].value);
  //     t.push($(e).find('textarea[name=address]')[0].value);

  //     newContact['address'].push(t);
  //   })

  //   addressBook.addContact(newContact);
  //   console.log(addressBook);
  // });
});