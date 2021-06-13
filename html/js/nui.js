document.querySelector('.image-exit').addEventListener('click', () => {
    $('#phone').animate({
        top: "0",
        left: "0"
    }, 500)
})

const toggleButton = document.querySelector('.invert-btn');

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});