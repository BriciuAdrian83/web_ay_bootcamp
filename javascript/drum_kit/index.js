function handle_click() {
    var audio = new Audio('./sounds/tom-1.mp3');
    audio.play();
}

const button_elements = document.querySelectorAll('.drum');
const button_elements_length = document.querySelectorAll('.drum').length;
for (let i = 0; i < button_elements_length; i++) {
    button_elements[i].addEventListener('click', handle_click);
}