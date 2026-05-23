import type { Metadata } from "next";
import { BoardMemberGrid } from "../BoardMemberGrid";
import { boardMembers } from "../board-members-data";
import { PageHero } from "../components";

export const metadata: Metadata = {
  title: "Board Members — CSA Uttarakhand Chapter",
  description:
    "Meet the board members of the Cloud Security Alliance Uttarakhand Chapter — industry leaders guiding the regional cybersecurity community.",
  alternates: { canonical: "/board-of-directors" },
  openGraph: {
    url: "/board-of-directors",
    title: "Board Members — CSA Uttarakhand Chapter",
    description:
      "Industry leaders guiding the Cloud Security Alliance Uttarakhand Chapter.",
  },
};

export default function BoardPage() {
  return (
    <main>

      <PageHero title="Board Members" />
      <section className="leadership" id="chapters" aria-labelledby="leadership-heading">
        <div className="container">
          <div className="section-intro section-intro--center">
            <h2 id="leadership-heading">Chapter Leadership</h2>
          </div>
          <BoardMemberGrid members={boardMembers} />
        </div>
      </section>
    </main>
  );
}
