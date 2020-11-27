import React, {Component} from 'react'
import SortingVisualizer from './SortingVisualizer.jsx'
export default class App extends Component{
    // eslint-disable-next-line
    constructor(){
        super()

    }
    render(){
        return(
            <div>
                <SortingVisualizer></SortingVisualizer>
            </div>
        )
    }
}
