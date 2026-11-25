(()=>{
'use strict';
const DATA=window.REDNOTE_MAP_DATA||[];const NS='http://www.w3.org/2000/svg';
const svg=document.getElementById('map'),content=document.getElementById('mapContent'),view=document.getElementById('viewport');
const zoomValue=document.getElementById('zoomValue'),search=document.getElementById('search'),clearSearch=document.getElementById('clearSearch'),status=document.getElementById('mapStatus'),toast=document.getElementById('toast');
const W=3420,H=3500,CW=800,CH=800,GAP=40,STARTX=80,STARTY=90;
svg.setAttribute('viewBox',`0 0 ${W} ${H}`);
let scale=1,tx=0,ty=0,minScale=.1,maxScale=3.5,dragging=false,pointerId=null,startX=0,startY=0,originX=0,originY=0,lastTap=0;
const zoneColors=['#fff5f5','#f4f8f2','#f3f7fb','#fbf6ef','#f5f3fa','#f0f8f7','#fbf4f7','#f6f6f2'];
function el(tag,attrs={},parent=content){const n=document.createElementNS(NS,tag);for(const [k,v] of Object.entries(attrs))n.setAttribute(k,v);parent.appendChild(n);return n}
function textNode(parent,x,y,txt,size=22,weight=400,fill='#303030'){const t=el('text',{x,y,'font-size':size,'font-weight':weight,fill,'font-family':'Inter,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Microsoft YaHei,sans-serif'},parent);t.textContent=txt;return t}
function rounded(parent,x,y,w,h,r,fill,stroke='none',sw=1){return el('rect',{x,y,width:w,height:h,rx:r,fill,stroke,'stroke-width':sw},parent)}
function wrapText(str,max=34){const out=[];let line='';for(const ch of String(str)){line+=ch;if(line.length>=max){out.push(line);line='';}}if(line)out.push(line);return out}
function makeMap(){
 // quiet park ground and simple circulation roads
 rounded(content,0,0,W,H,0,'#f4f4f1');el('rect',{x:0,y:0,width:W,height:H,fill:'url(#groundGrid)',opacity:.62});
 // Broad, unlabelled roads form a simple flat campus structure.
 rounded(content,25,28,W-50,H-56,44,'none','#e1e1dc',3);
 rounded(content,STARTX-26,STARTY-26,W-STARTX*2+52,H-STARTY*2+52,34,'none','#e7e7e2',2);
 for(let c=0;c<3;c++){const x=STARTX+(c+1)*CW+c*GAP+GAP/2;rounded(content,x-22,STARTY-6,44,H-STARTY*2+12,22,'#ecece7');}
 for(let r=0;r<3;r++){const y=STARTY+(r+1)*CH+r*GAP+GAP/2;rounded(content,STARTX-6,y-22,W-STARTX*2+12,44,22,'#ecece7');}
 // subtle green pockets
 [[65,650,55,350],[W-120,300,55,440],[580,30,300,42],[2300,H-90,500,40],[100,2600,260,50]].forEach(([x,y,w,h])=>rounded(content,x,y,w,h,18,'#e7eee4'));
 DATA.forEach((section,i)=>drawZone(section,i));
 // map edge labels, not numerical markers
 textNode(content,STARTX,42,'REDNOTE · FUNCTION LANDSCAPE',18,650,'#a3a39d');
 textNode(content,W-STARTX,H-35,'A FLAT MAP OF PLATFORM FEATURES',14,600,'#b2b2ac');
}
function drawZone(section,i){
 const col=i%4,row=Math.floor(i/4),x=STARTX+col*(CW+GAP),y=STARTY+row*(CH+GAP),g=el('g',{'data-zone':i,'data-title':section.title});
 rounded(g,x,y,CW,CH,24,'#fff','#e6e6e2',2);
 rounded(g,x+1,y+1,CW-2,96,23,zoneColors[i%zoneColors.length]);
 // header
 const short=section.title.replace(/（.*?）/g,'').replace(/\(.*?\)/g,'').trim();
 textNode(g,x+30,y+42,short,31,700,'#252525');
 textNode(g,x+30,y+70,section.title,14,450,'#8c8c87');
 const count=section.items.length;textNode(g,x+CW-30,y+49,String(count).padStart(2,'0'),24,600,'#c4c4be').setAttribute('text-anchor','end');
 el('path',{d:`M${x+28} ${y+112}H${x+CW-28}`,stroke:'#ededeb','stroke-width':1},g);
 const items=section.items,cols=2,innerX=x+28,innerY=y+130,colW=(CW-56-20)/2,rowH=41.5;
 items.forEach((item,j)=>{
   const c=Math.floor(j/Math.ceil(items.length/2)),r=j%Math.ceil(items.length/2);const ix=innerX+c*(colW+20),iy=innerY+r*rowH;
   const node=el('g',{'data-feature':item.title.toLowerCase(),'data-search':(item.title+' '+item.details.join(' ')).toLowerCase()},g);
   // restrained tiny location pin-like dot instead of numeric marker
   el('circle',{cx:ix+5,cy:iy+9,r:3.2,fill:'#ff6478'},node);
   const title=String(item.title).replace(/\s+/g,' ').trim();
   const t=textNode(node,ix+16,iy+13,title,15,600,'#383838');
   // Keep full source notes available on hover and in accessible title; a compact single-line detail sits under title.
   const detail=item.details.join(' · ');
   if(detail){
     const compact=detail.length>30?detail.slice(0,29)+'…':detail;
     const d=textNode(node,ix+16,iy+30,compact,10.5,400,'#9a9a95');
     d.setAttribute('opacity','.94');
   }
   const titleEl=el('title',{},node);titleEl.textContent=title+(detail?' — '+detail:'');
 });
 // subtle corner park marker, purely graphic
 el('circle',{cx:x+CW-28,cy:y+CH-26,r:3,fill:'#d8e5d4'},g);
}
function apply(){content.setAttribute('transform',`translate(${tx} ${ty}) scale(${scale})`);zoomValue.textContent=Math.round(scale*100)+'%';}
function fit(){const rect=view.getBoundingClientRect();const availW=rect.width-40,availH=rect.height-40;scale=Math.min(availW/W,availH/H);minScale=Math.max(.08,scale*.78);maxScale=3.5;tx=(rect.width-W*scale)/2;ty=(rect.height-H*scale)/2;apply();}
function zoomAt(factor,px=view.clientWidth/2,py=view.clientHeight/2){const ns=Math.min(maxScale,Math.max(minScale,scale*factor));const ratio=ns/scale;tx=px-(px-tx)*ratio;ty=py-(py-ty)*ratio;scale=ns;apply();}
function point(e){const r=view.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}}
view.addEventListener('pointerdown',e=>{if(e.target.closest('.topbar,.controls,.smc-link'))return;dragging=true;pointerId=e.pointerId;view.setPointerCapture(pointerId);const p=point(e);startX=p.x;startY=p.y;originX=tx;originY=ty;view.classList.add('dragging');});
view.addEventListener('pointermove',e=>{if(!dragging||e.pointerId!==pointerId)return;const p=point(e);tx=originX+p.x-startX;ty=originY+p.y-startY;apply();});
function stopDrag(e){if(!dragging)return;dragging=false;pointerId=null;view.classList.remove('dragging');}
view.addEventListener('pointerup',stopDrag);view.addEventListener('pointercancel',stopDrag);view.addEventListener('lostpointercapture',stopDrag);
view.addEventListener('wheel',e=>{e.preventDefault();const p=point(e);zoomAt(e.deltaY<0?1.12:.89,p.x,p.y);},{passive:false});
document.getElementById('zoomIn').addEventListener('click',()=>zoomAt(1.22));document.getElementById('zoomOut').addEventListener('click',()=>zoomAt(.82));document.getElementById('fitMap').addEventListener('click',fit);
window.addEventListener('resize',fit);
function toastMsg(msg){toast.textContent=msg;toast.classList.add('show');clearTimeout(toastMsg.t);toastMsg.t=setTimeout(()=>toast.classList.remove('show'),1800)}
document.getElementById('copyLink').addEventListener('click',async()=>{const link='https://smc.edu.pl/smap/rednote';try{await navigator.clipboard.writeText(link);toastMsg('地图链接已复制')}catch(e){const ta=document.createElement('textarea');ta.value=link;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy');toastMsg('地图链接已复制')}catch(_){toastMsg(link)}ta.remove();}});
function runSearch(){const q=search.value.trim().toLowerCase();clearSearch.hidden=!q;let matched=0;content.querySelectorAll('[data-feature]').forEach(n=>{const ok=!q||n.getAttribute('data-search').includes(q);n.style.opacity=ok?'1':'.14';if(ok&&q)matched++;});content.querySelectorAll('[data-zone]').forEach(z=>{const any=!q||Array.from(z.querySelectorAll('[data-feature]')).some(n=>n.style.opacity==='1');z.style.opacity=any?'1':'.25';});status.textContent=q?(matched?`找到 ${matched} 项相关功能`:'没有找到匹配功能'):'16 个功能区域 · 265 项功能';}
search.addEventListener('input',runSearch);clearSearch.addEventListener('click',()=>{search.value='';runSearch();search.focus()});
svg.addEventListener('keydown',e=>{if(e.key==='+'||e.key==='='){e.preventDefault();zoomAt(1.18)}else if(e.key==='-'){e.preventDefault();zoomAt(.84)}else if(e.key==='0'){e.preventDefault();fit()}else if(e.key.startsWith('Arrow')){e.preventDefault();const step=60;if(e.key==='ArrowLeft')tx+=step;if(e.key==='ArrowRight')tx-=step;if(e.key==='ArrowUp')ty+=step;if(e.key==='ArrowDown')ty-=step;apply();}});
makeMap();fit();
})();
