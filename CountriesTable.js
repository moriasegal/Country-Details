import React from 'react';
import axios from 'axios';
import Row from './TableRow';

export default class CountriesTable extends React.Component{
    constructor(props){
        super(props);
        this.state={data:[], 
            search:"", 
            range:"",
            checkboxData:[
                {isChecked:"true", name:"name", type:"string"},
                {isChecked:"true", name:"flag", type:"img"},
                {isChecked:"true", name:"population", type:"string"},
                {isChecked:"true", name:"area", type:"string"},
                {isChecked:"true", name:"alpha2Code", type:"string"},
                {isChecked:"true", name:"nativeName", type:"string"},
                {isChecked:"true", name:"capital", type:"string"},
                {isChecked:"true", name:"gini", type:"string"}
            ]
        }
    }
        
    toggleChange(e){
        const checkboxData = Object.assign([],this.state.checkboxData);
        const index = checkboxData.findIndex((x) => e.target.value === x.name);
        checkboxData[index].isChecked = !checkboxData[index].isChecked;
        this.setState({checkboxData});
    }

    componentDidMount(){
        axios.get('http://restcountries.eu/rest/v2').then(response=>{

            this.setState({
                data:response.data
            })
        })
    }
    
    shouldComponentUpdate(nextProps,nextState){
        return (this.state.data !== nextState.data)||
                (this.state.checkboxData!== nextState.checkboxData)||
                (nextState.search !== this.state.search)||
                (nextState.range !== this.state.range)
    }

    updateField(e){
        const newState=Object.assign({},this.state);
        newState[e.target.id]=e.target.value;
        this.setState(newState);
    }
    
    createCollection(){
        const {search,range}=this.state;
        if(!search && !range){
            return this.state.data;
        }
        if(!search && range){
            return this.filterByRange(this.state.data);
        }
        if(search && !range){
            return this.filterBySearch(this.state.data);
        }
        return this.filterByRange(this.filterBySearch(this.state.data))
    }
    
    filterByRange(collection){
        return collection.filter(x=>x.population<this.state.range);
    }
    
    filterBySearch(collection){
        return collection.filter(x=>x.name.toLowerCase().indexOf(this.state.search)!==-1);
    }
    
    filterByisChecked(checkboxData){
       return checkboxData.filter(x => x.isChecked)
    }
    
    currentCountryName(countryName){
        this.props.currentCountryName(countryName.name);
    }
    
    render(){
        const dataToRender=this.createCollection();
        return (
            <div className="countriesTable panel panel-default">
                <div className="panel-heading">
                    <div className="checkboxContainer">{this.state.checkboxData.map((x,idx)=>
                        <label htmlFor={idx} key = {idx}>{x.name}
                            <input type="checkbox" id={idx} className="checkbox2"  value ={x.name} checked={x.isChecked} onChange={e=>this.toggleChange(e)}/>
                        </label>)}
                    </div>
                    <input type="text" id="search"  value={this.state.search} placeholder="Search country" onChange={e=>this.updateField(e)}/>
                    <label>Population range:</label>
                    <input type="range"  id="range" min="0" max="1377422167" value={this.state.range} onChange={e=>this.updateField(e)}/>
                    <div>{this.state.range}</div>
                </div>
                <div className="panel-body">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                {this.filterByisChecked(this.state.checkboxData).map((val,idx)=><th key={idx}>{val.name}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                        {dataToRender.map((current,i)=><Row key={i} onClick={() => this.currentCountryName(current)} info={current} checkboxData={this.filterByisChecked(this.state.checkboxData)}/>)}
                        </tbody>
                    </table>
                </div>
            </div>)

    }
}