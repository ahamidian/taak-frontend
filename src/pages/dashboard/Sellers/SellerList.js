import React from 'react';
import ListPage from "../Common/ListPage";

export default function SellerList() {

    return (
        <ListPage title="Seller" path="sellers" fields={[{title:"phone_number"},{title:"first_name"},{title:"last_name"}]}/>
    );

}
