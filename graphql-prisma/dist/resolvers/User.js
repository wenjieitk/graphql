'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getUserId = require('../utils/getUserId');

var _getUserId2 = _interopRequireDefault(_getUserId);

var _prisma = require('../prisma');

var _prisma2 = _interopRequireDefault(_prisma);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = {
    // email(parent, args, {request}, info) {
    //     const userid = getUserId(request, false)

    //     console.log("parent: \n" + JSON.stringify(parent))

    //     if(userid && userid === parent.id) {
    //         return parent.email
    //     }else{
    //         return null
    //     }
    // }

    // limit email to show only to login user
    email: {
        fragment: '... based on User {id}',
        resolve: function resolve(parent, args, _ref, info) {
            var request = _ref.request;

            var userid = (0, _getUserId2.default)(request, false);

            if (userid && userid === parent.id) {
                return parent.email;
            } else {
                return null;
            }
        }
    },

    // limit posts to show only published = true
    posts: {
        fragment: '... based on User {id}',
        resolve: function resolve(parent, args, _ref2, info) {
            var request = _ref2.request;

            return _prisma2.default.query.posts({
                where: {
                    published: true,
                    author: {
                        id: parent.id
                    }
                }
            });
        }
    }
};

exports.default = User;