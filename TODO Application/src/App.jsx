import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [lists, setLists] = useState([]);
  const [listCounter, setListCounter] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleAddList = () => {
    setLists([...lists, { title: `List ${listCounter}`, cards: [] }]);
    setListCounter(listCounter + 1);
  };

  const handleDeleteList = (index) => {
    setLists(lists.filter((_, i) => i !== index));
  };

  const handleRenameList = (index, newTitle) => {
    const updatedLists = [...lists];
    updatedLists[index].title = newTitle;
    setLists(updatedLists);
  };

  const handleAddCard = (index, newCard) => {
    if (newCard.trim()) {
      const updatedLists = [...lists];
      updatedLists[index].cards.push(newCard);
      setLists(updatedLists);
    }
  };

  const handleDeleteCard = (listIndex, cardIndex) => {
    const updatedLists = [...lists];
    updatedLists[listIndex].cards = updatedLists[listIndex].cards.filter(
      (_, i) => i !== cardIndex
    );
    setLists(updatedLists);
  };

  const handleEditCard = (listIndex, cardIndex, newTitle) => {
    const updatedLists = [...lists];
    updatedLists[listIndex].cards[cardIndex] = newTitle;
    setLists(updatedLists);
  };

  const List = ({ list, listIndex, onDeleteList, onRenameList }) => {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [newListTitle, setNewListTitle] = useState(list.title);
    const [newCardTitle, setNewCardTitle] = useState("");

    return (
      <div className="list">
        <div className="list-header">
          {isEditingTitle ? (
            <input
              type="text"
              className="list-title-input"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              onBlur={() => {
                setIsEditingTitle(false);
                onRenameList(listIndex, newListTitle);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setIsEditingTitle(false);
                  onRenameList(listIndex, newListTitle);
                }
              }}
              autoFocus
            />
          ) : (
            <h2>{list.title}</h2>
          )}
          <button
            className="list-action-btn rename-btn"
            onClick={() => setIsEditingTitle(true)}
          >
            Rename
          </button>
          <button className="list-action-btn delete-btn" onClick={onDeleteList}>
            Delete
          </button>
        </div>
        <div className="list-cards">
          {list.cards.map((card, cardIndex) => (
            <Card
              key={cardIndex}
              cardTitle={card}
              onDeleteCard={() => handleDeleteCard(listIndex, cardIndex)}
              onEditCard={(newTitle) =>
                handleEditCard(listIndex, cardIndex, newTitle)
              }
            />
          ))}
        </div>
        <div className="add-card">
          <input
            type="text"
            className="card-input"
            placeholder="Enter card title..."
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
          />
          <button
            className="add-card-btn"
            onClick={() => {
              handleAddCard(listIndex, newCardTitle);
              setNewCardTitle("");
            }}
          >
            Add Card
          </button>
        </div>
      </div>
    );
  };

  const Card = ({ cardTitle, onDeleteCard, onEditCard }) => {
    const [isEditingCard, setIsEditingCard] = useState(false);
    const [newCardTitle, setNewCardTitle] = useState(cardTitle);

    return (
      <div className="card">
        {isEditingCard ? (
          <input
            type="text"
            className="card-edit-input"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            onBlur={() => {
              setIsEditingCard(false);
              onEditCard(newCardTitle);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsEditingCard(false);
                onEditCard(newCardTitle);
              }
            }}
            autoFocus
          />
        ) : (
          <div className="card-content">
            <span>{cardTitle}</span>
            <div className="card-actions">
              <button
                className="card-action-btn edit-btn"
                onClick={() => setIsEditingCard(true)}
              >
                Edit
              </button>
              <button
                className="card-action-btn delete-btn"
                onClick={onDeleteCard}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`App ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <header className="app-header">
        <h1 className="app-title">ToDo App</h1>
        <div className="controls">
          <button className="primary-btn" onClick={handleAddList}>
            Add List
          </button>
          <button className="primary-btn" onClick={handleToggleTheme}>
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </header>
      <main className="board">
        {lists.map((list, index) => (
          <List
            key={index}
            list={list}
            listIndex={index}
            onDeleteList={() => handleDeleteList(index)}
            onRenameList={handleRenameList}
          />
        ))}
      </main>
    </div>
  );
};

export default App;
