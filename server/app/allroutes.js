const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const bcrypt = require('bcrypt');
const cors = require('cors');
const session = require('express-session');
const { required } = require('joi');

router.use(cors());
router.use(express.json());
const MongoClient = require('mongodb').MongoClient;
const mongoURL = 'mongodb+srv://maxwelloccansey:amineMaxwell75%3F@organizasso.oqwz5xd.mongodb.net/organizasso';
const dbName = 'organizasso';
let postsCollection = "";
let messagesCollection = '';
let usersCollection = '';

MongoClient.connect(mongoURL)
    .then(client => {
        console.log('Connected to MongoDB');
        const db = client.db(dbName);
        postsCollection = db.collection('posts');
        usersCollection = db.collection('users');
        messagesCollection = db.collection('messages');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

    router.use(session({
        secret: 'your secret key', // Replace with your own secret key
        resave: false,
        saveUninitialized: true,
        cookie: {
        maxAge: 2 * 60 * 60 * 1000, // Set the cookie to last for 2 hours
        secure: false // Set to true if using HTTPS
      }}));  

// // // // // // // // // // // // POSTS
// GET ALL POSTS 
router.get('/posts/private', async (req, res) => {
    try {
        const posts = await postsCollection.find({ privatePost: true }).toArray();
        res.json(posts);
    } catch (error) {res.status(500).json({ message: error.message });}});

router.get('/posts/public', async (req, res) => {
    try {
        const posts = await postsCollection.find({ privatePost: false }).toArray();
        res.json(posts);
    } catch (error) {res.status(500).json({ message: error.message });}});

// GET MESSAGES BASED ON A QUERY 
router.get('/posts/search', async (req, res) => {
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
    } catch (error) {
        res.status(500).json({ message: error.message });}});

// Create a new post
router.post('/posts/private', async (req, res) => {
    const { title, content } = req.body; // Destructuring req.body to extract title and content
    const userId = req.query.userId
    if (!title || !content) return res.status(400).json({ message: 'Title and content are required' });
    if (!userId) return res.status(400).json({message: 'Userid rquired'})
    try {
        const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
        if (!user) return res.status(400).json({message: 'User not found'});
        if (!user.member) return res.status(403).json({message :'Only members can post '});
        if (!user.admin) return res.status(403).json({message :'Only admins can post in the private space'});
        const newPost = {
            userid: userId,
            title: title,
            content: content,
            privatePost: true,
            messages: [],
            likes: [],
            dislikes: [],
            timestamp: new Date()
        };
        const post=await postsCollection.insertOne(newPost)
        const postId=post.insertedId.toString();
        await usersCollection.updateOne({_id: new ObjectId(userId)},{$push:{posts:postId}})
        res.status(201).json({message :"succesful private post posted"});
    } catch (error) {
        res.status(500).json({ message: error.message })}});

router.post('/posts/public', async (req, res) => {
    const { title, content } = req.body; // Destructuring req.body to extract title and content
    const userId = req.query.userId
    if (!title || !content) return res.status(400).json({ message: 'Title and content are required' });
    if (!userId) return res.status(400).json({message: 'userId required'})
    try {
        const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
        if (!user) return res.status(400).json({message: 'User not found'});
        if (!user.member) return res.status(403).json({message :'Only members can post '});
        const newPost = {
            userid: userId,
            title: title,
            content: content,
            privatePost: false,
            messages: [],
            likes: [],
            dislikes: [],
            timestamp: new Date()
        };
        const post=await postsCollection.insertOne(newPost)
        const postId=post.insertedId.toString();
        await usersCollection.updateOne({_id: new ObjectId(userId)},{$push:{posts:postId}})
        res.status(201).json({message :"succesful public post posted"});
    } catch (error) {res.status(500).json({ message: error.message });}});

router.get('/posts/messages',async(req,res)=>{
    const postId=req.query.postId;
    if (!postId) return res.status(400).json({message : 'postId required' })
    try{
        const poster=await postsCollection.find({_id:new ObjectId(postId)});
        if(!poster) return res.status(400).json('POST NOT FOUND')
        const messages= await messagesCollection.find({postId :postId}).toArray();
        return res.status(200).json(messages);
    }catch(error){res.status(500).json({message:'erreur interne'+error.message})}})

router.post('/posts/messages',async(req,res)=>{
    const {postId, userId}=req.query
    const content=req.body.content
    if (!postId) return res.status(401).json({message: 'postId required'})
    if (!userId) return res.status(401).json({message: 'userId required'})
    if (!content) return res.status(401).json({message: 'content required'})
        
    try{
        const userPresent=await usersCollection.findOne({ _id:new ObjectId(userId) });
        if(!userPresent) return res.status(400).json({message : "user not found"}) ;
        const username=userPresent.username;
        if(!username) res.status(400).json('this user has no usernam')
        const postPresent=await postsCollection.findOne({ _id:new ObjectId(postId) });
        if(!postPresent) return res.status(400).json({message : "post not found"}) ;
        const newMessage = {
            content: content,
            username: username,
            userId: userId,
            postId: postId,
            timestamp: new Date().getTime(),
        };
        const message=await messagesCollection.insertOne(newMessage);
        if(!message.acknowledged) return res.status(400).json({message : "error inserting message"}) ;
        const messageId=message.insertedId.toString();
        const insertMessageUser=await usersCollection.updateOne({ _id:new ObjectId(userId) },{$push:{messages:messageId}});
        if (insertMessageUser.modifiedCount <1) return res.status(400).json({message : "user not found"}) ;
        const insertPostUser=await postsCollection.updateOne({ _id:new ObjectId(postId) },{$push:{messages:messageId}})
        if (insertPostUser.modifiedCount <1) return res.status(400).json({message : "post not found"}) 
        return res.status(201).json({message :"succesful comment posted "})
    }catch(error){res.status(500).json({message :' erreur interne '+error.message})}})




// Delete a post by ID
router.delete('/posts', async (req, res) => {
    const postId = new ObjectId(req.params.id)
    try {
        const result = await postsCollection.deleteOne({ _id: postId });
        if (result.deletedCount === 0) {
            res.status(404).json({ message: 'Post already deleted or not found' });
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });}});


