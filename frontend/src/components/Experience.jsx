import React, { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import Backdrop from './three/Backdrop';
import { Intro, Pitch, Decade, Story } from './three/SectionsA';
import { Numbers, Cases, Talks, Manifesto, Contact } from './three/SectionsB';
import Overlay, { Loader } from './Overlay';
import { CaseModal, VideoModal } from './Modals';
import { journey, curve, easedU, setTarget, jumpTo, emit, N } from '../journey';
import { COLORS } from '../mock';
import '../experience.css';

const lookTarget = new THREE.Vector3();
const tangent = new THREE.Vector3();

function CameraRig() {
  const sm = useRef({ x: 0, y: 0 });
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const diff = journey.target - journey.current;
    const maxV = 0.3 * dt;
    let step = diff * Math.min(1, dt * 4.2);
    step = Math.max(-maxV, Math.min(maxV, step));
    journey.current += step;
    journey.offset = journey.current;

    const u = easedU(journey.current);
    const cam = state.camera;
    curve.getPointAt(u, cam.position);
    if (u >= 0.977) {
      curve.getTangentAt(1, tangent);
      lookTarget.copy(cam.position).add(tangent.multiplyScalar(5));
    } else {
      curve.getPointAt(u + 0.02, lookTarget);
    }

    sm.current.x += (journey.mx - sm.current.x) * Math.min(1, dt * 3);
    sm.current.y += (journey.my - sm.current.y) * Math.min(1, dt * 3);
    cam.lookAt(lookTarget);
    cam.translateX(sm.current.x * 0.22);
    cam.translateY(-sm.current.y * 0.14);
    cam.rotation.y -= sm.current.x * 0.03;
    cam.rotation.x += sm.current.y * 0.02;

    const sec = Math.min(N - 1, Math.max(0, Math.round(journey.current * (N - 1))));
    if (sec !== journey.section) {
      journey.section = sec;
      emit();
    }
  });
  return null;
}

function useFlightControls() {
  useEffect(() => {
    const wheel = (e) => {
      if (!journey.ready || journey.locked) return;
      let d = e.deltaY;
      if (e.deltaMode === 1) d *= 16;
      setTarget(journey.target + d / (22 * window.innerHeight));
    };
    let lastY = 0;
    const touchStart = (e) => {
      lastY = e.touches[0].clientY;
    };
    const touchMove = (e) => {
      if (!journey.ready || journey.locked) return;
      const y = e.touches[0].clientY;
      setTarget(journey.target + ((lastY - y) * 2.4) / (22 * window.innerHeight));
      lastY = y;
    };
    const keys = (e) => {
      if (!journey.ready || journey.locked) return;
      const s = journey.section;
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) jumpTo(Math.min(N - 1, s + 1));
      else if (['ArrowUp', 'PageUp'].includes(e.key)) jumpTo(Math.max(0, s - 1));
      else if (e.key === 'Home') jumpTo(0);
      else if (e.key === 'End') jumpTo(N - 1);
    };
    const mouse = (e) => {
      journey.mx = (e.clientX / window.innerWidth) * 2 - 1;
      journey.my = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('wheel', wheel, { passive: true });
    window.addEventListener('touchstart', touchStart, { passive: true });
    window.addEventListener('touchmove', touchMove, { passive: true });
    window.addEventListener('keydown', keys);
    window.addEventListener('pointermove', mouse);
    return () => {
      window.removeEventListener('wheel', wheel);
      window.removeEventListener('touchstart', touchStart);
      window.removeEventListener('touchmove', touchMove);
      window.removeEventListener('keydown', keys);
      window.removeEventListener('pointermove', mouse);
    };
  }, []);
}

export default function Experience() {
  const [caseIndex, setCaseIndex] = useState(null);
  const [video, setVideo] = useState(null);
  useFlightControls();

  useEffect(() => {
    journey.locked = caseIndex !== null || video !== null;
  }, [caseIndex, video]);

  return (
    <div className="experience">
      <Canvas
        flat
        dpr={[1, 2]}
        camera={{ fov: 50, near: 0.1, far: 420, position: [0, 0, 0] }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={[COLORS.bg]} />
        <CameraRig />
        <Suspense fallback={null}>
          <Backdrop />
          <Intro />
          <Pitch />
          <Decade />
          <Story />
          <Numbers />
          <Cases onOpen={setCaseIndex} />
          <Talks onOpen={setVideo} />
          <Manifesto />
          <Contact />
          <Preload all />
        </Suspense>
      </Canvas>
      <Overlay />
      <div className="vignette" />
      <div className="grain" />
      {caseIndex !== null && (
        <CaseModal index={caseIndex} onClose={() => setCaseIndex(null)} onOpenVideo={setVideo} />
      )}
      {video && <VideoModal video={video} onClose={() => setVideo(null)} />}
      <Loader />
    </div>
  );
}
