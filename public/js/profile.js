"use strict";

const $ = (selector) => document.querySelector(selector);

if (localStorage.getItem('udob') !== null) {
  $("#user_dob").textContent = localStorage.getItem('udob');
  $("#user_password_last_changed").textContent = localStorage.getItem('pwchange');
  $("#user_first_name").textContent = localStorage.getItem('fname');
  $("#user_last_name").textContent = localStorage.getItem('lname');
  $("#user_email").textContent = localStorage.getItem('email');
}
const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const passwordRegEx = /^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/;
//resets fields to original positions
const onReset = (evt) => {
  resetErrors();
  //TODO:: Reset the reset-able fields
  $("#first_name").value = "";
  $("#last_name").value = "";
  $("#email").value = "";

  $("#password").value = "";
  $("#confirm_password").value = "";

  evt.preventDefault();
};
//resets errors
const resetErrors = () => {
  $("#name_error").textContent = "";
  $("#password_error").textContent = "";
  $("#email_error").textContent = "";

};
//checks errors
const onSubmit = (evt) => {
  resetErrors();

  
 
  let formErrors = false;
//changes all values to submitted information
  let firstName = $("#first_name").value;
  let lastName = $("#last_name").value;
  let email = $("#email").value;
  let password = $("#password").value;
  let confirmPassword = $("#confirm_password").value;
  let dob = new Date($("#dob").value);
  let today = new Date();
//if statements checking for errors
  if (firstName == "" || lastName == "") {
    $("#name_error").textContent = "Name fields can't be empty.";
    formErrors = true;
  }

  if (!emailRegEx.test(email)) {
    $("#email_error").textContent = "Email is not valid";
    formErrors = true;
  }

  if (!passwordRegEx.test(password)) {
    $("#password_error").textContent = "Password must be at least 8 characters and include an uppercase and a lowercase character.";
    formErrors = true;
  }

  if (password != confirmPassword) {
    $("#password_error").textContent = "Passwords do not match.";
    formErrors = true;
  }

  if (today.setHours(0, 0, 0, 0) < dob) {
    $("#dob_error").textContent = "Date of birth must be in the past.";
    formErrors = true;
  }
//submits form if there isn't errors
  if (!formErrors) {
      $("#user_dob").textContent = "";
      $("#user_password_last_changed").textContent = "";
      $("#user_first_name").textContent = "";
      $("#user_last_name").textContent = "";
      $("#user_email").textContent = "";
      $("#user_dob").textContent = dob.toDateString();
      localStorage.setItem('udob', $("#user_dob").textContent);
      $("#user_password_last_changed").textContent = today.toDateString();
      localStorage.setItem('pwchange', $("#user_password_last_changed").textContent);
      $("#user_first_name").textContent = $("#first_name").value;
      localStorage.setItem('fname', $("#user_first_name").textContent);
      $("#user_last_name").textContent = $("#last_name").value;
      localStorage.setItem('lname', $("#user_last_name").textContent);
      $("#user_email").textContent = $("#email").value;
      localStorage.setItem('email', $("#user_email").textContent);
  }
  evt.preventDefault()
};
//making the buttons work
document.addEventListener("DOMContentLoaded", () => {
  $("#update_profile").addEventListener("click", onSubmit);

  $("#reset_form").addEventListener("click", onReset);
});
