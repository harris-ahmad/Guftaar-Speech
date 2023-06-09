module.exports = {
  env: {
    node: true,
  },
  extends: ["airbnb-base", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5",
        singleQuote: true,
        printWidth: 80,
        endOfLine: "lf",
      },
    ],
  },
};
