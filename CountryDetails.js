import React from 'react';
import axios from 'axios';

export default class CountryDetails extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }
        
       
    
    componentWillReceiveProps(nextProps) {
        if((nextProps.currentCountryName !== this.props.currentCountryName)){
            axios.get('https://restcountries.eu/rest/v2/name/'+nextProps.currentCountryName+'/').then(response=>{

                this.setState({
                    data:response.data
                })
            }) 
        }
    }
    
    render(){
        const data = this.state.data
		console.log(data);
        if(data[0] !== undefined){
            return <div className="countryDetails">
					<ul className="countryDetailsContainer">
						<li><img src={data[0].flag}/></li>
						<li><h4>{data[0].name} ({data[0].alpha3Code})</h4></li>
						<li><span>Capital:</span><span>{data[0].capital}</span></li>
						<li><span>Population:</span><span>{data[0].population}</span></li>
						<li><span>Native Name:</span><span>{data[0].nativeName}</span></li>
						<li><span>Languages:</span><ul>{data[0].languages.map((val,idx)=><li key = {idx}>{val.name}</li>)}</ul></li>
					</ul>
				</div>
        }
        return null
    }
}


