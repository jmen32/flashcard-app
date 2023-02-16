import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Deck/Home";
import { Route, Switch } from "react-router-dom";
// import Study from "../Study/Study";


function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          {/* <Route path="/decks/:deckId/study">
            <Study />
          </Route>

          <Route path="/decks/new">
            <CreateDeck />
          </Route> */}

          {/* <Route path="/decks/:deckId">
            <Deck />
          </Route>

          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>

          <Route path="/decks/:deckId/cards/new">
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
