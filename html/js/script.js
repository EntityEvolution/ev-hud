window.addEventListener('load', () => {
  if (Config.useESX && !Config.useStress) {
    document.getElementById("stress").style.display = "none";
    document.getElementById("slider-stress").style.display = "none";
  } else if (Config.useESX && Config.useStress) {
    return
  } else {
    document.getElementById("hunger").style.display = "none";
    document.getElementById("thirst").style.display = "none";
    document.getElementById("stress").style.display = "none";
    document.getElementById("slider-hunger").style.display = "none";
    document.getElementById("slider-thirst").style.display = "none";
    document.getElementById("slider-stress").style.display = "none";
  };
});

// Load draggable
window.addEventListener('load', () => {
  $('#health').draggable();
  $("#armor").draggable();
  $("#stamina").draggable();
  $("#oxygen").draggable();
  $("#id").draggable();
  $("#microphone").draggable();
  if (Config.useESX) {
    $('#hunger').draggable();
    $('#thirst').draggable();
    if (Config.useStress) {
      $('#stress').draggable();
    };
  };

  startColorpicker();
});

// Switches & Cases
window.addEventListener("message", function(event) {
  switch (event.data.action) {
    case "startUp":
      startColorpicker();
      startColors();
      startPositions();
    break;

    // Send Data
    case "hud":
      progressCircle(event.data.health, ".health");
      progressCircle(event.data.armor, ".armor");
      progressCircle(event.data.stamina, ".stamina");
      progressCircle(event.data.oxygen, ".oxygen");
      progressCircle(event.data.players, ".id");
      $("#idnumber").text(event.data.id);
      $("#time").text(event.data.time);
      if (Config.useESX) {
        progressCircle(event.data.hunger, ".hunger");
        progressCircle(event.data.thirst, ".thirst");
        if (Config.useStress) {
          progressCircle(event.data.stress, ".stress");
        };
      };
    break;

    case "microphone":
      progressCircle(event.data.microphone, ".microphone");
    break;
  }
});

// Initialization
const startColors = () => {
  $('#health-circle').css('stroke', localStorage.getItem("healthColor"));
  $('#armor-circle').css('stroke', localStorage.getItem("armorColor"));
  $('#stamina-circle').css('stroke', localStorage.getItem("staminaColor"));
  $('#oxygen-circle').css('stroke', localStorage.getItem("oxygenColor"));
  $('#id-circle').css('stroke', localStorage.getItem("idColor"));
  $('#microphone-circle').css('stroke', localStorage.getItem("microphoneColor"));
  if (Config.useESX) {
    $('#hunger-circle').css('stroke', localStorage.getItem("hungerColor"));
    $('#thirst-circle').css('stroke', localStorage.getItem("thirstColor"));
    if (Config.useStress) {
      $("#stress-circle").css('stroke', localStorage.getItem("stressColor"));
    };
  };
}

const startPositions = () => {
  $("#health").animate({ top: localStorage.getItem("dragHealthTop"), left: localStorage.getItem("dragHealthLeft")});
  $("#armor").animate({ top: localStorage.getItem("dragArmorTop"), left: localStorage.getItem("dragArmorLeft")});
  $("#stamina").animate({ top: localStorage.getItem("dragStaminaTop"), left: localStorage.getItem("dragStaminaLeft")});
  $("#oxygen").animate({ top: localStorage.getItem("dragOxygenTop"), left: localStorage.getItem("dragOxygenLeft")});
  $("#microphone").animate({ top: localStorage.getItem("dragMicTop"), left: localStorage.getItem("dragMicLeft")});
  $("#id").animate({ top: localStorage.getItem("dragIdTop"), left: localStorage.getItem("dragIdLeft")});
  if (Config.useESX) {
    $("#hunger").animate({ top: localStorage.getItem("dragHungerTop"), left: localStorage.getItem("dragHungerLeft")});
    $("#thirst").animate({ top: localStorage.getItem("dragThirstTop"), left: localStorage.getItem("dragThirstLeft")});
    if (Config.useStress) {
      $("#stress").animate({ top: localStorage.getItem("dragStressTop"), left: localStorage.getItem("dragStressLeft")});
    };
  };
}

const startColorpicker = () => {
  colorPicker.value = rgb2hex($('#health-circle').css('stroke'));
  colorPicker.addEventListener("input", updateColorPicker, false);
  colorPicker.select();
}

// https://stackoverflow.com/a/3627747
const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

// Color picker function
window.addEventListener('load', () => {
  $("#selection").on("change", function () {
    switch ($("#selection").val()) {
      case "health-option":
        colorPicker.value = rgb2hex($('#health-circle').css('stroke'))
      break;
  
      case "armor-option":
        colorPicker.value = rgb2hex($('#armor-circle').css('stroke'))
      break;
  
      case "stamina-option":
        colorPicker.value = rgb2hex($('#stamina-circle').css('stroke'))
      break;
  
      case "hunger-option":
        colorPicker.value = rgb2hex($('#hunger-circle').css('stroke'))
      break;
  
      case "thirst-option":
        colorPicker.value = rgb2hex($('#thirst-circle').css('stroke'))
      break;
  
      case "stress-option":
        colorPicker.value = rgb2hex($('#stress-circle').css('stroke'))
      break;
  
      case "oxygen-option":
        colorPicker.value = rgb2hex($('#oxygen-circle').css('stroke'))
      break;
  
      case "microphone-option":
        colorPicker.value = rgb2hex($('#microphone-circle').css('stroke'))
      break;
  
      case "id-option":
        colorPicker.value = rgb2hex($('#id-circle').css('stroke'))
      break;
    };
  $('#selection').blur();
  });
});

let updateColorPicker = (event) => {
  let color = event.target.value
  switch ($("#selection").val()) {
    case "health-option":
      $('#health-circle').css('stroke', color);
      localStorage.setItem("healthColor", color);
    break;

    case "armor-option":
      $('#armor-circle').css('stroke', color);
      localStorage.setItem("armorColor", color);
    break;

    case "stamina-option":
      $('#stamina-circle').css('stroke', color);
      localStorage.setItem("staminaColor", color);
    break;

    case "hunger-option":
      $('#hunger-circle').css('stroke', color);
      localStorage.setItem("hungerColor", color);
    break;

    case "thirst-option":
      $('#thirst-circle').css('stroke', color);
      localStorage.setItem("thirstColor", color);
    break;

    case "stress-option":
      $('#stress-circle').css('stroke', color);
      localStorage.setItem("stressColor", color);
    break;

    case "oxygen-option":
      $('#oxygen-circle').css('stroke', color);
      localStorage.setItem("oxygenColor", color);
    break;

    case "microphone-option":
      $('#microphone-circle').css('stroke', color);
      localStorage.setItem("microphoneColor", color);
    break;

    case "id-option":
      $('#id-circle').css('stroke', color);
      localStorage.setItem("idColor", color);
    break;
  };
}

let progressCircle = (percent, element) => {
  const circle = document.querySelector(element);
  const radius = circle.r.baseVal.value;
  const circumference = radius * 2 * Math.PI;
  const html = $(element).parent().parent().find("span");

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = `${circumference}`;

  const offset = circumference - ((-percent * 100) / 100 / 100) * circumference;
  circle.style.strokeDashoffset = -offset;

  html.text(Math.round(percent));
}