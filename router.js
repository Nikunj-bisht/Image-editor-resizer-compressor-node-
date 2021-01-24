const express = require('express');

const router = express.Router();
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const pdfcreater = require('pdfkit');
const color = require('color');
const uploadcontroller = require('./controller/uploadcont');


var multerstorage = multer.memoryStorage();

const upload = multer({

    storage:multerstorage
})

router
.post('/',upload.single('photo'),async(req,res,next)=>{

req.file.filename = `random.jpeg`;



await sharp(req.file.buffer)
.resize(Number(req.body.width),Number(req.body.height),{
    fit:'fill'
})
.toFormat("jpeg")
.jpeg({quality:90})

.toFile(`public/images/${req.file.filename}`)
next();

},async(req,res)=>{

res.json({
    url:req.file.filename
})

});

router.post('/compress',upload.single('photo'),async(req,res,next)=>{

    req.file.filename = `random.jpeg`;

await sharp(req.file.buffer)
.toFormat("jpeg")
.jpeg({quality:50})
.toFile(`public/images/${req.file.filename}`)

next();

},async(req,res)=>{

res.json({

    url:req.file.filename

})

});

router
.post('/pdfconverter',uploadcontroller.uploadmulti,async(req,res)=>{

const filesarray = req.files.images.map(e => `public/images/${e.originalname}`);
console.log(filesarray);
const doc = new pdfcreater();
doc.pipe(fs.createWriteStream('public/pdfs/random.pdf'));

await filesarray.forEach(element => {
    
 doc.image(element,{
    fit:[250,300],
    align:'center',
    valign:'center'
});


});

console.log(req.files);

});


router.post('/editor',upload.single('photo'),async(req,res)=>{

    var c = color({r: 255, g: 0, b: 0});
    req.file.filename = `ran.jpeg`;

await sharp(req.file.buffer)
.tint(c)
.toFormat('jpeg')
.toFile(`public/images/${req.file.filename}`)
.then(data=>{

}).catch(err=>{
    console.log(err);
})

});




module.exports = router;