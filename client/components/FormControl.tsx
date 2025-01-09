import React from 'react'

const FormContent = ({ title, desc, form }:any) => {
    return (
        <div className='mx-auto md:text-left text-center'>
            <h4 className='lg:text-4xl text-2xl font-semibold'>{title}</h4>
            <p className='mt-3'>{desc}</p>
            {form}
        </div>
    )
}

export default FormContent