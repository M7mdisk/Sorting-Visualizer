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
    
    updateLengthAndSpeed(x){
        if (x === this.state.array.length)
            return
        this.setState({array:[]})
        ARRAY_LENGTH = x; 
        this.resetArray()
        this.setState({sleep:x})
        let newsped = (-1000/95)*(this.state.sleep-100) 
        SLEEP = newsped
    }   
    StopSorting(){
        window.location.reload();
    }

    render(){
        const {array,curr,sleep} = this.state 
        var duration = 100;
        if (array.length > 60)
            duration = 0 
        return(<div>
            <ul>
                <li><a  onClick={() => this.resetArray()}>Generate new array</a></li>
                <li style={{ padding:'30px'}}>
                    <p style={{color:'white'}}>change array speed & length</p>
                <Slider className='slider' styles={{margin:'10px'}} axis="x" x={ARRAY_LENGTH} xmin={5} xmax={100} onChange={({x}) => this.updateLengthAndSpeed(x)}/>
                </li>
                <li><a onClick={() => this.doBubbleSort(array)}>Start Bubble Sort</a></li>
                <li><a  onClick={() => this.doSelectionSort(array)}>Start Selection Sort</a></li>
                <li><a  onClick={() => this.doSelectionSort(array)}>Start Insertion Sort</a></li>
                <li style={{ borderRight:'none'}}><a  onClick={() => this.StopSorting()}>Restart Everything!</a></li>
            </ul>
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
        this.setState({running:true})
        while(this.state.running == true){
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
        this.setState({running:false})
        }
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

    async doInsertionSort(arr){
        for (let i = 1; i < arr.length; i++) {
            let j = i - 1
            this.setState({curr:j})
            this.setBarState(j,'sorted')
            await sleep(SLEEP)
            let temp = arr[i]
            this.setBarState(i,'compare')
            await sleep(SLEEP)
            this.setBarState(i,'sorted')
            while (j >= 0 && arr[j].value < temp.value) {
              arr[j + 1] = arr[j]
              j--
            }
            arr[j+1] = temp
            this.setBarState(j+1,'compare')
            this.setBarState(j+1,'sorted')
          }
        this.setState({array:arr});
    }

}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
