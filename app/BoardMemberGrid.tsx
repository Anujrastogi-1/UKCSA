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
              alt={member.name}
              fill
              loading={index === 0 ? "eager" : "lazy"}
              sizes="(max-width: 920px) 100vw, 33vw"
            />
          </div>
          <div className="leader-copy">
            <h4>{member.name}</h4>
            <span>{member.role}</span>
            <p>{member.description}</p>
            <a href={member.linkedin} aria-label={`${member.name} LinkedIn profile`}>
              <Linkedin size={18} />
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
