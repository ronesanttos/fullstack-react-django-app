import { Link } from 'react-router-dom'
import { useState } from 'react'
import Container from './Container'
import style from './Navbar.module.css'

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className={style.navbar}>
      <Container customClass="nav">
        <button
          className={style.menu_button}
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        <ul className={`${style.list} ${open ? style.active : ''}`}>
          <li className={style.item}>
            <Link to='/' onClick={() => setOpen(false)}>Home</Link>
          </li>
          <li className={style.item}>
            <Link to='/projects' onClick={() => setOpen(false)}>Projects</Link>
          </li>
          <li className={style.item}>
            <Link to='/company' onClick={() => setOpen(false)}>Company</Link>
          </li>
          <li className={style.item}>
            <Link to='/contact' onClick={() => setOpen(false)}>Contatos</Link>
          </li>
        </ul>
      </Container>
    </nav>
  )
}

export default Navbar
