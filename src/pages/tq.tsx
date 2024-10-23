import React, { useState } from 'react';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

const App: React.FC = () => {
  // Initial list of items
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);

  // Function to handle item deletion
  const deleteItem = (index: number) => {
    const newList = items.filter((_, i) => i !== index); // Remove item by index
    setItems(newList); // Update the state with the new list
  };

  const leadingActions = (index: number) => (
    <LeadingActions>
      <SwipeAction onClick={() => deleteItem(index)}>Action name</SwipeAction>
    </LeadingActions>
  );

  return (
    <SwipeableList>
      {items.map((item, index) => (
        <SwipeableListItem key={index} leadingActions={leadingActions(index)}>
          {item} {/* Display the content of the item */}
        </SwipeableListItem>
      ))}
    </SwipeableList>
  );
};

export default App;
