"use strict";

const $ = (selector) => document.querySelector(selector);

const postalRegEx =
  /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
//resets fields to original positions
const onReset = (evt) => {
  resetErrors();

  $("#notifications").checked = true;

  $("#eco").checked = true;
  $("#temperature").value = 21;
  $("#location").value = "L7W 4T8";

  evt.preventDefault();
};
//resets errors
const resetErrors = () => {
  $("#temperature_error").textContent = "";
  $("#location_error").textContent = "";
  console.error("Fields Reset");
};

const onSubmit = (evt) => {
  //TODO::Reset any errors before submitting
  resetErrors();

  //TODO:: Set notifications since it doesn't need to be validated
  let notificationsOn = $("#notifications").checked;

  $("#setting_notifications").textContent = notificationsOn ? "On" : "Off";

  //querySelectorAll returns an array of everything that matches the argument
  let lightingModeOptions = document.querySelectorAll("[name='lighting_mode']");

  for (let i = 0; i < lightingModeOptions.length; i++) {
    if (lightingModeOptions[i].checked) {
      //Set setting_lighting_mode to the value of the selected radio button
      $("#setting_lighting_mode").textContent = lightingModeOptions[i].value;
    }
  }

  //declaring variables
  let location = $("#location").value;

  if (postalRegEx.test(location)) {
    //if the postal code is valid this code will run
    $("#setting_location").textContent = location;
  } else {
    //if postal code is not valid display error
    $("#location_error").textContent =
      "The postal code did not match the format required.";
  }

  //Declaring variables
  let temperature = $("#temperature").value;
  let temperatureError = $("#temperature_error");

  //Ensure temperature is a number
  if (isNaN(temperature) || temperature == "") {
    temperatureError.textContent = "This is not a valid temperature selection.";
  } else if (temperature > 25) {
    //Ensure temperature doesn't exceep maximum
    temperatureError.textContent =
      "Max temperature is 25C, setting temperature to Max";
    $("#setting_temperature").textContent = 25;
  } else if (temperature < 10) {
    //Ensure temperature doesn't exceep minimum
    temperatureError.textContent =
      "Min temperature is 10C, setting temperature to Min";
    $("#setting_temperature").textContent = 10;
  } else {
    //Set temperature
    $("#setting_temperature").textContent = temperature;
  }

  evt.preventDefault();
};

document.addEventListener("DOMContentLoaded", () => {
  //TODO:: Add current date
  $("#date_display").textContent = new Date().toDateString();
  //TODO:: Add Reset Form listener
  $("#reset_form").addEventListener("reset", onReset);
  //TODO:: Add Submit Form listener
  $("#update_settings").addEventListener("click", onSubmit);
});

//attempted to get this working but I am defeated, think the rest is pretty good
const setTempBtn = document.querySelector("#set-temp");
const tempInput = document.querySelector("#temp");
const durationHoursInput = document.querySelector("#duration-hours");
const durationMinutesInput = document.querySelector("#duration-minutes");

setTempBtn.addEventListener("click", () => {
  // Read temperature and duration values
  const temp = tempInput.value;
  const duration = (durationHoursInput.value * 60 + durationMinutesInput.value) * 1000 * 60;


  // Set new temperature
  setTemperature(temp);

  // Start timer
  timerId = setTimeout(() => {
    // Reset temperature to original value
    setTemperature(originalTemp);

    // Clear timer
    clearTimeout(timerId);
  }, duration);
});
//setting the temporary temperature
function setTemperature(temp) {
  $("#setting_temperature").textContent = temp + duration;
}