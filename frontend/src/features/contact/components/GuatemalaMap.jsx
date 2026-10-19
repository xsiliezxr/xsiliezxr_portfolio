import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import mapData from '../../../assets/maps/guatemala-departments.json'
import { useReducedMotion } from '../../../shared/hooks/useReducedMotion.js'
import { SiliMark } from '../../home/components/ui/SiliMark.jsx'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function GuatemalaMap() {
  const rootRef = useRef(null)
  const reduce = useReducedMotion()
  const [active, setActive] = useState(mapData.capital.deptId)
  const activeDept = mapData.departments.find((dept) => dept.id === active)

  useGSAP(() => {
    const root = rootRef.current
    const scroller = document.getElementById('page-scroll')
    if (!root || !scroller) return undefined
    const paths = gsap.utils.toArray('.gt-map-path', root)
    if (!paths.length) return undefined

    if (reduce) {
      gsap.set(paths, { autoAlpha: 1, scale: 1 })
      return undefined
    }

    gsap.set(paths, { autoAlpha: 0, transformOrigin: '50% 50%', scale: 0.92 })
    gsap.to(paths, {
      autoAlpha: 1,
      scale: 1,
      ease: 'none',
      stagger: 0.035,
      scrollTrigger: {
        trigger: root,
        scroller,
        start: 'top 80%',
        end: 'top 30%',
        scrub: 0.55,
        invalidateOnRefresh: true,
      },
    })

    return undefined
  }, { scope: rootRef, dependencies: [reduce], revertOnUpdate: true })

  return (
    <figure ref={rootRef} className="gt-map m-0 h-full border border-ink-700 bg-ink-900 p-4 md:p-5">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="m-0 font-display text-xl font-black uppercase tracking-[-0.03em] text-fog">
            Guatemala
          </h2>
          <p className="m-0 mt-1 font-mono text-[11px] text-fog-dim">
            {activeDept?.label || 'Departamento'}
          </p>
        </div>
        <p className="m-0 font-mono text-[11px] text-amber">{mapData.capital.label}</p>
      </div>

      <div className="gt-map-stage relative overflow-hidden border border-ink-700 bg-ink-950">
        <svg
          className="gt-map-svg block h-auto w-full"
          viewBox={mapData.viewBox}
          role="img"
          aria-label="Mapa de departamentos de Guatemala. Sili marca Ciudad de Guatemala."
        >
          <g className="gt-map-depts">
            {mapData.departments.map((dept) => (
              <path
                key={dept.id}
                d={dept.path}
                data-capital={dept.id === mapData.capital.deptId ? '1' : '0'}
                data-active={dept.id === active ? '1' : '0'}
                className="gt-map-path"
                onPointerEnter={() => setActive(dept.id)}
                onFocus={() => setActive(dept.id)}
                tabIndex={0}
                role="button"
                aria-label={dept.label}
              />
            ))}
          </g>
          <g className="gt-map-pin" transform={`translate(${mapData.capital.cx} ${mapData.capital.cy})`}>
            <circle r="18" className="gt-map-pin-ring" />
            <foreignObject x="-16" y="-34" width="32" height="44">
              <div className="gt-map-sili">
                <SiliMark />
              </div>
            </foreignObject>
          </g>
        </svg>
      </div>
    </figure>
  )
}
