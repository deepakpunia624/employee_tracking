const multer =require("multer")
const path = require("path")

const imageConfig = multer.diskStorage({
    destination : (req,file,callback)=>{
        callback(null,path.join(__dirname,"..","/uploads/"))
    },
});
const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
      callback(null, true);
    } else {
      callback(new Error("only image is allowed"));
    }
  };
  const upload = multer({
    storage: imageConfig,
    fileFilter: isImage,
  });
  module.exports = {
    upload,
  };
  