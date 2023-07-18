import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Pagination } from '@mui/material';
import { useAuthContext } from '../contexts/authContext';
import { useGlobalContext } from '../contexts/globalContext';
import { axiosInstance } from '../axios/instance';
import { SET_LOADING_FALSE, SET_LOADING_TRUE } from '../utils/actions';
import UpdateProduct from './UpdateProduct';
import DeleteProduct from './DeleteProduct';
import CreateProduct from './CreateProduct';

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [editProduct, setEditProduct] = useState({
    show: false,
    product: {},
  });
  const [deleteProduct, setDeleteProduct] = useState({
    show: false,
    product: {},
  });
  const [createProduct, setCreateProduct] = useState(false);

  const { user } = useAuthContext();
  const { dispatch } = useGlobalContext();

  const fetchProducts = async () => {
    try {
      dispatch({ type: SET_LOADING_TRUE });

      const { data } = await axiosInstance.get(
        `/${user?.role}/myProducts?name=${name}&page=${page}&categoryId=&nameSort=asc&minPrice=1&maxPrice=1000000&rating=&sellerId=${user?.id}`,
        {
          headers: {
            Authorization: 'Bearer ' + user.accessToken,
          },
        }
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
      <header className='dashboard-header'>
        <h2>All my products</h2>
        <input
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Search for your product'
        />
        <button onClick={() => setCreateProduct(true)}>Add a product</button>
      </header>
      {products?.length === 0 && <h2>No product available. </h2>}
      {products.length > 0 && (
        <table className='dashboard-table'>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Product Category</th>
              <th>Product Price</th>
              <th>Product Quantity</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => {
              return (
                <tr key={product?.id}>
                  <td>{product?.id}</td>
                  <td>{product?.name}</td>
                  <td>{product?.category?.name}</td>
                  <td>{product?.price}</td>
                  <td>{product?.quantity}</td>
                  <td>{product?.createdAt}</td>
                  <td>
                    <button
                      onClick={() =>
                        setEditProduct({
                          show: true,
                          product,
                        })
                      }
                    >
                      Edit
                    </button>
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
      <div className='pagination'>
        <Pagination
          count={11}
          defaultPage={page}
          siblingCount={0}
          onChange={handleChange}
        />
      </div>
      {editProduct.show && (
        <UpdateProduct
          editProduct={editProduct}
          setEditProduct={setEditProduct}
          fetchProducts={fetchProducts}
        />
      )}
      {deleteProduct.show && (
        <DeleteProduct
          deleteProduct={deleteProduct}
          setDeleteProduct={setDeleteProduct}
          fetchProducts={fetchProducts}
        />
      )}
      {createProduct && (
        <CreateProduct
          setCreateProduct={setCreateProduct}
          fetchProducts={fetchProducts}
        />
      )}
    </Wrapper>
  );
};

export default SellerProducts;

const Wrapper = styled.section`
  padding: 10px;
  width: 80%;
`;
