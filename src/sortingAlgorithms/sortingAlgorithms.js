
export const bubbleSort = (array) => {
    const animations = [];
    let isSorted = false;

    while (!isSorted) {
        isSorted = true;
        for (let i = 0; i < array.length - 1; i++) {
            const animation = {};
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