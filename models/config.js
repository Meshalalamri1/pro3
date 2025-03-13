
const mongoose = require('mongoose');

// استخدام رابط MongoDB من متغيرات البيئة أو استخدام الرابط المباشر كاحتياطي
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://meshal:Meshal2009@cluster0.ebduv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB database');
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
  });

module.exports = mongoose.connection;
