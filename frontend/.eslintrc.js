module.exports = {
  "ecmaFeatures": {
    "jsx": true,
    "modules": true,
    "arrowFunctions": true,
    "classes": true,
    "spread": true,
  },
  "env": {
    "browser": true,
    "es2021": true,
    "es6": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "semi": [2, "always"],
    "no-unused-vars": [0],
    "no-undef": [0],
    "react/prop-types": [0],
    "indent": ["error", 2],
    "react/display-name": [0]
  },
};
