// // GET a specific post by ID //inutile
// router.get('/posts/:id', async (req, res) => {
//     try {
//         const post = await postsCollection.findOne({ _id: ObjectId(req.params.id) });
//         if (!post) {
//             res.status(404).json({ message: 'Post not found' });
//         } else {
//             res.json(post);
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });