$(document).ready(function() {
  if (Config.useESX) {
    document.getElementById("hunger").style.display = "";
    document.getElementById("thirst").style.display = "";
    document.getElementById("hunger-thirst").style.display = "";
    document.getElementById("hunger-option").style.display = "";
    document.getElementById("thirst-option").style.display = "";
    document.getElementById("stress").style.display = "none";
    document.getElementById("stress-show").style.display = "none";
    document.getElementById("stress-button").style.display = "none";
    document.getElementById("stress-option").style.display = "none";
    if (Config.useStress) {
      document.getElementById("stress").style.display = "";
      document.getElementById("stress-show").style.display = "";
      document.getElementById("stress-button").style.display = "";
      document.getElementById("stress-option").style.display = "";
    };
  } else {
    document.getElementById("hunger").style.display = "none";
    document.getElementById("thirst").style.display = "none";
    document.getElementById("stress").style.display = "none";
    document.getElementById("hunger-thirst").style.display = "none";
    document.getElementById("stress-show").style.display = "none";
    document.getElementById("stress-button").style.display = "none";
    document.getElementById("hunger-option").style.display = "none";
    document.getElementById("thirst-option").style.display = "none";
    document.getElementById("stress-option").style.display = "none";
  };
});

// Set everything to be draggable
$(function() {
  if (Config.useESX) {
    $('#hunger').draggable({
      drag: function(event, ui){
        dragpositionHungerTop = ui.position.top;
        dragpositionHungerLeft = ui.position.left;
        localStorage.setItem("hungerTop", dragpositionHungerTop);
        localStorage.setItem("hungerLeft", dragpositionHungerLeft);
      }
    });
    $('#thirst').draggable({
      drag: function(event, ui){
        dragpositionThirstTop = ui.position.top;
        dragpositionThirstLeft = ui.position.left;
        localStorage.setItem("thirstTop", dragpositionThirstTop);
        localStorage.setItem("thirstLeft", dragpositionThirstLeft);
      }
    });
    if (Config.useStress) {
      $('#stress').draggable({
        drag: function(event, ui){
          dragpositionStressTop = ui.position.top;
          dragpositionStressLeft = ui.position.left;
          localStorage.setItem("stressTop", dragpositionStressTop);
          localStorage.setItem("stressLeft", dragpositionStressLeft);
        }
      });
    };
  };
  $('#health').draggable({
    drag: function(event, ui){
      dragpositionHealthTop = ui.position.top;
      dragpositionHealthLeft = ui.position.left;
      localStorage.setItem("healthTop", dragpositionHealthTop);
      localStorage.setItem("healthLeft", dragpositionHealthLeft);
    }
  });
  $("#armor").draggable({
    drag: function(event, ui){
      dragpositionArmorTop = ui.position.top;
      dragpositionArmorLeft = ui.position.left;
      localStorage.setItem("armorTop", dragpositionArmorTop);
      localStorage.setItem("armorLeft", dragpositionArmorLeft);
    }
  });
  $("#stamina").draggable({
    drag: function(event, ui){
      dragpositionStaminaTop = ui.position.top;
      dragpositionStaminaLeft = ui.position.left;
      localStorage.setItem("staminaTop", dragpositionStaminaTop);
      localStorage.setItem("staminaLeft", dragpositionStaminaLeft);
    }
  });
  $("#oxygen").draggable({
    drag: function(event, ui){
      dragpositionOxygenTop = ui.position.top;
      dragpositionOxygenLeft = ui.position.left;
      localStorage.setItem("oxygenTop", dragpositionOxygenTop);
      localStorage.setItem("oxygenLeft", dragpositionOxygenLeft);
    }
  });
  $("#id").draggable({
    drag: function(event, ui){
      dragpositionIdTop = ui.position.top;
      dragpositionIdLeft = ui.position.left;
      localStorage.setItem("idTop", dragpositionIdTop);
      localStorage.setItem("idLeft", dragpositionIdLeft);
    }
  });
  $("#microphone").draggable({
    drag: function(event, ui){
      dragpositionMicrophoneTop = ui.position.top;
      dragpositionMicrophoneLeft = ui.position.left;
      localStorage.setItem("microphoneTop", dragpositionMicrophoneTop);
      localStorage.setItem("microphoneLeft", dragpositionMicrophoneLeft);
    }
  });
  $("#drag-browser").draggable();
});

