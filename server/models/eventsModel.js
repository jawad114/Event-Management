const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    trim: true,
  },
  timeZone: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  videoLink: {
    type: String,
    validate: {
      validator: function (v) {
        return /^https:\/\/.*/.test(v);
      },
      message: props => `${props.value} is not a valid https link!`
    }
  },
  bannerImage: {
    type: String,
    required: true,
    set: (value) => {
        // Replace any backslashes with forward slashes
        const correctedPath = value.replace(/\\/g, '/');
        // Ensure the path starts with '/uploads'
        return `http://localhost:9000${correctedPath.startsWith('/') ? '' : '/'}${correctedPath}`;
    },
}

  
}, { timestamps: true });

const Event = mongoose.model('events', eventSchema);

module.exports = Event;
