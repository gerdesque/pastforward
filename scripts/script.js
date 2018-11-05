function gestureHandler(element) {
  // define a data structure to store our touchpoints in
  this.coords = function (x, y) {
    this.x = x;
    this.y = y;
  };
  this.element = element;
  this.store = [];
  this.store[0] = new this.coords(-1, -1);
  this.store[1] = new this.coords(-1, -1);
  this.dx = 0;
  this.dy = 0;
  this.angle = element.angle;
  this.size = element.size;
  var that = this;
  this.element.addEventListener('touchstart', function (e) {
    e.preventDefault();
    e.stopPropagation();
    that.init();
    that.gesture(e);
  }, true);
  this.element.addEventListener('touchmove', function (e) {
    e.preventDefault();
    e.stopPropagation();
    that.gesture(e);
  }, true);

  this.init = function () {
    // reset stored values
    this.store[0].x = this.store[0].y = this.store[1].x = this.store[1].y = -1;
    // naive way of working out highest z-index?
    var zIndex = 0; // just using positive indices
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
      if (parseInt(images[i].style.zIndex, 10) >= zIndex) {
        zIndex = parseInt(images[i].style.zIndex, 10) + 1;
      }
    }
    this.element.style.zIndex = zIndex;
  };

  this.gesture = function (e) {
    var x1 = 0;
    var x2 = 0;
    var y1 = 0;
    var y2 = 0;
    var i = 0;
    var angle = 0;
    var size = 0;
    if (e.targetTouches) {
      if (e.targetTouches.length >= 2) {

        // two (or more) fingers
        x1 = e.targetTouches[0].pageX - e.target.offsetLeft;
        y1 = e.targetTouches[0].pageY - e.target.offsetTop;
        x2 = e.targetTouches[1].pageX - e.target.offsetLeft;
        y2 = e.targetTouches[1].pageY - e.target.offsetTop;
        if (this.store[0].x != -1) {
          angle = Math.atan((y2 - y1) / (x2 - x1)) - Math.atan((this.store[1].y - this.store[0].y) / (this.store[1].x - this.store[0].x));
          if (Math.abs(angle) >= 3) { // jumped 180 degrees due to my poor math skills
            angle = angle - Math.PI;
          }
          size = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2)) - Math.sqrt(Math.pow((this.store[0].x - this.store[1].x), 2) + Math.pow((this.store[0].y - this.store[1].y), 2));
          this.twofinger(size, angle);
        }
        // store the values for later comparison
        this.store[0].x = x1;
        this.store[0].y = y1;
        this.store[1].x = x2;
        this.store[1].y = y2;

      } else if (e.targetTouches.length == 1) {

        // one finger
        x1 = e.targetTouches[0].pageX;
        y1 = e.targetTouches[0].pageY;
        // check if user went from two fingers to one finger - otherwise movement offset is wrong depending on which finger was lifted
        if (this.store[1].x != -1) {
          // treat the two-to-one change as a completely new gesture
          this.init();
        }
        if (this.store[0].x != -1) {
          this.onefinger(x1 - this.store[0].x, y1 - this.store[0].y);
        }
        // store the values for later comparison
        this.store[0].x = x1;
        this.store[0].y = y1;
      }
    }
  };
  this.twofinger = function (size, angle) {
    var that = this;
    var size_ratio = ((that.element.width * that.size) + size) / (that.element.width * that.size);
    that.size *= size_ratio;
    if (that.size < 0.5) {
      that.size = 0.5;
    }
    if (that.size > 1) {
      that.size = 1;
    }
    that.angle += angle;
    that.element.style.OTransform = that.element.style.MozTransform = that.element.style.webkitTransform = that.element.style.transform = 'rotate(' + that.angle + 'rad) scale(' + that.size + ')';
  };

  this.onefinger = function (dx, dy) {
    var that = this;
    that.element.style.left = that.element.offsetLeft + dx + 'px';
    that.element.style.top = that.element.offsetTop + dy + 'px';
  };

}

