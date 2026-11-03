export const TRACKS = [
  {id:'kick',name:'底鼓',en:'KICK',key:'A',color:'#ee9d58'},
  {id:'snare',name:'军鼓',en:'SNARE',key:'S',color:'#e7ce75'},
  {id:'hat',name:'闭镲',en:'CLOSED HAT',key:'D',color:'#a7c7a5'},
  {id:'open',name:'开镲',en:'OPEN HAT',key:'F',color:'#83bdc2'},
  {id:'tom',name:'嗵鼓',en:'LOW TOM',key:'G',color:'#a8a8d9'},
  {id:'clap',name:'拍手',en:'CLAP',key:'H',color:'#d6a4be'}
];
export const PRESETS = {
  pocket:{name:'Pocket Rock',genre:'直拍 · 从这里开始',bpm:100,swing:0,notes:[[0,8,10],[4,12],[0,2,4,6,8,10,12,14],[15],[],[]]},
  lofi:{name:'Sunday Lo-fi',genre:'慢一点 · 摇摆一点',bpm:78,swing:25,notes:[[0,7,10],[4,12],[0,2,3,6,8,10,11,14],[15],[],[12]]},
  house:{name:'Night Drive',genre:'四拍底鼓 · House',bpm:124,swing:0,notes:[[0,4,8,12],[4,12],[0,2,4,6,8,10,12,14],[2,6,10,14],[],[4,12]]},
  funk:{name:'Side Street',genre:'切分节奏 · Funk',bpm:108,swing:12,notes:[[0,3,6,10],[4,7,12,15],[0,2,4,6,8,10,12,14],[11],[14],[]]}
};
export function fromPreset(id='pocket') {
  const p=PRESETS[id];
  return {version:1,name:p.name,bpm:p.bpm,swing:p.swing,volume:75,metronome:false,tracks:TRACKS.map((t,r)=>({id:t.id,volume:80,mute:false,solo:false,steps:Array.from({length:16},(_,s)=>p.notes[r].includes(s)?(r===2&&s%4!==0?1:2):0)}))};
}
export function validatePattern(x) {
  if(!x||x.version!==1||typeof x.name!=='string'||x.name.length>80) throw Error('文件格式不正确');
  for(const [k,min,max] of [['bpm',40,220],['swing',0,50],['volume',0,100]]) if(!Number.isFinite(x[k])||x[k]<min||x[k]>max) throw Error('参数超出范围：'+k);
  if(typeof x.metronome!=='boolean'||!Array.isArray(x.tracks)||x.tracks.length!==6) throw Error('音轨格式不正确');
  x.tracks.forEach((t,i)=>{if(t.id!==TRACKS[i].id||!Number.isFinite(t.volume)||t.volume<0||t.volume>100||typeof t.mute!=='boolean'||typeof t.solo!=='boolean'||!Array.isArray(t.steps)||t.steps.length!==16||t.steps.some(v=>![0,1,2].includes(v))) throw Error('音轨内容不正确');});
  // Reconstruct accepted fields rather than retaining arbitrary imported properties.
  return {version:1,name:x.name,bpm:x.bpm,swing:x.swing,volume:x.volume,metronome:x.metronome,tracks:x.tracks.map(t=>({id:t.id,volume:t.volume,mute:t.mute,solo:t.solo,steps:[...t.steps]}))};
}
export function stepDuration(bpm,swing,step){ return 60/bpm/4*(1+(step%2===0?1:-1)*swing/100); }
export function isAudible(tracks,index){return !tracks[index].mute&&(!tracks.some(t=>t.solo)||tracks[index].solo);}
export function wavBuffer(audio){
  const a=audio.getChannelData(0),b=new ArrayBuffer(44+a.length*2),v=new DataView(b);
  function str(o,s){for(let i=0;i<s.length;i++)v.setUint8(o+i,s.charCodeAt(i));}
  str(0,'RIFF');v.setUint32(4,36+a.length*2,true);str(8,'WAVE');str(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);v.setUint32(24,audio.sampleRate,true);v.setUint32(28,audio.sampleRate*2,true);v.setUint16(32,2,true);v.setUint16(34,16,true);str(36,'data');v.setUint32(40,a.length*2,true);
  for(let i=0;i<a.length;i++){const s=Math.max(-1,Math.min(1,a[i]));v.setInt16(44+i*2,s*(s<0?32768:32767),true);}return b;
}
