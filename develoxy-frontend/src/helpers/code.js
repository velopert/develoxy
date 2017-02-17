function solution(N) {
    // convert N to array of integers
    let array = (N + "")
                    .split("")
                    .map(str => parseInt(str));

    // sort the array
    array.sort((a,b)=>a<b));
    
    // convert array to integer
    const number = parseInt(array.join(''));
    
    return number;
}