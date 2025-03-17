// seed.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const TravelLog = require('./models/TravelLog');

const MONGO_URI = process.env.MONGO_URI;

const users = [
  {
    username: 'alice',
    email: 'alice@example.com',
    password: 'alice123',
  },
  {
    username: 'bob',
    email: 'bob@example.com',
    password: 'bob123',
  },
  {
    username: 'charlie',
    email: 'charlie@example.com',
    password: 'charlie123',
  },
  {
    username: 'daisy',
    email: 'daisy@example.com',
    password: 'daisy123',
  },
  {
    username: 'ethan',
    email: 'ethan@example.com',
    password: 'ethan123',
  },
];

const logs = [
  {
    title: 'Paris Getaway',
    experience: 'Saw the Eiffel Tower and enjoyed amazing croissants.',
  },
  {
    title: 'Tokyo Adventure',
    experience: 'Experienced the Shibuya crossing and had sushi.',
  },
  {
    title: 'Bali Relaxation',
    experience: 'Surfed the waves and relaxed on the beach.',
  },
  {
    title: 'New York Hustle',
    experience: 'Visited Times Square and Central Park.',
  },
  {
    title: 'Swiss Alps Hike',
    experience: 'Hiked through snowy mountains and had fondue.',
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    await TravelLog.deleteMany({});

    for (let i = 0; i < users.length; i++) {
      const hashedPassword = await bcrypt.hash(users[i].password, 10);
      const user = new User({
        username: users[i].username,
        email: users[i].email,
        password: hashedPassword,
      });
      const savedUser = await user.save();

      const userLog = new TravelLog({
        user: savedUser._id,
        title: logs[i].title,
        experience: logs[i].experience,
      });

      await userLog.save();
    }

    console.log('🟢 Seeded 5 users and their travel logs!');
    process.exit();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();
