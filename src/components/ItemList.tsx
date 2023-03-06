import React, { useState, useEffect, useRef } from "react";

interface Item {
  text: string;
}

interface Props {
  items: Item[];
}

const ItemList: React.FC<Props> = ({ items }) => {
  const [expanded, setExpanded] = useState(false);
  const [listHeight, setListHeight] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      setListHeight(listRef.current.offsetHeight);
    }
  }, [items]);

  return (
    <div className="container">
      <div
        className="flex flex-col overflow-hidden"
        style={{ maxHeight: expanded ? "none" : `${listHeight}px` }}
        ref={listRef}
      >
        {items.map((item, index) => (
          <a
            href="#"
            key={index}
            className="flex items-center text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <span className="flex-1 ml-3 whitespace-nowrap">{item.text}</span>
          </a>
        ))}
      </div>
      {items.length > 3 && (
        <label
          className="cursor-pointer underline text-blue"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "View Less" : "View More..."}
        </label>
      )}
    </div>
  );
};

export default ItemList;
