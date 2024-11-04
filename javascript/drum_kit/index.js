function play_audio() {
    const obj_letter_to_song_files = {
        'w': 'tom-1',
        'a': 'tom-2',
        's': 'tom-3',
        'd': 'tom-4',
        'j': 'snare',
        'k': 'crash',
        'l': 'kick-bass'
    };

    var audio = new Audio('./sounds/' + obj_letter_to_song_files[this.innerHTML] + '.mp3');
    audio.play();
  
}

const button_elements = document.querySelectorAll('.drum');
const button_elements_length = document.querySelectorAll('.drum').length;
for (let i = 0; i < button_elements_length; i++) {
    button_elements[i].addEventListener('click', play_audio);
}