import style from './EditProject.module.css'

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Loading from '../layout/Loading'
import Message from '../layout/Message'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm';
import ServiceForm from '../service/ServiceForm';
import ServiceCard from '../service/ServiceCard';

import api from '../../api/api';

function EditProject() {
    const { id } = useParams()
    const [project, setProject] = useState(null)
    const [services, setServices] = useState([])
    const [showPF, setShowPF] = useState(false)
    const [showServiceF, setShowServiceF] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        api.get(`projects/${id}/`)
            .then((response) => {
                setProject(response.data)
                setServices(response.data.services || [])
            })
            .catch((err) => console.log(err))
    }, [id])

    function editPost(updatedProject) {
        if (updatedProject.budget < project.total_cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto')
            setType('error')
            return
        }

        const payload = {
            name: updatedProject.name,
            budget: updatedProject.budget,
            category: updatedProject.category
        }

        api.patch(`projects/${id}/`, payload)
            .then((response) => {
                setProject(response.data)
                setShowPF(false)
                setMessage('Projeto atualizado com sucesso!!')
                setType('success')
            })
            .catch((err) => console.log(err))
    }

    function createService(serviceData) {
        const payload = {
            project: project.id,
            name: serviceData.name,
            cost: serviceData.cost,
            description: serviceData.description
        }

        api.post(`services/`, payload)
            .then((response) => {
                setServices(prev => [...prev, response.data])
                setProject(prev => ({
                    ...prev,
                    total_cost: Number(prev.total_cost) + Number(response.data.cost)
                }))
                setShowServiceF(false)
                setMessage('Serviço adicionado com sucesso!')
                setType('success')
            })
            .catch((err) => console.log(err))
    }

    function removeService(serviceId, cost) {

        api.delete(`services/${serviceId}/`)
            .then(() => {
                setServices(prev => prev.filter(s => s.id !== serviceId))
                setProject(prev => ({
                    ...prev,
                    total_cost: Number(prev.total_cost) - Number(cost)
                }))
                setMessage('Serviço removido com sucesso')
                setType('success')
            })
            .catch(err => console.log(err))
    }

    if (!project) return <Loading />
    return (
        <div className={style.project_details}>
            <Container customClass="column">

                {message && <Message type={type} msg={message} />}

                <div className={style.service_form_container}>
                    <h1> Projeto: {project.name}</h1>

                    <button className={style.btn} onClick={() => setShowPF(!showPF)}>
                        {showPF ? 'Fechar' : 'Editar projeto'}
                    </button>

                    {!showPF ? (
                        <div className={style.project_info}>
                            <p><span>Orçamento:</span> R${project.budget}</p>
                            <p><span>Total utilizado:</span> R${project.total_cost}</p>
                        </div>
                    ) : (
                        <div className={style.project_info}>
                            <ProjectForm 
                            handleSubmit={editPost} 
                            btnText='Salvar edição'
                             projetctData={project} />
                        </div>
                    )}
                </div>

                <div className={style.service_form_container}>
                    <h2>Adicione um serviço: </h2>

                    <button className={style.btn} onClick={() => setShowServiceF(!showServiceF)}>
                        {showServiceF ? 'Fechar' : 'Adicionar serviço'}
                    </button>

                    <div className={style.project_info}>
                        {showServiceF && (
                            <ServiceForm
                            handleSubmit={createService} 
                            btnText='Adicionar Serviço'
                            projectData={project} />)}
                    </div>
                </div>

                <h2>Serviços</h2>
                <Container className='start'>
                    {services.length > 0 ? services.map(service => (
                        <ServiceCard
                            id={service.id}
                            key={service.id}
                            name={service.name}
                            description={service.description}
                            cost={service.cost}
                            handleRemove={removeService} />
                    )) : <p>Não há serviços cadastrados.</p>}
                    
                </Container>
            </Container>
        </div>
    )
}

export default EditProject;