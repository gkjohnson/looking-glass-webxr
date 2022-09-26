(function(E,X){typeof exports=="object"&&typeof module<"u"?X(exports,require("@lookingglass/webxr-polyfill/src/WebXRPolyfill"),require("@lookingglass/webxr-polyfill/src/api/XRSystem"),require("@lookingglass/webxr-polyfill/src/api/index"),require("@lookingglass/webxr-polyfill/src/devices/XRDevice"),require("@lookingglass/webxr-polyfill/src/api/XRSpace"),require("gl-matrix"),require("@lookingglass/webxr-polyfill/src/api/XRWebGLLayer"),require("holoplay-core/dist/holoplaycore.module.js"),require("holoplay-core")):typeof define=="function"&&define.amd?define(["exports","@lookingglass/webxr-polyfill/src/WebXRPolyfill","@lookingglass/webxr-polyfill/src/api/XRSystem","@lookingglass/webxr-polyfill/src/api/index","@lookingglass/webxr-polyfill/src/devices/XRDevice","@lookingglass/webxr-polyfill/src/api/XRSpace","gl-matrix","@lookingglass/webxr-polyfill/src/api/XRWebGLLayer","holoplay-core/dist/holoplaycore.module.js","holoplay-core"],X):(E=typeof globalThis<"u"?globalThis:E||self,X(E["Looking Glass WebXR"]={},E["@lookingglass/webxr-polyfill/src/WebXRPolyfill"],E["@lookingglass/webxr-polyfill/src/api/XRSystem"],E["@lookingglass/webxr-polyfill/src/api/index"],E["@lookingglass/webxr-polyfill/src/devices/XRDevice"],E["@lookingglass/webxr-polyfill/src/api/XRSpace"],E.glMatrix,E["@lookingglass/webxr-polyfill/src/api/XRWebGLLayer"],E.holoPlayCore,E.holoPlayCore))})(this,function(E,X,Z,$,J,Q,b,Y,ee,te){"use strict";const D=n=>n&&typeof n=="object"&&"default"in n?n:{default:n};function ie(n){if(n&&n.__esModule)return n;const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(n){for(const e in n)if(e!=="default"){const a=Object.getOwnPropertyDescriptor(n,e);Object.defineProperty(t,e,a.get?a:{enumerable:!0,get:()=>n[e]})}}return t.default=n,Object.freeze(t)}const ne=D(X),ae=D(Z),j=D($),se=D(J),re=D(Q),oe=D(Y),ce=ie(ee),U=1.6;let H;function A(){return H===void 0&&(H=he()),H}const le={configVersion:"1.0",pitch:{value:45},slope:{value:-5},center:{value:-.5},viewCone:{value:40},invView:{value:1},verticalAngle:{value:0},DPI:{value:338},screenW:{value:250},screenH:{value:250},flipImageX:{value:0},flipImageY:{value:0},flipSubp:{value:0}},he=()=>new class extends EventTarget{constructor(){super();const n=t=>{t&&this.dispatchEvent(new Event("on-config-changed")),new Promise(a=>{this._ensureConfigChangeEvent=a}).then(()=>n(!0))};n(!1),this.calibration=le,new ce.Client(t=>{if(t.devices.length<1){console.error("No Looking Glass devices found!");return}t.devices.length>1&&console.warn("More than one Looking Glass device found... using the first one"),this.calibration=t.devices[0].calibration},t=>{console.error("Error creating Looking Glass client:",t)}),this.tileHeight=512,this.numViews=45,this.trackballX=0,this.trackballY=0,this.targetX=0,this.targetY=U,this.targetZ=-.5,this.targetDiam=2,this.fovy=13/180*Math.PI,this.depthiness=1.25,this.inlineView=1}get calibration(){return this._calibration}set calibration(n){this._calibration=q(n),this._ensureConfigChangeEvent()}get tileHeight(){return this._tileHeight}set tileHeight(n){this._tileHeight=n,this._ensureConfigChangeEvent()}get numViews(){return this._numViews}set numViews(n){this._numViews=n,this._ensureConfigChangeEvent()}get targetX(){return this._targetX}set targetX(n){this._targetX=n,this._ensureConfigChangeEvent()}get targetY(){return this._targetY}set targetY(n){this._targetY=n,this._ensureConfigChangeEvent()}get targetZ(){return this._targetZ}set targetZ(n){this._targetZ=n,this._ensureConfigChangeEvent()}get trackballX(){return this._trackballX}set trackballX(n){this._trackballX=n,this._ensureConfigChangeEvent()}get trackballY(){return this._trackballY}set trackballY(n){this._trackballY=n,this._ensureConfigChangeEvent()}get targetDiam(){return this._targetDiam}set targetDiam(n){this._targetDiam=n,this._ensureConfigChangeEvent()}get fovy(){return this._fovy}set fovy(n){this._fovy=n,this._ensureConfigChangeEvent()}get depthiness(){return this._depthiness}set depthiness(n){this._depthiness=n,this._ensureConfigChangeEvent()}get inlineView(){return this._inlineView}set inlineView(n){this._inlineView=n,this._ensureConfigChangeEvent()}get aspect(){return this.calibration.screenW.value/this.calibration.screenH.value}get tileWidth(){return Math.round(this.tileHeight*this.aspect)}get framebufferWidth(){const n=this.tileWidth*this.tileHeight*this.numViews;return 2**Math.ceil(Math.log2(Math.max(Math.sqrt(n),this.tileWidth)))}get quiltWidth(){return Math.floor(this.framebufferWidth/this.tileWidth)}get quiltHeight(){return Math.ceil(this.numViews/this.quiltWidth)}get framebufferHeight(){return 2**Math.ceil(Math.log2(this.quiltHeight*this.tileHeight))}get viewCone(){return this.calibration.viewCone.value*this.depthiness/180*Math.PI}get tilt(){return this.calibration.screenH.value/(this.calibration.screenW.value*this.calibration.slope.value)*(this.calibration.flipImageX.value?-1:1)}get subp(){return 1/(this.calibration.screenW.value*3)}get pitch(){const n=this.calibration.screenW.value/this.calibration.DPI.value;return this.calibration.pitch.value*n*Math.cos(Math.atan(1/this.calibration.slope.value))}};function q(n){return Object.freeze(n),n===void 0||Object.getOwnPropertyNames(n).forEach(function(t){n[t]!==null&&(typeof n[t]=="object"||typeof n[t]=="function")&&!Object.isFrozen(n[t])&&q(n[t])}),n}function de(n){const t=A(),e=document.createElement("style");document.head.appendChild(e),e.sheet.insertRule("#LookingGlassWebXRControls * { all: revert; font-family: sans-serif }");const a=document.createElement("div");a.id="LookingGlassWebXRControls",a.style.position="fixed",a.style.zIndex=1e3,a.style.padding="4px",a.style.width="315px",a.style.height="360px",a.style.maxWidth="calc(100vw - 18px)",a.style.maxHeight="calc(100vh - 18px)",a.style.whiteSpace="nowrap",a.style.overflowY="scroll",a.style.scrollbarWidth="thin",a.style.scrollbarColor="thistle transparent",a.style.background="rgba(0, 0, 0, 0.6)",a.style.color="white",a.style.padding="2px",a.style.border="3px solid black",a.style.right="6px",a.style.bottom="6px";const s=document.createElement("div");a.appendChild(s),s.style.width="100%",s.style.textAlign="center",s.style.fontWeight="bold",s.innerText="LookingGlass View Controls ";const u=document.createElement("div");a.appendChild(u),u.style.width="100%",u.style.whiteSpace="normal",u.style.textAlign="center",u.innerHTML="Camera: click popup and use WASD, mouse left/right drag, and scroll.";const h=document.createElement("input");s.appendChild(h),h.type="button",h.value="\u2190",h._otherValue="\u2192",h.onclick=()=>{[a.style.right,a.style.left]=[a.style.left,a.style.right],[h.value,h._otherValue]=[h._otherValue,h.value]};const v=document.createElement("div");a.appendChild(v);const l=(i,r,c)=>{const m=c.stringify,g=document.createElement("div");v.appendChild(g);const R=i,_=t[i],p=document.createElement("label");if(g.appendChild(p),p.innerText=c.label,p.setAttribute("for",R),p.style.width="80px",p.style.display="inline-block",p.style.textDecoration="dotted underline 1px",p.title=c.title,r.type!=="checkbox"){const o=document.createElement("input");g.appendChild(o),o.type="button",o.value="\u238C",o.alt="reset",o.title="Reset value to default",o.style.padding="0 4px",o.onclick=()=>{d.value=_,d.oninput()}}const d=document.createElement("input");g.appendChild(d),Object.assign(d,r),d.id=R,d.title=c.title,d.value=r.value!==void 0?r.value:_;const N=o=>{t[i]=o,V(o)};d.oninput=()=>{const o=r.type==="range"?parseFloat(d.value):r.type==="checkbox"?d.checked:d.value;N(o)};const W=o=>{let T=o(t[i]);c.fixRange&&(T=c.fixRange(T),d.max=Math.max(parseFloat(d.max),T),d.min=Math.min(parseFloat(d.min),T)),d.value=T,N(T)};r.type==="range"&&(d.style.width="110px",d.style.height="16px",d.onwheel=o=>{W(T=>T+Math.sign(o.deltaX-o.deltaY)*r.step)});let V=()=>{};if(m){const o=document.createElement("span");g.appendChild(o),V=T=>{o.innerHTML=m(T)},V(_)}return W};l("tileHeight",{type:"range",min:160,max:455,step:1},{label:"resolution",title:"resolution of each view",stringify:i=>`${(i*t.aspect).toFixed()}&times;${i.toFixed()}`}),l("numViews",{type:"range",min:1,max:145,step:1},{label:"# views",title:"number of different viewing angles to render",stringify:i=>i.toFixed()});const B=l("trackballX",{type:"range",min:-Math.PI,max:1.0001*Math.PI,step:.5/180*Math.PI},{label:"trackball x",title:"camera trackball x",fixRange:i=>(i+Math.PI*3)%(Math.PI*2)-Math.PI,stringify:i=>`${(i/Math.PI*180).toFixed()}&deg;`}),x=l("trackballY",{type:"range",min:-.5*Math.PI,max:.5001*Math.PI,step:1/180*Math.PI},{label:"trackball y",title:"camera trackball y",fixRange:i=>Math.max(-.5*Math.PI,Math.min(i,.5*Math.PI)),stringify:i=>`${(i/Math.PI*180).toFixed()}&deg;`}),L=l("targetX",{type:"range",min:-20,max:20,step:.1},{label:"target x",title:"target position x",fixRange:i=>i,stringify:i=>i.toFixed(2)+" m"}),F=l("targetY",{type:"range",min:-20,max:20,step:.1},{label:"target y",title:"target position y",fixRange:i=>i,stringify:i=>i.toFixed(2)+" m"}),I=l("targetZ",{type:"range",min:-20,max:20,step:.1},{label:"target z",title:"target position z",fixRange:i=>i,stringify:i=>i.toFixed(2)+" m"}),M=l("targetDiam",{type:"range",min:.2,max:20,step:.1},{label:"target size",title:"diameter of the target sphere to fit in the screen",fixRange:i=>Math.max(.2,i),stringify:i=>`${(i*100).toFixed()} cm`});l("fovy",{type:"range",min:1/180*Math.PI,max:120.1/180*Math.PI,step:1/180*Math.PI},{label:"fov",title:"perspective fov (degrades stereo effect)",fixRange:i=>Math.max(1/180*Math.PI,Math.min(i,120.1/180*Math.PI)),stringify:i=>{const r=i/Math.PI*180,c=Math.atan(Math.tan(i/2)*t.aspect)*2/Math.PI*180;return`${r.toFixed()}&deg;&times;${c.toFixed()}&deg;`}}),l("depthiness",{type:"range",min:0,max:2,step:.01},{label:"depthiness",title:'exaggerates depth by multiplying the width of the view cone (as reported by the firmware) - can somewhat compensate for depthiness lost using higher fov. 1.25 seems to be most physically accurate on Looking Glass 8.9".',fixRange:i=>Math.max(0,i),stringify:i=>`${i.toFixed(2)}x`}),l("inlineView",{type:"range",min:0,max:2,step:1},{label:"inline view",title:"what to show inline on the original canvas (swizzled = no overwrite)",fixRange:i=>Math.max(0,Math.min(i,2)),stringify:i=>i===0?"swizzled":i===1?"center":i===2?"quilt":"?"}),n.oncontextmenu=i=>{i.preventDefault()},n.addEventListener("wheel",i=>{M(r=>{const m=Math.log(r)/Math.log(1.1);return Math.pow(1.1,m+i.deltaY*.01)})}),n.addEventListener("mousemove",i=>{const r=i.movementX,c=-i.movementY;if(i.buttons&2||i.buttons&1&&(i.shiftKey||i.ctrlKey)){const m=t.trackballX,g=t.trackballY,R=-Math.cos(m)*r+Math.sin(m)*Math.sin(g)*c,_=-Math.cos(g)*c,p=Math.sin(m)*r+Math.cos(m)*Math.sin(g)*c;L(d=>d+R*t.targetDiam*.001),F(d=>d+_*t.targetDiam*.001),I(d=>d+p*t.targetDiam*.001)}else i.buttons&1&&(B(m=>m-r*.01),x(m=>m-c*.01))});const f={w:0,a:0,s:0,d:0};n.addEventListener("keydown",i=>{switch(i.code){case"KeyW":f.w=1;break;case"KeyA":f.a=1;break;case"KeyS":f.s=1;break;case"KeyD":f.d=1;break}}),n.addEventListener("keyup",i=>{switch(i.code){case"KeyW":f.w=0;break;case"KeyA":f.a=0;break;case"KeyS":f.s=0;break;case"KeyD":f.d=0;break}}),requestAnimationFrame(S);function S(){let i=f.d-f.a,r=f.w-f.s;i&&r&&(i*=Math.sqrt(.5),r*=Math.sqrt(.5));const c=t.trackballX,m=t.trackballY,g=Math.cos(c)*i-Math.sin(c)*Math.cos(m)*r,R=-Math.sin(m)*r,_=-Math.sin(c)*i-Math.cos(c)*Math.cos(m)*r;L(p=>p+g*t.targetDiam*.03),F(p=>p+R*t.targetDiam*.03),I(p=>p+_*t.targetDiam*.03),requestAnimationFrame(S)}return a}const k=Symbol("LookingGlassXRWebGLLayer"),w=document.createElement("canvas");w.tabIndex=0;const z=w.getContext("2d",{alpha:!1});w.addEventListener("dblclick",function(){this.requestFullscreen()});const O=de(w);class ue extends oe.default{constructor(t,e,a){super(t,e,a);const s=A(),u=this[Y.PRIVATE].config,h=e.createTexture();let v,l;const B=e.createFramebuffer(),x=e.enable.bind(e),L=e.disable.bind(e),F=e.getExtension("OES_vertex_array_object"),I=34229,M=F?F.bindVertexArrayOES.bind(F):e.bindVertexArray.bind(e),f=()=>{const y=e.getParameter(e.TEXTURE_BINDING_2D);if(e.bindTexture(e.TEXTURE_2D,h),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,s.framebufferWidth,s.framebufferHeight,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.bindTexture(e.TEXTURE_2D,y),v){const C=e.getParameter(e.RENDERBUFFER_BINDING);e.bindRenderbuffer(e.RENDERBUFFER,v),e.renderbufferStorage(e.RENDERBUFFER,l.format,s.framebufferWidth,s.framebufferHeight),e.bindRenderbuffer(e.RENDERBUFFER,C)}};(u.depth||u.stencil)&&(u.depth&&u.stencil?l={format:e.DEPTH_STENCIL,attachment:e.DEPTH_STENCIL_ATTACHMENT}:u.depth?l={format:e.DEPTH_COMPONENT16,attachment:e.DEPTH_ATTACHMENT}:u.stencil&&(l={format:e.STENCIL_INDEX8,attachment:e.STENCIL_ATTACHMENT}),v=e.createRenderbuffer()),f(),s.addEventListener("on-config-changed",f);const S=e.getParameter(e.FRAMEBUFFER_BINDING);e.bindFramebuffer(e.FRAMEBUFFER,B),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,h,0),(u.depth||u.stencil)&&e.framebufferRenderbuffer(e.FRAMEBUFFER,l.attachment,e.RENDERBUFFER,v),e.bindFramebuffer(e.FRAMEBUFFER,S);const i=e.createProgram(),r=e.createShader(e.VERTEX_SHADER);e.attachShader(i,r);const c=e.createShader(e.FRAGMENT_SHADER);e.attachShader(i,c);{const y=`
       attribute vec2 a_position;
       varying vec2 v_texcoord;
       void main() {
         gl_Position = vec4(a_position * 2.0 - 1.0, 0.0, 1.0);
         v_texcoord = a_position;
       }
     `;e.shaderSource(r,y),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)||console.warn(e.getShaderInfoLog(r))}let m,g,R;const _=()=>{const y=te.Shader(s);if(y===m)return;if(m=y,e.shaderSource(c,y),e.compileShader(c),!e.getShaderParameter(c,e.COMPILE_STATUS)){console.warn(e.getShaderInfoLog(c));return}if(e.linkProgram(i),!e.getProgramParameter(i,e.LINK_STATUS)){console.warn(e.getProgramInfoLog(i));return}g=e.getAttribLocation(i,"a_position"),R=e.getUniformLocation(i,"u_viewType");const C=e.getUniformLocation(i,"u_texture"),G=e.getParameter(e.CURRENT_PROGRAM);e.useProgram(i),e.uniform1i(C,0),e.useProgram(G)};s.addEventListener("on-config-changed",_);const p=F?F.createVertexArrayOES():e.createVertexArray(),d=e.createBuffer(),N=e.getParameter(e.ARRAY_BUFFER_BINDING),W=e.getParameter(I);M(p),e.bindBuffer(e.ARRAY_BUFFER,d),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),e.STATIC_DRAW),e.enableVertexAttribArray(g),e.vertexAttribPointer(g,2,e.FLOAT,!1,0,0),M(W),e.bindBuffer(e.ARRAY_BUFFER,N);const V=()=>{console.assert(this[k].LookingGlassEnabled),e.bindFramebuffer(e.FRAMEBUFFER,this.framebuffer);const y=e.getParameter(e.COLOR_CLEAR_VALUE),C=e.getParameter(e.DEPTH_CLEAR_VALUE),G=e.getParameter(e.STENCIL_CLEAR_VALUE);e.clearColor(0,0,0,0),e.clearDepth(1),e.clearStencil(0),e.clear(e.DEPTH_BUFFER_BIT|e.COLOR_BUFFER_BIT|e.STENCIL_BUFFER_BIT),e.clearColor(y[0],y[1],y[2],y[3]),e.clearDepth(C),e.clearStencil(G)},o=e.canvas;let T,K;const Ee=()=>{if(!this[k].LookingGlassEnabled)return;(o.width!==s.calibration.screenW.value||o.height!==s.calibration.screenH.value)&&(T=o.width,K=o.height,o.width=s.calibration.screenW.value,o.height=s.calibration.screenH.value);const y=e.getParameter(I),C=e.getParameter(e.CULL_FACE),G=e.getParameter(e.BLEND),xe=e.getParameter(e.DEPTH_TEST),we=e.getParameter(e.STENCIL_TEST),Re=e.getParameter(e.SCISSOR_TEST),_e=e.getParameter(e.VIEWPORT),Te=e.getParameter(e.FRAMEBUFFER_BINDING),Pe=e.getParameter(e.RENDERBUFFER_BINDING),Fe=e.getParameter(e.CURRENT_PROGRAM),Le=e.getParameter(e.ACTIVE_TEXTURE);{const Me=e.getParameter(e.TEXTURE_BINDING_2D);e.bindFramebuffer(e.FRAMEBUFFER,null),e.useProgram(i),M(p),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,h),e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.STENCIL_TEST),e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight),e.uniform1i(R,0),e.drawArrays(e.TRIANGLES,0,6),z.clearRect(0,0,w.width,w.height),z.drawImage(o,0,0),s.inlineView!==0&&(e.uniform1i(R,s.inlineView),e.drawArrays(e.TRIANGLES,0,6)),e.bindTexture(e.TEXTURE_2D,Me)}e.activeTexture(Le),e.useProgram(Fe),e.bindRenderbuffer(e.RENDERBUFFER,Pe),e.bindFramebuffer(e.FRAMEBUFFER,Te),e.viewport(..._e),(Re?x:L)(e.SCISSOR_TEST),(we?x:L)(e.STENCIL_TEST),(xe?x:L)(e.DEPTH_TEST),(G?x:L)(e.BLEND),(C?x:L)(e.CULL_FACE),M(y)};let P;window.addEventListener("unload",()=>{P&&P.close(),P=void 0});const ve=(y,C)=>{!!P!=y&&(y?(_(),w.style.position="fixed",w.style.top="0",w.style.left="0",w.style.width="100%",w.style.height="100%",w.width=s.calibration.screenW.value,w.height=s.calibration.screenH.value,document.body.appendChild(O),P=window.open("",void 0,"width=640,height=360"),P.document.title="Looking Glass Window (fullscreen me on Looking Glass!)",P.document.body.style.background="black",P.document.body.appendChild(w),console.assert(C),P.onbeforeunload=C):(O.parentElement.removeChild(O),o.width=T,o.height=K,P.onbeforeunload=void 0,P.close(),P=void 0))};this[k]={LookingGlassEnabled:!1,framebuffer:B,clearFramebuffer:V,blitTextureToDefaultFramebufferIfNeeded:Ee,moveCanvasToWindow:ve}}get framebuffer(){return this[k].LookingGlassEnabled?this[k].framebuffer:null}get framebufferWidth(){return A().framebufferWidth}get framebufferHeight(){return A().framebufferHeight}}class fe extends se.default{constructor(t){super(t),this.sessions=new Map,this.viewSpaces=[],this.basePoseMatrix=b.mat4.create(),this.inlineProjectionMatrix=b.mat4.create(),this.inlineInverseViewMatrix=b.mat4.create(),this.LookingGlassProjectionMatrices=[],this.LookingGlassInverseViewMatrices=[]}onBaseLayerSet(t,e){const a=this.sessions.get(t);a.baseLayer=e;const s=e[k];s.LookingGlassEnabled=a.immersive,a.immersive&&s.moveCanvasToWindow(!0,()=>{this.endSession(t)})}isSessionSupported(t){return t==="inline"||t==="immersive-vr"}isFeatureSupported(t){switch(t){case"viewer":return!0;case"local":return!0;case"local-floor":return!0;case"bounded-floor":return!1;case"unbounded":return!1;default:return console.warn("LookingGlassXRDevice.isFeatureSupported: feature not understood:",t),!1}}async requestSession(t,e){if(!this.isSessionSupported(t))return Promise.reject();const a=t!=="inline",s=new pe(t,e);return this.sessions.set(s.id,s),a&&this.dispatchEvent("@@webxr-polyfill/vr-present-start",s.id),Promise.resolve(s.id)}requestAnimationFrame(t){return this.global.requestAnimationFrame(t)}cancelAnimationFrame(t){this.global.cancelAnimationFrame(t)}onFrameStart(t,e){const a=this.sessions.get(t),s=A();if(a.immersive){const u=Math.tan(.5*s.fovy),h=.5*s.targetDiam/u,v=h-s.targetDiam,l=this.basePoseMatrix;b.mat4.fromTranslation(l,[s.targetX,s.targetY,s.targetZ]),b.mat4.rotate(l,l,s.trackballX,[0,1,0]),b.mat4.rotate(l,l,-s.trackballY,[1,0,0]),b.mat4.translate(l,l,[0,0,h]);for(let x=0;x<s.numViews;++x){const L=(x+.5)/s.numViews-.5,F=Math.tan(s.viewCone*L),I=h*F,M=this.LookingGlassInverseViewMatrices[x]=this.LookingGlassInverseViewMatrices[x]||b.mat4.create();b.mat4.translate(M,l,[I,0,0]),b.mat4.invert(M,M);const f=Math.max(v+e.depthNear,.01),S=v+e.depthFar,i=f*u,r=i,c=-i,m=f*-F,g=s.aspect*i,R=m+g,_=m-g,p=this.LookingGlassProjectionMatrices[x]=this.LookingGlassProjectionMatrices[x]||b.mat4.create();b.mat4.set(p,2*f/(R-_),0,0,0,0,2*f/(r-c),0,0,(R+_)/(R-_),(r+c)/(r-c),-(S+f)/(S-f),-1,0,0,-2*S*f/(S-f),0)}a.baseLayer[k].clearFramebuffer()}else{const u=a.baseLayer.context,h=u.drawingBufferWidth/u.drawingBufferHeight;b.mat4.perspective(this.inlineProjectionMatrix,e.inlineVerticalFieldOfView,h,e.depthNear,e.depthFar),b.mat4.fromTranslation(this.basePoseMatrix,[0,U,0]),b.mat4.invert(this.inlineInverseViewMatrix,this.basePoseMatrix)}}onFrameEnd(t){this.sessions.get(t).baseLayer[k].blitTextureToDefaultFramebufferIfNeeded()}async requestFrameOfReferenceTransform(t,e){const a=b.mat4.create();switch(t){case"viewer":case"local":return b.mat4.fromTranslation(a,[0,-U,0]),a;case"local-floor":return a;default:throw new Error("XRReferenceSpaceType not understood")}}endSession(t){const e=this.sessions.get(t);e.immersive&&e.baseLayer&&(e.baseLayer[k].moveCanvasToWindow(!1),this.dispatchEvent("@@webxr-polyfill/vr-present-end",t)),e.ended=!0}doesSessionSupportReferenceSpace(t,e){const a=this.sessions.get(t);return a.ended?!1:a.enabledFeatures.has(e)}getViewSpaces(t){if(t==="immersive-vr"){const e=A();for(let a=this.viewSpaces.length;a<e.numViews;++a)this.viewSpaces[a]=new be(a);return this.viewSpaces.length=e.numViews,this.viewSpaces}}getViewport(t,e,a,s,u){if(u===void 0){const v=this.sessions.get(t).baseLayer.context;s.x=0,s.y=0,s.width=v.drawingBufferWidth,s.height=v.drawingBufferHeight}else{const h=A(),v=u%h.quiltWidth,l=Math.floor(u/h.quiltWidth);s.x=h.tileWidth*v,s.y=h.tileHeight*l,s.width=h.tileWidth,s.height=h.tileHeight}return!0}getProjectionMatrix(t,e){return e===void 0?this.inlineProjectionMatrix:this.LookingGlassProjectionMatrices[e]||b.mat4.create()}getBasePoseMatrix(){return this.basePoseMatrix}getBaseViewMatrix(){return this.inlineInverseViewMatrix}_getViewMatrixByIndex(t){return this.LookingGlassInverseViewMatrices[t]=this.LookingGlassInverseViewMatrices[t]||b.mat4.create()}getInputSources(){return[]}getInputPose(t,e,a){return null}onWindowResize(){}}let me=0;class pe{constructor(t,e){this.mode=t,this.immersive=t==="immersive-vr"||t==="immersive-ar",this.id=++me,this.baseLayer=null,this.inlineVerticalFieldOfView=Math.PI*.5,this.ended=!1,this.enabledFeatures=e}}class be extends re.default{constructor(t){super(),this.viewIndex=t}get eye(){return"none"}_onPoseUpdate(t){this._inverseBaseMatrix=t._getViewMatrixByIndex(this.viewIndex)}}class ge extends ne.default{constructor(t){super(),console.warn(t||'Looking Glass WebXR "polyfill" overriding native WebXR API.');for(const a in j.default)this.global[a]=j.default[a];this.global.XRWebGLLayer=ue,this.injected=!0;const e=Promise.resolve(new fe(this.global));this.xr=new ae.default(e),Object.defineProperty(this.global.navigator,"xr",{value:this.xr,configurable:!0})}}const ye=A();E.LookingGlassConfig=ye,E.LookingGlassWebXRPolyfill=ge,Object.defineProperties(E,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
