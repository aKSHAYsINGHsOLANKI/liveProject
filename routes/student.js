var express = require('express');
var router = express.Router();
var pool=require('./pool')
var multer=require('./multer')
/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('student', { msg: '' });
});








router.post('/editstudent',function(req,res)
{
  console.log(req.body);
  if(req.body['btn']=='Update')
  {
    pool.query('update student set studentname=?,mobileno=?,collegename=?,gender=?,semester=?,courseid=?,branch=?,batchid=? where transactionid=?',[req.body.studentname,req.body.mobileno,req.body.collegename,req.body.gender,req.body.semester,req.body.courseid,req.body.branch,req.body.batchid,req.body.transactionid],function(error,result)
  { 
    if(error)
     { console.log(error)
      res.redirect('http://localhost:3000/student/studentdisplay') 
     }

     else
     {
      
      res.redirect('http://localhost:3000/student/studentdisplay') 
     }

  });
}
else
{

  pool.query('delete from student where transactionid=?',[req.body.transactionid],function(error,result)
  { 
    if(error)
     { console.log(error)
      res.redirect('http://localhost:3000/student/studentdisplay') 
     }

     else
     {
      
      res.redirect('http://localhost:3000/student/studentdisplay') 
     }

  });
  
}
});


router.post('/addstudent',multer.single('picture'),function(req,res)
{
  console.log(req.body);
 var fn=req.body.username+"-"+req.file.originalname;  
  
  pool.query('insert into student(studentname,gender,mobileno,collegename,semester,branch,courseid,batchid,currentdate,status,picture)values(?,?,?,?,?,?,?,?,?,?,?)',[req.body.studentname,req.body.gender,req.body.mobileno,req.body.collegename,req.body.semester,req.body.branch,req.body.courseid,req.body.batchid,req.body.currentdate,'DUE',fn],function(error,result)
  { 
    if(error)
     { console.log(error)
       res.render('student.ejs', {msg:"fail to submit"})
     }

     else
     {
         res.render('student.ejs',{msg:"record submitted"});

     }

  });


});


