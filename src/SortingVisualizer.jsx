import React, {Component} from 'react'
import Bar from "./Bar"
import FlipMove from 'react-flip-move'
import Slider from 'react-input-slider';

var ARRAY_LENGTH =10;
var SLEEP = 1000

export default class SortingVisualizer extends Component{
    constructor(){
        super()
        this.state = {
            array :[],
            curr:null,
            sleep :5,
        };

    }

    componentDidMount(){
        this.resetArray();
    }
    resetArray(){
        var array=[]
        for (let i = 0; i < ARRAY_LENGTH; i++) {
            var bar = {value: randomIntFromInterval(10,1000), state: 'unsorted',id : Date.now() * i+1}
            array.push(bar)
        }
        
        this.setState({array})
        this.setState({curr:null})
    }
    
    updateLength(x){
        if (x === this.state.array.length)
            return
        this.setState({array:[]})
        ARRAY_LENGTH = x; 
        this.resetArray()
        
    }
    updateSpeed(x){
        this.setState({sleep:x})
        let newsped = ((5/this.state.sleep)*100) 
        SLEEP = newsped
        console.log(SLEEP)    
    }

    render(){
        const {array,curr,sleep} = this.state 
        var duration = 10;
        if (sleep > 200 || array.length > 60)
            duration = 0 
        return(<div>
            <div className='navbar'>

                <button onClick={() =>this.resetArray()}>Generate new array</button>
                <button onClick={() => this.doBubbleSort(array)}>Bubble Sort</button>
                <button onClick={() => this.doSelectionSort(array)}>Selection Sort</button>
                <div style={{width:'25vw'}}>
                <Slider styles={{margin:'10px'}} axis="x" x={ARRAY_LENGTH} xmin={5} xmax={100} onChange={({x}) => this.updateLength(x)}/>
                <Slider axis="x" x={this.state.sleep} xmin={5} xmax={300} onChange={({x}) => this.updateSpeed(x)}/>
                </div>
            </div>
                 <div className='container'>
                     <FlipMove className='container' enterAnimation="none" leaveAnimation='none' duration={duration} >

                {array.map((bar, idx) =>(
                    <Bar key={bar.id} height ={bar.value} active={curr === idx} state={bar.state}></Bar>
                    ))}
                    </FlipMove>
            </div>
            </div>
        )
    }

    setBarState(idx,state){
        let newArray= this.state.array
        newArray[idx].state = state
        this.setState({array:newArray})
    }
    swap(array,a,b)
    {
    let temp = array[a]
    array[a] = array[b]
    array[b] = temp
    this.setState({array: array})
    }
    
    async doBubbleSort(arr)
    {
        var len = arr.length;
        for (var i = 0; i < len ; i++) {
          for(var j = 0 ; j < len - i - 1; j++){
            this.setState({curr:j}) 
            let prevState = arr[j+1].state
            this.setBarState(j+1,'compare')
            await sleep(SLEEP)
            this.setBarState(j+1,prevState)
            if (arr[j].value < arr[j + 1].value) {
                this.setState({curr:j+1})
                this.swap(arr,j,j+1)
                this.setBarState(j,'unsorted')
                await sleep(SLEEP) 
            }
            this.setState({array: arr})
        }
            this.setBarState(len-i-1,'sorted')
        }
        this.setBarState(0,'sorted')
    }

    async doSelectionSort(arr)
    {
        let n = arr.length;
        for(let i = 0; i < n; i++) {
            let min = i;
            this.setBarState(min,'compare')
            await sleep(SLEEP)
            for(let j = i+1; j < n; j++){
                this.setState({curr:j})
                await sleep(SLEEP)
                if(arr[j].value > arr[min].value) {
                    this.setBarState(min,'unsorted')
                    min=j; 
                    this.setBarState(min,'compare')
                }
             }
             if (min !== i) {
                 this.swap(arr,i,min)
                 this.setBarState(i,'sorted')
            }
            this.setBarState(i,'sorted')
        }
    }

}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
