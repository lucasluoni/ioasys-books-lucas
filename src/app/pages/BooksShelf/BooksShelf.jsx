import React, {useState} from 'react';
import Modal from 'react-modal';
import {useNavigate} from "react-router-dom";
import Card from '../../componentes/Card'
import styled from 'styled-components'

import content_bg from '../../../assets/content_bg.jpg'
import logo from '../../../assets/logo-black.svg';
import placeholder from '../../../assets/image_placeholder.png'
import closeIcon from '../../../assets/ico_times.svg'
import prevIcon from '../../../assets/ico_chevron_left.svg'
import nextIcon from '../../../assets/ico_chevron_right.svg'
import logOutIcon from '../../../assets/ico_logout.svg'

const axios = require('axios')

const Shelf = styled.div`
  width: 100%;
  min-height: 100vh;
  background-size: cover;
  background-position: center center;
  background-image: url(${content_bg});
  color: #333;
`;

const Header = styled.header`
  padding: 2.5rem 0;
  .logo {
    font-family: Heebo;
    font-style: normal;
    font-weight: 300;
    font-size: 28px;
    line-height: 40px;
    /* identical to box height, or 143% */
  }
`;

const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
  span {
    font-weight: 300;
    font-size: 28px;
    line-height: 40px;
    margin-left: 15px;
  }
`

const Paginator = styled.div`
  margin: 1rem 0;
  font-size: 0.75rem;
  text-align: right;
`;

const PaginatorText = styled.div`
    display: inline-block;
    margin-right: 0.5rem;
    span {
      font-weight: 500;
      color: #333;
    }
`;

const ModalContent = styled.div` 
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0;
  justify-content: space-evenly;
`;

const BookCover = styled.div`
  max-width: 349px;
  margin-right: 24px;
  flex-grow: 1;
  align-items: center;
  img {
        filter: drop-shadow(0px 12px 18px rgba(0, 0, 0, 0.3));
      }
