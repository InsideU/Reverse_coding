var fs = require('fs')
var crypto = require('crypto');
const mysql= require('mysql');

const db= mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'revcoding'
});


//console.log(111,__dirname+'/files/download/')
path=__dirname+'/files/download/'
fs.readdir(__dirname+'/files/download', function(err, filenames) {
    if (err) {
      return;
    }
    //console.log(filenames);
    filenames.forEach((name)=>{
        fs.rename(path+name+'/run.exe',path+name+`/${name}_run.exe`,()=>{
            fs.renameSync(path+name+'/run.o',path+name+`/${name}_run.o`)
        var hash=crypto.createHash('md5').update(path+name).digest('hex')
        fs.rename(path+name, path+name+'_'+hash,()=>{
            if (err) console.log(err.message);
            // insert the files into the database 
            //localhost:3000/download/hash_of_the_file/filename.exe

                    let sql =`insert into routetest values('/download/${hash}/${name}_run.exe',${name})`;
                    db.query(sql,(err,results)=>{
                            if(err) throw err;
                        console.log("The file link has been pushed");
                    });
            });
        });

        });
        
        
        
    });


