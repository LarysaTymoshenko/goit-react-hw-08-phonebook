import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { getUserName } from '../../redux/auth/auth-selector'
import { useLogoutUserMutation } from '../../redux/users/users-reducer'
import Section from '../Section/Section'
import { onError } from '../../utilits/toast'
import { List } from './list.styled'
import { Item } from './item.styled'
import { Block } from './block.styled'

export default function UserMenu() {
  const userName = useSelector(getUserName)
  const [logoutUserHook, { error }] = useLogoutUserMutation()
  const location = useLocation()

  useEffect(() => {
    if (error) {
      onError(error)
    }
  }, [error])

  return (
    <>
      <Section size="full">
        <Block>
          {userName && !location.pathname.includes('add') && (
            <Link  style={{  color: 'rgb(117, 111, 58)' }} to={`${location.pathname}/add` }>Add contact</Link>
          )}
          <List>
            {!userName ? (
              <>
                <Item>
                  <Link to="register" style={{ color: 'inherit', textDecoration: 'none' }}>Register</Link>
                </Item>
                <Item>
                  <Link to="login" style={{  color: 'inherit',textDecoration: 'none' }}>LogIn</Link>
                </Item>
              </>
            ) : (
              <>
                <Item>Hello, {userName}</Item>
                <Item>
                    <Link
                      to="/"
                      style={{  color: 'rgb(117, 111, 58)' }}
                    onClick={() => {
                      logoutUserHook()
                      }}
                  >
                    LogOut
                  </Link>
                </Item>
              </>
            )}
          </List>
        </Block>
      </Section>
      <Outlet />
    </>
  )
}