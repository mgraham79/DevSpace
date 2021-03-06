$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  var identification = "";
  var favDiv;
  $.get("/api/user_data").then(function (data) {
    console.log(data);
    if (data.photoURL !== ""){
      $("#userphoto").attr("src", data.photoURL);
    }
    $("#user-name").append(data.name);
    $("#user-email").append(data.email);
    $("#company-input").append(data.company);
    $("#user-location").append(data.location);
    $("#user-dev-type").append(data.devType);
    $("#user-position").append(data.position);
    $("#user-programming-lang").append(data.languages);
    $("#user-education").append(data.degree);
    $("#user-experience").append(data.experience);
    identification = data.id;

    for(var i = 0; i < data.Favorites.length; i++){
      $("#nofavorites").html("");
      favDiv = $("<div class='w3-container w3-card w3-light-gray w3-margin-bottom' id=divnum" + i + ">");
      $("#holder").append(favDiv);
      $(favDiv).attr("id", "divnum"+i).append("<strong>Title: </strong>" + data.Favorites[i].title + "<br>" +
      "<strong>Company: </strong>" + data.Favorites[i].company + "<br>" +
      $("#applicationfav").attr("href", data.Favorites[i].url) + "<br>" +
      "<strong>Description: </strong>" + data.Favorites[i].description + "<br>" +
      "<strong>Perks: </strong>" + data.Favorites[i].perks);
    }
  });

  var saveButton = $("<button type='submit' class='btn btn-default' id='submit-btn'>Save this Job</button>");

  var job = {
    jobTitle: "",
    jobCompany: "",
    jobUrl: "",
    jobDescription: "",
    jobPerks: "",
  }

  $("#job-search-form").on("submit", function (e) {
    e.preventDefault();
    var locationInput = $("#city-input").val().trim() || $("#zip-code-input").val().trim() || $("#state-input").val().trim() || "San Diego, CA";
    console.log(locationInput);
    var googleMapUrl = "https://www.google.com/maps/embed/v1/place?key=AIzaSyBLtaoiTDQbPfj9S_FGDDEulwAzVdGOC7w&q=";
    $("#google-map-iframe").attr("src", googleMapUrl + locationInput);

    $.ajax({
      method: "GET",
      url: "/api/search/job/" + locationInput
    }).then(function (data) {
      $("#nosearches").html("");
      for (var i = 0; i < 10; i++) {
        $("#title").html("<strong>Title: </strong>" + data.listings.listing[i].title);
        $("#company").html("<strong>Company: </strong>" + data.listings.listing[i].company.name);
        $("#application").attr("href", data.listings.listing[i].apply_url);
        $("#description").html("<strong>Description: </strong>" + data.listings.listing[i].description);
        $("#perks").html("<strong>Perks: </strong>" + data.listings.listing[i].perks);
        $("#job-results").append(saveButton);
        job.jobTitle = data.listings.listing[i].title;
        job.jobCompany = data.listings.listing[i].company.name;
        job.jobUrl = data.listings.listing[i].apply_url;
        job.jobDescription = data.listings.listing[i].description;
        job.jobPerks = data.listings.listing[i].perks;
      }
    }).catch(function (err) {
      console.log(err.responseText);
      // alert(err.responseText);
    });
  });

  $("#job-results").on("click", "#submit-btn", function (e) {
    e.preventDefault();
    $("#nofavorites").html("");
    $.post("/api/favorite", {
      UserId: identification,
      title: job.jobTitle,
      company: job.jobCompany,
      url: job.jobUrl,
      description: job.jobDescription,
      perks: job.jobPerks
    }).then(function (data) {
      alert("Job saved!");
    });
  });
});
