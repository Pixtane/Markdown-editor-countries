// Add this to your JavaScript file
document.addEventListener("DOMContentLoaded", function () {
  var mapBtn = document.getElementById("map_btn");
  var svg = document.getElementById("parent_group");
  var svg1 = document.getElementById("my-svg");

  function updateMapBtnText(id) {
    mapBtn.textContent = id;
  }

  mapBtn.addEventListener("click", function () {
    svg1.style.display = "inline";
    svg1.style.position = "fixed";
    svg1.style.width = "100%";
    svg1.style.height = "100%";

    panzoom(svg, {
      onDoubleClick: function (e) {
        const clickedElement = e.target;

        let currentElement = clickedElement;
        if (currentElement.id === "my-svg") {
          return;
        }
        while (true) {
          if (currentElement.parentNode) {
            if (
              currentElement.parentNode.tagName !== "svg" &&
              currentElement.parentNode.id !== "parent_group"
            ) {
              currentElement = currentElement.parentNode;
            } else {
              break;
            }
          } else {
            break;
          }
        }
        if (currentElement.id === "ocean") {
          return;
        }

        updateMapBtnText(currentElement.id);

        const arrFromStorage = JSON.parse(
          localStorage.getItem(localStorage.getItem("current_page"))
        );

        arrFromStorage.savedCountry = currentElement.id;

        localStorage.setItem(
          localStorage.getItem("current_page"),
          JSON.stringify(arrFromStorage)
        );

        svg1.style.display = "none";
      },
    });
  });
});
