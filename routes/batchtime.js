
var express = require('express');
var router = express.Router();
var pool=require('./pool')



/* GET home page. */
     
router.get('/interface', function(req, res, next) {
  res.render('batchtime', { msg:''})
});





router.post('/addtime',function(req,res)
{
  
  pool.query('insert into batchtime(addedon,addedby,lastupdate,fromtime,totime)values(?,?,?,?,?)',[req.body.addedon,req.body.addedby,req.body.lastupdate,req.body.fromtime,req.body.totime],function(error,result)
 
  { 
    if(error)
     { console.log(error)
       res.render('batchtime.ejs', {msg:"fail to submit"})
     }

     else
     {
         res.render('batchtime.ejs',{msg:"record submitted"});

     }

  });


});


router.get('/batchtimedisplay', function(req, res, next) {
pool.query('select * from batchtime',function(err,result){
  if(err)
  {res.render('batchtimedisplay', { data:'There is an error in fetching data from server'})}
  else{
    console.log(result)
    res.render('batchtimedisplay', { data:result})
  }
  
  });

});

  


router.post('/editbatch',function(req,res)
{
  console.log(req.body);
  if(req.body['btn']=='Update')
  {
    pool.query('update batchtime set addedon=?,addedby=?,lastupdate=?,fromtime=?,totime=? where batchid=?',[req.body.addedon,req.body.addedby,req.body.lastupdate,req.body.fromtime,req.body.totime,req.body.batchid],function(error,result)
  { 
    if(error)
     { console.log(error)
      res.redirect('http://localhost:3000/batchtime/batchtimedisplay') 
     }

     else
     {
      
      res.redirect('http://localhost:3000/batchtime/batchtimedisplay') 
     }

  });
}
else
{

  pool.query('delete from batchtime where batchid=?',[req.body.batchid],function(error,result)
  { 
    if(error)
     { console.log(error)
      res.redirect('http://localhost:3000/batchtime/batchtimedisplay') 
     }

     else
     {
      
      res.redirect('http://localhost:3000/batchtime/batchtimedisplay') 
     }

  });
  
}
});




router.get('/batchtimedisplaybyid', function(req, res, next) {
  pool.query('select * from batchtime where batchid=?',req.query['bid'],function(err,result){
  if(err)
  {res.render('batchtimedisplaybyid', { data:'There is an error in fetching data from server'})}
  else{
    console.log(result.length)
     
    res.render('batchtimedisplaybyid', { data:result})
  }
  
  });
  
    
  });
  


module.exports = router;
