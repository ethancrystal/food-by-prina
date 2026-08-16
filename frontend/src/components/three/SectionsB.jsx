import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Text, useTexture } from '@react-three/drei';
import { Station, Kicker, Frame, CountUp, DepthFade } from './Station';
import { Sparkle } from './Backdrop';
import { COLORS, FONTS, NUMBERS, CASES, TALKS, MANIFESTO, CONTACT } from '../../mock';

const setCursor = (on) => (document.body.style.cursor = on ? 'pointer' : 'auto');

function HoverGroup({ children, position, onClick, grow = 1.05 }) {
  const ref = useRef();
  const hovered = useRef(false);
  useFrame((_, dt) => {
    if (!ref.current) return;
    const t = hovered.current ? grow : 1;
    const s = ref.current.scale.x + (t - ref.current.scale.x) * Math.min(1, dt * 8);
    ref.current.scale.setScalar(s);
  });
  return (
    <group
      ref={ref}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick && onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        hovered.current = true;
        setCursor(true);
      }}
      onPointerOut={() => {
        hovered.current = false;
        setCursor(false);
      }}
    >
      {children}
    </group>
  );
}

// ------------------------------------------------------------------
// 05 — NUMBERS (stats scattered in depth — you fly through them)
// ------------------------------------------------------------------
export function Numbers() {
  return (
    <Station index={4} range={2.2}>
      <Kicker position={[0, 0.55, 9.2]}>{NUMBERS.title}</Kicker>
      <Text
        font={FONTS.body}
        fontSize={0.12}
        color={COLORS.ink}
        fillOpacity={0.55}
        anchorX="center"
        anchorY="middle"
        position={[0, 0.28, 9.2]}
      >
        {NUMBERS.sub}
      </Text>
      {NUMBERS.stats.map((s, i) => (
        <DepthFade key={i} position={[s.pos[0], s.pos[1], s.pos[2] - 2]} far={13} feather={5}>
          <CountUp station={4} value={s.n} prefix={s.prefix || ''} suffix={s.suffix || ''} fontSize={0.44} />
          <Text
            font={FONTS.thin}
            fontSize={0.105}
            letterSpacing={0.18}
            color={COLORS.ink}
            fillOpacity={0.55}
            anchorX="center"
            anchorY="middle"
            position={[0, -0.34, 0]}
          >
            {s.label.toUpperCase()}
          </Text>
        </DepthFade>
      ))}
    </Station>
  );
}

// ------------------------------------------------------------------
// 06 — CASE STUDIES (clickable cards → modal)
// ------------------------------------------------------------------
function CaseCard({ data, index, onOpen }) {
  return (
    <>
      <mesh>
        <planeGeometry args={[2.6, 1.62]} />
        <meshBasicMaterial color={'#171413'} transparent opacity={0.92} />
      </mesh>
      <Frame w={2.6} h={1.62} opacity={0.4} />
      <Text
        font={FONTS.black}
        fontSize={0.3}
        color={COLORS.ink}
        fillOpacity={0}
        strokeColor={COLORS.ink}
        strokeWidth={'1.8%'}
        strokeOpacity={0.65}
        anchorX="left"
        anchorY="middle"
        position={[-1.14, 0.5, 0.01]}
      >
        {`0${index + 1}`}
      </Text>
      {data.badge && (
        <Text
          font={FONTS.med}
          fontSize={0.07}
          letterSpacing={0.3}
          color={COLORS.ink}
          fillOpacity={0.6}
          anchorX="right"
          anchorY="middle"
          position={[1.14, 0.55, 0.01]}
        >
          {`[ ${data.badge.toUpperCase()} ]`}
        </Text>
      )}
      <Text
        font={FONTS.reg}
        fontSize={0.135}
        lineHeight={1.3}
        maxWidth={2.25}
        color={COLORS.ink}
        anchorX="left"
        anchorY="top"
        position={[-1.14, 0.22, 0.01]}
      >
        {data.title}
      </Text>
      <Text
        font={FONTS.body}
        fontSize={0.085}
        letterSpacing={0.08}
        color={COLORS.ink}
        fillOpacity={0.5}
        anchorX="left"
        anchorY="middle"
        position={[-1.14, -0.38, 0.01]}
      >
        {data.meta}
      </Text>
      <Text
        font={FONTS.med}
        fontSize={0.075}
        letterSpacing={0.28}
        color={COLORS.ink}
        fillOpacity={0.75}
        anchorX="left"
        anchorY="middle"
        position={[-1.14, -0.62, 0.01]}
      >
        OPEN CASE →
      </Text>
    </>
  );
}

export function Cases({ onOpen }) {
  const spots = [
    [-1.4, 0.35, 1],
    [1.4, -0.25, -2.5],
    [-1.4, -0.1, -6],
    [1.4, 0.3, -9.5],
  ];
  return (
    <Station index={5} range={2.2}>
      <Kicker position={[0, 1.35, 2.6]}>selected case studies</Kicker>
      {CASES.map((c, i) => (
        <HoverGroup key={i} position={spots[i]} onClick={() => onOpen(i)}>
          <CaseCard data={c} index={i} onOpen={onOpen} />
        </HoverGroup>
      ))}
    </Station>
  );
}

