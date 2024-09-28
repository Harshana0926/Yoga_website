const express = require('express')
const app = express()
const jwt = require('jsonwebtoken');
const cors = require('cors')
require('dotenv').config()
const stripe = require("stripe")(process.env.PAYMENT_SECRET);
const port = process.env.PORT || 3000;
console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)

//midleware
app.use(cors());
app.use(express.json())


//s18184
//2abG2CmQdQqeRWIs

//set token
const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
      return res.status(401).send({ error: true, message: 'Unauthorized access' })
  }
  const token = authorization?.split(' ')[1]
  jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
      if (err) {
          return res.status(403).send({ error: true, message: 'forbidden user or token has expired' })
      }
      req.decoded = decoded;
      next()
  })
}

//mongodb connection

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
//const uri = "mongodb+srv://s18184:2abG2CmQdQqeRWIs@yoga-master.feuk0.mongodb.net/?retryWrites=true&w=majority&appName=yoga-master";

const uri = "mongodb://localhost:27017/yoga-master"

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();

      //create a database and collections
       const  database = client.db('yoga-master');
       const userCollection = database.collection("users");
       const classesCollection = database.collection("classes");
       const cartCollection = database.collection("cart");
       const paymentCollection =  database.collection("payments");
       const enrolledCollection = database.collection("enrolled");
       const appliedCollection = database.collection("applied");


       //verify admin
       const verifyAdmin = async (req, res, next) => {
        const email = req.decoded.email;
        const query = { email: email };
        const user = await userCollection.findOne(query);
        if (user.role === 'admin') {
            next();
        }
        else {
            return res.status(401).send({ error: true, message: 'Unauthorize access' })
        }
    }

    const verifyInstructor = async (req, res, next) => {
        const email = req.decoded.email;
        const query = { email: email };
        const user = await userCollection.findOne(query);
        if (user.role === 'instructor' || user.role === 'admin') {
            next()
        }
        else {
            return res.status(401).send({ error: true, message: 'Unauthorize access' })
        }
    }

       //routes for users
       app.post('/new-user', async (req, res) => {
        const newUser = req.body;

        const result = await userCollection.insertOne(newUser);
        res.send(result);
    });

    //set jsonwebtoken
    app.post('/api/set-token', (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_SECRET, { expiresIn: '24h' })
      res.send({ token })
    })

    //get all users
        app.get('/users', async (req, res) => {
          const users = await userCollection.find({}).toArray();
          res.send(users);
      })

        //get user by id
        app.get('/users/:id', async (req, res) => {
          const id = req.params.id;
          const query = { _id: new ObjectId(id) };
          const user = await userCollection.findOne(query);
          res.send(user);
      });

              // GET USER BY EMAIL
        app.get('/user/:email', verifyJWT, async (req, res) => {
          const email = req.params.email;
          const query = { email: email };
          const result = await userCollection.findOne(query);
          res.send(result);
      });

        // Delete a user

        app.delete('/delete-user/:id', verifyJWT, verifyAdmin, async (req, res) => {
          const id = req.params.id;
          const query = { _id: new ObjectId(id) };
          const result = await userCollection.deleteOne(query);
          res.send(result);
      })

        // UPDATE USER
        app.put('/update-user/:id', verifyJWT, verifyAdmin, async (req, res) => {
          const id = req.params.id;
          const updatedUser = req.body;
          const filter = { _id: new ObjectId(id) };
          const options = { upsert: true };
          const updateDoc = {
              $set: {
                  name: updatedUser.name,
                  email: updatedUser.email,
                  role: updatedUser.option,
                  address: updatedUser.address,
                  phone: updatedUser.phone,
                  about: updatedUser.about,
                  photoUrl: updatedUser.photoUrl,
                  skills: updatedUser.skills ? updatedUser.skills : null,
              }
          }
          const result = await userCollection.updateOne(filter, updateDoc, options);
          res.send(result);
      })


       //classes routes
       app.post('/new_class',verifyJWT,verifyInstructor,async(req, res)=>{

            const newClass = req.body;
           // newClass.avilableSeats = parseInt(newClass.avilableSeats);
            const result = await classesCollection.insertOne(newClass);
            res.send(result);

       })

       app.get('/classes',async (req,res)=>{
           const query = {title:'approved'};
           const result = await classesCollection.find().toArray();
           res.send(result);
       })

       //get classes by instructor email
       app.get('/classes /:email',verifyJWT,verifyInstructor, async (req,res)=>{
        const email = req.params.email;
        const query = {instructorEmail:email};
        const result = await classesCollection.find(query).toArray();
        res.send(result);

       });

       //manage classes

       app.get('/classes-manage',async(req,res)=>{

        const result = await classesCollection.find(query).toArray();
        res.send(result);
       });

       //update classes status and reason
       app.patch('/change-status/:id',verifyJWT,verifyAdmin,async(req,res)=>{
        const id = req.params.id;
        const status = req.body.status;
        const reason = req.body.reason;

        const filter = {_id: new ObjectId(id)};
        const optons = {upsert: true};
        const updateDoc ={
            $set: {
                status: status,
                reason: reason,
            },
        };
        const result = await classesCollection.updateOne(filter,updateDoc,optons)
        res.send(result);
       })

       //get approved class
       app.get('/approved-classes',async(req,res)=>{

        const query = {status:"approved"};
        const result = await classesCollection.find(query).toArray();
        res.send(result);
       })


       //get single class details
       app.get('/classes/:id', async(req,res)=>{

        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await classesCollection.findOne(query);
        res.send(result)

       });

       //updtae class details all data

       app.put('/update-class/:id',verifyJWT,verifyInstructor, async(req,res)=>{

        const id = req.params.id;
        const updateClass = req.body;
        const filter = {_id: new ObjectId(id)};
        const options = { upsert: true};
        const updateDoc = {
            $set:{
              name: updateClass.name,
              description: updateClass.description,
              price: updateClass.price,
              availableSeats: parseInt(updateClass.availableSeats),
              videoLink: updateClass.videoLink,
              status: 'pending',


            }
          
        };
        const result = await classesCollection.updateOne(filter,updateDoc,options)

       });


       //cart routes ----
       app.post('/add-to-cart',verifyJWT,async (req,res)=>{
        const insertCartItem = req.body;
        const result = await cartCollection.insertOne(insertCartItem);
        res.send(result);
       });

       //get cart item by id
       app.get('/cart-item/:id',verifyJWT, async(req,res)=>{
          const id = req.params.id;
          const email = req.body.email;
          const query ={
            classId:id,
            userMail: email
          };
          const projection =  {classId:1};
          const result = await cartCollection.findOne(query,{projection:projection});
          res.send(result);
       });

       //cart info by user email
       app.get('/cart/:email',verifyJWT,async(req,res)=>{

        const email = req.params.email;
        const query = {userMail: email}
        const projection = {classId:1};
        const carts = await cartCollection.find(query,{projection: projection});
        const classIds = carts.map((cart)=>new ObjectId(cart.classId));
        const query2 = {_id:{$in:classIds}};
        const result = await classesCollection.find(query2).toArray();
        res.send(result);

       })

       //delayed cart items
       app.delete('/delete-cart-item/:id',verifyJWT, async(req,res)=>{
          const id = req.params.id;
          const query = {classId:id};
          const result = await cartCollection.deleteOne(query);
          res.send(result);
       });

       //payaments routes
       app.post('/create-payment-intent', async (req, res) => {
        const { price } = req.body;
        const amount = parseInt(price)*100;
        const paymentIntent = await stripe.paymentIntents.create({
          amount:amount,
          currency: "usd",
          payment_method_types: ["card"],
        });
        res.send({
          clientSecret: paymentIntent.client_secret,
        })
       });

       //post payment info to db
       app.post('/payment-info', verifyJWT, async (req, res) => {
        const paymentInfo = req.body;
        const classesId = paymentInfo.classesId;
        const userEmail = paymentInfo.userEmail;
        const singleClassId = req.query.classId;
        let query;
        // const query = { classId: { $in: classesId } };
        if (singleClassId) {
            query = { classId: singleClassId, userMail: userEmail };
        } else {
            query = { classId: { $in: classesId } };
        }
        const classesQuery = { _id: { $in: classesId.map(id => new ObjectId(id)) } }
        const classes = await classesCollection.find(classesQuery).toArray();
        const newEnrolledData = {
            userEmail: userEmail,
            classesId: classesId.map(id => new ObjectId(id)),
            transactionId: paymentInfo.transactionId,
        }
        const updatedDoc = {
            $set: {
                totalEnrolled: classes.reduce((total, current) => total + current.totalEnrolled, 0) + 1 || 0,
                availableSeats: classes.reduce((total, current) => total + current.availableSeats, 0) - 1 || 0,
            }
        }
        // const updatedInstructor = await userCollection.find()
        const updatedResult = await classesCollection.updateMany(classesQuery, updatedDoc, { upsert: true });
        const enrolledResult = await enrolledCollection.insertOne(newEnrolledData);
        const deletedResult = await cartCollection.deleteMany(query);
        const paymentResult = await paymentCollection.insertOne(paymentInfo);
        res.send({ paymentResult, deletedResult, enrolledResult, updatedResult });
    })

    //payment history
    app.get('/payment-history/:email', async(req,res)=>{
        const email = req.params.email;
        const query = {userEmail: email};
        const result = await paymentCollection.find(query).sort({date: -1}).toArray();
        res.send(result);
    })

    //payment history length

    app.get('/payment-history-length/:email', async(req,res)=>{
      const email = req.params.email;
      const query = {userEmail: email};
      const total = await paymentCollection.countDocuments(query);
      res.send(total);
  })

  //enrollment routes
  app.get('/popular_classes',async(req,res)=>{
    const result = await classesCollection.find().sort({totalEnrolled: -1}).limit(6).toArray();
    res.send(result);
  })

  app.get('/popular-instructors', async (req, res) => {
    const pipeline = [
        {
            $group: {
                _id: "$instructorEmail",
                totalEnrolled: { $sum: "$totalEnrolled" },
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "email",
                as: "instructor"
            }
        },
        {
            $project: {
                _id: 0,
                instructor: {
                    $arrayElemAt: ["$instructor", 0]
                },
                totalEnrolled: 1
            }
        },
        {
            $sort: {
                totalEnrolled: -1
            }
        },
        {
            $limit: 6
        }
    ]
    const result = await classesCollection.aggregate(pipeline).toArray();
    res.send(result);

})
        // Admins stats 
  app.get('/admin-stats', verifyJWT, verifyAdmin, async (req, res) => {
          // Get approved classes and pending classes and instructors 
          const approvedClasses = (await classesCollection.find({ status: 'approved' }).toArray()).length;
          const pendingClasses = (await classesCollection.find({ status: 'pending' }).toArray()).length;
          const instructors = (await userCollection.find({ role: 'instructor' }).toArray()).length;
          const totalClasses = (await classesCollection.find().toArray()).length;
          const totalEnrolled = (await enrolledCollection.find().toArray()).length;
          // const totalRevenue = await paymentCollection.find().toArray();
          // const totalRevenueAmount = totalRevenue.reduce((total, current) => total + parseInt(current.price), 0);
          const result = {
              approvedClasses,
              pendingClasses,
              instructors,
              totalClasses,
              totalEnrolled,
              // totalRevenueAmount
          }
          res.send(result);

      })

      // !GET ALL INSTrUCTOR  

      app.get('/instructors', async (req, res) => {
          const result = await userCollection.find({ role: 'instructor' }).toArray();
          res.send(result);
      })

