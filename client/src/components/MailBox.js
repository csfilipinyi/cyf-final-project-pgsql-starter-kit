import React from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import { Formik, Form } from 'formik';
import FormField from "../constant/FormField";
import StyledButton from '../constant/StyledButton';
import styled from 'styled-components'

const MailBox = ({receivers, setMBox, setMailSuccess}) => {

    const handleSubmit = async (values)=>{
        const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		await axios.post('https://designed-gd.herokuapp.com/api/send', values, config)
		setMBox(false)
		setMailSuccess(true)
    }

    const initialValue ={sender:'cyf.graduate.platform@gmail.com', receiver:receivers, subject:'', message:''}

    return (
        <Container>
            <Formik
				initialValues={initialValue}
				onSubmit={(values) => handleSubmit(values)}
				validationSchema={ValidationSchema}
			>
				{(props) => (
					<>
						<StyledForm id='formLogin' noValidate>
							<FormField
								disabled
								name='sender'
								label='CYF graduate platform'
							/>
                            <FormField
                                disabled
								name='receiver'
                                label='Graduate`s email'
							/>
							<FormField
								name='subject'
								label='Subject'
								height='80px'
								as='textarea'
							/>
                            <FormField
								name='message'
								label='Message'
								height='120px'
								as='textarea'
							/>
                        </StyledForm>
                        <ButtonContainer>
                            <StyledButton name='Cancel' className='cancel-md' handleClick={()=>setMBox(false)} type='button'/>
                            <StyledButton name='Send email' className='success-md' type='submit' handleClick={(prop) => handleSubmit(props.values)}/>
                        </ButtonContainer>
					</>
				)}
			</Formik>
        </Container>
    )
}

export default MailBox


const ValidationSchema = Yup.object().shape({
	receiver: Yup.string()
		.required("Required"),
	subject: Yup.string()
		.required("Required")
		.max(150, 'Subject must be less than 150'),
	message: Yup.string()
		.required("Required")
		.max(600, 'Subject must be less than 600'),
});

const Container = styled.div`
	display:flex;
	flex-direction:column;
	align-items:center;
	width:70%;
	height:600px;
    background-color:#E5E7E9;
    align-self:center;
    margin-top:50px;
`

const ButtonContainer =styled.div`
    display:flex;
    justify-content:space-between;
    align-items:space-between;
    width:70%;
`

const StyledForm=styled(Form)`
`