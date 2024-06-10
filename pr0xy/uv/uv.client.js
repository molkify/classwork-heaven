(() => {
  var Ie = Object.create;
  var q = Object.defineProperty;
  var He = Object.getOwnPropertyDescriptor;
  var Ae = Object.getOwnPropertyNames;
  var Ce = Object.getPrototypeOf,
    Te = Object.prototype.hasOwnProperty;
  var Ue = (a, t) => () => (
    t || a((t = { exports: {} }).exports, t), t.exports
  );
  var je = (a, t, r, e) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let n of Ae(t))
        !Te.call(a, n) &&
          n !== r &&
          q(a, n, {
            get: () => t[n],
            enumerable: !(e = He(t, n)) || e.enumerable,
          });
    return a;
  };
  var p = (a, t, r) => (
    (r = a != null ? Ie(Ce(a)) : {}),
    je(
      t || !a || !a.__esModule
        ? q(r, "default", { value: a, enumerable: !0 })
        : r,
      a
    )
  );
  var c = Ue((Xe, P) => {
    "use strict";
    var m = typeof Reflect == "object" ? Reflect : null,
      _ =
        m && typeof m.apply == "function"
          ? m.apply
          : function (t, r, e) {
              return Function.prototype.apply.call(t, r, e);
            },
      f;
    m && typeof m.ownKeys == "function"
      ? (f = m.ownKeys)
      : Object.getOwnPropertySymbols
      ? (f = function (t) {
          return Object.getOwnPropertyNames(t).concat(
            Object.getOwnPropertySymbols(t)
          );
        })
      : (f = function (t) {
          return Object.getOwnPropertyNames(t);
        });
    function qe(a) {
      console && console.warn && console.warn(a);
    }
    var W =
      Number.isNaN ||
      function (t) {
        return t !== t;
      };
    function h() {
      h.init.call(this);
    }
    P.exports = h;
    P.exports.once = Be;
    h.EventEmitter = h;
    h.prototype._events = void 0;
    h.prototype._eventsCount = 0;
    h.prototype._maxListeners = void 0;
    var F = 10;
    function w(a) {
      if (typeof a != "function")
        throw new TypeError(
          'The "listener" argument must be of type Function. Received type ' +
            typeof a
        );
    }
    Object.defineProperty(h, "defaultMaxListeners", {
      enumerable: !0,
      get: function () {
        return F;
      },
      set: function (a) {
        if (typeof a != "number" || a < 0 || W(a))
          throw new RangeError(
            'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
              a +
              "."
          );
        F = a;
      },
    });
    h.init = function () {
      (this._events === void 0 ||
        this._events === Object.getPrototypeOf(this)._events) &&
        ((this._events = Object.create(null)), (this._eventsCount = 0)),
        (this._maxListeners = this._maxListeners || void 0);
    };
    h.prototype.setMaxListeners = function (t) {
      if (typeof t != "number" || t < 0 || W(t))
        throw new RangeError(
          'The value of "n" is out of range. It must be a non-negative number. Received ' +
            t +
            "."
        );
      return (this._maxListeners = t), this;
    };
    function B(a) {
      return a._maxListeners === void 0
        ? h.defaultMaxListeners
        : a._maxListeners;
    }
    h.prototype.getMaxListeners = function () {
      return B(this);
    };
    h.prototype.emit = function (t) {
      for (var r = [], e = 1; e < arguments.length; e++) r.push(arguments[e]);
      var n = t === "error",
        i = this._events;
      if (i !== void 0) n = n && i.error === void 0;
      else if (!n) return !1;
      if (n) {
        var o;
        if ((r.length > 0 && (o = r[0]), o instanceof Error)) throw o;
        var l = new Error(
          "Unhandled error." + (o ? " (" + o.message + ")" : "")
        );
        throw ((l.context = o), l);
      }
      var u = i[t];
      if (u === void 0) return !1;
      if (typeof u == "function") _(u, this, r);
      else
        for (var d = u.length, v = z(u, d), e = 0; e < d; ++e) _(v[e], this, r);
      return !0;
    };
    function G(a, t, r, e) {
      var n, i, o;
      if (
        (w(r),
        (i = a._events),
        i === void 0
          ? ((i = a._events = Object.create(null)), (a._eventsCount = 0))
          : (i.newListener !== void 0 &&
              (a.emit("newListener", t, r.listener ? r.listener : r),
              (i = a._events)),
            (o = i[t])),
        o === void 0)
      )
        (o = i[t] = r), ++a._eventsCount;
      else if (
        (typeof o == "function"
          ? (o = i[t] = e ? [r, o] : [o, r])
          : e
          ? o.unshift(r)
          : o.push(r),
        (n = B(a)),
        n > 0 && o.length > n && !o.warned)
      ) {
        o.warned = !0;
        var l = new Error(
          "Possible EventEmitter memory leak detected. " +
            o.length +
            " " +
            String(t) +
            " listeners added. Use emitter.setMaxListeners() to increase limit"
        );
        (l.name = "MaxListenersExceededWarning"),
          (l.emitter = a),
          (l.type = t),
          (l.count = o.length),
          qe(l);
      }
      return a;
    }
    h.prototype.addListener = function (t, r) {
      return G(this, t, r, !1);
    };
    h.prototype.on = h.prototype.addListener;
    h.prototype.prependListener = function (t, r) {
      return G(this, t, r, !0);
    };
    function _e() {
      if (!this.fired)
        return (
          this.target.removeListener(this.type, this.wrapFn),
          (this.fired = !0),
          arguments.length === 0
            ? this.listener.call(this.target)
            : this.listener.apply(this.target, arguments)
        );
    }
    function K(a, t, r) {
      var e = { fired: !1, wrapFn: void 0, target: a, type: t, listener: r },
        n = _e.bind(e);
      return (n.listener = r), (e.wrapFn = n), n;
    }
    h.prototype.once = function (t, r) {
      return w(r), this.on(t, K(this, t, r)), this;
    };
    h.prototype.prependOnceListener = function (t, r) {
      return w(r), this.prependListener(t, K(this, t, r)), this;
    };
    h.prototype.removeListener = function (t, r) {
      var e, n, i, o, l;
      if ((w(r), (n = this._events), n === void 0)) return this;
      if (((e = n[t]), e === void 0)) return this;
      if (e === r || e.listener === r)
        --this._eventsCount === 0
          ? (this._events = Object.create(null))
          : (delete n[t],
            n.removeListener &&
              this.emit("removeListener", t, e.listener || r));
      else if (typeof e != "function") {
        for (i = -1, o = e.length - 1; o >= 0; o--)
          if (e[o] === r || e[o].listener === r) {
            (l = e[o].listener), (i = o);
            break;
          }
        if (i < 0) return this;
        i === 0 ? e.shift() : Fe(e, i),
          e.length === 1 && (n[t] = e[0]),
          n.removeListener !== void 0 && this.emit("removeListener", t, l || r);
      }
      return this;
    };
    h.prototype.off = h.prototype.removeListener;
    h.prototype.removeAllListeners = function (t) {
      var r, e, n;
      if (((e = this._events), e === void 0)) return this;
      if (e.removeListener === void 0)
        return (
          arguments.length === 0
            ? ((this._events = Object.create(null)), (this._eventsCount = 0))
            : e[t] !== void 0 &&
              (--this._eventsCount === 0
                ? (this._events = Object.create(null))
                : delete e[t]),
          this
        );
      if (arguments.length === 0) {
        var i = Object.keys(e),
          o;
        for (n = 0; n < i.length; ++n)
          (o = i[n]), o !== "removeListener" && this.removeAllListeners(o);
        return (
          this.removeAllListeners("removeListener"),
          (this._events = Object.create(null)),
          (this._eventsCount = 0),
          this
        );
      }
      if (((r = e[t]), typeof r == "function")) this.removeListener(t, r);
      else if (r !== void 0)
        for (n = r.length - 1; n >= 0; n--) this.removeListener(t, r[n]);
      return this;
    };
    function X(a, t, r) {
      var e = a._events;
      if (e === void 0) return [];
      var n = e[t];
      return n === void 0
        ? []
        : typeof n == "function"
        ? r
          ? [n.listener || n]
          : [n]
        : r
        ? We(n)
        : z(n, n.length);
    }
    h.prototype.listeners = function (t) {
      return X(this, t, !0);
    };
    h.prototype.rawListeners = function (t) {
      return X(this, t, !1);
    };
    h.listenerCount = function (a, t) {
      return typeof a.listenerCount == "function"
        ? a.listenerCount(t)
        : Q.call(a, t);
    };
    h.prototype.listenerCount = Q;
    function Q(a) {
      var t = this._events;
      if (t !== void 0) {
        var r = t[a];
        if (typeof r == "function") return 1;
        if (r !== void 0) return r.length;
      }
      return 0;
    }
    h.prototype.eventNames = function () {
      return this._eventsCount > 0 ? f(this._events) : [];
    };
    function z(a, t) {
      for (var r = new Array(t), e = 0; e < t; ++e) r[e] = a[e];
      return r;
    }
    function Fe(a, t) {
      for (; t + 1 < a.length; t++) a[t] = a[t + 1];
      a.pop();
    }
    function We(a) {
      for (var t = new Array(a.length), r = 0; r < t.length; ++r)
        t[r] = a[r].listener || a[r];
      return t;
    }
    function Be(a, t) {
      return new Promise(function (r, e) {
        function n(o) {
          a.removeListener(t, i), e(o);
        }
        function i() {
          typeof a.removeListener == "function" && a.removeListener("error", n),
            r([].slice.call(arguments));
        }
        J(a, t, i, { once: !0 }), t !== "error" && Ge(a, n, { once: !0 });
      });
    }
    function Ge(a, t, r) {
      typeof a.on == "function" && J(a, "error", t, r);
    }
    function J(a, t, r, e) {
      if (typeof a.on == "function") e.once ? a.once(t, r) : a.on(t, r);
      else if (typeof a.addEventListener == "function")
        a.addEventListener(t, function n(i) {
          e.once && a.removeEventListener(t, n), r(i);
        });
      else
        throw new TypeError(
          'The "emitter" argument must be of type EventEmitter. Received type ' +
            typeof a
        );
    }
  });
  var Y = p(c(), 1);
  var g = class {
      #e;
      #t;
      constructor(t = {}, r = null, e = null) {
        (this.#e = !1),
          (this.#t = null),
          (this.data = t),
          (this.target = r),
          (this.that = e);
      }
      get intercepted() {
        return this.#e;
      }
      get returnValue() {
        return this.#t;
      }
      respondWith(t) {
        (this.#t = t), (this.#e = !0);
      }
    },
    s = g;
  var x = class extends Y.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = t.window),
          (this.document = this.window.document),
          (this.Document = this.window.Document || {}),
          (this.DOMParser = this.window.DOMParser || {}),
          (this.docProto = this.Document.prototype || {}),
          (this.domProto = this.DOMParser.prototype || {}),
          (this.title = t.nativeMethods.getOwnPropertyDescriptor(
            this.docProto,
            "title"
          )),
          (this.cookie = t.nativeMethods.getOwnPropertyDescriptor(
            this.docProto,
            "cookie"
          )),
          (this.referrer = t.nativeMethods.getOwnPropertyDescriptor(
            this.docProto,
            "referrer"
          )),
          (this.domain = t.nativeMethods.getOwnPropertyDescriptor(
            this.docProto,
            "domain"
          )),
          (this.documentURI = t.nativeMethods.getOwnPropertyDescriptor(
            this.docProto,
            "documentURI"
          )),
          (this.write = this.docProto.write),
          (this.writeln = this.docProto.writeln),
          (this.querySelector = this.docProto.querySelector),
          (this.querySelectorAll = this.docProto.querySelectorAll),
          (this.parseFromString = this.domProto.parseFromString),
          (this.URL = t.nativeMethods.getOwnPropertyDescriptor(
            this.docProto,
            "URL"
          ));
      }
      overrideParseFromString() {
        this.ctx.override(this.domProto, "parseFromString", (t, r, e) => {
          if (2 > e.length) return t.apply(r, e);
          let [n, i] = e,
            o = new s({ string: n, type: i }, t, r);
          return (
            this.emit("parseFromString", o),
            o.intercepted
              ? o.returnValue
              : o.target.call(o.that, o.data.string, o.data.type)
          );
        });
      }
      overrideQuerySelector() {
        this.ctx.override(this.docProto, "querySelector", (t, r, e) => {
          if (!e.length) return t.apply(r, e);
          let [n] = e,
            i = new s({ selectors: n }, t, r);
          return (
            this.emit("querySelector", i),
            i.intercepted
              ? i.returnValue
              : i.target.call(i.that, i.data.selectors)
          );
        });
      }
      overrideDomain() {
        this.ctx.overrideDescriptor(this.docProto, "domain", {
          get: (t, r) => {
            let e = new s({ value: t.call(r) }, t, r);
            return (
              this.emit("getDomain", e),
              e.intercepted ? e.returnValue : e.data.value
            );
          },
          set: (t, r, [e]) => {
            let n = new s({ value: e }, t, r);
            return (
              this.emit("setDomain", n),
              n.intercepted
                ? n.returnValue
                : n.target.call(n.that, n.data.value)
            );
          },
        });
      }
      overrideReferrer() {
        this.ctx.overrideDescriptor(this.docProto, "referrer", {
          get: (t, r) => {
            let e = new s({ value: t.call(r) }, t, r);
            return (
              this.emit("referrer", e),
              e.intercepted ? e.returnValue : e.data.value
            );
          },
        });
      }
      overrideCreateTreeWalker() {
        this.ctx.override(this.docProto, "createTreeWalker", (t, r, e) => {
          if (!e.length) return t.apply(r, e);
          let [n, i = 4294967295, o, l] = e,
            u = new s(
              { root: n, show: i, filter: o, expandEntityReferences: l },
              t,
              r
            );
          return (
            this.emit("createTreeWalker", u),
            u.intercepted
              ? u.returnValue
              : u.target.call(
                  u.that,
                  u.data.root,
                  u.data.show,
                  u.data.filter,
                  u.data.expandEntityReferences
                )
          );
        });
      }
      overrideWrite() {
        this.ctx.override(this.docProto, "write", (t, r, e) => {
          if (!e.length) return t.apply(r, e);
          let [...n] = e,
            i = new s({ html: n }, t, r);
          return (
            this.emit("write", i),
            i.intercepted ? i.returnValue : i.target.apply(i.that, i.data.html)
          );
        }),
          this.ctx.override(this.docProto, "writeln", (t, r, e) => {
            if (!e.length) return t.apply(r, e);
            let [...n] = e,
              i = new s({ html: n }, t, r);
            return (
              this.emit("writeln", i),
              i.intercepted
                ? i.returnValue
                : i.target.apply(i.that, i.data.html)
            );
          });
      }
      overrideDocumentURI() {
        this.ctx.overrideDescriptor(this.docProto, "documentURI", {
          get: (t, r) => {
            let e = new s({ value: t.call(r) }, t, r);
            return (
              this.emit("documentURI", e),
              e.intercepted ? e.returnValue : e.data.value
            );
          },
        });
      }
      overrideURL() {
        this.ctx.overrideDescriptor(this.docProto, "URL", {
          get: (t, r) => {
            let e = new s({ value: t.call(r) }, t, r);
            return (
              this.emit("url", e), e.intercepted ? e.returnValue : e.data.value
            );
          },
        });
      }
      overrideCookie() {
        this.ctx.overrideDescriptor(this.docProto, "cookie", {
          get: (t, r) => {
            let e = new s({ value: t.call(r) }, t, r);
            return (
              this.emit("getCookie", e),
              e.intercepted ? e.returnValue : e.data.value
            );
          },
          set: (t, r, [e]) => {
            let n = new s({ value: e }, t, r);
            return (
              this.emit("setCookie", n),
              n.intercepted
                ? n.returnValue
                : n.target.call(n.that, n.data.value)
            );
          },
        });
      }
      overrideTitle() {
        this.ctx.overrideDescriptor(this.docProto, "title", {
          get: (t, r) => {
            let e = new s({ value: t.call(r) }, t, r);
            return (
              this.emit("getTitle", e),
              e.intercepted ? e.returnValue : e.data.value
            );
          },
          set: (t, r, [e]) => {
            let n = new s({ value: e }, t, r);
            return (
              this.emit("setTitle", n),
              n.intercepted
                ? n.returnValue
                : n.target.call(n.that, n.data.value)
            );
          },
        });
      }
    },
    Z = x;
  var $ = p(c(), 1);
  var b = class extends $.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = t.window),
          (this.Audio = this.window.Audio),
          (this.Element = this.window.Element),
          (this.elemProto = this.Element ? this.Element.prototype : {}),
          (this.innerHTML = t.nativeMethods.getOwnPropertyDescriptor(
            this.elemProto,
            "innerHTML"
          )),
          (this.outerHTML = t.nativeMethods.getOwnPropertyDescriptor(
            this.elemProto,
            "outerHTML"
          )),
          (this.setAttribute = this.elemProto.setAttribute),
          (this.getAttribute = this.elemProto.getAttribute),
          (this.removeAttribute = this.elemProto.removeAttribute),
          (this.hasAttribute = this.elemProto.hasAttribute),
          (this.querySelector = this.elemProto.querySelector),
          (this.querySelectorAll = this.elemProto.querySelectorAll),
          (this.insertAdjacentHTML = this.elemProto.insertAdjacentHTML),
          (this.insertAdjacentText = this.elemProto.insertAdjacentText);
      }
      overrideQuerySelector() {
        this.ctx.override(this.elemProto, "querySelector", (t, r, e) => {
          if (!e.length) return t.apply(r, e);
          let [n] = e,
            i = new s({ selectors: n }, t, r);
          return (
            this.emit("querySelector", i),
            i.intercepted
              ? i.returnValue
              : i.target.call(i.that, i.data.selectors)
          );
        });
      }
      overrideAttribute() {
        this.ctx.override(this.elemProto, "getAttribute", (t, r, e) => {
          if (!e.length) return t.apply(r, e);
          let [n] = e,
            i = new s({ name: n }, t, r);
          return (
            this.emit("getAttribute", i),
            i.intercepted ? i.returnValue : i.target.call(i.that, i.data.name)
          );
        }),
          this.ctx.override(this.elemProto, "setAttribute", (t, r, e) => {
            if (2 > e.length) return t.apply(r, e);
            let [n, i] = e,
              o = new s({ name: n, value: i }, t, r);
            return (
              this.emit("setAttribute", o),
              o.intercepted
                ? o.returnValue
                : o.target.call(o.that, o.data.name, o.data.value)
            );
          }),
          this.ctx.override(this.elemProto, "hasAttribute", (t, r, e) => {
            if (!e.length) return t.apply(r, e);
            let [n] = e,
              i = new s({ name: n }, t, r);
            return (
              this.emit("hasAttribute", i),
              i.intercepted ? i.returnValue : i.target.call(i.that, i.data.name)
            );
          }),
          this.ctx.override(this.elemProto, "removeAttribute", (t, r, e) => {
            if (!e.length) return t.apply(r, e);
            let [n] = e,
              i = new s({ name: n }, t, r);
            return (
              this.emit("removeAttribute", i),
              i.intercepted ? i.returnValue : i.target.call(i.that, i.data.name)
            );
          });
      }
      overrideAudio() {
        this.ctx.override(
          this.window,
          "Audio",
          (t, r, e) => {
            if (!e.length) return new t(...e);
            let [n] = e,
              i = new s({ url: n }, t, r);
            return (
              this.emit("audio", i),
              i.intercepted ? i.returnValue : new i.target(i.data.url)
            );
          },
          !0
        );
      }
      overrideHtml() {
        this.hookProperty(this.Element, "innerHTML", {
          get: (t, r) => {
            let e = new s({ value: t.call(r) }, t, r);
            return (
              this.emit("getInnerHTML", e),
              e.intercepted ? e.returnValue : e.data.value
            );
          },
          set: (t, r, [e]) => {
            let n = new s({ value: e }, t, r);
            if ((this.emit("setInnerHTML", n), n.intercepted))
              return n.returnValue;
            t.call(r, n.data.value);
          },
        }),
          this.hookProperty(this.Element, "outerHTML", {
            get: (t, r) => {
              let e = new s({ value: t.call(r) }, t, r);
              return (
                this.emit("getOuterHTML", e),
                e.intercepted ? e.returnValue : e.data.value
              );
            },
            set: (t, r, [e]) => {
              let n = new s({ value: e }, t, r);
              if ((this.emit("setOuterHTML", n), n.intercepted))
                return n.returnValue;
              t.call(r, n.data.value);
            },
          });
      }
      overrideInsertAdjacentHTML() {
        this.ctx.override(this.elemProto, "insertAdjacentHTML", (t, r, e) => {
          if (2 > e.length) return t.apply(r, e);
          let [n, i] = e,
            o = new s({ position: n, html: i }, t, r);
          return (
            this.emit("insertAdjacentHTML", o),
            o.intercepted
              ? o.returnValue
              : o.target.call(o.that, o.data.position, o.data.html)
          );
        });
      }
      overrideInsertAdjacentText() {
        this.ctx.override(this.elemProto, "insertAdjacentText", (t, r, e) => {
          if (2 > e.length) return t.apply(r, e);
          let [n, i] = e,
            o = new s({ position: n, text: i }, t, r);
          return (
            this.emit("insertAdjacentText", o),
            o.intercepted
              ? o.returnValue
              : o.target.call(o.that, o.data.position, o.data.text)
          );
        });
      }
      hookProperty(t, r, e) {
        if (!t) return !1;
        if (this.ctx.nativeMethods.isArray(t)) {
          for (let i of t) this.hookProperty(i, r, e);
          return !0;
        }
        let n = t.prototype;
        return this.ctx.overrideDescriptor(n, r, e), !0;
      }
    },
    ee = b;
  var te = p(c(), 1);
  var L = class extends te.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = t.window),
          (this.Node = t.window.Node || {}),
          (this.nodeProto = this.Node.prototype || {}),
          (this.compareDocumentPosition =
            this.nodeProto.compareDocumentPosition),
          (this.contains = this.nodeProto.contains),
          (this.insertBefore = this.nodeProto.insertBefore),
          (this.replaceChild = this.nodeProto.replaceChild),
          (this.append = this.nodeProto.append),
          (this.appendChild = this.nodeProto.appendChild),
          (this.removeChild = this.nodeProto.removeChild),
          (this.textContent = t.nativeMethods.getOwnPropertyDescriptor(
            this.nodeProto,
            "textContent"
          )),
          (this.parentNode = t.nativeMethods.getOwnPropertyDescriptor(
            this.nodeProto,
            "parentNode"
          )),
          (this.parentElement = t.nativeMethods.getOwnPropertyDescriptor(
            this.nodeProto,
            "parentElement"
          )),
          (this.childNodes = t.nativeMethods.getOwnPropertyDescriptor(
            this.nodeProto,
            "childNodes"
          )),
          (this.baseURI = t.nativeMethods.getOwnPropertyDescriptor(
            this.nodeProto,
            "baseURI"
          )),
          (this.previousSibling = t.nativeMethods.getOwnPropertyDescriptor(
            this.nodeProto,
            "previousSibling"
          )),
          (this.ownerDocument = t.nativeMethods.getOwnPropertyDescriptor(
            this.nodeProto,
            "ownerDocument"
          ));
      }
      overrideTextContent() {
        this.ctx.overrideDescriptor(this.nodeProto, "textContent", {
          get: (t, r) => {
            let e = new s({ value: t.call(r) }, t, r);
            return (
              this.emit("getTextContent", e),
              e.intercepted ? e.returnValue : e.data.value
            );
          },
          set: (t, r, [e]) => {
            let n = new s({ value: e }, t, r);
            if ((this.emit("setTextContent", n), n.intercepted))
              return n.returnValue;
            t.call(r, n.data.value);
          },
        });
      }
      overrideAppend() {
        this.ctx.override(this.nodeProto, "append", (t, r, [...e]) => {
          let n = new s({ nodes: e }, t, r);
          return (
            this.emit("append", n),
            n.intercepted ? n.returnValue : n.target.call(n.that, n.data.nodes)
          );
        }),
          this.ctx.override(this.nodeProto, "appendChild", (t, r, e) => {
            if (!e.length) return t.apply(r, e);
            let [n] = e,
              i = new s({ node: n }, t, r);
            return (
              this.emit("appendChild", i),
              i.intercepted ? i.returnValue : i.target.call(i.that, i.data.node)
            );
          });
      }
      overrideBaseURI() {
        this.ctx.overrideDescriptor(this.nodeProto, "baseURI", {
          get: (t, r) => {
            let e = new s({ value: t.call(r) }, t, r);
            return (
              this.emit("baseURI", e),
              e.intercepted ? e.returnValue : e.data.value
            );
          },
        });
      }
      overrideParent() {
        this.ctx.overrideDescriptor(this.nodeProto, "parentNode", {
          get: (t, r) => {
            let e = new s({ node: t.call(r) }, t, r);
            return (
              this.emit("parentNode", e),
              e.intercepted ? e.returnValue : e.data.node
            );
          },
        }),
          this.ctx.overrideDescriptor(this.nodeProto, "parentElement", {
            get: (t, r) => {
              let e = new s({ element: t.call(r) }, t, r);
              return (
                this.emit("parentElement", e),
                e.intercepted ? e.returnValue : e.data.node
              );
            },
          });
      }
      overrideOwnerDocument() {
        this.ctx.overrideDescriptor(this.nodeProto, "ownerDocument", {
          get: (t, r) => {
            let e = new s({ document: t.call(r) }, t, r);
            return (
              this.emit("ownerDocument", e),
              e.intercepted ? e.returnValue : e.data.document
            );
          },
        });
      }
      overrideCompareDocumentPosit1ion() {
        this.ctx.override(
          this.nodeProto,
          "compareDocumentPosition",
          (t, r, e) => {
            if (!e.length) return t.apply(r, e);
            let [n] = e,
              i = new s({ node: n }, t, r);
            return i.intercepted
              ? i.returnValue
              : i.target.call(i.that, i.data.node);
          }
        );
      }
      overrideChildMethods() {
        this.ctx.override(this.nodeProto, "removeChild");
      }
    },
    re = L;
  var ie = p(c(), 1);
  var O = class extends ie.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = t.window),
          (this.Attr = this.window.Attr || {}),
          (this.attrProto = this.Attr.prototype || {}),
          (this.value = t.nativeMethods.getOwnPropertyDescriptor(
            this.attrProto,
            "value"
          )),
          (this.name = t.nativeMethods.getOwnPropertyDescriptor(
            this.attrProto,
            "name"
          )),
          (this.getNamedItem = this.attrProto.getNamedItem || null),
          (this.setNamedItem = this.attrProto.setNamedItem || null),
          (this.removeNamedItem = this.attrProto.removeNamedItem || null),
          (this.getNamedItemNS = this.attrProto.getNamedItemNS || null),
          (this.setNamedItemNS = this.attrProto.setNamedItemNS || null),
          (this.removeNamedItemNS = this.attrProto.removeNamedItemNS || null),
          (this.item = this.attrProto.item || null);
      }
      overrideNameValue() {
        this.ctx.overrideDescriptor(this.attrProto, "name", {
          get: (t, r) => {
            let e = new s({ value: t.call(r) }, t, r);
            return (
              this.emit("name", e), e.intercepted ? e.returnValue : e.data.value
            );
          },
        }),
          this.ctx.overrideDescriptor(this.attrProto, "value", {
            get: (t, r) => {
              let e = new s(
                { name: this.name.get.call(r), value: t.call(r) },
                t,
                r
              );
              return (
                this.emit("getValue", e),
                e.intercepted ? e.returnValue : e.data.value
              );
            },
            set: (t, r, [e]) => {
              let n = new s({ name: this.name.get.call(r), value: e }, t, r);
              if ((this.emit("setValue", n), n.intercepted))
                return n.returnValue;
              n.target.call(n.that, n.data.value);
            },
          });
      }
      overrideItemMethods() {
        this.ctx.override(this.attrProto, "getNamedItem", (t, r, e) => {
          if (!e.length) return t.apply(r, e);
          let [n] = e,
            i = new s({ name: n }, t, r);
          return (
            this.emit("getNamedItem", i),
            i.intercepted ? i.returnValue : i.target.call(i.that, i.data.name)
          );
        }),
          this.ctx.override(this.attrProto, "setNamedItem", (t, r, e) => {
            if (2 > e.length) return t.apply(r, e);
            let [n, i] = e,
              o = new s({ name: n, value: i }, t, r);
            return (
              this.emit("setNamedItem", o),
              o.intercepted
                ? o.returnValue
                : o.target.call(o.that, o.data.name, o.data.value)
            );
          }),
          this.ctx.override(this.attrProto, "removeNamedItem", (t, r, e) => {
            if (!e.length) return t.apply(r, e);
            let [n] = e,
              i = new s({ name: n }, t, r);
            return (
              this.emit("removeNamedItem", i),
              i.intercepted ? i.returnValue : i.target.call(i.that, i.data.name)
            );
          }),
          this.ctx.override(this.attrProto, "item", (t, r, e) => {
            if (!e.length) return t.apply(r, e);
            let [n] = e,
              i = new s({ index: n }, t, r);
            return (
              this.emit("item", i),
              i.intercepted ? i.returnValue : i.target.call(i.that, i.data.name)
            );
          }),
          this.ctx.override(this.attrProto, "getNamedItemNS", (t, r, e) => {
            if (2 > e.length) return t.apply(r, e);
            let [n, i] = e,
              o = new s({ namespace: n, localName: i }, t, r);
            return (
              this.emit("getNamedItemNS", o),
              o.intercepted
                ? o.returnValue
                : o.target.call(o.that, o.data.namespace, o.data.localName)
            );
          }),
          this.ctx.override(this.attrProto, "setNamedItemNS", (t, r, e) => {
            if (!e.length) return t.apply(r, e);
            let [n] = e,
              i = new s({ attr: n }, t, r);
            return (
              this.emit("setNamedItemNS", i),
              i.intercepted ? i.returnValue : i.target.call(i.that, i.data.name)
            );
          }),
          this.ctx.override(this.attrProto, "removeNamedItemNS", (t, r, e) => {
            if (2 > e.length) return t.apply(r, e);
            let [n, i] = e,
              o = new s({ namespace: n, localName: i }, t, r);
            return (
              this.emit("removeNamedItemNS", o),
              o.intercepted
                ? o.returnValue
                : o.target.call(o.that, o.data.namespace, o.data.localName)
            );
          });
      }
    },
    ne = O;
  var oe = p(c(), 1);
  var M = class extends oe.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = t.window),
          (this.Function = this.window.Function),
          (this.fnProto = this.Function.prototype),
          (this.toString = this.fnProto.toString),
          (this.fnStrings = t.fnStrings),
          (this.call = this.fnProto.call),
          (this.apply = this.fnProto.apply),
          (this.bind = this.fnProto.bind);
      }
      overrideFunction() {
        this.ctx.override(
          this.window,
          "Function",
          (t, r, e) => {
            if (!e.length) return t.apply(r, e);
            let n = e[e.length - 1],
              i = [];
            for (let l = 0; l < e.length - 1; l++) i.push(e[l]);
            let o = new s({ script: n, args: i }, t, r);
            return (
              this.emit("function", o),
              o.intercepted
                ? o.returnValue
                : o.target.call(o.that, ...o.data.args, o.data.script)
            );
          },
          !0
        );
      }
      overrideToString() {
        this.ctx.override(this.fnProto, "toString", (t, r) => {
          let e = new s({ fn: r }, t, r);
          return (
            this.emit("toString", e),
            e.intercepted ? e.returnValue : e.target.call(e.data.fn)
          );
        });
      }
    },
    se = M;
  var ae = p(c(), 1);
  var E = class extends ae.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = t.window),
          (this.Object = this.window.Object),
          (this.getOwnPropertyDescriptors =
            this.Object.getOwnPropertyDescriptors),
          (this.getOwnPropertyDescriptor =
            this.Object.getOwnPropertyDescriptor),
          (this.getOwnPropertyNames = this.Object.getOwnPropertyNames);
      }
      overrideGetPropertyNames() {
        this.ctx.override(this.Object, "getOwnPropertyNames", (t, r, e) => {
          if (!e.length) return t.apply(r, e);
          let [n] = e,
            i = new s({ names: t.call(r, n) }, t, r);
          return (
            this.emit("getOwnPropertyNames", i),
            i.intercepted ? i.returnValue : i.data.names
          );
        });
      }
      overrideGetOwnPropertyDescriptors() {
        this.ctx.override(
          this.Object,
          "getOwnPropertyDescriptors",
          (t, r, e) => {
            if (!e.length) return t.apply(r, e);
            let [n] = e,
              i = new s({ descriptors: t.call(r, n) }, t, r);
            return (
              this.emit("getOwnPropertyDescriptors", i),
              i.intercepted ? i.returnValue : i.data.descriptors
            );
          }
        );
      }
    },
    le = E;
  var he = p(c(), 1);
  var S = class extends he.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = t.window),
          (this.fetch = this.window.fetch),
          (this.Request = this.window.Request),
          (this.Response = this.window.Response),
          (this.Headers = this.window.Headers),
          (this.reqProto = this.Request ? this.Request.prototype : {}),
          (this.resProto = this.Response ? this.Response.prototype : {}),
          (this.headersProto = this.Headers ? this.Headers.prototype : {}),
          (this.reqUrl = t.nativeMethods.getOwnPropertyDescriptor(
            this.reqProto,
            "url"
          )),
          (this.resUrl = t.nativeMethods.getOwnPropertyDescriptor(
            this.resProto,
            "url"
          )),
          (this.reqHeaders = t.nativeMethods.getOwnPropertyDescriptor(
            this.reqProto,
            "headers"
          )),
          (this.resHeaders = t.nativeMethods.getOwnPropertyDescriptor(
            this.resProto,
            "headers"
          ));
      }
      override() {
        return (
          this.overrideRequest(), this.overrideUrl(), this.overrideHeaders(), !0
        );
      }
      overrideRequest() {
        return this.fetch
          ? (this.ctx.override(this.window, "fetch", (t, r, e) => {
              if (!e.length || e[0] instanceof this.Request)
                return t.apply(r, e);
              let [n, i = {}] = e,
                o = new s({ input: n, options: i }, t, r);
              return (
                this.emit("request", o),
                o.intercepted
                  ? o.returnValue
                  : o.target.call(o.that, o.data.input, o.data.options)
              );
            }),
            this.ctx.override(
              this.window,
              "Request",
              (t, r, e) => {
                if (!e.length) return new t(...e);
                let [n, i = {}] = e,
                  o = new s({ input: n, options: i }, t);
                return (
                  this.emit("request", o),
                  o.intercepted
                    ? o.returnValue
                    : new o.target(o.data.input, o.data.options)
                );
              },
              !0
            ),
            !0)
          : !1;
      }
      overrideUrl() {
        return (
          this.ctx.overrideDescriptor(this.reqProto, "url", {
            get: (t, r) => {
              let e = new s({ value: t.call(r) }, t, r);
              return (
                this.emit("requestUrl", e),
                e.intercepted ? e.returnValue : e.data.value
              );
            },
          }),
          this.ctx.overrideDescriptor(this.resProto, "url", {
            get: (t, r) => {
              let e = new s({ value: t.call(r) }, t, r);
              return (
                this.emit("responseUrl", e),
                e.intercepted ? e.returnValue : e.data.value
              );
            },
          }),
          !0
        );
      }
      overrideHeaders() {
        return this.Headers
          ? (this.ctx.overrideDescriptor(this.reqProto, "headers", {
              get: (t, r) => {
                let e = new s({ value: t.call(r) }, t, r);
                return (
                  this.emit("requestHeaders", e),
                  e.intercepted ? e.returnValue : e.data.value
                );
              },
            }),
            this.ctx.overrideDescriptor(this.resProto, "headers", {
              get: (t, r) => {
                let e = new s({ value: t.call(r) }, t, r);
                return (
                  this.emit("responseHeaders", e),
                  e.intercepted ? e.returnValue : e.data.value
                );
              },
            }),
            this.ctx.override(this.headersProto, "get", (t, r, [e]) => {
              if (!e) return t.call(r);
              let n = new s({ name: e, value: t.call(r, e) }, t, r);
              return (
                this.emit("getHeader", n),
                n.intercepted ? n.returnValue : n.data.value
              );
            }),
            this.ctx.override(this.headersProto, "set", (t, r, e) => {
              if (2 > e.length) return t.apply(r, e);
              let [n, i] = e,
                o = new s({ name: n, value: i }, t, r);
              return (
                this.emit("setHeader", o),
                o.intercepted
                  ? o.returnValue
                  : o.target.call(o.that, o.data.name, o.data.value)
              );
            }),
            this.ctx.override(this.headersProto, "has", (t, r, e) => {
              if (!e.length) return t.call(r);
              let [n] = e,
                i = new s({ name: n, value: t.call(r, n) }, t, r);
              return (
                this.emit("hasHeader", i),
                i.intercepted ? i.returnValue : i.data
              );
            }),
            this.ctx.override(this.headersProto, "append", (t, r, e) => {
              if (2 > e.length) return t.apply(r, e);
              let [n, i] = e,
                o = new s({ name: n, value: i }, t, r);
              return (
                this.emit("appendHeader", o),
                o.intercepted
                  ? o.returnValue
                  : o.target.call(o.that, o.data.name, o.data.value)
              );
            }),
            this.ctx.override(this.headersProto, "delete", (t, r, e) => {
              if (!e.length) return t.apply(r, e);
              let [n] = e,
                i = new s({ name: n }, t, r);
              return (
                this.emit("deleteHeader", i),
                i.intercepted
                  ? i.returnValue
                  : i.target.call(i.that, i.data.name)
              );
            }),
            !0)
          : !1;
      }
    },
    ue = S;
  var de = p(c(), 1);
  var D = class extends de.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = t.window),
          (this.XMLHttpRequest = this.window.XMLHttpRequest),
          (this.xhrProto = this.window.XMLHttpRequest
            ? this.window.XMLHttpRequest.prototype
            : {}),
          (this.open = this.xhrProto.open),
          (this.abort = this.xhrProto.abort),
          (this.send = this.xhrProto.send),
          (this.overrideMimeType = this.xhrProto.overrideMimeType),
          (this.getAllResponseHeaders = this.xhrProto.getAllResponseHeaders),
          (this.getResponseHeader = this.xhrProto.getResponseHeader),
          (this.setRequestHeader = this.xhrProto.setRequestHeader),
          (this.responseURL = t.nativeMethods.getOwnPropertyDescriptor(
            this.xhrProto,
            "responseURL"
          )),
          (this.responseText = t.nativeMethods.getOwnPropertyDescriptor(
            this.xhrProto,
            "responseText"
          ));
      }
      override() {
        this.overrideOpen(),
          this.overrideSend(),
          this.overrideMimeType(),
          this.overrideGetResHeader(),
          this.overrideGetResHeaders(),
          this.overrideSetReqHeader();
      }
      overrideOpen() {
        this.ctx.override(this.xhrProto, "open", (t, r, e) => {
          if (2 > e.length) return t.apply(r, e);
          let [n, i, o = !0, l = null, u = null] = e,
            d = new s(
              { method: n, input: i, async: o, user: l, password: u },
              t,
              r
            );
          return (
            this.emit("open", d),
            d.intercepted
              ? d.returnValue
              : d.target.call(
                  d.that,
                  d.data.method,
                  d.data.input,
                  d.data.async,
                  d.data.user,
                  d.data.password
                )
          );
        });
      }
      overrideResponseUrl() {
        this.ctx.overrideDescriptor(this.xhrProto, "responseURL", {
          get: (t, r) => {
            let e = new s({ value: t.call(r) }, t, r);
            return (
              this.emit("responseUrl", e),
              e.intercepted ? e.returnValue : e.data.value
            );
          },
        });
      }
      overrideSend() {
        this.ctx.override(this.xhrProto, "send", (t, r, [e = null]) => {
          let n = new s({ body: e }, t, r);
          return (
            this.emit("send", n),
            n.intercepted ? n.returnValue : n.target.call(n.that, n.data.body)
          );
        });
      }
      overrideSetReqHeader() {
        this.ctx.override(this.xhrProto, "setRequestHeader", (t, r, e) => {
          if (2 > e.length) return t.apply(r, e);
          let [n, i] = e,
            o = new s({ name: n, value: i }, t, r);
          return (
            this.emit("setReqHeader", o),
            o.intercepted
              ? o.returnValue
              : o.target.call(o.that, o.data.name, o.data.value)
          );
        });
      }
      overrideGetResHeaders() {
        this.ctx.override(this.xhrProto, "getAllResponseHeaders", (t, r) => {
          let e = new s({ value: t.call(r) }, t, r);
          return (
            this.emit("getAllResponseHeaders", e),
            e.intercepted ? e.returnValue : e.data.value
          );
        });
      }
      overrideGetResHeader() {
        this.ctx.override(this.xhrProto, "getResponseHeader", (t, r, e) => {
          if (!e.length) return t.apply(r, e);
          let [n] = e,
            i = new s({ name: n, value: t.call(r, n) }, t, r);
          return i.intercepted ? i.returnValue : i.data.value;
        });
      }
    },
    ce = D;
  var pe = p(c(), 1);
  var V = class extends pe.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = t.window),
          (this.EventSource = this.window.EventSource || {}),
          (this.esProto = this.EventSource.prototype || {}),
          (this.url = t.nativeMethods.getOwnPropertyDescriptor(
            this.esProto,
            "url"
          )),
          (this.CONNECTING = 0),
          (this.OPEN = 1),
          (this.CLOSED = 2);
      }
      overrideConstruct() {
        this.ctx.override(
          this.window,
          "EventSource",
          (t, r, e) => {
            if (!e.length) return new t(...e);
            let [n, i = {}] = e,
              o = new s({ url: n, config: i }, t, r);
            return (
              this.emit("construct", o),
              o.intercepted
                ? o.returnValue
                : new o.target(o.data.url, o.data.config)
            );
          },
          !0
        ),
          "EventSource" in this.window &&
            ((this.window.EventSource.CONNECTING = this.CONNECTING),
            (this.window.EventSource.OPEN = this.OPEN),
            (this.window.EventSource.CLOSED = this.CLOSED));
      }
      overrideUrl() {
        this.ctx.overrideDescriptor(this.esProto, "url", {
          get: (t, r) => {
            let e = new s({ value: t.call(r) }, t, r);
            return this.emit("url", e), e.data.value;
          },
        });
      }
    },
    ve = V;
  var me = p(c(), 1);
  var k = class extends me.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = this.ctx.window),
          (this.History = this.window.History),
          (this.history = this.window.history),
          (this.historyProto = this.History ? this.History.prototype : {}),
          (this.pushState = this.historyProto.pushState),
          (this.replaceState = this.historyProto.replaceState),
          (this.go = this.historyProto.go),
          (this.back = this.historyProto.back),
          (this.forward = this.historyProto.forward);
      }
      override() {
        this.overridePushState(),
          this.overrideReplaceState(),
          this.overrideGo(),
          this.overrideForward(),
          this.overrideBack();
      }
      overridePushState() {
        this.ctx.override(this.historyProto, "pushState", (t, r, e) => {
          if (2 > e.length) return t.apply(r, e);
          let [n, i, o = ""] = e,
            l = new s({ state: n, title: i, url: o }, t, r);
          return (
            this.emit("pushState", l),
            l.intercepted
              ? l.returnValue
              : l.target.call(l.that, l.data.state, l.data.title, l.data.url)
          );
        });
      }
      overrideReplaceState() {
        this.ctx.override(this.historyProto, "replaceState", (t, r, e) => {
          if (2 > e.length) return t.apply(r, e);
          let [n, i, o = ""] = e,
            l = new s({ state: n, title: i, url: o }, t, r);
          return (
            this.emit("replaceState", l),
            l.intercepted
              ? l.returnValue
              : l.target.call(l.that, l.data.state, l.data.title, l.data.url)
          );
        });
      }
      overrideGo() {
        this.ctx.override(this.historyProto, "go", (t, r, [e]) => {
          let n = new s({ delta: e }, t, r);
          return (
            this.emit("go", n),
            n.intercepted ? n.returnValue : n.target.call(n.that, n.data.delta)
          );
        });
      }
      overrideForward() {
        this.ctx.override(this.historyProto, "forward", (t, r) => {
          let e = new s(null, t, r);
          return (
            this.emit("forward", e),
            e.intercepted ? e.returnValue : e.target.call(e.that)
          );
        });
      }
      overrideBack() {
        this.ctx.override(this.historyProto, "back", (t, r) => {
          let e = new s(null, t, r);
          return (
            this.emit("back", e),
            e.intercepted ? e.returnValue : e.target.call(e.that)
          );
        });
      }
    },
    fe = k;
  var we = p(c(), 1),
    R = class extends we.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = t.window),
          (this.location = this.window.location),
          (this.WorkerLocation = this.ctx.worker
            ? this.window.WorkerLocation
            : null),
          (this.workerLocProto = this.WorkerLocation
            ? this.WorkerLocation.prototype
            : {}),
          (this.keys = [
            "href",
            "protocol",
            "host",
            "hostname",
            "port",
            "pathname",
            "search",
            "hash",
            "origin",
          ]),
          (this.HashChangeEvent = this.window.HashChangeEvent || null),
          (this.href = this.WorkerLocation
            ? t.nativeMethods.getOwnPropertyDescriptor(
                this.workerLocProto,
                "href"
              )
            : t.nativeMethods.getOwnPropertyDescriptor(this.location, "href"));
      }
      overrideWorkerLocation(t) {
        if (!this.WorkerLocation) return !1;
        let r = this;
        for (let e of this.keys)
          this.ctx.overrideDescriptor(this.workerLocProto, e, {
            get: () => t(r.href.get.call(this.location))[e],
          });
        return !0;
      }
      emulate(t, r) {
        let e = {},
          n = this;
        for (let i of n.keys)
          this.ctx.nativeMethods.defineProperty(e, i, {
            get() {
              return t(n.href.get.call(n.location))[i];
            },
            set:
              i !== "origin"
                ? function (o) {
                    switch (i) {
                      case "href":
                        n.location.href = r(o);
                        break;
                      case "hash":
                        n.emit(
                          "hashchange",
                          e.href,
                          o.trim().startsWith("#")
                            ? new URL(o.trim(), e.href).href
                            : new URL("#" + o.trim(), e.href).href,
                          n
                        );
                        break;
                      default:
                        {
                          let l = new URL(e.href);
                          (l[i] = o), (n.location.href = r(l.href));
                        }
                        break;
                    }
                  }
                : void 0,
            configurable: !1,
            enumerable: !0,
          });
        return (
          "reload" in this.location &&
            this.ctx.nativeMethods.defineProperty(e, "reload", {
              value: this.ctx.wrap(this.location, "reload", (i, o) =>
                i.call(o === e ? this.location : o)
              ),
              writable: !1,
              enumerable: !0,
            }),
          "replace" in this.location &&
            this.ctx.nativeMethods.defineProperty(e, "replace", {
              value: this.ctx.wrap(this.location, "assign", (i, o, l) => {
                (!l.length || o !== e) && i.call(o), (o = this.location);
                let [u] = l,
                  d = new URL(u, e.href);
                return i.call(o === e ? this.location : o, r(d.href));
              }),
              writable: !1,
              enumerable: !0,
            }),
          "assign" in this.location &&
            this.ctx.nativeMethods.defineProperty(e, "assign", {
              value: this.ctx.wrap(this.location, "assign", (i, o, l) => {
                (!l.length || o !== e) && i.call(o), (o = this.location);
                let [u] = l,
                  d = new URL(u, e.href);
                return i.call(o === e ? this.location : o, r(d.href));
              }),
              writable: !1,
              enumerable: !0,
            }),
          "ancestorOrigins" in this.location &&
            this.ctx.nativeMethods.defineProperty(e, "ancestorOrigins", {
              get() {
                let i = [];
                return (
                  n.window.DOMStringList &&
                    n.ctx.nativeMethods.setPrototypeOf(
                      i,
                      n.window.DOMStringList.prototype
                    ),
                  i
                );
              },
              set: void 0,
              enumerable: !0,
            }),
          this.ctx.nativeMethods.defineProperty(e, "toString", {
            value: this.ctx.wrap(this.location, "toString", () => e.href),
            enumerable: !0,
            writable: !1,
          }),
          this.ctx.nativeMethods.defineProperty(e, Symbol.toPrimitive, {
            value: () => e.href,
            writable: !1,
            enumerable: !1,
          }),
          this.ctx.window.Location &&
            this.ctx.nativeMethods.setPrototypeOf(
              e,
              this.ctx.window.Location.prototype
            ),
          e
        );
      }
    },
    N = R;
  var ye = p(c(), 1);
  var I = class extends ye.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = this.ctx.window),
          (this.postMessage = this.window.postMessage),
          (this.MessageEvent = this.window.MessageEvent || {}),
          (this.MessagePort = this.window.MessagePort || {}),
          (this.mpProto = this.MessagePort.prototype || {}),
          (this.mpPostMessage = this.mpProto.postMessage),
          (this.messageProto = this.MessageEvent.prototype || {}),
          (this.messageData = t.nativeMethods.getOwnPropertyDescriptor(
            this.messageProto,
            "data"
          )),
          (this.messageOrigin = t.nativeMethods.getOwnPropertyDescriptor(
            this.messageProto,
            "origin"
          ));
      }
      overridePostMessage() {
        this.ctx.override(this.window, "postMessage", (t, r, e) => {
          if (!e.length) return t.apply(r, e);
          let n, i, o;
          this.ctx.worker ? ([n, o = []] = e) : ([n, i, o = []] = e);
          let l = new s(
            { message: n, origin: i, transfer: o, worker: this.ctx.worker },
            t,
            r
          );
          return (
            this.emit("postMessage", l),
            l.intercepted
              ? l.returnValue
              : this.ctx.worker
              ? l.target.call(l.that, l.data.message, l.data.transfer)
              : l.target.call(
                  l.that,
                  l.data.message,
                  l.data.origin,
                  l.data.transfer
                )
          );
        });
      }
      wrapPostMessage(t, r, e = !1) {
        return this.ctx.wrap(t, r, (n, i, o) => {
          if (this.ctx.worker ? !o.length : 2 > o) return n.apply(i, o);
          let l, u, d;
          e ? (([l, d = []] = o), (u = null)) : ([l, u, d = []] = o);
          let v = new s(
            { message: l, origin: u, transfer: d, worker: this.ctx.worker },
            n,
            t
          );
          return (
            this.emit("postMessage", v),
            v.intercepted
              ? v.returnValue
              : e
              ? v.target.call(v.that, v.data.message, v.data.transfer)
              : v.target.call(
                  v.that,
                  v.data.message,
                  v.data.origin,
                  v.data.transfer
                )
          );
        });
      }
      overrideMessageOrigin() {
        this.ctx.overrideDescriptor(this.messageProto, "origin", {
          get: (t, r) => {
            let e = new s({ value: t.call(r) }, t, r);
            return (
              this.emit("origin", e),
              e.intercepted ? e.returnValue : e.data.value
            );
          },
        });
      }
      overrideMessageData() {
        this.ctx.overrideDescriptor(this.messageProto, "data", {
          get: (t, r) => {
            let e = new s({ value: t.call(r) }, t, r);
            return (
              this.emit("data", e), e.intercepted ? e.returnValue : e.data.value
            );
          },
        });
      }
    },
    Pe = I;
  var ge = p(c(), 1);
  var H = class extends ge.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = t.window),
          (this.navigator = this.window.navigator),
          (this.Navigator = this.window.Navigator || {}),
          (this.navProto = this.Navigator.prototype || {}),
          (this.sendBeacon = this.navProto.sendBeacon);
      }
      overrideSendBeacon() {
        this.ctx.override(this.navProto, "sendBeacon", (t, r, e) => {
          if (!e.length) return t.apply(r, e);
          let [n, i = ""] = e,
            o = new s({ url: n, data: i }, t, r);
          return (
            this.emit("sendBeacon", o),
            o.intercepted
              ? o.returnValue
              : o.target.call(o.that, o.data.url, o.data.data)
          );
        });
      }
    },
    xe = H;
  var be = p(c(), 1);
  var A = class extends be.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = t.window),
          (this.Worker = this.window.Worker || {}),
          (this.Worklet = this.window.Worklet || {}),
          (this.workletProto = this.Worklet.prototype || {}),
          (this.workerProto = this.Worker.prototype || {}),
          (this.postMessage = this.workerProto.postMessage),
          (this.terminate = this.workerProto.terminate),
          (this.addModule = this.workletProto.addModule);
      }
      overrideWorker() {
        this.ctx.override(
          this.window,
          "Worker",
          (t, r, e) => {
            if (!e.length) return new t(...e);
            let [n, i = {}] = e,
              o = new s({ url: n, options: i }, t, r);
            return (
              this.emit("worker", o),
              o.intercepted
                ? o.returnValue
                : new o.target(o.data.url, o.data.options)
            );
          },
          !0
        );
      }
      overrideAddModule() {
        this.ctx.override(this.workletProto, "addModule", (t, r, e) => {
          if (!e.length) return t.apply(r, e);
          let [n, i = {}] = e,
            o = new s({ url: n, options: i }, t, r);
          return (
            this.emit("addModule", o),
            o.intercepted
              ? o.returnValue
              : o.target.call(o.that, o.data.url, o.data.options)
          );
        });
      }
      overridePostMessage() {
        this.ctx.override(this.workerProto, "postMessage", (t, r, e) => {
          if (!e.length) return t.apply(r, e);
          let [n, i = []] = e,
            o = new s({ message: n, transfer: i }, t, r);
          return (
            this.emit("postMessage", o),
            o.intercepted
              ? o.returnValue
              : o.target.call(o.that, o.data.message, o.data.transfer)
          );
        });
      }
      overrideImportScripts() {
        this.ctx.override(this.window, "importScripts", (t, r, e) => {
          if (!e.length) return t.apply(r, e);
          let n = new s({ scripts: e }, t, r);
          return (
            this.emit("importScripts", n),
            n.intercepted
              ? n.returnValue
              : n.target.apply(n.that, n.data.scripts)
          );
        });
      }
    },
    Le = A;
  var Oe = p(c(), 1);
  var C = class extends Oe.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = this.ctx.window),
          (this.URL = this.window.URL || {}),
          (this.createObjectURL = this.URL.createObjectURL),
          (this.revokeObjectURL = this.URL.revokeObjectURL);
      }
      overrideObjectURL() {
        this.ctx.override(this.URL, "createObjectURL", (t, r, e) => {
          if (!e.length) return t.apply(r, e);
          let [n] = e,
            i = new s({ object: n }, t, r);
          return (
            this.emit("createObjectURL", i),
            i.intercepted ? i.returnValue : i.target.call(i.that, i.data.object)
          );
        }),
          this.ctx.override(this.URL, "revokeObjectURL", (t, r, e) => {
            if (!e.length) return t.apply(r, e);
            let [n] = e,
              i = new s({ url: n }, t, r);
            return (
              this.emit("revokeObjectURL", i),
              i.intercepted ? i.returnValue : i.target.call(i.that, i.data.url)
            );
          });
      }
    },
    Me = C;
  var Ne = p(c(), 1);
  var Ee = p(c(), 1);
  var T = class extends Ee.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = t.window),
          (this.localStorage = this.window.localStorage || null),
          (this.sessionStorage = this.window.sessionStorage || null),
          (this.Storage = this.window.Storage || {}),
          (this.storeProto = this.Storage.prototype || {}),
          (this.getItem = this.storeProto.getItem || null),
          (this.setItem = this.storeProto.setItem || null),
          (this.removeItem = this.storeProto.removeItem || null),
          (this.clear = this.storeProto.clear || null),
          (this.key = this.storeProto.key || null),
          (this.methods = ["key", "getItem", "setItem", "removeItem", "clear"]),
          (this.wrappers = new t.nativeMethods.Map());
      }
      overrideMethods() {
        this.ctx.override(this.storeProto, "getItem", (t, r, e) => {
          if (!e.length) return t.apply(this.wrappers.get(r) || r, e);
          let [n] = e,
            i = new s({ name: n }, t, this.wrappers.get(r) || r);
          return (
            this.emit("getItem", i),
            i.intercepted ? i.returnValue : i.target.call(i.that, i.data.name)
          );
        }),
          this.ctx.override(this.storeProto, "setItem", (t, r, e) => {
            if (2 > e.length) return t.apply(this.wrappers.get(r) || r, e);
            let [n, i] = e,
              o = new s({ name: n, value: i }, t, this.wrappers.get(r) || r);
            return (
              this.emit("setItem", o),
              o.intercepted
                ? o.returnValue
                : o.target.call(o.that, o.data.name, o.data.value)
            );
          }),
          this.ctx.override(this.storeProto, "removeItem", (t, r, e) => {
            if (!e.length) return t.apply(this.wrappers.get(r) || r, e);
            let [n] = e,
              i = new s({ name: n }, t, this.wrappers.get(r) || r);
            return (
              this.emit("removeItem", i),
              i.intercepted ? i.returnValue : i.target.call(i.that, i.data.name)
            );
          }),
          this.ctx.override(this.storeProto, "clear", (t, r) => {
            let e = new s(null, t, this.wrappers.get(r) || r);
            return (
              this.emit("clear", e),
              e.intercepted ? e.returnValue : e.target.call(e.that)
            );
          }),
          this.ctx.override(this.storeProto, "key", (t, r, e) => {
            if (!e.length) return t.apply(this.wrappers.get(r) || r, e);
            let [n] = e,
              i = new s({ index: n }, t, this.wrappers.get(r) || r);
            return (
              this.emit("key", i),
              i.intercepted
                ? i.returnValue
                : i.target.call(i.that, i.data.index)
            );
          });
      }
      overrideLength() {
        this.ctx.overrideDescriptor(this.storeProto, "length", {
          get: (t, r) => {
            let e = new s(
              { length: t.call(this.wrappers.get(r) || r) },
              t,
              this.wrappers.get(r) || r
            );
            return (
              this.emit("length", e),
              e.intercepted ? e.returnValue : e.data.length
            );
          },
        });
      }
      emulate(t, r = {}) {
        this.ctx.nativeMethods.setPrototypeOf(r, this.storeProto);
        let e = new this.ctx.window.Proxy(r, {
          get: (n, i) => {
            if (i in this.storeProto || typeof i == "symbol") return t[i];
            let o = new s({ name: i }, null, t);
            return (
              this.emit("get", o),
              o.intercepted ? o.returnValue : t[o.data.name]
            );
          },
          set: (n, i, o) => {
            if (i in this.storeProto || typeof i == "symbol") return (t[i] = o);
            let l = new s({ name: i, value: o }, null, t);
            return (
              this.emit("set", l),
              l.intercepted ? l.returnValue : (t[l.data.name] = l.data.value)
            );
          },
          deleteProperty: (n, i) => {
            if (typeof i == "symbol") return delete t[i];
            let o = new s({ name: i }, null, t);
            return (
              this.emit("delete", o),
              o.intercepted ? o.returnValue : delete t[o.data.name]
            );
          },
        });
        return (
          this.wrappers.set(e, t),
          this.ctx.nativeMethods.setPrototypeOf(e, this.storeProto),
          e
        );
      }
    },
    Se = T;
  var De = p(c(), 1);
  var U = class extends De.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = t.window),
          (this.CSSStyleDeclaration = this.window.CSSStyleDeclaration || {}),
          (this.cssStyleProto = this.CSSStyleDeclaration.prototype || {}),
          (this.getPropertyValue = this.cssStyleProto.getPropertyValue || null),
          (this.setProperty = this.cssStyleProto.setProperty || null),
          this.cssText -
            t.nativeMethods.getOwnPropertyDescriptors(
              this.cssStyleProto,
              "cssText"
            ),
          (this.urlProps = [
            "background",
            "backgroundImage",
            "borderImage",
            "borderImageSource",
            "listStyle",
            "listStyleImage",
            "cursor",
          ]),
          (this.dashedUrlProps = [
            "background",
            "background-image",
            "border-image",
            "border-image-source",
            "list-style",
            "list-style-image",
            "cursor",
          ]),
          (this.propToDashed = {
            background: "background",
            backgroundImage: "background-image",
            borderImage: "border-image",
            borderImageSource: "border-image-source",
            listStyle: "list-style",
            listStyleImage: "list-style-image",
            cursor: "cursor",
          });
      }
      overrideSetGetProperty() {
        this.ctx.override(this.cssStyleProto, "getPropertyValue", (t, r, e) => {
          if (!e.length) return t.apply(r, e);
          let [n] = e,
            i = new s({ property: n }, t, r);
          return (
            this.emit("getPropertyValue", i),
            i.intercepted
              ? i.returnValue
              : i.target.call(i.that, i.data.property)
          );
        }),
          this.ctx.override(this.cssStyleProto, "setProperty", (t, r, e) => {
            if (2 > e.length) return t.apply(r, e);
            let [n, i] = e,
              o = new s({ property: n, value: i }, t, r);
            return (
              this.emit("setProperty", o),
              o.intercepted
                ? o.returnValue
                : o.target.call(o.that, o.data.property, o.data.value)
            );
          });
      }
      overrideCssText() {
        this.ctx.overrideDescriptor(this.cssStyleProto, "cssText", {
          get: (t, r) => {
            let e = new s({ value: t.call(r) }, t, r);
            return (
              this.emit("getCssText", e),
              e.intercepted ? e.returnValue : e.data.value
            );
          },
          set: (t, r, [e]) => {
            let n = new s({ value: e }, t, r);
            return (
              this.emit("setCssText", n),
              n.intercepted
                ? n.returnValue
                : n.target.call(n.that, n.data.value)
            );
          },
        });
      }
    },
    Ve = U;
  var ke = p(c(), 1);
  var j = class extends ke.default {
      constructor(t) {
        super(),
          (this.ctx = t),
          (this.window = this.ctx.window),
          (this.IDBDatabase = this.window.IDBDatabase || {}),
          (this.idbDatabaseProto = this.IDBDatabase.prototype || {}),
          (this.IDBFactory = this.window.IDBFactory || {}),
          (this.idbFactoryProto = this.IDBFactory.prototype || {}),
          (this.open = this.idbFactoryProto.open);
      }
      overrideOpen() {
        this.ctx.override(this.IDBFactory.prototype, "open", (t, r, e) => {
          if (!e.length || !e.length) return t.apply(r, e);
          let [n, i] = e,
            o = new s({ name: n, version: i }, t, r);
          return (
            this.emit("idbFactoryOpen", o),
            o.intercepted
              ? o.returnValue
              : o.target.call(o.that, o.data.name, o.data.version)
          );
        });
      }
      overrideName() {
        this.ctx.overrideDescriptor(this.idbDatabaseProto, "name", {
          get: (t, r) => {
            let e = new s({ value: t.call(r) }, t, r);
            return (
              this.emit("idbFactoryName", e),
              e.intercepted ? e.returnValue : e.data.value
            );
          },
        });
      }
    },
    Re = j;
  var y = class extends Ne.default {
      constructor(t = self, r = !t.window) {
        super(),
          (this.window = t),
          (this.nativeMethods = {
            fnToString: this.window.Function.prototype.toString,
            defineProperty: this.window.Object.defineProperty,
            getOwnPropertyDescriptor:
              this.window.Object.getOwnPropertyDescriptor,
            getOwnPropertyDescriptors:
              this.window.Object.getOwnPropertyDescriptors,
            getOwnPropertyNames: this.window.Object.getOwnPropertyNames,
            keys: this.window.Object.keys,
            getOwnPropertySymbols: this.window.Object.getOwnPropertySymbols,
            isArray: this.window.Array.isArray,
            setPrototypeOf: this.window.Object.setPrototypeOf,
            isExtensible: this.window.Object.isExtensible,
            Map: this.window.Map,
            Proxy: this.window.Proxy,
          }),
          (this.worker = r),
          (this.fetch = new ue(this)),
          (this.xhr = new ce(this)),
          (this.idb = new Re(this)),
          (this.history = new fe(this)),
          (this.element = new ee(this)),
          (this.node = new re(this)),
          (this.document = new Z(this)),
          (this.function = new se(this)),
          (this.object = new le(this)),
          (this.message = new Pe(this)),
          (this.navigator = new xe(this)),
          (this.eventSource = new ve(this)),
          (this.attribute = new ne(this)),
          (this.url = new Me(this)),
          (this.workers = new Le(this)),
          (this.location = new N(this)),
          (this.storage = new Se(this)),
          (this.style = new Ve(this));
      }
      initLocation(t, r) {
        this.location = new N(this, r, t, this.worker);
      }
      override(t, r, e, n) {
        let i = this.wrap(t, r, e, n);
        return (t[r] = i), i;
      }
      overrideDescriptor(t, r, e = {}) {
        let n = this.wrapDescriptor(t, r, e);
        return n ? (this.nativeMethods.defineProperty(t, r, n), n) : {};
      }
      wrap(t, r, e, n) {
        let i = t[r];
        if (!i) return i;
        let o =
          "prototype" in i
            ? function () {
                return e(i, this, [...arguments]);
              }
            : {
                attach() {
                  return e(i, this, [...arguments]);
                },
              }.attach;
        return (
          n && ((o.prototype = i.prototype), (o.prototype.constructor = o)),
          this.emit("wrap", i, o, !!n),
          o
        );
      }
      wrapDescriptor(t, r, e = {}) {
        let n = this.nativeMethods.getOwnPropertyDescriptor(t, r);
        if (!n) return !1;
        for (let i in e)
          i in n &&
            (i === "get" || i === "set"
              ? (n[i] = this.wrap(n, i, e[i]))
              : (n[i] = typeof e[i] == "function" ? e[i](n[i]) : e[i]));
        return n;
      }
    },
    Qt = y;
  typeof self == "object" && (self.UVClient = y);
})();
//# sourceMappingURL=uv.client.js.map
