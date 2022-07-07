var express = require('express');
var router = express.Router();
var pool=require('./pool')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('batches', { msg:'' });
});



router.post('/addbatch',function(req,res)
{
    
  
  pool.query('insert into batches(courseid,fromtime,totime,batchdate,batchname,batchdays,addedon,addedby,lastupdate)values(?,?,?,?,?,?,?,?,?)',[req.body.courseid,req.body.fromtime,req.body.totime,req.body.batchdate,req.body.batchname,req.body.batchdays,req.body.addedon,req.body.addedby,req.body.lastupdate],function(error,result)
  { 
    if(error)
     { console.log(error)
       res.render('batches.ejs', {msg:"fail to submit"})
     }

     else
     {
         res.render('batches.ejs',{msg:"record submitted"});

     }

  });


});
router.post('/editbatches',function(req,res)
{
  console.log(req.body);
  if(req.body['btn']=='Update')
  {
    pool.query('update batches set courseid=?,batchdate=?,batchname=?,batchdays=?,addedon=?,addedby=?,lastupdate=? where batchid=?',[req.body.courseid,req.body.batchdate,req.body.batchname,req.body.batchdays,req.body.addedon,req.body.addedby,req.body.lastupdate,req.body.batchid],function(error,result)
  { 
    if(error)
     { console.log(error)
      res.redirect('http://localhost:3000/batch/batchesdisplayall') 
     }

     else
     {
      
      res.redirect('http://localhost:3000/batch/batchesdisplayall') 
     }

  });
}
else
{

  pool.query('delete from batches where batchid=?',[req.body.batchid],function(error,result)
  { 
    if(error)
     { console.log(error)
      res.redirect('http://localhost:3000/batch/batchesdisplayall') 
     }

     else
     {
      
      res.redirect('http://localhost:3000/batch/batchesdisplayall') 
     }

  });
  
}
});



router.get('/batchesdisplayall', function(req, res, next) {
  pool.query('select B.*,(select C.coursename from courses C where C. courseid=B. courseid)as coursename from batches B',function(err,result){
  if(err)
  {res.render('batchesdisplayall', { data:'There is an error in fetching data from server'})}
  else{
    console.log(result)
    res.render('batchesdisplayall', { data:result})
  }
  
  });

});




router.get('/batchesdisplayallbyid', function(req, res, next) {
  pool.query('select B.*,(select C.coursename from courses C where C. courseid=B.courseid) as coursename from  batches B  where batchid=?',req.query['bid'],function(err,result){
  if(err)
  {res.render('batchesdisplayallbyid', { data:'There is an error in fetching data from server'})}
  else{
    console.log(result.length)
     
    res.render('batchesdisplayallbyid', { data:result})
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




    router.get('/displaybatchtimejson', function(req, res, next) {
      pool.query('select * from batchtime',function(err,result){
      if(err)
      {res.json([])}
      else{
        console.log(result)
        res.json(result)
      }
      
      });
      
        
      });


module.exports = router;
