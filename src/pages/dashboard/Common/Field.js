import React, {useEffect, useState} from 'react';
import {Card, Button, Form, Grid, GridColumn, Container} from "semantic-ui-react"
import {getApi} from "../../../api";
import {useHistory} from 'react-router-dom';
import Select from 'react-select'
import ImageUploader from 'react-images-upload';
import Map from "../Map";


export default function Field({field, item}) {
    const [value, setValue] = useState(null);
    const [inlineForms, setInlineForms] = useState([]);

    useEffect(() => {
        if (item !== null) {
            if (Object.keys(item).indexOf(field.name) >= 0) {
                setValue(item[field.name])
            }
        }
    }, []);


    if (["tel", "text", "number", "password"].indexOf(field.type) >= 0) {
        return (
            <GridColumn computer={5} tablet={8} mobile={16}>
                <label>{field.label}</label>
                <input placeholder={field.label} type={field.type} value={value}
                       onChange={(event) => setValue(event.target.value)}/>
            </GridColumn>
        );
    } else if (field.type === "select") {
        return (
            <GridColumn computer={5} tablet={8} mobile={16}>
                <label>{field.label}</label>
                <Select placeholder={'Select ' + field.label} options={field.options} isSearchable
                        value={field.options.find(option => option.value === value)}
                        onChange={(selectedOption) =>setValue(selectedOption.value)}/>
            </GridColumn>
        );
    } else if (field.type === "file") {
        return (
            <GridColumn computer={5} tablet={8} mobile={16}>
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
                <Map onClick={({lat, lng}) => setValue({latitude: lat, longitude: lng})}
                     lat={value&&value["latitude"]} lng={value&&value["longitude"]}/>
            </GridColumn>
        );
    } else if (field.type === "multi") {
        return (
            <GridColumn mobile={16}>
                <label>{field.label}</label>
                {inlineForms.map((form) => {
                    return (
                        <Grid>
                            {field.fields.map((subField) => <Field field={subField}/>)}
                        </Grid>
                    )
                })}

                <Button onClick={() => setInlineForms([...inlineForms, {}])}> add</Button>
            </GridColumn>
        );
    }


}