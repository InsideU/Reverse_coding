judge = require('./judge')

// console.log(
judge('./uploads/1_101-1570947652294.py', [
    `D:\\nodejs\\reverse_coding\\reverse_codingv2\\files\\ques\\1\\test\\I1.txt`,
    `D:\\nodejs\\reverse_coding\\reverse_codingv2\\files\\ques\\1\\test\\I2.txt`,
], [
    `D:\\nodejs\\reverse_coding\\reverse_codingv2\\files\\ques\\1\\test\\O1.txt`,
    `D:\\nodejs\\reverse_coding\\reverse_codingv2\\files\\ques\\1\\test\\O2.txt`,
], 'PY').then((result) => {
    console.log({
        err: false,
        result, points: 150
    })
}).catch(e => {
    console.log({
        err: true,
        message: e
    });
});