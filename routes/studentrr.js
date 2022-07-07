var express = require('express');
var router = express.Router();
var pool=require('./pool')
var multer=require('./multer');
/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('studentrr', { msg: '' });
});




router.post('/editstudent',function(req,res)
{
  console.log(req.body);
  if(req.body['btn']=='Update')
  {
    pool.query('update studentfee set transactionid=?,feeamountpaid=?,courseid=?,batchid=?,feedate=?,feetime=? where feestransactionid=?',[req.body.transactionid,req.body.feeamountpaid,req.body.courseid,req.body.batchid,req.body.feedate,req.body.feetime,req.body],function(error,result)
  { 
    if(error)
     { console.log(error)
      res.redirect('http://localhost:3000/student/studentrrdisplay') 
     }

     else
     {
      
      res.redirect('http://localhost:3000/student/studentrrdisplay') 
     }

  });
}
else
{

  pool.query('delete from studentrr where transactionid=?',[req.body.transactionid],function(error,result)
  { 
    if(error)
     { console.log(error)
      res.redirect('http://localhost:3000/student/studentrrdisplay') 
     }

     else
     {
      
      res.redirect('http://localhost:3000/student/studentrrdisplay') 
     }

  });
  
}
});


router.get('/studentpay',function(req,res)
{
  body=req.query.body;
  console.log(body)
   
  
  pool.query('insert into studentfee(transactionid,courseid,batchid,feeamountpaid,feeamountpay,feedate,feetime,amountdue)values(?,?,?,?,?,?,?,?)',[body.transactionid,body.courseid,body.batchid,body.feeamountpaid,body.feeamountpay,body.feedate,body.feetime,body.amountdue],function(error,result)
  { 
    if(error)
     { console.log(error)
       res.render('studentrr.ejs', {msg:"fail to submit"})
     }

     else
     {
       if(body.amountdue=='0')
      { 
        pool.query('update student set status="PAID" where transactionid=?',[body.transactionid],function(err,res)
      { 
        if(err)
         {  console.log('update',err)  }
         else
         { console.log('update',res) 
          }
       
       })
      
      }
         res.render('studentrr.ejs',{msg:"record submitted"});

     }

  });


});


router.get('/studentdisplay', function(req, res, next) {
pool.query('select  S.*,(select C.coursename from courses C where C. courseid=S.courseid) as coursename from student S',function(err,result){
if(err)
{res.render('studentdisplay', { data:'There is an error in fetching data from server'})}
else{
  console.log(result)
  res.render('studentdisplay', { data:result})
}

});

  
});


router.get('/displaycoursesjson', function(req, res, next) {
  pool.query('select * from courses',function(err,result){
  if(err)
  {res.json([])}
  else{
    console.log(result)
    res.json(result)
  }
  
  });
  
    
  });

  router.get('/displayrrjson', function(req, res, next) {
    pool.query('select batchname,batchid from batches',function(err,result){
    if(err)
    {res.json([])}
    else{
      console.log(result)
      res.json(result)
    }
    
    });
    
      
    });
    router.get('/displaystudentjson', function(req, res, next) {
      pool.query("select  S.*,(select C.coursename from courses C where C. courseid=S.courseid) as coursename,(select F.fees from fees F where F.courseid=S.courseid)as fees,(select B.batchname from batches B where B.batchid=S.batchid) as batchname,(select sum(FA.feeamountpaid) from studentfee FA  where FA.transactionid=S.transactionid  group by FA.transactionid) as amountpaid  from  student S  where S.batchid='"+req.query['batchid']+"'",function(err,result){
      if(err)
      {res.json([])}
      else{
        console.log(result)
        res.json(result)
      }
      
      });
      
        
      });
  














router.get('/studentdisplaybyid', function(req, res, next) {
  //pool.query('select * from student where transactionid=?',req.query['tid'],function(err,result)
  pool.query('select  S.*,(select C.coursename from courses C where C. courseid=S.courseid) as coursename from  student S where transactionid=?',req.query['tid'],function(err,result)
  {
  if(err)
  {res.render('studentdisplaybyid', { data:'There is an error in fetching data from server'})}
  else{
    console.log(result.length)
     
    res.render('studentdisplaybyid', { data:result})
  }
  
  });
  
    
  });



  


module.exports = router;