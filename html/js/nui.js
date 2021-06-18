const phone = doc.getElementById('phone')
const alertNoti = doc.querySelector('.alert')
const soundNoti = doc.getElementById('audio')
const colorPicker = doc.querySelector('.colorpicker')

let dragHealthTop, dragHealthLeft, dragArmorTop, dragArmorLeft, dragStaminaTop, dragStaminaLeft, dragOxygenTop, dragOxygenLeft, dragMicrophoneTop, dragMicrophoneLeft, dragIdTop, dragIdLeft, dragHungerTop, dragHungerLeft, dragThirstTop, dragThirstLeft, dragStressTop, dragStressLeft;
dragHealthTop = dragHealthLeft = dragArmorTop = dragArmorLeft = dragStaminaTop = dragStaminaLeft = dragOxygenTop = dragOxygenLeft = dragMicrophoneTop = dragMicrophoneLeft = dragIdTop = dragIdLeft = dragHungerTop = dragHungerLeft = dragThirstTop = dragThirstLeft = dragStressTop = dragStressLeft = 0;

// Dark mode
document.querySelector('.invert-btn').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

document.querySelector('.image-exit').addEventListener('click', () => {
    $("#phone").fadeOut();
    $.post('https://ev-hud/close');
    setTimeout(function() {
        phone.style.animation = 'none'
    }, 400)
});

// Notification for saving
document.querySelector('.accept-button').addEventListener('click', () => {
    soundNoti.play();
    $(".reset-buttons").fadeOut();
    $(".accept-button").fadeOut();
    alertNoti.textContent = "Saving settings...."
    alertNoti.style.display = "flex";
    alertNoti.style.animation = "fadeIn 1.5s forwards";
    setTimeout(function() {
        alertNoti.textContent = "Settings have been saved!"
        alertNoti.style.animation = 'none';
    }, 1600)
    setTimeout(function() {
        alertNoti.style.animation = "fadeOut 1.5s forwards";
    }, 4000)
    setTimeout(function() {
        alertNoti.style.display = 'none';
        alertNoti.style.animation = 'none';
        $(".accept-button").fadeIn();
        $(".reset-buttons").fadeIn();
        saveData();
    }, 5600)
});

document.getElementById('reset-color').addEventListener('click', () => {
    soundNoti.play();
    $(".reset-buttons").fadeOut();
    $(".accept-button").fadeOut();
    alertNoti.style.display = "flex";
    alertNoti.style.animation = "fadeIn 1s forwards";
    alertNoti.textContent = "Reseting colors..."
    setTimeout(function() {
        alertNoti.style.animation = 'none';
        alertNoti.textContent = "Saving finished!"
    }, 1100)
    setTimeout(function() {
        alertNoti.style.animation = "fadeOut 1s forwards";
    }, 2500)
    setTimeout(function() {
        alertNoti.style.display = 'none';
        alertNoti.style.animation = 'none';
        resetColors();
    }, 3600)
});

document.getElementById('reset-position').addEventListener('click', () => {
    soundNoti.play();
    $(".reset-buttons").fadeOut();
    $(".accept-button").fadeOut();
    alertNoti.style.display = "flex";
    alertNoti.style.animation = "fadeIn 1s forwards";
    alertNoti.textContent = "Reseting positions..."
    setTimeout(function() {
        alertNoti.style.animation = 'none';
        alertNoti.textContent = "Saving finished!"
    }, 1100)
    setTimeout(function() {
        alertNoti.style.animation = "fadeOut 1s forwards";
    }, 2500)
    setTimeout(function() {
        alertNoti.style.display = 'none';
        alertNoti.style.animation = 'none';
        $(".accept-button").fadeIn();
        $(".reset-buttons").fadeIn();
        resetDrag();
    }, 3600)
});

// Record the position
$("#health").on("dragstop", function(event, ui) {
    dragHealthTop = ui.position.top;
    dragHealthLeft = ui.position.left;
});

$("#armor").on("dragstop", function(event, ui) {
    dragArmorTop = ui.position.top;
    dragArmorLeft = ui.position.left;
});

$("#stamina").on("dragstop", function(event, ui) {
    dragStaminaTop = ui.position.top;
    dragStaminaLeft = ui.position.left;
});

$("#oxygen").on("dragstop", function(event, ui) {
    dragOxygenTop = ui.position.top;
    dragOxygenLeft = ui.position.left;
});

$("#id").on("dragstop", function(event, ui) {
    dragIdTop = ui.position.top;
    dragIdLeft = ui.position.left;
});

$("#microphone").on("dragstop", function(event, ui) {
    dragMicrophoneTop = ui.position.top;
    dragMicrophoneLeft = ui.position.left;
});

