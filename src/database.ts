import mongoose from 'mongoose';

const DB_URI = process.env.DB_URI;

if (!DB_URI) {
    throw new Error('Please define the DB_URI environment variable inside .env');
}

mongoose.connect(DB_URI);

const db = mongoose.connection;

db.useDb('movies');

db.on('error', (err) => {
    console.error('Database error:', err);
});

db.once('open', () => {
    console.log('Connected to database');
});
