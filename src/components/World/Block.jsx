import { useMemo, useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'

function useBlockTextures() {
  const grassTop = useLoader(THREE.TextureLoader, import.meta.env.BASE_URL + 'textures/grass_top.png')
  const grassSide = useLoader(THREE.TextureLoader, import.meta.env.BASE_URL + 'textures/grass_side.png')
  const dirt = useLoader(THREE.TextureLoader, import.meta.env.BASE_URL + 'textures/dirt.png')

  ;[grassTop, grassSide, dirt].forEach((texture) => {
    texture.magFilter = THREE.NearestFilter
    texture.minFilter = THREE.NearestFilter
    texture.colorSpace = THREE.SRGBColorSpace
  })

  return { grassTop, grassSide, dirt }
}

function solidMaterial(color, options = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.78,
    ...options,
  })
}

function Block({ position, type, onClick }) {
  const meshRef = useRef()
  const { grassTop, grassSide, dirt } = useBlockTextures()

  const materials = useMemo(() => {
    if (type === 'grass') {
      return [
        new THREE.MeshStandardMaterial({ map: grassSide }),
        new THREE.MeshStandardMaterial({ map: grassSide }),
        new THREE.MeshStandardMaterial({ map: grassTop }),
        new THREE.MeshStandardMaterial({ map: dirt }),
        new THREE.MeshStandardMaterial({ map: grassSide }),
        new THREE.MeshStandardMaterial({ map: grassSide }),
      ]
    }

    const typedMaterials = {
      dirt: solidMaterial('#765239'),
      wood: solidMaterial('#6f472b'),
      plank: solidMaterial('#b47a45'),
      leaf: solidMaterial('#2f8f45'),
      stone: solidMaterial('#7f8580'),
      roof: solidMaterial('#7e3f2b'),
      glass: solidMaterial('#8cc7ff', { transparent: true, opacity: 0.62, roughness: 0.18 }),
      shirt: solidMaterial('#2f6faa'),
      pants: solidMaterial('#26324a'),
    }

    const material = typedMaterials[type] || new THREE.MeshStandardMaterial({ map: dirt })
    return [material, material, material, material, material, material]
  }, [type, grassTop, grassSide, dirt])

  const handleClick = (event) => {
    event.stopPropagation()
    if (!event.face) return

    onClick(position, [event.face.normal.x, event.face.normal.y, event.face.normal.z], event.nativeEvent.shiftKey)
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
