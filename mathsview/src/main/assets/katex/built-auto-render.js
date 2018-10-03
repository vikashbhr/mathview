(function(e) {
    if ("function" == typeof bootstrap) bootstrap("rendermathinelement", e);
    else if ("object" == typeof exports) module.exports = e();
    else if ("function" == typeof define && define.amd) define(e);
    else if ("undefined" != typeof ses) {
        if (!ses.ok()) return;
        ses.makeRenderMathInElement = e
    } else "undefined" != typeof window ? window.renderMathInElement = e() : global.renderMathInElement = e()
})(function() {
    var e, t, r, n, a;
    return function i(e, t, r) {
        function n(o, l) {
            if (!t[o]) {
                if (!e[o]) {
                    var f = typeof require == "function" && require;
                    if (!l && f) return f(o, !0);
                    if (a) return a(o, !0);
                    throw new Error("Cannot find module '" + o + "'")
                }
                var s = t[o] = {
                    exports: {}
                };
                e[o][0].call(s.exports, function(t) {
                    var r = e[o][1][t];
                    return n(r ? r : t)
                }, s, s.exports, i, e, t, r)
            }
            return t[o].exports
        }
        var a = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++) n(r[o]);
        return n
    }({
        1: [function(e, t, r) {
            var n = e("./splitAtDelimiters");
            var a = function(e, t) {
                var r = [{
                    type: "text",
                    data: e
                }];
                for (var a = 0; a < t.length; a++) {
                    var i = t[a];
                    r = n(r, i.left, i.right, i.display || false)
                }
                return r
            };
            var i = function(e, t) {
                var r = a(e, t);
                var n = document.createDocumentFragment();
                for (var i = 0; i < r.length; i++) {
                    if (r[i].type === "text") {
                        n.appendChild(document.createTextNode(r[i].data))
                    } else {
                        var o = document.createElement("span");
                        var l = r[i].data;
                        katex.render(l, o, {
                            displayMode: r[i].display
                        });
                        n.appendChild(o)
                    }
                }
                return n
            };
            var o = function(e, t, r) {
                for (var n = 0; n < e.childNodes.length; n++) {
                    var a = e.childNodes[n];
                    if (a.nodeType === 3) {
                        var l = i(a.textContent, t);
                        n += l.childNodes.length - 1;
                        e.replaceChild(l, a)
                    } else if (a.nodeType === 1) {
                        var f = r.indexOf(a.nodeName.toLowerCase()) === -1;
                        if (f) {
                            o(a, t, r)
                        }
                    } else {}
                }
            };
            var l = {
                delimiters: [{
                    left: "$$",
                    right: "$$",
                    display: true
                }, {
                    left: "\\[",
                    right: "\\]",
                    display: true
                }, {
                    left: "\\(",
                    right: "\\)",
                    display: false
                }],
                ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"]
            };
            var f = function(e) {
                var t, r;
                for (var n = 1, a = arguments.length; n < a; n++) {
                    t = arguments[n];
                    for (r in t) {
                        if (Object.prototype.hasOwnProperty.call(t, r)) {
                            e[r] = t[r]
                        }
                    }
                }
                return e
            };
            var s = function(e, t) {
                if (!e) {
                    throw new Error("No element provided to render")
                }
                t = f({}, l, t);
                o(e, t.delimiters, t.ignoredTags)
            };
            t.exports = s
        }, {
            "./splitAtDelimiters": 2
        }],
        2: [function(e, t, r) {
            var n = function(e, t, r) {
                var n = r;
                var a = 0;
                var i = e.length;
                while (n < t.length) {
                    var o = t[n];
                    if (a <= 0 && t.slice(n, n + i) === e) {
                        return n
                    } else if (o === "\\") {
                        n++
                    } else if (o === "{") {
                        a++
                    } else if (o === "}") {
                        a--
                    }
                    n++
                }
                return -1
            };
            var a = function(e, t, r, a) {
                var i = [];
                for (var o = 0; o < e.length; o++) {
                    if (e[o].type === "text") {
                        var l = e[o].data;
                        var f = true;
                        var s = 0;
                        var d;
                        d = l.indexOf(t);
                        if (d !== -1) {
                            s = d;
                            i.push({
                                type: "text",
                                data: l.slice(0, s)
                            });
                            f = false
                        }
                        while (true) {
                            if (f) {
                                d = l.indexOf(t, s);
                                if (d === -1) {
                                    break
                                }
                                i.push({
                                    type: "text",
                                    data: l.slice(s, d)
                                });
                                s = d
                            } else {
                                d = n(r, l, s + t.length);
                                if (d === -1) {
                                    break
                                }
                                i.push({
                                    type: "math",
                                    data: l.slice(s + t.length, d),
                                    display: a
                                });
                                s = d + r.length
                            }
                            f = !f
                        }
                        i.push({
                            type: "text",
                            data: l.slice(s)
                        })
                    } else {
                        i.push(e[o])
                    }
                }
                return i
            };
            t.exports = a
        }, {}]
    }, {}, [1])(1)
});