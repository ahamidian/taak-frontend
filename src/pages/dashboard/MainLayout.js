import React, {useEffect, useState} from 'react';
import Header from "./Header";
import {Grid,Sidebar,Segment} from "semantic-ui-react";
import LoginRequired from "./LoginRequired";
import SideBar from "./SideBar";
import {Route, Switch, Redirect} from "react-router-dom";
import CategoryList from "./Categories/CategoryList";
import CategoryForm from "./Categories/CategoryForm";
import ProductList from "./Products/ProductList";
import ProductForm from "./Products/ProductForm";
import SellerList from "./Sellers/SellerList";
import SellerForm from "./Sellers/SellerForm";
import CompanyList from "./Companies/CompanyList";
import CompanyForm from "./Companies/CompanyForm";
import OrderList from "./Orders/OrderList";
import OrderForm from "./Orders/OrderForm";


export default function MainLayout({children}) {

    const [isSideBarOpen, setSideBarOpen] = useState(window.innerWidth > 500);
    const [width, setWidth] = useState(window.innerWidth);
    let dynamicHeight = 'calc(100vh - 90px)';


    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => window.removeEventListener('resize', handleWindowSizeChange);
    }, []);

    function handleWindowSizeChange() {
        if(width!==window.innerWidth){
            setWidth(window.innerWidth);
            if (window.innerWidth > 500) {
                setSideBarOpen(true);
            }else {
                setSideBarOpen(false);
            }
        }
    }

    return (
        <LoginRequired>
            <Sidebar.Pushable>
                <SideBar visible={isSideBarOpen} setVisible={setSideBarOpen} width={width}/>

                <Sidebar.Pusher dimmed={isSideBarOpen&&width<500}>
                    <Grid columns="equal" style={{margin: "0"}}>
                        <Grid.Row style={{padding: "0"}}>
                            <Header onMenuTogglerClick={() => setSideBarOpen(!isSideBarOpen)}
                                    paddingRight={isSideBarOpen && width > 500 ? "260px" : "0px"}/>
                        </Grid.Row>
                        <Grid.Row style={{padding: "0"}}>

                            <div style={{
                                backgroundColor: "#e2e2e2",
                                marginRight: isSideBarOpen && width > 500 ? "260px" : "0px",
                                height: dynamicHeight,
                                overflowY: "auto",
                                width: "100%"
                            }}
                                 className={`shooka-pusher ${width>500?"p-4":"p-2"}`}>

                                <Switch>
                                    <Route exact path="/dashboard">
                                       <Redirect to="/dashboard/home" />
                                    </Route>
                                    <Route exact path="/dashboard/products" name="Product List Page" component={ProductList}/>
                                    <Route exact path="/dashboard/products/create" name="Product Edit Page"
                                           component={ProductForm}/>
                                    <Route exact path="/dashboard/products/edit/:pk" name="Product Create Page"
                                           component={ProductForm}/>

                                    <Route exact path="/dashboard/categories" name="Category List Page"
                                           component={CategoryList}/>
                                    <Route exact path="/dashboard/categories/create" name="Category Edit Page"
                                           component={CategoryForm}/>
                                    <Route exact path="/dashboard/categories/edit/:pk" name="Category Create Page"
                                           component={CategoryForm}/>

                                    <Route exact path="/dashboard/sellers" name="Seller List Page" component={SellerList}/>
                                    <Route exact path="/dashboard/sellers/create" name="Seller Edit Page"
                                           component={SellerForm}/>
                                    <Route exact path="/dashboard/sellers/edit/:pk" name="Seller Create Page"
                                           component={SellerForm}/>

                                    <Route exact path="/dashboard/companies" name="Company List Page" component={CompanyList}/>
                                    <Route exact path="/dashboard/companies/create" name="Company Edit Page"
                                           component={CompanyForm}/>
                                    <Route exact path="/dashboard/companies/edit/:pk" name="Company Create Page"
                                           component={CompanyForm}/>


                                    <Route exact path="/dashboard/orders" name="Order List Page" component={OrderList}/>
                                    <Route exact path="/dashboard/orders/create" name="Order Edit Page" component={OrderForm}/>
                                    <Route exact path="/dashboard/orders/edit/:pk" name="Order Create Page"
                                           component={OrderForm}/>

                                </Switch>
                            </div>
                        </Grid.Row>
                    </Grid>
                </Sidebar.Pusher>
            </Sidebar.Pushable>



        </LoginRequired>

    );

}
