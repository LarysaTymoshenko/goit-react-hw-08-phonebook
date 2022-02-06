import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { onError } from '../../utilits/toast'
import { useLoginUserMutation } from '../../redux/users/users-reducer';
import { Form } from '../FormStyle/Form.styled'
import { Label } from '../FormStyle/Label.styled'
import { Input } from '../FormStyle/Input.styled'
import { Placeholder } from '../FormStyle/Placeholder.styled'
import { Button } from '../FormStyle/Button.styled'
import { SpanError } from '../FormStyle/SpanError.styled'

export default function LoginUser() {
  const [email, setEmail] = useState(localStorage.getItem('email') ?? '')
  const [password, setPassword] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()

  const [
    loginUserHook,
    { isLoading, isSuccess, error },
  ] = useLoginUserMutation()

  const onSubmit = (data) => {
    loginUserHook({ email, password })
  }

  const onCancel = () => {
    navigate('/')
  }

  const onChange = (e) => {
    const value = e.target.value
    switch (e.target.name) {
      case 'email':
        setEmail(value)
        setValue('email', value)
        localStorage.setItem('email', value)
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
      setEmail('')
      setPassword('')
      navigate('/contacts')
    }
  }, [isSuccess, navigate])

  return (
    <>
      {isLoading && <h3>Loading....</h3>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="email">
          <Input
            {...register('email', {
              required: true,
            })}
            type="email"
            onChange={onChange}
            value={email}
            placeholder=" "
          />
          <Placeholder>E-mail</Placeholder>
          {errors?.email?.type === 'required' && (
            <SpanError>Email is required</SpanError>
          )}
        </Label>
        <Label htmlFor="password">
          <Input
            {...register('password', { required: true, minLength: 6 })}
            type="password"
            onChange={onChange}
            value={password}
            placeholder=" "
          />
          <Placeholder>Password</Placeholder>
          {errors?.password?.type === 'required' && (
            <SpanError>Password is required</SpanError>
          )}
          {errors.password?.type === 'minLength' && (
            <SpanError>Password is short</SpanError>
          )}
        </Label>
        <Button type="submit">Log in</Button>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
      </Form>
    </>
  )
}