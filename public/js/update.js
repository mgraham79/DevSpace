$(document).ready(function () {

    $.get("/api/user_data").then(function (data) {
        console.log(data);
    
    var signUpForm = $("form.signup");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");
    var nameInput = $("input#name-input");
    var companyInput = $("input#company-input");
    var locationInput = $("input#location-input");
    var devTypeInput = $("input#dev-type-input");
    var positionInput = $("input#position-input");
    var degreeInput = $("input#degree-input");
    var experienceInput = $("input#experience-input");

    function updateUser(userObject, userId) {
        $.ajax({ url: "/api/members/" + userId, data: userObject, method: "PUT" }).then(function (data) {
            window.location.href = "/members";
            console.log(data);
        });
    }

    $("#update").on("click", function(event){
        event.preventDefault();
        var userData = {
            name: nameInput.val().trim(),
            company: companyInput.val().trim(),
            location: locationInput.val().trim(),
            devType: devTypeInput.val().trim(),
            position: positionInput.val().trim(),
            degree: degreeInput.val().trim(),
            experience: experienceInput.val().trim()
          };

          if (userData.name != "") {
            updateUser({name: userData.name}, data.id);
          }
          if (userData.company != "") {
            updateUser({company: userData.company}, data.id);
          }
          if (userData.location != "") {
            updateUser({location: userData.location}, data.id);
          }
          if (userData.devType != "") {
            updateUser({devType: userData.devType}, data.id);
          }
          if (userData.position != "") {
            updateUser({position: userData.position}, data.id);
          }
          if (userData.degree != "") {
            updateUser({degree: userData.degree}, data.id);
          }
          if (userData.experience != "") {
            updateUser({experience: userData.experience}, data.id);
          }

    });
});

});