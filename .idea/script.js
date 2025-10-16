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

Array.prototype.feel = function() {
    if (this.length === 0) return "😢 Я пустой массив";
    if (this.length <= 3) return "🙂 Я скромный массив";
    return "Я 😎! У меня уже " + this.length + " элементов!";
};

//======НЕВЕРНОЕ РЕШЕНИЕ====================
const originalPush = Array.prototype.push;
const originalPop = Array.prototype.pop;

Array.prototype.push = function(...args) {
    console.log(`Добавляем: ${args}`);
    return originalPush.apply(this, args);
};

Array.prototype.pop = function() {
    const item = originalPop.apply(this);
    console.log(`Удалили: ${item}`);
    return item;
};

//========================Чуть лучше======================
// const _push = Array.prototype.push;
// let _logging = false;
//
// Array.prototype.push = function(...values) {
//     const len = this.length;
//     values.reduce((i, v) => { this[i] = v; return i + 1; }, len);
//
//     if (!_logging) {
//         _logging = true;
//         try {
//             values.forEach(v => console.log('you added to array', v));
//         } finally {
//             _logging = false;
//         }
//     }
//     return this.length;
// };

// Array.prototype.pop = function() {
//     const len = this.length;
//
//     // если массив пустой — вернуть undefined (поведение стандартного pop)
//     if (len === 0) return undefined;
//
//     // берём последний элемент
//     const last = this[len - 1];
//
//     // удаляем его вручную
//     delete this[len - 1];
//
//     // уменьшаем length
//     this.length = len - 1;
//
//     // логируем, если не находимся внутри другого console.log
//     if (!_logging) {
//         _logging = true;
//         try {
//             console.log('you removed from array', last);
//         } finally {
//             _logging = false;
//         }
//     }
//
//     // возвращаем удалённый элемент, как делает обычный pop
//     return last;
// };


//========Совсем правильно
// // --- отмечаем только те массивы, для которых хотим логи ---
// const WATCHED = new WeakSet();
// const watch = (arr) => (WATCHED.add(arr), arr);
// const unwatch = (arr) => WATCHED.delete(arr);
//
// // --- флаг от повторного входа изнутри console.log ---
//
// const safeLog = (...args) => {
//     if (_logging) return;
//     _logging = true;
//     try { console.log(...args); } finally { _logging = false; }
// };
//
// // --- push: без apply/call, со строгой семантикой ---
// Array.prototype.push = function (...values) {
//     let n = this.length;
//     for (let i = 0; i < values.length; i++) {
//         this[n] = values[i];
//         n++;
//     }
//     this.length = n;
//
//     if (values.length && WATCHED.has(this)) {
//         safeLog('you added to array:', ...values);
//     }
//     return n; // стандарт: возвращаем новую длину
// };
//
// // --- pop: без apply/call, со строгой семантикой ---
// Array.prototype.pop = function () {
//     let len = this.length;
//     if (len === 0) {
//         this.length = 0;
//         return undefined;
//     }
//     len--;
//     const last = this[len];
//
//     // удалить последний индекс и укоротить длину
//     if (len in this) delete this[len];
//     this.length = len;
//
//     if (WATCHED.has(this)) {
//         safeLog('you removed from array:', last);
//     }
//     return last; // стандарт: возвращаем удалённый элемент
// };

// ---------- демонстрация ----------

// логи ТОЛЬКО для помеченного массива:
const a = watch(['a', 'b', 'c']);
a.push('d', 'e');   // лог
a.pop();            // лог

// для непомеченного — тишина:
const b = ['x', 'y'];
b.push('z');        // нет лога
b.pop();            // нет лога


console.log([].feel());
console.log(["a", "b", "c"].feel());
console.log(arr.feel());
const planets = ["Mercury", "Venus"];
planets.push("Earth");
//planets.pop();
console.log(planets);