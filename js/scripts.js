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
function Contact(firstName, lastName, phoneNumber, emailAddress, physicalAddress) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emailAddress = emailAddress;
  this.physicalAddress = physicalAddress;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

function Address(nickname, location) {
  this.nickname = nickname;
  this.location = location;
}

// User Interface Logic ---------
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
}

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address").html(contact.emailAddress);
  $(".physical-address").html(contact.physicalAddress);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

function insertNewAddressFields() {
  let counter = 0;  
  let x = `<div id="address-group${counter}">
<label for="address-name">Nickname for address</label>
<input type="text"  class="form-control" id="address-name">
<label for="new-physical-address">Address</label>
<textarea type="text"  class="form-control" id="new-physical-address"></textarea>
</div>`
  $('#address-group').append(x);
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
  $('#add-address').on('click', insertNewAddressFields);
}

$(document).ready(function() {
  attachContactListeners();
  $('form#new-contact').on('submit', function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var emailAddress = $('input#new-email-address').val();

    var addressNickname = $('#address-name').val();
    var physicalAddress = $('textarea#new-physical-address').val();

    // Clear form to allow adding multiple contacts to AB.
    $(this).trigger('reset');

    var newAddress = new Address(addressNickname, physicalAddress);
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, emailAddress, newAddress);
    console.log(newContact);
    console.log(Object.keys(newContact));
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});

/*
<div id="address-group"+ counter>
<label for="address-name">Nickname for address</label>
<input type="text"  class="form-control" id="address-name">
<label for="new-physical-address">Address</label>
<textarea type="text"  class="form-control" id="new-physical-address"></textarea>
</div>
*/