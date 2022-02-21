import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import styled from 'styled-components'
import logo from '../../assets/logo-white.svg';
import login_bg from '../../assets/login_bg.jpg'
import axios from 'axios'

const Login = styled.div`
  .logo {
    margin-bottom: 2.25rem;
  }
`
 const LoginError = styled.div`
  &::before {
    content: "";
    position: absolute;
    left: 1rem;
    top: -.5rem;
    width: 0; 
    height: 0; 
    border-left: .5rem solid transparent;
    border-right: .5rem solid transparent;
    border-bottom: .5rem solid rgba(255, 255, 255, 0.4);;
  }
  padding: 1rem;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(2px);
  border-radius: 4px;
  position: relative;
  margin-top: 1.5rem;
  color: #FFF;
  font-weight: 700;
  font-size: 1rem;
`

const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  background-size: cover;
  background-position: center center;
  background-image: url(${login_bg});
  color: #FFF;
`

const Container = styled.div`
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
  max-width: 1280px;
  margin: 0 auto;

  .fullHeight {
    height: 100vh;
  }
`

const Logo = styled.div`
  margin-bottom: 2.25rem;
  font-weight: 300;
  font-size: 1.75rem;

  img {
    margin-right: 1rem;
    vertical-align: -8px;
  }
`

const Input = styled.div`
  background: rgba(0, 0, 0, 0.32);
  backdrop-filter: blur(2px);
  border-radius: 4px;
  padding: 0.5rem 1rem;
  margin: 1rem 0;
  position: relative;

  label {
    font-size: 0.75rem;
    line-height: 16px;
    color: #ffffff;
    opacity: 0.5;
    display: block;
  }

  input {
    width: 100%;
    outline: none;
    border: none;
    background: transparent;
    color: #fff;
    font-size: 1rem;
    line-height: 1.5rem;
  }
  input:focus {
    background: transparent;
    // color: red !important;
  }
`
  
const Button = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  margin: -17px 0.75rem 0 0;
  outline: none;
  padding: 0.5rem 1.25rem;
  background-color: #fff;
  color: #b22e6f;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1.25rem;
  border: none;
  border-radius: 45px;
  transition: all 0.25s ease;
  min-width: 90px;
  text-align: center;

  &:hover {
    opacity: 0.85;
  }  
`

export default function LoginScreen(props) {

  const navigate = useNavigate()
  // estado para armazenar o erro no login
  const [error, setError] = useState(null)
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })

  const signIn = (evt) => {
    evt.preventDefault()
    setError(null)
    
    axios.post('/auth/sign-in', loginForm)
      .then((response) => {
      sessionStorage.setItem('user', JSON.stringify(response.data) )
      sessionStorage.setItem('authorization', "Bearer "+response.headers['authorization'])
      sessionStorage.setItem('refresh-token', response.headers['refresh-token'])
      axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('authorization')
      navigate("/")
    })
      .catch((error) => {
        // setError(error)
        setError(error.response.data.errors.message);
    })
  }

  const handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    let tempValue = {...loginForm}
    tempValue[name] = value
    setLoginForm(tempValue)
  }

  return (
    <Login>
    <Background>
      <Container>
        <div className="row middle-xs fullHeight">
          <div className="col-md-4 col-sm-6 col-xs-12">

            <Logo>
              <img src={logo} alt="logo-ioasys"/>Books
            </Logo>

            <form onSubmit={signIn}>
              <Input>
                <label htmlFor="email">E-mail</label>
                  <input
                    value={loginForm.email}
                    onChange={handleInputChange}
                    required
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Digite seu e-mail"
                    autoComplete="off"
                  />
              </Input>
              <Input>
                <label htmlFor="password">Senha</label>
                  <input
                    value={loginForm.password}
                    onChange={handleInputChange}
                    required id="password"
                    name="password"
                    type="password"
                    placeholder="Digite aqui sua senha"
                  />
                <Button type="submit">Entrar</Button>
              </Input>
              { error && <LoginError>{error}</LoginError>}
            </form>

          </div>
        </div>
      </Container>
    </Background>
  </Login>
  )
}
