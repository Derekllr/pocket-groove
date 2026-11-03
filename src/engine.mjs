export class DrumEngine {
  constructor(ctx){this.ctx=ctx;this.master=ctx.createGain();this.master.gain.value=.55;const comp=ctx.createDynamicsCompressor();comp.threshold.value=-12;comp.knee.value=18;comp.ratio.value=5;this.master.connect(comp);comp.connect(ctx.destination);this.noise=ctx.createBuffer(1,ctx.sampleRate,ctx.sampleRate);const d=this.noise.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;this.openHats=[];}
  volume(value){this.master.gain.setTargetAtTime(value/100*.7,this.ctx.currentTime,.015);}
  hit(id,time,velocity=.8,vol=.8){
    const c=this.ctx,g=c.createGain();g.gain.value=velocity*vol;g.connect(this.master);
    const tone=(freq,end,duration,level,type='sine')=>{const o=c.createOscillator(),e=c.createGain();o.type=type;o.frequency.setValueAtTime(freq,time);o.frequency.exponentialRampToValueAtTime(end,time+duration);e.gain.setValueAtTime(.001,time);e.gain.linearRampToValueAtTime(level,time+.003);e.gain.exponentialRampToValueAtTime(.001,time+duration);o.connect(e);e.connect(g);o.start(time);o.stop(time+duration+.02);};
    const noise=(duration,frequency,level,type='highpass')=>{const s=c.createBufferSource(),f=c.createBiquadFilter(),e=c.createGain();s.buffer=this.noise;f.type=type;f.frequency.value=frequency;e.gain.setValueAtTime(level,time);e.gain.exponentialRampToValueAtTime(.001,time+duration);s.connect(f);f.connect(e);e.connect(g);s.start(time);s.stop(time+duration+.01);return e;};
    if(id==='kick')tone(155,40,.34,1.25);
    if(id==='snare'){tone(185,105,.15,.45,'triangle');noise(.19,1300,.8);}
    if(id==='hat'){for(const h of this.openHats){h.gain.cancelScheduledValues(time);h.gain.setTargetAtTime(.001,time,.009);}this.openHats=[];noise(.055,7800,.4);}
    if(id==='open'){this.openHats=this.openHats.filter(h=>h._end>time);const h=noise(.38,6900,.35);h._end=time+.4;this.openHats.push(h);}
    if(id==='tom')tone(170,65,.42,.95);
    if(id==='clap'){const e=noise(.22,1100,.65,'bandpass');e.gain.setValueAtTime(.15,time+.012);e.gain.setValueAtTime(.7,time+.02);e.gain.setValueAtTime(.15,time+.03);e.gain.setValueAtTime(.65,time+.04);e.gain.exponentialRampToValueAtTime(.001,time+.22);}
    if(id==='click')tone(velocity>0.8?1400:1000,900,.035,.35,'triangle');
  }
}

