(()=>{var t={646:(t,e,r)=>{const{resize:a}=r(45);t.exports={buildImageList:t=>{const e=[];let r=100/Math.min(t.width,t.height);for(;;)if(e.push(r),r*=Math.pow(2,1/3),r>=.95){r=1;break}e.push(r),e.reverse();const i=[];for(let r=0;r<e.length;r++){t.width,e[r],t.height,e[r];i.push(Object.assign(a({image:t,ratio:e[r]}),{scale:e[r]}))}return i},buildTrackingImageList:t=>{const e=Math.min(t.width,t.height),r=[],i=[];r.push(256/e),r.push(128/e);for(let e=0;e<r.length;e++)i.push(Object.assign(a({image:t,ratio:r[e]}),{scale:r[e]}));return i}}},111:(t,e,r)=>{const{Cumsum:a}=r(115),i=t=>{let{image:e,featureMap:r,templateSize:a,searchSize:i,occSize:h,maxSimThresh:l,minSimThresh:u,sdThresh:n,imageDataCumsum:m,imageDataSqrCumsum:c}=t;const{data:f,width:g,height:d,scale:p}=e;h=Math.floor(Math.min(e.width,e.height)/10);const w=3*(2*a+1),M=Math.floor(g/w),y=Math.floor(d/w);let x=Math.floor(g/h)*Math.floor(d/h)+M*y;const q=[],C=new Float32Array(f.length);for(let t=0;t<C.length;t++)C[t]=r[t];let S=0;for(;S<x;){let t=l,r=-1,f=-1;for(let e=0;e<d;e++)for(let a=0;a<g;a++)C[e*g+a]<t&&(t=C[e*g+a],r=a,f=e);if(-1===r)break;const p=s({image:e,cx:r,cy:f,sdThresh:0,imageDataCumsum:m,imageDataSqrCumsum:c});if(null===p){C[f*g+r]=1;continue}if(p/(2*a+1)<n){C[f*g+r]=1;continue}let w=1,M=-1;for(let a=-i;a<=i;a++){for(let s=-i;s<=i;s++){if(s*s+a*a>i*i)continue;if(0===s&&0===a)continue;const h=o({image:e,vlen:p,cx:r+s,cy:f+a,tx:r,ty:f,imageDataCumsum:m,imageDataSqrCumsum:c});if(null!==h){if(h<w&&(w=h,w<u&&w<t))break;if(h>M&&(M=h,M>.99))break}}if(w<u&&w<t||M>.99)break}if(w<u&&w<t||M>.99)C[f*g+r]=1;else{q.push({x:r,y:f}),S+=1;for(let t=-h;t<=h;t++)for(let e=-h;e<=h;e++)f+t<0||f+t>=d||r+e<0||r+e>=g||(C[(f+t)*g+(r+e)]=1)}}return q},s=({image:t,cx:e,cy:r,sdThresh:a,imageDataCumsum:i,imageDataSqrCumsum:s})=>{if(e-6<0||e+6>=t.width)return null;if(r-6<0||r+6>=t.height)return null;let o=i.query(e-6,r-6,e+6,r+6);o/=169;let h=s.query(e-6,r-6,e+6,r+6);return h-=2*o*i.query(e-6,r-6,e+6,r+6),h+=169*o*o,h/169<a*a?null:(h=Math.sqrt(h),h)},o=t=>{const{image:e,cx:r,cy:a,vlen:i,tx:s,ty:o,imageDataCumsum:h,imageDataSqrCumsum:l}=t,{data:u,width:n,height:m}=e;if(r-6<0||r+6>=n)return null;if(a-6<0||a+6>=m)return null;const c=13;let f=h.query(r-6,a-6,r+6,a+6),g=l.query(r-6,a-6,r+6,a+6),d=0,p=(a-6)*n+(r-6),w=(o-6)*n+(s-6),M=n-c;for(let t=0;t<c;t++){for(let t=0;t<c;t++)d+=u[p]*u[w],p+=1,w+=1;p+=M,w+=M}let y=h.query(s-6,o-6,s+6,o+6);y/=169,d-=y*f;let x=g-f*f/169;if(0==x)return null;x=Math.sqrt(x);return 1*d/(i*x)};t.exports={extract:t=>{const{data:e,width:r,height:h,scale:l}=t,u=[r*h];for(let t=0;t<u.length;t++)u[t]=!1;const n=new Float32Array(e.length);for(let t=0;t<r;t++)n[t]=-1,n[r*(h-1)+t]=-1;for(let t=0;t<h;t++)n[t*r]=-1,n[t*r+r-1]=-1;for(let t=1;t<r-1;t++)for(let a=1;a<h-1;a++){let i=t+r*a,s=0,o=0;for(let t=-1;t<=1;t++)s+=e[i+r*t+1]-e[i+r*t-1],o+=e[i+r+t]-e[i-r+t];s/=768,o/=768,n[i]=Math.sqrt((s*s+o*o)/2)}const m=new Uint32Array(1e3);for(let t=0;t<1e3;t++)m[t]=0;const c=[-1,1,-r,r];let f=0;for(let t=1;t<r-1;t++)for(let e=1;e<h-1;e++){let a=t+r*e,i=!0;for(let t=0;t<c.length;t++)if(n[a]<=n[a+c[t]]){i=!1;break}if(i){let t=Math.floor(1e3*n[a]);t>999&&(t=999),t<0&&(t=0),m[t]+=1,f+=1,u[a]=!0}}const g=.02*r*h;let d=999,p=0;for(;d>=0&&(p+=m[d],!(p>g));)d--;for(let t=0;t<u.length;t++)u[t]&&1e3*n[t]<d&&(u[t]=!1);const w=[];for(let t=0;t<e.length;t++)w[t]=e[t]*e[t];const M=new a(e,r,h),y=new a(w,r,h),x=new Float32Array(e.length);for(let e=0;e<r;e++)for(let a=0;a<h;a++){const i=a*r+e;if(!u[i]){x[i]=1;continue}const h=s({image:t,cx:e,cy:a,sdThresh:5,imageDataCumsum:M,imageDataSqrCumsum:y});if(null===h){x[i]=1;continue}let l=-1;for(let r=-10;r<=10;r++){for(let i=-10;i<=10;i++){if(i*i+r*r<=4)continue;const s=o({image:t,cx:e+i,cy:a+r,vlen:h,tx:e,ty:a,imageDataCumsum:M,imageDataSqrCumsum:y});if(null!==s&&(s>l&&(l=s,l>.95)))break}if(l>.95)break}x[i]=l}return i({image:t,featureMap:x,templateSize:6,searchSize:2,occSize:16,maxSimThresh:.9,minSimThresh:.2,sdThresh:8,imageDataCumsum:M,imageDataSqrCumsum:y})}}},115:t=>{t.exports={Cumsum:class{constructor(t,e,r){this.cumsum=[];for(let t=0;t<r;t++){this.cumsum.push([]);for(let r=0;r<e;r++)this.cumsum[t].push(0)}this.cumsum[0][0]=t[0];for(let r=1;r<e;r++)this.cumsum[0][r]=this.cumsum[0][r-1]+t[r];for(let a=1;a<r;a++)this.cumsum[a][0]=this.cumsum[a-1][0]+t[a*e];for(let a=1;a<r;a++)for(let r=1;r<e;r++)this.cumsum[a][r]=t[a*e+r]+this.cumsum[a-1][r]+this.cumsum[a][r-1]-this.cumsum[a-1][r-1]}query(t,e,r,a){let i=this.cumsum[a][r];return e>0&&(i-=this.cumsum[e-1][r]),t>0&&(i-=this.cumsum[a][t-1]),t>0&&e>0&&(i+=this.cumsum[e-1][t-1]),i}}}},45:t=>{t.exports={downsampleBilinear:({image:t})=>{const{data:e,width:r,height:a}=t,i=Math.floor(r/2),s=Math.floor(a/2),o=new Float32Array(i*s),h=[0,1,r,r+1];for(let t=0;t<s;t++)for(let a=0;a<i;a++){let s=2*t*r+2*a,l=0;for(let t=0;t<h.length;t++)l+=e[s+h[t]];l*=.25,o[t*i+a]=l}return{data:o,width:i,height:s}},upsampleBilinear:({image:t,padOneWidth:e,padOneHeight:r})=>{const{width:a,height:i,data:s}=t,o=2*t.width+(e?1:0),h=2*t.height+(r?1:0),l=new Float32Array(o*h);for(let t=0;t<o;t++){const e=.5*t-.25;let r=Math.floor(e),u=Math.ceil(e);r<0&&(r=0),u>=a&&(u=a-1);for(let n=0;n<h;n++){const h=.5*n-.25;let m=Math.floor(h),c=Math.ceil(h);m<0&&(m=0),c>=i&&(c=i-1);const f=(u-e)*(c-h)*s[m*a+r]+(u-e)*(h-m)*s[c*a+r]+(e-r)*(c-h)*s[m*a+u]+(e-r)*(h-m)*s[c*a+u];l[n*o+t]=f}}return{data:l,width:o,height:h}},resize:({image:t,ratio:e})=>{const r=Math.round(t.width*e),a=Math.round(t.height*e),i=new Uint8Array(r*a);for(let s=0;s<r;s++){let o=Math.round(1*s/e),h=Math.round(1*(s+1)/e)-1;h>=t.width&&(h=t.width-1);for(let l=0;l<a;l++){let a=Math.round(1*l/e),u=Math.round(1*(l+1)/e)-1;u>=t.height&&(u=t.height-1);let n=0,m=0;for(let e=o;e<=h;e++)for(let r=a;r<=u;r++)n+=1*t.data[r*t.width+e],m+=1;i[l*r+s]=Math.floor(n/m)}}return{data:i,width:r,height:a}}}}},e={};function r(a){var i=e[a];if(void 0!==i)return i.exports;var s=e[a]={exports:{}};return t[a](s,s.exports,r),s.exports}(()=>{const{extract:t}=r(111),{buildTrackingImageList:e}=r(646);onmessage=t=>{const{data:r}=t;if("compile"===r.type){const{targetImages:t}=r,i=50/t.length;let s=0;const o=[];for(let r=0;r<t.length;r++){const h=t[r],l=e(h),u=i/l.length,n=a(l,(t=>{s+=u,postMessage({type:"progress",percent:s})}));o.push(n)}postMessage({type:"compileDone",list:o})}};const a=(e,r)=>{const a=[];for(let i=0;i<e.length;i++){const s=e[i],o=t(s),h={data:s.data,scale:s.scale,width:s.width,height:s.height,points:o};a.push(h),r(i)}return a}})()})();