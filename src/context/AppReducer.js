const appReducer = (state, action) => {

    switch(action.type) { 
        // case 'UPDATE_BPM':
        //     const copyState1 = { ...state };
        //     copyState1.bpm = action.payload.bpm;
        //     //console.log(action.payload.bpm)
        //     return copyState1;
        // case 'TOGGLE_BEAT':
        //     const copyState = { ...state };
        //     copyState.tracks[action.payload.id-1].beats[action.payload.index].selected = !state.tracks[action.payload.id-1].beats[action.payload.index].selected;
        //     //console.log(copyState)
        //     return copyState;

        // return {
        //     ...state,
        //     tracks: state.tracks[action.payload.id].beats[action.payload.index].selected = !state.tracks[action.payload.id].beats[action.payload.index].selected
        // }
        default:
            return state;
    }
}

export default appReducer;