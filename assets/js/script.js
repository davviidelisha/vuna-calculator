/* =========================================================
   VUNA CALCULATOR — script.js
   David Zasan Elisha · SEN 482 · Set 2025/26
   =========================================================
   SECTION 1 — Pure math functions (Node + Jest safe)
   SECTION 2 — Browser-only logic (ESLint-safe)
   ========================================================= */

"use strict";

// ─────────────────────────────────────────────────────────
// SECTION 1 · PURE MATH FUNCTIONS
// ─────────────────────────────────────────────────────────

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }

function divide(a, b) {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

// Export for Jest / Node
if (typeof module !== "undefined" && module.exports) {
  module.exports = { add, subtract, multiply, divide, power };
}

// ─────────────────────────────────────────────────────────
// SECTION 2 · BROWSER-ONLY CODE
// ─────────────────────────────────────────────────────────

var isBrowser =
  (typeof window !== "undefined" &&
   typeof document !== "undefined");

if (isBrowser) {

  // ── State ─────────────────────────────────────────────
  var currentExpression = "";

  // ── Display helper ────────────────────────────────────
  var updateDisplay = function () {
    var el = document.getElementById("result");
    if (el) el.value = currentExpression || "0";
  };

  // ── Input handlers ────────────────────────────────────
  var appendToResult = function (value) {
    currentExpression += value.toString();
    updateDisplay();
  };

  var operatorToResult = function (op) {
    currentExpression += op;
    updateDisplay();
  };

  var appendPower = function () {
    currentExpression += "**";
    updateDisplay();
  };

  var backspace = function () {
    currentExpression = currentExpression.slice(0, -1);
    updateDisplay();
  };

  var clearResult = function () {
    currentExpression = "";
    updateDisplay();
  };

  // ── Calculation ───────────────────────────────────────
  var calculateResult = function () {
    if (!currentExpression) return;

    try {
      if (!/^[0-9+\-*/.() ]+$/.test(currentExpression)) {
        throw new Error("Invalid input");
      }

      /* eslint-disable no-eval */
      var result = eval(currentExpression);
      /* eslint-enable no-eval */

      if (!isFinite(result) || isNaN(result)) {
        throw new Error("Math error");
      }

      currentExpression = String(result);
      updateDisplay();

    } catch (e) {
      var el = document.getElementById("result");
      if (el) el.value = "Error";

      setTimeout(function () {
        currentExpression = "";
        updateDisplay();
      }, 1200);
    }
  };

  // ── Keyboard support ──────────────────────────────────
  document.addEventListener("keydown", function (e) {
    var key = e.key;

    if ("0123456789.".includes(key)) {
      appendToResult(key);
      return;
    }

    if (["+", "-", "*", "/"].includes(key)) {
      operatorToResult(key);
      return;
    }

    if (key === "Enter" || key === "=") {
      calculateResult();
      return;
    }

    if (key === "Backspace") {
      backspace();
      return;
    }

    if (key === "Escape") {
      clearResult();
      return;
    }

    if (key === "^") {
      appendPower();
      return;
    }
  });

  // ── Theme toggle ──────────────────────────────────────
  var toggleTheme = function () {
    var body = document.body;
    var btn = document.getElementById("theme-toggle");

    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      btn.innerHTML = "☀️";
      btn.title = "Switch to light mode";
      localStorage.setItem("theme", "dark");
    } else {
      btn.innerHTML = "🌙";
      btn.title = "Switch to dark mode";
      localStorage.setItem("theme", "light");
    }
  };

  // Expose to HTML
  window.appendToResult = appendToResult;
  window.operatorToResult = operatorToResult;
  window.appendPower = appendPower;
  window.backspace = backspace;
  window.clearResult = clearResult;
  window.calculateResult = calculateResult;
  window.toggleTheme = toggleTheme;

  // ── Restore theme ─────────────────────────────────────
  window.addEventListener("DOMContentLoaded", function () {
    var theme = localStorage.getItem("theme");
    var btn = document.getElementById("theme-toggle");

    if (theme === "dark") {
      document.body.classList.add("dark-mode");
      if (btn) {
        btn.innerHTML = "☀️";
        btn.title = "Switch to light mode";
      }
    }
  });

}