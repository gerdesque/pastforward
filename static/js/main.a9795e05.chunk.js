(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,,function(t,e,s){var a={"./0101.jpg":28,"./0102.jpg":29,"./0201.jpg":30,"./0301.jpg":31,"./0401.jpg":32,"./0501.jpg":33,"./0502.jpg":34,"./0601.jpg":35,"./0701.jpg":36,"./0702.jpg":37,"./0703.jpg":38,"./0801.jpg":39,"./0802.jpg":40,"./0803.jpg":41,"./0804.jpg":42,"./0901.jpg":43,"./0902.jpg":44,"./0903.jpg":45,"./0904.jpg":46,"./0905.jpg":47,"./1001.jpg":48,"./1002.jpg":49,"./1101.jpg":50,"./1102.jpg":51,"./1103.jpg":52,"./1201.jpg":53,"./1301.jpg":54,"./1302.jpg":55,"./1401.jpg":56,"./1501.jpg":57,"./1601.jpg":58,"./1701.jpg":59,"./1702.jpg":60,"./1703.jpg":61,"./1801.jpg":62,"./1802.jpg":63,"./1901.jpg":64,"./2001.jpg":65,"./2101.jpg":66};function n(t){var e=o(t);return s(e)}function o(t){var e=a[t];if(!(e+1)){var s=new Error("Cannot find module '"+t+"'");throw s.code="MODULE_NOT_FOUND",s}return e}n.keys=function(){return Object.keys(a)},n.resolve=o,t.exports=n,n.id=11},,function(t,e,s){t.exports=s(68)},,,,,function(t,e,s){},,function(t,e,s){},,,,function(t,e,s){},,function(t,e,s){},,function(t,e,s){t.exports=s.p+"static/media/0101.b944eeba.jpg"},function(t,e,s){t.exports=s.p+"static/media/0102.d3703097.jpg"},function(t,e,s){t.exports=s.p+"static/media/0201.917ee637.jpg"},function(t,e,s){t.exports=s.p+"static/media/0301.2221d25d.jpg"},function(t,e,s){t.exports=s.p+"static/media/0401.be31b648.jpg"},function(t,e,s){t.exports=s.p+"static/media/0501.d62c274b.jpg"},function(t,e,s){t.exports=s.p+"static/media/0502.55696524.jpg"},function(t,e,s){t.exports=s.p+"static/media/0601.59ad55e0.jpg"},function(t,e,s){t.exports=s.p+"static/media/0701.74e69519.jpg"},function(t,e,s){t.exports=s.p+"static/media/0702.8540fac8.jpg"},function(t,e,s){t.exports=s.p+"static/media/0703.bf5e6b37.jpg"},function(t,e,s){t.exports=s.p+"static/media/0801.2b90090c.jpg"},function(t,e,s){t.exports=s.p+"static/media/0802.2dfc0b63.jpg"},function(t,e,s){t.exports=s.p+"static/media/0803.cadd73be.jpg"},function(t,e,s){t.exports=s.p+"static/media/0804.c9111b9a.jpg"},function(t,e,s){t.exports=s.p+"static/media/0901.9c92f424.jpg"},function(t,e,s){t.exports=s.p+"static/media/0902.8f3b5918.jpg"},function(t,e,s){t.exports=s.p+"static/media/0903.52b9e4a3.jpg"},function(t,e,s){t.exports=s.p+"static/media/0904.38fe92c9.jpg"},function(t,e,s){t.exports=s.p+"static/media/0905.f5b7fc53.jpg"},function(t,e,s){t.exports=s.p+"static/media/1001.d167bfc2.jpg"},function(t,e,s){t.exports=s.p+"static/media/1002.efb6da9f.jpg"},function(t,e,s){t.exports=s.p+"static/media/1101.d9c8f142.jpg"},function(t,e,s){t.exports=s.p+"static/media/1102.7717d1ca.jpg"},function(t,e,s){t.exports=s.p+"static/media/1103.ccf93d79.jpg"},function(t,e,s){t.exports=s.p+"static/media/1201.c034b5d4.jpg"},function(t,e,s){t.exports=s.p+"static/media/1301.8f97f694.jpg"},function(t,e,s){t.exports=s.p+"static/media/1302.04bf0652.jpg"},function(t,e,s){t.exports=s.p+"static/media/1401.14977fd1.jpg"},function(t,e,s){t.exports=s.p+"static/media/1501.c89f4dab.jpg"},function(t,e,s){t.exports=s.p+"static/media/1601.ccb77f4e.jpg"},function(t,e,s){t.exports=s.p+"static/media/1701.82a8b9c5.jpg"},function(t,e,s){t.exports=s.p+"static/media/1702.fe7fd86e.jpg"},function(t,e,s){t.exports=s.p+"static/media/1703.5be1d236.jpg"},function(t,e,s){t.exports=s.p+"static/media/1801.54d947c7.jpg"},function(t,e,s){t.exports=s.p+"static/media/1802.9a237999.jpg"},function(t,e,s){t.exports=s.p+"static/media/1901.20d9b336.jpg"},function(t,e,s){t.exports=s.p+"static/media/2001.2d6b8e2d.jpg"},function(t,e,s){t.exports=s.p+"static/media/2101.17906488.jpg"},function(t,e,s){t.exports=s.p+"static/media/intro.d8ffc850.mp4"},function(t,e,s){"use strict";s.r(e);var a,n=s(0),o=s.n(n),i=s(12),r=s.n(i),c=(s(18),s(1)),p=s(2),u=s(4),d=s(3),f=s(5),g=(s(20),s(7)),h=s.n(g),l=s(8),m=s(9),j=s(6),x=(s(24),s(26),function(t){function e(t){var s;return Object(c.a)(this,e),(s=Object(u.a)(this,Object(d.a)(e).call(this,t))).introTime=5e3,s.counterLimit=6,s.pauseVideo=function(t){s.state.counter>=s.counterLimit?s.showEndPage():s.setState({showIntro:!1,showVideo:!1,showAssociation:!0})},s.selectAssociation=function(t){var e=s.state.films.find(function(e){return e.section===t});s.setState({introText:e.intro,src:e.video+"#t="+s.convertTime(e.start)+","+s.convertTime(e.end),associations:s.state.arcs.filter(function(e){return e.source===t}),counter:s.state.counter+1}),s.setState({showIntro:!0}),s.setTimer()},s.state={showIntro:!0,showVideo:!1,showAssociation:!1,showEnd:!1,introText:s.props.intro,src:s.props.src+"#t="+s.convertTime(s.props.start)+","+s.convertTime(s.props.end),associations:s.props.associations,endText:"ENDE",films:[],arcs:[],counter:0},s.handleClickOutside=s.handleClickOutside.bind(Object(j.a)(Object(j.a)(s))),s}return Object(f.a)(e,t),Object(p.a)(e,[{key:"convertTime",value:function(t){var e=t.split(":");return 60*+e[0]+ +e[1]}},{key:"componentDidMount",value:function(){this.setTimer(),document.addEventListener("click",this.handleClickOutside),this.getNodes()}},{key:"setTimer",value:function(){var t=this;a=setTimeout(function(){return t.setState({showIntro:!1,showVideo:!0})},this.introTime)}},{key:"getNodes",value:function(){var t=Object(l.a)(h.a.mark(function t(){var e,s;return h.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch("https://raw.githubusercontent.com/gerdesque/pastforwardgraph/master/films.json");case 3:return e=t.sent,t.next=6,e.json();case 6:s=t.sent,this.setState({films:s.nodes,arcs:s.arcs}),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(0),console.error(t.t0);case 13:case"end":return t.stop()}},t,this,[[0,10]])}));return function(){return t.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){clearTimeout(a),document.removeEventListener("click",this.handleClickOutside)}},{key:"handleClickOutside",value:function(t){t.preventDefault(),t.stopPropagation(),this.node&&!this.node.contains(t.target)&&this.setState({showIntro:!1,showVideo:!1,showAssociation:!1})}},{key:"showEndPage",value:function(){this.setState({showIntro:!1,showVideo:!1,showAssociation:!1,showEnd:!0})}},{key:"getThumbnail",value:function(t){var e=this.state.films.find(function(e){return e.section===t});return s(11)("./"+e.id+".jpg")}},{key:"render",value:function(){var t=this,e=null,s=null,a=null,n=null;if(this.state.showIntro&&(e=o.a.createElement("div",{className:"intro"},o.a.createElement("p",{className:"intro-Text"},this.state.introText))),this.state.showVideo&&(s=o.a.createElement("video",{autoPlay:!0,muted:!0,onPause:this.pauseVideo},o.a.createElement("source",{type:"video/mp4",src:this.state.src}),"Your browser does not support the video tag.")),this.state.showAssociation){var i=this.state.associations.map(function(e){return o.a.createElement("div",{className:"association-Container",onClick:function(s){return t.selectAssociation(e.target)}},o.a.createElement("img",{className:"association-Image",alt:e.target,src:t.getThumbnail(e.target)}),o.a.createElement("p",{className:"association-Text"},e.associationText))});a=o.a.createElement("div",{className:"association"},i)}return this.state.showEnd&&(n=o.a.createElement("div",{className:"end"},o.a.createElement("p",{className:"end-Text"},this.state.endText))),o.a.createElement("div",{className:"Video",ref:function(e){t.node=e}},e,s,a,n)}}]),e}(n.Component)),v=function(t){function e(t){var a;return Object(c.a)(this,e),(a=Object(u.a)(this,Object(d.a)(e).call(this,t))).size=.25*Math.random()+.5,a.angle=Math.random()*Math.PI/4*(2*Math.random()-1),a.store=[{x:-1,y:-1},{x:-1,y:-1}],a.dragging=!1,a.disable_click=!1,a.swipe=!1,a.threshold=100,a.restraint=100,a.allowedTime=500,a.self=Object(j.a)(Object(j.a)(a)),a.onDown=function(t){t.preventDefault(),t.stopPropagation(),a.disable_click=!1,t.targetTouches||(a.dragging=!0),a.self.init(t),t.targetTouches&&(a.startX=t.targetTouches[0].pageX,a.startY=t.targetTouches[0].pageY,a.startTime=(new Date).getTime(),a.self.gesture(t))},a.onMove=function(t){if(t.preventDefault(),t.stopPropagation(),a.disable_click=!0,a.dragging){var e=t.pageX,s=t.pageY;if(-1!==a.store[0].x){var n=t.target.offsetLeft+e-a.store[0].x+"px",o=t.target.offsetTop+s-a.store[0].y+"px";a.setState(function(t){t.imageLeft,t.imageTop;return{imageLeft:n,imageTop:o}})}a.store[0].x=e,a.store[0].y=s}t.targetTouches&&a.self.gesture(t)},a.onEnd=function(t){if(t.preventDefault(),t.stopPropagation(),a.dragging=!1,t.targetTouches&&(a.elapsedTime=(new Date).getTime()-a.startTime,0===t.targetTouches.length&&a.elapsedTime<=a.allowedTime&&(Math.abs(a.distX)>=a.threshold&&Math.abs(a.distY)<=a.restraint||Math.abs(a.distY)>=a.threshold&&Math.abs(a.distX)<=a.restraint))){a.swipe=!a.swipe;var e=document.getElementById(a.props.id),s=e.clientHeight,n=e.clientWidth;a.setState({src:a.swipe?"back.png":a.props.thumbnail,showFlipside:!a.state.showFlipside}),e.height=s,e.width=n}},a.init=function(){a.store[0].x=a.store[0].y=a.store[1].x=a.store[1].y=-1;for(var t=0,e=document.getElementsByTagName("img"),s=0;s<e.length;s++)parseInt(e[s].style.zIndex,10)>=t&&(t=parseInt(e[s].style.zIndex,10)+1);a.setState({zIndex:t})},a.gesture=function(t){var e=0,s=0,n=0,o=0,i=0,r=0;a.distX=t.targetTouches[0].pageX-a.startX,a.distY=t.targetTouches[0].pageY-a.startY,t.targetTouches&&(t.targetTouches.length>=2?(e=t.targetTouches[0].pageX-t.target.offsetLeft,n=t.targetTouches[0].pageY-t.target.offsetTop,s=t.targetTouches[1].pageX-t.target.offsetLeft,o=t.targetTouches[1].pageY-t.target.offsetTop,-1!==a.store[0].x&&(i=Math.atan((o-n)/(s-e))-Math.atan((a.store[1].y-a.store[0].y)/(a.store[1].x-a.store[0].x)),Math.abs(i)>=3&&(i-=Math.PI),r=Math.sqrt(Math.pow(e-s,2)+Math.pow(n-o,2))-Math.sqrt(Math.pow(a.store[0].x-a.store[1].x,2)+Math.pow(a.store[0].y-a.store[1].y,2)),a.twofinger(r,i)),a.store[0].x=e,a.store[0].y=n,a.store[1].x=s,a.store[1].y=o):1===t.targetTouches.length&&(e=t.targetTouches[0].pageX,n=t.targetTouches[0].pageY,-1!==a.store[1].x&&a.init(),-1!==a.store[0].x&&a.onefinger(e-a.store[0].x,n-a.store[0].y),a.store[0].x=e,a.store[0].y=n))},a.twofinger=function(t,e){var s=document.getElementById(a.props.id),n=(s.width*a.size+t)/(s.width*a.size);a.size*=n,a.size<.5&&(a.size=.5),a.size>1&&(a.size=1),a.angle+=e,a.setState(function(t){t.transform;return{transform:"rotate("+a.angle+"rad) scale("+a.size+")"}})},a.onefinger=function(t,e){var s=document.getElementById(a.props.id);a.setState(function(a){a.imageLeft,a.imageTop;return{imageLeft:s.offsetLeft+t+"px",imageTop:s.offsetTop+e+"px"}})},a.displayVideo=function(){a.disable_click||a.setState({showVideo:!a.state.showVideo})},a.state={imageLeft:Math.random()*(window.innerWidth/2)+"px",imageTop:Math.random()*(window.innerHeight/3)+"px",zIndex:a.props.id,transform:"rotate("+a.angle+"rad) scale("+a.size+")",src:s(11)("./"+a.props.id+".jpg"),showFlipside:!1,showVideo:!1},a}return Object(f.a)(e,t),Object(p.a)(e,[{key:"render",value:function(){var t=this.state,e={left:t.imageLeft,top:t.imageTop,zIndex:t.zIndex,transform:t.transform},s=null;this.state.showFlipside&&(s=o.a.createElement("p",{class:"Image-text",style:Object(m.a)({},e),onClick:this.displayVideo},"Kaiser Wilhelm beim Entenf\xfcttern"));var a=null;return this.state.showVideo&&(a=o.a.createElement(x,Object.assign({},this.props,{src:this.props.video}))),o.a.createElement("div",null,o.a.createElement("img",Object.assign({className:"Image"},this.props,{src:this.state.src,style:Object(m.a)({},e),onTouchStart:this.onDown,onTouchMove:this.onMove,onTouchEnd:this.onEnd,onPointerDown:this.onDown,onPointerMove:this.onMove,onPointerUp:this.onEnd,onPointerOut:this.onEnd,onClick:this.displayVideo})),s,a)}}]),e}(n.Component),b=function(t){function e(t){var s;return Object(c.a)(this,e),(s=Object(u.a)(this,Object(d.a)(e).call(this,t))).state={films:[],associations:[]},s}return Object(f.a)(e,t),Object(p.a)(e,[{key:"componentDidMount",value:function(){var t=Object(l.a)(h.a.mark(function t(){var e,s;return h.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch("https://raw.githubusercontent.com/gerdesque/pastforwardgraph/master/films.json");case 3:return e=t.sent,t.next=6,e.json();case 6:s=t.sent,this.setState({films:s.nodes,associations:s.arcs}),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(0),console.error(t.t0);case 13:case"end":return t.stop()}},t,this,[[0,10]])}));return function(){return t.apply(this,arguments)}}()},{key:"render",value:function(){var t=this,e=this.state.films.map(function(e){return o.a.createElement(v,Object.assign({key:e.id},e,{associations:t.state.associations.filter(function(t){return t.source===e.section})}))});return o.a.createElement("div",{className:"ImageList"},e)}}]),e}(n.Component),w=function(t){function e(t){var s;return Object(c.a)(this,e),(s=Object(u.a)(this,Object(d.a)(e).call(this,t))).pauseVideo=function(t){s.setState({showIntro:!1})},s.state={showIntro:!0},s}return Object(f.a)(e,t),Object(p.a)(e,[{key:"render",value:function(){var t=null;return t=this.state.showIntro?o.a.createElement("video",{autoPlay:!0,muted:!0,onPause:this.pauseVideo},o.a.createElement("source",{type:"video/mp4",src:s(67)}),"Your browser does not support the video tag."):o.a.createElement(b,null),o.a.createElement("div",{className:"App"},o.a.createElement("header",{className:"App-header"},o.a.createElement("h1",{className:"App-past"},"past"),o.a.createElement("h1",{className:"App-forward"},"forward")),t)}}]),e}(n.Component);r.a.render(o.a.createElement(w,null),document.getElementById("root")),document.addEventListener("touchmove",function(t){t.preventDefault()},{passive:!1})}],[[13,2,1]]]);
//# sourceMappingURL=main.a9795e05.chunk.js.map