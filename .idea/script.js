const arr = [{1:1}, {3:3}, {4:4}, {7:7}];
console.log(arr);
const arr2 = new Array(...arr);
console.log(arr2);
arr2[0][1] = 90;
arr[3][7] = "cheburek"
console.log(arr);
console.log(arr2);
arr[4] = 9;
console.log(arr);
arr[0] = "Zero";
console.log(arr);
console.log(arr2);

const obj = { f1: "", f2: { fo1: {}}};

Array.prototype.toString = function () {
    const original = this.join(", ");
    const now = new Date().toLocaleString();
    return `[${original}] (printed ${now})`;
}
const arr3 = ["a", "b", "c"];
console.log(arr3);
console.log("Array: " , arr3);
console.log("Array: " + arr3);
console.log(arr3.toString());