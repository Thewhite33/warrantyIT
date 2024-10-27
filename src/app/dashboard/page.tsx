'use client'
import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const Page = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetchProducts()
    }, [])
    const fetchProducts = async () => {
        const response = await fetch("/api/add", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await response.json();
        setProducts(data.product)
    }
    console.log(products);
    return (
        <div>
            <Header />
            <div className='mx-2 md:mx-10 my-8'>
                <Table>
                    <TableCaption>List of all Warranty Items</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Email</TableHead>
                            <TableHead>Product name</TableHead>
                            <TableHead>Period</TableHead>
                            <TableHead>SKU ID</TableHead>
                            <TableHead className="text-right">Purchase Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products?.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium">{product.user.email}</TableCell>
                                <TableCell className="font-medium">{product.productName}</TableCell>
                                <TableCell className="font-medium">{product.warranty}</TableCell>
                                <TableCell className="font-medium">{product.skuid}</TableCell>
                                <TableCell className="font-medium">{new Date(product.purchasedate).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                        {/* <TableRow>
                            <TableCell className="font-medium">INV001</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Credit Card</TableCell>
                            <TableCell className="text-right">$250.00</TableCell>
                        </TableRow> */}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default Page