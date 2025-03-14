import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMenuItems, saveNavigation, trackItemMove } from '../services/navService';

export const fetchNavItems = createAsyncThunk(
  'navigation/fetchNavItems',
  async () => {
    return await fetchMenuItems();
  }
);

export const moveItems = createAsyncThunk(
  'navigation/moveItem',
  async ({ dragIndex, hoverIndex, level, parentId }, { getState }) => {
    const state = getState();
    const items = state.navigation.items;
    let movedItem;

    if (level === 0) {
      movedItem = items[dragIndex];
    } else {
      const parent = items.find(item => item.id === parentId);
      movedItem = parent.children[dragIndex];
    }




    // Track the movement
    await trackItemMove({
      id: movedItem.id,
      from: dragIndex,
      to: hoverIndex,
      parentId
    });

    return { dragIndex, hoverIndex, level, parentId };
  }
);

export const updateItemTitle = createAsyncThunk(
  'navigation/updateItemTitle',
  async ({ id, oldTitle, newTitle }) => {
    await trackTitleChange({ id, from: oldTitle, to: newTitle });
    return { id, title: newTitle };
  }
);



export const saveNavItems = createAsyncThunk(
  'navigation/saveNavItems',
  async (items, { dispatch }) => {
    const result = await saveNavigation(items);
    if (result) {
      setTimeout(() => {
        dispatch(setEditMode(false));
      }, 1000);
    }
    return result;
  }
);


const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    items: [],
    editMode: false,
    loading: false,
    error: null,
    saveStatus: null
  },
  reducers: {
    setEditMode: (state, action) => {
      state.editMode = action.payload;
      state.saveStatus = null;
    },
    toggleExpanded: (state, action) => {
      const id = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) item.expanded = !item.expanded;
    },
    toggleVisibility: (state, action) => {
      const { id, isParent } = action.payload;
      if (isParent) {
        const item = state.items.find(item => item.id === id);
        if (item) item.visible = !item.visible;
      } else {
        state.items.forEach(item => {
          if (item.children) {
            const child = item.children.find(c => c.id === id);
            if (child) child.visible = !child.visible;
          }
        });
      }
    },

    updateTitle: (state, action) => {
      const { id, title } = action.payload;
      const updateTitleInItems = (items) => {
        for (let item of items) {
          if (item.id === id) {
            item.title = title;
            return true;
          }
          if (item.children?.length) {
            if (updateTitleInItems(item.children)) return true;
          }
        }
        return false;
      };
      updateTitleInItems(state.items);
    },


    moveItem: (state, action) => {
      const { dragIndex, hoverIndex, level, parentId } = action.payload;
      let movedItem;

      if (level === 0) {
        [movedItem] = state.items.splice(dragIndex, 1);
        state.items.splice(hoverIndex, 0, movedItem);
      } else {
        const parent = state.items.find(item => item.id === parentId);
        if (parent && parent.children) {
          [movedItem] = parent.children.splice(dragIndex, 1);
          parent.children.splice(hoverIndex, 0, movedItem);
        }
      }
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNavItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNavItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchNavItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(saveNavItems.pending, (state) => {
        state.saveStatus = 'saving';
      })
      .addCase(saveNavItems.fulfilled, (state) => {
        state.saveStatus = 'success';
      })
      .addCase(saveNavItems.rejected, (state, action) => {
        state.saveStatus = 'error';
        state.error = action.error.message;
      })
      .addCase(updateItemTitle.fulfilled, (state, action) => {
        const { id, title } = action.payload;
        const updateTitleInItems = (items) => {
          for (let item of items) {
            if (item.id === id) {
              item.title = title;
              return;
            }
            if (item.children?.length) {
              updateTitleInItems(item.children);
            }
          }
        };
        updateTitleInItems(state.items);
      });

  }
});

export const { setEditMode, toggleExpanded, toggleVisibility, moveItem, updateTitle } = navigationSlice.actions;
export default navigationSlice.reducer;
