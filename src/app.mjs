import {translate} from './i18n.mjs';
import {TRACKS,PRESETS,fromPreset,validatePattern,stepDuration,isAudible,wavBuffer} from './model.mjs';
import {DrumEngine} from './engine.mjs';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let state=fromPreset(),engine,playing=false,timer,raf,nextTime=0,step=0,loops=0,queue=[],history=[],taps=[],toastTimer,selected='pocket',starting=false,saveTimer;
const KEY='pocket-groove-v1';
let locale='zh';
try { locale=localStorage.getItem('pocket-groove-locale-v1')==='en'?'en':'zh'; } catch {}
const tr=text=>translate(text,locale);
function applyLocale(){
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  let node;while(node=walker.nextNode())if(!['SCRIPT','STYLE','OPTION'].includes(node.parentElement.tagName))node.textContent=tr(node.textContent);
  document.querySelectorAll('[aria-label],[title]').forEach(el=>{for(const attr of ['aria-label','title'])if(el.hasAttribute(attr))el.setAttribute(attr,tr(el.getAttribute(attr)));});
  document.documentElement.lang=locale==='en'?'en':'zh-CN';
  document.title=locale==='en'?'Pocket Groove · Drum Studio':'Pocket Groove · 口袋鼓房';
  $('#locale').value=locale;
}
$('#locale').onchange=e=>{locale=e.target.value;try{localStorage.setItem('pocket-groove-locale-v1',locale);}catch{}applyLocale();};
try{const saved=localStorage.getItem(KEY);if(saved){state=validatePattern(JSON.parse(saved));selected=null;}}catch{setTimeout(()=>toast('未能读取上次工程，已载入默认节奏'),300);}
function toast(text){$('#toast').textContent=tr(text);$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3000);}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));$('#saveState').textContent=tr('已保存在本机');}catch{$('#saveState').textContent=tr('请导出工程备份');}$('#undo').disabled=!history.length;}
function remember(){history.push(JSON.stringify(state));if(history.length>40)history.shift();selected=null;}
function clamp(v,min,max,fallback){v=Number(v);return Number.isFinite(v)?Math.max(min,Math.min(max,Math.round(v))):fallback;}
async function audio(){if(!engine){const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)throw Error('当前浏览器不支持 Web Audio');engine=new DrumEngine(new Audio());}await engine.ctx.resume();if(engine.ctx.state!=='running')throw Error('声音尚未启用，请再点一次播放');engine.volume(state.volume);return engine;}
function syncControls(){$('#patternName').value=state.name;$('#bpm').value=state.bpm;$('#swing').value=state.swing;$('#swingValue').textContent=state.swing+'%';$('#volume').value=state.volume;$('#metro').checked=state.metronome;}
function render(){syncControls();const host=$('#tracks');host.replaceChildren();
  TRACKS.forEach((t,r)=>{const tr=state.tracks[r],row=document.createElement('div');row.className='track'+(isAudible(state.tracks,r)?'':' dim');row.style.setProperty('--track',t.color);row.innerHTML=`<div class="track-name"><span class="track-mark"></span><span><b>${t.name}</b><small>${t.en}</small></span><span class="track-key">${t.key}</span></div><div class="steps"></div><div class="mix"><button class="mute" aria-label="${t.name}静音" aria-pressed="${tr.mute}">M</button><button class="solo" aria-label="${t.name}独奏" aria-pressed="${tr.solo}">S</button><input type="range" min="0" max="100" value="${tr.volume}" aria-label="${t.name}音量"></div>`;
    for(let s=0;s<16;s++){const b=document.createElement('button');b.className='step'+(tr.steps[s]?' active':'')+(tr.steps[s]===1?' ghost':'');b.dataset.step=s;b.setAttribute('aria-label',`${t.name} 第${Math.floor(s/4)+1}拍 第${s%4+1}格 ${['关闭','轻击','重击'][tr.steps[s]]}`);b.setAttribute('aria-pressed',!!tr.steps[s]);b.addEventListener('click',async ev=>{remember();tr.steps[s]=ev.shiftKey?(tr.steps[s]===1?0:1):(tr.steps[s]?0:2);render();save();if(!playing&&tr.steps[s])try{const a=await audio();a.hit(t.id,a.ctx.currentTime+.005,tr.steps[s]===1?.38:.9,tr.volume/100);}catch(e){toast(e.message);}});row.querySelector('.steps').append(b);}
    const mute=row.querySelector('.mute'),solo=row.querySelector('.solo');mute.classList.toggle('on',tr.mute);solo.classList.toggle('on',tr.solo);
    mute.onclick=()=>{remember();tr.mute=!tr.mute;render();save();};solo.onclick=()=>{remember();tr.solo=!tr.solo;render();save();};row.querySelector('input').oninput=e=>{tr.volume=+e.target.value;save();};host.append(row);
  });
  $$('.preset').forEach(b=>b.classList.toggle('selected',b.dataset.id===selected));$('#undo').disabled=!history.length;applyLocale();
}
for(let s=0;s<16;s++){const el=document.createElement('span');el.textContent=s%4===0?s/4+1:['','e','&','a'][s%4];el.className=s%4===0?'strong':'';el.dataset.step=s;$('#beatLabels').append(el);}
Object.entries(PRESETS).forEach(([id,p])=>{const b=document.createElement('button');b.className='preset';b.dataset.id=id;b.innerHTML=`<span class="mini-beat" aria-hidden="true">${[8,16,11,20,7,14,10,17].map((h,i)=>`<i style="height:${h+(id.length+i)%4}px"></i>`).join('')}</span><strong>${p.name}</strong><small>${p.genre}</small><span class="preset-tempo">${p.bpm} BPM ↗</span>`;b.onclick=()=>{stop();remember();state=fromPreset(id);selected=id;render();save();toast('已载入 '+p.name+' · 可撤销');};$('#presets').append(b);});
TRACKS.forEach(t=>{const b=document.createElement('button');b.className='pad';b.style.setProperty('--track',t.color);b.dataset.id=t.id;b.setAttribute('aria-label','试听'+t.name);b.innerHTML=`<b>${t.key}</b><small>${t.en}</small>`;b.onclick=()=>pad(t.id);$('#pads').append(b);});
async function pad(id){try{const a=await audio(),r=TRACKS.findIndex(t=>t.id===id);a.hit(id,a.ctx.currentTime+.003,.9,state.tracks[r].volume/100);const b=$(`.pad[data-id="${id}"]`);b.classList.add('flash');setTimeout(()=>b.classList.remove('flash'),110);}catch(e){toast(e.message);}}
function schedule(){const now=engine.ctx.currentTime;if(nextTime<now-.1){stop();toast('播放已暂停，请重新开始');return;}while(playing&&nextTime<now+.07){
    if(step===0&&loops>0&&loops%4===0&&$('#ramp').checked){const target=clamp($('#target').value,40,220,140);if(state.bpm<target){state.bpm=Math.min(target,state.bpm+ +$('#increment').value);$('#bpm').value=state.bpm;save();}$('#rampStatus').textContent=tr(state.bpm>=target?'已达目标':'进行中');}
    state.tracks.forEach((tr,r)=>{if(tr.steps[step]&&isAudible(state.tracks,r))engine.hit(tr.id,nextTime,tr.steps[step]===1?.38:.9,tr.volume/100);});
    if(state.metronome&&step%4===0)engine.hit('click',nextTime,step===0?1:.65,.7);
    queue.push({step,time:nextTime,loops});nextTime+=stepDuration(state.bpm,state.swing,step);step++;if(step===16){step=0;loops++;}
  }}
