export function initHeartCursor() {
    if (typeof window === "undefined") return;
  
    var colours = ["#f00", "#f06", "#f0f", "#f6f", "#f39", "#f9c"];
    var minisize = 10;
    var hearts = 100;
    var over_or_under = "over";
  
    let ox = 400, oy = 300;
    let sdown = 0, sleft = 0;
    let x = ox, y = oy;
    let swide = window.innerWidth || 800;
    let shigh = window.innerHeight || 600;
    let herz = [], herzx = [], herzy = [], herzs = [];
    
  
    function mwah() {
      if (!document.getElementById) return;
      for (let i = 0; i < hearts; i++) {
        let heart = createDiv("auto", "auto");
        heart.style.visibility = "hidden";
        heart.style.zIndex = over_or_under === "over" ? "1001" : "0";
        heart.style.color = colours[i % colours.length];
        heart.style.pointerEvents = "none";
        heart.style.opacity = "0.45";
        heart.appendChild(document.createTextNode("❤"));
        document.body.appendChild(heart);
        herz[i] = heart;
        herzy[i] = false;
      }
      set_scroll();
      set_width();
      herzle();
    }
  
    function herzle() {
      if (Math.abs(x - ox) > 1 || Math.abs(y - oy) > 1) {
        ox = x;
        oy = y;
        for (let c = 0; c < hearts; c++) {
          if (!herzy[c]) {
            herz[c].style.left = (herzx[c] = x - minisize / 2) + "px";
            herz[c].style.top = (herzy[c] = y - minisize) + "px";
            herz[c].style.fontSize = minisize + "px";
            herz[c].style.visibility = "visible";
            herzs[c] = minisize;
            break;
          }
        }
      }
      for (let c = 0; c < hearts; c++) if (herzy[c]) moveHeart(c);
      setTimeout(herzle, 30);
    }
  
    function moveHeart(i) {
      herzy[i] -= herzs[i] / minisize + (i % 2);
      herzx[i] += (i % 5 - 2) / 5;
      if (
        herzy[i] < sdown - herzs[i] ||
        herzx[i] < sleft - herzs[i] ||
        herzx[i] > sleft + swide - herzs[i]
      ) {
        herz[i].style.visibility = "hidden";
        herzy[i] = false;
      } else {
        herz[i].style.top = herzy[i] + "px";
        herz[i].style.left = herzx[i] + "px";
      }
    }
  
    function set_width() {
      swide = window.innerWidth || document.documentElement.clientWidth || 800;
      shigh = window.innerHeight || document.documentElement.clientHeight || 600;
    }
  
    function set_scroll() {
      sdown = window.scrollY || document.documentElement.scrollTop || 0;
      sleft = window.scrollX || document.documentElement.scrollLeft || 0;
    }
  
    function createDiv(height, width) {
      var div = document.createElement("div");
      div.style.position = "absolute";
      div.style.height = height;
      div.style.width = width;
      div.style.overflow = "hidden";
      div.style.backgroundColor = "transparent";
      return div;
    }
  
    window.addEventListener("resize", set_width);
    window.addEventListener("scroll", set_scroll);
    document.addEventListener("mousemove", (e) => {
      x = e.pageX;
      y = e.pageY;
    });
  
    mwah();
  }
  