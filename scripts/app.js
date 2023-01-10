// variables
let searchInput = $("#search-input");
let searchSubmit = $("#search-submit");
let fullResultTBody = $("#full-result-tbody");
let resultTable = $("#table");

// api url
let url = "https://dummy.restapiexample.com/api/v1/employees";

// to getting data in ajax
var dataAjax = fullResultTBody.val();

// get data from api function
function getData() {
  $.ajax({
    type: "GET",
    url: url,
    data: { q: dataAjax },
    async: true,
    crossDomain: true,
    success: function (data, status, xhr) {
      let response = JSON.stringify(data.data);
      let jsonResponse = JSON.parse(response);

      // condition for simple validate type and value
      if (searchInput.val() == "") {
        jsonResponse.forEach((e) => {
          let full = `
            <tr>
            <th scope="row">${e.id}</th>
            <td>${e.employee_name}</td>
            <td>${e.employee_salary}</td>
            <td>${e.employee_age}</td>
            </tr>
            `;
          fullResultTBody.append(full);
        });
      } else if (searchInput.val() <= jsonResponse.length) {
        fullResultTBody.empty();
        let filteredData = jsonResponse.filter((e) => {
          return e.id.toString() === searchInput.val();
        });
        // console.log(filteredData);
        filteredData.forEach((res) => {
          let full = `
            <tr>
            <th scope="row">${res.id}</th>
            <td>${res.employee_name}</td>
            <td>${res.employee_salary}</td>
            <td>${res.employee_age}</td>
            </tr>
            `;
          fullResultTBody.append(full);
        });
      } else {
        let faultId = searchInput.val();
        resultTable.empty();
        resultTable.append(`<div class="alert alert-danger text-center" role="alert">
        Employee ${faultId} Not Found Or You Type Wrong !!!
      </div>`);

        setTimeout(() => {
          history.go(0);
        }, 100000);
        history.go(1);
      }
    },

    error: function (errorMessage) {
      // error callback
      //   $("#p").show();
      $("#p").append(`<div class="alert alert-danger text-center" role="alert">
      Sometings Wrong Please Try Again Leter
    </div>`);
      setTimeout(() => {
        $("#p").empty();
      }, "5000");
    },
  });

  //   is Loading
  $("#loadingDiv")
    .hide() // Hide it initially
    .ajaxStart(function () {
      $(this).show();
    })
    .ajaxStop(function () {
      $(this).hide();
    });
}

// when dom is ready call Api function -- in first time
$(document).ready(function () {
  // calling data
  getData();
});

// when click Search Button Call Api Finction
searchSubmit.click(function (e) {
  e.preventDefault();
  // calling data
  getData();
});
