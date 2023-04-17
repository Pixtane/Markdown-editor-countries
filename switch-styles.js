document.addEventListener("DOMContentLoaded", function () {
  const toggleSwitch = document.querySelector(
    '.toggle-switch input[type="checkbox"]'
  );
  const mainStylesheet = document.querySelector("#main-stylesheet");
  const darkStylesheet = document.querySelector("#dark-stylesheet");

  function switchTheme(e) {
    if (e.target.checked) {
      mainStylesheet.disabled = true;
      darkStylesheet.disabled = false;
      localStorage.setItem("darktheme", true);
    } else {
      mainStylesheet.disabled = false;
      darkStylesheet.disabled = true;
      localStorage.setItem("darktheme", false);
    }
  }

  if (localStorage.getItem("darktheme") === null) {
    localStorage.setItem("darktheme", false);
  } else if (localStorage.getItem("darktheme") === "true") {
    mainStylesheet.disabled = true;
    darkStylesheet.disabled = false;
    toggleSwitch.checked = true;
  } else {
    mainStylesheet.disabled = false;
    darkStylesheet.disabled = true;
    toggleSwitch.checked = false;
  }
  toggleSwitch.addEventListener("change", switchTheme, false);
});
