import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onError } from '../../utilits/toast';
import { useRegisterUserMutation } from '../../redux/users/users-reducer';
import { Form } from '../FormStyle/Form.styled';
import { Label } from '../FormStyle/Label.styled';
import { Input } from '../FormStyle/Input.styled';
import { Placeholder } from '../FormStyle/Placeholder.styled';
import { Button } from '../FormStyle/Button.styled';
import { SpanError } from '../FormStyle/SpanError.styled';

export default function RegisterUser() {
  const [name, setName] = useState(sessionStorage.getItem('name') ?? '')
  const [email, setEmail] = useState(sessionStorage.getItem('email') ?? '')
  const [password, setPassword] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()
  const [
    registerUserHook,
    { isLoading, error, isSuccess },
  ] = useRegisterUserMutation()

  const onSubmit = async (data) => {
    registerUserHook({
      name,
      email,
      password,
    })
  }

  const onCancel = () => {
    sessionStorage.removeItem('name')
    sessionStorage.removeItem('email')
    navigate('/')
  }

  const onChange = (e) => {
    const value = e.target.value
    switch (e.target.name) {
      case 'name':
        setName(value)
        setValue('name', value)
        sessionStorage.setItem('name', value)
        break
      case 'email':
        setEmail(value)
        setValue('email', value)
        sessionStorage.setItem('email', value)
        break
      case 'password':
        setPassword(value)
        setValue('password', value)
        break
      default:
        return
    }
  }

  useEffect(() => {
    if (error) {
      onError(error.data)
    }
  }, [error])

  useEffect(() => {
    if (isSuccess) {
      setName('')
      setEmail('')
      setPassword('')
      sessionStorage.removeItem('name')
      sessionStorage.removeItem('email')
      navigate('/contacts')
    }
  }, [isSuccess]);

  return (
    <>
      {isLoading && <h3>Loading....</h3>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>
          <Input
            {...register('name', {
              required: true,
              pattern: /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
            })}
            value={name}
            onChange={onChange}
            placeholder=" "
          />
          <Placeholder>Name</Placeholder>
          {errors?.name?.type === 'pattern' && (
            <SpanError>Error in name</SpanError>
          )}
        </Label>
        <Label>
          <Input
            type="email"
            {...register('email', { required: true })}
            onChange={onChange}
            value={email}
            placeholder=" "
          />
          <Placeholder>E-mail</Placeholder>
          {errors?.email?.type === 'required' && (
            <SpanError>Email is required</SpanError>
          )}
        </Label>
        <Label>
          <Input
            type="password"
            {...register('password', { required: true, minLength: 6 })}
            onChange={onChange}
            value={password}
            placeholder=" "
          />
          <Placeholder>Password</Placeholder>
          {errors.password?.type === 'required' && (
            <SpanError>Password is required</SpanError>
          )}
          {errors.password?.type === 'minLength' && (
            <SpanError>Password is short</SpanError>
          )}
        </Label>
        <Button type="submit">Register</Button>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
      </Form>
    </>
  )
}