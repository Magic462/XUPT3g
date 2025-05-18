(window._iconfont_svg_string_ =
  '<svg><symbol id="icon-youshuangxianjiantou" viewBox="0 0 1339 1024"><path d="M876.330179 511.498858L487.611093 122.946819c-27.8969-27.8969-27.8969-73.166721 0-101.230669 27.8969-27.8969 73.166721-27.8969 101.230669 0l439.334421 439.334421c13.864927 14.031974 20.880914 32.240131 20.880913 50.615334s-7.015987 36.583361-20.880913 50.615335l-439.334421 439.334421c-27.8969 27.8969-73.166721 27.8969-101.230669 0-27.8969-27.8969-27.8969-73.166721 0-101.230669l388.719086-388.886134zM42.262969 900.217945c-27.8969 27.8969-27.8969 73.166721 0 101.230668 27.8969 27.8969 73.166721 27.8969 101.230669 0l439.334421-439.334421c13.864927-14.031974 20.880914-32.240131 20.880913-50.615334s-7.015987-36.583361-20.880913-50.615334L143.493638 21.71615C115.596737-6.18075 70.159869-6.18075 42.262969 21.71615 14.366069 49.613051 14.366069 94.882871 42.262969 122.946819L430.982055 511.498858 42.262969 900.217945zM430.982055 511.498858" fill="" ></path></symbol><symbol id="icon-youshuangxianjiantou1" viewBox="0 0 1339 1024"><path d="M446.33648762 512.501142L835.05557362 901.053181c27.8969 27.8969 27.8969 73.166721 0 101.23066901-27.8969 27.8969-73.166721 27.8969-101.230669-1e-8l-439.334421-439.334421c-13.864927-14.031974-20.880914-32.240131-20.88091301-50.615334s7.015987-36.583361 20.880913-50.615335l439.33442101-439.334421c27.8969-27.8969 73.166721-27.8969 101.230669 0 27.8969 27.8969 27.8969 73.166721 0 101.230669l-388.719086 388.886134zM1280.40369762 123.782055c27.8969-27.8969 27.8969-73.166721 0-101.230668-27.8969-27.8969-73.166721-27.8969-101.23066899 0l-439.33442101 439.334421c-13.864927 14.031974-20.880914 32.240131-20.880913 50.615334s7.015987 36.583361 20.880913 50.615334L1179.17302862 1002.28385C1207.06992962 1030.18075 1252.50679763 1030.18075 1280.40369762 1002.28385001 1308.30059762 974.386949 1308.30059761 929.117129 1280.40369762 901.053181L891.68461162 512.501142 1280.40369762 123.782055zM891.68461162 512.501142" fill="" ></path></symbol></svg>'),
  ((n) => {
    var t = (e = (e = document.getElementsByTagName('script'))[
        e.length - 1
      ]).getAttribute('data-injectcss'),
      e = e.getAttribute('data-disable-injectsvg');
    if (!e) {
      var o,
        i,
        c,
        s,
        l,
        a = function (t, e) {
          e.parentNode.insertBefore(t, e);
        };
      if (t && !n.__iconfont__svg__cssinject__) {
        n.__iconfont__svg__cssinject__ = !0;
        try {
          document.write(
            '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>'
          );
        } catch (t) {
          console && console.log(t);
        }
      }
      (o = function () {
        var t,
          e = document.createElement('div');
        (e.innerHTML = n._iconfont_svg_string_),
          (e = e.getElementsByTagName('svg')[0]) &&
            (e.setAttribute('aria-hidden', 'true'),
            (e.style.position = 'absolute'),
            (e.style.width = 0),
            (e.style.height = 0),
            (e.style.overflow = 'hidden'),
            (e = e),
            (t = document.body).firstChild
              ? a(e, t.firstChild)
              : t.appendChild(e));
      }),
        document.addEventListener
          ? ~['complete', 'loaded', 'interactive'].indexOf(document.readyState)
            ? setTimeout(o, 0)
            : ((i = function () {
                document.removeEventListener('DOMContentLoaded', i, !1), o();
              }),
              document.addEventListener('DOMContentLoaded', i, !1))
          : document.attachEvent &&
            ((c = o),
            (s = n.document),
            (l = !1),
            r(),
            (s.onreadystatechange = function () {
              'complete' == s.readyState &&
                ((s.onreadystatechange = null), d());
            }));
    }
    function d() {
      l || ((l = !0), c());
    }
    function r() {
      try {
        s.documentElement.doScroll('left');
      } catch (t) {
        return void setTimeout(r, 50);
      }
      d();
    }
  })(window);
