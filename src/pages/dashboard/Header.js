import React, {Component, useEffect, useState} from 'react';
import {Menu, Image, Dropdown, Icon} from 'semantic-ui-react'
import {Link, useHistory} from "react-router-dom";
import {navItems} from '../../NavItems'

export default function Header({onMenuTogglerClick, user, paddingRight}) {
    const history = useHistory();
    const [addresses, setAddresses] = useState([]);
    const [title, setTitle] = useState("");


    useEffect(() => {
        let addresses = [{title: "dashboard", url: "dashboard/home"}];
        let selectedItem;
        navItems.forEach((item) => {
            if (history.location.pathname.startsWith(item.url)) {
                setTitle(item.name);
                selectedItem = item;
            }
        });
        if (selectedItem && selectedItem !== navItems[0]) {
            addresses.push({title: selectedItem.name, url: selectedItem.url});
            if (history.location.pathname.includes("/create")) {
                addresses.push({title: "create new " + selectedItem.singleName, url: history.location.pathname});
            }
            if (history.location.pathname.includes("/edit/")) {
                addresses.push({
                    title: "edit " + selectedItem.singleName + " #" + history.location.pathname.substring(history.location.pathname.indexOf("/edit/") + 6),
                    url: history.location.pathname
                });
            }
        }
        setAddresses(addresses);
    }, [history.location.pathname]);


    function logout() {
        localStorage.removeItem("access");
        window.location.reload();
    }

    function renderAddresses() {
        return addresses.map((address, index) => {
            return (
                <>
                    <Link to={address.url}>
                        <Menu.Item as='a'>
                            <p style={{
                                float: "right",
                                margin: 0,
                                color: "white"
                            }}>{address.title}</p>
                        </Menu.Item>
                    </Link>


                    {index < addresses.length - 1 && (
                        <p style={{
                            float: "right",
                            margin: 0,
                            color: "white",
                            paddingRight: "10px",
                            paddingLeft: "10px"
                        }}>{"<"}</p>
                    )}
                </>
            )
        })
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            height: "90px", width: "100%", border: "0", borderRadius: "0",
            borderBottom: "1px solid rgba(34,36,38,.15)",
            boxShadow: " 0 0px 0px 0 rgba(34,36,38,.15)",
            paddingRight: paddingRight,
            transition: "all .5s",
            backgroundColor: "rgb(40,25,140)"
        }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row-reverse",
                alignItems: "center",
                height: "50px",
                width: "100%"
            }}>

                {/*<Menu.Menu position='left'>*/}

                {/*    <Dropdown trigger={<Image src={"dsf"} alt={"sfd"} avatar/>}*/}
                {/*              icon={null} className='link item' direction='left'>*/}
                {/*        <Dropdown.Menu>*/}
                {/*            <Dropdown.Header content='Account'/>*/}
                {/*            <Dropdown.Divider/>*/}
                {/*            /!*<ProfileModal user={this.props.user}/>*!/*/}
                {/*            <Dropdown.Item icon='lock' onClick={logout}>Logout</Dropdown.Item>*/}
                {/*        </Dropdown.Menu>*/}
                {/*    </Dropdown>*/}

                {/*</Menu.Menu>*/}
                <div>
                    <Icon name="sidebar" style={{
                        fontSize: "1.7rem",
                        padding: 0,
                        paddingTop: "5px",
                        paddingRight: "15px",
                        float: "right",
                        color: "white"
                    }} onClick={onMenuTogglerClick}/>
                    <h2 style={{float: "right", margin: 0, paddingRight: "15px", color: "white"}}>{title}</h2>
                </div>

                <p onClick={logout}
                   style={{float: "left", margin: 0, paddingLeft: "15px", fontSize: "18px", color: "white"}}>logout</p>

            </div>
            <div style={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
                height: "30px",
                paddingRight: "45px"
            }}>
                {renderAddresses()}
                {/*<p style={{*/}
                {/*    float: "right",*/}
                {/*    margin: 0,*/}
                {/*    paddingRight: "45px",*/}
                {/*    color: "white"*/}
                {/*}}>{"products < dashboard"}</p>*/}

            </div>
        </div>
    );

}
