import React, {Component} from 'react'

export default class SortingVisualizer extends Component{
    constructor(){
        super()
        this.state = {
            array :[],
        };
    }
    componentDidMount(){
        this.resetArray();
    }
    resetArray(){
        
        var array = Array.from({length: 100}, () => randomIntFromInterval(5,1000))
        this.setState({array})
    }

    render(){
        const {array} = this.state;
        return(<>
                {array.map((value, idx) =>(
                    <div className='bar' key={idx}>{value}
                    </div>
                ))}
            </>
        )
    }
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }