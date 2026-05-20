import { Linkedin } from "lucide-react";
import Image from "next/image";
import { PageHero } from "../components";

const members = [
  ["Satyam Rastogi", "Chapter Leader", "/assets/img/board-of-directors/SatyamRastogi.jpeg", "https://www.linkedin.com/in/hackersatyamrastogi/"],
  ["Devjeet Singh", "Board Member", "/assets/img/board-of-directors/Devjeet.jpg", "https://www.linkedin.com/in/devjeethacker/"],
  ["Avita Katal", "Board Member", "/assets/img/board-of-directors/female_dummy.png", "https://www.linkedin.com/in/avita-katal/"],
  ["Naveen Pal", "Board Member", "/assets/img/board-of-directors/naveen_pal.png", "https://www.linkedin.com/in/haxornaveenpal"],
  ["Kush Kaushik", "Board Member", "/assets/img/board-of-directors/kush_kaushik.jpg", "https://in.linkedin.com/in/kushkaushik"],
  ["Ankit Giri", "Board Member", "/assets/img/board-of-directors/Ankit_Giri.png", "https://www.linkedin.com/in/ankitgiri/"]
];

export default function BoardPage() {
  return (
    <main>
      <PageHero title="Board of Directors" />
      <section className="board-section">
        <div className="container board-grid">
          {members.map(([name, role, image, linkedin]) => (
            <article className="member-card" key={name}>
              <Image src={image} alt={name} width={270} height={250} />
              <div className="member-copy">
                <h5>{role}</h5>
                <p>{name}</p>
                <a href={linkedin} aria-label={`${name} LinkedIn`}>
                  <Linkedin size={18} fill="currentColor" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
