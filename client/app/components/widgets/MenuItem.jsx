"use client";
import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  IconGripVertical,
  IconEye,
  IconPencil,
  IconEyeOff,
  IconChevronDown,
} from "@tabler/icons-react";
import MenuItemList from "./MenuItemList";
import { trackItemMove } from "@/app/services/navService";

const ITEM_TYPE = "MENU_ITEM";

export default function MenuItem({
  item,
  index,
  level,
  editMode,
  toggleExpanded,
  toggleVisibility,
  moveItem,
  onTitleChange,
  parentId = null,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);

  const ref = useRef(null);
  const hasChildren = item.children?.length > 0;

  const [{ handlerId }, drop] = useDrop({
    accept: `${ITEM_TYPE}_${level}`,
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (draggedItem, monitor) => {
      if (!ref.current) return;

      const dragIndex = draggedItem.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveItem(dragIndex, hoverIndex, level, draggedItem.parentId);
      draggedItem.index = hoverIndex;
    },
    drop: (draggedItem) => {
      trackItemMove({
        id: draggedItem.id,
        from: draggedItem.originalIndex || draggedItem.index,
        to: draggedItem.index,
        parentId: draggedItem.parentId,
      });
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: `${ITEM_TYPE}_${level}`,
    item: () => ({
      id: item.id,
      index,
      level,
      parentId,
      originalIndex: index,
    }),
    canDrag: () => editMode,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const handleTitleEdit = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleTitleSave = () => {
    if (editedTitle.trim() && editedTitle !== item.title) {
      onTitleChange(item.id, editedTitle.trim());
    }
    setIsEditing(false);
  };

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      className={`transition-all duration-200 mb-4 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <div
        className={`
      flex items-center py-3 px-4
      ${level === 0 ? "bg-[#F7F7F7]" : "bg-white"}
      ${!item.visible && editMode ? "opacity-50" : ""}
      hover:bg-gray-100 transition-colors duration-200
      ${
        level === 0
          ? "pl-4"
          : level === 1
          ? "pl-10"
          : level === 2
          ? "pl-16"
          : "pl-[88px]"
      }
    `}
      >
        {editMode && (
          <IconGripVertical
            className="mr-3 cursor-move text-gray-400 hover:text-gray-600"
            size={18}
          />
        )}

        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleTitleSave}
            onKeyPress={(e) => e.key === "Enter" && handleTitleSave()}
            className="flex-grow px-2 py-1 border rounded"
            autoFocus
          />
        ) : (
          <span className="flex-grow text-gray-700 font-medium">
            {item.title}
          </span>
        )}

        <div className="flex items-center gap-1">
          {hasChildren && (
            <button
              className="p-1 text-gray-500 hover:text-gray-700"
              onClick={() => !editMode && toggleExpanded(item.id)}
            >
              <IconChevronDown
                size={20}
                className={`transform transition-transform duration-200 ${
                  item.expanded ? "rotate-180" : ""
                }`}
              />
            </button>
          )}

          {editMode && (
            <>
              <button
                className="p-1 text-gray-500 hover:text-gray-700"
                onClick={handleTitleEdit}
              >
                <IconPencil size={18} />
              </button>
              <button
                className="p-1 text-gray-500 hover:text-gray-700"
                onClick={() => toggleVisibility(item.id, level === 0)}
              >
                {item.visible ? (
                  <IconEye size={18} />
                ) : (
                  <IconEyeOff size={18} />
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {hasChildren && item.expanded && (
        <MenuItemList
          items={item.children}
          editMode={editMode}
          toggleExpanded={toggleExpanded}
          toggleVisibility={toggleVisibility}
          moveItem={moveItem}
          level={level + 1}
          parentId={item.id}
        />
      )}
    </div>
  );
}
