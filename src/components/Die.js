import React from "react";
import One from "../images/one.png";
import Two from "../images/two.png";
import Three from "../images/three.png";
import Four from "../images/four.png";
import Five from "../images/five.png";
import Six from "../images/six.png";

export default function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? "#4f94d4" : "white"
    }
    const value = parseInt(props.value);
    let img;

    if (value === 1) {
        img = (
            <img src={One} alt="1" className="img"/>
        );
    } else if (value === 2) {
        img = (
            <img src={Two} alt="2" className="img"/>
        );
    } else if (value === 3) {
        img = (
            <img src={Three} alt="3" className="img"/>
        );
    } else if (value === 4) {
        img = (
            <img src={Four} alt="4" className="img"/>
        );
    } else if (value === 5) {
        img = (
            <img src={Five} alt="5" className="img"/>
        );
    } else if (value === 6) {
        img = (
            <img src={Six} alt="6" className="img"/>
        );
    } 
    return(
        
            <div className="die" style={styles}  onClick={props.holdDice}>  {img} </div>
       

    )
}