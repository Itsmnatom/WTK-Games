var e=Object.defineProperty,t=Object.getOwnPropertyDescriptor,n=Object.getOwnPropertyNames,r=Object.prototype.hasOwnProperty,i=(e,t,n)=>()=>{if(n)throw n[0];try{return e&&(t=e(e=0)),t}catch(e){throw n=[e],e}},a=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports),o=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r},s=(i,a,o,s)=>{if(a&&typeof a==`object`||typeof a==`function`)for(var c=n(a),l=0,u=c.length,d;l<u;l++)d=c[l],!r.call(i,d)&&d!==o&&e(i,d,{get:(e=>a[e]).bind(null,d),enumerable:!(s=t(a,d))||s.enumerable});return i},c=t=>r.call(t,`module.exports`)?t[`module.exports`]:s(e({},`__esModule`,{value:!0}),t);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=i((()=>{})),u=i((()=>{})),d=i((()=>{})),f=i((()=>{}));function p(e){if(e===void 0)throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);return e}function m(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}var h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,ee,te,R,z,ne,B,re,ie,ae,V,oe,se,H,ce,le,ue,de,fe,pe,me,U,he,W,ge,G,_e,K,q,ve,ye,be,xe,Se,Ce,we,Te,Ee,De,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be,Ve,He,Ue,We,Ge,Ke,qe,Je,Ye,Xe,Ze,Qe,$e,et,tt,nt,rt,it,at,ot,st,ct,lt,ut,dt,ft,pt,mt,ht,gt,_t,vt,yt,bt,xt,St,Ct,wt,Tt,Et,Dt,Ot,kt,At,jt,Mt,Nt,Pt,Ft,It,Lt,Rt,zt,Bt,Vt,Ht,Ut,Wt,Gt,Kt,qt,Jt,Yt,Xt,Zt,Qt,$t,en,tn,nn,rn,an,on,sn,cn,ln,un,dn,fn,pn,mn,hn,gn,_n,vn,yn,bn,xn,Sn,Cn,wn,Tn,En,Dn,On,kn,An,jn,Mn,Nn,Pn,Fn,In,Ln,Rn,zn,Bn,Vn,Hn,Un,Wn,Gn,Kn,qn,Jn,Yn,Xn,Zn,Qn,$n,er,tr,nr,rr,ir,ar=i((()=>{h={autoSleep:120,force3D:`auto`,nullTargetWarn:1,units:{lineHeight:``}},g={duration:.5,overwrite:!1,delay:0},b=1e8,x=1/b,S=Math.PI*2,C=S/4,w=0,T=Math.sqrt,E=Math.cos,D=Math.sin,O=function(e){return typeof e==`string`},k=function(e){return typeof e==`function`},A=function(e){return typeof e==`number`},j=function(e){return e===void 0},M=function(e){return typeof e==`object`},N=function(e){return e!==!1},P=function(){return typeof window<`u`},F=function(e){return k(e)||O(e)},I=typeof ArrayBuffer==`function`&&ArrayBuffer.isView||function(){},L=Array.isArray,ee=/random\([^)]+\)/g,te=/,\s*/g,R=/(?:-?\.?\d|\.)+/gi,z=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,ne=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,B=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,re=/[+-]=-?[.\d]+/,ie=/[^,'"\[\]\s]+/gi,ae=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,ce={},le={},de=function(e){return(le=Re(e,ce))&&ir},fe=function(e,t){return console.warn(`Invalid property`,e,`set to`,t,`Missing plugin? gsap.registerPlugin()`)},pe=function(e,t){return!t&&console.warn(e)},me=function(e,t){return e&&(ce[e]=t)&&le&&(le[e]=t)||ce},U=function(){return 0},he={suppressEvents:!0,isStart:!0,kill:!1},W={suppressEvents:!0,kill:!1},ge={suppressEvents:!0},G={},_e=[],K={},ve={},ye={},be=30,xe=[],Se=``,Ce=function(e){var t=e[0],n,r;if(M(t)||k(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(r=xe.length;r--&&!xe[r].targetTest(t););n=xe[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new mn(e[r],n)))||e.splice(r,1);return e},we=function(e){return e._gsap||Ce(xt(e))[0]._gsap},Te=function(e,t,n){return(n=e[t])&&k(n)?e[t]():j(n)&&e.getAttribute&&e.getAttribute(t)||n},Ee=function(e,t){return(e=e.split(`,`)).forEach(t)||e},De=function(e){return Math.round(e*1e5)/1e5||0},Oe=function(e){return Math.round(e*1e7)/1e7||0},ke=function(e,t){var n=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),n===`+`?e+r:n===`-`?e-r:n===`*`?e*r:e/r},Ae=function(e,t){for(var n=t.length,r=0;e.indexOf(t[r])<0&&++r<n;);return r<n},je=function(){var e=_e.length,t=_e.slice(0),n,r;for(K={},_e.length=0,n=0;n<e;n++)r=t[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},Me=function(e){return!!(e._initted||e._startAt||e.add)},Ne=function(e,t,n,r){_e.length&&!v&&je(),e.render(t,n,r||!!(v&&t<0&&Me(e))),_e.length&&!v&&je()},Pe=function(e){var t=parseFloat(e);return(t||t===0)&&(e+``).match(ie).length<2?t:O(e)?e.trim():e},Fe=function(e){return e},Ie=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Le=function(e){return function(t,n){for(var r in n)r in t||r===`duration`&&e||r===`ease`||(t[r]=n[r])}},Re=function(e,t){for(var n in t)e[n]=t[n];return e},ze=function e(t,n){for(var r in n)r!==`__proto__`&&r!==`constructor`&&r!==`prototype`&&(t[r]=M(n[r])?e(t[r]||(t[r]={}),n[r]):n[r]);return t},Be=function(e,t){var n={},r;for(r in e)r in t||(n[r]=e[r]);return n},Ve=function(e){var t=e.parent||V,n=e.keyframes?Le(L(e.keyframes)):Ie;if(N(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},He=function(e,t){for(var n=e.length,r=n===t.length;r&&n--&&e[n]===t[n];);return n<0},Ue=function(e,t,n,r,i){n===void 0&&(n=`_first`),r===void 0&&(r=`_last`);var a=e[r],o;if(i)for(o=t[i];a&&a[i]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[r]=t,t._prev=a,t.parent=t._dp=e,t},We=function(e,t,n,r){n===void 0&&(n=`_first`),r===void 0&&(r=`_last`);var i=t._prev,a=t._next;i?i._next=a:e[n]===t&&(e[n]=a),a?a._prev=i:e[r]===t&&(e[r]=i),t._next=t._prev=t.parent=null},Ge=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Ke=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},qe=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},Je=function(e,t,n,r){return e._startAt&&(v?e._startAt.revert(W):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},Ye=function e(t){return!t||t._ts&&e(t.parent)},Xe=function(e){return e._repeat?Ze(e._tTime,e=e.duration()+e._rDelay)*e:0},Ze=function(e,t){var n=Math.floor(e=Oe(e/t));return e&&n===e?n-1:n},Qe=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},$e=function(e){return e._end=Oe(e._start+(e._tDur/Math.abs(e._ts||e._rts||x)||0))},et=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=Oe(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),$e(e),n._dirty||Ke(n,e)),e},tt=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Qe(e.rawTime(),t),(!t._dur||ht(0,t.totalDuration(),n)-t._tTime>x)&&t.render(n,!0)),Ke(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-x}},nt=function(e,t,n,r){return t.parent&&Ge(t),t._start=Oe((A(n)?n:n||e!==V?ft(e,n,t):e._time)+t._delay),t._end=Oe(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Ue(e,t,`_first`,`_last`,e._sort?`_start`:0),ot(t)||(e._recent=t),r||tt(e,t),e._ts<0&&et(e,e._tTime),e},rt=function(e,t){return(ce.ScrollTrigger||fe(`scrollTrigger`,t))&&ce.ScrollTrigger.create(t,e)},it=function(e,t,n,r,i){if(Cn(e,t,i),!e._initted)return 1;if(!n&&e._pt&&!v&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&q!==$t.frame)return _e.push(e),e._lazy=[i,r],1},at=function e(t){var n=t.parent;return n&&n._ts&&n._initted&&!n._lock&&(n.rawTime()<0||e(n))},ot=function(e){var t=e.data;return t===`isFromStart`||t===`isStart`},st=function(e,t,n,r){var i=e.ratio,a=t<0||!t&&(!e._start&&at(e)&&(e._initted||!ot(e))||(e._ts<0||e._dp._ts<0)&&!ot(e))?0:1,o=e._rDelay,s=0,c,l,u;if(o&&e._repeat&&(s=ht(0,e._tDur,t),l=Ze(s,o),e._yoyo&&l&1&&(a=1-a),l!==Ze(e._tTime,o)&&(i=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==i||v||r||e._zTime===x||!t&&e._zTime){if(!e._initted&&it(e,t,r,n,s))return;for(u=e._zTime,e._zTime=t||(n?x:0),n||=t&&!u,e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=s,c=e._pt;c;)c.r(a,c.d),c=c._next;t<0&&Je(e,t,n,!0),e._onUpdate&&!n&&Rt(e,`onUpdate`),s&&e._repeat&&!n&&e.parent&&Rt(e,`onRepeat`),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&Ge(e,1),!n&&!v&&(Rt(e,a?`onComplete`:`onReverseComplete`,!0),e._prom&&e._prom()))}else e._zTime||=t},ct=function(e,t,n){var r;if(n>t)for(r=e._first;r&&r._start<=n;){if(r.data===`isPause`&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=n;){if(r.data===`isPause`&&r._start<t)return r;r=r._prev}},lt=function(e,t,n,r){var i=e._repeat,a=Oe(t)||0,o=e._tTime/e._tDur;return o&&!r&&(e._time*=a/e._dur),e._dur=a,e._tDur=i?i<0?1e10:Oe(a*(i+1)+e._rDelay*i):a,o>0&&!r&&et(e,e._tTime=e._tDur*o),e.parent&&$e(e),n||Ke(e.parent,e),e},ut=function(e){return e instanceof gn?Ke(e):lt(e,e._dur)},dt={_start:0,endTime:U,totalDuration:U},ft=function e(t,n,r){var i=t.labels,a=t._recent||dt,o=t.duration()>=b?a.endTime(!1):t._dur,s,c,l;return O(n)&&(isNaN(n)||n in i)?(c=n.charAt(0),l=n.substr(-1)===`%`,s=n.indexOf(`=`),c===`<`||c===`>`?(s>=0&&(n=n.replace(/=/,``)),(c===`<`?a._start:a.endTime(a._repeat>=0))+(parseFloat(n.substr(1))||0)*(l?(s<0?a:r).totalDuration()/100:1)):s<0?(n in i||(i[n]=o),i[n]):(c=parseFloat(n.charAt(s-1)+n.substr(s+1)),l&&r&&(c=c/100*(L(r)?r[0]:r).totalDuration()),s>1?e(t,n.substr(0,s-1),r)+c:o+c)):n==null?o:+n},pt=function(e,t,n){var r=A(t[1]),i=(r?2:1)+(e<2?0:1),a=t[i],o,s;if(r&&(a.duration=t[1]),a.parent=n,e){for(o=a,s=n;s&&!(`immediateRender`in o);)o=s.vars.defaults||{},s=N(s.vars.inherit)&&s.parent;a.immediateRender=N(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[i-1]}return new An(t[0],a,t[i+1])},mt=function(e,t){return e||e===0?t(e):t},ht=function(e,t,n){return n<e?e:n>t?t:n},gt=function(e,t){return!O(e)||!(t=ae.exec(e))?``:t[1]},_t=function(e,t,n){return mt(n,function(n){return ht(e,t,n)})},vt=[].slice,yt=function(e,t){return e&&M(e)&&`length`in e&&(!t&&!e.length||e.length-1 in e&&M(e[0]))&&!e.nodeType&&e!==oe},bt=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(e){var r;return O(e)&&!t||yt(e,1)?(r=n).push.apply(r,xt(e)):n.push(e)})||n},xt=function(e,t,n){return y&&!t&&y.selector?y.selector(e):O(e)&&!n&&(se||!en())?vt.call((t||H).querySelectorAll(e),0):L(e)?bt(e,n):yt(e)?vt.call(e,0):e?[e]:[]},St=function(e){return e=xt(e)[0]||pe(`Invalid scope`)||{},function(t){var n=e.current||e.nativeElement||e;return xt(t,n.querySelectorAll?n:n===e?pe(`Invalid scope`)||H.createElement(`div`):e)}},Ct=function(e){return e.sort(function(){return .5-Math.random()})},wt=function(e){if(k(e))return e;var t=M(e)?e:{each:e},n=ln(t.ease),r=t.from||0,i=parseFloat(t.base)||0,a={},o=r>0&&r<1,s=isNaN(r)||o,c=t.axis,l=r,u=r;return O(r)?l=u={center:.5,edges:.5,end:1}[r]||0:!o&&s&&(l=r[0],u=r[1]),function(e,o,d){var f=(d||t).length,p=a[f],m,h,g,_,v,y,x,S,C;if(!p){if(C=t.grid===`auto`?0:(t.grid||[1,b])[1],!C){for(x=-b;x<(x=d[C++].getBoundingClientRect().left)&&C<f;);C<f&&C--}for(p=a[f]=[],m=s?Math.min(C,f)*l-.5:r%C,h=C===b?0:s?f*u/C-.5:r/C|0,x=0,S=b,y=0;y<f;y++)g=y%C-m,_=h-(y/C|0),p[y]=v=c?Math.abs(c===`y`?_:g):T(g*g+_*_),v>x&&(x=v),v<S&&(S=v);r===`random`&&Ct(p),p.max=x-S,p.min=S,p.v=f=(parseFloat(t.amount)||parseFloat(t.each)*(C>f?f-1:c?c===`y`?f/C:C:Math.max(C,f/C))||0)*(r===`edges`?-1:1),p.b=f<0?i-f:i,p.u=gt(t.amount||t.each)||0,n=n&&f<0?cn(n):n}return f=(p[e]-p.min)/p.max||0,Oe(p.b+(n?n(f):f)*p.v)+p.u}},Tt=function(e){var t=10**((e+``).split(`.`)[1]||``).length;return function(n){var r=Oe(Math.round(parseFloat(n)/e)*e*t);return(r-r%1)/t+(A(n)?0:gt(n))}},Et=function(e,t){var n=L(e),r,i;return!n&&M(e)&&(r=n=e.radius||b,e.values?(e=xt(e.values),(i=!A(e[0]))&&(r*=r)):e=Tt(e.increment)),mt(t,n?k(e)?function(t){return i=e(t),Math.abs(i-t)<=r?i:t}:function(t){for(var n=parseFloat(i?t.x:t),a=parseFloat(i?t.y:0),o=b,s=0,c=e.length,l,u;c--;)i?(l=e[c].x-n,u=e[c].y-a,l=l*l+u*u):l=Math.abs(e[c]-n),l<o&&(o=l,s=c);return s=!r||o<=r?e[s]:t,i||s===t||A(t)?s:s+gt(t)}:Tt(e))},Dt=function(e,t,n,r){return mt(L(e)?!t:n===!0?!!(n=0):!r,function(){return L(e)?e[~~(Math.random()*e.length)]:(n||=1e-5)&&(r=n<1?10**((n+``).length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*r)/r})},Ot=function(){var e=[...arguments];return function(t){return e.reduce(function(e,t){return t(e)},t)}},kt=function(e,t){return function(n){return e(parseFloat(n))+(t||gt(n))}},At=function(e,t,n){return Ft(e,t,0,1,n)},jt=function(e,t,n){return mt(n,function(n){return e[~~t(n)]})},Mt=function e(t,n,r){var i=n-t;return L(t)?jt(t,e(0,t.length),n):mt(r,function(e){return(i+(e-t)%i)%i+t})},Nt=function e(t,n,r){var i=n-t,a=i*2;return L(t)?jt(t,e(0,t.length-1),n):mt(r,function(e){return e=(a+(e-t)%a)%a||0,t+(e>i?a-e:e)})},Pt=function(e){return e.replace(ee,function(e){var t=e.indexOf(`[`)+1,n=e.substring(t||7,t?e.indexOf(`]`):e.length-1).split(te);return Dt(t?n:+n[0],t?0:+n[1],+n[2]||1e-5)})},Ft=function(e,t,n,r,i){var a=t-e,o=r-n;return mt(i,function(t){return n+((t-e)/a*o||0)})},It=function e(t,n,r,i){var a=isNaN(t+n)?0:function(e){return(1-e)*t+e*n};if(!a){var o=O(t),s={},c,l,u,d,f;if(r===!0&&(i=1)&&(r=null),o)t={p:t},n={p:n};else if(L(t)&&!L(n)){for(u=[],d=t.length,f=d-2,l=1;l<d;l++)u.push(e(t[l-1],t[l]));d--,a=function(e){e*=d;var t=Math.min(f,~~e);return u[t](e-t)},r=n}else i||(t=Re(L(t)?[]:{},t));if(!u){for(c in n)vn.call(s,t,c,`get`,n[c]);a=function(e){return zn(e,s)||(o?t.p:t)}}}return mt(r,a)},Lt=function(e,t,n){var r=e.labels,i=b,a,o,s;for(a in r)o=r[a]-t,o<0==!!n&&o&&i>(o=Math.abs(o))&&(s=a,i=o);return s},Rt=function(e,t,n){var r=e.vars,i=r[t],a=y,o=e._ctx,s,c,l;if(i)return s=r[t+`Params`],c=r.callbackScope||e,n&&_e.length&&je(),o&&(y=o),l=s?i.apply(c,s):i.call(c),y=a,l},zt=function(e){return Ge(e),e.scrollTrigger&&e.scrollTrigger.kill(!!v),e.progress()<1&&Rt(e,`onInterrupt`),e},Vt=[],Ht=function(e){if(e){if(e=!e.name&&e.default||e,P()||e.headless){var t=e.name,n=k(e),r=t&&!n&&e.init?function(){this._props=[]}:e,i={init:U,render:zn,add:vn,kill:Vn,modifier:Bn,rawVars:0},a={targetTest:0,get:0,getSetter:Fn,aliases:{},register:0};if(en(),e!==r){if(ve[t])return;Ie(r,Ie(Be(e,i),a)),Re(r.prototype,Re(i,Be(e,a))),ve[r.prop=t]=r,e.targetTest&&(xe.push(r),G[t]=1),t=(t===`css`?`CSS`:t.charAt(0).toUpperCase()+t.substr(1))+`Plugin`}me(t,r),e.register&&e.register(ir,r,Wn)}else Vt.push(e)}},Ut=255,Wt={aqua:[0,Ut,Ut],lime:[0,Ut,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Ut],navy:[0,0,128],white:[Ut,Ut,Ut],olive:[128,128,0],yellow:[Ut,Ut,0],orange:[Ut,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Ut,0,0],pink:[Ut,192,203],cyan:[0,Ut,Ut],transparent:[Ut,Ut,Ut,0]},Gt=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Ut+.5|0},Kt=function(e,t,n){var r=e?A(e)?[e>>16,e>>8&Ut,e&Ut]:0:Wt.black,i,a,o,s,c,l,u,d,f,p;if(!r){if(e.substr(-1)===`,`&&(e=e.substr(0,e.length-1)),Wt[e])r=Wt[e];else if(e.charAt(0)===`#`){if(e.length<6&&(i=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e=`#`+i+i+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):``)),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&Ut,r&Ut,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&Ut,e&Ut]}else if(e.substr(0,3)===`hsl`){if(r=p=e.match(R),!t)s=r[0]%360/360,c=r[1]/100,l=r[2]/100,a=l<=.5?l*(c+1):l+c-l*c,i=l*2-a,r.length>3&&(r[3]*=1),r[0]=Gt(s+1/3,i,a),r[1]=Gt(s,i,a),r[2]=Gt(s-1/3,i,a);else if(~e.indexOf(`=`))return r=e.match(z),n&&r.length<4&&(r[3]=1),r}else r=e.match(R)||Wt.transparent;r=r.map(Number)}return t&&!p&&(i=r[0]/Ut,a=r[1]/Ut,o=r[2]/Ut,u=Math.max(i,a,o),d=Math.min(i,a,o),l=(u+d)/2,u===d?s=c=0:(f=u-d,c=l>.5?f/(2-u-d):f/(u+d),s=u===i?(a-o)/f+(a<o?6:0):u===a?(o-i)/f+2:(i-a)/f+4,s*=60),r[0]=~~(s+.5),r[1]=~~(c*100+.5),r[2]=~~(l*100+.5)),n&&r.length<4&&(r[3]=1),r},qt=function(e){var t=[],n=[],r=-1;return e.split(Yt).forEach(function(e){var i=e.match(ne)||[];t.push.apply(t,i),n.push(r+=i.length+1)}),t.c=n,t},Jt=function(e,t,n){var r=``,i=(e+r).match(Yt),a=t?`hsla(`:`rgba(`,o=0,s,c,l,u;if(!i)return e;if(i=i.map(function(e){return(e=Kt(e,t,1))&&a+(t?e[0]+`,`+e[1]+`%,`+e[2]+`%,`+e[3]:e.join(`,`))+`)`}),n&&(l=qt(e),s=n.c,s.join(r)!==l.c.join(r)))for(c=e.replace(Yt,`1`).split(ne),u=c.length-1;o<u;o++)r+=c[o]+(~s.indexOf(o)?i.shift()||a+`0,0,0,0)`:(l.length?l:i.length?i:n).shift());if(!c)for(c=e.split(Yt),u=c.length-1;o<u;o++)r+=c[o]+i[o];return r+c[u]},Yt=function(){var e=`(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b`,t;for(t in Wt)e+=`|`+t+`\\b`;return RegExp(e+`)`,`gi`)}(),Xt=/hsl[a]?\(/,Zt=function(e){var t=e.join(` `),n;if(Yt.lastIndex=0,Yt.test(t))return n=Xt.test(t),e[1]=Jt(e[1],n),e[0]=Jt(e[0],n,qt(e[1])),!0},$t=function(){var e=Date.now,t=500,n=33,r=e(),i=r,a=1e3/240,o=a,s=[],c,l,u,d,f,p,m=function u(m){var h=e()-i,g=m===!0,_,v,y,b;if((h>t||h<0)&&(r+=h-n),i+=h,y=i-r,_=y-o,(_>0||g)&&(b=++d.frame,f=y-d.time*1e3,d.time=y/=1e3,o+=_+(_>=a?4:a-_),v=1),g||(c=l(u)),v)for(p=0;p<s.length;p++)s[p](y,f,b,m)};return d={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(e){return f/(1e3/(e||60))},wake:function(){ue&&(!se&&P()&&(oe=se=window,H=oe.document||{},ce.gsap=ir,(oe.gsapVersions||(oe.gsapVersions=[])).push(ir.version),de(le||oe.GreenSockGlobals||!oe.gsap&&oe||{}),Vt.forEach(Ht)),u=typeof requestAnimationFrame<`u`&&requestAnimationFrame,c&&d.sleep(),l=u||function(e){return setTimeout(e,o-d.time*1e3+1|0)},Qt=1,m(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(c),Qt=0,l=U},lagSmoothing:function(e,r){t=e||1/0,n=Math.min(r||33,t)},fps:function(e){a=1e3/(e||240),o=d.time*1e3+a},add:function(e,t,n){var r=t?function(t,n,i,a){e(t,n,i,a),d.remove(r)}:e;return d.remove(e),s[n?`unshift`:`push`](r),en(),r},remove:function(e,t){~(t=s.indexOf(e))&&s.splice(t,1)&&p>=t&&p--},_listeners:s},d}(),en=function(){return!Qt&&$t.wake()},tn={},nn=/^[\d.\-M][\d.\-,\s]/,rn=/["']/g,an=function(e){for(var t={},n=e.substr(1,e.length-3).split(`:`),r=n[0],i=1,a=n.length,o,s,c;i<a;i++)s=n[i],o=i===a-1?s.length:s.lastIndexOf(`,`),c=s.substr(0,o),t[r]=isNaN(c)?c.replace(rn,``).trim():+c,r=s.substr(o+1).trim();return t},on=function(e){var t=e.indexOf(`(`)+1,n=e.indexOf(`)`),r=e.indexOf(`(`,t);return e.substring(t,~r&&r<n?e.indexOf(`)`,n+1):n)},sn=function(e){var t=(e+``).split(`(`),n=tn[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf(`{`)?[an(t[1])]:on(e).split(`,`).map(Pe)):tn._CE&&nn.test(e)?tn._CE(``,e):n},cn=function(e){return function(t){return 1-e(1-t)}},ln=function(e,t){return e&&(k(e)?e:tn[e]||sn(e))||t},un=function(e,t,n,r){n===void 0&&(n=function(e){return 1-t(1-e)}),r===void 0&&(r=function(e){return e<.5?t(e*2)/2:1-t((1-e)*2)/2});var i={easeIn:t,easeOut:n,easeInOut:r},a;return Ee(e,function(e){for(var t in tn[e]=ce[e]=i,tn[a=e.toLowerCase()]=n,i)tn[a+(t===`easeIn`?`.in`:t===`easeOut`?`.out`:`.inOut`)]=tn[e+`.`+t]=i[t]}),i},dn=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},fn=function e(t,n,r){var i=n>=1?n:1,a=(r||(t?.3:.45))/(n<1?n:1),o=a/S*(Math.asin(1/i)||0),s=function(e){return e===1?1:i*2**(-10*e)*D((e-o)*a)+1},c=t===`out`?s:t===`in`?function(e){return 1-s(1-e)}:dn(s);return a=S/a,c.config=function(n,r){return e(t,n,r)},c},pn=function e(t,n){n===void 0&&(n=1.70158);var r=function(e){return e?--e*e*((n+1)*e+n)+1:0},i=t===`out`?r:t===`in`?function(e){return 1-r(1-e)}:dn(r);return i.config=function(n){return e(t,n)},i},Ee(`Linear,Quad,Cubic,Quart,Quint,Strong`,function(e,t){var n=t<5?t+1:t;un(e+`,Power`+(n-1),t?function(e){return e**+n}:function(e){return e},function(e){return 1-(1-e)**n},function(e){return e<.5?(e*2)**n/2:1-((1-e)*2)**n/2})}),tn.Linear.easeNone=tn.none=tn.Linear.easeIn,un(`Elastic`,fn(`in`),fn(`out`),fn()),(function(e,t){var n=1/t,r=2*n,i=2.5*n,a=function(a){return a<n?e*a*a:a<r?e*(a-1.5/t)**2+.75:a<i?e*(a-=2.25/t)*a+.9375:e*(a-2.625/t)**2+.984375};un(`Bounce`,function(e){return 1-a(1-e)},a)})(7.5625,2.75),un(`Expo`,function(e){return 2**(10*(e-1))*e+e*e*e*e*e*e*(1-e)}),un(`Circ`,function(e){return-(T(1-e*e)-1)}),un(`Sine`,function(e){return e===1?1:-E(e*C)+1}),un(`Back`,pn(`in`),pn(`out`),pn()),tn.SteppedEase=tn.steps=ce.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,r=e+ +!t,i=+!!t,a=1-x;return function(e){return((r*ht(0,a,e)|0)+i)*n}}},g.ease=tn[`quad.out`],Ee(`onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt`,function(e){return Se+=e+`,`+e+`Params,`}),mn=function(e,t){this.id=w++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:Te,this.set=t?t.getSetter:Fn},hn=function(){function e(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,lt(this,+e.duration,1,1),this.data=e.data,y&&(this._ctx=y,y.data.push(this)),Qt||$t.wake()}var t=e.prototype;return t.delay=function(e){return e||e===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+e-this._delay),this._delay=e,this):this._delay},t.duration=function(e){return arguments.length?this.totalDuration(this._repeat>0?e+(e+this._rDelay)*this._repeat:e):this.totalDuration()&&this._dur},t.totalDuration=function(e){return arguments.length?(this._dirty=0,lt(this,this._repeat<0?e:(e-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(e,t){if(en(),!arguments.length)return this._tTime;var n=this._dp;if(n&&n.smoothChildTiming&&this._ts){for(et(this,e),!n._dp||n.parent||tt(n,this);n&&n.parent;)n.parent._time!==n._start+(n._ts>=0?n._tTime/n._ts:(n.totalDuration()-n._tTime)/-n._ts)&&n.totalTime(n._tTime,!0),n=n.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&e<this._tDur||this._ts<0&&e>0||!this._tDur&&!e)&&nt(this._dp,this,this._start-this._delay)}return(this._tTime!==e||!this._dur&&!t||this._initted&&Math.abs(this._zTime)===x||!this._initted&&this._dur&&e||!e&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=e),Ne(this,e,t)),this},t.time=function(e,t){return arguments.length?this.totalTime(Math.min(this.totalDuration(),e+Xe(this))%(this._dur+this._rDelay)||(e?this._dur:0),t):this._time},t.totalProgress=function(e,t){return arguments.length?this.totalTime(this.totalDuration()*e,t):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(e,t){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-e:e)+Xe(this),t):this.duration()?Math.min(1,this._time/this._dur):+(this.rawTime()>0)},t.iteration=function(e,t){var n=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(e-1)*n,t):this._repeat?Ze(this._tTime,n)+1:1},t.timeScale=function(e,t){if(!arguments.length)return this._rts===-x?0:this._rts;if(this._rts===e)return this;var n=this.parent&&this._ts?Qe(this.parent._time,this):this._tTime;return this._rts=+e||0,this._ts=this._ps||e===-x?0:this._rts,this.totalTime(ht(-Math.abs(this._delay),this.totalDuration(),n),t!==!1),$e(this),qe(this)},t.paused=function(e){return arguments.length?(this._ps!==e&&(this._ps=e,e?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(en(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==x&&(this._tTime-=x)))),this):this._ps},t.startTime=function(e){if(arguments.length){this._start=Oe(e);var t=this.parent||this._dp;return t&&(t._sort||!this.parent)&&nt(t,this,this._start-this._delay),this}return this._start},t.endTime=function(e){return this._start+(N(e)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(e){var t=this.parent||this._dp;return t?e&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Qe(t.rawTime(e),this):this._tTime:this._tTime},t.revert=function(e){e===void 0&&(e=ge);var t=v;return v=e,Me(this)&&(this.timeline&&this.timeline.revert(e),this.totalTime(-.01,e.suppressEvents)),this.data!==`nested`&&e.kill!==!1&&this.kill(),v=t,this},t.globalTime=function(e){for(var t=this,n=arguments.length?e:t.rawTime();t;)n=t._start+n/(Math.abs(t._ts)||1),t=t._dp;return!this.parent&&this._sat?this._sat.globalTime(e):n},t.repeat=function(e){return arguments.length?(this._repeat=e===1/0?-2:e,ut(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(e){if(arguments.length){var t=this._time;return this._rDelay=e,ut(this),t?this.time(t):this}return this._rDelay},t.yoyo=function(e){return arguments.length?(this._yoyo=e,this):this._yoyo},t.seek=function(e,t){return this.totalTime(ft(this,e),N(t))},t.restart=function(e,t){return this.play().totalTime(e?-this._delay:0,N(t)),this._dur||(this._zTime=-x),this},t.play=function(e,t){return e!=null&&this.seek(e,t),this.reversed(!1).paused(!1)},t.reverse=function(e,t){return e!=null&&this.seek(e||this.totalDuration(),t),this.reversed(!0).paused(!1)},t.pause=function(e,t){return e!=null&&this.seek(e,t),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(e){return arguments.length?(!!e!==this.reversed()&&this.timeScale(-this._rts||(e?-x:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-x,this},t.isActive=function(){var e=this.parent||this._dp,t=this._start,n;return!!(!e||this._ts&&this._initted&&e.isActive()&&(n=e.rawTime(!0))>=t&&n<this.endTime(!0)-x)},t.eventCallback=function(e,t,n){var r=this.vars;return arguments.length>1?(t?(r[e]=t,n&&(r[e+`Params`]=n),e===`onUpdate`&&(this._onUpdate=t)):delete r[e],this):r[e]},t.then=function(e){var t=this,n=t._prom;return new Promise(function(r){var i=k(e)?e:Fe,a=function(){var e=t.then;t.then=null,n&&n(),k(i)&&(i=i(t))&&(i.then||i===t)&&(t.then=e),r(i),t.then=e};t._initted&&t.totalProgress()===1&&t._ts>=0||!t._tTime&&t._ts<0?a():t._prom=a})},t.kill=function(){zt(this)},e}(),Ie(hn.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-x,_prom:0,_ps:!1,_rts:1}),gn=function(e){m(t,e);function t(t,n){var r;return t===void 0&&(t={}),r=e.call(this,t)||this,r.labels={},r.smoothChildTiming=!!t.smoothChildTiming,r.autoRemoveChildren=!!t.autoRemoveChildren,r._sort=N(t.sortChildren),V&&nt(t.parent||V,p(r),n),t.reversed&&r.reverse(),t.paused&&r.paused(!0),t.scrollTrigger&&rt(p(r),t.scrollTrigger),r}var n=t.prototype;return n.to=function(e,t,n){return pt(0,arguments,this),this},n.from=function(e,t,n){return pt(1,arguments,this),this},n.fromTo=function(e,t,n,r){return pt(2,arguments,this),this},n.set=function(e,t,n){return t.duration=0,t.parent=this,Ve(t).repeatDelay||(t.repeat=0),t.immediateRender=!!t.immediateRender,new An(e,t,ft(this,n),1),this},n.call=function(e,t,n){return nt(this,An.delayedCall(0,e,t),n)},n.staggerTo=function(e,t,n,r,i,a,o){return n.duration=t,n.stagger=n.stagger||r,n.onComplete=a,n.onCompleteParams=o,n.parent=this,new An(e,n,ft(this,i)),this},n.staggerFrom=function(e,t,n,r,i,a,o){return n.runBackwards=1,Ve(n).immediateRender=N(n.immediateRender),this.staggerTo(e,t,n,r,i,a,o)},n.staggerFromTo=function(e,t,n,r,i,a,o,s){return r.startAt=n,Ve(r).immediateRender=N(r.immediateRender),this.staggerTo(e,t,r,i,a,o,s)},n.render=function(e,t,n){var r=this._time,i=this._dirty?this.totalDuration():this._tDur,a=this._dur,o=e<=0?0:Oe(e),s=this._zTime<0!=e<0&&(this._initted||!a),c,l,u,d,f,p,m,h,g,_,y,b;if(this!==V&&o>i&&e>=0&&(o=i),o!==this._tTime||n||s){if(r!==this._time&&a&&(o+=this._time-r,e+=this._time-r),c=o,g=this._start,h=this._ts,p=!h,s&&(a||(r=this._zTime),(e||!t)&&(this._zTime=e)),this._repeat){if(y=this._yoyo,f=a+this._rDelay,this._repeat<-1&&e<0)return this.totalTime(f*100+e,t,n);if(c=Oe(o%f),o===i?(d=this._repeat,c=a):(_=Oe(o/f),d=~~_,d&&d===_&&(c=a,d--),c>a&&(c=a)),_=Ze(this._tTime,f),!r&&this._tTime&&_!==d&&this._tTime-_*f-this._dur<=0&&(_=d),y&&d&1&&(c=a-c,b=1),d!==_&&!this._lock){var S=y&&_&1,C=S===(y&&d&1);if(d<_&&(S=!S),r=S?0:o%a?a:o,this._lock=1,this.render(r||(b?0:Oe(d*f)),t,!a)._lock=0,this._tTime=o,!t&&this.parent&&Rt(this,`onRepeat`),this.vars.repeatRefresh&&!b&&(this.invalidate()._lock=1,_=d),r&&r!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act||(a=this._dur,i=this._tDur,C&&(this._lock=2,r=S?a:-1e-4,this.render(r,!0),this.vars.repeatRefresh&&!b&&this.invalidate()),this._lock=0,!this._ts&&!p))return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(m=ct(this,Oe(r),Oe(c)),m&&(o-=c-(c=m._start))),this._tTime=o,this._time=c,this._act=!!h,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=e,r=0),!r&&o&&a&&!t&&!_&&(Rt(this,`onStart`),this._tTime!==o))return this;if(c>=r&&e>=0)for(l=this._first;l;){if(u=l._next,(l._act||c>=l._start)&&l._ts&&m!==l){if(l.parent!==this)return this.render(e,t,n);if(l.render(l._ts>0?(c-l._start)*l._ts:(l._dirty?l.totalDuration():l._tDur)+(c-l._start)*l._ts,t,n),c!==this._time||!this._ts&&!p){m=0,u&&(o+=this._zTime=-x);break}}l=u}else{l=this._last;for(var w=e<0?e:c;l;){if(u=l._prev,(l._act||w<=l._end)&&l._ts&&m!==l){if(l.parent!==this)return this.render(e,t,n);if(l.render(l._ts>0?(w-l._start)*l._ts:(l._dirty?l.totalDuration():l._tDur)+(w-l._start)*l._ts,t,n||v&&Me(l)),c!==this._time||!this._ts&&!p){m=0,u&&(o+=this._zTime=w?-x:x);break}}l=u}}if(m&&!t&&(this.pause(),m.render(c>=r?0:-x)._zTime=c>=r?1:-1,this._ts))return this._start=g,$e(this),this.render(e,t,n);this._onUpdate&&!t&&Rt(this,`onUpdate`,!0),(o===i&&this._tTime>=this.totalDuration()||!o&&r)&&(g===this._start||Math.abs(h)!==Math.abs(this._ts))&&(this._lock||((e||!a)&&(o===i&&this._ts>0||!o&&this._ts<0)&&Ge(this,1),!t&&!(e<0&&!r)&&(o||r||!i)&&(Rt(this,o===i&&e>=0?`onComplete`:`onReverseComplete`,!0),this._prom&&!(o<i&&this.timeScale()>0)&&this._prom())))}return this},n.add=function(e,t){var n=this;if(A(t)||(t=ft(this,t,e)),!(e instanceof hn)){if(L(e))return e.forEach(function(e){return n.add(e,t)}),this;if(O(e))return this.addLabel(e,t);if(k(e))e=An.delayedCall(0,e);else return this}return this===e?this:nt(this,e,t)},n.getChildren=function(e,t,n,r){e===void 0&&(e=!0),t===void 0&&(t=!0),n===void 0&&(n=!0),r===void 0&&(r=-b);for(var i=[],a=this._first;a;)a._start>=r&&(a instanceof An?t&&i.push(a):(n&&i.push(a),e&&i.push.apply(i,a.getChildren(!0,t,n)))),a=a._next;return i},n.getById=function(e){for(var t=this.getChildren(1,1,1),n=t.length;n--;)if(t[n].vars.id===e)return t[n]},n.remove=function(e){return O(e)?this.removeLabel(e):k(e)?this.killTweensOf(e):(e.parent===this&&We(this,e),e===this._recent&&(this._recent=this._last),Ke(this))},n.totalTime=function(t,n){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Oe($t.time-(this._ts>0?t/this._ts:(this.totalDuration()-t)/-this._ts))),e.prototype.totalTime.call(this,t,n),this._forcing=0,this):this._tTime},n.addLabel=function(e,t){return this.labels[e]=ft(this,t),this},n.removeLabel=function(e){return delete this.labels[e],this},n.addPause=function(e,t,n){var r=An.delayedCall(0,t||U,n);return r.data=`isPause`,this._hasPause=1,nt(this,r,ft(this,e))},n.removePause=function(e){var t=this._first;for(e=ft(this,e);t;)t._start===e&&t.data===`isPause`&&Ge(t),t=t._next},n.killTweensOf=function(e,t,n){for(var r=this.getTweensOf(e,n),i=r.length;i--;)xn!==r[i]&&r[i].kill(e,t);return this},n.getTweensOf=function(e,t){for(var n=[],r=xt(e),i=this._first,a=A(t),o;i;)i instanceof An?Ae(i._targets,r)&&(a?(!xn||i._initted&&i._ts)&&i.globalTime(0)<=t&&i.globalTime(i.totalDuration())>t:!t||i.isActive())&&n.push(i):(o=i.getTweensOf(r,t)).length&&n.push.apply(n,o),i=i._next;return n},n.tweenTo=function(e,t){t||={};var n=this,r=ft(n,e),i=t,a=i.startAt,o=i.onStart,s=i.onStartParams,c=i.immediateRender,l,u=An.to(n,Ie({ease:t.ease||`none`,lazy:!1,immediateRender:!1,time:r,overwrite:`auto`,duration:t.duration||Math.abs((r-(a&&`time`in a?a.time:n._time))/n.timeScale())||x,onStart:function(){if(n.pause(),!l){var e=t.duration||Math.abs((r-(a&&`time`in a?a.time:n._time))/n.timeScale());u._dur!==e&&lt(u,e,0,1).render(u._time,!0,!0),l=1}o&&o.apply(u,s||[])}},t));return c?u.render(0):u},n.tweenFromTo=function(e,t,n){return this.tweenTo(t,Ie({startAt:{time:ft(this,e)}},n))},n.recent=function(){return this._recent},n.nextLabel=function(e){return e===void 0&&(e=this._time),Lt(this,ft(this,e))},n.previousLabel=function(e){return e===void 0&&(e=this._time),Lt(this,ft(this,e),1)},n.currentLabel=function(e){return arguments.length?this.seek(e,!0):this.previousLabel(this._time+x)},n.shiftChildren=function(e,t,n){n===void 0&&(n=0);var r=this._first,i=this.labels,a;for(e=Oe(e);r;)r._start>=n&&(r._start+=e,r._end+=e),r=r._next;if(t)for(a in i)i[a]>=n&&(i[a]+=e);return Ke(this)},n.invalidate=function(t){var n=this._first;for(this._lock=0;n;)n.invalidate(t),n=n._next;return e.prototype.invalidate.call(this,t)},n.clear=function(e){e===void 0&&(e=!0);for(var t=this._first,n;t;)n=t._next,this.remove(t),t=n;return this._dp&&(this._time=this._tTime=this._pTime=0),e&&(this.labels={}),Ke(this)},n.totalDuration=function(e){var t=0,n=this,r=n._last,i=b,a,o,s;if(arguments.length)return n.timeScale((n._repeat<0?n.duration():n.totalDuration())/(n.reversed()?-e:e));if(n._dirty){for(s=n.parent;r;)a=r._prev,r._dirty&&r.totalDuration(),o=r._start,o>i&&n._sort&&r._ts&&!n._lock?(n._lock=1,nt(n,r,o-r._delay,1)._lock=0):i=o,o<0&&r._ts&&(t-=o,(!s&&!n._dp||s&&s.smoothChildTiming)&&(n._start+=Oe(o/n._ts),n._time-=o,n._tTime-=o),n.shiftChildren(-o,!1,-1/0),i=0),r._end>t&&r._ts&&(t=r._end),r=a;lt(n,n===V&&n._time>t?n._time:t,1,1),n._dirty=0}return n._tDur},t.updateRoot=function(e){if(V._ts&&(Ne(V,Qe(e,V)),q=$t.frame),$t.frame>=be){be+=h.autoSleep||120;var t=V._first;if((!t||!t._ts)&&h.autoSleep&&$t._listeners.length<2){for(;t&&!t._ts;)t=t._next;t||$t.sleep()}}},t}(hn),Ie(gn.prototype,{_lock:0,_hasPause:0,_forcing:0}),_n=function(e,t,n,r,i,a,o){var s=new Wn(this._pt,e,t,0,1,Rn,null,i),c=0,l=0,u,d,f,p,m,h,g,_;for(s.b=n,s.e=r,n+=``,r+=``,(g=~r.indexOf(`random(`))&&(r=Pt(r)),a&&(_=[n,r],a(_,e,t),n=_[0],r=_[1]),d=n.match(B)||[];u=B.exec(r);)p=u[0],m=r.substring(c,u.index),f?f=(f+1)%5:m.substr(-5)===`rgba(`&&(f=1),p!==d[l++]&&(h=parseFloat(d[l-1])||0,s._pt={_next:s._pt,p:m||l===1?m:`,`,s:h,c:p.charAt(1)===`=`?ke(h,p)-h:parseFloat(p)-h,m:f&&f<4?Math.round:0},c=B.lastIndex);return s.c=c<r.length?r.substring(c,r.length):``,s.fp=o,(re.test(r)||g)&&(s.e=0),this._pt=s,s},vn=function(e,t,n,r,i,a,o,s,c,l){k(r)&&(r=r(i||0,e,a));var u=e[t],d=n===`get`?k(u)?c?e[t.indexOf(`set`)||!k(e[`get`+t.substr(3)])?t:`get`+t.substr(3)](c):e[t]():u:n,f=k(u)?c?Nn:Mn:jn,p;if(O(r)&&(~r.indexOf(`random(`)&&(r=Pt(r)),r.charAt(1)===`=`&&(p=ke(d,r)+(gt(d)||0),(p||p===0)&&(r=p))),!l||d!==r||Sn)return!isNaN(d*r)&&r!==``?(p=new Wn(this._pt,e,t,+d||0,r-(d||0),typeof u==`boolean`?Ln:In,0,f),c&&(p.fp=c),o&&p.modifier(o,this,e),this._pt=p):(!u&&!(t in e)&&fe(t,r),_n.call(this,e,t,d,r,f,s||h.stringFilter,c))},yn=function(e,t,n,r,i){if(k(e)&&(e=Dn(e,i,t,n,r)),!M(e)||e.style&&e.nodeType||L(e)||I(e))return O(e)?Dn(e,i,t,n,r):e;var a={},o;for(o in e)a[o]=Dn(e[o],i,t,n,r);return a},bn=function(e,t,n,r,i,a){var o,s,c,l;if(ve[e]&&(o=new ve[e]).init(i,o.rawVars?t[e]:yn(t[e],r,i,a,n),n,r,a)!==!1&&(n._pt=s=new Wn(n._pt,i,e,0,1,o.render,o,0,o.priority),n!==Bt))for(c=n._ptLookup[n._targets.indexOf(i)],l=o._props.length;l--;)c[o._props[l]]=s;return o},Cn=function e(t,n,r){var i=t.vars,a=i.ease,o=i.startAt,s=i.immediateRender,c=i.lazy,l=i.onUpdate,u=i.runBackwards,d=i.yoyoEase,f=i.keyframes,p=i.autoRevert,m=t._dur,h=t._startAt,y=t._targets,S=t.parent,C=S&&S.data===`nested`?S.vars.targets:y,w=t._overwrite===`auto`&&!_,T=t.timeline,E=i.easeReverse||d,D,O,k,A,j,M,P,F,I,L,ee,te,R;if(T&&(!f||!a)&&(a=`none`),t._ease=ln(a,g.ease),t._rEase=E&&(ln(E)||t._ease),t._from=!T&&!!i.runBackwards,t._from&&(t.ratio=1),!T||f&&!i.stagger){if(F=y[0]?we(y[0]).harness:0,te=F&&i[F.prop],D=Be(i,G),h&&(h._zTime<0&&h.progress(1),n<0&&u&&s&&!p?h.render(-1,!0):h.revert(u&&m?W:he),h._lazy=0),o){if(Ge(t._startAt=An.set(y,Ie({data:`isStart`,overwrite:!1,parent:S,immediateRender:!0,lazy:!h&&N(c),startAt:null,delay:0,onUpdate:l&&function(){return Rt(t,`onUpdate`)},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,n<0&&(v||!s&&!p)&&t._startAt.revert(W),s&&m&&n<=0&&r<=0){n&&(t._zTime=n);return}}else if(u&&m&&!h){if(n&&(s=!1),k=Ie({overwrite:!1,data:`isFromStart`,lazy:s&&!h&&N(c),immediateRender:s,stagger:0,parent:S},D),te&&(k[F.prop]=te),Ge(t._startAt=An.set(y,k)),t._startAt._dp=0,t._startAt._sat=t,n<0&&(v?t._startAt.revert(W):t._startAt.render(-1,!0)),t._zTime=n,!s)e(t._startAt,x,x);else if(!n)return}for(t._pt=t._ptCache=0,c=m&&N(c)||c&&!m,O=0;O<y.length;O++){if(j=y[O],P=j._gsap||Ce(y)[O]._gsap,t._ptLookup[O]=L={},K[P.id]&&_e.length&&je(),ee=C===y?O:C.indexOf(j),F&&(I=new F).init(j,te||D,t,ee,C)!==!1&&(t._pt=A=new Wn(t._pt,j,I.name,0,1,I.render,I,0,I.priority),I._props.forEach(function(e){L[e]=A}),I.priority&&(M=1)),!F||te)for(k in D)ve[k]&&(I=bn(k,D,t,ee,j,C))?I.priority&&(M=1):L[k]=A=vn.call(t,j,k,`get`,D[k],ee,C,0,i.stringFilter);t._op&&t._op[O]&&t.kill(j,t._op[O]),w&&t._pt&&(xn=t,V.killTweensOf(j,L,t.globalTime(n)),R=!t.parent,xn=0),t._pt&&c&&(K[P.id]=1)}M&&Un(t),t._onInit&&t._onInit(t)}t._onUpdate=l,t._initted=(!t._op||t._pt)&&!R,f&&n<=0&&T.render(b,!0,!0)},wn=function(e,t,n,r,i,a,o,s){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],l,u,d,f;if(!c)for(c=e._ptCache[t]=[],d=e._ptLookup,f=e._targets.length;f--;){if(l=d[f][t],l&&l.d&&l.d._pt)for(l=l.d._pt;l&&l.p!==t&&l.fp!==t;)l=l._next;if(!l)return Sn=1,e.vars[t]=`+=0`,Cn(e,o),Sn=0,s?pe(t+` not eligible for reset. Try splitting into individual properties`):1;c.push(l)}for(f=c.length;f--;)u=c[f],l=u._pt||u,l.s=(r||r===0)&&!i?r:l.s+(r||0)+a*l.c,l.c=n-l.s,u.e&&(u.e=De(n)+gt(u.e)),u.b&&(u.b=l.s+gt(u.b))},Tn=function(e,t){var n=e[0]?we(e[0]).harness:0,r=n&&n.aliases,i,a,o,s;if(!r)return t;for(a in i=Re({},t),r)if(a in i)for(s=r[a].split(`,`),o=s.length;o--;)i[s[o]]=i[a];return i},En=function(e,t,n,r){var i=t.ease||r||`power1.inOut`,a,o;if(L(t))o=n[e]||(n[e]=[]),t.forEach(function(e,n){return o.push({t:n/(t.length-1)*100,v:e,e:i})});else for(a in t)o=n[a]||(n[a]=[]),a===`ease`||o.push({t:parseFloat(e),v:t[a],e:i})},Dn=function(e,t,n,r,i){return k(e)?e.call(t,n,r,i):O(e)&&~e.indexOf(`random(`)?Pt(e):e},On=Se+`repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert`,kn={},Ee(On+`,id,stagger,delay,duration,paused,scrollTrigger`,function(e){return kn[e]=1}),An=function(e){m(t,e);function t(t,n,r,i){var a;typeof n==`number`&&(r.duration=n,n=r,r=null),a=e.call(this,i?n:Ve(n))||this;var o=a.vars,s=o.duration,c=o.delay,l=o.immediateRender,u=o.stagger,d=o.overwrite,f=o.keyframes,m=o.defaults,g=o.scrollTrigger,v=n.parent||V,y=(L(t)||I(t)?A(t[0]):`length`in n)?[t]:xt(t),b,S,C,w,T,E,D,O;if(a._targets=y.length?Ce(y):pe(`GSAP target `+t+` not found. https://gsap.com`,!h.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,f||u||F(s)||F(c)){n=a.vars;var k=n.easeReverse||n.yoyoEase;if(b=a.timeline=new gn({data:`nested`,defaults:m||{},targets:v&&v.data===`nested`?v.vars.targets:y}),b.kill(),b.parent=b._dp=p(a),b._start=0,u||F(s)||F(c)){if(w=y.length,D=u&&wt(u),M(u))for(T in u)~On.indexOf(T)&&(O||={},O[T]=u[T]);for(S=0;S<w;S++)C=Be(n,kn),C.stagger=0,k&&(C.easeReverse=k),O&&Re(C,O),E=y[S],C.duration=+Dn(s,p(a),S,E,y),C.delay=(+Dn(c,p(a),S,E,y)||0)-a._delay,!u&&w===1&&C.delay&&(a._delay=c=C.delay,a._start+=c,C.delay=0),b.to(E,C,D?D(S,E,y):0),b._ease=tn.none;b.duration()?s=c=0:a.timeline=0}else if(f){Ve(Ie(b.vars.defaults,{ease:`none`})),b._ease=ln(f.ease||n.ease||`none`);var j=0,P,ee,te;if(L(f))f.forEach(function(e){return b.to(y,e,`>`)}),b.duration();else{for(T in C={},f)T===`ease`||T===`easeEach`||En(T,f[T],C,f.easeEach);for(T in C)for(P=C[T].sort(function(e,t){return e.t-t.t}),j=0,S=0;S<P.length;S++)ee=P[S],te={ease:ee.e,duration:(ee.t-(S?P[S-1].t:0))/100*s},te[T]=ee.v,b.to(y,te,j),j+=te.duration;b.duration()<s&&b.to({},{duration:s-b.duration()})}}s||a.duration(s=b.duration())}else a.timeline=0;return d===!0&&!_&&(xn=p(a),V.killTweensOf(y),xn=0),nt(v,p(a),r),n.reversed&&a.reverse(),n.paused&&a.paused(!0),(l||!s&&!f&&a._start===Oe(v._time)&&N(l)&&Ye(p(a))&&v.data!==`nested`)&&(a._tTime=-x,a.render(Math.max(0,-c)||0)),g&&rt(p(a),g),a}var n=t.prototype;return n.render=function(e,t,n){var r=this._time,i=this._tDur,a=this._dur,o=e<0,s=e>i-x&&!o?i:e<x?0:e,c,l,u,d,f,p,m,h;if(!a)st(this,e,t,n);else if(s!==this._tTime||!e||n||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==o||this._lazy){if(c=s,h=this.timeline,this._repeat){if(d=a+this._rDelay,this._repeat<-1&&o)return this.totalTime(d*100+e,t,n);if(c=Oe(s%d),s===i?(u=this._repeat,c=a):(f=Oe(s/d),u=~~f,u&&u===f?(c=a,u--):c>a&&(c=a)),p=this._yoyo&&u&1,p&&(c=a-c),f=Ze(this._tTime,d),c===r&&!n&&this._initted&&u===f)return this._tTime=s,this;u!==f&&this.vars.repeatRefresh&&!p&&!this._lock&&c!==d&&this._initted&&(this._lock=n=1,this.render(Oe(d*u),!0).invalidate()._lock=0)}if(!this._initted){if(it(this,o?e:c,n,t,s))return this._tTime=0,this;if(r!==this._time&&!(n&&this.vars.repeatRefresh&&u!==f))return this;if(a!==this._dur)return this.render(e,t,n)}if(this._rEase){var g=c<r;if(g!==this._inv){var _=g?r:a-r;this._inv=g,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=r,this._invRecip=_?(g?-1:1)/_:0,this._invScale=g?-this.ratio:1-this.ratio,this._invEase=g?this._rEase:this._ease}this.ratio=m=this._invRatio+this._invScale*this._invEase((c-this._invTime)*this._invRecip)}else this.ratio=m=this._ease(c/a);if(this._from&&(this.ratio=m=1-m),this._tTime=s,this._time=c,!this._act&&this._ts&&(this._act=1,this._lazy=0),!r&&s&&!t&&!f&&(Rt(this,`onStart`),this._tTime!==s))return this;for(l=this._pt;l;)l.r(m,l.d),l=l._next;h&&h.render(e<0?e:h._dur*h._ease(c/this._dur),t,n)||this._startAt&&(this._zTime=e),this._onUpdate&&!t&&(o&&Je(this,e,t,n),Rt(this,`onUpdate`)),this._repeat&&u!==f&&this.vars.onRepeat&&!t&&this.parent&&Rt(this,`onRepeat`),(s===this._tDur||!s)&&this._tTime===s&&(o&&!this._onUpdate&&Je(this,e,!0,!0),(e||!a)&&(s===this._tDur&&this._ts>0||!s&&this._ts<0)&&Ge(this,1),!t&&(!o||r)&&(s||r||p)&&(Rt(this,s===i?`onComplete`:`onReverseComplete`,!0),this._prom&&!(s<i&&this.timeScale()>0)&&this._prom()))}return this},n.targets=function(){return this._targets},n.invalidate=function(t){return(!t||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(t),e.prototype.invalidate.call(this,t)},n.resetTo=function(e,t,n,r,i){Qt||$t.wake(),this._ts||this.play();var a=Math.min(this._dur,(this._dp._time-this._start)*this._ts),o;return this._initted||Cn(this,a),o=this._ease(a/this._dur),wn(this,e,t,n,r,o,a,i)?this.resetTo(e,t,n,r,1):(et(this,0),this.parent||Ue(this._dp,this,`_first`,`_last`,this._dp._sort?`_start`:0),this.render(0))},n.kill=function(e,t){if(t===void 0&&(t=`all`),!e&&(!t||t===`all`))return this._lazy=this._pt=0,this.parent?zt(this):this.scrollTrigger&&this.scrollTrigger.kill(!!v),this;if(this.timeline){var n=this.timeline.totalDuration();return this.timeline.killTweensOf(e,t,xn&&xn.vars.overwrite!==!0)._first||zt(this),this.parent&&n!==this.timeline.totalDuration()&&lt(this,this._dur*this.timeline._tDur/n,0,1),this}var r=this._targets,i=e?xt(e):r,a=this._ptLookup,o=this._pt,s,c,l,u,d,f,p;if((!t||t===`all`)&&He(r,i))return t===`all`&&(this._pt=0),zt(this);for(s=this._op=this._op||[],t!==`all`&&(O(t)&&(d={},Ee(t,function(e){return d[e]=1}),t=d),t=Tn(r,t)),p=r.length;p--;)if(~i.indexOf(r[p]))for(d in c=a[p],t===`all`?(s[p]=t,u=c,l={}):(l=s[p]=s[p]||{},u=t),u)f=c&&c[d],f&&((!(`kill`in f.d)||f.d.kill(d)===!0)&&We(this,f,`_pt`),delete c[d]),l!==`all`&&(l[d]=1);return this._initted&&!this._pt&&o&&zt(this),this},t.to=function(e,n){return new t(e,n,arguments[2])},t.from=function(e,t){return pt(1,arguments)},t.delayedCall=function(e,n,r,i){return new t(n,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:e,onComplete:n,onReverseComplete:n,onCompleteParams:r,onReverseCompleteParams:r,callbackScope:i})},t.fromTo=function(e,t,n){return pt(2,arguments)},t.set=function(e,n){return n.duration=0,n.repeatDelay||(n.repeat=0),new t(e,n)},t.killTweensOf=function(e,t,n){return V.killTweensOf(e,t,n)},t}(hn),Ie(An.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),Ee(`staggerTo,staggerFrom,staggerFromTo`,function(e){An[e]=function(){var t=new gn,n=vt.call(arguments,0);return n.splice(e===`staggerFromTo`?5:4,0,0),t[e].apply(t,n)}}),jn=function(e,t,n){return e[t]=n},Mn=function(e,t,n){return e[t](n)},Nn=function(e,t,n,r){return e[t](r.fp,n)},Pn=function(e,t,n){return e.setAttribute(t,n)},Fn=function(e,t){return k(e[t])?Mn:j(e[t])&&e.setAttribute?Pn:jn},In=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},Ln=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Rn=function(e,t){var n=t._pt,r=``;if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+r,n=n._next;r+=t.c}t.set(t.t,t.p,r,t)},zn=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},Bn=function(e,t,n,r){for(var i=this._pt,a;i;)a=i._next,i.p===r&&i.modifier(e,t,n),i=a},Vn=function(e){for(var t=this._pt,n,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?We(this,t,`_pt`):t.dep||(n=1),t=r;return!n},Hn=function(e,t,n,r){r.mSet(e,t,r.m.call(r.tween,n,r.mt),r)},Un=function(e){for(var t=e._pt,n,r,i,a;t;){for(n=t._next,r=i;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:a)?t._prev._next=t:i=t,(t._next=r)?r._prev=t:a=t,t=n}e._pt=i},Wn=function(){function e(e,t,n,r,i,a,o,s,c){this.t=t,this.s=r,this.c=i,this.p=n,this.r=a||In,this.d=o||this,this.set=s||jn,this.pr=c||0,this._next=e,e&&(e._prev=this)}var t=e.prototype;return t.modifier=function(e,t,n){this.mSet=this.mSet||this.set,this.set=Hn,this.m=e,this.mt=n,this.tween=t},e}(),Ee(Se+`parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse`,function(e){return G[e]=1}),ce.TweenMax=ce.TweenLite=An,ce.TimelineLite=ce.TimelineMax=gn,V=new gn({sortChildren:!1,defaults:g,autoRemoveChildren:!0,id:`root`,smoothChildTiming:!0}),h.stringFilter=Zt,Gn=[],Kn={},qn=[],Jn=0,Yn=0,Xn=function(e){return(Kn[e]||qn).map(function(e){return e()})},Zn=function(){var e=Date.now(),t=[];e-Jn>2&&(Xn(`matchMediaInit`),Gn.forEach(function(e){var n=e.queries,r=e.conditions,i,a,o,s;for(a in n)i=oe.matchMedia(n[a]).matches,i&&(o=1),i!==r[a]&&(r[a]=i,s=1);s&&(e.revert(),o&&t.push(e))}),Xn(`matchMediaRevert`),t.forEach(function(e){return e.onMatch(e,function(t){return e.add(null,t)})}),Jn=e,Xn(`matchMedia`))},Qn=function(){function e(e,t){this.selector=t&&St(t),this.data=[],this._r=[],this.isReverted=!1,this.id=Yn++,e&&this.add(e)}var t=e.prototype;return t.add=function(e,t,n){k(e)&&(n=t,t=e,e=k);var r=this,i=function(){var e=y,i=r.selector,a;return e&&e!==r&&e.data.push(r),n&&(r.selector=St(n)),y=r,a=t.apply(r,arguments),k(a)&&r._r.push(a),y=e,r.selector=i,r.isReverted=!1,a};return r.last=i,e===k?i(r,function(e){return r.add(null,e)}):e?r[e]=i:i},t.ignore=function(e){var t=y;y=null,e(this),y=t},t.getTweens=function(){var t=[];return this.data.forEach(function(n){return n instanceof e?t.push.apply(t,n.getTweens()):n instanceof An&&!(n.parent&&n.parent.data===`nested`)&&t.push(n)}),t},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(e,t){var n=this;if(e?(function(){for(var t=n.getTweens(),r=n.data.length,i;r--;)i=n.data[r],i.data===`isFlip`&&(i.revert(),i.getChildren(!0,!0,!1).forEach(function(e){return t.splice(t.indexOf(e),1)}));for(t.map(function(e){return{g:e._dur||e._delay||e._sat&&!e._sat.vars.immediateRender?e.globalTime(0):-1/0,t:e}}).sort(function(e,t){return t.g-e.g||-1/0}).forEach(function(t){return t.t.revert(e)}),r=n.data.length;r--;)i=n.data[r],i instanceof gn?i.data!==`nested`&&(i.scrollTrigger&&i.scrollTrigger.revert(),i.kill()):!(i instanceof An)&&i.revert&&i.revert(e);n._r.forEach(function(t){return t(e,n)}),n.isReverted=!0})():this.data.forEach(function(e){return e.kill&&e.kill()}),this.clear(),t)for(var r=Gn.length;r--;)Gn[r].id===this.id&&Gn.splice(r,1)},t.revert=function(e){this.kill(e||{})},e}(),$n=function(){function e(e){this.contexts=[],this.scope=e,y&&y.data.push(this)}var t=e.prototype;return t.add=function(e,t,n){M(e)||(e={matches:e});var r=new Qn(0,n||this.scope),i=r.conditions={},a,o,s;for(o in y&&!r.selector&&(r.selector=y.selector),this.contexts.push(r),t=r.add(`onMatch`,t),r.queries=e,e)o===`all`?s=1:(a=oe.matchMedia(e[o]),a&&(Gn.indexOf(r)<0&&Gn.push(r),(i[o]=a.matches)&&(s=1),a.addListener?a.addListener(Zn):a.addEventListener(`change`,Zn)));return s&&t(r,function(e){return r.add(null,e)}),this},t.revert=function(e){this.kill(e||{})},t.kill=function(e){this.contexts.forEach(function(t){return t.kill(e,!0)})},e}(),er={registerPlugin:function(){[...arguments].forEach(function(e){return Ht(e)})},timeline:function(e){return new gn(e)},getTweensOf:function(e,t){return V.getTweensOf(e,t)},getProperty:function(e,t,n,r){O(e)&&(e=xt(e)[0]);var i=we(e||{}).get,a=n?Fe:Pe;return n===`native`&&(n=``),e&&(t?a((ve[t]&&ve[t].get||i)(e,t,n,r)):function(t,n,r){return a((ve[t]&&ve[t].get||i)(e,t,n,r))})},quickSetter:function(e,t,n){if(e=xt(e),e.length>1){var r=e.map(function(e){return ir.quickSetter(e,t,n)}),i=r.length;return function(e){for(var t=i;t--;)r[t](e)}}e=e[0]||{};var a=ve[t],o=we(e),s=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(t){var r=new a;Bt._pt=0,r.init(e,n?t+n:t,Bt,0,[e]),r.render(1,r),Bt._pt&&zn(1,Bt)}:o.set(e,s);return a?c:function(t){return c(e,s,n?t+n:t,o,1)}},quickTo:function(e,t,n){var r,i=ir.to(e,Ie((r={},r[t]=`+=0.1`,r.paused=!0,r.stagger=0,r),n||{})),a=function(e,n,r){return i.resetTo(t,e,n,r)};return a.tween=i,a},isTweening:function(e){return V.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=ln(e.ease,g.ease)),ze(g,e||{})},config:function(e){return ze(h,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,r=e.plugins,i=e.defaults,a=e.extendTimeline;(r||``).split(`,`).forEach(function(e){return e&&!ve[e]&&!ce[e]&&pe(t+` effect requires `+e+` plugin.`)}),ye[t]=function(e,t,r){return n(xt(e),Ie(t||{},i),r)},a&&(gn.prototype[t]=function(e,n,r){return this.add(ye[t](e,M(n)?n:(r=n)&&{},this),r)})},registerEase:function(e,t){tn[e]=ln(t)},parseEase:function(e,t){return arguments.length?ln(e,t):tn},getById:function(e){return V.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new gn(e),r,i;for(n.smoothChildTiming=N(e.smoothChildTiming),V.remove(n),n._dp=0,n._time=n._tTime=V._time,r=V._first;r;)i=r._next,(t||!(!r._dur&&r instanceof An&&r.vars.onComplete===r._targets[0]))&&nt(n,r,r._start-r._delay),r=i;return nt(V,n,0),n},context:function(e,t){return e?new Qn(e,t):y},matchMedia:function(e){return new $n(e)},matchMediaRefresh:function(){return Gn.forEach(function(e){var t=e.conditions,n,r;for(r in t)t[r]&&(t[r]=!1,n=1);n&&e.revert()})||Zn()},addEventListener:function(e,t){var n=Kn[e]||(Kn[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Kn[e],r=n&&n.indexOf(t);r>=0&&n.splice(r,1)},utils:{wrap:Mt,wrapYoyo:Nt,distribute:wt,random:Dt,snap:Et,normalize:At,getUnit:gt,clamp:_t,splitColor:Kt,toArray:xt,selector:St,mapRange:Ft,pipe:Ot,unitize:kt,interpolate:It,shuffle:Ct},install:de,effects:ye,ticker:$t,updateRoot:gn.updateRoot,plugins:ve,globalTimeline:V,core:{PropTween:Wn,globals:me,Tween:An,Timeline:gn,Animation:hn,getCache:we,_removeLinkedListItem:We,reverting:function(){return v},context:function(e){return e&&y&&(y.data.push(e),e._ctx=y),y},suppressOverwrites:function(e){return _=e}}},Ee(`to,from,fromTo,delayedCall,set,killTweensOf`,function(e){return er[e]=An[e]}),$t.add(gn.updateRoot),Bt=er.to({},{duration:0}),tr=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},nr=function(e,t){var n=e._targets,r,i,a;for(r in t)for(i=n.length;i--;)a=e._ptLookup[i][r],(a&&=a.d)&&(a._pt&&(a=tr(a,r)),a&&a.modifier&&a.modifier(t[r],e,n[i],r))},rr=function(e,t){return{name:e,headless:1,rawVars:1,init:function(e,n,r){r._onInit=function(e){var r,i;if(O(n)&&(r={},Ee(n,function(e){return r[e]=1}),n=r),t){for(i in r={},n)r[i]=t(n[i]);n=r}nr(e,n)}}}},ir=er.registerPlugin({name:`attr`,init:function(e,t,n,r,i){var a,o,s;for(a in this.tween=n,t)s=e.getAttribute(a)||``,o=this.add(e,`setAttribute`,(s||0)+``,t[a],r,i,0,0,a),o.op=a,o.b=s,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)v?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:`endArray`,headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},rr(`roundProps`,Tt),rr(`modifiers`),rr(`snap`,Et))||er,An.version=gn.version=ir.version=`3.15.0`,ue=1,P()&&en(),tn.Power0,tn.Power1,tn.Power2,tn.Power3,tn.Power4,tn.Linear,tn.Quad,tn.Cubic,tn.Quart,tn.Quint,tn.Strong,tn.Elastic,tn.Back,tn.SteppedEase,tn.Bounce,tn.Sine,tn.Expo,tn.Circ})),or,sr,cr,lr,ur,dr,fr,pr,mr,hr,gr,_r,vr,yr,br,xr,Sr,Cr,wr,Tr,Er,Dr,Or,kr,Ar,jr,Mr,Nr,Pr,Fr,Ir,Lr,Rr,zr,Br,Vr,Hr,Ur,Wr,Gr,Kr,qr,Jr,Yr,Xr,Zr,Qr,$r,ei,ti,ni,ri,ii,ai,oi,si,ci,li,ui,di,fi,pi,mi,hi,gi,_i,vi,yi,bi,xi,Si,Ci,wi,Ti,Ei,Di,Oi=i((()=>{ar(),pr=function(){return typeof window<`u`},mr={},hr=180/Math.PI,gr=Math.PI/180,_r=Math.atan2,vr=1e8,yr=/([A-Z])/g,br=/(left|right|width|margin|padding|x)/i,xr=/[\s,\(]\S/,Sr={autoAlpha:`opacity,visibility`,scale:`scaleX,scaleY`,alpha:`opacity`},Cr=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},wr=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Tr=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Er=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Dr=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},Or=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},kr=function(e,t){return t.set(t.t,t.p,e===1?t.e:t.b,t)},Ar=function(e,t,n){return e.style[t]=n},jr=function(e,t,n){return e.style.setProperty(t,n)},Mr=function(e,t,n){return e._gsap[t]=n},Nr=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},Pr=function(e,t,n,r,i){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(i,a)},Fr=function(e,t,n,r,i){var a=e._gsap;a[t]=n,a.renderTransform(i,a)},Ir=`transform`,Lr=Ir+`Origin`,Rr=function e(t,n){var r=this,i=this.target,a=i.style,o=i._gsap;if(t in mr&&a){if(this.tfm=this.tfm||{},t!==`transform`)t=Sr[t]||t,~t.indexOf(`,`)?t.split(`,`).forEach(function(e){return r.tfm[e]=ri(i,e)}):this.tfm[t]=o.x?o[t]:ri(i,t),t===Lr&&(this.tfm.zOrigin=o.zOrigin);else return Sr.transform.split(`,`).forEach(function(t){return e.call(r,t,n)});if(this.props.indexOf(Ir)>=0)return;o.svg&&(this.svgo=i.getAttribute(`data-svg-origin`),this.props.push(Lr,n,``)),t=Ir}(a||n)&&this.props.push(t,n,a[t])},zr=function(e){e.translate&&(e.removeProperty(`translate`),e.removeProperty(`scale`),e.removeProperty(`rotate`))},Br=function(){for(var e=this.props,t=this.target,n=t.style,r=t._gsap,i=0,a;i<e.length;i+=3)e[i+1]?e[i+1]===2?t[e[i]](e[i+2]):t[e[i]]=e[i+2]:e[i+2]?n[e[i]]=e[i+2]:n.removeProperty(e[i].substr(0,2)===`--`?e[i]:e[i].replace(yr,`-$1`).toLowerCase());if(this.tfm){for(a in this.tfm)r[a]=this.tfm[a];r.svg&&(r.renderTransform(),t.setAttribute(`data-svg-origin`,this.svgo||``)),i=fr(),(!i||!i.isStart)&&!n[Ir]&&(zr(n),r.zOrigin&&n[Lr]&&(n[Lr]+=` `+r.zOrigin+`px`,r.zOrigin=0,r.renderTransform()),r.uncache=1)}},Vr=function(e,t){var n={target:e,props:[],revert:Br,save:Rr};return e._gsap||ir.core.getCache(e),t&&e.style&&e.nodeType&&t.split(`,`).forEach(function(e){return n.save(e)}),n},Ur=function(e,t){var n=sr.createElementNS?sr.createElementNS((t||`http://www.w3.org/1999/xhtml`).replace(/^https/,`http`),e):sr.createElement(e);return n&&n.style?n:sr.createElement(e)},Wr=function e(t,n,r){var i=getComputedStyle(t);return i[n]||i.getPropertyValue(n.replace(yr,`-$1`).toLowerCase())||i.getPropertyValue(n)||!r&&e(t,Kr(n)||n,1)||``},Gr=`O,Moz,ms,Ms,Webkit`.split(`,`),Kr=function(e,t,n){var r=(t||ur).style,i=5;if(e in r&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);i--&&!(Gr[i]+e in r););return i<0?null:(i===3?`ms`:i>=0?Gr[i]:``)+e},qr=function(){pr()&&window.document&&(or=window,sr=or.document,cr=sr.documentElement,ur=Ur(`div`)||{style:{}},Ur(`div`),Ir=Kr(Ir),Lr=Ir+`Origin`,ur.style.cssText=`border-width:0;line-height:0;position:absolute;padding:0`,Hr=!!Kr(`perspective`),fr=ir.core.reverting,lr=1)},Jr=function(e){var t=e.ownerSVGElement,n=Ur(`svg`,t&&t.getAttribute(`xmlns`)||`http://www.w3.org/2000/svg`),r=e.cloneNode(!0),i;r.style.display=`block`,n.appendChild(r),cr.appendChild(n);try{i=r.getBBox()}catch{}return n.removeChild(r),cr.removeChild(n),i},Yr=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},Xr=function(e){var t,n;try{t=e.getBBox()}catch{t=Jr(e),n=1}return t&&(t.width||t.height)||n||(t=Jr(e)),t&&!t.width&&!t.x&&!t.y?{x:+Yr(e,[`x`,`cx`,`x1`])||0,y:+Yr(e,[`y`,`cy`,`y1`])||0,width:0,height:0}:t},Zr=function(e){return!(!e.getCTM||e.parentNode&&!e.ownerSVGElement||!Xr(e))},Qr=function(e,t){if(t){var n=e.style,r;t in mr&&t!==Lr&&(t=Ir),n.removeProperty?(r=t.substr(0,2),(r===`ms`||t.substr(0,6)===`webkit`)&&(t=`-`+t),n.removeProperty(r===`--`?t:t.replace(yr,`-$1`).toLowerCase())):n.removeAttribute(t)}},$r=function(e,t,n,r,i,a){var o=new Wn(e._pt,t,n,0,1,a?kr:Or);return e._pt=o,o.b=r,o.e=i,e._props.push(n),o},ei={deg:1,rad:1,turn:1},ti={grid:1,flex:1},ni=function e(t,n,r,i){var a=parseFloat(r)||0,o=(r+``).trim().substr((a+``).length)||`px`,s=ur.style,c=br.test(n),l=t.tagName.toLowerCase()===`svg`,u=(l?`client`:`offset`)+(c?`Width`:`Height`),d=100,f=i===`px`,p=i===`%`,m,h,g,_;if(i===o||!a||ei[i]||ei[o])return a;if(o!==`px`&&!f&&(a=e(t,n,r,`px`)),_=t.getCTM&&Zr(t),(p||o===`%`)&&(mr[n]||~n.indexOf(`adius`)))return m=_?t.getBBox()[c?`width`:`height`]:t[u],De(p?a/m*d:a/100*m);if(s[c?`width`:`height`]=d+(f?o:i),h=i!==`rem`&&~n.indexOf(`adius`)||i===`em`&&t.appendChild&&!l?t:t.parentNode,_&&(h=(t.ownerSVGElement||{}).parentNode),(!h||h===sr||!h.appendChild)&&(h=sr.body),g=h._gsap,g&&p&&g.width&&c&&g.time===$t.time&&!g.uncache)return De(a/g.width*d);if(p&&(n===`height`||n===`width`)){var v=t.style[n];t.style[n]=d+i,m=t[u],v?t.style[n]=v:Qr(t,n)}else(p||o===`%`)&&!ti[Wr(h,`display`)]&&(s.position=Wr(t,`position`)),h===t&&(s.position=`static`),h.appendChild(ur),m=ur[u],h.removeChild(ur),s.position=`absolute`;return c&&p&&(g=we(h),g.time=$t.time,g.width=h[u]),De(f?m*a/d:m&&a?d/m*a:0)},ri=function(e,t,n,r){var i;return lr||qr(),t in Sr&&t!==`transform`&&(t=Sr[t],~t.indexOf(`,`)&&(t=t.split(`,`)[0])),mr[t]&&t!==`transform`?(i=hi(e,r),i=t===`transformOrigin`?i.svg?i.origin:gi(Wr(e,Lr))+` `+i.zOrigin+`px`:i[t]):(i=e.style[t],(!i||i===`auto`||r||~(i+``).indexOf(`calc(`))&&(i=ci[t]&&ci[t](e,t,n)||Wr(e,t)||Te(e,t)||+(t===`opacity`))),n&&!~(i+``).trim().indexOf(` `)?ni(e,t,i,n)+n:i},ii=function(e,t,n,r){if(!n||n===`none`){var i=Kr(t,e,1),a=i&&Wr(e,i,1);a&&a!==n?(t=i,n=a):t===`borderColor`&&(n=Wr(e,`borderTopColor`))}var o=new Wn(this._pt,e.style,t,0,1,Rn),s=0,c=0,l,u,d,f,p,m,g,_,v,y,b,x;if(o.b=n,o.e=r,n+=``,r+=``,r.substring(0,6)===`var(--`&&(r=Wr(e,r.substring(4,r.indexOf(`)`)))),r===`auto`&&(m=e.style[t],e.style[t]=r,r=Wr(e,t)||r,m?e.style[t]=m:Qr(e,t)),l=[n,r],Zt(l),n=l[0],r=l[1],d=n.match(ne)||[],x=r.match(ne)||[],x.length){for(;u=ne.exec(r);)g=u[0],v=r.substring(s,u.index),p?p=(p+1)%5:(v.substr(-5)===`rgba(`||v.substr(-5)===`hsla(`)&&(p=1),g!==(m=d[c++]||``)&&(f=parseFloat(m)||0,b=m.substr((f+``).length),g.charAt(1)===`=`&&(g=ke(f,g)+b),_=parseFloat(g),y=g.substr((_+``).length),s=ne.lastIndex-y.length,y||(y=y||h.units[t]||b,s===r.length&&(r+=y,o.e+=y)),b!==y&&(f=ni(e,t,m,y)||0),o._pt={_next:o._pt,p:v||c===1?v:`,`,s:f,c:_-f,m:p&&p<4||t===`zIndex`?Math.round:0});o.c=s<r.length?r.substring(s,r.length):``}else o.r=t===`display`&&r===`none`?kr:Or;return re.test(r)&&(o.e=0),this._pt=o,o},ai={top:`0%`,bottom:`100%`,left:`0%`,right:`100%`,center:`50%`},oi=function(e){var t=e.split(` `),n=t[0],r=t[1]||`50%`;return(n===`top`||n===`bottom`||r===`left`||r===`right`)&&(e=n,n=r,r=e),t[0]=ai[n]||n,t[1]=ai[r]||r,t.join(` `)},si=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,r=n.style,i=t.u,a=n._gsap,o,s,c;if(i===`all`||i===!0)r.cssText=``,s=1;else for(i=i.split(`,`),c=i.length;--c>-1;)o=i[c],mr[o]&&(s=1,o=o===`transformOrigin`?Lr:Ir),Qr(n,o);s&&(Qr(n,Ir),a&&(a.svg&&n.removeAttribute(`transform`),r.scale=r.rotate=r.translate=`none`,hi(n,1),a.uncache=1,zr(r)))}},ci={clearProps:function(e,t,n,r,i){if(i.data!==`isFromStart`){var a=e._pt=new Wn(e._pt,t,n,0,0,si);return a.u=r,a.pr=-10,a.tween=i,e._props.push(n),1}}},li=[1,0,0,1,0,0],ui={},di=function(e){return e===`matrix(1, 0, 0, 1, 0, 0)`||e===`none`||!e},fi=function(e){var t=Wr(e,Ir);return di(t)?li:t.substr(7).match(z).map(De)},pi=function(e,t){var n=e._gsap||we(e),r=e.style,i=fi(e),a,o,s,c;return n.svg&&e.getAttribute(`transform`)?(s=e.transform.baseVal.consolidate().matrix,i=[s.a,s.b,s.c,s.d,s.e,s.f],i.join(`,`)===`1,0,0,1,0,0`?li:i):(i===li&&!e.offsetParent&&e!==cr&&!n.svg&&(s=r.display,r.display=`block`,a=e.parentNode,(!a||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,o=e.nextElementSibling,cr.appendChild(e)),i=fi(e),s?r.display=s:Qr(e,`display`),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):cr.removeChild(e))),t&&i.length>6?[i[0],i[1],i[4],i[5],i[12],i[13]]:i)},mi=function(e,t,n,r,i,a){var o=e._gsap,s=i||pi(e,!0),c=o.xOrigin||0,l=o.yOrigin||0,u=o.xOffset||0,d=o.yOffset||0,f=s[0],p=s[1],m=s[2],h=s[3],g=s[4],_=s[5],v=t.split(` `),y=parseFloat(v[0])||0,b=parseFloat(v[1])||0,x,S,C,w;n?s!==li&&(S=f*h-p*m)&&(C=h/S*y+b*(-m/S)+(m*_-h*g)/S,w=y*(-p/S)+f/S*b-(f*_-p*g)/S,y=C,b=w):(x=Xr(e),y=x.x+(~v[0].indexOf(`%`)?y/100*x.width:y),b=x.y+(~(v[1]||v[0]).indexOf(`%`)?b/100*x.height:b)),r||r!==!1&&o.smooth?(g=y-c,_=b-l,o.xOffset=u+(g*f+_*m)-g,o.yOffset=d+(g*p+_*h)-_):o.xOffset=o.yOffset=0,o.xOrigin=y,o.yOrigin=b,o.smooth=!!r,o.origin=t,o.originIsAbsolute=!!n,e.style[Lr]=`0px 0px`,a&&($r(a,o,`xOrigin`,c,y),$r(a,o,`yOrigin`,l,b),$r(a,o,`xOffset`,u,o.xOffset),$r(a,o,`yOffset`,d,o.yOffset)),e.setAttribute(`data-svg-origin`,y+` `+b)},hi=function(e,t){var n=e._gsap||new mn(e);if(`x`in n&&!t&&!n.uncache)return n;var r=e.style,i=n.scaleX<0,a=`px`,o=`deg`,s=getComputedStyle(e),c=Wr(e,Lr)||`0`,l=u=d=m=g=_=v=y=b=0,u,d,f=p=1,p,m,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,ee,te,R,z;return n.svg=!!(e.getCTM&&Zr(e)),s.translate&&((s.translate!==`none`||s.scale!==`none`||s.rotate!==`none`)&&(r[Ir]=(s.translate===`none`?``:`translate3d(`+(s.translate+` 0 0`).split(` `).slice(0,3).join(`, `)+`) `)+(s.rotate===`none`?``:`rotate(`+s.rotate+`) `)+(s.scale===`none`?``:`scale(`+s.scale.split(` `).join(`,`)+`) `)+(s[Ir]===`none`?``:s[Ir])),r.scale=r.rotate=r.translate=`none`),C=pi(e,n.svg),n.svg&&(n.uncache?(P=e.getBBox(),c=n.xOrigin-P.x+`px `+(n.yOrigin-P.y)+`px`,N=``):N=!t&&e.getAttribute(`data-svg-origin`),mi(e,N||c,!!N||n.originIsAbsolute,n.smooth!==!1,C)),x=n.xOrigin||0,S=n.yOrigin||0,C!==li&&(D=C[0],O=C[1],k=C[2],A=C[3],l=j=C[4],u=M=C[5],C.length===6?(f=Math.sqrt(D*D+O*O),p=Math.sqrt(A*A+k*k),m=D||O?_r(O,D)*hr:0,v=k||A?_r(k,A)*hr+m:0,v&&(p*=Math.abs(Math.cos(v*gr))),n.svg&&(l-=x-(x*D+S*k),u-=S-(x*O+S*A))):(z=C[6],te=C[7],I=C[8],L=C[9],ee=C[10],R=C[11],l=C[12],u=C[13],d=C[14],w=_r(z,ee),g=w*hr,w&&(T=Math.cos(-w),E=Math.sin(-w),N=j*T+I*E,P=M*T+L*E,F=z*T+ee*E,I=j*-E+I*T,L=M*-E+L*T,ee=z*-E+ee*T,R=te*-E+R*T,j=N,M=P,z=F),w=_r(-k,ee),_=w*hr,w&&(T=Math.cos(-w),E=Math.sin(-w),N=D*T-I*E,P=O*T-L*E,F=k*T-ee*E,R=A*E+R*T,D=N,O=P,k=F),w=_r(O,D),m=w*hr,w&&(T=Math.cos(w),E=Math.sin(w),N=D*T+O*E,P=j*T+M*E,O=O*T-D*E,M=M*T-j*E,D=N,j=P),g&&Math.abs(g)+Math.abs(m)>359.9&&(g=m=0,_=180-_),f=De(Math.sqrt(D*D+O*O+k*k)),p=De(Math.sqrt(M*M+z*z)),w=_r(j,M),v=Math.abs(w)>2e-4?w*hr:0,b=R?1/(R<0?-R:R):0),n.svg&&(N=e.getAttribute(`transform`),n.forceCSS=e.setAttribute(`transform`,``)||!di(Wr(e,Ir)),N&&e.setAttribute(`transform`,N))),Math.abs(v)>90&&Math.abs(v)<270&&(i?(f*=-1,v+=m<=0?180:-180,m+=m<=0?180:-180):(p*=-1,v+=v<=0?180:-180)),t||=n.uncache,n.x=l-((n.xPercent=l&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-l)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=u-((n.yPercent=u&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-u)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=d+a,n.scaleX=De(f),n.scaleY=De(p),n.rotation=De(m)+o,n.rotationX=De(g)+o,n.rotationY=De(_)+o,n.skewX=v+o,n.skewY=y+o,n.transformPerspective=b+a,(n.zOrigin=parseFloat(c.split(` `)[2])||!t&&n.zOrigin||0)&&(r[Lr]=gi(c)),n.xOffset=n.yOffset=0,n.force3D=h.force3D,n.renderTransform=n.svg?Ci:Hr?Si:vi,n.uncache=0,n},gi=function(e){return(e=e.split(` `))[0]+` `+e[1]},_i=function(e,t,n){var r=gt(t);return De(parseFloat(t)+parseFloat(ni(e,`x`,n+`px`,r)))+r},vi=function(e,t){t.z=`0px`,t.rotationY=t.rotationX=`0deg`,t.force3D=0,Si(e,t)},yi=`0deg`,bi=`0px`,xi=`) `,Si=function(e,t){var n=t||this,r=n.xPercent,i=n.yPercent,a=n.x,o=n.y,s=n.z,c=n.rotation,l=n.rotationY,u=n.rotationX,d=n.skewX,f=n.skewY,p=n.scaleX,m=n.scaleY,h=n.transformPerspective,g=n.force3D,_=n.target,v=n.zOrigin,y=``,b=g===`auto`&&e&&e!==1||g===!0;if(v&&(u!==yi||l!==yi)){var x=parseFloat(l)*gr,S=Math.sin(x),C=Math.cos(x),w;x=parseFloat(u)*gr,w=Math.cos(x),a=_i(_,a,S*w*-v),o=_i(_,o,-Math.sin(x)*-v),s=_i(_,s,C*w*-v+v)}h!==bi&&(y+=`perspective(`+h+xi),(r||i)&&(y+=`translate(`+r+`%, `+i+`%) `),(b||a!==bi||o!==bi||s!==bi)&&(y+=s!==bi||b?`translate3d(`+a+`, `+o+`, `+s+`) `:`translate(`+a+`, `+o+xi),c!==yi&&(y+=`rotate(`+c+xi),l!==yi&&(y+=`rotateY(`+l+xi),u!==yi&&(y+=`rotateX(`+u+xi),(d!==yi||f!==yi)&&(y+=`skew(`+d+`, `+f+xi),(p!==1||m!==1)&&(y+=`scale(`+p+`, `+m+xi),_.style[Ir]=y||`translate(0, 0)`},Ci=function(e,t){var n=t||this,r=n.xPercent,i=n.yPercent,a=n.x,o=n.y,s=n.rotation,c=n.skewX,l=n.skewY,u=n.scaleX,d=n.scaleY,f=n.target,p=n.xOrigin,m=n.yOrigin,h=n.xOffset,g=n.yOffset,_=n.forceCSS,v=parseFloat(a),y=parseFloat(o),b,x,S,C,w;s=parseFloat(s),c=parseFloat(c),l=parseFloat(l),l&&(l=parseFloat(l),c+=l,s+=l),s||c?(s*=gr,c*=gr,b=Math.cos(s)*u,x=Math.sin(s)*u,S=Math.sin(s-c)*-d,C=Math.cos(s-c)*d,c&&(l*=gr,w=Math.tan(c-l),w=Math.sqrt(1+w*w),S*=w,C*=w,l&&(w=Math.tan(l),w=Math.sqrt(1+w*w),b*=w,x*=w)),b=De(b),x=De(x),S=De(S),C=De(C)):(b=u,C=d,x=S=0),(v&&!~(a+``).indexOf(`px`)||y&&!~(o+``).indexOf(`px`))&&(v=ni(f,`x`,a,`px`),y=ni(f,`y`,o,`px`)),(p||m||h||g)&&(v=De(v+p-(p*b+m*S)+h),y=De(y+m-(p*x+m*C)+g)),(r||i)&&(w=f.getBBox(),v=De(v+r/100*w.width),y=De(y+i/100*w.height)),w=`matrix(`+b+`,`+x+`,`+S+`,`+C+`,`+v+`,`+y+`)`,f.setAttribute(`transform`,w),_&&(f.style[Ir]=w)},wi=function(e,t,n,r,i){var a=360,o=O(i),s=parseFloat(i)*(o&&~i.indexOf(`rad`)?hr:1)-r,c=r+s+`deg`,l,u;return o&&(l=i.split(`_`)[1],l===`short`&&(s%=a,s!==s%(a/2)&&(s+=s<0?a:-a)),l===`cw`&&s<0?s=(s+a*vr)%a-~~(s/a)*a:l===`ccw`&&s>0&&(s=(s-a*vr)%a-~~(s/a)*a)),e._pt=u=new Wn(e._pt,t,n,r,s,wr),u.e=c,u.u=`deg`,e._props.push(n),u},Ti=function(e,t){for(var n in t)e[n]=t[n];return e},Ei=function(e,t,n){var r=Ti({},n._gsap),i=`perspective,force3D,transformOrigin,svgOrigin`,a=n.style,o,s,c,l,u,d,f,p;for(s in r.svg?(c=n.getAttribute(`transform`),n.setAttribute(`transform`,``),a[Ir]=t,o=hi(n,1),Qr(n,Ir),n.setAttribute(`transform`,c)):(c=getComputedStyle(n)[Ir],a[Ir]=t,o=hi(n,1),a[Ir]=c),mr)c=r[s],l=o[s],c!==l&&i.indexOf(s)<0&&(f=gt(c),p=gt(l),u=f===p?parseFloat(c):ni(n,s,c,p),d=parseFloat(l),e._pt=new Wn(e._pt,o,s,u,d-u,Cr),e._pt.u=p||0,e._props.push(s));Ti(o,r)},Ee(`padding,margin,Width,Radius`,function(e,t){var n=`Top`,r=`Right`,i=`Bottom`,a=`Left`,o=(t<3?[n,r,i,a]:[n+a,n+r,i+r,i+a]).map(function(n){return t<2?e+n:`border`+n+e});ci[t>1?`border`+e:e]=function(e,t,n,r,i){var a,s;if(arguments.length<4)return a=o.map(function(t){return ri(e,t,n)}),s=a.join(` `),s.split(a[0]).length===5?a[0]:s;a=(r+``).split(` `),s={},o.forEach(function(e,t){return s[e]=a[t]=a[t]||a[(t-1)/2|0]}),e.init(t,s,i)}}),Di={name:`css`,register:qr,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,r,i){var a=this._props,o=e.style,s=n.vars.startAt,c,l,u,d,f,p,m,g,_,v,y,b,x,S,C,w,T;for(m in lr||qr(),this.styles=this.styles||Vr(e),w=this.styles.props,this.tween=n,t)if(m!==`autoRound`&&(l=t[m],!(ve[m]&&bn(m,t,n,r,e,i)))){if(f=typeof l,p=ci[m],f===`function`&&(l=l.call(n,r,e,i),f=typeof l),f===`string`&&~l.indexOf(`random(`)&&(l=Pt(l)),p)p(this,e,m,l,n)&&(C=1);else if(m.substr(0,2)===`--`)c=(getComputedStyle(e).getPropertyValue(m)+``).trim(),l+=``,Yt.lastIndex=0,Yt.test(c)||(g=gt(c),_=gt(l),_?g!==_&&(c=ni(e,m,c,_)+_):g&&(l+=g)),this.add(o,`setProperty`,c,l,r,i,0,0,m),a.push(m),w.push(m,0,o[m]);else if(f!==`undefined`){if(s&&m in s?(c=typeof s[m]==`function`?s[m].call(n,r,e,i):s[m],O(c)&&~c.indexOf(`random(`)&&(c=Pt(c)),gt(c+``)||c===`auto`||(c+=h.units[m]||gt(ri(e,m))||``),(c+``).charAt(1)===`=`&&(c=ri(e,m))):c=ri(e,m),d=parseFloat(c),v=f===`string`&&l.charAt(1)===`=`&&l.substr(0,2),v&&(l=l.substr(2)),u=parseFloat(l),m in Sr&&(m===`autoAlpha`&&(d===1&&ri(e,`visibility`)===`hidden`&&u&&(d=0),w.push(`visibility`,0,o.visibility),$r(this,o,`visibility`,d?`inherit`:`hidden`,u?`inherit`:`hidden`,!u)),m!==`scale`&&m!==`transform`&&(m=Sr[m],~m.indexOf(`,`)&&(m=m.split(`,`)[0]))),y=m in mr,y){if(this.styles.save(m),T=l,f===`string`&&l.substring(0,6)===`var(--`){if(l=Wr(e,l.substring(4,l.indexOf(`)`))),l.substring(0,5)===`calc(`){var E=e.style.perspective;e.style.perspective=l,l=Wr(e,`perspective`),E?e.style.perspective=E:Qr(e,`perspective`)}u=parseFloat(l)}if(b||(x=e._gsap,x.renderTransform&&!t.parseTransform||hi(e,t.parseTransform),S=t.smoothOrigin!==!1&&x.smooth,b=this._pt=new Wn(this._pt,o,Ir,0,1,x.renderTransform,x,0,-1),b.dep=1),m===`scale`)this._pt=new Wn(this._pt,x,`scaleY`,x.scaleY,(v?ke(x.scaleY,v+u):u)-x.scaleY||0,Cr),this._pt.u=0,a.push(`scaleY`,m),m+=`X`;else if(m===`transformOrigin`){w.push(Lr,0,o[Lr]),l=oi(l),x.svg?mi(e,l,0,S,0,this):(_=parseFloat(l.split(` `)[2])||0,_!==x.zOrigin&&$r(this,x,`zOrigin`,x.zOrigin,_),$r(this,o,m,gi(c),gi(l)));continue}else if(m===`svgOrigin`){mi(e,l,1,S,0,this);continue}else if(m in ui){wi(this,x,m,d,v?ke(d,v+l):l);continue}else if(m===`smoothOrigin`){$r(this,x,`smooth`,x.smooth,l);continue}else if(m===`force3D`){x[m]=l;continue}else if(m===`transform`){Ei(this,l,e);continue}}else m in o||(m=Kr(m)||m);if(y||(u||u===0)&&(d||d===0)&&!xr.test(l)&&m in o)g=(c+``).substr((d+``).length),u||=0,_=gt(l)||(m in h.units?h.units[m]:g),g!==_&&(d=ni(e,m,c,_)),this._pt=new Wn(this._pt,y?x:o,m,d,(v?ke(d,v+u):u)-d,!y&&(_===`px`||m===`zIndex`)&&t.autoRound!==!1?Dr:Cr),this._pt.u=_||0,y&&T!==l?(this._pt.b=c,this._pt.e=T,this._pt.r=Er):g!==_&&_!==`%`&&(this._pt.b=c,this._pt.r=Tr);else if(m in o)ii.call(this,e,m,c,v?v+l:l);else if(m in e)this.add(e,m,c||e[m],v?v+l:l,r,i);else if(m!==`parseTransform`){fe(m,l);continue}y||(m in o?w.push(m,0,o[m]):typeof e[m]==`function`?w.push(m,2,e[m]()):w.push(m,1,c||e[m])),a.push(m)}}C&&Un(this)},render:function(e,t){if(t.tween._time||!fr())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:ri,aliases:Sr,getSetter:function(e,t,n){var r=Sr[t];return r&&r.indexOf(`,`)<0&&(t=r),t in mr&&t!==Lr&&(e._gsap.x||ri(e,`x`))?n&&dr===n?t===`scale`?Nr:Mr:(dr=n||{})&&(t===`scale`?Pr:Fr):e.style&&!j(e.style[t])?Ar:~t.indexOf(`-`)?jr:Fn(e,t)},core:{_removeProperty:Qr,_getMatrix:pi}},ir.utils.checkPrefix=Kr,ir.core.getStyleSaver=Vr,(function(e,t,n,r){var i=Ee(e+`,`+t+`,`+n,function(e){mr[e]=1});Ee(t,function(e){h.units[e]=`deg`,ui[e]=1}),Sr[i[13]]=e+`,`+t,Ee(r,function(e){var t=e.split(`:`);Sr[t[1]]=i[t[0]]})})(`x,y,z,scale,scaleX,scaleY,xPercent,yPercent`,`rotation,rotationX,rotationY,skewX,skewY`,`transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective`,`0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY`),Ee(`x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective`,function(e){h.units[e]=`px`}),ir.registerPlugin(Di)})),ki,Ai=i((()=>{ar(),Oi(),ki=ir.registerPlugin(Di)||ir,ki.core.Tween}));function ji(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,`value`in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function Mi(e,t,n){return t&&ji(e.prototype,t),n&&ji(e,n),e}var Ni,Pi,Fi,Ii,Li,Ri,zi,Bi,Vi,Hi,Ui,Wi,Gi,Ki,qi,Ji,Yi,Xi,Zi,Qi,$i,ea,ta,na,ra,ia,aa,oa,sa,ca,la,ua,da,fa,pa,ma,ha,ga,_a,va,ya=i((()=>{Ki=function(){return Ni||typeof window<`u`&&(Ni=window.gsap)&&Ni.registerPlugin&&Ni},qi=1,Ji=[],Yi=[],Xi=[],Zi=Date.now,Qi=function(e,t){return t},$i=function(){var e=Vi.core,t=e.bridge||{},n=e._scrollers,r=e._proxies;n.push.apply(n,Yi),r.push.apply(r,Xi),Yi=n,Xi=r,Qi=function(e,n){return t[e](n)}},ea=function(e,t){return~Xi.indexOf(e)&&Xi[Xi.indexOf(e)+1][t]},ta=function(e){return!!~Hi.indexOf(e)},na=function(e,t,n,r,i){return e.addEventListener(t,n,{passive:r!==!1,capture:!!i})},ra=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},ia=`scrollLeft`,aa=`scrollTop`,oa=function(){return Ui&&Ui.isPressed||Yi.cache++},sa=function(e,t){var n=function n(r){if(r||r===0){qi&&(Fi.history.scrollRestoration=`manual`);var i=Ui&&Ui.isPressed;r=n.v=Math.round(r)||(Ui&&Ui.iOS?1:0),e(r),n.cacheID=Yi.cache,i&&Qi(`ss`,r)}else(t||Yi.cache!==n.cacheID||Qi(`ref`))&&(n.cacheID=Yi.cache,n.v=e());return n.v+n.offset};return n.offset=0,e&&n},ca={s:ia,p:`left`,p2:`Left`,os:`right`,os2:`Right`,d:`width`,d2:`Width`,a:`x`,sc:sa(function(e){return arguments.length?Fi.scrollTo(e,la.sc()):Fi.pageXOffset||Ii[ia]||Li[ia]||Ri[ia]||0})},la={s:aa,p:`top`,p2:`Top`,os:`bottom`,os2:`Bottom`,d:`height`,d2:`Height`,a:`y`,op:ca,sc:sa(function(e){return arguments.length?Fi.scrollTo(ca.sc(),e):Fi.pageYOffset||Ii[aa]||Li[aa]||Ri[aa]||0})},ua=function(e,t){return(t&&t._ctx&&t._ctx.selector||Ni.utils.toArray)(e)[0]||(typeof e==`string`&&Ni.config().nullTargetWarn!==!1?console.warn(`Element not found:`,e):null)},da=function(e,t){for(var n=t.length;n--;)if(t[n]===e||t[n].contains(e))return!0;return!1},fa=function(e,t){var n=t.s,r=t.sc;ta(e)&&(e=Ii.scrollingElement||Li);var i=Yi.indexOf(e),a=r===la.sc?1:2;!~i&&(i=Yi.push(e)-1),Yi[i+a]||na(e,`scroll`,oa);var o=Yi[i+a],s=o||(Yi[i+a]=sa(ea(e,n),!0)||(ta(e)?r:sa(function(t){return arguments.length?e[n]=t:e[n]})));return s.target=e,o||(s.smooth=Ni.getProperty(e,`scrollBehavior`)===`smooth`),s},pa=function(e,t,n){var r=e,i=e,a=Zi(),o=a,s=t||50,c=Math.max(500,s*3),l=function(e,t){var c=Zi();t||c-a>s?(i=r,r=e,o=a,a=c):n?r+=e:r=i+(e-i)/(c-o)*(a-o)};return{update:l,reset:function(){i=r=n?0:r,o=a=0},getVelocity:function(e){var t=o,s=i,u=Zi();return(e||e===0)&&e!==r&&l(e),a===o||u-o>c?0:(r+(n?s:-s))/((n?u:a)-t)*1e3}}},ma=function(e,t){return t&&!e._gsapAllow&&e.cancelable!==!1&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},ha=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},ga=function(){Vi=Ni.core.globals().ScrollTrigger,Vi&&Vi.core&&$i()},_a=function(e){return Ni=e||Ki(),!Pi&&Ni&&typeof document<`u`&&document.body&&(Fi=window,Ii=document,Li=Ii.documentElement,Ri=Ii.body,Hi=[Fi,Ii,Li,Ri],Ni.utils.clamp,Gi=Ni.core.context||function(){},Bi=`onpointerenter`in Ri?`pointer`:`mouse`,zi=va.isTouch=Fi.matchMedia&&Fi.matchMedia(`(hover: none), (pointer: coarse)`).matches?1:`ontouchstart`in Fi||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Wi=va.eventTypes=(`ontouchstart`in Li?`touchstart,touchmove,touchcancel,touchend`:`onpointerdown`in Li?`pointerdown,pointermove,pointercancel,pointerup`:`mousedown,mousemove,mouseup,mouseup`).split(`,`),setTimeout(function(){return qi=0},500),Pi=1),Vi||ga(),Pi},ca.op=la,Yi.cache=0,va=function(){function e(e){this.init(e)}var t=e.prototype;return t.init=function(e){Pi||_a(Ni)||console.warn(`Please gsap.registerPlugin(Observer)`),Vi||ga();var t=e.tolerance,n=e.dragMinimum,r=e.type,i=e.target,a=e.lineHeight,o=e.debounce,s=e.preventDefault,c=e.onStop,l=e.onStopDelay,u=e.ignore,d=e.wheelSpeed,f=e.event,p=e.onDragStart,m=e.onDragEnd,h=e.onDrag,g=e.onPress,_=e.onRelease,v=e.onRight,y=e.onLeft,b=e.onUp,x=e.onDown,S=e.onChangeX,C=e.onChangeY,w=e.onChange,T=e.onToggleX,E=e.onToggleY,D=e.onHover,O=e.onHoverEnd,k=e.onMove,A=e.ignoreCheck,j=e.isNormalizer,M=e.onGestureStart,N=e.onGestureEnd,P=e.onWheel,F=e.onEnable,I=e.onDisable,L=e.onClick,ee=e.scrollSpeed,te=e.capture,R=e.allowClicks,z=e.lockAxis,ne=e.onLockAxis;this.target=i=ua(i)||Li,this.vars=e,u&&=Ni.utils.toArray(u),t||=1e-9,n||=0,d||=1,ee||=1,r||=`wheel,touch,pointer`,o=o!==!1,a||=parseFloat(Fi.getComputedStyle(Ri).lineHeight)||22;var B,re,ie,ae,V,oe,se,H=this,ce=0,le=0,ue=e.passive||!s&&e.passive!==!1,de=fa(i,ca),fe=fa(i,la),pe=de(),me=fe(),U=~r.indexOf(`touch`)&&!~r.indexOf(`pointer`)&&Wi[0]===`pointerdown`,he=ta(i),W=i.ownerDocument||Ii,ge=[0,0,0],G=[0,0,0],_e=0,K=function(){return _e=Zi()},q=function(e,t){return(H.event=e)&&u&&da(e.target,u)||t&&U&&e.pointerType!==`touch`||A&&A(e,t)},ve=function(){H._vx.reset(),H._vy.reset(),re.pause(),c&&c(H)},ye=function(){var e=H.deltaX=ha(ge),n=H.deltaY=ha(G),r=Math.abs(e)>=t,i=Math.abs(n)>=t;w&&(r||i)&&w(H,e,n,ge,G),r&&(v&&H.deltaX>0&&v(H),y&&H.deltaX<0&&y(H),S&&S(H),T&&H.deltaX<0!=ce<0&&T(H),ce=H.deltaX,ge[0]=ge[1]=ge[2]=0),i&&(x&&H.deltaY>0&&x(H),b&&H.deltaY<0&&b(H),C&&C(H),E&&H.deltaY<0!=le<0&&E(H),le=H.deltaY,G[0]=G[1]=G[2]=0),(ae||ie)&&(k&&k(H),ie&&=(p&&ie===1&&p(H),h&&h(H),0),ae=!1),oe&&!(oe=!1)&&ne&&ne(H),V&&=(P(H),!1),B=0},be=function(e,t,n){ge[n]+=e,G[n]+=t,H._vx.update(e),H._vy.update(t),o?B||=requestAnimationFrame(ye):ye()},xe=function(e,t){z&&!se&&(H.axis=se=Math.abs(e)>Math.abs(t)?`x`:`y`,oe=!0),se!==`y`&&(ge[2]+=e,H._vx.update(e,!0)),se!==`x`&&(G[2]+=t,H._vy.update(t,!0)),o?B||=requestAnimationFrame(ye):ye()},Se=function(e){if(!q(e,1)){e=ma(e,s);var t=e.clientX,r=e.clientY,i=t-H.x,a=r-H.y,o=H.isDragging;H.x=t,H.y=r,(o||(i||a)&&(Math.abs(H.startX-t)>=n||Math.abs(H.startY-r)>=n))&&(ie||=o?2:1,o||(H.isDragging=!0),xe(i,a))}},Ce=H.onPress=function(e){q(e,1)||e&&e.button||(H.axis=se=null,re.pause(),H.isPressed=!0,e=ma(e),ce=le=0,H.startX=H.x=e.clientX,H.startY=H.y=e.clientY,H._vx.reset(),H._vy.reset(),na(j?i:W,Wi[1],Se,ue,!0),H.deltaX=H.deltaY=0,g&&g(H))},we=H.onRelease=function(e){if(!q(e,1)){ra(j?i:W,Wi[1],Se,!0);var t=!isNaN(H.y-H.startY),n=H.isDragging,r=n&&(Math.abs(H.x-H.startX)>3||Math.abs(H.y-H.startY)>3),a=ma(e);!r&&t&&(H._vx.reset(),H._vy.reset(),s&&R&&Ni.delayedCall(.08,function(){if(Zi()-_e>300&&!e.defaultPrevented){if(e.target.click)e.target.click();else if(W.createEvent){var t=W.createEvent(`MouseEvents`);t.initMouseEvent(`click`,!0,!0,Fi,1,a.screenX,a.screenY,a.clientX,a.clientY,!1,!1,!1,!1,0,null),e.target.dispatchEvent(t)}}})),H.isDragging=H.isGesturing=H.isPressed=!1,c&&n&&!j&&re.restart(!0),ie&&ye(),m&&n&&m(H),_&&_(H,r)}},Te=function(e){return e.touches&&e.touches.length>1&&(H.isGesturing=!0)&&M(e,H.isDragging)},Ee=function(){return(H.isGesturing=!1)||N(H)},De=function(e){if(!q(e)){var t=de(),n=fe();be((t-pe)*ee,(n-me)*ee,1),pe=t,me=n,c&&re.restart(!0)}},Oe=function(e){if(!q(e)){e=ma(e,s),P&&(V=!0);var t=(e.deltaMode===1?a:e.deltaMode===2?Fi.innerHeight:1)*d;be(e.deltaX*t,e.deltaY*t,0),c&&!j&&re.restart(!0)}},ke=function(e){if(!q(e)){var t=e.clientX,n=e.clientY,r=t-H.x,i=n-H.y;H.x=t,H.y=n,ae=!0,c&&re.restart(!0),(r||i)&&xe(r,i)}},Ae=function(e){H.event=e,D(H)},je=function(e){H.event=e,O(H)},Me=function(e){return q(e)||ma(e,s)&&L(H)};re=H._dc=Ni.delayedCall(l||.25,ve).pause(),H.deltaX=H.deltaY=0,H._vx=pa(0,50,!0),H._vy=pa(0,50,!0),H.scrollX=de,H.scrollY=fe,H.isDragging=H.isGesturing=H.isPressed=!1,Gi(this),H.enable=function(e){return H.isEnabled||(na(he?W:i,`scroll`,oa),r.indexOf(`scroll`)>=0&&na(he?W:i,`scroll`,De,ue,te),r.indexOf(`wheel`)>=0&&na(i,`wheel`,Oe,ue,te),(r.indexOf(`touch`)>=0&&zi||r.indexOf(`pointer`)>=0)&&(na(i,Wi[0],Ce,ue,te),na(W,Wi[2],we),na(W,Wi[3],we),R&&na(i,`click`,K,!0,!0),L&&na(i,`click`,Me),M&&na(W,`gesturestart`,Te),N&&na(W,`gestureend`,Ee),D&&na(i,Bi+`enter`,Ae),O&&na(i,Bi+`leave`,je),k&&na(i,Bi+`move`,ke)),H.isEnabled=!0,H.isDragging=H.isGesturing=H.isPressed=ae=ie=!1,H._vx.reset(),H._vy.reset(),pe=de(),me=fe(),e&&e.type&&Ce(e),F&&F(H)),H},H.disable=function(){H.isEnabled&&(Ji.filter(function(e){return e!==H&&ta(e.target)}).length||ra(he?W:i,`scroll`,oa),H.isPressed&&(H._vx.reset(),H._vy.reset(),ra(j?i:W,Wi[1],Se,!0)),ra(he?W:i,`scroll`,De,te),ra(i,`wheel`,Oe,te),ra(i,Wi[0],Ce,te),ra(W,Wi[2],we),ra(W,Wi[3],we),ra(i,`click`,K,!0),ra(i,`click`,Me),ra(W,`gesturestart`,Te),ra(W,`gestureend`,Ee),ra(i,Bi+`enter`,Ae),ra(i,Bi+`leave`,je),ra(i,Bi+`move`,ke),H.isEnabled=H.isPressed=H.isDragging=!1,I&&I(H))},H.kill=H.revert=function(){H.disable();var e=Ji.indexOf(H);e>=0&&Ji.splice(e,1),Ui===H&&(Ui=0)},Ji.push(H),j&&ta(i)&&(Ui=H),H.enable(f)},Mi(e,[{key:`velocityX`,get:function(){return this._vx.getVelocity()}},{key:`velocityY`,get:function(){return this._vy.getVelocity()}}]),e}(),va.version=`3.15.0`,va.create=function(e){return new va(e)},va.register=_a,va.getAll=function(){return Ji.slice()},va.getById=function(e){return Ji.filter(function(t){return t.vars.id===e})[0]},Ki()&&Ni.registerPlugin(va)})),J,ba,xa,Sa,Ca,wa,Ta,Ea,Da,Oa,ka,Aa,ja,Ma,Na,Pa,Fa,Ia,La,Ra,za,Ba,Va,Ha,Ua,Wa,Ga,Ka,qa,Ja,Ya,Xa,Za,Qa,$a,eo,to,no,ro,io,ao,oo,so,co,lo,uo,fo,po,mo,ho,go,_o,vo,yo,bo,xo,So,Co,wo,To,Eo,Do,Oo,ko,Ao,jo,Mo,No,Po,Fo,Io,Lo,Ro,zo,Bo,Vo,Ho,Uo,Wo,Go,Ko,qo,Jo,Yo,Xo,Zo,Qo,$o,es,ts,ns,rs,is,as,os,ss,cs,ls,us,ds,fs,ps,ms,hs,gs,_s,vs,ys,bs,xs,Ss,Cs,ws,Ts,Es,Ds,Os,ks,As,js,Ms,Ns,Ps,Fs,Is,Ls,Rs,zs,Bs,Vs,Hs,Us,Ws,Gs,Ks,qs,Js,Ys,Xs,Zs,Qs,$s,ec,tc,nc,rc,ic,ac,oc=i((()=>{ya(),$a=1,eo=Date.now,to=eo(),no=0,ro=0,io=function(e,t,n){var r=xo(e)&&(e.substr(0,6)===`clamp(`||e.indexOf(`max`)>-1);return n[`_`+t+`Clamp`]=r,r?e.substr(6,e.length-7):e},ao=function(e,t){return t&&(!xo(e)||e.substr(0,6)!==`clamp(`)?`clamp(`+e+`)`:e},oo=function e(){return ro&&requestAnimationFrame(e)},so=function(){return Ma=1},co=function(){return Ma=0},lo=function(e){return e},uo=function(e){return Math.round(e*1e5)/1e5||0},fo=function(){return typeof window<`u`},po=function(){return J||fo()&&(J=window.gsap)&&J.registerPlugin&&J},mo=function(e){return!!~Ta.indexOf(e)},ho=function(e){return(e===`Height`?Ya:xa[`inner`+e])||Ca[`client`+e]||wa[`client`+e]},go=function(e){return ea(e,`getBoundingClientRect`)||(mo(e)?function(){return Us.width=xa.innerWidth,Us.height=Ya,Us}:function(){return Ko(e)})},_o=function(e,t,n){var r=n.d,i=n.d2,a=n.a;return(a=ea(e,`getBoundingClientRect`))?function(){return a()[r]}:function(){return(t?ho(i):e[`client`+i])||0}},vo=function(e,t){return!t||~Xi.indexOf(e)?go(e):function(){return Us}},yo=function(e,t){var n=t.s,r=t.d2,i=t.d,a=t.a;return Math.max(0,(n=`scroll`+r)&&(a=ea(e,n))?a()-go(e)()[i]:mo(e)?(Ca[n]||wa[n])-ho(r):e[n]-e[`offset`+r])},bo=function(e,t){for(var n=0;n<La.length;n+=3)(!t||~t.indexOf(La[n+1]))&&e(La[n],La[n+1],La[n+2])},xo=function(e){return typeof e==`string`},So=function(e){return typeof e==`function`},Co=function(e){return typeof e==`number`},wo=function(e){return typeof e==`object`},To=function(e,t,n){return e&&e.progress(+!t)&&n&&e.pause()},Eo=function(e,t,n){if(e.enabled){var r=e._ctx?e._ctx.add(function(){return t(e,n)}):t(e,n);r&&r.totalTime&&(e.callbackAnimation=r)}},Do=Math.abs,Oo=`left`,ko=`top`,Ao=`right`,jo=`bottom`,Mo=`width`,No=`height`,Po=`Right`,Fo=`Left`,Io=`Top`,Lo=`Bottom`,Ro=`padding`,zo=`margin`,Bo=`Width`,Vo=`Height`,Ho=`px`,Uo=function(e){return xa.getComputedStyle(e.nodeType===Node.DOCUMENT_NODE?e.scrollingElement:e)},Wo=function(e){var t=Uo(e).position;e.style.position=t===`absolute`||t===`fixed`?t:`relative`},Go=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Ko=function(e,t){var n=t&&Uo(e)[Na]!==`matrix(1, 0, 0, 1, 0, 0)`&&J.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),r=e.getBoundingClientRect?e.getBoundingClientRect():e.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),r},qo=function(e,t){var n=t.d2;return e[`offset`+n]||e[`client`+n]||0},Jo=function(e){var t=[],n=e.labels,r=e.duration(),i;for(i in n)t.push(n[i]/r);return t},Yo=function(e){return function(t){return J.utils.snap(Jo(e),t)}},Xo=function(e){var t=J.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(e,t){return e-t});return n?function(e,r,i){i===void 0&&(i=.001);var a;if(!r)return t(e);if(r>0){for(e-=i,a=0;a<n.length;a++)if(n[a]>=e)return n[a];return n[a-1]}for(a=n.length,e+=i;a--;)if(n[a]<=e)return n[a];return n[0]}:function(n,r,i){i===void 0&&(i=.001);var a=t(n);return!r||Math.abs(a-n)<i||a-n<0==r<0?a:t(r<0?n-e:n+e)}},Zo=function(e){return function(t,n){return Xo(Jo(e))(t,n.direction)}},Qo=function(e,t,n,r){return n.split(`,`).forEach(function(n){return e(t,n,r)})},$o=function(e,t,n,r,i){return e.addEventListener(t,n,{passive:!r,capture:!!i})},es=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},ts=function(e,t,n){n&&=n.wheelHandler,n&&(e(t,`wheel`,n),e(t,`touchmove`,n))},ns={startColor:`green`,endColor:`red`,indent:0,fontSize:`16px`,fontWeight:`normal`},rs={toggleActions:`play`,anticipatePin:0},is={top:0,left:0,center:.5,bottom:1,right:1},as=function(e,t){if(xo(e)){var n=e.indexOf(`=`),r=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf(`%`)>n&&(r*=t/100),e=e.substr(0,n-1)),e=r+(e in is?is[e]*t:~e.indexOf(`%`)?parseFloat(e)*t/100:parseFloat(e)||0)}return e},os=function(e,t,n,r,i,a,o,s){var c=i.startColor,l=i.endColor,u=i.fontSize,d=i.indent,f=i.fontWeight,p=Sa.createElement(`div`),m=mo(n)||ea(n,`pinType`)===`fixed`,h=e.indexOf(`scroller`)!==-1,g=m?wa:n.tagName===`IFRAME`?n.contentDocument.body:n,_=e.indexOf(`start`)!==-1,v=_?c:l,y=`border-color:`+v+`;font-size:`+u+`;color:`+v+`;font-weight:`+f+`;pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;`;return y+=`position:`+((h||s)&&m?`fixed;`:`absolute;`),(h||s||!m)&&(y+=(r===la?Ao:jo)+`:`+(a+parseFloat(d))+`px;`),o&&(y+=`box-sizing:border-box;text-align:left;width:`+o.offsetWidth+`px;`),p._isStart=_,p.setAttribute(`class`,`gsap-marker-`+e+(t?` marker-`+t:``)),p.style.cssText=y,p.innerText=t||t===0?e+`-`+t:e,g.children[0]?g.insertBefore(p,g.children[0]):g.appendChild(p),p._offset=p[`offset`+r.op.d2],ss(p,0,r,_),p},ss=function(e,t,n,r){var i={display:`block`},a=n[r?`os2`:`p2`],o=n[r?`p2`:`os2`];e._isFlipped=r,i[n.a+`Percent`]=r?-100:0,i[n.a]=r?`1px`:0,i[`border`+a+Bo]=1,i[`border`+o+Bo]=0,i[n.p]=t+`px`,J.set(e,i)},cs=[],ls={},ds=function(){return eo()-no>34&&(us||=requestAnimationFrame(Ps))},fs=function(){(!Va||!Va.isPressed||Va.startX>wa.clientWidth)&&(Yi.cache++,Va?us||=requestAnimationFrame(Ps):Ps(),no||vs(`scrollStart`),no=eo())},ps=function(){Wa=xa.innerWidth,Ua=xa.innerHeight},ms=function(e){Yi.cache++,(e===!0||!ja&&!Ba&&!Sa.fullscreenElement&&!Sa.webkitFullscreenElement&&(!Ha||Wa!==xa.innerWidth||Math.abs(xa.innerHeight-Ua)>xa.innerHeight*.25))&&Ea.restart(!0)},hs={},gs=[],_s=function e(){return es(Xs,`scrollEnd`,e)||As(!0)},vs=function(e){return hs[e]&&hs[e].map(function(e){return e()})||gs},ys=[],bs=function(e){for(var t=0;t<ys.length;t+=5)(!e||ys[t+4]&&ys[t+4].query===e)&&(ys[t].style.cssText=ys[t+1],ys[t].getBBox&&ys[t].setAttribute(`transform`,ys[t+2]||``),ys[t+3].uncache=1)},xs=function(){return Yi.forEach(function(e){return So(e)&&++e.cacheID&&(e.rec=e())})},Ss=function(e,t){var n;for(Pa=0;Pa<cs.length;Pa++)n=cs[Pa],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));Xa=!0,t&&bs(t),t||vs(`revert`)},Cs=function(e,t){Yi.cache++,(t||!ws)&&Yi.forEach(function(e){return So(e)&&e.cacheID++&&(e.rec=0)}),xo(e)&&(xa.history.scrollRestoration=qa=e)},Ts=0,Ds=function(){if(Es!==Ts){var e=Es=Ts;requestAnimationFrame(function(){return e===Ts&&As(!0)})}},Os=function(){wa.appendChild(Ja),Ya=!Va&&Ja.offsetHeight||xa.innerHeight,wa.removeChild(Ja)},ks=function(e){return Da(`.gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end`).forEach(function(t){return t.style.display=e?`none`:`block`})},As=function(e,t){if(Ca=Sa.documentElement,wa=Sa.body,Ta=[xa,Sa,Ca,wa],no&&!e&&!Xa)$o(Xs,`scrollEnd`,_s);else{Os(),ws=Xs.isRefreshing=!0,Xa||xs();var n=vs(`refreshInit`);Ra&&Xs.sort(),t||Ss(),Yi.forEach(function(e){So(e)&&(e.smooth&&(e.target.style.scrollBehavior=`auto`),e(0))}),cs.slice(0).forEach(function(e){return e.refresh()}),Xa=!1,cs.forEach(function(e){if(e._subPinOffset&&e.pin){var t=e.vars.horizontal?`offsetWidth`:`offsetHeight`,n=e.pin[t];e.revert(!0,1),e.adjustPinSpacing(e.pin[t]-n),e.refresh()}}),Za=1,ks(!0),cs.forEach(function(e){var t=yo(e.scroller,e._dir),n=e.vars.end===`max`||e._endClamp&&e.end>t,r=e._startClamp&&e.start>=t;(n||r)&&e.setPositions(r?t-1:e.start,n?Math.max(r?t:e.start+1,t):e.end,!0)}),ks(!1),Za=0,n.forEach(function(e){return e&&e.render&&e.render(-1)}),Yi.forEach(function(e){So(e)&&(e.smooth&&requestAnimationFrame(function(){return e.target.style.scrollBehavior=`smooth`}),e.rec&&e(e.rec))}),Cs(qa,1),Ea.pause(),Ts++,ws=2,Ps(2),cs.forEach(function(e){return So(e.vars.onRefresh)&&e.vars.onRefresh(e)}),ws=Xs.isRefreshing=!1,vs(`refresh`)}},js=0,Ms=1,Ps=function(e){if(e===2||!ws&&!Xa){Xs.isUpdating=!0,Ns&&Ns.update(0);var t=cs.length,n=eo(),r=n-to>=50,i=t&&cs[0].scroll();if(Ms=js>i?-1:1,ws||(js=i),r&&(no&&!Ma&&n-no>200&&(no=0,vs(`scrollEnd`)),ka=to,to=n),Ms<0){for(Pa=t;Pa-->0;)cs[Pa]&&cs[Pa].update(0,r);Ms=1}else for(Pa=0;Pa<t;Pa++)cs[Pa]&&cs[Pa].update(0,r);Xs.isUpdating=!1}us=0},Fs=[Oo,ko,jo,Ao,zo+Lo,zo+Po,zo+Io,zo+Fo,`display`,`flexShrink`,`float`,`zIndex`,`gridColumnStart`,`gridColumnEnd`,`gridRowStart`,`gridRowEnd`,`gridArea`,`justifySelf`,`alignSelf`,`placeSelf`,`order`],Is=Fs.concat([Mo,No,`boxSizing`,`max`+Bo,`max`+Vo,`position`,zo,Ro,Ro+Io,Ro+Po,Ro+Lo,Ro+Fo]),Ls=function(e,t,n){Bs(n);var r=e._gsap;if(r.spacerIsNative)Bs(r.spacerState);else if(e._gsap.swappedIn){var i=t.parentNode;i&&(i.insertBefore(e,t),i.removeChild(t))}e._gsap.swappedIn=!1},Rs=function(e,t,n,r){if(!e._gsap.swappedIn){for(var i=Fs.length,a=t.style,o=e.style,s;i--;)s=Fs[i],a[s]=n[s];a.position=n.position===`absolute`?`absolute`:`relative`,n.display===`inline`&&(a.display=`inline-block`),o[jo]=o[Ao]=`auto`,a.flexBasis=n.flexBasis||`auto`,a.overflow=`visible`,a.boxSizing=`border-box`,a[Mo]=qo(e,ca)+Ho,a[No]=qo(e,la)+Ho,a[Ro]=o[zo]=o[ko]=o[Oo]=`0`,Bs(r),o[Mo]=o[`max`+Bo]=n[Mo],o[No]=o[`max`+Vo]=n[No],o[Ro]=n[Ro],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},zs=/([A-Z])/g,Bs=function(e){if(e){var t=e.t.style,n=e.length,r=0,i,a;for((e.t._gsap||J.core.getCache(e.t)).uncache=1;r<n;r+=2)a=e[r+1],i=e[r],a?t[i]=a:t[i]&&t.removeProperty(i.replace(zs,`-$1`).toLowerCase())}},Vs=function(e){for(var t=Is.length,n=e.style,r=[],i=0;i<t;i++)r.push(Is[i],n[Is[i]]);return r.t=e,r},Hs=function(e,t,n){for(var r=[],i=e.length,a=n?8:0,o;a<i;a+=2)o=e[a],r.push(o,o in t?t[o]:e[a+1]);return r.t=e.t,r},Us={left:0,top:0},Ws=function(e,t,n,r,i,a,o,s,c,l,u,d,f,p){So(e)&&(e=e(s)),xo(e)&&e.substr(0,3)===`max`&&(e=d+(e.charAt(4)===`=`?as(`0`+e.substr(3),n):0));var m=f?f.time():0,h,g,_;if(f&&f.seek(0),isNaN(e)||(e=+e),Co(e))f&&(e=J.utils.mapRange(f.scrollTrigger.start,f.scrollTrigger.end,0,d,e)),o&&ss(o,n,r,!0);else{So(t)&&(t=t(s));var v=(e||`0`).split(` `),y,b,x,S;_=ua(t,s)||wa,y=Ko(_)||{},(!y||!y.left&&!y.top)&&Uo(_).display===`none`&&(S=_.style.display,_.style.display=`block`,y=Ko(_),S?_.style.display=S:_.style.removeProperty(`display`)),b=as(v[0],y[r.d]),x=as(v[1]||`0`,n),e=y[r.p]-c[r.p]-l+b+i-x,o&&ss(o,x,r,n-x<20||o._isStart&&x>20),n-=n-x}if(p&&(s[p]=e||-.001,e<0&&(e=0)),a){var C=e+n,w=a._isStart;h=`scroll`+r.d2,ss(a,C,r,w&&C>20||!w&&(u?Math.max(wa[h],Ca[h]):a.parentNode[h])<=C+1),u&&(c=Ko(o),u&&(a.style[r.op.p]=c[r.op.p]-r.op.m-a._offset+Ho))}return f&&_&&(h=Ko(_),f.seek(d),g=Ko(_),f._caScrollDist=h[r.p]-g[r.p],e=e/f._caScrollDist*d),f&&f.seek(m),f?e:Math.round(e)},Gs=/(webkit|moz|length|cssText|inset)/i,Ks=function(e,t,n,r){if(e.parentNode!==t){var i=e.style,a,o;if(t===wa){for(a in e._stOrig=i.cssText,o=Uo(e),o)!+a&&!Gs.test(a)&&o[a]&&typeof i[a]==`string`&&a!==`0`&&(i[a]=o[a]);i.top=n,i.left=r}else i.cssText=e._stOrig;J.core.getCache(e).uncache=1,t.appendChild(e)}},qs=function(e,t,n){var r=t,i=r;return function(t){var a=Math.round(e());return a!==r&&a!==i&&Math.abs(a-r)>3&&Math.abs(a-i)>3&&(t=a,n&&n()),i=r,r=Math.round(t),r}},Js=function(e,t,n){var r={};r[t.p]=`+=`+n,J.set(e,r)},Ys=function(e,t){var n=fa(e,t),r=`_scroll`+t.p2,i=function t(i,a,o,s,c){var l=t.tween,u=a.onComplete,d={};o||=n();var f=qs(n,o,function(){l.kill(),t.tween=0});return c=s&&c||0,s||=i-o,l&&l.kill(),a[r]=i,a.inherit=!1,a.modifiers=d,d[r]=function(){return f(o+s*l.ratio+c*l.ratio*l.ratio)},a.onUpdate=function(){Yi.cache++,t.tween&&Ps()},a.onComplete=function(){t.tween=0,u&&u.call(l)},l=t.tween=J.to(e,a),l};return e[r]=n,n.wheelHandler=function(){return i.tween&&i.tween.kill()&&(i.tween=0)},$o(e,`wheel`,n.wheelHandler),Xs.isTouch&&$o(e,`touchmove`,n.wheelHandler),i},Xs=function(){function e(t,n){ba||e.register(J)||console.warn(`Please gsap.registerPlugin(ScrollTrigger)`),Ka(this),this.init(t,n)}var t=e.prototype;return t.init=function(t,n){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!ro)this.update=this.refresh=this.kill=lo;else{t=Go(xo(t)||Co(t)||t.nodeType?{trigger:t}:t,rs);var r=t,i=r.onUpdate,a=r.toggleClass,o=r.id,s=r.onToggle,c=r.onRefresh,l=r.scrub,u=r.trigger,d=r.pin,f=r.pinSpacing,p=r.invalidateOnRefresh,m=r.anticipatePin,h=r.onScrubComplete,g=r.onSnapComplete,_=r.once,v=r.snap,y=r.pinReparent,b=r.pinSpacer,x=r.containerAnimation,S=r.fastScrollEnd,C=r.preventOverlaps,w=t.horizontal||t.containerAnimation&&t.horizontal!==!1?ca:la,T=!l&&l!==0,E=ua(t.scroller||xa),D=J.core.getCache(E),O=mo(E),k=(`pinType`in t?t.pinType:ea(E,`pinType`)||O&&`fixed`)===`fixed`,A=[t.onEnter,t.onLeave,t.onEnterBack,t.onLeaveBack],j=T&&t.toggleActions.split(` `),M=`markers`in t?t.markers:rs.markers,N=O?0:parseFloat(Uo(E)[`border`+w.p2+Bo])||0,P=this,F=t.onRefreshInit&&function(){return t.onRefreshInit(P)},I=_o(E,O,w),L=vo(E,O),ee=0,te=0,R=0,z=fa(E,w),ne,B,re,ie,ae,V,oe,se,H,ce,le,ue,de,fe,pe,me,U,he,W,ge,G,_e,K,q,ve,ye,be,xe,Se,Ce,we,Te,Ee,De,Oe,ke,Ae,je,Me;if(P._startClamp=P._endClamp=!1,P._dir=w,m*=45,P.scroller=E,P.scroll=x?x.time.bind(x):z,ie=z(),P.vars=t,n||=t.animation,`refreshPriority`in t&&(Ra=1,t.refreshPriority===-9999&&(Ns=P)),D.tweenScroll=D.tweenScroll||{top:Ys(E,la),left:Ys(E,ca)},P.tweenTo=ne=D.tweenScroll[w.p],P.scrubDuration=function(e){Ee=Co(e)&&e,Ee?Te?Te.duration(e):Te=J.to(n,{ease:`expo`,totalProgress:`+=0`,inherit:!1,duration:Ee,paused:!0,onComplete:function(){return h&&h(P)}}):(Te&&Te.progress(1).kill(),Te=0)},n&&(n.vars.lazy=!1,n._initted&&!P.isReverted||n.vars.immediateRender!==!1&&t.immediateRender!==!1&&n.duration()&&n.render(0,!0,!0),P.animation=n.pause(),n.scrollTrigger=P,P.scrubDuration(l),Ce=0,o||=n.vars.id),v&&((!wo(v)||v.push)&&(v={snapTo:v}),`scrollBehavior`in wa.style&&J.set(O?[wa,Ca]:E,{scrollBehavior:`auto`}),Yi.forEach(function(e){return So(e)&&e.target===(O?Sa.scrollingElement||Ca:E)&&(e.smooth=!1)}),re=So(v.snapTo)?v.snapTo:v.snapTo===`labels`?Yo(n):v.snapTo===`labelsDirectional`?Zo(n):v.directional===!1?J.utils.snap(v.snapTo):function(e,t){return Xo(v.snapTo)(e,eo()-te<500?0:t.direction)},De=v.duration||{min:.1,max:2},De=wo(De)?Oa(De.min,De.max):Oa(De,De),Oe=J.delayedCall(v.delay||Ee/2||.1,function(){var e=z(),t=eo()-te<500,r=ne.tween;if((t||Math.abs(P.getVelocity())<10)&&!r&&!Ma&&ee!==e){var i=(e-V)/fe,a=n&&!T?n.totalProgress():i,o=t?0:(a-we)/(eo()-ka)*1e3||0,s=J.utils.clamp(-i,1-i,Do(o/2)*o/.185),c=i+(v.inertia===!1?0:s),l,u,d=v,f=d.onStart,p=d.onInterrupt,m=d.onComplete;if(l=re(c,P),Co(l)||(l=c),u=Math.max(0,Math.round(V+l*fe)),e<=oe&&e>=V&&u!==e){if(r&&!r._initted&&r.data<=Do(u-e))return;v.inertia===!1&&(s=l-i),ne(u,{duration:De(Do(Math.max(Do(c-a),Do(l-a))*.185/o/.05||0)),ease:v.ease||`power3`,data:Do(u-e),onInterrupt:function(){return Oe.restart(!0)&&p&&Eo(P,p)},onComplete:function(){P.update(),ee=z(),n&&!T&&(Te?Te.resetTo(`totalProgress`,l,n._tTime/n._tDur):n.progress(l)),Ce=we=n&&!T?n.totalProgress():P.progress,g&&g(P),m&&Eo(P,m)}},e,s*fe,u-e-s*fe),f&&Eo(P,f,ne.tween)}}else P.isActive&&ee!==e&&Oe.restart(!0)}).pause()),o&&(ls[o]=P),u=P.trigger=ua(u||d!==!0&&d),Me=u&&u._gsap&&u._gsap.stRevert,Me&&=Me(P),d=d===!0?u:ua(d),xo(a)&&(a={targets:u,className:a}),d&&(f===!1||f===zo||(f=!f&&d.parentNode&&d.parentNode.style&&Uo(d.parentNode).display===`flex`?!1:Ro),P.pin=d,B=J.core.getCache(d),B.spacer?pe=B.pinState:(b&&(b=ua(b),b&&!b.nodeType&&(b=b.current||b.nativeElement),B.spacerIsNative=!!b,b&&(B.spacerState=Vs(b))),B.spacer=he=b||Sa.createElement(`div`),he.classList.add(`pin-spacer`),o&&he.classList.add(`pin-spacer-`+o),B.pinState=pe=Vs(d)),t.force3D!==!1&&J.set(d,{force3D:!0}),P.spacer=he=B.spacer,Se=Uo(d),q=Se[f+w.os2],ge=J.getProperty(d),G=J.quickSetter(d,w.a,Ho),Rs(d,he,Se),U=Vs(d)),M){ue=wo(M)?Go(M,ns):ns,ce=os(`scroller-start`,o,E,w,ue,0),le=os(`scroller-end`,o,E,w,ue,0,ce),W=ce[`offset`+w.op.d2];var Ne=ua(ea(E,`content`)||E);se=this.markerStart=os(`start`,o,Ne,w,ue,W,0,x),H=this.markerEnd=os(`end`,o,Ne,w,ue,W,0,x),x&&(je=J.quickSetter([se,H],w.a,Ho)),!k&&!(Xi.length&&ea(E,`fixedMarkers`)===!0)&&(Wo(O?wa:E),J.set([ce,le],{force3D:!0}),ye=J.quickSetter(ce,w.a,Ho),xe=J.quickSetter(le,w.a,Ho))}if(x){var Pe=x.vars.onUpdate,Fe=x.vars.onUpdateParams;x.eventCallback(`onUpdate`,function(){P.update(0,0,1),Pe&&Pe.apply(x,Fe||[])})}if(P.previous=function(){return cs[cs.indexOf(P)-1]},P.next=function(){return cs[cs.indexOf(P)+1]},P.revert=function(e,t){if(!t)return P.kill(!0);var r=e!==!1||!P.enabled,i=ja;r!==P.isReverted&&(r&&(ke=Math.max(z(),P.scroll.rec||0),R=P.progress,Ae=n&&n.progress()),se&&[se,H,ce,le].forEach(function(e){return e.style.display=r?`none`:`block`}),r&&(ja=P,P.update(r)),d&&(!y||!P.isActive)&&(r?Ls(d,he,pe):Rs(d,he,Uo(d),ve)),r||P.update(r),ja=i,P.isReverted=r)},P.refresh=function(r,i,a,o){if(!ja&&P.enabled||i){if(d&&r&&no)$o(e,`scrollEnd`,_s);else{!ws&&F&&F(P),ja=P,ne.tween&&!a&&(ne.tween.kill(),ne.tween=0),Te&&Te.pause(),p&&n&&(n.revert({kill:!1}).invalidate(),n.getChildren?n.getChildren(!0,!0,!1).forEach(function(e){return e.vars.immediateRender&&e.render(0,!0,!0)}):n.vars.immediateRender&&n.render(0,!0,!0)),P.isReverted||P.revert(!0,!0),P._subPinOffset=!1;var s=I(),l=L(),m=x?x.duration():yo(E,w),h=fe<=.01||!fe,g=0,_=o||0,v=wo(a)?a.end:t.end,b=t.endTrigger||u,S=wo(a)?a.start:t.start||(t.start===0||!u?0:d?`0 0`:`0 100%`),C=P.pinnedContainer=t.pinnedContainer&&ua(t.pinnedContainer,P),D=u&&Math.max(0,cs.indexOf(P))||0,A=D,j,B,re,ue,W,G,q,ye,xe,Se,Ce,we,Ee;for(M&&wo(a)&&(we=J.getProperty(ce,w.p),Ee=J.getProperty(le,w.p));A-->0;)G=cs[A],G.end||G.refresh(0,1)||(ja=P),q=G.pin,q&&(q===u||q===d||q===C)&&!G.isReverted&&(Se||=[],Se.unshift(G),G.revert(!0,!0)),G!==cs[A]&&(D--,A--);for(So(S)&&(S=S(P)),S=io(S,`start`,P),V=Ws(S,u,s,w,z(),se,ce,P,l,N,k,m,x,P._startClamp&&`_startClamp`)||(d?-.001:0),So(v)&&(v=v(P)),xo(v)&&!v.indexOf(`+=`)&&(~v.indexOf(` `)?v=(xo(S)?S.split(` `)[0]:``)+v:(g=as(v.substr(2),s),v=xo(S)?S:(x?J.utils.mapRange(0,x.duration(),x.scrollTrigger.start,x.scrollTrigger.end,V):V)+g,b=u)),v=io(v,`end`,P),oe=Math.max(V,Ws(v||(b?`100% 0`:m),b,s,w,z()+g,H,le,P,l,N,k,m,x,P._endClamp&&`_endClamp`))||-.001,g=0,A=D;A--;)G=cs[A]||{},q=G.pin,q&&G.start-G._pinPush<=V&&!x&&G.end>0&&(j=G.end-(P._startClamp?Math.max(0,G.start):G.start),(q===u&&G.start-G._pinPush<V||q===C)&&isNaN(S)&&(g+=j*(1-G.progress)),q===d&&(_+=j));if(V+=g,oe+=g,P._startClamp&&(P._startClamp+=g),P._endClamp&&!ws&&(P._endClamp=oe||-.001,oe=Math.min(oe,yo(E,w))),fe=oe-V||(V-=.01)&&.001,h&&(R=J.utils.clamp(0,1,J.utils.normalize(V,oe,ke))),P._pinPush=_,se&&g&&(j={},j[w.a]=`+=`+g,C&&(j[w.p]=`-=`+z()),J.set([se,H],j)),d&&!(Za&&P.end>=yo(E,w)))j=Uo(d),ue=w===la,re=z(),_e=parseFloat(ge(w.a))+_,!m&&oe>1&&(Ce=(O?Sa.scrollingElement||Ca:E).style,Ce={style:Ce,value:Ce[`overflow`+w.a.toUpperCase()]},O&&Uo(wa)[`overflow`+w.a.toUpperCase()]!==`scroll`&&(Ce.style[`overflow`+w.a.toUpperCase()]=`scroll`)),Rs(d,he,j),U=Vs(d),B=Ko(d,!0),ye=k&&fa(E,ue?ca:la)(),f?(ve=[f+w.os2,fe+_+Ho],ve.t=he,A=f===Ro?qo(d,w)+fe+_:0,A&&(ve.push(w.d,A+Ho),he.style.flexBasis!==`auto`&&(he.style.flexBasis=A+Ho)),Bs(ve),C&&cs.forEach(function(e){e.pin===C&&e.vars.pinSpacing!==!1&&(e._subPinOffset=!0)}),k&&z(ke)):(A=qo(d,w),A&&he.style.flexBasis!==`auto`&&(he.style.flexBasis=A+Ho)),k&&(W={top:B.top+(ue?re-V:ye)+Ho,left:B.left+(ue?ye:re-V)+Ho,boxSizing:`border-box`,position:`fixed`},W[Mo]=W[`max`+Bo]=Math.ceil(B.width)+Ho,W[No]=W[`max`+Vo]=Math.ceil(B.height)+Ho,W[zo]=W[zo+Io]=W[zo+Po]=W[zo+Lo]=W[zo+Fo]=`0`,W[Ro]=j[Ro],W[Ro+Io]=j[Ro+Io],W[Ro+Po]=j[Ro+Po],W[Ro+Lo]=j[Ro+Lo],W[Ro+Fo]=j[Ro+Fo],me=Hs(pe,W,y),ws&&z(0)),n?(xe=n._initted,za(1),n.render(n.duration(),!0,!0),K=ge(w.a)-_e+fe+_,be=Math.abs(fe-K)>1,k&&be&&me.splice(me.length-2,2),n.render(0,!0,!0),xe||n.invalidate(!0),n.parent||n.totalTime(n.totalTime()),za(0)):K=fe,Ce&&(Ce.value?Ce.style[`overflow`+w.a.toUpperCase()]=Ce.value:Ce.style.removeProperty(`overflow-`+w.a));else if(u&&z()&&!x)for(B=u.parentNode;B&&B!==wa;)B._pinOffset&&(V-=B._pinOffset,oe-=B._pinOffset),B=B.parentNode;Se&&Se.forEach(function(e){return e.revert(!1,!0)}),P.start=V,P.end=oe,ie=ae=ws?ke:z(),!x&&!ws&&(ie<ke&&z(ke),P.scroll.rec=0),P.revert(!1,!0),te=eo(),Oe&&(ee=-1,Oe.restart(!0)),ja=0,n&&T&&(n._initted||Ae)&&n.progress()!==Ae&&n.progress(Ae||0,!0).render(n.time(),!0,!0),(h||R!==P.progress||x||p||n&&!n._initted)&&(n&&!T&&(n._initted||R||n.vars.immediateRender!==!1)&&n.totalProgress(x&&V<-.001&&!R?J.utils.normalize(V,oe,0):R,!0),P.progress=h||(ie-V)/fe===R?0:R),d&&f&&(he._pinOffset=Math.round(P.progress*K)),Te&&Te.invalidate(),isNaN(we)||(we-=J.getProperty(ce,w.p),Ee-=J.getProperty(le,w.p),Js(ce,w,we),Js(se,w,we-(o||0)),Js(le,w,Ee),Js(H,w,Ee-(o||0))),h&&!ws&&P.update(),c&&!ws&&!de&&(de=!0,c(P),de=!1)}}},P.getVelocity=function(){return(z()-ae)/(eo()-ka)*1e3||0},P.endAnimation=function(){To(P.callbackAnimation),n&&(Te?Te.progress(1):n.paused()?T||To(n,P.direction<0,1):To(n,n.reversed()))},P.labelToScroll=function(e){return n&&n.labels&&(V||P.refresh()||V)+n.labels[e]/n.duration()*fe||0},P.getTrailing=function(e){var t=cs.indexOf(P),n=P.direction>0?cs.slice(0,t).reverse():cs.slice(t+1);return(xo(e)?n.filter(function(t){return t.vars.preventOverlaps===e}):n).filter(function(e){return P.direction>0?e.end<=V:e.start>=oe})},P.update=function(e,t,r){if(!x||r||e){var o=ws===!0?ke:P.scroll(),c=e?0:(o-V)/fe,u=c<0?0:c>1?1:c||0,p=P.progress,h,g,b,D,O,M,N,F;if(t&&(ae=ie,ie=x?z():o,v&&(we=Ce,Ce=n&&!T?n.totalProgress():u)),m&&d&&!ja&&!$a&&no&&(!u&&V<o+(o-ae)/(eo()-ka)*m?u=1e-4:u===1&&oe>o+(o-ae)/(eo()-ka)*m&&(u=.9999)),u!==p&&P.enabled){if(h=P.isActive=!!u&&u<1,g=!!p&&p<1,M=h!==g,O=M||!!u!=!!p,P.direction=u>p?1:-1,P.progress=u,O&&!ja&&(b=u&&!p?0:u===1?1:p===1?2:3,T&&(D=!M&&j[b+1]!==`none`&&j[b+1]||j[b],F=n&&(D===`complete`||D===`reset`||D in n))),C&&(M||F)&&(F||l||!n)&&(So(C)?C(P):P.getTrailing(C).forEach(function(e){return e.endAnimation()})),T||(Te&&!ja&&!$a?(Te._dp._time-Te._start!==Te._time&&Te.render(Te._dp._time-Te._start),Te.resetTo?Te.resetTo(`totalProgress`,u,n._tTime/n._tDur):(Te.vars.totalProgress=u,Te.invalidate().restart())):n&&n.totalProgress(u,!!(ja&&(te||e)))),d){if(e&&f&&(he.style[f+w.os2]=q),!k)G(uo(_e+K*u));else if(O){if(N=!e&&u>p&&oe+1>o&&o+1>=yo(E,w),y){if(!e&&(h||N)){var I=Ko(d,!0),L=o-V;Ks(d,wa,I.top+(w===la?L:0)+Ho,I.left+(w===la?0:L)+Ho)}else Ks(d,he)}Bs(h||N?me:U),be&&u<1&&h||G(_e+(u===1&&!N?K:0))}}v&&!ne.tween&&!ja&&!$a&&Oe.restart(!0),a&&(M||_&&u&&(u<1||!Qa))&&Da(a.targets).forEach(function(e){return e.classList[h||_?`add`:`remove`](a.className)}),i&&!T&&!e&&i(P),O&&!ja?(T&&(F&&(D===`complete`?n.pause().totalProgress(1):D===`reset`?n.restart(!0).pause():D===`restart`?n.restart(!0):n[D]()),i&&i(P)),(M||!Qa)&&(s&&M&&Eo(P,s),A[b]&&Eo(P,A[b]),_&&(u===1?P.kill(!1,1):A[b]=0),M||(b=u===1?1:3,A[b]&&Eo(P,A[b]))),S&&!h&&Math.abs(P.getVelocity())>(Co(S)?S:2500)&&(To(P.callbackAnimation),Te?Te.progress(1):To(n,D===`reverse`?1:!u,1))):T&&i&&!ja&&i(P)}if(xe){var ee=x?o/x.duration()*(x._caScrollDist||0):o;ye(ee+ +!!ce._isFlipped),xe(ee)}je&&je(-o/x.duration()*(x._caScrollDist||0))}},P.enable=function(t,n){P.enabled||(P.enabled=!0,$o(E,`resize`,ms),O||$o(E,`scroll`,fs),F&&$o(e,`refreshInit`,F),t!==!1&&(P.progress=R=0,ie=ae=ee=z()),n!==!1&&P.refresh())},P.getTween=function(e){return e&&ne?ne.tween:Te},P.setPositions=function(e,t,n,r){if(x){var i=x.scrollTrigger,a=x.duration(),o=i.end-i.start;e=i.start+o*e/a,t=i.start+o*t/a}P.refresh(!1,!1,{start:ao(e,n&&!!P._startClamp),end:ao(t,n&&!!P._endClamp)},r),P.update()},P.adjustPinSpacing=function(e){if(ve&&e){var t=ve.indexOf(w.d)+1;ve[t]=parseFloat(ve[t])+e+Ho,ve[1]=parseFloat(ve[1])+e+Ho,Bs(ve)}},P.disable=function(t,n){if(t!==!1&&P.revert(!0,!0),P.enabled&&(P.enabled=P.isActive=!1,n||Te&&Te.pause(),ke=0,B&&(B.uncache=1),F&&es(e,`refreshInit`,F),Oe&&(Oe.pause(),ne.tween&&ne.tween.kill()&&(ne.tween=0)),!O)){for(var r=cs.length;r--;)if(cs[r].scroller===E&&cs[r]!==P)return;es(E,`resize`,ms),O||es(E,`scroll`,fs)}},P.kill=function(e,r){P.disable(e,r),Te&&!r&&Te.kill(),o&&delete ls[o];var i=cs.indexOf(P);i>=0&&cs.splice(i,1),i===Pa&&Ms>0&&Pa--,i=0,cs.forEach(function(e){return e.scroller===P.scroller&&(i=1)}),i||ws||(P.scroll.rec=0),n&&(n.scrollTrigger=null,e&&n.revert({kill:!1}),r||n.kill()),se&&[se,H,ce,le].forEach(function(e){return e.parentNode&&e.parentNode.removeChild(e)}),Ns===P&&(Ns=0),d&&(B&&(B.uncache=1),i=0,cs.forEach(function(e){return e.pin===d&&i++}),i||(B.spacer=0)),t.onKill&&t.onKill(P)},cs.push(P),P.enable(!1,!1),Me&&Me(P),n&&n.add&&!fe){var Ie=P.update;P.update=function(){P.update=Ie,Yi.cache++,V||oe||P.refresh()},J.delayedCall(.01,P.update),fe=.01,V=oe=0}else P.refresh();d&&Ds()}},e.register=function(t){return ba||=(J=t||po(),fo()&&window.document&&e.enable(),ro),ba},e.defaults=function(e){if(e)for(var t in e)rs[t]=e[t];return rs},e.disable=function(e,t){ro=0,cs.forEach(function(n){return n[t?`kill`:`disable`](e)}),es(xa,`wheel`,fs),es(Sa,`scroll`,fs),clearInterval(Aa),es(Sa,`touchcancel`,lo),es(wa,`touchstart`,lo),Qo(es,Sa,`pointerdown,touchstart,mousedown`,so),Qo(es,Sa,`pointerup,touchend,mouseup`,co),Ea.kill(),bo(es);for(var n=0;n<Yi.length;n+=3)ts(es,Yi[n],Yi[n+1]),ts(es,Yi[n],Yi[n+2])},e.enable=function(){if(xa=window,Sa=document,Ca=Sa.documentElement,wa=Sa.body,J){if(Da=J.utils.toArray,Oa=J.utils.clamp,Ka=J.core.context||lo,za=J.core.suppressOverwrites||lo,qa=xa.history.scrollRestoration||`auto`,js=xa.pageYOffset||0,J.core.globals(`ScrollTrigger`,e),wa){ro=1,Ja=document.createElement(`div`),Ja.style.height=`100vh`,Ja.style.position=`absolute`,Os(),oo(),va.register(J),e.isTouch=va.isTouch,Ga=va.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Ha=va.isTouch===1,$o(xa,`wheel`,fs),Ta=[xa,Sa,Ca,wa],J.matchMedia?(e.matchMedia=function(e){var t=J.matchMedia(),n;for(n in e)t.add(n,e[n]);return t},J.addEventListener(`matchMediaInit`,function(){xs(),Ss()}),J.addEventListener(`matchMediaRevert`,function(){return bs()}),J.addEventListener(`matchMedia`,function(){As(0,1),vs(`matchMedia`)}),J.matchMedia().add(`(orientation: portrait)`,function(){return ps(),ps})):console.warn(`Requires GSAP 3.11.0 or later`),ps(),$o(Sa,`scroll`,fs);var t=wa.hasAttribute(`style`),n=wa.style,r=n.borderTopStyle,i=J.core.Animation.prototype,a,o;for(i.revert||Object.defineProperty(i,"revert",{value:function(){return this.time(-.01,!0)}}),n.borderTopStyle=`solid`,a=Ko(wa),la.m=Math.round(a.top+la.sc())||0,ca.m=Math.round(a.left+ca.sc())||0,r?n.borderTopStyle=r:n.removeProperty(`border-top-style`),t||(wa.setAttribute(`style`,``),wa.removeAttribute(`style`)),Aa=setInterval(ds,250),J.delayedCall(.5,function(){return $a=0}),$o(Sa,`touchcancel`,lo),$o(wa,`touchstart`,lo),Qo($o,Sa,`pointerdown,touchstart,mousedown`,so),Qo($o,Sa,`pointerup,touchend,mouseup`,co),Na=J.utils.checkPrefix(`transform`),Is.push(Na),ba=eo(),Ea=J.delayedCall(.2,As).pause(),La=[Sa,`visibilitychange`,function(){var e=xa.innerWidth,t=xa.innerHeight;Sa.hidden?(Fa=e,Ia=t):(Fa!==e||Ia!==t)&&ms()},Sa,`DOMContentLoaded`,As,xa,`load`,As,xa,`resize`,ms],bo($o),cs.forEach(function(e){return e.enable(0,1)}),o=0;o<Yi.length;o+=3)ts(es,Yi[o],Yi[o+1]),ts(es,Yi[o],Yi[o+2])}else Sa&&Sa.addEventListener(`DOMContentLoaded`,function t(){e.enable(),Sa.removeEventListener(`DOMContentLoaded`,t)})}},e.config=function(t){`limitCallbacks`in t&&(Qa=!!t.limitCallbacks);var n=t.syncInterval;n&&clearInterval(Aa)||(Aa=n)&&setInterval(ds,n),`ignoreMobileResize`in t&&(Ha=e.isTouch===1&&t.ignoreMobileResize),`autoRefreshEvents`in t&&(bo(es)||bo($o,t.autoRefreshEvents||`none`),Ba=(t.autoRefreshEvents+``).indexOf(`resize`)===-1)},e.scrollerProxy=function(e,t){var n=ua(e),r=Yi.indexOf(n),i=mo(n);~r&&Yi.splice(r,i?6:2),t&&(i?Xi.unshift(xa,t,wa,t,Ca,t):Xi.unshift(n,t))},e.clearMatchMedia=function(e){cs.forEach(function(t){return t._ctx&&t._ctx.query===e&&t._ctx.kill(!0,!0)})},e.isInViewport=function(e,t,n){var r=(xo(e)?ua(e):e).getBoundingClientRect(),i=r[n?Mo:No]*t||0;return n?r.right-i>0&&r.left+i<xa.innerWidth:r.bottom-i>0&&r.top+i<xa.innerHeight},e.positionInViewport=function(e,t,n){xo(e)&&(e=ua(e));var r=e.getBoundingClientRect(),i=r[n?Mo:No],a=t==null?i/2:t in is?is[t]*i:~t.indexOf(`%`)?parseFloat(t)*i/100:parseFloat(t)||0;return n?(r.left+a)/xa.innerWidth:(r.top+a)/xa.innerHeight},e.killAll=function(e){if(cs.slice(0).forEach(function(e){return e.vars.id!==`ScrollSmoother`&&e.kill()}),e!==!0){var t=hs.killAll||[];hs={},t.forEach(function(e){return e()})}},e}(),Xs.version=`3.15.0`,Xs.saveStyles=function(e){return e?Da(e).forEach(function(e){if(e&&e.style){var t=ys.indexOf(e);t>=0&&ys.splice(t,5),ys.push(e,e.style.cssText,e.getBBox&&e.getAttribute(`transform`),J.core.getCache(e),Ka())}}):ys},Xs.revert=function(e,t){return Ss(!e,t)},Xs.create=function(e,t){return new Xs(e,t)},Xs.refresh=function(e){return e?ms(!0):(ba||Xs.register())&&As(!0)},Xs.update=function(e){return++Yi.cache&&Ps(e===!0?2:0)},Xs.clearScrollMemory=Cs,Xs.maxScroll=function(e,t){return yo(e,t?ca:la)},Xs.getScrollFunc=function(e,t){return fa(ua(e),t?ca:la)},Xs.getById=function(e){return ls[e]},Xs.getAll=function(){return cs.filter(function(e){return e.vars.id!==`ScrollSmoother`})},Xs.isScrolling=function(){return!!no},Xs.snapDirectional=Xo,Xs.addEventListener=function(e,t){var n=hs[e]||(hs[e]=[]);~n.indexOf(t)||n.push(t)},Xs.removeEventListener=function(e,t){var n=hs[e],r=n&&n.indexOf(t);r>=0&&n.splice(r,1)},Xs.batch=function(e,t){var n=[],r={},i=t.interval||.016,a=t.batchMax||1e9,o=function(e,t){var n=[],r=[],o=J.delayedCall(i,function(){t(n,r),n=[],r=[]}).pause();return function(e){n.length||o.restart(!0),n.push(e.trigger),r.push(e),a<=n.length&&o.progress(1)}},s;for(s in t)r[s]=s.substr(0,2)===`on`&&So(t[s])&&s!==`onRefreshInit`?o(s,t[s]):t[s];return So(a)&&(a=a(),$o(Xs,`refresh`,function(){return a=t.batchMax()})),Da(e).forEach(function(e){var t={};for(s in r)t[s]=r[s];t.trigger=e,n.push(Xs.create(t))}),n},Zs=function(e,t,n,r){return t>r?e(r):t<0&&e(0),n>r?(r-t)/(n-t):n<0?t/(t-n):1},Qs=function e(t,n){n===!0?t.style.removeProperty(`touch-action`):t.style.touchAction=n===!0?`auto`:n?`pan-`+n+(va.isTouch?` pinch-zoom`:``):`none`,t===Ca&&e(wa,n)},$s={auto:1,scroll:1},ec=function(e){var t=e.event,n=e.target,r=e.axis,i=(t.changedTouches?t.changedTouches[0]:t).target,a=i._gsap||J.core.getCache(i),o=eo(),s;if(!a._isScrollT||o-a._isScrollT>2e3){for(;i&&i!==wa&&(i.scrollHeight<=i.clientHeight&&i.scrollWidth<=i.clientWidth||!($s[(s=Uo(i)).overflowY]||$s[s.overflowX]));)i=i.parentNode;a._isScroll=i&&i!==n&&!mo(i)&&($s[(s=Uo(i)).overflowY]||$s[s.overflowX]),a._isScrollT=o}(a._isScroll||r===`x`)&&(t.stopPropagation(),t._gsapAllow=!0)},tc=function(e,t,n,r){return va.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:r&&=ec,onPress:r,onDrag:r,onScroll:r,onEnable:function(){return n&&$o(Sa,va.eventTypes[0],ic,!1,!0)},onDisable:function(){return es(Sa,va.eventTypes[0],ic,!0)}})},nc=/(input|label|select|textarea)/i,ic=function(e){var t=nc.test(e.target.tagName);(t||rc)&&(e._gsapAllow=!0,rc=t)},ac=function(e){wo(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type=`wheel,touch`),e.debounce=!!e.debounce,e.id=e.id||`normalizer`;var t=e,n=t.normalizeScrollX,r=t.momentum,i=t.allowNestedScroll,a=t.onRelease,o,s,c=ua(e.target)||Ca,l=J.core.globals().ScrollSmoother,u=l&&l.get(),d=Ga&&(e.content&&ua(e.content)||u&&e.content!==!1&&!u.smooth()&&u.content()),f=fa(c,la),p=fa(c,ca),m=1,h=(va.isTouch&&xa.visualViewport?xa.visualViewport.scale*xa.visualViewport.width:xa.outerWidth)/xa.innerWidth,g=0,_=So(r)?function(){return r(o)}:function(){return r||2.8},v,y,b=tc(c,e.type,!0,i),x=function(){return y=!1},S=lo,C=lo,w=function(){s=yo(c,la),C=Oa(+!!Ga,s),n&&(S=Oa(0,yo(c,ca))),v=Ts},T=function(){d._gsap.y=uo(parseFloat(d._gsap.y)+f.offset)+`px`,d.style.transform=`matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, `+parseFloat(d._gsap.y)+`, 0, 1)`,f.offset=f.cacheID=0},E=function(){if(y){requestAnimationFrame(x);var e=uo(o.deltaY/2),t=C(f.v-e);if(d&&t!==f.v+f.offset){f.offset=t-f.v;var n=uo((parseFloat(d&&d._gsap.y)||0)-f.offset);d.style.transform=`matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, `+n+`, 0, 1)`,d._gsap.y=n+`px`,f.cacheID=Yi.cache,Ps()}return!0}f.offset&&T(),y=!0},D,O,k,A,j=function(){w(),D.isActive()&&D.vars.scrollY>s&&(f()>s?D.progress(1)&&f(s):D.resetTo(`scrollY`,s))};return d&&J.set(d,{y:`+=0`}),e.ignoreCheck=function(e){return Ga&&e.type===`touchmove`&&E(e)||m>1.05&&e.type!==`touchstart`||o.isGesturing||e.touches&&e.touches.length>1},e.onPress=function(){y=!1;var e=m;m=uo((xa.visualViewport&&xa.visualViewport.scale||1)/h),D.pause(),e!==m&&Qs(c,m>1.01||!n&&`x`),O=p(),k=f(),w(),v=Ts},e.onRelease=e.onGestureStart=function(e,t){if(f.offset&&T(),!t)A.restart(!0);else{Yi.cache++;var r=_(),i,o;n&&(i=p(),o=i+r*.05*-e.velocityX/.227,r*=Zs(p,i,o,yo(c,ca)),D.vars.scrollX=S(o)),i=f(),o=i+r*.05*-e.velocityY/.227,r*=Zs(f,i,o,yo(c,la)),D.vars.scrollY=C(o),D.invalidate().duration(r).play(.01),(Ga&&D.vars.scrollY>=s||i>=s-1)&&J.to({},{onUpdate:j,duration:r})}a&&a(e)},e.onWheel=function(){D._ts&&D.pause(),eo()-g>1e3&&(v=0,g=eo())},e.onChange=function(e,t,r,i,a){if(Ts!==v&&w(),t&&n&&p(S(i[2]===t?O+(e.startX-e.x):p()+t-i[1])),r){f.offset&&T();var o=a[2]===r,s=o?k+e.startY-e.y:f()+r-a[1],c=C(s);o&&s!==c&&(k+=c-s),f(c)}(r||t)&&Ps()},e.onEnable=function(){Qs(c,!n&&`x`),Xs.addEventListener(`refresh`,j),$o(xa,`resize`,j),f.smooth&&=(f.target.style.scrollBehavior=`auto`,p.smooth=!1),b.enable()},e.onDisable=function(){Qs(c,!0),es(xa,`resize`,j),Xs.removeEventListener(`refresh`,j),b.kill()},e.lockAxis=e.lockAxis!==!1,o=new va(e),o.iOS=Ga,Ga&&!f()&&f(1),Ga&&J.ticker.add(lo),A=o._dc,D=J.to(o,{ease:`power4`,paused:!0,inherit:!1,scrollX:n?`+=0.1`:`+=0`,scrollY:`+=0.1`,modifiers:{scrollY:qs(f,f(),function(){return D.pause()})},onUpdate:Ps,onComplete:A.vars.onComplete}),o},Xs.sort=function(e){if(So(e))return cs.sort(e);var t=xa.pageYOffset||0;return Xs.getAll().forEach(function(e){return e._sortY=e.trigger?t+e.trigger.getBoundingClientRect().top:e.start+xa.innerHeight}),cs.sort(e||function(e,t){return(e.vars.refreshPriority||0)*-1e6+(e.vars.containerAnimation?1e6:e._sortY)-((t.vars.containerAnimation?1e6:t._sortY)+(t.vars.refreshPriority||0)*-1e6)})},Xs.observe=function(e){return new va(e)},Xs.normalizeScroll=function(e){if(e===void 0)return Va;if(e===!0&&Va)return Va.enable();if(e===!1)Va&&Va.kill(),Va=e;else{var t=e instanceof va?e:ac(e);return Va&&Va.target===t.target&&Va.kill(),mo(t.target)&&(Va=t),t}},Xs.core={_getVelocityProp:pa,_inputObserver:tc,_scrollers:Yi,_proxies:Xi,bridge:{ss:function(){no||vs(`scrollStart`),no=eo()},ref:function(){return ja}}},po()&&J.registerPlugin(Xs)}));function sc(e){let t=String(typeof e==`object`&&e?e.id||e.name||e.title||``:e||``).toUpperCase().replace(/[^A-Z0-9]+/g,`_`);return t.includes(`ZHEN`)||t.includes(`LADY_ZHEN`)?`ZHEN_JI`:t.includes(`LU_BU`)||t.includes(`LV_BU`)?`LV_BU`:fc.find(e=>t===e.id||t.includes(e.id))?.id||t.replace(/^_|_$/g,``)}var lc,uc,dc,fc,pc,mc,hc,gc=i((()=>{lc=(e,t,n,r,i,a,o)=>({id:e,name:t,description:n,kind:r,count:i,range:a,slot:o}),uc=[lc(`SLASH`,`โจมตี`,`โจมตีหนึ่งเป้าหมายในระยะ ใช้ได้หนึ่งครั้งต่อเทิร์น เป้าหมายใช้หลบหลีกเพื่อป้องกัน`,`BASIC`,36),lc(`DODGE`,`หลบหลีก`,`ตอบโต้การโจมตีหรือธนูหมื่นดอกเพื่อป้องกันความเสียหาย`,`BASIC`,24),lc(`PEACH`,`สวนท้อ`,`ฟื้นฟู 1 HP ให้ตนเอง หรือช่วยผู้เล่นที่กำลังใกล้ตาย`,`BASIC`,12),lc(`WINE`,`สุรา`,`เพิ่มความเสียหายโจมตีครั้งถัดไป 1 หรือช่วยตนเองเมื่อใกล้ตาย`,`BASIC`,6),lc(`THUNDER_ATTACK`,`โจมตีสายฟ้า`,`โจมตีด้วยธาตุสายฟ้า ส่งความเสียหายผ่านโซ่เหล็ก`,`BASIC`,8),lc(`STEAL`,`หยิบฉวย`,`หยิบการ์ดหนึ่งใบจากเป้าหมายที่อยู่ระยะ 1`,`KIT`,6),lc(`SABOTAGE`,`รื้อสะพาน`,`ทำลายการ์ดหนึ่งใบจากมือ อุปกรณ์ หรือเขตพิจารณาของเป้าหมาย`,`KIT`,6),lc(`EX_NIHILO`,`เสกจากความว่าง`,`จั่วสองใบ`,`KIT`,4),lc(`DUEL`,`ประลองกำลัง`,`ผลัดกันใช้โจมตี ผู้ที่ตอบไม่ได้รับความเสียหาย 1`,`KIT`,4),lc(`BARBARIAN_INVASION`,`คนเถื่อนบุกรุก`,`ผู้เล่นอื่นใช้โจมตีหนึ่งใบ มิฉะนั้นรับความเสียหาย 1`,`KIT`,3),lc(`ARROW_BARRAGE`,`ธนูหมื่นดอก`,`ผู้เล่นอื่นใช้หลบหลีกหนึ่งใบ มิฉะนั้นรับความเสียหาย 1`,`KIT`,3),lc(`PEACH_GARDEN`,`สวนท้อสาบาน`,`ทุกคนที่ยังมีชีวิตฟื้นฟู 1 HP`,`KIT`,2),lc(`IRON_CHAIN`,`โซ่เหล็ก`,`สลับสถานะล่ามโซ่ได้ถึงสองเป้าหมาย ดาเมจธาตุส่งต่อคนที่ล่ามโซ่`,`KIT`,4),lc(`FIRE_ATTACK`,`โจมตีเพลิง`,`เป้าหมายเปิดการ์ด ผู้ร่ายทิ้งการ์ดดอกเดียวกันเพื่อสร้างดาเมจไฟ 1`,`KIT`,3),lc(`NEGATE`,`ไร้ข้อกังขา`,`ยกเลิกผลกลยุทธ์ สามารถสวนการยกเลิกในสายโซ่ได้`,`KIT`,8),lc(`BUMPER_HARVEST`,`เก็บเกี่ยว`,`เปิดการ์ดแล้วทุกคนเลือกหนึ่งใบตามลำดับที่นั่ง`,`KIT`,2),lc(`BORROWED_SWORD`,`ยืมดาบฆ่าคน`,`เลือกผู้มีอาวุธให้โจมตีอีกคน หากไม่โจมตี ผู้ร่ายได้รับอาวุธ`,`KIT`,2),lc(`LIGHTNING`,`อัสนีบาต`,`พิจารณาโพดำ 2–9 รับดาเมจสายฟ้า 3 มิฉะนั้นส่งต่อ`,`DELAYED`,2),lc(`ACEDIA`,`สุขไม่คิดกลับ`,`พิจารณาไม่เป็นหัวใจ ข้ามเทิร์นโดยไม่บังคับทิ้งการ์ด`,`DELAYED`,3),lc(`STARVATION`,`เสบียงขาด`,`พิจารณาไม่เป็นดอกจิก ข้ามการจั่ว`,`DELAYED`,3),lc(`ZHUGE_CROSSBOW`,`หน้าไม้ขงเบ้ง`,`ใช้โจมตีได้ไม่จำกัด`,`EQUIPMENT`,2,1,`weapon`),lc(`BLUE_STEEL_SWORD`,`กระบี่เหล็กฟ้า`,`โจมตีโดยไม่คิดผลเกราะ`,`EQUIPMENT`,2,2,`weapon`),lc(`SIX_SWORDS_WU`,`ดาบหกเหล่าอู๋`,`อาวุธระยะ 2`,`EQUIPMENT`,1,2,`weapon`),lc(`KIRIN_BOW`,`เกาทัณฑ์กิเลน`,`เมื่อโจมตีทำดาเมจ ทำลายม้าของเป้าหมายได้`,`EQUIPMENT`,1,5,`weapon`),lc(`FEATHERED_FAN`,`พัดขนนก`,`เปลี่ยนโจมตีธรรมดาเป็นดาเมจไฟ`,`EQUIPMENT`,2,4,`weapon`),lc(`SERPENT_SPEAR`,`ทวนอสรพิษ`,`ใช้การ์ดบนมือสองใบแทนโจมตี`,`EQUIPMENT`,2,3,`weapon`),lc(`FROST_SWORD`,`กระบี่เหมันต์`,`เลือกสละดาเมจเพื่อทำลายการ์ดเป้าหมายสองใบ`,`EQUIPMENT`,1,2,`weapon`),lc(`TWO_BLADED_TRIDENT`,`ง้าวสองง่าม`,`เมื่อเป้าหมายหลบ ทิ้งการ์ดหนึ่งใบเพื่อบังคับให้โดน`,`EQUIPMENT`,1,3,`weapon`),lc(`ROCK_CLEAVING_AXE`,`ขวานผ่าหิน`,`เมื่อเป้าหมายหลบ ทิ้งสองใบเพื่อบังคับให้โดน`,`EQUIPMENT`,1,3,`weapon`),lc(`GREEN_DRAGON_BLADE`,`ง้าวมังกรเขียว`,`เมื่อเป้าหมายหลบ ใช้โจมตีอีกใบเพื่อโจมตีซ้ำ`,`EQUIPMENT`,2,3,`weapon`),lc(`SKY_PIERCING_HALBERD`,`ทวนกรีดฟ้า`,`โจมตีใบสุดท้ายบนมือเลือกได้ถึงสามเป้าหมาย`,`EQUIPMENT`,1,4,`weapon`),lc(`YIN_YANG_SWORDS`,`กระบี่หยินหยาง`,`โจมตีต่างเพศ ให้เป้าหมายทิ้งหนึ่งใบหรือผู้โจมตีจั่ว`,`EQUIPMENT`,2,2,`weapon`),lc(`NIO_SHIELD`,`โล่เสือโคร่ง`,`ป้องกันโจมตีธรรมดาสีดำ`,`EQUIPMENT`,2,void 0,`armor`),lc(`EIGHT_TRIGRAMS_FORMATION`,`ประยุทธ์แปดทิศ`,`เมื่อจำเป็นต้องหลบ พิจารณาสีแดงเสมือนใช้หลบหลีก`,`EQUIPMENT`,2,void 0,`armor`),lc(`SILVER_LION_HELMET`,`หมวกสิงโตเงิน`,`จำกัดดาเมจครั้งละ 1 ถอดจากเขตอุปกรณ์แล้วฟื้นฟู 1`,`EQUIPMENT`,2,void 0,`armor`),lc(`RATTAN_ARMOR`,`เกราะหวาย`,`ป้องกันโจมตีธรรมดาและโจมตีหมู่ รับดาเมจไฟเพิ่ม 1`,`EQUIPMENT`,2,void 0,`armor`),lc(`LIGHTNING_HOOF`,`ม้าหมอบเต็กเลา`,`เพิ่มระยะห่างในการป้องกัน 1`,`EQUIPMENT`,2,void 0,`defensiveHorse`),lc(`RED_HARE`,`ม้าเซ็กเธาว์`,`ลดระยะห่างในการโจมตี 1`,`EQUIPMENT`,2,void 0,`offensiveHorse`),lc(`FERGANA_STEED`,`ม้าเฟอร์กานา`,`ลดระยะห่างในการโจมตี 1`,`EQUIPMENT`,2,void 0,`offensiveHorse`),lc(`SHADOWRUNNER`,`ม้าเงาทมิฬ`,`เพิ่มระยะห่างในการป้องกัน 1`,`EQUIPMENT`,2,void 0,`defensiveHorse`),lc(`WOODEN_CART`,`เกวียนไม้`,`เพิ่มจำนวนการ์ดที่เก็บได้ตอนจบเทิร์น 1`,`EQUIPMENT`,1,void 0,`treasure`)].map((e,t)=>({...e,art:t})),dc=Object.fromEntries(uc.map(e=>[e.id,e])),fc=[[`CAO_CAO`,`โจโฉ`,`Cao Cao`,`WEI`,4,`MALE`,`มหาอุปราช: รับการ์ดที่ทำดาเมจ | องครักษ์: เมื่อเป็นเจ้าเมืองขอหลบหลีกจากวุยก๊ก`],[`LIU_BEI`,`เล่าปี่`,`Liu Bei`,`SHU`,4,`MALE`,`ปันสุข: มอบการ์ดครบสองใบฟื้นฟู 1 ต่อเทิร์น | ระดมพล: เจ้าเมืองขอโจมตีจากจ๊กก๊ก`],[`SUN_QUAN`,`ซุนกวน`,`Sun Quan`,`WU`,4,`MALE`,`ผลัดการ์ด: ทิ้งมือ/อุปกรณ์แล้วจั่วเท่ากันครั้งละเทิร์น | กู้ชีพ: เจ้าเมืองรับสวนท้อจากง่อก๊กเพิ่ม 1`],[`GUAN_YU`,`กวนอู`,`Guan Yu`,`SHU`,4,`MALE`,`เทพสงคราม: การ์ดแดงบนมือหรืออุปกรณ์ใช้เป็นโจมตี`],[`ZHANG_FEI`,`เตียวหุย`,`Zhang Fei`,`SHU`,4,`MALE`,`กู่ก้องคำราม: ใช้โจมตีไม่จำกัดครั้งในเทิร์น`],[`ZHAO_YUN`,`จูล่ง`,`Zhao Yun`,`SHU`,4,`MALE`,`มังกรทะลวง: ใช้โจมตีแทนหลบหลีก และหลบหลีกแทนโจมตี`],[`ZHEN_JI`,`เจินจี`,`Zhen Ji`,`WEI`,3,`FEMALE`,`ลั่วเสิน: พิจารณารับการ์ดดำจนพบแดง | เทพธิดา: การ์ดดำบนมือใช้เป็นหลบหลีก`],[`LV_BU`,`ลิโป้`,`Lu Bu`,`QUN`,5,`MALE`,`ไร้ผู้ต่อกร: โจมตีต้องหลบสองใบ ประลองกำลังต้องตอบโจมตีสองใบ`],[`DIAO_CHAN`,`เตียวเสี้ยน`,`Diao Chan`,`QUN`,3,`FEMALE`,`บ่วงเสน่หา: ทิ้งหนึ่งใบให้ชายสองคนดวล | งามล่มเมือง: จั่วหนึ่งใบจบเทิร์น`],[`SIMA_YI`,`สุมาอี้`,`Sima Yi`,`WEI`,3,`MALE`,`ป้อนกลับ: หยิบมือ/อุปกรณ์จากผู้ทำดาเมจ | เปลี่ยนชะตา: ใช้การ์ดบนมือแทนไพ่พิจารณา`],[`ZHUGE_LIANG`,`ขงเบ้ง`,`Zhuge Liang`,`SHU`,3,`MALE`,`ดูดาว: เรียงบน/ใต้กองได้ถึงห้าใบ | เมืองว่าง: มือว่างไม่ตกเป็นเป้าโจมตี/ประลอง`],[`ZHOU_YU`,`จิวยี่`,`Zhou Yu`,`WU`,3,`MALE`,`สง่างาม: จั่วเพิ่มหนึ่ง | บ่มเพลิง: ให้การ์ดแก่เป้าหมาย ทายดอกผิดรับดาเมจหนึ่ง`],[`HUANG_GAI`,`อุยกาย`,`Huang Gai`,`WU`,4,`MALE`,`โบยตนเอง: ลด 1 HP เพื่อจั่วสองใบ ใช้ซ้ำได้ และกู้ชีพก่อนดำเนินต่อ`]].map((e,t)=>({id:e[0],name:e[1],english:e[2],faction:e[3],hp:e[4],gender:e[5],skills:e[6],art:t})),pc=Object.fromEntries(fc.map(e=>[e.id,e])),Object.freeze({version:`pixel-1`,minPlayers:4,maxPlayers:10,defaultPlayers:6,reactionMs:2e4,draftMs:9e4,reconnectSeconds:45,turnDeadline:null,deckSize:176}),mc={WEI:{name:`วุยก๊ก`,seal:`魏`,color:`#2563eb`},SHU:{name:`จ๊กก๊ก`,seal:`蜀`,color:`#dc2626`},WU:{name:`ง่อก๊ก`,seal:`吳`,color:`#16a34a`},QUN:{name:`กลุ่มอิสระ`,seal:`群`,color:`#d97706`}},hc={LORD:{name:`เจ้าเมือง`,seal:`主`,color:`#f59e0b`,goal:`กำจัดกบฏและคนทรยศ`},LOYALIST:{name:`ผู้ภักดี`,seal:`忠`,color:`#3b82f6`,goal:`ปกป้องเจ้าเมืองและกำจัดศัตรู`},REBEL:{name:`กบฏ`,seal:`反`,color:`#ef4444`,goal:`กำจัดเจ้าเมือง`},RENEGADE:{name:`คนทรยศ`,seal:`內`,color:`#a855f7`,goal:`เป็นคนสุดท้ายที่รอดชีวิต`},UNKNOWN:{name:`บทบาทลับ`,seal:`?`,color:`#8b9b9c`,goal:`ยังไม่เปิดเผย`}}})),_c=a((()=>{ArrayBuffer.isView||(ArrayBuffer.isView=e=>typeof e==`object`&&!!e&&e.buffer instanceof ArrayBuffer),typeof globalThis>`u`&&typeof window<`u`&&(window.globalThis=window)})),vc=a((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.ServerError=e.CloseCode=void 0,(function(e){e[e.CONSENTED=4e3]=`CONSENTED`,e[e.DEVMODE_RESTART=4010]=`DEVMODE_RESTART`})(e.CloseCode||={}),e.ServerError=class extends Error{constructor(e,t){super(t),this.name=`ServerError`,this.code=e}}})),yc=a((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.decode=e.encode=void 0;function t(e,t){if(this._offset=t,e instanceof ArrayBuffer)this._buffer=e,this._view=new DataView(this._buffer);else if(ArrayBuffer.isView(e))this._buffer=e.buffer,this._view=new DataView(this._buffer,e.byteOffset,e.byteLength);else throw Error(`Invalid argument`)}function n(e,t,n){for(var r=``,i=0,a=t,o=t+n;a<o;a++){var s=e.getUint8(a);if(!(s&128))r+=String.fromCharCode(s);else if((s&224)==192)r+=String.fromCharCode((s&31)<<6|e.getUint8(++a)&63);else if((s&240)==224)r+=String.fromCharCode((s&15)<<12|(e.getUint8(++a)&63)<<6|e.getUint8(++a)&63);else if((s&248)==240)i=(s&7)<<18|(e.getUint8(++a)&63)<<12|(e.getUint8(++a)&63)<<6|e.getUint8(++a)&63,i>=65536?(i-=65536,r+=String.fromCharCode((i>>>10)+55296,(i&1023)+56320)):r+=String.fromCharCode(i);else throw Error(`Invalid byte `+s.toString(16))}return r}t.prototype._array=function(e){for(var t=Array(e),n=0;n<e;n++)t[n]=this._parse();return t},t.prototype._map=function(e){for(var t=``,n={},r=0;r<e;r++)t=this._parse(),n[t]=this._parse();return n},t.prototype._str=function(e){var t=n(this._view,this._offset,e);return this._offset+=e,t},t.prototype._bin=function(e){var t=this._buffer.slice(this._offset,this._offset+e);return this._offset+=e,t},t.prototype._parse=function(){var e=this._view.getUint8(this._offset++),t,n=0,r=0,i=0,a=0;if(e<192)return e<128?e:e<144?this._map(e&15):e<160?this._array(e&15):this._str(e&31);if(e>223)return(255-e+1)*-1;switch(e){case 192:return null;case 194:return!1;case 195:return!0;case 196:return n=this._view.getUint8(this._offset),this._offset+=1,this._bin(n);case 197:return n=this._view.getUint16(this._offset),this._offset+=2,this._bin(n);case 198:return n=this._view.getUint32(this._offset),this._offset+=4,this._bin(n);case 199:if(n=this._view.getUint8(this._offset),r=this._view.getInt8(this._offset+1),this._offset+=2,r===-1){var o=this._view.getUint32(this._offset);return i=this._view.getInt32(this._offset+4),a=this._view.getUint32(this._offset+8),this._offset+=12,new Date((i*4294967296+a)*1e3+o/1e6)}return[r,this._bin(n)];case 200:return n=this._view.getUint16(this._offset),r=this._view.getInt8(this._offset+2),this._offset+=3,[r,this._bin(n)];case 201:return n=this._view.getUint32(this._offset),r=this._view.getInt8(this._offset+4),this._offset+=5,[r,this._bin(n)];case 202:return t=this._view.getFloat32(this._offset),this._offset+=4,t;case 203:return t=this._view.getFloat64(this._offset),this._offset+=8,t;case 204:return t=this._view.getUint8(this._offset),this._offset+=1,t;case 205:return t=this._view.getUint16(this._offset),this._offset+=2,t;case 206:return t=this._view.getUint32(this._offset),this._offset+=4,t;case 207:return i=this._view.getUint32(this._offset)*2**32,a=this._view.getUint32(this._offset+4),this._offset+=8,i+a;case 208:return t=this._view.getInt8(this._offset),this._offset+=1,t;case 209:return t=this._view.getInt16(this._offset),this._offset+=2,t;case 210:return t=this._view.getInt32(this._offset),this._offset+=4,t;case 211:return i=this._view.getInt32(this._offset)*2**32,a=this._view.getUint32(this._offset+4),this._offset+=8,i+a;case 212:if(r=this._view.getInt8(this._offset),this._offset+=1,r===0){this._offset+=1;return}return[r,this._bin(1)];case 213:return r=this._view.getInt8(this._offset),this._offset+=1,[r,this._bin(2)];case 214:return r=this._view.getInt8(this._offset),this._offset+=1,r===-1?(t=this._view.getUint32(this._offset),this._offset+=4,new Date(t*1e3)):[r,this._bin(4)];case 215:if(r=this._view.getInt8(this._offset),this._offset+=1,r===0)return i=this._view.getInt32(this._offset)*2**32,a=this._view.getUint32(this._offset+4),this._offset+=8,new Date(i+a);if(r===-1){i=this._view.getUint32(this._offset),a=this._view.getUint32(this._offset+4),this._offset+=8;var s=(i&3)*4294967296+a;return new Date(s*1e3+(i>>>2)/1e6)}return[r,this._bin(8)];case 216:return r=this._view.getInt8(this._offset),this._offset+=1,[r,this._bin(16)];case 217:return n=this._view.getUint8(this._offset),this._offset+=1,this._str(n);case 218:return n=this._view.getUint16(this._offset),this._offset+=2,this._str(n);case 219:return n=this._view.getUint32(this._offset),this._offset+=4,this._str(n);case 220:return n=this._view.getUint16(this._offset),this._offset+=2,this._array(n);case 221:return n=this._view.getUint32(this._offset),this._offset+=4,this._array(n);case 222:return n=this._view.getUint16(this._offset),this._offset+=2,this._map(n);case 223:return n=this._view.getUint32(this._offset),this._offset+=4,this._map(n)}throw Error(`Could not parse`)};function r(e,n=0){var r=new t(e,n),i=r._parse();if(r._offset!==e.byteLength)throw Error(e.byteLength-r._offset+` trailing bytes`);return i}e.decode=r;var i=4294967295,a=17179869183;function o(e,t,n){for(var r=0,i=0,a=n.length;i<a;i++)r=n.charCodeAt(i),r<128?e.setUint8(t++,r):r<2048?(e.setUint8(t++,192|r>>6),e.setUint8(t++,128|r&63)):r<55296||r>=57344?(e.setUint8(t++,224|r>>12),e.setUint8(t++,128|r>>6&63),e.setUint8(t++,128|r&63)):(i++,r=65536+((r&1023)<<10|n.charCodeAt(i)&1023),e.setUint8(t++,240|r>>18),e.setUint8(t++,128|r>>12&63),e.setUint8(t++,128|r>>6&63),e.setUint8(t++,128|r&63))}function s(e){for(var t=0,n=0,r=0,i=e.length;r<i;r++)t=e.charCodeAt(r),t<128?n+=1:t<2048?n+=2:t<55296||t>=57344?n+=3:(r++,n+=4);return n}function c(e,t,n){var r=typeof n,o=0,l=0,u=0,d=0,f=0,p=0;if(r===`string`){if(f=s(n),f<32)e.push(f|160),p=1;else if(f<256)e.push(217,f),p=2;else if(f<65536)e.push(218,f>>8,f),p=3;else if(f<4294967296)e.push(219,f>>24,f>>16,f>>8,f),p=5;else throw Error(`String too long`);return t.push({_str:n,_length:f,_offset:e.length}),p+f}if(r===`number`)return Math.floor(n)!==n||!isFinite(n)?(e.push(203),t.push({_float:n,_length:8,_offset:e.length}),9):n>=0?n<128?(e.push(n),1):n<256?(e.push(204,n),2):n<65536?(e.push(205,n>>8,n),3):n<4294967296?(e.push(206,n>>24,n>>16,n>>8,n),5):(u=n/2**32|0,d=n>>>0,e.push(207,u>>24,u>>16,u>>8,u,d>>24,d>>16,d>>8,d),9):n>=-32?(e.push(n),1):n>=-128?(e.push(208,n),2):n>=-32768?(e.push(209,n>>8,n),3):n>=-2147483648?(e.push(210,n>>24,n>>16,n>>8,n),5):(u=Math.floor(n/2**32),d=n>>>0,e.push(211,u>>24,u>>16,u>>8,u,d>>24,d>>16,d>>8,d),9);if(r===`object`){if(n===null)return e.push(192),1;if(Array.isArray(n)){if(f=n.length,f<16)e.push(f|144),p=1;else if(f<65536)e.push(220,f>>8,f),p=3;else if(f<4294967296)e.push(221,f>>24,f>>16,f>>8,f),p=5;else throw Error(`Array too large`);for(o=0;o<f;o++)p+=c(e,t,n[o]);return p}if(n instanceof Date){var m=n.getTime(),h=Math.floor(m/1e3),g=(m-h*1e3)*1e6;return h>=0&&g>=0&&h<=a?g===0&&h<=i?(e.push(214,255,h>>24,h>>16,h>>8,h),6):(u=h/4294967296,d=h|0,e.push(215,255,g>>22,g>>14,g>>6,u,d>>24,d>>16,d>>8,d),10):(u=Math.floor(h/4294967296),d=h>>>0,e.push(199,12,255,g>>24,g>>16,g>>8,g,u>>24,u>>16,u>>8,u,d>>24,d>>16,d>>8,d),15)}if(n instanceof ArrayBuffer){if(f=n.byteLength,f<256)e.push(196,f),p=2;else if(f<65536)e.push(197,f>>8,f),p=3;else if(f<4294967296)e.push(198,f>>24,f>>16,f>>8,f),p=5;else throw Error(`Buffer too large`);return t.push({_bin:n,_length:f,_offset:e.length}),p+f}if(typeof n.toJSON==`function`)return c(e,t,n.toJSON());var _=[],v=``,y=Object.keys(n);for(o=0,l=y.length;o<l;o++)v=y[o],n[v]!==void 0&&typeof n[v]!=`function`&&_.push(v);if(f=_.length,f<16)e.push(f|128),p=1;else if(f<65536)e.push(222,f>>8,f),p=3;else if(f<4294967296)e.push(223,f>>24,f>>16,f>>8,f),p=5;else throw Error(`Object too large`);for(o=0;o<f;o++)v=_[o],p+=c(e,t,v),p+=c(e,t,n[v]);return p}if(r===`boolean`)return e.push(n?195:194),1;if(r===`undefined`)return e.push(192),1;if(typeof n.toJSON==`function`)return c(e,t,n.toJSON());throw Error(`Could not encode`)}function l(e){var t=[],n=[],r=c(t,n,e),i=new ArrayBuffer(r),a=new DataView(i),s=0,l=0,u=-1;n.length>0&&(u=n[0]._offset);for(var d,f=0,p=0,m=0,h=t.length;m<h;m++)if(a.setUint8(l+m,t[m]),m+1===u){if(d=n[s],f=d._length,p=l+u,d._bin)for(var g=new Uint8Array(d._bin),_=0;_<f;_++)a.setUint8(p+_,g[_]);else d._str?o(a,p,d._str):d._float!==void 0&&a.setFloat64(p,d._float);s++,l+=f,n[s]&&(u=n[s]._offset)}return i}e.encode=l})),bc=a(((e,t)=>{t.exports=function(){throw Error(`ws does not work in the browser. Browser clients must use the native WebSocket object`)}})),xc=a(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.WebSocketTransport=void 0;var i=r(bc()),a=globalThis.WebSocket||i.default;e.WebSocketTransport=class{constructor(e){this.events=e}send(e){e instanceof ArrayBuffer?this.ws.send(e):Array.isArray(e)&&this.ws.send(new Uint8Array(e).buffer)}connect(e,t){try{this.ws=new a(e,{headers:t,protocols:this.protocols})}catch{this.ws=new a(e,this.protocols)}this.ws.binaryType=`arraybuffer`,this.ws.onopen=this.events.onopen,this.ws.onmessage=this.events.onmessage,this.ws.onclose=this.events.onclose,this.ws.onerror=this.events.onerror}close(e,t){this.ws.close(e,t)}get isOpen(){return this.ws.readyState===a.OPEN}}})),Sc=a((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Connection=void 0;var t=xc();e.Connection=class{constructor(){this.events={},this.transport=new t.WebSocketTransport(this.events)}send(e){this.transport.send(e)}connect(e,t){this.transport.connect(e,t)}close(e,t){this.transport.close(e,t)}get isOpen(){return this.transport.isOpen}}})),Cc=a((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.utf8Length=e.utf8Read=e.ErrorCode=e.Protocol=void 0,(function(e){e[e.HANDSHAKE=9]=`HANDSHAKE`,e[e.JOIN_ROOM=10]=`JOIN_ROOM`,e[e.ERROR=11]=`ERROR`,e[e.LEAVE_ROOM=12]=`LEAVE_ROOM`,e[e.ROOM_DATA=13]=`ROOM_DATA`,e[e.ROOM_STATE=14]=`ROOM_STATE`,e[e.ROOM_STATE_PATCH=15]=`ROOM_STATE_PATCH`,e[e.ROOM_DATA_SCHEMA=16]=`ROOM_DATA_SCHEMA`,e[e.ROOM_DATA_BYTES=17]=`ROOM_DATA_BYTES`})(e.Protocol||={}),(function(e){e[e.MATCHMAKE_NO_HANDLER=4210]=`MATCHMAKE_NO_HANDLER`,e[e.MATCHMAKE_INVALID_CRITERIA=4211]=`MATCHMAKE_INVALID_CRITERIA`,e[e.MATCHMAKE_INVALID_ROOM_ID=4212]=`MATCHMAKE_INVALID_ROOM_ID`,e[e.MATCHMAKE_UNHANDLED=4213]=`MATCHMAKE_UNHANDLED`,e[e.MATCHMAKE_EXPIRED=4214]=`MATCHMAKE_EXPIRED`,e[e.AUTH_FAILED=4215]=`AUTH_FAILED`,e[e.APPLICATION_ERROR=4216]=`APPLICATION_ERROR`})(e.ErrorCode||={});function t(e,t){let n=e[t++];for(var r=``,i=0,a=t,o=t+n;a<o;a++){var s=e[a];if(!(s&128))r+=String.fromCharCode(s);else if((s&224)==192)r+=String.fromCharCode((s&31)<<6|e[++a]&63);else if((s&240)==224)r+=String.fromCharCode((s&15)<<12|(e[++a]&63)<<6|e[++a]&63);else if((s&248)==240)i=(s&7)<<18|(e[++a]&63)<<12|(e[++a]&63)<<6|e[++a]&63,i>=65536?(i-=65536,r+=String.fromCharCode((i>>>10)+55296,(i&1023)+56320)):r+=String.fromCharCode(i);else throw Error(`Invalid byte `+s.toString(16))}return r}e.utf8Read=t;function n(e=``){let t=0,n=0;for(let r=0,i=e.length;r<i;r++)t=e.charCodeAt(r),t<128?n+=1:t<2048?n+=2:t<55296||t>=57344?n+=3:(r++,n+=4);return n+1}e.utf8Length=n})),wc=a((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.getSerializer=e.registerSerializer=void 0;var t={};function n(e,n){t[e]=n}e.registerSerializer=n;function r(e){let n=t[e];if(!n)throw Error(`missing serializer: `+e);return n}e.getSerializer=r})),Tc=a((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.createNanoEvents=void 0,e.createNanoEvents=()=>({emit(e,...t){let n=this.events[e]||[];for(let e=0,r=n.length;e<r;e++)n[e](...t)},events:{},on(e,t){var n;return(n=this.events[e])!=null&&n.push(t)||(this.events[e]=[t]),()=>{this.events[e]=this.events[e]?.filter(e=>t!==e)}}})})),Ec=a((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.createSignal=e.EventEmitter=void 0;var t=class{constructor(){this.handlers=[]}register(e,t=!1){return this.handlers.push(e),this}invoke(...e){this.handlers.forEach(t=>t.apply(this,e))}invokeAsync(...e){return Promise.all(this.handlers.map(t=>t.apply(this,e)))}remove(e){let t=this.handlers.indexOf(e);this.handlers[t]=this.handlers[this.handlers.length-1],this.handlers.pop()}clear(){this.handlers=[]}};e.EventEmitter=t;function n(){let e=new t;function n(t){return e.register(t,this===null)}return n.once=t=>{let n=function(...r){t.apply(this,r),e.remove(n)};e.register(n)},n.remove=t=>e.remove(t),n.invoke=(...t)=>e.invoke(...t),n.invokeAsync=(...t)=>e.invokeAsync(...t),n.clear=()=>e.clear(),n}e.createSignal=n})),Dc=a(((e,t,n)=>{(function(n,r){typeof e==`object`&&t!==void 0?r(e):typeof define==`function`&&define.amd?define([`exports`],r):(n=typeof globalThis<`u`?globalThis:n||self,r(n.schema={}))})(n,(function(e){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},t(e,n)};function n(e,n){if(typeof n!=`function`&&n!==null)throw TypeError(`Class extends value `+String(n)+` is not a constructor or null`);t(e,n);function r(){this.constructor=e}e.prototype=n===null?Object.create(n):(r.prototype=n.prototype,new r)}function r(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}function i(e,t,n){if(n||arguments.length===2)for(var r=0,i=t.length,a;r<i;r++)(a||!(r in t))&&(a||=Array.prototype.slice.call(t,0,r),a[r]=t[r]);return e.concat(a||Array.prototype.slice.call(t))}var a=255,o=213;e.OPERATION=void 0,(function(e){e[e.ADD=128]=`ADD`,e[e.REPLACE=0]=`REPLACE`,e[e.DELETE=64]=`DELETE`,e[e.DELETE_AND_ADD=192]=`DELETE_AND_ADD`,e[e.TOUCH=1]=`TOUCH`,e[e.CLEAR=10]=`CLEAR`})(e.OPERATION||={});var s=function(){function t(e,t,n){this.changed=!1,this.changes=new Map,this.allChanges=new Set,this.caches={},this.currentCustomOperation=0,this.ref=e,this.setParent(t,n)}return t.prototype.setParent=function(e,t,n){var r=this;if(this.indexes||=this.ref instanceof Pe?this.ref._definition.indexes:{},this.parent=e,this.parentIndex=n,t){if(this.root=t,this.ref instanceof Pe){var i=this.ref._definition;for(var a in i.schema){var o=this.ref[a];if(o&&o.$changes){var s=i.indexes[a];o.$changes.setParent(this.ref,t,s)}}}else typeof this.ref==`object`&&this.ref.forEach(function(e,t){if(e instanceof Pe){var n=e.$changes,i=r.ref.$changes.indexes[t];n.setParent(r.ref,r.root,i)}})}},t.prototype.operation=function(e){this.changes.set(--this.currentCustomOperation,e)},t.prototype.change=function(t,n){n===void 0&&(n=e.OPERATION.ADD);var r=typeof t==`number`?t:this.indexes[t];this.assertValidIndex(r,t);var i=this.changes.get(r);(!i||i.op===e.OPERATION.DELETE||i.op===e.OPERATION.TOUCH)&&this.changes.set(r,{op:i&&i.op===e.OPERATION.DELETE?e.OPERATION.DELETE_AND_ADD:n,index:r}),this.allChanges.add(r),this.changed=!0,this.touchParents()},t.prototype.touch=function(t){var n=typeof t==`number`?t:this.indexes[t];this.assertValidIndex(n,t),this.changes.has(n)||this.changes.set(n,{op:e.OPERATION.TOUCH,index:n}),this.allChanges.add(n),this.touchParents()},t.prototype.touchParents=function(){this.parent&&this.parent.$changes.touch(this.parentIndex)},t.prototype.getType=function(e){if(this.ref._definition){var t=this.ref._definition;return t.schema[t.fieldsByIndex[e]]}var t=this.parent._definition,n=t.schema[t.fieldsByIndex[this.parentIndex]];return Object.values(n)[0]},t.prototype.getChildrenFilter=function(){var e=this.parent._definition.childFilters;return e&&e[this.parentIndex]},t.prototype.getValue=function(e){return this.ref.getByIndex(e)},t.prototype.delete=function(t){var n=typeof t==`number`?t:this.indexes[t];if(n===void 0)console.warn(`@colyseus/schema ${this.ref.constructor.name}: trying to delete non-existing index: ${t} (${n})`);else{var r=this.getValue(n);this.changes.set(n,{op:e.OPERATION.DELETE,index:n}),this.allChanges.delete(n),delete this.caches[n],r&&r.$changes&&(r.$changes.parent=void 0),this.changed=!0,this.touchParents()}},t.prototype.discard=function(t,n){var r=this;t===void 0&&(t=!1),n===void 0&&(n=!1),this.ref instanceof Pe||this.changes.forEach(function(t){if(t.op===e.OPERATION.DELETE){var n=r.ref.getIndex(t.index);delete r.indexes[n]}}),this.changes.clear(),this.changed=t,n&&this.allChanges.clear(),this.currentCustomOperation=0},t.prototype.discardAll=function(){var e=this;this.changes.forEach(function(t){var n=e.getValue(t.index);n&&n.$changes&&n.$changes.discardAll()}),this.discard()},t.prototype.cache=function(e,t){this.caches[e]=t},t.prototype.clone=function(){return new t(this.ref,this.parent,this.root)},t.prototype.ensureRefId=function(){this.refId===void 0&&(this.refId=this.root.getNextUniqueId())},t.prototype.assertValidIndex=function(e,t){if(e===void 0)throw Error(`ChangeTree: missing index for field "${t}"`)},t}();function c(e,t,n,r){return e[t]||(e[t]=[]),e[t].push(n),r?.forEach(function(e,t){return n(e,t)}),function(){return u(e[t],e[t].indexOf(n))}}function l(t){var n=this,r=typeof this.$changes.getType()!=`string`;this.$items.forEach(function(i,a){t.push({refId:n.$changes.refId,op:e.OPERATION.DELETE,field:a,value:void 0,previousValue:i}),r&&n.$changes.root.removeRef(i.$changes.refId)})}function u(e,t){if(t===-1||t>=e.length)return!1;for(var n=e.length-1,r=t;r<n;r++)e[r]=e[r+1];return e.length=n,!0}var d=function(e,t){var n=e.toString(),r=t.toString();return n<r?-1:+(n>r)};function f(e){return e.$proxy=!0,e=new Proxy(e,{get:function(e,t){return typeof t!=`symbol`&&!isNaN(t)?e.at(t):e[t]},set:function(e,t,n){if(typeof t!=`symbol`&&!isNaN(t)){var r=Array.from(e.$items.keys()),i=parseInt(r[t]||t);n==null?e.deleteAt(i):e.setAt(i,n)}else e[t]=n;return!0},deleteProperty:function(e,t){return typeof t==`number`?e.deleteAt(t):delete e[t],!0},has:function(e,t){return typeof t!=`symbol`&&!isNaN(Number(t))?e.$items.has(Number(t)):Reflect.has(e,t)}}),e}var p=function(){function t(){var e=[...arguments];this.$changes=new s(this),this.$items=new Map,this.$indexes=new Map,this.$refId=0,this.push.apply(this,e)}return t.prototype.onAdd=function(t,n){return n===void 0&&(n=!0),c(this.$callbacks||={},e.OPERATION.ADD,t,n?this.$items:void 0)},t.prototype.onRemove=function(t){return c(this.$callbacks||={},e.OPERATION.DELETE,t)},t.prototype.onChange=function(t){return c(this.$callbacks||={},e.OPERATION.REPLACE,t)},t.is=function(e){return Array.isArray(e)||e.array!==void 0},Object.defineProperty(t.prototype,"length",{get:function(){return this.$items.size},set:function(e){e===0?this.clear():this.splice(e,this.length-e)},enumerable:!1,configurable:!0}),t.prototype.push=function(){for(var e=this,t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];var r;return t.forEach(function(t){r=e.$refId++,e.setAt(r,t)}),r},t.prototype.pop=function(){var e=Array.from(this.$indexes.values()).pop();if(e!==void 0){this.$changes.delete(e),this.$indexes.delete(e);var t=this.$items.get(e);return this.$items.delete(e),t}},t.prototype.at=function(e){if(e=Math.trunc(e)||0,e<0&&(e+=this.length),!(e<0||e>=this.length)){var t=Array.from(this.$items.keys())[e];return this.$items.get(t)}},t.prototype.setAt=function(t,n){if(n==null)console.error("ArraySchema items cannot be null nor undefined; Use `deleteAt(index)` instead.");else if(this.$items.get(t)!==n){n.$changes!==void 0&&n.$changes.setParent(this,this.$changes.root,t);var r=this.$changes.indexes[t]?.op??e.OPERATION.ADD;this.$changes.indexes[t]=t,this.$indexes.set(t,t),this.$items.set(t,n),this.$changes.change(t,r)}},t.prototype.deleteAt=function(e){var t=Array.from(this.$items.keys())[e];return t!==void 0&&this.$deleteAt(t)},t.prototype.$deleteAt=function(e){return this.$changes.delete(e),this.$indexes.delete(e),this.$items.delete(e)},t.prototype.clear=function(t){this.$changes.discard(!0,!0),this.$changes.indexes={},this.$indexes.clear(),t&&l.call(this,t),this.$items.clear(),this.$changes.operation({index:0,op:e.OPERATION.CLEAR}),this.$changes.touchParents()},t.prototype.concat=function(){for(var e,n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];return new(t.bind.apply(t,i([void 0],(e=Array.from(this.$items.values())).concat.apply(e,n),!1)))},t.prototype.join=function(e){return Array.from(this.$items.values()).join(e)},t.prototype.reverse=function(){var e=this,t=Array.from(this.$items.keys());return Array.from(this.$items.values()).reverse().forEach(function(n,r){e.setAt(t[r],n)}),this},t.prototype.shift=function(){var e=Array.from(this.$items.keys()).shift();if(e!==void 0){var t=this.$items.get(e);return this.$deleteAt(e),t}},t.prototype.slice=function(e,n){var r=new t;return r.push.apply(r,Array.from(this.$items.values()).slice(e,n)),r},t.prototype.sort=function(e){var t=this;e===void 0&&(e=d);var n=Array.from(this.$items.keys());return Array.from(this.$items.values()).sort(e).forEach(function(e,r){t.setAt(n[r],e)}),this},t.prototype.splice=function(e,t){t===void 0&&(t=this.length-e);for(var n=[...arguments].slice(2),r=Array.from(this.$items.keys()),i=[],a=e;a<e+t;a++)i.push(this.$items.get(r[a])),this.$deleteAt(r[a]);for(var a=0;a<n.length;a++)this.setAt(e+a,n[a]);return i},t.prototype.unshift=function(){for(var e=this,t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];var r=this.length,i=t.length,a=Array.from(this.$items.values());return t.forEach(function(t,n){e.setAt(n,t)}),a.forEach(function(t,n){e.setAt(i+n,t)}),r+i},t.prototype.indexOf=function(e,t){return Array.from(this.$items.values()).indexOf(e,t)},t.prototype.lastIndexOf=function(e,t){return t===void 0&&(t=this.length-1),Array.from(this.$items.values()).lastIndexOf(e,t)},t.prototype.every=function(e,t){return Array.from(this.$items.values()).every(e,t)},t.prototype.some=function(e,t){return Array.from(this.$items.values()).some(e,t)},t.prototype.forEach=function(e,t){Array.from(this.$items.values()).forEach(e,t)},t.prototype.map=function(e,t){return Array.from(this.$items.values()).map(e,t)},t.prototype.filter=function(e,t){return Array.from(this.$items.values()).filter(e,t)},t.prototype.reduce=function(e,t){return Array.prototype.reduce.apply(Array.from(this.$items.values()),arguments)},t.prototype.reduceRight=function(e,t){return Array.prototype.reduceRight.apply(Array.from(this.$items.values()),arguments)},t.prototype.find=function(e,t){return Array.from(this.$items.values()).find(e,t)},t.prototype.findIndex=function(e,t){return Array.from(this.$items.values()).findIndex(e,t)},t.prototype.fill=function(e,t,n){throw Error(`ArraySchema#fill() not implemented`)},t.prototype.copyWithin=function(e,t,n){throw Error(`ArraySchema#copyWithin() not implemented`)},t.prototype.toString=function(){return this.$items.toString()},t.prototype.toLocaleString=function(){return this.$items.toLocaleString()},t.prototype[Symbol.iterator]=function(){return Array.from(this.$items.values())[Symbol.iterator]()},Object.defineProperty(t,Symbol.species,{get:function(){return t},enumerable:!1,configurable:!0}),t.prototype.entries=function(){return this.$items.entries()},t.prototype.keys=function(){return this.$items.keys()},t.prototype.values=function(){return this.$items.values()},t.prototype.includes=function(e,t){return Array.from(this.$items.values()).includes(e,t)},t.prototype.flatMap=function(e,t){throw Error(`ArraySchema#flatMap() is not supported.`)},t.prototype.flat=function(e){throw Error(`ArraySchema#flat() is not supported.`)},t.prototype.findLast=function(){var e=Array.from(this.$items.values());return e.findLast.apply(e,arguments)},t.prototype.findLastIndex=function(){var e=Array.from(this.$items.values());return e.findLastIndex.apply(e,arguments)},t.prototype.with=function(e,n){var r=Array.from(this.$items.values());return r[e]=n,new(t.bind.apply(t,i([void 0],r,!1)))},t.prototype.toReversed=function(){return Array.from(this.$items.values()).reverse()},t.prototype.toSorted=function(e){return Array.from(this.$items.values()).sort(e)},t.prototype.toSpliced=function(e,t){var n=Array.from(this.$items.values());return n.toSpliced.apply(n,arguments)},t.prototype.setIndex=function(e,t){this.$indexes.set(e,t)},t.prototype.getIndex=function(e){return this.$indexes.get(e)},t.prototype.getByIndex=function(e){return this.$items.get(this.$indexes.get(e))},t.prototype.deleteByIndex=function(e){var t=this.$indexes.get(e);this.$items.delete(t),this.$indexes.delete(e)},t.prototype.toArray=function(){return Array.from(this.$items.values())},t.prototype.toJSON=function(){return this.toArray().map(function(e){return typeof e.toJSON==`function`?e.toJSON():e})},t.prototype.clone=function(e){return e?new(t.bind.apply(t,i([void 0],Array.from(this.$items.values()),!1))):new(t.bind.apply(t,i([void 0],this.map(function(e){return e.$changes?e.clone():e}),!1)))},t}();function m(e){return e.$proxy=!0,e=new Proxy(e,{get:function(e,t){return typeof t!=`symbol`&&e[t]===void 0?e.get(t):e[t]},set:function(e,t,n){return typeof t!=`symbol`&&t.indexOf(`$`)===-1&&t!==`onAdd`&&t!==`onRemove`&&t!==`onChange`?e.set(t,n):e[t]=n,!0},deleteProperty:function(e,t){return e.delete(t),!0}}),e}var h=function(){function t(e){var n=this;if(this.$changes=new s(this),this.$items=new Map,this.$indexes=new Map,this.$refId=0,e){if(e instanceof Map||e instanceof t)e.forEach(function(e,t){return n.set(t,e)});else for(var r in e)this.set(r,e[r])}}return t.prototype.onAdd=function(t,n){return n===void 0&&(n=!0),c(this.$callbacks||={},e.OPERATION.ADD,t,n?this.$items:void 0)},t.prototype.onRemove=function(t){return c(this.$callbacks||={},e.OPERATION.DELETE,t)},t.prototype.onChange=function(t){return c(this.$callbacks||={},e.OPERATION.REPLACE,t)},t.is=function(e){return e.map!==void 0},t.prototype[Symbol.iterator]=function(){return this.$items[Symbol.iterator]()},Object.defineProperty(t.prototype,Symbol.toStringTag,{get:function(){return this.$items[Symbol.toStringTag]},enumerable:!1,configurable:!0}),Object.defineProperty(t,Symbol.species,{get:function(){return t},enumerable:!1,configurable:!0}),t.prototype.set=function(t,n){if(n==null)throw Error(`MapSchema#set('${t}', ${n}): trying to set ${n} value on '${t}'.`);t=t.toString();var r=this.$changes.indexes[t]!==void 0,i=r?this.$changes.indexes[t]:this.$refId++,a=r?e.OPERATION.REPLACE:e.OPERATION.ADD,o=n.$changes!==void 0;if(o&&n.$changes.setParent(this,this.$changes.root,i),!r)this.$changes.indexes[t]=i,this.$indexes.set(i,t);else if(!o&&this.$items.get(t)===n)return;else o&&this.$items.get(t)!==n&&(a=e.OPERATION.ADD);return this.$items.set(t,n),this.$changes.change(t,a),this},t.prototype.get=function(e){return this.$items.get(e)},t.prototype.delete=function(e){return this.$changes.delete(e.toString()),this.$items.delete(e)},t.prototype.clear=function(t){this.$changes.discard(!0,!0),this.$changes.indexes={},this.$indexes.clear(),t&&l.call(this,t),this.$items.clear(),this.$changes.operation({index:0,op:e.OPERATION.CLEAR}),this.$changes.touchParents()},t.prototype.has=function(e){return this.$items.has(e)},t.prototype.forEach=function(e){this.$items.forEach(e)},t.prototype.entries=function(){return this.$items.entries()},t.prototype.keys=function(){return this.$items.keys()},t.prototype.values=function(){return this.$items.values()},Object.defineProperty(t.prototype,"size",{get:function(){return this.$items.size},enumerable:!1,configurable:!0}),t.prototype.setIndex=function(e,t){this.$indexes.set(e,t)},t.prototype.getIndex=function(e){return this.$indexes.get(e)},t.prototype.getByIndex=function(e){return this.$items.get(this.$indexes.get(e))},t.prototype.deleteByIndex=function(e){var t=this.$indexes.get(e);this.$items.delete(t),this.$indexes.delete(e)},t.prototype.toJSON=function(){var e={};return this.forEach(function(t,n){e[n]=typeof t.toJSON==`function`?t.toJSON():t}),e},t.prototype.clone=function(e){var n;return e?n=Object.assign(new t,this):(n=new t,this.forEach(function(e,t){e.$changes?n.set(t,e.clone()):n.set(t,e)})),n},t}(),g={};function _(e,t){g[e]=t}function v(e){return g[e]}var y=function(){function e(){this.indexes={},this.fieldsByIndex={},this.deprecated={},this.descriptors={}}return e.create=function(t){var n=new e;return n.schema=Object.assign({},t&&t.schema||{}),n.indexes=Object.assign({},t&&t.indexes||{}),n.fieldsByIndex=Object.assign({},t&&t.fieldsByIndex||{}),n.descriptors=Object.assign({},t&&t.descriptors||{}),n.deprecated=Object.assign({},t&&t.deprecated||{}),n},e.prototype.addField=function(e,t){var n=this.getNextFieldIndex();this.fieldsByIndex[n]=e,this.indexes[e]=n,this.schema[e]=Array.isArray(t)?{array:t[0]}:t},e.prototype.hasField=function(e){return this.indexes[e]!==void 0},e.prototype.addFilter=function(e,t){return this.filters||(this.filters={},this.indexesWithFilters=[]),this.filters[this.indexes[e]]=t,this.indexesWithFilters.push(this.indexes[e]),!0},e.prototype.addChildrenFilter=function(e,t){var n=this.indexes[e],r=this.schema[e];if(v(Object.keys(r)[0]))return this.childFilters||={},this.childFilters[n]=t,!0;console.warn(`@filterChildren: field '${e}' can't have children. Ignoring filter.`)},e.prototype.getChildrenFilter=function(e){return this.childFilters&&this.childFilters[this.indexes[e]]},e.prototype.getNextFieldIndex=function(){return Object.keys(this.schema||{}).length},e}();function b(e){return e._context&&e._context.useFilters}var x=function(){function e(){this.types={},this.schemas=new Map,this.useFilters=!1}return e.prototype.has=function(e){return this.schemas.has(e)},e.prototype.get=function(e){return this.types[e]},e.prototype.add=function(e,t){t===void 0&&(t=this.schemas.size),e._definition=y.create(e._definition),e._typeid=t,this.types[t]=e,this.schemas.set(e,t)},e.create=function(t){return t===void 0&&(t={}),function(n){return t.context||(t.context=new e),C(n,t)}},e}(),S=new x;function C(e,t){return t===void 0&&(t={}),function(n,r){var a=t.context||S,o=n.constructor;if(o._context=a,!e)throw Error(`${o.name}: @type() reference provided for "${r}" is undefined. Make sure you don't have any circular dependencies.`);a.has(o)||a.add(o);var s=o._definition;if(s.addField(r,e),s.descriptors[r]){if(s.deprecated[r])return;try{throw Error(`@colyseus/schema: Duplicate '${r}' definition on '${o.name}'.
Check @type() annotation`)}catch(e){var c=e.stack.split(`
`)[4].trim();throw Error(`${e.message} ${c}`)}}var l=p.is(e),u=!l&&h.is(e);if(typeof e!=`string`&&!Pe.is(e)){var d=Object.values(e)[0];typeof d!=`string`&&!a.has(d)&&a.add(d)}if(t.manual)s.descriptors[r]={enumerable:!0,configurable:!0,writable:!0};else{var g=`_${r}`;s.descriptors[g]={enumerable:!1,configurable:!1,writable:!0},s.descriptors[r]={get:function(){return this[g]},set:function(e){e!==this[g]&&(e==null?this[g]!==void 0&&this.$changes.delete(r):(l&&!(e instanceof p)&&(e=new(p.bind.apply(p,i([void 0],e,!1)))),u&&!(e instanceof h)&&(e=new h(e)),e.$proxy===void 0&&(u?e=m(e):l&&(e=f(e))),this.$changes.change(r),e.$changes&&e.$changes.setParent(this,this.$changes.root,this._definition.indexes[r])),this[g]=e)},enumerable:!0,configurable:!0}}}}function w(e){return function(t,n){var r=t.constructor;r._definition.addFilter(n,e)&&(r._context.useFilters=!0)}}function T(e){return function(t,n){var r=t.constructor;r._definition.addChildrenFilter(n,e)&&(r._context.useFilters=!0)}}function E(e){return e===void 0&&(e=!0),function(t,n){var r=t.constructor._definition;r.deprecated[n]=!0,e&&(r.descriptors[n]={get:function(){throw Error(`${n} is deprecated.`)},set:function(e){},enumerable:!1,configurable:!0})}}function D(e,t,n){for(var r in n===void 0&&(n={}),n.context||(n.context=e._context||n.context||S),t)C(t[r],n)(e.prototype,r);return e}function O(e){for(var t=0,n=0,r=0,i=e.length;r<i;r++)t=e.charCodeAt(r),t<128?n+=1:t<2048?n+=2:t<55296||t>=57344?n+=3:(r++,n+=4);return n}function k(e,t,n){for(var r=0,i=0,a=n.length;i<a;i++)r=n.charCodeAt(i),r<128?e[t++]=r:r<2048?(e[t++]=192|r>>6,e[t++]=128|r&63):r<55296||r>=57344?(e[t++]=224|r>>12,e[t++]=128|r>>6&63,e[t++]=128|r&63):(i++,r=65536+((r&1023)<<10|n.charCodeAt(i)&1023),e[t++]=240|r>>18,e[t++]=128|r>>12&63,e[t++]=128|r>>6&63,e[t++]=128|r&63)}function A(e,t){e.push(t&255)}function j(e,t){e.push(t&255)}function M(e,t){e.push(t&255),e.push(t>>8&255)}function N(e,t){e.push(t&255),e.push(t>>8&255)}function P(e,t){e.push(t&255),e.push(t>>8&255),e.push(t>>16&255),e.push(t>>24&255)}function F(e,t){var n=t>>24,r=t>>16,i=t>>8,a=t;e.push(a&255),e.push(i&255),e.push(r&255),e.push(n&255)}function I(e,t){var n=Math.floor(t/2**32);F(e,t>>>0),F(e,n)}function L(e,t){var n=t/2**32|0;F(e,t>>>0),F(e,n)}function ee(e,t){B(e,t)}function te(e,t){re(e,t)}var R=new Int32Array(2),z=new Float32Array(R.buffer),ne=new Float64Array(R.buffer);function B(e,t){z[0]=t,P(e,R[0])}function re(e,t){ne[0]=t,P(e,R[0]),P(e,R[1])}function ie(e,t){return j(e,+!!t)}function ae(e,t){t||=``;var n=O(t),r=0;if(n<32)e.push(n|160),r=1;else if(n<256)e.push(217),j(e,n),r=2;else if(n<65536)e.push(218),N(e,n),r=3;else if(n<4294967296)e.push(219),F(e,n),r=5;else throw Error(`String too long`);return k(e,e.length,t),r+n}function V(e,t){return isNaN(t)?V(e,0):isFinite(t)?t===(t|0)?t>=0?t<128?(j(e,t),1):t<256?(e.push(204),j(e,t),2):t<65536?(e.push(205),N(e,t),3):t<4294967296?(e.push(206),F(e,t),5):(e.push(207),L(e,t),9):t>=-32?(e.push(224|t+32),1):t>=-128?(e.push(208),A(e,t),2):t>=-32768?(e.push(209),M(e,t),3):t>=-2147483648?(e.push(210),P(e,t),5):(e.push(211),I(e,t),9):(e.push(203),re(e,t),9):V(e,t>0?2**53-1:-(2**53-1))}var oe=Object.freeze({__proto__:null,boolean:ie,float32:ee,float64:te,int16:M,int32:P,int64:I,int8:A,number:V,string:ae,uint16:N,uint32:F,uint64:L,uint8:j,utf8Write:k,writeFloat32:B,writeFloat64:re});function se(e,t,n){for(var r=``,i=0,a=t,o=t+n;a<o;a++){var s=e[a];s&128?(s&224)==192?r+=String.fromCharCode((s&31)<<6|e[++a]&63):(s&240)==224?r+=String.fromCharCode((s&15)<<12|(e[++a]&63)<<6|e[++a]&63):(s&248)==240?(i=(s&7)<<18|(e[++a]&63)<<12|(e[++a]&63)<<6|e[++a]&63,i>=65536?(i-=65536,r+=String.fromCharCode((i>>>10)+55296,(i&1023)+56320)):r+=String.fromCharCode(i)):console.error(`Invalid byte `+s.toString(16)):r+=String.fromCharCode(s)}return r}function H(e,t){return ce(e,t)<<24>>24}function ce(e,t){return e[t.offset++]}function le(e,t){return ue(e,t)<<16>>16}function ue(e,t){return e[t.offset++]|e[t.offset++]<<8}function de(e,t){return e[t.offset++]|e[t.offset++]<<8|e[t.offset++]<<16|e[t.offset++]<<24}function fe(e,t){return de(e,t)>>>0}function pe(e,t){return _e(e,t)}function me(e,t){return K(e,t)}function U(e,t){var n=fe(e,t);return de(e,t)*2**32+n}function he(e,t){var n=fe(e,t);return fe(e,t)*2**32+n}var W=new Int32Array(2),ge=new Float32Array(W.buffer),G=new Float64Array(W.buffer);function _e(e,t){return W[0]=de(e,t),ge[0]}function K(e,t){return W[0]=de(e,t),W[1]=de(e,t),G[0]}function q(e,t){return ce(e,t)>0}function ve(e,t){var n=e[t.offset++],r;n<192?r=n&31:n===217?r=ce(e,t):n===218?r=ue(e,t):n===219&&(r=fe(e,t));var i=se(e,t.offset,r);return t.offset+=r,i}function ye(e,t){var n=e[t.offset];return n<192&&n>160||n===217||n===218||n===219}function be(e,t){var n=e[t.offset++];if(n<128)return n;if(n===202)return _e(e,t);if(n===203)return K(e,t);if(n===204)return ce(e,t);if(n===205)return ue(e,t);if(n===206)return fe(e,t);if(n===207)return he(e,t);if(n===208)return H(e,t);if(n===209)return le(e,t);if(n===210)return de(e,t);if(n===211)return U(e,t);if(n>223)return(255-n+1)*-1}function xe(e,t){var n=e[t.offset];return n<128||n>=202&&n<=211}function Se(e,t){return e[t.offset]<160}function Ce(e,t){return e[t.offset-1]===a&&(e[t.offset]<128||e[t.offset]>=202&&e[t.offset]<=211)}var we=Object.freeze({__proto__:null,arrayCheck:Se,boolean:q,float32:pe,float64:me,int16:le,int32:de,int64:U,int8:H,number:be,numberCheck:xe,readFloat32:_e,readFloat64:K,string:ve,stringCheck:ye,switchStructureCheck:Ce,uint16:ue,uint32:fe,uint64:he,uint8:ce}),Te=function(){function t(e){var t=this;this.$changes=new s(this),this.$items=new Map,this.$indexes=new Map,this.$refId=0,e&&e.forEach(function(e){return t.add(e)})}return t.prototype.onAdd=function(t,n){return n===void 0&&(n=!0),c(this.$callbacks||=[],e.OPERATION.ADD,t,n?this.$items:void 0)},t.prototype.onRemove=function(t){return c(this.$callbacks||=[],e.OPERATION.DELETE,t)},t.prototype.onChange=function(t){return c(this.$callbacks||=[],e.OPERATION.REPLACE,t)},t.is=function(e){return e.collection!==void 0},t.prototype.add=function(e){var t=this.$refId++;return e.$changes!==void 0&&e.$changes.setParent(this,this.$changes.root,t),this.$changes.indexes[t]=t,this.$indexes.set(t,t),this.$items.set(t,e),this.$changes.change(t),t},t.prototype.at=function(e){var t=Array.from(this.$items.keys())[e];return this.$items.get(t)},t.prototype.entries=function(){return this.$items.entries()},t.prototype.delete=function(e){for(var t=this.$items.entries(),n,r;(r=t.next())&&!r.done;)if(e===r.value[1]){n=r.value[0];break}return n!==void 0&&(this.$changes.delete(n),this.$indexes.delete(n),this.$items.delete(n))},t.prototype.clear=function(t){this.$changes.discard(!0,!0),this.$changes.indexes={},this.$indexes.clear(),t&&l.call(this,t),this.$items.clear(),this.$changes.operation({index:0,op:e.OPERATION.CLEAR}),this.$changes.touchParents()},t.prototype.has=function(e){return Array.from(this.$items.values()).some(function(t){return t===e})},t.prototype.forEach=function(e){var t=this;this.$items.forEach(function(n,r,i){return e(n,r,t)})},t.prototype.values=function(){return this.$items.values()},Object.defineProperty(t.prototype,"size",{get:function(){return this.$items.size},enumerable:!1,configurable:!0}),t.prototype.setIndex=function(e,t){this.$indexes.set(e,t)},t.prototype.getIndex=function(e){return this.$indexes.get(e)},t.prototype.getByIndex=function(e){return this.$items.get(this.$indexes.get(e))},t.prototype.deleteByIndex=function(e){var t=this.$indexes.get(e);this.$items.delete(t),this.$indexes.delete(e)},t.prototype.toArray=function(){return Array.from(this.$items.values())},t.prototype.toJSON=function(){var e=[];return this.forEach(function(t,n){e.push(typeof t.toJSON==`function`?t.toJSON():t)}),e},t.prototype.clone=function(e){var n;return e?n=Object.assign(new t,this):(n=new t,this.forEach(function(e){e.$changes?n.add(e.clone()):n.add(e)})),n},t}(),Ee=function(){function t(e){var t=this;this.$changes=new s(this),this.$items=new Map,this.$indexes=new Map,this.$refId=0,e&&e.forEach(function(e){return t.add(e)})}return t.prototype.onAdd=function(t,n){return n===void 0&&(n=!0),c(this.$callbacks||=[],e.OPERATION.ADD,t,n?this.$items:void 0)},t.prototype.onRemove=function(t){return c(this.$callbacks||=[],e.OPERATION.DELETE,t)},t.prototype.onChange=function(t){return c(this.$callbacks||=[],e.OPERATION.REPLACE,t)},t.is=function(e){return e.set!==void 0},t.prototype.add=function(t){if(this.has(t))return!1;var n=this.$refId++;t.$changes!==void 0&&t.$changes.setParent(this,this.$changes.root,n);var r=this.$changes.indexes[n]?.op??e.OPERATION.ADD;return this.$changes.indexes[n]=n,this.$indexes.set(n,n),this.$items.set(n,t),this.$changes.change(n,r),n},t.prototype.entries=function(){return this.$items.entries()},t.prototype.delete=function(e){for(var t=this.$items.entries(),n,r;(r=t.next())&&!r.done;)if(e===r.value[1]){n=r.value[0];break}return n!==void 0&&(this.$changes.delete(n),this.$indexes.delete(n),this.$items.delete(n))},t.prototype.clear=function(t){this.$changes.discard(!0,!0),this.$changes.indexes={},this.$indexes.clear(),t&&l.call(this,t),this.$items.clear(),this.$changes.operation({index:0,op:e.OPERATION.CLEAR}),this.$changes.touchParents()},t.prototype.has=function(e){for(var t=this.$items.values(),n=!1,r;(r=t.next())&&!r.done;)if(e===r.value){n=!0;break}return n},t.prototype.forEach=function(e){var t=this;this.$items.forEach(function(n,r,i){return e(n,r,t)})},t.prototype.values=function(){return this.$items.values()},Object.defineProperty(t.prototype,"size",{get:function(){return this.$items.size},enumerable:!1,configurable:!0}),t.prototype.setIndex=function(e,t){this.$indexes.set(e,t)},t.prototype.getIndex=function(e){return this.$indexes.get(e)},t.prototype.getByIndex=function(e){return this.$items.get(this.$indexes.get(e))},t.prototype.deleteByIndex=function(e){var t=this.$indexes.get(e);this.$items.delete(t),this.$indexes.delete(e)},t.prototype.toArray=function(){return Array.from(this.$items.values())},t.prototype.toJSON=function(){var e=[];return this.forEach(function(t,n){e.push(typeof t.toJSON==`function`?t.toJSON():t)}),e},t.prototype.clone=function(e){var n;return e?n=Object.assign(new t,this):(n=new t,this.forEach(function(e){e.$changes?n.add(e.clone()):n.add(e)})),n},t}(),De=function(){function e(){this.refIds=new WeakSet,this.containerIndexes=new WeakMap}return e.prototype.addRefId=function(e){this.refIds.has(e)||(this.refIds.add(e),this.containerIndexes.set(e,new Set))},e.get=function(t){return t.$filterState===void 0&&(t.$filterState=new e),t.$filterState},e}(),Oe=function(){function e(){this.refs=new Map,this.refCounts={},this.deletedRefs=new Set,this.nextUniqueId=0}return e.prototype.getNextUniqueId=function(){return this.nextUniqueId++},e.prototype.addRef=function(e,t,n){n===void 0&&(n=!0),this.refs.set(e,t),n&&(this.refCounts[e]=(this.refCounts[e]||0)+1)},e.prototype.removeRef=function(e){var t=this.refCounts[e];t===void 0?console.warn(`trying to remove reference ${e} that doesn't exist`):t===0?console.warn(`trying to remove reference ${e} with 0 refCount`):(this.refCounts[e]=t-1,this.deletedRefs.add(e))},e.prototype.clearRefs=function(){this.refs.clear(),this.deletedRefs.clear(),this.refCounts={}},e.prototype.garbageCollectDeletedRefs=function(){var e=this;this.deletedRefs.forEach(function(t){if(!(e.refCounts[t]>0)){var n=e.refs.get(t);if(n instanceof Pe)for(var r in n._definition.schema)typeof n._definition.schema[r]!=`string`&&n[r]&&n[r].$changes&&e.removeRef(n[r].$changes.refId);else{var i=n.$changes.parent._definition,a=i.schema[i.fieldsByIndex[n.$changes.parentIndex]];typeof Object.values(a)[0]==`function`&&Array.from(n.values()).forEach(function(t){return e.removeRef(t.$changes.refId)})}e.refs.delete(t),delete e.refCounts[t]}}),this.deletedRefs.clear()},e}(),ke=function(e){n(t,e);function t(){return e!==null&&e.apply(this,arguments)||this}return t}(Error);function Ae(e,t,n,r){var i,a=!1;switch(t){case`number`:case`int8`:case`uint8`:case`int16`:case`uint16`:case`int32`:case`uint32`:case`int64`:case`uint64`:case`float32`:case`float64`:i=`number`,isNaN(e)&&console.log(`trying to encode "NaN" in ${n.constructor.name}#${r}`);break;case`string`:i=`string`,a=!0;break;case`boolean`:return}if(typeof e!==i&&(!a||a&&e!==null)){var o=`'${JSON.stringify(e)}'${e&&e.constructor&&` (${e.constructor.name})`||``}`;throw new ke(`a '${i}' was expected, but ${o} was provided in ${n.constructor.name}#${r}`)}}function je(e,t,n,r){if(!(e instanceof t))throw new ke(`a '${t.name}' was expected, but '${e.constructor.name}' was provided in ${n.constructor.name}#${r}`)}function Me(e,t,n,r,i){Ae(n,e,r,i);var a=oe[e];if(a)a(t,n);else throw new ke(`a '${e}' was expected, but ${n} was provided in ${r.constructor.name}#${i}`)}function Ne(e,t,n){return we[e](t,n)}var Pe=function(){function t(){var e=[...arguments];Object.defineProperties(this,{$changes:{value:new s(this,void 0,new Oe),enumerable:!1,writable:!0},$callbacks:{value:void 0,enumerable:!1,writable:!0}});var t=this._definition.descriptors;t&&Object.defineProperties(this,t),e[0]&&this.assign(e[0])}return t.onError=function(e){console.error(e)},t.is=function(e){return e._definition&&e._definition.schema!==void 0},t.prototype.onChange=function(t){return c(this.$callbacks||={},e.OPERATION.REPLACE,t)},t.prototype.onRemove=function(t){return c(this.$callbacks||={},e.OPERATION.DELETE,t)},t.prototype.assign=function(e){return Object.assign(this,e),this},Object.defineProperty(t.prototype,"_definition",{get:function(){return this.constructor._definition},enumerable:!1,configurable:!0}),t.prototype.setDirty=function(e,t){this.$changes.change(e,t)},t.prototype.listen=function(e,t,n){var r=this;return n===void 0&&(n=!0),this.$callbacks||={},this.$callbacks[e]||(this.$callbacks[e]=[]),this.$callbacks[e].push(t),n&&this[e]!==void 0&&t(this[e],void 0),function(){return u(r.$callbacks[e],r.$callbacks[e].indexOf(t))}},t.prototype.decode=function(n,r,i){r===void 0&&(r={offset:0}),i===void 0&&(i=this);var o=[],s=this.$changes.root,c=n.length,l=0;for(s.refs.set(l,this);r.offset<c;){var u=n[r.offset++];if(u==a){l=be(n,r);var d=s.refs.get(l);if(!d)throw Error(`"refId" not found: ${l}`);i=d}else{var f=i.$changes,m=i._definition!==void 0,g=m?u>>6<<6:u;if(g===e.OPERATION.CLEAR)i.clear(o);else{var _=m?u%(g||255):be(n,r),y=m?i._definition.fieldsByIndex[_]:``,b=f.getType(_),x=void 0,S=void 0,C=void 0;if(m?S=i[`_${y}`]:(S=i.getByIndex(_),(g&e.OPERATION.ADD)===e.OPERATION.ADD?(C=i instanceof h?ve(n,r):_,i.setIndex(_,C)):C=i.getIndex(_)),(g&e.OPERATION.DELETE)===e.OPERATION.DELETE&&(g!==e.OPERATION.DELETE_AND_ADD&&i.deleteByIndex(_),S&&S.$changes&&s.removeRef(S.$changes.refId),x=null),y===void 0){console.warn(`@colyseus/schema: definition mismatch`);for(var w={offset:r.offset};r.offset<c&&!(Ce(n,r)&&(w.offset=r.offset+1,s.refs.has(be(n,w))));)r.offset++}else{if(g!==e.OPERATION.DELETE){if(t.is(b)){var T=be(n,r);if(x=s.refs.get(T),g!==e.OPERATION.REPLACE){var E=this.getSchemaType(n,r,b);x||(x=this.createTypeInstance(E),x.$changes.refId=T,S&&(x.$callbacks=S.$callbacks,S.$changes.refId&&T!==S.$changes.refId&&s.removeRef(S.$changes.refId))),s.addRef(T,x,x!==S)}}else if(typeof b==`string`)x=Ne(b,n,r);else{var D=v(Object.keys(b)[0]),O=be(n,r),k=s.refs.has(O)?S||s.refs.get(O):new D.constructor;if(x=k.clone(!0),x.$changes.refId=O,S&&(x.$callbacks=S.$callbacks,S.$changes.refId&&O!==S.$changes.refId)){s.removeRef(S.$changes.refId);for(var A=S.entries(),j=void 0;(j=A.next())&&!j.done;){var M=j.value,N=M[0],P=M[1];o.push({refId:O,op:e.OPERATION.DELETE,field:N,value:void 0,previousValue:P})}}s.addRef(O,x,k!==S)}}if(x!=null){if(x.$changes&&x.$changes.setParent(f.ref,f.root,_),i instanceof t)i[y]=x;else if(i instanceof h){var N=C;i.$items.set(N,x),i.$changes.allChanges.add(_)}else if(i instanceof p)i.setAt(_,x);else if(i instanceof Te){var F=i.add(x);i.setIndex(_,F)}else if(i instanceof Ee){var F=i.add(x);F!==!1&&i.setIndex(_,F)}}S!==x&&o.push({refId:l,op:g,field:y,dynamicIndex:C,value:x,previousValue:S})}}}}return this._triggerChanges(o),s.garbageCollectDeletedRefs(),o},t.prototype.encode=function(n,r,i){n===void 0&&(n=!1),r===void 0&&(r=[]),i===void 0&&(i=!1);for(var o=this.$changes,s=new WeakSet,c=[o],l=1,u=0;u<l;u++){var d=c[u],f=d.ref,p=f instanceof t;d.ensureRefId(),s.add(d),d!==o&&(d.changed||n)&&(j(r,a),V(r,d.refId));for(var m=n?Array.from(d.allChanges):Array.from(d.changes.values()),g=0,_=m.length;g<_;g++){var y=n?{op:e.OPERATION.ADD,index:m[g]}:m[g],b=y.index,x=p?f._definition.fieldsByIndex&&f._definition.fieldsByIndex[b]:b,S=r.length;if(y.op!==e.OPERATION.TOUCH){if(p)j(r,b|y.op);else{if(j(r,y.op),y.op===e.OPERATION.CLEAR)continue;V(r,b)}}if(!p&&(y.op&e.OPERATION.ADD)==e.OPERATION.ADD&&f instanceof h){var C=d.ref.$indexes.get(b);ae(r,C)}if(y.op!==e.OPERATION.DELETE){var w=d.getType(b),T=d.getValue(b);if(T&&T.$changes&&!s.has(T.$changes)&&(c.push(T.$changes),T.$changes.ensureRefId(),l++),y.op!==e.OPERATION.TOUCH){if(t.is(w))je(T,w,f,x),V(r,T.$changes.refId),(y.op&e.OPERATION.ADD)===e.OPERATION.ADD&&this.tryEncodeTypeId(r,w,T.constructor);else if(typeof w==`string`)Me(w,r,T,f,x);else{var E=v(Object.keys(w)[0]);je(f[`_${x}`],E.constructor,f,x),V(r,T.$changes.refId)}i&&d.cache(b,r.slice(S))}}}!n&&!i&&d.discard()}return r},t.prototype.encodeAll=function(e){return this.encode(!0,[],e)},t.prototype.applyFilters=function(n,r){r===void 0&&(r=!1);for(var i=this,o=new Set,s=De.get(n),c=[this.$changes],l=1,u=[],d=function(d){var f=c[d];if(o.has(f.refId))return`continue`;var p=f.ref,m=p instanceof t;j(u,a),V(u,f.refId);var g=s.refIds.has(f),_=r||!g;s.addRefId(f);var v=s.containerIndexes.get(f),y=_?Array.from(f.allChanges):Array.from(f.changes.values());!r&&m&&p._definition.indexesWithFilters&&p._definition.indexesWithFilters.forEach(function(t){!v.has(t)&&f.allChanges.has(t)&&(_?y.push(t):y.push({op:e.OPERATION.ADD,index:t}))});for(var b=0,x=y.length;b<x;b++){var S=_?{op:e.OPERATION.ADD,index:y[b]}:y[b];if(S.op===e.OPERATION.CLEAR)j(u,S.op);else{var C=S.index;if(S.op===e.OPERATION.DELETE)m?j(u,S.op|C):(j(u,S.op),V(u,C));else{var w=f.getValue(C),T=f.getType(C);if(m){var E=p._definition.filters&&p._definition.filters[C];if(E&&!E.call(p,n,w,i)){w&&w.$changes&&o.add(w.$changes.refId);continue}}else{var D=f.parent,E=f.getChildrenFilter();if(E&&!E.call(D,n,p.$indexes.get(C),w,i)){w&&w.$changes&&o.add(w.$changes.refId);continue}}if(w.$changes&&(c.push(w.$changes),l++),S.op!==e.OPERATION.TOUCH){if(S.op===e.OPERATION.ADD||m)u.push.apply(u,f.caches[C]??[]),v.add(C);else if(v.has(C))u.push.apply(u,f.caches[C]??[]);else{if(v.add(C),j(u,e.OPERATION.ADD),V(u,C),p instanceof h){var O=f.ref.$indexes.get(C);ae(u,O)}w.$changes?V(u,w.$changes.refId):oe[T](u,w)}}else if(w.$changes&&!m){if(j(u,e.OPERATION.ADD),V(u,C),p instanceof h){var O=f.ref.$indexes.get(C);ae(u,O)}V(u,w.$changes.refId)}}}}},f=0;f<l;f++)d(f);return u},t.prototype.clone=function(){var e=new this.constructor;for(var t in this._definition.schema)e[t]=typeof this[t]==`object`&&typeof this[t]?.clone==`function`?this[t].clone():this[t];return e},t.prototype.toJSON=function(){var e=this._definition.schema,t=this._definition.deprecated,n={};for(var r in e)!t[r]&&this[r]!==null&&this[r]!==void 0&&(n[r]=typeof this[r].toJSON==`function`?this[r].toJSON():this[`_${r}`]);return n},t.prototype.discardAllChanges=function(){this.$changes.discardAll()},t.prototype.getByIndex=function(e){return this[this._definition.fieldsByIndex[e]]},t.prototype.deleteByIndex=function(e){this[this._definition.fieldsByIndex[e]]=void 0},t.prototype.tryEncodeTypeId=function(e,t,n){t._typeid!==n._typeid&&(j(e,o),V(e,n._typeid))},t.prototype.getSchemaType=function(e,t,n){var r;return e[t.offset]===o&&(t.offset++,r=this.constructor._context.get(be(e,t))),r||n},t.prototype.createTypeInstance=function(e){var t=new e;return t.$changes.root=this.$changes.root,t},t.prototype._triggerChanges=function(n){for(var r,i,a,o,s,c,l,u,d=new Set,f=this.$changes.root.refs,p=function(p){var m=n[p],h=m.refId,g=f.get(h),_=g.$callbacks;if((m.op&e.OPERATION.DELETE)===e.OPERATION.DELETE&&m.previousValue instanceof t&&((r=m.previousValue.$callbacks?.[e.OPERATION.DELETE])==null||r.forEach(function(e){return e()})),!_)return`continue`;if(g instanceof t){if(!d.has(h))try{(i=_?.[e.OPERATION.REPLACE])==null||i.forEach(function(e){return e()})}catch(e){t.onError(e)}try{_.hasOwnProperty(m.field)&&((a=_[m.field])==null||a.forEach(function(e){return e(m.value,m.previousValue)}))}catch(e){t.onError(e)}}else m.op===e.OPERATION.ADD&&m.previousValue===void 0?(o=_[e.OPERATION.ADD])==null||o.forEach(function(e){return e(m.value,m.dynamicIndex??m.field)}):m.op===e.OPERATION.DELETE?m.previousValue!==void 0&&((s=_[e.OPERATION.DELETE])==null||s.forEach(function(e){return e(m.previousValue,m.dynamicIndex??m.field)})):m.op===e.OPERATION.DELETE_AND_ADD&&(m.previousValue!==void 0&&((c=_[e.OPERATION.DELETE])==null||c.forEach(function(e){return e(m.previousValue,m.dynamicIndex??m.field)})),(l=_[e.OPERATION.ADD])==null||l.forEach(function(e){return e(m.value,m.dynamicIndex??m.field)})),m.value!==m.previousValue&&((u=_[e.OPERATION.REPLACE])==null||u.forEach(function(e){return e(m.value,m.dynamicIndex??m.field)}));d.add(h)},m=0;m<n.length;m++)p(m)},t._definition=y.create(),t}();function Fe(e){for(var t=[e.$changes],n=1,r={},i=r,a=function(e){var n=t[e];n.changes.forEach(function(e){var t=n.ref,r=e.index,a=t._definition?t._definition.fieldsByIndex[r]:t.$indexes.get(r);i[a]=n.getValue(r)})},o=0;o<n;o++)a(o);return r}var Ie={context:new x},Le=function(e){n(t,e);function t(){return e!==null&&e.apply(this,arguments)||this}return r([C(`string`,Ie)],t.prototype,`name`,void 0),r([C(`string`,Ie)],t.prototype,`type`,void 0),r([C(`number`,Ie)],t.prototype,`referencedType`,void 0),t}(Pe),Re=function(e){n(t,e);function t(){var t=e!==null&&e.apply(this,arguments)||this;return t.fields=new p,t}return r([C(`number`,Ie)],t.prototype,`id`,void 0),r([C([Le],Ie)],t.prototype,`fields`,void 0),t}(Pe),ze=function(e){n(t,e);function t(){var t=e!==null&&e.apply(this,arguments)||this;return t.types=new p,t}return t.encode=function(e){var n=e.constructor,r=new t;r.rootType=n._typeid;var i=function(e,t){for(var n in t){var i=new Le;i.name=n;var a=void 0;if(typeof t[n]==`string`)a=t[n];else{var o=t[n],s=void 0;Pe.is(o)?(a=`ref`,s=t[n]):(a=Object.keys(o)[0],typeof o[a]==`string`?a+=`:`+o[a]:s=o[a]),i.referencedType=s?s._typeid:-1}i.type=a,e.fields.push(i)}r.types.push(e)},a=n._context?.types;for(var o in a){var s=new Re;s.id=Number(o),i(s,a[o]._definition.schema)}return r.encodeAll()},t.decode=function(e,r){var i=new x,a=new t;a.decode(e,r);var o=a.types.reduce(function(e,t){var r=function(e){n(t,e);function t(){return e!==null&&e.apply(this,arguments)||this}return t}(Pe),a=t.id;return e[a]=r,i.add(r,a),e},{});a.types.forEach(function(e){var t=o[e.id];e.fields.forEach(function(e){var n;if(e.referencedType!==void 0){var r=e.type,a=o[e.referencedType];if(!a){var s=e.type.split(`:`);r=s[0],a=s[1]}r===`ref`?C(a,{context:i})(t.prototype,e.name):C((n={},n[r]=a,n),{context:i})(t.prototype,e.name)}else C(e.type,{context:i})(t.prototype,e.name)})});var s=o[a.rootType],c=new s;for(var l in s._definition.schema){var u=s._definition.schema[l];typeof u!=`string`&&(c[l]=typeof u==`function`?new u:new(v(Object.keys(u)[0])).constructor)}return c},r([C([Re],Ie)],t.prototype,`types`,void 0),r([C(`number`,Ie)],t.prototype,`rootType`,void 0),t}(Pe);_(`map`,{constructor:h}),_(`array`,{constructor:p}),_(`set`,{constructor:Ee}),_(`collection`,{constructor:Te}),e.ArraySchema=p,e.CollectionSchema=Te,e.Context=x,e.MapSchema=h,e.Reflection=ze,e.ReflectionField=Le,e.ReflectionType=Re,e.Schema=Pe,e.SchemaDefinition=y,e.SetSchema=Ee,e.decode=we,e.defineTypes=D,e.deprecated=E,e.dumpChanges=Fe,e.encode=oe,e.filter=w,e.filterChildren=T,e.hasFilter=b,e.registerType=_,e.type=C}))})),Oc=a(((e,t,n)=>{var r=n&&n.__createBinding||(Object.create?(function(e,t,n,r){r===void 0&&(r=n);var i=Object.getOwnPropertyDescriptor(t,n);(!i||(`get`in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,i)}):(function(e,t,n,r){r===void 0&&(r=n),e[r]=t[n]})),i=n&&n.__setModuleDefault||(Object.create?(function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}):function(e,t){e.default=t}),a=n&&n.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var n in e)n!=="default"&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return i(t,e),t};Object.defineProperty(e,"__esModule",{value:!0}),e.Room=void 0;var o=a(yc()),s=Sc(),c=Cc(),l=wc(),u=Tc(),d=Ec(),f=Dc(),p=vc();e.Room=class e{constructor(e,t){this.onStateChange=(0,d.createSignal)(),this.onError=(0,d.createSignal)(),this.onLeave=(0,d.createSignal)(),this.onJoin=(0,d.createSignal)(),this.hasJoined=!1,this.onMessageHandlers=(0,u.createNanoEvents)(),this.roomId=null,this.name=e,t&&(this.serializer=new((0,l.getSerializer)(`schema`)),this.rootSchema=t,this.serializer.state=new t),this.onError((e,t)=>console.warn?.call(console,`colyseus.js - onError => (${e}) ${t}`)),this.onLeave(()=>this.removeAllListeners())}get id(){return this.roomId}connect(t,n,r=this,i){let a=new s.Connection;r.connection=a,a.events.onmessage=e.prototype.onMessageCallback.bind(r),a.events.onclose=function(e){var t;r.hasJoined?e.code===p.CloseCode.DEVMODE_RESTART&&n?n():(r.onLeave.invoke(e.code,e.reason),r.destroy()):((t=console.warn)==null||t.call(console,`Room connection was closed unexpectedly (${e.code}): ${e.reason}`),r.onError.invoke(e.code,e.reason))},a.events.onerror=function(e){var t;(t=console.warn)==null||t.call(console,`Room, onError (${e.code}): ${e.reason}`),r.onError.invoke(e.code,e.reason)},a.connect(t,i)}leave(e=!0){return new Promise(t=>{this.onLeave(e=>t(e)),this.connection?e?this.connection.send([c.Protocol.LEAVE_ROOM]):this.connection.close():this.onLeave.invoke(p.CloseCode.CONSENTED)})}onMessage(e,t){return this.onMessageHandlers.on(this.getMessageHandlerKey(e),t)}send(e,t){let n=[c.Protocol.ROOM_DATA];typeof e==`string`?f.encode.string(n,e):f.encode.number(n,e);let r;if(t!==void 0){let e=o.encode(t);r=new Uint8Array(n.length+e.byteLength),r.set(new Uint8Array(n),0),r.set(new Uint8Array(e),n.length)}else r=new Uint8Array(n);this.connection.send(r.buffer)}sendBytes(e,t){let n=[c.Protocol.ROOM_DATA_BYTES];typeof e==`string`?f.encode.string(n,e):f.encode.number(n,e);let r;r=new Uint8Array(n.length+(t.byteLength||t.length)),r.set(new Uint8Array(n),0),r.set(new Uint8Array(t),n.length),this.connection.send(r.buffer)}get state(){return this.serializer.getState()}removeAllListeners(){this.onJoin.clear(),this.onStateChange.clear(),this.onError.clear(),this.onLeave.clear(),this.onMessageHandlers.events={}}onMessageCallback(e){let t=Array.from(new Uint8Array(e.data)),n=t[0];if(n===c.Protocol.JOIN_ROOM){let e=1,n=(0,c.utf8Read)(t,e);if(e+=(0,c.utf8Length)(n),this.serializerId=(0,c.utf8Read)(t,e),e+=(0,c.utf8Length)(this.serializerId),!this.serializer){let e=(0,l.getSerializer)(this.serializerId);this.serializer=new e}t.length>e&&this.serializer.handshake&&this.serializer.handshake(t,{offset:e}),this.reconnectionToken=`${this.roomId}:${n}`,this.hasJoined=!0,this.onJoin.invoke(),this.connection.send([c.Protocol.JOIN_ROOM])}else if(n===c.Protocol.ERROR){let e={offset:1},n=f.decode.number(t,e),r=f.decode.string(t,e);this.onError.invoke(n,r)}else if(n===c.Protocol.LEAVE_ROOM)this.leave();else if(n===c.Protocol.ROOM_DATA_SCHEMA){let e={offset:1},n=this.serializer.getState().constructor._context.get(f.decode.number(t,e)),r=new n;r.decode(t,e),this.dispatchMessage(n,r)}else if(n===c.Protocol.ROOM_STATE)t.shift(),this.setState(t);else if(n===c.Protocol.ROOM_STATE_PATCH)t.shift(),this.patch(t);else if(n===c.Protocol.ROOM_DATA){let n={offset:1},r=f.decode.stringCheck(t,n)?f.decode.string(t,n):f.decode.number(t,n),i=t.length>n.offset?o.decode(e.data,n.offset):void 0;this.dispatchMessage(r,i)}else if(n===c.Protocol.ROOM_DATA_BYTES){let e={offset:1},n=f.decode.stringCheck(t,e)?f.decode.string(t,e):f.decode.number(t,e);this.dispatchMessage(n,new Uint8Array(t.slice(e.offset)))}}setState(e){this.serializer.setState(e),this.onStateChange.invoke(this.serializer.getState())}patch(e){this.serializer.patch(e),this.onStateChange.invoke(this.serializer.getState())}dispatchMessage(e,t){var n;let r=this.getMessageHandlerKey(e);this.onMessageHandlers.events[r]?this.onMessageHandlers.emit(r,t):this.onMessageHandlers.events[`*`]?this.onMessageHandlers.emit(`*`,e,t):(n=console.warn)==null||n.call(console,`colyseus.js: onMessage() not registered for type '${e}'.`)}destroy(){this.serializer&&this.serializer.teardown()}getMessageHandlerKey(e){switch(typeof e){case`function`:return`$${e._typeid}`;case`string`:return e;case`number`:return`i${e}`;default:throw Error(`invalid message type.`)}}}})),kc=o({del:()=>Fc,get:()=>Mc,patch:()=>Pc,post:()=>Nc,put:()=>Ic,send:()=>jc});function Ac(e,t){t.headers=e.headers||{},t.statusMessage=e.statusText,t.statusCode=e.status,t.data=e.response}function jc(e,t,n){return new Promise(function(r,i){n||={};var a=new XMLHttpRequest,o,s,c,l=n.body,u=n.headers||{};for(o in n.timeout&&(a.timeout=n.timeout),a.ontimeout=a.onerror=function(e){e.timeout=e.type==`timeout`,i(e)},a.open(e,t.href||t),a.onload=function(){for(c=a.getAllResponseHeaders().trim().split(/[\r\n]+/),Ac(a,a);s=c.shift();)s=s.split(`: `),a.headers[s.shift().toLowerCase()]=s.join(`: `);if(s=a.headers[`content-type`],s&&~s.indexOf(`application/json`))try{a.data=JSON.parse(a.data,n.reviver)}catch(e){return Ac(a,e),i(e)}(a.status>=400?i:r)(a)},typeof FormData<`u`&&l instanceof FormData||l&&typeof l==`object`&&(u[`content-type`]=`application/json`,l=JSON.stringify(l)),a.withCredentials=!!n.withCredentials,u)a.setRequestHeader(o,u[o]);a.send(l)})}var Mc,Nc,Pc,Fc,Ic,Lc=i((()=>{Mc=jc.bind(jc,`GET`),Nc=jc.bind(jc,`POST`),Pc=jc.bind(jc,`PATCH`),Fc=jc.bind(jc,`DELETE`),Ic=jc.bind(jc,`PUT`)})),Rc=a(((e,t,n)=>{var r=n&&n.__createBinding||(Object.create?(function(e,t,n,r){r===void 0&&(r=n);var i=Object.getOwnPropertyDescriptor(t,n);(!i||(`get`in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,i)}):(function(e,t,n,r){r===void 0&&(r=n),e[r]=t[n]})),i=n&&n.__setModuleDefault||(Object.create?(function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}):function(e,t){e.default=t}),a=n&&n.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var n in e)n!=="default"&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return i(t,e),t};Object.defineProperty(e,"__esModule",{value:!0}),e.HTTP=void 0;var o=vc(),s=a((Lc(),c(kc)));e.HTTP=class{constructor(e,t={}){this.client=e,this.headers=t}get(e,t={}){return this.request(`get`,e,t)}post(e,t={}){return this.request(`post`,e,t)}del(e,t={}){return this.request(`del`,e,t)}put(e,t={}){return this.request(`put`,e,t)}request(e,t,n={}){return s[e](this.client.getHttpEndpoint(t),this.getOptions(n)).catch(e=>{let t=e.statusCode,n=e.data?.error||e.statusMessage||e.message;throw!t&&!n?e:new o.ServerError(t,n)})}getOptions(e){return e.headers=Object.assign({},this.headers,e.headers),this.authToken&&(e.headers.Authorization=`Bearer ${this.authToken}`),typeof cc<`u`&&cc.sys&&cc.sys.isNative||(e.withCredentials=!0),e}}})),zc=a((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.getItem=e.removeItem=e.setItem=void 0;var t;function n(){if(!t)try{t=typeof cc<`u`&&cc.sys&&cc.sys.localStorage?cc.sys.localStorage:window.localStorage}catch{}return t||={cache:{},setItem:function(e,t){this.cache[e]=t},getItem:function(e){this.cache[e]},removeItem:function(e){delete this.cache[e]}},t}function r(e,t){n().setItem(e,t)}e.setItem=r;function i(e){n().removeItem(e)}e.removeItem=i;function a(e,t){let r=n().getItem(e);typeof Promise>`u`||!(r instanceof Promise)?t(r):r.then(e=>t(e))}e.getItem=a})),Bc=a(((e,t,n)=>{var r=n&&n.__awaiter||function(e,t,n,r){function i(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||=Promise)(function(n,a){function o(e){try{c(r.next(e))}catch(e){a(e)}}function s(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){e.done?n(e.value):i(e.value).then(o,s)}c((r=r.apply(e,t||[])).next())})},i=n&&n.__classPrivateFieldGet||function(e,t,n,r){if(n===`a`&&!r)throw TypeError(`Private accessor was defined without a getter`);if(typeof t==`function`?e!==t||!r:!t.has(e))throw TypeError(`Cannot read private member from an object whose class did not declare it`);return n===`m`?r:n===`a`?r.call(e):r?r.value:t.get(e)},a=n&&n.__classPrivateFieldSet||function(e,t,n,r,i){if(r===`m`)throw TypeError(`Private method is not writable`);if(r===`a`&&!i)throw TypeError(`Private accessor was defined without a setter`);if(typeof t==`function`?e!==t||!i:!t.has(e))throw TypeError(`Cannot write private member to an object whose class did not declare it`);return r===`a`?i.call(e,n):i?i.value=n:t.set(e,n),n},o,s,c,l;Object.defineProperty(e,"__esModule",{value:!0}),e.Auth=void 0;var u=zc(),d=Tc();e.Auth=class{constructor(e){this.http=e,this.settings={path:`/auth`,key:`colyseus-auth-token`},o.set(this,!1),s.set(this,void 0),c.set(this,void 0),l.set(this,(0,d.createNanoEvents)()),(0,u.getItem)(this.settings.key,e=>this.token=e)}set token(e){this.http.authToken=e}get token(){return this.http.authToken}onChange(e){let t=i(this,l,`f`).on(`change`,e);return i(this,o,`f`)||a(this,s,new Promise((e,t)=>{this.getUserData().then(e=>{this.emitChange(Object.assign(Object.assign({},e),{token:this.token}))}).catch(e=>{this.emitChange({user:null,token:void 0})}).finally(()=>{e()})}),`f`),a(this,o,!0,`f`),t}getUserData(){return r(this,void 0,void 0,function*(){if(this.token)return(yield this.http.get(`${this.settings.path}/userdata`)).data;throw Error(`missing auth.token`)})}registerWithEmailAndPassword(e,t,n){return r(this,void 0,void 0,function*(){let r=(yield this.http.post(`${this.settings.path}/register`,{body:{email:e,password:t,options:n}})).data;return this.emitChange(r),r})}signInWithEmailAndPassword(e,t){return r(this,void 0,void 0,function*(){let n=(yield this.http.post(`${this.settings.path}/login`,{body:{email:e,password:t}})).data;return this.emitChange(n),n})}signInAnonymously(e){return r(this,void 0,void 0,function*(){let t=(yield this.http.post(`${this.settings.path}/anonymous`,{body:{options:e}})).data;return this.emitChange(t),t})}sendPasswordResetEmail(e){return r(this,void 0,void 0,function*(){return(yield this.http.post(`${this.settings.path}/forgot-password`,{body:{email:e}})).data})}signInWithProvider(e,t={}){return r(this,void 0,void 0,function*(){return new Promise((n,r)=>{let o=t.width||480,s=t.height||768,l=this.token?`?token=${this.token}`:``,u=`Login with ${e[0].toUpperCase()+e.substring(1)}`,d=this.http.client.getHttpEndpoint(`${t.prefix||`${this.settings.path}/provider`}/${e}${l}`),f=screen.width/2-o/2,p=screen.height/2-s/2;a(this,c,window.open(d,u,`toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=`+o+`, height=`+s+`, top=`+p+`, left=`+f),`f`);let m=e=>{(e.data.user!==void 0||e.data.token!==void 0)&&(clearInterval(h),i(this,c,`f`).close(),a(this,c,void 0,`f`),window.removeEventListener(`message`,m),e.data.error===void 0?(n(e.data),this.emitChange(e.data)):r(e.data.error))},h=setInterval(()=>{(!i(this,c,`f`)||i(this,c,`f`).closed)&&(a(this,c,void 0,`f`),r(`cancelled`),window.removeEventListener(`message`,m))},200);window.addEventListener(`message`,m)})})}signOut(){return r(this,void 0,void 0,function*(){this.emitChange({user:null,token:null})})}emitChange(e){e.token!==void 0&&(this.token=e.token,e.token===null?(0,u.removeItem)(this.settings.key):(0,u.setItem)(this.settings.key,e.token)),i(this,l,`f`).emit(`change`,e)}},o=new WeakMap,s=new WeakMap,c=new WeakMap,l=new WeakMap})),Vc=a((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.discordURLBuilder=void 0;function t(e){let t=(window==null?void 0:window.location)?.hostname||`localhost`,n=e.hostname.split(`.`),r=!e.hostname.includes(`trycloudflare.com`)&&!e.hostname.includes(`discordsays.com`)&&n.length>2?`/${n[0]}`:``;return e.pathname.startsWith(`/.proxy`)?`${e.protocol}//${t}${r}${e.pathname}${e.search}`:`${e.protocol}//${t}/.proxy/colyseus${r}${e.pathname}${e.search}`}e.discordURLBuilder=t})),Hc=a(((e,t,n)=>{var r=n&&n.__awaiter||function(e,t,n,r){function i(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||=Promise)(function(n,a){function o(e){try{c(r.next(e))}catch(e){a(e)}}function s(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){e.done?n(e.value):i(e.value).then(o,s)}c((r=r.apply(e,t||[])).next())})};Object.defineProperty(e,"__esModule",{value:!0}),e.Client=e.MatchMakeError=void 0;var i=vc(),a=Oc(),o=Rc(),s=Bc(),c=Vc(),l=class e extends Error{constructor(t,n){super(t),this.code=n,Object.setPrototypeOf(this,e.prototype)}};e.MatchMakeError=l;var u=typeof window<`u`&&(window==null?void 0:window.location)?.hostname!==void 0?`${window.location.protocol.replace(`http`,`ws`)}//${window.location.hostname}${window.location.port&&`:${window.location.port}`}`:`ws://127.0.0.1:2567`;e.Client=class{constructor(e=u,t){if(typeof e==`string`){let t=e.startsWith(`/`)?new URL(e,u):new URL(e),n=t.protocol===`https:`||t.protocol===`wss:`,r=Number(t.port||(n?443:80));this.settings={hostname:t.hostname,pathname:t.pathname,port:r,secure:n}}else e.port===void 0&&(e.port=e.secure?443:80),e.pathname===void 0&&(e.pathname=``),this.settings=e;this.settings.pathname.endsWith(`/`)&&(this.settings.pathname=this.settings.pathname.slice(0,-1)),this.http=new o.HTTP(this,t?.headers||{}),this.auth=new s.Auth(this.http),this.urlBuilder=t?.urlBuilder,!this.urlBuilder&&typeof window<`u`&&((window==null?void 0:window.location)?.hostname)?.includes(`discordsays.com`)&&(this.urlBuilder=c.discordURLBuilder,console.log(`Colyseus SDK: Discord Embedded SDK detected. Using custom URL builder.`))}joinOrCreate(e,t={},n){return r(this,void 0,void 0,function*(){return yield this.createMatchMakeRequest(`joinOrCreate`,e,t,n)})}create(e,t={},n){return r(this,void 0,void 0,function*(){return yield this.createMatchMakeRequest(`create`,e,t,n)})}join(e,t={},n){return r(this,void 0,void 0,function*(){return yield this.createMatchMakeRequest(`join`,e,t,n)})}joinById(e,t={},n){return r(this,void 0,void 0,function*(){return yield this.createMatchMakeRequest(`joinById`,e,t,n)})}reconnect(e,t){return r(this,void 0,void 0,function*(){if(typeof e==`string`&&typeof t==`string`)throw Error("DEPRECATED: .reconnect() now only accepts 'reconnectionToken' as argument.\nYou can get this token from previously connected `room.reconnectionToken`");let[n,r]=e.split(`:`);if(!n||!r)throw Error(`Invalid reconnection token format.
The format should be roomId:reconnectionToken`);return yield this.createMatchMakeRequest(`reconnect`,n,{reconnectionToken:r},t)})}getAvailableRooms(e=``){return r(this,void 0,void 0,function*(){return(yield this.http.get(`matchmake/${e}`,{headers:{Accept:`application/json`}})).data})}consumeSeatReservation(e,t,n){return r(this,void 0,void 0,function*(){let a=this.createRoom(e.room.name,t);a.roomId=e.room.roomId,a.sessionId=e.sessionId;let o={sessionId:a.sessionId};e.reconnectionToken&&(o.reconnectionToken=e.reconnectionToken);let s=n||a;return a.connect(this.buildEndpoint(e.room,o),e.devMode&&(()=>r(this,void 0,void 0,function*(){console.info(`[Colyseus devMode]: ${String.fromCodePoint(128260)} Re-establishing connection with room id '${a.roomId}'...`);let n=0,i=()=>r(this,void 0,void 0,function*(){n++;try{yield this.consumeSeatReservation(e,t,s),console.info(`[Colyseus devMode]: ${String.fromCodePoint(9989)} Successfully re-established connection with room '${a.roomId}'`)}catch{n<8?(console.info(`[Colyseus devMode]: ${String.fromCodePoint(128260)} retrying... (${n} out of 8)`),setTimeout(i,2e3)):console.info(`[Colyseus devMode]: ${String.fromCodePoint(10060)} Failed to reconnect. Is your server running? Please check server logs.`)}});setTimeout(i,2e3)})),s,this.http.headers),new Promise((e,t)=>{let n=(e,n)=>t(new i.ServerError(e,n));s.onError.once(n),s.onJoin.once(()=>{s.onError.remove(n),e(s)})})})}createMatchMakeRequest(e,t,n={},i,a){return r(this,void 0,void 0,function*(){let r=(yield this.http.post(`matchmake/${e}/${t}`,{headers:{Accept:`application/json`,"Content-Type":`application/json`},body:JSON.stringify(n)})).data;if(r.error)throw new l(r.error,r.code);return e===`reconnect`&&(r.reconnectionToken=n.reconnectionToken),yield this.consumeSeatReservation(r,i,a)})}createRoom(e,t){return new a.Room(e,t)}buildEndpoint(e,t={}){let n=[];for(let e in t)t.hasOwnProperty(e)&&n.push(`${e}=${t[e]}`);let r=this.settings.secure?`wss://`:`ws://`;e.publicAddress?r+=`${e.publicAddress}`:r+=`${this.settings.hostname}${this.getEndpointPort()}${this.settings.pathname}`;let i=`${r}/${e.processId}/${e.roomId}?${n.join(`&`)}`;return this.urlBuilder?this.urlBuilder(new URL(i)):i}getHttpEndpoint(e=``){let t=e.startsWith(`/`)?e:`/${e}`,n=`${this.settings.secure?`https`:`http`}://${this.settings.hostname}${this.getEndpointPort()}${this.settings.pathname}${t}`;return this.urlBuilder?this.urlBuilder(new URL(n)):n}getEndpointPort(){return this.settings.port!==80&&this.settings.port!==443?`:${this.settings.port}`:``}}})),Uc=a((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.SchemaSerializer=void 0;var t=Dc();e.SchemaSerializer=class{setState(e){return this.state.decode(e)}getState(){return this.state}patch(e){return this.state.decode(e)}teardown(){var e;(e=this.state?.$changes)==null||e.root.clearRefs()}handshake(e,n){this.state?new t.Reflection().decode(e,n):this.state=t.Reflection.decode(e,n)}}})),Wc=a((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.NoneSerializer=void 0,e.NoneSerializer=class{setState(e){}getState(){return null}patch(e){}teardown(){}handshake(e){}}})),Gc=a((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.SchemaSerializer=e.registerSerializer=e.Auth=e.Room=e.ErrorCode=e.Protocol=e.MatchMakeError=e.Client=void 0,_c();var t=Hc();Object.defineProperty(e,"Client",{enumerable:!0,get:function(){return t.Client}}),Object.defineProperty(e,"MatchMakeError",{enumerable:!0,get:function(){return t.MatchMakeError}});var n=Cc();Object.defineProperty(e,"Protocol",{enumerable:!0,get:function(){return n.Protocol}}),Object.defineProperty(e,"ErrorCode",{enumerable:!0,get:function(){return n.ErrorCode}});var r=Oc();Object.defineProperty(e,"Room",{enumerable:!0,get:function(){return r.Room}});var i=Bc();Object.defineProperty(e,"Auth",{enumerable:!0,get:function(){return i.Auth}});var a=Uc();Object.defineProperty(e,"SchemaSerializer",{enumerable:!0,get:function(){return a.SchemaSerializer}});var o=Wc(),s=wc();Object.defineProperty(e,"registerSerializer",{enumerable:!0,get:function(){return s.registerSerializer}}),(0,s.registerSerializer)(`schema`,a.SchemaSerializer),(0,s.registerSerializer)(`none`,o.NoneSerializer)})),Kc,qc,Jc=i((()=>{Kc=Gc(),qc=class e{name;room=null;identity=null;disposed=!1;reconnecting=!1;onState=()=>{};onIdentity=()=>{};onEvent=()=>{};onStatus=()=>{};client=new Kc.Client(`${location.protocol===`https:`?`wss:`:`ws:`}//${location.host}`);constructor(e){this.name=e}static saved(){try{let e=JSON.parse(localStorage.getItem(`wtk.session`)||`null`);return e?.token&&e?.roomId?e:null}catch{return null}}async connect(t,n,r,i=!1,a=``){this.onStatus(`กำลังเชื่อมต่อ`);try{let o;if(t===`reconnect`){let t=e.saved();if(!t||!n||t.roomId!==n||a&&t.playerId!==a)throw Error(`ไม่พบการเชื่อมต่อเดิมของผู้เล่นในห้องนี้`);if(typeof t.token!=`string`||t.token.split(`:`)[0]!==n)throw Error(`ข้อมูลเชื่อมต่อเดิมไม่ตรงกับห้องนี้`);o=await this.client.reconnect(t.token)}else o=t===`join`?await this.client.joinById(n,{playerName:this.name}):await this.client.create(`wtk_room`,{playerName:this.name,mode:r,sandbox:i,_action:`create`});this.bind(o)}catch(e){if(this.disposed)return;throw this.onStatus(`เชื่อมต่อไม่สำเร็จ`),this.onEvent(`game_error`,{message:e.message||`ไม่พบห้องหรือห้องเริ่มเกมแล้ว`}),e}}bind(e){this.disposed?this.closeRoom(e):(this.room=e,this.reconnecting=!1,this.onStatus(`เชื่อมต่อแล้ว`),e.onMessage(`*`,(t,n)=>{if(this.disposed)return;let r=String(t);if([`room_created`,`room_joined`,`reconnect_success`].includes(r)){this.identity={roomId:n.roomId||e.id,playerId:n.playerId};try{localStorage.setItem(`wtk.session`,JSON.stringify({...this.identity,token:e.reconnectionToken,name:this.name}))}catch{}this.onIdentity(this.identity)}else r===`room_state_update`?this.onState(n):this.onEvent(r,n)}),e.onError((e,t)=>{this.disposed||this.onEvent(`game_error`,{message:t||`การเชื่อมต่อมีปัญหา`})}),e.onLeave(t=>{this.room===e&&(this.room=null,!this.disposed&&t!==1e3&&this.reconnect(e.reconnectionToken))}),e.send(`request_state`,{}))}async reconnect(e){if(this.reconnecting||this.disposed)return;this.reconnecting=!0;let t=Date.now()+45e3;for(this.onStatus(`สัญญาณหลุด กำลังกลับเข้าห้องเดิม`);!this.disposed&&Date.now()<t;)try{this.bind(await this.client.reconnect(e));return}catch{await new Promise(e=>setTimeout(e,1500))}this.disposed||(this.reconnecting=!1,localStorage.removeItem(`wtk.session`),this.onStatus(`หมดช่วง reconnect`),this.onEvent(`game_error`,{message:`กลับเข้าห้องไม่ทัน 45 วินาที ผู้เล่นของคุณถูกนับว่าเสียชีวิต`}))}send(e,t={}){this.disposed||(!this.room||this.reconnecting?this.onEvent(`game_error`,{message:`รอการเชื่อมต่อกลับมาก่อน`}):this.room.send(e,t))}leave(){if(this.disposed)return Promise.resolve();this.disposed=!0,this.reconnecting=!1;let e=this.room;this.room=null,this.identity=null;try{localStorage.removeItem(`wtk.session`)}catch{}return e?this.closeRoom(e):Promise.resolve()}closeRoom(e){return new Promise(t=>{let n=!1,r,i=()=>{if(!n){n=!0,r!==void 0&&clearTimeout(r);try{e.connection?.close()}catch{}t()}};r=setTimeout(i,500);try{if(!e.connection?.isOpen){i();return}e.leave(!0).then(i,i)}catch{i()}})}}}));function Yc(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Xc(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Zc(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Qc(){let e=Zc(`canvas`);return e.style.display=`block`,e}function $c(...e){let t=`THREE.`+e.shift();wd?wd(`log`,t,...e):console.log(t,...e)}function el(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function tl(...e){e=el(e);let t=`THREE.`+e.shift();if(wd)wd(`warn`,t,...e);else{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function nl(...e){e=el(e);let t=`THREE.`+e.shift();if(wd)wd(`error`,t,...e);else{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function rl(...e){let t=e.join(` `);t in Cd||(Cd[t]=!0,tl(...e))}function il(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}function al(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Dd[e&255]+Dd[e>>8&255]+Dd[e>>16&255]+Dd[e>>24&255]+`-`+Dd[t&255]+Dd[t>>8&255]+`-`+Dd[t>>16&15|64]+Dd[t>>24&255]+`-`+Dd[n&63|128]+Dd[n>>8&255]+`-`+Dd[n>>16&255]+Dd[n>>24&255]+Dd[r&255]+Dd[r>>8&255]+Dd[r>>16&255]+Dd[r>>24&255]).toLowerCase()}function ol(e,t,n){return Math.max(t,Math.min(n,e))}function sl(e,t){return(e%t+t)%t}function cl(e,t,n){return(1-n)*e+n*t}function ll(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function ul(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function dl(){let e={enabled:!0,workingColorSpace:_d,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=fl(e.r),e.g=fl(e.g),e.b=fl(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=pl(e.r),e.g=pl(e.g),e.b=pl(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?vd:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return rl(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return rl(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[_d]:{primaries:t,whitePoint:r,transfer:vd,toXYZ:Fd,fromXYZ:Id,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:gd},outputColorSpaceConfig:{drawingBufferColorSpace:gd}},[gd]:{primaries:t,whitePoint:r,transfer:yd,toXYZ:Fd,fromXYZ:Id,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:gd}}}),e}function fl(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function pl(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}function ml(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?zd.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(tl(`Texture: Unable to serialize Texture.`),{})}function hl(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}function gl(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){sp.fromArray(e,a);let o=i.x*Math.abs(sp.x)+i.y*Math.abs(sp.y)+i.z*Math.abs(sp.z),s=t.dot(sp),c=n.dot(sp),l=r.dot(sp);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}function _l(e,t,n,r,i,a){Vp.subVectors(e,n).addScalar(.5).multiply(r),i===void 0?Hp.copy(Vp):(Hp.x=a*Vp.x-i*Vp.y,Hp.y=i*Vp.x+a*Vp.y),e.copy(t),e.x+=Hp.x,e.y+=Hp.y,e.applyMatrix4(Up)}function vl(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;pm.copy(s),pm.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(pm);return l<n.near||l>n.far?null:{distance:l,point:pm.clone(),object:e}}function yl(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,sm),e.getVertexPosition(c,cm),e.getVertexPosition(l,lm);let u=vl(e,t,n,r,sm,cm,lm,fm);if(u){let e=new X;qf.getBarycoord(fm,sm,cm,lm,e),i&&(u.uv=qf.getInterpolatedAttribute(i,s,c,l,e,new Y)),a&&(u.uv1=qf.getInterpolatedAttribute(a,s,c,l,e,new Y)),o&&(u.normal=qf.getInterpolatedAttribute(o,s,c,l,e,new X),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new X,materialIndex:0};qf.getNormal(sm,cm,lm,t.normal),u.face=t,u.barycoord=e}return u}function bl(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(Am.fromBufferAttribute(s,i),jm.fromBufferAttribute(s,a),n.distanceSqToSegment(Am,jm,Fm,Im)>r)return;Fm.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(Fm);if(!(c<t.near||c>t.far))return{distance:c,point:Im.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}function xl(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}function Sl(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function Cl(e,t){let n=1-e;return n*n*t}function wl(e,t){return 2*(1-e)*e*t}function Tl(e,t){return e*e*t}function El(e,t,n,r){return Cl(e,t)+wl(e,n)+Tl(e,r)}function Dl(e,t){let n=1-e;return n*n*n*t}function Ol(e,t){let n=1-e;return 3*n*n*e*t}function kl(e,t){return 3*(1-e)*e*e*t}function Al(e,t){return e*e*e*t}function jl(e,t,n,r,i){return Dl(e,t)+Ol(e,n)+kl(e,r)+Al(e,i)}function Ml(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Pl(i))i.isRenderTargetTexture?(tl(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(Pl(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function Nl(e){let t={};for(let n=0;n<e.length;n++){let r=Ml(e[n]);for(let e in r)t[e]=r[e]}return t}function Pl(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function Fl(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Il(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ld.workingColorSpace}function Ll(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function Rl(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}function zl(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function Bl(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function Vl(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=zl(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=Bl(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}function Hl(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}function Ul(e){try{let t=e.slice(e.indexOf(`:`)+1);return new URL(t).protocol===`blob:`}catch{return!1}}function Wl(e,t){return e.distance-t.distance}function Gl(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)Gl(r[e],t,n,!0)}}function Kl(e,t,n,r){let i=ql(r);switch(n){case gu:return e*t;case xu:return e*t/i.components*i.byteLength;case Su:return e*t/i.components*i.byteLength;case Cu:return e*t*2/i.components*i.byteLength;case wu:return e*t*2/i.components*i.byteLength;case _u:return e*t*3/i.components*i.byteLength;case vu:return e*t*4/i.components*i.byteLength;case Tu:return e*t*4/i.components*i.byteLength;case Eu:case Du:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Ou:case ku:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ju:case Nu:return Math.max(e,16)*Math.max(t,8)/4;case Au:case Mu:return Math.max(e,8)*Math.max(t,8)/2;case Pu:case Fu:case Lu:case Ru:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Iu:case zu:case Bu:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Vu:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Hu:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Uu:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Wu:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Gu:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Ku:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case qu:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Ju:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Yu:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Xu:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Zu:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Qu:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case $u:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case ed:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case td:case nd:case rd:return Math.ceil(e/4)*Math.ceil(t/4)*16;case id:case ad:return Math.ceil(e/4)*Math.ceil(t/4)*8;case od:case sd:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function ql(e){switch(e){case ru:case iu:return{byteLength:1,components:1};case ou:case au:case uu:return{byteLength:2,components:1};case du:case fu:return{byteLength:2,components:4};case cu:case su:case lu:return{byteLength:4,components:1};case mu:case hu:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}var Jl,Yl,Xl,Zl,Ql,$l,eu,tu,nu,ru,iu,au,ou,su,cu,lu,uu,du,fu,pu,mu,hu,gu,_u,vu,yu,bu,xu,Su,Cu,wu,Tu,Eu,Du,Ou,ku,Au,ju,Mu,Nu,Pu,Fu,Iu,Lu,Ru,zu,Bu,Vu,Hu,Uu,Wu,Gu,Ku,qu,Ju,Yu,Xu,Zu,Qu,$u,ed,td,nd,rd,id,ad,od,sd,cd,ld,ud,dd,fd,pd,md,hd,gd,_d,vd,yd,bd,xd,Sd,Cd,wd,Td,Ed,Dd,Od,kd,Y,Ad,X,jd,Md,Nd,Pd,Fd,Id,Ld,Rd,zd,Bd,Vd,Hd,Ud,Wd,Gd,Kd,qd,Jd,Yd,Xd,Zd,Qd,$d,ef,tf,nf,rf,af,of,sf,cf,lf,uf,df,ff,pf,mf,hf,gf,_f,vf,yf,bf,xf,Sf,Cf,wf,Tf,Ef,Df,Of,kf,Af,jf,Mf,Nf,Pf,Ff,If,Lf,Rf,zf,Bf,Vf,Hf,Uf,Wf,Gf,Kf,qf,Jf,Yf,Xf,Zf,Qf,$f,ep,tp,np,rp,ip,ap,op,sp,cp,lp,up,dp,fp,pp,mp,hp,gp,_p,vp,yp,bp,xp,Sp,Cp,wp,Tp,Ep,Dp,Op,kp,Ap,jp,Mp,Np,Pp,Fp,Ip,Lp,Rp,zp,Bp,Vp,Hp,Up,Wp,Gp,Kp,qp,Jp,Yp,Xp,Zp,Qp,$p,em,tm,nm,rm,im,am,om,sm,cm,lm,um,dm,fm,pm,mm,hm,gm,_m,vm,ym,bm,xm,Sm,Cm,wm,Tm,Em,Dm,Om,km,Am,jm,Mm,Nm,Pm,Fm,Im,Lm,Rm,zm,Bm,Vm,Hm,Um,Wm,Gm,Km,qm,Jm,Ym,Xm,Zm,Qm,$m,eh,th,nh,rh,ih,ah,oh,sh,ch,lh,uh,dh,fh,ph,mh,hh,gh,_h,vh,yh,bh,xh,Sh,Ch,wh,Th,Eh,Dh,Oh,kh,Ah,jh,Mh,Nh,Ph,Fh,Ih,Lh,Rh,zh,Bh,Vh,Hh,Uh,Wh,Gh,Kh,qh,Jh,Yh,Xh,Zh,Qh,$h,eg,tg,ng,rg,ig,ag,og,sg,cg,lg,ug,dg,fg,pg,mg,hg,gg,_g,vg,yg,bg,xg=i((()=>{Jl=1e3,Yl=1001,Xl=1002,Zl=1003,Ql=1004,$l=1005,eu=1006,tu=1007,nu=1008,ru=1009,iu=1010,au=1011,ou=1012,su=1013,cu=1014,lu=1015,uu=1016,du=1017,fu=1018,pu=1020,mu=35902,hu=35899,gu=1021,_u=1022,vu=1023,yu=1026,bu=1027,xu=1028,Su=1029,Cu=1030,wu=1031,Tu=1033,Eu=33776,Du=33777,Ou=33778,ku=33779,Au=35840,ju=35841,Mu=35842,Nu=35843,Pu=36196,Fu=37492,Iu=37496,Lu=37488,Ru=37489,zu=37490,Bu=37491,Vu=37808,Hu=37809,Uu=37810,Wu=37811,Gu=37812,Ku=37813,qu=37814,Ju=37815,Yu=37816,Xu=37817,Zu=37818,Qu=37819,$u=37820,ed=37821,td=36492,nd=36494,rd=36495,id=36283,ad=36284,od=36285,sd=36286,cd=2300,ld=2301,ud=2302,dd=2303,fd=2400,pd=2401,md=2402,hd=3200,gd=`srgb`,_d=`srgb-linear`,vd=`linear`,yd=`srgb`,bd=7680,xd=35044,Sd=2e3,Cd={},wd=null,Td={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},Ed=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},Dd=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Od=Math.PI/180,kd=180/Math.PI,Y=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ol(this.x,e.x,t.x),this.y=ol(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ol(this.x,e,t),this.y=ol(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ol(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ol(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ad=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:tl(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ol(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},X=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Md.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Md.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ol(this.x,e.x,t.x),this.y=ol(this.y,e.y,t.y),this.z=ol(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ol(this.x,e,t),this.y=ol(this.y,e,t),this.z=ol(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ol(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return jd.copy(this).projectOnVector(e),this.sub(jd)}reflect(e){return this.sub(jd.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ol(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},jd=new X,Md=new Ad,Nd=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return rl(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Pd.makeScale(e,t)),this}rotate(e){return rl(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Pd.makeRotation(-e)),this}translate(e,t){return rl(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Pd.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Pd=new Nd,Fd=new Nd().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Id=new Nd().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715),Ld=dl(),zd=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Rd===void 0&&(Rd=Zc(`canvas`)),Rd.width=e.width,Rd.height=e.height;let t=Rd.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Rd}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Zc(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=fl(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(fl(t[e]/255)*255):t[e]=fl(t[e]);return{data:t,width:e.width,height:e.height}}return tl(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Bd=0,Vd=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Bd++}),this.uuid=al(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(ml(r[t].image)):e.push(ml(r[t]))}else e=ml(r);n.url=e}return t||(e.images[this.uuid]=n),n}},Hd=0,Ud=new X,Wd=class e extends Ed{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=Yl,i=Yl,a=eu,o=nu,s=vu,c=ru,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Hd++}),this.uuid=al(),this.name=``,this.source=new Vd(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new Y(0,0),this.repeat=new Y(1,1),this.center=new Y(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Nd,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ud).x}get height(){return this.source.getSize(Ud).y}get depth(){return this.source.getSize(Ud).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){tl(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?tl(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Jl:e.x-=Math.floor(e.x);break;case Yl:e.x=e.x<0?0:1;break;case Xl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Jl:e.y-=Math.floor(e.y);break;case Yl:e.y=e.y<0?0:1;break;case Xl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}},Wd.DEFAULT_IMAGE=null,Wd.DEFAULT_MAPPING=300,Wd.DEFAULT_ANISOTROPY=1,Gd=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ol(this.x,e.x,t.x),this.y=ol(this.y,e.y,t.y),this.z=ol(this.z,e.z,t.z),this.w=ol(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ol(this.x,e,t),this.y=ol(this.y,e,t),this.z=ol(this.z,e,t),this.w=ol(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ol(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Kd=class extends Ed{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:eu,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Gd(0,0,e,t),this.scissorTest=!1,this.viewport=new Gd(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:n.depth},i=new Wd(r),a=n.count;for(let e=0;e<a;e++)this.textures[e]=i.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:eu,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Vd(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},qd=class extends Kd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Jd=class extends Wd{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Zl,this.minFilter=Zl,this.wrapR=Yl,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Yd=class extends Wd{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Zl,this.minFilter=Zl,this.wrapR=Yl,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},Xd=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Zd.setFromMatrixColumn(e,0).length(),i=1/Zd.setFromMatrixColumn(e,1).length(),a=1/Zd.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose($d,e,ef)}lookAt(e,t,n){let r=this.elements;return rf.subVectors(e,t),rf.lengthSq()===0&&(rf.z=1),rf.normalize(),tf.crossVectors(n,rf),tf.lengthSq()===0&&(Math.abs(n.z)===1?rf.x+=1e-4:rf.z+=1e-4,rf.normalize(),tf.crossVectors(n,rf)),tf.normalize(),nf.crossVectors(rf,tf),r[0]=tf.x,r[4]=nf.x,r[8]=rf.x,r[1]=tf.y,r[5]=nf.y,r[9]=rf.y,r[2]=tf.z,r[6]=nf.z,r[10]=rf.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],P=r[7],F=r[11],I=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*P,i[8]=a*C+o*D+s*j+c*F,i[12]=a*w+o*O+s*M+c*I,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*P,i[9]=l*C+u*D+d*j+f*F,i[13]=l*w+u*O+d*M+f*I,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*P,i[10]=p*C+m*D+h*j+g*F,i[14]=p*w+m*O+h*M+g*I,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*P,i[11]=_*C+v*D+y*j+b*F,i[15]=_*w+v*O+y*M+b*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Zd.set(r[0],r[1],r[2]).length(),o=Zd.set(r[4],r[5],r[6]).length(),s=Zd.set(r[8],r[9],r[10]).length();i<0&&(a=-a),Qd.copy(this);let c=1/a,l=1/o,u=1/s;return Qd.elements[0]*=c,Qd.elements[1]*=c,Qd.elements[2]*=c,Qd.elements[4]*=l,Qd.elements[5]*=l,Qd.elements[6]*=l,Qd.elements[8]*=u,Qd.elements[9]*=u,Qd.elements[10]*=u,t.setFromRotationMatrix(Qd),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Sd,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Sd,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Zd=new X,Qd=new Xd,$d=new X(0,0,0),ef=new X(1,1,1),tf=new X,nf=new X,rf=new X,af=new Xd,of=new Ad,sf=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(ol(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-ol(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(ol(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-ol(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(ol(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-ol(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:tl(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return af.makeRotationFromQuaternion(e),this.setFromRotationMatrix(af,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return of.setFromEuler(this),this.setFromQuaternion(of,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}},sf.DEFAULT_ORDER=`XYZ`,cf=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},lf=0,uf=new X,df=new Ad,ff=new Xd,pf=new X,mf=new X,hf=new X,gf=new Ad,_f=new X(1,0,0),vf=new X(0,1,0),yf=new X(0,0,1),bf={type:`added`},xf={type:`removed`},Sf={type:`childadded`,child:null},Cf={type:`childremoved`,child:null},wf=class e extends Ed{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:lf++}),this.uuid=al(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new X,n=new sf,r=new Ad,i=new X(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Xd},normalMatrix:{value:new Nd}}),this.matrix=new Xd,this.matrixWorld=new Xd,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new cf,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return df.setFromAxisAngle(e,t),this.quaternion.multiply(df),this}rotateOnWorldAxis(e,t){return df.setFromAxisAngle(e,t),this.quaternion.premultiply(df),this}rotateX(e){return this.rotateOnAxis(_f,e)}rotateY(e){return this.rotateOnAxis(vf,e)}rotateZ(e){return this.rotateOnAxis(yf,e)}translateOnAxis(e,t){return uf.copy(e).applyQuaternion(this.quaternion),this.position.add(uf.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(_f,e)}translateY(e){return this.translateOnAxis(vf,e)}translateZ(e){return this.translateOnAxis(yf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ff.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?pf.copy(e):pf.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),mf.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ff.lookAt(mf,pf,this.up):ff.lookAt(pf,mf,this.up),this.quaternion.setFromRotationMatrix(ff),r&&(ff.extractRotation(r.matrixWorld),df.setFromRotationMatrix(ff),this.quaternion.premultiply(df.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(nl(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(bf),Sf.child=e,this.dispatchEvent(Sf),Sf.child=null):nl(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(xf),Cf.child=e,this.dispatchEvent(Cf),Cf.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ff.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ff.multiply(e.parent.matrixWorld)),e.applyMatrix4(ff),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(bf),Sf.child=e,this.dispatchEvent(Sf),Sf.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mf,e,hf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mf,gf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}},wf.DEFAULT_UP=new X(0,1,0),wf.DEFAULT_MATRIX_AUTO_UPDATE=!0,wf.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0,Tf=class extends wf{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Ef={type:`move`},Df=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Tf,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Tf,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new X,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new X),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Tf,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new X,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new X,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ef)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Tf;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Of={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},kf={h:0,s:0,l:0},Af={h:0,s:0,l:0},jf=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=gd){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ld.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Ld.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ld.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Ld.workingColorSpace){if(e=sl(e,1),t=ol(t,0,1),n=ol(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=hl(i,r,e+1/3),this.g=hl(i,r,e),this.b=hl(i,r,e-1/3)}return Ld.colorSpaceToWorking(this,r),this}setStyle(e,t=gd){function n(t){t!==void 0&&parseFloat(t)<1&&tl(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:tl(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);tl(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=gd){let n=Of[e.toLowerCase()];return n===void 0?tl(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=fl(e.r),this.g=fl(e.g),this.b=fl(e.b),this}copyLinearToSRGB(e){return this.r=pl(e.r),this.g=pl(e.g),this.b=pl(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=gd){return Ld.workingToColorSpace(Mf.copy(this),e),Math.round(ol(Mf.r*255,0,255))*65536+Math.round(ol(Mf.g*255,0,255))*256+Math.round(ol(Mf.b*255,0,255))}getHexString(e=gd){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ld.workingColorSpace){Ld.workingToColorSpace(Mf.copy(this),t);let n=Mf.r,r=Mf.g,i=Mf.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Ld.workingColorSpace){return Ld.workingToColorSpace(Mf.copy(this),t),e.r=Mf.r,e.g=Mf.g,e.b=Mf.b,e}getStyle(e=gd){Ld.workingToColorSpace(Mf.copy(this),e);let t=Mf.r,n=Mf.g,r=Mf.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(kf),this.setHSL(kf.h+e,kf.s+t,kf.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(kf),e.getHSL(Af);let n=cl(kf.h,Af.h,t),r=cl(kf.s,Af.s,t),i=cl(kf.l,Af.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Mf=new jf,jf.NAMES=Of,Nf=class extends wf{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new sf,this.environmentIntensity=1,this.environmentRotation=new sf,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Pf=new X,Ff=new X,If=new X,Lf=new X,Rf=new X,zf=new X,Bf=new X,Vf=new X,Hf=new X,Uf=new X,Wf=new Gd,Gf=new Gd,Kf=new Gd,qf=class e{constructor(e=new X,t=new X,n=new X){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Pf.subVectors(e,t),r.cross(Pf);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Pf.subVectors(r,t),Ff.subVectors(n,t),If.subVectors(e,t);let a=Pf.dot(Pf),o=Pf.dot(Ff),s=Pf.dot(If),c=Ff.dot(Ff),l=Ff.dot(If),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Lf)!==null&&Lf.x>=0&&Lf.y>=0&&Lf.x+Lf.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Lf)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Lf.x),s.addScaledVector(a,Lf.y),s.addScaledVector(o,Lf.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Wf.setScalar(0),Gf.setScalar(0),Kf.setScalar(0),Wf.fromBufferAttribute(e,t),Gf.fromBufferAttribute(e,n),Kf.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Wf,i.x),a.addScaledVector(Gf,i.y),a.addScaledVector(Kf,i.z),a}static isFrontFacing(e,t,n,r){return Pf.subVectors(n,t),Ff.subVectors(e,t),Pf.cross(Ff).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Pf.subVectors(this.c,this.b),Ff.subVectors(this.a,this.b),Pf.cross(Ff).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Rf.subVectors(r,n),zf.subVectors(i,n),Vf.subVectors(e,n);let s=Rf.dot(Vf),c=zf.dot(Vf);if(s<=0&&c<=0)return t.copy(n);Hf.subVectors(e,r);let l=Rf.dot(Hf),u=zf.dot(Hf);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Rf,a);Uf.subVectors(e,i);let f=Rf.dot(Uf),p=zf.dot(Uf);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(zf,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Bf.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Bf,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Rf,a).addScaledVector(zf,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Jf=class{constructor(e=new X(1/0,1/0,1/0),t=new X(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Xf.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Xf.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Xf.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Xf):Xf.fromBufferAttribute(r,t),Xf.applyMatrix4(e.matrixWorld),this.expandByPoint(Xf);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),Zf.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Zf.copy(e.boundingBox)),Zf.applyMatrix4(e.matrixWorld),this.union(Zf)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Xf),Xf.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ip),ap.subVectors(this.max,ip),Qf.subVectors(e.a,ip),$f.subVectors(e.b,ip),ep.subVectors(e.c,ip),tp.subVectors($f,Qf),np.subVectors(ep,$f),rp.subVectors(Qf,ep);let t=[0,-tp.z,tp.y,0,-np.z,np.y,0,-rp.z,rp.y,tp.z,0,-tp.x,np.z,0,-np.x,rp.z,0,-rp.x,-tp.y,tp.x,0,-np.y,np.x,0,-rp.y,rp.x,0];return!gl(t,Qf,$f,ep,ap)||(t=[1,0,0,0,1,0,0,0,1],!gl(t,Qf,$f,ep,ap))?!1:(op.crossVectors(tp,np),t=[op.x,op.y,op.z],gl(t,Qf,$f,ep,ap))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Xf).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Xf).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Yf[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Yf[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Yf[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Yf[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Yf[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Yf[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Yf[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Yf[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Yf)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Yf=[new X,new X,new X,new X,new X,new X,new X,new X],Xf=new X,Zf=new Jf,Qf=new X,$f=new X,ep=new X,tp=new X,np=new X,rp=new X,ip=new X,ap=new X,op=new X,sp=new X,cp=new X,lp=new Y,up=0,dp=class extends Ed{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:up++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=xd,this.updateRanges=[],this.gpuType=lu,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)lp.fromBufferAttribute(this,t),lp.applyMatrix3(e),this.setXY(t,lp.x,lp.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)cp.fromBufferAttribute(this,t),cp.applyMatrix3(e),this.setXYZ(t,cp.x,cp.y,cp.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)cp.fromBufferAttribute(this,t),cp.applyMatrix4(e),this.setXYZ(t,cp.x,cp.y,cp.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)cp.fromBufferAttribute(this,t),cp.applyNormalMatrix(e),this.setXYZ(t,cp.x,cp.y,cp.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)cp.fromBufferAttribute(this,t),cp.transformDirection(e),this.setXYZ(t,cp.x,cp.y,cp.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ll(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ul(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ll(t,this.array)),t}setX(e,t){return this.normalized&&(t=ul(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ll(t,this.array)),t}setY(e,t){return this.normalized&&(t=ul(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ll(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ul(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ll(t,this.array)),t}setW(e,t){return this.normalized&&(t=ul(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ul(t,this.array),n=ul(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=ul(t,this.array),n=ul(n,this.array),r=ul(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=ul(t,this.array),n=ul(n,this.array),r=ul(r,this.array),i=ul(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},fp=class extends dp{constructor(e,t,n){super(new Uint16Array(e),t,n)}},pp=class extends dp{constructor(e,t,n){super(new Uint32Array(e),t,n)}},mp=class extends dp{constructor(e,t,n){super(new Float32Array(e),t,n)}},hp=new Jf,gp=new X,_p=new X,vp=class{constructor(e=new X,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?hp.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;gp.subVectors(e,this.center);let t=gp.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(gp,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(_p.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(gp.copy(e.center).add(_p)),this.expandByPoint(gp.copy(e.center).sub(_p))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},yp=0,bp=new Xd,xp=new wf,Sp=new X,Cp=new Jf,wp=new Jf,Tp=new X,Ep=class e extends Ed{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:yp++}),this.uuid=al(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Yc(e)?pp:fp)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new Nd().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return bp.makeRotationFromQuaternion(e),this.applyMatrix4(bp),this}rotateX(e){return bp.makeRotationX(e),this.applyMatrix4(bp),this}rotateY(e){return bp.makeRotationY(e),this.applyMatrix4(bp),this}rotateZ(e){return bp.makeRotationZ(e),this.applyMatrix4(bp),this}translate(e,t,n){return bp.makeTranslation(e,t,n),this.applyMatrix4(bp),this}scale(e,t,n){return bp.makeScale(e,t,n),this.applyMatrix4(bp),this}lookAt(e){return xp.lookAt(e),xp.updateMatrix(),this.applyMatrix4(xp.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Sp).negate(),this.translate(Sp.x,Sp.y,Sp.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new mp(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&tl(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Jf);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)nl(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new X(-1/0,-1/0,-1/0),new X(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Cp.setFromBufferAttribute(n),this.morphTargetsRelative?(Tp.addVectors(this.boundingBox.min,Cp.min),this.boundingBox.expandByPoint(Tp),Tp.addVectors(this.boundingBox.max,Cp.max),this.boundingBox.expandByPoint(Tp)):(this.boundingBox.expandByPoint(Cp.min),this.boundingBox.expandByPoint(Cp.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&nl(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vp);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)nl(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new X,1/0);else if(e){let n=this.boundingSphere.center;if(Cp.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];wp.setFromBufferAttribute(n),this.morphTargetsRelative?(Tp.addVectors(Cp.min,wp.min),Cp.expandByPoint(Tp),Tp.addVectors(Cp.max,wp.max),Cp.expandByPoint(Tp)):(Cp.expandByPoint(wp.min),Cp.expandByPoint(wp.max))}Cp.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Tp.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Tp));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Tp.fromBufferAttribute(a,t),o&&(Sp.fromBufferAttribute(e,t),Tp.add(Sp)),r=Math.max(r,n.distanceToSquared(Tp))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&nl(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){nl(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new dp(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new X,s[e]=new X;let c=new X,l=new X,u=new X,d=new Y,f=new Y,p=new Y,m=new X,h=new X;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new X,y=new X,b=new X,x=new X;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new dp(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new X,i=new X,a=new X,o=new X,s=new X,c=new X,l=new X,u=new X;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Tp.fromBufferAttribute(e,t),Tp.normalize(),e.setXYZ(t,Tp.x,Tp.y,Tp.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new dp(a,r,i)}if(this.index===null)return tl(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Dp=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=xd,this.updateRanges=[],this.version=0,this.uuid=al()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=al()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=al()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},Op=new X,kp=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Op.fromBufferAttribute(this,t),Op.applyMatrix4(e),this.setXYZ(t,Op.x,Op.y,Op.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Op.fromBufferAttribute(this,t),Op.applyNormalMatrix(e),this.setXYZ(t,Op.x,Op.y,Op.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Op.fromBufferAttribute(this,t),Op.transformDirection(e),this.setXYZ(t,Op.x,Op.y,Op.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=ll(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ul(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ul(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ul(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ul(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ul(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ll(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ll(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ll(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ll(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ul(t,this.array),n=ul(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ul(t,this.array),n=ul(n,this.array),r=ul(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ul(t,this.array),n=ul(n,this.array),r=ul(r,this.array),i=ul(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){$c(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new dp(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){$c(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Ap=new X,jp=new X,Mp=new Nd,Np=class{constructor(e=new X(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Ap.subVectors(n,t).cross(jp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Ap),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Mp.getNormalMatrix(e),r=this.coplanarPoint(Ap).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Pp=0,Fp=class extends Ed{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Pp++}),this.uuid=al(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new jf(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=bd,this.stencilZFail=bd,this.stencilZPass=bd,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){tl(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?tl(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new jf().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Np().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new Y().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Y().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Ip=class extends Fp{constructor(e){super(),this.isSpriteMaterial=!0,this.type=`SpriteMaterial`,this.color=new jf(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Rp=new X,zp=new X,Bp=new X,Vp=new Y,Hp=new Y,Up=new Xd,Wp=new X,Gp=new X,Kp=new X,qp=new Y,Jp=new Y,Yp=new Y,Xp=class extends wf{constructor(e=new Ip){if(super(),this.isSprite=!0,this.type=`Sprite`,Lp===void 0){Lp=new Ep;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),t=new Dp(e,5);Lp.setIndex([0,1,2,0,2,3]),Lp.setAttribute(`position`,new kp(t,3,0,!1)),Lp.setAttribute(`uv`,new kp(t,2,3,!1))}this.geometry=Lp,this.material=e,this.center=new Y(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&nl(`Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),zp.setFromMatrixScale(this.matrixWorld),Up.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Bp.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&zp.multiplyScalar(-Bp.z);let n=this.material.rotation,r,i;n!==0&&(i=Math.cos(n),r=Math.sin(n));let a=this.center;_l(Wp.set(-.5,-.5,0),Bp,a,zp,r,i),_l(Gp.set(.5,-.5,0),Bp,a,zp,r,i),_l(Kp.set(.5,.5,0),Bp,a,zp,r,i),qp.set(0,0),Jp.set(1,0),Yp.set(1,1);let o=e.ray.intersectTriangle(Wp,Gp,Kp,!1,Rp);if(o===null&&(_l(Gp.set(-.5,.5,0),Bp,a,zp,r,i),Jp.set(0,1),o=e.ray.intersectTriangle(Wp,Kp,Gp,!1,Rp),o===null))return;let s=e.ray.origin.distanceTo(Rp);s<e.near||s>e.far||t.push({distance:s,point:Rp.clone(),uv:qf.getInterpolation(Rp,Wp,Gp,Kp,qp,Jp,Yp,new Y),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}},Zp=new X,Qp=new X,$p=new X,em=new X,tm=class{constructor(e=new X,t=new X(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Zp)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Zp.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Zp.copy(this.origin).addScaledVector(this.direction,t),Zp.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Qp.copy(e).add(t).multiplyScalar(.5),$p.copy(t).sub(e).normalize(),em.copy(this.origin).sub(Qp);let i=e.distanceTo(t)*.5,a=-this.direction.dot($p),o=em.dot(this.direction),s=-em.dot($p),c=em.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Qp).addScaledVector($p,d),f}intersectSphere(e,t){if(e.radius<0)return null;Zp.subVectors(e.center,this.origin);let n=Zp.dot(this.direction),r=Zp.dot(Zp)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Zp)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,M,N;if(y>=b&&y>=x?(w=s,D=u,A=p,N=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,M=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,M=_)):b>=x?(w=c,D=d,A=m,N=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,M=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,M=v)):(w=l,D=f,A=h,N=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,M=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,M=g)),w===0)return null;let P=S/w,F=C/w,I=1/w,L=T-P*D,ee=E-F*D,te=O-P*A,R=k-F*A,z=j-P*N,ne=M-F*N,B=z*R-ne*te,re=L*ne-ee*z,ie=te*ee-R*L;if(r){if(B<0||re<0||ie<0)return null}else if((B<0||re<0||ie<0)&&(B>0||re>0||ie>0))return null;let ae=B+re+ie;if(ae===0)return null;let V=I*(B*D+re*A+ie*N);return(ae>0?V<0:V>0)?null:this.at(V/ae,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},nm=class extends Fp{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new jf(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new sf,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},rm=new Xd,im=new tm,am=new vp,om=new X,sm=new X,cm=new X,lm=new X,um=new X,dm=new X,fm=new X,pm=new X,mm=class extends wf{constructor(e=new Ep,t=new nm){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){dm.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(um.fromBufferAttribute(s,e),a?dm.addScaledVector(um,r):dm.addScaledVector(um.sub(t),r))}t.add(dm)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),am.copy(n.boundingSphere),am.applyMatrix4(i),im.copy(e.ray).recast(e.near),!(am.containsPoint(im.origin)===!1&&(im.intersectSphere(am,om)===null||im.origin.distanceToSquared(om)>(e.far-e.near)**2))&&(rm.copy(i).invert(),im.copy(e.ray).applyMatrix4(rm),(n.boundingBox===null||im.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,im)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=yl(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=yl(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=yl(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=yl(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}},hm=class extends Wd{constructor(e=null,t=1,n=1,r,i,a,o,s,c=Zl,l=Zl,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},gm=class extends dp{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},_m=new Xd,vm=new Xd,ym=[],bm=new Jf,xm=new Xd,Sm=new mm,Cm=new vp,wm=class extends mm{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new gm(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,xm)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Jf),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,_m),bm.copy(e.boundingBox).applyMatrix4(_m),this.boundingBox.union(bm)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new vp),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,_m),Cm.copy(e.boundingSphere).applyMatrix4(_m),this.boundingSphere.union(Cm)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Sm.geometry=this.geometry,Sm.material=this.material,Sm.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Cm.copy(this.boundingSphere),Cm.applyMatrix4(n),e.ray.intersectsSphere(Cm)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,_m),vm.multiplyMatrices(n,_m),Sm.matrixWorld=vm,Sm.raycast(e,ym);for(let e=0,n=ym.length;e<n;e++){let n=ym[e];n.instanceId=i,n.object=this,t.push(n)}ym.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new gm(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new hm(new Float32Array(r*this.count),r,this.count,xu,lu));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Tm=new vp,Em=new Y(.5,.5),Dm=new X,Om=class{constructor(e=new Np,t=new Np,n=new Np,r=new Np,i=new Np,a=new Np){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Sd,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Tm.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Tm.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Tm)}intersectsSprite(e){Tm.center.set(0,0,0);let t=Em.distanceTo(e.center);return Tm.radius=.7071067811865476+t,Tm.applyMatrix4(e.matrixWorld),this.intersectsSphere(Tm)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Dm.x=r.normal.x>0?e.max.x:e.min.x,Dm.y=r.normal.y>0?e.max.y:e.min.y,Dm.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Dm)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},km=class extends Fp{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new jf(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Am=new X,jm=new X,Mm=new Xd,Nm=new tm,Pm=new vp,Fm=new X,Im=new X,Lm=class extends wf{constructor(e=new Ep,t=new km){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)Am.fromBufferAttribute(t,e-1),jm.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=Am.distanceTo(jm);e.setAttribute(`lineDistance`,new mp(n,1))}else tl(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Pm.copy(n.boundingSphere),Pm.applyMatrix4(r),Pm.radius+=i,e.ray.intersectsSphere(Pm)===!1)return;Mm.copy(r).invert(),Nm.copy(e.ray).applyMatrix4(Mm);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=bl(this,e,Nm,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=bl(this,e,Nm,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=bl(this,e,Nm,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=bl(this,e,Nm,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}},Rm=class extends Wd{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},zm=class extends Wd{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Bm=class extends Wd{constructor(e,t,n=cu,r,i,a,o=Zl,s=Zl,c,l=yu,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Vd(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Vm=class extends Bm{constructor(e,t=cu,n=301,r,i,a=Zl,o=Zl,s,c=yu){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Hm=class extends Wd{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Um=class e extends Ep{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new mp(c,3)),this.setAttribute(`normal`,new mp(l,3)),this.setAttribute(`uv`,new mp(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new X;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Wm=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){tl(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new Y:new X);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new X,r=[],i=[],a=[],o=new X,s=new Xd;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new X)}i[0]=new X,a[0]=new X;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(ol(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(ol(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Gm=class extends Wm{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new Y){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Km=class extends Gm{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}},qm=new X,Jm=new X,Ym=new xl,Xm=new xl,Zm=new xl,Qm=class extends Wm{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new X){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(Jm.subVectors(r[0],r[1]).add(r[0]),c=Jm);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(qm.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=qm),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),Ym.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),Xm.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),Zm.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(Ym.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),Xm.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),Zm.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(Ym.calc(s),Xm.calc(s),Zm.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new X().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}},$m=class extends Wm{constructor(e=new Y,t=new Y,n=new Y,r=new Y){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new Y){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(jl(e,r.x,i.x,a.x,o.x),jl(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},eh=class extends Wm{constructor(e=new X,t=new X,n=new X,r=new X){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new X){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(jl(e,r.x,i.x,a.x,o.x),jl(e,r.y,i.y,a.y,o.y),jl(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},th=class extends Wm{constructor(e=new Y,t=new Y){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new Y){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Y){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},nh=class extends Wm{constructor(e=new X,t=new X){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new X){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new X){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},rh=class extends Wm{constructor(e=new Y,t=new Y,n=new Y){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Y){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(El(e,r.x,i.x,a.x),El(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ih=class extends Wm{constructor(e=new X,t=new X,n=new X){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new X){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(El(e,r.x,i.x,a.x),El(e,r.y,i.y,a.y),El(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ah=class extends Wm{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new Y){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(Sl(o,s.x,c.x,l.x,u.x),Sl(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new Y().fromArray(n))}return this}},oh=Object.freeze({__proto__:null,ArcCurve:Km,CatmullRomCurve3:Qm,CubicBezierCurve:$m,CubicBezierCurve3:eh,EllipseCurve:Gm,LineCurve:th,LineCurve3:nh,QuadraticBezierCurve:rh,QuadraticBezierCurve3:ih,SplineCurve:ah}),sh=class e extends Ep{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new mp(p,3)),this.setAttribute(`normal`,new mp(m,3)),this.setAttribute(`uv`,new mp(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},ch=class e extends Ep{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new X,p=new Y;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new mp(s,3)),this.setAttribute(`normal`,new mp(c,3)),this.setAttribute(`uv`,new mp(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},lh=class e extends Ep{constructor(e=new ih(new X(-1,-1,0),new X(-1,1,0),new X(1,1,0)),t=64,n=1,r=8,i=!1){super(),this.type=`TubeGeometry`,this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:i};let a=e.computeFrenetFrames(t,i);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new X,s=new X,c=new Y,l=new X,u=[],d=[],f=[],p=[];m(),this.setIndex(p),this.setAttribute(`position`,new mp(u,3)),this.setAttribute(`normal`,new mp(d,3)),this.setAttribute(`uv`,new mp(f,2));function m(){for(let e=0;e<t;e++)h(e);h(i===!1?t:0),_(),g()}function h(i){l=e.getPointAt(i/t,l);let c=a.normals[i],f=a.binormals[i];for(let e=0;e<=r;e++){let t=e/r*Math.PI*2,i=Math.sin(t),a=-Math.cos(t);s.x=a*c.x+i*f.x,s.y=a*c.y+i*f.y,s.z=a*c.z+i*f.z,s.normalize(),d.push(s.x,s.y,s.z),o.x=l.x+n*s.x,o.y=l.y+n*s.y,o.z=l.z+n*s.z,u.push(o.x,o.y,o.z)}}function g(){for(let e=1;e<=t;e++)for(let t=1;t<=r;t++){let n=(r+1)*(e-1)+(t-1),i=(r+1)*e+(t-1),a=(r+1)*e+t,o=(r+1)*(e-1)+t;p.push(n,i,o),p.push(i,a,o)}}function _(){for(let e=0;e<=t;e++)for(let n=0;n<=r;n++)c.x=e/t,c.y=n/r,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(t){return new e(new oh[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}},uh={clone:Ml,merge:Nl},dh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,fh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ph=class extends Fp{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=dh,this.fragmentShader=fh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ml(e.uniforms),this.uniformsGroups=Fl(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new jf().setHex(r.value);break;case`v2`:this.uniforms[n].value=new Y().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new X().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Gd().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new Nd().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new Xd().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},mh=class extends ph{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},hh=class extends Fp{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new jf(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new jf(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new Y(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new sf,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},gh=class extends Fp{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=hd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},_h=class extends Fp{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},vh=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},yh=class extends vh{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:fd,endingEnd:fd}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case pd:i=e,o=2*t-n;break;case md:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case pd:a=e,s=2*n-t;break;case md:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},bh=class extends vh{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},xh=class extends vh{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Sh=class extends vh{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=Vl(n,t,g,y,r);i[p]=zl(x,o,_,b,m)}return i}},Ch=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=Ll(t,this.TimeBufferType),this.values=Ll(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ll(e.times,Array),values:Ll(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),Rl(e.settings)&&(n.settings={inTangents:Ll(e.settings.inTangents,Array),outTangents:Ll(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new xh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new bh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new yh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Sh(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case cd:t=this.InterpolantFactoryMethodDiscrete;break;case ld:t=this.InterpolantFactoryMethodLinear;break;case ud:t=this.InterpolantFactoryMethodSmooth;break;case dd:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return tl(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return cd;case this.InterpolantFactoryMethodLinear:return ld;case this.InterpolantFactoryMethodSmooth:return ud;case this.InterpolantFactoryMethodBezier:return dd}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;Rl(this.settings)&&(Hl(this.settings.inTangents,e),Hl(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(nl(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(nl(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){nl(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){nl(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Xc(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){nl(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===ud,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,Rl(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}},Ch.prototype.ValueTypeName=``,Ch.prototype.TimeBufferType=Float32Array,Ch.prototype.ValueBufferType=Float32Array,Ch.prototype.DefaultInterpolation=ld,wh=class extends Ch{constructor(e,t,n){super(e,t,n)}},wh.prototype.ValueTypeName=`bool`,wh.prototype.ValueBufferType=Array,wh.prototype.DefaultInterpolation=cd,wh.prototype.InterpolantFactoryMethodLinear=void 0,wh.prototype.InterpolantFactoryMethodSmooth=void 0,Th=class extends Ch{constructor(e,t,n,r){super(e,t,n,r)}},Th.prototype.ValueTypeName=`color`,Eh=class extends Ch{constructor(e,t,n,r){super(e,t,n,r)}},Eh.prototype.ValueTypeName=`number`,Dh=class extends vh{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Ad.slerpFlat(i,0,a,c-o,a,c,s);return i}},Oh=class extends Ch{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Dh(this.times,this.values,this.getValueSize(),e)}},Oh.prototype.ValueTypeName=`quaternion`,Oh.prototype.InterpolantFactoryMethodSmooth=void 0,kh=class extends Ch{constructor(e,t,n){super(e,t,n)}},kh.prototype.ValueTypeName=`string`,kh.prototype.ValueBufferType=Array,kh.prototype.DefaultInterpolation=cd,kh.prototype.InterpolantFactoryMethodLinear=void 0,kh.prototype.InterpolantFactoryMethodSmooth=void 0,Ah=class extends Ch{constructor(e,t,n,r){super(e,t,n,r)}},Ah.prototype.ValueTypeName=`vector`,jh={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(Ul(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!Ul(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}},Mh=class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},Nh=new Mh,Ph=class{constructor(e){this.manager=e===void 0?Nh:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}},Ph.DEFAULT_MATERIAL_NAME=`__DEFAULT`,Fh=new WeakMap,Ih=class extends Ph{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=jh.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=Fh.get(a);e===void 0&&(e=[],Fh.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=Zc(`img`);function s(){l(),t&&t(this);let n=Fh.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}Fh.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),jh.remove(`image:${e}`);let n=Fh.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}Fh.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),jh.add(`image:${e}`,o),i.manager.itemStart(e),o.src=e,o}},Lh=class extends Ph{constructor(e){super(e)}load(e,t,n,r){let i=new Wd,a=new Ih(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},Rh=class extends wf{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new jf(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},zh=class extends Rh{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(wf.DEFAULT_UP),this.updateMatrix(),this.groundColor=new jf(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Bh=new Xd,Vh=new X,Hh=new X,Uh=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Y(512,512),this.mapType=ru,this.map=null,this.mapPass=null,this.matrix=new Xd,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Om,this._frameExtents=new Y(1,1),this._viewportCount=1,this._viewports=[new Gd(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Vh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Vh),Hh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Hh),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Bh.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Bh,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Bh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Wh=new X,Gh=new Ad,Kh=new X,qh=class extends wf{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new Xd,this.projectionMatrix=new Xd,this.projectionMatrixInverse=new Xd,this.coordinateSystem=Sd,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Wh,Gh,Kh),Kh.x===1&&Kh.y===1&&Kh.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Wh,Gh,Kh.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Wh,Gh,Kh),Kh.x===1&&Kh.y===1&&Kh.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Wh,Gh,Kh.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Jh=new X,Yh=new Y,Xh=new Y,Zh=class extends qh{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=kd*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Od*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return kd*2*Math.atan(Math.tan(Od*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Jh.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Jh.x,Jh.y).multiplyScalar(-e/Jh.z),Jh.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Jh.x,Jh.y).multiplyScalar(-e/Jh.z)}getViewSize(e,t){return this.getViewBounds(e,Yh,Xh),t.subVectors(Xh,Yh)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Od*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Qh=class extends Uh{constructor(){super(new Zh(90,1,.5,500)),this.isPointLightShadow=!0}},$h=class extends Rh{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new Qh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},eg=class extends qh{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},tg=class extends Uh{constructor(){super(new eg(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ng=class extends Rh{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(wf.DEFAULT_UP),this.updateMatrix(),this.target=new wf,this.shadow=new tg}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},rg=-90,ig=1,ag=class extends wf{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Zh(rg,ig,e,t);r.layers=this.layers,this.add(r);let i=new Zh(rg,ig,e,t);i.layers=this.layers,this.add(i);let a=new Zh(rg,ig,e,t);a.layers=this.layers,this.add(a);let o=new Zh(rg,ig,e,t);o.layers=this.layers,this.add(o);let s=new Zh(rg,ig,e,t);s.layers=this.layers,this.add(s);let c=new Zh(rg,ig,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},og=class extends Zh{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},sg=`\\[\\]\\.:\\/`,cg=RegExp(`[\\[\\]\\.:\\/]`,`g`),lg=`[^\\[\\]\\.:\\/]`,ug=`[^`+sg.replace(`\\.`,``)+`]`,dg=`((?:WC+[\\/:])*)`.replace(`WC`,lg),fg=`(WCOD+)?`.replace(`WCOD`,ug),pg=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,lg),mg=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,lg),hg=RegExp(`^`+dg+fg+pg+mg+`$`),gg=[`material`,`materials`,`bones`,`map`],_g=class{constructor(e,t,n){let r=n||vg.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},vg=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(cg,``)}static parseTrackName(e){let t=hg.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);gg.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){tl(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){nl(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){nl(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){nl(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){nl(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){nl(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){nl(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){nl(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;nl(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){nl(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){nl(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}},vg.Composite=_g,vg.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},vg.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},vg.prototype.GetterByBindingType=[vg.prototype._getValue_direct,vg.prototype._getValue_array,vg.prototype._getValue_arrayElement,vg.prototype._getValue_toArray],vg.prototype.SetterByBindingTypeAndVersioning=[[vg.prototype._setValue_direct,vg.prototype._setValue_direct_setNeedsUpdate,vg.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[vg.prototype._setValue_array,vg.prototype._setValue_array_setNeedsUpdate,vg.prototype._setValue_array_setMatrixWorldNeedsUpdate],[vg.prototype._setValue_arrayElement,vg.prototype._setValue_arrayElement_setNeedsUpdate,vg.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[vg.prototype._setValue_fromArray,vg.prototype._setValue_fromArray_setNeedsUpdate,vg.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],yg=new Xd,bg=class{constructor(e,t,n=0,r=1/0){this.ray=new tm(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new cf,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):nl(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return yg.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(yg),this}intersectObject(e,t=!0,n=[]){return Gl(e,this,n,t),n.sort(Wl),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)Gl(e[r],this,n,t);return n.sort(Wl),n}},class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?tl(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`)}));function Sg(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Cg(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}function wg(e,t,n,r,i,a){let o=new jf(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new mm(new Um(1,1,1),new ph({name:`BackgroundCubeMaterial`,uniforms:Ml(Ov.backgroundCube.uniforms),vertexShader:Ov.backgroundCube.vertexShader,fragmentShader:Ov.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Av.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(jv),l.material.toneMapped=Ld.getTransfer(i.colorSpace)!==yd,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new mm(new sh(2,2),new ph({name:`BackgroundMaterial`,uniforms:Ml(Ov.background.uniforms),vertexShader:Ov.background.vertexShader,fragmentShader:Ov.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Ld.getTransfer(i.colorSpace)!==yd,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(kv,Il(e)),n.buffers.color.setClear(kv.r,kv.g,kv.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Tg(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Eg(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Dg(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(tl(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&tl(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Og(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Np,s=new Nd,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}function kg(e){let t=[],n=[],r=e,i=e-Mv+1+Nv;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?Uv.set(1,r,n):e===1?Uv.set(-n,1,-r):e===2?Uv.set(-n,r,1):e===3?Uv.set(-1,r,-n):e===4?Uv.set(-n,-1,r):Uv.set(n,r,-1),Uv.toArray(l,(e*6+t)*3)}}let u=new Ep;u.setAttribute(`position`,new dp(c,3)),u.setAttribute(`outputDirection`,new dp(l,3)),n.push(new mm(u,null)),r>Mv&&r--}return{lodMeshes:n,sizeLods:t}}function Ag(e,t,n){let r=new qd(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function jg(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Mg(e,t,n){return new ph({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Fv,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ig(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ng(e,t,n){return new ph({name:`SphericalGaussianBlur`,defines:{SAMPLES:Pv,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ig(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Pg(){return new ph({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Ig(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Fg(){return new ph({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ig(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ig(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}function Lg(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Gv(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Wv(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Wv(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Rg(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&rl(`WebGLRenderer: `+e+` extension not supported.`),t}}}function zg(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0||(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++),t}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?pp:fp)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Bg(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Vg(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:nl(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Hg(e,t,n){let r=new WeakMap,i=new Gd;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Jd(h,p,m,u);g.type=lu,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new Y(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Ug(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}function Wg(e,t,n,r,i,a){let o=new qd(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new Ep;l.setAttribute(`position`,new mp([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new mp([0,2,0,0,2,0],2));let u=new mh({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new mm(l,u),f=new eg(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,v=[],y=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<v.length;n++){let r=v[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){v=e,y=v.length>0&&v[0].isRenderPass===!0;let t=o.width,n=o.height;v.length>0&&s===null&&(s=new qd(t,n,{type:uu,depthBuffer:!1,stencilBuffer:!1}),c=new qd(t,n,{type:uu,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<v.length;e++){let r=v[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&v.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return y===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return y},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<v.length;i++){let a=v[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},Ld.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=Kv[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}function Gg(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Qv[i];if(a===void 0&&(a=new Float32Array(i),Qv[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Kg(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function qg(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Jg(e,t){let n=$v[t];n===void 0&&(n=new Int32Array(t),$v[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Yg(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Xg(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Kg(n,t))return;e.uniform2fv(this.addr,t),qg(n,t)}}function Zg(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Kg(n,t))return;e.uniform3fv(this.addr,t),qg(n,t)}}function Qg(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Kg(n,t))return;e.uniform4fv(this.addr,t),qg(n,t)}}function $g(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Kg(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),qg(n,t)}else{if(Kg(n,r))return;ny.set(r),e.uniformMatrix2fv(this.addr,!1,ny),qg(n,r)}}function e_(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Kg(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),qg(n,t)}else{if(Kg(n,r))return;ty.set(r),e.uniformMatrix3fv(this.addr,!1,ty),qg(n,r)}}function t_(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Kg(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),qg(n,t)}else{if(Kg(n,r))return;ey.set(r),e.uniformMatrix4fv(this.addr,!1,ey),qg(n,r)}}function n_(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function r_(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Kg(n,t))return;e.uniform2iv(this.addr,t),qg(n,t)}}function i_(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Kg(n,t))return;e.uniform3iv(this.addr,t),qg(n,t)}}function a_(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Kg(n,t))return;e.uniform4iv(this.addr,t),qg(n,t)}}function o_(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function s_(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Kg(n,t))return;e.uniform2uiv(this.addr,t),qg(n,t)}}function c_(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Kg(n,t))return;e.uniform3uiv(this.addr,t),qg(n,t)}}function l_(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Kg(n,t))return;e.uniform4uiv(this.addr,t),qg(n,t)}}function u_(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(Jv.compareFunction=n.isReversedDepthBuffer()?518:515,a=Jv):a=qv,n.setTexture2D(t||a,i)}function d_(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Xv,i)}function f_(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||Zv,i)}function p_(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Yv,i)}function m_(e){switch(e){case 5126:return Yg;case 35664:return Xg;case 35665:return Zg;case 35666:return Qg;case 35674:return $g;case 35675:return e_;case 35676:return t_;case 5124:case 35670:return n_;case 35667:case 35671:return r_;case 35668:case 35672:return i_;case 35669:case 35673:return a_;case 5125:return o_;case 36294:return s_;case 36295:return c_;case 36296:return l_;case 35678:case 36198:case 36298:case 36306:case 35682:return u_;case 35679:case 36299:case 36307:return d_;case 35680:case 36300:case 36308:case 36293:return f_;case 36289:case 36303:case 36311:case 36292:return p_}}function h_(e,t){e.uniform1fv(this.addr,t)}function g_(e,t){let n=Gg(t,this.size,2);e.uniform2fv(this.addr,n)}function __(e,t){let n=Gg(t,this.size,3);e.uniform3fv(this.addr,n)}function v_(e,t){let n=Gg(t,this.size,4);e.uniform4fv(this.addr,n)}function y_(e,t){let n=Gg(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function b_(e,t){let n=Gg(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function x_(e,t){let n=Gg(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function S_(e,t){e.uniform1iv(this.addr,t)}function C_(e,t){e.uniform2iv(this.addr,t)}function w_(e,t){e.uniform3iv(this.addr,t)}function T_(e,t){e.uniform4iv(this.addr,t)}function E_(e,t){e.uniform1uiv(this.addr,t)}function D_(e,t){e.uniform2uiv(this.addr,t)}function O_(e,t){e.uniform3uiv(this.addr,t)}function k_(e,t){e.uniform4uiv(this.addr,t)}function A_(e,t,n){let r=this.cache,i=t.length,a=Jg(n,i);Kg(r,a)||(e.uniform1iv(this.addr,a),qg(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Jv:qv;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function j_(e,t,n){let r=this.cache,i=t.length,a=Jg(n,i);Kg(r,a)||(e.uniform1iv(this.addr,a),qg(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Xv,a[e])}function M_(e,t,n){let r=this.cache,i=t.length,a=Jg(n,i);Kg(r,a)||(e.uniform1iv(this.addr,a),qg(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||Zv,a[e])}function N_(e,t,n){let r=this.cache,i=t.length,a=Jg(n,i);Kg(r,a)||(e.uniform1iv(this.addr,a),qg(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Yv,a[e])}function P_(e){switch(e){case 5126:return h_;case 35664:return g_;case 35665:return __;case 35666:return v_;case 35674:return y_;case 35675:return b_;case 35676:return x_;case 5124:case 35670:return S_;case 35667:case 35671:return C_;case 35668:case 35672:return w_;case 35669:case 35673:return T_;case 5125:return E_;case 36294:return D_;case 36295:return O_;case 36296:return k_;case 35678:case 36198:case 36298:case 36306:case 35682:return A_;case 35679:case 36299:case 36307:return j_;case 35680:case 36300:case 36308:case 36293:return M_;case 36289:case 36303:case 36311:case 36292:return N_}}function F_(e,t){e.seq.push(t),e.map[t.id]=t}function I_(e,t,n){let r=e.name,i=r.length;for(oy.lastIndex=0;;){let a=oy.exec(r),o=oy.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){F_(n,l===void 0?new ry(s,e,t):new iy(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new ay(s),F_(n,e)),n=e}}}function L_(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}function R_(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}function z_(e){Ld._getMatrix(uy,Ld.workingColorSpace,e);let t=`mat3( ${uy.elements.map(e=>e.toFixed(4))} )`;switch(Ld.getTransfer(e)){case vd:return[t,`LinearTransferOETF`];case yd:return[t,`sRGBTransferOETF`];default:return tl(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function B_(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+R_(e.getShaderSource(t),r)}return i}function V_(e,t){let n=z_(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}function H_(e,t){let n=dy[t];return n===void 0?(tl(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}function U_(){return Ld.getLuminanceCoefficients(fy),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${fy.x.toFixed(4)}, ${fy.y.toFixed(4)}, ${fy.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function W_(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(q_).join(`
`)}function G_(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function K_(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function q_(e){return e!==``}function J_(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Y_(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}function X_(e){return e.replace(py,Z_)}function Z_(e,t){let n=Dv[t];if(n===void 0){let e=my.get(t);if(e!==void 0)n=Dv[e],tl(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return X_(n)}function Q_(e){return e.replace(hy,$_)}function $_(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function ev(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}function tv(e){return gy[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}function nv(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:_y[e.envMapMode]||`ENVMAP_TYPE_CUBE`}function rv(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:vy[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}function iv(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:yy[e.combine]||`ENVMAP_BLENDING_NONE`}function av(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function ov(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=tv(n),l=nv(n),u=rv(n),d=iv(n),f=av(n),p=W_(n),m=G_(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(q_).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(q_).join(`
`),_.length>0&&(_+=`
`)):(g=[ev(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(q_).join(`
`),_=[ev(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Dv.tonemapping_pars_fragment,n.toneMapping===0?``:H_(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Dv.colorspace_pars_fragment,V_(`linearToOutputTexel`,n.outputColorSpace),U_(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(q_).join(`
`)),o=X_(o),o=J_(o,n),o=Y_(o,n),s=X_(s),s=J_(s,n),s=Y_(s,n),o=Q_(o),s=Q_(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=L_(i,i.VERTEX_SHADER,y),S=L_(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=B_(i,x,`vertex`),n=B_(i,S,`fragment`);nl(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):tl(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new sy(i,h),T=K_(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,cy)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=ly++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}function sv(e){return e===1030||e===37490||e===36285}function cv(e,t,n,r,i,a){let o=new cf,s=new xy,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&tl(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=Ov[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let j=e.getRenderTarget(),M=e.state.buffers.depth.getReversed(),N=h.isInstancedMesh===!0,P=h.isBatchedMesh===!0,F=!!i.map,I=!!i.matcap,L=!!x,ee=!!i.aoMap,te=!!i.lightMap,R=!!i.bumpMap&&i.wireframe===!1,z=!!i.normalMap,ne=!!i.displacementMap,B=!!i.emissiveMap,re=!!i.metalnessMap,ie=!!i.roughnessMap,ae=i.anisotropy>0,V=i.clearcoat>0,oe=i.dispersion>0,se=i.retroreflectivity>0,H=i.iridescence>0,ce=i.sheen>0,le=i.transmission>0,ue=ae&&!!i.anisotropyMap,de=V&&!!i.clearcoatMap,fe=V&&!!i.clearcoatNormalMap,pe=V&&!!i.clearcoatRoughnessMap,me=H&&!!i.iridescenceMap,U=H&&!!i.iridescenceThicknessMap,he=ce&&!!i.sheenColorMap,W=ce&&!!i.sheenRoughnessMap,ge=!!i.specularMap,G=!!i.specularColorMap,_e=!!i.specularIntensityMap,K=le&&!!i.transmissionMap,q=le&&!!i.thicknessMap,ve=!!i.gradientMap,ye=!!i.alphaMap,be=i.alphaTest>0,xe=!!i.alphaHash,Se=!!i.extensions,Ce=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Ce=e.toneMapping);let we={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:P,batchingColor:P&&h._colorsTexture!==null,instancing:N,instancingColor:N&&h.instanceColor!==null,instancingMorph:N&&h.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Ld.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:F,matcap:I,envMap:L,envMapMode:L&&x.mapping,envMapCubeUVHeight:S,aoMap:ee,lightMap:te,bumpMap:R,normalMap:z,displacementMap:ne,emissiveMap:B,normalMapObjectSpace:z&&i.normalMapType===1,normalMapTangentSpace:z&&i.normalMapType===0,packedNormalMap:z&&i.normalMapType===0&&sv(i.normalMap.format),metalnessMap:re,roughnessMap:ie,anisotropy:ae,anisotropyMap:ue,clearcoat:V,clearcoatMap:de,clearcoatNormalMap:fe,clearcoatRoughnessMap:pe,dispersion:oe,retroreflection:se,iridescence:H,iridescenceMap:me,iridescenceThicknessMap:U,sheen:ce,sheenColorMap:he,sheenRoughnessMap:W,specularMap:ge,specularColorMap:G,specularIntensityMap:_e,transmission:le,transmissionMap:K,thicknessMap:q,gradientMap:ve,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:ye,alphaTest:be,alphaHash:xe,combine:i.combine,mapUv:F&&m(i.map.channel),aoMapUv:ee&&m(i.aoMap.channel),lightMapUv:te&&m(i.lightMap.channel),bumpMapUv:R&&m(i.bumpMap.channel),normalMapUv:z&&m(i.normalMap.channel),displacementMapUv:ne&&m(i.displacementMap.channel),emissiveMapUv:B&&m(i.emissiveMap.channel),metalnessMapUv:re&&m(i.metalnessMap.channel),roughnessMapUv:ie&&m(i.roughnessMap.channel),anisotropyMapUv:ue&&m(i.anisotropyMap.channel),clearcoatMapUv:de&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:fe&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pe&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:me&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:U&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:he&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:W&&m(i.sheenRoughnessMap.channel),specularMapUv:ge&&m(i.specularMap.channel),specularColorMapUv:G&&m(i.specularColorMap.channel),specularIntensityMapUv:_e&&m(i.specularIntensityMap.channel),transmissionMapUv:K&&m(i.transmissionMap.channel),thicknessMapUv:q&&m(i.thicknessMap.channel),alphaMapUv:ye&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(z||ae),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(F||ye),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&z===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:M,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ce,decodeVideoTexture:F&&i.map.isVideoTexture===!0&&Ld.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:B&&i.emissiveMap.isVideoTexture===!0&&Ld.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Se&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Se&&i.extensions.multiDraw===!0||P)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return we.vertexUv1s=c.has(1),we.vertexUv2s=c.has(2),we.vertexUv3s=c.has(3),c.clear(),we}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=Ov[t];n=uh.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new ov(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function lv(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function uv(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function dv(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function fv(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||uv),r.length>1&&r.sort(t||dv),i.length>1&&i.sort(t||dv)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function pv(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new fv,e.set(t,[i])):n>=r.length?(i=new fv,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function mv(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new X,color:new jf};break;case`SpotLight`:n={position:new X,direction:new X,color:new jf,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new X,color:new jf,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new X,skyColor:new jf,groundColor:new jf};break;case`RectAreaLight`:n={color:new jf,position:new X,halfWidth:new X,halfHeight:new X}}return e[t.id]=n,n}}}function hv(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Y};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Y};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Y,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}function gv(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function _v(e){let t=new mv,n=hv(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new X);let i=new X,a=new Xd,o=new Xd;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(gv);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Z.LTC_FLOAT_1,r.rectAreaLTC2=Z.LTC_FLOAT_2):(r.rectAreaLTC1=Z.LTC_HALF_1,r.rectAreaLTC2=Z.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=Cy++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function vv(e){let t=new _v(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function yv(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new vv(e),t.set(n,[a])):r>=i.length?(a=new vv(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}function bv(e,t,n){let r=new Om,i=new Y,a=new Y,o=new Gd,s=new gh,c=new _h,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new ph({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Y},radius:{value:4}},vertexShader:wy,fragmentShader:Ty}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new Ep;m.setAttribute(`position`,new dp(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new mm(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(tl(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){tl(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){tl(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new qd(i.x,i.y,{format:Cu,type:uu,minFilter:eu,magFilter:eu,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new Bm(i.x,i.y,lu),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=yu,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=Zl,d.map.depthTexture.magFilter=Zl}else l.isPointLight?(d.map=new Gv(i.x),d.map.depthTexture=new Vm(i.x,cu)):(d.map=new qd(i.x,i.y),d.map.depthTexture=new Bm(i.x,i.y,cu)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=yu,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=eu,d.map.depthTexture.magFilter=eu):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=Zl,d.map.depthTexture.magFilter=Zl);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let g=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);for(let t=0;t<g;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),ky.setFromMatrixPosition(l.matrixWorld),e.position.copy(ky),Ay.copy(e.position),Ay.add(Ey[t]),e.up.copy(Dy[t]),e.lookAt(Ay),e.updateMatrixWorld(),n.makeTranslation(-ky.x,-ky.y,-ky.z),Oy.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(Oy,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),b(n,s,i,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new qd(i.x,i.y,{format:Cu,type:uu}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function xv(e,t){function n(){let t=!1,n=new Gd,r=null,i=new Gd(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?re(e.DEPTH_TEST):ie(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=Td[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?re(e.STENCIL_TEST):ie(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new jf(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,P=0,F=e.getParameter(e.VERSION);F.indexOf(`WebGL`)===-1?F.indexOf(`OpenGL ES`)!==-1&&(P=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),N=P>=2):(P=parseFloat(/^WebGL (\d)/.exec(F)[1]),N=P>=1);let I=null,L={},ee=e.getParameter(e.SCISSOR_BOX),te=e.getParameter(e.VIEWPORT),R=new Gd().fromArray(ee),z=new Gd().fromArray(te);function ne(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let B={};B[e.TEXTURE_2D]=ne(e.TEXTURE_2D,e.TEXTURE_2D,1),B[e.TEXTURE_CUBE_MAP]=ne(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),B[e.TEXTURE_2D_ARRAY]=ne(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),B[e.TEXTURE_3D]=ne(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),re(e.DEPTH_TEST),o.setFunc(3),ue(!1),de(1),re(e.CULL_FACE),ce(0);function re(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function ie(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function ae(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function V(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function oe(t){return h!==t&&(e.useProgram(t),h=t,!0)}let se={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};se[103]=e.MIN,se[104]=e.MAX;let H={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function ce(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(ie(e.BLEND),g=!1);else if(g===!1&&(re(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:nl(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:nl(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:nl(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:nl(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(se[n],se[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(H[r],H[i],H[o],H[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function le(t,n){t.side===2?ie(e.CULL_FACE):re(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ue(r),t.blending===1&&t.transparent===!1?ce(0):ce(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),pe(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?re(e.SAMPLE_ALPHA_TO_COVERAGE):ie(e.SAMPLE_ALPHA_TO_COVERAGE)}function ue(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function de(t){t===0?ie(e.CULL_FACE):(re(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function fe(t){t!==k&&(N&&e.lineWidth(t),k=t)}function pe(t,n,r){t?(re(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):ie(e.POLYGON_OFFSET_FILL)}function me(t){t?re(e.SCISSOR_TEST):ie(e.SCISSOR_TEST)}function U(t){t===void 0&&(t=e.TEXTURE0+M-1),I!==t&&(e.activeTexture(t),I=t)}function he(t,n,r){r===void 0&&(r=I===null?e.TEXTURE0+M-1:I);let i=L[r];i===void 0&&(i={type:void 0,texture:void 0},L[r]=i),(i.type!==t||i.texture!==n)&&(I!==r&&(e.activeTexture(r),I=r),e.bindTexture(t,n||B[t]),i.type=t,i.texture=n)}function W(){let t=L[I];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function ge(){try{e.compressedTexImage2D(...arguments)}catch(e){nl(`WebGLState:`,e)}}function G(){try{e.compressedTexImage3D(...arguments)}catch(e){nl(`WebGLState:`,e)}}function _e(){try{e.texSubImage2D(...arguments)}catch(e){nl(`WebGLState:`,e)}}function K(){try{e.texSubImage3D(...arguments)}catch(e){nl(`WebGLState:`,e)}}function q(){try{e.compressedTexSubImage2D(...arguments)}catch(e){nl(`WebGLState:`,e)}}function ve(){try{e.compressedTexSubImage3D(...arguments)}catch(e){nl(`WebGLState:`,e)}}function ye(){try{e.texStorage2D(...arguments)}catch(e){nl(`WebGLState:`,e)}}function be(){try{e.texStorage3D(...arguments)}catch(e){nl(`WebGLState:`,e)}}function xe(){try{e.texImage2D(...arguments)}catch(e){nl(`WebGLState:`,e)}}function Se(){try{e.texImage3D(...arguments)}catch(e){nl(`WebGLState:`,e)}}function Ce(t){return d[t]===void 0?e.getParameter(t):d[t]}function we(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Te(t){R.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),R.copy(t))}function Ee(t){z.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),z.copy(t))}function De(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Oe(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function ke(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},I=null,L={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new jf(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,R.set(0,0,e.canvas.width,e.canvas.height),z.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:re,disable:ie,bindFramebuffer:ae,drawBuffers:V,useProgram:oe,setBlending:ce,setMaterial:le,setFlipSided:ue,setCullFace:de,setLineWidth:fe,setPolygonOffset:pe,setScissorTest:me,activeTexture:U,bindTexture:he,unbindTexture:W,compressedTexImage2D:ge,compressedTexImage3D:G,texImage2D:xe,texImage3D:Se,pixelStorei:we,getParameter:Ce,updateUBOMapping:De,uniformBlockBinding:Oe,texStorage2D:ye,texStorage3D:be,texSubImage2D:_e,texSubImage3D:K,compressedTexSubImage2D:q,compressedTexSubImage3D:ve,scissor:Te,viewport:Ee,reset:ke}}function Sv(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Y,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):Zc(`canvas`)}function g(e,t,n){let r=1,i=ge(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),tl(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&tl(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function _(e){return e.generateMipmaps}function v(t){e.generateMipmap(t)}function y(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];tl(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||tl(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?vd:Ld.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function x(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,tl(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function S(e,t){return _(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),T(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function w(e){let t=e.target;t.removeEventListener(`dispose`,w),D(t)}function T(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&E(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function E(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function D(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let O=0;function k(){O=0}function A(){return O}function j(e){O=e}function M(){let e=O;return e>=i.maxTextures&&tl(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),O+=1,e}function N(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function P(t,i){let a=r.get(t);if(t.isVideoTexture&&he(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)tl(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)tl(`WebGLRenderer: Texture marked for update but image is incomplete`);else{ie(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function F(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?ie(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function I(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?ie(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function L(t,i){let a=r.get(t);t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version?ae(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let ee={[Jl]:e.REPEAT,[Yl]:e.CLAMP_TO_EDGE,[Xl]:e.MIRRORED_REPEAT},te={[Zl]:e.NEAREST,[Ql]:e.NEAREST_MIPMAP_NEAREST,[$l]:e.NEAREST_MIPMAP_LINEAR,[eu]:e.LINEAR,[tu]:e.LINEAR_MIPMAP_NEAREST,[nu]:e.LINEAR_MIPMAP_LINEAR},R={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function z(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&tl(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,ee[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,ee[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,ee[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,te[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,te[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,R[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function ne(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,C));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=N(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&E(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function B(e,t,n){return Math.floor(Math.floor(e/n)/t)}function re(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=B(n.start,r.width,4),c=B(t.start,r.width,4);n.start<=i+1&&a===c&&B(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function ie(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=ne(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=Ld.getPrimaries(Ld.workingColorSpace),r=o.colorSpace===``?null:Ld.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=W(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=b(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);z(c,o);let h,y=o.mipmaps,C=o.isVideoTexture!==!0,w=f.__version===void 0||l===!0,T=u.dataReady,E=S(o,t);if(o.isDepthTexture)m=x(o.format===bu,o.type),w&&(C?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(y.length>0){C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else C?(w&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&re(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){C&&w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,y[0].width,y[0].height,t.depth);for(let i=0,a=y.length;i<a;i++)if(h=y[i],o.format!==1023){if(r!==null){if(C){if(T){if(o.layerUpdates.size>0){let t=Kl(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else tl(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else C?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],o.format===1023?C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?tl(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):C?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(C){if(w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=Kl(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)C?(w&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(w){if(C)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(y.length>0){if(C&&w){let t=ge(y[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(C){if(w){let r=ge(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);_(o)&&v(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ae(t,o,s){if(o.image.length!==6)return;let c=ne(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=Ld.getPrimaries(Ld.workingColorSpace),r=o.colorSpace===``?null:Ld.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=W(o,m[e]);let h=m[0],y=a.convert(o.format,o.colorSpace),x=a.convert(o.type),C=b(o.internalFormat,y,x,o.normalized,o.colorSpace),w=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=S(o,h);z(e.TEXTURE_CUBE_MAP,o);let O;if(f){w&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,h.width,h.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let i=O[r];o.format===1023?w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,y,x,i.data):y===null?tl(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(O=o.mipmaps,w&&T){O.length>0&&D++;let t=ge(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,y,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,y,x,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,y,x,i.data)}}else{w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,y,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,y,x,m[t]);for(let r=0;r<O.length;r++){let i=O[r];w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,y,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,y,x,i.image[t])}}}_(o)&&v(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function V(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),U(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,me(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function oe(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=x(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;U(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,me(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,me(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,c,l,o.normalized,o.colorSpace);U(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,me(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,me(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function se(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,C)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),z(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else P(i.depthTexture,0);let u=l.__webglTexture,d=me(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)U(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)U(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function H(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)se(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?se(i.__webglFramebuffer[0],t,0):se(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),oe(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),oe(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function ce(t,n,i){let a=r.get(t);n!==void 0&&V(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&H(t)}function le(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,w);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&U(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=b(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=me(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),oe(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),z(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)V(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else V(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);_(i)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),z(c,a),V(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),_(a)&&v(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),z(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)V(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else V(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);_(i)&&v(r),n.unbindTexture()}t.depthBuffer&&H(t)}function ue(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(_(a)){let t=y(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),v(t),n.unbindTexture()}}}let de=[],fe=[];function pe(t){if(t.samples>0){if(U(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(de.length=0,fe.length=0,de.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(de.push(l),fe.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,fe)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,de))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function me(e){return Math.min(i.maxSamples,e.samples)}function U(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function he(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function W(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Ld.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&tl(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):nl(`WebGLTextures: Unsupported texture color space:`,n)),t}function ge(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=M,this.resetTextureUnits=k,this.getTextureUnits=A,this.setTextureUnits=j,this.setTexture2D=P,this.setTexture2DArray=F,this.setTexture3D=I,this.setTextureCube=L,this.rebindTextures=ce,this.setupRenderTarget=le,this.updateRenderTargetMipmap=ue,this.updateMultisampleRenderTarget=pe,this.setupDepthRenderbuffer=H,this.setupFrameBufferTexture=V,this.useMultisampledRTT=U,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function Cv(e,t){function n(n,r=``){let i,a=Ld.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}function wv(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Il(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Fy.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Iy),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Tv(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return nl(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?tl(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):tl(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}function Ev(){return Ry===null&&(Ry=new hm(Ly,16,16,Cu,uu),Ry.name=`DFG_LUT`,Ry.minFilter=eu,Ry.magFilter=eu,Ry.wrapS=Yl,Ry.wrapT=Yl,Ry.generateMipmaps=!1,Ry.needsUpdate=!0),Ry}var Dv,Z,Ov,kv,Av,jv,Mv,Nv,Pv,Fv,Iv,Lv,Rv,zv,Bv,Vv,Hv,Uv,Wv,Gv,Kv,qv,Jv,Yv,Xv,Zv,Qv,$v,ey,ty,ny,ry,iy,ay,oy,sy,cy,ly,uy,dy,fy,py,my,hy,gy,_y,vy,yy,by,xy,Sy,Cy,wy,Ty,Ey,Dy,Oy,ky,Ay,jy,My,Ny,Py,Fy,Iy,Ly,Ry,zy,By=i((()=>{xg(),Dv={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},Z={common:{diffuse:{value:new jf(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Nd},alphaMap:{value:null},alphaMapTransform:{value:new Nd},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Nd}},envmap:{envMap:{value:null},envMapRotation:{value:new Nd},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Nd}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Nd}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Nd},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Nd},normalScale:{value:new Y(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Nd},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Nd}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Nd}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Nd}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new jf(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new X},probesMax:{value:new X},probesResolution:{value:new X}},points:{diffuse:{value:new jf(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Nd},alphaTest:{value:0},uvTransform:{value:new Nd}},sprite:{diffuse:{value:new jf(16777215)},opacity:{value:1},center:{value:new Y(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Nd},alphaMap:{value:null},alphaMapTransform:{value:new Nd},alphaTest:{value:0}}},Ov={basic:{uniforms:Nl([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.fog]),vertexShader:Dv.meshbasic_vert,fragmentShader:Dv.meshbasic_frag},lambert:{uniforms:Nl([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new jf(0)},envMapIntensity:{value:1}}]),vertexShader:Dv.meshlambert_vert,fragmentShader:Dv.meshlambert_frag},phong:{uniforms:Nl([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new jf(0)},specular:{value:new jf(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Dv.meshphong_vert,fragmentShader:Dv.meshphong_frag},standard:{uniforms:Nl([Z.common,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.roughnessmap,Z.metalnessmap,Z.fog,Z.lights,{emissive:{value:new jf(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Dv.meshphysical_vert,fragmentShader:Dv.meshphysical_frag},toon:{uniforms:Nl([Z.common,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.gradientmap,Z.fog,Z.lights,{emissive:{value:new jf(0)}}]),vertexShader:Dv.meshtoon_vert,fragmentShader:Dv.meshtoon_frag},matcap:{uniforms:Nl([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,{matcap:{value:null}}]),vertexShader:Dv.meshmatcap_vert,fragmentShader:Dv.meshmatcap_frag},points:{uniforms:Nl([Z.points,Z.fog]),vertexShader:Dv.points_vert,fragmentShader:Dv.points_frag},dashed:{uniforms:Nl([Z.common,Z.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Dv.linedashed_vert,fragmentShader:Dv.linedashed_frag},depth:{uniforms:Nl([Z.common,Z.displacementmap]),vertexShader:Dv.depth_vert,fragmentShader:Dv.depth_frag},normal:{uniforms:Nl([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,{opacity:{value:1}}]),vertexShader:Dv.meshnormal_vert,fragmentShader:Dv.meshnormal_frag},sprite:{uniforms:Nl([Z.sprite,Z.fog]),vertexShader:Dv.sprite_vert,fragmentShader:Dv.sprite_frag},background:{uniforms:{uvTransform:{value:new Nd},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Dv.background_vert,fragmentShader:Dv.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Nd}},vertexShader:Dv.backgroundCube_vert,fragmentShader:Dv.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Dv.cube_vert,fragmentShader:Dv.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Dv.equirect_vert,fragmentShader:Dv.equirect_frag},distance:{uniforms:Nl([Z.common,Z.displacementmap,{referencePosition:{value:new X},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Dv.distance_vert,fragmentShader:Dv.distance_frag},shadow:{uniforms:Nl([Z.lights,Z.fog,{color:{value:new jf(0)},opacity:{value:1}}]),vertexShader:Dv.shadow_vert,fragmentShader:Dv.shadow_frag}},Ov.physical={uniforms:Nl([Ov.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Nd},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Nd},clearcoatNormalScale:{value:new Y(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Nd},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Nd},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Nd},sheen:{value:0},sheenColor:{value:new jf(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Nd},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Nd},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Nd},transmissionSamplerSize:{value:new Y},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Nd},attenuationDistance:{value:0},attenuationColor:{value:new jf(0)},specularColor:{value:new jf(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Nd},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Nd},anisotropyVector:{value:new Y},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Nd}}]),vertexShader:Dv.meshphysical_vert,fragmentShader:Dv.meshphysical_frag},kv={r:0,b:0,g:0},Av=new Xd,jv=new Nd,jv.set(-1,0,0,0,1,0,0,0,1),Mv=4,Nv=6,Pv=20,Fv=256,Iv=new eg,Lv=new jf,Rv=null,zv=0,Bv=0,Vv=!1,Hv=new X,Uv=new X,Wv=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Hv}=i;Rv=this._renderer.getRenderTarget(),zv=this._renderer.getActiveCubeFace(),Bv=this._renderer.getActiveMipmapLevel(),Vv=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Fg(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Pg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Rv,zv,Bv),this._renderer.xr.enabled=Vv,e.scissorTest=!1,jg(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Rv=this._renderer.getRenderTarget(),zv=this._renderer.getActiveCubeFace(),Bv=this._renderer.getActiveMipmapLevel(),Vv=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:eu,minFilter:eu,generateMipmaps:!1,type:uu,format:vu,colorSpace:_d,depthBuffer:!1},r=Ag(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ag(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=kg(r)),this._blurMaterial=Ng(r,e,t),this._ggxMaterial=Mg(r,e,t)}return r}_compileMaterial(e){let t=new mm(new Ep,e);this._renderer.compile(t,Iv)}_sceneToCubeUV(e,t,n,r,i){let a=new Zh(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Lv),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new mm(new Um,new nm({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Lv),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;jg(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Fg()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Pg());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;jg(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Iv)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Mv?n-d+Mv:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,jg(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Iv),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,jg(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Iv)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];jg(t,3*l*(r>this._lodMax-Mv?r-this._lodMax+Mv:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,Iv)}},Gv=class extends qd{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Rm(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Um(5,5,5),i=new ph({name:`CubemapFromEquirect`,uniforms:Ml(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new mm(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=eu),new ag(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},Kv={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`},qv=new Wd,Jv=new Bm(1,1),Yv=new Jd,Xv=new Yd,Zv=new Rm,Qv=[],$v=[],ey=new Float32Array(16),ty=new Float32Array(9),ny=new Float32Array(4),ry=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=m_(t.type)}},iy=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=P_(t.type)}},ay=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},oy=/(\w+)(\])?(\[|\.)?/g,sy=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);I_(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}},cy=37297,ly=0,uy=new Nd,dy={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`},fy=new X,py=/^[ \t]*#include +<([\w\d./]+)>/gm,my=new Map,hy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g,gy={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`},_y={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`},vy={302:`ENVMAP_MODE_REFRACTION`},yy={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`},by=0,xy=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Sy(e),t.set(e,n)),n}},Sy=class{constructor(e){this.id=by++,this.code=e,this.usedTimes=0}},Cy=0,wy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ty=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Ey=[new X(1,0,0),new X(-1,0,0),new X(0,1,0),new X(0,-1,0),new X(0,0,1),new X(0,0,-1)],Dy=[new X(0,-1,0),new X(0,-1,0),new X(0,0,1),new X(0,0,-1),new X(0,-1,0),new X(0,-1,0)],Oy=new Xd,ky=new X,Ay=new X,jy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,My=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Ny=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Hm(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new ph({vertexShader:jy,fragmentShader:My,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new mm(new sh(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Py=class extends Ed{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new Ny,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new Y,C=null,w=null,T=new Zh;T.viewport=new Gd;let E=new Zh;E.viewport=new Gd;let D=[T,E],O=new og,k=null,A=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new Df,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new Df,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new Df,b[e]=t),t.getHandSpace()};function j(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function M(){r.removeEventListener(`select`,j),r.removeEventListener(`selectstart`,j),r.removeEventListener(`selectend`,j),r.removeEventListener(`squeeze`,j),r.removeEventListener(`squeezestart`,j),r.removeEventListener(`squeezeend`,j),r.removeEventListener(`end`,M),r.removeEventListener(`inputsourceschange`,N);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}k=null,A=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,z.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),w!==null){let e=w.camera;e.fov=w.fov,e.zoom=w.zoom,e.updateProjectionMatrix(),w=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&tl(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&tl(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,j),r.addEventListener(`selectstart`,j),r.addEventListener(`selectend`,j),r.addEventListener(`squeeze`,j),r.addEventListener(`squeezestart`,j),r.addEventListener(`squeezeend`,j),r.addEventListener(`end`,M),r.addEventListener(`inputsourceschange`,N),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?bu:yu,a=_.stencil?pu:cu);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new qd(d.textureWidth,d.textureHeight,{format:vu,type:ru,depthTexture:new Bm(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new qd(f.framebufferWidth,f.framebufferHeight,{format:vu,type:ru,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),z.setContext(r),z.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function N(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let P=new X,F=new X;function I(e,t,n){P.setFromMatrixPosition(t.matrixWorld),F.setFromMatrixPosition(n.matrixWorld);let r=P.distanceTo(F),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function L(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),O.near=E.near=T.near=t,O.far=E.far=T.far=n,(k!==O.near||A!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,A=O.far),O.layers.mask=e.layers.mask|6,T.layers.mask=O.layers.mask&-5,E.layers.mask=O.layers.mask&-3;let i=e.parent,a=O.cameras;L(O,i);for(let e=0;e<a.length;e++)L(a[e],i);a.length===2?I(O,T,E):O.projectionMatrix.copy(T.projectionMatrix),w===null&&e.isPerspectiveCamera&&(w={camera:e,fov:e.fov,zoom:e.zoom}),ee(e,O,i)};function ee(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=kd*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(O)},this.getCameraTexture=function(e){return g[e]};let te=null;function R(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==O.cameras.length&&(O.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=D[n];o===void 0&&(o=new Zh,o.layers.enable(n),o.viewport=new Gd,D[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(O.matrix.copy(o.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),i===!0&&O.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new Hm,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}te&&te(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let z=new Sg;z.setAnimationLoop(R),this.setAnimationLoop=function(e){te=e},this.dispose=function(){}}},Fy=new Xd,Iy=new Nd,Iy.set(-1,0,0,0,1,0,0,0,1),Ly=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ry=null,zy=class{constructor(e={}){let{canvas:t=Qc(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=ru}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([Tu,wu,Su]),g=new Set([ru,cu,ou,pu,du,fu]),_=new Uint32Array(4),v=new Int32Array(4),y=new X,b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=gd;let j=0,M=0,N=null,P=-1,F=null,I=new Gd,L=new Gd,ee=null,te=new jf(0),R=0,z=t.width,ne=t.height,B=1,re=null,ie=null,ae=new Gd(0,0,z,ne),V=new Gd(0,0,z,ne),oe=!1,se=new Om,H=!1,ce=!1,le=new Xd,ue=new X,de=new Gd,fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},pe=!1;function me(){return N===null?B:1}let U=n;function he(e,n){return t.getContext(e,n)}let W,ge,G,_e,K,q,ve,ye,be,xe,Se,Ce,we,Te,Ee,De,Oe,ke,Ae,je,Me,Ne,Pe;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,Le,!1),t.addEventListener(`webglcontextrestored`,Re,!1),t.addEventListener(`webglcontextcreationerror`,ze,!1),U===null){let t=`webgl2`;if(U=he(t,e),U===null)throw he(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}Fe()}catch(e){throw t.removeEventListener(`webglcontextlost`,Le,!1),t.removeEventListener(`webglcontextrestored`,Re,!1),t.removeEventListener(`webglcontextcreationerror`,ze,!1),nl(`WebGLRenderer: `+e.message),e}function Fe(){W=new Rg(U),W.init(),Me=new Cv(U,W),ge=new Dg(U,W,e,Me),G=new xv(U,W),ge.reversedDepthBuffer&&d&&G.buffers.depth.setReversed(!0),O=U.createFramebuffer(),k=U.createFramebuffer(),A=U.createFramebuffer(),_e=new Vg(U),K=new lv,q=new Sv(U,W,G,K,ge,Me,_e),ve=new Lg(T),ye=new Cg(U),Ne=new Tg(U,ye),be=new zg(U,ye,_e,Ne),xe=new Ug(U,be,ye,Ne,_e),ke=new Hg(U,ge,q),Ee=new Og(K),Se=new cv(T,ve,W,ge,Ne,Ee),Ce=new wv(T,K),we=new pv,Te=new yv(W),Oe=new wg(T,ve,G,xe,p,s),De=new bv(T,xe,ge),Pe=new Tv(U,_e,ge,G),Ae=new Eg(U,W,_e),je=new Bg(U,W,_e),_e.programs=Se.programs,T.capabilities=ge,T.extensions=W,T.properties=K,T.renderLists=we,T.shadowMap=De,T.state=G,T.info=_e}m!==1009&&(w=new Wg(m,t.width,t.height,o,r,i));let Ie=new Py(T,U);this.xr=Ie,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let e=W.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=W.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(e){e!==void 0&&(B=e,this.setSize(z,ne,!1))},this.getSize=function(e){return e.set(z,ne)},this.setSize=function(e,n,r=!0){Ie.isPresenting?tl(`WebGLRenderer: Can't change size while VR device is presenting.`):(z=e,ne=n,t.width=Math.floor(e*B),t.height=Math.floor(n*B),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(z*B,ne*B).floor()},this.setDrawingBufferSize=function(e,n,r){z=e,ne=n,B=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009)nl(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){tl(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(I)},this.getViewport=function(e){return e.copy(ae)},this.setViewport=function(e,t,n,r){e.isVector4?ae.set(e.x,e.y,e.z,e.w):ae.set(e,t,n,r),G.viewport(I.copy(ae).multiplyScalar(B).round())},this.getScissor=function(e){return e.copy(V)},this.setScissor=function(e,t,n,r){e.isVector4?V.set(e.x,e.y,e.z,e.w):V.set(e,t,n,r),G.scissor(L.copy(V).multiplyScalar(B).round())},this.getScissorTest=function(){return oe},this.setScissorTest=function(e){G.setScissorTest(oe=e)},this.setOpaqueSort=function(e){re=e},this.setTransparentSort=function(e){ie=e},this.getClearColor=function(e){return e.copy(Oe.getClearColor())},this.setClearColor=function(){Oe.setClearColor(...arguments)},this.getClearAlpha=function(){return Oe.getClearAlpha()},this.setClearAlpha=function(){Oe.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(N!==null){let t=N.texture.format;e=h.has(t)}if(e){let e=N.texture.type,t=g.has(e),n=Oe.getClearColor(),r=Oe.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,U.clearBufferuiv(U.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,U.clearBufferiv(U.COLOR,0,v))}else r|=U.COLOR_BUFFER_BIT}t&&(r|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&U.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,Le,!1),t.removeEventListener(`webglcontextrestored`,Re,!1),t.removeEventListener(`webglcontextcreationerror`,ze,!1),Oe.dispose(),we.dispose(),Te.dispose(),K.dispose(),ve.dispose(),xe.dispose(),Ne.dispose(),Pe.dispose(),Se.dispose(),Ie.dispose(),Ie.removeEventListener(`sessionstart`,Ke),Ie.removeEventListener(`sessionend`,qe),Je.stop()};function Le(e){e.preventDefault(),$c(`WebGLRenderer: Context Lost.`),E=!0}function Re(){$c(`WebGLRenderer: Context Restored.`),E=!1;let e=_e.autoReset,t=De.enabled,n=De.autoUpdate,r=De.needsUpdate,i=De.type;Fe(),_e.autoReset=e,De.enabled=t,De.autoUpdate=n,De.needsUpdate=r,De.type=i}function ze(e){nl(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function Be(e){let t=e.target;t.removeEventListener(`dispose`,Be),Ve(t)}function Ve(e){He(e),K.remove(e)}function He(e){let t=K.get(e).programs;t!==void 0&&(t.forEach(function(e){Se.releaseProgram(e)}),e.isShaderMaterial&&Se.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=fe);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=it(e,t,n,r,i);G.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=be.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Ne.setup(i,r,s,n,c);let h,g=Ae;if(c!==null&&(h=ye.get(c),g=je,g.setIndex(h)),i.isMesh)r.wireframe===!0?(G.setLineWidth(r.wireframeLinewidth*me()),g.setMode(U.LINES)):g.setMode(U.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),G.setLineWidth(e*me()),i.isLineSegments?g.setMode(U.LINES):i.isLineLoop?g.setMode(U.LINE_LOOP):g.setMode(U.LINE_STRIP)}else i.isPoints?g.setMode(U.POINTS):i.isSprite&&g.setMode(U.TRIANGLES);if(i.isBatchedMesh){if(W.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?ye.get(c).bytesPerElement:1,o=K.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(U,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function Ue(e,t,n,r){D!==null&&e.isNodeMaterial&&D.setObject(r,e),H===!0&&Ee.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,et(e,t,r),e.side=0,e.needsUpdate=!0,et(e,t,r),e.side=2):et(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),D!==null&&D.renderStart(e,t,n),x=Te.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights(),D!==null&&D.updateLights(x.state.lightsArray),ce=this.localClippingEnabled,H=Ee.init(this.clippingPlanes,ce),H===!0&&Ee.setGlobalState(this.clippingPlanes,t),D!==null&&De.render(x.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];Ue(o,n,t,e),r.add(o)}else Ue(i,n,t,e),r.add(i)}}),x=C.pop(),D!==null&&D.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=K.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}W.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let We=null;function Ge(e){We&&We(e)}function Ke(){Je.stop()}function qe(){Je.start()}let Je=new Sg;Je.setAnimationLoop(Ge),typeof self<`u`&&Je.setContext(self),this.setAnimationLoop=function(e){We=e,Ie.setAnimationLoop(e),e===null?Je.stop():Je.start()},Ie.addEventListener(`sessionstart`,Ke),Ie.addEventListener(`sessionend`,qe),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){nl(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=Ie.enabled===!0&&Ie.isPresenting===!0,r=w!==null&&(N===null||n)&&w.begin(T,N);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Ie.enabled===!0&&Ie.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ie.cameraAutoUpdate===!0&&Ie.updateCamera(t),t=Ie.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,N),x=Te.get(e,C.length),x.init(t),x.state.textureUnits=q.getTextureUnits(),C.push(x),le.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),se.setFromProjectionMatrix(le,Sd,t.reversedDepth),ce=this.localClippingEnabled,H=Ee.init(this.clippingPlanes,ce),b=we.get(e,S.length),b.init(),S.push(b),Ie.enabled===!0&&Ie.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&Ye(e,t,-1/0,T.sortObjects)}Ye(e,t,0,T.sortObjects),b.finish(),D!==null&&D.updateLights(x.state.lightsArray),T.sortObjects===!0&&b.sort(re,ie),pe=Ie.enabled===!1||Ie.isPresenting===!1||Ie.hasDepthSensing()===!1,pe&&Oe.addToRenderList(b,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),H===!0&&Ee.beginShadows();let i=x.state.shadowsArray;if(De.render(i,e,t),H===!0&&Ee.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];Ze(n,r,e,a)}pe&&Oe.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];Xe(b,e,n,n.viewport)}}else r.length>0&&Ze(n,r,e,t),pe&&Oe.render(e),Xe(b,e,t)}N!==null&&M===0&&(q.updateMultisampleRenderTarget(N),q.updateRenderTargetMipmap(N)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),Ne.resetDefaultState(),P=-1,F=null,C.pop(),C.length>0?(x=C[C.length-1],q.setTextureUnits(x.state.textureUnits),H===!0&&Ee.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function Ye(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)x.pushLightProbeGrid(e);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(se)){r&&de.setFromMatrixPosition(e.matrixWorld).applyMatrix4(le);let i=xe.update(e),a=e.material;a.visible&&b.push(e,i,a,n,de.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(se))){let i=xe.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),de.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),de.copy(e.boundingSphere.center)),de.applyMatrix4(e.matrixWorld).applyMatrix4(le)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,de.z,s,t)}}else a.visible&&b.push(e,i,a,n,de.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)Ye(i[e],t,n,r)}function Xe(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),H===!0&&Ee.setGlobalState(T.clippingPlanes,n),r&&G.viewport(I.copy(r)),i.length>0&&Qe(i,t,n),a.length>0&&Qe(a,t,n),o.length>0&&Qe(o,t,n),G.buffers.depth.setTest(!0),G.buffers.depth.setMask(!0),G.buffers.color.setMask(!0),G.setPolygonOffset(!1)}function Ze(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=W.has(`EXT_color_buffer_half_float`)||W.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new qd(1,1,{generateMipmaps:!0,type:e?uu:ru,minFilter:nu,samples:Math.max(4,ge.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ld.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||I;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(te),R=T.getClearAlpha(),R<1&&T.setClearColor(16777215,.5),T.clear(),pe&&Oe.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),H===!0&&Ee.setGlobalState(T.clippingPlanes,r),Qe(e,n,r),q.updateMultisampleRenderTarget(a),q.updateRenderTargetMipmap(a),W.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,$e(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(q.updateMultisampleRenderTarget(a),q.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(te,R),d!==void 0&&(r.viewport=d),T.toneMapping=u}function Qe(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&$e(o,t,n,s,l,c)}}function $e(e,t,n,r,i,a){D!==null&&i.isNodeMaterial&&D.setObject(e,i),e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function et(e,t,n){t.isScene!==!0&&(t=fe);let r=K.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Se.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Se.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=ve.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,Be),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return nt(e,s),d}else s.uniforms=Se.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=Se.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ee.uniform),nt(e,s),r.needsLights=ot(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=x.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function tt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=sy.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function nt(e,t){let n=K.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function rt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function it(e,t,n,r,i){t.isScene!==!0&&(t=fe),q.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=N===null?T.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:Ld.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=ve.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=K.get(r),y=x.state.lights;if(H===!0&&(ce===!0||e!==F)){let t=e===F&&r.id===P;Ee.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ee.numPlanes||v.numIntersection!==Ee.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=x.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;b===!0&&(S=et(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,S,v));let C=!1,w=!1,E=!1,O=S.getUniforms(),k=v.uniforms;if(G.useProgram(S.program)&&(C=!0,w=!0,E=!0),r.id!==P&&(P=r.id,w=!0),v.needsLights){let e=rt(x.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(C||F!==e){G.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),O.setValue(U,`projectionMatrix`,e.projectionMatrix),O.setValue(U,`viewMatrix`,e.matrixWorldInverse);let t=O.map.cameraPosition;t!==void 0&&t.setValue(U,ue.setFromMatrixPosition(e.matrixWorld)),ge.logarithmicDepthBuffer&&O.setValue(U,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&O.setValue(U,`isOrthographic`,e.isOrthographicCamera===!0),F!==e&&(F=e,w=!0,E=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&O.setValue(U,`sunShadowMap`,y.state.sunShadowMap,q),y.state.directionalShadowMap.length>0&&O.setValue(U,`directionalShadowMap`,y.state.directionalShadowMap,q),y.state.spotShadowMap.length>0&&O.setValue(U,`spotShadowMap`,y.state.spotShadowMap,q),y.state.pointShadowMap.length>0&&O.setValue(U,`pointShadowMap`,y.state.pointShadowMap,q)),i.isSkinnedMesh){O.setOptional(U,i,`bindMatrix`),O.setOptional(U,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),O.setValue(U,`boneTexture`,e.boneTexture,q))}i.isBatchedMesh&&(O.setOptional(U,i,`batchingTexture`),O.setValue(U,`batchingTexture`,i._matricesTexture,q),O.setOptional(U,i,`batchingIdTexture`),O.setValue(U,`batchingIdTexture`,i._indirectTexture,q),O.setOptional(U,i,`batchingColorTexture`),i._colorsTexture!==null&&O.setValue(U,`batchingColorTexture`,i._colorsTexture,q));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&ke.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,O.setValue(U,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(k.envMapIntensity.value=t.environmentIntensity),k.dfgLUT!==void 0&&(k.dfgLUT.value=Ev()),w){if(O.setValue(U,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&at(k,E),a&&r.fog===!0&&Ce.refreshFogUniforms(k,a),Ce.refreshMaterialUniforms(k,r,B,ne,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;k.probesSH.value=e.texture,k.probesMin.value.copy(e.boundingBox.min),k.probesMax.value.copy(e.boundingBox.max),k.probesResolution.value.copy(e.resolution)}sy.upload(U,tt(v),k,q)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(sy.upload(U,tt(v),k,q),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&O.setValue(U,`center`,i.center),O.setValue(U,`modelViewMatrix`,i.modelViewMatrix),O.setValue(U,`normalMatrix`,i.normalMatrix),O.setValue(U,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Pe.update(n,S),Pe.bind(n,S)}}return S}function at(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function ot(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(e,t,n){let r=K.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),K.get(e.texture).__webglTexture=t,K.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=K.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){N=e,j=t,M=n;let r=null,i=!1,a=!1;if(e){let o=K.get(e);if(o.__useDefaultFramebuffer!==void 0){G.bindFramebuffer(U.FRAMEBUFFER,o.__webglFramebuffer),I.copy(e.viewport),L.copy(e.scissor),ee=e.scissorTest,G.viewport(I),G.scissor(L),G.setScissorTest(ee),P=-1;return}if(o.__webglFramebuffer===void 0)q.setupRenderTarget(e);else if(o.__hasExternalTextures)q.rebindTextures(e,K.get(e.texture).__webglTexture,K.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&K.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);q.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=K.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&q.useMultisampledRTT(e)===!1?K.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,I.copy(e.viewport),L.copy(e.scissor),ee=e.scissorTest}else I.copy(ae).multiplyScalar(B).floor(),L.copy(V).multiplyScalar(B).floor(),ee=oe;if(n!==0&&(r=O),G.bindFramebuffer(U.FRAMEBUFFER,r)&&G.drawBuffers(e,r),G.viewport(I),G.scissor(L),G.setScissorTest(ee),i){let r=K.get(e.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=K.get(e.textures[t]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=K.get(e.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,t.__webglTexture,n)}P=-1};function st(e){let t=K.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=ge.textureFormatReadable(e.format),t.__typeReadable=ge.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){nl(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=K.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){G.bindFramebuffer(U.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+s);let u=st(o);if(u.__formatReadable===!1){nl(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){nl(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&U.readPixels(t,n,r,i,Me.convert(c),Me.convert(l),a)}finally{let e=N===null?null:K.get(N).__webglFramebuffer;G.bindFramebuffer(U.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=K.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){G.bindFramebuffer(U.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+s);let d=st(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,f),U.bufferData(U.PIXEL_PACK_BUFFER,a.byteLength,U.STREAM_READ),U.readPixels(t,n,r,i,Me.convert(l),Me.convert(u),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let p=N===null?null:K.get(N).__webglFramebuffer;G.bindFramebuffer(U.FRAMEBUFFER,p);let m=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await il(U,m,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,f),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,a),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(f),U.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;q.setTexture2D(e,0),U.copyTexSubImage2D(U.TEXTURE_2D,n,0,0,o,s,i,a),G.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Me.convert(t.format),_=Me.convert(t.type),v;t.isData3DTexture?(q.setTexture3D(t,0),v=U.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(q.setTexture2DArray(t,0),v=U.TEXTURE_2D_ARRAY):(q.setTexture2D(t,0),v=U.TEXTURE_2D),G.activeTexture(U.TEXTURE0),G.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,t.flipY),G.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),G.pixelStorei(U.UNPACK_ALIGNMENT,t.unpackAlignment);let y=G.getParameter(U.UNPACK_ROW_LENGTH),b=G.getParameter(U.UNPACK_IMAGE_HEIGHT),x=G.getParameter(U.UNPACK_SKIP_PIXELS),S=G.getParameter(U.UNPACK_SKIP_ROWS),C=G.getParameter(U.UNPACK_SKIP_IMAGES);G.pixelStorei(U.UNPACK_ROW_LENGTH,h.width),G.pixelStorei(U.UNPACK_IMAGE_HEIGHT,h.height),G.pixelStorei(U.UNPACK_SKIP_PIXELS,l),G.pixelStorei(U.UNPACK_SKIP_ROWS,u),G.pixelStorei(U.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=K.get(e),r=K.get(t),h=K.get(n.__renderTarget),g=K.get(r.__renderTarget);G.bindFramebuffer(U.READ_FRAMEBUFFER,h.__webglFramebuffer),G.bindFramebuffer(U.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,K.get(e).__webglTexture,i,d+n),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,K.get(t).__webglTexture,a,m+n)),U.blitFramebuffer(l,u,o,s,f,p,o,s,U.DEPTH_BUFFER_BIT,U.NEAREST);G.bindFramebuffer(U.READ_FRAMEBUFFER,null),G.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||K.has(e)){let n=K.get(e),r=K.get(t);G.bindFramebuffer(U.READ_FRAMEBUFFER,k),G.bindFramebuffer(U.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,n.__webglTexture,i),T?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,r.__webglTexture,a),i===0?T?U.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):U.copyTexSubImage2D(v,a,f,p,l,u,o,s):U.blitFramebuffer(l,u,o,s,f,p,o,s,U.COLOR_BUFFER_BIT,U.NEAREST);G.bindFramebuffer(U.READ_FRAMEBUFFER,null),G.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?U.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?U.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):U.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):U.texSubImage2D(U.TEXTURE_2D,a,f,p,o,s,g,_,h);G.pixelStorei(U.UNPACK_ROW_LENGTH,y),G.pixelStorei(U.UNPACK_IMAGE_HEIGHT,b),G.pixelStorei(U.UNPACK_SKIP_PIXELS,x),G.pixelStorei(U.UNPACK_SKIP_ROWS,S),G.pixelStorei(U.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&U.generateMipmap(v),G.unbindTexture()},this.initRenderTarget=function(e){K.get(e).__webglFramebuffer===void 0&&q.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?q.setTextureCube(e,0):e.isData3DTexture?q.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?q.setTexture2DArray(e,0):q.setTexture2D(e,0),G.unbindTexture()},this.resetState=function(){j=0,M=0,N=null,G.reset(),Ne.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Sd}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ld._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ld._getUnpackColorSpace()}}})),Vy,Hy=i((()=>{By(),Ai(),gc(),Vy=class{host;showcase;onLayout;renderer=null;scene=new Nf;camera=new eg(-14,14,10,-10,.1,120);world=new Tf;scenery=new Tf;table=new Tf;players=new Map;cube=new Um(1,1,1);materials=new Map;effects=new Set;textures=new Set;sharedGeometries=new Set;effectGeometry=new Map;damageTextures=new Map;resize;frame=0;last=0;dirty=!1;cadenceAt=0;width=0;height=0;fitKey=``;stateKey=``;qualityTier=0;qualityFrames=0;qualityCost=0;qualityLate=0;heavyWindows=0;lightWindows=0;qualityChangedAt=0;moon=null;disposed=!1;reduced=matchMedia(`(prefers-reduced-motion: reduce)`).matches;mobile=matchMedia(`(pointer: coarse)`).matches;cardBack=null;cardAtlas=null;state=null;viewer=``;geometry={seats:{},table:{left:.1,top:.2,width:.8,height:.6},center:{x:.5,y:.5}};layoutKey=``;onVisibility=()=>{if(document.hidden){cancelAnimationFrame(this.frame),this.frame=0,this.last=this.cadenceAt=0,this.qualityFrames=this.qualityCost=this.qualityLate=this.heavyWindows=this.lightWindows=0;for(let e of[...this.effects])this.release(e)}else this.last=this.cadenceAt=0,this.draw()};constructor(e,t=!1){this.host=e,this.showcase=t;let n=navigator.hardwareConcurrency||0,r=navigator.deviceMemory||0;this.qualityTier=n>0&&n<=2||r>0&&r<=2?2:this.mobile||n>0&&n<=4||r>0&&r<=4?1:0,this.qualityChangedAt=performance.now(),this.resize=new ResizeObserver(()=>this.fit()),this.scene.add(this.world),this.world.add(this.scenery,this.table);try{this.renderer=new zy({antialias:!1,alpha:!0,powerPreference:`low-power`}),this.renderer.outputColorSpace=gd,this.renderer.shadowMap.autoUpdate=!1,this.renderer.shadowMap.type=2,this.applyQuality(),this.renderer.domElement.setAttribute(`aria-hidden`,`true`),this.renderer.domElement.style.pointerEvents=`none`,this.host.append(this.renderer.domElement),this.scene.add(new zh(`#a6c5d1`,`#10191e`,1.8));let t=new ng(`#d6e4f2`,1.6);this.moon=t,t.position.set(-8,17,8),t.castShadow=!this.mobile,t.shadow.mapSize.set(1024,1024),t.shadow.camera.left=t.shadow.camera.bottom=-17,t.shadow.camera.right=t.shadow.camera.top=17,this.scene.add(t);let n=new $h(`#ffc16a`,38,26,1.8);n.position.set(0,5,-3),this.scene.add(n),this.build(),this.resize.observe(e),document.addEventListener(`visibilitychange`,this.onVisibility),this.fit()}catch{cancelAnimationFrame(this.frame),this.frame=0,this.host.classList.add(`scene-fallback`),this.renderer?.domElement.remove(),this.renderer?.dispose(),this.renderer=null,this.resize.observe(e),this.fit()}}mat(e,t=!1){let n=e+(t?`-light`:``);return this.materials.has(n)||this.materials.set(n,new hh({color:e,roughness:.92,metalness:t?0:.12,flatShading:!0,emissive:t?e:`#000000`,emissiveIntensity:t?1.1:0})),this.materials.get(n)}block(e,t,n,r,i,a,o,s){let c=new mm(this.cube,this.mat(o));return c.position.set(e,t,n),c.scale.set(r,i,a),c.castShadow=c.receiveShadow=!0,s.add(c),c}batchBlocks(e){let t=new Map;for(let n of e.children){if(!(n instanceof mm)||n instanceof wm||n.geometry!==this.cube||Array.isArray(n.material))continue;let e=t.get(n.material)||[];e.push(n),t.set(n.material,e)}for(let[n,r]of t){if(r.length<2)continue;let t=new wm(this.cube,n,r.length);r.forEach((n,r)=>{n.updateMatrix(),t.setMatrixAt(r,n.matrix),e.remove(n)}),t.castShadow=t.receiveShadow=!0,t.computeBoundingSphere(),e.add(t)}}cachedGeometry(e,t){let n=this.effectGeometry.get(e);return n||(n=t(),this.effectGeometry.set(e,n),this.sharedGeometries.add(n)),n}boxGeometry(e,t,n){return this.cachedGeometry(`box:${e}:${t}:${n}`,()=>new Um(e,t,n))}shadowChanged(){this.renderer?.shadowMap.enabled&&(this.renderer.shadowMap.needsUpdate=!0)}applyQuality(){if(!this.renderer)return;let e=Math.min(devicePixelRatio||1,this.qualityTier===2?.75:this.qualityTier===1||this.mobile?1:1.25);this.renderer.getPixelRatio()!==e&&this.renderer.setPixelRatio(e);let t=!this.mobile&&this.qualityTier===0;if(this.renderer.shadowMap.enabled!==t){this.renderer.shadowMap.enabled=t,!t&&this.moon?.shadow.map&&(this.moon.shadow.map.dispose(),this.moon.shadow.map=null);let e=new Set(this.materials.values());this.scene.traverse(t=>{let n=t.material;Array.isArray(n)?n.forEach(t=>e.add(t)):n&&e.add(n)});for(let t of e)t instanceof hh&&(t.needsUpdate=!0);this.shadowChanged()}this.draw()}sampleQuality(e,t,n){if(!t||(this.qualityCost+=e,this.qualityLate+=+(t>24),++this.qualityFrames<60))return;let r=this.qualityCost/this.qualityFrames,i=this.qualityLate/this.qualityFrames;if(this.heavyWindows=r>10||i>.25?this.heavyWindows+1:0,this.lightWindows=r<5&&i<.05?this.lightWindows+1:0,this.qualityFrames=this.qualityCost=this.qualityLate=0,this.heavyWindows>=2&&this.qualityTier<2&&n-this.qualityChangedAt>4e3)this.qualityTier+=1;else if(this.lightWindows>=6&&this.qualityTier>0&&n-this.qualityChangedAt>12e3)--this.qualityTier;else return;this.heavyWindows=this.lightWindows=0,this.qualityChangedAt=n,this.applyQuality()}loadTexture(e,t){new Lh().load(e,e=>{this.disposed?e.dispose():(e.colorSpace=gd,e.minFilter=e.magFilter=Zl,e.generateMipmaps=!1,this.textures.add(e),t(e),this.draw())},void 0,()=>{})}build(){this.block(0,-.3,0,25,.5,23,`#14272b`,this.scenery);let e=new wm(this.cube,this.mat(`#263c40`),168),t=new Xd,n=0;for(let r=-10;r<11;r+=1.5)for(let i=-9;i<9&&n!==168;i+=1.5)t.compose(new X(r,-.03,i),new Ad,new X(1.4,.05,1.4)),e.setMatrixAt(n++,t);e.count=n,e.receiveShadow=!0,this.scenery.add(e),this.block(0,.05,-9,17,.3,3.5,`#59635a`,this.scenery);for(let e of[-7,-3.5,0,3.5,7])this.block(e,1.9,-10,.3,3.8,.3,`#6c4336`,this.scenery);for(let e=0;e<5;e++)this.block(0,3.9+e*.22,-10,18-e*2,.25,4-e*.55,e%2?`#233c48`:`#31525a`,this.scenery);for(let e of[-10,10])for(let t of[-6,6])this.block(e,.9,t,.36,1.8,.36,`#4d4535`,this.scenery),this.block(e,2.1,t,1.6,1,1.7,`#23453c`,this.scenery),this.block(e-.25,2.8,t,1.2,.5,1.3,`#335d4c`,this.scenery);for(let e of[-8.4,8.4])for(let t of[-5.3,5.3])this.block(e,.9,t,.16,1.8,.16,`#7c563b`,this.scenery),this.block(e,1.95,t,.65,.75,.65,`#dea457`,this.scenery).material=this.mat(`#edb865`,!0),this.block(e,2.36,t,.85,.12,.85,`#513d2e`,this.scenery),this.block(e,1.52,t,.85,.12,.85,`#513d2e`,this.scenery);for(let e of[-5.3,5.3])for(let t of[-2.8,2.8])this.block(e,.91,t,.65,.38,.65,`#4d3129`,this.table),this.block(e,.74,t,.87,.12,.87,`#a97943`,this.table);this.block(0,1.17,0,13.2,.46,7.8,`#62432e`,this.table),this.block(0,1.41,0,13.35,.08,7.95,`#c28e47`,this.table),this.block(0,1.47,0,13.05,.06,7.65,`#936a39`,this.table),this.block(0,1.52,0,12.4,.05,7,`#1f5146`,this.table),this.block(0,1.553,0,12.03,.02,6.62,`#32695a`,this.table);for(let e of[-6.43,6.43])for(let t of[-3.65,3.65])this.block(e,1.57,t,.4,.07,.4,`#e6be75`,this.table);for(let e of[-3.79,3.79])for(let t=-5.8;t<=5.8;t+=.65)this.block(t,1.58,e,.24,.06,.11,`#cda362`,this.table);for(let e=0;e<7;e++)this.block(-1.1,1.61+e*.028,-.25,.75,.028,1.06,e===6?`#9b713d`:`#decdaa`,this.table);if(this.loadTexture(`/art/card-back.png`,e=>{this.cardBack=e;let t=new mm(new sh(.73,1.02),new hh({map:e,roughness:1}));t.rotation.x=-Math.PI/2,t.position.set(-1.1,1.81,-.25),this.table.add(t)}),this.loadTexture(`/art/cards-atlas.png`,e=>{this.cardAtlas=e}),this.batchBlocks(this.scenery),this.batchBlocks(this.table),this.shadowChanged(),this.showcase)for(let e=0;e<6;e++){let t=this.createToken(`show-`+e,[`#b6373a`,`#365aa4`,`#327353`,`#be893c`][e%4]),n=e/6*Math.PI*2;t.position.set(Math.sin(n)*7.6,0,Math.cos(n)*5.1)}}createToken(e,t){let n=new Tf;return this.block(0,.23,0,.82,.13,.75,`#30332d`,n),this.block(0,.65,0,.46,.8,.4,t,n),this.block(0,1.17,0,.4,.4,.38,`#dfae81`,n),this.block(0,1.42,0,.5,.12,.43,`#172931`,n),this.block(-.32,.74,0,.17,.57,.25,t,n),this.block(.32,.74,0,.17,.57,.25,t,n),this.block(.39,.84,-.15,.07,1.03,.07,`#d8c38c`,n),this.world.add(n),this.players.set(e,n),n}update(e,t){this.state=e,t&&(this.viewer=t);let n=JSON.stringify([this.viewer,e.currentTurnPlayerId,e.turnOrder.map(t=>[t,sc(e.players[t]?.character),e.players[t]?.isAlive])]);if(n!==this.stateKey){this.stateKey=n;for(let[t,n]of this.players)(!e.turnOrder.includes(t)||!e.players[t])&&(this.world.remove(n),this.players.delete(t));for(let t of e.turnOrder){let n=e.players[t];if(!n)continue;let r=pc[sc(n.character)],i=r?mc[r.faction].color:`#6b7671`,a=this.players.get(t);a||=this.createToken(t,i);for(let e of a.children){let t=e;(t.scale.y===.8||t.scale.y===.57)&&(t.material=this.mat(i))}a.visible=n.isAlive,a.scale.setScalar(this.tokenScale(t))}this.fit(),this.shadowChanged(),this.draw()}}layout(){return this.geometry}setViewPlayerId(e){e!==this.viewer&&(this.viewer=e,this.fit())}setEffectsReduced(e){if(this.reduced!==e){this.reduced=e;for(let e of[...this.effects])this.release(e);this.draw()}}seatLayout(e,t){if(!this.state)return{};let n=this.state.turnOrder.filter(e=>this.state.players[e]),r=n.includes(this.viewer)?this.viewer:n[0],i=n.indexOf(r),a=[...n.slice(i),...n.slice(0,i)],o=a.length-1,s=o>=7?o%2?3:2:o%2?1:2,c=Math.max(0,(o-s)/2),l=t<250,u=e<600&&!l,d=l?.095:u?.13:.115,f=l?Math.min(.18,25/t):u?.075:.09,p=s===1?[.5]:s===2?l?[.37,.63]:[.32,.68]:l?[.32,.5,.68]:[.16,.5,.84],m=c===1?[.47]:c===2?[.34,.7]:l?[.18,.5,.82]:[.3,.51,.72],h=[{x:.5,y:l?.86:.9}];for(let e of[...m.slice(0,c)].reverse())h.push({x:d,y:e});for(let e of p.slice(0,Math.min(s,o)))h.push({x:e,y:f});for(let e of m.slice(0,c))h.push({x:1-d,y:e});return Object.fromEntries(a.map((e,t)=>[e,h[t]||{x:.5,y:.5}]))}atScreen(e,t,n=.7){let r=new bg;return r.setFromCamera(new Y(e*2-1,1-t*2),this.camera),r.ray.intersectPlane(new Np(new X(0,1,0),-n),new X)||new X}tokenScale(e){return(this.height<250?.32:this.width<600?.7:.76)*(this.state?.currentTurnPlayerId===e?1.1:1)}fit(){if(this.disposed)return;let e=this.host.clientWidth,t=Math.max(1,this.host.clientHeight);if(!e)return;let n=JSON.stringify([e,t,this.viewer,this.state?.turnOrder.filter(e=>this.state.players[e])]);if(n===this.fitKey)return;this.fitKey=n;let r=this.width!==e||this.height!==t;this.width=e,this.height=t;let i=t<250&&!this.showcase,a=this.showcase?.78:i?.18:e<600?.76:.62;if(r){this.camera.position.set(0,1.23+Math.sin(a)*34,Math.cos(a)*34),this.camera.lookAt(0,1.23,0),this.camera.updateMatrixWorld();let n=this.showcase?new Jf(new X(-11,-.5,-12),new X(11,5.2,8)):new Jf(new X(-6.75,.67,-4.05),new X(6.75,1.83,4.05)),r=[];for(let e of[n.min.x,n.max.x])for(let t of[n.min.y,n.max.y])for(let i of[n.min.z,n.max.z])r.push(new X(e,t,i));let o=r.map(e=>e.clone().applyMatrix4(this.camera.matrixWorldInverse)),s=Math.min(...o.map(e=>e.x)),c=Math.max(...o.map(e=>e.x)),l=Math.min(...o.map(e=>e.y)),u=Math.max(...o.map(e=>e.y)),d=e/t,f=this.showcase?1.08:i?1.09:1.18,p=Math.max((c-s)*f,(u-l)*f*d),m=p/d,h=(l+u)/2;this.camera.left=-p/2,this.camera.right=p/2,this.camera.top=h+m/2,this.camera.bottom=h-m/2,this.camera.updateProjectionMatrix(),this.renderer?.setSize(e,t),this.scenery.visible=this.showcase||!i;let g=r.map(e=>e.clone().project(this.camera)),_=(Math.min(...g.map(e=>e.x))+1)/2,v=(Math.max(...g.map(e=>e.x))+1)/2,y=(1-Math.max(...g.map(e=>e.y)))/2,b=(1-Math.min(...g.map(e=>e.y)))/2;this.geometry={seats:{},table:{left:_,top:y,width:v-_,height:b-y},center:{x:.5,y:i?.65:.5}}}if(this.geometry.seats=this.seatLayout(e,t),this.state)for(let[e,t]of Object.entries(this.geometry.seats)){let n=this.players.get(e);n&&(n.scale.setScalar(this.tokenScale(e)),n.position.copy(this.atScreen(t.x,t.y+(i?.02:.035),.15)),n.rotation.y=Math.atan2(-n.position.x,-n.position.z))}let o=JSON.stringify([e,t,this.geometry]);o!==this.layoutKey&&(this.layoutKey=o,this.host.dataset.tableBounds=JSON.stringify(this.geometry.table),this.onLayout?.(this.geometry)),this.shadowChanged(),this.draw()}origin(e){let t=e?this.geometry.seats[e]:null;return t?this.atScreen(t.x,t.y,1.8):this.atScreen(.5,.5,1.8)}effect(e){if(!this.renderer||this.disposed||document.hidden)return null;let t=this.mobile||this.width<600?9:18;this.effects.size>=t&&this.release(this.effects.values().next().value);let n={group:new Tf,timeline:ki.timeline()};return this.world.add(n.group),this.effects.add(n),n.timeline.call(()=>this.release(n),[],e),this.draw(),n}release(e){this.effects.delete(e)&&(e.timeline.kill(),this.world.remove(e.group),e.group.traverse(e=>{let t=e;t.geometry&&!this.sharedGeometries.has(t.geometry)&&t.geometry.dispose();for(let e of Array.isArray(t.material)?t.material:t.material?[t.material]:[]){let t=e.map;t&&!this.textures.has(t)&&t.dispose(),e.dispose()}}),this.draw())}fxMesh(e,t,n=1){return new mm(e,new nm({color:t,transparent:!0,opacity:n,depthWrite:!1,side:2}))}ring(e,t,n=.7,r=!1){let i=this.effect(r?.55:.85);if(!i)return;let a=this.fxMesh(this.cachedGeometry(`ring:${n}`,()=>new ch(n*.82,n,8)),t,.85);a.rotation.x=-Math.PI/2,a.position.copy(e),i.group.add(a),r||i.timeline.fromTo(a.scale,{x:.5,y:.5,z:.5},{x:1.8,y:1.8,z:1.8,duration:.65,ease:`power2.out`},0),i.timeline.to(a.material,{opacity:0,duration:.25},r?.3:.6)}sparks(e,t,n=12,r=1,i=.65){let a=this.effect(i+.05);if(!a)return;let o=Math.min(n,this.qualityTier===2?4:this.qualityTier===1||this.mobile||this.width<600?7:13);for(let n=0;n<o;n++){let s=n/o*Math.PI*2,c=this.fxMesh(this.boxGeometry(.09,.09,.09),t);c.position.copy(e),a.group.add(c),a.timeline.to(c.position,{x:e.x+Math.sin(s)*r,y:e.y+.35+n%3*.22,z:e.z+Math.cos(s)*r,duration:i,ease:`power2.out`},0),a.timeline.to(c.scale,{x:.1,y:.1,z:.1,duration:i*.55},i*.4),a.timeline.to(c.material,{opacity:0,duration:i*.5},i*.5)}}trail(e,t,n,r=.8,i=.38){let a=this.effect(i+.4);if(!a)return;let o=e.clone().lerp(t,.5);o.y+=r;let s=new ih(e,o,t),c=new Ep().setFromPoints(s.getPoints(24));c.setDrawRange(0,1);let l=new km({color:n,transparent:!0,opacity:.95,depthWrite:!1});a.group.add(new Lm(c,l));let u=this.fxMesh(this.boxGeometry(.14,.14,.14),n);u.position.copy(e),a.group.add(u);let d={value:0};a.timeline.to(d,{value:1,duration:i,ease:`power2.in`,onUpdate:()=>{c.setDrawRange(0,Math.max(2,Math.ceil(d.value*25))),u.position.copy(s.getPoint(d.value))}},0),a.timeline.to(l,{opacity:0,duration:.3},i),a.timeline.to(u.scale,{x:0,y:0,z:0,duration:.18},i)}slash(e){let t=this.effect(.48);if(!t)return;let n=this.fxMesh(this.cachedGeometry(`slash`,()=>new ch(.48,.67,9,1,.15,Math.PI*1.45)),`#f2e4bb`);n.position.copy(e),n.quaternion.copy(this.camera.quaternion),t.group.add(n),t.timeline.fromTo(n.rotation,{z:-.65},{z:.55,duration:.22,ease:`power3.out`},0),t.timeline.to(n.material,{opacity:0,duration:.2},.23)}thunder(e){let t=this.effect(.6);if(t){for(let[n,r]of[[0,`#d3f9ff`],[.55,`#64b6d4`]]){let i=this.cachedGeometry(`thunder:${n}`,()=>{let e=[new X(n,3,0),new X(.23,2.2,0),new X(-.26,1.55,0),new X(.12,.8,0),new X];return new lh(new Qm(e),18,n?.035:.065,4,!1)}),a=this.fxMesh(i,r);a.position.copy(e),t.group.add(a),t.timeline.to(a.material,{opacity:0,duration:.3},.13)}this.sparks(e,`#b6f3ff`,13,.95,.5),this.ring(e,`#88cbd5`,.7)}}fire(e){let t=this.effect(.8);if(!t)return;let n=this.qualityTier===2?3:this.mobile||this.qualityTier===1?4:7;for(let r=0;r<n;r++){let i=r/n*Math.PI*2,a=this.fxMesh(this.boxGeometry(.24,.65,.24),r%2?`#ffd08b`:`#ef8a45`,.9);a.position.copy(e).add(new X(Math.sin(i)*.35,.18,Math.cos(i)*.35)),t.group.add(a),t.timeline.fromTo(a.scale,{x:.6,y:.25,z:.6},{x:.4,y:1.5+r%2,z:.4,duration:.55,ease:`power2.out`},0),t.timeline.to(a.position,{y:e.y+.8,duration:.55},0),t.timeline.to(a.material,{opacity:0,duration:.35},.3)}this.sparks(e,`#ffbb64`,13,1.05,.65),this.ring(e,`#ed8559`,.85)}damageLabel(e,t,n){if(!Number.isFinite(t)||t<=0)return;let r=this.effect(.95);if(!r)return;let i=Math.min(99,Math.round(t)),a=this.damageTextures.get(i);if(!a){let e=document.createElement(`canvas`);e.width=160,e.height=96;let t=e.getContext(`2d`);if(!t){this.release(r);return}t.font=`bold 70px sans-serif`,t.textAlign=`center`,t.textBaseline=`middle`,t.lineWidth=7,t.strokeStyle=`#15252a`,t.fillStyle=`#ffe4b4`,t.strokeText(`-`+i,80,48),t.fillText(`-`+i,80,48),a=new zm(e),a.minFilter=a.magFilter=Zl,a.generateMipmaps=!1,i>=1&&i<=9&&(this.damageTextures.set(i,a),this.textures.add(a))}let o=new Ip({map:a,transparent:!0,depthTest:!1,depthWrite:!1}),s=n?this.geometry.seats[n]:null,c=s?this.atScreen(Math.max(.04,Math.min(.96,s.x+(s.x>=.5?-1:1)*(this.host.clientWidth<900?62:90)/this.host.clientWidth)),s.y+.04,1.8):e,l=new Xp(o);this.sharedGeometries.add(l.geometry),l.position.copy(c),l.scale.set(1.25,.75,1),r.group.add(l),this.reduced||r.timeline.to(l.position,{y:l.position.y+.55,duration:.75,ease:`power2.out`},0),r.timeline.to(o,{opacity:0,duration:.2},.72)}shield(e,t=`#9acfd3`){let n=this.effect(.68);if(!n)return;let r=this.fxMesh(this.cachedGeometry(`shield`,()=>new ch(.56,.63,6)),t,.95);r.position.copy(e),r.quaternion.copy(this.camera.quaternion),n.group.add(r),n.timeline.fromTo(r.scale,{x:.7,y:.7,z:.7},{x:1.35,y:1.35,z:1.35,duration:.35},0),n.timeline.to(r.material,{opacity:0,duration:.28},.35),this.sparks(e,t,7,.5,.45)}flyingCard(e){let t=this.origin(e.playerId),n=this.atScreen(this.geometry.center.x,this.geometry.center.y,1.85),r=this.effect(1.05);if(!r)return;let i=new Tf;i.position.copy(t),r.group.add(i);let a=this.fxMesh(this.boxGeometry(.72,.035,1.02),`#efdfb4`);i.add(a);let o=this.cardBack,s=this.cachedGeometry(`card-back`,()=>new sh(.7,1)),c=e.card&&dc[e.card.name];c&&this.cardAtlas&&(o=this.cardAtlas,s=this.cachedGeometry(`card:${c.art}`,()=>{let e=new sh(.7,1),t=e.getAttribute(`uv`),n=c.art,r=Math.floor(n/7),i=r===4?8:7,a=r===4?n===34?7:n-28:n%7;for(let e=0;e<t.count;e++)t.setXY(e,(a+t.getX(e))/i,1-(r+1)/6+t.getY(e)/6);return e}));let l=new nm({map:o,color:o?`#ffffff`:`#bf9e66`,side:2,transparent:!0,depthWrite:!1}),u=new mm(s,l);u.rotation.x=-Math.PI/2,u.position.y=.03,i.add(u),i.rotation.y=-.5,r.timeline.to(i.position,{x:n.x,y:n.y,z:n.z,duration:.48,ease:`power2.out`},0),r.timeline.to(i.rotation,{y:.06,duration:.48},0),r.timeline.fromTo(i.scale,{x:.65,y:.65,z:.65},{x:1.1,y:1.1,z:1.1,duration:.48},0),r.timeline.to(i.scale,{x:.95,y:.95,z:.95,duration:.12},.48),r.timeline.to(l,{opacity:0,duration:.25},.75),r.timeline.to(a.material,{opacity:0,duration:.25},.75)}event(e,t){if(!t||!this.renderer||this.disposed||document.hidden)return;let n=String(t.cardName||t.skillId||``),r=e===`card_played`&&(n===`DODGE`||n===`NEGATE`)?t.playerId:t.targetId||t.targetPlayerId||t.playerId,i=this.origin(r);if(this.reduced){this.ring(i,e===`damage_log`?`#e59471`:[`PEACH`,`PEACH_GARDEN`].includes(n)?`#9cdbc1`:`#e6c282`,.65,!0),e===`damage_log`&&this.damageLabel(i,Number(t.damage),r);return}if(e===`damage_log`){t.damageType===`THUNDER`?this.thunder(i):t.damageType===`FIRE`?this.fire(i):(this.slash(i),this.sparks(i,`#d7b176`,12,.7,.4)),this.damageLabel(i,Number(t.damage),r);return}if(e===`judgement_result`){this.shield(i,t.isSuccess?`#abd9b4`:`#d29b76`);return}if([`death`,`dying`,`victory`,`acquire`,`turn`,`prompt`].includes(e)){this.ring(i,e===`victory`?`#f5d391`:e===`acquire`?`#a4cbbc`:`#dd8e74`,e===`victory`?1.25:.75),[`death`,`dying`,`victory`].includes(e)&&this.sparks(i,e===`victory`?`#ecc983`:`#c79471`,12,.8,.6);return}if(e!==`card_played`)return;t.kind!==`SKILL`&&this.flyingCard(t);let a=this.origin(t.playerId),o=t.targetIds?.length?t.targetIds:t.targetId?[t.targetId]:[],s=o.length?o.map(e=>this.origin(e)):[a];if(n===`NEGATE`){this.ring(a,`#b39dda`,1),this.shield(a,`#c6b1e5`);return}if(n===`DODGE`||t.kind===`RESPONSE`&&![`SLASH`,`THUNDER_ATTACK`,`PEACH`,`WINE`].includes(n)){this.shield(a);return}if([`PEACH`,`PEACH_GARDEN`,`WINE`].includes(n)){for(let e of s)this.ring(e,`#a5daba`,.8);return}if(t.kind===`SKILL`){this.ring(a,`#e6c282`,.9);for(let e of s)this.trail(a,e,`#d6b778`,.45,.48);return}let c=n===`FIRE_ATTACK`,l=n===`THUNDER_ATTACK`||n===`LIGHTNING`,u=c?`#ffb15f`:l?`#89d7e5`:n===`SLASH`?`#e4d3ab`:`#adb8df`;for(let e of s)e.distanceTo(a)>.1&&this.trail(a,e,u,c?1.4:.65);c?this.sparks(a,`#df9e61`,9,.65,.5):l?this.ring(a,`#86bdce`,.6):dc[n]?.kind===`EQUIPMENT`?this.shield(a,`#d3ba83`):n!==`SLASH`&&this.ring(a,`#b9bbd6`,.65)}draw(){this.dirty=!0,this.renderer&&!this.disposed&&!document.hidden&&!this.frame&&(this.frame=requestAnimationFrame(this.loop))}loop=e=>{if(this.frame=0,this.disposed||document.hidden||!this.renderer)return;let t=1e3/60,n=e-this.last;if(!this.last||n>=16.166666666666668){let r=this.effects.size>0;if(this.dirty||r){this.dirty=!1,this.last=!this.last||n<t?e:e-n%t;let i=performance.now();this.renderer.render(this.scene,this.camera);let a=performance.now()-i;if(r){let t=this.cadenceAt?e-this.cadenceAt:0;this.cadenceAt=e,this.sampleQuality(a,t,e)}else this.cadenceAt=0}}this.dirty||this.effects.size?this.frame||=requestAnimationFrame(this.loop):this.last=this.cadenceAt=0};dispose(){if(this.disposed)return;this.disposed=!0,cancelAnimationFrame(this.frame),this.resize.disconnect(),document.removeEventListener(`visibilitychange`,this.onVisibility);for(let e of[...this.effects])this.release(e);let e=new Set,t=new Set;this.scene.traverse(n=>{n instanceof wm&&n.dispose();let r=n;if(r.geometry&&e.add(r.geometry),r.material)for(let e of Array.isArray(r.material)?r.material:[r.material])t.add(e)}),e.add(this.cube);for(let t of this.sharedGeometries)e.add(t);for(let e of this.materials.values())t.add(e);for(let t of e)t.dispose();for(let e of t)e.dispose();for(let e of this.textures)e.dispose();for(let e of this.scene.children)e instanceof Rh&&`shadow`in e&&e.shadow?.dispose();this.renderer?.dispose(),this.renderer?.domElement.remove(),this.players.clear(),this.materials.clear(),this.textures.clear(),this.sharedGeometries.clear(),this.effectGeometry.clear(),this.damageTextures.clear(),this.onLayout=void 0}}}));function Uy(e){let t=Jy(e),n=qy(t.name),r=qy(t.id),i=qy(t.suit),a=qy(t.type);if(!(!Object.hasOwn(dc,n)||!r||![`SPADE`,`HEART`,`CLUB`,`DIAMOND`].includes(i)||![`BASIC`,`KIT`,`DELAYED`,`EQUIPMENT`].includes(a)||!Number.isInteger(t.rank)||Number(t.rank)<1||Number(t.rank)>13))return{id:r,name:n,suit:i,type:a,rank:Number(t.rank)}}var Wy,Gy,Ky,qy,Jy,Yy,Xy,Zy,Qy=i((()=>{gc(),Wy=new Set([`ZHIHENG`,`RENDE`,`KUROU`,`LIJIAN`,`FANJIAN`,`HUJIA`,`JIJIANG`,`JIANXIONG`,`FANKUI`,`GUICAI`,`GUANXING`,`LUOSHEN`,`BIYUE`,`YINGZI`,`WUSHENG`,`LONGDAN`,`QINGGUO`]),Gy={"สกิล Zhiheng (ผลัดการ์ด)":`ZHIHENG`,"สกิล Rende (ปันสุข)":`RENDE`,"สกิล Ku Rou (โบยตนเอง)":`KUROU`},Ky=`wtk.feedback`,qy=e=>typeof e==`string`&&e.length<=160?e:``,Jy=e=>e&&typeof e==`object`&&!Array.isArray(e)?e:{},Yy=e=>Math.max(0,Math.min(1,e)),Xy=class{keys=new Set;accept(e){return!this.keys.has(e)&&(this.keys.add(e),this.keys.size>256&&this.keys.delete(this.keys.values().next().value),!0)}clear(){this.keys.clear()}},Zy=class{callbacks;settings={volume:.35,muted:!1,unlocked:!1};context=null;master=null;compressor=null;noise=null;voices=new Set;eventKeys=new Xy;playKeys=new Xy;observation=null;roomId=``;localSequence=0;disposed=!1;lastImpact=-1/0;lastExplainedAcquisition=-1/0;importantLayer=!1;onVisibility=()=>{document.hidden&&this.stopVoices()};constructor(e={}){this.callbacks=e;try{let e=JSON.parse(localStorage.getItem(Ky)||`null`);e&&typeof e.volume==`number`&&Number.isFinite(e.volume)&&(this.settings.volume=Yy(e.volume)),e&&typeof e.muted==`boolean`&&(this.settings.muted=e.muted)}catch{}typeof document<`u`&&document.addEventListener(`visibilitychange`,this.onVisibility)}getSettings(){return{...this.settings}}preview(e=`impact`){if(this.disposed)return;let t=this.context;!t||t.state!==`running`||!this.settings.unlocked||this.settings.muted||!this.settings.volume||typeof document<`u`&&document.hidden||this.playAudio(e)}resetBaseline(){this.observation=null}unlock(){if(this.disposed||typeof window>`u`||this.context?.state===`running`&&this.settings.unlocked)return Promise.resolve();try{if(!this.context){let e=window.AudioContext||window.webkitAudioContext;if(!e)return Promise.resolve();this.context=new e,this.master=this.context.createGain(),this.compressor=this.context.createDynamicsCompressor(),this.compressor.threshold.value=-12,this.compressor.knee.value=12,this.compressor.ratio.value=6,this.compressor.attack.value=.004,this.compressor.release.value=.15,this.compressor.connect(this.master),this.master.connect(this.context.destination),this.master.gain.value=this.settings.muted?0:this.settings.volume;let t=Math.ceil(this.context.sampleRate*1.3);this.noise=this.context.createBuffer(1,t,this.context.sampleRate);let n=this.noise.getChannelData(0),r=170513;for(let e=0;e<n.length;e++)r^=r<<13,r^=r>>>17,r^=r<<5,n[e]=(r>>>0)/4294967296*2-1;this.context.onstatechange=()=>{this.disposed||(this.settings.unlocked=this.context?.state===`running`,this.notifySettings())}}let e=this.context;return e.resume().then(()=>{this.disposed||this.context!==e||(this.settings.unlocked=e.state===`running`,this.notifySettings())}).catch(()=>{this.disposed||(this.settings.unlocked=!1,this.notifySettings())})}catch{return this.settings.unlocked=!1,this.notifySettings(),Promise.resolve()}}setVolume(e){!this.disposed&&Number.isFinite(e)&&(this.settings.volume=Yy(e),this.applySettings())}toggleMute(){return this.disposed||(this.settings.muted=!this.settings.muted,this.applySettings()),this.settings.muted}applySettings(){if(this.master&&this.context){let e=this.context.currentTime;this.master.gain.cancelScheduledValues(e),this.master.gain.setValueAtTime(this.settings.muted?0:this.settings.volume,e)}(this.settings.muted||this.settings.volume===0)&&this.stopVoices();try{localStorage.setItem(Ky,JSON.stringify({volume:this.settings.volume,muted:this.settings.muted}))}catch{}this.notifySettings()}notifySettings(){this.callbacks.onSettings?.(this.getSettings())}event(e,t){if(this.disposed||![`card_played`,`damage_log`,`judgement_result`].includes(e))return!1;let n=Jy(t),r=qy(n.eventId);if(e===`card_played`){let e=qy(n.playerId),t=Uy(n.card),i=qy(n.cardName),a=qy(n.skillId)||Gy[i],o=Wy.has(a)?a:void 0,s=Object.hasOwn(dc,i)?i:t?.name||``;if(!e||!s&&!o||r&&!this.eventKeys.accept(r))return!1;let c=qy(n.playId)||r||`local:${++this.localSequence}`;if(!this.playKeys.accept(c))return!1;let l=qy(n.targetId)||void 0,u=[...new Set((Array.isArray(n.targetIds)?n.targetIds:l?[l]:[]).map(qy).filter(Boolean))].slice(0,10),d={key:c,playerId:e,cardName:s,card:t,skillId:o,kind:o?`SKILL`:n.kind===`RESPONSE`?`RESPONSE`:`PLAY`,targetId:l,targetIds:u};this.callbacks.onPlay?.(d);let f=o?`skill`:s===`SLASH`?`slash`:s===`THUNDER_ATTACK`?`thunder-cast`:s===`FIRE_ATTACK`?`fire-cast`:s===`DODGE`?`defend`:s===`NEGATE`?`negate`:[`PEACH`,`PEACH_GARDEN`].includes(s)||s===`WINE`&&d.kind===`RESPONSE`?`heal`:dc[s]?.kind===`EQUIPMENT`?`equipment`:dc[s]?.kind===`KIT`||dc[s]?.kind===`DELAYED`?`spell`:`card`;return(f===`heal`||f===`skill`)&&(this.lastExplainedAcquisition=Date.now()),this.cue(f,{...d}),!0}if(e===`damage_log`){let e=qy(n.targetId),t=Number(n.damage),i=qy(n.damageType);return!e||!Number.isFinite(t)||t<=0||![`NORMAL`,`FIRE`,`THUNDER`].includes(i)||r&&!this.eventKeys.accept(r)?!1:(this.cue(i===`FIRE`?`fire-hit`:i===`THUNDER`?`thunder-hit`:`impact`,{targetId:e,attackerId:qy(n.attackerId),damage:t,hp:Number(n.hp),damageType:i}),!0)}let i=Uy(n.card),a=qy(n.targetPlayerId);return!i||!a||typeof n.isSuccess!=`boolean`||r&&!this.eventKeys.accept(r)?!1:(this.cue(n.isSuccess?`judgment-good`:`judgment-bad`,{targetId:a,card:i,isSuccess:n.isSuccess}),!0)}observeSnapshot(e,t){if(this.disposed)return;let n=e.pendingAction,r={roomId:e.roomId,myId:t,status:e.status,turn:e.currentTurnPlayerId,hand:new Set(e.players[t]?.hand?.map(e=>e.id)||[]),players:Object.fromEntries(Object.entries(e.players).map(([e,t])=>[e,{hp:t.hp,alive:t.isAlive}])),dying:n?.type===`DYING`?String(n.targetPlayerId||``):``,prompt:n&&(n.targetPlayerId===t||n.currentPlayerToSlash===t||n.currentPickerId===t||n.type===`DYING`&&e.turnOrder[n.currentAskerIdx]===t||n.type===`WAITING_FOR_AOE`&&n.targets?.[n.currentTargetIndex]===t)?`${n.type}:${n.targetPlayerId||n.currentPlayerToSlash||n.currentPickerId||``}`:``},i=this.observation;if(this.observation=r,!i||i.roomId!==r.roomId||i.myId!==t){this.roomId&&this.roomId!==r.roomId&&(this.eventKeys.clear(),this.playKeys.clear()),this.roomId=r.roomId;return}if(i.status!==`PLAYING`&&r.status===`PLAYING`){this.cue(`turn`,{playerId:r.turn,local:r.turn===t});return}if(i.status!==`ENDED`&&r.status===`ENDED`){this.cue(`victory`,{winnerRole:e.winnerRole});return}if(r.status!==`PLAYING`)return;for(let[e,t]of Object.entries(r.players)){let n=i.players[e];n?.alive&&!t.alive?this.cue(`death`,{targetId:e}):n&&t.alive&&t.hp>n.hp&&Date.now()-this.lastExplainedAcquisition>220&&this.cue(`heal`,{targetId:e,recovered:n.hp<=0,amount:t.hp-n.hp})}r.dying&&r.dying!==i.dying&&this.cue(`dying`,{targetId:r.dying}),r.turn!==i.turn&&this.cue(`turn`,{playerId:r.turn,local:r.turn===t}),r.prompt&&r.prompt!==i.prompt&&!r.dying&&this.cue(`prompt`,{playerId:t});let a=[...r.hand].filter(e=>!i.hand.has(e)).length;a&&Date.now()-this.lastExplainedAcquisition>220&&this.cue(`acquire`,{playerId:t,count:a})}cue(e,t){this.callbacks.onCue?.(e,t);let n=this.context;if(!(!n||n.state!==`running`||!this.settings.unlocked||this.settings.muted||!this.settings.volume||typeof document<`u`&&document.hidden)&&(e!==`turn`||t.local)){if([`impact`,`fire-hit`,`thunder-hit`].includes(e)){if(n.currentTime-this.lastImpact<.095)return;this.lastImpact=n.currentTime}this.playAudio(e)}}playAudio(e){if(this.importantLayer=[`impact`,`fire-hit`,`thunder-hit`,`dying`,`death`,`victory`].includes(e),this.importantLayer)for(let e of[...this.voices]){if(this.voices.size<=24)break;if(!e.important){try{e.source.stop()}catch{}this.releaseVoice(e)}}try{this.sound(e)}catch{this.stopVoices(),this.settings.unlocked=!1,this.notifySettings()}}sound(e){let t=(e,t,n,r=0,i=0)=>this.layer(`noise`,e,t,n,r,i),n=(e,t,n,r,i=0,a=`sine`)=>this.layer(a,e,n,r,i,0,t),r=(e=1)=>{n(132,72,.26,.16*e,.012,`triangle`),n(66,42,.34,.12*e,.03)};switch(e){case`card`:case`acquire`:t(3100,.085,e===`acquire`?.028:.05),t(1300,.14,.025,.028);break;case`slash`:t(1700,.19,.075),n(880,570,.16,.026,.045,`triangle`),t(4500,.045,.05,.11);break;case`equipment`:t(3700,.045,.045),n(310,300,.23,.075,0,`triangle`),n(810,790,.25,.032,.015),n(1420,1380,.18,.017,.022);break;case`impact`:t(2400,.035,.085),r(),t(430,.18,.045,.065);break;case`fire-cast`:t(680,.36,.065),t(3200,.15,.04,.05,-.25),n(150,90,.27,.035,.04,`triangle`);break;case`fire-hit`:t(2600,.042,.075),r(.85),t(480,.38,.075,.035),t(4200,.12,.025,.2,.25);break;case`thunder-cast`:t(4500,.065,.065),n(220,74,.28,.07,.035,`triangle`),t(1500,.18,.04,.09);break;case`thunder-hit`:t(4100,.036,.1),r(1.1),t(330,.56,.058,.055),t(2200,.1,.027,.17,-.3),t(1600,.15,.018,.3,.3);break;case`negate`:t(620,.18,.045),t(3400,.055,.07,.21),n(140,54,.27,.09,.23,`triangle`);break;case`defend`:t(2500,.115,.048),n(640,530,.17,.03,.027,`triangle`);break;case`heal`:t(5100,.2,.018),n(1330,1300,.36,.03),n(2180,2150,.26,.014,.035);break;case`judgment-good`:t(1900,.045,.045),n(930,905,.2,.023,.035);break;case`judgment-bad`:t(1400,.045,.055),n(190,110,.22,.065,.025,`triangle`);break;case`dying`:n(110,46,.6,.14,0,`triangle`),t(450,.48,.035,.035);break;case`death`:t(780,.065,.055),n(96,40,.62,.16,.016,`triangle`),t(240,.4,.035,.06);break;case`victory`:t(2500,.06,.055),n(170,90,.72,.13,.018,`triangle`),n(530,515,.9,.042,.05),n(1230,1180,.67,.026,.075),t(3200,.48,.023,.2,.25);break;case`turn`:case`prompt`:t(1800,.055,.026),n(460,410,.11,.019,.015);break;case`spell`:case`skill`:t(1100,.23,.044),n(230,120,.25,.06,.028,`triangle`),t(4700,.12,.02,.1,-.2)}}layer(e,t,n,r,i,a,o){let s=this.context,c=this.compressor;if(!s||!c||this.voices.size>=32)return;let l=s.currentTime+i,u=s.createGain(),d=[u],f=e===`noise`?s.createBufferSource():s.createOscillator();if(e===`noise`){f.buffer=this.noise;let e=s.createBiquadFilter();e.type=`bandpass`,e.frequency.value=t,e.Q.value=.7,f.connect(e),e.connect(u),d.push(e)}else{let r=f;r.type=e,r.frequency.setValueAtTime(t,l),r.frequency.exponentialRampToValueAtTime(Math.max(1,o||t),l+n),f.connect(u)}if(a&&typeof s.createStereoPanner==`function`){let e=s.createStereoPanner();e.pan.value=a,u.connect(e),e.connect(c),d.push(e)}else u.connect(c);u.gain.setValueAtTime(1e-4,l),u.gain.linearRampToValueAtTime(r,l+Math.min(.008,n/4)),u.gain.exponentialRampToValueAtTime(1e-4,l+n);let p={source:f,nodes:d,important:this.importantLayer};this.voices.add(p),f.onended=()=>this.releaseVoice(p),f.start(l),f.stop(l+n+.015)}releaseVoice(e){e.source.onended=null,e.source.disconnect(),e.nodes.forEach(e=>e.disconnect()),this.voices.delete(e)}stopVoices(){for(let e of[...this.voices]){try{e.source.stop()}catch{}this.releaseVoice(e)}}dispose(){this.disposed||(this.disposed=!0,typeof document<`u`&&document.removeEventListener(`visibilitychange`,this.onVisibility),this.stopVoices(),this.eventKeys.clear(),this.playKeys.clear(),this.observation=null,this.master?.disconnect(),this.compressor?.disconnect(),this.context&&(this.context.onstatechange=null,this.context.close().catch(()=>{})),this.context=null,this.master=null,this.compressor=null,this.noise=null,this.settings.unlocked=!1)}}}));function $y(e,t=!1){let n=Math.floor(t?e/5:e/7),r=t?5:n===4?8:7,i=t?3:6,a=t?e%5:n===4?e===34?7:e-28:e%7;return`style="background-size:${r*100}% ${i*100}%;--art-x:${a/(r-1)*100}%;--art-y:${n/(i-1)*100}%"`}function eb(e,t=``){let n=pc[sc(e)];return`<div class="portrait ${t}" ${$y(n?.art||0,!0)} aria-hidden="true"></div>`}function tb(e,t=`card`,n=!1){let r=dc[e.name];return`<button type="button" class="hand-card ${n?`selected`:``} ${[`HEART`,`DIAMOND`].includes(e.suit)?`red-suit`:``}" data-action="${t}" data-card="${Q(e.id)}" aria-pressed="${n}" aria-label="${Q(r?.name||e.name)} ${lb(e.suit)} ${cb(e.rank)}"><div class="card-art" ${$y(r?.art||0)} aria-hidden="true"></div><span class="card-rank">${cb(e.rank)}<small>${lb(e.suit)}</small></span><span class="card-title">${Q(r?.name||e.name)}</span><span class="card-kind">${{BASIC:`พื้นฐาน`,KIT:`กลยุทธ์`,DELAYED:`พิจารณา`,EQUIPMENT:`อุปกรณ์`}[e.type]||``}${r?.range?` · ระยะ `+r.range:``}</span></button>`}function nb(e,t,n=``){let r=dc[e]||dc[t?.name||``],i=!!t&&[`SPADE`,`HEART`,`CLUB`,`DIAMOND`].includes(t.suit)&&t.rank>=1&&t.rank<=13;return`<button type="button" class="hand-card public-card ${i&&[`HEART`,`DIAMOND`].includes(t.suit)?`red-suit`:``}" data-action="public-play" ${n} aria-label="ดู${Q(r?.name||e)}${i?` `+lb(t.suit)+` `+cb(t.rank):``}"><div class="card-art" ${$y(r?.art||0)} aria-hidden="true"></div>${i?`<span class="card-rank">${cb(t.rank)}<small>${lb(t.suit)}</small></span>`:``}<span class="card-title">${Q(r?.name||e)}</span><span class="card-kind">${t&&t.name!==e?`แปลงจาก `+Q(dc[t.name]?.name||t.name):`การ์ดที่เล่นแล้ว`}</span></button>`}function rb(e){let t=Math.min(6,Math.max(0,e));return`<span class="opponent-hand" aria-hidden="true">${Array.from({length:t},(e,n)=>`<span class="opponent-card-back" style="--back-offset:${n-(t-1)/2};--back-layer:${n}"></span>`).join(``)}</span>`}function ib(e,t,n){let r=e.turnOrder.filter(t=>e.players[t]?.isAlive),i=r.indexOf(t),a=r.indexOf(n);if(i<0||a<0)return 999;let o=Math.abs(i-a);return Math.max(1,Math.min(o,r.length-o)-+!!e.players[t].equipment.offensiveHorse+ +!!e.players[n].equipment.defensiveHorse)}function ab(e,t,n){let r=sc(e.character),i=[`HEART`,`DIAMOND`].includes(t.suit);return t.name===n||n===`SLASH`&&t.name===`THUNDER_ATTACK`||r===`ZHAO_YUN`&&[`SLASH`,`DODGE`].includes(t.name)&&[`SLASH`,`DODGE`].includes(n)||n===`SLASH`&&r===`GUAN_YU`&&i||n===`DODGE`&&r===`ZHEN_JI`&&!i}function ob(e){let t=e.pendingAction;return t?t.type===`DYING`?e.turnOrder[t.currentAskerIdx]:t.type===`WAITING_FOR_AOE`?t.targets?.[t.currentTargetIndex]:t.type===`WAITING_FOR_SLASH_DUEL`?t.currentPlayerToSlash:t.type===`WAITING_FOR_BUMPER_PICK`?t.currentPickerId:[`WAITING_FOR_FIRE_MATCH`,`WAITING_FOR_GREEN_DRAGON`,`WAITING_FOR_AXE_DISCARD`,`WAITING_FOR_TRIDENT_DISCARD`,`WAITING_FOR_FROST_DISCARD`].includes(t.type)?t.sourcePlayerId:t.targetPlayerId:null}var Q,sb,$,cb,lb,ub,db=i((()=>{gc(),Q=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),sb=e=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="${{play:`M8 5l11 7-11 7Z`,book:`M3 4h7l2 2 2-2h7v15h-7l-2 2-2-2H3Z M12 6v15`,arrow:`M4 12h16 M14 6l6 6-6 6`,close:`M6 6l12 12 M6 18L18 6`,back:`M15 5l-7 7 7 7`,users:`M15 20v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M8 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M17 3a4 4 0 0 1 0 8 M23 20v-2a4 4 0 0 0-3-3.9`,copy:`M9 9h12v12H9Z M15 9V3H3v12h6`,eye:`M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6`,settings:`M5 5h14v14H5Z M8 9h8 M8 15h8 M10 7v4 M14 13v4`,chat:`M3 4h18v13H8l-5 4Z M7 8h10 M7 12h7`,sound:`M3 9h4l5-4v14l-5-4H3Z M16 8a6 6 0 0 1 0 8 M19 5a10 10 0 0 1 0 14`,muted:`M3 9h4l5-4v14l-5-4H3Z M16 9l6 6 M16 15l6-6`,spark:`M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z`}[e]||`M4 12h16`}"/></svg>`,$=(e,t,n=``,r=``)=>`<button type="button" class="button ${n}" data-action="${e}" ${r}>${t}</button>`,cb=e=>({1:`A`,11:`J`,12:`Q`,13:`K`})[e]||String(e),lb=e=>({SPADE:`♠`,HEART:`♥`,CLUB:`♣`,DIAMOND:`♦`})[e]||`?`,ub=e=>`<span class="role-seal" style="--role:${hc[e]?.color||hc.UNKNOWN.color}">${Q(hc[e]?.seal||`?`)}</span>`}));a((()=>{l(),u(),d(),f(),Ai(),oc(),gc(),Jc(),Hy(),Qy(),db(),ki.registerPlugin(Xs);var e=document.querySelector(`#app`),t=document.querySelector(`#inspector`),n=matchMedia(`(prefers-reduced-motion: reduce)`).matches,r=null,i=``,a=null,o=null,s=``,c=`เชื่อมต่อแล้ว`,p=!1,m=6,h=new Set,g=[],_=``,v=``,y=``,b=!1,x=[],S=[],C=`HAND`,w=(()=>{try{let e=localStorage.getItem(`wtk.effectsReduced`);return e===`true`||e!==`false`&&n}catch{return n}})(),T=[],E={volume:.35,muted:!1,unlocked:!1},D=new Zy({onPlay:e=>{T=[e,...T.filter(t=>t.key!==e.key)].slice(0,4),pe()},onCue:(e,t)=>{[`dying`,`death`,`victory`,`acquire`,`turn`,`prompt`].includes(e)&&o?.event(e,t)},onSettings:e=>{let t=e.muted!==E.muted||e.volume!==E.volume;E=e,t&&!document.hidden&&K()}});E=D.getSettings();var O=new Map,k=new Map,A=new Map,j=new Map,M=new WeakMap,N=0,P=0,F=!0,I=null,L,ee=[];function te(e,t){let n=typeof t==`string`?t:JSON.stringify(t);return A.get(e)!==n&&(A.set(e,n),!0)}function R(e,t){M.get(e)!==t&&(M.set(e,t),e.innerHTML=t)}function z(e,t){e.textContent!==t&&(e.textContent=t)}var ne=new URLSearchParams(location.search),B=()=>r?.players[i],re=e=>B()?.hand?.find(t=>t.id===e)||Object.values(B()?.equipment||{}).find(t=>t?.id===e),ie=e=>({START:`เริ่มเทิร์น`,PREPARATION:`เตรียมการ`,JUDGEMENT:`พิจารณา`,DRAW:`จั่วการ์ด`,PLAY:`เล่นการ์ด`,DISCARD:`ทิ้งการ์ด`})[e]||e;function ae(e){let t=document.createElement(`div`);t.className=`notification`,t.textContent=e,document.querySelector(`#notifications`).append(t),setTimeout(()=>t.remove(),5e3)}function V(e){document.querySelector(`#inspector-content`).innerHTML=$(`close`,sb(`close`),`icon-button`,`aria-label="ปิดรายละเอียด"`)+e,t.open||t.showModal()}function oe(){t.close()}var se=(e=!1)=>`<header class="navigation ${e?`game-navigation`:``}"><a class="brand" href="/lobby" ${e?`data-action="leave"`:``}><span class="brand-seal">三</span><span>WTK<span class="brand-sub">PIXEL KINGDOMS</span></span></a><nav aria-label="เมนูหลัก">${e?`<span class="connection-state" id="connection-state">${Q(c)}</span>${$(`log`,sb(`chat`),`icon-button table-log`,`aria-label="เปิดบันทึกเหตุการณ์"`)}${$(`sound-settings`,sb(E.muted?`muted`:`sound`),`icon-button sound-control`,`aria-label="ตั้งค่าเสียงและเอฟเฟกต์"`)}${$(`copy`,sb(`copy`),`icon-button`,`aria-label="คัดลอกรหัสห้อง"`)}${$(`catalog`,sb(`book`),`icon-button`,`aria-label="คลังการ์ดและขุนพล"`)}${$(`leave`,sb(`back`),`icon-button`,`aria-label="ออกจากห้อง"`)}${p?$(`sandbox`,sb(`settings`),`icon-button`,`aria-label="สนามทดสอบ"`):``}`:`${$(`heroes`,`ขุนพล`,`text-button`)}${$(`rules`,`วิธีเล่น`,`text-button`)}${$(`leaderboard`,`อันดับ`,`text-button`)}`}</nav></header>`;function H(){o?.dispose(),s=`HOME`,O.clear(),k.clear();let t=qc.saved();e.innerHTML=`${se()}<main class="home"><section class="home-hero"><div class="hero-copy"><div class="eyebrow">WAR OF THREE KINGDOMS</div><h1>หนึ่งแผ่นดิน<br><span>หลายชะตา</span></h1><p class="hero-description">ทุกการ์ดมีเดิมพัน ทุกพันธมิตรมีความลับ<br>เลือกขุนพล แล้วเขียนตำนานสามก๊กของคุณ</p><div class="hero-actions">${$(`quick-bot`,`${sb(`play`)} เล่นกับบอท`,`primary`)}${$(`focus-online`,`${sb(`users`)} เล่นกับเพื่อน`,`secondary`)}</div>${t?`<button class="resume-link" data-action="reconnect">กลับสู่ห้อง ${Q(t.roomId)} ${sb(`arrow`)}</button>`:``}</div><div class="hero-world"><img class="courtyard-art" src="/art/courtyard.png" alt="ลานวังสามก๊กยามค่ำในรูปแบบ pixel art"><div id="lobby-scene" class="lobby-scene"></div><span class="world-caption">ลานวัง · ก่อนเริ่มศึก</span></div></section><section class="play-section" id="play"><div class="section-heading"><h2>เลือกสนามของคุณ</h2><p>วางแผนอย่างเต็มที่ เล่นกับคนรู้ใจ หรือฝึกกลยุทธ์กับบอท</p></div><div class="profile-field"><label for="nickname">ชื่อผู้เล่น</label><input id="nickname" name="nickname" maxlength="20" autocomplete="nickname" value="${Q(localStorage.getItem(`wtk.name`)||``)}" placeholder="ชื่อที่ใช้ในสนาม"><span>บทบาทของคุณจะเป็นความลับ</span></div><div class="mode-grid"><article class="mode-panel"><div class="mode-emblem">策</div><div><h3>ฝึกกลยุทธ์</h3><p>เริ่มศึกกับบอท เลือกขุนพลและเรียนรู้จากทุกเทิร์น</p></div><label for="player-count">จำนวนผู้เล่นรวมคุณ</label><div class="seat-picker">${$(`count-down`,`−`,`step-button`,`aria-label="ลดจำนวนผู้เล่น"`)}<output id="player-count">6 คน</output>${$(`count-up`,`+`,`step-button`,`aria-label="เพิ่มจำนวนผู้เล่น"`)}</div>${$(`bot`,`${sb(`play`)} เริ่มเกมกับบอท`,`primary wide`)}</article><article class="mode-panel" id="online-panel"><div class="mode-emblem">盟</div><div><h3>รวมพลกับเพื่อน</h3><p>สร้างห้องส่วนตัว หรือเข้าร่วมด้วยรหัสจากโฮสต์</p></div><label for="room-code">รหัสห้อง</label><input id="room-code" autocomplete="off" placeholder="วางรหัสห้องที่นี่"><div class="online-buttons">${$(`create`,`สร้างห้อง ${sb(`arrow`)}`,`primary`)}${$(`join`,`เข้าร่วม`,`secondary`)}</div></article></div></section><section class="hero-gallery" id="hero-gallery"><div class="section-heading"><h2>ขุนพลต่างฝีมือ<br><span>ชะตาที่คุณเลือกได้</span></h2><p>13 ขุนพล สี่ก๊ก และทักษะที่เปลี่ยนเกมได้</p></div><div class="portrait-carousel">${fc.map(e=>`<button class="hero-mini" data-action="hero-info" data-hero="${e.id}" style="--faction:${mc[e.faction].color}">${eb(e.id)}<span>${e.name}</span><small>${mc[e.faction].seal} ${mc[e.faction].name}</small></button>`).join(``)}</div></section><section class="learn-section"><div class="learn-heading"><h2>อ่านเกมให้ขาด</h2><p class="reveal-text">บทบาทของคุณกำหนดเป้าหมาย แต่การ์ดบนมือคือทางเลือก โจมตี ป้องกัน และช่วยชีวิตในจังหวะที่ใช่</p>${$(`rules`,`เปิดคู่มือการเล่น `+sb(`arrow`),`secondary`)}</div><div class="rule-accordions">${[`LORD`,`LOYALIST`,`REBEL`,`RENEGADE`].map(e=>`<details><summary>${ub(e)}<span>${hc[e].name}</span><span class="plus">+</span></summary><p>${hc[e].goal}</p></details>`).join(``)}</div></section><div class="faction-marquee" aria-hidden="true">${Array.from({length:3},()=>Object.values(mc).map(e=>`<span>${e.seal} ${e.name}</span>`).join(``)).join(``)}</div><footer class="home-footer"><h2>ตำนานบทต่อไป<br>เริ่มที่การ์ดใบแรก</h2>${$(`quick-bot`,`เข้าสู่ลานวัง `+sb(`arrow`),`primary`)}<span>WTK · Pixel Kingdoms</span></footer></main>`,o=new Vy(document.querySelector(`#lobby-scene`),!0),n||(ki.from(`.hero-copy > *`,{opacity:0,y:20,duration:.8,stagger:.12,ease:`power2.out`}),ki.from(`.courtyard-art`,{opacity:0,scale:1.04,duration:1.3}),ki.matchMedia().add(`(min-width: 1000px)`,()=>{Xs.create({trigger:`.learn-section`,start:`top 140px`,end:`bottom 70%`,pin:`.learn-heading`,pinSpacing:!1}),ki.fromTo(`.reveal-text`,{opacity:.25},{opacity:1,scrollTrigger:{trigger:`.learn-section`,start:`top 80%`,end:`top 20%`,scrub:!0}})}))}function ce(){let e=document.querySelector(`#nickname`),t=(e?.value||localStorage.getItem(`wtk.name`)||``).trim();return t?(localStorage.setItem(`wtk.name`,t),t):(ae(`กรุณาระบุชื่อผู้เล่น`),e?.focus(),``)}function le(e,t=`ONLINE`,n=``){let r=ce();if(!r)return;let i=new URL(n?`/room/`+encodeURIComponent(n):`/room`,location.origin);i.search=new URLSearchParams({action:e,mode:t,name:r,players:String(m)}).toString(),location.assign(i)}function ue(e){let t=new URL(location.href);t.pathname=`/room/`+encodeURIComponent(e.roomId),t.searchParams.set(`action`,`reconnect`),t.searchParams.set(`playerId`,e.playerId),history.replaceState(history.state,``,t.pathname+t.search+t.hash),ne.set(`action`,`reconnect`),ne.set(`playerId`,e.playerId)}function de(){h.clear(),g=[],_=``,v=``,C=`HAND`}function fe(t,n){s!==t&&(o?.dispose(),o=null,I?.disconnect(),I=null,P=0,F=!0,O.clear(),k.clear(),A.clear(),j.clear(),e.innerHTML=n(),s=t)}function pe(){s===`HOME`||document.hidden||N||(N=requestAnimationFrame(()=>{N=0,me()}))}function me(){r?(r.status===`LOBBY`?U():r.status===`DRAFTING`?he():W(),Be()):fe(`CONNECTING`,()=>`${se(!0)}<main class="connecting"><div class="brand-seal">三</div><h1>กำลังเข้าสู่ลานวัง</h1><p>${Q(c)}</p>${$(`leave`,`กลับหน้าหลัก`,`secondary`)}</main>`)}function U(){fe(`WAITING`,()=>`${se(!0)}<main class="waiting-page"><div class="waiting-art"></div><section class="waiting-panel"><div class="eyebrow">รวมพลก่อนศึก</div><h1>ห้องพักผู้เล่น</h1><p>ส่งรหัสนี้ให้เพื่อน แล้วเริ่มศึกเมื่อพร้อม</p><button class="room-code" data-action="copy" id="waiting-code"></button><div id="waiting-players"></div><div id="waiting-actions"></div></section></main>`),document.querySelector(`#waiting-code`).textContent=r.roomId,document.querySelector(`#waiting-players`).innerHTML=r.turnOrder.map(e=>{let t=r.players[e];return`<div class="waiting-player"><span class="player-initial">${Q(t.name.slice(0,1))}</span><span>${Q(t.name)}</span><small>${t.isHost?`โฮสต์`:t.isBot?`บอท`:`พร้อมเข้าศึก`}</small></div>`}).join(``),document.querySelector(`#waiting-actions`).innerHTML=B()?.isHost?`<div class="host-controls">${$(`add-bot`,`เพิ่มบอท`,`secondary`,r.turnOrder.length>=10?`disabled`:``)}${$(`remove-bot`,`ลบบอท`,`secondary`)}</div>${$(`start`,`เริ่มเลือกขุนพล `+sb(`arrow`),`primary wide`,r.mode===`ONLINE`&&r.turnOrder.length<4?`disabled`:``)}<p class="helper">เริ่มได้เมื่อมีผู้เล่นและบอทรวมอย่างน้อย 4 คน</p>`:`<p class="helper">กำลังรอโฮสต์เริ่มเกม</p>`}function he(){fe(`DRAFT`,()=>`${se(!0)}<main class="draft-page"><div class="draft-heading"><div class="eyebrow">เลือกชะตาของคุณ</div><h1>นำทัพด้วยขุนพลคนไหน</h1><p id="draft-role"></p><div class="draft-timer">เลือกภายใน <strong data-deadline=""></strong> วินาที</div></div><div id="draft-choices" class="draft-choices"></div><p class="draft-hint">เมื่อหมดเวลา จะเลือกขุนพลตัวแรกให้ • บทบาทของผู้อื่นยังเป็นความลับ</p></main>`);let e=B();e&&(R(document.querySelector(`#draft-role`),`${ub(e.role)} ${Q(hc[e.role]?.name)} · ${Q(hc[e.role]?.goal)}`),document.querySelector(`[data-deadline]`).setAttribute(`data-deadline`,String(r.draftDeadline||0)),document.querySelector(`#draft-choices`).innerHTML=e.character?`<div class="chosen-hero">${eb(e.character)}<h2>${Q(pc[sc(e.character)]?.name)}</h2><p>เลือกแล้ว กำลังรอผู้เล่นอื่น</p></div>`:(e.characterChoices||[]).map(e=>{let t=pc[sc(e.id)];return`<button class="draft-card" data-action="draft" data-hero="${Q(e.id)}" style="--faction:${mc[t?.faction||`QUN`].color}">${eb(e.id)}<div class="draft-card-copy"><small>${mc[t?.faction||`QUN`].seal} ${mc[t?.faction||`QUN`].name} · ${t?.hp} HP</small><h2>${Q(t?.name||e.name)}</h2><span class="hero-english">${Q(t?.english)}</span><p>${Q(t?.skills)}</p><span class="draft-choose">เลือกขุนพล ${sb(`arrow`)}</span></div></button>`}).join(``))}function W(){let e=s!==`BOARD`;fe(`BOARD`,()=>`${se(!0)}<main class="board-page"><div class="board-top"><div><span id="phase-label"></span><strong id="turn-label"></strong></div><div class="pile-stats"><span>จั่ว <b id="deck-count"></b></span><span>ทิ้ง <b id="discard-count"></b></span><span id="board-room"></span></div></div><section class="board-stage" aria-label="โต๊ะการศึก"><div id="board-scene" class="board-scene"></div><section id="center-play" class="center-play" aria-label="การ์ดที่เล่นกลางโต๊ะ"><div id="recent-plays"></div></section><div id="seats" class="seats" aria-label="ผู้เล่นรอบโต๊ะ"></div><div class="self-summary" id="self-summary"></div>${$(`log`,sb(`chat`),`log-toggle icon-button`,`aria-label="เปิดบันทึกเหตุการณ์"`)}</section><section class="hand-dock" aria-label="การ์ดและคำสั่งของคุณ"><div class="action-dock" id="action-dock" aria-live="polite"></div><div class="hand-heading"><div><strong>มือของคุณ</strong> <span id="hand-count"></span><span id="selection-label"></span></div><div id="skill-buttons"></div></div><div class="hand-scroll"><div id="hand" class="hand" role="group" aria-label="เลือกการ์ดบนมือ"></div></div></section><aside id="ended-panel" class="ended-panel" hidden></aside></main>`);let t=document.querySelector(`.board-page`);t.dataset.seatCount=String(r.turnOrder.length),t.classList.toggle(`many-seats`,r.turnOrder.length>=8),t.classList.toggle(`reduced-effects`,w),e&&(o=new Vy(document.querySelector(`#board-scene`)),o.onLayout=ge),o?.setEffectsReduced(w),o?.update(r,i),document.querySelector(`#phase-label`).textContent=ie(r.currentPhase),document.querySelector(`#turn-label`).textContent=r.status===`ENDED`?`การศึกสิ้นสุด`:r.currentTurnPlayerId===i?`เทิร์นของคุณ`:`เทิร์นของ ${r.players[r.currentTurnPlayerId]?.name||`…`}`,document.querySelector(`#deck-count`).textContent=String(r.deckCount??0),document.querySelector(`#discard-count`).textContent=String(r.discardCount??0),document.querySelector(`#board-room`).textContent=r.roomId,ye(),be(),xe(),Oe(),Ce(),_e(),ge(o.layout()),K();let n=document.querySelector(`#ended-panel`);n.hidden=r.status!==`ENDED`,n.hidden||(n.innerHTML=`<div class="winner-seal">${hc[r.winnerRole||`UNKNOWN`]?.seal}</div><h1>${Q(r.winnerText||`จบการศึก`)}</h1><p>เปิดเผยบทบาทแล้ว ดูการตัดสินใจของแต่ละฝ่ายและเริ่มตำนานบทใหม่</p>${$(`leave`,`กลับหน้าหลัก `+sb(`arrow`),`primary`)}`)}function ge(e){if(s!==`BOARD`||!te(`scene-layout`,[e,k.size]))return;for(let[t,n]of Object.entries(e.seats)){let e=k.get(t);e&&(e.style.setProperty(`--seat-x`,`${n.x*100}%`),e.style.setProperty(`--seat-y`,`${n.y*100}%`))}let t=document.querySelector(`#center-play`);t&&(t.style.setProperty(`--center-x`,`${e.center.x*100}%`),t.style.setProperty(`--center-y`,`${e.center.y*100}%`));let n=document.querySelector(`.board-stage`);n&&(n.dataset.tableLeft=String(e.table.left),n.dataset.tableTop=String(e.table.top),n.dataset.tableWidth=String(e.table.width),n.dataset.tableHeight=String(e.table.height))}var G={ZHIHENG:`ผลัดการ์ด`,RENDE:`ปันสุข`,KUROU:`โบยตนเอง`,LIJIAN:`บ่วงเสน่หา`,FANJIAN:`บ่มเพลิง`,HUJIA:`องครักษ์`,JIJIANG:`ระดมพล`,JIANXIONG:`มหาอุปราช`,FANKUI:`ป้อนกลับ`,GUICAI:`เปลี่ยนชะตา`,GUANXING:`ดูดาว`,LUOSHEN:`ลั่วเสิน`,BIYUE:`งามล่มเมือง`,YINGZI:`สง่างาม`};function _e(){let e=document.querySelector(`#recent-plays`);if(!e||!te(`played-cards`,[T,T.map(e=>[r?.players[e.playerId]?.name,r?.players[e.playerId]?.character,e.targetIds.map(e=>r?.players[e]?.name)])]))return;if(!T.length){R(e,`<div class="table-seal" aria-hidden="true">三</div><p class="table-empty">สนามการศึก</p>`);return}let t=T[0],n=r?.players[t.playerId],i=t.targetIds.map(e=>r?.players[e]?.name).filter(Boolean);R(e,`<div class="played-cards">${T.slice(0,4).reverse().map((e,t,n)=>{let i=t===n.length-1,a=r?.players[e.playerId],o=`data-play="${Q(e.key)}"`,s=e.kind===`SKILL`||e.skillId?`<button type="button" class="skill-play" data-action="public-play" ${o} aria-label="ดูสกิล ${Q(G[e.skillId||``]||e.cardName)}">${eb(a?.character||``)}<span>${Q(G[e.skillId||``]||`สกิลขุนพล`)}</span></button>`:nb(e.cardName,e.card,o);return`<div class="played-entry ${i?`newest`:`previous`}" style="--play-order:${t}">${s}</div>`}).join(``)}</div><div class="play-context" aria-live="polite"><strong>${Q(n?.name||`ผู้เล่น`)}${i.length?` <span class="play-arrow">→</span> `+Q(i.join(`, `)):``}</strong><span>${Q(t.skillId?G[t.skillId]||`สกิลขุนพล`:dc[t.cardName]?.name||t.cardName)}${t.kind===`RESPONSE`?` · ตอบโต้`:``}</span></div>`)}function K(){document.querySelectorAll(`.sound-control`).forEach(e=>{R(e,sb(E.muted?`muted`:`sound`)),e.setAttribute(`aria-label`,E.muted?`ตั้งค่าเสียง ขณะนี้ปิดเสียง`:`ตั้งค่าเสียงและเอฟเฟกต์`)});let e=document.querySelector(`[data-action="mute"]`);e&&(e.textContent=E.muted?`เปิดเสียง`:`ปิดเสียง`,e.setAttribute(`aria-pressed`,String(E.muted)));let t=document.querySelector(`#sound-volume`);t&&(t.value=String(Math.round(E.volume*100)));let n=document.querySelector(`#volume-value`);n&&(n.textContent=`${Math.round(E.volume*100)}%`);let r=document.querySelector(`[data-action="reduce-fx"]`);r&&(r.textContent=w?`เอฟเฟกต์แบบเรียบ`:`เอฟเฟกต์เต็ม`,r.setAttribute(`aria-pressed`,String(w)))}function q(){E=D.getSettings(),V(`<h2>เสียงและเอฟเฟกต์</h2><div class="feedback-settings"><label for="sound-volume">ความดัง <output id="volume-value">${Math.round(E.volume*100)}%</output></label><input id="sound-volume" type="range" min="0" max="100" value="${Math.round(E.volume*100)}"><div class="settings-buttons">${$(`mute`,E.muted?`เปิดเสียง`:`ปิดเสียง`,`secondary`,`aria-pressed="${E.muted}"`)}${$(`preview-sound`,`ลองเสียง`,`primary`)}</div><label>การเคลื่อนไหว</label>${$(`reduce-fx`,w?`เอฟเฟกต์แบบเรียบ`:`เอฟเฟกต์เต็ม`,`secondary`,`aria-pressed="${w}"`)}<p>การ์ดและสถานะกลางโต๊ะยังแสดงครบในทุกโหมด</p></div>`)}function ve(e){if(!r||!B()||!e.isAlive)return!1;let t=re([...h][0]),n=v||t?.name||``;if(_===`RENDE`)return e.id!==i;if(_===`LIJIAN`)return e.id!==i&&pc[sc(e.character)]?.gender===`MALE`;if(_===`FANJIAN`)return e.id!==i;if(_===`JIJIANG`||_===`SPEAR`||[`SLASH`,`THUNDER_ATTACK`].includes(n))return e.id!==i&&ib(r,i,e.id)<=(B().equipment.weapon?.range||dc[B().equipment.weapon?.name||``]?.range||1)&&!(sc(e.character)===`ZHUGE_LIANG`&&!e.handCount);if(n===`IRON_CHAIN`)return!0;if(n===`BORROWED_SWORD`){if(!g.length)return e.id!==i&&!!e.equipment.weapon;let t=g[0];return e.id!==t&&ib(r,t,e.id)<=(r.players[t].equipment.weapon?.range||dc[r.players[t].equipment.weapon?.name||``]?.range||1)}return[`STEAL`,`SABOTAGE`].includes(n)?e.id!==i&&(e.handCount>0||Object.values(e.equipment).some(Boolean)||e.delayedKitZone.length>0)&&(n!==`STEAL`||ib(r,i,e.id)<=1):n===`FIRE_ATTACK`?e.id!==i&&e.handCount>0:n===`STARVATION`?e.id!==i&&ib(r,i,e.id)<=1&&!e.delayedKitZone.some(e=>e.name===n):n===`ACEDIA`?e.id!==i&&!e.delayedKitZone.some(e=>e.name===n):n===`DUEL`&&e.id!==i&&!(sc(e.character)===`ZHUGE_LIANG`&&!e.handCount)}function ye(){let e=document.querySelector(`#seats`),t=r.turnOrder.filter(e=>e!==i),n=t.length;for(let[e,n]of k)t.includes(e)||(n.remove(),k.delete(e));t.forEach((t,a)=>{let o=r.players[t],s=pc[sc(o.character)],c=k.get(t);c||(c=document.createElement(`button`),c.setAttribute(`type`,`button`),c.dataset.action=`target`,c.dataset.player=t,e.append(c),k.set(t,c)),(200+140*(a/Math.max(1,n-1)))*Math.PI/180,c.className=`seat ${g.includes(t)?`target-selected`:``} ${ve(o)?`legal-target`:``} ${r.currentTurnPlayerId===t?`active-turn`:``} ${o.isAlive?``:`dead`}`,c.style.setProperty(`--faction`,mc[s?.faction||`QUN`].color),R(c,`<span class="seat-face">${eb(o.character)}${ub(o.role)}</span><span class="seat-copy"><span class="seat-name">${Q(s?.name||o.name)}</span><span class="seat-health"><b>${Math.max(0,o.hp)}</b><span>/${o.maxHp}</span> <small>${o.handCount} ใบ</small></span><span class="seat-player">${Q(o.name)}</span><span class="seat-tags"><span>ระยะ ${ib(r,i,t)}</span>${o.isChained?`<span>โซ่</span>`:``}${o.isDisconnected?`<span>หลุด</span>`:``}</span></span>${rb(o.handCount)}`),c.setAttribute(`aria-label`,`${o.name} ${s?.name||``} ${o.hp}/${o.maxHp} HP ระยะ ${ib(r,i,t)} ${o.isAlive?``:`เสียชีวิต`}`)})}function be(){let e=B();if(!e)return;let t=pc[sc(e.character)];R(document.querySelector(`#self-summary`),`<button class="self-portrait" data-action="hero-info" data-hero="${sc(e.character)}" aria-label="ดูขุนพลของคุณ ${Q(t?.name)}">${eb(e.character)}</button><div class="self-copy"><div class="self-name">${Q(t?.name)} ${ub(e.role)} <span class="self-health">${Math.max(0,e.hp)} <small>/ ${e.maxHp} HP</small></span></div><span class="self-status">${e.wineActive?`สุรา · `:``}${e.isChained?`ล่ามโซ่ · `:``}${r.currentTurnPlayerId===i?`เทิร์นของคุณ`:`ขุนพลของคุณ`}</span><div class="equipment-row">${Object.entries(e.equipment).map(([,e])=>e?`<button class="equipment-chip ${h.has(e.id)?`selected`:``}" data-action="equipment" data-card="${Q(e.id)}" title="${Q(dc[e.name]?.description)}">${Q(dc[e.name]?.name||e.name)}</button>`:``).join(``)}${e.delayedKitZone.map(e=>`<span class="delayed-chip">${Q(dc[e.name]?.name)}</span>`).join(``)}</div></div>`)}function xe(){let e=document.querySelector(`#hand`),t=B()?.hand||[];te(`hand-order`,t.map(e=>e.id))&&(F=!0);for(let[e,n]of O)t.some(t=>t.id===e)||(n.remove(),O.delete(e),h.delete(e));for(let n of t){let t=O.get(n.id);if(!t){let r=document.createElement(`div`);r.innerHTML=tb(n),t=r.firstElementChild,O.set(n.id,t),e.append(t),w||ki.fromTo(t,{opacity:0},{opacity:1,duration:.3,clearProps:`opacity`})}t.classList.toggle(`selected`,h.has(n.id)),t.setAttribute(`aria-pressed`,String(h.has(n.id)))}e.classList.toggle(`empty-hand`,t.length===0),t.length?e.removeAttribute(`data-empty`):e.setAttribute(`data-empty`,`ยังไม่มีการ์ดบนมือ`),document.querySelector(`#hand-count`).textContent=`${t.length} ใบ`;let n=re([...h][0]);document.querySelector(`#selection-label`).textContent=n?` · `+(dc[v||n.name]?.name||n.name):``,Se()}function Se(){let e=document.querySelector(`#hand`),t=document.querySelector(`.hand-scroll`);if(!e||!t||(I||(I=new ResizeObserver(e=>{let t=e[0]?.contentRect.width||0;t!==P&&(P=t,F=!0,pe())}),I.observe(t)),!F))return;F=!1;let n=Array.from(e.querySelectorAll(`.hand-card`)),r=n.length,i=innerHeight<=600&&innerWidth>innerHeight,a=innerWidth<=700,o=i?68:a?82:100,s=i?48:a?r<=5?62:48:r<=7?78:62,c=Math.max(0,(r-1)*s)+o,l=P||t.clientWidth;e.style.width=`${Math.max(l-12,c+32)}px`,n.forEach((e,t)=>{let n=t-(r-1)/2,a=r>1?n/((r-1)/2):0;e.style.setProperty(`--fan-x`,`${n*s}px`),e.style.setProperty(`--fan-y`,`${Math.abs(a)*(i?4:11)}px`),e.style.setProperty(`--fan-angle`,`${a*(i?6:9)}deg`),e.style.setProperty(`--fan-layer`,String(t+1))})}function Ce(){let e=B(),t=document.querySelector(`#skill-buttons`);if(!e)return;let n=r.currentTurnPlayerId===i&&r.currentPhase===`PLAY`&&!r.pendingAction&&e.isAlive,a=sc(e.character),o=a===`SUN_QUAN`?[[`ZHIHENG`,`ผลัดการ์ด`,e.skillResignationUsed]]:a===`LIU_BEI`?[[`RENDE`,`ปันสุข`,!1]]:a===`DIAO_CHAN`?[[`LIJIAN`,`บ่วงเสน่หา`,e.skillDiaoChanUsed]]:a===`ZHOU_YU`?[[`FANJIAN`,`บ่มเพลิง`,e.skillZhouYuUsed]]:a===`HUANG_GAI`?[[`KUROU`,`โบยตนเอง`,!1]]:[];e.equipment.weapon?.name===`SERPENT_SPEAR`&&o.push([`SPEAR`,`ทวนอสรพิษ`,!1]),a===`LIU_BEI`&&e.role===`LORD`&&o.push([`JIJIANG`,`ระดมพล`,!1]),t.innerHTML=(Object.values(e.equipment).some(Boolean)?$(`own-equipment`,`อุปกรณ์`,`skill-button`):``)+o.map(([e,t,r])=>$(`skill`,String(t),`skill-button `+(_===e?`selected`:``),`data-skill="${e}" ${!n||r?`disabled`:``}`)).join(``)+$(`inspect-selected`,sb(`eye`),`icon-button`,`aria-label="ดูการ์ดที่เลือก" `+(h.size?``:`disabled`))}function we(){if([`LIJIAN`].includes(_))return 2;if([`RENDE`,`FANJIAN`,`SPEAR`,`JIJIANG`].includes(_))return 1;let e=re([...h][0]),t=v||e?.name;return t===`BORROWED_SWORD`?2:t===`IRON_CHAIN`?1:+!![`SLASH`,`THUNDER_ATTACK`,`STEAL`,`SABOTAGE`,`DUEL`,`ACEDIA`,`STARVATION`,`FIRE_ATTACK`].includes(t||``)}function Te(){let e=B(),t=[...h][0],n=v||re(t)?.name;return[`SLASH`,`THUNDER_ATTACK`].includes(n||``)&&e?.equipment.weapon?.name===`SKY_PIERCING_HALBERD`&&e.hand?.length===1&&e.hand[0].id===t?3:n===`IRON_CHAIN`||_===`LIJIAN`||n===`BORROWED_SWORD`?2:we()}function Ee(){let e=r?.pendingAction,t=e?.type===`WAITING_FOR_FROST_DISCARD`?r?.players[e.targetPlayerId]:null;return t?Math.min(2,t.handCount+Object.values(t.equipment).filter(Boolean).length):0}function De(e){let t=r?.pendingAction,n=t?.type===`WAITING_FOR_FROST_DISCARD`?r?.players[t.targetPlayerId]:null;return n?/^hand_\d+$/.test(e)?Number(e.slice(5))<n.handCount:Object.values(n.equipment).some(t=>t?.id===e):!1}function Oe(){let e=B(),t=document.querySelector(`#action-dock`);if(!e)return;if(r.pendingAction){ke();return}if(!e.isAlive){t.innerHTML=`<div class="action-description"><strong>คุณเสียชีวิตแล้ว</strong><span>ชมการศึกต่อได้ บทบาทของคุณถูกเปิดเผยแล้ว</span></div>`;return}if(r.currentTurnPlayerId!==i){R(t,`<div class="action-description"><strong>รอจังหวะของคุณ</strong><span>ตรวจการ์ดและสถานะผู้เล่นได้ระหว่างรอ</span></div>`);return}if(r.currentPhase===`DISCARD`){let n=Math.max(0,e.handCount-e.hp-+(e.equipment.treasure?.name===`WOODEN_CART`));R(t,`<div class="action-description"><strong>เลือกทิ้ง ${n} ใบ</strong><span>เลือกแล้ว ${h.size} ใบ · เก็บได้ ${e.hp+ +(e.equipment.treasure?.name===`WOODEN_CART`)} ใบ</span></div>${$(`discard`,`ยืนยันทิ้งการ์ด`,`primary`,h.size===n?``:`disabled`)}`);return}let n=re([...h][0]),a=dc[v||n?.name||``],o=we(),s=!_&&!v&&n?.name===`IRON_CHAIN`,c=_===`ZHIHENG`?h.size>0:_===`RENDE`?h.size>0&&g.length===1:_===`SPEAR`?h.size===2&&g.length===1:_===`JIJIANG`?g.length===1:h.size===1&&g.length>=o;R(t,`<div class="action-description"><strong>${Q(_?{ZHIHENG:`ผลัดการ์ด`,RENDE:`ปันสุข`,LIJIAN:`บ่วงเสน่หา`,FANJIAN:`บ่มเพลิง`,SPEAR:`ทวนอสรพิษ`,JIJIANG:`ระดมพล`}[_]:a?.name||`เลือกการ์ดเพื่อเริ่มวางแผน`)}</strong><span>${s?g.length?`เชื่อมโซ่ ${g.length}/2 เป้าหมาย · ${g.map(e=>Q(r.players[e]?.name)).join(`, `)}`:`เลือก 1–2 เป้าหมายเพื่อเชื่อมโซ่ หรือทิ้งเพื่อจั่ว 1 ใบ`:o?`เลือกเป้าหมาย ${g.length}/${o} · ${g.map(e=>Q(r.players[e]?.name)).join(`, `)}`:a?.description||`ไม่มีเวลาจำกัดสำหรับการคิดในเทิร์นของคุณ`}</span></div><div class="dock-buttons">${n&&sc(e.character)===`GUAN_YU`&&[`HEART`,`DIAMOND`].includes(n.suit)||n&&sc(e.character)===`ZHAO_YUN`&&n.name===`DODGE`?$(`convert`,v?`ใช้ตามการ์ด`:`แปลงเป็นโจมตี`,`secondary`):``}${s?$(`recast`,`ทิ้งเพื่อจั่ว 1 ใบ`,`secondary`,g.length?`disabled`:``):``}${$(`submit`,`${_?`ใช้สกิล`:s?`เชื่อมโซ่`:`เล่นการ์ด`} ${sb(`arrow`)}`,`primary`,c?``:`disabled`)}${$(`cancel`,`ยกเลิก`,`secondary`,!h.size&&!_?`disabled`:``)}${$(`end`,`จบเทิร์น`,`secondary`)}</div>`)}function ke(){let e=r.pendingAction,t=B(),n=document.querySelector(`#action-dock`),a=ob(r),o=e.type===`WAITING_FOR_NEGATE`,s=o?t.isAlive&&t.hand?.some(e=>e.name===`NEGATE`)&&!(r.negatePassedPlayers||[]).includes(i)&&!(e.sourcePlayerId===i&&(r.actionChain?.length||0)<2):a===i,c=`<span class="response-clock"><b data-deadline="${e.timeoutAt||0}"></b>s</span>`;if(!s){R(n,`<div class="action-description"><strong>${o?`หน้าต่างไร้ข้อกังขา`:`รอ ${Q(r.players[a||``]?.name||`ผู้เล่น`)}`}</strong><span>กำลังดำเนินการตอบโต้</span></div>${c}`);return}let l=`ตอบโต้การ์ด`,u=`เลือกการ์ดบนมือ แล้วกดยืนยัน`,d=``,f=``,p=re([...h][0]);if(e.type===`GUANXING`)l=`ดูดาว · จัดเรียงกองไพ่`,u=`เรียงจากซ้ายไปขวา ใบซ้ายสุดจะถูกจั่วก่อน`,d=`<div class="guanxing-list">${[...x,...S].map(t=>{let n=e.cards?.find(e=>e.id===t);return n?`<div class="guanxing-item">${tb(n,`guan-select`)}<div>${$(`guan-up`,`←`,`tiny`,`data-card="`+t+`" aria-label="เลื่อนขึ้นในลำดับ"`)}${$(`guan-bottom`,S.includes(t)?`ขึ้นกอง`:`ใต้กอง`,`tiny`,`data-card="${t}"`)}</div></div>`:``}).join(``)}</div>`,f=$(`guan-confirm`,`ยืนยันลำดับ`,`primary`);else if(e.type===`FANJIAN`)l=`บ่มเพลิง · ทายดอกไพ่`,u=`คุณจะได้รับการ์ด ถ้าทายผิดเสีย 1 HP`,f=[`SPADE`,`HEART`,`CLUB`,`DIAMOND`].map(e=>$(`guess`,lb(e),`suit-button`,`data-suit="${e}" aria-label="ทาย ${e}"`)).join(``);else if(e.type===`DAMAGE_SKILL`){if(l=e.skill===`JIANXIONG`?`มหาอุปราช · รับการ์ดที่ทำดาเมจ`:`ป้อนกลับ · หยิบการ์ด`,u=`เลือกใช้สกิลหรือผ่านโดยไม่เสียการ์ด`,e.skill===`FANKUI`){let t=r.players[e.sourcePlayerId];d=`<div class="zone-options">${$(`damage-zone`,`มือแบบสุ่ม`,`secondary`,`data-zone="hand"`)}${Object.entries(t?.equipment||{}).filter(([,e])=>e).map(([e,t])=>$(`damage-zone`,Q(dc[t.name]?.name),`secondary`,`data-zone="${e}"`)).join(``)}</div>`}f=$(`hero-accept`,`ใช้สกิล`,`primary`)+$(`pass`,`ผ่าน`,`secondary`)}else if(e.type===`GUICAI`)l=`เปลี่ยนชะตา · แทนไพ่พิจารณา`,u=`ไพ่ปัจจุบัน ${dc[e.judgeCard?.name]?.name||``} ${lb(e.judgeCard?.suit)} เลือกการ์ดบนมือเพื่อแทน`,f=$(`respond`,`แทนไพ่พิจารณา`,`primary`,p?``:`disabled`)+$(`pass`,`ผ่าน`,`secondary`);else if(e.type===`LORD_SKILL`)l=e.skill===`HUJIA`?`องครักษ์ · เจ้าเมืองขอหลบหลีก`:`ระดมพล · เจ้าเมืองขอโจมตี`,u=`การช่วยเหลือจะใช้การ์ดของคุณหนึ่งใบ`,f=$(`respond`,`ช่วยเจ้าเมือง`,`primary`,!p||!ab(t,p,e.requestType)?`disabled`:``)+$(`pass`,`ผ่าน`,`secondary`);else if(e.type===`LUO_RIVER`)l=`ลั่วเสิน · เปิดไพ่พิจารณา`,u=`รับการ์ดดำ จนพบแดงหรือเลือกหยุด`,f=$(`luo-draw`,`เปิดไพ่`,`primary`)+$(`pass`,`หยุด`,`secondary`);else if(e.type===`DYING`){l=`กู้ชีพ ${r.players[e.targetPlayerId]?.name}`,u=`ต้องการ ${e.peachNeeded} HP · ใช้สวนท้อ${e.targetPlayerId===i?` หรือสุราช่วยตนเอง`:``}`;let n=t.hand?.find(t=>t.name===`PEACH`||e.targetPlayerId===i&&t.name===`WINE`);f=$(`rescue`,`ช่วยชีวิต`,`primary`,n?``:`disabled`)+$(`pass`,`ผ่าน`,`secondary`)}else if(o){l=`ไร้ข้อกังขา · สวนกลยุทธ์`,u=`สายโซ่ ${r.actionChain?.length||1} ขั้น · เล่นเพื่อสลับผลการยกเลิก`;let e=t.hand?.find(e=>e.name===`NEGATE`);f=$(`negate`,`ใช้ไร้ข้อกังขา`,`primary`,e?``:`disabled`)+$(`pass`,`ผ่าน`,`secondary`)}else if(e.type===`WAITING_FOR_BUMPER_PICK`)l=`เลือกการ์ดจากการเก็บเกี่ยว`,u=`เลือกหนึ่งใบเพื่อรับขึ้นมือ`,d=`<div class="reaction-cards">${r.bumperHarvestCards.map(e=>tb(e,`harvest`)).join(``)}</div>`;else if(e.type===`WAITING_FOR_FIRE_REVEAL`)l=`โจมตีเพลิง · เปิดการ์ด`,u=`เลือกหนึ่งใบให้ผู้ร่ายเห็นดอกไพ่ การ์ดยังอยู่บนมือ`,f=$(`respond`,`เปิดการ์ดที่เลือก`,`primary`,p?``:`disabled`);else if(e.type===`WAITING_FOR_FIRE_MATCH`)l=`โจมตีเพลิง · ทิ้งดอกเดียวกัน`,u=`ทิ้ง ${lb(e.requiredSuit)} เพื่อทำดาเมจไฟ 1`,f=$(`respond`,`ทิ้งและโจมตี`,`primary`,p?.suit===e.requiredSuit?``:`disabled`)+$(`pass`,`ผ่าน`,`secondary`);else if(e.type===`WAITING_FOR_YINYANG_CHOICE`)l=`กระบี่หยินหยาง`,u=`ทิ้งการ์ดหนึ่งใบ หรือให้ผู้โจมตีจั่วหนึ่งใบ`,f=$(`respond`,`ทิ้งใบที่เลือก`,`primary`,p?``:`disabled`)+$(`pass`,`ให้ผู้โจมตีจั่ว`,`secondary`);else if([`WAITING_FOR_GREEN_DRAGON`,`WAITING_FOR_AXE_DISCARD`,`WAITING_FOR_TRIDENT_DISCARD`,`WAITING_FOR_FROST_DISCARD`].includes(e.type)){l=`ความสามารถอาวุธ`;let t=e.type===`WAITING_FOR_FROST_DISCARD`,n=t?Ee():e.type===`WAITING_FOR_AXE_DISCARD`?2:1;if(u=t?n?`สละดาเมจเพื่อทำลายการ์ดเป้าหมาย ${n} ใบ`:`เป้าหมายไม่มีการ์ดให้ทำลาย เลือกผ่านเพื่อทำดาเมจตามปกติ`:`เลือก ${n} ใบ เพื่อใช้ความสามารถ`,t){let t=r.players[e.targetPlayerId],i=[...h].filter(e=>e.startsWith(`hand_`)).length;d=`<div class="zone-options">${$(`frost-hand`,`มือแบบสุ่ม (${i}/${t?.handCount||0})`,`secondary`,!t?.handCount||i>=t.handCount||h.size>=n?`disabled`:``)}${Object.values(t?.equipment||{}).filter(Boolean).map(e=>$(`frost-card`,`${h.has(e.id)?`✓ `:``}${Q(dc[e.name]?.name)}`,`secondary`,`data-card="${Q(e.id)}" aria-pressed="${h.has(e.id)}" ${h.size>=n&&!h.has(e.id)?`disabled`:``}`)).join(``)}${$(`frost-clear`,`ล้างที่เลือก`,`secondary`,h.size?``:`disabled`)}<span>เลือก ${h.size}/${n}</span></div>`}f=$(`respond`,`ใช้ความสามารถ`,`primary`,n===0||h.size!==n?`disabled`:``)+$(`pass`,`ผ่าน`,`secondary`)}else{let n=e.type===`WAITING_FOR_SLASH_DUEL`||e.type===`WAITING_FOR_BORROW_SLASH`||e.type===`WAITING_FOR_AOE`&&e.aoeType===`BARBARIAN_INVASION`?`SLASH`:`DODGE`;l=e.type===`WAITING_FOR_BORROW_SLASH`?`ยืมดาบ · โจมตีหรือมอบอาวุธ`:n===`SLASH`?`ใช้โจมตีเพื่อตอบโต้`:`ใช้หลบหลีกเพื่อป้องกัน`,u=`ต้องการ ${e.slashNeeded||e.dodgeNeeded||1} ใบ · เลือกการ์ดที่ใช้แทนได้`,f=$(`respond`,n===`SLASH`?`ใช้โจมตี`:`หลบหลีก`,`primary`,!p||!ab(t,p,n)?`disabled`:``)+$(`pass`,e.type===`WAITING_FOR_BORROW_SLASH`?`มอบอาวุธ`:`ยอมรับผล`,`secondary`);let i=e.type===`WAITING_FOR_DODGE`,a=e.type===`WAITING_FOR_AOE`&&e.aoeType===`ARROW_BARRAGE`,o=i&&r.players[e.sourcePlayerId]?.equipment.weapon?.name===`BLUE_STEEL_SWORD`;n===`DODGE`&&(i||a)&&!o&&t.equipment.armor?.name===`EIGHT_TRIGRAMS_FORMATION`&&!e.eightTrigramsUsed&&(f+=$(`trigrams`,`พิจารณาเกราะ`,`secondary`)),t.role===`LORD`&&(sc(t.character)===`CAO_CAO`&&n===`DODGE`||sc(t.character)===`LIU_BEI`&&n===`SLASH`)&&(f+=$(`lord-react`,`ขอความช่วยเหลือ`,`secondary`))}R(n,`<div class="reaction-main"><div class="action-description"><strong>${Q(l)}</strong><span>${Q(u)}</span></div>${c}<div class="dock-buttons">${f}</div></div>${d}`)}function Ae(e,t={}){a?.send(e,t),de(),pe()}function je(){let e=[...h],t=re(e[0]),n={cardId:e[0],cardIds:e,targetPlayerId:g[0],secondaryTargetId:g[1],targetPlayerIds:g,targetZone:C,playAs:v||void 0};if(_){let e={ZHIHENG:`use_sun_quan_skill`,RENDE:`use_liu_bei_skill`,LIJIAN:`use_diao_chan_skill`,FANJIAN:`use_zhou_yu_skill`,SPEAR:`use_serpent_spear`,JIJIANG:`use_lord_skill`}[_];Ae(e,n)}else if(t){if([`STEAL`,`SABOTAGE`].includes(t.name)){let e=r.players[g[0]],t=[[`HAND`,`มือแบบสุ่ม`,e.handCount>0],[`WEAPON`,`อาวุธ`,e.equipment.weapon],[`ARMOR`,`เกราะ`,e.equipment.armor],[`OFF_HORSE`,`ม้าบุก`,e.equipment.offensiveHorse],[`DEF_HORSE`,`ม้าหมอบ`,e.equipment.defensiveHorse],[`TREASURE`,`สมบัติ`,e.equipment.treasure]];V(`<h2>เลือกเขตของ ${Q(e.name)}</h2><div class="zone-options">${t.filter(e=>e[2]).map(e=>$(`choose-zone`,String(e[1]),`secondary`,`data-zone="${e[0]}"`)).join(``)}${e.delayedKitZone.map(e=>$(`choose-zone`,Q(dc[e.name]?.name),`secondary`,`data-zone="DELAYED" data-card="${Q(e.id)}"`)).join(``)}</div>`)}else Ae(`use_card`,n)}}function Me(){let e=B(),t=e?.hand?.find(e=>e.id===[...h][0]);!r||r.status!==`PLAYING`||r.currentTurnPlayerId!==i||r.currentPhase!==`PLAY`||r.pendingAction||!e?.isAlive||_||v||g.length||h.size!==1||t?.name!==`IRON_CHAIN`||Ae(`use_card`,{cardId:t.id})}function Ne(){let e=r?.pendingAction,t=[...h][0];e&&(e.type!==`WAITING_FOR_FROST_DISCARD`||Ee()&&h.size===Ee()&&![...h].some(e=>!De(e)))&&([`GUICAI`,`LORD_SKILL`].includes(e.type)?Ae(`hero_response`,{accept:!0,cardId:t}):e.type===`WAITING_FOR_BORROW_SLASH`?Ae(`resolve_borrowed_sword`,{cardId:t}):e.type===`WAITING_FOR_FIRE_REVEAL`?Ae(`resolve_fire_reveal`,{cardId:t}):e.type===`WAITING_FOR_FIRE_MATCH`?Ae(`resolve_fire_match`,{cardId:t}):e.type===`WAITING_FOR_YINYANG_CHOICE`?Ae(`resolve_yinyang_choice`,{action:`DISCARD`,cardId:t}):e.type.startsWith(`WAITING_FOR_`)&&[`GREEN_DRAGON`,`AXE_DISCARD`,`TRIDENT_DISCARD`,`FROST_DISCARD`].some(t=>e.type.endsWith(t))?Ae(`resolve_weapon_skill`,{accept:!0,cardId:t,cardIds:[...h]}):Ae(`resolve_pending`,{response:`USE_CARD`,cardId:t}))}function Pe(){let e=r?.pendingAction;if(!e)return;let t=e.type;t===`DYING`?Ae(`use_peach_dying`,{usePeach:!1}):t===`WAITING_FOR_NEGATE`?Ae(`pass_negate`):t===`LUO_RIVER`?Ae(`skip_luo_river`):t===`WAITING_FOR_BORROW_SLASH`?Ae(`resolve_borrowed_sword`,{}):t===`WAITING_FOR_FIRE_MATCH`?Ae(`resolve_fire_match`,{cancel:!0}):t===`WAITING_FOR_YINYANG_CHOICE`?Ae(`resolve_yinyang_choice`,{action:`DRAW`}):[`GUANXING`,`GUICAI`,`FANJIAN`,`LORD_SKILL`,`DAMAGE_SKILL`].includes(t)?Ae(`hero_response`,{accept:!1}):[`WAITING_FOR_GREEN_DRAGON`,`WAITING_FOR_AXE_DISCARD`,`WAITING_FOR_TRIDENT_DISCARD`,`WAITING_FOR_FROST_DISCARD`].includes(t)?Ae(`resolve_weapon_skill`,{accept:!1}):Ae(`resolve_pending`,{response:`PASS`})}function Fe(e){let t=pc[sc(e)];t&&V(`<article class="hero-detail">${eb(t.id)}<small>${mc[t.faction].seal} ${mc[t.faction].name} · ${t.hp} HP</small><h2>${t.name}</h2><span>${t.english}</span><p>${t.skills.split(`|`).map(Q).join(`<br><br>`)}</p></article>`)}function Ie(e){let t=dc[e.name];V(`<article class="card-detail">${tb(e,`noop`)}<h2>${Q(t?.name)}</h2><p>${Q(t?.description)}</p><small>${lb(e.suit)} ${e.rank} ${t?.range?`· ระยะ `+t.range:``}</small></article>`)}function Le(e=!1){V(`<h2>${e?`คลังขุนพล`:`คลังการ์ดและขุนพล`}</h2><div class="catalog-tabs">${$(`catalog`,`41 ชนิดการ์ด`,`secondary`)}${$(`heroes`,`13 ขุนพล`,`secondary`)}${$(`rules`,`กติกา`,`secondary`)}</div><div class="catalog-grid">${e?fc.map(e=>`<button data-action="hero-info" data-hero="${e.id}" class="catalog-hero">${eb(e.id)}<strong>${e.name}</strong><small>${e.hp} HP · ${mc[e.faction].name}</small></button>`).join(``):uc.map(e=>`<div class="catalog-card"><div class="card-art" ${$y(e.art)}></div><strong>${e.name}</strong><p>${e.description}</p><small>${e.count} ใบในสำรับ</small></div>`).join(``)}</div>`)}function Re(){V(`<article class="rules-copy"><h2>คู่มือสามก๊ก</h2><p>เลือกขุนพลและรับบทบาทลับ เจ้าเมืองเปิดเผยตัวตั้งแต่เริ่ม คนอื่นเปิดเมื่อเสียชีวิตหรือจบเกม</p>${[`LORD`,`LOYALIST`,`REBEL`,`RENEGADE`].map(e=>`<div>${ub(e)}<strong>${hc[e].name}</strong><p>${hc[e].goal}</p></div>`).join(``)}<h3>จังหวะหนึ่งเทิร์น</h3><p>เตรียมการ → พิจารณา → จั่วสองใบ → เล่นการ์ด → ทิ้งให้เหลือเท่ากับ HP → ส่งต่อเทิร์น ใช้โจมตีได้หนึ่งครั้ง ยกเว้นสกิลหรืออาวุธที่อนุญาต</p><h3>การตอบโต้</h3><p>มีเวลา 20 วินาที หากหมดเวลาถือว่าผ่าน ระบบไม่ใช้การ์ดแทนคุณ เทิร์นเล่นไม่จำกัดเวลา เลือกขุนพลภายใน 90 วินาที</p><h3>ภาวะใกล้ตาย</h3><p>ต้องฟื้นให้ถึง 1 HP ใช้สวนท้อช่วยผู้อื่นหรือใช้สุราช่วยตนเอง ขุนพลที่เชื่อมต่อหลุดมีเวลา 45 วินาทีในการกลับมา หลังจากนั้นถือว่าเสียชีวิต</p><h3>ระยะและล่ามโซ่</h3><p>นับระยะตามผู้เล่นที่ยังมีชีวิต ม้าบุกลดระยะ ม้าหมอบเพิ่มระยะ อาวุธกำหนดระยะโจมตี ดาเมจธาตุจะส่งต่อผู้เล่นที่ล่ามโซ่และกู้ชีพตามคิว</p><p class="helper">สำรับ 176 ใบ / 41 ชนิด · เป้าหมายแมตช์ 30–45 นาที ระยะเวลาจริงขึ้นกับผู้เล่น</p></article>`)}function ze(){p&&V(`<h2>สนามทดสอบ</h2><div class="sandbox-controls"><label>ผู้เล่น<select id="admin-player">${r.turnOrder.map(e=>`<option value="${e}">${Q(r.players[e].name)}</option>`).join(``)}</select></label><label>การ์ด<select id="admin-card">${uc.map(e=>`<option value="${e.id}">${e.name}</option>`).join(``)}</select></label>${$(`admin-spawn`,`เพิ่มการ์ด`,`primary`)}<label>ขุนพล<select id="admin-hero">${fc.map(e=>`<option value="${e.id}">${e.name}</option>`).join(``)}</select></label>${$(`admin-hero`,`เปลี่ยนขุนพล`,`secondary`)}<label>HP<input id="admin-hp" type="number" value="4" min="0" max="20"></label>${$(`admin-hp`,`ตั้ง HP`,`secondary`)}${$(`admin-ai`,r.isBotPassive?`เปิดบอท AI`:`หยุดบอท AI`,`secondary`)}${$(`admin-pass`,`ให้บอทผ่านเทิร์น`,`secondary`)}</div>`)}document.addEventListener(`click`,async e=>{let t=e.target.closest(`[data-action]`);if(!t||t.hasAttribute(`disabled`))return;let s=t.dataset.action,c=t.dataset.card;if(s===`sound-settings`)q();else if(s===`mute`)D.toggleMute();else if(s===`preview-sound`)await D.unlock(),D.preview();else if(s===`reduce-fx`){w=!w;try{localStorage.setItem(`wtk.effectsReduced`,String(w))}catch{}o?.setEffectsReduced(w),document.querySelector(`.board-page`)?.classList.toggle(`reduced-effects`,w),K()}else if(s===`public-play`){let e=T.find(e=>e.key===t.dataset.play);if(!e)return;let n=r?.players[e.playerId];if(e.skillId||e.kind===`SKILL`)V(`<article class="hero-detail">${eb(n?.character||``)}<small>${Q(n?.name)}</small><h2>${Q(G[e.skillId||``]||`สกิลขุนพล`)}</h2><p>${Q(pc[sc(n?.character)]?.skills||``)}</p></article>`);else{let t=dc[e.cardName];V(`<article class="card-detail">${nb(e.cardName,e.card)}<h2>${Q(t?.name||e.cardName)}</h2><p>${Q(t?.description||``)}</p>${e.card&&e.card.name!==e.cardName?`<p>ใช้ ${Q(dc[e.card.name]?.name||e.card.name)} แทน ${Q(t?.name||e.cardName)}</p>`:``}<small>${Q(n?.name||`ผู้เล่น`)} เล่นการ์ดนี้แล้ว</small></article>`)}}else if(s===`leave`){e.preventDefault();try{a?.leave()}finally{location.assign(`/lobby`)}}else if(s===`close`)oe();else if(s===`rules`)Re();else if(s===`heroes`)Le(!0);else if(s===`catalog`)Le();else if(s===`hero-info`)Fe(t.dataset.hero);else if(s===`leaderboard`)try{V(`<h2>ตารางอันดับ</h2><div class="leaderboard">${((await(await fetch(`/api/leaderboard`)).json()).data||[]).map((e,t)=>`<div><b>${t+1}</b><span>${Q(e.name)}</span><span>${e.wins} ชนะ · ${e.exp} EXP</span></div>`).join(``)||`<p>ยังไม่มีประวัติการศึก</p>`}</div>`)}catch{ae(`โหลดอันดับไม่สำเร็จ`)}else if(s===`reconnect`)location.assign(`/room/`+encodeURIComponent(qc.saved().roomId)+`?action=reconnect`);else if(s===`focus-online`)document.querySelector(`#online-panel`)?.scrollIntoView({behavior:n?`auto`:`smooth`,block:`center`}),document.querySelector(`#room-code`)?.focus();else if(s===`count-down`||s===`count-up`)m=Math.max(4,Math.min(10,m+(s===`count-up`?1:-1))),document.querySelector(`#player-count`).textContent=`${m} คน`;else if(s===`bot`||s===`quick-bot`)le(`create`,`BOT`);else if(s===`create`)le(`create`);else if(s===`join`){let e=document.querySelector(`#room-code`).value.trim();if(!e){ae(`กรุณาระบุรหัสห้อง`);return}le(`join`,`ONLINE`,e)}else if(s===`copy`)try{await navigator.clipboard.writeText(r.roomId),ae(`คัดลอกรหัสห้องแล้ว`)}catch{ae(`รหัสห้อง: `+r.roomId)}else if(s===`add-bot`)Ae(`add_bot`);else if(s===`remove-bot`)Ae(`remove_bot`);else if(s===`start`)Ae(`start_game`,{totalPlayers:Number(ne.get(`players`)||6)});else if(s===`draft`)Ae(`choose_character`,{characterId:t.dataset.hero});else if(s===`log`)V(`<h2>บันทึกการศึก</h2><div class="event-history">${(r?.chat||[]).slice(-80).reverse().map(e=>`<div><small>${Q(e.time)} · ${Q(e.sender)}</small><p>${Q(e.text)}</p></div>`).join(``)||`<p>ยังไม่มีเหตุการณ์</p>`}</div>`);else if(s===`sandbox`)ze();else if(s.startsWith(`admin-`)){let e=document.querySelector(`#admin-player`).value;s===`admin-spawn`&&a?.send(`admin_spawn_card`,{targetPlayerId:e,cardName:document.querySelector(`#admin-card`).value}),s===`admin-hero`&&a?.send(`admin_change_hero`,{targetPlayerId:e,characterId:document.querySelector(`#admin-hero`).value}),s===`admin-hp`&&a?.send(`admin_set_hp`,{targetPlayerId:e,hp:Number(document.querySelector(`#admin-hp`).value)}),s===`admin-ai`&&a?.send(`admin_toggle_bot_ai`,{isPassive:!r.isBotPassive}),s===`admin-pass`&&a?.send(`admin_bot_pass_turn`),oe()}else if(s===`own-equipment`)V(`<h2>อุปกรณ์ของคุณ</h2><div class="reaction-cards">${Object.values(B()?.equipment||{}).filter(Boolean).map(e=>tb(e,`equipment`)).join(``)}</div><p class="helper">เลือกอุปกรณ์เพื่อดูรายละเอียด ใช้การ์ดแดงแทนโจมตีได้เมื่อเป็นกวนอู หรือเลือกทิ้งร่วมกับการ์ดบนมือได้ตามสกิล</p>`);else if(s===`inspect-selected`){let e=re([...h][0]);e&&Ie(e)}else if(s===`equipment`){let e=re(c);if(!e)return;if(r?.pendingAction?.type===`WAITING_FOR_FROST_DISCARD`){Ie(e);return}let t=[`HEART`,`DIAMOND`].includes(e.suit);_===`ZHIHENG`||r?.pendingAction?.type===`WAITING_FOR_AXE_DISCARD`||r?.pendingAction?.type===`WAITING_FOR_TRIDENT_DISCARD`||sc(B()?.character)===`GUAN_YU`&&t?(h.has(e.id)?h.delete(e.id):h.add(e.id),!_&&!r?.pendingAction&&(h=new Set([e.id]),v=`SLASH`),pe()):Ie(e)}else if(s===`card`){if(r?.pendingAction?.type===`WAITING_FOR_FROST_DISCARD`)return;if([`ZHIHENG`,`RENDE`,`SPEAR`].includes(_)||r?.currentPhase===`DISCARD`||[`WAITING_FOR_AXE_DISCARD`,`WAITING_FOR_TRIDENT_DISCARD`].includes(r?.pendingAction?.type||``))h.has(c)?h.delete(c):h.add(c);else{let e=h.has(c);h.clear(),e||h.add(c)}r?.pendingAction||(g=[]),pe()}else if(s===`target`){let e=t.dataset.player;if(!h.size&&!_){let t=r.players[e];V(`<h2>${Q(t.name)}</h2>${eb(t.character)}<p>${Q(pc[sc(t.character)]?.skills)}</p><p>${t.hp}/${t.maxHp} HP · ${t.handCount} ใบ · ${Q(hc[t.role]?.name)}</p><div class="zone-options">${Object.values(t.equipment).filter(Boolean).map(e=>`<span>${Q(dc[e.name]?.name)}</span>`).join(``)}</div>`);return}if(g.includes(e)){g=g.filter(t=>t!==e),pe();return}if(!ve(r.players[e])){ae(`เป้าหมายนี้ใช้กับการ์ดหรือสกิลที่เลือกไม่ได้`);return}if(g.includes(e))g=g.filter(t=>t!==e);else{let t=Te();g.length>=t&&(g=[]),g.push(e)}pe()}else if(s===`skill`){if(de(),_=t.dataset.skill,_===`KUROU`){Ae(`use_huang_gai_skill`);return}pe()}else if(s===`convert`)v=v?``:`SLASH`,g=[],pe();else if(s===`cancel`)de(),pe();else if(s===`submit`)je();else if(s===`recast`)Me();else if(s===`end`)Ae(`end_turn`);else if(s===`discard`)Ae(`discard_cards`,{cardIds:[...h]});else if(s===`choose-zone`)C=t.dataset.zone,oe(),Ae(`use_card`,{cardId:[...h][0],targetPlayerId:g[0],targetZone:C,targetCardId:c});else if(s===`respond`)Ne();else if(s===`pass`)Pe();else if(s===`luo-draw`)Ae(`trigger_luo_river`);else if(s===`rescue`){let e=B()?.hand?.find(e=>e.name===`PEACH`||r?.pendingAction?.targetPlayerId===i&&e.name===`WINE`);Ae(`use_peach_dying`,{usePeach:!0,cardId:e?.id})}else if(s===`negate`)Ae(`play_negate`,{cardId:B()?.hand?.find(e=>e.name===`NEGATE`)?.id});else if(s===`trigrams`)Ae(`resolve_pending`,{response:`EIGHT_TRIGRAMS`});else if(s===`lord-react`)Ae(`use_lord_skill`);else if(s===`harvest`)Ae(`pick_bumper_card`,{cardId:c});else if(s===`guess`)Ae(`hero_response`,{guess:t.dataset.suit});else if(s===`hero-accept`)Ae(`hero_response`,{accept:!0,slot:C===`HAND`?`hand`:C});else if(s===`damage-zone`)C=t.dataset.zone,ae(`เลือกเขตแล้ว`);else if(s===`guan-up`){let e=x.includes(c)?x:S,t=e.indexOf(c);t>0&&([e[t-1],e[t]]=[e[t],e[t-1]]),pe()}else if(s===`guan-bottom`)x.includes(c)?(x=x.filter(e=>e!==c),S.push(c)):(S=S.filter(e=>e!==c),x.push(c)),pe();else if(s===`guan-confirm`)Ae(`hero_response`,{topIds:x,bottomIds:S});else if(s===`frost-clear`){if(r?.pendingAction?.type!==`WAITING_FOR_FROST_DISCARD`)return;h.clear(),pe()}else if(s===`frost-card`){if(!De(c))return;h.has(c)?h.delete(c):h.size<Ee()&&h.add(c),pe()}else if(s===`frost-hand`){let e=r?.pendingAction;if(e?.type!==`WAITING_FOR_FROST_DISCARD`)return;let t=r.players[e.targetPlayerId],n=[...h].filter(e=>e.startsWith(`hand_`)).length;if(!t||h.size>=Ee()||n>=t.handCount)return;let i=0;for(;h.has(`hand_`+i);)i++;h.add(`hand_`+i),pe()}}),document.addEventListener(`contextmenu`,e=>{let t=e.target.closest(`[data-action="card"]`);if(t){e.preventDefault();let n=re(t.dataset.card);n&&Ie(n)}}),document.addEventListener(`pointerdown`,()=>{D.unlock()},{passive:!0}),document.addEventListener(`input`,e=>{let t=e.target;t.id===`sound-volume`&&D.setVolume(Number(t.value)/100)}),document.addEventListener(`keydown`,e=>{if(D.unlock(),e.key===`Escape`&&!t.open){de(),pe();return}let n=e.target.closest(`#hand .hand-card`);if(n&&[`ArrowLeft`,`ArrowRight`].includes(e.key)){e.preventDefault();let t=Array.from(document.querySelectorAll(`#hand .hand-card`)),r=t[(t.indexOf(n)+(e.key===`ArrowRight`?1:-1)+t.length)%t.length];r?.focus(),r?.scrollIntoView({block:`nearest`,inline:`nearest`})}}),window.addEventListener(`resize`,()=>{F=!0,pe()});function Be(){L!==void 0&&clearTimeout(L),L=void 0,ee=Array.from(document.querySelectorAll(`[data-deadline]`)),Ve()}function Ve(){if(L=void 0,document.hidden)return;let e=Date.now(),t=1/0;for(let n of ee){if(!n.isConnected)continue;let r=Number(n.dataset.deadline)||0,i=Math.max(0,r-e),a=Math.ceil(i/1e3);z(n,String(a)),i>0&&(t=Math.min(t,i-(a-1)*1e3+5))}Number.isFinite(t)&&(L=setTimeout(Ve,Math.max(20,t)))}document.addEventListener(`visibilitychange`,()=>{document.hidden?(N&&cancelAnimationFrame(N),N=0,L!==void 0&&clearTimeout(L),L=void 0):(pe(),Be())});async function He(){if(!/^\/(room|app|test)(\/|$)/.test(location.pathname)){H();return}let e=ne.get(`test`)===`true`||location.pathname===`/test`,t=e?`Admin`:ne.get(`name`)||qc.saved()?.name||localStorage.getItem(`wtk.name`)||`นักรบ`,n=decodeURIComponent(location.pathname.split(`/`)[2]||``),s=ne.get(`action`)||`join`,l=ne.get(`playerId`)||``,u=s===`create`&&(ne.get(`mode`)===`BOT`||e);a=new qc(t),a.onStatus=e=>{(e.includes(`หลุด`)||e.includes(`กำลังเชื่อมต่อ`))&&D.resetBaseline(),c=e;let t=document.querySelector(`#connection-state`);t&&(t.textContent=e)},a.onIdentity=e=>{i=e.playerId,ue(e),!b&&u&&(b=!0,a?.send(`start_game`,{totalPlayers:Number(ne.get(`players`)||6)})),pe()},a.onState=e=>{r&&r.roomId!==e.roomId&&(T=[],D.resetBaseline()),r=e,D.observeSnapshot(r,i);let t=r.pendingAction,n=t?`${t.type}:${ob(r)}:${t.timeoutAt}`:``;n!==y&&(y=n,h.clear(),g=[],_=``,v=``,x=t?.cards?.map(e=>e.id)||[],S=[]);for(let e of h)!re(e)&&!De(e)&&h.delete(e);pe()},a.onEvent=(e,t)=>{if(e===`game_error`)ae(t.message||`คำสั่งไม่สำเร็จ`);else if(e===`admin_auth_status`&&t.isAdmin){p=!0;let e=document.querySelector(`.navigation nav`);e&&!e.querySelector(`[data-action="sandbox"]`)&&e.insertAdjacentHTML(`beforeend`,$(`sandbox`,sb(`settings`),`icon-button`,`aria-label="สนามทดสอบ"`))}else D.event(e,t)&&o?.event(e,t)},pe();try{await a.connect(s,n,ne.get(`mode`)||`ONLINE`,e,l)}catch{let e=`ไม่พบห้อง ห้องเริ่มเกมแล้ว หรือช่วง reconnect หมดแล้ว`,t=document.querySelector(`.connecting p`);t?t.textContent=e:ae(e)}}window.addEventListener(`pagehide`,()=>{N&&cancelAnimationFrame(N),L!==void 0&&clearTimeout(L),I?.disconnect(),o?.dispose(),D.dispose()}),He()}))();
//# sourceMappingURL=index-tcDm5Yv4.js.map