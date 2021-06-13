const phone = document.getElementById("phone")

/*$(document).ready(function() {
    phone.style.animation = "slide 1.5s forwards";
    setTimeout(function() {
        phone.style.animation = "none"
    }, 1600)
});
*/

document.querySelector('.invert-btn').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

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