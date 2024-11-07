const MAX_NR_OF_BUTTONS_IN_SEQUENCE = 4;
const BUTTONS_COLORS = ['green', 'red', 'yellow', 'blue'];
let game_pattern = [];
let user_clicked_pattern = [];
let level = 1;

function play_sound(color) {
    var audio = new Audio('./sounds/' + color + '.mp3');
    audio.play();
}

function indicate_last_button_in_sequence(random_chosen_color) {
    console.log(random_chosen_color);
    $('#' + random_chosen_color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    play_sound(random_chosen_color);
}

function next_sequence() {
    user_clicked_pattern = []; // Reset user pattern for next level
    $('#level-title').text('Level ' + level);

    var random_number = Math.floor(Math.random() * MAX_NR_OF_BUTTONS_IN_SEQUENCE);
    var random_chosen_color = BUTTONS_COLORS[random_number];
    game_pattern.push(random_chosen_color);
    indicate_last_button_in_sequence(random_chosen_color);
    level++;
}



function start_over() {
    level = 1;
    game_pattern = [];
    user_clicked_pattern = [];
}

function check_answer(currentLevel) {
    if (game_pattern[currentLevel] === user_clicked_pattern[currentLevel]) {
        // User got the pattern right so far
        if (user_clicked_pattern.length === game_pattern.length) {
            // User completed the sequence correctly
            setTimeout(function () {
                next_sequence();
            }, 1000);
        }
    } else {
        // User got it wrong
        play_sound("wrong");
        $('#level-title').text('Game Over, Press Any Key to Restart');
        $('body').addClass('game-over');
        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 200);
        start_over();
    }
}

function get_user_choice_check_and_go_next_or_game_over() {
    var user_chosen_color = $(this).attr('id');
    user_clicked_pattern.push(user_chosen_color);
    play_sound(user_chosen_color);

    // Animate the clicked button
    $('#' + user_chosen_color).addClass('pressed');
    setTimeout(function () {
        $('#' + user_chosen_color).removeClass('pressed');
    }, 100);

    check_answer(user_clicked_pattern.length - 1);
}

function start_game() {
    if (level === 1) {  // Only start if it's the first level
        $('#level-title').text('Level ' + level);
        next_sequence();
    }
}

// Main ##########################################################
$('[type="button"]').on('click', get_user_choice_check_and_go_next_or_game_over);
start_over();
$(document).on('keyup', function () {
    if (level === 1 || game_pattern.length === 0) {
        start_game();
    }
});