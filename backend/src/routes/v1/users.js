const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.Controller");
const AuthMiddleware = require("../../middlewares/auth.middleware");
const TokenService = require("../../services/token.service");
const crawlDataService = require("../../services/crawlData.service");
const { authentication } = require("../../middlewares/auth.middleware");

// const bodyParser = require('body-parser')

// router.use(bodyParser.json());
// // parse json request body
// router.use(express.json({ limit: '50mb' }));
// // parse urlencoded request body
// router.use(express.urlencoded({ limit: '50mb', extended: true }));

// Lấy danh sách người dùng
router.get("/", async (req, res) => {
  try {
    const users = await userController.getUsers();
    const _user = users.map((user) => {
      return { ...user, avatar: JSON.parse(user.avatar) };
    });
    res.status(200).json(_user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error1" });
  }
});
router.get("/company", async (req, res) => {
  try {
    const users = await userController.getCompanies();
    const _user = users.map((user) => {
      return { ...user, avatar: JSON.parse(user.avatar) };
    });
    res.status(200).json(_user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error1" });
  }
});
router.get("/me", [AuthMiddleware.authorize], async (req, res) => {
  try {
    const user_id = TokenService.getInfoFromToken(req).id;
    console.log(user_id);
    const user = await userController.getUserById(user_id);
    if (user) {
      res.status(200).json({ ...user, avatar: JSON.parse(user.avatar) });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/skill", authentication, async (req, res) => {
  try {
    const userSkill = await userController.getUserSkillByUserId(req.user.id);
    console.log(userSkill);
    if (!userSkill) {
      return res.status(200).json({});
    }
    userSkill.skill = JSON.parse(userSkill.skill);
    return res.status(200).json(userSkill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Tạo người dùng mới
router.post("/", async (req, res) => {
  const newUser = req.body;
  try {
    console.log(newUser);
    await userController.createUser(newUser);
    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Cập nhật thông tin người dùng
router.put("/me", authentication, async (req, res) => {
  const updatedUser = req.body;
  try {
    const user_id = TokenService.getInfoFromToken(req).id;
    const user = await userController.getUserById(user_id);
    if (user) {
      await userController.updateUser(user_id, {
        ...updatedUser,
        avatar: JSON.stringify(updatedUser.avatar),
      });
      const user = await userController.getUserById(user_id);
      user.avatar = JSON.parse(user.avatar);
      res.json({
        message: "User updated",
        data: user,
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/skill", authentication, async (req, res) => {
  try {
    const dataUpdate = {
      ...req.body,
      major_category_id: req.body.major,
      skill: JSON.stringify(req.body.skill),
    };
    delete dataUpdate.major;
    const userSkillGet = await userController.getUserSkillByUserId(req.user.id);
    if (!userSkillGet) {
      dataUpdate.user_id = req.user.id;
      await userController.createUserSkillByUserId(req.user.id, dataUpdate);
    } else {
      await userController.updateUserSkillByUserId(req.user.id, dataUpdate);
    }
    const userSkill = await userController.getUserSkillByUserId(req.user.id);
    userSkill.skill = JSON.parse(userSkill.skill);
    res.status(200).json(userSkill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/save-post/:post_id", authentication, async (req, res) => {
  try {
    const post_id = req.params.post_id;
    const user = await userController.getUserById(req.user.id);
    const currentSave = (user.save_post && JSON.parse(user.save_post)) || [];
    if (currentSave.includes(post_id)) {
      const newPostSave = currentSave.filter((post) => post !== post_id);
      user.save_post = JSON.stringify(newPostSave);
      await userController.updateUser(user.id, user);
    } else {
      const newPostSave = [...currentSave, post_id];
      user.save_post = JSON.stringify(newPostSave);
      await userController.updateUser(user.id, user);
    }
    const _after = JSON.parse(user.save_post)
    const saves = [];
    for (let i = 0; i < _after.length; i++) {
      const postId = Number(_after[i]);
      const data = await crawlDataService.getDataCrawlById(postId);
      data.images =
        data.images && data.images !== "None"
          ? JSON.parse(
              data.images.replaceAll("None", null).replaceAll("'", '"')
            )
          : null;
      saves.push(data);
    }

    res.status(200).json(saves);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/save-post", authentication, async (req, res) => {
  try {
    const user = await userController.getUserById(req.user.id);
    const currentSave = (user.save_post && JSON.parse(user.save_post)) || [];

    const saves = [];
    for (let i = 0; i < currentSave.length; i++) {
      const postId = Number(currentSave[i]);
      const data = await crawlDataService.getDataCrawlById(postId);
      data.images =
        data.images && data.images !== "None"
          ? JSON.parse(
              data.images.replaceAll("None", null).replaceAll("'", '"')
            )
          : null;
      saves.push(data);
    }

    res.status(200).json(saves);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Lấy thông tin người dùng theo ID
router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userController.getUserById(userId);
    if (user) {
      user.avatar = JSON.parse(user.avatar);
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Xóa người dùng
router.delete("/:id", [AuthMiddleware.authorize], async (req, res) => {
  const userId = req.params.id;
  try {
    await userController.deleteUser(userId);
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