// Switches & Cases
window.addEventListener("message", function(event) {
  switch (event.data.action) {
    case "show":
      $("#drag-browser").fadeIn();
    break;

    case "hide":
      $("#drag-browser").fadeOut();
    break;

    case "setColors":
      if (Config.useESX) {
        $('#hunger-circle').css('stroke', localStorage.getItem("hungerColor"));
        $('#thirst-circle').css('stroke', localStorage.getItem("thirstColor"));
        if (Config.useStress) {
          $("#stress-circle").css('stroke', localStorage.getItem("stressColor"));
        };
      };
      $('#health-circle').css('stroke', localStorage.getItem("healthColor"));
      $('#armor-circle').css('stroke', localStorage.getItem("armorColor"));
      $('#stamina-circle').css('stroke', localStorage.getItem("staminaColor"));
      $('#oxygen-circle').css('stroke', localStorage.getItem("oxygenColor"));
      $('#id-circle').css('stroke', localStorage.getItem("idColor"));
      $('#microphone-circle').css('stroke', localStorage.getItem("microphoneColor"));
    break;

    case "setPosition":
      if (Config.useESX) {
        $("#hunger").animate({ top: localStorage.getItem("hungerTop"), left: localStorage.getItem("hungerLeft") });
        $("#thirst").animate({ top: localStorage.getItem("thirstTop"), left: localStorage.getItem("thirstLeft") });
        if (Config.useStress) {
          $("#stress").animate({ top: localStorage.getItem("stressTop"), left: localStorage.getItem("stressLeft") });
        };
      };
      $("#health").animate({ top: localStorage.getItem("healthTop"), left: localStorage.getItem("healthLeft") });
      $("#armor").animate({ top: localStorage.getItem("armorTop"), left: localStorage.getItem("armorLeft") });
      $("#stamina").animate({ top: localStorage.getItem("staminaTop"), left: localStorage.getItem("staminaLeft") });
      $("#oxygen").animate({ top: localStorage.getItem("oxygenTop"), left: localStorage.getItem("oxygenLeft") });
      $("#microphone").animate({ top: localStorage.getItem("microphoneTop"), left: localStorage.getItem("microphoneLeft") });
      $("#id").animate({ top: localStorage.getItem("idTop"), left: localStorage.getItem("idLeft") });
    break;

    // Send Data
    case "hud":
      if (Config.useESX) {
        progressCircle(event.data.hunger, ".hunger");
        progressCircle(event.data.thirst, ".thirst");
        if (Config.useStress) {
          progressCircle(event.data.stress, ".stress");
        };
      };
        progressCircle(event.data.health, ".health");
        progressCircle(event.data.armor, ".armor");
        progressCircle(event.data.stamina, ".stamina");
        progressCircle(event.data.oxygen, ".oxygen");
        progressCircle(event.data.players, ".id");
        $("#idnumber").text(event.data.id);
        $("#time").text(event.data.time);
    break;

    case "microphone":
      progressCircle(event.data.microphone, ".microphone");
    break;

    // Hide elements
    case "healthHide":
      $("#health").fadeOut();
    break;

    case "armorHide":
      $("#armor").fadeOut();
    break;

    case "staminaHide":
      $("#stamina").fadeOut();
    break;

    case "hungerHide":
      $("#hunger").fadeOut();
    break;

    case "thirstHide":
      $("#thirst").fadeOut();
    break;

    case "stressHide":
      $("#stress").fadeOut();
    break;

    case "oxygenHide":
      $("#oxygen").fadeOut();
    break;

    case "idHide":
      $("#id").fadeOut();
    break;

    case "cinematicHide":
      $("#cinematic").fadeOut();
    break;

    case "timeHide":
      $("#time").fadeOut();
    break;

    case "microphoneHide":
      $("#microphone").fadeOut();
    break;

    // Show elements
    case "healthShow":
      $("#health").fadeIn();
    break;

    case "armorShow":
      $("#armor").fadeIn();
    break;

    case "staminaShow":
      $("#stamina").fadeIn();
    break;

    case "hungerShow":
      $("#hunger").fadeIn();
    break;

    case "thirstShow":
      $("#thirst").fadeIn();
    break;
    
    case "stressShow":
      $("#stress").fadeIn();
    break;

    case "oxygenShow":
      $("#oxygen").fadeIn();
    break;

    case "idShow":
      $("#id").fadeIn();
    break;

    case "cinematicShow":
      $("#cinematic").fadeIn();
    break;

    case "timeShow":
      $("#time").fadeIn();
    break;

    case "microphoneShow":
      $("#microphone").fadeIn();
    break;

    // Pulse elements
    case "healthStart":
      document.getElementById("health").style.animation = "pulse 1.5s linear infinite";
    break;

    case "healthStop":
      document.getElementById("health").style.animation = "none";
    break;

    case "armorStart":
      document.getElementById("armor").style.animation = "pulse 1.5s linear infinite";
    break;

    case "armorStop":
      document.getElementById("armor").style.animation = "none";
    break;

    case "staminaStart":
      document.getElementById("stamina").style.animation = "pulse 1.5s linear infinite";
    break;

    case "staminaStop":
      document.getElementById("stamina").style.animation = "none";
    break;

    case "oxygenStart":
      document.getElementById("oxygen").style.animation = "pulse 1.5s linear infinite";
    break;

    case "oxygenStop":
      document.getElementById("oxygen").style.animation = "none";
    break;
  }
});

$(function () {
  $('#color-block').on('colorchange', function () {
    let color = $(this).wheelColorPicker('value')
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

      case "time-option":
        $('#time').css('color', color);
      break;
    };
  });
});

