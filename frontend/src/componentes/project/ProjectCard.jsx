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

            {services && services.length > 0 ? (
                services.map(service => (
                    <p className={style.services_text} key={service.id}>
                        <span className={`${style[service?.name.toLowerCase()]}`}></span> {service.name}
                    </p>
                ))
            ) : (
                <p>Sem serviços</p>
            )}

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