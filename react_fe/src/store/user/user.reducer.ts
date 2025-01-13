import { createSlice } from '@reduxjs/toolkit';

import {
  ChangePassword,
  getProfile,
  addUserSavePost,
  getUserSkill,
  updateProfile,
  updateUserSkill,
  getUserSavePost,
  getUserByAdmin,
  deleteUserByAdmin,
  resetPassword,
  forgotPassword,
  mailSubscribe,
} from './user.action';

const initialState: Types.IUserState = {
  actionType: '',
  loading: false,
  profile: undefined,
  userSkill: undefined,
  savePost: undefined,
  userList: undefined,
};

const UserSlice = createSlice({
  name: 'app/user',
  initialState,
  reducers: {
    // resetWorkStandardStore: () => initialState,
  },
  extraReducers: (builder) => {
    // change password
    builder.addCase(ChangePassword.pending, (state, action) => {
      state.loading = true;
      state.actionType = action.type;
    });
    builder.addCase(ChangePassword.fulfilled, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });
    builder.addCase(ChangePassword.rejected, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });

    builder.addCase(getProfile.pending, (state, action) => {
      state.loading = true;
      state.actionType = action.type;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
      console.log(action.payload.data);
      state.profile = action.payload.data;
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });
    //UPDATE USER PROFILE
    builder.addCase(updateProfile.pending, (state, action) => {
      state.loading = true;
      state.actionType = action.type;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });
    // GET USER SKILL
    builder.addCase(getUserSkill.pending, (state, action) => {
      state.loading = true;
      state.actionType = action.type;
    });
    builder.addCase(getUserSkill.fulfilled, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
      state.userSkill = action.payload.data;
    });
    builder.addCase(getUserSkill.rejected, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });
    // UPDATE USER SKILL
    builder.addCase(updateUserSkill.pending, (state, action) => {
      state.loading = true;
      state.actionType = action.type;
    });
    builder.addCase(updateUserSkill.fulfilled, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
      state.userSkill = action.payload.data;
    });
    builder.addCase(updateUserSkill.rejected, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });

    // UPDATE SAVE POST
    builder.addCase(addUserSavePost.pending, (state, action) => {
      state.loading = true;
      state.actionType = action.type;
    });
    builder.addCase(addUserSavePost.fulfilled, (state, action) => {
      state.loading = false;
      state.savePost = action.payload.data;
      state.actionType = action.type;
    });
    builder.addCase(addUserSavePost.rejected, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });
    // GET SAVE POST
    builder.addCase(getUserSavePost.pending, (state, action) => {
      state.loading = true;
      state.actionType = action.type;
    });
    builder.addCase(getUserSavePost.fulfilled, (state, action) => {
      state.loading = false;
      state.savePost = action.payload.data;
      state.actionType = action.type;
    });
    builder.addCase(getUserSavePost.rejected, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });
    // GET ALL USER
    builder.addCase(getUserByAdmin.pending, (state, action) => {
      state.loading = true;
      state.actionType = action.type;
    });
    builder.addCase(getUserByAdmin.fulfilled, (state, action) => {
      state.loading = false;
      state.userList = action.payload.data;
      state.actionType = action.type;
    });
    builder.addCase(getUserByAdmin.rejected, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });
    // DELETE USER
    builder.addCase(deleteUserByAdmin.pending, (state, action) => {
      state.loading = true;
      state.actionType = action.type;
    });
    builder.addCase(deleteUserByAdmin.fulfilled, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });
    builder.addCase(deleteUserByAdmin.rejected, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });
    // RESET PASSWORD
    builder.addCase(resetPassword.pending, (state, action) => {
      state.loading = true;
      state.actionType = action.type;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });
    // FORGOT PASSWORD
    builder.addCase(forgotPassword.pending, (state, action) => {
      state.loading = true;
      state.actionType = action.type;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });
    // MAIL SUBSCRIBE
    builder.addCase(mailSubscribe.pending, (state, action) => {
      state.loading = true;
      state.actionType = action.type;
    });
    builder.addCase(mailSubscribe.fulfilled, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });
    builder.addCase(mailSubscribe.rejected, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });
  },
});
// export const { resetWorkStandardStore } = LoginSlice.actions;
export default UserSlice.reducer;
