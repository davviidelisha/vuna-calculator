/* =========================================================
   VUNA CALCULATOR — script.js
   David Zasan Elisha · SEN 482 · Set 2025/26
   =========================================================
   ARCHITECTURE NOTE:
   Section 1 — Pure math functions (no DOM). Jest imports
                these directly via module.exports.
   Section 2 — Calculator state + DOM functions. These are
                wrapped in isBrowser so Jest never runs them.
   ========================================================= */

"use strict";

// ─────────────────────────────────────────────────────────
// SECTION 1 · PURE MATH FUNCTIONS  (testable, no DOM)
// ─────────────────────────────────────────────────────────

function add(a, b)      { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) { throw new Error("Division by zero"); }
  return a / b;
}
/** Unique feature — raise base to any exponent */
function power(base, exponent) { return Math.pow(base, exponent); }

// Export for Jest (Node environment)
if (typeof module !== "undefined" && module.exports) {
  module.exports = { add, subtract, multiply, divide, power };
}

// ─────────────────────────────────────────────────────────
// SECTION 2 · BROWSER-ONLY CODE
// Guard: only runs when a real DOM exists (browser, not Jest)
// ─────────────────────────────────────────────────────────

var isBrowser = (typeof window !== "undefined" && typeof document !== "undefined");

if (isBrowser) {

  // ── Calculator state ──────────────────────────────────
  var currentExpression = "";
  var LAST_RESULT       = 0;

  // ── Display helper ────────────────────────────────────
  function updateDisplay() {
    var el = document.getElementById("result");
    if (el) { el.value = currentExpression || "0"; }
  }

  // ── Input functions ───────────────────────────────────
  function appendToResult(value) {
    currentExpression += value.toString();
    updateDisplay();
  }

  function operatorToResult(op) {
    currentExpression += op;
    updateDisplay();
  }

  /** Unique feature button — appends ** (power operator) */
  function appendPower() {
    currentExpression += "**";
    updateDisplay();
  }

  function backspace() {
    currentExpression = currentExpression.slice(0, -1);
    updateDisplay();
  }

  function clearResult() {
    currentExpression = "";
    updateDisplay();
  }

  // ── Evaluation ────────────────────────────────────────
  function calculateResult() {
    if (!currentExpression) { return; }

    try {
      // Whitelist: only digits, operators, dot, parens, spaces
      if (!/^[0-9+\-*/.() ]+$/.test(currentExpression)) {
        throw new Error("Invalid input");
      }

      /* eslint-disable no-eval */
      var result = eval(currentExpression);
      /* eslint-enable no-eval */

      if (!isFinite(result) || isNaN(result)) {
        throw new Error("Math error");
      }

      LAST_RESULT       = result;
      currentExpression = String(result);
      updateDisplay();

    } catch (e) {
      var el = document.getElementById("result");
      if (el) { el.value = "Error"; }
      setTimeout(function () {
        currentExpression = "";
        updateDisplay();
      }, 1200);
    }
  }

  // ── Keyboard support ──────────────────────────────────
  document.addEventListener("keydown", function (e) {
    var key = e.key;
    if ("0123456789.".includes(key))        { appendToResult(key);  return; }
    if (["+", "-", "*", "/"].includes(key)) { operatorToResult(key); return; }
    if (key === "Enter" || key === "=")     { calculateResult();     return; }
    if (key === "Backspace")                { backspace();           return; }
    if (key === "Escape")                   { clearResult();         return; }
    if (key === "^")                        { appendPower();         return; }
  });

  // ── Theme toggle ──────────────────────────────────────
  function toggleTheme() {
    var body = document.body;
    var btn  = document.getElementById("theme-toggle");
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      btn.innerHTML = "☀️";
      btn.title     = "Switch to light mode";
      localStorage.setItem("theme", "dark");
    } else {
      btn.innerHTML = "🌙";
      btn.title     = "Switch to dark mode";
      localStorage.setItem("theme", "light");
    }
  }

  // Expose to HTML onclick attributes
  window.appendToResult  = appendToResult;
  window.operatorToResult = operatorToResult;
  window.appendPower     = appendPower;
  window.backspace       = backspace;
  window.clearResult     = clearResult;
  window.calculateResult = calculateResult;
  window.toggleTheme     = toggleTheme;

  // ── Restore theme on load ─────────────────────────────
  window.addEventListener("DOMContentLoaded", function () {
    var theme = localStorage.getItem("theme");
    var btn   = document.getElementById("theme-toggle");
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
      if (btn) { btn.innerHTML = "☀️"; btn.title = "Switch to light mode"; }
    }
  });

} // end isBrowser