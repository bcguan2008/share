"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _Person2 = _interopRequireDefault(require("./Person"));

var Engineer =
/*#__PURE__*/
function (_Person) {
  (0, _inherits2["default"])(Engineer, _Person);

  function Engineer() {
    (0, _classCallCheck2["default"])(this, Engineer);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Engineer).apply(this, arguments));
  }

  (0, _createClass2["default"])(Engineer, [{
    key: "coding",
    value: function coding() {
      console.log('coding');
    }
  }]);
  return Engineer;
}(_Person2["default"]);

exports["default"] = Engineer;