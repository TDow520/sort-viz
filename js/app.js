const ctx = document.getElementById('myChart').getContext('2d');

//Generate array with random numbers between 0 and 100
function generateArray() {
    let array = [];
    for (let i = 0; i < 20; i++) {
        array.push(Math.floor(Math.random() * 100));
    }
    return array;
}


let array = generateArray();
let colorsArray = generateColorsArray();
//Bubble sort
async function bubbleSort(array) {
    let sortedArray = [...array];
    let temp;
    for (let i = 0; i < sortedArray.length; i++) {
        for (let j = 0; j < sortedArray.length - 1; j++) {
            if (sortedArray[j] > sortedArray[j + 1]) {
                temp = sortedArray[j];
                sortedArray[j] = sortedArray[j + 1];
                sortedArray[j + 1] = temp;
                //console.log(sortedArray);
                //delay
                await new Promise(resolve => setTimeout(resolve, 500))
                    .then(updateChart(sortedArray, 'bubble sort'));
            }
        }
    }
    return sortedArray;
}

async function mergeSort(array) {
    // check if the array has more than one element
    if (array.length > 1) {
      // split the array into two halves
        let mid = Math.floor(array.length / 2);
        let left = array.slice(0, mid);
        let right = array.slice(mid);

        // recursively sort the two halves
        left = mergeSort(left);
        right = mergeSort(right);
    
        // merge the two sorted halves into the original array
        array = merging(left, right);
        await new Promise(resolve => setTimeout(resolve, 500))
            .then(updateChart(array, 'Merge Sort'))
    }

    return array;
}

function merging(left, right) {
    // create new arrays to avoid modifying the original ones
    let newLeft = [...left];
    let newRight = [...right];

    // initialize variables for iteration and result array
    let i = 0;
    let j = 0;
    let k = 0;
    let result = [];
    
    // compare elements from both arrays and add the smaller one to the result array
    
    while (i < left.length && j < right.length) {
        if (newLeft[i] <= newRight[j]) {
            result[k] = newLeft[i];
            i++;
        } else {
            result[k] = newRight[j];
            j++;
        }
        k++;
    }
    
    // add any remaining elements from the left array to the result array
    while (i < left.length) {
        result[k] = left[i];
        i++;
        k++;
    }
    
    // add any remaining elements from the right array to the result array
    while (j < right.length) {
        result[k] = right[j];
        j++;
        k++;
    }
    
    return result;
}

async function selectionSort(array){
    let min 
    for(let i = 0; i < array.length; i++){
        min = i
        for( let j= 0; j < array.length; j++){
            if(array[j] > array[min]){
                min = j
                change(array, min, i)
                await new Promise(resolve => setTimeout(resolve, 500))
                    .then(updateChart(array, 'Selection Sort'))
            }
        }
    }
    return array
}

function change(array, xPos, yPos){
    let temp = array[xPos]
    array[xPos] = array[yPos]
    array[yPos] = temp
}
// console.log(mergeSort(array))
console.log(selectionSort(array))
// bubbleSort(array);
var colors = generateColorsArray();
//updateChart(array, 'bubble sort');
function updateChart(array, chartLabel) {
    let chartStatus = Chart.getChart("myChart"); // <canvas> id
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [...array],
            datasets: [{
                label: chartLabel,
                data: [...array],
                backgroundColor: generateColorsArrayUsingArrayValues(array),
                borderColor: generateColorsArrayUsingArrayValues(array),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            animation: {
                duration:0
            },
            responsive: true,
            maintainAspectRatio: false,
            
        }
    });
}

// generate random colors array
function generateColorsArray() {
    let colors = [];
    for (let i = 0; i < 20; i++) {
        colors.push(`rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`);
    }
    return colors;
}
// generate colors using array values
// generate random colors array
function generateColorsArrayUsingArrayValues(array) {
    let colors = [];
    for (let i = 0; i < array.length; i++) {
        colors.push(generateColorBasedOnNumberValue(array[i]));
    }
    return colors;
}

    
function generateColorBasedOnNumberValue(number) {
    let colorVal = mapNumberToBetween0And255(number);
    let color = `rgb(${colorVal}, ${colorVal}, ${colorVal})`;
    return color;
}
function mapNumberToBetween0And255(number) {
    let mappedNumber = Math.floor(number * 2.55);
    return mappedNumber;
}
//assign colors to array values
function assignColorsToValues(array, colors) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        newArray.push({ value: array[i], color: colors[i] });
    }
    return newArray;
}
