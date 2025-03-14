"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { IconSettings, IconChevronLeft, IconCheck } from "@tabler/icons-react";
import MenuItemList from "./MenuItemList";
import {
  fetchNavItems,
  saveNavItems,
  setEditMode,
  toggleExpanded,
  toggleVisibility,
  moveItem,
  updateTitle,
} from "../../features/navigationSlice";

export default function Filter({ onClose }) {
  const dispatch = useDispatch();
  const {
    items: menuItems,
    editMode,
    loading,
    error,
    saveStatus,
  } = useSelector((state) => state.navigation);

  useEffect(() => {
    dispatch(fetchNavItems());
  }, [dispatch]);

  const handleToggleEditMode = () => {
    dispatch(setEditMode(!editMode));
  };

  const handleToggleExpanded = (id) => {
    dispatch(toggleExpanded(id));
  };

  const handleToggleVisibility = (id, isParent) => {
    dispatch(toggleVisibility({ id, isParent }));
  };

  const handleMoveItem = (dragIndex, hoverIndex, level, parentId) => {
    dispatch(moveItem({ dragIndex, hoverIndex, level, parentId }));
  };

  const handleTitleChange = (id, newTitle) => {
    dispatch(updateTitle({ id, title: newTitle }));
  };

  const handleSaveChanges = async () => {
    const result = await dispatch(saveNavItems(menuItems));
    if (result.payload) {
      dispatch(setEditMode(false));
    }
  };

  const handleCancelEdit = () => {
    dispatch(fetchNavItems());
    dispatch(setEditMode(false));
  };

  if (loading) {
    return <div className="p-4 text-center">Loading menu items...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="rounded-md mx-2">
        <div className="flex items-center gap-4 p-4 border-b border-gray-200">
          {onClose && (
            <button
              onClick={onClose}
              className="2xl:hidden p-2 rounded-full hover:bg-gray-100"
            >
              <IconChevronLeft size={20} />
            </button>
          )}
          <h1 className="text-xl font-medium">Menu</h1>

          {editMode ? (
            <div className="flex space-x-2 ml-auto">
              <button
                onClick={handleCancelEdit}
                className="p-2 rounded-full border border-red-500 text-red-500"
                disabled={saveStatus === "saving"}
              >
                <IconChevronLeft size={20} />
              </button>
              <button
                onClick={handleSaveChanges}
                className={`p-2 rounded-full border ${
                  saveStatus === "saving"
                    ? "border-gray-300 text-gray-300"
                    : saveStatus === "success"
                    ? "border-green-500 text-green-500"
                    : saveStatus === "error"
                    ? "border-red-500 text-red-500"
                    : "border-green-500 text-green-500"
                }`}
                disabled={saveStatus === "saving"}
              >
                <IconCheck size={20} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleToggleEditMode}
              className="p-2 rounded-full hover:bg-gray-100 ml-auto"
            >
              <IconSettings size={20} />
            </button>
          )}
        </div>

        <div className="max-h-[calc(100vh-120px)] overflow-y-auto">
          <MenuItemList
            items={menuItems.filter((item) => editMode || item.visible)}
            editMode={editMode}
            toggleExpanded={handleToggleExpanded}
            toggleVisibility={handleToggleVisibility}
            moveItem={handleMoveItem}
            onTitleChange={handleTitleChange}
          />
        </div>
      </div>
    </DndProvider>
  );
}
