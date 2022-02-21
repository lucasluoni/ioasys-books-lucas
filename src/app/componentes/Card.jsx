import React from 'react';
import placeholder from '../../assets/image_placeholder.png';
import styled from 'styled-components'

const StyledCard = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 160px;
  margin: .5rem 0;
  padding: .5rem;
  cursor: pointer;
  transition: all 0.20s ease;
  background: #FFF;
  box-shadow: 0px 6px 24px rgba(84, 16, 95, 0.13);
  border-radius: 4px;
  box-sizing: border-box;

  & > div {
    margin: .5rem;
    width: 100%;
  }
`

const Cover = styled.div`
  max-width: 81px;
  align-items: center;
  img {
      filter: drop-shadow(0px 6px 9px rgba(0, 0, 0, 0.15));
  }
}
`

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Title = styled.h2`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.2rem;
`

const Author = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  li {
    font-size: 12px;
    font-weight: 400;
    line-height: 1rem;
    color: #AB2680;
  }
`

const Details = styled(Author)`
    li {
      font-size: 12px;
      line-height: 20px;
      /* or 167% */
      color: #999999;
    }
}
`

export default function Card(props) {

  const clickCard = () => {
    if(props) {
      props.onClick(props.data.id);
    }
  }

  return (
    <StyledCard 
    onClick={clickCard}>
      
      { props.data &&
        <>
          <Cover>
            {props.data.imageUrl ?
              <img src={props.data.imageUrl} alt={props.data.title} width="100%" />
              :
              <img src={placeholder} alt={props.data.title} width="100%" />
            }
          </Cover>
          <BookInfo>
            <div>
              <Title>{props.data.title}</Title>
              <Author>
                {props.data.authors.map(author =>
                  <li key={author}>{author}</li>
                )}
              </Author>
            </div>

            <Details>
              <li>{props.data.pageCount} páginas</li>
              <li>{props.data.publisher}</li>
              <li>Publicado em {props.data.published}</li>
            </Details>

          </BookInfo>
        </>
      
      }

    </StyledCard>

)};