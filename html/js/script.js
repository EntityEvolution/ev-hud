const selection = doc.getElementById('selection')

// Load draggable
window.addEventListener('load', () => {
  frameworkStartUp();
});

// Switches & Cases
this.addEventListener("message", function(event) {
  switch (event.data.action) {
    case "startUp":
      startDraggable();
      startColors();
      startPositions();
      startSliders();
      startColorpicker();
    break;

    case "show":
      startPhone();
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
      if (Config.useFramework) {
        progressCircle(event.data.hunger, ".hunger");
        progressCircle(event.data.thirst, ".thirst");
        if (Config.useStress) {
          progressCircle(event.data.stress, ".stress");
        };
      };
    break;

    case "isPaused":
      cinemaId.style.display = 'none';
      healthCircle.style.display = 'none';
      armorCircle.style.display = 'none';
      staminaCircle.style.display = 'none';
      oxygenCircle.style.display = 'none';
      idCircle.style.display = 'none';
      microphoneCircle.style.display = 'none';
      if (Config.useFramework) {
        hungerCircle.style.display = 'none';
        thirstCircle.style.display = 'none';
        if (Config.useStress) {
          stressCircle.style.display = 'none';
        }
      }
    break;

    case "notPaused":
      if (cinematic) {
        cinemaId.style.display = 'block';
      } else {
        setCircles('show');
        cinemaId.style.display = 'none';
      }
    break

    case "voiceMode":
      progressCircle(event.data.microphone, ".microphone");
    break;

    case "talking":
      if (event.data.talking) {
        $('#microphone-circle').css('stroke', Config.TalkingColor)
      } else {
        $('#microphone-circle').css('stroke', getStored('microphoneColor') || '#ff6f00')
      }
    break;
  }
});

document.onkeyup = function(event) {
  if (event.key == 'Escape') {
      $("#phone").fadeOut();
      $.post('https://ev-hud/close');
      setTimeout(function() {
          phone.style.animation = 'none';
      }, 400)
  }
};

// Initialization
const startDraggable = ()=> {
  $('#health').draggable();
  $("#armor").draggable();
  $("#stamina").draggable();
  $("#oxygen").draggable();
  $("#id").draggable();
  $("#microphone").draggable();
  if (Config.useFramework) {
    $('#hunger').draggable();
    $('#thirst').draggable();
    if (Config.useStress) {
      $('#stress').draggable();
    };
  };
}

const startColors = ()=> {
  $('#health-circle').css('stroke', getStored('healthColor'));
  $('#armor-circle').css('stroke', getStored('armorColor'));
  $('#stamina-circle').css('stroke', getStored('staminaColor'));
  $('#oxygen-circle').css('stroke', getStored('oxygenColor'));
  $('#id-circle').css('stroke', getStored('idColor'));
  $('#microphone-circle').css('stroke', getStored('microphoneColor'));
  if (Config.useFramework) {
    $('#hunger-circle').css('stroke', getStored('hungerColor'));
    $('#thirst-circle').css('stroke', getStored('thirstColor'));
    if (Config.useStress) {
      $("#stress-circle").css('stroke', getStored('stressColor'));
    };
  };
}

const startPositions = ()=> {
  $("#health").animate({ top: getStored('dragHealthTop'), left: getStored('dragHealthLeft')});
  $("#armor").animate({ top: getStored('dragArmorTop'), left: getStored('dragArmorLeft')});
  $("#stamina").animate({ top: getStored('dragStaminaTop'), left: getStored('dragStaminaLeft')});
  $("#oxygen").animate({ top: getStored('dragOxygenTop'), left: getStored('dragOxygenLeft')});
  $("#microphone").animate({ top: getStored('dragMicrophoneTop'), left: getStored('dragMicrophoneLeft')});
  $("#id").animate({ top: getStored('dragIdTop'), left: getStored('dragIdLeft')});
  if (Config.useFramework) {
    $("#hunger").animate({ top: getStored('dragHungerTop'), left: getStored('dragHungerLeft')});
    $("#thirst").animate({ top: getStored('dragThirstTop'), left: getStored('dragThirstLeft')});
    if (Config.useStress) {
      $("#stress").animate({ top: getStored('dragStressTop'), left: getStored('dragStressLeft')});
    };
  };
}

