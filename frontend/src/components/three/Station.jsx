import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Line } from '@react-three/drei';
import { journey, N, stationTransform } from '../../journey';
import { COLORS, FONTS } from '../../mock';

// ------------------------------------------------------------------
// Station — wraps a section's content, placed on the flight path and
// faded by proximity of the camera (presence).
// ------------------------------------------------------------------
export function Station({ index, children, range = 1.9, power = 1.6 }) {
  const ref = useRef();
  const { position, quaternion } = useMemo(() => stationTransform(index), [index]);
  const { viewport } = useThree();
  const scale = Math.min(1, Math.max(0.36, viewport.aspect / 1.55));

  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    const dist = Math.abs(journey.current * (N - 1) - index);
    const raw = Math.max(0, 1 - dist / range);
    const p = Math.pow(raw, power);
    g.visible = p > 0.012;
    if (!g.visible) return;
    if (g.userData.p === undefined || Math.abs(p - g.userData.p) > 0.004) {
      g.userData.p = p;
      g.traverse((o) => {
        const m = o.material;
        if (!m || o.userData.noFade) return;
        if (o.userData.base === undefined) o.userData.base = m.opacity !== undefined ? m.opacity : 1;
        m.transparent = true;
        m.opacity = o.userData.base * (0.1 + 0.9 * p);
      });
    }
  });

  return (
    <group ref={ref} position={position} quaternion={quaternion} scale={scale}>
      {children}
    </group>
  );
}

// ------------------------------------------------------------------
// DepthFade — content materializes as the camera approaches and
// dissolves right before you fly through it.
// ------------------------------------------------------------------
export function DepthFade({ children, position = [0, 0, 0], near = 2.2, far = 13, feather = 4.5 }) {
  const ref = useRef();
  const wp = useMemo(() => new THREE.Vector3(), []);
  useEffect(() => {
    if (ref.current) ref.current.traverse((o) => (o.userData.noFade = true));
  }, []);
  useFrame((state) => {
    const g = ref.current;
    if (!g) return;
    g.getWorldPosition(wp);
    const dist = state.camera.position.distanceTo(wp);
    const fIn = 1 - THREE.MathUtils.smoothstep(dist, far - feather, far);
    const fOut = THREE.MathUtils.smoothstep(dist, near - 1.4, near);
    const f = fIn * fOut;
    g.visible = f > 0.012;
    if (!g.visible) return;
    if (g.userData.f === undefined || Math.abs(f - g.userData.f) > 0.004) {
      g.userData.f = f;
      g.traverse((o) => {
        const m = o.material;
        if (!m) return;
        o.userData.noFade = true;
        if (o.userData.dfBase === undefined) o.userData.dfBase = m.opacity !== undefined ? m.opacity : 1;
        m.transparent = true;
        m.opacity = o.userData.dfBase * f;
      });
    }
  });
  return (
    <group ref={ref} position={position}>
      {children}
    </group>
  );
}

// Small uppercase kicker label, e.g. "ELEVATOR PITCH"
export function Kicker({ children, position = [0, 0, 0], size = 0.085, opacity = 0.45 }) {
  return (
    <Text
      font={FONTS.thin}
      fontSize={size}
      letterSpacing={0.42}
      color={COLORS.ink}
      fillOpacity={opacity}
      anchorX="center"
      anchorY="middle"
      position={position}
    >
      {String(children).toUpperCase()}
    </Text>
  );
}

// Thin rectangular line frame
export function Frame({ w, h, color = COLORS.ink, opacity = 0.35, position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const pts = useMemo(
    () => [
      [-w / 2, -h / 2, 0],
      [w / 2, -h / 2, 0],
      [w / 2, h / 2, 0],
      [-w / 2, h / 2, 0],
      [-w / 2, -h / 2, 0],
    ],
    [w, h]
  );
  return (
    <Line points={pts} color={color} transparent opacity={opacity} lineWidth={1} position={position} rotation={rotation} />
  );
}

// Animated count-up number used by the "numbers" station
export function CountUp({ station, value, prefix = '', suffix = '', fontSize = 0.42, position = [0, 0, 0] }) {
  const ref = useRef();
  const v = useRef(0);
  useFrame((_, dt) => {
    const node = ref.current;
    if (!node) return;
    const dist = Math.abs(journey.current * (N - 1) - station);
    const target = dist < 1.2 ? value : 0;
    v.current += (target - v.current) * Math.min(1, dt * 2.4);
    if (Math.abs(target - v.current) < 0.35) v.current = target;
    const txt = `${prefix}${Math.round(v.current)}${suffix}`;
    if (node.text !== txt) {
      node.text = txt;
      node.sync();
    }
  });
  return (
    <Text
      ref={ref}
      font={FONTS.bold}
      fontSize={fontSize}
      color={COLORS.ink}
      anchorX="center"
      anchorY="middle"
      position={position}
    >
      {`${prefix}0${suffix}`}
    </Text>
  );
}
