import style from '../project/ProjectForm.module.css';
import { useState } from 'react';

import Input from '../form/Input';
import SubmitButton from '../form/SubmitButton';

function ServiceForm({ handleSubmit, btnText }) {

    const [service, setService] = useState({
        name: '',
        cost: '',
        description: '',
    })

    function submit(event) {
        event.preventDefault()
        
        handleSubmit({
            ...service,
            cost: Number(service.cost)
        });
    }

    function handleChange(event) {
        setService({ ...service, [event.target.name]: event.target.value })
    }

    return (
        <form onSubmit={submit} className={style.form} >
            <Input
                type='text'
                text='Nome do serviço'
                name='name'
                placeholder='Insira o nome do serviço'
                handleOnChange={handleChange}
                value={service.name} />

            <Input
                type='number'
                text='Custo do serviço'
                name='cost'
                placeholder='Insira o valor total'
                handleOnChange={handleChange}
                value={service.cost} />

            <Input
                type='text'
                text='Descrição do serviço'
                name='description'
                placeholder='Descreva o serviço'
                handleOnChange={handleChange}
                value={service.description} />

            <SubmitButton text={btnText} />

        </form>
    )

}

export default ServiceForm;