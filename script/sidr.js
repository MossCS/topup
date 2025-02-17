/*! Sidr - v1.1.1 - 2013-03-14
 * https://github.com/artberri/sidr
 * Copyright (c) 2013 Alberto Varela; Licensed MIT */
(function(e) {
    var t = !1
      , i = !1
      , o = {
        isUrl: function(e) {
            var t = RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i");
            return t.test(e) ? !0 : !1
        },
        loadContent: function(e, t) {
            e.html(t)
        },
        addPrefix: function(e) {
            var t = e.attr("id")
              , i = e.attr("class");
            "string" == typeof t && "" !== t && e.attr("id", t.replace(/([A-Za-z0-9_.\-]+)/g, "sidr-id-$1")),
            "string" == typeof i && "" !== i && "sidr-inner" !== i && e.attr("class", i.replace(/([A-Za-z0-9_.\-]+)/g, "sidr-class-$1")),
            e.removeAttr("style")
        },
        execute: function(o, n, s) {
            "function" == typeof n ? (s = n,
            n = "sidr") : n || (n = "sidr");
            var a, d, l, c = e("#" + n), f = e(c.data("body")), u = e("html"), p = c.outerWidth(!0), y = c.data("speed"), v = c.data("side");
            if ("open" === o || "toogle" === o && !c.is(":visible")) {
                if (c.is(":visible") || t)
                    return;
                if (i !== !1)
                    return r.close(i, function() {
                        r.open(n)
                    }),
                    void 0;
                t = !0,
                "right" === v ? (a = {
                    right: p + "px"
                },
                d = {
                    right: "0px"
                }) : (a = {
                    right: p + "px"
                },
                d = {
                    right: "0px"
                }),
                l = u.scrollTop(),
                u.css("overflow-x", "hidden").scrollTop(l),
                f.css({
                    width: f.width(),
                    position: "absolute"
                }).animate(a, y),
                c.css("display", "block").animate(d, y, function() {
                    t = !1,
                    i = n,
                    "function" == typeof s && s(n)
                })
            } else {
                if (!c.is(":visible") || t)
                    return;
                t = !0,
                "right" === v ? (a = {
                    right: 0
                },
                d = {
                    right: "-" + p + "px"
                }) : (a = {
                    right: 0
                },
                d = {
                    right: "-" + p + "px"
                }),
                l = u.scrollTop(),
                u.removeAttr("style").scrollTop(l),
                f.animate(a, y),
                c.animate(d, y, function() {
                    c.removeAttr("style"),
                    f.removeAttr("style"),
                    e("html").removeAttr("style"),
                    t = !1,
                    i = !1,
                    "function" == typeof s && s(n)
                })
            }
        }
    }
      , r = {
        open: function(e, t) {
            o.execute("open", e, t)
        },
        close: function(e, t) {
            o.execute("close", e, t)
        },
        toogle: function(e, t) {
            o.execute("toogle", e, t)
        }
    };
    e.sidr = function(t) {
        return r[t] ? r[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "function" != typeof t && "string" != typeof t && t ? (e.error("Method " + t + " does not exist on jQuery.sidr"),
        void 0) : r.toogle.apply(this, arguments)
    }
    ,
    e.fn.sidr = function(t) {
        var i = e.extend({
            name: "sidr",
            speed: 200,
            side: "right",
            source: null,
            renaming: !0,
            body: "body"
        }, t)
          , n = i.name
          , s = e("#" + n);
        if (0 === s.length && (s = e("<div />").attr("id", n).appendTo(e("body"))),
        s.addClass("sidr").addClass(i.side).data({
            speed: i.speed,
            side: i.side,
            body: i.body
        }),
        "function" == typeof i.source) {
            var a = i.source(n);
            o.loadContent(s, a)
        } else if ("string" == typeof i.source && o.isUrl(i.source))
            e.get(i.source, function(e) {
                o.loadContent(s, e)
            });
        else if ("string" == typeof i.source) {
            var d = ""
              , l = i.source.split(",");
            if (e.each(l, function(t, i) {
                d += '<div class="sidr-inner">' + e(i).html() + "</div>"
            }),
            i.renaming) {
                var c = e("<div />").html(d);
                c.find("*").each(function(t, i) {
                    var r = e(i);
                    o.addPrefix(r)
                }),
                d = c.html()
            }
            o.loadContent(s, d)
        } else
            null !== i.source && e.error("Invalid Sidr Source");
        return this.each(function() {
            var t = e(this)
              , i = t.data("sidr");
            i || (t.data("sidr", n),
            t.click(function(e) {
                e.preventDefault(),
                r.toogle(n)
            }))
        })
    }
}
)(jQuery);
