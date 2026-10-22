import basket from '../../assets/images/hobbies/basket.webp'
import cap from '../../assets/images/hobbies/cap.webp'
import control from '../../assets/images/hobbies/control.webp'
import headphones from '../../assets/images/hobbies/headphones.webp'
import learn from '../../assets/images/hobbies/learn.webp'

export const HOBBIES = [
  {
    id: 'control',
    label: { es: 'Jugar videojuegos', en: 'Play video games' },
    hint: { es: 'Está en la foto del inicio.', en: 'It is in the opening photo.' },
    image: control,
  },
  {
    id: 'cleancode',
    label: { es: 'Aprender', en: 'Learn' },
    hint: { es: 'Está en la página de herramientas.', en: 'It is on the tools page.' },
    image: learn,
  },
  {
    id: 'basketball',
    label: { es: 'Jugar basket', en: 'Play basketball' },
    hint: { es: 'Está en la página de proyectos.', en: 'It is on the projects page.' },
    image: basket,
  },
  {
    id: 'cap',
    label: { es: 'Coleccionar gorras', en: 'Collect caps' },
    hint: { es: 'Está en el botón de Sili.', en: 'It is on Sili’s button.' },
    image: cap,
  },
  {
    id: 'headphones',
    label: { es: 'Escuchar música', en: 'Listen to music' },
    hint: { es: 'Está en la página de contacto.', en: 'It is on the contact page.' },
    image: headphones,
  },
]

export const HOBBY_TOTAL = HOBBIES.length
