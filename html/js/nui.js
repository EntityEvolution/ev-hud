// ESX Initialization
let useESX = false
let useStress = false

const phone = document.getElementById('phone')
const alertNoti = document.querySelector('.alert')
const soundNoti = document.getElementById('audio')
const colorPicker = document.querySelector('.colorpicker')

let dragHealthTop, dragHealthLeft, dragArmorTop, dragArmorLeft, dragStaminaTop, dragStaminaLeft, dragOxygenTop, dragOxygenLeft, dragMicTop, dragMicLeft, dragIdTop, dragIdLeft, dragHungerTop, dragHungerLeft, dragThirstTop, dragThirstLeft, dragStressTop, dragStressLeft;
dragHealthTop = dragHealthLeft = dragArmorTop = dragArmorLeft = dragStaminaTop = dragStaminaLeft = dragOxygenTop = dragOxygenLeft = dragMicTop = dragMicLeft = dragIdTop = dragIdLeft = dragHungerTop = dragHungerLeft = dragThirstTop = dragThirstLeft = dragStressTop = dragStressLeft = 0;

// Dark mode
document.querySelector('.invert-btn').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Show and hide phone
window.addEventListener("message", function(event) {
    switch (event.data.action) {
        case "show":
            $("#phone").show();
            phone.style.animation = "slide 1.5s forwards";
        break;
    }
})

document.querySelector('.image-exit').addEventListener('click', () => {
    $("#phone").fadeOut();
    $.post('https://ev-hud/close');
    setTimeout(function() {
        phone.style.animation = "none"
    }, 400)
});

document.onkeyup = function (event) {
    if (event.key == 'Escape') {
        $("#phone").fadeOut();
        $.post('https://ev-hud/close');
        setTimeout(function() {
            phone.style.animation = "none"
        }, 400)
    }
};

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
        alertNoti.style.animation = "none";
    }, 1600)
    setTimeout(function() {
        alertNoti.style.animation = "fadeOut 1.5s forwards";
    }, 4000)
    setTimeout(function() {
        alertNoti.style.display = "none";
        alertNoti.style.animation = "none";
        $(".accept-button").fadeIn();
        $(".reset-buttons").fadeIn();
        
        // Save all position data
        localStorage.setItem("dragHealthTop", dragHealthTop);
        localStorage.setItem("dragHealthLeft", dragHealthLeft);

        localStorage.setItem("dragArmorTop", dragArmorTop);
        localStorage.setItem("dragArmorLeft", dragArmorLeft);

        localStorage.setItem("dragStaminaTop", dragStaminaTop);
        localStorage.setItem("dragStaminaLeft", dragStaminaLeft);

        localStorage.setItem("dragOxygenTop", dragOxygenTop);
        localStorage.setItem("dragOxygenLeft", dragOxygenLeft);

        localStorage.setItem("dragIdTop", dragIdTop);
        localStorage.setItem("dragIdLeft", dragIdLeft);

        localStorage.setItem("dragMicTop", dragMicTop);
        localStorage.setItem("dragMicLeft", dragMicLeft);

        if (useESX) {
            localStorage.setItem("dragHungerTop", dragHungerTop);
            localStorage.setItem("dragHungerLeft", dragHungerLeft);
            
            localStorage.setItem("dragThirstTop", dragThirstTop);
            localStorage.setItem("dragThirstLeft", dragThirstLeft);
            if (useStress) {
                localStorage.setItem("dragStressTop", dragTop);
                localStorage.setItem("dragStressLeft", dragLeft);
            };
        };

        // Save sliders data
        localStorage.setItem("sliderHealth", health)
        localStorage.setItem("sliderArmor", armor)
        localStorage.setItem("sliderStamina", stamina)
        localStorage.setItem("sliderOxygen", oxygen)
        localStorage.setItem("sliderMic", mic)
        localStorage.setItem("sliderId", id)
        localStorage.setItem("sliderCinematic", cinematic)
        if (useESX) {
            localStorage.setItem("sliderHunger", hunger)
            localStorage.setItem("sliderThirst", thirst)
            if (useStress) {
                localStorage.setItem("sliderStress", stress)
            };
        };
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
        alertNoti.style.animation = "none";
        alertNoti.textContent = "Saving finished!"
    }, 1100)
    setTimeout(function() {
        alertNoti.style.animation = "fadeOut 1s forwards";
    }, 2500)
    setTimeout(function() {
        alertNoti.style.display = "none";
        alertNoti.style.animation = "none";
        $(".accept-button").fadeIn();
        $(".reset-buttons").fadeIn();
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
        if (useESX) {
            $('#hunger-circle').css('stroke', '');
            localStorage.setItem("hungerColor", '');
            $('#thirst-circle').css('stroke', '');
            localStorage.setItem("thirstColor", '');
            if (useStress) {
              $('#stress-circle').css('stroke', '');
              localStorage.setItem("stressColor", '');
            };
        };
        colorPicker.value = rgb2hex($('#health-circle').css('stroke'))
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
        alertNoti.style.animation = "none";
        alertNoti.textContent = "Saving finished!"
    }, 1100)
    setTimeout(function() {
        alertNoti.style.animation = "fadeOut 1s forwards";
    }, 2500)
    setTimeout(function() {
        alertNoti.style.display = "none";
        alertNoti.style.animation = "none";
        $(".accept-button").fadeIn();
        $(".reset-buttons").fadeIn();
        $("#health").animate({ top: "0px", left: "0px" });
        localStorage.setItem("dragHealthTop", "0px");
        localStorage.setItem("dragHealthLeft", "0px");
        $("#armor").animate({ top: "0px", left: "0px" });
        localStorage.setItem("dragArmorTop", "0px");
        localStorage.setItem("dragArmorLeft", "0px");
        $("#stamina").animate({ top: "0px", left: "0px" });
        localStorage.setItem("dragStaminaTop", "0px");
        localStorage.setItem("dragStaminaLeft", "0px");
        $("#oxygen").animate({ top: "0px", left: "0px" });
        localStorage.setItem("dragOxygenTop", "0px");
        localStorage.setItem("dragOxygenLeft", "0px");
        $("#microphone").animate({ top: "0px", left: "0px" });
        localStorage.setItem("dragMicTop", "0px");
        localStorage.setItem("dragMicLeft", "0px");
        $("#id").animate({ top: "0px", left: "0px" });
        localStorage.setItem("dragIdTop", "0px");
        localStorage.setItem("dragIdLeft", "0px");
        if (useESX) {
            $("#hunger").animate({top: "0px", left: "0px"});
            localStorage.setItem("dragHungerTop", "0px");
            localStorage.setItem("dragHungerLeft", "0px");
            $("#thirst").animate({top: "0px", left: "0px"});
            localStorage.setItem("dragThirstTop", "0px");
            localStorage.setItem("dragThirstLeft", "0px");
            if (useStress) {
              $("#stress").animate({top: "0px", left: "0px"});
              localStorage.setItem("dragStressTop", "0px");
              localStorage.setItem("dragStressLeft", "0px");
            };
        };
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
    dragMicTop = ui.position.top;
    dragMicLeft = ui.position.left;
});

if (useESX) {
    $("#hunger").on("dragstop", function(event, ui) {
        dragHungerTop = ui.position.top;
        dragHungerLeft = ui.position.left;
    });
    
    $("#thirst").on("dragstop", function(event, ui) {
        dragThirstTop = ui.position.top;
        dragThirstLeft = ui.position.left;
    });
    if (useStress) {
        $("#stress").on("dragstop", function(event, ui) {
            dragStressTop = ui.position.top;
            dragStressLeft = ui.position.left;
        });
    };
};