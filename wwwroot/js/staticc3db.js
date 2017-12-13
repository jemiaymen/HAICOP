function _toConsumableArray(t) {
    if (Array.isArray(t)) {
        for (var e = 0, i = Array(t.length); e < t.length; e++) i[e] = t[e];
        return i
    }
    return Array.from(t)
}
var requirejs, require, define, dewaGlobal = {};
! function (global) {
    function isFunction(t) {
        return "[object Function]" === ostring.call(t)
    }

    function isArray(t) {
        return "[object Array]" === ostring.call(t)
    }

    function each(t, e) {
        if (t) {
            var i;
            for (i = 0; i < t.length && (!t[i] || !e(t[i], i, t)); i += 1);
        }
    }

    function eachReverse(t, e) {
        if (t) {
            var i;
            for (i = t.length - 1; i > -1 && (!t[i] || !e(t[i], i, t)); i -= 1);
        }
    }

    function hasProp(t, e) {
        return hasOwn.call(t, e)
    }

    function getOwn(t, e) {
        return hasProp(t, e) && t[e]
    }

    function eachProp(t, e) {
        var i;
        for (i in t)
            if (hasProp(t, i) && e(t[i], i)) break
    }

    function mixin(t, e, i, n) {
        return e && eachProp(e, function (e, o) {
            (i || !hasProp(t, o)) && (!n || "object" != typeof e || !e || isArray(e) || isFunction(e) || e instanceof RegExp ? t[o] = e : (t[o] || (t[o] = {}), mixin(t[o], e, i, n)))
        }), t
    }

    function bind(t, e) {
        return function () {
            return e.apply(t, arguments)
        }
    }

    function scripts() {
        return document.getElementsByTagName("script")
    }

    function defaultOnError(t) {
        throw t
    }

    function getGlobal(t) {
        if (!t) return t;
        var e = global;
        return each(t.split("."), function (t) {
            e = e[t]
        }), e
    }

    function makeError(t, e, i, n) {
        var o = new Error(e + "\nhttp://requirejs.org/docs/errors.html#" + t);
        return o.requireType = t, o.requireModules = n, i && (o.originalError = i), o
    }

    function newContext(t) {
        function e(t) {
            var e, i;
            for (e = 0; e < t.length; e++)
                if (i = t[e], "." === i) t.splice(e, 1), e -= 1;
                else if (".." === i) {
                    if (0 === e || 1 == e && ".." === t[2] || ".." === t[e - 1]) continue;
                    e > 0 && (t.splice(e - 1, 2), e -= 2)
                }
        }

        function i(t, i, n) {
            var o, s, r, a, l, c, d, h, u, p, f, m, g = i && i.split("/"),
                v = _.map,
                y = v && v["*"];
            if (t && (t = t.split("/"), d = t.length - 1, _.nodeIdCompat && jsSuffixRegExp.test(t[d]) && (t[d] = t[d].replace(jsSuffixRegExp, "")), "." === t[0].charAt(0) && g && (m = g.slice(0, g.length - 1), t = m.concat(t)), e(t), t = t.join("/")), n && v && (g || y)) {
                r = t.split("/");
                t: for (a = r.length; a > 0; a -= 1) {
                    if (c = r.slice(0, a).join("/"), g)
                        for (l = g.length; l > 0; l -= 1)
                            if (s = getOwn(v, g.slice(0, l).join("/")), s && (s = getOwn(s, c))) {
                                h = s, u = a;
                                break t
                            } !p && y && getOwn(y, c) && (p = getOwn(y, c), f = a)
                } !h && p && (h = p, u = f), h && (r.splice(0, u, h), t = r.join("/"))
            }
            return o = getOwn(_.pkgs, t), o ? o : t
        }

        function n(t) {
            isBrowser && each(scripts(), function (e) {
                return e.getAttribute("data-requiremodule") === t && e.getAttribute("data-requirecontext") === x.contextName ? (e.parentNode.removeChild(e), !0) : void 0
            })
        }

        function o(t) {
            var e = getOwn(_.paths, t);
            return e && isArray(e) && e.length > 1 ? (e.shift(), x.require.undef(t), x.makeRequire(null, {
                skipMap: !0
            })([t]), !0) : void 0
        }

        function s(t) {
            var e, i = t ? t.indexOf("!") : -1;
            return i > -1 && (e = t.substring(0, i), t = t.substring(i + 1, t.length)), [e, t]
        }

        function r(t, e, n, o) {
            var r, a, l, c, d = null,
                h = e ? e.name : null,
                u = t,
                p = !0,
                f = "";
            return t || (p = !1, t = "_@r" + (E += 1)), c = s(t), d = c[0], t = c[1], d && (d = i(d, h, o), a = getOwn(P, d)), t && (d ? f = a && a.normalize ? a.normalize(t, function (t) {
                return i(t, h, o)
            }) : -1 === t.indexOf("!") ? i(t, h, o) : t : (f = i(t, h, o), c = s(f), d = c[0], f = c[1], n = !0, r = x.nameToUrl(f))), l = !d || a || n ? "" : "_unnormalized" + (L += 1), {
                    prefix: d,
                    name: f,
                    parentMap: e,
                    unnormalized: !!l,
                    url: r,
                    originalName: u,
                    isDefine: p,
                    id: (d ? d + "!" + f : f) + l
                }
        }

        function a(t) {
            var e = t.id,
                i = getOwn(C, e);
            return i || (i = C[e] = new x.Module(t)), i
        }

        function l(t, e, i) {
            var n = t.id,
                o = getOwn(C, n);
            !hasProp(P, n) || o && !o.defineEmitComplete ? (o = a(t), o.error && "error" === e ? i(o.error) : o.on(e, i)) : "defined" === e && i(P[n])
        }

        function c(t, e) {
            var i = t.requireModules,
                n = !1;
            e ? e(t) : (each(i, function (e) {
                var i = getOwn(C, e);
                i && (i.error = t, i.events.error && (n = !0, i.emit("error", t)))
            }), n || req.onError(t))
        }

        function d() {
            globalDefQueue.length && (apsp.apply(S, [S.length, 0].concat(globalDefQueue)), globalDefQueue = [])
        }

        function h(t) {
            delete C[t], delete T[t]
        }

        function u(t, e, i) {
            var n = t.map.id;
            t.error ? t.emit("error", t.error) : (e[n] = !0, each(t.depMaps, function (n, o) {
                var s = n.id,
                    r = getOwn(C, s);
                !r || t.depMatched[o] || i[s] || (getOwn(e, s) ? (t.defineDep(o, P[s]), t.check()) : u(r, e, i))
            }), i[n] = !0)
        }

        function p() {
            var t, e, i = 1e3 * _.waitSeconds,
                s = i && x.startTime + i < (new Date).getTime(),
                r = [],
                a = [],
                l = !1,
                d = !0;
            if (!y) {
                if (y = !0, eachProp(T, function (t) {
                    var i = t.map,
                        c = i.id;
                    if (t.enabled && (i.isDefine || a.push(t), !t.error))
                        if (!t.inited && s) o(c) ? (e = !0, l = !0) : (r.push(c), n(c));
                        else if (!t.inited && t.fetched && i.isDefine && (l = !0, !i.prefix)) return d = !1
                }), s && r.length) return t = makeError("timeout", "Load timeout for modules: " + r, null, r), t.contextName = x.contextName, c(t);
                d && each(a, function (t) {
                    u(t, {}, {})
                }), s && !e || !l || !isBrowser && !isWebWorker || k || (k = setTimeout(function () {
                    k = 0, p()
                }, 50)), y = !1
            }
        }

        function f(t) {
            hasProp(P, t[0]) || a(r(t[0], null, !0)).init(t[1], t[2])
        }

        function m(t, e, i, n) {
            t.detachEvent && !isOpera ? n && t.detachEvent(n, e) : t.removeEventListener(i, e, !1)
        }

        function g(t) {
            var e = t.currentTarget || t.srcElement;
            return m(e, x.onScriptLoad, "load", "onreadystatechange"), m(e, x.onScriptError, "error"), {
                node: e,
                id: e && e.getAttribute("data-requiremodule")
            }
        }

        function v() {
            var t;
            for (d(); S.length;) {
                if (t = S.shift(), null === t[0]) return c(makeError("mismatch", "Mismatched anonymous define() module: " + t[t.length - 1]));
                f(t)
            }
        }
        var y, b, x, w, k, _ = {
            waitSeconds: 7,
            baseUrl: "./",
            paths: {},
            bundles: {},
            pkgs: {},
            shim: {},
            config: {}
        },
            C = {},
            T = {},
            $ = {},
            S = [],
            P = {},
            M = {},
            A = {},
            E = 1,
            L = 1;
        return w = {
            require: function (t) {
                return t.require ? t.require : t.require = x.makeRequire(t.map)
            },
            exports: function (t) {
                return t.usingExports = !0, t.map.isDefine ? t.exports ? P[t.map.id] = t.exports : t.exports = P[t.map.id] = {} : void 0
            },
            module: function (t) {
                return t.module ? t.module : t.module = {
                    id: t.map.id,
                    uri: t.map.url,
                    config: function () {
                        return getOwn(_.config, t.map.id) || {}
                    },
                    exports: t.exports || (t.exports = {})
                }
            }
        }, b = function (t) {
            this.events = getOwn($, t.id) || {}, this.map = t, this.shim = getOwn(_.shim, t.id), this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0
        }, b.prototype = {
            init: function (t, e, i, n) {
                n = n || {}, this.inited || (this.factory = e, i ? this.on("error", i) : this.events.error && (i = bind(this, function (t) {
                    this.emit("error", t)
                })), this.depMaps = t && t.slice(0), this.errback = i, this.inited = !0, this.ignore = n.ignore, n.enabled || this.enabled ? this.enable() : this.check())
            },
            defineDep: function (t, e) {
                this.depMatched[t] || (this.depMatched[t] = !0, this.depCount -= 1, this.depExports[t] = e)
            },
            fetch: function () {
                if (!this.fetched) {
                    this.fetched = !0, x.startTime = (new Date).getTime();
                    var t = this.map;
                    return this.shim ? void x.makeRequire(this.map, {
                        enableBuildCallback: !0
                    })(this.shim.deps || [], bind(this, function () {
                        return t.prefix ? this.callPlugin() : this.load()
                    })) : t.prefix ? this.callPlugin() : this.load()
                }
            },
            load: function () {
                var t = this.map.url;
                M[t] || (M[t] = !0, x.load(this.map.id, t))
            },
            check: function () {
                if (this.enabled && !this.enabling) {
                    var t, e, i = this.map.id,
                        n = this.depExports,
                        o = this.exports,
                        s = this.factory;
                    if (this.inited) {
                        if (this.error) this.emit("error", this.error);
                        else if (!this.defining) {
                            if (this.defining = !0, this.depCount < 1 && !this.defined) {
                                if (isFunction(s)) {
                                    if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) try {
                                        o = x.execCb(i, s, n, o)
                                    } catch (r) {
                                        t = r
                                    } else o = x.execCb(i, s, n, o);
                                    if (this.map.isDefine && void 0 === o && (e = this.module, e ? o = e.exports : this.usingExports && (o = this.exports)), t) return t.requireMap = this.map, t.requireModules = this.map.isDefine ? [this.map.id] : null, t.requireType = this.map.isDefine ? "define" : "require", c(this.error = t)
                                } else o = s;
                                this.exports = o, this.map.isDefine && !this.ignore && (P[i] = o, req.onResourceLoad && req.onResourceLoad(x, this.map, this.depMaps)), h(i), this.defined = !0
                            }
                            this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                        }
                    } else this.fetch()
                }
            },
            callPlugin: function () {
                var t = this.map,
                    e = t.id,
                    n = r(t.prefix);
                this.depMaps.push(n), l(n, "defined", bind(this, function (n) {
                    var o, s, d, u = getOwn(A, this.map.id),
                        p = this.map.name,
                        f = this.map.parentMap ? this.map.parentMap.name : null,
                        m = x.makeRequire(t.parentMap, {
                            enableBuildCallback: !0
                        });
                    return this.map.unnormalized ? (n.normalize && (p = n.normalize(p, function (t) {
                        return i(t, f, !0)
                    }) || ""), s = r(t.prefix + "!" + p, this.map.parentMap), l(s, "defined", bind(this, function (t) {
                        this.init([], function () {
                            return t
                        }, null, {
                                enabled: !0,
                                ignore: !0
                            })
                    })), d = getOwn(C, s.id), void (d && (this.depMaps.push(s), this.events.error && d.on("error", bind(this, function (t) {
                        this.emit("error", t)
                    })), d.enable()))) : u ? (this.map.url = x.nameToUrl(u), void this.load()) : (o = bind(this, function (t) {
                        this.init([], function () {
                            return t
                        }, null, {
                                enabled: !0
                            })
                    }), o.error = bind(this, function (t) {
                        this.inited = !0, this.error = t, t.requireModules = [e], eachProp(C, function (t) {
                            0 === t.map.id.indexOf(e + "_unnormalized") && h(t.map.id)
                        }), c(t)
                    }), o.fromText = bind(this, function (i, n) {
                        var s = t.name,
                            l = r(s),
                            d = useInteractive;
                        n && (i = n), d && (useInteractive = !1), a(l), hasProp(_.config, e) && (_.config[s] = _.config[e]);
                        try {
                            req.exec(i)
                        } catch (h) {
                            return c(makeError("fromtexteval", "fromText eval for " + e + " failed: " + h, h, [e]))
                        }
                        d && (useInteractive = !0), this.depMaps.push(l), x.completeLoad(s), m([s], o)
                    }), void n.load(t.name, m, o, _))
                })), x.enable(n, this), this.pluginMaps[n.id] = n
            },
            enable: function () {
                T[this.map.id] = this, this.enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function (t, e) {
                    var i, n, o;
                    if ("string" == typeof t) {
                        if (t = r(t, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[e] = t, o = getOwn(w, t.id)) return void (this.depExports[e] = o(this));
                        this.depCount += 1, l(t, "defined", bind(this, function (t) {
                            this.defineDep(e, t), this.check()
                        })), this.errback && l(t, "error", bind(this, this.errback))
                    }
                    i = t.id, n = C[i], hasProp(w, i) || !n || n.enabled || x.enable(t, this)
                })), eachProp(this.pluginMaps, bind(this, function (t) {
                    var e = getOwn(C, t.id);
                    e && !e.enabled && x.enable(t, this)
                })), this.enabling = !1, this.check()
            },
            on: function (t, e) {
                var i = this.events[t];
                i || (i = this.events[t] = []), i.push(e)
            },
            emit: function (t, e) {
                each(this.events[t], function (t) {
                    t(e)
                }), "error" === t && delete this.events[t]
            }
        }, x = {
            config: _,
            contextName: t,
            registry: C,
            defined: P,
            urlFetched: M,
            defQueue: S,
            Module: b,
            makeModuleMap: r,
            nextTick: req.nextTick,
            onError: c,
            configure: function (t) {
                t.baseUrl && "/" !== t.baseUrl.charAt(t.baseUrl.length - 1) && (t.baseUrl += "/");
                var e = _.shim,
                    i = {
                        paths: !0,
                        bundles: !0,
                        config: !0,
                        map: !0
                    };
                eachProp(t, function (t, e) {
                    i[e] ? (_[e] || (_[e] = {}), mixin(_[e], t, !0, !0)) : _[e] = t
                }), t.bundles && eachProp(t.bundles, function (t, e) {
                    each(t, function (t) {
                        t !== e && (A[t] = e)
                    })
                }), t.shim && (eachProp(t.shim, function (t, i) {
                    isArray(t) && (t = {
                        deps: t
                    }), !t.exports && !t.init || t.exportsFn || (t.exportsFn = x.makeShimExports(t)), e[i] = t
                }), _.shim = e), t.packages && each(t.packages, function (t) {
                    var e, i;
                    t = "string" == typeof t ? {
                        name: t
                    } : t, i = t.name, e = t.location, e && (_.paths[i] = t.location), _.pkgs[i] = t.name + "/" + (t.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                }), eachProp(C, function (t, e) {
                    t.inited || t.map.unnormalized || (t.map = r(e))
                }), (t.deps || t.callback) && x.require(t.deps || [], t.callback)
            },
            makeShimExports: function (t) {
                function e() {
                    var e;
                    return t.init && (e = t.init.apply(global, arguments)), e || t.exports && getGlobal(t.exports)
                }
                return e
            },
            makeRequire: function (e, o) {
                function s(i, n, l) {
                    var d, h, u;
                    return o.enableBuildCallback && n && isFunction(n) && (n.__requireJsBuild = !0), "string" == typeof i ? isFunction(n) ? c(makeError("requireargs", "Invalid require call"), l) : e && hasProp(w, i) ? w[i](C[e.id]) : req.get ? req.get(x, i, e, s) : (h = r(i, e, !1, !0), d = h.id, hasProp(P, d) ? P[d] : c(makeError("notloaded", 'Module name "' + d + '" has not been loaded yet for context: ' + t + (e ? "" : ". Use require([])")))) : (v(), x.nextTick(function () {
                        v(), u = a(r(null, e)), u.skipMap = o.skipMap, u.init(i, n, l, {
                            enabled: !0
                        }), p()
                    }), s)
                }
                return o = o || {}, mixin(s, {
                    isBrowser: isBrowser,
                    toUrl: function (t) {
                        var n, o = t.lastIndexOf("."),
                            s = t.split("/")[0],
                            r = "." === s || ".." === s;
                        return -1 !== o && (!r || o > 1) && (n = t.substring(o, t.length), t = t.substring(0, o)), x.nameToUrl(i(t, e && e.id, !0), n, !0)
                    },
                    defined: function (t) {
                        return hasProp(P, r(t, e, !1, !0).id)
                    },
                    specified: function (t) {
                        return t = r(t, e, !1, !0).id, hasProp(P, t) || hasProp(C, t)
                    }
                }), e || (s.undef = function (t) {
                    d();
                    var i = r(t, e, !0),
                        o = getOwn(C, t);
                    n(t), delete P[t], delete M[i.url], delete $[t], eachReverse(S, function (e, i) {
                        e[0] === t && S.splice(i, 1)
                    }), o && (o.events.defined && ($[t] = o.events), h(t))
                }), s
            },
            enable: function (t) {
                var e = getOwn(C, t.id);
                e && a(t).enable()
            },
            completeLoad: function (t) {
                var e, i, n, s = getOwn(_.shim, t) || {},
                    r = s.exports;
                for (d(); S.length;) {
                    if (i = S.shift(), null === i[0]) {
                        if (i[0] = t, e) break;
                        e = !0
                    } else i[0] === t && (e = !0);
                    f(i)
                }
                if (n = getOwn(C, t), !e && !hasProp(P, t) && n && !n.inited) {
                    if (!(!_.enforceDefine || r && getGlobal(r))) return o(t) ? void 0 : c(makeError("nodefine", "No define call for " + t, null, [t]));
                    f([t, s.deps || [], s.exportsFn])
                }
                p()
            },
            nameToUrl: function (t, e, i) {
                var n, o, s, r, a, l, c, d = getOwn(_.pkgs, t);
                if (d && (t = d), c = getOwn(A, t)) return x.nameToUrl(c, e, i);
                if (req.jsExtRegExp.test(t)) a = t + (e || "");
                else {
                    for (n = _.paths, o = t.split("/"), s = o.length; s > 0; s -= 1)
                        if (r = o.slice(0, s).join("/"), l = getOwn(n, r)) {
                            isArray(l) && (l = l[0]), o.splice(0, s, l);
                            break
                        }
                    a = o.join("/"), a += e || (/^data\:|\?/.test(a) || i ? "" : ".js"), a = ("/" === a.charAt(0) || a.match(/^[\w\+\.\-]+:/) ? "" : _.baseUrl) + a
                }
                return _.urlArgs ? a + ((-1 === a.indexOf("?") ? "?" : "&") + _.urlArgs) : a
            },
            load: function (t, e) {
                req.load(x, t, e)
            },
            execCb: function (t, e, i, n) {
                return e.apply(n, i)
            },
            onScriptLoad: function (t) {
                if ("load" === t.type || readyRegExp.test((t.currentTarget || t.srcElement).readyState)) {
                    interactiveScript = null;
                    var e = g(t);
                    x.completeLoad(e.id)
                }
            },
            onScriptError: function (t) {
                var e = g(t);
                return o(e.id) ? void 0 : c(makeError("scripterror", "Script error for: " + e.id, t, [e.id]))
            }
        }, x.require = x.makeRequire(), x
    }

    function getInteractiveScript() {
        return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript : (eachReverse(scripts(), function (t) {
            return "interactive" === t.readyState ? interactiveScript = t : void 0
        }), interactiveScript)
    }
    var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.1.15",
        commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        ap = Array.prototype,
        apsp = ap.splice,
        isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document),
        isWebWorker = !isBrowser && "undefined" != typeof importScripts,
        readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/,
        defContextName = "_",
        isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(),
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = !1;
    if ("undefined" == typeof define) {
        if ("undefined" != typeof requirejs) {
            if (isFunction(requirejs)) return;
            cfg = requirejs, requirejs = void 0
        }
        "undefined" == typeof require || isFunction(require) || (cfg = require, require = void 0), req = requirejs = function (t, e, i, n) {
            var o, s, r = defContextName;
            return isArray(t) || "string" == typeof t || (s = t, isArray(e) ? (t = e, e = i, i = n) : t = []), s && s.context && (r = s.context), o = getOwn(contexts, r), o || (o = contexts[r] = req.s.newContext(r)), s && o.configure(s), o.require(t, e, i)
        }, req.config = function (t) {
            return req(t)
        }, req.nextTick = "undefined" != typeof setTimeout ? function (t) {
            setTimeout(t, 4)
        } : function (t) {
            t()
        }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = {
            contexts: contexts,
            newContext: newContext
        }, req({}), each(["toUrl", "undef", "defined", "specified"], function (t) {
            req[t] = function () {
                var e = contexts[defContextName];
                return e.require[t].apply(e, arguments)
            }
        }), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)), req.onError = defaultOnError, req.createNode = function (t, e, i) {
            var n = t.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
            return n.type = t.scriptType || "text/javascript", n.charset = "utf-8", n.async = !0, n
        }, req.load = function (t, e, i) {
            var n, o = t && t.config || {};
            if (isBrowser) return n = req.createNode(o, e, i), n.setAttribute("data-requirecontext", t.contextName), n.setAttribute("data-requiremodule", e), !n.attachEvent || n.attachEvent.toString && n.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (n.addEventListener("load", t.onScriptLoad, !1), n.addEventListener("error", t.onScriptError, !1)) : (useInteractive = !0, n.attachEvent("onreadystatechange", t.onScriptLoad)), n.src = i, currentlyAddingScript = n, baseElement ? head.insertBefore(n, baseElement) : head.appendChild(n), currentlyAddingScript = null, n;
            if (isWebWorker) try {
                importScripts(i), t.completeLoad(e)
            } catch (s) {
                t.onError(makeError("importscripts", "importScripts failed for " + e + " at " + i, s, [e]))
            }
        }, isBrowser && !cfg.skipDataMain && eachReverse(scripts(), function (t) {
            return head || (head = t.parentNode), dataMain = t.getAttribute("data-main"), dataMain ? (mainScript = dataMain, cfg.baseUrl || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0) : void 0
        }), define = function (t, e, i) {
            var n, o;
            "string" != typeof t && (i = e, e = t, t = null), isArray(e) || (i = e, e = null), !e && isFunction(i) && (e = [], i.length && (i.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function (t, i) {
                e.push(i)
            }), e = (1 === i.length ? ["require"] : ["require", "exports", "module"]).concat(e))), useInteractive && (n = currentlyAddingScript || getInteractiveScript(), n && (t || (t = n.getAttribute("data-requiremodule")), o = contexts[n.getAttribute("data-requirecontext")])), (o ? o.defQueue : globalDefQueue).push([t, e, i])
        }, define.amd = {
            jQuery: !0
        }, req.exec = function (text) {
            return eval(text)
        }, req(cfg)
    }
}(this), define("vendor/require", function () { }), ! function (t, e) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) : function (t) {
        if (!t.document) throw new Error("jQuery requires a window with a document");
        return e(t)
    } : e(t)
}("undefined" != typeof window ? window : this, function (t, e) {
    function i(t) {
        var e = "length" in t && t.length,
            i = ot.type(t);
        return "function" === i || ot.isWindow(t) ? !1 : 1 === t.nodeType && e ? !0 : "array" === i || 0 === e || "number" == typeof e && e > 0 && e - 1 in t
    }

    function n(t, e, i) {
        if (ot.isFunction(e)) return ot.grep(t, function (t, n) {
            return !!e.call(t, n, t) !== i
        });
        if (e.nodeType) return ot.grep(t, function (t) {
            return t === e !== i
        });
        if ("string" == typeof e) {
            if (ut.test(e)) return ot.filter(e, t, i);
            e = ot.filter(e, t)
        }
        return ot.grep(t, function (t) {
            return ot.inArray(t, e) >= 0 !== i
        })
    }

    function o(t, e) {
        do t = t[e]; while (t && 1 !== t.nodeType);
        return t
    }

    function s(t) {
        var e = xt[t] = {};
        return ot.each(t.match(bt) || [], function (t, i) {
            e[i] = !0
        }), e
    }

    function r() {
        ft.addEventListener ? (ft.removeEventListener("DOMContentLoaded", a, !1), t.removeEventListener("load", a, !1)) : (ft.detachEvent("onreadystatechange", a), t.detachEvent("onload", a))
    }

    function a() {
        (ft.addEventListener || "load" === event.type || "complete" === ft.readyState) && (r(), ot.ready())
    }

    function l(t, e, i) {
        if (void 0 === i && 1 === t.nodeType) {
            var n = "data-" + e.replace(Tt, "-$1").toLowerCase();
            if (i = t.getAttribute(n), "string" == typeof i) {
                try {
                    i = "true" === i ? !0 : "false" === i ? !1 : "null" === i ? null : +i + "" === i ? +i : Ct.test(i) ? ot.parseJSON(i) : i
                } catch (o) { }
                ot.data(t, e, i)
            } else i = void 0
        }
        return i
    }

    function c(t) {
        var e;
        for (e in t)
            if (("data" !== e || !ot.isEmptyObject(t[e])) && "toJSON" !== e) return !1;
        return !0
    }

    function d(t, e, i, n) {
        if (ot.acceptData(t)) {
            var o, s, r = ot.expando,
                a = t.nodeType,
                l = a ? ot.cache : t,
                c = a ? t[r] : t[r] && r;
            if (c && l[c] && (n || l[c].data) || void 0 !== i || "string" != typeof e) return c || (c = a ? t[r] = G.pop() || ot.guid++ : r), l[c] || (l[c] = a ? {} : {
                toJSON: ot.noop
            }), ("object" == typeof e || "function" == typeof e) && (n ? l[c] = ot.extend(l[c], e) : l[c].data = ot.extend(l[c].data, e)), s = l[c], n || (s.data || (s.data = {}), s = s.data), void 0 !== i && (s[ot.camelCase(e)] = i), "string" == typeof e ? (o = s[e], null == o && (o = s[ot.camelCase(e)])) : o = s, o
        }
    }

    function h(t, e, i) {
        if (ot.acceptData(t)) {
            var n, o, s = t.nodeType,
                r = s ? ot.cache : t,
                a = s ? t[ot.expando] : ot.expando;
            if (r[a]) {
                if (e && (n = i ? r[a] : r[a].data)) {
                    ot.isArray(e) ? e = e.concat(ot.map(e, ot.camelCase)) : e in n ? e = [e] : (e = ot.camelCase(e), e = e in n ? [e] : e.split(" ")), o = e.length;
                    for (; o--;) delete n[e[o]];
                    if (i ? !c(n) : !ot.isEmptyObject(n)) return
                } (i || (delete r[a].data, c(r[a]))) && (s ? ot.cleanData([t], !0) : it.deleteExpando || r != r.window ? delete r[a] : r[a] = null)
            }
        }
    }

    function u() {
        return !0
    }

    function p() {
        return !1
    }

    function f() {
        try {
            return ft.activeElement
        } catch (t) { }
    }

    function m(t) {
        var e = Ht.split("|"),
            i = t.createDocumentFragment();
        if (i.createElement)
            for (; e.length;) i.createElement(e.pop());
        return i
    }

    function g(t, e) {
        var i, n, o = 0,
            s = typeof t.getElementsByTagName !== _t ? t.getElementsByTagName(e || "*") : typeof t.querySelectorAll !== _t ? t.querySelectorAll(e || "*") : void 0;
        if (!s)
            for (s = [], i = t.childNodes || t; null != (n = i[o]); o++) !e || ot.nodeName(n, e) ? s.push(n) : ot.merge(s, g(n, e));
        return void 0 === e || e && ot.nodeName(t, e) ? ot.merge([t], s) : s
    }

    function v(t) {
        At.test(t.type) && (t.defaultChecked = t.checked)
    }

    function y(t, e) {
        return ot.nodeName(t, "table") && ot.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
    }

    function b(t) {
        return t.type = (null !== ot.find.attr(t, "type")) + "/" + t.type, t
    }

    function x(t) {
        var e = Vt.exec(t.type);
        return e ? t.type = e[1] : t.removeAttribute("type"), t
    }

    function w(t, e) {
        for (var i, n = 0; null != (i = t[n]); n++) ot._data(i, "globalEval", !e || ot._data(e[n], "globalEval"))
    }

    function k(t, e) {
        if (1 === e.nodeType && ot.hasData(t)) {
            var i, n, o, s = ot._data(t),
                r = ot._data(e, s),
                a = s.events;
            if (a) {
                delete r.handle, r.events = {};
                for (i in a)
                    for (n = 0, o = a[i].length; o > n; n++) ot.event.add(e, i, a[i][n])
            }
            r.data && (r.data = ot.extend({}, r.data))
        }
    }

    function _(t, e) {
        var i, n, o;
        if (1 === e.nodeType) {
            if (i = e.nodeName.toLowerCase(), !it.noCloneEvent && e[ot.expando]) {
                o = ot._data(e);
                for (n in o.events) ot.removeEvent(e, n, o.handle);
                e.removeAttribute(ot.expando)
            }
            "script" === i && e.text !== t.text ? (b(e).text = t.text, x(e)) : "object" === i ? (e.parentNode && (e.outerHTML = t.outerHTML), it.html5Clone && t.innerHTML && !ot.trim(e.innerHTML) && (e.innerHTML = t.innerHTML)) : "input" === i && At.test(t.type) ? (e.defaultChecked = e.checked = t.checked, e.value !== t.value && (e.value = t.value)) : "option" === i ? e.defaultSelected = e.selected = t.defaultSelected : ("input" === i || "textarea" === i) && (e.defaultValue = t.defaultValue)
        }
    }

    function C(e, i) {
        var n, o = ot(i.createElement(e)).appendTo(i.body),
            s = t.getDefaultComputedStyle && (n = t.getDefaultComputedStyle(o[0])) ? n.display : ot.css(o[0], "display");
        return o.detach(), s
    }

    function T(t) {
        var e = ft,
            i = Qt[t];
        return i || (i = C(t, e), "none" !== i && i || (Zt = (Zt || ot("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement), e = (Zt[0].contentWindow || Zt[0].contentDocument).document, e.write(), e.close(), i = C(t, e), Zt.detach()), Qt[t] = i), i
    }

    function $(t, e) {
        return {
            get: function () {
                var i = t();
                return null != i ? i ? void delete this.get : (this.get = e).apply(this, arguments) : void 0
            }
        }
    }

    function S(t, e) {
        if (e in t) return e;
        for (var i = e.charAt(0).toUpperCase() + e.slice(1), n = e, o = ue.length; o--;)
            if (e = ue[o] + i, e in t) return e;
        return n
    }

    function P(t, e) {
        for (var i, n, o, s = [], r = 0, a = t.length; a > r; r++) n = t[r], n.style && (s[r] = ot._data(n, "olddisplay"), i = n.style.display, e ? (s[r] || "none" !== i || (n.style.display = ""), "" === n.style.display && Pt(n) && (s[r] = ot._data(n, "olddisplay", T(n.nodeName)))) : (o = Pt(n), (i && "none" !== i || !o) && ot._data(n, "olddisplay", o ? i : ot.css(n, "display"))));
        for (r = 0; a > r; r++) n = t[r], n.style && (e && "none" !== n.style.display && "" !== n.style.display || (n.style.display = e ? s[r] || "" : "none"));
        return t
    }

    function M(t, e, i) {
        var n = le.exec(e);
        return n ? Math.max(0, n[1] - (i || 0)) + (n[2] || "px") : e
    }

    function A(t, e, i, n, o) {
        for (var s = i === (n ? "border" : "content") ? 4 : "width" === e ? 1 : 0, r = 0; 4 > s; s += 2) "margin" === i && (r += ot.css(t, i + St[s], !0, o)), n ? ("content" === i && (r -= ot.css(t, "padding" + St[s], !0, o)), "margin" !== i && (r -= ot.css(t, "border" + St[s] + "Width", !0, o))) : (r += ot.css(t, "padding" + St[s], !0, o), "padding" !== i && (r += ot.css(t, "border" + St[s] + "Width", !0, o)));
        return r
    }

    function E(t, e, i) {
        var n = !0,
            o = "width" === e ? t.offsetWidth : t.offsetHeight,
            s = te(t),
            r = it.boxSizing && "border-box" === ot.css(t, "boxSizing", !1, s);
        if (0 >= o || null == o) {
            if (o = ee(t, e, s), (0 > o || null == o) && (o = t.style[e]), ne.test(o)) return o;
            n = r && (it.boxSizingReliable() || o === t.style[e]), o = parseFloat(o) || 0
        }
        return o + A(t, e, i || (r ? "border" : "content"), n, s) + "px"
    }

    function L(t, e, i, n, o) {
        return new L.prototype.init(t, e, i, n, o)
    }

    function D() {
        return setTimeout(function () {
            pe = void 0
        }), pe = ot.now()
    }

    function B(t, e) {
        var i, n = {
            height: t
        },
            o = 0;
        for (e = e ? 1 : 0; 4 > o; o += 2 - e) i = St[o], n["margin" + i] = n["padding" + i] = t;
        return e && (n.opacity = n.width = t), n
    }

    function F(t, e, i) {
        for (var n, o = (be[e] || []).concat(be["*"]), s = 0, r = o.length; r > s; s++)
            if (n = o[s].call(i, e, t)) return n
    }

    function H(t, e, i) {
        var n, o, s, r, a, l, c, d, h = this,
            u = {},
            p = t.style,
            f = t.nodeType && Pt(t),
            m = ot._data(t, "fxshow");
        i.queue || (a = ot._queueHooks(t, "fx"), null == a.unqueued && (a.unqueued = 0, l = a.empty.fire, a.empty.fire = function () {
            a.unqueued || l()
        }), a.unqueued++ , h.always(function () {
            h.always(function () {
                a.unqueued-- , ot.queue(t, "fx").length || a.empty.fire()
            })
        })), 1 === t.nodeType && ("height" in e || "width" in e) && (i.overflow = [p.overflow, p.overflowX, p.overflowY], c = ot.css(t, "display"), d = "none" === c ? ot._data(t, "olddisplay") || T(t.nodeName) : c, "inline" === d && "none" === ot.css(t, "float") && (it.inlineBlockNeedsLayout && "inline" !== T(t.nodeName) ? p.zoom = 1 : p.display = "inline-block")), i.overflow && (p.overflow = "hidden", it.shrinkWrapBlocks() || h.always(function () {
            p.overflow = i.overflow[0], p.overflowX = i.overflow[1], p.overflowY = i.overflow[2]
        }));
        for (n in e)
            if (o = e[n], me.exec(o)) {
                if (delete e[n], s = s || "toggle" === o, o === (f ? "hide" : "show")) {
                    if ("show" !== o || !m || void 0 === m[n]) continue;
                    f = !0
                }
                u[n] = m && m[n] || ot.style(t, n)
            } else c = void 0;
        if (ot.isEmptyObject(u)) "inline" === ("none" === c ? T(t.nodeName) : c) && (p.display = c);
        else {
            m ? "hidden" in m && (f = m.hidden) : m = ot._data(t, "fxshow", {}), s && (m.hidden = !f), f ? ot(t).show() : h.done(function () {
                ot(t).hide()
            }), h.done(function () {
                var e;
                ot._removeData(t, "fxshow");
                for (e in u) ot.style(t, e, u[e])
            });
            for (n in u) r = F(f ? m[n] : 0, n, h), n in m || (m[n] = r.start, f && (r.end = r.start, r.start = "width" === n || "height" === n ? 1 : 0))
        }
    }

    function I(t, e) {
        var i, n, o, s, r;
        for (i in t)
            if (n = ot.camelCase(i), o = e[n], s = t[i], ot.isArray(s) && (o = s[1], s = t[i] = s[0]), i !== n && (t[n] = s, delete t[i]), r = ot.cssHooks[n], r && "expand" in r) {
                s = r.expand(s), delete t[n];
                for (i in s) i in t || (t[i] = s[i], e[i] = o)
            } else e[n] = o
    }

    function O(t, e, i) {
        var n, o, s = 0,
            r = ye.length,
            a = ot.Deferred().always(function () {
                delete l.elem
            }),
            l = function () {
                if (o) return !1;
                for (var e = pe || D(), i = Math.max(0, c.startTime + c.duration - e), n = i / c.duration || 0, s = 1 - n, r = 0, l = c.tweens.length; l > r; r++) c.tweens[r].run(s);
                return a.notifyWith(t, [c, s, i]), 1 > s && l ? i : (a.resolveWith(t, [c]), !1)
            },
            c = a.promise({
                elem: t,
                props: ot.extend({}, e),
                opts: ot.extend(!0, {
                    specialEasing: {}
                }, i),
                originalProperties: e,
                originalOptions: i,
                startTime: pe || D(),
                duration: i.duration,
                tweens: [],
                createTween: function (e, i) {
                    var n = ot.Tween(t, c.opts, e, i, c.opts.specialEasing[e] || c.opts.easing);
                    return c.tweens.push(n), n
                },
                stop: function (e) {
                    var i = 0,
                        n = e ? c.tweens.length : 0;
                    if (o) return this;
                    for (o = !0; n > i; i++) c.tweens[i].run(1);
                    return e ? a.resolveWith(t, [c, e]) : a.rejectWith(t, [c, e]), this
                }
            }),
            d = c.props;
        for (I(d, c.opts.specialEasing); r > s; s++)
            if (n = ye[s].call(c, t, d, c.opts)) return n;
        return ot.map(d, F, c), ot.isFunction(c.opts.start) && c.opts.start.call(t, c), ot.fx.timer(ot.extend(l, {
            elem: t,
            anim: c,
            queue: c.opts.queue
        })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
    }

    function j(t) {
        return function (e, i) {
            "string" != typeof e && (i = e, e = "*");
            var n, o = 0,
                s = e.toLowerCase().match(bt) || [];
            if (ot.isFunction(i))
                for (; n = s[o++];) "+" === n.charAt(0) ? (n = n.slice(1) || "*", (t[n] = t[n] || []).unshift(i)) : (t[n] = t[n] || []).push(i)
        }
    }

    function N(t, e, i, n) {
        function o(a) {
            var l;
            return s[a] = !0, ot.each(t[a] || [], function (t, a) {
                var c = a(e, i, n);
                return "string" != typeof c || r || s[c] ? r ? !(l = c) : void 0 : (e.dataTypes.unshift(c), o(c), !1)
            }), l
        }
        var s = {},
            r = t === qe;
        return o(e.dataTypes[0]) || !s["*"] && o("*")
    }

    function z(t, e) {
        var i, n, o = ot.ajaxSettings.flatOptions || {};
        for (n in e) void 0 !== e[n] && ((o[n] ? t : i || (i = {}))[n] = e[n]);
        return i && ot.extend(!0, t, i), t
    }

    function R(t, e, i) {
        for (var n, o, s, r, a = t.contents, l = t.dataTypes;
            "*" === l[0];) l.shift(), void 0 === o && (o = t.mimeType || e.getResponseHeader("Content-Type"));
        if (o)
            for (r in a)
                if (a[r] && a[r].test(o)) {
                    l.unshift(r);
                    break
                }
        if (l[0] in i) s = l[0];
        else {
            for (r in i) {
                if (!l[0] || t.converters[r + " " + l[0]]) {
                    s = r;
                    break
                }
                n || (n = r)
            }
            s = s || n
        }
        return s ? (s !== l[0] && l.unshift(s), i[s]) : void 0
    }

    function q(t, e, i, n) {
        var o, s, r, a, l, c = {},
            d = t.dataTypes.slice();
        if (d[1])
            for (r in t.converters) c[r.toLowerCase()] = t.converters[r];
        for (s = d.shift(); s;)
            if (t.responseFields[s] && (i[t.responseFields[s]] = e), !l && n && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = s, s = d.shift())
                if ("*" === s) s = l;
                else if ("*" !== l && l !== s) {
                    if (r = c[l + " " + s] || c["* " + s], !r)
                        for (o in c)
                            if (a = o.split(" "), a[1] === s && (r = c[l + " " + a[0]] || c["* " + a[0]])) {
                                r === !0 ? r = c[o] : c[o] !== !0 && (s = a[0], d.unshift(a[1]));
                                break
                            }
                    if (r !== !0)
                        if (r && t["throws"]) e = r(e);
                        else try {
                            e = r(e)
                        } catch (h) {
                            return {
                                state: "parsererror",
                                error: r ? h : "No conversion from " + l + " to " + s
                            }
                        }
                }
        return {
            state: "success",
            data: e
        }
    }

    function W(t, e, i, n) {
        var o;
        if (ot.isArray(e)) ot.each(e, function (e, o) {
            i || Ve.test(t) ? n(t, o) : W(t + "[" + ("object" == typeof o ? e : "") + "]", o, i, n)
        });
        else if (i || "object" !== ot.type(e)) n(t, e);
        else
            for (o in e) W(t + "[" + o + "]", e[o], i, n)
    }

    function X() {
        try {
            return new t.XMLHttpRequest
        } catch (e) { }
    }

    function Y() {
        try {
            return new t.ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) { }
    }

    function V(t) {
        return ot.isWindow(t) ? t : 9 === t.nodeType ? t.defaultView || t.parentWindow : !1
    }
    var G = [],
        U = G.slice,
        K = G.concat,
        J = G.push,
        Z = G.indexOf,
        Q = {},
        tt = Q.toString,
        et = Q.hasOwnProperty,
        it = {},
        nt = "1.11.3",
        ot = function (t, e) {
            return new ot.fn.init(t, e)
        },
        st = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        rt = /^-ms-/,
        at = /-([\da-z])/gi,
        lt = function (t, e) {
            return e.toUpperCase()
        };
    ot.fn = ot.prototype = {
        jquery: nt,
        constructor: ot,
        selector: "",
        length: 0,
        toArray: function () {
            return U.call(this)
        },
        get: function (t) {
            return null != t ? 0 > t ? this[t + this.length] : this[t] : U.call(this)
        },
        pushStack: function (t) {
            var e = ot.merge(this.constructor(), t);
            return e.prevObject = this, e.context = this.context, e
        },
        each: function (t, e) {
            return ot.each(this, t, e)
        },
        map: function (t) {
            return this.pushStack(ot.map(this, function (e, i) {
                return t.call(e, i, e)
            }))
        },
        slice: function () {
            return this.pushStack(U.apply(this, arguments))
        },
        first: function () {
            return this.eq(0)
        },
        last: function () {
            return this.eq(-1)
        },
        eq: function (t) {
            var e = this.length,
                i = +t + (0 > t ? e : 0);
            return this.pushStack(i >= 0 && e > i ? [this[i]] : [])
        },
        end: function () {
            return this.prevObject || this.constructor(null)
        },
        push: J,
        sort: G.sort,
        splice: G.splice
    }, ot.extend = ot.fn.extend = function () {
        var t, e, i, n, o, s, r = arguments[0] || {},
            a = 1,
            l = arguments.length,
            c = !1;
        for ("boolean" == typeof r && (c = r, r = arguments[a] || {}, a++), "object" == typeof r || ot.isFunction(r) || (r = {}), a === l && (r = this, a--); l > a; a++)
            if (null != (o = arguments[a]))
                for (n in o) t = r[n], i = o[n], r !== i && (c && i && (ot.isPlainObject(i) || (e = ot.isArray(i))) ? (e ? (e = !1, s = t && ot.isArray(t) ? t : []) : s = t && ot.isPlainObject(t) ? t : {}, r[n] = ot.extend(c, s, i)) : void 0 !== i && (r[n] = i));
        return r
    }, ot.extend({
        expando: "jQuery" + (nt + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function (t) {
            throw new Error(t)
        },
        noop: function () { },
        isFunction: function (t) {
            return "function" === ot.type(t)
        },
        isArray: Array.isArray || function (t) {
            return "array" === ot.type(t)
        },
        isWindow: function (t) {
            return null != t && t == t.window
        },
        isNumeric: function (t) {
            return !ot.isArray(t) && t - parseFloat(t) + 1 >= 0
        },
        isEmptyObject: function (t) {
            var e;
            for (e in t) return !1;
            return !0
        },
        isPlainObject: function (t) {
            var e;
            if (!t || "object" !== ot.type(t) || t.nodeType || ot.isWindow(t)) return !1;
            try {
                if (t.constructor && !et.call(t, "constructor") && !et.call(t.constructor.prototype, "isPrototypeOf")) return !1
            } catch (i) {
                return !1
            }
            if (it.ownLast)
                for (e in t) return et.call(t, e);
            for (e in t);
            return void 0 === e || et.call(t, e)
        },
        type: function (t) {
            return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? Q[tt.call(t)] || "object" : typeof t
        },
        globalEval: function (e) {
            e && ot.trim(e) && (t.execScript || function (e) {
                t.eval.call(t, e)
            })(e)
        },
        camelCase: function (t) {
            return t.replace(rt, "ms-").replace(at, lt)
        },
        nodeName: function (t, e) {
            return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
        },
        each: function (t, e, n) {
            var o, s = 0,
                r = t.length,
                a = i(t);
            if (n) {
                if (a)
                    for (; r > s && (o = e.apply(t[s], n), o !== !1); s++);
                else
                    for (s in t)
                        if (o = e.apply(t[s], n), o === !1) break
            } else if (a)
                for (; r > s && (o = e.call(t[s], s, t[s]), o !== !1); s++);
            else
                for (s in t)
                    if (o = e.call(t[s], s, t[s]), o === !1) break; return t
        },
        trim: function (t) {
            return null == t ? "" : (t + "").replace(st, "")
        },
        makeArray: function (t, e) {
            var n = e || [];
            return null != t && (i(Object(t)) ? ot.merge(n, "string" == typeof t ? [t] : t) : J.call(n, t)), n
        },
        inArray: function (t, e, i) {
            var n;
            if (e) {
                if (Z) return Z.call(e, t, i);
                for (n = e.length, i = i ? 0 > i ? Math.max(0, n + i) : i : 0; n > i; i++)
                    if (i in e && e[i] === t) return i
            }
            return -1
        },
        merge: function (t, e) {
            for (var i = +e.length, n = 0, o = t.length; i > n;) t[o++] = e[n++];
            if (i !== i)
                for (; void 0 !== e[n];) t[o++] = e[n++];
            return t.length = o, t
        },
        grep: function (t, e, i) {
            for (var n, o = [], s = 0, r = t.length, a = !i; r > s; s++) n = !e(t[s], s), n !== a && o.push(t[s]);
            return o
        },
        map: function (t, e, n) {
            var o, s = 0,
                r = t.length,
                a = i(t),
                l = [];
            if (a)
                for (; r > s; s++) o = e(t[s], s, n), null != o && l.push(o);
            else
                for (s in t) o = e(t[s], s, n),
                    null != o && l.push(o);
            return K.apply([], l)
        },
        guid: 1,
        proxy: function (t, e) {
            var i, n, o;
            return "string" == typeof e && (o = t[e], e = t, t = o), ot.isFunction(t) ? (i = U.call(arguments, 2), n = function () {
                return t.apply(e || this, i.concat(U.call(arguments)))
            }, n.guid = t.guid = t.guid || ot.guid++ , n) : void 0
        },
        now: function () {
            return +new Date
        },
        support: it
    }), ot.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (t, e) {
        Q["[object " + e + "]"] = e.toLowerCase()
    });
    var ct = function (t) {
        function e(t, e, i, n) {
            var o, s, r, a, l, c, h, p, f, m;
            if ((e ? e.ownerDocument || e : N) !== L && E(e), e = e || L, i = i || [], a = e.nodeType, "string" != typeof t || !t || 1 !== a && 9 !== a && 11 !== a) return i;
            if (!n && B) {
                if (11 !== a && (o = yt.exec(t)))
                    if (r = o[1]) {
                        if (9 === a) {
                            if (s = e.getElementById(r), !s || !s.parentNode) return i;
                            if (s.id === r) return i.push(s), i
                        } else if (e.ownerDocument && (s = e.ownerDocument.getElementById(r)) && O(e, s) && s.id === r) return i.push(s), i
                    } else {
                        if (o[2]) return Z.apply(i, e.getElementsByTagName(t)), i;
                        if ((r = o[3]) && w.getElementsByClassName) return Z.apply(i, e.getElementsByClassName(r)), i
                    }
                if (w.qsa && (!F || !F.test(t))) {
                    if (p = h = j, f = e, m = 1 !== a && t, 1 === a && "object" !== e.nodeName.toLowerCase()) {
                        for (c = T(t), (h = e.getAttribute("id")) ? p = h.replace(xt, "\\$&") : e.setAttribute("id", p), p = "[id='" + p + "'] ", l = c.length; l--;) c[l] = p + u(c[l]);
                        f = bt.test(t) && d(e.parentNode) || e, m = c.join(",")
                    }
                    if (m) try {
                        return Z.apply(i, f.querySelectorAll(m)), i
                    } catch (g) { } finally {
                            h || e.removeAttribute("id")
                        }
                }
            }
            return S(t.replace(lt, "$1"), e, i, n)
        }

        function i() {
            function t(i, n) {
                return e.push(i + " ") > k.cacheLength && delete t[e.shift()], t[i + " "] = n
            }
            var e = [];
            return t
        }

        function n(t) {
            return t[j] = !0, t
        }

        function o(t) {
            var e = L.createElement("div");
            try {
                return !!t(e)
            } catch (i) {
                return !1
            } finally {
                e.parentNode && e.parentNode.removeChild(e), e = null
            }
        }

        function s(t, e) {
            for (var i = t.split("|"), n = t.length; n--;) k.attrHandle[i[n]] = e
        }

        function r(t, e) {
            var i = e && t,
                n = i && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || V) - (~t.sourceIndex || V);
            if (n) return n;
            if (i)
                for (; i = i.nextSibling;)
                    if (i === e) return -1;
            return t ? 1 : -1
        }

        function a(t) {
            return function (e) {
                var i = e.nodeName.toLowerCase();
                return "input" === i && e.type === t
            }
        }

        function l(t) {
            return function (e) {
                var i = e.nodeName.toLowerCase();
                return ("input" === i || "button" === i) && e.type === t
            }
        }

        function c(t) {
            return n(function (e) {
                return e = +e, n(function (i, n) {
                    for (var o, s = t([], i.length, e), r = s.length; r--;) i[o = s[r]] && (i[o] = !(n[o] = i[o]))
                })
            })
        }

        function d(t) {
            return t && "undefined" != typeof t.getElementsByTagName && t
        }

        function h() { }

        function u(t) {
            for (var e = 0, i = t.length, n = ""; i > e; e++) n += t[e].value;
            return n
        }

        function p(t, e, i) {
            var n = e.dir,
                o = i && "parentNode" === n,
                s = R++;
            return e.first ? function (e, i, s) {
                for (; e = e[n];)
                    if (1 === e.nodeType || o) return t(e, i, s)
            } : function (e, i, r) {
                var a, l, c = [z, s];
                if (r) {
                    for (; e = e[n];)
                        if ((1 === e.nodeType || o) && t(e, i, r)) return !0
                } else
                    for (; e = e[n];)
                        if (1 === e.nodeType || o) {
                            if (l = e[j] || (e[j] = {}), (a = l[n]) && a[0] === z && a[1] === s) return c[2] = a[2];
                            if (l[n] = c, c[2] = t(e, i, r)) return !0
                        }
            }
        }

        function f(t) {
            return t.length > 1 ? function (e, i, n) {
                for (var o = t.length; o--;)
                    if (!t[o](e, i, n)) return !1;
                return !0
            } : t[0]
        }

        function m(t, i, n) {
            for (var o = 0, s = i.length; s > o; o++) e(t, i[o], n);
            return n
        }

        function g(t, e, i, n, o) {
            for (var s, r = [], a = 0, l = t.length, c = null != e; l > a; a++)(s = t[a]) && (!i || i(s, n, o)) && (r.push(s), c && e.push(a));
            return r
        }

        function v(t, e, i, o, s, r) {
            return o && !o[j] && (o = v(o)), s && !s[j] && (s = v(s, r)), n(function (n, r, a, l) {
                var c, d, h, u = [],
                    p = [],
                    f = r.length,
                    v = n || m(e || "*", a.nodeType ? [a] : a, []),
                    y = !t || !n && e ? v : g(v, u, t, a, l),
                    b = i ? s || (n ? t : f || o) ? [] : r : y;
                if (i && i(y, b, a, l), o)
                    for (c = g(b, p), o(c, [], a, l), d = c.length; d--;)(h = c[d]) && (b[p[d]] = !(y[p[d]] = h));
                if (n) {
                    if (s || t) {
                        if (s) {
                            for (c = [], d = b.length; d--;)(h = b[d]) && c.push(y[d] = h);
                            s(null, b = [], c, l)
                        }
                        for (d = b.length; d--;)(h = b[d]) && (c = s ? tt(n, h) : u[d]) > -1 && (n[c] = !(r[c] = h))
                    }
                } else b = g(b === r ? b.splice(f, b.length) : b), s ? s(null, r, b, l) : Z.apply(r, b)
            })
        }

        function y(t) {
            for (var e, i, n, o = t.length, s = k.relative[t[0].type], r = s || k.relative[" "], a = s ? 1 : 0, l = p(function (t) {
                return t === e
            }, r, !0), c = p(function (t) {
                return tt(e, t) > -1
            }, r, !0), d = [function (t, i, n) {
                var o = !s && (n || i !== P) || ((e = i).nodeType ? l(t, i, n) : c(t, i, n));
                return e = null, o
            }]; o > a; a++)
                if (i = k.relative[t[a].type]) d = [p(f(d), i)];
                else {
                    if (i = k.filter[t[a].type].apply(null, t[a].matches), i[j]) {
                        for (n = ++a; o > n && !k.relative[t[n].type]; n++);
                        return v(a > 1 && f(d), a > 1 && u(t.slice(0, a - 1).concat({
                            value: " " === t[a - 2].type ? "*" : ""
                        })).replace(lt, "$1"), i, n > a && y(t.slice(a, n)), o > n && y(t = t.slice(n)), o > n && u(t))
                    }
                    d.push(i)
                }
            return f(d)
        }

        function b(t, i) {
            var o = i.length > 0,
                s = t.length > 0,
                r = function (n, r, a, l, c) {
                    var d, h, u, p = 0,
                        f = "0",
                        m = n && [],
                        v = [],
                        y = P,
                        b = n || s && k.find.TAG("*", c),
                        x = z += null == y ? 1 : Math.random() || .1,
                        w = b.length;
                    for (c && (P = r !== L && r); f !== w && null != (d = b[f]); f++) {
                        if (s && d) {
                            for (h = 0; u = t[h++];)
                                if (u(d, r, a)) {
                                    l.push(d);
                                    break
                                }
                            c && (z = x)
                        }
                        o && ((d = !u && d) && p-- , n && m.push(d))
                    }
                    if (p += f, o && f !== p) {
                        for (h = 0; u = i[h++];) u(m, v, r, a);
                        if (n) {
                            if (p > 0)
                                for (; f--;) m[f] || v[f] || (v[f] = K.call(l));
                            v = g(v)
                        }
                        Z.apply(l, v), c && !n && v.length > 0 && p + i.length > 1 && e.uniqueSort(l)
                    }
                    return c && (z = x, P = y), m
                };
            return o ? n(r) : r
        }
        var x, w, k, _, C, T, $, S, P, M, A, E, L, D, B, F, H, I, O, j = "sizzle" + 1 * new Date,
            N = t.document,
            z = 0,
            R = 0,
            q = i(),
            W = i(),
            X = i(),
            Y = function (t, e) {
                return t === e && (A = !0), 0
            },
            V = 1 << 31,
            G = {}.hasOwnProperty,
            U = [],
            K = U.pop,
            J = U.push,
            Z = U.push,
            Q = U.slice,
            tt = function (t, e) {
                for (var i = 0, n = t.length; n > i; i++)
                    if (t[i] === e) return i;
                return -1
            },
            et = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            it = "[\\x20\\t\\r\\n\\f]",
            nt = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            ot = nt.replace("w", "w#"),
            st = "\\[" + it + "*(" + nt + ")(?:" + it + "*([*^$|!~]?=)" + it + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ot + "))|)" + it + "*\\]",
            rt = ":(" + nt + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + st + ")*)|.*)\\)|)",
            at = new RegExp(it + "+", "g"),
            lt = new RegExp("^" + it + "+|((?:^|[^\\\\])(?:\\\\.)*)" + it + "+$", "g"),
            ct = new RegExp("^" + it + "*," + it + "*"),
            dt = new RegExp("^" + it + "*([>+~]|" + it + ")" + it + "*"),
            ht = new RegExp("=" + it + "*([^\\]'\"]*?)" + it + "*\\]", "g"),
            ut = new RegExp(rt),
            pt = new RegExp("^" + ot + "$"),
            ft = {
                ID: new RegExp("^#(" + nt + ")"),
                CLASS: new RegExp("^\\.(" + nt + ")"),
                TAG: new RegExp("^(" + nt.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + st),
                PSEUDO: new RegExp("^" + rt),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + it + "*(even|odd|(([+-]|)(\\d*)n|)" + it + "*(?:([+-]|)" + it + "*(\\d+)|))" + it + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + et + ")$", "i"),
                needsContext: new RegExp("^" + it + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + it + "*((?:-\\d)?\\d*)" + it + "*\\)|)(?=[^-]|$)", "i")
            },
            mt = /^(?:input|select|textarea|button)$/i,
            gt = /^h\d$/i,
            vt = /^[^{]+\{\s*\[native \w/,
            yt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            bt = /[+~]/,
            xt = /'|\\/g,
            wt = new RegExp("\\\\([\\da-f]{1,6}" + it + "?|(" + it + ")|.)", "ig"),
            kt = function (t, e, i) {
                var n = "0x" + e - 65536;
                return n !== n || i ? e : 0 > n ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
            },
            _t = function () {
                E()
            };
        try {
            Z.apply(U = Q.call(N.childNodes), N.childNodes), U[N.childNodes.length].nodeType
        } catch (Ct) {
            Z = {
                apply: U.length ? function (t, e) {
                    J.apply(t, Q.call(e))
                } : function (t, e) {
                    for (var i = t.length, n = 0; t[i++] = e[n++];);
                    t.length = i - 1
                }
            }
        }
        w = e.support = {}, C = e.isXML = function (t) {
            var e = t && (t.ownerDocument || t).documentElement;
            return e ? "HTML" !== e.nodeName : !1
        }, E = e.setDocument = function (t) {
            var e, i, n = t ? t.ownerDocument || t : N;
            return n !== L && 9 === n.nodeType && n.documentElement ? (L = n, D = n.documentElement, i = n.defaultView, i && i !== i.top && (i.addEventListener ? i.addEventListener("unload", _t, !1) : i.attachEvent && i.attachEvent("onunload", _t)), B = !C(n), w.attributes = o(function (t) {
                return t.className = "i", !t.getAttribute("className")
            }), w.getElementsByTagName = o(function (t) {
                return t.appendChild(n.createComment("")), !t.getElementsByTagName("*").length
            }), w.getElementsByClassName = vt.test(n.getElementsByClassName), w.getById = o(function (t) {
                return D.appendChild(t).id = j, !n.getElementsByName || !n.getElementsByName(j).length
            }), w.getById ? (k.find.ID = function (t, e) {
                if ("undefined" != typeof e.getElementById && B) {
                    var i = e.getElementById(t);
                    return i && i.parentNode ? [i] : []
                }
            }, k.filter.ID = function (t) {
                var e = t.replace(wt, kt);
                return function (t) {
                    return t.getAttribute("id") === e
                }
            }) : (delete k.find.ID, k.filter.ID = function (t) {
                var e = t.replace(wt, kt);
                return function (t) {
                    var i = "undefined" != typeof t.getAttributeNode && t.getAttributeNode("id");
                    return i && i.value === e
                }
            }), k.find.TAG = w.getElementsByTagName ? function (t, e) {
                return "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t) : w.qsa ? e.querySelectorAll(t) : void 0
            } : function (t, e) {
                var i, n = [],
                    o = 0,
                    s = e.getElementsByTagName(t);
                if ("*" === t) {
                    for (; i = s[o++];) 1 === i.nodeType && n.push(i);
                    return n
                }
                return s
            }, k.find.CLASS = w.getElementsByClassName && function (t, e) {
                return B ? e.getElementsByClassName(t) : void 0
            }, H = [], F = [], (w.qsa = vt.test(n.querySelectorAll)) && (o(function (t) {
                D.appendChild(t).innerHTML = "<a id='" + j + "'></a><select id='" + j + "-\f]' msallowcapture=''><option selected=''></option></select>", t.querySelectorAll("[msallowcapture^='']").length && F.push("[*^$]=" + it + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || F.push("\\[" + it + "*(?:value|" + et + ")"), t.querySelectorAll("[id~=" + j + "-]").length || F.push("~="), t.querySelectorAll(":checked").length || F.push(":checked"), t.querySelectorAll("a#" + j + "+*").length || F.push(".#.+[+~]")
            }), o(function (t) {
                var e = n.createElement("input");
                e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && F.push("name" + it + "*[*^$|!~]?="), t.querySelectorAll(":enabled").length || F.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), F.push(",.*:")
            })), (w.matchesSelector = vt.test(I = D.matches || D.webkitMatchesSelector || D.mozMatchesSelector || D.oMatchesSelector || D.msMatchesSelector)) && o(function (t) {
                w.disconnectedMatch = I.call(t, "div"), I.call(t, "[s!='']:x"), H.push("!=", rt)
            }), F = F.length && new RegExp(F.join("|")), H = H.length && new RegExp(H.join("|")), e = vt.test(D.compareDocumentPosition), O = e || vt.test(D.contains) ? function (t, e) {
                var i = 9 === t.nodeType ? t.documentElement : t,
                    n = e && e.parentNode;
                return t === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(n)))
            } : function (t, e) {
                if (e)
                    for (; e = e.parentNode;)
                        if (e === t) return !0;
                return !1
            }, Y = e ? function (t, e) {
                if (t === e) return A = !0, 0;
                var i = !t.compareDocumentPosition - !e.compareDocumentPosition;
                return i ? i : (i = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1, 1 & i || !w.sortDetached && e.compareDocumentPosition(t) === i ? t === n || t.ownerDocument === N && O(N, t) ? -1 : e === n || e.ownerDocument === N && O(N, e) ? 1 : M ? tt(M, t) - tt(M, e) : 0 : 4 & i ? -1 : 1)
            } : function (t, e) {
                if (t === e) return A = !0, 0;
                var i, o = 0,
                    s = t.parentNode,
                    a = e.parentNode,
                    l = [t],
                    c = [e];
                if (!s || !a) return t === n ? -1 : e === n ? 1 : s ? -1 : a ? 1 : M ? tt(M, t) - tt(M, e) : 0;
                if (s === a) return r(t, e);
                for (i = t; i = i.parentNode;) l.unshift(i);
                for (i = e; i = i.parentNode;) c.unshift(i);
                for (; l[o] === c[o];) o++;
                return o ? r(l[o], c[o]) : l[o] === N ? -1 : c[o] === N ? 1 : 0
            }, n) : L
        }, e.matches = function (t, i) {
            return e(t, null, null, i)
        }, e.matchesSelector = function (t, i) {
            if ((t.ownerDocument || t) !== L && E(t), i = i.replace(ht, "='$1']"), !(!w.matchesSelector || !B || H && H.test(i) || F && F.test(i))) try {
                var n = I.call(t, i);
                if (n || w.disconnectedMatch || t.document && 11 !== t.document.nodeType) return n
            } catch (o) { }
            return e(i, L, null, [t]).length > 0
        }, e.contains = function (t, e) {
            return (t.ownerDocument || t) !== L && E(t), O(t, e)
        }, e.attr = function (t, e) {
            (t.ownerDocument || t) !== L && E(t);
            var i = k.attrHandle[e.toLowerCase()],
                n = i && G.call(k.attrHandle, e.toLowerCase()) ? i(t, e, !B) : void 0;
            return void 0 !== n ? n : w.attributes || !B ? t.getAttribute(e) : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
        }, e.error = function (t) {
            throw new Error("Syntax error, unrecognized expression: " + t)
        }, e.uniqueSort = function (t) {
            var e, i = [],
                n = 0,
                o = 0;
            if (A = !w.detectDuplicates, M = !w.sortStable && t.slice(0), t.sort(Y), A) {
                for (; e = t[o++];) e === t[o] && (n = i.push(o));
                for (; n--;) t.splice(i[n], 1)
            }
            return M = null, t
        }, _ = e.getText = function (t) {
            var e, i = "",
                n = 0,
                o = t.nodeType;
            if (o) {
                if (1 === o || 9 === o || 11 === o) {
                    if ("string" == typeof t.textContent) return t.textContent;
                    for (t = t.firstChild; t; t = t.nextSibling) i += _(t)
                } else if (3 === o || 4 === o) return t.nodeValue
            } else
                for (; e = t[n++];) i += _(e);
            return i
        }, k = e.selectors = {
            cacheLength: 50,
            createPseudo: n,
            match: ft,
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
                ATTR: function (t) {
                    return t[1] = t[1].replace(wt, kt), t[3] = (t[3] || t[4] || t[5] || "").replace(wt, kt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                },
                CHILD: function (t) {
                    return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && e.error(t[0]), t
                },
                PSEUDO: function (t) {
                    var e, i = !t[6] && t[2];
                    return ft.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : i && ut.test(i) && (e = T(i, !0)) && (e = i.indexOf(")", i.length - e) - i.length) && (t[0] = t[0].slice(0, e), t[2] = i.slice(0, e)), t.slice(0, 3))
                }
            },
            filter: {
                TAG: function (t) {
                    var e = t.replace(wt, kt).toLowerCase();
                    return "*" === t ? function () {
                        return !0
                    } : function (t) {
                        return t.nodeName && t.nodeName.toLowerCase() === e
                    }
                },
                CLASS: function (t) {
                    var e = q[t + " "];
                    return e || (e = new RegExp("(^|" + it + ")" + t + "(" + it + "|$)")) && q(t, function (t) {
                        return e.test("string" == typeof t.className && t.className || "undefined" != typeof t.getAttribute && t.getAttribute("class") || "")
                    })
                },
                ATTR: function (t, i, n) {
                    return function (o) {
                        var s = e.attr(o, t);
                        return null == s ? "!=" === i : i ? (s += "", "=" === i ? s === n : "!=" === i ? s !== n : "^=" === i ? n && 0 === s.indexOf(n) : "*=" === i ? n && s.indexOf(n) > -1 : "$=" === i ? n && s.slice(-n.length) === n : "~=" === i ? (" " + s.replace(at, " ") + " ").indexOf(n) > -1 : "|=" === i ? s === n || s.slice(0, n.length + 1) === n + "-" : !1) : !0
                    }
                },
                CHILD: function (t, e, i, n, o) {
                    var s = "nth" !== t.slice(0, 3),
                        r = "last" !== t.slice(-4),
                        a = "of-type" === e;
                    return 1 === n && 0 === o ? function (t) {
                        return !!t.parentNode
                    } : function (e, i, l) {
                        var c, d, h, u, p, f, m = s !== r ? "nextSibling" : "previousSibling",
                            g = e.parentNode,
                            v = a && e.nodeName.toLowerCase(),
                            y = !l && !a;
                        if (g) {
                            if (s) {
                                for (; m;) {
                                    for (h = e; h = h[m];)
                                        if (a ? h.nodeName.toLowerCase() === v : 1 === h.nodeType) return !1;
                                    f = m = "only" === t && !f && "nextSibling"
                                }
                                return !0
                            }
                            if (f = [r ? g.firstChild : g.lastChild], r && y) {
                                for (d = g[j] || (g[j] = {}), c = d[t] || [], p = c[0] === z && c[1], u = c[0] === z && c[2], h = p && g.childNodes[p]; h = ++p && h && h[m] || (u = p = 0) || f.pop();)
                                    if (1 === h.nodeType && ++u && h === e) {
                                        d[t] = [z, p, u];
                                        break
                                    }
                            } else if (y && (c = (e[j] || (e[j] = {}))[t]) && c[0] === z) u = c[1];
                            else
                                for (;
                                    (h = ++p && h && h[m] || (u = p = 0) || f.pop()) && ((a ? h.nodeName.toLowerCase() !== v : 1 !== h.nodeType) || !++u || (y && ((h[j] || (h[j] = {}))[t] = [z, u]), h !== e)););
                            return u -= o, u === n || u % n === 0 && u / n >= 0
                        }
                    }
                },
                PSEUDO: function (t, i) {
                    var o, s = k.pseudos[t] || k.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
                    return s[j] ? s(i) : s.length > 1 ? (o = [t, t, "", i], k.setFilters.hasOwnProperty(t.toLowerCase()) ? n(function (t, e) {
                        for (var n, o = s(t, i), r = o.length; r--;) n = tt(t, o[r]), t[n] = !(e[n] = o[r])
                    }) : function (t) {
                        return s(t, 0, o)
                    }) : s
                }
            },
            pseudos: {
                not: n(function (t) {
                    var e = [],
                        i = [],
                        o = $(t.replace(lt, "$1"));
                    return o[j] ? n(function (t, e, i, n) {
                        for (var s, r = o(t, null, n, []), a = t.length; a--;)(s = r[a]) && (t[a] = !(e[a] = s))
                    }) : function (t, n, s) {
                        return e[0] = t, o(e, null, s, i), e[0] = null, !i.pop()
                    }
                }),
                has: n(function (t) {
                    return function (i) {
                        return e(t, i).length > 0
                    }
                }),
                contains: n(function (t) {
                    return t = t.replace(wt, kt),
                        function (e) {
                            return (e.textContent || e.innerText || _(e)).indexOf(t) > -1
                        }
                }),
                lang: n(function (t) {
                    return pt.test(t || "") || e.error("unsupported lang: " + t), t = t.replace(wt, kt).toLowerCase(),
                        function (e) {
                            var i;
                            do
                                if (i = B ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return i = i.toLowerCase(), i === t || 0 === i.indexOf(t + "-");
                            while ((e = e.parentNode) && 1 === e.nodeType);
                            return !1
                        }
                }),
                target: function (e) {
                    var i = t.location && t.location.hash;
                    return i && i.slice(1) === e.id
                },
                root: function (t) {
                    return t === D
                },
                focus: function (t) {
                    return t === L.activeElement && (!L.hasFocus || L.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                },
                enabled: function (t) {
                    return t.disabled === !1
                },
                disabled: function (t) {
                    return t.disabled === !0
                },
                checked: function (t) {
                    var e = t.nodeName.toLowerCase();
                    return "input" === e && !!t.checked || "option" === e && !!t.selected
                },
                selected: function (t) {
                    return t.parentNode && t.parentNode.selectedIndex, t.selected === !0
                },
                empty: function (t) {
                    for (t = t.firstChild; t; t = t.nextSibling)
                        if (t.nodeType < 6) return !1;
                    return !0
                },
                parent: function (t) {
                    return !k.pseudos.empty(t)
                },
                header: function (t) {
                    return gt.test(t.nodeName)
                },
                input: function (t) {
                    return mt.test(t.nodeName)
                },
                button: function (t) {
                    var e = t.nodeName.toLowerCase();
                    return "input" === e && "button" === t.type || "button" === e
                },
                text: function (t) {
                    var e;
                    return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                },
                first: c(function () {
                    return [0]
                }),
                last: c(function (t, e) {
                    return [e - 1]
                }),
                eq: c(function (t, e, i) {
                    return [0 > i ? i + e : i]
                }),
                even: c(function (t, e) {
                    for (var i = 0; e > i; i += 2) t.push(i);
                    return t
                }),
                odd: c(function (t, e) {
                    for (var i = 1; e > i; i += 2) t.push(i);
                    return t
                }),
                lt: c(function (t, e, i) {
                    for (var n = 0 > i ? i + e : i; --n >= 0;) t.push(n);
                    return t
                }),
                gt: c(function (t, e, i) {
                    for (var n = 0 > i ? i + e : i; ++n < e;) t.push(n);
                    return t
                })
            }
        }, k.pseudos.nth = k.pseudos.eq;
        for (x in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) k.pseudos[x] = a(x);
        for (x in {
            submit: !0,
            reset: !0
        }) k.pseudos[x] = l(x);
        return h.prototype = k.filters = k.pseudos, k.setFilters = new h, T = e.tokenize = function (t, i) {
            var n, o, s, r, a, l, c, d = W[t + " "];
            if (d) return i ? 0 : d.slice(0);
            for (a = t, l = [], c = k.preFilter; a;) {
                (!n || (o = ct.exec(a))) && (o && (a = a.slice(o[0].length) || a), l.push(s = [])), n = !1, (o = dt.exec(a)) && (n = o.shift(), s.push({
                    value: n,
                    type: o[0].replace(lt, " ")
                }), a = a.slice(n.length));
                for (r in k.filter) !(o = ft[r].exec(a)) || c[r] && !(o = c[r](o)) || (n = o.shift(), s.push({
                    value: n,
                    type: r,
                    matches: o
                }), a = a.slice(n.length));
                if (!n) break
            }
            return i ? a.length : a ? e.error(t) : W(t, l).slice(0)
        }, $ = e.compile = function (t, e) {
            var i, n = [],
                o = [],
                s = X[t + " "];
            if (!s) {
                for (e || (e = T(t)), i = e.length; i--;) s = y(e[i]), s[j] ? n.push(s) : o.push(s);
                s = X(t, b(o, n)), s.selector = t
            }
            return s
        }, S = e.select = function (t, e, i, n) {
            var o, s, r, a, l, c = "function" == typeof t && t,
                h = !n && T(t = c.selector || t);
            if (i = i || [], 1 === h.length) {
                if (s = h[0] = h[0].slice(0), s.length > 2 && "ID" === (r = s[0]).type && w.getById && 9 === e.nodeType && B && k.relative[s[1].type]) {
                    if (e = (k.find.ID(r.matches[0].replace(wt, kt), e) || [])[0], !e) return i;
                    c && (e = e.parentNode), t = t.slice(s.shift().value.length)
                }
                for (o = ft.needsContext.test(t) ? 0 : s.length; o-- && (r = s[o], !k.relative[a = r.type]);)
                    if ((l = k.find[a]) && (n = l(r.matches[0].replace(wt, kt), bt.test(s[0].type) && d(e.parentNode) || e))) {
                        if (s.splice(o, 1), t = n.length && u(s), !t) return Z.apply(i, n), i;
                        break
                    }
            }
            return (c || $(t, h))(n, e, !B, i, bt.test(t) && d(e.parentNode) || e), i
        }, w.sortStable = j.split("").sort(Y).join("") === j, w.detectDuplicates = !!A, E(), w.sortDetached = o(function (t) {
            return 1 & t.compareDocumentPosition(L.createElement("div"))
        }), o(function (t) {
            return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
        }) || s("type|href|height|width", function (t, e, i) {
            return i ? void 0 : t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
        }), w.attributes && o(function (t) {
            return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
        }) || s("value", function (t, e, i) {
            return i || "input" !== t.nodeName.toLowerCase() ? void 0 : t.defaultValue
        }), o(function (t) {
            return null == t.getAttribute("disabled")
        }) || s(et, function (t, e, i) {
            var n;
            return i ? void 0 : t[e] === !0 ? e.toLowerCase() : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
        }), e
    }(t);
    ot.find = ct, ot.expr = ct.selectors, ot.expr[":"] = ot.expr.pseudos, ot.unique = ct.uniqueSort, ot.text = ct.getText, ot.isXMLDoc = ct.isXML, ot.contains = ct.contains;
    var dt = ot.expr.match.needsContext,
        ht = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        ut = /^.[^:#\[\.,]*$/;
    ot.filter = function (t, e, i) {
        var n = e[0];
        return i && (t = ":not(" + t + ")"), 1 === e.length && 1 === n.nodeType ? ot.find.matchesSelector(n, t) ? [n] : [] : ot.find.matches(t, ot.grep(e, function (t) {
            return 1 === t.nodeType
        }))
    }, ot.fn.extend({
        find: function (t) {
            var e, i = [],
                n = this,
                o = n.length;
            if ("string" != typeof t) return this.pushStack(ot(t).filter(function () {
                for (e = 0; o > e; e++)
                    if (ot.contains(n[e], this)) return !0
            }));
            for (e = 0; o > e; e++) ot.find(t, n[e], i);
            return i = this.pushStack(o > 1 ? ot.unique(i) : i), i.selector = this.selector ? this.selector + " " + t : t, i
        },
        filter: function (t) {
            return this.pushStack(n(this, t || [], !1))
        },
        not: function (t) {
            return this.pushStack(n(this, t || [], !0))
        },
        is: function (t) {
            return !!n(this, "string" == typeof t && dt.test(t) ? ot(t) : t || [], !1).length
        }
    });
    var pt, ft = t.document,
        mt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        gt = ot.fn.init = function (t, e) {
            var i, n;
            if (!t) return this;
            if ("string" == typeof t) {
                if (i = "<" === t.charAt(0) && ">" === t.charAt(t.length - 1) && t.length >= 3 ? [null, t, null] : mt.exec(t), !i || !i[1] && e) return !e || e.jquery ? (e || pt).find(t) : this.constructor(e).find(t);
                if (i[1]) {
                    if (e = e instanceof ot ? e[0] : e, ot.merge(this, ot.parseHTML(i[1], e && e.nodeType ? e.ownerDocument || e : ft, !0)), ht.test(i[1]) && ot.isPlainObject(e))
                        for (i in e) ot.isFunction(this[i]) ? this[i](e[i]) : this.attr(i, e[i]);
                    return this
                }
                if (n = ft.getElementById(i[2]), n && n.parentNode) {
                    if (n.id !== i[2]) return pt.find(t);
                    this.length = 1, this[0] = n
                }
                return this.context = ft, this.selector = t, this
            }
            return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : ot.isFunction(t) ? "undefined" != typeof pt.ready ? pt.ready(t) : t(ot) : (void 0 !== t.selector && (this.selector = t.selector, this.context = t.context), ot.makeArray(t, this))
        };
    gt.prototype = ot.fn, pt = ot(ft);
    var vt = /^(?:parents|prev(?:Until|All))/,
        yt = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    ot.extend({
        dir: function (t, e, i) {
            for (var n = [], o = t[e]; o && 9 !== o.nodeType && (void 0 === i || 1 !== o.nodeType || !ot(o).is(i));) 1 === o.nodeType && n.push(o), o = o[e];
            return n
        },
        sibling: function (t, e) {
            for (var i = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && i.push(t);
            return i
        }
    }), ot.fn.extend({
        has: function (t) {
            var e, i = ot(t, this),
                n = i.length;
            return this.filter(function () {
                for (e = 0; n > e; e++)
                    if (ot.contains(this, i[e])) return !0
            })
        },
        closest: function (t, e) {
            for (var i, n = 0, o = this.length, s = [], r = dt.test(t) || "string" != typeof t ? ot(t, e || this.context) : 0; o > n; n++)
                for (i = this[n]; i && i !== e; i = i.parentNode)
                    if (i.nodeType < 11 && (r ? r.index(i) > -1 : 1 === i.nodeType && ot.find.matchesSelector(i, t))) {
                        s.push(i);
                        break
                    }
            return this.pushStack(s.length > 1 ? ot.unique(s) : s)
        },
        index: function (t) {
            return t ? "string" == typeof t ? ot.inArray(this[0], ot(t)) : ot.inArray(t.jquery ? t[0] : t, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function (t, e) {
            return this.pushStack(ot.unique(ot.merge(this.get(), ot(t, e))))
        },
        addBack: function (t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }
    }), ot.each({
        parent: function (t) {
            var e = t.parentNode;
            return e && 11 !== e.nodeType ? e : null
        },
        parents: function (t) {
            return ot.dir(t, "parentNode")
        },
        parentsUntil: function (t, e, i) {
            return ot.dir(t, "parentNode", i)
        },
        next: function (t) {
            return o(t, "nextSibling")
        },
        prev: function (t) {
            return o(t, "previousSibling")
        },
        nextAll: function (t) {
            return ot.dir(t, "nextSibling")
        },
        prevAll: function (t) {
            return ot.dir(t, "previousSibling")
        },
        nextUntil: function (t, e, i) {
            return ot.dir(t, "nextSibling", i)
        },
        prevUntil: function (t, e, i) {
            return ot.dir(t, "previousSibling", i)
        },
        siblings: function (t) {
            return ot.sibling((t.parentNode || {}).firstChild, t)
        },
        children: function (t) {
            return ot.sibling(t.firstChild)
        },
        contents: function (t) {
            return ot.nodeName(t, "iframe") ? t.contentDocument || t.contentWindow.document : ot.merge([], t.childNodes)
        }
    }, function (t, e) {
        ot.fn[t] = function (i, n) {
            var o = ot.map(this, e, i);
            return "Until" !== t.slice(-5) && (n = i), n && "string" == typeof n && (o = ot.filter(n, o)), this.length > 1 && (yt[t] || (o = ot.unique(o)), vt.test(t) && (o = o.reverse())), this.pushStack(o)
        }
    });
    var bt = /\S+/g,
        xt = {};
    ot.Callbacks = function (t) {
        t = "string" == typeof t ? xt[t] || s(t) : ot.extend({}, t);
        var e, i, n, o, r, a, l = [],
            c = !t.once && [],
            d = function (s) {
                for (i = t.memory && s, n = !0, r = a || 0, a = 0, o = l.length, e = !0; l && o > r; r++)
                    if (l[r].apply(s[0], s[1]) === !1 && t.stopOnFalse) {
                        i = !1;
                        break
                    }
                e = !1, l && (c ? c.length && d(c.shift()) : i ? l = [] : h.disable())
            },
            h = {
                add: function () {
                    if (l) {
                        var n = l.length;
                        ! function s(e) {
                            ot.each(e, function (e, i) {
                                var n = ot.type(i);
                                "function" === n ? t.unique && h.has(i) || l.push(i) : i && i.length && "string" !== n && s(i)
                            })
                        }(arguments), e ? o = l.length : i && (a = n, d(i))
                    }
                    return this
                },
                remove: function () {
                    return l && ot.each(arguments, function (t, i) {
                        for (var n;
                            (n = ot.inArray(i, l, n)) > -1;) l.splice(n, 1), e && (o >= n && o-- , r >= n && r--)
                    }), this
                },
                has: function (t) {
                    return t ? ot.inArray(t, l) > -1 : !(!l || !l.length)
                },
                empty: function () {
                    return l = [], o = 0, this
                },
                disable: function () {
                    return l = c = i = void 0, this
                },
                disabled: function () {
                    return !l
                },
                lock: function () {
                    return c = void 0, i || h.disable(), this
                },
                locked: function () {
                    return !c
                },
                fireWith: function (t, i) {
                    return !l || n && !c || (i = i || [], i = [t, i.slice ? i.slice() : i], e ? c.push(i) : d(i)), this
                },
                fire: function () {
                    return h.fireWith(this, arguments), this
                },
                fired: function () {
                    return !!n
                }
            };
        return h
    }, ot.extend({
        Deferred: function (t) {
            var e = [
                ["resolve", "done", ot.Callbacks("once memory"), "resolved"],
                ["reject", "fail", ot.Callbacks("once memory"), "rejected"],
                ["notify", "progress", ot.Callbacks("memory")]
            ],
                i = "pending",
                n = {
                    state: function () {
                        return i
                    },
                    always: function () {
                        return o.done(arguments).fail(arguments), this
                    },
                    then: function () {
                        var t = arguments;
                        return ot.Deferred(function (i) {
                            ot.each(e, function (e, s) {
                                var r = ot.isFunction(t[e]) && t[e];
                                o[s[1]](function () {
                                    var t = r && r.apply(this, arguments);
                                    t && ot.isFunction(t.promise) ? t.promise().done(i.resolve).fail(i.reject).progress(i.notify) : i[s[0] + "With"](this === n ? i.promise() : this, r ? [t] : arguments)
                                })
                            }), t = null
                        }).promise()
                    },
                    promise: function (t) {
                        return null != t ? ot.extend(t, n) : n
                    }
                },
                o = {};
            return n.pipe = n.then, ot.each(e, function (t, s) {
                var r = s[2],
                    a = s[3];
                n[s[1]] = r.add, a && r.add(function () {
                    i = a
                }, e[1 ^ t][2].disable, e[2][2].lock), o[s[0]] = function () {
                    return o[s[0] + "With"](this === o ? n : this, arguments), this
                }, o[s[0] + "With"] = r.fireWith
            }), n.promise(o), t && t.call(o, o), o
        },
        when: function (t) {
            var e, i, n, o = 0,
                s = U.call(arguments),
                r = s.length,
                a = 1 !== r || t && ot.isFunction(t.promise) ? r : 0,
                l = 1 === a ? t : ot.Deferred(),
                c = function (t, i, n) {
                    return function (o) {
                        i[t] = this, n[t] = arguments.length > 1 ? U.call(arguments) : o, n === e ? l.notifyWith(i, n) : --a || l.resolveWith(i, n)
                    }
                };
            if (r > 1)
                for (e = new Array(r), i = new Array(r), n = new Array(r); r > o; o++) s[o] && ot.isFunction(s[o].promise) ? s[o].promise().done(c(o, n, s)).fail(l.reject).progress(c(o, i, e)) : --a;
            return a || l.resolveWith(n, s), l.promise()
        }
    });
    var wt;
    ot.fn.ready = function (t) {
        return ot.ready.promise().done(t), this
    }, ot.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function (t) {
            t ? ot.readyWait++ : ot.ready(!0)
        },
        ready: function (t) {
            if (t === !0 ? !--ot.readyWait : !ot.isReady) {
                if (!ft.body) return setTimeout(ot.ready);
                ot.isReady = !0, t !== !0 && --ot.readyWait > 0 || (wt.resolveWith(ft, [ot]), ot.fn.triggerHandler && (ot(ft).triggerHandler("ready"), ot(ft).off("ready")))
            }
        }
    }), ot.ready.promise = function (e) {
        if (!wt)
            if (wt = ot.Deferred(), "complete" === ft.readyState) setTimeout(ot.ready);
            else if (ft.addEventListener) ft.addEventListener("DOMContentLoaded", a, !1), t.addEventListener("load", a, !1);
            else {
                ft.attachEvent("onreadystatechange", a), t.attachEvent("onload", a);
                var i = !1;
                try {
                    i = null == t.frameElement && ft.documentElement
                } catch (n) { }
                i && i.doScroll && ! function o() {
                    if (!ot.isReady) {
                        try {
                            i.doScroll("left")
                        } catch (t) {
                            return setTimeout(o, 50)
                        }
                        r(), ot.ready()
                    }
                }()
            }
        return wt.promise(e)
    };
    var kt, _t = "undefined";
    for (kt in ot(it)) break;
    it.ownLast = "0" !== kt, it.inlineBlockNeedsLayout = !1, ot(function () {
        var t, e, i, n;
        i = ft.getElementsByTagName("body")[0], i && i.style && (e = ft.createElement("div"), n = ft.createElement("div"), n.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", i.appendChild(n).appendChild(e), typeof e.style.zoom !== _t && (e.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", it.inlineBlockNeedsLayout = t = 3 === e.offsetWidth, t && (i.style.zoom = 1)), i.removeChild(n))
    }),
        function () {
            var t = ft.createElement("div");
            if (null == it.deleteExpando) {
                it.deleteExpando = !0;
                try {
                    delete t.test
                } catch (e) {
                    it.deleteExpando = !1
                }
            }
            t = null
        }(), ot.acceptData = function (t) {
            var e = ot.noData[(t.nodeName + " ").toLowerCase()],
                i = +t.nodeType || 1;
            return 1 !== i && 9 !== i ? !1 : !e || e !== !0 && t.getAttribute("classid") === e
        };
    var Ct = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        Tt = /([A-Z])/g;
    ot.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function (t) {
            return t = t.nodeType ? ot.cache[t[ot.expando]] : t[ot.expando], !!t && !c(t)
        },
        data: function (t, e, i) {
            return d(t, e, i)
        },
        removeData: function (t, e) {
            return h(t, e)
        },
        _data: function (t, e, i) {
            return d(t, e, i, !0)
        },
        _removeData: function (t, e) {
            return h(t, e, !0)
        }
    }), ot.fn.extend({
        data: function (t, e) {
            var i, n, o, s = this[0],
                r = s && s.attributes;
            if (void 0 === t) {
                if (this.length && (o = ot.data(s), 1 === s.nodeType && !ot._data(s, "parsedAttrs"))) {
                    for (i = r.length; i--;) r[i] && (n = r[i].name, 0 === n.indexOf("data-") && (n = ot.camelCase(n.slice(5)), l(s, n, o[n])));
                    ot._data(s, "parsedAttrs", !0)
                }
                return o
            }
            return "object" == typeof t ? this.each(function () {
                ot.data(this, t)
            }) : arguments.length > 1 ? this.each(function () {
                ot.data(this, t, e)
            }) : s ? l(s, t, ot.data(s, t)) : void 0
        },
        removeData: function (t) {
            return this.each(function () {
                ot.removeData(this, t)
            })
        }
    }), ot.extend({
        queue: function (t, e, i) {
            var n;
            return t ? (e = (e || "fx") + "queue", n = ot._data(t, e), i && (!n || ot.isArray(i) ? n = ot._data(t, e, ot.makeArray(i)) : n.push(i)), n || []) : void 0
        },
        dequeue: function (t, e) {
            e = e || "fx";
            var i = ot.queue(t, e),
                n = i.length,
                o = i.shift(),
                s = ot._queueHooks(t, e),
                r = function () {
                    ot.dequeue(t, e)
                };
            "inprogress" === o && (o = i.shift(), n--), o && ("fx" === e && i.unshift("inprogress"), delete s.stop, o.call(t, r, s)), !n && s && s.empty.fire()
        },
        _queueHooks: function (t, e) {
            var i = e + "queueHooks";
            return ot._data(t, i) || ot._data(t, i, {
                empty: ot.Callbacks("once memory").add(function () {
                    ot._removeData(t, e + "queue"), ot._removeData(t, i)
                })
            })
        }
    }), ot.fn.extend({
        queue: function (t, e) {
            var i = 2;
            return "string" != typeof t && (e = t, t = "fx", i--), arguments.length < i ? ot.queue(this[0], t) : void 0 === e ? this : this.each(function () {
                var i = ot.queue(this, t, e);
                ot._queueHooks(this, t), "fx" === t && "inprogress" !== i[0] && ot.dequeue(this, t)
            })
        },
        dequeue: function (t) {
            return this.each(function () {
                ot.dequeue(this, t)
            })
        },
        clearQueue: function (t) {
            return this.queue(t || "fx", [])
        },
        promise: function (t, e) {
            var i, n = 1,
                o = ot.Deferred(),
                s = this,
                r = this.length,
                a = function () {
                    --n || o.resolveWith(s, [s])
                };
            for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; r--;) i = ot._data(s[r], t + "queueHooks"), i && i.empty && (n++ , i.empty.add(a));
            return a(), o.promise(e)
        }
    });
    var $t = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        St = ["Top", "Right", "Bottom", "Left"],
        Pt = function (t, e) {
            return t = e || t, "none" === ot.css(t, "display") || !ot.contains(t.ownerDocument, t)
        },
        Mt = ot.access = function (t, e, i, n, o, s, r) {
            var a = 0,
                l = t.length,
                c = null == i;
            if ("object" === ot.type(i)) {
                o = !0;
                for (a in i) ot.access(t, e, a, i[a], !0, s, r)
            } else if (void 0 !== n && (o = !0, ot.isFunction(n) || (r = !0), c && (r ? (e.call(t, n), e = null) : (c = e, e = function (t, e, i) {
                return c.call(ot(t), i)
            })), e))
                for (; l > a; a++) e(t[a], i, r ? n : n.call(t[a], a, e(t[a], i)));
            return o ? t : c ? e.call(t) : l ? e(t[0], i) : s
        },
        At = /^(?:checkbox|radio)$/i;
    ! function () {
        var t = ft.createElement("input"),
            e = ft.createElement("div"),
            i = ft.createDocumentFragment();
        if (e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", it.leadingWhitespace = 3 === e.firstChild.nodeType, it.tbody = !e.getElementsByTagName("tbody").length, it.htmlSerialize = !!e.getElementsByTagName("link").length, it.html5Clone = "<:nav></:nav>" !== ft.createElement("nav").cloneNode(!0).outerHTML, t.type = "checkbox", t.checked = !0, i.appendChild(t), it.appendChecked = t.checked, e.innerHTML = "<textarea>x</textarea>", it.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue, i.appendChild(e), e.innerHTML = "<input type='radio' checked='checked' name='t'/>", it.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, it.noCloneEvent = !0, e.attachEvent && (e.attachEvent("onclick", function () {
            it.noCloneEvent = !1
        }), e.cloneNode(!0).click()), null == it.deleteExpando) {
            it.deleteExpando = !0;
            try {
                delete e.test
            } catch (n) {
                it.deleteExpando = !1
            }
        }
    }(),
        function () {
            var e, i, n = ft.createElement("div");
            for (e in {
                submit: !0,
                change: !0,
                focusin: !0
            }) i = "on" + e, (it[e + "Bubbles"] = i in t) || (n.setAttribute(i, "t"), it[e + "Bubbles"] = n.attributes[i].expando === !1);
            n = null
        }();
    var Et = /^(?:input|select|textarea)$/i,
        Lt = /^key/,
        Dt = /^(?:mouse|pointer|contextmenu)|click/,
        Bt = /^(?:focusinfocus|focusoutblur)$/,
        Ft = /^([^.]*)(?:\.(.+)|)$/;
    ot.event = {
        global: {},
        add: function (t, e, i, n, o) {
            var s, r, a, l, c, d, h, u, p, f, m, g = ot._data(t);
            if (g) {
                for (i.handler && (l = i, i = l.handler, o = l.selector), i.guid || (i.guid = ot.guid++), (r = g.events) || (r = g.events = {}), (d = g.handle) || (d = g.handle = function (t) {
                    return typeof ot === _t || t && ot.event.triggered === t.type ? void 0 : ot.event.dispatch.apply(d.elem, arguments)
                }, d.elem = t), e = (e || "").match(bt) || [""], a = e.length; a--;) s = Ft.exec(e[a]) || [], p = m = s[1], f = (s[2] || "").split(".").sort(), p && (c = ot.event.special[p] || {}, p = (o ? c.delegateType : c.bindType) || p, c = ot.event.special[p] || {}, h = ot.extend({
                    type: p,
                    origType: m,
                    data: n,
                    handler: i,
                    guid: i.guid,
                    selector: o,
                    needsContext: o && ot.expr.match.needsContext.test(o),
                    namespace: f.join(".")
                }, l), (u = r[p]) || (u = r[p] = [], u.delegateCount = 0, c.setup && c.setup.call(t, n, f, d) !== !1 || (t.addEventListener ? t.addEventListener(p, d, !1) : t.attachEvent && t.attachEvent("on" + p, d))), c.add && (c.add.call(t, h),
                    h.handler.guid || (h.handler.guid = i.guid)), o ? u.splice(u.delegateCount++, 0, h) : u.push(h), ot.event.global[p] = !0);
                t = null
            }
        },
        remove: function (t, e, i, n, o) {
            var s, r, a, l, c, d, h, u, p, f, m, g = ot.hasData(t) && ot._data(t);
            if (g && (d = g.events)) {
                for (e = (e || "").match(bt) || [""], c = e.length; c--;)
                    if (a = Ft.exec(e[c]) || [], p = m = a[1], f = (a[2] || "").split(".").sort(), p) {
                        for (h = ot.event.special[p] || {}, p = (n ? h.delegateType : h.bindType) || p, u = d[p] || [], a = a[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = s = u.length; s--;) r = u[s], !o && m !== r.origType || i && i.guid !== r.guid || a && !a.test(r.namespace) || n && n !== r.selector && ("**" !== n || !r.selector) || (u.splice(s, 1), r.selector && u.delegateCount-- , h.remove && h.remove.call(t, r));
                        l && !u.length && (h.teardown && h.teardown.call(t, f, g.handle) !== !1 || ot.removeEvent(t, p, g.handle), delete d[p])
                    } else
                        for (p in d) ot.event.remove(t, p + e[c], i, n, !0);
                ot.isEmptyObject(d) && (delete g.handle, ot._removeData(t, "events"))
            }
        },
        trigger: function (e, i, n, o) {
            var s, r, a, l, c, d, h, u = [n || ft],
                p = et.call(e, "type") ? e.type : e,
                f = et.call(e, "namespace") ? e.namespace.split(".") : [];
            if (a = d = n = n || ft, 3 !== n.nodeType && 8 !== n.nodeType && !Bt.test(p + ot.event.triggered) && (p.indexOf(".") >= 0 && (f = p.split("."), p = f.shift(), f.sort()), r = p.indexOf(":") < 0 && "on" + p, e = e[ot.expando] ? e : new ot.Event(p, "object" == typeof e && e), e.isTrigger = o ? 2 : 3, e.namespace = f.join("."), e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), i = null == i ? [e] : ot.makeArray(i, [e]), c = ot.event.special[p] || {}, o || !c.trigger || c.trigger.apply(n, i) !== !1)) {
                if (!o && !c.noBubble && !ot.isWindow(n)) {
                    for (l = c.delegateType || p, Bt.test(l + p) || (a = a.parentNode); a; a = a.parentNode) u.push(a), d = a;
                    d === (n.ownerDocument || ft) && u.push(d.defaultView || d.parentWindow || t)
                }
                for (h = 0;
                    (a = u[h++]) && !e.isPropagationStopped();) e.type = h > 1 ? l : c.bindType || p, s = (ot._data(a, "events") || {})[e.type] && ot._data(a, "handle"), s && s.apply(a, i), s = r && a[r], s && s.apply && ot.acceptData(a) && (e.result = s.apply(a, i), e.result === !1 && e.preventDefault());
                if (e.type = p, !o && !e.isDefaultPrevented() && (!c._default || c._default.apply(u.pop(), i) === !1) && ot.acceptData(n) && r && n[p] && !ot.isWindow(n)) {
                    d = n[r], d && (n[r] = null), ot.event.triggered = p;
                    try {
                        n[p]()
                    } catch (m) { }
                    ot.event.triggered = void 0, d && (n[r] = d)
                }
                return e.result
            }
        },
        dispatch: function (t) {
            t = ot.event.fix(t);
            var e, i, n, o, s, r = [],
                a = U.call(arguments),
                l = (ot._data(this, "events") || {})[t.type] || [],
                c = ot.event.special[t.type] || {};
            if (a[0] = t, t.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, t) !== !1) {
                for (r = ot.event.handlers.call(this, t, l), e = 0;
                    (o = r[e++]) && !t.isPropagationStopped();)
                    for (t.currentTarget = o.elem, s = 0;
                        (n = o.handlers[s++]) && !t.isImmediatePropagationStopped();)(!t.namespace_re || t.namespace_re.test(n.namespace)) && (t.handleObj = n, t.data = n.data, i = ((ot.event.special[n.origType] || {}).handle || n.handler).apply(o.elem, a), void 0 !== i && (t.result = i) === !1 && (t.preventDefault(), t.stopPropagation()));
                return c.postDispatch && c.postDispatch.call(this, t), t.result
            }
        },
        handlers: function (t, e) {
            var i, n, o, s, r = [],
                a = e.delegateCount,
                l = t.target;
            if (a && l.nodeType && (!t.button || "click" !== t.type))
                for (; l != this; l = l.parentNode || this)
                    if (1 === l.nodeType && (l.disabled !== !0 || "click" !== t.type)) {
                        for (o = [], s = 0; a > s; s++) n = e[s], i = n.selector + " ", void 0 === o[i] && (o[i] = n.needsContext ? ot(i, this).index(l) >= 0 : ot.find(i, this, null, [l]).length), o[i] && o.push(n);
                        o.length && r.push({
                            elem: l,
                            handlers: o
                        })
                    }
            return a < e.length && r.push({
                elem: this,
                handlers: e.slice(a)
            }), r
        },
        fix: function (t) {
            if (t[ot.expando]) return t;
            var e, i, n, o = t.type,
                s = t,
                r = this.fixHooks[o];
            for (r || (this.fixHooks[o] = r = Dt.test(o) ? this.mouseHooks : Lt.test(o) ? this.keyHooks : {}), n = r.props ? this.props.concat(r.props) : this.props, t = new ot.Event(s), e = n.length; e--;) i = n[e], t[i] = s[i];
            return t.target || (t.target = s.srcElement || ft), 3 === t.target.nodeType && (t.target = t.target.parentNode), t.metaKey = !!t.metaKey, r.filter ? r.filter(t, s) : t
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function (t, e) {
                return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (t, e) {
                var i, n, o, s = e.button,
                    r = e.fromElement;
                return null == t.pageX && null != e.clientX && (n = t.target.ownerDocument || ft, o = n.documentElement, i = n.body, t.pageX = e.clientX + (o && o.scrollLeft || i && i.scrollLeft || 0) - (o && o.clientLeft || i && i.clientLeft || 0), t.pageY = e.clientY + (o && o.scrollTop || i && i.scrollTop || 0) - (o && o.clientTop || i && i.clientTop || 0)), !t.relatedTarget && r && (t.relatedTarget = r === t.target ? e.toElement : r), t.which || void 0 === s || (t.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), t
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function () {
                    if (this !== f() && this.focus) try {
                        return this.focus(), !1
                    } catch (t) { }
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function () {
                    return this === f() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function () {
                    return ot.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                },
                _default: function (t) {
                    return ot.nodeName(t.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function (t) {
                    void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
                }
            }
        },
        simulate: function (t, e, i, n) {
            var o = ot.extend(new ot.Event, i, {
                type: t,
                isSimulated: !0,
                originalEvent: {}
            });
            n ? ot.event.trigger(o, null, e) : ot.event.dispatch.call(e, o), o.isDefaultPrevented() && i.preventDefault()
        }
    }, ot.removeEvent = ft.removeEventListener ? function (t, e, i) {
        t.removeEventListener && t.removeEventListener(e, i, !1)
    } : function (t, e, i) {
        var n = "on" + e;
        t.detachEvent && (typeof t[n] === _t && (t[n] = null), t.detachEvent(n, i))
    }, ot.Event = function (t, e) {
        return this instanceof ot.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && t.returnValue === !1 ? u : p) : this.type = t, e && ot.extend(this, e), this.timeStamp = t && t.timeStamp || ot.now(), void (this[ot.expando] = !0)) : new ot.Event(t, e)
    }, ot.Event.prototype = {
        isDefaultPrevented: p,
        isPropagationStopped: p,
        isImmediatePropagationStopped: p,
        preventDefault: function () {
            var t = this.originalEvent;
            this.isDefaultPrevented = u, t && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
        },
        stopPropagation: function () {
            var t = this.originalEvent;
            this.isPropagationStopped = u, t && (t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0)
        },
        stopImmediatePropagation: function () {
            var t = this.originalEvent;
            this.isImmediatePropagationStopped = u, t && t.stopImmediatePropagation && t.stopImmediatePropagation(), this.stopPropagation()
        }
    }, ot.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function (t, e) {
        ot.event.special[t] = {
            delegateType: e,
            bindType: e,
            handle: function (t) {
                var i, n = this,
                    o = t.relatedTarget,
                    s = t.handleObj;
                return (!o || o !== n && !ot.contains(n, o)) && (t.type = s.origType, i = s.handler.apply(this, arguments), t.type = e), i
            }
        }
    }), it.submitBubbles || (ot.event.special.submit = {
        setup: function () {
            return ot.nodeName(this, "form") ? !1 : void ot.event.add(this, "click._submit keypress._submit", function (t) {
                var e = t.target,
                    i = ot.nodeName(e, "input") || ot.nodeName(e, "button") ? e.form : void 0;
                i && !ot._data(i, "submitBubbles") && (ot.event.add(i, "submit._submit", function (t) {
                    t._submit_bubble = !0
                }), ot._data(i, "submitBubbles", !0))
            })
        },
        postDispatch: function (t) {
            t._submit_bubble && (delete t._submit_bubble, this.parentNode && !t.isTrigger && ot.event.simulate("submit", this.parentNode, t, !0))
        },
        teardown: function () {
            return ot.nodeName(this, "form") ? !1 : void ot.event.remove(this, "._submit")
        }
    }), it.changeBubbles || (ot.event.special.change = {
        setup: function () {
            return Et.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ot.event.add(this, "propertychange._change", function (t) {
                "checked" === t.originalEvent.propertyName && (this._just_changed = !0)
            }), ot.event.add(this, "click._change", function (t) {
                this._just_changed && !t.isTrigger && (this._just_changed = !1), ot.event.simulate("change", this, t, !0)
            })), !1) : void ot.event.add(this, "beforeactivate._change", function (t) {
                var e = t.target;
                Et.test(e.nodeName) && !ot._data(e, "changeBubbles") && (ot.event.add(e, "change._change", function (t) {
                    !this.parentNode || t.isSimulated || t.isTrigger || ot.event.simulate("change", this.parentNode, t, !0)
                }), ot._data(e, "changeBubbles", !0))
            })
        },
        handle: function (t) {
            var e = t.target;
            return this !== e || t.isSimulated || t.isTrigger || "radio" !== e.type && "checkbox" !== e.type ? t.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function () {
            return ot.event.remove(this, "._change"), !Et.test(this.nodeName)
        }
    }), it.focusinBubbles || ot.each({
        focus: "focusin",
        blur: "focusout"
    }, function (t, e) {
        var i = function (t) {
            ot.event.simulate(e, t.target, ot.event.fix(t), !0)
        };
        ot.event.special[e] = {
            setup: function () {
                var n = this.ownerDocument || this,
                    o = ot._data(n, e);
                o || n.addEventListener(t, i, !0), ot._data(n, e, (o || 0) + 1)
            },
            teardown: function () {
                var n = this.ownerDocument || this,
                    o = ot._data(n, e) - 1;
                o ? ot._data(n, e, o) : (n.removeEventListener(t, i, !0), ot._removeData(n, e))
            }
        }
    }), ot.fn.extend({
        on: function (t, e, i, n, o) {
            var s, r;
            if ("object" == typeof t) {
                "string" != typeof e && (i = i || e, e = void 0);
                for (s in t) this.on(s, e, i, t[s], o);
                return this
            }
            if (null == i && null == n ? (n = e, i = e = void 0) : null == n && ("string" == typeof e ? (n = i, i = void 0) : (n = i, i = e, e = void 0)), n === !1) n = p;
            else if (!n) return this;
            return 1 === o && (r = n, n = function (t) {
                return ot().off(t), r.apply(this, arguments)
            }, n.guid = r.guid || (r.guid = ot.guid++)), this.each(function () {
                ot.event.add(this, t, n, i, e)
            })
        },
        one: function (t, e, i, n) {
            return this.on(t, e, i, n, 1)
        },
        off: function (t, e, i) {
            var n, o;
            if (t && t.preventDefault && t.handleObj) return n = t.handleObj, ot(t.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler), this;
            if ("object" == typeof t) {
                for (o in t) this.off(o, e, t[o]);
                return this
            }
            return (e === !1 || "function" == typeof e) && (i = e, e = void 0), i === !1 && (i = p), this.each(function () {
                ot.event.remove(this, t, i, e)
            })
        },
        trigger: function (t, e) {
            return this.each(function () {
                ot.event.trigger(t, e, this)
            })
        },
        triggerHandler: function (t, e) {
            var i = this[0];
            return i ? ot.event.trigger(t, e, i, !0) : void 0
        }
    });
    var Ht = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        It = / jQuery\d+="(?:null|\d+)"/g,
        Ot = new RegExp("<(?:" + Ht + ")[\\s/>]", "i"),
        jt = /^\s+/,
        Nt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        zt = /<([\w:]+)/,
        Rt = /<tbody/i,
        qt = /<|&#?\w+;/,
        Wt = /<(?:script|style|link)/i,
        Xt = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Yt = /^$|\/(?:java|ecma)script/i,
        Vt = /^true\/(.*)/,
        Gt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        Ut = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: it.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        },
        Kt = m(ft),
        Jt = Kt.appendChild(ft.createElement("div"));
    Ut.optgroup = Ut.option, Ut.tbody = Ut.tfoot = Ut.colgroup = Ut.caption = Ut.thead, Ut.th = Ut.td, ot.extend({
        clone: function (t, e, i) {
            var n, o, s, r, a, l = ot.contains(t.ownerDocument, t);
            if (it.html5Clone || ot.isXMLDoc(t) || !Ot.test("<" + t.nodeName + ">") ? s = t.cloneNode(!0) : (Jt.innerHTML = t.outerHTML, Jt.removeChild(s = Jt.firstChild)), !(it.noCloneEvent && it.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || ot.isXMLDoc(t)))
                for (n = g(s), a = g(t), r = 0; null != (o = a[r]); ++r) n[r] && _(o, n[r]);
            if (e)
                if (i)
                    for (a = a || g(t), n = n || g(s), r = 0; null != (o = a[r]); r++) k(o, n[r]);
                else k(t, s);
            return n = g(s, "script"), n.length > 0 && w(n, !l && g(t, "script")), n = a = o = null, s
        },
        buildFragment: function (t, e, i, n) {
            for (var o, s, r, a, l, c, d, h = t.length, u = m(e), p = [], f = 0; h > f; f++)
                if (s = t[f], s || 0 === s)
                    if ("object" === ot.type(s)) ot.merge(p, s.nodeType ? [s] : s);
                    else if (qt.test(s)) {
                        for (a = a || u.appendChild(e.createElement("div")), l = (zt.exec(s) || ["", ""])[1].toLowerCase(), d = Ut[l] || Ut._default, a.innerHTML = d[1] + s.replace(Nt, "<$1></$2>") + d[2], o = d[0]; o--;) a = a.lastChild;
                        if (!it.leadingWhitespace && jt.test(s) && p.push(e.createTextNode(jt.exec(s)[0])), !it.tbody)
                            for (s = "table" !== l || Rt.test(s) ? "<table>" !== d[1] || Rt.test(s) ? 0 : a : a.firstChild, o = s && s.childNodes.length; o--;) ot.nodeName(c = s.childNodes[o], "tbody") && !c.childNodes.length && s.removeChild(c);
                        for (ot.merge(p, a.childNodes), a.textContent = ""; a.firstChild;) a.removeChild(a.firstChild);
                        a = u.lastChild
                    } else p.push(e.createTextNode(s));
            for (a && u.removeChild(a), it.appendChecked || ot.grep(g(p, "input"), v), f = 0; s = p[f++];)
                if ((!n || -1 === ot.inArray(s, n)) && (r = ot.contains(s.ownerDocument, s), a = g(u.appendChild(s), "script"), r && w(a), i))
                    for (o = 0; s = a[o++];) Yt.test(s.type || "") && i.push(s);
            return a = null, u
        },
        cleanData: function (t, e) {
            for (var i, n, o, s, r = 0, a = ot.expando, l = ot.cache, c = it.deleteExpando, d = ot.event.special; null != (i = t[r]); r++)
                if ((e || ot.acceptData(i)) && (o = i[a], s = o && l[o])) {
                    if (s.events)
                        for (n in s.events) d[n] ? ot.event.remove(i, n) : ot.removeEvent(i, n, s.handle);
                    l[o] && (delete l[o], c ? delete i[a] : typeof i.removeAttribute !== _t ? i.removeAttribute(a) : i[a] = null, G.push(o))
                }
        }
    }), ot.fn.extend({
        text: function (t) {
            return Mt(this, function (t) {
                return void 0 === t ? ot.text(this) : this.empty().append((this[0] && this[0].ownerDocument || ft).createTextNode(t))
            }, null, t, arguments.length)
        },
        append: function () {
            return this.domManip(arguments, function (t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var e = y(this, t);
                    e.appendChild(t)
                }
            })
        },
        prepend: function () {
            return this.domManip(arguments, function (t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var e = y(this, t);
                    e.insertBefore(t, e.firstChild)
                }
            })
        },
        before: function () {
            return this.domManip(arguments, function (t) {
                this.parentNode && this.parentNode.insertBefore(t, this)
            })
        },
        after: function () {
            return this.domManip(arguments, function (t) {
                this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
            })
        },
        remove: function (t, e) {
            for (var i, n = t ? ot.filter(t, this) : this, o = 0; null != (i = n[o]); o++) e || 1 !== i.nodeType || ot.cleanData(g(i)), i.parentNode && (e && ot.contains(i.ownerDocument, i) && w(g(i, "script")), i.parentNode.removeChild(i));
            return this
        },
        empty: function () {
            for (var t, e = 0; null != (t = this[e]); e++) {
                for (1 === t.nodeType && ot.cleanData(g(t, !1)); t.firstChild;) t.removeChild(t.firstChild);
                t.options && ot.nodeName(t, "select") && (t.options.length = 0)
            }
            return this
        },
        clone: function (t, e) {
            return t = null == t ? !1 : t, e = null == e ? t : e, this.map(function () {
                return ot.clone(this, t, e)
            })
        },
        html: function (t) {
            return Mt(this, function (t) {
                var e = this[0] || {},
                    i = 0,
                    n = this.length;
                if (void 0 === t) return 1 === e.nodeType ? e.innerHTML.replace(It, "") : void 0;
                if (!("string" != typeof t || Wt.test(t) || !it.htmlSerialize && Ot.test(t) || !it.leadingWhitespace && jt.test(t) || Ut[(zt.exec(t) || ["", ""])[1].toLowerCase()])) {
                    t = t.replace(Nt, "<$1></$2>");
                    try {
                        for (; n > i; i++) e = this[i] || {}, 1 === e.nodeType && (ot.cleanData(g(e, !1)), e.innerHTML = t);
                        e = 0
                    } catch (o) { }
                }
                e && this.empty().append(t)
            }, null, t, arguments.length)
        },
        replaceWith: function () {
            var t = arguments[0];
            return this.domManip(arguments, function (e) {
                t = this.parentNode, ot.cleanData(g(this)), t && t.replaceChild(e, this)
            }), t && (t.length || t.nodeType) ? this : this.remove()
        },
        detach: function (t) {
            return this.remove(t, !0)
        },
        domManip: function (t, e) {
            t = K.apply([], t);
            var i, n, o, s, r, a, l = 0,
                c = this.length,
                d = this,
                h = c - 1,
                u = t[0],
                p = ot.isFunction(u);
            if (p || c > 1 && "string" == typeof u && !it.checkClone && Xt.test(u)) return this.each(function (i) {
                var n = d.eq(i);
                p && (t[0] = u.call(this, i, n.html())), n.domManip(t, e)
            });
            if (c && (a = ot.buildFragment(t, this[0].ownerDocument, !1, this), i = a.firstChild, 1 === a.childNodes.length && (a = i), i)) {
                for (s = ot.map(g(a, "script"), b), o = s.length; c > l; l++) n = a, l !== h && (n = ot.clone(n, !0, !0), o && ot.merge(s, g(n, "script"))), e.call(this[l], n, l);
                if (o)
                    for (r = s[s.length - 1].ownerDocument, ot.map(s, x), l = 0; o > l; l++) n = s[l], Yt.test(n.type || "") && !ot._data(n, "globalEval") && ot.contains(r, n) && (n.src ? ot._evalUrl && ot._evalUrl(n.src) : ot.globalEval((n.text || n.textContent || n.innerHTML || "").replace(Gt, "")));
                a = i = null
            }
            return this
        }
    }), ot.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (t, e) {
        ot.fn[t] = function (t) {
            for (var i, n = 0, o = [], s = ot(t), r = s.length - 1; r >= n; n++) i = n === r ? this : this.clone(!0), ot(s[n])[e](i), J.apply(o, i.get());
            return this.pushStack(o)
        }
    });
    var Zt, Qt = {};
    ! function () {
        var t;
        it.shrinkWrapBlocks = function () {
            if (null != t) return t;
            t = !1;
            var e, i, n;
            return i = ft.getElementsByTagName("body")[0], i && i.style ? (e = ft.createElement("div"), n = ft.createElement("div"), n.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", i.appendChild(n).appendChild(e), typeof e.style.zoom !== _t && (e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", e.appendChild(ft.createElement("div")).style.width = "5px", t = 3 !== e.offsetWidth), i.removeChild(n), t) : void 0
        }
    }();
    var te, ee, ie = /^margin/,
        ne = new RegExp("^(" + $t + ")(?!px)[a-z%]+$", "i"),
        oe = /^(top|right|bottom|left)$/;
    t.getComputedStyle ? (te = function (e) {
        return e.ownerDocument.defaultView.opener ? e.ownerDocument.defaultView.getComputedStyle(e, null) : t.getComputedStyle(e, null)
    }, ee = function (t, e, i) {
        var n, o, s, r, a = t.style;
        return i = i || te(t), r = i ? i.getPropertyValue(e) || i[e] : void 0, i && ("" !== r || ot.contains(t.ownerDocument, t) || (r = ot.style(t, e)), ne.test(r) && ie.test(e) && (n = a.width, o = a.minWidth, s = a.maxWidth, a.minWidth = a.maxWidth = a.width = r, r = i.width, a.width = n, a.minWidth = o, a.maxWidth = s)), void 0 === r ? r : r + ""
    }) : ft.documentElement.currentStyle && (te = function (t) {
        return t.currentStyle
    }, ee = function (t, e, i) {
        var n, o, s, r, a = t.style;
        return i = i || te(t), r = i ? i[e] : void 0, null == r && a && a[e] && (r = a[e]), ne.test(r) && !oe.test(e) && (n = a.left, o = t.runtimeStyle, s = o && o.left, s && (o.left = t.currentStyle.left), a.left = "fontSize" === e ? "1em" : r, r = a.pixelLeft + "px", a.left = n, s && (o.left = s)), void 0 === r ? r : r + "" || "auto"
    }), ! function () {
        function e() {
            var e, i, n, o;
            i = ft.getElementsByTagName("body")[0], i && i.style && (e = ft.createElement("div"), n = ft.createElement("div"), n.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", i.appendChild(n).appendChild(e), e.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", s = r = !1, l = !0, t.getComputedStyle && (s = "1%" !== (t.getComputedStyle(e, null) || {}).top, r = "4px" === (t.getComputedStyle(e, null) || {
                width: "4px"
            }).width, o = e.appendChild(ft.createElement("div")), o.style.cssText = e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", o.style.marginRight = o.style.width = "0", e.style.width = "1px", l = !parseFloat((t.getComputedStyle(o, null) || {}).marginRight), e.removeChild(o)), e.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", o = e.getElementsByTagName("td"), o[0].style.cssText = "margin:0;border:0;padding:0;display:none", a = 0 === o[0].offsetHeight, a && (o[0].style.display = "", o[1].style.display = "none", a = 0 === o[0].offsetHeight), i.removeChild(n))
        }
        var i, n, o, s, r, a, l;
        i = ft.createElement("div"), i.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", o = i.getElementsByTagName("a")[0], (n = o && o.style) && (n.cssText = "float:left;opacity:.5", it.opacity = "0.5" === n.opacity, it.cssFloat = !!n.cssFloat, i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", it.clearCloneStyle = "content-box" === i.style.backgroundClip, it.boxSizing = "" === n.boxSizing || "" === n.MozBoxSizing || "" === n.WebkitBoxSizing, ot.extend(it, {
            reliableHiddenOffsets: function () {
                return null == a && e(), a
            },
            boxSizingReliable: function () {
                return null == r && e(), r
            },
            pixelPosition: function () {
                return null == s && e(), s
            },
            reliableMarginRight: function () {
                return null == l && e(), l
            }
        }))
    }(), ot.swap = function (t, e, i, n) {
        var o, s, r = {};
        for (s in e) r[s] = t.style[s], t.style[s] = e[s];
        o = i.apply(t, n || []);
        for (s in e) t.style[s] = r[s];
        return o
    };
    var se = /alpha\([^)]*\)/i,
        re = /opacity\s*=\s*([^)]*)/,
        ae = /^(none|table(?!-c[ea]).+)/,
        le = new RegExp("^(" + $t + ")(.*)$", "i"),
        ce = new RegExp("^([+-])=(" + $t + ")", "i"),
        de = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        he = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        ue = ["Webkit", "O", "Moz", "ms"];
    ot.extend({
        cssHooks: {
            opacity: {
                get: function (t, e) {
                    if (e) {
                        var i = ee(t, "opacity");
                        return "" === i ? "1" : i
                    }
                }
            }
        },
        cssNumber: {
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
            "float": it.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function (t, e, i, n) {
            if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                var o, s, r, a = ot.camelCase(e),
                    l = t.style;
                if (e = ot.cssProps[a] || (ot.cssProps[a] = S(l, a)), r = ot.cssHooks[e] || ot.cssHooks[a], void 0 === i) return r && "get" in r && void 0 !== (o = r.get(t, !1, n)) ? o : l[e];
                if (s = typeof i, "string" === s && (o = ce.exec(i)) && (i = (o[1] + 1) * o[2] + parseFloat(ot.css(t, e)), s = "number"), null != i && i === i && ("number" !== s || ot.cssNumber[a] || (i += "px"), it.clearCloneStyle || "" !== i || 0 !== e.indexOf("background") || (l[e] = "inherit"), !(r && "set" in r && void 0 === (i = r.set(t, i, n))))) try {
                    l[e] = i
                } catch (c) { }
            }
        },
        css: function (t, e, i, n) {
            var o, s, r, a = ot.camelCase(e);
            return e = ot.cssProps[a] || (ot.cssProps[a] = S(t.style, a)), r = ot.cssHooks[e] || ot.cssHooks[a], r && "get" in r && (s = r.get(t, !0, i)), void 0 === s && (s = ee(t, e, n)), "normal" === s && e in he && (s = he[e]), "" === i || i ? (o = parseFloat(s), i === !0 || ot.isNumeric(o) ? o || 0 : s) : s
        }
    }), ot.each(["height", "width"], function (t, e) {
        ot.cssHooks[e] = {
            get: function (t, i, n) {
                return i ? ae.test(ot.css(t, "display")) && 0 === t.offsetWidth ? ot.swap(t, de, function () {
                    return E(t, e, n)
                }) : E(t, e, n) : void 0
            },
            set: function (t, i, n) {
                var o = n && te(t);
                return M(t, i, n ? A(t, e, n, it.boxSizing && "border-box" === ot.css(t, "boxSizing", !1, o), o) : 0)
            }
        }
    }), it.opacity || (ot.cssHooks.opacity = {
        get: function (t, e) {
            return re.test((e && t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : e ? "1" : ""
        },
        set: function (t, e) {
            var i = t.style,
                n = t.currentStyle,
                o = ot.isNumeric(e) ? "alpha(opacity=" + 100 * e + ")" : "",
                s = n && n.filter || i.filter || "";
            i.zoom = 1, (e >= 1 || "" === e) && "" === ot.trim(s.replace(se, "")) && i.removeAttribute && (i.removeAttribute("filter"), "" === e || n && !n.filter) || (i.filter = se.test(s) ? s.replace(se, o) : s + " " + o)
        }
    }), ot.cssHooks.marginRight = $(it.reliableMarginRight, function (t, e) {
        return e ? ot.swap(t, {
            display: "inline-block"
        }, ee, [t, "marginRight"]) : void 0
    }), ot.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function (t, e) {
        ot.cssHooks[t + e] = {
            expand: function (i) {
                for (var n = 0, o = {}, s = "string" == typeof i ? i.split(" ") : [i]; 4 > n; n++) o[t + St[n] + e] = s[n] || s[n - 2] || s[0];
                return o
            }
        }, ie.test(t) || (ot.cssHooks[t + e].set = M)
    }), ot.fn.extend({
        css: function (t, e) {
            return Mt(this, function (t, e, i) {
                var n, o, s = {},
                    r = 0;
                if (ot.isArray(e)) {
                    for (n = te(t), o = e.length; o > r; r++) s[e[r]] = ot.css(t, e[r], !1, n);
                    return s
                }
                return void 0 !== i ? ot.style(t, e, i) : ot.css(t, e)
            }, t, e, arguments.length > 1)
        },
        show: function () {
            return P(this, !0)
        },
        hide: function () {
            return P(this)
        },
        toggle: function (t) {
            return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function () {
                Pt(this) ? ot(this).show() : ot(this).hide()
            })
        }
    }), ot.Tween = L, L.prototype = {
        constructor: L,
        init: function (t, e, i, n, o, s) {
            this.elem = t, this.prop = i, this.easing = o || "swing", this.options = e, this.start = this.now = this.cur(), this.end = n, this.unit = s || (ot.cssNumber[i] ? "" : "px")
        },
        cur: function () {
            var t = L.propHooks[this.prop];
            return t && t.get ? t.get(this) : L.propHooks._default.get(this)
        },
        run: function (t) {
            var e, i = L.propHooks[this.prop];
            return this.options.duration ? this.pos = e = ot.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : L.propHooks._default.set(this), this
        }
    }, L.prototype.init.prototype = L.prototype, L.propHooks = {
        _default: {
            get: function (t) {
                var e;
                return null == t.elem[t.prop] || t.elem.style && null != t.elem.style[t.prop] ? (e = ot.css(t.elem, t.prop, ""), e && "auto" !== e ? e : 0) : t.elem[t.prop]
            },
            set: function (t) {
                ot.fx.step[t.prop] ? ot.fx.step[t.prop](t) : t.elem.style && (null != t.elem.style[ot.cssProps[t.prop]] || ot.cssHooks[t.prop]) ? ot.style(t.elem, t.prop, t.now + t.unit) : t.elem[t.prop] = t.now
            }
        }
    }, L.propHooks.scrollTop = L.propHooks.scrollLeft = {
        set: function (t) {
            t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
        }
    }, ot.easing = {
        linear: function (t) {
            return t
        },
        swing: function (t) {
            return .5 - Math.cos(t * Math.PI) / 2
        }
    }, ot.fx = L.prototype.init, ot.fx.step = {};
    var pe, fe, me = /^(?:toggle|show|hide)$/,
        ge = new RegExp("^(?:([+-])=|)(" + $t + ")([a-z%]*)$", "i"),
        ve = /queueHooks$/,
        ye = [H],
        be = {
            "*": [function (t, e) {
                var i = this.createTween(t, e),
                    n = i.cur(),
                    o = ge.exec(e),
                    s = o && o[3] || (ot.cssNumber[t] ? "" : "px"),
                    r = (ot.cssNumber[t] || "px" !== s && +n) && ge.exec(ot.css(i.elem, t)),
                    a = 1,
                    l = 20;
                if (r && r[3] !== s) {
                    s = s || r[3], o = o || [], r = +n || 1;
                    do a = a || ".5", r /= a, ot.style(i.elem, t, r + s); while (a !== (a = i.cur() / n) && 1 !== a && --l)
                }
                return o && (r = i.start = +r || +n || 0, i.unit = s, i.end = o[1] ? r + (o[1] + 1) * o[2] : +o[2]), i
            }]
        };
    ot.Animation = ot.extend(O, {
        tweener: function (t, e) {
            ot.isFunction(t) ? (e = t, t = ["*"]) : t = t.split(" ");
            for (var i, n = 0, o = t.length; o > n; n++) i = t[n], be[i] = be[i] || [], be[i].unshift(e)
        },
        prefilter: function (t, e) {
            e ? ye.unshift(t) : ye.push(t)
        }
    }), ot.speed = function (t, e, i) {
        var n = t && "object" == typeof t ? ot.extend({}, t) : {
            complete: i || !i && e || ot.isFunction(t) && t,
            duration: t,
            easing: i && e || e && !ot.isFunction(e) && e
        };
        return n.duration = ot.fx.off ? 0 : "number" == typeof n.duration ? n.duration : n.duration in ot.fx.speeds ? ot.fx.speeds[n.duration] : ot.fx.speeds._default, (null == n.queue || n.queue === !0) && (n.queue = "fx"), n.old = n.complete, n.complete = function () {
            ot.isFunction(n.old) && n.old.call(this), n.queue && ot.dequeue(this, n.queue)
        }, n
    }, ot.fn.extend({
        fadeTo: function (t, e, i, n) {
            return this.filter(Pt).css("opacity", 0).show().end().animate({
                opacity: e
            }, t, i, n)
        },
        animate: function (t, e, i, n) {
            var o = ot.isEmptyObject(t),
                s = ot.speed(e, i, n),
                r = function () {
                    var e = O(this, ot.extend({}, t), s);
                    (o || ot._data(this, "finish")) && e.stop(!0)
                };
            return r.finish = r, o || s.queue === !1 ? this.each(r) : this.queue(s.queue, r)
        },
        stop: function (t, e, i) {
            var n = function (t) {
                var e = t.stop;
                delete t.stop, e(i)
            };
            return "string" != typeof t && (i = e, e = t, t = void 0), e && t !== !1 && this.queue(t || "fx", []), this.each(function () {
                var e = !0,
                    o = null != t && t + "queueHooks",
                    s = ot.timers,
                    r = ot._data(this);
                if (o) r[o] && r[o].stop && n(r[o]);
                else
                    for (o in r) r[o] && r[o].stop && ve.test(o) && n(r[o]);
                for (o = s.length; o--;) s[o].elem !== this || null != t && s[o].queue !== t || (s[o].anim.stop(i), e = !1, s.splice(o, 1));
                (e || !i) && ot.dequeue(this, t)
            })
        },
        finish: function (t) {
            return t !== !1 && (t = t || "fx"), this.each(function () {
                var e, i = ot._data(this),
                    n = i[t + "queue"],
                    o = i[t + "queueHooks"],
                    s = ot.timers,
                    r = n ? n.length : 0;
                for (i.finish = !0, ot.queue(this, t, []), o && o.stop && o.stop.call(this, !0), e = s.length; e--;) s[e].elem === this && s[e].queue === t && (s[e].anim.stop(!0), s.splice(e, 1));
                for (e = 0; r > e; e++) n[e] && n[e].finish && n[e].finish.call(this);
                delete i.finish
            })
        }
    }), ot.each(["toggle", "show", "hide"], function (t, e) {
        var i = ot.fn[e];
        ot.fn[e] = function (t, n, o) {
            return null == t || "boolean" == typeof t ? i.apply(this, arguments) : this.animate(B(e, !0), t, n, o)
        }
    }), ot.each({
        slideDown: B("show"),
        slideUp: B("hide"),
        slideToggle: B("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function (t, e) {
        ot.fn[t] = function (t, i, n) {
            return this.animate(e, t, i, n)
        }
    }), ot.timers = [], ot.fx.tick = function () {
        var t, e = ot.timers,
            i = 0;
        for (pe = ot.now(); i < e.length; i++) t = e[i], t() || e[i] !== t || e.splice(i--, 1);
        e.length || ot.fx.stop(), pe = void 0
    }, ot.fx.timer = function (t) {
        ot.timers.push(t), t() ? ot.fx.start() : ot.timers.pop()
    }, ot.fx.interval = 13, ot.fx.start = function () {
        fe || (fe = setInterval(ot.fx.tick, ot.fx.interval))
    }, ot.fx.stop = function () {
        clearInterval(fe), fe = null
    }, ot.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, ot.fn.delay = function (t, e) {
        return t = ot.fx ? ot.fx.speeds[t] || t : t, e = e || "fx", this.queue(e, function (e, i) {
            var n = setTimeout(e, t);
            i.stop = function () {
                clearTimeout(n)
            }
        })
    },
        function () {
            var t, e, i, n, o;
            e = ft.createElement("div"), e.setAttribute("className", "t"), e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = e.getElementsByTagName("a")[0], i = ft.createElement("select"), o = i.appendChild(ft.createElement("option")), t = e.getElementsByTagName("input")[0], n.style.cssText = "top:1px", it.getSetAttribute = "t" !== e.className, it.style = /top/.test(n.getAttribute("style")), it.hrefNormalized = "/a" === n.getAttribute("href"), it.checkOn = !!t.value, it.optSelected = o.selected, it.enctype = !!ft.createElement("form").enctype, i.disabled = !0, it.optDisabled = !o.disabled, t = ft.createElement("input"), t.setAttribute("value", ""), it.input = "" === t.getAttribute("value"), t.value = "t", t.setAttribute("type", "radio"), it.radioValue = "t" === t.value
        }();
    var xe = /\r/g;
    ot.fn.extend({
        val: function (t) {
            var e, i, n, o = this[0];
            return arguments.length ? (n = ot.isFunction(t), this.each(function (i) {
                var o;
                1 === this.nodeType && (o = n ? t.call(this, i, ot(this).val()) : t, null == o ? o = "" : "number" == typeof o ? o += "" : ot.isArray(o) && (o = ot.map(o, function (t) {
                    return null == t ? "" : t + ""
                })), e = ot.valHooks[this.type] || ot.valHooks[this.nodeName.toLowerCase()], e && "set" in e && void 0 !== e.set(this, o, "value") || (this.value = o))
            })) : o ? (e = ot.valHooks[o.type] || ot.valHooks[o.nodeName.toLowerCase()], e && "get" in e && void 0 !== (i = e.get(o, "value")) ? i : (i = o.value, "string" == typeof i ? i.replace(xe, "") : null == i ? "" : i)) : void 0
        }
    }), ot.extend({
        valHooks: {
            option: {
                get: function (t) {
                    var e = ot.find.attr(t, "value");
                    return null != e ? e : ot.trim(ot.text(t))
                }
            },
            select: {
                get: function (t) {
                    for (var e, i, n = t.options, o = t.selectedIndex, s = "select-one" === t.type || 0 > o, r = s ? null : [], a = s ? o + 1 : n.length, l = 0 > o ? a : s ? o : 0; a > l; l++)
                        if (i = n[l], !(!i.selected && l !== o || (it.optDisabled ? i.disabled : null !== i.getAttribute("disabled")) || i.parentNode.disabled && ot.nodeName(i.parentNode, "optgroup"))) {
                            if (e = ot(i).val(), s) return e;
                            r.push(e)
                        }
                    return r
                },
                set: function (t, e) {
                    for (var i, n, o = t.options, s = ot.makeArray(e), r = o.length; r--;)
                        if (n = o[r], ot.inArray(ot.valHooks.option.get(n), s) >= 0) try {
                            n.selected = i = !0
                        } catch (a) {
                            n.scrollHeight
                        } else n.selected = !1;
                    return i || (t.selectedIndex = -1), o
                }
            }
        }
    }), ot.each(["radio", "checkbox"], function () {
        ot.valHooks[this] = {
            set: function (t, e) {
                return ot.isArray(e) ? t.checked = ot.inArray(ot(t).val(), e) >= 0 : void 0
            }
        }, it.checkOn || (ot.valHooks[this].get = function (t) {
            return null === t.getAttribute("value") ? "on" : t.value
        })
    });
    var we, ke, _e = ot.expr.attrHandle,
        Ce = /^(?:checked|selected)$/i,
        Te = it.getSetAttribute,
        $e = it.input;
    ot.fn.extend({
        attr: function (t, e) {
            return Mt(this, ot.attr, t, e, arguments.length > 1)
        },
        removeAttr: function (t) {
            return this.each(function () {
                ot.removeAttr(this, t)
            })
        }
    }), ot.extend({
        attr: function (t, e, i) {
            var n, o, s = t.nodeType;
            return t && 3 !== s && 8 !== s && 2 !== s ? typeof t.getAttribute === _t ? ot.prop(t, e, i) : (1 === s && ot.isXMLDoc(t) || (e = e.toLowerCase(), n = ot.attrHooks[e] || (ot.expr.match.bool.test(e) ? ke : we)), void 0 === i ? n && "get" in n && null !== (o = n.get(t, e)) ? o : (o = ot.find.attr(t, e), null == o ? void 0 : o) : null !== i ? n && "set" in n && void 0 !== (o = n.set(t, i, e)) ? o : (t.setAttribute(e, i + ""), i) : void ot.removeAttr(t, e)) : void 0
        },
        removeAttr: function (t, e) {
            var i, n, o = 0,
                s = e && e.match(bt);
            if (s && 1 === t.nodeType)
                for (; i = s[o++];) n = ot.propFix[i] || i, ot.expr.match.bool.test(i) ? $e && Te || !Ce.test(i) ? t[n] = !1 : t[ot.camelCase("default-" + i)] = t[n] = !1 : ot.attr(t, i, ""), t.removeAttribute(Te ? i : n)
        },
        attrHooks: {
            type: {
                set: function (t, e) {
                    if (!it.radioValue && "radio" === e && ot.nodeName(t, "input")) {
                        var i = t.value;
                        return t.setAttribute("type", e), i && (t.value = i), e
                    }
                }
            }
        }
    }), ke = {
        set: function (t, e, i) {
            return e === !1 ? ot.removeAttr(t, i) : $e && Te || !Ce.test(i) ? t.setAttribute(!Te && ot.propFix[i] || i, i) : t[ot.camelCase("default-" + i)] = t[i] = !0, i
        }
    }, ot.each(ot.expr.match.bool.source.match(/\w+/g), function (t, e) {
        var i = _e[e] || ot.find.attr;
        _e[e] = $e && Te || !Ce.test(e) ? function (t, e, n) {
            var o, s;
            return n || (s = _e[e], _e[e] = o, o = null != i(t, e, n) ? e.toLowerCase() : null, _e[e] = s), o
        } : function (t, e, i) {
            return i ? void 0 : t[ot.camelCase("default-" + e)] ? e.toLowerCase() : null
        }
    }), $e && Te || (ot.attrHooks.value = {
        set: function (t, e, i) {
            return ot.nodeName(t, "input") ? void (t.defaultValue = e) : we && we.set(t, e, i)
        }
    }), Te || (we = {
        set: function (t, e, i) {
            var n = t.getAttributeNode(i);
            return n || t.setAttributeNode(n = t.ownerDocument.createAttribute(i)), n.value = e += "", "value" === i || e === t.getAttribute(i) ? e : void 0
        }
    }, _e.id = _e.name = _e.coords = function (t, e, i) {
        var n;
        return i ? void 0 : (n = t.getAttributeNode(e)) && "" !== n.value ? n.value : null
    }, ot.valHooks.button = {
        get: function (t, e) {
            var i = t.getAttributeNode(e);
            return i && i.specified ? i.value : void 0
        },
        set: we.set
    }, ot.attrHooks.contenteditable = {
        set: function (t, e, i) {
            we.set(t, "" === e ? !1 : e, i)
        }
    }, ot.each(["width", "height"], function (t, e) {
        ot.attrHooks[e] = {
            set: function (t, i) {
                return "" === i ? (t.setAttribute(e, "auto"), i) : void 0
            }
        }
    })), it.style || (ot.attrHooks.style = {
        get: function (t) {
            return t.style.cssText || void 0
        },
        set: function (t, e) {
            return t.style.cssText = e + ""
        }
    });
    var Se = /^(?:input|select|textarea|button|object)$/i,
        Pe = /^(?:a|area)$/i;
    ot.fn.extend({
        prop: function (t, e) {
            return Mt(this, ot.prop, t, e, arguments.length > 1)
        },
        removeProp: function (t) {
            return t = ot.propFix[t] || t, this.each(function () {
                try {
                    this[t] = void 0, delete this[t]
                } catch (e) { }
            })
        }
    }), ot.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function (t, e, i) {
            var n, o, s, r = t.nodeType;
            return t && 3 !== r && 8 !== r && 2 !== r ? (s = 1 !== r || !ot.isXMLDoc(t), s && (e = ot.propFix[e] || e, o = ot.propHooks[e]), void 0 !== i ? o && "set" in o && void 0 !== (n = o.set(t, i, e)) ? n : t[e] = i : o && "get" in o && null !== (n = o.get(t, e)) ? n : t[e]) : void 0
        },
        propHooks: {
            tabIndex: {
                get: function (t) {
                    var e = ot.find.attr(t, "tabindex");
                    return e ? parseInt(e, 10) : Se.test(t.nodeName) || Pe.test(t.nodeName) && t.href ? 0 : -1
                }
            }
        }
    }), it.hrefNormalized || ot.each(["href", "src"], function (t, e) {
        ot.propHooks[e] = {
            get: function (t) {
                return t.getAttribute(e, 4)
            }
        }
    }), it.optSelected || (ot.propHooks.selected = {
        get: function (t) {
            var e = t.parentNode;
            return e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex), null
        }
    }), ot.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        ot.propFix[this.toLowerCase()] = this
    }), it.enctype || (ot.propFix.enctype = "encoding");
    var Me = /[\t\r\n\f]/g;
    ot.fn.extend({
        addClass: function (t) {
            var e, i, n, o, s, r, a = 0,
                l = this.length,
                c = "string" == typeof t && t;
            if (ot.isFunction(t)) return this.each(function (e) {
                ot(this).addClass(t.call(this, e, this.className))
            });
            if (c)
                for (e = (t || "").match(bt) || []; l > a; a++)
                    if (i = this[a], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(Me, " ") : " ")) {
                        for (s = 0; o = e[s++];) n.indexOf(" " + o + " ") < 0 && (n += o + " ");
                        r = ot.trim(n), i.className !== r && (i.className = r)
                    }
            return this
        },
        removeClass: function (t) {
            var e, i, n, o, s, r, a = 0,
                l = this.length,
                c = 0 === arguments.length || "string" == typeof t && t;
            if (ot.isFunction(t)) return this.each(function (e) {
                ot(this).removeClass(t.call(this, e, this.className))
            });
            if (c)
                for (e = (t || "").match(bt) || []; l > a; a++)
                    if (i = this[a], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(Me, " ") : "")) {
                        for (s = 0; o = e[s++];)
                            for (; n.indexOf(" " + o + " ") >= 0;) n = n.replace(" " + o + " ", " ");
                        r = t ? ot.trim(n) : "", i.className !== r && (i.className = r)
                    }
            return this
        },
        toggleClass: function (t, e) {
            var i = typeof t;
            return "boolean" == typeof e && "string" === i ? e ? this.addClass(t) : this.removeClass(t) : this.each(ot.isFunction(t) ? function (i) {
                ot(this).toggleClass(t.call(this, i, this.className, e), e)
            } : function () {
                if ("string" === i)
                    for (var e, n = 0, o = ot(this), s = t.match(bt) || []; e = s[n++];) o.hasClass(e) ? o.removeClass(e) : o.addClass(e);
                else (i === _t || "boolean" === i) && (this.className && ot._data(this, "__className__", this.className), this.className = this.className || t === !1 ? "" : ot._data(this, "__className__") || "")
            })
        },
        hasClass: function (t) {
            for (var e = " " + t + " ", i = 0, n = this.length; n > i; i++)
                if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(Me, " ").indexOf(e) >= 0) return !0;
            return !1
        }
    }), ot.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (t, e) {
        ot.fn[e] = function (t, i) {
            return arguments.length > 0 ? this.on(e, null, t, i) : this.trigger(e)
        }
    }), ot.fn.extend({
        hover: function (t, e) {
            return this.mouseenter(t).mouseleave(e || t)
        },
        bind: function (t, e, i) {
            return this.on(t, null, e, i)
        },
        unbind: function (t, e) {
            return this.off(t, null, e)
        },
        delegate: function (t, e, i, n) {
            return this.on(e, t, i, n)
        },
        undelegate: function (t, e, i) {
            return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", i)
        }
    });
    var Ae = ot.now(),
        Ee = /\?/,
        Le = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    ot.parseJSON = function (e) {
        if (t.JSON && t.JSON.parse) return t.JSON.parse(e + "");
        var i, n = null,
            o = ot.trim(e + "");
        return o && !ot.trim(o.replace(Le, function (t, e, o, s) {
            return i && e && (n = 0), 0 === n ? t : (i = o || e, n += !s - !o, "")
        })) ? Function("return " + o)() : ot.error("Invalid JSON: " + e)
    }, ot.parseXML = function (e) {
        var i, n;
        if (!e || "string" != typeof e) return null;
        try {
            t.DOMParser ? (n = new DOMParser, i = n.parseFromString(e, "text/xml")) : (i = new ActiveXObject("Microsoft.XMLDOM"), i.async = "false", i.loadXML(e))
        } catch (o) {
            i = void 0
        }
        return i && i.documentElement && !i.getElementsByTagName("parsererror").length || ot.error("Invalid XML: " + e), i
    };
    var De, Be, Fe = /#.*$/,
        He = /([?&])_=[^&]*/,
        Ie = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Oe = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        je = /^(?:GET|HEAD)$/,
        Ne = /^\/\//,
        ze = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        Re = {},
        qe = {},
        We = "*/".concat("*");
    try {
        Be = location.href
    } catch (Xe) {
        Be = ft.createElement("a"), Be.href = "", Be = Be.href
    }
    De = ze.exec(Be.toLowerCase()) || [], ot.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Be,
            type: "GET",
            isLocal: Oe.test(De[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": We,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": ot.parseJSON,
                "text xml": ot.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function (t, e) {
            return e ? z(z(t, ot.ajaxSettings), e) : z(ot.ajaxSettings, t)
        },
        ajaxPrefilter: j(Re),
        ajaxTransport: j(qe),
        ajax: function (t, e) {
            function i(t, e, i, n) {
                var o, d, v, y, x, k = e;
                2 !== b && (b = 2, a && clearTimeout(a), c = void 0, r = n || "", w.readyState = t > 0 ? 4 : 0, o = t >= 200 && 300 > t || 304 === t, i && (y = R(h, w, i)), y = q(h, y, w, o), o ? (h.ifModified && (x = w.getResponseHeader("Last-Modified"), x && (ot.lastModified[s] = x), x = w.getResponseHeader("etag"), x && (ot.etag[s] = x)), 204 === t || "HEAD" === h.type ? k = "nocontent" : 304 === t ? k = "notmodified" : (k = y.state, d = y.data, v = y.error, o = !v)) : (v = k, (t || !k) && (k = "error", 0 > t && (t = 0))), w.status = t, w.statusText = (e || k) + "", o ? f.resolveWith(u, [d, k, w]) : f.rejectWith(u, [w, k, v]), w.statusCode(g), g = void 0, l && p.trigger(o ? "ajaxSuccess" : "ajaxError", [w, h, o ? d : v]), m.fireWith(u, [w, k]), l && (p.trigger("ajaxComplete", [w, h]), --ot.active || ot.event.trigger("ajaxStop")))
            }
            "object" == typeof t && (e = t, t = void 0), e = e || {};
            var n, o, s, r, a, l, c, d, h = ot.ajaxSetup({}, e),
                u = h.context || h,
                p = h.context && (u.nodeType || u.jquery) ? ot(u) : ot.event,
                f = ot.Deferred(),
                m = ot.Callbacks("once memory"),
                g = h.statusCode || {},
                v = {},
                y = {},
                b = 0,
                x = "canceled",
                w = {
                    readyState: 0,
                    getResponseHeader: function (t) {
                        var e;
                        if (2 === b) {
                            if (!d)
                                for (d = {}; e = Ie.exec(r);) d[e[1].toLowerCase()] = e[2];
                            e = d[t.toLowerCase()]
                        }
                        return null == e ? null : e
                    },
                    getAllResponseHeaders: function () {
                        return 2 === b ? r : null
                    },
                    setRequestHeader: function (t, e) {
                        var i = t.toLowerCase();
                        return b || (t = y[i] = y[i] || t, v[t] = e), this
                    },
                    overrideMimeType: function (t) {
                        return b || (h.mimeType = t), this
                    },
                    statusCode: function (t) {
                        var e;
                        if (t)
                            if (2 > b)
                                for (e in t) g[e] = [g[e], t[e]];
                            else w.always(t[w.status]);
                        return this
                    },
                    abort: function (t) {
                        var e = t || x;
                        return c && c.abort(e), i(0, e), this
                    }
                };
            if (f.promise(w).complete = m.add, w.success = w.done, w.error = w.fail, h.url = ((t || h.url || Be) + "").replace(Fe, "").replace(Ne, De[1] + "//"), h.type = e.method || e.type || h.method || h.type, h.dataTypes = ot.trim(h.dataType || "*").toLowerCase().match(bt) || [""], null == h.crossDomain && (n = ze.exec(h.url.toLowerCase()), h.crossDomain = !(!n || n[1] === De[1] && n[2] === De[2] && (n[3] || ("http:" === n[1] ? "80" : "443")) === (De[3] || ("http:" === De[1] ? "80" : "443")))), h.data && h.processData && "string" != typeof h.data && (h.data = ot.param(h.data, h.traditional)), N(Re, h, e, w), 2 === b) return w;
            l = ot.event && h.global, l && 0 === ot.active++ && ot.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !je.test(h.type), s = h.url, h.hasContent || (h.data && (s = h.url += (Ee.test(s) ? "&" : "?") + h.data, delete h.data), h.cache === !1 && (h.url = He.test(s) ? s.replace(He, "$1_=" + Ae++) : s + (Ee.test(s) ? "&" : "?") + "_=" + Ae++)), h.ifModified && (ot.lastModified[s] && w.setRequestHeader("If-Modified-Since", ot.lastModified[s]), ot.etag[s] && w.setRequestHeader("If-None-Match", ot.etag[s])), (h.data && h.hasContent && h.contentType !== !1 || e.contentType) && w.setRequestHeader("Content-Type", h.contentType), w.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + We + "; q=0.01" : "") : h.accepts["*"]);
            for (o in h.headers) w.setRequestHeader(o, h.headers[o]);
            if (h.beforeSend && (h.beforeSend.call(u, w, h) === !1 || 2 === b)) return w.abort();
            x = "abort";
            for (o in {
                success: 1,
                error: 1,
                complete: 1
            }) w[o](h[o]);
            if (c = N(qe, h, e, w)) {
                w.readyState = 1, l && p.trigger("ajaxSend", [w, h]), h.async && h.timeout > 0 && (a = setTimeout(function () {
                    w.abort("timeout")
                }, h.timeout));
                try {
                    b = 1, c.send(v, i)
                } catch (k) {
                    if (!(2 > b)) throw k;
                    i(-1, k)
                }
            } else i(-1, "No Transport");
            return w
        },
        getJSON: function (t, e, i) {
            return ot.get(t, e, i, "json")
        },
        getScript: function (t, e) {
            return ot.get(t, void 0, e, "script")
        }
    }), ot.each(["get", "post"], function (t, e) {
        ot[e] = function (t, i, n, o) {
            return ot.isFunction(i) && (o = o || n, n = i, i = void 0), ot.ajax({
                url: t,
                type: e,
                dataType: o,
                data: i,
                success: n
            })
        }
    }), ot._evalUrl = function (t) {
        return ot.ajax({
            url: t,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    }, ot.fn.extend({
        wrapAll: function (t) {
            if (ot.isFunction(t)) return this.each(function (e) {
                ot(this).wrapAll(t.call(this, e))
            });
            if (this[0]) {
                var e = ot(t, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && e.insertBefore(this[0]), e.map(function () {
                    for (var t = this; t.firstChild && 1 === t.firstChild.nodeType;) t = t.firstChild;
                    return t
                }).append(this)
            }
            return this
        },
        wrapInner: function (t) {
            return this.each(ot.isFunction(t) ? function (e) {
                ot(this).wrapInner(t.call(this, e))
            } : function () {
                var e = ot(this),
                    i = e.contents();
                i.length ? i.wrapAll(t) : e.append(t)
            })
        },
        wrap: function (t) {
            var e = ot.isFunction(t);
            return this.each(function (i) {
                ot(this).wrapAll(e ? t.call(this, i) : t)
            })
        },
        unwrap: function () {
            return this.parent().each(function () {
                ot.nodeName(this, "body") || ot(this).replaceWith(this.childNodes)
            }).end()
        }
    }), ot.expr.filters.hidden = function (t) {
        return t.offsetWidth <= 0 && t.offsetHeight <= 0 || !it.reliableHiddenOffsets() && "none" === (t.style && t.style.display || ot.css(t, "display"))
    }, ot.expr.filters.visible = function (t) {
        return !ot.expr.filters.hidden(t)
    };
    var Ye = /%20/g,
        Ve = /\[\]$/,
        Ge = /\r?\n/g,
        Ue = /^(?:submit|button|image|reset|file)$/i,
        Ke = /^(?:input|select|textarea|keygen)/i;
    ot.param = function (t, e) {
        var i, n = [],
            o = function (t, e) {
                e = ot.isFunction(e) ? e() : null == e ? "" : e, n[n.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
            };
        if (void 0 === e && (e = ot.ajaxSettings && ot.ajaxSettings.traditional), ot.isArray(t) || t.jquery && !ot.isPlainObject(t)) ot.each(t, function () {
            o(this.name, this.value)
        });
        else
            for (i in t) W(i, t[i], e, o);
        return n.join("&").replace(Ye, "+")
    }, ot.fn.extend({
        serialize: function () {
            return ot.param(this.serializeArray())
        },
        serializeArray: function () {
            return this.map(function () {
                var t = ot.prop(this, "elements");
                return t ? ot.makeArray(t) : this
            }).filter(function () {
                var t = this.type;
                return this.name && !ot(this).is(":disabled") && Ke.test(this.nodeName) && !Ue.test(t) && (this.checked || !At.test(t))
            }).map(function (t, e) {
                var i = ot(this).val();
                return null == i ? null : ot.isArray(i) ? ot.map(i, function (t) {
                    return {
                        name: e.name,
                        value: t.replace(Ge, "\r\n")
                    }
                }) : {
                        name: e.name,
                        value: i.replace(Ge, "\r\n")
                    }
            }).get()
        }
    }), ot.ajaxSettings.xhr = void 0 !== t.ActiveXObject ? function () {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && X() || Y()
    } : X;
    var Je = 0,
        Ze = {},
        Qe = ot.ajaxSettings.xhr();
    t.attachEvent && t.attachEvent("onunload", function () {
        for (var t in Ze) Ze[t](void 0, !0)
    }), it.cors = !!Qe && "withCredentials" in Qe, Qe = it.ajax = !!Qe, Qe && ot.ajaxTransport(function (t) {
        if (!t.crossDomain || it.cors) {
            var e;
            return {
                send: function (i, n) {
                    var o, s = t.xhr(),
                        r = ++Je;
                    if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                        for (o in t.xhrFields) s[o] = t.xhrFields[o];
                    t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                    for (o in i) void 0 !== i[o] && s.setRequestHeader(o, i[o] + "");
                    s.send(t.hasContent && t.data || null), e = function (i, o) {
                        var a, l, c;
                        if (e && (o || 4 === s.readyState))
                            if (delete Ze[r], e = void 0, s.onreadystatechange = ot.noop, o) 4 !== s.readyState && s.abort();
                            else {
                                c = {}, a = s.status, "string" == typeof s.responseText && (c.text = s.responseText);
                                try {
                                    l = s.statusText
                                } catch (d) {
                                    l = ""
                                }
                                a || !t.isLocal || t.crossDomain ? 1223 === a && (a = 204) : a = c.text ? 200 : 404
                            }
                        c && n(a, l, c, s.getAllResponseHeaders())
                    }, t.async ? 4 === s.readyState ? setTimeout(e) : s.onreadystatechange = Ze[r] = e : e()
                },
                abort: function () {
                    e && e(void 0, !0)
                }
            }
        }
    }), ot.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function (t) {
                return ot.globalEval(t), t
            }
        }
    }), ot.ajaxPrefilter("script", function (t) {
        void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET", t.global = !1)
    }), ot.ajaxTransport("script", function (t) {
        if (t.crossDomain) {
            var e, i = ft.head || ot("head")[0] || ft.documentElement;
            return {
                send: function (n, o) {
                    e = ft.createElement("script"), e.async = !0, t.scriptCharset && (e.charset = t.scriptCharset), e.src = t.url, e.onload = e.onreadystatechange = function (t, i) {
                        (i || !e.readyState || /loaded|complete/.test(e.readyState)) && (e.onload = e.onreadystatechange = null, e.parentNode && e.parentNode.removeChild(e), e = null, i || o(200, "success"))
                    }, i.insertBefore(e, i.firstChild)
                },
                abort: function () {
                    e && e.onload(void 0, !0)
                }
            }
        }
    });
    var ti = [],
        ei = /(=)\?(?=&|$)|\?\?/;
    ot.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var t = ti.pop() || ot.expando + "_" + Ae++;
            return this[t] = !0, t
        }
    }), ot.ajaxPrefilter("json jsonp", function (e, i, n) {
        var o, s, r, a = e.jsonp !== !1 && (ei.test(e.url) ? "url" : "string" == typeof e.data && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && ei.test(e.data) && "data");
        return a || "jsonp" === e.dataTypes[0] ? (o = e.jsonpCallback = ot.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(ei, "$1" + o) : e.jsonp !== !1 && (e.url += (Ee.test(e.url) ? "&" : "?") + e.jsonp + "=" + o), e.converters["script json"] = function () {
            return r || ot.error(o + " was not called"), r[0]
        }, e.dataTypes[0] = "json", s = t[o], t[o] = function () {
            r = arguments
        }, n.always(function () {
            t[o] = s, e[o] && (e.jsonpCallback = i.jsonpCallback, ti.push(o)), r && ot.isFunction(s) && s(r[0]), r = s = void 0
        }), "script") : void 0
    }), ot.parseHTML = function (t, e, i) {
        if (!t || "string" != typeof t) return null;
        "boolean" == typeof e && (i = e, e = !1), e = e || ft;
        var n = ht.exec(t),
            o = !i && [];
        return n ? [e.createElement(n[1])] : (n = ot.buildFragment([t], e, o), o && o.length && ot(o).remove(), ot.merge([], n.childNodes))
    };
    var ii = ot.fn.load;
    ot.fn.load = function (t, e, i) {
        if ("string" != typeof t && ii) return ii.apply(this, arguments);
        var n, o, s, r = this,
            a = t.indexOf(" ");
        return a >= 0 && (n = ot.trim(t.slice(a, t.length)), t = t.slice(0, a)), ot.isFunction(e) ? (i = e, e = void 0) : e && "object" == typeof e && (s = "POST"), r.length > 0 && ot.ajax({
            url: t,
            type: s,
            dataType: "html",
            data: e
        }).done(function (t) {
            o = arguments, r.html(n ? ot("<div>").append(ot.parseHTML(t)).find(n) : t)
        }).complete(i && function (t, e) {
            r.each(i, o || [t.responseText, e, t])
        }), this
    }, ot.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (t, e) {
        ot.fn[e] = function (t) {
            return this.on(e, t)
        }
    }), ot.expr.filters.animated = function (t) {
        return ot.grep(ot.timers, function (e) {
            return t === e.elem
        }).length
    };
    var ni = t.document.documentElement;
    ot.offset = {
        setOffset: function (t, e, i) {
            var n, o, s, r, a, l, c, d = ot.css(t, "position"),
                h = ot(t),
                u = {};
            "static" === d && (t.style.position = "relative"), a = h.offset(), s = ot.css(t, "top"), l = ot.css(t, "left"), c = ("absolute" === d || "fixed" === d) && ot.inArray("auto", [s, l]) > -1, c ? (n = h.position(), r = n.top, o = n.left) : (r = parseFloat(s) || 0, o = parseFloat(l) || 0), ot.isFunction(e) && (e = e.call(t, i, a)), null != e.top && (u.top = e.top - a.top + r), null != e.left && (u.left = e.left - a.left + o), "using" in e ? e.using.call(t, u) : h.css(u)
        }
    }, ot.fn.extend({
        offset: function (t) {
            if (arguments.length) return void 0 === t ? this : this.each(function (e) {
                ot.offset.setOffset(this, t, e)
            });
            var e, i, n = {
                top: 0,
                left: 0
            },
                o = this[0],
                s = o && o.ownerDocument;
            return s ? (e = s.documentElement, ot.contains(e, o) ? (typeof o.getBoundingClientRect !== _t && (n = o.getBoundingClientRect()), i = V(s), {
                top: n.top + (i.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                left: n.left + (i.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
            }) : n) : void 0
        },
        position: function () {
            if (this[0]) {
                var t, e, i = {
                    top: 0,
                    left: 0
                },
                    n = this[0];
                return "fixed" === ot.css(n, "position") ? e = n.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), ot.nodeName(t[0], "html") || (i = t.offset()), i.top += ot.css(t[0], "borderTopWidth", !0), i.left += ot.css(t[0], "borderLeftWidth", !0)), {
                    top: e.top - i.top - ot.css(n, "marginTop", !0),
                    left: e.left - i.left - ot.css(n, "marginLeft", !0)
                }
            }
        },
        offsetParent: function () {
            return this.map(function () {
                for (var t = this.offsetParent || ni; t && !ot.nodeName(t, "html") && "static" === ot.css(t, "position");) t = t.offsetParent;
                return t || ni
            })
        }
    }), ot.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function (t, e) {
        var i = /Y/.test(e);
        ot.fn[t] = function (n) {
            return Mt(this, function (t, n, o) {
                var s = V(t);
                return void 0 === o ? s ? e in s ? s[e] : s.document.documentElement[n] : t[n] : void (s ? s.scrollTo(i ? ot(s).scrollLeft() : o, i ? o : ot(s).scrollTop()) : t[n] = o)
            }, t, n, arguments.length, null)
        }
    }), ot.each(["top", "left"], function (t, e) {
        ot.cssHooks[e] = $(it.pixelPosition, function (t, i) {
            return i ? (i = ee(t, e), ne.test(i) ? ot(t).position()[e] + "px" : i) : void 0
        })
    }), ot.each({
        Height: "height",
        Width: "width"
    }, function (t, e) {
        ot.each({
            padding: "inner" + t,
            content: e,
            "": "outer" + t
        }, function (i, n) {
            ot.fn[n] = function (n, o) {
                var s = arguments.length && (i || "boolean" != typeof n),
                    r = i || (n === !0 || o === !0 ? "margin" : "border");
                return Mt(this, function (e, i, n) {
                    var o;
                    return ot.isWindow(e) ? e.document.documentElement["client" + t] : 9 === e.nodeType ? (o = e.documentElement, Math.max(e.body["scroll" + t], o["scroll" + t], e.body["offset" + t], o["offset" + t], o["client" + t])) : void 0 === n ? ot.css(e, i, r) : ot.style(e, i, n, r)
                }, e, s ? n : void 0, s, null)
            }
        })
    }), ot.fn.size = function () {
        return this.length
    }, ot.fn.andSelf = ot.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
        return ot
    });
    var oi = t.jQuery,
        si = t.$;
    return ot.noConflict = function (e) {
        return t.$ === ot && (t.$ = si), e && t.jQuery === ot && (t.jQuery = oi), ot
    }, typeof e === _t && (t.jQuery = t.$ = ot), ot
}), define("jquery-private", ["jquery"], function (t) {
    "use strict";
    return t.noConflict()
}), define("component", ["jquery"], function (t) {
    "use strict";
    return {
        init: function (e) {
            "undefined" == typeof e && (e = t("[ data-component ]")), e.each(function () {
                var e = t(this),
                    i = e.data("component");
                require(["../src/sublayouts/" + i + "/" + i], function (t) {
                    var i;
                    void 0 !== t && (i = new t(e), i.init())
                })
            })
        }
    }
}), define("helper", ["jquery"], function (t) {
    "use strict";
    return {
        init: function (e) {
            "undefined" == typeof e && (e = t("[ data-helper ]")), e.each(function () {
                var e = t(this),
                    i = e.data("helper");
                require(["../src/sublayouts/_helpers/" + i + "/" + i], function (t) {
                    var i;
                    void 0 !== t && (i = new t(e), i.init())
                })
            })
        }
    }
}), define("breakpoint", ["jquery"], function (t) {
    "use strict";
    var e = {};
    return e.init = function () {
        this.set(), t(window).on("resize orientationchange", t.proxy(this.set, this))
    }, e.set = function () {
        var i = document.getElementsByTagName("html")[0],
            n = i.className.match(/breakpoint-([a-z]+)/),
            o = null === n ? null : n[1],
            s = window.getComputedStyle ? window.getComputedStyle(i, ":after").getPropertyValue("content") : void 0,
            r = s ? s.replace(/"/g, "") : void 0,
            a = o;
        r && r !== o && (i.className = i.className.replace(/\s?breakpoint-[a-z]+/, ""), i.className += " breakpoint-" + r, o = r, t(e).trigger("change", [r, a]))
    }, e
}), define("lib/utils", ["jquery"], function (t) {
    "use strict";
    var e = {};
    return e.isRTL = function () {
        return "rtl" === t("html").attr("dir")
    }, e.isWindowsPhone = function () {
        return null !== navigator.userAgent.match(/IEMobile/i)
    }, e.language = function () {
        return void 0 === t("html").attr("lang") ? "en" : t("html").attr("lang")
    }, e.breakpoint = function () {
        return (t("html").attr("class").match(/breakpoint-([a-z]+)/) || ["", "l"])[1]
    }, e.canTransition = function () {
        return void 0 !== document.body.style.transition
    }, e.headerBarHeight = function () {
        return t('[ data-m12-bar="true"]').height()
    }, e.fixedHeader = function () {
        return "true" === t('[ data-m12-bar="true"]').attr("data-m12-bar-fixed")
    }, e.isTouchDevice = function () {
        return "ontouchstart" in document.documentElement
    }, e.isDevice = function () {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }, e.parseFloatInput = function (t) {
        return parseFloat(t.replace(/[^0-9.]/g, ""), 10)
    }, e.uniqueID = function () {
        return "_" + Math.random().toString(36).substr(2, 9)
    }, e.isNumber = function (t) {
        return "number" == typeof t && isFinite(t)
    }, e.getParameterByName = function (t) {
        t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var e = new RegExp("[\\?&]" + t + "=([^&#]*)"),
            i = e.exec(location.search);
        return null === i ? "" : decodeURIComponent(i[1].replace(/\+/g, " "))
    }, e.percentageRound = function (t, e) {
        var i;
        for (e = e || 2, i = "" + Math.round(t * Math.pow(10, e)) / Math.pow(10, e), i.match(/\./) || (i += "."); i.match(/\.([0-9]*)$/)[1].length < e;) i += "0";
        return i + "%"
    }, e.isMSIE = function () {
        var t = window.navigator.userAgent,
            e = t.indexOf("MSIE");
        return e > 0 || navigator.userAgent.match(/Trident.*rv\:11\./) ? !0 : !1
    }, e.isLessThanIE10 = function () {
        var t = this.isMSIE() && document.all && void 0 === window.matchMedia;
        return t
    }, e.isLessThanIE9 = function () {
        return this.isMSIE() && void 0 === document.addEventListener
    }, e
});
var _slice = Array.prototype.slice;
! function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e(require("jquery")) : "function" == typeof define && define.amd ? define("parsley", ["jquery"], e) : t.parsley = e(t.jQuery)
}(this, function (t) {
    "use strict";

    function e(t, e) {
        return t.parsleyAdaptedCallback || (t.parsleyAdaptedCallback = function () {
            var i = Array.prototype.slice.call(arguments, 0);
            i.unshift(this), t.apply(e || A, i)
        }), t.parsleyAdaptedCallback
    }

    function i(t) {
        return 0 === t.lastIndexOf(L, 0) ? t.substr(L.length) : t
    }
    var n = 1,
        o = {},
        s = {
            attr: function (t, e, i) {
                var n, o, s, r = new RegExp("^" + e, "i");
                if ("undefined" == typeof i) i = {};
                else
                    for (n in i) i.hasOwnProperty(n) && delete i[n];
                if ("undefined" == typeof t || "undefined" == typeof t[0]) return i;
                for (s = t[0].attributes, n = s.length; n--;) o = s[n], o && o.specified && r.test(o.name) && (i[this.camelize(o.name.slice(e.length))] = this.deserializeValue(o.value));
                return i
            },
            checkAttr: function (t, e, i) {
                return t.is("[" + e + i + "]")
            },
            setAttr: function (t, e, i, n) {
                t[0].setAttribute(this.dasherize(e + i), String(n))
            },
            generateID: function () {
                return "" + n++
            },
            deserializeValue: function (e) {
                var i;
                try {
                    return e ? "true" == e || ("false" == e ? !1 : "null" == e ? null : isNaN(i = Number(e)) ? /^[\[\{]/.test(e) ? t.parseJSON(e) : e : i) : e
                } catch (n) {
                    return e
                }
            },
            camelize: function (t) {
                return t.replace(/-+(.)?/g, function (t, e) {
                    return e ? e.toUpperCase() : ""
                })
            },
            dasherize: function (t) {
                return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
            },
            warn: function () {
                var t;
                window.console && "function" == typeof window.console.warn && (t = window.console).warn.apply(t, arguments)
            },
            warnOnce: function (t) {
                o[t] || (o[t] = !0, this.warn.apply(this, arguments))
            },
            _resetWarnings: function () {
                o = {}
            },
            trimString: function (t) {
                return t.replace(/^\s+|\s+$/g, "")
            },
            objectCreate: Object.create || function () {
                var t = function () { };
                return function (e) {
                    if (arguments.length > 1) throw Error("Second argument not supported");
                    if ("object" != typeof e) throw TypeError("Argument must be an object");
                    t.prototype = e;
                    var i = new t;
                    return t.prototype = null, i
                }
            }()
        },
        r = s,
        a = {
            namespace: "data-parsley-",
            inputs: "input, textarea, select",
            excluded: "input[type=button], input[type=submit], input[type=reset], input[type=hidden]",
            priorityEnabled: !0,
            multiple: null,
            group: null,
            uiEnabled: !0,
            validationThreshold: 3,
            focus: "first",
            trigger: !1,
            errorClass: "parsley-error",
            successClass: "parsley-success",
            classHandler: function (t) { },
            errorsContainer: function (t) { },
            errorsWrapper: '<ul class="parsley-errors-list"></ul>',
            errorTemplate: "<li></li>"
        },
        l = function () { };
    l.prototype = {
        asyncSupport: !0,
        actualizeOptions: function () {
            return r.attr(this.$element, this.options.namespace, this.domOptions), this.parent && this.parent.actualizeOptions && this.parent.actualizeOptions(), this
        },
        _resetOptions: function (t) {
            this.domOptions = r.objectCreate(this.parent.options), this.options = r.objectCreate(this.domOptions);
            for (var e in t) t.hasOwnProperty(e) && (this.options[e] = t[e]);
            this.actualizeOptions()
        },
        _listeners: null,
        on: function (t, e) {
            this._listeners = this._listeners || {};
            var i = this._listeners[t] = this._listeners[t] || [];
            return i.push(e), this
        },
        subscribe: function (e, i) {
            t.listenTo(this, e.toLowerCase(), i)
        },
        off: function (t, e) {
            var i = this._listeners && this._listeners[t];
            if (i)
                if (e)
                    for (var n = i.length; n--;) i[n] === e && i.splice(n, 1);
                else delete this._listeners[t];
            return this
        },
        unsubscribe: function (e, i) {
            t.unsubscribeTo(this, e.toLowerCase())
        },
        trigger: function (t, e, i) {
            e = e || this;
            var n, o = this._listeners && this._listeners[t];
            if (o)
                for (var s = o.length; s--;)
                    if (n = o[s].call(e, e, i), n === !1) return n;
            return this.parent ? this.parent.trigger(t, e, i) : !0
        },
        reset: function () {
            if ("ParsleyForm" !== this.__class__) return this._trigger("reset");
            for (var t = 0; t < this.fields.length; t++) this.fields[t]._trigger("reset");
            this._trigger("reset")
        },
        destroy: function () {
            if ("ParsleyForm" !== this.__class__) return this.$element.removeData("Parsley"), this.$element.removeData("ParsleyFieldMultiple"), void this._trigger("destroy");
            for (var t = 0; t < this.fields.length; t++) this.fields[t].destroy();
            this.$element.removeData("Parsley"), this._trigger("destroy")
        },
        asyncIsValid: function (t, e) {
            return r.warnOnce("asyncIsValid is deprecated; please use whenValid instead"), this.whenValid({
                group: t,
                force: e
            })
        },
        _findRelated: function () {
            return this.options.multiple ? this.parent.$element.find("[" + this.options.namespace + 'multiple="' + this.options.multiple + '"]') : this.$element
        }
    };
    var c = {
        string: function (t) {
            return t
        },
        integer: function (t) {
            if (isNaN(t)) throw 'Requirement is not an integer: "' + t + '"';
            return parseInt(t, 10)
        },
        number: function (t) {
            if (isNaN(t)) throw 'Requirement is not a number: "' + t + '"';
            return parseFloat(t)
        },
        reference: function (e) {
            var i = t(e);
            if (0 === i.length) throw 'No such reference: "' + e + '"';
            return i
        },
        "boolean": function (t) {
            return "false" !== t
        },
        object: function (t) {
            return r.deserializeValue(t)
        },
        regexp: function (t) {
            var e = "";
            return /^\/.*\/(?:[gimy]*)$/.test(t) ? (e = t.replace(/.*\/([gimy]*)$/, "$1"), t = t.replace(new RegExp("^/(.*?)/" + e + "$"), "$1")) : t = "^" + t + "$", new RegExp(t, e)
        }
    },
        d = function (t, e) {
            var i = t.match(/^\s*\[(.*)\]\s*$/);
            if (!i) throw 'Requirement is not an array: "' + t + '"';
            var n = i[1].split(",").map(r.trimString);
            if (n.length !== e) throw "Requirement has " + n.length + " values when " + e + " are needed";
            return n
        },
        h = function (t, e) {
            var i = c[t || "string"];
            if (!i) throw 'Unknown requirement specification: "' + t + '"';
            return i(e)
        },
        u = function (t, e, i) {
            var n = null,
                o = {};
            for (var s in t)
                if (s) {
                    var r = i(s);
                    "string" == typeof r && (r = h(t[s], r)), o[s] = r
                } else n = h(t[s], e);
            return [n, o]
        },
        p = function (e) {
            t.extend(!0, this, e)
        };
    p.prototype = {
        validate: function (e, i) {
            if (this.fn) return arguments.length > 3 && (i = [].slice.call(arguments, 1, -1)), this.fn.call(this, e, i);
            if (t.isArray(e)) {
                if (!this.validateMultiple) throw "Validator `" + this.name + "` does not handle multiple values";
                return this.validateMultiple.apply(this, arguments)
            }
            if (this.validateNumber) return isNaN(e) ? !1 : (arguments[0] = parseFloat(arguments[0]), this.validateNumber.apply(this, arguments));
            if (this.validateString) return this.validateString.apply(this, arguments);
            throw "Validator `" + this.name + "` only handles multiple values"
        },
        parseRequirements: function (e, i) {
            if ("string" != typeof e) return t.isArray(e) ? e : [e];
            var n = this.requirementType;
            if (t.isArray(n)) {
                for (var o = d(e, n.length), s = 0; s < o.length; s++) o[s] = h(n[s], o[s]);
                return o
            }
            return t.isPlainObject(n) ? u(n, e, i) : [h(n, e)]
        },
        requirementType: "string",
        priority: 2
    };
    var f = function (t, e) {
        this.__class__ = "ParsleyValidatorRegistry", this.locale = "en", this.init(t || {}, e || {})
    },
        m = {
            email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
            number: /^-?(\d*\.)?\d+(e[-+]?\d+)?$/i,
            integer: /^-?\d+$/,
            digits: /^\d+$/,
            alphanum: /^\w+$/i,
            url: new RegExp("^(?:(?:https?|ftp)://)?(?:\\S+(?::\\S*)?@)?(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:/\\S*)?$", "i")
        };
    m.range = m.number;
    var g = function (t) {
        var e = ("" + t).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
        return e ? Math.max(0, (e[1] ? e[1].length : 0) - (e[2] ? +e[2] : 0)) : 0
    };
    f.prototype = {
        init: function (e, i) {
            this.catalog = i, this.validators = t.extend({}, this.validators);
            for (var n in e) this.addValidator(n, e[n].fn, e[n].priority);
            window.Parsley.trigger("parsley:validator:init")
        },
        setLocale: function (t) {
            if ("undefined" == typeof this.catalog[t]) throw new Error(t + " is not available in the catalog");
            return this.locale = t, this
        },
        addCatalog: function (t, e, i) {
            return "object" == typeof e && (this.catalog[t] = e), !0 === i ? this.setLocale(t) : this
        },
        addMessage: function (t, e, i) {
            return "undefined" == typeof this.catalog[t] && (this.catalog[t] = {}), this.catalog[t][e] = i, this
        },
        addMessages: function (t, e) {
            for (var i in e) this.addMessage(t, i, e[i]);
            return this
        },
        addValidator: function (t, e, i) {
            if (this.validators[t]) r.warn('Validator "' + t + '" is already defined.');
            else if (a.hasOwnProperty(t)) return void r.warn('"' + t + '" is a restricted keyword and is not a valid validator name.');
            return this._setValidator.apply(this, arguments)
        },
        updateValidator: function (t, e, i) {
            return this.validators[t] ? this._setValidator(this, arguments) : (r.warn('Validator "' + t + '" is not already defined.'), this.addValidator.apply(this, arguments))
        },
        removeValidator: function (t) {
            return this.validators[t] || r.warn('Validator "' + t + '" is not defined.'), delete this.validators[t], this
        },
        _setValidator: function (t, e, i) {
            "object" != typeof e && (e = {
                fn: e,
                priority: i
            }), e.validate || (e = new p(e)), this.validators[t] = e;
            for (var n in e.messages || {}) this.addMessage(n, t, e.messages[n]);
            return this
        },
        getErrorMessage: function (t) {
            var e;
            if ("type" === t.name) {
                var i = this.catalog[this.locale][t.name] || {};
                e = i[t.requirements]
            } else e = this.formatMessage(this.catalog[this.locale][t.name], t.requirements);
            return e || this.catalog[this.locale].defaultMessage || this.catalog.en.defaultMessage
        },
        formatMessage: function (t, e) {
            if ("object" == typeof e) {
                for (var i in e) t = this.formatMessage(t, e[i]);
                return t
            }
            return "string" == typeof t ? t.replace(/%s/i, e) : ""
        },
        validators: {
            notblank: {
                validateString: function (t) {
                    return /\S/.test(t)
                },
                priority: 2
            },
            required: {
                validateMultiple: function (t) {
                    return t.length > 0
                },
                validateString: function (t) {
                    return /\S/.test(t)
                },
                priority: 512
            },
            type: {
                validateString: function (t, e) {
                    var i = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2],
                        n = i.step,
                        o = void 0 === n ? "1" : n,
                        s = i.base,
                        r = void 0 === s ? 0 : s,
                        a = m[e];
                    if (!a) throw new Error("validator type `" + e + "` is not supported");
                    if (!a.test(t)) return !1;
                    if ("number" === e && !/^any$/i.test(o || "")) {
                        var l = Number(t),
                            c = Math.pow(10, Math.max(g(o), g(r)));
                        if ((l * c - r * c) % (o * c) != 0) return !1
                    }
                    return !0
                },
                requirementType: {
                    "": "string",
                    step: "string",
                    base: "number"
                },
                priority: 256
            },
            pattern: {
                validateString: function (t, e) {
                    return e.test(t)
                },
                requirementType: "regexp",
                priority: 64
            },
            minlength: {
                validateString: function (t, e) {
                    return t.length >= e
                },
                requirementType: "integer",
                priority: 30
            },
            maxlength: {
                validateString: function (t, e) {
                    return t.length <= e
                },
                requirementType: "integer",
                priority: 30
            },
            length: {
                validateString: function (t, e, i) {
                    return t.length >= e && t.length <= i
                },
                requirementType: ["integer", "integer"],
                priority: 30
            },
            mincheck: {
                validateMultiple: function (t, e) {
                    return t.length >= e
                },
                requirementType: "integer",
                priority: 30
            },
            maxcheck: {
                validateMultiple: function (t, e) {
                    return t.length <= e
                },
                requirementType: "integer",
                priority: 30
            },
            check: {
                validateMultiple: function (t, e, i) {
                    return t.length >= e && t.length <= i
                },
                requirementType: ["integer", "integer"],
                priority: 30
            },
            min: {
                validateNumber: function (t, e) {
                    return t >= e
                },
                requirementType: "number",
                priority: 30
            },
            max: {
                validateNumber: function (t, e) {
                    return e >= t
                },
                requirementType: "number",
                priority: 30
            },
            range: {
                validateNumber: function (t, e, i) {
                    return t >= e && i >= t
                },
                requirementType: ["number", "number"],
                priority: 30
            },
            equalto: {
                validateString: function (e, i) {
                    var n = t(i);
                    return n.length ? e === n.val() : e === i
                },
                priority: 256
            }
        }
    };
    var v = function (t) {
        this.__class__ = "ParsleyUI"
    };
    v.prototype = {
        listen: function () {
            var t = this;
            return window.Parsley.on("form:init", function (e) {
                t.setupForm(e)
            }).on("field:init", function (e) {
                t.setupField(e)
            }).on("field:validated", function (e) {
                t.reflow(e)
            }).on("form:validated", function (e) {
                t.focus(e)
            }).on("field:reset", function (e) {
                t.reset(e)
            }).on("form:destroy", function (e) {
                t.destroy(e)
            }).on("field:destroy", function (e) {
                t.destroy(e)
            }), this
        },
        reflow: function (t) {
            if ("undefined" != typeof t._ui && !1 !== t._ui.active) {
                var e = this._diff(t.validationResult, t._ui.lastValidationResult);
                t._ui.lastValidationResult = t.validationResult, this.manageStatusClass(t), this.manageErrorsMessages(t, e), this.actualizeTriggers(t), (e.kept.length || e.added.length) && !0 !== t._ui.failedOnce && this.manageFailingFieldTrigger(t)
            }
        },
        getErrorsMessages: function (t) {
            if (!0 === t.validationResult) return [];
            for (var e = [], i = 0; i < t.validationResult.length; i++) e.push(t.validationResult[i].errorMessage || this._getErrorMessage(t, t.validationResult[i].assert));
            return e
        },
        manageStatusClass: function (t) {
            t.hasConstraints() && t.needsValidation() && !0 === t.validationResult ? this._successClass(t) : t.validationResult.length > 0 ? this._errorClass(t) : this._resetClass(t)
        },
        manageErrorsMessages: function (e, i) {
            if ("undefined" == typeof e.options.errorsMessagesDisabled) {
                if ("undefined" != typeof e.options.errorMessage) return i.added.length || i.kept.length ? (this._insertErrorWrapper(e), 0 === e._ui.$errorsWrapper.find(".parsley-custom-error-message").length && e._ui.$errorsWrapper.append(t(e.options.errorTemplate).addClass("parsley-custom-error-message")), e._ui.$errorsWrapper.addClass("filled").find(".parsley-custom-error-message").html(e.options.errorMessage)) : e._ui.$errorsWrapper.removeClass("filled").find(".parsley-custom-error-message").remove();
                for (var n = 0; n < i.removed.length; n++) this.removeError(e, i.removed[n].assert.name, !0);
                for (n = 0; n < i.added.length; n++) this.addError(e, i.added[n].assert.name, i.added[n].errorMessage, i.added[n].assert, !0);
                for (n = 0; n < i.kept.length; n++) this.updateError(e, i.kept[n].assert.name, i.kept[n].errorMessage, i.kept[n].assert, !0)
            }
        },
        addError: function (e, i, n, o, s) {
            this._insertErrorWrapper(e), e._ui.$errorsWrapper.addClass("filled").append(t(e.options.errorTemplate).addClass("parsley-" + i).html(n || this._getErrorMessage(e, o))), !0 !== s && this._errorClass(e)
        },
        updateError: function (t, e, i, n, o) {
            t._ui.$errorsWrapper.addClass("filled").find(".parsley-" + e).html(i || this._getErrorMessage(t, n)), !0 !== o && this._errorClass(t)
        },
        removeError: function (t, e, i) {
            t._ui.$errorsWrapper.removeClass("filled").find(".parsley-" + e).remove(), !0 !== i && this.manageStatusClass(t)
        },
        focus: function (t) {
            if (t._focusedField = null, !0 === t.validationResult || "none" === t.options.focus) return null;
            for (var e = 0; e < t.fields.length; e++) {
                var i = t.fields[e];
                if (!0 !== i.validationResult && i.validationResult.length > 0 && "undefined" == typeof i.options.noFocus && (t._focusedField = i.$element, "first" === t.options.focus)) break
            }
            return null === t._focusedField ? null : t._focusedField.focus()
        },
        _getErrorMessage: function (t, e) {
            var i = e.name + "Message";
            return "undefined" != typeof t.options[i] ? window.Parsley.formatMessage(t.options[i], e.requirements) : window.Parsley.getErrorMessage(e)
        },
        _diff: function (t, e, i) {
            for (var n = [], o = [], s = 0; s < t.length; s++) {
                for (var r = !1, a = 0; a < e.length; a++)
                    if (t[s].assert.name === e[a].assert.name) {
                        r = !0;
                        break
                    }
                r ? o.push(t[s]) : n.push(t[s])
            }
            return {
                kept: o,
                added: n,
                removed: i ? [] : this._diff(e, t, !0).added
            }
        },
        setupForm: function (t) {
            t.$element.on("submit.Parsley", function (e) {
                t.onSubmitValidate(e)
            }), t.$element.on("click.Parsley", 'input[type="submit"], button[type="submit"]', function (e) {
                t.onSubmitButton(e)
            }), !1 !== t.options.uiEnabled && t.$element.attr("novalidate", "")
        },
        setupField: function (e) {
            var i = {
                active: !1
            };
            !1 !== e.options.uiEnabled && (i.active = !0, e.$element.attr(e.options.namespace + "id", e.__id__), i.$errorClassHandler = this._manageClassHandler(e), i.errorsWrapperId = "parsley-id-" + (e.options.multiple ? "multiple-" + e.options.multiple : e.__id__), i.$errorsWrapper = t(e.options.errorsWrapper).attr("id", i.errorsWrapperId), i.lastValidationResult = [], i.validationInformationVisible = !1, e._ui = i, this.actualizeTriggers(e))
        },
        _manageClassHandler: function (e) {
            if ("string" == typeof e.options.classHandler && t(e.options.classHandler).length) return t(e.options.classHandler);
            var i = e.options.classHandler(e);
            return "undefined" != typeof i && i.length ? i : !e.options.multiple || e.$element.is("select") ? e.$element : e.$element.parent()
        },
        _insertErrorWrapper: function (e) {
            var i;
            if (0 !== e._ui.$errorsWrapper.parent().length) return e._ui.$errorsWrapper.parent();
            if ("string" == typeof e.options.errorsContainer) {
                if (t(e.options.errorsContainer).length) return t(e.options.errorsContainer).append(e._ui.$errorsWrapper);
                r.warn("The errors container `" + e.options.errorsContainer + "` does not exist in DOM")
            } else "function" == typeof e.options.errorsContainer && (i = e.options.errorsContainer(e));
            if ("undefined" != typeof i && i.length) return i.append(e._ui.$errorsWrapper);
            var n = e.$element;
            return e.options.multiple && (n = n.parent()), n.after(e._ui.$errorsWrapper)
        },
        actualizeTriggers: function (t) {
            var e = this,
                i = t._findRelated();
            if (i.off(".Parsley"), !1 !== t.options.trigger) {
                var n = t.options.trigger.replace(/^\s+/g, "").replace(/\s+$/g, "");
                "" !== n && i.on(n.split(" ").join(".Parsley ") + ".Parsley", function (i) {
                    e.eventValidate(t, i)
                })
            }
        },
        eventValidate: function (t, e) {
            /key/.test(e.type) && !t._ui.validationInformationVisible && t.getValue().length <= t.options.validationThreshold || t.validate()
        },
        manageFailingFieldTrigger: function (e) {
            return e._ui.failedOnce = !0, e.options.multiple && e._findRelated().each(function () {
                /change/i.test(t(this).parsley().options.trigger || "") || t(this).on("change.ParsleyFailedOnce", function () {
                    e.validate()
                })
            }), e.$element.is("select") && !/change/i.test(e.options.trigger || "") ? e.$element.on("change.ParsleyFailedOnce", function () {
                e.validate()
            }) : /keyup/i.test(e.options.trigger || "") ? void 0 : e.$element.on("keyup.ParsleyFailedOnce", function () {
                e.validate()
            })
        },
        reset: function (t) {
            this.actualizeTriggers(t), t.$element.off(".ParsleyFailedOnce"), "undefined" != typeof t._ui && "ParsleyForm" !== t.__class__ && (t._ui.$errorsWrapper.removeClass("filled").children().remove(), this._resetClass(t), t._ui.lastValidationResult = [], t._ui.validationInformationVisible = !1, t._ui.failedOnce = !1)
        },
        destroy: function (t) {
            this.reset(t), "ParsleyForm" !== t.__class__ && ("undefined" != typeof t._ui && t._ui.$errorsWrapper.remove(), delete t._ui)
        },
        _successClass: function (t) {
            t._ui.validationInformationVisible = !0, t._ui.$errorClassHandler.removeClass(t.options.errorClass).addClass(t.options.successClass)
        },
        _errorClass: function (t) {
            t._ui.validationInformationVisible = !0, t._ui.$errorClassHandler.removeClass(t.options.successClass).addClass(t.options.errorClass)
        },
        _resetClass: function (t) {
            t._ui.$errorClassHandler.removeClass(t.options.successClass).removeClass(t.options.errorClass)
        }
    };
    var y = function (e, i, n) {
        this.__class__ = "ParsleyForm", this.__id__ = r.generateID(), this.$element = t(e), this.domOptions = i, this.options = n, this.parent = window.Parsley, this.fields = [], this.validationResult = null
    },
        b = {
            pending: null,
            resolved: !0,
            rejected: !1
        };
    y.prototype = {
        onSubmitValidate: function (t) {
            var e = this;
            return !0 !== t.parsley ? (this._$submitSource = this._$submitSource || this.$element.find('input[type="submit"], button[type="submit"]').first(), this._$submitSource.is("[formnovalidate]") ? void (this._$submitSource = null) : (t.stopImmediatePropagation(), t.preventDefault(), this.whenValidate({
                event: t
            }).done(function () {
                e._submit()
            }).always(function () {
                e._$submitSource = null
            }), this)) : void 0
        },
        onSubmitButton: function (e) {
            this._$submitSource = t(e.target)
        },
        _submit: function () {
            !1 !== this._trigger("submit") && (this.$element.find(".parsley_synthetic_submit_button").remove(), this._$submitSource && t('<input class="parsley_synthetic_submit_button" type="hidden">').attr("name", this._$submitSource.attr("name")).attr("value", this._$submitSource.attr("value")).appendTo(this.$element), this.$element.trigger(t.extend(t.Event("submit"), {
                parsley: !0
            })))
        },
        validate: function (e) {
            if (arguments.length >= 1 && !t.isPlainObject(e)) {
                r.warnOnce("Calling validate on a parsley form without passing arguments as an object is deprecated.");
                var i = _slice.call(arguments),
                    n = i[0],
                    o = i[1],
                    s = i[2];
                e = {
                    group: n,
                    force: o,
                    event: s
                }
            }
            return b[this.whenValidate(e).state()]
        },
        whenValidate: function () {
            var e = this,
                i = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
                n = i.group,
                o = i.force,
                s = i.event;
            this.submitEvent = s, s && (this.submitEvent.preventDefault = function () {
                r.warnOnce("Using `this.submitEvent.preventDefault()` is deprecated; instead, call `this.validationResult = false`"), e.validationResult = !1
            }), this.validationResult = !0, this._trigger("validate"), this._refreshFields();
            var a = this._withoutReactualizingFormOptions(function () {
                return t.map(e.fields, function (t) {
                    return t.whenValidate({
                        force: o,
                        group: n
                    })
                })
            }),
                l = function () {
                    var i = t.Deferred();
                    return !1 === e.validationResult && i.reject(), i.resolve().promise()
                };
            return t.when.apply(t, _toConsumableArray(a)).done(function () {
                e._trigger("success")
            }).fail(function () {
                e.validationResult = !1, e._trigger("error")
            }).always(function () {
                e._trigger("validated")
            }).pipe(l, l)
        },
        isValid: function (e) {
            if (arguments.length >= 1 && !t.isPlainObject(e)) {
                r.warnOnce("Calling isValid on a parsley form without passing arguments as an object is deprecated.");
                var i = _slice.call(arguments),
                    n = i[0],
                    o = i[1];
                e = {
                    group: n,
                    force: o
                }
            }
            return b[this.whenValid(e).state()]
        },
        whenValid: function () {
            var e = this,
                i = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
                n = i.group,
                o = i.force;
            this._refreshFields();
            var s = this._withoutReactualizingFormOptions(function () {
                return t.map(e.fields, function (t) {
                    return t.whenValid({
                        group: n,
                        force: o
                    })
                })
            });
            return t.when.apply(t, _toConsumableArray(s))
        },
        _refreshFields: function () {
            return this.actualizeOptions()._bindFields()
        },
        _bindFields: function () {
            var e = this,
                i = this.fields;
            return this.fields = [], this.fieldsMappedById = {}, this._withoutReactualizingFormOptions(function () {
                e.$element.find(e.options.inputs).not(e.options.excluded).each(function (t, i) {
                    var n = new window.Parsley.Factory(i, {}, e);
                    "ParsleyField" !== n.__class__ && "ParsleyFieldMultiple" !== n.__class__ || !0 === n.options.excluded || "undefined" == typeof e.fieldsMappedById[n.__class__ + "-" + n.__id__] && (e.fieldsMappedById[n.__class__ + "-" + n.__id__] = n, e.fields.push(n))
                }), t(i).not(e.fields).each(function (t, e) {
                    e._trigger("reset")
                })
            }), this
        },
        _withoutReactualizingFormOptions: function (t) {
            var e = this.actualizeOptions;
            this.actualizeOptions = function () {
                return this
            };
            var i = t();
            return this.actualizeOptions = e, i
        },
        _trigger: function (t) {
            return this.trigger("form:" + t)
        }
    };
    var x = function (e, i, n, o, s) {
        if (!/ParsleyField/.test(e.__class__)) throw new Error("ParsleyField or ParsleyFieldMultiple instance expected");
        var r = window.Parsley._validatorRegistry.validators[i],
            a = new p(r);
        t.extend(this, {
            validator: a,
            name: i,
            requirements: n,
            priority: o || e.options[i + "Priority"] || a.priority,
            isDomConstraint: !0 === s
        }), this._parseRequirements(e.options)
    },
        w = function (t) {
            var e = t[0].toUpperCase();
            return e + t.slice(1)
        };
    x.prototype = {
        validate: function (t, e) {
            var i = this.requirementList.slice(0);
            return i.unshift(t), i.push(e), this.validator.validate.apply(this.validator, i)
        },
        _parseRequirements: function (t) {
            var e = this;
            this.requirementList = this.validator.parseRequirements(this.requirements, function (i) {
                return t[e.name + w(i)]
            })
        }
    };
    var k = function (e, i, n, o) {
        this.__class__ = "ParsleyField", this.__id__ = r.generateID(), this.$element = t(e), "undefined" != typeof o && (this.parent = o), this.options = n, this.domOptions = i, this.constraints = [], this.constraintsByName = {}, this.validationResult = [], this._bindConstraints()
    },
        _ = {
            pending: null,
            resolved: !0,
            rejected: !1
        };
    k.prototype = {
        validate: function (e) {
            arguments.length >= 1 && !t.isPlainObject(e) && (r.warnOnce("Calling validate on a parsley field without passing arguments as an object is deprecated."), e = {
                options: e
            });
            var i = this.whenValidate(e);
            if (!i) return !0;
            switch (i.state()) {
                case "pending":
                    return null;
                case "resolved":
                    return !0;
                case "rejected":
                    return this.validationResult
            }
        },
        whenValidate: function () {
            var t = this,
                e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
                i = e.force,
                n = e.group;
            return this.refreshConstraints(), !n || this._isInGroup(n) ? (this.value = this.getValue(), this._trigger("validate"), this.whenValid({
                force: i,
                value: this.value,
                _refreshed: !0
            }).done(function () {
                t._trigger("success")
            }).fail(function () {
                t._trigger("error")
            }).always(function () {
                t._trigger("validated")
            })) : void 0
        },
        hasConstraints: function () {
            return 0 !== this.constraints.length
        },
        needsValidation: function (t) {
            return "undefined" == typeof t && (t = this.getValue()), t.length || this._isRequired() || "undefined" != typeof this.options.validateIfEmpty ? !0 : !1
        },
        _isInGroup: function (e) {
            return t.isArray(this.options.group) ? -1 !== t.inArray(e, this.options.group) : this.options.group === e
        },
        isValid: function (e) {
            if (arguments.length >= 1 && !t.isPlainObject(e)) {
                r.warnOnce("Calling isValid on a parsley field without passing arguments as an object is deprecated.");
                var i = _slice.call(arguments),
                    n = i[0],
                    o = i[1];
                e = {
                    force: n,
                    value: o
                }
            }
            var s = this.whenValid(e);
            return s ? _[s.state()] : !0
        },
        whenValid: function () {
            var e = this,
                i = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
                n = i.force,
                o = void 0 === n ? !1 : n,
                s = i.value,
                r = i.group,
                a = i._refreshed;
            if (a || this.refreshConstraints(), !r || this._isInGroup(r)) {
                if (this.validationResult = !0, !this.hasConstraints()) return t.when();
                if (("undefined" == typeof s || null === s) && (s = this.getValue()), !this.needsValidation(s) && !0 !== o) return t.when();
                var l = this._getGroupedConstraints(),
                    c = [];
                return t.each(l, function (i, n) {
                    var o = t.when.apply(t, _toConsumableArray(t.map(n, function (t) {
                        return e._validateConstraint(s, t)
                    })));
                    return c.push(o), "rejected" === o.state() ? !1 : void 0
                }), t.when.apply(t, c)
            }
        },
        _validateConstraint: function (e, i) {
            var n = this,
                o = i.validate(e, this);
            return !1 === o && (o = t.Deferred().reject()), t.when(o).fail(function (t) {
                !0 === n.validationResult && (n.validationResult = []), n.validationResult.push({
                    assert: i,
                    errorMessage: "string" == typeof t && t
                })
            })
        },
        getValue: function () {
            var t;
            return t = "function" == typeof this.options.value ? this.options.value(this) : "undefined" != typeof this.options.value ? this.options.value : this.$element.val(), "undefined" == typeof t || null === t ? "" : this._handleWhitespace(t)
        },
        refreshConstraints: function () {
            return this.actualizeOptions()._bindConstraints()
        },
        addConstraint: function (t, e, i, n) {
            if (window.Parsley._validatorRegistry.validators[t]) {
                var o = new x(this, t, e, i, n);
                "undefined" !== this.constraintsByName[o.name] && this.removeConstraint(o.name), this.constraints.push(o), this.constraintsByName[o.name] = o
            }
            return this
        },
        removeConstraint: function (t) {
            for (var e = 0; e < this.constraints.length; e++)
                if (t === this.constraints[e].name) {
                    this.constraints.splice(e, 1);
                    break
                }
            return delete this.constraintsByName[t], this
        },
        updateConstraint: function (t, e, i) {
            return this.removeConstraint(t).addConstraint(t, e, i)
        },
        _bindConstraints: function () {
            for (var t = [], e = {}, i = 0; i < this.constraints.length; i++) !1 === this.constraints[i].isDomConstraint && (t.push(this.constraints[i]), e[this.constraints[i].name] = this.constraints[i]);
            this.constraints = t, this.constraintsByName = e;
            for (var n in this.options) this.addConstraint(n, this.options[n], void 0, !0);
            return this._bindHtml5Constraints()
        },
        _bindHtml5Constraints: function () {
            (this.$element.hasClass("required") || this.$element.attr("required")) && this.addConstraint("required", !0, void 0, !0), "string" == typeof this.$element.attr("pattern") && this.addConstraint("pattern", this.$element.attr("pattern"), void 0, !0), "undefined" != typeof this.$element.attr("min") && "undefined" != typeof this.$element.attr("max") ? this.addConstraint("range", [this.$element.attr("min"), this.$element.attr("max")], void 0, !0) : "undefined" != typeof this.$element.attr("min") ? this.addConstraint("min", this.$element.attr("min"), void 0, !0) : "undefined" != typeof this.$element.attr("max") && this.addConstraint("max", this.$element.attr("max"), void 0, !0), "undefined" != typeof this.$element.attr("minlength") && "undefined" != typeof this.$element.attr("maxlength") ? this.addConstraint("length", [this.$element.attr("minlength"), this.$element.attr("maxlength")], void 0, !0) : "undefined" != typeof this.$element.attr("minlength") ? this.addConstraint("minlength", this.$element.attr("minlength"), void 0, !0) : "undefined" != typeof this.$element.attr("maxlength") && this.addConstraint("maxlength", this.$element.attr("maxlength"), void 0, !0);
            var t = this.$element.attr("type");
            return "undefined" == typeof t ? this : "number" === t ? this.addConstraint("type", ["number", {
                step: this.$element.attr("step"),
                base: this.$element.attr("min") || this.$element.attr("value")
            }], void 0, !0) : /^(email|url|range)$/i.test(t) ? this.addConstraint("type", t, void 0, !0) : this
        },
        _isRequired: function () {
            return "undefined" == typeof this.constraintsByName.required ? !1 : !1 !== this.constraintsByName.required.requirements
        },
        _trigger: function (t) {
            return this.trigger("field:" + t)
        },
        _handleWhitespace: function (t) {
            return !0 === this.options.trimValue && r.warnOnce('data-parsley-trim-value="true" is deprecated, please use data-parsley-whitespace="trim"'), "squish" === this.options.whitespace && (t = t.replace(/\s{2,}/g, " ")), ("trim" === this.options.whitespace || "squish" === this.options.whitespace || !0 === this.options.trimValue) && (t = r.trimString(t)), t
        },
        _getGroupedConstraints: function () {
            if (!1 === this.options.priorityEnabled) return [this.constraints];
            for (var t = [], e = {}, i = 0; i < this.constraints.length; i++) {
                var n = this.constraints[i].priority;
                e[n] || t.push(e[n] = []), e[n].push(this.constraints[i])
            }
            return t.sort(function (t, e) {
                return e[0].priority - t[0].priority
            }), t
        }
    };
    var C = k,
        T = function () {
            this.__class__ = "ParsleyFieldMultiple"
        };
    T.prototype = {
        addElement: function (t) {
            return this.$elements.push(t), this
        },
        refreshConstraints: function () {
            var e;
            if (this.constraints = [], this.$element.is("select")) return this.actualizeOptions()._bindConstraints(), this;
            for (var i = 0; i < this.$elements.length; i++)
                if (t("html").has(this.$elements[i]).length) {
                    e = this.$elements[i].data("ParsleyFieldMultiple").refreshConstraints().constraints;
                    for (var n = 0; n < e.length; n++) this.addConstraint(e[n].name, e[n].requirements, e[n].priority, e[n].isDomConstraint)
                } else this.$elements.splice(i, 1);
            return this
        },
        getValue: function () {
            if ("function" == typeof this.options.value) value = this.options.value(this);
            else if ("undefined" != typeof this.options.value) return this.options.value;
            if (this.$element.is("input[type=radio]")) return this._findRelated().filter(":checked").val() || "";
            if (this.$element.is("input[type=checkbox]")) {
                var e = [];
                return this._findRelated().filter(":checked").each(function () {
                    e.push(t(this).val())
                }), e
            }
            return this.$element.is("select") && null === this.$element.val() ? [] : this.$element.val()
        },
        _init: function () {
            return this.$elements = [this.$element], this
        }
    };
    var $ = function (e, i, n) {
        this.$element = t(e);
        var o = this.$element.data("Parsley");
        if (o) return "undefined" != typeof n && o.parent === window.Parsley && (o.parent = n, o._resetOptions(o.options)), o;
        if (!this.$element.length) throw new Error("You must bind Parsley on an existing element.");
        if ("undefined" != typeof n && "ParsleyForm" !== n.__class__) throw new Error("Parent instance must be a ParsleyForm instance");
        return this.parent = n || window.Parsley, this.init(i)
    };
    $.prototype = {
        init: function (t) {
            return this.__class__ = "Parsley", this.__version__ = "@@version", this.__id__ = r.generateID(), this._resetOptions(t), this.$element.is("form") || r.checkAttr(this.$element, this.options.namespace, "validate") && !this.$element.is(this.options.inputs) ? this.bind("parsleyForm") : this.isMultiple() ? this.handleMultiple() : this.bind("parsleyField")
        },
        isMultiple: function () {
            return this.$element.is("input[type=radio], input[type=checkbox]") || this.$element.is("select") && "undefined" != typeof this.$element.attr("multiple")
        },
        handleMultiple: function () {
            var e, i, n = this;
            if (this.options.multiple || ("undefined" != typeof this.$element.attr("name") && this.$element.attr("name").length ? this.options.multiple = e = this.$element.attr("name") : "undefined" != typeof this.$element.attr("id") && this.$element.attr("id").length && (this.options.multiple = this.$element.attr("id"))), this.$element.is("select") && "undefined" != typeof this.$element.attr("multiple")) return this.options.multiple = this.options.multiple || this.__id__, this.bind("parsleyFieldMultiple");
            if (!this.options.multiple) return r.warn("To be bound by Parsley, a radio, a checkbox and a multiple select input must have either a name or a multiple option.", this.$element), this;
            this.options.multiple = this.options.multiple.replace(/(:|\.|\[|\]|\{|\}|\$)/g, ""), "undefined" != typeof e && t('input[name="' + e + '"]').each(function (e, i) {
                t(i).is("input[type=radio], input[type=checkbox]") && t(i).attr(n.options.namespace + "multiple", n.options.multiple)
            });
            for (var o = this._findRelated(), s = 0; s < o.length; s++)
                if (i = t(o.get(s)).data("Parsley"), "undefined" != typeof i) {
                    this.$element.data("ParsleyFieldMultiple") || i.addElement(this.$element);
                    break
                }
            return this.bind("parsleyField", !0), i || this.bind("parsleyFieldMultiple")
        },
        bind: function (e, i) {
            var n;
            switch (e) {
                case "parsleyForm":
                    n = t.extend(new y(this.$element, this.domOptions, this.options), window.ParsleyExtend)._bindFields();
                    break;
                case "parsleyField":
                    n = t.extend(new C(this.$element, this.domOptions, this.options, this.parent), window.ParsleyExtend);
                    break;
                case "parsleyFieldMultiple":
                    n = t.extend(new C(this.$element, this.domOptions, this.options, this.parent), new T, window.ParsleyExtend)._init();
                    break;
                default:
                    throw new Error(e + "is not a supported Parsley type")
            }
            return this.options.multiple && r.setAttr(this.$element, this.options.namespace, "multiple", this.options.multiple), "undefined" != typeof i ? (this.$element.data("ParsleyFieldMultiple", n), n) : (this.$element.data("Parsley", n), n._trigger("init"), n)
        }
    };
    var S = t.fn.jquery.split(".");
    if (parseInt(S[0]) <= 1 && parseInt(S[1]) < 8) throw "The loaded version of jQuery is too old. Please upgrade to 1.8.x or better.";
    S.forEach || r.warn("Parsley requires ES5 to run properly. Please include https://github.com/es-shims/es5-shim");
    var P = t.extend(new l, {
        $element: t(document),
        actualizeOptions: null,
        _resetOptions: null,
        Factory: $,
        version: "@@version"
    });
    t.extend(C.prototype, l.prototype), t.extend(y.prototype, l.prototype), t.extend($.prototype, l.prototype), t.fn.parsley = t.fn.psly = function (e) {
        if (this.length > 1) {
            var i = [];
            return this.each(function () {
                i.push(t(this).parsley(e))
            }), i
        }
        return t(this).length ? new $(this, e) : void r.warn("You must bind Parsley on an existing element.")
    }, "undefined" == typeof window.ParsleyExtend && (window.ParsleyExtend = {}), P.options = t.extend(r.objectCreate(a), window.ParsleyConfig), window.ParsleyConfig = P.options, window.Parsley = window.psly = P, window.ParsleyUtils = r;
    var M = window.Parsley._validatorRegistry = new f(window.ParsleyConfig.validators, window.ParsleyConfig.i18n);
    window.ParsleyValidator = {}, t.each("setLocale addCatalog addMessage addMessages getErrorMessage formatMessage addValidator updateValidator removeValidator".split(" "), function (e, i) {
        window.Parsley[i] = t.proxy(M, i), window.ParsleyValidator[i] = function () {
            var t;
            return r.warnOnce("Accessing the method '" + i + "' through ParsleyValidator is deprecated. Simply call 'window.Parsley." + i + "(...)'"), (t = window.Parsley)[i].apply(t, arguments)
        }
    }), window.ParsleyUI = "function" == typeof window.ParsleyConfig.ParsleyUI ? (new window.ParsleyConfig.ParsleyUI).listen() : (new v).listen(), !1 !== window.ParsleyConfig.autoBind && t(function () {
        t("[data-parsley-validate]").length && t("[data-parsley-validate]").parsley()
    });
    var A = t({}),
        E = function () {
            r.warnOnce("Parsley's pubsub module is deprecated; use the 'on' and 'off' methods on parsley instances or window.Parsley")
        },
        L = "parsley:";
    t.listen = function (t, n) {
        var o;
        if (E(), "object" == typeof arguments[1] && "function" == typeof arguments[2] && (o = arguments[1], n = arguments[2]), "function" != typeof n) throw new Error("Wrong parameters");
        window.Parsley.on(i(t), e(n, o))
    }, t.listenTo = function (t, n, o) {
        if (E(), !(t instanceof C || t instanceof y)) throw new Error("Must give Parsley instance");
        if ("string" != typeof n || "function" != typeof o) throw new Error("Wrong parameters");
        t.on(i(n), e(o))
    }, t.unsubscribe = function (t, e) {
        if (E(), "string" != typeof t || "function" != typeof e) throw new Error("Wrong arguments");
        window.Parsley.off(i(t), e.parsleyAdaptedCallback)
    }, t.unsubscribeTo = function (t, e) {
        if (E(), !(t instanceof C || t instanceof y)) throw new Error("Must give Parsley instance");
        t.off(i(e))
    }, t.unsubscribeAll = function (e) {
        E(), window.Parsley.off(i(e)), t("form,input,textarea,select").each(function () {
            var n = t(this).data("Parsley");
            n && n.off(i(e))
        })
    }, t.emit = function (t, e) {
        var n;
        E();
        var o = e instanceof C || e instanceof y,
            s = Array.prototype.slice.call(arguments, o ? 2 : 1);
        s.unshift(i(t)), o || (e = window.Parsley), (n = e).trigger.apply(n, _toConsumableArray(s))
    }, t.extend(!0, P, {
        asyncValidators: {
            "default": {
                fn: function (t) {
                    return t.status >= 200 && t.status < 300
                },
                url: !1
            },
            reverse: {
                fn: function (t) {
                    return t.status < 200 || t.status >= 300
                },
                url: !1
            }
        },
        addAsyncValidator: function (t, e, i, n) {
            return P.asyncValidators[t] = {
                fn: e,
                url: i || !1,
                options: n || {}
            }, this
        }
    }), P.addValidator("remote", {
        requirementType: {
            "": "string",
            validator: "string",
            reverse: "boolean",
            options: "object"
        },
        validateString: function (e, i, n, o) {
            var s, r, a = {},
                l = n.validator || (!0 === n.reverse ? "reverse" : "default");
            if ("undefined" == typeof P.asyncValidators[l]) throw new Error("Calling an undefined async validator: `" + l + "`");
            i = P.asyncValidators[l].url || i, i.indexOf("{value}") > -1 ? i = i.replace("{value}", encodeURIComponent(e)) : a[o.$element.attr("name") || o.$element.attr("id")] = e;
            var c = t.extend(!0, n.options || {}, P.asyncValidators[l].options);
            s = t.extend(!0, {}, {
                url: i,
                data: a,
                type: "GET"
            }, c), o.trigger("field:ajaxoptions", o, s), r = t.param(s), "undefined" == typeof P._remoteCache && (P._remoteCache = {});
            var d = P._remoteCache[r] = P._remoteCache[r] || t.ajax(s),
                h = function () {
                    var e = P.asyncValidators[l].fn.call(o, d, i, n);
                    return e || (e = t.Deferred().reject()), t.when(e)
                };
            return d.then(h, h)
        },
        priority: -1
    }), P.on("form:submit", function () {
        P._remoteCache = {}
    }), window.ParsleyExtend.addAsyncValidator = function () {
        return ParsleyUtils.warnOnce("Accessing the method `addAsyncValidator` through an instance is deprecated. Simply call `Parsley.addAsyncValidator(...)`"), P.addAsyncValidator.apply(P, arguments)
    }, P.addMessages("en", {
        defaultMessage: "This value seems to be invalid.",
        type: {
            email: "This value should be a valid email.",
            url: "This value should be a valid url.",
            number: "This value should be a valid number.",
            integer: "This value should be a valid integer.",
            digits: "This value should be digits.",
            alphanum: "This value should be alphanumeric."
        },
        notblank: "This value should not be blank.",
        required: "This value is required.",
        pattern: "This value seems to be invalid.",
        min: "This value should be greater than or equal to %s.",
        max: "This value should be lower than or equal to %s.",
        range: "This value should be between %s and %s.",
        minlength: "This value is too short. It should have %s characters or more.",
        maxlength: "This value is too long. It should have %s characters or fewer.",
        length: "This value length is invalid. It should be between %s and %s characters long.",
        mincheck: "You must select at least %s choices.",
        maxcheck: "You must select %s choices or fewer.",
        check: "You must select between %s and %s choices.",
        equalto: "This value should be the same."
    }), P.setLocale("en");
    var D = P;
    return D
}), define("form-validation", ["jquery", "parsley"], function (t) {
    "use strict";

    function e(t, e) {
        var i = "",
            n = "";
        for (var o in t) {
            var s = t[o],
                r = n + "" + i + s;
            r < parseInt(e) ? i += "" + s : (n = r % e, 0 == n && (n = ""), i = "")
        }
        return n += "" + i, "" == n && (n = 0), n
    }

    function i(t, e, i) {
        p[e] = i || !0, u || (u = window.setTimeout(function () {
            var e = t.val();
            p.numbers && (e = a(e)), p.currency && (e = c(e)), p.name && (e = h(e)), "number" == typeof p.truncate && (e = s(e, i)), t.val(e), n()
        }, 20))
    }

    function n() {
        p = [], u = null
    }

    function o(t, e) {
        t.val().length >= e && window.setTimeout(function () {
            t.val(t.val().substring(0, e))
        }, 5)
    }

    function s(t, e) {
        return t.length >= e ? t.substring(0, e) : t
    }

    function r(e) {
        var i = e.which,
            n = String.fromCharCode(i); - 1 !== t.inArray(i, [0, 8, 9, 13, 27, 190]) && !e.shiftKey || "a" === n && (e.ctrlKey || e.metaKey) && !e.shiftKey || "c" === n && (e.ctrlKey || e.metaKey) && !e.shiftKey || "v" === n && (e.ctrlKey || e.metaKey) && !e.shiftKey || "x" === n && (e.ctrlKey || e.metaKey) && !e.shiftKey || i >= 35 && 38 >= i && !e.shiftKey || /[0-9]/.test(n) || e.preventDefault()
    }

    function a(t) {
        return t.replace(/\D/g, "")
    }

    function l(e) {
        var i = t(e.target),
            n = e.which,
            o = i.val().indexOf(".") < 0 ? !0 : !1,
            s = String.fromCharCode(n);
        return -1 !== t.inArray(n, [0, 8, 9, 13, 27, 190]) && !e.shiftKey || "a" === s && (e.ctrlKey || e.metaKey) && !e.shiftKey || "c" === s && (e.ctrlKey || e.metaKey) && !e.shiftKey || "v" === s && (e.ctrlKey || e.metaKey) && !e.shiftKey || "x" === s && (e.ctrlKey || e.metaKey) && !e.shiftKey || n >= 35 && 38 >= n && !e.shiftKey || o && /[\.]/.test(s) || /[0-9]/.test(s) ? void window.setTimeout(function () {
            i.val().indexOf(".") >= 0 && i.val().split(".")[1] && i.val().split(".")[1].length > 2 && i.val(Math.floor(100 * parseFloat(i.val())) / 100)
        }, 10) : void e.preventDefault()
    }

    function c(t) {
        var e, i, n = t.replace(/[^0-9\.]+/g, "");
        return n = "." === n[0] ? "0" + n : n, e = n.split("."), i = e.length > 1 ? e[0] + "." + e[1] : e[0]
    }

    function d(e) {
        var i = e.which,
            n = String.fromCharCode(i); - 1 !== t.inArray(i, [0, 8, 9, 13, 27, 190]) && !e.shiftKey || "a" === n && (e.ctrlKey || e.metaKey) && !e.shiftKey || "c" === n && (e.ctrlKey || e.metaKey) && !e.shiftKey || "v" === n && (e.ctrlKey || e.metaKey) && !e.shiftKey || "x" === n && (e.ctrlKey || e.metaKey) && !e.shiftKey || i >= 35 && 38 >= i && !e.shiftKey || /[a-zA-Z\s'-]/.test(n) || e.preventDefault()
    }

    function h(t) {
        return t.replace(/[^a-zA-Z\s'-]+/g, "")
    }
    var u, p = [],
        f = "[ data-parsley-bpn ], [ data-parsley-mobile_number ], [ data-parsley-telephone_number ], [ data-parsley-verification_code ], [ data-parsley-account_number ], [ data-parsley-account_premise_number ], [ data-parsley-premise_number ], [ data-parsley-pobox ], [ data-parsley-grossfloorarea ], [ data-parsley-iban ], [ data-iban_confirm ], [ data-parsley-notification_number ], [ data-input-numbers ]",
        m = "[ data-parsley-currency ], [ data-parsley-contract_value ], [ data-parsley-contract-value ]";
    t("[ data-parsley-iban ], [ data-iban_confirm ]").on("paste", function (t) {
        t.preventDefault(), t.stopImmediatePropagation()
    }), t("[ data-parsley-rera_id ]").on("keypress.truncate", function () {
        o(t(this), 5)
    }), t("[ data-parsley-rera_id ]").on("paste.truncate", function () {
        i(t(this), "truncate", 5)
    }), t("[ data-parsley-verification_code ], [ data-parsley-pobox ], [ data-parsley-grossfloorarea ]").on("keypress.truncate", function () {
        o(t(this), 6)
    }), t("[ data-parsley-verification_code ], [ data-parsley-pobox ], [ data-parsley-grossfloorarea ]").on("paste.truncate", function () {
        i(t(this), "truncate", 6)
    }), t("[ data-parsley-telephone_number ]").on("keypress.truncate", function () {
        o(t(this), 8)
    }), t("[ data-parsley-telephone_number ]").on("paste.truncate", function () {
        i(t(this), "truncate", 8)
    }), t("[ data-parsley-bpn ]").on("keypress.truncate", function () {
        o(t(this), 8)
    }), t("[ data-parsley-bpn ]").on("paste.truncate", function () {
        i(t(this), "truncate", 8)
    }), t("[ data-parsley-premise_number ], [ data-parsley-notification_number ], [ data-parsley-estimate_number ], [ data-parsley-mobile_number ]").on("keypress.truncate", function () {
        o(t(this), 9)
    }), t("[ data-parsley-premise_number ], [ data-parsley-notification_number ], [ data-parsley-estimate_number ], [ data-parsley-mobile_number ]").on("paste.truncate", function () {
        i(t(this), "truncate", 9)
    }), t("[ data-parsley-account_number ], [ data-parsley-account_premise_number ]").on("keypress.truncate", function () {
        o(t(this), 10)
    }), t("[ data-parsley-account_number ], [ data-parsley-account_premise_number ]").on("paste.truncate", function () {
        i(t(this), "truncate", 10)
    }), t("[ data-parsley-emiratesid ]").on("keypress.truncate", function () {
        o(t(this), 15)
    }), t("[ data-parsley-emiratesid ]").on("paste.truncate", function () {
        i(t(this), "truncate", 15)
    }), t("[ data-parsley-iban ], [ data-iban_confirm ]").on("keypress.truncate", function () {
        o(t(this), 21)
    }), t("[ data-parsley-doc_number ]").on("keypress.truncate", function () {
        o(t(this), 35)
    }), t("[ data-parsley-doc_number ]").on("paste.truncate", function () {
        i(t(this), "truncate", 35)
    }), t("[ data-input-truncate ]").on("keypress.truncate", function () {
        var e = parseInt(t(this).data("input-truncate"), 10);
        o(t(this), e)
    }), t("[ data-input-truncate ]").on("paste.truncate", function () {
        var e = parseInt(t(this).data("input-truncate"), 10);
        i(t(this), "truncate", e)
    }), t("[ data-parsley-max_partial_payment ]").on("keyup", function () {
        try {
            t(this).val().indexOf(".") && t(this).val().split(".")[1].length > 2 && t(this).val(Math.floor(100 * parseFloat(t(this).val())) / 100)
        } catch (e) { }
    }), t("[ data-parsley-max_partial_payment ]").on("paste.truncate", function () {
        try {
            t(this).val().indexOf(".") && t(this).val().split(".")[1].length > 2 && t(this).val(Math.floor(100 * parseFloat(t(this).val())) / 100);
        } catch (e) { }
    }), t(f).on("keypress.numbers", r), t(f).on("paste.numbers", function () {
        i(t(this), "numbers")
    }), t(m).on("keypress.currency", l), t(m).on("paste.currency", function () {
        i(t(this), "currency")
    }), t("[ data-parsley-name ]").on("keypress.name", d), t("[ data-parsley-name ]").on("paste.name", function () {
        i(t(this), "name")
    });
    var g, v = function () {
        var i = "form-field__input--error",
            n = ".form-field__input-wrapper",
            o = "form-field__input-wrapper--error",
            s = "form-field__input-wrapper--validated";
        window.Parsley.addValidator("username", {
            requirementType: "string",
            validateString: function (t) {
                var e = new RegExp(/[^a-zA-Z0-9.@]/);
                return t.toString().length >= 6 && t.toString().length <= 75 && !e.test(t)
            }
        }), window.Parsley.addValidator("bpn", {
            requirementType: "integer",
            validateNumber: function (t) {
                return 8 === t.toString().length
            }
        }), window.Parsley.addValidator("estimate_number", {
            requirementType: "string",
            validateString: function (t) {
                return 9 === t.toString().length
            }
        }), window.Parsley.addValidator("doc_number", {
            requirementType: "string",
            validateString: function (t) {
                var e = new RegExp(/[^a-zA-Z0-9]/);
                return 35 === t.toString().length && !e.test(t)
            }
        }), window.Parsley.addValidator("account_number", {
            requirementType: "string",
            validateString: function (t) {
                return 10 === t.toString().length
            }
        }), window.Parsley.addValidator("account_premise_number", {
            requirementType: "string",
            validateString: function (t) {
                return t.toString().length >= 9 && t.toString().length <= 10
            }
        }), window.Parsley.addValidator("premise_number", {
            requirementType: "string",
            validateString: function (t) {
                return 9 === t.toString().length
            }
        }), window.Parsley.addValidator("notification_number", {
            requirementType: "string",
            validateString: function (t) {
                return 9 === t.toString().length
            }
        }), window.Parsley.addValidator("project_generation_subject", {
            requirementType: "string",
            validateString: function (t) {
                return t.toString().length > 0 && t.toString().length <= 125
            }
        }), window.Parsley.addValidator("contract_value", {
            requirementType: "integer",
            validateString: function (t) {
                return 999999999 >= t && t > 0
            }
        }), window.Parsley.addValidator("contract-value", {
            requirementType: "integer",
            validateString: function (t) {
                return 999999999 >= t && t > 0
            }
        }), window.Parsley.addValidator("pobox", {
            requirementType: "integer",
            validateString: function (t) {
                var e = t.toString().length;
                return 6 >= e
            }
        }), window.Parsley.addValidator("grossfloorarea", {
            requirementType: "integer",
            validateString: function (t) {
                var e = t.toString().length;
                return 6 >= e
            }
        }), window.Parsley.addValidator("verification_code", {
            requirementType: "string",
            validateString: function (t) {
                var e = new RegExp(/[^0-9]/);
                return 6 === t.toString().length && !e.test(t)
            }
        }), window.Parsley.addValidator("emiratesid", {
            requirementType: "integer",
            validateNumber: function (t) {
                return 15 === t.toString().length
            }
        }), window.Parsley.addValidator("rera_id", {
            requirementType: "string",
            validateString: function (t) {
                return t.toString().length > 5
            }
        }), window.Parsley.addValidator("iban", {
            requirementType: "string",
            validateString: function (t) {
                var i, n = "1014";
                return 21 === t.toString().length ? (n += t.slice(0, 2), i = t.substr(2) + n, "1" === e(i, 97)) : !1
            }
        }), window.Parsley.addValidator("year", {
            requirementType: "integer",
            validateNumber: function (t) {
                var e = new Date;
                return 4 === t.toString().length && t <= e.getFullYear()
            }
        }), window.Parsley.addValidator("max_partial_payment", {
            requirementType: "number",
            validateNumber: function (t, e) {
                return 2e5 + e >= t && t >= 0
            }
        }), window.Parsley.addValidator("password", {
            requirementType: "string",
            validateString: function (e, i) {
                var n = !0,
                    o = t(i)[0];
                return n = void 0 !== o && o.value === e ? !1 : null !== e.match(e.match(/^(?=.*\d)(?=.*[\D])[0-9\D]{8,}$/))
            }
        }), window.Parsley.addValidator("telephone_number", {
            requirementType: "string",
            validateString: function (t) {
                return null !== t.match(/^(?:2|3|4|6|7|9)\d{7}$/)
            }
        }), window.Parsley.addValidator("mobile_number", {
            requirementType: "string",
            validateString: function (t) {
                return null !== t.match(/^(?:50|51|52|53|54|55|56|57|58|59|52|54|55|56)\d{7}$/)
            }
        }), window.Parsley.addValidator("currency", {
            requirementType: "string",
            validateString: function (t) {
                return null !== t.match(/^\d*(\.\d{1,3})?$/)
            }
        }), window.Parsley.addValidator("name", {
            requirementType: "string",
            validateString: function (t) {
                return null !== t.match(/^[a-zA-Z\s'-]*$/)
            }
        }), window.Parsley.addValidator("billtotalmax", {
            requirementType: "string",
            validateString: function (t, e) {
                var i = parseFloat(t);
                return e >= i
            }
        }), window.Parsley.addValidator("billtotalmin", {
            requirementType: "string",
            validateString: function (t, e) {
                var i = parseFloat(t);
                return i > e
            }
        }), window.Parsley.on("form:validate", function (e) {
            if (!e.isValid())
                for (var i = 0; i < e.fields.length; i++)
                    if (e.fields[i].validationResult !== !0) {
                        window.navigator.userAgent.match(/iphone|ipad/i) && window.setTimeout(function () {
                            t("html,body").animate({
                                scrollTop: t(e.fields[i].$element[0]).offset().top
                            })
                        }, 0);
                        break
                    }
        }), window.Parsley.on("field:success", function () {
            var t = this.$element.attr("type"),
                e = void 0 === this.$element.attr("required") && 0 === this.$element.val().length;
            this.$element.attr("aria-invalid", !1), e ? (this.$element.removeClass(i), this.$element.parents(n).removeClass(o)) : "file" !== t && (this.$element.removeClass(i), this.$element.parents(n).removeClass(o).addClass(s))
        }), window.Parsley.on("field:error", function () {
            var t = this.$element.attr("type");
            this.$element.attr("aria-invalid", !0), "file" !== t && "checkbox" !== t && "radio" !== t && (this.$element.addClass(i), this.$element.parents(n).removeClass(s).addClass(o))
        })
    };
    return v.prototype.apply = function (e) {
        e.find("input[type=text], input[type=number], input[type=email], input[type=tel]").not("[data-el=datepicker]").attr("data-parsley-trigger", "focusout"), e.find("select").attr("data-parsley-trigger", "change"), e.parsley({
            excluded: "input.form-field__input--readonly, input[type=button], input[type=submit], input[type=reset], input[type=hidden], [disabled], :hidden"
        }), e.find("input[type=text], input[type=number], input[type=email], input[type=tel], select").on("keydown.submit", function (t) {
            var i = t.keyCode ? t.keyCode : t.which ? t.which : t.charCode;
            if (13 === i) {
                var n = e.find("[type=submit]");
                if (void 0 !== n[0]) return n.last().trigger("click"), !1
            }
        }), e.find("#form-field-user_id_type").on("change.emiratesid", function () {
            var e = t("#form-field-user_id_no"),
                n = t(this);
            "ED" === n.val() ? (o(e, 15), e.attr("data-parsley-emiratesid", !0), e.on("keypress.eid", function () {
                o(e, 15)
            }), e.on("paste.eid", function () {
                i(e, "truncate", 15)
            })) : (e.removeAttr("data-parsley-emiratesid"), e.off(".eid")), window.setTimeout(function () {
                (e.parsley().validationResult === !0 || "object" == typeof e.parsley().validationResult && e.parsley().validationResult.length) && e.parsley().validate()
            }, 10)
        })
    }, g = new v
}),
    function (t) {
        "function" == typeof define && define.amd ? define("picker", ["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : this.Picker = t(jQuery)
    }(function (t) {
        function e(s, r, l, u) {
            function p() {
                return e._.node("div", e._.node("div", e._.node("div", e._.node("div", S.component.nodes(k.open), C.box), C.wrap), C.frame), C.holder, 'tabindex="-1"')
            }

            function f() {
                T.data(r, S).addClass(C.input).val(T.data("value") ? S.get("select", _.format) : s.value), _.editable || T.on("focus." + k.id + " click." + k.id, function (t) {
                    t.preventDefault(), S.open()
                }).on("keydown." + k.id, x), o(s, {
                    haspopup: !0,
                    expanded: !1,
                    readonly: !1,
                    owns: s.id + "_root"
                })
            }

            function m() {
                o(S.$root[0], "hidden", !0)
            }

            function g() {
                S.$holder.on({
                    keydown: x,
                    "focus.toOpen": b,
                    blur: function () {
                        T.removeClass(C.target)
                    },
                    focusin: function (t) {
                        S.$root.removeClass(C.focused), t.stopPropagation()
                    },
                    "mousedown click": function (e) {
                        var i = e.target;
                        i != S.$holder[0] && (e.stopPropagation(), "mousedown" != e.type || t(i).is("input, select, textarea, button, option") || (e.preventDefault(), S.$holder[0].focus()))
                    }
                }).on("click", "[data-pick], [data-nav], [data-clear], [data-close]", function () {
                    var e = t(this),
                        i = e.data(),
                        n = e.hasClass(C.navDisabled) || e.hasClass(C.disabled),
                        o = a();
                    o = o && (o.type || o.href), (n || o && !t.contains(S.$root[0], o)) && S.$holder[0].focus(), !n && i.nav ? S.set("highlight", S.component.item.highlight, {
                        nav: i.nav
                    }) : !n && "pick" in i ? (S.set("select", i.pick), _.closeOnSelect && S.close(!0)) : i.clear ? (S.clear(), _.closeOnClear && S.close(!0)) : i.close && S.close(!0)
                })
            }

            function v() {
                var e;
                _.hiddenName === !0 ? (e = s.name, s.name = "") : (e = ["string" == typeof _.hiddenPrefix ? _.hiddenPrefix : "", "string" == typeof _.hiddenSuffix ? _.hiddenSuffix : "_submit"], e = e[0] + s.name + e[1]), S._hidden = t('<input type=hidden name="' + e + '"' + (T.data("value") || s.value ? ' value="' + S.get("select", _.formatSubmit) + '"' : "") + ">")[0], T.on("change." + k.id, function () {
                    S._hidden.value = s.value ? S.get("select", _.formatSubmit) : ""
                })
            }

            function y() {
                w && h ? S.$holder.find("." + C.frame).one("transitionend", function () {
                    S.$holder[0].focus()
                }) : S.$holder[0].focus()
            }

            function b(t) {
                t.stopPropagation(), T.addClass(C.target), S.$root.addClass(C.focused), S.open()
            }

            function x(t) {
                var e = t.keyCode,
                    i = /^(8|46)$/.test(e);
                return 27 == e ? (S.close(!0), !1) : void ((32 == e || i || !k.open && S.component.key[e]) && (t.preventDefault(), t.stopPropagation(), i ? S.clear().close() : S.open()))
            }
            if (!s) return e;
            var w = !1,
                k = {
                    id: s.id || "P" + Math.abs(~~(Math.random() * new Date))
                },
                _ = l ? t.extend(!0, {}, l.defaults, u) : u || {},
                C = t.extend({}, e.klasses(), _.klass),
                T = t(s),
                $ = function () {
                    return this.start()
                },
                S = $.prototype = {
                    constructor: $,
                    $node: T,
                    start: function () {
                        return k && k.start ? S : (k.methods = {}, k.start = !0, k.open = !1, k.type = s.type, s.autofocus = s == a(), s.readOnly = !_.editable, s.id = s.id || k.id, "text" != s.type && (s.type = "text"), S.component = new l(S, _), S.$root = t('<div class="' + C.picker + '" id="' + s.id + '_root" />'), m(), S.$holder = t(p()).appendTo(S.$root), g(), _.formatSubmit && v(), f(), _.containerHidden ? t(_.containerHidden).append(S._hidden) : T.after(S._hidden), _.container ? t(_.container).append(S.$root) : T.after(S.$root), S.on({
                            start: S.component.onStart,
                            render: S.component.onRender,
                            stop: S.component.onStop,
                            open: S.component.onOpen,
                            close: S.component.onClose,
                            set: S.component.onSet
                        }).on({
                            start: _.onStart,
                            render: _.onRender,
                            stop: _.onStop,
                            open: _.onOpen,
                            close: _.onClose,
                            set: _.onSet
                        }), w = i(S.$holder[0]), s.autofocus && S.open(), S.trigger("start").trigger("render"))
                    },
                    render: function (e) {
                        return e ? (S.$holder = t(p()), g(), S.$root.html(S.$holder)) : S.$root.find("." + C.box).html(S.component.nodes(k.open)), S.trigger("render")
                    },
                    stop: function () {
                        return k.start ? (S.close(), S._hidden && S._hidden.parentNode.removeChild(S._hidden), S.$root.remove(), T.removeClass(C.input).removeData(r), setTimeout(function () {
                            T.off("." + k.id)
                        }, 0), s.type = k.type, s.readOnly = !1, S.trigger("stop"), k.methods = {}, k.start = !1, S) : S
                    },
                    open: function (i) {
                        return k.open ? S : (T.addClass(C.active), o(s, "expanded", !0), setTimeout(function () {
                            S.$root.addClass(C.opened), o(S.$root[0], "hidden", !1)
                        }, 0), i !== !1 && (k.open = !0, w && d.css("overflow", "hidden").css("padding-right", "+=" + n()), y(), c.on("click." + k.id + " focusin." + k.id, function (t) {
                            var e = t.target;
                            e != s && e != document && 3 != t.which && S.close(e === S.$holder[0])
                        }).on("keydown." + k.id, function (i) {
                            var n = i.keyCode,
                                o = S.component.key[n],
                                s = i.target;
                            27 == n ? S.close(!0) : s != S.$holder[0] || !o && 13 != n ? t.contains(S.$root[0], s) && 13 == n && (i.preventDefault(), s.click()) : (i.preventDefault(), o ? e._.trigger(S.component.key.go, S, [e._.trigger(o)]) : S.$root.find("." + C.highlighted).hasClass(C.disabled) || (S.set("select", S.component.item.highlight), _.closeOnSelect && S.close(!0)))
                        })), S.trigger("open"))
                    },
                    close: function (t) {
                        return t && (_.editable ? s.focus() : (S.$holder.off("focus.toOpen").focus(), setTimeout(function () {
                            S.$holder.on("focus.toOpen", b)
                        }, 0))), T.removeClass(C.active), o(s, "expanded", !1), setTimeout(function () {
                            S.$root.removeClass(C.opened + " " + C.focused), o(S.$root[0], "hidden", !0)
                        }, 0), k.open ? (k.open = !1, w && d.css("overflow", "").css("padding-right", "-=" + n()), c.off("." + k.id), S.trigger("close")) : S
                    },
                    clear: function (t) {
                        return S.set("clear", null, t)
                    },
                    set: function (e, i, n) {
                        var o, s, r = t.isPlainObject(e),
                            a = r ? e : {};
                        if (n = r && t.isPlainObject(i) ? i : n || {}, e) {
                            r || (a[e] = i);
                            for (o in a) s = a[o], o in S.component.item && (void 0 === s && (s = null), S.component.set(o, s, n)), ("select" == o || "clear" == o) && T.val("clear" == o ? "" : S.get(o, _.format)).trigger("change");
                            S.render()
                        }
                        return n.muted ? S : S.trigger("set", a)
                    },
                    get: function (t, i) {
                        if (t = t || "value", null != k[t]) return k[t];
                        if ("valueSubmit" == t) {
                            if (S._hidden) return S._hidden.value;
                            t = "value"
                        }
                        if ("value" == t) return s.value;
                        if (t in S.component.item) {
                            if ("string" == typeof i) {
                                var n = S.component.get(t);
                                return n ? e._.trigger(S.component.formats.toString, S.component, [i, n]) : ""
                            }
                            return S.component.get(t)
                        }
                    },
                    on: function (e, i, n) {
                        var o, s, r = t.isPlainObject(e),
                            a = r ? e : {};
                        if (e) {
                            r || (a[e] = i);
                            for (o in a) s = a[o], n && (o = "_" + o), k.methods[o] = k.methods[o] || [], k.methods[o].push(s)
                        }
                        return S
                    },
                    off: function () {
                        var t, e, i = arguments;
                        for (t = 0, namesCount = i.length; t < namesCount; t += 1) e = i[t], e in k.methods && delete k.methods[e];
                        return S
                    },
                    trigger: function (t, i) {
                        var n = function (t) {
                            var n = k.methods[t];
                            n && n.map(function (t) {
                                e._.trigger(t, S, [i])
                            })
                        };
                        return n("_" + t), n(t), S
                    }
                };
            return new $
        }

        function i(t) {
            var e, i = "position";
            return t.currentStyle ? e = t.currentStyle[i] : window.getComputedStyle && (e = getComputedStyle(t)[i]), "fixed" == e
        }

        function n() {
            if (d.height() <= l.height()) return 0;
            var e = t('<div style="visibility:hidden;width:100px" />').appendTo("body"),
                i = e[0].offsetWidth;
            e.css("overflow", "scroll");
            var n = t('<div style="width:100%" />').appendTo(e),
                o = n[0].offsetWidth;
            return e.remove(), i - o
        }

        function o(e, i, n) {
            if (t.isPlainObject(i))
                for (var o in i) s(e, o, i[o]);
            else s(e, i, n)
        }

        function s(t, e, i) {
            t.setAttribute(("role" == e ? "" : "aria-") + e, i)
        }

        function r(e, i) {
            t.isPlainObject(e) || (e = {
                attribute: i
            }), i = "";
            for (var n in e) {
                var o = ("role" == n ? "" : "aria-") + n,
                    s = e[n];
                i += null == s ? "" : o + '="' + e[n] + '"'
            }
            return i
        }

        function a() {
            try {
                return document.activeElement
            } catch (t) { }
        }
        var l = t(window),
            c = t(document),
            d = t(document.documentElement),
            h = null != document.documentElement.style.transition;
        return e.klasses = function (t) {
            return t = t || "picker", {
                picker: t,
                opened: t + "--opened",
                focused: t + "--focused",
                input: t + "__input",
                active: t + "__input--active",
                target: t + "__input--target",
                holder: t + "__holder",
                frame: t + "__frame",
                wrap: t + "__wrap",
                box: t + "__box"
            }
        }, e._ = {
            group: function (t) {
                for (var i, n = "", o = e._.trigger(t.min, t); o <= e._.trigger(t.max, t, [o]); o += t.i) i = e._.trigger(t.item, t, [o]), n += e._.node(t.node, i[0], i[1], i[2]);
                return n
            },
            node: function (e, i, n, o) {
                return i ? (i = t.isArray(i) ? i.join("") : i, n = n ? ' class="' + n + '"' : "", o = o ? " " + o : "", "<" + e + n + o + ">" + i + "</" + e + ">") : ""
            },
            lead: function (t) {
                return (10 > t ? "0" : "") + t
            },
            trigger: function (t, e, i) {
                return "function" == typeof t ? t.apply(e, i || []) : t
            },
            digits: function (t) {
                return /\d/.test(t[1]) ? 2 : 1
            },
            isDate: function (t) {
                return {}.toString.call(t).indexOf("Date") > -1 && this.isInteger(t.getDate())
            },
            isInteger: function (t) {
                return {}.toString.call(t).indexOf("Number") > -1 && t % 1 === 0
            },
            ariaAttr: r
        }, e.extend = function (i, n) {
            t.fn[i] = function (o, s) {
                var r = this.data(i);
                return "picker" == o ? r : r && "string" == typeof o ? e._.trigger(r[o], r, [s]) : this.each(function () {
                    var s = t(this);
                    s.data(i) || new e(this, i, n, o)
                })
            }, t.fn[i].defaults = n.defaults
        }, e
    }),
    function (t) {
        "function" == typeof define && define.amd ? define("pickerdate", ["picker", "jquery"], t) : "object" == typeof exports ? module.exports = t(require("./picker.js"), require("jquery")) : t(Picker, jQuery)
    }(function (t, e) {
        function i(t, e) {
            var i = this,
                n = t.$node[0],
                o = n.value,
                s = t.$node.data("value"),
                r = s || o,
                a = s ? e.formatSubmit : e.format,
                l = function () {
                    return n.currentStyle ? "rtl" == n.currentStyle.direction : "rtl" == getComputedStyle(t.$root[0]).direction
                };
            i.settings = e, i.$node = t.$node, i.queue = {
                min: "measure create",
                max: "measure create",
                now: "now create",
                select: "parse create validate",
                highlight: "parse navigate create validate",
                view: "parse create validate viewset",
                disable: "deactivate",
                enable: "activate"
            }, i.item = {}, i.item.clear = null, i.item.disable = (e.disable || []).slice(0), i.item.enable = - function (t) {
                return t[0] === !0 ? t.shift() : -1
            }(i.item.disable), i.set("min", e.min).set("max", e.max).set("now"), r ? i.set("select", r, {
                format: a,
                defaultValue: !0
            }) : i.set("select", null).set("highlight", i.item.now), i.key = {
                40: 7,
                38: -7,
                39: function () {
                    return l() ? -1 : 1
                },
                37: function () {
                    return l() ? 1 : -1
                },
                go: function (t) {
                    var e = i.item.highlight,
                        n = new Date(e.year, e.month, e.date + t);
                    i.set("highlight", n, {
                        interval: t
                    }), this.render()
                }
            }, t.on("render", function () {
                t.$root.find("." + e.klass.selectMonth).on("change", function () {
                    var i = this.value;
                    i && (t.set("highlight", [t.get("view").year, i, t.get("highlight").date]), t.$root.find("." + e.klass.selectMonth).trigger("focus"))
                }), t.$root.find("." + e.klass.selectYear).on("change", function () {
                    var i = this.value;
                    i && (t.set("highlight", [i, t.get("view").month, t.get("highlight").date]), t.$root.find("." + e.klass.selectYear).trigger("focus"))
                })
            }, 1).on("open", function () {
                var n = "";
                i.disabled(i.get("now")) && (n = ":not(." + e.klass.buttonToday + ")"), t.$root.find("button" + n + ", select").attr("disabled", !1)
            }, 1).on("close", function () {
                t.$root.find("button, select").attr("disabled", !0)
            }, 1)
        }
        var n = 7,
            o = 6,
            s = t._;
        i.prototype.set = function (t, e, i) {
            var n = this,
                o = n.item;
            return null === e ? ("clear" == t && (t = "select"), o[t] = e, n) : (o["enable" == t ? "disable" : "flip" == t ? "enable" : t] = n.queue[t].split(" ").map(function (o) {
                return e = n[o](t, e, i)
            }).pop(), "select" == t ? n.set("highlight", o.select, i) : "highlight" == t ? n.set("view", o.highlight, i) : t.match(/^(flip|min|max|disable|enable)$/) && (o.select && n.disabled(o.select) && n.set("select", o.select, i), o.highlight && n.disabled(o.highlight) && n.set("highlight", o.highlight, i)), n)
        }, i.prototype.get = function (t) {
            return this.item[t]
        }, i.prototype.create = function (t, i, n) {
            var o, r = this;
            return i = void 0 === i ? t : i, i == -(1 / 0) || i == 1 / 0 ? o = i : e.isPlainObject(i) && s.isInteger(i.pick) ? i = i.obj : e.isArray(i) ? (i = new Date(i[0], i[1], i[2]), i = s.isDate(i) ? i : r.create().obj) : i = s.isInteger(i) || s.isDate(i) ? r.normalize(new Date(i), n) : r.now(t, i, n), {
                year: o || i.getFullYear(),
                month: o || i.getMonth(),
                date: o || i.getDate(),
                day: o || i.getDay(),
                obj: o || i,
                pick: o || i.getTime()
            }
        }, i.prototype.createRange = function (t, i) {
            var n = this,
                o = function (t) {
                    return t === !0 || e.isArray(t) || s.isDate(t) ? n.create(t) : t
                };
            return s.isInteger(t) || (t = o(t)), s.isInteger(i) || (i = o(i)), s.isInteger(t) && e.isPlainObject(i) ? t = [i.year, i.month, i.date + t] : s.isInteger(i) && e.isPlainObject(t) && (i = [t.year, t.month, t.date + i]), {
                from: o(t),
                to: o(i)
            }
        }, i.prototype.withinRange = function (t, e) {
            return t = this.createRange(t.from, t.to), e.pick >= t.from.pick && e.pick <= t.to.pick
        }, i.prototype.overlapRanges = function (t, e) {
            var i = this;
            return t = i.createRange(t.from, t.to), e = i.createRange(e.from, e.to), i.withinRange(t, e.from) || i.withinRange(t, e.to) || i.withinRange(e, t.from) || i.withinRange(e, t.to)
        }, i.prototype.now = function (t, e, i) {
            return e = new Date, i && i.rel && e.setDate(e.getDate() + i.rel), this.normalize(e, i)
        }, i.prototype.navigate = function (t, i, n) {
            var o, s, r, a, l = e.isArray(i),
                c = e.isPlainObject(i),
                d = this.item.view;
            if (l || c) {
                for (c ? (s = i.year, r = i.month, a = i.date) : (s = +i[0], r = +i[1], a = +i[2]), n && n.nav && d && d.month !== r && (s = d.year, r = d.month), o = new Date(s, r + (n && n.nav ? n.nav : 0), 1), s = o.getFullYear(), r = o.getMonth(); new Date(s, r, a).getMonth() !== r;) a -= 1;
                i = [s, r, a]
            }
            return i
        }, i.prototype.normalize = function (t) {
            return t.setHours(0, 0, 0, 0), t
        }, i.prototype.measure = function (t, e) {
            var i = this;
            return e ? "string" == typeof e ? e = i.parse(t, e) : s.isInteger(e) && (e = i.now(t, e, {
                rel: e
            })) : e = "min" == t ? -(1 / 0) : 1 / 0, e
        }, i.prototype.viewset = function (t, e) {
            return this.create([e.year, e.month, 1])
        }, i.prototype.validate = function (t, i, n) {
            var o, r, a, l, c = this,
                d = i,
                h = n && n.interval ? n.interval : 1,
                u = -1 === c.item.enable,
                p = c.item.min,
                f = c.item.max,
                m = u && c.item.disable.filter(function (t) {
                    if (e.isArray(t)) {
                        var n = c.create(t).pick;
                        n < i.pick ? o = !0 : n > i.pick && (r = !0)
                    }
                    return s.isInteger(t)
                }).length;
            if ((!n || !n.nav && !n.defaultValue) && (!u && c.disabled(i) || u && c.disabled(i) && (m || o || r) || !u && (i.pick <= p.pick || i.pick >= f.pick)))
                for (u && !m && (!r && h > 0 || !o && 0 > h) && (h *= -1); c.disabled(i) && (Math.abs(h) > 1 && (i.month < d.month || i.month > d.month) && (i = d, h = h > 0 ? 1 : -1), i.pick <= p.pick ? (a = !0, h = 1, i = c.create([p.year, p.month, p.date + (i.pick === p.pick ? 0 : -1)])) : i.pick >= f.pick && (l = !0, h = -1, i = c.create([f.year, f.month, f.date + (i.pick === f.pick ? 0 : 1)])), !a || !l);) i = c.create([i.year, i.month, i.date + h]);
            return i
        }, i.prototype.disabled = function (t) {
            var i = this,
                n = i.item.disable.filter(function (n) {
                    return s.isInteger(n) ? t.day === (i.settings.firstDay ? n : n - 1) % 7 : e.isArray(n) || s.isDate(n) ? t.pick === i.create(n).pick : e.isPlainObject(n) ? i.withinRange(n, t) : void 0
                });
            return n = n.length && !n.filter(function (t) {
                return e.isArray(t) && "inverted" == t[3] || e.isPlainObject(t) && t.inverted
            }).length, -1 === i.item.enable ? !n : n || t.pick < i.item.min.pick || t.pick > i.item.max.pick
        }, i.prototype.parse = function (t, e, i) {
            var n = this,
                o = {};
            return e && "string" == typeof e ? (i && i.format || (i = i || {}, i.format = n.settings.format), n.formats.toArray(i.format).map(function (t) {
                var i = n.formats[t],
                    r = i ? s.trigger(i, n, [e, o]) : t.replace(/^!/, "").length;
                i && (o[t] = e.substr(0, r)), e = e.substr(r)
            }), [o.yyyy || o.yy, +(o.mm || o.m) - 1, o.dd || o.d]) : e
        }, i.prototype.formats = function () {
            function t(t, e, i) {
                var n = t.match(/[^\x00-\x7F]+|\w+/)[0];
                return i.mm || i.m || (i.m = e.indexOf(n) + 1), n.length
            }

            function e(t) {
                return t.match(/\w+/)[0].length
            }
            return {
                d: function (t, e) {
                    return t ? s.digits(t) : e.date
                },
                dd: function (t, e) {
                    return t ? 2 : s.lead(e.date)
                },
                ddd: function (t, i) {
                    return t ? e(t) : this.settings.weekdaysShort[i.day]
                },
                dddd: function (t, i) {
                    return t ? e(t) : this.settings.weekdaysFull[i.day]
                },
                m: function (t, e) {
                    return t ? s.digits(t) : e.month + 1
                },
                mm: function (t, e) {
                    return t ? 2 : s.lead(e.month + 1)
                },
                mmm: function (e, i) {
                    var n = this.settings.monthsShort;
                    return e ? t(e, n, i) : n[i.month]
                },
                mmmm: function (e, i) {
                    var n = this.settings.monthsFull;
                    return e ? t(e, n, i) : n[i.month]
                },
                yy: function (t, e) {
                    return t ? 2 : ("" + e.year).slice(2)
                },
                yyyy: function (t, e) {
                    return t ? 4 : e.year
                },
                toArray: function (t) {
                    return t.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g)
                },
                toString: function (t, e) {
                    var i = this;
                    return i.formats.toArray(t).map(function (t) {
                        return s.trigger(i.formats[t], i, [0, e]) || t.replace(/^!/, "")
                    }).join("")
                }
            }
        }(), i.prototype.isDateExact = function (t, i) {
            var n = this;
            return s.isInteger(t) && s.isInteger(i) || "boolean" == typeof t && "boolean" == typeof i ? t === i : (s.isDate(t) || e.isArray(t)) && (s.isDate(i) || e.isArray(i)) ? n.create(t).pick === n.create(i).pick : e.isPlainObject(t) && e.isPlainObject(i) ? n.isDateExact(t.from, i.from) && n.isDateExact(t.to, i.to) : !1
        }, i.prototype.isDateOverlap = function (t, i) {
            var n = this,
                o = n.settings.firstDay ? 1 : 0;
            return s.isInteger(t) && (s.isDate(i) || e.isArray(i)) ? (t = t % 7 + o, t === n.create(i).day + 1) : s.isInteger(i) && (s.isDate(t) || e.isArray(t)) ? (i = i % 7 + o, i === n.create(t).day + 1) : e.isPlainObject(t) && e.isPlainObject(i) ? n.overlapRanges(t, i) : !1
        }, i.prototype.flipEnable = function (t) {
            var e = this.item;
            e.enable = t || (-1 == e.enable ? 1 : -1)
        }, i.prototype.deactivate = function (t, i) {
            var n = this,
                o = n.item.disable.slice(0);
            return "flip" == i ? n.flipEnable() : i === !1 ? (n.flipEnable(1), o = []) : i === !0 ? (n.flipEnable(-1), o = []) : i.map(function (t) {
                for (var i, r = 0; r < o.length; r += 1)
                    if (n.isDateExact(t, o[r])) {
                        i = !0;
                        break
                    }
                i || (s.isInteger(t) || s.isDate(t) || e.isArray(t) || e.isPlainObject(t) && t.from && t.to) && o.push(t)
            }), o
        }, i.prototype.activate = function (t, i) {
            var n = this,
                o = n.item.disable,
                r = o.length;
            return "flip" == i ? n.flipEnable() : i === !0 ? (n.flipEnable(1), o = []) : i === !1 ? (n.flipEnable(-1), o = []) : i.map(function (t) {
                var i, a, l, c;
                for (l = 0; r > l; l += 1) {
                    if (a = o[l], n.isDateExact(a, t)) {
                        i = o[l] = null, c = !0;
                        break
                    }
                    if (n.isDateOverlap(a, t)) {
                        e.isPlainObject(t) ? (t.inverted = !0, i = t) : e.isArray(t) ? (i = t, i[3] || i.push("inverted")) : s.isDate(t) && (i = [t.getFullYear(), t.getMonth(), t.getDate(), "inverted"]);
                        break
                    }
                }
                if (i)
                    for (l = 0; r > l; l += 1)
                        if (n.isDateExact(o[l], t)) {
                            o[l] = null;
                            break
                        }
                if (c)
                    for (l = 0; r > l; l += 1)
                        if (n.isDateOverlap(o[l], t)) {
                            o[l] = null;
                            break
                        }
                i && o.push(i)
            }), o.filter(function (t) {
                return null != t
            })
        }, i.prototype.nodes = function (t) {
            var e = this,
                i = e.settings,
                r = e.item,
                a = r.now,
                l = r.select,
                c = r.highlight,
                d = r.view,
                h = r.disable,
                u = r.min,
                p = r.max,
                f = function (t, e) {
                    return i.firstDay && (t.push(t.shift()), e.push(e.shift())), s.node("thead", s.node("tr", s.group({
                        min: 0,
                        max: n - 1,
                        i: 1,
                        node: "th",
                        item: function (n) {
                            return [t[n], i.klass.weekdays, 'scope=col title="' + e[n] + '"']
                        }
                    })))
                }((i.showWeekdaysFull ? i.weekdaysFull : i.weekdaysShort).slice(0), i.weekdaysFull.slice(0)),
                m = function (t) {
                    return s.node("div", " ", i.klass["nav" + (t ? "Next" : "Prev")] + (t && d.year >= p.year && d.month >= p.month || !t && d.year <= u.year && d.month <= u.month ? " " + i.klass.navDisabled : ""), "data-nav=" + (t || -1) + " " + s.ariaAttr({
                        role: "button",
                        controls: e.$node[0].id + "_table"
                    }) + ' title="' + (t ? i.labelMonthNext : i.labelMonthPrev) + '"')
                },
                g = function () {
                    var n = i.showMonthsShort ? i.monthsShort : i.monthsFull;
                    return i.selectMonths ? s.node("select", s.group({
                        min: 0,
                        max: 11,
                        i: 1,
                        node: "option",
                        item: function (t) {
                            return [n[t], 0, "value=" + t + (d.month == t ? " selected" : "") + (d.year == u.year && t < u.month || d.year == p.year && t > p.month ? " disabled" : "")]
                        }
                    }), i.klass.selectMonth, (t ? "" : "disabled") + " " + s.ariaAttr({
                        controls: e.$node[0].id + "_table"
                    }) + ' title="' + i.labelMonthSelect + '"') : s.node("div", n[d.month], i.klass.month)
                },
                v = function () {
                    var n = d.year,
                        o = i.selectYears === !0 ? 5 : ~~(i.selectYears / 2);
                    if (o) {
                        var r = u.year,
                            a = p.year,
                            l = n - o,
                            c = n + o;
                        if (r > l && (c += r - l, l = r), c > a) {
                            var h = l - r,
                                f = c - a;
                            l -= h > f ? f : h, c = a
                        }
                        return s.node("select", s.group({
                            min: l,
                            max: c,
                            i: 1,
                            node: "option",
                            item: function (t) {
                                return [t, 0, "value=" + t + (n == t ? " selected" : "")]
                            }
                        }), i.klass.selectYear, (t ? "" : "disabled") + " " + s.ariaAttr({
                            controls: e.$node[0].id + "_table"
                        }) + ' title="' + i.labelYearSelect + '"')
                    }
                    return s.node("div", n, i.klass.year)
                };
            return s.node("div", (i.selectYears ? v() + g() : g() + v()) + m() + m(1), i.klass.header) + s.node("table", f + s.node("tbody", s.group({
                min: 0,
                max: o - 1,
                i: 1,
                node: "tr",
                item: function (t) {
                    var o = i.firstDay && 0 === e.create([d.year, d.month, 1]).day ? -7 : 0;
                    return [s.group({
                        min: n * t - d.day + o + 1,
                        max: function () {
                            return this.min + n - 1
                        },
                        i: 1,
                        node: "td",
                        item: function (t) {
                            t = e.create([d.year, d.month, t + (i.firstDay ? 1 : 0)]);
                            var n = l && l.pick == t.pick,
                                o = c && c.pick == t.pick,
                                r = h && e.disabled(t) || t.pick < u.pick || t.pick > p.pick,
                                f = s.trigger(e.formats.toString, e, [i.format, t]);
                            return [s.node("div", t.date, function (e) {
                                return e.push(d.month == t.month ? i.klass.infocus : i.klass.outfocus), a.pick == t.pick && e.push(i.klass.now), n && e.push(i.klass.selected), o && e.push(i.klass.highlighted), r && e.push(i.klass.disabled), e.join(" ")
                            }([i.klass.day]), "data-pick=" + t.pick + " " + s.ariaAttr({
                                role: "gridcell",
                                label: f,
                                selected: n && e.$node.val() === f ? !0 : null,
                                activedescendant: o ? !0 : null,
                                disabled: r ? !0 : null
                            })), "", s.ariaAttr({
                                role: "presentation"
                            })]
                        }
                    })]
                }
            })), i.klass.table, 'id="' + e.$node[0].id + '_table" ' + s.ariaAttr({
                role: "grid",
                controls: e.$node[0].id,
                readonly: !0
            })) + s.node("div", s.node("button", i.today, i.klass.buttonToday, "type=button data-pick=" + a.pick + (t && !e.disabled(a) ? "" : " disabled") + " " + s.ariaAttr({
                controls: e.$node[0].id
            })) + s.node("button", i.clear, i.klass.buttonClear, "type=button data-clear=1" + (t ? "" : " disabled") + " " + s.ariaAttr({
                controls: e.$node[0].id
            })) + s.node("button", i.close, i.klass.buttonClose, "type=button data-close=true " + (t ? "" : " disabled") + " " + s.ariaAttr({
                controls: e.$node[0].id
            })), i.klass.footer)
        }, i.defaults = function (t) {
            return {
                labelMonthNext: "Next month",
                labelMonthPrev: "Previous month",
                labelMonthSelect: "Select a month",
                labelYearSelect: "Select a year",
                monthsFull: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                weekdaysFull: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                today: "Today",
                clear: "Clear",
                close: "Close",
                closeOnSelect: !0,
                closeOnClear: !0,
                format: "d mmmm, yyyy",
                klass: {
                    table: t + "table",
                    header: t + "header",
                    navPrev: t + "nav--prev",
                    navNext: t + "nav--next",
                    navDisabled: t + "nav--disabled",
                    month: t + "month",
                    year: t + "year",
                    selectMonth: t + "select--month",
                    selectYear: t + "select--year",
                    weekdays: t + "weekday",
                    day: t + "day",
                    disabled: t + "day--disabled",
                    selected: t + "day--selected",
                    highlighted: t + "day--highlighted",
                    now: t + "day--today",
                    infocus: t + "day--infocus",
                    outfocus: t + "day--outfocus",
                    footer: t + "footer",
                    buttonClear: t + "button--clear",
                    buttonToday: t + "button--today",
                    buttonClose: t + "button--close"
                }
            }
        }(t.klasses().picker + "__"), t.extend("pickadate", i)
    }), define("form", ["jquery", "lib/utils", "form-validation", "pickerdate"], function (t, e, i) {
        "use strict";
        var n = function (t) {
            this.$form = t
        };
        return n.prototype.init = function () {
            var n, o, s, r = this,
                a = this.$form.find("[ data-textarea ]"),
                l = this.$form.find('[ data-el="datepicker-future" ]'),
                c = this.$form.find('[ data-el="datepicker" ]'),
                d = this.$form.find('[data-el="datepicker-wffm" ]'),
                h = this.$form.find("[ data-uploader-field ]"),
                u = this.$form.find("[ data-uploader-remove ]"),
                p = this.$form.find("[ data-checkbox-toggle ]"),
                f = this.$form.find("[ data-checkbox-terms ]"),
                m = {
                    closeOnSelect: !0,
                    format: "d mmmm yyyy",
                    formatSubmit: "d mmmm yyyy",
                    onStart: function () {
                        var t, e = this.$node;
                        e.data("initial-date") && (t = new Date(e.data("initial-date")), this.set("select", [t.getFullYear(), t.getMonth(), t.getDate()]))
                    },
                    onOpen: function () {
                        r.scrollIntoView(this.$node)
                    },
                    onClose: function () {
                        this.component.$node.parsley().validate()
                    }
                };
            e.isRTL() && (m.monthsFull = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"], m.monthsShort = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], m.weekdaysShort = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"], m.today = "اليوم", m.clear = "مسح", m.close = "مغلق", m.labelMonthNext = "الشهر القادم", m.labelMonthPrev = "الشهر السابق", m.labelMonthSelect = "اختر الشهر", m.labelYearSelect = "اختر السنة", m.format = "d mmmm yyyy", m.formatSubmit = "d mmm yyyy"), this.$form.parents("[ data-wffm ]").length > 0 ? d.each(function (i, a) {
                n = t(a).find("input"), e.isTouchDevice() === !1 || e.isDevice() === !1 ? (s = e.uniqueID(), n.parents(".field-border").attr("id", s), s = "#" + s, o = n.data("picker-options"), "string" == typeof o ? o = JSON.parse(o) : "object" != typeof o && (o = {}), n.pickadate(t.extend(!0, {
                    container: s
                }, o, m)), n.data("ref") && n.on("change", r.setConstraints), n.after('<span data-clicker="' + s + '" class="form-field__datepicker-icon-clicker"></span>')) : (n.attr("type", "date"), n.data("ref") && n.on("change", r.setConstraintsMobile))
            }) : ("true" != this.$form.attr("form-skipvalidation") && i.apply(this.$form), a.each(function (t, e) {
                r.countTextChars(e)
            }), a.on("keyup", function () {
                r.countTextChars(this)
            }), c.each(function (i, a) {
                n = t(a), e.isTouchDevice() === !1 || e.isDevice() === !1 ? (o = n.data("picker-options"), s = "#" + n.parents(".form-field").attr("id"), "string" == typeof o ? o = JSON.parse(o) : "object" != typeof o && (o = {}), n.pickadate(t.extend(!0, o, m)), n.data("ref") && n.on("change", r.setConstraints), n.after('<span data-clicker="' + s + '" class="form-field__datepicker-icon-clicker"></span>')) : (n.attr("type", "date"), n.data("ref") && n.on("change", r.setConstraintsMobile))
            }), l.each(function (i, a) {
                n = t(a), e.isTouchDevice() === !1 || e.isDevice() === !1 ? (o = n.data("picker-options"), s = "#" + n.parents(".form-field").attr("id"), "string" == typeof o ? o = JSON.parse(o) : "object" != typeof o && (o = {}), n.pickadate(t.extend(!0, {
                    container: s,
                    min: new Date
                }, o, m)), n.data("ref") && n.on("change", r.setConstraints), n.after('<span data-clicker="' + s + '" class="form-field__datepicker-icon-clicker"></span>')) : (n.attr("type", "date"), n.data("ref") && n.on("change", r.setConstraintsMobile))
            }), h.on("change", function () {
                r.previewUploadedImage(this), t(this).parsley().validate()
            }), h.each(function (e, i) {
                var n = t(i)[0];
                n.files && n.files[0] && r.previewUploadedImage(i)
            }), u.on("click", function (t) {
                t.preventDefault(), r.removeUploadedImage(this)
            }), p.on("click", function () {
                r.toggleFieldset(t(this))
            }), t.each(f, function () {
                var e = t(this).find("input"),
                    i = t(this).find("a"),
                    n = t("[data-content=terms_checkbox]"),
                    o = n.find("[data-modal-confirm]"),
                    s = n.find("[data-close]");
                i.on("click", function (t) {
                    t.preventDefault()
                }), o.on("click", function (t) {
                    t.preventDefault(), e.prop("checked", !0), s.trigger("click")
                })
            })), t("[ data-clicker ]").on("click", function () {
                t(this).siblings('[ data-el="datepicker" ]').click()
            })
        }, n.prototype.setConstraints = function () {
            var e = t(this),
                i = e.data("ref"),
                n = e.pickadate("picker").get("select"),
                o = t('[data-mindate="' + i + '"]'),
                s = t('[data-maxdate="' + i + '"]');
            n = n ? n.pick : !1, o.each(function (e, i) {
                var o = t(i),
                    s = o.pickadate("picker").get("select"),
                    r = 864e5 * parseInt(o.data("mindate-offset"), 10),
                    a = n ? n + r : !1,
                    l = {
                        min: new Date(a)
                    };
                s && a && (l.select = s && s.pick < a ? a : s.pick), o.pickadate("picker").set(l)
            }), s.each(function (e, i) {
                var o = t(i),
                    s = o.pickadate("picker").get("select"),
                    r = 864e5 * parseInt(o.data("maxdate-offset"), 10),
                    a = n ? n + r : !1,
                    l = {
                        max: new Date(a)
                    };
                s && a && (l.select = s && s.pick > a ? a : s.pick), o.pickadate("picker").set(l)
            })
        }, n.prototype.setConstraintsMobile = function () {
            var e = t(this),
                i = e.data("ref"),
                n = e.val(),
                o = t('[data-mindate="' + i + '"]'),
                s = t('[data-maxdate="' + i + '"]');
            o.prop("min", n), s.prop("max", n)
        }, n.prototype.countTextChars = function (e) {
            var i = t(e),
                n = t('[ data-charcount="' + i.data("textarea") + '" ]');
            n.text(i.val().length)
        }, n.prototype.scrollIntoView = function (e) {
            t("html, body").animate({
                scrollTop: ~~e.offset().top - 60
            })
        }, n.prototype.previewUploadedImage = function (e) {
            var i = t(e),
                n = i.closest(".form-field--upload"),
                o = i.data("uploader-field"),
                s = n.find('[ data-uploader-remove="' + o + '" ]');
            if (e.files && e.files[0]) {
                var r, a = !1,
                    l = e.files[0].name,
                    c = n.find('[ data-uploader-image="' + o + '" ]'),
                    d = n.find('[ data-uploader-filename="' + o + '" ]');
                window.FileReader && window.Blob && /image/i.test(e.files[0].type) && (r = new FileReader, r.onload = function (t) {
                    c.attr("src", t.target.result)
                }, r.readAsDataURL(e.files[0]), a = !0), a === !1 && c.attr("src", c.data("success")), d.text(l).fadeIn(), s.fadeIn()
            } else this.removeUploadedImage(s[0])
        }, n.prototype.removeUploadedImage = function (e) {
            var i = t(e),
                n = i.closest(".form-field--upload"),
                o = i.data("uploader-remove"),
                s = n.find('[ data-uploader-image="' + o + '" ]'),
                r = n.find('[ data-uploader-field="' + o + '" ]'),
                a = n.find('[ data-uploader-filename="' + o + '" ]');
            s.attr("src", s.data("src")), r.val("").focus(), a.text("").fadeOut(), i.fadeOut()
        }, n.prototype.toggleFieldset = function (e) {
            var i = t("#" + e.attr("aria-controls")),
                n = "true" === i.attr("aria-expanded"),
                o = "true" === i.attr("aria-pressed"),
                s = i.find("input[type=text], input[type=number], input[type=email]").not("[data-el=datepicker]");
            e.attr("aria-pressed", o = !o), i.attr("aria-expanded", n = !n), i.toggleClass("fieldset--hidden"), i.hasClass("fieldset--hidden") || s.parsley({
                excluded: "input.form-field__input--readonly, input[type=button], input[type=submit], input[type=reset], input[type=hidden], [disabled], :hidden"
            })
        }, n
    }), define("journey", ["jquery"], function (t) {
        "use strict";
        return {
            init: function (e) {
                "undefined" == typeof e && (e = t("[ data-journey ]")), e.each(function () {
                    var e = t(this),
                        i = e.data("journey");
                    require(["../src/journeys/" + i + "/" + i], function (t) {
                        var i;
                        void 0 !== t && (i = new t(e), i.init())
                    })
                })
            }
        }
    }), define("hayak-popup", ["jquery"], function (t) {
        "use strict";

        function e(e) {
            var i = void 0 != window.screenLeft ? window.screenLeft : screen.left,
                n = void 0 != window.screenTop ? window.screenTop : screen.top,
                o = t(e.currentTarget).attr("href"),
                s = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
                r = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
                a = s / 2 - 175 + i,
                l = r / 2 - 250 + n,
                c = this.unyco_popup_window;
            e.preventDefault(), null == c || c.closed ? this.unyco_popup_window = window.open(o, "hayakPopUp", "width=400,height=600,scrollbar=no,location=no,toolbar=no,resizable=false,left=" + a + ",top=" + l) : this.unyco_popup_window.focus()
        }
        var i = {};
        return i.init = function () {
            t(".js-hayak-popup").on("click", t.proxy(e, this))
        }, i
    }),
    function () {
        function t(t) {
            this._value = t
        }

        function e(t, e, i, n) {
            var o, s, r = Math.pow(10, e);
            return s = (i(t * r) / r).toFixed(e), n && (o = new RegExp("0{1," + n + "}$"), s = s.replace(o, "")), s
        }

        function i(t, e, i) {
            var n;
            return n = e.indexOf("$") > -1 ? o(t, e, i) : e.indexOf("%") > -1 ? s(t, e, i) : e.indexOf(":") > -1 ? r(t, e) : l(t._value, e, i)
        }

        function n(t, e) {
            var i, n, o, s, r, l = e,
                c = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
                d = !1;
            if (e.indexOf(":") > -1) t._value = a(e);
            else if (e === g) t._value = 0;
            else {
                for ("." !== f[m].delimiters.decimal && (e = e.replace(/\./g, "").replace(f[m].delimiters.decimal, ".")), i = new RegExp("[^a-zA-Z]" + f[m].abbreviations.thousand + "(?:\\)|(\\" + f[m].currency.symbol + ")?(?:\\))?)?$"), n = new RegExp("[^a-zA-Z]" + f[m].abbreviations.million + "(?:\\)|(\\" + f[m].currency.symbol + ")?(?:\\))?)?$"), o = new RegExp("[^a-zA-Z]" + f[m].abbreviations.billion + "(?:\\)|(\\" + f[m].currency.symbol + ")?(?:\\))?)?$"), s = new RegExp("[^a-zA-Z]" + f[m].abbreviations.trillion + "(?:\\)|(\\" + f[m].currency.symbol + ")?(?:\\))?)?$"), r = 0; r <= c.length && !(d = e.indexOf(c[r]) > -1 ? Math.pow(1024, r + 1) : !1); r++);
                t._value = (d ? d : 1) * (l.match(i) ? Math.pow(10, 3) : 1) * (l.match(n) ? Math.pow(10, 6) : 1) * (l.match(o) ? Math.pow(10, 9) : 1) * (l.match(s) ? Math.pow(10, 12) : 1) * (e.indexOf("%") > -1 ? .01 : 1) * ((e.split("-").length + Math.min(e.split("(").length - 1, e.split(")").length - 1)) % 2 ? 1 : -1) * Number(e.replace(/[^0-9\.]+/g, "")), t._value = d ? Math.ceil(t._value) : t._value
            }
            return t._value
        }

        function o(t, e, i) {
            var n, o, s = e.indexOf("$"),
                r = e.indexOf("("),
                a = e.indexOf("-"),
                c = "";
            return e.indexOf(" $") > -1 ? (c = " ", e = e.replace(" $", "")) : e.indexOf("$ ") > -1 ? (c = " ", e = e.replace("$ ", "")) : e = e.replace("$", ""), o = l(t._value, e, i), 1 >= s ? o.indexOf("(") > -1 || o.indexOf("-") > -1 ? (o = o.split(""), n = 1, (r > s || a > s) && (n = 0), o.splice(n, 0, f[m].currency.symbol + c), o = o.join("")) : o = f[m].currency.symbol + c + o : o.indexOf(")") > -1 ? (o = o.split(""), o.splice(-1, 0, c + f[m].currency.symbol), o = o.join("")) : o = o + c + f[m].currency.symbol, o
        }

        function s(t, e, i) {
            var n, o = "",
                s = 100 * t._value;
            return e.indexOf(" %") > -1 ? (o = " ", e = e.replace(" %", "")) : e = e.replace("%", ""), n = l(s, e, i), n.indexOf(")") > -1 ? (n = n.split(""), n.splice(-1, 0, o + "%"), n = n.join("")) : n = n + o + "%", n
        }

        function r(t) {
            var e = Math.floor(t._value / 60 / 60),
                i = Math.floor((t._value - 60 * e * 60) / 60),
                n = Math.round(t._value - 60 * e * 60 - 60 * i);
            return e + ":" + (10 > i ? "0" + i : i) + ":" + (10 > n ? "0" + n : n)
        }

        function a(t) {
            var e = t.split(":"),
                i = 0;
            return 3 === e.length ? (i += 60 * Number(e[0]) * 60, i += 60 * Number(e[1]), i += Number(e[2])) : 2 === e.length && (i += 60 * Number(e[0]), i += Number(e[1])), Number(i)
        }

        function l(t, i, n) {
            var o, s, r, a, l, c, d = !1,
                h = !1,
                u = !1,
                p = "",
                v = !1,
                y = !1,
                b = !1,
                x = !1,
                w = !1,
                k = "",
                _ = "",
                C = Math.abs(t),
                T = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
                $ = "",
                S = !1;
            if (0 === t && null !== g) return g;
            if (i.indexOf("(") > -1 ? (d = !0, i = i.slice(1, -1)) : i.indexOf("+") > -1 && (h = !0, i = i.replace(/\+/g, "")), i.indexOf("a") > -1 && (v = i.indexOf("aK") >= 0, y = i.indexOf("aM") >= 0, b = i.indexOf("aB") >= 0, x = i.indexOf("aT") >= 0, w = v || y || b || x, i.indexOf(" a") > -1 ? (p = " ", i = i.replace(" a", "")) : i = i.replace("a", ""), C >= Math.pow(10, 12) && !w || x ? (p += f[m].abbreviations.trillion, t /= Math.pow(10, 12)) : C < Math.pow(10, 12) && C >= Math.pow(10, 9) && !w || b ? (p += f[m].abbreviations.billion, t /= Math.pow(10, 9)) : C < Math.pow(10, 9) && C >= Math.pow(10, 6) && !w || y ? (p += f[m].abbreviations.million, t /= Math.pow(10, 6)) : (C < Math.pow(10, 6) && C >= Math.pow(10, 3) && !w || v) && (p += f[m].abbreviations.thousand, t /= Math.pow(10, 3))), i.indexOf("b") > -1)
                for (i.indexOf(" b") > -1 ? (k = " ", i = i.replace(" b", "")) : i = i.replace("b", ""), r = 0; r <= T.length; r++)
                    if (o = Math.pow(1024, r), s = Math.pow(1024, r + 1), t >= o && s > t) {
                        k += T[r], o > 0 && (t /= o);
                        break
                    }
            return i.indexOf("o") > -1 && (i.indexOf(" o") > -1 ? (_ = " ", i = i.replace(" o", "")) : i = i.replace("o", ""), _ += f[m].ordinal(t)), i.indexOf("[.]") > -1 && (u = !0, i = i.replace("[.]", ".")), a = t.toString().split(".")[0], l = i.split(".")[1], c = i.indexOf(","), l ? (l.indexOf("[") > -1 ? (l = l.replace("]", ""), l = l.split("["), $ = e(t, l[0].length + l[1].length, n, l[1].length)) : $ = e(t, l.length, n), a = $.split(".")[0], $ = $.split(".")[1].length ? f[m].delimiters.decimal + $.split(".")[1] : "", u && 0 === Number($.slice(1)) && ($ = "")) : a = e(t, null, n), a.indexOf("-") > -1 && (a = a.slice(1), S = !0), c > -1 && (a = a.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + f[m].delimiters.thousands)), 0 === i.indexOf(".") && (a = ""), (d && S ? "(" : "") + (!d && S ? "-" : "") + (!S && h ? "+" : "") + a + $ + (_ ? _ : "") + (p ? p : "") + (k ? k : "") + (d && S ? ")" : "")
        }

        function c(t, e) {
            f[t] = e
        }

        function d(t) {
            var e = t.toString().split(".");
            return e.length < 2 ? 1 : Math.pow(10, e[1].length)
        }

        function h() {
            var t = Array.prototype.slice.call(arguments);
            return t.reduce(function (t, e) {
                var i = d(t),
                    n = d(e);
                return i > n ? i : n
            }, -1 / 0)
        }
        var u, p = "1.5.3",
            f = {},
            m = "en",
            g = null,
            v = "0,0",
            y = "undefined" != typeof module && module.exports;
        u = function (e) {
            return u.isNumeral(e) ? e = e.value() : 0 === e || "undefined" == typeof e ? e = 0 : Number(e) || (e = u.fn.unformat(e)), new t(Number(e))
        }, u.version = p, u.isNumeral = function (e) {
            return e instanceof t
        }, u.language = function (t, e) {
            if (!t) return m;
            if (t && !e) {
                if (!f[t]) throw new Error("Unknown language : " + t);
                m = t
            }
            return (e || !f[t]) && c(t, e), u
        }, u.languageData = function (t) {
            if (!t) return f[m];
            if (!f[t]) throw new Error("Unknown language : " + t);
            return f[t]
        }, u.language("en", {
            delimiters: {
                thousands: ",",
                decimal: "."
            },
            abbreviations: {
                thousand: "k",
                million: "m",
                billion: "b",
                trillion: "t"
            },
            ordinal: function (t) {
                var e = t % 10;
                return 1 === ~~(t % 100 / 10) ? "th" : 1 === e ? "st" : 2 === e ? "nd" : 3 === e ? "rd" : "th"
            },
            currency: {
                symbol: "$"
            }
        }), u.zeroFormat = function (t) {
            g = "string" == typeof t ? t : null
        }, u.defaultFormat = function (t) {
            v = "string" == typeof t ? t : "0.0"
        }, "function" != typeof Array.prototype.reduce && (Array.prototype.reduce = function (t, e) {
            "use strict";
            if (null === this || "undefined" == typeof this) throw new TypeError("Array.prototype.reduce called on null or undefined");
            if ("function" != typeof t) throw new TypeError(t + " is not a function");
            var i, n, o = this.length >>> 0,
                s = !1;
            for (1 < arguments.length && (n = e, s = !0), i = 0; o > i; ++i) this.hasOwnProperty(i) && (s ? n = t(n, this[i], i, this) : (n = this[i], s = !0));
            if (!s) throw new TypeError("Reduce of empty array with no initial value");
            return n
        }), u.fn = t.prototype = {
            clone: function () {
                return u(this)
            },
            format: function (t, e) {
                return i(this, t ? t : v, void 0 !== e ? e : Math.round)
            },
            unformat: function (t) {
                return "[object Number]" === Object.prototype.toString.call(t) ? t : n(this, t ? t : v)
            },
            value: function () {
                return this._value
            },
            valueOf: function () {
                return this._value
            },
            set: function (t) {
                return this._value = Number(t), this
            },
            add: function (t) {
                function e(t, e) {
                    return t + i * e
                }
                var i = h.call(null, this._value, t);
                return this._value = [this._value, t].reduce(e, 0) / i, this
            },
            subtract: function (t) {
                function e(t, e) {
                    return t - i * e
                }
                var i = h.call(null, this._value, t);
                return this._value = [t].reduce(e, this._value * i) / i, this
            },
            multiply: function (t) {
                function e(t, e) {
                    var i = h(t, e);
                    return t * i * e * i / (i * i)
                }
                return this._value = [this._value, t].reduce(e, 1), this
            },
            divide: function (t) {
                function e(t, e) {
                    var i = h(t, e);
                    return t * i / (e * i)
                }
                return this._value = [this._value, t].reduce(e), this
            },
            difference: function (t) {
                return Math.abs(u(this._value).subtract(t).value())
            }
        }, y && (module.exports = u), "undefined" == typeof ender && (this.numeral = u), "function" == typeof define && define.amd && define("numeral", [], function () {
            return u
        })
    }.call(this), define("format-numbers", ["jquery", "numeral"], function (t) {
        "use strict";

        function e(e) {
            e.each(function (e, i) {
                var n, o = t(i),
                    s = o.data("numeric-format") || "0,0.00",
                    r = o.data("currency"),
                    a = o.text() || o.val(),
                    l = parseFloat(a);
                if (l) {
                    var n = numeral(l).format(s);
                    return r && (n += " " + r), o.is("input") || o.is("textarea") ? void o.val(n) : void o.text(n)
                }
            })
        }
        var i = {};
        return i.init = function () {
            e(t("[data-numeric-format]"))
        }, i
    }), define("bootstrap", ["jquery", "component", "helper", "breakpoint", "form", "journey", "lib/utils", "hayak-popup", "format-numbers"], function (t, e, i, n, o, s, r, a, l) {
        "use strict";
        document.getElementsByTagName("html")[0].className = "js", n.init(), e.init(), i.init(), t("[data-form]").each(function () {
            new o(t(this)).init()
        }), s.init(), a.init(), l.init(), r.isMSIE() && t("a[href^=tel]").each(function () {
            var e = t(this);
            e.addClass("link--inactive-tel"), e.on("click", function (t) {
                t.preventDefault()
            })
        }), window.initComponents = function (n) {
            var o, r, a, l;
            "undefined" != typeof n && (l = t("#" + n), o = l.find("[ data-component ]"), r = l.find("[ data-helper ]"), a = l.find("[ data-journey ]"), e.init(o), i.init(r), s.init(a))
        }
    }),
    function () {
        "use strict";
        Array.prototype.filter || (Array.prototype.filter = function (t) {
            if (void 0 === this || null === this) throw new TypeError;
            var e = Object(this),
                i = e.length >>> 0;
            if ("function" != typeof t) throw new TypeError;
            for (var n = [], o = arguments.length >= 2 ? arguments[1] : void 0, s = 0; i > s; s++)
                if (s in e) {
                    var r = e[s];
                    t.call(o, r, s, e) && n.push(r)
                }
            return n
        }), "function" != typeof Object.create && (Object.create = function () {
            var t = function () { };
            return function (e) {
                if (arguments.length > 1) throw Error("Second argument not supported");
                if ("object" != typeof e) throw TypeError("Argument must be an object");
                t.prototype = e;
                var i = new t;
                return t.prototype = null, i
            }
        }()), Object.keys || (Object.keys = function () {
            var t = Object.prototype.hasOwnProperty,
                e = !{
                    toString: null
                }.propertyIsEnumerable("toString"),
                i = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
                n = i.length;
            return function (o) {
                if ("object" != typeof o && ("function" != typeof o || null === o)) throw new TypeError("Object.keys called on non-object");
                var s, r, a = [];
                for (s in o) t.call(o, s) && a.push(s);
                if (e)
                    for (r = 0; n > r; r += 1) t.call(o, i[r]) && a.push(i[r]);
                return a
            }
        }())
    }(), define("lib/ieshims", function () { }),
    function () {
        function t() {
            var t, e, i = arguments,
                n = {},
                o = function (t, e) {
                    var i, n;
                    "object" != typeof t && (t = {});
                    for (n in e) e.hasOwnProperty(n) && (i = e[n], t[n] = i && "object" == typeof i && "[object Array]" !== Object.prototype.toString.call(i) && "renderTo" !== n && "number" != typeof i.nodeType ? o(t[n] || {}, i) : e[n]);
                    return t
                };
            for (i[0] === !0 && (n = i[1], i = Array.prototype.slice.call(i, 2)), e = i.length, t = 0; e > t; t++) n = o(n, i[t]);
            return n
        }

        function e(t, e) {
            return parseInt(t, e || 10)
        }

        function i(t) {
            return "string" == typeof t
        }

        function n(t) {
            return t && "object" == typeof t
        }

        function o(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        }

        function s(t) {
            return "number" == typeof t
        }

        function r(t) {
            return rt.log(t) / rt.LN10
        }

        function a(t) {
            return rt.pow(10, t)
        }

        function l(t, e) {
            for (var i = t.length; i--;)
                if (t[i] === e) {
                    t.splice(i, 1);
                    break
                }
        }

        function c(t) {
            return t !== L && null !== t
        }

        function d(t, e, o) {
            var s, r;
            if (i(e)) c(o) ? t.setAttribute(e, o) : t && t.getAttribute && (r = t.getAttribute(e));
            else if (c(e) && n(e))
                for (s in e) t.setAttribute(s, e[s]);
            return r
        }

        function h(t) {
            return o(t) ? t : [t]
        }

        function u(t, e) {
            bt && !Tt && e && e.opacity !== L && (e.filter = "alpha(opacity=" + 100 * e.opacity + ")"), jt(t.style, e)
        }

        function p(t, e, i, n, o) {
            return t = ot.createElement(t), e && jt(t, e), o && u(t, {
                padding: 0,
                border: Bt,
                margin: 0
            }), i && u(t, i), n && n.appendChild(t), t
        }

        function f(t, e) {
            var i = function () {
                return L
            };
            return i.prototype = new t, jt(i.prototype, e), i
        }

        function m(t, e) {
            return Array((e || 2) + 1 - String(t).length).join(0) + t
        }

        function g(t) {
            return 6e4 * (q && q(t) || R || 0)
        }

        function v(t, e) {
            for (var i, n, o, s, r, a = "{", l = !1, c = []; - 1 !== (a = t.indexOf(a));) {
                if (i = t.slice(0, a), l) {
                    for (n = i.split(":"), o = n.shift().split("."), r = o.length, i = e, s = 0; r > s; s++) i = i[o[s]];
                    n.length && (n = n.join(":"), o = /\.([0-9])/, s = H.lang, r = void 0, /f$/.test(n) ? (r = (r = n.match(o)) ? r[1] : -1, null !== i && (i = nt.numberFormat(i, r, s.decimalPoint, n.indexOf(",") > -1 ? s.thousandsSep : ""))) : i = I(n, i))
                }
                c.push(i), t = t.slice(a + 1), a = (l = !l) ? "}" : "{"
            }
            return c.push(t), c.join("")
        }

        function y(t) {
            return rt.pow(10, lt(rt.log(t) / rt.LN10))
        }

        function b(t, e, i, n, o) {
            var s, r = t,
                i = Nt(i, 1);
            for (s = t / i, e || (e = [1, 2, 2.5, 5, 10], n === !1 && (1 === i ? e = [1, 2, 5, 10] : .1 >= i && (e = [1 / i]))), n = 0; n < e.length && (r = e[n], !(o && r * i >= t || !o && s <= (e[n] + (e[n + 1] || e[n])) / 2)); n++);
            return r *= i
        }

        function x(t, e) {
            var i, n, o = t.length;
            for (n = 0; o > n; n++) t[n].ss_i = n;
            for (t.sort(function (t, n) {
                return i = e(t, n), 0 === i ? t.ss_i - n.ss_i : i
            }), n = 0; o > n; n++) delete t[n].ss_i
        }

        function w(t) {
            for (var e = t.length, i = t[0]; e--;) t[e] < i && (i = t[e]);
            return i
        }

        function k(t) {
            for (var e = t.length, i = t[0]; e--;) t[e] > i && (i = t[e]);
            return i
        }

        function _(t, e) {
            for (var i in t) t[i] && t[i] !== e && t[i].destroy && t[i].destroy(), delete t[i]
        }

        function C(t) {
            F || (F = p(Dt)), t && F.appendChild(t), F.innerHTML = ""
        }

        function T(t, e) {
            var i = "Highcharts error #" + t + ": www.highcharts.com/errors/" + t;
            if (e) throw i;
            st.console && console.log(i)
        }

        function $(t, e) {
            return parseFloat(t.toPrecision(e || 14))
        }

        function S(t, e) {
            e.renderer.globalAnimation = Nt(t, e.animation)
        }

        function P() {
            var t = H.global,
                e = t.useUTC,
                i = e ? "getUTC" : "get",
                n = e ? "setUTC" : "set";
            N = t.Date || window.Date, R = e && t.timezoneOffset, q = e && t.getTimezoneOffset, z = function (t, i, n, o, s, r) {
                var a;
                return e ? (a = N.UTC.apply(0, arguments), a += g(a)) : a = new N(t, i, Nt(n, 1), Nt(o, 0), Nt(s, 0), Nt(r, 0)).getTime(), a
            }, W = i + "Minutes", X = i + "Hours", Y = i + "Day", V = i + "Date", G = i + "Month", U = i + "FullYear", K = n + "Milliseconds", J = n + "Seconds", Z = n + "Minutes", Q = n + "Hours", tt = n + "Date", et = n + "Month", it = n + "FullYear"
        }

        function M() { }

        function A(t, e, i, n) {
            this.axis = t, this.pos = e, this.type = i || "", this.isNew = !0, !i && !n && this.addLabel()
        }

        function E(t, e, i, n, o) {
            var s = t.chart.inverted;
            this.axis = t, this.isNegative = i, this.options = e, this.x = n, this.total = null, this.points = {}, this.stack = o, this.alignOptions = {
                align: e.align || (s ? i ? "left" : "right" : "center"),
                verticalAlign: e.verticalAlign || (s ? "middle" : i ? "bottom" : "top"),
                y: Nt(e.y, s ? 4 : i ? 14 : -6),
                x: Nt(e.x, s ? i ? -6 : 6 : 0)
            }, this.textAlign = e.textAlign || (s ? i ? "right" : "left" : "center")
        }
        var L, D, B, F, H, I, O, j, N, z, R, q, W, X, Y, V, G, U, K, J, Z, Q, tt, et, it, nt, ot = document,
            st = window,
            rt = Math,
            at = rt.round,
            lt = rt.floor,
            ct = rt.ceil,
            dt = rt.max,
            ht = rt.min,
            ut = rt.abs,
            pt = rt.cos,
            ft = rt.sin,
            mt = rt.PI,
            gt = 2 * mt / 360,
            vt = navigator.userAgent,
            yt = st.opera,
            bt = /(msie|trident|edge)/i.test(vt) && !yt,
            xt = 8 === ot.documentMode,
            wt = !bt && /AppleWebKit/.test(vt),
            kt = /Firefox/.test(vt),
            _t = /(Mobile|Android|Windows Phone)/.test(vt),
            Ct = "http://www.w3.org/2000/svg",
            Tt = !!ot.createElementNS && !!ot.createElementNS(Ct, "svg").createSVGRect,
            $t = kt && parseInt(vt.split("Firefox/")[1], 10) < 4,
            St = !Tt && !bt && !!ot.createElement("canvas").getContext,
            Pt = {},
            Mt = 0,
            At = function () {
                return L
            },
            Et = [],
            Lt = 0,
            Dt = "div",
            Bt = "none",
            Ft = /^[0-9]+$/,
            Ht = ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            It = "stroke-width",
            Ot = {};
        nt = st.Highcharts = st.Highcharts ? T(16, !0) : {}, nt.seriesTypes = Ot;
        var jt = nt.extend = function (t, e) {
            var i;
            t || (t = {});
            for (i in e) t[i] = e[i];
            return t
        },
            Nt = nt.pick = function () {
                var t, e, i = arguments,
                    n = i.length;
                for (t = 0; n > t; t++)
                    if (e = i[t], e !== L && null !== e) return e
            },
            zt = nt.wrap = function (t, e, i) {
                var n = t[e];
                t[e] = function () {
                    var t = Array.prototype.slice.call(arguments);
                    return t.unshift(n), i.apply(this, t)
                }
            };
        I = function (t, e, i) {
            if (!c(e) || isNaN(e)) return H.lang.invalidDate || "";
            var n, t = Nt(t, "%Y-%m-%d %H:%M:%S"),
                o = new N(e - g(e)),
                s = o[X](),
                r = o[Y](),
                a = o[V](),
                l = o[G](),
                d = o[U](),
                h = H.lang,
                u = h.weekdays,
                o = jt({
                    a: u[r].substr(0, 3),
                    A: u[r],
                    d: m(a),
                    e: a,
                    w: r,
                    b: h.shortMonths[l],
                    B: h.months[l],
                    m: m(l + 1),
                    y: d.toString().substr(2, 2),
                    Y: d,
                    H: m(s),
                    k: s,
                    I: m(s % 12 || 12),
                    l: s % 12 || 12,
                    M: m(o[W]()),
                    p: 12 > s ? "AM" : "PM",
                    P: 12 > s ? "am" : "pm",
                    S: m(o.getSeconds()),
                    L: m(at(e % 1e3), 3)
                }, nt.dateFormats);
            for (n in o)
                for (; - 1 !== t.indexOf("%" + n);) t = t.replace("%" + n, "function" == typeof o[n] ? o[n](e) : o[n]);
            return i ? t.substr(0, 1).toUpperCase() + t.substr(1) : t
        }, j = {
            millisecond: 1,
            second: 1e3,
            minute: 6e4,
            hour: 36e5,
            day: 864e5,
            week: 6048e5,
            month: 24192e5,
            year: 314496e5
        }, nt.numberFormat = function (t, i, n, o) {
            var s = H.lang,
                t = +t || 0,
                r = -1 === i ? ht((t.toString().split(".")[1] || "").length, 20) : isNaN(i = ut(i)) ? 2 : i,
                i = void 0 === n ? s.decimalPoint : n,
                o = void 0 === o ? s.thousandsSep : o,
                s = 0 > t ? "-" : "",
                n = String(e(t = ut(t).toFixed(r))),
                a = n.length > 3 ? n.length % 3 : 0;
            return s + (a ? n.substr(0, a) + o : "") + n.substr(a).replace(/(\d{3})(?=\d)/g, "$1" + o) + (r ? i + ut(t - n).toFixed(r).slice(2) : "")
        }, O = {
            init: function (t, e, i) {
                var n, o, s, e = e || "",
                    r = t.shift,
                    a = e.indexOf("C") > -1,
                    l = a ? 7 : 3,
                    e = e.split(" "),
                    i = [].concat(i),
                    c = function (t) {
                        for (n = t.length; n--;) "M" === t[n] && t.splice(n + 1, 0, t[n + 1], t[n + 2], t[n + 1], t[n + 2])
                    };
                if (a && (c(e), c(i)), t.isArea && (o = e.splice(e.length - 6, 6), s = i.splice(i.length - 6, 6)), r <= i.length / l && e.length === i.length)
                    for (; r--;) i = [].concat(i).splice(0, l).concat(i);
                if (t.shift = 0, e.length)
                    for (t = i.length; e.length < t;) r = [].concat(e).splice(e.length - l, l), a && (r[l - 6] = r[l - 2], r[l - 5] = r[l - 1]), e = e.concat(r);
                return o && (e = e.concat(o), i = i.concat(s)), [e, i]
            },
            step: function (t, e, i, n) {
                var o = [],
                    s = t.length;
                if (1 === i) o = n;
                else if (s === e.length && 1 > i)
                    for (; s--;) n = parseFloat(t[s]), o[s] = isNaN(n) ? t[s] : i * parseFloat(e[s] - n) + n;
                else o = e;
                return o
            }
        },
            function (t) {
                st.HighchartsAdapter = st.HighchartsAdapter || t && {
                    init: function (e) {
                        var n = t.fx;
                        t.extend(t.easing, {
                            easeOutQuad: function (t, e, i, n, o) {
                                return -n * (e /= o) * (e - 2) + i
                            }
                        }), t.each(["cur", "_default", "width", "height", "opacity"], function (e, i) {
                            var o, s = n.step;
                            "cur" === i ? s = n.prototype : "_default" === i && t.Tween && (s = t.Tween.propHooks[i], i = "set"), (o = s[i]) && (s[i] = function (t) {
                                var n, t = e ? t : this;
                                return "align" !== t.prop ? (n = t.elem, n.attr ? n.attr(t.prop, "cur" === i ? L : t.now) : o.apply(this, arguments)) : void 0
                            })
                        }), zt(t.cssHooks.opacity, "get", function (t, e, i) {
                            return e.attr ? e.opacity || 0 : t.call(this, e, i)
                        }), this.addAnimSetter("d", function (t) {
                            var i, n = t.elem;
                            t.started || (i = e.init(n, n.d, n.toD), t.start = i[0], t.end = i[1], t.started = !0), n.attr("d", e.step(t.start, t.end, t.pos, n.toD))
                        }), this.each = Array.prototype.forEach ? function (t, e) {
                            return Array.prototype.forEach.call(t, e)
                        } : function (t, e) {
                            var i, n = t.length;
                            for (i = 0; n > i; i++)
                                if (e.call(t[i], t[i], i, t) === !1) return i
                        }, t.fn.highcharts = function () {
                            var t, e, n = "Chart",
                                o = arguments;
                            return this[0] && (i(o[0]) && (n = o[0], o = Array.prototype.slice.call(o, 1)), t = o[0], t !== L && (t.chart = t.chart || {}, t.chart.renderTo = this[0], new nt[n](t, o[1]), e = this), t === L && (e = Et[d(this[0], "data-highcharts-chart")])), e
                        }
                    },
                    addAnimSetter: function (e, i) {
                        t.Tween ? t.Tween.propHooks[e] = {
                            set: i
                        } : t.fx.step[e] = i
                    },
                    getScript: t.getScript,
                    inArray: t.inArray,
                    adapterRun: function (e, i) {
                        return t(e)[i]()
                    },
                    grep: t.grep,
                    map: function (t, e) {
                        for (var i = [], n = 0, o = t.length; o > n; n++) i[n] = e.call(t[n], t[n], n, t);
                        return i
                    },
                    offset: function (e) {
                        return t(e).offset()
                    },
                    addEvent: function (e, i, n) {
                        t(e).bind(i, n)
                    },
                    removeEvent: function (e, i, n) {
                        var o = ot.removeEventListener ? "removeEventListener" : "detachEvent";
                        ot[o] && e && !e[o] && (e[o] = function () { }), t(e).unbind(i, n)
                    },
                    fireEvent: function (e, i, n, o) {
                        var s, r = t.Event(i),
                            a = "detached" + i;
                        !bt && n && (delete n.layerX, delete n.layerY, delete n.returnValue), jt(r, n), e[i] && (e[a] = e[i], e[i] = null), t.each(["preventDefault", "stopPropagation"], function (t, e) {
                            var i = r[e];
                            r[e] = function () {
                                try {
                                    i.call(r)
                                } catch (t) {
                                    "preventDefault" === e && (s = !0)
                                }
                            }
                        }), t(e).trigger(r), e[a] && (e[i] = e[a], e[a] = null), o && !r.isDefaultPrevented() && !s && o(r)
                    },
                    washMouseEvent: function (t) {
                        var e = t.originalEvent || t;
                        return e.pageX === L && (e.pageX = t.pageX, e.pageY = t.pageY), e
                    },
                    animate: function (e, i, n) {
                        var o = t(e);
                        e.style || (e.style = {}), i.d && (e.toD = i.d, i.d = 1), o.stop(), i.opacity !== L && e.attr && (i.opacity += "px"), e.hasAnim = 1, o.animate(i, n)
                    },
                    stop: function (e) {
                        e.hasAnim && t(e).stop()
                    }
                }
            }(st.jQuery);
        var Rt = st.HighchartsAdapter,
            qt = Rt || {};
        Rt && Rt.init.call(Rt, O);
        var Wt = qt.adapterRun,
            Xt = qt.getScript,
            Yt = qt.inArray,
            Vt = nt.each = qt.each,
            Gt = qt.grep,
            Ut = qt.offset,
            Kt = qt.map,
            Jt = qt.addEvent,
            Zt = qt.removeEvent,
            Qt = qt.fireEvent,
            te = qt.washMouseEvent,
            ee = qt.animate,
            ie = qt.stop;
        H = {
            colors: "#7cb5ec,#434348,#90ed7d,#f7a35c,#8085e9,#f15c80,#e4d354,#2b908f,#f45b5b,#91e8e1".split(","),
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
                shortMonths: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
                weekdays: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
                decimalPoint: ".",
                numericSymbols: "k,M,G,T,P,E".split(","),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {
                useUTC: !0,
                canvasToolsURL: "http://code.highcharts.com/4.1.9/modules/canvas-tools.js",
                VMLRadialGradientURL: "http://code.highcharts.com/4.1.9/gfx/vml-radial-gradient.png"
            },
            chart: {
                borderColor: "#4572A7",
                borderRadius: 0,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                backgroundColor: "#FFFFFF",
                plotBorderColor: "#C0C0C0",
                resetZoomButton: {
                    theme: {
                        zIndex: 20
                    },
                    position: {
                        align: "right",
                        x: -10,
                        y: 10
                    }
                }
            },
            title: {
                text: "Chart title",
                align: "center",
                margin: 15,
                style: {
                    color: "#333333",
                    fontSize: "18px"
                }
            },
            subtitle: {
                text: "",
                align: "center",
                style: {
                    color: "#555555"
                }
            },
            plotOptions: {
                line: {
                    allowPointSelect: !1,
                    showCheckbox: !1,
                    animation: {
                        duration: 1e3
                    },
                    events: {},
                    lineWidth: 2,
                    marker: {
                        lineWidth: 0,
                        radius: 4,
                        lineColor: "#FFFFFF",
                        states: {
                            hover: {
                                enabled: !0,
                                lineWidthPlus: 1,
                                radiusPlus: 2
                            },
                            select: {
                                fillColor: "#FFFFFF",
                                lineColor: "#000000",
                                lineWidth: 2
                            }
                        }
                    },
                    point: {
                        events: {}
                    },
                    dataLabels: {
                        align: "center",
                        formatter: function () {
                            return null === this.y ? "" : nt.numberFormat(this.y, -1)
                        },
                        style: {
                            color: "contrast",
                            fontSize: "11px",
                            fontWeight: "bold",
                            textShadow: "0 0 6px contrast, 0 0 3px contrast"
                        },
                        verticalAlign: "bottom",
                        x: 0,
                        y: 0,
                        padding: 5
                    },
                    cropThreshold: 300,
                    pointRange: 0,
                    softThreshold: !0,
                    states: {
                        hover: {
                            lineWidthPlus: 1,
                            marker: {},
                            halo: {
                                size: 10,
                                opacity: .25
                            }
                        },
                        select: {
                            marker: {}
                        }
                    },
                    stickyTracking: !0,
                    turboThreshold: 1e3
                }
            },
            labels: {
                style: {
                    position: "absolute",
                    color: "#3E576F"
                }
            },
            legend: {
                enabled: !0,
                align: "center",
                layout: "horizontal",
                labelFormatter: function () {
                    return this.name
                },
                borderColor: "#909090",
                borderRadius: 0,
                navigation: {
                    activeColor: "#274b6d",
                    inactiveColor: "#CCC"
                },
                shadow: !1,
                itemStyle: {
                    color: "#333333",
                    fontSize: "12px",
                    fontWeight: "bold"
                },
                itemHoverStyle: {
                    color: "#000"
                },
                itemHiddenStyle: {
                    color: "#CCC"
                },
                itemCheckboxStyle: {
                    position: "absolute",
                    width: "13px",
                    height: "13px"
                },
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {
                    style: {
                        fontWeight: "bold"
                    }
                }
            },
            loading: {
                labelStyle: {
                    fontWeight: "bold",
                    position: "relative",
                    top: "45%"
                },
                style: {
                    position: "absolute",
                    backgroundColor: "white",
                    opacity: .5,
                    textAlign: "center"
                }
            },
            tooltip: {
                enabled: !0,
                animation: Tt,
                backgroundColor: "rgba(249, 249, 249, .85)",
                borderWidth: 1,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y}</b><br/>',
                shadow: !0,
                snap: _t ? 25 : 10,
                style: {
                    color: "#333333",
                    cursor: "default",
                    fontSize: "12px",
                    padding: "8px",
                    pointerEvents: "none",
                    whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: !0,
                text: "Highcharts.com",
                href: "http://www.highcharts.com",
                position: {
                    align: "right",
                    x: -10,
                    verticalAlign: "bottom",
                    y: -5
                },
                style: {
                    cursor: "pointer",
                    color: "#909090",
                    fontSize: "9px"
                }
            }
        };
        var ne = H.plotOptions,
            Rt = ne.line;
        P();
        var oe = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
            se = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
            re = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
            ae = function (i) {
                var n, o, r = [];
                return function (t) {
                    t && t.stops ? o = Kt(t.stops, function (t) {
                        return ae(t[1])
                    }) : (n = oe.exec(t)) ? r = [e(n[1]), e(n[2]), e(n[3]), parseFloat(n[4], 10)] : (n = se.exec(t)) ? r = [e(n[1], 16), e(n[2], 16), e(n[3], 16), 1] : (n = re.exec(t)) && (r = [e(n[1]), e(n[2]), e(n[3]), 1])
                }(i), {
                        get: function (e) {
                            var n;
                            return o ? (n = t(i), n.stops = [].concat(n.stops), Vt(o, function (t, i) {
                                n.stops[i] = [n.stops[i][0], t.get(e)]
                            })) : n = r && !isNaN(r[0]) ? "rgb" === e ? "rgb(" + r[0] + "," + r[1] + "," + r[2] + ")" : "a" === e ? r[3] : "rgba(" + r.join(",") + ")" : i, n
                        },
                        brighten: function (t) {
                            if (o) Vt(o, function (e) {
                                e.brighten(t)
                            });
                            else if (s(t) && 0 !== t) {
                                var i;
                                for (i = 0; 3 > i; i++) r[i] += e(255 * t), r[i] < 0 && (r[i] = 0), r[i] > 255 && (r[i] = 255)
                            }
                            return this
                        },
                        rgba: r,
                        setOpacity: function (t) {
                            return r[3] = t, this
                        },
                        raw: i
                    }
            };
        M.prototype = {
            opacity: 1,
            textProps: "fontSize,fontWeight,fontFamily,fontStyle,color,lineHeight,width,textDecoration,textOverflow,textShadow".split(","),
            init: function (t, e) {
                this.element = "span" === e ? p(e) : ot.createElementNS(Ct, e), this.renderer = t
            },
            animate: function (e, i, n) {
                return i = Nt(i, this.renderer.globalAnimation, !0), ie(this), i ? (i = t(i, {}), n && (i.complete = n), ee(this, e, i)) : this.attr(e, null, n), this
            },
            colorGradient: function (e, i, n) {
                var s, r, a, l, d, h, u, p, f, m, g, v = this.renderer,
                    y = [];
                if (e.linearGradient ? r = "linearGradient" : e.radialGradient && (r = "radialGradient"), r) {
                    a = e[r], d = v.gradients, u = e.stops, m = n.radialReference, o(a) && (e[r] = a = {
                        x1: a[0],
                        y1: a[1],
                        x2: a[2],
                        y2: a[3],
                        gradientUnits: "userSpaceOnUse"
                    }), "radialGradient" === r && m && !c(a.gradientUnits) && (l = a, a = t(a, v.getRadialAttr(m, l), {
                        gradientUnits: "userSpaceOnUse"
                    }));
                    for (g in a) "id" !== g && y.push(g, a[g]);
                    for (g in u) y.push(u[g]);
                    y = y.join(","), d[y] ? e = d[y].attr("id") : (a.id = e = "highcharts-" + Mt++ , d[y] = h = v.createElement(r).attr(a).add(v.defs), h.radAttr = l, h.stops = [], Vt(u, function (t) {
                        0 === t[1].indexOf("rgba") ? (s = ae(t[1]), p = s.get("rgb"), f = s.get("a")) : (p = t[1], f = 1), t = v.createElement("stop").attr({
                            offset: t[0],
                            "stop-color": p,
                            "stop-opacity": f
                        }).add(h), h.stops.push(t)
                    })), n.setAttribute(i, "url(" + v.url + "#" + e + ")"), n.gradient = y
                }
            },
            applyTextShadow: function (t) {
                var i, n = this.element,
                    o = -1 !== t.indexOf("contrast"),
                    s = {},
                    r = this.renderer.forExport,
                    a = r || n.style.textShadow !== L && !bt;
                o && (s.textShadow = t = t.replace(/contrast/g, this.renderer.getContrast(n.style.fill))), (wt || r) && (s.textRendering = "geometricPrecision"), a ? this.css(s) : (this.fakeTS = !0, this.ySetter = this.xSetter, i = [].slice.call(n.getElementsByTagName("tspan")), Vt(t.split(/\s?,\s?/g), function (t) {
                    var o, s, r = n.firstChild,
                        t = t.split(" ");
                    o = t[t.length - 1], (s = t[t.length - 2]) && Vt(i, function (t, i) {
                        var a;
                        0 === i && (t.setAttribute("x", n.getAttribute("x")), i = n.getAttribute("y"), t.setAttribute("y", i || 0), null === i && n.setAttribute("y", 0)), a = t.cloneNode(1), d(a, {
                            "class": "highcharts-text-shadow",
                            fill: o,
                            stroke: o,
                            "stroke-opacity": 1 / dt(e(s), 3),
                            "stroke-width": s,
                            "stroke-linejoin": "round"
                        }), n.insertBefore(a, r)
                    })
                }))
            },
            attr: function (t, e, i) {
                var n, o, s, r = this.element,
                    a = this;
                if ("string" == typeof t && e !== L && (n = t, t = {}, t[n] = e), "string" == typeof t) a = (this[t + "Getter"] || this._defaultGetter).call(this, t, r);
                else {
                    for (n in t) e = t[n], s = !1, this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(n) && (o || (this.symbolAttr(t), o = !0), s = !0), !this.rotation || "x" !== n && "y" !== n || (this.doTransform = !0), s || (this[n + "Setter"] || this._defaultSetter).call(this, e, n, r), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(n) && this.updateShadows(n, e);
                    this.doTransform && (this.updateTransform(), this.doTransform = !1)
                }
                return i && i(), a
            },
            updateShadows: function (t, e) {
                for (var i = this.shadows, n = i.length; n--;) i[n].setAttribute(t, "height" === t ? dt(e - (i[n].cutHeight || 0), 0) : "d" === t ? this.d : e)
            },
            addClass: function (t) {
                var e = this.element,
                    i = d(e, "class") || "";
                return -1 === i.indexOf(t) && d(e, "class", i + " " + t), this
            },
            symbolAttr: function (t) {
                var e = this;
                Vt("x,y,r,start,end,width,height,innerR,anchorX,anchorY".split(","), function (i) {
                    e[i] = Nt(t[i], e[i])
                }), e.attr({
                    d: e.renderer.symbols[e.symbolName](e.x, e.y, e.width, e.height, e)
                })
            },
            clip: function (t) {
                return this.attr("clip-path", t ? "url(" + this.renderer.url + "#" + t.id + ")" : Bt)
            },
            crisp: function (t) {
                var e, i, n = {},
                    o = t.strokeWidth || this.strokeWidth || 0;
                i = at(o) % 2 / 2, t.x = lt(t.x || this.x || 0) + i, t.y = lt(t.y || this.y || 0) + i, t.width = lt((t.width || this.width || 0) - 2 * i), t.height = lt((t.height || this.height || 0) - 2 * i), t.strokeWidth = o;
                for (e in t) this[e] !== t[e] && (this[e] = n[e] = t[e]);
                return n
            },
            css: function (t) {
                var i, n, o = this.styles,
                    s = {},
                    r = this.element,
                    a = "";
                if (i = !o, t && t.color && (t.fill = t.color), o)
                    for (n in t) t[n] !== o[n] && (s[n] = t[n], i = !0);
                if (i) {
                    if (i = this.textWidth = t && t.width && "text" === r.nodeName.toLowerCase() && e(t.width) || this.textWidth, o && (t = jt(o, s)), this.styles = t, i && (St || !Tt && this.renderer.forExport) && delete t.width, bt && !Tt) u(this.element, t);
                    else {
                        o = function (t, e) {
                            return "-" + e.toLowerCase()
                        };
                        for (n in t) a += n.replace(/([A-Z])/g, o) + ":" + t[n] + ";";
                        d(r, "style", a)
                    }
                    i && this.added && this.renderer.buildText(this)
                }
                return this
            },
            on: function (t, e) {
                var i = this,
                    n = i.element;
                return B && "click" === t ? (n.ontouchstart = function (t) {
                    i.touchEventFired = N.now(), t.preventDefault(), e.call(n, t)
                }, n.onclick = function (t) {
                    (-1 === vt.indexOf("Android") || N.now() - (i.touchEventFired || 0) > 1100) && e.call(n, t)
                }) : n["on" + t] = e, this
            },
            setRadialReference: function (t) {
                var e = this.renderer.gradients[this.element.gradient];
                return this.element.radialReference = t, e && e.radAttr && e.animate(this.renderer.getRadialAttr(t, e.radAttr)), this
            },
            translate: function (t, e) {
                return this.attr({
                    translateX: t,
                    translateY: e
                })
            },
            invert: function () {
                return this.inverted = !0, this.updateTransform(), this
            },
            updateTransform: function () {
                var t = this.translateX || 0,
                    e = this.translateY || 0,
                    i = this.scaleX,
                    n = this.scaleY,
                    o = this.inverted,
                    s = this.rotation,
                    r = this.element;
                o && (t += this.attr("width"), e += this.attr("height")), t = ["translate(" + t + "," + e + ")"], o ? t.push("rotate(90) scale(-1,1)") : s && t.push("rotate(" + s + " " + (r.getAttribute("x") || 0) + " " + (r.getAttribute("y") || 0) + ")"), (c(i) || c(n)) && t.push("scale(" + Nt(i, 1) + " " + Nt(n, 1) + ")"), t.length && r.setAttribute("transform", t.join(" "))
            },
            toFront: function () {
                var t = this.element;
                return t.parentNode.appendChild(t), this
            },
            align: function (t, e, n) {
                var o, s, r, a, c = {};
                return s = this.renderer, r = s.alignedObjects, t ? (this.alignOptions = t, this.alignByTranslate = e, (!n || i(n)) && (this.alignTo = o = n || "renderer", l(r, this), r.push(this), n = null)) : (t = this.alignOptions, e = this.alignByTranslate, o = this.alignTo), n = Nt(n, s[o], s), o = t.align, s = t.verticalAlign, r = (n.x || 0) + (t.x || 0), a = (n.y || 0) + (t.y || 0), ("right" === o || "center" === o) && (r += (n.width - (t.width || 0)) / {
                    right: 1,
                    center: 2
                }[o]), c[e ? "translateX" : "x"] = at(r), ("bottom" === s || "middle" === s) && (a += (n.height - (t.height || 0)) / ({
                    bottom: 1,
                    middle: 2
                }[s] || 1)), c[e ? "translateY" : "y"] = at(a), this[this.placed ? "animate" : "attr"](c), this.placed = !0, this.alignAttr = c, this
            },
            getBBox: function (t) {
                var e, i, n = this.renderer,
                    o = this.rotation,
                    s = this.element,
                    r = this.styles,
                    a = o * gt;
                i = this.textStr;
                var l, c, d, h = s.style;
                if (i !== L && (d = ["", o || 0, r && r.fontSize, s.style.width].join(","), d = "" === i || Ft.test(i) ? "num:" + i.toString().length + d : i + d), d && !t && (e = n.cache[d]), !e) {
                    if (s.namespaceURI === Ct || n.forExport) {
                        try {
                            c = this.fakeTS && function (t) {
                                Vt(s.querySelectorAll(".highcharts-text-shadow"), function (e) {
                                    e.style.display = t
                                })
                            }, kt && h.textShadow ? (l = h.textShadow, h.textShadow = "") : c && c(Bt), e = s.getBBox ? jt({}, s.getBBox()) : {
                                width: s.offsetWidth,
                                height: s.offsetHeight
                            }, l ? h.textShadow = l : c && c("")
                        } catch (u) { } (!e || e.width < 0) && (e = {
                            width: 0,
                            height: 0
                        })
                    } else e = this.htmlGetBBox();
                    n.isSVG && (t = e.width, i = e.height, bt && r && "11px" === r.fontSize && "16.9" === i.toPrecision(3) && (e.height = i = 14), o && (e.width = ut(i * ft(a)) + ut(t * pt(a)), e.height = ut(i * pt(a)) + ut(t * ft(a)))), d && (n.cache[d] = e)
                }
                return e
            },
            show: function (t) {
                return this.attr({
                    visibility: t ? "inherit" : "visible"
                })
            },
            hide: function () {
                return this.attr({
                    visibility: "hidden"
                })
            },
            fadeOut: function (t) {
                var e = this;
                e.animate({
                    opacity: 0
                }, {
                        duration: t || 150,
                        complete: function () {
                            e.attr({
                                y: -9999
                            })
                        }
                    })
            },
            add: function (t) {
                var e, i = this.renderer,
                    n = this.element;
                return t && (this.parentGroup = t), this.parentInverted = t && t.inverted, void 0 !== this.textStr && i.buildText(this), this.added = !0, (!t || t.handleZ || this.zIndex) && (e = this.zIndexSetter()), e || (t ? t.element : i.box).appendChild(n), this.onAdd && this.onAdd(), this
            },
            safeRemoveChild: function (t) {
                var e = t.parentNode;
                e && e.removeChild(t)
            },
            destroy: function () {
                var t, e, i = this,
                    n = i.element || {},
                    o = i.shadows,
                    s = i.renderer.isSVG && "SPAN" === n.nodeName && i.parentGroup;
                if (n.onclick = n.onmouseout = n.onmouseover = n.onmousemove = n.point = null, ie(i), i.clipPath && (i.clipPath = i.clipPath.destroy()), i.stops) {
                    for (e = 0; e < i.stops.length; e++) i.stops[e] = i.stops[e].destroy();
                    i.stops = null
                }
                for (i.safeRemoveChild(n), o && Vt(o, function (t) {
                    i.safeRemoveChild(t)
                }); s && s.div && 0 === s.div.childNodes.length;) n = s.parentGroup, i.safeRemoveChild(s.div), delete s.div, s = n;
                i.alignTo && l(i.renderer.alignedObjects, i);
                for (t in i) delete i[t];
                return null
            },
            shadow: function (t, e, i) {
                var n, o, s, r, a, l, c = [],
                    h = this.element;
                if (t) {
                    for (r = Nt(t.width, 3), a = (t.opacity || .15) / r, l = this.parentInverted ? "(-1,-1)" : "(" + Nt(t.offsetX, 1) + ", " + Nt(t.offsetY, 1) + ")", n = 1; r >= n; n++) o = h.cloneNode(0), s = 2 * r + 1 - 2 * n, d(o, {
                        isShadow: "true",
                        stroke: t.color || "black",
                        "stroke-opacity": a * n,
                        "stroke-width": s,
                        transform: "translate" + l,
                        fill: Bt
                    }), i && (d(o, "height", dt(d(o, "height") - s, 0)), o.cutHeight = s), e ? e.element.appendChild(o) : h.parentNode.insertBefore(o, h), c.push(o);
                    this.shadows = c
                }
                return this
            },
            xGetter: function (t) {
                return "circle" === this.element.nodeName && (t = {
                    x: "cx",
                    y: "cy"
                }[t] || t), this._defaultGetter(t)
            },
            _defaultGetter: function (t) {
                return t = Nt(this[t], this.element ? this.element.getAttribute(t) : null, 0), /^[\-0-9\.]+$/.test(t) && (t = parseFloat(t)), t
            },
            dSetter: function (t, e, i) {
                t && t.join && (t = t.join(" ")), /(NaN| {2}|^$)/.test(t) && (t = "M 0 0"), i.setAttribute(e, t), this[e] = t
            },
            dashstyleSetter: function (t) {
                var i;
                if (t = t && t.toLowerCase()) {
                    for (t = t.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(","), i = t.length; i--;) t[i] = e(t[i]) * this["stroke-width"];
                    t = t.join(",").replace("NaN", "none"), this.element.setAttribute("stroke-dasharray", t)
                }
            },
            alignSetter: function (t) {
                this.element.setAttribute("text-anchor", {
                    left: "start",
                    center: "middle",
                    right: "end"
                }[t])
            },
            opacitySetter: function (t, e, i) {
                this[e] = t, i.setAttribute(e, t)
            },
            titleSetter: function (t) {
                var e = this.element.getElementsByTagName("title")[0];
                e || (e = ot.createElementNS(Ct, "title"), this.element.appendChild(e)), e.appendChild(ot.createTextNode(String(Nt(t), "").replace(/<[^>]*>/g, "")))
            },
            textSetter: function (t) {
                t !== this.textStr && (delete this.bBox, this.textStr = t, this.added && this.renderer.buildText(this))
            },
            fillSetter: function (t, e, i) {
                "string" == typeof t ? i.setAttribute(e, t) : t && this.colorGradient(t, e, i)
            },
            visibilitySetter: function (t, e, i) {
                "inherit" === t ? i.removeAttribute(e) : i.setAttribute(e, t)
            },
            zIndexSetter: function (t, i) {
                var n, o, s, r = this.renderer,
                    a = this.parentGroup,
                    r = (a || r).element || r.box,
                    l = this.element;
                n = this.added;
                var h;
                if (c(t) && (l.setAttribute(i, t), t = +t, this[i] === t && (n = !1), this[i] = t), n) {
                    for ((t = this.zIndex) && a && (a.handleZ = !0), a = r.childNodes, h = 0; h < a.length && !s; h++) n = a[h], o = d(n, "zIndex"), n !== l && (e(o) > t || !c(t) && c(o)) && (r.insertBefore(l, n), s = !0);
                    s || r.appendChild(l)
                }
                return s
            },
            _defaultSetter: function (t, e, i) {
                i.setAttribute(e, t)
            }
        }, M.prototype.yGetter = M.prototype.xGetter, M.prototype.translateXSetter = M.prototype.translateYSetter = M.prototype.rotationSetter = M.prototype.verticalAlignSetter = M.prototype.scaleXSetter = M.prototype.scaleYSetter = function (t, e) {
            this[e] = t, this.doTransform = !0
        }, M.prototype["stroke-widthSetter"] = M.prototype.strokeSetter = function (t, e, i) {
            this[e] = t, this.stroke && this["stroke-width"] ? (this.strokeWidth = this["stroke-width"], M.prototype.fillSetter.call(this, this.stroke, "stroke", i), i.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === e && 0 === t && this.hasStroke && (i.removeAttribute("stroke"), this.hasStroke = !1)
        };
        var le = function () {
            this.init.apply(this, arguments)
        };
        if (le.prototype = {
            Element: M,
            init: function (t, e, i, n, o, s) {
                var r, a = location,
                    n = this.createElement("svg").attr({
                        version: "1.1"
                    }).css(this.getStyle(n));
                r = n.element, t.appendChild(r), -1 === t.innerHTML.indexOf("xmlns") && d(r, "xmlns", Ct), this.isSVG = !0, this.box = r, this.boxWrapper = n, this.alignedObjects = [], this.url = (kt || wt) && ot.getElementsByTagName("base").length ? a.href.replace(/#.*?$/, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "", this.createElement("desc").add().element.appendChild(ot.createTextNode("Created with Highcharts 4.1.9")), this.defs = this.createElement("defs").add(), this.allowHTML = s, this.forExport = o, this.gradients = {}, this.cache = {}, this.setSize(e, i, !1);
                var l;
                kt && t.getBoundingClientRect && (this.subPixelFix = e = function () {
                    u(t, {
                        left: 0,
                        top: 0
                    }), l = t.getBoundingClientRect(), u(t, {
                        left: ct(l.left) - l.left + "px",
                        top: ct(l.top) - l.top + "px"
                    })
                }, e(), Jt(st, "resize", e))
            },
            getStyle: function (t) {
                return this.style = jt({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, t)
            },
            isHidden: function () {
                return !this.boxWrapper.getBBox().width
            },
            destroy: function () {
                var t = this.defs;
                return this.box = null, this.boxWrapper = this.boxWrapper.destroy(), _(this.gradients || {}), this.gradients = null, t && (this.defs = t.destroy()), this.subPixelFix && Zt(st, "resize", this.subPixelFix), this.alignedObjects = null
            },
            createElement: function (t) {
                var e = new this.Element;
                return e.init(this, t), e
            },
            draw: function () { },
            getRadialAttr: function (t, e) {
                return {
                    cx: t[0] - t[2] / 2 + e.cx * t[2],
                    cy: t[1] - t[2] / 2 + e.cy * t[2],
                    r: e.r * t[2]
                }
            },
            buildText: function (t) {
                for (var i, n, o = t.element, s = this, r = s.forExport, a = Nt(t.textStr, "").toString(), l = -1 !== a.indexOf("<"), c = o.childNodes, h = d(o, "x"), p = t.styles, f = t.textWidth, m = p && p.lineHeight, g = p && p.textShadow, v = p && "ellipsis" === p.textOverflow, y = c.length, b = f && !t.added && this.box, x = function (t) {
                    return m ? e(m) : s.fontMetrics(/(px|em)$/.test(t && t.style.fontSize) ? t.style.fontSize : p && p.fontSize || s.style.fontSize || 12, t).h
                }, w = function (t) {
                    return t.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
                }; y--;) o.removeChild(c[y]);
                l || g || v || -1 !== a.indexOf(" ") ? (i = /<.*style="([^"]+)".*>/, n = /<.*href="(http[^"]+)".*>/, b && b.appendChild(o), a = l ? a.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(/<br.*?>/g) : [a], "" === a[a.length - 1] && a.pop(), Vt(a, function (e, a) {
                    var l, c = 0,
                        e = e.replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||");
                    l = e.split("|||"), Vt(l, function (e) {
                        if ("" !== e || 1 === l.length) {
                            var m, g = {},
                                y = ot.createElementNS(Ct, "tspan");
                            if (i.test(e) && (m = e.match(i)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), d(y, "style", m)), n.test(e) && !r && (d(y, "onclick", 'location.href="' + e.match(n)[1] + '"'), u(y, {
                                cursor: "pointer"
                            })), e = w(e.replace(/<(.|\n)*?>/g, "") || " "), " " !== e) {
                                if (y.appendChild(ot.createTextNode(e)), c ? g.dx = 0 : a && null !== h && (g.x = h), d(y, g), o.appendChild(y), !c && a && (!Tt && r && u(y, {
                                    display: "block"
                                }), d(y, "dy", x(y))), f) {
                                    for (var b, k, _, g = e.replace(/([^\^])-/g, "$1- ").split(" "), C = l.length > 1 || a || g.length > 1 && "nowrap" !== p.whiteSpace, T = [], $ = x(y), S = 1, P = t.rotation, M = e, A = M.length;
                                        (C || v) && (g.length || T.length);) t.rotation = 0, b = t.getBBox(!0), _ = b.width, !Tt && s.forExport && (_ = s.measureSpanWidth(y.firstChild.data, t.styles)), b = _ > f, void 0 === k && (k = b), v && k ? (A /= 2, "" === M || !b && .5 > A ? g = [] : (b && (k = !0), M = e.substring(0, M.length + (b ? -1 : 1) * ct(A)), g = [M + (f > 3 ? "…" : "")], y.removeChild(y.firstChild))) : b && 1 !== g.length ? (y.removeChild(y.firstChild), T.unshift(g.pop())) : (g = T, T = [], g.length && (S++ , y = ot.createElementNS(Ct, "tspan"), d(y, {
                                            dy: $,
                                            x: h
                                        }), m && d(y, "style", m), o.appendChild(y)), _ > f && (f = _)), g.length && y.appendChild(ot.createTextNode(g.join(" ").replace(/- /g, "-")));
                                    k && t.attr("title", t.textStr), t.rotation = P
                                }
                                c++
                            }
                        }
                    })
                }), b && b.removeChild(o), g && t.applyTextShadow && t.applyTextShadow(g)) : o.appendChild(ot.createTextNode(w(a)))
            },
            getContrast: function (t) {
                return t = ae(t).rgba, t[0] + t[1] + t[2] > 384 ? "#000000" : "#FFFFFF"
            },
            button: function (e, i, n, o, s, r, a, l, c) {
                var d, h, u, p, f, m, g = this.label(e, i, n, c, null, null, null, null, "button"),
                    v = 0,
                    e = {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    s = t({
                        "stroke-width": 1,
                        stroke: "#CCCCCC",
                        fill: {
                            linearGradient: e,
                            stops: [
                                [0, "#FEFEFE"],
                                [1, "#F6F6F6"]
                            ]
                        },
                        r: 2,
                        padding: 5,
                        style: {
                            color: "black"
                        }
                    }, s);
                return u = s.style, delete s.style, r = t(s, {
                    stroke: "#68A",
                    fill: {
                        linearGradient: e,
                        stops: [
                            [0, "#FFF"],
                            [1, "#ACF"]
                        ]
                    }
                }, r), p = r.style, delete r.style, a = t(s, {
                    stroke: "#68A",
                    fill: {
                        linearGradient: e,
                        stops: [
                            [0, "#9BD"],
                            [1, "#CDF"]
                        ]
                    }
                }, a), f = a.style, delete a.style, l = t(s, {
                    style: {
                        color: "#CCC"
                    }
                }, l), m = l.style, delete l.style, Jt(g.element, bt ? "mouseover" : "mouseenter", function () {
                    3 !== v && g.attr(r).css(p)
                }), Jt(g.element, bt ? "mouseout" : "mouseleave", function () {
                    3 !== v && (d = [s, r, a][v], h = [u, p, f][v], g.attr(d).css(h))
                }), g.setState = function (t) {
                    (g.state = v = t) ? 2 === t ? g.attr(a).css(f) : 3 === t && g.attr(l).css(m) : g.attr(s).css(u)
                }, g.on("click", function (t) {
                    3 !== v && o.call(g, t)
                }).attr(s).css(jt({
                    cursor: "default"
                }, u))
            },
            crispLine: function (t, e) {
                return t[1] === t[4] && (t[1] = t[4] = at(t[1]) - e % 2 / 2), t[2] === t[5] && (t[2] = t[5] = at(t[2]) + e % 2 / 2), t
            },
            path: function (t) {
                var e = {
                    fill: Bt
                };
                return o(t) ? e.d = t : n(t) && jt(e, t), this.createElement("path").attr(e)
            },
            circle: function (t, e, i) {
                return t = n(t) ? t : {
                    x: t,
                    y: e,
                    r: i
                }, e = this.createElement("circle"), e.xSetter = function (t) {
                    this.element.setAttribute("cx", t)
                }, e.ySetter = function (t) {
                    this.element.setAttribute("cy", t)
                }, e.attr(t)
            },
            arc: function (t, e, i, o, s, r) {
                return n(t) && (e = t.y, i = t.r, o = t.innerR, s = t.start, r = t.end, t = t.x), t = this.symbol("arc", t || 0, e || 0, i || 0, i || 0, {
                    innerR: o || 0,
                    start: s || 0,
                    end: r || 0
                }), t.r = i, t
            },
            rect: function (t, e, i, o, s, r) {
                var s = n(t) ? t.r : s,
                    a = this.createElement("rect"),
                    t = n(t) ? t : t === L ? {} : {
                        x: t,
                        y: e,
                        width: dt(i, 0),
                        height: dt(o, 0)
                    };
                return r !== L && (t.strokeWidth = r, t = a.crisp(t)), s && (t.r = s), a.rSetter = function (t) {
                    d(this.element, {
                        rx: t,
                        ry: t
                    })
                }, a.attr(t)
            },
            setSize: function (t, e, i) {
                var n = this.alignedObjects,
                    o = n.length;
                for (this.width = t, this.height = e, this.boxWrapper[Nt(i, !0) ? "animate" : "attr"]({
                    width: t,
                    height: e
                }); o--;) n[o].align()
            },
            g: function (t) {
                var e = this.createElement("g");
                return c(t) ? e.attr({
                    "class": "highcharts-" + t
                }) : e
            },
            image: function (t, e, i, n, o) {
                var s = {
                    preserveAspectRatio: Bt
                };
                return arguments.length > 1 && jt(s, {
                    x: e,
                    y: i,
                    width: n,
                    height: o
                }), s = this.createElement("image").attr(s), s.element.setAttributeNS ? s.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", t) : s.element.setAttribute("hc-svg-href", t), s
            },
            symbol: function (t, e, i, n, o, s) {
                var r, a, l, c = this.symbols[t],
                    c = c && c(at(e), at(i), n, o, s),
                    d = /^url\((.*?)\)$/;
                return c ? (r = this.path(c), jt(r, {
                    symbolName: t,
                    x: e,
                    y: i,
                    width: n,
                    height: o
                }), s && jt(r, s)) : d.test(t) && (l = function (t, e) {
                    t.element && (t.attr({
                        width: e[0],
                        height: e[1]
                    }), t.alignByTranslate || t.translate(at((n - e[0]) / 2), at((o - e[1]) / 2)))
                }, a = t.match(d)[1], t = Pt[a] || s && s.width && s.height && [s.width, s.height], r = this.image(a).attr({
                    x: e,
                    y: i
                }), r.isImg = !0, t ? l(r, t) : (r.attr({
                    width: 0,
                    height: 0
                }), p("img", {
                    onload: function () {
                        0 === this.width && (u(this, {
                            position: "absolute",
                            top: "-999em"
                        }), document.body.appendChild(this)), l(r, Pt[a] = [this.width, this.height]), this.parentNode && this.parentNode.removeChild(this)
                    },
                    src: a
                }))), r
            },
            symbols: {
                circle: function (t, e, i, n) {
                    var o = .166 * i;
                    return ["M", t + i / 2, e, "C", t + i + o, e, t + i + o, e + n, t + i / 2, e + n, "C", t - o, e + n, t - o, e, t + i / 2, e, "Z"]
                },
                square: function (t, e, i, n) {
                    return ["M", t, e, "L", t + i, e, t + i, e + n, t, e + n, "Z"]
                },
                triangle: function (t, e, i, n) {
                    return ["M", t + i / 2, e, "L", t + i, e + n, t, e + n, "Z"]
                },
                "triangle-down": function (t, e, i, n) {
                    return ["M", t, e, "L", t + i, e, t + i / 2, e + n, "Z"]
                },
                diamond: function (t, e, i, n) {
                    return ["M", t + i / 2, e, "L", t + i, e + n / 2, t + i / 2, e + n, t, e + n / 2, "Z"]
                },
                arc: function (t, e, i, n, o) {
                    var s = o.start,
                        i = o.r || i || n,
                        r = o.end - .001,
                        n = o.innerR,
                        a = o.open,
                        l = pt(s),
                        c = ft(s),
                        d = pt(r),
                        r = ft(r),
                        o = o.end - s < mt ? 0 : 1;
                    return ["M", t + i * l, e + i * c, "A", i, i, 0, o, 1, t + i * d, e + i * r, a ? "M" : "L", t + n * d, e + n * r, "A", n, n, 0, o, 0, t + n * l, e + n * c, a ? "" : "Z"]
                },
                callout: function (t, e, i, n, o) {
                    var s, r = ht(o && o.r || 0, i, n),
                        a = r + 6,
                        l = o && o.anchorX,
                        o = o && o.anchorY;
                    return s = ["M", t + r, e, "L", t + i - r, e, "C", t + i, e, t + i, e, t + i, e + r, "L", t + i, e + n - r, "C", t + i, e + n, t + i, e + n, t + i - r, e + n, "L", t + r, e + n, "C", t, e + n, t, e + n, t, e + n - r, "L", t, e + r, "C", t, e, t, e, t + r, e], l && l > i && o > e + a && e + n - a > o ? s.splice(13, 3, "L", t + i, o - 6, t + i + 6, o, t + i, o + 6, t + i, e + n - r) : l && 0 > l && o > e + a && e + n - a > o ? s.splice(33, 3, "L", t, o + 6, t - 6, o, t, o - 6, t, e + r) : o && o > n && l > t + a && t + i - a > l ? s.splice(23, 3, "L", l + 6, e + n, l, e + n + 6, l - 6, e + n, t + r, e + n) : o && 0 > o && l > t + a && t + i - a > l && s.splice(3, 3, "L", l - 6, e, l, e - 6, l + 6, e, i - r, e), s
                }
            },
            clipRect: function (t, e, i, n) {
                var o = "highcharts-" + Mt++,
                    s = this.createElement("clipPath").attr({
                        id: o
                    }).add(this.defs),
                    t = this.rect(t, e, i, n, 0).add(s);
                return t.id = o, t.clipPath = s, t.count = 0, t
            },
            text: function (t, e, i, n) {
                var o = St || !Tt && this.forExport,
                    s = {};
                return !n || !this.allowHTML && this.forExport ? (s.x = Math.round(e || 0), i && (s.y = Math.round(i)), (t || 0 === t) && (s.text = t), t = this.createElement("text").attr(s), o && t.css({
                    position: "absolute"
                }), n || (t.xSetter = function (t, e, i) {
                    var n, o, s = i.getElementsByTagName("tspan"),
                        r = i.getAttribute(e);
                    for (o = 0; o < s.length; o++) n = s[o], n.getAttribute(e) === r && n.setAttribute(e, t);
                    i.setAttribute(e, t)
                }), t) : this.html(t, e, i)
            },
            fontMetrics: function (t, i) {
                var n, o, t = t || this.style.fontSize;
                return !t && i && st.getComputedStyle && (i = i.element || i, t = (n = st.getComputedStyle(i, "")) && n.fontSize), t = /px/.test(t) ? e(t) : /em/.test(t) ? 12 * parseFloat(t) : 12, n = 24 > t ? t + 3 : at(1.2 * t), o = at(.8 * n), {
                    h: n,
                    b: o,
                    f: t
                }
            },
            rotCorr: function (t, e, i) {
                var n = t;
                return e && i && (n = dt(n * pt(e * gt), 4)), {
                    x: -t / 3 * ft(e * gt),
                    y: n
                }
            },
            label: function (e, i, n, o, s, r, a, l, d) {
                function h() {
                    var t, e;
                    t = C.element.style, m = (void 0 === g || void 0 === v || _.styles.textAlign) && c(C.textStr) && C.getBBox(), _.width = (g || m.width || 0) + 2 * $ + S, _.height = (v || m.height || 0) + 2 * $, x = $ + k.fontMetrics(t && t.fontSize, C).b, w && (f || (t = at(-T * $) + P, e = (l ? -x : 0) + P, _.box = f = o ? k.symbol(o, t, e, _.width, _.height, A) : k.rect(t, e, _.width, _.height, 0, A[It]), f.isImg || f.attr("fill", Bt), f.add(_)), f.isImg || f.attr(jt({
                        width: at(_.width),
                        height: at(_.height)
                    }, A)), A = null)
                }

                function u() {
                    var t, e = _.styles,
                        e = e && e.textAlign,
                        i = S + $ * (1 - T);
                    t = l ? 0 : x, c(g) && m && ("center" === e || "right" === e) && (i += {
                        center: .5,
                        right: 1
                    }[e] * (g - m.width)), (i !== C.x || t !== C.y) && (C.attr("x", i), t !== L && C.attr("y", t)), C.x = i, C.y = t
                }

                function p(t, e) {
                    f ? f.attr(t, e) : A[t] = e
                }
                var f, m, g, v, y, b, x, w, k = this,
                    _ = k.g(d),
                    C = k.text("", 0, 0, a).attr({
                        zIndex: 1
                    }),
                    T = 0,
                    $ = 3,
                    S = 0,
                    P = 0,
                    A = {};
                _.onAdd = function () {
                    C.add(_), _.attr({
                        text: e || 0 === e ? e : "",
                        x: i,
                        y: n
                    }), f && c(s) && _.attr({
                        anchorX: s,
                        anchorY: r
                    })
                }, _.widthSetter = function (t) {
                    g = t
                }, _.heightSetter = function (t) {
                    v = t
                }, _.paddingSetter = function (t) {
                    c(t) && t !== $ && ($ = _.padding = t, u())
                }, _.paddingLeftSetter = function (t) {
                    c(t) && t !== S && (S = t, u())
                }, _.alignSetter = function (t) {
                    T = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[t]
                }, _.textSetter = function (t) {
                    t !== L && C.textSetter(t), h(), u()
                }, _["stroke-widthSetter"] = function (t, e) {
                    t && (w = !0), P = t % 2 / 2, p(e, t)
                }, _.strokeSetter = _.fillSetter = _.rSetter = function (t, e) {
                    "fill" === e && t && (w = !0), p(e, t)
                }, _.anchorXSetter = function (t, e) {
                    s = t, p(e, at(t) - P - y)
                }, _.anchorYSetter = function (t, e) {
                    r = t, p(e, t - b)
                }, _.xSetter = function (t) {
                    _.x = t, T && (t -= T * ((g || m.width) + $)), y = at(t), _.attr("translateX", y)
                }, _.ySetter = function (t) {
                    b = _.y = at(t), _.attr("translateY", b)
                };
                var E = _.css;
                return jt(_, {
                    css: function (e) {
                        if (e) {
                            var i = {},
                                e = t(e);
                            Vt(_.textProps, function (t) {
                                e[t] !== L && (i[t] = e[t], delete e[t])
                            }), C.css(i)
                        }
                        return E.call(_, e)
                    },
                    getBBox: function () {
                        return {
                            width: m.width + 2 * $,
                            height: m.height + 2 * $,
                            x: m.x - $,
                            y: m.y - $
                        }
                    },
                    shadow: function (t) {
                        return f && f.shadow(t), _
                    },
                    destroy: function () {
                        Zt(_.element, "mouseenter"), Zt(_.element, "mouseleave"), C && (C = C.destroy()), f && (f = f.destroy()), M.prototype.destroy.call(_), _ = k = h = u = p = null
                    }
                })
            }
        }, D = le, jt(M.prototype, {
            htmlCss: function (t) {
                var e = this.element;
                return (e = t && "SPAN" === e.tagName && t.width) && (delete t.width, this.textWidth = e, this.updateTransform()), t && "ellipsis" === t.textOverflow && (t.whiteSpace = "nowrap", t.overflow = "hidden"), this.styles = jt(this.styles, t), u(this.element, t), this
            },
            htmlGetBBox: function () {
                var t = this.element;
                return "text" === t.nodeName && (t.style.position = "absolute"), {
                    x: t.offsetLeft,
                    y: t.offsetTop,
                    width: t.offsetWidth,
                    height: t.offsetHeight
                }
            },
            htmlUpdateTransform: function () {
                if (this.added) {
                    var t = this.renderer,
                        i = this.element,
                        n = this.translateX || 0,
                        o = this.translateY || 0,
                        s = this.x || 0,
                        r = this.y || 0,
                        a = this.textAlign || "left",
                        l = {
                            left: 0,
                            center: .5,
                            right: 1
                        }[a],
                        d = this.shadows,
                        h = this.styles;
                    if (u(i, {
                        marginLeft: n,
                        marginTop: o
                    }), d && Vt(d, function (t) {
                        u(t, {
                            marginLeft: n + 1,
                            marginTop: o + 1
                        })
                    }), this.inverted && Vt(i.childNodes, function (e) {
                        t.invertChild(e, i)
                    }), "SPAN" === i.tagName) {
                        var p, f = this.rotation,
                            m = e(this.textWidth),
                            g = [f, a, i.innerHTML, this.textWidth, this.textAlign].join(",");
                        g !== this.cTT && (p = t.fontMetrics(i.style.fontSize).b, c(f) && this.setSpanRotation(f, l, p), d = Nt(this.elemWidth, i.offsetWidth), d > m && /[ \-]/.test(i.textContent || i.innerText) && (u(i, {
                            width: m + "px",
                            display: "block",
                            whiteSpace: h && h.whiteSpace || "normal"
                        }), d = m), this.getSpanCorrection(d, p, l, f, a)), u(i, {
                            left: s + (this.xCorr || 0) + "px",
                            top: r + (this.yCorr || 0) + "px"
                        }), wt && (p = i.offsetHeight), this.cTT = g
                    }
                } else this.alignOnAdd = !0
            },
            setSpanRotation: function (t, e, i) {
                var n = {},
                    o = bt ? "-ms-transform" : wt ? "-webkit-transform" : kt ? "MozTransform" : yt ? "-o-transform" : "";
                n[o] = n.transform = "rotate(" + t + "deg)", n[o + (kt ? "Origin" : "-origin")] = n.transformOrigin = 100 * e + "% " + i + "px", u(this.element, n)
            },
            getSpanCorrection: function (t, e, i) {
                this.xCorr = -t * i, this.yCorr = -e
            }
        }), jt(le.prototype, {
            html: function (t, e, i) {
                var n = this.createElement("span"),
                    o = n.element,
                    s = n.renderer;
                return n.textSetter = function (t) {
                    t !== o.innerHTML && delete this.bBox, o.innerHTML = this.textStr = t, n.htmlUpdateTransform()
                }, n.xSetter = n.ySetter = n.alignSetter = n.rotationSetter = function (t, e) {
                    "align" === e && (e = "textAlign"), n[e] = t, n.htmlUpdateTransform()
                }, n.attr({
                    text: t,
                    x: at(e),
                    y: at(i)
                }).css({
                    position: "absolute",
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize
                }), o.style.whiteSpace = "nowrap", n.css = n.htmlCss, s.isSVG && (n.add = function (t) {
                    var e, i = s.box.parentNode,
                        r = [];
                    if (this.parentGroup = t) {
                        if (e = t.div, !e) {
                            for (; t;) r.push(t), t = t.parentGroup;
                            Vt(r.reverse(), function (t) {
                                var n, o = d(t.element, "class");
                                o && (o = {
                                    className: o
                                }), e = t.div = t.div || p(Dt, o, {
                                    position: "absolute",
                                    left: (t.translateX || 0) + "px",
                                    top: (t.translateY || 0) + "px"
                                }, e || i), n = e.style, jt(t, {
                                    translateXSetter: function (e, i) {
                                        n.left = e + "px", t[i] = e, t.doTransform = !0
                                    },
                                    translateYSetter: function (e, i) {
                                        n.top = e + "px", t[i] = e, t.doTransform = !0
                                    }
                                }), Vt(["opacity", "visibility"], function (e) {
                                    zt(t, e + "Setter", function (t, e, i, o) {
                                        t.call(this, e, i, o), n[i] = e
                                    })
                                })
                            })
                        }
                    } else e = i;
                    return e.appendChild(o), n.added = !0, n.alignOnAdd && n.htmlUpdateTransform(), n
                }), n
            }
        }), !Tt && !St) {
            qt = {
                init: function (t, e) {
                    var i = ["<", e, ' filled="f" stroked="f"'],
                        n = ["position: ", "absolute", ";"],
                        o = e === Dt;
                    ("shape" === e || o) && n.push("left:0;top:0;width:1px;height:1px;"), n.push("visibility: ", o ? "hidden" : "visible"), i.push(' style="', n.join(""), '"/>'), e && (i = o || "span" === e || "img" === e ? i.join("") : t.prepVML(i), this.element = p(i)), this.renderer = t
                },
                add: function (t) {
                    var e = this.renderer,
                        i = this.element,
                        n = e.box,
                        n = t ? t.element || t : n;
                    return t && t.inverted && e.invertChild(i, n), n.appendChild(i), this.added = !0, this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform(), this.onAdd && this.onAdd(), this
                },
                updateTransform: M.prototype.htmlUpdateTransform,
                setSpanRotation: function () {
                    var t = this.rotation,
                        e = pt(t * gt),
                        i = ft(t * gt);
                    u(this.element, {
                        filter: t ? ["progid:DXImageTransform.Microsoft.Matrix(M11=", e, ", M12=", -i, ", M21=", i, ", M22=", e, ", sizingMethod='auto expand')"].join("") : Bt
                    })
                },
                getSpanCorrection: function (t, e, i, n, o) {
                    var s, r = n ? pt(n * gt) : 1,
                        a = n ? ft(n * gt) : 0,
                        l = Nt(this.elemHeight, this.element.offsetHeight);
                    this.xCorr = 0 > r && -t, this.yCorr = 0 > a && -l, s = 0 > r * a, this.xCorr += a * e * (s ? 1 - i : i), this.yCorr -= r * e * (n ? s ? i : 1 - i : 1), o && "left" !== o && (this.xCorr -= t * i * (0 > r ? -1 : 1), n && (this.yCorr -= l * i * (0 > a ? -1 : 1)), u(this.element, {
                        textAlign: o
                    }))
                },
                pathToVML: function (t) {
                    for (var e = t.length, i = []; e--;) s(t[e]) ? i[e] = at(10 * t[e]) - 5 : "Z" === t[e] ? i[e] = "x" : (i[e] = t[e], !t.isArc || "wa" !== t[e] && "at" !== t[e] || (i[e + 5] === i[e + 7] && (i[e + 7] += t[e + 7] > t[e + 5] ? 1 : -1), i[e + 6] === i[e + 8] && (i[e + 8] += t[e + 8] > t[e + 6] ? 1 : -1)));
                    return i.join(" ") || "x"
                },
                clip: function (t) {
                    var e, i = this;
                    return t ? (e = t.members, l(e, i), e.push(i), i.destroyClip = function () {
                        l(e, i)
                    }, t = t.getCSS(i)) : (i.destroyClip && i.destroyClip(), t = {
                        clip: xt ? "inherit" : "rect(auto)"
                    }), i.css(t)
                },
                css: M.prototype.htmlCss,
                safeRemoveChild: function (t) {
                    t.parentNode && C(t)
                },
                destroy: function () {
                    return this.destroyClip && this.destroyClip(), M.prototype.destroy.apply(this)
                },
                on: function (t, e) {
                    return this.element["on" + t] = function () {
                        var t = st.event;
                        t.target = t.srcElement, e(t)
                    }, this
                },
                cutOffPath: function (t, i) {
                    var n, t = t.split(/[ ,]/);
                    return n = t.length, (9 === n || 11 === n) && (t[n - 4] = t[n - 2] = e(t[n - 2]) - 10 * i), t.join(" ")
                },
                shadow: function (t, i, n) {
                    var o, s, r, a, l, c, d, h = [],
                        u = this.element,
                        f = this.renderer,
                        m = u.style,
                        g = u.path;
                    if (g && "string" != typeof g.value && (g = "x"), l = g, t) {
                        for (c = Nt(t.width, 3), d = (t.opacity || .15) / c, o = 1; 3 >= o; o++) a = 2 * c + 1 - 2 * o, n && (l = this.cutOffPath(g.value, a + .5)), r = ['<shape isShadow="true" strokeweight="', a, '" filled="false" path="', l, '" coordsize="10 10" style="', u.style.cssText, '" />'], s = p(f.prepVML(r), null, {
                            left: e(m.left) + Nt(t.offsetX, 1),
                            top: e(m.top) + Nt(t.offsetY, 1)
                        }), n && (s.cutOff = a + 1), r = ['<stroke color="', t.color || "black", '" opacity="', d * o, '"/>'], p(f.prepVML(r), null, null, s), i ? i.element.appendChild(s) : u.parentNode.insertBefore(s, u), h.push(s);
                        this.shadows = h
                    }
                    return this
                },
                updateShadows: At,
                setAttr: function (t, e) {
                    xt ? this.element[t] = e : this.element.setAttribute(t, e)
                },
                classSetter: function (t) {
                    this.element.className = t
                },
                dashstyleSetter: function (t, e, i) {
                    (i.getElementsByTagName("stroke")[0] || p(this.renderer.prepVML(["<stroke/>"]), null, null, i))[e] = t || "solid", this[e] = t
                },
                dSetter: function (t, e, i) {
                    var n = this.shadows,
                        t = t || [];
                    if (this.d = t.join && t.join(" "), i.path = t = this.pathToVML(t), n)
                        for (i = n.length; i--;) n[i].path = n[i].cutOff ? this.cutOffPath(t, n[i].cutOff) : t;
                    this.setAttr(e, t)
                },
                fillSetter: function (t, e, i) {
                    var n = i.nodeName;
                    "SPAN" === n ? i.style.color = t : "IMG" !== n && (i.filled = t !== Bt, this.setAttr("fillcolor", this.renderer.color(t, i, e, this)))
                },
                opacitySetter: At,
                rotationSetter: function (t, e, i) {
                    i = i.style, this[e] = i[e] = t, i.left = -at(ft(t * gt) + 1) + "px", i.top = at(pt(t * gt)) + "px"
                },
                strokeSetter: function (t, e, i) {
                    this.setAttr("strokecolor", this.renderer.color(t, i, e))
                },
                "stroke-widthSetter": function (t, e, i) {
                    i.stroked = !!t, this[e] = t, s(t) && (t += "px"), this.setAttr("strokeweight", t)
                },
                titleSetter: function (t, e) {
                    this.setAttr(e, t)
                },
                visibilitySetter: function (t, e, i) {
                    "inherit" === t && (t = "visible"), this.shadows && Vt(this.shadows, function (i) {
                        i.style[e] = t
                    }), "DIV" === i.nodeName && (t = "hidden" === t ? "-999em" : 0, xt || (i.style[e] = t ? "visible" : "hidden"), e = "top"), i.style[e] = t
                },
                xSetter: function (t, e, i) {
                    this[e] = t, "x" === e ? e = "left" : "y" === e && (e = "top"), this.updateClipping ? (this[e] = t, this.updateClipping()) : i.style[e] = t
                },
                zIndexSetter: function (t, e, i) {
                    i.style[e] = t
                }
            }, nt.VMLElement = qt = f(M, qt), qt.prototype.ySetter = qt.prototype.widthSetter = qt.prototype.heightSetter = qt.prototype.xSetter;
            var ce = {
                Element: qt,
                isIE8: vt.indexOf("MSIE 8.0") > -1,
                init: function (t, e, i, n) {
                    var o;
                    if (this.alignedObjects = [], n = this.createElement(Dt).css(jt(this.getStyle(n), {
                        position: "relative"
                    })), o = n.element, t.appendChild(n.element), this.isVML = !0, this.box = o, this.boxWrapper = n, this.cache = {}, this.setSize(e, i, !1), !ot.namespaces.hcv) {
                        ot.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
                        try {
                            ot.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                        } catch (s) {
                            ot.styleSheets[0].cssText += "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                        }
                    }
                },
                isHidden: function () {
                    return !this.box.offsetWidth
                },
                clipRect: function (t, e, i, o) {
                    var s = this.createElement(),
                        r = n(t);
                    return jt(s, {
                        members: [],
                        count: 0,
                        left: (r ? t.x : t) + 1,
                        top: (r ? t.y : e) + 1,
                        width: (r ? t.width : i) - 1,
                        height: (r ? t.height : o) - 1,
                        getCSS: function (t) {
                            var e = t.element,
                                i = e.nodeName,
                                t = t.inverted,
                                n = this.top - ("shape" === i ? e.offsetTop : 0),
                                o = this.left,
                                e = o + this.width,
                                s = n + this.height,
                                n = {
                                    clip: "rect(" + at(t ? o : n) + "px," + at(t ? s : e) + "px," + at(t ? e : s) + "px," + at(t ? n : o) + "px)"
                                };
                            return !t && xt && "DIV" === i && jt(n, {
                                width: e + "px",
                                height: s + "px"
                            }), n
                        },
                        updateClipping: function () {
                            Vt(s.members, function (t) {
                                t.element && t.css(s.getCSS(t))
                            })
                        }
                    })
                },
                color: function (t, e, i, n) {
                    var o, s, r, a = this,
                        l = /^rgba/,
                        c = Bt;
                    if (t && t.linearGradient ? r = "gradient" : t && t.radialGradient && (r = "pattern"), r) {
                        var d, h, u, f, m, g, v, y, b = t.linearGradient || t.radialGradient,
                            x = "",
                            t = t.stops,
                            w = [],
                            k = function () {
                                s = ['<fill colors="' + w.join(",") + '" opacity="', m, '" o:opacity2="', f, '" type="', r, '" ', x, 'focus="100%" method="any" />'], p(a.prepVML(s), null, null, e)
                            };
                        if (u = t[0], y = t[t.length - 1], u[0] > 0 && t.unshift([0, u[1]]), y[0] < 1 && t.push([1, y[1]]), Vt(t, function (t, e) {
                            l.test(t[1]) ? (o = ae(t[1]), d = o.get("rgb"), h = o.get("a")) : (d = t[1], h = 1), w.push(100 * t[0] + "% " + d), e ? (m = h, g = d) : (f = h, v = d)
                        }), "fill" === i)
                            if ("gradient" === r) i = b.x1 || b[0] || 0, t = b.y1 || b[1] || 0, u = b.x2 || b[2] || 0, b = b.y2 || b[3] || 0, x = 'angle="' + (90 - 180 * rt.atan((b - t) / (u - i)) / mt) + '"', k();
                            else {
                                var _, c = b.r,
                                    C = 2 * c,
                                    T = 2 * c,
                                    $ = b.cx,
                                    S = b.cy,
                                    P = e.radialReference,
                                    c = function () {
                                        P && (_ = n.getBBox(), $ += (P[0] - _.x) / _.width - .5, S += (P[1] - _.y) / _.height - .5, C *= P[2] / _.width, T *= P[2] / _.height), x = 'src="' + H.global.VMLRadialGradientURL + '" size="' + C + "," + T + '" origin="0.5,0.5" position="' + $ + "," + S + '" color2="' + v + '" ', k()
                                    };
                                n.added ? c() : n.onAdd = c, c = g
                            } else c = d
                    } else l.test(t) && "IMG" !== e.tagName ? (o = ae(t), s = ["<", i, ' opacity="', o.get("a"), '"/>'], p(this.prepVML(s), null, null, e), c = o.get("rgb")) : (c = e.getElementsByTagName(i), c.length && (c[0].opacity = 1, c[0].type = "solid"), c = t);
                    return c
                },
                prepVML: function (t) {
                    var e = this.isIE8,
                        t = t.join("");
                    return e ? (t = t.replace("/>", ' xmlns="urn:schemas-microsoft-com:vml" />'), t = -1 === t.indexOf('style="') ? t.replace("/>", ' style="display:inline-block;behavior:url(#default#VML);" />') : t.replace('style="', 'style="display:inline-block;behavior:url(#default#VML);')) : t = t.replace("<", "<hcv:"), t
                },
                text: le.prototype.html,
                path: function (t) {
                    var e = {
                        coordsize: "10 10"
                    };
                    return o(t) ? e.d = t : n(t) && jt(e, t), this.createElement("shape").attr(e)
                },
                circle: function (t, e, i) {
                    var o = this.symbol("circle");
                    return n(t) && (i = t.r, e = t.y, t = t.x), o.isCircle = !0, o.r = i, o.attr({
                        x: t,
                        y: e
                    })
                },
                g: function (t) {
                    var e;
                    return t && (e = {
                        className: "highcharts-" + t,
                        "class": "highcharts-" + t
                    }), this.createElement(Dt).attr(e)
                },
                image: function (t, e, i, n, o) {
                    var s = this.createElement("img").attr({
                        src: t
                    });
                    return arguments.length > 1 && s.attr({
                        x: e,
                        y: i,
                        width: n,
                        height: o
                    }), s
                },
                createElement: function (t) {
                    return "rect" === t ? this.symbol(t) : le.prototype.createElement.call(this, t)
                },
                invertChild: function (t, i) {
                    var n = this,
                        o = i.style,
                        s = "IMG" === t.tagName && t.style;
                    u(t, {
                        flip: "x",
                        left: e(o.width) - (s ? e(s.top) : 1),
                        top: e(o.height) - (s ? e(s.left) : 1),
                        rotation: -90
                    }), Vt(t.childNodes, function (e) {
                        n.invertChild(e, t)
                    })
                },
                symbols: {
                    arc: function (t, e, i, n, o) {
                        var s = o.start,
                            r = o.end,
                            a = o.r || i || n,
                            i = o.innerR,
                            n = pt(s),
                            l = ft(s),
                            c = pt(r),
                            d = ft(r);
                        return r - s === 0 ? ["x"] : (s = ["wa", t - a, e - a, t + a, e + a, t + a * n, e + a * l, t + a * c, e + a * d], o.open && !i && s.push("e", "M", t, e), s.push("at", t - i, e - i, t + i, e + i, t + i * c, e + i * d, t + i * n, e + i * l, "x", "e"), s.isArc = !0, s)
                    },
                    circle: function (t, e, i, n, o) {
                        return o && (i = n = 2 * o.r), o && o.isCircle && (t -= i / 2, e -= n / 2), ["wa", t, e, t + i, e + n, t + i, e + n / 2, t + i, e + n / 2, "e"]
                    },
                    rect: function (t, e, i, n, o) {
                        return le.prototype.symbols[c(o) && o.r ? "callout" : "square"].call(0, t, e, i, n, o)
                    }
                }
            };
            nt.VMLRenderer = qt = function () {
                this.init.apply(this, arguments)
            }, qt.prototype = t(le.prototype, ce), D = qt
        }
        le.prototype.measureSpanWidth = function (t, e) {
            var i, n = ot.createElement("span");
            return i = ot.createTextNode(t), n.appendChild(i), u(n, e), this.box.appendChild(n), i = n.offsetWidth, C(n), i
        };
        var de;
        St && (nt.CanVGRenderer = qt = function () {
            Ct = "http://www.w3.org/1999/xhtml"
        }, qt.prototype.symbols = {}, de = function () {
            function t() {
                var t, i = e.length;
                for (t = 0; i > t; t++) e[t]();
                e = []
            }
            var e = [];
            return {
                push: function (i, n) {
                    0 === e.length && Xt(n, t), e.push(i)
                }
            }
        }(), D = qt), A.prototype = {
            addLabel: function () {
                var e, i = this.axis,
                    n = i.options,
                    o = i.chart,
                    s = i.categories,
                    r = i.names,
                    l = this.pos,
                    d = n.labels,
                    h = i.tickPositions,
                    u = l === h[0],
                    p = l === h[h.length - 1],
                    r = s ? Nt(s[l], r[l], l) : l,
                    s = this.label,
                    h = h.info;
                i.isDatetimeAxis && h && (e = n.dateTimeLabelFormats[h.higherRanks[l] || h.unitName]), this.isFirst = u, this.isLast = p, n = i.labelFormatter.call({
                    axis: i,
                    chart: o,
                    isFirst: u,
                    isLast: p,
                    dateTimeLabelFormat: e,
                    value: i.isLog ? $(a(r)) : r
                }), c(s) ? s && s.attr({
                    text: n
                }) : (this.labelLength = (this.label = s = c(n) && d.enabled ? o.renderer.text(n, 0, 0, d.useHTML).css(t(d.style)).add(i.labelGroup) : null) && s.getBBox().width, this.rotation = 0)
            },
            getLabelSize: function () {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            },
            handleOverflow: function (t) {
                var e, i = this.axis,
                    n = t.x,
                    o = i.chart.chartWidth,
                    s = i.chart.spacing,
                    r = Nt(i.labelLeft, ht(i.pos, s[3])),
                    s = Nt(i.labelRight, dt(i.pos + i.len, o - s[1])),
                    a = this.label,
                    l = this.rotation,
                    c = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[i.labelAlign],
                    d = a.getBBox().width,
                    h = i.slotWidth,
                    u = 1,
                    p = {};
                l ? 0 > l && r > n - c * d ? e = at(n / pt(l * gt) - r) : l > 0 && n + c * d > s && (e = at((o - n) / pt(l * gt))) : (o = n + (1 - c) * d, r > n - c * d ? h = t.x + h * (1 - c) - r : o > s && (h = s - t.x + h * c, u = -1), h = ht(i.slotWidth, h), h < i.slotWidth && "center" === i.labelAlign && (t.x += u * (i.slotWidth - h - c * (i.slotWidth - ht(d, h)))), (d > h || i.autoRotation && a.styles.width) && (e = h)), e && (p.width = e, i.options.labels.style.textOverflow || (p.textOverflow = "ellipsis"), a.css(p))
            },
            getPosition: function (t, e, i, n) {
                var o = this.axis,
                    s = o.chart,
                    r = n && s.oldChartHeight || s.chartHeight;
                return {
                    x: t ? o.translate(e + i, null, null, n) + o.transB : o.left + o.offset + (o.opposite ? (n && s.oldChartWidth || s.chartWidth) - o.right - o.left : 0),
                    y: t ? r - o.bottom + o.offset - (o.opposite ? o.height : 0) : r - o.translate(e + i, null, null, n) - o.transB
                }
            },
            getLabelPosition: function (t, e, i, n, o, s, r, a) {
                var l = this.axis,
                    c = l.transA,
                    d = l.reversed,
                    h = l.staggerLines,
                    u = l.tickRotCorr || {
                        x: 0,
                        y: 0
                    },
                    i = Nt(o.y, u.y + (2 === l.side ? 8 : -(i.getBBox().height / 2))),
                    t = t + o.x + u.x - (s && n ? s * c * (d ? -1 : 1) : 0),
                    e = e + i - (s && !n ? s * c * (d ? 1 : -1) : 0);
                return h && (e += r / (a || 1) % h * (l.labelOffset / h)), {
                    x: t,
                    y: at(e)
                }
            },
            getMarkPath: function (t, e, i, n, o, s) {
                return s.crispLine(["M", t, e, "L", t + (o ? 0 : -i), e + (o ? i : 0)], n)
            },
            render: function (t, e, i) {
                var n = this.axis,
                    o = n.options,
                    s = n.chart.renderer,
                    r = n.horiz,
                    a = this.type,
                    l = this.label,
                    c = this.pos,
                    d = o.labels,
                    h = this.gridLine,
                    u = a ? a + "Grid" : "grid",
                    p = a ? a + "Tick" : "tick",
                    f = o[u + "LineWidth"],
                    m = o[u + "LineColor"],
                    g = o[u + "LineDashStyle"],
                    v = o[p + "Length"],
                    u = Nt(o[p + "Width"], !a && n.isXAxis ? 1 : 0),
                    y = o[p + "Color"],
                    b = o[p + "Position"],
                    p = this.mark,
                    x = d.step,
                    w = !0,
                    k = n.tickmarkOffset,
                    _ = this.getPosition(r, c, k, e),
                    C = _.x,
                    _ = _.y,
                    T = r && C === n.pos + n.len || !r && _ === n.pos ? -1 : 1,
                    i = Nt(i, 1);
                this.isActive = !0, f && (c = n.getPlotLinePath(c + k, f * T, e, !0), h === L && (h = {
                    stroke: m,
                    "stroke-width": f
                }, g && (h.dashstyle = g), a || (h.zIndex = 1), e && (h.opacity = 0), this.gridLine = h = f ? s.path(c).attr(h).add(n.gridGroup) : null), !e && h && c && h[this.isNew ? "attr" : "animate"]({
                    d: c,
                    opacity: i
                })), u && v && ("inside" === b && (v = -v), n.opposite && (v = -v), a = this.getMarkPath(C, _, v, u * T, r, s), p ? p.animate({
                    d: a,
                    opacity: i
                }) : this.mark = s.path(a).attr({
                    stroke: y,
                    "stroke-width": u,
                    opacity: i
                }).add(n.axisGroup)), l && !isNaN(C) && (l.xy = _ = this.getLabelPosition(C, _, l, r, d, k, t, x), this.isFirst && !this.isLast && !Nt(o.showFirstLabel, 1) || this.isLast && !this.isFirst && !Nt(o.showLastLabel, 1) ? w = !1 : r && !n.isRadial && !d.step && !d.rotation && !e && 0 !== i && this.handleOverflow(_), x && t % x && (w = !1), w && !isNaN(_.y) ? (_.opacity = i, l[this.isNew ? "attr" : "animate"](_), this.isNew = !1) : l.attr("y", -9999))
            },
            destroy: function () {
                _(this, this.axis)
            }
        }, nt.PlotLineOrBand = function (t, e) {
            this.axis = t, e && (this.options = e, this.id = e.id)
        }, nt.PlotLineOrBand.prototype = {
            render: function () {
                var e, i = this,
                    n = i.axis,
                    o = n.horiz,
                    s = i.options,
                    a = s.label,
                    l = i.label,
                    d = s.width,
                    h = s.to,
                    u = s.from,
                    p = c(u) && c(h),
                    f = s.value,
                    m = s.dashStyle,
                    g = i.svgElem,
                    v = [],
                    y = s.color,
                    b = s.zIndex,
                    x = s.events,
                    _ = {},
                    C = n.chart.renderer;
                if (n.isLog && (u = r(u), h = r(h), f = r(f)), d) v = n.getPlotLinePath(f, d), _ = {
                    stroke: y,
                    "stroke-width": d
                }, m && (_.dashstyle = m);
                else {
                    if (!p) return;
                    v = n.getPlotBandPath(u, h, s), y && (_.fill = y), s.borderWidth && (_.stroke = s.borderColor, _["stroke-width"] = s.borderWidth)
                }
                if (c(b) && (_.zIndex = b), g) v ? g.animate({
                    d: v
                }, null, g.onGetPath) : (g.hide(), g.onGetPath = function () {
                    g.show()
                }, l && (i.label = l = l.destroy()));
                else if (v && v.length && (i.svgElem = g = C.path(v).attr(_).add(), x))
                    for (e in s = function (t) {
                        g.on(t, function (e) {
                            x[t].apply(i, [e])
                        })
                    }, x) s(e);
                return a && c(a.text) && v && v.length && n.width > 0 && n.height > 0 ? (a = t({
                    align: o && p && "center",
                    x: o ? !p && 4 : 10,
                    verticalAlign: !o && p && "middle",
                    y: o ? p ? 16 : 10 : p ? 6 : -4,
                    rotation: o && !p && 90
                }, a), l || (_ = {
                    align: a.textAlign || a.align,
                    rotation: a.rotation
                }, c(b) && (_.zIndex = b), i.label = l = C.text(a.text, 0, 0, a.useHTML).attr(_).css(a.style).add()), n = [v[1], v[4], p ? v[6] : v[1]], p = [v[2], v[5], p ? v[7] : v[2]], v = w(n), o = w(p), l.align(a, !1, {
                    x: v,
                    y: o,
                    width: k(n) - v,
                    height: k(p) - o
                }), l.show()) : l && l.hide(), i
            },
            destroy: function () {
                l(this.axis.plotLinesAndBands, this), delete this.axis, _(this)
            }
        };
        var he = nt.Axis = function () {
            this.init.apply(this, arguments)
        };
        he.prototype = {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: "%H:%M:%S.%L",
                    second: "%H:%M:%S",
                    minute: "%H:%M",
                    hour: "%H:%M",
                    day: "%e. %b",
                    week: "%e. %b",
                    month: "%b '%y",
                    year: "%Y"
                },
                endOnTick: !1,
                gridLineColor: "#D8D8D8",
                labels: {
                    enabled: !0,
                    style: {
                        color: "#606060",
                        cursor: "default",
                        fontSize: "11px"
                    },
                    x: 0,
                    y: 15
                },
                lineColor: "#C0D0E0",
                lineWidth: 1,
                minPadding: .01,
                maxPadding: .01,
                minorGridLineColor: "#E0E0E0",
                minorGridLineWidth: 1,
                minorTickColor: "#A0A0A0",
                minorTickLength: 2,
                minorTickPosition: "outside",
                startOfWeek: 1,
                startOnTick: !1,
                tickColor: "#C0D0E0",
                tickLength: 10,
                tickmarkPlacement: "between",
                tickPixelInterval: 100,
                tickPosition: "outside",
                title: {
                    align: "middle",
                    style: {
                        color: "#707070"
                    }
                },
                type: "linear"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                gridLineWidth: 1,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8,
                    y: 3
                },
                lineWidth: 0,
                maxPadding: .05,
                minPadding: .05,
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    enabled: !1,
                    formatter: function () {
                        return nt.numberFormat(this.total, -1)
                    },
                    style: t(ne.line.dataLabels.style, {
                        color: "#000000"
                    })
                }
            },
            defaultLeftAxisOptions: {
                labels: {
                    x: -15,
                    y: null
                },
                title: {
                    rotation: 270
                }
            },
            defaultRightAxisOptions: {
                labels: {
                    x: 15,
                    y: null
                },
                title: {
                    rotation: 90
                }
            },
            defaultBottomAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0,
                    y: null
                },
                title: {
                    rotation: 0
                }
            },
            defaultTopAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0,
                    y: -15
                },
                title: {
                    rotation: 0
                }
            },
            init: function (t, e) {
                var i = e.isX;
                this.chart = t, this.horiz = t.inverted ? !i : i, this.coll = (this.isXAxis = i) ? "xAxis" : "yAxis", this.opposite = e.opposite, this.side = e.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3), this.setOptions(e);
                var n = this.options,
                    o = n.type;
                this.labelFormatter = n.labels.formatter || this.defaultLabelFormatter, this.userOptions = e, this.minPixelPadding = 0, this.reversed = n.reversed, this.visible = n.visible !== !1, this.zoomEnabled = n.zoomEnabled !== !1, this.categories = n.categories || "category" === o, this.names = this.names || [], this.isLog = "logarithmic" === o, this.isDatetimeAxis = "datetime" === o, this.isLinked = c(n.linkedTo), this.ticks = {}, this.labelEdge = [], this.minorTicks = {}, this.plotLinesAndBands = [], this.alternateBands = {}, this.len = 0, this.minRange = this.userMinRange = n.minRange || n.maxZoom, this.range = n.range, this.offset = n.offset || 0, this.stacks = {}, this.oldStacks = {}, this.stacksTouched = 0, this.min = this.max = null, this.crosshair = Nt(n.crosshair, h(t.options.tooltip.crosshairs)[i ? 0 : 1], !1);
                var s, n = this.options.events; - 1 === Yt(this, t.axes) && (i && !this.isColorAxis ? t.axes.splice(t.xAxis.length, 0, this) : t.axes.push(this), t[this.coll].push(this)), this.series = this.series || [], t.inverted && i && this.reversed === L && (this.reversed = !0), this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
                for (s in n) Jt(this, s, n[s]);
                this.isLog && (this.val2lin = r, this.lin2val = a)
            },
            setOptions: function (e) {
                this.options = t(this.defaultOptions, this.isXAxis ? {} : this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], t(H[this.coll], e))
            },
            defaultLabelFormatter: function () {
                var t, e = this.axis,
                    i = this.value,
                    n = e.categories,
                    o = this.dateTimeLabelFormat,
                    s = H.lang.numericSymbols,
                    r = s && s.length,
                    a = e.options.labels.format,
                    e = e.isLog ? i : e.tickInterval;
                if (a) t = v(a, this);
                else if (n) t = i;
                else if (o) t = I(o, i);
                else if (r && e >= 1e3)
                    for (; r-- && t === L;) n = Math.pow(1e3, r + 1), e >= n && 10 * i % n === 0 && null !== s[r] && (t = nt.numberFormat(i / n, -1) + s[r]);
                return t === L && (t = ut(i) >= 1e4 ? nt.numberFormat(i, -1) : nt.numberFormat(i, -1, L, "")), t
            },
            getSeriesExtremes: function () {
                var t = this,
                    e = t.chart;
                t.hasVisibleSeries = !1, t.dataMin = t.dataMax = t.threshold = null, t.softThreshold = !t.isXAxis, t.buildStacks && t.buildStacks(), Vt(t.series, function (i) {
                    if (i.visible || !e.options.chart.ignoreHiddenSeries) {
                        var n, o = i.options,
                            s = o.threshold;
                        t.hasVisibleSeries = !0, t.isLog && 0 >= s && (s = null), t.isXAxis ? (o = i.xData, o.length && (t.dataMin = ht(Nt(t.dataMin, o[0]), w(o)), t.dataMax = dt(Nt(t.dataMax, o[0]), k(o)))) : (i.getExtremes(), n = i.dataMax, i = i.dataMin, c(i) && c(n) && (t.dataMin = ht(Nt(t.dataMin, i), i), t.dataMax = dt(Nt(t.dataMax, n), n)), c(s) && (t.threshold = s), (!o.softThreshold || t.isLog) && (t.softThreshold = !1))
                    }
                })
            },
            translate: function (t, e, i, n, o, r) {
                var a = this.linkedParent || this,
                    l = 1,
                    c = 0,
                    d = n ? a.oldTransA : a.transA,
                    n = n ? a.oldMin : a.min,
                    h = a.minPixelPadding,
                    o = (a.doPostTranslate || a.isLog && o) && a.lin2val;
                return d || (d = a.transA), i && (l *= -1, c = a.len), a.reversed && (l *= -1, c -= l * (a.sector || a.len)), e ? (t = t * l + c, t -= h, t = t / d + n, o && (t = a.lin2val(t))) : (o && (t = a.val2lin(t)), "between" === r && (r = .5), t = l * (t - n) * d + c + l * h + (s(r) ? d * r * a.pointRange : 0)), t
            },
            toPixels: function (t, e) {
                return this.translate(t, !1, !this.horiz, null, !0) + (e ? 0 : this.pos)
            },
            toValue: function (t, e) {
                return this.translate(t - (e ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function (t, e, i, n, o) {
                var s, r, a, l = this.chart,
                    c = this.left,
                    d = this.top,
                    h = i && l.oldChartHeight || l.chartHeight,
                    u = i && l.oldChartWidth || l.chartWidth;
                s = this.transB;
                var p = function (t, e, i) {
                    return (e > t || t > i) && (n ? t = ht(dt(e, t), i) : a = !0), t
                },
                    o = Nt(o, this.translate(t, null, null, i)),
                    t = i = at(o + s);
                return s = r = at(h - o - s), isNaN(o) ? a = !0 : this.horiz ? (s = d, r = h - this.bottom, t = i = p(t, c, c + this.width)) : (t = c, i = u - this.right, s = r = p(s, d, d + this.height)), a && !n ? null : l.renderer.crispLine(["M", t, s, "L", i, r], e || 1)
            },
            getLinearTickPositions: function (t, e, i) {
                var n, o = $(lt(e / t) * t),
                    r = $(ct(i / t) * t),
                    a = [];
                if (e === i && s(e)) return [e];
                for (e = o; r >= e && (a.push(e), e = $(e + t), e !== n);) n = e;
                return a
            },
            getMinorTickPositions: function () {
                var t, e = this.options,
                    i = this.tickPositions,
                    n = this.minorTickInterval,
                    o = [],
                    s = this.pointRangePadding || 0;
                t = this.min - s;
                var s = this.max + s,
                    r = s - t;
                if (r && r / n < this.len / 3)
                    if (this.isLog)
                        for (s = i.length, t = 1; s > t; t++) o = o.concat(this.getLogTickPositions(n, i[t - 1], i[t], !0));
                    else if (this.isDatetimeAxis && "auto" === e.minorTickInterval) o = o.concat(this.getTimeTicks(this.normalizeTimeTickInterval(n), t, s, e.startOfWeek));
                    else
                        for (i = t + (i[0] - t) % n; s >= i; i += n) o.push(i);
                return 0 !== o.length && this.trimTicks(o, e.startOnTick, e.endOnTick), o
            },
            adjustForMinRange: function () {
                var t, e, i, n, o, s, r, a = this.options,
                    l = this.min,
                    d = this.max,
                    h = this.dataMax - this.dataMin >= this.minRange;
                this.isXAxis && this.minRange === L && !this.isLog && (c(a.min) || c(a.max) ? this.minRange = null : (Vt(this.series, function (t) {
                    for (o = t.xData, i = s = t.xIncrement ? 1 : o.length - 1; i > 0; i--) n = o[i] - o[i - 1], (e === L || e > n) && (e = n)
                }), this.minRange = ht(5 * e, this.dataMax - this.dataMin))), d - l < this.minRange && (r = this.minRange, t = (r - d + l) / 2, t = [l - t, Nt(a.min, l - t)], h && (t[2] = this.dataMin), l = k(t), d = [l + r, Nt(a.max, l + r)], h && (d[2] = this.dataMax), d = w(d), r > d - l && (t[0] = d - r, t[1] = Nt(a.min, d - r), l = k(t))), this.min = l, this.max = d
            },
            setAxisTranslation: function (t) {
                var e, n = this,
                    o = n.max - n.min,
                    s = n.axisPointRange || 0,
                    r = 0,
                    a = 0,
                    l = n.linkedParent,
                    d = !!n.categories,
                    h = n.transA,
                    u = n.isXAxis;
                (u || d || s) && (l ? (r = l.minPointOffset, a = l.pointRangePadding) : Vt(n.series, function (t) {
                    var o = d ? 1 : u ? t.pointRange : n.axisPointRange || 0,
                        l = t.options.pointPlacement,
                        h = t.closestPointRange;
                    s = dt(s, o), n.single || (r = dt(r, i(l) ? 0 : o / 2), a = dt(a, "on" === l ? 0 : o)), !t.noSharedTooltip && c(h) && (e = c(e) ? ht(e, h) : h)
                }), l = n.ordinalSlope && e ? n.ordinalSlope / e : 1, n.minPointOffset = r *= l, n.pointRangePadding = a *= l, n.pointRange = ht(s, o), u && (n.closestPointRange = e)), t && (n.oldTransA = h), n.translationSlope = n.transA = h = n.len / (o + a || 1), n.transB = n.horiz ? n.left : n.bottom, n.minPixelPadding = h * r
            },
            minFromRange: function () {
                return this.max - this.range
            },
            setTickInterval: function (t) {
                var e, i, n, o, a = this,
                    l = a.chart,
                    d = a.options,
                    h = a.isLog,
                    u = a.isDatetimeAxis,
                    p = a.isXAxis,
                    f = a.isLinked,
                    m = d.maxPadding,
                    g = d.minPadding,
                    v = d.tickInterval,
                    x = d.tickPixelInterval,
                    w = a.categories,
                    k = a.threshold,
                    _ = a.softThreshold;
                !u && !w && !f && this.getTickAmount(), n = Nt(a.userMin, d.min), o = Nt(a.userMax, d.max), f ? (a.linkedParent = l[a.coll][d.linkedTo], l = a.linkedParent.getExtremes(), a.min = Nt(l.min, l.dataMin), a.max = Nt(l.max, l.dataMax), d.type !== a.linkedParent.options.type && T(11, 1)) : (!_ && c(k) && (a.dataMin >= k ? (e = k, g = 0) : a.dataMax <= k && (i = k, m = 0)), a.min = Nt(n, e, a.dataMin), a.max = Nt(o, i, a.dataMax)), h && (!t && ht(a.min, Nt(a.dataMin, a.min)) <= 0 && T(10, 1), a.min = $(r(a.min), 15), a.max = $(r(a.max), 15)), a.range && c(a.max) && (a.userMin = a.min = n = dt(a.min, a.minFromRange()), a.userMax = o = a.max, a.range = null), a.beforePadding && a.beforePadding(), a.adjustForMinRange(), w || a.axisPointRange || a.usePercentage || f || !c(a.min) || !c(a.max) || !(l = a.max - a.min) || (!c(n) && g && (a.min -= l * g), !c(o) && m && (a.max += l * m)), s(d.floor) && (a.min = dt(a.min, d.floor)), s(d.ceiling) && (a.max = ht(a.max, d.ceiling)), _ && c(a.dataMin) && (k = k || 0, !c(n) && a.min < k && a.dataMin >= k ? a.min = k : !c(o) && a.max > k && a.dataMax <= k && (a.max = k)), a.tickInterval = a.min === a.max || void 0 === a.min || void 0 === a.max ? 1 : f && !v && x === a.linkedParent.options.tickPixelInterval ? v = a.linkedParent.tickInterval : Nt(v, this.tickAmount ? (a.max - a.min) / dt(this.tickAmount - 1, 1) : void 0, w ? 1 : (a.max - a.min) * x / dt(a.len, x)), p && !t && Vt(a.series, function (t) {
                    t.processData(a.min !== a.oldMin || a.max !== a.oldMax)
                }), a.setAxisTranslation(!0), a.beforeSetTickPositions && a.beforeSetTickPositions(), a.postProcessTickInterval && (a.tickInterval = a.postProcessTickInterval(a.tickInterval)), a.pointRange && (a.tickInterval = dt(a.pointRange, a.tickInterval)), t = Nt(d.minTickInterval, a.isDatetimeAxis && a.closestPointRange), !v && a.tickInterval < t && (a.tickInterval = t), u || h || v || (a.tickInterval = b(a.tickInterval, null, y(a.tickInterval), Nt(d.allowDecimals, !(a.tickInterval > .5 && a.tickInterval < 5 && a.max > 1e3 && a.max < 9999)), !!this.tickAmount)), !this.tickAmount && this.len && (a.tickInterval = a.unsquish()), this.setTickPositions()
            },
            setTickPositions: function () {
                var t, e, i = this.options,
                    n = i.tickPositions,
                    o = i.tickPositioner,
                    s = i.startOnTick,
                    r = i.endOnTick;
                this.tickmarkOffset = this.categories && "between" === i.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0, this.minorTickInterval = "auto" === i.minorTickInterval && this.tickInterval ? this.tickInterval / 5 : i.minorTickInterval, this.tickPositions = t = n && n.slice(), !t && (t = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, i.units), this.min, this.max, i.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), t.length > this.len && (t = [t[0], t.pop()]), this.tickPositions = t, o && (o = o.apply(this, [this.min, this.max]))) && (this.tickPositions = t = o), this.isLinked || (this.trimTicks(t, s, r), this.min === this.max && c(this.min) && !this.tickAmount && (e = !0, this.min -= .5, this.max += .5), this.single = e, !n && !o && this.adjustTickAmount())
            },
            trimTicks: function (t, e, i) {
                var n = t[0],
                    o = t[t.length - 1],
                    s = this.minPointOffset || 0;
                e ? this.min = n : this.min - s > n && t.shift(), i ? this.max = o : this.max + s < o && t.pop(), 0 === t.length && c(n) && t.push((o + n) / 2)
            },
            getTickAmount: function () {
                var t, e = {},
                    i = this.options,
                    n = i.tickAmount,
                    o = i.tickPixelInterval;
                !c(i.tickInterval) && this.len < o && !this.isRadial && !this.isLog && i.startOnTick && i.endOnTick && (n = 2), !n && this.chart.options.chart.alignTicks !== !1 && i.alignTicks !== !1 && (Vt(this.chart[this.coll], function (i) {
                    var n = i.options,
                        o = i.horiz,
                        n = [o ? n.left : n.top, o ? n.width : n.height, n.pane].join(",");
                    i.series.length && (e[n] ? t = !0 : e[n] = 1)
                }), t && (n = ct(this.len / o) + 1)), 4 > n && (this.finalTickAmt = n, n = 5), this.tickAmount = n
            },
            adjustTickAmount: function () {
                var t = this.tickInterval,
                    e = this.tickPositions,
                    i = this.tickAmount,
                    n = this.finalTickAmt,
                    o = e && e.length;
                if (i > o) {
                    for (; e.length < i;) e.push($(e[e.length - 1] + t));
                    this.transA *= (o - 1) / (i - 1), this.max = e[e.length - 1]
                } else o > i && (this.tickInterval *= 2, this.setTickPositions());
                if (c(n)) {
                    for (t = i = e.length; t--;)(3 === n && t % 2 === 1 || 2 >= n && t > 0 && i - 1 > t) && e.splice(t, 1);
                    this.finalTickAmt = L
                }
            },
            setScale: function () {
                var t, e;
                this.oldMin = this.min, this.oldMax = this.max, this.oldAxisLength = this.len, this.setAxisSize(), e = this.len !== this.oldAxisLength, Vt(this.series, function (e) {
                    (e.isDirtyData || e.isDirty || e.xAxis.isDirty) && (t = !0)
                }), e || t || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = e || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks()
            },
            setExtremes: function (t, e, i, n, o) {
                var s = this,
                    r = s.chart,
                    i = Nt(i, !0);
                Vt(s.series, function (t) {
                    delete t.kdTree
                }), o = jt(o, {
                    min: t,
                    max: e
                }), Qt(s, "setExtremes", o, function () {
                    s.userMin = t, s.userMax = e, s.eventArgs = o, i && r.redraw(n)
                })
            },
            zoom: function (t, e) {
                var i = this.dataMin,
                    n = this.dataMax,
                    o = this.options,
                    s = ht(i, Nt(o.min, i)),
                    o = dt(n, Nt(o.max, n));
                return this.allowZoomOutside || (c(i) && s >= t && (t = s), c(n) && e >= o && (e = o)), this.displayBtn = t !== L || e !== L, this.setExtremes(t, e, !1, L, {
                    trigger: "zoom"
                }), !0
            },
            setAxisSize: function () {
                var t = this.chart,
                    e = this.options,
                    i = e.offsetLeft || 0,
                    n = this.horiz,
                    o = Nt(e.width, t.plotWidth - i + (e.offsetRight || 0)),
                    s = Nt(e.height, t.plotHeight),
                    r = Nt(e.top, t.plotTop),
                    e = Nt(e.left, t.plotLeft + i),
                    i = /%$/;
                i.test(s) && (s = parseFloat(s) / 100 * t.plotHeight), i.test(r) && (r = parseFloat(r) / 100 * t.plotHeight + t.plotTop), this.left = e, this.top = r, this.width = o, this.height = s, this.bottom = t.chartHeight - s - r, this.right = t.chartWidth - o - e, this.len = dt(n ? o : s, 0), this.pos = n ? e : r
            },
            getExtremes: function () {
                var t = this.isLog;
                return {
                    min: t ? $(a(this.min)) : this.min,
                    max: t ? $(a(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function (t) {
                var e = this.isLog,
                    i = e ? a(this.min) : this.min,
                    e = e ? a(this.max) : this.max;
                return null === t ? t = 0 > e ? e : i : i > t ? t = i : t > e && (t = e), this.translate(t, 0, 1, 0, 1)
            },
            autoLabelAlign: function (t) {
                return t = (Nt(t, 0) - 90 * this.side + 720) % 360, t > 15 && 165 > t ? "right" : t > 195 && 345 > t ? "left" : "center"
            },
            unsquish: function () {
                var t, e, i, n = this.ticks,
                    o = this.options.labels,
                    s = this.horiz,
                    r = this.tickInterval,
                    a = r,
                    l = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / r),
                    d = o.rotation,
                    h = this.chart.renderer.fontMetrics(o.style.fontSize, n[0] && n[0].label),
                    u = Number.MAX_VALUE,
                    p = function (t) {
                        return t /= l || 1, t = t > 1 ? ct(t) : 1, t * r
                    };
                return s ? (i = !o.staggerLines && !o.step && (c(d) ? [d] : l < Nt(o.autoRotationLimit, 80) && o.autoRotation)) && Vt(i, function (i) {
                    var n;
                    (i === d || i && i >= -90 && 90 >= i) && (e = p(ut(h.h / ft(gt * i))), n = e + ut(i / 360), u > n && (u = n, t = i, a = e))
                }) : o.step || (a = p(h.h)), this.autoRotation = i, this.labelRotation = Nt(t, d), a
            },
            renderUnsquish: function () {
                var e, n = this.chart,
                    o = n.renderer,
                    s = this.tickPositions,
                    r = this.ticks,
                    a = this.options.labels,
                    l = this.horiz,
                    c = n.margin,
                    d = this.categories ? s.length : s.length - 1,
                    h = this.slotWidth = l && !a.step && !a.rotation && (this.staggerLines || 1) * n.plotWidth / d || !l && (c[3] && c[3] - n.spacing[3] || .33 * n.chartWidth),
                    u = dt(1, at(h - 2 * (a.padding || 5))),
                    p = {},
                    c = o.fontMetrics(a.style.fontSize, r[0] && r[0].label),
                    d = a.style.textOverflow,
                    f = 0;
                if (i(a.rotation) || (p.rotation = a.rotation || 0), this.autoRotation) Vt(s, function (t) {
                    (t = r[t]) && t.labelLength > f && (f = t.labelLength)
                }), f > u && f > c.h ? p.rotation = this.labelRotation : this.labelRotation = 0;
                else if (h && (e = {
                    width: u + "px"
                }, !d))
                    for (e.textOverflow = "clip", h = s.length; !l && h--;) u = s[h], (u = r[u].label) && ("ellipsis" === u.styles.textOverflow && u.css({
                        textOverflow: "clip"
                    }), u.getBBox().height > this.len / s.length - (c.h - c.f) && (u.specCss = {
                        textOverflow: "ellipsis"
                    }));
                p.rotation && (e = {
                    width: (f > .5 * n.chartHeight ? .33 * n.chartHeight : n.chartHeight) + "px"
                }, !d) && (e.textOverflow = "ellipsis"), this.labelAlign = p.align = a.align || this.autoLabelAlign(this.labelRotation), Vt(s, function (i) {
                    var n = (i = r[i]) && i.label;
                    n && (n.attr(p), e && n.css(t(e, n.specCss)), delete n.specCss, i.rotation = p.rotation)
                }), this.tickRotCorr = o.rotCorr(c.b, this.labelRotation || 0, 2 === this.side)
            },
            hasData: function () {
                return this.hasVisibleSeries || c(this.min) && c(this.max) && !!this.tickPositions
            },
            getOffset: function () {
                var t, e, i, n, o = this,
                    s = o.chart,
                    r = s.renderer,
                    a = o.options,
                    l = o.tickPositions,
                    d = o.ticks,
                    h = o.horiz,
                    u = o.side,
                    p = s.inverted ? [1, 0, 3, 2][u] : u,
                    f = 0,
                    m = 0,
                    g = a.title,
                    v = a.labels,
                    y = 0,
                    b = s.axisOffset,
                    s = s.clipOffset,
                    x = [-1, 1, 1, -1][u],
                    w = o.axisParent;
                if (t = o.hasData(), o.showAxis = e = t || Nt(a.showEmpty, !0), o.staggerLines = o.horiz && v.staggerLines, o.axisGroup || (o.gridGroup = r.g("grid").attr({
                    zIndex: a.gridZIndex || 1
                }).add(w), o.axisGroup = r.g("axis").attr({
                    zIndex: a.zIndex || 2
                }).add(w), o.labelGroup = r.g("axis-labels").attr({
                    zIndex: v.zIndex || 7
                }).addClass("highcharts-" + o.coll.toLowerCase() + "-labels").add(w)), t || o.isLinked) Vt(l, function (t) {
                    d[t] ? d[t].addLabel() : d[t] = new A(o, t)
                }), o.renderUnsquish(), Vt(l, function (t) {
                    (0 === u || 2 === u || {
                        1: "left",
                        3: "right"
                    }[u] === o.labelAlign) && (y = dt(d[t].getLabelSize(), y))
                }), o.staggerLines && (y *= o.staggerLines, o.labelOffset = y);
                else
                    for (n in d) d[n].destroy(), delete d[n];
                g && g.text && g.enabled !== !1 && (o.axisTitle || (o.axisTitle = r.text(g.text, 0, 0, g.useHTML).attr({
                    zIndex: 7,
                    rotation: g.rotation || 0,
                    align: g.textAlign || {
                        low: "left",
                        middle: "center",
                        high: "right"
                    }[g.align]
                }).addClass("highcharts-" + this.coll.toLowerCase() + "-title").css(g.style).add(o.axisGroup), o.axisTitle.isNew = !0), e && (f = o.axisTitle.getBBox()[h ? "height" : "width"], i = g.offset, m = c(i) ? 0 : Nt(g.margin, h ? 5 : 10)), o.axisTitle[e ? "show" : "hide"]()), o.offset = x * Nt(a.offset, b[u]), o.tickRotCorr = o.tickRotCorr || {
                    x: 0,
                    y: 0
                }, r = 2 === u ? o.tickRotCorr.y : 0, h = y + m + (y && x * (h ? Nt(v.y, o.tickRotCorr.y + 8) : v.x) - r), o.axisTitleMargin = Nt(i, h), b[u] = dt(b[u], o.axisTitleMargin + f + x * o.offset, h), a = a.offset ? 0 : 2 * lt(a.lineWidth / 2), s[p] = dt(s[p], a)
            },
            getLinePath: function (t) {
                var e = this.chart,
                    i = this.opposite,
                    n = this.offset,
                    o = this.horiz,
                    s = this.left + (i ? this.width : 0) + n,
                    n = e.chartHeight - this.bottom - (i ? this.height : 0) + n;
                return i && (t *= -1), e.renderer.crispLine(["M", o ? this.left : s, o ? n : this.top, "L", o ? e.chartWidth - this.right : s, o ? n : e.chartHeight - this.bottom], t)
            },
            getTitlePosition: function () {
                var t = this.horiz,
                    i = this.left,
                    n = this.top,
                    o = this.len,
                    s = this.options.title,
                    r = t ? i : n,
                    a = this.opposite,
                    l = this.offset,
                    c = s.x || 0,
                    d = s.y || 0,
                    h = e(s.style.fontSize || 12),
                    o = {
                        low: r + (t ? 0 : o),
                        middle: r + o / 2,
                        high: r + (t ? o : 0)
                    }[s.align],
                    i = (t ? n + this.height : i) + (t ? 1 : -1) * (a ? -1 : 1) * this.axisTitleMargin + (2 === this.side ? h : 0);
                return {
                    x: t ? o + c : i + (a ? this.width : 0) + l + c,
                    y: t ? i + d - (a ? this.height : 0) + l : o + d
                }
            },
            render: function () {
                var t, e, i, n = this,
                    o = n.chart,
                    s = o.renderer,
                    r = n.options,
                    l = n.isLog,
                    d = n.isLinked,
                    h = n.tickPositions,
                    u = n.axisTitle,
                    p = n.ticks,
                    f = n.minorTicks,
                    m = n.alternateBands,
                    g = r.stackLabels,
                    v = r.alternateGridColor,
                    y = n.tickmarkOffset,
                    b = r.lineWidth,
                    x = o.hasRendered && c(n.oldMin) && !isNaN(n.oldMin),
                    w = n.showAxis,
                    k = s.globalAnimation;
                n.labelEdge.length = 0, n.overlap = !1, Vt([p, f, m], function (t) {
                    for (var e in t) t[e].isActive = !1
                }), (n.hasData() || d) && (n.minorTickInterval && !n.categories && Vt(n.getMinorTickPositions(), function (t) {
                    f[t] || (f[t] = new A(n, t, "minor")), x && f[t].isNew && f[t].render(null, !0), f[t].render(null, !1, 1)
                }), h.length && (Vt(h, function (t, e) {
                    (!d || t >= n.min && t <= n.max) && (p[t] || (p[t] = new A(n, t)), x && p[t].isNew && p[t].render(e, !0, .1), p[t].render(e))
                }), y && (0 === n.min || n.single)) && (p[-1] || (p[-1] = new A(n, -1, null, !0)), p[-1].render(-1)), v && Vt(h, function (t, o) {
                    i = h[o + 1] !== L ? h[o + 1] + y : n.max - y, o % 2 === 0 && t < n.max && i <= n.max - y && (m[t] || (m[t] = new nt.PlotLineOrBand(n)), e = t + y, m[t].options = {
                        from: l ? a(e) : e,
                        to: l ? a(i) : i,
                        color: v
                    }, m[t].render(), m[t].isActive = !0)
                }), n._addedPlotLB || (Vt((r.plotLines || []).concat(r.plotBands || []), function (t) {
                    n.addPlotBandOrLine(t)
                }), n._addedPlotLB = !0)), Vt([p, f, m], function (t) {
                    var e, i, n = [],
                        s = k ? k.duration || 500 : 0,
                        r = function () {
                            for (i = n.length; i--;) t[n[i]] && !t[n[i]].isActive && (t[n[i]].destroy(), delete t[n[i]])
                        };
                    for (e in t) t[e].isActive || (t[e].render(e, !1, 0), t[e].isActive = !1, n.push(e));
                    t !== m && o.hasRendered && s ? s && setTimeout(r, s) : r()
                }), b && (t = n.getLinePath(b), n.axisLine ? n.axisLine.animate({
                    d: t
                }) : n.axisLine = s.path(t).attr({
                    stroke: r.lineColor,
                    "stroke-width": b,
                    zIndex: 7
                }).add(n.axisGroup), n.axisLine[w ? "show" : "hide"]()), u && w && (u[u.isNew ? "attr" : "animate"](n.getTitlePosition()), u.isNew = !1), g && g.enabled && n.renderStackTotals(), n.isDirty = !1
            },
            redraw: function () {
                this.visible && (this.render(), Vt(this.plotLinesAndBands, function (t) {
                    t.render()
                })), Vt(this.series, function (t) {
                    t.isDirty = !0
                })
            },
            destroy: function (t) {
                var e, i = this,
                    n = i.stacks,
                    o = i.plotLinesAndBands;
                t || Zt(i);
                for (e in n) _(n[e]), n[e] = null;
                for (Vt([i.ticks, i.minorTicks, i.alternateBands], function (t) {
                    _(t)
                }), t = o.length; t--;) o[t].destroy();
                Vt("stackTotalGroup,axisLine,axisTitle,axisGroup,cross,gridGroup,labelGroup".split(","), function (t) {
                    i[t] && (i[t] = i[t].destroy())
                }), this.cross && this.cross.destroy()
            },
            drawCrosshair: function (t, e) {
                var i, n = this.crosshair,
                    o = n.animation;
                !this.crosshair || (c(e) || !Nt(this.crosshair.snap, !0)) === !1 || e && e.series && e.series[this.coll] !== this ? this.hideCrosshair() : (Nt(n.snap, !0) ? c(e) && (i = this.isXAxis ? e.plotX : this.len - e.plotY) : i = this.horiz ? t.chartX - this.pos : this.len - t.chartY + this.pos, i = this.isRadial ? this.getPlotLinePath(this.isXAxis ? e.x : Nt(e.stackY, e.y)) || null : this.getPlotLinePath(null, null, null, null, i) || null, null === i ? this.hideCrosshair() : this.cross ? this.cross.attr({
                    visibility: "visible"
                })[o ? "animate" : "attr"]({
                    d: i
                }, o) : (o = this.categories && !this.isRadial, o = {
                    "stroke-width": n.width || (o ? this.transA : 1),
                    stroke: n.color || (o ? "rgba(155,200,255,0.2)" : "#C0C0C0"),
                    zIndex: n.zIndex || 2
                }, n.dashStyle && (o.dashstyle = n.dashStyle), this.cross = this.chart.renderer.path(i).attr(o).add()))
            },
            hideCrosshair: function () {
                this.cross && this.cross.hide()
            }
        }, jt(he.prototype, {
            getPlotBandPath: function (t, e) {
                var i = this.getPlotLinePath(e, null, null, !0),
                    n = this.getPlotLinePath(t, null, null, !0);
                return n && i && n.toString() !== i.toString() ? n.push(i[4], i[5], i[1], i[2]) : n = null, n
            },
            addPlotBand: function (t) {
                return this.addPlotBandOrLine(t, "plotBands")
            },
            addPlotLine: function (t) {
                return this.addPlotBandOrLine(t, "plotLines")
            },
            addPlotBandOrLine: function (t, e) {
                var i = new nt.PlotLineOrBand(this, t).render(),
                    n = this.userOptions;
                return i && (e && (n[e] = n[e] || [], n[e].push(t)), this.plotLinesAndBands.push(i)), i
            },
            removePlotBandOrLine: function (t) {
                for (var e = this.plotLinesAndBands, i = this.options, n = this.userOptions, o = e.length; o--;) e[o].id === t && e[o].destroy();
                Vt([i.plotLines || [], n.plotLines || [], i.plotBands || [], n.plotBands || []], function (e) {
                    for (o = e.length; o--;) e[o].id === t && l(e, e[o])
                })
            }
        }), he.prototype.getTimeTicks = function (t, e, i, n) {
            var o, s = [],
                r = {},
                a = H.global.useUTC,
                l = new N(e - g(e)),
                d = t.unitRange,
                h = t.count;
            if (c(e)) {
                l[K](d >= j.second ? 0 : h * lt(l.getMilliseconds() / h)), d >= j.second && l[J](d >= j.minute ? 0 : h * lt(l.getSeconds() / h)), d >= j.minute && l[Z](d >= j.hour ? 0 : h * lt(l[W]() / h)), d >= j.hour && l[Q](d >= j.day ? 0 : h * lt(l[X]() / h)), d >= j.day && l[tt](d >= j.month ? 1 : h * lt(l[V]() / h)), d >= j.month && (l[et](d >= j.year ? 0 : h * lt(l[G]() / h)), o = l[U]()), d >= j.year && (o -= o % h, l[it](o)), d === j.week && l[tt](l[V]() - l[Y]() + Nt(n, 1)), e = 1, (R || q) && (l = l.getTime(), l = new N(l + g(l))), o = l[U]();
                for (var n = l.getTime(), u = l[G](), p = l[V](), f = (j.day + (a ? g(l) : 6e4 * l.getTimezoneOffset())) % j.day; i > n;) s.push(n), d === j.year ? n = z(o + e * h, 0) : d === j.month ? n = z(o, u + e * h) : a || d !== j.day && d !== j.week ? n += d * h : n = z(o, u, p + e * h * (d === j.day ? 1 : 7)), e++;
                s.push(n), Vt(Gt(s, function (t) {
                    return d <= j.hour && t % j.day === f
                }), function (t) {
                    r[t] = "day"
                })
            }
            return s.info = jt(t, {
                higherRanks: r,
                totalRange: d * h
            }), s
        }, he.prototype.normalizeTimeTickInterval = function (t, e) {
            var i, n = e || [
                ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                ["second", [1, 2, 5, 10, 15, 30]],
                ["minute", [1, 2, 5, 10, 15, 30]],
                ["hour", [1, 2, 3, 4, 6, 8, 12]],
                ["day", [1, 2]],
                ["week", [1, 2]],
                ["month", [1, 2, 3, 4, 6]],
                ["year", null]
            ],
                o = n[n.length - 1],
                s = j[o[0]],
                r = o[1];
            for (i = 0; i < n.length && (o = n[i], s = j[o[0]], r = o[1], !(n[i + 1] && t <= (s * r[r.length - 1] + j[n[i + 1][0]]) / 2)); i++);
            return s === j.year && 5 * s > t && (r = [1, 2, 5]), n = b(t / s, r, "year" === o[0] ? dt(y(t / s), 1) : 1), {
                unitRange: s,
                count: n,
                unitName: o[0]
            }
        }, he.prototype.getLogTickPositions = function (t, e, i, n) {
            var o = this.options,
                s = this.len,
                l = [];
            if (n || (this._minorAutoInterval = null), t >= .5) t = at(t), l = this.getLinearTickPositions(t, e, i);
            else if (t >= .08)
                for (var c, d, h, u, p, s = lt(e), o = t > .3 ? [1, 2, 4] : t > .15 ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; i + 1 > s && !p; s++)
                    for (d = o.length, c = 0; d > c && !p; c++) h = r(a(s) * o[c]), h > e && (!n || i >= u) && u !== L && l.push(u), u > i && (p = !0), u = h;
            else e = a(e), i = a(i), t = o[n ? "minorTickInterval" : "tickInterval"], t = Nt("auto" === t ? null : t, this._minorAutoInterval, (i - e) * (o.tickPixelInterval / (n ? 5 : 1)) / ((n ? s / this.tickPositions.length : s) || 1)), t = b(t, null, y(t)), l = Kt(this.getLinearTickPositions(t, e, i), r), n || (this._minorAutoInterval = t / 5);
            return n || (this.tickInterval = t), l
        };
        var ue = nt.Tooltip = function () {
            this.init.apply(this, arguments)
        };
        ue.prototype = {
            init: function (t, i) {
                var n = i.borderWidth,
                    o = i.style,
                    s = e(o.padding);
                this.chart = t, this.options = i, this.crosshairs = [], this.now = {
                    x: 0,
                    y: 0
                }, this.isHidden = !0, this.label = t.renderer.label("", 0, 0, i.shape || "callout", null, null, i.useHTML, null, "tooltip").attr({
                    padding: s,
                    fill: i.backgroundColor,
                    "stroke-width": n,
                    r: i.borderRadius,
                    zIndex: 8
                }).css(o).css({
                    padding: 0
                }).add().attr({
                    y: -9999
                }), St || this.label.shadow(i.shadow), this.shared = i.shared
            },
            destroy: function () {
                this.label && (this.label = this.label.destroy()), clearTimeout(this.hideTimer), clearTimeout(this.tooltipTimeout)
            },
            move: function (t, e, i, n) {
                var o = this,
                    s = o.now,
                    r = o.options.animation !== !1 && !o.isHidden && (ut(t - s.x) > 1 || ut(e - s.y) > 1),
                    a = o.followPointer || o.len > 1;
                jt(s, {
                    x: r ? (2 * s.x + t) / 3 : t,
                    y: r ? (s.y + e) / 2 : e,
                    anchorX: a ? L : r ? (2 * s.anchorX + i) / 3 : i,
                    anchorY: a ? L : r ? (s.anchorY + n) / 2 : n
                }), o.label.attr(s), r && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
                    o && o.move(t, e, i, n)
                }, 32))
            },
            hide: function (t) {
                var e = this;
                clearTimeout(this.hideTimer), this.isHidden || (this.hideTimer = setTimeout(function () {
                    e.label.fadeOut(), e.isHidden = !0
                }, Nt(t, this.options.hideDelay, 500)))
            },
            getAnchor: function (t, e) {
                var i, n, o, s = this.chart,
                    r = s.inverted,
                    a = s.plotTop,
                    l = s.plotLeft,
                    c = 0,
                    d = 0,
                    t = h(t);
                return i = t[0].tooltipPos, this.followPointer && e && (e.chartX === L && (e = s.pointer.normalize(e)), i = [e.chartX - s.plotLeft, e.chartY - a]), i || (Vt(t, function (t) {
                    n = t.series.yAxis, o = t.series.xAxis, c += t.plotX + (!r && o ? o.left - l : 0), d += (t.plotLow ? (t.plotLow + t.plotHigh) / 2 : t.plotY) + (!r && n ? n.top - a : 0)
                }), c /= t.length, d /= t.length, i = [r ? s.plotWidth - d : c, this.shared && !r && t.length > 1 && e ? e.chartY - a : r ? s.plotHeight - c : d]), Kt(i, at)
            },
            getPosition: function (t, e, i) {
                var n, o = this.chart,
                    s = this.distance,
                    r = {},
                    a = i.h || 0,
                    l = ["y", o.chartHeight, e, i.plotY + o.plotTop, o.plotTop, o.plotTop + o.plotHeight],
                    c = ["x", o.chartWidth, t, i.plotX + o.plotLeft, o.plotLeft, o.plotLeft + o.plotWidth],
                    d = Nt(i.ttBelow, o.inverted && !i.negative || !o.inverted && i.negative),
                    h = function (t, e, i, n, o, l) {
                        var c = n - s > i,
                            h = e > n + s + i,
                            u = n - s - i;
                        if (n += s, d && h) r[t] = n;
                        else if (!d && c) r[t] = u;
                        else if (c) r[t] = ht(l - i, 0 > u - a ? u : u - a);
                        else {
                            if (!h) return !1;
                            r[t] = dt(o, n + a + i > e ? n : n + a)
                        }
                    },
                    u = function (t, e, i, n) {
                        return s > n || n > e - s ? !1 : void (r[t] = i / 2 > n ? 1 : n > e - i / 2 ? e - i - 2 : n - i / 2)
                    },
                    p = function (t) {
                        var e = l;
                        l = c, c = e, n = t
                    },
                    f = function () {
                        h.apply(0, l) !== !1 ? u.apply(0, c) === !1 && !n && (p(!0), f()) : n ? r.x = r.y = 0 : (p(!0), f())
                    };
                return (o.inverted || this.len > 1) && p(), f(), r
            },
            defaultFormatter: function (t) {
                var e, i = this.points || h(this);
                return e = [t.tooltipFooterHeaderFormatter(i[0])], e = e.concat(t.bodyFormatter(i)), e.push(t.tooltipFooterHeaderFormatter(i[0], !0)), e.join("")
            },
            refresh: function (t, e) {
                var i, n, o, s, r = this.chart,
                    a = this.label,
                    l = this.options,
                    c = {},
                    d = [];
                s = l.formatter || this.defaultFormatter;
                var u, c = r.hoverPoints,
                    p = this.shared;
                clearTimeout(this.hideTimer), this.followPointer = h(t)[0].series.tooltipOptions.followPointer, o = this.getAnchor(t, e), i = o[0], n = o[1], !p || t.series && t.series.noSharedTooltip ? c = t.getLabelConfig() : (r.hoverPoints = t, c && Vt(c, function (t) {
                    t.setState()
                }), Vt(t, function (t) {
                    t.setState("hover"), d.push(t.getLabelConfig())
                }), c = {
                    x: t[0].category,
                    y: t[0].y
                }, c.points = d, this.len = d.length, t = t[0]), s = s.call(c, this), c = t.series, this.distance = Nt(c.tooltipOptions.distance, 16), s === !1 ? this.hide() : (this.isHidden && (ie(a), a.attr("opacity", 1).show()), a.attr({
                    text: s
                }), u = l.borderColor || t.color || c.color || "#606060", a.attr({
                    stroke: u
                }), this.updatePosition({
                    plotX: i,
                    plotY: n,
                    negative: t.negative,
                    ttBelow: t.ttBelow,
                    h: o[2] || 0
                }), this.isHidden = !1), Qt(r, "tooltipRefresh", {
                    text: s,
                    x: i + r.plotLeft,
                    y: n + r.plotTop,
                    borderColor: u
                })
            },
            updatePosition: function (t) {
                var e = this.chart,
                    i = this.label,
                    i = (this.options.positioner || this.getPosition).call(this, i.width, i.height, t);
                this.move(at(i.x), at(i.y || 0), t.plotX + e.plotLeft, t.plotY + e.plotTop)
            },
            getXDateFormat: function (t, e, i) {
                var n, o, s, e = e.dateTimeLabelFormats,
                    r = i && i.closestPointRange,
                    a = {
                        millisecond: 15,
                        second: 12,
                        minute: 9,
                        hour: 6,
                        day: 3
                    },
                    l = "millisecond";
                if (r) {
                    s = I("%m-%d %H:%M:%S.%L", t.x);
                    for (o in j) {
                        if (r === j.week && +I("%w", t.x) === i.options.startOfWeek && "00:00:00.000" === s.substr(6)) {
                            o = "week";
                            break
                        }
                        if (j[o] > r) {
                            o = l;
                            break
                        }
                        if (a[o] && s.substr(a[o]) !== "01-01 00:00:00.000".substr(a[o])) break;
                        "week" !== o && (l = o)
                    }
                    o && (n = e[o])
                } else n = e.day;
                return n || e.year
            },
            tooltipFooterHeaderFormatter: function (t, e) {
                var i = e ? "footer" : "header",
                    n = t.series,
                    o = n.tooltipOptions,
                    r = o.xDateFormat,
                    a = n.xAxis,
                    l = a && "datetime" === a.options.type && s(t.key),
                    i = o[i + "Format"];
                return l && !r && (r = this.getXDateFormat(t, o, a)), l && r && (i = i.replace("{point.key}", "{point.key:" + r + "}")), v(i, {
                    point: t,
                    series: n
                })
            },
            bodyFormatter: function (t) {
                return Kt(t, function (t) {
                    var e = t.series.tooltipOptions;
                    return (e.pointFormatter || t.point.tooltipFormatter).call(t.point, e.pointFormat)
                })
            }
        };
        var pe;
        B = ot.documentElement.ontouchstart !== L;
        var fe = nt.Pointer = function (t, e) {
            this.init(t, e)
        };
        if (fe.prototype = {
            init: function (t, e) {
                var i, n = e.chart,
                    o = n.events,
                    s = St ? "" : n.zoomType,
                    n = t.inverted;
                this.options = e, this.chart = t, this.zoomX = i = /x/.test(s), this.zoomY = s = /y/.test(s), this.zoomHor = i && !n || s && n, this.zoomVert = s && !n || i && n, this.hasZoom = i || s, this.runChartClick = o && !!o.click, this.pinchDown = [], this.lastValidTouch = {}, nt.Tooltip && e.tooltip.enabled && (t.tooltip = new ue(t, e.tooltip), this.followTouchMove = Nt(e.tooltip.followTouchMove, !0)), this.setDOMEvents()
            },
            normalize: function (t, e) {
                var i, n, t = t || window.event,
                    t = te(t);
                return t.target || (t.target = t.srcElement), n = t.touches ? t.touches.length ? t.touches.item(0) : t.changedTouches[0] : t, e || (this.chartPosition = e = Ut(this.chart.container)), n.pageX === L ? (i = dt(t.x, t.clientX - e.left), n = t.y) : (i = n.pageX - e.left, n = n.pageY - e.top), jt(t, {
                    chartX: at(i),
                    chartY: at(n)
                })
            },
            getCoordinates: function (t) {
                var e = {
                    xAxis: [],
                    yAxis: []
                };
                return Vt(this.chart.axes, function (i) {
                    e[i.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: i,
                        value: i.toValue(t[i.horiz ? "chartX" : "chartY"])
                    })
                }), e
            },
            runPointActions: function (t) {
                var e, i, n, o, s, r = this.chart,
                    a = r.series,
                    l = r.tooltip,
                    c = l ? l.shared : !1,
                    d = r.hoverPoint,
                    h = r.hoverSeries,
                    u = Number.MAX_VALUE,
                    p = [];
                if (!c && !h)
                    for (e = 0; e < a.length; e++)(a[e].directTouch || !a[e].options.stickyTracking) && (a = []);
                if (h && (c ? h.noSharedTooltip : h.directTouch) && d ? o = d : (Vt(a, function (e) {
                    i = e.noSharedTooltip && c, n = !c && e.directTouch, e.visible && !i && !n && Nt(e.options.enableMouseTracking, !0) && (s = e.searchPoint(t, !i && 1 === e.kdDimensions)) && p.push(s)
                }), Vt(p, function (t) {
                    t && "number" == typeof t.dist && t.dist < u && (u = t.dist, o = t)
                })), o && (o !== this.prevKDPoint || l && l.isHidden)) {
                    if (c && !o.series.noSharedTooltip) {
                        for (e = p.length; e--;)(p[e].clientX !== o.clientX || p[e].series.noSharedTooltip) && p.splice(e, 1);
                        p.length && l && l.refresh(p, t), Vt(p, function (e) {
                            e.onMouseOver(t, e !== (h && h.directTouch && d || o))
                        })
                    } else l && l.refresh(o, t), h && h.directTouch || o.onMouseOver(t);
                    this.prevKDPoint = o
                } else a = h && h.tooltipOptions.followPointer, l && a && !l.isHidden && (a = l.getAnchor([{}], t), l.updatePosition({
                    plotX: a[0],
                    plotY: a[1]
                }));
                l && !this._onDocumentMouseMove && (this._onDocumentMouseMove = function (t) {
                    Et[pe] && Et[pe].pointer.onDocumentMouseMove(t)
                }, Jt(ot, "mousemove", this._onDocumentMouseMove)), Vt(r.axes, function (e) {
                    e.drawCrosshair(t, Nt(o, d))
                })
            },
            reset: function (t, e) {
                var i = this.chart,
                    n = i.hoverSeries,
                    o = i.hoverPoint,
                    s = i.hoverPoints,
                    r = i.tooltip,
                    a = r && r.shared ? s : o;
                (t = t && r && a) && h(a)[0].plotX === L && (t = !1), t ? (r.refresh(a), o && (o.setState(o.state, !0), Vt(i.axes, function (t) {
                    Nt(t.options.crosshair && t.options.crosshair.snap, !0) ? t.drawCrosshair(null, o) : t.hideCrosshair()
                }))) : (o && o.onMouseOut(), s && Vt(s, function (t) {
                    t.setState()
                }), n && n.onMouseOut(), r && r.hide(e), this._onDocumentMouseMove && (Zt(ot, "mousemove", this._onDocumentMouseMove), this._onDocumentMouseMove = null), Vt(i.axes, function (t) {
                    t.hideCrosshair()
                }), this.hoverX = i.hoverPoints = i.hoverPoint = null)
            },
            scaleGroups: function (t, e) {
                var i, n = this.chart;
                Vt(n.series, function (o) {
                    i = t || o.getPlotBox(), o.xAxis && o.xAxis.zoomEnabled && (o.group.attr(i), o.markerGroup && (o.markerGroup.attr(i), o.markerGroup.clip(e ? n.clipRect : null)), o.dataLabelsGroup && o.dataLabelsGroup.attr(i))
                }), n.clipRect.attr(e || n.clipBox)
            },
            dragStart: function (t) {
                var e = this.chart;
                e.mouseIsDown = t.type, e.cancelClick = !1, e.mouseDownX = this.mouseDownX = t.chartX, e.mouseDownY = this.mouseDownY = t.chartY
            },
            drag: function (t) {
                var e, i = this.chart,
                    n = i.options.chart,
                    o = t.chartX,
                    s = t.chartY,
                    r = this.zoomHor,
                    a = this.zoomVert,
                    l = i.plotLeft,
                    c = i.plotTop,
                    d = i.plotWidth,
                    h = i.plotHeight,
                    u = this.selectionMarker,
                    p = this.mouseDownX,
                    f = this.mouseDownY,
                    m = n.panKey && t[n.panKey + "Key"];
                u && u.touch || (l > o ? o = l : o > l + d && (o = l + d), c > s ? s = c : s > c + h && (s = c + h), this.hasDragged = Math.sqrt(Math.pow(p - o, 2) + Math.pow(f - s, 2)), this.hasDragged > 10 && (e = i.isInsidePlot(p - l, f - c), i.hasCartesianSeries && (this.zoomX || this.zoomY) && e && !m && !u && (this.selectionMarker = u = i.renderer.rect(l, c, r ? 1 : d, a ? 1 : h, 0).attr({
                    fill: n.selectionMarkerFill || "rgba(69,114,167,0.25)",
                    zIndex: 7
                }).add()), u && r && (o -= p, u.attr({
                    width: ut(o),
                    x: (o > 0 ? 0 : o) + p
                })), u && a && (o = s - f, u.attr({
                    height: ut(o),
                    y: (o > 0 ? 0 : o) + f
                })), e && !u && n.panning && i.pan(t, n.panning)))
            },
            drop: function (t) {
                var e = this,
                    i = this.chart,
                    n = this.hasPinched;
                if (this.selectionMarker) {
                    var o, s = {
                        xAxis: [],
                        yAxis: [],
                        originalEvent: t.originalEvent || t
                    },
                        r = this.selectionMarker,
                        a = r.attr ? r.attr("x") : r.x,
                        l = r.attr ? r.attr("y") : r.y,
                        d = r.attr ? r.attr("width") : r.width,
                        h = r.attr ? r.attr("height") : r.height;
                    (this.hasDragged || n) && (Vt(i.axes, function (i) {
                        if (i.zoomEnabled && c(i.min) && (n || e[{
                            xAxis: "zoomX",
                            yAxis: "zoomY"
                        }[i.coll]])) {
                            var r = i.horiz,
                                u = "touchend" === t.type ? i.minPixelPadding : 0,
                                p = i.toValue((r ? a : l) + u),
                                r = i.toValue((r ? a + d : l + h) - u);
                            s[i.coll].push({
                                axis: i,
                                min: ht(p, r),
                                max: dt(p, r)
                            }), o = !0
                        }
                    }), o && Qt(i, "selection", s, function (t) {
                        i.zoom(jt(t, n ? {
                            animation: !1
                        } : null))
                    })), this.selectionMarker = this.selectionMarker.destroy(), n && this.scaleGroups()
                }
                i && (u(i.container, {
                    cursor: i._cursor
                }), i.cancelClick = this.hasDragged > 10, i.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            },
            onContainerMouseDown: function (t) {
                t = this.normalize(t), t.preventDefault && t.preventDefault(), this.dragStart(t)
            },
            onDocumentMouseUp: function (t) {
                Et[pe] && Et[pe].pointer.drop(t)
            },
            onDocumentMouseMove: function (t) {
                var e = this.chart,
                    i = this.chartPosition,
                    t = this.normalize(t, i);
                i && !this.inClass(t.target, "highcharts-tracker") && !e.isInsidePlot(t.chartX - e.plotLeft, t.chartY - e.plotTop) && this.reset()
            },
            onContainerMouseLeave: function () {
                var t = Et[pe];
                t && (t.pointer.reset(), t.pointer.chartPosition = null)
            },
            onContainerMouseMove: function (t) {
                var e = this.chart;
                pe = e.index, t = this.normalize(t), t.returnValue = !1, "mousedown" === e.mouseIsDown && this.drag(t), (this.inClass(t.target, "highcharts-tracker") || e.isInsidePlot(t.chartX - e.plotLeft, t.chartY - e.plotTop)) && !e.openMenu && this.runPointActions(t)
            },
            inClass: function (t, e) {
                for (var i; t;) {
                    if (i = d(t, "class")) {
                        if (-1 !== i.indexOf(e)) return !0;
                        if (-1 !== i.indexOf("highcharts-container")) return !1
                    }
                    t = t.parentNode
                }
            },
            onTrackerMouseOut: function (t) {
                var e = this.chart.hoverSeries,
                    t = t.relatedTarget || t.toElement;
                !e || e.options.stickyTracking || this.inClass(t, "highcharts-tooltip") || this.inClass(t, "highcharts-series-" + e.index) || e.onMouseOut()
            },
            onContainerClick: function (t) {
                var e = this.chart,
                    i = e.hoverPoint,
                    n = e.plotLeft,
                    o = e.plotTop,
                    t = this.normalize(t);
                t.originalEvent = t, e.cancelClick || (i && this.inClass(t.target, "highcharts-tracker") ? (Qt(i.series, "click", jt(t, {
                    point: i
                })), e.hoverPoint && i.firePointEvent("click", t)) : (jt(t, this.getCoordinates(t)), e.isInsidePlot(t.chartX - n, t.chartY - o) && Qt(e, "click", t)))
            },
            setDOMEvents: function () {
                var t = this,
                    e = t.chart.container;
                e.onmousedown = function (e) {
                    t.onContainerMouseDown(e)
                }, e.onmousemove = function (e) {
                    t.onContainerMouseMove(e)
                }, e.onclick = function (e) {
                    t.onContainerClick(e)
                }, Jt(e, "mouseleave", t.onContainerMouseLeave), 1 === Lt && Jt(ot, "mouseup", t.onDocumentMouseUp), B && (e.ontouchstart = function (e) {
                    t.onContainerTouchStart(e)
                }, e.ontouchmove = function (e) {
                    t.onContainerTouchMove(e)
                }, 1 === Lt && Jt(ot, "touchend", t.onDocumentTouchEnd))
            },
            destroy: function () {
                var t;
                Zt(this.chart.container, "mouseleave", this.onContainerMouseLeave), Lt || (Zt(ot, "mouseup", this.onDocumentMouseUp), Zt(ot, "touchend", this.onDocumentTouchEnd)), clearInterval(this.tooltipTimeout);
                for (t in this) this[t] = null
            }
        }, jt(nt.Pointer.prototype, {
            pinchTranslate: function (t, e, i, n, o, s) {
                (this.zoomHor || this.pinchHor) && this.pinchTranslateDirection(!0, t, e, i, n, o, s), (this.zoomVert || this.pinchVert) && this.pinchTranslateDirection(!1, t, e, i, n, o, s)
            },
            pinchTranslateDirection: function (t, e, i, n, o, s, r, a) {
                var l, c, d, h = this.chart,
                    u = t ? "x" : "y",
                    p = t ? "X" : "Y",
                    f = "chart" + p,
                    m = t ? "width" : "height",
                    g = h["plot" + (t ? "Left" : "Top")],
                    v = a || 1,
                    y = h.inverted,
                    b = h.bounds[t ? "h" : "v"],
                    x = 1 === e.length,
                    w = e[0][f],
                    k = i[0][f],
                    _ = !x && e[1][f],
                    C = !x && i[1][f],
                    i = function () {
                        !x && ut(w - _) > 20 && (v = a || ut(k - C) / ut(w - _)), c = (g - k) / v + w, l = h["plot" + (t ? "Width" : "Height")] / v
                    };
                i(), e = c, e < b.min ? (e = b.min, d = !0) : e + l > b.max && (e = b.max - l, d = !0), d ? (k -= .8 * (k - r[u][0]), x || (C -= .8 * (C - r[u][1])), i()) : r[u] = [k, C], y || (s[u] = c - g, s[m] = l), s = y ? 1 / v : v, o[m] = l, o[u] = e, n[y ? t ? "scaleY" : "scaleX" : "scale" + p] = v, n["translate" + p] = s * g + (k - s * w)
            },
            pinch: function (t) {
                var e = this,
                    i = e.chart,
                    n = e.pinchDown,
                    o = t.touches,
                    s = o.length,
                    r = e.lastValidTouch,
                    a = e.hasZoom,
                    l = e.selectionMarker,
                    c = {},
                    d = 1 === s && (e.inClass(t.target, "highcharts-tracker") && i.runTrackerClick || e.runChartClick),
                    h = {};
                s > 1 && (e.initiated = !0), a && e.initiated && !d && t.preventDefault(), Kt(o, function (t) {
                    return e.normalize(t)
                }), "touchstart" === t.type ? (Vt(o, function (t, e) {
                    n[e] = {
                        chartX: t.chartX,
                        chartY: t.chartY
                    }
                }), r.x = [n[0].chartX, n[1] && n[1].chartX], r.y = [n[0].chartY, n[1] && n[1].chartY], Vt(i.axes, function (t) {
                    if (t.zoomEnabled) {
                        var e = i.bounds[t.horiz ? "h" : "v"],
                            n = t.minPixelPadding,
                            o = t.toPixels(Nt(t.options.min, t.dataMin)),
                            s = t.toPixels(Nt(t.options.max, t.dataMax)),
                            r = ht(o, s),
                            o = dt(o, s);
                        e.min = ht(t.pos, r - n), e.max = dt(t.pos + t.len, o + n)
                    }
                }), e.res = !0) : n.length && (l || (e.selectionMarker = l = jt({
                    destroy: At,
                    touch: !0
                }, i.plotBox)), e.pinchTranslate(n, o, c, l, h, r), e.hasPinched = a, e.scaleGroups(c, h), !a && e.followTouchMove && 1 === s ? this.runPointActions(e.normalize(t)) : e.res && (e.res = !1, this.reset(!1, 0)))
            },
            touch: function (t, e) {
                var i = this.chart;
                pe = i.index, 1 === t.touches.length ? (t = this.normalize(t), i.isInsidePlot(t.chartX - i.plotLeft, t.chartY - i.plotTop) && !i.openMenu ? (e && this.runPointActions(t), this.pinch(t)) : e && this.reset()) : 2 === t.touches.length && this.pinch(t)
            },
            onContainerTouchStart: function (t) {
                this.touch(t, !0)
            },
            onContainerTouchMove: function (t) {
                this.touch(t)
            },
            onDocumentTouchEnd: function (t) {
                Et[pe] && Et[pe].pointer.drop(t)
            }
        }), st.PointerEvent || st.MSPointerEvent) {
            var me = {},
                ge = !!st.PointerEvent,
                ve = function () {
                    var t, e = [];
                    e.item = function (t) {
                        return this[t]
                    };
                    for (t in me) me.hasOwnProperty(t) && e.push({
                        pageX: me[t].pageX,
                        pageY: me[t].pageY,
                        target: me[t].target
                    });
                    return e
                },
                ye = function (t, e, i, n) {
                    t = t.originalEvent || t, "touch" !== t.pointerType && t.pointerType !== t.MSPOINTER_TYPE_TOUCH || !Et[pe] || (n(t), n = Et[pe].pointer, n[e]({
                        type: i,
                        target: t.currentTarget,
                        preventDefault: At,
                        touches: ve()
                    }))
                };
            jt(fe.prototype, {
                onContainerPointerDown: function (t) {
                    ye(t, "onContainerTouchStart", "touchstart", function (t) {
                        me[t.pointerId] = {
                            pageX: t.pageX,
                            pageY: t.pageY,
                            target: t.currentTarget
                        }
                    })
                },
                onContainerPointerMove: function (t) {
                    ye(t, "onContainerTouchMove", "touchmove", function (t) {
                        me[t.pointerId] = {
                            pageX: t.pageX,
                            pageY: t.pageY
                        }, me[t.pointerId].target || (me[t.pointerId].target = t.currentTarget)
                    })
                },
                onDocumentPointerUp: function (t) {
                    ye(t, "onDocumentTouchEnd", "touchend", function (t) {
                        delete me[t.pointerId]
                    })
                },
                batchMSEvents: function (t) {
                    t(this.chart.container, ge ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown), t(this.chart.container, ge ? "pointermove" : "MSPointerMove", this.onContainerPointerMove), t(ot, ge ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            }), zt(fe.prototype, "init", function (t, e, i) {
                t.call(this, e, i), this.hasZoom && u(e.container, {
                    "-ms-touch-action": Bt,
                    "touch-action": Bt
                })
            }), zt(fe.prototype, "setDOMEvents", function (t) {
                t.apply(this), (this.hasZoom || this.followTouchMove) && this.batchMSEvents(Jt)
            }), zt(fe.prototype, "destroy", function (t) {
                this.batchMSEvents(Zt), t.call(this)
            })
        }
        var be = nt.Legend = function (t, e) {
            this.init(t, e)
        };
        be.prototype = {
            init: function (e, i) {
                var n = this,
                    o = i.itemStyle,
                    s = i.itemMarginTop || 0;
                this.options = i, i.enabled && (n.itemStyle = o, n.itemHiddenStyle = t(o, i.itemHiddenStyle), n.itemMarginTop = s, n.padding = o = Nt(i.padding, 8), n.initialItemX = o, n.initialItemY = o - 5, n.maxItemWidth = 0, n.chart = e, n.itemHeight = 0, n.symbolWidth = Nt(i.symbolWidth, 16), n.pages = [], n.render(), Jt(n.chart, "endResize", function () {
                    n.positionCheckboxes()
                }))
            },
            colorizeItem: function (t, e) {
                var i, n = this.options,
                    o = t.legendItem,
                    s = t.legendLine,
                    r = t.legendSymbol,
                    a = this.itemHiddenStyle.color,
                    n = e ? n.itemStyle.color : a,
                    l = e ? t.legendColor || t.color || "#CCC" : a,
                    a = t.options && t.options.marker,
                    c = {
                        fill: l
                    };
                if (o && o.css({
                    fill: n,
                    color: n
                }), s && s.attr({
                    stroke: l
                }), r) {
                    if (a && r.isMarker)
                        for (i in c.stroke = l, a = t.convertAttribs(a)) o = a[i], o !== L && (c[i] = o);
                    r.attr(c)
                }
            },
            positionItem: function (t) {
                var e = this.options,
                    i = e.symbolPadding,
                    e = !e.rtl,
                    n = t._legendItemPos,
                    o = n[0],
                    n = n[1],
                    s = t.checkbox;
                (t = t.legendGroup) && t.element && t.translate(e ? o : this.legendWidth - o - 2 * i - 4, n), s && (s.x = o, s.y = n)
            },
            destroyItem: function (t) {
                var e = t.checkbox;
                Vt(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function (e) {
                    t[e] && (t[e] = t[e].destroy())
                }), e && C(t.checkbox)
            },
            destroy: function () {
                var t = this.group,
                    e = this.box;
                e && (this.box = e.destroy()), t && (this.group = t.destroy())
            },
            positionCheckboxes: function (t) {
                var e, i = this.group.alignAttr,
                    n = this.clipHeight || this.legendHeight;
                i && (e = i.translateY, Vt(this.allItems, function (o) {
                    var s, r = o.checkbox;
                    r && (s = e + r.y + (t || 0) + 3, u(r, {
                        left: i.translateX + o.checkboxOffset + r.x - 20 + "px",
                        top: s + "px",
                        display: s > e - 6 && e + n - 6 > s ? "" : Bt
                    }))
                }))
            },
            renderTitle: function () {
                var t = this.padding,
                    e = this.options.title,
                    i = 0;
                e.text && (this.title || (this.title = this.chart.renderer.label(e.text, t - 3, t - 4, null, null, null, null, null, "legend-title").attr({
                    zIndex: 1
                }).css(e.style).add(this.group)), t = this.title.getBBox(), i = t.height, this.offsetWidth = t.width, this.contentGroup.attr({
                    translateY: i
                })), this.titleHeight = i
            },
            setText: function (t) {
                var e = this.options;
                t.legendItem.attr({
                    text: e.labelFormat ? v(e.labelFormat, t) : e.labelFormatter.call(t)
                })
            },
            renderItem: function (e) {
                var i = this.chart,
                    n = i.renderer,
                    o = this.options,
                    s = "horizontal" === o.layout,
                    r = this.symbolWidth,
                    a = o.symbolPadding,
                    l = this.itemStyle,
                    c = this.itemHiddenStyle,
                    d = this.padding,
                    h = s ? Nt(o.itemDistance, 20) : 0,
                    u = !o.rtl,
                    p = o.width,
                    f = o.itemMarginBottom || 0,
                    m = this.itemMarginTop,
                    g = this.initialItemX,
                    v = e.legendItem,
                    y = e.series && e.series.drawLegendSymbol ? e.series : e,
                    b = y.options,
                    b = this.createCheckboxForItem && b && b.showCheckbox,
                    x = o.useHTML;
                v || (e.legendGroup = n.g("legend-item").attr({
                    zIndex: 1
                }).add(this.scrollGroup), e.legendItem = v = n.text("", u ? r + a : -a, this.baseline || 0, x).css(t(e.visible ? l : c)).attr({
                    align: u ? "left" : "right",
                    zIndex: 2
                }).add(e.legendGroup), this.baseline || (this.fontMetrics = n.fontMetrics(l.fontSize, v), this.baseline = this.fontMetrics.f + 3 + m, v.attr("y", this.baseline)), y.drawLegendSymbol(this, e), this.setItemEvents && this.setItemEvents(e, v, x, l, c), this.colorizeItem(e, e.visible), b && this.createCheckboxForItem(e)), this.setText(e), n = v.getBBox(), r = e.checkboxOffset = o.itemWidth || e.legendItemWidth || r + a + n.width + h + (b ? 20 : 0), this.itemHeight = a = at(e.legendItemHeight || n.height), s && this.itemX - g + r > (p || i.chartWidth - 2 * d - g - o.x) && (this.itemX = g, this.itemY += m + this.lastLineHeight + f, this.lastLineHeight = 0), this.maxItemWidth = dt(this.maxItemWidth, r), this.lastItemY = m + this.itemY + f, this.lastLineHeight = dt(a, this.lastLineHeight), e._legendItemPos = [this.itemX, this.itemY], s ? this.itemX += r : (this.itemY += m + a + f, this.lastLineHeight = a), this.offsetWidth = p || dt((s ? this.itemX - g - h : r) + d, this.offsetWidth)
            },
            getAllItems: function () {
                var t = [];
                return Vt(this.chart.series, function (e) {
                    var i = e.options;
                    Nt(i.showInLegend, c(i.linkedTo) ? !1 : L, !0) && (t = t.concat(e.legendItems || ("point" === i.legendType ? e.data : e)))
                }), t
            },
            adjustMargins: function (t, e) {
                var i = this.chart,
                    n = this.options,
                    o = n.align.charAt(0) + n.verticalAlign.charAt(0) + n.layout.charAt(0);
                this.display && !n.floating && Vt([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function (s, r) {
                    s.test(o) && !c(t[r]) && (i[Ht[r]] = dt(i[Ht[r]], i.legend[(r + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][r] * n[r % 2 ? "x" : "y"] + Nt(n.margin, 12) + e[r]))
                })
            },
            render: function () {
                var t, e, i, n, o = this,
                    s = o.chart,
                    r = s.renderer,
                    a = o.group,
                    l = o.box,
                    c = o.options,
                    d = o.padding,
                    h = c.borderWidth,
                    u = c.backgroundColor;
                o.itemX = o.initialItemX, o.itemY = o.initialItemY, o.offsetWidth = 0, o.lastItemY = 0, a || (o.group = a = r.g("legend").attr({
                    zIndex: 7
                }).add(), o.contentGroup = r.g().attr({
                    zIndex: 1
                }).add(a), o.scrollGroup = r.g().add(o.contentGroup)), o.renderTitle(), t = o.getAllItems(), x(t, function (t, e) {
                    return (t.options && t.options.legendIndex || 0) - (e.options && e.options.legendIndex || 0)
                }), c.reversed && t.reverse(), o.allItems = t, o.display = e = !!t.length, o.lastLineHeight = 0, Vt(t, function (t) {
                    o.renderItem(t)
                }), i = (c.width || o.offsetWidth) + d, n = o.lastItemY + o.lastLineHeight + o.titleHeight, n = o.handleOverflow(n), n += d, (h || u) && (l ? i > 0 && n > 0 && (l[l.isNew ? "attr" : "animate"](l.crisp({
                    width: i,
                    height: n
                })), l.isNew = !1) : (o.box = l = r.rect(0, 0, i, n, c.borderRadius, h || 0).attr({
                    stroke: c.borderColor,
                    "stroke-width": h || 0,
                    fill: u || Bt
                }).add(a).shadow(c.shadow), l.isNew = !0), l[e ? "show" : "hide"]()), o.legendWidth = i, o.legendHeight = n, Vt(t, function (t) {
                    o.positionItem(t)
                }), e && a.align(jt({
                    width: i,
                    height: n
                }, c), !0, "spacingBox"), s.isResizing || this.positionCheckboxes()
            },
            handleOverflow: function (t) {
                var e, i, n = this,
                    o = this.chart,
                    s = o.renderer,
                    r = this.options,
                    a = r.y,
                    a = o.spacingBox.height + ("top" === r.verticalAlign ? -a : a) - this.padding,
                    l = r.maxHeight,
                    c = this.clipRect,
                    d = r.navigation,
                    h = Nt(d.animation, !0),
                    u = d.arrowSize || 12,
                    p = this.nav,
                    f = this.pages,
                    m = this.padding,
                    g = this.allItems,
                    v = function (t) {
                        c.attr({
                            height: t
                        }), n.contentGroup.div && (n.contentGroup.div.style.clip = "rect(" + m + "px,9999px," + (m + t) + "px,0)")
                    };
                return "horizontal" === r.layout && (a /= 2), l && (a = ht(a, l)), f.length = 0, t > a ? (this.clipHeight = e = dt(a - 20 - this.titleHeight - m, 0), this.currentPage = Nt(this.currentPage, 1), this.fullHeight = t, Vt(g, function (t, n) {
                    var o = t._legendItemPos[1],
                        s = at(t.legendItem.getBBox().height),
                        r = f.length;
                    (!r || o - f[r - 1] > e && (i || o) !== f[r - 1]) && (f.push(i || o), r++), n === g.length - 1 && o + s - f[r - 1] > e && f.push(o), o !== i && (i = o)
                }), c || (c = n.clipRect = s.clipRect(0, m, 9999, 0), n.contentGroup.clip(c)), v(e), p || (this.nav = p = s.g().attr({
                    zIndex: 1
                }).add(this.group), this.up = s.symbol("triangle", 0, 0, u, u).on("click", function () {
                    n.scroll(-1, h)
                }).add(p), this.pager = s.text("", 15, 10).css(d.style).add(p), this.down = s.symbol("triangle-down", 0, 0, u, u).on("click", function () {
                    n.scroll(1, h)
                }).add(p)), n.scroll(0), t = a) : p && (v(o.chartHeight), p.hide(), this.scrollGroup.attr({
                    translateY: 1
                }), this.clipHeight = 0), t
            },
            scroll: function (t, e) {
                var i = this.pages,
                    n = i.length,
                    o = this.currentPage + t,
                    s = this.clipHeight,
                    r = this.options.navigation,
                    a = r.activeColor,
                    r = r.inactiveColor,
                    l = this.pager,
                    c = this.padding;
                o > n && (o = n), o > 0 && (e !== L && S(e, this.chart), this.nav.attr({
                    translateX: c,
                    translateY: s + this.padding + 7 + this.titleHeight,
                    visibility: "visible"
                }), this.up.attr({
                    fill: 1 === o ? r : a
                }).css({
                    cursor: 1 === o ? "default" : "pointer"
                }), l.attr({
                    text: o + "/" + n
                }), this.down.attr({
                    x: 18 + this.pager.getBBox().width,
                    fill: o === n ? r : a
                }).css({
                    cursor: o === n ? "default" : "pointer"
                }), i = -i[o - 1] + this.initialItemY, this.scrollGroup.animate({
                    translateY: i
                }), this.currentPage = o, this.positionCheckboxes(i))
            }
        }, ce = nt.LegendSymbolMixin = {
            drawRectangle: function (t, e) {
                var i = t.options.symbolHeight || t.fontMetrics.f;
                e.legendSymbol = this.chart.renderer.rect(0, t.baseline - i + 1, t.symbolWidth, i, t.options.symbolRadius || 0).attr({
                    zIndex: 3
                }).add(e.legendGroup)
            },
            drawLineMarker: function (t) {
                var e, i = this.options,
                    n = i.marker;
                e = t.symbolWidth;
                var o, s = this.chart.renderer,
                    r = this.legendGroup,
                    t = t.baseline - at(.3 * t.fontMetrics.b);
                i.lineWidth && (o = {
                    "stroke-width": i.lineWidth
                }, i.dashStyle && (o.dashstyle = i.dashStyle), this.legendLine = s.path(["M", 0, t, "L", e, t]).attr(o).add(r)), n && n.enabled !== !1 && (i = n.radius, this.legendSymbol = e = s.symbol(this.symbol, e / 2 - i, t - i, 2 * i, 2 * i).add(r), e.isMarker = !0)
            }
        }, (/Trident\/7\.0/.test(vt) || kt) && zt(be.prototype, "positionItem", function (t, e) {
            var i = this,
                n = function () {
                    e._legendItemPos && t.call(i, e)
                };
            n(), setTimeout(n)
        }), qt = nt.Chart = function () {
            this.init.apply(this, arguments)
        }, qt.prototype = {
            callbacks: [],
            init: function (e, i) {
                var n, o = e.series;
                e.series = null, n = t(H, e), n.series = e.series = o, this.userOptions = e, o = n.chart, this.margin = this.splashArray("margin", o), this.spacing = this.splashArray("spacing", o);
                var s = o.events;
                this.bounds = {
                    h: {},
                    v: {}
                }, this.callback = i, this.isResizing = 0, this.options = n, this.axes = [], this.series = [], this.hasCartesianSeries = o.showAxes;
                var r, a = this;
                if (a.index = Et.length, Et.push(a), Lt++ , o.reflow !== !1 && Jt(a, "load", function () {
                    a.initReflow()
                }), s)
                    for (r in s) Jt(a, r, s[r]);
                a.xAxis = [], a.yAxis = [], a.animation = St ? !1 : Nt(o.animation, !0), a.pointCount = a.colorCounter = a.symbolCounter = 0, a.firstRender()
            },
            initSeries: function (t) {
                var e = this.options.chart;
                return (e = Ot[t.type || e.type || e.defaultSeriesType]) || T(17, !0), e = new e, e.init(this, t), e
            },
            isInsidePlot: function (t, e, i) {
                var n = i ? e : t,
                    t = i ? t : e;
                return n >= 0 && n <= this.plotWidth && t >= 0 && t <= this.plotHeight
            },
            redraw: function (t) {
                var e, i, n = this.axes,
                    o = this.series,
                    s = this.pointer,
                    r = this.legend,
                    a = this.isDirtyLegend,
                    l = this.hasCartesianSeries,
                    c = this.isDirtyBox,
                    d = o.length,
                    h = d,
                    u = this.renderer,
                    p = u.isHidden(),
                    f = [];
                for (S(t, this), p && this.cloneRenderTo(), this.layOutTitles(); h--;)
                    if (t = o[h], t.options.stacking && (e = !0, t.isDirty)) {
                        i = !0;
                        break
                    }
                if (i)
                    for (h = d; h--;) t = o[h], t.options.stacking && (t.isDirty = !0);
                Vt(o, function (t) {
                    t.isDirty && "point" === t.options.legendType && (t.updateTotals && t.updateTotals(), a = !0)
                }), a && r.options.enabled && (r.render(), this.isDirtyLegend = !1), e && this.getStacks(), l && !this.isResizing && (this.maxTicks = null, Vt(n, function (t) {
                    t.setScale()
                })), this.getMargins(), l && (Vt(n, function (t) {
                    t.isDirty && (c = !0)
                }), Vt(n, function (t) {
                    var i = t.min + "," + t.max;
                    t.extKey !== i && (t.extKey = i, f.push(function () {
                        Qt(t, "afterSetExtremes", jt(t.eventArgs, t.getExtremes())), delete t.eventArgs
                    })), (c || e) && t.redraw()
                })), c && this.drawChartBox(), Vt(o, function (t) {
                    t.isDirty && t.visible && (!t.isCartesian || t.xAxis) && t.redraw()
                }), s && s.reset(!0), u.draw(), Qt(this, "redraw"), p && this.cloneRenderTo(!0), Vt(f, function (t) {
                    t.call()
                })
            },
            get: function (t) {
                var e, i, n = this.axes,
                    o = this.series;
                for (e = 0; e < n.length; e++)
                    if (n[e].options.id === t) return n[e];
                for (e = 0; e < o.length; e++)
                    if (o[e].options.id === t) return o[e];
                for (e = 0; e < o.length; e++)
                    for (i = o[e].points || [], n = 0; n < i.length; n++)
                        if (i[n].id === t) return i[n];
                return null
            },
            getAxes: function () {
                var t = this,
                    e = this.options,
                    i = e.xAxis = h(e.xAxis || {}),
                    e = e.yAxis = h(e.yAxis || {});
                Vt(i, function (t, e) {
                    t.index = e, t.isX = !0
                }), Vt(e, function (t, e) {
                    t.index = e
                }), i = i.concat(e), Vt(i, function (e) {
                    new he(t, e)
                })
            },
            getSelectedPoints: function () {
                var t = [];
                return Vt(this.series, function (e) {
                    t = t.concat(Gt(e.points || [], function (t) {
                        return t.selected
                    }))
                }), t
            },
            getSelectedSeries: function () {
                return Gt(this.series, function (t) {
                    return t.selected
                })
            },
            setTitle: function (e, i, n) {
                var o, s, r = this,
                    a = r.options;
                s = a.title = t(a.title, e), o = a.subtitle = t(a.subtitle, i), a = o, Vt([
                    ["title", e, s],
                    ["subtitle", i, a]
                ], function (t) {
                    var e = t[0],
                        i = r[e],
                        n = t[1],
                        t = t[2];
                    i && n && (r[e] = i = i.destroy()), t && t.text && !i && (r[e] = r.renderer.text(t.text, 0, 0, t.useHTML).attr({
                        align: t.align,
                        "class": "highcharts-" + e,
                        zIndex: t.zIndex || 4
                    }).css(t.style).add())
                }), r.layOutTitles(n)
            },
            layOutTitles: function (t) {
                var e = 0,
                    i = this.title,
                    n = this.subtitle,
                    o = this.options,
                    s = o.title,
                    o = o.subtitle,
                    r = this.renderer,
                    a = this.spacingBox.width - 44;
                !i || (i.css({
                    width: (s.width || a) + "px"
                }).align(jt({
                    y: r.fontMetrics(s.style.fontSize, i).b - 3
                }, s), !1, "spacingBox"), s.floating || s.verticalAlign) || (e = i.getBBox().height), n && (n.css({
                    width: (o.width || a) + "px"
                }).align(jt({
                    y: e + (s.margin - 13) + r.fontMetrics(o.style.fontSize, i).b
                }, o), !1, "spacingBox"), !o.floating && !o.verticalAlign && (e = ct(e + n.getBBox().height))), i = this.titleOffset !== e, this.titleOffset = e, !this.isDirtyBox && i && (this.isDirtyBox = i, this.hasRendered && Nt(t, !0) && this.isDirtyBox && this.redraw())
            },
            getChartSize: function () {
                var t = this.options.chart,
                    e = t.width,
                    t = t.height,
                    i = this.renderToClone || this.renderTo;
                c(e) || (this.containerWidth = Wt(i, "width")), c(t) || (this.containerHeight = Wt(i, "height")), this.chartWidth = dt(0, e || this.containerWidth || 600), this.chartHeight = dt(0, Nt(t, this.containerHeight > 19 ? this.containerHeight : 400))
            },
            cloneRenderTo: function (t) {
                var e = this.renderToClone,
                    i = this.container;
                t ? e && (this.renderTo.appendChild(i), C(e), delete this.renderToClone) : (i && i.parentNode === this.renderTo && this.renderTo.removeChild(i), this.renderToClone = e = this.renderTo.cloneNode(0), u(e, {
                    position: "absolute",
                    top: "-9999px",
                    display: "block"
                }), e.style.setProperty && e.style.setProperty("display", "block", "important"), ot.body.appendChild(e), i && e.appendChild(i))
            },
            getContainer: function () {
                var t, n, o, s, r = this.options,
                    a = r.chart;
                this.renderTo = t = a.renderTo, s = "highcharts-" + Mt++ , i(t) && (this.renderTo = t = ot.getElementById(t)), t || T(13, !0), n = e(d(t, "data-highcharts-chart")), !isNaN(n) && Et[n] && Et[n].hasRendered && Et[n].destroy(), d(t, "data-highcharts-chart", this.index), t.innerHTML = "", !a.skipClone && !t.offsetWidth && this.cloneRenderTo(), this.getChartSize(), n = this.chartWidth, o = this.chartHeight, this.container = t = p(Dt, {
                    className: "highcharts-container" + (a.className ? " " + a.className : ""),
                    id: s
                }, jt({
                    position: "relative",
                    overflow: "hidden",
                    width: n + "px",
                    height: o + "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                }, a.style), this.renderToClone || t), this._cursor = t.style.cursor, this.renderer = new (nt[a.renderer] || D)(t, n, o, a.style, a.forExport, r.exporting && r.exporting.allowHTML), St && this.renderer.create(this, t, n, o), this.renderer.chartIndex = this.index
            },
            getMargins: function (t) {
                var e = this.spacing,
                    i = this.margin,
                    n = this.titleOffset;
                this.resetMargins(), n && !c(i[0]) && (this.plotTop = dt(this.plotTop, n + this.options.title.margin + e[0])), this.legend.adjustMargins(i, e), this.extraBottomMargin && (this.marginBottom += this.extraBottomMargin), this.extraTopMargin && (this.plotTop += this.extraTopMargin), t || this.getAxisMargins()
            },
            getAxisMargins: function () {
                var t = this,
                    e = t.axisOffset = [0, 0, 0, 0],
                    i = t.margin;
                t.hasCartesianSeries && Vt(t.axes, function (t) {
                    t.visible && t.getOffset()
                }), Vt(Ht, function (n, o) {
                    c(i[o]) || (t[n] += e[o])
                }), t.setChartSize()
            },
            reflow: function (t) {
                var e = this,
                    i = e.options.chart,
                    n = e.renderTo,
                    o = i.width || Wt(n, "width"),
                    s = i.height || Wt(n, "height"),
                    i = t ? t.target : st,
                    n = function () {
                        e.container && (e.setSize(o, s, !1), e.hasUserSize = null)
                    };
                e.hasUserSize || e.isPrinting || !o || !s || i !== st && i !== ot || ((o !== e.containerWidth || s !== e.containerHeight) && (clearTimeout(e.reflowTimeout), t ? e.reflowTimeout = setTimeout(n, 100) : n()), e.containerWidth = o, e.containerHeight = s)
            },
            initReflow: function () {
                var t = this,
                    e = function (e) {
                        t.reflow(e)
                    };
                Jt(st, "resize", e), Jt(t, "destroy", function () {
                    Zt(st, "resize", e)
                })
            },
            setSize: function (t, e, i) {
                var n, o, s, r = this,
                    a = r.renderer;
                r.isResizing += 1, s = function () {
                    r && Qt(r, "endResize", null, function () {
                        r.isResizing -= 1
                    })
                }, S(i, r), r.oldChartHeight = r.chartHeight, r.oldChartWidth = r.chartWidth, c(t) && (r.chartWidth = n = dt(0, at(t)), r.hasUserSize = !!n), c(e) && (r.chartHeight = o = dt(0, at(e))), t = a.globalAnimation, (t ? ee : u)(r.container, {
                    width: n + "px",
                    height: o + "px"
                }, t), r.setChartSize(!0), a.setSize(n, o, i), r.maxTicks = null, Vt(r.axes, function (t) {
                    t.isDirty = !0, t.setScale()
                }), Vt(r.series, function (t) {
                    t.isDirty = !0
                }), r.isDirtyLegend = !0, r.isDirtyBox = !0, r.layOutTitles(), r.getMargins(), r.redraw(i), r.oldChartHeight = null, Qt(r, "resize"), t = a.globalAnimation, t === !1 ? s() : setTimeout(s, t && t.duration || 500)
            },
            setChartSize: function (t) {
                var e, i, n, o, s = this.inverted,
                    r = this.renderer,
                    a = this.chartWidth,
                    l = this.chartHeight,
                    c = this.options.chart,
                    d = this.spacing,
                    h = this.clipOffset;
                this.plotLeft = e = at(this.plotLeft), this.plotTop = i = at(this.plotTop), this.plotWidth = n = dt(0, at(a - e - this.marginRight)), this.plotHeight = o = dt(0, at(l - i - this.marginBottom)), this.plotSizeX = s ? o : n, this.plotSizeY = s ? n : o, this.plotBorderWidth = c.plotBorderWidth || 0, this.spacingBox = r.spacingBox = {
                    x: d[3],
                    y: d[0],
                    width: a - d[3] - d[1],
                    height: l - d[0] - d[2]
                }, this.plotBox = r.plotBox = {
                    x: e,
                    y: i,
                    width: n,
                    height: o
                }, a = 2 * lt(this.plotBorderWidth / 2), s = ct(dt(a, h[3]) / 2), r = ct(dt(a, h[0]) / 2), this.clipBox = {
                    x: s,
                    y: r,
                    width: lt(this.plotSizeX - dt(a, h[1]) / 2 - s),
                    height: dt(0, lt(this.plotSizeY - dt(a, h[2]) / 2 - r))
                }, t || Vt(this.axes, function (t) {
                    t.setAxisSize(), t.setAxisTranslation()
                })
            },
            resetMargins: function () {
                var t = this;
                Vt(Ht, function (e, i) {
                    t[e] = Nt(t.margin[i], t.spacing[i])
                }), t.axisOffset = [0, 0, 0, 0], t.clipOffset = [0, 0, 0, 0]
            },
            drawChartBox: function () {
                var t, e = this.options.chart,
                    i = this.renderer,
                    n = this.chartWidth,
                    o = this.chartHeight,
                    s = this.chartBackground,
                    r = this.plotBackground,
                    a = this.plotBorder,
                    l = this.plotBGImage,
                    c = e.borderWidth || 0,
                    d = e.backgroundColor,
                    h = e.plotBackgroundColor,
                    u = e.plotBackgroundImage,
                    p = e.plotBorderWidth || 0,
                    f = this.plotLeft,
                    m = this.plotTop,
                    g = this.plotWidth,
                    v = this.plotHeight,
                    y = this.plotBox,
                    b = this.clipRect,
                    x = this.clipBox;
                t = c + (e.shadow ? 8 : 0), (c || d) && (s ? s.animate(s.crisp({
                    width: n - t,
                    height: o - t
                })) : (s = {
                    fill: d || Bt
                }, c && (s.stroke = e.borderColor, s["stroke-width"] = c), this.chartBackground = i.rect(t / 2, t / 2, n - t, o - t, e.borderRadius, c).attr(s).addClass("highcharts-background").add().shadow(e.shadow))), h && (r ? r.animate(y) : this.plotBackground = i.rect(f, m, g, v, 0).attr({
                    fill: h
                }).add().shadow(e.plotShadow)), u && (l ? l.animate(y) : this.plotBGImage = i.image(u, f, m, g, v).add()), b ? b.animate({
                    width: x.width,
                    height: x.height
                }) : this.clipRect = i.clipRect(x), p && (a ? a.animate(a.crisp({
                    x: f,
                    y: m,
                    width: g,
                    height: v,
                    strokeWidth: -p
                })) : this.plotBorder = i.rect(f, m, g, v, 0, -p).attr({
                    stroke: e.plotBorderColor,
                    "stroke-width": p,
                    fill: Bt,
                    zIndex: 1
                }).add()), this.isDirtyBox = !1
            },
            propFromSeries: function () {
                var t, e, i, n = this,
                    o = n.options.chart,
                    s = n.options.series;
                Vt(["inverted", "angular", "polar"], function (r) {
                    for (t = Ot[o.type || o.defaultSeriesType], i = n[r] || o[r] || t && t.prototype[r], e = s && s.length; !i && e--;)(t = Ot[s[e].type]) && t.prototype[r] && (i = !0);
                    n[r] = i
                })
            },
            linkSeries: function () {
                var t = this,
                    e = t.series;
                Vt(e, function (t) {
                    t.linkedSeries.length = 0
                }), Vt(e, function (e) {
                    var n = e.options.linkedTo;
                    i(n) && (n = ":previous" === n ? t.series[e.index - 1] : t.get(n)) && (n.linkedSeries.push(e), e.linkedParent = n, e.visible = Nt(e.options.visible, n.options.visible, e.visible))
                })
            },
            renderSeries: function () {
                Vt(this.series, function (t) {
                    t.translate(), t.render()
                })
            },
            renderLabels: function () {
                var t = this,
                    i = t.options.labels;
                i.items && Vt(i.items, function (n) {
                    var o = jt(i.style, n.style),
                        s = e(o.left) + t.plotLeft,
                        r = e(o.top) + t.plotTop + 12;
                    delete o.left, delete o.top, t.renderer.text(n.html, s, r).attr({
                        zIndex: 2
                    }).css(o).add()
                })
            },
            render: function () {
                var t, e, i, n, o = this.axes,
                    s = this.renderer,
                    r = this.options;
                this.setTitle(), this.legend = new be(this, r.legend), this.getStacks && this.getStacks(), this.getMargins(!0), this.setChartSize(), t = this.plotWidth, e = this.plotHeight -= 13, Vt(o, function (t) {
                    t.setScale()
                }), this.getAxisMargins(), i = t / this.plotWidth > 1.1, n = e / this.plotHeight > 1.1, (i || n) && (this.maxTicks = null, Vt(o, function (t) {
                    (t.horiz && i || !t.horiz && n) && t.setTickInterval(!0)
                }), this.getMargins()), this.drawChartBox(), this.hasCartesianSeries && Vt(o, function (t) {
                    t.visible && t.render()
                }), this.seriesGroup || (this.seriesGroup = s.g("series-group").attr({
                    zIndex: 3
                }).add()), this.renderSeries(), this.renderLabels(), this.showCredits(r.credits), this.hasRendered = !0
            },
            showCredits: function (t) {
                t.enabled && !this.credits && (this.credits = this.renderer.text(t.text, 0, 0).on("click", function () {
                    t.href && (location.href = t.href)
                }).attr({
                    align: t.position.align,
                    zIndex: 8
                }).css(t.style).add().align(t.position))
            },
            destroy: function () {
                var t, e = this,
                    i = e.axes,
                    n = e.series,
                    o = e.container,
                    s = o && o.parentNode;
                for (Qt(e, "destroy"), Et[e.index] = L, Lt-- , e.renderTo.removeAttribute("data-highcharts-chart"), Zt(e), t = i.length; t--;) i[t] = i[t].destroy();
                for (t = n.length; t--;) n[t] = n[t].destroy();
                Vt("title,subtitle,chartBackground,plotBackground,plotBGImage,plotBorder,seriesGroup,clipRect,credits,pointer,scroller,rangeSelector,legend,resetZoomButton,tooltip,renderer".split(","), function (t) {
                    var i = e[t];
                    i && i.destroy && (e[t] = i.destroy())
                }), o && (o.innerHTML = "", Zt(o), s && C(o));
                for (t in e) delete e[t]
            },
            isReadyToRender: function () {
                var t = this;
                return !Tt && st == st.top && "complete" !== ot.readyState || St && !st.canvg ? (St ? de.push(function () {
                    t.firstRender()
                }, t.options.global.canvasToolsURL) : ot.attachEvent("onreadystatechange", function () {
                    ot.detachEvent("onreadystatechange", t.firstRender), "complete" === ot.readyState && t.firstRender()
                }), !1) : !0
            },
            firstRender: function () {
                var t = this,
                    e = t.options,
                    i = t.callback;
                t.isReadyToRender() && (t.getContainer(), Qt(t, "init"), t.resetMargins(), t.setChartSize(), t.propFromSeries(), t.getAxes(), Vt(e.series || [], function (e) {
                    t.initSeries(e)
                }), t.linkSeries(), Qt(t, "beforeRender"), nt.Pointer && (t.pointer = new fe(t, e)), t.render(), t.renderer.draw(), i && i.apply(t, [t]), Vt(t.callbacks, function (e) {
                    t.index !== L && e.apply(t, [t])
                }), Qt(t, "load"), t.cloneRenderTo(!0))
            },
            splashArray: function (t, e) {
                var i = e[t],
                    i = n(i) ? i : [i, i, i, i];
                return [Nt(e[t + "Top"], i[0]), Nt(e[t + "Right"], i[1]), Nt(e[t + "Bottom"], i[2]), Nt(e[t + "Left"], i[3])]
            }
        };
        var xe = nt.CenteredSeriesMixin = {
            getCenter: function () {
                var t, e, i = this.options,
                    n = this.chart,
                    o = 2 * (i.slicedOffset || 0),
                    s = n.plotWidth - 2 * o,
                    n = n.plotHeight - 2 * o,
                    r = i.center,
                    r = [Nt(r[0], "50%"), Nt(r[1], "50%"), i.size || "100%", i.innerSize || 0],
                    a = ht(s, n);
                for (t = 0; 4 > t; ++t) e = r[t], i = 2 > t || 2 === t && /%$/.test(e), r[t] = (/%$/.test(e) ? [s, n, a, r[2]][t] * parseFloat(e) / 100 : parseFloat(e)) + (i ? o : 0);
                return r[3] > r[2] && (r[3] = r[2]), r
            }
        },
            we = function () { };
        we.prototype = {
            init: function (t, e, i) {
                return this.series = t, this.color = t.color, this.applyOptions(e, i), this.pointAttr = {}, t.options.colorByPoint && (e = t.options.colors || t.chart.options.colors, this.color = this.color || e[t.colorCounter++], t.colorCounter === e.length) && (t.colorCounter = 0), t.chart.pointCount++ , this
            },
            applyOptions: function (t, e) {
                var i = this.series,
                    n = i.options.pointValKey || i.pointValKey,
                    t = we.prototype.optionsToObject.call(this, t);
                return jt(this, t), this.options = this.options ? jt(this.options, t) : t, n && (this.y = this[n]), this.x === L && i && (this.x = e === L ? i.autoIncrement() : e), this
            },
            optionsToObject: function (t) {
                var e = {},
                    i = this.series,
                    n = i.options.keys,
                    s = n || i.pointArrayMap || ["y"],
                    r = s.length,
                    a = 0,
                    l = 0;
                if ("number" == typeof t || null === t) e[s[0]] = t;
                else if (o(t))
                    for (!n && t.length > r && (i = typeof t[0], "string" === i ? e.name = t[0] : "number" === i && (e.x = t[0]), a++); r > l;) n && void 0 === t[a] || (e[s[l]] = t[a]), a++ , l++;
                else "object" == typeof t && (e = t, t.dataLabels && (i._hasPointLabels = !0), t.marker && (i._hasPointMarkers = !0));
                return e
            },
            destroy: function () {
                var t, e = this.series.chart,
                    i = e.hoverPoints;
                e.pointCount-- , i && (this.setState(), l(i, this), !i.length) && (e.hoverPoints = null), this === e.hoverPoint && this.onMouseOut(), (this.graphic || this.dataLabel) && (Zt(this), this.destroyElements()), this.legendItem && e.legend.destroyItem(this);
                for (t in this) this[t] = null
            },
            destroyElements: function () {
                for (var t, e = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], i = 6; i--;) t = e[i], this[t] && (this[t] = this[t].destroy())
            },
            getLabelConfig: function () {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            },
            tooltipFormatter: function (t) {
                var e = this.series,
                    i = e.tooltipOptions,
                    n = Nt(i.valueDecimals, ""),
                    o = i.valuePrefix || "",
                    s = i.valueSuffix || "";
                return Vt(e.pointArrayMap || ["y"], function (e) {
                    e = "{point." + e, (o || s) && (t = t.replace(e + "}", o + e + "}" + s)), t = t.replace(e + "}", e + ":,." + n + "f}")
                }), v(t, {
                    point: this,
                    series: this.series
                })
            },
            firePointEvent: function (t, e, i) {
                var n = this,
                    o = this.series.options;
                (o.point.events[t] || n.options && n.options.events && n.options.events[t]) && this.importEvents(), "click" === t && o.allowPointSelect && (i = function (t) {
                    n.select && n.select(null, t.ctrlKey || t.metaKey || t.shiftKey)
                }), Qt(this, t, e, i)
            },
            visible: !0
        };
        var ke = nt.Series = function () { };
        ke.prototype = {
            isCartesian: !0,
            type: "line",
            pointClass: we,
            sorted: !0,
            requireSorting: !0,
            pointAttrToOptions: {
                stroke: "lineColor",
                "stroke-width": "lineWidth",
                fill: "fillColor",
                r: "radius"
            },
            directTouch: !1,
            axisTypes: ["xAxis", "yAxis"],
            colorCounter: 0,
            parallelArrays: ["x", "y"],
            init: function (t, e) {
                var i, n, o = this,
                    s = t.series,
                    r = function (t, e) {
                        return Nt(t.options.index, t._i) - Nt(e.options.index, e._i)
                    };
                o.chart = t, o.options = e = o.setOptions(e), o.linkedSeries = [], o.bindAxes(), jt(o, {
                    name: e.name,
                    state: "",
                    pointAttr: {},
                    visible: e.visible !== !1,
                    selected: e.selected === !0
                }), St && (e.animation = !1), n = e.events;
                for (i in n) Jt(o, i, n[i]);
                (n && n.click || e.point && e.point.events && e.point.events.click || e.allowPointSelect) && (t.runTrackerClick = !0), o.getColor(), o.getSymbol(), Vt(o.parallelArrays, function (t) {
                    o[t + "Data"] = []
                }), o.setData(e.data, !1), o.isCartesian && (t.hasCartesianSeries = !0), s.push(o), o._i = s.length - 1, x(s, r), this.yAxis && x(this.yAxis.series, r), Vt(s, function (t, e) {
                    t.index = e, t.name = t.name || "Series " + (e + 1)
                })
            },
            bindAxes: function () {
                var t, e = this,
                    i = e.options,
                    n = e.chart;
                Vt(e.axisTypes || [], function (o) {
                    Vt(n[o], function (n) {
                        t = n.options, (i[o] === t.index || i[o] !== L && i[o] === t.id || i[o] === L && 0 === t.index) && (n.series.push(e), e[o] = n, n.isDirty = !0)
                    }), !e[o] && e.optionalAxis !== o && T(18, !0)
                })
            },
            updateParallelArrays: function (t, e) {
                var i = t.series,
                    n = arguments;
                Vt(i.parallelArrays, "number" == typeof e ? function (n) {
                    var o = "y" === n && i.toYData ? i.toYData(t) : t[n];
                    i[n + "Data"][e] = o
                } : function (t) {
                    Array.prototype[e].apply(i[t + "Data"], Array.prototype.slice.call(n, 2))
                })
            },
            autoIncrement: function () {
                var t, e = this.options,
                    i = this.xIncrement,
                    n = e.pointIntervalUnit,
                    i = Nt(i, e.pointStart, 0);
                return this.pointInterval = t = Nt(this.pointInterval, e.pointInterval, 1), ("month" === n || "year" === n) && (e = new N(i), e = "month" === n ? +e[et](e[G]() + t) : +e[it](e[U]() + t), t = e - i), this.xIncrement = i + t, i
            },
            getSegments: function () {
                var t, e = -1,
                    i = [],
                    n = this.points,
                    o = n.length;
                if (o)
                    if (this.options.connectNulls) {
                        for (t = o; t--;) null === n[t].y && n.splice(t, 1);
                        n.length && (i = [n])
                    } else Vt(n, function (t, s) {
                        null === t.y ? (s > e + 1 && i.push(n.slice(e + 1, s)), e = s) : s === o - 1 && i.push(n.slice(e + 1, s + 1))
                    });
                this.segments = i
            },
            setOptions: function (e) {
                var i = this.chart,
                    n = i.options.plotOptions,
                    i = i.userOptions || {},
                    o = i.plotOptions || {},
                    s = n[this.type];
                return this.userOptions = e,
                    n = t(s, n.series, e), this.tooltipOptions = t(H.tooltip, H.plotOptions[this.type].tooltip, i.tooltip, o.series && o.series.tooltip, o[this.type] && o[this.type].tooltip, e.tooltip), null === s.marker && delete n.marker, this.zoneAxis = n.zoneAxis, e = this.zones = (n.zones || []).slice(), !n.negativeColor && !n.negativeFillColor || n.zones || e.push({
                        value: n[this.zoneAxis + "Threshold"] || n.threshold || 0,
                        color: n.negativeColor,
                        fillColor: n.negativeFillColor
                    }), e.length && c(e[e.length - 1].value) && e.push({
                        color: this.color,
                        fillColor: this.fillColor
                    }), n
            },
            getCyclic: function (t, e, i) {
                var n = this.userOptions,
                    o = "_" + t + "Index",
                    s = t + "Counter";
                e || (c(n[o]) ? e = n[o] : (n[o] = e = this.chart[s] % i.length, this.chart[s] += 1), e = i[e]), this[t] = e
            },
            getColor: function () {
                this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || ne[this.type].color, this.chart.options.colors)
            },
            getSymbol: function () {
                var t = this.options.marker;
                this.getCyclic("symbol", t.symbol, this.chart.options.symbols), /^url/.test(this.symbol) && (t.radius = 0)
            },
            drawLegendSymbol: ce.drawLineMarker,
            setData: function (t, e, n, r) {
                var a, l = this,
                    d = l.points,
                    h = d && d.length || 0,
                    u = l.options,
                    p = l.chart,
                    f = null,
                    m = l.xAxis,
                    g = m && !!m.categories,
                    v = u.turboThreshold,
                    y = this.xData,
                    b = this.yData,
                    x = (a = l.pointArrayMap) && a.length,
                    t = t || [];
                if (a = t.length, e = Nt(e, !0), r !== !1 && a && h === a && !l.cropped && !l.hasGroupedData && l.visible) Vt(t, function (t, e) {
                    d[e].update && d[e].update(t, !1, null, !1)
                });
                else {
                    if (l.xIncrement = null, l.pointRange = g ? 1 : u.pointRange, l.colorCounter = 0, Vt(this.parallelArrays, function (t) {
                        l[t + "Data"].length = 0
                    }), v && a > v) {
                        for (n = 0; null === f && a > n;) f = t[n], n++;
                        if (s(f)) {
                            for (g = Nt(u.pointStart, 0), f = Nt(u.pointInterval, 1), n = 0; a > n; n++) y[n] = g, b[n] = t[n], g += f;
                            l.xIncrement = g
                        } else if (o(f))
                            if (x)
                                for (n = 0; a > n; n++) f = t[n], y[n] = f[0], b[n] = f.slice(1, x + 1);
                            else
                                for (n = 0; a > n; n++) f = t[n], y[n] = f[0], b[n] = f[1];
                        else T(12)
                    } else
                        for (n = 0; a > n; n++) t[n] !== L && (f = {
                            series: l
                        }, l.pointClass.prototype.applyOptions.apply(f, [t[n]]), l.updateParallelArrays(f, n), g && c(f.name)) && (m.names[f.x] = f.name);
                    for (i(b[0]) && T(14, !0), l.data = [], l.options.data = t, n = h; n--;) d[n] && d[n].destroy && d[n].destroy();
                    m && (m.minRange = m.userMinRange), l.isDirty = l.isDirtyData = p.isDirtyBox = !0, n = !1
                }
                "point" === u.legendType && (this.processData(), this.generatePoints()), e && p.redraw(n)
            },
            processData: function (t) {
                var e, i = this.xData,
                    n = this.yData,
                    o = i.length;
                e = 0;
                var s, r, a, l = this.xAxis,
                    c = this.options;
                a = c.cropThreshold;
                var d, h, u = this.getExtremesFromAll || c.getExtremesFromAll,
                    p = this.isCartesian;
                if (p && !this.isDirty && !l.isDirty && !this.yAxis.isDirty && !t) return !1;
                for (l && (t = l.getExtremes(), d = t.min, h = t.max), p && this.sorted && !u && (!a || o > a || this.forceCrop) && (i[o - 1] < d || i[0] > h ? (i = [], n = []) : (i[0] < d || i[o - 1] > h) && (e = this.cropData(this.xData, this.yData, d, h), i = e.xData, n = e.yData, e = e.start, s = !0)), a = i.length - 1; a >= 0; a--) o = i[a] - i[a - 1], o > 0 && (r === L || r > o) ? r = o : 0 > o && this.requireSorting && T(15);
                this.cropped = s, this.cropStart = e, this.processedXData = i, this.processedYData = n, null === c.pointRange && (this.pointRange = r || 1), this.closestPointRange = r
            },
            cropData: function (t, e, i, n) {
                var o, s = t.length,
                    r = 0,
                    a = s,
                    l = Nt(this.cropShoulder, 1);
                for (o = 0; s > o; o++)
                    if (t[o] >= i) {
                        r = dt(0, o - l);
                        break
                    }
                for (; s > o; o++)
                    if (t[o] > n) {
                        a = o + l;
                        break
                    }
                return {
                    xData: t.slice(r, a),
                    yData: e.slice(r, a),
                    start: r,
                    end: a
                }
            },
            generatePoints: function () {
                var t, e, i, n, o = this.options.data,
                    s = this.data,
                    r = this.processedXData,
                    a = this.processedYData,
                    l = this.pointClass,
                    c = r.length,
                    d = this.cropStart || 0,
                    u = this.hasGroupedData,
                    p = [];
                for (s || u || (s = [], s.length = o.length, s = this.data = s), n = 0; c > n; n++) e = d + n, u ? p[n] = (new l).init(this, [r[n]].concat(h(a[n]))) : (s[e] ? i = s[e] : o[e] !== L && (s[e] = i = (new l).init(this, o[e], r[n])), p[n] = i), p[n].index = e;
                if (s && (c !== (t = s.length) || u))
                    for (n = 0; t > n; n++) n === d && !u && (n += c), s[n] && (s[n].destroyElements(), s[n].plotX = L);
                this.data = s, this.points = p
            },
            getExtremes: function (t) {
                var e, i = this.yAxis,
                    n = this.processedXData,
                    o = [],
                    s = 0;
                e = this.xAxis.getExtremes();
                var r, a, l, c, d = e.min,
                    h = e.max,
                    t = t || this.stackedYData || this.processedYData;
                for (e = t.length, c = 0; e > c; c++)
                    if (a = n[c], l = t[c], r = null !== l && l !== L && (!i.isLog || l.length || l > 0), a = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (n[c + 1] || a) >= d && (n[c - 1] || a) <= h, r && a)
                        if (r = l.length)
                            for (; r--;) null !== l[r] && (o[s++] = l[r]);
                        else o[s++] = l;
                this.dataMin = w(o), this.dataMax = k(o)
            },
            translate: function () {
                this.processedXData || this.processData(), this.generatePoints();
                for (var t, e, i, n, o = this.options, r = o.stacking, a = this.xAxis, l = a.categories, d = this.yAxis, h = this.points, u = h.length, p = !!this.modifyValue, f = o.pointPlacement, m = "between" === f || s(f), g = o.threshold, v = o.startFromThreshold ? g : 0, y = Number.MAX_VALUE, o = 0; u > o; o++) {
                    var b = h[o],
                        x = b.x,
                        w = b.y;
                    e = b.low;
                    var k = r && d.stacks[(this.negStacks && (v ? 0 : g) > w ? "-" : "") + this.stackKey];
                    d.isLog && null !== w && 0 >= w && (b.y = w = null, T(10)), b.plotX = t = ht(dt(-1e5, a.translate(x, 0, 0, 0, 1, f, "flags" === this.type)), 1e5), r && this.visible && k && k[x] && (n = this.getStackIndicator(n, x, this.index), k = k[x], w = k.points[n.key], e = w[0], w = w[1], e === v && (e = Nt(g, d.min)), d.isLog && 0 >= e && (e = null), b.total = b.stackTotal = k.total, b.percentage = k.total && b.y / k.total * 100, b.stackY = w, k.setOffset(this.pointXOffset || 0, this.barW || 0)), b.yBottom = c(e) ? d.translate(e, 0, 1, 0, 1) : null, p && (w = this.modifyValue(w, b)), b.plotY = e = "number" == typeof w && w !== 1 / 0 ? ht(dt(-1e5, d.translate(w, 0, 1, 0, 1)), 1e5) : L, b.isInside = e !== L && e >= 0 && e <= d.len && t >= 0 && t <= a.len, b.clientX = m ? a.translate(x, 0, 0, 0, 1) : t, b.negative = b.y < (g || 0), b.category = l && l[b.x] !== L ? l[b.x] : b.x, o && (y = ht(y, ut(t - i))), i = t
                }
                this.closestPointRangePx = y, this.getSegments()
            },
            setClip: function (t) {
                var e = this.chart,
                    i = this.options,
                    n = e.renderer,
                    o = e.inverted,
                    s = this.clipBox,
                    r = s || e.clipBox,
                    a = this.sharedClipKey || ["_sharedClip", t && t.duration, t && t.easing, r.height, i.xAxis, i.yAxis].join(","),
                    l = e[a],
                    c = e[a + "m"];
                l || (t && (r.width = 0, e[a + "m"] = c = n.clipRect(-99, o ? -e.plotLeft : -e.plotTop, 99, o ? e.chartWidth : e.chartHeight)), e[a] = l = n.clipRect(r)), t && (l.count += 1), i.clip !== !1 && (this.group.clip(t || s ? l : e.clipRect), this.markerGroup.clip(c), this.sharedClipKey = a), t || (l.count -= 1, l.count <= 0 && a && e[a] && (s || (e[a] = e[a].destroy()), e[a + "m"] && (e[a + "m"] = e[a + "m"].destroy())))
            },
            animate: function (t) {
                var e, i = this.chart,
                    o = this.options.animation;
                o && !n(o) && (o = ne[this.type].animation), t ? this.setClip(o) : (e = this.sharedClipKey, (t = i[e]) && t.animate({
                    width: i.plotSizeX
                }, o), i[e + "m"] && i[e + "m"].animate({
                    width: i.plotSizeX + 99
                }, o), this.animate = null)
            },
            afterAnimate: function () {
                this.setClip(), Qt(this, "afterAnimate")
            },
            drawPoints: function () {
                var t, e, i, n, o, s, r, a, l, c, d, h, u = this.points,
                    p = this.chart,
                    f = this.options.marker,
                    m = this.pointAttr[""],
                    g = this.markerGroup,
                    v = Nt(f.enabled, this.xAxis.isRadial, this.closestPointRangePx > 2 * f.radius);
                if (f.enabled !== !1 || this._hasPointMarkers)
                    for (n = u.length; n--;) o = u[n], e = lt(o.plotX), i = o.plotY, l = o.graphic, c = o.marker || {}, d = !!o.marker, t = v && c.enabled === L || c.enabled, h = o.isInside, t && i !== L && !isNaN(i) && null !== o.y ? (t = o.pointAttr[o.selected ? "select" : ""] || m, s = t.r, r = Nt(c.symbol, this.symbol), a = 0 === r.indexOf("url"), l ? l[h ? "show" : "hide"](!0).animate(jt({
                        x: e - s,
                        y: i - s
                    }, l.symbolName ? {
                        width: 2 * s,
                        height: 2 * s
                    } : {})) : h && (s > 0 || a) && (o.graphic = p.renderer.symbol(r, e - s, i - s, 2 * s, 2 * s, d ? c : f).attr(t).add(g))) : l && (o.graphic = l.destroy())
            },
            convertAttribs: function (t, e, i, n) {
                var o, s, r = this.pointAttrToOptions,
                    a = {},
                    t = t || {},
                    e = e || {},
                    i = i || {},
                    n = n || {};
                for (o in r) s = r[o], a[o] = Nt(t[s], e[o], i[o], n[o]);
                return a
            },
            getAttribs: function () {
                var t, e = this,
                    i = e.options,
                    n = ne[e.type].marker ? i.marker : i,
                    o = n.states,
                    s = o.hover,
                    r = e.color,
                    a = e.options.negativeColor;
                t = {
                    stroke: r,
                    fill: r
                };
                var l, d, h = e.points || [],
                    u = [],
                    p = e.pointAttrToOptions;
                l = e.hasPointSpecificOptions;
                var f = n.lineColor,
                    m = n.fillColor;
                d = i.turboThreshold;
                var g, v = e.zones,
                    y = e.zoneAxis || "y";
                if (i.marker ? (s.radius = s.radius || n.radius + s.radiusPlus, s.lineWidth = s.lineWidth || n.lineWidth + s.lineWidthPlus) : (s.color = s.color || ae(s.color || r).brighten(s.brightness).get(), s.negativeColor = s.negativeColor || ae(s.negativeColor || a).brighten(s.brightness).get()), u[""] = e.convertAttribs(n, t), Vt(["hover", "select"], function (t) {
                    u[t] = e.convertAttribs(o[t], u[""])
                }), e.pointAttr = u, r = h.length, !d || d > r || l)
                    for (; r--;) {
                        if (d = h[r], (n = d.options && d.options.marker || d.options) && n.enabled === !1 && (n.radius = 0), v.length) {
                            for (l = 0, t = v[l]; d[y] >= t.value;) t = v[++l];
                            d.color = d.fillColor = Nt(t.color, e.color)
                        }
                        if (l = i.colorByPoint || d.color, d.options)
                            for (g in p) c(n[p[g]]) && (l = !0);
                        l ? (n = n || {}, l = [], o = n.states || {}, t = o.hover = o.hover || {}, (!i.marker || d.negative && !t.fillColor && !s.fillColor) && (t[e.pointAttrToOptions.fill] = t.color || !d.options.color && s[d.negative && a ? "negativeColor" : "color"] || ae(d.color).brighten(t.brightness || s.brightness).get()), t = {
                            color: d.color
                        }, m || (t.fillColor = d.color), f || (t.lineColor = d.color), n.hasOwnProperty("color") && !n.color && delete n.color, l[""] = e.convertAttribs(jt(t, n), u[""]), l.hover = e.convertAttribs(o.hover, u.hover, l[""]), l.select = e.convertAttribs(o.select, u.select, l[""])) : l = u, d.pointAttr = l
                    }
            },
            destroy: function () {
                var t, e, i, n, o = this,
                    s = o.chart,
                    r = /AppleWebKit\/533/.test(vt),
                    a = o.data || [];
                for (Qt(o, "destroy"), Zt(o), Vt(o.axisTypes || [], function (t) {
                    (n = o[t]) && (l(n.series, o), n.isDirty = n.forceRedraw = !0)
                }), o.legendItem && o.chart.legend.destroyItem(o), t = a.length; t--;)(e = a[t]) && e.destroy && e.destroy();
                o.points = null, clearTimeout(o.animationTimeout);
                for (i in o) o[i] instanceof M && !o[i].survive && (t = r && "group" === i ? "hide" : "destroy", o[i][t]());
                s.hoverSeries === o && (s.hoverSeries = null), l(s.series, o);
                for (i in o) delete o[i]
            },
            getSegmentPath: function (t) {
                var e = this,
                    i = [],
                    n = e.options.step;
                return Vt(t, function (o, s) {
                    var r, a = o.plotX,
                        l = o.plotY;
                    e.getPointSpline ? i.push.apply(i, e.getPointSpline(t, o, s)) : (i.push(s ? "L" : "M"), n && s && (r = t[s - 1], "right" === n ? i.push(r.plotX, l, "L") : "center" === n ? i.push((r.plotX + a) / 2, r.plotY, "L", (r.plotX + a) / 2, l, "L") : i.push(a, r.plotY, "L")), i.push(o.plotX, o.plotY))
                }), i
            },
            getGraphPath: function () {
                var t, e = this,
                    i = [],
                    n = [];
                return Vt(e.segments, function (o) {
                    t = e.getSegmentPath(o), o.length > 1 ? i = i.concat(t) : n.push(o[0])
                }), e.singlePoints = n, e.graphPath = i
            },
            drawGraph: function () {
                var t = this,
                    e = this.options,
                    i = [
                        ["graph", e.lineColor || this.color, e.dashStyle]
                    ],
                    n = e.lineWidth,
                    o = "square" !== e.linecap,
                    s = this.getGraphPath(),
                    r = this.fillGraph && this.color || Bt;
                Vt(this.zones, function (n, o) {
                    i.push(["zoneGraph" + o, n.color || t.color, n.dashStyle || e.dashStyle])
                }), Vt(i, function (i, a) {
                    var l = i[0],
                        c = t[l];
                    c ? c.animate({
                        d: s
                    }) : (n || r) && s.length && (c = {
                        stroke: i[1],
                        "stroke-width": n,
                        fill: r,
                        zIndex: 1
                    }, i[2] ? c.dashstyle = i[2] : o && (c["stroke-linecap"] = c["stroke-linejoin"] = "round"), t[l] = t.chart.renderer.path(s).attr(c).add(t.group).shadow(2 > a && e.shadow))
                })
            },
            applyZones: function () {
                var t, e, i, n, o, s, r, a = this,
                    l = this.chart,
                    c = l.renderer,
                    d = this.zones,
                    h = this.clips || [],
                    u = this.graph,
                    p = this.area,
                    f = dt(l.chartWidth, l.chartHeight),
                    m = this[(this.zoneAxis || "y") + "Axis"],
                    g = m.reversed,
                    v = l.inverted,
                    y = m.horiz,
                    b = !1;
                d.length && (u || p) && m.min !== L && (u && u.hide(), p && p.hide(), n = m.getExtremes(), Vt(d, function (d, x) {
                    t = g ? y ? l.plotWidth : 0 : y ? 0 : m.toPixels(n.min), t = ht(dt(Nt(e, t), 0), f), e = ht(dt(at(m.toPixels(Nt(d.value, n.max), !0)), 0), f), b && (t = e = m.toPixels(n.max)), o = Math.abs(t - e), s = ht(t, e), r = dt(t, e), m.isXAxis ? (i = {
                        x: v ? r : s,
                        y: 0,
                        width: o,
                        height: f
                    }, y || (i.x = l.plotHeight - i.x)) : (i = {
                        x: 0,
                        y: v ? r : s,
                        width: f,
                        height: o
                    }, y && (i.y = l.plotWidth - i.y)), l.inverted && c.isVML && (i = m.isXAxis ? {
                        x: 0,
                        y: g ? s : r,
                        height: i.width,
                        width: l.chartWidth
                    } : {
                            x: i.y - l.plotLeft - l.spacingBox.x,
                            y: 0,
                            width: i.height,
                            height: l.chartHeight
                        }), h[x] ? h[x].animate(i) : (h[x] = c.clipRect(i), u && a["zoneGraph" + x].clip(h[x]), p && a["zoneArea" + x].clip(h[x])), b = d.value > n.max
                }), this.clips = h)
            },
            invertGroups: function () {
                function t() {
                    var t = {
                        width: e.yAxis.len,
                        height: e.xAxis.len
                    };
                    Vt(["group", "markerGroup"], function (i) {
                        e[i] && e[i].attr(t).invert()
                    })
                }
                var e = this,
                    i = e.chart;
                e.xAxis && (Jt(i, "resize", t), Jt(e, "destroy", function () {
                    Zt(i, "resize", t)
                }), t(), e.invertGroups = t)
            },
            plotGroup: function (t, e, i, n, o) {
                var s = this[t],
                    r = !s;
                return r && (this[t] = s = this.chart.renderer.g(e).attr({
                    visibility: i,
                    zIndex: n || .1
                }).add(o), s.addClass("highcharts-series-" + this.index)), s[r ? "attr" : "animate"](this.getPlotBox()), s
            },
            getPlotBox: function () {
                var t = this.chart,
                    e = this.xAxis,
                    i = this.yAxis;
                return t.inverted && (e = i, i = this.xAxis), {
                    translateX: e ? e.left : t.plotLeft,
                    translateY: i ? i.top : t.plotTop,
                    scaleX: 1,
                    scaleY: 1
                }
            },
            render: function () {
                var t, e = this,
                    i = e.chart,
                    n = e.options,
                    o = (t = n.animation) && !!e.animate && i.renderer.isSVG && Nt(t.duration, 500) || 0,
                    s = e.visible ? "visible" : "hidden",
                    r = n.zIndex,
                    a = e.hasRendered,
                    l = i.seriesGroup;
                t = e.plotGroup("group", "series", s, r, l), e.markerGroup = e.plotGroup("markerGroup", "markers", s, r, l), o && e.animate(!0), e.getAttribs(), t.inverted = e.isCartesian ? i.inverted : !1, e.drawGraph && (e.drawGraph(), e.applyZones()), Vt(e.points, function (t) {
                    t.redraw && t.redraw()
                }), e.drawDataLabels && e.drawDataLabels(), e.visible && e.drawPoints(), e.drawTracker && e.options.enableMouseTracking !== !1 && e.drawTracker(), i.inverted && e.invertGroups(), n.clip !== !1 && !e.sharedClipKey && !a && t.clip(i.clipRect), o && e.animate(), a || (o ? e.animationTimeout = setTimeout(function () {
                    e.afterAnimate()
                }, o) : e.afterAnimate()), e.isDirty = e.isDirtyData = !1, e.hasRendered = !0
            },
            redraw: function () {
                var t = this.chart,
                    e = this.isDirtyData,
                    i = this.isDirty,
                    n = this.group,
                    o = this.xAxis,
                    s = this.yAxis;
                n && (t.inverted && n.attr({
                    width: t.plotWidth,
                    height: t.plotHeight
                }), n.animate({
                    translateX: Nt(o && o.left, t.plotLeft),
                    translateY: Nt(s && s.top, t.plotTop)
                })), this.translate(), this.render(), e && Qt(this, "updatedData"), (i || e) && delete this.kdTree
            },
            kdDimensions: 1,
            kdAxisArray: ["clientX", "plotY"],
            searchPoint: function (t, e) {
                var i = this.xAxis,
                    n = this.yAxis,
                    o = this.chart.inverted;
                return this.searchKDTree({
                    clientX: o ? i.len - t.chartY + i.pos : t.chartX - i.pos,
                    plotY: o ? n.len - t.chartX + n.pos : t.chartY - n.pos
                }, e)
            },
            buildKDTree: function () {
                function t(e, n, o) {
                    var s, r;
                    return (r = e && e.length) ? (s = i.kdAxisArray[n % o], e.sort(function (t, e) {
                        return t[s] - e[s]
                    }), r = Math.floor(r / 2), {
                            point: e[r],
                            left: t(e.slice(0, r), n + 1, o),
                            right: t(e.slice(r + 1), n + 1, o)
                        }) : void 0
                }

                function e() {
                    var e = Gt(i.points || [], function (t) {
                        return null !== t.y
                    });
                    i.kdTree = t(e, n, n)
                }
                var i = this,
                    n = i.kdDimensions;
                delete i.kdTree, i.options.kdSync ? e() : setTimeout(e)
            },
            searchKDTree: function (t, e) {
                function i(t, e, a, l) {
                    var d, h, u = e.point,
                        p = n.kdAxisArray[a % l],
                        f = u;
                    return h = c(t[o]) && c(u[o]) ? Math.pow(t[o] - u[o], 2) : null, d = c(t[s]) && c(u[s]) ? Math.pow(t[s] - u[s], 2) : null, d = (h || 0) + (d || 0), u.dist = c(d) ? Math.sqrt(d) : Number.MAX_VALUE, u.distX = c(h) ? Math.sqrt(h) : Number.MAX_VALUE, p = t[p] - u[p], d = 0 > p ? "left" : "right", h = 0 > p ? "right" : "left", e[d] && (d = i(t, e[d], a + 1, l), f = d[r] < f[r] ? d : u), e[h] && Math.sqrt(p * p) < f[r] && (t = i(t, e[h], a + 1, l), f = t[r] < f[r] ? t : f), f
                }
                var n = this,
                    o = this.kdAxisArray[0],
                    s = this.kdAxisArray[1],
                    r = e ? "distX" : "dist";
                return this.kdTree || this.buildKDTree(), this.kdTree ? i(t, this.kdTree, this.kdDimensions, this.kdDimensions) : void 0
            }
        }, E.prototype = {
            destroy: function () {
                _(this, this.axis)
            },
            render: function (t) {
                var e = this.options,
                    i = e.format,
                    i = i ? v(i, this) : e.formatter.call(this);
                this.label ? this.label.attr({
                    text: i,
                    visibility: "hidden"
                }) : this.label = this.axis.chart.renderer.text(i, null, null, e.useHTML).css(e.style).attr({
                    align: this.textAlign,
                    rotation: e.rotation,
                    visibility: "hidden"
                }).add(t)
            },
            setOffset: function (t, e) {
                var i = this.axis,
                    n = i.chart,
                    o = n.inverted,
                    s = i.reversed,
                    s = this.isNegative && !s || !this.isNegative && s,
                    r = i.translate(i.usePercentage ? 100 : this.total, 0, 0, 0, 1),
                    i = i.translate(0),
                    i = ut(r - i),
                    a = n.xAxis[0].translate(this.x) + t,
                    l = n.plotHeight,
                    s = {
                        x: o ? s ? r : r - i : a,
                        y: o ? l - a - e : s ? l - r - i : l - r,
                        width: o ? i : e,
                        height: o ? e : i
                    };
                (o = this.label) && (o.align(this.alignOptions, null, s), s = o.alignAttr, o[this.options.crop === !1 || n.isInsidePlot(s.x, s.y) ? "show" : "hide"](!0))
            }
        }, qt.prototype.getStacks = function () {
            var t = this;
            Vt(t.yAxis, function (t) {
                t.stacks && t.hasVisibleSeries && (t.oldStacks = t.stacks)
            }), Vt(t.series, function (e) {
                !e.options.stacking || e.visible !== !0 && t.options.chart.ignoreHiddenSeries !== !1 || (e.stackKey = e.type + Nt(e.options.stack, ""))
            })
        }, he.prototype.buildStacks = function () {
            var t = this.series,
                e = Nt(this.options.reversedStacks, !0),
                i = t.length;
            if (!this.isXAxis) {
                for (this.usePercentage = !1; i--;) t[e ? i : t.length - i - 1].setStackedPoints();
                if (this.usePercentage)
                    for (i = 0; i < t.length; i++) t[i].setPercentStacks()
            }
        }, he.prototype.renderStackTotals = function () {
            var t, e, i = this.chart,
                n = i.renderer,
                o = this.stacks,
                s = this.stackTotalGroup;
            s || (this.stackTotalGroup = s = n.g("stack-labels").attr({
                visibility: "visible",
                zIndex: 6
            }).add()), s.translate(i.plotLeft, i.plotTop);
            for (t in o)
                for (e in i = o[t]) i[e].render(s)
        }, he.prototype.resetStacks = function () {
            var t, e, i = this.stacks;
            if (!this.isXAxis)
                for (t in i)
                    for (e in i[t]) i[t][e].touched < this.stacksTouched ? (i[t][e].destroy(), delete i[t][e]) : (i[t][e].total = null, i[t][e].cum = 0)
        }, he.prototype.cleanStacks = function () {
            var t, e, i;
            if (!this.isXAxis) {
                this.oldStacks && (t = this.stacks = this.oldStacks);
                for (e in t)
                    for (i in t[e]) t[e][i].cum = t[e][i].total
            }
        }, ke.prototype.setStackedPoints = function () {
            if (this.options.stacking && (this.visible === !0 || this.chart.options.chart.ignoreHiddenSeries === !1)) {
                var t, e, i, n, o, s, r, a = this.processedXData,
                    l = this.processedYData,
                    c = [],
                    d = l.length,
                    h = this.options,
                    u = h.threshold,
                    p = h.startFromThreshold ? u : 0,
                    f = h.stack,
                    h = h.stacking,
                    m = this.stackKey,
                    g = "-" + m,
                    v = this.negStacks,
                    y = this.yAxis,
                    b = y.stacks,
                    x = y.oldStacks;
                for (y.stacksTouched += 1, o = 0; d > o; o++) s = a[o], r = l[o], t = this.getStackIndicator(t, s, this.index), n = t.key, i = (e = v && (p ? 0 : u) > r) ? g : m, b[i] || (b[i] = {}), b[i][s] || (x[i] && x[i][s] ? (b[i][s] = x[i][s], b[i][s].total = null) : b[i][s] = new E(y, y.options.stackLabels, e, s, f)), i = b[i][s], i.points[n] = [Nt(i.cum, p)], i.touched = y.stacksTouched, "percent" === h ? (e = e ? m : g, v && b[e] && b[e][s] ? (e = b[e][s], i.total = e.total = dt(e.total, i.total) + ut(r) || 0) : i.total = $(i.total + (ut(r) || 0))) : i.total = $(i.total + (r || 0)), i.cum = Nt(i.cum, p) + (r || 0), i.points[n].push(i.cum), c[o] = i.cum;
                "percent" === h && (y.usePercentage = !0), this.stackedYData = c, y.oldStacks = {}
            }
        }, ke.prototype.setPercentStacks = function () {
            var t, e = this,
                i = e.stackKey,
                n = e.yAxis.stacks,
                o = e.processedXData;
            Vt([i, "-" + i], function (i) {
                for (var s, r, a, l = o.length; l--;) r = o[l], t = e.getStackIndicator(t, r, e.index), s = (a = n[i] && n[i][r]) && a.points[t.key], (r = s) && (a = a.total ? 100 / a.total : 0, r[0] = $(r[0] * a), r[1] = $(r[1] * a), e.stackedYData[l] = r[1])
            })
        }, ke.prototype.getStackIndicator = function (t, e, i) {
            return c(t) && t.x === e ? t.index++ : t = {
                x: e,
                index: 0
            }, t.key = [i, e, t.index].join(","), t
        }, jt(qt.prototype, {
            addSeries: function (t, e, i) {
                var n, o = this;
                return t && (e = Nt(e, !0), Qt(o, "addSeries", {
                    options: t
                }, function () {
                    n = o.initSeries(t), o.isDirtyLegend = !0, o.linkSeries(), e && o.redraw(i)
                })), n
            },
            addAxis: function (e, i, n, o) {
                var s = i ? "xAxis" : "yAxis",
                    r = this.options;
                new he(this, t(e, {
                    index: this[s].length,
                    isX: i
                })), r[s] = h(r[s] || {}), r[s].push(e), Nt(n, !0) && this.redraw(o)
            },
            showLoading: function (t) {
                var e = this,
                    i = e.options,
                    n = e.loadingDiv,
                    o = i.loading,
                    s = function () {
                        n && u(n, {
                            left: e.plotLeft + "px",
                            top: e.plotTop + "px",
                            width: e.plotWidth + "px",
                            height: e.plotHeight + "px"
                        })
                    };
                n || (e.loadingDiv = n = p(Dt, {
                    className: "highcharts-loading"
                }, jt(o.style, {
                    zIndex: 10,
                    display: Bt
                }), e.container), e.loadingSpan = p("span", null, o.labelStyle, n), Jt(e, "redraw", s)), e.loadingSpan.innerHTML = t || i.lang.loading, e.loadingShown || (u(n, {
                    opacity: 0,
                    display: ""
                }), ee(n, {
                    opacity: o.style.opacity
                }, {
                        duration: o.showDuration || 0
                    }), e.loadingShown = !0), s()
            },
            hideLoading: function () {
                var t = this.options,
                    e = this.loadingDiv;
                e && ee(e, {
                    opacity: 0
                }, {
                        duration: t.loading.hideDuration || 100,
                        complete: function () {
                            u(e, {
                                display: Bt
                            })
                        }
                    }), this.loadingShown = !1
            }
        }), jt(we.prototype, {
            update: function (t, e, i, s) {
                function r() {
                    l.applyOptions(t), null === l.y && d && (l.graphic = d.destroy()), n(t) && !o(t) && (l.redraw = function () {
                        d && d.element && t && t.marker && t.marker.symbol && (l.graphic = d.destroy()), t && t.dataLabels && l.dataLabel && (l.dataLabel = l.dataLabel.destroy()), l.redraw = null
                    }), a = l.index, c.updateParallelArrays(l, a), p && l.name && (p[l.x] = l.name), u.data[a] = l.options, c.isDirty = c.isDirtyData = !0, !c.fixedBox && c.hasCartesianSeries && (h.isDirtyBox = !0), "point" === u.legendType && (h.isDirtyLegend = !0), e && h.redraw(i)
                }
                var a, l = this,
                    c = l.series,
                    d = l.graphic,
                    h = c.chart,
                    u = c.options,
                    p = c.xAxis && c.xAxis.names,
                    e = Nt(e, !0);
                s === !1 ? r() : l.firePointEvent("update", {
                    options: t
                }, r)
            },
            remove: function (t, e) {
                this.series.removePoint(Yt(this, this.series.data), t, e)
            }
        }), jt(ke.prototype, {
            addPoint: function (t, e, i, n) {
                var o, s = this,
                    r = s.options,
                    a = s.data,
                    l = s.graph,
                    c = s.area,
                    d = s.chart,
                    h = s.xAxis && s.xAxis.names,
                    u = l && l.shift || 0,
                    p = ["graph", "area"],
                    l = r.data,
                    f = s.xData;
                if (S(n, d), i) {
                    for (n = s.zones.length; n--;) p.push("zoneGraph" + n, "zoneArea" + n);
                    Vt(p, function (t) {
                        s[t] && (s[t].shift = u + (r.step ? 2 : 1))
                    })
                }
                if (c && (c.isArea = !0), e = Nt(e, !0), c = {
                    series: s
                }, s.pointClass.prototype.applyOptions.apply(c, [t]), p = c.x, n = f.length, s.requireSorting && p < f[n - 1])
                    for (o = !0; n && f[n - 1] > p;) n--;
                s.updateParallelArrays(c, "splice", n, 0, 0), s.updateParallelArrays(c, n), h && c.name && (h[p] = c.name), l.splice(n, 0, t), o && (s.data.splice(n, 0, null), s.processData()), "point" === r.legendType && s.generatePoints(), i && (a[0] && a[0].remove ? a[0].remove(!1) : (a.shift(), s.updateParallelArrays(c, "shift"), l.shift())), s.isDirty = !0, s.isDirtyData = !0, e && (s.getAttribs(), d.redraw())
            },
            removePoint: function (t, e, i) {
                var n = this,
                    o = n.data,
                    s = o[t],
                    r = n.points,
                    a = n.chart,
                    l = function () {
                        o.length === r.length && r.splice(t, 1), o.splice(t, 1), n.options.data.splice(t, 1), n.updateParallelArrays(s || {
                            series: n
                        }, "splice", t, 1), s && s.destroy(), n.isDirty = !0, n.isDirtyData = !0, e && a.redraw()
                    };
                S(i, a), e = Nt(e, !0), s ? s.firePointEvent("remove", null, l) : l()
            },
            remove: function (t, e) {
                var i = this,
                    n = i.chart,
                    t = Nt(t, !0);
                i.isRemoving || (i.isRemoving = !0, Qt(i, "remove", null, function () {
                    i.destroy(), n.isDirtyLegend = n.isDirtyBox = !0, n.linkSeries(), t && n.redraw(e)
                })), i.isRemoving = !1
            },
            update: function (e, i) {
                var n, o = this,
                    s = this.chart,
                    r = this.userOptions,
                    a = this.type,
                    l = Ot[a].prototype,
                    c = ["group", "markerGroup", "dataLabelsGroup"];
                (e.type && e.type !== a || void 0 !== e.zIndex) && (c.length = 0), Vt(c, function (t) {
                    c[t] = o[t], delete o[t]
                }), e = t(r, {
                    animation: !1,
                    index: this.index,
                    pointStart: this.xData[0]
                }, {
                        data: this.options.data
                    }, e), this.remove(!1);
                for (n in l) this[n] = L;
                jt(this, Ot[e.type || a].prototype), Vt(c, function (t) {
                    o[t] = c[t]
                }), this.init(s, e), s.linkSeries(), Nt(i, !0) && s.redraw(!1)
            }
        }), jt(he.prototype, {
            update: function (e, i) {
                var n = this.chart,
                    e = n.options[this.coll][this.options.index] = t(this.userOptions, e);
                this.destroy(!0), this._addedPlotLB = this.chart._labelPanes = L, this.init(n, jt(e, {
                    events: L
                })), n.isDirtyBox = !0, Nt(i, !0) && n.redraw()
            },
            remove: function (t) {
                for (var e = this.chart, i = this.coll, n = this.series, o = n.length; o--;) n[o] && n[o].remove(!1);
                l(e.axes, this), l(e[i], this), e.options[i].splice(this.options.index, 1), Vt(e[i], function (t, e) {
                    t.options.index = e
                }), this.destroy(), e.isDirtyBox = !0, Nt(t, !0) && e.redraw()
            },
            setTitle: function (t, e) {
                this.update({
                    title: t
                }, e)
            },
            setCategories: function (t, e) {
                this.update({
                    categories: t
                }, e)
            }
        });
        var _e = f(ke);
        Ot.line = _e, ne.area = t(Rt, {
            softThreshold: !1,
            threshold: 0
        });
        var Ce = f(ke, {
            type: "area",
            getSegments: function () {
                var t, e, i, n, o, s = this,
                    r = [],
                    a = [],
                    l = [],
                    c = this.xAxis,
                    d = this.yAxis,
                    h = d.stacks[this.stackKey],
                    u = {},
                    p = this.points,
                    f = this.options.connectNulls;
                if (this.options.stacking && !this.cropped) {
                    for (n = 0; n < p.length; n++) u[p[n].x] = p[n];
                    for (o in h) null !== h[o].total && l.push(+o);
                    l.sort(function (t, e) {
                        return t - e
                    }), Vt(l, function (o) {
                        var r, l = null;
                        if (!f || u[o] && null !== u[o].y)
                            if (u[o]) a.push(u[o]);
                            else {
                                for (n = s.index; n <= d.series.length; n++)
                                    if (i = s.getStackIndicator(null, o, n), r = h[o].points[i.key]) {
                                        l = r[1];
                                        break
                                    }
                                t = c.translate(o), e = d.getThreshold(l), a.push({
                                    y: null,
                                    plotX: t,
                                    clientX: t,
                                    plotY: e,
                                    yBottom: e,
                                    onMouseOver: At
                                })
                            }
                    }), a.length && r.push(a)
                } else ke.prototype.getSegments.call(this), r = this.segments;
                this.segments = r
            },
            getSegmentPath: function (t) {
                var e, i = ke.prototype.getSegmentPath.call(this, t),
                    n = [].concat(i),
                    o = this.options;
                e = i.length;
                var s, r = this.yAxis.getThreshold(o.threshold);
                if (3 === e && n.push("L", i[1], i[2]), o.stacking && !this.closedStacks)
                    for (e = t.length - 1; e >= 0; e--) s = Nt(t[e].yBottom, r), e < t.length - 1 && o.step && n.push(t[e + 1].plotX, s), n.push(t[e].plotX, s);
                else this.closeSegment(n, t, r);
                return this.areaPath = this.areaPath.concat(n), i
            },
            closeSegment: function (t, e, i) {
                t.push("L", e[e.length - 1].plotX, i, "L", e[0].plotX, i)
            },
            drawGraph: function () {
                this.areaPath = [], ke.prototype.drawGraph.apply(this);
                var t = this,
                    e = this.areaPath,
                    i = this.options,
                    n = [
                        ["area", this.color, i.fillColor]
                    ];
                Vt(this.zones, function (e, o) {
                    n.push(["zoneArea" + o, e.color || t.color, e.fillColor || i.fillColor])
                }), Vt(n, function (n) {
                    var o = n[0],
                        s = t[o];
                    s ? s.animate({
                        d: e
                    }) : t[o] = t.chart.renderer.path(e).attr({
                        fill: Nt(n[2], ae(n[1]).setOpacity(Nt(i.fillOpacity, .75)).get()),
                        zIndex: 0
                    }).add(t.group)
                })
            },
            drawLegendSymbol: ce.drawRectangle
        });
        Ot.area = Ce, ne.spline = t(Rt), _e = f(ke, {
            type: "spline",
            getPointSpline: function (t, e, i) {
                var n, o, s, r, a = e.plotX,
                    l = e.plotY,
                    c = t[i - 1],
                    d = t[i + 1];
                if (c && d) {
                    t = c.plotY, s = d.plotX;
                    var h, d = d.plotY;
                    n = (1.5 * a + c.plotX) / 2.5, o = (1.5 * l + t) / 2.5, s = (1.5 * a + s) / 2.5, r = (1.5 * l + d) / 2.5, h = (r - o) * (s - a) / (s - n) + l - r, o += h, r += h, o > t && o > l ? (o = dt(t, l), r = 2 * l - o) : t > o && l > o && (o = ht(t, l), r = 2 * l - o), r > d && r > l ? (r = dt(d, l), o = 2 * l - r) : d > r && l > r && (r = ht(d, l), o = 2 * l - r), e.rightContX = s, e.rightContY = r
                }
                return i ? (e = ["C", c.rightContX || c.plotX, c.rightContY || c.plotY, n || a, o || l, a, l], c.rightContX = c.rightContY = null) : e = ["M", a, l], e
            }
        }), Ot.spline = _e, ne.areaspline = t(ne.area), Ce = Ce.prototype, _e = f(_e, {
            type: "areaspline",
            closedStacks: !0,
            getSegmentPath: Ce.getSegmentPath,
            closeSegment: Ce.closeSegment,
            drawGraph: Ce.drawGraph,
            drawLegendSymbol: ce.drawRectangle
        }), Ot.areaspline = _e, ne.column = t(Rt, {
            borderColor: "#FFFFFF",
            borderRadius: 0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {
                hover: {
                    brightness: .1,
                    shadow: !1,
                    halo: !1
                },
                select: {
                    color: "#C0C0C0",
                    borderColor: "#000000",
                    shadow: !1
                }
            },
            dataLabels: {
                align: null,
                verticalAlign: null,
                y: null
            },
            softThreshold: !1,
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {
                distance: 6
            },
            threshold: 0
        }), _e = f(ke, {
            type: "column",
            pointAttrToOptions: {
                stroke: "borderColor",
                fill: "color",
                r: "borderRadius"
            },
            cropShoulder: 0,
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            negStacks: !0,
            init: function () {
                ke.prototype.init.apply(this, arguments);
                var t = this,
                    e = t.chart;
                e.hasRendered && Vt(e.series, function (e) {
                    e.type === t.type && (e.isDirty = !0)
                })
            },
            getColumnMetrics: function () {
                var t, e, i = this,
                    n = i.options,
                    o = i.xAxis,
                    s = i.yAxis,
                    r = o.reversed,
                    a = {},
                    l = 0;
                n.grouping === !1 ? l = 1 : Vt(i.chart.series, function (n) {
                    var o = n.options,
                        r = n.yAxis;
                    n.type === i.type && n.visible && s.len === r.len && s.pos === r.pos && (o.stacking ? (t = n.stackKey, a[t] === L && (a[t] = l++), e = a[t]) : o.grouping !== !1 && (e = l++), n.columnIndex = e)
                });
                var c = ht(ut(o.transA) * (o.ordinalSlope || n.pointRange || o.closestPointRange || o.tickInterval || 1), o.len),
                    d = c * n.groupPadding,
                    h = (c - 2 * d) / l,
                    n = ht(n.maxPointWidth || o.len, Nt(n.pointWidth, h * (1 - 2 * n.pointPadding)));
                return i.columnMetrics = {
                    width: n,
                    offset: (h - n) / 2 + (d + ((r ? l - (i.columnIndex || 0) : i.columnIndex) || 0) * h - c / 2) * (r ? -1 : 1)
                }
            },
            crispCol: function (t, e, i, n) {
                var o = this.chart,
                    s = this.borderWidth,
                    r = -(s % 2 ? .5 : 0),
                    s = s % 2 ? .5 : 1;
                return o.inverted && o.renderer.isVML && (s += 1), i = Math.round(t + i) + r, t = Math.round(t) + r, i -= t, r = ut(e) <= .5, n = Math.round(e + n) + s, e = Math.round(e) + s, n -= e, r && (e -= 1, n += 1), {
                    x: t,
                    y: e,
                    width: i,
                    height: n
                }
            },
            translate: function () {
                var t = this,
                    e = t.chart,
                    i = t.options,
                    n = t.borderWidth = Nt(i.borderWidth, t.closestPointRange * t.xAxis.transA < 2 ? 0 : 1),
                    o = t.yAxis,
                    s = t.translatedThreshold = o.getThreshold(i.threshold),
                    r = Nt(i.minPointLength, 5),
                    a = t.getColumnMetrics(),
                    l = a.width,
                    c = t.barW = dt(l, 1 + 2 * n),
                    d = t.pointXOffset = a.offset;
                e.inverted && (s -= .5), i.pointPadding && (c = ct(c)), ke.prototype.translate.apply(t), Vt(t.points, function (i) {
                    var n, a = ht(Nt(i.yBottom, s), 9e4),
                        h = 999 + ut(a),
                        h = ht(dt(-h, i.plotY), o.len + h),
                        u = i.plotX + d,
                        p = c,
                        f = ht(h, a),
                        m = dt(h, a) - f;
                    ut(m) < r && r && (m = r, n = !o.reversed && !i.negative || o.reversed && i.negative, f = ut(f - s) > r ? a - r : s - (n ? r : 0)), i.barX = u, i.pointWidth = l, i.tooltipPos = e.inverted ? [o.len + o.pos - e.plotLeft - h, t.xAxis.len - u - p / 2, m] : [u + p / 2, h + o.pos - e.plotTop, m], i.shapeType = "rect", i.shapeArgs = t.crispCol(u, f, p, m)
                })
            },
            getSymbol: At,
            drawLegendSymbol: ce.drawRectangle,
            drawGraph: At,
            drawPoints: function () {
                var e, i, n = this,
                    o = this.chart,
                    s = n.options,
                    r = o.renderer,
                    a = s.animationLimit || 250;
                Vt(n.points, function (l) {
                    var d = l.plotY,
                        h = l.graphic;
                    d === L || isNaN(d) || null === l.y ? h && (l.graphic = h.destroy()) : (e = l.shapeArgs, d = c(n.borderWidth) ? {
                        "stroke-width": n.borderWidth
                    } : {}, i = l.pointAttr[l.selected ? "select" : ""] || n.pointAttr[""], h ? (ie(h), h.attr(d)[o.pointCount < a ? "animate" : "attr"](t(e))) : l.graphic = r[l.shapeType](e).attr(d).attr(i).add(l.group || n.group).shadow(s.shadow, null, s.stacking && !s.borderRadius))
                })
            },
            animate: function (t) {
                var e = this.yAxis,
                    i = this.options,
                    n = this.chart.inverted,
                    o = {};
                Tt && (t ? (o.scaleY = .001, t = ht(e.pos + e.len, dt(e.pos, e.toPixels(i.threshold))), n ? o.translateX = t - e.len : o.translateY = t, this.group.attr(o)) : (o.scaleY = 1, o[n ? "translateX" : "translateY"] = e.pos, this.group.animate(o, this.options.animation), this.animate = null))
            },
            remove: function () {
                var t = this,
                    e = t.chart;
                e.hasRendered && Vt(e.series, function (e) {
                    e.type === t.type && (e.isDirty = !0)
                }), ke.prototype.remove.apply(t, arguments)
            }
        }), Ot.column = _e, ne.bar = t(ne.column), Ce = f(_e, {
            type: "bar",
            inverted: !0
        }), Ot.bar = Ce, ne.scatter = t(Rt, {
            lineWidth: 0,
            marker: {
                enabled: !0
            },
            tooltip: {
                headerFormat: '<span style="color:{point.color}">●</span> <span style="font-size: 10px;"> {series.name}</span><br/>',
                pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
            }
        }), Ce = f(ke, {
            type: "scatter",
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1,
            kdDimensions: 2,
            drawGraph: function () {
                this.options.lineWidth && ke.prototype.drawGraph.call(this)
            }
        }), Ot.scatter = Ce, ne.pie = t(Rt, {
            borderColor: "#FFFFFF",
            borderWidth: 1,
            center: [null, null],
            clip: !1,
            colorByPoint: !0,
            dataLabels: {
                distance: 30,
                enabled: !0,
                formatter: function () {
                    return null === this.y ? void 0 : this.point.name
                },
                x: 0
            },
            ignoreHiddenPoint: !0,
            legendType: "point",
            marker: null,
            size: null,
            showInLegend: !1,
            slicedOffset: 10,
            states: {
                hover: {
                    brightness: .1,
                    shadow: !1
                }
            },
            stickyTracking: !1,
            tooltip: {
                followPointer: !0
            }
        }), Rt = {
            type: "pie",
            isCartesian: !1,
            pointClass: f(we, {
                init: function () {
                    we.prototype.init.apply(this, arguments);
                    var t, e = this;
                    return e.name = Nt(e.name, "Slice"), t = function (t) {
                        e.slice("select" === t.type)
                    }, Jt(e, "select", t), Jt(e, "unselect", t), e
                },
                setVisible: function (t, e) {
                    var i = this,
                        n = i.series,
                        o = n.chart,
                        s = n.options.ignoreHiddenPoint,
                        e = Nt(e, s);
                    t !== i.visible && (i.visible = i.options.visible = t = t === L ? !i.visible : t, n.options.data[Yt(i, n.data)] = i.options, Vt(["graphic", "dataLabel", "connector", "shadowGroup"], function (e) {
                        i[e] && i[e][t ? "show" : "hide"](!0)
                    }), i.legendItem && o.legend.colorizeItem(i, t), !t && "hover" === i.state && i.setState(""), s && (n.isDirty = !0), e && o.redraw())
                },
                slice: function (t, e, i) {
                    var n = this.series;
                    S(i, n.chart), Nt(e, !0), this.sliced = this.options.sliced = t = c(t) ? t : !this.sliced, n.options.data[Yt(this, n.data)] = this.options, t = t ? this.slicedTranslation : {
                        translateX: 0,
                        translateY: 0
                    }, this.graphic.animate(t), this.shadowGroup && this.shadowGroup.animate(t)
                },
                haloPath: function (t) {
                    var e = this.shapeArgs,
                        i = this.series.chart;
                    return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(i.plotLeft + e.x, i.plotTop + e.y, e.r + t, e.r + t, {
                        innerR: this.shapeArgs.r,
                        start: e.start,
                        end: e.end
                    })
                }
            }),
            requireSorting: !1,
            directTouch: !0,
            noSharedTooltip: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            axisTypes: [],
            pointAttrToOptions: {
                stroke: "borderColor",
                "stroke-width": "borderWidth",
                fill: "color"
            },
            animate: function (t) {
                var e = this,
                    i = e.points,
                    n = e.startAngleRad;
                t || (Vt(i, function (t) {
                    var i = t.graphic,
                        o = t.shapeArgs;
                    i && (i.attr({
                        r: t.startR || e.center[3] / 2,
                        start: n,
                        end: n
                    }), i.animate({
                        r: o.r,
                        start: o.start,
                        end: o.end
                    }, e.options.animation))
                }), e.animate = null)
            },
            updateTotals: function () {
                var t, e, i = 0,
                    n = this.points,
                    o = n.length,
                    s = this.options.ignoreHiddenPoint;
                for (t = 0; o > t; t++) e = n[t], i += s && !e.visible ? 0 : e.y;
                for (this.total = i, t = 0; o > t; t++) e = n[t], e.percentage = i > 0 && (e.visible || !s) ? e.y / i * 100 : 0, e.total = i
            },
            generatePoints: function () {
                ke.prototype.generatePoints.call(this), this.updateTotals()
            },
            translate: function (t) {
                this.generatePoints();
                var e, i, n, o, s, r = 0,
                    a = this.options,
                    l = a.slicedOffset,
                    c = l + a.borderWidth,
                    d = a.startAngle || 0,
                    h = this.startAngleRad = mt / 180 * (d - 90),
                    d = (this.endAngleRad = mt / 180 * (Nt(a.endAngle, d + 360) - 90)) - h,
                    u = this.points,
                    p = a.dataLabels.distance,
                    a = a.ignoreHiddenPoint,
                    f = u.length;
                for (t || (this.center = t = this.getCenter()), this.getX = function (e, i) {
                    return n = rt.asin(ht((e - t[1]) / (t[2] / 2 + p), 1)), t[0] + (i ? -1 : 1) * pt(n) * (t[2] / 2 + p)
                }, o = 0; f > o; o++) s = u[o], e = h + r * d, (!a || s.visible) && (r += s.percentage / 100), i = h + r * d, s.shapeType = "arc", s.shapeArgs = {
                    x: t[0],
                    y: t[1],
                    r: t[2] / 2,
                    innerR: t[3] / 2,
                    start: at(1e3 * e) / 1e3,
                    end: at(1e3 * i) / 1e3
                }, n = (i + e) / 2, n > 1.5 * mt ? n -= 2 * mt : -mt / 2 > n && (n += 2 * mt), s.slicedTranslation = {
                    translateX: at(pt(n) * l),
                    translateY: at(ft(n) * l)
                }, e = pt(n) * t[2] / 2, i = ft(n) * t[2] / 2, s.tooltipPos = [t[0] + .7 * e, t[1] + .7 * i], s.half = -mt / 2 > n || n > mt / 2 ? 1 : 0, s.angle = n, c = ht(c, p / 2), s.labelPos = [t[0] + e + pt(n) * p, t[1] + i + ft(n) * p, t[0] + e + pt(n) * c, t[1] + i + ft(n) * c, t[0] + e, t[1] + i, 0 > p ? "center" : s.half ? "right" : "left", n]
            },
            drawGraph: null,
            drawPoints: function () {
                var t, e, i, n, o, s = this,
                    r = s.chart.renderer,
                    a = s.options.shadow;
                a && !s.shadowGroup && (s.shadowGroup = r.g("shadow").add(s.group)), Vt(s.points, function (l) {
                    null !== l.y && (e = l.graphic,
                        n = l.shapeArgs, i = l.shadowGroup, a && !i && (i = l.shadowGroup = r.g("shadow").add(s.shadowGroup)), t = l.sliced ? l.slicedTranslation : {
                            translateX: 0,
                            translateY: 0
                        }, i && i.attr(t), e ? e.setRadialReference(s.center).animate(jt(n, t)) : (o = {
                            "stroke-linejoin": "round"
                        }, l.visible || (o.visibility = "hidden"), l.graphic = e = r[l.shapeType](n).setRadialReference(s.center).attr(l.pointAttr[l.selected ? "select" : ""]).attr(o).attr(t).add(s.group).shadow(a, i)))
                })
            },
            searchPoint: At,
            sortByAngle: function (t, e) {
                t.sort(function (t, i) {
                    return void 0 !== t.angle && (i.angle - t.angle) * e
                })
            },
            drawLegendSymbol: ce.drawRectangle,
            getCenter: xe.getCenter,
            getSymbol: At
        }, Rt = f(ke, Rt), Ot.pie = Rt, ke.prototype.drawDataLabels = function () {
            var e, i, n, o, s = this,
                r = s.options,
                a = r.cursor,
                l = r.dataLabels,
                d = s.points,
                h = s.hasRendered || 0,
                u = s.chart.renderer;
            (l.enabled || s._hasPointLabels) && (s.dlProcessOptions && s.dlProcessOptions(l), o = s.plotGroup("dataLabelsGroup", "data-labels", l.defer ? "hidden" : "visible", l.zIndex || 6), Nt(l.defer, !0) && (o.attr({
                opacity: +h
            }), h || Jt(s, "afterAnimate", function () {
                s.visible && o.show(), o[r.animation ? "animate" : "attr"]({
                    opacity: 1
                }, {
                        duration: 200
                    })
            })), i = l, Vt(d, function (d) {
                var h, p, f, m, g = d.dataLabel,
                    y = d.connector,
                    b = !0,
                    x = {};
                if (e = d.dlOptions || d.options && d.options.dataLabels, h = Nt(e && e.enabled, i.enabled), g && !h) d.dataLabel = g.destroy();
                else if (h) {
                    if (l = t(i, e), m = l.style, h = l.rotation, p = d.getLabelConfig(), n = l.format ? v(l.format, p) : l.formatter.call(p, l), m.color = Nt(l.color, m.color, s.color, "black"), g) c(n) ? (g.attr({
                        text: n
                    }), b = !1) : (d.dataLabel = g = g.destroy(), y && (d.connector = y.destroy()));
                    else if (c(n)) {
                        g = {
                            fill: l.backgroundColor,
                            stroke: l.borderColor,
                            "stroke-width": l.borderWidth,
                            r: l.borderRadius || 0,
                            rotation: h,
                            padding: l.padding,
                            zIndex: 1
                        }, "contrast" === m.color && (x.color = l.inside || l.distance < 0 || r.stacking ? u.getContrast(d.color || s.color) : "#000000"), a && (x.cursor = a);
                        for (f in g) g[f] === L && delete g[f];
                        g = d.dataLabel = u[h ? "text" : "label"](n, 0, -999, l.shape, null, null, l.useHTML).attr(g).css(jt(m, x)).add(o).shadow(l.shadow)
                    }
                    g && s.alignDataLabel(d, g, l, null, b)
                }
            }))
        }, ke.prototype.alignDataLabel = function (t, e, i, n, o) {
            var s = this.chart,
                r = s.inverted,
                a = Nt(t.plotX, -999),
                l = Nt(t.plotY, -999),
                c = e.getBBox(),
                d = s.renderer.fontMetrics(i.style.fontSize).b,
                h = this.visible && (t.series.forceDL || s.isInsidePlot(a, at(l), r) || n && s.isInsidePlot(a, r ? n.x + 1 : n.y + n.height - 1, r));
            h && (n = jt({
                x: r ? s.plotWidth - l : a,
                y: at(r ? s.plotHeight - a : l),
                width: 0,
                height: 0
            }, n), jt(i, {
                width: c.width,
                height: c.height
            }), i.rotation ? (t = s.renderer.rotCorr(d, i.rotation), e[o ? "attr" : "animate"]({
                x: n.x + i.x + n.width / 2 + t.x,
                y: n.y + i.y + n.height / 2
            }).attr({
                align: i.align
            })) : (e.align(i, null, n), r = e.alignAttr, "justify" === Nt(i.overflow, "justify") ? this.justifyDataLabel(e, i, r, c, n, o) : Nt(i.crop, !0) && (h = s.isInsidePlot(r.x, r.y) && s.isInsidePlot(r.x + c.width, r.y + c.height)), i.shape && e.attr({
                anchorX: t.plotX,
                anchorY: t.plotY
            }))), h || (ie(e), e.attr({
                y: -999
            }), e.placed = !1)
        }, ke.prototype.justifyDataLabel = function (t, e, i, n, o, s) {
            var r, a, l = this.chart,
                c = e.align,
                d = e.verticalAlign,
                h = t.box ? 0 : t.padding || 0;
            r = i.x + h, 0 > r && ("right" === c ? e.align = "left" : e.x = -r, a = !0), r = i.x + n.width - h, r > l.plotWidth && ("left" === c ? e.align = "right" : e.x = l.plotWidth - r, a = !0), r = i.y + h, 0 > r && ("bottom" === d ? e.verticalAlign = "top" : e.y = -r, a = !0), r = i.y + n.height - h, r > l.plotHeight && ("top" === d ? e.verticalAlign = "bottom" : e.y = l.plotHeight - r, a = !0), a && (t.placed = !s, t.align(e, null, o))
        }, Ot.pie && (Ot.pie.prototype.drawDataLabels = function () {
            var t, e, i, n, o, s, r, a, l, c, d, h = this,
                u = h.data,
                p = h.chart,
                f = h.options.dataLabels,
                m = Nt(f.connectorPadding, 10),
                g = Nt(f.connectorWidth, 1),
                v = p.plotWidth,
                y = p.plotHeight,
                b = Nt(f.softConnector, !0),
                x = f.distance,
                w = h.center,
                _ = w[2] / 2,
                C = w[1],
                T = x > 0,
                $ = [
                    [],
                    []
                ],
                S = [0, 0, 0, 0],
                P = function (t, e) {
                    return e.y - t.y
                };
            if (h.visible && (f.enabled || h._hasPointLabels)) {
                for (ke.prototype.drawDataLabels.apply(h), Vt(u, function (t) {
                    t.dataLabel && t.visible && $[t.half].push(t)
                }), c = 2; c--;) {
                    var M, A = [],
                        E = [],
                        L = $[c],
                        D = L.length;
                    if (D) {
                        for (h.sortByAngle(L, c - .5), d = u = 0; !u && L[d];) u = L[d] && L[d].dataLabel && (L[d].dataLabel.getBBox().height || 21), d++;
                        if (x > 0) {
                            for (o = ht(C + _ + x, p.plotHeight), d = dt(0, C - _ - x); o >= d; d += u) A.push(d);
                            if (o = A.length, D > o) {
                                for (t = [].concat(L), t.sort(P), d = D; d--;) t[d].rank = d;
                                for (d = D; d--;) L[d].rank >= o && L.splice(d, 1);
                                D = L.length
                            }
                            for (d = 0; D > d; d++) {
                                t = L[d], s = t.labelPos, t = 9999;
                                var B, F;
                                for (F = 0; o > F; F++) B = ut(A[F] - s[1]), t > B && (t = B, M = F);
                                if (d > M && null !== A[d]) M = d;
                                else
                                    for (D - d + M > o && null !== A[d] && (M = o - D + d); null === A[M];) M++;
                                E.push({
                                    i: M,
                                    y: A[M]
                                }), A[M] = null
                            }
                            E.sort(P)
                        }
                        for (d = 0; D > d; d++) t = L[d], s = t.labelPos, n = t.dataLabel, l = t.visible === !1 ? "hidden" : "inherit", t = s[1], x > 0 ? (o = E.pop(), M = o.i, a = o.y, (t > a && null !== A[M + 1] || a > t && null !== A[M - 1]) && (a = ht(dt(0, t), p.plotHeight))) : a = t, r = f.justify ? w[0] + (c ? -1 : 1) * (_ + x) : h.getX(a === C - _ - x || a === C + _ + x ? t : a, c), n._attr = {
                            visibility: l,
                            align: s[6]
                        }, n._pos = {
                            x: r + f.x + ({
                                left: m,
                                right: -m
                            }[s[6]] || 0),
                            y: a + f.y - 10
                        }, n.connX = r, n.connY = a, null === this.options.size && (o = n.width, m > r - o ? S[3] = dt(at(o - r + m), S[3]) : r + o > v - m && (S[1] = dt(at(r + o - v + m), S[1])), 0 > a - u / 2 ? S[0] = dt(at(-a + u / 2), S[0]) : a + u / 2 > y && (S[2] = dt(at(a + u / 2 - y), S[2])))
                    }
                } (0 === k(S) || this.verifyDataLabelOverflow(S)) && (this.placeDataLabels(), T && g && Vt(this.points, function (t) {
                    e = t.connector, s = t.labelPos, (n = t.dataLabel) && n._pos && t.visible ? (l = n._attr.visibility, r = n.connX, a = n.connY, i = b ? ["M", r + ("left" === s[6] ? 5 : -5), a, "C", r, a, 2 * s[2] - s[4], 2 * s[3] - s[5], s[2], s[3], "L", s[4], s[5]] : ["M", r + ("left" === s[6] ? 5 : -5), a, "L", s[2], s[3], "L", s[4], s[5]], e ? (e.animate({
                        d: i
                    }), e.attr("visibility", l)) : t.connector = e = h.chart.renderer.path(i).attr({
                        "stroke-width": g,
                        stroke: f.connectorColor || t.color || "#606060",
                        visibility: l
                    }).add(h.dataLabelsGroup)) : e && (t.connector = e.destroy())
                }))
            }
        }, Ot.pie.prototype.placeDataLabels = function () {
            Vt(this.points, function (t) {
                var e = t.dataLabel;
                e && t.visible && ((t = e._pos) ? (e.attr(e._attr), e[e.moved ? "animate" : "attr"](t), e.moved = !0) : e && e.attr({
                    y: -999
                }))
            })
        }, Ot.pie.prototype.alignDataLabel = At, Ot.pie.prototype.verifyDataLabelOverflow = function (t) {
            var e, i = this.center,
                n = this.options,
                o = n.center,
                s = n.minSize || 80,
                r = s;
            return null !== o[0] ? r = dt(i[2] - dt(t[1], t[3]), s) : (r = dt(i[2] - t[1] - t[3], s), i[0] += (t[3] - t[1]) / 2), null !== o[1] ? r = dt(ht(r, i[2] - dt(t[0], t[2])), s) : (r = dt(ht(r, i[2] - t[0] - t[2]), s), i[1] += (t[0] - t[2]) / 2), r < i[2] ? (i[2] = r, i[3] = Math.min(/%$/.test(n.innerSize || 0) ? r * parseFloat(n.innerSize || 0) / 100 : parseFloat(n.innerSize || 0), r), this.translate(i), Vt(this.points, function (t) {
                t.dataLabel && (t.dataLabel._pos = null)
            }), this.drawDataLabels && this.drawDataLabels()) : e = !0, e
        }), Ot.column && (Ot.column.prototype.alignDataLabel = function (e, i, n, o, s) {
            var r = this.chart.inverted,
                a = e.series,
                l = e.dlBox || e.shapeArgs,
                c = Nt(e.below, e.plotY > Nt(this.translatedThreshold, a.yAxis.len)),
                d = Nt(n.inside, !!this.options.stacking);
            l && (o = t(l), r && (o = {
                x: a.yAxis.len - o.y - o.height,
                y: a.xAxis.len - o.x - o.width,
                width: o.height,
                height: o.width
            }), !d) && (r ? (o.x += c ? 0 : o.width, o.width = 0) : (o.y += c ? o.height : 0, o.height = 0)), n.align = Nt(n.align, !r || d ? "center" : c ? "right" : "left"), n.verticalAlign = Nt(n.verticalAlign, r || d ? "middle" : c ? "top" : "bottom"), ke.prototype.alignDataLabel.call(this, e, i, n, o, s)
        }),
            function (t) {
                var e = t.Chart,
                    i = t.each,
                    n = t.pick,
                    o = HighchartsAdapter.addEvent;
                e.prototype.callbacks.push(function (t) {
                    function e() {
                        var e = [];
                        i(t.series, function (t) {
                            var o = t.options.dataLabels,
                                s = t.dataLabelCollections || ["dataLabel"];
                            (o.enabled || t._hasPointLabels) && !o.allowOverlap && t.visible && i(s, function (o) {
                                i(t.points, function (t) {
                                    t[o] && (t[o].labelrank = n(t.labelrank, t.shapeArgs && t.shapeArgs.height), e.push(t[o]))
                                })
                            })
                        }), t.hideOverlappingLabels(e)
                    }
                    e(), o(t, "redraw", e)
                }), e.prototype.hideOverlappingLabels = function (t) {
                    var e, n, o, s, r, a, l, c = t.length;
                    for (n = 0; c > n; n++)(e = t[n]) && (e.oldOpacity = e.opacity, e.newOpacity = 1);
                    for (t.sort(function (t, e) {
                        return (e.labelrank || 0) - (t.labelrank || 0)
                    }), n = 0; c > n; n++)
                        for (o = t[n], e = n + 1; c > e; ++e) s = t[e], o && s && o.placed && s.placed && 0 !== o.newOpacity && 0 !== s.newOpacity && (r = o.alignAttr, a = s.alignAttr, l = 2 * (o.box ? 0 : o.padding), r = !(a.x > r.x + (o.width - l) || a.x + (s.width - l) < r.x || a.y > r.y + (o.height - l) || a.y + (s.height - l) < r.y)) && ((o.labelrank < s.labelrank ? o : s).newOpacity = 0);
                    i(t, function (t) {
                        var e, i;
                        t && (i = t.newOpacity, t.oldOpacity !== i && t.placed && (i ? t.show(!0) : e = function () {
                            t.hide()
                        }, t.alignAttr.opacity = i, t[t.isOld ? "animate" : "attr"](t.alignAttr, null, e)), t.isOld = !0)
                    })
                }
            }(nt), Rt = nt.TrackerMixin = {
                drawTrackerPoint: function () {
                    var t = this,
                        e = t.chart,
                        i = e.pointer,
                        n = t.options.cursor,
                        o = n && {
                            cursor: n
                        },
                        s = function (t) {
                            for (var i, n = t.target; n && !i;) i = n.point, n = n.parentNode;
                            i !== L && i !== e.hoverPoint && i.onMouseOver(t)
                        };
                    Vt(t.points, function (t) {
                        t.graphic && (t.graphic.element.point = t), t.dataLabel && (t.dataLabel.element.point = t)
                    }), t._hasTracking || (Vt(t.trackerGroups, function (e) {
                        t[e] && (t[e].addClass("highcharts-tracker").on("mouseover", s).on("mouseout", function (t) {
                            i.onTrackerMouseOut(t)
                        }).css(o), B) && t[e].on("touchstart", s)
                    }), t._hasTracking = !0)
                },
                drawTrackerGraph: function () {
                    var t, e = this,
                        i = e.options,
                        n = i.trackByArea,
                        o = [].concat(n ? e.areaPath : e.graphPath),
                        s = o.length,
                        r = e.chart,
                        a = r.pointer,
                        l = r.renderer,
                        c = r.options.tooltip.snap,
                        d = e.tracker,
                        h = i.cursor,
                        u = h && {
                            cursor: h
                        },
                        h = e.singlePoints,
                        p = function () {
                            r.hoverSeries !== e && e.onMouseOver()
                        },
                        f = "rgba(192,192,192," + (Tt ? 1e-4 : .002) + ")";
                    if (s && !n)
                        for (t = s + 1; t--;) "M" === o[t] && o.splice(t + 1, 0, o[t + 1] - c, o[t + 2], "L"), (t && "M" === o[t] || t === s) && o.splice(t, 0, "L", o[t - 2] + c, o[t - 1]);
                    for (t = 0; t < h.length; t++) s = h[t], o.push("M", s.plotX - c, s.plotY, "L", s.plotX + c, s.plotY);
                    d ? d.attr({
                        d: o
                    }) : (e.tracker = l.path(o).attr({
                        "stroke-linejoin": "round",
                        visibility: e.visible ? "visible" : "hidden",
                        stroke: f,
                        fill: n ? f : Bt,
                        "stroke-width": i.lineWidth + (n ? 0 : 2 * c),
                        zIndex: 2
                    }).add(e.group), Vt([e.tracker, e.markerGroup], function (t) {
                        t.addClass("highcharts-tracker").on("mouseover", p).on("mouseout", function (t) {
                            a.onTrackerMouseOut(t)
                        }).css(u), B && t.on("touchstart", p)
                    }))
                }
            }, Ot.column && (_e.prototype.drawTracker = Rt.drawTrackerPoint), Ot.pie && (Ot.pie.prototype.drawTracker = Rt.drawTrackerPoint), Ot.scatter && (Ce.prototype.drawTracker = Rt.drawTrackerPoint), jt(be.prototype, {
                setItemEvents: function (t, e, i, n, o) {
                    var s = this;
                    (i ? e : t.legendGroup).on("mouseover", function () {
                        t.setState("hover"), e.css(s.options.itemHoverStyle)
                    }).on("mouseout", function () {
                        e.css(t.visible ? n : o), t.setState()
                    }).on("click", function (e) {
                        var i = function () {
                            t.setVisible && t.setVisible()
                        },
                            e = {
                                browserEvent: e
                            };
                        t.firePointEvent ? t.firePointEvent("legendItemClick", e, i) : Qt(t, "legendItemClick", e, i)
                    })
                },
                createCheckboxForItem: function (t) {
                    t.checkbox = p("input", {
                        type: "checkbox",
                        checked: t.selected,
                        defaultChecked: t.selected
                    }, this.options.itemCheckboxStyle, this.chart.container), Jt(t.checkbox, "click", function (e) {
                        Qt(t.series || t, "checkboxClick", {
                            checked: e.target.checked,
                            item: t
                        }, function () {
                            t.select()
                        })
                    })
                }
            }), H.legend.itemStyle.cursor = "pointer", jt(qt.prototype, {
                showResetZoom: function () {
                    var t = this,
                        e = H.lang,
                        i = t.options.chart.resetZoomButton,
                        n = i.theme,
                        o = n.states,
                        s = "chart" === i.relativeTo ? null : "plotBox";
                    this.resetZoomButton = t.renderer.button(e.resetZoom, null, null, function () {
                        t.zoomOut()
                    }, n, o && o.hover).attr({
                        align: i.position.align,
                        title: e.resetZoomTitle
                    }).add().align(i.position, !1, s)
                },
                zoomOut: function () {
                    var t = this;
                    Qt(t, "selection", {
                        resetSelection: !0
                    }, function () {
                        t.zoom()
                    })
                },
                zoom: function (t) {
                    var e, i, o = this.pointer,
                        s = !1;
                    !t || t.resetSelection ? Vt(this.axes, function (t) {
                        e = t.zoom()
                    }) : Vt(t.xAxis.concat(t.yAxis), function (t) {
                        var i = t.axis,
                            n = i.isXAxis;
                        (o[n ? "zoomX" : "zoomY"] || o[n ? "pinchX" : "pinchY"]) && (e = i.zoom(t.min, t.max), i.displayBtn && (s = !0))
                    }), i = this.resetZoomButton, s && !i ? this.showResetZoom() : !s && n(i) && (this.resetZoomButton = i.destroy()), e && this.redraw(Nt(this.options.chart.animation, t && t.animation, this.pointCount < 100))
                },
                pan: function (t, e) {
                    var i, n = this,
                        o = n.hoverPoints;
                    o && Vt(o, function (t) {
                        t.setState()
                    }), Vt("xy" === e ? [1, 0] : [1], function (e) {
                        var o = t[e ? "chartX" : "chartY"],
                            s = n[e ? "xAxis" : "yAxis"][0],
                            r = n[e ? "mouseDownX" : "mouseDownY"],
                            a = (s.pointRange || 0) / 2,
                            l = s.getExtremes(),
                            c = s.toValue(r - o, !0) + a,
                            a = s.toValue(r + n[e ? "plotWidth" : "plotHeight"] - o, !0) - a,
                            r = r > o;
                        s.series.length && (r || c > ht(l.dataMin, l.min)) && (!r || a < dt(l.dataMax, l.max)) && (s.setExtremes(c, a, !1, !1, {
                            trigger: "pan"
                        }), i = !0), n[e ? "mouseDownX" : "mouseDownY"] = o
                    }), i && n.redraw(!1), u(n.container, {
                        cursor: "move"
                    })
                }
            }), jt(we.prototype, {
                select: function (t, e) {
                    var i = this,
                        n = i.series,
                        o = n.chart,
                        t = Nt(t, !i.selected);
                    i.firePointEvent(t ? "select" : "unselect", {
                        accumulate: e
                    }, function () {
                        i.selected = i.options.selected = t, n.options.data[Yt(i, n.data)] = i.options, i.setState(t && "select"), e || Vt(o.getSelectedPoints(), function (t) {
                            t.selected && t !== i && (t.selected = t.options.selected = !1, n.options.data[Yt(t, n.data)] = t.options, t.setState(""), t.firePointEvent("unselect"))
                        })
                    })
                },
                onMouseOver: function (t, e) {
                    var i = this.series,
                        n = i.chart,
                        o = n.tooltip,
                        s = n.hoverPoint;
                    n.hoverSeries !== i && i.onMouseOver(), s && s !== this && s.onMouseOut(), this.series && (this.firePointEvent("mouseOver"), o && (!o.shared || i.noSharedTooltip) && o.refresh(this, t), this.setState("hover"), !e) && (n.hoverPoint = this)
                },
                onMouseOut: function () {
                    var t = this.series.chart,
                        e = t.hoverPoints;
                    this.firePointEvent("mouseOut"), e && -1 !== Yt(this, e) || (this.setState(), t.hoverPoint = null)
                },
                importEvents: function () {
                    if (!this.hasImportedEvents) {
                        var e, i = t(this.series.options.point, this.options).events;
                        this.events = i;
                        for (e in i) Jt(this, e, i[e]);
                        this.hasImportedEvents = !0
                    }
                },
                setState: function (e, i) {
                    var n, o = lt(this.plotX),
                        s = this.plotY,
                        r = this.series,
                        a = r.options.states,
                        l = ne[r.type].marker && r.options.marker,
                        c = l && !l.enabled,
                        d = l && l.states[e],
                        h = d && d.enabled === !1,
                        u = r.stateMarkerGraphic,
                        p = this.marker || {},
                        f = r.chart,
                        m = r.halo,
                        e = e || "";
                    n = this.pointAttr[e] || r.pointAttr[e], e === this.state && !i || this.selected && "select" !== e || a[e] && a[e].enabled === !1 || e && (h || c && d.enabled === !1) || e && p.states && p.states[e] && p.states[e].enabled === !1 || (this.graphic ? (l = l && this.graphic.symbolName && n.r, this.graphic.attr(t(n, l ? {
                        x: o - l,
                        y: s - l,
                        width: 2 * l,
                        height: 2 * l
                    } : {})), u && u.hide()) : (e && d && (l = d.radius, p = p.symbol || r.symbol, u && u.currentSymbol !== p && (u = u.destroy()), u ? u[i ? "animate" : "attr"]({
                        x: o - l,
                        y: s - l
                    }) : p && (r.stateMarkerGraphic = u = f.renderer.symbol(p, o - l, s - l, 2 * l, 2 * l).attr(n).add(r.markerGroup), u.currentSymbol = p)), u && (u[e && f.isInsidePlot(o, s, f.inverted) ? "show" : "hide"](), u.element.point = this)), (o = a[e] && a[e].halo) && o.size ? (m || (r.halo = m = f.renderer.path().add(f.seriesGroup)), m.attr(jt({
                        fill: ae(this.color || r.color).setOpacity(o.opacity).get()
                    }, o.attributes))[i ? "animate" : "attr"]({
                        d: this.haloPath(o.size)
                    })) : m && m.attr({
                        d: []
                    }), this.state = e)
                },
                haloPath: function (t) {
                    var e = this.series,
                        i = e.chart,
                        n = e.getPlotBox(),
                        o = i.inverted;
                    return i.renderer.symbols.circle(n.translateX + (o ? e.yAxis.len - this.plotY : this.plotX) - t, n.translateY + (o ? e.xAxis.len - this.plotX : this.plotY) - t, 2 * t, 2 * t)
                }
            }), jt(ke.prototype, {
                onMouseOver: function () {
                    var t = this.chart,
                        e = t.hoverSeries;
                    e && e !== this && e.onMouseOut(), this.options.events.mouseOver && Qt(this, "mouseOver"), this.setState("hover"), t.hoverSeries = this
                },
                onMouseOut: function () {
                    var t = this.options,
                        e = this.chart,
                        i = e.tooltip,
                        n = e.hoverPoint;
                    e.hoverSeries = null, n && n.onMouseOut(), this && t.events.mouseOut && Qt(this, "mouseOut"), i && !t.stickyTracking && (!i.shared || this.noSharedTooltip) && i.hide(), this.setState()
                },
                setState: function (t) {
                    var e = this.options,
                        i = this.graph,
                        n = e.states,
                        o = e.lineWidth,
                        e = 0,
                        t = t || "";
                    if (this.state !== t && (this.state = t, !(n[t] && n[t].enabled === !1) && (t && (o = n[t].lineWidth || o + (n[t].lineWidthPlus || 0)), i && !i.dashstyle)))
                        for (t = {
                            "stroke-width": o
                        }, i.attr(t); this["zoneGraph" + e];) this["zoneGraph" + e].attr(t), e += 1
                },
                setVisible: function (t, e) {
                    var i, n = this,
                        o = n.chart,
                        s = n.legendItem,
                        r = o.options.chart.ignoreHiddenSeries,
                        a = n.visible;
                    i = (n.visible = t = n.userOptions.visible = t === L ? !a : t) ? "show" : "hide", Vt(["group", "dataLabelsGroup", "markerGroup", "tracker"], function (t) {
                        n[t] && n[t][i]()
                    }), (o.hoverSeries === n || (o.hoverPoint && o.hoverPoint.series) === n) && n.onMouseOut(), s && o.legend.colorizeItem(n, t), n.isDirty = !0, n.options.stacking && Vt(o.series, function (t) {
                        t.options.stacking && t.visible && (t.isDirty = !0)
                    }), Vt(n.linkedSeries, function (e) {
                        e.setVisible(t, !1)
                    }), r && (o.isDirtyBox = !0), e !== !1 && o.redraw(), Qt(n, i)
                },
                show: function () {
                    this.setVisible(!0)
                },
                hide: function () {
                    this.setVisible(!1)
                },
                select: function (t) {
                    this.selected = t = t === L ? !this.selected : t, this.checkbox && (this.checkbox.checked = t), Qt(this, t ? "select" : "unselect")
                },
                drawTracker: Rt.drawTrackerGraph
            }), jt(nt, {
                Color: ae,
                Point: we,
                Tick: A,
                Renderer: D,
                SVGElement: M,
                SVGRenderer: le,
                arrayMin: w,
                arrayMax: k,
                charts: Et,
                dateFormat: I,
                error: T,
                format: v,
                pathAnim: O,
                getOptions: function () {
                    return H
                },
                hasBidiBug: $t,
                isTouchDevice: _t,
                setOptions: function (e) {
                    return H = t(!0, H, e), P(), H
                },
                addEvent: Jt,
                removeEvent: Zt,
                createElement: p,
                discardElement: C,
                css: u,
                each: Vt,
                map: Kt,
                merge: t,
                splat: h,
                extendClass: f,
                pInt: e,
                svg: Tt,
                canvas: St,
                vml: !Tt && !St,
                product: "Highcharts",
                version: "4.1.9"
            })
    }(), define("highcharts", ["jquery"], function (t) {
        return function () {
            var e;
            return e || t.Highcharts
        }
    }(this)), define("chart-config", ["lib/utils", "highcharts"], function (t) {
        "use strict";
        var e, i = function () {
            Highcharts.setOptions({
                chart: {
                    style: {
                        fontFamily: t.isRTL() ? "DIN-Next-Light" : "FSTruman-Light"
                    }
                },
                plotOptions: {
                    line: {
                        marker: {
                            symbol: "circle"
                        }
                    }
                },
                credits: {
                    enabled: !1
                }
            })
        };
        return e = new i
    }), require.config({
        baseUrl: "../../js/",
        deps: ["bootstrap"],
        paths: {
            components: "../src/sublayouts",
            text: "vendor/require.text",
            jquery: "vendor/jquery",
            jquery_mobile_touch: "vendor/jquery.mobile.touch",
            slick: "vendor/slick",
            iscroll: "vendor/iscroll",
            mustache: "vendor/mustache",
            picker: "vendor/picker",
            pickerdate: "vendor/picker.date",
            parsley: "vendor/parsley",
            highcharts: "vendor/highcharts",
            chat: "vendor/chat",
            numeral: "vendor/numeral"
        },
        shim: {
            picker: {
                deps: ["jquery"]
            },
            pickerdate: {
                deps: ["jquery", "picker"]
            },
            parsley: {
                deps: ["jquery"]
            },
            highcharts: {
                exports: "Highcharts",
                deps: ["jquery"]
            }
        },
        map: {
            "*": {
                jquery: "jquery-private"
            },
            "jquery-private": {
                jquery: "jquery"
            }
        }
    }), define("config/requirejs", function () { }), define("mask", ["jquery", "lib/utils"], function (t, e) {
        "use strict";
        var i, n = function () {
            this.$el = t('<div class="mask"></div>'), this.open = !1, t("body").append(this.$el)
        };
        return n.prototype.toggle = function () {
            this.open ? this.hide() : this.show()
        }, n.prototype.show = function () {
            this.$el.addClass("mask-show"), this.open = !0
        }, n.prototype.hide = function () {
            this.$el.removeClass("mask-show"), this.open = !1
        }, i = new n
    }), define("spinner", ["jquery"], function (t) {
        "use strict";
        var e = function (t) {
            return this.$targetEl = t, this
        };
        return e.prototype.load = function () {
            this.$spinner = t('<div class="spinner"></div>'), this.$targetEl.append(this.$spinner)
        }, e.prototype.unload = function () {
            this.$spinner.fadeOut(200, t.proxy(this.destroy, this))
        }, e.prototype.destroy = function () {
            this.$spinner.remove()
        }, e
    }), define("../src/journeys/j100-services-map/j100-services-map", ["jquery", "lib/utils"], function (t, e) {
        "use strict";
        var i = function (t) {
            return this.$journey = t, this
        };
        return i.prototype.init = function () {
            var e = this;
            this.checkBoxes = this.$journey.find(".form-field__input--checkbox"), this.overlayType = 0, this.displayFilter = [], this.fastchargingMarkers = [], this.normalchargingMarkers = [], this.serviceMarkers = [], this.paymentMarkers = [], this.waterSupplyMarkers = [], this.postOfficeMarkers = [], this.ATMMarkers = [], this.ENOCMarkers = [], this.EPPCOMarkers = [], this.CDMMarkers = [], this.markerList = [this.serviceMarkers, this.waterSupplyMarkers, this.paymentMarkers, this.fastchargingMarkers, this.normalchargingMarkers, this.postOfficeMarkers, this.ATMMarkers, this.EPPCOMarkers, this.ENOCMarkers, this.CDMMarkers], this.searchField1 = t('input[name="map_search_desktop"]'), this.searchField2 = t('input[name="map_search_mobile"]'), this.defaultZoom = 13, this.searchLocation = null, this.labels = t(this.$journey).data("labels"), this.urlPrefix = "", -1 != window.location.href.indexOf("demo.brilliantbasics.com") && (this.urlPrefix = "../.."), window.check && ("head" == window.check ? (e.$journey.find('[name="j100_checkbox_1_1"]').prop("checked", !0), e.displayFilter.push(1)) : (e.$journey.find('[name="j100_checkbox_1_' + window.check + '"]').prop("checked", !0), e.displayFilter.push(window.check))), this.searchField1.on("keypress", function (e) {
                "" !== t(e.target).val() && 13 == e.charCode && t(e.target).blur()
            }), this.searchField2.on("keypress", function (e) {
                "" !== t(e.target).val() && 13 == e.charCode && t(e.target).blur()
            }), t(window).on("mapLoaded", function () {
                e.map = window.MAP.map, e.loadData(), e.centerPoint = e.map.getCenter(), e.map.addListener("dragend", function () {
                    e.centerPoint = e.map.getCenter(), e.map.setCenter(e.centerPoint)
                })
            }), t(window).on("resize orientationchange", function () {
                setTimeout(function () {
                    e.map.setCenter(e.centerPoint)
                }, 100)
            }), this.checkBoxes.each(function (i) {
                t(this).unbind().on("click", function () {
                    t(this).prop("checked") ? e.displayFilter.push(parseInt(t(this).val())) : e.displayFilter.splice(e.displayFilter.indexOf(parseInt(t(this).val())), 1), e.populateMap()
                })
            }), this.getLocationBySensor(), t('input[name="map_search_desktop"], input[name="map_search_mobile"]').on("focus", function () {
                e.searchField1.val(""), e.searchField2.val("")
            }), t(this.$journey).on("click", ".m32-map__button--close", function () {
                e.hideDetails()
            })
        }, i.prototype.getLocationBySensor = function () {
            function t(t) {
                try {
                    var i = new google.maps.LatLng({
                        lat: t.coords.latitude,
                        lng: t.coords.longitude
                    });
                    e.highlightLocation(e.getClosestMarker(i))
                } catch (n) { }
            }
            var e = this;
            navigator.geolocation && navigator.geolocation.getCurrentPosition(t)
        }, i.prototype.getClosestMarker = function (t) {
            var e, i, n, o = this,
                s = {};
            if (this.displayFilter.length > 0)
                for (e = 0; e < this.displayFilter.length; e++) {
                    var r = o.getFilterContent(this.displayFilter[e]);
                    for (l = 0; l < r.markers.length; l++) i = r.markers[l].position, n = google.maps.geometry.spherical.computeDistanceBetween(t, i), (!s.i || n < s.val) && (s = {
                        i: l,
                        val: n,
                        marker: r.markers[l]
                    })
                } else
                for (e = 0; e < this.markerList.length; e++)
                    for (var a = this.markerList[e], l = 0; l < a.length; l++) i = a[l].position, n = google.maps.geometry.spherical.computeDistanceBetween(t, i), (!s.i || n < s.val) && (s = {
                        i: l,
                        val: n,
                        marker: a[l]
                    });
            return s.marker
        }, i.prototype.setMapBounds = function () {
            var t = this;
            t.bounds = new google.maps.LatLngBounds;
            for (var e = 0; e < t.boundingMarkers.length; e++) t.bounds.extend(t.boundingMarkers[e].getPosition());
            t.map.fitBounds(t.bounds), t.map.centrePoint = t.map.getCenter()
        }, i.prototype.loadData = function (i) {
            var n = this,
                o = this.urlPrefix + "/content/data/payment_locations_en.json";
            e.isRTL() && (o = this.urlPrefix + "/content/data/payment_locations_ar.json"), t.ajax({
                url: o,
                dataType: "json",
                error: function (t, e, i) {
                    console.log(i)
                },
                success: function (t) {
                    n.locationData = t, n.parseData(), n.initSearchBox()
                }
            })
        }, i.prototype.parseData = function () {
            var t = this,
                e = this.locationData.Locations;
            this.fastchargingPoints = e.FastEVCharge.item, this.normalchargingPoints = e.NormalEVCharge.item, this.serviceCentres = e.CustomerService.item, this.waterSupplyPoints = e.WaterSupply.item, this.postOffices = [], this.ENOC = [], this.EPPCO = [], this.ATM = [], this.paymentPoints = [], this.cdmpoints = [];
            for (var i = 0; i < e.PaymentLocations.item.length; i++) switch (e.PaymentLocations.item[i].catg) {
                case "Emirates Post Offices":
                    this.postOffices.push(e.PaymentLocations.item[i]);
                    break;
                case "ENOC Petrol Stations":
                    this.ENOC.push(e.PaymentLocations.item[i]);
                    break;
                case "EPPCO Petrol Stations":
                    this.EPPCO.push(e.PaymentLocations.item[i]);
                    break;
                case "Etisalat ATM":
                    this.ATM.push(e.PaymentLocations.item[i]);
                    break;
                case "CDM Machine":
                    this.cdmpoints.push(e.PaymentLocations.item[i]);
                    break;
                default:
                    this.paymentPoints.push(e.PaymentLocations.item[i])
            }
            t.populateMap()
        }, i.prototype.initSearchBox = function () {
            var t = this;
            t.input1 = document.getElementById(t.searchField1.attr("id")), t.searchBox1 = new google.maps.places.SearchBox(t.input1), t.input2 = document.getElementById(t.searchField2.attr("id")), t.searchBox2 = new google.maps.places.SearchBox(t.input2), t.searchField1.closest("form").on("submit", function (t) {
                t.preventDefault()
            }), t.searchField2.closest("form").on("submit", function (t) {
                t.preventDefault()
            }), t.map.addListener("bounds_changed", function () {
                t.searchBox1.setBounds(map.getBounds()), t.searchBox2.setBounds(map.getBounds())
            }), t.searchBox1.addListener("places_changed", function () {
                t.handleSearchResult(t.searchBox1), t.searchField2.val(t.searchField1.val())
            }), t.searchBox2.addListener("places_changed", function () {
                t.handleSearchResult(t.searchBox2), t.searchField1.val(t.searchField2.val())
            })
        }, i.prototype.handleSearchResult = function (t) {
            var e = this,
                i = t.getPlaces();
            0 != i.length && (e.searchMarker && e.searchMarker.setMap(null), i.forEach(function (t) {
                var i = {
                    url: t.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };
                e.searchMarker = new google.maps.Marker({
                    map: e.map,
                    icon: i,
                    title: t.name,
                    subtitle: t.subname,
                    position: t.geometry.location
                })
            }), e.hideDetails(), e.centerPoint = e.searchLocation = e.searchMarker.getPosition(), e.map.setCenter(e.centerPoint), e.map.setZoom(e.defaultZoom))
        }, i.prototype.populateDetails = function (e) {
            this.overlayType = e.overlayType, t(".m32-map__overlay-title img").attr("src", this.urlPrefix + "/images/" + e.image), t(".m32-map__overlay-title--text").html(e.name);
            var i = "";
            void 0 != e.subname && (i = e.subname), t(".m32-map__overlay-subtitle--text").html(i);
            var n = "";
            void 0 != e.makani && (n = "<strong>" + this.labels.makani + "</strong>" + e.makani + "<br/>"), t(".m32-map__overlay-address").html("<strong>" + this.labels.loc + "</strong>" + e.address + "</strong><br/>" + n + "<strong>" + this.labels.hours + "</strong>" + e.hours), t(".m32-map__rating, .m32-map__rating-stars, .m32-map__rating-reviews").remove(), t(".m32-map__latlng").remove(), t('<div class="m32-map__latlng">' + this.labels.lat + e.lat + " " + this.labels.lng + e.lng + "</div>").insertAfter(".m32-map__overlay-address"), t(".m32-map__larger-map").empty();
            var o = null;
            o = this.searchLocation ? "https://www.google.com/maps/dir/" + this.searchLocation.lat() + "," + this.searchLocation.lng() + "/" + e.lat + "," + e.lng + "?z=14" : "https://maps.google.com?daddr=" + e.lat + "," + e.lng + "&ll=" + e.lat + "," + e.lng + "&z=14", t(".m32-map__larger-map").append('<span class="m32-map__directions-link"><a target="_blank" href="' + o + '">' + this.labels.nav + "</a></span>"), "none" == t(".m32-map__overlay").css("display") && t(".m32-map__overlay").css({
                display: "block"
            }), t(".m32-map__overlay").fadeIn()
        }, i.prototype.highlightLocation = function (t) {
            try {
                this.centerPoint = t.position, this.map.setCenter(this.centerPoint), this.map.setZoom(this.defaultZoom), this.populateDetails(t)
            } catch (e) { }
        }, i.prototype.getFilterContent = function (t) {
            var e = [],
                i = [];
            switch (parseInt(t)) {
                case 1:
                    e = this.serviceCentres, i = this.serviceMarkers;
                    break;
                case 2:
                    e = this.waterSupplyPoints, i = this.waterSupplyMarkers;
                    break;
                case 3:
                    e = this.paymentPoints, i = this.paymentMarkers;
                    break;
                case 4:
                    e = this.fastchargingPoints, i = this.fastchargingMarkers;
                    break;
                case 5:
                    e = this.normalchargingPoints, i = this.normalchargingMarkers;
                    break;
                case 6:
                    e = this.postOffices, i = this.postOfficeMarkers;
                    break;
                case 7:
                    e = this.ATM, i = this.ATMMarkers;
                    break;
                case 8:
                    e = this.ENOC, i = this.ENOCMarkers;
                    break;
                case 9:
                    e = this.EPPCO, i = this.EPPCOMarkers;
                    break;
                case 10:
                    e = this.cdmpoints, i = this.CDMMarkers
            }
            return {
                items: e,
                markers: i
            }
        }, i.prototype.populateMap = function () {
            for (var e = this, i = [], n = 0; n < this.markerList.length; n++) i.push(n + 1);
            if (e.displayFilter.length > 0) {
                e.hideDetails();
                for (var n = 0; n < e.markerList.length; n++) try {
                    for (; e.markerList[n].length > 0;) {
                        var o = e.markerList[n].pop();
                        o.setVisible(!1)
                    }
                } catch (s) { }
                i = e.displayFilter
            }
            for (var n = 0; n < i.length; n++) {
                var r = e.getFilterContent(i[n]),
                    a = r.markers,
                    l = r.items;
                if (a.length < 1)
                    for (var o = 0; o < l.length; o++) {
                        var c = new google.maps.Marker({
                            map: e.map,
                            position: {
                                lat: parseFloat(l[o].latitude),
                                lng: parseFloat(l[o].longitude)
                            },
                            lat: parseFloat(l[o].latitude),
                            lng: parseFloat(l[o].longitude),
                            name: l[o].name,
                            subname: l[o].subname,
                            address: l[o].address ? l[o].address : l[o].city,
                            makani: l[o].makaninumber,
                            hours: l[o].whrs,
                            image: l[o].iimage,
                            index: o,
                            overlayType: i[n],
                            icon: this.urlPrefix + "/images/" + l[o].pimage
                        });
                        a.push(c), a[o].addListener("click", function (i) {
                            e.highlightLocation(t(this)[0])
                        }), c.setVisible(!0)
                    }
            }
        }, i.prototype.hideDetails = function () {
            t(".m32-map__overlay").fadeOut()
        }, i
    }), define("../src/journeys/j102-tayseer-service/j102-tayseer-service", ["jquery", "lib/utils"], function (t, e) {
        "use strict";
        var i = function (t) {
            return this.$journey = t, this
        };
        return i.prototype.init = function () {
            var e = this;
            this.checkBoxes = this.$journey.find(".form-field__input--checkbox"), this.cancelAccount = this.$journey.find(".j102-tayseer-service--delete-yes"), t(".j102-tayseer-service-next").on("click", function (e) {
                t(this).is("[disabled]") && e.preventDefault()
            }), t(e.cancelAccount).on("click", function (i) {
                var n = t(this).parent().parent().parent().parent().parent().parent();
                n.prev().find("input").prop("checked", !1).attr("disabled", !0).addClass("disabled"), n.prev().remove(), console.log(n), n.remove(), t(".m39-m12-no").trigger("click"), e.updateTotal()
            }), t(".j102-tayseer-service--select").on("click", function () {
                "Select All" == t(".j102-tayseer-service--select").html() ? (t(e.checkBoxes).each(function () {
                    t(this).hasClass("disabled") || t(this).prop("checked", !0)
                }), t(".j102-tayseer-service--select").html("Deselect All"), e.updateTotal()) : (t(e.checkBoxes).each(function () {
                    t(this).hasClass("disabled") || t(this).prop("checked", !1)
                }), t(".j102-tayseer-service--select").html("Select All"), e.updateTotal())
            }), t(".j102-tayseer-service--add").on("click", function (e) {
                t(".j102-tayseer-service--add-form").addClass("j102-tayseer-service--add-form-active")
            }), t(".j102-tayseer-service--add-form-cancel").on("click", function (e) {
                t(".j102-tayseer-service--add-form").removeClass("j102-tayseer-service--add-form-active")
            }), t(".j102-tayseer-service--edit-amount").on("click", function (e) {
                t(this).parent().next().addClass("j102-tayseer-service--amount-pay-form-active")
            }), t(".j102-tayseer-service--amount-pay-form-button--cancel").on("click", function (i) {
                var n = t(this).prev().find("input");
                t(this).parent().parent().removeClass("j102-tayseer-service--amount-pay-form-active"), n.val(n.attr("value")), t(this).prev().find("input").trigger("blur"), e.getTotal()
            }), t(".j102-tayseer-service--amount-pay-form-button--set").on("click", function (e) {
                t(this).prev().find("input").trigger("blur")
            }), t(".j102-tayseer-service--amount-pay-form-input input").on("blur", function (t) {
                e.getTotal(), e.updateDisplay(this)
            }), t(e.checkBoxes).each(function (i) {
                t(this).prop("checked", !0), t(this).on("click", function () {
                    e.updateTotal()
                })
            }), this.updateTotal(), this.setValue(), this.getTotal()
        }, i.prototype.updateTotal = function () {
            var e = this,
                i = 0;
            t(".j102-tayseer-service--total").html(function () {
                return t(e.checkBoxes).each(function () {
                    t(this).prop("checked") && (i += 1)
                }), i
            }), 1 == i ? (t(".j102-tayseer-service-next").attr("disabled", !0).addClass("disabled"), t(".j102-tayseer-service-next").on("click", function (e) {
                t(".j102-tayseer-service--warning").trigger("click")
            })) : 0 == i ? t(".j102-tayseer-service-next").attr("disabled", !0).addClass("disabled") : t(".j102-tayseer-service-next").removeAttr("disabled").removeClass("disabled")
        }, i.prototype.setValue = function () {
            t(".j102-tayseer-service--amount-pay-form-input input").each(function (e) {
                var i = t(this).parents(".j102-tayseer-service--amount-pay-form").prev().find(".j102-tayseer-service--amount").html();
                t(this).attr("value", i), t(this).on("keydown", function (e) {
                    13 === e.keyCode && (e.preventDefault(), t(this).trigger("blur"))
                })
            })
        }, i.prototype.getTotal = function () {
            var e = this,
                i = 0;
            t(".j102-tayseer-service--amount-pay-form-input input").each(function (e) {
                i += parseFloat(t(this).val())
            }), t(".j102-tayseer-service--total-pay").html(e.getFormattedValue(i))
        }, i.prototype.getFormattedValue = function (t) {
            var i = e.isRTL() ? "‏" : "",
                n = numeral(parseFloat(t)).format("0,0.00");
            return i + n
        }, i.prototype.updateDisplay = function (e) {
            var i = t(e).parents("fieldset").parent().prev().find(".j102-tayseer-service--amount");
            t(e).parents(".j92-tayseer-service--amount-pay-form"), i.html(t(e).val())
        }, i
    }), define("../src/journeys/j103-move-in/j103-move-in", ["jquery", "lib/utils"], function (t, e) {
        "use strict";
        var i = function (t) {
            return this.$journey = t, this
        };
        return i.prototype.init = function () {
            var e = this;
            this.$tabs = this.$journey.find('[data-tabber="true"]'), this.$button = this.$journey.find(".tabone"), this.$buttonTwo = this.$journey.find(".tabtwo"), this.$contentone = this.$journey.find(".formone"), this.$contenttwo = this.$journey.find(".formtwo"), this.paynew = t(".j103-move-out").find("#form-field-premise_no").parent("form-field__input-wrapper");
            t("#description-for-premise_no");
            t(".form-field__input-wrapper--currency").append('<table class="m23-table__content-table prlist" style="font-size:"><thead class="m23-table__content-table-header"><tr class="m23-table__content-table-row"><td class="m23-table__content-table-cell--header">Premise No</td><td class="m23-table__content-table-cell--header">Details</td><td class="m23-table__content-table-cell--header"></td></tr></thead><tbody class="m23-table__content-table-body prelistbody"></tbody></table><span class="add-button">+</span>'), t(".add-button").on("click", function () {
                e.testone()
            }), t(".m41-tabs-box__tab-link").on("click", function () {
                console.log("hello")
            }), this.activeTabsClass = "m41-tabs-box__tab-link--active", this.activeContentClass = "tab_content_active", this.$button.on("click", function () {
                e.contentone()
            }), this.$buttonTwo.on("click", function () {
                e.contenttwo()
            })
        }, i.prototype.contentone = function () {
            this.$contentone.addClass("tab_content_active"), this.$contenttwo.removeClass("tab_content_active"), this.$button.addClass("m41-tabs-box__tab-link--active"), this.$buttonTwo.removeClass("m41-tabs-box__tab-link--active")
        }, i.prototype.contenttwo = function () {
            this.$contentone.removeClass("tab_content_active"), this.$contenttwo.addClass("tab_content_active"), this.$button.removeClass("m41-tabs-box__tab-link--active"), this.$buttonTwo.addClass("m41-tabs-box__tab-link--active")
        }, i.prototype.testone = function () {
            var e = t("#form-field-premise_no").val();
            t(".prlist tr:last");
            if (e) {
                var i = '<tr class="m23-table__content-table-row"><td data-label="Premise No" class="m23-table__content-table-cell pre-list">' + e + '</td><td data-label="Details" class="m23-table__content-table-cell">djsfhdhfkdsf</td> <td style="color:#37AA33;cursor:pointer;" class="m23-table__content-table-cell delete-pre"><i class="icon icon-cancel"></i></td></tr>';
                t(".prelistbody").append(i), console.log(e), t(".delete-pre").on("click", function () {
                    t(this).parent().remove()
                })
            } else console.log("none")
        }, i
    }), define("../src/journeys/j104-move-out/j104-move-out", ["jquery", "lib/utils"], function (t, e) {
        "use strict";
        var i = function (t) {
            return this.$journey = t, this
        };
        return i.prototype.init = function () {
            this.j104accSelectButton = t(".j104_1-move-out").find(".m39-modal__footer").find("button"), this.chargecheck = t(".j104_1-move-out").find("#form-field-checkbox_1_1")
        }, i.prototype.editButton = function (i) {
            var n = t(".j104_1-move-out").find(".form").children(".form-field__button").children(".button--primary"),
                o = (e.isRTL() ? "‏" : "", numeral(parseFloat(i)).format("0,0.00")),
                s = t(".j104_1-move-out").find("#form-field-checkbox_1_1").attr("value"),
                r = t(".j104_1-move-out").find(".m42-keyvalue__value").first();
            if (t(r).html(" AED" + o), t(".j104_1-move-out").find("#form-field-checkbox_1_1").is(":checked")) {
                var a = parseInt(i) + parseInt(s);
                t(n).html("Pay " + a + " AED")
            } else t(n).html("Pay " + o + " AED")
        }, i
    }), define("../src/journeys/j34-tariff-calculator/j34-tariff-calculator", ["jquery"], function ($) {
        "use strict";
        var TariffCalculator = function (t) {
            return this.$journey = t, this
        };
        return TariffCalculator.prototype.init = function () {
            var t = this;
            this.$resultsContainer = this.$journey.find("[data-results-container]"), this.$formContainer = this.$journey.find("[data-form-container]"), this.$form = this.$journey.find("[data-form]"), this.$typeSelect = this.$form.find("[data-type]"), this.$electricityInput = this.$form.find("[data-electricity]"), this.$waterInput = this.$form.find("[data-water]"), this.$recalculateButton = this.$journey.find("[data-recalculate-button]"), this.electricityResults = this.$resultsContainer.find("#electricity, #surcharge tbody > tr:nth-child(1), #summary tbody > tr:nth-child(1)"), this.waterResults = this.$resultsContainer.find("#water, #surcharge tbody > tr:nth-child(2), #summary tbody > tr:nth-child(2)"), this.$form.on("submit", $.proxy(this.calculate, this)), this.$recalculateButton.on("click", $.proxy(this.recalculate, this)), this.$recalculateButton.removeAttr("style "), "" !== this.$electricityInput.val() && this.$waterInput.removeAttr("required"), "" !== this.$waterInput.val() && this.$electricityInput.removeAttr("required"), this.$electricityInput.on("blur change", function () {
                "" !== $(this).val() ? t.$waterInput.removeAttr("required") : t.$waterInput.attr("required", !0)
            }), this.$waterInput.on("blur change", function () {
                "" !== $(this).val() ? t.$electricityInput.removeAttr("required") : t.$electricityInput.attr("required", !0)
            })
        }, TariffCalculator.prototype.recalculate = function (t) {
            t.preventDefault(), this.$form[0].reset(), $("html, body").scrollTop(0), this.$resultsContainer.hide(), this.$formContainer.show(), this.$form.find("span").removeClass("form-field__input-wrapper--validated"), this.$electricityInput.attr("required", !0), this.$waterInput.attr("required", !0), this.electricityResults.show(), this.waterResults.show()
        }, TariffCalculator.prototype.calculate = function (e) {
            function Tariff_Cal() {
                var subgrelec = 0,
                    subyelelec = 0,
                    suborelec = 0,
                    subredelec = 0,
                    subgrwater = 0,
                    subyelwater = 0,
                    suborwater = 0;
                if (document.getElementById("ctl00_ContentPlaceHolder1_lblfsElecvalue").innerHTML = (100 * eval(fsElecvalue)).toFixed(1), document.getElementById("ctl00_ContentPlaceHolder1_lblfsWatervalue").innerHTML = (100 * eval(fsWatervalue)).toFixed(1), water = parseFloat(water), elec = parseFloat(elec), fsElecTotal = (eval(fsElecvalue) * elec).toFixed(2), fsWaterTotal = (eval(fsWatervalue) * water).toFixed(2), fsTotal = eval(fsElecTotal) + eval(fsWaterTotal), document.getElementById("ctl00_ContentPlaceHolder1_lblfsElec").innerHTML = fsElecTotal, document.getElementById("ctl00_ContentPlaceHolder1_lblfsWater").innerHTML = fsWaterTotal, document.getElementById("ctl00_ContentPlaceHolder1_lblfsTotal").innerHTML = eval(fsTotal).toFixed(2), document.getElementById("ctl00_ContentPlaceHolder1_lblConElec").innerHTML = eval(elec), document.getElementById("ctl00_ContentPlaceHolder1_lblConWater").innerHTML = eval(water), isResedential) {
                    Assign_all(), document.getElementById("ctl00_ContentPlaceHolder1_grelec").innerHTML = resedentialData.gelec, document.getElementById("ctl00_ContentPlaceHolder1_yelelec").innerHTML = resedentialData.yelec, document.getElementById("ctl00_ContentPlaceHolder1_orelec").innerHTML = resedentialData.oelec, document.getElementById("ctl00_ContentPlaceHolder1_redelec").innerHTML = resedentialData.relec, document.getElementById("ctl00_ContentPlaceHolder1_grwater").innerHTML = resedentialData.gwater, document.getElementById("ctl00_ContentPlaceHolder1_yelwater").innerHTML = resedentialData.ywater, document.getElementById("ctl00_ContentPlaceHolder1_orwater").innerHTML = resedentialData.owater, document.getElementById("ctl00_ContentPlaceHolder1_yeltariff").innerHTML = (100 * eval(elec4k)).toFixed(0), document.getElementById("ctl00_ContentPlaceHolder1_delec2k").innerHTML = (100 * eval(elec2k)).toFixed(0), document.getElementById("ctl00_ContentPlaceHolder1_delec6k").innerHTML = (100 * eval(elec6k)).toFixed(0), document.getElementById("ctl00_ContentPlaceHolder1_delec6kp").innerHTML = (100 * eval(elec6kp)).toFixed(0), $("#ctl00_ContentPlaceHolder1_ortr").parent().show(), $("#ctl00_ContentPlaceHolder1_redtr").parent().show(), elec > 0 && (elec <= resedentialData.baseelec ? (document.getElementById("ctl00_ContentPlaceHolder1_ygrelec").innerHTML = elec, subgrelec = Math.round(elec * elec2k * 1e3) / 1e3, document.getElementById("ctl00_ContentPlaceHolder1_fgrelec").innerHTML = subgrelec.toFixed(2)) : (document.getElementById("ctl00_ContentPlaceHolder1_ygrelec").innerHTML = resedentialData.baseelec, elec = eval(elec) - resedentialData.baseelec, subgrelec = resedentialData.baseelec * elec2k, document.getElementById("ctl00_ContentPlaceHolder1_fgrelec").innerHTML = subgrelec.toFixed(2), elec > 0 && elec <= resedentialData.baseelec ? (document.getElementById("ctl00_ContentPlaceHolder1_yyelelec").innerHTML = elec, subyelelec = Math.round(eval(elec) * elec4k * 1e3) / 1e3, document.getElementById("ctl00_ContentPlaceHolder1_fyelelec").innerHTML = subyelelec.toFixed(2)) : (document.getElementById("ctl00_ContentPlaceHolder1_yyelelec").innerHTML = resedentialData.baseelec, elec = eval(elec) - resedentialData.baseelec, subyelelec = resedentialData.baseelec * elec4k, document.getElementById("ctl00_ContentPlaceHolder1_fyelelec").innerHTML = subyelelec.toFixed(2), elec > 0 && elec <= resedentialData.baseelec ? (document.getElementById("ctl00_ContentPlaceHolder1_yorelec").innerHTML = elec, suborelec = Math.round(eval(elec) * elec6k * 1e3) / 1e3, document.getElementById("ctl00_ContentPlaceHolder1_forelec").innerHTML = suborelec.toFixed(2)) : (document.getElementById("ctl00_ContentPlaceHolder1_yorelec").innerHTML = "2000", elec = eval(elec) - resedentialData.baseelec, suborelec = resedentialData.baseelec * elec6k, document.getElementById("ctl00_ContentPlaceHolder1_forelec").innerHTML = suborelec.toFixed(2), elec > 0 && (document.getElementById("ctl00_ContentPlaceHolder1_yredelec").innerHTML = elec, subredelec = Math.round(eval(elec) * elec6kp * 1e3) / 1e3, document.getElementById("ctl00_ContentPlaceHolder1_fredelec").innerHTML = subredelec.toFixed(2)))))), water > 0 && (document.getElementById("ctl00_ContentPlaceHolder1_lblwater1").innerHTML = (100 * eval(water6k)).toFixed(1), document.getElementById("ctl00_ContentPlaceHolder1_lblwater2").innerHTML = (100 * eval(water12k)).toFixed(1), document.getElementById("ctl00_ContentPlaceHolder1_lblwater3").innerHTML = (100 * eval(water12kp)).toFixed(1), water > 0 && water <= resedentialData.basewater ? (document.getElementById("ctl00_ContentPlaceHolder1_ygrwater").innerHTML = water, subgrwater = Math.round(eval(water) * water6k * 1e3) / 1e3, document.getElementById("ctl00_ContentPlaceHolder1_fgrwater").innerHTML = subgrwater.toFixed(2)) : (document.getElementById("ctl00_ContentPlaceHolder1_ygrwater").innerHTML = resedentialData.basewater, water = eval(water) - resedentialData.basewater, subgrwater = resedentialData.basewater * water6k, document.getElementById("ctl00_ContentPlaceHolder1_fgrwater").innerHTML = subgrwater.toFixed(2), water > 0 && water <= resedentialData.basewater ? (document.getElementById("ctl00_ContentPlaceHolder1_yyelwater").innerHTML = water, subyelwater = Math.round(eval(water) * water12k * 1e3) / 1e3, document.getElementById("ctl00_ContentPlaceHolder1_fyelwater").innerHTML = subyelwater.toFixed(2)) : (document.getElementById("ctl00_ContentPlaceHolder1_yyelwater").innerHTML = resedentialData.basewater, water = eval(water) - resedentialData.basewater, subyelwater = resedentialData.basewater * water12k, document.getElementById("ctl00_ContentPlaceHolder1_fyelwater").innerHTML = subyelwater.toFixed(2), water > 0 && (document.getElementById("ctl00_ContentPlaceHolder1_yorwater").innerHTML = water, suborwater = Math.round(eval(water) * water12kp * 1e3) / 1e3, document.getElementById("ctl00_ContentPlaceHolder1_forwater").innerHTML = suborwater.toFixed(2))))), subtotal = eval(subgrelec) + eval(subyelelec) + eval(suborelec) + eval(subredelec), document.getElementById("ctl00_ContentPlaceHolder1_subtotalelec").innerHTML = subtotal.toFixed(2), document.getElementById("ctl00_ContentPlaceHolder1_totalelec").innerHTML = (eval(subtotal) + eval(fsElecTotal)).toFixed(2), subtotalwater = eval(subgrwater) + eval(subyelwater) + eval(suborwater), document.getElementById("ctl00_ContentPlaceHolder1_subtotalwater").innerHTML = subtotalwater.toFixed(2), document.getElementById("ctl00_ContentPlaceHolder1_totalwater").innerHTML = (eval(subtotalwater) + eval(fsWaterTotal)).toFixed(2);
                    var subtotalelecwater = subtotalwater + subtotal + eval(fsWaterTotal) + eval(fsElecTotal);
                    document.getElementById("ctl00_ContentPlaceHolder1_totalbill").innerHTML = subtotalelecwater.toFixed(2)
                } else if (isCommercial) {
                    Assign_all(), document.getElementById("ctl00_ContentPlaceHolder1_grelec").innerHTML = commercialData.gelec, document.getElementById("ctl00_ContentPlaceHolder1_yelelec").innerHTML = commercialData.yelec, document.getElementById("ctl00_ContentPlaceHolder1_orelec").innerHTML = commercialData.oelec, document.getElementById("ctl00_ContentPlaceHolder1_redelec").innerHTML = commercialData.relec, document.getElementById("ctl00_ContentPlaceHolder1_grwater").innerHTML = commercialData.gwater, document.getElementById("ctl00_ContentPlaceHolder1_yelwater").innerHTML = commercialData.ywater, document.getElementById("ctl00_ContentPlaceHolder1_orwater").innerHTML = commercialData.owater, document.getElementById("ctl00_ContentPlaceHolder1_yeltariff").innerHTML = (100 * eval(elec4k)).toFixed(0), document.getElementById("ctl00_ContentPlaceHolder1_delec2k").innerHTML = (100 * eval(elec2k)).toFixed(0), document.getElementById("ctl00_ContentPlaceHolder1_delec6k").innerHTML = (100 * eval(elec6k)).toFixed(0), document.getElementById("ctl00_ContentPlaceHolder1_delec6kp").innerHTML = (100 * eval(elec6kp)).toFixed(0), $("#ctl00_ContentPlaceHolder1_ortr").parent().show(), $("#ctl00_ContentPlaceHolder1_redtr").parent().show(), elec > 0 && (elec > 0 && elec <= commercialData.baseelec ? (document.getElementById("ctl00_ContentPlaceHolder1_ygrelec").innerHTML = elec, subgrelec = Math.round(eval(elec) * elec2k * 1e3) / 1e3, document.getElementById("ctl00_ContentPlaceHolder1_fgrelec").innerHTML = subgrelec.toFixed(2)) : (document.getElementById("ctl00_ContentPlaceHolder1_ygrelec").innerHTML = commercialData.baseelec, elec = eval(elec) - commercialData.baseelec, subgrelec = commercialData.baseelec * elec2k, document.getElementById("ctl00_ContentPlaceHolder1_fgrelec").innerHTML = subgrelec.toFixed(2), elec > 0 && elec <= commercialData.baseelec ? (document.getElementById("ctl00_ContentPlaceHolder1_yyelelec").innerHTML = elec, subyelelec = Math.round(eval(elec) * elec4k * 1e3) / 1e3, document.getElementById("ctl00_ContentPlaceHolder1_fyelelec").innerHTML = subyelelec.toFixed(2)) : (document.getElementById("ctl00_ContentPlaceHolder1_yyelelec").innerHTML = commercialData.baseelec, elec = eval(elec) - commercialData.baseelec, subyelelec = commercialData.baseelec * elec4k, document.getElementById("ctl00_ContentPlaceHolder1_fyelelec").innerHTML = subyelelec.toFixed(2), elec > 0 && elec <= commercialData.baseelec ? (document.getElementById("ctl00_ContentPlaceHolder1_yorelec").innerHTML = elec, suborelec = Math.round(eval(elec) * elec6k * 1e3) / 1e3, document.getElementById("ctl00_ContentPlaceHolder1_forelec").innerHTML = suborelec.toFixed(2)) : (document.getElementById("ctl00_ContentPlaceHolder1_yorelec").innerHTML = commercialData.baseelec, elec = eval(elec) - commercialData.baseelec, suborelec = commercialData.baseelec * elec6k, document.getElementById("ctl00_ContentPlaceHolder1_forelec").innerHTML = suborelec.toFixed(2), elec > 0 && (document.getElementById("ctl00_ContentPlaceHolder1_yredelec").innerHTML = elec, subredelec = Math.round(eval(elec) * elec6kp * 1e3) / 1e3, document.getElementById("ctl00_ContentPlaceHolder1_fredelec").innerHTML = subredelec.toFixed(2)))))), water > 0 && (document.getElementById("ctl00_ContentPlaceHolder1_lblwater1").innerHTML = (100 * eval(water6k)).toFixed(1), document.getElementById("ctl00_ContentPlaceHolder1_lblwater2").innerHTML = (100 * eval(water12k)).toFixed(1), water > 0 && water <= commercialData.basewater ? (document.getElementById("ctl00_ContentPlaceHolder1_ygrwater").innerHTML = water, subgrwater = Math.round(eval(water) * water6k * 1e3) / 1e3, document.getElementById("ctl00_ContentPlaceHolder1_fgrwater").innerHTML = subgrwater.toFixed(2)) : (document.getElementById("ctl00_ContentPlaceHolder1_ygrwater").innerHTML = commercialData.basewater, water = eval(water) - commercialData.basewater, subgrwater = commercialData.basewater * water6k, document.getElementById("ctl00_ContentPlaceHolder1_fgrwater").innerHTML = subgrwater.toFixed(2), water > 0 && water <= commercialData.basewater ? (document.getElementById("ctl00_ContentPlaceHolder1_yyelwater").innerHTML = water, subyelwater = Math.round(eval(water) * water12k * 1e3) / 1e3, document.getElementById("ctl00_ContentPlaceHolder1_fyelwater").innerHTML = subyelwater.toFixed(2)) : (document.getElementById("ctl00_ContentPlaceHolder1_yyelwater").innerHTML = commercialData.basewater, water = eval(water) - commercialData.basewater, subyelwater = commercialData.basewater * water12k, document.getElementById("ctl00_ContentPlaceHolder1_fyelwater").innerHTML = subyelwater.toFixed(2), water > 0 && (document.getElementById("ctl00_ContentPlaceHolder1_yorwater").innerHTML = water, suborwater = Math.round(eval(water) * water12kp * 1e3) / 1e3, document.getElementById("ctl00_ContentPlaceHolder1_forwater").innerHTML = suborwater.toFixed(2)))));
                    var subtotal = eval(subgrelec) + eval(subyelelec) + eval(suborelec) + eval(subredelec);
                    document.getElementById("ctl00_ContentPlaceHolder1_subtotalelec").innerHTML = subtotal.toFixed(2), document.getElementById("ctl00_ContentPlaceHolder1_totalelec").innerHTML = (subtotal + eval(fsElecTotal)).toFixed(2);
                    var subtotalwater = eval(subgrwater) + eval(subyelwater) + eval(suborwater);
                    document.getElementById("ctl00_ContentPlaceHolder1_subtotalwater").innerHTML = subtotalwater.toFixed(2), document.getElementById("ctl00_ContentPlaceHolder1_totalwater").innerHTML = (subtotalwater + eval(fsWaterTotal)).toFixed(2);
                    var subtotalelecwater = subtotalwater + subtotal + eval(fsWaterTotal) + eval(fsElecTotal);
                    document.getElementById("ctl00_ContentPlaceHolder1_totalbill").innerHTML = subtotalelecwater.toFixed(2)
                } else {
                    $("#ctl00_ContentPlaceHolder1_ortr").parent().hide(), $("#ctl00_ContentPlaceHolder1_redtr").parent().hide(), Assign_all(), document.getElementById("ctl00_ContentPlaceHolder1_grelec").innerHTML = industrialData.gelec, document.getElementById("ctl00_ContentPlaceHolder1_yelelec").innerHTML = industrialData.yelec, document.getElementById("ctl00_ContentPlaceHolder1_grwater").innerHTML = industrialData.gwater, document.getElementById("ctl00_ContentPlaceHolder1_yelwater").innerHTML = industrialData.ywater, document.getElementById("ctl00_ContentPlaceHolder1_orwater").innerHTML = industrialData.owater, document.getElementById("ctl00_ContentPlaceHolder1_yeltariff").innerHTML = (100 * eval(elec10kp)).toFixed(0), document.getElementById("ctl00_ContentPlaceHolder1_delec2k").innerHTML = (100 * eval(elec10k)).toFixed(0), elec > 0 && (elec > 0 && elec <= industrialData.baseelec ? (document.getElementById("ctl00_ContentPlaceHolder1_ygrelec").innerHTML = elec, subgrelec = Math.round(eval(elec) * elec10k * 1e3) / 1e3, document.getElementById("ctl00_ContentPlaceHolder1_fgrelec").innerHTML = subgrelec.toFixed(2)) : (document.getElementById("ctl00_ContentPlaceHolder1_ygrelec").innerHTML = industrialData.baseelec, elec = eval(elec) - industrialData.baseelec, subgrelec = industrialData.baseelec * elec10k, document.getElementById("ctl00_ContentPlaceHolder1_fgrelec").innerHTML = subgrelec.toFixed(2), elec > 0 && (document.getElementById("ctl00_ContentPlaceHolder1_yyelelec").innerHTML = elec, subyelelec = Math.round(eval(elec) * elec10kp * 1e3) / 1e3, document.getElementById("ctl00_ContentPlaceHolder1_fyelelec").innerHTML = subyelelec.toFixed(2)))), document.getElementById("ctl00_ContentPlaceHolder1_lblwater1").innerHTML = (100 * eval(water6k)).toFixed(1), document.getElementById("ctl00_ContentPlaceHolder1_lblwater2").innerHTML = (100 * eval(water12k)).toFixed(1), document.getElementById("ctl00_ContentPlaceHolder1_lblwater3").innerHTML = (100 * eval(water12kp)).toFixed(1), water > 0 && (water > 0 && water <= industrialData.baseelec ? (document.getElementById("ctl00_ContentPlaceHolder1_ygrwater").innerHTML = water, subgrwater = Math.round(eval(water) * water6k * 1e3) / 1e3, document.getElementById("ctl00_ContentPlaceHolder1_fgrwater").innerHTML = subgrwater.toFixed(2)) : (document.getElementById("ctl00_ContentPlaceHolder1_ygrwater").innerHTML = industrialData.baseelec, water = eval(water) - industrialData.baseelec, subgrwater = water6k * industrialData.baseelec, document.getElementById("ctl00_ContentPlaceHolder1_fgrwater").innerHTML = subgrwater.toFixed(2), water > 0 && water <= industrialData.baseelec ? (document.getElementById("ctl00_ContentPlaceHolder1_yyelwater").innerHTML = water, subyelwater = Math.round(eval(water) * water12k * 1e3) / 1e3, document.getElementById("ctl00_ContentPlaceHolder1_fyelwater").innerHTML = subyelwater.toFixed(2)) : (document.getElementById("ctl00_ContentPlaceHolder1_yyelwater").innerHTML = industrialData.baseelec, water = eval(water) - industrialData.baseelec, subyelwater = industrialData.baseelec * water12k, document.getElementById("ctl00_ContentPlaceHolder1_fyelwater").innerHTML = subyelwater.toFixed(2), water > 0 && (document.getElementById("ctl00_ContentPlaceHolder1_yorwater").innerHTML = water, suborwater = Math.round(eval(water) * water12kp * 1e3) / 1e3, document.getElementById("ctl00_ContentPlaceHolder1_forwater").innerHTML = suborwater.toFixed(2)))));
                    var subtotal = eval(subgrelec) + eval(subyelelec);
                    document.getElementById("ctl00_ContentPlaceHolder1_subtotalelec").innerHTML = subtotal.toFixed(2), document.getElementById("ctl00_ContentPlaceHolder1_totalelec").innerHTML = (subtotal + eval(fsElecTotal)).toFixed(2);
                    var subtotalwater = eval(subgrwater) + eval(subyelwater) + eval(suborwater);
                    document.getElementById("ctl00_ContentPlaceHolder1_subtotalwater").innerHTML = subtotalwater.toFixed(2), document.getElementById("ctl00_ContentPlaceHolder1_totalwater").innerHTML = (subtotalwater + eval(fsWaterTotal)).toFixed(2);
                    var totalnew = subtotalwater + subtotal + eval(fsElecTotal) + eval(fsWaterTotal);
                    document.getElementById("ctl00_ContentPlaceHolder1_totalbill").innerHTML = totalnew.toFixed(2)
                }
            }

            function Assign_all() {
                document.getElementById("ctl00_ContentPlaceHolder1_ygrelec").innerHTML = "0", document.getElementById("ctl00_ContentPlaceHolder1_fgrelec").innerHTML = "0.00", document.getElementById("ctl00_ContentPlaceHolder1_yyelelec").innerHTML = "0", document.getElementById("ctl00_ContentPlaceHolder1_fyelelec").innerHTML = "0.00", document.getElementById("ctl00_ContentPlaceHolder1_yorelec").innerHTML = "0", document.getElementById("ctl00_ContentPlaceHolder1_forelec").innerHTML = "0.00", document.getElementById("ctl00_ContentPlaceHolder1_yredelec").innerHTML = "0", document.getElementById("ctl00_ContentPlaceHolder1_fredelec").innerHTML = "0.00", document.getElementById("ctl00_ContentPlaceHolder1_ygrwater").innerHTML = "0", document.getElementById("ctl00_ContentPlaceHolder1_fgrwater").innerHTML = "0.00", document.getElementById("ctl00_ContentPlaceHolder1_yyelwater").innerHTML = "0", document.getElementById("ctl00_ContentPlaceHolder1_fyelwater").innerHTML = "0.00", document.getElementById("ctl00_ContentPlaceHolder1_yorwater").innerHTML = "0", document.getElementById("ctl00_ContentPlaceHolder1_forwater").innerHTML = "0.00"
            }
            e.preventDefault();
            var elec = this.$electricityInput.val(),
                water = this.$waterInput.val(),
                isResedential = "residential" === this.$typeSelect.val(),
                isCommercial = "commercial" === this.$typeSelect.val(),
                data = this.$journey.data();
            elec || (elec = 0), water || (water = 0), this.$resultsContainer.show(), this.$formContainer.hide();
            var elec2k = data.elec2k,
                elec4k = data.elec4k,
                elec6k = data.elec6k,
                elec6kp = data.elec6kp,
                elec10k = data.elec10k,
                elec10kp = data.elec10kp,
                water6k = data.water6k,
                water12k = data.water12k,
                water12kp = data.water12kp,
                nelec2k = data.nelec2k,
                nelec4k = data.nelec4k,
                nelec6k = data.nelec6k,
                nelec6kp = data.nelec6kp,
                nwater10k = data.nwater10k,
                nwater10kp = data.nwater10kp,
                fsWatervalue = data.fswatervalue,
                fsElecvalue = data.fselecvalue,
                resedentialData = data.resedential,
                commercialData = data.commercial,
                industrialData = data.industrial,
                fsElecTotal, fsWaterTotal, fsTotal;
            Tariff_Cal()
        }, TariffCalculator
    }), define("../src/journeys/j40-pledge/j40-pledge", ["jquery"], function (t) {
        "use strict";
        var e = function (t) {
            return this.$journey = t, this
        };
        return e.prototype.init = function () {
            var e = this;
            e.total = 0, e.numBulbsCB = t(this.$journey).find('input[data-j40-pledge="j40_checkbox_1_1"]'), e.numBulbsTF = t(this.$journey).find('input[data-j40-pledge="j40_textfield_1_1"]'), e.airConTempCB = t(this.$journey).find('input[data-j40-pledge="j40_checkbox_1_2"]'), e.airConMaintCB = t(this.$journey).find('input[data-j40-pledge="j40_checkbox_1_3"]'), e.dryerCB = t(this.$journey).find('input[data-j40-pledge="j40_checkbox_1_4"]'), e.showerCB = t(this.$journey).find('input[data-j40-pledge="j40_checkbox_1_7"]'), e.showerSl = t(this.$journey).find('select[data-j40-pledge="j40_select_1_7"]'), e.reducerCB = t(this.$journey).find('input[data-j40-pledge="j40_checkbox_1_8"]'), e.reducerTF = t(this.$journey).find('input[data-j40-pledge="j40_textfield_1_8"]'), e.toiletCB = t(this.$journey).find('input[data-j40-pledge="j40_checkbox_1_9"]'), e.teethCB = t(this.$journey).find('input[data-j40-pledge="j40_checkbox_1_10"]'), e.kgCO2_TF = t(this.$journey).find('input[data-j40-pledge="j40_textfield_kgco2"]'), e.kwe_TF = t(this.$journey).find('input[data-j40-pledge="j40_textfield_kwe"]'), e.gw_TF = t(this.$journey).find('input[data-j40-pledge="j40_textfield_gw"]'), e.numBulbsCB.on("change", function () {
                e.updateTotals()
            }), e.numBulbsTF.on("keyup", function () {
                e.numBulbsCB.prop("checked") && e.updateTotals()
            }), e.numBulbsTF.on("change", function () {
                e.numBulbsCB.prop("checked") && e.updateTotals()
            }), e.airConTempCB.on("change", function () {
                e.updateTotals()
            }), e.airConMaintCB.on("change", function () {
                e.updateTotals()
            }), e.dryerCB.on("change", function () {
                e.updateTotals()
            }), e.showerCB.on("change", function () {
                e.updateTotals()
            }), e.showerSl.on("change", function () {
                e.updateTotals()
            }), e.reducerCB.on("change", function () {
                e.updateTotals()
            }), e.reducerTF.on("keyup", function () {
                e.reducerCB.prop("checked") && e.updateTotals()
            }), e.toiletCB.on("change", function () {
                e.updateTotals()
            }), e.teethCB.on("change", function () {
                e.updateTotals()
            })
        }, e.prototype.updateTotals = function () {
            var t, e = this,
                i = 0,
                n = 0;
            e.numBulbsCB.prop("checked") && (t = 171.55 * parseFloat(e.numBulbsTF.val()), i += isNaN(t) ? 0 : t), e.airConTempCB.prop("checked") && (i += parseFloat(1260)), e.airConMaintCB.prop("checked") && (i += parseFloat(1050)), e.dryerCB.prop("checked") && (i += parseFloat(365)), e.showerCB.prop("checked") && (t = 3650 * parseFloat(e.showerSl.val()), n += isNaN(t) ? 0 : t), e.reducerCB.prop("checked") && (t = 7300 * parseFloat(e.reducerTF.val()), n += isNaN(t) ? 0 : t), e.toiletCB.prop("checked") && (n += parseFloat(547.5)), e.teethCB.prop("checked") && (n += parseFloat(e.teethCB.val())), console(n);
            var o = Math.round(.4307 * i),
                s = Math.round(n / 4.546),
                r = Math.round(.024221 * s);
            i = Math.round(i), n = Math.round(n), e.kgCO2_TF.val(o + r), e.kwe_TF.val(i), e.gw_TF.val(Math.round(n / 4.546))
        }, e
    }), define("../src/journeys/j41-pledge/j41-pledge", ["jquery"], function (t) {
        "use strict";
        var e = function (t) {
            return this.$journey = t, this
        };
        return e.prototype.init = function () {
            var e = this;
            e.total = 0, e.numBulbsCB = t(this.$journey).find('input[data-J41-pledge="J41_checkbox_1_1"]'), e.numBulbsTF = t(this.$journey).find('input[data-J41-pledge="J41_textfield_1_1"]'), e.airConTempCB = t(this.$journey).find('input[data-J41-pledge="J41_checkbox_1_2"]'), e.airConMaintCB = t(this.$journey).find('input[data-J41-pledge="J41_checkbox_1_3"]'), e.dryerCB = t(this.$journey).find('input[data-J41-pledge="J41_checkbox_1_4"]'), e.heatersCB = t(this.$journey).find('input[data-J41-pledge="J41_checkbox_1_5"]'), e.heatersTF = t(this.$journey).find('input[data-J41-pledge="J41_textfield_1_5"]'), e.showerCB = t(this.$journey).find('input[data-J41-pledge="J41_checkbox_1_7"]'), e.showerSl = t(this.$journey).find('select[data-J41-pledge="J41_select_1_7"]'), e.reducerCB = t(this.$journey).find('input[data-J41-pledge="J41_checkbox_1_8"]'), e.reducerTF = t(this.$journey).find('input[data-J41-pledge="J41_textfield_1_8"]'), e.toiletCB = t(this.$journey).find('input[data-J41-pledge="J41_checkbox_1_9"]'), e.teethCB = t(this.$journey).find('input[data-J41-pledge="J41_checkbox_1_10"]'), e.kgCO2_TF = t(this.$journey).find('input[data-J41-pledge="J41_textfield_kgco2"]'), e.kwe_TF = t(this.$journey).find('input[data-J41-pledge="J41_textfield_kwe"]'), e.gw_TF = t(this.$journey).find('input[data-J41-pledge="J41_textfield_gw"]'), e.numBulbsCB.on("change", function () {
                e.updateTotals()
            }), e.numBulbsTF.on("keyup", function () {
                e.numBulbsCB.prop("checked") && e.updateTotals()
            }), e.numBulbsTF.on("change", function () {
                e.numBulbsCB.prop("checked") && e.updateTotals()
            }), e.airConTempCB.on("change", function () {
                e.updateTotals()
            }), e.airConMaintCB.on("change", function () {
                e.updateTotals()
            }), e.dryerCB.on("change", function () {
                e.updateTotals()
            }), e.heatersCB.on("change", function () {
                e.updateTotals()
            }), e.heatersTF.on("change", function () {
                e.heatersCB.prop("checked") && e.updateTotals()
            }), e.showerCB.on("change", function () {
                e.updateTotals()
            }), e.showerSl.on("change", function () {
                e.updateTotals()
            }), e.reducerCB.on("change", function () {
                e.updateTotals()
            }), e.reducerTF.on("keyup", function () {
                e.reducerCB.prop("checked") && e.updateTotals()
            }), e.toiletCB.on("change", function () {
                e.updateTotals()
            }), e.teethCB.on("change", function () {
                e.updateTotals()
            })
        }, e.prototype.updateTotals = function () {
            var t, e = this,
                i = 0,
                n = 0;
            e.numBulbsCB.prop("checked") && (t = 171.55 * parseFloat(e.numBulbsTF.val()), i += isNaN(t) ? 0 : t), e.airConTempCB.prop("checked") && (i += parseFloat(1260)), e.airConMaintCB.prop("checked") && (i += parseFloat(1050)), e.dryerCB.prop("checked") && (i += parseFloat(365)), e.heatersCB.prop("checked") && (t = 273.8 * parseFloat(e.heatersTF.val()), i += isNaN(t) ? 0 : t), e.showerCB.prop("checked") && (t = 3650 * parseFloat(e.showerSl.val()), n += isNaN(t) ? 0 : t), e.reducerCB.prop("checked") && (t = 7300 * parseFloat(e.reducerTF.val()), n += isNaN(t) ? 0 : t), e.toiletCB.prop("checked") && (n += parseFloat(547.5)), e.teethCB.prop("checked") && (n += parseFloat(e.teethCB.val()));
            var o = Math.round(.4307 * i),
                s = Math.round(n / 4.546),
                r = Math.round(.024221 * s);
            i = Math.round(i), n = Math.round(n), e.kgCO2_TF.val(o + r), e.kwe_TF.val(i), e.gw_TF.val(Math.round(n / 4.546))
        }, e
    }), define("../src/journeys/j68a-residential-consumer-awards/j68a-residential-consumer-awards", ["jquery"], function (t) {
        "use strict";
        var e = function (t) {
            return this.$journey = t, this
        };
        return e.prototype.init = function () {
            var e = "rtl" == t("html").attr("dir") ? "ar" : "en",
                i = document.createElement("script");
            i.type = "text/javascript", i.src = "https://www.google.com/recaptcha/api.js?hl=" + e, document.body.appendChild(i), document.forms["j68a-1-form"].onsubmit = function (e) {
                e.preventDefault(), grecaptcha.getResponse() ? (t('.g-recaptcha div[style="width: 304px; height: 78px;"]').removeClass("error"), document.forms["j68a-1-form"].submit()) : t('.g-recaptcha div[style="width: 304px; height: 78px;"]').addClass("error")
            }
        }, e
    }), define("../src/journeys/j68b-facility-management-awards/j68b-facility-management-awards", ["jquery"], function (t) {
        "use strict";
        var e = function (t) {
            return this.$journey = t, this
        };
        return e.prototype.init = function () {
            var e = "rtl" == t("html").attr("dir") ? "ar" : "en",
                i = document.createElement("script");
            i.type = "text/javascript", i.src = "https://www.google.com/recaptcha/api.js?hl=" + e, document.body.appendChild(i), document.forms["j68b-3-form"].onsubmit = function (e) {
                e.preventDefault(), grecaptcha.getResponse() ? (t('.g-recaptcha div[style="width: 304px; height: 78px;"]').removeClass("error"), document.forms["j68b-3-form"].submit()) : t('.g-recaptcha div[style="width: 304px; height: 78px;"]').addClass("error")
            }
        }, e
    }), define("../src/journeys/j68c-conservation-team-awards/j68c-conservation-team-awards", ["jquery"], function (t) {
        "use strict";
        var e = function (t) {
            return this.$journey = t, this
        };
        return e.prototype.init = function () {
            var e = "rtl" == t("html").attr("dir") ? "ar" : "en",
                i = document.createElement("script");
            i.type = "text/javascript", i.src = "https://www.google.com/recaptcha/api.js?hl=" + e, document.body.appendChild(i), document.forms["j68c-1-form"].onsubmit = function (e) {
                e.preventDefault(), grecaptcha.getResponse() ? (t('.g-recaptcha div[style="width: 304px; height: 78px;"]').removeClass("error"), document.forms["j68c-1-form"].submit()) : t('.g-recaptcha div[style="width: 304px; height: 78px;"]').addClass("error")
            }
        }, e
    }),
    function (t) {
        "use strict";
        "function" == typeof define && define.amd ? define("slick", ["jquery"], t) : "undefined" != typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
    }(function (t) {
        "use strict";
        var e = window.Slick || {};
        e = function () {
            function e(e, n) {
                var o, s = this;
                s.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: t(e),
                    appendDots: t(e),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                    nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    centerMode: !1,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function (t, e) {
                        return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (e + 1) + "</button>"
                    },
                    dots: !1,
                    dotsClass: "slick-dots",
                    draggable: !0,
                    easing: "linear",
                    edgeFriction: .35,
                    fade: !1,
                    focusOnSelect: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    mobileFirst: !1,
                    pauseOnHover: !0,
                    pauseOnDotsHover: !1,
                    respondTo: "window",
                    responsive: null,
                    rows: 1,
                    rtl: !1,
                    slide: "",
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: !0,
                    swipeToSlide: !1,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    variableWidth: !1,
                    vertical: !1,
                    verticalSwiping: !1,
                    waitForAnimate: !0,
                    zIndex: 1e3
                }, s.initials = {
                    animating: !1,
                    dragging: !1,
                    autoPlayTimer: null,
                    currentDirection: 0,
                    currentLeft: null,
                    currentSlide: 0,
                    direction: 1,
                    $dots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    $nextArrow: null,
                    $prevArrow: null,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: !1,
                    unslicked: !1
                }, t.extend(s, s.initials), s.activeBreakpoint = null, s.animType = null, s.animProp = null, s.breakpoints = [], s.breakpointSettings = [], s.cssTransitions = !1, s.hidden = "hidden", s.paused = !1, s.positionProp = null, s.respondTo = null, s.rowCount = 1, s.shouldClick = !0, s.$slider = t(e), s.$slidesCache = null, s.transformType = null, s.transitionType = null, s.visibilityChange = "visibilitychange", s.windowWidth = 0, s.windowTimer = null, o = t(e).data("slick") || {}, s.options = t.extend({}, s.defaults, o, n), s.currentSlide = s.options.initialSlide,
                    s.originalSettings = s.options, "undefined" != typeof document.mozHidden ? (s.hidden = "mozHidden", s.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (s.hidden = "webkitHidden", s.visibilityChange = "webkitvisibilitychange"), s.autoPlay = t.proxy(s.autoPlay, s), s.autoPlayClear = t.proxy(s.autoPlayClear, s), s.changeSlide = t.proxy(s.changeSlide, s), s.clickHandler = t.proxy(s.clickHandler, s), s.selectHandler = t.proxy(s.selectHandler, s), s.setPosition = t.proxy(s.setPosition, s), s.swipeHandler = t.proxy(s.swipeHandler, s), s.dragHandler = t.proxy(s.dragHandler, s), s.keyHandler = t.proxy(s.keyHandler, s), s.autoPlayIterator = t.proxy(s.autoPlayIterator, s), s.instanceUid = i++ , s.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, s.registerBreakpoints(), s.init(!0), s.checkResponsive(!0)
            }
            var i = 0;
            return e
        }(), e.prototype.addSlide = e.prototype.slickAdd = function (e, i, n) {
            var o = this;
            if ("boolean" == typeof i) n = i, i = null;
            else if (0 > i || i >= o.slideCount) return !1;
            o.unload(), "number" == typeof i ? 0 === i && 0 === o.$slides.length ? t(e).appendTo(o.$slideTrack) : n ? t(e).insertBefore(o.$slides.eq(i)) : t(e).insertAfter(o.$slides.eq(i)) : n === !0 ? t(e).prependTo(o.$slideTrack) : t(e).appendTo(o.$slideTrack), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slides.each(function (e, i) {
                t(i).attr("data-slick-index", e)
            }), o.$slidesCache = o.$slides, o.reinit()
        }, e.prototype.animateHeight = function () {
            var t = this;
            if (1 === t.options.slidesToShow && t.options.adaptiveHeight === !0 && t.options.vertical === !1) {
                var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
                t.$list.animate({
                    height: e
                }, t.options.speed)
            }
        }, e.prototype.animateSlide = function (e, i) {
            var n = {},
                o = this;
            o.animateHeight(), o.options.rtl === !0 && o.options.vertical === !1 && (e = -e), o.transformsEnabled === !1 ? o.options.vertical === !1 ? o.$slideTrack.animate({
                left: e
            }, o.options.speed, o.options.easing, i) : o.$slideTrack.animate({
                top: e
            }, o.options.speed, o.options.easing, i) : o.cssTransitions === !1 ? (o.options.rtl === !0 && (o.currentLeft = -o.currentLeft), t({
                animStart: o.currentLeft
            }).animate({
                animStart: e
            }, {
                    duration: o.options.speed,
                    easing: o.options.easing,
                    step: function (t) {
                        t = Math.ceil(t), o.options.vertical === !1 ? (n[o.animType] = "translate(" + t + "px, 0px)", o.$slideTrack.css(n)) : (n[o.animType] = "translate(0px," + t + "px)", o.$slideTrack.css(n))
                    },
                    complete: function () {
                        i && i.call()
                    }
                })) : (o.applyTransition(), e = Math.ceil(e), o.options.vertical === !1 ? n[o.animType] = "translate3d(" + e + "px, 0px, 0px)" : n[o.animType] = "translate3d(0px," + e + "px, 0px)", o.$slideTrack.css(n), i && setTimeout(function () {
                    o.disableTransition(), i.call()
                }, o.options.speed))
        }, e.prototype.asNavFor = function (e) {
            var i = this,
                n = i.options.asNavFor;
            n && null !== n && (n = t(n).not(i.$slider)), null !== n && "object" == typeof n && n.each(function () {
                var i = t(this).slick("getSlick");
                i.unslicked || i.slideHandler(e, !0)
            })
        }, e.prototype.applyTransition = function (t) {
            var e = this,
                i = {};
            e.options.fade === !1 ? i[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : i[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, e.options.fade === !1 ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
        }, e.prototype.autoPlay = function () {
            var t = this;
            t.autoPlayTimer && clearInterval(t.autoPlayTimer), t.slideCount > t.options.slidesToShow && t.paused !== !0 && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed))
        }, e.prototype.autoPlayClear = function () {
            var t = this;
            t.autoPlayTimer && clearInterval(t.autoPlayTimer)
        }, e.prototype.autoPlayIterator = function () {
            var t = this;
            t.options.infinite === !1 ? 1 === t.direction ? (t.currentSlide + 1 === t.slideCount - 1 && (t.direction = 0), t.slideHandler(t.currentSlide + t.options.slidesToScroll)) : (t.currentSlide - 1 === 0 && (t.direction = 1), t.slideHandler(t.currentSlide - t.options.slidesToScroll)) : t.slideHandler(t.currentSlide + t.options.slidesToScroll)
        }, e.prototype.buildArrows = function () {
            var e = this;
            e.options.arrows === !0 && (e.$prevArrow = t(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = t(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), e.options.infinite !== !0 && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
                "aria-disabled": "true",
                tabindex: "-1"
            }))
        }, e.prototype.buildDots = function () {
            var e, i, n = this;
            if (n.options.dots === !0 && n.slideCount > n.options.slidesToShow) {
                for (i = '<ul class="' + n.options.dotsClass + '">', e = 0; e <= n.getDotCount(); e += 1) i += "<li>" + n.options.customPaging.call(this, n, e) + "</li>";
                i += "</ul>", n.$dots = t(i).appendTo(n.options.appendDots), n.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
            }
        }, e.prototype.buildOut = function () {
            var e = this;
            e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function (e, i) {
                t(i).attr("data-slick-index", e).data("originalStyling", t(i).attr("style") || "")
            }), e.$slidesCache = e.$slides, e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? t('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), (e.options.centerMode === !0 || e.options.swipeToSlide === !0) && (e.options.slidesToScroll = 1), t("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.options.draggable === !0 && e.$list.addClass("draggable")
        }, e.prototype.buildRows = function () {
            var t, e, i, n, o, s, r, a = this;
            if (n = document.createDocumentFragment(), s = a.$slider.children(), a.options.rows > 1) {
                for (r = a.options.slidesPerRow * a.options.rows, o = Math.ceil(s.length / r), t = 0; o > t; t++) {
                    var l = document.createElement("div");
                    for (e = 0; e < a.options.rows; e++) {
                        var c = document.createElement("div");
                        for (i = 0; i < a.options.slidesPerRow; i++) {
                            var d = t * r + (e * a.options.slidesPerRow + i);
                            s.get(d) && c.appendChild(s.get(d))
                        }
                        l.appendChild(c)
                    }
                    n.appendChild(l)
                }
                a.$slider.html(n), a.$slider.children().children().children().css({
                    width: 100 / a.options.slidesPerRow + "%",
                    display: "inline-block"
                })
            }
        }, e.prototype.checkResponsive = function (e, i) {
            var n, o, s, r = this,
                a = !1,
                l = r.$slider.width(),
                c = window.innerWidth || t(window).width();
            if ("window" === r.respondTo ? s = c : "slider" === r.respondTo ? s = l : "min" === r.respondTo && (s = Math.min(c, l)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
                o = null;
                for (n in r.breakpoints) r.breakpoints.hasOwnProperty(n) && (r.originalSettings.mobileFirst === !1 ? s < r.breakpoints[n] && (o = r.breakpoints[n]) : s > r.breakpoints[n] && (o = r.breakpoints[n]));
                null !== o ? null !== r.activeBreakpoint ? (o !== r.activeBreakpoint || i) && (r.activeBreakpoint = o, "unslick" === r.breakpointSettings[o] ? r.unslick(o) : (r.options = t.extend({}, r.originalSettings, r.breakpointSettings[o]), e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e)), a = o) : (r.activeBreakpoint = o, "unslick" === r.breakpointSettings[o] ? r.unslick(o) : (r.options = t.extend({}, r.originalSettings, r.breakpointSettings[o]), e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e)), a = o) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e), a = o), e || a === !1 || r.$slider.trigger("breakpoint", [r, a])
            }
        }, e.prototype.changeSlide = function (e, i) {
            var n, o, s, r = this,
                a = t(e.target);
            switch (a.is("a") && e.preventDefault(), a.is("li") || (a = a.closest("li")), s = r.slideCount % r.options.slidesToScroll !== 0, n = s ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
                case "previous":
                    o = 0 === n ? r.options.slidesToScroll : r.options.slidesToShow - n, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - o, !1, i);
                    break;
                case "next":
                    o = 0 === n ? r.options.slidesToScroll : n, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + o, !1, i);
                    break;
                case "index":
                    var l = 0 === e.data.index ? 0 : e.data.index || a.index() * r.options.slidesToScroll;
                    r.slideHandler(r.checkNavigable(l), !1, i), a.children().trigger("focus");
                    break;
                default:
                    return
            }
        }, e.prototype.checkNavigable = function (t) {
            var e, i, n = this;
            if (e = n.getNavigableIndexes(), i = 0, t > e[e.length - 1]) t = e[e.length - 1];
            else
                for (var o in e) {
                    if (t < e[o]) {
                        t = i;
                        break
                    }
                    i = e[o]
                }
            return t
        }, e.prototype.cleanUpEvents = function () {
            var e = this;
            e.options.dots && null !== e.$dots && (t("li", e.$dots).off("click.slick", e.changeSlide), e.options.pauseOnDotsHover === !0 && e.options.autoplay === !0 && t("li", e.$dots).off("mouseenter.slick", t.proxy(e.setPaused, e, !0)).off("mouseleave.slick", t.proxy(e.setPaused, e, !1))), e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide)), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), t(document).off(e.visibilityChange, e.visibility), e.$list.off("mouseenter.slick", t.proxy(e.setPaused, e, !0)), e.$list.off("mouseleave.slick", t.proxy(e.setPaused, e, !1)), e.options.accessibility === !0 && e.$list.off("keydown.slick", e.keyHandler), e.options.focusOnSelect === !0 && t(e.$slideTrack).children().off("click.slick", e.selectHandler), t(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), t(window).off("resize.slick.slick-" + e.instanceUid, e.resize), t("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), t(window).off("load.slick.slick-" + e.instanceUid, e.setPosition), t(document).off("ready.slick.slick-" + e.instanceUid, e.setPosition)
        }, e.prototype.cleanUpRows = function () {
            var t, e = this;
            e.options.rows > 1 && (t = e.$slides.children().children(), t.removeAttr("style"), e.$slider.html(t))
        }, e.prototype.clickHandler = function (t) {
            var e = this;
            e.shouldClick === !1 && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault())
        }, e.prototype.destroy = function (e) {
            var i = this;
            i.autoPlayClear(), i.touchObject = {}, i.cleanUpEvents(), t(".slick-cloned", i.$slider).detach(), i.$dots && i.$dots.remove(), i.options.arrows === !0 && (i.$prevArrow && i.$prevArrow.length && (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()), i.$nextArrow && i.$nextArrow.length && (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove())), i.$slides && (i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
                t(this).attr("style", t(this).data("originalStyling"))
            }), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.detach(), i.$list.detach(), i.$slider.append(i.$slides)), i.cleanUpRows(), i.$slider.removeClass("slick-slider"), i.$slider.removeClass("slick-initialized"), i.unslicked = !0, e || i.$slider.trigger("destroy", [i])
        }, e.prototype.disableTransition = function (t) {
            var e = this,
                i = {};
            i[e.transitionType] = "", e.options.fade === !1 ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
        }, e.prototype.fadeSlide = function (t, e) {
            var i = this;
            i.cssTransitions === !1 ? (i.$slides.eq(t).css({
                zIndex: i.options.zIndex
            }), i.$slides.eq(t).animate({
                opacity: 1
            }, i.options.speed, i.options.easing, e)) : (i.applyTransition(t), i.$slides.eq(t).css({
                opacity: 1,
                zIndex: i.options.zIndex
            }), e && setTimeout(function () {
                i.disableTransition(t), e.call()
            }, i.options.speed))
        }, e.prototype.fadeSlideOut = function (t) {
            var e = this;
            e.cssTransitions === !1 ? e.$slides.eq(t).animate({
                opacity: 0,
                zIndex: e.options.zIndex - 2
            }, e.options.speed, e.options.easing) : (e.applyTransition(t), e.$slides.eq(t).css({
                opacity: 0,
                zIndex: e.options.zIndex - 2
            }))
        }, e.prototype.filterSlides = e.prototype.slickFilter = function (t) {
            var e = this;
            null !== t && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(t).appendTo(e.$slideTrack), e.reinit())
        }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () {
            var t = this;
            return t.currentSlide
        }, e.prototype.getDotCount = function () {
            var t = this,
                e = 0,
                i = 0,
                n = 0;
            if (t.options.infinite === !0)
                for (; e < t.slideCount;)++n, e = i + t.options.slidesToShow, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
            else if (t.options.centerMode === !0) n = t.slideCount;
            else
                for (; e < t.slideCount;)++n, e = i + t.options.slidesToShow, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
            return n - 1
        }, e.prototype.getLeft = function (t) {
            var e, i, n, o = this,
                s = 0;
            return o.slideOffset = 0, i = o.$slides.first().outerHeight(!0), o.options.infinite === !0 ? (o.slideCount > o.options.slidesToShow && (o.slideOffset = o.slideWidth * o.options.slidesToShow * -1, s = i * o.options.slidesToShow * -1), o.slideCount % o.options.slidesToScroll !== 0 && t + o.options.slidesToScroll > o.slideCount && o.slideCount > o.options.slidesToShow && (t > o.slideCount ? (o.slideOffset = (o.options.slidesToShow - (t - o.slideCount)) * o.slideWidth * -1, s = (o.options.slidesToShow - (t - o.slideCount)) * i * -1) : (o.slideOffset = o.slideCount % o.options.slidesToScroll * o.slideWidth * -1, s = o.slideCount % o.options.slidesToScroll * i * -1))) : t + o.options.slidesToShow > o.slideCount && (o.slideOffset = (t + o.options.slidesToShow - o.slideCount) * o.slideWidth, s = (t + o.options.slidesToShow - o.slideCount) * i), o.slideCount <= o.options.slidesToShow && (o.slideOffset = 0, s = 0), o.options.centerMode === !0 && o.options.infinite === !0 ? o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2) - o.slideWidth : o.options.centerMode === !0 && (o.slideOffset = 0, o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2)), e = o.options.vertical === !1 ? t * o.slideWidth * -1 + o.slideOffset : t * i * -1 + s, o.options.variableWidth === !0 && (n = o.slideCount <= o.options.slidesToShow || o.options.infinite === !1 ? o.$slideTrack.children(".slick-slide").eq(t) : o.$slideTrack.children(".slick-slide").eq(t + o.options.slidesToShow), e = n[0] ? -1 * n[0].offsetLeft : 0, o.options.centerMode === !0 && (n = o.options.infinite === !1 ? o.$slideTrack.children(".slick-slide").eq(t) : o.$slideTrack.children(".slick-slide").eq(t + o.options.slidesToShow + 1), e = n[0] ? -1 * n[0].offsetLeft : 0, e += (o.$list.width() - n.outerWidth()) / 2)), e
        }, e.prototype.getOption = e.prototype.slickGetOption = function (t) {
            var e = this;
            return e.options[t]
        }, e.prototype.getNavigableIndexes = function () {
            var t, e = this,
                i = 0,
                n = 0,
                o = [];
            for (e.options.infinite === !1 ? t = e.slideCount : (i = -1 * e.options.slidesToScroll, n = -1 * e.options.slidesToScroll, t = 2 * e.slideCount); t > i;) o.push(i), i = n + e.options.slidesToScroll, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            return o
        }, e.prototype.getSlick = function () {
            return this
        }, e.prototype.getSlideCount = function () {
            var e, i, n, o = this;
            return n = o.options.centerMode === !0 ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, o.options.swipeToSlide === !0 ? (o.$slideTrack.find(".slick-slide").each(function (e, s) {
                return s.offsetLeft - n + t(s).outerWidth() / 2 > -1 * o.swipeLeft ? (i = s, !1) : void 0
            }), e = Math.abs(t(i).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
        }, e.prototype.goTo = e.prototype.slickGoTo = function (t, e) {
            var i = this;
            i.changeSlide({
                data: {
                    message: "index",
                    index: parseInt(t)
                }
            }, e)
        }, e.prototype.init = function (e) {
            var i = this;
            t(i.$slider).hasClass("slick-initialized") || (t(i.$slider).addClass("slick-initialized"), i.buildRows(), i.buildOut(), i.setProps(), i.startLoad(), i.loadSlider(), i.initializeEvents(), i.updateArrows(), i.updateDots()), e && i.$slider.trigger("init", [i]), i.options.accessibility === !0 && i.initADA()
        }, e.prototype.initArrowEvents = function () {
            var t = this;
            t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.on("click.slick", {
                message: "previous"
            }, t.changeSlide), t.$nextArrow.on("click.slick", {
                message: "next"
            }, t.changeSlide))
        }, e.prototype.initDotEvents = function () {
            var e = this;
            e.options.dots === !0 && e.slideCount > e.options.slidesToShow && t("li", e.$dots).on("click.slick", {
                message: "index"
            }, e.changeSlide), e.options.dots === !0 && e.options.pauseOnDotsHover === !0 && e.options.autoplay === !0 && t("li", e.$dots).on("mouseenter.slick", t.proxy(e.setPaused, e, !0)).on("mouseleave.slick", t.proxy(e.setPaused, e, !1))
        }, e.prototype.initializeEvents = function () {
            var e = this;
            e.initArrowEvents(), e.initDotEvents(), e.$list.on("touchstart.slick mousedown.slick", {
                action: "start"
            }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
                action: "move"
            }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
                action: "end"
            }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
                action: "end"
            }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), t(document).on(e.visibilityChange, t.proxy(e.visibility, e)), e.$list.on("mouseenter.slick", t.proxy(e.setPaused, e, !0)), e.$list.on("mouseleave.slick", t.proxy(e.setPaused, e, !1)), e.options.accessibility === !0 && e.$list.on("keydown.slick", e.keyHandler), e.options.focusOnSelect === !0 && t(e.$slideTrack).children().on("click.slick", e.selectHandler), t(window).on("orientationchange.slick.slick-" + e.instanceUid, t.proxy(e.orientationChange, e)), t(window).on("resize.slick.slick-" + e.instanceUid, t.proxy(e.resize, e)), t("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), t(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), t(document).on("ready.slick.slick-" + e.instanceUid, e.setPosition)
        }, e.prototype.initUI = function () {
            var t = this;
            t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.show(), t.options.autoplay === !0 && t.autoPlay()
        }, e.prototype.keyHandler = function (t) {
            var e = this;
            t.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === t.keyCode && e.options.accessibility === !0 ? e.changeSlide({
                data: {
                    message: "previous"
                }
            }) : 39 === t.keyCode && e.options.accessibility === !0 && e.changeSlide({
                data: {
                    message: "next"
                }
            }))
        }, e.prototype.lazyLoad = function () {
            function e(e) {
                t("img[data-lazy]", e).each(function () {
                    var e = t(this),
                        i = t(this).attr("data-lazy"),
                        n = document.createElement("img");
                    n.onload = function () {
                        e.animate({
                            opacity: 0
                        }, 100, function () {
                            e.attr("src", i).animate({
                                opacity: 1
                            }, 200, function () {
                                e.removeAttr("data-lazy").removeClass("slick-loading")
                            })
                        })
                    }, n.src = i
                })
            }
            var i, n, o, s, r = this;
            r.options.centerMode === !0 ? r.options.infinite === !0 ? (o = r.currentSlide + (r.options.slidesToShow / 2 + 1), s = o + r.options.slidesToShow + 2) : (o = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)), s = 2 + (r.options.slidesToShow / 2 + 1) + r.currentSlide) : (o = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide, s = o + r.options.slidesToShow, r.options.fade === !0 && (o > 0 && o-- , s <= r.slideCount && s++)), i = r.$slider.find(".slick-slide").slice(o, s), e(i), r.slideCount <= r.options.slidesToShow ? (n = r.$slider.find(".slick-slide"), e(n)) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? (n = r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow), e(n)) : 0 === r.currentSlide && (n = r.$slider.find(".slick-cloned").slice(-1 * r.options.slidesToShow), e(n))
        }, e.prototype.loadSlider = function () {
            var t = this;
            t.setPosition(), t.$slideTrack.css({
                opacity: 1
            }), t.$slider.removeClass("slick-loading"), t.initUI(), "progressive" === t.options.lazyLoad && t.progressiveLazyLoad()
        }, e.prototype.next = e.prototype.slickNext = function () {
            var t = this;
            t.changeSlide({
                data: {
                    message: "next"
                }
            })
        }, e.prototype.orientationChange = function () {
            var t = this;
            t.checkResponsive(), t.setPosition()
        }, e.prototype.pause = e.prototype.slickPause = function () {
            var t = this;
            t.autoPlayClear(), t.paused = !0
        }, e.prototype.play = e.prototype.slickPlay = function () {
            var t = this;
            t.paused = !1, t.autoPlay()
        }, e.prototype.postSlide = function (t) {
            var e = this;
            e.$slider.trigger("afterChange", [e, t]), e.animating = !1, e.setPosition(), e.swipeLeft = null, e.options.autoplay === !0 && e.paused === !1 && e.autoPlay(), e.options.accessibility === !0 && e.initADA()
        }, e.prototype.prev = e.prototype.slickPrev = function () {
            var t = this;
            t.changeSlide({
                data: {
                    message: "previous"
                }
            })
        }, e.prototype.preventDefault = function (t) {
            t.preventDefault()
        }, e.prototype.progressiveLazyLoad = function () {
            var e, i, n = this;
            e = t("img[data-lazy]", n.$slider).length, e > 0 && (i = t("img[data-lazy]", n.$slider).first(), i.attr("src", i.attr("data-lazy")).removeClass("slick-loading").load(function () {
                i.removeAttr("data-lazy"), n.progressiveLazyLoad(), n.options.adaptiveHeight === !0 && n.setPosition()
            }).error(function () {
                i.removeAttr("data-lazy"), n.progressiveLazyLoad()
            }))
        }, e.prototype.refresh = function (e) {
            var i = this,
                n = i.currentSlide;
            i.destroy(!0), t.extend(i, i.initials, {
                currentSlide: n
            }), i.init(), e || i.changeSlide({
                data: {
                    message: "index",
                    index: n
                }
            }, !1)
        }, e.prototype.registerBreakpoints = function () {
            var e, i, n, o = this,
                s = o.options.responsive || null;
            if ("array" === t.type(s) && s.length) {
                o.respondTo = o.options.respondTo || "window";
                for (e in s)
                    if (n = o.breakpoints.length - 1, i = s[e].breakpoint, s.hasOwnProperty(e)) {
                        for (; n >= 0;) o.breakpoints[n] && o.breakpoints[n] === i && o.breakpoints.splice(n, 1), n--;
                        o.breakpoints.push(i), o.breakpointSettings[i] = s[e].settings
                    }
                o.breakpoints.sort(function (t, e) {
                    return o.options.mobileFirst ? t - e : e - t
                })
            }
        }, e.prototype.reinit = function () {
            var e = this;
            e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.checkResponsive(!1, !0), e.options.focusOnSelect === !0 && t(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses(0), e.setPosition(), e.$slider.trigger("reInit", [e]), e.options.autoplay === !0 && e.focusHandler()
        }, e.prototype.resize = function () {
            var e = this;
            t(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function () {
                e.windowWidth = t(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
            }, 50))
        }, e.prototype.removeSlide = e.prototype.slickRemove = function (t, e, i) {
            var n = this;
            return "boolean" == typeof t ? (e = t, t = e === !0 ? 0 : n.slideCount - 1) : t = e === !0 ? --t : t, n.slideCount < 1 || 0 > t || t > n.slideCount - 1 ? !1 : (n.unload(), i === !0 ? n.$slideTrack.children().remove() : n.$slideTrack.children(this.options.slide).eq(t).remove(), n.$slides = n.$slideTrack.children(this.options.slide), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.append(n.$slides), n.$slidesCache = n.$slides, void n.reinit())
        }, e.prototype.setCSS = function (t) {
            var e, i, n = this,
                o = {};
            n.options.rtl === !0 && (t = -t), e = "left" == n.positionProp ? Math.ceil(t) + "px" : "0px", i = "top" == n.positionProp ? Math.ceil(t) + "px" : "0px", o[n.positionProp] = t, n.transformsEnabled === !1 ? n.$slideTrack.css(o) : (o = {}, n.cssTransitions === !1 ? (o[n.animType] = "translate(" + e + ", " + i + ")", n.$slideTrack.css(o)) : (o[n.animType] = "translate3d(" + e + ", " + i + ", 0px)", n.$slideTrack.css(o)))
        }, e.prototype.setDimensions = function () {
            var t = this;
            t.options.vertical === !1 ? t.options.centerMode === !0 && t.$list.css({
                padding: "0px " + t.options.centerPadding
            }) : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow), t.options.centerMode === !0 && t.$list.css({
                padding: t.options.centerPadding + " 0px"
            })), t.listWidth = t.$list.width(), t.listHeight = t.$list.height(), t.options.vertical === !1 && t.options.variableWidth === !1 ? (t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow), t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length))) : t.options.variableWidth === !0 ? t.$slideTrack.width(5e3 * t.slideCount) : (t.slideWidth = Math.ceil(t.listWidth), t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
            var e = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
            t.options.variableWidth === !1 && t.$slideTrack.children(".slick-slide").width(t.slideWidth - e)
        }, e.prototype.setFade = function () {
            var e, i = this;
            i.$slides.each(function (n, o) {
                e = i.slideWidth * n * -1, i.options.rtl === !0 ? t(o).css({
                    position: "relative",
                    right: e,
                    top: 0,
                    zIndex: i.options.zIndex - 2,
                    opacity: 0
                }) : t(o).css({
                    position: "relative",
                    left: e,
                    top: 0,
                    zIndex: i.options.zIndex - 2,
                    opacity: 0
                })
            }), i.$slides.eq(i.currentSlide).css({
                zIndex: i.options.zIndex - 1,
                opacity: 1
            })
        }, e.prototype.setHeight = function () {
            var t = this;
            if (1 === t.options.slidesToShow && t.options.adaptiveHeight === !0 && t.options.vertical === !1) {
                var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
                t.$list.css("height", e)
            }
        }, e.prototype.setOption = e.prototype.slickSetOption = function (e, i, n) {
            var o, s, r = this;
            if ("responsive" === e && "array" === t.type(i))
                for (s in i)
                    if ("array" !== t.type(r.options.responsive)) r.options.responsive = [i[s]];
                    else {
                        for (o = r.options.responsive.length - 1; o >= 0;) r.options.responsive[o].breakpoint === i[s].breakpoint && r.options.responsive.splice(o, 1), o--;
                        r.options.responsive.push(i[s])
                    } else r.options[e] = i;
            n === !0 && (r.unload(), r.reinit())
        }, e.prototype.setPosition = function () {
            var t = this;
            t.setDimensions(), t.setHeight(), t.options.fade === !1 ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), t.$slider.trigger("setPosition", [t])
        }, e.prototype.setProps = function () {
            var t = this,
                e = document.body.style;
            t.positionProp = t.options.vertical === !0 ? "top" : "left", "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"), (void 0 !== e.WebkitTransition || void 0 !== e.MozTransition || void 0 !== e.msTransition) && t.options.useCSS === !0 && (t.cssTransitions = !0), t.options.fade && ("number" == typeof t.options.zIndex ? t.options.zIndex < 3 && (t.options.zIndex = 3) : t.options.zIndex = t.defaults.zIndex), void 0 !== e.OTransform && (t.animType = "OTransform", t.transformType = "-o-transform", t.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.MozTransform && (t.animType = "MozTransform", t.transformType = "-moz-transform", t.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (t.animType = !1)), void 0 !== e.webkitTransform && (t.animType = "webkitTransform", t.transformType = "-webkit-transform", t.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.msTransform && (t.animType = "msTransform", t.transformType = "-ms-transform", t.transitionType = "msTransition", void 0 === e.msTransform && (t.animType = !1)), void 0 !== e.transform && t.animType !== !1 && (t.animType = "transform", t.transformType = "transform", t.transitionType = "transition"), t.transformsEnabled = null !== t.animType && t.animType !== !1
        }, e.prototype.setSlideClasses = function (t) {
            var e, i, n, o, s = this;
            i = s.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), s.$slides.eq(t).addClass("slick-current"), s.options.centerMode === !0 ? (e = Math.floor(s.options.slidesToShow / 2), s.options.infinite === !0 && (t >= e && t <= s.slideCount - 1 - e ? s.$slides.slice(t - e, t + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (n = s.options.slidesToShow + t, i.slice(n - e + 1, n + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === t ? i.eq(i.length - 1 - s.options.slidesToShow).addClass("slick-center") : t === s.slideCount - 1 && i.eq(s.options.slidesToShow).addClass("slick-center")), s.$slides.eq(t).addClass("slick-center")) : t >= 0 && t <= s.slideCount - s.options.slidesToShow ? s.$slides.slice(t, t + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= s.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (o = s.slideCount % s.options.slidesToShow, n = s.options.infinite === !0 ? s.options.slidesToShow + t : t, s.options.slidesToShow == s.options.slidesToScroll && s.slideCount - t < s.options.slidesToShow ? i.slice(n - (s.options.slidesToShow - o), n + o).addClass("slick-active").attr("aria-hidden", "false") : i.slice(n, n + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === s.options.lazyLoad && s.lazyLoad()
        }, e.prototype.setupInfinite = function () {
            var e, i, n, o = this;
            if (o.options.fade === !0 && (o.options.centerMode = !1), o.options.infinite === !0 && o.options.fade === !1 && (i = null, o.slideCount > o.options.slidesToShow)) {
                for (n = o.options.centerMode === !0 ? o.options.slidesToShow + 1 : o.options.slidesToShow, e = o.slideCount; e > o.slideCount - n; e -= 1) i = e - 1, t(o.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
                for (e = 0; n > e; e += 1) i = e, t(o.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
                o.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
                    t(this).attr("id", "")
                })
            }
        }, e.prototype.setPaused = function (t) {
            var e = this;
            e.options.autoplay === !0 && e.options.pauseOnHover === !0 && (e.paused = t, t ? e.autoPlayClear() : e.autoPlay())
        }, e.prototype.selectHandler = function (e) {
            var i = this,
                n = t(e.target).is(".slick-slide") ? t(e.target) : t(e.target).parents(".slick-slide"),
                o = parseInt(n.attr("data-slick-index"));
            return o || (o = 0), i.slideCount <= i.options.slidesToShow ? (i.setSlideClasses(o), void i.asNavFor(o)) : void i.slideHandler(o)
        }, e.prototype.slideHandler = function (t, e, i) {
            var n, o, s, r, a = null,
                l = this;
            return e = e || !1, l.animating === !0 && l.options.waitForAnimate === !0 || l.options.fade === !0 && l.currentSlide === t || l.slideCount <= l.options.slidesToShow ? void 0 : (e === !1 && l.asNavFor(t), n = t, a = l.getLeft(n), r = l.getLeft(l.currentSlide), l.currentLeft = null === l.swipeLeft ? r : l.swipeLeft, l.options.infinite === !1 && l.options.centerMode === !1 && (0 > t || t > l.getDotCount() * l.options.slidesToScroll) ? void (l.options.fade === !1 && (n = l.currentSlide, i !== !0 ? l.animateSlide(r, function () {
                l.postSlide(n)
            }) : l.postSlide(n))) : l.options.infinite === !1 && l.options.centerMode === !0 && (0 > t || t > l.slideCount - l.options.slidesToScroll) ? void (l.options.fade === !1 && (n = l.currentSlide, i !== !0 ? l.animateSlide(r, function () {
                l.postSlide(n)
            }) : l.postSlide(n))) : (l.options.autoplay === !0 && clearInterval(l.autoPlayTimer), o = 0 > n ? l.slideCount % l.options.slidesToScroll !== 0 ? l.slideCount - l.slideCount % l.options.slidesToScroll : l.slideCount + n : n >= l.slideCount ? l.slideCount % l.options.slidesToScroll !== 0 ? 0 : n - l.slideCount : n, l.animating = !0, l.$slider.trigger("beforeChange", [l, l.currentSlide, o]), s = l.currentSlide, l.currentSlide = o, l.setSlideClasses(l.currentSlide), l.updateDots(), l.updateArrows(), l.options.fade === !0 ? (i !== !0 ? (l.fadeSlideOut(s), l.fadeSlide(o, function () {
                l.postSlide(o)
            })) : l.postSlide(o), void l.animateHeight()) : void (i !== !0 ? l.animateSlide(a, function () {
                l.postSlide(o)
            }) : l.postSlide(o))))
        }, e.prototype.startLoad = function () {
            var t = this;
            t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.hide(), t.$slider.addClass("slick-loading")
        }, e.prototype.swipeDirection = function () {
            var t, e, i, n, o = this;
            return t = o.touchObject.startX - o.touchObject.curX, e = o.touchObject.startY - o.touchObject.curY, i = Math.atan2(e, t), n = Math.round(180 * i / Math.PI), 0 > n && (n = 360 - Math.abs(n)), 45 >= n && n >= 0 ? o.options.rtl === !1 ? "left" : "right" : 360 >= n && n >= 315 ? o.options.rtl === !1 ? "left" : "right" : n >= 135 && 225 >= n ? o.options.rtl === !1 ? "right" : "left" : o.options.verticalSwiping === !0 ? n >= 35 && 135 >= n ? "left" : "right" : "vertical"
        }, e.prototype.swipeEnd = function (t) {
            var e, i = this;
            if (i.dragging = !1, i.shouldClick = i.touchObject.swipeLength > 10 ? !1 : !0, void 0 === i.touchObject.curX) return !1;
            if (i.touchObject.edgeHit === !0 && i.$slider.trigger("edge", [i, i.swipeDirection()]), i.touchObject.swipeLength >= i.touchObject.minSwipe) switch (i.swipeDirection()) {
                case "left":
                    e = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide + i.getSlideCount()) : i.currentSlide + i.getSlideCount(), i.slideHandler(e), i.currentDirection = 0, i.touchObject = {}, i.$slider.trigger("swipe", [i, "left"]);
                    break;
                case "right":
                    e = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide - i.getSlideCount()) : i.currentSlide - i.getSlideCount(), i.slideHandler(e), i.currentDirection = 1, i.touchObject = {}, i.$slider.trigger("swipe", [i, "right"])
            } else i.touchObject.startX !== i.touchObject.curX && (i.slideHandler(i.currentSlide), i.touchObject = {})
        }, e.prototype.swipeHandler = function (t) {
            var e = this;
            if (!(e.options.swipe === !1 || "ontouchend" in document && e.options.swipe === !1 || e.options.draggable === !1 && -1 !== t.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1,
                e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, e.options.verticalSwiping === !0 && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), t.data.action) {
                    case "start":
                        e.swipeStart(t);
                        break;
                    case "move":
                        e.swipeMove(t);
                        break;
                    case "end":
                        e.swipeEnd(t)
                }
        }, e.prototype.swipeMove = function (t) {
            var e, i, n, o, s, r = this;
            return s = void 0 !== t.originalEvent ? t.originalEvent.touches : null, !r.dragging || s && 1 !== s.length ? !1 : (e = r.getLeft(r.currentSlide), r.touchObject.curX = void 0 !== s ? s[0].pageX : t.clientX, r.touchObject.curY = void 0 !== s ? s[0].pageY : t.clientY, r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curX - r.touchObject.startX, 2))), r.options.verticalSwiping === !0 && (r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curY - r.touchObject.startY, 2)))), i = r.swipeDirection(), "vertical" !== i ? (void 0 !== t.originalEvent && r.touchObject.swipeLength > 4 && t.preventDefault(), o = (r.options.rtl === !1 ? 1 : -1) * (r.touchObject.curX > r.touchObject.startX ? 1 : -1), r.options.verticalSwiping === !0 && (o = r.touchObject.curY > r.touchObject.startY ? 1 : -1), n = r.touchObject.swipeLength, r.touchObject.edgeHit = !1, r.options.infinite === !1 && (0 === r.currentSlide && "right" === i || r.currentSlide >= r.getDotCount() && "left" === i) && (n = r.touchObject.swipeLength * r.options.edgeFriction, r.touchObject.edgeHit = !0), r.options.vertical === !1 ? r.swipeLeft = e + n * o : r.swipeLeft = e + n * (r.$list.height() / r.listWidth) * o, r.options.verticalSwiping === !0 && (r.swipeLeft = e + n * o), r.options.fade === !0 || r.options.touchMove === !1 ? !1 : r.animating === !0 ? (r.swipeLeft = null, !1) : void r.setCSS(r.swipeLeft)) : void 0)
        }, e.prototype.swipeStart = function (t) {
            var e, i = this;
            return 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow ? (i.touchObject = {}, !1) : (void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (e = t.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== e ? e.pageX : t.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== e ? e.pageY : t.clientY, void (i.dragging = !0))
        }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () {
            var t = this;
            null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit())
        }, e.prototype.unload = function () {
            var e = this;
            t(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
        }, e.prototype.unslick = function (t) {
            var e = this;
            e.$slider.trigger("unslick", [e, t]), e.destroy()
        }, e.prototype.updateArrows = function () {
            var t, e = this;
            t = Math.floor(e.options.slidesToShow / 2), e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && e.options.centerMode === !1 ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && e.options.centerMode === !0 && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
        }, e.prototype.updateDots = function () {
            var t = this;
            null !== t.$dots && (t.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
        }, e.prototype.visibility = function () {
            var t = this;
            document[t.hidden] ? (t.paused = !0, t.autoPlayClear()) : t.options.autoplay === !0 && (t.paused = !1, t.autoPlay())
        }, e.prototype.initADA = function () {
            var e = this;
            try {
                e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
                    "aria-hidden": "true",
                    tabindex: "-1"
                }).find("a, input, button, select").attr({
                    tabindex: "-1"
                }), e.$slideTrack.attr("role", "listbox"), e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function (i) {
                    t(this).attr({
                        role: "option",
                        "aria-describedby": "slick-slide" + e.instanceUid + i
                    })
                }), null !== e.$dots && e.$dots.attr("role", "tablist").find("li").each(function (i) {
                    t(this).attr({
                        role: "presentation",
                        "aria-selected": "false",
                        "aria-controls": "navigation" + e.instanceUid + i,
                        id: "slick-slide" + e.instanceUid + i
                    })
                }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), e.activateADA()
            } catch (i) { }
        }, e.prototype.activateADA = function () {
            try {
                var t = this,
                    e = t.$slider.find("*").is(":focus");
                t.$slideTrack.find(".slick-active").attr({
                    "aria-hidden": "false",
                    tabindex: "0"
                }).find("a, input, button, select").attr({
                    tabindex: "0"
                }), e && t.$slideTrack.find(".slick-active").focus()
            } catch (i) { }
        }, e.prototype.focusHandler = function () {
            var e = this;
            e.$slider.on("focus.slick blur.slick", "*", function (i) {
                i.stopImmediatePropagation();
                var n = t(this);
                setTimeout(function () {
                    e.isPlay && (n.is(":focus") ? (e.autoPlayClear(), e.paused = !0) : (e.paused = !1, e.autoPlay()))
                }, 0)
            })
        }, t.fn.slick = function () {
            var t, i = this,
                n = arguments[0],
                o = Array.prototype.slice.call(arguments, 1),
                s = i.length,
                r = 0;
            for (r; s > r; r++)
                if ("object" == typeof n || "undefined" == typeof n ? i[r].slick = new e(i[r], n) : t = i[r].slick[n].apply(i[r].slick, o), "undefined" != typeof t) return t;
            return i
        }
    }), define("../src/journeys/j69-dashboard/j69-dashboard", ["jquery", "slick", "chart-config"], function (t, e) {
        "use strict";
        var i = function (t) {
            return dewaGlobal.dashboardJourney = t, this.$journey = t, this
        };
        return i.prototype.init = function () {
            t(this.$journey).find(".grid").addClass("j69-dashboard__charts"), this.$clone = t(this.$journey).find(".grid").clone(!0, !0), t(this.$clone).addClass("j69-dashboard__charts--carousel"), t(this.$journey).append(this.$clone), this.plotCharts(), this.initMobileCarousel()
        }, i.prototype.initMobileCarousel = function () {
            var e = this;
            e.$slider = t(this.$clone).find(".grid__row"), e.$slider.on("init", function (i) {
                window.setTimeout(function () {
                    t(window).outerWidth() < 600 && e.$slider.css("top", "0")
                }, 200)
            }), t(this.$clone).find(".grid__row").slick({
                arrows: !1,
                dots: !0,
                infinite: !0,
                speed: 750,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: !1,
                autoplaySpeed: 3e3,
                pauseOnHover: !1,
                rtl: "rtl" == t("html").attr("dir")
            }), dewaGlobal.cloneB = e, dewaGlobal.updateDashboardChart = function () {
                t(dewaGlobal.dashboardJourney).find(".grid.j69-dashboard__charts.j69-dashboard__charts--carousel").remove(), dewaGlobal.clone = t(dewaGlobal.dashboardJourney).find(".grid.j69-dashboard__charts").clone(!0, !0)[0], t(dewaGlobal.clone).addClass("j69-dashboard__charts--carousel"), t(dewaGlobal.dashboardJourney).append(dewaGlobal.clone), dewaGlobal.cloneB.$slider = t(dewaGlobal.clone).find(".grid__row"), dewaGlobal.cloneB.$slider.on("init", function (e) {
                    window.setTimeout(function () {
                        t(window).outerWidth() < 600 && dewaGlobal.cloneB.$slider.css("top", "0")
                    }, 200)
                }), t(dewaGlobal.clone).find(".grid__row").slick({
                    arrows: !1,
                    dots: !0,
                    infinite: !0,
                    speed: 750,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    pauseOnHover: !1,
                    rtl: "rtl" == t("html").attr("dir")
                }), t(dewaGlobal.clone).find(".grid__row").on("beforeChange", function (e, i, n, o) {
                    window.setTimeout(function () {
                        t(window).outerWidth() < 600 && dewaGlobal.cloneB.$slider.css("top", "0"), dewaGlobal.refreshDashboardChartSlider()
                    }, 200)
                }), t(dewaGlobal.clone).find(".grid__row.slick-initialized.slick-slider").on("click", function () {
                    window.setTimeout(function () {
                        t(window).outerWidth() < 600 && dewaGlobal.cloneB.$slider.css("top", "0"), dewaGlobal.refreshDashboardChartSlider()
                    }, 200)
                })
            }, dewaGlobal.refreshDashboardChartSlider = function () {
                if (t(window).outerWidth() < 600) {
                    var e = t(dewaGlobal.dashboardJourney).find(".grid.j69-dashboard__charts.j69-dashboard__charts--carousel");
                    t(e.find(".m28-dashboard-component__chart")).each(function (e, i) {
                        var n = t(this).find("svg")[0],
                            o = parseInt(t(n).css("font-size")) - 1;
                        t(n).css("font-size", o)
                    })
                }
            }
        }, i.prototype.plotCharts = function () {
            t("body").find(".m28-dashboard-component").each(function () {
                var e = t(this).data("chart-data"),
                    i = "#34B233",
                    n = "#00A9E0",
                    o = e.split(",").map(function (t) {
                        return Number(t)
                    }),
                    s = e[0] > e[e.length - 1] ? n : i,
                    r = t(this).find("[data-chart-container]");
                r.highcharts({
                    tooltip: {
                        text: "",
                        style: {
                            display: "none"
                        }
                    },
                    title: {
                        text: "",
                        style: {
                            display: "none"
                        }
                    },
                    subtitle: {
                        text: "",
                        style: {
                            display: "none"
                        }
                    },
                    xAxis: {
                        lineWidth: 0,
                        minorGridLineWidth: 0,
                        lineColor: "transparent",
                        minorTickLength: 0,
                        tickLength: 0,
                        labels: {
                            enabled: !1
                        },
                        title: {
                            text: null
                        },
                        reversed: "rtl" == t("html").attr("dir")
                    },
                    yAxis: {
                        gridLineWidth: 0,
                        minorGridLineWidth: 0,
                        labels: {
                            enabled: !1
                        },
                        title: {
                            text: null
                        },
                        opposite: "rtl" == t("html").attr("dir")
                    },
                    series: [{
                        showInLegend: !1,
                        data: o,
                        color: s
                    }]
                })
            })
        }, i
    }), define("../src/journeys/j75-request-temp-connection/j75-request-temp-connection", ["jquery"], function (t) {
        "use strict";
        var e = function (t) {
            return this.$journey = t, this
        };
        return e.prototype.init = function () {
            var e = this;
            this.$eventSelect = this.$journey.find("select[name=eventType]"), this.$startDateField = t("#form-field-picker_start_date"), this.$endDateField = t("#form-field-picker_end_date"), this.$startDateContainer = t("#datepicker-container-picker_start_date"), this.$endDateContainer = t("#datepicker-container-picker_end_date"), this.startPickerOptions = this.$startDateField.data("picker-options"), this.startDatePicker = this.$startDateField.pickadate("picker"), this.endDatePicker = this.$endDateField.pickadate("picker"), this.disableDateFields(), this.$eventSelect.on("change", function () {
                e.eventSelected()
            }), this.$eventSelect.find(":selected").val().length && e.eventSelected();
            try {
                this.startDatePicker.on({
                    set: function (t) {
                        e.startDateSelected(t)
                    }
                })
            } catch (i) { }
        }, e.prototype.startDateSelected = function (t) {
            var e, i, n = new Date(this.$endDateField.val());
            void 0 !== t.select && (e = new Date(t.select), i = this.addDays(e, 6), (e.getTime() > n.getTime() || n.getTime() > i.getTime()) && (this.resetDateField(this.$endDateField), this.endDatePicker.clear()), this.setPickerDate(this.endDatePicker, "min", e), this.setPickerDate(this.endDatePicker, "max", i))
        }, e.prototype.eventSelected = function () {
            var t, e, i = this.$eventSelect.val();
            this.isWedding = "Wedding" === i, void 0 === this.startPickerOptions.defaultMin && (this.startPickerOptions.defaultMin = this.startPickerOptions.min), void 0 === this.startPickerOptions.defaultMax && (this.startPickerOptions.defaultMax = this.startPickerOptions.max), t = new Date(this.startPickerOptions.defaultMin[0], this.startPickerOptions.defaultMin[1], this.startPickerOptions.defaultMin[2]), this.resetDateField(this.$startDateField), this.resetDateField(this.$endDateField);
            try {
                this.startDatePicker.set("highlight", !1), this.startDatePicker.clear(), this.endDatePicker.set("highlight", !1), this.endDatePicker.clear()
            } catch (n) { }
            "" === i ? this.disableDateFields() : (this.$startDateContainer.removeClass("form-field--disabled"), this.$endDateContainer.removeClass("form-field--disabled"), this.$startDateField.prop("disabled", !1), this.$endDateField.prop("disabled", !1), e = this.isWedding ? this.addDays(t, 4) : t, this.setPickerDate(this.startDatePicker, "min", e), this.setPickerDate(this.endDatePicker, "min", e), this.startDatePicker.get() || (this.startDatePicker.set("select", e), this.startDatePicker.set("clear")))
        }, e.prototype.setPickerDate = function (t, e, i) {
            try {
                t.set(e, [i.getFullYear(), i.getMonth(), i.getDate()])
            } catch (n) { }
        }, e.prototype.resetDateField = function (t) {
            t.val("").parent().removeClass("form-field__input-wrapper--validated")
        }, e.prototype.disableDateFields = function () {
            this.$startDateField.prop("disabled", !0), this.$endDateField.prop("disabled", !0), this.$startDateContainer.addClass("form-field--disabled"), this.$endDateContainer.addClass("form-field--disabled")
        }, e.prototype.addDays = function (t, e) {
            var i = new Date(t);
            return i.setDate(i.getDate() + e), i
        }, e
    }), define("../src/journeys/j87-partnership-services/j87-partnership-services", ["jquery"], function (t) {
        "use strict";
        var e = function (t) {
            return this.$journey = t, this
        };
        return e.prototype.init = function () {
            var e = this;
            e.$modal = t(".j87-partnership-services__modal"), t(this.$journey).delegate(".partner-document-list__item-document--delete", "click", function () {
                t("body").addClass("modal-open"), e.$modal.fadeIn()
            }), t(this.$journey).delegate(".j87-partnership-services__modal--button-confirm button", "click", function () {
                t("body").removeClass("modal-open"), e.$modal.fadeOut(400, function () {
                    t(this).closest("form").submit()
                })
            }), t(this.$journey).delegate(".j87-partnership-services__modal--button-cancel button", "click", function (i) {
                i.preventDefault(), i.stopPropagation(), i.stopImmediatePropagation(), t("body").removeClass("modal-open"), e.$modal.fadeOut()
            })
        }, e
    }), define("../src/journeys/j92-roadwork-locations/j92-roadwork-locations", ["jquery"], function (t) {
        "use strict";
        var e = function (t) {
            return this.$journey = t, this
        };
        return e.prototype.init = function () {
            var e = this;
            e.labels = this.$journey.data("labels"), t(window).on("mapLoaded", function () {
                e.map = window.MAP.map, e.populateMap(), e.centerPoint = e.map.getCenter(), e.map.addListener("dragend", function () {
                    e.map.setCenter(e.map.getCenter()), e.centerPoint = e.map.getCenter()
                })
            }), t(window).on("resize orientationchange", function () {
                setTimeout(function () {
                    e.map.setCenter(e.centerPoint)
                }, 10)
            })
        }, e.prototype.showInfoWindow = function (e) {
            var i = this,
                n = '<div class="m32-map__infowindow-container">';
            e.city ? n += "<strong>" + e.city + "</strong><br/>" : e.street && (n += "<strong>" + e.street + "</strong><br/>"), n += e.start + " - " + e.end + '<i class="icon-Understanding_Your_Bill"></i>', n += "</div>", i.currentMarker = e, i.infowindow.close(), i.infowindow = new google.maps.InfoWindow({
                content: n,
                maxWidth: 200
            }), i.infowindow.open(i.map, e), t(".m32-map__infowindow-container").closest(".gm-style-iw").next("div").css("display", "none"), t(".m32-map__infowindow-container").on("click", function () {
                i.showMoreInfo(e)
            })
        }, e.prototype.showMoreInfo = function (e) {
            var i = this.labels,
                n = t(this.$journey).find(".m42-keyvalue dl"),
                o = "";
            e.street && (o += '<dt class="m42-keyvalue__key m42-keyvalue__key--secondary">' + i.streetLabel + "</dt>", o += '<dd class="m42-keyvalue__value m42-keyvalue__value--secondary">' + e.street + "</dd>"), e.city && (o += '<dt class="m42-keyvalue__key m42-keyvalue__key--secondary">' + i.cityLabel + "</dt>", o += '<dd class="m42-keyvalue__value m42-keyvalue__value--secondary">' + e.city + "</dd>"), o += '<dt class="m42-keyvalue__key m42-keyvalue__key--secondary">' + i.disruptionLabel + "</dt>", o += '<dd class="m42-keyvalue__value m42-keyvalue__value--secondary">' + e.disruption + "</dd>", o += '<dt class="m42-keyvalue__key m42-keyvalue__key--secondary">' + i.startLabel + "</dt>", o += '<dd class="m42-keyvalue__value m42-keyvalue__value--secondary">' + e.start + "</dd>", o += '<dt class="m42-keyvalue__key m42-keyvalue__key--secondary">' + i.endLabel + "</dt>", o += '<dd class="m42-keyvalue__value m42-keyvalue__value--secondary">' + e.end + "</dd>", n.empty().html(o), n.closest(".grid__row--hidden").slideDown()
        }, e.prototype.populateMap = function () {
            var e = this,
                i = t(e.$journey).data("locations").GetRoadWorkNotif.Item;
            e.worksMarkers = [], e.infowindow = new google.maps.InfoWindow({});
            for (var n = 0; n < i.length; n++) {
                var o = new google.maps.Marker({
                    map: e.map,
                    position: {
                        lat: parseFloat(i[n].X_COORDINATE),
                        lng: parseFloat(i[n].Y_COORDINATE)
                    },
                    street: i[n].Street,
                    city: i[n].CITY_NAME,
                    start: i[n].START_DATE,
                    end: i[n].END_DATE,
                    disruption: i[n].DISRUPTION,
                    index: n
                });
                0 === n && e.map.setCenter(o.getPosition()), e.worksMarkers.push(o), e.worksMarkers[n].addListener("click", function (i) {
                    e.map.setCenter(e.worksMarkers[t(this)[0].index].getPosition()), e.showInfoWindow(t(this)[0])
                }), o.setVisible(!0)
            }
            e.map.addListener("click", function () {
                e.infowindow.close(), t(".m42-keyvalue dl").closest(".grid__row--hidden").slideUp()
            })
        }, e
    }), define("../src/sublayouts/_helpers/edit-toggle/edit-toggle", ["jquery", "breakpoint", "lib/utils", "numeral"], function (t, e, i) {
        "use strict";
        var n = function (t) {
            return this.$el = t, this
        };
        return n.prototype.init = function () {
            this.$trigger = this.$el.find("[data-edit-toggle-trigger]"), this.$fieldWrapper = this.$el.find("[data-edit-toggle-field]"), this.$target = this.$el.find("[data-edit-toggle-target]"), this.$input = this.$fieldWrapper.find("input"), this.$cancel = this.$el.find("[data-edit-toggle-cancel]"), this.fieldOpenClassname = "edit-toggle__field--open", this.originalAmount = parseFloat(this.$target.text()).toFixed(2), this.$trigger.on("click", t.proxy(this.open, this)), this.$cancel.on("click", t.proxy(this.close, this)), this.$input.on("keyup", t.proxy(this.update, this))
        }, n.prototype.open = function () {
            this.$trigger.hide(), this.$fieldWrapper.addClass(this.fieldOpenClassname), this.$input.focus()
        }, n.prototype.close = function () {
            this.$trigger.show(), this.$input.val(""), this.$target.text(numeral(this.originalAmount).format("0,0.00")), this.$fieldWrapper.removeClass(this.fieldOpenClassname), this.$input.focus()
        }, n.prototype.update = function () {
            this.$target.text(numeral(this.$input.val()).format("0,0.00"))
        }, n
    }), define("../src/sublayouts/_helpers/spinner/spinner", ["jquery"], function (t) {
        "use strict";
        var e = function (t) {
            return this.$targetEl = t, this
        };
        return e.prototype.load = function () {
            this.$spinner = t('<div class="spinner"></div>'), this.$targetEl.append(this.$spinner)
        }, e.prototype.unload = function () {
            this.$spinner.fadeOut(200, t.proxy(this.destroy, this))
        }, e.prototype.destroy = function () {
            this.$spinner.remove()
        }, e
    }), define("../src/sublayouts/_helpers/toggle-menu/toggle-menu", ["jquery", "breakpoint", "lib/utils"], function (t, e, i) {
        "use strict";
        var n = function (t) {
            return this.$component = t, this
        };
        return n.prototype.init = function () {
            this.$trigger = this.$component.find('[data-toggle-trigger="true"]'), this.$content = this.$component.find('[data-toggle-content="true"]'), this.autoOpen = this.$component.data("toggle-auto-open"), this.activeClass = "toggle-menu--active", this.activeToggleClass = "toggle-menu__trigger--active", this.triggerBreakpoint = void 0 === this.$component.data("toggle-breakpoint") ? "s" : this.$component.data("toggle-breakpoint"), this.respond(), this.active = !1, "l" === this.triggerBreakpoint ? (this.display(), this.autoOpen && this.toggle(this.$trigger.eq(0))) : (t(e).on("change", t.proxy(this.respond, this)), t(window).on("orientationchange", t.proxy(this.orientationchange, this)))
        }, n.prototype.respond = function () {
            var t = this;
            "s" === this.triggerBreakpoint && "s" === i.breakpoint() || "m" === this.triggerBreakpoint && ("s" === i.breakpoint() || "m" === i.breakpoint()) ? t.display() : this.reset()
        }, n.prototype.display = function () {
            var e = this;
            this.active || (this.$component.addClass(this.activeClass), this.$content.hide(), this.$trigger.on("click", function () {
                e.toggle(t(this))
            }), t.each(this.$trigger, function () {
                0 === t(this).next().length && (t(this).addClass("toggle-menu__trigger--empty").attr("tabindex", "-1"), t(this).off("click"))
            }), this.active = !0)
        }, n.prototype.toggle = function (t) {
            var e = t.next();
            this.$content.not(e).hide(), this.$trigger.not(t).removeClass(this.activeToggleClass), t.toggleClass(this.activeToggleClass), e.toggle()
        }, n.prototype.orientationchange = function () {
            this.reset(), this.respond()
        }, n.prototype.reset = function () {
            this.$component.removeClass(this.activeClass), this.$trigger.off(), this.$trigger.removeClass(this.activeToggleClass), this.$content.removeAttr("style"), this.active = !1
        }, n
    }),
    function (t, e, i) {
        function n(t, i) {
            this.wrapper = "string" == typeof t ? e.querySelector(t) : t, this.scroller = this.wrapper.children[0], this.scrollerStyle = this.scroller.style, this.options = {
                resizeScrollbars: !0,
                mouseWheelSpeed: 20,
                snapThreshold: .334,
                startX: 0,
                startY: 0,
                scrollY: !0,
                directionLockThreshold: 5,
                momentum: !0,
                bounce: !0,
                bounceTime: 600,
                bounceEasing: "",
                preventDefault: !0,
                preventDefaultException: {
                    tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
                },
                HWCompositing: !0,
                useTransition: !0,
                useTransform: !0
            };
            for (var n in i) this.options[n] = i[n];
            this.translateZ = this.options.HWCompositing && a.hasPerspective ? " translateZ(0)" : "", this.options.useTransition = a.hasTransition && this.options.useTransition, this.options.useTransform = a.hasTransform && this.options.useTransform, this.options.eventPassthrough = this.options.eventPassthrough === !0 ? "vertical" : this.options.eventPassthrough, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollY = "vertical" == this.options.eventPassthrough ? !1 : this.options.scrollY, this.options.scrollX = "horizontal" == this.options.eventPassthrough ? !1 : this.options.scrollX, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? a.ease[this.options.bounceEasing] || a.ease.circular : this.options.bounceEasing, this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling, this.options.tap === !0 && (this.options.tap = "tap"), "scale" == this.options.shrinkScrollbars && (this.options.useTransition = !1), this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1, 3 == this.options.probeType && (this.options.useTransition = !1), this.x = 0, this.y = 0, this.directionX = 0, this.directionY = 0, this._events = {}, this._init(), this.refresh(), this.scrollTo(this.options.startX, this.options.startY), this.enable()
        }

        function o(t, i, n) {
            var o = e.createElement("div"),
                s = e.createElement("div");
            return n === !0 && (o.style.cssText = "position:absolute;z-index:9999", s.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"), s.className = "iScrollIndicator", "h" == t ? (n === !0 && (o.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", s.style.height = "100%"), o.className = "iScrollHorizontalScrollbar") : (n === !0 && (o.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", s.style.width = "100%"), o.className = "iScrollVerticalScrollbar"), o.style.cssText += ";overflow:hidden", i || (o.style.pointerEvents = "none"), o.appendChild(s), o
        }

        function s(i, n) {
            this.wrapper = "string" == typeof n.el ? e.querySelector(n.el) : n.el, this.wrapperStyle = this.wrapper.style, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = i, this.options = {
                listenX: !0,
                listenY: !0,
                interactive: !1,
                resize: !0,
                defaultScrollbars: !1,
                shrink: !1,
                fade: !1,
                speedRatioX: 0,
                speedRatioY: 0
            };
            for (var o in n) this.options[o] = n[o];
            this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.options.interactive && (this.options.disableTouch || (a.addEvent(this.indicator, "touchstart", this), a.addEvent(t, "touchend", this)), this.options.disablePointer || (a.addEvent(this.indicator, a.prefixPointerEvent("pointerdown"), this), a.addEvent(t, a.prefixPointerEvent("pointerup"), this)), this.options.disableMouse || (a.addEvent(this.indicator, "mousedown", this), a.addEvent(t, "mouseup", this))), this.options.fade && (this.wrapperStyle[a.style.transform] = this.scroller.translateZ, this.wrapperStyle[a.style.transitionDuration] = a.isBadAndroid ? "0.001s" : "0ms", this.wrapperStyle.opacity = "0")
        }
        var r = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame || function (e) {
            t.setTimeout(e, 1e3 / 60)
        },
            a = function () {
                function n(t) {
                    return r === !1 ? !1 : "" === r ? t : r + t.charAt(0).toUpperCase() + t.substr(1)
                }
                var o = {},
                    s = e.createElement("div").style,
                    r = function () {
                        for (var t, e = ["t", "webkitT", "MozT", "msT", "OT"], i = 0, n = e.length; n > i; i++)
                            if (t = e[i] + "ransform", t in s) return e[i].substr(0, e[i].length - 1);
                        return !1
                    }();
                o.getTime = Date.now || function () {
                    return (new Date).getTime()
                }, o.extend = function (t, e) {
                    for (var i in e) t[i] = e[i]
                }, o.addEvent = function (t, e, i, n) {
                    t.addEventListener(e, i, !!n)
                }, o.removeEvent = function (t, e, i, n) {
                    t.removeEventListener(e, i, !!n)
                }, o.prefixPointerEvent = function (e) {
                    return t.MSPointerEvent ? "MSPointer" + e.charAt(9).toUpperCase() + e.substr(10) : e
                }, o.momentum = function (t, e, n, o, s, r) {
                    var a, l, c = t - e,
                        d = i.abs(c) / n;
                    return r = void 0 === r ? 6e-4 : r, a = t + d * d / (2 * r) * (0 > c ? -1 : 1), l = d / r, o > a ? (a = s ? o - s / 2.5 * (d / 8) : o, c = i.abs(a - t), l = c / d) : a > 0 && (a = s ? s / 2.5 * (d / 8) : 0, c = i.abs(t) + a, l = c / d), {
                        destination: i.round(a),
                        duration: l
                    }
                };
                var a = n("transform");
                return o.extend(o, {
                    hasTransform: a !== !1,
                    hasPerspective: n("perspective") in s,
                    hasTouch: "ontouchstart" in t,
                    hasPointer: t.PointerEvent || t.MSPointerEvent,
                    hasTransition: n("transition") in s
                }), o.isBadAndroid = /Android /.test(t.navigator.appVersion) && !/Chrome\/\d/.test(t.navigator.appVersion), o.extend(o.style = {}, {
                    transform: a,
                    transitionTimingFunction: n("transitionTimingFunction"),
                    transitionDuration: n("transitionDuration"),
                    transitionDelay: n("transitionDelay"),
                    transformOrigin: n("transformOrigin")
                }), o.hasClass = function (t, e) {
                    var i = new RegExp("(^|\\s)" + e + "(\\s|$)");
                    return i.test(t.className)
                }, o.addClass = function (t, e) {
                    if (!o.hasClass(t, e)) {
                        var i = t.className.split(" ");
                        i.push(e), t.className = i.join(" ")
                    }
                }, o.removeClass = function (t, e) {
                    if (o.hasClass(t, e)) {
                        var i = new RegExp("(^|\\s)" + e + "(\\s|$)", "g");
                        t.className = t.className.replace(i, " ")
                    }
                }, o.offset = function (t) {
                    for (var e = -t.offsetLeft, i = -t.offsetTop; t = t.offsetParent;) e -= t.offsetLeft, i -= t.offsetTop;
                    return {
                        left: e,
                        top: i
                    }
                }, o.preventDefaultException = function (t, e) {
                    for (var i in e)
                        if (e[i].test(t[i])) return !0;
                    return !1
                }, o.extend(o.eventType = {}, {
                    touchstart: 1,
                    touchmove: 1,
                    touchend: 1,
                    mousedown: 2,
                    mousemove: 2,
                    mouseup: 2,
                    pointerdown: 3,
                    pointermove: 3,
                    pointerup: 3,
                    MSPointerDown: 3,
                    MSPointerMove: 3,
                    MSPointerUp: 3
                }), o.extend(o.ease = {}, {
                    quadratic: {
                        style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        fn: function (t) {
                            return t * (2 - t)
                        }
                    },
                    circular: {
                        style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
                        fn: function (t) {
                            return i.sqrt(1 - --t * t)
                        }
                    },
                    back: {
                        style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        fn: function (t) {
                            var e = 4;
                            return (t -= 1) * t * ((e + 1) * t + e) + 1
                        }
                    },
                    bounce: {
                        style: "",
                        fn: function (t) {
                            return (t /= 1) < 1 / 2.75 ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                        }
                    },
                    elastic: {
                        style: "",
                        fn: function (t) {
                            var e = .22,
                                n = .4;
                            return 0 === t ? 0 : 1 == t ? 1 : n * i.pow(2, -10 * t) * i.sin((t - e / 4) * (2 * i.PI) / e) + 1
                        }
                    }
                }), o.tap = function (t, i) {
                    var n = e.createEvent("Event");
                    n.initEvent(i, !0, !0), n.pageX = t.pageX, n.pageY = t.pageY, t.target.dispatchEvent(n)
                }, o.click = function (t) {
                    var i, n = t.target;
                    /(SELECT|INPUT|TEXTAREA)/i.test(n.tagName) || (i = e.createEvent("MouseEvents"), i.initMouseEvent("click", !0, !0, t.view, 1, n.screenX, n.screenY, n.clientX, n.clientY, t.ctrlKey, t.altKey, t.shiftKey, t.metaKey, 0, null), i._constructed = !0, n.dispatchEvent(i))
                }, o
            }();
        n.prototype = {
            version: "5.1.3",
            _init: function () {
                this._initEvents(), (this.options.scrollbars || this.options.indicators) && this._initIndicators(), this.options.mouseWheel && this._initWheel(), this.options.snap && this._initSnap(), this.options.keyBindings && this._initKeys()
            },
            destroy: function () {
                this._initEvents(!0), this._execEvent("destroy")
            },
            _transitionEnd: function (t) {
                t.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, this._execEvent("scrollEnd")))
            },
            _start: function (t) {
                if ((1 == a.eventType[t.type] || 0 === t.button) && this.enabled && (!this.initiated || a.eventType[t.type] === this.initiated)) {
                    !this.options.preventDefault || a.isBadAndroid || a.preventDefaultException(t.target, this.options.preventDefaultException) || t.preventDefault();
                    var e, n = t.touches ? t.touches[0] : t;
                    this.initiated = a.eventType[t.type], this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.directionLocked = 0, this._transitionTime(), this.startTime = a.getTime(), this.options.useTransition && this.isInTransition ? (this.isInTransition = !1, e = this.getComputedPosition(), this._translate(i.round(e.x), i.round(e.y)), this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this._execEvent("scrollEnd")), this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = n.pageX, this.pointY = n.pageY, this._execEvent("beforeScrollStart")
                }
            },
            _move: function (t) {
                if (this.enabled && a.eventType[t.type] === this.initiated) {
                    this.options.preventDefault && t.preventDefault();
                    var e, n, o, s, r = t.touches ? t.touches[0] : t,
                        l = r.pageX - this.pointX,
                        c = r.pageY - this.pointY,
                        d = a.getTime();
                    if (this.pointX = r.pageX, this.pointY = r.pageY, this.distX += l, this.distY += c, o = i.abs(this.distX), s = i.abs(this.distY), !(d - this.endTime > 300 && 10 > o && 10 > s)) {
                        if (this.directionLocked || this.options.freeScroll || (o > s + this.options.directionLockThreshold ? this.directionLocked = "h" : s >= o + this.options.directionLockThreshold ? this.directionLocked = "v" : this.directionLocked = "n"), "h" == this.directionLocked) {
                            if ("vertical" == this.options.eventPassthrough) t.preventDefault();
                            else if ("horizontal" == this.options.eventPassthrough) return void (this.initiated = !1);
                            c = 0
                        } else if ("v" == this.directionLocked) {
                            if ("horizontal" == this.options.eventPassthrough) t.preventDefault();
                            else if ("vertical" == this.options.eventPassthrough) return void (this.initiated = !1);
                            l = 0
                        }
                        l = this.hasHorizontalScroll ? l : 0, c = this.hasVerticalScroll ? c : 0, e = this.x + l, n = this.y + c, (e > 0 || e < this.maxScrollX) && (e = this.options.bounce ? this.x + l / 3 : e > 0 ? 0 : this.maxScrollX), (n > 0 || n < this.maxScrollY) && (n = this.options.bounce ? this.y + c / 3 : n > 0 ? 0 : this.maxScrollY), this.directionX = l > 0 ? -1 : 0 > l ? 1 : 0, this.directionY = c > 0 ? -1 : 0 > c ? 1 : 0, this.moved || this._execEvent("scrollStart"), this.moved = !0, this._translate(e, n), d - this.startTime > 300 && (this.startTime = d, this.startX = this.x, this.startY = this.y, 1 == this.options.probeType && this._execEvent("scroll")), this.options.probeType > 1 && this._execEvent("scroll")
                    }
                }
            },
            _end: function (t) {
                if (this.enabled && a.eventType[t.type] === this.initiated) {
                    this.options.preventDefault && !a.preventDefaultException(t.target, this.options.preventDefaultException) && t.preventDefault();
                    var e, n, o = (t.changedTouches ? t.changedTouches[0] : t, a.getTime() - this.startTime),
                        s = i.round(this.x),
                        r = i.round(this.y),
                        l = i.abs(s - this.startX),
                        c = i.abs(r - this.startY),
                        d = 0,
                        h = "";
                    if (this.isInTransition = 0, this.initiated = 0, this.endTime = a.getTime(), !this.resetPosition(this.options.bounceTime)) {
                        if (this.scrollTo(s, r), !this.moved) return this.options.tap && a.tap(t, this.options.tap), this.options.click && a.click(t), void this._execEvent("scrollCancel");
                        if (this._events.flick && 200 > o && 100 > l && 100 > c) return void this._execEvent("flick");
                        if (this.options.momentum && 300 > o && (e = this.hasHorizontalScroll ? a.momentum(this.x, this.startX, o, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
                            destination: s,
                            duration: 0
                        }, n = this.hasVerticalScroll ? a.momentum(this.y, this.startY, o, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
                            destination: r,
                            duration: 0
                        }, s = e.destination, r = n.destination, d = i.max(e.duration, n.duration), this.isInTransition = 1), this.options.snap) {
                            var u = this._nearestSnap(s, r);
                            this.currentPage = u, d = this.options.snapSpeed || i.max(i.max(i.min(i.abs(s - u.x), 1e3), i.min(i.abs(r - u.y), 1e3)), 300), s = u.x, r = u.y, this.directionX = 0, this.directionY = 0, h = this.options.bounceEasing
                        }
                        return s != this.x || r != this.y ? ((s > 0 || s < this.maxScrollX || r > 0 || r < this.maxScrollY) && (h = a.ease.quadratic), void this.scrollTo(s, r, d, h)) : void this._execEvent("scrollEnd")
                    }
                }
            },
            _resize: function () {
                var t = this;
                clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function () {
                    t.refresh()
                }, this.options.resizePolling)
            },
            resetPosition: function (t) {
                var e = this.x,
                    i = this.y;
                return t = t || 0, !this.hasHorizontalScroll || this.x > 0 ? e = 0 : this.x < this.maxScrollX && (e = this.maxScrollX), !this.hasVerticalScroll || this.y > 0 ? i = 0 : this.y < this.maxScrollY && (i = this.maxScrollY), e == this.x && i == this.y ? !1 : (this.scrollTo(e, i, t, this.options.bounceEasing), !0)
            },
            disable: function () {
                this.enabled = !1
            },
            enable: function () {
                this.enabled = !0
            },
            refresh: function () {
                this.wrapper.offsetHeight;
                this.wrapperWidth = this.wrapper.clientWidth, this.wrapperHeight = this.wrapper.clientHeight, this.scrollerWidth = this.scroller.offsetWidth, this.scrollerHeight = this.scroller.offsetHeight, this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.maxScrollY = this.wrapperHeight - this.scrollerHeight, this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, this.wrapperOffset = a.offset(this.wrapper), this._execEvent("refresh"), this.resetPosition()
            },
            on: function (t, e) {
                this._events[t] || (this._events[t] = []), this._events[t].push(e)
            },
            off: function (t, e) {
                if (this._events[t]) {
                    var i = this._events[t].indexOf(e);
                    i > -1 && this._events[t].splice(i, 1)
                }
            },
            _execEvent: function (t) {
                if (this._events[t]) {
                    var e = 0,
                        i = this._events[t].length;
                    if (i)
                        for (; i > e; e++) this._events[t][e].apply(this, [].slice.call(arguments, 1))
                }
            },
            scrollBy: function (t, e, i, n) {
                t = this.x + t, e = this.y + e, i = i || 0, this.scrollTo(t, e, i, n)
            },
            scrollTo: function (t, e, i, n) {
                n = n || a.ease.circular, this.isInTransition = this.options.useTransition && i > 0, !i || this.options.useTransition && n.style ? (this._transitionTimingFunction(n.style), this._transitionTime(i), this._translate(t, e)) : this._animate(t, e, i, n.fn)
            },
            scrollToElement: function (t, e, n, o, s) {
                if (t = t.nodeType ? t : this.scroller.querySelector(t)) {
                    var r = a.offset(t);
                    r.left -= this.wrapperOffset.left, r.top -= this.wrapperOffset.top, n === !0 && (n = i.round(t.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), o === !0 && (o = i.round(t.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), r.left -= n || 0, r.top -= o || 0, r.left = r.left > 0 ? 0 : r.left < this.maxScrollX ? this.maxScrollX : r.left, r.top = r.top > 0 ? 0 : r.top < this.maxScrollY ? this.maxScrollY : r.top, e = void 0 === e || null === e || "auto" === e ? i.max(i.abs(this.x - r.left), i.abs(this.y - r.top)) : e, this.scrollTo(r.left, r.top, e, s)
                }
            },
            _transitionTime: function (t) {
                if (t = t || 0, this.scrollerStyle[a.style.transitionDuration] = t + "ms", !t && a.isBadAndroid && (this.scrollerStyle[a.style.transitionDuration] = "0.001s"), this.indicators)
                    for (var e = this.indicators.length; e--;) this.indicators[e].transitionTime(t)
            },
            _transitionTimingFunction: function (t) {
                if (this.scrollerStyle[a.style.transitionTimingFunction] = t, this.indicators)
                    for (var e = this.indicators.length; e--;) this.indicators[e].transitionTimingFunction(t)
            },
            _translate: function (t, e) {
                if (this.options.useTransform ? this.scrollerStyle[a.style.transform] = "translate(" + t + "px," + e + "px)" + this.translateZ : (t = i.round(t), e = i.round(e), this.scrollerStyle.left = t + "px", this.scrollerStyle.top = e + "px"), this.x = t, this.y = e, this.indicators)
                    for (var n = this.indicators.length; n--;) this.indicators[n].updatePosition()
            },
            _initEvents: function (e) {
                var i = e ? a.removeEvent : a.addEvent,
                    n = this.options.bindToWrapper ? this.wrapper : t;
                i(t, "orientationchange", this), i(t, "resize", this), this.options.click && i(this.wrapper, "click", this, !0), this.options.disableMouse || (i(this.wrapper, "mousedown", this), i(n, "mousemove", this), i(n, "mousecancel", this), i(n, "mouseup", this)), a.hasPointer && !this.options.disablePointer && (i(this.wrapper, a.prefixPointerEvent("pointerdown"), this), i(n, a.prefixPointerEvent("pointermove"), this), i(n, a.prefixPointerEvent("pointercancel"), this), i(n, a.prefixPointerEvent("pointerup"), this)), a.hasTouch && !this.options.disableTouch && (i(this.wrapper, "touchstart", this), i(n, "touchmove", this), i(n, "touchcancel", this), i(n, "touchend", this)), i(this.scroller, "transitionend", this), i(this.scroller, "webkitTransitionEnd", this), i(this.scroller, "oTransitionEnd", this), i(this.scroller, "MSTransitionEnd", this)
            },
            getComputedPosition: function () {
                var e, i, n = t.getComputedStyle(this.scroller, null);
                return this.options.useTransform ? (n = n[a.style.transform].split(")")[0].split(", "), e = +(n[12] || n[4]), i = +(n[13] || n[5])) : (e = +n.left.replace(/[^-\d.]/g, ""), i = +n.top.replace(/[^-\d.]/g, "")), {
                    x: e,
                    y: i
                }
            },
            _initIndicators: function () {
                function t(t) {
                    for (var e = a.indicators.length; e--;) t.call(a.indicators[e])
                }
                var e, i = this.options.interactiveScrollbars,
                    n = "string" != typeof this.options.scrollbars,
                    r = [],
                    a = this;
                this.indicators = [], this.options.scrollbars && (this.options.scrollY && (e = {
                    el: o("v", i, this.options.scrollbars),
                    interactive: i,
                    defaultScrollbars: !0,
                    customStyle: n,
                    resize: this.options.resizeScrollbars,
                    shrink: this.options.shrinkScrollbars,
                    fade: this.options.fadeScrollbars,
                    listenX: !1
                }, this.wrapper.appendChild(e.el), r.push(e)), this.options.scrollX && (e = {
                    el: o("h", i, this.options.scrollbars),
                    interactive: i,
                    defaultScrollbars: !0,
                    customStyle: n,
                    resize: this.options.resizeScrollbars,
                    shrink: this.options.shrinkScrollbars,
                    fade: this.options.fadeScrollbars,
                    listenY: !1
                }, this.wrapper.appendChild(e.el), r.push(e))), this.options.indicators && (r = r.concat(this.options.indicators));
                for (var l = r.length; l--;) this.indicators.push(new s(this, r[l]));
                this.options.fadeScrollbars && (this.on("scrollEnd", function () {
                    t(function () {
                        this.fade()
                    })
                }), this.on("scrollCancel", function () {
                    t(function () {
                        this.fade()
                    })
                }), this.on("scrollStart", function () {
                    t(function () {
                        this.fade(1)
                    })
                }), this.on("beforeScrollStart", function () {
                    t(function () {
                        this.fade(1, !0)
                    })
                })), this.on("refresh", function () {
                    t(function () {
                        this.refresh()
                    })
                }), this.on("destroy", function () {
                    t(function () {
                        this.destroy()
                    }), delete this.indicators
                })
            },
            _initWheel: function () {
                a.addEvent(this.wrapper, "wheel", this), a.addEvent(this.wrapper, "mousewheel", this), a.addEvent(this.wrapper, "DOMMouseScroll", this), this.on("destroy", function () {
                    a.removeEvent(this.wrapper, "wheel", this), a.removeEvent(this.wrapper, "mousewheel", this), a.removeEvent(this.wrapper, "DOMMouseScroll", this)
                })
            },
            _wheel: function (t) {
                if (this.enabled) {
                    t.preventDefault(), t.stopPropagation();
                    var e, n, o, s, r = this;
                    if (void 0 === this.wheelTimeout && r._execEvent("scrollStart"), clearTimeout(this.wheelTimeout), this.wheelTimeout = setTimeout(function () {
                        r._execEvent("scrollEnd"), r.wheelTimeout = void 0
                    }, 400), "deltaX" in t) 1 === t.deltaMode ? (e = -t.deltaX * this.options.mouseWheelSpeed, n = -t.deltaY * this.options.mouseWheelSpeed) : (e = -t.deltaX, n = -t.deltaY);
                    else if ("wheelDeltaX" in t) e = t.wheelDeltaX / 120 * this.options.mouseWheelSpeed, n = t.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
                    else if ("wheelDelta" in t) e = n = t.wheelDelta / 120 * this.options.mouseWheelSpeed;
                    else {
                        if (!("detail" in t)) return;
                        e = n = -t.detail / 3 * this.options.mouseWheelSpeed
                    }
                    if (e *= this.options.invertWheelDirection, n *= this.options.invertWheelDirection, this.hasVerticalScroll || (e = n, n = 0), this.options.snap) return o = this.currentPage.pageX, s = this.currentPage.pageY, e > 0 ? o-- : 0 > e && o++ , n > 0 ? s-- : 0 > n && s++ , void this.goToPage(o, s);
                    o = this.x + i.round(this.hasHorizontalScroll ? e : 0), s = this.y + i.round(this.hasVerticalScroll ? n : 0), o > 0 ? o = 0 : o < this.maxScrollX && (o = this.maxScrollX), s > 0 ? s = 0 : s < this.maxScrollY && (s = this.maxScrollY), this.scrollTo(o, s, 0), this.options.probeType > 1 && this._execEvent("scroll")
                }
            },
            _initSnap: function () {
                this.currentPage = {}, "string" == typeof this.options.snap && (this.options.snap = this.scroller.querySelectorAll(this.options.snap)), this.on("refresh", function () {
                    var t, e, n, o, s, r, a = 0,
                        l = 0,
                        c = 0,
                        d = this.options.snapStepX || this.wrapperWidth,
                        h = this.options.snapStepY || this.wrapperHeight;
                    if (this.pages = [], this.wrapperWidth && this.wrapperHeight && this.scrollerWidth && this.scrollerHeight) {
                        if (this.options.snap === !0)
                            for (n = i.round(d / 2), o = i.round(h / 2); c > -this.scrollerWidth;) {
                                for (this.pages[a] = [], t = 0, s = 0; s > -this.scrollerHeight;) this.pages[a][t] = {
                                    x: i.max(c, this.maxScrollX),
                                    y: i.max(s, this.maxScrollY),
                                    width: d,
                                    height: h,
                                    cx: c - n,
                                    cy: s - o
                                }, s -= h, t++;
                                c -= d, a++
                            } else
                            for (r = this.options.snap, t = r.length, e = -1; t > a; a++)(0 === a || r[a].offsetLeft <= r[a - 1].offsetLeft) && (l = 0, e++), this.pages[l] || (this.pages[l] = []), c = i.max(-r[a].offsetLeft, this.maxScrollX), s = i.max(-r[a].offsetTop, this.maxScrollY), n = c - i.round(r[a].offsetWidth / 2), o = s - i.round(r[a].offsetHeight / 2), this.pages[l][e] = {
                                x: c,
                                y: s,
                                width: r[a].offsetWidth,
                                height: r[a].offsetHeight,
                                cx: n,
                                cy: o
                            }, c > this.maxScrollX && l++;
                        this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0), this.options.snapThreshold % 1 === 0 ? (this.snapThresholdX = this.options.snapThreshold, this.snapThresholdY = this.options.snapThreshold) : (this.snapThresholdX = i.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold), this.snapThresholdY = i.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold))
                    }
                }), this.on("flick", function () {
                    var t = this.options.snapSpeed || i.max(i.max(i.min(i.abs(this.x - this.startX), 1e3), i.min(i.abs(this.y - this.startY), 1e3)), 300);
                    this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, t)
                })
            },
            _nearestSnap: function (t, e) {
                if (!this.pages.length) return {
                    x: 0,
                    y: 0,
                    pageX: 0,
                    pageY: 0
                };
                var n = 0,
                    o = this.pages.length,
                    s = 0;
                if (i.abs(t - this.absStartX) < this.snapThresholdX && i.abs(e - this.absStartY) < this.snapThresholdY) return this.currentPage;
                for (t > 0 ? t = 0 : t < this.maxScrollX && (t = this.maxScrollX), e > 0 ? e = 0 : e < this.maxScrollY && (e = this.maxScrollY); o > n; n++)
                    if (t >= this.pages[n][0].cx) {
                        t = this.pages[n][0].x;
                        break
                    }
                for (o = this.pages[n].length; o > s; s++)
                    if (e >= this.pages[0][s].cy) {
                        e = this.pages[0][s].y;
                        break
                    }
                return n == this.currentPage.pageX && (n += this.directionX, 0 > n ? n = 0 : n >= this.pages.length && (n = this.pages.length - 1), t = this.pages[n][0].x), s == this.currentPage.pageY && (s += this.directionY, 0 > s ? s = 0 : s >= this.pages[0].length && (s = this.pages[0].length - 1), e = this.pages[0][s].y), {
                    x: t,
                    y: e,
                    pageX: n,
                    pageY: s
                }
            },
            goToPage: function (t, e, n, o) {
                o = o || this.options.bounceEasing, t >= this.pages.length ? t = this.pages.length - 1 : 0 > t && (t = 0), e >= this.pages[t].length ? e = this.pages[t].length - 1 : 0 > e && (e = 0);
                var s = this.pages[t][e].x,
                    r = this.pages[t][e].y;
                n = void 0 === n ? this.options.snapSpeed || i.max(i.max(i.min(i.abs(s - this.x), 1e3), i.min(i.abs(r - this.y), 1e3)), 300) : n, this.currentPage = {
                    x: s,
                    y: r,
                    pageX: t,
                    pageY: e
                }, this.scrollTo(s, r, n, o)
            },
            next: function (t, e) {
                var i = this.currentPage.pageX,
                    n = this.currentPage.pageY;
                i++ , i >= this.pages.length && this.hasVerticalScroll && (i = 0, n++), this.goToPage(i, n, t, e)
            },
            prev: function (t, e) {
                var i = this.currentPage.pageX,
                    n = this.currentPage.pageY;
                i-- , 0 > i && this.hasVerticalScroll && (i = 0, n--), this.goToPage(i, n, t, e)
            },
            _initKeys: function (e) {
                var i, n = {
                    pageUp: 33,
                    pageDown: 34,
                    end: 35,
                    home: 36,
                    left: 37,
                    up: 38,
                    right: 39,
                    down: 40
                };
                if ("object" == typeof this.options.keyBindings)
                    for (i in this.options.keyBindings) "string" == typeof this.options.keyBindings[i] && (this.options.keyBindings[i] = this.options.keyBindings[i].toUpperCase().charCodeAt(0));
                else this.options.keyBindings = {};
                for (i in n) this.options.keyBindings[i] = this.options.keyBindings[i] || n[i];
                a.addEvent(t, "keydown", this), this.on("destroy", function () {
                    a.removeEvent(t, "keydown", this)
                })
            },
            _key: function (t) {
                if (this.enabled) {
                    var e, n = this.options.snap,
                        o = n ? this.currentPage.pageX : this.x,
                        s = n ? this.currentPage.pageY : this.y,
                        r = a.getTime(),
                        l = this.keyTime || 0,
                        c = .25;
                    switch (this.options.useTransition && this.isInTransition && (e = this.getComputedPosition(), this._translate(i.round(e.x), i.round(e.y)), this.isInTransition = !1), this.keyAcceleration = 200 > r - l ? i.min(this.keyAcceleration + c, 50) : 0, t.keyCode) {
                        case this.options.keyBindings.pageUp:
                            this.hasHorizontalScroll && !this.hasVerticalScroll ? o += n ? 1 : this.wrapperWidth : s += n ? 1 : this.wrapperHeight;
                            break;
                        case this.options.keyBindings.pageDown:
                            this.hasHorizontalScroll && !this.hasVerticalScroll ? o -= n ? 1 : this.wrapperWidth : s -= n ? 1 : this.wrapperHeight;
                            break;
                        case this.options.keyBindings.end:
                            o = n ? this.pages.length - 1 : this.maxScrollX, s = n ? this.pages[0].length - 1 : this.maxScrollY;
                            break;
                        case this.options.keyBindings.home:
                            o = 0, s = 0;
                            break;
                        case this.options.keyBindings.left:
                            o += n ? -1 : 5 + this.keyAcceleration >> 0;
                            break;
                        case this.options.keyBindings.up:
                            s += n ? 1 : 5 + this.keyAcceleration >> 0;
                            break;
                        case this.options.keyBindings.right:
                            o -= n ? -1 : 5 + this.keyAcceleration >> 0;
                            break;
                        case this.options.keyBindings.down:
                            s -= n ? 1 : 5 + this.keyAcceleration >> 0;
                            break;
                        default:
                            return
                    }
                    if (n) return void this.goToPage(o, s);
                    o > 0 ? (o = 0, this.keyAcceleration = 0) : o < this.maxScrollX && (o = this.maxScrollX, this.keyAcceleration = 0), s > 0 ? (s = 0, this.keyAcceleration = 0) : s < this.maxScrollY && (s = this.maxScrollY, this.keyAcceleration = 0), this.scrollTo(o, s, 0), this.keyTime = r
                }
            },
            _animate: function (t, e, i, n) {
                function o() {
                    var u, p, f, m = a.getTime();
                    return m >= h ? (s.isAnimating = !1, s._translate(t, e), void (s.resetPosition(s.options.bounceTime) || s._execEvent("scrollEnd"))) : (m = (m - d) / i, f = n(m), u = (t - l) * f + l, p = (e - c) * f + c, s._translate(u, p), s.isAnimating && r(o), void (3 == s.options.probeType && s._execEvent("scroll")))
                }
                var s = this,
                    l = this.x,
                    c = this.y,
                    d = a.getTime(),
                    h = d + i;
                this.isAnimating = !0, o()
            },
            handleEvent: function (t) {
                switch (t.type) {
                    case "touchstart":
                    case "pointerdown":
                    case "MSPointerDown":
                    case "mousedown":
                        this._start(t);
                        break;
                    case "touchmove":
                    case "pointermove":
                    case "MSPointerMove":
                    case "mousemove":
                        this._move(t);
                        break;
                    case "touchend":
                    case "pointerup":
                    case "MSPointerUp":
                    case "mouseup":
                    case "touchcancel":
                    case "pointercancel":
                    case "MSPointerCancel":
                    case "mousecancel":
                        this._end(t);
                        break;
                    case "orientationchange":
                    case "resize":
                        this._resize();
                        break;
                    case "transitionend":
                    case "webkitTransitionEnd":
                    case "oTransitionEnd":
                    case "MSTransitionEnd":
                        this._transitionEnd(t);
                        break;
                    case "wheel":
                    case "DOMMouseScroll":
                    case "mousewheel":
                        this._wheel(t);
                        break;
                    case "keydown":
                        this._key(t);
                        break;
                    case "click":
                        t._constructed || (t.preventDefault(), t.stopPropagation())
                }
            }
        }, s.prototype = {
            handleEvent: function (t) {
                switch (t.type) {
                    case "touchstart":
                    case "pointerdown":
                    case "MSPointerDown":
                    case "mousedown":
                        this._start(t);
                        break;
                    case "touchmove":
                    case "pointermove":
                    case "MSPointerMove":
                    case "mousemove":
                        this._move(t);
                        break;
                    case "touchend":
                    case "pointerup":
                    case "MSPointerUp":
                    case "mouseup":
                    case "touchcancel":
                    case "pointercancel":
                    case "MSPointerCancel":
                    case "mousecancel":
                        this._end(t)
                }
            },
            destroy: function () {
                this.options.interactive && (a.removeEvent(this.indicator, "touchstart", this), a.removeEvent(this.indicator, a.prefixPointerEvent("pointerdown"), this), a.removeEvent(this.indicator, "mousedown", this), a.removeEvent(t, "touchmove", this), a.removeEvent(t, a.prefixPointerEvent("pointermove"), this), a.removeEvent(t, "mousemove", this), a.removeEvent(t, "touchend", this), a.removeEvent(t, a.prefixPointerEvent("pointerup"), this), a.removeEvent(t, "mouseup", this)), this.options.defaultScrollbars && this.wrapper.parentNode.removeChild(this.wrapper)
            },
            _start: function (e) {
                var i = e.touches ? e.touches[0] : e;
                e.preventDefault(), e.stopPropagation(), this.transitionTime(), this.initiated = !0, this.moved = !1, this.lastPointX = i.pageX, this.lastPointY = i.pageY, this.startTime = a.getTime(), this.options.disableTouch || a.addEvent(t, "touchmove", this), this.options.disablePointer || a.addEvent(t, a.prefixPointerEvent("pointermove"), this), this.options.disableMouse || a.addEvent(t, "mousemove", this), this.scroller._execEvent("beforeScrollStart")
            },
            _move: function (t) {
                var e, i, n, o, s = t.touches ? t.touches[0] : t,
                    r = a.getTime();
                this.moved || this.scroller._execEvent("scrollStart"), this.moved = !0, e = s.pageX - this.lastPointX, this.lastPointX = s.pageX, i = s.pageY - this.lastPointY, this.lastPointY = s.pageY, n = this.x + e, o = this.y + i, this._pos(n, o), 1 == this.scroller.options.probeType && r - this.startTime > 300 ? (this.startTime = r, this.scroller._execEvent("scroll")) : this.scroller.options.probeType > 1 && this.scroller._execEvent("scroll"), t.preventDefault(), t.stopPropagation()
            },
            _end: function (e) {
                if (this.initiated) {
                    if (this.initiated = !1, e.preventDefault(), e.stopPropagation(), a.removeEvent(t, "touchmove", this), a.removeEvent(t, a.prefixPointerEvent("pointermove"), this), a.removeEvent(t, "mousemove", this), this.scroller.options.snap) {
                        var n = this.scroller._nearestSnap(this.scroller.x, this.scroller.y),
                            o = this.options.snapSpeed || i.max(i.max(i.min(i.abs(this.scroller.x - n.x), 1e3), i.min(i.abs(this.scroller.y - n.y), 1e3)), 300);
                        (this.scroller.x != n.x || this.scroller.y != n.y) && (this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = n, this.scroller.scrollTo(n.x, n.y, o, this.scroller.options.bounceEasing))
                    }
                    this.moved && this.scroller._execEvent("scrollEnd")
                }
            },
            transitionTime: function (t) {
                t = t || 0, this.indicatorStyle[a.style.transitionDuration] = t + "ms", !t && a.isBadAndroid && (this.indicatorStyle[a.style.transitionDuration] = "0.001s")
            },
            transitionTimingFunction: function (t) {
                this.indicatorStyle[a.style.transitionTimingFunction] = t
            },
            refresh: function () {
                this.transitionTime(), this.options.listenX && !this.options.listenY ? this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.indicatorStyle.display = this.scroller.hasVerticalScroll ? "block" : "none" : this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none", this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ? (a.addClass(this.wrapper, "iScrollBothScrollbars"), a.removeClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "8px" : this.wrapper.style.bottom = "8px")) : (a.removeClass(this.wrapper, "iScrollBothScrollbars"), a.addClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "2px" : this.wrapper.style.bottom = "2px"));
                this.wrapper.offsetHeight;
                this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth, this.options.resize ? (this.indicatorWidth = i.max(i.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px") : this.indicatorWidth = this.indicator.clientWidth, this.maxPosX = this.wrapperWidth - this.indicatorWidth, "clip" == this.options.shrink ? (this.minBoundaryX = -this.indicatorWidth + 8, this.maxBoundaryX = this.wrapperWidth - 8) : (this.minBoundaryX = 0, this.maxBoundaryX = this.maxPosX), this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX), this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight, this.options.resize ? (this.indicatorHeight = i.max(i.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px") : this.indicatorHeight = this.indicator.clientHeight, this.maxPosY = this.wrapperHeight - this.indicatorHeight, "clip" == this.options.shrink ? (this.minBoundaryY = -this.indicatorHeight + 8, this.maxBoundaryY = this.wrapperHeight - 8) : (this.minBoundaryY = 0, this.maxBoundaryY = this.maxPosY), this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY), this.updatePosition()
            },
            updatePosition: function () {
                var t = this.options.listenX && i.round(this.sizeRatioX * this.scroller.x) || 0,
                    e = this.options.listenY && i.round(this.sizeRatioY * this.scroller.y) || 0;
                this.options.ignoreBoundaries || (t < this.minBoundaryX ? ("scale" == this.options.shrink && (this.width = i.max(this.indicatorWidth + t, 8), this.indicatorStyle.width = this.width + "px"), t = this.minBoundaryX) : t > this.maxBoundaryX ? "scale" == this.options.shrink ? (this.width = i.max(this.indicatorWidth - (t - this.maxPosX), 8), this.indicatorStyle.width = this.width + "px", t = this.maxPosX + this.indicatorWidth - this.width) : t = this.maxBoundaryX : "scale" == this.options.shrink && this.width != this.indicatorWidth && (this.width = this.indicatorWidth, this.indicatorStyle.width = this.width + "px"), e < this.minBoundaryY ? ("scale" == this.options.shrink && (this.height = i.max(this.indicatorHeight + 3 * e, 8), this.indicatorStyle.height = this.height + "px"), e = this.minBoundaryY) : e > this.maxBoundaryY ? "scale" == this.options.shrink ? (this.height = i.max(this.indicatorHeight - 3 * (e - this.maxPosY), 8), this.indicatorStyle.height = this.height + "px", e = this.maxPosY + this.indicatorHeight - this.height) : e = this.maxBoundaryY : "scale" == this.options.shrink && this.height != this.indicatorHeight && (this.height = this.indicatorHeight, this.indicatorStyle.height = this.height + "px")), this.x = t, this.y = e, this.scroller.options.useTransform ? this.indicatorStyle[a.style.transform] = "translate(" + t + "px," + e + "px)" + this.scroller.translateZ : (this.indicatorStyle.left = t + "px", this.indicatorStyle.top = e + "px")
            },
            _pos: function (t, e) {
                0 > t ? t = 0 : t > this.maxPosX && (t = this.maxPosX), 0 > e ? e = 0 : e > this.maxPosY && (e = this.maxPosY), t = this.options.listenX ? i.round(t / this.sizeRatioX) : this.scroller.x, e = this.options.listenY ? i.round(e / this.sizeRatioY) : this.scroller.y, this.scroller.scrollTo(t, e)
            },
            fade: function (t, e) {
                if (!e || this.visible) {
                    clearTimeout(this.fadeTimeout), this.fadeTimeout = null;
                    var i = t ? 250 : 500,
                        n = t ? 0 : 300;
                    t = t ? "1" : "0", this.wrapperStyle[a.style.transitionDuration] = i + "ms", this.fadeTimeout = setTimeout(function (t) {
                        this.wrapperStyle.opacity = t, this.visible = +t
                    }.bind(this, t), n)
                }
            }
        }, n.utils = a, "undefined" != typeof module && module.exports ? module.exports = n : t.IScroll = n
    }(window, document, Math), define("iscroll", function () { }), define("../src/sublayouts/_helpers/touch-scroller/touch-scroller", ["lib/utils", "iscroll"], function (t) {
        "use strict";
        var e = function () {
            return this
        };
        return e.prototype.init = function (e) {
            this.$el = e, this.scrollify = t.isTouchDevice(), this.$content = this.$el.find("div:first-child"), this.scrollify ? (this.loadScroller(), this.$el.addClass("touch-scroller-wrapper"), this.$content.addClass("touch-scroller-content")) : this.$el.addClass("touch-scroller-overflow")
        }, e.prototype.loadScroller = function () {
            var t = new IScroll(this.$el[0], {
                mouseWheel: !0,
                disableMouse: !1,
                scrollX: !1,
                scrollY: !0,
                momentum: !0,
                snap: !1,
                keyBindings: !0,
                click: !0,
                tap: !0
            });
            this.iscroll = t, this.refresh()
        }, e.prototype.refresh = function () {
            this.scrollify && this.iscroll.refresh()
        }, e
    }), define("../src/sublayouts/m1-hero/m1-hero", ["jquery", "slick", "lib/utils"], function (t, e, i) {
        "use strict";
        var n = function (t) {
            return this.$component = t, this
        };
        return n.prototype.init = function () {
            this.$M1_slider = t(".m1-hero__carousel");
            var e = (t(".m1-hero__carousel-nav-inner"), t(".m1-hero__carousel-button--prev"), t(".m1-hero__carousel-button--next"), t("body"));
            if (t(".m1-hero__carousel-slide").length > 1) {
                var i = this;
                this.$M1_slider.on("init", function (t) {
                    i.display()
                }), e.on("mouseover", ".m1-hero__carousel", function () {
                    i.$M1_slider.slick("pause"), t(".slick-arrow").show()
                }), e.on("mouseover", ".slick-arrow", function () {
                    i.$M1_slider.slick("pause"), t(".slick-arrow").show()
                }), e.on("mouseleave", ".m1-hero__carousel", function () {
                    i.$M1_slider.slick("play"), t(".slick-arrow").hide()
                }), this.$M1_slider.slick({
                    arrows: !0,
                    dots: !0,
                    infinite: !0,
                    speed: 750,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: !0,
                    autoplaySpeed: 3e3,
                    pauseOnHover: !0,
                    adaptiveHeight: !0,
                    nextArrow: ".m1-hero__carousel-button--next",
                    prevArrow: ".m1-hero__carousel-button--prev",
                    rtl: "rtl" == t("html").attr("dir")
                })
            } else this.display()
        }, n.prototype.display = function () {
            t(".m1-hero__carousel-slide-image, .m1-hero__carousel-slide-gradient").each(function () {
                var e = t(this);
                e.css({
                    backgroundImage: "url('" + t(this).data("src") + "')"
                }), i.isLessThanIE9() && (e.css("filter", "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + t(this).data("src") + "', sizingMethod='scale')"), e.css("-ms-filter", "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + t(this).data("src") + "', sizingMethod='scale')"))
            }), t(".m1-hero__carousel-slide-gradient").each(function () {
                var e = t(this);
                e.css({
                    background: "rgba(0, 0, 0, 0.4)"
                })
            }), this.$M1_slider.css({
                top: 0,
                opacity: 1,
                position: "relative"
            })
        }, n
    }), define("../src/sublayouts/m12-masthead/m12-masthead-desktop-menu", ["jquery", "lib/utils"], function (t, e) {
        "use strict";
        var i, n = function () {
            this.initialized = !1
        };
        return n.prototype.init = function (e) {
            this.initialized || (this.$masthead = e, this.$myAccountSection = this.$masthead.find("[data-myaccount-section]"), this.$activeSectionNav = this.$masthead.find(".m12-section-nav--active"), this.$menubar = this.$masthead.find("[data-m12-bar-content]"), this.$sections = this.$activeSectionNav.find("[data-section]").add(this.$myAccountSection), this.$searchField = this.$masthead.find("[data-search-field]"), this.$subsections = this.$masthead.find(".m12-subsection"), this.sectionFocusedClassname = "m12-section-nav__item--focused", this.sectionExpandedClassname = "m12-section-nav__item--expanded", this.activeSubsectionClassname = "m12-subsection--active", this.toggleButtonClassname = "m12-section__toggle", this.toggleButtonOpenClassname = "m12-section__toggle--open", this.subsectionClass = ".m12-subsection", this.subsectionActiveClassname = "m12-subsection--active", this.sectionNavItemHoverClassname = "m12-section-nav__item--hover", this.configureUI(), this.polyfills(), this.initialized = !0), null != navigator.userAgent.match(/iPad/i) && t(".m12-section-nav__link").on("click", function (e) {
                e.preventDefault(), t(this).trigger("hover")
            })
        }, n.prototype.polyfills = function () {
            if (e.isLessThanIE10()) {
                var i = this.$searchField.attr("aria-label");
                this.$searchField.val(i), this.$searchField.on("focus", function () {
                    t(this).val() === i && t(this).val("")
                }), this.$searchField.on("blur", function () {
                    "" === t(this).val().replace(/^\s+|\s+$/g, "") && t(this).val(i)
                })
            }
        }, n.prototype.configureUI = function () {
            var e = this;
            t.each(this.$sections, function () {
                var i = t(this),
                    n = t(this).find("[data-section-link]").eq(0),
                    o = t('<button aria-label="Toggle menu" class="m12-section__toggle"><span class="aria-only">Toggle Menu</span></button>');
                "true" === n.attr("aria-haspopup") && (o.on("click", function () {
                    var t = n.attr("aria-expanded");
                    i.toggleClass(e.sectionExpandedClassname), n.attr("aria-expanded", "false" === t), o.toggleClass(e.toggleButtonOpenClassname)
                }), o.on("focus", function () {
                    i.addClass(e.sectionFocusedClassname)
                }), t(o).insertAfter(n)), n.on("focus", function () {
                    e.resetSectionNav(), i.addClass(e.sectionFocusedClassname)
                }), n.on("blur mouseover", function (i) {
                    "blur" === i.type && t(i.relatedTarget).hasClass("m12-section__toggle") || e.resetSectionNav()
                })
            }), this.$searchField.on("focus", function () {
                e.resetSectionNav()
            })
        }, n.prototype.resetSectionNav = function () {
            this.$sections.removeClass(this.sectionFocusedClassname).removeClass(this.sectionExpandedClassname)
        }, i = new n
    }),
    function (t, e) {
        "object" == typeof exports && exports && "string" != typeof exports.nodeName ? e(exports) : "function" == typeof define && define.amd ? define("mustache", ["exports"], e) : (t.Mustache = {}, e(Mustache))
    }(this, function (t) {
        function e(t) {
            return "function" == typeof t
        }

        function i(t) {
            return m(t) ? "array" : typeof t
        }

        function n(t) {
            return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        }

        function o(t, e) {
            return null != t && "object" == typeof t && e in t
        }

        function s(t, e) {
            return g.call(t, e)
        }

        function r(t) {
            return !s(v, t)
        }

        function a(t) {
            return String(t).replace(/[&<>"'\/]/g, function (t) {
                return y[t]
            })
        }

        function l(e, i) {
            function o() {
                if (v && !y)
                    for (; g.length;) delete f[g.pop()];
                else g = [];
                v = !1, y = !1
            }

            function s(t) {
                if ("string" == typeof t && (t = t.split(x, 2)), !m(t) || 2 !== t.length) throw new Error("Invalid tags: " + t);
                a = new RegExp(n(t[0]) + "\\s*"), l = new RegExp("\\s*" + n(t[1])), u = new RegExp("\\s*" + n("}" + t[1]))
            }
            if (!e) return [];
            var a, l, u, p = [],
                f = [],
                g = [],
                v = !1,
                y = !1;
            s(i || t.tags);
            for (var C, T, $, S, P, M, A = new h(e); !A.eos();) {
                if (C = A.pos, $ = A.scanUntil(a))
                    for (var E = 0, L = $.length; L > E; ++E) S = $.charAt(E), r(S) ? g.push(f.length) : y = !0, f.push(["text", S, C, C + 1]), C += 1, "\n" === S && o();
                if (!A.scan(a)) break;
                if (v = !0, T = A.scan(_) || "name", A.scan(b), "=" === T ? ($ = A.scanUntil(w), A.scan(w), A.scanUntil(l)) : "{" === T ? ($ = A.scanUntil(u), A.scan(k), A.scanUntil(l), T = "&") : $ = A.scanUntil(l), !A.scan(l)) throw new Error("Unclosed tag at " + A.pos);
                if (P = [T, $, C, A.pos], f.push(P), "#" === T || "^" === T) p.push(P);
                else if ("/" === T) {
                    if (M = p.pop(), !M) throw new Error('Unopened section "' + $ + '" at ' + C);
                    if (M[1] !== $) throw new Error('Unclosed section "' + M[1] + '" at ' + C)
                } else "name" === T || "{" === T || "&" === T ? y = !0 : "=" === T && s($)
            }
            if (M = p.pop()) throw new Error('Unclosed section "' + M[1] + '" at ' + A.pos);
            return d(c(f))
        }

        function c(t) {
            for (var e, i, n = [], o = 0, s = t.length; s > o; ++o) e = t[o], e && ("text" === e[0] && i && "text" === i[0] ? (i[1] += e[1], i[3] = e[3]) : (n.push(e), i = e));
            return n
        }

        function d(t) {
            for (var e, i, n = [], o = n, s = [], r = 0, a = t.length; a > r; ++r) switch (e = t[r], e[0]) {
                case "#":
                case "^":
                    o.push(e), s.push(e), o = e[4] = [];
                    break;
                case "/":
                    i = s.pop(), i[5] = e[2], o = s.length > 0 ? s[s.length - 1][4] : n;
                    break;
                default:
                    o.push(e)
            }
            return n
        }

        function h(t) {
            this.string = t, this.tail = t, this.pos = 0
        }

        function u(t, e) {
            this.view = t, this.cache = {
                ".": this.view
            }, this.parent = e
        }

        function p() {
            this.cache = {}
        }
        var f = Object.prototype.toString,
            m = Array.isArray || function (t) {
                return "[object Array]" === f.call(t)
            },
            g = RegExp.prototype.test,
            v = /\S/,
            y = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
                "/": "&#x2F;"
            },
            b = /\s*/,
            x = /\s+/,
            w = /\s*=/,
            k = /\s*\}/,
            _ = /#|\^|\/|>|\{|&|=|!/;
        h.prototype.eos = function () {
            return "" === this.tail
        }, h.prototype.scan = function (t) {
            var e = this.tail.match(t);
            if (!e || 0 !== e.index) return "";
            var i = e[0];
            return this.tail = this.tail.substring(i.length), this.pos += i.length, i
        }, h.prototype.scanUntil = function (t) {
            var e, i = this.tail.search(t);
            switch (i) {
                case -1:
                    e = this.tail, this.tail = "";
                    break;
                case 0:
                    e = "";
                    break;
                default:
                    e = this.tail.substring(0, i), this.tail = this.tail.substring(i)
            }
            return this.pos += e.length, e
        }, u.prototype.push = function (t) {
            return new u(t, this)
        }, u.prototype.lookup = function (t) {
            var i, n = this.cache;
            if (n.hasOwnProperty(t)) i = n[t];
            else {
                for (var s, r, a = this, l = !1; a;) {
                    if (t.indexOf(".") > 0)
                        for (i = a.view, s = t.split("."), r = 0; null != i && r < s.length;) r === s.length - 1 && (l = o(i, s[r])), i = i[s[r++]];
                    else i = a.view[t], l = o(a.view, t);
                    if (l) break;
                    a = a.parent
                }
                n[t] = i
            }
            return e(i) && (i = i.call(this.view)), i
        }, p.prototype.clearCache = function () {
            this.cache = {}
        }, p.prototype.parse = function (t, e) {
            var i = this.cache,
                n = i[t];
            return null == n && (n = i[t] = l(t, e)), n
        }, p.prototype.render = function (t, e, i) {
            var n = this.parse(t),
                o = e instanceof u ? e : new u(e);
            return this.renderTokens(n, o, i, t)
        }, p.prototype.renderTokens = function (t, e, i, n) {
            for (var o, s, r, a = "", l = 0, c = t.length; c > l; ++l) r = void 0, o = t[l], s = o[0], "#" === s ? r = this.renderSection(o, e, i, n) : "^" === s ? r = this.renderInverted(o, e, i, n) : ">" === s ? r = this.renderPartial(o, e, i, n) : "&" === s ? r = this.unescapedValue(o, e) : "name" === s ? r = this.escapedValue(o, e) : "text" === s && (r = this.rawValue(o)), void 0 !== r && (a += r);
            return a
        }, p.prototype.renderSection = function (t, i, n, o) {
            function s(t) {
                return r.render(t, i, n)
            }
            var r = this,
                a = "",
                l = i.lookup(t[1]);
            if (l) {
                if (m(l))
                    for (var c = 0, d = l.length; d > c; ++c) a += this.renderTokens(t[4], i.push(l[c]), n, o);
                else if ("object" == typeof l || "string" == typeof l || "number" == typeof l) a += this.renderTokens(t[4], i.push(l), n, o);
                else if (e(l)) {
                    if ("string" != typeof o) throw new Error("Cannot use higher-order sections without the original template");
                    l = l.call(i.view, o.slice(t[3], t[5]), s), null != l && (a += l)
                } else a += this.renderTokens(t[4], i, n, o);
                return a
            }
        }, p.prototype.renderInverted = function (t, e, i, n) {
            var o = e.lookup(t[1]);
            return !o || m(o) && 0 === o.length ? this.renderTokens(t[4], e, i, n) : void 0
        }, p.prototype.renderPartial = function (t, i, n) {
            if (n) {
                var o = e(n) ? n(t[1]) : n[t[1]];
                return null != o ? this.renderTokens(this.parse(o), i, n, o) : void 0
            }
        }, p.prototype.unescapedValue = function (t, e) {
            var i = e.lookup(t[1]);
            return null != i ? i : void 0
        }, p.prototype.escapedValue = function (e, i) {
            var n = i.lookup(e[1]);
            return null != n ? t.escape(n) : void 0
        }, p.prototype.rawValue = function (t) {
            return t[1]
        }, t.name = "mustache.js", t.version = "2.2.0", t.tags = ["{{", "}}"];
        var C = new p;
        t.clearCache = function () {
            return C.clearCache()
        }, t.parse = function (t, e) {
            return C.parse(t, e)
        }, t.render = function (t, e, n) {
            if ("string" != typeof t) throw new TypeError('Invalid template! Template should be a "string" but "' + i(t) + '" was given as the first argument for mustache#render(template, view, partials)');
            return C.render(t, e, n)
        }, t.to_html = function (i, n, o, s) {
            var r = t.render(i, n, o);
            return e(s) ? void s(r) : r
        }, t.escape = a, t.Scanner = h, t.Context = u, t.Writer = p
    }), define("components/_helpers/touch-scroller/touch-scroller", ["lib/utils", "iscroll"], function (t) {
        "use strict";
        var e = function () {
            return this
        };
        return e.prototype.init = function (e) {
            this.$el = e, this.scrollify = t.isTouchDevice(), this.$content = this.$el.find("div:first-child"), this.scrollify ? (this.loadScroller(), this.$el.addClass("touch-scroller-wrapper"), this.$content.addClass("touch-scroller-content")) : this.$el.addClass("touch-scroller-overflow")
        }, e.prototype.loadScroller = function () {
            var t = new IScroll(this.$el[0], {
                mouseWheel: !0,
                disableMouse: !1,
                scrollX: !1,
                scrollY: !0,
                momentum: !0,
                snap: !1,
                keyBindings: !0,
                click: !0,
                tap: !0
            });
            this.iscroll = t, this.refresh()
        }, e.prototype.refresh = function () {
            this.scrollify && this.iscroll.refresh()
        }, e
    }), define("text", {
        load: function (t) {
            throw new Error("Dynamic load not allowed: " + t)
        }
    }), define("text!components/m12-masthead/_m12-masthead-mobile-menu.hbs", [], function () {
        return '<div class="mobile-menu" data-mobile-menu="true">\r\n\r\n	<div class="mobile-menu-navs">\r\n\r\n		<div class="mobile-menu-panel mobile-menu-panel--level1">\r\n\r\n			<div data-panel-content-level1="true" class="mobile-menu-panel__content">\r\n\r\n				<ul data-mobile-menu-level1-nav="true" class="m12-section-nav">\r\n\r\n				</ul>\r\n\r\n			</div>\r\n\r\n		</div>\r\n\r\n		<div class="mobile-menu-panel mobile-menu-panel--level2">\r\n\r\n			<button class="mobile-menu__header" data-mobile-menu-level2-header="true"></button>\r\n\r\n			<div data-panel-content="true" class="mobile-menu-panel__content">\r\n\r\n				<ul data-mobile-menu-level2-nav="true" class="m12-section-nav">\r\n\r\n				</ul>\r\n\r\n			</div>\r\n\r\n		</div>\r\n\r\n		<div class="mobile-menu-panel mobile-menu-panel--level3">\r\n\r\n			<button class="mobile-menu__header" data-mobile-menu-level3-header="true"></button>\r\n\r\n			<div data-panel-content="true" class="mobile-menu-panel__content">\r\n\r\n				<div data-mobile-menu-level3-nav="true">\r\n\r\n				</div>\r\n\r\n			</div>\r\n\r\n		</div>\r\n\r\n	</div>\r\n\r\n	{{^is_sap}}\r\n	<div class="mobile-menu__accessibility" data-mobile-menu-accessibility="true">\r\n\r\n		<button class="mobile-menu__header" data-mobile-menu-accessibility-header="true">Accessibility</button>\r\n\r\n		<div data-panel-content="true" class="mobile-menu-panel__content">\r\n\r\n			<div data-mobile-accessibility-panel="true">\r\n\r\n			</div>\r\n\r\n		</div>\r\n\r\n	</div>\r\n\r\n	<div class="mobile-menu-search" data-mobile-search-panel="true">\r\n\r\n	</div>\r\n\r\n	{{/is_sap}}\r\n\r\n	<div class="mobile-menu__footer" data-mobile-menu-footer="true">\r\n\r\n		<div class="mobile-menu__myaccount" data-mobile-menu-myaccount="true">\r\n			<a data-segment-link="true" data-label="Home" class="m12-segment-nav__link m12-segment-nav__link--Home" href="#">\r\n				<img src="/../images/home_white.png">\r\n			</a>\r\n		</div>\r\n\r\n		{{^is_sap}}\r\n\r\n		<div class="mobile-menu__tools" data-mobile-menu-tools="true">\r\n\r\n			<div class="mobile-menu__tool" data-language-link="true"></div>\r\n\r\n			<div class="mobile-menu__tool">\r\n				<button data-accessibility-button="true" class="mobile-menu__tool-button mobile-menu__tool-button--accessibility" aria-label="Accessibility"></button>\r\n			</div>\r\n\r\n			<div class="mobile-menu__tool">\r\n				<button data-search-button="true" class="mobile-menu__tool-button mobile-menu__tool-button--search" aria-label="Search"></button>\r\n			</div>\r\n\r\n		</div>\r\n\r\n		{{/is_sap}}\r\n\r\n	</div>\r\n\r\n</div>\r\n\r\n';
    }), define("../src/sublayouts/m12-masthead/m12-masthead-mobile-menu", ["jquery", "mustache", "breakpoint", "lib/utils", "mask", "components/_helpers/touch-scroller/touch-scroller", "text!components/m12-masthead/_m12-masthead-mobile-menu.hbs"], function (t, e, i, n, o, s, r) {
        "use strict";
        var a, l = function () {
            this.initialized = !1
        };
        return l.prototype.init = function (e) {
            if (!this.initialized) {
                this.$masthead = e, this.$segmentNav = this.$masthead.find("[data-segment-nav]"), this.$segmentLinks = this.$masthead.find("[data-segment-link]"), this.$sectionNavs = this.$masthead.find("[data-section-nav]"), this.$accessibilityContent = this.$masthead.find("[data-accessibility-content]"), this.$myAccountLink = this.$masthead.find("[data-m12-myaccount-link]"), this.$myAccountLogoutLink = this.$masthead.find("[data-myaccount-logout]"), this.$myAccountPostLoginNav = this.$masthead.find("[data-myaccount-postlogin-nav]"), this.$languageLink = this.$masthead.find("[data-m12-lang-link]"), this.$barContent = this.$masthead.find("[data-m12-bar-content]"), this.$menuButton = t('<button class="m12-mobile-menu-button" data-menu-button="true"></button>'), this.$closeButton = t('<button class="mobile-menu-closebtn" data-mobile-menu-close-button="true"></button>'), this.$searchContent = this.$masthead.find("[data-search]"), this.mobileMenuActiveClassname = "mobile-menu--active", this.mobielMenuActiveCloseClassname = "mobile-menu-closebtn--active", this.mobileMenuLevel2Classname = "mobile-menu-panel--level2-open", this.mobileMenuLevel3Classname = "mobile-menu-panel--level3-open", this.mobileMenuAccessibilityClassname = "mobile-menu--accessibility-open", this.labels = e.data("labels"), this.theme = e.data("theme"), this.isSAP = e.data("sap") === !0, this.open = !1, this.maxWidth = 440, this.addMenu(), this.$mobileMenu = t('[data-mobile-menu="true"]'), this.$level1Nav = this.$mobileMenu.find("[data-mobile-menu-level1-nav]"), this.$level2Nav = this.$mobileMenu.find("[data-mobile-menu-level2-nav]"), this.$level3Nav = this.$mobileMenu.find("[data-mobile-menu-level3-nav]"), this.$accessibilityPanel = this.$mobileMenu.find("[data-mobile-accessibility-panel]"), this.$languageLinkContainer = this.$mobileMenu.find("[data-language-link]"), this.$searchPanel = this.$mobileMenu.find("[data-mobile-search-panel]"), this.$level2Header = this.$mobileMenu.find("[data-mobile-menu-level2-header]"), this.$level3Header = this.$mobileMenu.find("[data-mobile-menu-level3-header]"), this.$accessibilityMobileContent = this.$mobileMenu.find("[data-mobile-menu-accessibility]"), this.$accessibilityHeader = this.$mobileMenu.find("[data-mobile-menu-accessibility-header]"), this.$myAccount = this.$mobileMenu.find("[data-mobile-menu-myaccount]"), this.$accessibilityButton = this.$mobileMenu.find("[data-accessibility-button]"), this.$searchButton = this.$mobileMenu.find("[data-search-button]"), this.$footer = this.$mobileMenu.find("[data-mobile-menu-footer]"), this.$contentPanels = this.$mobileMenu.find("[data-panel-content]"), this.$contentPanelLevel1 = this.$mobileMenu.find("[data-panel-content-level1]"), this.postLogin = this.$myAccountPostLoginNav.length > 0, this.segments = this.mapSegments(), this.sections = this.mapSections(), this.buildMenu(), this.$searchField = this.$mobileMenu.find("[data-search-field]"), this.$menuButton.on("click", t.proxy(this.openMenu, this)), this.$closeButton.on("click", t.proxy(this.closeMenu, this)), this.$level2Header.on("click", t.proxy(this.closeLevel2Menu, this)), this.$level3Header.on("click", t.proxy(this.closeLevel3Menu, this)), this.$accessibilityHeader.on("click", t.proxy(this.toggleAccessibilityPanel, this)), this.$accessibilityButton.on("click", t.proxy(this.toggleAccessibilityPanel, this)), this.$searchButton.on("click", t.proxy(this.openSearch, this)), t(window).on("orientationchange resize", t.proxy(this.setStyle, this)), t(i).on("change", t.proxy(this.respond, this)), this.initialized = !0;
                var n = t(".m12-section-nav").find(".m12-segment-nav__link--Home").attr("href");
                t(".mobile-menu__myaccount").find(".m12-segment-nav__link--Home").attr("href", n)
            }
        }, l.prototype.addMenu = function () {
            var i = e.render(r, {
                is_sap: this.isSAP
            });
            this.$barContent.prepend(this.$menuButton), this.$menuButton.text(this.labels.menu), t("body").append(i), t("body").append(t(this.$closeButton)), this.$closeButton.attr("aria-label", this.labels.close)
        }, l.prototype.mapSegments = function () {
            var e = [],
                i = -1;
            return e.push({
                link: this.$segmentLinks.eq(0).clone(),
                index: i,
                hasSections: !1
            }), i += 1, this.postLogin && e.push({
                link: this.$myAccountLink.clone().removeClass().addClass("m12-segment-nav__link").text(this.$myAccountLink.data("label")),
                index: i,
                hasSections: !0
            }), i += 1, t.each(this.$segmentLinks, function (n) {
                0 !== n && (e.push({
                    link: t(this).clone(),
                    index: i,
                    hasSections: !0
                }), i += 1)
            }), e
        }, l.prototype.mapSections = function () {
            var e = [],
                i = [],
                n = this.postLogin ? this.segments.length : this.segments.length - 1;
            return this.postLogin && (t.each(this.$myAccountPostLoginNav.find("[data-subsection]"), function () {
                var e = t(this).find("[data-subsection-title]").eq(0),
                    n = t(this).find("[data-section-link]");
                i.push({
                    link: null,
                    title: e,
                    subsection: null,
                    hasSubsections: !1
                }), t.each(n, function () {
                    i.push({
                        link: t(this),
                        title: null,
                        subsection: null,
                        hasSubsections: !1
                    })
                })
            }), e.push(i)), t.each(this.$sectionNavs, function () {
                var i = [];
                t.each(t(this).find("[data-section]"), function () {
                    var e = t(this).find("[data-subsection]").clone(),
                        n = t(this).find("[data-section-link]").clone(),
                        o = void 0 !== e[0];
                    o && n.addClass("m12-section-nav__link--next"), i.push({
                        title: null,
                        link: n,
                        subsection: e,
                        hasSubsections: o
                    })
                }), e.push(i)
            }), e.length > n && e.shift(), e
        }, l.prototype.buildMenu = function () {
            var e = this;
            if (t.each(this.segments, function () {
                var i = this;
                i.hasSections && i.link.on("click", function (n) {
                    n.preventDefault(), e.$level2Header.text(t(this).data("label")), e.openLevel2Menu(e.postLogin ? i.index : i.index - 1)
                }), e.$level1Nav.append(t("<li></li>").addClass("m12-segment-nav__item").append(this.link))
            }), this.postLogin ? this.$myAccount.append(this.$myAccountLogoutLink.clone().removeClass().addClass("m12-myaccount-mobile__link")) : this.$myAccount.append(this.$myAccountLink.clone().removeClass("m12-myaccount__link").addClass("m12-myaccount-mobile__link")), this.$languageLinkContainer.append(this.$languageLink.clone()), void 0 !== this.$accessibilityContent[0]) {
                var i = this.$accessibilityContent.clone(!0);
                i.find("#xp1").attr("id", "xp2"), i.find("a.readspeaker-link").attr("onclick", "readpage(this.href, 'xp2'); return false;"), this.$accessibilityPanel.append(i)
            }
            this.$searchPanel.append(this.$searchContent.clone(!0)), this.$searchPanel.find("#searchcategory").attr("class", "mobile--searchcategory"), this.setStyle(), this.loadScrollers()
        }, l.prototype.loadScrollers = function () {
            this.level1Scroller = new s, this.level1Scroller.init(this.$level1Nav.parent()), this.level2Scroller = new s, this.level2Scroller.init(this.$level2Nav.parent()), this.level3Scroller = new s, this.level3Scroller.init(this.$level3Nav.parent()), this.$accessibilityPanel.parent().addClass("scroll")
        }, l.prototype.openMenu = function (e) {
            e.stopImmediatePropagation();
            var i = this;
            this.open = !0, o.show(), this.$mobileMenu.addClass("theme--" + this.theme).addClass(this.mobileMenuActiveClassname), this.$closeButton.addClass(this.mobielMenuActiveCloseClassname), t("body").addClass("unscrollable"), t("body").css("position", "static"), this.setStyle(), this.level1Scroller.refresh(), t(document).on("touchmove", function (e) {
                void 0 === t(e.target).parents("[data-mobile-accessibility-panel]")[0] && e.preventDefault()
            }), t(o.$el).on("click", function (e) {
                void 0 === t(e.target).parents("[data-mobile-menu]")[0] && i.closeMenu()
            })
        }, l.prototype.closeMenu = function () {
            this.initialized && (this.open = !1, this.closeSearch(), o.hide(), this.$mobileMenu.removeClass().addClass("mobile-menu"), this.$closeButton.removeClass(this.mobielMenuActiveCloseClassname), t("body").removeClass("unscrollable"), t(document).off("touchmove"), t(o.$el).off("click"))
        }, l.prototype.openLevel2Menu = function (e) {
            var i = this;
            this.$level2Nav.empty(), this.$mobileMenu.removeClass(this.mobileMenuLevel3Classname).addClass(this.mobileMenuLevel2Classname);
            var n = this.sections[e];
            t.each(n, function () {
                var e = this;
                e.hasSubsections && e.link.on("click", function (n) {
                    n.preventDefault(), i.$level3Header.text(t(this).data("label")), i.openLevel3Menu(e.subsection)
                }), null !== e.title && i.$level2Nav.append(t("<li></li>").addClass("m12-section-nav__item").append(e.title)), null !== e.link && i.$level2Nav.append(t("<li></li>").addClass("m12-section-nav__item").append(e.link))
            }), this.level2Scroller.refresh()
        }, l.prototype.closeLevel2Menu = function () {
            this.$mobileMenu.removeClass(this.mobileMenuLevel2Classname)
        }, l.prototype.openLevel3Menu = function (t) {
            this.$level3Nav.empty().append(t.html()), this.$mobileMenu.removeClass(this.mobileMenuLevel2Classname).addClass(this.mobileMenuLevel3Classname), this.level3Scroller.refresh()
        }, l.prototype.closeLevel3Menu = function () {
            this.$mobileMenu.removeClass(this.mobileMenuLevel3Classname).addClass(this.mobileMenuLevel2Classname)
        }, l.prototype.toggleAccessibilityPanel = function () {
            this.$mobileMenu.toggleClass(this.mobileMenuAccessibilityClassname)
        }, l.prototype.openSearch = function () {
            var e = this;
            this.$footer.hide(), this.$searchPanel.addClass("mobile-menu-search--active"), this.$searchPanel.find("input[type=search]").focus(), t(".m12-search__panel--close").on("click", function () {
                setTimeout(function () {
                    e.closeSearch(), window.scrollTo(0, 0)
                }, 150)
            }), this.$searchPanel.on("click", function (i) {
                void 0 === t(i.target).parents("[data-search]")[0] && e.closeSearch()
            })
        }, l.prototype.closeSearch = function () {
            this.$footer.show(), this.$searchPanel.removeClass("mobile-menu-search--active"), this.$searchPanel.off("click"), setTimeout(function () {
                t(document).scrollTop(t(document).scrollTop())
            }, 1)
        }, l.prototype.setStyle = function () {
            var e = t(window).width(),
                i = t(window).width() > this.maxWidth ? this.maxWidth : e;
            this.$mobileMenu.css("width", i - 40), this.open && (this.$contentPanels.css("height", t(window).height() - 150), this.$contentPanelLevel1.css("height", t(window).height() - 101))
        }, l.prototype.respond = function () {
            ("l" === n.breakpoint() || "xl" === n.breakpoint()) && this.closeMenu()
        }, a = new l
    }), define("components/m12-masthead/m12-masthead-mobile-menu", ["jquery", "mustache", "breakpoint", "lib/utils", "mask", "components/_helpers/touch-scroller/touch-scroller", "text!components/m12-masthead/_m12-masthead-mobile-menu.hbs"], function (t, e, i, n, o, s, r) {
        "use strict";
        var a, l = function () {
            this.initialized = !1
        };
        return l.prototype.init = function (e) {
            if (!this.initialized) {
                this.$masthead = e, this.$segmentNav = this.$masthead.find("[data-segment-nav]"), this.$segmentLinks = this.$masthead.find("[data-segment-link]"), this.$sectionNavs = this.$masthead.find("[data-section-nav]"), this.$accessibilityContent = this.$masthead.find("[data-accessibility-content]"), this.$myAccountLink = this.$masthead.find("[data-m12-myaccount-link]"), this.$myAccountLogoutLink = this.$masthead.find("[data-myaccount-logout]"), this.$myAccountPostLoginNav = this.$masthead.find("[data-myaccount-postlogin-nav]"), this.$languageLink = this.$masthead.find("[data-m12-lang-link]"), this.$barContent = this.$masthead.find("[data-m12-bar-content]"), this.$menuButton = t('<button class="m12-mobile-menu-button" data-menu-button="true"></button>'), this.$closeButton = t('<button class="mobile-menu-closebtn" data-mobile-menu-close-button="true"></button>'), this.$searchContent = this.$masthead.find("[data-search]"), this.mobileMenuActiveClassname = "mobile-menu--active", this.mobielMenuActiveCloseClassname = "mobile-menu-closebtn--active", this.mobileMenuLevel2Classname = "mobile-menu-panel--level2-open", this.mobileMenuLevel3Classname = "mobile-menu-panel--level3-open", this.mobileMenuAccessibilityClassname = "mobile-menu--accessibility-open", this.labels = e.data("labels"), this.theme = e.data("theme"), this.isSAP = e.data("sap") === !0, this.open = !1, this.maxWidth = 440, this.addMenu(), this.$mobileMenu = t('[data-mobile-menu="true"]'), this.$level1Nav = this.$mobileMenu.find("[data-mobile-menu-level1-nav]"), this.$level2Nav = this.$mobileMenu.find("[data-mobile-menu-level2-nav]"), this.$level3Nav = this.$mobileMenu.find("[data-mobile-menu-level3-nav]"), this.$accessibilityPanel = this.$mobileMenu.find("[data-mobile-accessibility-panel]"), this.$languageLinkContainer = this.$mobileMenu.find("[data-language-link]"), this.$searchPanel = this.$mobileMenu.find("[data-mobile-search-panel]"), this.$level2Header = this.$mobileMenu.find("[data-mobile-menu-level2-header]"), this.$level3Header = this.$mobileMenu.find("[data-mobile-menu-level3-header]"), this.$accessibilityMobileContent = this.$mobileMenu.find("[data-mobile-menu-accessibility]"), this.$accessibilityHeader = this.$mobileMenu.find("[data-mobile-menu-accessibility-header]"), this.$myAccount = this.$mobileMenu.find("[data-mobile-menu-myaccount]"), this.$accessibilityButton = this.$mobileMenu.find("[data-accessibility-button]"), this.$searchButton = this.$mobileMenu.find("[data-search-button]"), this.$footer = this.$mobileMenu.find("[data-mobile-menu-footer]"), this.$contentPanels = this.$mobileMenu.find("[data-panel-content]"), this.$contentPanelLevel1 = this.$mobileMenu.find("[data-panel-content-level1]"), this.postLogin = this.$myAccountPostLoginNav.length > 0, this.segments = this.mapSegments(), this.sections = this.mapSections(), this.buildMenu(), this.$searchField = this.$mobileMenu.find("[data-search-field]"), this.$menuButton.on("click", t.proxy(this.openMenu, this)), this.$closeButton.on("click", t.proxy(this.closeMenu, this)), this.$level2Header.on("click", t.proxy(this.closeLevel2Menu, this)), this.$level3Header.on("click", t.proxy(this.closeLevel3Menu, this)), this.$accessibilityHeader.on("click", t.proxy(this.toggleAccessibilityPanel, this)), this.$accessibilityButton.on("click", t.proxy(this.toggleAccessibilityPanel, this)), this.$searchButton.on("click", t.proxy(this.openSearch, this)), t(window).on("orientationchange resize", t.proxy(this.setStyle, this)), t(i).on("change", t.proxy(this.respond, this)), this.initialized = !0;
                var n = t(".m12-section-nav").find(".m12-segment-nav__link--Home").attr("href");
                t(".mobile-menu__myaccount").find(".m12-segment-nav__link--Home").attr("href", n)
            }
        }, l.prototype.addMenu = function () {
            var i = e.render(r, {
                is_sap: this.isSAP
            });
            this.$barContent.prepend(this.$menuButton), this.$menuButton.text(this.labels.menu), t("body").append(i), t("body").append(t(this.$closeButton)), this.$closeButton.attr("aria-label", this.labels.close)
        }, l.prototype.mapSegments = function () {
            var e = [],
                i = -1;
            return e.push({
                link: this.$segmentLinks.eq(0).clone(),
                index: i,
                hasSections: !1
            }), i += 1, this.postLogin && e.push({
                link: this.$myAccountLink.clone().removeClass().addClass("m12-segment-nav__link").text(this.$myAccountLink.data("label")),
                index: i,
                hasSections: !0
            }), i += 1, t.each(this.$segmentLinks, function (n) {
                0 !== n && (e.push({
                    link: t(this).clone(),
                    index: i,
                    hasSections: !0
                }), i += 1)
            }), e
        }, l.prototype.mapSections = function () {
            var e = [],
                i = [],
                n = this.postLogin ? this.segments.length : this.segments.length - 1;
            return this.postLogin && (t.each(this.$myAccountPostLoginNav.find("[data-subsection]"), function () {
                var e = t(this).find("[data-subsection-title]").eq(0),
                    n = t(this).find("[data-section-link]");
                i.push({
                    link: null,
                    title: e,
                    subsection: null,
                    hasSubsections: !1
                }), t.each(n, function () {
                    i.push({
                        link: t(this),
                        title: null,
                        subsection: null,
                        hasSubsections: !1
                    })
                })
            }), e.push(i)), t.each(this.$sectionNavs, function () {
                var i = [];
                t.each(t(this).find("[data-section]"), function () {
                    var e = t(this).find("[data-subsection]").clone(),
                        n = t(this).find("[data-section-link]").clone(),
                        o = void 0 !== e[0];
                    o && n.addClass("m12-section-nav__link--next"), i.push({
                        title: null,
                        link: n,
                        subsection: e,
                        hasSubsections: o
                    })
                }), e.push(i)
            }), e.length > n && e.shift(), e
        }, l.prototype.buildMenu = function () {
            var e = this;
            if (t.each(this.segments, function () {
                var i = this;
                i.hasSections && i.link.on("click", function (n) {
                    n.preventDefault(), e.$level2Header.text(t(this).data("label")), e.openLevel2Menu(e.postLogin ? i.index : i.index - 1)
                }), e.$level1Nav.append(t("<li></li>").addClass("m12-segment-nav__item").append(this.link))
            }), this.postLogin ? this.$myAccount.append(this.$myAccountLogoutLink.clone().removeClass().addClass("m12-myaccount-mobile__link")) : this.$myAccount.append(this.$myAccountLink.clone().removeClass("m12-myaccount__link").addClass("m12-myaccount-mobile__link")), this.$languageLinkContainer.append(this.$languageLink.clone()), void 0 !== this.$accessibilityContent[0]) {
                var i = this.$accessibilityContent.clone(!0);
                i.find("#xp1").attr("id", "xp2"), i.find("a.readspeaker-link").attr("onclick", "readpage(this.href, 'xp2'); return false;"), this.$accessibilityPanel.append(i)
            }
            this.$searchPanel.append(this.$searchContent.clone(!0)), this.$searchPanel.find("#searchcategory").attr("class", "mobile--searchcategory"), this.setStyle(), this.loadScrollers()
        }, l.prototype.loadScrollers = function () {
            this.level1Scroller = new s, this.level1Scroller.init(this.$level1Nav.parent()), this.level2Scroller = new s, this.level2Scroller.init(this.$level2Nav.parent()), this.level3Scroller = new s, this.level3Scroller.init(this.$level3Nav.parent()), this.$accessibilityPanel.parent().addClass("scroll")
        }, l.prototype.openMenu = function (e) {
            e.stopImmediatePropagation();
            var i = this;
            this.open = !0, o.show(), this.$mobileMenu.addClass("theme--" + this.theme).addClass(this.mobileMenuActiveClassname), this.$closeButton.addClass(this.mobielMenuActiveCloseClassname), t("body").addClass("unscrollable"), t("body").css("position", "static"), this.setStyle(), this.level1Scroller.refresh(), t(document).on("touchmove", function (e) {
                void 0 === t(e.target).parents("[data-mobile-accessibility-panel]")[0] && e.preventDefault()
            }), t(o.$el).on("click", function (e) {
                void 0 === t(e.target).parents("[data-mobile-menu]")[0] && i.closeMenu()
            })
        }, l.prototype.closeMenu = function () {
            this.initialized && (this.open = !1, this.closeSearch(), o.hide(), this.$mobileMenu.removeClass().addClass("mobile-menu"), this.$closeButton.removeClass(this.mobielMenuActiveCloseClassname), t("body").removeClass("unscrollable"), t(document).off("touchmove"), t(o.$el).off("click"))
        }, l.prototype.openLevel2Menu = function (e) {
            var i = this;
            this.$level2Nav.empty(), this.$mobileMenu.removeClass(this.mobileMenuLevel3Classname).addClass(this.mobileMenuLevel2Classname);
            var n = this.sections[e];
            t.each(n, function () {
                var e = this;
                e.hasSubsections && e.link.on("click", function (n) {
                    n.preventDefault(), i.$level3Header.text(t(this).data("label")), i.openLevel3Menu(e.subsection)
                }), null !== e.title && i.$level2Nav.append(t("<li></li>").addClass("m12-section-nav__item").append(e.title)), null !== e.link && i.$level2Nav.append(t("<li></li>").addClass("m12-section-nav__item").append(e.link))
            }), this.level2Scroller.refresh()
        }, l.prototype.closeLevel2Menu = function () {
            this.$mobileMenu.removeClass(this.mobileMenuLevel2Classname)
        }, l.prototype.openLevel3Menu = function (t) {
            this.$level3Nav.empty().append(t.html()), this.$mobileMenu.removeClass(this.mobileMenuLevel2Classname).addClass(this.mobileMenuLevel3Classname), this.level3Scroller.refresh()
        }, l.prototype.closeLevel3Menu = function () {
            this.$mobileMenu.removeClass(this.mobileMenuLevel3Classname).addClass(this.mobileMenuLevel2Classname)
        }, l.prototype.toggleAccessibilityPanel = function () {
            this.$mobileMenu.toggleClass(this.mobileMenuAccessibilityClassname)
        }, l.prototype.openSearch = function () {
            var e = this;
            this.$footer.hide(), this.$searchPanel.addClass("mobile-menu-search--active"), this.$searchPanel.find("input[type=search]").focus(), t(".m12-search__panel--close").on("click", function () {
                setTimeout(function () {
                    e.closeSearch(), window.scrollTo(0, 0)
                }, 150)
            }), this.$searchPanel.on("click", function (i) {
                void 0 === t(i.target).parents("[data-search]")[0] && e.closeSearch()
            })
        }, l.prototype.closeSearch = function () {
            this.$footer.show(), this.$searchPanel.removeClass("mobile-menu-search--active"), this.$searchPanel.off("click"), setTimeout(function () {
                t(document).scrollTop(t(document).scrollTop())
            }, 1)
        }, l.prototype.setStyle = function () {
            var e = t(window).width(),
                i = t(window).width() > this.maxWidth ? this.maxWidth : e;
            this.$mobileMenu.css("width", i - 40), this.open && (this.$contentPanels.css("height", t(window).height() - 150), this.$contentPanelLevel1.css("height", t(window).height() - 101))
        }, l.prototype.respond = function () {
            ("l" === n.breakpoint() || "xl" === n.breakpoint()) && this.closeMenu()
        }, a = new l
    }), define("components/m12-masthead/m12-masthead-desktop-menu", ["jquery", "lib/utils"], function (t, e) {
        "use strict";
        var i, n = function () {
            this.initialized = !1
        };
        return n.prototype.init = function (e) {
            this.initialized || (this.$masthead = e, this.$myAccountSection = this.$masthead.find("[data-myaccount-section]"), this.$activeSectionNav = this.$masthead.find(".m12-section-nav--active"), this.$menubar = this.$masthead.find("[data-m12-bar-content]"), this.$sections = this.$activeSectionNav.find("[data-section]").add(this.$myAccountSection), this.$searchField = this.$masthead.find("[data-search-field]"), this.$subsections = this.$masthead.find(".m12-subsection"), this.sectionFocusedClassname = "m12-section-nav__item--focused", this.sectionExpandedClassname = "m12-section-nav__item--expanded", this.activeSubsectionClassname = "m12-subsection--active", this.toggleButtonClassname = "m12-section__toggle", this.toggleButtonOpenClassname = "m12-section__toggle--open", this.subsectionClass = ".m12-subsection", this.subsectionActiveClassname = "m12-subsection--active", this.sectionNavItemHoverClassname = "m12-section-nav__item--hover", this.configureUI(), this.polyfills(), this.initialized = !0), null != navigator.userAgent.match(/iPad/i) && t(".m12-section-nav__link").on("click", function (e) {
                e.preventDefault(), t(this).trigger("hover")
            })
        }, n.prototype.polyfills = function () {
            if (e.isLessThanIE10()) {
                var i = this.$searchField.attr("aria-label");
                this.$searchField.val(i), this.$searchField.on("focus", function () {
                    t(this).val() === i && t(this).val("")
                }), this.$searchField.on("blur", function () {
                    "" === t(this).val().replace(/^\s+|\s+$/g, "") && t(this).val(i)
                })
            }
        }, n.prototype.configureUI = function () {
            var e = this;
            t.each(this.$sections, function () {
                var i = t(this),
                    n = t(this).find("[data-section-link]").eq(0),
                    o = t('<button aria-label="Toggle menu" class="m12-section__toggle"><span class="aria-only">Toggle Menu</span></button>');
                "true" === n.attr("aria-haspopup") && (o.on("click", function () {
                    var t = n.attr("aria-expanded");
                    i.toggleClass(e.sectionExpandedClassname), n.attr("aria-expanded", "false" === t), o.toggleClass(e.toggleButtonOpenClassname)
                }), o.on("focus", function () {
                    i.addClass(e.sectionFocusedClassname)
                }), t(o).insertAfter(n)), n.on("focus", function () {
                    e.resetSectionNav(), i.addClass(e.sectionFocusedClassname)
                }), n.on("blur mouseover", function (i) {
                    "blur" === i.type && t(i.relatedTarget).hasClass("m12-section__toggle") || e.resetSectionNav()
                })
            }), this.$searchField.on("focus", function () {
                e.resetSectionNav()
            })
        }, n.prototype.resetSectionNav = function () {
            this.$sections.removeClass(this.sectionFocusedClassname).removeClass(this.sectionExpandedClassname)
        }, i = new n
    }), define("../src/sublayouts/m12-masthead/m12-masthead", ["jquery", "breakpoint", "lib/utils", "!components/m12-masthead/m12-masthead-mobile-menu", "!components/m12-masthead/m12-masthead-desktop-menu"], function (t, e, i, n, o) {
        "use strict";
        var s = function (t) {
            return this.$component = t, this
        };
        s.prototype.init = function () {
            this.getCookie("fontsize"), t("body");
            "" == document.body.style.fontSize && (document.body.style.fontSize = "1em"), this.$anchor = this.$component.find('[data-m13-back-to-top="true"]'), this.$anchor.on("click", t.proxy(this.toTop, this)), this.$headerMain = this.$component.find("[ data-m12-main ]"), this.$headerBar = this.$component.find("[ data-m12-bar ]"), this.$breadcrumbs = this.$component.find("[ data-m12-breadcrumbs ]"), this.headerBarTop = this.$headerBar.offset().top, this.fixedHeader = !1, this.labels = this.$component.data("labels"), this.fontSize = t(".m12-bar__breadcrumb--tools__fontSizeRange"), this.headerMainOffscreenClassname = "m12-main--offscreen", this.headerBarFixedClassname = "m12-bar--fixed", this.headerBarFixedNewClassname = "m12-bar--fixed-new", this.headerBarFixedDataAttr = "data-m12-bar-fixed", this.breadcrumbsFixedClassname = "m12-bar__breadcrumbs--fixed", this.breadcrumbsFixedNewClassname = "m12-bar__breadcrumbs--fixed-new", this.respond(), this.watchHeaderBar(), this.fontSlide(), t(e).on("change", t.proxy(this.respond, this)), t(window).scroll(t.proxy(this.watchHeaderBar, this)), t(window).on("orientationchange", t.proxy(this.orientationchange, this)), t(".m12-myaccount__login-form").find("button").on("DOMSubtreeModified", function () {
                t(".create").addClass("create--active")
            }), t(".m12-myaccount__login-form").find("button").on("propertychange", function () {
                t(".create").addClass("create--active")
            })
        }, s.prototype.respond = function () {
            "s" === i.breakpoint() || "m" === i.breakpoint() ? n.init(this.$component) : o.init(this.$component)
        };
        var r = 0;
        return s.prototype.watchHeaderBar = function () {
            var e = t(window).scrollTop(),
                i = 0;
            Math.abs(r - e) <= i || (e > r && e > 150 ? (this.$headerBar.removeClass(this.headerBarFixedClassname), this.$headerBar.addClass(this.headerBarFixedNewClassname), this.$headerBar.attr(this.headerBarFixedDataAttr, !1), this.$breadcrumbs.addClass(this.breadcrumbsFixedClassname), this.fixedHeader = !1) : r > e && (e > 150 ? (this.$headerBar.addClass(this.headerBarFixedClassname), this.$headerBar.removeClass(this.headerBarFixedNewClassname), this.$headerBar.attr(this.headerBarFixedDataAttr, !0), this.$breadcrumbs.addClass(this.breadcrumbsFixedClassname), this.fixedHeader = !0) : (this.$headerBar.removeClass(this.headerBarFixedClassname), this.$headerBar.removeClass(this.headerBarFixedNewClassname), this.$headerBar.attr(this.headerBarFixedDataAttr, !1), this.$breadcrumbs.removeClass(this.breadcrumbsFixedClassname), this.fixedHeader = !1)), r = e)
        }, s.prototype.orientationchange = function () {
            this.respond()
        }, s.prototype.fontSlide = function () {
            var e = this,
                i = 1e3,
                n = ["grid", "m13-supplementary__wrapper", "m12-main", "m12-bar__wrapper", "m12-bar__breadcrumbs-wrapper", "m12-subsection__wrapper", "service-message__wrapper", "m12-main__navs--inner"];
            t(e.fontSize).attr("min", "-0.5"), t(e.fontSize).attr("max", "0.5"), t(e.fontSize).attr("step", "0.125"), t(e.fontSize).on("change", function () {
                document.body.style.fontSize = "1em", document.body.style.fontSize = parseFloat(document.body.style.fontSize) + .5 * t(this).val() + "em";
                for (var o in n) t(o).css("width", i + 500 * t(this).val());
                console.log(t(this).val()), e.setCookie("fontsize", t(this).val(), 1)
            }), t(e.fontSize).attr("value", "0")
        }, s.prototype.setCookie = function (t, e, i) {
            var n = new Date;
            n.setTime(n.getTime() + 24 * i * 60 * 60 * 1e3);
            var o = "expires=" + n.toUTCString();
            document.cookie = t + "=" + e + ";path=/; " + o
        }, s.prototype.getCookie = function (t) {
            for (var e = t + "=", i = document.cookie.split(";"), n = 0; n < i.length; n++) {
                for (var o = i[n];
                    " " == o.charAt(0);) o = o.substring(1);
                if (0 == o.indexOf(e)) return o.substring(e.length, o.length)
            }
            return ""
        }, s.prototype.searchActivate = function () {
            var e = t(".m12-search__submit"),
                i = t(".m12-search__panel");
            e.on("click", function () {
                i.addClass("m12-search__panel--active")
            })
        }, s.prototype.toTop = function (e) {
            e.preventDefault(), t("body").attr("tabindex", -1), i.isWindowsPhone() ? t("html, body").scrollTop(0) : t("html, body").animate({
                scrollTop: 0
            }, 500, function () {
                t("#page").focus()
            })
        }, s
    }), define("../src/sublayouts/m13-footer/m13-footer", ["jquery", "lib/utils"], function (t, e) {
        "use strict";
        var i = function (t) {
            return this.$component = t, this
        };
        return i.prototype.init = function () {
            this.$anchor = this.$component.find('[data-m13-back-to-top="true"]'), this.$anchor.on("click", t.proxy(this.toTop, this))
        }, i.prototype.toTop = function (i) {
            i.preventDefault(), t("body").attr("tabindex", -1), e.isWindowsPhone() ? t("html, body").scrollTop(0) : t("html, body").animate({
                scrollTop: 0
            }, 500, function () {
                t("#page").focus()
            })
        }, i
    }), define("../src/sublayouts/m14-richtext/m14-richtext", function () { }), define("../src/sublayouts/m15-social-media-feed/m15-social-media-feed", ["jquery", "slick"], function (t) {
        "use strict";
        var e = function (t) {
            return this.$component = t, this
        };
        return e.prototype.init = function () {
            t(".m15-social-media-feed__image").each(function () {
                t(this).css({
                    backgroundImage: "url('" + t(this).data("src") + "')"
                })
            })
        }, e
    }), define("../src/sublayouts/m17-sectiontitle/m17-sectiontitle", ["jquery"], function (t) {
        "use strict";
        var e = function (t) {
            return this.$component = t, this
        };
        return e.prototype.init = function () {
            this.$rammasTrigger = this.$component.find(".m17-sectiontitle-rammas__trigger"), this.$rammasTrigger.on("click", function (e) {
                e.preventDefault(), this.$rammasBtn = t(".rammas-wrapper").find("a"), this.$rammasBtn.trigger("click")
            })
        }, e
    }), define("../src/sublayouts/m20-notification/m20-notification", ["jquery"], function (t, e) {
        "use strict";
        var i = function (t) {
            this.$component = t
        };
        return i.prototype.init = function () {
            var t = this;
            this.$close = this.$component.find(".m20-notification__dismiss"), this.$close.one("click", function (e) {
                e.preventDefault(), t.$component.fadeOut(function () {
                    t.$component.remove()
                })
            })
        }, i
    }), define("../src/sublayouts/m22-image-with-caption/m22-image-with-caption", function () { }), define("../src/sublayouts/m23-table/m23-table", ["jquery"], function (t, e) {
        "use strict";
        var i = function (t) {
            this.$component = t
        };
        return i.prototype.init = function () {
            var e = this;
            e.$headings = [], t("th").each(function () {
                e.$headings.push(t(this).text())
            }), t(".m23-table__content-table-row").each(function () {
                e.$headings.push(t(this).text()), t(this).attr("tabindex", "0"), t(this).find("td").each(function (i) {
                    t(this).attr("data-label", e.$headings[i])
                })
            }), t(".m23-table__content-table-row").each(function () {
                t(this).attr("tabindex", "0)")
            })
        }, i
    }), define("../src/sublayouts/m25-tabs/m25-tabs", ["jquery", "breakpoint", "lib/utils"], function (t, e, i) {
        "use strict";
        var n = function (t) {
            return this.$component = t, this
        };
        return n.prototype.init = function () {
            this.$tabs = this.$component.find('[data-m25-tabs-tab="true"]'), this.$tabsMenu = this.$component.find('[data-m25-tabs-menu="true"]'), this.$content = this.$component.find('[data-m25-tabs-content="true"]'), this.selectedTabID = i.getParameterByName("faq"), "" === this.selectedTabID && (this.selectedTabID = i.getParameterByName("id")), this.activeTabsClass = "m25-tabs__tab--active", this.activeContentClass = "m25-tabs__content--active", this.$selectedTab = this.$tabs.eq(0), "" !== this.selectedTabID && (this.$selectedTab = this.$component.find("#" + this.selectedTabID), void 0 === this.$selectedTab[0] && (this.$selectedTab = this.$tabs.eq(0))), this.respond(), t(e).on("change", t.proxy(this.respond, this)), t(".m25-tabs__tab").on("click", function () {
                t(this).hasClass("icon-close") ? (t(this).next("ul").addClass("ul--m25-active"), t(this).removeClass("icon-close"), t(this).addClass("icon-open")) : t(this).hasClass("icon-open") ? (t(this).next("ul").removeClass("ul--m25-active"), t(this).removeClass("icon-open"), t(this).addClass("icon-close")) : (t(".m25-tabs__tab").next("ul").removeClass("ul--m25-active"), t(".m25-tabs__tab").each(function () {
                    t(this).hasClass("icon-open") && (t(this).removeClass("icon-open"), t(this).addClass("icon-close"))
                }))
            })
        }, n.prototype.respond = function () {
            "s" === i.breakpoint() ? this.setUpMobileView() : this.setUpDesktopView()
        }, n.prototype.setUpDesktopView = function () {
            var e = this;
            this.$tabsMenu.show(), this.$tabs.on("click", function (i) {
                i.preventDefault(), e.displayTab(t(this))
            }), this.displayTab(this.$selectedTab)
        }, n.prototype.setUpMobileView = function () {
            t(".m25-tabs--select-mobile").empty(), t(".m25-tabs--container-mobile").empty(), t(".toggle-menu__item").each(function () {
                var e = t(this).find(".m25-tabs__title").html(),
                    i = t(this).find(".m25-tabs__content").html(),
                    n = t(this).find(".m25-tabs__content").attr("id");
                t('<option data-trigger-index="' + n + '">' + e + "</option>").appendTo(t(".m25-tabs--select-mobile")), t('<div class="m25-content--mobile ' + n + '">' + i + "</div>").appendTo(t(".m25-tabs--container-mobile"))
            }), t(".m25-tabs--select-mobile").change(function () {
                var e = t(this).children(":selected").attr("data-trigger-index");
                t(".m25-content--mobile").removeClass("m25-content--mobile--active"), t("." + e).addClass("m25-content--mobile--active")
            }), t(".m25-content--mobile:first-child").addClass("m25-content--mobile--active")
        }, n.prototype.displayTab = function (e) {
            this.$tabs.removeClass(this.activeTabsClass).attr("aria-selected", !1), e.addClass(this.activeTabsClass), e.attr("aria-selected", !0), this.$content.removeClass(this.activeContentClass), this.$content.parent().removeClass("toggle-menu__itemactive"), t("#" + e.attr("aria-controls")).addClass(this.activeContentClass), t("#" + e.attr("aria-controls")).parent().addClass("toggle-menu__itemactive"), this.$selectedTab = e
        }, n.prototype.fixPosition = function () {
            var e = this;
            i.fixedHeader() && t("body").animate({
                scrollTop: e.$component.offset().top - i.headerBarHeight() - 60
            }, 100)
        }, n.prototype.orientationchange = function () {
            this.reset(), this.respond()
        }, n.prototype.reset = function () {
            this.$content.removeClass(this.activeContentClass), this.$content.parent().removeClass("toggle-menu__itemactive"),
                this.$tabs.removeClass(this.activeTabsClass), this.$tabs.off("click"), this.$component.find("[data-toggle-trigger]").off("click.scroll")
        }, n
    }), define("../src/sublayouts/m27-accessibility-overlay/m27-accessibility-overlay", ["jquery", "lib/utils"], function (t, e) {
        "use strict";
        var i = function (t) {
            return this.$component = t, this
        };
        return i.prototype.init = function () {
            var i = this,
                n = this.getCookie("colour"),
                o = (this.getCookie("read"), this.getCookie("fontsize")),
                s = t("body");
            this.$ao = t(".m27-accessibility-overlay"), this.$aob = t(".m27-accessibility-overlay__cta");
            var r = e.isRTL() ? "ar_ar" : "en_UK",
                a = e.isRTL() ? "Faris" : "en_gb_amy",
                l = window.location.href;
            "" == document.body.style.fontSize && (document.body.style.fontSize = "1em"), "" != o && o > 0 && this.increaseFontSize(o), "invert" == n && (this.invertColour(), this.$component.find(".form-field__input--radio").eq(0).prop("checked", !1), this.$component.find(".form-field__input--radio").eq(2).prop("checked", !1), this.$component.find(".form-field__input--radio").eq(3).prop("checked", !1), this.$component.find(".form-field__input--radio").eq(1).prop("checked", !0)), "blue" == n && (this.blueColour(), this.$component.find(".form-field__input--radio").eq(0).prop("checked", !1), this.$component.find(".form-field__input--radio").eq(1).prop("checked", !1), this.$component.find(".form-field__input--radio").eq(3).prop("checked", !1), this.$component.find(".form-field__input--radio").eq(2).prop("checked", !0)), "red" == n && (this.redColour(), this.$component.find(".form-field__input--radio").eq(0).prop("checked", !1), this.$component.find(".form-field__input--radio").eq(1).prop("checked", !1), this.$component.find(".form-field__input--radio").eq(2).prop("checked", !1), this.$component.find(".form-field__input--radio").eq(3).prop("checked", !0)), "full" == n && (this.$component.find(".form-field__input--radio").eq(1).prop("checked", !1), this.$component.find(".form-field__input--radio").eq(2).prop("checked", !1), this.$component.find(".form-field__input--radio").eq(3).prop("checked", !1), this.$component.find(".form-field__input--radio").eq(0).prop("checked", !0)), t(".readspeaker-link").attr("href", "https://app.readspeaker.com/cgi-bin/rsent?customerid=7358&lang=" + r + "&voice=" + a + "&readid=rs_area&url=" + l), s.on("click", ".readspeaker-link", function () {
                t(window).trigger("readspeakerRequest")
            }), t("html").on("click", function (e) {
                var n = t(e.target);
                n && n.attr("class") && -1 == n.attr("class").indexOf("radio") && i.hideOverlay()
            }), t(".m12-tools__link").on("focusin", function (t) {
                i.hideOverlay()
            }), this.$aob.on("click", function (t) {
                t.stopPropagation(), t.preventDefault(), i.toggleOverlay()
            }), t(".m27-accessibility-overlay__content").on("click", ".form-field__radio", function (e) {
                switch (parseInt(t(e.target).siblings(1).val())) {
                    case 1:
                        i.fullColour();
                        break;
                    case 2:
                        i.invertColour();
                        break;
                    case 3:
                        i.blueColour();
                        break;
                    case 4:
                        i.redColour()
                }
            }), t(".m27-accessibility-overlay__content").delegate(".m27-accessibility-overlay__text-smaller", "click", function (t) {
                t.stopPropagation(), t.preventDefault(), i.decreaseFontSize(1)
            }), t(".m27-accessibility-overlay__content").delegate(".m27-accessibility-overlay__text-larger", "click", function (t) {
                t.stopPropagation(), t.preventDefault(), i.increaseFontSize(1)
            }), t(".m27-accessibility-overlay__content").delegate(".m27-accessibility-overlay__button--print", "click", function () {
                window.print && window.print()
            }), t(".m27-accessibility-overlay__content").delegate(".readspeaker-link", "click", function () {
                i.hideReadSpeakerButton(), i.setCookie("read", 1, 1)
            }), s.on("click", ".rsbtn_closer.rsimg", function () {
                i.showReadSpeakerButton()
            })
        }, i.prototype.hideOverlay = function () {
            this.$ao.removeClass("m27-accessibility-overlay--visible"), this.$ao.attr("aria-expanded", !1), this.$aob.removeClass("m27-accessibility-overlay__cta--active")
        }, i.prototype.showOverlay = function () {
            this.$ao.addClass("m27-accessibility-overlay--visible"), this.$ao.attr("aria-expanded", !0), this.$aob.addClass("m27-accessibility-overlay__cta--active")
        }, i.prototype.toggleOverlay = function () {
            this.$aob.hasClass("m27-accessibility-overlay__cta--active") ? this.$aob.removeClass("m27-accessibility-overlay__cta--active") : (this.$aob.removeClass("m27-accessibility-overlay__cta--active"), this.$aob.addClass("m27-accessibility-overlay__cta--active")), this.$ao.hasClass("m27-accessibility-overlay--visible") ? (this.$ao.attr("aria-expanded", !1), this.$ao.removeClass("m27-accessibility-overlay--visible")) : (this.$ao.removeClass("m27-accessibility-overlay--visible"), this.$ao.addClass("m27-accessibility-overlay--visible"), this.$ao.attr("aria-expanded", !0))
        }, i.prototype.fullColour = function () {
            t("body").removeClass("invert").removeClass("blue").removeClass("blue").removeClass("red"), this.setCookie("colour", "full", 1)
        }, i.prototype.invertColour = function () {
            t("body").removeClass("blue").removeClass("red").addClass("invert"), this.setCookie("colour", "invert", 1)
        }, i.prototype.blueColour = function () {
            t("body").removeClass("invert").removeClass("red").addClass("blue"), this.setCookie("colour", "blue", 1)
        }, i.prototype.redColour = function () {
            t("body").removeClass("blue").removeClass("invert").addClass("red"), this.setCookie("colour", "red", 1)
        }, i.prototype.hideReadSpeakerButton = function () {
            t(".readspeaker-link").css("display", "none")
        }, i.prototype.showReadSpeakerButton = function () {
            t(".readspeaker-link").css("display", "block")
        }, i.prototype.increaseFontSize = function (t) {
            "1em" == document.body.style.fontSize && (document.body.style.fontSize = parseFloat(document.body.style.fontSize) + .2 * t + "em", this.setCookie("fontsize", t, 1))
        }, i.prototype.decreaseFontSize = function (t) {
            "1em" != document.body.style.fontSize && (document.body.style.fontSize = parseFloat(document.body.style.fontSize) - .2 * t + "em", this.setCookie("fontsize", 0, 0))
        }, i.prototype.setCookie = function (t, e, i) {
            var n = new Date;
            n.setTime(n.getTime() + 24 * i * 60 * 60 * 1e3);
            var o = "expires=" + n.toUTCString();
            document.cookie = t + "=" + e + ";path=/; " + o
        }, i.prototype.getCookie = function (t) {
            for (var e = t + "=", i = document.cookie.split(";"), n = 0; n < i.length; n++) {
                for (var o = i[n];
                    " " == o.charAt(0);) o = o.substring(1);
                if (0 == o.indexOf(e)) return o.substring(e.length, o.length)
            }
            return ""
        }, i
    }), define("../src/sublayouts/m28-dashboard-component/m28-dashboard-component", ["jquery", "chart-config"], function (t) {
        "use strict";
        var e = function (t) {
            return this.$component = t, this
        };
        return e.prototype.init = function () {
            this.chartData = this.$component.data("chart-data"), this.colorDown = "#34B233", this.colorUp = "#00A9E0", this.plotChart(), this.plotChartUpdateClone()
        }, e.prototype.plotChart = function () {
            var e = this.chartData,
                i = e.split(",").map(function (t) {
                    return Number(t)
                }),
                n = e[0] > e[e.length - 1] ? this.colorUp : this.colorDown;
            this.$chartContainer = this.$component.find("[data-chart-container]"), this.$chartContainer.highcharts({
                tooltip: {
                    text: "",
                    style: {
                        display: "none"
                    }
                },
                title: {
                    text: "",
                    style: {
                        display: "none"
                    }
                },
                subtitle: {
                    text: "",
                    style: {
                        display: "none"
                    }
                },
                xAxis: {
                    lineWidth: 0,
                    minorGridLineWidth: 0,
                    lineColor: "transparent",
                    minorTickLength: 0,
                    tickLength: 0,
                    labels: {
                        enabled: !1
                    },
                    title: {
                        text: null
                    },
                    reversed: "rtl" == t("html").attr("dir")
                },
                yAxis: {
                    gridLineWidth: 0,
                    minorGridLineWidth: 0,
                    labels: {
                        enabled: !1
                    },
                    title: {
                        text: null
                    },
                    opposite: "rtl" == t("html").attr("dir")
                },
                series: [{
                    showInLegend: !1,
                    data: i,
                    color: n
                }]
            })
        }, e.prototype.plotChartUpdateClone = function () {
            window.setTimeout(function () {
                dewaGlobal.updateDashboardChart()
            }, 200)
        }, e
    }), define("../src/sublayouts/m29-chart/m29-chart", ["jquery", "lib/utils", "chart-config"], function (t, e) {
        "use strict";
        var i = function (t) {
            this.$component = t
        };
        return i.prototype.init = function () {
            var i = this.$component.find("[data-chart-container]"),
                n = this.$component.data("series"),
                o = this.$component.data("y-axis-text"),
                s = this.$component.data("x-axis-categories").split(","),
                r = this.$component.data("tooltip-value-suffix"),
                a = e.isRTL(),
                l = this.$component.data("usagefor"),
                c = (this.$component.data("legend"), this.$component.data("label"), this.$component.data("labelstyle"), parseInt(this.$component.data("step"), 10) || 1),
                d = parseInt(this.$component.data("step-s"), 10) || 1,
                h = {
                    chart: {
                        type: "line"
                    },
                    title: {
                        text: ""
                    },
                    subtitle: {
                        text: "",
                        style: {
                            display: "none"
                        }
                    },
                    legend: {
                        enabled: !1
                    },
                    plotOptions: {
                        spline: {
                            marker: {
                                radius: 4,
                                lineColor: "#666666",
                                lineWidth: 1
                            }
                        }
                    },
                    xAxis: {
                        reversed: a,
                        categories: s,
                        labels: {
                            autoRotation: !1,
                            staggerLines: c
                        }
                    },
                    yAxis: {
                        opposite: a,
                        title: {
                            text: o
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: "#808080"
                        }]
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size: 12px;font-weight:bold;">' + l + '</span><br><span style="color:{point.color}">●</span> {point.x} {series.name}: ',
                        pointFormat: "<b>{point.y}</b>",
                        valueSuffix: r,
                        crosshairs: !0,
                        useHTML: !0
                    },
                    series: n
                };
            "s" === e.breakpoint() && (h.xAxis.labels.staggerLines = d), i.highcharts(h), this.$component.find(".m29-chart__legend--item").each(function () {
                t(this).find(".m29-chart__legend--item-icon").css("color", t(this).data("color"))
            })
        }, i
    }), define("../src/sublayouts/m3-carousel/m3-carousel", ["jquery", "slick"], function (t) {
        "use strict";
        var e = function (t) {
            return this.$component = t, this
        };
        return e.prototype.init = function () {
            this.$M3_slider = t(".m3-carousel__carousel");
            var e = "rtl" == t("html").attr("dir");
            t(".m3-carousel__slide").length > 1 && this.$M3_slider.slick({
                dots: !0,
                arrows: !0,
                infinite: !0,
                speed: 750,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: !1,
                rtl: e
            }), this.$M3_slider.css({
                top: 0,
                opacity: 1,
                position: "relative"
            })
        }, e
    }), define("../src/sublayouts/m30-share/m30-share", ["jquery", "slick"], function (t) {
        "use strict";
        var e = function (t) {
            return this.$component = t, this
        };
        return e.prototype.init = function () {
            var e = this;
            this.$html = t("html"), this.$isRTL = "rtl" == this.$html.attr("dir"), this.shareOpen = !1, this.$html.on("click", function () {
                e.hideSharePanel()
            }), t(".m30-share__item, .m30-share__link").on("click", function (t) {
                t.stopPropagation()
            }), t(".m30-share__button").unbind().on("click", function (i) {
                i.stopPropagation(), i.preventDefault(), e.$panel = t(this).closest(".m30-share").find(".m30-share__panel");
                var n = t(this).offset().top,
                    o = e.$panel.outerHeight(),
                    s = t(window).height(),
                    r = t(window).scrollTop();
                n - r + o >= s && n - r >= o ? e.$panel.addClass("m30-share__panel--top") : e.$panel.removeClass("m30-share__panel--top"), "true" == e.$panel.attr("aria-expanded") ? e.hideSharePanel() : e.showSharePanel()
            })
        }, e.prototype.hideSharePanel = function () {
            try {
                this.$panel.removeClass("m30-share__panel--visible"), this.$panel.attr("aria-expanded", !1)
            } catch (t) { }
        }, e.prototype.showSharePanel = function () {
            this.$panel.addClass("m30-share__panel--visible"), this.$panel.attr("aria-expanded", !0), this.$panel.fadeIn()
        }, e
    }), define("../src/sublayouts/m31-search/m31-search", ["jquery", "slick"], function (t) {
        "use strict";
        var e = function (t) {
            return this.$component = t, this
        };
        return e.prototype.init = function () {
            var e = this;
            this.$html = t("html"), this.$isRTL = "rtl" == this.$html.attr("dir"), this.shareOpen = !1, t(".m31-search__item, .m31-search__link").on("click", function (t) {
                t.stopPropagation()
            }), t(".m12-search__submit").on("click", function () {
                console.log("asd")
            }), t(".m31-search__button").unbind().on("click", function (i) {
                i.stopPropagation(), i.preventDefault(), e.$panel = t(this).closest(".m31-search").find(".m31-search__panel");
                var n = t(this).offset().top,
                    o = e.$panel.outerHeight(),
                    s = t(window).height(),
                    r = t(window).scrollTop();
                n - r + o >= s && n - r >= o ? e.$panel.addClass("m31-search__panel--top") : e.$panel.removeClass("m31-search__panel--top"), "true" == e.$panel.attr("aria-expanded") ? e.hideSharePanel() : e.showSharePanel(), t(".m12-search__panel--close, .gray-bg").bind("click", function () {
                    e.hideSharePanel(), t("body").removeClass("unscrollable")
                }), t("body").addClass("unscrollable")
            })
        }, e.prototype.hideSharePanel = function () {
            try {
                this.$panel.removeClass("m31-search__panel--visible"), this.$panel.attr("aria-expanded", !1)
            } catch (t) { }
        }, e.prototype.showSharePanel = function () {
            this.$panel.addClass("m31-search__panel--visible"), this.$panel.attr("aria-expanded", !0), this.$panel.fadeIn(), setTimeout(function () {
                t(".m12-search__input").focus()
            }, 250)
        }, e
    }), define("../src/sublayouts/m32-map/m32-map", ["jquery"], function (t) {
        "use strict";
        var e = function (t) {
            return this.$component = t, window.MAP = this, this
        };
        return e.prototype.loaded = function (e) {
            this.map = e, t(window).trigger("mapLoaded")
        }, e.prototype.init = function () {
            var e = "rtl" == t("html").attr("dir") ? "ar" : "en",
                i = document.createElement("script"),
                n = "https://maps.googleapis.com/maps/api/js?libraries=places,geometry&v=3&key=AIzaSyDlgZWo3GHt8FjQ665UcPkMSl9F-BvMlag&language=" + e;
            i.type = "text/javascript", i.src = n + "&callback=initializeGMap", document.body.appendChild(i)
        }, window.initializeGMap = function () {
            var e = document.getElementById("map");
            window.map = new google.maps.Map(e, {
                center: new google.maps.LatLng(25.2276388, 55.3245075),
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                navigationControl: !0,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.SMALL
                },
                mapTypeControl: !1,
                streetViewControl: !1
            });
            var i = {
                lat: 25.2276388,
                lng: 55.3245075
            },
                n = new google.maps.places.PlacesService(map);
            n.getDetails({
                placeId: "ChIJX2yk7EhdXz4RxfnDVtxbBaE"
            }, function (e, i) {
                i === google.maps.places.PlacesServiceStatus.OK && (t(".m32-map__overlay-title--text").text(e.name), t(".m32-map__overlay-subtitle--text").text(e.subname), t(".m32-map__overlay-address").text(e.formatted_address), t(".m32-map__rating").text(e.rating), t(".m32-map__rating-reviews").html('<a target="_blank" href="' + e.url + '">' + e.user_ratings_total + " reviews</a>"), t(".m32-map__larger-map a").attr("href", "https://www.google.co.uk/maps/place/" + e.name.replace(" ", "+")), t(".m32-map__rating-stars--foreground").css({
                    width: t(".m32-map__rating-stars").width() * (20 * parseFloat(e.rating) / 100) + "px"
                }), t(".m32-map__overlay").animate({
                    opacity: 1
                }, 500))
            }), google.maps.event.addDomListener(window, "resize", function () {
                map.setCenter(i)
            }), window.MAP.loaded(map)
        }, e
    }), define("../src/sublayouts/m33-thumbnail-gallery/m33-thumbnail-gallery", ["jquery", "slick"], function (t) {
        "use strict";
        var e = function (t) {
            return this.$component = t, this
        };
        return e.prototype.init = function () {
            var e = this;
            this.$mainSlider = t(".m33-thumbnail-gallery__main-carousel"), this.$thumbSlider = t(".m33-thumbnail-gallery__thumb-carousel"), this.$numSlides = t(".m33-thumbnail-gallery__thumb-carousel-slide").length, this.$navSlidesToShow = 6, this.$gutter = t(window).width() >= 1024 ? 32 : 16, this.$padding = t(window).width() >= 1024 ? 0 : 32, this.$body = t("body"), this.$html = t("html"), this.$isRTL = "rtl" == this.$html.attr("dir"), this.shareOpen = !1, this.ofValue = this.$thumbSlider.data("of-value") || "of", t(".m33-thumbnail-gallery__thumb-carousel-slide").each(function (e) {
                var i = t(this).attr("class"),
                    n = t(this).attr("data-index");
                t(this).replaceWith("<button class=" + i + " data-index=" + n + " >" + t(this).html() + "</button>")
            }), this.initMainCarousel(), this.initThumbCarousel(), this.$html.on("click", function () {
                e.hideSharePanel()
            })
        }, e.prototype.initThumbCarousel = function () {
            var e = this;
            t(".m33-thumbnail-gallery__share-item, .m33-thumbnail-gallery__share-item-link").on("click", function (t) {
                t.stopPropagation()
            }), t(".m33-thumbnail-gallery__button--share").on("click", function (t) {
                t.stopPropagation(), e.shareOpen ? e.hideSharePanel() : e.showSharePanel()
            }), this.$body.on("click", ".m33-thumbnail-gallery__thumb-carousel-slide", function (i) {
                i.stopPropagation(), t(this).parent().find(".m33-thumbnail-gallery__thumb-carousel-slide").each(function () {
                    t(this).removeClass("current")
                }), t(this).addClass("current"), e.$mainSlider.slick("goTo", t(this).data("index"))
            }), this.$thumbSlider.on("afterChange", function (i, n, o) {
                var s = Math.ceil((t(this).width() - 2 * e.$padding - 5 * e.$gutter) / 6);
                t(this).find(".slick-slide").each(function () {
                    t(this).css({
                        width: s + e.$gutter
                    })
                })
            }), this.$thumbSlider.on("init", function () {
                var i = t(".m33-thumbnail-gallery__thumb-carousel .slick-list"),
                    n = Math.ceil((i.width() - 2 * e.$padding - 5 * e.$gutter) / 6);
                if (t(this).find(".slick-slide").each(function () {
                    t(this).css({
                        width: n + e.$gutter
                    })
                }), e.$numSlides > e.$navSlidesToShow) {
                    var o = (n + e.$gutter) * e.$navSlidesToShow * -1;
                    e.$isRTL && (o = (n + e.$gutter) * e.$navSlidesToShow), t(this).find(".slick-track").css("transform", "translate3d(" + o + "px, 0px, 0px)")
                }
                t(".m33-thumbnail-gallery__thumb-carousel-slide-image").each(function () {
                    t(this).css({
                        width: n,
                        height: n
                    })
                }), e.$thumbSlider.find("[data-index=0]").addClass("current"), e.updateCaption(t("[data-slick-index=0]").data("caption")), t(".m33-thumbnail-gallery__pagination").text("1 " + e.ofValue + " " + e.$numSlides), t(window).resize(function () {
                    e.$gutter = t(window).width() >= 1024 ? 32 : 16;
                    var i = Math.ceil((e.$thumbSlider.find(".slick-list").width() - 5 * e.$gutter) / 6);
                    t(".m33-thumbnail-gallery__thumb-carousel-slide-image").each(function () {
                        t(this).css({
                            width: i,
                            height: i
                        })
                    }), t(".m33-thumbnail-gallery__thumb-carousel .slick-slide").each(function () {
                        t(this).css({
                            width: i + e.$gutter
                        })
                    })
                }), e.display()
            }), this.$thumbSlider.slick({
                arrows: !0,
                dots: !1,
                infinite: !0,
                variableWidth: !e.$isRTL,
                speed: 750,
                slidesToShow: e.$navSlidesToShow,
                slidesToScroll: 1,
                autoplay: !1,
                pauseOnHover: !1,
                nextArrow: ".m33-thumbnail-gallery__thumb-carousel-button--next",
                prevArrow: ".m33-thumbnail-gallery__thumb-carousel-button--prev",
                rtl: this.$isRTL
            })
        }, e.prototype.hideSharePanel = function () {
            t(".m33-thumbnail-gallery__share-panel").fadeOut(), this.shareOpen = !1
        }, e.prototype.showSharePanel = function () {
            t(".m33-thumbnail-gallery__share-panel").fadeIn(), this.shareOpen = !0
        }, e.prototype.initMainCarousel = function () {
            var e = this;
            this.$mainSlider.on("afterChange", function (i, n, o) {
                e.$thumbSlider.find(".m33-thumbnail-gallery__thumb-carousel-slide").each(function () {
                    t(this).removeClass("current")
                }), e.$thumbSlider.find("[data-index=" + o + "]").addClass("current")
            }), this.$mainSlider.on("beforeChange", function (i, n, o, s) {
                e.updateCaption(t("[data-slick-index=" + s + "]").data("caption")), e.updatePagination(s)
            }), this.$mainSlider.slick({
                arrows: !0,
                dots: !1,
                infinite: !0,
                speed: 750,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: !1,
                autoplaySpeed: 3e3,
                pauseOnHover: !1,
                nextArrow: ".m33-thumbnail-gallery__main-carousel-button--next",
                prevArrow: ".m33-thumbnail-gallery__main-carousel-button--prev",
                rtl: this.$isRTL
            })
        }, e.prototype.updatePagination = function (e) {
            t(".m33-thumbnail-gallery__pagination").text(e + 1 + " " + this.ofValue + " " + this.$numSlides)
        }, e.prototype.updateCaption = function (e) {
            var i = t(".m33-thumbnail-gallery__caption");
            i.animate({
                opacity: 0
            }, 500, function () {
                i.text(e), i.animate({
                    opacity: 1
                }, 500)
            })
        }, e.prototype.display = function () {
            this.$mainSlider.css({
                top: 0,
                position: "relative"
            }), this.$thumbSlider.css({
                top: 0,
                position: "relative"
            })
        }, e
    }), define("../src/sublayouts/m34-pagination/m34-pagination", ["jquery"], function (t) {
        "use strict";
        var e = function (t) {
            return this.$component = t, this
        };
        return e.prototype.init = function () { }, e.prototype.showPages = function () { }, e.prototype.next = function () { }, e.prototype.prev = function () { }, e
    }), define("../src/sublayouts/m37-expander/m37-expander", ["jquery", "lib/utils"], function (t, e) {
        "use strict";
        var i = function (t) {
            return this.$component = t, this
        };
        return i.prototype.init = function () {
            var i = e.uniqueID(),
                n = i + "_trigger",
                o = i + "_content";
            this.$trigger = this.$component.find("[data-toggle]").eq(0), this.$content = this.$component.find("[data-content]").eq(0), this.$trigger.attr("id", n).attr("aria-controls", o), this.$content.attr("id", o).attr("aria-labelledby", n), this.openTriggerClassname = "m37-expander__trigger--open", this.openContentClassname = "m37-expander__content--open", "true" === this.$content.attr("aria-expanded") && this.toggle(), this.$trigger.on("click", t.proxy(this.toggle, this));
            var s = this.$component.find("[ data-pager-update ]");
            t(s).on("click", function () { })
        }, i.prototype.toggle = function (t) {
            void 0 !== t && t.preventDefault();
            var e = "true" === this.$content.attr("aria-expanded"),
                i = this.$content.find("[data-parsley-trigger]").eq(0).closest("form");
            this.$trigger.toggleClass(this.openTriggerClassname), this.$content.attr("aria-expanded", e = !e), this.$content.toggleClass(this.openContentClassname), e && i.length && (i.parsley().destroy(), window.setTimeout(function () {
                i.parsley()
            }, 10))
        }, i
    }), define("../src/sublayouts/m38-step-tracker/m38-step-tracker", ["jquery"], function (t) {
        "use strict";
        var e = function (t) {
            return this.$component = t, this
        };
        return e.prototype.init = function () {
            this.totalSteps = parseInt(this.$component.data("total-steps")), this.currentStep = this.$component.data("current-step"), this.$progressbar = this.$component.find("[data-m38-progressbar]"), this.build(), this.applyAria()
        }, e.prototype.build = function () {
            for (var e = 0; e < this.totalSteps; e += 1) {
                var i = t('<div class="m38-steptracker__step"></div>');
                this.currentStep > e && i.addClass("m38-steptracker__step--active"), this.$progressbar.append(i)
            }
        }, e.prototype.applyAria = function () {
            this.$progressbar.attr("aria-valuenow", 100 / this.totalSteps).attr("aria-valuemin", 0).attr("aria-valuemax", 100)
        }, e
    }), define("../src/sublayouts/m39-modal/m39-modal", ["jquery", "lib/utils", "mask", "spinner"], function (t, e, i, n) {
        "use strict";
        var o = function (t) {
            return this.$component = t, this
        };
        return o.prototype.init = function () {
            var i = e.uniqueID(),
                n = i + "_trigger",
                o = i + "_content",
                s = i + "_close";
            this.$content = this.$component.find("[ data-content ]"), this.$close = this.$component.find("[ data-close ]"), this.$body = t("body"), this.$modalContent = this.$component.find(".m39-modal__content"), this.$overlay = t(".m39-modal__overlay"), this.$content.data("content") === !0 ? this.$trigger = this.$component.find("[ data-trigger ]") : (this.$trigger = t('[ data-accountselector="' + this.$content.data("content") + '" ]'), void 0 === this.$trigger[0] && (this.$trigger = t('[ data-modal-trigger="' + this.$content.data("content") + '" ]'))), this.$trigger.is("button") && this.$trigger.attr("type", "button"), this.$trigger.attr("id", n).attr("aria-controls", o), this.$content.attr("id", i + "_content").attr("aria-labelledby", n), this.$close.attr("id", s).attr("aria-controls", o), this.openContentClassname = "m39-modal__container--active", this.$trigger.on("click", t.proxy(this.show, this)), this.$close.on("click", t.proxy(this.hide, this)), t(".m39-m12-no").on("click", t.proxy(this.hide, this)), this.$body.on("focusin", t.proxy(this.checkModalFocus, this))
        }, o.prototype.checkModalFocus = function (t) {
            var e = this;
            window.setTimeout(function () {
                e.modalOpened && 0 === e.$content.find(":focus").length && (t.stopPropagation(), e.$close.click())
            }, 1)
        }, o.prototype.show = function (e) {
            var o = this,
                s = new n(o.$content);
            s.load(), e.preventDefault(), setTimeout(function () {
                i.show(), o.$body.addClass("unscrollable"), o.$body.css({
                    position: "static"
                }), o.setContentBelowHeader(), t(window).on("resize orientationchange", t.proxy(o.setContentBelowHeader, o)), o.$content.attr("aria-expanded", !0), o.$content.addClass(o.openContentClassname), window.setTimeout(function () {
                    s.unload(), o.$close.focus(), t("body").trigger("modal_opened", o)
                }, 501), o.modalOpened = !0, t(o.$overlay).css("display", "block")
            }, 50)
        }, o.prototype.setContentBelowHeader = function () {
            this.headerHeight = this.$component.find(".m39-modal__header").innerHeight() + "px", this.$modalContent.css("top", this.headerHeight)
        }, o.prototype.hide = function (e) {
            e.preventDefault(), t("body").trigger("modal_closed", this), i.hide(), this.$body.removeClass("unscrollable"), this.$body.css({
                position: ""
            }), this.$content.attr("aria-expanded", !1), this.$content.removeClass(this.openContentClassname), this.modalOpened = !1, this.$trigger.focus(), t(this.$overlay).css("display", "none")
        }, o.prototype.autoShow = function (e) {
            setTimeout(function () {
                t("#" + e).trigger("click")
            }, 3e3)
        }, o
    }), define("../src/sublayouts/m40-status-message/m40-status-message", ["jquery"], function (t) {
        "use strict";
        var e = function (t) {
            return this.$component = t, this
        };
        return e.prototype.init = function () {
            this.$component.find("[ data-print ]").on("click", function () {
                window.print && window.print()
            })
        }, e
    }), define("../src/sublayouts/m41-tabs-box/m41-tabs-box", [], function () {
        "use strict";
        var t = function (t) {
            return this.$component = t, this
        };
        return t.prototype.init = function () { }, t
    }), define("../src/sublayouts/m43-account-selector/m43-account-selector", ["jquery", "lib/utils"], function (t, e) {
        "use strict";
        var i = function (t) {
            return this.$component = t, this
        };
        return i.prototype.init = function () {
            this.refresh()
        }, i.prototype.optimiseForTouchDevices = function () {
            var e = this,
                i = this.$component.find(".m39-modal__content").clone();
            this.$component.find(".m39-modal__content").remove(), t("body").on("modal_opened", function () {
                e.$component.find(".m39-modal__dialog--account").append(i), e.refresh()
            }), t("body").on("modal_closed", function () {
                e.$component.find(".m39-modal__content").remove()
            })
        }, i.prototype.refresh = function () {
            var e = this;
            this.detailsWrapper = '[ data-acc-detail="wrapper" ]', this.additionalDetails = {
                accType: '[ data-acc-detail="acc_type" ]',
                accPremise: '[ data-acc-detail="acc_premise" ]',
                accBusinessPartner: '[ data-acc-detail="acc_businesspartner" ]'
            }, this.$selectedAccount = this.$component.find("[ data-accountselector ]"), this.$selectedAccountDetails = this.$selectedAccount.find(this.detailsWrapper), this.$selectedAccountAdditionalsDetails = this.$component.find("[ data-accountsel-additional-details ]"), this.$multiSelectedText = this.$component.find("[ data-acc-multiselected ]"), this.$multiSelectedTextcopy = this.$component.find("[ data-acc-multiselected-copy ]"), this.$errorText = this.$component.find('[ data-modal="errormessage" ]'), this.$accountImages = this.$component.find(' [ data-acc-detail="acc_image" ] '), this.$update = this.$component.find("[ data-accountupdate ]"), this.$close = this.$component.find("[ data-close ]"), this.$accounts = this.$component.find("[ data-input ]"), this.$checkboxes = this.$component.find('[ data-input="checkbox" ]'), this.$tabbers = this.$component.find("[ data-tabber ]"), this.$tabPanels = this.$component.find("[ data-tabpanel ]"), this.$tabStorer = this.$component.find("[ data-tabstorer ]"), this.hasTabs = this.$tabStorer.length > 0, this.preventSubmit = this.$selectedAccount.data("preventsubmit"), this.$selectedAccount.on("click", t.proxy(this.stashSelectedInput, this)), this.$update.on("click", t.proxy(this.populate, this)), this.$close.on("click", t.proxy(this.resetSelected, this)), this.$tabbers.on("click", t.proxy(this.switchTabs, this)), this.$currentCheckedCheckboxes = {}, this.$previousCheckedCheckboxes = {}, this.minMaxValidated = !0, this.minSelection = this.$selectedAccount.data("minselection"), void 0 === this.minSelection && (this.minSelection = 1), this.maxSelection = this.$selectedAccount.data("maxselection"), void 0 === this.maxSelection && (this.maxSelection = 99999), this.sequentiallyLoadImages(), dewaGlobal.multiSelectionInputData = [], this.resetMultiSelection();
            var i = (this.$component.find("[ data-reset-control ]"), this.$component.find("[ data-reset-update ]"));
            t(i).on("click", function () {
                e.$currentCheckedCheckboxes = {}, e.$previousCheckedCheckboxes = {}, dewaGlobal.multiSelectionInputData = [], e.init();
                var i = t("#multiselected-copy");
                i.removeClass("hidden").attr("aria-hidden", !1).text(i.data("acc-multiselected-copy"));
                var n = t("#multiselected");
                n.addClass("hidden").attr("aria-hidden", !0).text(" ")
            });
            var n = this.$component.find("[ data-pager-update ]");
            if (t(n).on("click", function () {
                if (e.$selectedAccountDetails = e.$selectedAccount.find(e.detailsWrapper), e.$accounts = e.$component.find("[ data-input ]"), e.$checkboxes = e.$component.find('[ data-input="checkbox" ]'), e.$tabbers = e.$component.find("[ data-tabber ]"), e.$tabPanels = e.$component.find("[ data-tabpanel ]"), e.$tabStorer = e.$component.find("[ data-tabstorer ]"), e.hasTabs = e.$tabStorer.length > 0, e.hasTabs) {
                    var i = e.$tabbers[t(e.$tabStorer).val()];
                    t(i).click()
                }
                e.resetMultiSelection(), e.resetMultiSelected()
            }), this.hasTabs) {
                var o = this.$tabbers[t(this.$tabStorer).val()];
                t(o).click();
                var s = this.$accounts.filter(":checked");
                t(s).each(function (i, n) {
                    var o = t(n).parents(".m43-accountsel__tabpanel")[0],
                        s = t(o).data("tabpanel"),
                        r = t(n),
                        a = r.is(":checked") ? 1 : 0;
                    e.updateMultiSelectionData(s, r, a)
                })
            }
        }, i.prototype.switchTabs = function (e) {
            var i = t(e.target),
                n = i.data("tabber"),
                o = this.$component.find('[ data-tabpanel="' + n + '" ]');
            e.preventDefault(), this.$tabbers.removeClass("m41-tabs-box__tab-link--active").attr("aria-selected", "false"), i.addClass("m41-tabs-box__tab-link--active").attr("aria-selected", "true"), this.$tabPanels.addClass("m43-accountsel__tabpanel--hidden").attr("aria-hidden", "true"), o.removeClass("m43-accountsel__tabpanel--hidden").attr("aria-hidden", "false"), this.$tabStorer.val(n), this.$accounts.off("change"), this.$errorText.addClass("hidden").attr("aria-hidden", !0), this.$update.removeClass("hidden").attr("aria-hidden", !1)
        }, i.prototype.resetSelected = function () {
            var e;
            if (this.minMaxValidated === !0) {
                this.$currentCheckedInput.prop("checked", !0);
                for (e in this.$currentCheckedCheckboxes) this.$currentCheckedCheckboxes.hasOwnProperty(e) && t("#" + e).prop("checked", this.$currentCheckedCheckboxes[e])
            } else {
                this.$previousCheckedInput.prop("checked", !0);
                for (e in this.$previousCheckedCheckboxes) this.$previousCheckedCheckboxes.hasOwnProperty(e) && t("#" + e).prop("checked", this.$previousCheckedCheckboxes[e])
            }
        }, i.prototype.resetMultiSelected = function () {
            var e = this,
                i = e.hasTabs ? t(e.$tabStorer).val() : 0,
                n = t.map(dewaGlobal.multiSelectionInputData, function (t, e) {
                    return t.tabindex == i ? t : void 0
                });
            for (var o in n) t("#" + n[o].id).prop("checked", !0)
        }, i.prototype.resetMultiSelection = function () {
            var e = this;
            this.$inputBoxMutiSelection = this.$component.find(".form-field__fakecheckbox"), t(this.$inputBoxMutiSelection).on("click", function (i) {
                var n = e.hasTabs ? t(e.$tabStorer).val() : 0,
                    o = t(this.previousElementSibling),
                    s = o.is(":checked") ? 0 : 1;
                e.updateMultiSelectionData(n, o, s)
            })
        }, i.prototype.updateMultiSelectionData = function (e, i, n) {
            var o = {
                tabindex: e,
                id: i.attr("id"),
                account: i.data("account-number"),
                name: i.data("account-name"),
                type: i.data("account-class")
            },
                s = t.grep(dewaGlobal.multiSelectionInputData, function (t) {
                    return t.account === o.account && t.tabindex === o.tabindex
                });
            0 == n ? dewaGlobal.multiSelectionInputData = t.grep(dewaGlobal.multiSelectionInputData, function (t, e) {
                return t.account === o.account && t.tabindex === o.tabindex
            }, !0) : 0 == s.length && 1 == n && dewaGlobal.multiSelectionInputData.push(o)
        }, i.prototype.stashSelectedInput = function () {
            var e = this;
            this.$currentCheckedInput = this.$accounts.filter(":checked"), this.$checkboxes.each(function (i, n) {
                e.$currentCheckedCheckboxes[t(n).attr("id")] = t(n).is(":checked")
            }), this.resetMultiSelected()
        }, i.prototype.findCurrentTabCheckedInputs = function () {
            var e = this;
            this.$currentTabChecked = this.$tabPanels.filter('[ data-tabpanel="' + this.$tabStorer.val() + '" ]').find(":checked"), this.$currentTabCheckedCount = t.grep(dewaGlobal.multiSelectionInputData, function (t) {
                return t.tabindex == e.$tabStorer.val()
            })
        }, i.prototype.populate = function (e) {
            var i, n, o = this;
            if (this.$previousCheckedInput = this.$currentCheckedInput, this.$previousCheckedCheckboxes = t.extend({}, this.$currentCheckedCheckboxes), this.stashSelectedInput(), this.hasTabs ? (this.findCurrentTabCheckedInputs(), i = this.$currentTabCheckedCount.length) : i = this.$currentCheckedInput.length, 0 == i && 1 == this.minSelection && 1 == this.maxSelection) e.preventDefault(), this.$close.click();
            else if (i >= this.minSelection && i <= this.maxSelection) {
                switch (this.minMaxValidated = !0, this.clearMessage(this.$multiSelectedText), this.preventSubmit === !0 && e.preventDefault(), i) {
                    case 1:
                        n = this.hasTabs ? this.$currentTabChecked.parent().find(this.detailsWrapper).clone() : this.$currentCheckedInput.parent().find(this.detailsWrapper).clone();
                        for (var s in this.additionalDetails)
                            if (this.additionalDetails.hasOwnProperty(s)) {
                                var r = this.additionalDetails[s],
                                    a = n.find(r);
                                this.$selectedAccountAdditionalsDetails.find(r).text(a.text()), n.find(a).parent().remove()
                            }
                        break;
                    default:
                        n = "", this.$multiSelectedText.removeClass("hidden").attr("aria-hidden", !1).text(i + this.$multiSelectedText.data("acc-multiselected"));
                        var l = t("#multiselected-copy");
                        l.addClass("hidden").attr("aria-hidden", !0).text(" ")
                }
                this.$selectedAccountDetails.html(n), this.$close.click()
            } else this.minMaxValidated = !1, e.preventDefault(), i < this.minSelection ? this.$errorText.text(this.$errorText.data("min-error")) : this.$errorText.text(this.$errorText.data("max-error")), this.$errorText.removeClass("hidden").attr("aria-hidden", !1).focus(), this.$update.addClass("hidden").attr("aria-hidden", !0), this.$accounts.on("change", function () {
                var t;
                o.hasTabs ? (o.findCurrentTabCheckedInputs(), t = o.$currentTabCheckedCount.length) : t = o.$accounts.filter(":checked").length, t >= o.minSelection && (o.$accounts.off("change"), o.$errorText.addClass("hidden").attr("aria-hidden", !0), o.$update.removeClass("hidden").attr("aria-hidden", !1))
            })
        }, i.prototype.clearMessage = function (t) {
            t.addClass("hidden").attr("aria-hidden", !0).text("")
        }, i.prototype.sequentiallyLoadImages = function (e) {
            function i(e, i) {
                var n = t.Deferred(),
                    o = t(i).data("src");
                return i.onload = function () {
                    n.done()
                }, o ? i.src = o : n.done(), n.promise()
            }
            var n, o, s = this,
                r = s.$accountImages,
                a = [],
                l = 10;
            e = e || 0, n = e + l, o = r.slice(e, n),
                a.push(o.each(i)), t.when.apply(t, a).always(function (t) {
                    n < r.length && s.sequentiallyLoadImages(n)
                })
        }, i
    }), define("../src/sublayouts/m44-bill-selector/m44-bill-selector", ["jquery", "lib/utils", "numeral"], function (t, e) {
        "use strict";
        var i = function (t) {
            return this.$component = t, this
        };
        return i.prototype.init = function () {
            var e = this;
            dewaGlobal.billAccountsListSelected = [], this.$checkboxes = this.$component.find('[ data-input="checkbox" ]'), this.$total = this.$component.find(".m44-bill-selector__total .m42-keyvalue--justified-dd"), this.$selectionTotal = this.$component.find(".m44-bill-selector__total .m42-keyvalue__key"), this.$selectionAccountPlural = this.$selectionTotal.find(".m44-account-plural"), this.suffix = this.$component.data("currency-suffix"), this.$accountImages = this.$component.find(' [ data-acc-detail="acc_image" ] '), this.$nextButton = t("[data-m44-next]"), this.$component.delegate('[ data-input="checkbox" ]', "change", function (i) {
                i.stopImmediatePropagation();
                var n = t(this),
                    o = n.is(":checked") ? 1 : 0;
                e.updateMultiSelectionData(n, o), e.updateTotal()
            }), this.$component.delegate(".m44-bill-selector__review-details--edit", "click", function (i) {
                e.isolateEvent(i), e.showEditAmountForm(t(this))
            }), this.$component.delegate(".m44-bill-selector__deselect", "click", function (i) {
                e.isolateEvent(i), 1 == t(this).data("state") ? (t(this).data("state", 0), t(this).text(t(this).data("select")), e.$checkboxes.each(function () {
                    t(this).hasClass("disabled") || t(this).prop("checked", !1)
                }), e.billAccountsListSelected = []) : (t(this).data("state", 1), t(this).text(t(this).data("deselect")), e.$checkboxes.each(function () {
                    t(this).hasClass("disabled") || t(this).prop("checked", !0)
                }), e.billAccountsListSelected = e.billAccountsList), e.updateTotal()
            }), t(window).on("updatetotal", function () {
                e.updateTotal()
            }), this.$component.delegate(".m44-bill-selector__review-form-button--cancel", "click", function (i) {
                e.isolateEvent(i), e.hideEditAmountForm(t(this))
            }), this.$component.delegate(".m44-bill-selector__submit .button", "click", function (i) {
                e.isolateEvent(i);
                var n = t(this).closest("form"),
                    o = n.parsley().isValid();
                o && n.submit()
            }), this.$nextButton.on("click", function (i) {
                t(this).is("[disabled]") && i.preventDefault(), dewaGlobal.billAccountsListSelected = e.billAccountsListSelected
            }), this.paymentMax = this.$component.data("payment-max"), this.isBillSelectorPage = this.$component.find(".m44-bill-selector__account--select").length > 0 ? !0 : !1, this.billAccountsList = [], this.billAccountsListSelected = [], this.isBillSelectorPage && setTimeout(function () {
                e.billAccountsList = t.map(dewaGlobal.billAccountsList, function (t, e) {
                    return {
                        AccountNumber: t.AccountNumber,
                        Active: t.Active,
                        Balance: t.Balance,
                        BusinessPartnerNumber: t.BusinessPartnerNumber
                    }
                }), e.billAccountsListSelected = e.billAccountsList
            }, 1500), this.$checkboxes.each(function () {
                e.populateTotals(t(this))
            }), this.$component.find(".m44-bill-selector__account--review").length && (this.reviewMode = !0, this.$submit = this.$component.find(".m44-bill-selector__submit > button"), this.$hiddenTotal = this.$component.find("#form-field-billtotal"), this.initReviewTotal(), t(".m44-bill-selector").delegate(".form-field__input--text", "blur change", function (i) {
                i.stopPropagation(), e.editTotal(t(this))
            })), this.$component.find(".m44-bill-selector__account--select").length && e.updateTotal(), this.sequentiallyLoadImages();
            var i = this.$component.find("[ data-pager-update ]");
            t(i).on("click", function () {
                e.$checkboxes = e.$component.find('[ data-input="checkbox" ]'), e.$total = e.$component.find(".m44-bill-selector__total .m42-keyvalue--justified-dd"), e.$selectionTotal = e.$component.find(".m44-bill-selector__total .m42-keyvalue__key"), e.$selectionAccountPlural = e.$selectionTotal.find(".m44-account-plural"), e.suffix = e.$component.data("currency-suffix"), e.$accountImages = e.$component.find(' [ data-acc-detail="acc_image" ] '), e.$checkboxes.each(function () {
                    e.populateTotals(t(this));
                    var i = t(this).data("account-number").toString(),
                        n = t.grep(e.billAccountsListSelected, function (t) {
                            return t.AccountNumber === i
                        });
                    n.length > 0 ? t(this).prop("checked", !0) : t(this).prop("checked", !1)
                }), e.updateTotal()
            }), setTimeout(function () {
                t(".m44-bill-selector__deselect").trigger("click"), t(".m44-bill-selector__deselect").trigger("click")
            }, 2e3)
        }, i.prototype.updateMultiSelectionData = function (e, i) {
            var n = {
                AccountNumber: e.data("account-number").toString(),
                Active: Boolean(e.data("active")),
                Balance: Number(e.data("balance")),
                BusinessPartnerNumber: e.data("business-partner-number").toString()
            },
                o = t.grep(this.billAccountsListSelected, function (t) {
                    return t.AccountNumber === n.AccountNumber
                });
            0 == i ? this.billAccountsListSelected = t.grep(this.billAccountsListSelected, function (t, e) {
                return t.AccountNumber === n.AccountNumber
            }, !0) : 0 == o.length && 1 == i && this.billAccountsListSelected.push(n)
        }, i.prototype.isolateEvent = function (t) {
            t.preventDefault(), t.stopPropagation(), t.stopImmediatePropagation()
        }, i.prototype.showEditAmountForm = function (e) {
            t(e).closest(".m44-bill-selector__account--review").find(".m44-bill-selector__review-form").css({
                height: "auto"
            })
        }, i.prototype.hideEditAmountForm = function (e) {
            var i = t(e).closest(".m44-bill-selector__account--review");
            i.data("bill-partial", i.data("bill-amount")), i.find(".form-field__input--text").val(i.data("bill-amount")), i.find(".m44-bill-selector__review-form").css({
                height: "0"
            }), this.updateReviewTotal()
        }, i.prototype.editTotal = function (t) {
            t.closest(".m44-bill-selector__account--review").data("bill-partial", Number(t.val())), this.updateReviewTotal()
        }, i.prototype.getReviewTotal = function (i) {
            var n = this,
                o = 0;
            e.isRTL() ? "‏" : "";
            return this.$component.find(".m44-bill-selector__account--review").each(function () {
                var e = t(this);
                i && (e.find("input[data-parsley-currency]").length && e.data("bill-partial").toString() !== e.find("input[data-parsley-currency]").val() && (n.showEditAmountForm(e.find(".m44-bill-selector__review-details--edit")), e.data("bill-partial", Number(e.find("input[data-parsley-currency]").val()))), e.find("button").text(n.getFormattedValue(e.data("bill-amount"), n.suffix))), e.data("bill-amount") != e.data("bill-partial") ? e.data("bill-partial") > 0 && (o += Number(e.data("bill-partial"))) : e.data("bill-amount") > 0 && (o += Number(e.data("bill-amount"))), n.reviewMode && (n.$hiddenTotal.val(o.toFixed(2)).parsley().validate(), o.toFixed(2) > 0 && o.toFixed(2) <= parseFloat(n.paymentMax) ? n.$submit.removeAttr("disabled").removeClass("disabled") : n.$submit.attr("disabled", !0).addClass("disabled"))
            }), parseFloat(o).toFixed(2)
        }, i.prototype.updateReviewTotal = function () {
            this.updateDisplay(this.getReviewTotal())
        }, i.prototype.initReviewTotal = function () {
            this.updateDisplay(this.getReviewTotal(!0))
        }, i.prototype.updateDisplay = function (i) {
            var n = this.$component.data("currency-suffix");
            e.isRTL() ? "‏" : "";
            t(this.$component).data("bill-total", i), t(this.$component).find(".amount_label").text(this.getFormattedValue(i, n))
        }, i.prototype.updateTotal = function () {
            var i = this,
                n = 0;
            e.isRTL() ? "‏" : "";
            t(this.billAccountsListSelected).each(function (t, e) {
                var i = e.Balance;
                i > 0 && (n += i)
            }), 0 >= n && (n = "0.00"), n = parseFloat(n).toFixed(2), t(this.$component).data("bill-total", n), this.$total.text(this.getFormattedValue(n, i.suffix)), this.updateSelectCount()
        }, i.prototype.updateSelectCount = function () {
            var t = this.billAccountsListSelected.length;
            this.$selectionTotal.find(".m44-account-count").text(t), 1 === t && this.$selectionAccountPlural.text() !== this.$selectionAccountPlural.data("single") ? this.$selectionAccountPlural.text(this.$selectionAccountPlural.data("single")) : 1 !== t && this.$selectionAccountPlural.text() !== this.$selectionAccountPlural.data("plural") && this.$selectionAccountPlural.text(this.$selectionAccountPlural.data("plural")), t > 0 ? this.$nextButton.removeClass("disabled").removeAttr("disabled") : this.$nextButton.addClass("disabled").attr("disabled", !0)
        }, i.prototype.populateTotals = function (e) {
            var i = this,
                n = e.closest(".form-field__checkbox--billselector"),
                o = n.find(".m44-bill-selector__account--select"),
                s = this.$component.data("currency-suffix");
            o.each(function () {
                n.find("button").text(i.getFormattedValue(t(this).data("bill-amount"), s))
            })
        }, i.prototype.getFormattedValue = function (t, i) {
            var n = e.isRTL() ? "‏" : "",
                o = numeral(parseFloat(t)).format("0,0.00");
            return n + o + " " + i
        }, i.prototype.sequentiallyLoadImages = function (e) {
            function i(e, i) {
                var n = t.Deferred(),
                    o = t(i).data("src");
                return i.onload = function () {
                    n.done()
                }, o ? i.src = o : n.done(), n.promise()
            }
            var n, o, s = this,
                r = s.$accountImages,
                a = [],
                l = 10;
            e = e || 0, n = e + l, o = r.slice(e, n), a.push(o.each(i)), t.when.apply(t, a).always(function (t) {
                n < r.length && s.sequentiallyLoadImages(n)
            })
        }, i
    }), define("../src/sublayouts/m45-estimate-selector/m45-estimate-selector", ["jquery", "lib/utils"], function (t, e) {
        "use strict";
        var i = function (t) {
            return this.$component = t, this
        };
        return i.prototype.init = function () {
            var e = this;
            this.$menu = this.$component.find("[data-menu]"), this.$menuTrigger = this.$component.find("[data-accountselector]"), this.$options = this.$menu.find("input"), this.$billDetails = this.$component.find("[data-bill-details]"), this.$close = this.$component.find("[ data-close ]"), this.$activeClassname = "m45-estimate-selector__active", this.$activeBill = this.$billDetails.eq(0), this.$update = this.$component.find("[ data-accountupdate ]"), this.$paymentAmount = this.$component.find("[data-payment-amount]"), this.$submit = this.$paymentAmount.parent("button"), this.$errorMessage = this.$component.find(".m45-estimate-selector--error"), this.$paymentMax = this.$component.data("payment-max"), this.$editAmount = t(".m45-estimate-selector--amount-pay-form-input").find("input"), t(".m45-estimate-selector--edit-amount").on("click", function () {
                t(".m45-estimate-selector--amount-pay-form").addClass("m45-estimate-selector--amount-pay-form-active"), e.$submit.attr("disabled", !0).addClass("disabled"), t(".m45-estimate-selector--amount-utils").addClass("m45-estimate-selector--amount-utils-hide"), t(".m45-estimate-selector--amount-pay-form-input").find("input").val(t("#estimatedamount").val())
            }), t(".m45-estimate-selector--amount-pay-form-button--set").on("click", function () {
                e.setAmount()
            }), t(".m45-estimate-selector--amount-pay-form-button--cancel").on("click", function () {
                t(".m45-estimate-selector--amount-pay-form").removeClass("m45-estimate-selector--amount-pay-form-active"), t(".m45-estimate-selector--amount-utils").removeClass("m45-estimate-selector--amount-utils-hide"), e.$submit.removeAttr("disabled").removeClass("disabled"), e.$errorMessage.removeClass("on"), t(".m45-estimate-selector--amount-pay-form-input").find("input").val(parseFloat(e.$activeBill.data("bill-amount").replace(/,/g, ""))), t(".m45-estimate-selector--amount-pay-form-input").find("input").blur()
            }), this.updateActiveBill(), this.bindEvents()
        }, i.prototype.setAmount = function () {
            var e = this,
                i = numeral(parseFloat(e.$editAmount.val())),
                n = parseInt(e.$activeBill.data("bill-amount").replace(/,/g, "")),
                o = 1e-5;
            i > e.$paymentMax || 0 >= i || i > n || isNaN(i) ? (this.$errorMessage.children().css("display", "none"), this.$submit.attr("disabled", !0).addClass("disabled"), this.$errorMessage.addClass("on"), i > n ? this.$errorMessage.find(".error-one").css("display", "block") : (o >= i || isNaN(i)) && this.$errorMessage.find(".error-two").css("display", "block")) : (this.$errorMessage.children().css("display", "none"), this.$submit.removeAttr("disabled").removeClass("disabled"), this.$errorMessage.removeClass("on"), t(".m45-estimate-selector--amount-pay-form").removeClass("m45-estimate-selector--amount-pay-form-active"), t(".m45-estimate-selector--amount-utils").removeClass("m45-estimate-selector--amount-utils-hide"), this.updateEditBill())
        }, i.prototype.bindEvents = function () {
            var e = this;
            this.$options.on("click", function () {
                e.select(t(this))
            }), this.$update.on("click", function (t) {
                t.preventDefault(), e.$close.click()
            })
        }, i.prototype.updateActiveBill = function () {
            t(".m45-estimate-selector--amount-pay-form-input").find("input");
            this.$activeBill.addClass(this.$activeClassname), this.$menuTrigger.empty().append(this.$activeBill.find("[data-bill-summary]").clone()), t(".m45-estimate-selector--amount-selected").html(numeral(parseFloat(this.$activeBill.data("bill-amount").replace(/,/g, ""))).format("0,0.00")), t("#estimatedamount").attr("value", numeral(parseFloat(this.$activeBill.data("bill-amount").replace(/,/g, "")))), this.$paymentAmount.html(numeral(parseFloat(this.$activeBill.data("bill-amount").replace(/,/g, ""))).format("0,0.00"))
        }, i.prototype.updateEditBill = function () {
            var e = t(".m45-estimate-selector--amount-pay-form-input").find("input"),
                i = this;
            t(".m45-estimate-selector--amount-selected").html(numeral(e.val()).format("0,0.00")), t("#estimatedamount").attr("value", numeral(e.val())), this.$paymentAmount.html(numeral(e.val()).format("0,0.00"));
            var n = numeral(e.val()).format("0,0.00");
            t(".m45-estimate-selector--amount-selected").html(n), t("#estimatedamount").attr("value", numeral(e.val())), i.$paymentAmount.html(n)
        }, i.prototype.select = function (t) {
            var e = t.data("id");
            this.$activeBill.removeClass(this.$activeClassname), this.$activeBill = this.$component.find("[data-bill-details-id=" + e + "]"), this.updateActiveBill()
        }, i
    }), define("../src/sublayouts/m46-understanding-your-bill/m46-understanding-your-bill", ["jquery", "slick", "lib/utils"], function (t, e, i) {
        "use strict";
        var n = function (t) {
            return this.$component = t, this
        };
        return n.prototype.init = function () {
            if (this.$M46_slider = t(".m46-understanding-your-bill__carousel"), t(".m46-understanding-your-bill__carousel-slide").length > 1) {
                var e = this;
                this.$M46_slider.on("init", function (t) {
                    e.display()
                }), this.$M46_slider.slick({
                    arrows: !0,
                    dots: !0,
                    infinite: !0,
                    speed: 750,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    pauseOnHover: !1,
                    nextArrow: ".m46-understanding-your-bill__carousel-button--next",
                    prevArrow: ".m46-understanding-your-bill__carousel-button--prev",
                    rtl: "rtl" == t("html").attr("dir")
                })
            } else this.display()
        }, n.prototype.display = function () {
            this.$M46_slider.css({
                top: 0,
                opacity: 1,
                position: "relative"
            })
        }, n
    }),
    function (t, e, i) {
        "function" == typeof define && define.amd ? define("jquery_mobile_touch", ["jquery"], function (n) {
            return i(n, t, e), n.mobile
        }) : i(t.jQuery, t, e)
    }(this, document, function (t, e, i, n) {
        ! function (t, e, i, n) {
            function o(t) {
                for (; t && "undefined" != typeof t.originalEvent;) t = t.originalEvent;
                return t
            }

            function s(e, i) {
                var s, r, a, l, c, d, h, u, p, f = e.type;
                if (e = t.Event(e), e.type = i, s = e.originalEvent, r = t.event.props, f.search(/^(mouse|click)/) > -1 && (r = A), s)
                    for (h = r.length, l; h;) l = r[--h], e[l] = s[l];
                if (f.search(/mouse(down|up)|click/) > -1 && !e.which && (e.which = 1), -1 !== f.search(/^touch/) && (a = o(s), f = a.touches, c = a.changedTouches, d = f && f.length ? f[0] : c && c.length ? c[0] : n, d))
                    for (u = 0, p = P.length; p > u; u++) l = P[u], e[l] = d[l];
                return e
            }

            function r(e) {
                for (var i, n, o = {}; e;) {
                    i = t.data(e, T);
                    for (n in i) i[n] && (o[n] = o.hasVirtualBinding = !0);
                    e = e.parentNode
                }
                return o
            }

            function a(e, i) {
                for (var n; e;) {
                    if (n = t.data(e, T), n && (!i || n[i])) return e;
                    e = e.parentNode
                }
                return null
            }

            function l() {
                O = !1
            }

            function c() {
                O = !0
            }

            function d() {
                R = 0, H.length = 0, I = !1, c()
            }

            function h() {
                l()
            }

            function u() {
                p(), L = setTimeout(function () {
                    L = 0, d()
                }, t.vmouse.resetTimerDuration)
            }

            function p() {
                L && (clearTimeout(L), L = 0)
            }

            function f(e, i, n) {
                var o;
                return (n && n[e] || !n && a(i.target, e)) && (o = s(i, e), t(i.target).trigger(o)), o
            }

            function m(e) {
                var i, n = t.data(e.target, $);
                !I && (!R || R !== n) && (i = f("v" + e.type, e), i && (i.isDefaultPrevented() && e.preventDefault(), i.isPropagationStopped() && e.stopPropagation(), i.isImmediatePropagationStopped() && e.stopImmediatePropagation()))
            }

            function g(e) {
                var i, n, s, a = o(e).touches;
                a && 1 === a.length && (i = e.target, n = r(i), n.hasVirtualBinding && (R = z++ , t.data(i, $, R), p(), h(), F = !1, s = o(e).touches[0], D = s.pageX, B = s.pageY, f("vmouseover", e, n), f("vmousedown", e, n)))
            }

            function v(t) {
                O || (F || f("vmousecancel", t, r(t.target)), F = !0, u())
            }

            function y(e) {
                if (!O) {
                    var i = o(e).touches[0],
                        n = F,
                        s = t.vmouse.moveDistanceThreshold,
                        a = r(e.target);
                    F = F || Math.abs(i.pageX - D) > s || Math.abs(i.pageY - B) > s, F && !n && f("vmousecancel", e, a), f("vmousemove", e, a), u()
                }
            }

            function b(t) {
                if (!O) {
                    c();
                    var e, i, n = r(t.target);
                    f("vmouseup", t, n), F || (e = f("vclick", t, n), e && e.isDefaultPrevented() && (i = o(t).changedTouches[0], H.push({
                        touchID: R,
                        x: i.clientX,
                        y: i.clientY
                    }), I = !0)), f("vmouseout", t, n), F = !1, u()
                }
            }

            function x(e) {
                var i, n = t.data(e, T);
                if (n)
                    for (i in n)
                        if (n[i]) return !0;
                return !1
            }

            function w() { }

            function k(e) {
                var i = e.substr(1);
                return {
                    setup: function () {
                        x(this) || t.data(this, T, {});
                        var n = t.data(this, T);
                        n[e] = !0, E[e] = (E[e] || 0) + 1, 1 === E[e] && N.bind(i, m), t(this).bind(i, w), j && (E.touchstart = (E.touchstart || 0) + 1, 1 === E.touchstart && N.bind("touchstart", g).bind("touchend", b).bind("touchmove", y).bind("scroll", v))
                    },
                    teardown: function () {
                        --E[e], E[e] || N.unbind(i, m), j && (--E.touchstart, E.touchstart || N.unbind("touchstart", g).unbind("touchmove", y).unbind("touchend", b).unbind("scroll", v));
                        var n = t(this),
                            o = t.data(this, T);
                        o && (o[e] = !1), n.unbind(i, w), x(this) || n.removeData(T)
                    }
                }
            }
            var _, C, T = "virtualMouseBindings",
                $ = "virtualTouchID",
                S = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),
                P = "clientX clientY pageX pageY screenX screenY".split(" "),
                M = t.event.mouseHooks ? t.event.mouseHooks.props : [],
                A = t.event.props.concat(M),
                E = {},
                L = 0,
                D = 0,
                B = 0,
                F = !1,
                H = [],
                I = !1,
                O = !1,
                j = "addEventListener" in i,
                N = t(i),
                z = 1,
                R = 0;
            for (t.vmouse = {
                moveDistanceThreshold: 10,
                clickDistanceThreshold: 10,
                resetTimerDuration: 1500
            }, C = 0; C < S.length; C++) t.event.special[S[C]] = k(S[C]);
            j && i.addEventListener("click", function (e) {
                var i, n, o, s, r, a, l = H.length,
                    c = e.target;
                if (l)
                    for (i = e.clientX, n = e.clientY, _ = t.vmouse.clickDistanceThreshold, o = c; o;) {
                        for (s = 0; l > s; s++)
                            if (r = H[s], a = 0, o === c && Math.abs(r.x - i) < _ && Math.abs(r.y - n) < _ || t.data(o, $) === r.touchID) return e.preventDefault(), void e.stopPropagation();
                        o = o.parentNode
                    }
            }, !0)
        }(t, e, i),
            function (t) {
                t.mobile = {}
            }(t),
            function (t, e) {
                var n = {
                    touch: "ontouchend" in i
                };
                t.mobile.support = t.mobile.support || {}, t.extend(t.support, n), t.extend(t.mobile.support, n)
            }(t),
            function (t, e, n) {
                function o(e, i, o, s) {
                    var r = o.type;
                    o.type = i, s ? t.event.trigger(o, n, e) : t.event.dispatch.call(e, o), o.type = r
                }
                var s = t(i),
                    r = t.mobile.support.touch,
                    a = "touchmove scroll",
                    l = r ? "touchstart" : "mousedown",
                    c = r ? "touchend" : "mouseup",
                    d = r ? "touchmove" : "mousemove";
                t.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "), function (e, i) {
                    t.fn[i] = function (t) {
                        return t ? this.bind(i, t) : this.trigger(i)
                    }, t.attrFn && (t.attrFn[i] = !0)
                }), t.event.special.scrollstart = {
                    enabled: !0,
                    setup: function () {
                        function e(t, e) {
                            i = e, o(s, i ? "scrollstart" : "scrollstop", t)
                        }
                        var i, n, s = this,
                            r = t(s);
                        r.bind(a, function (o) {
                            t.event.special.scrollstart.enabled && (i || e(o, !0), clearTimeout(n), n = setTimeout(function () {
                                e(o, !1)
                            }, 50))
                        })
                    },
                    teardown: function () {
                        t(this).unbind(a)
                    }
                }, t.event.special.tap = {
                    tapholdThreshold: 750,
                    emitTapOnTaphold: !0,
                    setup: function () {
                        var e = this,
                            i = t(e),
                            n = !1;
                        i.bind("vmousedown", function (r) {
                            function a() {
                                clearTimeout(d)
                            }

                            function l() {
                                a(), i.unbind("vclick", c).unbind("vmouseup", a), s.unbind("vmousecancel", l)
                            }

                            function c(t) {
                                l(), n || h !== t.target ? n && t.preventDefault() : o(e, "tap", t)
                            }
                            if (n = !1, r.which && 1 !== r.which) return !1;
                            var d, h = r.target;
                            i.bind("vmouseup", a).bind("vclick", c), s.bind("vmousecancel", l), d = setTimeout(function () {
                                t.event.special.tap.emitTapOnTaphold || (n = !0), o(e, "taphold", t.Event("taphold", {
                                    target: h
                                }))
                            }, t.event.special.tap.tapholdThreshold)
                        })
                    },
                    teardown: function () {
                        t(this).unbind("vmousedown").unbind("vclick").unbind("vmouseup"), s.unbind("vmousecancel")
                    }
                }, t.event.special.swipe = {
                    scrollSupressionThreshold: 30,
                    durationThreshold: 1e3,
                    horizontalDistanceThreshold: 30,
                    verticalDistanceThreshold: 30,
                    getLocation: function (t) {
                        var i = e.pageXOffset,
                            n = e.pageYOffset,
                            o = t.clientX,
                            s = t.clientY;
                        return 0 === t.pageY && Math.floor(s) > Math.floor(t.pageY) || 0 === t.pageX && Math.floor(o) > Math.floor(t.pageX) ? (o -= i, s -= n) : (s < t.pageY - n || o < t.pageX - i) && (o = t.pageX - i, s = t.pageY - n), {
                            x: o,
                            y: s
                        }
                    },
                    start: function (e) {
                        var i = e.originalEvent.touches ? e.originalEvent.touches[0] : e,
                            n = t.event.special.swipe.getLocation(i);
                        return {
                            time: (new Date).getTime(),
                            coords: [n.x, n.y],
                            origin: t(e.target)
                        }
                    },
                    stop: function (e) {
                        var i = e.originalEvent.touches ? e.originalEvent.touches[0] : e,
                            n = t.event.special.swipe.getLocation(i);
                        return {
                            time: (new Date).getTime(),
                            coords: [n.x, n.y]
                        }
                    },
                    handleSwipe: function (e, i, n, s) {
                        if (i.time - e.time < t.event.special.swipe.durationThreshold && Math.abs(e.coords[0] - i.coords[0]) > t.event.special.swipe.horizontalDistanceThreshold && Math.abs(e.coords[1] - i.coords[1]) < t.event.special.swipe.verticalDistanceThreshold) {
                            var r = e.coords[0] > i.coords[0] ? "swipeleft" : "swiperight";
                            return o(n, "swipe", t.Event("swipe", {
                                target: s,
                                swipestart: e,
                                swipestop: i
                            }), !0), o(n, r, t.Event(r, {
                                target: s,
                                swipestart: e,
                                swipestop: i
                            }), !0), !0
                        }
                        return !1
                    },
                    eventInProgress: !1,
                    setup: function () {
                        var e, i = this,
                            n = t(i),
                            o = {};
                        e = t.data(this, "mobile-events"), e || (e = {
                            length: 0
                        }, t.data(this, "mobile-events", e)), e.length++ , e.swipe = o, o.start = function (e) {
                            if (!t.event.special.swipe.eventInProgress) {
                                t.event.special.swipe.eventInProgress = !0;
                                var n, r = t.event.special.swipe.start(e),
                                    a = e.target,
                                    l = !1;
                                o.move = function (e) {
                                    r && !e.isDefaultPrevented() && (n = t.event.special.swipe.stop(e), l || (l = t.event.special.swipe.handleSwipe(r, n, i, a), l && (t.event.special.swipe.eventInProgress = !1)), Math.abs(r.coords[0] - n.coords[0]) > t.event.special.swipe.scrollSupressionThreshold && e.preventDefault())
                                }, o.stop = function () {
                                    l = !0, t.event.special.swipe.eventInProgress = !1, s.off(d, o.move), o.move = null
                                }, s.on(d, o.move).one(c, o.stop)
                            }
                        }, n.on(l, o.start)
                    },
                    teardown: function () {
                        var e, i;
                        e = t.data(this, "mobile-events"), e && (i = e.swipe, delete e.swipe, e.length-- , 0 === e.length && t.removeData(this, "mobile-events")), i && (i.start && t(this).off(l, i.start), i.move && s.off(d, i.move), i.stop && s.off(c, i.stop))
                    }
                }, t.each({
                    scrollstop: "scrollstart",
                    taphold: "tap",
                    swipeleft: "swipe.left",
                    swiperight: "swipe.right"
                }, function (e, i) {
                    t.event.special[e] = {
                        setup: function () {
                            t(this).bind(i, t.noop)
                        },
                        teardown: function () {
                            t(this).unbind(i)
                        }
                    }
                })
            }(t, this)
    }), define("../src/sublayouts/m47-video-gallery/m47-video-gallery", ["jquery", "lib/utils", "jquery_mobile_touch"], function (t, e) {
        "use strict";
        var i = function (t) {
            return this.$component = t, this
        };
        return i.prototype.init = function () {
            var e = document.createElement("script"),
                i = document.getElementsByTagName("script")[0],
                n = this;
            window.player = null, n.isRTL = "rtl" == t("html").attr("dir"), n.$sliderContainer = n.$component.find(".m47-video-gallery__thumb-gallery-container"), n.$slider = n.$component.find(".m47-video-gallery__thumb-gallery"), n.$numSlides = n.$component.find(".m47-video-gallery__thumb-gallery-slide").length, n.$slidesToShow = 6, n.$gutter = t(window).width() >= 1024 ? 8 : 4, n.$padding = t(window).width() >= 1024 ? 0 : 32, n.$slideImgs = n.$component.find(".m47-video-gallery__thumb-gallery-slide-image"), n.$slides = n.$component.find(".m47-video-gallery__thumb-gallery-slide"), n.$inner = n.$component.find(".m47-video-gallery__thumb-gallery--inner"), n.$slidetrack = n.$component.find(".m47-video-gallery__thumb-gallery--track"), n.$videoContainer = n.$component.find(".m47-video-gallery__videoplayer-container"), e.src = "//www.youtube.com/iframe_api", i.parentNode.insertBefore(e, i), window.initID = n.$component.find('[data-index="0"]').data("videoid"), n.initCarousel(), t(".m47-video-gallery__thumb-gallery-slide").each(function (e) {
                t(this).attr("tabindex", "0"), console.log("asd")
            })
        }, i.prototype.initCarousel = function () {
            var e = this;
            this.$slideImgs.each(function () {
                t(this).css({
                    background: 'url("' + t(this).data("src") + '")',
                    backgroundSize: "auto 150%",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat"
                })
            });
            for (var i = this.$slides.length - 1; i > this.$slides.length - 1 - this.$slidesToShow; i--) this.$slidetrack.prepend(t(this.$slides[i]).clone(!0));
            for (var i = 0; i < this.$slidesToShow; i++) this.$slidetrack.append(t(this.$slides[i]).clone(!0));
            this.$slides = t(".m47-video-gallery__thumb-gallery-slide"), this.$imageWidth = Math.round((this.$inner.width() - (this.$slidesToShow - 1) * this.$gutter) / this.$slidesToShow), this.$tileWidth = this.$imageWidth + this.$gutter, this.$slidetrack.width(this.$slides.length * this.$tileWidth), this.$slides.find(".m47-video-gallery__thumb-gallery-slide-image").each(function () {
                t(this).css({
                    width: e.$imageWidth,
                    paddingBottom: e.$imageWidth
                })
            }), this.$slides.find(".m47-video-gallery__thumb-gallery-slide-inner").each(function () {
                t(this).css({
                    paddingRight: e.$gutter
                })
            });
            var n = this.$slides.length,
                o = this.$tileWidth,
                s = e.$slidesToShow;
            this.$initOffset = e.isRTL ? -1 * (o * n - o * s * 2) : o * s * -1, this.$slidetrack.css("position", "absolute"), this.$inner.css("height", t(this.$slidetrack).height()), this.$slidetrack.css("left", this.$initOffset), this.$inner.append('<div role="button" aria-label="Previous" class="btn-prev"></div>'), this.$inner.append('<div role="button" aria-label="Next" class="btn-next"></div>'), this.$slidetrack.on("swiperight", function (t) {
                t.stopImmediatePropagation(), t.preventDefault(), e.scrollCarousel(e.isRTL ? 1 : -1)
            }), this.$slidetrack.on("swipeleft", function (t) {
                t.stopImmediatePropagation(), t.preventDefault(), e.scrollCarousel(e.isRTL ? -1 : 1)
            }), this.$component.find(".btn-prev").unbind().on("click", function (t) {
                t.stopImmediatePropagation(), t.preventDefault(), t.stopPropagation(), e.scrollCarousel(-1)
            }), this.$component.find(".btn-next").unbind().on("click", function (t) {
                t.stopImmediatePropagation(), t.preventDefault(), t.stopPropagation(), e.scrollCarousel(1)
            }), t(window).on("resize", function () {
                var i = Math.round(-1 * t(e.$slidetrack)[0].offsetLeft / e.$tileWidth),
                    n = t(e.$slidetrack),
                    o = t(e.$inner),
                    s = e.$slidesToShow,
                    r = t(e.$slides),
                    a = e.$gutter = t(window).width() >= 1024 ? 32 : 16,
                    l = Math.round((o.width() - (s - 1) * a) / s),
                    c = e.$tileWidth = l + a;
                n.width(r.length * c), o.css("height", n.height()), r.find(".m47-video-gallery__thumb-gallery-slide-image").each(function () {
                    t(this).css({
                        width: l,
                        paddingBottom: l
                    })
                }), r.find(".m47-video-gallery__thumb-gallery-slide-inner").each(function () {
                    t(this).css({
                        paddingRight: e.$gutter
                    })
                }), n.css({
                    left: c * i * -1 + "px"
                })
            }), t(this.$slidetrack).bind("webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", function () {
                e.transitionComplete()
            }), this.$current = 0
        }, i.prototype.transitionComplete = function () {
            var e = this,
                i = this.$initOffset,
                n = this.$current,
                o = t(this.$slidetrack),
                s = this.$slidesToShow,
                r = this.$numSlides,
                a = this.$tileWidth;
            console.log("asd"), this.$current == -1 * s ? (n = this.$current = r - s, o.css({
                left: (e.isRTL ? i + n * a : i - n * a) + "px"
            })) : n == r && (this.$current = 1, o.css({
                left: i + "px"
            }))
        }, i.prototype.scrollCarousel = function (e) {
            var i = this;
            this.$current += e;
            var n = this.$tileWidth,
                o = t(this.$slidetrack)[0].offsetLeft,
                s = t(this.$slidetrack),
                r = Math.floor(this.isRTL ? o + n * e : o + n * (-1 * e));
            s.animate({
                left: r
            }, 500, t.proxy(function () {
                i.transitionComplete()
            }, i))
        }, window.onYouTubeIframeAPIReady = function () {
            window.player = new YT.Player("player", {
                width: "100%",
                height: "100%",
                videoId: window.initID,
                events: {
                    onReady: window.onPlayerReady,
                    onStateChange: window.onPlayerStateChange,
                    onError: window.onPlayerError
                }
            })
        }, window.onPlayerReady = function () {
            player.setPlaybackQuality("large"), jQuery(".m47-video-gallery__thumb-gallery-slide").on("click", function (t) {
                player.loadVideoById(jQuery(this).data("videoid"))
            }), jQuery(".m47-video-gallery__thumb-gallery-slide").bind("keyup", function (t) {
                13 === t.keyCode && player.loadVideoById(jQuery(this).data("videoid"))
            })
        }, window.onPlayerError = function (t) { }, i.prototype.loadVideoById = function (t) {
            window.player.loadVideoById(t)
        }, window.onPlayerStateChange = function (t) { }, i.prototype.stopVideo = function () {
            this.player.stopVideo()
        }, i.prototype.display = function () {
            this.$slider.css({
                top: 0,
                position: "relative"
            })
        }, i
    }), define("../src/sublayouts/m48-payment-total-submit/m48-payment-total-submit", ["jquery", "lib/utils", "numeral"], function (t, e) {
        "use strict";
        var i = function (t) {
            return this.$component = t, this
        };
        return i.prototype.init = function () {
            this.$input = t("#form-field-editpayment"), this.$total = this.$component.find("#form-field-billtotal"), this.$amountLabel = this.$component.find(".amount_label"), this.$submit = this.$component.find(".m48-payment-total-submit--button"), this.suffix = this.$component.data("currency-suffix"), this.billDefault = this.$component.data("bill-default"), this.paymentMax = this.$component.data("payment-max"), this.updateTotal(), this.$input.on("blur change", t.proxy(this.updateTotal, this)), this.$input.parents(".edit-toggle__input-wrapper").find(".edit-toggle__cancel > button").on("click", t.proxy(function () {
                this.$input.val(""), this.updateTotal()
            }, this))
        }, i.prototype.updateTotal = function () {
            var t = this.$input.val();
            parseFloat(t) <= 0 && (t = "0.00 " + this.suffix), "" === t && (t = this.billDefault), t = parseFloat(t).toFixed(2), this.$total.val(t).parsley().validate(), this.$amountLabel.text(this.getFormattedValue(t, this.suffix)), t > 0 && t <= parseFloat(this.paymentMax) ? this.$submit.removeAttr("disabled").removeClass("disabled") : this.$submit.attr("disabled", !0).addClass("disabled")
        }, i.prototype.getFormattedValue = function (t, i) {
            var n = e.isRTL() ? "‏" : "",
                o = numeral(parseFloat(t)).format("0,0.00");
            return n + o + " " + i
        }, i
    }), define("../src/sublayouts/m49-list-filter/m49-list-filter", ["jquery", "lib/utils"], function (t, e) {
        "use strict";
        var i = function (t) {
            return this.$component = t, this
        };
        return i.prototype.init = function () {
            this.listIdentifier = this.$component.data("filter-list"), this.$input = this.$component.find(".m49-list-filter--input"), this.$filterButton = this.$component.find(".m49-list-filter--button"), this.$listContainer = t(this.listIdentifier), this.$filterItems = this.$listContainer.find(".form-field__checkbox, .form-field__radio"), this.$bpSections = t(".m44-bill-selector__partner, .m43-accountsel__group, .m51-smart-wallet__partner"), this.$noMatches = this.$listContainer.find(".m49-no-matches, + .m49-no-matches"), this.$input.on("keydown", t.proxy(function () {
                window.setTimeout(t.proxy(this.filterList, this), 10)
            }, this)), this.$filterButton.on("click", t.proxy(this.filterList, this))
        }, i.prototype.filterList = function () {
            var e, i = this.$input.val();
            this.$filterItems.each(function (e, n) {
                var o = t(n);
                "" === i || o.find(".form-field__input--radio:checked").length || o.find('[data-acc-detail="acc_number"]').text().indexOf(i) >= 0 || o.find(".m43-accountsel__name, .m44-bill-selector__name, .m51-smart-wallet__name").children(":first-child").text().toLowerCase().indexOf(i.toLowerCase()) >= 0 || o.find(".m45-estimate-selector__id").text().indexOf(i) >= 0 ? o.show() : o.hide(400, function () {
                    console.log(n)
                })
            }), window.setTimeout(t.proxy(function () {
                e = this.$filterItems.filter(":visible"), "" === i || e.find('[data-acc-detail="acc_number"]').text().indexOf(i) >= 0 || e.find(".m43-accountsel__name, .m44-bill-selector__name, .m51-smart-wallet__name").children(":first-child").text().toLowerCase().indexOf(i.toLowerCase()) >= 0 || e.find(".m45-estimate-selector__id").text().indexOf(i) >= 0 ? this.$noMatches.hide() : this.$noMatches.show()
            }, this), 5), this.$bpSections.length && this.$bpSections.each(function (e, i) {
                var n = t(i),
                    o = n.find(".m44-bill-selector__accounts-list, .m43-accountsel__accounts-list, .m51-smart-wallet__accounts-list"),
                    s = o.find(".form-field__checkbox, .form-field__radio");
                s.filter('[style*="display:none;"], [style*="display: none;"]').length === s.length ? n.hide() : n.show()
            })
        }, i
    }), define("../src/sublayouts/m51-smart-wallet/m51-smart-wallet", ["jquery", "lib/utils", "numeral"], function (t, e) {
        "use strict";
        var i = function (t) {
            return this.$component = t, this
        };
        return i.prototype.init = function () {
            var e = this;
            dewaGlobal.billAccountsListSelected = [], this.$checkboxes = this.$component.find('[ data-input="checkbox" ]'), this.$total = this.$component.find(".m51-smart-wallet__total .m42-keyvalue--justified-dd"), this.$selectionTotal = this.$component.find(".m51-smart-wallet__total .m42-keyvalue__key"), this.$selectionAccountPlural = this.$selectionTotal.find(".m51-account-plural"), this.suffix = this.$component.data("currency-suffix"), this.$accountImages = this.$component.find(' [ data-acc-detail="acc_image" ] '), this.$nextButton = t("[data-m51-next]"), this.$component.delegate('[ data-input="checkbox" ]', "change", function (i) {
                i.stopImmediatePropagation();
                var n = t(this),
                    o = n.is(":checked") ? 1 : 0;
                e.updateMultiSelectionData(n, o), e.updateTotal()
            }), this.$component.delegate(".m51-smart-wallet__review-details--edit", "click", function (i) {
                e.isolateEvent(i), e.showEditAmountForm(t(this))
            }), this.$component.delegate(".m44-bill-selector__deselect", "click", function (i) {
                e.isolateEvent(i), 1 == t(this).data("state") ? (t(this).data("state", 0), t(this).text(t(this).data("select")), e.$checkboxes.each(function () {
                    t(this).hasClass("disabled") || t(this).prop("checked", !1)
                })) : (t(this).data("state", 1), t(this).text(t(this).data("deselect")), e.$checkboxes.each(function () {
                    t(this).hasClass("disabled") || t(this).prop("checked", !0)
                })), e.updateTotal()
            }), t(window).on("updatetotal", function () {
                e.updateTotal()
            }), this.$component.delegate(".m51-smart-wallet__review-form-button--cancel", "click", function (i) {
                e.isolateEvent(i), e.hideEditAmountForm(t(this))
            }), t(".m51-smart-wallet__review-form-button--set").on("click", function (e) {
                t(this).parent().find("input").trigger("blur")
            }), t(".m51-smart-wallet__review-form--input").find("input").on("keyup", function (e) {
                13 === e.keyCode && t(this).trigger("blur")
            }), t(".m51-m12-yes").on("click", function () {
                t(t(this).parent().parent().parent().parent().parent().parent().parent().parent()).remove()
            }), t(".m51-smart-wallet__review-form--input").find("input").on("submit", function (t) {
                return t.preventDefault, !1
            }), this.$component.delegate(".m51-smart-wallet__submit .button", "click", function (i) {
                e.isolateEvent(i);
                var n = t(this).closest("form"),
                    o = n.parsley().isValid();
                o && n.submit()
            }), this.$nextButton.on("click", function (i) {
                t(this).is("[disabled]") && i.preventDefault(), dewaGlobal.billAccountsListSelected = e.billAccountsListSelected
            }), this.paymentMax = this.$component.data("payment-max"), this.isBillSelectorPage = this.$component.find(".m51-smart-wallet__account--select").length > 0 ? !0 : !1, this.billAccountsList = [], this.billAccountsListSelected = [], this.isBillSelectorPage && (this.billAccountsList = t.map(dewaGlobal.billAccountsList, function (t, e) {
                return {
                    AccountNumber: t.AccountNumber,
                    Active: t.Active,
                    Balance: t.Balance,
                    BusinessPartnerNumber: t.BusinessPartnerNumber
                }
            }), this.billAccountsListSelected = this.billAccountsList), this.$checkboxes.each(function () {
                e.populateTotals(t(this))
            }), this.$component.find(".m51-smart-wallet__account--review").length && (this.reviewMode = !0, this.$submit = this.$component.find(".m51-smart-wallet__submit > button"), this.$hiddenTotal = this.$component.find("#form-field-billtotal"), this.initReviewTotal(), t(".m51-smart-wallet").delegate(".form-field__input--text", "blur change", function (i) {
                i.stopPropagation(), e.editTotal(t(this))
            })), this.$component.find(".m51-smart-wallet__account--select").length && e.updateTotal(), this.sequentiallyLoadImages();
            var i = this.$component.find("[ data-pager-update ]");
            t(i).on("click", function () {
                e.$checkboxes = e.$component.find('[ data-input="checkbox" ]'), e.$total = e.$component.find(".m51-smart-wallet__total .m42-keyvalue--justified-dd"), e.$selectionTotal = e.$component.find(".m51-smart-wallet__total .m42-keyvalue__key"), e.$selectionAccountPlural = e.$selectionTotal.find(".m51-account-plural"), e.suffix = e.$component.data("currency-suffix"), e.$accountImages = e.$component.find(' [ data-acc-detail="acc_image" ] '), e.$checkboxes.each(function () {
                    e.populateTotals(t(this));
                    var i = t(this).data("account-number").toString(),
                        n = t.grep(e.billAccountsListSelected, function (t) {
                            return t.AccountNumber === i
                        });
                    n.length > 0 ? t(this).prop("checked", !0) : t(this).prop("checked", !1)
                }), e.updateTotal()
            })
        }, i.prototype.updateMultiSelectionData = function (e, i) {
            var n = {
                AccountNumber: e.data("account-number").toString(),
                Active: Boolean(e.data("active")),
                Balance: Number(e.data("balance")),
                BusinessPartnerNumber: e.data("business-partner-number").toString()
            },
                o = t.grep(this.billAccountsListSelected, function (t) {
                    return t.AccountNumber === n.AccountNumber
                });
            0 == i ? this.billAccountsListSelected = t.grep(this.billAccountsListSelected, function (t, e) {
                return t.AccountNumber === n.AccountNumber
            }, !0) : 0 == o.length && 1 == i && this.billAccountsListSelected.push(n)
        }, i.prototype.isolateEvent = function (t) {
            t.preventDefault(), t.stopPropagation(), t.stopImmediatePropagation()
        }, i.prototype.showEditAmountForm = function (e) {
            t(e).closest(".m51-smart-wallet__account--review").find(".m51-smart-wallet__review-form").css({
                height: "auto"
            })
        }, i.prototype.hideEditAmountForm = function (e) {
            var i = t(e).closest(".m51-smart-wallet__account--review");
            i.data("bill-partial", i.data("bill-amount")), i.find(".form-field__input--text").val(i.data("bill-amount")), i.find(".m51-smart-wallet__review-form").css({
                height: "0"
            }), this.updateReviewTotal()
        }, i.prototype.editTotal = function (t) {
            t.closest(".m51-smart-wallet__account--review").data("bill-partial", Number(t.val())), this.updateReviewTotal()
        }, i.prototype.getReviewTotal = function (i) {
            var n = this,
                o = 0;
            e.isRTL() ? "‏" : "";
            return this.$component.find(".m51-smart-wallet__account--review").each(function () {
                var e = t(this);
                i && (e.find("input[data-parsley-currency]").length && e.data("bill-partial").toString() !== e.find("input[data-parsley-currency]").val() && (n.showEditAmountForm(e.find(".m51-smart-wallet__review-details--edit")), e.data("bill-partial", Number(e.find("input[data-parsley-currency]").val()))), e.find("button").text(n.getFormattedValue(e.data("bill-amount"), n.suffix))), e.data("bill-amount") != e.data("bill-partial") ? e.data("bill-partial") > 0 && (o += Number(e.data("bill-partial"))) : e.data("bill-amount") > 0 && (o += Number(e.data("bill-amount"))), n.reviewMode && (n.$hiddenTotal.val(o.toFixed(2)).parsley().validate(), o.toFixed(2) > 0 && o.toFixed(2) <= parseFloat(n.paymentMax) ? n.$submit.removeAttr("disabled").removeClass("disabled") : n.$submit.attr("disabled", !0).addClass("disabled"))
            }), parseFloat(o).toFixed(2)
        }, i.prototype.updateReviewTotal = function () {
            this.updateDisplay(this.getReviewTotal())
        }, i.prototype.initReviewTotal = function () {
            this.updateDisplay(this.getReviewTotal(!0))
        }, i.prototype.updateDisplay = function (i) {
            var n = this.$component.data("currency-suffix");
            e.isRTL() ? "‏" : "";
            t(this.$component).data("bill-total", i), t(this.$component).find(".amount_label").text(this.getFormattedValue(i, n))
        }, i.prototype.updateTotal = function () {
            var i = this,
                n = 0;
            e.isRTL() ? "‏" : "";
            t(this.billAccountsListSelected).each(function (t, e) {
                var i = e.Balance;
                i > 0 && (n += i)
            }), 0 >= n && (n = "0.00"), n = parseFloat(n).toFixed(2), t(this.$component).data("bill-total", n), this.$total.text(this.getFormattedValue(n, i.suffix)), this.updateSelectCount()
        }, i.prototype.updateSelectCount = function () {
            var t = this.billAccountsListSelected.length;
            this.$selectionTotal.find(".m51-account-count").text(t), 1 === t && this.$selectionAccountPlural.text() !== this.$selectionAccountPlural.data("single") ? this.$selectionAccountPlural.text(this.$selectionAccountPlural.data("single")) : 1 !== t && this.$selectionAccountPlural.text() !== this.$selectionAccountPlural.data("plural") && this.$selectionAccountPlural.text(this.$selectionAccountPlural.data("plural")), t > 0 ? this.$nextButton.removeClass("disabled").removeAttr("disabled") : this.$nextButton.addClass("disabled").attr("disabled", !0)
        }, i.prototype.populateTotals = function (e) {
            var i = this,
                n = e.closest(".form-field__checkbox--billselector"),
                o = n.find(".m51-smart-wallet__account--select"),
                s = this.$component.data("currency-suffix");
            o.each(function () {
                n.find("button").text(i.getFormattedValue(t(this).data("bill-amount"), s))
            })
        }, i.prototype.getFormattedValue = function (t, i) {
            var n = e.isRTL() ? "‏" : "",
                o = numeral(parseFloat(t)).format("0,0.00");
            return n + o + " " + i
        }, i.prototype.sequentiallyLoadImages = function (e) {
            function i(e, i) {
                var n = t.Deferred(),
                    o = t(i).data("src");
                return i.onload = function () {
                    n.done()
                }, o ? i.src = o : n.done(), n.promise()
            }
            var n, o, s = this,
                r = s.$accountImages,
                a = [],
                l = 10;
            e = e || 0, n = e + l, o = r.slice(e, n), a.push(o.each(i)), t.when.apply(t, a).always(function (t) {
                n < r.length && s.sequentiallyLoadImages(n)
            })
        }, i
    }), define("../src/sublayouts/m55-rammas/m55-rammas", ["jquery", "lib/utils"], function (t, e) {
        "use strict";
        var i = function (t) {
            return this.$component = t, this
        };
        return i.prototype.init = function () {
            t(window).scroll(function () {
                this.$rammasBtn = t(".rammas"), this.$happinesBtn = t(".happiness"), this.$fromBottm = t(document).height() - t(window).scrollTop() - t(window).height(), this.$rammasBtn.css({
                    bottom: this.$fromBottm
                }), this.$happinesBtn.css({
                    bottom: this.$fromBottm
                }), this.$fromBottm < 532 ? (this.$rammasBtn.css({
                    bottom: 535 - this.$fromBottm
                }), this.$happinesBtn.css({
                    bottom: 535 - this.$fromBottm
                })) : (this.$rammasBtn.css({
                    bottom: 3
                }), this.$happinesBtn.css({
                    bottom: 3
                }))
            }).scroll(), this.$footerModel = this.$component.find(".m39-modal__container"), this.$totalHeight = t(window).height(), this.$topMargin = this.$totalHeight / 10, this.$footerModel.css({
                "margin-top": this.$topMargin,
                "margin-bottom": this.$topMargin
            })
        }, i
    }), define("../src/sublayouts/m62-expand/m62-expand", ["jquery", "breakpoint", "lib/utils"], function (t, e, i) {
        "use strict";
        var n = function (t) {
            return this.$component = t, this
        };
        return n.prototype.init = function () {
            this.$tabTrigger = this.$component.find('[data-m62-expands-trigger="true"]'), this.$tabs = this.$component.find('[data-m62-expands-expand="true"]'), this.$tabsMenu = this.$component.find('[data-m62-expands-menu="true"]'), this.$content = this.$component.find('[data-m62-expands-content="true"]'), this.selectedTabID = i.getParameterByName("faq"), "" === this.selectedTabID && (this.selectedTabID = i.getParameterByName("id")), this.activeTabsClass = "m62-expand--active", this.activeContentClass = "m62-tabs--content--active", this.$selectedTab = this.$tabs.eq(0), "" !== this.selectedTabID && (this.$selectedTab = this.$component.find("#" + this.selectedTabID), void 0 === this.$selectedTab[0] && (this.$selectedTab = this.$tabs.eq(0))), this.setUpDesktopView()
        }, n.prototype.setUpDesktopView = function () {
            var e = this;
            this.$tabsMenu.show(), this.$tabs.on("click", function (i) {
                i.preventDefault(), e.displayTab(t(this))
            }), this.displayTab(this.$selectedTab)
        }, n.prototype.displayTab = function (e) {
            e.hasClass(this.activeTabsClass) ? (e.removeClass(this.activeTabsClass), e.attr("aria-selected", !1), t("#" + e.attr("aria-controls")).removeClass(this.activeContentClass)) : (this.$tabs.removeClass(this.activeTabsClass).attr("aria-selected", !1), e.addClass(this.activeTabsClass), e.attr("aria-selected", !0), this.$content.removeClass(this.activeContentClass), this.$content.parent().removeClass("toggle-menu__itemactive"), t("#" + e.attr("aria-controls")).addClass(this.activeContentClass), this.$selectedTab = e)
        }, n
    }), define("../src/sublayouts/m63-search-results/m63-search-results", ["jquery"], function (t) {
        "use strict";
        var e = function (t) {
            return this.$component = t, this
        };
        return e.prototype.init = function () {
            var e = !1;
            t(".m63-search-results--modify").on("click", function () {
                t(window).width() < 1024 ? (t(".m12-mobile-menu-button").trigger("click"), t(".mobile-menu__tool-button--search").trigger("click"), e = !0) : t(".m31-search__button").trigger("click")
            }), t(".m12-search__panel--close").on("click", function () {
                e && (t(".mobile-menu-closebtn").trigger("click"), e = !1)
            })
        }, e
    }), define("../src/sublayouts/m65-gallery/m65-gallery", ["jquery", "slick"], function (t) {
        "use strict";
        var e = function (t) {
            return this.$component = t, this
        };
        return e.prototype.init = function () {
            t(".m65-gallery__thumbnail").each(function () {
                t(this).hover(function () {
                    t(this).find(".m65-gallery__date").fadeIn(250), t(this).find(".m65-gallery__caption").fadeIn(250)
                }, function () {
                    t(this).find(".m65-gallery__date").fadeOut(250), t(this).find(".m65-gallery__caption").fadeOut(250)
                })
            })
        }, e
    }), define("../src/sublayouts/m9-teaser/m9-teaser", ["jquery"], function (t) {
        "use strict";
        var e = function (t) {
            return this.$component = t, this
        };
        return e.prototype.init = function () {
            t(".m9-teaser .teaser__title").each(function () {
                t(this).hover(function () {
                    t(this).addClass("teaser__title--active")
                }, function () {
                    t(this).removeClass("teaser__title--active")
                })
            })
        }, e
    });
