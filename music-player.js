/* ── Costa del Tech · record sleeve player ─────────────────────────
   A record sleeve in the sunset gradient (the same as the record label) in the
   bottom-left corner, shown from the third block on. Big "Play music" + play icon. Click → the record
   slides out of the sleeve and spins; its label is a moving sunset gradient.
   Hover → the record peeks out a little.

   Music: until we get a licensed track, "Momentum" — an uplifting melodic-house
   loop that builds up — is generated live in the browser (Web Audio). Nothing to download, no licensing issue. To use a real track instead,
   set TRACK_URL below to an mp3 — the player switches to it automatically.

   Usage: <script src="music-player.js" data-show-from="#events"></script> */
(function () {
  const TRACK_URL = '';                       // e.g. 'audio/costa-del-tech.mp3'
  const script = document.currentScript;
  const SHOW_FROM = (script && script.dataset.showFrom) || '#events';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── styles ── */
  const css = `
  .cdt-player{position:fixed;left:clamp(14px,2vw,28px);bottom:clamp(14px,2vw,28px);z-index:40;width:212px;height:124px;padding:0;border:0;background:none;cursor:pointer;
    font:500 9.5px/1.2 'Geist Mono',ui-monospace,monospace;text-transform:uppercase;letter-spacing:.02em;color:#fff;
    transform:translateY(calc(100% + 40px));opacity:0;transition:transform .7s cubic-bezier(.2,.9,.25,1.1),opacity .4s;pointer-events:none}
  .cdt-player.show{transform:none;opacity:1;pointer-events:auto}
  .cdt-player:focus-visible{outline:2px solid #9CCBFF;outline-offset:4px;border-radius:6px}
  .cdt-sleeve{position:absolute;left:0;top:0;width:124px;height:124px;z-index:2;border-radius:5px;padding:13px;
    background:linear-gradient(160deg,#FF9E7A,#FFD36E 25%,#9CCBFF 50%,#B79CFF 75%,#FF9E7A);background-size:220% 220%;animation:cdt-glow 7s ease-in-out infinite alternate;text-shadow:0 1px 0 rgba(0,0,0,.08);
    display:flex;flex-direction:column;justify-content:space-between;text-align:left;box-shadow:6px 10px 26px rgba(11,23,48,.32)}
    .cdt-cta{display:flex;flex-direction:column;align-items:flex-start;justify-content:space-between;height:100%;font-size:19px;line-height:1.02;letter-spacing:.01em}
  .cdt-cta .cdt-word{white-space:pre-line}
  .cdt-ico{width:17px;height:17px;flex:none}
  .cdt-ico .p2{display:none}.cdt-player.on .cdt-ico .p1{display:none}.cdt-player.on .cdt-ico .p2{display:inline}
  .cdt-bars{position:absolute;right:13px;top:15px;display:flex;align-items:flex-end;gap:2px;height:11px;opacity:0;transition:opacity .3s}
  .cdt-player.on .cdt-bars{opacity:1}
  .cdt-bars i{width:2px;height:3px;background:#fff;border-radius:1px;transition:height .08s}
  .cdt-rec{position:absolute;left:7px;top:7px;width:110px;height:110px;border-radius:50%;
    background:repeating-radial-gradient(circle,#15171c 0 1.2px,#262a31 1.2px 2.4px);box-shadow:0 3px 8px rgba(0,0,0,.35);
    transition:left .9s cubic-bezier(.3,.9,.3,1)}
  .cdt-rec::after{content:"";position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 20deg,transparent 0 12%,rgba(255,255,255,.14) 16%,transparent 22% 62%,rgba(255,255,255,.1) 66%,transparent 72%)}
  .cdt-player:hover .cdt-rec{left:28px}
  .cdt-player.on .cdt-rec{left:96px}
  .cdt-label{position:absolute;left:50%;top:50%;width:50px;height:50px;margin:-25px 0 0 -25px;border-radius:50%;display:grid;place-items:center;background:#1F3FA8}
  .cdt-label svg{width:30px;height:auto;fill:#fff;margin-top:-1px}
  /* gentle shimmer of the sleeve gradient, to draw the eye */
  @keyframes cdt-glow{0%{background-position:0% 0%}100%{background-position:100% 100%}}
  
  .cdt-spin{animation:cdt-spin 1.1s linear infinite;animation-play-state:paused}
  .cdt-player.on .cdt-spin{animation-play-state:running}
  @keyframes cdt-spin{to{transform:rotate(360deg)}}
  @media (max-width:600px){.cdt-player{scale:.7;transform-origin:0 100%}}   /* smaller on phones so it covers less text */
  @media (prefers-reduced-motion:reduce){.cdt-spin,.cdt-sleeve{animation:none}.cdt-rec,.cdt-player{transition:none}}`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* ── markup ── */
  const btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'cdt-player'; btn.setAttribute('aria-pressed', 'false'); btn.setAttribute('aria-label', 'Play music');
  btn.innerHTML = `
    <span class="cdt-rec cdt-spin" aria-hidden="true"><span class="cdt-label"><svg viewBox="-120 -836 3354 2465"><path d="M351.0 -712.0Q483.0 -712.0 573.0 -641.5Q663.0 -571.0 689.0 -450.0H478.0Q459.0 -490.0 425.5 -511.0Q392.0 -532.0 348.0 -532.0Q280.0 -532.0 239.5 -483.5Q199.0 -435.0 199.0 -354.0Q199.0 -272.0 239.5 -223.5Q280.0 -175.0 348.0 -175.0Q392.0 -175.0 425.5 -196.0Q459.0 -217.0 478.0 -257.0H689.0Q663.0 -136.0 573.0 -65.5Q483.0 5.0 351.0 5.0Q247.0 5.0 167.0 -40.5Q87.0 -86.0 43.5 -167.5Q0.0 -249.0 0.0 -354.0Q0.0 -458.0 43.5 -539.5Q87.0 -621.0 167.0 -666.5Q247.0 -712.0 351.0 -712.0ZM665.5 -355.0Q665.5 -459.0 714.0 -541.5Q762.5 -624.0 845.5 -670.0Q928.5 -716.0 1027.5 -716.0Q1127.5 -716.0 1210.0 -670.0Q1292.5 -624.0 1340.5 -541.5Q1388.5 -459.0 1388.5 -355.0Q1388.5 -251.0 1340.5 -168.5Q1292.5 -86.0 1209.5 -39.5Q1126.5 7.0 1027.5 7.0Q928.5 7.0 845.5 -39.5Q762.5 -86.0 714.0 -168.5Q665.5 -251.0 665.5 -355.0ZM1189.5 -355.0Q1189.5 -439.0 1146.0 -487.5Q1102.5 -536.0 1027.5 -536.0Q951.5 -536.0 908.5 -487.5Q865.5 -439.0 865.5 -355.0Q865.5 -272.0 908.5 -223.5Q951.5 -175.0 1027.5 -175.0Q1102.5 -175.0 1146.0 -224.0Q1189.5 -273.0 1189.5 -355.0ZM1363.0 -219.0H1572.0Q1575.0 -182.0 1594.0 -165.0Q1613.0 -148.0 1643.0 -148.0Q1670.0 -148.0 1687.5 -161.5Q1705.0 -175.0 1705.0 -199.0Q1705.0 -230.0 1676.0 -247.0Q1647.0 -264.0 1582.0 -285.0Q1513.0 -308.0 1470.5 -329.5Q1428.0 -351.0 1396.5 -392.5Q1365.0 -434.0 1365.0 -501.0Q1365.0 -569.0 1399.0 -617.5Q1433.0 -666.0 1493.0 -691.0Q1553.0 -716.0 1629.0 -716.0Q1752.0 -716.0 1825.5 -658.5Q1899.0 -601.0 1904.0 -497.0H1691.0Q1690.0 -529.0 1671.5 -545.0Q1653.0 -561.0 1624.0 -561.0Q1602.0 -561.0 1588.0 -548.0Q1574.0 -535.0 1574.0 -511.0Q1574.0 -491.0 1589.5 -476.5Q1605.0 -462.0 1628.0 -451.5Q1651.0 -441.0 1696.0 -425.0Q1763.0 -402.0 1806.5 -379.5Q1850.0 -357.0 1881.5 -316.5Q1913.0 -276.0 1913.0 -214.0Q1913.0 -151.0 1881.5 -101.0Q1850.0 -51.0 1790.5 -22.0Q1731.0 7.0 1650.0 7.0Q1527.0 7.0 1448.0 -51.5Q1369.0 -110.0 1363.0 -219.0ZM2442.5 -705.0V-549.0H2254.5V0.0H2058.5V-549.0H1872.5V-705.0ZM2869.0 -115.0H2619.0L2581.0 0.0H2375.0L2632.0 -705.0H2858.0L3114.0 0.0H2907.0ZM2820.0 -265.0 2744.0 -493.0 2669.0 -265.0ZM1447.5 399.0Q1447.5 501.0 1402.0 581.0Q1356.5 661.0 1273.0 706.5Q1189.5 752.0 1079.5 752.0H800.5V47.0H1079.5Q1190.5 47.0 1274.0 91.5Q1357.5 136.0 1402.5 216.0Q1447.5 296.0 1447.5 399.0ZM1248.5 399.0Q1248.5 312.0 1199.5 264.5Q1150.5 217.0 1064.5 217.0H996.5V579.0H1064.5Q1150.5 579.0 1199.5 532.0Q1248.5 485.0 1248.5 399.0ZM1639.0 204.0V319.0H1864.0V468.0H1639.0V595.0H1894.0V752.0H1443.0V47.0H1894.0V204.0ZM2094.5 602.0H2313.5V752.0H1898.5V47.0H2094.5ZM936.75 799.0V955.0H748.75V1504.0H552.75V955.0H366.75V799.0ZM1113.25 956.0V1071.0H1338.25V1220.0H1113.25V1347.0H1368.25V1504.0H917.25V799.0H1368.25V956.0ZM1699.75 792.0Q1831.75 792.0 1921.75 862.5Q2011.75 933.0 2037.75 1054.0H1826.75Q1807.75 1014.0 1774.25 993.0Q1740.75 972.0 1696.75 972.0Q1628.75 972.0 1588.25 1020.5Q1547.75 1069.0 1547.75 1150.0Q1547.75 1232.0 1588.25 1280.5Q1628.75 1329.0 1696.75 1329.0Q1740.75 1329.0 1774.25 1308.0Q1807.75 1287.0 1826.75 1247.0H2037.75Q2011.75 1368.0 1921.75 1438.5Q1831.75 1509.0 1699.75 1509.0Q1595.75 1509.0 1515.75 1463.5Q1435.75 1418.0 1392.25 1336.5Q1348.75 1255.0 1348.75 1150.0Q1348.75 1046.0 1392.25 964.5Q1435.75 883.0 1515.75 837.5Q1595.75 792.0 1699.75 792.0ZM2669.25 799.0V1504.0H2473.25V1221.0H2234.25V1504.0H2038.25V799.0H2234.25V1064.0H2473.25V799.0Z"/></svg></span></span>
    <span class="cdt-sleeve">
      <span class="cdt-bars" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
      <span class="cdt-cta"><svg class="cdt-ico" viewBox="0 0 12 12" aria-hidden="true"><path class="p1" d="M3 1.5v9l7.5-4.5z" fill="currentColor"/><g class="p2" fill="currentColor"><rect x="2" y="1.5" width="3" height="9"/><rect x="7" y="1.5" width="3" height="9"/></g></svg><span class="cdt-word">Play
music</span></span>
    </span>`;
  document.body.appendChild(btn);
  const word = btn.querySelector('.cdt-word'), bars = [...btn.querySelectorAll('.cdt-bars i')];

  /* ── show from the third block on; hide again when the last block (data-hide-at) comes in ── */
  const anchor = document.querySelector(SHOW_FROM);
  const hideAt = script && script.dataset.hideAt ? document.querySelector(script.dataset.hideAt) : null;
  const place = () => {
    const top = anchor ? anchor.getBoundingClientRect().top : 0;
    const end = hideAt ? hideAt.getBoundingClientRect().top < innerHeight * .75 : false;   // music keeps playing; only the sleeve hides
    btn.classList.toggle('show', top < innerHeight * .75 && !end);
  };
  addEventListener('scroll', place, { passive: true }); addEventListener('resize', place); place();

  /* ── audio: "Momentum" — melodic house, 122 BPM, builds up ──
     Loop 1: rolling bass, wide string pads, kick. Loop 2 (+~8 s): open hats, claps, arpeggio.
     Loop 3: the emotional lead. A rising sweep leads into each new part, a soft cymbal opens it. */
  let ctx, master, padBus, analyser, data, fine, fdata, playing = false, timer = 0, nextT = 0, step = 0, audioEl;
  const SONG = {
    bpm: 122,
    chords: [[52, 55, 59, 64], [52, 55, 60, 64], [50, 55, 59, 62], [50, 54, 57, 62]],   // Em – C – G – D
    roots: [40, 36, 43, 38],
    bass: '.RRR.RRR.RRR.RRR',
    drums: { kick: ['x...x...x...x...', 0], open: ['..x...x...x...x.', 1], clap: ['....x.......x...', 1] },
    lead: [[[0, 71, 6], [6, 74, 2], [8, 76, 8]], [[0, 72, 6], [6, 71, 2], [8, 67, 8]], [[0, 74, 6], [6, 76, 2], [8, 79, 8]], [[0, 78, 8], [8, 74, 8]]]
  };
  const SPB = 60 / SONG.bpm / 4;                          // sixteenth notes, 16 per bar, 4 bars per loop
  const midi = n => 440 * Math.pow(2, (n - 69) / 12);
  function setup() {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain(); master.gain.value = 0;
    const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 3;
    analyser = ctx.createAnalyser(); analyser.fftSize = 64; analyser.smoothingTimeConstant = .6; data = new Uint8Array(analyser.frequencyBinCount);
    master.connect(comp); comp.connect(analyser); analyser.connect(ctx.destination);
    fine = ctx.createAnalyser(); fine.fftSize = 512; fine.smoothingTimeConstant = .55; fdata = new Uint8Array(fine.frequencyBinCount); comp.connect(fine);   // detailed spectrum for the glue dots
    padBus = ctx.createGain(); padBus.connect(master);   // pads & arp duck on every kick ("pump")
    if (TRACK_URL) { audioEl = new Audio(TRACK_URL); audioEl.loop = true; audioEl.crossOrigin = 'anonymous'; ctx.createMediaElementSource(audioEl).connect(master); }
  }
  const noiseBuf = sec => { const b = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * sec), ctx.sampleRate), d = b.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; return b; };
  function tone(f, t, dur, type, vol, cut, bus, opt = {}) {
    const out = ctx.createGain(), flt = ctx.createBiquadFilter(); flt.type = 'lowpass'; flt.frequency.value = cut; flt.connect(out); out.connect(bus || master);
    const dets = type === 'strings' ? [0, 9, -9] : [0, 7], oscs = dets.map(d => { const o = ctx.createOscillator(); o.type = type === 'strings' ? 'sawtooth' : type; o.frequency.value = f; o.detune.value = d; o.connect(flt); o.start(t); o.stop(t + dur + .1); return o; });
    if (opt.vib) { const l = ctx.createOscillator(), lg = ctx.createGain(); l.frequency.value = 5; lg.gain.value = 8; l.connect(lg); oscs.forEach(o => lg.connect(o.detune)); l.start(t); l.stop(t + dur + .1); }
    const a = opt.attack || .02, sus = type === 'strings' ? .8 : .3;
    out.gain.setValueAtTime(0, t); out.gain.linearRampToValueAtTime(vol, t + a);
    out.gain.exponentialRampToValueAtTime(Math.max(vol * sus, .0002), t + Math.max(a + .01, dur * .5)); out.gain.exponentialRampToValueAtTime(.0001, t + dur);
  }
  function noise(t, { type = 'bandpass', freq = 1600, q = .9, v = .2, dur = .18, flams = [0] }) {
    const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain(); s.buffer = noiseBuf(dur + .05); f.type = type; f.frequency.value = freq; f.Q.value = q;
    g.gain.setValueAtTime(0, t); flams.forEach(o => { g.gain.setValueAtTime(v, t + o); g.gain.exponentialRampToValueAtTime(v * .25, t + o + .012); });
    g.gain.exponentialRampToValueAtTime(.001, t + dur); s.connect(f); f.connect(g); g.connect(master); s.start(t);
  }
  const DRUM = {
    kick: t => { const o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(46, t + .12);
      g.gain.setValueAtTime(.52, t); g.gain.exponentialRampToValueAtTime(.001, t + .32); o.connect(g); g.connect(master); o.start(t); o.stop(t + .34);
      padBus.gain.setValueAtTime(.4, t); padBus.gain.linearRampToValueAtTime(1, t + 60 / SONG.bpm * .8); },
    clap: t => noise(t, { v: .22, flams: [0, .012, .024] }),
    open: t => noise(t, { type: 'highpass', freq: 7000, v: .075, dur: .14 })
  };
  function riser(t, len) {
    const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain(); s.buffer = noiseBuf(len + .1); f.type = 'bandpass'; f.Q.value = 1.2;
    f.frequency.setValueAtTime(400, t); f.frequency.exponentialRampToValueAtTime(7000, t + len); g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.09, t + len * .95); g.gain.linearRampToValueAtTime(0, t + len);
    s.connect(f); f.connect(g); g.connect(master); s.start(t); s.stop(t + len + .05);
  }
  function schedule() {
    while (nextT < ctx.currentTime + .2) {
      const loop = Math.floor(step / 64), bar = Math.floor(step / 16) % 4, e = step % 16, t = nextT, ch = SONG.chords[bar];
      for (const k in SONG.drums) { const [pat, from] = SONG.drums[k]; if (loop >= from && pat[e] === 'x') DRUM[k](t); }
      if (SONG.bass[e] === 'R') tone(midi(SONG.roots[bar]), t, SPB * .8, 'sawtooth', .13, 450);
      if (e === 0) ch.forEach(n => tone(midi(n), t, SPB * 16.5, 'strings', .03, 1700, padBus, { attack: .5 }));
      if (loop >= 1) tone(midi(ch[e % ch.length] + 12), t, SPB * .9, 'square', .016, 2400, padBus);
      if (loop >= 2) SONG.lead[bar].forEach(([s, n, l]) => { if (s === e) tone(midi(n), t, SPB * l, 'sawtooth', .026, 2600, master, { vib: true }); });
      if (bar === 3 && e === 0 && loop < 2) riser(t, SPB * 16);
      if (bar === 0 && e === 0 && loop > 0 && loop < 3) noise(t, { type: 'highpass', freq: 5000, q: .5, v: .07, dur: 1.6 });
      nextT += SPB; step++;
    }
  }
  function meter() {
    if (!playing) { bars.forEach(b => b.style.height = '3px'); return; }
    analyser.getByteFrequencyData(data);
    bars.forEach((b, i) => { const v = data[2 + i * 3] / 255; b.style.height = (3 + v * 8).toFixed(1) + 'px'; });
    requestAnimationFrame(meter);
  }
  function play() {
    if (!ctx) setup();
    ctx.resume(); playing = true;
    if (audioEl) audioEl.play(); else { step = 0; nextT = ctx.currentTime + .5; clearInterval(timer); timer = setInterval(schedule, 40); }   // starts from the intro, after the record slides out
    master.gain.cancelScheduledValues(ctx.currentTime); master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(.8, ctx.currentTime + 1.4);
    dispatchEvent(new CustomEvent('cdt-audio', { detail: 'player' }));   // let the video mute itself
    btn.classList.add('on'); btn.setAttribute('aria-pressed', 'true'); btn.setAttribute('aria-label', 'Mute music'); word.textContent = 'Music\non';
    meter();
  }
  function stop() {
    playing = false;
    master.gain.cancelScheduledValues(ctx.currentTime); master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + .6);
    setTimeout(() => { if (!playing) { clearInterval(timer); if (audioEl) audioEl.pause(); } }, 650);
    btn.classList.remove('on'); btn.setAttribute('aria-pressed', 'false'); btn.setAttribute('aria-label', 'Play music'); word.textContent = 'Play\nmusic';
  }
  // other scripts (the glue dots) read the live spectrum: { bins: 0–255 per bin, hz: bin width }, or null when the music is off
  window.cdtSpectrum = () => { if (!playing || !fine) return null; fine.getByteFrequencyData(fdata); return { bins: fdata, hz: ctx.sampleRate / fine.fftSize }; };
  btn.addEventListener('click', () => (playing ? stop() : play()));
  addEventListener('cdt-audio', e => { if (e.detail !== 'player' && playing) stop(); });   // video sound turned on
  document.addEventListener('visibilitychange', () => { if (document.hidden && playing) stop(); });
})();
