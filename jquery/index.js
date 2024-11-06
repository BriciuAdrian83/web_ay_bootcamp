function change_text_of_element_with_key(event, element) {
    $(element).text(event.key);
}

$(document).keydown(function (event) {
    change_text_of_element_with_key(event, 'h1');
});

$('h1').on('mouseover', function() {
    $('h1').html('<em>Hello</em> world');
})