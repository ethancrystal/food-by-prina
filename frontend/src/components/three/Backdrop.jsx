import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { COLORS, FONTS } from '../../mock';
import { journey } from '../../journey';

// ------------------------------------------------------------------
// Starfield — 7000 twinkling points spread across the flight corridor
// ------------------------------------------------------------------
const starVert = `
  attribute float aSize;
  attribute float aPhase;
  attribute float aTwinkle;
  attribute float aBright;
  uniform float uTime;
  uniform float uScale;
  varying float vAlpha;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float pulse = 0.5 + 0.5 * sin(uTime * (0.6 + 2.4 * aPhase) + aPhase * 6.2831);
    vAlpha = aBright * (1.0 - aTwinkle + aTwinkle * pulse);
    float size = aSize * (0.85 + 0.3 * pulse);
    gl_PointSize = max(size * uScale / -mv.z, 1.0);
    gl_Position = projectionMatrix * mv;
  }
`;
const starFrag = `
  varying float vAlpha;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv) * 2.0;
    float core = smoothstep(0.5, 0.0, d);
    float halo = smoothstep(1.0, 0.15, d) * 0.3;
    float a = (core + halo) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(vec3(0.96, 0.95, 0.94), a);
  }
`;

export function Starfield({ count = 7000 }) {
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const size = new Float32Array(count);
    const phase = new Float32Array(count);
    const twinkle = new Float32Array(count);
    const bright = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 84;
      const z = 16 - Math.random() * 310;
      const y =
        Math.random() < 0.4
          ? x * 0.14 + Math.sin(z * 0.045) * 3 + (Math.random() + Math.random() + Math.random() - 1.5) * 2.4
          : (Math.random() - 0.5) * 52;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      size[i] = 0.045 + Math.pow(Math.random(), 3.2) * 0.5;
      phase[i] = Math.random();
      twinkle[i] = 0.1 + Math.random() * 0.45;
      bright[i] = 0.25 + Math.random() * 0.75;
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
    g.setAttribute('aPhase', new THREE.BufferAttribute(phase, 1));
    g.setAttribute('aTwinkle', new THREE.BufferAttribute(twinkle, 1));
    g.setAttribute('aBright', new THREE.BufferAttribute(bright, 1));
    return g;
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uScale: { value: 600 } },
        vertexShader: starVert,
        fragmentShader: starFrag,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uScale.value = state.size.height * state.viewport.dpr * 0.96;
  });

  return <points geometry={geometry} material={material} />;
}

// ------------------------------------------------------------------
// Soft glow orbs — big blurred light blobs floating near the path
// ------------------------------------------------------------------
const glowFrag = `
  uniform float uOpacity;
  varying vec2 vUv;
  void main() {
    float d = length(vUv - 0.5) * 2.0;
    float a = pow(smoothstep(1.0, 0.0, d), 2.4) * uOpacity;
    if (a < 0.004) discard;
    gl_FragColor = vec4(vec3(0.95, 0.94, 0.93), a);
  }
`;
const glowVert = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

function Glow({ position, size = 7, opacity = 0.4 }) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uOpacity: { value: opacity } },
        vertexShader: glowVert,
        fragmentShader: glowFrag,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [opacity]
  );
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) ref.current.quaternion.copy(state.camera.quaternion);
  });
  return (
    <mesh ref={ref} position={position} material={material}>
      <planeGeometry args={[size, size]} />
    </mesh>
  );
}

// ------------------------------------------------------------------
// Sparkle — 4-point star shape (the ✦ used across the site)
// ------------------------------------------------------------------
const sparkleShape = (() => {
  const s = new THREE.Shape();
  for (let t = 0; t < 8; t++) {
    const r = t % 2 === 0 ? 1 : 0.16;
    const a = (t / 8) * Math.PI * 2 - Math.PI / 2;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (t === 0) s.moveTo(x, y);
    else s.lineTo(x, y);
  }
  s.closePath();
  return s;
})();

export function Sparkle({ position, size = 0.14, speed = 0.4, opacity = 1 }) {
  const ref = useRef();
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z += dt * speed;
  });
  return (
    <mesh ref={ref} position={position} scale={size}>
      <shapeGeometry args={[sparkleShape]} />
      <meshBasicMaterial color={COLORS.ink} transparent opacity={opacity} depthWrite={false} />
    </mesh>
  );
}

// Sparkles scattered along the whole corridor
export function FieldSparkles({ count = 30 }) {
  const items = useMemo(() => {
    const rng = (a, b) => a + Math.random() * (b - a);
    return Array.from({ length: count }, () => ({
      pos: [rng(-8, 8), rng(-5, 5), rng(-292, 4)],
      size: rng(0.05, 0.16),
      speed: rng(0.15, 0.7) * (Math.random() > 0.5 ? 1 : -1),
      opacity: rng(0.25, 0.8),
    }));
  }, [count]);
  return (
    <group>
      {items.map((s, i) => (
        <Sparkle key={i} position={s.pos} size={s.size} speed={s.speed} opacity={s.opacity} />
      ))}
    </group>
  );
}

