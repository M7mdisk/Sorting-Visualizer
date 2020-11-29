import React, {Component} from 'react'
import SortingVisualizer from './SortingVisualizer.jsx'
import './style.css'
export default class App extends Component{
    // eslint-disable-next-line
    constructor(){
        super()

    }
    render(){
        return(
                <SortingVisualizer></SortingVisualizer>
        )
    }
}
