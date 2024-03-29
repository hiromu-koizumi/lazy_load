loadPolyfills();

;(function() {
	"use strict";

	// ターゲット指定
	const targets = Array.from(document.querySelectorAll("img[data-src]"));

	// 実際の画像パス
	const img_path = "data-src";

	// オプション
	const options = {
		// 上下100px手前で発火
		rootMargin: "100px 0px"
	};

	// 初期化
	const observer = new IntersectionObserver(callback, options);

	targets.forEach(function(img) {
		// 監視の開始
		observer.observe(img);
	});

	// コールバック
	function callback(entries, object) {
		entries.forEach(function(entry) {

			// 交差していない
			if (!entry.isIntersecting) return;

			// ターゲット要素
			const img = entry.target;

			// 遅延ロード実行
			loading(img);

			// 監視の解除
			object.unobserve(img);
		});
	};

	// 遅延ロード
	function loading(img) {
		// data-srcの値を取得
		const src_val = img.getAttribute(img_path);
		if (src_val) {
			// 画像パスを設定
			img.src = src_val;
			img.onload = function() {
				// data-src属性を削除
				this.removeAttribute(img_path);
			};
		}
	};
})();

// Polyfills for Intersection Observer and Array.from
function loadPolyfills() {
	"use strict";

	const isIntersectionObserverSupported = "IntersectionObserver" in window;

	// Intersection Observer未サポート時にPolyfillを適用
	if (!isIntersectionObserverSupported) {
		IntersectionObserverPolyfill();
	};

	/// minified version of the Intersection Observer polyfill from: https://github.com/w3c/IntersectionObserver/tree/master/polyfill
	function IntersectionObserverPolyfill() {
		(function(h,f){function m(a){this.time=a.time;this.target=a.target;this.rootBounds=a.rootBounds;this.boundingClientRect=a.boundingClientRect;this.intersectionRect=a.intersectionRect||l();this.isIntersecting=!!a.intersectionRect;a=this.boundingClientRect;a=a.width*a.height;var b=this.intersectionRect;b=b.width*b.height;this.intersectionRatio=a?b/a:this.isIntersecting?1:0}function d(a,b){var c=b||{};if("function"!=typeof a)throw Error("callback must be a function");if(c.root&&1!=c.root.nodeType)throw Error("root must be an Element");this._checkForIntersections=u(this._checkForIntersections.bind(this),this.THROTTLE_TIMEOUT);this._callback=a;this._observationTargets=[];this._queuedEntries=[];this._rootMarginValues=this._parseRootMargin(c.rootMargin);this.thresholds=this._initThresholds(c.threshold);this.root=c.root||null;this.rootMargin=this._rootMarginValues.map(function(a){return a.value+a.unit}).join(" ")}function u(a,b){var c=null;return function(){c||(c=setTimeout(function(){a();c=null},b))}}function n(a,b,c,e){"function"==typeof a.addEventListener?a.addEventListener(b,c,e||!1):"function"==typeof a.attachEvent&&a.attachEvent("on"+b,c)}function r(a,b,c,e){"function"==typeof a.removeEventListener?a.removeEventListener(b,c,e||!1):"function"==typeof a.detatchEvent&&a.detatchEvent("on"+b,c)}function p(a){try{var b=a.getBoundingClientRect()}catch(c){}if(!b)return l();b.width&&b.height||(b={top:b.top,right:b.right,bottom:b.bottom,left:b.left,width:b.right-b.left,height:b.bottom-b.top});return b}function l(){return{top:0,bottom:0,left:0,right:0,width:0,height:0}}function t(a,b){for(var c=b;c;){if(c==a)return!0;c=q(c)}return!1}function q(a){return(a=a.parentNode)&&11==a.nodeType&&a.host?a.host:a}if("IntersectionObserver"in h&&"IntersectionObserverEntry"in h&&"intersectionRatio"in h.IntersectionObserverEntry.prototype)"isIntersecting"in h.IntersectionObserverEntry.prototype||Object.defineProperty(h.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return 0<this.intersectionRatio}});else{var k=[];d.prototype.THROTTLE_TIMEOUT=100;d.prototype.POLL_INTERVAL=null;d.prototype.USE_MUTATION_OBSERVER=!0;d.prototype.observe=function(a){if(!this._observationTargets.some(function(b){return b.element==a})){if(!a||1!=a.nodeType)throw Error("target must be an Element");this._registerInstance();this._observationTargets.push({element:a,entry:null});this._monitorIntersections();this._checkForIntersections()}};d.prototype.unobserve=function(a){this._observationTargets=this._observationTargets.filter(function(b){return b.element!=a});this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())};d.prototype.disconnect=function(){this._observationTargets=[];this._unmonitorIntersections();this._unregisterInstance()};d.prototype.takeRecords=function(){var a=this._queuedEntries.slice();this._queuedEntries=[];return a};d.prototype._initThresholds=function(a){a=a||[0];Array.isArray(a)||(a=[a]);return a.sort().filter(function(a,c,e){if("number"!=typeof a||isNaN(a)||0>a||1<a)throw Error("threshold must be a number between 0 and 1 inclusively");return a!==e[c-1]})};d.prototype._parseRootMargin=function(a){a=(a||"0px").split(/\s+/).map(function(a){a=/^(-?\d*\.?\d+)(px|%)$/.exec(a);if(!a)throw Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(a[1]),unit:a[2]}});a[1]=a[1]||a[0];a[2]=a[2]||a[0];a[3]=a[3]||a[1];return a};d.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(n(h,"resize",this._checkForIntersections,!0),n(f,"scroll",this._checkForIntersections,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in h&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(f,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))};d.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,r(h,"resize",this._checkForIntersections,!0),r(f,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))};d.prototype._checkForIntersections=function(){var a=this._rootIsInDom(),b=a?this._getRootRect():l();this._observationTargets.forEach(function(c){var e=c.element,d=p(e),g=this._rootContainsTarget(e),f=c.entry,k=a&&g&&this._computeTargetAndRootIntersection(e,b);c=c.entry=new m({time:h.performance&&performance.now&&performance.now(),target:e,boundingClientRect:d,rootBounds:b,intersectionRect:k});f?a&&g?this._hasCrossedThreshold(f,c)&&this._queuedEntries.push(c):f&&f.isIntersecting&&this._queuedEntries.push(c):this._queuedEntries.push(c)},this);this._queuedEntries.length&&this._callback(this.takeRecords(),this)};d.prototype._computeTargetAndRootIntersection=function(a,b){if("none"!=h.getComputedStyle(a).display){for(var c=p(a),e=q(a),d=!1;!d;){var g=null,k=1==e.nodeType?h.getComputedStyle(e):{};if("none"==k.display)return;e==this.root||e==f?(d=!0,g=b):e!=f.body&&e!=f.documentElement&&"visible"!=k.overflow&&(g=p(e));if(g){k=Math.max(g.top,c.top);var l=Math.min(g.bottom,c.bottom),m=Math.max(g.left,c.left);c=Math.min(g.right,c.right);g=c-m;var n=l-k;c=0<=g&&0<=n&&{top:k,bottom:l,left:m,right:c,width:g,height:n};if(!c)break}e=q(e)}return c}};d.prototype._getRootRect=function(){if(this.root)var a=p(this.root);else{a=f.documentElement;var b=f.body;a={top:0,left:0,right:a.clientWidth||b.clientWidth,width:a.clientWidth||b.clientWidth,bottom:a.clientHeight||b.clientHeight,height:a.clientHeight||b.clientHeight}}return this._expandRectByRootMargin(a)};d.prototype._expandRectByRootMargin=function(a){var b=this._rootMarginValues.map(function(b,d){return"px"==b.unit?b.value:b.value*(d%2?a.width:a.height)/100});b={top:a.top-b[0],right:a.right+b[1],bottom:a.bottom+b[2],left:a.left-b[3]};b.width=b.right-b.left;b.height=b.bottom-b.top;return b};d.prototype._hasCrossedThreshold=function(a,b){var c=a&&a.isIntersecting?a.intersectionRatio||0:-1,d=b.isIntersecting?b.intersectionRatio||0:-1;if(c!==d)for(var f=0;f<this.thresholds.length;f++){var g=this.thresholds[f];if(g==c||g==d||g<c!==g<d)return!0}};d.prototype._rootIsInDom=function(){return!this.root||t(f,this.root)};d.prototype._rootContainsTarget=function(a){return t(this.root||f,a)};d.prototype._registerInstance=function(){0>k.indexOf(this)&&k.push(this)};d.prototype._unregisterInstance=function(){var a=k.indexOf(this);-1!=a&&k.splice(a,1)};h.IntersectionObserver=d;h.IntersectionObserverEntry=m}})(window,document);
	};

	// Mini polyfill for Array.from without optional arguments (mapFunction [second argument], thisArg [third argument]) (https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
	if (typeof Array.from !== "function") {
		Array.from = function(arrLikeObj) {
			return Array.prototype.slice.call(arrLikeObj, 0);
		}
	};
};