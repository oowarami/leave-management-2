// Start of Welcome user to dashboard
$(document).ready(function() {
    let user_string = localStorage.getItem("user");
    let user = JSON.parse(user_string);
    $("#name").text(user.name);
    getRequests('pending');
});
// End of Welcome user to dashboard

let all_requests;
// Start of logging user out of dashboard
function logout() {
    localStorage.removeItem("user");
    window.location.href = "../index.html";
}
// End of logging user out of dashboard

// this is to display all the user requests for the leave
function getRequests(status) {
    let url = "http://localhost:3000/Requests";
    $.ajax({
        method: "GET",
        url: url,
        success: function(results) {
            // start count for each list
            let allPending = results.filter(function(item) {
                return item.status === "pending";
            });
            $("#allCount").html(allPending.length);
            let allApproved = results.filter(function(item) {
                return item.status === "approved";
            });
            $("#allApproved").html(allApproved.length);
            let allDisapproved = results.filter(function(item) {
                return item.status === "disapproved";
            });
            $("#allDisapproved").html(allDisapproved.length);

            let result;
            switch (status) {
                case "pending":
                    {
                        result = allPending;
                        break;
                    }
                case "approved":
                    {
                        result = allApproved;
                        break;
                    }
                case "disapproved":
                    {
                        result = allDisapproved;
                        break;
                    }
                default:
                    break;
            }
            // end count for each list

            all_requests = result;
            // clear the request list before appending 
            $("#requests").html("");
            result.forEach(function(request) {
                // start append: this is to make sure that when a request is made it automatically appears on the dashboard
                let $buttons = "";
                if (request.status === "pending") {
                    $buttons = `<button class="btn btn-outline-success" onclick="process(
                    ${request["id"]},'approved')">Approve</button>
                  <button class="btn btn-outline-danger" onclick="process(
                    ${request["id"]},'disapproved')">Disapprove</button>`;
                }

                $("#requests").append(`
                  <div class="card">
                      <div class="card-body">
                          <h5 class="card-title"> ${request["leave_title"]}</h5>
                          <p class="card-text"> Leave Status: ${request["status"]}</p>
                          ${$buttons}
                          <button type="button" class="btn btn-outline-info" 
                            data-toggle="modal" data-target="#viewModal" onclick="viewRequest(${request['id']})">View More </button>
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

// start of the update of the status of the requests
function process(id, status) {
    let request = all_requests.find(function(item) {
        return item.id === id;
    });
    data = { status: status };
    $.ajax({
        method: "PATCH",
        url: "http://localhost:3000/Requests/" + id,
        data: data,
        success: function(result) {
            console.log(result);
        },
        error: function(err) {
            console.log(err);
            alert("Oops! an error occurred ", err);
        }
    });
}
// end of the update of the status of the requests

// start of single view request
function viewRequest(id) {
    let request = all_requests.find(function(item) {
        return item.id === id;
    });
    $('#title').text(request.leave_title);
    $('#start').text(request.start_date);
    $('#end').text(request.end_date);
    $('#status').text(request.status);
    $('#description').text(request.description);
}
// end of single view request