import { Header } from "@/component/header/headerComponent";
import React from "react";

export class ContactView extends React.Component {
  render(): React.ReactNode {
    return (
      <section className="contact-container">
        <Header title="contact" />
        <main>
          <a className="button"></a>
        </main>
      </section>
    );
  }
}
