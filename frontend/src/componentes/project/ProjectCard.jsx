import { Link } from 'react-router-dom';
import style from './ProjectCards.module.css';

import { BsPencil, BsTrash } from 'react-icons/bs';


function ProjectCards({ id, name, budget, services, handleRemove }) {

    const remove = (event) => {
        event.preventDefault()
        handleRemove(id)
    }
    return (
        <div className={style.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento:</span> R${budget}
            </p>

            <p className={style.services_text}>
                <span className={`${style[services?.toLowerCase()]}`}></span> {services}
            </p>
            <div className={style.project_card_actions}>
                <Link to={`/editproject/${id}`}>
                    <BsPencil /> Editar
                </Link>
                <button onClick={remove}>
                    <BsTrash /> Excluir
                </button>
            </div>
        </div>)
}

export default ProjectCards;