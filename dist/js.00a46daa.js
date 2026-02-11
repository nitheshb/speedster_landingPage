// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/index.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import Cursor from "./cursor";
// import { gsap } from "gsap";
// import { gsap } from "gsap";
// import { lerp, getMousePos, getSiblings } from "./utils";
// Grab the mouse position and set it to mouse state
var mouse = {
  x: 0,
  y: 0
};
window.addEventListener("mousemove", function (ev) {
  return mouse = getMousePos(ev);
});

var Cursor = /*#__PURE__*/function () {
  function Cursor(el) {
    var _this = this;

    _classCallCheck(this, Cursor);

    // Varibles
    this.Cursor = el;
    this.Cursor.style.opacity = 0;
    this.Item = document.querySelectorAll(".hero-inner-link-item");
    this.Hero = document.querySelector(".hero-inner");
    this.bounds = this.Cursor.getBoundingClientRect();
    this.cursorConfigs = {
      x: {
        previous: 0,
        current: 0,
        amt: 0.2
      },
      y: {
        previous: 0,
        current: 0,
        amt: 0.2
      }
    };

    this.onMouseMoveEv = function () {
      _this.cursorConfigs.x.previous = _this.cursorConfigs.x.current = mouse.x;
      _this.cursorConfigs.y.previous = _this.cursorConfigs.y.previous = mouse.y; // Set cursor opacity to 1 when hovered on screen

      gsap.to(_this.Cursor, {
        duration: 1,
        ease: "Power3.easeOut",
        opacity: 1
      }); // Execute scale function

      _this.onScaleMouse(); // The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint. The method takes a callback as an argument to be invoked before the repaint.


      requestAnimationFrame(function () {
        return _this.render();
      }); // Clean up function

      window.removeEventListener("mousemove", _this.onMouseMoveEv);
    }; // Scale cursor animation


    window.addEventListener("mousemove", this.onMouseMoveEv);
  }

  _createClass(Cursor, [{
    key: "onScaleMouse",
    value: function onScaleMouse() {
      var _this2 = this;

      // Loop through all items
      this.Item.forEach(function (link) {
        // If I am hovering on the item for on page load I want to scale the cursor media
        if (link.matches(":hover")) {
          _this2.setVideo(link);

          _this2.ScaleCursor(_this2.Cursor.children[0], 0.8);
        } //On mouse enter scale the media-cursor to .8


        link.addEventListener("mouseenter", function () {
          _this2.setVideo(link);

          _this2.ScaleCursor(_this2.Cursor.children[0], 0.8);
        }); //On mouse enter scale the media-cursor to 0

        link.addEventListener("mouseleave", function () {
          _this2.ScaleCursor(_this2.Cursor.children[0], 0);
        }); //Hover on a tag to expand to 1.2

        link.children[1].addEventListener("mouseenter", function () {
          _this2.Cursor.classList.add("media-blend");

          _this2.ScaleCursor(_this2.Cursor.children[0], 1.2);
        }); // Bring scale back down .8

        link.children[1].addEventListener("mouseleave", function () {
          _this2.Cursor.classList.remove("media-blend");

          _this2.ScaleCursor(_this2.Cursor.children[0], 0.8);
        });
      });
    }
  }, {
    key: "setVideo",
    value: function setVideo(el) {
      // Grab the data-video-src and make sure it matches the video that should be displayed
      var src = el.getAttribute("data-video-src");
      var video = document.querySelector("#".concat(src));
      var siblings = getSiblings(video);

      if (video.id == src) {
        gsap.set(video, {
          zIndex: 4,
          opacity: 1
        });
        siblings.forEach(function (i) {
          gsap.set(i, {
            zIndex: 1,
            opacity: 0
          });
        });
      }
    }
  }, {
    key: "ScaleCursor",
    value: function ScaleCursor(el, amount) {
      gsap.to(el, {
        duration: 0.6,
        scale: amount,
        ease: "Power3.easeOut"
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      this.cursorConfigs.x.current = mouse.x;
      this.cursorConfigs.y.current = mouse.y; // lerp

      for (var key in this.cursorConfigs) {
        // key will be x & y
        // WTF IS LERP?
        // Lerp - A lerp returns the value between two numbers at a specified, decimal midpoint:
        this.cursorConfigs[key].previous = lerp(this.cursorConfigs[key].previous, this.cursorConfigs[key].current, this.cursorConfigs[key].amt);
      } // Setting the cursor x and y to our cursoer html element


      this.Cursor.style.transform = "translateX(".concat(this.cursorConfigs.x.previous, "px) translateY(").concat(this.cursorConfigs.y.previous, "px)"); // RAF

      requestAnimationFrame(function () {
        return _this3.render();
      });
    }
  }]);

  return Cursor;
}();

var body = document.querySelector("body");

window.onload = function () {
  body.classList.remove("loading");
  gsap.from(body, {
    opacity: 0,
    duration: 1,
    ease: "Power3.easeInOut"
  });
  var cursor = new Cursor(document.querySelector(".cursor"));
}; // Linear interpolation


var lerp = function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}; // Gets the mouse position


var getMousePos = function getMousePos(e) {
  var posx = 0;
  var posy = 0;
  if (!e) e = window.event;

  if (e.clientX || e.clientY) {
    posx = e.clientX;
    posy = e.clientY;
  }

  return {
    x: posx,
    y: posy
  };
}; // Get sibilings


var getSiblings = function getSiblings(e) {
  // for collecting siblings
  var siblings = []; // if no parent, return no sibling

  if (!e.parentNode) {
    return siblings;
  } // first child of the parent node


  var sibling = e.parentNode.firstChild; // collecting siblings

  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== e) {
      siblings.push(sibling);
    }

    sibling = sibling.nextSibling;
  }

  return siblings;
};
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54415" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map