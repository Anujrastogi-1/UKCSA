import { BoardMemberGrid } from "../BoardMemberGrid";
import { boardMembers } from "../board-members-data";
import { PageHero } from "../components";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Board Members | CSA Uttarakhand Chapter",
  description:
    "Meet the board members of the Cloud Security Alliance Uttarakhand Chapter, industry leaders guiding the regional cybersecurity community.",
  path: "/board-of-directors",
});

export default function BoardPage() {
  return (
    <main>

      <PageHero title="Board Members" />
      <section className="leadership" id="chapters" aria-label="Board members">
        <div className="container">
          <BoardMemberGrid members={boardMembers} />
        </div>
      </section>
    </main>
  );
}
