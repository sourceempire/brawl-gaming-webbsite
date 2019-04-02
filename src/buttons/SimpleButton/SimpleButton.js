import React from 'react';

import './SimpleButton.scss';

const SimpleButton = ({ buttonText, size, color, onClick }) => {

return (
<button className={`simple-button ${color}`} style={size} onClick={onClick}>
<p>{buttonText}</p>
</button>
)
}

export default SimpleButton;