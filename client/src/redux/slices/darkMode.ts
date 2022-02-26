import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DarkModeState {
  darkMode: boolean;
}

const initialState: DarkModeState = {
  darkMode: false,
};

const toggleDarkModeReducer = (
  state: DarkModeState,
  payload: PayloadAction<boolean>
) => {
  const body = document.querySelector('body');
  if (body) {
    if (state.darkMode) {
      body?.classList.remove('dark');
      body.style.backgroundColor = 'white';
      body.style.color = 'black';
    } else {
      body?.classList.add('dark');
      body.style.backgroundColor = 'black';
      body.style.color = 'white';
    }
  }
  state.darkMode = !state.darkMode;
};

const deactivateDarkModeReducer = (state: DarkModeState) => {
  const body = document.querySelector('body');
  if (body) {
    body?.classList.remove('dark');
    body.style.backgroundColor = 'white';
    body.style.color = 'black';
  }
  state.darkMode = false;
};

const activateDarkModeReducer = (state: DarkModeState) => {
  const body = document.querySelector('body');
  if (body) {
    body?.classList.add('dark');
    body.style.backgroundColor = 'black';
    body.style.color = 'white';
  }
  state.darkMode = true;
};

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggleDarkMode: toggleDarkModeReducer,
    activateDarkMode: activateDarkModeReducer,
    deactivateDarkMode: deactivateDarkModeReducer,
  },
});

// dispatch action
// const dispatch=useAppDispatch();
// dispatch(toggleDarkMode())

// use state
// const darkMode=useAppSelector(state=>state.darkMode)

export const { toggleDarkMode, activateDarkMode, deactivateDarkMode } =
  darkModeSlice.actions;
export default darkModeSlice.reducer;
