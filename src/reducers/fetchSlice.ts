import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import ky from "ky";


export const fetchProducts = createAsyncThunk("", async function (_, { rejectWithValue }) {
  try {
    const response = await ky(
      "https://api.hh.ru/openapi/redoc#tag/Poisk-vakansij/operation/get-vacancies?industry=7&professional_role=96",
    ).json();
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Неизвестная ошибка");
  }
});

const  = createSlice({
  name: "",
  initialState: [],
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(.pending, (state, action) => { })
      .addCase( .fulfilled, (state, action) => { })
      .addCase(.rejected, (state, action) => { })
  },
});

export default ProductsSlice.reducer;
