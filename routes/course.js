var express = require('express');
var router = express.Router();
var pool=require('./pool')



/* GET home page. */
     
router.get('/interface', function(req, res, next) {
  /* if(!req.session.admin){

    res.render('admin/adminLogin',{result:''})
  } */
  res.render('course', { msg:''})
});


router.post('/editcourse',function(req,res)
{
  console.log(req.body);
  if(req.body['btn']=='Update')
  {
    
    pool.query('update courses set coursename=?,addedon=?,addedby=?,lastupdate=? where courseid=?',[req.body.coursename,req.body.addedon,req.body.addedby,req.body.lastupdate,req.body.courseid],function(error,result)
  { 
    if(error)
     { console.log(error)
      res.redirect('http://localhost:3000/course/coursedisplay') 
     }

     else
     {
      
      res.redirect('http://localhost:3000/course/coursedisplay') 
     }

  });
}
else
{

  pool.query('delete from courses where courseid=?',[req.body.courseid],function(error,result)
  { 
    if(error)
     { console.log(error)
      res.redirect('http://localhost:3000/course/coursedisplay') 
     }

     else
     {
      
      res.redirect('http://localhost:3000/course/coursedisplay') 
     }

  });
  
}
});


router.post('/addcourse',function(req,res)
{
  console.log(req.body);
  
  
  pool.query('insert into courses(coursename,addedon,addedby,lastupdate)values(?,?,?,?)',[req.body.coursename,req.body.addedon,req.body.addedby,req.body.lastupdate],function(error,result)
  { 
    if(error)
     { console.log(error)
       res.render('course.ejs', {msg:"fail to submit"})
     }

     else
     {
         res.render('course.ejs',{msg:"record submitted"});

     }

  });


});


router.get('/coursedisplay', function(req, res, next) {
pool.query('select * from courses',function(err,result){
if(err)
{res.render('coursedisplay', { data:'There is an error in fetching data from server'})}
else{
  console.log(result)
  res.render('coursedisplay', { data:result})
}

});

  
});
router.get('/coursedisplaybyid', function(req, res, next) {
  pool.query('select * from courses where courseid=?',req.query['cid'],function(err,result){
  if(err)
  {res.render('coursedisplaybyid', { data:'There is an error in fetching data from server'})}
  else{
    console.log(result.length)
     
    res.render('coursedisplaybyid', { data:result})
  }
  
  });
  
    
  });
  
module.exports = router;
