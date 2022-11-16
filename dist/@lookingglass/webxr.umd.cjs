(function(v,P){typeof exports=="object"&&typeof module<"u"?P(exports,require("@lookingglass/webxr-polyfill/src/api/index"),require("@lookingglass/webxr-polyfill/src/api/XRSystem"),require("@lookingglass/webxr-polyfill/src/WebXRPolyfill"),require("holoplay-core"),require("@lookingglass/webxr-polyfill/src/devices/XRDevice"),require("@lookingglass/webxr-polyfill/src/api/XRSpace"),require("gl-matrix"),require("@lookingglass/webxr-polyfill/src/api/XRWebGLLayer")):typeof define=="function"&&define.amd?define(["exports","@lookingglass/webxr-polyfill/src/api/index","@lookingglass/webxr-polyfill/src/api/XRSystem","@lookingglass/webxr-polyfill/src/WebXRPolyfill","holoplay-core","@lookingglass/webxr-polyfill/src/devices/XRDevice","@lookingglass/webxr-polyfill/src/api/XRSpace","gl-matrix","@lookingglass/webxr-polyfill/src/api/XRWebGLLayer"],P):(v=typeof globalThis<"u"?globalThis:v||self,P(v["Looking Glass WebXR"]={},v["@lookingglass/webxr-polyfill/src/api/index"],v["@lookingglass/webxr-polyfill/src/api/XRSystem"],v["@lookingglass/webxr-polyfill/src/WebXRPolyfill"],v.holoPlayCore,v["@lookingglass/webxr-polyfill/src/devices/XRDevice"],v["@lookingglass/webxr-polyfill/src/api/XRSpace"],v.glMatrix,v["@lookingglass/webxr-polyfill/src/api/XRWebGLLayer"]))})(this,function(v,P,X,J,j,ee,te,g,z){"use strict";var ke=Object.defineProperty;var Ie=(v,P,X)=>P in v?ke(v,P,{enumerable:!0,configurable:!0,writable:!0,value:X}):v[P]=X;var L=(v,P,X)=>(Ie(v,typeof P!="symbol"?P+"":P,X),X);const G=s=>s&&typeof s=="object"&&"default"in s?s:{default:s};function ie(s){if(s&&s.__esModule)return s;const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(s){for(const e in s)if(e!=="default"){const n=Object.getOwnPropertyDescriptor(s,e);Object.defineProperty(t,e,n.get?n:{enumerable:!0,get:()=>s[e]})}}return t.default=s,Object.freeze(t)}const K=G(P),ne=G(X),ae=G(J),se=ie(j),re=G(ee),oe=G(te),le=G(z),O=1.6;var Y;(function(s){s[s.Swizzled=0]="Swizzled",s[s.Center=1]="Center",s[s.Quilt=2]="Quilt"})(Y||(Y={}));class ce extends EventTarget{constructor(e){super();L(this,"_calibration",{configVersion:"1.0",pitch:{value:45},slope:{value:-5},center:{value:-.5},viewCone:{value:40},invView:{value:1},verticalAngle:{value:0},DPI:{value:338},screenW:{value:250},screenH:{value:250},flipImageX:{value:0},flipImageY:{value:0},flipSubp:{value:0}});L(this,"_viewControls",{tileHeight:512,numViews:45,trackballX:0,trackballY:0,targetX:0,targetY:O,targetZ:-.5,targetDiam:2,fovy:13/180*Math.PI,depthiness:1.25,inlineView:Y.Center});this._viewControls={...this._viewControls,...e},this.syncCalibration()}syncCalibration(){new se.Client(e=>{if(e.devices.length<1){console.error("No Looking Glass devices found!");return}e.devices.length>1&&console.warn("More than one Looking Glass device found... using the first one"),this.calibration=e.devices[0].calibration},e=>{console.error("Error creating Looking Glass client:",e)})}addEventListener(e,n,a){super.addEventListener(e,n,a)}onConfigChange(){this.dispatchEvent(new Event("on-config-changed"))}get calibration(){return this._calibration}set calibration(e){this._calibration={...this._calibration,...e},this.onConfigChange()}updateViewControls(e){e!=null&&(this._viewControls={...this._viewControls,...e},this.onConfigChange())}get tileHeight(){return this._viewControls.tileHeight}set tileHeight(e){this.updateViewControls({tileHeight:e})}get numViews(){return this._viewControls.numViews}set numViews(e){this.updateViewControls({numViews:e})}get targetX(){return this._viewControls.targetX}set targetX(e){this.updateViewControls({targetX:e})}get targetY(){return this._viewControls.targetY}set targetY(e){this.updateViewControls({targetY:e})}get targetZ(){return this._viewControls.targetZ}set targetZ(e){this.updateViewControls({targetZ:e})}get trackballX(){return this._viewControls.trackballX}set trackballX(e){this.updateViewControls({trackballX:e})}get trackballY(){return this._viewControls.trackballY}set trackballY(e){this.updateViewControls({trackballY:e})}get targetDiam(){return this._viewControls.targetDiam}set targetDiam(e){this.updateViewControls({targetDiam:e})}get fovy(){return this._viewControls.fovy}set fovy(e){this.updateViewControls({fovy:e})}get depthiness(){return this._viewControls.depthiness}set depthiness(e){this.updateViewControls({depthiness:e})}get inlineView(){return this._viewControls.inlineView}set inlineView(e){this.updateViewControls({inlineView:e})}get aspect(){return this._calibration.screenW.value/this._calibration.screenH.value}get tileWidth(){return Math.round(this.tileHeight*this.aspect)}get framebufferWidth(){const e=this.tileWidth*this.tileHeight*this.numViews;return 2**Math.ceil(Math.log2(Math.max(Math.sqrt(e),this.tileWidth)))}get quiltWidth(){return Math.floor(this.framebufferWidth/this.tileWidth)}get quiltHeight(){return Math.ceil(this.numViews/this.quiltWidth)}get framebufferHeight(){return 2**Math.ceil(Math.log2(this.quiltHeight*this.tileHeight))}get viewCone(){return this._calibration.viewCone.value*this.depthiness/180*Math.PI}get tilt(){return this._calibration.screenH.value/(this._calibration.screenW.value*this._calibration.slope.value)*(this._calibration.flipImageX.value?-1:1)}get subp(){return 1/(this._calibration.screenW.value*3)}get pitch(){const e=this._calibration.screenW.value/this._calibration.DPI.value;return this._calibration.pitch.value*e*Math.cos(Math.atan(1/this._calibration.slope.value))}}let q=null;function I(){return q==null&&(q=new ce),q}function $(s){const t=I();s!=null&&t.updateViewControls(s)}function de(s){var M;const t=I(),e=document.createElement("style");document.head.appendChild(e),(M=e.sheet)==null||M.insertRule("#LookingGlassWebXRControls * { all: revert; font-family: sans-serif }");const n=document.createElement("div");n.id="LookingGlassWebXRControls",n.style.position="fixed",n.style.zIndex="1000",n.style.padding="15px",n.style.width="320px",n.style.maxWidth="calc(100vw - 18px)",n.style.maxHeight="calc(100vh - 18px)",n.style.whiteSpace="nowrap",n.style.background="rgba(0, 0, 0, 0.6)",n.style.color="white",n.style.borderRadius="10px",n.style.right="15px",n.style.bottom="15px";const a=document.createElement("div");n.appendChild(a),a.style.width="100%",a.style.textAlign="center",a.style.fontWeight="bold",a.innerText="Looking Glass Controls ";const f=document.createElement("div");n.appendChild(f),f.style.width="100%",f.style.whiteSpace="normal",f.style.color="rgba(255,255,255,0.7)",f.style.fontSize="14px",f.style.margin="5px 0",f.innerHTML="Click the popup and use WASD, mouse left/right drag, and scroll.";const l=document.createElement("input");a.appendChild(l),l.type="button",l.value="\u2190",l.dataset.otherValue="\u2192",l.onclick=()=>{[n.style.right,n.style.left]=[n.style.left,n.style.right],[l.value,l.dataset.otherValue]=[l.dataset.otherValue||"",l.value]};const c=document.createElement("div");n.appendChild(c);const o=(i,d,h)=>{const r=h.stringify,y=document.createElement("div");y.style.marginBottom="8px",c.appendChild(y);const R=i,T=t[i],p=document.createElement("label");if(y.appendChild(p),p.innerText=h.label,p.setAttribute("for",R),p.style.width="100px",p.style.display="inline-block",p.style.textDecoration="dotted underline 1px",p.style.fontFamily='"Courier New"',p.style.fontSize="13px",p.style.fontWeight="bold",p.title=h.title,d.type!=="checkbox"){const m=document.createElement("input");y.appendChild(m),m.type="button",m.value="\u238C",m.alt="reset",m.title="Reset value to default",m.style.padding="0 4px",m.onclick=_=>{u.value=T,u.oninput(_)}}const u=document.createElement("input");y.appendChild(u),Object.assign(u,d),u.id=R,u.title=h.title,u.value=d.value!==void 0?d.value:T;const W=m=>{t[i]=m,H(m)};u.oninput=()=>{const m=d.type==="range"?parseFloat(u.value):d.type==="checkbox"?u.checked:u.value;W(m)};const U=m=>{let _=m(t[i]);h.fixRange&&(_=h.fixRange(_),u.max=Math.max(parseFloat(u.max),_).toString(),u.min=Math.min(parseFloat(u.min),_).toString()),u.value=_,W(_)};d.type==="range"&&(u.style.width="110px",u.style.height="8px",u.onwheel=m=>{U(_=>_+Math.sign(m.deltaX-m.deltaY)*d.step)});let H=m=>{};if(r){const m=document.createElement("span");m.style.fontFamily='"Courier New"',m.style.fontSize="13px",m.style.marginLeft="3px",y.appendChild(m),H=_=>{m.innerHTML=r(_)},H(T)}return U};o("tileHeight",{type:"range",min:160,max:455,step:1},{label:"resolution",title:"resolution of each view",stringify:i=>`${(i*t.aspect).toFixed()}&times;${i.toFixed()}`}),o("numViews",{type:"range",min:1,max:145,step:1},{label:"views",title:"number of different viewing angles to render",stringify:i=>i.toFixed()});const N=o("trackballX",{type:"range",min:-Math.PI,max:1.0001*Math.PI,step:.5/180*Math.PI},{label:"trackball x",title:"camera trackball x",fixRange:i=>(i+Math.PI*3)%(Math.PI*2)-Math.PI,stringify:i=>`${(i/Math.PI*180).toFixed()}&deg;`}),x=o("trackballY",{type:"range",min:-.5*Math.PI,max:.5001*Math.PI,step:1/180*Math.PI},{label:"trackball y",title:"camera trackball y",fixRange:i=>Math.max(-.5*Math.PI,Math.min(i,.5*Math.PI)),stringify:i=>`${(i/Math.PI*180).toFixed()}&deg;`}),S=o("targetX",{type:"range",min:-20,max:20,step:.1},{label:"target x",title:"target position x",fixRange:i=>i,stringify:i=>i.toFixed(2)+" m"}),B=o("targetY",{type:"range",min:-20,max:20,step:.1},{label:"target y",title:"target position y",fixRange:i=>i,stringify:i=>i.toFixed(2)+" m"}),F=o("targetZ",{type:"range",min:-20,max:20,step:.1},{label:"target z",title:"target position z",fixRange:i=>i,stringify:i=>i.toFixed(2)+" m"});o("fovy",{type:"range",min:1/180*Math.PI,max:120.1/180*Math.PI,step:1/180*Math.PI},{label:"fov",title:"perspective fov (degrades stereo effect)",fixRange:i=>Math.max(1/180*Math.PI,Math.min(i,120.1/180*Math.PI)),stringify:i=>{const d=i/Math.PI*180,h=Math.atan(Math.tan(i/2)*t.aspect)*2/Math.PI*180;return`${d.toFixed()}&deg;&times;${h.toFixed()}&deg;`}}),o("depthiness",{type:"range",min:0,max:2,step:.01},{label:"depthiness",title:'exaggerates depth by multiplying the width of the view cone (as reported by the firmware) - can somewhat compensate for depthiness lost using higher fov. 1.25 seems to be most physically accurate on Looking Glass 8.9".',fixRange:i=>Math.max(0,i),stringify:i=>`${i.toFixed(2)}x`}),o("inlineView",{type:"range",min:0,max:2,step:1},{label:"inline view",title:"what to show inline on the original canvas (swizzled = no overwrite)",fixRange:i=>Math.max(0,Math.min(i,2)),stringify:i=>i===0?"swizzled":i===1?"center":i===2?"quilt":"?"}),s.oncontextmenu=i=>{i.preventDefault()},s.addEventListener("wheel",i=>{const d=t.targetDiam,h=1.1,r=Math.log(d)/Math.log(h);return t.targetDiam=Math.pow(h,r+i.deltaY*.01)}),s.addEventListener("mousemove",i=>{const d=i.movementX,h=-i.movementY;if(i.buttons&2||i.buttons&1&&(i.shiftKey||i.ctrlKey)){const r=t.trackballX,y=t.trackballY,R=-Math.cos(r)*d+Math.sin(r)*Math.sin(y)*h,T=-Math.cos(y)*h,p=Math.sin(r)*d+Math.cos(r)*Math.sin(y)*h;S(u=>u+R*t.targetDiam*.001),B(u=>u+T*t.targetDiam*.001),F(u=>u+p*t.targetDiam*.001)}else i.buttons&1&&(N(r=>r-d*.01),x(r=>r-h*.01))});const b={w:0,a:0,s:0,d:0};s.addEventListener("keydown",i=>{switch(i.code){case"KeyW":b.w=1;break;case"KeyA":b.a=1;break;case"KeyS":b.s=1;break;case"KeyD":b.d=1;break}}),s.addEventListener("keyup",i=>{switch(i.code){case"KeyW":b.w=0;break;case"KeyA":b.a=0;break;case"KeyS":b.s=0;break;case"KeyD":b.d=0;break}}),requestAnimationFrame(w);function w(){let i=b.d-b.a,d=b.w-b.s;i&&d&&(i*=Math.sqrt(.5),d*=Math.sqrt(.5));const h=t.trackballX,r=t.trackballY,y=Math.cos(h)*i-Math.sin(h)*Math.cos(r)*d,R=-Math.sin(r)*d,T=-Math.sin(h)*i-Math.cos(h)*Math.cos(r)*d;S(p=>p+y*t.targetDiam*.03),B(p=>p+R*t.targetDiam*.03),F(p=>p+T*t.targetDiam*.03),requestAnimationFrame(w)}return n}const A=Symbol("LookingGlassXRWebGLLayer");class ue extends le.default{constructor(t,e,n){super(t,e,n);const a=document.createElement("canvas");a.tabIndex=0;const f=a.getContext("2d",{alpha:!1});a.addEventListener("dblclick",function(){this.requestFullscreen()});const l=de(a),c=I(),o=this[z.PRIVATE].config,N=e.createTexture();let x,S;const B=e.createFramebuffer(),F=e.enable.bind(e),b=e.disable.bind(e),w=e.getExtension("OES_vertex_array_object"),M=34229,i=w?w.bindVertexArrayOES.bind(w):e.bindVertexArray.bind(e),d=()=>{const E=e.getParameter(e.TEXTURE_BINDING_2D);if(e.bindTexture(e.TEXTURE_2D,N),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,c.framebufferWidth,c.framebufferHeight,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.bindTexture(e.TEXTURE_2D,E),x){const k=e.getParameter(e.RENDERBUFFER_BINDING);e.bindRenderbuffer(e.RENDERBUFFER,x),e.renderbufferStorage(e.RENDERBUFFER,S.format,c.framebufferWidth,c.framebufferHeight),e.bindRenderbuffer(e.RENDERBUFFER,k)}};(o.depth||o.stencil)&&(o.depth&&o.stencil?S={format:e.DEPTH_STENCIL,attachment:e.DEPTH_STENCIL_ATTACHMENT}:o.depth?S={format:e.DEPTH_COMPONENT16,attachment:e.DEPTH_ATTACHMENT}:o.stencil&&(S={format:e.STENCIL_INDEX8,attachment:e.STENCIL_ATTACHMENT}),x=e.createRenderbuffer()),d(),c.addEventListener("on-config-changed",d);const h=e.getParameter(e.FRAMEBUFFER_BINDING);e.bindFramebuffer(e.FRAMEBUFFER,B),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,N,0),(o.depth||o.stencil)&&e.framebufferRenderbuffer(e.FRAMEBUFFER,S.attachment,e.RENDERBUFFER,x),e.bindFramebuffer(e.FRAMEBUFFER,h);const r=e.createProgram(),y=e.createShader(e.VERTEX_SHADER);e.attachShader(r,y);const R=e.createShader(e.FRAGMENT_SHADER);e.attachShader(r,R);{const E=`
       attribute vec2 a_position;
       varying vec2 v_texcoord;
       void main() {
         gl_Position = vec4(a_position * 2.0 - 1.0, 0.0, 1.0);
         v_texcoord = a_position;
       }
     `;e.shaderSource(y,E),e.compileShader(y),e.getShaderParameter(y,e.COMPILE_STATUS)||console.warn(e.getShaderInfoLog(y))}let T,p,u;const W=()=>{const E=j.Shader(c);if(E===T)return;if(T=E,e.shaderSource(R,E),e.compileShader(R),!e.getShaderParameter(R,e.COMPILE_STATUS)){console.warn(e.getShaderInfoLog(R));return}if(e.linkProgram(r),!e.getProgramParameter(r,e.LINK_STATUS)){console.warn(e.getProgramInfoLog(r));return}p=e.getAttribLocation(r,"a_position"),u=e.getUniformLocation(r,"u_viewType");const k=e.getUniformLocation(r,"u_texture"),V=e.getParameter(e.CURRENT_PROGRAM);e.useProgram(r),e.uniform1i(k,0),e.useProgram(V)};c.addEventListener("on-config-changed",W);const U=w?w.createVertexArrayOES():e.createVertexArray(),H=e.createBuffer(),m=e.getParameter(e.ARRAY_BUFFER_BINDING),_=e.getParameter(M);i(U),e.bindBuffer(e.ARRAY_BUFFER,H),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),e.STATIC_DRAW),e.enableVertexAttribArray(p),e.vertexAttribPointer(p,2,e.FLOAT,!1,0,0),i(_),e.bindBuffer(e.ARRAY_BUFFER,m);const we=()=>{console.assert(this[A].LookingGlassEnabled),e.bindFramebuffer(e.FRAMEBUFFER,this.framebuffer);const E=e.getParameter(e.COLOR_CLEAR_VALUE),k=e.getParameter(e.DEPTH_CLEAR_VALUE),V=e.getParameter(e.STENCIL_CLEAR_VALUE);e.clearColor(0,0,0,0),e.clearDepth(1),e.clearStencil(0),e.clear(e.DEPTH_BUFFER_BIT|e.COLOR_BUFFER_BIT|e.STENCIL_BUFFER_BIT),e.clearColor(E[0],E[1],E[2],E[3]),e.clearDepth(k),e.clearStencil(V)},D=e.canvas;let Z,Q;const Ee=()=>{if(!this[A].LookingGlassEnabled)return;(D.width!==c.calibration.screenW.value||D.height!==c.calibration.screenH.value)&&(Z=D.width,Q=D.height,D.width=c.calibration.screenW.value,D.height=c.calibration.screenH.value);const E=e.getParameter(M),k=e.getParameter(e.CULL_FACE),V=e.getParameter(e.BLEND),xe=e.getParameter(e.DEPTH_TEST),Te=e.getParameter(e.STENCIL_TEST),_e=e.getParameter(e.SCISSOR_TEST),Le=e.getParameter(e.VIEWPORT),Pe=e.getParameter(e.FRAMEBUFFER_BINDING),Ce=e.getParameter(e.RENDERBUFFER_BINDING),Se=e.getParameter(e.CURRENT_PROGRAM),Fe=e.getParameter(e.ACTIVE_TEXTURE);{const Me=e.getParameter(e.TEXTURE_BINDING_2D);e.bindFramebuffer(e.FRAMEBUFFER,null),e.useProgram(r),i(U),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,N),e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.STENCIL_TEST),e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight),e.uniform1i(u,0),e.drawArrays(e.TRIANGLES,0,6),f==null||f.clearRect(0,0,a.width,a.height),f==null||f.drawImage(D,0,0),c.inlineView!==0&&(e.uniform1i(u,c.inlineView),e.drawArrays(e.TRIANGLES,0,6)),e.bindTexture(e.TEXTURE_2D,Me)}e.activeTexture(Fe),e.useProgram(Se),e.bindRenderbuffer(e.RENDERBUFFER,Ce),e.bindFramebuffer(e.FRAMEBUFFER,Pe),e.viewport(...Le),(_e?F:b)(e.SCISSOR_TEST),(Te?F:b)(e.STENCIL_TEST),(xe?F:b)(e.DEPTH_TEST),(V?F:b)(e.BLEND),(k?F:b)(e.CULL_FACE),i(E)};let C;window.addEventListener("unload",()=>{C&&C.close(),C=void 0});const Re=(E,k)=>{var V;!!C!=E&&(E?(W(),a.style.position="fixed",a.style.top="0",a.style.left="0",a.style.width="100%",a.style.height="100%",a.width=c.calibration.screenW.value,a.height=c.calibration.screenH.value,document.body.appendChild(l),C=window.open("",void 0,"width=640,height=360"),C.document.title="Looking Glass Window (fullscreen me on Looking Glass!)",C.document.body.style.background="black",C.document.body.appendChild(a),console.assert(k),C.onbeforeunload=k):((V=l.parentElement)==null||V.removeChild(l),D.width=Z,D.height=Q,C.onbeforeunload=void 0,C.close(),C=void 0))};this[A]={LookingGlassEnabled:!1,framebuffer:B,clearFramebuffer:we,blitTextureToDefaultFramebufferIfNeeded:Ee,moveCanvasToWindow:Re}}get framebuffer(){return this[A].LookingGlassEnabled?this[A].framebuffer:null}get framebufferWidth(){return I().framebufferWidth}get framebufferHeight(){return I().framebufferHeight}}class he extends re.default{constructor(t){super(t),this.sessions=new Map,this.viewSpaces=[],this.basePoseMatrix=g.mat4.create(),this.inlineProjectionMatrix=g.mat4.create(),this.inlineInverseViewMatrix=g.mat4.create(),this.LookingGlassProjectionMatrices=[],this.LookingGlassInverseViewMatrices=[]}onBaseLayerSet(t,e){const n=this.sessions.get(t);n.baseLayer=e;const a=e[A];a.LookingGlassEnabled=n.immersive,n.immersive&&a.moveCanvasToWindow(!0,()=>{this.endSession(t)})}isSessionSupported(t){return t==="inline"||t==="immersive-vr"}isFeatureSupported(t){switch(t){case"viewer":return!0;case"local":return!0;case"local-floor":return!0;case"bounded-floor":return!1;case"unbounded":return!1;default:return console.warn("LookingGlassXRDevice.isFeatureSupported: feature not understood:",t),!1}}async requestSession(t,e){if(!this.isSessionSupported(t))return Promise.reject();const n=t!=="inline",a=new me(t,e);return this.sessions.set(a.id,a),n&&this.dispatchEvent("@@webxr-polyfill/vr-present-start",a.id),Promise.resolve(a.id)}requestAnimationFrame(t){return this.global.requestAnimationFrame(t)}cancelAnimationFrame(t){this.global.cancelAnimationFrame(t)}onFrameStart(t,e){const n=this.sessions.get(t),a=I();if(n.immersive){const f=Math.tan(.5*a.fovy),l=.5*a.targetDiam/f,c=l-a.targetDiam,o=this.basePoseMatrix;g.mat4.fromTranslation(o,[a.targetX,a.targetY,a.targetZ]),g.mat4.rotate(o,o,a.trackballX,[0,1,0]),g.mat4.rotate(o,o,-a.trackballY,[1,0,0]),g.mat4.translate(o,o,[0,0,l]);for(let x=0;x<a.numViews;++x){const S=(x+.5)/a.numViews-.5,B=Math.tan(a.viewCone*S),F=l*B,b=this.LookingGlassInverseViewMatrices[x]=this.LookingGlassInverseViewMatrices[x]||g.mat4.create();g.mat4.translate(b,o,[F,0,0]),g.mat4.invert(b,b);const w=Math.max(c+e.depthNear,.01),M=c+e.depthFar,i=w*f,d=i,h=-i,r=w*-B,y=a.aspect*i,R=r+y,T=r-y,p=this.LookingGlassProjectionMatrices[x]=this.LookingGlassProjectionMatrices[x]||g.mat4.create();g.mat4.set(p,2*w/(R-T),0,0,0,0,2*w/(d-h),0,0,(R+T)/(R-T),(d+h)/(d-h),-(M+w)/(M-w),-1,0,0,-2*M*w/(M-w),0)}n.baseLayer[A].clearFramebuffer()}else{const f=n.baseLayer.context,l=f.drawingBufferWidth/f.drawingBufferHeight;g.mat4.perspective(this.inlineProjectionMatrix,e.inlineVerticalFieldOfView,l,e.depthNear,e.depthFar),g.mat4.fromTranslation(this.basePoseMatrix,[0,O,0]),g.mat4.invert(this.inlineInverseViewMatrix,this.basePoseMatrix)}}onFrameEnd(t){this.sessions.get(t).baseLayer[A].blitTextureToDefaultFramebufferIfNeeded()}async requestFrameOfReferenceTransform(t,e){const n=g.mat4.create();switch(t){case"viewer":case"local":return g.mat4.fromTranslation(n,[0,-O,0]),n;case"local-floor":return n;default:throw new Error("XRReferenceSpaceType not understood")}}endSession(t){const e=this.sessions.get(t);e.immersive&&e.baseLayer&&(e.baseLayer[A].moveCanvasToWindow(!1),this.dispatchEvent("@@webxr-polyfill/vr-present-end",t)),e.ended=!0}doesSessionSupportReferenceSpace(t,e){const n=this.sessions.get(t);return n.ended?!1:n.enabledFeatures.has(e)}getViewSpaces(t){if(t==="immersive-vr"){const e=I();for(let n=this.viewSpaces.length;n<e.numViews;++n)this.viewSpaces[n]=new pe(n);return this.viewSpaces.length=e.numViews,this.viewSpaces}}getViewport(t,e,n,a,f){if(f===void 0){const c=this.sessions.get(t).baseLayer.context;a.x=0,a.y=0,a.width=c.drawingBufferWidth,a.height=c.drawingBufferHeight}else{const l=I(),c=f%l.quiltWidth,o=Math.floor(f/l.quiltWidth);a.x=l.tileWidth*c,a.y=l.tileHeight*o,a.width=l.tileWidth,a.height=l.tileHeight}return!0}getProjectionMatrix(t,e){return e===void 0?this.inlineProjectionMatrix:this.LookingGlassProjectionMatrices[e]||g.mat4.create()}getBasePoseMatrix(){return this.basePoseMatrix}getBaseViewMatrix(){return this.inlineInverseViewMatrix}_getViewMatrixByIndex(t){return this.LookingGlassInverseViewMatrices[t]=this.LookingGlassInverseViewMatrices[t]||g.mat4.create()}getInputSources(){return[]}getInputPose(t,e,n){return null}onWindowResize(){}}let fe=0;class me{constructor(t,e){L(this,"mode");L(this,"immersive");L(this,"id");L(this,"baseLayer");L(this,"inlineVerticalFieldOfView");L(this,"ended");L(this,"enabledFeatures");this.mode=t,this.immersive=t==="immersive-vr"||t==="immersive-ar",this.id=++fe,this.baseLayer=null,this.inlineVerticalFieldOfView=Math.PI*.5,this.ended=!1,this.enabledFeatures=e}}class pe extends oe.default{constructor(e){super();L(this,"viewIndex");this.viewIndex=e}get eye(){return"none"}_onPoseUpdate(e){this._inverseBaseMatrix=e._getViewMatrixByIndex(this.viewIndex)}}class be extends ae.default{constructor(e){super();L(this,"vrButton");L(this,"device");L(this,"isPresenting",!1);$(e),this.overrideDefaultVRButton(),console.warn('Looking Glass WebXR "polyfill" overriding native WebXR API.');for(const n in K.default)this.global[n]=K.default[n];this.global.XRWebGLLayer=ue,this.injected=!0,this.device=new he(this.global),this.xr=new ne.default(Promise.resolve(this.device)),Object.defineProperty(this.global.navigator,"xr",{value:this.xr,configurable:!0})}async overrideDefaultVRButton(){this.vrButton=await ve("VRButton"),this.vrButton&&(this.device.addEventListener("@@webxr-polyfill/vr-present-start",()=>{this.isPresenting=!0,this.updateVRButtonUI()}),this.device.addEventListener("@@webxr-polyfill/vr-present-end",()=>{this.isPresenting=!1,this.updateVRButtonUI()}),this.vrButton.addEventListener("click",e=>{this.updateVRButtonUI()}),this.updateVRButtonUI())}async updateVRButtonUI(){if(this.vrButton){await ye(100),this.isPresenting?this.vrButton.innerHTML="EXIT LOOKING GLASS":this.vrButton.innerHTML="ENTER LOOKING GLASS";const e=220;this.vrButton.style.width=`${e}px`,this.vrButton.style.left=`calc(50% - ${e/2}px)`}}update(e){$(e)}}async function ve(s){return new Promise((t,e)=>{const n=new MutationObserver(function(a){a.forEach(function(f){f.addedNodes.forEach(function(l){const c=l;c.id==s&&(t(c),n.disconnect())})})});n.observe(document.body,{subtree:!1,childList:!0}),setTimeout(()=>{n.disconnect(),e(`id:${s} not found`)},5e3)})}function ye(s){return new Promise(t=>setTimeout(t,s))}const ge=I();v.LookingGlassConfig=ge,v.LookingGlassWebXRPolyfill=be,Object.defineProperties(v,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
