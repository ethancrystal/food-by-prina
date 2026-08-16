import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Text, useTexture } from '@react-three/drei';
import { Station, Kicker, Frame, DepthFade } from './Station';
import { Sparkle } from './Backdrop';
import { journey } from '../../journey';
import { COLORS, FONTS, INTRO, PITCH, DECADE, STORY } from '../../mock';

// ------------------------------------------------------------------
// 01 — INTRO
// ------------------------------------------------------------------
function Portrait() {
  const tex = useTexture(INTRO.photo);
  tex.colorSpace = THREE.SRGBColorSpace;
  const g = useRef();
  useFrame((state) => {
    if (!g.current) return;
    const t = state.clock.elapsedTime;
    g.current.rotation.z = Math.sin(t * 0.4) * 0.025 + 0.015;
    g.current.rotation.y = journey.mx * 0.14;
    g.current.rotation.x = -journey.my * 0.08;
  });
  return (
    <group ref={g} position={[2.3, 0.34, 0]}>
      <mesh>
        <planeGeometry args={[1.3, 1.22]} />
        <meshBasicMaterial map={tex} transparent toneMapped={false} />
      </mesh>
      <Frame w={1.52} h={1.4} opacity={0.5} position={[0.02, 0.02, 0.02]} rotation={[0, 0, -0.02]} />
    </group>
  );
}

export function Intro() {
  return (
    <Station index={0} range={1.35}>
      {/* Outline first name */}
      <Text
        font={FONTS.black}
        fontSize={0.55}
        letterSpacing={0.02}
        color={COLORS.ink}
        fillOpacity={0}
        strokeColor={COLORS.ink}
        strokeWidth={'1.5%'}
        anchorX="left"
        anchorY="middle"
        position={[-2.65, 0.78, 0]}
      >
        {INTRO.first}
      </Text>
      {/* Solid last name */}
      <Text
        font={FONTS.black}
        fontSize={0.55}
        letterSpacing={0.01}
        color={COLORS.ink}
        anchorX="left"
        anchorY="middle"
        position={[-2.65, 0.2, 0]}
      >
        {INTRO.last}
      </Text>
      <Text
        font={FONTS.thin}
        fontSize={0.15}
        letterSpacing={0.45}
        color={COLORS.ink}
        fillOpacity={0.8}
        anchorX="left"
        anchorY="middle"
        position={[-2.63, -0.19, 0]}
      >
        {INTRO.alias}
      </Text>
      {/* Roles with rotating sparkles */}
      {INTRO.roles.map((r, i) => (
        <group key={r} position={[-0.3, -0.58 - i * 0.27, 0]}>
          <Sparkle position={[-1.85, 0, 0]} size={0.055} speed={0.5 + i * 0.22} opacity={0.9} />
          <Text
            font={FONTS.body}
            fontSize={0.165}
            color={COLORS.ink}
            anchorX="left"
            anchorY="middle"
            position={[-1.62, 0, 0]}
          >
            {r}
          </Text>
        </group>
      ))}
      <Portrait />
    </Station>
  );
}

// ------------------------------------------------------------------
// 02 — PITCH
// ------------------------------------------------------------------
export function Pitch() {
  return (
    <Station index={1}>
      <Kicker position={[0, 0.62, 0]}>{PITCH.title}</Kicker>
      <Text
        font={FONTS.body}
        fontSize={0.175}
        lineHeight={1.55}
        maxWidth={3.3}
        textAlign="center"
        color={COLORS.ink}
        anchorX="center"
        anchorY="top"
        position={[0, 0.4, 0]}
      >
        {PITCH.body}
      </Text>
    </Station>
  );
}

// ------------------------------------------------------------------
// 03 — THE DECADE (title, logo wall, timeline in depth layers)
// ------------------------------------------------------------------
export function Decade() {
  return (
    <Station index={2} range={2.1}>
      <Text
        font={FONTS.bold}
        fontSize={0.26}
        lineHeight={1.35}
        maxWidth={4.4}
        textAlign="center"
        color={COLORS.ink}
        anchorX="center"
        anchorY="middle"
        position={[0, 0.95, 1.5]}
      >
        {DECADE.title}
      </Text>
      {/* Logo wall — mocked text wordmarks */}
      <group position={[0, -0.35, 0]}>
        {DECADE.logos.map((name, i) => {
          const col = i % 4;
          const row = Math.floor(i / 4);
          return (
            <Text
              key={name}
              font={FONTS.med}
              fontSize={0.115}
              letterSpacing={0.14}
              color={COLORS.ink}
              fillOpacity={0.5}
              anchorX="center"
              anchorY="middle"
              position={[(col - 1.5) * 1.35, -row * 0.42, 0]}
            >
              {name.toUpperCase()}
            </Text>
          );
        })}
      </group>
      {/* Timeline — deep layer, you fly through it on the way out */}
      <DepthFade position={[0, 0, -16]} far={14} feather={5}>
        <group position={[0, 1.25, 0]}>
          {DECADE.timeline.map((t, i) => (
            <group key={i} position={[0, -i * 0.3, 0]}>
            <Text
              font={t.period ? FONTS.body : FONTS.med}
              fontSize={t.period ? 0.105 : 0.09}
              letterSpacing={t.period ? 0 : 0.35}
              color={COLORS.ink}
              fillOpacity={t.period ? 0.85 : 0.4}
              anchorX={t.period ? 'left' : 'center'}
              anchorY="middle"
              position={t.period ? [-2.15, 0, 0] : [0, 0, 0]}
            >
              {t.period ? t.role : t.role.toUpperCase()}
            </Text>
            {t.period && (
              <Text
                font={FONTS.thin}
                fontSize={0.095}
                letterSpacing={0.12}
                color={COLORS.ink}
                fillOpacity={0.45}
                anchorX="right"
                anchorY="middle"
                position={[2.35, 0, 0]}
              >
                {t.period}
              </Text>
            )}
          </group>
        ))}
        </group>
      </DepthFade>
    </Station>
  );
}

// ------------------------------------------------------------------
// 04 — SHORT STORY
// ------------------------------------------------------------------
export function Story() {
  return (
    <Station index={3}>
      <Kicker position={[0, 1.05, 0.6]}>{STORY.title}</Kicker>
      {STORY.facts.map((f, i) =>
        f ? (
          <Text
            key={i}
            font={i === STORY.facts.length - 1 ? FONTS.med : FONTS.body}
            fontSize={i === STORY.facts.length - 1 ? 0.13 : 0.165}
            letterSpacing={i === STORY.facts.length - 1 ? 0.3 : 0.01}
            color={COLORS.ink}
            fillOpacity={i === STORY.facts.length - 1 ? 0.5 : 0.92}
            anchorX="center"
            anchorY="middle"
            position={[0, 0.62 - i * 0.3, -i * 0.12]}
          >
            {f}
          </Text>
        ) : null
      )}
      <Sparkle position={[-2.4, 0.2, -0.4]} size={0.09} speed={0.35} opacity={0.5} />
      <Sparkle position={[2.5, -0.5, -0.6]} size={0.07} speed={-0.45} opacity={0.4} />
    </Station>
  );
}
