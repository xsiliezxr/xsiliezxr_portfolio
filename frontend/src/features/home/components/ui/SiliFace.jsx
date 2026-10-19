import face from '../../../../assets/images/sili-face.png'

export function SiliFace({ className = '' }) {
  return <img className={`sili-face ${className}`} src={face} alt="" />
}
