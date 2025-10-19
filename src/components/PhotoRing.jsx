import * as THREE from 'three'
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Image, Environment, ScrollControls, useScroll, useTexture } from '@react-three/drei'
import { easing } from 'maath'
import '../util'

export default function PhotoRing() {
  // responsive state
  const [viewport, setViewport] = useState({ width: 1200 })

  useEffect(() => {
    function onResize() {
      setViewport({ width: window.innerWidth })
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Choose camera & carousel settings based on width
  const isMobile = viewport.width < 768
  // make the mobile camera slightly closer and with a bit wider fov to make the ring appear larger
  const camera = isMobile ? { position: [0, 0, 52], fov: 28 } : { position: [0, 0, 100], fov: 15 }
  // increase mobile radius so the photoring is visually larger on phones
  const carouselProps = isMobile ? { radius: 1.2, count: 6 } : viewport.width < 1200 ? { radius: 1.2, count: 7 } : { radius: 1.4, count: 8 }
  // card geometry args: increase size on mobile for better visibility
  const cardGeomArgs = isMobile ? [0.2, 1.15, 1, 20, 20] : [0.1, 1, 1, 20, 20]

  return (
    <div className="photoring-canvas-wrapper">
      <Canvas className="photoring-canvas" camera={camera}>
        <fog attach="fog" args={['#a79', 8.5, 12]} />
        <ScrollControls pages={4} infinite>
          <Rig rotation={[0, 0, 0.15]}>
            <Carousel radius={carouselProps.radius} count={carouselProps.count} cardGeomArgs={cardGeomArgs} />
          </Rig>
          <Banner position={[0, -0.15, 0]} />
        </ScrollControls>
        <Environment background>
          <mesh>
            <sphereGeometry args={[50, 100, 100]} />
            <meshBasicMaterial color={'black'} side={THREE.BackSide} />
          </mesh>
        </Environment>
      </Canvas>
    </div>
  )
}

function Rig(props) {
  const ref = useRef()
  const scroll = useScroll()
  useFrame((state, delta) => {
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2) // Rotate contents
    state.events.update() // Raycasts every frame rather than on pointer-move
    easing.damp3(state.camera.position, [-state.pointer.x * 2, state.pointer.y + 1.5, 10], 0.3, delta) // Move camera
    state.camera.lookAt(0, 0, 0) // Look at center
  })
  return <group ref={ref} {...props} />
}

function Carousel({ radius = 1.4, count = 8, cardGeomArgs = [0.1, 1, 1, 20, 20] }) {
  // Defensive fallback
  const safeCount = Math.max(3, Math.min(12, count))
  return Array.from({ length: safeCount }, (_, i) => (
    <Card
      key={i}
      url={`/img${Math.floor(i % 10) + 1}_.jpg`}
      position={[Math.sin((i / count) * Math.PI * 2) * radius, 0, Math.cos((i / count) * Math.PI * 2) * radius]}
      rotation={[0, Math.PI + (i / safeCount) * Math.PI * 2, 0]}
      geomArgs={cardGeomArgs}
    />
  ))
}

function Card({ url, geomArgs = [0.1, 1, 1, 20, 20], ...props }) {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  const pointerOver = (e) => (e.stopPropagation(), hover(true))
  const pointerOut = () => hover(false)
  useFrame((state, delta) => {
    easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta)
    easing.damp(ref.current.material, 'radius', hovered ? 0.25 : 0.1, 0.2, delta)
    easing.damp(ref.current.material, 'zoom', hovered ? 1 : 1.5, 0.2, delta)
  })
  return (

  <Image ref={ref} url={url} transparent side={THREE.DoubleSide} onPointerOver={pointerOver} onPointerOut={pointerOut} {...props}>
    <bentPlaneGeometry args={geomArgs} />
  </Image>
  
  )
}

function Banner(props) {
  const ref = useRef()
  const texture = useTexture('/work_.png')
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  const scroll = useScroll()
  useFrame((state, delta) => {
    ref.current.material.time.value += Math.abs(scroll.delta) * 4
    ref.current.material.map.offset.x += delta / 2
  })
  return (
    <mesh ref={ref} {...props}>
      <cylinderGeometry args={[1.6, 1.6, 0.14, 128, 16, true]} />
      <meshSineMaterial map={texture} map-anisotropy={16} map-repeat={[12, 1]} side={THREE.DoubleSide} toneMapped={false} />
    </mesh>
  )
}
