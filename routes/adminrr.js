var express = require('express');
var router = express.Router();
var pool=require('./pool');


















router.post('/chkadminlogin', function(req, res, next) {
   pool.query('select *  from admin where adminid=? and password=?',[req.body.adminid,req.body.password],function(error,result){

if(error){
 return res.status(500).json({RESULT:false,data:[]})
}
else
{   if(result.length>=1)
    return res.status(200).json({RESULT:true,data:result})
    else
    return res.status(200).json({RESULT:false,data:[]})
}


})


});

module.exports = router;