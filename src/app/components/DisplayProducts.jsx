"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'

function DisplayProducts() {
    const [allProducts, setallProducts] = useState([])
    const [asc, setasc] = useState(false)
    const [pageNo, setpageNo] = useState(1)

    const fetchAllProducts = async () => {
        try {
            let res = await axios.get(`https://dummyjson.com/products?limit=10&skip=${(pageNo * 10) - 10}`)
            setallProducts(res.data.products)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAllProducts()
    }, [pageNo])

    const addNewProduct = () => {
        let newProduct = {
            id: Date.now(),
            thumbnail: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
            title: "my new product",
            price: "1000",
            reviews: [
                {
                    "rating": 3,
                    "comment": "Would not recommend!",
                    "date": "2025-04-30T09:41:02.053Z",
                    "reviewerName": "Eleanor Collins",
                    "reviewerEmail": "eleanor.collins@x.dummyjson.com"
                },
                {
                    "rating": 4,
                    "comment": "Very satisfied!",
                    "date": "2025-04-30T09:41:02.053Z",
                    "reviewerName": "Lucas Gordon",
                    "reviewerEmail": "lucas.gordon@x.dummyjson.com"
                },
                {
                    "rating": 5,
                    "comment": "Highly impressed!",
                    "date": "2025-04-30T09:41:02.053Z",
                    "reviewerName": "Eleanor Collins",
                    "reviewerEmail": "eleanor.collins@x.dummyjson.com"
                }
            ]
        }
        setallProducts([newProduct,...allProducts ])
        console.log('added')
    }

    const deleteProduct = (id) => {
        const newArray = allProducts.filter((product) => {
            return product.id !== id
        })
        setallProducts(newArray)
    }

    const sortProductsbyTitle = () => {
        const newArray = [...allProducts].sort((a, b) => {
            return asc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
        })
        setallProducts(newArray)
        setasc(!asc)
    }

    const sortProductsbyPrice = () => {
        const newArray = [...allProducts].sort((a, b) => {
            return asc ? a.price - b.price : b.price - a.price
        })
        setallProducts(newArray)
        setasc(!asc)
    }

    const updateProduct = (id) => {
        const updatedProducts = allProducts.map((p) => {
            return p.id == id ? { ...p, title: "my updated product", price: 1 } : p
        })
        setallProducts(updatedProducts)
        console.log('update')
    }

    return (
        <div className=''>
            <div>
                <button onClick={addNewProduct} className=' bg-amber-200 px-3 p-2 m-3'>Add Product</button>
            </div>
            <div className='flex flex-row justify-center items-center gap-2'>
                <button onClick={() => { setpageNo(1) }} className='bg-gray-500 text-white p-3 rounded-full px-5'>1</button>
                <button onClick={() => { setpageNo(2) }} className='bg-gray-500 text-white p-3 rounded-full px-5'>2</button>
                <button onClick={() => { setpageNo(3) }} className='bg-gray-500 text-white p-3 rounded-full px-5'>3</button>
                <button onClick={() => { setpageNo(4) }} className='bg-gray-500 text-white p-3 rounded-full px-5'>4</button>
            </div>
            <table className=' border mt-3 mx-5'>
                <thead className=' border p-5'>
                    <tr className=' border p-5'>
                        <th className=' border p-5'>Id</th>
                        <th className=' border p-5'>Image</th>
                        <th className=' border p-5'>
                            <div className=' flex flex-row justify-between'>
                                <span className='text-center'>Title</span>
                                <button onClick={sortProductsbyTitle} className='text-blue-300 ml-5'>Sort</button>
                            </div>
                        </th>
                        <th className=' border p-5'>
                            <div className=' flex flex-row justify-between'>
                                <span>Price</span>
                                <button onClick={sortProductsbyPrice} className='text-blue-300 ml-5'>Sort</button>
                            </div>
                        </th>
                        <th className=' border p-5'>Reviews</th>
                        <th className=' border p-5'>Buttons</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allProducts && allProducts.map((product, index) => {
                            return (
                                <tr key={product.id} className=' m-5 border p-3'>
                                    <td className=' border text-center'>{product.id}</td>
                                    <td><img src={product.thumbnail} alt="abc" width={50} height={50} /></td>
                                    <td className=' border'>{product.title}</td>
                                    <td className=' border text-center'>{product.price}</td>
                                    <td className=' border text-center'>
                                        {
                                            Math.round(product.reviews.map((p) => p.rating).reduce((acc, cur) => acc + cur) / product.reviews.length)
                                        }
                                    </td>
                                    <td>
                                        <button onClick={() => { deleteProduct(product.id) }} className=' bg-red-500 px-2 p-2 text-white m-2'>Delete</button>
                                        <button onClick={() => { updateProduct(product.id) }} className=' bg-yellow-500 px-2 p-2 text-white m-2'>Update</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default DisplayProducts