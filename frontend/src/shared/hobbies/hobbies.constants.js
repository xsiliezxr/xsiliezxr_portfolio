import basket from '../../assets/images/hobbies/basket.webp'
import cap from '../../assets/images/hobbies/cap.webp'
import control from '../../assets/images/hobbies/control.webp'
import headphones from '../../assets/images/hobbies/headphones.webp'
import learn from '../../assets/images/hobbies/learn.webp'

export const HOBBIES = [
  {
    id: 'control',
    label: 'Jugar videojuegos',
    hint: 'Está en la foto del inicio.',
    image: control,
  },
  {
    id: 'cleancode',
    label: 'Aprender',
    hint: 'Está en la página de herramientas.',
    image: learn,
  },
  {
    id: 'basketball',
    label: 'Jugar basket',
    hint: 'Está en la página de proyectos.',
    image: basket,
  },
  {
    id: 'cap',
    label: 'Coleccionar gorras',
    hint: 'Está en el botón de Sil.',
    image: cap,
  },
  {
    id: 'headphones',
    label: 'Escuchar música',
    hint: 'Está en la página de contacto.',
    image: headphones,
  },
]

export const HOBBY_TOTAL = HOBBIES.length