if (Config.useFramework) {
    $("#hunger").on("dragstop", function(event, ui) {
        dragHungerTop = ui.position.top;
        dragHungerLeft = ui.position.left;
    });
    
    $("#thirst").on("dragstop", function(event, ui) {
        dragThirstTop = ui.position.top;
        dragThirstLeft = ui.position.left;
    });
    if (Config.useStress) {
        $("#stress").on("dragstop", function(event, ui) {
            dragStressTop = ui.position.top;
            dragStressLeft = ui.position.left;
        });
    };
};

const startPhone = ()=> {
    phone.style.display = 'flex';
    phone.style.animation = "slide 1.5s forwards";
}

const saveData = ()=> {
    saveId('dragHealthTop', dragHealthTop);
    saveId('dragHealthLeft', dragHealthLeft);
    saveId('dragArmorTop', dragArmorTop);
    saveId('dragArmorLeft', dragArmorLeft);
    saveId('dragStaminaTop', dragStaminaTop);
    saveId('dragStaminaLeft', dragStaminaLeft);
    saveId('dragOxygenTop', dragOxygenTop);
    saveId('dragOxygenLeft', dragOxygenLeft);
    saveId('dragIdTop', dragIdTop);
    saveId('dragIdLeft', dragIdLeft);
    saveId('dragMicrophoneTop', dragMicrophoneTop);
    saveId('dragMicrophoneLeft', dragMicrophoneLeft);
    if (Config.useFramework) {
        saveId('dragHungerTop', dragHungerTop);
        saveId('dragHungerLeft', dragHungerLeft);
        saveId('dragThirstTop', dragThirstTop);
        saveId('dragThirstLeft', dragThirstLeft);
        if (Config.useStress) {
            saveId('dragStressTop', dragStressTop);
            saveId('dragStressLeft', dragStressLeft);
        };
    };

    saveId('sliderHealth', health);
    saveId('sliderArmor', armor);
    saveId('sliderStamina', stamina);
    saveId('sliderOxygen', oxygen);
    saveId('sliderMicrophone', microphone);
    saveId('sliderId', id);
    if (Config.useFramework) {
        saveId('sliderHunger', hunger);
        saveId('sliderThirst', thirst);
        if (Config.useStress) {
            saveId('sliderStress', stress);
        };
    };
}

const resetDrag = ()=> {
    $("#health").animate({ top: "0px", left: "0px" });
    saveId('dragHealthTop', '0px');
    saveId('dragHealthLeft', '0px');
    $("#armor").animate({ top: "0px", left: "0px" });
    saveId('dragArmorTop', '0px');
    saveId('dragArmorLeft', '0px');
    $("#stamina").animate({ top: "0px", left: "0px" });
    saveId('dragStaminaTop', '0px');
    saveId('dragStaminaLeft', '0px');
    $("#oxygen").animate({ top: "0px", left: "0px" });
    saveId('dragOxygenTop', '0px');
    saveId('dragOxygenLeft', '0px');
    $("#microphone").animate({ top: "0px", left: "0px" });
    saveId('dragMicrophoneTop', '0px');
    saveId('dragMicrophoneLeft', '0px');
    $("#id").animate({ top: "0px", left: "0px" });
    saveId('dragIdTop', '0px');
    saveId('dragIdLeft', '0px');
    if (Config.useFramework) {
        $("#hunger").animate({top: "0px", left: "0px"});
        saveId('dragHungerTop', '0px');
        saveId('dragHungerLeft', '0px');
        $("#thirst").animate({top: "0px", left: "0px"});
        saveId('dragThirstTop', '0px');
        saveId('dragThirstLeft', '0px');
        if (Config.useStress) {
          $("#stress").animate({top: "0px", left: "0px"});
          saveId('dragStressTop', '0px');
          saveId('dragStressLeft', '0px');
        };
    };
}

const resetColors = ()=> {
    $(".accept-button").fadeIn();
    $(".reset-buttons").fadeIn();
    $('#health-circle').css('stroke', '');
    saveId('healthColor', '');
    $('#armor-circle').css('stroke', '');
    saveId('armorColor', '');
    $('#stamina-circle').css('stroke', '');
    saveId('staminaColor', '');
    $('#oxygen-circle').css('stroke', '');
    saveId('oxygenColor', '');
    $('#microphone-circle').css('stroke', '');
    saveId('microphoneColor', '');
    $('#id-circle').css('stroke', '');
    saveId('idColor', '');
    if (Config.useFramework) {
        $('#hunger-circle').css('stroke', '');
        saveId('hungerColor', '');
        $('#thirst-circle').css('stroke', '');
        saveId('thirstColor', '');
        if (Config.useStress) {
          $('#stress-circle').css('stroke', '');
          saveId('stressColor', '');
        };
    };
    colorPicker.value = rgb2hex($('#health-circle').css('stroke'))
}

// Short localstorage
function saveId(item, check) {
    localStorage.setItem(item, check);
}

function getId(item) {
    let storage = JSON.parse(localStorage.getItem(item));
    return storage
}

function getStored(item) {
    let storage = localStorage.getItem(item)
    return storage
}