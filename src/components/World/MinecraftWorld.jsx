import { Canvas } from '@react-three/fiber'
import { Sky, OrbitControls } from '@react-three/drei'
import { useState, useCallback, useMemo, Suspense } from 'react'
import Block from './Block'
import './MinecraftWorld.css'

/* ===== ISLAND GENERATION ===== */
function generateIsland() {
  const blocks = []
  const key = (x, y, z) => `${x},${y},${z}`

  // Layer 0 (bottom) — large base
  for (let x = -4; x <= 4; x++) {
    for (let z = -4; z <= 4; z++) {
      const dist = Math.sqrt(x * x + z * z)
      if (dist <= 4.5) {
        blocks.push({ pos: [x, -3, z], type: 'dirt' })
      }
    }
  }

  // Layer 1 — slightly smaller
  for (let x = -3; x <= 3; x++) {
    for (let z = -3; z <= 3; z++) {
      const dist = Math.sqrt(x * x + z * z)
      if (dist <= 3.8) {
        blocks.push({ pos: [x, -2, z], type: 'dirt' })
      }
    }
  }

  // Layer 2 — medium
  for (let x = -3; x <= 3; x++) {
    for (let z = -3; z <= 3; z++) {
      const dist = Math.sqrt(x * x + z * z)
      if (dist <= 3.2) {
        blocks.push({ pos: [x, -1, z], type: 'dirt' })
      }
    }
  }

  // Layer 3 — grass top
  for (let x = -2; x <= 2; x++) {
    for (let z = -2; z <= 2; z++) {
      const dist = Math.sqrt(x * x + z * z)
      if (dist <= 2.8) {
        blocks.push({ pos: [x, 0, z], type: 'grass' })
      }
    }
  }

  // Small hill
  blocks.push({ pos: [1, 1, 0], type: 'grass' })
  blocks.push({ pos: [1, 1, 1], type: 'grass' })
  blocks.push({ pos: [0, 1, 1], type: 'grass' })

  // Tree trunk (at -1, 0, -1)
  blocks.push({ pos: [-1, 1, -1], type: 'dirt' })
  blocks.push({ pos: [-1, 2, -1], type: 'dirt' })
  blocks.push({ pos: [-1, 3, -1], type: 'dirt' })

  // Tree leaves (simple cross pattern)
  const leafCenter = [-1, 4, -1]
  for (let dx = -1; dx <= 1; dx++) {
    for (let dz = -1; dz <= 1; dz++) {
      blocks.push({
        pos: [leafCenter[0] + dx, leafCenter[1], leafCenter[2] + dz],
        type: 'grass',
      })
    }
  }
  blocks.push({ pos: [-1, 5, -1], type: 'grass' })

  // Bottom stalactites for floating effect
  blocks.push({ pos: [0, -4, 0], type: 'dirt' })
  blocks.push({ pos: [1, -4, 1], type: 'dirt' })
  blocks.push({ pos: [-1, -4, -1], type: 'dirt' })
  blocks.push({ pos: [0, -5, 0], type: 'dirt' })

  // Convert to map
  const blockMap = new Map()
  blocks.forEach((b) => {
    blockMap.set(key(b.pos[0], b.pos[1], b.pos[2]), b.type)
  })

  return blockMap
}

/* ===== MAIN WORLD COMPONENT ===== */
function MinecraftWorld() {
  const [blocks, setBlocks] = useState(() => generateIsland())

  const blockKey = useCallback((x, y, z) => `${x},${y},${z}`, [])

  const handleBlockClick = useCallback((position, faceNormal, shiftKey) => {
    setBlocks((prev) => {
      const next = new Map(prev)
      const [x, y, z] = position

      if (shiftKey) {
        // Remove the clicked block
        next.delete(blockKey(x, y, z))
      } else {
        // Place a new block adjacent to the clicked face
        const newPos = [
          x + Math.round(faceNormal[0]),
          y + Math.round(faceNormal[1]),
          z + Math.round(faceNormal[2]),
        ]
        const key = blockKey(newPos[0], newPos[1], newPos[2])
        if (!next.has(key)) {
          // Place grass if on top, dirt otherwise
          next.set(key, faceNormal[1] > 0.5 ? 'grass' : 'dirt')
        }
      }
      return next
    })
  }, [blockKey])

  // Convert map to renderable array
  const blockArray = useMemo(() => {
    const arr = []
    blocks.forEach((type, key) => {
      const [x, y, z] = key.split(',').map(Number)
      arr.push({ key, pos: [x, y, z], type })
    })
    return arr
  }, [blocks])

  return (
    <div className="minecraft-world" id="minecraft-world">
      <Canvas
        camera={{ position: [10, 8, 10], fov: 50 }}
        gl={{ antialias: true }}
        shadows
      >
        <Suspense fallback={null}>
          {/* Sky */}
          <Sky
            distance={450000}
            sunPosition={[100, 50, 100]}
            inclination={0.6}
            azimuth={0.25}
            turbidity={8}
            rayleigh={2}
          />

          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 15, 10]}
            intensity={1.5}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <pointLight position={[-5, 10, -5]} intensity={0.3} color="#ffeecc" />

          {/* Blocks */}
          {blockArray.map((block) => (
            <Block
              key={block.key}
              position={block.pos}
              type={block.type}
              onClick={handleBlockClick}
            />
          ))}

          {/* Controls */}
          <OrbitControls
            enablePan={false}
            minDistance={5}
            maxDistance={25}
            target={[0, 0, 0]}
            enableDamping
            dampingFactor={0.1}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default MinecraftWorld
