var addButton = document.querySelector("#add");
var deletelast = document.querySelector("#del");
var nameInput = document.querySelector("#name");
var ageInput = document.querySelector("#age");
var tableBody = document.querySelector("tbody");

// make name input accepts only letters
nameInput.addEventListener("keydown", function (e) {
  if (
    (e.keyCode >= 65 && e.keyCode <= 90) ||
    e.keyCode == "32" ||
    e.keyCode == "8"
  ) {
    nameInput.setCustomValidity("");
  } else {
    e.preventDefault();
    nameInput.setCustomValidity("Name must contain letters only ");
    nameInput.reportValidity();
  }
});
// make age input accepts only numbers

ageInput.addEventListener("keydown", function (e) {
  if ((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode == "8") {
    
    ageInput.setCustomValidity("");
    
  } else {
    e.preventDefault();
    ageInput.setCustomValidity("Age must be numbers only ");
    ageInput.reportValidity();
  }
});
//add button
addButton.addEventListener("click", function () {
  
  // make sure user enter his name
  if (nameInput.value === "") {
    nameInput.setCustomValidity("Name is required ");
    nameInput.reportValidity();
    return;
  }
  // make sure user enter his age
  if (ageInput.value === "") {
    ageInput.setCustomValidity("Age is required ");
    ageInput.reportValidity();
    return;
  }
  //make sure age is between 18 & 60

  var inputValue = ageInput.value;

  var parsedValue = parseInt(inputValue);
  ageInput.value = inputValue;
  if (parsedValue >= 18 && parsedValue <= 60) {
    ageInput.setCustomValidity(" ");
  } else {
    ageInput.setCustomValidity("Age must be between 18 and 60");
    ageInput.reportValidity();
    return;
  }
  //new row setup
  var name = nameInput.value;
  var age = ageInput.value;
  var newRow = document.createElement("tr");
  var nameCell = document.createElement("td");

  var ageCell = document.createElement("td");
  var coursesCell = document.createElement("td");
  var selectlist = document.getElementById("courses");
  var actionsCell = document.createElement("td");
  var selectedOptions = [];
  var hasSelection = false;
  // make sure user enter at least one course
  for (var i = 0; i < selectlist.length; i++) {
    if (selectlist.options[i].selected) {
      selectedOptions.push(selectlist.options[i].text);
      hasSelection = true;
    }
  }
  if (hasSelection === false) {
    selectlist.setCustomValidity("select one course at least");
    selectlist.reportValidity();
    return;
  }

  // filling the columns
  coursesCell.textContent = selectedOptions;
  nameCell.textContent = name;
  ageCell.textContent = age;

  actionsCell.innerHTML = actionsCell.innerHTML =
    '<button class="deletebutton">remove</button>';

  var Delete = actionsCell.querySelector(".deletebutton");

  Delete.addEventListener("click", (event) => {
    const row = event.target.closest("tr");
    if (row) {
      row.remove();
    }
  });

  newRow.appendChild(nameCell);
  newRow.appendChild(ageCell);
  newRow.appendChild(coursesCell);
  newRow.appendChild(actionsCell);

  tableBody.appendChild(newRow);
  // delete all button
  var deleteButton = document.getElementById("Del");
  deleteButton.addEventListener("click", function () {
    newRow.remove();
  });

  // clearing inputs
  nameInput.value = "";
  ageInput.value = "";
  selectlist.value = "";
});

// delete last row  button

function deleteLastRow(Table) {
  var table = document.getElementById(Table);
  if (table) {
    var rowCount = table.rows.length;
    if (rowCount > 1) {
      table.deleteRow(rowCount - 1);
    }
  }
}
deletelast.addEventListener("click", function () {
  deleteLastRow("Table");
});
