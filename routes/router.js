const express = require("express");
const product = require("../models/productSchema");
const router = express.Router();


router.post("/upload",async(req,res)=>{
    // console.log(req.body);
    const {productName ,productPrice, productAge, productWarranty, productSpecs ,productSellerEmail,productSold, productImagesURL, productBuyerEmail} = req.body;
    if(!productName ||! productPrice || !productAge || !productWarranty || !productSpecs || !productSellerEmail || !productImagesURL){
        res.status(404).send("please fill all the details");
    }
    try{
  const addProduct = new product({
    productName ,productPrice, productAge, productWarranty, productSpecs, productSellerEmail,productSold, productImagesURL ,productBuyerEmail
  });
  await addProduct.save();
  res.status(201).json(addProduct);
  // console.log(addProduct);
} catch (error) {
    // res.status(404).send(error)
    console.log(error)
}
})

router.get("/getdata/:id", async(req, res)=>{
  const objectId = req.params.id;

  const {productSellerEmail} = req.body;
  const query = {
    $and: [
      { productSellerEmail :{ $ne : objectId}},
      { productSold: false }
    ]
  };
  try {
    const allProductData = await product.find(query);
    res.status(201).json(allProductData);
    // console.log(productSellerEmail);
    // console.log(allProductData);
  }
  catch (error) {
 res.status(404).json(error);
  }
})
// router.get("/getdata", async (req, res)=>{
//   const {email} = req.body();
//  const query = {
//   $and: [
//     { productSellerEmail: ! email}
//   ]
// };
//   try {
//  const  singleProductData =  await  product.find(query).exec();
//  if (!singleProductData) {
//   return res.status(404).json({ message: 'User not found' });
// }
// res.json(singleProductData);
//   }
//   catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });  
//   }
// })

// router.get("/:id", async(req, res)=>{
//   // try {
//   //   const objectId = req.params.id;
//   //   const singleProductData = await product.findById(({_id: objectId}),function(err, val){
      
//   //     if(val.length ==0){
//   //       res.send("data do not exist");
//   //     }
//   //     else{
//   //       res.send(val);
//   //     }
//   //   });
//   //   res.status(201).json(singleProductData);
//   //   console.log(singleProductData);
//   // }
//   try {
//     const objectId = req.params.id;
//     if (!mongoose.Types.ObjectId.isValid(objectId)) {
//       return res.status(400).json({ message: 'Invalid ID' });
//     }
  
//     const singleProductData = await product.findById(objectId, (err , user) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ message: 'Server error' });
//       }
  
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       res.json(user);
//     })
//     res.status(201).json(singleProductData);
//     console.log(singleProductData);
//   }
//   catch (error) {
//  res.status(404).json(error);
//   }
// })


router.get("/getsingledata/:id", async (req, res)=>{
    const objectId = req.params.id;
  console.log(objectId);
    try {
   const  singleProductData =  await  product.findById(objectId).exec();
   if (!singleProductData) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(singleProductData);
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });  
    }
})

router.get("/userInfo/toSell/:id", async (req, res)=>{
  const objectId = req.params.id;
//  const a= localStorage.getItem('email');
 const query = {
  $and: [
    { productSellerEmail: objectId},
    { productSold: false }
  ]
};
  try {
 const  singleProductData =  await  product.find(query).exec();
 if (!singleProductData) {
  return res.status(404).json({ message: 'User not found' });
}
res.json(singleProductData);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });  
  }
})


router.get("/userInfo/sold/:id", async (req, res)=>{
  const objectId = req.params.id;
 const query = {
  $and: [
    { productSellerEmail: objectId},
    { productSold: true }
  ]
};
  try {
 const  singlePersonProductSold =  await  product.find(query).exec();
 if (!singlePersonProductSold) {
  return res.status(404).json({ message: 'User not found' });
}
res.json(singlePersonProductSold);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });  
  }
})


router.get("/userInfo/bought/:id", async (req, res)=>{
  const objectId = req.params.id;
 const query = {
  $and: [
    { productBuyerEmail: objectId},
    { productSold: true }
  ]
};
  try {
 const  singlePersonProductBought =  await  product.find(query).exec();
 if (!singlePersonProductBought) {
  return res.status(404).json({ message: 'User not found' });
}
res.json(singlePersonProductBought);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });  
  }
})


router.delete("/delete/:id", async (req, res)=>{
  const ObjectID = req.params.id;

  try {
 
  const result = await product.findByIdAndDelete(ObjectID);
  // if (result.deletedCount === 0) {
  //   res.status(404).json({ error: 'Data not found' });
  // } else {
  //   res.json({ message: 'Data deleted successfully' });
  // }
  res.send(`Document  has been deleted..`)
  // client.close();

}
  catch (err) {
    // console.error('Error deleting data from MongoDB:', err);
    res.status(500).json({ error: 'Error deleting data from MongoDB' });
  }
})


router.put('/update/:id', async (req, res) => {
  const id = req.params.id;
  const { productSold , productBuyerEmail  } = req.body;

  try {
    const document = await product.findByIdAndUpdate(
      {_id : id}, 
      { productSold: productSold , productBuyerEmail: productBuyerEmail}, 
      { new: true }
      );
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json(document);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;