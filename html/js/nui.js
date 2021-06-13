const phone = document.getElementById("phone")

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

// Notification
document.querySelector('.accept-button').addEventListener('click', () => {
    document.getElementById("audio").play();
    $(".accept-button").fadeOut();
    document.querySelector('.alert').style.display = "flex";
    document.querySelector('.alert').style.animation = "fadeIn 1.5s forwards";
    setTimeout(function() {
        document.querySelector('.alert').style.animation = "none";
    }, 1600)
    setTimeout(function() {
        document.querySelector('.alert').style.animation = "fadeOut 1.5s forwards";
    }, 4000)

    setTimeout(function() {
        document.querySelector('.alert').style.display = "none";
        document.querySelector('.alert').style.animation = "none";
        $(".accept-button").fadeIn();
    }, 5600)
});