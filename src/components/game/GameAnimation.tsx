import dynamic from 'next/dynamic'

const GameAnimation = dynamic(() => import('./GameAnimationInternal'), {
    ssr: false,
})

export default GameAnimation
