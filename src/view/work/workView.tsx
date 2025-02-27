import { Header } from "../../component/header/headerComponent";
import { LangNav } from "../../component/nav/langNav";
import { MainNav } from "../../component/nav/mainNav";
import React from "react";

export class WorkView extends React.Component {
  render() {
    return (
      <section className="wokr-container">
        <Header title="work" />
        <main className="work-section"></main>
        <MainNav />
        <LangNav />
      </section>
    );
  }
}
