import React from 'react';
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms';
import './SortingVisualizer.css';

import { getMergeSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            bestTime: null,
            bestSpace: null,
            worstTime: null,
            worstSpace: null,
            hidden: 'hidden'
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
        this.setState({ ...this.state, bestTime: 'O(nLog(n))', bestSpace: 'n', worstTime: 'O(nLog(n))', worstSpace: 'n', hidden: 'visible' })
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? 'red' : 'turquoise';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * 2);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * 2);
            }
        }
    }

    quickSort() {
        this.setState({ ...this.state, bestTime: 'O(nLog(n))', bestSpace: 'O(Log(n))', worstTime: 'O(n^2)', worstSpace: 'O(Log(n))', hidden: 'visible' })

        const animations = sortingAlgorithms.quickSort(this.state.array);


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
        this.setState({ ...this.state, bestTime: 'O(n)', bestSpace: 'O(1)', worstTime: 'O(n^2)', worstSpace: 'O(1)', hidden: 'visible' })

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
            <>
                <div className="main-content" style={{}}>
                    <div>
                        <div className="array-container" >
                            <div className="bars-container">
                                {array.map((value, idx) => (
                                    <div
                                        className="array-bar"
                                        key={idx}
                                        style={{ height: `${value}px` }}></div>
                                ))}
                            </div>
                            <div className="btn-group" style={{ justifyContent: "center" }}>
                                <button id="btn" className="generate-btn" onClick={() => this.resetArray()}>Generate Array</button>
                                <button id="btn" className="merge-btn" onClick={() => this.mergeSort()}>Merge Sort</button>
                                <button id="btn" className="quick-btn" onClick={() => this.quickSort()}>Quick Sort</button>
                                {/* <button className="heap-btn" onClick={() => this.heapSort()}>Heap Sort</button> */}
                                <button id="btn" className="generate-btn" onClick={() => this.bubbleSort()}>Bubble Sort</button>
                                {/* <button onClick={() => this.testSortingAlgorithms()}>Test Sorting Algs</button> */}
                            </div>
                        </div>



                        <div className="times-container" style={{ visibility: `${this.state.hidden}`, justifyContent: "center" }}>
                            <div className="times-div" >
                                <div><p style={{ color: "white", fontWeight: "500" }}>Worst Case </p></div>
                                <div style={{}}>
                                    <p style={{ color: "white", letterSpacing: "2px", fontWeight: "500" }}><a style={{ letterSpacing: 0, margin: '0px', padding: '0px' }}>Time:</a> {this.state.worstTime} </p> </div>
                                <div style={{}}>
                                    <p style={{ color: "white", letterSpacing: "2px", fontWeight: "500" }}><a style={{ letterSpacing: 0, margin: '0px', padding: '0px' }}> Space: </a> {this.state.worstSpace}</p>
                                </div>
                            </div>

                            <div className="times-div">
                                <div><p style={{ color: "white", fontWeight: "500" }}>Best Case </p></div>
                                <div style={{}}>
                                    <p style={{ color: "white", letterSpacing: "2px", fontWeight: "500" }}><a style={{ letterSpacing: 0, margin: '0px', padding: '0px' }}>Time:</a> {this.state.bestTime} </p> </div>
                                <div style={{}}>
                                    <p style={{ color: "white", letterSpacing: "2px", fontWeight: "500" }}><a style={{ letterSpacing: 0, margin: '0px', padding: '0px' }}>Space:</a> {this.state.bestSpace}</p>
                                </div>
                            </div>

                        </div>





                    </div>
                </div>

            </>
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