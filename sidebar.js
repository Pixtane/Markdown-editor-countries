document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("sidebar"); // Get the container element by ID

  function CreateButton(index, name) {
    const menuItem = document.createElement("button");
    menuItem.classList.add("menu-item");
    menuItem.id = index;
    menuItem.innerHTML = index + ": " + name;

    // Add event listener to update localStorage "current_page" value when the button is clicked
    menuItem.addEventListener("click", function () {
      localStorage.setItem("current_page", this.id - 1);

      const markdownInput2 = document.getElementById("markdown-input");
      const htmlOutput2 = document.getElementById("html-output");
      const nameInput2 = document.getElementById("name");
      const countryName2 = document.getElementById("map_btn");

      const storage = JSON.parse(localStorage.getItem(this.id - 1));

      const savedMarkdown2 = storage.savedMarkdown;
      const savedName2 = storage.savedName;
      const savedCountry2 = storage.savedCountry;

      markdownInput2.value = savedMarkdown2;
      htmlOutput2.innerHTML = marked(savedMarkdown2);
      nameInput2.value = savedName2;
      if (savedCountry2 == "") {
        countryName2.innerHTML = "Map";
      } else {
        countryName2.innerHTML = savedCountry2;
      }
    });

    menuItem.addEventListener("contextmenu", function (event) {
      event.preventDefault();

      // Remove current button from localStorage
      localStorage.removeItem(this.id - 1);

      // Update buttons
      const container = document.getElementById("sidebar");
      container.removeChild(this);

      for (let i = parseInt(this.id); i < localStorage.length; i++) {
        const button = document.getElementById(i + 1);
        button.id = i;
        button.innerHTML =
          i + ": " + JSON.parse(localStorage.getItem(i)).savedName;
      }

      // Decrease index of all buttons by one
      for (let i = this.id; i < localStorage.length; i++) {
        const item = localStorage.getItem(i);
        localStorage.setItem(i - 1, item);
        localStorage.removeItem(i);
      }

      // Set current page to previous or same if first
      const current = parseInt(localStorage.getItem("current_page"));
      if (current > 0) {
        localStorage.setItem("current_page", current - 1);
      } else {
        localStorage.setItem("current_page", 0);
      }
    });

    console.log(name);
    document.getElementById("sidebar").appendChild(menuItem);
  }

  for (let i = 0; i < localStorage.length; i++) {
    const index = i + 1; // Calculate the index (1-based)
    const result_string = JSON.parse(localStorage.getItem(i));
    var name = "";

    if (result_string) {
      name = result_string.savedName;
    } else {
      name = undefined;
    }

    // Get the name field of the current_page object

    // Create a new menu item and add it to the container
    if (result_string) {
      CreateButton(index, name);
    }
  }

  const add_art = document.getElementById("add_art");

  add_art.addEventListener("click", function () {
    var button_id = 1;

    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.getItem(i)) {
        button_id++;
      }
    }

    localStorage.setItem("current_page", button_id - 1);

    const markdownInput2 = document.getElementById("markdown-input");
    const htmlOutput2 = document.getElementById("html-output");
    const nameInput2 = document.getElementById("name");
    const countryName2 = document.getElementById("map_btn");

    markdownInput2.value = "";
    htmlOutput2.innerHTML = "";
    nameInput2.value = "New article";
    countryName2.innerHTML = "Map";

    localStorage.setItem(
      localStorage.getItem("current_page"),
      JSON.stringify({
        savedName: "New article",
        savedMarkdown: "",
        savedCountry: "",
      })
    );
    CreateButton(button_id, "New article");
  });

  // DRAGGING

// Define variables to store starting position and mouse position
let startingX;
let mouseX;

// Attach event listeners for mouse down and mouse up
container.addEventListener('mousedown', onMouseDown);
document.addEventListener('mouseup', onMouseUp);

// Define function for handling mouse down event
function onMouseDown(event) {
  // Store the starting position of the sidebar
  startingX = container.offsetLeft;
  // Store the initial mouse position
  mouseX = event.clientX;
  // Set the cursor to "grab"
  sidebar.style.cursor = "grab";
  // Attach event listener for mouse move
  document.addEventListener('mousemove', onMouseMove);
}

// Define function for handling mouse move event
function onMouseMove(event) {
  // Set the cursor to "move"
  sidebar.style.cursor = "grabbing";
  // Calculate the distance the mouse has moved
  const distanceX = event.clientX - mouseX;
  // Calculate the new position of the sidebar
  const newPosition = startingX + distanceX;
  // Check if the new position is within the allowed range
  if (newPosition >= -195 && newPosition <= 0) {
    // Set the new position of the sidebar
    container.style.left = newPosition + 'px';
  }
}

// Define function for handling mouse up event
function onMouseUp(event) {
  // Set the cursor back to the default
  sidebar.style.cursor = "default";
  // Detach event listener for mouse move
  document.removeEventListener('mousemove', onMouseMove);
}

});
