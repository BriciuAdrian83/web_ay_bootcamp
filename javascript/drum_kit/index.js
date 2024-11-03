function handle_click() {
    alert('I got clicked!');
}

const button_elements = document.querySelectorAll('.drum');
const button_elements_length = document.querySelectorAll('.drum').length;
for (let i = 0; i < button_elements_length; i++) {
    button_elements[i].addEventListener('click', handle_click);
}