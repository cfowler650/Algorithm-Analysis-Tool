
export const bubbleSort = (array) => {
    const animations = [];
    let isSorted = false;

    while (!isSorted) {
        isSorted = true;
        for (let i = 0; i < array.length - 1; i++) {
            const animation = {};
            animation.comparison = [i, i + 1]
            if (array[i] > array[i + 1]) {
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