router.get('/studentdisplay', function(req, res, next) {
pool.query('select  S.*,(select C.coursename from courses C where C.courseid=S.courseid) as coursename,(select B.batchname from batches B where B.batchid=S.batchid) as batchname from student S',function(err,result){
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

  router.get('/displaybatchjson', function(req, res, next) {
    pool.query('select * from batches',function(err,result){
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
  pool.query('select  S.*,(select C.coursename from courses C where C. courseid=S.courseid) as coursename,(select B.batchname from batches B where B.batchid=S.batchid) as batchname  from  student S where S.transactionid=?',req.query['tid'],function(err,result)
  {
  if(err)
  {res.render('studentdisplaybyid', { data:'There is an error in fetching data from server'})}
  else{
    console.log(result.length)
     
    res.render('studentdisplaybyid', { data:result})
  }
  
  });
  
    
  });
  router.post('/updatepicture',multer.single('picture'),function(req,res)
  {
    console.log(req.body);
   var fn=req.body.username+"-"+req.file.originalname;  
    
    pool.query('update student set picture=?  where transactionid=?',[fn,req.body.transactionid],function(error,result)
    { 
      if(error)
       { console.log(error)
        res.redirect('http://localhost:3000/student/studentdisplay') 
       }
  
       else
       {
        res.redirect('http://localhost:3000/student/studentdisplay') 
  
       }
  
    });
  
  
  });
///////////////queries for react  report 1 Bycourse

router.get('/studentdisplayreact', function(req, res, next) {
  pool.query('select DISTINCT O.courseid,(select coursename from courses C where C.courseid=O.courseid) as coursename from student O ',function(err,result){
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

  router.post('/studentgetdetailsreact', function(req, res, next) {
    const {firstDate,secondDate}=req.body
    console.log(firstDate);
    console.log(secondDate);
    console.log('courseid',req.body.courseid)
    //pool.query('select * from student where transactionid=?',req.query['tid'],function(err,result)
    pool.query('select  S.*,(select B.batchdays from batches B where B.batchid=S.batchid)as batchday,(select B.batchname from batches B where B.batchid=S.batchid) as batchname,(select C.coursename from courses C where C.courseid=S.courseid) as coursename from student S where S.courseid=? AND  S.currentdate BETWEEN ? AND ?  ',[req.body.courseid,firstDate,secondDate],function(err,result)
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
    
      
    });///////////////queries for react  report 1 Bycourse


////query for batchname in react report 2 -Bybatch

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

router.post('/yearreact', function(req, res, next) {
  const {year,status}=req.body
  
  console.log('batchid',req.body.batchid)

  pool.query('select  S.*,B.*, (select coursename from courses C where C.courseid=S.courseid) as coursename from student S,batches B where S.batchid=B.batchid and YEAR(B.batchdate)=? and S.status=? and B.batchid=?',[year,status,req.body.batchid,],function(err,result)
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
  
    
  });////query for batchname in react report 2 -Bybatch






///for Report 3 -ByAll
router.get('/displayallreact', function(req, res, next) {
  pool.query('select DISTINCT O.courseid, O.batchid,(select coursename from courses C where C.courseid=O.courseid) as coursename,(select batchname from batches C where C.batchid=O.batchid) as batchname from student O ',function(err,result){
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

  router.post('/detailall', function(req, res, next) {
    
    
      const {studentname,courseid,batchid}=req.body 
      console.log('dhdh',studentname)
      console.log('course',courseid)

    console.log('batch',batchid)
 
    cid=0,bid=0 
     if(!(req.body.courseid.length==0)  && !(req.body.batchid.length==0)  )
       { cid=req.body.courseid,
        bid=req.body.batchid,
        studentname=req.body.studentname
        
  
    pool.query("select * from student where studentname like '%"+studentname+"%' or courseid="+cid+" or batchid="+bid+"",function(err,result)
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
  }
/* 
else if(!(req.body.studentname.length==0)  && !(req.body.batchid.length==0)){
  cid=req.body.courseid,
        bid=req.body.batchid,
        studentname=req.body.studentname
        

  pool.query("select * from student where  courseid="+cid+" " ,function(err,result)
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
}

else {

  pool.query("select * from student where  batchid=? ",[req.body.batchid],function(err,result)
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
}
 */







  
    });///for Report 3 -ByAll
  

  

//for batchwise report 4- ByWS
router.get('/batchnamewise', function(req, res, next) {
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


  router.post('/displaybatchnamewise', function(req, res, next) {
    const {batchid}=req.body
    
    console.log('batchid',req.body.batchid)
  
    pool.query('select  S.*,(select B.batchdays from batches B where B.batchid=S.batchid)as batchdays,(select B.batchdate from batches B where B.batchid=S.batchid)as batchdate,(select B.batchname from batches B where B.batchid=S.batchid) as batchname,(select C.coursename from courses C where C.courseid=S.courseid) as coursename from student S where S.batchid=? ',[req.body.batchid,],function(err,result)
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
    
      
    });//for batchwise report 4- ByWS
  



//FOR REPORT 5 -reciept
router.get('/reciept', function(req, res, next) {
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

  router.post('/displayreciept', function(req, res, next) {
    const {batchid,status}=req.body
    
    console.log('batchid',req.body.batchid)
    console.log('status',req.body.status)
  
    pool.query('select  S.*,(select B.batchdays from batches B where B.batchid=S.batchid)as batchdays,(select B.batchdate from batches B where B.batchid=S.batchid)as batchdate,(select B.batchname from batches B where B.batchid=S.batchid) as batchname,(select C.coursename from courses C where C.courseid=S.courseid) as coursename from student S where S.batchid=? and S.status=? ',[req.body.batchid,req.body.status],function(err,result)
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




module.exports = router;
