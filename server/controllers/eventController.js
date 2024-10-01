// routes/eventRoutes.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const Event = require('../models/eventsModel');
const db=require('./../config/db')
const router = express.Router();


exports.createEvent = async (req, res) => {
    const { eventName, timeZone, date, startTime, endTime, description, videoLink } = req.body;
    if (!eventName || !timeZone || !date || !startTime || !endTime) {return res.status(400).json({ message: 'All fields are required' });}

    const event = new Event({           
      eventName,
      timeZone,
      date,
      startTime,
      endTime,
      description,
      videoLink,
      bannerImage: req.file ? req.file.path : null 
    });

  
    try {
      await event.save();
      return res.status(201).json({ message: 'Event created successfully', event });
    } catch (err) {
      console.error("Error while creating event:", err); 
      return res.status(500).json({ message: 'An error occurred while creating the event' });
    }
  };


exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) { next(err); }
};


exports.getEvent = async (req, res, next) => {
  try {const event = await Event.findById(req.params.id);
    if (!event) { return res.status(404).json({ message: 'Event not found' });}
    res.status(200).json(event);
  } catch (err) {next(err);}
};


exports.updateEvent =async (req, res, next) => {
  try {
    const { eventName, timeZone, date, startTime, endTime, description, videoLink } = req.body;
    const updatedEvent = {
      eventName,
      timeZone,
      date,
      startTime,
      endTime,
      description,
      videoLink,
    };

    if (req.file) {updatedEvent.bannerImage = req.file.path; }

    const event = await Event.findByIdAndUpdate(req.params.id, updatedEvent, { new: true });
    if (!event) {return res.status(404).json({ message: 'Event not found' }); }
    res.status(200).json({ message: 'Event updated successfully', event });
  } catch (err) {next(err);}
};

exports.deleteEvent = async (req, res, next) => {
  try {const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {return res.status(404).json({ message: 'Event not found' });}
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    next(err);
  }
};




