/* =====================================================
   OFFICE WI-FI LOGIN — STATIC UI TEMPLATE
   main.js — shared UI interactions (all pages)
   ===================================================== */

(function () {
  "use strict";

  /* ---------- PASSWORD VISIBILITY TOGGLE ---------- */
  function initPasswordToggle() {
    var toggles = document.querySelectorAll('[data-toggle="password"]');
    if (!toggles.length) return;

    toggles.forEach(function (toggle) {
      toggle.addEventListener("click", function () {
        var targetId = toggle.getAttribute("data-target");
        var input = document.getElementById(targetId);
        if (!input) return;

        var isPassword = input.getAttribute("type") === "password";
        input.setAttribute("type", isPassword ? "text" : "password");

        toggle.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");

        var eyeOpen = toggle.querySelector(".icon-eye-open");
        var eyeClosed = toggle.querySelector(".icon-eye-closed");
        if (eyeOpen && eyeClosed) {
          eyeOpen.classList.toggle("hidden", isPassword);
          eyeClosed.classList.toggle("hidden", !isPassword);
        }
      });
    });
  }

  /* ---------- LOGIN FORM (demo only) ---------- */
  function initLoginForm() {
    var form = document.getElementById("login-form");
    if (!form) return;

    var usernameInput = document.getElementById("username");
    var passwordInput = document.getElementById("password");
    var alertBox = document.getElementById("login-alert");
    var submitBtn = document.getElementById("login-button");

    function showAlert(message) {
      if (!alertBox) return;
      alertBox.textContent = message;
      alertBox.classList.remove("hidden");
    }

    function hideAlert() {
      if (!alertBox) return;
      alertBox.classList.add("hidden");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      hideAlert();

      var username = usernameInput ? usernameInput.value.trim() : "";
      var password = passwordInput ? passwordInput.value.trim() : "";

      if (!username || !password) {
        showAlert("Please enter your username and password.");
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add("is-loading");
        var originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML =
          '<span class="spinner"></span> Connecting...';
      }

      setTimeout(function () {
        window.location.href = "alogin.html";
      }, 1600);
    });

    if (usernameInput) {
      usernameInput.addEventListener("input", hideAlert);
    }
    if (passwordInput) {
      passwordInput.addEventListener("input", hideAlert);
    }
  }

  /* ---------- ALOGIN — auto-navigate to status ---------- */
  function initAuthLoading() {
    var loadingPage = document.querySelector("[data-page='alogin']");
    if (!loadingPage) return;

    setTimeout(function () {
      window.location.href = "status.html";
    }, 3200);
  }

  /* ---------- STATUS — session timer (demo) ---------- */
  function initSessionTimer() {
    var connectedEl = document.getElementById("connected-time");
    var remainingEl = document.getElementById("remaining-time");
    if (!connectedEl && !remainingEl) return;

    var connectedSeconds = 84 * 60 + 18;
    var remainingSeconds = 155 * 60 + 42;

    function pad(n) {
      return n < 10 ? "0" + n : String(n);
    }

    function format(sec) {
      var h = Math.floor(sec / 3600);
      var m = Math.floor((sec % 3600) / 60);
      var s = sec % 60;
      return pad(h) + ":" + pad(m) + ":" + pad(s);
    }

    setInterval(function () {
      connectedSeconds++;
      remainingSeconds--;
      if (remainingSeconds < 0) remainingSeconds = 0;
      if (connectedEl) connectedEl.textContent = format(connectedSeconds);
      if (remainingEl) remainingEl.textContent = format(remainingSeconds);
    }, 1000);
  }

  /* ---------- LOGOUT — navigate to logout page ---------- */
  function initLogoutAction() {
    var logoutBtn = document.getElementById("logout-button");
    if (!logoutBtn) return;

    logoutBtn.addEventListener("click", function () {
      logoutBtn.disabled = true;
      logoutBtn.classList.add("is-loading");
      var originalHTML = logoutBtn.innerHTML;
      logoutBtn.innerHTML =
        '<span class="spinner"></span> Disconnecting...';

      setTimeout(function () {
        window.location.href = "logout.html";
      }, 1500);
    });
  }

  /* ---------- INIT ---------- */
  function init() {
    initPasswordToggle();
    initLoginForm();
    initAuthLoading();
    initSessionTimer();
    initLogoutAction();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
