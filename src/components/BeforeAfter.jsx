import { useEffect, useMemo, useRef, useState } from "react";

const VERT = `#version 300 es
in vec2 a;
out vec2 v;
void main(){ v = a * 0.5 + 0.5; v.y = 1.0 - v.y; gl_Position = vec4(a,0.0,1.0); }`;

const FRAG = `#version 300 es
precision highp float;
in vec2 v;
out vec4 o;
uniform sampler2D uBefore;
uniform sampler2D uAfter;
uniform vec2 uImg;
uniform float uPos;
uniform float uVel;
uniform float uTime;
uniform float uHover;
uniform float uCA;       // chromatic aberration multiplier (0..2)
uniform float uFringe;   // chromatic radius multiplier (0..2)
uniform float uRipple;   // ripple strength multiplier (0..2)

vec2 cover(vec2 uv){
  vec2 s = uImg;
  return (uv - 0.5) / s + 0.5;
}

void main(){
  float seam = uPos;
  float d = v.x - seam;
  float absD = abs(d);

  float wave = sin((absD * 60.0) - uTime * 6.0) * exp(-absD * 9.0);
  float ambient = sin(v.y * 22.0 + uTime * 1.3) * 0.5 + sin(v.x * 18.0 - uTime * 0.9) * 0.5;
  float disp = (wave * (0.025 + abs(uVel) * 0.18) + ambient * 0.0035 * uHover) * uRipple;

  vec2 offset = vec2(disp * 0.6, disp);
  vec2 uv = cover(v + offset);

  vec4 a = texture(uBefore, uv);
  vec4 b = texture(uAfter, uv);

  float edge = smoothstep(0.0, 0.004 + abs(uVel) * 0.04, d);
  vec4 col = mix(a, b, edge);

  float caR = (0.06 + uFringe * 0.05);
  float caAmount = (1.0 - smoothstep(0.0, caR, absD)) * (0.004 + abs(uVel) * 0.02) * uCA;
  if (caAmount > 0.0001) {
    vec2 uvR = cover(v + offset + vec2(caAmount, 0.0));
    vec2 uvB = cover(v + offset - vec2(caAmount, 0.0));
    vec4 rA = texture(uBefore, uvR); vec4 rB = texture(uAfter, uvR);
    vec4 bA = texture(uBefore, uvB); vec4 bB = texture(uAfter, uvB);
    col.r = mix(rA.r, rB.r, edge);
    col.b = mix(bA.b, bB.b, edge);
  }

  float glow = exp(-absD * 240.0) * (0.5 + abs(uVel) * 3.0) * uRipple;
  col.rgb += vec3(0.35, 0.55, 1.0) * glow * 0.6;

  o = vec4(col.rgb, 1.0);
}`;

function loadTexture(gl, src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      resolve({ tex, w: img.naturalWidth, h: img.naturalHeight });
    };
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(s));
    return null;
  }
  return s;
}

function detectWebGL2() {
  if (typeof window === "undefined") return false;
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2");
    if (!gl) return false;
    const s = gl.createShader(gl.VERTEX_SHADER);
    if (!s) return false;
    gl.deleteShader(s);
    return true;
  } catch {
    return false;
  }
}

function usePrefersReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(m.matches);
    const h = (e) => setR(e.matches);
    m.addEventListener?.("change", h);
    return () => m.removeEventListener?.("change", h);
  }, []);
  return r;
}

