import React, {useEffect, useState} from 'react';
import {Card, Button, Form, Grid, GridColumn, Container} from "semantic-ui-react"
import {getApi} from "../../../api";
import {useHistory} from 'react-router-dom';
import Select from 'react-select'
import ImageUploader from 'react-images-upload';
import Map from "../Map";
import MenuList from "./MenuList";

export default function EditForm({fields, item, title, path}) {
    const [formData, setFormData] = useState({});
    const [inlineForms, setInlineForms] = useState([]);
    const history = useHistory();

    useEffect(() => {
        if (item !== null) {
            let itemData = {};
            fields.forEach((field) => {
                if (Object.keys(item).indexOf(field.name) >= 0) {
                    itemData = {...itemData, [field.name]: item[field.name]}
                }
            });
            setFormData(itemData)

        }
    }, []);


    function attemptEdit() {
        if (item === null) {
            getApi().post(`${path}/`, formData)
                .then(response => {
                    history.push(`/dashboard/${path}`);
                })
                .catch((response) => {
                    console.log(response);
                });
        } else {
            getApi().put(`${path}/${item.pk}/`, formData)
                .then(response => {
                    history.push(`/dashboard/${path}`);
                })
                .catch((response) => {
                    console.log(response);
                });
        }
    }

    function attemptDelete() {

        getApi().delete(`${path}/${item.pk}/`)
            .then(response => {
                history.push(`/dashboard/${path}`);
            })
            .catch((response) => {
                console.log(response);
            });


    }

    function renderField(field, data, setData) {
        let key = field.name;
        if (["tel", "text", "number", "password"].indexOf(field.type) >= 0) {
            return (
                <GridColumn computer={8} tablet={8} mobile={16}>
                    <label>{field.label}</label>
                    <input placeholder={field.label} type={field.type} value={data[key]}
                           onChange={(event) => setData({...data, [key]: event.target.value})}/>
                </GridColumn>
            );
        } else if (field.type === "select") {
            return (
                <GridColumn computer={8} tablet={8} mobile={16}>
                    <label>{field.label}</label>
                    <Select placeholder={'Select ' + field.label} options={field.options} isSearchable
                            components={{ MenuList }}
                            value={field.options.find(option => option.value === data[key])}
                            onChange={(selectedOption) => setData({...data, [key]: selectedOption.value})}/>
                </GridColumn>
            );
        } else if (field.type === "file") {
            return (
                <GridColumn computer={8} tablet={8} mobile={16}>
                    <label>{field.label}</label>
                    <ImageUploader
                        withIcon={false}
                        withPreview={true}
                        buttonText='Choose image'
                        onChange={() => console.log("ds")}
                        imgExtension={['.jpg', '.png']}
                        maxFileSize={5242880}
                    />
                </GridColumn>
            );
        } else if (field.type === "map") {
            return (
                <GridColumn mobile={16}>
                    <Map onClick={({lat, lng}) => setData({...data, latitude: lat, longitude: lng})}
                         lat={data["latitude"]} lng={data["longitude"]}/>
                </GridColumn>
            );
        } else if (field.type === "multi") {
            return (
                <GridColumn mobile={16}>
                    <label>{field.label}</label>
                    {data[key] && data[key].map((line, index) => {
                        return (
                            <Grid>
                                {field.fields.map((subField) => renderField(subField, data[key][index], (value) => {
                                    data[key][index] = value;
                                    setData({...data, [key]: data[key]})
                                }))}
                            </Grid>
                        )
                    })}

                    <Button onClick={() => {
                        if(!data[key]){
                            data[key]=[];
                        }
                        data[key].push({});
                        setData({...data, [key]: data[key]})
                    }}> add</Button>
                </GridColumn>
            );
        }
    }

    return (
        <>
            <Card className="p-2" style={{width: "auto"}}>
                <Card.Content>
                    <Card.Header>
                        {!item && <h3>Create New {title}</h3>}
                        {item && <h3>Edit {title}</h3>}
                    </Card.Header>
                    <Form style={{marginTop: "20px", marginBottom: "20px"}}>
                        <Grid>
                            {fields.map((field) => renderField(field, formData, setFormData))}
                        </Grid>
                    </Form>
                </Card.Content>
            </Card>
            {item && <Button negative onClick={attemptDelete} floated="left" className="ml-3">delete</Button>}
            <Button positive onClick={attemptEdit} floated="right" className="mr-3">Save</Button>
        </>
    );

}