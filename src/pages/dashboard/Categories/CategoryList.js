import React from 'react';
import ListPage from "../Common/ListPage";

export default function CategoryList() {

    return (
        <ListPage title="Category" path="categories" fields={[{title:"title"},{title:"parent"},{title:"is_leaf"},{title:"level"}]}/>
    );

}
