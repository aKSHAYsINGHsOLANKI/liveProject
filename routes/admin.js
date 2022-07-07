var express = require('express');
var router = express.Router();
var mysql=require('mysql');
var pool=mysql.createPool({host:'localhost',user:'root', password:'123', database:'feemanagement',connectionLimit:100});
/* GET home page. */
router.get('/interface',function(req,res){
  res.render('admin/adminlogin',{msg:''})
  
  })
   /* for session

    router.get('/adminpage',function(req,res){
    if(!req.session.admin) 
    { res.render('admin/adminlogin',{result:''}) }  
     else{
    res.render('admin/adminpage',{admin:req.session.admin})}
  
  })
 */
    
  


router.post('/checklogin',function(req,res)
    {
      
      
        pool.query('select * from admin where adminid=? and password=?',[req.body.adminid,req.body.password],function(error,result)
      {  
        if(result.length==0 )
         { 
            res.render('admin/adminlogin',{msg:'Invalid Signid and password'})
         }
    
         else
         {
         
       
          res.render('admin/adminpage');
           
         
        }
        });
     
    
      });


module.exports = router;