// ------------------------------------------------------------------
// 07 — TALKS (image cards → in-app YouTube player)
// ------------------------------------------------------------------
function TalkCard({ data }) {
  const tex = useTexture(data.img);
  tex.colorSpace = THREE.SRGBColorSpace;
  return (
    <>
      <mesh position={[0, -0.08, -0.005]}>
        <planeGeometry args={[2.3, 2.02]} />
        <meshBasicMaterial color={'#171413'} transparent opacity={0.92} />
      </mesh>
      <Frame w={2.3} h={2.02} opacity={0.4} position={[0, -0.08, 0]} />
      <mesh position={[0, 0.32, 0.01]}>
        <planeGeometry args={[2.06, 1.16]} />
        <meshBasicMaterial map={tex} transparent toneMapped={false} color={'#b9b6b3'} />
      </mesh>
      <Text
        font={FONTS.reg}
        fontSize={0.105}
        lineHeight={1.3}
        maxWidth={2.05}
        color={COLORS.ink}
        anchorX="left"
        anchorY="top"
        position={[-1.03, -0.42, 0.01]}
      >
        {data.title}
      </Text>
      <Text
        font={FONTS.body}
        fontSize={0.075}
        letterSpacing={0.1}
        color={COLORS.ink}
        fillOpacity={0.5}
        anchorX="left"
        anchorY="middle"
        position={[-1.03, -0.86, 0.01]}
      >
        {`${data.tags.join(' · ')}  —  ${data.meta}`}
      </Text>
      <Text
        font={FONTS.med}
        fontSize={0.07}
        letterSpacing={0.28}
        color={COLORS.ink}
        fillOpacity={0.75}
        anchorX="right"
        anchorY="middle"
        position={[1.03, -0.86, 0.01]}
      >
        WATCH ↗
      </Text>
    </>
  );
}

export function Talks({ onOpen }) {
  const spots = [
    [-1.3, 0.45, 1.5],
    [1.3, -0.35, -1],
    [-1.3, -0.3, -4.5],
    [1.3, 0.45, -7.5],
    [-1.3, 0.35, -11],
    [1.3, -0.35, -14],
  ];
  return (
    <Station index={6} range={2.2}>
      <Kicker position={[0, 1.12, 2.4]}>talks — stage & podcasts</Kicker>
      {TALKS.map((t, i) => (
        <HoverGroup key={i} position={spots[i]} onClick={() => onOpen({ id: t.video, start: t.start })}>
          <TalkCard data={t} />
        </HoverGroup>
      ))}
    </Station>
  );
}

// ------------------------------------------------------------------
// 08 — MANIFESTO (statements flying past in depth)
// ------------------------------------------------------------------
export function Manifesto() {
  const depths = [0.8, -3.4, -8];
  return (
    <Station index={7} range={2.1}>
      <Kicker position={[0, 1.15, 2.4]}>manifesto</Kicker>
      {MANIFESTO.map((m, i) => (
        <DepthFade key={i} position={[0, 0, depths[i]]} far={11.5} feather={5}>
          <Text
            font={FONTS.thin}
            fontSize={0.21}
            lineHeight={1.65}
            maxWidth={4.6}
            textAlign="center"
            color={COLORS.ink}
            fillOpacity={0.92}
            anchorX="center"
            anchorY="middle"
          >
            {m}
          </Text>
        </DepthFade>
      ))}
      <Sparkle position={[-2.2, 1, -1.5]} size={0.08} speed={0.4} opacity={0.5} />
      <Sparkle position={[2.3, -0.9, -5]} size={0.06} speed={-0.5} opacity={0.4} />
    </Station>
  );
}

// ------------------------------------------------------------------
// 09 — LET'S TALK
// ------------------------------------------------------------------
export function Contact() {
  const [words] = useState(() => CONTACT.title.split(' '));
  return (
    <Station index={8} range={1.4}>
      <Sparkle position={[2.5, 1.05, -0.6]} size={0.42} speed={0.15} opacity={0.16} />
      <Text
        font={FONTS.black}
        fontSize={0.78}
        letterSpacing={0.02}
        color={COLORS.ink}
        fillOpacity={0}
        strokeColor={COLORS.ink}
        strokeWidth={'1.5%'}
        anchorX="center"
        anchorY="middle"
        position={[0, 0.72, 0]}
      >
        {words[0]}
      </Text>
      <Text
        font={FONTS.black}
        fontSize={0.78}
        letterSpacing={0.02}
        color={COLORS.ink}
        anchorX="center"
        anchorY="middle"
        position={[0, -0.05, 0]}
      >
        {words[1]}
      </Text>
      <group
        onClick={() => (window.location.href = `mailto:${CONTACT.email}`)}
        onPointerOver={() => setCursor(true)}
        onPointerOut={() => setCursor(false)}
      >
        <Text
          font={FONTS.body}
          fontSize={0.17}
          letterSpacing={0.05}
          color={COLORS.ink}
          anchorX="center"
          anchorY="middle"
          position={[0, -0.72, 0]}
        >
          {CONTACT.email}
        </Text>
      </group>
      <Text
        font={FONTS.thin}
        fontSize={0.095}
        letterSpacing={0.3}
        color={COLORS.ink}
        fillOpacity={0.45}
        anchorX="center"
        anchorY="middle"
        position={[0, -1.02, 0]}
      >
        {CONTACT.note.toUpperCase()}
      </Text>
      <Text
        font={FONTS.thin}
        fontSize={0.075}
        letterSpacing={0.25}
        color={COLORS.ink}
        fillOpacity={0.3}
        anchorX="center"
        anchorY="middle"
        position={[0, -1.32, 0]}
      >
        © 2K26 — DESIGNED WHILE FLYING
      </Text>
    </Station>
  );
}
