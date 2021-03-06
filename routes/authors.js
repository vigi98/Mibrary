const express=require('express')
const router=express.Router()
const Author=require('../models/author')

//All Authors
router.get('/',async(req,res)=>{    

    let searchValue={}
    if(req.query.name!=null && req.query.name!==''){
         searchValue.name=new RegExp(req.query.name,'i')
         console.log(searchValue)

    }
    try{
        const authors=await Author.find(searchValue)
        console.log('Query ',req.query.name)
        res.render('authors/index',{authors,searchKey:req.query.name}) 
    }
    catch(err){
        res.redirect('/')
    }
   

})

//New Author[New Page for each author]
router.get('/new',(req,res)=>{
    res.render('authors/new',{author:new Author()})
})

//Diff ways to handle 
//Callback fn
//Model.insertMany([ ... ], (err, docs) => {
//     ...
// })
// Or, with promises:

// Model.insertMany([ ... ]).then((docs) => {
//   ...
// }).catch((err) => {
//   ...
// })
//Create Author
router.post('/',async(req,res)=>{

//Using 1> Callback-->return type void
//   Author.create({
//       name:req.body.name
//   },(err,doc)=>console.log('hey')) 

 //Using 2> Promise--> return type Promise
 
//  let author=Author.create({
//           name:req.body.name
//       })

// author.then(doc=>{
//     //res.redirect(`/authors/:${doc.id}`)
//     res.redirect('/authors')
//   }).catch(err=>{
//       res.render('authors/new',{
//           author,errorMessage:'Error ceating author'
//       })
//   })
//  

 //3> Async await with promises(Best)
 let author
 try{
    author = await Author.create({
          name:req.body.name
      })
    
     //res.redirect(`/authors/:${doc.id}`)
    res.redirect('/authors')
 }  
 catch(err){
         res.render('authors/new',{
          author,errorMessage:'Error creating author'
      })
 }

})
module.exports=router