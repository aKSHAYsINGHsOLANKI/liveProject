var express = require('express');
var router = express.Router();
var pool=require('./pool')
var multer=require('./multer')






////query for batchname in react

///////////////queries for react

router.get('/batchnamereact', function(req, res, next) {
    pool.query('select DISTINCT O.batchid,(select batchname from batches C where C.batchid=O.batchid) as batchname from student O ',function(err,result){
      if (err) {
        console.log(err)
        return res.status(500).json([])
    }
    else {
        console.log(result)
        return res.status(200).json(result)
    }
    
    });
    
      
    });
  
  ///query for year and status
  
  
  router.post('/yearreact', function(req, res, next) {
    const {year,status}=req.body
    
    console.log('batchid',req.body.batchid)
  
    pool.query('select  S.*,B.* from student S,batches B where S.batchid=B.batchid and YEAR(B.batchdate)=? and S.status=? and B.batchid=?',[year,status,req.body.batchid,],function(err,result)
    {
      if (err) {
        console.log(err)
        return res.status(500).json([])
    }
    else {
        console.log(result)
        return res.status(200).json(result)
    }
    });
    
      
    });
  
  
  
  
  
    /* SELECT S.*,(select B.batchname from batches B where B.batchid=S.batchid) as batchname,(select S.transactionid,S.currentdate,YEAR(S.currentdate))
  FROM student S
  WHERE S.batchid= '27' AND YEAR(S.currentdate)=2019 AND S.status='DUE';
  
  
   */
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  module.exports = router;