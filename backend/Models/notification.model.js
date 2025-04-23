// Notification Model
const NotificationSchema = new mongoose.Schema({
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['FRIEND_REQUEST', 'REQUEST_ACCEPTED'], required: true },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  });

const Notification = mongoose.model('Notification', NotificationSchema);
export default Notification;