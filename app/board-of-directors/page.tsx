import { BoardMemberGrid } from "../BoardMemberGrid";
import { boardMembers } from "../board-members-data";
import { PageHero } from "../components";

export default function BoardPage() {
  return (
    <main>

      <PageHero title="Board Members" />
      <section className="leadership" id="chapters">
      <div className="container">
        <div className="section-intro section-intro--center">
        </div>
        <BoardMemberGrid members={boardMembers} />
      </div>
    </section>
    </main>
  );
}
