
export const bubbleSort = (stateArray) => {
    let array = stateArray.slice(0);

    let animations = [];
    let isSorted = false;

    while (!isSorted) {
        isSorted = true;
        for (let i = 0; i < array.length - 1; i++) {
            let animation = {};
            animation.comparison = [i, i + 1];

            if (array[i] > array[i + 1]) {
                animation.swap = [i, i + 1];
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                isSorted = false;

            }

            animations.push(animation);
        }

    }

    return animations;
}


export const quickSort = (stateArray) => {
    let array = stateArray.slice(0);
    let animations = [];
    quickSortHelper(array, 0, array.length - 1, animations)
    return animations;
}


export const quickSortHelper = (array, startIdx, endIdx, animations = []) => {
    if (startIdx >= endIdx) {
        // animations.push([startIdx]);
        return;

    }

    let pivotIdx = startIdx;
    let leftIdx = startIdx + 1;
    let rightIdx = endIdx;

    // animations.push({ pivotIdx: pivotIdx });
    // animations.push({ initial_comparison: [leftIdx, rightIdx] });

    while (rightIdx >= leftIdx) {
        // const animation = {};
        // animation.comparison = [startIdx, startIdx + 1];
        animations.push({ comparison: [leftIdx, rightIdx] })

        if (array[rightIdx] < array[pivotIdx] && array[leftIdx] > array[pivotIdx]) {
            animations.push({ comparison: [leftIdx, rightIdx], swap: [leftIdx, rightIdx] })
            let temp = array[leftIdx];
            array[leftIdx] = array[rightIdx];
            array[rightIdx] = temp;

            // animations.push({ slice: array.slice(0) });
            // animations.push([]);
        }

        if (array[leftIdx] <= array[pivotIdx]) {
            leftIdx += 1;
        }

        if (array[rightIdx] >= array[pivotIdx]) {
            rightIdx -= 1;
        }

        // if (rightIdx >= leftIdx) {
        //     animations.push({ beforeswap: [leftIdx, rightIdx] })
        // };

    }

    // animations.push([pivotIdx, rightIdx]);

    // swap(pivotIdx, rightIdx, array)

    if (pivotIdx !== rightIdx) {
        let temp = array[rightIdx];
        array[rightIdx] = array[pivotIdx];
        array[pivotIdx] = temp;
        animations.push({ comparison: [pivotIdx, rightIdx], swap: [pivotIdx, rightIdx] });
        // animations.push(array.slice(0));
        // animations.push([]);
        // animations.push([rightIdx]);
    }


    let leftSubarrayisSmaller = rightIdx - 1 - startIdx < endIdx - (rightIdx + 1);

    if (leftSubarrayisSmaller) {
        quickSortHelper(array, startIdx, rightIdx - 1, animations);
        quickSortHelper(array, rightIdx + 1, endIdx, animations);
    } else {
        quickSortHelper(array, rightIdx + 1, endIdx, animations);
        quickSortHelper(array, startIdx, rightIdx - 1, animations);
    }
}

// export const swap = (i, j, array) => {
//     let temp = array[i];
//     array[i] = array[j];
//     array[j] = temp;
// }

export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // We overwrite the value at index k in the original array with the
            // value at index i in the auxiliary array.
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            // We overwrite the value at index k in the original array with the
            // value at index j in the auxiliary array.
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, i]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, i]);
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([j, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([j, j]);
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}