window.addEventListener('load', function () {

  var films = [{
      "thumbnail": "https://www.filmportal.de/sites/default/files/video_thumb/71579_13050_The_african_zouaves_DSM_file_to_view.jpg"
    },
    {
      "thumbnail": "https://www.filmportal.de/sites/default/files/video_thumb/DIF_31_13_1R_Wochenschau_Material_1897_1913_Teil_1.jpg"
    },
    {
      "thumbnail": "https://www.filmportal.de/sites/default/files/video_thumb/DIF_31_13_1R_Wochenschau_Material_1897_1913_Teil_2.jpg"
    },
    {
      "thumbnail": "https://www.filmportal.de/sites/default/files/video_thumb/DIF_31_13_1R_Wochenschau_Material_1897_1913_Teil_3.jpg"
    },
    {
      "thumbnail": "https://www.filmportal.de/sites/default/files/video_thumb/DIF_50_145_1R_Kino_Kriegsschau_Nr_14_(DE_1914).jpg"
    },
    {
      "thumbnail": "https://www.filmportal.de/sites/default/files/video_thumb/DIF_50_300_1R_Bilder_vom_Trojanischen_Kriege_(Helena).jpg"
    },
    {
      "thumbnail": "https://www.filmportal.de/sites/default/files/video_thumb/DIF_50_341_1R_unident%20Eiko-Woche%20-%20Fragment.jpg"
    },
    {
      "thumbnail": "https://www.filmportal.de/sites/default/files/video_thumb/DIF_BArch_K_214956_1R_Hueter_der_Ordnung_LaengunguGradingZT.jpg"
    },
    {
      "thumbnail": "https://www.filmportal.de/sites/default/files/video_thumb/EFG1914-00013.jpg"
    },
    {
      "thumbnail": "https://www.filmportal.de/sites/default/files/video_thumb/EFG1914-00017.jpg"
    },
    {
      "thumbnail": "https://www.filmportal.de/sites/default/files/video_thumb/EFG1914-00025.jpg"
    },
    {
      "thumbnail": "https://www.filmportal.de/sites/default/files/video_thumb/DIF_1_02_16_182_1R_Der_Ertrag_der_VI_deutschen_Kriegsanleihen_gibt_unseren_Helden_die_Kraft_zum_Siege.jpg"
    },
    {
      "thumbnail": "https://www.filmportal.de/sites/default/files/video_thumb/DIF_1_02_35_255_1R_Hindenburgs_70_Geburtstagsfeier_beim_Kaiser_im_grossen_Hauptquartier.jpg"
    },
    {
      "thumbnail": "https://www.filmportal.de/sites/default/files/video_thumb/DIF_Vater%20ist%20im%20Kriege.jpg"
    },
    {
      "thumbnail": "https://www.filmportal.de/sites/default/files/video_thumb/DIF_Auf%20dem%20Kasernenhof.jpg"
    },
    {
      "thumbnail": "https://www.filmportal.de/sites/default/files/video_thumb/DIF_Rueckkehr%20von%20der%20Parade.jpg"
    },
    {
      "thumbnail": "https://www.filmportal.de/sites/default/files/video_thumb/DIF_Wintersport%20in%20Oesterreich.jpg"
    },
    {
      "thumbnail": "https://www.filmportal.de/sites/default/files/video_thumb/DIF_10_1194_2R_Tirol_in_Waffen_(Le_Tyrol_en_Armes).jpg"
    },
    {
      "thumbnail": "https://www.filmportal.de/sites/default/files/video_thumb/DIF_11_306_1R_Oorlogsannalen_No_85_(1918)_orange.jpg"
    },
    {
      "thumbnail": "https://www.filmportal.de/sites/default/files/video_thumb/DIF_20_292_1R_William_Held_Film%20-%20Hunger_Blockade_Germany.jpg"
    },
    {
      "thumbnail": "https://www.filmportal.de/sites/default/files/video_thumb/DIF_20_306_1R_Das_Begraebnis_der_ehemaligen_Kaiserin_Auguste_Victoria.jpg"
    },
    {
      "thumbnail": "https://www.filmportal.de/sites/default/files/DIF_30_788_1R_Fuerstliches_Familienglueck.jpg"
    }

  ];

  for (var i = 0; i < films.length; i++) {

    var img = document.createElement("img");
    document.body.appendChild(img);

    img.src = films[i].thumbnail;

    // randomise the position
    img.style.left = Math.random() * (window.innerWidth / 2) + 'px';
    img.style.top = Math.random() * (window.innerHeight / 2) + 'px';
    img.style.zIndex = i;
    // randomise scale/rotation
    img.size = (Math.random() * 0.25) + 0.5;
    img.angle = (Math.random() * Math.PI / 4) * (-1 + Math.random() * 2);
    img.style.OTransform = img.style.MozTransform = img.style.webkitTransform = img.style.transform = 'rotate(' + img.angle + 'rad) scale(' + img.size + ')';
    // attach the handler
    var gh = new gestureHandler(img);
  }
  window.addEventListener('touchmove', function (e) {
    e.preventDefault();
  }, false);
  /* known (intentional) issue: this last statement prevents scrolling, so on small screen devices the SD panel will be cut off and non-scrollable */
}, false);
