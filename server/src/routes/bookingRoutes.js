// File: routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all bookings
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve bookings' });
  }
});

// POST a new booking
router.post('/bookings', async (req, res) => {
  try {
    const { date, time, municipalityId, userId } = req.body;
    const newBooking = await prisma.booking.create({
      data: {
        date,
        time,
        municipalityId,
        userId
      }
    });
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

module.exports = router;
