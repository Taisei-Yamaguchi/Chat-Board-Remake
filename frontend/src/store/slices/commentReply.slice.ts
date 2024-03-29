import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CommentReplyState = {
    commentReply:number|null
};

const defaultState: CommentReplyState = {
    commentReply:null
};

export const commentReplySlice = createSlice({
    name: 'commentReplySlice',
    initialState: defaultState,
    reducers: {
        setCommentReply(state, action: PayloadAction<number|null>) { 
            state.commentReply = action.payload; 
        },
    }
});

export const { setCommentReply } = commentReplySlice.actions;

export default commentReplySlice.reducer;
