import React, {Component} from 'react'
import Bar from "./Bar"
import FlipMove from 'react-flip-move'
const ARRAY_LENGTH =10;
const SLEEP = 4000/ARRAY_LENGTH
export default class SortingVisualizer extends Component{
    constructor(){
        super()
        this.state = {
            array :[],
            curr:null,
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

    render(){
        const {array,curr} = this.state 
        return(<div>
            <div className='navbar'>

                <button onClick={() =>this.resetArray()}>Generate new array</button>
                <button onClick={() => this.doBubbleSort(array)}>Bubble Sort</button>
                <button onClick={() => this.doSelectionSort(array)}>Selection Sort</button>
            </div>
                 <div className='container'>
                     <FlipMove className='container' duration='100'>

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
    // ANIMATING SWAP
    
    //SWAPPING STATE ARRAY
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

    // async doSelectionSort(arr,states)
    // {
    //     let n = arr.length;
    //     for(let i = 0; i < n; i++) {
    //         let min = i;
    //         this.setBarState(min,'compare')
    //         await sleep(SLEEP)
    //         for(let j = i+1; j < n; j++){
    //             this.setState({curr:j})
    //             this.setBarState(min,'compare')
    //             await sleep(SLEEP)
    //             if(arr[j] > arr[min]) {
    //                     min=j; 
    //             }
    //          }
    //          if (min != i) {
    //              swap(arr,i,min)
    //              swap(states,i,min)
    //              this.setState({array: arr})
    //              this.setBarState(i,'sorted')
    //         }
    //         this.setState({array: arr})
    //     }
    //     this.setState({array: arr})
    // }

}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

