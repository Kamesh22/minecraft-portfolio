import { useRef, useMemo } from 'react'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'

/* ===== TEXTURE LOADER ===== */
function useBlockTextures() {
  const grassTop = useLoader(THREE.TextureLoader, import.meta.env.BASE_URL + 'textures/grass_top.png')
  const grassSide = useLoader(THREE.TextureLoader, import.meta.env.BASE_URL + 'textures/grass_side.png')
  const dirt = useLoader(THREE.TextureLoader, import.meta.env.BASE_URL + 'textures/dirt.png')

  // Apply pixel-art filtering
  ;[grassTop, grassSide, dirt].forEach((tex) => {
    tex.magFilter = THREE.NearestFilter
    tex.minFilter = THREE.NearestFilter
    tex.colorSpace = THREE.SRGBColorSpace
  })

  return { grassTop, grassSide, dirt }
}

/* ===== BLOCK COMPONENT ===== */
function Block({ position, type, onClick }) {
  const meshRef = useRef()
  const { grassTop, grassSide, dirt } = useBlockTextures()

  // Create materials array for each face
  // Order: +x, -x, +y, -y, +z, -z
  const materials = useMemo(() => {
    if (type === 'grass') {
      return [
        new THREE.MeshStandardMaterial({ map: grassSide }), // right
        new THREE.MeshStandardMaterial({ map: grassSide }), // left
        new THREE.MeshStandardMaterial({ map: grassTop }),   // top
        new THREE.MeshStandardMaterial({ map: dirt }),       // bottom
        new THREE.MeshStandardMaterial({ map: grassSide }), // front
        new THREE.MeshStandardMaterial({ map: grassSide }), // back
      ]
    }
    // Dirt block — all faces dirt
    const dirtMat = new THREE.MeshStandardMaterial({ map: dirt })
    return [dirtMat, dirtMat, dirtMat, dirtMat, dirtMat, dirtMat]
  }, [type, grassTop, grassSide, dirt])

  const handleClick = (e) => {
    e.stopPropagation()
    if (!e.face) return

    const faceNormal = [
      e.face.normal.x,
      e.face.normal.y,
      e.face.normal.z,
    ]

    onClick(position, faceNormal, e.nativeEvent.shiftKey)
  }

  return (
    <mesh
      ref={meshRef}
      position={position}
      material={materials}
      onClick={handleClick}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  )
}

export default Block
