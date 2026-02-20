import { Link, useNavigate } from 'react-router-dom'
import style from './LinkButton.module.css'

function LinkButton({ to, text, back=false, variant = '' }) {
    const navigate = useNavigate()

    if (back) {
        return (
            <Link className={`${style.btn} ${variant}`} onClick={() => navigate(-1)}>
                {text}
            </Link>
        )
    }

    if (to) {
        return (
            <Link className={`${style.btn} ${style[variant]}`} to={to}> {text} </Link>
        )
    }

    console.warn("LinkButton precisa de 'to' ou 'back' ")

    return null
}

export default LinkButton