// // // // // // // // // // // // USERS
// SIGN UP
// Register endpoint
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username ) return res.status(400).json({ message: 'Username required' });
        if (!email ) return res.status(400).json({ message: 'email required' });
        if (!password ) return res.status(400).json({ message: 'password required' });

        const existingUser = await usersCollection.findOne({ username: username } );
        if (existingUser) return res.status(400).json({ message: 'Username already exists' });
        const existingMail = await usersCollection.findOne({ email: email } );
        if (existingMail) return res.status(400).json({ message: 'Email already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            username: username,
            email: email,
            password: hashedPassword,
            admin: false,
            member:false,
            connected: true,
            posts: [],
            messages: [],
            timestamp: new Date().getTime()
        };
        await usersCollection.insertOne(newUser);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });}});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ message: 'username and password are required' });
        const user = await usersCollection.findOne({ username: username });
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (!user.member) return res.status(403).json({message : 'Please wait for approval by an admin'})
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });
        req.session.userId =user._id.toString();
        res.status(200).json({ message: 'Logged in successfully',user : user});
    } catch (error) {
        res.status(500).json({ message: error.message });}});


router.get('/posts/topliked', async (req, res) => {
    const posts = await postsCollection.find().toArray()
    const tet = posts.sort((a, b) => b.likes.length - a.likes.length);
    res.status(201).json(tet);});


router.get('/user/profile',async(req,res)=>{
    const userId=req.query.userId
    if(!userId) return res.status(400).json({message : 'User id required'})
    try{ 
    const user=await usersCollection.findOne({_id:new ObjectId(userId)});
    if(!user) return res.status(400).json({message: 'user not found'});
    const posts=await postsCollection.find({userid:userId}).toArray();
    return res.status(201).json({profile:user, posts:posts })
    }catch(error){res.status(500).json({message :'erreur interne'+error.message} )}})

