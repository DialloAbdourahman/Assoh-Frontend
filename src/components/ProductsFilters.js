import React from 'react';
import styled from 'styled-components';
import { Rating, Slider } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const ProductsFilters = ({
  rating,
  setRating,
  price,
  setPrice,
  nameSort,
  setNameSort,
  validateFilters,
  setValidateFilters,
  resetFilters,
}) => {
  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };

  const handleNameSortChange = (event) => {
    setNameSort(event.target.value);
  };

  return (
    <Wrapper>
      <h1>Filters</h1>
      <div className='filter'>
        <h2>Rating</h2>
        <Rating
          name='size-large'
          value={rating}
          size='large'
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
      </div>
      <div className='filter'>
        <h2>Price </h2>
        <Slider
          value={price}
          onChange={handlePriceChange}
          valueLabelDisplay='auto'
          step={100}
          min={0}
          max={1000000}
        />
      </div>
      <div className='filter'>
        <h2>Sort by</h2>
        <FormControl className='margin-left'>
          <FormLabel id='demo-row-radio-buttons-group-label'>Name</FormLabel>
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='row-radio-buttons-group'
            value={nameSort}
            onChange={handleNameSortChange}
          >
            <FormControlLabel
              value='asc'
              control={<Radio />}
              label='asc'
              defaultChecked
            />
            <FormControlLabel value='desc' control={<Radio />} label='desc' />
          </RadioGroup>
        </FormControl>
      </div>
      <div className='validate-filters'>
        <button
          onClick={() => setValidateFilters(!validateFilters)}
          className='hover'
        >
          Validate
        </button>
        <button onClick={resetFilters} className='hover'>
          Reset
        </button>
      </div>
    </Wrapper>
  );
};

export default ProductsFilters;

const Wrapper = styled.section`
  width: 20%;
  padding-right: 30px;
  margin-right: 10px;
  border-right: 1px solid var(--lightblack);

  h1 {
    text-align: center;
    font-size: 25px;
    margin: 20px 0;
  }

  h2 {
    font-size: 18px;
    margin: 20px 0;
    color: var(--darkblue);
  }

  .filter {
    margin: 30px 0;
  }

  .validate-filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .validate-filters button {
    width: 45%;
    padding: 10px 5px;
    background-color: var(--darkblue);
    color: white;
    font-size: 17px;
    border: none;
    border-radius: 5px;
  }

  /* .margin-left {
    margin-left: 20px;
  } */
`;
