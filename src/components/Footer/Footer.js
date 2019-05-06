import React, { Component } from 'react';

import './Footer.scss';

class Footer extends Component {
    state = {
      t: "\u0043\u006f\u006e\u0074\u0061\u0063\u0074",
      c1: "\u004d\u0061\u0069\u006c\u003a \u0069\u006e\u0066\u006f",
      c2: "\u0040\u0073\u006f\u0075\u0072\u0063\u0065\u0065",
      c3: "\u0073\u0074\u0061\u0074\u0065",
      c4: "\u006d\u0070\u0069\u0072\u0065\u002e\u0069\u006f"
    }

    render() {
	    return (
          <footer className="footer">
            <h2 className="title">{this.state.t}</h2>
            <p className="c">{this.state.c1}</p>
            <p className="inter">app</p>
            <p className="c">{this.state.c2}</p>
            <p className="inter">{this.state.c3}</p>
            <p className="c">{this.state.c4}</p>
            <p className="copyright">© Source Empire AB 2019</p>
          </footer>
		)
	}
}

export default Footer;
