import {Link} from 'react-router-dom'
import style from './LinkButton.module.css'

function LinkButton({to, text, variant=''}) {
    return (
        <Link className={`${style.btn} ${style[variant]}`} to={to}> {text} </Link>
    )
}

export default LinkButton