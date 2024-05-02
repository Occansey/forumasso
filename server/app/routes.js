const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

router.use(cors());
router.use(express.json());
const MongoClient = require('mongodb').MongoClient;
const mongoURL = 'mongodb+srv://maxwelloccansey:amineMaxwell75%3F@organizasso.oqwz5xd.mongodb.net/organizasso';
const dbName = 'organizasso';
let postsCollection="";
let messagesCollection ='';
let usersCollection='';

MongoClient.connect(mongoURL)
    .then(client => {
        console.log('Connected to MongoDB');
        const db = client.db(dbName);
        postsCollection = db.collection('posts');
        usersCollection= db.collection('users');
        messagesCollection=db.collection('messages');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });


// // // // // // // // // // // // POSTS
// GET ALL POSTS 
router.get('/posts/private', async (req, res) => {
    console.log('/posts/private')
    try {
        const posts = await postsCollection.find({ privatePost: true }).toArray();
        res.json(posts);
    } catch (error) {res.status(500).json({ message: error.message });}
});


router.get('/posts', async (req, res) => {
    console.log('/posts')
    try {
        const posts = await postsCollection.find().toArray();
        res.json(posts);
    } catch (error) {res.status(500).json({ message: error.message });}
});                                     

router.get('/posts/public', async (req, res) => {
    console.log('get/posts/public')
    try {
        const posts = await postsCollection.find({ privatePost: false }).toArray();
        res.json(posts);
    } catch (error) {res.status(500).json({ message: error.message });}
});

// GET Posts BASED ON A QUERY 
router.get('/posts/search', async (req, res) => {
    console.log('get/posts/search')
    const { title, content } = req.query; 
    try {
        let query = {};
        if (title) {
            query.title = { $regex: title, $options: 'i' };
        }  
        if (content) {
            query.content = { $regex: content, $options: 'i' }; 
        }
        const posts = await postsCollection.find(query).toArray();
        
        res.json(posts);
    } catch (error) {res.status(500).json({ message: error.message });}   
});

// Create a new post
router.post('/posts/private', async (req, res) => {
    console.log('posts/private ')
    const { title, content } = req.body; // Destructuring req.body to extract title and content
    const user_id=req.query.id
    if (!title || !content) {
        res.status(400).json({ message: 'Title and content are required' });
        return;
    }
    try {
        const newPost = {
            userid:user_id,
            title:title,
            content:content,
            privatePost:false,
            posts: [], 
            messages:[],
            likes:[],
            dislikes:[],
            timestamp:new Date()
        };
        await postsCollection.insertOne(newPost);
        res.status(201).json(req.body);
        console.log('succesful private post posted')
    } catch (error) {res.status(500).json({ message: error.message });}
});

router.post('/posts/public', async (req, res) => {
    console.log('post/posts/public')

    const { title, content } = req.body; // Destructuring req.body to extract title and content
    const user_id=req.query.id
    if (!title || !content) {
        res.status(400).json({ message: 'Title and content are required' });
        return;
    }
    try {
        const newPost = {
            userid:user_id,
            title:title,
            content:content,
            privatePost:false,
            posts: [], 
            messages:[],
            likes:[],
            dislikes:[],
            timestamp:new Date()
        };
        await postsCollection.insertOne(newPost);
        res.status(201).json(req.body);
        console.log('succesful public post posted')
    } catch (error) {res.status(500).json({ message: error.message });}
});

// Delete a post by ID
router.delete('/posts', async (req, res) => {
    const postId=new ObjectId(req.params.id)
    try {
        const result = await postsCollection.deleteOne({ _id: postId });
        if (result.deletedCount === 0) {
            res.status(404).json({ message: 'Post already deleted or not found' });
        } else {
            res.status(204).send();
        }
    } catch (error) {res.status(500).json({ message: error.message });}
});


