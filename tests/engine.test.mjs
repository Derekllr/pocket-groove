import test from 'node:test';import assert from 'node:assert/strict';import {DrumEngine} from '../src/engine.mjs';
test('synthesis schedules every instrument, and closed hat chokes open hat through its gain AudioParam',()=>{
  const calls=[];const param=()=>({value:0,setValueAtTime(...a){calls.push(['set',...a]);},exponentialRampToValueAtTime(){},linearRampToValueAtTime(){},setTargetAtTime(...a){calls.push(['target',...a]);},cancelScheduledValues(...a){calls.push(['cancel',...a]);}});
  const node=()=>({connect(){},gain:param(),frequency:param(),threshold:param(),knee:param(),ratio:param(),start(){},stop(){}});
  const ctx={sampleRate:44100,currentTime:0,destination:{},createGain:node,createDynamicsCompressor:node,createOscillator:node,createBiquadFilter:node,createBufferSource:node,createBuffer:()=>({getChannelData:()=>new Float32Array(44100)})};
  const synth=new DrumEngine(ctx);for(const id of ['kick','snare','hat','open','tom','clap','click'])assert.doesNotThrow(()=>synth.hit(id,1,.9,.8));assert.doesNotThrow(()=>synth.hit('hat',1.1));assert.ok(calls.some(c=>c[0]==='cancel'&&c[1]===1.1));
});
