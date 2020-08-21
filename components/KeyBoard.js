import React, {Component} from 'react';


const ROW1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const ROW2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'];
const ROW3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/'];

export default class KeyBoard extends Component{
    constructor(props){
        super(props);

        this.get_key_row = this.get_key_row.bind(this);
        this.get_key_column = this.get_key_column.bind(this);
        this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState){
        let update = nextProps.error_key !== this.props.error_key || nextProps.highlight_key !== this.props.highlight_key; 
        return update;
    }

    get_key_row(s){
        let row = [];
        let error;
        let highlight;

        for(let i=0; i<s.length; i++){
            error = false;
            highlight = false;
            if(this.props.error_key !== null && this.props.error_key.toUpperCase() === s[i].toUpperCase())
                error = true;
            else if(this.props.highlight_key !== null && this.props.highlight_key.toUpperCase() === s[i].toUpperCase())
                highlight = true;
            row.push(this.get_key_column(s[i], error, highlight));
        }
        return row;
    }

    get_key_column(c, error, highlight){
        let class_name = "key";
        if(error)
            class_name += " error-key";
        else if(highlight)
            class_name += " highlight-key";
        console.log(error + " " + highlight);
        console.log(c + "  " + class_name);
        return (
            <div className={class_name} key={c}>{ c.toUpperCase() }</div>
        );
    }

    render(){        
        return(
            <div className="keyboard">
                <div className="key-row" key="row1">
                    { this.get_key_row(ROW1) }
                </div>
                <div className="key-row" key="row2">
                    { this.get_key_row(ROW2) }
                </div>
                <div className="key-row" key="row3">
                    { this.get_key_row(ROW3) }
                </div>

            </div>
        );
    }
}