// // // // // // // // // // // // USERS
// SIGN UP
// Register endpoint
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, userPosts } = req.body;

        if (!username || !email || !password)  res.status(400).json({ message: 'Username, email, and password are required' });

        const existingUser = await usersCollection.findOne({ $or: [{ username }, { email }] });
        if (existingUser)  res.status(400).json({ message: 'Username or email already exists' });
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            username:username,
            email:email,
            password: hashedPassword,
            admin: false, 
            connected: true,
            
            posts: [], 
            messages:[],
            friends:[],
            timestamp:new Date().getTime()
        };
        const result = await usersCollection.insertOne(newUser);
        if (userPosts && Array.isArray(userPosts)) {
            const postIds = [];
            for (const post of userPosts) {
                const insertedPost = await postsCollection.insertOne(post);
                postIds.push(insertedPost.insertedId);
            }
            await usersCollection.updateOne({ _id: result.insertedId }, { $set: { posts: postIds } });
        }
        res.status(201).json({ message: 'User registered successfully'});
    } catch (error) {res.status(500).json({ message: error.message });}
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });
        const user = await usersCollection.findOne({ email: email });
        if (!user) return res.status(404).json({ message: 'User not found' });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' }); 
        const token = generateToken(user);
        res.status(200).json({ message: 'Logged in successfully', user, token });
    } catch (error) {res.status(500).json({ message: error.message });}
  });
  
  router.get('/user/search', async (req, res) => {
    console.log('GET/posts/search-user')
    const { user } = req.query; 
    try {
        let query = {};
        if (user) {
            query.user = { $regex: user, $options: 'i' };
        }  
        const posts = await usersCollection.find(query).toArray();
        res.json(posts);
    } catch (error) {res.status(500).json({ message: error.message });}   
});


// ADD user ___((--currentUser--))__uncomplete 
   router.post('/user/ajout', async(req,res)=>{
    console.log('GET/user/ajout')
    const {username} =req.body
    try{
        const user_search= await usersCollection.findOne({username: username }).username
        user_search ?currentUser.updateOne({friends:currentUser.friends.push(user_search)}): res.status(400).json({ message: "User doesn't exist" });
    }catch(error){res.status(500).json({ message: error.message });}
   }
   )
// 


// MESSAGES FUNCTION
router.get('/messages', async (req, res) => {
    const muid=req.query.id
    const mid=new ObjectId(muid)
    try {
        const messages = await messagesCollection.find({ userId: mid}).toArray();
        res.json(messages);
    } catch (error) {res.status(500).json({ message: error.message });}
});


router.post('/messages', async (req, res) => {
  const { content , uid , pid } = req.body;
//   const userId  =new ObjectId(uid)
  console.log('POST MESSAGES ID')
//   const user = await usersCollection.findOne({ _id:userId});
  if (!uid) return res.status(404).json({ message: 'User not found' });
  if (!content) return res.status(400).json({ message: 'Text is required' });
  const newMessage = {
    content:content,
    userId: uid,
    postId: pid,
    privMessage:false,
    timestamp: new Date().getTime(),
  };
    try {
        await messagesCollection.insertOne(newMessage);
        res.status(201).json(req.body);
        console.log('succesful message posted')
    } catch (error) {res.status(500).json({ message: error.message });}
});

router.get('/posts/topliked', async (req, res) => {
    const posts = await postsCollection.find().toArray()
    const tet=posts.slice(-10).sort((a, b) =>b.likes.length - a.likes.length);
    res.json(tet);
});

// code incomplet  -- finish
router.post('/user/set-admin', async(req,res)=>{
    const {adminUser,user} = req.body
    try{
    const isAdmin=await usersCollection.findOne({username : adminUser}).admin
    if (isAdmin)     await usersCollection.findOne({username:username})
    else res.status(402).json({message : "Permission denied"})
    } catch (error) {res.status(500).json({ message: error.message });}
})



router.get('user/friends', async(req,res)=>{
})
// Routes manquantes
// add friends --- partially done 
// réponses à un post
// attribution du statut admin ---part done
//search users ----- done 



// // // // // // // // // // // // Essential fonctions and consts
function generateToken(user) {
    const payload =
    {
        id: user._id,
        username: user.username,
        email: user.email,
        admin: user.admin,
        connected: user.connected,
        date: user.date,
    };
    const secretKey = crypto.randomBytes(32).toString('hex');
    const options = { expiresIn: '1h' };
    return jwt.sign(payload, secretKey, options);
}
