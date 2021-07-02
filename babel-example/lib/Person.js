"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Person =
/*#__PURE__*/
function () {
  function Person() {
    (0, _classCallCheck2["default"])(this, Person);
  }

  (0, _createClass2["default"])(Person, [{
    key: "sayHello",
    value: function sayHello() {
      console.log('hello world');
    }
  }]);
  return Person;
}();

var _default = Person;
exports["default"] = _default;