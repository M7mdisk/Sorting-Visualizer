import React, {Component} from 'react'
import {bubbleSort} from './Algorithms'
import Bar from "./Bar"

const ARRAY_LENGTH = 5;
const SLEEP = 5000/ARRAY_LENGTH
export default class SortingVisualizer extends Component{
    constructor(){
        super()
        this.state = {
            array :[],
            curr:null,
            states:[]		
        };
    }
    componentDidMount(){
        this.resetArray();
    }
    resetArray(){
        var array = Array.from({length: ARRAY_LENGTH}, () => randomIntFromInterval(10,1000))
        var states = Array.from({length: ARRAY_LENGTH}, ()=>'unsorted' );
        this.setState({states})
        this.setState({array})
        this.setState({curr:null})
    }

    render(){
        const {array,curr,states} = this.state 
        return(<div>
            <div className='navbar'>

                <button onClick={() =>this.resetArray()}>Generate new array</button>
                <button onClick={() => this.doBubbleSort(array,states)}>Bubble Sort</button>
                <button onClick={() => this.doSelectionSort(array,states)}>Selection Sort</button>
            </div>
                 <div className='container'>
                {array.map((value, idx) =>(
                         <Bar key={idx} height ={value} active={curr == idx} state={states[idx]}></Bar>
                ))}
            </div>
            </div>
        )
    }

    setBarState(idx,state){
        let newStates = this.state.states
        newStates[idx] = state
        this.setState({states:newStates})
    }
    async doBubbleSort(arr,states)
    {
        for (let i = 0; i < arr.length; i++) {
            for (let j=0, stop=arr.length-i; j < stop; j++)
            {
                this.setState({curr:j}) 
                let prevstate = states[j+1]
                if(j+1 !== stop){
                    this.setBarState(j+1,'compare')
                }
                await sleep(SLEEP)
                this.setBarState(j+1,prevstate)
                if(arr[j] < arr[j+1]){
                    this.setState({curr:j+1}) 
                    swap(arr,j,j+1)
                    swap(states,j,j+1)        
                    this.setBarState(j,'unsorted')
                }
                this.setState({array: arr})
                if (stop-1 === j+1){
                    this.setBarState(j+1,'sorted')
                }
            }
        }
        this.setBarState(0,'sorted')

    }
    async doSelectionSort(arr,states)
    {
        let n = arr.length;
        for(let i = 0; i < n; i++) {
            let min = i;
            this.setBarState(min,'compare')
            await sleep(SLEEP)
            for(let j = i+1; j < n; j++){
                this.setState({curr:j})
                this.setBarState(min,'compare')
                await sleep(SLEEP)
                if(arr[j] > arr[min]) {
                        min=j; 
                }
             }
             if (min != i) {
                 swap(arr,i,min)
                 swap(states,i,min)
                 this.setState({array: arr})
                 this.setBarState(i,'sorted')
            }
            this.setState({array: arr})
        }
        this.setState({array: arr})
    }
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function swap(array,a,b)
{
    let temp = array[a]
    array[a] = array[b]
    array[b] = temp
}