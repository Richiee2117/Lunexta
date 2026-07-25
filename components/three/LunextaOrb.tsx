"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";

const NOISE_GLSL = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`;

const LunextaOrbMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uMouseInfluence: 0,
    uScrollIntensity: 1,
    uClickPulse: 0,
    uColorInk: new THREE.Color("#0a0a0b"),
    uColorA: new THREE.Color("#7c3aed"),
    uColorB: new THREE.Color("#22d3ee"),
  },
  /* vertex */
  `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uMouseInfluence;
    uniform float uScrollIntensity;
    uniform float uClickPulse;

    varying vec3 vViewPosition;
    varying vec3 vNormal;
    varying float vDisplacement;

    ${NOISE_GLSL}

    float displace(vec3 n) {
      float baseNoise = snoise(n * 1.6 + uTime * 0.22);
      float mouseDist = length(n.xy - uMouse * 0.9);
      float mouseBump = smoothstep(0.9, 0.0, mouseDist) * uMouseInfluence;
      // A second, faster-oscillating noise layer that only kicks in during
      // the click pulse — reads as the surface convulsing/boiling rather
      // than just growing a single smooth bump. uClickPulse is a uniform
      // (same value for every vertex), so this branch is free on the GPU —
      // skipping it avoids three extra snoise() evaluations per vertex
      // (this function runs 3x per vertex for the normal reconstruction)
      // during the vast majority of the time the orb is just idling.
      float churn = 0.0;
      if (uClickPulse > 0.001) {
        churn = snoise(n * 4.0 - uTime * 1.4) * uClickPulse;
      }
      return (baseNoise * 0.16 + mouseBump * 0.24 + uClickPulse * 0.35 + churn * 0.22) * uScrollIntensity;
    }

    void main() {
      vec3 n = normalize(normal);
      float disp = displace(n);
      vDisplacement = disp;
      vec3 displaced = position + n * disp;

      // rebuild a true analytic normal for the displaced surface by finite
      // differencing two tangent directions — screen-space derivatives are
      // unstable on a dense, constantly-displaced mesh like this one.
      float e = 0.015;
      vec3 up = abs(n.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
      vec3 t1 = normalize(cross(up, n));
      vec3 t2 = normalize(cross(n, t1));

      vec3 n1 = normalize(n + t1 * e);
      vec3 n2 = normalize(n + t2 * e);
      vec3 p1 = position + t1 * e + n1 * displace(n1);
      vec3 p2 = position + t2 * e + n2 * displace(n2);

      vec3 newNormal = normalize(cross(p1 - displaced, p2 - displaced));
      if (dot(newNormal, n) < 0.0) newNormal = -newNormal;
      vNormal = normalize(normalMatrix * newNormal);

      vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  /* fragment */
  `
    uniform vec3 uColorInk;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform float uClickPulse;

    varying vec3 vViewPosition;
    varying vec3 vNormal;
    varying float vDisplacement;

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);

      float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.5);

      vec3 lightDir = normalize(vec3(0.45, 0.65, 0.8));
      float diffuse = max(dot(normal, lightDir), 0.0);

      vec3 base = mix(uColorInk, uColorA, diffuse * 0.8 + 0.12);
      vec3 color = mix(base, uColorB, clamp(vDisplacement * 3.2 + fresnel * 0.55, 0.0, 1.0));
      color += fresnel * 0.18;
      // Flash hot toward the accent as the click pulse peaks, like the
      // surface is charging up right before it dissolves.
      color = mix(color, uColorB, uClickPulse * 0.5);
      color += uClickPulse * 0.12;

      gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ LunextaOrbMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    lunextaOrbMaterial: ThreeElements["meshStandardMaterial"];
  }
}

function OrbMesh({
  mouse,
  scrollIntensityRef,
  scaleRef,
  clickPulseRef,
  activationScaleRef,
}: {
  mouse: React.RefObject<{ x: number; y: number; active: number }>;
  scrollIntensityRef: React.RefObject<number>;
  scaleRef: React.RefObject<number>;
  clickPulseRef: React.RefObject<number>;
  activationScaleRef: React.RefObject<number>;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const smoothMouse = useRef({ x: 0, y: 0, active: 0 });
  const smoothScale = useRef(1);

  useFrame((_, rawDelta) => {
    if (!materialRef.current || !meshRef.current) return;
    // Clamp so a paused/backgrounded canvas doesn't fast-forward the
    // rotation and noise time in one big jump when it resumes.
    const delta = Math.min(rawDelta, 1 / 30);

    smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * Math.min(delta * 3, 1);
    smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * Math.min(delta * 3, 1);
    smoothMouse.current.active +=
      (mouse.current.active - smoothMouse.current.active) * Math.min(delta * 2, 1);
    smoothScale.current +=
      ((scaleRef.current ?? 1) - smoothScale.current) * Math.min(delta * 6, 1);

    // Decay the click pulse back to rest — fast enough to read as a single
    // reaction, slow enough to actually see the surface convulse.
    clickPulseRef.current = Math.max(0, clickPulseRef.current - delta * 2.6);

    const u = materialRef.current.uniforms;
    u.uTime.value += delta;
    (u.uMouse.value as THREE.Vector2).set(smoothMouse.current.x, smoothMouse.current.y);
    u.uMouseInfluence.value = smoothMouse.current.active;
    u.uScrollIntensity.value = scrollIntensityRef.current ?? 1;
    u.uClickPulse.value = clickPulseRef.current;

    // Scaling the mesh itself (rather than the DOM/canvas via CSS) keeps
    // this fully inside Three.js's own coordinate system — no dependence
    // on how the browser happens to lay out a CSS-transformed canvas. A
    // brief bulge rides on top while the click pulse is active, like the
    // orb is drawing a breath before it collapses into the interface.
    const bulge = 1 + Math.sin(Math.min(clickPulseRef.current, 1) * Math.PI) * 0.12;
    const activation = activationScaleRef.current ?? 1;
    meshRef.current.scale.setScalar(Math.max(smoothScale.current * bulge * activation, 0.001));
    meshRef.current.rotation.y +=
      delta * (0.08 + (1 - smoothScale.current) * 0.1 + clickPulseRef.current * 0.6);
    meshRef.current.rotation.x = Math.sin(Date.now() * 0.00015) * 0.08;
  });

  return (
    <mesh ref={meshRef} position={[0.5, 0, 0]}>
      <sphereGeometry args={[1.4, 80, 80]} />
      <lunextaOrbMaterial ref={materialRef} />
    </mesh>
  );
}

export default function LunextaOrb({
  scrollIntensity,
  orbScale,
  activationScale,
  onActivate,
  paused = false,
}: {
  scrollIntensity?: MotionValue<number>;
  orbScale?: MotionValue<number>;
  activationScale?: MotionValue<number>;
  onActivate?: () => void;
  paused?: boolean;
}) {
  const mouse = useRef({ x: 0, y: 0, active: 0 });
  const scrollIntensityRef = useRef(1);
  const scaleRef = useRef(1);
  const clickPulseRef = useRef(0);
  const activationScaleRef = useRef(1);
  // Keeps the WebGL context alive at all times (no remount jump when
  // scrolling back), but stops spending GPU time on it once it has
  // shrunk to the point of being visually irrelevant.
  const [rendering, setRendering] = useState(true);

  useEffect(() => {
    if (!scrollIntensity) return;
    return scrollIntensity.on("change", (v) => {
      scrollIntensityRef.current = 1 - v;
      setRendering((prev) => {
        if (prev && v > 0.97) return false;
        if (!prev && v < 0.94) return true;
        return prev;
      });
    });
  }, [scrollIntensity]);

  useEffect(() => {
    if (!orbScale) return;
    scaleRef.current = orbScale.get();
    return orbScale.on("change", (v) => {
      scaleRef.current = v;
    });
  }, [orbScale]);

  useEffect(() => {
    if (!activationScale) return;
    activationScaleRef.current = activationScale.get();
    return activationScale.on("change", (v) => {
      activationScaleRef.current = v;
    });
  }, [activationScale]);

  return (
    <div
      className="absolute inset-0"
      data-cursor="button"
      onPointerMove={(e) => {
        const { innerWidth, innerHeight } = window;
        mouse.current = {
          x: (e.clientX / innerWidth) * 2 - 1,
          y: -((e.clientY / innerHeight) * 2 - 1),
          active: 1,
        };
      }}
      onPointerLeave={() => {
        mouse.current = { ...mouse.current, active: 0 };
      }}
      onClick={() => {
        clickPulseRef.current = 1;
        onActivate?.();
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.6], fov: 42 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        frameloop={rendering && !paused ? "always" : "never"}
      >
        <OrbMesh
          mouse={mouse}
          scrollIntensityRef={scrollIntensityRef}
          scaleRef={scaleRef}
          clickPulseRef={clickPulseRef}
          activationScaleRef={activationScaleRef}
        />
      </Canvas>
    </div>
  );
}
