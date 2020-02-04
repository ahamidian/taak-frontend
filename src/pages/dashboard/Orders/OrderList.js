import React from 'react';
import ListPage from "../Common/ListPage";

export default function OrderList() {

    return (
        <ListPage title="Order" path="orders" fields={[{title:"pk"},{title:"owner"},{title:"price"}]}/>
    );

}
