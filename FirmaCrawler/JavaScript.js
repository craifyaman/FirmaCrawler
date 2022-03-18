if (! function(e, t) {
        "use strict";
        "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
            if (!e.document) throw new Error("jQuery requires a window with a document");
            return t(e)
        } : t(e)
    }("undefined" != typeof window ? window : this, function(e, t) {
        "use strict";

        function n(e, t) {
            t = t || te;
            var n = t.createElement("script");
            n.text = e, t.head.appendChild(n).parentNode.removeChild(n)
        }

        function i(e) {
            var t = !!e && "length" in e && e.length,
                n = he.type(e);
            return "function" !== n && !he.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
        }

        function r(e, t, n) {
            return he.isFunction(t) ? he.grep(e, function(e, i) {
                return !!t.call(e, i, e) !== n
            }) : t.nodeType ? he.grep(e, function(e) {
                return e === t !== n
            }) : "string" != typeof t ? he.grep(e, function(e) {
                return ae.call(t, e) > -1 !== n
            }) : Te.test(t) ? he.filter(t, e, n) : (t = he.filter(t, e), he.grep(e, function(e) {
                return ae.call(t, e) > -1 !== n && 1 === e.nodeType
            }))
        }

        function o(e, t) {
            for (;
                (e = e[t]) && 1 !== e.nodeType;);
            return e
        }

        function a(e) {
            var t = {};
            return he.each(e.match(De) || [], function(e, n) {
                t[n] = !0
            }), t
        }

        function s(e) {
            return e
        }

        function l(e) {
            throw e
        }

        function c(e, t, n) {
            var i;
            try {
                e && he.isFunction(i = e.promise) ? i.call(e).done(t).fail(n) : e && he.isFunction(i = e.then) ? i.call(e, t, n) : t.call(void 0, e)
            } catch (e) {
                n.call(void 0, e)
            }
        }

        function d() {
            te.removeEventListener("DOMContentLoaded", d), e.removeEventListener("load", d), he.ready()
        }

        function u() {
            this.expando = he.expando + u.uid++
        }

        function p(e) {
            return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : Me.test(e) ? JSON.parse(e) : e)
        }

        function f(e, t, n) {
            var i;
            if (void 0 === n && 1 === e.nodeType)
                if (i = "data-" + t.replace(Pe, "-$&").toLowerCase(), n = e.getAttribute(i), "string" == typeof n) {
                    try {
                        n = p(n)
                    } catch (r) {}
                    Re.set(e, t, n)
                } else n = void 0;
            return n
        }

        function h(e, t, n, i) {
            var r, o = 1,
                a = 20,
                s = i ? function() {
                    return i.cur()
                } : function() {
                    return he.css(e, t, "")
                },
                l = s(),
                c = n && n[3] || (he.cssNumber[t] ? "" : "px"),
                d = (he.cssNumber[t] || "px" !== c && +l) && qe.exec(he.css(e, t));
            if (d && d[3] !== c) {
                c = c || d[3], n = n || [], d = +l || 1;
                do o = o || ".5", d /= o, he.style(e, t, d + c); while (o !== (o = s() / l) && 1 !== o && --a)
            }
            return n && (d = +d || +l || 0, r = n[1] ? d + (n[1] + 1) * n[2] : +n[2], i && (i.unit = c, i.start = d, i.end = r)), r
        }

        function m(e) {
            var t, n = e.ownerDocument,
                i = e.nodeName,
                r = He[i];
            return r ? r : (t = n.body.appendChild(n.createElement(i)), r = he.css(t, "display"), t.parentNode.removeChild(t), "none" === r && (r = "block"), He[i] = r, r)
        }

        function g(e, t) {
            for (var n, i, r = [], o = 0, a = e.length; o < a; o++) i = e[o], i.style && (n = i.style.display, t ? ("none" === n && (r[o] = Ne.get(i, "display") || null, r[o] || (i.style.display = "")), "" === i.style.display && Be(i) && (r[o] = m(i))) : "none" !== n && (r[o] = "none", Ne.set(i, "display", n)));
            for (o = 0; o < a; o++) null != r[o] && (e[o].style.display = r[o]);
            return e
        }

        function v(e, t) {
            var n;
            return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && he.nodeName(e, t) ? he.merge([e], n) : n
        }

        function y(e, t) {
            for (var n = 0, i = e.length; n < i; n++) Ne.set(e[n], "globalEval", !t || Ne.get(t[n], "globalEval"))
        }

        function b(e, t, n, i, r) {
            for (var o, a, s, l, c, d, u = t.createDocumentFragment(), p = [], f = 0, h = e.length; f < h; f++)
                if (o = e[f], o || 0 === o)
                    if ("object" === he.type(o)) he.merge(p, o.nodeType ? [o] : o);
                    else if (Xe.test(o)) {
                for (a = a || u.appendChild(t.createElement("div")), s = (Ve.exec(o) || ["", ""])[1].toLowerCase(), l = Ge[s] || Ge._default, a.innerHTML = l[1] + he.htmlPrefilter(o) + l[2], d = l[0]; d--;) a = a.lastChild;
                he.merge(p, a.childNodes), a = u.firstChild, a.textContent = ""
            } else p.push(t.createTextNode(o));
            for (u.textContent = "", f = 0; o = p[f++];)
                if (i && he.inArray(o, i) > -1) r && r.push(o);
                else if (c = he.contains(o.ownerDocument, o), a = v(u.appendChild(o), "script"), c && y(a), n)
                for (d = 0; o = a[d++];) Qe.test(o.type || "") && n.push(o);
            return u
        }

        function $() {
            return !0
        }

        function w() {
            return !1
        }

        function C() {
            try {
                return te.activeElement
            } catch (e) {}
        }

        function x(e, t, n, i, r, o) {
            var a, s;
            if ("object" == typeof t) {
                "string" != typeof n && (i = i || n, n = void 0);
                for (s in t) x(e, s, n, i, t[s], o);
                return e
            }
            if (null == i && null == r ? (r = n, i = n = void 0) : null == r && ("string" == typeof n ? (r = i, i = void 0) : (r = i, i = n, n = void 0)), r === !1) r = w;
            else if (!r) return e;
            return 1 === o && (a = r, r = function(e) {
                return he().off(e), a.apply(this, arguments)
            }, r.guid = a.guid || (a.guid = he.guid++)), e.each(function() {
                he.event.add(this, t, r, i, n)
            })
        }

        function T(e, t) {
            return he.nodeName(e, "table") && he.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e : e
        }

        function _(e) {
            return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
        }

        function k(e) {
            var t = it.exec(e.type);
            return t ? e.type = t[1] : e.removeAttribute("type"), e
        }

        function S(e, t) {
            var n, i, r, o, a, s, l, c;
            if (1 === t.nodeType) {
                if (Ne.hasData(e) && (o = Ne.access(e), a = Ne.set(t, o), c = o.events)) {
                    delete a.handle, a.events = {};
                    for (r in c)
                        for (n = 0, i = c[r].length; n < i; n++) he.event.add(t, r, c[r][n])
                }
                Re.hasData(e) && (s = Re.access(e), l = he.extend({}, s), Re.set(t, l))
            }
        }

        function I(e, t) {
            var n = t.nodeName.toLowerCase();
            "input" === n && ze.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
        }

        function E(e, t, i, r) {
            t = re.apply([], t);
            var o, a, s, l, c, d, u = 0,
                p = e.length,
                f = p - 1,
                h = t[0],
                m = he.isFunction(h);
            if (m || p > 1 && "string" == typeof h && !pe.checkClone && nt.test(h)) return e.each(function(n) {
                var o = e.eq(n);
                m && (t[0] = h.call(this, n, o.html())), E(o, t, i, r)
            });
            if (p && (o = b(t, e[0].ownerDocument, !1, e, r), a = o.firstChild, 1 === o.childNodes.length && (o = a), a || r)) {
                for (s = he.map(v(o, "script"), _), l = s.length; u < p; u++) c = o, u !== f && (c = he.clone(c, !0, !0), l && he.merge(s, v(c, "script"))), i.call(e[u], c, u);
                if (l)
                    for (d = s[s.length - 1].ownerDocument, he.map(s, k), u = 0; u < l; u++) c = s[u], Qe.test(c.type || "") && !Ne.access(c, "globalEval") && he.contains(d, c) && (c.src ? he._evalUrl && he._evalUrl(c.src) : n(c.textContent.replace(rt, ""), d))
            }
            return e
        }

        function D(e, t, n) {
            for (var i, r = t ? he.filter(t, e) : e, o = 0; null != (i = r[o]); o++) n || 1 !== i.nodeType || he.cleanData(v(i)), i.parentNode && (n && he.contains(i.ownerDocument, i) && y(v(i, "script")), i.parentNode.removeChild(i));
            return e
        }

        function A(e, t, n) {
            var i, r, o, a, s = e.style;
            return n = n || st(e), n && (a = n.getPropertyValue(t) || n[t], "" !== a || he.contains(e.ownerDocument, e) || (a = he.style(e, t)), !pe.pixelMarginRight() && at.test(a) && ot.test(t) && (i = s.width, r = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = i, s.minWidth = r, s.maxWidth = o)), void 0 !== a ? a + "" : a
        }

        function F(e, t) {
            return {
                get: function() {
                    return e() ? void delete this.get : (this.get = t).apply(this, arguments)
                }
            }
        }

        function O(e) {
            if (e in pt) return e;
            for (var t = e[0].toUpperCase() + e.slice(1), n = ut.length; n--;)
                if (e = ut[n] + t, e in pt) return e
        }

        function L(e, t, n) {
            var i = qe.exec(t);
            return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : t
        }

        function N(e, t, n, i, r) {
            var o, a = 0;
            for (o = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0; o < 4; o += 2) "margin" === n && (a += he.css(e, n + je[o], !0, r)), i ? ("content" === n && (a -= he.css(e, "padding" + je[o], !0, r)), "margin" !== n && (a -= he.css(e, "border" + je[o] + "Width", !0, r))) : (a += he.css(e, "padding" + je[o], !0, r), "padding" !== n && (a += he.css(e, "border" + je[o] + "Width", !0, r)));
            return a
        }

        function R(e, t, n) {
            var i, r = !0,
                o = st(e),
                a = "border-box" === he.css(e, "boxSizing", !1, o);
            if (e.getClientRects().length && (i = e.getBoundingClientRect()[t]), i <= 0 || null == i) {
                if (i = A(e, t, o), (i < 0 || null == i) && (i = e.style[t]), at.test(i)) return i;
                r = a && (pe.boxSizingReliable() || i === e.style[t]), i = parseFloat(i) || 0
            }
            return i + N(e, t, n || (a ? "border" : "content"), r, o) + "px"
        }

        function M(e, t, n, i, r) {
            return new M.prototype.init(e, t, n, i, r)
        }

        function P() {
            ht && (e.requestAnimationFrame(P), he.fx.tick())
        }

        function U() {
            return e.setTimeout(function() {
                ft = void 0
            }), ft = he.now()
        }

        function q(e, t) {
            var n, i = 0,
                r = {
                    height: e
                };
            for (t = t ? 1 : 0; i < 4; i += 2 - t) n = je[i], r["margin" + n] = r["padding" + n] = e;
            return t && (r.opacity = r.width = e), r
        }

        function j(e, t, n) {
            for (var i, r = (H.tweeners[t] || []).concat(H.tweeners["*"]), o = 0, a = r.length; o < a; o++)
                if (i = r[o].call(n, t, e)) return i
        }

        function B(e, t, n) {
            var i, r, o, a, s, l, c, d, u = "width" in t || "height" in t,
                p = this,
                f = {},
                h = e.style,
                m = e.nodeType && Be(e),
                v = Ne.get(e, "fxshow");
            n.queue || (a = he._queueHooks(e, "fx"), null == a.unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function() {
                a.unqueued || s()
            }), a.unqueued++, p.always(function() {
                p.always(function() {
                    a.unqueued--, he.queue(e, "fx").length || a.empty.fire()
                })
            }));
            for (i in t)
                if (r = t[i], mt.test(r)) {
                    if (delete t[i], o = o || "toggle" === r, r === (m ? "hide" : "show")) {
                        if ("show" !== r || !v || void 0 === v[i]) continue;
                        m = !0
                    }
                    f[i] = v && v[i] || he.style(e, i)
                } if (l = !he.isEmptyObject(t), l || !he.isEmptyObject(f)) {
                u && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], c = v && v.display, null == c && (c = Ne.get(e, "display")), d = he.css(e, "display"), "none" === d && (c ? d = c : (g([e], !0), c = e.style.display || c, d = he.css(e, "display"), g([e]))), ("inline" === d || "inline-block" === d && null != c) && "none" === he.css(e, "float") && (l || (p.done(function() {
                    h.display = c
                }), null == c && (d = h.display, c = "none" === d ? "" : d)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", p.always(function() {
                    h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
                })), l = !1;
                for (i in f) l || (v ? "hidden" in v && (m = v.hidden) : v = Ne.access(e, "fxshow", {
                    display: c
                }), o && (v.hidden = !m), m && g([e], !0), p.done(function() {
                    m || g([e]), Ne.remove(e, "fxshow");
                    for (i in f) he.style(e, i, f[i])
                })), l = j(m ? v[i] : 0, i, p), i in v || (v[i] = l.start, m && (l.end = l.start, l.start = 0))
            }
        }

        function W(e, t) {
            var n, i, r, o, a;
            for (n in e)
                if (i = he.camelCase(n), r = t[i], o = e[n], he.isArray(o) && (r = o[1], o = e[n] = o[0]), n !== i && (e[i] = o, delete e[n]), a = he.cssHooks[i], a && "expand" in a) {
                    o = a.expand(o), delete e[i];
                    for (n in o) n in e || (e[n] = o[n], t[n] = r)
                } else t[i] = r
        }

        function H(e, t, n) {
            var i, r, o = 0,
                a = H.prefilters.length,
                s = he.Deferred().always(function() {
                    delete l.elem
                }),
                l = function() {
                    if (r) return !1;
                    for (var t = ft || U(), n = Math.max(0, c.startTime + c.duration - t), i = n / c.duration || 0, o = 1 - i, a = 0, l = c.tweens.length; a < l; a++) c.tweens[a].run(o);
                    return s.notifyWith(e, [c, o, n]), o < 1 && l ? n : (s.resolveWith(e, [c]), !1)
                },
                c = s.promise({
                    elem: e,
                    props: he.extend({}, t),
                    opts: he.extend(!0, {
                        specialEasing: {},
                        easing: he.easing._default
                    }, n),
                    originalProperties: t,
                    originalOptions: n,
                    startTime: ft || U(),
                    duration: n.duration,
                    tweens: [],
                    createTween: function(t, n) {
                        var i = he.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
                        return c.tweens.push(i), i
                    },
                    stop: function(t) {
                        var n = 0,
                            i = t ? c.tweens.length : 0;
                        if (r) return this;
                        for (r = !0; n < i; n++) c.tweens[n].run(1);
                        return t ? (s.notifyWith(e, [c, 1, 0]), s.resolveWith(e, [c, t])) : s.rejectWith(e, [c, t]), this
                    }
                }),
                d = c.props;
            for (W(d, c.opts.specialEasing); o < a; o++)
                if (i = H.prefilters[o].call(c, e, d, c.opts)) return he.isFunction(i.stop) && (he._queueHooks(c.elem, c.opts.queue).stop = he.proxy(i.stop, i)), i;
            return he.map(d, j, c), he.isFunction(c.opts.start) && c.opts.start.call(e, c), he.fx.timer(he.extend(l, {
                elem: e,
                anim: c,
                queue: c.opts.queue
            })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
        }

        function z(e) {
            var t = e.match(De) || [];
            return t.join(" ")
        }

        function V(e) {
            return e.getAttribute && e.getAttribute("class") || ""
        }

        function Q(e, t, n, i) {
            var r;
            if (he.isArray(t)) he.each(t, function(t, r) {
                n || kt.test(e) ? i(e, r) : Q(e + "[" + ("object" == typeof r && null != r ? t : "") + "]", r, n, i)
            });
            else if (n || "object" !== he.type(t)) i(e, t);
            else
                for (r in t) Q(e + "[" + r + "]", t[r], n, i)
        }

        function G(e) {
            return function(t, n) {
                "string" != typeof t && (n = t, t = "*");
                var i, r = 0,
                    o = t.toLowerCase().match(De) || [];
                if (he.isFunction(n))
                    for (; i = o[r++];) "+" === i[0] ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
            }
        }

        function X(e, t, n, i) {
            function r(s) {
                var l;
                return o[s] = !0, he.each(e[s] || [], function(e, s) {
                    var c = s(t, n, i);
                    return "string" != typeof c || a || o[c] ? a ? !(l = c) : void 0 : (t.dataTypes.unshift(c), r(c), !1)
                }), l
            }
            var o = {},
                a = e === Pt;
            return r(t.dataTypes[0]) || !o["*"] && r("*")
        }

        function Y(e, t) {
            var n, i, r = he.ajaxSettings.flatOptions || {};
            for (n in t) void 0 !== t[n] && ((r[n] ? e : i || (i = {}))[n] = t[n]);
            return i && he.extend(!0, e, i), e
        }

        function K(e, t, n) {
            for (var i, r, o, a, s = e.contents, l = e.dataTypes;
                "*" === l[0];) l.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
            if (i)
                for (r in s)
                    if (s[r] && s[r].test(i)) {
                        l.unshift(r);
                        break
                    } if (l[0] in n) o = l[0];
            else {
                for (r in n) {
                    if (!l[0] || e.converters[r + " " + l[0]]) {
                        o = r;
                        break
                    }
                    a || (a = r)
                }
                o = o || a
            }
            if (o) return o !== l[0] && l.unshift(o), n[o]
        }

        function J(e, t, n, i) {
            var r, o, a, s, l, c = {},
                d = e.dataTypes.slice();
            if (d[1])
                for (a in e.converters) c[a.toLowerCase()] = e.converters[a];
            for (o = d.shift(); o;)
                if (e.responseFields[o] && (n[e.responseFields[o]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = d.shift())
                    if ("*" === o) o = l;
                    else if ("*" !== l && l !== o) {
                if (a = c[l + " " + o] || c["* " + o], !a)
                    for (r in c)
                        if (s = r.split(" "), s[1] === o && (a = c[l + " " + s[0]] || c["* " + s[0]])) {
                            a === !0 ? a = c[r] : c[r] !== !0 && (o = s[0], d.unshift(s[1]));
                            break
                        } if (a !== !0)
                    if (a && e["throws"]) t = a(t);
                    else try {
                        t = a(t)
                    } catch (u) {
                        return {
                            state: "parsererror",
                            error: a ? u : "No conversion from " + l + " to " + o
                        }
                    }
            }
            return {
                state: "success",
                data: t
            }
        }

        function Z(e) {
            return he.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
        }
        var ee = [],
            te = e.document,
            ne = Object.getPrototypeOf,
            ie = ee.slice,
            re = ee.concat,
            oe = ee.push,
            ae = ee.indexOf,
            se = {},
            le = se.toString,
            ce = se.hasOwnProperty,
            de = ce.toString,
            ue = de.call(Object),
            pe = {},
            fe = "3.1.1",
            he = function(e, t) {
                return new he.fn.init(e, t)
            },
            me = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            ge = /^-ms-/,
            ve = /-([a-z])/g,
            ye = function(e, t) {
                return t.toUpperCase()
            };
        he.fn = he.prototype = {
            jquery: fe,
            constructor: he,
            length: 0,
            toArray: function() {
                return ie.call(this)
            },
            get: function(e) {
                return null == e ? ie.call(this) : e < 0 ? this[e + this.length] : this[e]
            },
            pushStack: function(e) {
                var t = he.merge(this.constructor(), e);
                return t.prevObject = this, t
            },
            each: function(e) {
                return he.each(this, e)
            },
            map: function(e) {
                return this.pushStack(he.map(this, function(t, n) {
                    return e.call(t, n, t)
                }))
            },
            slice: function() {
                return this.pushStack(ie.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(e) {
                var t = this.length,
                    n = +e + (e < 0 ? t : 0);
                return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor()
            },
            push: oe,
            sort: ee.sort,
            splice: ee.splice
        }, he.extend = he.fn.extend = function() {
            var e, t, n, i, r, o, a = arguments[0] || {},
                s = 1,
                l = arguments.length,
                c = !1;
            for ("boolean" == typeof a && (c = a, a = arguments[s] || {}, s++), "object" == typeof a || he.isFunction(a) || (a = {}), s === l && (a = this, s--); s < l; s++)
                if (null != (e = arguments[s]))
                    for (t in e) n = a[t], i = e[t], a !== i && (c && i && (he.isPlainObject(i) || (r = he.isArray(i))) ? (r ? (r = !1, o = n && he.isArray(n) ? n : []) : o = n && he.isPlainObject(n) ? n : {}, a[t] = he.extend(c, o, i)) : void 0 !== i && (a[t] = i));
            return a
        }, he.extend({
            expando: "jQuery" + (fe + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(e) {
                throw new Error(e)
            },
            noop: function() {},
            isFunction: function(e) {
                return "function" === he.type(e)
            },
            isArray: Array.isArray,
            isWindow: function(e) {
                return null != e && e === e.window
            },
            isNumeric: function(e) {
                var t = he.type(e);
                return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
            },
            isPlainObject: function(e) {
                var t, n;
                return !(!e || "[object Object]" !== le.call(e) || (t = ne(e)) && (n = ce.call(t, "constructor") && t.constructor, "function" != typeof n || de.call(n) !== ue))
            },
            isEmptyObject: function(e) {
                var t;
                for (t in e) return !1;
                return !0
            },
            type: function(e) {
                return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? se[le.call(e)] || "object" : typeof e
            },
            globalEval: function(e) {
                n(e)
            },
            camelCase: function(e) {
                return e.replace(ge, "ms-").replace(ve, ye)
            },
            nodeName: function(e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
            },
            each: function(e, t) {
                var n, r = 0;
                if (i(e))
                    for (n = e.length; r < n && t.call(e[r], r, e[r]) !== !1; r++);
                else
                    for (r in e)
                        if (t.call(e[r], r, e[r]) === !1) break;
                return e
            },
            trim: function(e) {
                return null == e ? "" : (e + "").replace(me, "")
            },
            makeArray: function(e, t) {
                var n = t || [];
                return null != e && (i(Object(e)) ? he.merge(n, "string" == typeof e ? [e] : e) : oe.call(n, e)), n
            },
            inArray: function(e, t, n) {
                return null == t ? -1 : ae.call(t, e, n)
            },
            merge: function(e, t) {
                for (var n = +t.length, i = 0, r = e.length; i < n; i++) e[r++] = t[i];
                return e.length = r, e
            },
            grep: function(e, t, n) {
                for (var i, r = [], o = 0, a = e.length, s = !n; o < a; o++) i = !t(e[o], o), i !== s && r.push(e[o]);
                return r
            },
            map: function(e, t, n) {
                var r, o, a = 0,
                    s = [];
                if (i(e))
                    for (r = e.length; a < r; a++) o = t(e[a], a, n), null != o && s.push(o);
                else
                    for (a in e) o = t(e[a], a, n), null != o && s.push(o);
                return re.apply([], s)
            },
            guid: 1,
            proxy: function(e, t) {
                var n, i, r;
                if ("string" == typeof t && (n = e[t], t = e, e = n), he.isFunction(e)) return i = ie.call(arguments, 2), r = function() {
                    return e.apply(t || this, i.concat(ie.call(arguments)))
                }, r.guid = e.guid = e.guid || he.guid++, r
            },
            now: Date.now,
            support: pe
        }), "function" == typeof Symbol && (he.fn[Symbol.iterator] = ee[Symbol.iterator]), he.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
            se["[object " + t + "]"] = t.toLowerCase()
        });
        var be = function(e) {
            function t(e, t, n, i) {
                var r, o, a, s, l, c, d, p = t && t.ownerDocument,
                    h = t ? t.nodeType : 9;
                if (n = n || [], "string" != typeof e || !e || 1 !== h && 9 !== h && 11 !== h) return n;
                if (!i && ((t ? t.ownerDocument || t : j) !== O && F(t), t = t || O, N)) {
                    if (11 !== h && (l = ve.exec(e)))
                        if (r = l[1]) {
                            if (9 === h) {
                                if (!(a = t.getElementById(r))) return n;
                                if (a.id === r) return n.push(a), n
                            } else if (p && (a = p.getElementById(r)) && U(t, a) && a.id === r) return n.push(a), n
                        } else {
                            if (l[2]) return J.apply(n, t.getElementsByTagName(e)), n;
                            if ((r = l[3]) && C.getElementsByClassName && t.getElementsByClassName) return J.apply(n, t.getElementsByClassName(r)), n
                        } if (C.qsa && !V[e + " "] && (!R || !R.test(e))) {
                        if (1 !== h) p = t, d = e;
                        else if ("object" !== t.nodeName.toLowerCase()) {
                            for ((s = t.getAttribute("id")) ? s = s.replace(we, Ce) : t.setAttribute("id", s = q), c = k(e), o = c.length; o--;) c[o] = "#" + s + " " + f(c[o]);
                            d = c.join(","), p = ye.test(e) && u(t.parentNode) || t
                        }
                        if (d) try {
                            return J.apply(n, p.querySelectorAll(d)), n
                        } catch (m) {} finally {
                            s === q && t.removeAttribute("id")
                        }
                    }
                }
                return I(e.replace(se, "$1"), t, n, i)
            }

            function n() {
                function e(n, i) {
                    return t.push(n + " ") > x.cacheLength && delete e[t.shift()], e[n + " "] = i
                }
                var t = [];
                return e
            }

            function i(e) {
                return e[q] = !0, e
            }

            function r(e) {
                var t = O.createElement("fieldset");
                try {
                    return !!e(t)
                } catch (n) {
                    return !1
                } finally {
                    t.parentNode && t.parentNode.removeChild(t), t = null
                }
            }

            function o(e, t) {
                for (var n = e.split("|"), i = n.length; i--;) x.attrHandle[n[i]] = t
            }

            function a(e, t) {
                var n = t && e,
                    i = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
                if (i) return i;
                if (n)
                    for (; n = n.nextSibling;)
                        if (n === t) return -1;
                return e ? 1 : -1
            }

            function s(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return "input" === n && t.type === e
                }
            }

            function l(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return ("input" === n || "button" === n) && t.type === e
                }
            }

            function c(e) {
                return function(t) {
                    return "form" in t ? t.parentNode && t.disabled === !1 ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && Te(t) === e : t.disabled === e : "label" in t && t.disabled === e
                }
            }

            function d(e) {
                return i(function(t) {
                    return t = +t, i(function(n, i) {
                        for (var r, o = e([], n.length, t), a = o.length; a--;) n[r = o[a]] && (n[r] = !(i[r] = n[r]))
                    })
                })
            }

            function u(e) {
                return e && "undefined" != typeof e.getElementsByTagName && e
            }

            function p() {}

            function f(e) {
                for (var t = 0, n = e.length, i = ""; t < n; t++) i += e[t].value;
                return i
            }

            function h(e, t, n) {
                var i = t.dir,
                    r = t.next,
                    o = r || i,
                    a = n && "parentNode" === o,
                    s = W++;
                return t.first ? function(t, n, r) {
                    for (; t = t[i];)
                        if (1 === t.nodeType || a) return e(t, n, r);
                    return !1
                } : function(t, n, l) {
                    var c, d, u, p = [B, s];
                    if (l) {
                        for (; t = t[i];)
                            if ((1 === t.nodeType || a) && e(t, n, l)) return !0
                    } else
                        for (; t = t[i];)
                            if (1 === t.nodeType || a)
                                if (u = t[q] || (t[q] = {}), d = u[t.uniqueID] || (u[t.uniqueID] = {}), r && r === t.nodeName.toLowerCase()) t = t[i] || t;
                                else {
                                    if ((c = d[o]) && c[0] === B && c[1] === s) return p[2] = c[2];
                                    if (d[o] = p, p[2] = e(t, n, l)) return !0
                                } return !1
                }
            }

            function m(e) {
                return e.length > 1 ? function(t, n, i) {
                    for (var r = e.length; r--;)
                        if (!e[r](t, n, i)) return !1;
                    return !0
                } : e[0]
            }

            function g(e, n, i) {
                for (var r = 0, o = n.length; r < o; r++) t(e, n[r], i);
                return i
            }

            function v(e, t, n, i, r) {
                for (var o, a = [], s = 0, l = e.length, c = null != t; s < l; s++)(o = e[s]) && (n && !n(o, i, r) || (a.push(o), c && t.push(s)));
                return a
            }

            function y(e, t, n, r, o, a) {
                return r && !r[q] && (r = y(r)), o && !o[q] && (o = y(o, a)), i(function(i, a, s, l) {
                    var c, d, u, p = [],
                        f = [],
                        h = a.length,
                        m = i || g(t || "*", s.nodeType ? [s] : s, []),
                        y = !e || !i && t ? m : v(m, p, e, s, l),
                        b = n ? o || (i ? e : h || r) ? [] : a : y;
                    if (n && n(y, b, s, l), r)
                        for (c = v(b, f), r(c, [], s, l), d = c.length; d--;)(u = c[d]) && (b[f[d]] = !(y[f[d]] = u));
                    if (i) {
                        if (o || e) {
                            if (o) {
                                for (c = [], d = b.length; d--;)(u = b[d]) && c.push(y[d] = u);
                                o(null, b = [], c, l)
                            }
                            for (d = b.length; d--;)(u = b[d]) && (c = o ? ee(i, u) : p[d]) > -1 && (i[c] = !(a[c] = u))
                        }
                    } else b = v(b === a ? b.splice(h, b.length) : b), o ? o(null, a, b, l) : J.apply(a, b)
                })
            }

            function b(e) {
                for (var t, n, i, r = e.length, o = x.relative[e[0].type], a = o || x.relative[" "], s = o ? 1 : 0, l = h(function(e) {
                        return e === t
                    }, a, !0), c = h(function(e) {
                        return ee(t, e) > -1
                    }, a, !0), d = [function(e, n, i) {
                        var r = !o && (i || n !== E) || ((t = n).nodeType ? l(e, n, i) : c(e, n, i));
                        return t = null, r
                    }]; s < r; s++)
                    if (n = x.relative[e[s].type]) d = [h(m(d), n)];
                    else {
                        if (n = x.filter[e[s].type].apply(null, e[s].matches), n[q]) {
                            for (i = ++s; i < r && !x.relative[e[i].type]; i++);
                            return y(s > 1 && m(d), s > 1 && f(e.slice(0, s - 1).concat({
                                value: " " === e[s - 2].type ? "*" : ""
                            })).replace(se, "$1"), n, s < i && b(e.slice(s, i)), i < r && b(e = e.slice(i)), i < r && f(e))
                        }
                        d.push(n)
                    } return m(d)
            }

            function $(e, n) {
                var r = n.length > 0,
                    o = e.length > 0,
                    a = function(i, a, s, l, c) {
                        var d, u, p, f = 0,
                            h = "0",
                            m = i && [],
                            g = [],
                            y = E,
                            b = i || o && x.find.TAG("*", c),
                            $ = B += null == y ? 1 : Math.random() || .1,
                            w = b.length;
                        for (c && (E = a === O || a || c); h !== w && null != (d = b[h]); h++) {
                            if (o && d) {
                                for (u = 0, a || d.ownerDocument === O || (F(d), s = !N); p = e[u++];)
                                    if (p(d, a || O, s)) {
                                        l.push(d);
                                        break
                                    } c && (B = $)
                            }
                            r && ((d = !p && d) && f--, i && m.push(d))
                        }
                        if (f += h, r && h !== f) {
                            for (u = 0; p = n[u++];) p(m, g, a, s);
                            if (i) {
                                if (f > 0)
                                    for (; h--;) m[h] || g[h] || (g[h] = Y.call(l));
                                g = v(g)
                            }
                            J.apply(l, g), c && !i && g.length > 0 && f + n.length > 1 && t.uniqueSort(l)
                        }
                        return c && (B = $, E = y), m
                    };
                return r ? i(a) : a
            }
            var w, C, x, T, _, k, S, I, E, D, A, F, O, L, N, R, M, P, U, q = "sizzle" + 1 * new Date,
                j = e.document,
                B = 0,
                W = 0,
                H = n(),
                z = n(),
                V = n(),
                Q = function(e, t) {
                    return e === t && (A = !0), 0
                },
                G = {}.hasOwnProperty,
                X = [],
                Y = X.pop,
                K = X.push,
                J = X.push,
                Z = X.slice,
                ee = function(e, t) {
                    for (var n = 0, i = e.length; n < i; n++)
                        if (e[n] === t) return n;
                    return -1
                },
                te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                ne = "[\\x20\\t\\r\\n\\f]",
                ie = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
                re = "\\[" + ne + "*(" + ie + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ie + "))|)" + ne + "*\\]",
                oe = ":(" + ie + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + re + ")*)|.*)\\)|)",
                ae = new RegExp(ne + "+", "g"),
                se = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
                le = new RegExp("^" + ne + "*," + ne + "*"),
                ce = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
                de = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
                ue = new RegExp(oe),
                pe = new RegExp("^" + ie + "$"),
                fe = {
                    ID: new RegExp("^#(" + ie + ")"),
                    CLASS: new RegExp("^\\.(" + ie + ")"),
                    TAG: new RegExp("^(" + ie + "|[*])"),
                    ATTR: new RegExp("^" + re),
                    PSEUDO: new RegExp("^" + oe),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + te + ")$", "i"),
                    needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
                },
                he = /^(?:input|select|textarea|button)$/i,
                me = /^h\d$/i,
                ge = /^[^{]+\{\s*\[native \w/,
                ve = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                ye = /[+~]/,
                be = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
                $e = function(e, t, n) {
                    var i = "0x" + t - 65536;
                    return i !== i || n ? t : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
                },
                we = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                Ce = function(e, t) {
                    return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
                },
                xe = function() {
                    F()
                },
                Te = h(function(e) {
                    return e.disabled === !0 && ("form" in e || "label" in e)
                }, {
                    dir: "parentNode",
                    next: "legend"
                });
            try {
                J.apply(X = Z.call(j.childNodes), j.childNodes), X[j.childNodes.length].nodeType
            } catch (_e) {
                J = {
                    apply: X.length ? function(e, t) {
                        K.apply(e, Z.call(t))
                    } : function(e, t) {
                        for (var n = e.length, i = 0; e[n++] = t[i++];);
                        e.length = n - 1
                    }
                }
            }
            C = t.support = {}, _ = t.isXML = function(e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return !!t && "HTML" !== t.nodeName
            }, F = t.setDocument = function(e) {
                var t, n, i = e ? e.ownerDocument || e : j;
                return i !== O && 9 === i.nodeType && i.documentElement ? (O = i, L = O.documentElement, N = !_(O), j !== O && (n = O.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", xe, !1) : n.attachEvent && n.attachEvent("onunload", xe)), C.attributes = r(function(e) {
                    return e.className = "i", !e.getAttribute("className")
                }), C.getElementsByTagName = r(function(e) {
                    return e.appendChild(O.createComment("")), !e.getElementsByTagName("*").length
                }), C.getElementsByClassName = ge.test(O.getElementsByClassName), C.getById = r(function(e) {
                    return L.appendChild(e).id = q, !O.getElementsByName || !O.getElementsByName(q).length
                }), C.getById ? (x.filter.ID = function(e) {
                    var t = e.replace(be, $e);
                    return function(e) {
                        return e.getAttribute("id") === t
                    }
                }, x.find.ID = function(e, t) {
                    if ("undefined" != typeof t.getElementById && N) {
                        var n = t.getElementById(e);
                        return n ? [n] : []
                    }
                }) : (x.filter.ID = function(e) {
                    var t = e.replace(be, $e);
                    return function(e) {
                        var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                        return n && n.value === t
                    }
                }, x.find.ID = function(e, t) {
                    if ("undefined" != typeof t.getElementById && N) {
                        var n, i, r, o = t.getElementById(e);
                        if (o) {
                            if (n = o.getAttributeNode("id"), n && n.value === e) return [o];
                            for (r = t.getElementsByName(e), i = 0; o = r[i++];)
                                if (n = o.getAttributeNode("id"), n && n.value === e) return [o]
                        }
                        return []
                    }
                }), x.find.TAG = C.getElementsByTagName ? function(e, t) {
                    return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : C.qsa ? t.querySelectorAll(e) : void 0
                } : function(e, t) {
                    var n, i = [],
                        r = 0,
                        o = t.getElementsByTagName(e);
                    if ("*" === e) {
                        for (; n = o[r++];) 1 === n.nodeType && i.push(n);
                        return i
                    }
                    return o
                }, x.find.CLASS = C.getElementsByClassName && function(e, t) {
                    if ("undefined" != typeof t.getElementsByClassName && N) return t.getElementsByClassName(e)
                }, M = [], R = [], (C.qsa = ge.test(O.querySelectorAll)) && (r(function(e) {
                    L.appendChild(e).innerHTML = "<a id='" + q + "'></a><select id='" + q + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && R.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || R.push("\\[" + ne + "*(?:value|" + te + ")"), e.querySelectorAll("[id~=" + q + "-]").length || R.push("~="), e.querySelectorAll(":checked").length || R.push(":checked"), e.querySelectorAll("a#" + q + "+*").length || R.push(".#.+[+~]")
                }), r(function(e) {
                    e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                    var t = O.createElement("input");
                    t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && R.push("name" + ne + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && R.push(":enabled", ":disabled"), L.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && R.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), R.push(",.*:")
                })), (C.matchesSelector = ge.test(P = L.matches || L.webkitMatchesSelector || L.mozMatchesSelector || L.oMatchesSelector || L.msMatchesSelector)) && r(function(e) {
                    C.disconnectedMatch = P.call(e, "*"), P.call(e, "[s!='']:x"), M.push("!=", oe)
                }), R = R.length && new RegExp(R.join("|")), M = M.length && new RegExp(M.join("|")), t = ge.test(L.compareDocumentPosition), U = t || ge.test(L.contains) ? function(e, t) {
                    var n = 9 === e.nodeType ? e.documentElement : e,
                        i = t && t.parentNode;
                    return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
                } : function(e, t) {
                    if (t)
                        for (; t = t.parentNode;)
                            if (t === e) return !0;
                    return !1
                }, Q = t ? function(e, t) {
                    if (e === t) return A = !0, 0;
                    var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                    return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !C.sortDetached && t.compareDocumentPosition(e) === n ? e === O || e.ownerDocument === j && U(j, e) ? -1 : t === O || t.ownerDocument === j && U(j, t) ? 1 : D ? ee(D, e) - ee(D, t) : 0 : 4 & n ? -1 : 1)
                } : function(e, t) {
                    if (e === t) return A = !0, 0;
                    var n, i = 0,
                        r = e.parentNode,
                        o = t.parentNode,
                        s = [e],
                        l = [t];
                    if (!r || !o) return e === O ? -1 : t === O ? 1 : r ? -1 : o ? 1 : D ? ee(D, e) - ee(D, t) : 0;
                    if (r === o) return a(e, t);
                    for (n = e; n = n.parentNode;) s.unshift(n);
                    for (n = t; n = n.parentNode;) l.unshift(n);
                    for (; s[i] === l[i];) i++;
                    return i ? a(s[i], l[i]) : s[i] === j ? -1 : l[i] === j ? 1 : 0
                }, O) : O
            }, t.matches = function(e, n) {
                return t(e, null, null, n)
            }, t.matchesSelector = function(e, n) {
                if ((e.ownerDocument || e) !== O && F(e), n = n.replace(de, "='$1']"), C.matchesSelector && N && !V[n + " "] && (!M || !M.test(n)) && (!R || !R.test(n))) try {
                    var i = P.call(e, n);
                    if (i || C.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
                } catch (r) {}
                return t(n, O, null, [e]).length > 0
            }, t.contains = function(e, t) {
                return (e.ownerDocument || e) !== O && F(e), U(e, t)
            }, t.attr = function(e, t) {
                (e.ownerDocument || e) !== O && F(e);
                var n = x.attrHandle[t.toLowerCase()],
                    i = n && G.call(x.attrHandle, t.toLowerCase()) ? n(e, t, !N) : void 0;
                return void 0 !== i ? i : C.attributes || !N ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
            }, t.escape = function(e) {
                return (e + "").replace(we, Ce)
            }, t.error = function(e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }, t.uniqueSort = function(e) {
                var t, n = [],
                    i = 0,
                    r = 0;
                if (A = !C.detectDuplicates, D = !C.sortStable && e.slice(0), e.sort(Q), A) {
                    for (; t = e[r++];) t === e[r] && (i = n.push(r));
                    for (; i--;) e.splice(n[i], 1)
                }
                return D = null, e
            }, T = t.getText = function(e) {
                var t, n = "",
                    i = 0,
                    r = e.nodeType;
                if (r) {
                    if (1 === r || 9 === r || 11 === r) {
                        if ("string" == typeof e.textContent) return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling) n += T(e)
                    } else if (3 === r || 4 === r) return e.nodeValue
                } else
                    for (; t = e[i++];) n += T(t);
                return n
            }, x = t.selectors = {
                cacheLength: 50,
                createPseudo: i,
                match: fe,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(e) {
                        return e[1] = e[1].replace(be, $e), e[3] = (e[3] || e[4] || e[5] || "").replace(be, $e), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                    },
                    CHILD: function(e) {
                        return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                    },
                    PSEUDO: function(e) {
                        var t, n = !e[6] && e[2];
                        return fe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && ue.test(n) && (t = k(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(e) {
                        var t = e.replace(be, $e).toLowerCase();
                        return "*" === e ? function() {
                            return !0
                        } : function(e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t
                        }
                    },
                    CLASS: function(e) {
                        var t = H[e + " "];
                        return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && H(e, function(e) {
                            return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(e, n, i) {
                        return function(r) {
                            var o = t.attr(r, e);
                            return null == o ? "!=" === n : !n || (o += "", "=" === n ? o === i : "!=" === n ? o !== i : "^=" === n ? i && 0 === o.indexOf(i) : "*=" === n ? i && o.indexOf(i) > -1 : "$=" === n ? i && o.slice(-i.length) === i : "~=" === n ? (" " + o.replace(ae, " ") + " ").indexOf(i) > -1 : "|=" === n && (o === i || o.slice(0, i.length + 1) === i + "-"))
                        }
                    },
                    CHILD: function(e, t, n, i, r) {
                        var o = "nth" !== e.slice(0, 3),
                            a = "last" !== e.slice(-4),
                            s = "of-type" === t;
                        return 1 === i && 0 === r ? function(e) {
                            return !!e.parentNode
                        } : function(t, n, l) {
                            var c, d, u, p, f, h, m = o !== a ? "nextSibling" : "previousSibling",
                                g = t.parentNode,
                                v = s && t.nodeName.toLowerCase(),
                                y = !l && !s,
                                b = !1;
                            if (g) {
                                if (o) {
                                    for (; m;) {
                                        for (p = t; p = p[m];)
                                            if (s ? p.nodeName.toLowerCase() === v : 1 === p.nodeType) return !1;
                                        h = m = "only" === e && !h && "nextSibling"
                                    }
                                    return !0
                                }
                                if (h = [a ? g.firstChild : g.lastChild], a && y) {
                                    for (p = g, u = p[q] || (p[q] = {}), d = u[p.uniqueID] || (u[p.uniqueID] = {}), c = d[e] || [], f = c[0] === B && c[1], b = f && c[2], p = f && g.childNodes[f]; p = ++f && p && p[m] || (b = f = 0) || h.pop();)
                                        if (1 === p.nodeType && ++b && p === t) {
                                            d[e] = [B, f, b];
                                            break
                                        }
                                } else if (y && (p = t, u = p[q] || (p[q] = {}), d = u[p.uniqueID] || (u[p.uniqueID] = {}), c = d[e] || [], f = c[0] === B && c[1], b = f), b === !1)
                                    for (;
                                        (p = ++f && p && p[m] || (b = f = 0) || h.pop()) && ((s ? p.nodeName.toLowerCase() !== v : 1 !== p.nodeType) || !++b || (y && (u = p[q] || (p[q] = {}), d = u[p.uniqueID] || (u[p.uniqueID] = {}), d[e] = [B, b]), p !== t)););
                                return b -= r, b === i || b % i === 0 && b / i >= 0
                            }
                        }
                    },
                    PSEUDO: function(e, n) {
                        var r, o = x.pseudos[e] || x.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                        return o[q] ? o(n) : o.length > 1 ? (r = [e, e, "", n], x.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function(e, t) {
                            for (var i, r = o(e, n), a = r.length; a--;) i = ee(e, r[a]), e[i] = !(t[i] = r[a])
                        }) : function(e) {
                            return o(e, 0, r)
                        }) : o
                    }
                },
                pseudos: {
                    not: i(function(e) {
                        var t = [],
                            n = [],
                            r = S(e.replace(se, "$1"));
                        return r[q] ? i(function(e, t, n, i) {
                            for (var o, a = r(e, null, i, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
                        }) : function(e, i, o) {
                            return t[0] = e, r(t, null, o, n), t[0] = null, !n.pop()
                        }
                    }),
                    has: i(function(e) {
                        return function(n) {
                            return t(e, n).length > 0
                        }
                    }),
                    contains: i(function(e) {
                        return e = e.replace(be, $e),
                            function(t) {
                                return (t.textContent || t.innerText || T(t)).indexOf(e) > -1
                            }
                    }),
                    lang: i(function(e) {
                        return pe.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(be, $e).toLowerCase(),
                            function(t) {
                                var n;
                                do
                                    if (n = N ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                                return !1;
                            }
                    }),
                    target: function(t) {
                        var n = e.location && e.location.hash;
                        return n && n.slice(1) === t.id
                    },
                    root: function(e) {
                        return e === L
                    },
                    focus: function(e) {
                        return e === O.activeElement && (!O.hasFocus || O.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                    },
                    enabled: c(!1),
                    disabled: c(!0),
                    checked: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                    },
                    selected: function(e) {
                        return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                    },
                    empty: function(e) {
                        for (e = e.firstChild; e; e = e.nextSibling)
                            if (e.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(e) {
                        return !x.pseudos.empty(e)
                    },
                    header: function(e) {
                        return me.test(e.nodeName)
                    },
                    input: function(e) {
                        return he.test(e.nodeName)
                    },
                    button: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type || "button" === t
                    },
                    text: function(e) {
                        var t;
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                    },
                    first: d(function() {
                        return [0]
                    }),
                    last: d(function(e, t) {
                        return [t - 1]
                    }),
                    eq: d(function(e, t, n) {
                        return [n < 0 ? n + t : n]
                    }),
                    even: d(function(e, t) {
                        for (var n = 0; n < t; n += 2) e.push(n);
                        return e
                    }),
                    odd: d(function(e, t) {
                        for (var n = 1; n < t; n += 2) e.push(n);
                        return e
                    }),
                    lt: d(function(e, t, n) {
                        for (var i = n < 0 ? n + t : n; --i >= 0;) e.push(i);
                        return e
                    }),
                    gt: d(function(e, t, n) {
                        for (var i = n < 0 ? n + t : n; ++i < t;) e.push(i);
                        return e
                    })
                }
            }, x.pseudos.nth = x.pseudos.eq;
            for (w in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) x.pseudos[w] = s(w);
            for (w in {
                    submit: !0,
                    reset: !0
                }) x.pseudos[w] = l(w);
            return p.prototype = x.filters = x.pseudos, x.setFilters = new p, k = t.tokenize = function(e, n) {
                var i, r, o, a, s, l, c, d = z[e + " "];
                if (d) return n ? 0 : d.slice(0);
                for (s = e, l = [], c = x.preFilter; s;) {
                    i && !(r = le.exec(s)) || (r && (s = s.slice(r[0].length) || s), l.push(o = [])), i = !1, (r = ce.exec(s)) && (i = r.shift(), o.push({
                        value: i,
                        type: r[0].replace(se, " ")
                    }), s = s.slice(i.length));
                    for (a in x.filter) !(r = fe[a].exec(s)) || c[a] && !(r = c[a](r)) || (i = r.shift(), o.push({
                        value: i,
                        type: a,
                        matches: r
                    }), s = s.slice(i.length));
                    if (!i) break
                }
                return n ? s.length : s ? t.error(e) : z(e, l).slice(0)
            }, S = t.compile = function(e, t) {
                var n, i = [],
                    r = [],
                    o = V[e + " "];
                if (!o) {
                    for (t || (t = k(e)), n = t.length; n--;) o = b(t[n]), o[q] ? i.push(o) : r.push(o);
                    o = V(e, $(r, i)), o.selector = e
                }
                return o
            }, I = t.select = function(e, t, n, i) {
                var r, o, a, s, l, c = "function" == typeof e && e,
                    d = !i && k(e = c.selector || e);
                if (n = n || [], 1 === d.length) {
                    if (o = d[0] = d[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && 9 === t.nodeType && N && x.relative[o[1].type]) {
                        if (t = (x.find.ID(a.matches[0].replace(be, $e), t) || [])[0], !t) return n;
                        c && (t = t.parentNode), e = e.slice(o.shift().value.length)
                    }
                    for (r = fe.needsContext.test(e) ? 0 : o.length; r-- && (a = o[r], !x.relative[s = a.type]);)
                        if ((l = x.find[s]) && (i = l(a.matches[0].replace(be, $e), ye.test(o[0].type) && u(t.parentNode) || t))) {
                            if (o.splice(r, 1), e = i.length && f(o), !e) return J.apply(n, i), n;
                            break
                        }
                }
                return (c || S(e, d))(i, t, !N, n, !t || ye.test(e) && u(t.parentNode) || t), n
            }, C.sortStable = q.split("").sort(Q).join("") === q, C.detectDuplicates = !!A, F(), C.sortDetached = r(function(e) {
                return 1 & e.compareDocumentPosition(O.createElement("fieldset"))
            }), r(function(e) {
                return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
            }) || o("type|href|height|width", function(e, t, n) {
                if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
            }), C.attributes && r(function(e) {
                return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
            }) || o("value", function(e, t, n) {
                if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
            }), r(function(e) {
                return null == e.getAttribute("disabled")
            }) || o(te, function(e, t, n) {
                var i;
                if (!n) return e[t] === !0 ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
            }), t
        }(e);
        he.find = be, he.expr = be.selectors, he.expr[":"] = he.expr.pseudos, he.uniqueSort = he.unique = be.uniqueSort, he.text = be.getText, he.isXMLDoc = be.isXML, he.contains = be.contains, he.escapeSelector = be.escape;
        var $e = function(e, t, n) {
                for (var i = [], r = void 0 !== n;
                    (e = e[t]) && 9 !== e.nodeType;)
                    if (1 === e.nodeType) {
                        if (r && he(e).is(n)) break;
                        i.push(e)
                    } return i
            },
            we = function(e, t) {
                for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                return n
            },
            Ce = he.expr.match.needsContext,
            xe = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
            Te = /^.[^:#\[\.,]*$/;
        he.filter = function(e, t, n) {
            var i = t[0];
            return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? he.find.matchesSelector(i, e) ? [i] : [] : he.find.matches(e, he.grep(t, function(e) {
                return 1 === e.nodeType
            }))
        }, he.fn.extend({
            find: function(e) {
                var t, n, i = this.length,
                    r = this;
                if ("string" != typeof e) return this.pushStack(he(e).filter(function() {
                    for (t = 0; t < i; t++)
                        if (he.contains(r[t], this)) return !0
                }));
                for (n = this.pushStack([]), t = 0; t < i; t++) he.find(e, r[t], n);
                return i > 1 ? he.uniqueSort(n) : n
            },
            filter: function(e) {
                return this.pushStack(r(this, e || [], !1))
            },
            not: function(e) {
                return this.pushStack(r(this, e || [], !0))
            },
            is: function(e) {
                return !!r(this, "string" == typeof e && Ce.test(e) ? he(e) : e || [], !1).length
            }
        });
        var _e, ke = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
            Se = he.fn.init = function(e, t, n) {
                var i, r;
                if (!e) return this;
                if (n = n || _e, "string" == typeof e) {
                    if (i = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : ke.exec(e), !i || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                    if (i[1]) {
                        if (t = t instanceof he ? t[0] : t, he.merge(this, he.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : te, !0)), xe.test(i[1]) && he.isPlainObject(t))
                            for (i in t) he.isFunction(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                        return this
                    }
                    return r = te.getElementById(i[2]), r && (this[0] = r, this.length = 1), this
                }
                return e.nodeType ? (this[0] = e, this.length = 1, this) : he.isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(he) : he.makeArray(e, this)
            };
        Se.prototype = he.fn, _e = he(te);
        var Ie = /^(?:parents|prev(?:Until|All))/,
            Ee = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        he.fn.extend({
            has: function(e) {
                var t = he(e, this),
                    n = t.length;
                return this.filter(function() {
                    for (var e = 0; e < n; e++)
                        if (he.contains(this, t[e])) return !0
                })
            },
            closest: function(e, t) {
                var n, i = 0,
                    r = this.length,
                    o = [],
                    a = "string" != typeof e && he(e);
                if (!Ce.test(e))
                    for (; i < r; i++)
                        for (n = this[i]; n && n !== t; n = n.parentNode)
                            if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && he.find.matchesSelector(n, e))) {
                                o.push(n);
                                break
                            } return this.pushStack(o.length > 1 ? he.uniqueSort(o) : o)
            },
            index: function(e) {
                return e ? "string" == typeof e ? ae.call(he(e), this[0]) : ae.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(e, t) {
                return this.pushStack(he.uniqueSort(he.merge(this.get(), he(e, t))))
            },
            addBack: function(e) {
                return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
            }
        }), he.each({
            parent: function(e) {
                var t = e.parentNode;
                return t && 11 !== t.nodeType ? t : null
            },
            parents: function(e) {
                return $e(e, "parentNode")
            },
            parentsUntil: function(e, t, n) {
                return $e(e, "parentNode", n)
            },
            next: function(e) {
                return o(e, "nextSibling")
            },
            prev: function(e) {
                return o(e, "previousSibling")
            },
            nextAll: function(e) {
                return $e(e, "nextSibling")
            },
            prevAll: function(e) {
                return $e(e, "previousSibling")
            },
            nextUntil: function(e, t, n) {
                return $e(e, "nextSibling", n)
            },
            prevUntil: function(e, t, n) {
                return $e(e, "previousSibling", n)
            },
            siblings: function(e) {
                return we((e.parentNode || {}).firstChild, e)
            },
            children: function(e) {
                return we(e.firstChild)
            },
            contents: function(e) {
                return e.contentDocument || he.merge([], e.childNodes)
            }
        }, function(e, t) {
            he.fn[e] = function(n, i) {
                var r = he.map(this, t, n);
                return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (r = he.filter(i, r)), this.length > 1 && (Ee[e] || he.uniqueSort(r), Ie.test(e) && r.reverse()), this.pushStack(r)
            }
        });
        var De = /[^\x20\t\r\n\f]+/g;
        he.Callbacks = function(e) {
            e = "string" == typeof e ? a(e) : he.extend({}, e);
            var t, n, i, r, o = [],
                s = [],
                l = -1,
                c = function() {
                    for (r = e.once, i = t = !0; s.length; l = -1)
                        for (n = s.shift(); ++l < o.length;) o[l].apply(n[0], n[1]) === !1 && e.stopOnFalse && (l = o.length, n = !1);
                    e.memory || (n = !1), t = !1, r && (o = n ? [] : "")
                },
                d = {
                    add: function() {
                        return o && (n && !t && (l = o.length - 1, s.push(n)), function i(t) {
                            he.each(t, function(t, n) {
                                he.isFunction(n) ? e.unique && d.has(n) || o.push(n) : n && n.length && "string" !== he.type(n) && i(n)
                            })
                        }(arguments), n && !t && c()), this
                    },
                    remove: function() {
                        return he.each(arguments, function(e, t) {
                            for (var n;
                                (n = he.inArray(t, o, n)) > -1;) o.splice(n, 1), n <= l && l--
                        }), this
                    },
                    has: function(e) {
                        return e ? he.inArray(e, o) > -1 : o.length > 0
                    },
                    empty: function() {
                        return o && (o = []), this
                    },
                    disable: function() {
                        return r = s = [], o = n = "", this
                    },
                    disabled: function() {
                        return !o
                    },
                    lock: function() {
                        return r = s = [], n || t || (o = n = ""), this
                    },
                    locked: function() {
                        return !!r
                    },
                    fireWith: function(e, n) {
                        return r || (n = n || [], n = [e, n.slice ? n.slice() : n], s.push(n), t || c()), this
                    },
                    fire: function() {
                        return d.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!i
                    }
                };
            return d
        }, he.extend({
            Deferred: function(t) {
                var n = [
                        ["notify", "progress", he.Callbacks("memory"), he.Callbacks("memory"), 2],
                        ["resolve", "done", he.Callbacks("once memory"), he.Callbacks("once memory"), 0, "resolved"],
                        ["reject", "fail", he.Callbacks("once memory"), he.Callbacks("once memory"), 1, "rejected"]
                    ],
                    i = "pending",
                    r = {
                        state: function() {
                            return i
                        },
                        always: function() {
                            return o.done(arguments).fail(arguments), this
                        },
                        "catch": function(e) {
                            return r.then(null, e)
                        },
                        pipe: function() {
                            var e = arguments;
                            return he.Deferred(function(t) {
                                he.each(n, function(n, i) {
                                    var r = he.isFunction(e[i[4]]) && e[i[4]];
                                    o[i[1]](function() {
                                        var e = r && r.apply(this, arguments);
                                        e && he.isFunction(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[i[0] + "With"](this, r ? [e] : arguments)
                                    })
                                }), e = null
                            }).promise()
                        },
                        then: function(t, i, r) {
                            function o(t, n, i, r) {
                                return function() {
                                    var c = this,
                                        d = arguments,
                                        u = function() {
                                            var e, u;
                                            if (!(t < a)) {
                                                if (e = i.apply(c, d), e === n.promise()) throw new TypeError("Thenable self-resolution");
                                                u = e && ("object" == typeof e || "function" == typeof e) && e.then, he.isFunction(u) ? r ? u.call(e, o(a, n, s, r), o(a, n, l, r)) : (a++, u.call(e, o(a, n, s, r), o(a, n, l, r), o(a, n, s, n.notifyWith))) : (i !== s && (c = void 0, d = [e]), (r || n.resolveWith)(c, d))
                                            }
                                        },
                                        p = r ? u : function() {
                                            try {
                                                u()
                                            } catch (e) {
                                                he.Deferred.exceptionHook && he.Deferred.exceptionHook(e, p.stackTrace), t + 1 >= a && (i !== l && (c = void 0, d = [e]), n.rejectWith(c, d))
                                            }
                                        };
                                    t ? p() : (he.Deferred.getStackHook && (p.stackTrace = he.Deferred.getStackHook()), e.setTimeout(p))
                                }
                            }
                            var a = 0;
                            return he.Deferred(function(e) {
                                n[0][3].add(o(0, e, he.isFunction(r) ? r : s, e.notifyWith)), n[1][3].add(o(0, e, he.isFunction(t) ? t : s)), n[2][3].add(o(0, e, he.isFunction(i) ? i : l))
                            }).promise()
                        },
                        promise: function(e) {
                            return null != e ? he.extend(e, r) : r
                        }
                    },
                    o = {};
                return he.each(n, function(e, t) {
                    var a = t[2],
                        s = t[5];
                    r[t[1]] = a.add, s && a.add(function() {
                        i = s
                    }, n[3 - e][2].disable, n[0][2].lock), a.add(t[3].fire), o[t[0]] = function() {
                        return o[t[0] + "With"](this === o ? void 0 : this, arguments), this
                    }, o[t[0] + "With"] = a.fireWith
                }), r.promise(o), t && t.call(o, o), o
            },
            when: function(e) {
                var t = arguments.length,
                    n = t,
                    i = Array(n),
                    r = ie.call(arguments),
                    o = he.Deferred(),
                    a = function(e) {
                        return function(n) {
                            i[e] = this, r[e] = arguments.length > 1 ? ie.call(arguments) : n, --t || o.resolveWith(i, r)
                        }
                    };
                if (t <= 1 && (c(e, o.done(a(n)).resolve, o.reject), "pending" === o.state() || he.isFunction(r[n] && r[n].then))) return o.then();
                for (; n--;) c(r[n], a(n), o.reject);
                return o.promise()
            }
        });
        var Ae = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        he.Deferred.exceptionHook = function(t, n) {
            e.console && e.console.warn && t && Ae.test(t.name) && e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, n)
        }, he.readyException = function(t) {
            e.setTimeout(function() {
                throw t
            })
        };
        var Fe = he.Deferred();
        he.fn.ready = function(e) {
            return Fe.then(e)["catch"](function(e) {
                he.readyException(e)
            }), this
        }, he.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function(e) {
                e ? he.readyWait++ : he.ready(!0)
            },
            ready: function(e) {
                (e === !0 ? --he.readyWait : he.isReady) || (he.isReady = !0, e !== !0 && --he.readyWait > 0 || Fe.resolveWith(te, [he]))
            }
        }), he.ready.then = Fe.then, "complete" === te.readyState || "loading" !== te.readyState && !te.documentElement.doScroll ? e.setTimeout(he.ready) : (te.addEventListener("DOMContentLoaded", d), e.addEventListener("load", d));
        var Oe = function(e, t, n, i, r, o, a) {
                var s = 0,
                    l = e.length,
                    c = null == n;
                if ("object" === he.type(n)) {
                    r = !0;
                    for (s in n) Oe(e, t, s, n[s], !0, o, a)
                } else if (void 0 !== i && (r = !0, he.isFunction(i) || (a = !0), c && (a ? (t.call(e, i), t = null) : (c = t, t = function(e, t, n) {
                        return c.call(he(e), n)
                    })), t))
                    for (; s < l; s++) t(e[s], n, a ? i : i.call(e[s], s, t(e[s], n)));
                return r ? e : c ? t.call(e) : l ? t(e[0], n) : o
            },
            Le = function(e) {
                return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
            };
        u.uid = 1, u.prototype = {
            cache: function(e) {
                var t = e[this.expando];
                return t || (t = {}, Le(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                    value: t,
                    configurable: !0
                }))), t
            },
            set: function(e, t, n) {
                var i, r = this.cache(e);
                if ("string" == typeof t) r[he.camelCase(t)] = n;
                else
                    for (i in t) r[he.camelCase(i)] = t[i];
                return r
            },
            get: function(e, t) {
                return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][he.camelCase(t)]
            },
            access: function(e, t, n) {
                return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
            },
            remove: function(e, t) {
                var n, i = e[this.expando];
                if (void 0 !== i) {
                    if (void 0 !== t) {
                        he.isArray(t) ? t = t.map(he.camelCase) : (t = he.camelCase(t), t = t in i ? [t] : t.match(De) || []), n = t.length;
                        for (; n--;) delete i[t[n]]
                    }(void 0 === t || he.isEmptyObject(i)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
                }
            },
            hasData: function(e) {
                var t = e[this.expando];
                return void 0 !== t && !he.isEmptyObject(t)
            }
        };
        var Ne = new u,
            Re = new u,
            Me = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            Pe = /[A-Z]/g;
        he.extend({
            hasData: function(e) {
                return Re.hasData(e) || Ne.hasData(e)
            },
            data: function(e, t, n) {
                return Re.access(e, t, n)
            },
            removeData: function(e, t) {
                Re.remove(e, t)
            },
            _data: function(e, t, n) {
                return Ne.access(e, t, n)
            },
            _removeData: function(e, t) {
                Ne.remove(e, t)
            }
        }), he.fn.extend({
            data: function(e, t) {
                var n, i, r, o = this[0],
                    a = o && o.attributes;
                if (void 0 === e) {
                    if (this.length && (r = Re.get(o), 1 === o.nodeType && !Ne.get(o, "hasDataAttrs"))) {
                        for (n = a.length; n--;) a[n] && (i = a[n].name, 0 === i.indexOf("data-") && (i = he.camelCase(i.slice(5)), f(o, i, r[i])));
                        Ne.set(o, "hasDataAttrs", !0)
                    }
                    return r
                }
                return "object" == typeof e ? this.each(function() {
                    Re.set(this, e)
                }) : Oe(this, function(t) {
                    var n;
                    if (o && void 0 === t) {
                        if (n = Re.get(o, e), void 0 !== n) return n;
                        if (n = f(o, e), void 0 !== n) return n
                    } else this.each(function() {
                        Re.set(this, e, t)
                    })
                }, null, t, arguments.length > 1, null, !0)
            },
            removeData: function(e) {
                return this.each(function() {
                    Re.remove(this, e)
                })
            }
        }), he.extend({
            queue: function(e, t, n) {
                var i;
                if (e) return t = (t || "fx") + "queue", i = Ne.get(e, t), n && (!i || he.isArray(n) ? i = Ne.access(e, t, he.makeArray(n)) : i.push(n)), i || []
            },
            dequeue: function(e, t) {
                t = t || "fx";
                var n = he.queue(e, t),
                    i = n.length,
                    r = n.shift(),
                    o = he._queueHooks(e, t),
                    a = function() {
                        he.dequeue(e, t)
                    };
                "inprogress" === r && (r = n.shift(), i--), r && ("fx" === t && n.unshift("inprogress"), delete o.stop, r.call(e, a, o)), !i && o && o.empty.fire()
            },
            _queueHooks: function(e, t) {
                var n = t + "queueHooks";
                return Ne.get(e, n) || Ne.access(e, n, {
                    empty: he.Callbacks("once memory").add(function() {
                        Ne.remove(e, [t + "queue", n])
                    })
                })
            }
        }), he.fn.extend({
            queue: function(e, t) {
                var n = 2;
                return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? he.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                    var n = he.queue(this, e, t);
                    he._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && he.dequeue(this, e)
                })
            },
            dequeue: function(e) {
                return this.each(function() {
                    he.dequeue(this, e)
                })
            },
            clearQueue: function(e) {
                return this.queue(e || "fx", [])
            },
            promise: function(e, t) {
                var n, i = 1,
                    r = he.Deferred(),
                    o = this,
                    a = this.length,
                    s = function() {
                        --i || r.resolveWith(o, [o])
                    };
                for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;) n = Ne.get(o[a], e + "queueHooks"), n && n.empty && (i++, n.empty.add(s));
                return s(), r.promise(t)
            }
        });
        var Ue = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            qe = new RegExp("^(?:([+-])=|)(" + Ue + ")([a-z%]*)$", "i"),
            je = ["Top", "Right", "Bottom", "Left"],
            Be = function(e, t) {
                return e = t || e, "none" === e.style.display || "" === e.style.display && he.contains(e.ownerDocument, e) && "none" === he.css(e, "display")
            },
            We = function(e, t, n, i) {
                var r, o, a = {};
                for (o in t) a[o] = e.style[o], e.style[o] = t[o];
                r = n.apply(e, i || []);
                for (o in t) e.style[o] = a[o];
                return r
            },
            He = {};
        he.fn.extend({
            show: function() {
                return g(this, !0)
            },
            hide: function() {
                return g(this)
            },
            toggle: function(e) {
                return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                    Be(this) ? he(this).show() : he(this).hide()
                })
            }
        });
        var ze = /^(?:checkbox|radio)$/i,
            Ve = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
            Qe = /^$|\/(?:java|ecma)script/i,
            Ge = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
        Ge.optgroup = Ge.option, Ge.tbody = Ge.tfoot = Ge.colgroup = Ge.caption = Ge.thead, Ge.th = Ge.td;
        var Xe = /<|&#?\w+;/;
        ! function() {
            var e = te.createDocumentFragment(),
                t = e.appendChild(te.createElement("div")),
                n = te.createElement("input");
            n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), pe.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", pe.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
        }();
        var Ye = te.documentElement,
            Ke = /^key/,
            Je = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            Ze = /^([^.]*)(?:\.(.+)|)/;
        he.event = {
            global: {},
            add: function(e, t, n, i, r) {
                var o, a, s, l, c, d, u, p, f, h, m, g = Ne.get(e);
                if (g)
                    for (n.handler && (o = n, n = o.handler, r = o.selector), r && he.find.matchesSelector(Ye, r), n.guid || (n.guid = he.guid++), (l = g.events) || (l = g.events = {}), (a = g.handle) || (a = g.handle = function(t) {
                            return "undefined" != typeof he && he.event.triggered !== t.type ? he.event.dispatch.apply(e, arguments) : void 0
                        }), t = (t || "").match(De) || [""], c = t.length; c--;) s = Ze.exec(t[c]) || [], f = m = s[1], h = (s[2] || "").split(".").sort(), f && (u = he.event.special[f] || {}, f = (r ? u.delegateType : u.bindType) || f, u = he.event.special[f] || {}, d = he.extend({
                        type: f,
                        origType: m,
                        data: i,
                        handler: n,
                        guid: n.guid,
                        selector: r,
                        needsContext: r && he.expr.match.needsContext.test(r),
                        namespace: h.join(".")
                    }, o), (p = l[f]) || (p = l[f] = [], p.delegateCount = 0, u.setup && u.setup.call(e, i, h, a) !== !1 || e.addEventListener && e.addEventListener(f, a)), u.add && (u.add.call(e, d), d.handler.guid || (d.handler.guid = n.guid)), r ? p.splice(p.delegateCount++, 0, d) : p.push(d), he.event.global[f] = !0)
            },
            remove: function(e, t, n, i, r) {
                var o, a, s, l, c, d, u, p, f, h, m, g = Ne.hasData(e) && Ne.get(e);
                if (g && (l = g.events)) {
                    for (t = (t || "").match(De) || [""], c = t.length; c--;)
                        if (s = Ze.exec(t[c]) || [], f = m = s[1], h = (s[2] || "").split(".").sort(), f) {
                            for (u = he.event.special[f] || {}, f = (i ? u.delegateType : u.bindType) || f, p = l[f] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = p.length; o--;) d = p[o], !r && m !== d.origType || n && n.guid !== d.guid || s && !s.test(d.namespace) || i && i !== d.selector && ("**" !== i || !d.selector) || (p.splice(o, 1), d.selector && p.delegateCount--, u.remove && u.remove.call(e, d));
                            a && !p.length && (u.teardown && u.teardown.call(e, h, g.handle) !== !1 || he.removeEvent(e, f, g.handle), delete l[f])
                        } else
                            for (f in l) he.event.remove(e, f + t[c], n, i, !0);
                    he.isEmptyObject(l) && Ne.remove(e, "handle events")
                }
            },
            dispatch: function(e) {
                var t, n, i, r, o, a, s = he.event.fix(e),
                    l = new Array(arguments.length),
                    c = (Ne.get(this, "events") || {})[s.type] || [],
                    d = he.event.special[s.type] || {};
                for (l[0] = s, t = 1; t < arguments.length; t++) l[t] = arguments[t];
                if (s.delegateTarget = this, !d.preDispatch || d.preDispatch.call(this, s) !== !1) {
                    for (a = he.event.handlers.call(this, s, c), t = 0;
                        (r = a[t++]) && !s.isPropagationStopped();)
                        for (s.currentTarget = r.elem, n = 0;
                            (o = r.handlers[n++]) && !s.isImmediatePropagationStopped();) s.rnamespace && !s.rnamespace.test(o.namespace) || (s.handleObj = o, s.data = o.data, i = ((he.event.special[o.origType] || {}).handle || o.handler).apply(r.elem, l), void 0 !== i && (s.result = i) === !1 && (s.preventDefault(), s.stopPropagation()));
                    return d.postDispatch && d.postDispatch.call(this, s), s.result
                }
            },
            handlers: function(e, t) {
                var n, i, r, o, a, s = [],
                    l = t.delegateCount,
                    c = e.target;
                if (l && c.nodeType && !("click" === e.type && e.button >= 1))
                    for (; c !== this; c = c.parentNode || this)
                        if (1 === c.nodeType && ("click" !== e.type || c.disabled !== !0)) {
                            for (o = [], a = {}, n = 0; n < l; n++) i = t[n], r = i.selector + " ", void 0 === a[r] && (a[r] = i.needsContext ? he(r, this).index(c) > -1 : he.find(r, this, null, [c]).length), a[r] && o.push(i);
                            o.length && s.push({
                                elem: c,
                                handlers: o
                            })
                        } return c = this, l < t.length && s.push({
                    elem: c,
                    handlers: t.slice(l)
                }), s
            },
            addProp: function(e, t) {
                Object.defineProperty(he.Event.prototype, e, {
                    enumerable: !0,
                    configurable: !0,
                    get: he.isFunction(t) ? function() {
                        if (this.originalEvent) return t(this.originalEvent)
                    } : function() {
                        if (this.originalEvent) return this.originalEvent[e]
                    },
                    set: function(t) {
                        Object.defineProperty(this, e, {
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                            value: t
                        })
                    }
                })
            },
            fix: function(e) {
                return e[he.expando] ? e : new he.Event(e)
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function() {
                        if (this !== C() && this.focus) return this.focus(), !1
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        if (this === C() && this.blur) return this.blur(), !1
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        if ("checkbox" === this.type && this.click && he.nodeName(this, "input")) return this.click(), !1
                    },
                    _default: function(e) {
                        return he.nodeName(e.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(e) {
                        void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                    }
                }
            }
        }, he.removeEvent = function(e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n)
        }, he.Event = function(e, t) {
            return this instanceof he.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? $ : w, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && he.extend(this, t), this.timeStamp = e && e.timeStamp || he.now(), void(this[he.expando] = !0)) : new he.Event(e, t)
        }, he.Event.prototype = {
            constructor: he.Event,
            isDefaultPrevented: w,
            isPropagationStopped: w,
            isImmediatePropagationStopped: w,
            isSimulated: !1,
            preventDefault: function() {
                var e = this.originalEvent;
                this.isDefaultPrevented = $, e && !this.isSimulated && e.preventDefault()
            },
            stopPropagation: function() {
                var e = this.originalEvent;
                this.isPropagationStopped = $, e && !this.isSimulated && e.stopPropagation()
            },
            stopImmediatePropagation: function() {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = $, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
            }
        }, he.each({
            altKey: !0,
            bubbles: !0,
            cancelable: !0,
            changedTouches: !0,
            ctrlKey: !0,
            detail: !0,
            eventPhase: !0,
            metaKey: !0,
            pageX: !0,
            pageY: !0,
            shiftKey: !0,
            view: !0,
            "char": !0,
            charCode: !0,
            key: !0,
            keyCode: !0,
            button: !0,
            buttons: !0,
            clientX: !0,
            clientY: !0,
            offsetX: !0,
            offsetY: !0,
            pointerId: !0,
            pointerType: !0,
            screenX: !0,
            screenY: !0,
            targetTouches: !0,
            toElement: !0,
            touches: !0,
            which: function(e) {
                var t = e.button;
                return null == e.which && Ke.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && Je.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
            }
        }, he.event.addProp), he.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(e, t) {
            he.event.special[e] = {
                delegateType: t,
                bindType: t,
                handle: function(e) {
                    var n, i = this,
                        r = e.relatedTarget,
                        o = e.handleObj;
                    return r && (r === i || he.contains(i, r)) || (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
                }
            }
        }), he.fn.extend({
            on: function(e, t, n, i) {
                return x(this, e, t, n, i)
            },
            one: function(e, t, n, i) {
                return x(this, e, t, n, i, 1)
            },
            off: function(e, t, n) {
                var i, r;
                if (e && e.preventDefault && e.handleObj) return i = e.handleObj, he(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
                if ("object" == typeof e) {
                    for (r in e) this.off(r, t, e[r]);
                    return this
                }
                return t !== !1 && "function" != typeof t || (n = t, t = void 0), n === !1 && (n = w), this.each(function() {
                    he.event.remove(this, e, n, t)
                })
            }
        });
        var et = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
            tt = /<script|<style|<link/i,
            nt = /checked\s*(?:[^=]|=\s*.checked.)/i,
            it = /^true\/(.*)/,
            rt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        he.extend({
            htmlPrefilter: function(e) {
                return e.replace(et, "<$1></$2>")
            },
            clone: function(e, t, n) {
                var i, r, o, a, s = e.cloneNode(!0),
                    l = he.contains(e.ownerDocument, e);
                if (!(pe.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || he.isXMLDoc(e)))
                    for (a = v(s), o = v(e), i = 0, r = o.length; i < r; i++) I(o[i], a[i]);
                if (t)
                    if (n)
                        for (o = o || v(e), a = a || v(s), i = 0, r = o.length; i < r; i++) S(o[i], a[i]);
                    else S(e, s);
                return a = v(s, "script"), a.length > 0 && y(a, !l && v(e, "script")), s
            },
            cleanData: function(e) {
                for (var t, n, i, r = he.event.special, o = 0; void 0 !== (n = e[o]); o++)
                    if (Le(n)) {
                        if (t = n[Ne.expando]) {
                            if (t.events)
                                for (i in t.events) r[i] ? he.event.remove(n, i) : he.removeEvent(n, i, t.handle);
                            n[Ne.expando] = void 0
                        }
                        n[Re.expando] && (n[Re.expando] = void 0)
                    }
            }
        }), he.fn.extend({
            detach: function(e) {
                return D(this, e, !0)
            },
            remove: function(e) {
                return D(this, e)
            },
            text: function(e) {
                return Oe(this, function(e) {
                    return void 0 === e ? he.text(this) : this.empty().each(function() {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                    })
                }, null, e, arguments.length)
            },
            append: function() {
                return E(this, arguments, function(e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = T(this, e);
                        t.appendChild(e)
                    }
                })
            },
            prepend: function() {
                return E(this, arguments, function(e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = T(this, e);
                        t.insertBefore(e, t.firstChild)
                    }
                })
            },
            before: function() {
                return E(this, arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this)
                })
            },
            after: function() {
                return E(this, arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                })
            },
            empty: function() {
                for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (he.cleanData(v(e, !1)), e.textContent = "");
                return this
            },
            clone: function(e, t) {
                return e = null != e && e, t = null == t ? e : t, this.map(function() {
                    return he.clone(this, e, t)
                })
            },
            html: function(e) {
                return Oe(this, function(e) {
                    var t = this[0] || {},
                        n = 0,
                        i = this.length;
                    if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                    if ("string" == typeof e && !tt.test(e) && !Ge[(Ve.exec(e) || ["", ""])[1].toLowerCase()]) {
                        e = he.htmlPrefilter(e);
                        try {
                            for (; n < i; n++) t = this[n] || {}, 1 === t.nodeType && (he.cleanData(v(t, !1)), t.innerHTML = e);
                            t = 0
                        } catch (r) {}
                    }
                    t && this.empty().append(e)
                }, null, e, arguments.length)
            },
            replaceWith: function() {
                var e = [];
                return E(this, arguments, function(t) {
                    var n = this.parentNode;
                    he.inArray(this, e) < 0 && (he.cleanData(v(this)), n && n.replaceChild(t, this))
                }, e)
            }
        }), he.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(e, t) {
            he.fn[e] = function(e) {
                for (var n, i = [], r = he(e), o = r.length - 1, a = 0; a <= o; a++) n = a === o ? this : this.clone(!0), he(r[a])[t](n), oe.apply(i, n.get());
                return this.pushStack(i)
            }
        });
        var ot = /^margin/,
            at = new RegExp("^(" + Ue + ")(?!px)[a-z%]+$", "i"),
            st = function(t) {
                var n = t.ownerDocument.defaultView;
                return n && n.opener || (n = e), n.getComputedStyle(t)
            };
        ! function() {
            function t() {
                if (s) {
                    s.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", s.innerHTML = "", Ye.appendChild(a);
                    var t = e.getComputedStyle(s);
                    n = "1%" !== t.top, o = "2px" === t.marginLeft, i = "4px" === t.width, s.style.marginRight = "50%", r = "4px" === t.marginRight, Ye.removeChild(a), s = null
                }
            }
            var n, i, r, o, a = te.createElement("div"),
                s = te.createElement("div");
            s.style && (s.style.backgroundClip = "content-box", s.cloneNode(!0).style.backgroundClip = "", pe.clearCloneStyle = "content-box" === s.style.backgroundClip, a.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", a.appendChild(s), he.extend(pe, {
                pixelPosition: function() {
                    return t(), n
                },
                boxSizingReliable: function() {
                    return t(), i
                },
                pixelMarginRight: function() {
                    return t(), r
                },
                reliableMarginLeft: function() {
                    return t(), o
                }
            }))
        }();
        var lt = /^(none|table(?!-c[ea]).+)/,
            ct = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            dt = {
                letterSpacing: "0",
                fontWeight: "400"
            },
            ut = ["Webkit", "Moz", "ms"],
            pt = te.createElement("div").style;
        he.extend({
            cssHooks: {
                opacity: {
                    get: function(e, t) {
                        if (t) {
                            var n = A(e, "opacity");
                            return "" === n ? "1" : n
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                "float": "cssFloat"
            },
            style: function(e, t, n, i) {
                if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                    var r, o, a, s = he.camelCase(t),
                        l = e.style;
                    return t = he.cssProps[s] || (he.cssProps[s] = O(s) || s), a = he.cssHooks[t] || he.cssHooks[s], void 0 === n ? a && "get" in a && void 0 !== (r = a.get(e, !1, i)) ? r : l[t] : (o = typeof n, "string" === o && (r = qe.exec(n)) && r[1] && (n = h(e, t, r), o = "number"), void(null != n && n === n && ("number" === o && (n += r && r[3] || (he.cssNumber[s] ? "" : "px")), pe.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, i)) || (l[t] = n))))
                }
            },
            css: function(e, t, n, i) {
                var r, o, a, s = he.camelCase(t);
                return t = he.cssProps[s] || (he.cssProps[s] = O(s) || s), a = he.cssHooks[t] || he.cssHooks[s], a && "get" in a && (r = a.get(e, !0, n)), void 0 === r && (r = A(e, t, i)), "normal" === r && t in dt && (r = dt[t]), "" === n || n ? (o = parseFloat(r), n === !0 || isFinite(o) ? o || 0 : r) : r
            }
        }), he.each(["height", "width"], function(e, t) {
            he.cssHooks[t] = {
                get: function(e, n, i) {
                    if (n) return !lt.test(he.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? R(e, t, i) : We(e, ct, function() {
                        return R(e, t, i)
                    })
                },
                set: function(e, n, i) {
                    var r, o = i && st(e),
                        a = i && N(e, t, i, "border-box" === he.css(e, "boxSizing", !1, o), o);
                    return a && (r = qe.exec(n)) && "px" !== (r[3] || "px") && (e.style[t] = n, n = he.css(e, t)), L(e, n, a)
                }
            }
        }), he.cssHooks.marginLeft = F(pe.reliableMarginLeft, function(e, t) {
            if (t) return (parseFloat(A(e, "marginLeft")) || e.getBoundingClientRect().left - We(e, {
                marginLeft: 0
            }, function() {
                return e.getBoundingClientRect().left
            })) + "px"
        }), he.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(e, t) {
            he.cssHooks[e + t] = {
                expand: function(n) {
                    for (var i = 0, r = {}, o = "string" == typeof n ? n.split(" ") : [n]; i < 4; i++) r[e + je[i] + t] = o[i] || o[i - 2] || o[0];
                    return r
                }
            }, ot.test(e) || (he.cssHooks[e + t].set = L)
        }), he.fn.extend({
            css: function(e, t) {
                return Oe(this, function(e, t, n) {
                    var i, r, o = {},
                        a = 0;
                    if (he.isArray(t)) {
                        for (i = st(e), r = t.length; a < r; a++) o[t[a]] = he.css(e, t[a], !1, i);
                        return o
                    }
                    return void 0 !== n ? he.style(e, t, n) : he.css(e, t)
                }, e, t, arguments.length > 1)
            }
        }), he.Tween = M, M.prototype = {
            constructor: M,
            init: function(e, t, n, i, r, o) {
                this.elem = e, this.prop = n, this.easing = r || he.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = o || (he.cssNumber[n] ? "" : "px")
            },
            cur: function() {
                var e = M.propHooks[this.prop];
                return e && e.get ? e.get(this) : M.propHooks._default.get(this)
            },
            run: function(e) {
                var t, n = M.propHooks[this.prop];
                return this.options.duration ? this.pos = t = he.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : M.propHooks._default.set(this), this
            }
        }, M.prototype.init.prototype = M.prototype, M.propHooks = {
            _default: {
                get: function(e) {
                    var t;
                    return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = he.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0)
                },
                set: function(e) {
                    he.fx.step[e.prop] ? he.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[he.cssProps[e.prop]] && !he.cssHooks[e.prop] ? e.elem[e.prop] = e.now : he.style(e.elem, e.prop, e.now + e.unit)
                }
            }
        }, M.propHooks.scrollTop = M.propHooks.scrollLeft = {
            set: function(e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
            }
        }, he.easing = {
            linear: function(e) {
                return e
            },
            swing: function(e) {
                return .5 - Math.cos(e * Math.PI) / 2
            },
            _default: "swing"
        }, he.fx = M.prototype.init, he.fx.step = {};
        var ft, ht, mt = /^(?:toggle|show|hide)$/,
            gt = /queueHooks$/;
        he.Animation = he.extend(H, {
                tweeners: {
                    "*": [function(e, t) {
                        var n = this.createTween(e, t);
                        return h(n.elem, e, qe.exec(t), n), n
                    }]
                },
                tweener: function(e, t) {
                    he.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(De);
                    for (var n, i = 0, r = e.length; i < r; i++) n = e[i], H.tweeners[n] = H.tweeners[n] || [], H.tweeners[n].unshift(t)
                },
                prefilters: [B],
                prefilter: function(e, t) {
                    t ? H.prefilters.unshift(e) : H.prefilters.push(e)
                }
            }), he.speed = function(e, t, n) {
                var i = e && "object" == typeof e ? he.extend({}, e) : {
                    complete: n || !n && t || he.isFunction(e) && e,
                    duration: e,
                    easing: n && t || t && !he.isFunction(t) && t
                };
                return he.fx.off || te.hidden ? i.duration = 0 : "number" != typeof i.duration && (i.duration in he.fx.speeds ? i.duration = he.fx.speeds[i.duration] : i.duration = he.fx.speeds._default), null != i.queue && i.queue !== !0 || (i.queue = "fx"), i.old = i.complete, i.complete = function() {
                    he.isFunction(i.old) && i.old.call(this), i.queue && he.dequeue(this, i.queue)
                }, i
            }, he.fn.extend({
                fadeTo: function(e, t, n, i) {
                    return this.filter(Be).css("opacity", 0).show().end().animate({
                        opacity: t
                    }, e, n, i)
                },
                animate: function(e, t, n, i) {
                    var r = he.isEmptyObject(e),
                        o = he.speed(t, n, i),
                        a = function() {
                            var t = H(this, he.extend({}, e), o);
                            (r || Ne.get(this, "finish")) && t.stop(!0)
                        };
                    return a.finish = a, r || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
                },
                stop: function(e, t, n) {
                    var i = function(e) {
                        var t = e.stop;
                        delete e.stop, t(n)
                    };
                    return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                        var t = !0,
                            r = null != e && e + "queueHooks",
                            o = he.timers,
                            a = Ne.get(this);
                        if (r) a[r] && a[r].stop && i(a[r]);
                        else
                            for (r in a) a[r] && a[r].stop && gt.test(r) && i(a[r]);
                        for (r = o.length; r--;) o[r].elem !== this || null != e && o[r].queue !== e || (o[r].anim.stop(n), t = !1, o.splice(r, 1));
                        !t && n || he.dequeue(this, e)
                    })
                },
                finish: function(e) {
                    return e !== !1 && (e = e || "fx"), this.each(function() {
                        var t, n = Ne.get(this),
                            i = n[e + "queue"],
                            r = n[e + "queueHooks"],
                            o = he.timers,
                            a = i ? i.length : 0;
                        for (n.finish = !0, he.queue(this, e, []), r && r.stop && r.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                        for (t = 0; t < a; t++) i[t] && i[t].finish && i[t].finish.call(this);
                        delete n.finish
                    })
                }
            }), he.each(["toggle", "show", "hide"], function(e, t) {
                var n = he.fn[t];
                he.fn[t] = function(e, i, r) {
                    return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(q(t, !0), e, i, r)
                }
            }), he.each({
                slideDown: q("show"),
                slideUp: q("hide"),
                slideToggle: q("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function(e, t) {
                he.fn[e] = function(e, n, i) {
                    return this.animate(t, e, n, i)
                }
            }), he.timers = [], he.fx.tick = function() {
                var e, t = 0,
                    n = he.timers;
                for (ft = he.now(); t < n.length; t++) e = n[t], e() || n[t] !== e || n.splice(t--, 1);
                n.length || he.fx.stop(), ft = void 0
            }, he.fx.timer = function(e) {
                he.timers.push(e), e() ? he.fx.start() : he.timers.pop()
            }, he.fx.interval = 13, he.fx.start = function() {
                ht || (ht = e.requestAnimationFrame ? e.requestAnimationFrame(P) : e.setInterval(he.fx.tick, he.fx.interval))
            }, he.fx.stop = function() {
                e.cancelAnimationFrame ? e.cancelAnimationFrame(ht) : e.clearInterval(ht), ht = null
            }, he.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            }, he.fn.delay = function(t, n) {
                return t = he.fx ? he.fx.speeds[t] || t : t, n = n || "fx", this.queue(n, function(n, i) {
                    var r = e.setTimeout(n, t);
                    i.stop = function() {
                        e.clearTimeout(r)
                    }
                })
            },
            function() {
                var e = te.createElement("input"),
                    t = te.createElement("select"),
                    n = t.appendChild(te.createElement("option"));
                e.type = "checkbox", pe.checkOn = "" !== e.value, pe.optSelected = n.selected, e = te.createElement("input"), e.value = "t", e.type = "radio", pe.radioValue = "t" === e.value
            }();
        var vt, yt = he.expr.attrHandle;
        he.fn.extend({
            attr: function(e, t) {
                return Oe(this, he.attr, e, t, arguments.length > 1)
            },
            removeAttr: function(e) {
                return this.each(function() {
                    he.removeAttr(this, e)
                })
            }
        }), he.extend({
            attr: function(e, t, n) {
                var i, r, o = e.nodeType;
                if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof e.getAttribute ? he.prop(e, t, n) : (1 === o && he.isXMLDoc(e) || (r = he.attrHooks[t.toLowerCase()] || (he.expr.match.bool.test(t) ? vt : void 0)), void 0 !== n ? null === n ? void he.removeAttr(e, t) : r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : r && "get" in r && null !== (i = r.get(e, t)) ? i : (i = he.find.attr(e, t), null == i ? void 0 : i))
            },
            attrHooks: {
                type: {
                    set: function(e, t) {
                        if (!pe.radioValue && "radio" === t && he.nodeName(e, "input")) {
                            var n = e.value;
                            return e.setAttribute("type", t), n && (e.value = n), t
                        }
                    }
                }
            },
            removeAttr: function(e, t) {
                var n, i = 0,
                    r = t && t.match(De);
                if (r && 1 === e.nodeType)
                    for (; n = r[i++];) e.removeAttribute(n)
            }
        }), vt = {
            set: function(e, t, n) {
                return t === !1 ? he.removeAttr(e, n) : e.setAttribute(n, n), n
            }
        }, he.each(he.expr.match.bool.source.match(/\w+/g), function(e, t) {
            var n = yt[t] || he.find.attr;
            yt[t] = function(e, t, i) {
                var r, o, a = t.toLowerCase();
                return i || (o = yt[a], yt[a] = r, r = null != n(e, t, i) ? a : null, yt[a] = o), r
            }
        });
        var bt = /^(?:input|select|textarea|button)$/i,
            $t = /^(?:a|area)$/i;
        he.fn.extend({
            prop: function(e, t) {
                return Oe(this, he.prop, e, t, arguments.length > 1)
            },
            removeProp: function(e) {
                return this.each(function() {
                    delete this[he.propFix[e] || e]
                })
            }
        }), he.extend({
            prop: function(e, t, n) {
                var i, r, o = e.nodeType;
                if (3 !== o && 8 !== o && 2 !== o) return 1 === o && he.isXMLDoc(e) || (t = he.propFix[t] || t, r = he.propHooks[t]), void 0 !== n ? r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : e[t] = n : r && "get" in r && null !== (i = r.get(e, t)) ? i : e[t]
            },
            propHooks: {
                tabIndex: {
                    get: function(e) {
                        var t = he.find.attr(e, "tabindex");
                        return t ? parseInt(t, 10) : bt.test(e.nodeName) || $t.test(e.nodeName) && e.href ? 0 : -1
                    }
                }
            },
            propFix: {
                "for": "htmlFor",
                "class": "className"
            }
        }), pe.optSelected || (he.propHooks.selected = {
            get: function(e) {
                var t = e.parentNode;
                return t && t.parentNode && t.parentNode.selectedIndex, null
            },
            set: function(e) {
                var t = e.parentNode;
                t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
            }
        }), he.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            he.propFix[this.toLowerCase()] = this
        }), he.fn.extend({
            addClass: function(e) {
                var t, n, i, r, o, a, s, l = 0;
                if (he.isFunction(e)) return this.each(function(t) {
                    he(this).addClass(e.call(this, t, V(this)))
                });
                if ("string" == typeof e && e)
                    for (t = e.match(De) || []; n = this[l++];)
                        if (r = V(n), i = 1 === n.nodeType && " " + z(r) + " ") {
                            for (a = 0; o = t[a++];) i.indexOf(" " + o + " ") < 0 && (i += o + " ");
                            s = z(i), r !== s && n.setAttribute("class", s)
                        } return this
            },
            removeClass: function(e) {
                var t, n, i, r, o, a, s, l = 0;
                if (he.isFunction(e)) return this.each(function(t) {
                    he(this).removeClass(e.call(this, t, V(this)))
                });
                if (!arguments.length) return this.attr("class", "");
                if ("string" == typeof e && e)
                    for (t = e.match(De) || []; n = this[l++];)
                        if (r = V(n), i = 1 === n.nodeType && " " + z(r) + " ") {
                            for (a = 0; o = t[a++];)
                                for (; i.indexOf(" " + o + " ") > -1;) i = i.replace(" " + o + " ", " ");
                            s = z(i), r !== s && n.setAttribute("class", s)
                        } return this
            },
            toggleClass: function(e, t) {
                var n = typeof e;
                return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : he.isFunction(e) ? this.each(function(n) {
                    he(this).toggleClass(e.call(this, n, V(this), t), t)
                }) : this.each(function() {
                    var t, i, r, o;
                    if ("string" === n)
                        for (i = 0, r = he(this), o = e.match(De) || []; t = o[i++];) r.hasClass(t) ? r.removeClass(t) : r.addClass(t);
                    else void 0 !== e && "boolean" !== n || (t = V(this), t && Ne.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || e === !1 ? "" : Ne.get(this, "__className__") || ""))
                })
            },
            hasClass: function(e) {
                var t, n, i = 0;
                for (t = " " + e + " "; n = this[i++];)
                    if (1 === n.nodeType && (" " + z(V(n)) + " ").indexOf(t) > -1) return !0;
                return !1
            }
        });
        var wt = /\r/g;
        he.fn.extend({
            val: function(e) {
                var t, n, i, r = this[0];
                return arguments.length ? (i = he.isFunction(e), this.each(function(n) {
                    var r;
                    1 === this.nodeType && (r = i ? e.call(this, n, he(this).val()) : e, null == r ? r = "" : "number" == typeof r ? r += "" : he.isArray(r) && (r = he.map(r, function(e) {
                        return null == e ? "" : e + ""
                    })), t = he.valHooks[this.type] || he.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, r, "value") || (this.value = r))
                })) : r ? (t = he.valHooks[r.type] || he.valHooks[r.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(r, "value")) ? n : (n = r.value, "string" == typeof n ? n.replace(wt, "") : null == n ? "" : n)) : void 0
            }
        }), he.extend({
            valHooks: {
                option: {
                    get: function(e) {
                        var t = he.find.attr(e, "value");
                        return null != t ? t : z(he.text(e))
                    }
                },
                select: {
                    get: function(e) {
                        var t, n, i, r = e.options,
                            o = e.selectedIndex,
                            a = "select-one" === e.type,
                            s = a ? null : [],
                            l = a ? o + 1 : r.length;
                        for (i = o < 0 ? l : a ? o : 0; i < l; i++)
                            if (n = r[i], (n.selected || i === o) && !n.disabled && (!n.parentNode.disabled || !he.nodeName(n.parentNode, "optgroup"))) {
                                if (t = he(n).val(), a) return t;
                                s.push(t)
                            } return s
                    },
                    set: function(e, t) {
                        for (var n, i, r = e.options, o = he.makeArray(t), a = r.length; a--;) i = r[a], (i.selected = he.inArray(he.valHooks.option.get(i), o) > -1) && (n = !0);
                        return n || (e.selectedIndex = -1), o
                    }
                }
            }
        }), he.each(["radio", "checkbox"], function() {
            he.valHooks[this] = {
                set: function(e, t) {
                    if (he.isArray(t)) return e.checked = he.inArray(he(e).val(), t) > -1
                }
            }, pe.checkOn || (he.valHooks[this].get = function(e) {
                return null === e.getAttribute("value") ? "on" : e.value
            })
        });
        var Ct = /^(?:focusinfocus|focusoutblur)$/;
        he.extend(he.event, {
            trigger: function(t, n, i, r) {
                var o, a, s, l, c, d, u, p = [i || te],
                    f = ce.call(t, "type") ? t.type : t,
                    h = ce.call(t, "namespace") ? t.namespace.split(".") : [];
                if (a = s = i = i || te, 3 !== i.nodeType && 8 !== i.nodeType && !Ct.test(f + he.event.triggered) && (f.indexOf(".") > -1 && (h = f.split("."), f = h.shift(), h.sort()), c = f.indexOf(":") < 0 && "on" + f, t = t[he.expando] ? t : new he.Event(f, "object" == typeof t && t), t.isTrigger = r ? 2 : 3, t.namespace = h.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : he.makeArray(n, [t]), u = he.event.special[f] || {}, r || !u.trigger || u.trigger.apply(i, n) !== !1)) {
                    if (!r && !u.noBubble && !he.isWindow(i)) {
                        for (l = u.delegateType || f, Ct.test(l + f) || (a = a.parentNode); a; a = a.parentNode) p.push(a), s = a;
                        s === (i.ownerDocument || te) && p.push(s.defaultView || s.parentWindow || e)
                    }
                    for (o = 0;
                        (a = p[o++]) && !t.isPropagationStopped();) t.type = o > 1 ? l : u.bindType || f, d = (Ne.get(a, "events") || {})[t.type] && Ne.get(a, "handle"), d && d.apply(a, n), d = c && a[c], d && d.apply && Le(a) && (t.result = d.apply(a, n), t.result === !1 && t.preventDefault());
                    return t.type = f, r || t.isDefaultPrevented() || u._default && u._default.apply(p.pop(), n) !== !1 || !Le(i) || c && he.isFunction(i[f]) && !he.isWindow(i) && (s = i[c], s && (i[c] = null), he.event.triggered = f, i[f](), he.event.triggered = void 0, s && (i[c] = s)), t.result
                }
            },
            simulate: function(e, t, n) {
                var i = he.extend(new he.Event, n, {
                    type: e,
                    isSimulated: !0
                });
                he.event.trigger(i, null, t)
            }
        }), he.fn.extend({
            trigger: function(e, t) {
                return this.each(function() {
                    he.event.trigger(e, t, this)
                })
            },
            triggerHandler: function(e, t) {
                var n = this[0];
                if (n) return he.event.trigger(e, t, n, !0)
            }
        }), he.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, t) {
            he.fn[t] = function(e, n) {
                return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
            }
        }), he.fn.extend({
            hover: function(e, t) {
                return this.mouseenter(e).mouseleave(t || e)
            }
        }), pe.focusin = "onfocusin" in e, pe.focusin || he.each({
            focus: "focusin",
            blur: "focusout"
        }, function(e, t) {
            var n = function(e) {
                he.event.simulate(t, e.target, he.event.fix(e))
            };
            he.event.special[t] = {
                setup: function() {
                    var i = this.ownerDocument || this,
                        r = Ne.access(i, t);
                    r || i.addEventListener(e, n, !0), Ne.access(i, t, (r || 0) + 1)
                },
                teardown: function() {
                    var i = this.ownerDocument || this,
                        r = Ne.access(i, t) - 1;
                    r ? Ne.access(i, t, r) : (i.removeEventListener(e, n, !0), Ne.remove(i, t))
                }
            }
        });
        var xt = e.location,
            Tt = he.now(),
            _t = /\?/;
        he.parseXML = function(t) {
            var n;
            if (!t || "string" != typeof t) return null;
            try {
                n = (new e.DOMParser).parseFromString(t, "text/xml")
            } catch (i) {
                n = void 0
            }
            return n && !n.getElementsByTagName("parsererror").length || he.error("Invalid XML: " + t), n
        };
        var kt = /\[\]$/,
            St = /\r?\n/g,
            It = /^(?:submit|button|image|reset|file)$/i,
            Et = /^(?:input|select|textarea|keygen)/i;
        he.param = function(e, t) {
            var n, i = [],
                r = function(e, t) {
                    var n = he.isFunction(t) ? t() : t;
                    i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
                };
            if (he.isArray(e) || e.jquery && !he.isPlainObject(e)) he.each(e, function() {
                r(this.name, this.value)
            });
            else
                for (n in e) Q(n, e[n], t, r);
            return i.join("&")
        }, he.fn.extend({
            serialize: function() {
                return he.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var e = he.prop(this, "elements");
                    return e ? he.makeArray(e) : this
                }).filter(function() {
                    var e = this.type;
                    return this.name && !he(this).is(":disabled") && Et.test(this.nodeName) && !It.test(e) && (this.checked || !ze.test(e))
                }).map(function(e, t) {
                    var n = he(this).val();
                    return null == n ? null : he.isArray(n) ? he.map(n, function(e) {
                        return {
                            name: t.name,
                            value: e.replace(St, "\r\n")
                        }
                    }) : {
                        name: t.name,
                        value: n.replace(St, "\r\n")
                    }
                }).get()
            }
        });
        var Dt = /%20/g,
            At = /#.*$/,
            Ft = /([?&])_=[^&]*/,
            Ot = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            Lt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            Nt = /^(?:GET|HEAD)$/,
            Rt = /^\/\//,
            Mt = {},
            Pt = {},
            Ut = "*/".concat("*"),
            qt = te.createElement("a");
        qt.href = xt.href, he.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: xt.href,
                type: "GET",
                isLocal: Lt.test(xt.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": Ut,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": JSON.parse,
                    "text xml": he.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(e, t) {
                return t ? Y(Y(e, he.ajaxSettings), t) : Y(he.ajaxSettings, e)
            },
            ajaxPrefilter: G(Mt),
            ajaxTransport: G(Pt),
            ajax: function(t, n) {
                function i(t, n, i, s) {
                    var c, p, f, $, w, C = n;
                    d || (d = !0, l && e.clearTimeout(l), r = void 0, a = s || "", x.readyState = t > 0 ? 4 : 0, c = t >= 200 && t < 300 || 304 === t, i && ($ = K(h, x, i)), $ = J(h, $, x, c), c ? (h.ifModified && (w = x.getResponseHeader("Last-Modified"), w && (he.lastModified[o] = w), w = x.getResponseHeader("etag"), w && (he.etag[o] = w)), 204 === t || "HEAD" === h.type ? C = "nocontent" : 304 === t ? C = "notmodified" : (C = $.state, p = $.data, f = $.error, c = !f)) : (f = C, !t && C || (C = "error", t < 0 && (t = 0))), x.status = t, x.statusText = (n || C) + "", c ? v.resolveWith(m, [p, C, x]) : v.rejectWith(m, [x, C, f]), x.statusCode(b), b = void 0, u && g.trigger(c ? "ajaxSuccess" : "ajaxError", [x, h, c ? p : f]), y.fireWith(m, [x, C]), u && (g.trigger("ajaxComplete", [x, h]), --he.active || he.event.trigger("ajaxStop")))
                }
                "object" == typeof t && (n = t, t = void 0), n = n || {};
                var r, o, a, s, l, c, d, u, p, f, h = he.ajaxSetup({}, n),
                    m = h.context || h,
                    g = h.context && (m.nodeType || m.jquery) ? he(m) : he.event,
                    v = he.Deferred(),
                    y = he.Callbacks("once memory"),
                    b = h.statusCode || {},
                    $ = {},
                    w = {},
                    C = "canceled",
                    x = {
                        readyState: 0,
                        getResponseHeader: function(e) {
                            var t;
                            if (d) {
                                if (!s)
                                    for (s = {}; t = Ot.exec(a);) s[t[1].toLowerCase()] = t[2];
                                t = s[e.toLowerCase()]
                            }
                            return null == t ? null : t
                        },
                        getAllResponseHeaders: function() {
                            return d ? a : null
                        },
                        setRequestHeader: function(e, t) {
                            return null == d && (e = w[e.toLowerCase()] = w[e.toLowerCase()] || e, $[e] = t), this
                        },
                        overrideMimeType: function(e) {
                            return null == d && (h.mimeType = e), this
                        },
                        statusCode: function(e) {
                            var t;
                            if (e)
                                if (d) x.always(e[x.status]);
                                else
                                    for (t in e) b[t] = [b[t], e[t]];
                            return this
                        },
                        abort: function(e) {
                            var t = e || C;
                            return r && r.abort(t), i(0, t), this
                        }
                    };
                if (v.promise(x), h.url = ((t || h.url || xt.href) + "").replace(Rt, xt.protocol + "//"), h.type = n.method || n.type || h.method || h.type, h.dataTypes = (h.dataType || "*").toLowerCase().match(De) || [""], null == h.crossDomain) {
                    c = te.createElement("a");
                    try {
                        c.href = h.url, c.href = c.href, h.crossDomain = qt.protocol + "//" + qt.host != c.protocol + "//" + c.host
                    } catch (T) {
                        h.crossDomain = !0
                    }
                }
                if (h.data && h.processData && "string" != typeof h.data && (h.data = he.param(h.data, h.traditional)), X(Mt, h, n, x), d) return x;
                u = he.event && h.global, u && 0 === he.active++ && he.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !Nt.test(h.type), o = h.url.replace(At, ""), h.hasContent ? h.data && h.processData && 0 === (h.contentType || "").indexOf("application/x-www-form-urlencoded") && (h.data = h.data.replace(Dt, "+")) : (f = h.url.slice(o.length), h.data && (o += (_t.test(o) ? "&" : "?") + h.data, delete h.data), h.cache === !1 && (o = o.replace(Ft, "$1"), f = (_t.test(o) ? "&" : "?") + "_=" + Tt++ + f), h.url = o + f), h.ifModified && (he.lastModified[o] && x.setRequestHeader("If-Modified-Since", he.lastModified[o]), he.etag[o] && x.setRequestHeader("If-None-Match", he.etag[o])), (h.data && h.hasContent && h.contentType !== !1 || n.contentType) && x.setRequestHeader("Content-Type", h.contentType), x.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + Ut + "; q=0.01" : "") : h.accepts["*"]);
                for (p in h.headers) x.setRequestHeader(p, h.headers[p]);
                if (h.beforeSend && (h.beforeSend.call(m, x, h) === !1 || d)) return x.abort();
                if (C = "abort", y.add(h.complete), x.done(h.success), x.fail(h.error), r = X(Pt, h, n, x)) {
                    if (x.readyState = 1, u && g.trigger("ajaxSend", [x, h]), d) return x;
                    h.async && h.timeout > 0 && (l = e.setTimeout(function() {
                        x.abort("timeout")
                    }, h.timeout));
                    try {
                        d = !1, r.send($, i)
                    } catch (T) {
                        if (d) throw T;
                        i(-1, T)
                    }
                } else i(-1, "No Transport");
                return x
            },
            getJSON: function(e, t, n) {
                return he.get(e, t, n, "json")
            },
            getScript: function(e, t) {
                return he.get(e, void 0, t, "script")
            }
        }), he.each(["get", "post"], function(e, t) {
            he[t] = function(e, n, i, r) {
                return he.isFunction(n) && (r = r || i, i = n, n = void 0), he.ajax(he.extend({
                    url: e,
                    type: t,
                    dataType: r,
                    data: n,
                    success: i
                }, he.isPlainObject(e) && e))
            }
        }), he._evalUrl = function(e) {
            return he.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                "throws": !0
            })
        }, he.fn.extend({
            wrapAll: function(e) {
                var t;
                return this[0] && (he.isFunction(e) && (e = e.call(this[0])), t = he(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                    for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                    return e
                }).append(this)), this
            },
            wrapInner: function(e) {
                return he.isFunction(e) ? this.each(function(t) {
                    he(this).wrapInner(e.call(this, t))
                }) : this.each(function() {
                    var t = he(this),
                        n = t.contents();
                    n.length ? n.wrapAll(e) : t.append(e)
                })
            },
            wrap: function(e) {
                var t = he.isFunction(e);
                return this.each(function(n) {
                    he(this).wrapAll(t ? e.call(this, n) : e)
                })
            },
            unwrap: function(e) {
                return this.parent(e).not("body").each(function() {
                    he(this).replaceWith(this.childNodes)
                }), this
            }
        }), he.expr.pseudos.hidden = function(e) {
            return !he.expr.pseudos.visible(e)
        }, he.expr.pseudos.visible = function(e) {
            return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
        }, he.ajaxSettings.xhr = function() {
            try {
                return new e.XMLHttpRequest
            } catch (t) {}
        };
        var jt = {
                0: 200,
                1223: 204
            },
            Bt = he.ajaxSettings.xhr();
        pe.cors = !!Bt && "withCredentials" in Bt, pe.ajax = Bt = !!Bt, he.ajaxTransport(function(t) {
            var n, i;
            if (pe.cors || Bt && !t.crossDomain) return {
                send: function(r, o) {
                    var a, s = t.xhr();
                    if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                        for (a in t.xhrFields) s[a] = t.xhrFields[a];
                    t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
                    for (a in r) s.setRequestHeader(a, r[a]);
                    n = function(e) {
                        return function() {
                            n && (n = i = s.onload = s.onerror = s.onabort = s.onreadystatechange = null, "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? o(0, "error") : o(s.status, s.statusText) : o(jt[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {
                                binary: s.response
                            } : {
                                text: s.responseText
                            }, s.getAllResponseHeaders()))
                        }
                    }, s.onload = n(), i = s.onerror = n("error"), void 0 !== s.onabort ? s.onabort = i : s.onreadystatechange = function() {
                        4 === s.readyState && e.setTimeout(function() {
                            n && i()
                        })
                    }, n = n("abort");
                    try {
                        s.send(t.hasContent && t.data || null)
                    } catch (l) {
                        if (n) throw l
                    }
                },
                abort: function() {
                    n && n()
                }
            }
        }), he.ajaxPrefilter(function(e) {
            e.crossDomain && (e.contents.script = !1)
        }), he.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function(e) {
                    return he.globalEval(e), e
                }
            }
        }), he.ajaxPrefilter("script", function(e) {
            void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
        }), he.ajaxTransport("script", function(e) {
            if (e.crossDomain) {
                var t, n;
                return {
                    send: function(i, r) {
                        t = he("<script>").prop({
                            charset: e.scriptCharset,
                            src: e.url
                        }).on("load error", n = function(e) {
                            t.remove(), n = null, e && r("error" === e.type ? 404 : 200, e.type)
                        }), te.head.appendChild(t[0])
                    },
                    abort: function() {
                        n && n()
                    }
                }
            }
        });
        var Wt = [],
            Ht = /(=)\?(?=&|$)|\?\?/;
        he.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var e = Wt.pop() || he.expando + "_" + Tt++;
                return this[e] = !0, e
            }
        }), he.ajaxPrefilter("json jsonp", function(t, n, i) {
            var r, o, a, s = t.jsonp !== !1 && (Ht.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Ht.test(t.data) && "data");
            if (s || "jsonp" === t.dataTypes[0]) return r = t.jsonpCallback = he.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(Ht, "$1" + r) : t.jsonp !== !1 && (t.url += (_t.test(t.url) ? "&" : "?") + t.jsonp + "=" + r), t.converters["script json"] = function() {
                return a || he.error(r + " was not called"), a[0]
            }, t.dataTypes[0] = "json", o = e[r], e[r] = function() {
                a = arguments
            }, i.always(function() {
                void 0 === o ? he(e).removeProp(r) : e[r] = o, t[r] && (t.jsonpCallback = n.jsonpCallback, Wt.push(r)), a && he.isFunction(o) && o(a[0]), a = o = void 0
            }), "script"
        }), pe.createHTMLDocument = function() {
            var e = te.implementation.createHTMLDocument("").body;
            return e.innerHTML = "<form></form><form></form>", 2 === e.childNodes.length
        }(), he.parseHTML = function(e, t, n) {
            if ("string" != typeof e) return [];
            "boolean" == typeof t && (n = t, t = !1);
            var i, r, o;
            return t || (pe.createHTMLDocument ? (t = te.implementation.createHTMLDocument(""), i = t.createElement("base"), i.href = te.location.href, t.head.appendChild(i)) : t = te), r = xe.exec(e), o = !n && [], r ? [t.createElement(r[1])] : (r = b([e], t, o), o && o.length && he(o).remove(), he.merge([], r.childNodes))
        }, he.fn.load = function(e, t, n) {
            var i, r, o, a = this,
                s = e.indexOf(" ");
            return s > -1 && (i = z(e.slice(s)), e = e.slice(0, s)), he.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (r = "POST"), a.length > 0 && he.ajax({
                url: e,
                type: r || "GET",
                dataType: "html",
                data: t
            }).done(function(e) {
                o = arguments, a.html(i ? he("<div>").append(he.parseHTML(e)).find(i) : e)
            }).always(n && function(e, t) {
                a.each(function() {
                    n.apply(this, o || [e.responseText, t, e])
                })
            }), this
        }, he.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
            he.fn[t] = function(e) {
                return this.on(t, e)
            }
        }), he.expr.pseudos.animated = function(e) {
            return he.grep(he.timers, function(t) {
                return e === t.elem
            }).length
        }, he.offset = {
            setOffset: function(e, t, n) {
                var i, r, o, a, s, l, c, d = he.css(e, "position"),
                    u = he(e),
                    p = {};
                "static" === d && (e.style.position = "relative"), s = u.offset(), o = he.css(e, "top"), l = he.css(e, "left"), c = ("absolute" === d || "fixed" === d) && (o + l).indexOf("auto") > -1, c ? (i = u.position(), a = i.top, r = i.left) : (a = parseFloat(o) || 0, r = parseFloat(l) || 0), he.isFunction(t) && (t = t.call(e, n, he.extend({}, s))), null != t.top && (p.top = t.top - s.top + a), null != t.left && (p.left = t.left - s.left + r), "using" in t ? t.using.call(e, p) : u.css(p)
            }
        }, he.fn.extend({
            offset: function(e) {
                if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                    he.offset.setOffset(this, e, t)
                });
                var t, n, i, r, o = this[0];
                return o ? o.getClientRects().length ? (i = o.getBoundingClientRect(), i.width || i.height ? (r = o.ownerDocument, n = Z(r), t = r.documentElement, {
                    top: i.top + n.pageYOffset - t.clientTop,
                    left: i.left + n.pageXOffset - t.clientLeft
                }) : i) : {
                    top: 0,
                    left: 0
                } : void 0
            },
            position: function() {
                if (this[0]) {
                    var e, t, n = this[0],
                        i = {
                            top: 0,
                            left: 0
                        };
                    return "fixed" === he.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), he.nodeName(e[0], "html") || (i = e.offset()), i = {
                        top: i.top + he.css(e[0], "borderTopWidth", !0),
                        left: i.left + he.css(e[0], "borderLeftWidth", !0)
                    }), {
                        top: t.top - i.top - he.css(n, "marginTop", !0),
                        left: t.left - i.left - he.css(n, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var e = this.offsetParent; e && "static" === he.css(e, "position");) e = e.offsetParent;
                    return e || Ye
                })
            }
        }), he.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(e, t) {
            var n = "pageYOffset" === t;
            he.fn[e] = function(i) {
                return Oe(this, function(e, i, r) {
                    var o = Z(e);
                    return void 0 === r ? o ? o[t] : e[i] : void(o ? o.scrollTo(n ? o.pageXOffset : r, n ? r : o.pageYOffset) : e[i] = r)
                }, e, i, arguments.length)
            }
        }), he.each(["top", "left"], function(e, t) {
            he.cssHooks[t] = F(pe.pixelPosition, function(e, n) {
                if (n) return n = A(e, t), at.test(n) ? he(e).position()[t] + "px" : n
            })
        }), he.each({
            Height: "height",
            Width: "width"
        }, function(e, t) {
            he.each({
                padding: "inner" + e,
                content: t,
                "": "outer" + e
            }, function(n, i) {
                he.fn[i] = function(r, o) {
                    var a = arguments.length && (n || "boolean" != typeof r),
                        s = n || (r === !0 || o === !0 ? "margin" : "border");
                    return Oe(this, function(t, n, r) {
                        var o;
                        return he.isWindow(t) ? 0 === i.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === r ? he.css(t, n, s) : he.style(t, n, r, s)
                    }, t, a ? r : void 0, a)
                }
            })
        }), he.fn.extend({
            bind: function(e, t, n) {
                return this.on(e, null, t, n)
            },
            unbind: function(e, t) {
                return this.off(e, null, t)
            },
            delegate: function(e, t, n, i) {
                return this.on(t, e, n, i)
            },
            undelegate: function(e, t, n) {
                return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
            }
        }), he.parseJSON = JSON.parse, "function" == typeof define && define.amd && define("jquery", [], function() {
            return he
        });
        var zt = e.jQuery,
            Vt = e.$;
        return he.noConflict = function(t) {
            return e.$ === he && (e.$ = Vt), t && e.jQuery === he && (e.jQuery = zt), he
        }, t || (e.jQuery = e.$ = he), he
    }), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(e) {
    "use strict";
    var t = e.fn.jquery.split(" ")[0].split(".");
    if (t[0] < 2 && t[1] < 9 || 1 == t[0] && 9 == t[1] && t[2] < 1 || t[0] > 3) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")
}(jQuery), + function(e) {
    "use strict";

    function t() {
        var e = document.createElement("bootstrap"),
            t = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var n in t)
            if (void 0 !== e.style[n]) return {
                end: t[n]
            };
        return !1
    }
    e.fn.emulateTransitionEnd = function(t) {
        var n = !1,
            i = this;
        e(this).one("bsTransitionEnd", function() {
            n = !0
        });
        var r = function() {
            n || e(i).trigger(e.support.transition.end)
        };
        return setTimeout(r, t), this
    }, e(function() {
        e.support.transition = t(), e.support.transition && (e.event.special.bsTransitionEnd = {
            bindType: e.support.transition.end,
            delegateType: e.support.transition.end,
            handle: function(t) {
                if (e(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
            }
        })
    })
}(jQuery), + function(e) {
    "use strict";

    function t(t) {
        return this.each(function() {
            var n = e(this),
                r = n.data("bs.alert");
            r || n.data("bs.alert", r = new i(this)), "string" == typeof t && r[t].call(n)
        })
    }
    var n = '[data-dismiss="alert"]',
        i = function(t) {
            e(t).on("click", n, this.close)
        };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 150, i.prototype.close = function(t) {
        function n() {
            a.detach().trigger("closed.bs.alert").remove()
        }
        var r = e(this),
            o = r.attr("data-target");
        o || (o = r.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, ""));
        var a = e("#" === o ? [] : o);
        t && t.preventDefault(), a.length || (a = r.closest(".alert")), a.trigger(t = e.Event("close.bs.alert")), t.isDefaultPrevented() || (a.removeClass("in"), e.support.transition && a.hasClass("fade") ? a.one("bsTransitionEnd", n).emulateTransitionEnd(i.TRANSITION_DURATION) : n())
    };
    var r = e.fn.alert;
    e.fn.alert = t, e.fn.alert.Constructor = i, e.fn.alert.noConflict = function() {
        return e.fn.alert = r, this
    }, e(document).on("click.bs.alert.data-api", n, i.prototype.close)
}(jQuery), + function(e) {
    "use strict";

    function t(t) {
        return this.each(function() {
            var i = e(this),
                r = i.data("bs.button"),
                o = "object" == typeof t && t;
            r || i.data("bs.button", r = new n(this, o)), "toggle" == t ? r.toggle() : t && r.setState(t)
        })
    }
    var n = function(t, i) {
        this.$element = e(t), this.options = e.extend({}, n.DEFAULTS, i), this.isLoading = !1
    };
    n.VERSION = "3.3.7", n.DEFAULTS = {
        loadingText: "loading..."
    }, n.prototype.setState = function(t) {
        var n = "disabled",
            i = this.$element,
            r = i.is("input") ? "val" : "html",
            o = i.data();
        t += "Text", null == o.resetText && i.data("resetText", i[r]()), setTimeout(e.proxy(function() {
            i[r](null == o[t] ? this.options[t] : o[t]), "loadingText" == t ? (this.isLoading = !0, i.addClass(n).attr(n, n).prop(n, !0)) : this.isLoading && (this.isLoading = !1, i.removeClass(n).removeAttr(n).prop(n, !1))
        }, this), 0)
    }, n.prototype.toggle = function() {
        var e = !0,
            t = this.$element.closest('[data-toggle="buttons"]');
        if (t.length) {
            var n = this.$element.find("input");
            "radio" == n.prop("type") ? (n.prop("checked") && (e = !1), t.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == n.prop("type") && (n.prop("checked") !== this.$element.hasClass("active") && (e = !1), this.$element.toggleClass("active")), n.prop("checked", this.$element.hasClass("active")), e && n.trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
    };
    var i = e.fn.button;
    e.fn.button = t, e.fn.button.Constructor = n, e.fn.button.noConflict = function() {
        return e.fn.button = i, this
    }, e(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(n) {
        var i = e(n.target).closest(".btn");
        t.call(i, "toggle"), e(n.target).is('input[type="radio"], input[type="checkbox"]') || (n.preventDefault(), i.is("input,button") ? i.trigger("focus") : i.find("input:visible,button:visible").first().trigger("focus"))
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(t) {
        e(t.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(t.type))
    })
}(jQuery), + function(e) {
    "use strict";

    function t(t) {
        return this.each(function() {
            var i = e(this),
                r = i.data("bs.carousel"),
                o = e.extend({}, n.DEFAULTS, i.data(), "object" == typeof t && t),
                a = "string" == typeof t ? t : o.slide;
            r || i.data("bs.carousel", r = new n(this, o)), "number" == typeof t ? r.to(t) : a ? r[a]() : o.interval && r.pause().cycle()
        })
    }
    var n = function(t, n) {
        this.$element = e(t), this.$indicators = this.$element.find(".carousel-indicators"), this.options = n, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", e.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", e.proxy(this.pause, this)).on("mouseleave.bs.carousel", e.proxy(this.cycle, this))
    };
    n.VERSION = "3.3.7", n.TRANSITION_DURATION = 600, n.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, n.prototype.keydown = function(e) {
        if (!/input|textarea/i.test(e.target.tagName)) {
            switch (e.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            e.preventDefault()
        }
    }, n.prototype.cycle = function(t) {
        return t || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval)), this
    }, n.prototype.getItemIndex = function(e) {
        return this.$items = e.parent().children(".item"), this.$items.index(e || this.$active)
    }, n.prototype.getItemForDirection = function(e, t) {
        var n = this.getItemIndex(t),
            i = "prev" == e && 0 === n || "next" == e && n == this.$items.length - 1;
        if (i && !this.options.wrap) return t;
        var r = "prev" == e ? -1 : 1,
            o = (n + r) % this.$items.length;
        return this.$items.eq(o)
    }, n.prototype.to = function(e) {
        var t = this,
            n = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(e > this.$items.length - 1 || e < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function() {
            t.to(e)
        }) : n == e ? this.pause().cycle() : this.slide(e > n ? "next" : "prev", this.$items.eq(e))
    }, n.prototype.pause = function(t) {
        return t || (this.paused = !0), this.$element.find(".next, .prev").length && e.support.transition && (this.$element.trigger(e.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, n.prototype.next = function() {
        if (!this.sliding) return this.slide("next")
    }, n.prototype.prev = function() {
        if (!this.sliding) return this.slide("prev")
    }, n.prototype.slide = function(t, i) {
        var r = this.$element.find(".item.active"),
            o = i || this.getItemForDirection(t, r),
            a = this.interval,
            s = "next" == t ? "left" : "right",
            l = this;
        if (o.hasClass("active")) return this.sliding = !1;
        var c = o[0],
            d = e.Event("slide.bs.carousel", {
                relatedTarget: c,
                direction: s
            });
        if (this.$element.trigger(d), !d.isDefaultPrevented()) {
            if (this.sliding = !0, a && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var u = e(this.$indicators.children()[this.getItemIndex(o)]);
                u && u.addClass("active")
            }
            var p = e.Event("slid.bs.carousel", {
                relatedTarget: c,
                direction: s
            });
            return e.support.transition && this.$element.hasClass("slide") ? (o.addClass(t), o[0].offsetWidth, r.addClass(s), o.addClass(s), r.one("bsTransitionEnd", function() {
                o.removeClass([t, s].join(" ")).addClass("active"), r.removeClass(["active", s].join(" ")), l.sliding = !1, setTimeout(function() {
                    l.$element.trigger(p)
                }, 0)
            }).emulateTransitionEnd(n.TRANSITION_DURATION)) : (r.removeClass("active"), o.addClass("active"), this.sliding = !1, this.$element.trigger(p)), a && this.cycle(), this
        }
    };
    var i = e.fn.carousel;
    e.fn.carousel = t, e.fn.carousel.Constructor = n, e.fn.carousel.noConflict = function() {
        return e.fn.carousel = i, this
    };
    var r = function(n) {
        var i, r = e(this),
            o = e(r.attr("data-target") || (i = r.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, ""));
        if (o.hasClass("carousel")) {
            var a = e.extend({}, o.data(), r.data()),
                s = r.attr("data-slide-to");
            s && (a.interval = !1), t.call(o, a), s && o.data("bs.carousel").to(s), n.preventDefault()
        }
    };
    e(document).on("click.bs.carousel.data-api", "[data-slide]", r).on("click.bs.carousel.data-api", "[data-slide-to]", r), e(window).on("load", function() {
        e('[data-ride="carousel"]').each(function() {
            var n = e(this);
            t.call(n, n.data())
        })
    })
}(jQuery), + function(e) {
    "use strict";

    function t(t) {
        var n, i = t.attr("data-target") || (n = t.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "");
        return e(i)
    }

    function n(t) {
        return this.each(function() {
            var n = e(this),
                r = n.data("bs.collapse"),
                o = e.extend({}, i.DEFAULTS, n.data(), "object" == typeof t && t);
            !r && o.toggle && /show|hide/.test(t) && (o.toggle = !1), r || n.data("bs.collapse", r = new i(this, o)), "string" == typeof t && r[t]()
        })
    }
    var i = function(t, n) {
        this.$element = e(t), this.options = e.extend({}, i.DEFAULTS, n), this.$trigger = e('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 350, i.DEFAULTS = {
        toggle: !0
    }, i.prototype.dimension = function() {
        var e = this.$element.hasClass("width");
        return e ? "width" : "height"
    }, i.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var t, r = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(r && r.length && (t = r.data("bs.collapse"), t && t.transitioning))) {
                var o = e.Event("show.bs.collapse");
                if (this.$element.trigger(o), !o.isDefaultPrevented()) {
                    r && r.length && (n.call(r, "hide"), t || r.data("bs.collapse", null));
                    var a = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[a](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var s = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[a](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!e.support.transition) return s.call(this);
                    var l = e.camelCase(["scroll", a].join("-"));
                    this.$element.one("bsTransitionEnd", e.proxy(s, this)).emulateTransitionEnd(i.TRANSITION_DURATION)[a](this.$element[0][l])
                }
            }
        }
    }, i.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var t = e.Event("hide.bs.collapse");
            if (this.$element.trigger(t), !t.isDefaultPrevented()) {
                var n = this.dimension();
                this.$element[n](this.$element[n]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var r = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return e.support.transition ? void this.$element[n](0).one("bsTransitionEnd", e.proxy(r, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : r.call(this)
            }
        }
    }, i.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, i.prototype.getParent = function() {
        return e(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(e.proxy(function(n, i) {
            var r = e(i);
            this.addAriaAndCollapsedClass(t(r), r)
        }, this)).end()
    }, i.prototype.addAriaAndCollapsedClass = function(e, t) {
        var n = e.hasClass("in");
        e.attr("aria-expanded", n), t.toggleClass("collapsed", !n).attr("aria-expanded", n)
    };
    var r = e.fn.collapse;
    e.fn.collapse = n, e.fn.collapse.Constructor = i, e.fn.collapse.noConflict = function() {
        return e.fn.collapse = r, this
    }, e(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(i) {
        var r = e(this);
        r.attr("data-target") || i.preventDefault();
        var o = t(r),
            a = o.data("bs.collapse"),
            s = a ? "toggle" : r.data();
        n.call(o, s)
    })
}(jQuery), + function(e) {
    "use strict";

    function t(t) {
        var n = t.attr("data-target");
        n || (n = t.attr("href"), n = n && /#[A-Za-z]/.test(n) && n.replace(/.*(?=#[^\s]*$)/, ""));
        var i = n && e(n);
        return i && i.length ? i : t.parent()
    }

    function n(n) {
        n && 3 === n.which || (e(r).remove(), e(o).each(function() {
            var i = e(this),
                r = t(i),
                o = {
                    relatedTarget: this
                };
            r.hasClass("open") && (n && "click" == n.type && /input|textarea/i.test(n.target.tagName) && e.contains(r[0], n.target) || (r.trigger(n = e.Event("hide.bs.dropdown", o)), n.isDefaultPrevented() || (i.attr("aria-expanded", "false"), r.removeClass("open").trigger(e.Event("hidden.bs.dropdown", o)))))
        }))
    }

    function i(t) {
        return this.each(function() {
            var n = e(this),
                i = n.data("bs.dropdown");
            i || n.data("bs.dropdown", i = new a(this)), "string" == typeof t && i[t].call(n)
        })
    }
    var r = ".dropdown-backdrop",
        o = '[data-toggle="dropdown"]',
        a = function(t) {
            e(t).on("click.bs.dropdown", this.toggle)
        };
    a.VERSION = "3.3.7", a.prototype.toggle = function(i) {
        var r = e(this);
        if (!r.is(".disabled, :disabled")) {
            var o = t(r),
                a = o.hasClass("open");
            if (n(), !a) {
                "ontouchstart" in document.documentElement && !o.closest(".navbar-nav").length && e(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(e(this)).on("click", n);
                var s = {
                    relatedTarget: this
                };
                if (o.trigger(i = e.Event("show.bs.dropdown", s)), i.isDefaultPrevented()) return;
                r.trigger("focus").attr("aria-expanded", "true"), o.toggleClass("open").trigger(e.Event("shown.bs.dropdown", s))
            }
            return !1
        }
    }, a.prototype.keydown = function(n) {
        if (/(38|40|27|32)/.test(n.which) && !/input|textarea/i.test(n.target.tagName)) {
            var i = e(this);
            if (n.preventDefault(), n.stopPropagation(), !i.is(".disabled, :disabled")) {
                var r = t(i),
                    a = r.hasClass("open");
                if (!a && 27 != n.which || a && 27 == n.which) return 27 == n.which && r.find(o).trigger("focus"), i.trigger("click");
                var s = " li:not(.disabled):visible a",
                    l = r.find(".dropdown-menu" + s);
                if (l.length) {
                    var c = l.index(n.target);
                    38 == n.which && c > 0 && c--, 40 == n.which && c < l.length - 1 && c++, ~c || (c = 0), l.eq(c).trigger("focus")
                }
            }
        }
    };
    var s = e.fn.dropdown;
    e.fn.dropdown = i, e.fn.dropdown.Constructor = a, e.fn.dropdown.noConflict = function() {
        return e.fn.dropdown = s, this
    }, e(document).on("click.bs.dropdown.data-api", n).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
        e.stopPropagation()
    }).on("click.bs.dropdown.data-api", o, a.prototype.toggle).on("keydown.bs.dropdown.data-api", o, a.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", a.prototype.keydown)
}(jQuery), + function(e) {
    "use strict";

    function t(t, i) {
        return this.each(function() {
            var r = e(this),
                o = r.data("bs.modal"),
                a = e.extend({}, n.DEFAULTS, r.data(), "object" == typeof t && t);
            o || r.data("bs.modal", o = new n(this, a)), "string" == typeof t ? o[t](i) : a.show && o.show(i)
        })
    }
    var n = function(t, n) {
        this.options = n, this.$body = e(document.body), this.$element = e(t), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, e.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    n.VERSION = "3.3.7", n.TRANSITION_DURATION = 300, n.BACKDROP_TRANSITION_DURATION = 150, n.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, n.prototype.toggle = function(e) {
        return this.isShown ? this.hide() : this.show(e)
    }, n.prototype.show = function(t) {
        var i = this,
            r = e.Event("show.bs.modal", {
                relatedTarget: t
            });
        this.$element.trigger(r), this.isShown || r.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', e.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            i.$element.one("mouseup.dismiss.bs.modal", function(t) {
                e(t.target).is(i.$element) && (i.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function() {
            var r = e.support.transition && i.$element.hasClass("fade");
            i.$element.parent().length || i.$element.appendTo(i.$body), i.$element.show().scrollTop(0), i.adjustDialog(), r && i.$element[0].offsetWidth, i.$element.addClass("in"), i.enforceFocus();
            var o = e.Event("shown.bs.modal", {
                relatedTarget: t
            });
            r ? i.$dialog.one("bsTransitionEnd", function() {
                i.$element.trigger("focus").trigger(o)
            }).emulateTransitionEnd(n.TRANSITION_DURATION) : i.$element.trigger("focus").trigger(o)
        }))
    }, n.prototype.hide = function(t) {
        t && t.preventDefault(), t = e.Event("hide.bs.modal"), this.$element.trigger(t), this.isShown && !t.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), e(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), e.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", e.proxy(this.hideModal, this)).emulateTransitionEnd(n.TRANSITION_DURATION) : this.hideModal())
    }, n.prototype.enforceFocus = function() {
        e(document).off("focusin.bs.modal").on("focusin.bs.modal", e.proxy(function(e) {
            document === e.target || this.$element[0] === e.target || this.$element.has(e.target).length || this.$element.trigger("focus")
        }, this))
    }, n.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", e.proxy(function(e) {
            27 == e.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, n.prototype.resize = function() {
        this.isShown ? e(window).on("resize.bs.modal", e.proxy(this.handleUpdate, this)) : e(window).off("resize.bs.modal")
    }, n.prototype.hideModal = function() {
        var e = this;
        this.$element.hide(), this.backdrop(function() {
            e.$body.removeClass("modal-open"), e.resetAdjustments(), e.resetScrollbar(), e.$element.trigger("hidden.bs.modal")
        })
    }, n.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, n.prototype.backdrop = function(t) {
        var i = this,
            r = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var o = e.support.transition && r;
            if (this.$backdrop = e(document.createElement("div")).addClass("modal-backdrop " + r).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", e.proxy(function(e) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(e.target === e.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }, this)), o && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !t) return;
            o ? this.$backdrop.one("bsTransitionEnd", t).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION) : t()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var a = function() {
                i.removeBackdrop(), t && t()
            };
            e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", a).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION) : a()
        } else t && t()
    }, n.prototype.handleUpdate = function() {
        this.adjustDialog()
    }, n.prototype.adjustDialog = function() {
        var e = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && e ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !e ? this.scrollbarWidth : ""
        })
    }, n.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }, n.prototype.checkScrollbar = function() {
        var e = window.innerWidth;
        if (!e) {
            var t = document.documentElement.getBoundingClientRect();
            e = t.right - Math.abs(t.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < e, this.scrollbarWidth = this.measureScrollbar()
    }, n.prototype.setScrollbar = function() {
        var e = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", e + this.scrollbarWidth)
    }, n.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    }, n.prototype.measureScrollbar = function() {
        var e = document.createElement("div");
        e.className = "modal-scrollbar-measure", this.$body.append(e);
        var t = e.offsetWidth - e.clientWidth;
        return this.$body[0].removeChild(e), t
    };
    var i = e.fn.modal;
    e.fn.modal = t, e.fn.modal.Constructor = n, e.fn.modal.noConflict = function() {
        return e.fn.modal = i, this
    }, e(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(n) {
        var i = e(this),
            r = i.attr("href"),
            o = e(i.attr("data-target") || r && r.replace(/.*(?=#[^\s]+$)/, "")),
            a = o.data("bs.modal") ? "toggle" : e.extend({
                remote: !/#/.test(r) && r
            }, o.data(), i.data());
        i.is("a") && n.preventDefault(), o.one("show.bs.modal", function(e) {
            e.isDefaultPrevented() || o.one("hidden.bs.modal", function() {
                i.is(":visible") && i.trigger("focus")
            })
        }), t.call(o, a, this)
    })
}(jQuery), + function(e) {
    "use strict";

    function t(t) {
        return this.each(function() {
            var i = e(this),
                r = i.data("bs.tooltip"),
                o = "object" == typeof t && t;
            !r && /destroy|hide/.test(t) || (r || i.data("bs.tooltip", r = new n(this, o)), "string" == typeof t && r[t]())
        })
    }
    var n = function(e, t) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", e, t)
    };
    n.VERSION = "3.3.7", n.TRANSITION_DURATION = 150, n.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, n.prototype.init = function(t, n, i) {
        if (this.enabled = !0, this.type = t, this.$element = e(n), this.options = this.getOptions(i), this.$viewport = this.options.viewport && e(e.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var r = this.options.trigger.split(" "), o = r.length; o--;) {
            var a = r[o];
            if ("click" == a) this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this));
            else if ("manual" != a) {
                var s = "hover" == a ? "mouseenter" : "focusin",
                    l = "hover" == a ? "mouseleave" : "focusout";
                this.$element.on(s + "." + this.type, this.options.selector, e.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, e.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = e.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, n.prototype.getDefaults = function() {
        return n.DEFAULTS
    }, n.prototype.getOptions = function(t) {
        return t = e.extend({}, this.getDefaults(), this.$element.data(), t), t.delay && "number" == typeof t.delay && (t.delay = {
            show: t.delay,
            hide: t.delay
        }), t
    }, n.prototype.getDelegateOptions = function() {
        var t = {},
            n = this.getDefaults();
        return this._options && e.each(this._options, function(e, i) {
            n[e] != i && (t[e] = i)
        }), t
    }, n.prototype.enter = function(t) {
        var n = t instanceof this.constructor ? t : e(t.currentTarget).data("bs." + this.type);
        return n || (n = new this.constructor(t.currentTarget, this.getDelegateOptions()), e(t.currentTarget).data("bs." + this.type, n)), t instanceof e.Event && (n.inState["focusin" == t.type ? "focus" : "hover"] = !0), n.tip().hasClass("in") || "in" == n.hoverState ? void(n.hoverState = "in") : (clearTimeout(n.timeout), n.hoverState = "in", n.options.delay && n.options.delay.show ? void(n.timeout = setTimeout(function() {
            "in" == n.hoverState && n.show()
        }, n.options.delay.show)) : n.show())
    }, n.prototype.isInStateTrue = function() {
        for (var e in this.inState)
            if (this.inState[e]) return !0;
        return !1
    }, n.prototype.leave = function(t) {
        var n = t instanceof this.constructor ? t : e(t.currentTarget).data("bs." + this.type);
        if (n || (n = new this.constructor(t.currentTarget, this.getDelegateOptions()), e(t.currentTarget).data("bs." + this.type, n)), t instanceof e.Event && (n.inState["focusout" == t.type ? "focus" : "hover"] = !1), !n.isInStateTrue()) return clearTimeout(n.timeout), n.hoverState = "out", n.options.delay && n.options.delay.hide ? void(n.timeout = setTimeout(function() {
            "out" == n.hoverState && n.hide()
        }, n.options.delay.hide)) : n.hide()
    }, n.prototype.show = function() {
        var t = e.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(t);
            var i = e.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (t.isDefaultPrevented() || !i) return;
            var r = this,
                o = this.tip(),
                a = this.getUID(this.type);
            this.setContent(), o.attr("id", a), this.$element.attr("aria-describedby", a), this.options.animation && o.addClass("fade");
            var s = "function" == typeof this.options.placement ? this.options.placement.call(this, o[0], this.$element[0]) : this.options.placement,
                l = /\s?auto?\s?/i,
                c = l.test(s);
            c && (s = s.replace(l, "") || "top"), o.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(s).data("bs." + this.type, this), this.options.container ? o.appendTo(this.options.container) : o.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var d = this.getPosition(),
                u = o[0].offsetWidth,
                p = o[0].offsetHeight;
            if (c) {
                var f = s,
                    h = this.getPosition(this.$viewport);
                s = "bottom" == s && d.bottom + p > h.bottom ? "top" : "top" == s && d.top - p < h.top ? "bottom" : "right" == s && d.right + u > h.width ? "left" : "left" == s && d.left - u < h.left ? "right" : s, o.removeClass(f).addClass(s)
            }
            var m = this.getCalculatedOffset(s, d, u, p);
            this.applyPlacement(m, s);
            var g = function() {
                var e = r.hoverState;
                r.$element.trigger("shown.bs." + r.type), r.hoverState = null, "out" == e && r.leave(r)
            };
            e.support.transition && this.$tip.hasClass("fade") ? o.one("bsTransitionEnd", g).emulateTransitionEnd(n.TRANSITION_DURATION) : g()
        }
    }, n.prototype.applyPlacement = function(t, n) {
        var i = this.tip(),
            r = i[0].offsetWidth,
            o = i[0].offsetHeight,
            a = parseInt(i.css("margin-top"), 10),
            s = parseInt(i.css("margin-left"), 10);
        isNaN(a) && (a = 0), isNaN(s) && (s = 0), t.top += a, t.left += s, e.offset.setOffset(i[0], e.extend({
            using: function(e) {
                i.css({
                    top: Math.round(e.top),
                    left: Math.round(e.left)
                })
            }
        }, t), 0), i.addClass("in");
        var l = i[0].offsetWidth,
            c = i[0].offsetHeight;
        "top" == n && c != o && (t.top = t.top + o - c);
        var d = this.getViewportAdjustedDelta(n, t, l, c);
        d.left ? t.left += d.left : t.top += d.top;
        var u = /top|bottom/.test(n),
            p = u ? 2 * d.left - r + l : 2 * d.top - o + c,
            f = u ? "offsetWidth" : "offsetHeight";
        i.offset(t), this.replaceArrow(p, i[0][f], u)
    }, n.prototype.replaceArrow = function(e, t, n) {
        this.arrow().css(n ? "left" : "top", 50 * (1 - e / t) + "%").css(n ? "top" : "left", "")
    }, n.prototype.setContent = function() {
        var e = this.tip(),
            t = this.getTitle();
        e.find(".tooltip-inner")[this.options.html ? "html" : "text"](t), e.removeClass("fade in top bottom left right")
    }, n.prototype.hide = function(t) {
        function i() {
            "in" != r.hoverState && o.detach(), r.$element && r.$element.removeAttr("aria-describedby").trigger("hidden.bs." + r.type), t && t()
        }
        var r = this,
            o = e(this.$tip),
            a = e.Event("hide.bs." + this.type);
        if (this.$element.trigger(a), !a.isDefaultPrevented()) return o.removeClass("in"), e.support.transition && o.hasClass("fade") ? o.one("bsTransitionEnd", i).emulateTransitionEnd(n.TRANSITION_DURATION) : i(), this.hoverState = null, this
    }, n.prototype.fixTitle = function() {
        var e = this.$element;
        (e.attr("title") || "string" != typeof e.attr("data-original-title")) && e.attr("data-original-title", e.attr("title") || "").attr("title", "")
    }, n.prototype.hasContent = function() {
        return this.getTitle()
    }, n.prototype.getPosition = function(t) {
        t = t || this.$element;
        var n = t[0],
            i = "BODY" == n.tagName,
            r = n.getBoundingClientRect();
        null == r.width && (r = e.extend({}, r, {
            width: r.right - r.left,
            height: r.bottom - r.top
        }));
        var o = window.SVGElement && n instanceof window.SVGElement,
            a = i ? {
                top: 0,
                left: 0
            } : o ? null : t.offset(),
            s = {
                scroll: i ? document.documentElement.scrollTop || document.body.scrollTop : t.scrollTop()
            },
            l = i ? {
                width: e(window).width(),
                height: e(window).height()
            } : null;
        return e.extend({}, r, s, l, a)
    }, n.prototype.getCalculatedOffset = function(e, t, n, i) {
        return "bottom" == e ? {
            top: t.top + t.height,
            left: t.left + t.width / 2 - n / 2
        } : "top" == e ? {
            top: t.top - i,
            left: t.left + t.width / 2 - n / 2
        } : "left" == e ? {
            top: t.top + t.height / 2 - i / 2,
            left: t.left - n
        } : {
            top: t.top + t.height / 2 - i / 2,
            left: t.left + t.width
        }
    }, n.prototype.getViewportAdjustedDelta = function(e, t, n, i) {
        var r = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return r;
        var o = this.options.viewport && this.options.viewport.padding || 0,
            a = this.getPosition(this.$viewport);
        if (/right|left/.test(e)) {
            var s = t.top - o - a.scroll,
                l = t.top + o - a.scroll + i;
            s < a.top ? r.top = a.top - s : l > a.top + a.height && (r.top = a.top + a.height - l)
        } else {
            var c = t.left - o,
                d = t.left + o + n;
            c < a.left ? r.left = a.left - c : d > a.right && (r.left = a.left + a.width - d)
        }
        return r
    }, n.prototype.getTitle = function() {
        var e, t = this.$element,
            n = this.options;
        return e = t.attr("data-original-title") || ("function" == typeof n.title ? n.title.call(t[0]) : n.title)
    }, n.prototype.getUID = function(e) {
        do e += ~~(1e6 * Math.random()); while (document.getElementById(e));
        return e
    }, n.prototype.tip = function() {
        if (!this.$tip && (this.$tip = e(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }, n.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, n.prototype.enable = function() {
        this.enabled = !0
    }, n.prototype.disable = function() {
        this.enabled = !1
    }, n.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, n.prototype.toggle = function(t) {
        var n = this;
        t && (n = e(t.currentTarget).data("bs." + this.type), n || (n = new this.constructor(t.currentTarget, this.getDelegateOptions()), e(t.currentTarget).data("bs." + this.type, n))), t ? (n.inState.click = !n.inState.click, n.isInStateTrue() ? n.enter(n) : n.leave(n)) : n.tip().hasClass("in") ? n.leave(n) : n.enter(n)
    }, n.prototype.destroy = function() {
        var e = this;
        clearTimeout(this.timeout), this.hide(function() {
            e.$element.off("." + e.type).removeData("bs." + e.type), e.$tip && e.$tip.detach(), e.$tip = null, e.$arrow = null, e.$viewport = null, e.$element = null
        })
    };
    var i = e.fn.tooltip;
    e.fn.tooltip = t, e.fn.tooltip.Constructor = n, e.fn.tooltip.noConflict = function() {
        return e.fn.tooltip = i, this
    }
}(jQuery), + function(e) {
    "use strict";

    function t(t) {
        return this.each(function() {
            var i = e(this),
                r = i.data("bs.popover"),
                o = "object" == typeof t && t;
            !r && /destroy|hide/.test(t) || (r || i.data("bs.popover", r = new n(this, o)), "string" == typeof t && r[t]())
        })
    }
    var n = function(e, t) {
        this.init("popover", e, t)
    };
    if (!e.fn.tooltip) throw new Error("Popover requires tooltip.pt_js");
    n.VERSION = "3.3.7", n.DEFAULTS = e.extend({}, e.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), n.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype), n.prototype.constructor = n, n.prototype.getDefaults = function() {
        return n.DEFAULTS
    }, n.prototype.setContent = function() {
        var e = this.tip(),
            t = this.getTitle(),
            n = this.getContent();
        e.find(".popover-title")[this.options.html ? "html" : "text"](t), e.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof n ? "html" : "append" : "text"](n), e.removeClass("fade top bottom left right in"), e.find(".popover-title").html() || e.find(".popover-title").hide()
    }, n.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, n.prototype.getContent = function() {
        var e = this.$element,
            t = this.options;
        return e.attr("data-content") || ("function" == typeof t.content ? t.content.call(e[0]) : t.content)
    }, n.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var i = e.fn.popover;
    e.fn.popover = t, e.fn.popover.Constructor = n, e.fn.popover.noConflict = function() {
        return e.fn.popover = i, this
    }
}(jQuery), + function(e) {
    "use strict";

    function t(n, i) {
        this.$body = e(document.body), this.$scrollElement = e(e(n).is(document.body) ? window : n), this.options = e.extend({}, t.DEFAULTS, i), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", e.proxy(this.process, this)), this.refresh(), this.process()
    }

    function n(n) {
        return this.each(function() {
            var i = e(this),
                r = i.data("bs.scrollspy"),
                o = "object" == typeof n && n;
            r || i.data("bs.scrollspy", r = new t(this, o)), "string" == typeof n && r[n]()
        })
    }
    t.VERSION = "3.3.7", t.DEFAULTS = {
        offset: 10
    }, t.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, t.prototype.refresh = function() {
        var t = this,
            n = "offset",
            i = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), e.isWindow(this.$scrollElement[0]) || (n = "position", i = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
            var t = e(this),
                r = t.data("target") || t.attr("href"),
                o = /^#./.test(r) && e(r);
            return o && o.length && o.is(":visible") && [
                [o[n]().top + i, r]
            ] || null
        }).sort(function(e, t) {
            return e[0] - t[0]
        }).each(function() {
            t.offsets.push(this[0]), t.targets.push(this[1])
        })
    }, t.prototype.process = function() {
        var e, t = this.$scrollElement.scrollTop() + this.options.offset,
            n = this.getScrollHeight(),
            i = this.options.offset + n - this.$scrollElement.height(),
            r = this.offsets,
            o = this.targets,
            a = this.activeTarget;
        if (this.scrollHeight != n && this.refresh(), t >= i) return a != (e = o[o.length - 1]) && this.activate(e);
        if (a && t < r[0]) return this.activeTarget = null, this.clear();
        for (e = r.length; e--;) a != o[e] && t >= r[e] && (void 0 === r[e + 1] || t < r[e + 1]) && this.activate(o[e])
    }, t.prototype.activate = function(t) {
        this.activeTarget = t, this.clear();
        var n = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]',
            i = e(n).parents("li").addClass("active");
        i.parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("active")), i.trigger("activate.bs.scrollspy")
    }, t.prototype.clear = function() {
        e(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var i = e.fn.scrollspy;
    e.fn.scrollspy = n, e.fn.scrollspy.Constructor = t, e.fn.scrollspy.noConflict = function() {
        return e.fn.scrollspy = i, this
    }, e(window).on("load.bs.scrollspy.data-api", function() {
        e('[data-spy="scroll"]').each(function() {
            var t = e(this);
            n.call(t, t.data())
        })
    })
}(jQuery), + function(e) {
    "use strict";

    function t(t) {
        return this.each(function() {
            var i = e(this),
                r = i.data("bs.tab");
            r || i.data("bs.tab", r = new n(this)), "string" == typeof t && r[t]()
        })
    }
    var n = function(t) {
        this.element = e(t)
    };
    n.VERSION = "3.3.7", n.TRANSITION_DURATION = 150, n.prototype.show = function() {
        var t = this.element,
            n = t.closest("ul:not(.dropdown-menu)"),
            i = t.data("target");
        if (i || (i = t.attr("href"), i = i && i.replace(/.*(?=#[^\s]*$)/, "")), !t.parent("li").hasClass("active")) {
            var r = n.find(".active:last a"),
                o = e.Event("hide.bs.tab", {
                    relatedTarget: t[0]
                }),
                a = e.Event("show.bs.tab", {
                    relatedTarget: r[0]
                });
            if (r.trigger(o), t.trigger(a), !a.isDefaultPrevented() && !o.isDefaultPrevented()) {
                var s = e(i);
                this.activate(t.closest("li"), n), this.activate(s, s.parent(), function() {
                    r.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: t[0]
                    }), t.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: r[0]
                    })
                })
            }
        }
    }, n.prototype.activate = function(t, i, r) {
        function o() {
            a.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), t.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), s ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"), t.parent(".dropdown-menu").length && t.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), r && r()
        }
        var a = i.find("> .active"),
            s = r && e.support.transition && (a.length && a.hasClass("fade") || !!i.find("> .fade").length);
        a.length && s ? a.one("bsTransitionEnd", o).emulateTransitionEnd(n.TRANSITION_DURATION) : o(), a.removeClass("in")
    };
    var i = e.fn.tab;
    e.fn.tab = t, e.fn.tab.Constructor = n, e.fn.tab.noConflict = function() {
        return e.fn.tab = i, this
    };
    var r = function(n) {
        n.preventDefault(), t.call(e(this), "show")
    };
    e(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', r).on("click.bs.tab.data-api", '[data-toggle="pill"]', r)
}(jQuery), + function(e) {
    "use strict";

    function t(t) {
        return this.each(function() {
            var i = e(this),
                r = i.data("bs.affix"),
                o = "object" == typeof t && t;
            r || i.data("bs.affix", r = new n(this, o)), "string" == typeof t && r[t]()
        })
    }
    var n = function(t, i) {
        this.options = e.extend({}, n.DEFAULTS, i), this.$target = e(this.options.target).on("scroll.bs.affix.data-api", e.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", e.proxy(this.checkPositionWithEventLoop, this)), this.$element = e(t), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    n.VERSION = "3.3.7", n.RESET = "affix affix-top affix-bottom", n.DEFAULTS = {
        offset: 0,
        target: window
    }, n.prototype.getState = function(e, t, n, i) {
        var r = this.$target.scrollTop(),
            o = this.$element.offset(),
            a = this.$target.height();
        if (null != n && "top" == this.affixed) return r < n && "top";
        if ("bottom" == this.affixed) return null != n ? !(r + this.unpin <= o.top) && "bottom" : !(r + a <= e - i) && "bottom";
        var s = null == this.affixed,
            l = s ? r : o.top,
            c = s ? a : t;
        return null != n && r <= n ? "top" : null != i && l + c >= e - i && "bottom"
    }, n.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(n.RESET).addClass("affix");
        var e = this.$target.scrollTop(),
            t = this.$element.offset();
        return this.pinnedOffset = t.top - e
    }, n.prototype.checkPositionWithEventLoop = function() {
        setTimeout(e.proxy(this.checkPosition, this), 1)
    }, n.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var t = this.$element.height(),
                i = this.options.offset,
                r = i.top,
                o = i.bottom,
                a = Math.max(e(document).height(), e(document.body).height());
            "object" != typeof i && (o = r = i), "function" == typeof r && (r = i.top(this.$element)), "function" == typeof o && (o = i.bottom(this.$element));
            var s = this.getState(a, t, r, o);
            if (this.affixed != s) {
                null != this.unpin && this.$element.css("top", "");
                var l = "affix" + (s ? "-" + s : ""),
                    c = e.Event(l + ".bs.affix");
                if (this.$element.trigger(c), c.isDefaultPrevented()) return;
                this.affixed = s, this.unpin = "bottom" == s ? this.getPinnedOffset() : null, this.$element.removeClass(n.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == s && this.$element.offset({
                top: a - t - o
            })
        }
    };
    var i = e.fn.affix;
    e.fn.affix = t, e.fn.affix.Constructor = n, e.fn.affix.noConflict = function() {
        return e.fn.affix = i, this
    }, e(window).on("load", function() {
        e('[data-spy="affix"]').each(function() {
            var n = e(this),
                i = n.data();
            i.offset = i.offset || {}, null != i.offsetBottom && (i.offset.bottom = i.offsetBottom), null != i.offsetTop && (i.offset.top = i.offsetTop), t.call(n, i)
        })
    })
}(jQuery),
function(e, t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? t(require("jquery")) : (t(e.jquery), e.bootstrapSwitch = {
        exports: {}
    }.exports)
}(this, function(e) {
    "use strict";

    function t(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function n(e, t) {
        var n = e.state,
            i = e.size,
            r = e.disabled,
            o = e.readonly,
            a = e.indeterminate,
            s = e.inverse;
        return [n ? "on" : "off", i, r ? "disabled" : void 0, o ? "readonly" : void 0, a ? "indeterminate" : void 0, s ? "inverse" : void 0, t ? "id-" + t : void 0].filter(function(e) {
            return null == e
        })
    }

    function i() {
        return {
            state: this.$element.is(":checked"),
            size: this.$element.data("size"),
            animate: this.$element.data("animate"),
            disabled: this.$element.is(":disabled"),
            readonly: this.$element.is("[readonly]"),
            indeterminate: this.$element.data("indeterminate"),
            inverse: this.$element.data("inverse"),
            radioAllOff: this.$element.data("radio-all-off"),
            onColor: this.$element.data("on-color"),
            offColor: this.$element.data("off-color"),
            onText: this.$element.data("on-text"),
            offText: this.$element.data("off-text"),
            labelText: this.$element.data("label-text"),
            handleWidth: this.$element.data("handle-width"),
            labelWidth: this.$element.data("label-width"),
            baseClass: this.$element.data("base-class"),
            wrapperClass: this.$element.data("wrapper-class")
        }
    }

    function r() {
        var e = this,
            t = this.$on.add(this.$off).add(this.$label).css("width", ""),
            n = "auto" === this.options.handleWidth ? Math.round(Math.max(this.$on.width(), this.$off.width())) : this.options.handleWidth;
        return t.width(n), this.$label.width(function(t, i) {
            return "auto" === e.options.labelWidth ? i < n ? n : i : e.options.labelWidth
        }), this.privateHandleWidth = this.$on.outerWidth(), this.privateLabelWidth = this.$label.outerWidth(), this.$container.width(2 * this.privateHandleWidth + this.privateLabelWidth), this.$wrapper.width(this.privateHandleWidth + this.privateLabelWidth)
    }

    function o() {
        var e = this,
            t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.ope;
        this.$container.css("margin-left", function() {
            var n = [0, "-" + e.privateHandleWidth + "px"];
            return e.options.indeterminate ? "-" + e.privateHandleWidth / 2 + "px" : t ? e.options.inverse ? n[1] : n[0] : e.options.inverse ? n[0] : n[1]
        })
    }

    function a(e) {
        return this.options.baseClass + "-" + e
    }

    function s() {
        var e = this,
            t = function() {
                e.setPrevOptions(), r.call(e), o.call(e), setTimeout(function() {
                    return e.options.animate && e.$wrapper.addClass(a.call(e, "animate"))
                }, 50)
            };
        if (this.$wrapper.is(":visible")) return void t();
        var n = window.setInterval(function() {
            return e.$wrapper.is(":visible") && (t() || !0) && window.clearInterval(n)
        }, 50)
    }

    function l() {
        var e = this;
        return this.$element.on({
            "setPreviousOptions.bootstrapSwitch": function() {
                return e.setPrevOptions()
            },
            "previousState.bootstrapSwitch": function() {
                e.options = e.prevOptions, e.options.indeterminate && e.$wrapper.addClass(a.call(e, "indeterminate")), e.$element.prop("checked", e.options.state).trigger("change.bootstrapSwitch", !0)
            },
            "change.bootstrapSwitch": function(t, n) {
                t.preventDefault(), t.stopImmediatePropagation();
                var i = e.$element.is(":checked");
                o.call(e, i), i === e.options.state || (e.options.state = i, e.$wrapper.toggleClass(a.call(e, "off")).toggleClass(a.call(e, "on")), !n && (e.$element.is(":radio") && v('[name="' + e.$element.attr("name") + '"]').not(e.$element).prop("checked", !1).trigger("change.bootstrapSwitch", !0), e.$element.trigger("switchChange.bootstrapSwitch", [i])))
            },
            "focus.bootstrapSwitch": function(t) {
                t.preventDefault(), e.$wrapper.addClass(a.call(e, "focused"))
            },
            "blur.bootstrapSwitch": function(t) {
                t.preventDefault(), e.$wrapper.removeClass(a.call(e, "focused"))
            },
            "keydown.bootstrapSwitch": function(t) {
                !t.which || e.options.disabled || e.options.readonly || (37 === t.which || 39 === t.which) && (t.preventDefault(), t.stopImmediatePropagation(), e.state(39 === t.which))
            }
        })
    }

    function c() {
        var e = this;
        return this.$on.on("click.bootstrapSwitch", function(t) {
            return t.preventDefault(), t.stopPropagation(), e.state(!1), e.$element.trigger("focus.bootstrapSwitch")
        }), this.$off.on("click.bootstrapSwitch", function(t) {
            return t.preventDefault(),
                t.stopPropagation(), e.state(!0), e.$element.trigger("focus.bootstrapSwitch")
        })
    }

    function d() {
        var e = this,
            t = void 0,
            n = void 0;
        this.$label.on({
            click: function(e) {
                e.stopPropagation()
            },
            "mousedown.bootstrapSwitch touchstart.bootstrapSwitch": function(n) {
                t || e.options.disabled || e.options.readonly || (n.preventDefault(), n.stopPropagation(), t = (n.pageX || n.originalEvent.touches[0].pageX) - parseInt(e.$container.css("margin-left"), 10), e.options.animate && e.$wrapper.removeClass(a.call(e, "animate")), e.$element.trigger("focus.bootstrapSwitch"))
            },
            "mousemove.bootstrapSwitch touchmove.bootstrapSwitch": function(i) {
                if (null != t) {
                    var r = (i.pageX || i.originalEvent.touches[0].pageX) - t;
                    i.preventDefault(), r < -e.privateHandleWidth || 0 < r || (n = r, e.$container.css("margin-left", n + "px"))
                }
            },
            "mouseup.bootstrapSwitch touchend.bootstrapSwitch": function(i) {
                if (t) {
                    if (i.preventDefault(), e.options.animate && e.$wrapper.addClass(a.call(e, "animate")), n) {
                        var r = n > -(e.privateHandleWidth / 2);
                        n = !1, e.state(e.options.inverse ? !r : r)
                    } else e.state(!e.options.state);
                    t = !1
                }
            },
            "mouseleave.bootstrapSwitch": function() {
                e.$label.trigger("mouseup.bootstrapSwitch")
            }
        })
    }

    function u() {
        var e = this,
            t = this.$element.closest("label");
        t.on("click", function(n) {
            n.preventDefault(), n.stopImmediatePropagation(), n.target === t[0] && e.toggleState()
        })
    }

    function p() {
        function e() {
            return v(this).data("bootstrap-switch")
        }

        function t() {
            return v(this).bootstrapSwitch("state", this.checked)
        }
        var n = this.$element.closest("form");
        n.data("bootstrap-switch") || n.on("reset.bootstrapSwitch", function() {
            window.setTimeout(function() {
                n.find("input").filter(e).each(t)
            }, 1)
        }).data("bootstrap-switch", !0)
    }

    function f(e) {
        var t = this;
        return v.isArray(e) ? e.map(function(e) {
            return a.call(t, e)
        }) : [a.call(this, e)]
    }
    var h = function(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }(e),
        m = Object.assign || function(e) {
            for (var t, n = 1; n < arguments.length; n++)
                for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e
        },
        g = function() {
            function e(e, t) {
                for (var n, i = 0; i < t.length; i++) n = t[i], n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
            return function(t, n, i) {
                return n && e(t.prototype, n), i && e(t, i), t
            }
        }(),
        v = h["default"] || window.jQuery || window.$,
        y = function() {
            function e(r) {
                var o = this,
                    h = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
                t(this, e), this.$element = v(r), this.options = v.extend({}, v.fn.bootstrapSwitch.defaults, i.call(this), h), this.prevOptions = {}, this.$wrapper = v("<div>", {
                    "class": function() {
                        return n(o.options, o.$element.attr("id")).map(function(e) {
                            return a.call(o, e)
                        }).concat([o.options.baseClass], f.call(o, o.options.wrapperClass)).join(" ")
                    }
                }), this.$container = v("<div>", {
                    "class": a.call(this, "container")
                }), this.$on = v("<span>", {
                    html: this.options.onText,
                    "class": a.call(this, "handle-on") + " " + a.call(this, this.options.onColor)
                }), this.$off = v("<span>", {
                    html: this.options.offText,
                    "class": a.call(this, "handle-off") + " " + a.call(this, this.options.offColor)
                }), this.$label = v("<span>", {
                    html: this.options.labelText,
                    "class": a.call(this, "label")
                }), this.$element.on("init.bootstrapSwitch", function() {
                    return o.options.onInit(r)
                }), this.$element.on("switchChange.bootstrapSwitch", function() {
                    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    !1 === o.options.onSwitchChange.apply(r, t) && (o.$element.is(":radio") ? v('[name="' + o.$element.attr("name") + '"]').trigger("previousState.bootstrapSwitch", !0) : o.$element.trigger("previousState.bootstrapSwitch", !0))
                }), this.$container = this.$element.wrap(this.$container).parent(), this.$wrapper = this.$container.wrap(this.$wrapper).parent(), this.$element.before(this.options.inverse ? this.$off : this.$on).before(this.$label).before(this.options.inverse ? this.$on : this.$off), this.options.indeterminate && this.$element.prop("indeterminate", !0), s.call(this), l.call(this), c.call(this), d.call(this), p.call(this), u.call(this), this.$element.trigger("init.bootstrapSwitch", this.options.state)
            }
            return g(e, [{
                key: "setPrevOptions",
                value: function() {
                    this.prevOptions = m({}, this.options)
                }
            }, {
                key: "state",
                value: function(e, t) {
                    return "undefined" == typeof e ? this.options.state : this.options.disabled || this.options.readonly || this.options.state && !this.options.radioAllOff && this.$element.is(":radio") ? this.$element : (this.$element.is(":radio") ? v('[name="' + this.$element.attr("name") + '"]').trigger("setPreviousOptions.bootstrapSwitch") : this.$element.trigger("setPreviousOptions.bootstrapSwitch"), this.options.indeterminate && this.indeterminate(!1), this.$element.prop("checked", !!e).trigger("change.bootstrapSwitch", t), this.$element)
                }
            }, {
                key: "toggleState",
                value: function(e) {
                    return this.options.disabled || this.options.readonly ? this.$element : this.options.indeterminate ? (this.indeterminate(!1), this.state(!0)) : this.$element.prop("checked", !this.options.state).trigger("change.bootstrapSwitch", e)
                }
            }, {
                key: "size",
                value: function(e) {
                    return "undefined" == typeof e ? this.options.size : (null != this.options.size && this.$wrapper.removeClass(a.call(this, this.options.size)), e && this.$wrapper.addClass(a.call(this, e)), r.call(this), o.call(this), this.options.size = e, this.$element)
                }
            }, {
                key: "animate",
                value: function(e) {
                    return "undefined" == typeof e ? this.options.animate : this.options.animate === !!e ? this.$element : this.toggleAnimate()
                }
            }, {
                key: "toggleAnimate",
                value: function() {
                    return this.options.animate = !this.options.animate, this.$wrapper.toggleClass(a.call(this, "animate")), this.$element
                }
            }, {
                key: "disabled",
                value: function(e) {
                    return "undefined" == typeof e ? this.options.disabled : this.options.disabled === !!e ? this.$element : this.toggleDisabled()
                }
            }, {
                key: "toggleDisabled",
                value: function() {
                    return this.options.disabled = !this.options.disabled, this.$element.prop("disabled", this.options.disabled), this.$wrapper.toggleClass(a.call(this, "disabled")), this.$element
                }
            }, {
                key: "readonly",
                value: function(e) {
                    return "undefined" == typeof e ? this.options.readonly : this.options.readonly === !!e ? this.$element : this.toggleReadonly()
                }
            }, {
                key: "toggleReadonly",
                value: function() {
                    return this.options.readonly = !this.options.readonly, this.$element.prop("readonly", this.options.readonly), this.$wrapper.toggleClass(a.call(this, "readonly")), this.$element
                }
            }, {
                key: "indeterminate",
                value: function(e) {
                    return "undefined" == typeof e ? this.options.indeterminate : this.options.indeterminate === !!e ? this.$element : this.toggleIndeterminate()
                }
            }, {
                key: "toggleIndeterminate",
                value: function() {
                    return this.options.indeterminate = !this.options.indeterminate, this.$element.prop("indeterminate", this.options.indeterminate), this.$wrapper.toggleClass(a.call(this, "indeterminate")), o.call(this), this.$element
                }
            }, {
                key: "inverse",
                value: function(e) {
                    return "undefined" == typeof e ? this.options.inverse : this.options.inverse === !!e ? this.$element : this.toggleInverse()
                }
            }, {
                key: "toggleInverse",
                value: function() {
                    this.$wrapper.toggleClass(a.call(this, "inverse"));
                    var e = this.$on.clone(!0),
                        t = this.$off.clone(!0);
                    return this.$on.replaceWith(t), this.$off.replaceWith(e), this.$on = t, this.$off = e, this.options.inverse = !this.options.inverse, this.$element
                }
            }, {
                key: "onColor",
                value: function(e) {
                    return "undefined" == typeof e ? this.options.onColor : (this.options.onColor && this.$on.removeClass(a.call(this, this.options.onColor)), this.$on.addClass(a.call(this, e)), this.options.onColor = e, this.$element)
                }
            }, {
                key: "offColor",
                value: function(e) {
                    return "undefined" == typeof e ? this.options.offColor : (this.options.offColor && this.$off.removeClass(a.call(this, this.options.offColor)), this.$off.addClass(a.call(this, e)), this.options.offColor = e, this.$element)
                }
            }, {
                key: "onText",
                value: function(e) {
                    return "undefined" == typeof e ? this.options.onText : (this.$on.html(e), r.call(this), o.call(this), this.options.onText = e, this.$element)
                }
            }, {
                key: "offText",
                value: function(e) {
                    return "undefined" == typeof e ? this.options.offText : (this.$off.html(e), r.call(this), o.call(this), this.options.offText = e, this.$element)
                }
            }, {
                key: "labelText",
                value: function(e) {
                    return "undefined" == typeof e ? this.options.labelText : (this.$label.html(e), r.call(this), this.options.labelText = e, this.$element)
                }
            }, {
                key: "handleWidth",
                value: function(e) {
                    return "undefined" == typeof e ? this.options.handleWidth : (this.options.handleWidth = e, r.call(this), o.call(this), this.$element)
                }
            }, {
                key: "labelWidth",
                value: function(e) {
                    return "undefined" == typeof e ? this.options.labelWidth : (this.options.labelWidth = e, r.call(this), o.call(this), this.$element)
                }
            }, {
                key: "baseClass",
                value: function() {
                    return this.options.baseClass
                }
            }, {
                key: "wrapperClass",
                value: function(e) {
                    if ("undefined" == typeof e) return this.options.wrapperClass;
                    var t = e || v.fn.bootstrapSwitch.defaults.wrapperClass;
                    return this.$wrapper.removeClass(f.call(this, this.options.wrapperClass).join(" ")), this.$wrapper.addClass(f.call(this, t).join(" ")), this.options.wrapperClass = t, this.$element
                }
            }, {
                key: "radioAllOff",
                value: function(e) {
                    if ("undefined" == typeof e) return this.options.radioAllOff;
                    var t = !!e;
                    return this.options.radioAllOff === t ? this.$element : (this.options.radioAllOff = t, this.$element)
                }
            }, {
                key: "onInit",
                value: function(e) {
                    return "undefined" == typeof e ? this.options.onInit : (this.options.onInit = e || v.fn.bootstrapSwitch.defaults.onInit, this.$element)
                }
            }, {
                key: "onSwitchChange",
                value: function(e) {
                    return "undefined" == typeof e ? this.options.onSwitchChange : (this.options.onSwitchChange = e || v.fn.bootstrapSwitch.defaults.onSwitchChange, this.$element)
                }
            }, {
                key: "destroy",
                value: function() {
                    var e = this.$element.closest("form");
                    return e.length && e.off("reset.bootstrapSwitch").removeData("bootstrap-switch"), this.$container.children().not(this.$element).remove(), this.$element.unwrap().unwrap().off(".bootstrapSwitch").removeData("bootstrap-switch"), this.$element
                }
            }]), e
        }();
    v.fn.bootstrapSwitch = function(e) {
        for (var t = arguments.length, n = Array(1 < t ? t - 1 : 0), i = 1; i < t; i++) n[i - 1] = arguments[i];
        return Array.prototype.reduce.call(this, function(t, i) {
            var r = v(i),
                o = r.data("bootstrap-switch"),
                a = o || new y(i, e);
            return o || r.data("bootstrap-switch", a), "string" == typeof e ? a[e].apply(a, n) : t
        }, this)
    }, v.fn.bootstrapSwitch.Constructor = y, v.fn.bootstrapSwitch.defaults = {
        state: !0,
        size: null,
        animate: !0,
        disabled: !1,
        readonly: !1,
        indeterminate: !1,
        inverse: !1,
        radioAllOff: !1,
        onColor: "primary",
        offColor: "default",
        onText: "ON",
        offText: "OFF",
        labelText: "&nbsp",
        handleWidth: "auto",
        labelWidth: "auto",
        baseClass: "bootstrap-switch",
        wrapperClass: "wrapper",
        onInit: function() {},
        onSwitchChange: function() {}
    }
}), ! function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof module && module.exports ? module.exports = e : e(jQuery, window, document)
}(function(e) {
    ! function(t) {
        var n = "function" == typeof define && define.amd,
            i = "undefined" != typeof module && module.exports,
            r = "https:" == document.location.protocol ? "https:" : "http:",
            o = "cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";
        n || (i ? require("jquery-mousewheel")(e) : e.event.special.mousewheel || e("head").append(decodeURI("%3Cscript src=" + r + "//" + o + "%3E%3C/script%3E"))), t()
    }(function() {
        var t, n = "mCustomScrollbar",
            i = "mCS",
            r = ".mCustomScrollbar",
            o = {
                setTop: 0,
                setLeft: 0,
                axis: "y",
                scrollbarPosition: "inside",
                scrollInertia: 950,
                autoDraggerLength: !0,
                alwaysShowScrollbar: 0,
                snapOffset: 0,
                mouseWheel: {
                    enable: !0,
                    scrollAmount: "auto",
                    axis: "y",
                    deltaFactor: "auto",
                    disableOver: ["select", "option", "keygen", "datalist", "textarea"]
                },
                scrollButtons: {
                    scrollType: "stepless",
                    scrollAmount: "auto"
                },
                keyboard: {
                    enable: !0,
                    scrollType: "stepless",
                    scrollAmount: "auto"
                },
                contentTouchScroll: 25,
                documentTouchScroll: !0,
                advanced: {
                    autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
                    updateOnContentResize: !0,
                    updateOnImageLoad: "auto",
                    autoUpdateTimeout: 60
                },
                theme: "light",
                callbacks: {
                    onTotalScrollOffset: 0,
                    onTotalScrollBackOffset: 0,
                    alwaysTriggerOffsets: !0
                }
            },
            a = 0,
            s = {},
            l = window.attachEvent && !window.addEventListener ? 1 : 0,
            c = !1,
            d = ["mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag", "mCS_img_loaded", "mCS_disabled", "mCS_destroyed", "mCS_no_scrollbar", "mCS-autoHide", "mCS-dir-rtl", "mCS_no_scrollbar_y", "mCS_no_scrollbar_x", "mCS_y_hidden", "mCS_x_hidden", "mCSB_draggerContainer", "mCSB_buttonUp", "mCSB_buttonDown", "mCSB_buttonLeft", "mCSB_buttonRight"],
            u = {
                init: function(t) {
                    var t = e.extend(!0, {}, o, t),
                        n = p.call(this);
                    if (t.live) {
                        var l = t.liveSelector || this.selector || r,
                            c = e(l);
                        if ("off" === t.live) return void h(l);
                        s[l] = setTimeout(function() {
                            c.mCustomScrollbar(t), "once" === t.live && c.length && h(l)
                        }, 500)
                    } else h(l);
                    return t.setWidth = t.set_width ? t.set_width : t.setWidth, t.setHeight = t.set_height ? t.set_height : t.setHeight, t.axis = t.horizontalScroll ? "x" : m(t.axis), t.scrollInertia = t.scrollInertia > 0 && t.scrollInertia < 17 ? 17 : t.scrollInertia, "object" != typeof t.mouseWheel && 1 == t.mouseWheel && (t.mouseWheel = {
                        enable: !0,
                        scrollAmount: "auto",
                        axis: "y",
                        preventDefault: !1,
                        deltaFactor: "auto",
                        normalizeDelta: !1,
                        invert: !1
                    }), t.mouseWheel.scrollAmount = t.mouseWheelPixels ? t.mouseWheelPixels : t.mouseWheel.scrollAmount, t.mouseWheel.normalizeDelta = t.advanced.normalizeMouseWheelDelta ? t.advanced.normalizeMouseWheelDelta : t.mouseWheel.normalizeDelta, t.scrollButtons.scrollType = g(t.scrollButtons.scrollType), f(t), e(n).each(function() {
                        var n = e(this);
                        if (!n.data(i)) {
                            n.data(i, {
                                idx: ++a,
                                opt: t,
                                scrollRatio: {
                                    y: null,
                                    x: null
                                },
                                overflowed: null,
                                contentReset: {
                                    y: null,
                                    x: null
                                },
                                bindEvents: !1,
                                tweenRunning: !1,
                                sequential: {},
                                langDir: n.css("direction"),
                                cbOffsets: null,
                                trigger: null,
                                poll: {
                                    size: {
                                        o: 0,
                                        n: 0
                                    },
                                    img: {
                                        o: 0,
                                        n: 0
                                    },
                                    change: {
                                        o: 0,
                                        n: 0
                                    }
                                }
                            });
                            var r = n.data(i),
                                o = r.opt,
                                s = n.data("mcs-axis"),
                                l = n.data("mcs-scrollbar-position"),
                                c = n.data("mcs-theme");
                            s && (o.axis = s), l && (o.scrollbarPosition = l), c && (o.theme = c, f(o)), v.call(this), r && o.callbacks.onCreate && "function" == typeof o.callbacks.onCreate && o.callbacks.onCreate.call(this), e("#mCSB_" + r.idx + "_container img:not(." + d[2] + ")").addClass(d[2]), u.update.call(null, n)
                        }
                    })
                },
                update: function(t, n) {
                    var r = t || p.call(this);
                    return e(r).each(function() {
                        var t = e(this);
                        if (t.data(i)) {
                            var r = t.data(i),
                                o = r.opt,
                                a = e("#mCSB_" + r.idx + "_container"),
                                s = e("#mCSB_" + r.idx),
                                l = [e("#mCSB_" + r.idx + "_dragger_vertical"), e("#mCSB_" + r.idx + "_dragger_horizontal")];
                            if (!a.length) return;
                            r.tweenRunning && G(t), n && r && o.callbacks.onBeforeUpdate && "function" == typeof o.callbacks.onBeforeUpdate && o.callbacks.onBeforeUpdate.call(this), t.hasClass(d[3]) && t.removeClass(d[3]), t.hasClass(d[4]) && t.removeClass(d[4]), s.css("max-height", "none"), s.height() !== t.height() && s.css("max-height", t.height()), b.call(this), "y" === o.axis || o.advanced.autoExpandHorizontalScroll || a.css("width", y(a)), r.overflowed = T.call(this), I.call(this), o.autoDraggerLength && w.call(this), C.call(this), k.call(this);
                            var c = [Math.abs(a[0].offsetTop), Math.abs(a[0].offsetLeft)];
                            "x" !== o.axis && (r.overflowed[0] ? l[0].height() > l[0].parent().height() ? _.call(this) : (X(t, c[0].toString(), {
                                dir: "y",
                                dur: 0,
                                overwrite: "none"
                            }), r.contentReset.y = null) : (_.call(this), "y" === o.axis ? S.call(this) : "yx" === o.axis && r.overflowed[1] && X(t, c[1].toString(), {
                                dir: "x",
                                dur: 0,
                                overwrite: "none"
                            }))), "y" !== o.axis && (r.overflowed[1] ? l[1].width() > l[1].parent().width() ? _.call(this) : (X(t, c[1].toString(), {
                                dir: "x",
                                dur: 0,
                                overwrite: "none"
                            }), r.contentReset.x = null) : (_.call(this), "x" === o.axis ? S.call(this) : "yx" === o.axis && r.overflowed[0] && X(t, c[0].toString(), {
                                dir: "y",
                                dur: 0,
                                overwrite: "none"
                            }))), n && r && (2 === n && o.callbacks.onImageLoad && "function" == typeof o.callbacks.onImageLoad ? o.callbacks.onImageLoad.call(this) : 3 === n && o.callbacks.onSelectorChange && "function" == typeof o.callbacks.onSelectorChange ? o.callbacks.onSelectorChange.call(this) : o.callbacks.onUpdate && "function" == typeof o.callbacks.onUpdate && o.callbacks.onUpdate.call(this)), V.call(this)
                        }
                    })
                },
                scrollTo: function(t, n) {
                    if ("undefined" != typeof t && null != t) {
                        var r = p.call(this);
                        return e(r).each(function() {
                            var r = e(this);
                            if (r.data(i)) {
                                var o = r.data(i),
                                    a = o.opt,
                                    s = {
                                        trigger: "external",
                                        scrollInertia: a.scrollInertia,
                                        scrollEasing: "mcsEaseInOut",
                                        moveDragger: !1,
                                        timeout: 60,
                                        callbacks: !0,
                                        onStart: !0,
                                        onUpdate: !0,
                                        onComplete: !0
                                    },
                                    l = e.extend(!0, {}, s, n),
                                    c = H.call(this, t),
                                    d = l.scrollInertia > 0 && l.scrollInertia < 17 ? 17 : l.scrollInertia;
                                c[0] = z.call(this, c[0], "y"), c[1] = z.call(this, c[1], "x"), l.moveDragger && (c[0] *= o.scrollRatio.y, c[1] *= o.scrollRatio.x), l.dur = re() ? 0 : d, setTimeout(function() {
                                    null !== c[0] && "undefined" != typeof c[0] && "x" !== a.axis && o.overflowed[0] && (l.dir = "y", l.overwrite = "all", X(r, c[0].toString(), l)), null !== c[1] && "undefined" != typeof c[1] && "y" !== a.axis && o.overflowed[1] && (l.dir = "x", l.overwrite = "none", X(r, c[1].toString(), l))
                                }, l.timeout)
                            }
                        })
                    }
                },
                stop: function() {
                    var t = p.call(this);
                    return e(t).each(function() {
                        var t = e(this);
                        t.data(i) && G(t)
                    })
                },
                disable: function(t) {
                    var n = p.call(this);
                    return e(n).each(function() {
                        var n = e(this);
                        n.data(i) && (n.data(i), V.call(this, "remove"), S.call(this), t && _.call(this), I.call(this, !0), n.addClass(d[3]))
                    })
                },
                destroy: function() {
                    var t = p.call(this);
                    return e(t).each(function() {
                        var r = e(this);
                        if (r.data(i)) {
                            var o = r.data(i),
                                a = o.opt,
                                s = e("#mCSB_" + o.idx),
                                l = e("#mCSB_" + o.idx + "_container"),
                                c = e(".mCSB_" + o.idx + "_scrollbar");
                            a.live && h(a.liveSelector || e(t).selector), V.call(this, "remove"), S.call(this), _.call(this), r.removeData(i), Z(this, "mcs"), c.remove(), l.find("img." + d[2]).removeClass(d[2]), s.replaceWith(l.contents()), r.removeClass(n + " _" + i + "_" + o.idx + " " + d[6] + " " + d[7] + " " + d[5] + " " + d[3]).addClass(d[4])
                        }
                    })
                }
            },
            p = function() {
                return "object" != typeof e(this) || e(this).length < 1 ? r : this
            },
            f = function(t) {
                var n = ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"],
                    i = ["rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"],
                    r = ["minimal", "minimal-dark"],
                    o = ["minimal", "minimal-dark"],
                    a = ["minimal", "minimal-dark"];
                t.autoDraggerLength = !(e.inArray(t.theme, n) > -1) && t.autoDraggerLength, t.autoExpandScrollbar = !(e.inArray(t.theme, i) > -1) && t.autoExpandScrollbar, t.scrollButtons.enable = !(e.inArray(t.theme, r) > -1) && t.scrollButtons.enable, t.autoHideScrollbar = e.inArray(t.theme, o) > -1 || t.autoHideScrollbar, t.scrollbarPosition = e.inArray(t.theme, a) > -1 ? "outside" : t.scrollbarPosition
            },
            h = function(e) {
                s[e] && (clearTimeout(s[e]), Z(s, e))
            },
            m = function(e) {
                return "yx" === e || "xy" === e || "auto" === e ? "yx" : "x" === e || "horizontal" === e ? "x" : "y"
            },
            g = function(e) {
                return "stepped" === e || "pixels" === e || "step" === e || "click" === e ? "stepped" : "stepless"
            },
            v = function() {
                var t = e(this),
                    r = t.data(i),
                    o = r.opt,
                    a = o.autoExpandScrollbar ? " " + d[1] + "_expand" : "",
                    s = ["<div id='mCSB_" + r.idx + "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" + r.idx + "_scrollbar mCS-" + o.theme + " mCSB_scrollTools_vertical" + a + "'><div class='" + d[12] + "'><div id='mCSB_" + r.idx + "_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>", "<div id='mCSB_" + r.idx + "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + r.idx + "_scrollbar mCS-" + o.theme + " mCSB_scrollTools_horizontal" + a + "'><div class='" + d[12] + "'><div id='mCSB_" + r.idx + "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
                    l = "yx" === o.axis ? "mCSB_vertical_horizontal" : "x" === o.axis ? "mCSB_horizontal" : "mCSB_vertical",
                    c = "yx" === o.axis ? s[0] + s[1] : "x" === o.axis ? s[1] : s[0],
                    u = "yx" === o.axis ? "<div id='mCSB_" + r.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : "",
                    p = o.autoHideScrollbar ? " " + d[6] : "",
                    f = "x" !== o.axis && "rtl" === r.langDir ? " " + d[7] : "";
                o.setWidth && t.css("width", o.setWidth), o.setHeight && t.css("height", o.setHeight), o.setLeft = "y" !== o.axis && "rtl" === r.langDir ? "989999px" : o.setLeft, t.addClass(n + " _" + i + "_" + r.idx + p + f).wrapInner("<div id='mCSB_" + r.idx + "' class='mCustomScrollBox mCS-" + o.theme + " " + l + "'><div id='mCSB_" + r.idx + "_container' class='mCSB_container' style='position:relative; top:" + o.setTop + "; left:" + o.setLeft + ";' dir='" + r.langDir + "' /></div>");
                var h = e("#mCSB_" + r.idx),
                    m = e("#mCSB_" + r.idx + "_container");
                "y" === o.axis || o.advanced.autoExpandHorizontalScroll || m.css("width", y(m)), "outside" === o.scrollbarPosition ? ("static" === t.css("position") && t.css("position", "relative"), t.css("overflow", "visible"), h.addClass("mCSB_outside").after(c)) : (h.addClass("mCSB_inside").append(c), m.wrap(u)), $.call(this);
                var g = [e("#mCSB_" + r.idx + "_dragger_vertical"), e("#mCSB_" + r.idx + "_dragger_horizontal")];
                g[0].css("min-height", g[0].height()), g[1].css("min-width", g[1].width())
            },
            y = function(t) {
                var n = [t[0].scrollWidth, Math.max.apply(Math, t.children().map(function() {
                        return e(this).outerWidth(!0)
                    }).get())],
                    i = t.parent().width();
                return n[0] > i ? n[0] : n[1] > i ? n[1] : "100%"
            },
            b = function() {
                var t = e(this),
                    n = t.data(i),
                    r = n.opt,
                    o = e("#mCSB_" + n.idx + "_container");
                if (r.advanced.autoExpandHorizontalScroll && "y" !== r.axis) {
                    o.css({
                        width: "auto",
                        "min-width": 0,
                        "overflow-x": "scroll"
                    });
                    var a = Math.ceil(o[0].scrollWidth);
                    3 === r.advanced.autoExpandHorizontalScroll || 2 !== r.advanced.autoExpandHorizontalScroll && a > o.parent().width() ? o.css({
                        width: a,
                        "min-width": "100%",
                        "overflow-x": "inherit"
                    }) : o.css({
                        "overflow-x": "inherit",
                        position: "absolute"
                    }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                        width: Math.ceil(o[0].getBoundingClientRect().right + .4) - Math.floor(o[0].getBoundingClientRect().left),
                        "min-width": "100%",
                        position: "relative"
                    }).unwrap()
                }
            },
            $ = function() {
                var t = e(this),
                    n = t.data(i),
                    r = n.opt,
                    o = e(".mCSB_" + n.idx + "_scrollbar:first"),
                    a = ne(r.scrollButtons.tabindex) ? "tabindex='" + r.scrollButtons.tabindex + "'" : "",
                    s = ["<a href='#' class='" + d[13] + "' " + a + " />", "<a href='#' class='" + d[14] + "' " + a + " />", "<a href='#' class='" + d[15] + "' " + a + " />", "<a href='#' class='" + d[16] + "' " + a + " />"],
                    l = ["x" === r.axis ? s[2] : s[0], "x" === r.axis ? s[3] : s[1], s[2], s[3]];
                r.scrollButtons.enable && o.prepend(l[0]).append(l[1]).next(".mCSB_scrollTools").prepend(l[2]).append(l[3])
            },
            w = function() {
                var t = e(this),
                    n = t.data(i),
                    r = e("#mCSB_" + n.idx),
                    o = e("#mCSB_" + n.idx + "_container"),
                    a = [e("#mCSB_" + n.idx + "_dragger_vertical"), e("#mCSB_" + n.idx + "_dragger_horizontal")],
                    s = [r.height() / o.outerHeight(!1), r.width() / o.outerWidth(!1)],
                    c = [parseInt(a[0].css("min-height")), Math.round(s[0] * a[0].parent().height()), parseInt(a[1].css("min-width")), Math.round(s[1] * a[1].parent().width())],
                    d = l && c[1] < c[0] ? c[0] : c[1],
                    u = l && c[3] < c[2] ? c[2] : c[3];
                a[0].css({
                    height: d,
                    "max-height": a[0].parent().height() - 10
                }).find(".mCSB_dragger_bar").css({
                    "line-height": c[0] + "px"
                }), a[1].css({
                    width: u,
                    "max-width": a[1].parent().width() - 10
                })
            },
            C = function() {
                var t = e(this),
                    n = t.data(i),
                    r = e("#mCSB_" + n.idx),
                    o = e("#mCSB_" + n.idx + "_container"),
                    a = [e("#mCSB_" + n.idx + "_dragger_vertical"), e("#mCSB_" + n.idx + "_dragger_horizontal")],
                    s = [o.outerHeight(!1) - r.height(), o.outerWidth(!1) - r.width()],
                    l = [s[0] / (a[0].parent().height() - a[0].height()), s[1] / (a[1].parent().width() - a[1].width())];
                n.scrollRatio = {
                    y: l[0],
                    x: l[1]
                }
            },
            x = function(e, t, n) {
                var i = n ? d[0] + "_expanded" : "",
                    r = e.closest(".mCSB_scrollTools");
                "active" === t ? (e.toggleClass(d[0] + " " + i), r.toggleClass(d[1]), e[0]._draggable = e[0]._draggable ? 0 : 1) : e[0]._draggable || ("hide" === t ? (e.removeClass(d[0]), r.removeClass(d[1])) : (e.addClass(d[0]), r.addClass(d[1])))
            },
            T = function() {
                var t = e(this),
                    n = t.data(i),
                    r = e("#mCSB_" + n.idx),
                    o = e("#mCSB_" + n.idx + "_container"),
                    a = null == n.overflowed ? o.height() : o.outerHeight(!1),
                    s = null == n.overflowed ? o.width() : o.outerWidth(!1),
                    l = o[0].scrollHeight,
                    c = o[0].scrollWidth;
                return l > a && (a = l), c > s && (s = c), [a > r.height(), s > r.width()]
            },
            _ = function() {
                var t = e(this),
                    n = t.data(i),
                    r = n.opt,
                    o = e("#mCSB_" + n.idx),
                    a = e("#mCSB_" + n.idx + "_container"),
                    s = [e("#mCSB_" + n.idx + "_dragger_vertical"), e("#mCSB_" + n.idx + "_dragger_horizontal")];
                if (G(t), ("x" !== r.axis && !n.overflowed[0] || "y" === r.axis && n.overflowed[0]) && (s[0].add(a).css("top", 0), X(t, "_resetY")), "y" !== r.axis && !n.overflowed[1] || "x" === r.axis && n.overflowed[1]) {
                    var l = dx = 0;
                    "rtl" === n.langDir && (l = o.width() - a.outerWidth(!1), dx = Math.abs(l / n.scrollRatio.x)), a.css("left", l), s[1].css("left", dx), X(t, "_resetX")
                }
            },
            k = function() {
                function t() {
                    a = setTimeout(function() {
                        e.event.special.mousewheel ? (clearTimeout(a), O.call(n[0])) : t()
                    }, 100)
                }
                var n = e(this),
                    r = n.data(i),
                    o = r.opt;
                if (!r.bindEvents) {
                    if (D.call(this), o.contentTouchScroll && A.call(this), F.call(this), o.mouseWheel.enable) {
                        var a;
                        t()
                    }
                    P.call(this), q.call(this), o.advanced.autoScrollOnFocus && U.call(this), o.scrollButtons.enable && j.call(this), o.keyboard.enable && B.call(this), r.bindEvents = !0
                }
            },
            S = function() {
                var t = e(this),
                    n = t.data(i),
                    r = n.opt,
                    o = i + "_" + n.idx,
                    a = ".mCSB_" + n.idx + "_scrollbar",
                    s = e("#mCSB_" + n.idx + ",#mCSB_" + n.idx + "_container,#mCSB_" + n.idx + "_container_wrapper," + a + " ." + d[12] + ",#mCSB_" + n.idx + "_dragger_vertical,#mCSB_" + n.idx + "_dragger_horizontal," + a + ">a"),
                    l = e("#mCSB_" + n.idx + "_container");
                r.advanced.releaseDraggableSelectors && s.add(e(r.advanced.releaseDraggableSelectors)), r.advanced.extraDraggableSelectors && s.add(e(r.advanced.extraDraggableSelectors)), n.bindEvents && (e(document).add(e(!N() || top.document)).unbind("." + o), s.each(function() {
                    e(this).unbind("." + o)
                }), clearTimeout(t[0]._focusTimeout), Z(t[0], "_focusTimeout"), clearTimeout(n.sequential.step), Z(n.sequential, "step"), clearTimeout(l[0].onCompleteTimeout), Z(l[0], "onCompleteTimeout"), n.bindEvents = !1)
            },
            I = function(t) {
                var n = e(this),
                    r = n.data(i),
                    o = r.opt,
                    a = e("#mCSB_" + r.idx + "_container_wrapper"),
                    s = a.length ? a : e("#mCSB_" + r.idx + "_container"),
                    l = [e("#mCSB_" + r.idx + "_scrollbar_vertical"), e("#mCSB_" + r.idx + "_scrollbar_horizontal")],
                    c = [l[0].find(".mCSB_dragger"), l[1].find(".mCSB_dragger")];
                "x" !== o.axis && (r.overflowed[0] && !t ? (l[0].add(c[0]).add(l[0].children("a")).css("display", "block"), s.removeClass(d[8] + " " + d[10])) : (o.alwaysShowScrollbar ? (2 !== o.alwaysShowScrollbar && c[0].css("display", "none"), s.removeClass(d[10])) : (l[0].css("display", "none"), s.addClass(d[10])), s.addClass(d[8]))), "y" !== o.axis && (r.overflowed[1] && !t ? (l[1].add(c[1]).add(l[1].children("a")).css("display", "block"), s.removeClass(d[9] + " " + d[11])) : (o.alwaysShowScrollbar ? (2 !== o.alwaysShowScrollbar && c[1].css("display", "none"), s.removeClass(d[11])) : (l[1].css("display", "none"), s.addClass(d[11])), s.addClass(d[9]))), r.overflowed[0] || r.overflowed[1] ? n.removeClass(d[5]) : n.addClass(d[5])
            },
            E = function(t) {
                var n = t.type,
                    i = t.target.ownerDocument !== document && null !== frameElement ? [e(frameElement).offset().top, e(frameElement).offset().left] : null,
                    r = N() && t.target.ownerDocument !== top.document && null !== frameElement ? [e(t.view.frameElement).offset().top, e(t.view.frameElement).offset().left] : [0, 0];
                switch (n) {
                    case "pointerdown":
                    case "MSPointerDown":
                    case "pointermove":
                    case "MSPointerMove":
                    case "pointerup":
                    case "MSPointerUp":
                        return i ? [t.originalEvent.pageY - i[0] + r[0], t.originalEvent.pageX - i[1] + r[1], !1] : [t.originalEvent.pageY, t.originalEvent.pageX, !1];
                    case "touchstart":
                    case "touchmove":
                    case "touchend":
                        var o = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0],
                            a = t.originalEvent.touches.length || t.originalEvent.changedTouches.length;
                        return t.target.ownerDocument !== document ? [o.screenY, o.screenX, a > 1] : [o.pageY, o.pageX, a > 1];
                    default:
                        return i ? [t.pageY - i[0] + r[0], t.pageX - i[1] + r[1], !1] : [t.pageY, t.pageX, !1]
                }
            },
            D = function() {
                function t(e, t, i, r) {
                    if (f[0].idleTimer = d.scrollInertia < 233 ? 250 : 0, n.attr("id") === p[1]) var o = "x",
                        l = (n[0].offsetLeft - t + r) * s.scrollRatio.x;
                    else var o = "y",
                        l = (n[0].offsetTop - e + i) * s.scrollRatio.y;
                    X(a, l.toString(), {
                        dir: o,
                        drag: !0
                    })
                }
                var n, r, o, a = e(this),
                    s = a.data(i),
                    d = s.opt,
                    u = i + "_" + s.idx,
                    p = ["mCSB_" + s.idx + "_dragger_vertical", "mCSB_" + s.idx + "_dragger_horizontal"],
                    f = e("#mCSB_" + s.idx + "_container"),
                    h = e("#" + p[0] + ",#" + p[1]),
                    m = d.advanced.releaseDraggableSelectors ? h.add(e(d.advanced.releaseDraggableSelectors)) : h,
                    g = d.advanced.extraDraggableSelectors ? e(!N() || top.document).add(e(d.advanced.extraDraggableSelectors)) : e(!N() || top.document);
                h.bind("contextmenu." + u, function(e) {
                    e.preventDefault()
                }).bind("mousedown." + u + " touchstart." + u + " pointerdown." + u + " MSPointerDown." + u, function(t) {
                    if (t.stopImmediatePropagation(), t.preventDefault(), ee(t)) {
                        c = !0, l && (document.onselectstart = function() {
                            return !1
                        }), R.call(f, !1), G(a), n = e(this);
                        var i = n.offset(),
                            s = E(t)[0] - i.top,
                            u = E(t)[1] - i.left,
                            p = n.height() + i.top,
                            h = n.width() + i.left;
                        p > s && s > 0 && h > u && u > 0 && (r = s, o = u), x(n, "active", d.autoExpandScrollbar)
                    }
                }).bind("touchmove." + u, function(e) {
                    e.stopImmediatePropagation(), e.preventDefault();
                    var i = n.offset(),
                        a = E(e)[0] - i.top,
                        s = E(e)[1] - i.left;
                    t(r, o, a, s)
                }), e(document).add(g).bind("mousemove." + u + " pointermove." + u + " MSPointerMove." + u, function(e) {
                    if (n) {
                        var i = n.offset(),
                            a = E(e)[0] - i.top,
                            s = E(e)[1] - i.left;
                        if (r === a && o === s) return;
                        t(r, o, a, s)
                    }
                }).add(m).bind("mouseup." + u + " touchend." + u + " pointerup." + u + " MSPointerUp." + u, function() {
                    n && (x(n, "active", d.autoExpandScrollbar), n = null), c = !1, l && (document.onselectstart = null), R.call(f, !0)
                })
            },
            A = function() {
                function n(e) {
                    if (!te(e) || c || E(e)[2]) return void(t = 0);
                    t = 1, C = 0, x = 0, d = 1, T.removeClass("mCS_touch_action");
                    var n = D.offset();
                    u = E(e)[0] - n.top, p = E(e)[1] - n.left, M = [E(e)[0], E(e)[1]]
                }

                function r(e) {
                    if (te(e) && !c && !E(e)[2] && (k.documentTouchScroll || e.preventDefault(), e.stopImmediatePropagation(), (!x || C) && d)) {
                        g = K();
                        var t = I.offset(),
                            n = E(e)[0] - t.top,
                            i = E(e)[1] - t.left,
                            r = "mcsLinearOut";
                        if (F.push(n), O.push(i), M[2] = Math.abs(E(e)[0] - M[0]), M[3] = Math.abs(E(e)[1] - M[1]), _.overflowed[0]) var o = A[0].parent().height() - A[0].height(),
                            a = u - n > 0 && n - u > -(o * _.scrollRatio.y) && (2 * M[3] < M[2] || "yx" === k.axis);
                        if (_.overflowed[1]) var s = A[1].parent().width() - A[1].width(),
                            f = p - i > 0 && i - p > -(s * _.scrollRatio.x) && (2 * M[2] < M[3] || "yx" === k.axis);
                        a || f ? (q || e.preventDefault(), C = 1) : (x = 1, T.addClass("mCS_touch_action")), q && e.preventDefault(), $ = "yx" === k.axis ? [u - n, p - i] : "x" === k.axis ? [null, p - i] : [u - n, null], D[0].idleTimer = 250, _.overflowed[0] && l($[0], L, r, "y", "all", !0), _.overflowed[1] && l($[1], L, r, "x", R, !0)
                    }
                }

                function o(e) {
                    if (!te(e) || c || E(e)[2]) return void(t = 0);
                    t = 1, e.stopImmediatePropagation(), G(T), m = K();
                    var n = I.offset();
                    f = E(e)[0] - n.top, h = E(e)[1] - n.left, F = [], O = []
                }

                function a(e) {
                    if (te(e) && !c && !E(e)[2]) {
                        d = 0, e.stopImmediatePropagation(), C = 0, x = 0, v = K();
                        var t = I.offset(),
                            n = E(e)[0] - t.top,
                            i = E(e)[1] - t.left;
                        if (!(v - g > 30)) {
                            b = 1e3 / (v - m);
                            var r = "mcsEaseOut",
                                o = 2.5 > b,
                                a = o ? [F[F.length - 2], O[O.length - 2]] : [0, 0];
                            y = o ? [n - a[0], i - a[1]] : [n - f, i - h];
                            var u = [Math.abs(y[0]), Math.abs(y[1])];
                            b = o ? [Math.abs(y[0] / 4), Math.abs(y[1] / 4)] : [b, b];
                            var p = [Math.abs(D[0].offsetTop) - y[0] * s(u[0] / b[0], b[0]), Math.abs(D[0].offsetLeft) - y[1] * s(u[1] / b[1], b[1])];
                            $ = "yx" === k.axis ? [p[0], p[1]] : "x" === k.axis ? [null, p[1]] : [p[0], null], w = [4 * u[0] + k.scrollInertia, 4 * u[1] + k.scrollInertia];
                            var T = parseInt(k.contentTouchScroll) || 0;
                            $[0] = u[0] > T ? $[0] : 0, $[1] = u[1] > T ? $[1] : 0, _.overflowed[0] && l($[0], w[0], r, "y", R, !1), _.overflowed[1] && l($[1], w[1], r, "x", R, !1)
                        }
                    }
                }

                function s(e, t) {
                    var n = [1.5 * t, 2 * t, t / 1.5, t / 2];
                    return e > 90 ? t > 4 ? n[0] : n[3] : e > 60 ? t > 3 ? n[3] : n[2] : e > 30 ? t > 8 ? n[1] : t > 6 ? n[0] : t > 4 ? t : n[2] : t > 8 ? t : n[3]
                }

                function l(e, t, n, i, r, o) {
                    e && X(T, e.toString(), {
                        dur: t,
                        scrollEasing: n,
                        dir: i,
                        overwrite: r,
                        drag: o
                    })
                }
                var d, u, p, f, h, m, g, v, y, b, $, w, C, x, T = e(this),
                    _ = T.data(i),
                    k = _.opt,
                    S = i + "_" + _.idx,
                    I = e("#mCSB_" + _.idx),
                    D = e("#mCSB_" + _.idx + "_container"),
                    A = [e("#mCSB_" + _.idx + "_dragger_vertical"), e("#mCSB_" + _.idx + "_dragger_horizontal")],
                    F = [],
                    O = [],
                    L = 0,
                    R = "yx" === k.axis ? "none" : "all",
                    M = [],
                    P = D.find("iframe"),
                    U = ["touchstart." + S + " pointerdown." + S + " MSPointerDown." + S, "touchmove." + S + " pointermove." + S + " MSPointerMove." + S, "touchend." + S + " pointerup." + S + " MSPointerUp." + S],
                    q = void 0 !== document.body.style.touchAction && "" !== document.body.style.touchAction;
                D.bind(U[0], function(e) {
                    n(e)
                }).bind(U[1], function(e) {
                    r(e)
                }), I.bind(U[0], function(e) {
                    o(e)
                }).bind(U[2], function(e) {
                    a(e)
                }), P.length && P.each(function() {
                    e(this).bind("load", function() {
                        N(this) && e(this.contentDocument || this.contentWindow.document).bind(U[0], function(e) {
                            n(e), o(e)
                        }).bind(U[1], function(e) {
                            r(e)
                        }).bind(U[2], function(e) {
                            a(e)
                        })
                    })
                })
            },
            F = function() {
                function n() {
                    return window.getSelection ? window.getSelection().toString() : document.selection && "Control" != document.selection.type ? document.selection.createRange().text : 0
                }

                function r(e, t, n) {
                    d.type = n && o ? "stepped" : "stepless", d.scrollAmount = 10, W(a, e, t, "mcsLinearOut", n ? 60 : null)
                }
                var o, a = e(this),
                    s = a.data(i),
                    l = s.opt,
                    d = s.sequential,
                    u = i + "_" + s.idx,
                    p = e("#mCSB_" + s.idx + "_container"),
                    f = p.parent();
                p.bind("mousedown." + u, function() {
                    t || o || (o = 1, c = !0)
                }).add(document).bind("mousemove." + u, function(e) {
                    if (!t && o && n()) {
                        var i = p.offset(),
                            a = E(e)[0] - i.top + p[0].offsetTop,
                            c = E(e)[1] - i.left + p[0].offsetLeft;
                        a > 0 && a < f.height() && c > 0 && c < f.width() ? d.step && r("off", null, "stepped") : ("x" !== l.axis && s.overflowed[0] && (0 > a ? r("on", 38) : a > f.height() && r("on", 40)), "y" !== l.axis && s.overflowed[1] && (0 > c ? r("on", 37) : c > f.width() && r("on", 39)))
                    }
                }).bind("mouseup." + u + " dragend." + u, function() {
                    t || (o && (o = 0, r("off", null)), c = !1)
                })
            },
            O = function() {
                function t(t, i) {
                    if (G(n), !M(n, t.target)) {
                        var a = "auto" !== o.mouseWheel.deltaFactor ? parseInt(o.mouseWheel.deltaFactor) : l && t.deltaFactor < 100 ? 100 : t.deltaFactor || 100,
                            d = o.scrollInertia;
                        if ("x" === o.axis || "x" === o.mouseWheel.axis) var u = "x",
                            p = [Math.round(a * r.scrollRatio.x), parseInt(o.mouseWheel.scrollAmount)],
                            f = "auto" !== o.mouseWheel.scrollAmount ? p[1] : p[0] >= s.width() ? .9 * s.width() : p[0],
                            h = Math.abs(e("#mCSB_" + r.idx + "_container")[0].offsetLeft),
                            m = c[1][0].offsetLeft,
                            g = c[1].parent().width() - c[1].width(),
                            v = "y" === o.mouseWheel.axis ? t.deltaY || i : t.deltaX;
                        else var u = "y",
                            p = [Math.round(a * r.scrollRatio.y), parseInt(o.mouseWheel.scrollAmount)],
                            f = "auto" !== o.mouseWheel.scrollAmount ? p[1] : p[0] >= s.height() ? .9 * s.height() : p[0],
                            h = Math.abs(e("#mCSB_" + r.idx + "_container")[0].offsetTop),
                            m = c[0][0].offsetTop,
                            g = c[0].parent().height() - c[0].height(),
                            v = t.deltaY || i;
                        "y" === u && !r.overflowed[0] || "x" === u && !r.overflowed[1] || ((o.mouseWheel.invert || t.webkitDirectionInvertedFromDevice) && (v = -v), o.mouseWheel.normalizeDelta && (v = 0 > v ? -1 : 1), (v > 0 && 0 !== m || 0 > v && m !== g || o.mouseWheel.preventDefault) && (t.stopImmediatePropagation(), t.preventDefault()), t.deltaFactor < 5 && !o.mouseWheel.normalizeDelta && (f = t.deltaFactor, d = 17), X(n, (h - v * f).toString(), {
                            dir: u,
                            dur: d
                        }))
                    }
                }
                if (e(this).data(i)) {
                    var n = e(this),
                        r = n.data(i),
                        o = r.opt,
                        a = i + "_" + r.idx,
                        s = e("#mCSB_" + r.idx),
                        c = [e("#mCSB_" + r.idx + "_dragger_vertical"), e("#mCSB_" + r.idx + "_dragger_horizontal")],
                        d = e("#mCSB_" + r.idx + "_container").find("iframe");
                    d.length && d.each(function() {
                        e(this).bind("load", function() {
                            N(this) && e(this.contentDocument || this.contentWindow.document).bind("mousewheel." + a, function(e, n) {
                                t(e, n)
                            })
                        })
                    }), s.bind("mousewheel." + a, function(e, n) {
                        t(e, n)
                    })
                }
            },
            L = new Object,
            N = function(t) {
                var n = !1,
                    i = !1,
                    r = null;
                if (void 0 === t ? i = "#empty" : void 0 !== e(t).attr("id") && (i = e(t).attr("id")), i !== !1 && void 0 !== L[i]) return L[i];
                if (t) {
                    try {
                        var o = t.contentDocument || t.contentWindow.document;
                        r = o.body.innerHTML
                    } catch (a) {}
                    n = null !== r
                } else {
                    try {
                        var o = top.document;
                        r = o.body.innerHTML
                    } catch (a) {}
                    n = null !== r
                }
                return i !== !1 && (L[i] = n), n
            },
            R = function(e) {
                var t = this.find("iframe");
                if (t.length) {
                    var n = e ? "auto" : "none";
                    t.css("pointer-events", n)
                }
            },
            M = function(t, n) {
                var r = n.nodeName.toLowerCase(),
                    o = t.data(i).opt.mouseWheel.disableOver,
                    a = ["select", "textarea"];
                return e.inArray(r, o) > -1 && !(e.inArray(r, a) > -1 && !e(n).is(":focus"))
            },
            P = function() {
                var t, n = e(this),
                    r = n.data(i),
                    o = i + "_" + r.idx,
                    a = e("#mCSB_" + r.idx + "_container"),
                    s = a.parent(),
                    l = e(".mCSB_" + r.idx + "_scrollbar ." + d[12]);
                l.bind("mousedown." + o + " touchstart." + o + " pointerdown." + o + " MSPointerDown." + o, function(n) {
                    c = !0, e(n.target).hasClass("mCSB_dragger") || (t = 1)
                }).bind("touchend." + o + " pointerup." + o + " MSPointerUp." + o, function() {
                    c = !1
                }).bind("click." + o, function(i) {
                    if (t && (t = 0, e(i.target).hasClass(d[12]) || e(i.target).hasClass("mCSB_draggerRail"))) {
                        G(n);
                        var o = e(this),
                            l = o.find(".mCSB_dragger");
                        if (o.parent(".mCSB_scrollTools_horizontal").length > 0) {
                            if (!r.overflowed[1]) return;
                            var c = "x",
                                u = i.pageX > l.offset().left ? -1 : 1,
                                p = Math.abs(a[0].offsetLeft) - u * (.9 * s.width())
                        } else {
                            if (!r.overflowed[0]) return;
                            var c = "y",
                                u = i.pageY > l.offset().top ? -1 : 1,
                                p = Math.abs(a[0].offsetTop) - u * (.9 * s.height())
                        }
                        X(n, p.toString(), {
                            dir: c,
                            scrollEasing: "mcsEaseInOut"
                        })
                    }
                })
            },
            U = function() {
                var t = e(this),
                    n = t.data(i),
                    r = n.opt,
                    o = i + "_" + n.idx,
                    a = e("#mCSB_" + n.idx + "_container"),
                    s = a.parent();
                a.bind("focusin." + o, function() {
                    var n = e(document.activeElement),
                        i = a.find(".mCustomScrollBox").length,
                        o = 0;
                    n.is(r.advanced.autoScrollOnFocus) && (G(t), clearTimeout(t[0]._focusTimeout), t[0]._focusTimer = i ? (o + 17) * i : 0, t[0]._focusTimeout = setTimeout(function() {
                        var e = [ie(n)[0], ie(n)[1]],
                            i = [a[0].offsetTop, a[0].offsetLeft],
                            l = [i[0] + e[0] >= 0 && i[0] + e[0] < s.height() - n.outerHeight(!1), i[1] + e[1] >= 0 && i[0] + e[1] < s.width() - n.outerWidth(!1)],
                            c = "yx" !== r.axis || l[0] || l[1] ? "all" : "none";
                        "x" === r.axis || l[0] || X(t, e[0].toString(), {
                            dir: "y",
                            scrollEasing: "mcsEaseInOut",
                            overwrite: c,
                            dur: o
                        }), "y" === r.axis || l[1] || X(t, e[1].toString(), {
                            dir: "x",
                            scrollEasing: "mcsEaseInOut",
                            overwrite: c,
                            dur: o
                        })
                    }, t[0]._focusTimer))
                })
            },
            q = function() {
                var t = e(this),
                    n = t.data(i),
                    r = i + "_" + n.idx,
                    o = e("#mCSB_" + n.idx + "_container").parent();
                o.bind("scroll." + r, function() {
                    0 === o.scrollTop() && 0 === o.scrollLeft() || e(".mCSB_" + n.idx + "_scrollbar").css("visibility", "hidden")
                })
            },
            j = function() {
                var t = e(this),
                    n = t.data(i),
                    r = n.opt,
                    o = n.sequential,
                    a = i + "_" + n.idx,
                    s = ".mCSB_" + n.idx + "_scrollbar",
                    l = e(s + ">a");
                l.bind("contextmenu." + a, function(e) {
                    e.preventDefault()
                }).bind("mousedown." + a + " touchstart." + a + " pointerdown." + a + " MSPointerDown." + a + " mouseup." + a + " touchend." + a + " pointerup." + a + " MSPointerUp." + a + " mouseout." + a + " pointerout." + a + " MSPointerOut." + a + " click." + a, function(i) {
                    function a(e, n) {
                        o.scrollAmount = r.scrollButtons.scrollAmount, W(t, e, n)
                    }
                    if (i.preventDefault(), ee(i)) {
                        var s = e(this).attr("class");
                        switch (o.type = r.scrollButtons.scrollType, i.type) {
                            case "mousedown":
                            case "touchstart":
                            case "pointerdown":
                            case "MSPointerDown":
                                if ("stepped" === o.type) return;
                                c = !0, n.tweenRunning = !1, a("on", s);
                                break;
                            case "mouseup":
                            case "touchend":
                            case "pointerup":
                            case "MSPointerUp":
                            case "mouseout":
                            case "pointerout":
                            case "MSPointerOut":
                                if ("stepped" === o.type) return;
                                c = !1, o.dir && a("off", s);
                                break;
                            case "click":
                                if ("stepped" !== o.type || n.tweenRunning) return;
                                a("on", s)
                        }
                    }
                })
            },
            B = function() {
                function t(t) {
                    function i(e, t) {
                        a.type = o.keyboard.scrollType, a.scrollAmount = o.keyboard.scrollAmount, "stepped" === a.type && r.tweenRunning || W(n, e, t)
                    }
                    switch (t.type) {
                        case "blur":
                            r.tweenRunning && a.dir && i("off", null);
                            break;
                        case "keydown":
                        case "keyup":
                            var s = t.keyCode ? t.keyCode : t.which,
                                l = "on";
                            if ("x" !== o.axis && (38 === s || 40 === s) || "y" !== o.axis && (37 === s || 39 === s)) {
                                if ((38 === s || 40 === s) && !r.overflowed[0] || (37 === s || 39 === s) && !r.overflowed[1]) return;
                                "keyup" === t.type && (l = "off"), e(document.activeElement).is(u) || (t.preventDefault(), t.stopImmediatePropagation(), i(l, s))
                            } else if (33 === s || 34 === s) {
                                if ((r.overflowed[0] || r.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()), "keyup" === t.type) {
                                    G(n);
                                    var p = 34 === s ? -1 : 1;
                                    if ("x" === o.axis || "yx" === o.axis && r.overflowed[1] && !r.overflowed[0]) var f = "x",
                                        h = Math.abs(c[0].offsetLeft) - p * (.9 * d.width());
                                    else var f = "y",
                                        h = Math.abs(c[0].offsetTop) - p * (.9 * d.height());
                                    X(n, h.toString(), {
                                        dir: f,
                                        scrollEasing: "mcsEaseInOut"
                                    })
                                }
                            } else if ((35 === s || 36 === s) && !e(document.activeElement).is(u) && ((r.overflowed[0] || r.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()), "keyup" === t.type)) {
                                if ("x" === o.axis || "yx" === o.axis && r.overflowed[1] && !r.overflowed[0]) var f = "x",
                                    h = 35 === s ? Math.abs(d.width() - c.outerWidth(!1)) : 0;
                                else var f = "y",
                                    h = 35 === s ? Math.abs(d.height() - c.outerHeight(!1)) : 0;
                                X(n, h.toString(), {
                                    dir: f,
                                    scrollEasing: "mcsEaseInOut"
                                })
                            }
                    }
                }
                var n = e(this),
                    r = n.data(i),
                    o = r.opt,
                    a = r.sequential,
                    s = i + "_" + r.idx,
                    l = e("#mCSB_" + r.idx),
                    c = e("#mCSB_" + r.idx + "_container"),
                    d = c.parent(),
                    u = "input,textarea,select,datalist,keygen,[contenteditable='true']",
                    p = c.find("iframe"),
                    f = ["blur." + s + " keydown." + s + " keyup." + s];
                p.length && p.each(function() {
                    e(this).bind("load", function() {
                        N(this) && e(this.contentDocument || this.contentWindow.document).bind(f[0], function(e) {
                            t(e)
                        })
                    })
                }), l.attr("tabindex", "0").bind(f[0], function(e) {
                    t(e)
                })
            },
            W = function(t, n, r, o, a) {
                function s(e) {
                    u.snapAmount && (p.scrollAmount = u.snapAmount instanceof Array ? "x" === p.dir[0] ? u.snapAmount[1] : u.snapAmount[0] : u.snapAmount);
                    var n = "stepped" !== p.type,
                        i = a ? a : e ? n ? m / 1.5 : g : 1e3 / 60,
                        r = e ? n ? 7.5 : 40 : 2.5,
                        l = [Math.abs(f[0].offsetTop), Math.abs(f[0].offsetLeft)],
                        d = [c.scrollRatio.y > 10 ? 10 : c.scrollRatio.y, c.scrollRatio.x > 10 ? 10 : c.scrollRatio.x],
                        h = "x" === p.dir[0] ? l[1] + p.dir[1] * (d[1] * r) : l[0] + p.dir[1] * (d[0] * r),
                        v = "x" === p.dir[0] ? l[1] + p.dir[1] * parseInt(p.scrollAmount) : l[0] + p.dir[1] * parseInt(p.scrollAmount),
                        y = "auto" !== p.scrollAmount ? v : h,
                        b = o ? o : e ? n ? "mcsLinearOut" : "mcsEaseInOut" : "mcsLinear",
                        $ = !!e;
                    return e && 17 > i && (y = "x" === p.dir[0] ? l[1] : l[0]), X(t, y.toString(), {
                        dir: p.dir[0],
                        scrollEasing: b,
                        dur: i,
                        onComplete: $
                    }), e ? void(p.dir = !1) : (clearTimeout(p.step), void(p.step = setTimeout(function() {
                        s()
                    }, i)))
                }

                function l() {
                    clearTimeout(p.step), Z(p, "step"), G(t)
                }
                var c = t.data(i),
                    u = c.opt,
                    p = c.sequential,
                    f = e("#mCSB_" + c.idx + "_container"),
                    h = "stepped" === p.type,
                    m = u.scrollInertia < 26 ? 26 : u.scrollInertia,
                    g = u.scrollInertia < 1 ? 17 : u.scrollInertia;
                switch (n) {
                    case "on":
                        if (p.dir = [r === d[16] || r === d[15] || 39 === r || 37 === r ? "x" : "y", r === d[13] || r === d[15] || 38 === r || 37 === r ? -1 : 1], G(t), ne(r) && "stepped" === p.type) return;
                        s(h);
                        break;
                    case "off":
                        l(), (h || c.tweenRunning && p.dir) && s(!0)
                }
            },
            H = function(t) {
                var n = e(this).data(i).opt,
                    r = [];
                return "function" == typeof t && (t = t()), t instanceof Array ? r = t.length > 1 ? [t[0], t[1]] : "x" === n.axis ? [null, t[0]] : [t[0], null] : (r[0] = t.y ? t.y : t.x || "x" === n.axis ? null : t, r[1] = t.x ? t.x : t.y || "y" === n.axis ? null : t), "function" == typeof r[0] && (r[0] = r[0]()), "function" == typeof r[1] && (r[1] = r[1]()), r
            },
            z = function(t, n) {
                if (null != t && "undefined" != typeof t) {
                    var r = e(this),
                        o = r.data(i),
                        a = o.opt,
                        s = e("#mCSB_" + o.idx + "_container"),
                        l = s.parent(),
                        c = typeof t;
                    n || (n = "x" === a.axis ? "x" : "y");
                    var d = "x" === n ? s.outerWidth(!1) - l.width() : s.outerHeight(!1) - l.height(),
                        p = "x" === n ? s[0].offsetLeft : s[0].offsetTop,
                        f = "x" === n ? "left" : "top";
                    switch (c) {
                        case "function":
                            return t();
                        case "object":
                            var h = t.jquery ? t : e(t);
                            if (!h.length) return;
                            return "x" === n ? ie(h)[1] : ie(h)[0];
                        case "string":
                        case "number":
                            if (ne(t)) return Math.abs(t);
                            if (-1 !== t.indexOf("%")) return Math.abs(d * parseInt(t) / 100);
                            if (-1 !== t.indexOf("-=")) return Math.abs(p - parseInt(t.split("-=")[1]));
                            if (-1 !== t.indexOf("+=")) {
                                var m = p + parseInt(t.split("+=")[1]);
                                return m >= 0 ? 0 : Math.abs(m)
                            }
                            if (-1 !== t.indexOf("px") && ne(t.split("px")[0])) return Math.abs(t.split("px")[0]);
                            if ("top" === t || "left" === t) return 0;
                            if ("bottom" === t) return Math.abs(l.height() - s.outerHeight(!1));
                            if ("right" === t) return Math.abs(l.width() - s.outerWidth(!1));
                            if ("first" === t || "last" === t) {
                                var h = s.find(":" + t);
                                return "x" === n ? ie(h)[1] : ie(h)[0]
                            }
                            return e(t).length ? "x" === n ? ie(e(t))[1] : ie(e(t))[0] : (s.css(f, t), void u.update.call(null, r[0]))
                    }
                }
            },
            V = function(t) {
                function n() {
                    return clearTimeout(p[0].autoUpdate), 0 === s.parents("html").length ? void(s = null) : void(p[0].autoUpdate = setTimeout(function() {
                        return c.advanced.updateOnSelectorChange && (l.poll.change.n = o(), l.poll.change.n !== l.poll.change.o) ? (l.poll.change.o = l.poll.change.n, void a(3)) : c.advanced.updateOnContentResize && (l.poll.size.n = s[0].scrollHeight + s[0].scrollWidth + p[0].offsetHeight + s[0].offsetHeight + s[0].offsetWidth, l.poll.size.n !== l.poll.size.o) ? (l.poll.size.o = l.poll.size.n, void a(1)) : !c.advanced.updateOnImageLoad || "auto" === c.advanced.updateOnImageLoad && "y" === c.axis || (l.poll.img.n = p.find("img").length, l.poll.img.n === l.poll.img.o) ? void((c.advanced.updateOnSelectorChange || c.advanced.updateOnContentResize || c.advanced.updateOnImageLoad) && n()) : (l.poll.img.o = l.poll.img.n, void p.find("img").each(function() {
                            r(this)
                        }))
                    }, c.advanced.autoUpdateTimeout))
                }

                function r(t) {
                    function n(e, t) {
                        return function() {
                            return t.apply(e, arguments)
                        }
                    }

                    function i() {
                        this.onload = null, e(t).addClass(d[2]), a(2)
                    }
                    if (e(t).hasClass(d[2])) return void a();
                    var r = new Image;
                    r.onload = n(r, i), r.src = t.src
                }

                function o() {
                    c.advanced.updateOnSelectorChange === !0 && (c.advanced.updateOnSelectorChange = "*");
                    var e = 0,
                        t = p.find(c.advanced.updateOnSelectorChange);
                    return c.advanced.updateOnSelectorChange && t.length > 0 && t.each(function() {
                        e += this.offsetHeight + this.offsetWidth
                    }), e
                }

                function a(e) {
                    clearTimeout(p[0].autoUpdate), u.update.call(null, s[0], e)
                }
                var s = e(this),
                    l = s.data(i),
                    c = l.opt,
                    p = e("#mCSB_" + l.idx + "_container");
                return t ? (clearTimeout(p[0].autoUpdate), void Z(p[0], "autoUpdate")) : void n()
            },
            Q = function(e, t, n) {
                return Math.round(e / t) * t - n
            },
            G = function(t) {
                var n = t.data(i),
                    r = e("#mCSB_" + n.idx + "_container,#mCSB_" + n.idx + "_container_wrapper,#mCSB_" + n.idx + "_dragger_vertical,#mCSB_" + n.idx + "_dragger_horizontal");
                r.each(function() {
                    J.call(this)
                })
            },
            X = function(t, n, r) {
                function o(e) {
                    return l && c.callbacks[e] && "function" == typeof c.callbacks[e]
                }

                function a() {
                    return [c.callbacks.alwaysTriggerOffsets || $ >= w[0] + T, c.callbacks.alwaysTriggerOffsets || -_ >= $]
                }

                function s() {
                    var e = [f[0].offsetTop, f[0].offsetLeft],
                        n = [y[0].offsetTop, y[0].offsetLeft],
                        i = [f.outerHeight(!1), f.outerWidth(!1)],
                        o = [p.height(), p.width()];
                    t[0].mcs = {
                        content: f,
                        top: e[0],
                        left: e[1],
                        draggerTop: n[0],
                        draggerLeft: n[1],
                        topPct: Math.round(100 * Math.abs(e[0]) / (Math.abs(i[0]) - o[0])),
                        leftPct: Math.round(100 * Math.abs(e[1]) / (Math.abs(i[1]) - o[1])),
                        direction: r.dir
                    }
                }
                var l = t.data(i),
                    c = l.opt,
                    d = {
                        trigger: "internal",
                        dir: "y",
                        scrollEasing: "mcsEaseOut",
                        drag: !1,
                        dur: c.scrollInertia,
                        overwrite: "all",
                        callbacks: !0,
                        onStart: !0,
                        onUpdate: !0,
                        onComplete: !0
                    },
                    r = e.extend(d, r),
                    u = [r.dur, r.drag ? 0 : r.dur],
                    p = e("#mCSB_" + l.idx),
                    f = e("#mCSB_" + l.idx + "_container"),
                    h = f.parent(),
                    m = c.callbacks.onTotalScrollOffset ? H.call(t, c.callbacks.onTotalScrollOffset) : [0, 0],
                    g = c.callbacks.onTotalScrollBackOffset ? H.call(t, c.callbacks.onTotalScrollBackOffset) : [0, 0];
                if (l.trigger = r.trigger, 0 === h.scrollTop() && 0 === h.scrollLeft() || (e(".mCSB_" + l.idx + "_scrollbar").css("visibility", "visible"), h.scrollTop(0).scrollLeft(0)), "_resetY" !== n || l.contentReset.y || (o("onOverflowYNone") && c.callbacks.onOverflowYNone.call(t[0]), l.contentReset.y = 1), "_resetX" !== n || l.contentReset.x || (o("onOverflowXNone") && c.callbacks.onOverflowXNone.call(t[0]), l.contentReset.x = 1), "_resetY" !== n && "_resetX" !== n) {
                    if (!l.contentReset.y && t[0].mcs || !l.overflowed[0] || (o("onOverflowY") && c.callbacks.onOverflowY.call(t[0]), l.contentReset.x = null), !l.contentReset.x && t[0].mcs || !l.overflowed[1] || (o("onOverflowX") && c.callbacks.onOverflowX.call(t[0]), l.contentReset.x = null), c.snapAmount) {
                        var v = c.snapAmount instanceof Array ? "x" === r.dir ? c.snapAmount[1] : c.snapAmount[0] : c.snapAmount;
                        n = Q(n, v, c.snapOffset)
                    }
                    switch (r.dir) {
                        case "x":
                            var y = e("#mCSB_" + l.idx + "_dragger_horizontal"),
                                b = "left",
                                $ = f[0].offsetLeft,
                                w = [p.width() - f.outerWidth(!1), y.parent().width() - y.width()],
                                C = [n, 0 === n ? 0 : n / l.scrollRatio.x],
                                T = m[1],
                                _ = g[1],
                                k = T > 0 ? T / l.scrollRatio.x : 0,
                                S = _ > 0 ? _ / l.scrollRatio.x : 0;
                            break;
                        case "y":
                            var y = e("#mCSB_" + l.idx + "_dragger_vertical"),
                                b = "top",
                                $ = f[0].offsetTop,
                                w = [p.height() - f.outerHeight(!1), y.parent().height() - y.height()],
                                C = [n, 0 === n ? 0 : n / l.scrollRatio.y],
                                T = m[0],
                                _ = g[0],
                                k = T > 0 ? T / l.scrollRatio.y : 0,
                                S = _ > 0 ? _ / l.scrollRatio.y : 0
                    }
                    C[1] < 0 || 0 === C[0] && 0 === C[1] ? C = [0, 0] : C[1] >= w[1] ? C = [w[0], w[1]] : C[0] = -C[0], t[0].mcs || (s(), o("onInit") && c.callbacks.onInit.call(t[0])), clearTimeout(f[0].onCompleteTimeout), Y(y[0], b, Math.round(C[1]), u[1], r.scrollEasing), !l.tweenRunning && (0 === $ && C[0] >= 0 || $ === w[0] && C[0] <= w[0]) || Y(f[0], b, Math.round(C[0]), u[0], r.scrollEasing, r.overwrite, {
                        onStart: function() {
                            r.callbacks && r.onStart && !l.tweenRunning && (o("onScrollStart") && (s(), c.callbacks.onScrollStart.call(t[0])), l.tweenRunning = !0, x(y), l.cbOffsets = a())
                        },
                        onUpdate: function() {
                            r.callbacks && r.onUpdate && o("whileScrolling") && (s(), c.callbacks.whileScrolling.call(t[0]))
                        },
                        onComplete: function() {
                            if (r.callbacks && r.onComplete) {
                                "yx" === c.axis && clearTimeout(f[0].onCompleteTimeout);
                                var e = f[0].idleTimer || 0;
                                f[0].onCompleteTimeout = setTimeout(function() {
                                    o("onScroll") && (s(), c.callbacks.onScroll.call(t[0])), o("onTotalScroll") && C[1] >= w[1] - k && l.cbOffsets[0] && (s(), c.callbacks.onTotalScroll.call(t[0])), o("onTotalScrollBack") && C[1] <= S && l.cbOffsets[1] && (s(), c.callbacks.onTotalScrollBack.call(t[0])), l.tweenRunning = !1, f[0].idleTimer = 0, x(y, "hide")
                                }, e)
                            }
                        }
                    })
                }
            },
            Y = function(e, t, n, i, r, o, a) {
                function s() {
                    w.stop || (y || h.call(), y = K() - v, l(), y >= w.time && (w.time = y > w.time ? y + p - (y - w.time) : y + p - 1, w.time < y + 1 && (w.time = y + 1)), w.time < i ? w.id = f(s) : g.call())
                }

                function l() {
                    i > 0 ? (w.currVal = u(w.time, b, C, i, r), $[t] = Math.round(w.currVal) + "px") : $[t] = n + "px", m.call()
                }

                function c() {
                    p = 1e3 / 60, w.time = y + p, f = window.requestAnimationFrame ? window.requestAnimationFrame : function(e) {
                        return l(), setTimeout(e, .01)
                    }, w.id = f(s)
                }

                function d() {
                    null != w.id && (window.requestAnimationFrame ? window.cancelAnimationFrame(w.id) : clearTimeout(w.id), w.id = null)
                }

                function u(e, t, n, i, r) {
                    switch (r) {
                        case "linear":
                        case "mcsLinear":
                            return n * e / i + t;
                        case "mcsLinearOut":
                            return e /= i, e--, n * Math.sqrt(1 - e * e) + t;
                        case "easeInOutSmooth":
                            return e /= i / 2, 1 > e ? n / 2 * e * e + t : (e--, -n / 2 * (e * (e - 2) - 1) + t);
                        case "easeInOutStrong":
                            return e /= i / 2, 1 > e ? n / 2 * Math.pow(2, 10 * (e - 1)) + t : (e--, n / 2 * (-Math.pow(2, -10 * e) + 2) + t);
                        case "easeInOut":
                        case "mcsEaseInOut":
                            return e /= i / 2, 1 > e ? n / 2 * e * e * e + t : (e -= 2, n / 2 * (e * e * e + 2) + t);
                        case "easeOutSmooth":
                            return e /= i, e--, -n * (e * e * e * e - 1) + t;
                        case "easeOutStrong":
                            return n * (-Math.pow(2, -10 * e / i) + 1) + t;
                        case "easeOut":
                        case "mcsEaseOut":
                        default:
                            var o = (e /= i) * e,
                                a = o * e;
                            return t + n * (.499999999999997 * a * o + -2.5 * o * o + 5.5 * a + -6.5 * o + 4 * e)
                    }
                }
                e._mTween || (e._mTween = {
                    top: {},
                    left: {}
                });
                var p, f, a = a || {},
                    h = a.onStart || function() {},
                    m = a.onUpdate || function() {},
                    g = a.onComplete || function() {},
                    v = K(),
                    y = 0,
                    b = e.offsetTop,
                    $ = e.style,
                    w = e._mTween[t];
                "left" === t && (b = e.offsetLeft);
                var C = n - b;
                w.stop = 0, "none" !== o && d(), c()
            },
            K = function() {
                return window.performance && window.performance.now ? window.performance.now() : window.performance && window.performance.webkitNow ? window.performance.webkitNow() : Date.now ? Date.now() : (new Date).getTime()
            },
            J = function() {
                var e = this;
                e._mTween || (e._mTween = {
                    top: {},
                    left: {}
                });
                for (var t = ["top", "left"], n = 0; n < t.length; n++) {
                    var i = t[n];
                    e._mTween[i].id && (window.requestAnimationFrame ? window.cancelAnimationFrame(e._mTween[i].id) : clearTimeout(e._mTween[i].id), e._mTween[i].id = null, e._mTween[i].stop = 1)
                }
            },
            Z = function(e, t) {
                try {
                    delete e[t]
                } catch (n) {
                    e[t] = null
                }
            },
            ee = function(e) {
                return !(e.which && 1 !== e.which)
            },
            te = function(e) {
                var t = e.originalEvent.pointerType;
                return !(t && "touch" !== t && 2 !== t)
            },
            ne = function(e) {
                return !isNaN(parseFloat(e)) && isFinite(e)
            },
            ie = function(e) {
                var t = e.parents(".mCSB_container");
                return [e.offset().top - t.offset().top, e.offset().left - t.offset().left]
            },
            re = function() {
                function e() {
                    var e = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document) return "hidden";
                    for (var t = 0; t < e.length; t++)
                        if (e[t] + "Hidden" in document) return e[t] + "Hidden";
                    return null
                }
                var t = e();
                return !!t && document[t]
            };
        e.fn[n] = function(t) {
            return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist") : u.init.apply(this, arguments)
        }, e[n] = function(t) {
            return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist") : u.init.apply(this, arguments)
        }, e[n].defaults = o, window[n] = !0, e(window).bind("load", function() {
            e(r)[n](), e.extend(e.expr[":"], {
                mcsInView: e.expr[":"].mcsInView || function(t) {
                    var n, i, r = e(t),
                        o = r.parents(".mCSB_container");
                    if (o.length) return n = o.parent(), i = [o[0].offsetTop, o[0].offsetLeft], i[0] + ie(r)[0] >= 0 && i[0] + ie(r)[0] < n.height() - r.outerHeight(!1) && i[1] + ie(r)[1] >= 0 && i[1] + ie(r)[1] < n.width() - r.outerWidth(!1)
                },
                mcsInSight: e.expr[":"].mcsInSight || function(t, n, i) {
                    var r, o, a, s, l = e(t),
                        c = l.parents(".mCSB_container"),
                        d = "exact" === i[3] ? [
                            [1, 0],
                            [1, 0]
                        ] : [
                            [.9, .1],
                            [.6, .4]
                        ];
                    if (c.length) return r = [l.outerHeight(!1), l.outerWidth(!1)], a = [c[0].offsetTop + ie(l)[0], c[0].offsetLeft + ie(l)[1]], o = [c.parent()[0].offsetHeight, c.parent()[0].offsetWidth], s = [r[0] < o[0] ? d[0] : d[1], r[1] < o[1] ? d[0] : d[1]], a[0] - o[0] * s[0][0] < 0 && a[0] + r[0] - o[0] * s[0][1] >= 0 && a[1] - o[1] * s[1][0] < 0 && a[1] + r[1] - o[1] * s[1][1] >= 0
                },
                mcsOverflow: e.expr[":"].mcsOverflow || function(t) {
                    var n = e(t).data(i);
                    if (n) return n.overflowed[0] || n.overflowed[1]
                }
            })
        })
    })
}), ! function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof module && module.exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(e) {
    e.extend(e.fn, {
        validate: function(t) {
            if (!this.length) return void(t && t.debug && window.console && void 0);
            var n = e.data(this[0], "validator");
            return n ? n : (this.attr("novalidate", "novalidate"), n = new e.validator(t, this[0]), e.data(this[0], "validator", n), n.settings.onsubmit && (this.on("click.validate", ":submit", function(t) {
                n.settings.submitHandler && (n.submitButton = t.target), e(this).hasClass("cancel") && (n.cancelSubmit = !0), void 0 !== e(this).attr("formnovalidate") && (n.cancelSubmit = !0)
            }), this.on("submit.validate", function(t) {
                function i() {
                    var i, r;
                    return !n.settings.submitHandler || (n.submitButton && (i = e("<input type='hidden'/>").attr("name", n.submitButton.name).val(e(n.submitButton).val()).appendTo(n.currentForm)), r = n.settings.submitHandler.call(n, n.currentForm, t), n.submitButton && i.remove(), void 0 !== r && r)
                }
                return n.settings.debug && t.preventDefault(), n.cancelSubmit ? (n.cancelSubmit = !1, i()) : n.form() ? n.pendingRequest ? (n.formSubmitted = !0, !1) : i() : (n.focusInvalid(), !1)
            })), n)
        },
        valid: function() {
            var t, n, i;
            return e(this[0]).is("form") ? t = this.validate().form() : (i = [], t = !0, n = e(this[0].form).validate(), this.each(function() {
                t = n.element(this) && t, t || (i = i.concat(n.errorList))
            }), n.errorList = i), t
        },
        rules: function(t, n) {
            if (this.length) {
                var i, r, o, a, s, l, c = this[0];
                if (t) switch (i = e.data(c.form, "validator").settings, r = i.rules, o = e.validator.staticRules(c), t) {
                    case "add":
                        e.extend(o, e.validator.normalizeRule(n)), delete o.messages, r[c.name] = o, n.messages && (i.messages[c.name] = e.extend(i.messages[c.name], n.messages));
                        break;
                    case "remove":
                        return n ? (l = {}, e.each(n.split(/\s/), function(t, n) {
                            l[n] = o[n], delete o[n], "required" === n && e(c).removeAttr("aria-required")
                        }), l) : (delete r[c.name], o)
                }
                return a = e.validator.normalizeRules(e.extend({}, e.validator.classRules(c), e.validator.attributeRules(c), e.validator.dataRules(c), e.validator.staticRules(c)), c), a.required && (s = a.required, delete a.required, a = e.extend({
                    required: s
                }, a), e(c).attr("aria-required", "true")), a.remote && (s = a.remote, delete a.remote, a = e.extend(a, {
                    remote: s
                })), a
            }
        }
    }), e.extend(e.expr[":"], {
        blank: function(t) {
            return !e.trim("" + e(t).val())
        },
        filled: function(t) {
            var n = e(t).val();
            return null !== n && !!e.trim("" + n)
        },
        unchecked: function(t) {
            return !e(t).prop("checked")
        }
    }), e.validator = function(t, n) {
        this.settings = e.extend(!0, {}, e.validator.defaults, t), this.currentForm = n, this.init()
    }, e.validator.format = function(t, n) {
        return 1 === arguments.length ? function() {
            var n = e.makeArray(arguments);
            return n.unshift(t), e.validator.format.apply(this, n)
        } : void 0 === n ? t : (arguments.length > 2 && n.constructor !== Array && (n = e.makeArray(arguments).slice(1)), n.constructor !== Array && (n = [n]), e.each(n, function(e, n) {
            t = t.replace(new RegExp("\\{" + e + "\\}", "g"), function() {
                return n
            })
        }), t)
    }, e.extend(e.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            pendingClass: "pending",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: !1,
            focusInvalid: !0,
            errorContainer: e([]),
            errorLabelContainer: e([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(e) {
                this.lastActive = e, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, e, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(e)))
            },
            onfocusout: function(e) {
                this.checkable(e) || !(e.name in this.submitted) && this.optional(e) || this.element(e)
            },
            onkeyup: function(t, n) {
                var i = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
                9 === n.which && "" === this.elementValue(t) || -1 !== e.inArray(n.keyCode, i) || (t.name in this.submitted || t.name in this.invalid) && this.element(t)
            },
            onclick: function(e) {
                e.name in this.submitted ? this.element(e) : e.parentNode.name in this.submitted && this.element(e.parentNode)
            },
            highlight: function(t, n, i) {
                "radio" === t.type ? this.findByName(t.name).addClass(n).removeClass(i) : e(t).addClass(n).removeClass(i)
            },
            unhighlight: function(t, n, i) {
                "radio" === t.type ? this.findByName(t.name).removeClass(n).addClass(i) : e(t).removeClass(n).addClass(i)
            }
        },
        setDefaults: function(t) {
            e.extend(e.validator.defaults, t)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date ( ISO ).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            equalTo: "Please enter the same value again.",
            maxlength: e.validator.format("Please enter no more than {0} characters."),
            minlength: e.validator.format("Please enter at least {0} characters."),
            rangelength: e.validator.format("Please enter a value between {0} and {1} characters long."),
            range: e.validator.format("Please enter a value between {0} and {1}."),
            max: e.validator.format("Please enter a value less than or equal to {0}."),
            min: e.validator.format("Please enter a value greater than or equal to {0}."),
            step: e.validator.format("Please enter a multiple of {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function t(t) {
                    var n = e.data(this.form, "validator"),
                        i = "on" + t.type.replace(/^validate/, ""),
                        r = n.settings;
                    r[i] && !e(this).is(r.ignore) && r[i].call(n, this, t)
                }
                this.labelContainer = e(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || e(this.currentForm), this.containers = e(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var n, i = this.groups = {};
                e.each(this.settings.groups, function(t, n) {
                    "string" == typeof n && (n = n.split(/\s/)), e.each(n, function(e, n) {
                        i[n] = t
                    })
                }), n = this.settings.rules, e.each(n, function(t, i) {
                    n[t] = e.validator.normalizeRule(i)
                }), e(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable]", t).on("click.validate", "select, option, [type='radio'], [type='checkbox']", t), this.settings.invalidHandler && e(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler), e(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
            },
            form: function() {
                return this.checkForm(), e.extend(this.submitted, this.errorMap), this.invalid = e.extend({}, this.errorMap), this.valid() || e(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var e = 0, t = this.currentElements = this.elements(); t[e]; e++) this.check(t[e]);
                return this.valid()
            },
            element: function(t) {
                var n, i, r = this.clean(t),
                    o = this.validationTargetFor(r),
                    a = this,
                    s = !0;
                return void 0 === o ? delete this.invalid[r.name] : (this.prepareElement(o), this.currentElements = e(o), i = this.groups[o.name], i && e.each(this.groups, function(e, t) {
                    t === i && e !== o.name && (r = a.validationTargetFor(a.clean(a.findByName(e))), r && r.name in a.invalid && (a.currentElements.push(r), s = s && a.check(r)))
                }), n = this.check(o) !== !1, s = s && n, n ? this.invalid[o.name] = !1 : this.invalid[o.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), e(t).attr("aria-invalid", !n)), s
            },
            showErrors: function(t) {
                if (t) {
                    var n = this;
                    e.extend(this.errorMap, t), this.errorList = e.map(this.errorMap, function(e, t) {
                        return {
                            message: e,
                            element: n.findByName(t)[0]
                        }
                    }), this.successList = e.grep(this.successList, function(e) {
                        return !(e.name in t)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                e.fn.resetForm && e(this.currentForm).resetForm(), this.invalid = {}, this.submitted = {}, this.prepareForm(), this.hideErrors();
                var t = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                this.resetElements(t)
            },
            resetElements: function(e) {
                var t;
                if (this.settings.unhighlight)
                    for (t = 0; e[t]; t++) this.settings.unhighlight.call(this, e[t], this.settings.errorClass, ""), this.findByName(e[t].name).removeClass(this.settings.validClass);
                else e.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(e) {
                var t, n = 0;
                for (t in e) e[t] && n++;
                return n
            },
            hideErrors: function() {
                this.hideThese(this.toHide)
            },
            hideThese: function(e) {
                e.not(this.containers).text(""), this.addWrapper(e).hide()
            },
            valid: function() {
                return 0 === this.size()
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) try {
                    e(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (t) {}
            },
            findLastActive: function() {
                var t = this.lastActive;
                return t && 1 === e.grep(this.errorList, function(e) {
                    return e.element.name === t.name
                }).length && t
            },
            elements: function() {
                var t = this,
                    n = {};
                return e(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function() {
                    var i = this.name || e(this).attr("name");
                    return !i && t.settings.debug && window.console && void 0, this.hasAttribute("contenteditable") && (this.form = e(this).closest("form")[0]), !(i in n || !t.objectLength(e(this).rules())) && (n[i] = !0, !0)
                })
            },
            clean: function(t) {
                return e(t)[0]
            },
            errors: function() {
                var t = this.settings.errorClass.split(" ").join(".");
                return e(this.settings.errorElement + "." + t, this.errorContext)
            },
            resetInternals: function() {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = e([]), this.toHide = e([])
            },
            reset: function() {
                this.resetInternals(), this.currentElements = e([])
            },
            prepareForm: function() {
                this.reset(), this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(e) {
                this.reset(), this.toHide = this.errorsFor(e)
            },
            elementValue: function(t) {
                var n, i, r = e(t),
                    o = t.type;
                return "radio" === o || "checkbox" === o ? this.findByName(t.name).filter(":checked").val() : "number" === o && "undefined" != typeof t.validity ? t.validity.badInput ? "NaN" : r.val() : (n = t.hasAttribute("contenteditable") ? r.text() : r.val(), "file" === o ? "C:\\fakepath\\" === n.substr(0, 12) ? n.substr(12) : (i = n.lastIndexOf("/"), i >= 0 ? n.substr(i + 1) : (i = n.lastIndexOf("\\"), i >= 0 ? n.substr(i + 1) : n)) : "string" == typeof n ? n.replace(/\r/g, "") : n)
            },
            check: function(t) {
                t = this.validationTargetFor(this.clean(t));
                var n, i, r, o = e(t).rules(),
                    a = e.map(o, function(e, t) {
                        return t
                    }).length,
                    s = !1,
                    l = this.elementValue(t);
                if ("function" == typeof o.normalizer) {
                    if (l = o.normalizer.call(t, l), "string" != typeof l) throw new TypeError("The normalizer should return a string value.");
                    delete o.normalizer
                }
                for (i in o) {
                    r = {
                        method: i,
                        parameters: o[i]
                    };
                    try {
                        if (n = e.validator.methods[i].call(this, l, t, r.parameters), "dependency-mismatch" === n && 1 === a) {
                            s = !0;
                            continue
                        }
                        if (s = !1, "pending" === n) return void(this.toHide = this.toHide.not(this.errorsFor(t)));
                        if (!n) return this.formatAndAdd(t, r), !1
                    } catch (c) {
                        throw this.settings.debug && window.console && void 0, c instanceof TypeError && (c.message += ".  Exception occurred when checking element " + t.id + ", check the '" + r.method + "' method."), c
                    }
                }
                if (!s) return this.objectLength(o) && this.successList.push(t), !0
            },
            customDataMessage: function(t, n) {
                return e(t).data("msg" + n.charAt(0).toUpperCase() + n.substring(1).toLowerCase()) || e(t).data("msg")
            },
            customMessage: function(e, t) {
                var n = this.settings.messages[e];
                return n && (n.constructor === String ? n : n[t])
            },
            findDefined: function() {
                for (var e = 0; e < arguments.length; e++)
                    if (void 0 !== arguments[e]) return arguments[e]
            },
            defaultMessage: function(t, n) {
                var i = this.findDefined(this.customMessage(t.name, n.method), this.customDataMessage(t, n.method), !this.settings.ignoreTitle && t.title || void 0, e.validator.messages[n.method], "<strong>Warning: No message defined for " + t.name + "</strong>"),
                    r = /\$?\{(\d+)\}/g;
                return "function" == typeof i ? i = i.call(this, n.parameters, t) : r.test(i) && (i = e.validator.format(i.replace(r, "{$1}"), n.parameters)), i
            },
            formatAndAdd: function(e, t) {
                var n = this.defaultMessage(e, t);
                this.errorList.push({
                    message: n,
                    element: e,
                    method: t.method
                }), this.errorMap[e.name] = n, this.submitted[e.name] = n
            },
            addWrapper: function(e) {
                return this.settings.wrapper && (e = e.add(e.parent(this.settings.wrapper))), e
            },
            defaultShowErrors: function() {
                var e, t, n;
                for (e = 0; this.errorList[e]; e++) n = this.errorList[e], this.settings.highlight && this.settings.highlight.call(this, n.element, this.settings.errorClass, this.settings.validClass), this.showLabel(n.element, n.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (e = 0; this.successList[e]; e++) this.showLabel(this.successList[e]);
                if (this.settings.unhighlight)
                    for (e = 0, t = this.validElements(); t[e]; e++) this.settings.unhighlight.call(this, t[e], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return e(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(t, n) {
                var i, r, o, a, s = this.errorsFor(t),
                    l = this.idOrName(t),
                    c = e(t).attr("aria-describedby");
                s.length ? (s.removeClass(this.settings.validClass).addClass(this.settings.errorClass), s.html(n)) : (s = e("<" + this.settings.errorElement + ">").attr("id", l + "-error").addClass(this.settings.errorClass).html(n || ""), i = s, this.settings.wrapper && (i = s.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(i) : this.settings.errorPlacement ? this.settings.errorPlacement(i, e(t)) : i.insertAfter(t), s.is("label") ? s.attr("for", l) : 0 === s.parents("label[for='" + this.escapeCssMeta(l) + "']").length && (o = s.attr("id"), c ? c.match(new RegExp("\\b" + this.escapeCssMeta(o) + "\\b")) || (c += " " + o) : c = o, e(t).attr("aria-describedby", c), r = this.groups[t.name], r && (a = this, e.each(a.groups, function(t, n) {
                    n === r && e("[name='" + a.escapeCssMeta(t) + "']", a.currentForm).attr("aria-describedby", s.attr("id"))
                })))), !n && this.settings.success && (s.text(""), "string" == typeof this.settings.success ? s.addClass(this.settings.success) : this.settings.success(s, t)), this.toShow = this.toShow.add(s)
            },
            errorsFor: function(t) {
                var n = this.escapeCssMeta(this.idOrName(t)),
                    i = e(t).attr("aria-describedby"),
                    r = "label[for='" + n + "'], label[for='" + n + "'] *";
                return i && (r = r + ", #" + this.escapeCssMeta(i).replace(/\s+/g, ", #")),
                    this.errors().filter(r)
            },
            escapeCssMeta: function(e) {
                return e.replace(/([\\!"#$%&'()*+,.\/:;<=>?@\[\]^`{|}~])/g, "\\$1")
            },
            idOrName: function(e) {
                return this.groups[e.name] || (this.checkable(e) ? e.name : e.id || e.name)
            },
            validationTargetFor: function(t) {
                return this.checkable(t) && (t = this.findByName(t.name)), e(t).not(this.settings.ignore)[0]
            },
            checkable: function(e) {
                return /radio|checkbox/i.test(e.type)
            },
            findByName: function(t) {
                return e(this.currentForm).find("[name='" + this.escapeCssMeta(t) + "']")
            },
            getLength: function(t, n) {
                switch (n.nodeName.toLowerCase()) {
                    case "select":
                        return e("option:selected", n).length;
                    case "input":
                        if (this.checkable(n)) return this.findByName(n.name).filter(":checked").length
                }
                return t.length
            },
            depend: function(e, t) {
                return !this.dependTypes[typeof e] || this.dependTypes[typeof e](e, t)
            },
            dependTypes: {
                "boolean": function(e) {
                    return e
                },
                string: function(t, n) {
                    return !!e(t, n.form).length
                },
                "function": function(e, t) {
                    return e(t)
                }
            },
            optional: function(t) {
                var n = this.elementValue(t);
                return !e.validator.methods.required.call(this, n, t) && "dependency-mismatch"
            },
            startRequest: function(t) {
                this.pending[t.name] || (this.pendingRequest++, e(t).addClass(this.settings.pendingClass), this.pending[t.name] = !0)
            },
            stopRequest: function(t, n) {
                this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[t.name], e(t).removeClass(this.settings.pendingClass), n && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (e(this.currentForm).submit(), this.formSubmitted = !1) : !n && 0 === this.pendingRequest && this.formSubmitted && (e(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            },
            previousValue: function(t, n) {
                return e.data(t, "previousValue") || e.data(t, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(t, {
                        method: n
                    })
                })
            },
            destroy: function() {
                this.resetForm(), e(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur")
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(t, n) {
            t.constructor === String ? this.classRuleSettings[t] = n : e.extend(this.classRuleSettings, t)
        },
        classRules: function(t) {
            var n = {},
                i = e(t).attr("class");
            return i && e.each(i.split(" "), function() {
                this in e.validator.classRuleSettings && e.extend(n, e.validator.classRuleSettings[this])
            }), n
        },
        normalizeAttributeRule: function(e, t, n, i) {
            /min|max|step/.test(n) && (null === t || /number|range|text/.test(t)) && (i = Number(i), isNaN(i) && (i = void 0)), i || 0 === i ? e[n] = i : t === n && "range" !== t && (e[n] = !0)
        },
        attributeRules: function(t) {
            var n, i, r = {},
                o = e(t),
                a = t.getAttribute("type");
            for (n in e.validator.methods) "required" === n ? (i = t.getAttribute(n), "" === i && (i = !0), i = !!i) : i = o.attr(n), this.normalizeAttributeRule(r, a, n, i);
            return r.maxlength && /-1|2147483647|524288/.test(r.maxlength) && delete r.maxlength, r
        },
        dataRules: function(t) {
            var n, i, r = {},
                o = e(t),
                a = t.getAttribute("type");
            for (n in e.validator.methods) i = o.data("rule" + n.charAt(0).toUpperCase() + n.substring(1).toLowerCase()), this.normalizeAttributeRule(r, a, n, i);
            return r
        },
        staticRules: function(t) {
            var n = {},
                i = e.data(t.form, "validator");
            return i.settings.rules && (n = e.validator.normalizeRule(i.settings.rules[t.name]) || {}), n
        },
        normalizeRules: function(t, n) {
            return e.each(t, function(i, r) {
                if (r === !1) return void delete t[i];
                if (r.param || r.depends) {
                    var o = !0;
                    switch (typeof r.depends) {
                        case "string":
                            o = !!e(r.depends, n.form).length;
                            break;
                        case "function":
                            o = r.depends.call(n, n)
                    }
                    o ? t[i] = void 0 === r.param || r.param : (e.data(n.form, "validator").resetElements(e(n)), delete t[i])
                }
            }), e.each(t, function(i, r) {
                t[i] = e.isFunction(r) && "normalizer" !== i ? r(n) : r
            }), e.each(["minlength", "maxlength"], function() {
                t[this] && (t[this] = Number(t[this]))
            }), e.each(["rangelength", "range"], function() {
                var n;
                t[this] && (e.isArray(t[this]) ? t[this] = [Number(t[this][0]), Number(t[this][1])] : "string" == typeof t[this] && (n = t[this].replace(/[\[\]]/g, "").split(/[\s,]+/), t[this] = [Number(n[0]), Number(n[1])]))
            }), e.validator.autoCreateRanges && (null != t.min && null != t.max && (t.range = [t.min, t.max], delete t.min, delete t.max), null != t.minlength && null != t.maxlength && (t.rangelength = [t.minlength, t.maxlength], delete t.minlength, delete t.maxlength)), t
        },
        normalizeRule: function(t) {
            if ("string" == typeof t) {
                var n = {};
                e.each(t.split(/\s/), function() {
                    n[this] = !0
                }), t = n
            }
            return t
        },
        addMethod: function(t, n, i) {
            e.validator.methods[t] = n, e.validator.messages[t] = void 0 !== i ? i : e.validator.messages[t], n.length < 3 && e.validator.addClassRules(t, e.validator.normalizeRule(t))
        },
        methods: {
            required: function(t, n, i) {
                if (!this.depend(i, n)) return "dependency-mismatch";
                if ("select" === n.nodeName.toLowerCase()) {
                    var r = e(n).val();
                    return r && r.length > 0
                }
                return this.checkable(n) ? this.getLength(t, n) > 0 : t.length > 0
            },
            email: function(e, t) {
                return this.optional(t) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(e)
            },
            url: function(e, t) {
                return this.optional(t) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(e)
            },
            date: function(e, t) {
                return this.optional(t) || !/Invalid|NaN/.test(new Date(e).toString())
            },
            dateISO: function(e, t) {
                return this.optional(t) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(e)
            },
            number: function(e, t) {
                return this.optional(t) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e)
            },
            digits: function(e, t) {
                return this.optional(t) || /^\d+$/.test(e)
            },
            minlength: function(t, n, i) {
                var r = e.isArray(t) ? t.length : this.getLength(t, n);
                return this.optional(n) || r >= i
            },
            maxlength: function(t, n, i) {
                var r = e.isArray(t) ? t.length : this.getLength(t, n);
                return this.optional(n) || i >= r
            },
            rangelength: function(t, n, i) {
                var r = e.isArray(t) ? t.length : this.getLength(t, n);
                return this.optional(n) || r >= i[0] && r <= i[1]
            },
            min: function(e, t, n) {
                return this.optional(t) || e >= n
            },
            max: function(e, t, n) {
                return this.optional(t) || n >= e
            },
            range: function(e, t, n) {
                return this.optional(t) || e >= n[0] && e <= n[1]
            },
            step: function(t, n, i) {
                var r = e(n).attr("type"),
                    o = "Step attribute on input type " + r + " is not supported.",
                    a = ["text", "number", "range"],
                    s = new RegExp("\\b" + r + "\\b"),
                    l = r && !s.test(a.join());
                if (l) throw new Error(o);
                return this.optional(n) || t % i === 0
            },
            equalTo: function(t, n, i) {
                var r = e(i);
                return this.settings.onfocusout && r.not(".validate-equalTo-blur").length && r.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function() {
                    e(n).valid()
                }), t === r.val()
            },
            remote: function(t, n, i, r) {
                if (this.optional(n)) return "dependency-mismatch";
                r = "string" == typeof r && r || "remote";
                var o, a, s, l = this.previousValue(n, r);
                return this.settings.messages[n.name] || (this.settings.messages[n.name] = {}), l.originalMessage = l.originalMessage || this.settings.messages[n.name][r], this.settings.messages[n.name][r] = l.message, i = "string" == typeof i && {
                    url: i
                } || i, s = e.param(e.extend({
                    data: t
                }, i.data)), l.old === s ? l.valid : (l.old = s, o = this, this.startRequest(n), a = {}, a[n.name] = t, e.ajax(e.extend(!0, {
                    mode: "abort",
                    port: "validate" + n.name,
                    dataType: "json",
                    data: a,
                    context: o.currentForm,
                    success: function(e) {
                        var i, a, s, c = e === !0 || "true" === e;
                        o.settings.messages[n.name][r] = l.originalMessage, c ? (s = o.formSubmitted, o.resetInternals(), o.toHide = o.errorsFor(n), o.formSubmitted = s, o.successList.push(n), o.invalid[n.name] = !1, o.showErrors()) : (i = {}, a = e || o.defaultMessage(n, {
                            method: r,
                            parameters: t
                        }), i[n.name] = l.message = a, o.invalid[n.name] = !0, o.showErrors(i)), l.valid = c, o.stopRequest(n, c)
                    }
                }, i)), "pending")
            }
        }
    });
    var t, n = {};
    e.ajaxPrefilter ? e.ajaxPrefilter(function(e, t, i) {
        var r = e.port;
        "abort" === e.mode && (n[r] && n[r].abort(), n[r] = i)
    }) : (t = e.ajax, e.ajax = function(i) {
        var r = ("mode" in i ? i : e.ajaxSettings).mode,
            o = ("port" in i ? i : e.ajaxSettings).port;
        return "abort" === r ? (n[o] && n[o].abort(), n[o] = t.apply(this, arguments), n[o]) : t.apply(this, arguments)
    })
}),
function(e, t, n) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(t || n)
}(function(e) {
    var t = function(t, n, i) {
        var r = {
            invalid: [],
            getCaret: function() {
                try {
                    var e, n = 0,
                        i = t.get(0),
                        o = document.selection,
                        a = i.selectionStart;
                    return o && navigator.appVersion.indexOf("MSIE 10") === -1 ? (e = o.createRange(), e.moveStart("character", -r.val().length), n = e.text.length) : (a || "0" === a) && (n = a), n
                } catch (s) {}
            },
            setCaret: function(e) {
                try {
                    if (t.is(":focus")) {
                        var n, i = t.get(0);
                        i.setSelectionRange ? (i.focus(), i.setSelectionRange(e, e)) : (n = i.createTextRange(), n.collapse(!0), n.moveEnd("character", e), n.moveStart("character", e), n.select())
                    }
                } catch (r) {}
            },
            events: function() {
                t.on("keydown.mask", function(e) {
                    t.data("mask-keycode", e.keyCode || e.which)
                }).on(e.jMaskGlobals.useInput ? "input.mask" : "keyup.mask", r.behaviour).on("paste.mask drop.mask", function() {
                    setTimeout(function() {
                        t.keydown().keyup()
                    }, 100)
                }).on("change.mask", function() {
                    t.data("changed", !0)
                }).on("blur.mask", function() {
                    s === r.val() || t.data("changed") || t.trigger("change"), t.data("changed", !1)
                }).on("blur.mask", function() {
                    s = r.val()
                }).on("focus.mask", function(t) {
                    i.selectOnFocus === !0 && e(t.target).select()
                }).on("focusout.mask", function() {
                    i.clearIfNotMatch && !o.test(r.val()) && r.val("")
                })
            },
            getRegexMask: function() {
                for (var e, t, i, r, o, s, l = [], c = 0; c < n.length; c++) e = a.translation[n.charAt(c)], e ? (t = e.pattern.toString().replace(/.{1}$|^.{1}/g, ""), i = e.optional, r = e.recursive, r ? (l.push(n.charAt(c)), o = {
                    digit: n.charAt(c),
                    pattern: t
                }) : l.push(i || r ? t + "?" : t)) : l.push(n.charAt(c).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
                return s = l.join(""), o && (s = s.replace(new RegExp("(" + o.digit + "(.*" + o.digit + ")?)"), "($1)?").replace(new RegExp(o.digit, "g"), o.pattern)), new RegExp(s)
            },
            destroyEvents: function() {
                t.off(["input", "keydown", "keyup", "paste", "drop", "blur", "focusout", ""].join(".mask "))
            },
            val: function(e) {
                var n, i = t.is("input"),
                    r = i ? "val" : "text";
                return arguments.length > 0 ? (t[r]() !== e && t[r](e), n = t) : n = t[r](), n
            },
            getMCharsBeforeCount: function(e, t) {
                for (var i = 0, r = 0, o = n.length; r < o && r < e; r++) a.translation[n.charAt(r)] || (e = t ? e + 1 : e, i++);
                return i
            },
            caretPos: function(e, t, i, o) {
                var s = a.translation[n.charAt(Math.min(e - 1, n.length - 1))];
                return s ? Math.min(e + i - t - o, i) : r.caretPos(e + 1, t, i, o)
            },
            behaviour: function(n) {
                n = n || window.event, r.invalid = [];
                var i = t.data("mask-keycode");
                if (e.inArray(i, a.byPassKeys) === -1) {
                    var o = r.getCaret(),
                        s = r.val(),
                        l = s.length,
                        c = r.getMasked(),
                        d = c.length,
                        u = r.getMCharsBeforeCount(d - 1) - r.getMCharsBeforeCount(l - 1),
                        p = o < l;
                    return r.val(c), p && (8 !== i && 46 !== i && (o = r.caretPos(o, l, d, u)), r.setCaret(o)), r.callbacks(n)
                }
            },
            getMasked: function(e, t) {
                var o, s, l = [],
                    c = void 0 === t ? r.val() : t + "",
                    d = 0,
                    u = n.length,
                    p = 0,
                    f = c.length,
                    h = 1,
                    m = "push",
                    g = -1;
                for (i.reverse ? (m = "unshift", h = -1, o = 0, d = u - 1, p = f - 1, s = function() {
                        return d > -1 && p > -1
                    }) : (o = u - 1, s = function() {
                        return d < u && p < f
                    }); s();) {
                    var v = n.charAt(d),
                        y = c.charAt(p),
                        b = a.translation[v];
                    b ? (y.match(b.pattern) ? (l[m](y), b.recursive && (g === -1 ? g = d : d === o && (d = g - h), o === g && (d -= h)), d += h) : b.optional ? (d += h, p -= h) : b.fallback ? (l[m](b.fallback), d += h, p -= h) : r.invalid.push({
                        p: p,
                        v: y,
                        e: b.pattern
                    }), p += h) : (e || l[m](v), y === v && (p += h), d += h)
                }
                var $ = n.charAt(o);
                return u !== f + 1 || a.translation[$] || l.push($), l.join("")
            },
            callbacks: function(e) {
                var o = r.val(),
                    a = o !== s,
                    l = [o, e, t, i],
                    c = function(e, t, n) {
                        "function" == typeof i[e] && t && i[e].apply(this, n)
                    };
                c("onChange", a === !0, l), c("onKeyPress", a === !0, l), c("onComplete", o.length === n.length, l), c("onInvalid", r.invalid.length > 0, [o, e, t, r.invalid, i])
            }
        };
        t = e(t);
        var o, a = this,
            s = r.val();
        n = "function" == typeof n ? n(r.val(), void 0, t, i) : n, a.mask = n, a.options = i, a.remove = function() {
            var e = r.getCaret();
            return r.destroyEvents(), r.val(a.getCleanVal()), r.setCaret(e - r.getMCharsBeforeCount(e)), t
        }, a.getCleanVal = function() {
            return r.getMasked(!0)
        }, a.getMaskedVal = function(e) {
            return r.getMasked(!1, e)
        }, a.init = function(n) {
            if (n = n || !1, i = i || {}, a.clearIfNotMatch = e.jMaskGlobals.clearIfNotMatch, a.byPassKeys = e.jMaskGlobals.byPassKeys, a.translation = e.extend({}, e.jMaskGlobals.translation, i.translation), a = e.extend(!0, {}, a, i), o = r.getRegexMask(), n === !1) {
                i.placeholder && t.attr("placeholder", i.placeholder), t.data("mask") && t.attr("autocomplete", "off"), r.destroyEvents(), r.events();
                var s = r.getCaret();
                r.val(r.getMasked()), r.setCaret(s + r.getMCharsBeforeCount(s, !0))
            } else r.events(), r.val(r.getMasked())
        }, a.init(!t.is("input"))
    };
    e.maskWatchers = {};
    var n = function() {
            var n = e(this),
                r = {},
                o = "data-mask-",
                a = n.attr("data-mask");
            if (n.attr(o + "reverse") && (r.reverse = !0), n.attr(o + "clearifnotmatch") && (r.clearIfNotMatch = !0), "true" === n.attr(o + "selectonfocus") && (r.selectOnFocus = !0), i(n, a, r)) return n.data("mask", new t(this, a, r))
        },
        i = function(t, n, i) {
            i = i || {};
            var r = e(t).data("mask"),
                o = JSON.stringify,
                a = e(t).val() || e(t).text();
            try {
                return "function" == typeof n && (n = n(a)), "object" != typeof r || o(r.options) !== o(i) || r.mask !== n
            } catch (s) {}
        },
        r = function(e) {
            var t, n = document.createElement("div");
            return e = "on" + e, t = e in n, t || (n.setAttribute(e, "return;"), t = "function" == typeof n[e]), n = null, t
        };
    e.fn.mask = function(n, r) {
        r = r || {};
        var o = this.selector,
            a = e.jMaskGlobals,
            s = a.watchInterval,
            l = r.watchInputs || a.watchInputs,
            c = function() {
                if (i(this, n, r)) return e(this).data("mask", new t(this, n, r))
            };
        return e(this).each(c), o && "" !== o && l && (clearInterval(e.maskWatchers[o]), e.maskWatchers[o] = setInterval(function() {
            e(document).find(o).each(c)
        }, s)), this
    }, e.fn.masked = function(e) {
        return this.data("mask").getMaskedVal(e)
    }, e.fn.unmask = function() {
        return clearInterval(e.maskWatchers[this.selector]), delete e.maskWatchers[this.selector], this.each(function() {
            var t = e(this).data("mask");
            t && t.remove().removeData("mask")
        })
    }, e.fn.cleanVal = function() {
        return this.data("mask").getCleanVal()
    }, e.applyDataMask = function(t) {
        t = t || e.jMaskGlobals.maskElements;
        var i = t instanceof e ? t : e(t);
        i.filter(e.jMaskGlobals.dataMaskAttr).each(n)
    };
    var o = {
        maskElements: "input,td,span,div",
        dataMaskAttr: "*[data-mask]",
        dataMask: !0,
        watchInterval: 300,
        watchInputs: !0,
        useInput: r("input"),
        watchDataMask: !1,
        byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
        translation: {
            0: {
                pattern: /\d/
            },
            9: {
                pattern: /\d/,
                optional: !0
            },
            "#": {
                pattern: /\d/,
                recursive: !0
            },
            A: {
                pattern: /[a-zA-Z0-9]/
            },
            S: {
                pattern: /[a-zA-Z]/
            }
        }
    };
    e.jMaskGlobals = e.jMaskGlobals || {}, o = e.jMaskGlobals = e.extend(!0, {}, o, e.jMaskGlobals), o.dataMask && e.applyDataMask(), setInterval(function() {
        e.jMaskGlobals.watchDataMask && e.applyDataMask()
    }, o.watchInterval)
}, window.jQuery, window.Zepto),
function(e, t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(e.jQuery)
}(this, function(e) {
    function t() {
        var e = document.createElement("smartbanner"),
            t = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var n in t)
            if (void 0 !== e.style[n]) return {
                end: t[n]
            };
        return !1
    }
    var n = navigator.userAgent,
        i = /Edge/i.test(n),
        r = function(t) {
            this.origHtmlMargin = parseFloat(e("html").css("margin-top")), this.options = e.extend({}, e.smartbanner.defaults, t);
            var r = navigator.standalone;
            if (this.options.force ? this.type = this.options.force : null !== n.match(/Windows Phone/i) && null !== n.match(/Edge|Touch/i) ? this.type = "windows" : null !== n.match(/iPhone|iPod/i) || n.match(/iPad/) && this.options.iOSUniversalApp ? this.type = "ios" : n.match(/\bSilk\/(.*\bMobile Safari\b)?/) || n.match(/\bKF\w/) || n.match("Kindle Fire") ? this.type = "kindle" : null !== n.match(/Android/i) && (this.type = "android"), this.type && !r && !this.getCookie("sb-closed") && !this.getCookie("sb-installed")) {
                this.scale = "auto" == this.options.scale ? e(window).width() / window.screen.width : this.options.scale, this.scale < 1 && (this.scale = 1);
                var o = e("android" == this.type ? 'meta[name="google-play-app"]' : "ios" == this.type ? 'meta[name="apple-itunes-app"]' : "kindle" == this.type ? 'meta[name="kindle-fire-app"]' : 'meta[name="msApplication-ID"]');
                if (o.length) {
                    if ("windows" == this.type) i && (this.appId = e('meta[name="msApplication-PackageEdgeName"]').attr("content")), this.appId || (this.appId = e('meta[name="msApplication-PackageFamilyName"]').attr("content"));
                    else {
                        var a = /app-id=([^\s,]+)/.exec(o.attr("content"));
                        if (!a) return;
                        this.appId = a[1]
                    }
                    this.title = this.options.title ? this.options.title : o.data("title") || e("title").text().replace(/\s*[|\-·].*$/, ""), this.author = this.options.author ? this.options.author : o.data("author") || (e('meta[name="author"]').length ? e('meta[name="author"]').attr("content") : window.location.hostname), this.iconUrl = o.data("icon-url"), this.price = o.data("price"), "function" == typeof this.options.onInstall ? this.options.onInstall = this.options.onInstall : this.options.onInstall = function() {}, "function" == typeof this.options.onClose ? this.options.onClose = this.options.onClose : this.options.onClose = function() {}, this.create(), this.show(), this.listen()
                }
            }
        };
    r.prototype = {
        constructor: r,
        create: function() {
            var t, n = this.price || this.options.price,
                r = this.options.url || function() {
                    switch (this.type) {
                        case "android":
                            return "market://details?id=";
                        case "kindle":
                            return "amzn://apps/android?asin=";
                        case "windows":
                            return i ? "ms-windows-store://pdp/?productid=" : "ms-windows-store:navigate?appid="
                    }
                    return "https://itunes.apple.com/" + this.options.appStoreLanguage + "/app/id"
                }.call(this) + this.appId,
                o = function() {
                    var e = n;
                    switch (this.type) {
                        case "android":
                            return e + this.options.inGooglePlay;
                        case "kindle":
                            return e + this.options.inAmazonAppStore;
                        case "windows":
                            return e + this.options.inWindowsStore
                    }
                    return e + this.options.inAppStore
                }.call(this),
                a = null == this.options.iconGloss ? "ios" == this.type : this.options.iconGloss;
            "android" == this.type && this.options.GooglePlayParams && (r += "&referrer=" + this.options.GooglePlayParams);
            var s = '<div id="smartbanner" class="' + this.type + '"><div class="sb-container"><a href="#" class="sb-close">&times;</a><span class="sb-icon"></span><div class="sb-info"><strong>' + this.title + "</strong><span>" + this.author + "</span><span>" + o + '</span></div><a href="' + r + '" class="sb-button"><span>' + this.options.button + "</span></a></div></div>";
            this.options.layer ? e(this.options.appendToSelector).append(s) : e(this.options.appendToSelector).prepend(s), this.options.icon ? t = this.options.icon : this.iconUrl ? t = this.iconUrl : e('link[rel="apple-touch-icon-precomposed"]').length > 0 ? (t = e('link[rel="apple-touch-icon-precomposed"]').attr("href"), null == this.options.iconGloss && (a = !1)) : e('link[rel="apple-touch-icon"]').length > 0 ? t = e('link[rel="apple-touch-icon"]').attr("href") : e('meta[name="msApplication-TileImage"]').length > 0 ? t = e('meta[name="msApplication-TileImage"]').attr("content") : e('meta[name="msapplication-TileImage"]').length > 0 && (t = e('meta[name="msapplication-TileImage"]').attr("content")), t ? (e("#smartbanner .sb-icon").css("background-image", "url(" + t + ")"), a && e("#smartbanner .sb-icon").addClass("gloss")) : e("#smartbanner").addClass("no-icon"), this.bannerHeight = e("#smartbanner").outerHeight() + 2, this.scale > 1 && (e("#smartbanner").css("top", parseFloat(e("#smartbanner").css("top")) * this.scale).css("height", parseFloat(e("#smartbanner").css("height")) * this.scale).hide(), e("#smartbanner .sb-container").css("-webkit-transform", "scale(" + this.scale + ")").css("-msie-transform", "scale(" + this.scale + ")").css("-moz-transform", "scale(" + this.scale + ")").css("width", e(window).width() / this.scale)), e("#smartbanner").css("position", this.options.layer ? "fixed" : "inherit")
        },
        listen: function() {
            e("#smartbanner .sb-close").on("click", e.proxy(this.close, this)), e("#smartbanner .sb-button").on("click", e.proxy(this.install, this))
        },
        show: function(t) {
            var n = e("#smartbanner");
            if (n.stop(), this.options.layer) n.animate({
                top: 0,
                display: "block"
            }, this.options.speedIn).addClass("shown").show(), e(this.pushSelector).animate({
                paddingTop: this.origHtmlMargin + this.bannerHeight * this.scale
            }, this.options.speedIn, "swing", t);
            else if (e.support.transition) {
                n.animate({
                    top: 0
                }, this.options.speedIn).addClass("shown");
                var i = function() {
                    e("html").removeClass("sb-animation"), t && t()
                };
                e(this.pushSelector).addClass("sb-animation").one(e.support.transition.end, i).emulateTransitionEnd(this.options.speedIn).css("margin-top", this.origHtmlMargin + this.bannerHeight * this.scale)
            } else n.slideDown(this.options.speedIn).addClass("shown")
        },
        hide: function(t) {
            var n = e("#smartbanner");
            if (n.stop(), this.options.layer) n.animate({
                top: -1 * this.bannerHeight * this.scale,
                display: "block"
            }, this.options.speedIn).removeClass("shown"), e(this.pushSelector).animate({
                paddingTop: this.origHtmlMargin
            }, this.options.speedIn, "swing", t);
            else if (e.support.transition) {
                "android" !== this.type ? n.css("top", -1 * this.bannerHeight * this.scale).removeClass("shown") : n.css({
                    display: "none"
                }).removeClass("shown");
                var i = function() {
                    e("html").removeClass("sb-animation"), t && t()
                };
                e(this.pushSelector).addClass("sb-animation").one(e.support.transition.end, i).emulateTransitionEnd(this.options.speedOut).css("margin-top", this.origHtmlMargin)
            } else n.slideUp(this.options.speedOut).removeClass("shown")
        },
        close: function(e) {
            e.preventDefault(), this.hide(), this.setCookie("sb-closed", "true", this.options.daysHidden), this.options.onClose(e)
        },
        install: function(e) {
            this.options.hideOnInstall && this.hide(), this.setCookie("sb-installed", "true", this.options.daysReminder), this.options.onInstall(e)
        },
        setCookie: function(e, t, n) {
            var i = new Date;
            i.setDate(i.getDate() + n), t = encodeURI(t) + (null == n ? "" : "; expires=" + i.toUTCString()), document.cookie = e + "=" + t + "; path=/;"
        },
        getCookie: function(e) {
            var t, n, i, r = document.cookie.split(";");
            for (t = 0; t < r.length; t++)
                if (n = r[t].substr(0, r[t].indexOf("=")), i = r[t].substr(r[t].indexOf("=") + 1), n = n.replace(/^\s+|\s+$/g, ""), n == e) return decodeURI(i);
            return null
        },
        switchType: function() {
            var t = this;
            this.hide(function() {
                t.type = "android" == t.type ? "ios" : "android";
                var n = e("android" == t.type ? 'meta[name="google-play-app"]' : 'meta[name="apple-itunes-app"]').attr("content");
                t.appId = /app-id=([^\s,]+)/.exec(n)[1], e("#smartbanner").detach(), t.create(), t.show()
            })
        }
    }, e.smartbanner = function(t) {
        var n = e(window),
            i = n.data("smartbanner"),
            o = "object" == typeof t && t;
        i || n.data("smartbanner", i = new r(o)), "string" == typeof t && i[t]()
    }, e.smartbanner.defaults = {
        title: null,
        author: null,
        price: "FREE",
        appStoreLanguage: "us",
        inAppStore: "On the App Store",
        inGooglePlay: "In Google Play",
        inAmazonAppStore: "In the Amazon Appstore",
        inWindowsStore: "In the Windows Store",
        GooglePlayParams: null,
        icon: null,
        iconGloss: null,
        button: "VIEW",
        url: null,
        scale: "auto",
        speedIn: 300,
        speedOut: 400,
        daysHidden: 15,
        daysReminder: 90,
        force: null,
        hideOnInstall: !0,
        layer: !1,
        iOSUniversalApp: !0,
        appendToSelector: "body",
        pushSelector: "html"
    }, e.smartbanner.Constructor = r, void 0 === e.support.transition && (e.fn.emulateTransitionEnd = function(t) {
        var n = !1,
            i = this;
        e(this).one(e.support.transition.end, function() {
            n = !0
        });
        var r = function() {
            n || e(i).trigger(e.support.transition.end)
        };
        return setTimeout(r, t), this
    }, e(function() {
        e.support.transition = t()
    }))
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : jQuery)
}(function(e) {
    e.ui = e.ui || {};
    var t = (e.ui.version = "1.12.1", 0),
        n = Array.prototype.slice;
    e.cleanData = function(t) {
        return function(n) {
            var i, r, o;
            for (o = 0; null != (r = n[o]); o++) try {
                i = e._data(r, "events"), i && i.remove && e(r).triggerHandler("remove")
            } catch (a) {}
            t(n)
        }
    }(e.cleanData), e.widget = function(t, n, i) {
        var r, o, a, s = {},
            l = t.split(".")[0];
        t = t.split(".")[1];
        var c = l + "-" + t;
        return i || (i = n, n = e.Widget), e.isArray(i) && (i = e.extend.apply(null, [{}].concat(i))), e.expr[":"][c.toLowerCase()] = function(t) {
            return !!e.data(t, c)
        }, e[l] = e[l] || {}, r = e[l][t], o = e[l][t] = function(e, t) {
            return this._createWidget ? void(arguments.length && this._createWidget(e, t)) : new o(e, t)
        }, e.extend(o, r, {
            version: i.version,
            _proto: e.extend({}, i),
            _childConstructors: []
        }), a = new n, a.options = e.widget.extend({}, a.options), e.each(i, function(t, i) {
            return e.isFunction(i) ? void(s[t] = function() {
                function e() {
                    return n.prototype[t].apply(this, arguments)
                }

                function r(e) {
                    return n.prototype[t].apply(this, e)
                }
                return function() {
                    var t, n = this._super,
                        o = this._superApply;
                    return this._super = e, this._superApply = r, t = i.apply(this, arguments), this._super = n, this._superApply = o, t
                }
            }()) : void(s[t] = i)
        }), o.prototype = e.widget.extend(a, {
            widgetEventPrefix: r ? a.widgetEventPrefix || t : t
        }, s, {
            constructor: o,
            namespace: l,
            widgetName: t,
            widgetFullName: c
        }), r ? (e.each(r._childConstructors, function(t, n) {
            var i = n.prototype;
            e.widget(i.namespace + "." + i.widgetName, o, n._proto)
        }), delete r._childConstructors) : n._childConstructors.push(o), e.widget.bridge(t, o), o
    }, e.widget.extend = function(t) {
        for (var i, r, o = n.call(arguments, 1), a = 0, s = o.length; a < s; a++)
            for (i in o[a]) r = o[a][i], o[a].hasOwnProperty(i) && void 0 !== r && (e.isPlainObject(r) ? t[i] = e.isPlainObject(t[i]) ? e.widget.extend({}, t[i], r) : e.widget.extend({}, r) : t[i] = r);
        return t
    }, e.widget.bridge = function(t, i) {
        var r = i.prototype.widgetFullName || t;
        e.fn[t] = function(o) {
            var a = "string" == typeof o,
                s = n.call(arguments, 1),
                l = this;
            return a ? this.length || "instance" !== o ? this.each(function() {
                var n, i = e.data(this, r);
                return "instance" === o ? (l = i, !1) : i ? e.isFunction(i[o]) && "_" !== o.charAt(0) ? (n = i[o].apply(i, s), n !== i && void 0 !== n ? (l = n && n.jquery ? l.pushStack(n.get()) : n, !1) : void 0) : e.error("no such method '" + o + "' for " + t + " widget instance") : e.error("cannot call methods on " + t + " prior to initialization; attempted to call method '" + o + "'")
            }) : l = void 0 : (s.length && (o = e.widget.extend.apply(null, [o].concat(s))), this.each(function() {
                var t = e.data(this, r);
                t ? (t.option(o || {}), t._init && t._init()) : e.data(this, r, new i(o, this))
            })), l
        }
    }, e.Widget = function() {}, e.Widget._childConstructors = [], e.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            classes: {},
            disabled: !1,
            create: null
        },
        _createWidget: function(n, i) {
            i = e(i || this.defaultElement || this)[0], this.element = e(i), this.uuid = t++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = e(), this.hoverable = e(), this.focusable = e(), this.classesElementLookup = {}, i !== this && (e.data(i, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function(e) {
                    e.target === i && this.destroy()
                }
            }), this.document = e(i.style ? i.ownerDocument : i.document || i), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this.options = e.widget.extend({}, this.options, this._getCreateOptions(), n), this._create(), this.options.disabled && this._setOptionDisabled(this.options.disabled), this._trigger("create", null, this._getCreateEventData()), this._init()
        },
        _getCreateOptions: function() {
            return {}
        },
        _getCreateEventData: e.noop,
        _create: e.noop,
        _init: e.noop,
        destroy: function() {
            var t = this;
            this._destroy(), e.each(this.classesElementLookup, function(e, n) {
                t._removeClass(n, e)
            }), this.element.off(this.eventNamespace).removeData(this.widgetFullName), this.widget().off(this.eventNamespace).removeAttr("aria-disabled"), this.bindings.off(this.eventNamespace)
        },
        _destroy: e.noop,
        widget: function() {
            return this.element
        },
        option: function(t, n) {
            var i, r, o, a = t;
            if (0 === arguments.length) return e.widget.extend({}, this.options);
            if ("string" == typeof t)
                if (a = {}, i = t.split("."), t = i.shift(), i.length) {
                    for (r = a[t] = e.widget.extend({}, this.options[t]), o = 0; o < i.length - 1; o++) r[i[o]] = r[i[o]] || {}, r = r[i[o]];
                    if (t = i.pop(), 1 === arguments.length) return void 0 === r[t] ? null : r[t];
                    r[t] = n
                } else {
                    if (1 === arguments.length) return void 0 === this.options[t] ? null : this.options[t];
                    a[t] = n
                } return this._setOptions(a), this
        },
        _setOptions: function(e) {
            var t;
            for (t in e) this._setOption(t, e[t]);
            return this
        },
        _setOption: function(e, t) {
            return "classes" === e && this._setOptionClasses(t), this.options[e] = t, "disabled" === e && this._setOptionDisabled(t), this
        },
        _setOptionClasses: function(t) {
            var n, i, r;
            for (n in t) r = this.classesElementLookup[n], t[n] !== this.options.classes[n] && r && r.length && (i = e(r.get()), this._removeClass(r, n), i.addClass(this._classes({
                element: i,
                keys: n,
                classes: t,
                add: !0
            })))
        },
        _setOptionDisabled: function(e) {
            this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!e), e && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus"))
        },
        enable: function() {
            return this._setOptions({
                disabled: !1
            })
        },
        disable: function() {
            return this._setOptions({
                disabled: !0
            })
        },
        _classes: function(t) {
            function n(n, o) {
                var a, s;
                for (s = 0; s < n.length; s++) a = r.classesElementLookup[n[s]] || e(), a = e(t.add ? e.unique(a.get().concat(t.element.get())) : a.not(t.element).get()), r.classesElementLookup[n[s]] = a, i.push(n[s]), o && t.classes[n[s]] && i.push(t.classes[n[s]])
            }
            var i = [],
                r = this;
            return t = e.extend({
                element: this.element,
                classes: this.options.classes || {}
            }, t), this._on(t.element, {
                remove: "_untrackClassesElement"
            }), t.keys && n(t.keys.match(/\S+/g) || [], !0), t.extra && n(t.extra.match(/\S+/g) || []), i.join(" ")
        },
        _untrackClassesElement: function(t) {
            var n = this;
            e.each(n.classesElementLookup, function(i, r) {
                e.inArray(t.target, r) !== -1 && (n.classesElementLookup[i] = e(r.not(t.target).get()))
            })
        },
        _removeClass: function(e, t, n) {
            return this._toggleClass(e, t, n, !1)
        },
        _addClass: function(e, t, n) {
            return this._toggleClass(e, t, n, !0)
        },
        _toggleClass: function(e, t, n, i) {
            i = "boolean" == typeof i ? i : n;
            var r = "string" == typeof e || null === e,
                o = {
                    extra: r ? t : n,
                    keys: r ? e : t,
                    element: r ? this.element : e,
                    add: i
                };
            return o.element.toggleClass(this._classes(o), i), this
        },
        _on: function(t, n, i) {
            var r, o = this;
            "boolean" != typeof t && (i = n, n = t, t = !1), i ? (n = r = e(n), this.bindings = this.bindings.add(n)) : (i = n, n = this.element, r = this.widget()), e.each(i, function(i, a) {
                function s() {
                    if (t || o.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled")) return ("string" == typeof a ? o[a] : a).apply(o, arguments)
                }
                "string" != typeof a && (s.guid = a.guid = a.guid || s.guid || e.guid++);
                var l = i.match(/^([\w:-]*)\s*(.*)$/),
                    c = l[1] + o.eventNamespace,
                    d = l[2];
                d ? r.on(c, d, s) : n.on(c, s)
            })
        },
        _off: function(t, n) {
            n = (n || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.off(n).off(n), this.bindings = e(this.bindings.not(t).get()), this.focusable = e(this.focusable.not(t).get()), this.hoverable = e(this.hoverable.not(t).get())
        },
        _delay: function(e, t) {
            function n() {
                return ("string" == typeof e ? i[e] : e).apply(i, arguments)
            }
            var i = this;
            return setTimeout(n, t || 0)
        },
        _hoverable: function(t) {
            this.hoverable = this.hoverable.add(t), this._on(t, {
                mouseenter: function(t) {
                    this._addClass(e(t.currentTarget), null, "ui-state-hover")
                },
                mouseleave: function(t) {
                    this._removeClass(e(t.currentTarget), null, "ui-state-hover")
                }
            })
        },
        _focusable: function(t) {
            this.focusable = this.focusable.add(t), this._on(t, {
                focusin: function(t) {
                    this._addClass(e(t.currentTarget), null, "ui-state-focus")
                },
                focusout: function(t) {
                    this._removeClass(e(t.currentTarget), null, "ui-state-focus")
                }
            })
        },
        _trigger: function(t, n, i) {
            var r, o, a = this.options[t];
            if (i = i || {}, n = e.Event(n), n.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), n.target = this.element[0], o = n.originalEvent)
                for (r in o) r in n || (n[r] = o[r]);
            return this.element.trigger(n, i), !(e.isFunction(a) && a.apply(this.element[0], [n].concat(i)) === !1 || n.isDefaultPrevented())
        }
    }, e.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(t, n) {
        e.Widget.prototype["_" + t] = function(i, r, o) {
            "string" == typeof r && (r = {
                effect: r
            });
            var a, s = r ? r === !0 || "number" == typeof r ? n : r.effect || n : t;
            r = r || {}, "number" == typeof r && (r = {
                duration: r
            }), a = !e.isEmptyObject(r), r.complete = o, r.delay && i.delay(r.delay), a && e.effects && e.effects.effect[s] ? i[t](r) : s !== t && i[s] ? i[s](r.duration, r.easing, o) : i.queue(function(n) {
                e(this)[t](), o && o.call(i[0]), n()
            })
        }
    });
    e.widget
}),
function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : window.jQuery)
}(function(e) {
    "use strict";
    var t = 0,
        n = e,
        i = "parseJSON";
    "JSON" in window && "parse" in JSON && (n = JSON, i = "parse"), e.ajaxTransport("iframe", function(n) {
        if (n.async) {
            var i, r, o, a = n.initialIframeSrc || "javascript:false;";
            return {
                send: function(s, l) {
                    i = e('<form style="display:none;"></form>'), i.attr("accept-charset", n.formAcceptCharset), o = /\?/.test(n.url) ? "&" : "?", "DELETE" === n.type ? (n.url = n.url + o + "_method=DELETE", n.type = "POST") : "PUT" === n.type ? (n.url = n.url + o + "_method=PUT", n.type = "POST") : "PATCH" === n.type && (n.url = n.url + o + "_method=PATCH", n.type = "POST"), t += 1, r = e('<iframe src="' + a + '" name="iframe-transport-' + t + '"></iframe>').bind("load", function() {
                        var t, o = e.isArray(n.paramName) ? n.paramName : [n.paramName];
                        r.unbind("load").bind("load", function() {
                            var t;
                            try {
                                if (t = r.contents(), !t.length || !t[0].firstChild) throw new Error
                            } catch (n) {
                                t = void 0
                            }
                            l(200, "success", {
                                iframe: t
                            }), e('<iframe src="' + a + '"></iframe>').appendTo(i), window.setTimeout(function() {
                                i.remove()
                            }, 0)
                        }), i.prop("target", r.prop("name")).prop("action", n.url).prop("method", n.type), n.formData && e.each(n.formData, function(t, n) {
                            e('<input type="hidden"/>').prop("name", n.name).val(n.value).appendTo(i)
                        }), n.fileInput && n.fileInput.length && "POST" === n.type && (t = n.fileInput.clone(),
                            n.fileInput.after(function(e) {
                                return t[e]
                            }), n.paramName && n.fileInput.each(function(t) {
                                e(this).prop("name", o[t] || n.paramName)
                            }), i.append(n.fileInput).prop("enctype", "multipart/form-data").prop("encoding", "multipart/form-data"), n.fileInput.removeAttr("form")), i.submit(), t && t.length && n.fileInput.each(function(n, i) {
                            var r = e(t[n]);
                            e(i).prop("name", r.prop("name")).attr("form", r.attr("form")), r.replaceWith(i)
                        })
                    }), i.append(r).appendTo(document.body)
                },
                abort: function() {
                    r && r.unbind("load").prop("src", a), i && i.remove()
                }
            }
        }
    }), e.ajaxSetup({
        converters: {
            "iframe text": function(t) {
                return t && e(t[0].body).text()
            },
            "iframe json": function(t) {
                return t && n[i](e(t[0].body).text())
            },
            "iframe html": function(t) {
                return t && e(t[0].body).html()
            },
            "iframe xml": function(t) {
                var n = t && t[0];
                return n && e.isXMLDoc(n) ? n : e.parseXML(n.XMLDocument && n.XMLDocument.xml || e(n.body).html())
            },
            "iframe script": function(t) {
                return t && e.globalEval(e(t[0].body).text())
            }
        }
    })
}),
function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery", "jquery-ui/ui/widget"], e) : "object" == typeof exports ? e(require("jquery"), require("./vendor/jquery.ui.widget")) : e(window.jQuery)
}(function(e) {
    "use strict";

    function t(t) {
        var n = "dragover" === t;
        return function(i) {
            i.dataTransfer = i.originalEvent && i.originalEvent.dataTransfer;
            var r = i.dataTransfer;
            r && e.inArray("Files", r.types) !== -1 && this._trigger(t, e.Event(t, {
                delegatedEvent: i
            })) !== !1 && (i.preventDefault(), n && (r.dropEffect = "copy"))
        }
    }
    e.support.fileInput = !(new RegExp("(Android (1\\.[0156]|2\\.[01]))|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)|(w(eb)?OSBrowser)|(webOS)|(Kindle/(1\\.0|2\\.[05]|3\\.0))").test(window.navigator.userAgent) || e('<input type="file"/>').prop("disabled")), e.support.xhrFileUpload = !(!window.ProgressEvent || !window.FileReader), e.support.xhrFormDataFileUpload = !!window.FormData, e.support.blobSlice = window.Blob && (Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice), e.widget("blueimp.fileupload", {
        options: {
            dropZone: e(document),
            pasteZone: void 0,
            fileInput: void 0,
            replaceFileInput: !0,
            paramName: void 0,
            singleFileUploads: !0,
            limitMultiFileUploads: void 0,
            limitMultiFileUploadSize: void 0,
            limitMultiFileUploadSizeOverhead: 512,
            sequentialUploads: !1,
            limitConcurrentUploads: void 0,
            forceIframeTransport: !1,
            redirect: void 0,
            redirectParamName: void 0,
            postMessage: void 0,
            multipart: !0,
            maxChunkSize: void 0,
            uploadedBytes: void 0,
            recalculateProgress: !0,
            progressInterval: 100,
            bitrateInterval: 500,
            autoUpload: !0,
            uniqueFilenames: void 0,
            messages: {
                uploadedBytes: "Uploaded bytes exceed file size"
            },
            i18n: function(t, n) {
                return t = this.messages[t] || t.toString(), n && e.each(n, function(e, n) {
                    t = t.replace("{" + e + "}", n)
                }), t
            },
            formData: function(e) {
                return e.serializeArray()
            },
            add: function(t, n) {
                return !t.isDefaultPrevented() && void((n.autoUpload || n.autoUpload !== !1 && e(this).fileupload("option", "autoUpload")) && n.process().done(function() {
                    n.submit()
                }))
            },
            processData: !1,
            contentType: !1,
            cache: !1,
            timeout: 0
        },
        _specialOptions: ["fileInput", "dropZone", "pasteZone", "multipart", "forceIframeTransport"],
        _blobSlice: e.support.blobSlice && function() {
            var e = this.slice || this.webkitSlice || this.mozSlice;
            return e.apply(this, arguments)
        },
        _BitrateTimer: function() {
            this.timestamp = Date.now ? Date.now() : (new Date).getTime(), this.loaded = 0, this.bitrate = 0, this.getBitrate = function(e, t, n) {
                var i = e - this.timestamp;
                return (!this.bitrate || !n || i > n) && (this.bitrate = (t - this.loaded) * (1e3 / i) * 8, this.loaded = t, this.timestamp = e), this.bitrate
            }
        },
        _isXHRUpload: function(t) {
            return !t.forceIframeTransport && (!t.multipart && e.support.xhrFileUpload || e.support.xhrFormDataFileUpload)
        },
        _getFormData: function(t) {
            var n;
            return "function" === e.type(t.formData) ? t.formData(t.form) : e.isArray(t.formData) ? t.formData : "object" === e.type(t.formData) ? (n = [], e.each(t.formData, function(e, t) {
                n.push({
                    name: e,
                    value: t
                })
            }), n) : []
        },
        _getTotal: function(t) {
            var n = 0;
            return e.each(t, function(e, t) {
                n += t.size || 1
            }), n
        },
        _initProgressObject: function(t) {
            var n = {
                loaded: 0,
                total: 0,
                bitrate: 0
            };
            t._progress ? e.extend(t._progress, n) : t._progress = n
        },
        _initResponseObject: function(e) {
            var t;
            if (e._response)
                for (t in e._response) Object.prototype.hasOwnProperty.call(e._response, t) && delete e._response[t];
            else e._response = {}
        },
        _onProgress: function(t, n) {
            if (t.lengthComputable) {
                var i, r = Date.now ? Date.now() : (new Date).getTime();
                if (n._time && n.progressInterval && r - n._time < n.progressInterval && t.loaded !== t.total) return;
                n._time = r, i = Math.floor(t.loaded / t.total * (n.chunkSize || n._progress.total)) + (n.uploadedBytes || 0), this._progress.loaded += i - n._progress.loaded, this._progress.bitrate = this._bitrateTimer.getBitrate(r, this._progress.loaded, n.bitrateInterval), n._progress.loaded = n.loaded = i, n._progress.bitrate = n.bitrate = n._bitrateTimer.getBitrate(r, i, n.bitrateInterval), this._trigger("progress", e.Event("progress", {
                    delegatedEvent: t
                }), n), this._trigger("progressall", e.Event("progressall", {
                    delegatedEvent: t
                }), this._progress)
            }
        },
        _initProgressListener: function(t) {
            var n = this,
                i = t.xhr ? t.xhr() : e.ajaxSettings.xhr();
            i.upload && (e(i.upload).bind("progress", function(e) {
                var i = e.originalEvent;
                e.lengthComputable = i.lengthComputable, e.loaded = i.loaded, e.total = i.total, n._onProgress(e, t)
            }), t.xhr = function() {
                return i
            })
        },
        _deinitProgressListener: function(t) {
            var n = t.xhr ? t.xhr() : e.ajaxSettings.xhr();
            n.upload && e(n.upload).unbind("progress")
        },
        _isInstanceOf: function(e, t) {
            return Object.prototype.toString.call(t) === "[object " + e + "]"
        },
        _getUniqueFilename: function(e, t) {
            return e = String(e), t[e] ? (e = e.replace(/(?: \(([\d]+)\))?(\.[^.]+)?$/, function(e, t, n) {
                var i = t ? Number(t) + 1 : 1,
                    r = n || "";
                return " (" + i + ")" + r
            }), this._getUniqueFilename(e, t)) : (t[e] = !0, e)
        },
        _initXHRData: function(t) {
            var n, i = this,
                r = t.files[0],
                o = t.multipart || !e.support.xhrFileUpload,
                a = "array" === e.type(t.paramName) ? t.paramName[0] : t.paramName;
            t.headers = e.extend({}, t.headers), t.contentRange && (t.headers["Content-Range"] = t.contentRange), o && !t.blob && this._isInstanceOf("File", r) || (t.headers["Content-Disposition"] = 'attachment; filename="' + encodeURI(r.uploadName || r.name) + '"'), o ? e.support.xhrFormDataFileUpload && (t.postMessage ? (n = this._getFormData(t), t.blob ? n.push({
                name: a,
                value: t.blob
            }) : e.each(t.files, function(i, r) {
                n.push({
                    name: "array" === e.type(t.paramName) && t.paramName[i] || a,
                    value: r
                })
            })) : (i._isInstanceOf("FormData", t.formData) ? n = t.formData : (n = new FormData, e.each(this._getFormData(t), function(e, t) {
                n.append(t.name, t.value)
            })), t.blob ? n.append(a, t.blob, r.uploadName || r.name) : e.each(t.files, function(r, o) {
                if (i._isInstanceOf("File", o) || i._isInstanceOf("Blob", o)) {
                    var s = o.uploadName || o.name;
                    t.uniqueFilenames && (s = i._getUniqueFilename(s, t.uniqueFilenames)), n.append("array" === e.type(t.paramName) && t.paramName[r] || a, o, s)
                }
            })), t.data = n) : (t.contentType = r.type || "application/octet-stream", t.data = t.blob || r), t.blob = null
        },
        _initIframeSettings: function(t) {
            var n = e("<a></a>").prop("href", t.url).prop("host");
            t.dataType = "iframe " + (t.dataType || ""), t.formData = this._getFormData(t), t.redirect && n && n !== location.host && t.formData.push({
                name: t.redirectParamName || "redirect",
                value: t.redirect
            })
        },
        _initDataSettings: function(e) {
            this._isXHRUpload(e) ? (this._chunkedUpload(e, !0) || (e.data || this._initXHRData(e), this._initProgressListener(e)), e.postMessage && (e.dataType = "postmessage " + (e.dataType || ""))) : this._initIframeSettings(e)
        },
        _getParamName: function(t) {
            var n = e(t.fileInput),
                i = t.paramName;
            return i ? e.isArray(i) || (i = [i]) : (i = [], n.each(function() {
                for (var t = e(this), n = t.prop("name") || "files[]", r = (t.prop("files") || [1]).length; r;) i.push(n), r -= 1
            }), i.length || (i = [n.prop("name") || "files[]"])), i
        },
        _initFormSettings: function(t) {
            t.form && t.form.length || (t.form = e(t.fileInput.prop("form")), t.form.length || (t.form = e(this.options.fileInput.prop("form")))), t.paramName = this._getParamName(t), t.url || (t.url = t.form.prop("action") || location.href), t.type = (t.type || "string" === e.type(t.form.prop("method")) && t.form.prop("method") || "").toUpperCase(), "POST" !== t.type && "PUT" !== t.type && "PATCH" !== t.type && (t.type = "POST"), t.formAcceptCharset || (t.formAcceptCharset = t.form.attr("accept-charset"))
        },
        _getAJAXSettings: function(t) {
            var n = e.extend({}, this.options, t);
            return this._initFormSettings(n), this._initDataSettings(n), n
        },
        _getDeferredState: function(e) {
            return e.state ? e.state() : e.isResolved() ? "resolved" : e.isRejected() ? "rejected" : "pending"
        },
        _enhancePromise: function(e) {
            return e.success = e.done, e.error = e.fail, e.complete = e.always, e
        },
        _getXHRPromise: function(t, n, i) {
            var r = e.Deferred(),
                o = r.promise();
            return n = n || this.options.context || o, t === !0 ? r.resolveWith(n, i) : t === !1 && r.rejectWith(n, i), o.abort = r.promise, this._enhancePromise(o)
        },
        _addConvenienceMethods: function(t, n) {
            var i = this,
                r = function(t) {
                    return e.Deferred().resolveWith(i, t).promise()
                };
            n.process = function(t, o) {
                return (t || o) && (n._processQueue = this._processQueue = (this._processQueue || r([this])).then(function() {
                    return n.errorThrown ? e.Deferred().rejectWith(i, [n]).promise() : r(arguments)
                }).then(t, o)), this._processQueue || r([this])
            }, n.submit = function() {
                return "pending" !== this.state() && (n.jqXHR = this.jqXHR = i._trigger("submit", e.Event("submit", {
                    delegatedEvent: t
                }), this) !== !1 && i._onSend(t, this)), this.jqXHR || i._getXHRPromise()
            }, n.abort = function() {
                return this.jqXHR ? this.jqXHR.abort() : (this.errorThrown = "abort", i._trigger("fail", null, this), i._getXHRPromise(!1))
            }, n.state = function() {
                return this.jqXHR ? i._getDeferredState(this.jqXHR) : this._processQueue ? i._getDeferredState(this._processQueue) : void 0
            }, n.processing = function() {
                return !this.jqXHR && this._processQueue && "pending" === i._getDeferredState(this._processQueue)
            }, n.progress = function() {
                return this._progress
            }, n.response = function() {
                return this._response
            }
        },
        _getUploadedBytes: function(e) {
            var t = e.getResponseHeader("Range"),
                n = t && t.split("-"),
                i = n && n.length > 1 && parseInt(n[1], 10);
            return i && i + 1
        },
        _chunkedUpload: function(t, n) {
            t.uploadedBytes = t.uploadedBytes || 0;
            var i, r, o = this,
                a = t.files[0],
                s = a.size,
                l = t.uploadedBytes,
                c = t.maxChunkSize || s,
                d = this._blobSlice,
                u = e.Deferred(),
                p = u.promise();
            return !(!(this._isXHRUpload(t) && d && (l || ("function" === e.type(c) ? c(t) : c) < s)) || t.data) && (!!n || (l >= s ? (a.error = t.i18n("uploadedBytes"), this._getXHRPromise(!1, t.context, [null, "error", a.error])) : (r = function() {
                var n = e.extend({}, t),
                    p = n._progress.loaded;
                n.blob = d.call(a, l, l + ("function" === e.type(c) ? c(n) : c), a.type), n.chunkSize = n.blob.size, n.contentRange = "bytes " + l + "-" + (l + n.chunkSize - 1) + "/" + s, o._trigger("chunkbeforesend", null, n), o._initXHRData(n), o._initProgressListener(n), i = (o._trigger("chunksend", null, n) !== !1 && e.ajax(n) || o._getXHRPromise(!1, n.context)).done(function(i, a, c) {
                    l = o._getUploadedBytes(c) || l + n.chunkSize, p + n.chunkSize - n._progress.loaded && o._onProgress(e.Event("progress", {
                        lengthComputable: !0,
                        loaded: l - n.uploadedBytes,
                        total: l - n.uploadedBytes
                    }), n), t.uploadedBytes = n.uploadedBytes = l, n.result = i, n.textStatus = a, n.jqXHR = c, o._trigger("chunkdone", null, n), o._trigger("chunkalways", null, n), l < s ? r() : u.resolveWith(n.context, [i, a, c])
                }).fail(function(e, t, i) {
                    n.jqXHR = e, n.textStatus = t, n.errorThrown = i, o._trigger("chunkfail", null, n), o._trigger("chunkalways", null, n), u.rejectWith(n.context, [e, t, i])
                }).always(function() {
                    o._deinitProgressListener(n)
                })
            }, this._enhancePromise(p), p.abort = function() {
                return i.abort()
            }, r(), p)))
        },
        _beforeSend: function(e, t) {
            0 === this._active && (this._trigger("start"), this._bitrateTimer = new this._BitrateTimer, this._progress.loaded = this._progress.total = 0, this._progress.bitrate = 0), this._initResponseObject(t), this._initProgressObject(t), t._progress.loaded = t.loaded = t.uploadedBytes || 0, t._progress.total = t.total = this._getTotal(t.files) || 1, t._progress.bitrate = t.bitrate = 0, this._active += 1, this._progress.loaded += t.loaded, this._progress.total += t.total
        },
        _onDone: function(t, n, i, r) {
            var o = r._progress.total,
                a = r._response;
            r._progress.loaded < o && this._onProgress(e.Event("progress", {
                lengthComputable: !0,
                loaded: o,
                total: o
            }), r), a.result = r.result = t, a.textStatus = r.textStatus = n, a.jqXHR = r.jqXHR = i, this._trigger("done", null, r)
        },
        _onFail: function(e, t, n, i) {
            var r = i._response;
            i.recalculateProgress && (this._progress.loaded -= i._progress.loaded, this._progress.total -= i._progress.total), r.jqXHR = i.jqXHR = e, r.textStatus = i.textStatus = t, r.errorThrown = i.errorThrown = n, this._trigger("fail", null, i)
        },
        _onAlways: function(e, t, n, i) {
            this._trigger("always", null, i)
        },
        _onSend: function(t, n) {
            n.submit || this._addConvenienceMethods(t, n);
            var i, r, o, a, s = this,
                l = s._getAJAXSettings(n),
                c = function() {
                    return s._sending += 1, l._bitrateTimer = new s._BitrateTimer, i = i || ((r || s._trigger("send", e.Event("send", {
                        delegatedEvent: t
                    }), l) === !1) && s._getXHRPromise(!1, l.context, r) || s._chunkedUpload(l) || e.ajax(l)).done(function(e, t, n) {
                        s._onDone(e, t, n, l)
                    }).fail(function(e, t, n) {
                        s._onFail(e, t, n, l)
                    }).always(function(e, t, n) {
                        if (s._deinitProgressListener(l), s._onAlways(e, t, n, l), s._sending -= 1, s._active -= 1, l.limitConcurrentUploads && l.limitConcurrentUploads > s._sending)
                            for (var i = s._slots.shift(); i;) {
                                if ("pending" === s._getDeferredState(i)) {
                                    i.resolve();
                                    break
                                }
                                i = s._slots.shift()
                            }
                        0 === s._active && s._trigger("stop")
                    })
                };
            return this._beforeSend(t, l), this.options.sequentialUploads || this.options.limitConcurrentUploads && this.options.limitConcurrentUploads <= this._sending ? (this.options.limitConcurrentUploads > 1 ? (o = e.Deferred(), this._slots.push(o), a = o.then(c)) : (this._sequence = this._sequence.then(c, c), a = this._sequence), a.abort = function() {
                return r = [void 0, "abort", "abort"], i ? i.abort() : (o && o.rejectWith(l.context, r), c())
            }, this._enhancePromise(a)) : c()
        },
        _onAdd: function(t, n) {
            var i, r, o, a, s = this,
                l = !0,
                c = e.extend({}, this.options, n),
                d = n.files,
                u = d.length,
                p = c.limitMultiFileUploads,
                f = c.limitMultiFileUploadSize,
                h = c.limitMultiFileUploadSizeOverhead,
                m = 0,
                g = this._getParamName(c),
                v = 0;
            if (!u) return !1;
            if (f && void 0 === d[0].size && (f = void 0), (c.singleFileUploads || p || f) && this._isXHRUpload(c))
                if (c.singleFileUploads || f || !p)
                    if (!c.singleFileUploads && f)
                        for (o = [], i = [], a = 0; a < u; a += 1) m += d[a].size + h, (a + 1 === u || m + d[a + 1].size + h > f || p && a + 1 - v >= p) && (o.push(d.slice(v, a + 1)), r = g.slice(v, a + 1), r.length || (r = g), i.push(r), v = a + 1, m = 0);
                    else i = g;
            else
                for (o = [], i = [], a = 0; a < u; a += p) o.push(d.slice(a, a + p)), r = g.slice(a, a + p), r.length || (r = g), i.push(r);
            else o = [d], i = [g];
            return n.originalFiles = d, e.each(o || d, function(r, a) {
                var c = e.extend({}, n);
                return c.files = o ? a : [a], c.paramName = i[r], s._initResponseObject(c), s._initProgressObject(c), s._addConvenienceMethods(t, c), l = s._trigger("add", e.Event("add", {
                    delegatedEvent: t
                }), c)
            }), l
        },
        _replaceFileInput: function(t) {
            var n = t.fileInput,
                i = n.clone(!0),
                r = n.is(document.activeElement);
            t.fileInputClone = i, e("<form></form>").append(i)[0].reset(), n.after(i).detach(), r && i.focus(), e.cleanData(n.unbind("remove")), this.options.fileInput = this.options.fileInput.map(function(e, t) {
                return t === n[0] ? i[0] : t
            }), n[0] === this.element[0] && (this.element = i)
        },
        _handleFileTreeEntry: function(t, n) {
            var i, r = this,
                o = e.Deferred(),
                a = [],
                s = function(e) {
                    e && !e.entry && (e.entry = t), o.resolve([e])
                },
                l = function(e) {
                    r._handleFileTreeEntries(e, n + t.name + "/").done(function(e) {
                        o.resolve(e)
                    }).fail(s)
                },
                c = function() {
                    i.readEntries(function(e) {
                        e.length ? (a = a.concat(e), c()) : l(a)
                    }, s)
                };
            return n = n || "", t.isFile ? t._file ? (t._file.relativePath = n, o.resolve(t._file)) : t.file(function(e) {
                e.relativePath = n, o.resolve(e)
            }, s) : t.isDirectory ? (i = t.createReader(), c()) : o.resolve([]), o.promise()
        },
        _handleFileTreeEntries: function(t, n) {
            var i = this;
            return e.when.apply(e, e.map(t, function(e) {
                return i._handleFileTreeEntry(e, n)
            })).then(function() {
                return Array.prototype.concat.apply([], arguments)
            })
        },
        _getDroppedFiles: function(t) {
            t = t || {};
            var n = t.items;
            return n && n.length && (n[0].webkitGetAsEntry || n[0].getAsEntry) ? this._handleFileTreeEntries(e.map(n, function(e) {
                var t;
                return e.webkitGetAsEntry ? (t = e.webkitGetAsEntry(), t && (t._file = e.getAsFile()), t) : e.getAsEntry()
            })) : e.Deferred().resolve(e.makeArray(t.files)).promise()
        },
        _getSingleFileInputFiles: function(t) {
            t = e(t);
            var n, i, r = t.prop("webkitEntries") || t.prop("entries");
            if (r && r.length) return this._handleFileTreeEntries(r);
            if (n = e.makeArray(t.prop("files")), n.length) void 0 === n[0].name && n[0].fileName && e.each(n, function(e, t) {
                t.name = t.fileName, t.size = t.fileSize
            });
            else {
                if (i = t.prop("value"), !i) return e.Deferred().resolve([]).promise();
                n = [{
                    name: i.replace(/^.*\\/, "")
                }]
            }
            return e.Deferred().resolve(n).promise()
        },
        _getFileInputFiles: function(t) {
            return t instanceof e && 1 !== t.length ? e.when.apply(e, e.map(t, this._getSingleFileInputFiles)).then(function() {
                return Array.prototype.concat.apply([], arguments)
            }) : this._getSingleFileInputFiles(t)
        },
        _onChange: function(t) {
            var n = this,
                i = {
                    fileInput: e(t.target),
                    form: e(t.target.form)
                };
            this._getFileInputFiles(i.fileInput).always(function(r) {
                i.files = r, n.options.replaceFileInput && n._replaceFileInput(i), n._trigger("change", e.Event("change", {
                    delegatedEvent: t
                }), i) !== !1 && n._onAdd(t, i)
            })
        },
        _onPaste: function(t) {
            var n = t.originalEvent && t.originalEvent.clipboardData && t.originalEvent.clipboardData.items,
                i = {
                    files: []
                };
            n && n.length && (e.each(n, function(e, t) {
                var n = t.getAsFile && t.getAsFile();
                n && i.files.push(n)
            }), this._trigger("paste", e.Event("paste", {
                delegatedEvent: t
            }), i) !== !1 && this._onAdd(t, i))
        },
        _onDrop: function(t) {
            t.dataTransfer = t.originalEvent && t.originalEvent.dataTransfer;
            var n = this,
                i = t.dataTransfer,
                r = {};
            i && i.files && i.files.length && (t.preventDefault(), this._getDroppedFiles(i).always(function(i) {
                r.files = i, n._trigger("drop", e.Event("drop", {
                    delegatedEvent: t
                }), r) !== !1 && n._onAdd(t, r)
            }))
        },
        _onDragOver: t("dragover"),
        _onDragEnter: t("dragenter"),
        _onDragLeave: t("dragleave"),
        _initEventHandlers: function() {
            this._isXHRUpload(this.options) && (this._on(this.options.dropZone, {
                dragover: this._onDragOver,
                drop: this._onDrop,
                dragenter: this._onDragEnter,
                dragleave: this._onDragLeave
            }), this._on(this.options.pasteZone, {
                paste: this._onPaste
            })), e.support.fileInput && this._on(this.options.fileInput, {
                change: this._onChange
            })
        },
        _destroyEventHandlers: function() {
            this._off(this.options.dropZone, "dragenter dragleave dragover drop"), this._off(this.options.pasteZone, "paste"), this._off(this.options.fileInput, "change")
        },
        _destroy: function() {
            this._destroyEventHandlers()
        },
        _setOption: function(t, n) {
            var i = e.inArray(t, this._specialOptions) !== -1;
            i && this._destroyEventHandlers(), this._super(t, n), i && (this._initSpecialOptions(), this._initEventHandlers())
        },
        _initSpecialOptions: function() {
            var t = this.options;
            void 0 === t.fileInput ? t.fileInput = this.element.is('input[type="file"]') ? this.element : this.element.find('input[type="file"]') : t.fileInput instanceof e || (t.fileInput = e(t.fileInput)), t.dropZone instanceof e || (t.dropZone = e(t.dropZone)), t.pasteZone instanceof e || (t.pasteZone = e(t.pasteZone))
        },
        _getRegExp: function(e) {
            var t = e.split("/"),
                n = t.pop();
            return t.shift(), new RegExp(t.join("/"), n)
        },
        _isRegExpOption: function(t, n) {
            return "url" !== t && "string" === e.type(n) && /^\/.*\/[igm]{0,3}$/.test(n)
        },
        _initDataAttributes: function() {
            var t = this,
                n = this.options,
                i = this.element.data();
            e.each(this.element[0].attributes, function(e, r) {
                var o, a = r.name.toLowerCase();
                /^data-/.test(a) && (a = a.slice(5).replace(/-[a-z]/g, function(e) {
                    return e.charAt(1).toUpperCase()
                }), o = i[a], t._isRegExpOption(a, o) && (o = t._getRegExp(o)), n[a] = o)
            })
        },
        _create: function() {
            this._initDataAttributes(), this._initSpecialOptions(), this._slots = [], this._sequence = this._getXHRPromise(!0), this._sending = this._active = 0, this._initProgressObject(this), this._initEventHandlers()
        },
        active: function() {
            return this._active
        },
        progress: function() {
            return this._progress
        },
        add: function(t) {
            var n = this;
            t && !this.options.disabled && (t.fileInput && !t.files ? this._getFileInputFiles(t.fileInput).always(function(e) {
                t.files = e, n._onAdd(null, t)
            }) : (t.files = e.makeArray(t.files), this._onAdd(null, t)))
        },
        send: function(t) {
            if (t && !this.options.disabled) {
                if (t.fileInput && !t.files) {
                    var n, i, r = this,
                        o = e.Deferred(),
                        a = o.promise();
                    return a.abort = function() {
                        return i = !0, n ? n.abort() : (o.reject(null, "abort", "abort"), a)
                    }, this._getFileInputFiles(t.fileInput).always(function(e) {
                        if (!i) {
                            if (!e.length) return void o.reject();
                            t.files = e, n = r._onSend(null, t), n.then(function(e, t, n) {
                                o.resolve(e, t, n)
                            }, function(e, t, n) {
                                o.reject(e, t, n)
                            })
                        }
                    }), this._enhancePromise(a)
                }
                if (t.files = e.makeArray(t.files), t.files.length) return this._onSend(null, t)
            }
            return this._getXHRPromise(!1, t && t.context)
        }
    })
}), ! function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : jQuery)
}(function(e) {
    var t = function() {
            if (e && e.fn && e.fn.select2 && e.fn.select2.amd) var t = e.fn.select2.amd;
            var t;
            return function() {
                    if (!t || !t.requirejs) {
                        t ? n = t : t = {};
                        var e, n, i;
                        ! function(t) {
                            function r(e, t) {
                                return $.call(e, t)
                            }

                            function o(e, t) {
                                var n, i, r, o, a, s, l, c, d, u, p, f = t && t.split("/"),
                                    h = y.map,
                                    m = h && h["*"] || {};
                                if (e && "." === e.charAt(0))
                                    if (t) {
                                        for (e = e.split("/"), a = e.length - 1, y.nodeIdCompat && C.test(e[a]) && (e[a] = e[a].replace(C, "")), e = f.slice(0, f.length - 1).concat(e), d = 0; d < e.length; d += 1)
                                            if (p = e[d], "." === p) e.splice(d, 1), d -= 1;
                                            else if (".." === p) {
                                            if (1 === d && (".." === e[2] || ".." === e[0])) break;
                                            d > 0 && (e.splice(d - 1, 2), d -= 2)
                                        }
                                        e = e.join("/")
                                    } else 0 === e.indexOf("./") && (e = e.substring(2));
                                if ((f || m) && h) {
                                    for (n = e.split("/"), d = n.length; d > 0; d -= 1) {
                                        if (i = n.slice(0, d).join("/"), f)
                                            for (u = f.length; u > 0; u -= 1)
                                                if (r = h[f.slice(0, u).join("/")], r && (r = r[i])) {
                                                    o = r, s = d;
                                                    break
                                                } if (o) break;
                                        !l && m && m[i] && (l = m[i], c = d)
                                    }!o && l && (o = l, s = c), o && (n.splice(0, s, o), e = n.join("/"))
                                }
                                return e
                            }

                            function a(e, n) {
                                return function() {
                                    var i = w.call(arguments, 0);
                                    return "string" != typeof i[0] && 1 === i.length && i.push(null), f.apply(t, i.concat([e, n]))
                                }
                            }

                            function s(e) {
                                return function(t) {
                                    return o(t, e)
                                }
                            }

                            function l(e) {
                                return function(t) {
                                    g[e] = t
                                }
                            }

                            function c(e) {
                                if (r(v, e)) {
                                    var n = v[e];
                                    delete v[e], b[e] = !0, p.apply(t, n)
                                }
                                if (!r(g, e) && !r(b, e)) throw new Error("No " + e);
                                return g[e]
                            }

                            function d(e) {
                                var t, n = e ? e.indexOf("!") : -1;
                                return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e]
                            }

                            function u(e) {
                                return function() {
                                    return y && y.config && y.config[e] || {}
                                }
                            }
                            var p, f, h, m, g = {},
                                v = {},
                                y = {},
                                b = {},
                                $ = Object.prototype.hasOwnProperty,
                                w = [].slice,
                                C = /\.js$/;
                            h = function(e, t) {
                                var n, i = d(e),
                                    r = i[0];
                                return e = i[1], r && (r = o(r, t), n = c(r)), r ? e = n && n.normalize ? n.normalize(e, s(t)) : o(e, t) : (e = o(e, t), i = d(e), r = i[0], e = i[1], r && (n = c(r))), {
                                    f: r ? r + "!" + e : e,
                                    n: e,
                                    pr: r,
                                    p: n
                                }
                            }, m = {
                                require: function(e) {
                                    return a(e)
                                },
                                exports: function(e) {
                                    var t = g[e];
                                    return "undefined" != typeof t ? t : g[e] = {}
                                },
                                module: function(e) {
                                    return {
                                        id: e,
                                        uri: "",
                                        exports: g[e],
                                        config: u(e)
                                    }
                                }
                            }, p = function(e, n, i, o) {
                                var s, d, u, p, f, y, $ = [],
                                    w = typeof i;
                                if (o = o || e, "undefined" === w || "function" === w) {
                                    for (n = !n.length && i.length ? ["require", "exports", "module"] : n, f = 0; f < n.length; f += 1)
                                        if (p = h(n[f], o), d = p.f, "require" === d) $[f] = m.require(e);
                                        else if ("exports" === d) $[f] = m.exports(e), y = !0;
                                    else if ("module" === d) s = $[f] = m.module(e);
                                    else if (r(g, d) || r(v, d) || r(b, d)) $[f] = c(d);
                                    else {
                                        if (!p.p) throw new Error(e + " missing " + d);
                                        p.p.load(p.n, a(o, !0), l(d), {}), $[f] = g[d]
                                    }
                                    u = i ? i.apply(g[e], $) : void 0, e && (s && s.exports !== t && s.exports !== g[e] ? g[e] = s.exports : u === t && y || (g[e] = u))
                                } else e && (g[e] = i)
                            }, e = n = f = function(e, n, i, r, o) {
                                if ("string" == typeof e) return m[e] ? m[e](n) : c(h(e, n).f);
                                if (!e.splice) {
                                    if (y = e, y.deps && f(y.deps, y.callback), !n) return;
                                    n.splice ? (e = n, n = i, i = null) : e = t
                                }
                                return n = n || function() {}, "function" == typeof i && (i = r, r = o), r ? p(t, e, n, i) : setTimeout(function() {
                                    p(t, e, n, i)
                                }, 4), f
                            }, f.config = function(e) {
                                return f(e)
                            }, e._defined = g, i = function(e, t, n) {
                                if ("string" != typeof e) throw new Error("See almond README: incorrect module build, no module name");
                                t.splice || (n = t, t = []), r(g, e) || r(v, e) || (v[e] = [e, t, n])
                            }, i.amd = {
                                jQuery: !0
                            }
                        }(), t.requirejs = e, t.require = n, t.define = i
                    }
                }(), t.define("almond", function() {}), t.define("jquery", [], function() {
                    var t = e || $;
                    return null == t && console && console.error && void 0, t
                }), t.define("select2/utils", ["jquery"], function(e) {
                    function t(e) {
                        var t = e.prototype,
                            n = [];
                        for (var i in t) {
                            var r = t[i];
                            "function" == typeof r && "constructor" !== i && n.push(i)
                        }
                        return n
                    }
                    var n = {};
                    n.Extend = function(e, t) {
                        function n() {
                            this.constructor = e
                        }
                        var i = {}.hasOwnProperty;
                        for (var r in t) i.call(t, r) && (e[r] = t[r]);
                        return n.prototype = t.prototype, e.prototype = new n, e.__super__ = t.prototype, e
                    }, n.Decorate = function(e, n) {
                        function i() {
                            var t = Array.prototype.unshift,
                                i = n.prototype.constructor.length,
                                r = e.prototype.constructor;
                            i > 0 && (t.call(arguments, e.prototype.constructor), r = n.prototype.constructor), r.apply(this, arguments)
                        }

                        function r() {
                            this.constructor = i
                        }
                        var o = t(n),
                            a = t(e);
                        n.displayName = e.displayName, i.prototype = new r;
                        for (var s = 0; s < a.length; s++) {
                            var l = a[s];
                            i.prototype[l] = e.prototype[l]
                        }
                        for (var c = (function(e) {
                                var t = function() {};
                                e in i.prototype && (t = i.prototype[e]);
                                var r = n.prototype[e];
                                return function() {
                                    var e = Array.prototype.unshift;
                                    return e.call(arguments, t), r.apply(this, arguments)
                                }
                            }), d = 0; d < o.length; d++) {
                            var u = o[d];
                            i.prototype[u] = c(u)
                        }
                        return i
                    };
                    var i = function() {
                        this.listeners = {}
                    };
                    return i.prototype.on = function(e, t) {
                        this.listeners = this.listeners || {}, e in this.listeners ? this.listeners[e].push(t) : this.listeners[e] = [t]
                    }, i.prototype.trigger = function(e) {
                        var t = Array.prototype.slice,
                            n = t.call(arguments, 1);
                        this.listeners = this.listeners || {}, null == n && (n = []), 0 === n.length && n.push({}), n[0]._type = e, e in this.listeners && this.invoke(this.listeners[e], t.call(arguments, 1)), "*" in this.listeners && this.invoke(this.listeners["*"], arguments)
                    }, i.prototype.invoke = function(e, t) {
                        for (var n = 0, i = e.length; i > n; n++) e[n].apply(this, t)
                    }, n.Observable = i, n.generateChars = function(e) {
                        for (var t = "", n = 0; e > n; n++) {
                            var i = Math.floor(36 * Math.random());
                            t += i.toString(36)
                        }
                        return t
                    }, n.bind = function(e, t) {
                        return function() {
                            e.apply(t, arguments)
                        }
                    }, n._convertData = function(e) {
                        for (var t in e) {
                            var n = t.split("-"),
                                i = e;
                            if (1 !== n.length) {
                                for (var r = 0; r < n.length; r++) {
                                    var o = n[r];
                                    o = o.substring(0, 1).toLowerCase() + o.substring(1), o in i || (i[o] = {}), r == n.length - 1 && (i[o] = e[t]), i = i[o]
                                }
                                delete e[t]
                            }
                        }
                        return e
                    }, n.hasScroll = function(t, n) {
                        var i = e(n),
                            r = n.style.overflowX,
                            o = n.style.overflowY;
                        return (r !== o || "hidden" !== o && "visible" !== o) && ("scroll" === r || "scroll" === o || (i.innerHeight() < n.scrollHeight || i.innerWidth() < n.scrollWidth))
                    }, n.escapeMarkup = function(e) {
                        var t = {
                            "\\": "&#92;",
                            "&": "&amp;",
                            "<": "&lt;",
                            ">": "&gt;",
                            '"': "&quot;",
                            "'": "&#39;",
                            "/": "&#47;"
                        };
                        return "string" != typeof e ? e : String(e).replace(/[&<>"'\/\\]/g, function(e) {
                            return t[e]
                        })
                    }, n.appendMany = function(t, n) {
                        if ("1.7" === e.fn.jquery.substr(0, 3)) {
                            var i = e();
                            e.map(n, function(e) {
                                i = i.add(e)
                            }), n = i
                        }
                        t.append(n)
                    }, n
                }), t.define("select2/results", ["jquery", "./utils"], function(e, t) {
                    function n(e, t, i) {
                        this.$element = e, this.data = i, this.options = t, n.__super__.constructor.call(this)
                    }
                    return t.Extend(n, t.Observable), n.prototype.render = function() {
                        var t = e('<ul class="select2-results__options" role="tree"></ul>');
                        return this.options.get("multiple") && t.attr("aria-multiselectable", "true"), this.$results = t, t
                    }, n.prototype.clear = function() {
                        this.$results.empty()
                    }, n.prototype.displayMessage = function(t) {
                        var n = this.options.get("escapeMarkup");
                        this.clear(), this.hideLoading();
                        var i = e('<li role="treeitem" aria-live="assertive" class="select2-results__option"></li>'),
                            r = this.options.get("translations").get(t.message);
                        i.append(n(r(t.args))), i[0].className += " select2-results__message", this.$results.append(i)
                    }, n.prototype.hideMessages = function() {
                        this.$results.find(".select2-results__message").remove()
                    }, n.prototype.append = function(e) {
                        this.hideLoading();
                        var t = [];
                        if (null == e.results || 0 === e.results.length) return void(0 === this.$results.children().length && this.trigger("results:message", {
                            message: "noResults"
                        }));
                        e.results = this.sort(e.results);
                        for (var n = 0; n < e.results.length; n++) {
                            var i = e.results[n],
                                r = this.option(i);
                            t.push(r)
                        }
                        this.$results.append(t)
                    }, n.prototype.position = function(e, t) {
                        var n = t.find(".select2-results");
                        n.append(e)
                    }, n.prototype.sort = function(e) {
                        var t = this.options.get("sorter");
                        return t(e)
                    }, n.prototype.highlightFirstItem = function() {
                        var e = this.$results.find(".select2-results__option[aria-selected]"),
                            t = e.filter("[aria-selected=true]");
                        t.length > 0 ? t.first().trigger("mouseenter") : e.first().trigger("mouseenter"), this.ensureHighlightVisible()
                    }, n.prototype.setClasses = function() {
                        var t = this;
                        this.data.current(function(n) {
                            var i = e.map(n, function(e) {
                                    return e.id.toString()
                                }),
                                r = t.$results.find(".select2-results__option[aria-selected]");
                            r.each(function() {
                                var t = e(this),
                                    n = e.data(this, "data"),
                                    r = "" + n.id;
                                null != n.element && n.element.selected || null == n.element && e.inArray(r, i) > -1 ? t.attr("aria-selected", "true") : t.attr("aria-selected", "false")
                            })
                        })
                    }, n.prototype.showLoading = function(e) {
                        this.hideLoading();
                        var t = this.options.get("translations").get("searching"),
                            n = {
                                disabled: !0,
                                loading: !0,
                                text: t(e)
                            },
                            i = this.option(n);
                        i.className += " loading-results", this.$results.prepend(i)
                    }, n.prototype.hideLoading = function() {
                        this.$results.find(".loading-results").remove()
                    }, n.prototype.option = function(t) {
                        var n = document.createElement("li");
                        n.className = "select2-results__option";
                        var i = {
                            role: "treeitem",
                            "aria-selected": "false"
                        };
                        t.disabled && (delete i["aria-selected"], i["aria-disabled"] = "true"), null == t.id && delete i["aria-selected"], null != t._resultId && (n.id = t._resultId), t.title && (n.title = t.title), t.children && (i.role = "group", i["aria-label"] = t.text, delete i["aria-selected"]);
                        for (var r in i) {
                            var o = i[r];
                            n.setAttribute(r, o)
                        }
                        if (t.children) {
                            var a = e(n),
                                s = document.createElement("strong");
                            s.className = "select2-results__group", e(s), this.template(t, s);
                            for (var l = [], c = 0; c < t.children.length; c++) {
                                var d = t.children[c],
                                    u = this.option(d);
                                l.push(u)
                            }
                            var p = e("<ul></ul>", {
                                "class": "select2-results__options select2-results__options--nested"
                            });
                            p.append(l), a.append(s), a.append(p)
                        } else this.template(t, n);
                        return e.data(n, "data", t), n
                    }, n.prototype.bind = function(t, n) {
                        var i = this,
                            r = t.id + "-results";
                        this.$results.attr("id", r), t.on("results:all", function(e) {
                            i.clear(), i.append(e.data), t.isOpen() && (i.setClasses(), i.highlightFirstItem())
                        }), t.on("results:append", function(e) {
                            i.append(e.data), t.isOpen() && i.setClasses()
                        }), t.on("query", function(e) {
                            i.hideMessages(), i.showLoading(e)
                        }), t.on("select", function() {
                            t.isOpen() && (i.setClasses(), i.highlightFirstItem())
                        }), t.on("unselect", function() {
                            t.isOpen() && (i.setClasses(), i.highlightFirstItem())
                        }), t.on("open", function() {
                            i.$results.attr("aria-expanded", "true"), i.$results.attr("aria-hidden", "false"), i.setClasses(), i.ensureHighlightVisible()
                        }), t.on("close", function() {
                            i.$results.attr("aria-expanded", "false"), i.$results.attr("aria-hidden", "true"), i.$results.removeAttr("aria-activedescendant")
                        }), t.on("results:toggle", function() {
                            var e = i.getHighlightedResults();
                            0 !== e.length && e.trigger("mouseup")
                        }), t.on("results:select", function() {
                            var e = i.getHighlightedResults();
                            if (0 !== e.length) {
                                var t = e.data("data");
                                "true" == e.attr("aria-selected") ? i.trigger("close", {}) : i.trigger("select", {
                                    data: t
                                })
                            }
                        }), t.on("results:previous", function() {
                            var e = i.getHighlightedResults(),
                                t = i.$results.find("[aria-selected]"),
                                n = t.index(e);
                            if (0 !== n) {
                                var r = n - 1;
                                0 === e.length && (r = 0);
                                var o = t.eq(r);
                                o.trigger("mouseenter");
                                var a = i.$results.offset().top,
                                    s = o.offset().top,
                                    l = i.$results.scrollTop() + (s - a);
                                0 === r ? i.$results.scrollTop(0) : 0 > s - a && i.$results.scrollTop(l)
                            }
                        }), t.on("results:next", function() {
                            var e = i.getHighlightedResults(),
                                t = i.$results.find("[aria-selected]"),
                                n = t.index(e),
                                r = n + 1;
                            if (!(r >= t.length)) {
                                var o = t.eq(r);
                                o.trigger("mouseenter");
                                var a = i.$results.offset().top + i.$results.outerHeight(!1),
                                    s = o.offset().top + o.outerHeight(!1),
                                    l = i.$results.scrollTop() + s - a;
                                0 === r ? i.$results.scrollTop(0) : s > a && i.$results.scrollTop(l)
                            }
                        }), t.on("results:focus", function(e) {
                            e.element.addClass("select2-results__option--highlighted")
                        }), t.on("results:message", function(e) {
                            i.displayMessage(e)
                        }), e.fn.mousewheel && this.$results.on("mousewheel", function(e) {
                            var t = i.$results.scrollTop(),
                                n = i.$results.get(0).scrollHeight - t + e.deltaY,
                                r = e.deltaY > 0 && t - e.deltaY <= 0,
                                o = e.deltaY < 0 && n <= i.$results.height();
                            r ? (i.$results.scrollTop(0), e.preventDefault(), e.stopPropagation()) : o && (i.$results.scrollTop(i.$results.get(0).scrollHeight - i.$results.height()), e.preventDefault(), e.stopPropagation())
                        }), this.$results.on("mouseup", ".select2-results__option[aria-selected]", function(t) {
                            var n = e(this),
                                r = n.data("data");
                            return "true" === n.attr("aria-selected") ? void(i.options.get("multiple") ? i.trigger("unselect", {
                                originalEvent: t,
                                data: r
                            }) : i.trigger("close", {})) : void i.trigger("select", {
                                originalEvent: t,
                                data: r
                            })
                        }), this.$results.on("mouseenter", ".select2-results__option[aria-selected]", function(t) {
                            var n = e(this).data("data");
                            i.getHighlightedResults().removeClass("select2-results__option--highlighted"), i.trigger("results:focus", {
                                data: n,
                                element: e(this)
                            })
                        })
                    }, n.prototype.getHighlightedResults = function() {
                        var e = this.$results.find(".select2-results__option--highlighted");
                        return e
                    }, n.prototype.destroy = function() {
                        this.$results.remove()
                    }, n.prototype.ensureHighlightVisible = function() {
                        var e = this.getHighlightedResults();
                        if (0 !== e.length) {
                            var t = this.$results.find("[aria-selected]"),
                                n = t.index(e),
                                i = this.$results.offset().top,
                                r = e.offset().top,
                                o = this.$results.scrollTop() + (r - i),
                                a = r - i;
                            o -= 2 * e.outerHeight(!1), 2 >= n ? this.$results.scrollTop(0) : (a > this.$results.outerHeight() || 0 > a) && this.$results.scrollTop(o);
                        }
                    }, n.prototype.template = function(t, n) {
                        var i = this.options.get("templateResult"),
                            r = this.options.get("escapeMarkup"),
                            o = i(t, n);
                        null == o ? n.style.display = "none" : "string" == typeof o ? n.innerHTML = r(o) : e(n).append(o)
                    }, n
                }), t.define("select2/keys", [], function() {
                    var e = {
                        BACKSPACE: 8,
                        TAB: 9,
                        ENTER: 13,
                        SHIFT: 16,
                        CTRL: 17,
                        ALT: 18,
                        ESC: 27,
                        SPACE: 32,
                        PAGE_UP: 33,
                        PAGE_DOWN: 34,
                        END: 35,
                        HOME: 36,
                        LEFT: 37,
                        UP: 38,
                        RIGHT: 39,
                        DOWN: 40,
                        DELETE: 46
                    };
                    return e
                }), t.define("select2/selection/base", ["jquery", "../utils", "../keys"], function(e, t, n) {
                    function i(e, t) {
                        this.$element = e, this.options = t, i.__super__.constructor.call(this)
                    }
                    return t.Extend(i, t.Observable), i.prototype.render = function() {
                        var t = e('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');
                        return this._tabindex = 0, null != this.$element.data("old-tabindex") ? this._tabindex = this.$element.data("old-tabindex") : null != this.$element.attr("tabindex") && (this._tabindex = this.$element.attr("tabindex")), t.attr("title", this.$element.attr("title")), t.attr("tabindex", this._tabindex), this.$selection = t, t
                    }, i.prototype.bind = function(e, t) {
                        var i = this,
                            r = (e.id + "-container", e.id + "-results");
                        this.container = e, this.$selection.on("focus", function(e) {
                            i.trigger("focus", e)
                        }), this.$selection.on("blur", function(e) {
                            i._handleBlur(e)
                        }), this.$selection.on("keydown", function(e) {
                            i.trigger("keypress", e), e.which === n.SPACE && e.preventDefault()
                        }), e.on("results:focus", function(e) {
                            i.$selection.attr("aria-activedescendant", e.data._resultId)
                        }), e.on("selection:update", function(e) {
                            i.update(e.data)
                        }), e.on("open", function() {
                            i.$selection.attr("aria-expanded", "true"), i.$selection.attr("aria-owns", r), i._attachCloseHandler(e)
                        }), e.on("close", function() {
                            i.$selection.attr("aria-expanded", "false"), i.$selection.removeAttr("aria-activedescendant"), i.$selection.removeAttr("aria-owns"), i.$selection.focus(), i._detachCloseHandler(e)
                        }), e.on("enable", function() {
                            i.$selection.attr("tabindex", i._tabindex)
                        }), e.on("disable", function() {
                            i.$selection.attr("tabindex", "-1")
                        })
                    }, i.prototype._handleBlur = function(t) {
                        var n = this;
                        window.setTimeout(function() {
                            document.activeElement == n.$selection[0] || e.contains(n.$selection[0], document.activeElement) || n.trigger("blur", t)
                        }, 1)
                    }, i.prototype._attachCloseHandler = function(t) {
                        e(document.body).on("mousedown.select2." + t.id, function(t) {
                            var n = e(t.target),
                                i = n.closest(".select2"),
                                r = e(".select2.select2-container--open");
                            r.each(function() {
                                var t = e(this);
                                if (this != i[0]) {
                                    var n = t.data("element");
                                    n.select2("close")
                                }
                            })
                        })
                    }, i.prototype._detachCloseHandler = function(t) {
                        e(document.body).off("mousedown.select2." + t.id)
                    }, i.prototype.position = function(e, t) {
                        var n = t.find(".selection");
                        n.append(e)
                    }, i.prototype.destroy = function() {
                        this._detachCloseHandler(this.container)
                    }, i.prototype.update = function(e) {
                        throw new Error("The `update` method must be defined in child classes.")
                    }, i
                }), t.define("select2/selection/single", ["jquery", "./base", "../utils", "../keys"], function(e, t, n, i) {
                    function r() {
                        r.__super__.constructor.apply(this, arguments)
                    }
                    return n.Extend(r, t), r.prototype.render = function() {
                        var e = r.__super__.render.call(this);
                        return e.addClass("select2-selection--single"), e.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'), e
                    }, r.prototype.bind = function(e, t) {
                        var n = this;
                        r.__super__.bind.apply(this, arguments);
                        var i = e.id + "-container";
                        this.$selection.find(".select2-selection__rendered").attr("id", i), this.$selection.attr("aria-labelledby", i), this.$selection.on("mousedown", function(e) {
                            1 === e.which && n.trigger("toggle", {
                                originalEvent: e
                            })
                        }), this.$selection.on("focus", function(e) {}), this.$selection.on("blur", function(e) {}), e.on("focus", function(t) {
                            e.isOpen() || n.$selection.focus()
                        }), e.on("selection:update", function(e) {
                            n.update(e.data)
                        })
                    }, r.prototype.clear = function() {
                        this.$selection.find(".select2-selection__rendered").empty()
                    }, r.prototype.display = function(e, t) {
                        var n = this.options.get("templateSelection"),
                            i = this.options.get("escapeMarkup");
                        return i(n(e, t))
                    }, r.prototype.selectionContainer = function() {
                        return e("<span></span>")
                    }, r.prototype.update = function(e) {
                        if (0 === e.length) return void this.clear();
                        var t = e[0],
                            n = this.$selection.find(".select2-selection__rendered"),
                            i = this.display(t, n);
                        n.empty().append(i), n.prop("title", t.title || t.text)
                    }, r
                }), t.define("select2/selection/multiple", ["jquery", "./base", "../utils"], function(e, t, n) {
                    function i(e, t) {
                        i.__super__.constructor.apply(this, arguments)
                    }
                    return n.Extend(i, t), i.prototype.render = function() {
                        var e = i.__super__.render.call(this);
                        return e.addClass("select2-selection--multiple"), e.html('<ul class="select2-selection__rendered"></ul>'), e
                    }, i.prototype.bind = function(t, n) {
                        var r = this;
                        i.__super__.bind.apply(this, arguments), this.$selection.on("click", function(e) {
                            r.trigger("toggle", {
                                originalEvent: e
                            })
                        }), this.$selection.on("click", ".select2-selection__choice__remove", function(t) {
                            if (!r.options.get("disabled")) {
                                var n = e(this),
                                    i = n.parent(),
                                    o = i.data("data");
                                r.trigger("unselect", {
                                    originalEvent: t,
                                    data: o
                                })
                            }
                        })
                    }, i.prototype.clear = function() {
                        this.$selection.find(".select2-selection__rendered").empty()
                    }, i.prototype.display = function(e, t) {
                        var n = this.options.get("templateSelection"),
                            i = this.options.get("escapeMarkup");
                        return i(n(e, t))
                    }, i.prototype.selectionContainer = function() {
                        var t = e('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>');
                        return t
                    }, i.prototype.update = function(e) {
                        if (this.clear(), 0 !== e.length) {
                            for (var t = [], i = 0; i < e.length; i++) {
                                var r = e[i],
                                    o = this.selectionContainer(),
                                    a = this.display(r, o);
                                o.append(a), o.prop("title", r.title || r.text), o.data("data", r), t.push(o)
                            }
                            var s = this.$selection.find(".select2-selection__rendered");
                            n.appendMany(s, t)
                        }
                    }, i
                }), t.define("select2/selection/placeholder", ["../utils"], function(e) {
                    function t(e, t, n) {
                        this.placeholder = this.normalizePlaceholder(n.get("placeholder")), e.call(this, t, n)
                    }
                    return t.prototype.normalizePlaceholder = function(e, t) {
                        return "string" == typeof t && (t = {
                            id: "",
                            text: t
                        }), t
                    }, t.prototype.createPlaceholder = function(e, t) {
                        var n = this.selectionContainer();
                        return n.html(this.display(t)), n.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"), n
                    }, t.prototype.update = function(e, t) {
                        var n = 1 == t.length && t[0].id != this.placeholder.id,
                            i = t.length > 1;
                        if (i || n) return e.call(this, t);
                        this.clear();
                        var r = this.createPlaceholder(this.placeholder);
                        this.$selection.find(".select2-selection__rendered").append(r)
                    }, t
                }), t.define("select2/selection/allowClear", ["jquery", "../keys"], function(e, t) {
                    function n() {}
                    return n.prototype.bind = function(e, t, n) {
                        var i = this;
                        e.call(this, t, n), null == this.placeholder && this.options.get("debug") && window.console && console.error && void 0, this.$selection.on("mousedown", ".select2-selection__clear", function(e) {
                            i._handleClear(e)
                        }), t.on("keypress", function(e) {
                            i._handleKeyboardClear(e, t)
                        })
                    }, n.prototype._handleClear = function(e, t) {
                        if (!this.options.get("disabled")) {
                            var n = this.$selection.find(".select2-selection__clear");
                            if (0 !== n.length) {
                                t.stopPropagation();
                                for (var i = n.data("data"), r = 0; r < i.length; r++) {
                                    var o = {
                                        data: i[r]
                                    };
                                    if (this.trigger("unselect", o), o.prevented) return
                                }
                                this.$element.val(this.placeholder.id).trigger("change"), this.trigger("toggle", {})
                            }
                        }
                    }, n.prototype._handleKeyboardClear = function(e, n, i) {
                        i.isOpen() || (n.which == t.DELETE || n.which == t.BACKSPACE) && this._handleClear(n)
                    }, n.prototype.update = function(t, n) {
                        if (t.call(this, n), !(this.$selection.find(".select2-selection__placeholder").length > 0 || 0 === n.length)) {
                            var i = e('<span class="select2-selection__clear">&times;</span>');
                            i.data("data", n), this.$selection.find(".select2-selection__rendered").prepend(i)
                        }
                    }, n
                }), t.define("select2/selection/search", ["jquery", "../utils", "../keys"], function(e, t, n) {
                    function i(e, t, n) {
                        e.call(this, t, n)
                    }
                    return i.prototype.render = function(t) {
                        var n = e('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>');
                        this.$searchContainer = n, this.$search = n.find("input");
                        var i = t.call(this);
                        return this._transferTabIndex(), i
                    }, i.prototype.bind = function(e, t, i) {
                        var r = this;
                        e.call(this, t, i), t.on("open", function() {
                            r.$search.trigger("focus")
                        }), t.on("close", function() {
                            r.$search.val(""), r.$search.removeAttr("aria-activedescendant"), r.$search.trigger("focus")
                        }), t.on("enable", function() {
                            r.$search.prop("disabled", !1), r._transferTabIndex()
                        }), t.on("disable", function() {
                            r.$search.prop("disabled", !0)
                        }), t.on("focus", function(e) {
                            r.$search.trigger("focus")
                        }), t.on("results:focus", function(e) {
                            r.$search.attr("aria-activedescendant", e.id)
                        }), this.$selection.on("focusin", ".select2-search--inline", function(e) {
                            r.trigger("focus", e)
                        }), this.$selection.on("focusout", ".select2-search--inline", function(e) {
                            r._handleBlur(e)
                        }), this.$selection.on("keydown", ".select2-search--inline", function(e) {
                            e.stopPropagation(), r.trigger("keypress", e), r._keyUpPrevented = e.isDefaultPrevented();
                            var t = e.which;
                            if (t === n.BACKSPACE && "" === r.$search.val()) {
                                var i = r.$searchContainer.prev(".select2-selection__choice");
                                if (i.length > 0) {
                                    var o = i.data("data");
                                    r.searchRemoveChoice(o), e.preventDefault()
                                }
                            }
                        });
                        var o = document.documentMode,
                            a = o && 11 >= o;
                        this.$selection.on("input.searchcheck", ".select2-search--inline", function(e) {
                            return a ? void r.$selection.off("input.search input.searchcheck") : void r.$selection.off("keyup.search")
                        }), this.$selection.on("keyup.search input.search", ".select2-search--inline", function(e) {
                            if (a && "input" === e.type) return void r.$selection.off("input.search input.searchcheck");
                            var t = e.which;
                            t != n.SHIFT && t != n.CTRL && t != n.ALT && t != n.TAB && r.handleSearch(e)
                        })
                    }, i.prototype._transferTabIndex = function(e) {
                        this.$search.attr("tabindex", this.$selection.attr("tabindex")), this.$selection.attr("tabindex", "-1")
                    }, i.prototype.createPlaceholder = function(e, t) {
                        this.$search.attr("placeholder", t.text)
                    }, i.prototype.update = function(e, t) {
                        var n = this.$search[0] == document.activeElement;
                        this.$search.attr("placeholder", ""), e.call(this, t), this.$selection.find(".select2-selection__rendered").append(this.$searchContainer), this.resizeSearch(), n && this.$search.focus()
                    }, i.prototype.handleSearch = function() {
                        if (this.resizeSearch(), !this._keyUpPrevented) {
                            var e = this.$search.val();
                            this.trigger("query", {
                                term: e
                            })
                        }
                        this._keyUpPrevented = !1
                    }, i.prototype.searchRemoveChoice = function(e, t) {
                        this.trigger("unselect", {
                            data: t
                        }), this.$search.val(t.text), this.handleSearch()
                    }, i.prototype.resizeSearch = function() {
                        this.$search.css("width", "25px");
                        var e = "";
                        if ("" !== this.$search.attr("placeholder")) e = this.$selection.find(".select2-selection__rendered").innerWidth();
                        else {
                            var t = this.$search.val().length + 1;
                            e = .75 * t + "em"
                        }
                        this.$search.css("width", e)
                    }, i
                }), t.define("select2/selection/eventRelay", ["jquery"], function(e) {
                    function t() {}
                    return t.prototype.bind = function(t, n, i) {
                        var r = this,
                            o = ["open", "opening", "close", "closing", "select", "selecting", "unselect", "unselecting"],
                            a = ["opening", "closing", "selecting", "unselecting"];
                        t.call(this, n, i), n.on("*", function(t, n) {
                            if (-1 !== e.inArray(t, o)) {
                                n = n || {};
                                var i = e.Event("select2:" + t, {
                                    params: n
                                });
                                r.$element.trigger(i), -1 !== e.inArray(t, a) && (n.prevented = i.isDefaultPrevented())
                            }
                        })
                    }, t
                }), t.define("select2/translation", ["jquery", "require"], function(e, t) {
                    function n(e) {
                        this.dict = e || {}
                    }
                    return n.prototype.all = function() {
                        return this.dict
                    }, n.prototype.get = function(e) {
                        return this.dict[e]
                    }, n.prototype.extend = function(t) {
                        this.dict = e.extend({}, t.all(), this.dict)
                    }, n._cache = {}, n.loadPath = function(e) {
                        if (!(e in n._cache)) {
                            var i = t(e);
                            n._cache[e] = i
                        }
                        return new n(n._cache[e])
                    }, n
                }), t.define("select2/diacritics", [], function() {
                    var e = {
                        "Ⓐ": "A",
                        "Ａ": "A",
                        "À": "A",
                        "Á": "A",
                        "Â": "A",
                        "Ầ": "A",
                        "Ấ": "A",
                        "Ẫ": "A",
                        "Ẩ": "A",
                        "Ã": "A",
                        "Ā": "A",
                        "Ă": "A",
                        "Ằ": "A",
                        "Ắ": "A",
                        "Ẵ": "A",
                        "Ẳ": "A",
                        "Ȧ": "A",
                        "Ǡ": "A",
                        "Ä": "A",
                        "Ǟ": "A",
                        "Ả": "A",
                        "Å": "A",
                        "Ǻ": "A",
                        "Ǎ": "A",
                        "Ȁ": "A",
                        "Ȃ": "A",
                        "Ạ": "A",
                        "Ậ": "A",
                        "Ặ": "A",
                        "Ḁ": "A",
                        "Ą": "A",
                        "Ⱥ": "A",
                        "Ɐ": "A",
                        "Ꜳ": "AA",
                        "Æ": "AE",
                        "Ǽ": "AE",
                        "Ǣ": "AE",
                        "Ꜵ": "AO",
                        "Ꜷ": "AU",
                        "Ꜹ": "AV",
                        "Ꜻ": "AV",
                        "Ꜽ": "AY",
                        "Ⓑ": "B",
                        "Ｂ": "B",
                        "Ḃ": "B",
                        "Ḅ": "B",
                        "Ḇ": "B",
                        "Ƀ": "B",
                        "Ƃ": "B",
                        "Ɓ": "B",
                        "Ⓒ": "C",
                        "Ｃ": "C",
                        "Ć": "C",
                        "Ĉ": "C",
                        "Ċ": "C",
                        "Č": "C",
                        "Ç": "C",
                        "Ḉ": "C",
                        "Ƈ": "C",
                        "Ȼ": "C",
                        "Ꜿ": "C",
                        "Ⓓ": "D",
                        "Ｄ": "D",
                        "Ḋ": "D",
                        "Ď": "D",
                        "Ḍ": "D",
                        "Ḑ": "D",
                        "Ḓ": "D",
                        "Ḏ": "D",
                        "Đ": "D",
                        "Ƌ": "D",
                        "Ɗ": "D",
                        "Ɖ": "D",
                        "Ꝺ": "D",
                        "Ǳ": "DZ",
                        "Ǆ": "DZ",
                        "ǲ": "Dz",
                        "ǅ": "Dz",
                        "Ⓔ": "E",
                        "Ｅ": "E",
                        "È": "E",
                        "É": "E",
                        "Ê": "E",
                        "Ề": "E",
                        "Ế": "E",
                        "Ễ": "E",
                        "Ể": "E",
                        "Ẽ": "E",
                        "Ē": "E",
                        "Ḕ": "E",
                        "Ḗ": "E",
                        "Ĕ": "E",
                        "Ė": "E",
                        "Ë": "E",
                        "Ẻ": "E",
                        "Ě": "E",
                        "Ȅ": "E",
                        "Ȇ": "E",
                        "Ẹ": "E",
                        "Ệ": "E",
                        "Ȩ": "E",
                        "Ḝ": "E",
                        "Ę": "E",
                        "Ḙ": "E",
                        "Ḛ": "E",
                        "Ɛ": "E",
                        "Ǝ": "E",
                        "Ⓕ": "F",
                        "Ｆ": "F",
                        "Ḟ": "F",
                        "Ƒ": "F",
                        "Ꝼ": "F",
                        "Ⓖ": "G",
                        "Ｇ": "G",
                        "Ǵ": "G",
                        "Ĝ": "G",
                        "Ḡ": "G",
                        "Ğ": "G",
                        "Ġ": "G",
                        "Ǧ": "G",
                        "Ģ": "G",
                        "Ǥ": "G",
                        "Ɠ": "G",
                        "Ꞡ": "G",
                        "Ᵹ": "G",
                        "Ꝿ": "G",
                        "Ⓗ": "H",
                        "Ｈ": "H",
                        "Ĥ": "H",
                        "Ḣ": "H",
                        "Ḧ": "H",
                        "Ȟ": "H",
                        "Ḥ": "H",
                        "Ḩ": "H",
                        "Ḫ": "H",
                        "Ħ": "H",
                        "Ⱨ": "H",
                        "Ⱶ": "H",
                        "Ɥ": "H",
                        "Ⓘ": "I",
                        "Ｉ": "I",
                        "Ì": "I",
                        "Í": "I",
                        "Î": "I",
                        "Ĩ": "I",
                        "Ī": "I",
                        "Ĭ": "I",
                        "İ": "I",
                        "Ï": "I",
                        "Ḯ": "I",
                        "Ỉ": "I",
                        "Ǐ": "I",
                        "Ȉ": "I",
                        "Ȋ": "I",
                        "Ị": "I",
                        "Į": "I",
                        "Ḭ": "I",
                        "Ɨ": "I",
                        "Ⓙ": "J",
                        "Ｊ": "J",
                        "Ĵ": "J",
                        "Ɉ": "J",
                        "Ⓚ": "K",
                        "Ｋ": "K",
                        "Ḱ": "K",
                        "Ǩ": "K",
                        "Ḳ": "K",
                        "Ķ": "K",
                        "Ḵ": "K",
                        "Ƙ": "K",
                        "Ⱪ": "K",
                        "Ꝁ": "K",
                        "Ꝃ": "K",
                        "Ꝅ": "K",
                        "Ꞣ": "K",
                        "Ⓛ": "L",
                        "Ｌ": "L",
                        "Ŀ": "L",
                        "Ĺ": "L",
                        "Ľ": "L",
                        "Ḷ": "L",
                        "Ḹ": "L",
                        "Ļ": "L",
                        "Ḽ": "L",
                        "Ḻ": "L",
                        "Ł": "L",
                        "Ƚ": "L",
                        "Ɫ": "L",
                        "Ⱡ": "L",
                        "Ꝉ": "L",
                        "Ꝇ": "L",
                        "Ꞁ": "L",
                        "Ǉ": "LJ",
                        "ǈ": "Lj",
                        "Ⓜ": "M",
                        "Ｍ": "M",
                        "Ḿ": "M",
                        "Ṁ": "M",
                        "Ṃ": "M",
                        "Ɱ": "M",
                        "Ɯ": "M",
                        "Ⓝ": "N",
                        "Ｎ": "N",
                        "Ǹ": "N",
                        "Ń": "N",
                        "Ñ": "N",
                        "Ṅ": "N",
                        "Ň": "N",
                        "Ṇ": "N",
                        "Ņ": "N",
                        "Ṋ": "N",
                        "Ṉ": "N",
                        "Ƞ": "N",
                        "Ɲ": "N",
                        "Ꞑ": "N",
                        "Ꞥ": "N",
                        "Ǌ": "NJ",
                        "ǋ": "Nj",
                        "Ⓞ": "O",
                        "Ｏ": "O",
                        "Ò": "O",
                        "Ó": "O",
                        "Ô": "O",
                        "Ồ": "O",
                        "Ố": "O",
                        "Ỗ": "O",
                        "Ổ": "O",
                        "Õ": "O",
                        "Ṍ": "O",
                        "Ȭ": "O",
                        "Ṏ": "O",
                        "Ō": "O",
                        "Ṑ": "O",
                        "Ṓ": "O",
                        "Ŏ": "O",
                        "Ȯ": "O",
                        "Ȱ": "O",
                        "Ö": "O",
                        "Ȫ": "O",
                        "Ỏ": "O",
                        "Ő": "O",
                        "Ǒ": "O",
                        "Ȍ": "O",
                        "Ȏ": "O",
                        "Ơ": "O",
                        "Ờ": "O",
                        "Ớ": "O",
                        "Ỡ": "O",
                        "Ở": "O",
                        "Ợ": "O",
                        "Ọ": "O",
                        "Ộ": "O",
                        "Ǫ": "O",
                        "Ǭ": "O",
                        "Ø": "O",
                        "Ǿ": "O",
                        "Ɔ": "O",
                        "Ɵ": "O",
                        "Ꝋ": "O",
                        "Ꝍ": "O",
                        "Ƣ": "OI",
                        "Ꝏ": "OO",
                        "Ȣ": "OU",
                        "Ⓟ": "P",
                        "Ｐ": "P",
                        "Ṕ": "P",
                        "Ṗ": "P",
                        "Ƥ": "P",
                        "Ᵽ": "P",
                        "Ꝑ": "P",
                        "Ꝓ": "P",
                        "Ꝕ": "P",
                        "Ⓠ": "Q",
                        "Ｑ": "Q",
                        "Ꝗ": "Q",
                        "Ꝙ": "Q",
                        "Ɋ": "Q",
                        "Ⓡ": "R",
                        "Ｒ": "R",
                        "Ŕ": "R",
                        "Ṙ": "R",
                        "Ř": "R",
                        "Ȑ": "R",
                        "Ȓ": "R",
                        "Ṛ": "R",
                        "Ṝ": "R",
                        "Ŗ": "R",
                        "Ṟ": "R",
                        "Ɍ": "R",
                        "Ɽ": "R",
                        "Ꝛ": "R",
                        "Ꞧ": "R",
                        "Ꞃ": "R",
                        "Ⓢ": "S",
                        "Ｓ": "S",
                        "ẞ": "S",
                        "Ś": "S",
                        "Ṥ": "S",
                        "Ŝ": "S",
                        "Ṡ": "S",
                        "Š": "S",
                        "Ṧ": "S",
                        "Ṣ": "S",
                        "Ṩ": "S",
                        "Ș": "S",
                        "Ş": "S",
                        "Ȿ": "S",
                        "Ꞩ": "S",
                        "Ꞅ": "S",
                        "Ⓣ": "T",
                        "Ｔ": "T",
                        "Ṫ": "T",
                        "Ť": "T",
                        "Ṭ": "T",
                        "Ț": "T",
                        "Ţ": "T",
                        "Ṱ": "T",
                        "Ṯ": "T",
                        "Ŧ": "T",
                        "Ƭ": "T",
                        "Ʈ": "T",
                        "Ⱦ": "T",
                        "Ꞇ": "T",
                        "Ꜩ": "TZ",
                        "Ⓤ": "U",
                        "Ｕ": "U",
                        "Ù": "U",
                        "Ú": "U",
                        "Û": "U",
                        "Ũ": "U",
                        "Ṹ": "U",
                        "Ū": "U",
                        "Ṻ": "U",
                        "Ŭ": "U",
                        "Ü": "U",
                        "Ǜ": "U",
                        "Ǘ": "U",
                        "Ǖ": "U",
                        "Ǚ": "U",
                        "Ủ": "U",
                        "Ů": "U",
                        "Ű": "U",
                        "Ǔ": "U",
                        "Ȕ": "U",
                        "Ȗ": "U",
                        "Ư": "U",
                        "Ừ": "U",
                        "Ứ": "U",
                        "Ữ": "U",
                        "Ử": "U",
                        "Ự": "U",
                        "Ụ": "U",
                        "Ṳ": "U",
                        "Ų": "U",
                        "Ṷ": "U",
                        "Ṵ": "U",
                        "Ʉ": "U",
                        "Ⓥ": "V",
                        "Ｖ": "V",
                        "Ṽ": "V",
                        "Ṿ": "V",
                        "Ʋ": "V",
                        "Ꝟ": "V",
                        "Ʌ": "V",
                        "Ꝡ": "VY",
                        "Ⓦ": "W",
                        "Ｗ": "W",
                        "Ẁ": "W",
                        "Ẃ": "W",
                        "Ŵ": "W",
                        "Ẇ": "W",
                        "Ẅ": "W",
                        "Ẉ": "W",
                        "Ⱳ": "W",
                        "Ⓧ": "X",
                        "Ｘ": "X",
                        "Ẋ": "X",
                        "Ẍ": "X",
                        "Ⓨ": "Y",
                        "Ｙ": "Y",
                        "Ỳ": "Y",
                        "Ý": "Y",
                        "Ŷ": "Y",
                        "Ỹ": "Y",
                        "Ȳ": "Y",
                        "Ẏ": "Y",
                        "Ÿ": "Y",
                        "Ỷ": "Y",
                        "Ỵ": "Y",
                        "Ƴ": "Y",
                        "Ɏ": "Y",
                        "Ỿ": "Y",
                        "Ⓩ": "Z",
                        "Ｚ": "Z",
                        "Ź": "Z",
                        "Ẑ": "Z",
                        "Ż": "Z",
                        "Ž": "Z",
                        "Ẓ": "Z",
                        "Ẕ": "Z",
                        "Ƶ": "Z",
                        "Ȥ": "Z",
                        "Ɀ": "Z",
                        "Ⱬ": "Z",
                        "Ꝣ": "Z",
                        "ⓐ": "a",
                        "ａ": "a",
                        "ẚ": "a",
                        "à": "a",
                        "á": "a",
                        "â": "a",
                        "ầ": "a",
                        "ấ": "a",
                        "ẫ": "a",
                        "ẩ": "a",
                        "ã": "a",
                        "ā": "a",
                        "ă": "a",
                        "ằ": "a",
                        "ắ": "a",
                        "ẵ": "a",
                        "ẳ": "a",
                        "ȧ": "a",
                        "ǡ": "a",
                        "ä": "a",
                        "ǟ": "a",
                        "ả": "a",
                        "å": "a",
                        "ǻ": "a",
                        "ǎ": "a",
                        "ȁ": "a",
                        "ȃ": "a",
                        "ạ": "a",
                        "ậ": "a",
                        "ặ": "a",
                        "ḁ": "a",
                        "ą": "a",
                        "ⱥ": "a",
                        "ɐ": "a",
                        "ꜳ": "aa",
                        "æ": "ae",
                        "ǽ": "ae",
                        "ǣ": "ae",
                        "ꜵ": "ao",
                        "ꜷ": "au",
                        "ꜹ": "av",
                        "ꜻ": "av",
                        "ꜽ": "ay",
                        "ⓑ": "b",
                        "ｂ": "b",
                        "ḃ": "b",
                        "ḅ": "b",
                        "ḇ": "b",
                        "ƀ": "b",
                        "ƃ": "b",
                        "ɓ": "b",
                        "ⓒ": "c",
                        "ｃ": "c",
                        "ć": "c",
                        "ĉ": "c",
                        "ċ": "c",
                        "č": "c",
                        "ç": "c",
                        "ḉ": "c",
                        "ƈ": "c",
                        "ȼ": "c",
                        "ꜿ": "c",
                        "ↄ": "c",
                        "ⓓ": "d",
                        "ｄ": "d",
                        "ḋ": "d",
                        "ď": "d",
                        "ḍ": "d",
                        "ḑ": "d",
                        "ḓ": "d",
                        "ḏ": "d",
                        "đ": "d",
                        "ƌ": "d",
                        "ɖ": "d",
                        "ɗ": "d",
                        "ꝺ": "d",
                        "ǳ": "dz",
                        "ǆ": "dz",
                        "ⓔ": "e",
                        "ｅ": "e",
                        "è": "e",
                        "é": "e",
                        "ê": "e",
                        "ề": "e",
                        "ế": "e",
                        "ễ": "e",
                        "ể": "e",
                        "ẽ": "e",
                        "ē": "e",
                        "ḕ": "e",
                        "ḗ": "e",
                        "ĕ": "e",
                        "ė": "e",
                        "ë": "e",
                        "ẻ": "e",
                        "ě": "e",
                        "ȅ": "e",
                        "ȇ": "e",
                        "ẹ": "e",
                        "ệ": "e",
                        "ȩ": "e",
                        "ḝ": "e",
                        "ę": "e",
                        "ḙ": "e",
                        "ḛ": "e",
                        "ɇ": "e",
                        "ɛ": "e",
                        "ǝ": "e",
                        "ⓕ": "f",
                        "ｆ": "f",
                        "ḟ": "f",
                        "ƒ": "f",
                        "ꝼ": "f",
                        "ⓖ": "g",
                        "ｇ": "g",
                        "ǵ": "g",
                        "ĝ": "g",
                        "ḡ": "g",
                        "ğ": "g",
                        "ġ": "g",
                        "ǧ": "g",
                        "ģ": "g",
                        "ǥ": "g",
                        "ɠ": "g",
                        "ꞡ": "g",
                        "ᵹ": "g",
                        "ꝿ": "g",
                        "ⓗ": "h",
                        "ｈ": "h",
                        "ĥ": "h",
                        "ḣ": "h",
                        "ḧ": "h",
                        "ȟ": "h",
                        "ḥ": "h",
                        "ḩ": "h",
                        "ḫ": "h",
                        "ẖ": "h",
                        "ħ": "h",
                        "ⱨ": "h",
                        "ⱶ": "h",
                        "ɥ": "h",
                        "ƕ": "hv",
                        "ⓘ": "i",
                        "ｉ": "i",
                        "ì": "i",
                        "í": "i",
                        "î": "i",
                        "ĩ": "i",
                        "ī": "i",
                        "ĭ": "i",
                        "ï": "i",
                        "ḯ": "i",
                        "ỉ": "i",
                        "ǐ": "i",
                        "ȉ": "i",
                        "ȋ": "i",
                        "ị": "i",
                        "į": "i",
                        "ḭ": "i",
                        "ɨ": "i",
                        "ı": "i",
                        "ⓙ": "j",
                        "ｊ": "j",
                        "ĵ": "j",
                        "ǰ": "j",
                        "ɉ": "j",
                        "ⓚ": "k",
                        "ｋ": "k",
                        "ḱ": "k",
                        "ǩ": "k",
                        "ḳ": "k",
                        "ķ": "k",
                        "ḵ": "k",
                        "ƙ": "k",
                        "ⱪ": "k",
                        "ꝁ": "k",
                        "ꝃ": "k",
                        "ꝅ": "k",
                        "ꞣ": "k",
                        "ⓛ": "l",
                        "ｌ": "l",
                        "ŀ": "l",
                        "ĺ": "l",
                        "ľ": "l",
                        "ḷ": "l",
                        "ḹ": "l",
                        "ļ": "l",
                        "ḽ": "l",
                        "ḻ": "l",
                        "ſ": "l",
                        "ł": "l",
                        "ƚ": "l",
                        "ɫ": "l",
                        "ⱡ": "l",
                        "ꝉ": "l",
                        "ꞁ": "l",
                        "ꝇ": "l",
                        "ǉ": "lj",
                        "ⓜ": "m",
                        "ｍ": "m",
                        "ḿ": "m",
                        "ṁ": "m",
                        "ṃ": "m",
                        "ɱ": "m",
                        "ɯ": "m",
                        "ⓝ": "n",
                        "ｎ": "n",
                        "ǹ": "n",
                        "ń": "n",
                        "ñ": "n",
                        "ṅ": "n",
                        "ň": "n",
                        "ṇ": "n",
                        "ņ": "n",
                        "ṋ": "n",
                        "ṉ": "n",
                        "ƞ": "n",
                        "ɲ": "n",
                        "ŉ": "n",
                        "ꞑ": "n",
                        "ꞥ": "n",
                        "ǌ": "nj",
                        "ⓞ": "o",
                        "ｏ": "o",
                        "ò": "o",
                        "ó": "o",
                        "ô": "o",
                        "ồ": "o",
                        "ố": "o",
                        "ỗ": "o",
                        "ổ": "o",
                        "õ": "o",
                        "ṍ": "o",
                        "ȭ": "o",
                        "ṏ": "o",
                        "ō": "o",
                        "ṑ": "o",
                        "ṓ": "o",
                        "ŏ": "o",
                        "ȯ": "o",
                        "ȱ": "o",
                        "ö": "o",
                        "ȫ": "o",
                        "ỏ": "o",
                        "ő": "o",
                        "ǒ": "o",
                        "ȍ": "o",
                        "ȏ": "o",
                        "ơ": "o",
                        "ờ": "o",
                        "ớ": "o",
                        "ỡ": "o",
                        "ở": "o",
                        "ợ": "o",
                        "ọ": "o",
                        "ộ": "o",
                        "ǫ": "o",
                        "ǭ": "o",
                        "ø": "o",
                        "ǿ": "o",
                        "ɔ": "o",
                        "ꝋ": "o",
                        "ꝍ": "o",
                        "ɵ": "o",
                        "ƣ": "oi",
                        "ȣ": "ou",
                        "ꝏ": "oo",
                        "ⓟ": "p",
                        "ｐ": "p",
                        "ṕ": "p",
                        "ṗ": "p",
                        "ƥ": "p",
                        "ᵽ": "p",
                        "ꝑ": "p",
                        "ꝓ": "p",
                        "ꝕ": "p",
                        "ⓠ": "q",
                        "ｑ": "q",
                        "ɋ": "q",
                        "ꝗ": "q",
                        "ꝙ": "q",
                        "ⓡ": "r",
                        "ｒ": "r",
                        "ŕ": "r",
                        "ṙ": "r",
                        "ř": "r",
                        "ȑ": "r",
                        "ȓ": "r",
                        "ṛ": "r",
                        "ṝ": "r",
                        "ŗ": "r",
                        "ṟ": "r",
                        "ɍ": "r",
                        "ɽ": "r",
                        "ꝛ": "r",
                        "ꞧ": "r",
                        "ꞃ": "r",
                        "ⓢ": "s",
                        "ｓ": "s",
                        "ß": "s",
                        "ś": "s",
                        "ṥ": "s",
                        "ŝ": "s",
                        "ṡ": "s",
                        "š": "s",
                        "ṧ": "s",
                        "ṣ": "s",
                        "ṩ": "s",
                        "ș": "s",
                        "ş": "s",
                        "ȿ": "s",
                        "ꞩ": "s",
                        "ꞅ": "s",
                        "ẛ": "s",
                        "ⓣ": "t",
                        "ｔ": "t",
                        "ṫ": "t",
                        "ẗ": "t",
                        "ť": "t",
                        "ṭ": "t",
                        "ț": "t",
                        "ţ": "t",
                        "ṱ": "t",
                        "ṯ": "t",
                        "ŧ": "t",
                        "ƭ": "t",
                        "ʈ": "t",
                        "ⱦ": "t",
                        "ꞇ": "t",
                        "ꜩ": "tz",
                        "ⓤ": "u",
                        "ｕ": "u",
                        "ù": "u",
                        "ú": "u",
                        "û": "u",
                        "ũ": "u",
                        "ṹ": "u",
                        "ū": "u",
                        "ṻ": "u",
                        "ŭ": "u",
                        "ü": "u",
                        "ǜ": "u",
                        "ǘ": "u",
                        "ǖ": "u",
                        "ǚ": "u",
                        "ủ": "u",
                        "ů": "u",
                        "ű": "u",
                        "ǔ": "u",
                        "ȕ": "u",
                        "ȗ": "u",
                        "ư": "u",
                        "ừ": "u",
                        "ứ": "u",
                        "ữ": "u",
                        "ử": "u",
                        "ự": "u",
                        "ụ": "u",
                        "ṳ": "u",
                        "ų": "u",
                        "ṷ": "u",
                        "ṵ": "u",
                        "ʉ": "u",
                        "ⓥ": "v",
                        "ｖ": "v",
                        "ṽ": "v",
                        "ṿ": "v",
                        "ʋ": "v",
                        "ꝟ": "v",
                        "ʌ": "v",
                        "ꝡ": "vy",
                        "ⓦ": "w",
                        "ｗ": "w",
                        "ẁ": "w",
                        "ẃ": "w",
                        "ŵ": "w",
                        "ẇ": "w",
                        "ẅ": "w",
                        "ẘ": "w",
                        "ẉ": "w",
                        "ⱳ": "w",
                        "ⓧ": "x",
                        "ｘ": "x",
                        "ẋ": "x",
                        "ẍ": "x",
                        "ⓨ": "y",
                        "ｙ": "y",
                        "ỳ": "y",
                        "ý": "y",
                        "ŷ": "y",
                        "ỹ": "y",
                        "ȳ": "y",
                        "ẏ": "y",
                        "ÿ": "y",
                        "ỷ": "y",
                        "ẙ": "y",
                        "ỵ": "y",
                        "ƴ": "y",
                        "ɏ": "y",
                        "ỿ": "y",
                        "ⓩ": "z",
                        "ｚ": "z",
                        "ź": "z",
                        "ẑ": "z",
                        "ż": "z",
                        "ž": "z",
                        "ẓ": "z",
                        "ẕ": "z",
                        "ƶ": "z",
                        "ȥ": "z",
                        "ɀ": "z",
                        "ⱬ": "z",
                        "ꝣ": "z",
                        "Ά": "Α",
                        "Έ": "Ε",
                        "Ή": "Η",
                        "Ί": "Ι",
                        "Ϊ": "Ι",
                        "Ό": "Ο",
                        "Ύ": "Υ",
                        "Ϋ": "Υ",
                        "Ώ": "Ω",
                        "ά": "α",
                        "έ": "ε",
                        "ή": "η",
                        "ί": "ι",
                        "ϊ": "ι",
                        "ΐ": "ι",
                        "ό": "ο",
                        "ύ": "υ",
                        "ϋ": "υ",
                        "ΰ": "υ",
                        "ω": "ω",
                        "ς": "σ"
                    };
                    return e
                }), t.define("select2/data/base", ["../utils"], function(e) {
                    function t(e, n) {
                        t.__super__.constructor.call(this)
                    }
                    return e.Extend(t, e.Observable), t.prototype.current = function(e) {
                        throw new Error("The `current` method must be defined in child classes.")
                    }, t.prototype.query = function(e, t) {
                        throw new Error("The `query` method must be defined in child classes.")
                    }, t.prototype.bind = function(e, t) {}, t.prototype.destroy = function() {}, t.prototype.generateResultId = function(t, n) {
                        var i = t.id + "-result-";
                        return i += e.generateChars(4), i += null != n.id ? "-" + n.id.toString() : "-" + e.generateChars(4)
                    }, t
                }), t.define("select2/data/select", ["./base", "../utils", "jquery"], function(e, t, n) {
                    function i(e, t) {
                        this.$element = e, this.options = t, i.__super__.constructor.call(this)
                    }
                    return t.Extend(i, e), i.prototype.current = function(e) {
                        var t = [],
                            i = this;
                        this.$element.find(":selected").each(function() {
                            var e = n(this),
                                r = i.item(e);
                            t.push(r)
                        }), e(t)
                    }, i.prototype.select = function(e) {
                        var t = this;
                        if (e.selected = !0, n(e.element).is("option")) return e.element.selected = !0, void this.$element.trigger("change");
                        if (this.$element.prop("multiple")) this.current(function(i) {
                            var r = [];
                            e = [e], e.push.apply(e, i);
                            for (var o = 0; o < e.length; o++) {
                                var a = e[o].id; - 1 === n.inArray(a, r) && r.push(a)
                            }
                            t.$element.val(r), t.$element.trigger("change")
                        });
                        else {
                            var i = e.id;
                            this.$element.val(i), this.$element.trigger("change")
                        }
                    }, i.prototype.unselect = function(e) {
                        var t = this;
                        if (this.$element.prop("multiple")) return e.selected = !1, n(e.element).is("option") ? (e.element.selected = !1, void this.$element.trigger("change")) : void this.current(function(i) {
                            for (var r = [], o = 0; o < i.length; o++) {
                                var a = i[o].id;
                                a !== e.id && -1 === n.inArray(a, r) && r.push(a)
                            }
                            t.$element.val(r), t.$element.trigger("change")
                        })
                    }, i.prototype.bind = function(e, t) {
                        var n = this;
                        this.container = e, e.on("select", function(e) {
                            n.select(e.data)
                        }), e.on("unselect", function(e) {
                            n.unselect(e.data)
                        })
                    }, i.prototype.destroy = function() {
                        this.$element.find("*").each(function() {
                            n.removeData(this, "data")
                        })
                    }, i.prototype.query = function(e, t) {
                        var i = [],
                            r = this,
                            o = this.$element.children();
                        o.each(function() {
                            var t = n(this);
                            if (t.is("option") || t.is("optgroup")) {
                                var o = r.item(t),
                                    a = r.matches(e, o);
                                null !== a && i.push(a)
                            }
                        }), t({
                            results: i
                        })
                    }, i.prototype.addOptions = function(e) {
                        t.appendMany(this.$element, e)
                    }, i.prototype.option = function(e) {
                        var t;
                        e.children ? (t = document.createElement("optgroup"), t.label = e.text) : (t = document.createElement("option"), void 0 !== t.textContent ? t.textContent = e.text : t.innerText = e.text), e.id && (t.value = e.id), e.disabled && (t.disabled = !0), e.selected && (t.selected = !0), e.title && (t.title = e.title);
                        var i = n(t),
                            r = this._normalizeItem(e);
                        return r.element = t, n.data(t, "data", r), i
                    }, i.prototype.item = function(e) {
                        var t = {};
                        if (t = n.data(e[0], "data"), null != t) return t;
                        if (e.is("option")) t = {
                            id: e.val(),
                            text: e.text(),
                            disabled: e.prop("disabled"),
                            selected: e.prop("selected"),
                            title: e.prop("title")
                        };
                        else if (e.is("optgroup")) {
                            t = {
                                text: e.prop("label"),
                                children: [],
                                title: e.prop("title")
                            };
                            for (var i = e.children("option"), r = [], o = 0; o < i.length; o++) {
                                var a = n(i[o]),
                                    s = this.item(a);
                                r.push(s)
                            }
                            t.children = r
                        }
                        return t = this._normalizeItem(t), t.element = e[0], n.data(e[0], "data", t), t
                    }, i.prototype._normalizeItem = function(e) {
                        n.isPlainObject(e) || (e = {
                            id: e,
                            text: e
                        }), e = n.extend({}, {
                            text: ""
                        }, e);
                        var t = {
                            selected: !1,
                            disabled: !1
                        };
                        return null != e.id && (e.id = e.id.toString()), null != e.text && (e.text = e.text.toString()), null == e._resultId && e.id && null != this.container && (e._resultId = this.generateResultId(this.container, e)), n.extend({}, t, e)
                    }, i.prototype.matches = function(e, t) {
                        var n = this.options.get("matcher");
                        return n(e, t)
                    }, i
                }), t.define("select2/data/array", ["./select", "../utils", "jquery"], function(e, t, n) {
                    function i(e, t) {
                        var n = t.get("data") || [];
                        i.__super__.constructor.call(this, e, t), this.addOptions(this.convertToOptions(n))
                    }
                    return t.Extend(i, e), i.prototype.select = function(e) {
                        var t = this.$element.find("option").filter(function(t, n) {
                            return n.value == e.id.toString()
                        });
                        0 === t.length && (t = this.option(e), this.addOptions(t)), i.__super__.select.call(this, e)
                    }, i.prototype.convertToOptions = function(e) {
                        function i(e) {
                            return function() {
                                return n(this).val() == e.id
                            }
                        }
                        for (var r = this, o = this.$element.find("option"), a = o.map(function() {
                                return r.item(n(this)).id
                            }).get(), s = [], l = 0; l < e.length; l++) {
                            var c = this._normalizeItem(e[l]);
                            if (n.inArray(c.id, a) >= 0) {
                                var d = o.filter(i(c)),
                                    u = this.item(d),
                                    p = n.extend(!0, {}, c, u),
                                    f = this.option(p);
                                d.replaceWith(f)
                            } else {
                                var h = this.option(c);
                                if (c.children) {
                                    var m = this.convertToOptions(c.children);
                                    t.appendMany(h, m)
                                }
                                s.push(h)
                            }
                        }
                        return s
                    }, i
                }), t.define("select2/data/ajax", ["./array", "../utils", "jquery"], function(e, t, n) {
                    function i(e, t) {
                        this.ajaxOptions = this._applyDefaults(t.get("ajax")), null != this.ajaxOptions.processResults && (this.processResults = this.ajaxOptions.processResults), i.__super__.constructor.call(this, e, t)
                    }
                    return t.Extend(i, e), i.prototype._applyDefaults = function(e) {
                        var t = {
                            data: function(e) {
                                return n.extend({}, e, {
                                    q: e.term
                                })
                            },
                            transport: function(e, t, i) {
                                var r = n.ajax(e);
                                return r.then(t), r.fail(i), r
                            }
                        };
                        return n.extend({}, t, e, !0)
                    }, i.prototype.processResults = function(e) {
                        return e
                    }, i.prototype.query = function(e, t) {
                        function i() {
                            var i = o.transport(o, function(i) {
                                var o = r.processResults(i, e);
                                r.options.get("debug") && window.console && console.error && (o && o.results && n.isArray(o.results) || void 0), t(o)
                            }, function() {
                                i.status && "0" === i.status || r.trigger("results:message", {
                                    message: "errorLoading"
                                })
                            });
                            r._request = i
                        }
                        var r = this;
                        null != this._request && (n.isFunction(this._request.abort) && this._request.abort(), this._request = null);
                        var o = n.extend({
                            type: "GET"
                        }, this.ajaxOptions);
                        "function" == typeof o.url && (o.url = o.url.call(this.$element, e)), "function" == typeof o.data && (o.data = o.data.call(this.$element, e)), this.ajaxOptions.delay && null != e.term ? (this._queryTimeout && window.clearTimeout(this._queryTimeout), this._queryTimeout = window.setTimeout(i, this.ajaxOptions.delay)) : i()
                    }, i
                }), t.define("select2/data/tags", ["jquery"], function(e) {
                    function t(t, n, i) {
                        var r = i.get("tags"),
                            o = i.get("createTag");
                        void 0 !== o && (this.createTag = o);
                        var a = i.get("insertTag");
                        if (void 0 !== a && (this.insertTag = a), t.call(this, n, i), e.isArray(r))
                            for (var s = 0; s < r.length; s++) {
                                var l = r[s],
                                    c = this._normalizeItem(l),
                                    d = this.option(c);
                                this.$element.append(d)
                            }
                    }
                    return t.prototype.query = function(e, t, n) {
                        function i(e, o) {
                            for (var a = e.results, s = 0; s < a.length; s++) {
                                var l = a[s],
                                    c = null != l.children && !i({
                                        results: l.children
                                    }, !0),
                                    d = l.text === t.term;
                                if (d || c) return !o && (e.data = a, void n(e))
                            }
                            if (o) return !0;
                            var u = r.createTag(t);
                            if (null != u) {
                                var p = r.option(u);
                                p.attr("data-select2-tag", !0), r.addOptions([p]), r.insertTag(a, u)
                            }
                            e.results = a, n(e)
                        }
                        var r = this;
                        return this._removeOldTags(), null == t.term || null != t.page ? void e.call(this, t, n) : void e.call(this, t, i)
                    }, t.prototype.createTag = function(t, n) {
                        var i = e.trim(n.term);
                        return "" === i ? null : {
                            id: i,
                            text: i
                        }
                    }, t.prototype.insertTag = function(e, t, n) {
                        t.unshift(n)
                    }, t.prototype._removeOldTags = function(t) {
                        var n = (this._lastTag, this.$element.find("option[data-select2-tag]"));
                        n.each(function() {
                            this.selected || e(this).remove()
                        })
                    }, t
                }), t.define("select2/data/tokenizer", ["jquery"], function(e) {
                    function t(e, t, n) {
                        var i = n.get("tokenizer");
                        void 0 !== i && (this.tokenizer = i), e.call(this, t, n)
                    }
                    return t.prototype.bind = function(e, t, n) {
                        e.call(this, t, n), this.$search = t.dropdown.$search || t.selection.$search || n.find(".select2-search__field")
                    }, t.prototype.query = function(t, n, i) {
                        function r(t) {
                            var n = a._normalizeItem(t),
                                i = a.$element.find("option").filter(function() {
                                    return e(this).val() === n.id
                                });
                            if (!i.length) {
                                var r = a.option(n);
                                r.attr("data-select2-tag", !0), a._removeOldTags(), a.addOptions([r])
                            }
                            o(n)
                        }

                        function o(e) {
                            a.trigger("select", {
                                data: e
                            })
                        }
                        var a = this;
                        n.term = n.term || "";
                        var s = this.tokenizer(n, this.options, r);
                        s.term !== n.term && (this.$search.length && (this.$search.val(s.term), this.$search.focus()), n.term = s.term), t.call(this, n, i)
                    }, t.prototype.tokenizer = function(t, n, i, r) {
                        for (var o = i.get("tokenSeparators") || [], a = n.term, s = 0, l = this.createTag || function(e) {
                                return {
                                    id: e.term,
                                    text: e.term
                                }
                            }; s < a.length;) {
                            var c = a[s];
                            if (-1 !== e.inArray(c, o)) {
                                var d = a.substr(0, s),
                                    u = e.extend({}, n, {
                                        term: d
                                    }),
                                    p = l(u);
                                null != p ? (r(p), a = a.substr(s + 1) || "", s = 0) : s++
                            } else s++
                        }
                        return {
                            term: a
                        }
                    }, t
                }), t.define("select2/data/minimumInputLength", [], function() {
                    function e(e, t, n) {
                        this.minimumInputLength = n.get("minimumInputLength"), e.call(this, t, n)
                    }
                    return e.prototype.query = function(e, t, n) {
                        return t.term = t.term || "", t.term.length < this.minimumInputLength ? void this.trigger("results:message", {
                            message: "inputTooShort",
                            args: {
                                minimum: this.minimumInputLength,
                                input: t.term,
                                params: t
                            }
                        }) : void e.call(this, t, n)
                    }, e
                }), t.define("select2/data/maximumInputLength", [], function() {
                    function e(e, t, n) {
                        this.maximumInputLength = n.get("maximumInputLength"), e.call(this, t, n)
                    }
                    return e.prototype.query = function(e, t, n) {
                        return t.term = t.term || "", this.maximumInputLength > 0 && t.term.length > this.maximumInputLength ? void this.trigger("results:message", {
                            message: "inputTooLong",
                            args: {
                                maximum: this.maximumInputLength,
                                input: t.term,
                                params: t
                            }
                        }) : void e.call(this, t, n)
                    }, e
                }), t.define("select2/data/maximumSelectionLength", [], function() {
                    function e(e, t, n) {
                        this.maximumSelectionLength = n.get("maximumSelectionLength"), e.call(this, t, n)
                    }
                    return e.prototype.query = function(e, t, n) {
                        var i = this;
                        this.current(function(r) {
                            var o = null != r ? r.length : 0;
                            return i.maximumSelectionLength > 0 && o >= i.maximumSelectionLength ? void i.trigger("results:message", {
                                message: "maximumSelected",
                                args: {
                                    maximum: i.maximumSelectionLength
                                }
                            }) : void e.call(i, t, n)
                        })
                    }, e
                }), t.define("select2/dropdown", ["jquery", "./utils"], function(e, t) {
                    function n(e, t) {
                        this.$element = e, this.options = t, n.__super__.constructor.call(this)
                    }
                    return t.Extend(n, t.Observable), n.prototype.render = function() {
                        var t = e('<span class="select2-dropdown"><span class="select2-results"></span></span>');
                        return t.attr("dir", this.options.get("dir")), this.$dropdown = t, t
                    }, n.prototype.bind = function() {}, n.prototype.position = function(e, t) {}, n.prototype.destroy = function() {
                        this.$dropdown.remove()
                    }, n
                }), t.define("select2/dropdown/search", ["jquery", "../utils"], function(e, t) {
                    function n() {}
                    return n.prototype.render = function(t) {
                        var n = t.call(this),
                            i = e('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></span>');
                        return this.$searchContainer = i, this.$search = i.find("input"), n.prepend(i), n
                    }, n.prototype.bind = function(t, n, i) {
                        var r = this;
                        t.call(this, n, i), this.$search.on("keydown", function(e) {
                            r.trigger("keypress", e), r._keyUpPrevented = e.isDefaultPrevented()
                        }), this.$search.on("input", function(t) {
                            e(this).off("keyup")
                        }), this.$search.on("keyup input", function(e) {
                            r.handleSearch(e)
                        }), n.on("open", function() {
                            r.$search.attr("tabindex", 0), r.$search.focus(), window.setTimeout(function() {
                                r.$search.focus()
                            }, 0)
                        }), n.on("close", function() {
                            r.$search.attr("tabindex", -1), r.$search.val("")
                        }), n.on("focus", function() {
                            n.isOpen() && r.$search.focus()
                        }), n.on("results:all", function(e) {
                            if (null == e.query.term || "" === e.query.term) {
                                var t = r.showSearch(e);
                                t ? r.$searchContainer.removeClass("select2-search--hide") : r.$searchContainer.addClass("select2-search--hide")
                            }
                        })
                    }, n.prototype.handleSearch = function(e) {
                        if (!this._keyUpPrevented) {
                            var t = this.$search.val();
                            this.trigger("query", {
                                term: t
                            })
                        }
                        this._keyUpPrevented = !1
                    }, n.prototype.showSearch = function(e, t) {
                        return !0
                    }, n
                }), t.define("select2/dropdown/hidePlaceholder", [], function() {
                    function e(e, t, n, i) {
                        this.placeholder = this.normalizePlaceholder(n.get("placeholder")), e.call(this, t, n, i)
                    }
                    return e.prototype.append = function(e, t) {
                        t.results = this.removePlaceholder(t.results), e.call(this, t)
                    }, e.prototype.normalizePlaceholder = function(e, t) {
                        return "string" == typeof t && (t = {
                            id: "",
                            text: t
                        }), t
                    }, e.prototype.removePlaceholder = function(e, t) {
                        for (var n = t.slice(0), i = t.length - 1; i >= 0; i--) {
                            var r = t[i];
                            this.placeholder.id === r.id && n.splice(i, 1)
                        }
                        return n
                    }, e
                }), t.define("select2/dropdown/infiniteScroll", ["jquery"], function(e) {
                    function t(e, t, n, i) {
                        this.lastParams = {}, e.call(this, t, n, i), this.$loadingMore = this.createLoadingMore(), this.loading = !1
                    }
                    return t.prototype.append = function(e, t) {
                        this.$loadingMore.remove(), this.loading = !1, e.call(this, t), this.showLoadingMore(t) && this.$results.append(this.$loadingMore)
                    }, t.prototype.bind = function(t, n, i) {
                        var r = this;
                        t.call(this, n, i), n.on("query", function(e) {
                            r.lastParams = e, r.loading = !0
                        }), n.on("query:append", function(e) {
                            r.lastParams = e, r.loading = !0
                        }), this.$results.on("scroll", function() {
                            var t = e.contains(document.documentElement, r.$loadingMore[0]);
                            if (!r.loading && t) {
                                var n = r.$results.offset().top + r.$results.outerHeight(!1),
                                    i = r.$loadingMore.offset().top + r.$loadingMore.outerHeight(!1);
                                n + 50 >= i && r.loadMore()
                            }
                        })
                    }, t.prototype.loadMore = function() {
                        this.loading = !0;
                        var t = e.extend({}, {
                            page: 1
                        }, this.lastParams);
                        t.page++, this.trigger("query:append", t)
                    }, t.prototype.showLoadingMore = function(e, t) {
                        return t.pagination && t.pagination.more
                    }, t.prototype.createLoadingMore = function() {
                        var t = e('<li class="select2-results__option select2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'),
                            n = this.options.get("translations").get("loadingMore");
                        return t.html(n(this.lastParams)), t
                    }, t
                }), t.define("select2/dropdown/attachBody", ["jquery", "../utils"], function(e, t) {
                    function n(t, n, i) {
                        this.$dropdownParent = i.get("dropdownParent") || e(document.body), t.call(this, n, i)
                    }
                    return n.prototype.bind = function(e, t, n) {
                        var i = this,
                            r = !1;
                        e.call(this, t, n), t.on("open", function() {
                            i._showDropdown(), i._attachPositioningHandler(t), r || (r = !0, t.on("results:all", function() {
                                i._positionDropdown(), i._resizeDropdown()
                            }), t.on("results:append", function() {
                                i._positionDropdown(), i._resizeDropdown()
                            }))
                        }), t.on("close", function() {
                            i._hideDropdown(), i._detachPositioningHandler(t)
                        }), this.$dropdownContainer.on("mousedown", function(e) {
                            e.stopPropagation()
                        })
                    }, n.prototype.destroy = function(e) {
                        e.call(this), this.$dropdownContainer.remove()
                    }, n.prototype.position = function(e, t, n) {
                        t.attr("class", n.attr("class")), t.removeClass("select2"), t.addClass("select2-container--open"),
                            t.css({
                                position: "absolute",
                                top: -999999
                            }), this.$container = n
                    }, n.prototype.render = function(t) {
                        var n = e("<span></span>"),
                            i = t.call(this);
                        return n.append(i), this.$dropdownContainer = n, n
                    }, n.prototype._hideDropdown = function(e) {
                        this.$dropdownContainer.detach()
                    }, n.prototype._attachPositioningHandler = function(n, i) {
                        var r = this,
                            o = "scroll.select2." + i.id,
                            a = "resize.select2." + i.id,
                            s = "orientationchange.select2." + i.id,
                            l = this.$container.parents().filter(t.hasScroll);
                        l.each(function() {
                            e(this).data("select2-scroll-position", {
                                x: e(this).scrollLeft(),
                                y: e(this).scrollTop()
                            })
                        }), l.on(o, function(t) {
                            var n = e(this).data("select2-scroll-position");
                            e(this).scrollTop(n.y)
                        }), e(window).on(o + " " + a + " " + s, function(e) {
                            r._positionDropdown(), r._resizeDropdown()
                        })
                    }, n.prototype._detachPositioningHandler = function(n, i) {
                        var r = "scroll.select2." + i.id,
                            o = "resize.select2." + i.id,
                            a = "orientationchange.select2." + i.id,
                            s = this.$container.parents().filter(t.hasScroll);
                        s.off(r), e(window).off(r + " " + o + " " + a)
                    }, n.prototype._positionDropdown = function() {
                        var t = e(window),
                            n = this.$dropdown.hasClass("select2-dropdown--above"),
                            i = this.$dropdown.hasClass("select2-dropdown--below"),
                            r = null,
                            o = this.$container.offset();
                        o.bottom = o.top + this.$container.outerHeight(!1);
                        var a = {
                            height: this.$container.outerHeight(!1)
                        };
                        a.top = o.top, a.bottom = o.top + a.height;
                        var s = {
                                height: this.$dropdown.outerHeight(!1)
                            },
                            l = {
                                top: t.scrollTop(),
                                bottom: t.scrollTop() + t.height()
                            },
                            c = l.top < o.top - s.height,
                            d = l.bottom > o.bottom + s.height,
                            u = {
                                left: o.left,
                                top: a.bottom
                            },
                            p = this.$dropdownParent;
                        "static" === p.css("position") && (p = p.offsetParent());
                        var f = p.offset();
                        u.top -= f.top, u.left -= f.left, n || i || (r = "below"), d || !c || n ? !c && d && n && (r = "below") : r = "above", ("above" == r || n && "below" !== r) && (u.top = a.top - f.top - s.height), null != r && (this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--" + r), this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--" + r)), this.$dropdownContainer.css(u)
                    }, n.prototype._resizeDropdown = function() {
                        var e = {
                            width: this.$container.outerWidth(!1) + "px"
                        };
                        this.options.get("dropdownAutoWidth") && (e.minWidth = e.width, e.position = "relative", e.width = "auto"), this.$dropdown.css(e)
                    }, n.prototype._showDropdown = function(e) {
                        this.$dropdownContainer.appendTo(this.$dropdownParent), this._positionDropdown(), this._resizeDropdown()
                    }, n
                }), t.define("select2/dropdown/minimumResultsForSearch", [], function() {
                    function e(t) {
                        for (var n = 0, i = 0; i < t.length; i++) {
                            var r = t[i];
                            r.children ? n += e(r.children) : n++
                        }
                        return n
                    }

                    function t(e, t, n, i) {
                        this.minimumResultsForSearch = n.get("minimumResultsForSearch"), this.minimumResultsForSearch < 0 && (this.minimumResultsForSearch = 1 / 0), e.call(this, t, n, i)
                    }
                    return t.prototype.showSearch = function(t, n) {
                        return !(e(n.data.results) < this.minimumResultsForSearch) && t.call(this, n)
                    }, t
                }), t.define("select2/dropdown/selectOnClose", [], function() {
                    function e() {}
                    return e.prototype.bind = function(e, t, n) {
                        var i = this;
                        e.call(this, t, n), t.on("close", function(e) {
                            i._handleSelectOnClose(e)
                        })
                    }, e.prototype._handleSelectOnClose = function(e, t) {
                        if (t && null != t.originalSelect2Event) {
                            var n = t.originalSelect2Event;
                            if ("select" === n._type || "unselect" === n._type) return
                        }
                        var i = this.getHighlightedResults();
                        if (!(i.length < 1)) {
                            var r = i.data("data");
                            null != r.element && r.element.selected || null == r.element && r.selected || this.trigger("select", {
                                data: r
                            })
                        }
                    }, e
                }), t.define("select2/dropdown/closeOnSelect", [], function() {
                    function e() {}
                    return e.prototype.bind = function(e, t, n) {
                        var i = this;
                        e.call(this, t, n), t.on("select", function(e) {
                            i._selectTriggered(e)
                        }), t.on("unselect", function(e) {
                            i._selectTriggered(e)
                        })
                    }, e.prototype._selectTriggered = function(e, t) {
                        var n = t.originalEvent;
                        n && n.ctrlKey || this.trigger("close", {
                            originalEvent: n,
                            originalSelect2Event: t
                        })
                    }, e
                }), t.define("select2/i18n/en", [], function() {
                    return {
                        errorLoading: function() {
                            return "The results could not be loaded."
                        },
                        inputTooLong: function(e) {
                            var t = e.input.length - e.maximum,
                                n = "Please delete " + t + " character";
                            return 1 != t && (n += "s"), n
                        },
                        inputTooShort: function(e) {
                            var t = e.minimum - e.input.length,
                                n = "Please enter " + t + " or more characters";
                            return n
                        },
                        loadingMore: function() {
                            return "Loading more results…"
                        },
                        maximumSelected: function(e) {
                            var t = "You can only select " + e.maximum + " item";
                            return 1 != e.maximum && (t += "s"), t
                        },
                        noResults: function() {
                            return "No results found"
                        },
                        searching: function() {
                            return "Searching…"
                        }
                    }
                }), t.define("select2/defaults", ["jquery", "require", "./results", "./selection/single", "./selection/multiple", "./selection/placeholder", "./selection/allowClear", "./selection/search", "./selection/eventRelay", "./utils", "./translation", "./diacritics", "./data/select", "./data/array", "./data/ajax", "./data/tags", "./data/tokenizer", "./data/minimumInputLength", "./data/maximumInputLength", "./data/maximumSelectionLength", "./dropdown", "./dropdown/search", "./dropdown/hidePlaceholder", "./dropdown/infiniteScroll", "./dropdown/attachBody", "./dropdown/minimumResultsForSearch", "./dropdown/selectOnClose", "./dropdown/closeOnSelect", "./i18n/en"], function(e, t, n, i, r, o, a, s, l, c, d, u, p, f, h, m, g, v, y, b, $, w, C, x, T, _, k, S, I) {
                    function E() {
                        this.reset()
                    }
                    E.prototype.apply = function(u) {
                        if (u = e.extend(!0, {}, this.defaults, u), null == u.dataAdapter) {
                            if (null != u.ajax ? u.dataAdapter = h : null != u.data ? u.dataAdapter = f : u.dataAdapter = p, u.minimumInputLength > 0 && (u.dataAdapter = c.Decorate(u.dataAdapter, v)), u.maximumInputLength > 0 && (u.dataAdapter = c.Decorate(u.dataAdapter, y)), u.maximumSelectionLength > 0 && (u.dataAdapter = c.Decorate(u.dataAdapter, b)), u.tags && (u.dataAdapter = c.Decorate(u.dataAdapter, m)), (null != u.tokenSeparators || null != u.tokenizer) && (u.dataAdapter = c.Decorate(u.dataAdapter, g)), null != u.query) {
                                var I = t(u.amdBase + "compat/query");
                                u.dataAdapter = c.Decorate(u.dataAdapter, I)
                            }
                            if (null != u.initSelection) {
                                var E = t(u.amdBase + "compat/initSelection");
                                u.dataAdapter = c.Decorate(u.dataAdapter, E)
                            }
                        }
                        if (null == u.resultsAdapter && (u.resultsAdapter = n, null != u.ajax && (u.resultsAdapter = c.Decorate(u.resultsAdapter, x)), null != u.placeholder && (u.resultsAdapter = c.Decorate(u.resultsAdapter, C)), u.selectOnClose && (u.resultsAdapter = c.Decorate(u.resultsAdapter, k))), null == u.dropdownAdapter) {
                            if (u.multiple) u.dropdownAdapter = $;
                            else {
                                var D = c.Decorate($, w);
                                u.dropdownAdapter = D
                            }
                            if (0 !== u.minimumResultsForSearch && (u.dropdownAdapter = c.Decorate(u.dropdownAdapter, _)), u.closeOnSelect && (u.dropdownAdapter = c.Decorate(u.dropdownAdapter, S)), null != u.dropdownCssClass || null != u.dropdownCss || null != u.adaptDropdownCssClass) {
                                var A = t(u.amdBase + "compat/dropdownCss");
                                u.dropdownAdapter = c.Decorate(u.dropdownAdapter, A)
                            }
                            u.dropdownAdapter = c.Decorate(u.dropdownAdapter, T)
                        }
                        if (null == u.selectionAdapter) {
                            if (u.multiple ? u.selectionAdapter = r : u.selectionAdapter = i, null != u.placeholder && (u.selectionAdapter = c.Decorate(u.selectionAdapter, o)), u.allowClear && (u.selectionAdapter = c.Decorate(u.selectionAdapter, a)), u.multiple && (u.selectionAdapter = c.Decorate(u.selectionAdapter, s)), null != u.containerCssClass || null != u.containerCss || null != u.adaptContainerCssClass) {
                                var F = t(u.amdBase + "compat/containerCss");
                                u.selectionAdapter = c.Decorate(u.selectionAdapter, F)
                            }
                            u.selectionAdapter = c.Decorate(u.selectionAdapter, l)
                        }
                        if ("string" == typeof u.language)
                            if (u.language.indexOf("-") > 0) {
                                var O = u.language.split("-"),
                                    L = O[0];
                                u.language = [u.language, L]
                            } else u.language = [u.language];
                        if (e.isArray(u.language)) {
                            var N = new d;
                            u.language.push("en");
                            for (var R = u.language, M = 0; M < R.length; M++) {
                                var P = R[M],
                                    U = {};
                                try {
                                    U = d.loadPath(P)
                                } catch (q) {
                                    try {
                                        P = this.defaults.amdLanguageBase + P, U = d.loadPath(P)
                                    } catch (j) {
                                        u.debug && window.console && console.warn && void 0;
                                        continue
                                    }
                                }
                                N.extend(U)
                            }
                            u.translations = N
                        } else {
                            var B = d.loadPath(this.defaults.amdLanguageBase + "en"),
                                W = new d(u.language);
                            W.extend(B), u.translations = W
                        }
                        return u
                    }, E.prototype.reset = function() {
                        function t(e) {
                            function t(e) {
                                return u[e] || e
                            }
                            return e.replace(/[^\u0000-\u007E]/g, t)
                        }

                        function n(i, r) {
                            if ("" === e.trim(i.term)) return r;
                            if (r.children && r.children.length > 0) {
                                for (var o = e.extend(!0, {}, r), a = r.children.length - 1; a >= 0; a--) {
                                    var s = r.children[a],
                                        l = n(i, s);
                                    null == l && o.children.splice(a, 1)
                                }
                                return o.children.length > 0 ? o : n(i, o)
                            }
                            var c = t(r.text).toUpperCase(),
                                d = t(i.term).toUpperCase();
                            return c.indexOf(d) > -1 ? r : null
                        }
                        this.defaults = {
                            amdBase: "./",
                            amdLanguageBase: "./i18n/",
                            closeOnSelect: !0,
                            debug: !1,
                            dropdownAutoWidth: !1,
                            escapeMarkup: c.escapeMarkup,
                            language: I,
                            matcher: n,
                            minimumInputLength: 0,
                            maximumInputLength: 0,
                            maximumSelectionLength: 0,
                            minimumResultsForSearch: 0,
                            selectOnClose: !1,
                            sorter: function(e) {
                                return e
                            },
                            templateResult: function(e) {
                                return e.text
                            },
                            templateSelection: function(e) {
                                return e.text
                            },
                            theme: "default",
                            width: "resolve"
                        }
                    }, E.prototype.set = function(t, n) {
                        var i = e.camelCase(t),
                            r = {};
                        r[i] = n;
                        var o = c._convertData(r);
                        e.extend(this.defaults, o)
                    };
                    var D = new E;
                    return D
                }), t.define("select2/options", ["require", "jquery", "./defaults", "./utils"], function(e, t, n, i) {
                    function r(t, r) {
                        if (this.options = t, null != r && this.fromElement(r), this.options = n.apply(this.options), r && r.is("input")) {
                            var o = e(this.get("amdBase") + "compat/inputData");
                            this.options.dataAdapter = i.Decorate(this.options.dataAdapter, o)
                        }
                    }
                    return r.prototype.fromElement = function(e) {
                        var n = ["select2"];
                        null == this.options.multiple && (this.options.multiple = e.prop("multiple")), null == this.options.disabled && (this.options.disabled = e.prop("disabled")), null == this.options.language && (e.prop("lang") ? this.options.language = e.prop("lang").toLowerCase() : e.closest("[lang]").prop("lang") && (this.options.language = e.closest("[lang]").prop("lang"))), null == this.options.dir && (e.prop("dir") ? this.options.dir = e.prop("dir") : e.closest("[dir]").prop("dir") ? this.options.dir = e.closest("[dir]").prop("dir") : this.options.dir = "ltr"), e.prop("disabled", this.options.disabled), e.prop("multiple", this.options.multiple), e.data("select2Tags") && (this.options.debug && window.console && console.warn && void 0, e.data("data", e.data("select2Tags")), e.data("tags", !0)), e.data("ajaxUrl") && (this.options.debug && window.console && console.warn && void 0, e.attr("ajax--url", e.data("ajaxUrl")), e.data("ajax--url", e.data("ajaxUrl")));
                        var r = {};
                        r = t.fn.jquery && "1." == t.fn.jquery.substr(0, 2) && e[0].dataset ? t.extend(!0, {}, e[0].dataset, e.data()) : e.data();
                        var o = t.extend(!0, {}, r);
                        o = i._convertData(o);
                        for (var a in o) t.inArray(a, n) > -1 || (t.isPlainObject(this.options[a]) ? t.extend(this.options[a], o[a]) : this.options[a] = o[a]);
                        return this
                    }, r.prototype.get = function(e) {
                        return this.options[e]
                    }, r.prototype.set = function(e, t) {
                        this.options[e] = t
                    }, r
                }), t.define("select2/core", ["jquery", "./options", "./utils", "./keys"], function(e, t, n, i) {
                    var r = function(e, n) {
                        null != e.data("select2") && e.data("select2").destroy(), this.$element = e, this.id = this._generateId(e), n = n || {}, this.options = new t(n, e), r.__super__.constructor.call(this);
                        var i = e.attr("tabindex") || 0;
                        e.data("old-tabindex", i), e.attr("tabindex", "-1");
                        var o = this.options.get("dataAdapter");
                        this.dataAdapter = new o(e, this.options);
                        var a = this.render();
                        this._placeContainer(a);
                        var s = this.options.get("selectionAdapter");
                        this.selection = new s(e, this.options), this.$selection = this.selection.render(), this.selection.position(this.$selection, a);
                        var l = this.options.get("dropdownAdapter");
                        this.dropdown = new l(e, this.options), this.$dropdown = this.dropdown.render(), this.dropdown.position(this.$dropdown, a);
                        var c = this.options.get("resultsAdapter");
                        this.results = new c(e, this.options, this.dataAdapter), this.$results = this.results.render(), this.results.position(this.$results, this.$dropdown);
                        var d = this;
                        this._bindAdapters(), this._registerDomEvents(), this._registerDataEvents(), this._registerSelectionEvents(), this._registerDropdownEvents(), this._registerResultsEvents(), this._registerEvents(), this.dataAdapter.current(function(e) {
                            d.trigger("selection:update", {
                                data: e
                            })
                        }), e.addClass("select2-hidden-accessible"), e.attr("aria-hidden", "true"), this._syncAttributes(), e.data("select2", this)
                    };
                    return n.Extend(r, n.Observable), r.prototype._generateId = function(e) {
                        var t = "";
                        return t = null != e.attr("id") ? e.attr("id") : null != e.attr("name") ? e.attr("name") + "-" + n.generateChars(2) : n.generateChars(4), t = t.replace(/(:|\.|\[|\]|,)/g, ""), t = "select2-" + t
                    }, r.prototype._placeContainer = function(e) {
                        e.insertAfter(this.$element);
                        var t = this._resolveWidth(this.$element, this.options.get("width"));
                        null != t && e.css("width", t)
                    }, r.prototype._resolveWidth = function(e, t) {
                        var n = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;
                        if ("resolve" == t) {
                            var i = this._resolveWidth(e, "style");
                            return null != i ? i : this._resolveWidth(e, "element")
                        }
                        if ("element" == t) {
                            var r = e.outerWidth(!1);
                            return 0 >= r ? "auto" : r + "px"
                        }
                        if ("style" == t) {
                            var o = e.attr("style");
                            if ("string" != typeof o) return null;
                            for (var a = o.split(";"), s = 0, l = a.length; l > s; s += 1) {
                                var c = a[s].replace(/\s/g, ""),
                                    d = c.match(n);
                                if (null !== d && d.length >= 1) return d[1]
                            }
                            return null
                        }
                        return t
                    }, r.prototype._bindAdapters = function() {
                        this.dataAdapter.bind(this, this.$container), this.selection.bind(this, this.$container), this.dropdown.bind(this, this.$container), this.results.bind(this, this.$container)
                    }, r.prototype._registerDomEvents = function() {
                        var t = this;
                        this.$element.on("change.select2", function() {
                            t.dataAdapter.current(function(e) {
                                t.trigger("selection:update", {
                                    data: e
                                })
                            })
                        }), this.$element.on("focus.select2", function(e) {
                            t.trigger("focus", e)
                        }), this._syncA = n.bind(this._syncAttributes, this), this._syncS = n.bind(this._syncSubtree, this), this.$element[0].attachEvent && this.$element[0].attachEvent("onpropertychange", this._syncA);
                        var i = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                        null != i ? (this._observer = new i(function(n) {
                            e.each(n, t._syncA), e.each(n, t._syncS)
                        }), this._observer.observe(this.$element[0], {
                            attributes: !0,
                            childList: !0,
                            subtree: !1
                        })) : this.$element[0].addEventListener && (this.$element[0].addEventListener("DOMAttrModified", t._syncA, !1), this.$element[0].addEventListener("DOMNodeInserted", t._syncS, !1), this.$element[0].addEventListener("DOMNodeRemoved", t._syncS, !1))
                    }, r.prototype._registerDataEvents = function() {
                        var e = this;
                        this.dataAdapter.on("*", function(t, n) {
                            e.trigger(t, n)
                        })
                    }, r.prototype._registerSelectionEvents = function() {
                        var t = this,
                            n = ["toggle", "focus"];
                        this.selection.on("toggle", function() {
                            t.toggleDropdown()
                        }), this.selection.on("focus", function(e) {
                            t.focus(e)
                        }), this.selection.on("*", function(i, r) {
                            -1 === e.inArray(i, n) && t.trigger(i, r)
                        })
                    }, r.prototype._registerDropdownEvents = function() {
                        var e = this;
                        this.dropdown.on("*", function(t, n) {
                            e.trigger(t, n)
                        })
                    }, r.prototype._registerResultsEvents = function() {
                        var e = this;
                        this.results.on("*", function(t, n) {
                            e.trigger(t, n)
                        })
                    }, r.prototype._registerEvents = function() {
                        var e = this;
                        this.on("open", function() {
                            e.$container.addClass("select2-container--open")
                        }), this.on("close", function() {
                            e.$container.removeClass("select2-container--open")
                        }), this.on("enable", function() {
                            e.$container.removeClass("select2-container--disabled")
                        }), this.on("disable", function() {
                            e.$container.addClass("select2-container--disabled")
                        }), this.on("blur", function() {
                            e.$container.removeClass("select2-container--focus")
                        }), this.on("query", function(t) {
                            e.isOpen() || e.trigger("open", {}), this.dataAdapter.query(t, function(n) {
                                e.trigger("results:all", {
                                    data: n,
                                    query: t
                                })
                            })
                        }), this.on("query:append", function(t) {
                            this.dataAdapter.query(t, function(n) {
                                e.trigger("results:append", {
                                    data: n,
                                    query: t
                                })
                            })
                        }), this.on("keypress", function(t) {
                            var n = t.which;
                            e.isOpen() ? n === i.ESC || n === i.TAB || n === i.UP && t.altKey ? (e.close(), t.preventDefault()) : n === i.ENTER ? (e.trigger("results:select", {}), t.preventDefault()) : n === i.SPACE && t.ctrlKey ? (e.trigger("results:toggle", {}), t.preventDefault()) : n === i.UP ? (e.trigger("results:previous", {}), t.preventDefault()) : n === i.DOWN && (e.trigger("results:next", {}), t.preventDefault()) : (n === i.ENTER || n === i.SPACE || n === i.DOWN && t.altKey) && (e.open(), t.preventDefault())
                        })
                    }, r.prototype._syncAttributes = function() {
                        this.options.set("disabled", this.$element.prop("disabled")), this.options.get("disabled") ? (this.isOpen() && this.close(), this.trigger("disable", {})) : this.trigger("enable", {})
                    }, r.prototype._syncSubtree = function(e, t) {
                        var n = !1,
                            i = this;
                        if (!e || !e.target || "OPTION" === e.target.nodeName || "OPTGROUP" === e.target.nodeName) {
                            if (t)
                                if (t.addedNodes && t.addedNodes.length > 0)
                                    for (var r = 0; r < t.addedNodes.length; r++) {
                                        var o = t.addedNodes[r];
                                        o.selected && (n = !0)
                                    } else t.removedNodes && t.removedNodes.length > 0 && (n = !0);
                                else n = !0;
                            n && this.dataAdapter.current(function(e) {
                                i.trigger("selection:update", {
                                    data: e
                                })
                            })
                        }
                    }, r.prototype.trigger = function(e, t) {
                        var n = r.__super__.trigger,
                            i = {
                                open: "opening",
                                close: "closing",
                                select: "selecting",
                                unselect: "unselecting"
                            };
                        if (void 0 === t && (t = {}), e in i) {
                            var o = i[e],
                                a = {
                                    prevented: !1,
                                    name: e,
                                    args: t
                                };
                            if (n.call(this, o, a), a.prevented) return void(t.prevented = !0)
                        }
                        n.call(this, e, t)
                    }, r.prototype.toggleDropdown = function() {
                        this.options.get("disabled") || (this.isOpen() ? this.close() : this.open())
                    }, r.prototype.open = function() {
                        this.isOpen() || this.trigger("query", {})
                    }, r.prototype.close = function() {
                        this.isOpen() && this.trigger("close", {})
                    }, r.prototype.isOpen = function() {
                        return this.$container.hasClass("select2-container--open")
                    }, r.prototype.hasFocus = function() {
                        return this.$container.hasClass("select2-container--focus")
                    }, r.prototype.focus = function(e) {
                        this.hasFocus() || (this.$container.addClass("select2-container--focus"), this.trigger("focus", {}))
                    }, r.prototype.enable = function(e) {
                        this.options.get("debug") && window.console && console.warn && void 0, (null == e || 0 === e.length) && (e = [!0]);
                        var t = !e[0];
                        this.$element.prop("disabled", t)
                    }, r.prototype.data = function() {
                        this.options.get("debug") && arguments.length > 0 && window.console && console.warn && void 0;
                        var e = [];
                        return this.dataAdapter.current(function(t) {
                            e = t
                        }), e
                    }, r.prototype.val = function(t) {
                        if (this.options.get("debug") && window.console && console.warn && void 0, null == t || 0 === t.length) return this.$element.val();
                        var n = t[0];
                        e.isArray(n) && (n = e.map(n, function(e) {
                            return e.toString()
                        })), this.$element.val(n).trigger("change")
                    }, r.prototype.destroy = function() {
                        this.$container.remove(), this.$element[0].detachEvent && this.$element[0].detachEvent("onpropertychange", this._syncA), null != this._observer ? (this._observer.disconnect(), this._observer = null) : this.$element[0].removeEventListener && (this.$element[0].removeEventListener("DOMAttrModified", this._syncA, !1), this.$element[0].removeEventListener("DOMNodeInserted", this._syncS, !1), this.$element[0].removeEventListener("DOMNodeRemoved", this._syncS, !1)), this._syncA = null, this._syncS = null, this.$element.off(".select2"), this.$element.attr("tabindex", this.$element.data("old-tabindex")), this.$element.removeClass("select2-hidden-accessible"), this.$element.attr("aria-hidden", "false"), this.$element.removeData("select2"), this.dataAdapter.destroy(), this.selection.destroy(), this.dropdown.destroy(), this.results.destroy(), this.dataAdapter = null, this.selection = null, this.dropdown = null, this.results = null
                    }, r.prototype.render = function() {
                        var t = e('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');
                        return t.attr("dir", this.options.get("dir")), this.$container = t, this.$container.addClass("select2-container--" + this.options.get("theme")), t.data("element", this.$element), t
                    }, r
                }), t.define("select2/compat/utils", ["jquery"], function(e) {
                    function t(t, n, i) {
                        var r, o, a = [];
                        r = e.trim(t.attr("class")), r && (r = "" + r, e(r.split(/\s+/)).each(function() {
                            0 === this.indexOf("select2-") && a.push(this)
                        })), r = e.trim(n.attr("class")), r && (r = "" + r, e(r.split(/\s+/)).each(function() {
                            0 !== this.indexOf("select2-") && (o = i(this), null != o && a.push(o))
                        })), t.attr("class", a.join(" "))
                    }
                    return {
                        syncCssClasses: t
                    }
                }), t.define("select2/compat/containerCss", ["jquery", "./utils"], function(e, t) {
                    function n(e) {
                        return null
                    }

                    function i() {}
                    return i.prototype.render = function(i) {
                        var r = i.call(this),
                            o = this.options.get("containerCssClass") || "";
                        e.isFunction(o) && (o = o(this.$element));
                        var a = this.options.get("adaptContainerCssClass");
                        if (a = a || n, -1 !== o.indexOf(":all:")) {
                            o = o.replace(":all:", "");
                            var s = a;
                            a = function(e) {
                                var t = s(e);
                                return null != t ? t + " " + e : e
                            }
                        }
                        var l = this.options.get("containerCss") || {};
                        return e.isFunction(l) && (l = l(this.$element)), t.syncCssClasses(r, this.$element, a), r.css(l), r.addClass(o), r
                    }, i
                }), t.define("select2/compat/dropdownCss", ["jquery", "./utils"], function(e, t) {
                    function n(e) {
                        return null
                    }

                    function i() {}
                    return i.prototype.render = function(i) {
                        var r = i.call(this),
                            o = this.options.get("dropdownCssClass") || "";
                        e.isFunction(o) && (o = o(this.$element));
                        var a = this.options.get("adaptDropdownCssClass");
                        if (a = a || n, -1 !== o.indexOf(":all:")) {
                            o = o.replace(":all:", "");
                            var s = a;
                            a = function(e) {
                                var t = s(e);
                                return null != t ? t + " " + e : e
                            }
                        }
                        var l = this.options.get("dropdownCss") || {};
                        return e.isFunction(l) && (l = l(this.$element)), t.syncCssClasses(r, this.$element, a), r.css(l), r.addClass(o), r
                    }, i
                }), t.define("select2/compat/initSelection", ["jquery"], function(e) {
                    function t(e, t, n) {
                        n.get("debug") && window.console && console.warn && void 0, this.initSelection = n.get("initSelection"), this._isInitialized = !1, e.call(this, t, n)
                    }
                    return t.prototype.current = function(t, n) {
                        var i = this;
                        return this._isInitialized ? void t.call(this, n) : void this.initSelection.call(null, this.$element, function(t) {
                            i._isInitialized = !0, e.isArray(t) || (t = [t]), n(t)
                        })
                    }, t
                }), t.define("select2/compat/inputData", ["jquery"], function(e) {
                    function t(e, t, n) {
                        this._currentData = [], this._valueSeparator = n.get("valueSeparator") || ",", "hidden" === t.prop("type") && n.get("debug") && console && console.warn && void 0, e.call(this, t, n)
                    }
                    return t.prototype.current = function(t, n) {
                        function i(t, n) {
                            var r = [];
                            return t.selected || -1 !== e.inArray(t.id, n) ? (t.selected = !0, r.push(t)) : t.selected = !1, t.children && r.push.apply(r, i(t.children, n)), r
                        }
                        for (var r = [], o = 0; o < this._currentData.length; o++) {
                            var a = this._currentData[o];
                            r.push.apply(r, i(a, this.$element.val().split(this._valueSeparator)))
                        }
                        n(r)
                    }, t.prototype.select = function(t, n) {
                        if (this.options.get("multiple")) {
                            var i = this.$element.val();
                            i += this._valueSeparator + n.id, this.$element.val(i), this.$element.trigger("change")
                        } else this.current(function(t) {
                            e.map(t, function(e) {
                                e.selected = !1
                            })
                        }), this.$element.val(n.id), this.$element.trigger("change")
                    }, t.prototype.unselect = function(e, t) {
                        var n = this;
                        t.selected = !1, this.current(function(e) {
                            for (var i = [], r = 0; r < e.length; r++) {
                                var o = e[r];
                                t.id != o.id && i.push(o.id)
                            }
                            n.$element.val(i.join(n._valueSeparator)), n.$element.trigger("change")
                        })
                    }, t.prototype.query = function(e, t, n) {
                        for (var i = [], r = 0; r < this._currentData.length; r++) {
                            var o = this._currentData[r],
                                a = this.matches(t, o);
                            null !== a && i.push(a)
                        }
                        n({
                            results: i
                        })
                    }, t.prototype.addOptions = function(t, n) {
                        var i = e.map(n, function(t) {
                            return e.data(t[0], "data")
                        });
                        this._currentData.push.apply(this._currentData, i)
                    }, t
                }), t.define("select2/compat/matcher", ["jquery"], function(e) {
                    function t(t) {
                        function n(n, i) {
                            var r = e.extend(!0, {}, i);
                            if (null == n.term || "" === e.trim(n.term)) return r;
                            if (i.children) {
                                for (var o = i.children.length - 1; o >= 0; o--) {
                                    var a = i.children[o],
                                        s = t(n.term, a.text, a);
                                    s || r.children.splice(o, 1)
                                }
                                if (r.children.length > 0) return r
                            }
                            return t(n.term, i.text, i) ? r : null
                        }
                        return n
                    }
                    return t
                }), t.define("select2/compat/query", [], function() {
                    function e(e, t, n) {
                        n.get("debug") && window.console && console.warn && void 0, e.call(this, t, n)
                    }
                    return e.prototype.query = function(e, t, n) {
                        t.callback = n;
                        var i = this.options.get("query");
                        i.call(null, t)
                    }, e
                }), t.define("select2/dropdown/attachContainer", [], function() {
                    function e(e, t, n) {
                        e.call(this, t, n)
                    }
                    return e.prototype.position = function(e, t, n) {
                        var i = n.find(".dropdown-wrapper");
                        i.append(t), t.addClass("select2-dropdown--below"), n.addClass("select2-container--below")
                    }, e
                }), t.define("select2/dropdown/stopPropagation", [], function() {
                    function e() {}
                    return e.prototype.bind = function(e, t, n) {
                        e.call(this, t, n);
                        var i = ["blur", "change", "click", "dblclick", "focus", "focusin", "focusout", "input", "keydown", "keyup", "keypress", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup", "search", "touchend", "touchstart"];
                        this.$dropdown.on(i.join(" "), function(e) {
                            e.stopPropagation()
                        })
                    }, e
                }), t.define("select2/selection/stopPropagation", [], function() {
                    function e() {}
                    return e.prototype.bind = function(e, t, n) {
                        e.call(this, t, n);
                        var i = ["blur", "change", "click", "dblclick", "focus", "focusin", "focusout", "input", "keydown", "keyup", "keypress", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup", "search", "touchend", "touchstart"];
                        this.$selection.on(i.join(" "), function(e) {
                            e.stopPropagation()
                        })
                    }, e
                }),
                function(n) {
                    "function" == typeof t.define && t.define.amd ? t.define("jquery-mousewheel", ["jquery"], n) : "object" == typeof exports ? module.exports = n : n(e)
                }(function(e) {
                    function t(t) {
                        var a = t || window.event,
                            s = l.call(arguments, 1),
                            c = 0,
                            u = 0,
                            p = 0,
                            f = 0,
                            h = 0,
                            m = 0;
                        if (t = e.event.fix(a), t.type = "mousewheel", "detail" in a && (p = -1 * a.detail), "wheelDelta" in a && (p = a.wheelDelta), "wheelDeltaY" in a && (p = a.wheelDeltaY), "wheelDeltaX" in a && (u = -1 * a.wheelDeltaX), "axis" in a && a.axis === a.HORIZONTAL_AXIS && (u = -1 * p, p = 0), c = 0 === p ? u : p, "deltaY" in a && (p = -1 * a.deltaY, c = p), "deltaX" in a && (u = a.deltaX, 0 === p && (c = -1 * u)), 0 !== p || 0 !== u) {
                            if (1 === a.deltaMode) {
                                var g = e.data(this, "mousewheel-line-height");
                                c *= g, p *= g, u *= g
                            } else if (2 === a.deltaMode) {
                                var v = e.data(this, "mousewheel-page-height");
                                c *= v, p *= v, u *= v
                            }
                            if (f = Math.max(Math.abs(p), Math.abs(u)), (!o || o > f) && (o = f, i(a, f) && (o /= 40)), i(a, f) && (c /= 40, u /= 40, p /= 40), c = Math[c >= 1 ? "floor" : "ceil"](c / o), u = Math[u >= 1 ? "floor" : "ceil"](u / o), p = Math[p >= 1 ? "floor" : "ceil"](p / o), d.settings.normalizeOffset && this.getBoundingClientRect) {
                                var y = this.getBoundingClientRect();
                                h = t.clientX - y.left, m = t.clientY - y.top
                            }
                            return t.deltaX = u, t.deltaY = p, t.deltaFactor = o, t.offsetX = h, t.offsetY = m, t.deltaMode = 0, s.unshift(t, c, u, p), r && clearTimeout(r), r = setTimeout(n, 200), (e.event.dispatch || e.event.handle).apply(this, s)
                        }
                    }

                    function n() {
                        o = null
                    }

                    function i(e, t) {
                        return d.settings.adjustOldDeltas && "mousewheel" === e.type && t % 120 === 0
                    }
                    var r, o, a = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
                        s = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
                        l = Array.prototype.slice;
                    if (e.event.fixHooks)
                        for (var c = a.length; c;) e.event.fixHooks[a[--c]] = e.event.mouseHooks;
                    var d = e.event.special.mousewheel = {
                        version: "3.1.12",
                        setup: function() {
                            if (this.addEventListener)
                                for (var n = s.length; n;) this.addEventListener(s[--n], t, !1);
                            else this.onmousewheel = t;
                            e.data(this, "mousewheel-line-height", d.getLineHeight(this)), e.data(this, "mousewheel-page-height", d.getPageHeight(this))
                        },
                        teardown: function() {
                            if (this.removeEventListener)
                                for (var n = s.length; n;) this.removeEventListener(s[--n], t, !1);
                            else this.onmousewheel = null;
                            e.removeData(this, "mousewheel-line-height"), e.removeData(this, "mousewheel-page-height")
                        },
                        getLineHeight: function(t) {
                            var n = e(t),
                                i = n["offsetParent" in e.fn ? "offsetParent" : "parent"]();
                            return i.length || (i = e("body")), parseInt(i.css("fontSize"), 10) || parseInt(n.css("fontSize"), 10) || 16
                        },
                        getPageHeight: function(t) {
                            return e(t).height()
                        },
                        settings: {
                            adjustOldDeltas: !0,
                            normalizeOffset: !0
                        }
                    };
                    e.fn.extend({
                        mousewheel: function(e) {
                            return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
                        },
                        unmousewheel: function(e) {
                            return this.unbind("mousewheel", e)
                        }
                    })
                }), t.define("jquery.select2", ["jquery", "jquery-mousewheel", "./select2/core", "./select2/defaults"], function(e, t, n, i) {
                    if (null == e.fn.select2) {
                        var r = ["open", "close", "destroy"];
                        e.fn.select2 = function(t) {
                            if (t = t || {}, "object" == typeof t) return this.each(function() {
                                var i = e.extend(!0, {}, t);
                                new n(e(this), i)
                            }), this;
                            if ("string" == typeof t) {
                                var i, o = Array.prototype.slice.call(arguments, 1);
                                return this.each(function() {
                                    var n = e(this).data("select2");
                                    null == n && window.console && console.error && void 0, i = n[t].apply(n, o)
                                }), e.inArray(t, r) > -1 ? this : i
                            }
                            throw new Error("Invalid arguments for Select2: " + t)
                        }
                    }
                    return null == e.fn.select2.defaults && (e.fn.select2.defaults = i), n
                }), {
                    define: t.define,
                    require: t.require
                }
        }(),
        n = t.require("jquery.select2");
    return e.fn.select2.amd = t, n
}),
function() {
    if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) var e = jQuery.fn.select2.amd;
    return e.define("select2/i18n/tr", [], function() {
        return {
            inputTooLong: function(e) {
                var t = e.input.length - e.maximum,
                    n = t + " karakter daha girmelisiniz";
                return n
            },
            inputTooShort: function(e) {
                var t = e.minimum - e.input.length,
                    n = "En az " + t + " karakter daha girmelisiniz";
                return n
            },
            loadingMore: function() {
                return "Daha fazla…"
            },
            maximumSelected: function(e) {
                var t = "Sadece " + e.maximum + " seçim yapabilirsiniz";
                return t
            },
            noResults: function() {
                return "Sonuç bulunamadı"
            },
            searching: function() {
                return "Aranıyor…"
            }
        }
    }), {
        define: e.define,
        require: e.require
    }
}(),
function() {
    if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) var e = jQuery.fn.select2.amd;
    return e.define("select2/i18n/en", [], function() {
        return {
            errorLoading: function() {
                return "The results could not be loaded."
            },
            inputTooLong: function(e) {
                var t = e.input.length - e.maximum,
                    n = "Please delete " + t + " character";
                return 1 != t && (n += "s"), n
            },
            inputTooShort: function(e) {
                var t = e.minimum - e.input.length,
                    n = "Please enter " + t + " or more characters";
                return n
            },
            loadingMore: function() {
                return "Loading more results…"
            },
            maximumSelected: function(e) {
                var t = "You can only select " + e.maximum + " item";
                return 1 != e.maximum && (t += "s"), t
            },
            noResults: function() {
                return "No results found"
            },
            searching: function() {
                return "Searching…"
            }
        }
    }), {
        define: e.define,
        require: e.require
    }
}(),
function() {
    if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) var e = jQuery.fn.select2.amd;
    return e.define("select2/i18n/ar", [], function() {
        return {
            errorLoading: function() {
                return "لا يمكن تحميل النتائج"
            },
            inputTooLong: function(e) {
                var t = e.input.length - e.maximum,
                    n = "الرجاء حذف " + t + " عناصر";
                return n
            },
            inputTooShort: function(e) {
                var t = e.minimum - e.input.length,
                    n = "الرجاء إضافة " + t + " عناصر";
                return n
            },
            loadingMore: function() {
                return "جاري تحميل نتائج إضافية..."
            },
            maximumSelected: function(e) {
                var t = "تستطيع إختيار " + e.maximum + " بنود فقط";
                return t
            },
            noResults: function() {
                return "لم يتم العثور على أي نتائج"
            },
            searching: function() {
                return "جاري البحث…"
            }
        }
    }), {
        define: e.define,
        require: e.require
    }
}(),
function() {
    if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) var e = jQuery.fn.select2.amd;
    return e.define("select2/i18n/fa", [], function() {
        return {
            errorLoading: function() {
                return "امکان بارگذاری نتایج وجود ندارد."
            },
            inputTooLong: function(e) {
                var t = e.input.length - e.maximum,
                    n = "لطفاً " + t + " کاراکتر را حذف نمایید";
                return n
            },
            inputTooShort: function(e) {
                var t = e.minimum - e.input.length,
                    n = "لطفاً تعداد " + t + " کاراکتر یا بیشتر وارد نمایید";
                return n
            },
            loadingMore: function() {
                return "در حال بارگذاری نتایج بیشتر..."
            },
            maximumSelected: function(e) {
                var t = "شما تنها می‌توانید " + e.maximum + " آیتم را انتخاب نمایید";
                return t
            },
            noResults: function() {
                return "هیچ نتیجه‌ای یافت نشد"
            },
            searching: function() {
                return "در حال جستجو..."
            }
        }
    }), {
        define: e.define,
        require: e.require
    }
}(), ! function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(e) {
    "use strict";

    function t() {
        var e = document.createElement("input");
        return e.setAttribute("type", "range"), "text" !== e.type
    }

    function n(e, t) {
        var n = Array.prototype.slice.call(arguments, 2);
        return setTimeout(function() {
            return e.apply(null, n)
        }, t)
    }

    function i(e, t) {
        return t = t || 100,
            function() {
                if (!e.debouncing) {
                    var n = Array.prototype.slice.apply(arguments);
                    e.lastReturnVal = e.apply(window, n), e.debouncing = !0
                }
                return clearTimeout(e.debounceTimeout), e.debounceTimeout = setTimeout(function() {
                    e.debouncing = !1
                }, t), e.lastReturnVal
            }
    }

    function r(e) {
        return e && (0 === e.offsetWidth || 0 === e.offsetHeight || e.open === !1)
    }

    function o(e) {
        for (var t = [], n = e.parentNode; r(n);) t.push(n), n = n.parentNode;
        return t
    }

    function a(e, t) {
        function n(e) {
            "undefined" != typeof e.open && (e.open = !e.open)
        }
        var i = o(e),
            r = i.length,
            a = [],
            s = e[t];
        if (r) {
            for (var l = 0; l < r; l++) a[l] = i[l].style.cssText, i[l].style.setProperty ? i[l].style.setProperty("display", "block", "important") : i[l].style.cssText += ";display: block !important", i[l].style.height = "0", i[l].style.overflow = "hidden", i[l].style.visibility = "hidden", n(i[l]);
            s = e[t];
            for (var c = 0; c < r; c++) i[c].style.cssText = a[c], n(i[c])
        }
        return s
    }

    function s(e, t) {
        var n = parseFloat(e);
        return Number.isNaN(n) ? t : n
    }

    function l(e) {
        return e.charAt(0).toUpperCase() + e.substr(1)
    }

    function c(t, r) {
        if (this.$window = e(window), this.$document = e(document), this.$element = e(t), this.options = e.extend({}, f, r), this.polyfill = this.options.polyfill, this.orientation = this.$element[0].getAttribute("data-orientation") || this.options.orientation, this.onInit = this.options.onInit, this.onSlide = this.options.onSlide, this.onSlideEnd = this.options.onSlideEnd, this.DIMENSION = h.orientation[this.orientation].dimension, this.DIRECTION = h.orientation[this.orientation].direction, this.DIRECTION_STYLE = h.orientation[this.orientation].directionStyle, this.COORDINATE = h.orientation[this.orientation].coordinate, this.polyfill && p) return !1;
        this.identifier = "js-" + d + "-" + u++, this.startEvent = this.options.startEvent.join("." + this.identifier + " ") + "." + this.identifier,
            this.moveEvent = this.options.moveEvent.join("." + this.identifier + " ") + "." + this.identifier, this.endEvent = this.options.endEvent.join("." + this.identifier + " ") + "." + this.identifier, this.toFixed = (this.step + "").replace(".", "").length - 1, this.$fill = e('<div class="' + this.options.fillClass + '" />'), this.$handle = e('<div class="' + this.options.handleClass + '" />'), this.$range = e('<div class="' + this.options.rangeClass + " " + this.options[this.orientation + "Class"] + '" id="' + this.identifier + '" />').insertAfter(this.$element).prepend(this.$fill, this.$handle), this.$element.css({
                position: "absolute",
                width: "1px",
                height: "1px",
                overflow: "hidden",
                opacity: "0"
            }), this.handleDown = e.proxy(this.handleDown, this), this.handleMove = e.proxy(this.handleMove, this), this.handleEnd = e.proxy(this.handleEnd, this), this.init();
        var o = this;
        this.$window.on("resize." + this.identifier, i(function() {
            n(function() {
                o.update(!1, !1)
            }, 300)
        }, 20)), this.$document.on(this.startEvent, "#" + this.identifier + ":not(." + this.options.disabledClass + ")", this.handleDown), this.$element.on("change." + this.identifier, function(e, t) {
            if (!t || t.origin !== o.identifier) {
                var n = e.target.value,
                    i = o.getPositionFromValue(n);
                o.setPosition(i)
            }
        })
    }
    Number.isNaN = Number.isNaN || function(e) {
        return "number" == typeof e && e !== e
    };
    var d = "rangeslider",
        u = 0,
        p = t(),
        f = {
            polyfill: !0,
            orientation: "horizontal",
            rangeClass: "rangeslider",
            disabledClass: "rangeslider--disabled",
            activeClass: "rangeslider--active",
            horizontalClass: "rangeslider--horizontal",
            verticalClass: "rangeslider--vertical",
            fillClass: "rangeslider__fill",
            handleClass: "rangeslider__handle",
            startEvent: ["mousedown", "touchstart", "pointerdown"],
            moveEvent: ["mousemove", "touchmove", "pointermove"],
            endEvent: ["mouseup", "touchend", "pointerup"]
        },
        h = {
            orientation: {
                horizontal: {
                    dimension: "width",
                    direction: "left",
                    directionStyle: "left",
                    coordinate: "x"
                },
                vertical: {
                    dimension: "height",
                    direction: "top",
                    directionStyle: "bottom",
                    coordinate: "y"
                }
            }
        };
    return c.prototype.init = function() {
        this.update(!0, !1), this.onInit && "function" == typeof this.onInit && this.onInit()
    }, c.prototype.update = function(e, t) {
        e = e || !1, e && (this.min = s(this.$element[0].getAttribute("min"), 0), this.max = s(this.$element[0].getAttribute("max"), 100), this.value = s(this.$element[0].value, Math.round(this.min + (this.max - this.min) / 2)), this.step = s(this.$element[0].getAttribute("step"), 1)), this.handleDimension = a(this.$handle[0], "offset" + l(this.DIMENSION)), this.rangeDimension = a(this.$range[0], "offset" + l(this.DIMENSION)), this.maxHandlePos = this.rangeDimension - this.handleDimension, this.grabPos = this.handleDimension / 2, this.position = this.getPositionFromValue(this.value), this.$element[0].disabled ? this.$range.addClass(this.options.disabledClass) : this.$range.removeClass(this.options.disabledClass), this.setPosition(this.position, t)
    }, c.prototype.handleDown = function(e) {
        if (e.preventDefault(), this.$document.on(this.moveEvent, this.handleMove), this.$document.on(this.endEvent, this.handleEnd), this.$range.addClass(this.options.activeClass), !((" " + e.target.className + " ").replace(/[\n\t]/g, " ").indexOf(this.options.handleClass) > -1)) {
            var t = this.getRelativePosition(e),
                n = this.$range[0].getBoundingClientRect()[this.DIRECTION],
                i = this.getPositionFromNode(this.$handle[0]) - n,
                r = "vertical" === this.orientation ? this.maxHandlePos - (t - this.grabPos) : t - this.grabPos;
            this.setPosition(r), t >= i && t < i + this.handleDimension && (this.grabPos = t - i)
        }
    }, c.prototype.handleMove = function(e) {
        e.preventDefault();
        var t = this.getRelativePosition(e),
            n = "vertical" === this.orientation ? this.maxHandlePos - (t - this.grabPos) : t - this.grabPos;
        this.setPosition(n)
    }, c.prototype.handleEnd = function(e) {
        e.preventDefault(), this.$document.off(this.moveEvent, this.handleMove), this.$document.off(this.endEvent, this.handleEnd), this.$range.removeClass(this.options.activeClass), this.$element.trigger("change", {
            origin: this.identifier
        }), this.onSlideEnd && "function" == typeof this.onSlideEnd && this.onSlideEnd(this.position, this.value)
    }, c.prototype.cap = function(e, t, n) {
        return e < t ? t : e > n ? n : e
    }, c.prototype.setPosition = function(e, t) {
        var n, i;
        void 0 === t && (t = !0), n = this.getValueFromPosition(this.cap(e, 0, this.maxHandlePos)), i = this.getPositionFromValue(n), this.$fill[0].style[this.DIMENSION] = i + this.grabPos + "px", this.$handle[0].style[this.DIRECTION_STYLE] = i + "px", this.setValue(n), this.position = i, this.value = n, t && this.onSlide && "function" == typeof this.onSlide && this.onSlide(i, n)
    }, c.prototype.getPositionFromNode = function(e) {
        for (var t = 0; null !== e;) t += e.offsetLeft, e = e.offsetParent;
        return t
    }, c.prototype.getRelativePosition = function(e) {
        var t = l(this.COORDINATE),
            n = this.$range[0].getBoundingClientRect()[this.DIRECTION],
            i = 0;
        return "undefined" != typeof e.originalEvent["client" + t] ? i = e.originalEvent["client" + t] : e.originalEvent.touches && e.originalEvent.touches[0] && "undefined" != typeof e.originalEvent.touches[0]["client" + t] ? i = e.originalEvent.touches[0]["client" + t] : e.currentPoint && "undefined" != typeof e.currentPoint[this.COORDINATE] && (i = e.currentPoint[this.COORDINATE]), i - n
    }, c.prototype.getPositionFromValue = function(e) {
        var t, n;
        return t = (e - this.min) / (this.max - this.min), n = Number.isNaN(t) ? 0 : t * this.maxHandlePos
    }, c.prototype.getValueFromPosition = function(e) {
        var t, n;
        return t = e / (this.maxHandlePos || 1), n = this.step * Math.round(t * (this.max - this.min) / this.step) + this.min, Number(n.toFixed(this.toFixed))
    }, c.prototype.setValue = function(e) {
        e === this.value && "" !== this.$element[0].value || this.$element.val(e).trigger("input", {
            origin: this.identifier
        })
    }, c.prototype.destroy = function() {
        this.$document.off("." + this.identifier), this.$window.off("." + this.identifier), this.$element.off("." + this.identifier).removeAttr("style").removeData("plugin_" + d), this.$range && this.$range.length && this.$range[0].parentNode.removeChild(this.$range[0])
    }, e.fn[d] = function(t) {
        var n = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            var i = e(this),
                r = i.data("plugin_" + d);
            r || i.data("plugin_" + d, r = new c(this, t)), "string" == typeof t && r[t].apply(r, n)
        })
    }, "rangeslider.js is available in jQuery context e.g $(selector).rangeslider(options);"
});
var Main = function() {
    var e = {
            language: null
        },
        t = function() {
            n(), i(), $.fn.tooltip.Constructor.prototype.recalculatePosition = function() {
                var e = this.tip();
                if (e.is(":visible")) {
                    var t = "function" == typeof this.options.placement ? this.options.placement.call(this, e[0], this.$element[0]) : this.options.placement,
                        n = /\s?auto?\s?/i,
                        i = n.test(t);
                    i && (t = t.replace(n, "") || "top"), e.addClass(t);
                    var r = this.getPosition(),
                        o = e[0].offsetWidth,
                        a = e[0].offsetHeight;
                    if (i) {
                        var s = t,
                            l = this.getPosition(this.$viewport);
                        t = "bottom" == t && r.bottom + a > l.bottom ? "top" : "top" == t && r.top - a < l.top ? "bottom" : "right" == t && r.right + o > l.width ? "left" : "left" == t && r.left - o < l.left ? "right" : t, e.removeClass(s).addClass(t)
                    }
                    var c = this.getCalculatedOffset(t, r, o, a);
                    this.applyPlacement(c, t)
                }
            }, Number.prototype.format = function(e, t, n, i) {
                var r = "\\d(?=(\\d{" + (t || 3) + "})+" + (e > 0 ? "\\D" : "$") + ")",
                    o = this.toFixed(Math.max(0, ~~e));
                return (i ? o.replace(".", i) : o).replace(new RegExp(r, "g"), "$&" + (n || ","))
            }, o(), r(), u(), a(), s(), l(), $(document).on("submit", "form[data-async]", function(e) {
                var t = $(this),
                    n = $(t.attr("data-target")),
                    i = $("input[type='submit'][clicked=true], button[type='submit'][clicked=true]", t),
                    r = t.serializeArray();
                1 === i.size() ? r.push({
                    name: $(i[0]).attr("name"),
                    value: "1"
                }) : 0 !== i.size(), i.attr("disabled", "true"), $.ajax({
                    type: t.attr("method"),
                    url: t.attr("action"),
                    data: r,
                    success: function(e, t) {
                        n.find(".modal-content").html(e)
                    },
                    done: function() {
                        i.removeAttr("disabled"), i.button("reset")
                    }
                }), e.preventDefault()
            }), $(document).on("click", 'input[type="submit"], button[type="submit"]', function() {
                $("form[data-async] input[type=submit], form[data-async] button[type=submit]", $(this).parents("form")).removeAttr("clicked"), $(this).attr("clicked", "true")
            }), c()
        },
        n = function() {
            $.validator.addMethod("customemail", function(e, t) {
                return /^\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,13}\b$/i.test(e)
            }, "Invalid email address"), $.validator.addMethod("genericphone", function(e, t) {
                return /^(?=.*[0-9])[- +()0-9]+$/i.test(e)
            }, "Invalid phone number"), $.validator.addMethod("turkishdate", function(e, t) {
                return e.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]([12]\d{3})$/)
            }, "Please enter date in day/month/year format."), $.validator.addMethod("minStrict", function(e, t, n) {
                return e >= n
            }, "Inlid entry"), $.validator.addMethod("minItems", function(e, t, n) {
                return e.length >= n
            }, "Error")
        },
        i = function() {
            $("input").on("focus, keyup", function() {
                $(this).parent().find(".valid").length > 0 && $(this).parent().find("label.valid").remove()
            }), $("input").on("blur", function() {
                $(this).parent().find("label.valid").length > 1 && $(this).parent().find("label.valid").not(":first-of-type").remove()
            })
        },
        r = function() {
            function e() {
                var e = $(this).scrollTop();
                Math.abs(n - e) <= i || $("#mainHead").hasClass("fixed") || (e > n && e > $("body").height() / 2 ? $("#mainHead").css("top", $("body").height() / 2 * -1.2) : e + $(window).height() < $(document).height() && $("#mainHead").css("top", "0"), n = e)
            }
            var t, n = 0,
                i = 5,
                r = new Event("show.scrolltotop"),
                o = new Event("hide.scrolltotop");
            $(window).scroll(function(e) {
                t = !0, $(this).scrollTop() > $("body").height() / 2 ? $(".scrollToTop").length > 0 && $(window).width() > 767 && ($(".scrollToTop").css({
                    visibility: "visible"
                }), $(".scrollToTop").fadeIn(400, function() {
                    $(this).css("display", "table")
                }), window.dispatchEvent(r)) : $(".scrollToTop").length > 0 && $(window).width() > 767 && ($(".scrollToTop").fadeOut(), $(".scrollToTop").css({
                    visibility: "hidden"
                }), window.dispatchEvent(o))
            }), $(".scrollToTop").click(function() {
                return $("html, body").animate({
                    scrollTop: 0
                }, 800), !1
            }), setInterval(function() {
                t && (e(), t = !1)
            }, 100)
        },
        o = function() {
            $("select:not(select[name=countryCode]):not(#fileLanguageId):not(#interpretLanguageId):not(#selectLang select)").select2({
                minimumResultsForSearch: -1,
                width: null,
                language: e.Language
            }), $("#timezone").select2({
                minimumResultsForSearch: 1,
                width: null,
                language: e.Language
            }), $("#timezoneOffset").select2({
                minimumResultsForSearch: 1,
                width: null,
                language: e.Language
            }), $("#currencySelect").select2({
                minimumResultsForSearch: 1,
                width: null,
                language: e.Language
            }), $("#fileLanguageId").select2({
                minimumResultsForSearch: 1,
                width: null,
                language: e.Language
            }), $("#contentLanguageId").select2({
                minimumResultsForSearch: 1,
                width: null,
                language: e.Language
            }), $("#interpretLanguageId").select2({
                minimumResultsForSearch: 1,
                width: null,
                closeOnSelect: !1,
                language: e.Language
            }), $("#nativeLanguageId").select2({
                minimumResultsForSearch: 1,
                width: null,
                language: e.Language
            }), $("#selectLang select").select2({
                minimumResultsForSearch: 1,
                width: null
            });
            var t = $("html"),
                n = "rtl" === t.attr("dir");
            $("select[name=countryCode]").on("select2:open", function(e) {
                var t = $(".select2-dropdown.countrycode").parent();
                t.hasClass("country-code-wrapper") || t.addClass("country-code-wrapper"), n && setTimeout(function() {
                    var e = $("html").width(),
                        n = $(".select2-dropdown.countrycode").width();
                    t.css("left", e / 2 - n / 2)
                }, 0)
            }), $("select[name=countryCode]").select2({
                width: null,
                language: e.Language,
                dropdownCssClass: "countrycode",
                templateSelection: function(e) {
                    var t = $(e.element);
                    return "+" + t.data("phonecode")
                },
                templateResult: function(e) {
                    if (!e.id) return e.text;
                    var t = $(e.element),
                        n = t.closest("select").data("flagpath"),
                        i = '<img src="' + n + '" alt="' + e.text + '" class="flag flag-' + t.data("code") + '" /><span>' + e.text + "</span>";
                    return $(i)
                }
            }), $("select.country-multi-select2").select2({
                width: null,
                language: e.Language,
                dropdownCssClass: "countrycode",
                templateSelection: function(e) {
                    var t = $(e.element);
                    return "+" + t.data("phonecode")
                },
                templateResult: function(e) {
                    if (!e.id) return e.text;
                    var t = $(e.element),
                        n = t.closest("select").data("flagpath"),
                        i = '<img src="' + n + '" alt="' + e.text + '" class="flag flag-' + t.data("code") + '" /><span>' + e.text + "</span>";
                    return $(i)
                }
            }), $("select[name=country]").select2({
                width: null,
                language: e.Language,
                dropdownCssClass: "country",
                templateResult: function(e) {
                    if (!e.id) return e.text;
                    var t = $(e.element),
                        n = t.closest("select").data("flagpath"),
                        i = '<img src="' + n + '" alt="' + e.text + '" class="flag flag-' + t.data("code") + '" /><span>' + e.text + "</span>";
                    return $(i)
                }
            })
        },
        a = function() {
            $("input[name=phoneNumber]").mask("000000ZZZZZZZZZZZZZZ", {
                translation: {
                    Z: {
                        pattern: /[0-9]/,
                        optional: !0
                    }
                }
            })
        },
        s = function() {
            if (0 !== $(".longerText").length) {
                var e = function(e) {
                    var t = 44;
                    window.matchMedia("(min-width: 1024px)").matches && (t = 44), window.matchMedia("(max-width: 1023px)").matches && (t = 77), window.matchMedia("(max-width: 767px)").matches && (t = 44), window.matchMedia("(max-width: 413px)").matches && (t = 37), window.matchMedia("(max-width: 374px)").matches && (t = 30);
                    var n = 2 * t;
                    e.val().length < t ? e.removeClass("doubleLine").removeClass("trippleLine") : e.val().length > t && e.val().length <= n ? e.addClass("doubleLine") : e.val().length > n && e.removeClass("doubleLine").addClass("trippleLine")
                };
                $(".longerText").each(function() {
                    e($(this))
                }), $(".longerText").on("keyup", function() {
                    e($(this))
                })
            }
        },
        l = function() {
            $('form .form-group label:not([for=""])').dblclick(function() {
                var e = $(this).attr("for");
                $("#" + e).focus()
            })
        },
        c = function() {
            $("#sidebarLeft, #sidebarRight").mCustomScrollbar({
                theme: "minimal"
            }), $(".wrapper.sidebar #dismiss, .wrapper.sidebar .overlay").on("click", function() {
                $("#sidebarLeft").removeClass("active"), $("#sidebarRight").removeClass("active"), $(".wrapper.sidebar .overlay").removeClass("active")
            }), $("#sidebarLeftCollapse").on("click", function() {
                $("#sidebarLeft").addClass("active"), $(".wrapper.sidebar .overlay").addClass("active"), $(".collapse.in").toggleClass("in"), $("a[aria-expanded=true]").attr("aria-expanded", "false")
            }), $("#sidebarRightCollapse").on("click", function() {
                $("#sidebarRight").addClass("active"), $(".wrapper.sidebar .overlay").addClass("active"), $(".collapse.in").toggleClass("in"), $("a[aria-expanded=true]").attr("aria-expanded", "false")
            })
        },
        d = function(e) {
            var t = document.getElementById(e).innerHTML,
                n = document.body.innerHTML;
            document.body.innerHTML = t, window.print(), document.body.innerHTML = n
        },
        u = function() {
            $('[data-toggle="tooltip"]').tooltip(), $(".help").hover(function() {
                $(this).next(".helpInfoWR").parent().hasClass("cvc") && $(this).next(".helpInfoWR").addClass("number2"), $(this).parent().find(".helpInfoWR").eq(0).fadeIn(150)
            }), $(".help").mouseleave(function() {
                $(this).parent().find(".helpInfoWR").eq(0).fadeOut(150)
            })
        },
        p = function(e, t, n) {
            e.off("change.select2", n), e.on("change.select2", n), e.prop("disabled", !1), $("#selectedLanguageId").length > 0 && $("#selectedLanguageId").val(e.val().join(","));
            var i = null === t || t.autoSetToLanguage;
            i && 0 == e.find("option:selected").length && e.val(e.find("option:first").val())
        },
        f = function() {
            var e = window.navigator.userAgent,
                t = e.indexOf("MSIE ");
            if (t > 0) return !0;
            var n = e.indexOf("Trident/");
            return n > 0
        },
        h = function(n) {
            $.extend(e, n), t()
        };
    return {
        init: h,
        printDiv: d,
        initTooltips: u,
        initMultiLanguageSelector: p,
        isIEBrowser: f
    }
}();
window.isMobile = function() {
        var e = !1;
        return function(t) {
            (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (e = !0)
        }(navigator.userAgent || navigator.vendor || window.opera), e
    },
    function() {
        if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) var e = jQuery.fn.select2.amd;
        return e.define("select2/i18n/tr", [], function() {
            return {
                inputTooLong: function(e) {
                    var t = e.input.length - e.maximum,
                        n = t + " karakter daha girmelisiniz";
                    return n
                },
                inputTooShort: function(e) {
                    var t = e.minimum - e.input.length,
                        n = "En az " + t + " karakter daha girmelisiniz";
                    return n
                },
                loadingMore: function() {
                    return "Daha fazlaâ€¦"
                },
                maximumSelected: function(e) {
                    var t = "Sadece " + e.maximum + " seÃ§im yapabilirsiniz";
                    return t
                },
                noResults: function() {
                    return "SonuÃ§ bulunamadÄ±"
                },
                searching: function() {
                    return "AranÄ±yorâ€¦"
                }
            }
        }), {
            define: e.define,
            require: e.require
        }
    }(), getScript = function(e, t) {
        var n = document.createElement("script"),
            i = document.getElementsByTagName("script")[0];
        n.src = e, i.parentNode.insertBefore(n, i), n.onload = t
    };
var Analytics = function() {
        var e = function(e, t) {
            "undefined" == typeof t && (t = window.location.pathname), gtag("event", "page_view", {
                page_path: t
            }), (t.indexOf("order-entry") > -1 || t.indexOf("siparis-giris") > -1) && gtag("event", "conversion", {
                send_to: "AW-963944998/JaX9CLmlxM8CEKbE0ssD"
            })
        };
        return {
            sendPageViewEvent: e
        }
    }(),
    CurrencySelect = function() {
        var e = {
                urls: {}
            },
            t = function() {
                i()
            },
            n = function(n) {
                $.extend(e, n), t()
            },
            i = function() {
                var t = function(t) {
                    $.post(e.urls.setCurrency, {
                        currencyCode: t
                    }).done(function(e) {
                        var t = $.parseJSON(e);
                        t.success && window.location.reload()
                    })
                };
                $(".navbar .currency select").off("change"), $(".navbar .currency select").on("change", function() {
                    t($(this).val())
                }), $(".navbar .currency-select.dropdown-menu a, #sidebarRight .currency-select a").each(function() {
                    var e = $(this).data("currency");
                    $(this).off("click"), $(this).on("click", function(n) {
                        n.preventDefault(), t(e)
                    })
                })
            };
        return {
            init: n
        }
    }(),
    Menu = function() {
        function e(e) {
            $.extend(t, e), 0 !== $("#desktopDropdownMenuText").length && ($.ajax({
                url: t.urls.getLanguageMenu,
                success: function(e) {
                    $("#desktopLanguageMenu").html(e), $("#mobileLanguageMenu").html(e), $(".language-menu-inner").html(e)
                }
            }), n())
        }
        var t = {
                isLogin: !1,
                activeLink: null,
                urls: {},
                translations: {}
            },
            n = function() {
                $.ajax({
                    url: t.urls.getCurrenciesMenu,
                    success: function(e) {
                        $("#desktopCurrencyMenu").html(e), $("#mobileCurrencyMenu").html(e), CurrencySelect.init(t)
                    }
                }), $.ajax({
                    url: t.urls.getProfileMenu,
                    success: function(e) {
                        $("#desktopDropdownMenu").html(e), $("#desktopDropdownMenuText").html(i()), $("#desktopDropdownMenu").find("a.dropdown-item.active").removeClass("active"), $("#desktopDropdownMenu").find('a[href="' + t.activeLink + '"]').addClass("active"), $("#mobileDropdownMenu").html(e), $("#mobileDropdownMenuText").html(i()), $("#mobileDropdownMenu").find("a.dropdown-item.active").closest("li").removeClass("active"), $("#mobileDropdownMenu").find('a[href="' + t.activeLink + '"]').closest("li").addClass("active")
                    }
                })
            },
            i = function() {
                return t.isLogin ? t.translations.MY_ACCOUNT : t.translations.LOGIN
            };
        return {
            init: e,
            refresh: e
        }
    }(),
    TakePhotoUpload = function() {
        var e = {
            uploaderVersion: 1
        };
        hasGetUserMedia = function() {
            return !(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia)
        }, checkBrowserSupport = function() {
            hasGetUserMedia() && $(".takePhotoGroup").removeClass("d-none")
        }, $("#hiddenTakePhoto").change(function(e) {
            ChunkedFileUpload.handle("#orderFileUploadHiddenInput", e.target.files)
        }), handleTakePhotoButton = function() {
            $(".takePhotoButton").click(function() {
                $("#hiddenTakePhoto").click()
            })
        };
        var t = function(t) {
            $.extend(e, t), checkBrowserSupport(), handleTakePhotoButton()
        };
        return {
            init: t
        }
    }(),
    CustomerInfo = function() {
        var e = {
                isContent: !1,
                isMobile: !1,
                showCustomerInfo: !1,
                translations: []
            },
            t = function(t) {
                $.extend(e, t), n()
            },
            n = function() {
                !0 === e.showCustomerInfo && (FileUploadModal.close(!0), $("body").addClass("customerInfoBody"), $("#customerInfoModal").modal({
                    backdrop: "static",
                    keyboard: !1,
                    show: !0
                }), $("#customerForm").on("submit", function(t) {
                    t.preventDefault();
                    var n = $(this);
                    $(n).find("[type=submit]").attr("disabled", !0);
                    var i = n.attr("action");
                    $.ajax({
                        type: "POST",
                        url: i,
                        data: n.serialize(),
                        success: function(t) {
                            if (t.success) {
                                if (window.history.pushState("", "", t.redirectUrl), Analytics.sendPageViewEvent("customerForm"), "undefined" != typeof LiveChatService.updateLiveChatUser) {
                                    var i = {
                                        Email: n.find('input[name="email"]').val(),
                                        Name: n.find('input[name="fullName"]').val()
                                    };
                                    LiveChatService.updateLiveChatUser(i)
                                }
                                if (!e.isContent) {
                                    var o = e.isMobile;
                                    0 !== $("#interpretLanguageId").val().length && "" !== $("#interpretLanguageId").val() || (o = !1)
                                }
                                r(o)
                            } else $("#customerInfoModal #messages").show(), $("#customerInfoModal").find("[type=submit]").attr("disabled", !1)
                        }
                    })
                }), $("#kayitFormLogin").on("submit", function(t) {
                    var n = $(this);
                    if (!1 === n.valid()) return !1;
                    n.find("[type=submit]").attr("disabled", !0);
                    var i = n.serializeArray().reduce(function(e, t) {
                        return e[t.name] = t.value, e
                    }, {});
                    return $.ajax({
                        url: n.attr("action"),
                        type: "post",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(i),
                        dataType: "json",
                        success: function(t) {
                            if ("undefined" != typeof t.success && t.success) {
                                if ("undefined" != typeof LiveChatService.updateLiveChatUser) {
                                    var i = {
                                        Email: t.email,
                                        Name: t.fullName
                                    };
                                    LiveChatService.updateLiveChatUser(i)
                                }
                                if (!e.isContent) {
                                    var o = e.isMobile;
                                    0 !== $("#interpretLanguageId").val().length && "" !== $("#interpretLanguageId").val() || (o = !1)
                                }
                                r(o), Menu.refresh()
                            } else $("#customerInfoModal #messages").show(), n.find("[type=submit]").attr("disabled", !1)
                        },
                        error: function(e) {
                            $("#customerInfoModal #messages").show(), n.find("[type=submit]").attr("disabled", !1)
                        }
                    }), !1
                }), $("#buttonForgotPassword").click(function() {
                    $("#customerInfoModalForgotPasswordForm #email").val($("#ePostaLogin").val()), $("#customerInfoModalLoginForm").hide(), $("#customerInfoModalForgotPasswordForm").show()
                }), $("#buttonLogin").click(function() {
                    $("#ePostaLogin").val($("#customerInfoModalForgotPasswordForm #email").val()), $("#customerInfoModalForgotPasswordForm").hide(), $("#customerInfoModalLoginForm").show()
                }), $("#customerInfoModalForgotPasswordForm form").on("submit", function(t) {
                    var n = $(this);
                    return !1 !== n.valid() && (n.find("[type=submit]").attr("disabled", !0), $("#customerInfoModalForgotPasswordFormAlert").hide(), $.ajax({
                        url: n.attr("action"),
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify({
                            email: $("#customerInfoModalForgotPasswordForm #email").val()
                        }),
                        dataType: "json",
                        success: function(t) {
                            "undefined" != typeof t.success && t.success ? (n.find("[type=submit]").attr("disabled", !1), $("#customerInfoModalLoginFormSuccessAlert p").html(e.translations.TEMPORARY_PASSWORD_HAS_BEEN_SENT), $("#customerInfoModalLoginFormSuccessAlert").show(), $("#customerInfoModal #messages").hide(), $("#sifreLogin").val(""), $("#buttonLogin").trigger("click")) : (n.find("[type=submit]").attr("disabled", !1), $("#customerInfoModalForgotPasswordFormAlert p").html(e.translations.EMAIL_NOT_FOUND), $("#customerInfoModalForgotPasswordFormAlert").show())
                        },
                        error: function(t) {
                            n.find("[type=submit]").attr("disabled", !1), $("#customerInfoModalForgotPasswordFormAlert p").html(e.translations.AN_ERROR_OCCURRED), $("#customerInfoModalForgotPasswordFormAlert").show()
                        }
                    }), !1)
                }))
            },
            i = function(t) {
                $("#kayitFormLogin").find("[name=preLeadKey]").val(t), e.showCustomerInfo = !0, n()
            },
            r = function(t) {
                e.showCustomerInfo = !1, t && ($("#customerInfoModal").off("hidden.bs.modal"), $("#customerInfoModal").on("hidden.bs.modal", function() {
                    $([document.documentElement, document.body]).animate({
                        scrollTop: $("#orderBox").offset().top - $(window).height() / 4
                    }, 800)
                })), $("#customerInfoModal").modal("hide"), $("body").removeClass("customerInfoBody"), e.isContent === !1 ? Order.recalculate() : ContentOrder.recalculate()
            },
            o = function(e) {
                var t = e.redirectUrl,
                    n = e.redirectByJs,
                    i = e.preLeadKey,
                    r = e.previousPageViewEventPagePath;
                return null !== t && "undefined" != typeof t && (window.location.pathname !== t && (null !== r && Analytics.sendPageViewEvent("checkCustomerModal-1", r), !0 === n && window.history.pushState && (window.history.pushState("", "", t), Analytics.sendPageViewEvent("checkCustomerModal-2"))), null !== i && "undefined" != typeof i) && (CustomerInfo.openCustomerInfoModal(i), !0)
            };
        return {
            init: t,
            openCustomerInfoModal: i,
            closeCustomerInfoModal: r,
            checkCustomerModal: o
        }
    }(),
    Summary = function() {
        var e = {
                HUGE: 1,
                BIG: 2,
                MEDIUM: 3,
                SMALL: 4,
                EXTRA_SMALL: 5
            },
            t = {
                mainFormId: null,
                ajaxCallback: null,
                voucherLink: null,
                summaryElementPosition: null,
                isSwornTranslation: !1,
                pageSize: null,
                adjustButtonData: null,
                copyContinueButtonIsShown: !1,
                pageObject: null,
                urls: {}
            },
            n = function() {
                $("#orderBox .onayla button").off("click"), $("#orderBox .onayla button").on("click", function(e) {
                    return e.preventDefault(), $(this).hasClass("tct-target-language") ? $("#interpretLanguageId").select2("open") : $(this).hasClass("tct-source-langauge") ? $("#fileLanguageId").select2("open") : $(this).hasClass("tct-file-count") ? $("#fileUpload").trigger("click") : $(this).hasClass("tct-content-langauge") ? $("#contentLanguageId").select2("open") : $(this).hasClass("tct-content-details") && $("html").animate({
                        scrollTop: $(".content-details").closest("div.stepContent").offset().top - 150
                    }, "slow"), !0 === t.isSwornTranslation ? void $("#swornTranslationModal").modal() : void($(this).is(":not(.disabled)") && t.mainFormId && $("#" + t.mainFormId).valid() && $("#" + t.mainFormId).submit())
                })
            },
            i = function(i) {
                t = i, document.addEventListener("summary.pageSize.changed", function(t) {
                    if (t.detail.oldPageSize !== t.detail.newPageSize)
                        if (t.detail.newPageSize === e.EXTRA_SMALL) {
                            var n = $(".onayla").parent().find(".tooltip").width();
                            $(".onayla").parent().find(".tooltip").css({
                                left: "50%",
                                transform: "translateX(-" + Math.round(n / 2) + "px)"
                            })
                        } else $(".onayla").tooltip("recalculatePosition"), $(".continue-button-wrapper > div").length > 0 && $(".continue-button-wrapper > div").tooltip("recalculatePosition")
                }), u(!1), h(), m(), a(), o(), $("#swornTranslationModal button[data-option]").on("click", function() {
                    var e = $(this).data("option");
                    $("#swornTranslationModal").find(".confirm-message").addClass("hidden"), $("#swornTranslationModal").find(".option-" + e + "-message").removeClass("hidden"), $("#swornTranslationModal").find("button[data-option]").addClass("hidden"), "yes" === e ? $("#swornTranslationModal").find(".close-button").removeClass("hidden") : "no" === e && $("#swornTranslationModal").find(".continue-button").removeClass("hidden")
                }), $("#swornTranslationModal button.continue-button").on("click", function() {
                    $(this).is(":not(:disabled)") && t.mainFormId && $("#" + t.mainFormId).valid() && $("#" + t.mainFormId).submit()
                }), $("#swornTranslationModal").on("hidden.bs.modal", function(e) {
                    $("#swornTranslationModal").find(".confirm-message").removeClass("hidden"), $("#swornTranslationModal").find(".option-yes-message").addClass("hidden"), $("#swornTranslationModal").find(".option-no-message").addClass("hidden"), $("#swornTranslationModal").find("button[data-option]").removeClass("hidden"), $("#swornTranslationModal").find(".continue-button").addClass("hidden"), $("#swornTranslationModal").find(".close-button").addClass("hidden")
                }), $(".orderHeader").click(function() {
                    $(this).parent().find(".workList").slideToggle(), $(this).find(".glyphicon").toggleClass("rotated")
                }), $("#orderBox .help").tooltip({
                    container: "body"
                }), $('.currency-list-wrapper .select-list select[name="currency"]').on("change", function() {
                    var e = $(this).val(),
                        n = $(this);
                    n.prop("disabled", !0), $.post(t.urls.setCurrency, {
                        currencyCode: e
                    }, function(e) {
                        var i = $.parseJSON(e);
                        i.success === !0 && null !== t.pageObject && "undefined" != typeof t.pageObject && "function" == typeof t.pageObject.recalculate && t.pageObject.recalculate(), n.prop("disabled", !1), n.closest(".currency-list-wrapper").addClass("displayNone")
                    })
                }), n()
            },
            r = function(e) {
                t.isSwornTranslation = e
            },
            o = function() {
                $("#telNo").mask("000 000 00 00"), $("p.turkcellindirimi").click(function() {
                    $("#turkcellModal").modal()
                }), $("#turkcellModal .btn").click(function(e) {
                    if (e.preventDefault(), $("#turkcellModal form").valid()) {
                        Summary.displayTotalsProgress();
                        var n = $("input[name=actualAmount]").length > 0 ? $("input[name=actualAmount]").val() : 0,
                            i = $("input[name=proposalId]").length > 0 ? $("input[name=proposalId]").val() : 0;
                        $.post(t.voucherLink, {
                            campaignType: t.turkcellIstekazanCampaignType,
                            phone: $("#turkcellModal #telNo").val(),
                            pin: $("#turkcellModal #isteKazan").val(),
                            actualAmount: n,
                            proposalId: i
                        }).done(function(e) {
                            var n = $.parseJSON(e);
                            n.success ? ($("#turkcellModalError").hide(), $("#turkcellModal").modal("hide"), t.ajaxCallback && t.ajaxCallback(n)) : $("#turkcellModalError").show(), Summary.hideTotalsProgress()
                        })
                    }
                })
            },
            a = function() {
                $("#orderBox .ptindirimi").click(function() {
                    $("#ptModal").modal()
                }), $("#ptModal .btn").click(function(e) {
                    if (e.preventDefault(), $("#ptModal form").valid()) {
                        Summary.displayTotalsProgress();
                        var n = $("input[name=actualAmount]").length > 0 ? $("input[name=actualAmount]").val() : 0,
                            i = $("input[name=proposalId]").length > 0 ? $("input[name=proposalId]").val() : 0;
                        $.post(t.voucherLink, {
                            voucherCode: $("#ptModal #kuponKodu").val(),
                            transactionTypeId: "",
                            actualAmount: n,
                            proposalId: i
                        }).done(function(e) {
                            var n = $.parseJSON(e);
                            n.success && ($("#ptModal").modal("hide"), t.ajaxCallback && t.ajaxCallback(n)), Summary.hideTotalsProgress()
                        })
                    }
                })
            },
            s = function() {
                $("#orderWr .loader").css("width", $("#orderWr .loader").parent().width()), $("#orderWr .loader").show(), $(".continue-button-wrapper").length > 0 && $(".continue-button-wrapper .loader").show()
            },
            l = function() {
                $("#orderWr .loader").css("width", $("#orderWr .loader").parents("#orderWr").find(".orderHeader").outerWidth), $("#orderWr .loader").hide(), $(".continue-button-wrapper").length > 0 && $(".continue-button-wrapper .loader").hide()
            },
            c = function(e, i, r) {
                "undefined" != typeof i && null !== i || (i = ""), "undefined" != typeof r && null !== r || (r = ""), i ? ($(".onayla").attr("title", i).tooltip({
                    trigger: "manual"
                }).tooltip("fixTitle").tooltip("show").data("bs.tooltip").tip().removeClass("tct-target-language tct-file-count tct-high-budget-order tct-uncountable-document tct-source-langauge tct-content-langauge").addClass(r), $(".onayla button").removeClass("tooltip-click-tracker-button tct-target-language tct-file-count tct-high-budget-order tct-uncountable-document tct-source-langauge tct-content-langauge").addClass(r.replace("tooltip-click-tracker", "tooltip-click-tracker-button")), $(".continue-button-wrapper").length > 0 && ($(".continue-button-wrapper > div").eq(0).attr("title", i).tooltip({
                    trigger: "manual"
                }).tooltip("fixTitle").tooltip("show").data("bs.tooltip").tip().removeClass("tct-target-language tct-file-count tct-high-budget-order tct-uncountable-document tct-source-langauge tct-content-langauge").addClass(r), $(".continue-button-wrapper > div button").removeClass("tooltip-click-tracker-button tct-target-language tct-file-count tct-high-budget-order tct-uncountable-document tct-source-langauge tct-content-langauge").addClass(r.replace("tooltip-click-tracker", "tooltip-click-tracker-button")))) : ($(".onayla button").removeClass("tooltip-click-tracker-button tct-target-language tct-file-count tct-high-budget-order tct-uncountable-document tct-source-langauge tct-content-langauge"), $(".onayla").tooltip("destroy"), $(".continue-button-wrapper").length > 0 && ($(".continue-button-wrapper > div button").removeClass("tooltip-click-tracker-button tct-target-language tct-file-count tct-high-budget-order tct-uncountable-document tct-source-langauge tct-content-langauge"), $(".continue-button-wrapper > div").eq(0).tooltip("destroy"))), e ? ($(".onayla button").removeClass("disabled"), $(".continue-button-wrapper").length > 0 && $(".continue-button-wrapper > div button").removeClass("disabled")) : ($(".onayla button").addClass("disabled"), $(".continue-button-wrapper").length > 0 && $(".continue-button-wrapper > div button").addClass("disabled")), n(), t.adjustButtonData = {
                    enable: e,
                    title: i,
                    customClass: r
                }
            },
            d = function() {
                $(".continue-button-wrapper").remove();
                var e = $(".onayla button"),
                    n = e.clone();
                $(".stepWr").append('<div class="continue-button-wrapper"><div></div><div class="loader"></div></div>'),
                    $(".stepWr .continue-button-wrapper > div").eq(0).html(n), $(".stepWr .continue-button-wrapper button").off("click"), $(".stepWr .continue-button-wrapper button").on("click", function() {
                        e.trigger("click")
                    }), t.copyContinueButtonIsShown = !0
            },
            u = function() {
                var n = $(window).width(),
                    i = {
                        width: n,
                        oldPageSize: t.pageSize
                    },
                    r = !1;
                if (n >= 1200 ? t.pageSize !== e.HUGE && (t.pageSize = e.HUGE, r = !0) : n >= 1024 ? t.pageSize !== e.BIG && (t.pageSize = e.BIG, r = !0) : n >= 992 ? t.pageSize !== e.MEDIUM && (t.pageSize = e.MEDIUM, r = !0) : n >= 768 ? t.pageSize !== e.SMALL && (t.pageSize = e.SMALL, r = !0) : t.pageSize !== e.EXTRA_SMALL && (t.pageSize = e.EXTRA_SMALL, r = !0), r) {
                    i.newPageSize = t.pageSize;
                    var o = new CustomEvent("summary.pageSize.changed", {
                        detail: i
                    });
                    document.dispatchEvent(o)
                }
            },
            p = function() {
                var e = $("#orderBox .kalemler");
                e.find("p").filter(function() {
                    return "none" == $(this).css("display")
                }).length === e.find("p").length ? e.hide() : e.show()
            },
            f = function() {
                var e = $("#autoConversionBox");
                e.hasClass("auto-conversion-box-mobile") && ($("#steps .stepWr").prepend(e.clone()), e.remove(), $(".orderHeader").off("click"), $(".orderHeader").on("click", function() {
                    $(this).parent().find(".workList").slideToggle(), $(this).find(".glyphicon").toggleClass("rotated")
                }))
            },
            h = function() {
                $(window).on("resize", function() {
                    u(), m(!0)
                })
            },
            m = function(e) {
                $(window).width() >= 992 ? t.copyContinueButtonIsShown || (d(), t.adjustButtonData && e && c(t.adjustButtonData.enable, t.adjustButtonData.title, t.adjustButtonData.customClass)) : ($(".continue-button-wrapper").remove(), t.copyContinueButtonIsShown = !1)
            },
            g = function(e) {
                var n = 20,
                    i = 49,
                    r = $(".navbar").height() + parseInt($(".navbar").css("padding-top")) + parseInt($(".navbar").css("padding-bottom")) + parseInt($("#orderWr").parent().css("margin-top")) + i;
                "undefined" != typeof e && "" !== e && null !== e || (e = 7 + i, n = 0), $.fn.adjustScroll = function() {
                    var i = this,
                        o = t.summaryElementPosition;
                    window.matchMedia("(min-width: 992px)").matches ? $(window).scrollTop() > o + r ? i.css({
                        position: "absolute",
                        top: o
                    }) : $(window).scrollTop() > r ? i.css({
                        position: "fixed",
                        top: n,
                        width: i.parent().width()
                    }) : i.css({
                        position: "absolute",
                        top: e,
                        width: i.parent().width()
                    }) : i.removeAttr("style")
                }, $.fn.followTo = function() {
                    var e = this;
                    $(window).scroll(function(t) {
                        e.adjustScroll()
                    }), e.adjustScroll()
                }, $("#copyRight").length > 0 && (v(), $("#orderWr").followTo())
            },
            v = function() {
                var e = $("#copyRight");
                e.length > 0 && (t.summaryElementPosition = e.offset().top - ($("#orderWr").height() + $(".navbar").height() + 48))
            },
            y = function() {
                b(), w()
            },
            b = function() {
                var e = $('select[name="timezone"] option:selected').text(),
                    t = /\((.*?)\)/g,
                    n = t.exec(e);
                $(".timezone-selected-offset").text(n[1])
            },
            w = function() {
                $('.timezone-list-wrapper .select-list select[name="timezone"]').on("change", function(e) {
                    var n = $(this);
                    n.prop("disabled", !0), $.post(t.urls.changeTimezone, {
                        timezoneId: $(this).val(),
                        location: "summary"
                    }, function(e) {
                        e.success === !0 && (b(), Order.recalculate()), n.prop("disabled", !1), n.closest(".timezone-list-wrapper").addClass("displayNone")
                    })
                })
            };
        return {
            init: i,
            initTimezoneOffset: y,
            hideTotalsProgress: l,
            displayTotalsProgress: s,
            adjustButton: c,
            adjustVisibility: p,
            handleScroller: g,
            loadVoucherModalHandler: a,
            loadActiveCampaignModalHandler: o,
            handleMobileDevice: f,
            setSummaryElementPosition: v,
            setSwornTranslation: r,
            continueButtonHandle: m
        }
    }(),
    FileUpload = function() {
        var e = {
                files: [],
                serviceFiles: [],
                errorFiles: [],
                errorDeviceFiles: [],
                fileTempIds: [],
                uploadedFiles: [],
                finishedFiles: [],
                uploadFileUrl: "",
                countWordsFile: ""
            },
            t = function(t) {
                $("#textUpload").prop("disabled", !0), n();
                var i = $(".file-list").find(".file-row").length,
                    r = String((new Date).getTime()) + Math.random() + "_" + i;
                o(Number(i), r, e.translations.FREETEXT_FILE_PREFIX + "...");
                var a = new FormData;
                a.append("translationText", t), a.append("fileTempId", r), g(t, r), $.ajax({
                    url: e.uploadFileUrl,
                    data: a,
                    cache: !1,
                    contentType: !1,
                    processData: !1,
                    type: "POST",
                    xhr: function() {
                        return s(r)
                    },
                    success: function(e) {
                        null !== e.item && (Order.textUploadFinished(e.item), d(e.item.id, e.item.data.FileUri))
                    }
                })
            },
            n = function() {
                Summary.displayTotalsProgress(), $("#fileUpload").attr("disabled", "disabled"), $("#orderBox .onayla button").addClass("disabled"), $(".file-list").addClass("fileSelected"), $(".file-row .file-remove").hide()
            },
            i = function() {
                $("#fileUpload").removeAttr("disabled"), $("#orderBox .onayla button").removeClass("disabled"), $(".file-row .file-remove").show(), $("#metinGiris").val(""), $("label[for=metinGiris]").text(0)
            },
            r = function(t, n, r, o) {
                i(), null !== t && (null !== o && Analytics.sendPageViewEvent("finishUploadingFiles-1", o), !0 === n && window.history.pushState && (window.history.pushState("", "", t), Analytics.sendPageViewEvent("finishUploadingFiles-2")), null !== r && CustomerInfo.openCustomerInfoModal(r)), Order.recalculate(), Order.loadRemoveFileHandler(), $("#hiddenUpload").val(""), e.fileTempIds = [], e.uploadedFiles = [], e.finishedFiles = [], e.files = [], e.serviceFiles = [], e.errorFiles = []
            },
            o = function(t, n, i) {
                var r = "<span>" + i + "</span>";
                $(".file-list").append('<div class="file-row" data-count="0" data-index="' + t + '" data-id="' + n + '" data-file-original-name="' + i + '" data-waiting="true">\n                                                    <div class="file-info uploadingFile">\n                                                        ' + r + '                                                                                                            </div>\n<div class="file-word-count">(' + e.translations.FILE_WORD_COUNT.replace("{word_count}", 0) + ')</div>                                                        <div class="file-progress">\n                                                    <div class="progress-bar-wrapper"><div class="progress-bar">0%</div></div>\n                                                    <div class="progress-bar-text"><span>' + e.translations.LOADING + '</span></div>\n                                                        </div>\n                                                    <span class="file-remove" title="' + e.translations.REMOVE_FILE + '" style="display: none;"></span>\n                                                </div>')
            },
            a = function() {
                var t = e.files.length + e.serviceFiles.length - e.errorFiles.length;
                return e.finishedFiles.length === t
            },
            s = function(t) {
                var n = $('.file-list .file-row[data-id="' + t + '"] .progress-bar-wrapper .progress-bar'),
                    i = n.parent().parent().find("progress-bar-text span");
                i.text(e.translations.LOADING);
                var r = new window.XMLHttpRequest;
                return r.upload.addEventListener("progress", function(e) {
                    if (e.lengthComputable) {
                        var t = e.loaded / e.total;
                        n.css("width", Math.round(100 * t) + "%"), n.text(Math.round(100 * t) + "%")
                    }
                }, !1), r
            },
            l = function(e) {
                var t = $('.file-list .file-row[data-id="' + e + '"] .progress-bar-wrapper .progress-bar'),
                    n = new window.XMLHttpRequest;
                return n.upload.addEventListener("progress", function(n) {
                    if (n.lengthComputable) {
                        var i = n.loaded / n.total;
                        t.css("width", Math.round(100 * i) + "%"), FileUploadModal.handleWordCountProgress(e, 100 * i), t.text(Math.round(100 * i) + "%")
                    }
                }, !1), n
            },
            c = function(t, n, i, o, s, l, c) {
                var d = $('.file-list .file-row[data-id="' + t + '"] .progress-bar-wrapper .progress-bar');
                d.parent().parent().find(".progress-bar-text").remove(), d.parent().remove();
                var u = $('.file-list .file-row[data-id="' + t + '"]');
                u.find(".file-info.fileSelected.uploadingFile").removeClass("uploadingFile"), $('.file-list .file-row[data-id="' + t + '"] .file-info').html(n), $('.file-list .file-row[data-id="' + t + '"] .file-word-count').html(i), u.data("waiting", !1), u.attr("data-waiting", !1), e.finishedFiles.push(t), a() && r(o, s, l, c), $("#textUpload").prop("disabled", !1), FileUploadModal.finishedFileWordCount(t, i)
            },
            d = function(t, n, i) {
                var r = $('.file-list .file-row[data-id="' + t + '"] .progress-bar-wrapper .progress-bar'),
                    o = r.parent().parent().find(".progress-bar-text span");
                r.css("width", 0), r.text("0%"), o.text(e.translations.COUNTING_WORDS), FileUploadModal.startWordCountUploadedFile(t);
                var a = new FormData;
                a.append("FileUri", n), a.append("EncodedUri", encodeURI(window.location.pathname)), $.ajax({
                    url: e.countWordsFile,
                    data: a,
                    cache: !1,
                    contentType: !1,
                    processData: !1,
                    type: "POST",
                    xhr: function() {
                        return l(t)
                    },
                    success: function(n) {
                        if (null !== n.item) {
                            var r = "<span>" + n.item.OriginalFileName + "</span>",
                                o = "(" + e.translations.FILE_WORD_COUNT.replace("{word_count}", n.item.WordCount) + ")";
                            c(t, r, o, n.redirectUrl, n.redirectByJs, n.preLeadKey, n.previousPageViewEventPagePath), "function" == typeof i && i(n), FileUploadModal.increaseUploadedFileCount()
                        }
                    }
                })
            },
            u = function(t) {
                e.errorFiles.push(t)
            },
            p = function(t) {
                e.errorDeviceFiles.push(t), e.files.length === e.uploadedFiles.length + e.errorDeviceFiles.length && w()
            },
            f = function() {
                e.errorDeviceFiles = []
            },
            h = function(t) {
                e.serviceFiles.push(t)
            },
            m = function(t) {
                var n = e.serviceFiles.indexOf(t);
                e.serviceFiles.splice(n, 1)
            },
            g = function(t, n) {
                e.files.push(t), e.fileTempIds.push(n)
            },
            v = function(t) {
                var n = e.files.findIndex(function(e) {
                    return e.fileTempId === t
                });
                e.files.splice(n, 1)
            },
            y = function(t, n) {
                e.uploadedFiles.push({
                    fileTempId: t,
                    fileUri: n
                }), e.files.length === e.uploadedFiles.length + e.errorDeviceFiles.length && w()
            },
            b = function() {
                return $(".file-list .file-row[data-waiting=false]").length
            },
            w = function() {
                if (0 !== e.uploadedFiles.length) {
                    var t = e.uploadedFiles[0];
                    d(t.fileTempId, t.fileUri, function() {
                        e.uploadedFiles.shift(), FileUploadModal.deviceFilesShift(t.fileTempId), w()
                    })
                }
            },
            C = function(t) {
                $.extend(e, t)
            };
        return {
            handleUploadText: t,
            startUploadingFiles: n,
            addNewFileItemHtml: o,
            addSelectedFile: g,
            removeSelectedFile: v,
            addSelectedFileFromService: h,
            addErrorFile: u,
            addErrorDeviceFile: p,
            clearErrorDeviceFile: f,
            removeSelectedFileFromService: m,
            resetFileUploadButton: i,
            getUploadedFileCount: b,
            finishUploadingFiles: r,
            addFileToCountWords: y,
            countFileWords: d,
            init: C
        }
    }(),
    ChunkedFileUpload = function() {
        var e = {
                chunkKeys: {},
                retries: {},
                abortChunkSend: {},
                translations: {},
                lastNoInternetConnectionTimestamp: 0,
                uploadErrorModalSelector: "#uploadErrorModal",
                uploadErrorModalErrorMessageSelector: "#uploadErrorModalErrorMessage"
            },
            t = function(t) {
                var n = window.Blob && (Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice);
                $(t.selector).fileupload({
                    maxChunkSize: n ? 2e5 : 0,
                    sequentialUploads: !0,
                    maxRetries: 100,
                    retryTimeout: 1e3,
                    add: function(e, n) {
                        t.add(n)
                    },
                    progress: function(n, i) {
                        $(e.uploadErrorModalSelector + "[data-errorType=noInternet]").modal("hide"), t.progress(i)
                    },
                    done: function(e, n) {
                        t.done(n)
                    },
                    chunksend: function(t, n) {
                        if ("undefined" != typeof e.abortChunkSend[n.fileTempId]) return !1
                    },
                    chunkdone: function(t, n) {
                        var r = JSON.parse(n.result);
                        !1 === r.success && i(r.errorMessage, n.fileTempId, n.files[0]), "undefined" != typeof r.chunkKey && (e.chunkKeys[n.fileTempId] = r.chunkKey)
                    },
                    fail: function(t, n) {
                        if ("undefined" == typeof e.abortChunkSend[n.fileTempId]) {
                            e.lastNoInternetConnectionTimestamp + 30 < Math.floor(Date.now() / 1e3) && (e.lastNoInternetConnectionTimestamp = Math.floor(Date.now() / 1e3), FileUploadModal.handleUnableUploadedFile("device", 0, -1, e.translations.NO_INTERNET_CONNECTION_WHILE_FILE_UPLOADING)), "undefined" == typeof e.retries[n.fileTempId] && (e.retries[n.fileTempId] = 0);
                            var r = $(this).data("resume-url"),
                                o = $(this).data("blueimp-fileupload") || $(this).data("fileupload"),
                                a = e.retries[n.fileTempId],
                                s = function() {
                                    $.getJSON(r, {
                                        chunkKey: e.chunkKeys[n.fileTempId],
                                        t: +(new Date).getTime() + Math.floor(1e3 * Math.random())
                                    }).done(function(e) {
                                        n.uploadedBytes = e.success && e.data.size, n.data = null, n.submit()
                                    }).fail(function() {
                                        o._trigger("fail", t, n)
                                    })
                                };
                            if ("abort" !== n.errorThrown && n.uploadedBytes < n.files[0].size && a < o.options.maxRetries) return a += 1, e.retries[n.fileTempId] = a, void window.setTimeout(s, a * o.options.retryTimeout);
                            delete e.retries[n.fileTempId], i(e.translations.NO_INTERNET_CONNECTION_WHILE_FILE_UPLOADING, n.fileTempId, n.files[0])
                        }
                    }
                })
            },
            n = function(t, n) {
                "undefined" == typeof n && (n = "generic"), !1 === $(e.uploadErrorModalSelector).hasClass("in") && ($(e.uploadErrorModalErrorMessageSelector).html(t), $(e.uploadErrorModalSelector).attr("data-errorType", n), $(e.uploadErrorModalSelector).modal("show"))
            },
            i = function(t, n, i) {
                FileUpload.addErrorDeviceFile(n), FileUploadModal.handleUnableUploadedFile("device", 0, n, t), FileUploadModal.deviceFilesShift(n), e.abortChunkSend[n] = !0
            },
            r = function(e, t) {
                $(e).fileupload("add", {
                    files: t
                })
            };
        return {
            init: t,
            handle: r,
            showErrorModal: n
        }
    }(),
    OrderComplete = function() {
        var e = {
                updateOrderDescription: ""
            },
            t = function() {
                var t = $(".siteBG.complete .notes"),
                    n = $(".siteBG.complete .notes form#kayitForm"),
                    i = $(".siteBG.complete .notes form#kayitForm textarea");
                n.find(".btn.cancel").click(function(e) {
                    i.val(i.data("original"))
                }), n.submit(function(r) {
                    r.preventDefault(), $.post(e.updateOrderDescription, {
                        orderId: n.find("input[name=orderId]").val(),
                        translator_instructions: n.find("textarea[name=translator_instructions]").val()
                    }).done(function(e) {
                        var n = $.parseJSON(e);
                        n.success ? i.val(n.translator_instructions).data("original", n.translator_instructions) : i.val(i.data("original")), t.modal("hide")
                    })
                })
            },
            n = function(n) {
                $.extend(e, n), t()
            };
        return {
            init: n
        }
    }(),
    Order = function() {
        var e = {
                language: null,
                displayThanksModal: !1,
                translationServiceTypeId: null,
                apostilleTooltipMessage: null,
                reloadInterval: 10,
                maxLoadRetryCount: 12,
                autoConversionTimer: null,
                professionalInterpreterCategoryTypeId: null,
                standartDurationTypeId: null,
                fastDurationTypeId: null,
                fastDurationEstimatedDate: null,
                userDefinedurationTypeId: null,
                tempDurationTypeId: null,
                loadCustomerInfo: !1,
                serviceTypes: {},
                orderLevels: {},
                interpretionQualityTypes: {},
                targetLanguages: [],
                interpretionDurationCustomPercentage: 0,
                isMobile: !1,
                translations: [],
                uploadFileUrl: "",
                countWordsFile: "",
                removeFile: "",
                updateOrder: "",
                orderUrl: "",
                startHighBudgetOrder: "",
                loadCatProject: "",
                triggerManualOrder: "",
                getCustomDeliveryDates: "",
                isSwornTranslation: !1,
                uploadedFiles: [],
                lockedRemoveReferenceFile: !1,
                uploaderVersion: 1,
                urls: {}
            },
            t = null,
            n = 0,
            i = function() {
                var e = "";
                return $("#interpretLanguageId option:selected").each(function() {
                    e.length > 0 && (e += ", "), e += $(this).text()
                }), e
            },
            r = function(e) {
                var t = [];
                return "undefined" != typeof e && e || (e = "#interpretLanguageId"), $(e + " option:selected").each(function() {
                    t.push($(this).val())
                }), t
            },
            o = function(e) {
                var t = $('.file-row[data-id="' + e.id + '"]');
                t.data("file-hash", e.data.FilesHash), t.attr("data-file-hash", e.data.FilesHash)
            },
            a = function(t, n) {
                "undefined" != typeof n && n || (n = "#interpretLanguageId");
                var i = parseInt($("input[name=serviceTypeId]").val());
                i === e.serviceTypes.translation ? ($(n).find("option").each(function(e) {
                    parseInt($(this).attr("value")) === parseInt(t) ? $(n).find("option").eq(e).prop("disabled", !0) : $(this).prop("disabled", !1)
                }), $(n).select2({
                    minimumResultsForSearch: 1,
                    width: null,
                    closeOnSelect: !1,
                    language: e.language
                }), Main.initMultiLanguageSelector($(n), {
                    autoSetToLanguage: !1
                }, function() {
                    $("#selectedLanguageId").val($(n).val().join(","))
                })) : i !== e.serviceTypes.paraphrasing && i !== e.serviceTypes.proofreading || (Main.initMultiLanguageSelector($(n), {
                    autoSetToLanguage: !1
                }, function() {
                    $("#selectedLanguageId").val(t)
                }), $("#interpretLanguageId").val(t)), $(n).select2({
                    minimumResultsForSearch: 1,
                    width: null,
                    closeOnSelect: !1,
                    language: e.language
                }).val($(n).val()).trigger("change")
            },
            s = function(t) {
                t.hide(), Summary.displayTotalsProgress();
                var n = t.closest("div.file-row").data("file-hash");
                $.post(e.removeFile, {
                    fileHash: n
                }).done(function(t) {
                    var n = $.parseJSON(t);
                    if (n.success) {
                        $(".file-list").html("");
                        var i = 0;
                        $.map(n.items, function(t, n) {
                            !1 === t.IsRemoved && $(".file-list").append('<div class="file-row" data-count="' + t.WordCount + '" data-index="' + i++ + '" data-file-hash="' + t.FilesHash + '" data-waiting="false"><div class="file-info"><span>' + t.OriginalFileName + '</span></div><div class="file-word-count">\n      (' + e.translations.FILE_WORD_COUNT.replace("{word_count}", t.WordCount) + ')\n    </div><div class="file-remove" title="' + e.translations.REMOVE_FILE + '"></div></div>')
                        }), 0 == i && $(".file-list").removeClass("fileSelected"), E(), l()
                    }
                    Summary.hideTotalsProgress()
                })
            },
            l = function(t) {
                0 !== $("#fileLanguageId").length && (Summary.displayTotalsProgress(), $.post(e.updateOrder, $("#newOrderForm").serialize()).done(function(n) {
                    var i = $.parseJSON(n);
                    i.success && i.liveChatData && U(i.liveChatData), !0 === e.loadCustomerInfo && (i.amountFormatted = $("#calculationText").val()), t && (i.displayPdfFlowInput = !1), d(i), Summary.hideTotalsProgress()
                }))
            },
            c = function() {
                dots < 3 ? ($("#orderBox .toplam").find("#dots").append("."), dots++) : ($("#orderBox .toplam").find("#dots").html(""), dots = 0);
                var t = $("#orderBox .toplam").find("#dots");
                t.length && $("#orderBox .toplam span").html(e.translations.CUSTOMER_INFO_CALCULATION_TEXT + t[0].outerHTML)
            },
            d = function(t) {
                !t.success && t.reload && ("undefined" != typeof t.emptyOrder && t.emptyOrder ? window.location.href = e.orderUrl : window.location.reload());
                var n = $("#orderBox .workList"),
                    o = $("#orderBox .kalemler"),
                    a = $("#orderBox .toplam"),
                    s = $("#orderBox .orderHeader"),
                    l = $("#orderBox .onayla button"),
                    d = $("#orderBox .ptindirimi"),
                    p = $("#orderBox .turkcellindirimi");
                if (l.text(l.data("defaulttext")), n.find(".wordCount").html(e.translations.TOTAL_WORD_COUNT.replace("{word_count}", "<strong>0</strong>")).show(), n.find(".trAutoTranslation").hide(), a.show().find("span").text(t.amountFormatted), !0 === e.loadCustomerInfo) {
                    a.find("span").append('<span id="dots" style="text-align: right"></span>');
                    setInterval(c, 600)
                }
                if (s.find("span.pull-right").text(""), n.find(".trDate").html("").hide(), n.find(".timezoneItem").hide(), o.find(".protrans").hide(), o.find(".turkcell").hide(), o.find(".extras").html("").hide(), e.isSwornTranslation = t.isSwornTranslation, Summary.setSwornTranslation(e.isSwornTranslation), $(".reference-files > span.selected-reference-files-loader").remove(), t.success) {
                    if ("undefined" != typeof t.displayVoucherInput && t.displayVoucherInput && d.show(), "undefined" != typeof t.displayActiveCampaign && t.displayActiveCampaign && p.show(), a.find("span").text(t.amountFormatted), r().length > 0 && t.wordCount > 0 && !t.hideAmount && s.find("span.pull-right").text(t.subtotalFormatted), t.priceDiscountFormatted && !t.hideAmount ? (o.find(".protrans span").text("-" + t.priceDiscountFormatted), o.find(".protrans").show()) : (o.find(".protrans span").text(""), o.find(".protrans").hide()), t.discountFormatted && !t.hideAmount ? (o.find(".turkcell span").text("-" + t.discountFormatted), o.find(".turkcell").show(), $("#ptOK").prop("checked", !t.campaignDiscountUsed), $("#turkcellOK").prop("checked", t.campaignDiscountUsed)) : (o.find(".turkcell span").text(""), o.find(".turkcell").hide(), $("#ptOK, #turkcellOK").prop("checked", !1)), o.find(".extras").html("").hide(), Object.keys(t.extraServices).length > 0 && !t.hideAmount) {
                        for (var f in t.extraServices) o.find(".extras").append('<p class="kargo">' + f + '<span class="pull-right">+' + t.extraServices[f] + "</span></p>").show();
                        o.find(".extras .kargo").show()
                    }
                    if (t.wordCount > 0 && n.find(".wordCount").html(e.translations.TOTAL_WORD_COUNT.replace("{word_count}", "<strong>" + t.wordCount + "</strong>")).show(), t.estimatedDateFormatted && !t.hideAmount) {
                        var h = e.translations.ESTIMATED_DUE_DATE + ": <strong>" + t.estimatedDateFormatted + "</strong>";
                        n.find(".trDate").html(h).show(), n.find(".timezoneItem").show()
                    }
                    t.hideAmount && (l.text(l.data("manualordertext")), a.hide()), $("#newOrderForm input[name=highBudget]").val(t.highBudgetOrder), $("#newOrderForm input[name=containsUncounted]").val(t.uncountableFilesExist), t.automaticTranslationRequested ? (n.find(".trAutoTranslation").show(), $('.stepContent[data-hideforauto="1"]').hide()) : $('.stepContent[data-hideforauto="1"]').show(), $(".stepContent:visible").each(function(e) {
                        $(this).find(".stepCount").html(e + 1)
                    }), t.automaticTranslationRequested ? $(".row.neworder").addClass("pdf-flow") : $(".row.neworder").removeClass("pdf-flow"), t.displayPdfFlowInput ? A() : t.automaticTranslationRequested ? $(".stepContent.serviceLevelStep").addClass("hidden") : ($(".stepContent.serviceLevelStep").removeClass("hidden"), $(".stepContent.serviceLevelStep").closest(".stepWr").find(".stepContent").each(function(e) {
                        var t = e + 1;
                        $(this).find(".stepCount").html(t)
                    }), $(".order-levels").removeClass("disabled")), "undefined" != typeof t.items && t.items.length > 0 && t.items.forEach(function(t, n) {
                        var i = $('.file-row[data-file-hash="' + t.FilesHash + '"] > .file-word-count');
                        if (i.length > 0) {
                            var r = "(" + e.translations.FILE_WORD_COUNT.replace("{word_count}", t.WordCount) + ")";
                            void 0 !== t.PageRange && null !== t.PageRange && "" !== t.PageRange && (r += " (" + e.translations.FILE_PAGE_RANGE.replace("{range}", t.PageRange) + ") "), i.text(r)
                        }
                    }), null !== t.orderReferenceFilesHtml && ($(".order-reference-files-wrapper").remove(), $(".reference-files").after(t.orderReferenceFilesHtml), $(".order-reference-files .order-reference-file-remove").off("click"), $(".order-reference-files .order-reference-file-remove").on("click", g))
                }
                if ($("a.need-it-sooner-button").off("click"), $("a.need-it-sooner-button").on("click", function() {
                        e.tempDurationTypeId = $('input[name="durationTypeId"]:checked').val(), $('input[name="durationTypeId"][value="' + e.fastDurationTypeId + '"]').closest("li").trigger("click")
                    }), t.success === !1) {
                    var m = $("#newOrderForm");
                    m.find('input[name="userDefinedDurationPercentage"]').val(0)
                }
                n.find(".trLanguages").html(e.translations.TRANSLATION_LANGUAGES + ": <strong>" + i() + "</strong>").show(), n.find(".trProf").html(e.translations.INTERPRETION_QUALITY + ": <strong>" + $(".uzmanlik input[type=radio]:checked").closest("label").text() + "</strong>").show();
                var v = "",
                    y = "",
                    b = "",
                    w = $(".siparisSinifi input[type=radio]:checked"),
                    x = $(".speed input[type=radio]:checked");
                Number(w.val()) !== Number(e.professionalInterpreterCategoryTypeId) && (v = w.closest("label").text().trim()), $("a.need-it-sooner-button").hide(), parseInt(t.interpretionDurationTypeId) === parseInt(e.standartDurationTypeId) ? (y = e.translations.INTERPRETION_TYPE_DURATION_STANDART, $("a.need-it-sooner-button").css("display", "block")) : parseInt(t.interpretionDurationTypeId) === parseInt(e.fastDurationTypeId) ? (y = e.translations.INTERPRETION_TYPE_DURATION_FAST, $("a.need-it-sooner-button").css("display", "block")) : parseInt(t.interpretionDurationTypeId) === parseInt(e.userDefinedurationTypeId) ? y = e.translations.INTERPRETION_TYPE_DURATION_USER_DEFINED : Number(x.val()) !== Number(e.standartDurationTypeId) && (y = x.closest("label").text().trim()), "" !== v && "" !== y ? b = v + ", " + y : "" === v && "" !== y ? b = y : "" !== v && "" === y && (b = v), "" !== b ? n.find(".trClass").html(b).show() : n.find(".trClass").hide(), e.fastDurationEstimatedDate = t.fastDurationEstimatedDate, e.interpretionDurationCustomPercentage = t.interpretionDurationCustomPercentage, 0 === parseFloat(t.interpretionDurationCustomPercentage) && ($('.fast-delivery-options input[name="fast_duration_type"][value="' + e.fastDurationTypeId + '"]').trigger("click"), $(".customer-delivery-date-options").hide());
                var T = $("h1.service-type span").text();
                s.find(".type").text(T), u(), Summary.adjustVisibility(), Summary.handleScroller(), M(t), C(), "undefined" != typeof t.redirectUrl && window.location.pathname !== t.redirectUrl && (window.history.pushState("", "", t.redirectUrl), Analytics.sendPageViewEvent("reloadAfterAjaxCall"))
            },
            u = function() {
                var t = r().length > 0 && FileUpload.getUploadedFileCount() > 0,
                    n = "true" === $("#newOrderForm input[name=highBudget]").val(),
                    i = "true" === $("#newOrderForm input[name=containsUncounted]").val(),
                    o = $("input[name=serviceTypeId]").val(),
                    a = "",
                    s = "";
                0 === FileUpload.getUploadedFileCount() ? (a = e.translations.ORDER_MATERIAL_ENTRY_REQUIRED, s = "tooltip-click-tracker tct-file-count") : r().length <= 0 && o == e.serviceTypes.translation ? (a = e.translations.TARGET_LANGUAGE_REQUIRED, s = "tooltip-click-tracker tct-target-language") : n ? (a = e.translations.MANUAL_ORDER_AMOUNT_CALCULATION_REQUIRED, s = "tooltip-click-tracker tct-high-budget-order") : i ? (a = e.translations.ORDER_CONTAINS_UNCOUNTABLE_DOCUMENT, s = "tooltip-click-tracker tct-uncountable-document") : $("#fileLanguageId").find("option:selected").length <= 0 && (a = e.translations.SOURCE_LANGUAGE_REQUIRED, s = "tooltip-click-tracker tct-source-langauge"), Summary.continueButtonHandle(), Summary.adjustButton(t, a, s), $(".tooltip-click-tracker").off("click"), $(".tooltip-click-tracker").on("click", function() {
                    $(this).hasClass("tct-target-language") ? $("#interpretLanguageId").select2("open") : $(this).hasClass("tct-source-langauge") ? $("#fileLanguageId").select2("open") : $(this).hasClass("tct-file-count") && $("#fileUpload").trigger("click")
                })
            },
            p = function(n) {
                var i = "true" == $("#newOrderForm input[name=highBudget]").val();
                i && (n.preventDefault(), D(e.translations.DOCUMENTS_BEING_ANALYZED_IN_CAT_TOOL, e.translations.DONT_WANT_TO_WAIT_FOR_QUOTE, function() {
                    location.href = e.triggerManualOrder + "?cancelled=1"
                }), Summary.displayTotalsProgress(), $.post(e.startHighBudgetOrder, {}).done(function(n) {
                    var i = $.parseJSON(n);
                    i.success ? t = setInterval(Order.reloadProject, 1e3 * e.reloadInterval) : location.href = e.triggerManualOrder
                }))
            },
            f = function() {
                if (e.displayThanksModal && $("#thanksModal").modal(), $(window).outerWidth() > 600) {
                    var t = 0;
                    $(".order-levels .order-level").each(function(e) {
                        $(this).find("ul").height() > t && (t = $(this).find("ul").height())
                    });
                    var n = 20;
                    $(".order-levels .order-level").each(function(e) {
                        $(this).find("ul").css("height", t + n)
                    })
                }
                $(".order-levels .order-level").on("click", function(t) {
                    t.preventDefault(), t.stopPropagation(), $(this).hasClass("selected") || ($(".order-levels .order-level.selected").find("a.btn").text(e.translations.INTERPRETION_SERVICE_LEVEL_SELECT), $(".order-levels .order-level.selected").removeClass("selected"), $(this).addClass("selected"), $(this).find("a.btn").text(e.translations.INTERPRETION_SERVICE_LEVEL_SELECTED), $('input[name="interpretionServiceLevelId"]').val($(this).data("interpretion-service-level")), l())
                }), $("#newOrderForm").submit(function(e) {
                    return 0 === r().length ? (e.preventDefault(), void u()) : (p(e), void Summary.displayTotalsProgress())
                }), $("#fileLanguageId").change(function() {
                    a($(this).val())
                }), $("#hiddenUpload").change(function(e) {
                    ChunkedFileUpload.handle("#orderFileUploadHiddenInput", e.target.files)
                }), $("#fileUpload").click(function() {
                    $("li.wordCount:visible").hide(), 1 === e.uploaderVersion ? $("#hiddenUpload").click() : (FileUploadModal.show(), FileUploadModal.getUploadServices())
                }), $("#textUpload").click(function(e) {
                    $("li.wordCount:visible").hide(), $("#metinGiris").val().length > 0 && (Summary.displayTotalsProgress(), FileUpload.handleUploadText($("#metinGiris").val()))
                }), $('#interpretLanguageId, input[name=qualityTypeId], input[name^="extraService_"]').change(function() {
                    T($(this).attr("id"))
                }), $("input[name=categoryTypeId]").change(function() {
                    var t = $('input[name^="extraService_"][data-name="NOTARISATION"]'),
                        n = $('input[name="categoryTypeId"][data-name="CERTIFIED_INTERPRETER"]').is(":checked");
                    !n && t.length > 0 && t.is(":checked") && (k(), $("#error-modal .modal-body .message").text(e.translations.NOTARISATION_REQUIRES_CERTIFIED_TRANSLATOR), $("#error-modal").modal()), l()
                }), $("input[name=durationTypeId]").on("change", function(t) {
                    if (t.preventDefault(), parseInt($(this).val()) === parseInt(e.fastDurationTypeId)) y();
                    else {
                        var n = $("#newOrderForm");
                        n.find('input[name="userDefinedDurationPercentage"]').val(0), l()
                    }
                }), $("#fileLanguageId").on("change", function() {
                    I()
                }), $("#notlar").on("change", function() {
                    l()
                }), E(), S(), _(), v(), h()
            },
            h = function() {
                var e = $("#changeServiceTypeModal");
                e.find("button").on("click", function() {
                    if ("save" === $(this).data("action")) m();
                    else if ("give-up" === $(this).data("action")) {
                        var t = e.find('input[name="_orderInterpretionServiceTypeId"]').val();
                        e.find('ul li[data-service-type-id="' + t + '"]').trigger("click")
                    }
                    e.modal("hide")
                }), e.find("ul li").on("click", function(e) {
                    $(this).hasClass("selectedChoise") || ($(this).closest("ul").find("li.selectedChoise").removeClass("selectedChoise"), $(this).addClass("selectedChoise"))
                })
            },
            m = function() {
                var e = $("#changeServiceTypeModal"),
                    t = e.find("ul li.selectedChoise").data("service-type-id"),
                    n = e.find("ul li.selectedChoise").text();
                $('input[name="serviceTypeId"]').val(t), e.find('input[name="_orderInterpretionServiceTypeId"]').val(t), T(), $("h1.service-type span").text(n)
            },
            g = function(t) {
                if (t.preventDefault(), !e.lockedRemoveReferenceFile) {
                    e.lockedRemoveReferenceFile = !0, $(".reference-files > span.selected-reference-files-loader").remove(), $(".reference-files").append('<span class="selected-reference-files-loader"><img src="/static/assets/pt_old/images/loading.gif" alt="" width="16" /></span>');
                    var n = $(this).data("file-uri");
                    $.post(e.removeOrderReferenceFiles, {
                        fileUri: n
                    }, function(t) {
                        t.success && $('ul li a[data-file-uri="' + n + '"]').closest("li").remove(), $(".reference-files > span.selected-reference-files-loader").remove(), e.lockedRemoveReferenceFile = !1
                    })
                }
            },
            v = function() {
                $(".reference-files button").on("click", function(e) {
                    e.preventDefault(), document.getElementById("referenceFiles").click()
                }), $(".order-reference-files .order-reference-file-remove").on("click", g), $(".reference-files #referenceFiles").on("change", function() {
                    var n = $(this)[0].files;
                    if (0 !== n.length) {
                        $(".reference-files button").prop("disabled", !0), $(".reference-files > span.selected-reference-files-loader").remove(), $(".reference-files").append('<span class="selected-reference-files-loader"><img src="/static/assets/pt_old/images/loading.gif" alt="" width="16" /></span>');
                        for (var i = new FormData, r = 0; r < n.length; r++) {
                            var o = n[r];
                            i.append("referenceFiles[]", o, o.name)
                        }
                        $.ajax({
                            url: e.addOrderReferenceFiles,
                            data: i,
                            type: "POST",
                            contentType: !1,
                            processData: !1,
                            success: function(n) {
                                if ($(".reference-files button").prop("disabled", !1), n.success) $(".reference-files > span.selected-reference-files-loader").remove(), $(".order-reference-files-wrapper").remove(), $(".reference-files").after(n.referenceFilesHtml), $(".order-reference-files .order-reference-file-remove").off("click"), $(".order-reference-files .order-reference-file-remove").on("click", g);
                                else {
                                    var i, r = !1;
                                    i = "undefined" == typeof e.translations[n.errorMessage] ? n.errorMessage : e.translations[n.errorMessage], AlertModal.show({
                                        title: e.translations.ERROR_MESSAGE_STATIC_PAGE,
                                        text: i,
                                        showCancelButton: !1,
                                        confirmButtonText: e.translations.OK_BUTTON,
                                        id: "addOrderRefenceFilesError",
                                        callback: function() {
                                            $("#addOrderRefenceFilesError").modal("hide")
                                        }
                                    }), "undefined" != typeof n.goToTopofPage && n.goToTopofPage && (r = !0), $("#addOrderRefenceFilesError").off("hidden.bs.modal"), $("#addOrderRefenceFilesError").on("hidden.bs.modal", function() {
                                        t(r)
                                    })
                                }
                            }
                        })
                    }
                });
                var t = function(e) {
                    $("input#referenceFiles").val(""), $(".reference-files .selected-reference-files-loader").remove(), e && $("html, body").animate({
                        scrollTop: 0
                    }, 800)
                }
            },
            y = function() {
                0 !== FileUpload.getUploadedFileCount() && ($("#fastDeliveryModal .alert").remove(), $("#fastDeliveryModal").modal("show"), e.fastDurationEstimatedDate && e.fastDurationEstimatedDate.hasOwnProperty("Date") && e.fastDurationEstimatedDate.hasOwnProperty("Timezone") && $("#fastDeliveryModal .delivery-date").html(e.fastDurationEstimatedDate.Date + " (" + e.fastDurationEstimatedDate.Timezone + ")"), $('.fast-delivery-options input[name="fast_duration_type"]').off("change"), $('.fast-delivery-options input[name="fast_duration_type"]').on("change", function() {
                    var t = $(this);
                    if (t.closest(".fast-delivery-options").find("label.radius.checked").removeClass("checked"), t.closest("label").addClass("checked"), parseInt($(this).val()) === parseInt(e.userDefinedurationTypeId)) b();
                    else {
                        var n = $("#newOrderForm");
                        n.find('input[name="userDefinedDurationPercentage"]').val(0), $(".customer-delivery-date-options .customer-delivery-date-item").removeClass("transition").addClass("disabled")
                    }
                }), $("#fastDeliveryModal button").off("click"), $("#fastDeliveryModal button").on("click", function(t) {
                    t.preventDefault();
                    var n = $(this).data("action");
                    if ("giveup" !== n) {
                        var i = $('.fast-delivery-options input[name="fast_duration_type"]:checked').val();
                        if ($("#fastDeliveryModal .alert").remove(), parseInt(i) === parseInt(e.userDefinedurationTypeId)) {
                            var r = $("#newOrderForm").find('input[name="userDefinedDurationPercentage"]').val();
                            if (!r || 0 == r) return void $("#fastDeliveryModal .fast-delivery-options").after('<p class="alert alert-danger">' + e.translations.FAST_DURATION_USER_DEFINED_NOT_SELECTED + "</p>")
                        }
                        $("#fastDeliveryModal").modal("hide"), l()
                    } else if ($("#fastDeliveryModal").modal("hide"), null !== e.tempDurationTypeId) {
                        var o = $('input[name="durationTypeId"][value="' + e.tempDurationTypeId + '"]');
                        o.closest("ul").find(".selectedChoise").removeClass("selectedChoise"), o.closest("li").addClass("selectedChoise"), o.prop("checked", !0), e.tempDurationTypeId = null
                    }
                }), e.interpretionDurationCustomPercentage > 0 && ($('.fast-delivery-options input[name="fast_duration_type"][value="' + e.userDefinedurationTypeId + '"]').trigger("click"), b()))
            },
            b = function() {
                var t = $('.fast-delivery-options input[name="fast_duration_type"][value="' + e.userDefinedurationTypeId + '"]');
                t.closest("label").append('<img src="/static/assets/pt_old/images/loading.gif" width="16" class="loading ml-1" />'),
                    $("#fastDeliveryModal").find('button[type="button"]').prop("disabled", !0), $.get(e.getCustomDeliveryDates, {}, function(e) {
                        if (t.closest(".fast-delivery-options").find("img.loading").remove(), $("#fastDeliveryModal").find('button[type="button"]').prop("disabled", !1), e.success) {
                            if ($(".customer-delivery-date-options").html(e.html), $(".customer-delivery-date-options").css("display", "flex"), e.interpretionDurationCustomPercentage) {
                                var n = $("#newOrderForm");
                                n.find('input[name="userDefinedDurationPercentage"]').val(e.interpretionDurationCustomPercentage)
                            }
                            w()
                        }
                    })
            },
            w = function() {
                var e = $(".customer-delivery-date-options .customer-delivery-date-item:not(.disabled)");
                e.off("click"), e.on("click", function(e) {
                    e.preventDefault(), $(this).closest(".customer-delivery-date-options").find(".customer-delivery-date-item.active").removeClass("active"), $(this).addClass("active");
                    var t = $("#newOrderForm");
                    t.find('input[name="userDefinedDurationPercentage"]').val($(this).find("input").data("percentage"))
                })
            },
            C = function() {
                $(".stepContent .file-list .file-row").each(function(e) {
                    $(this).data("index", e), $(this).attr("data-index", e)
                })
            },
            x = function() {
                ChunkedFileUpload.init({
                    translations: e.translations,
                    selector: "#orderFileUploadHiddenInput",
                    add: function(e) {
                        FileUpload.startUploadingFiles();
                        var t = e.files[0],
                            n = $(".file-list").find(".file-row").length;
                        e.fileTempId = String((new Date).getTime()) + Math.random() + "_" + n, e.formData = {
                            fileTempId: e.fileTempId
                        }, FileUpload.addNewFileItemHtml(n, e.fileTempId, t.name), FileUpload.addSelectedFile(t, e.fileTempId), e.submit()
                    },
                    progress: function(e) {
                        var t = $('.file-list .file-row[data-id="' + e.fileTempId + '"] .progress-bar-wrapper .progress-bar'),
                            n = e._progress,
                            i = n.loaded / n.total;
                        t.css("width", Math.round(100 * i) + "%"), t.text(Math.round(100 * i) + "%")
                    },
                    done: function(e) {
                        var t = JSON.parse(e.result);
                        !0 === t.success ? FileUpload.addFileToCountWords(e.fileTempId, t.item.data.FileUri) : (ChunkedFileUpload.showErrorModal(t.errorMessage), $('.file-list .file-row[data-id="' + e.fileTempId + '"]').remove(), FileUpload.finishUploadingFiles(null, null, null, null))
                    }
                })
            },
            T = function(t) {
                var n = $("input[name=serviceTypeId]").val(),
                    i = $("#fileLanguageId").val();
                n == e.serviceTypes.translation ? ($(".stepContent #interpretLanguage").removeClass("displayNone"), ("undefined" == typeof t || "init" === t && 1 === e.targetLanguages.length && parseInt(e.targetLanguages[0].LanguageId) === parseInt(i)) && $("#interpretLanguageId").val("")) : ($("#selectedLanguageId, #interpretLanguageId").val(i), $(".stepContent #interpretLanguage").addClass("displayNone")), "interpretLanguageId" == t ? l() : a(i)
            },
            _ = function() {
                0 != $("form.customer-form").length && $("form.customer-form input").keydown(function(e) {
                    var t = e.which;
                    13 == t && (e.preventDefault(), $("form.customer-form button[value=save]").click())
                })
            },
            k = function() {
                var e = $('input[name="categoryTypeId"][data-name="CERTIFIED_INTERPRETER"]');
                $('input[name^="extraService_"][data-name="NOTARISATION"]').is(":checked") && !e.is(":checked") && (e.prop("checked", !0), e.closest(".siparisSinifi").find(".selectedChoise").removeClass("selectedChoise"), e.closest("li").addClass("selectedChoise"))
            },
            S = function() {
                k();
                var e = $('input[name^="extraService_"][data-name="NOTARISATION"]'),
                    t = $('input[name^="extraService_"][data-name="CARGO_DELIVERY"]'),
                    n = $('input[name^="extraService_"][data-name="APOSTILLE"]'),
                    i = function() {
                        e.is(":checked") && t.length > 0 && !t.is(":checked") && t.prop("checked", !0), e.is(":checked") || n.prop("checked", !1), k()
                    };
                e.click(function() {
                    i()
                }), n.click(function() {
                    n.is(":checked") && e.length > 0 && !e.is(":checked") && (e.prop("checked", !0), i())
                })
            },
            I = function() {
                var t = 3,
                    n = Number($("#fileLanguageId").val()),
                    i = $('input[name^="extraService_"][data-name="APOSTILLE"]');
                n !== t ? (i.prop("checked", !1), i.attr("disabled", "disabled"), i.parent().find("span").tooltip({
                    placemenet: "top",
                    title: e.apostilleTooltipMessage
                })) : (i.removeAttr("disabled"), i.parent().find("span").tooltip("destroy"))
            },
            E = function() {
                $(".file-list .file-remove").each(function() {
                    var e = $(this);
                    $(this).off("click"), $(this).on("click", function() {
                        s(e)
                    })
                })
            },
            D = function(e, t, n) {
                $("#loading-text").text(e), $("#loading .action").hide(), t && ($("#loading .action .btn").text(t), $("#loading .action").delay(6e3).show(), n && $("#loading .action .btn").click(function(e) {
                    n()
                })), $("#loading").modal({
                    backdrop: "static",
                    keyboard: !1
                })
            },
            A = function(t) {
                t ? ($("#kayitForm button.btn.btn-warning").val("noUpdate"), $("#kayitForm button.btn.btn-primary").text(e.translations.AUTOMATIC_TRANSLATION_PDF_UPDATE)) : ($("#kayitForm button.btn.btn-primary").text(e.translations.CONTINUE), $("#kayitForm li.col-xs-12").removeClass("selectedChoise"), $('#kayitForm li.col-xs-12 input[name="autoTranslation"]').prop("checked", !1), $("#kayitForm li.col-xs-12").first().addClass("selectedChoise"), $('#kayitForm li.col-xs-12 input[name="autoTranslation"]').first().prop("checked", !0)), $("#pdfFlowModal").modal()
            },
            F = function() {
                $("#metinGir").click(function() {
                    $("#alanDosya").slideUp(), $("#alanMetin").slideDown(), $("#alanDosya").removeClass("alanAcik"), $("#alanMetin").hasClass("alanAcik") || $("#alanMetin").addClass("alanAcik")
                }), $("#dosyaYukle").click(function() {
                    $("#alanMetin").slideUp(), $("#alanDosya").slideDown(), $("#alanMetin").removeClass("alanAcik"), $("#alanDosya").hasClass("alanAcik") || $("#alanDosya").addClass("alanAcik")
                }), $(".work li").click(function(t) {
                    if (t.preventDefault(), t.stopPropagation(), !($(this).closest(".order-reference-files").length > 0)) {
                        if ($(this).parent().hasClass("uzmanlik")) {
                            var n = $(this).find("input").val();
                            if (parseInt(n) === parseInt(e.interpretionQualityTypes.standart)) $(".order-levels").removeClass("two-column"), $('.order-levels .order-level[data-interpretion-service-level="' + e.orderLevels.economy + '"]').delay(200).fadeIn(200);
                            else {
                                var i = $(".order-levels .order-level.selected").data("interpretion-service-level");
                                parseInt(i) === parseInt(e.orderLevels.economy) && $(".order-levels .order-level.popular").trigger("click"), $('.order-levels .order-level[data-interpretion-service-level="' + e.orderLevels.economy + '"]').fadeOut(200, function() {
                                    $(".order-levels").addClass("two-column")
                                })
                            }
                        }
                        var r = $(this).parent();
                        r.find(".selectedChoise").removeClass("selectedChoise"), r.find("input[type=radio]:checked").prop("checked", !1), $(this).addClass("selectedChoise"), $(this).find("input[type=radio]").prop("checked", !0).trigger("change")
                    }
                })
            },
            O = function() {
                $("input").on("blur, change", function() {
                    $(this).val().length < 1 && $(this).parent().find("label.valid").remove()
                })
            },
            L = function() {
                Summary.handleScroller(), Summary.handleMobileDevice();
                var e = "onorientationchange" in window,
                    t = e ? "orientationchange" : "resize";
                window.addEventListener(t, function() {
                    window.matchMedia("(max-width: 1023px)").matches && $("#orderWr").removeAttr("style")
                }, !1), $(window).resize(function() {
                    Summary.handleScroller()
                })
            },
            N = function() {
                function e() {
                    $("#alanMetin").find("label").text($.trim($("#metinGiris").val()).split(" ").filter(function(e) {
                        return "" !== e
                    }).length)
                }
                $("#metinGiris").focus(function() {
                    $(this).parent().parent().addClass("stepFocused")
                }).on("keydown", function() {
                    e()
                }), $(document).on("blur", "#metinGiris", function() {
                    $(".stepFocused").removeClass("stepFocused"), e()
                }), $("ul.select2-selection__rendered").click(function() {
                    $(".step3").addClass("stepFocused")
                }), $("#notlar").click(function() {
                    $(".step7").addClass("stepFocused")
                })
            },
            R = function() {
                n += 1, $.post(e.loadCatProject, {}).done(function(i) {
                    var r = $.parseJSON(i);
                    (n > e.maxLoadRetryCount || r.success) && clearInterval(t), r.success ? (d(r), n = 0, $("#loading").modal("hide"), Summary.hideTotalsProgress()) : r.retry || (location.href = e.triggerManualOrder)
                })
            },
            M = function(t) {
                var n = $("#autoConversionBox"),
                    i = $("#remainTime");
                if (t.campaignDiscountUsed) return n.hide(), i.val(""), !1;
                var o = $(".kalemler"),
                    a = o.find(".turkcell"),
                    s = o.find(".ptindirimi");
                clearTimeout(e.autoConversionTimer), 0 === FileUpload.getUploadedFileCount() || r().length <= 0 || t.hideAmount === !0 || 0 === t.autoConversionVoucherRemainTime || null === t.autoConversionVoucherRemainTime ? (n.hide(), t.anyVoucherUsed || a.hide(), i.val("")) : t.autoConversionVoucherRemainTime > 0 && (s.find("#ptOK").prop("checked", !1), $("#ptModal #kuponKodu").val(""), i.val(t.autoConversionVoucherRemainTime), null !== t.autoConversionVoucher && n.find(".orderHeader span.type").text(e.translations[t.autoConversionVoucher.Name + "_VOUCHER_TITLE"]), n.show(), a.show(), o.show(), P()), Summary.handleScroller()
            },
            P = function() {
                var t = 1,
                    n = 1e3,
                    i = function() {
                        function r(e) {
                            return (e < 10 ? "0" : "") + e
                        }
                        var o = parseInt($("#remainTime").val());
                        total_seconds = o % 3600;
                        var a = Math.floor(total_seconds / 60);
                        total_seconds %= 60;
                        var s = Math.floor(total_seconds);
                        a = r(a), s = r(s);
                        var c = a + ":" + s;
                        0 != o ? (e.autoConversionTimer = setTimeout(i, n), $("#remainTimeSpan").html(c), $("#remainTime").val(o - t)) : ($("#autoConversionBox").hide(), l())
                    };
                i()
            },
            U = function(e) {
                "function" == typeof LiveChatService.setVisitorNotesForChat && LiveChatService.setVisitorNotesForChat(e)
            },
            q = function() {
                $("#autoTranslationPdfChange").click(function(e) {
                    A(!0)
                })
            },
            j = function() {
                var t = $("form.customer-form");
                0 !== t.length && t.validate({
                    errorPlacement: function(e, t) {
                        e.insertAfter(t)
                    },
                    success: function(e, t) {
                        e.insertAfter(t).removeClass("error").addClass("valid")
                    },
                    rules: {
                        fullName: {
                            required: !0
                        },
                        phoneCode: {
                            required: !0
                        },
                        phoneNumber: {
                            required: !0,
                            remote: {
                                url: e.urls.validatePhone,
                                type: "post",
                                data: {
                                    phoneCode: function() {
                                        return $("select[name=countryCode]").val()
                                    },
                                    phoneNumber: function() {
                                        return $("input[name=phoneNumber]").val()
                                    }
                                }
                            }
                        },
                        email: {
                            required: !0,
                            email: !0
                        },
                        fileLanguageId: {
                            required: !0
                        },
                        "interpretLanguageId[]": {
                            required: !0
                        }
                    },
                    messages: {
                        fullName: {
                            required: e.translations.FULLNAME_REQUIRED
                        },
                        phoneCode: {
                            required: ""
                        },
                        phoneNumber: {
                            required: e.translations.PHONE_NUMBER_REQUIRED,
                            remote: e.translations.PHONE_NUMBER_INVALID
                        },
                        email: {
                            required: e.translations.EMAIL_REQUIRED,
                            email: e.translations.EMAIL_INVALID
                        },
                        fileLanguageId: {
                            required: e.translations.TARGET_LANGUAGE_REQUIRED
                        },
                        "interpretLanguageId[]": {
                            required: e.translations.TARGET_LANGUAGE_REQUIRED
                        }
                    }
                })
            },
            B = function() {
                var e = $("#ptModal");
                0 !== e.length && 0 !== e.find("form").length && e.find("form").validate({
                    errorPlacement: function(e, t) {
                        e.insertAfter(t)
                    },
                    success: function(e) {
                        e.removeClass("error").addClass("valid")
                    },
                    rules: {
                        voucherCode: {
                            required: !0
                        }
                    },
                    messages: {
                        voucherCode: " "
                    }
                })
            },
            W = function() {
                var e = $("#turkcellModal");
                0 !== e.length && 0 !== e.find("form").length && e.find("form").validate({
                    errorPlacement: function(e, t) {
                        e.insertAfter(t)
                    },
                    success: function(e) {
                        e.removeClass("error").addClass("valid")
                    },
                    rules: {
                        phone: {
                            required: !0
                        },
                        pin: {
                            required: !0
                        }
                    },
                    messages: {
                        phone: " ",
                        pin: " "
                    }
                })
            },
            H = function(t) {
                $.extend(e, t), Summary.init({
                    mainFormId: "newOrderForm",
                    ajaxCallback: d,
                    voucherLink: t.applyVoucher,
                    isSwornTranslation: e.isSwornTranslation,
                    turkcellIstekazanCampaignType: e.turkcellIstekazanCampaignType,
                    pageObject: Order,
                    urls: e.urls
                }), FileUpload.init({
                    uploadFileUrl: t.uploadFileUrl,
                    countWordsFile: t.countWordsFile,
                    translations: t.translations
                }), T("init"), I(), O(), F(), L(), CustomerInfo.init({
                    showCustomerInfo: e.loadCustomerInfo,
                    isMobile: e.isMobile,
                    isContent: !1,
                    translations: e.translations
                }), 1 === e.uploaderVersion && x(), $("#interpretLanguageId").trigger("change"), $("#interpretLanguageId").on("select2:select", function(e) {
                    $("#interpretLanguageId").select2("close")
                }), $("#interpretLanguageId").on("select2:unselect", function(e) {
                    $("#interpretLanguageId").select2("close")
                }), $("#interpretLanguageId").on("select2:unselecting", function(e) {
                    $("#interpretLanguageId").data("state", "unselected")
                }), $("#interpretLanguageId").on("select2:open", function(e) {
                    if ("unselected" === $(this).data("state")) {
                        $(this).removeData("state");
                        var t = $(this);
                        setTimeout(function() {
                            t.select2("close")
                        }, 1)
                    }
                }), l(), N(), f(), q(), FileUploadModal.init({
                    urls: {
                        getUploadServices: e.getUploadServices,
                        getFileListFromService: e.getFileListFromService,
                        signOutFileTransferService: e.signOutFileTransferService,
                        getFileTransferServiceDetail: e.getFileTransferServiceDetail,
                        uploadFileViaService: e.uploadFileViaService
                    },
                    translations: {
                        FILE_WORD_COUNT: e.translations.FILE_WORD_COUNT,
                        COUNTING_WORDS: e.translations.COUNTING_WORDS,
                        LOADING: e.translations.LOADING,
                        WAITING_TO_BE_UPLOADED: e.translations.WAITING_TO_BE_UPLOADED,
                        TRANSLATION_NOT_UPLOADED: e.translations.TRANSLATION_NOT_UPLOADED,
                        UPLOAD_FILE_TRANSFER_ERROR: e.translations.UPLOAD_FILE_TRANSFER_ERROR,
                        UPLOAD_FILE_TRANSFER_ERROR_TEXT: e.translations.UPLOAD_FILE_TRANSFER_ERROR_TEXT,
                        UPLOAD_FILE_SERVICE_SIGN_OUT: e.translations.UPLOAD_FILE_SERVICE_SIGN_OUT,
                        UPLOAD_HELP_TEXT: e.translations.UPLOAD_HELP_TEXT,
                        NO_INTERNET_CONNECTION_WHILE_FILE_UPLOADING: e.translations.NO_INTERNET_CONNECTION_WHILE_FILE_UPLOADING
                    }
                }), FileUploadModal.checkAutoShow(), j(), B(), W()
            };
        return {
            init: H,
            reloadProject: R,
            recalculate: l,
            loadRemoveFileHandler: E,
            removeOrderFile: s,
            textUploadFinished: o
        }
    }(),
    ContentOrder = function() {
        var e = {
                numberOfItems: 0,
                continueButtonMouseDown: !1,
                enableSubmit: !1,
                translations: [],
                urls: []
            },
            t = function(t) {
                Summary.displayTotalsProgress();
                var i = $("#newContentOrderForm");
                $("#newContentOrderForm").find('input[name="EncodedUri"]').length > 0 ? i.find('input[name="EncodedUri"]').val(encodeURI(window.location.pathname)) : i.append('<input type="hidden" name="EncodedUri" value="' + encodeURI(window.location.pathname) + '" />'), t ? $("#newContentOrderForm").find('input[name="saveContentDetails"]').length > 0 ? i.find('input[name="saveContentDetails"]').val(encodeURI(window.location.pathname)) : i.append('<input type="hidden" name="saveContentDetails" value="1" />') : i.find('input[name="saveContentDetails"]').remove(), $.post(e.urls.contentOrderUpdate, i.serialize()).done(function(e) {
                    CustomerInfo.checkCustomerModal(e) || (e.success && e.liveChatData && n(e.liveChatData), f(e)), Summary.hideTotalsProgress()
                })
            },
            n = function(e) {
                "function" == typeof LiveChatService.setVisitorNotesForChat && LiveChatService.setVisitorNotesForChat(e)
            },
            i = function() {
                $(".stepWr .stepContent").eq(0).addClass("stepFocused"), $(".stepContent").on("click", function(e) {
                    $(this).closest(".stepWr").find(".stepContent.stepFocused").removeClass("stepFocused"), $(this).addClass("stepFocused")
                })
            },
            r = function() {
                $([document.documentElement, document.body]).animate({
                    scrollTop: $(".content-detail-table").closest(".stepContent").offset().top
                }, 800), $(".content-details").parent().find("p.alert").remove(), $(".content-detail-actions").after('<p class="alert alert-danger content-detail-error-message">' + e.translations.ERROR_MESSAGE_CONTENT_DETAILS_VALID + "</p>"), $(".content-detail-table .content-detail-row").each(function(e) {
                    "" === $(this).find(".content-detail-column.title input").val() && $(this).find(".content-detail-column.title input").addClass("invalid")
                })
            },
            o = function() {
                $(".content-detail-table .content-detail-column input").off("change"), $(".content-detail-table .content-detail-column input").on("change", function() {
                    e.continueButtonMouseDown ? e.continueButtonMouseDown = !1 : (s() && t(!0), $(".content-detail-column input.invalid").removeClass("invalid"), $(".content-details").parent().find("p.alert").remove(), h())
                })
            },
            a = function() {
                if ($(window).outerWidth() > 600) {
                    var n = 0;
                    $(".order-levels .order-level").each(function(e) {
                        $(this).find("ul").height() > n && (n = $(this).find("ul").height())
                    });
                    var i = 20;
                    $(".order-levels .order-level").each(function(e) {
                        $(this).find("ul").css("height", n + i)
                    })
                }
                $(".order-levels .order-level").on("click", function(n) {
                    n.preventDefault(), n.stopPropagation(), $(this).hasClass("selected") || ($(".order-levels .order-level.selected").find("a.btn").text(e.translations.INTERPRETION_SERVICE_LEVEL_SELECT), $(".order-levels .order-level.selected").removeClass("selected"), $(this).addClass("selected"), $(this).find("a.btn").text(e.translations.INTERPRETION_SERVICE_LEVEL_SELECTED), $('input[name="contentGenerationCateogryTypeId"]').val($(this).data("content-generation-category-type")), t()), $(this).closest(".stepWr").find(".stepContent.stepFocused").removeClass("stepFocused"), $(this).closest(".stepContent").addClass("stepFocused")
                }), $('input[name="numberOfItems"], input[name="contentMinWord"]').on("focus", function(e) {
                    $(this).data("val", $(this).val())
                }), $('input[name="numberOfItems"], input[name="contentMinWord"]').on("blur", function(e) {
                    "" === $(this).val() && $(this).val($(this).data("val")), $(this).removeAttr("data-val")
                }), $("#orderBox .onayla button").on("mousedown", function() {
                    e.enableSubmit && (e.continueButtonMouseDown = !0)
                }), o(), $("#newContentOrderForm").submit(function(e) {
                    var t = !0,
                        n = $("#contentLanguageId").val();
                    if ("undefined" != typeof n && n && "" !== n || ($([document.documentElement, document.body]).animate({
                            scrollTop: $("#contentLanguageId").closest(".stepContent").offset().top
                        }, 800), $("#contentLanguageId").select2("open"), t = !1), !0 === t) {
                        var i = $("input.content-detail-row-title");
                        i.each(function(e) {
                            "" === $(this).val() && (t = !1)
                        }), t || r()
                    }
                    t || e.preventDefault()
                }), $('input[name="contentGenerationServiceTypeId"], input[name="imageRequest"], input[name="contentLanguageId"], input[name="contentTopicTypeId"]').on("change", function(e) {
                    "contentGenerationServiceTypeId" === $(this).attr("name") && ($(this).closest(".content-service-type").find("li.selectedChoise").removeClass("selectedChoise"), $(this).closest("li").addClass("selectedChoise")), "imageRequest" === $(this).attr("name") && ($(this).closest(".form-group").find("label.checked").removeClass("checked"), $(this).closest("label").addClass("checked")), t()
                }), $('input[name="numberOfItems"], input[name="contentMinWord"], textarea[name="description"]').on("change", function() {
                    $(this).val().length > 0 && ("numberOfItems" === $(this).attr("name") ? 0 === parseInt($(this).val()) ? $(this).val($(this).data("val")) : (c($('input[name="numberOfItems"]').val()), m(), t(!0)) : t())
                }), l(), $('select[name="contentLanguageId"], select[name="contentTopicTypeId"]').on("change", function(e) {
                    t()
                }), p()
            },
            s = function() {
                var e = !0;
                return $(".content-details .content-detail-row").not(".head").each(function(t) {
                    "" === $(this).find(".content-detail-column.title input").val() && (e = !1)
                }), e
            },
            l = function() {
                $(".content-detail-column.title input").off("change"), $(".content-detail-column.title input").on("change", function(e) {
                    $(".content-detail-column input.invalid").removeClass("invalid"), $(".content-details").parent().find("p.alert").remove()
                })
            },
            c = function(t) {
                var n = {
                    title: [],
                    keywords: [],
                    notes: []
                };
                $(".content-detail-column.title input").each(function(e) {
                    n.title.push($(this).val())
                }), $(".content-detail-column.keywords input").each(function(e) {
                    n.keywords.push($(this).val())
                }), $(".content-detail-column.notes input").each(function(e) {
                    n.notes.push($(this).val())
                }), $(".content-detail-table .content-detail-row:not(.head)").remove();
                for (var i = 0; i < parseInt(t); ++i) {
                    var r = parseInt(i) + 1,
                        a = n.title[i] ? n.title[i] : "",
                        s = n.keywords[i] ? n.keywords[i] : "",
                        c = n.notes[i] ? n.notes[i] : "",
                        d = '<div class="content-detail-row">\n                                                                <div class="content-detail-column id">' + r + '</div>\n                                                                <div class="content-detail-column title">\n                                                                    <input type="text" name="contentDetail[' + i + '][title]" class="content-detail-row-title" placeholder="' + e.translations.CONTENT_TITLE_PLACEHOLDER + '" value="' + a + '" />\n                                                                </div>\n                                                                <div class="content-detail-column keywords">\n                                                                    <input type="text" name="contentDetail[' + i + '][keywords]" class="content-detail-row-keywords" placeholder="' + e.translations.CONTENT_KEYWORDS_PLACEHOLDER + '" value="' + s + '" />\n                                                                </div>\n                                                                <div class="content-detail-column notes">\n                                                                    <input type="text" name="contentDetail[' + i + '][notes]" class="content-detail-row-notes" value="' + c + '" />\n                                                                </div>\n                                                            </div>';
                    $(".content-detail-table").append(d)
                }
                l(), o()
            },
            d = function() {
                $("input").on("blur, change", function() {
                    $(this).val().length < 1 && $(this).parent().find("label.valid").remove()
                })
            },
            u = function() {
                Summary.handleScroller(), Summary.handleMobileDevice();
                var e = "onorientationchange" in window,
                    t = e ? "orientationchange" : "resize";
                window.addEventListener(t, function() {
                    window.matchMedia("(max-width: 1023px)").matches && $("#orderWr").removeAttr("style")
                }, !1), $(window).resize(function() {
                    Summary.handleScroller()
                })
            },
            p = function() {
                0 != $("form.customer-form").length && $("form.customer-form input").keydown(function(e) {
                    var t = e.which;
                    13 == t && (e.preventDefault(), $("form.customer-form button[value=save]").click())
                })
            },
            f = function(t) {
                !t.success && t.reload && ("undefined" != typeof t.emptyOrder && t.emptyOrder ? window.location.href = e.orderUrl : window.location.reload());
                var n = $("#orderBox .workList"),
                    i = $("#orderBox .kalemler"),
                    r = $("#orderBox .toplam"),
                    o = $("#orderBox .orderHeader"),
                    a = $("#orderBox .onayla button"),
                    s = $("#orderBox .ptindirimi"),
                    l = $("#orderBox .turkcellindirimi");
                if (a.text(a.data("defaulttext")), n.find(".wordCount").html(e.translations.TOTAL_WORD_COUNT.replace("{word_count}", "<strong>0</strong>")).show(), n.find(".trAutoTranslation").hide(), r.show().find("span").text(t.amountFormatted), !0 === e.loadCustomerInfo) {
                    r.find("span").append('<span id="dots" style="text-align: right"></span>');
                    setInterval(type, 600)
                }
                o.find("span.pull-right").text(""), n.find(".trDate").html("").hide(), n.find(".timezoneItem").hide(), i.find(".protrans").hide(), i.find(".turkcell").hide(), i.find(".extras").html("").hide(), t.minWordCount > parseInt($("#contentMinWord").val()) && $("#contentMinWord").val(t.minWordCount), $("#contentMinWord").closest("div").find("label span").text("(" + e.translations.CONTENT_GENERATION_MIN_WORDS_TEXT.replace("{wordcount}", t.minWordCount) + ")"), n.find(".wordCount").html(e.translations.TOTAL_WORD_COUNT.replace("{word_count}", "<strong>" + $("#contentMinWord").val() + "</strong>")).show();
                var c = e.translations.LABEL_CONTENT_TYPE + ": <strong>" + $('input[name="contentGenerationServiceTypeId"]:checked').closest("label").text() + "</strong>";
                if (n.find(".contentGenerationServiceType").html(c).show(), t.success) {
                    if ("undefined" != typeof t.displayVoucherInput && t.displayVoucherInput && s.show(), "undefined" != typeof t.displayActiveCampaign && t.displayActiveCampaign && l.show(), r.find("span").text(t.amountFormatted), t.wordCount > 0 && o.find("span.pull-right").text(t.subtotalFormatted), t.priceDiscountFormatted ? (i.find(".protrans span").text("-" + t.priceDiscountFormatted), i.find(".protrans").show()) : (i.find(".protrans span").text(""), i.find(".protrans").hide()), t.discountFormatted ? (i.find(".turkcell span").text("-" + t.discountFormatted), i.find(".turkcell").show(), $("#ptOK").prop("checked", !t.campaignDiscountUsed), $("#turkcellOK").prop("checked", t.campaignDiscountUsed)) : (i.find(".turkcell span").text(""), i.find(".turkcell").hide(), $("#ptOK, #turkcellOK").prop("checked", !1)), t.wordCount > 0 && n.find(".wordCount").html(e.translations.TOTAL_WORD_COUNT.replace("{word_count}", "<strong>" + t.wordCount + "</strong>")).show(), n.find(".contentGenerationServiceType").html(e.translations.LABEL_CONTENT_TYPE + ": <strong>" + $("input[type=radio][name=contentGenerationServiceTypeId]:checked").closest("label").text() + "</strong>").show(), n.find(".contentGenerationLanguage").html(e.translations.LANGUAGE + ": <strong>" + $("select[name=contentLanguageId] option:selected").text() + "</strong>").show(), n.find(".contentGenerationCategoryType").html(e.translations.LABEL_EXPERTISE_LEVEL + ": <strong>" + $(".order-levels .order-level.selected h2").text() + "</strong>").show(), n.find(".contentTopicType").html(e.translations.LABEL_CONTENT_CATEGORY + ": <strong>" + $("select[name=contentTopicTypeId] option:selected").text() + "</strong>").show(), n.find(".contentNumberOfItems").html(e.translations.CONTENT_NUMBER_OF_ITEMS + ": <strong>" + $("input[name=numberOfItems]").val() + "</strong>").show(), t.isImageRequested ? n.find(".imageRequest").show() : n.find(".imageRequest").hide(), t.estimatedDateFormatted) {
                        var d = e.translations.ESTIMATED_DUE_DATE + ": <strong>" + t.estimatedDateFormatted + "</strong>";
                        n.find(".trDate").html(d).show(), n.find(".timezoneItem").show()
                    }
                    $("#newOrderForm input[name=highBudget]").val(t.highBudgetOrder), $('.stepContent[data-hideforauto="1"]').show(), $(".stepContent:visible").each(function(e) {
                        $(this).find(".stepCount").html(e + 1)
                    }), $(".row.neworder").removeClass("pdf-flow"), $(".stepContent.serviceLevelStep").removeClass("hidden"), $(".stepContent.serviceLevelStep").closest(".stepWr").find(".stepContent").each(function(e) {
                        var t = e + 1;
                        $(this).find(".stepCount").html(t)
                    }), $(".order-levels").removeClass("disabled");
                    for (var u = 0; u < t.contentDetails.length; ++u) $('.content-detail-column input[name="contentDetail[' + u + '][title]"]').val(t.contentDetails[u].Title), $('.content-detail-column input[name="contentDetail[' + u + '][keywords]"]').val(t.contentDetails[u].Keywords), $('.content-detail-column input[name="contentDetail[' + u + '][notes]"]').val(t.contentDetails[u].Notes)
                }
                h(), Summary.adjustVisibility(), Summary.handleScroller()
            },
            h = function() {
                var t = !0,
                    n = "",
                    i = "";
                "" === $("#contentLanguageId").val() ? (n = e.translations.PLEASE_SELECT_CONTENT_LANGUAGE, i = "tooltip-click-tracker tct-content-langauge", t = !1) : s() || (n = e.translations.ERROR_MESSAGE_CONTENT_DETAILS_VALID, i = "tooltip-click-tracker tct-content-details", t = !1), e.enableSubmit = t, Summary.adjustButton(t, n, i), $(".tooltip-click-tracker").off("click"), $(".tooltip-click-tracker").on("click", function() {
                    $(this).hasClass("tct-content-langauge") ? $("#contentLanguageId").select2("open") : $(this).hasClass("tct-content-details") && $("html").animate({
                        scrollTop: $(".content-details").closest("div.stepContent").offset().top - 150
                    }, "slow")
                })
            },
            m = function() {
                var e = $("#numberOfItems"),
                    n = $('button[name="decreaseNumberOfPage"]'),
                    i = $('button[name="increaseNumberOfPage"]');
                e.val() > 1 ? n.prop("disabled", !1) : n.prop("disabled", !0), i.prop("disabled", !1), n.off("click"), n.on("click", function(i) {
                    i.preventDefault(), e.val(parseInt(e.val()) - 1), $(".content-detail-table .content-detail-row:last-child").remove(), t(!0), e.val() > 1 ? n.prop("disabled", !1) : n.prop("disabled", !0), o()
                }), i.off("click"), i.on("click", function(i) {
                    i.preventDefault(), e.val(parseInt(e.val()) + 1);
                    var r = $(".content-detail-table .content-detail-row:last-child").clone(),
                        a = parseInt(r.find(".id").text()),
                        s = a + 1;
                    r.find(".id").text(s), r.find(".title input").attr("name", "contentDetail[" + a + "][title]").val(""), r.find(".keywords input").attr("name", "contentDetail[" + a + "][keywords]").val(""), r.find(".notes input").attr("name", "contentDetail[" + a + "][notes]").val(""), $(".content-detail-table").append(r), t(!0), e.val() > 1 ? n.prop("disabled", !1) : n.prop("disabled", !0), o()
                })
            },
            g = function() {
                var e = $("#ptModal");
                0 !== e.length && 0 !== e.find("form").length && e.find("form").validate({
                    errorPlacement: function(e, t) {
                        e.insertAfter(t)
                    },
                    success: function(e) {
                        e.removeClass("error").addClass("valid")
                    },
                    rules: {
                        voucherCode: {
                            required: !0
                        }
                    },
                    messages: {
                        voucherCode: " "
                    }
                })
            },
            v = function() {
                var e = $("#turkcellModal");
                0 !== e.length && 0 !== e.find("form").length && e.find("form").validate({
                    errorPlacement: function(e, t) {
                        e.insertAfter(t)
                    },
                    success: function(e) {
                        e.removeClass("error").addClass("valid")
                    },
                    rules: {
                        phone: {
                            required: !0
                        },
                        pin: {
                            required: !0
                        }
                    },
                    messages: {
                        phone: " ",
                        pin: " "
                    }
                })
            },
            y = function(n) {
                $.extend(e, n), Summary.init({
                    mainFormId: "newContentOrderForm",
                    ajaxCallback: f,
                    voucherLink: n.urls.applyVoucher,
                    turkcellIstekazanCampaignType: n.turkcellIstekazanCampaignType,
                    pageObject: ContentOrder,
                    urls: e.urls
                }), d(), u(), t(), a(), i(), c(e.numberOfItems), m(), g(), v(), CustomerInfo.init({
                    showCustomerInfo: e.loadCustomerInfo,
                    isMobile: e.isMobile,
                    isContent: !0,
                    translations: e.translations
                })
            };
        return {
            init: y,
            recalculate: t
        }
    }(),
    OrderList = function() {
        var e = {
                urls: [],
                status: null,
                filterBag: [],
                removeMessage: ""
            },
            t = function() {
                $(".removePending").each(function() {
                    $(this).click(function(t) {
                        t.preventDefault(), confirm(e.removeMessage) && $.post(e.urls.removeUserOrder, {
                            orderId: $(this).data("orderid")
                        }).done(function(e) {
                            location.reload()
                        })
                    })
                });
                var t = {};
                "" === e.status ? t.statuses = ["all", "done"] : "all" === e.status ? t.statuses = ["pending", "done"] : "done" === e.status && (t.statuses = ["pending", "all"]), "undefined" != typeof e.filterBag.InterpreterLanguageId && null !== e.filterBag.InterpreterLanguageId && (t.interpreterLanguageId = e.filterBag.InterpreterLanguageId), "undefined" != typeof e.filterBag.OrderId && null !== e.filterBag.OrderId && (t.orderId = e.filterBag.OrderId), void 0 !== e.filterBag.CustomTag && null !== e.filterBag.CustomTag && (t.customTag = e.filterBag.CustomTag), t.excludeTestAppraisalOrders = 1, $.get(e.urls.loadAssignmentCounts, t, function(e) {
                    if (e.success === !0)
                        for (i in t.statuses) "undefined" != typeof e.counts[t.statuses[i]] && $(".badge." + t.statuses[i] + "-count").html("(" + e.counts[t.statuses[i]] + ")")
                })
            },
            n = function() {
                $.get(e.urls.getTranslatorBalance, function(e) {
                    e.success === !0 && $(".translatorBalance").text(e.balance)
                })
            },
            r = function(i) {
                $.extend(e, i), t(), n()
            },
            o = function() {
                var e = $(".order-filters-area");
                e.hasClass("show") ? e.slideUp(400, function() {
                    e.removeClass("show"), e.removeAttr("style"), e.addClass("hidden-xs hidden-sm")
                }) : (e.removeClass("hidden-xs hidden-sm"), e.css("display", "none"), e.slideDown(400, function() {
                    e.addClass("show")
                }))
            };
        return {
            init: r,
            toggleOrderFilters: o
        }
    }(),
    Payment = function() {
        var e = {
                orderId: 0,
                iyzicoTransactionType: 0,
                safechargeTransactionType: 0,
                ininalTransactionType: 0,
                getInstallmentsUrl: "",
                updateUserPhoneNumber: "",
                updateTransactionTypeOnPaymentChange: !0,
                messages: [],
                applyVoucher: "",
                updateTransactionType: "",
                getPaymentMethods: "",
                finalizePaymentStatus: "",
                capturePaymentStatusSse: "",
                finalizeOrder: "",
                checkFinanceWorkingHours: "",
                orderPayment: "",
                urls: {}
            },
            t = function() {
                p(), f(), m(), o(), g(), n(), y(), i(), w(), C(), x(), T(), _(), k(), S(), E(), Summary.adjustVisibility(), $(window).outerWidth() < 1024 && $(window).outerWidth() > 991 ? Summary.handleScroller(30) : Summary.handleScroller(30), $(window).resize(function() {
                    $(window).outerWidth() < 1024 && $(window).outerWidth() > 991 ? Summary.handleScroller(30) : Summary.handleScroller(30)
                })
            },
            n = function() {
                var t = $("#requirePhoneNumberModal .require-phone-number-form");
                t.on("submit", function(n) {
                    n.preventDefault(), $.ajax({
                        type: "PUT",
                        url: e.updateUserPhoneNumber,
                        data: t.serialize(),
                        success: function(n) {
                            n.success === !0 ? $("#requirePhoneNumberModal").modal("hide") : t.find("input#numara").after('<label id="numara-error" class="error" for="numara">' + e.messages.invalidPhoneNumber + "</label>")
                        }
                    })
                }), t.find("input#numara").on("blur", function() {
                    "" !== $(this).val() && t.find("#numara-error").remove()
                })
            },
            i = function() {
                $("#fileUpload").click(function() {
                    $("#hiddenUpload").click().change(function() {
                        $("#fileInfo").addClass("fileSelected"), $(".selectedFileName").addClass("fileSelected").text($("#hiddenUpload").val().split("\\").pop())
                    })
                }), $("#fileRemove").click(function() {
                    $(".selectedFileName").text(""), $(".fileSelected").removeClass("fileSelected")
                })
            },
            r = function() {
                0 != $(".installment-options").length && ($(".installment-options label").click(function() {
                    $(".installment-options").find('input[checked="checked"]').removeAttr("checked"), $(".installment-options .radius.checked").removeClass("checked"), $(this).addClass("checked").find("input").attr("checked", "checked")
                }), $(".installment-options").find('input[checked="checked"]').closest("label.radius").hasClass("checked") || $(".installment-options").find('input[checked="checked"]').closest("label.radius").addClass("checked"))
            },
            o = function() {
                0 != $(".installments-link").length && 0 != $("#installments.modal").length && $(".installments-link a").click(function(t) {
                    t.preventDefault(), $("#installments.modal").modal(), $("#installments.modal .modal-body .loader").length > 0 && $.get(e.getInstallmentsUrl, {
                        orderId: e.orderId,
                        transactionTypeId: e.iyzicoTransactionType
                    }).done(function(e) {
                        var t = $.parseJSON(e);
                        $("#installments.modal .modal-body").html(t.html), $("#installments.modal .modal-body").css("overflow-y", "auto"), $("#installments.modal .modal-body").css("max-height", .8 * $(window).height())
                    })
                })
            },
            a = function() {
                $('#iyzico input[name="cardNumber"]').mask("0000 0000 0000 0000"), $('#iyzico input[name="cardCvv"]').mask("000Z", {
                    translation: {
                        Z: {
                            pattern: /[0-9]/,
                            optional: !0
                        }
                    }
                }), $('#iyzico input[name="cardExpiry"]').mask("00/00")
            },
            s = function() {
                $('#iyzico input[name="cardNumber"]').change(function(t) {
                    c(), $("#iyzico .installment-options").hide(), $("#iyzico .installment-options").html(""),
                        $(".payment-error").hide().html("");
                    var n = $(this).val().replace(/ /g, "");
                    n.length >= 6 && (n = n.substring(0, 6), e.updateTransactionTypeOnPaymentChange ? (Summary.displayTotalsProgress(), v(e.iyzicoTransactionType, "", n, function() {
                        l(n)
                    })) : l(n))
                })
            },
            l = function(t) {
                $.get(e.getInstallmentsUrl, {
                    orderId: e.orderId,
                    transactionTypeId: e.iyzicoTransactionType,
                    binNumber: t
                }).done(function(e) {
                    var t = $.parseJSON(e);
                    t.message ? $(".payment-error").html("<p>" + t.message + "</p>").show() : ($("#iyzico .installment-options").html(t.html), t.force3ds && ($("#secure3d").prop("checked", !0), $("#secure3d").prop("disabled", !0)), t.html && (r(), $("#iyzico .installment-options").show())), d()
                })
            },
            c = function() {
                $(".payment .tab-pane.active .onayla button").addClass("disabled")
            },
            d = function() {
                $(".payment .tab-pane.active .onayla button").removeClass("disabled")
            },
            u = function() {
                $("#iyzico #cardExpiryMonth").val(""), $("#iyzico #cardExpiryYear").val(""), $("#iyzico #use3dSecure").val("");
                var e = $("#iyzico #kartTarih").val();
                if (5 == e.length) {
                    var t = e.split("/");
                    $("#iyzico #cardExpiryMonth").val(t[0]), $("#iyzico #cardExpiryYear").val(t[1])
                }
                $("#iyzico #use3dSecure").val($("#iyzico #secure3d").is(":checked") ? "1" : "0")
            },
            p = function() {
                0 != $("#iyzico").length && (a(), s(), $('#iyzico input[name="cardNumber"]').on("cut copy paste", function(e) {
                    e.preventDefault()
                }), u(), $("#iyzico #kartTarih").change(function() {
                    u()
                }), $("#iyzico #use3dSecure").change(function() {
                    u()
                }))
            },
            f = function() {
                if ("safecharge_api" == $(".tabbable .tab-content .tab-pane.active").attr("id")) {
                    var e = $("a[href='#safecharge_api']").data("transactiontypeid");
                    h(e, $(".tabbable .tab-content .tab-pane.active"))
                }
            },
            h = function(t, n) {
                $.post(e.getPaymentMethods, {
                    transactionType: t
                }).done(function(e) {
                    var t = $.parseJSON(e);
                    n.html(t.htmlContent)
                })
            },
            m = function() {
                $("#iyzipay-checkout-form").length > 0 && setTimeout(function() {
                    $("#iyzico_default .loader").hide()
                }, 500)
            },
            g = function() {
                var t = $("ul.nav.nav-tabs li.active a"),
                    n = t.data("require-phone-number");
                1 === parseInt(n) && $("#requirePhoneNumberModal").modal("show"), $('a[data-toggle="tab"]').on("show.bs.tab", function(t) {
                    Summary.displayTotalsProgress();
                    var n = $(t.target).attr("href"),
                        i = $(t.target).data("transactiontypeid"),
                        r = $(t.target).data("processor-mode"),
                        o = $(t.target).data("require-phone-number"),
                        a = "#" + n.substring(1),
                        s = $(a);
                    if ($(".tab-content.payment .tab-pane[data-disable-inactive=true]").length > 0 && ($(".tab-content.payment .tab-pane[data-disable-inactive=true] .cont").html(""), $(".tab-content.payment .tab-pane[data-disable-inactive=true] .loader").show()), s.data("disable-inactive") && $(a + " input[name=iframesrc]").length > 0) {
                        var l = $(a + " input[name=iframesrc]");
                        s.find(".cont").html('<iframe src="' + l.val() + '"></iframe>'), s.find("iframe").on("load", function() {
                            s.find(".loader").hide()
                        })
                    }
                    "#safecharge_api" == n && h(i, $(n)), e.updateTransactionTypeOnPaymentChange && v(i, r), 1 === parseInt(o) && $("#requirePhoneNumberModal").modal("show")
                })
            },
            v = function(t, n, i, r) {
                var o = "undefined" != typeof i && i ? {
                    transactionType: t,
                    processorMode: n,
                    binNumber: i
                } : {
                    transactionType: t,
                    processorMode: n
                };
                $.post(e.updateTransactionType, o).done(function(e) {
                    var t = $.parseJSON(e);
                    b(t), "undefined" != typeof r && r && r(), Summary.hideTotalsProgress(), Summary.setSummaryElementPosition()
                })
            },
            y = function() {
                0 != $('#ininal input[name="cardNumber"]').length && ($('#ininal input[name="cardNumber"]').mask("0000000000000000"), $('#ininal input[name="cardCvv"]').mask("000"), $('#ininal input[name="cardExpiry"]').mask("00/00"), $("#ininal .discount button").click(function() {
                    Summary.displayTotalsProgress(), $.post(e.applyVoucher, {
                        voucherCode: "",
                        transactionTypeId: e.ininalTransactionType
                    }).done(function(e) {
                        var t = $.parseJSON(e);
                        t.success && $("#ininal .discount").remove(), b(t), Summary.hideTotalsProgress()
                    })
                }))
            },
            b = function(e) {
                !e.success && e.reload && window.location.reload();
                var t = $("#orderBox .kalemler"),
                    n = $("#orderBox .toplam"),
                    i = $("#orderBox #subtotalFormatted");
                if (n.find("span").text(e.amountFormatted), i.text(e.subtotalFormatted), e.priceDiscountFormatted ? (t.find(".protrans span").text("-" + e.priceDiscountFormatted), t.find(".protrans").show()) : (t.find(".protrans span").text(""), t.find(".protrans").hide()), e.discountFormatted ? (t.find(".turkcell span").text("-" + e.discountFormatted), t.find(".turkcell").show(), $("#ptOK").prop("checked", !e.campaignDiscountUsed), $("#turkcellOK").prop("checked", e.campaignDiscountUsed)) : (t.find(".turkcell span").text(""), t.find(".turkcell").hide(), $("#ptOK, #turkcellOK").prop("checked", !1)), e.paymentCostFormatted ? (t.find(".paycost span").text("+" + e.paymentCostFormatted), t.find(".paycost").show()) : (t.find(".paycost span").text(""), t.find(".paycost").hide()), t.find(".extras").html("").hide(), Object.keys(e.extraServices).length > 0) {
                    for (var r in e.extraServices) t.find(".extras").append('<p class="kargo">' + r + '<span class="pull-right">+' + e.extraServices[r] + "</span></p>").show();
                    t.find(".extras .kargo").show()
                }
                Summary.adjustVisibility()
            },
            w = function() {
                $("#bankId").on("change", function() {
                    var e = this.value;
                    $("[name=selectedBankAccountId]").val(e), $("[data-bank-info]").each(function() {
                        parseInt(e) === parseInt($(this).data("bank-info")) ? $(this).show() : $(this).hide()
                    })
                })
            },
            C = function() {
                $(".wire-transfer-submit-button").on("click", function(t) {
                    var n = $(this);
                    t.preventDefault();
                    var i = !1;
                    n.prop("disabled", !0).css("opacity", .5), AlertModal.show({
                        title: e.messages.warning,
                        text: e.messages.confirmWireTransferOutOfHours,
                        cancelButtonText: e.messages.cancel,
                        confirmButtonText: e.messages["continue"],
                        id: "wireTransferConfirmAlert",
                        callback: function() {
                            i = !0, n.closest("form").submit()
                        }
                    }), $("#wireTransferConfirmAlert").on("hidden.bs.modal", function() {
                        i || n.prop("disabled", !1).css("opacity", 1)
                    })
                })
            },
            x = function() {
                var t = $('form[data-capture-payment-status="true"]');
                if ("undefined" != typeof t && t.length > 0) {
                    var n, i = t.find('input[name="captureDetails"]').val();
                    "undefined" != typeof i ? (/^[\],:{}\s]*$/.test(i.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")) && (n = JSON.parse(i)), "undefined" != typeof n.orderId && "undefined" != typeof n.paymentToken && "undefined" != typeof n.reference && "undefined" != typeof n.transactionTypeId && CheckPaymentStatus.init({
                        formId: "#" + t.attr("id"),
                        orderId: n.orderId,
                        paymentToken: n.paymentToken,
                        reference: n.reference,
                        transactionTypeId: parseInt(n.transactionTypeId),
                        limitedRequest: !0,
                        remainingTimeClass: ".remaining-time",
                        input: {
                            checkDuration: 1e4,
                            requestTimeLimit: 300
                        },
                        urls: {
                            paymentPageAction: e.orderPayment,
                            finalizePaymentStatus: e.finalizePaymentStatus,
                            checkStatusActionSse: e.capturePaymentStatusSse,
                            finalizeOrder: e.finalizeOrder
                        }
                    })) : t.find(".pending-payment").remove()
                }
            },
            T = function() {
                var t = $("form.address-form");
                0 !== t.length && t.validate({
                    errorPlacement: function(e, t) {
                        var n = t;
                        $(t).next() && "greenCheck" === $(t).next().attr("class") && (n = $(t).next()), e.insertAfter(n)
                    },
                    success: function(e, t) {
                        var n = t;
                        $(t).next() && "greenCheck" === $(t).next().attr("class") && (n = $(t).next()), e.insertAfter(n).removeClass("error").addClass("valid")
                    },
                    rules: {
                        recipient: {
                            required: !0
                        },
                        phoneCode: {
                            required: !0
                        },
                        phoneNumber: {
                            required: !0,
                            remote: {
                                url: e.urls.validatePhone,
                                type: "post",
                                data: {
                                    phoneCode: function() {
                                        return $("select[name=countryCode]").val()
                                    },
                                    phoneNumber: function() {
                                        return $("input[name=phoneNumber]").val()
                                    }
                                }
                            }
                        },
                        address: {
                            required: !0
                        },
                        city: {
                            required: !0
                        },
                        country: {
                            required: !0
                        }
                    },
                    messages: {
                        recipient: {
                            required: e.messages.FULLNAME_REQUIRED
                        },
                        phoneCode: {
                            required: ""
                        },
                        phoneNumber: {
                            required: e.messages.PHONE_NUMBER_REQUIRED,
                            remote: e.messages.PHONE_NUMBER_INVALID
                        },
                        address: {
                            required: e.messages.ADDRESS_REQUIRED
                        },
                        city: {
                            required: e.messages.CITY_REQUIRED
                        },
                        country: {
                            required: ""
                        }
                    }
                })
            },
            _ = function() {
                var t = $("#ininal form");
                0 !== t.length && t.validate({
                    errorPlacement: function(e, t) {
                        e.insertAfter(t)
                    },
                    success: function(e) {
                        e.removeClass("error").addClass("valid")
                    },
                    rules: {
                        cardNumber: {
                            required: !0,
                            number: !0
                        },
                        cardExpiry: {
                            required: !0
                        },
                        cardCvv: {
                            required: !0,
                            number: !0
                        }
                    },
                    messages: {
                        cardNumber: {
                            required: e.messages.CARD_NO_REQUIRED,
                            number: e.messages.CARD_NO_REQUIRED
                        },
                        cardExpiry: {
                            required: e.messages.CARD_EXPIRY_REQUIRED
                        },
                        cardCvv: {
                            required: e.messages.CARD_CVV_REQUIRED,
                            number: e.messages.CARD_CVV_REQUIRED
                        }
                    }
                })
            },
            k = function() {
                var t = $("#iyzico form");
                0 !== t.length && t.validate({
                    errorPlacement: function(e, t) {
                        e.insertAfter(t)
                    },
                    success: function(e) {
                        e.removeClass("error").addClass("valid")
                    },
                    rules: {
                        cardHolder: {
                            required: !0
                        },
                        cardNumber: {
                            required: !0
                        },
                        cardExpiry: {
                            required: !0
                        },
                        cardCvv: {
                            required: !0,
                            number: !0
                        }
                    },
                    messages: {
                        cardHolder: {
                            required: e.messages.CARD_HOLDER_REQUIRED
                        },
                        cardNumber: {
                            required: e.messages.CARD_NO_REQUIRED
                        },
                        cardExpiry: {
                            required: e.messages.CARD_EXPIRY_REQUIRED
                        },
                        cardCvv: {
                            required: e.messages.CARD_CVV_REQUIRED,
                            number: e.messages.CARD_CVV_REQUIRED
                        }
                    }
                })
            },
            S = function() {
                var t = $("#eft form");
                0 !== t.length && t.validate({
                    ignore: [],
                    errorPlacement: function(e, t) {
                        e.insertAfter(t)
                    },
                    success: function(e) {
                        e.removeClass("error").addClass("valid")
                    },
                    rules: {
                        uploadFile: {
                            required: !0
                        }
                    },
                    messages: {
                        uploadFile: {
                            required: e.messages.FILE_REQUIRED
                        }
                    }
                })
            },
            I = function() {
                $("body").find("#billingType-error").length > 0 && $("#billingType-error").appendTo($(".faturaBilgi"))
            },
            E = function() {
                var t = $("form.paypal-account-form");
                0 !== t.length && t.validate({
                    errorPlacement: function(e, t) {
                        e.insertAfter(t), I()
                    },
                    success: function(e, t) {
                        e.insertAfter(t).removeClass("error").addClass("valid"), I()
                    },
                    rules: {
                        paypal_account_email: {
                            required: !0,
                            email: !0
                        }
                    },
                    messages: {
                        paypal_account_email: {
                            required: e.translations.EMAIL_REQUIRED,
                            email: e.translations.EMAIL_INVALID
                        }
                    }
                })
            },
            D = function(n) {
                $.extend(e, n), Summary.init({
                    ajaxCallback: b,
                    turkcellIstekazanCampaignType: e.turkcellIstekazanCampaignType,
                    urls: e.urls
                }), t()
            };
        return {
            init: D
        }
    }(),
    Proposal = function() {
        var e = {
                proposalId: null,
                applyProposalVoucher: "",
                updateProposal: "",
                isTranslationServiceType: !0,
                liveChatUser: null
            },
            t = function() {
                r(), $('input[name^="extraService_"]').change(function() {
                    l()
                }), l(), a(), o(), n(), i(), Summary.adjustButton(!0)
            },
            n = function() {
                var e = $("#turkcellModal");
                0 !== e.length && 0 !== e.find("form").length && e.find("form").validate({
                    errorPlacement: function(e, t) {
                        e.insertAfter(t)
                    },
                    success: function(e) {
                        e.removeClass("error").addClass("valid")
                    },
                    rules: {
                        phone: {
                            required: !0
                        },
                        pin: {
                            required: !0
                        }
                    },
                    messages: {
                        phone: " ",
                        pin: " "
                    }
                })
            },
            i = function() {
                var e = $("#ptModal");
                0 !== e.length && 0 !== e.find("form").length && e.find("form").validate({
                    errorPlacement: function(e, t) {
                        e.insertAfter(t)
                    },
                    success: function(e) {
                        e.removeClass("error").addClass("valid")
                    },
                    rules: {
                        voucherCode: {
                            required: !0
                        }
                    },
                    messages: {
                        voucherCode: " "
                    }
                })
            },
            r = function() {
                document.addEventListener("livechat.ready", function(t) {
                    null !== e.liveChatUser && "undefined" != typeof LiveChatService.updateLiveChatUser && LiveChatService.updateLiveChatUser(e.liveChatUser)
                })
            },
            o = function() {
                $(".reference-files button").on("click", function(e) {
                    e.preventDefault(), document.getElementById("referenceFiles").click()
                });
                var t = function(t) {
                    if (t.preventDefault(), !e.lockedRemoveReferenceFile) {
                        e.lockedRemoveReferenceFile = !0, $(".reference-files > span.selected-reference-files-loader").remove(), $(".reference-files").append('<span class="selected-reference-files-loader"><img src="/static/assets/pt_old/images/loading.gif" alt="" width="16" /></span>');
                        var n = $(this).data("file-uri");
                        $.post(e.removeProposalReferenceFiles, {
                            fileUri: n,
                            proposalId: e.proposalId
                        }, function(t) {
                            t.success && $('ul li a[data-file-uri="' + n + '"]').closest("li").remove(), $(".reference-files > span.selected-reference-files-loader").remove(), e.lockedRemoveReferenceFile = !1
                        })
                    }
                };
                $(".order-reference-files .order-reference-file-remove").on("click", t), $(".reference-files #referenceFiles").on("change", function() {
                    $(".reference-files button").prop("disabled", !0);
                    var i = $(this)[0].files;
                    $(".reference-files > span.selected-reference-files-loader").remove(), $(".reference-files").append('<span class="selected-reference-files-loader"><img src="/static/assets/pt_old/images/loading.gif" alt="" width="16" /></span>');
                    var r = new FormData;
                    r.append("proposalId", e.proposalId);
                    for (var o = 0; o < i.length; o++) {
                        var a = i[o];
                        r.append("referenceFiles[]", a, a.name)
                    }
                    $.ajax({
                        url: e.addProposalReferenceFiles,
                        data: r,
                        type: "POST",
                        contentType: !1,
                        processData: !1,
                        success: function(i) {
                            if ($(".reference-files button").prop("disabled", !1), i.success) $(".reference-files > span.selected-reference-files-loader").remove(), $(".order-reference-files-wrapper").remove(), $(".reference-files").after(i.referenceFilesHtml), $(".order-reference-files .order-reference-file-remove").off("click"), $(".order-reference-files .order-reference-file-remove").on("click", t);
                            else {
                                var r;
                                r = "undefined" == typeof e.translations[i.errorMessage] ? i.errorMessage : e.translations[i.errorMessage], AlertModal.show({
                                    title: e.translations.ERROR_MESSAGE_STATIC_PAGE,
                                    text: r,
                                    showCancelButton: !1,
                                    confirmButtonText: e.translations.OK_BUTTON,
                                    id: "addOrderRefenceFilesError",
                                    callback: function() {
                                        $("#addOrderRefenceFilesError").modal("hide")
                                    }
                                }), $("#addOrderRefenceFilesError").off("hidden.bs.modal"), $("#addOrderRefenceFilesError").on("hidden.bs.modal", function() {
                                    n()
                                })
                            }
                        }
                    })
                });
                var n = function() {
                    $("input#referenceFiles").val(""), $(".reference-files .selected-reference-files-loader").remove()
                }
            },
            a = function() {
                var e = $('input[name^="extraService_"][data-name="NOTARISATION"]'),
                    t = $('input[name^="extraService_"][data-name="CARGO_DELIVERY"]'),
                    n = $('input[name^="extraService_"][data-name="APOSTILLE"]');
                e.click(function() {
                    e.is(":checked") && t.length > 0 && !t.is(":checked") && t.prop("checked", !0), e.is(":checked") || n.prop("checked", !1)
                }), n.click(function() {
                    n.is(":checked") && e.length > 0 && !e.is(":checked") && e.trigger("click")
                })
            },
            s = function(t) {
                var n = $("#orderBox .kalemler"),
                    i = $("#orderBox .toplam");
                if (i.find("span").text(t.amountFormatted), t.priceDiscountFormatted ? (n.find(".protrans span").text("-" + t.priceDiscountFormatted), n.find(".protrans").show()) : (n.find(".protrans span").text(""), n.find(".protrans").hide()), t.discountFormatted ? (n.find(".turkcell span").text("-" + t.discountFormatted), n.find(".turkcell").show(), $("#ptOK").prop("checked", !t.campaignDiscountUsed), $("#turkcellOK").prop("checked", t.campaignDiscountUsed)) : (n.find(".turkcell span").text(""), n.find(".turkcell").hide(), $("#ptOK, #turkcellOK").prop("checked", !1)), n.find(".extras").html("").hide(), Object.keys(t.extraServices).length > 0) {
                    for (var r in t.extraServices) n.find(".extras").append('<p class="kargo">' + r + '<span class="pull-right">+' + t.extraServices[r] + "</span></p>").show();
                    n.find(".extras .kargo").show()
                }
                if (t.estimatedDateFormatted) {
                    var o = e.translations.ESTIMATED_DUE_DATE + ": <strong>" + t.estimatedDateFormatted + "</strong>";
                    $("#orderBox .workList").find(".trDate").html(o).show()
                }
                Summary.adjustVisibility(), t.isImageRequested ? $("#orderBox .workList").find(".imageRequest").show() : $("#orderBox .workList").find(".imageRequest").hide(), e.isTranslationServiceType || (n.find(".trLanguages").hide(), n.find(".trProf").hide())
            },
            l = function() {
                Summary.displayTotalsProgress(), $.post(e.updateProposal, $("#proposalForm").serialize()).done(function(e) {
                    e.success ? (s(e), e.liveChatData && c(e.liveChatData), Summary.hideTotalsProgress()) : e.redirectUrl && (window.location.href = e.redirectUrl)
                })
            },
            c = function(e) {
                "function" == typeof LiveChatService.setVisitorNotesForChat && LiveChatService.setVisitorNotesForChat(e)
            },
            d = function(n) {
                $.extend(e, n), Summary.init({
                    mainFormId: "proposalForm",
                    ajaxCallback: s,
                    voucherLink: n.applyProposalVoucher,
                    turkcellIstekazanCampaignType: e.turkcellIstekazanCampaignType,
                    pageObject: Proposal
                }), t()
            };
        return {
            init: d,
            recalculate: l
        }
    }(),
    Account = function() {
        var e = {
                corporateBillingId: 0,
                isUserAvailable: 0,
                messageSlideUpSecond: 8e3,
                whiteListPath: null,
                urls: [],
                text: []
            },
            t = function() {
                i(), n(), a(), r(), o(), s(), c(), d(), p(), f(), h()
            },
            n = function() {
                var e = $(".balance-form");
                0 !== e.length && (e.find("#amount").mask("0#", {
                    onChange: function(e) {}
                }), e.find(".btn").click(function(t) {
                    t.preventDefault(), location.href = e.attr("action") + e.find("#amount").val()
                }))
            },
            i = function() {
                var e = $(".account-form");
                0 === e.length
            },
            r = function() {
                $("#fixBlacklist").click(function(t) {
                    t.preventDefault();
                    var n = $("#comment").val(),
                        i = $("#ePosta").val(),
                        r = {
                            comment: n,
                            email: i
                        };
                    $.post(e.whiteListPath, r).done(function(e) {
                        1 == e.success && location.reload()
                    })
                })
            },
            o = function() {
                $(".hesapEkle").click(function(e) {
                    e.preventDefault(), $(this).hasClass("addingAccount") ? $(this).removeClass("addingAccount") : $(this).addClass("addingAccount"), $(".newAccountLine td").toggle()
                });
                var e = function() {
                    var e = $("#banksList").find('input[checked="checked"]').val();
                    $("#default").val("1" === e ? $(".newAccountLine #iban").val() : e), "1" !== e && $(".banks-form").submit()
                };
                $(".removeThis").click(function(t) {
                    t.preventDefault(), $(this).closest("tr").remove(), e()
                }), $(".recordAccount input[type=submit]").click(function(t) {
                    e()
                }), $("#banksList .radius").click(function() {
                    $("#banksList").find('input[checked="checked"]').removeAttr("checked"), $("#banksList .radius.checked").removeClass("checked"), $(this).addClass("checked").find("input").attr("checked", "checked"), e()
                })
            },
            a = function() {
                l(), $("input[name=billingType]").change(function() {
                    l()
                })
            },
            s = function() {
                0 != $(".availability-form").length && ($("#bs").bootstrapSwitch(), $("#bs").bootstrapSwitch("state", e.isUserAvailable, !0), $("#bs").on("switchChange.bootstrapSwitch", function(t, n) {
                    $(".status").find("span").hide();
                    var i = n ? 0 : 1;
                    $.post(e.urls.updateAvailability, {
                        available: i
                    }).done(function(e) {
                        var t = $.parseJSON(e);
                        t.success && (i ? $(".status").find("span.available").show() : $(".status").find("span.unavailable").show())
                    })
                }))
            },
            l = function() {
                $("input[name=billingType]").length > 0 && ($("input[name=billingType]:checked").val() == e.corporateBillingId ? ($("#myAcc .radius.checked").removeClass("checked"), $("#kurumsalF").prop("checked", !0).closest(".radius").addClass("checked"), $(".corporate-container").find("input,textarea,select").prop("disabled", !1), $(".corporate-container").show(), $(".personal-container").find("label.error").remove(), $(".personal-container").find("input,textarea,select").prop("disabled", !0), $(".personal-container").hide()) : ($("#myAcc .radius.checked").removeClass("checked"), $("#bireyselF").prop("checked", !0).closest(".radius").addClass("checked"), $(".personal-container").find("input,textarea,select").prop("disabled", !1), $(".personal-container").show(), $(".corporate-container").find("label.error").remove(), $(".corporate-container").find("input,textarea,select").prop("disabled", !0), $(".corporate-container").hide()))
            },
            c = function() {
                $(".save-paypal-account-email").on("click", function(t) {
                    t.preventDefault();
                    var n = $("#paypal_account_email");
                    if (!n.hasClass("error")) {
                        var i = $("#paypal_account_email").val();
                        $("#messages").html("").show(), $.post(e.urls.updatePayPalAccountEmail, {
                            paypal_account_email: i
                        }, function(t) {
                            var n = JSON.parse(t);
                            if (n.success === !0) {
                                var i = '<div class="alert alert-success fade in mt-2">\n                        <span class="glyphicon glyphicon-alert" aria-hidden="true"></span><p>' + e.text.successPayPalAccountEmailUpdated + "</p>\n                    </div>";
                                $("#messages").html(i).delay(e.messageSlideUpSecond).slideUp(400, function() {
                                    $(this).html("").show()
                                })
                            }
                        })
                    }
                })
            },
            d = function() {
                u(), $('input[name="customerType"]').on("change", function() {
                    u()
                })
            },
            u = function() {
                $("input[name=customerType]").length > 0 && (1 == $("input[name=customerType]:checked").val() ? ($("#myAcc .radius.checked").removeClass("checked"), $("#business").prop("checked", !0).closest(".radius").addClass("checked"), $(".business-customer-container").find("input,textarea,select").prop("disabled", !1), $(".business-customer-container").show()) : ($("#myAcc .radius.checked").removeClass("checked"), $("#personal").prop("checked", !0).closest(".radius").addClass("checked"), $(".business-customer-container").find("label.error").remove(), $(".business-customer-container").find("input,textarea,select").prop("disabled", !0), $(".business-customer-container").hide()))
            },
            p = function() {
                if ($("#pushNotification").length > 0) {
                    var e = Push.getNotificationStatus();
                    $("#pushNotification").prop("checked", e)
                }
            },
            f = function() {
                $("#pushNotification").length > 0 && $("#pushNotification").on("change", function() {
                    $("#pushNotification").parent().find(".fa-spin").removeClass("d-none"), $(this).prop("checked") ? Push.changeNotificationStatus(!0).then(function() {
                        $("#pushNotification").parent().find(".fa-spin").addClass("d-none")
                    })["catch"](function() {
                        $("#pushNotification").parent().find(".fa-spin").addClass("d-none"), $("#pushNotification").prop("checked", !1)
                    }) : Push.changeNotificationStatus(!1).then(function() {
                        $("#pushNotification").parent().find(".fa-spin").addClass("d-none")
                    })["catch"](function() {
                        $("#pushNotification").parent().find(".fa-spin").addClass("d-none"), $("#pushNotification").prop("checked", !1)
                    })
                })
            },
            h = function() {
                $("#saveTranslatorAccount").click(function(t) {
                    t.preventDefault(), $("#pushNotification").prop("checked") || $("#Keposta").prop("checked") ? $("form.translatorAccount").submit() : AlertModal.show({
                        title: e.text.warning,
                        text: e.text.notifyCloseConfirm,
                        cancelButtonText: e.text.cancel,
                        confirmButtonText: e.text.yes,
                        id: "removeExamConfirmAlert",
                        callback: function() {
                            $("form.translatorAccount").submit()
                        }
                    })
                })
            },
            m = function() {
                $("body").find("#billingType-error").length > 0 && $("#billingType-error").appendTo($(".faturaBilgi"))
            },
            g = function() {
                var t = $("form.account-form");
                0 !== t.length && t.validate({
                    errorPlacement: function(e, t) {
                        e.insertAfter(t), m()
                    },
                    success: function(e, t) {
                        e.insertAfter(t).removeClass("error").addClass("valid"), m()
                    },
                    rules: {
                        fullName: {
                            required: !0
                        },
                        phoneCode: {
                            required: !0
                        },
                        phoneNumber: {
                            required: !0,
                            remote: {
                                url: e.urls.validatePhone,
                                type: "post",
                                data: {
                                    phoneCode: function() {
                                        return $("select[name=countryCode]").val()
                                    },
                                    phoneNumber: function() {
                                        return $("input[name=phoneNumber]").val()
                                    }
                                }
                            }
                        },
                        email: {
                            required: !0,
                            email: !0
                        },
                        billingAddress: {
                            required: "#kurumsalF:checked"
                        },
                        billingTaxOffice: {
                            required: !0
                        },
                        billingTaxNumber: {
                            required: "#kurumsalF:checked"
                        },
                        billingCompany: {
                            required: !0
                        },
                        companyName: {
                            required: !0
                        }
                    },
                    messages: {
                        fullName: {
                            required: e.translations.FULLNAME_REQUIRED
                        },
                        phoneCode: {
                            required: ""
                        },
                        phoneNumber: {
                            required: e.translations.PHONE_NUMBER_REQUIRED,
                            remote: e.translations.PHONE_NUMBER_INVALID
                        },
                        email: {
                            required: e.translations.EMAIL_REQUIRED,
                            email: e.translations.EMAIL_INVALID
                        },
                        billingAddress: {
                            required: e.translations.ADDRESS_REQUIRED
                        },
                        billingTaxOffice: {
                            required: e.translations.TAX_OFFICE_REQUIRED
                        },
                        billingTaxNumber: {
                            required: e.translations.TAX_NUMBER_REQUIRED
                        },
                        billingCompany: {
                            required: e.translations.COMPANY_NAME_REQUIRED
                        },
                        companyName: {
                            required: e.translations.COMPANY_NAME_REQUIRED
                        }
                    }
                })
            },
            v = function() {
                var t = $("form.banks-form");
                0 !== t.length && t.validate({
                    errorPlacement: function(e, t) {
                        e.insertAfter(t)
                    },
                    success: function(e) {
                        e.removeClass("error").addClass("valid")
                    },
                    rules: {
                        "name[]": {
                            required: !0
                        },
                        "iban[]": {
                            required: !0
                        }
                    },
                    messages: {
                        "name[]": {
                            required: e.translations.REQUIRED
                        },
                        "iban[]": {
                            required: e.translations.REQUIRED
                        }
                    }
                })
            },
            y = function(n) {
                $.extend(e, n), t(), g(), v()
            };
        return {
            init: y
        }
    }(),
    Register = function() {
        var e = {
                isFileUpload: !1,
                translations: {}
            },
            t = function() {
                var e = $("form");
                0 !== e.length && e.find(".select2-container").click(function() {
                    $(this).parent().find("label:not(.error)").addClass("focused")
                })
            },
            n = function() {
                var e = $(".joinorlogin-form");
                0 !== e.length && e.find(".formSwitcher").click(function(e) {
                    e.preventDefault(), $("#joinForm, #loginForm").slideToggle()
                })
            },
            i = function() {
                var t = $("form.newtranslator-form");
                0 !== t.length && (r(), o(), t.on("submit", function(t) {
                    if (!e.isFileUpload) return $(".missing-cv-file").remove(), $("#fileInfo").after('<p class="alert alert-danger missing-cv-file">' + e.translations.UPLOAD_YOUR_CV + "</p>"), !1
                }))
            },
            r = function() {
                function e() {
                    n.clone().appendTo("#selectLang"), t++, $("#selectLang").find(".duplicateMe:last #fromLang").attr("id", "fromLang" + t).attr("name", "fromLanguage[" + t + "]"), $("#selectLang").find(".duplicateMe:last #toLang").attr("id", "toLang" + t).attr("name", "toLanguage[" + t + "][]"), $("#selectLang").find(".duplicateMe:last .certifiedWR input").attr("id", "certified" + t).attr("name", "certified[" + t + "]"), $("#selectLang").find(".duplicateMe:last .certifiedWR label").attr("for", "certified" + t), $("#selectLang").find(".duplicateMe:last .certifiedWR input.certified_checkbox").attr("id", "certified" + t), $("#selectLang").find(".duplicateMe:last #certified").prop("checked", !1), $("#selectLang").find(".duplicateMe:last select.fromLang").val(""), $("#selectLang").find(".duplicateMe:last select.fromLang option:selected").removeAttr("selected"), $("#selectLang").find(".duplicateMe:last select.toLang").val(""), $("#selectLang").find(".duplicateMe:last select.toLang option:selected").removeAttr("selected"), $("#selectLang").find('.duplicateMe:last label[for="fromLang"]').attr("for", "fromLang" + t), $("#selectLang").find('.duplicateMe:last label[for="toLang"]').attr("for", "toLang" + t)
                }
                var t = $('input[name="addId"]').val(),
                    n = $("#selectLang").find(".duplicateMe:first"),
                    i = 152 * parseInt(t);
                t > 0 && $("#eraseThis").show(), $("#duplicateThis").click(function() {
                    e(), $("#selectLang select").select2({
                        minimumResultsForSearch: 1,
                        width: null
                    }), $("#eraseThis").show(), $(".duplicateMe:last .form-group").find(".select2-container--default:last").remove(), i += 146, $(".parallax-mirror").css({
                        "margin-top": i + "px"
                    })
                }), $("#eraseThis").click(function() {
                    t--, $("#selectLang").find(".duplicateMe:last").remove(), 1 == $("body").find(".duplicateMe").length && $("#eraseThis").hide(), i -= 146, $(".parallax-mirror").css({
                        "margin-top": i + "px"
                    })
                })
            },
            o = function() {
                $("#fileUpload").click(function() {
                    $("#hiddenUpload").click().change(function() {
                        $("#fileInfo").addClass("fileSelected"), $("#selectedFileName").addClass("fileSelected").text($("#hiddenUpload").val().split("\\").pop()), e.isFileUpload = !0, $(".missing-cv-file").remove()
                    })
                }), $("#fileRemove").click(function() {
                    $("#selectedFileName").text(""), $(".fileSelected").removeClass("fileSelected")
                })
            },
            a = function() {
                s(), $('input[name="customerType"]').on("change", function() {
                    s()
                })
            },
            s = function() {
                $("input[name=customerType]").length > 0 && (1 == $("input[name=customerType]:checked").val() ? ($("#kayitForm .radius.checked").removeClass("checked"), $("#business").prop("checked", !0).closest(".radius").addClass("checked"), $(".business-customer-container").find("input,textarea,select").prop("disabled", !1), $(".business-customer-container").show()) : ($("#kayitForm .radius.checked").removeClass("checked"), $("#personal").prop("checked", !0).closest(".radius").addClass("checked"), $(".business-customer-container").find("label.error").remove(), $(".business-customer-container").find("input,textarea,select").prop("disabled", !0), $(".business-customer-container").hide()))
            },
            l = function() {
                var t = "form.newuser-form",
                    n = "form.kayitol.joinorlogin-form",
                    i = $(t).length > 0 ? t : $(n).length > 0 ? n : null;
                if (null !== i) {
                    var r = $(i);
                    r.validate({
                        errorPlacement: function(e, t) {
                            var n = t;
                            $(t).next() && "greenCheck" === $(t).next().attr("class") && (n = $(t).next()), e.insertAfter(n)
                        },
                        success: function(e, t) {
                            var n = t;
                            $(t).next() && "greenCheck" === $(t).next().attr("class") && (n = $(t).next()), e.insertAfter(n).removeClass("error").addClass("valid")
                        },
                        rules: {
                            fullName: {
                                required: !0
                            },
                            phoneCode: {
                                required: !0
                            },
                            phoneNumber: {
                                required: !0,
                                remote: {
                                    url: e.urls.validatePhone,
                                    type: "post",
                                    data: {
                                        phoneCode: function() {
                                            return $("select[name=countryCode]").val()
                                        },
                                        phoneNumber: function() {
                                            return $("input[name=phoneNumber]").val()
                                        }
                                    }
                                }
                            },
                            password: {
                                required: !0,
                                minlength: 6
                            },
                            password2: {
                                required: !0,
                                equalTo: i + " #sifre"
                            },
                            email: {
                                required: !0,
                                email: !0
                            },
                            eula: {
                                required: !0
                            },
                            companyName: {
                                required: !0
                            }
                        },
                        messages: {
                            fullName: {
                                required: e.translations.FULLNAME_REQUIRED
                            },
                            phoneCode: {
                                required: ""
                            },
                            phoneNumber: {
                                required: e.translations.PHONE_NUMBER_REQUIRED,
                                remote: e.translations.PHONE_NUMBER_INVALID
                            },
                            password: {
                                required: e.translations.PASSWORD_REQUIRED,
                                minlength: e.translations.PASSWORD_MINLENGTH
                            },
                            password2: {
                                required: " ",
                                equalTo: e.translations.PASSWORD_MUST_MATCH
                            },
                            email: {
                                required: e.translations.EMAIL_REQUIRED,
                                email: e.translations.EMAIL_INVALID
                            },
                            eula: {
                                required: e.translations.AGREEMENT_APPROVAL_REQUIRED
                            },
                            companyName: {
                                required: e.translations.COMPANY_NAME_REQUIRED
                            }
                        }
                    })
                }
            },
            c = function(e) {
                e.find("select").each(function(t) {
                    var n = $(this).attr("name");
                    n.indexOf("[]") > 0 && $(this).on("change", function() {
                        e.validate().element('select[name="' + n + '"]')
                    })
                })
            },
            d = function() {
                var t = "form.newtranslator-form",
                    n = $(t);
                0 !== n.length && (n.validate({
                    errorPlacement: function(e, t) {
                        e.insertAfter(t)
                    },
                    success: function(e, t) {
                        e.insertAfter(t).removeClass("error").addClass("valid")
                    },
                    rules: {
                        fullName: {
                            required: !0
                        },
                        email: {
                            required: !0,
                            email: !0
                        },
                        password: {
                            required: !0,
                            minlength: 6
                        },
                        phoneCode: {
                            required: !0
                        },
                        phoneNumber: {
                            required: !0,
                            remote: {
                                url: e.urls.validatePhone,
                                type: "post",
                                data: {
                                    phoneCode: function() {
                                        return $("select[name=countryCode]").val()
                                    },
                                    phoneNumber: function() {
                                        return $("input[name=phoneNumber]").val()
                                    }
                                }
                            }
                        },
                        country: {
                            required: !0
                        },
                        university: {
                            required: !0
                        },
                        department: {
                            required: !0
                        },
                        "qualityType[]": {
                            minItems: 1
                        }
                    },
                    messages: {
                        fullName: {
                            required: e.translations.FULLNAME_REQUIRED
                        },
                        email: {
                            required: e.translations.EMAIL_REQUIRED,
                            email: e.translations.EMAIL_INVALID
                        },
                        password: {
                            required: e.translations.PASSWORD_REQUIRED,
                            minlength: e.translations.PASSWORD_MINLENGTH
                        },
                        phoneCode: {
                            required: ""
                        },
                        phoneNumber: {
                            required: e.translations.PHONE_NUMBER_REQUIRED,
                            remote: e.translations.PHONE_NUMBER_INVALID
                        },
                        country: {
                            required: e.translations.COUNTRY_REQUIRED
                        },
                        "qualityType[]": {
                            minItems: e.translations.INTERPRETION_QUALITY_REQUIRED
                        }
                    }
                }), c(n))
            },
            u = function() {
                var t = $("form.customer-form");
                0 !== t.length && t.validate({
                    errorPlacement: function(e, t) {
                        e.insertAfter(t)
                    },
                    success: function(e, t) {
                        e.insertAfter(t).removeClass("error").addClass("valid")
                    },
                    rules: {
                        fullName: {
                            required: !0
                        },
                        phoneCode: {
                            required: !0
                        },
                        phoneNumber: {
                            required: !0,
                            remote: {
                                url: e.urls.validatePhone,
                                type: "post",
                                data: {
                                    phoneCode: function() {
                                        return $("select[name=countryCode]").val()
                                    },
                                    phoneNumber: function() {
                                        return $("input[name=phoneNumber]").val()
                                    }
                                }
                            }
                        },
                        email: {
                            required: !0,
                            email: !0
                        },
                        fileLanguageId: {
                            required: !0
                        },
                        "interpretLanguageId[]": {
                            required: !0
                        }
                    },
                    messages: {
                        fullName: {
                            required: e.translations.FULLNAME_REQUIRED
                        },
                        phoneCode: {
                            required: ""
                        },
                        phoneNumber: {
                            required: e.translations.PHONE_NUMBER_REQUIRED,
                            remote: e.translations.PHONE_NUMBER_INVALID
                        },
                        email: {
                            required: e.translations.EMAIL_REQUIRED,
                            email: e.translations.EMAIL_INVALID
                        },
                        fileLanguageId: {
                            required: e.translations.TARGET_LANGUAGE_REQUIRED
                        },
                        "interpretLanguageId[]": {
                            required: e.translations.TARGET_LANGUAGE_REQUIRED
                        }
                    }
                })
            },
            p = function(r) {
                $.extend(e, r), t(), n(), i(), a(), l(), d(), u()
            };
        return {
            init: p
        }
    }(),
    Login = function() {
        var e = {
                paths: {},
                translations: {}
            },
            t = function(t) {
                $.extend(e, t), r(), n(), i()
            },
            n = function() {
                var t = $("form.login-form, form.login.joinorlogin-form");
                0 !== t.length && t.validate({
                    errorPlacement: function(e, t) {
                        e.insertAfter(t)
                    },
                    success: function(e) {
                        e.removeClass("error").addClass("valid")
                    },
                    rules: {
                        email: {
                            required: !0,
                            email: !0
                        },
                        password: {
                            required: !0
                        }
                    },
                    messages: {
                        email: {
                            required: e.translations.EMAIL_REQUIRED,
                            email: e.translations.EMAIL_INVALID
                        },
                        password: {
                            required: e.translations.PASSWORD_REQUIRED
                        }
                    }
                })
            },
            i = function() {
                var t = $("form.remind-form");
                0 !== t.length && t.validate({
                    errorPlacement: function(e, t) {
                        e.insertAfter(t)
                    },
                    success: function(e) {
                        e.removeClass("error").addClass("valid")
                    },
                    rules: {
                        email: {
                            required: !0,
                            email: !0
                        }
                    },
                    messages: {
                        email: {
                            required: e.translations.EMAIL_REQUIRED,
                            email: e.translations.EMAIL_INVALID
                        }
                    }
                })
            },
            r = function() {
                $("a#forgotPassword").click(function(t) {
                    t.preventDefault();
                    var n = $("#ePostaLogin").val(),
                        i = e.paths.forgot_password;
                    "" !== n ? location.href = i + "?email=" + n : location.href = i
                })
            };
        return {
            init: t
        }
    }(),
    User = function() {
        var e = {
                language: null,
                allAssignmentsCompleted: !1,
                allowToBypassProjectWarnings: !1,
                instructionsConfirm: !1,
                instructionsWarning: !1,
                lexiqaIsEnabled: !1,
                isAppraisalOrder: !1,
                messages: [],
                Urls: {}
            },
            t = function() {
                d(), c(), l(), r(), a(), o(), h(), C(), g(), b(), y(), v(), p(), f(), u(), n(), x()
            },
            n = function() {
                var t = !1,
                    n = $("form.workdetail-form");
                $("#reviewAgain").click(function() {
                    $("#translatorInstructionWarningsModal").modal("hide")
                }), $("#submitTranslation").click(function() {
                    t = !0, n.submit()
                }), n.submit(function(n) {
                    if (0 == t && 1 == e.instructionsWarning) return $("#translatorInstructionWarningsModal").modal({
                        show: !0
                    }), n.preventDefault(), !1
                })
            },
            r = function() {
                $(".removeThis").click(function(t) {
                    t.preventDefault();
                    var n = $(this);
                    $.post(e.Urls.removeInterpreterLanguages, {
                        interpreterLanguageId: n.attr("id")
                    }).done(function(t) {
                        var i = $.parseJSON(t),
                            r = 0;
                        i.subqualityCount > 0 ? alert(e.messages.removeInterpreterLanguageError) : i.appraisalCount > 0 ? confirm(e.messages.removeInterpreterLanguageConfirm) && (r = 1) : r = 1, 1 == r && (n.parents("tr").find("input").val(""), $("#newLanguageForm").submit())
                    })
                })
            },
            o = function() {
                var t = $("#detailedList ul.translations");
                if (0 !== t.find("li[data-cat-job-id]").length) {
                    var n = t.data("cat-project-id"),
                        i = [];
                    t.find("li[data-cat-job-id]").each(function() {
                        i.indexOf($(this).data("cat-job-id")) < 0 && i.push($(this).data("cat-job-id"))
                    }), i.length > 0 && setTimeout(function() {
                        o()
                    }, 6e5), $(i).each(function() {
                        var i = this;
                        $.post(e.Urls.loadCatJobStatus, {
                            projectId: n,
                            jobId: i
                        }).done(function(n) {
                            var i = $.parseJSON(n),
                                r = i.JobId + "-" + i.Password,
                                o = t.find("li[data-cat-job-id=" + r + "] .catstatus"),
                                a = "tr" === e.language ? "%" + i.ProgressPercentage : i.ProgressPercentage + "%";
                            o.html($("#jobCompletedPercentageText").val() + ": <strong>" + a + "</strong>").removeClass("alert-warning").addClass("alert-" + (100 == i.ProgressPercentage ? "success" : "warning"))
                        })
                    })
                }
            },
            a = function() {
                0 !== $("#detailedList ul.translations .catdownload").length && $("#detailedList ul.translations .catdownload").click(function(e) {
                    e.preventDefault(), confirm($("#incompleteTranslationWarning").val()) && (window.location.href = $(this).attr("href"))
                })
            },
            s = function() {
                function e(e, t) {
                    e.textContent = t
                }
                var t, n = $('input[type="range"]');
                n.rangeslider({
                    polyfill: !1,
                    onInit: function() {
                        t = $(".rangeslider__handle", this.$range), e(t[0], this.value), $("form.proof-form input[name=score]").val(this.value)
                    }
                }).on("input", function() {
                    e(t[0], this.value), $("form.proof-form input[name=score]").val(this.value), $("form.proof-form").valid()
                }), $('input[type="range"]').rangeslider()
            },
            l = function() {
                var t = $("form.proof-form");
                if (0 !== t.length) {
                    s();
                    var n = !1;
                    $("#reviewAgain").click(function() {
                        $("#translatorInstructionWarningsModal").modal("hide")
                    }), $("#submitTranslation").click(function() {
                        n = !0, t.submit()
                    }), t.submit(function(i) {
                        return t.find("input[type=file]").length > 0 && t.valid() && "" == t.find("input[type=file]").val() && t.find("input[name=score]").val() < 10 && !1 === e.isAppraisalOrder ? (alert(e.messages.fileUploadingRequired), i.preventDefault(), !1) : t.valid() && n === !1 && 1 == e.instructionsWarning ? ($("#translatorInstructionWarningsModal").modal({
                            show: !0
                        }), i.preventDefault(), !1) : void 0
                    }), t.find("a[name=fileUpload]").click(function(e) {
                        e.preventDefault();
                        var t = $(this).parent(),
                            n = t.find("input[type=file]");
                        n.click().change(function() {
                            t.find(".fileInfo").addClass("fileSelected"), t.find(".selectedFileName").addClass("fileSelected").text(n.val().split("\\").pop())
                        })
                    })
                }
            },
            c = function() {
                function e() {
                    i.clone().appendTo("#selectLang").show(), o++, $("#selectLang").find(".duplicateMe:last #fromLang").attr("id", "fromLang" + o).attr("name", "fromLanguage[" + o + "]"), $("#selectLang").find(".duplicateMe:last #toLang").attr("id", "toLang" + o).attr("name", "toLanguage[" + o + "][]"), $("#selectLang").find('.duplicateMe:last label[for="fromLang"]').attr("for", "fromLang" + o), $("#selectLang").find('.duplicateMe:last label[for="toLang"]').attr("for", "toLang" + o)
                }

                function t() {
                    var e = 0;
                    e = $("body").width() > 1024 ? 120 : $("body").width() <= 1023 && $("body").width() > 991 ? 122 : 237;
                    var t = r + ($(".duplicateMe:visible").length - 1) * e;
                    $("#duplicateThis").css("top", t), $("#eraseThis").show().css("top", t), 2 == $("body").find(".duplicateMe").length && $("#eraseThis").hide()
                }
                var n = $("form.languages-form");
                if (0 !== n.length) {
                    var i = $("#selectLang").find(".duplicateMe:first"),
                        r = 20,
                        o = 0;
                    t(), $("#duplicateThis").click(function() {
                        e(), $("#selectLang select").select2({
                            minimumResultsForSearch: -1,
                            width: null
                        }), t(), $(".duplicateMe:last .form-group").find(".select2-container--default:last").remove()
                    }), $("#eraseThis").click(function() {
                        o--, $("#selectLang").find(".duplicateMe:last").remove(), t()
                    })
                }
            },
            d = function() {
                var e = $("form.workdetail-form");
                0 !== e.length && (e.find("a[name=fileUpload]").click(function(e) {
                    e.preventDefault();
                    var t = $(this).parent(),
                        n = t.find("input[type=file]");
                    n.click().change(function() {
                        t.find(".fileInfo").addClass("fileSelected"), t.find(".selectedFileName").addClass("fileSelected").text(n.val().split("\\").pop())
                    })
                }), $("#leaveTranslationJobButton").on("click", function() {
                    $("#leaveTranslationJobModal").modal()
                }), $("#leaveTranslationJobModal").on("show.bs.modal", function() {
                    var e = $("#leaveTranslationJobModal").find('input[name="leaveTranslationJob"]').is(":checked");
                    $("#leaveTranslationJobModal").find("button").prop("disabled", !e)
                }), $("#leaveTranslationJobModal").find('input[name="leaveTranslationJob"]').on("click", function() {
                    var e = $("#leaveTranslationJobModal").find('input[name="leaveTranslationJob"]').is(":checked");
                    $("#leaveTranslationJobModal").find("button").prop("disabled", !e)
                }))
            },
            u = function() {
                $(document).keyup(function(e) {
                    27 == e.keyCode && void 0 !== $('div[id^="dtModal"]').data("bs.modal") && $('div[id^="dtModal"]').data("bs.modal").isShown && $('div[id^="dtModal"]').modal("hide")
                })
            },
            p = function() {
                var t;
                $("#customTag").select2({
                    tags: !0,
                    maximumSelectionLength: 5,
                    insertTag: function(e, n) {
                        t = n, e.push(n)
                    }
                }).on("select2:close", function(e) {
                    if (void 0 !== t && "" !== t.id) {
                        var n = $("#customTag").val();
                        n.push(t.id), $("#customTag").val(n), $("#customTag").trigger("change"), t = void 0
                    }
                }), $(".customTag button").click(function() {
                    var n = $("#customTag").val();
                    void 0 !== t && (n.push(t.id), $("#customTag").val(n), $("#customTag").trigger("change"), t = void 0), $(".customTag button").attr("disabled", !0), $.post(e.Urls.saveCustomTags, {
                        tags: n
                    }).done(function() {
                        $(".customTag button").attr("disabled", !1)
                    }).fail(function() {
                        $(".customTag button").attr("disabled", !1)
                    })
                })
            },
            f = function() {
                $("#closeTicketButton").on("click", function(t) {
                    t.preventDefault(), $.post(e.Urls.closeTicket, {}, function(e) {
                        e.success ? window.location.href = window.location.href : alert("Error!")
                    })
                })
            },
            h = function() {
                var t = $(".open-translation-expertise-modal"),
                    n = $("#translationExpertiseModal"),
                    i = $("form#orderInterpretionSubqualityForm"),
                    r = i.find("input.order_interpretion_subquality_option"),
                    o = 2,
                    a = $(".subqualities_wrapper").data("order-interpretion-subquality-count"),
                    s = $(".workdetail-form").find("input[type=submit]").data("incomplete-cat-jobs-exist");
                a > 0 ? 1 !== Number(s) ? ($(".workdetail-form").find("input[type=submit]").parent().tooltip("hide"), $(".proof-form").find("input[type=submit]").parent().tooltip("hide")) : m() : ($(".workdetail-form").find("input[type=submit]").parent().tooltip("show"), $(".proof-form").find("input[type=submit]").parent().tooltip("show")), t.on("click", function(e) {
                    c(e, $(this))
                }), r.on("click", function() {
                    l()
                }), i.find("button").on("click", function() {
                    var e = $(this);
                    e.prop("disabled", !0), $.post(i.attr("action"), i.serialize(), function(t) {
                        t.success === !0 && u(t.data.orderId), n.modal("hide"), e.prop("disabled", !1)
                    })
                }), n.on("show.bs.modal", function(e) {
                    l()
                });
                var l = function() {
                        var e = i.find("input.order_interpretion_subquality_option:checked").length;
                        e >= o ? (i.find("input.order_interpretion_subquality_option:not(:checked)").prop("disabled", !0), i.find("input.order_interpretion_subquality_option:not(:checked)").parent().css("opacity", .5)) : (i.find("input.order_interpretion_subquality_option:not(:checked)").prop("disabled", !1), i.find("input.order_interpretion_subquality_option:not(:checked)").parent().css("opacity", 1)), e > 0 && e <= o ? n.find("button[name=save]").prop("disabled", !1) : n.find("button[name=save]").prop("disabled", !0)
                    },
                    c = function(e, t) {
                        var i = t.data("quality-type-id");
                        n.find('.nav-tabs [data-id="quality_' + i + '"] a').click(), n.find(".tab-content .active").removeClass("active"), n.find(".tab-content #quality_" + i).addClass("active"), d(), n.modal("show")
                    },
                    d = function() {
                        i.find("input.order_interpretion_subquality_option:checked").length >= o ? (i.find("input.order_interpretion_subquality_option:not(:checked)").prop("disabled", !0), i.find("input.order_interpretion_subquality_option:not(:checked)").parent().css("opacity", .5)) : (i.find("input.order_interpretion_subquality_option:not(:checked)").prop("disabled", !1), i.find("input.order_interpretion_subquality_option:not(:checked)").parent().css("opacity", 1))
                    },
                    u = function(n) {
                        t.off("click"), r.off("click"), $.get(e.Urls.getOrderInterpretionSubqualities, {
                            orderId: n
                        }, function(t) {
                            if (1 == t.success) {
                                $(".subqualities_wrapper").html(t.html);
                                var n = $(".workdetail-form").find("input[type=submit]").data("incomplete-cat-jobs-exist");
                                if ($("#btnSave").attr("disabled", !1), 1 !== Number(n))
                                    if (t.count > 0) {
                                        var i = e.allAssignmentsCompleted;
                                        $(".workdetail-form").find("input[type=submit]").prop("disabled", i), $(".workdetail-form").find("input[type=submit]").parent().tooltip("hide"), $(".proof-form").find("input[type=submit]").prop("disabled", i), $(".proof-form").find("input[type=submit]").parent().tooltip("hide"), $(".subqualities_wrapper").attr("data-order-interpretion-subquality-count", t.count)
                                    } else $(".workdetail-form").find("input[type=submit]").prop("disabled", !0), $(".workdetail-form").find("input[type=submit]").parent().tooltip("show"), $(".proof-form").find("input[type=submit]").prop("disabled", !0), $(".proof-form").find("input[type=submit]").parent().tooltip("show");
                                else t.count > 0 && ($(".workdetail-form").find("input[type=submit]").parent().tooltip("hide"), $(".proof-form").find("input[type=submit]").parent().tooltip("hide"), $(".subqualities_wrapper").attr("data-order-interpretion-subquality-count", t.count), setTimeout(function() {
                                    m()
                                }, 1e3))
                            }
                            $(".open-translation-expertise-modal").on("click", function(e) {
                                c(e, $(this))
                            }), $("form#orderInterpretionSubqualityForm").find("input.order_interpretion_subquality_option").on("click", function(e) {
                                l()
                            })
                        })
                    }
            },
            m = function() {
                var t = $(".workdetail-form").find("input[type=submit]").attr("data-incomplete-cat-jobs-exist"),
                    n = $(".subqualities_wrapper").attr("data-order-interpretion-subquality-count");
                n > 0 ? 1 === Number(t) ? ($(".workdetail-form").find("input[type=submit]").parent().attr("data-original-title", e.messages.INCOMPLETE_CAT_JOBS_EXIST_MESSAGE), $(".workdetail-form").find("input[type=submit]").parent().tooltip("show")) : ($(".workdetail-form").find("input[type=submit]").prop("disabled", !1), $(".workdetail-form").find("input[type=submit]").parent().tooltip("hide")) : ($(".workdetail-form").find("input[type=submit]").parent().attr("data-original-title", e.messages.ERROR_NO_ORDER_INTERPRETION_SUBQUALITIES), $(".workdetail-form").find("input[type=submit]").parent().tooltip("show"))
            },
            g = function() {
                var t = $("a.refresh-cat-project-status");
                t.on("click", function(t) {
                    t.preventDefault(), $(this).hasClass("disabled") || (n(), $(this).find("i").addClass("icon-spinner"), $.get(e.Urls.checkCatProjectProgress, {}, function(t) {
                        for (i in t.jobs) {
                            var n = "tr" === e.language ? "%" + t.jobs[i] : t.jobs[i] + "%";
                            $('li.catjob[data-jobid="' + i + '"]').find(".catstatus strong").text(n), 100 === t.jobs[i] && ($('li.catjob[data-jobid="' + i + '"]').find(".catstatus.alert-warning").removeClass("alert-warning").addClass("alert-success"), $('li.catjob[data-jobid="' + i + '"]').find(".catstatus a").remove())
                        }
                        t.allJobsIsCompleted === !0 && ($(".workdetail-form").find("input[type=submit]").attr("data-incomplete-cat-jobs-exist", 0), m()), r()
                    }))
                });
                var n = function() {
                        $("a.refresh-cat-project-status").each(function(e) {
                            $(this).addClass("disabled"), $(this).css("opacity", .5)
                        })
                    },
                    r = function() {
                        $("a.refresh-cat-project-status").each(function(e) {
                            $(this).removeClass("disabled"), $(this).find("i").removeClass("icon-spinner"), $(this).css("opacity", 1)
                        })
                    }
            },
            v = function() {
                e.instructionsConfirm && ($("#instructionsApproveModal").modal({
                    backdrop: "static",
                    keyboard: !1,
                    show: !0
                }), $("#instructionsConfirmCheckbox").change(function() {
                    $(this).is(":checked") ? $("#instructionsApproveModalButton").removeAttr("disabled") : $("#instructionsApproveModalButton").attr("disabled", "disabled")
                }), $("#instructionsApproveModalButton").click(function() {
                    $("#instructionsApproveModalButton").attr("disabled", "disabled"), $.post(e.Urls.instructionsApproveUrl).done(function(e) {
                        e.success && ($("#instructionButton").show(), $("#instructionsApproveModal").modal("hide"), $('button[data-target="#translatorInstructionsModal"]').trigger("click")), $("#instructionsApproveModalButton").removeAttr("disabled")
                    })
                }))
            },
            y = function() {
                $("#allowToBypassProjectWarningsCheckbox").change(function(e) {
                    $("#projectWarningsModalSubmitButton").attr("disabled", !1 === $(e.target).prop("checked"))
                }), $("#projectWarningsModalSubmitButton").click(function() {
                    $("#allowToBypassProjectWarningsCheckbox").prop("checked") && $("#catWorkDetailForm").submit()
                })
            },
            b = function() {
                $("#catWorkDetailForm").submit(function(t) {
                    if (!1 === e.lexiqaIsEnabled) return !0;
                    if (t.preventDefault(), 0 !== $("#projectWarningsModal.modal.fade.in").length && $("#allowToBypassProjectWarningsCheckbox").prop("checked")) return $("#allowToBypassProjectWarningsCheckbox").prop("checked", !1), $("#projectWarningsModalCloseButton").attr("disabled", !0), $("#projectWarningsModalSubmitButton").attr("disabled", !0), t.currentTarget.submit(), !0;
                    var n = [];
                    $(".catjob").each(function() {
                        n.push($(this).data("jobid"))
                    }), $.get(e.Urls.getProjectWarnings, {
                        catJobIdentifiers: n.join(",")
                    }, function(e) {
                        return !1 === e.success ? (w(e.items), !1) : (t.currentTarget.submit(), !0)
                    })
                })
            },
            w = function(t) {
                $("#allowToBypassProjectWarningsCheckbox").prop("checked", !1), e.allowToBypassProjectWarnings ? ($("#allowToBypassProjectWarnings").show(), $("#projectWarningsModalOkButton").hide(), $("#projectWarningsModalCloseButton").show(), $("#projectWarningsModalSubmitButton").show(), $("#projectWarningsModalSubmitButton").attr("disabled", !0)) : ($("#allowToBypassProjectWarnings").hide(), $("#projectWarningsModalOkButton").show(), $("#projectWarningsModalCloseButton").hide(), $("#projectWarningsModalSubmitButton").hide()), $("#projectWarningsModal ul").html(""), $(t).each(function(t, n) {
                    var i = "<li>" + e.translations.incorrectSegmentMessage.replace("{incorrectSegmentCount}", n.IncorrectSegmentCount) + ' <a href="' + n.ReportUrl + '" target="_blank">' + e.translations.incorrectSegmentLink + "</a></li>";
                    $("#projectWarningsModal ul").append(i)
                }), $("#projectWarningsModal").modal("show")
            },
            C = function() {
                $textButtonElm = $(".report-incorrect-document-text-link"), $reportIncorrectDocumentModal = $("#reportIncorrectDocumentModal"), $reportIncorrectDocumentForm = $("#reportIncorrectDocumentForm"), $reportIncorrectDocumentCancelButton = $reportIncorrectDocumentForm.find('button[name="cancel"]'), $reportIncorrectDocumentSubmitButton = $reportIncorrectDocumentForm.find('button[name="save"]');
                var t = function() {
                        $reportIncorrectDocumentModal.modal("show")
                    },
                    n = function() {
                        $reportIncorrectDocumentModal.modal("hide")
                    };
                $textButtonElm.on("click", function() {
                    t()
                }), $reportIncorrectDocumentCancelButton.on("click", function() {
                    n()
                }), $reportIncorrectDocumentSubmitButton.on("click", function(t) {
                    t.preventDefault();
                    var n = $reportIncorrectDocumentForm.find('input[name="orderId"]').val(),
                        i = $reportIncorrectDocumentForm.find('input[name="reviewerUserId"]').val(),
                        r = $reportIncorrectDocumentForm.find('input[name="reviewerName"]').val(),
                        o = $reportIncorrectDocumentForm.find('input[name="reviewScore"]').val(),
                        a = $reportIncorrectDocumentForm.find('input[name="reviewFeedback"]').val(),
                        s = $reportIncorrectDocumentForm.find('input[name="interpreterUserId"]').val(),
                        l = $reportIncorrectDocumentForm.find('input[name="interpreterName"]').val(),
                        c = $reportIncorrectDocumentForm.find('textarea[name="report_incorrect_document_detail"]').val();
                    if ("" === c) $reportIncorrectDocumentForm.find('textarea[name="report_incorrect_document_detail"]').addClass("error");
                    else {
                        $reportIncorrectDocumentForm.find('textarea[name="report_incorrect_document_detail"]').removeClass("error"), $reportIncorrectDocumentCancelButton.prop("disabled", !0), $reportIncorrectDocumentSubmitButton.prop("disabled", !0);
                        var d = {
                            orderId: n,
                            reviewerUserId: i,
                            reviewerName: r,
                            score: o,
                            feedback: a,
                            interpreterUserId: s,
                            interpreterName: l,
                            reportDetail: c
                        };
                        $.post(e.Urls.reportIncorrectDocument, d, function(t) {
                            t.success === !0 && ($reportIncorrectDocumentForm.find(".row").hide(), $reportIncorrectDocumentForm.append('<p class="text-center">' + e.messages.REPORT_INCORRECT_DOCUMENT_SUCCESS_MESSAGE + "</p>"), $reportIncorrectDocumentForm.append('<div class="form-group text-center col-xs-12">\n                    <button class="btn btn-primary" type="button" data-dismiss="modal">' + e.messages.OK_BUTTON + "</button>\n                </div>"), $reportIncorrectDocumentModal.addClass("sent"), $("#supportLink").val(t.supportLink))
                        })
                    }
                }), $reportIncorrectDocumentModal.on("hide.bs.modal", function(e) {
                    $reportIncorrectDocumentModal.hasClass("sent") && setTimeout(function() {
                        $reportIncorrectDocumentCancelButton.prop("disabled", !1), $reportIncorrectDocumentSubmitButton.prop("disabled", !1), $reportIncorrectDocumentForm.find(".row").show(), $reportIncorrectDocumentForm.find(".success-message").remove(), $reportIncorrectDocumentModal.removeClass("sent"), window.location.href = $("#supportLink").val()
                    }, 500), $reportIncorrectDocumentForm.find('textarea[name="report_incorrect_document_detail"]').val(""), $reportIncorrectDocumentForm.find('textarea[name="report_incorrect_document_detail"]').removeClass("error")
                })
            },
            x = function() {
                var t = $("form.proof-form");
                0 !== t.length && t.validate({
                    ignore: [],
                    errorPlacement: function(e, t) {
                        "score" === $(t).attr("name") ? $(".rating-slider .rangeslider__handle").css("border", "2px solid red") : ($(t).css("border", "1px solid red"), $(t).closest("div").find(".prooferror").remove(), $(e).removeClass("error").addClass("prooferror"), e.insertAfter(t))
                    },
                    success: function(e, t) {
                        "score" === $(t).attr("name") ? $(".rating-slider .rangeslider__handle").css("border", "inherit") : ($(t).css("border", "1px solid #bdbdbd"), e.remove())
                    },
                    rules: {
                        score: {
                            required: !0,
                            number: !0,
                            minStrict: 1
                        },
                        feedback: {
                            required: !0,
                            minlength: 10
                        }
                    },
                    messages: {
                        score: {
                            required: " ",
                            number: " ",
                            minStrict: " "
                        },
                        feedback: {
                            required: e.messages.REQUIRED,
                            minlength: e.messages.DETAILED_INFORMATION_REQUIRED
                        }
                    }
                })
            },
            T = function(n) {
                $.extend(e, n), t()
            };
        return {
            init: T
        }
    }(),
    InterpreterExpertise = function() {
        var e = {
                urls: {},
                translations: {}
            },
            t = function() {
                if ($("#interpreterLanguageId > option").length > 0) {
                    var t = new URLSearchParams(window.location.search),
                        i = t.get("selectedInterpreterLanguageId"),
                        r = t.get("addInterpreterLanguage");
                    r && $("#addInterpreterLanguageModal").modal("show"), i ? ($("#interpreterLanguageId").val(i), $("#interpreterLanguageId").trigger("change")) : $("#interpreterLanguageId").prop("selectedIndex", 0), n()
                }
                $("#interpreterLanguageId").change(function() {
                    n()
                });
                var o = $("#addInterpreterLanguageModal form"),
                    a = o.find('select[name="fromLanguage[]"]').parent().find("span.select2-selection"),
                    s = o.find('select[name="toLanguage[]"]').parent().find("span.select2-selection");
                o.find('select[name="fromLanguage[]"]').on("change", function() {
                    a.removeClass("error-border")
                }), o.find('select[name="toLanguage[]"]').on("change", function() {
                    s.removeClass("error-border")
                }), o.on("submit", function(t) {
                    t.preventDefault();
                    var n = o.find('select[name="fromLanguage[]"]').val(),
                        i = o.find('select[name="toLanguage[]"]').val(),
                        r = !0;
                    a.removeClass("error-border"), s.removeClass("error-border"), o.find(".alert").remove(), "" === n && (a.addClass("error-border"), r = !1), "" === i && (s.addClass("error-border"), r = !1), !1 !== r && ($.post(e.urls.addInterpreterLanguage, o.serialize(), function(t) {
                        var n;
                        t.success ? t.redirect ? window.location.href = t.redirect : n = e.translations.INSERTING_NEW_LANGUAGE_PAIR_FAILED : n = e.translations[t.errorMessage], n && o.find("p.h1").after('<div class="alert alert-danger fade in"><span class="glyphicon glyphicon-alert"></span><p>' + n + "</p></div>")
                    }), $("#addInterpreterLanguageModal").on("hidden.bs.modal", function() {
                        o[0].reset(), o.find('select[name="fromLanguage[]"]').trigger("change"), o.find('select[name="toLanguage[]"]').trigger("change"), o.find(".alert").remove(), a.removeClass("error-border"), s.removeClass("error-border")
                    }))
                })
            },
            n = function() {
                $(".interpreter-expertise").html('<div style="text-align: center"><img src="/static/assets/pt_old/images/progress.gif" /></div>'), $(".form-group.language-pair-approval-status").remove(), $.post(e.urls.loadInterpreterExpertise, {
                    interpreterLanguageId: $("#interpreterLanguageId").val()
                }).done(function(t) {
                    var n = $.parseJSON(t);
                    $(".interpreter-expertise").html(n.html), n.interpreterLanguageApproved ? $(".form-group.language-pair").after('<div class="form-group language-pair-approval-status"><span class="approved-language-pair">' + e.translations.APPROVED + "</span></div>") : $(".form-group.language-pair").after('<div class="form-group language-pair-approval-status"><span class="unapproved-language-pair">' + e.translations.WAITING_FOR_APPROVAL + "</span></div>"), Main.initTooltips()
                })
            },
            i = function(n) {
                $.extend(e, n), t()
            };
        return {
            init: i
        }
    }(),
    CatTool = function() {
        var e = {},
            t = function() {},
            n = function(n) {
                e = n, t()
            };
        return {
            init: n
        }
    }(),
    Survey = function() {
        var e = {
                requiredElements: null,
                questions: [],
                visibleForSurveyQuestionChoiceObject: [],
                choiceInputTypeId: null,
                translations: {}
            },
            t = function(t) {
                $.extend(e, t), n()
            },
            n = function() {
                $("input[type=radio]").each(function() {
                    $(this).change(function() {
                        $(this).is(":checked") ? ($(this).closest(".form-group").find("label.radius").removeClass("checked"), $(this).closest(".form-group").find("input[type=radio]").prop("checked", !1), $(this).prop("checked", !0), $(this).closest("label.radius").hasClass("checked") || $(this).closest("label.radius").addClass("checked")) : ($(this).prop("checked", !1), $(this).closest("label.radius").removeClass("checked"))
                    })
                }), e.requiredElements && ($("#custSurvey").validate({
                    errorPlacement: function(e, t) {
                        t.closest(".form-group").find("p").append(e)
                    },
                    success: function(e) {
                        e.removeClass("error").addClass("valid")
                    }
                }), $(e.requiredElements.split(",")).each(function(t, n) {
                    $("[name=" + n + "]").rules("add", {
                        required: !0,
                        messages: {
                            required: e.translations.REQUIRED
                        }
                    })
                }));
                for (i in e.questions) {
                    var t = e.questions[i].VisibleForSurveyQuestionChoiceId;
                    if (null !== t)
                        for (x in e.questions)
                            for (a in e.questions[x].Choices) Number(t) === Number(e.questions[x].Choices[a].SurveyQuestionChoiceId) && (e.visibleForSurveyQuestionChoiceObject[Number(t)] = Number(e.questions[x].SurveyQuestionId))
                }
                $("#custSurvey").find('input[type="radio"]').on("change", function() {
                    n($(this))
                });
                var n = function(t) {
                    var n = t.closest("li").data("question-id"),
                        r = t.val(),
                        o = t.data("choice-type-id");
                    for (i in e.questions) e.questions[i].VisibleForSurveyQuestionChoiceId === r ? $("#question_" + e.questions[i].SurveyQuestionId).show() : "undefined" != typeof e.visibleForSurveyQuestionChoiceObject[Number(e.questions[i].VisibleForSurveyQuestionChoiceId)] && e.visibleForSurveyQuestionChoiceObject[Number(e.questions[i].VisibleForSurveyQuestionChoiceId)] === Number(n) && ($("#question_" + e.questions[i].SurveyQuestionId).find("label.checked").removeClass("checked"), $("#question_" + e.questions[i].SurveyQuestionId).find("input").prop("checked", !1), $("#question_" + e.questions[i].SurveyQuestionId).hide(), $("#question_" + e.questions[i].SurveyQuestionId).find("input").trigger("change"));
                    $("#question_" + n).find(".longerText").hide(), parseInt(o) === parseInt(e.choiceInputTypeId) && t.is(":checked") && $("#question_" + n).find(".longerText").show()
                }
            };
        return {
            init: t
        }
    }(),
    Push = function() {
        var e, t = {
            hoursBeforeNextPermissionRequest: 12,
            cookieName: "push",
            setPushToken: "",
            disableAutomaticTokenCheck: !1,
            text: {},
            inTranslatorsPage: !1
        };
        void 0 !== typeof firebase && firebase.messaging.isSupported() && (e = firebase.messaging());
        var n = function() {
                e.getToken().then(function(e) {
                    e ? i(e) : (u(), a(!1))
                })["catch"](function(e) {
                    a(!1)
                })
            },
            i = function(e, n) {
                o() || ($.post(t.setPushToken, {
                    token: e
                }).done(function(e) {
                    var i = $.parseJSON(e);
                    i.success && Cookie.set(t.cookieName, i.tokenId), void 0 !== n && n()
                }), a(!0))
            },
            r = function(e, n) {
                $.post(t.removePushToken, {
                    token: e
                }).done(function(e) {
                    e.success && Cookie.remove(t.cookieName), void 0 !== n && n()
                })
            },
            o = function() {
                return 1 == window.localStorage.getItem("protTokenSentToServer")
            },
            a = function(e) {
                window.localStorage.setItem("protTokenSentToServer", e ? 1 : 0)
            },
            s = function() {
                var e = "protLastRequestTime";
                t.inTranslatorsPage && (e = "protLastRequestTimeForTranslator"), window.localStorage.setItem(e, new Date)
            },
            l = function() {
                var e = null,
                    n = "protLastRequestTime";
                if (t.inTranslatorsPage && (n = "protLastRequestTimeForTranslator"), null == (e = window.localStorage.getItem(n))) return !0;
                var i = Math.abs(new Date - new Date(e)) / 36e5;
                return i >= t.hoursBeforeNextPermissionRequest
            },
            c = function() {
                e.onTokenRefresh(function() {
                    e.getToken().then(function(e) {
                        a(!1), i(e)
                    })["catch"](function(e) {})
                })
            },
            d = function() {
                $("#pushModal .btn.cancel").click(function(e) {
                    $("#pushModal").modal("hide")
                }), $("#pushModal .btn.allow").click(function(t) {
                    e.requestPermission().then(function() {
                        n()
                    })["catch"](function(e) {}), $("#pushModal").modal("hide")
                })
            },
            u = function() {
                l() && ($("#pushModal .lzy").attr("src", $("#pushModal .lzy").attr("data-src")), $("#pushModal").on("shown.bs.modal", function() {
                    $("body").css("padding-right", 0), $("body").css("padding-left", 0), $("#pushModal").addClass("pl-0").addClass("pr-0")
                }), $("#pushModal").modal({
                    backdrop: "static",
                    keyboard: !1
                }), s())
            },
            p = function() {
                var e = Cookie.get(t.cookieName);
                return "granted" === Notification.permission && void 0 !== e && "" !== e
            },
            f = function(n) {
                return new Promise(function(o, s) {
                    n ? e.requestPermission().then(function() {
                        e.getToken().then(function(e) {
                            a(!1), i(e, function() {
                                o()
                            })
                        })["catch"](function(e) {
                            s()
                        })
                    })["catch"](function(e) {
                        "messaging/permission-blocked" === e.code && AlertModal.show({
                            title: t.text.warning,
                            text: t.text.notificationPermissionBlocked,
                            confirmButtonText: t.text.ok,
                            showCancelButton: !1,
                            id: "notificationPermissionBlockedAlert",
                            callback: function() {}
                        }), s()
                    }) : e.getToken().then(function(t) {
                        e.deleteToken(t).then(function() {
                            r(t, function() {
                                o()
                            }), a(!1)
                        })["catch"](function(e) {
                            s()
                        })
                    })
                })
            },
            h = function(n) {
                $.extend(t, n), firebase.messaging.isSupported() && ($('[for="pushNotification"]').length > 0 && ($('[for="pushNotification"]').data("bs.tooltip").enabled = !1), e.usePublicVapidKey("BOp7nfCAx3ENwx3_XwA6qafsBA-NV04l2cDvJhuiBzIo3JgrT4fXr2S0X3Znno6bdfhFYH4DL4d3dBrXrZIfYBA"), d(), c(), t.disableAutomaticTokenCheck || p() || (u(), a(!1)))
            };
        return {
            init: h,
            getNotificationStatus: p,
            changeNotificationStatus: f
        }
    }(),
    CreditBalance = function() {
        var e = {
                creditBalanceChecked: 0,
                defaultOptionStatue: 0,
                sseCheck: !1,
                orderId: null,
                transactionTypeId: null,
                urls: {}
            },
            t = function() {
                n(), r(), o(), i(), l()
            },
            n = function() {
                var e = $(".balanceForm");
                0 === e.length
            },
            i = function() {
                var t = $(".balance-form");
                if (0 !== t.length && (t.find("#amount").mask("0#", {
                        onChange: function(e) {}
                    }), t.find(".btn").click(function(e) {
                        if (e.preventDefault(), t.valid())
                            if ($("input[name=billingType]").length > 0) {
                                var n = $("input[name=billingType]:checked").val();
                                location.href = t.attr("action") + t.find("#amount").val() + "&campaignId=" + n
                            } else location.href = t.attr("action") + t.find("#amount").val()
                    }), e.sseCheck)) {
                    var n = new EventSource(e.urls.checkPaymentStatus + "?transactionTypeId=" + e.transactionTypeId + "&orderId=" + e.orderId);
                    n.addEventListener("capture_credit_payment_status", function(e) {
                        var t = JSON.parse(e.data);
                        t.pending === !1 && (n.close(), "string" == typeof t.returnUrl ? window.location = t.returnUrl : $(".alert.alert-warning").remove())
                    }, !1)
                }
            },
            r = function() {
                a(), $("input[name=billingType]").change(function() {
                    a()
                })
            },
            o = function() {
                if (e.creditBalanceChecked > 0 && ($("#creditBalanceAmount").find("label.error").remove(), $("#creditBalanceAmount").find("input,textarea,select").prop("disabled", !0), $("#creditBalanceAmount").hide()), 0 == e.defaultOptionStatue) {
                    var t = 1;
                    $("#balanceForm .radius.checked").removeClass("checked"), $("#billingType" + t).prop("checked", !0).closest(".radius").addClass("checked")
                }
            },
            a = function() {
                if ($("input[name=billingType]").length > 0) {
                    var e = $("input[name=billingType]:checked").val();
                    if ($("#balanceForm .radius.checked").removeClass("checked"), $("#billingType" + e).prop("checked", !0).closest(".radius").addClass("checked"), e > 0) {
                        $("#creditBalanceAmount").find("label.error").remove(), $("#creditBalanceAmount").find("input,textarea,select").prop("disabled", !0), $("#creditBalanceAmount").hide();
                        var t = $("#selectedCampaignBalance" + e).val();
                        $("#amount").val(t)
                    } else $("#amount").val(""), $("#creditBalanceAmount").find("input,textarea,select").prop("disabled", !1), $("#creditBalanceAmount").show()
                }
            },
            s = function() {
                $("body").find("#billingType-error").length > 0 && $("#billingType-error").appendTo($(".faturaBilgi"))
            },
            l = function() {
                var t = $("form.balance-form");
                0 !== t.length && t.validate({
                    errorPlacement: function(e, t) {
                        e.insertAfter(t), s()
                    },
                    success: function(e, t) {
                        e.insertAfter(t).removeClass("error").addClass("valid"), s()
                    },
                    rules: {
                        amount: {
                            required: !0
                        }
                    },
                    messages: {
                        amount: {
                            required: e.translations.INVALID_AMOUNT_ENTERED
                        }
                    }
                })
            },
            c = function(n) {
                $.extend(e, n), t()
            };
        return {
            init: c
        }
    }(),
    AlertModal = function() {
        var e = {
                title: null,
                text: null,
                showCancelButton: !0,
                "class": "pt-alert-modal",
                confirmButtonClass: "btn btn-success",
                cancelButtonClass: "btn btn-danger",
                confirmButtonText: "",
                cancelButtonText: "",
                timer: null,
                id: null,
                callback: null
            },
            t = null,
            n = function() {
                if (null === e.id) {
                    var n = new Date;
                    e.id = "pt-modal-alert-" + n.getTime()
                }
                var r = "",
                    o = "";
                null !== e.title && (r = '<p class="h1 text-center">' + e.title + "</p>"), e.showCancelButton === !0 && (o = '<button type="button" class="' + e.cancelButtonClass + '" data-dismiss="modal">' + e.cancelButtonText + "</button>\n");
                var a = '<div class="modal fade ' + e["class"] + '" id="' + e.id + '" role="dialog">\n    <div class="siteBG clearfix">\n        ' + r + '\n        <p class="text-center">' + e.text + '</p>\n        <div class="form-group text-center col-xs-12 action-buttons">\n           ' + o + '\n           <button class="btn btn-primary submit-button ' + e.confirmButtonClass + '" type="button">' + e.confirmButtonText + "</button>\n        </div>\n    </div>\n</div>";
                $("." + e["class"]).remove(), $("body").append(a), $("#" + e.id).modal(), null !== e.timer && (t = setTimeout(function() {
                    $("#" + e.id).modal("hide")
                }, 1e3 * e.timer)), i()
            },
            i = function() {
                $("." + e["class"]).find("button.submit-button").on("click", function() {
                    $("#" + e.id).modal("hide"), clearTimeout(t), null !== e.callback && "function" == typeof e.callback && e.callback()
                })
            },
            r = function(t) {
                $.extend(e, t), n()
            };
        return {
            show: r
        }
    }(),
    CheckPaymentStatus = function() {
        var e = {
                formId: null,
                orderId: null,
                paymentToken: null,
                reference: null,
                transactionTypeId: null,
                limitedRequest: !1,
                requestTimer: null,
                remainingTimeClass: null,
                checkTimer: null,
                checkDuration: null,
                checkStatus: !0,
                requestTimeLimit: null,
                input: [],
                urls: [],
                translations: [],
                paymentStatusSse: null,
                bypassTabControl: !1
            },
            t = function() {
                n(), $(".payment").find("ul.nav.nav-tabs li").find("a").on("click", function() {
                    n()
                })
            },
            n = function() {
                e.checkDuration = e.input.checkDuration, e.requestTimeLimit = e.input.requestTimeLimit, clearInterval(e.checkTimer), clearInterval(e.requestTimer), e.checkTimer = setTimeout(r, e.checkDuration), e.limitedRequest && ($(e.formId).find(e.remainingTimeClass).html(i()), e.requestTimer = setInterval(o, 1e3))
            },
            i = function() {
                var t = Math.floor(e.requestTimeLimit / 60),
                    n = e.requestTimeLimit - 60 * t;
                return (new Array(3).join("0") + t).slice(-2) + ":" + (new Array(3).join("0") + n).slice(-2)
            },
            r = function() {
                a() && e.checkStatus && (e.paymentStatusSse = new EventSource(e.urls.checkStatusActionSse + "?transactionTypeId=" + e.transactionTypeId + "&orderId=" + e.orderId + "&paymentToken=" + e.paymentToken + "&reference=" + e.reference), e.paymentStatusSse.addEventListener("capture_payment_status", function(t) {
                    var n = JSON.parse(t.data);
                    n.pending === !1 && (e.paymentStatusSse.close(), "string" == typeof n.returnUrl ? window.location = n.returnUrl : $.post(e.urls.finalizePaymentStatus, {
                        paymentToken: e.paymentToken,
                        reference: e.reference,
                        orderId: e.orderId,
                        transactionTypeId: e.transactionTypeId
                    }, function(e) {
                        e.error || e.completed !== !0 || (window.location = e.returnUrl)
                    }))
                }, !1))
            },
            o = function() {
                if (a())
                    if (e.requestTimeLimit > 0) {
                        var t = i();
                        $(e.formId).find(e.remainingTimeClass).html(t), e.requestTimeLimit -= 1
                    } else clearInterval(e.checkTimer), clearInterval(e.requestTimer), e.requestTimeLimit = 0, $(e.formId).find(e.remainingTimeClass).html(i()), window.location = e.urls.paymentPageAction
            },
            a = function() {
                return e.bypassTabControl || $(".payment").find("ul.nav.nav-tabs li.active").find("a").data("transactiontypeid") === parseInt(e.transactionTypeId)
            },
            s = function(n) {
                $.extend(e, n), t()
            };
        return {
            init: s
        }
    }(),
    TranslatorQuizes = function() {
        var e = {
                messages: {},
                urls: {}
            },
            t = function() {
                n()
            },
            n = function() {
                $(".removeButton > a").click(function() {
                    var t = this;
                    AlertModal.show({
                        title: e.messages.warning,
                        text: e.messages.examQuestion,
                        cancelButtonText: e.messages.cancel,
                        confirmButtonText: e.messages.yes,
                        id: "removeExamConfirmAlert",
                        callback: function() {
                            confirmButtonClicked = !0, appraisalId = $(t).data("appraisalId"), $.post(e.urls.removeAppraisal, {
                                appraisalId: appraisalId
                            }).done(function(e) {
                                !1 === e.success && alert(e.errorMessage), window.location.reload()
                            })
                        }
                    })
                })
            },
            i = function(n) {
                $.extend(e, n), t()
            };
        return {
            init: i
        }
    }(),
    OrderPdfFlow = function() {
        var e = {
                urls: {}
            },
            t = function() {
                $('#kayitForm [type="submit"]').click(function() {
                    var t = $(this).val();
                    $('#kayitForm [type="submit"]').attr("disabled", "true"), $("#kayitForm .fa-spinner").removeClass("d-none");
                    var n = $("#kayitForm").serialize();
                    n += "&operation=" + t, $.get(e.urls.pdfFlow + "?" + n).done(function(e) {
                        $("#pdfFlowModal").modal("hide"), $('#kayitForm [type="submit"]').attr("disabled", null),
                            $("#kayitForm .fa-spinner").addClass("d-none"), Order.recalculate(!0)
                    })
                })
            },
            n = function() {
                $("#pdfFlowModal .selector li").click(function(e) {
                    e.preventDefault(), e.stopPropagation();
                    var t = $(this).parent();
                    t.find(".selectedChoise").removeClass("selectedChoise"), t.find("input[type=radio]:checked").prop("checked", !1), $(this).addClass("selectedChoise"), $(this).find("input[type=radio]").prop("checked", !0).trigger("change")
                }), $("#pdfFlowModal .options .radius").click(function() {
                    $("#pdfFlowModal .options").find('input[checked="checked"]').removeAttr("checked"), $("#pdfFlowModal .options .radius.checked").removeClass("checked"), $(this).addClass("checked").find("input").attr("checked", "checked"), "1" == $("#pdfFlowModal .options .radius.checked").find("input").val() ? $("#pdfFlowModal .options .page-range").show() : $("#pdfFlowModal .options .page-range").hide()
                })
            },
            i = function() {
                0 != $("#pdfFlowModal").length && $("#pdfFlowModal .options .page-range input").mask("99999", {
                    greedy: !1
                })
            },
            r = function() {
                var e = $("#pdfFlowModal form");
                0 !== e.length && e.validate({
                    errorPlacement: function(e, t) {
                        $(t).css("border-color", "red")
                    },
                    success: function(e, t) {
                        $(t).css("border-color", "initial")
                    },
                    rules: {
                        pageRangeFirst: {
                            required: !0,
                            number: !0
                        },
                        pageRangeLast: {
                            required: !0,
                            number: !0
                        }
                    },
                    messages: {
                        pageRangeFirst: {
                            required: " ",
                            number: " "
                        },
                        pageRangeLast: {
                            required: " ",
                            number: " "
                        }
                    }
                })
            },
            o = function(o) {
                $.extend(e, o), t(), n(), i(), r()
            };
        return {
            init: o
        }
    }(),
    CookieTracker = function() {
        var e = {
                text: {},
                chatUserIdentifierCookieName: ""
            },
            t = function(t) {
                Cookie.set(e.chatUserIdentifierCookieName, t, 1)
            },
            n = function(t) {
                $.extend(e, t)
            };
        return {
            init: n,
            storeChatUserIdentifier: t
        }
    }(),
    FileList = function() {
        var e = {
                id: null,
                urls: {},
                translations: {},
                serviceCurrentFolderId: null,
                serviceHistory: [],
                serviceSelectedFiles: {},
                serviceTag: null,
                loadingFromService: !1,
                scrollingOffset: 40
            },
            t = function() {
                var t = '<div class="service-file-breadcrumb">';
                if (t += '<div class="service-file-breadcrumb-items">\n', t += '<div class="service-file-breadcrumb-item">\n                        <a href="javascript:;" data-folder-id="" data-folder-name="" data-index="-1">\n                            <i class="fas fa-home"></i>                        </a>\n                    </div>', e.serviceHistory.length > 0)
                    for (var n in e.serviceHistory) t += '<div class="service-file-breadcrumb-item">\n                        <a href="javascript:;" data-folder-id="' + e.serviceHistory[n].folderId + '" data-folder-name="' + e.serviceHistory[n].folderName + '" data-index="' + n + '">' + e.serviceHistory[n].folderName + "\n                    </div>";
                t += "</div>", t += '<div class="service-file-breadcrumb-right-item"><a href="javascript:void(0);" class="service-sign-out" data-service="' + e.serviceTag + '">' + e.translations.UPLOAD_FILE_SERVICE_SIGN_OUT + "</a></div>", t += "</div>", $(e.id).find(".service-file-list-wrapper").prepend(t), $(e.id).find(".service-file-list-wrapper .service-file-breadcrumb .service-file-breadcrumb-item a").off("click"), $(e.id).find(".service-file-list-wrapper .service-file-breadcrumb .service-file-breadcrumb-item a").on("click", function(e) {
                    l($(this).data("folder-id"), $(this).data("folder-name"), $(this).data("index"))
                }), $(e.id).find(".service-file-list-wrapper .service-file-breadcrumb .service-file-breadcrumb-right-item a.service-sign-out").off("click"), $(e.id).find(".service-file-list-wrapper .service-file-breadcrumb .service-file-breadcrumb-right-item a.service-sign-out").on("click", function(t) {
                    $(e.id).find(".service-file-list-wrapper").html('<div class="text-center file-list-loader" style="flex: 0 0 100%;"><img src="/static/assets/pt_old/images/loading.gif" width="16" /></div>'), $.post(e.urls.signOutFileTransferService, {
                        service: $(this).data("service")
                    }, function(e) {
                        e.success && FileUploadModal.reloadFileTransferServiceDetail(e.data.service)
                    })
                })
            },
            n = function(t, n) {
                var a = "";
                n || (a += '<div class="service-file-list"><div class="service-file-list-inner">');
                for (var s in t)
                    if (t[s].IsSelectable) {
                        var c = o(t[s].Id) ? " selected" : "",
                            d = t[s].IsFolder ? "fas fa-folder" : "far fa-file",
                            u = t[s].IsFolder ? ' data-folder-id="' + t[s].Id + '" data-folder-name="' + t[s].FileName + '"' : ' data-file-id="' + t[s].Id + '" data-file-name="' + t[s].FileName + '"',
                            p = !!t[s].IsFolder,
                            f = '<div class="service-file-row' + c + '"' + u + ' data-is-folder="' + p + '">\n                        <div class="service-file-row-icon">\n                            <i class="' + d + '"></i>\n                        </div>\n                        <div class="service-file-row-name">\n                            ' + t[s].FileName + "\n                        </div>\n                    </div>";
                        a += f
                    } n || (a += "</div></div>"), $(e.id).find(".service-file-list-wrapper .file-list-loader").remove(), n ? $(e.id).find(".service-file-list-wrapper .service-file-list .service-file-list-inner").append(a) : ($(e.id).find(".service-file-list-wrapper .service-file-list").remove(), $(e.id).find(".service-file-list-wrapper").append(a)), $(e.id).find(".service-file-list-wrapper .service-file-list .service-file-row[data-folder-id]").off("click"), $(e.id).find(".service-file-list-wrapper .service-file-list .service-file-row[data-folder-id]").on("click", function(e) {
                    l($(this).data("folder-id"), $(this).data("folder-name"))
                }), $(e.id).find(".service-file-list-wrapper .service-file-list .service-file-row[data-file-id]").off("click"), $(e.id).find(".service-file-list-wrapper .service-file-list .service-file-row[data-file-id]").on("click", function(e) {
                    o($(this).data("file-id")) ? r($(this).data("file-id"), $(this).data("file-name")) : i($(this).data("file-id"), $(this).data("file-name"))
                })
            },
            i = function(t, n) {
                o(t) || ($(e.id).find('.service-file-list-wrapper .service-file-list .service-file-row[data-file-id="' + t + '"]').addClass("selected"), a("SELECTED_FILE", t, n))
            },
            r = function(t, n) {
                $(e.id).find('.service-file-list-wrapper .service-file-list .service-file-row[data-file-id="' + t + '"].selected').removeClass("selected"), a("UNSELECTED_FILE", t, n)
            },
            o = function(t) {
                return e.serviceSelectedFiles[e.serviceTag].findIndex(function(e) {
                    return e.fileId === t
                }) > -1
            },
            a = function(t, n, i) {
                var r = {
                        serviceTag: e.serviceTag,
                        currentSelectedFiles: e.serviceSelectedFiles[e.serviceTag],
                        process: t,
                        processedFileId: n,
                        processedFileName: i
                    },
                    o = new CustomEvent("file.list.changed", {
                        detail: r
                    });
                document.dispatchEvent(o)
            },
            s = function(t) {
                $.extend(e, t)
            },
            l = function(i, r, o, a) {
                if (!e.loadingFromService) {
                    e.loadingFromService = !0, a && $(e.id).find(".service-file-list-wrapper").append('<div class="service-file-row text-center load-more-loading"><img src="/static/assets/pt_old/images/loading.gif" width="16" /></div>');
                    var s = {
                        service: e.serviceTag
                    };
                    if (s.folder = i, !a)
                        if (e.serviceCurrentFolderId = i, "undefined" != typeof o) parseInt(o) === -1 ? e.serviceHistory = [] : e.serviceHistory.splice(o + 1, e.serviceHistory.length - o + 1);
                        else if (i) {
                        var c = {
                            folderId: i,
                            folderName: r
                        };
                        e.serviceHistory.push(c)
                    }
                    var d = !1;
                    a && (s.nextPageToken = a, d = !0), a || $(e.id).find(".service-file-list-wrapper").html('<div class="text-center file-list-loader" style="flex: 0 0 100%;"><img src="/static/assets/pt_old/images/loading.gif" width="16" /></div>'), $.get(e.urls.getFileListFromService, s, function(s) {
                        s.success && (a || t(), n(s.data.Files, d), s.data.NextPageToken ? ($(e.id).find(".service-file-list").off("scroll"), $(e.id).find(".service-file-list").on("scroll", function() {
                            $(e.id).find(".service-file-list").scrollTop() > $(e.id).find(".service-file-list-inner").height() - $(e.id).find(".service-file-list").height() - e.scrollingOffset && l(i, r, o, s.data.NextPageToken)
                        })) : $(e.id).find(".service-file-list").off("scroll")), e.loadingFromService = !1, $(e.id).find(".load-more-loading").remove(), FileUploadModal.listProgressLoaded()
                    })
                }
            },
            c = function() {
                return e.serviceTag
            };
        return {
            init: s,
            getFileListFromService: l,
            getServiceTag: c
        }
    }(),
    FileUploadModal = function() {
        var e = {
                id: "#fileUploadModal",
                serviceCurrentFolderId: null,
                deviceFiles: [],
                serviceFiles: {},
                serviceFilesStatus: {},
                urls: [],
                translations: [],
                targetFileCount: 0,
                beforeUploadedFileCount: 0,
                uploadedFileCount: 0,
                errorFilesCount: 0,
                inProgressUpload: !1,
                removingFile: !1,
                inProgressFileList: !1
            },
            t = function() {
                var e = document.createElement("div");
                return ("draggable" in e || "ondragstart" in e && "ondrop" in e) && "FormData" in window && "FileReader" in window
            }(),
            n = function() {
                var e = $(".upload-body .content#device");
                t && (e.addClass("has-advanced-upload"), e.on("drag dragstart dragend dragover dragenter dragleave drop", function(e) {
                    e.preventDefault(), e.stopPropagation()
                }).on("dragover dragenter", function() {
                    e.addClass("is-dragover")
                }).on("dragleave dragend drop", function() {
                    e.removeClass("is-dragover")
                }).on("drop", function(e) {
                    r(e.originalEvent.dataTransfer.files)
                }))
            },
            i = function() {
                $(".upload-services-wrapper .upload-services-list ul li a").off("click"), $(".upload-services-wrapper .upload-services-list ul li a").on("click", function() {
                    $(this).hasClass("active") || e.inProgressUpload || e.inProgressFileList ? !$(this).hasClass("active") || "device" !== $(this).data("target") || $(this).data("first-selection") === !0 || e.inProgressUpload || e.inProgressFileList || $(e.id).find(".upload-body #fileUploadFromDeviceButton").trigger("click") : (e.inProgressFileList = !0, $(e.id).find('.selected-file-list .file-list-item[data-error="true"]').remove(), $(e.id).find(".selected-files .title p.alert").remove(), 0 === $(e.id).find(".selected-files .selected-file-list .file-list-item").length && $(e.id).find(".selected-files .selected-file-list").html('<p class="not-uploaded-any-file p-0 m-1">' + e.translations.TRANSLATION_NOT_UPLOADED + "</p>"), o(), $(".upload-services-wrapper .upload-services-list .uploaded-files a.active").removeClass("active"), $(".upload-services-wrapper .upload-services-list ul li a.active").removeClass("active"), $(this).addClass("active"), $(".upload-services-wrapper .upload-body .content.active").removeClass("active"), $("#" + $(this).data("target")).addClass("active"), h($(this).data("target")))
                }), $("#fileUploadFromDeviceButton").off("click"), $("#fileUploadFromDeviceButton").on("click", function() {
                    $("#hiddenUploadFromDevice").trigger("click")
                }), $("#hiddenUploadFromDevice").off("change"), $("#hiddenUploadFromDevice").on("change", function(e) {
                    e.target.files.length > 0 && r(e.target.files)
                }), s(), _(), document.removeEventListener("file.list.changed", l), document.addEventListener("file.list.changed", l), $(e.id).find(".to-device-upload-tab").off("click"), $(e.id).find(".to-device-upload-tab").on("click", function(t) {
                    $(e.id).find('.upload-services-wrapper .upload-services-list ul li > a[data-target="device"]').data("first-selection", !0), $(e.id).find('.upload-services-wrapper .upload-services-list ul li > a[data-target="device"]').trigger("click"), $(e.id).find('.upload-services-wrapper .upload-services-list ul li > a[data-target="device"]').data("first-selection", !1)
                }), n()
            },
            r = function(t) {
                ChunkedFileUpload.handle("#orderFileUploadFromDeviceHiddenInput", t), $(e.id).modal("hide"), $("#hiddenUploadFromDevice").val("")
            },
            o = function() {
                $(e.id).find(".selected-file-list .file-row").removeAttr("data-index"), $(e.id).find(".selected-file-list .file-row").not('[data-error="true"]').each(function(e) {
                    $(this).data("index", e), $(this).attr("data-index", e)
                })
            },
            a = function() {
                e.targetFileCount = e.beforeUploadedFileCount + $(e.id).find('.selected-file-list .file-list-item[data-waiting="true"]').length
            },
            s = function() {
                $(e.id).find(".upload-via-service-action-wrapper button").off("click"), $(e.id).find(".upload-via-service-action-wrapper button").on("click", function(t) {
                    FileUpload.startUploadingFiles(), u(), $(e.id).modal("hide")
                })
            },
            l = function(e) {
                f(e.detail)
            },
            c = function(t, n) {
                e.serviceFilesStatus[t] = 1;
                var i = e.serviceFiles[t][n].fileId,
                    r = e.serviceFiles[t][n].fileName,
                    o = $(e.id).find('.upload-services-wrapper .upload-body .content#uploaded-files-area .selected-files-wrapper .selected-file-list .file-list-item[data-id="' + i + '"]');
                o.find(".file-item-info p span.badge").text(e.translations.LOADING).removeClass("hide"), o.data("waiting", !1), o.removeAttr("data-waiting"), $('.file-list .file-row[data-id="' + i + '"]').data("waiting", !1), $('.file-list .file-row[data-id="' + i + '"]').removeAttr("data-waiting");
                var a = new FormData;
                a.append("fileId", i), a.append("fileName", r), a.append("service", t), $(e.id).find('.selected-file-list .file-list-item[data-id="' + i + '"] span.badge').removeClass("error"), $.ajax({
                    url: e.urls.uploadFileViaService,
                    data: a,
                    cache: !1,
                    contentType: !1,
                    processData: !1,
                    type: "POST",
                    success: function(i) {
                        if (null !== i.item && i.success) {
                            o.find(".progress-bar-wrapper .progress-bar").css("width", "50%"), FileUpload.countFileWords(i.item.id, i.item.data.FileUri, function() {
                                "undefined" != typeof e.serviceFiles[t][n + 1] ? c(t, n + 1) : (e.serviceFilesStatus[t] = 2, u())
                            });
                            var r = $('.stepContent .file-list .file-row[data-id="' + i.item.id + '"]');
                            r.data("file-hash", i.item.data.FilesHash), r.attr("data-file-hash", i.item.data.FilesHash)
                        }
                        i.errorMessage && d(t, n, i.fileId, i.errorMessage)
                    }
                })
            },
            d = function(t, n, i, r) {
                var o = $('.stepContent .file-list .file-row[data-id="' + i + '"]');
                0 === o.find(".file-info p").length && (o.find(".file-info").append('<p class="text-red">' + r + "</p>"), o.find(".file-word-count").hide(), o.find(".file-progress").hide()), FileUpload.resetFileUploadButton(), Order.recalculate(), "device" !== t && ("undefined" != typeof e.serviceFiles[t][n + 1] ? c(t, n + 1) : (e.serviceFilesStatus[t] = 2, u())), i !== -1 && (e.errorFilesCount += 1, FileUpload.addErrorFile(i)), p(), e.inProgressUpload = !1, $(e.id).find(".to-device-upload-tab").show()
            },
            u = function() {
                for (var t in e.serviceFiles)
                    if (e.serviceFiles[t].length > 0 && 0 === e.serviceFilesStatus[t]) {
                        c(t, 0);
                        break
                    }
            },
            p = function() {
                e.uploadedFileCount + e.errorFilesCount === e.targetFileCount && (y(), FileUpload.finishUploadingFiles(null, null, null, null))
            },
            f = function(t) {
                if ("UNSELECTED_FILE" === t.process) {
                    $(e.id).find('.content#uploaded-files-area .selected-file-list .file-list-item.file-row[data-id="' + t.processedFileId + '"]').remove(), $('.stepContent .file-list .file-row[data-id="' + t.processedFileId + '"]').remove();
                    var n = e.serviceFiles[t.serviceTag].findIndex(function(e) {
                        return e.fileId === t.processedFileId
                    });
                    FileUpload.removeSelectedFileFromService(t.processedFileId), e.serviceFiles[t.serviceTag].splice(n, 1)
                } else if ("SELECTED_FILE" === t.process) {
                    var i = $(e.id).find(".content#uploaded-files-area .selected-file-list .file-list-item.file-row").length;
                    FileUpload.addNewFileItemHtml(i, t.processedFileId, t.processedFileName), FileUpload.addSelectedFileFromService(t.processedFileId), e.serviceFiles[t.serviceTag].push({
                        fileId: t.processedFileId,
                        fileName: t.processedFileName
                    })
                }
                m();
                var r = 0;
                for (var o in e.serviceFiles) r += e.serviceFiles[o].length;
                r > 0 ? $(e.id).find(".upload-via-service-action-wrapper button").prop("disabled", !1) : $(e.id).find(".upload-via-service-action-wrapper button").prop("disabled", !0)
            },
            h = function(t) {
                e.serviceCurrentFolderId = null;
                var n = $(e.id).find(".upload-services-wrapper .upload-body .content#" + t),
                    i = n.find(".upload-via-service-wrapper").data("is-logged");
                i ? (b(t), FileList.getFileListFromService()) : e.inProgressFileList = !1
            },
            m = function(t) {
                var n = e.uploadedFileCount,
                    i = 0,
                    r = 0,
                    o = 0,
                    a = 0;
                for (var s in e.deviceFiles) n += 1, i += 1, r += 1;
                for (var l in e.serviceFiles)
                    if (e.serviceFiles[l].length > 0)
                        for (var c in e.serviceFiles[l]) n += 1, i += 1, "google-drive" === l && (o += 1), "dropbox" === l && (a += 1);
                var d = $(e.id).find('.upload-services-list ul li a[data-target="device"]').closest("li");
                d.find("span.small-badge").remove();
                var u = $(e.id).find('.upload-services-list ul li a[data-target="google-drive"]').closest("li");
                u.find("span.small-badge").remove();
                var p = $(e.id).find('.upload-services-list ul li a[data-target="dropbox"]').closest("li");
                p.find("span.small-badge").remove(), r > 0 && d.append('<span class="small-badge">' + r + "</span>"), o > 0 && u.append('<span class="small-badge">' + o + "</span>"), a > 0 && p.append('<span class="small-badge">' + a + "</span>"), n > 0 ? $(e.id).find(".selected-files .selected-file-list .not-uploaded-any-file").remove() : 0 !== e.uploadedFileCount || t || $(e.id).find(".selected-files .selected-file-list").html('<p class="not-uploaded-any-file p-0 m-1">' + e.translations.TRANSLATION_NOT_UPLOADED + "</p>"), $(e.id).find(".upload-services-wrapper .upload-services-list .uploaded-files span.badge").text(n)
            },
            g = function() {
                ChunkedFileUpload.init({
                    translations: e.translations,
                    selector: "#orderFileUploadFromDeviceHiddenInput",
                    add: function(e) {
                        FileUpload.startUploadingFiles();
                        var t = e.files[0],
                            n = $(".file-list").find(".file-row").length;
                        e.fileTempId = String((new Date).getTime()) + Math.random() + "_" + n, e.formData = {
                            fileTempId: e.fileTempId
                        }, FileUpload.addNewFileItemHtml(n, e.fileTempId, t.name), FileUpload.addSelectedFile(t, e.fileTempId), e.submit()
                    },
                    progress: function(e) {
                        var t = $('.file-list .file-row[data-id="' + e.fileTempId + '"] .progress-bar-wrapper .progress-bar'),
                            n = e._progress,
                            i = n.loaded / n.total;
                        t.css("width", Math.round(100 * i) + "%"), t.text(Math.round(100 * i) + "%")
                    },
                    done: function(t) {
                        var n = JSON.parse(t.result);
                        if (!0 === n.success) {
                            FileUpload.addFileToCountWords(t.fileTempId, n.item.data.FileUri);
                            var i = $('.file-list .file-row[data-id="' + t.fileTempId + '"]');
                            i.data("file-hash", n.item.data.FilesHash), i.attr("data-file-hash", n.item.data.FilesHash), i.data("waiting", !1), i.removeAttr("data-waiting")
                        } else FileUpload.addErrorDeviceFile(t.fileTempId), d("device", 0, t.fileTempId, n.errorMessage), v(t.fileTempId);
                        e.inProgressUpload = !1
                    }
                })
            },
            v = function(t) {
                var n = e.deviceFiles.findIndex(function(e) {
                    return e.fileTempId === t
                });
                e.deviceFiles.splice(n, 1), 0 === e.deviceFiles.length && u()
            },
            y = function() {
                var t = e.errorFilesCount > 0;
                e.serviceCurrentFolderId = null, e.deviceFiles = [], e.inProgressUpload = !1, $(e.id).find(".to-device-upload-tab").show(), e.targetFileCount = 0, e.errorFilesCount = 0, e.serviceFiles = {
                    "google-drive": [],
                    dropbox: []
                }, e.serviceFilesStatus = {
                    "google-drive": 0,
                    dropbox: 0
                }, e.beforeUploadedFileCount = e.uploadedFileCount, FileUpload.clearErrorDeviceFile(), a(), m(t), o()
            },
            b = function(t) {
                FileList.init({
                    id: e.id,
                    serviceCurrentFolderId: null,
                    serviceHistory: [],
                    serviceSelectedFiles: e.serviceFiles,
                    urls: {
                        getFileListFromService: e.urls.getFileListFromService,
                        signOutFileTransferService: e.urls.signOutFileTransferService
                    },
                    translations: {
                        UPLOAD_FILE_SERVICE_SIGN_OUT: e.translations.UPLOAD_FILE_SERVICE_SIGN_OUT
                    },
                    serviceTag: t
                })
            },
            w = function() {
                var t = '<div class="loading-file-upload-services">\n            <img src="/static/assets/pt_old/images/loader.gif" width="24" />\n        </div>';
                $(e.id + " .siteBG").html(t), $.get(e.urls.getUploadServices, function(t) {
                    $(e.id + " .siteBG").html(t.data), i();
                    var n = parseInt($(e.id).find('.selected-files input[name="uploadedFilesCount"]').val());
                    e.uploadedFileCount = n, e.beforeUploadedFileCount = n, $(e.id + ' .upload-services-wrapper .upload-services-list ul li a[data-target="device"]').trigger("click")
                })
            },
            C = function(t) {
                var n = $(e.id).find('.content#uploaded-files-area .selected-file-list .file-row[data-id="' + t + '"]');
                n.find(".progress-bar-wrapper .progress-bar").css("width", 0), n.find(".file-item-info span.badge").text(e.translations.COUNTING_WORDS).removeClass("hide")
            },
            x = function(t, n) {
                var i = $(e.id).find('.content#uploaded-files-area .selected-file-list .file-row[data-id="' + t + '"]');
                i.find(".progress-bar-wrapper .progress-bar").css("width", n + "%")
            },
            T = function(t, n) {
                var i = $(e.id).find('.content#uploaded-files-area .selected-file-list .file-row[data-id="' + t + '"]');
                i.find(".progress-bar-wrapper").remove(), i.find(".file-item-info p > span.badge").remove(), i.find(".file-item-info p > span").eq(1).text(n), m()
            },
            _ = function() {
                $(e.id).find(".upload-body .upload-via-service-wrapper .upload-via-service .service-action a.auth-service-button").off("click"), $(e.id).find(".upload-body .upload-via-service-wrapper .upload-via-service .service-action a.auth-service-button").on("click", function(e) {
                    function t() {
                        r.closed && (clearInterval(o), S(i))
                    }
                    var n = $(this).data("href"),
                        i = $(this).data("service"),
                        r = window.open(n, "_blank"),
                        o = setInterval(t, 500)
                })
            },
            k = function() {},
            S = function(t) {
                $.get(e.urls.getFileTransferServiceDetail, {
                    serviceTag: t
                }, function(n) {
                    n.success && ($(e.id).find(".upload-body .content#" + n.data.service).html(n.data.html), b(t), FileList.getFileListFromService(), _(), s())
                })
            },
            I = function() {
                e.uploadedFileCount += 1
            },
            E = function() {
                e.serviceCurrentFolderId = null, e.deviceFiles = [], e.uploadedFileCount = 0, e.errorFilesCount = 0, e.inProgressUpload = !1, $(e.id).find(".to-device-upload-tab").show(), e.serviceFiles = {
                    "google-drive": [],
                    dropbox: []
                }, e.serviceFilesStatus = {
                    "google-drive": 0,
                    dropbox: 0
                }, $(e.id).modal()
            },
            D = function(t) {
                $(e.id).hasClass("in") && (t && ($(e.id).off("hidden.bs.modal"), $(e.id).on("hidden.bs.modal", function() {
                    $("body").addClass("modal-open")
                })), $(e.id).modal("hide"), $(e.id).find('.selected-file-list .file-list-item[data-waiting="true"]').attr("data-waiting", !1), $(e.id).find('.selected-file-list .file-list-item[data-waiting="true"]').data("waiting", !1))
            };
        $.urlParam = function(e) {
            var t = new RegExp("[?&]" + e + "=([^&#]*)").exec(window.location.href);
            return null == t ? null : decodeURI(t[1]) || 0
        };
        var A = function() {
                var e = $.urlParam("fileTransferModal");
                e && 1 === parseInt(e) && window.close()
            },
            F = function() {
                e.inProgressFileList = !1
            },
            O = function(t) {
                $.extend(e, t), g(), k()
            };
        return {
            init: O,
            show: E,
            close: D,
            checkAutoShow: A,
            startWordCountUploadedFile: C,
            handleWordCountProgress: x,
            finishedFileWordCount: T,
            loadAuthButtonEvent: _,
            getUploadServices: w,
            reloadFileTransferServiceDetail: S,
            increaseUploadedFileCount: I,
            deviceFilesShift: v,
            listProgressLoaded: F,
            handleUnableUploadedFile: d
        }
    }(),
    Cookie = function() {
        var e = function(e, t, n, i) {
                var r = new Date,
                    o = 864e5,
                    a = "undefined" == typeof n ? o : o * n,
                    s = new Date(r.getTime() + a);
                document.cookie = e + "=" + escape(t) + ";expires=" + s + ";path=" + i
            },
            t = function(t, n, i, r) {
                r || (r = "/"), e(t, n, i, r)
            },
            n = function(e) {
                for (var t = e + "=", n = decodeURIComponent(document.cookie), i = n.split(";"), r = 0; r < i.length; r++) {
                    for (var o = i[r];
                        " " == o.charAt(0);) o = o.substring(1);
                    if (0 == o.indexOf(t)) return o.substring(t.length, o.length)
                }
                return ""
            },
            i = function(e) {
                t(e, null, -1)
            };
        return {
            set: t,
            get: n,
            remove: i
        }
    }(),
    Chatwoot = function() {
        var e = {
                chatwoot: null,
                locale: null,
                user: null,
                isRtl: !1,
                isCheckoutJourney: !1,
                firstOpenTime: 15,
                openTime: 180,
                firstOpenCookieName: "__cw_first_time_opened",
                willOpenAuto: !0,
                isMobile: !1
            },
            t = function(t) {
                e.isRtl ? $(".woot--bubble-holder .woot-widget-bubble").css({
                    left: t
                }) : $(".woot--bubble-holder .woot-widget-bubble").css({
                    right: t
                })
            },
            n = function() {
                window.addEventListener("chatwoot:ready", function() {
                    window.$chatwoot = window.$chatwoot || [], LiveChatService.dispatchLiveChatIsReady(), null !== e.user && "undefined" != typeof e.user.email && e.user.email && "undefined" != typeof e.user.name && e.user.name && window.$chatwoot.setUser(e.user.email, e.user);
                    var n = $(".scrollToTop").css("visibility");
                    "visible" === n && t(70), window.addEventListener("show.scrolltotop", function(e) {
                        t(70)
                    }, !1), window.addEventListener("hide.scrolltotop", function(e) {
                        t(20)
                    }, !1);
                    var i = "true" === Cookie.get(e.firstOpenCookieName);
                    !1 === e.isCheckoutJourney && e.willOpenAuto && !1 === e.isMobile && setTimeout(function() {
                        window.$chatwoot.isOpen === !1 && (window.$chatwoot.toggle(), Cookie.set(e.firstOpenCookieName, !0, 1))
                    }, 1e3 * (i ? e.openTime : e.firstOpenTime))
                })
            },
            i = function(e) {
                "undefined" != typeof window.$chatwoot && window.$chatwoot && window.$chatwoot.setCustomAttributes(e)
            },
            r = function(e) {
                "undefined" != typeof e && "undefined" != typeof e.Email && "undefined" != typeof e.Name && "" !== e.Email && "" !== e.Name && window.$chatwoot.setUser(e.Email, {
                    name: e.Name,
                    email: e.Email
                })
            },
            o = function(t) {
                $.extend(e, t), window.chatwootSettings = {
                    hideMessageBubble: !1,
                    position: e.isRtl ? "left" : "right",
                    locale: e.locale,
                    type: "expanded_bubble"
                }, n()
            };
        return {
            init: o,
            setVisitorNotesForChat: i,
            updateLiveChatUser: r
        }
    }(),
    LiveChatService = function() {
        var e = {
                service: null
            },
            t = function(t) {
                null !== e.service && "undefined" != typeof e.service.setVisitorNotesForChat && e.service.setVisitorNotesForChat(t)
            },
            n = function(t) {
                null !== e.service && "undefined" != typeof e.service.updateLiveChatUser && e.service.updateLiveChatUser(t)
            },
            i = function() {
                var t = new CustomEvent("livechat.ready", {
                    service: e.service
                });
                document.dispatchEvent(t)
            },
            r = function(t) {
                $.extend(e, t)
            };
        return {
            init: r,
            setVisitorNotesForChat: t,
            updateLiveChatUser: n,
            dispatchLiveChatIsReady: i
        }
    }(),
    AdditionalSteps = function() {
        var e = {
                orderId: null,
                translations: [],
                urls: [],
                additionalSteps: {},
                lockedRemoveReferenceFile: !1,
                wrapper: ".additional-step-wrapper",
                errorWrapper: ".error-wrapper"
            },
            t = function() {
                n(), i(), l(), d(), r(), u(), p(), $('[data-toggle="tooltip"]').tooltip()
            },
            n = function() {
                var t = $('.additional-step-wrapper[data-step="translator-instructions"]'),
                    n = t.find('button[name="submit"]'),
                    i = t.find('input[name="additional_step"]').val();
                n.off("click"), n.on("click", function(n) {
                    WidgetWizard.startProgress();
                    var r = t.find("textarea").val(),
                        o = {
                            orderId: e.orderId,
                            additionalStep: i,
                            translatorInstructions: r
                        };
                    $.post(e.urls.saveAdditionalStep, o, function(e) {
                        WidgetWizard.stepSaved(i)
                    }), WidgetWizard.check()
                })
            },
            i = function() {
                $(".reference-files button").on("click", function(e) {
                    e.preventDefault(), document.getElementById("referenceFiles").click()
                }), $(".order-reference-files .order-reference-file-remove").on("click", s), $(".reference-files #referenceFiles").on("change", function() {
                    var n = $(this)[0].files;
                    if (0 !== n.length) {
                        $(".reference-files button").prop("disabled", !0), $(".reference-files > span.selected-reference-files-loader").remove(), $(".reference-files").append('<span class="selected-reference-files-loader"><img src="/static/assets/pt_old/images/loading.gif" alt="" width="16" /></span>');
                        for (var i = new FormData, r = 0; r < n.length; r++) {
                            var o = n[r];
                            i.append("referenceFiles[]", o, o.name)
                        }
                        i.append("orderId", e.orderId), $.ajax({
                            url: e.urls.addOrderReferenceFiles,
                            data: i,
                            type: "POST",
                            contentType: !1,
                            processData: !1,
                            success: function(n) {
                                if ($(".reference-files button").prop("disabled", !1), n.success) $(".reference-files > span.selected-reference-files-loader").remove(), $(".order-reference-files-wrapper").remove(), $(".reference-files").after(n.referenceFilesHtml), $(".order-reference-files .order-reference-file-remove").off("click"), $(".order-reference-files .order-reference-file-remove").on("click", s);
                                else {
                                    var i, r = !1;
                                    i = "undefined" == typeof e.translations[n.errorMessage] ? n.errorMessage : e.translations[n.errorMessage], AlertModal.show({
                                        title: e.translations.ERROR_MESSAGE_STATIC_PAGE,
                                        text: i,
                                        showCancelButton: !1,
                                        confirmButtonText: e.translations.OK_BUTTON,
                                        id: "addOrderRefenceFilesError",
                                        callback: function() {
                                            $("#addOrderRefenceFilesError").modal("hide")
                                        }
                                    }), "undefined" != typeof n.goToTopofPage && n.goToTopofPage && (r = !0), $("#addOrderRefenceFilesError").off("hidden.bs.modal"), $("#addOrderRefenceFilesError").on("hidden.bs.modal", function() {
                                        t(r)
                                    })
                                }
                            }
                        })
                    }
                });
                var t = function(e) {
                    $("input#referenceFiles").val(""), $(".reference-files .selected-reference-files-loader").remove(), e && $("html, body").animate({
                        scrollTop: 0
                    }, 800)
                }
            },
            r = function() {
                a(), $("input[name=billingType]").change(function() {
                    a()
                });
                var t = $('.additional-step-wrapper[data-step="invoice"]'),
                    n = t.find('button[name="submit"]'),
                    i = t.find('input[name="additional_step"]').val();
                n.off("click"), n.on("click", function(n) {
                    WidgetWizard.startProgress();
                    var r = t.find('input[name="billingType"]:checked').val(),
                        a = t.find('textarea[name="billingAddress"]').val(),
                        s = t.find('input[name="billingIdentifyNumber"]').val(),
                        l = t.find('input[name="billingCompany"]').val(),
                        c = t.find('textarea[name="companyBillingAddress"]').val(),
                        d = t.find('input[name="billingTaxOffice"]').val(),
                        u = t.find('input[name="billingTaxNumber"]').val(),
                        p = {
                            orderId: e.orderId,
                            additionalStep: i,
                            billingType: r
                        };
                    parseInt(r) === e.corporateBillingId ? (p.billingCompany = l, p.companyBillingAddress = c, p.billingTaxOffice = d, p.billingTaxNumber = u) : (p.personalAddress = a, p.personalidentifyNumber = s), $.post(e.urls.saveAdditionalStep, p, function(t) {
                        t.success === !1 && o(e.translations[t.errorMessage], function() {
                            $("#genericError").modal("hide");
                            var t = setInterval(function() {
                                WidgetWizard.isProgressing() || (WidgetWizard.check(e.additionalSteps.INVOICE), clearInterval(t))
                            }, 100)
                        }), WidgetWizard.stepSaved(i)
                    }), WidgetWizard.check()
                })
            },
            o = function(t, n) {
                AlertModal.show({
                    title: e.translations.ERROR_MESSAGE_STATIC_PAGE,
                    text: t,
                    showCancelButton: !1,
                    confirmButtonText: e.translations.OK_BUTTON,
                    id: "genericError",
                    callback: n
                })
            },
            a = function() {
                $("input[name=billingType]").length > 0 && ($("input[name=billingType]:checked").val() == e.corporateBillingId ? ($(".address-form .radius.checked").removeClass("checked"), $("#kurumsalF").prop("checked", !0).closest(".radius").addClass("checked"), $(".corporate-container").find("input,textarea,select").prop("disabled", !1), $(".corporate-container").show(), $(".personal-container").find("label.error").remove(), $(".personal-container").find("input,textarea,select").prop("disabled", !0), $(".personal-container").hide()) : ($(".address-form .radius.checked").removeClass("checked"), $("#bireyselF").prop("checked", !0).closest(".radius").addClass("checked"), $(".personal-container").find("input,textarea,select").prop("disabled", !1), $(".personal-container").show(), $(".corporate-container").find("label.error").remove(), $(".corporate-container").find("input,textarea,select").prop("disabled", !0), $(".corporate-container").hide()))
            },
            s = function(t) {
                if (t.preventDefault(), !e.lockedRemoveReferenceFile) {
                    e.lockedRemoveReferenceFile = !0, $(".reference-files > span.selected-reference-files-loader").remove(), $(".reference-files").append('<span class="selected-reference-files-loader"><img src="/static/assets/pt_old/images/loading.gif" alt="" width="16" /></span>');
                    var n = $(this).data("file-uri");
                    $.post(e.urls.removeOrderReferenceFiles, {
                        fileUri: n,
                        orderId: e.orderId
                    }, function(t) {
                        t.success && $('ul li a[data-file-uri="' + n + '"]').closest("li").remove(), $(".reference-files > span.selected-reference-files-loader").remove(), e.lockedRemoveReferenceFile = !1
                    })
                }
            },
            l = function() {
                var t = $('.additional-step-wrapper[data-step="cargo"]'),
                    n = t.find("button"),
                    i = t.find('input[name="additional_step"]').val();
                n.off("click"), n.on("click", function(n) {
                    t.find("input.error").removeClass("error"), t.find("textarea.error").removeClass("error"), t.find("select.error").removeClass("error");
                    var r = t.find('input[name="recipient"]').val(),
                        o = t.find('textarea[name="address"]').val(),
                        a = t.find('input[name="city"]').val(),
                        s = t.find('select[name="country"]').val(),
                        l = t.find('select[name="countryCode"]').val(),
                        d = t.find('input[name="phoneNumber"]').val(),
                        u = t.find('textarea[name="instructions"]').val(),
                        p = !c();
                    if (p) {
                        WidgetWizard.startProgress();
                        var f = {
                            orderId: e.orderId,
                            additionalStep: i,
                            recipient: r,
                            address: o,
                            city: a,
                            country: s,
                            countryCode: l,
                            phoneNumber: d,
                            instructions: u
                        };
                        $.post(e.urls.saveAdditionalStep, f, function(e) {
                            WidgetWizard.stepSaved(i)
                        }), WidgetWizard.check()
                    }
                }), t.find("textarea, input, select").off("change"), t.find("textarea, input, select").on("change", function() {
                    $(this).removeClass("error")
                })
            },
            c = function() {
                var e = $('.additional-step-wrapper[data-step="cargo"]'),
                    t = !1,
                    n = e.find('input[name="recipient"]').val(),
                    i = e.find('textarea[name="address"]').val(),
                    r = e.find('input[name="city"]').val(),
                    o = e.find('select[name="country"]').val(),
                    a = e.find('select[name="countryCode"]').val(),
                    s = e.find('input[name="phoneNumber"]').val(),
                    l = e.find('textarea[name="instructions"]').val();
                return "" === n && (t = !0, e.find('input[name="recipient"]').addClass("error")), "" === i && (t = !0, e.find('textarea[name="address"]').addClass("error")), "" === r && (t = !0, e.find('input[name="city"]').addClass("error")), "" === o && (t = !0, e.find('select[name="country"]').addClass("error")), "" === a && (t = !0, e.find('select[name="countryCode"]').addClass("error")), "" === s && (t = !0, e.find('input[name="phoneNumber"]').addClass("error")), "" === l && (t = !0, e.find('textarea[name="instructions"]').addClass("error")), t
            },
            d = function() {
                var t = $('.additional-step-wrapper[data-step="apostille"]'),
                    n = t.find("button"),
                    i = t.find('input[name="additional_step"]').val();
                n.off("click"), n.on("click", function(n) {
                    WidgetWizard.startProgress();
                    var r = t.find('select[name="country"]').val(),
                        o = {
                            orderId: e.orderId,
                            additionalStep: i,
                            country: r
                        };
                    $.post(e.urls.saveAdditionalStep, o, function(e) {
                        WidgetWizard.stepSaved(i)
                    }), WidgetWizard.check()
                })
            },
            u = function() {
                var t = $('.additional-step-wrapper[data-only-next="true"]'),
                    n = t.find("button"),
                    i = t.find('input[name="additional_step"]').val();
                n.off("click"), n.on("click", function(t) {
                    WidgetWizard.startProgress();
                    var n = {
                        orderId: e.orderId,
                        additionalStep: i
                    };
                    $.post(e.urls.saveAdditionalStep, n, function(e) {
                        WidgetWizard.stepSaved(i)
                    }), WidgetWizard.check()
                })
            },
            p = function() {
                var t = $("form.address-form");
                0 !== t.length && t.validate({
                    errorPlacement: function(e, t) {
                        var n = t;
                        $(t).next() && "greenCheck" === $(t).next().attr("class") && (n = $(t).next()), e.insertAfter(n)
                    },
                    success: function(e, t) {
                        var n = t;
                        $(t).next() && "greenCheck" === $(t).next().attr("class") && (n = $(t).next()),
                            e.insertAfter(n).removeClass("error").addClass("valid")
                    },
                    rules: {
                        recipient: {
                            required: !0
                        },
                        phoneCode: {
                            required: !0
                        },
                        phoneNumber: {
                            required: !0,
                            remote: {
                                url: e.urls.validatePhone,
                                type: "post",
                                data: {
                                    phoneCode: function() {
                                        return $("select[name=countryCode]").val()
                                    },
                                    phoneNumber: function() {
                                        return $("input[name=phoneNumber]").val()
                                    }
                                }
                            }
                        },
                        address: {
                            required: !0
                        },
                        city: {
                            required: !0
                        },
                        country: {
                            required: !0
                        }
                    },
                    messages: {
                        recipient: {
                            required: e.translations.FULLNAME_REQUIRED
                        },
                        phoneCode: {
                            required: ""
                        },
                        phoneNumber: {
                            required: e.translations.PHONE_NUMBER_REQUIRED,
                            remote: e.translations.PHONE_NUMBER_INVALID
                        },
                        address: {
                            required: e.translations.ADDRESS_REQUIRED
                        },
                        city: {
                            required: e.translations.CITY_REQUIRED
                        },
                        country: {
                            required: ""
                        }
                    }
                })
            },
            f = function(n) {
                $.extend(e, n), t()
            };
        return {
            init: f
        }
    }(),
    WidgetWizard = function() {
        var e = {
                checkPath: null,
                wrapper: null,
                currentStep: null,
                nextStep: null,
                lastStep: null,
                steps: [],
                wizardService: null,
                wizardServiceConfig: {},
                translations: [],
                useBreadcrumb: !1,
                breadcrumbClass: null,
                useMiniVersion: !1,
                progressing: !1
            },
            t = {
                mainClass: "progress-ring",
                circleClass: "progress-ring__circle",
                circleShadowClass: "progress-ring__circle__shadow",
                backgroundColor: "#ddd",
                borderColor: "#02b9fb",
                borderLength: 4,
                circumference: null,
                currentVersion: "default",
                "default": {
                    width: 90,
                    height: 90,
                    r: 39,
                    cx: 45,
                    cy: 45
                },
                mini: {
                    width: 60,
                    height: 60,
                    r: 26,
                    cx: 30,
                    cy: 30
                }
            },
            n = function(t) {
                if (null !== e.checkPath && null !== e.currentStep && null !== e.lastStep && null !== e.wrapper && null !== e.wizardService) {
                    d(), e.progressing = !0;
                    var n = {
                        currentStep: "undefined" != typeof t ? t : e.nextStep ? e.nextStep : e.currentStep
                    };
                    $.get(e.checkPath, n, function(t) {
                        t.success && ($(e.wrapper).html(t.html), "function" == typeof e.wizardService.init && e.wizardService.init(e.wizardServiceConfig), e.useBreadcrumb && ($(e.wrapper).parent().find(e.breadcrumbClass).find("ul li").removeClass("active"), $(e.wrapper).parent().find(e.breadcrumbClass).find('ul li[data-step="' + t.currentStep + '"]').addClass("active"), i()), e.nextStep = t.nextStep, e.currentStep = t.currentStep, r()), e.progressing = !1
                    })
                }
            },
            i = function() {
                $(e.breadcrumbClass).find("ul li").off("click"), $(e.breadcrumbClass).find("ul li").on("click", function() {
                    n($(this).data("step"))
                })
            },
            r = function() {
                var n = $("." + t.mainClass).find("." + t.circleClass);
                n.css("strokeDasharray", t.circumference + " " + t.circumference), n.css("strokeDashoffset", t.circumference);
                var i = 1;
                for (var r in e.steps)
                    if (parseInt(e.steps[r]) === parseInt(e.currentStep)) {
                        i = parseInt(r) + 1;
                        break
                    } var a = Math.round(100 * i / e.steps.length);
                o(a), $(e.breadcrumbClass).find(".mobile-breadcrumb span").text(i)
            },
            o = function(e) {
                $("." + t.mainClass).find("." + t.circleClass).css("strokeDashoffset", parseFloat(t.circumference - parseInt(e) / 100 * t.circumference))
            },
            a = function() {
                var n, i, o, a, s;
                $(window).width() <= 400 || e.useMiniVersion ? (n = t.mini.width, i = t.mini.height, o = t.mini.r, a = t.mini.cx, s = t.mini.cy, t.currentVersion = "mini") : (n = t["default"].width, i = t["default"].height, o = t["default"].r, a = t["default"].cx, s = t["default"].cy, t.currentVersion = "default");
                var l = '<svg                                    class="' + t.mainClass + '"                                    width="' + n + '"\n                                    height="' + i + '">\n                                <circle                                        class="' + t.circleShadowClass + '"                                        stroke="' + t.backgroundColor + '"                                        stroke-width="' + t.borderLength + '"                                        fill="transparent"                                        r="' + o + '"                                        cx="' + a + '"                                        cy="' + s + '"/>                                <circle                                        class="' + t.circleClass + '"                                        stroke="' + t.borderColor + '"                                        stroke-width="' + t.borderLength + '"                                        fill="transparent"                                        r="' + o + '"                                        cx="' + a + '"                                        cy="' + s + '"/>\n                            </svg><span></span>';
                t.circumference = 2 * o * Math.PI, $(e.breadcrumbClass).find(".mobile-breadcrumb").html(l), r()
            },
            s = function(i) {
                $.extend(e, i), a(), $(window).on("resize", function() {
                    var n = $(window).width() <= 400 || e.useMiniVersion;
                    (n && "mini" !== t.currentVersion || !n && "default" !== t.currentVersion) && a()
                }), n()
            },
            l = function(t) {
                parseInt(t) === parseInt(e.steps[e.steps.length - 1]) && $(e.breadcrumbClass).after('<p class="alert alert-success ml-2 mr-2">' + e.translations.SAVED_TEXT + "</p>")
            },
            c = function() {
                $(".additional-steps-wrapper .alert").remove()
            },
            d = function() {
                c(), $(e.wrapper).html('<p class="text-center m-2"><img src="/static/assets/admin/images/loading.gif" border="0" alt="" /></p>')
            },
            u = function(e) {
                n(e)
            },
            p = function() {
                return e.progressing
            };
        return {
            init: s,
            check: u,
            startProgress: d,
            isProgressing: p,
            stepSaved: l,
            clearAlerts: c
        }
    }();
//# sourceMappingURL=app.min.js.map