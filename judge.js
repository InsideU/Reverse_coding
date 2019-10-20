rp = require('request-promise')
fs = require('fs')
const langId = { 'PY': 34, 'JAVA': 27, 'CPP': 10, 'C': 4 }
const url = 'http://35.226.54.217:3000/'
function run(source, input, output, lang) {
    return new Promise((resolve, reject) => {
        var options = {
            method: 'POST',
            uri: url + 'submissions/',
            form: {
                source_code: source,
                language_id: lang,
                wait: true,
                expected_output: output,
                stdin: input
            },
            json: true
        };
        rp(options).then((res) => {
            
            switch (res.status.id) {

                case 3:
                    resolve(true)
                    break
                case 4:
                    resolve(false)
                    break
                case 5:
                    reject("Time limit exceded")
                    break
                case 6:
                    reject("Compilation Error")
                    break
                default:
                    reject("Runtime Error")
            }
        }).catch((e) => {
            
            reject('Unable to Executes')
        })
    })
}

judge = (codeFile, inputFiles, outputFiles, lang) => {
    if (!langId[lang]) return new Promise((a, b) => b('Invalid Lang ID'))
    code = fs.readFileSync(codeFile, 'utf8')
    if (!code) return new Promise((a, b) => b('Invalid Code'))
    res = []
    for (let i = 0; i < inputFiles.length; i++) {
        input = fs.readFileSync(inputFiles[i], 'utf8')
        output = fs.readFileSync(outputFiles[i], 'utf8')
        res.push(
            run(code, input, output, langId[lang])
        )
    }
    return Promise.all(res)
}




/*
judge(`/home/shubh/Downloads/Codart-Questions-master/Easy/3/Satyam_s game.py`, [
    `/home/shubh/Downloads/Codart-Questions-master/Easy/3/T1.txt`,
    `/home/shubh/Downloads/Codart-Questions-master/Easy/3/T2.txt`,
], [
    `/home/shubh/Downloads/Codart-Questions-master/Easy/3/O1.txt`,
    `/home/shubh/Downloads/Codart-Questions-master/Easy/3/O2.txt`,
], "PY").then((res) => {
    console.log(res)
}).catch((e) => {
    console.log(111, e)
})
*/
module.exports=judge
