// Plain data + a pure translator, shared by the UI and coverage tests.
export const COPY = {
  '步进鼓机':'STEP SEQUENCER','工程操作':'Project controls','操作说明':'Controls',
  '节奏库':'PATTERNS','选择预设后可编辑':'Choose a pattern to edit.','练习':'PRACTICE',
  '每 4 次循环加速。将鼓轨静音后，可跟随其余声部练习。':'Increase tempo every 4 loops. Mute a track to play along.',
  '当前节奏':'CURRENT PATTERN','步进编辑器':'Step sequencer','主音量':'Master',
  '鼓组':'VOICE','轻击模式':'Ghost notes','打击垫':'Drum pads',
  '点击或使用键盘 A–H 试音':'Click a pad or use A S D F G H.',
  '打击垫不写入编曲':'Pads do not record to the grid.',
  '变奏':'Variation','镲片 / 加花':'Hats / fills','播放 / 停止':'Play / stop','轻击':'Ghost hit',
  '也可以开启“轻击模式”后直接点击格子。点击鼓组名称可以试音；打击垫不会自动录入编曲。':'Enable Ghost notes to enter soft hits without holding Shift. Click a voice name to audition it. Pads do not record to the grid.',
  '/ 口袋鼓房':'/ DRUM STUDIO',
  '本地创作 · 自动保存':'LOCAL FIRST · AUTOSAVED',
  '把脑海里的节奏，':'That beat in your head.', '敲出来。':'Make it yours.',
  '点亮格子，找到你的 groove。今晚的第一首，从这一拍开始。':'Light up the steps. Find your groove. Your next track starts here.',
  '节奏工作台':'Drum sequencer','节奏名称':'Pattern name','已就绪':'Ready',
  '↶ 撤销':'↶ Undo','撤销上次编曲修改':'Undo the last arrangement edit','清空':'Clear',
  '开始播放':'Play','停止播放':'Stop','播放节奏':'Play pattern',
  '速度':'Tempo','速度 BPM':'Tempo BPM','Tap 定速':'Tap tempo','摇摆':'Swing','节拍器':'Metronome','音量':'Volume',
  'DRUM / 鼓组':'DRUM / VOICE','等待第一拍':'Ready on the one',
  '点击 开 / 关':'Click to toggle','Shift + 点击 轻击':'Shift + click for ghost notes','空格 播放':'Space to play',
  '先借一个节奏，再变成你的。':'Start with a groove. Make it your own.',
  '直拍 · 从这里开始':'Straight ahead · Start here','慢一点 · 摇摆一点':'Slow down · Lean into swing',
  '四拍底鼓 · House':'Four on the floor · House','切分节奏 · Funk':'Syncopated · Funk',
  '✧ 来一点变化':'✧ Switch it up','保留主拍，重写镲片与加花':'Keep the pulse. Remix the hats and fills.',
  '慢慢来，也会很快。':'Start slow. Get there.',
  '将某条鼓轨静音，跟着其余声部练习。开启渐速后，每 4 次循环提高速度。':'Mute a part and play it yourself. Turn on tempo ramp to speed up every four loops.',
  '每次增加':'Increase by','目标速度':'Target BPM','渐速练习':'Tempo ramp','关闭':'Off','已开启':'Enabled','进行中':'Ramping','已达目标':'Target reached',
  '手指也想打个鼓。':'Let your fingers jam.',
  '点击试音，或按键盘 A S D F G H。':'Click a pad, or use A S D F G H.',
  '打击垫用于即兴，不写入格子。':'Jam freely. Pads do not record to the grid.',
  '这个节奏，值得留下。':'A groove worth keeping.',
  '保存可编辑工程，或导出 4 小节 WAV，带走你的声音。':'Save your editable project, or take home a four-bar WAV.',
  '导入工程':'Import','保存工程 ↓':'Save ↓','导出音频 ↗':'Export WAV ↗','正在渲染…':'Rendering…',
  '怎么玩？':'How to play','关闭 ×':'Close ×','不用懂乐理，也能开始。':'No theory needed. Just start.',
  '从一个预设开始，点亮或熄灭格子。一行是一种鼓，一列是一个十六分音符。四组格子对应四拍。':'Start with a preset and toggle a few steps. Each row is a drum; each column is a sixteenth note. Four groups make four beats.',
  '普通点击切换重击与关闭；Shift + 点击切换轻击。轨道 M 是静音，S 是独奏，可同时独奏多个声部。音轨旁的滑杆控制该声部音量。':'Click to toggle a full hit. Shift + click toggles a ghost note. M mutes a track; S solos it. Multiple solos are allowed. Each track has its own volume slider.',
  '摇摆让每对十六分音符变成长短交替。Tap 定速连续敲击至少三次，可跟着脑中的节奏定速度。':'Swing alternates longer and shorter sixteenth notes. Tap tempo at least three times to set the pace of the beat in your head.',
  '渐速练习每 4 次完整循环加速，直到目标速度。导出音频按当前速度、摇摆、静音与独奏设置输出 4 小节，不包含节拍器和渐速。':'Tempo ramp increases the pace every four full loops, up to your target. Audio export renders four bars using the current tempo, swing and mix. It excludes the metronome and tempo ramp.',
  '音色为浏览器实时合成，无外部音频下载。首次播放需要点击按钮；切到后台时会暂停，以免浏览器节流导致节奏错乱。工程自动保存在当前浏览器，也可以导出 JSON 备份。':'Sounds are synthesized in your browser, with no sample downloads. Click Play to enable audio. Playback pauses when the page is hidden to prevent timing glitches. Projects autosave in this browser; export JSON for a portable backup.',
  '底鼓':'Kick','军鼓':'Snare','闭镲':'Closed hat','开镲':'Open hat','嗵鼓':'Low tom','拍手':'Clap',
  '已保存在本机':'Saved on this device','请导出工程备份':'Export a project backup',
  '未能读取上次工程，已载入默认节奏':'Could not restore your project. Loaded the default groove.',
  '当前浏览器不支持 Web Audio':'This browser does not support Web Audio.',
  '声音尚未启用，请再点一次播放':'Audio is not enabled yet. Click Play again.',
  '播放已暂停，请重新开始':'Playback paused. Press Play to restart.',
  '格子已清空 · 可撤销':'Grid cleared · Undo is available','已撤销':'Edit undone',
  '新的镲片与加花 · 可撤销':'Fresh hats and fills · Undo is available',
  '目标速度不高于当前速度，将保持当前速度':'The target is at or below the current tempo. The tempo will stay as it is.',
  '工程已导出':'Project exported','工程已导入':'Project imported',
  '文件过大，请选择鼓房导出的 JSON 工程':'File too large. Choose a Pocket Groove JSON project.',
  'JSON 文件不完整':'The JSON file is incomplete.',
  '已导出 4 小节 WAV（含尾音）':'Exported four bars of WAV audio, including the release tail.',
  '切到后台，节奏已暂停':'Playback paused while the page is in the background.',
  '文件格式不正确':'Invalid project format','音轨格式不正确':'Invalid track format','音轨内容不正确':'Invalid track data',
  '无法读取工程，请选择有效的鼓房 JSON 文件':'Could not read the project. Choose a valid Pocket Groove JSON file.',
  '语言已切换为中文':'Language changed to Chinese','已切换为英语':'Language changed to English'
};
const REVERSE = new Map(Object.entries(COPY).map(([zh,en])=>[en,zh]));
const VOICES = { '底鼓':'Kick','军鼓':'Snare','闭镲':'Closed hat','开镲':'Open hat','嗵鼓':'Low tom','拍手':'Clap' };
export function translate(text,locale='en') {
  const raw=String(text),s=raw.trim(); if(!s)return raw;
  let out=locale==='en'?COPY[s]:REVERSE.get(s);
  if(out===undefined&&locale==='en'){
    let m;
    if((m=s.match(/^第\s*(\d+)\s*拍$/)))out=`Beat ${m[1]}`;
    else if((m=s.match(/^已载入 (.+) · 可撤销$/)))out=`Loaded ${m[1]} · Undo is available`;
    else if((m=s.match(/^继续敲击，再来 (\d+) 次$/)))out=`Keep tapping · ${m[1]} more`;
    else if((m=s.match(/^已设为 (\d+) BPM$/)))out=`Tempo set to ${m[1]} BPM`;
    else if((m=s.match(/^音频导出失败：(.*)$/)))out=`Audio export failed: ${translate(m[1],'en')}`;
    else if((m=s.match(/^参数超出范围：(.*)$/)))out=`Parameter out of range: ${m[1]}`;
    else for(const [zh,en] of Object.entries(VOICES)){
      if(s===`试听${zh}`){out=`Preview ${en}`;break;}
      if(s===`${zh}静音`){out=`Mute ${en}`;break;}
      if(s===`${zh}独奏`){out=`Solo ${en}`;break;}
      if(s===`${zh}音量`){out=`${en} volume`;break;}
      const match=s.match(new RegExp(`^${zh} 第(\\d+)拍 第(\\d+)格 (关闭|轻击|重击)$`));
      if(match){out=`${en}, beat ${match[1]}, step ${match[2]}, ${{关闭:'off',轻击:'ghost',重击:'full'}[match[3]]}`;break;}
    }
  }
  if(out===undefined&&locale==='zh'){
    let m;
    if((m=s.match(/^Beat (\d+)$/)))out=`第 ${m[1]} 拍`;
    else if((m=s.match(/^Loaded (.+) · Undo is available$/)))out=`已载入 ${m[1]} · 可撤销`;
    else if((m=s.match(/^Keep tapping · (\d+) more$/)))out=`继续敲击，再来 ${m[1]} 次`;
    else if((m=s.match(/^Tempo set to (\d+) BPM$/)))out=`已设为 ${m[1]} BPM`;
    else for(const [zh,en] of Object.entries(VOICES)){
      if(s===`Preview ${en}`){out=`试听${zh}`;break;}
      if(s===`Mute ${en}`){out=`${zh}静音`;break;}
      if(s===`Solo ${en}`){out=`${zh}独奏`;break;}
      if(s===`${en} volume`){out=`${zh}音量`;break;}
      const match=s.match(new RegExp(`^${en}, beat (\\d+), step (\\d+), (off|ghost|full)$`));
      if(match){out=`${zh} 第${match[1]}拍 第${match[2]}格 ${{off:'关闭',ghost:'轻击',full:'重击'}[match[3]]}`;break;}
    }
  }
  return out===undefined?raw:raw.replace(s,out);
}

