// Start of Welcome user to dashboard
$(document).ready(function() {
    let user_string = localStorage.getItem("user");
    let user = JSON.parse(user_string);
    $("#name").text(user.name);
    getRequests();
});
// End of Welcome user to dashboard

let all_requests;
// Start of logging user out of dashboard
function logout() {
    localStorage.removeItem("user");
    window.location.href = "/public/index.html";
}
// End of logging user out of dashboard

function process(id, status) {
    let request_array = all_requests.filter(function(item) {
        return item.id === id;
    });
    let request = request_array[0];
    request.status = status;
    $.ajax({
        method: "PUT",
        url: "http://localhost:3000/Requests/" + id,
        data: request,
        success: function(result) {
            console.log(result);
        },
        error: function(err) {
            console.log(err);
            alert("Oops! an error occurred ", err);
        }
    });
}

// this is to display all the user requests for the leave
function getRequests(status) {
    let url = "http://localhost:3000/Requests";
    if (status) {
        url = url + "?status=" + status;
    }
    $.ajax({
        method: "GET",
        url: url,
        success: function(result) {
            $("#requests").html("");
            all_requests = result;
            result.forEach(function(request) {
                // start append: this is make sure that when a request is made it automatically appears on the dashboard
                let $buttons = "";
                if (request.status === "pending") {
                    $buttons = `<button class="btn btn-success" onclick="process(
                    ${request["id"]},'approved')">Approve</button>
                  <button class="btn btn-danger" onclick="process(
                    ${request["id"]},'disapproved')">Disapprove</button>`;
                }
                $("#requests").append(`
                  <div class="card">
                      <div class="card-body">
                          <h5 class="card-title">${request["leave-title"]}</h5>
                          <p class="card-text">${request["description"]}</p>
                          <p class="card-text">
                          ${request["start-date"]} to 
                          ${request["end-date"]}
                          </p>
                          <p class="card-text">${request["status"]}</p>
                          ${$buttons}
                      </div>
                  </div>
                `);
                // end append
            });
        },
        error: function(err) {
                console.log(err);
                alert("Oops! an error occurred ", err);
            }
            // end display all leave requests
    });
}