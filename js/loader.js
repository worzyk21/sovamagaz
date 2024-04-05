"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var spPopupsLoadedEvent = new CustomEvent('spPopupsLoaded');
function createScriptElement(src) {
  return new Promise(function (resolve) {
    var script = document.createElement('script');
    script.setAttribute('async', '');
    script.src = src;
    document.getElementsByTagName('body')[0].appendChild(script);
    script.onload = function () {
      return resolve();
    };
  });
}
function insert() {
  var _window, _window$sp, _window$sp$popups;
  var popupsAlreadyLoaded = (_window = window) === null || _window === void 0 ? void 0 : (_window$sp = _window.sp) === null || _window$sp === void 0 ? void 0 : (_window$sp$popups = _window$sp.popups) === null || _window$sp$popups === void 0 ? void 0 : _window$sp$popups.projectId;
  if (popupsAlreadyLoaded) return;
  var widget = document.querySelector('[data-chats-widget-id]');
  window.sp = _objectSpread(_objectSpread({}, window.sp), {}, {
    popups: {
      projectId: widget.dataset.chatsWidgetId
    }
  });
  createScriptElement(scriptSrc()).then(function () {
    var popup = document.getElementsByTagName('sp-popups').item(0);
    popup.style.zIndex = '2147483647';
    popup.style.position = 'fixed';
    setTimeout(function () {
      return document.dispatchEvent(spPopupsLoadedEvent);
    });
  });
}
function scriptSrc() {
  var widget = document.querySelector('[data-chats-widget-id]');
  var src = widget.getAttribute('src');
  var domain = src.split('/')[2];
  if (domain.includes('localhost')) {
    return "http://".concat(domain, "/build/bundle.js");
  }
  return "https://".concat(domain, "/bundle.js.gz");
}
insert();