import { Linkedin } from "lucide-react";
import Image from "next/image";
import type { BoardMember } from "./board-members-data";

type BoardMemberGridProps = {
  members: BoardMember[];
};

export function BoardMemberGrid({ members }: BoardMemberGridProps) {
  return (
    <div className="leadership-grid">
      {members.map((member, index) => (
        <article className="leader-card" key={member.name}>
          <div className="leader-media">
            <Image
              src={member.image}
              alt={`${member.name} — ${member.role}, CSA Uttarakhand Chapter`}
              fill
              loading={index === 0 ? "eager" : "lazy"}
              sizes="(max-width: 920px) 100vw, 33vw"
            />
          </div>
          <div className="leader-copy">
            <h3>{member.name}</h3>
            <span>{member.role}</span>
            <p>{member.description}</p>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} LinkedIn profile (opens in new tab)`}
            >
              <Linkedin size={18} aria-hidden="true" />
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
