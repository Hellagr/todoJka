const User = require('../models/user');
const Taskpanel = require('../models/taskpanel');
const kraken = require('../kraken')

module.exports.homepage = (req, res) => {
    res.render('./otherCards/homepage');
}

module.exports.userpanels = async (req, res) => {
    const sessionUser = req.session.passport.user;
    const dbUser = await User.find({ username: sessionUser });
    const idUserTask = dbUser[0].taskpanels;
    const taskpanels = await Taskpanel.find({ _id: idUserTask });
    res.render('userHomePage', { taskpanels });
}

module.exports.createTask = async (req, res) => {
    const sessionUser = req.session.passport.user;
    const dbUser = await User.find({ username: sessionUser });
    const addNewCard = new Taskpanel(req.body.taskpanel);
    await addNewCard.save();
    // taskpanels.shift()
    // dbUser[0].taskpanels.shift()
    await dbUser[0].taskpanels.push(addNewCard);
    await dbUser[0].save();
    req.flash('success', 'Successfully made a new Card!');
    res.redirect(`/userpanel`);
}

module.exports.changeTask = async (req, res) => {
    if (!req.body.taskpanel) throw new AppError('Invalid Card Data!', 400);
    const { id } = req.params;
    const taskpanel = await Taskpanel.findByIdAndUpdate(id, { ...req.body.taskpanel });
    req.flash('success', 'Successfully update a Card!');
    res.redirect('/userpanel');
}

module.exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    const sessionUser = req.session.passport.user;
    const dbUser = await User.find({ username: sessionUser });
    const idUserTask = dbUser[0].taskpanels;
    const idUserForDelete = await idUserTask.find(idTask => idTask._id == id);
    await Taskpanel.findByIdAndDelete(id);
    await idUserTask.remove(idUserForDelete);
    await dbUser[0].save();
    req.flash('success', 'Successfully deleted a Card!');
    res.redirect('/userpanel');
}

module.exports.completed = (req, res) => {
    res.render('./otherCards/completed');
}

module.exports.deleted = (req, res) => {
    res.render('./otherCards/deleted');
}

