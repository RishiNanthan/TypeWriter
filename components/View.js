import React, {Component} from 'react';
import KeyBoard from './KeyBoard';


const PREV_WORD_LEN = 5;
const CURR_WORD_LEN = 10;

export default class View extends Component{
    constructor(props){
        super(props);
        this.letters = props.letters;
        this.no_letters = 0;

        var chars = this.get_characters(CURR_WORD_LEN);
        
        this.state = {
            characters: chars,
            previous_characters: "",
            value: "",
            error_key: null,
            highlight_key: chars[0],
        }

        this.get_characters = this.get_characters.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    get_characters(n){
        var c = "";
        for(var i=0; i<n; i++){
            var v = Math.floor( Math.random()*100 ) % this.letters.length;
            c += this.letters[v];
        }
        return c;
    }

    get_list_for_chars(s, className=null){
        var list = [];
        for(var i=0; i<s.length; i++){
            list.push(
                <div className={className} key={this.no_letters}>{ s[i] === " " ? "space" : s[i] }</div>
            );
            this.no_letters += 1;
        }
        return list;
    }

    changeHandler(event){
        event.persist();
        var word = event.target.value;
        var letter = word[word.length-1];
        var previous_word = this.state.previous_characters
        if(previous_word.length === PREV_WORD_LEN){
            previous_word = previous_word.slice(1) + letter;
        }
        else{
            previous_word += letter;
        }

        if(letter === this.state.characters[0]){
            this.setState((cur)=>{
                return {
                    characters: cur.characters.slice(1) + this.get_characters(1),
                    previous_characters: previous_word,
                    value: word,
                    highlight_key: cur.characters[1],
                    error_key: null,
                }
            });
        }
        else if(letter !== " "){
            this.setState((cur)=>{
                return {
                    ...cur,
                    error_key: letter,
                }
            })
        }
    }

    //<KeyBoard error_key={this.state.error_key} highlight_key={this.state.highlight_key}/>

    render(){
        console.log(this.state.error_key);
        console.log(this.state.highlight_key)
        return (
            <div>
                <div className="characters">
                    { this.get_list_for_chars(this.state.previous_characters, "list")}
                    <div className="highlight">
                        { this.state.characters[0] === " " ? "space" : this.state.characters[0] }
                    </div>
                    { this.get_list_for_chars(this.state.characters.slice(1), "list")}
                </div>
                <div>
                    <center>
                        <input className="inputchars" type="text" value={this.state.value} autoFocus onChange={this.changeHandler}/>
                    </center>
                </div>
                <center>
                    <KeyBoard error_key={this.state.error_key} highlight_key={this.state.characters[0]}/>
                </center>
            </div>
        );
    }
}