// Click functions
if (Config.useESX) {
  $("#hunger-switch").click(function() {$.post('https://pe-hud/change', JSON.stringify({action: 'hunger'}));});
  $("#thirst-switch").click(function() {$.post('https://pe-hud/change', JSON.stringify({action: 'thirst'}));});
  if (Config.useStress) {
    $("#stress-switch").click(function() {$.post('https://pe-hud/change', JSON.stringify({action: 'stress'}));});
  };
};
$("#health-switch").click(function () { $.post('https://pe-hud/change', JSON.stringify({ action: 'health' })); });
$("#armor-switch").click(function () { $.post('https://pe-hud/change', JSON.stringify({ action: 'armor' })); });
$("#stamina-switch").click(function () { $.post('https://pe-hud/change', JSON.stringify({ action: 'stamina' })); });
$("#oxygen-switch").click(function () { $.post('https://pe-hud/change', JSON.stringify({ action: 'oxygen' })) });
$("#map-switch").click(function () { $.post('https://pe-hud/change', JSON.stringify({ action: 'map' })) });
$("#id-switch").click(function () { $.post('https://pe-hud/change', JSON.stringify({ action: 'id' })) });
$("#cinematic-switch").click(function () { $.post('https://pe-hud/change', JSON.stringify({ action: 'cinematic' })) });
$("#time-switch").click(function () { $.post('https://pe-hud/change', JSON.stringify({ action: 'time' })) });
$("#microphone-switch").click(function () { $.post('https://pe-hud/change', JSON.stringify({ action: 'microphone' })) });
$("#reset").click(function () { $("#drag-browser").animate({ top: "", left: "50%" }); });
$("#close").click(function () { $.post('https://pe-hud/close');});

$("#reset-position").click(function () {
  if (Config.useESX) {
    $("#hunger").animate({top: "0px", left: "0px"});
    localStorage.setItem("hungerTop", "0px");
    localStorage.setItem("hungerLeft", "0px");
    $("#thirst").animate({top: "0px", left: "0px"});
    localStorage.setItem("thirstTop", "0px");
    localStorage.setItem("thirstLeft", "0px");
    if (Config.useStress) {
      $("#stress").animate({top: "0px", left: "0px"});
      localStorage.setItem("stressTop", "0px");
      localStorage.setItem("stressLeft", "0px");
    };
  };
  $("#health").animate({ top: "0px", left: "0px" });
  localStorage.setItem("healthTop", "0px");
  localStorage.setItem("healthLeft", "0px");
  $("#armor").animate({ top: "0px", left: "0px" });
  localStorage.setItem("armorTop", "0px");
  localStorage.setItem("armorLeft", "0px");
  $("#stamina").animate({ top: "0px", left: "0px" });
  localStorage.setItem("staminaTop", "0px");
  localStorage.setItem("staminaLeft", "0px");
  $("#oxygen").animate({ top: "0px", left: "0px" });
  localStorage.setItem("oxygenTop", "0px");
  localStorage.setItem("oxygenLeft", "0px");
  $("#id").animate({ top: "0px", left: "0px" });
  localStorage.setItem("idTop", "0px");
  localStorage.setItem("idLeft", "0px");
  $("#time").animate({ top: "0px", left: "50%" });
  $("#microphone").animate({ top: "0px", left: "0px" });
  localStorage.setItem("microphoneTop", "0px");
  localStorage.setItem("microphoneLeft", "0px");
});

$("#reset-color").click(function () {
  if (Config.useESX) {
    $('#hunger-circle').css('stroke', '');
    localStorage.setItem("hungerColor", '');
    $('#thirst-circle').css('stroke', '');
    localStorage.setItem("thirstColor", '');
    if (Config.useStress) {
      $('#stress-circle').css('stroke', '');
      localStorage.setItem("stressColor", '');
    };
  };
  $('#health-circle').css('stroke', '');
  localStorage.setItem("healthColor", '');
  $('#armor-circle').css('stroke', '');
  localStorage.setItem("armorColor", '');
  $('#stamina-circle').css('stroke', '');
  localStorage.setItem("staminaColor", '');
  $('#oxygen-circle').css('stroke', '');
  localStorage.setItem("oxygenColor", '');
  $('#microphone-circle').css('stroke', '');
  localStorage.setItem("microphoneColor", '');
  $('#id-circle').css('stroke', '');
  localStorage.setItem("idColor", '');
  $('#time').css('color', '');
});
// Color picker function
$(function () {
  $('#color-block').on('colorchange', function () {
    let color = $(this).wheelColorPicker('value');
    let alpha = $(this).wheelColorPicker('color').a;
    $('.color-preview-box').css('background-color', color);
    $('.color-preview-alpha').text(Math.round(alpha * 100) + '%');
  });
});

// Just for print values easier
function print(value) {
  console.log(value)
}

// Exit function
document.onkeyup = function (event) {
  if (event.key == 'Escape') {
    $.post('https://pe-hud/close');
  }
};
// Function for progress bars
function progressCircle(percent, element) {
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
