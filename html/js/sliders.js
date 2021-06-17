const doc = document

// Sliders vars
const checkHealth = doc.getElementById('check-health')
const checkArmor = doc.getElementById('check-armor')
const checkStamina = doc.getElementById('check-stamina')
const checkOxygen = doc.getElementById('check-oxygen')
const checkMic = doc.getElementById('check-microphone')
const checkCinematic = doc.getElementById('check-cinematic')
const checkId = doc.getElementById('check-id')

// Hud ids
const healthCircle = doc.getElementById('health')
const armorCircle = doc.getElementById('armor')
const staminaCircle = doc.getElementById('stamina')
const oxygenCircle = doc.getElementById('oxygen')
const microphoneCircle = doc.getElementById('microphone')
const idCircle = doc.getElementById('id')
const cinemaId = doc.getElementById('cinematic')

// Framework stuff
const checkHunger = doc.getElementById('check-hunger')
const checkThirst = doc.getElementById('check-thirst')
const hungerCircle = doc.getElementById('hunger')
const thirstCircle = doc.getElementById('thirst')
const hungerSlider = doc.getElementById('hunger-option')
const thirstSlider = doc.getElementById('thirst-option')
const hungerOption = doc.getElementById('hunger-option')
const thirstOption = doc.getElementById('thirst-option')

const checkStress = doc.getElementById('check-stress')
const stressCircle = doc.getElementById('stress')
const stressSlider = doc.getElementById('slider-stress')
const stressOption = doc.getElementById('stress-option')

let health, armor, stamina, oxygen, mic, id, hunger, thirst, stress;
health = armor = stamina = oxygen = mic = id = hunger = thirst = stress = true;

let cinematic = false;

const frameworkStartUp = ()=> {
    if (Config.useFramework && !Config.useStress) {
        stressCircle.style.display = 'none';
        stressSlider.style.display = 'none';
        stressOption.style.display = 'none';
    } else if (Config.useFramework && Config.useStress) {
        return
    } else {
        hungerCircle.style.display = 'none';
        thirstCircle.style.display = 'none';
        stressCircle.style.display = 'none';
        hungerSlider.style.display = 'none';
        thirstSlider.style.display = 'none';
        stressSlider.style.display = 'none';
        hungerOption.style.display = 'none';
        thirstOption.style.display = 'none';
        stressOption.style.display = 'none';
    };
}

// Sliders saving
window.addEventListener('load', () => {
    checkHealth.addEventListener('click', () => {
      health = checkHealth.checked
      if (health) {
        healthCircle.style.display = 'inline-block';
      } else {
        healthCircle.style.display = 'none';
      }
    })
  
    checkArmor.addEventListener('click', () => {
      armor = checkArmor.checked
      if (armor) {
        armorCircle.style.display = 'inline-block';
      } else {
        armorCircle.style.display = 'none'
      }
    })
  
    checkStamina.addEventListener('click', () => {
      stamina = checkStamina.checked
      if (stamina) {
        staminaCircle.style.display = 'inline-block';
      } else {
        staminaCircle.style.display = 'none'
      }
    })
  
    checkOxygen.addEventListener('click', () => {
      oxygen = checkOxygen.checked
      if (oxygen) {
        oxygenCircle.style.display = 'inline-block';
      } else {
        oxygenCircle.style.display = 'none'
      }
    })
  
    checkMic.addEventListener('click', () => {
      microphone = checkMic.checked
      if (microphone) {
        microphoneCircle.style.display = 'inline-block';
      } else {
        microphoneCircle.style.display = 'none'
      }
    })
  
    checkCinematic.addEventListener('click', () => {
      cinematic = checkCinematic.checked
      if (cinematic) {
        setCircles('hide');
      } else {
        cinemaId.style.display = 'none';
        setCircles('show');
      }
    })
  
    checkId.addEventListener('click', () => {
      id = checkId.checked
      if (id) {
        idCircle.style.display = 'inline-block';
      } else {
        idCircle.style.display = 'none';
      }
    })
  
    if (Config.useFramework) {
      checkHunger.addEventListener('click', () => {
        hunger = checkHunger.checked
        if (hunger) {
          hungerCircle.style.display = 'inline-block';
        } else {
          hungerCircle.style.display = 'none'
        }
      })
      
      checkThirst.addEventListener('click', () => {
        thirst = checkThirst.checked
        if (thirst) {
          thirstCircle.style.display = 'inline-block';
        } else {
          thirstCircle.style.display = 'none'
        }
      })
      if (Config.useStress) {
        checkStress.addEventListener('click', () => {
          stress = checkStress.checked
          if (stress) {
            stressCircle.style.display = 'inline-block';
          } else {
            stressCircle.style.display = 'none'
          }
        })
      };
    };
  })

const setCircles = (boolean)=> {
    if (boolean == "show") {
        if (health) {
            healthCircle.style.display = 'inline-block';
        } else {
            healthCircle.style.display = 'none'
        }
        if (armor) {
            armorCircle.style.display = 'inline-block';
        } else {
            armorCircle.style.display = 'none'
        }
        if (stamina) {
            staminaCircle.style.display = 'inline-block';
        } else {
            staminaCircle.style.display = 'none'
        }
        if (oxygen) {
            oxygenCircle.style.display = 'inline-block';
        } else {
            oxygenCircle.style.display = 'none'
        }
        if (id) {
            idCircle.style.display = 'inline-block';
        } else {
            idCircle.style.display = 'none'
        }
        if (mic) {
            microphoneCircle.style.display = 'inline-block';
        } else {
            microphoneCircle.style.display = 'none'
        }
        if (Config.useFramework) {
            if (hunger) {
            hungerCircle.style.display = 'inline-block';
            } else {
            hungerCircle.style.display = 'none'
            }
            if (thirst) {
            thirstCircle.style.display = 'inline-block';
            } else {
            thirstCircle.style.display = 'none'
            }
            if (Config.useStress) {
            if (stress) {
                stressCircle.style.display = 'inline-block';
            } else {
                stressCircle.style.display = 'none'
            }
            };
        };
    } else if (boolean == "hide") {
        cinemaId.style.display = "block";
        healthCircle.style.display = 'none'
        armorCircle.style.display = 'none'
        staminaCircle.style.display = 'none'
        oxygenCircle.style.display = 'none'
        idCircle.style.display = 'none'
        microphoneCircle.style.display = 'none'
        if (Config.useFramework) {
          hungerCircle.style.display = 'none'
          thirstCircle.style.display = 'none'
          if (Config.useStress) {
            stressCircle.style.display = 'none'
          }
        }
    }
}