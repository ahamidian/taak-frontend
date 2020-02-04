import React from 'react';
import ListPage from "../Common/ListPage";

export default function ProductList() {

    return (
        <ListPage title="Product" path="products"
                  fields={[{title: "title"}, {title: "price"}, {title: "brand"}, {title: "parent"}]}/>
    );

}
