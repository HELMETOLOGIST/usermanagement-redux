import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'

const initialState = {
  isAuthenticated: false,
  user: null,
  users: [],
  loading: false,
  registered: false,
};

export const register = createAsyncThunk(
  'user_account/register',
  async ({ username, email, password }, thunkAPI) => {
    const body = {
      username,
      email,
      password
    };

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/user_account/register/', body, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 201) {
        return res.data;
      } else {
        console.log(res.data);
        return thunkAPI.rejectWithValue(res.data);
      }
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const updateUser = createAsyncThunk(
  'user_account/updateUser',
  async ({ id, username, email }, thunkAPI) => {
    const body = {
      username,
      email,
    };

    try {
      const res = await axios.put(`http://127.0.0.1:8000/api/user_account/users/${id}/`, body, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('accessToken')}`,
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 200) {
        return res.data;
      } else {
        return thunkAPI.rejectWithValue(res.data);
      }
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const deleteUser = createAsyncThunk(
  'user_account/deleteUser',
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`http://127.0.0.1:8000/api/user_account/users/${id}/`, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('accessToken')}`
        }
      });
      
      if (res.status === 204) {
        return id;
      } else {
        return thunkAPI.rejectWithValue(res.data);
      }
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);



export const fetchUsers = createAsyncThunk(
  'user_account/fetchUsers',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/user_account/users/', {
        headers: {
          'Authorization': `Bearer ${Cookies.get('accessToken')}`
        }
      });
      
      if (res.status === 200) {
        return res.data;
      } else {
        return thunkAPI.rejectWithValue(res.data);
      }
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
  );

  
  export const pictureUpdate = createAsyncThunk(
    'user_account/pictureUpdate',
    async ({ id, formData }, thunkAPI) => {
      try {
        const res = await axios.put(`http://127.0.0.1:8000/api/user_account/users/${id}/`, formData, {
          headers: {
            'Authorization': `Bearer ${Cookies.get('accessToken')}`,
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (res.status === 200) {
          return res.data;
        } else {
          return thunkAPI.rejectWithValue(res.data);
        }
      } catch (err) {
        console.log(err);
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
      }
    }
  );
  
export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/user_account/profile/', {
        headers: {
          'Authorization': `Bearer ${Cookies.get('accessToken')}`,
        },
      });

      if (res.status === 200) {
        return res.data;
      } else {
        return thunkAPI.rejectWithValue(res.data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);



export const login = createAsyncThunk(
  'user_account/login',
  async ({ email, password }, thunkAPI) => {
    const body = {
      email,
      password,
    };

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/token/login/', body, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 200) {
        // Set cookies
        Cookies.set('detail', JSON.stringify(res.data), { expires: 2 });
        Cookies.set('accessToken', res.data.access, { expires: 1 });

        // Decode JWT to get user details
        const decodedToken = jwtDecode(res.data.access);
        const { user_id: id, username, email, isSuperuser } = decodedToken;

        console.log('User logged in successfully');
        return { tokens: res.data, user_data: { id, username, email, isSuperuser } };
      } else {
        return thunkAPI.rejectWithValue(res.data);
      }
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const logout = () => async (dispatch) => {
  // Clear cookies
  Cookies.remove("detail");
  Cookies.remove("accessToken");

  dispatch(userSlice.actions.logout());
};


const refreshToken = async () => {
  try {
    const refreshToken = JSON.parse(Cookies.get("detail")).refresh;

    const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', { refresh: refreshToken });

    const newAccessToken = response.data.access;

    Cookies.set("detail", JSON.stringify({ access: newAccessToken, refresh: refreshToken }), { expires: 2 });
    Cookies.set("accessToken", newAccessToken, { expires: 2 });
    return newAccessToken;
  } catch (error) {
    throw error;
  }
};


axios.interceptors.request.use(async (config) => {
  try {
    const accessToken = Cookies.get("accessToken");
    console.log(accessToken);
    const { exp } = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;

    if (exp && exp - currentTime < 60) {
      const newAccessToken = await refreshToken();
      config.headers.Authorization = `Bearer ${newAccessToken}`;
    } else {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  } catch {
    return config;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetRegistered: state => {
      state.registered = false;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.user = null;
      state.users = [];
    }
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.loading = true;
      })
      .addCase(register.fulfilled, state => {
        state.loading = false;
        state.registered = true;
      })
      .addCase(register.rejected, state => {
        state.loading = false;
      })
      .addCase(login.pending, state => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state,action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user_data
      })
      .addCase(login.rejected, state => {
        state.loading = false;
      })
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, state => {
        state.loading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
      })
      .addCase(updateUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteUser.pending, state => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, state => {
        state.loading = false;
      })
      .addCase(pictureUpdate.pending, (state) => {
        state.loading = true;
      })
      .addCase(pictureUpdate.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user?.id === action.payload.id) {
          state.user = action.payload;
        }
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
      })
      .addCase(pictureUpdate.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { resetRegistered } = userSlice.actions;
export default userSlice.reducer;
