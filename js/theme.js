(function () {
  var root = document.documentElement;
  var button = document.getElementById("theme-toggle");
  var meta = document.querySelector('meta[name="theme-color"]');
  var media = window.matchMedia("(prefers-color-scheme: dark)");

  function paint(theme) {
    var dark = theme === "dark";
    root.setAttribute("data-theme", dark ? "dark" : "light");
    root.style.colorScheme = dark ? "dark" : "light";
    if (meta) meta.setAttribute("content", dark ? "#1e1e2e" : "#f3efe6");
    if (!button) return;
    button.setAttribute("aria-pressed", dark ? "true" : "false");
    button.setAttribute(
      "aria-label",
      dark ? "Switch to light theme" : "Switch to dark theme"
    );
  }

  if (button) {
    button.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme", next);
      } catch (err) {
        /* private mode */
      }
      paint(next);
    });
  }

  function onSchemeChange(event) {
    var stored = null;
    try {
      stored = localStorage.getItem("theme");
    } catch (err) {
      stored = null;
    }
    if (stored === "light" || stored === "dark") return;
    paint(event.matches ? "dark" : "light");
  }

  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", onSchemeChange);
  } else if (typeof media.addListener === "function") {
    media.addListener(onSchemeChange);
  }

  paint(root.getAttribute("data-theme") === "dark" ? "dark" : "light");
})();
