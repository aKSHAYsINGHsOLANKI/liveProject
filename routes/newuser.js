
var express = require('express');
var router = express.Router();
var pool=require('./pool')
var multer=require('./multer')



/* GET home page. */
     
router.get('/interface', function(req, res, next) {
  res.render('newuser', { msg:''})
});


router.post('/editusername',function(req,res)
{
  console.log(req.body);
  if(req.body['btn']=='Update')
  {
    pool.query('update newuser set username=?,password=?,usertype=?,currentdate=?,addby=?,updateon=?, where loginid=?',[req.body.username,req.body.password,req.body.usertype,req.body.currentdate,req.body.addby,req.body.updateon,req.body.loginid],function(error,result)
  { 
    if(error)
     { console.log(error)
      res.redirect('http://localhost:3000/new/displayall') 
     }

     else
     {
      
      res.redirect('http://localhost:3000/new/displayall') 
     }

  });
}
else
{

  pool.query('delete from newuser where loginid=?',[req.body.loginid],function(error,result)
  { 
    if(error)
     { console.log(error)
      res.redirect('http://localhost:3000/new/displayall') 
     }

     else
     {
      
      res.redirect('http://localhost:3000/new/displayall') 
     }

  });
  
}
});


router.post('/addusername',multer.single('picture'),function(req,res)
{
  console.log(req.body);
 var fn=req.body.username+"-"+req.file.originalname;  
  
  pool.query('insert into newuser(username,password,usertype,currentdate,addby,updateon,picture)values(?,?,?,?,?,?,?)',[req.body.username,req.body.password,req.body.usertype,req.body.currentdate,req.body.addby,req.body.updateon,fn],function(error,result)
  { 
    if(error)
     { console.log(error)
       res.render('newuser.ejs', {msg:"fail to submit"})
     }

     else
     {
         res.render('newuser.ejs',{msg:"record submitted"});

     }

  });


});


router.get('/displayall', function(req, res, next) {
pool.query('select * from newuser',function(err,result){
if(err)
{res.render('displayall', { data:'There is an error in fetching data from server'})}
else{
  console.log(result)
  res.render('displayall', { data:result})
}

});

  
});
router.get('/newuserdisplaybyid', function(req, res, next) {
  pool.query('select * from newuser where loginid=?',req.query['lid'],function(err,result){
  if(err)
  {res.render('newuserdisplaybyid', { data:'There is an error in fetching data from server'})}
  else{
    console.log(result.length)
     
    res.render('newuserdisplaybyid', { data:result})
  }
  
  });
  
    
  });
  router.post('/updatepicture',multer.single('picture'),function(req,res)
  {
    console.log(req.body);
   var fn=req.body.username+"-"+req.file.originalname;  
    
    pool.query('update newuser set picture=?  where loginid=?',[fn,req.body.loginid],function(error,result)
    { 
      if(error)
       { console.log(error)
        res.redirect('http://localhost:3000/new/displayall') 
       }
  
       else
       {
        res.redirect('http://localhost:3000/new/displayall') 
  
       }
  
    });
  
  
  });

module.exports = router;
