import React from 'react'

interface props {
    title: string;
    desc: string;
    form: React.ReactNode;
}
const FormContent = ({ title, desc, form }:props) => {
    return (
        <div className='mx-auto md:text-left text-center'>
            <h4 className='lg:text-4xl text-2xl font-semibold'>{title}</h4>
            <p className='mt-3'>{desc}</p>
            {form}
        </div>
    )
}

export default FormContent