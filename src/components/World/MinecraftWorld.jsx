import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls, Sky } from '@react-three/drei'
import { Suspense, useCallback, useMemo, useState } from 'react'
import * as THREE from 'three'
import Block from './Block'
import './MinecraftWorld.css'

function blockKey(x, y, z) {
  return `${x},${y},${z}`
}

function addBlock(blocks, x, y, z, type) {
  blocks.set(blockKey(x, y, z), type)
}

function addCuboid(blocks, from, to, type) {
  for (let x = from[0]; x <= to[0]; x++) {
    for (let y = from[1]; y <= to[1]; y++) {
      for (let z = from[2]; z <= to[2]; z++) {
        addBlock(blocks, x, y, z, type)
      }
    }
  }
}

function generateIsland() {
  const blocks = new Map()

  for (let x = -5; x <= 5; x++) {
    for (let z = -4; z <= 4; z++) {
      const dist = Math.sqrt((x / 5.2) ** 2 + (z / 4.2) ** 2)
      if (dist <= 1.05) {
        addBlock(blocks, x, 0, z, 'grass')
      }
      if (dist <= 0.98) {
        addBlock(blocks, x, -1, z, 'dirt')
      }
      if (dist <= 0.82) {
        addBlock(blocks, x, -2, z, 'dirt')
      }
    }
  }

  addBlock(blocks, 0, -3, 0, 'dirt')
  addBlock(blocks, 1, -3, 1, 'dirt')
  addBlock(blocks, -1, -3, -1, 'dirt')
  addBlock(blocks, 0, -4, 0, 'dirt')

  for (let z = -4; z <= 3; z++) {
    addBlock(blocks, 0, 1, z, 'stone')
  }

  addCuboid(blocks, [-4, 1, 0], [-1, 1, 3], 'plank')
  addCuboid(blocks, [-4, 2, 0], [-1, 3, 0], 'plank')
  addCuboid(blocks, [-4, 2, 3], [-1, 3, 3], 'plank')
  addCuboid(blocks, [-4, 2, 0], [-4, 3, 3], 'plank')
  addCuboid(blocks, [-1, 2, 0], [-1, 3, 3], 'plank')
  addBlock(blocks, -2, 2, 0, 'glass')
  addBlock(blocks, -3, 2, 3, 'glass')
  addBlock(blocks, -2, 2, 3, 'glass')
  addBlock(blocks, -2, 2, 0, 'glass')
  addBlock(blocks, -2, 2, 1, 'dirt')
  addBlock(blocks, -2, 3, 1, 'plank')

  for (let x = -5; x <= 0; x++) {
    for (let z = -1; z <= 4; z++) {
      if (x >= -4 && x <= -1 && z >= 0 && z <= 3) continue
      if (Math.abs(x + 2.5) + Math.abs(z - 1.5) <= 4.2) {
        addBlock(blocks, x, 4, z, 'roof')
      }
    }
  }
  addCuboid(blocks, [-4, 5, 1], [-1, 5, 2], 'roof')

  addCuboid(blocks, [3, 1, 1], [3, 4, 1], 'wood')
  for (let x = 1; x <= 5; x++) {
    for (let y = 4; y <= 6; y++) {
      for (let z = -1; z <= 3; z++) {
        const dist = Math.abs(x - 3) + Math.abs(y - 5) + Math.abs(z - 1)
        if (dist <= 4) {
          addBlock(blocks, x, y, z, 'leaf')
        }
      }
    }
  }

  addBlock(blocks, 2, 1, -2, 'pants')
  addBlock(blocks, 2, 2, -2, 'shirt')
  addBlock(blocks, 2, 3, -2, 'wood')
  addBlock(blocks, 1, 2, -2, 'shirt')
  addBlock(blocks, 3, 2, -2, 'shirt')

  return blocks
}

function CharacterFace() {
  const loadedFaceTexture = useLoader(THREE.TextureLoader, import.meta.env.BASE_URL + 'person/person.png')
  const faceTexture = useMemo(() => {
    const texture = loadedFaceTexture.clone()
    texture.colorSpace = THREE.SRGBColorSpace
    texture.needsUpdate = true
    return texture
  }, [loadedFaceTexture])

  return (
    <sprite position={[2, 3.3, -2.54]} scale={[0.95, 0.95, 1]}>
      <spriteMaterial map={faceTexture} transparent />
    </sprite>
  )
}

function MinecraftWorld() {
  const [blocks, setBlocks] = useState(() => generateIsland())

  const handleBlockClick = useCallback((position, faceNormal, shiftKey) => {
    setBlocks((prev) => {
      const next = new Map(prev)
      const [x, y, z] = position

      if (shiftKey) {
        next.delete(blockKey(x, y, z))
        return next
      }

      const newPos = [
        x + Math.round(faceNormal[0]),
        y + Math.round(faceNormal[1]),
        z + Math.round(faceNormal[2]),
      ]
      const key = blockKey(newPos[0], newPos[1], newPos[2])
      if (!next.has(key)) {
        next.set(key, faceNormal[1] > 0.5 ? 'grass' : 'dirt')
      }
      return next
    })
  }, [])

  const blockArray = useMemo(() => {
    return Array.from(blocks, ([key, type]) => {
      const [x, y, z] = key.split(',').map(Number)
      return { key, pos: [x, y, z], type }
    })
  }, [blocks])

  return (
    <div className="minecraft-world" id="minecraft-world">
      <Canvas camera={{ position: [10, 8, 11], fov: 48 }} gl={{ antialias: true }} shadows>
        <Suspense fallback={null}>
          <Sky
            distance={450000}
            sunPosition={[100, 50, 100]}
            inclination={0.58}
            azimuth={0.25}
            turbidity={8}
            rayleigh={2}
          />

          <ambientLight intensity={0.55} />
          <directionalLight
            position={[10, 16, 10]}
            intensity={1.55}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-camera-far={60}
            shadow-camera-left={-12}
            shadow-camera-right={12}
            shadow-camera-top={12}
            shadow-camera-bottom={-12}
          />
          <pointLight position={[-5, 9, -5]} intensity={0.35} color="#ffeecc" />

          {blockArray.map((block) => (
            <Block
              key={block.key}
              position={block.pos}
              type={block.type}
              onClick={handleBlockClick}
            />
          ))}

          <CharacterFace />

          <OrbitControls
            enablePan={false}
            minDistance={7}
            maxDistance={25}
            target={[0, 1.3, 0]}
            enableDamping
            dampingFactor={0.1}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default MinecraftWorld
