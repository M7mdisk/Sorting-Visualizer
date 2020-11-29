function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

export function bubbleSort(array){
    for (let i = 0; i < array.length; i++) {
        for (let j=0, stop=array.length-i; j < stop; j++){
        if(array[j] < array[j+1])
        {
            swap(array,j,j+1)
        }
        }
    }
    return array
}

function selectionSort(array){
    for (let i = 0; i < array.length; i++) {
        let min = i
        for (let j = 0; j < array.length; j++) 
        {
            if(array[j] < min) min = array[j]
        }    
        var temp = array[i];
        array[i] = array[min];
        array[min] = temp;
        
    }
    return array
}

function swap(array,a,b)
{
    let temp = array[a]
    array[a] = array[b]
    array[b] = temp
}

