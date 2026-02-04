import { useState } from 'react';
import style from './ProjectForm.module.css';

import Input from '../form/Input';
import SubmitButton from '../form/SubmitButton';
import LinkButton from '../layout/LinkButton';

function ProjectForm({ handleSubmit, btnText,projetctData }) {

    const [project, setProject] = useState(
        projetctData || {
            name: '',
            budget: '',
            services: [],
            total_cost: 0,
        }
    );

    const submit = (event) => {
        event.preventDefault()
        handleSubmit(project)
    }

    function handleChange(event) {
        setProject({ ...project, [event.target.name]: event.target.value })
    }


    return (
        <form onSubmit={submit} className={style.form}>

            <Input 
            type='text' 
            text='Nome do projeto' 
            name='name' 
            placeholder='Insira o nome do projeto'
            handleOnChange={handleChange} 
            value={project.name || ''} />

            <Input 
            type="number" 
            text='Orçamento do projeto' 
            name='budget' 
            placeholder="Insira o valor total do orçamento "
            handleOnChange={handleChange} 
            value={project.budget || ''} />

            <SubmitButton text={btnText} />
            <LinkButton to={"/projects"} text={"Fechar"}/>
            
        </form>
    )

}

export default ProjectForm;