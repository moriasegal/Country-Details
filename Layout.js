import React from 'react';
import CountriesTable from "./CountriesTable";
import CountryDetails from "./CountryDetails";

export default class Layout extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currentCountryName:""
        }
    }
    
    currentCountryName(currentCountryName){
        const newState=this.state;
        newState['currentCountryName']=currentCountryName;
        this.setState(newState);
    }
    
    
    render() {
        return (
            <div className="layoutContainer">
                <h1 className="title">Countries</h1>
                <div className="mainContainer">
                    <CountriesTable currentCountryName={currentCountryName=>this.currentCountryName(currentCountryName)} />
                    <CountryDetails currentCountryName={this.state.currentCountryName} />
                </div>
            </div>
        );
    }
}