const multer = require('multer');



var multerstorage = multer.diskStorage({

destination:(req,file,cb)=>{


    cb(null,'public/images');
},
filename:(req,file,cb)=>{

const extension = file.mimetype.split('/')[1];

    cb(null,`${file.originalname}`);
}

});


const upload = multer({storage:multerstorage});


exports.uploadmulti = upload.fields([{name:"images",maxCount:12}]);