`;

const Content = styled.div`
  flex-grow: 1;
  font-size: 12px;  
  .bookTitle {
    margin: 0;
  }
  p {
    color: #999999;
  
    line-height: 30px;
  }
  dt {
    font-weight: 500;
    color: #333333;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-weight: 500;
  font-size: 28px;
  line-height: 40px;
  overflow: hidden;
  margin: 0;
`

const AuthorsList = styled.span`
  display: block;
  font-size: 12px;
  line-height: 15px;  
  color: #AB2680;
`

const Specs = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  span:nth-child(2) {
    color: #999;
  }
`

const Resenha = styled.div`
  p {
    font-weight: 400;
    size: 12px;
    line-height: 23px;
  }
`

const Button = styled.button`
  outline: none;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  border: 1px solid rgba(51, 51, 51, 0.2);
  border-radius: 50%;
  background: transparent no-repeat center center;
  vertical-align: middle;
  margin: 0 0.25rem;
  transition: all 0.25s ease;
  background-image: url(${closeIcon});
  background-color: #fff;
`;

const LogOutButton = styled(Button)`
background-image: url(${logOutIcon});`

const PrevButton = styled(Button)`
  background-image: url(${prevIcon});
`

const NextButton = styled(Button)`
  background-image: url(${nextIcon});
`

Modal.setAppElement('#root')

export default function BooksShelf() {

  const [modalIsOpen, setIsOpen] = useState(false)
  const [toggleCloseButton, setToggleCloseButton] = useState(false)
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)
  const [currentUser, setCurrentUser] = useState()
  const [data, setData] = useState()
  const [pageInfo, setPageInfo] = useState()
  const [currentBook, setCurrentBook] = useState()
  
  React.useEffect(()=>{
    loadUser()
  }, [mounted])
  
  function loadUser(){
    if(sessionStorage.getItem('authorization')){
      setCurrentUser(JSON.parse(sessionStorage.getItem('user')))
      axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('authorization')
      loadData()
    } else {
      navigate("/login")
    }
  }

  function logout(){
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('authorization');
    sessionStorage.removeItem('refresh-token');
    navigate("/login")
  }

  function loadData(_page){
    const page = _page || 1
    setData(null)
    axios.get("books?amount=12&page="+page).then((response)=>{
      setData(response.data)
      setPageInfo({
        currentPage: response.data.page,
        totalPages: Math.ceil(response.data.totalPages)
      })
    })
  }

  function openModal(id) {
    setIsOpen(true);
    axios.get("/books/"+id).then((response)=>{
      setCurrentBook(response.data)
    })
    setToggleCloseButton(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00'
  }

  function closeModal() {
    setIsOpen(false)
    setToggleCloseButton(false)
  }

  function nextPage(){
    loadData(pageInfo.currentPage+1)
  }

  function prevPage(){
    loadData(pageInfo.currentPage-1)
  }

  let toggleClass = toggleCloseButton ? 'show' : 'hide'

  return (
    <div>

      <Button onClick={closeModal} className={`btn-round close ${toggleClass}`} ></Button>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        onClick={closeModal}
        className={Modal}
        >
        

        { currentBook ? 
          <ModalContent>
            <span className="col-xs col-sm-6 col-md-6" style={{padding: 0}}>
              <BookCover>
                { currentBook.imageUrl ? 
                  <img src={ currentBook.imageUrl } alt={currentBook.title} width="100%" />
                :
                  <img src={ placeholder }  alt={currentBook.title} width="100%" />
                }
              </BookCover>
            </span>
            
            <span className="col-xs-12 col-sm-6 col-md-6">
              <Content >
                
                <Title>
                  {currentBook.title}
                  <AuthorsList>{currentBook.authors.join(", ")}</AuthorsList>
                </Title>
              
                <div>
                  <h3>INFORMAÇÕES</h3>
                  
                  <Specs>
                    <span>Páginas</span>
                    <span>{ currentBook.pageCount }</span>  
                  </Specs>
                    
                  <Specs>
                    <span>Editora</span>
                    <span>{ currentBook.publisher }</span>  
                  </Specs>
                    
                  <Specs>
                    <span>Publicação</span>
                    <span>{ currentBook.published }</span>  
                  </Specs>
                    
                  <Specs>
                    <span>Idioma</span>
                    <span>{ currentBook.language }</span>  
                  </Specs>
                    
                  <Specs>
                    <span>Título Original</span>
                    <span>{ currentBook.title }</span>  
                  </Specs>
                    
                  <Specs>
                    <span>ISBN-10</span>
                    <span>{ currentBook.isbn10 }</span>  
                  </Specs>
                    
                  <Specs>
                    <span>ISBN-13</span>
                    <span>{ currentBook.isbn13 }</span>  
                  </Specs>
                    
                  
                </div>

                <Resenha>
                  <h3>RESENHA DA EDITORA</h3>
                  <p>{ currentBook.description }</p>
                </Resenha>

            </Content>
          </span>
          
          </ModalContent>
        :
          <>
            <BookCover>
              <div className="animated-background cover"></div>
            </BookCover>
          </>
        }
      </Modal>
      

      { currentUser ? 
        <Shelf>

          <div className="container">

              <Header className="row middle-xs">

                <Logo className="col-xs-8">
                  <img src={logo} alt="ioasys" />
                  <span>Books</span>
                </Logo>
                
                <div className="col-xs end-xs">
                  <span className="hidden-xs">Bem vindo, <strong>{currentUser.name}</strong></span>
                  <LogOutButton onClick={logout} className="btn-round logout"></LogOutButton>
                </div>

              </Header>

              <main>
                <div className="row">

                  { data ? 
                    <>
                      {data.data.map( (element) => (
                        <div className="col-md-3 col-sm-6 col-xs-12">
                        <Card data={element} onClick={openModal}></Card>
                        </div>
                        ))}
                    </>
                  :
                    <>
                      {[...Array(12).keys()].map( () => (
                      <div className="col-md-3 col-sm-6 col-xs-12">
                      <Card></Card>
                      </div>
                      ))}
                    </>
                  }

                </div>

                { pageInfo ?
                  <Paginator>
                    <div className="hidden-xs">
                      <PaginatorText>Página <span>{ pageInfo.currentPage }</span> de <span>{ pageInfo.totalPages }</span> </PaginatorText>
                      <PrevButton disabled={!data || pageInfo.currentPage<=1} onClick={prevPage} className="btn-round prev"></PrevButton>
                      <NextButton disabled={!data || pageInfo.currentPage>=pageInfo.totalPages} onClick={nextPage} className="btn-round next"></NextButton>
                    </div>
                    
                    <div className="hidden-sm hidden-md hidden-lg">
                      <PrevButton disabled={!data || pageInfo.currentPage<=1} onClick={prevPage} className="btn-round prev"></PrevButton>
                      <PaginatorText>Página <span>{ pageInfo.currentPage }</span> de <span>{ pageInfo.totalPages }</span> </PaginatorText>
                      <NextButton disabled={!data || pageInfo.currentPage>=pageInfo.totalPages} onClick={nextPage} className="btn-round next"></NextButton>
                    </div>
                  </Paginator>
                  : null
                }
              </main>

          </div>

        </Shelf>
      : null }
    </div>
)};