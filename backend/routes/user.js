const Router = require("koa-router");

const router = new Router();
const api = require("./../controller/user");
const sendPicCode = require("../service/picCode");
// 用户注册
router.post("/register", api.register);
// 用户登录
router.post("/login", api.login);
// 发送短信验证码
router.post("/sendSMSCode", api.sendSMSCode);

// 发送图片验证码
router.get("/sendPicCode", sendPicCode);
// 测试接口
// router.get("/getUser", api.);
// 更新个人信息
router.post("/updateUserInfo", api.updateUserInfo);
// 获取用户详细信息
router.get("/getUserInfo", api.getUserInfo);
// 获取官方账号的信息
router.get("/getOfficialInfo", api.getOfficialInfo);
// 获取个人以及好友列表信息 分组状态
router.post("/previewUser", api.previewUser);
// 添加会话
router.post("/addConversationList", api.addConversationList);
// 移除会话
router.post("/removeConversationList", api.removeConversationList);
// 搜索用户
router.post("/searchFriends", api.searchFriends);
// router.post("/modifyFriendRemark", api.modifyFriendRemark);

router.post("/updatedUserPhone", api.updatedUserPhone);
router.post("/updatedUserPassword", api.updatedUserPassword);

router.post("/modifyFriendRemark", api.modifyFriendRemark);
router.post("/updateUserConversations", api.updateUserConversations);
router.post("/deleteDialog", api.deleteDialog);

// 检查是是否是自己的好友
// router.post("/checkIsFriends", api.checkIsFriends);

module.exports = router;