//enrolled classes according to email
      app.get('/enrolled-classes/:email', verifyJWT, async (req, res) => {
        const email = req.params.email;
        const query = { userEmail: email };
        const pipeline = [
            {
                $match: query
            },
            {
                $lookup: {
                    from: "classes",
                    localField: "classesId",
                    foreignField: "_id",
                    as: "classes"
                }
            },
            {
                $unwind: "$classes"
            },
            {
                $lookup: {
                    from: "users",
                    localField: "classes.instructorEmail",
                    foreignField: "email",
                    as: "instructor"
                }
            },
            {
                $project: {
                    _id: 0,
                    classes: 1,
                    instructor: {
                        $arrayElemAt: ["$instructor", 0]
                    }
                }
            }

        ]
        const result = await enrolledCollection.aggregate(pipeline).toArray();
        // const result = await enrolledCollection.find(query).toArray();
        res.send(result);
    })

    //aplied route
    app.post('/as-instructor', async (req, res) => {
      const data = req.body;
      const result = await appliedCollection.insertOne(data);
      res.send(result);
  })

  app.get('/applied-instructors/:email',   async (req, res) => {
    const email = req.params.email;
    const result = await appliedCollection.findOne({email});
    res.send(result);
  });



      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
    }
  }
  
  run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello Harshana')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})