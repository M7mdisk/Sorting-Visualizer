import React, {Component} from 'react'

export default class Bar extends Component{
    // constructor(props){
    //     super(props)
    // }
    render(){
        let className = "bar"
        if(this.props.active)
        {
            className += " active"
        }
        if(this.props.state === "sorted")
        {
            className = 'bar sorted'
        }
        if(this.props.state === "compare")
        {
            className = 'bar compare'
        }
            return <div className={className}  style={{height: `calc((100vh - ${this.props.height*0.1}vh)*0.75)`}} ></div>
    }
}

// function arrow(){
//     return <div className='arrow-down'> </div>
// }