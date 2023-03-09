import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home/Home";
import { Route, Switch } from "react-router-dom";
import Study from "../DeckStudy/StudyDeck";
import CreateNewDeck from "../DeckNew/CreateNewDeck";
import Deck from "../Deck/Deck";
import DeckEdit from "../Deck/DeckEdit";



function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/decks/:deckId/study">
            <Study />
          </Route>

          <Route path="/decks/new">
            <CreateNewDeck />
          </Route>

          <Route path="/decks/:deckId">
            <Deck />
          </Route>

          <Route path="/decks/:deckId/edit">
            <DeckEdit />
          </Route>

          {/* <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>

          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route> */}

          <Route>
            <NotFound />
          </Route>

        </Switch>
      </div>
    </>
  );
}

export default Layout;
