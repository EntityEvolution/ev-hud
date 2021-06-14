// Sliders vars
const checkHealth = document.getElementById("check-health")
const checkArmor = document.getElementById("check-armor")
const checkStamina = document.getElementById("check-stamina")
const checkOxygen = document.getElementById("check-oxygen")
const checkMic = document.getElementById("check-microphone")
const checkCinematic = document.getElementById("check-cinematic")
const checkId = document.getElementById("check-id")
const checkHunger = document.getElementById("check-hunger")
const checkThirst = document.getElementById("check-thirst")
const checkStress = document.getElementById("check-stress")

let health, armor, stamina, oxygen, mic, id, hunger, thirst, stress;
health = armor = stamina = oxygen = mic = id = hunger = thirst = stress = true;

let cinematic = false;

// Load ESX
window.addEventListener('load', () => {
  if (Config.useESX && !Config.useStress) {
    document.getElementById("stress").style.display = "none";
    document.getElementById("slider-stress").style.display = "none";
    document.getElementById("stress-option").style.display = "none";
  } else if (Config.useESX && Config.useStress) {
    return
  } else {
    document.getElementById("hunger").style.display = "none";
    document.getElementById("thirst").style.display = "none";
    document.getElementById("stress").style.display = "none";
    document.getElementById("slider-hunger").style.display = "none";
    document.getElementById("slider-thirst").style.display = "none";
    document.getElementById("slider-stress").style.display = "none";
    document.getElementById("hunger-option").style.display = "none";
    document.getElementById("thirst-option").style.display = "none";
    document.getElementById("stress-option").style.display = "none";
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
});

// Switches & Cases
window.addEventListener("message", function(event) {
  switch (event.data.action) {
    case "startUp":
      startColorpicker();
      startColors();
      startPositions();
      startSliders();
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

    case "startESX":
      Config.useESX = true
    break;

    case "startStress":
      Config.useStress = true
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

const startSliders = () => {
  health = JSON.parse(localStorage.getItem("sliderHealth"))
  armor = JSON.parse(localStorage.getItem("sliderArmor"))
  stamina = JSON.parse(localStorage.getItem("sliderStamina"))
  oxygen = JSON.parse(localStorage.getItem("sliderOxygen"))
  id = JSON.parse(localStorage.getItem("sliderId"))
  mic = JSON.parse(localStorage.getItem("sliderMic"))
  cinematic = JSON.parse(localStorage.getItem("sliderCinematic"))

  if (Config.useESX) {
    hunger = JSON.parse(localStorage.getItem("sliderHunger"))
    thirst = JSON.parse(localStorage.getItem("sliderThirst"))
    if (Config.useStress) {
      stress = JSON.parse(localStorage.getItem("sliderStress"))
    };
  }
  if (JSON.parse(localStorage.getItem("sliderHealth")) == null) {
    checkHealth.checked = true;
  } else {
    checkHealth.checked = JSON.parse(localStorage.getItem("sliderHealth")); 
    if (JSON.parse(localStorage.getItem("sliderHealth"))) {
      document.getElementById("health").style.display = "";
    } else {
      document.getElementById("health").style.display = "none"
    }
  }

  if (JSON.parse(localStorage.getItem("sliderArmor")) == null) {
    checkArmor.checked = true;
  } else {
    checkArmor.checked = JSON.parse(localStorage.getItem("sliderArmor")); 
    if (JSON.parse(localStorage.getItem("sliderArmor"))) {
      document.getElementById("armor").style.display = "";
    } else {
      document.getElementById("armor").style.display = "none"
    }
  }

  if (JSON.parse(localStorage.getItem("sliderStamina")) == null) {
    checkStamina.checked = true;
  } else {
    checkStamina.checked = JSON.parse(localStorage.getItem("sliderStamina")); 
    if (JSON.parse(localStorage.getItem("sliderStamina"))) {
      document.getElementById("stamina").style.display = "";
    } else {
      document.getElementById("stamina").style.display = "none"
    }
  }

  if (JSON.parse(localStorage.getItem("sliderOxygen")) == null) {
    checkOxygen.checked = true;
  } else {
    checkOxygen.checked = JSON.parse(localStorage.getItem("sliderOxygen")); 
    if (JSON.parse(localStorage.getItem("sliderOxygen"))) {
      document.getElementById("oxygen").style.display = "";
    } else {
      document.getElementById("oxygen").style.display = "none"
    }
  }

  if (JSON.parse(localStorage.getItem("sliderMic")) == null) {
    checkMic.checked = true;
  } else {
    checkMic.checked = JSON.parse(localStorage.getItem("sliderMic")); 
    if (JSON.parse(localStorage.getItem("sliderMic"))) {
      document.getElementById("microphone").style.display = "";
    } else {
      document.getElementById("microphone").style.display = "none"
    }
  }

  if (JSON.parse(localStorage.getItem("sliderId")) == null) {
    checkId.checked = true;
  } else {
    checkId.checked = JSON.parse(localStorage.getItem("sliderId")); 
    if (JSON.parse(localStorage.getItem("sliderId"))) {
      document.getElementById("id").style.display = "";
    } else {
      document.getElementById("id").style.display = "none"
    }
  }

  if (JSON.parse(localStorage.getItem("sliderCinematic")) == null) {
    checkCinematic.checked = false;
  } else {
    checkCinematic.checked = JSON.parse(localStorage.getItem("sliderCinematic")); 
    if (JSON.parse(localStorage.getItem("sliderCinematic"))) {
      document.getElementById("cinematic").style.display = "block";
    } else {
      document.getElementById("cinematic").style.display = "none"
    }
  }

  if (Config.useESX) {
    if (JSON.parse(localStorage.getItem("sliderHunger")) == null) {
      checkHunger.checked = true;
    } else {
      checkHunger.checked = JSON.parse(localStorage.getItem("sliderHunger")); 
      if (JSON.parse(localStorage.getItem("sliderHunger"))) {
        document.getElementById("hunger").style.display = "";
      } else {
        document.getElementById("hunger").style.display = "none"
      }
    }

    if (JSON.parse(localStorage.getItem("sliderThirst")) == null) {
      checkThirst.checked = true;
    } else {
      checkThirst.checked = JSON.parse(localStorage.getItem("sliderThirst")); 
      if (JSON.parse(localStorage.getItem("sliderThirst"))) {
        document.getElementById("thirst").style.display = "";
      } else {
        document.getElementById("thirst").style.display = "none"
      }
    }
    if (Config.useStress) {
      if (JSON.parse(localStorage.getItem("sliderStress")) == null) {
        checkStress.checked = true;
      } else {
        checkStress.checked = JSON.parse(localStorage.getItem("sliderStress")); 
        if (JSON.parse(localStorage.getItem("sliderStress"))) {
          document.getElementById("stress").style.display = "";
        } else {
          document.getElementById("stress").style.display = "none"
        }
      }
    };
  };
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

// Sliders saving
window.addEventListener('load', () => {
  checkHealth.addEventListener("click", () => {
    health = checkHealth.checked
    if (health) {
      document.getElementById("health").style.display = "";
    } else {
      document.getElementById("health").style.display = "none"
    }
  })

  checkArmor.addEventListener("click", () => {
    armor = checkArmor.checked
    if (armor) {
      document.getElementById("armor").style.display = "";
    } else {
      document.getElementById("armor").style.display = "none"
    }
  })

  checkStamina.addEventListener("click", () => {
    stamina = checkStamina.checked
    if (stamina) {
      document.getElementById("stamina").style.display = "";
    } else {
      document.getElementById("stamina").style.display = "none"
    }
  })

  checkOxygen.addEventListener("click", () => {
    oxygen = checkOxygen.checked
    if (oxygen) {
      document.getElementById("oxygen").style.display = "";
    } else {
      document.getElementById("oxygen").style.display = "none"
    }
  })

  checkMic.addEventListener("click", () => {
    mic = checkMic.checked
    if (mic) {
      document.getElementById("microphone").style.display = "";
    } else {
      document.getElementById("microphone").style.display = "none"
    }
  })

  checkCinematic.addEventListener("click", () => {
    cinematic = checkCinematic.checked
    if (cinematic) {
      document.getElementById("cinematic").style.display = "block";
    } else {
      document.getElementById("cinematic").style.display = "none"
    }
  })

  checkId.addEventListener("click", () => {
    id = checkId.checked
    if (id) {
      document.getElementById("id").style.display = "";
    } else {
      document.getElementById("id").style.display = "none"
    }
  })

  if (Config.useESX) {
    checkHunger.addEventListener("click", () => {
      hunger = checkHunger.checked
      if (health) {
        document.getElementById("hunger").style.display = "";
      } else {
        document.getElementById("hunger").style.display = "none"
      }
    })
    
    checkThirst.addEventListener("click", () => {
      thirst = checkThirst.checked
      if (thirst) {
        document.getElementById("thirst").style.display = "";
      } else {
        document.getElementById("thirst").style.display = "none"
      }
    })
    if (Config.useStress) {
      checkStress.addEventListener("click", () => {
        stress = checkStress.checked
        if (stress) {
          document.getElementById("stress").style.display = "";
        } else {
          document.getElementById("stress").style.display = "none"
        }
      })
    };
  };
})

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