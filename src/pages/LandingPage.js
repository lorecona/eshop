import React from 'react';
import Banner from "../components/Banner";
import ShopList from "./ShopList";
import Browse from "../components/categories/Browse";


function LandingPage(){
    return(
        <div className="landingPage">
            <Banner/>
            <ShopList/>
        </div>
    );
}

export default LandingPage;