$(".message a").click(function() {
    toggleForm();
});

function toggleForm() {
    $("form").animate({
            height: "toggle",
            opacity: "toggle"
        },
        "slow"
    );
}

// This is for the login button
$('#login').click(function() {


})


src = "../jquery-3.4.1.min.js";
// start of jquery by;
$(document).ready(function() {
    //then when a user logs in, this should post the info to the server
    $(".login-form").on("submit", function(e) {
        e.preventDefault();
    });




})