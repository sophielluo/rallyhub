const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bookingRoutes = require('./src/routes/bookingRoutes');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Use booking routes
app.use('/api', bookingRoutes);

app.post('/api/users', async (req, res) => {
  const { firebaseUid, email, displayName } = req.body;
  try {
    const user = await prisma.user.upsert({
      where: { firebaseUid: firebaseUid },
      update: { email, displayName },
      create: { firebaseUid, email, displayName },
    });
    res.json(user);
  } catch (error) {
    console.error('Error creating/updating user:', error);
    res.status(500).json({ error: 'Failed to create/update user' });
  }
});

app.get('/api/municipalities', async (req, res) => {
  try {
    console.log('Fetching municipalities...'); // Log for debugging
    const municipalities = await prisma.municipality.findMany();
    console.log('Municipalities fetched:', JSON.stringify(municipalities, null, 2)); // Pretty print the result
    res.json(municipalities);
  } catch (error) {
    console.error('Error fetching municipalities:', error);
    res.status(500).json({
      error: 'Failed to fetch municipalities',
      details: error.message,
      stack: error.stack,
      name: error.name
    });
  }
});

// New endpoint for fetching clubs by municipalityId
app.get('/api/clubs', async (req, res) => {
  const { municipalityId } = req.query;
  
  if (!municipalityId) {
    return res.status(400).json({ error: 'municipalityId is required' });
  }

  try {
    console.log(`Fetching clubs for municipalityId: ${municipalityId}`);
    const clubs = await prisma.club.findMany({
      where: {
        municipalityId: parseInt(municipalityId, 10) // Convert to integer
      },
      select: {
        id: true,
        name: true,
        description: true,
        sports: true
      }
    });
    console.log('Clubs fetched:', JSON.stringify(clubs, null, 2)); // Pretty print the result
    res.json(clubs);
  } catch (error) {
    console.error('Error fetching clubs:', error);
    res.status(500).json({ error: 'Failed to fetch clubs', details: error.message, stack: error.stack });
  }
});

// Endpoint for fetching all clubs
app.get('/api/allclubs', async (req, res) => {
  try {
    console.log('Fetching all club names');
    const clubs = await prisma.club.findMany({
      select: {
        name: true
      }
    });
    console.log('Club names fetched:', JSON.stringify(clubs, null, 2));
    res.json(clubs);
  } catch (error) {
    console.error('Error fetching club names:', error);
    res.status(500).json({ error: 'Failed to fetch club names', details: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));