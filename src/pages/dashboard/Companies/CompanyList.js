import React from 'react';
import ListPage from "../Common/ListPage";

export default function CompanyList() {

    return (
        <ListPage title="Company" path="companies" fields={[{title:"username"},{title:"name"}]}/>
    );

}
