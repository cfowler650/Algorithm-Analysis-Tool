import React from 'react';
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms';
import './SortingVisualizer.css';


export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: []
        }

    }

    componentDidMount() {
        this.resetArray();
        // this.testSortingAlgorithms();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 100; i++) {
            array.push(randomIntFromInterval(5, 300));
        }
        this.setState({ array });
    }

    mergeSort() {

    }


    quickSort() {
        console.log('originalarray', this.state.array)
        const animations = sortingAlgorithms.quickSort(this.state.array);
        console.log(animations)


        for (let i = 0; i < animations.length; i++) {
            const { comparison, swap } = animations[i];
            setTimeout(() => {
                const arrayBars = document.getElementsByClassName('array-bar');
                arrayBars[comparison[1]].style.backgroundColor = 'red';
                arrayBars[comparison[0]].style.backgroundColor = 'red';
                setTimeout(() => {
                    arrayBars[comparison[1]].style.backgroundColor = 'turquoise';
                    arrayBars[comparison[0]].style.backgroundColor = 'turquoise';
                }, i * 2);
                if (swap) {
                    setTimeout(() => {
                        const tempHeight = arrayBars[comparison[1]].style.height;
                        arrayBars[comparison[1]].style.height = arrayBars[comparison[0]].style.height
                        arrayBars[comparison[0]].style.height = tempHeight;
                    });
                }

            }, i * 2);

        }
    }


    heapSort() {

    }


    bubbleSort() {
        const animations = sortingAlgorithms.bubbleSort(this.state.array);

        console.log(animations)

        for (let i = 0; i < animations.length; i++) {
            const { comparison, swap } = animations[i];
            setTimeout(() => {
                const arrayBars = document.getElementsByClassName('array-bar');
                arrayBars[comparison[1]].style.backgroundColor = 'red';
                arrayBars[comparison[0]].style.backgroundColor = 'red';
                setTimeout(() => {
                    arrayBars[comparison[1]].style.backgroundColor = 'turquoise';
                    arrayBars[comparison[0]].style.backgroundColor = 'turquoise';
                }, i * 2);
                if (swap) {
                    setTimeout(() => {
                        const tempHeight = arrayBars[comparison[1]].style.height;
                        arrayBars[comparison[1]].style.height = arrayBars[comparison[0]].style.height
                        arrayBars[comparison[0]].style.height = tempHeight;
                    });
                }

            }, i * 2);
        }
    }


    testSortingAlgorithms() {
        for (let i = 0; i < 100; i++) {
            const array = []
            const length = randomIntFromInterval(1, 1000);
            for (let i = 0; i < length; i++) {
                array.push(randomIntFromInterval(-1000, 1000));
            }
            const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
            const bubbleSortedArray = sortingAlgorithms.quickSort(array.slice());
            console.log(arraysAreEqual(javaScriptSortedArray, bubbleSortedArray));
        }
    }




    render() {
        const { array } = this.state;

        return (
            <div className="main-content">
                <div className="array-container">
                    <div className="bars-container">
                        {array.map((value, idx) => (
                            <div
                                className="array-bar"
                                key={idx}
                                style={{ height: `${value}px` }}></div>
                        ))}
                    </div>
                    <div className="btn-group">
                        <button className="generate-btn" onClick={() => this.resetArray()}>Generate Array</button>
                        <button className="merge-btn" onClick={() => this.mergeSort()}>Merge Sort</button>
                        <button className="quick-btn" onClick={() => this.quickSort()}>Quick Sort</button>
                        <button className="heap-btn" onClick={() => this.heapSort()}>Heap Sort</button>
                        <button className="generate-btn" onClick={() => this.bubbleSort()}>Bubble Sort</button>
                        {/* <button onClick={() => this.testSortingAlgorithms()}>Test Sorting Algs</button> */}
                    </div>
                </div>
            </div>
        );
    }
}

//from https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
    //min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {

    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]) return false;
    }

    return true;
}