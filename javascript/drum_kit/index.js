
function animate_button(letter) {
    var active_button = document.querySelector('.' + letter);
    active_button.classList.add('pressed');
    setTimeout(function () {
        active_button.classList.remove('pressed');
    }, 100);
}

function play_audio_and_animate_when_click() {
    var letter = this.innerHTML;
    var audio = new Audio('./sounds/' + obj_letter_to_song_files[letter] + '.mp3');
    audio.play();
    animate_button(letter);

}

function play_audiow_when_key_event(event) {
    var keys = ['w', 'a', 's', 'd', 'j', 'k', 'l'];
    if (keys.includes(event.key)) {
        var letter = event.key;
        var audio = new Audio('./sounds/' + obj_letter_to_song_files[letter] + '.mp3');
        audio.play();
        animate_button(letter);
    }
}


// Main
const obj_letter_to_song_files = {
    'w': 'tom-1',
    'a': 'tom-2',
    's': 'tom-3',
    'd': 'tom-4',
    'j': 'snare',
    'k': 'crash',
    'l': 'kick-bass'
};
const button_elements = document.querySelectorAll('.drum');
const button_elements_length = document.querySelectorAll('.drum').length;
for (let i = 0; i < button_elements_length; i++) {
    button_elements[i].addEventListener('click', play_audio_and_animate_when_click);
}
document.addEventListener('keydown', event => play_audiow_when_key_event(event));
