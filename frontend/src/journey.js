import * as THREE from 'three';
import { PATH } from './mock';

// ------------------------------------------------------------------
// The journey: a single mutable store driving the camera flight.
// offset/current/target are normalized [0..1] across the whole path.
// ------------------------------------------------------------------

export const N = PATH.length; // 9 stations

export const curve = new THREE.CatmullRomCurve3(
  PATH.map((p) => new THREE.Vector3(...p)),
  false,
  'catmullrom',
  0.5
);

export const journey = {
  target: 0,
  current: 0,
  offset: 0,
  section: 0,
  ready: false,
  locked: false,
  mx: 0,
  my: 0,
  listeners: new Set(),
};

export const setTarget = (v) => {
  journey.target = Math.min(1, Math.max(0, v));
};

export const jumpTo = (i) => setTarget(i / (N - 1));

export const subscribe = (fn) => {
  journey.listeners.add(fn);
  return () => journey.listeners.delete(fn);
};

export const emit = () => journey.listeners.forEach((f) => f(journey));

// Eased progress: subtle per-segment ease so the camera settles at stations
export const easedU = (p) => {
  const seg = Math.min(N - 1 - 1e-6, Math.max(0, p * (N - 1)));
  const i = Math.floor(seg);
  const t = seg - i;
  const s = t * t * (3 - 2 * t);
  const te = t + (s - t) * 0.65;
  return (i + te) / (N - 1);
};

const UP = new THREE.Vector3(0, 1, 0);

// Where a station's content lives + its orientation (facing the arriving camera)
export function stationTransform(index) {
  const u = index / (N - 1);
  const stop = curve.getPointAt(u);
  let pos;
  if (u >= 1) {
    const tan = curve.getTangentAt(1);
    pos = stop.clone().add(tan.multiplyScalar(6));
  } else {
    pos = curve.getPointAt(Math.min(1, u + 6 / 272));
  }
  const m = new THREE.Matrix4();
  m.lookAt(stop, pos, UP); // +Z of content points back toward the camera stop
  const quaternion = new THREE.Quaternion().setFromRotationMatrix(m);
  return { position: pos, quaternion };
}
