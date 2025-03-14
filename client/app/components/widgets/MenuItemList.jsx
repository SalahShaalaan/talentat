"use client";
import MenuItem from "./MenuItem";

export default function MenuItemList({
  items,
  editMode,
  toggleExpanded,
  toggleVisibility,
  moveItem,
  level = 0,
  onTitleChange,
  parentId = null,
}) {
  return (
    <>
      {items.map((item, index) => (
        <MenuItem
          key={item.id}
          item={item}
          index={index}
          level={level}
          editMode={editMode}
          toggleExpanded={toggleExpanded}
          toggleVisibility={toggleVisibility}
          moveItem={moveItem}
          onTitleChange={onTitleChange}
          parentId={parentId}
        />
      ))}
    </>
  );
}