router.post('/makeadmin', async (req, res) => {
    const { adminId, memberId } = req.query
    if (!adminId || !memberId ) return res.status(400).json('adminId and memberid required') 
    try {
        const user = await usersCollection.findOne({ _id: new ObjectId(adminId) })
        if (!user) return res.status(402).json({ message: 'admin not found' })
        if (!user.admin) return res.status(403).json({ message: 'Action only allowed by admin' })

        const member = await usersCollection.findOne({ _id: new ObjectId(memberId) })
        if (!member) return res.status(402).json({ message: 'member not found' })
        if (member.admin) return res.status(402).json({ message: 'this member is already an admin' })

        await usersCollection.updateOne({ _id: new ObjectId( memberId)},{$set:{ admin: true }})
        return res.status(201).json({ message: 'member is now an admin' })
    }
    catch (error) { return res.status(500).json({ message: "erreur interne "+error.message }) }});

router.get('/users',async(req,res)=>{
    try{
    const users=await usersCollection.find().toArray()
    return res.status(201).json(users)
    }catch(error){
        return res.status(500).json({message : 'erreur interne'+error.message})}})

router.post('/acceptmember', async (req, res) => {
    const { adminId, userId } = req.query
    if (!adminId || !userId ) return res.status(400).json('adminId and userid required') 
    try {
        const admin = await usersCollection.findOne({ _id: new ObjectId(adminId) })
        if (!admin) return res.status(402).json({ message: 'admin not found' })
        if (!admin.admin) return res.status(403).json({ message: 'Action only allowed by admin' })

        const guest = await usersCollection.findOne({ _id: new ObjectId(userId) })
        if (!guest) return res.status(402).json({ message: 'guest not found' })
        if (guest.member) return res.status(402).json({ message: 'this guest is already a member' })

        await usersCollection.updateOne({ _id: new ObjectId( userId)},{$set:{ member: true }})
        return res.status(201).json({ message: 'guest is now a member' })
    }
    catch (error) { return res.status(500).json({ message: "erreur interne "+error.message })}});


router.post('/like', async(req,res)=>{
    const {userId,postId}=req.query
    if (!(userId && postId)) return res.status(400).json({message: 'userId && postId required'})
    try{
        const post=await postsCollection.findOne({_id: new ObjectId(postId)})
        const user=await usersCollection.findOne({_id: new ObjectId(userId)})
        if (!user) return res.status(400).json({message : 'User not found'})
        if (!post) return res.status(400).json({message :'Post not found'})
        if (!user.member) return res.status(403).json({message: 'likes reserved to members '})
        if (post.likes.includes(userId)) return res.status(400).json('Post already liked')
        await postsCollection.updateOne({_id : new ObjectId(postId) },{$push:{likes: userId}});
        return res.status(202).json('post liked')
    }catch(error){res.status(500).json({message: "erreur interne"+error.message})}})

router.post('/dislike', async(req,res)=>{
    const {userId,postId}=req.query
    if (!(userId && postId)) return res.status(400).json({message: 'userId && postId required'})
    try{
        const post=await postsCollection.findOne({_id: new ObjectId(postId)})
        const user=await usersCollection.findOne({_id: new ObjectId(userId)})
        if (!user) return res.status(400).json({message : 'User not found'})
        if (!user.member) return res.status(403).json({message: 'dislikes reserved to members '})
        if (!post) return res.status(400).json({message :'Post not found'})
        if (post.dislikes.includes(userId)) return res.status(400).json('Post already disliked')
        await postsCollection.updateOne({_id : new ObjectId(postId) },{$push:{dislikes: userId}});
        return res.status(201).json('post disliked')
    }catch(error){res.status(500).json({message: "erreur interne"+error.message})}})


router.get('/logout',async (req, res) => {
    req.session.destroy();
    res.json({ success: true });
  });
  

module.exports = router;

// // // // // // // // // // // // Essential fonctions and consts

