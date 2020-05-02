const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/task-manager-mongoose', {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = mongoose;
// const user = new User({
// 	name: 'Mike',
// 	age:25
// }).save().then((res) => {
// 	console.log(res);
// }).catch((error) => {
// 	console.log(error);
// });
