import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Pagination } from '@mui/material';
import { useAuthContext } from '../contexts/authContext';
import { useGlobalContext } from '../contexts/globalContext';
import { axiosInstance } from '../axios/instance';
import { SET_LOADING_FALSE, SET_LOADING_TRUE } from '../utils/actions';
import AdminDeleteProduct from './AdminDeleteProduct';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [deleteProduct, setDeleteProduct] = useState({
    show: false,
    product: {},
  });

  const { user } = useAuthContext();
  const { dispatch } = useGlobalContext();

  const fetchProducts = async () => {
    try {
      dispatch({ type: SET_LOADING_TRUE });

      const { data } = await axiosInstance.get(
        `/products?name=${name}&page=${page}&categoryId=&nameSort=asc&minPrice=1&maxPrice=1000000&rating=0&sellerId=`
      );

      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: SET_LOADING_FALSE });
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    fetchProducts();
  }, [name, page]);

  return (
    <Wrapper>
      <header>
        <h2>All Products</h2>
      </header>
      <input
        type='text'
        id='name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Search for a product'
      />
      {products?.length === 0 && <h2>No products available. </h2>}
      {products.length > 0 && (
        <table>
          <thead>
            <tr>
              {/* <th>Product ID</th> */}
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Product Quantity</th>
              <th>Product Category</th>
              <th>Seller Name</th>
              <th>Seller Email</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => {
              return (
                <tr key={product?.id}>
                  {/* <td>{product?.id}</td> */}
                  <td>{product?.name}</td>
                  <td>{product?.price}</td>
                  <td>{product?.quantity}</td>
                  <td>{product?.category?.name}</td>
                  <td>{product?.seller?.name}</td>
                  <td>{product?.seller?.email}</td>
                  <td>{product?.createdAt}</td>
                  <td>
                    <button
                      onClick={() =>
                        setDeleteProduct({
                          show: true,
                          product,
                        })
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <Pagination
        count={11}
        defaultPage={page}
        siblingCount={0}
        onChange={handleChange}
      />
      {deleteProduct.show && (
        <AdminDeleteProduct
          fetchProducts={fetchProducts}
          deleteProduct={deleteProduct}
          setDeleteProduct={setDeleteProduct}
        />
      )}
    </Wrapper>
  );
};

export default AdminProducts;

const Wrapper = styled.section``;
