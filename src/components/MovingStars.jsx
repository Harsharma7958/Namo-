import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'

const MovingStars = () => {
    const starsRef = useRef()

    // Rotates the stars every frame for a dynamic effect
    useFrame((state, delta) => {
        if (starsRef.current) {
            starsRef.current.rotation.y += delta * 0.05
            starsRef.current.rotation.x += delta * 0.02
        }
    })

    return (
        <Stars
            ref={starsRef}
            radius={70}   // Radius of the inner sphere
            depth={50}     // Depth of star field
            count={5000}   // Number of stars
            factor={4}     // Size factor
            saturation={0} // Star color saturation
            fade           // Fades out stars in the distance
        />
    )
}

const SpaceBackground = () => {
    return (
        <div className='bg-transparent h-full z-0 w-full fixed pointer-events-none'>
            <Canvas camera={{ position: [0, 0, 1] }}  dpr={[1, 2]}>
                <MovingStars />
            </Canvas>
        </div>
    )
}

export default SpaceBackground
