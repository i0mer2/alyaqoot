'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * قماش ستارة ثلاثي الأبعاد يتموّج ويتفاعل مع حركة الماوس.
 * يستخدم شيدر مخصّص لمحاكاة الكسرات (folds) واللمعان — خفيف وسريع.
 */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vShade;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // كسرات رأسية
    float folds = sin(uv.x * 30.0) * 0.13;
    // تموّج عام مع الزمن
    float wave = sin(uv.y * 3.0 + uTime * 1.1) * 0.10 * uv.y;
    // تثبيت أعلى الستارة (معلّقة على القضيب)
    float topFix = smoothstep(1.0, 0.6, uv.y);
    // تموّج عند موضع الماوس
    float d = distance(uv, uMouse);
    float ripple = sin(d * 16.0 - uTime * 3.0) * 0.06 * smoothstep(0.55, 0.0, d);

    float z = folds * (1.0 - topFix * 0.7) + wave + ripple;
    pos.z += z;
    vShade = z;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec2 vUv;
  varying float vShade;

  void main() {
    vec3 base = mix(uColorB, uColorA, vUv.y);
    float light = clamp(0.55 + vShade * 2.4, 0.25, 1.18);
    vec3 col = base * light;
    col += vec3(0.20, 0.12, 0.14) * smoothstep(0.06, 0.13, vShade); // لمعان عند قمم الكسرات
    gl_FragColor = vec4(col, 1.0);
  }
`;

function Cloth() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uColorA: { value: new THREE.Color('#c52c58') },
      uColorB: { value: new THREE.Color('#4a0f1f') },
    }),
    [],
  );

  useFrame((state, delta) => {
    if (!mat.current) return;
    mat.current.uniforms.uTime.value += delta;
    // pointer من -1..1 إلى 0..1
    const tx = state.pointer.x * 0.5 + 0.5;
    const ty = state.pointer.y * 0.5 + 0.5;
    mouse.current.lerp(new THREE.Vector2(tx, ty), 0.06);
    mat.current.uniforms.uMouse.value.copy(mouse.current);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 120, 120]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function CurtainCloth() {
  return (
    <Canvas
      camera={{ position: [0, 0, 1.6], fov: 50 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <Cloth />
    </Canvas>
  );
}