// ------------------------------------------------------------------
// Ribbon — the flying "DUNGA ✦ DUNGA ✦" outline text along a curve
// ------------------------------------------------------------------
export function Ribbon({
  points,
  word = 'DUNGA',
  count = 12,
  size = 0.55,
  speed = 0.006,
  opacity = 0.55,
  fadeIn = null,
  fadeOut = null,
}) {
  const rCurve = useMemo(
    () => new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)), false, 'catmullrom', 0.6),
    [points]
  );
  const rootRef = useRef();
  const wordRefs = useRef([]);
  const sparkRefs = useRef([]);
  const tmp = useMemo(
    () => ({
      x: new THREE.Vector3(),
      y: new THREE.Vector3(),
      z: new THREE.Vector3(),
      g: new THREE.Vector3(),
      m: new THREE.Matrix4(),
    }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const cam = state.camera.position;
    let f = 1;
    const cur = journey.current;
    if (fadeIn) f *= THREE.MathUtils.smoothstep(cur, fadeIn[0], fadeIn[1]);
    if (fadeOut) f *= 1 - THREE.MathUtils.smoothstep(cur, fadeOut[0], fadeOut[1]);
    if (rootRef.current) rootRef.current.visible = f > 0.01;
    if (f <= 0.01) return;
    const place = (obj, u, baseOp) => {
      if (!obj) return;
      const uu = ((u % 1) + 1) % 1;
      rCurve.getPointAt(uu, obj.position);
      rCurve.getTangentAt(uu, tmp.x);
      tmp.g.copy(cam).sub(obj.position).normalize();
      tmp.y.crossVectors(tmp.g, tmp.x).normalize();
      tmp.z.crossVectors(tmp.x, tmp.y).normalize();
      tmp.m.makeBasis(tmp.x, tmp.y, tmp.z);
      obj.quaternion.setFromRotationMatrix(tmp.m);
      if (obj.material) obj.material.opacity = f * baseOp;
    };
    for (let k = 0; k < count; k++) {
      place(wordRefs.current[k], k / count + t * speed, 1);
      place(sparkRefs.current[k], (k + 0.5) / count + t * speed, opacity * 0.9);
    }
  });

  return (
    <group ref={rootRef}>
      {Array.from({ length: count }, (_, k) => (
        <Text
          key={`w${k}`}
          ref={(el) => (wordRefs.current[k] = el)}
          font={FONTS.black}
          fontSize={size}
          letterSpacing={0.06}
          color={COLORS.ink}
          fillOpacity={0.03}
          strokeColor={COLORS.ink}
          strokeWidth={'1.6%'}
          strokeOpacity={opacity}
          anchorX="center"
          anchorY="middle"
        >
          {word}
        </Text>
      ))}
      {Array.from({ length: count }, (_, k) => (
        <mesh key={`s${k}`} ref={(el) => (sparkRefs.current[k] = el)} scale={size * 0.22}>
          <shapeGeometry args={[sparkleShape]} />
          <meshBasicMaterial color={COLORS.ink} transparent opacity={opacity * 0.9} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

// ------------------------------------------------------------------
// Backdrop assembly
// ------------------------------------------------------------------
export default function Backdrop() {
  return (
    <group>
      <Starfield />
      <FieldSparkles />
      <Glow position={[-3.4, 0.8, -9]} size={7} opacity={0.35} />
      <Glow position={[1.4, -0.9, -46]} size={6} opacity={0.3} />
      <Glow position={[-2.8, 1, -98]} size={8} opacity={0.28} />
      <Glow position={[2.4, -1, -152]} size={7} opacity={0.3} />
      <Glow position={[-1.6, 1.4, -216]} size={8} opacity={0.26} />
      <Glow position={[0.4, 0.3, -281]} size={9} opacity={0.34} />
      <Ribbon
        fadeIn={[0.035, 0.075]}
        fadeOut={[0.2, 0.25]}
        points={[
          [-5, 2.5, -15],
          [-6, 0, -20],
          [-4, -2.5, -24],
          [0, -3, -28],
          [4, -2, -32],
          [5, 0.5, -35],
          [2, 2.2, -38],
        ]}
      />
      <Ribbon
        fadeIn={[0.895, 0.93]}
        points={[
          [4.5, 2, -242],
          [5.5, -0.5, -248],
          [3, -2.5, -254],
          [-1, -2.8, -259],
          [-4.5, -1.5, -264],
          [-5, 1, -269],
        ]}
        count={10}
      />
    </group>
  );
}
