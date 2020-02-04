import React, {useEffect, useState} from 'react';
import {Button, Menu, Table} from 'semantic-ui-react'
import {getApi} from "../../../api";
import {useHistory} from "react-router-dom";

export default function MyTable({fields, title, path}) {
    const [page, setPage] = useState(1);
    const pageSize = 12;
    const [endPage, setEndPage] = useState(10);
    const [items, setItems] = useState([]);
    const [ordering, setOrdering] = useState(null);
    const [loading, setLoading] = useState(true);
    const history = useHistory();




    useEffect(() => {
        fetchData();
    }, [page]);


    function fetchData(state, instance) {
        getApi().get(`${path}/?page=${page}`, true)
            .then(response => {
                setItems(response.data.results);
                setEndPage(Math.ceil(response.data.count / pageSize));
            })
            .catch((resp) => {
            });
    }

    function renderTitle(field) {
        return (
            <Table.HeaderCell textAlign='right'
                              onClick={() => setOrdering((ordering === field.title) ? `-${field.title}` : ordering === `-${field.title}` ? null : field.title)}>
                {field.title}
                <span>
                    {ordering === field.title ? ' 🔽' : ordering === `-${field.title}` ? ' 🔼' : ''}
                  </span>
            </Table.HeaderCell>
        )
    }

    function renderRow(item) {
        return (
            <Table.Row onClick={() => history.push(`/dashboard/${path}/edit/${item.pk}`)}>
                {fields.slice(0).reverse().map(field => <Table.Cell textAlign='right'>{item[field.title]}</Table.Cell>)}
            </Table.Row>
        )
    }

    return (
        <div style={{height:"100%"}}>
            <Table celled striped selectable unstackable>
                <Table.Header>
                    <Table.Row>
                        {fields.slice(0).reverse().map(field => renderTitle(field))}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {items && items.map(item => renderRow(item))}
                </Table.Body>

                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell colSpan='4'>
                            <Menu floated='right' pagination>
                                {page > 2 && <Menu.Item as='a' onClick={() => setPage(1)}>{1}</Menu.Item>}
                                {page > 3 && <Menu.Item as='a' disabled>...</Menu.Item>}
                                {page > 1 && <Menu.Item as='a' onClick={() => setPage(page - 1)}>{page - 1}</Menu.Item>}
                                <Menu.Item as='a' active>{page}</Menu.Item>
                                {page < endPage &&
                                <Menu.Item as='a' onClick={() => setPage(page + 1)}>{page + 1}</Menu.Item>}
                                {page < endPage - 2 && <Menu.Item as='a' disabled>...</Menu.Item>}
                                {page < endPage - 1 &&
                                <Menu.Item as='a' onClick={() => setPage(endPage)}>{endPage}</Menu.Item>}
                            </Menu>
                            <Button primary onClick={() => history.push(`/dashboard/${path}/create`)}>Create
                                New</Button>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </div>
    );

}
