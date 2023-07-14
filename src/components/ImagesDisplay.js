import React, { useState } from 'react';
import styled from 'styled-components';

const ImagesDisplay = ({ images }) => {
  const [index, setIndex] = useState(0);

  return (
    <Wrapper>
      <div className='image'>
        <img
          src={images && images[index]?.split(' ')[1]}
          alt=''
          className='main-image'
        />
      </div>
      <div className='sub-images'>
        {images &&
          images?.map((image, i) => {
            return (
              <img
                src={image?.split(' ')[1]}
                key={i}
                alt=''
                onClick={() => setIndex(i)}
                className={`sub-image ${i === index && 'current'}`}
              />
            );
          })}
      </div>
    </Wrapper>
  );
};

export default ImagesDisplay;

const Wrapper = styled.section`
  width: 35%;

  .main-image {
    display: block;
    width: 100%;
    object-fit: cover;
    margin-bottom: 10px;
  }

  .sub-images {
    display: flex;
    justify-content: space-between;
  }

  .sub-image {
    width: 18%;
  }

  .current {
    border: 3px solid var(--orange);
    border-radius: 5px;
    box-sizing: content-box;
  }
`;
