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
$("#login").click(function() {});

// src = "../jquery-3.4.1.min.js";
// start of jquery by;
$(document).ready(function() {
    // start of sign up for the user. when a user signs up, this should POST info to the server
    $(".register-form").on("submit", function(e) {
        e.preventDefault();
        let user = {};
        let name = $("#name").val();
        let password = $("#password").val();
        let email = $("#email").val();
        let isAdmin = $("#admin").is(":checked");

        if (!name) return alert("Kindly input name");
        if (!password) return alert("Kindly input password");
        if (!email) return alert("Kindly input email");

        user.name = name;
        user.password = password;
        user.email = email;
        user.isAdmin = isAdmin;

        $.ajax({
            method: "POST",
            url: "http://localhost:3000/Users",
            data: user,
            success: function(result) {
                localStorage.setItem("user", JSON.stringify(result));
                if (result.isAdmin) {
                    window.location.href = "html/admin_dashboard.html";
                } else {
                    window.location.href = "html/user.html";
                }
            },
            error: function(err) {
                console.log(err);
                alert("Oops! an error occurred ", err);
            }
        });
    });
    // end of signup for the user

    //then when a user logs in, this should GET the info from the server, and compare with the sign in info
    $(".login-form").on("submit", function(e) {
        e.preventDefault();
        let user = {};
        let loginEmail = $("#login-email").val();
        let loginPassword = $("#login-password").val();

        if (!loginEmail) return alert("Kindly input email");
        if (!loginPassword) return alert("Kindly input password");

        user.loginEmail = loginEmail;
        user.loginPassword = loginPassword;

        $.ajax({
            method: "GET",
            url: "http://localhost:3000/Users?email=" + user.loginEmail,
            success: function(result) {
                let user_obj = result[0];
                if (user_obj) {
                    if (user_obj.password === user.loginPassword) {
                        localStorage.setItem("user", JSON.stringify(user_obj));
                        if (user_obj.isAdmin) {
                            window.location.href = "html/admin_dashboard.html";
                        } else {
                            window.location.href = "html/user.html";
                        }
                    } else {
                        alert("Incorrect Username/Password");
                    }
                } else {
                    alert("User does not exist!");
                }
            },
            error: function(err) {
                console.log(err);
                alert("Oops! an error occurred ", err);
            }
        });
    });
    // end of login for the user
});