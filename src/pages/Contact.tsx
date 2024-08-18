import { useState } from "react";
import { Email, Github, Instagram, LinkedIn } from "../components/Icon";
import { LinkWithIcon } from "../components/Link";
import { ref, set } from "firebase/database";
import { database } from "../firebase";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function generateID() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  function submitForm(e: { preventDefault: () => void }) {
    e.preventDefault();

    const generatedUID = ` (${generateID()})`;

    set(ref(database, name + generatedUID), {
      name: name,
      email: email,
      message: message,
    })
      .then(() => {
        alert("message sent!");
      })
      .catch(() => {
        alert("something went wrong. please try again");
      });

    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <main data-key="-3" className="contactWrapper">
      <h1 className="extra accent">get in touch!</h1>

      <div className="links">
        <LinkWithIcon
          img={<Email color="text" />}
          href="mailto:les.ranalan@gmail"
        >
          les.ranalan@gmail.com
        </LinkWithIcon>

        <LinkWithIcon
          img={<LinkedIn />}
          href="https://www.linkedin.com/in/les-paul-ranalan/"
        >
          les paul ranalan
        </LinkWithIcon>

        <LinkWithIcon img={<Github />} href="https://github.com/shadowisf">
          shadowisf
        </LinkWithIcon>

        <LinkWithIcon
          img={<Instagram />}
          href="https://www.instagram.com/les.rx/"
        >
          @les.rx
        </LinkWithIcon>
      </div>

      <form onSubmit={submitForm}>
        <span className="nameAndEmail">
          <label htmlFor="name">
            <h6>name:</h6>
            <input
              name="name"
              placeholder="flexbox felix"
              max={70}
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </label>

          <label htmlFor="email">
            <h6>email:</h6>
            <input
              name="email"
              placeholder="display@flex.com"
              maxLength={70}
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              title="username@email.com"
              onChange={(e) => setEmail(e.target.value.replace(/\s+/g, ""))}
              value={email}
              required
            />
          </label>
        </span>
        <label htmlFor="message">
          <h6>message:</h6>
          <textarea
            name="message"
            placeholder="i need help with my coffee machine!!"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            required
          />
        </label>

        <button className="toThinHover all" type="submit">
          <h6>submit</h6>
        </button>
      </form>
    </main>
  );
}
