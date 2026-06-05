const js = require("@eslint/js");

module.exports = [
  js.configs.recommended,
  {
    files: ["assets/js/script.js"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "commonjs",
      globals: {
        document:     "readonly",
        window:       "readonly",
        localStorage: "readonly",
        setTimeout:   "readonly",
        module:       "writable",
        describe:     "readonly",
        it:           "readonly",
        expect:       "readonly",
        test:         "readonly"
      }
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console":     "off",
      "semi":           ["error", "always"],
      "quotes":         ["error", "double"],
      "eqeqeq":         ["error", "always"],
      "no-eval":        "off"
    }
  }
];