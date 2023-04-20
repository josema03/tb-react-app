import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getData } from '../apis/tb-express-server';

export const fetchTableData = createAsyncThunk('table/fetchTableData', async (query) => {
    try {
        const response = await getData(query);

        if (!response.ok) throw new Error(response.error);

        return response.value
            .map(({ file, lines }) => {
                return lines.map((line) => ({
                    file,
                    ...line,
                }));
            })
            .flat();
    } catch (error) {
        console.error(error);
        return [];
    }
});

export const tableSlice = createSlice({
    name: 'table',
    initialState: {
        data: [],
        columns: [
            { accessor: 'file', label: 'File Name' },
            { accessor: 'text', label: 'Text' },
            { accessor: 'number', label: 'Number' },
            { accessor: 'hex', label: 'Hex' },
        ],
        loading: true,
    },
    reducers: {
        updateData: (state, { payload }) => ({
            ...state,
            data: payload,
        }),
        updateLoading: (state, { payload }) => ({ ...state, loading: payload }),
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTableData.pending, (state) => ({
            ...state,
            loading: true,
        }));

        builder.addCase(fetchTableData.fulfilled, (state, { payload }) => ({
            ...state,
            data: payload,
            loading: false,
        }));
    },
});

export const { updateData, updateLoading } = tableSlice.actions;

export const store = configureStore({
    reducer: {
        table: tableSlice.reducer,
    },
});
