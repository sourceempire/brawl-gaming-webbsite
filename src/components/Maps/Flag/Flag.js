import React from 'react';

import './Flag.scss';

export default function Flag(props) {
    var countryCode = props.code.toString().toLowerCase();
return(
    <React.Fragment>
    <div className="country-display-container">
        <div className="flag-container">
            <img id='myImage' src={"/flags/"+countryCode+".png"} alt={"flag of " + props.name} draggable='false'/>
        </div>
        <p className="country-name">{props.name}</p>
    </div>
    </React.Fragment>
)
}