const startColorpicker = ()=> {
  colorPicker.value = rgb2hex($('#health-circle').css('stroke'));
  colorPicker.addEventListener("input", updateColorPicker, false);
  colorPicker.select();
}

const startSliders = ()=> {
  setSliders();
  setContainer('sliderHealth', 'check-health', 'health');
  setContainer('sliderArmor', 'check-armor', 'armor');
  setContainer('sliderStamina', 'check-stamina', 'stamina');
  setContainer('sliderOxygen', 'check-oxygen', 'oxygen');
  setContainer('sliderId', 'check-id', 'id');
  setContainer('sliderMicrophone', 'check-microphone', 'microphone');
  if (Config.useFramework) {
    setContainer('sliderHunger', 'check-hunger', 'hunger');
    setContainer('sliderThirst', 'check-thirst', 'thirst');
    if (Config.useStress) {
      setContainer('sliderStress', 'check-stress', 'stress');
    };
  };
}

const setSliders = ()=> {
  if (null != getId('sliderHealth')) {
    health = getId('sliderHealth')
  }
  if (null != getId('sliderArmor')) {
    armor = getId('sliderArmor')
  }
  if (null != getId('sliderStamina')) {
    stamina = getId('sliderStamina')
  }
  if (null != getId('sliderOxygen')) {
    oxygen = getId('sliderOxygen')
  }
  if (null != getId('sliderId')) {
    id = getId('sliderId')
  }
  if (null != getId('sliderMicrophone')) {
    microphone = getId('sliderMicrophone')
  }
  if (Config.useFramework) {
    if (null != getId('sliderHunger')) {
      hunger = getId('sliderHunger')
    }
    if (null != getId('sliderThirst')) {
      thirst = getId('sliderThirst')
    }
    if (Config.useStress) {
      if (null != getId('sliderStress')) {
        stress = getId('sliderStress')
      }
    };
  }
}

// https://stackoverflow.com/a/3627747
const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

// Color picker function
window.addEventListener('load', ()=> {
  selection.addEventListener('change', ()=> {
    switch (selection.value) {
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

let updateColorPicker = (event)=> {
  let color = event.target.value;
  switch (selection.value) {
    case "health-option":
      $('#health-circle').css('stroke', color);
      saveId('healthColor', color);
    break;

    case "armor-option":
      $('#armor-circle').css('stroke', color);
      saveId('armorColor', color);
    break;

    case "stamina-option":
      $('#stamina-circle').css('stroke', color);
      saveId('staminaColor', color);
    break;

    case "oxygen-option":
      $('#oxygen-circle').css('stroke', color);
      saveId('oxygenColor', color);
    break;

    case "microphone-option":
      $('#microphone-circle').css('stroke', color);
      saveId('microphoneColor', color);
    break;

    case "id-option":
      $('#id-circle').css('stroke', color);
      saveId('idColor', color);
    break;

    case "hunger-option":
      $('#hunger-circle').css('stroke', color);
      saveId('hungerColor', color);
    break;

    case "thirst-option":
      $('#thirst-circle').css('stroke', color);
      saveId('thirstColor', color);
    break;

    case "stress-option":
      $('#stress-circle').css('stroke', color);
      saveId('stressColor', color);
    break;
  };
}

// Circumference
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

// Container
function setContainer(slider, check, container) {
  if (getId(slider) == null) {
    doc.getElementById(check).checked = true;
    return
  } else {
    doc.getElementById(check).checked = getId(slider)
    if (getId(slider)) {
      doc.getElementById(container).style.display = 'inline-block';
    } else {
      doc.getElementById(container).style.display = 'none';
    }
  }
}