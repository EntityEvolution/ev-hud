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
const hungerSlider = doc.getElementById('slider-hunger')
const thirstSlider = doc.getElementById('slider-thirst')
const hungerOption = doc.getElementById('hunger-option')
const thirstOption = doc.getElementById('thirst-option')

const checkStress = doc.getElementById('check-stress')
const stressCircle = doc.getElementById('stress')
const stressSlider = doc.getElementById('slider-stress')
const stressOption = doc.getElementById('stress-option')

let health, armor, stamina, oxygen, microphone, id, hunger, thirst, stress;
health = armor = stamina = oxygen = microphone = id = hunger = thirst = stress = true;

let cinematic = false;

// Sliders saving
window.addEventListener('load', () => {

    checkHealth.addEventListener('click', () => {
        health = checkHealth.checked;
        healthCircle.style.display = health ? 'inline-block' : 'none';
    })
  
    checkArmor.addEventListener('click', () => {
        armor = checkArmor.checked;
        armorCircle.style.display = armor ? 'inline-block' : 'none';
    })
  
    checkStamina.addEventListener('click', () => {
        stamina = checkStamina.checked;
        staminaCircle.style.display = stamina ? 'inline-block' : 'none';
    })
  
    checkOxygen.addEventListener('click', () => {
        oxygen = checkOxygen.checked;
        oxygenCircle.style.display = oxygen ? 'inline-block' : 'none';
    })
  
    checkMic.addEventListener('click', () => {
        microphone = checkMic.checked;
        microphoneCircle.style.display = microphone ? 'inline-block' : 'none';
    })
  
    checkCinematic.addEventListener('click', () => {
        
        cinematic = checkCinematic.checked;
        
        doc.getElementById('top').style.animation = cinematic ? 'slideDown 1.0s forwards' : 'slideBackUp 1.0s forwards';
        doc.getElementById('bottom').style.animation = cinematic ? 'slideUp 1.0s forwards' : 'slideBackDown 1.0s forwards';
        
        setCircles(cinematic ? 'hide' : 'show'); // moved this one up sinds the code below was executed later anyway
        // https://www.youtube.com/watch?v=Kpn2ajSa92c <-- check out thisone for a better understanding

        setTimeout(() => {
            
            cinemaId.style.animation = 'none';
            
        }, 1100)
        
    })
  
    checkId.addEventListener('click', () => {
        id = checkId.checked
        idCircle.style.display = id ? 'inline-block' : 'none';
    })
  
    if (!Config.useFramework) return;
    checkHunger.addEventListener('click', () => {
        hunger = checkHunger.checked
        hungerCircle.style.display = hunger ? 'inline-block' : 'none';
    })
    checkThirst.addEventListener('click', () => {
        thirst = checkThirst.checked
        thirstCircle.style.display = thirst ? 'inline-block' : 'none';
    })

    if (!Config.useStress) return;
    checkStress.addEventListener('click', () => {
        stress = checkStress.checked
        stressCircle.style.display = stress ? 'inline-block' : 'none';
    })
})

const setCircles = state => {

    switch (state) {  // changed 'boolean' to state cus yea bool only returns true or false
            
        case "show":
            
            healthCircle.style.display = health ? 'inline-block' : 'none';
            armorCircle.style.display = armor ? 'inline-block' : 'none';
            staminaCircle.style.display = stamina ? 'inline-block' : 'none';
            oxygenCircle.style.display = oxygen ? 'inline-block' : 'none';
            idCircle.style.display = id ? 'inline-block' : 'none';
            microphoneCircle.style.display = microphone ? 'inline-block' : 'none';
            
            if (!Config.useFramework) break;
            hungerCircle.style.display = hunger ? 'inline-block' : 'none';
            thirstCircle.style.display = thirst ? 'inline-block' : 'none';
            
            if (!Config.useStress) break;
            stressCircle.style.display = stress ? 'inline-block' : 'none';
            
            break;
        case "hide":

            cinemaId.style.display = 'block';
            healthCircle.style.display = 'none';
            armorCircle.style.display = 'none';
            staminaCircle.style.display = 'none';
            oxygenCircle.style.display = 'none';
            idCircle.style.display = 'none';
            microphoneCircle.style.display = 'none';
    
            if (!Config.useFramework) break;
            hungerCircle.style.display = 'none';
            thirstCircle.style.display = 'none';

            if (!Config.useStress) break;
            stressCircle.style.display = 'none';
            break;

    }
}

const frameworkStartUp = () => {
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
