import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import style from './Project.module.css';

import Message from '../layout/Message.jsx';
import Container from '../layout/Container.jsx'
import LinkButton from '../layout/LinkButton.jsx'
import ProjectCards from '../project/ProjectCard.jsx';
import Loading from '../layout/Loading.jsx';

import api from '../../api/api.js';

function Project() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true);
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = location.state?.message || '';

    useEffect(() => {
        api.get('projects/')
            .then(response => {
                setProjects(response.data)
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, []);

    function removeProject(id) {
        api.delete(`projects/${id}/`)
            .then(() => {
                setProjects(prev =>
                    prev.filter(projects => projects.id !== id))
                setProjectMessage('Projeto removido com sucesso!')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={style.project_container}>
            <div className={style.title_container}>
                <h1>Meus projetos</h1>
                <LinkButton to='/newproject' text='Criar Projeto' />
            </div>

            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}

            <Container customClass="start">

                {loading && <Loading />}
                {!loading && projects.length === 0 && (
                    <p className={style.info}>Não há projetos cadastrados!</p>
                )}

                {!loading && projects.length > 0 &&
                    projects.map((projects) => (
                        <ProjectCards
                            key={projects.id}
                            id={projects.id}
                            name={projects.name}
                            budget={projects.budget}
                            categories={projects.categories}
                            services={projects.services}
                            handleRemove={removeProject} />
                    ))}

            </Container>
        </div>)
}

export default Project;