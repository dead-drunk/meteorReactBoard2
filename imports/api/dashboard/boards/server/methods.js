import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Boards from '../collections.js';
import { palette, getRandomColor } from '../../../../common/palette.js';

const memberShema = {
    cursorX: 0,
    cursorY: 0
};

Meteor.methods({
    'boards.addNew' (name) {
        check(name, String);
        let createdAt = new Date();
        let oldDoc = Meteor.users.find({ _id: this.userId }).fetch();
        let profileExt = oldDoc[0].profileExt;
        let nicName = profileExt.nicName;
        let boardId = Boards.insert({
            name: name,
            owner: this.userId,
            createdAt: createdAt,
            description: '',
            members: [
            { id: this.userId, nicName: nicName, active: false }
            ],
            settings: {
                type: ''
            },
            body: []
        });
  
        let board = {
            name: name,
            id: boardId,
            owner: this.userId,
            createdAt: createdAt,
            description: '',
            members: [
            { id: this.userId, nicName: nicName }
            ]
        };
        let newBoards = [];
        
        let oldBoards= oldDoc[0].boards;
        if(oldBoards) newBoards = [...oldBoards];
        newBoards.push(board);
        Meteor.users.update(this.userId, { $set: { boards: newBoards } });
        return board
    },

    'boards.addMember' (member, boardId) {
        check(member, Object);
        check(boardId, String);
        
        let oldBoard = Boards.find({ _id: boardId }).fetch();
        let newMembers = [...oldBoard[0].members, { id: member._id, nicName: member.nicName,  active: false }];
        Boards.update(boardId, { $set: { members: newMembers } });

        let newBoard = {
            name: oldBoard[0].name,
            id: boardId,
            owner: oldBoard[0].owner,
            createdAt: oldBoard[0].createdAt,
            description: oldBoard[0].description,
            members: newMembers
        }
        let oldMembersId = oldBoard[0].members.map(item => item.id);
        let oldUserDoc = Meteor.users.find({ _id: member._id }).fetch();
        if(!oldUserDoc[0].boards) {
            let boards = [newBoard];
            Meteor.users.update(member._id, { $set: { boards: boards } });
        } else {
            let boards = [...oldUserDoc[0].boards, newBoard];
            Meteor.users.update(member._id, { $set: { boards: boards } });
        }

        let userOldArr = Meteor.users.find({_id: {$in: oldMembersId}} ).fetch();
        userOldArr.forEach((user) => {
            let newUserBoards = user.boards.map((item)=> {
                    if(item.id === boardId) return newBoard;
                    return item
            });
             Meteor.users.update(user._id, { $set: { boards: newUserBoards } });
        });

        return userOldArr
    },

    'boards.logMember' (boardId) {
        check(boardId, String);
        let profileExt = Meteor.users.find({ _id: this.userId }).fetch()[0].profileExt;
        let avatarSrc = profileExt.avatarSrc;

        let oldMembers = Boards.find({ _id: boardId }).fetch()[0].members;
        let newMembers = oldMembers.map((item, index )=> {
            if(item.id === this.userId) {
                item.active = true;
                item.avatarSrc = avatarSrc;
                if(index > 15) {
                    item.color = getRandomColor(80)
                } else {
                    item.color = palette[index].color
                }
                return { ...item, ...memberShema };
            } else {
                return item
            }
        });
        Boards.update(boardId, { $set: { members: newMembers } });
        return 'boards.logMember is OK'
        
     },
    'boards.LogOut' (boardId, id) {
        check(boardId, String);
        check(id, String);
        
        let oldMembers = Boards.find({ _id: boardId }).fetch()[0].members;
        let newMembers = oldMembers.map((item, index )=> {
            if(item.id === id) {
                item.active = false;
                return item
            } else {
                return item
            }
        });
        Boards.update(boardId, { $set: { members: newMembers } });
        return 'boards.LogOut is OK'
        
     }  
});    
