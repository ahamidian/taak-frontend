import React from 'react';
import {Grid} from "semantic-ui-react"
import MyTable from "./Table";

export default function ListPage({title, path, fields}) {

    return (
        <Grid className="animated fadeIn" columns='equal' style={{marginLeft: "0", marginTop: "0",marginRight:"0"}}>
            <Grid.Row style={{margin: "0", padding: "0"}}>
                {/*<Grid.Column style={{*/}
                {/*    display: "flex",*/}
                {/*    flexDirection: "column",*/}
                {/*    height: dynamicHeight,*/}
                {/*    overflowY: "auto",*/}
                {/*    backgroundColor: "#f4f4f4",*/}
                {/*    padding: "0",*/}
                {/*    maxWidth: "300px",*/}
                {/*    minWidth: "300px"*/}
                {/*}}>*/}
                {/*</Grid.Column>*/}
                <Grid.Column style={{padding: "0"}}>
                    <MyTable title={title} path={path} fields={fields}/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );

}