function animate(){if(!playing)return;let current;while(queue.length&&queue[0].time<=engine.ctx.currentTime)current=queue.shift();if(current){$$('.current').forEach(e=>e.classList.remove('current'));$$(`[data-step="${current.step}"]`).forEach(e=>e.classList.add('current'));$('#position').textContent=tr(`第 ${Math.floor(current.step/4)+1} 拍`);$('#loopCount').textContent=` / LOOP ${String(current.loops+1).padStart(2,'0')} · 4/4`;}raf=requestAnimationFrame(animate);}
async function start(){if(playing||starting)return;starting=true;try{await audio();playing=true;step=0;loops=0;queue=[];nextTime=engine.ctx.currentTime+.06;document.body.classList.add('playing');$('#play').innerHTML='■ <span>停止播放</span>';$('#play').setAttribute('aria-label','停止播放');applyLocale();schedule();timer=setInterval(schedule,20);raf=requestAnimationFrame(animate);}catch(e){toast(e.message);}finally{starting=false;}}
function stop(){playing=false;clearInterval(timer);cancelAnimationFrame(raf);queue=[];if(engine){engine.master.gain.cancelScheduledValues(engine.ctx.currentTime);engine.master.gain.setTargetAtTime(0,engine.ctx.currentTime,.01);}document.body.classList.remove('playing');$$('.current').forEach(e=>e.classList.remove('current'));$('#play').innerHTML='▶ <span>开始播放</span>';$('#play').setAttribute('aria-label','播放节奏');$('#position').textContent='等待第一拍';$('#loopCount').textContent=' / 16 STEPS · 4/4';applyLocale();}
$('#play').onclick=()=>playing?stop():start();
$('#bpm').onchange=e=>{state.bpm=clamp(e.target.value,40,220,state.bpm);e.target.value=state.bpm;taps=[];save();};
$('#swing').oninput=e=>{state.swing=+e.target.value;$('#swingValue').textContent=state.swing+'%';save();};
$('#volume').oninput=e=>{state.volume=+e.target.value;if(engine&&playing)engine.volume(state.volume);save();};
$('#metro').onchange=e=>{state.metronome=e.target.checked;save();};
$('#patternName').oninput=e=>{state.name=e.target.value;clearTimeout(saveTimer);saveTimer=setTimeout(save,250);};
$('#tap').onclick=()=>{const now=performance.now();if(taps.length&&now-taps.at(-1)>2000)taps=[];taps.push(now);if(taps.length>7)taps.shift();if(taps.length<3){toast('继续敲击，再来 '+(3-taps.length)+' 次');return;}state.bpm=clamp(60000/((taps.at(-1)-taps[0])/(taps.length-1)),40,220,100);$('#bpm').value=state.bpm;save();toast('已设为 '+state.bpm+' BPM');};
$('#clear').onclick=()=>{remember();state.tracks.forEach(t=>t.steps.fill(0));render();save();toast('格子已清空 · 可撤销');};
$('#undo').onclick=()=>{if(!history.length)return;stop();state=JSON.parse(history.pop());selected=null;render();save();toast('已撤销');};
$('#variation').onclick=()=>{remember();state.tracks[2].steps=Array.from({length:16},(_,i)=>i%2===0?2:(Math.random()<.25?1:0));state.tracks[3].steps=Array.from({length:16},(_,i)=>[7,15].includes(i)&&Math.random()<.6?2:0);state.tracks[4].steps=Array.from({length:16},(_,i)=>i>=13&&Math.random()<.4?1:0);render();save();toast('新的镲片与加花 · 可撤销');};
$('#target').onchange=e=>e.target.value=clamp(e.target.value,40,220,140);
$('#ramp').onchange=e=>{$('#rampStatus').textContent=tr(e.target.checked?'已开启':'关闭');if(e.target.checked&&+$('#target').value<=state.bpm)toast('目标速度不高于当前速度，将保持当前速度');};
function download(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);}
function filename(){return (state.name||'my-groove').replace(/[<>:"/\\|?*\x00-\x1f]/g,'-').slice(0,60);}
$('#json').onclick=()=>{download(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),filename()+'.json');toast('工程已导出');};
$('#import').onclick=()=>$('#file').click();
$('#file').onchange=async e=>{try{const f=e.target.files[0];if(!f)return;if(f.size>100000)throw Error('文件过大，请选择鼓房导出的 JSON 工程');const next=validatePattern(JSON.parse(await f.text()));stop();remember();state=next;render();save();toast('工程已导入');}catch(err){toast(err instanceof SyntaxError?'无法读取工程，请选择有效的鼓房 JSON 文件':err.message);}finally{e.target.value='';}};
$('#wav').onclick=async()=>{const b=$('#wav');b.disabled=true;b.textContent=tr('正在渲染…');try{const snapshot=validatePattern(JSON.parse(JSON.stringify(state)));const length=4*4*60/snapshot.bpm,sampleRate=44100;const offline=new OfflineAudioContext(1,Math.ceil((length+.55)*sampleRate),sampleRate),synth=new DrumEngine(offline);synth.volume(snapshot.volume);let time=0;for(let bar=0;bar<4;bar++)for(let s=0;s<16;s++){snapshot.tracks.forEach((tr,r)=>{if(tr.steps[s]&&isAudible(snapshot.tracks,r))synth.hit(tr.id,time,tr.steps[s]===1?.38:.9,tr.volume/100);});time+=stepDuration(snapshot.bpm,snapshot.swing,s);}const output=await offline.startRendering();download(new Blob([wavBuffer(output)],{type:'audio/wav'}),filename()+'-'+snapshot.bpm+'bpm.wav');toast('已导出 4 小节 WAV（含尾音）');}catch(e){toast('音频导出失败：'+e.message);}finally{b.disabled=false;b.textContent=tr('导出音频 ↗');}};
$('#help').onclick=()=>$('#helpDialog').showModal();$('#closeHelp').onclick=()=>$('#helpDialog').close();
document.addEventListener('keydown',e=>{if(e.repeat||e.ctrlKey||e.altKey||e.metaKey||e.isComposing||$('#helpDialog').open||/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName))return;if(e.code==='Space'){e.preventDefault();playing?stop():start();return;}const t=TRACKS.find(t=>t.key.toLowerCase()===e.key.toLowerCase());if(t)pad(t.id);});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing){stop();toast('切到后台，节奏已暂停');}});
render();save();

