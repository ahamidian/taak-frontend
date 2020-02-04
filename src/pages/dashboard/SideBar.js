import React from 'react';
import {Icon, Menu, Sidebar} from 'semantic-ui-react'
import {Link, useHistory} from 'react-router-dom'
import img from "../../backg2.jpg"
import {navItems} from '../../NavItems'

export default function SideBar({visible, setVisible, width}) {
    const history = useHistory();

    function renderItems() {
        return navItems.map((nav) =>
            <Link to={nav.url} onClick={() => {
                if (width < 500) {
                    setVisible(false);
                }
            }}>
                <Menu.Item as='a' active={history.location.pathname.startsWith(nav.url)} style={{
                    minWidth: 0,
                    padding: "10",
                    display: "flex",
                    justifyContent: "flex-end",
                }}>
                    <p style={{alignSelf: "center", margin: 0, color: "#333333"}}>{nav.name}</p>
                    <Icon name={nav.icon} className="shooka" style={{color: "#333333"}}/>
                </Menu.Item>
            </Link>
        )
    }


    return (
        <Sidebar direction="right"
                 borderless
                 className="shooka"
                 as={Menu}
                 onHide={() => {
                     if (width < 500) {
                         setVisible(false);
                     }
                 }}
                 animation='overlay'
                 inverted
                 vertical
                 visible={visible}
        >
            <img src={img} style={{height: 120}}/>
            {renderItems()}
        </Sidebar>


    );

}
