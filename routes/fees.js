var express = require('express');
var router = express.Router();
var pool=require('./pool')



/* GET home page. */
     
router.get('/interface', function(req, res, next) {
  res.render('fees', { msg:''})
});


router.post('/editfees',function(req,res)
{
  console.log(req.body);
  if(req.body['btn']=='Update')
  {
    
    pool.query('update fees set courseid=?,fees=?,addedon=?,addedby=?,lastupdate=? where transactionid=?',[req.body.courseid,req.body.fees,req.body.addedon,req.body.addedby,req.body.lastupdate,req.body.transactionid],function(error,result)
  { 
    if(error)
     { console.log(error)
      res.redirect('http://localhost:3000/fees/feesdisplay') 
     }

     else
     {
      
      res.redirect('http://localhost:3000/fees/feesdisplay') 
     }

  });
}
else
{

  pool.query('delete from fees where transactionid=?',[req.body.transactionid],function(error,result)
  { 
    if(error)
     { console.log(error)
      res.redirect('http://localhost:3000/fees/feesdisplay') 
     }

     else
     {
      
      res.redirect('http://localhost:3000/fees/feesdisplay') 
     }

  });
  
}
});


router.post('/addcoursefees',function(req,res)
{
  console.log(req.body);
  
  
  pool.query('insert into fees(courseid,fees,addedon,addedby,lastupdate)values(?,?,?,?,?)',[req.body.courseid,req.body.fees,req.body.addedon,req.body.addedby,req.body.lastupdate],function(error,result)
  { 
    if(error)
     { console.log(error)
       res.render('fees.ejs', {msg:"fail to submit"})
     }

     else
     {
         res.render('fees.ejs',{msg:"record submitted"});

     }

  });


});


router.get('/feesdisplay', function(req, res, next) {
pool.query('select  S.*,(select C.coursename from courses C where C. courseid=S.courseid) as coursename from fees S',function(err,result){
if(err)
{res.render('feesdisplay', { data:'There is an error in fetching data from server'})}
else{
  console.log(result)
  res.render('feesdisplay', { data:result})
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
router.get('/coursefeesdisplaybyid', function(req, res, next) {
  /* pool.query('select * from fees where transactionid=?',req.query['tid'],function(err,result) */
  pool.query('select  S.*,(select C.coursename from courses C where C. courseid=S.courseid) as coursename from fees S where transactionid=?',req.query['tid'],function(err,result){
  if(err)
  {res.render('coursefeesdisplaybyid', { data:'There is an error in fetching data from server'})}
  else{
    console.log(result.length)
     
    res.render('coursefeesdisplaybyid', { data:result})
  }
  
  });
  
    
  });
  
module.exports = router;
