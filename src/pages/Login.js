import React, {useState} from 'react';
import {Card, Button, Form} from "semantic-ui-react"
import {getApi} from "../api";
import {useHistory} from 'react-router-dom';


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    function attemptLogin() {
        getApi(false).post(`token/`, {username, password})
            .then(response => {
                localStorage.setItem('access', response.data.access);
                localStorage.setItem('refresh', response.data.refresh);
                history.push("/dashboard/home");
            })
            .catch((response) => {
                console.log(response);
            });

    }


    return (
        <div className="app align-items-center">
            <Card className="p-2" style={{width: "400px", margin: "auto", marginTop: "100px"}}>
                <Card.Content>
                    <Card.Header>
                        <h3>Login</h3>

                    </Card.Header>

                    <Form style={{marginTop: "20px"}}>
                        <Form.Field>
                            <label>Username</label>
                            <input placeholder='Username' type="tel" value={username}
                                   onChange={(event) => setUsername(event.target.value)}/>
                        </Form.Field>

                        <Form.Field>
                            <label>Password</label>
                            <input placeholder='Password' type="password" value={password}
                                   onChange={(event) => setPassword(event.target.value)}/>
                        </Form.Field>

                        <Button positive style={{width: "100%"}}
                                onClick={attemptLogin}>Login</Button>
                    </Form>
                </Card.Content>
            </Card>

        </div>
    );

}