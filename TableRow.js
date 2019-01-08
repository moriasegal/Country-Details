import React from 'react';
export default function (props){
    return (
            <tr onClick = {props.onClick}>
            {props.checkboxData.map((val,idx)=>
                <td key={idx}>
                    {(val.type==="string")?props.info[val.name]:(<img src={props.info[val.name]} width="100%"/>)}
                </td>)
            }
        </tr>
    )
}