import { LeaderboardListItem } from "@/app/components/leaderboard/LeaderboardListItem";

const Leaderborad = () => {
    return ( <div>
        <LeaderboardListItem rank={1} name="PlayerOne" score={1500} avatarUrl="/avatar1.png" isCurrentUser />
        <LeaderboardListItem rank={2} name="PlayerTwo" score={1200} avatarUrl="/avatar2.png" />
        <LeaderboardListItem rank={3} name="PlayerThree" score={1100} avatarUrl="/avatar3.png" />
        <LeaderboardListItem rank={4} name="PlayerFour" score={1000} avatarUrl="/avatar4.png" />
        <LeaderboardListItem rank={5} name="PlayerFive" score={900} avatarUrl="/avatar5.png" />
    </div> );
}
 
export default Leaderborad;