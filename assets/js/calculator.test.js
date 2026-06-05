/* =========================================================
   VUNA CALCULATOR — calculator.test.js
   David Zasan Elisha · SEN 482 · Set 2025/26
   =========================================================
   Tests every pure math function exported from script.js.
   Run with:  npm test
   ========================================================= */

"use strict";

const { add, subtract, multiply, divide, power } = require("./script.js");

// ─────────────────────────────────────────────────────────
// add()
// ─────────────────────────────────────────────────────────
describe("add()", () => {
  it("adds two positive integers", () => {
    expect(add(2, 3)).toBe(5);
  });

  it("adds a positive and a negative number", () => {
    expect(add(10, -4)).toBe(6);
  });

  it("adds two negative numbers", () => {
    expect(add(-5, -7)).toBe(-12);
  });

  it("adds decimals correctly", () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3);
  });

  it("adding zero returns the same number", () => {
    expect(add(99, 0)).toBe(99);
  });
});

// ─────────────────────────────────────────────────────────
// subtract()
// ─────────────────────────────────────────────────────────
describe("subtract()", () => {
  it("subtracts two positive integers", () => {
    expect(subtract(10, 4)).toBe(6);
  });

  it("returns a negative when result is negative", () => {
    expect(subtract(3, 9)).toBe(-6);
  });

  it("subtracts two negative numbers", () => {
    expect(subtract(-5, -3)).toBe(-2);
  });

  it("subtracts decimals correctly", () => {
    expect(subtract(1.5, 0.5)).toBeCloseTo(1.0);
  });

  it("subtracting zero returns the same number", () => {
    expect(subtract(42, 0)).toBe(42);
  });
});

// ─────────────────────────────────────────────────────────
// multiply()
// ─────────────────────────────────────────────────────────
describe("multiply()", () => {
  it("multiplies two positive integers", () => {
    expect(multiply(3, 7)).toBe(21);
  });

  it("multiplies a positive by a negative", () => {
    expect(multiply(6, -3)).toBe(-18);
  });

  it("multiplies two negatives to give a positive", () => {
    expect(multiply(-4, -5)).toBe(20);
  });

  it("multiplying by zero gives zero", () => {
    expect(multiply(999, 0)).toBe(0);
  });

  it("multiplying by one returns the same number", () => {
    expect(multiply(55, 1)).toBe(55);
  });

  it("multiplies decimals correctly", () => {
    expect(multiply(2.5, 4)).toBeCloseTo(10);
  });
});

// ─────────────────────────────────────────────────────────
// divide()
// ─────────────────────────────────────────────────────────
describe("divide()", () => {
  it("divides two positive integers evenly", () => {
    expect(divide(10, 2)).toBe(5);
  });

  it("returns a decimal for non-even division", () => {
    expect(divide(7, 2)).toBe(3.5);
  });

  it("divides a negative by a positive", () => {
    expect(divide(-12, 4)).toBe(-3);
  });

  it("divides two negatives to give a positive", () => {
    expect(divide(-9, -3)).toBe(3);
  });

  it("dividing zero by a number gives zero", () => {
    expect(divide(0, 5)).toBe(0);
  });

  it("throws an error when dividing by zero", () => {
    expect(() => divide(5, 0)).toThrow("Division by zero");
  });

  it("throws even when numerator is zero divided by zero", () => {
    expect(() => divide(0, 0)).toThrow("Division by zero");
  });
});

// ─────────────────────────────────────────────────────────
// power()  ← UNIQUE FEATURE
// ─────────────────────────────────────────────────────────
describe("power() — unique feature: exponentiation", () => {
  it("raises 2 to the power of 10", () => {
    expect(power(2, 10)).toBe(1024);
  });

  it("raises a number to the power of 1 (returns itself)", () => {
    expect(power(7, 1)).toBe(7);
  });

  it("raises a number to the power of 0 (always 1)", () => {
    expect(power(999, 0)).toBe(1);
  });

  it("handles a negative base with an even exponent (positive result)", () => {
    expect(power(-3, 2)).toBe(9);
  });

  it("handles a negative base with an odd exponent (negative result)", () => {
    expect(power(-2, 3)).toBe(-8);
  });

  it("handles a decimal exponent (square root equivalent)", () => {
    expect(power(9, 0.5)).toBeCloseTo(3);
  });

  it("handles a decimal base", () => {
    expect(power(2.5, 2)).toBeCloseTo(6.25);
  });

  it("raises 0 to any positive power gives 0", () => {
    expect(power(0, 5)).toBe(0);
  });
});