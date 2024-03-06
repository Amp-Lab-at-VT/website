import LeadershipBox from "@/comps/LeadershipBox/LeadershipBox";


export default function Leadership() {
    return (
        <div>
            <div className="App-pageHelper">
                <h2>Meet Our Team: Student Staff</h2>
                <hr></hr>
                <div className="flex-row-left">
                    <LeadershipBox
                        name="Richard Gibbons"
                        src={'/Headshots/Gibbons.jpg'}
                        title="Richard Gibbons: Team Lead"
                        email="gricha1@vt.edu"
                    ></LeadershipBox>
                    <LeadershipBox
                        name="Henry Forsyth"
                        src={'/Headshots/Forsyth2.jpg'}
                        title="Henry Forsyth: Mentor/Webdev"
                        email="rhforsythjr@vt.edu"
                    ></LeadershipBox>
                    <LeadershipBox
                        name="Eddie Pritchard"
                        src={'/Headshots/Pritchard.jpeg'}
                        title="Eddie Pritchard: Mentor"
                        email="epritchard@vt.edu"
                    ></LeadershipBox>
                    <LeadershipBox
                        name="Purv Bavishi"
                        src={'/Headshots/pb.jpeg'}
                        title="Purv Bavishi: Mentor"
                        email="purvbavishi@vt.edu"
                    ></LeadershipBox>
                    <LeadershipBox
                        name="Ethan James"
                        src={'/Headshots/Ethan.jpg'}
                        title="Ethan James: Mentor"
                        email="ethanjamesauto@vt.edu"
                    ></LeadershipBox>
                </div>
                <h2>Meet Our Team: Professors</h2>
                <hr></hr>
                <div className="flex-row-left">
                    <LeadershipBox
                        name="William Baumann"
                        src={'/Headshots/Baumann.jpg'}
                        title="Dr.William Baumann: Professor"
                        email="baumann@vt.edu"
                    ></LeadershipBox>
                    <LeadershipBox
                        name="Toby Meadows"
                        src={'/Headshots/Meadows.jpg'}
                        title="Dr.Toby Meadows: Professor"
                        email="toby88@vt.edu"
                    ></LeadershipBox>
                </div>
            </div>
        </div>
    );
}