export function BeforeAfter({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  chromaticAberration = 1,
  fringeIntensity = 1,
  rippleStrength = 1,
  scrubSpeed = 1,
  autoPlay = false,
  showControls = true,
}) {
  const reduce = usePrefersReducedMotion();
  const supportsGL = useMemo(() => detectWebGL2(), []);
  const mode = reduce ? "reduced" : supportsGL ? "webgl" : "css";

  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const posRef = useRef(0.5);
  const velRef = useRef(0);
  const hoverRef = useRef(0);
  const draggingRef = useRef(false);

  const [pos, setPos] = useState(50);
  const [ca, setCA] = useState(chromaticAberration);
  const [fringe, setFringe] = useState(fringeIntensity);
  const [ripple, setRipple] = useState(rippleStrength);
  const [scrub, setScrub] = useState(scrubSpeed);
  const [auto, setAuto] = useState(autoPlay);
  const [panelOpen, setPanelOpen] = useState(false);
  const [glFailed, setGlFailed] = useState(false);

  const caRef = useRef(ca); caRef.current = ca;
  const fringeRef = useRef(fringe); fringeRef.current = fringe;
  const rippleRef = useRef(ripple); rippleRef.current = ripple;
  const scrubRef = useRef(scrub); scrubRef.current = scrub;
  const autoRef = useRef(auto); autoRef.current = auto;

  const [reducedShowingAfter, setReducedShowingAfter] = useState(true);

  useEffect(() => {
    if (mode !== "webgl") return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    let gl = null;
    let cleanup = () => {};
    let isCurrent = true;

    try {
      try {
        gl = canvas.getContext("webgl2", { antialias: true, premultipliedAlpha: false });
      } catch {
        gl = null;
      }
      if (!gl) { setGlFailed(true); return; }

      const onLost = (e) => { e.preventDefault(); setGlFailed(true); };
      canvas.addEventListener("webglcontextlost", onLost, false);

      const vs = compile(gl, gl.VERTEX_SHADER, VERT);
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
      if (!vs || !fs) { setGlFailed(true); return; }

      const program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
        setGlFailed(true);
        return;
      }
      gl.useProgram(program);

      const quad = new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]);
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(program, "a");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

      const u = {
        Before: gl.getUniformLocation(program, "uBefore"),
        After: gl.getUniformLocation(program, "uAfter"),
        Img: gl.getUniformLocation(program, "uImg"),
        Pos: gl.getUniformLocation(program, "uPos"),
        Vel: gl.getUniformLocation(program, "uVel"),
        Time: gl.getUniformLocation(program, "uTime"),
        Hover: gl.getUniformLocation(program, "uHover"),
        CA: gl.getUniformLocation(program, "uCA"),
        Fringe: gl.getUniformLocation(program, "uFringe"),
        Ripple: gl.getUniformLocation(program, "uRipple"),
      };

      let raf = 0;
      let running = true;
      let imgAspect = 1;
      let canvasAspect = 1;

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const r = wrap.getBoundingClientRect();
        canvas.width = Math.max(1, Math.floor(r.width * dpr));
        canvas.height = Math.max(1, Math.floor(r.height * dpr));
        gl.viewport(0, 0, canvas.width, canvas.height);
        canvasAspect = r.width / r.height;
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(wrap);

      Promise.all([loadTexture(gl, after), loadTexture(gl, before)])
        .then(([afterTex, beforeTex]) => {
          if (!isCurrent) return;
          gl.useProgram(program);
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, beforeTex.tex);
          gl.uniform1i(u.Before, 0);
          gl.activeTexture(gl.TEXTURE1);
          gl.bindTexture(gl.TEXTURE_2D, afterTex.tex);
          gl.uniform1i(u.After, 1);
          imgAspect = afterTex.w / afterTex.h;

          const start = performance.now();
          const tick = () => {
            if (!running || !isCurrent) return;
            const t = (performance.now() - start) / 1000;

            if (autoRef.current && !draggingRef.current) {
              const target = 0.5 + Math.sin(t * 0.6) * 0.42;
              const next = posRef.current + (target - posRef.current) * 0.04;
              velRef.current = (next - posRef.current) * 1.4 + velRef.current * 0.5;
              posRef.current = next;
              setPos(next * 100);
            }

            let sx = 1, sy = 1;
            if (canvasAspect > imgAspect) sy = imgAspect / canvasAspect;
            else sx = canvasAspect / imgAspect;

            gl.useProgram(program);
            gl.uniform2f(u.Img, sx, sy);
            gl.uniform1f(u.Pos, posRef.current);
            gl.uniform1f(u.Vel, velRef.current);
            gl.uniform1f(u.Time, t);
            gl.uniform1f(u.Hover, hoverRef.current);
            gl.uniform1f(u.CA, caRef.current);
            gl.uniform1f(u.Fringe, fringeRef.current);
            gl.uniform1f(u.Ripple, rippleRef.current);
            gl.drawArrays(gl.TRIANGLES, 0, 6);

            velRef.current *= 0.88;
            if (Math.abs(velRef.current) < 0.0005) velRef.current = 0;
            hoverRef.current += ((draggingRef.current ? 1 : (hoverRef.current > 0.001 ? 0.7 : 0)) - hoverRef.current) * 0.1;
            raf = requestAnimationFrame(tick);
          };
          tick();
        })
        .catch((err) => {
          if (!isCurrent) return;
          console.error("Failed to load textures:", err);
          setGlFailed(true);
        });

      cleanup = () => {
        isCurrent = false;
        running = false;
        cancelAnimationFrame(raf);
        ro.disconnect();
        canvas.removeEventListener("webglcontextlost", onLost);
      };
    } catch (err) {
      console.error("WebGL error inside useEffect:", err);
      setGlFailed(true);
    }

    return () => {
      cleanup();
    };
  }, [before, after, mode]);

  const update = (clientX) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const s = scrubRef.current;
    const next = posRef.current + (p - posRef.current) * Math.min(1, 0.35 * s + 0.2);
    velRef.current = (next - posRef.current) * 1.4 * s + velRef.current * 0.4;
    posRef.current = next;
    setPos(next * 100);
  };

  const interactive = mode !== "reduced";
  const effectiveMode = mode === "webgl" && glFailed ? "css" : mode;

  return (
    <div className="relative">
      <div
        ref={wrapRef}
        className={`relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-muted select-none touch-none ${
          interactive ? "cursor-ew-resize" : ""
        }`}
        onPointerDown={interactive ? (e) => {
          draggingRef.current = true;
          e.target.setPointerCapture(e.pointerId);
          update(e.clientX);
        } : undefined}
        onPointerMove={interactive ? (e) => { if (draggingRef.current) update(e.clientX); } : undefined}
        onPointerUp={interactive ? () => { draggingRef.current = false; } : undefined}
        onPointerLeave={interactive ? () => { draggingRef.current = false; } : undefined}
      >
        {effectiveMode === "webgl" && (
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full block" />
        )}

        {effectiveMode === "css" && (
          <>
            <img src={after} alt={afterLabel} loading="lazy" decoding="async"
                 className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
              <img src={before} alt={beforeLabel} loading="lazy" decoding="async"
                   className="absolute inset-0 h-full w-full object-cover"
                   style={{ width: `${(100 / Math.max(pos, 1)) * 100}%`, minWidth: "100%" }} />
            </div>
          </>
        )}

        {effectiveMode === "reduced" && (
          <>
            <img src={reducedShowingAfter ? after : before}
                 alt={reducedShowingAfter ? afterLabel : beforeLabel}
                 loading="lazy" decoding="async"
                 className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300" />
            <button
              type="button"
              onClick={() => setReducedShowingAfter((s) => !s)}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 rounded-full bg-ink/90 text-white text-xs uppercase tracking-[0.25em] px-5 py-2 font-semibold backdrop-blur"
              aria-label={`Show ${reducedShowingAfter ? beforeLabel : afterLabel}`}
            >
              Show {reducedShowingAfter ? beforeLabel : afterLabel}
            </button>
          </>
        )}

        <span className="absolute top-3 left-3 z-10 text-[10px] tracking-[0.3em] font-bold uppercase bg-ink/90 text-white px-2 py-1 rounded">{beforeLabel}</span>
        <span className="absolute top-3 right-3 z-10 text-[10px] tracking-[0.3em] font-bold uppercase bg-accent-blue text-white px-2 py-1 rounded">{afterLabel}</span>

        {effectiveMode !== "reduced" && (
          <div
            className="absolute top-0 bottom-0 w-px bg-white/80 shadow-[0_0_18px_2px_rgba(80,150,255,0.55)] pointer-events-none"
            style={{ left: `${pos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-11 w-11 rounded-full bg-white shadow-xl flex items-center justify-center text-ink ring-2 ring-accent-blue/40">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M8 6L2 12l6 6M16 6l6 6-6 6"/></svg>
            </div>
          </div>
        )}
      </div>

      {showControls && effectiveMode === "webgl" && (
        <div className="absolute right-3 top-14 z-30">
          <button
            type="button"
            onClick={() => setPanelOpen((v) => !v)}
            className="rounded-md bg-ink/85 text-white text-[10px] font-mono uppercase tracking-[0.25em] px-3 py-1.5 hover:bg-ink transition backdrop-blur"
            aria-expanded={panelOpen}
          >
            {panelOpen ? "Close FX" : "Tune FX"}
          </button>

          {panelOpen && (
            <div className="mt-2 w-64 rounded-lg border border-white/15 bg-ink/95 text-white p-4 space-y-3 backdrop-blur shadow-2xl">
              <Slider label="Chromatic aberration" value={ca} min={0} max={2} step={0.05} onChange={setCA} />
              <Slider label="Color fringe radius" value={fringe} min={0} max={2} step={0.05} onChange={setFringe} />
              <Slider label="Ripple strength" value={ripple} min={0} max={2} step={0.05} onChange={setRipple} />
              <Slider label="Scrub speed" value={scrub} min={0.3} max={2} step={0.05} onChange={setScrub} />
              <label className="flex items-center justify-between gap-3 pt-1">
                <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">Auto-play</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={auto}
                  onClick={() => setAuto((v) => !v)}
                  className={`relative inline-flex h-5 w-10 items-center rounded-full transition ${auto ? "bg-accent-blue" : "bg-white/20"}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${auto ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </label>
              <button
                type="button"
                onClick={() => { setCA(1); setFringe(1); setRipple(1); setScrub(1); setAuto(false); }}
                className="w-full text-[10px] font-mono uppercase tracking-[0.25em] text-white/60 hover:text-white pt-1"
              >
                Reset defaults
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Slider({
  label, value, min, max, step, onChange,
}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-white/70 mb-1">
        <span>{label}</span>
        <span className="font-mono text-white">{value.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-accent-blue"
      />
    </label>
  );
}
