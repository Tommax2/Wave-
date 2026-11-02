import { useRef } from 'react'

export default function WaveStack() {
  const stackRef = useRef(null)
  const moveStack = event => {
    if (!stackRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const bounds = stackRef.current.getBoundingClientRect()
    const y = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12
    const x = ((event.clientY - bounds.top) / bounds.height - 0.5) * -9
    stackRef.current.style.setProperty('--x', `${y}deg`)
    stackRef.current.style.setProperty('--y', `${x}deg`)
  }
  const resetStack = () => {
    stackRef.current?.style.setProperty('--x', '0deg')
    stackRef.current?.style.setProperty('--y', '0deg')
  }
  return <div className="stack-stage" ref={stackRef} onPointerMove={moveStack} onPointerLeave={resetStack}>
    <div className="stack layer-three"></div><div className="stack layer-two"></div>
    <div className="stack layer-one"></div><div className="stack-orb"></div>
  </div>
}
