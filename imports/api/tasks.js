import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  addTask: function(name, priority, goal, integratedWith, dueDate){
    Tasks.insert({
      ownerId: Meteor.userId(),
      taskName: name,
      taskPriority: priority,
      taskGoal: goal,
      totalPomos: 0,
      checked: false,
      integratedWith: integratedWith,
      dueDate: dueDate,
      createdAt: new Date(),
    });

    var temp = Meteor.user().profile;
    temp.taskCount = 1;
    if (Meteor.user().profile.taskCount) {
      temp.taskCount = Meteor.user().profile.taskCount + 1;
    }

    Meteor.users.update(Meteor.userId(),{$set: {profile: temp}});
  },
  editTask: function(id, name, priority, goal, dueDate){
    Tasks.update(id, {
      $set: {
        taskName: name,
        taskPriority: priority,
        taskGoal: goal,
        dueDate: dueDate,
      }
    });
  },
  checkTask: function(id, state){
    Tasks.update(id, {
      $set: { checked: state},
    });
  },
  finishTask: function(id){
    console.log(id);
    var tempTask = Tasks.findOne(id);
    console.log(tempTask);
    if (tempTask.totalPomos) {
      Tasks.update(id, {$inc: { totalPomos: 1}});
    } else {
      Tasks.update(id, {$set: { totalPomos: 1}});
    }

    var tempProfile = Meteor.user().profile;

    if (tempProfile.pomoCount) {
      tempProfile.pomoCount++;
    } else {
      tempProfile.pomoCount = 1;
    }

    Meteor.users.update(Meteor.userId(),{$set: {profile: tempProfile}});
  },
  deleteTask: function(id){
    if (Meteor.userId() && Meteor.userId() === Tasks.findOne(id).ownerId) {
      Tasks.remove(id);
    }
  }
});

if (Meteor.isServer) {
  Meteor.publish('tasks', function(skip) {
    return Tasks.find({ownerId: this.userId}, {skip: skip, limit: 6});
  });
}
