$(document).ready(function() {
    function addLeaveRequest(id) {
        $.ajax({
            method: "POST",
            url: "  http://localhost:3000/Requests" + id,
            data: {
                data
            }
        });
    }
});