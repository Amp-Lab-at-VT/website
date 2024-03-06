import { promises as fs } from "fs";
import YAML from "yaml";
import Box from "@/comps/Box/Box";
import { type StaticProps } from "@/utils/types";
import { Container, Title, SimpleGrid, Box as MBox } from "@mantine/core";

export default function Projects({
    activeProjects,
    inactiveProjects,
    activeCount,
    inactiveCount,
} : StaticProps<typeof getStaticProps>) {

    return (
        <>
            {/* Active Projets */}
            {activeCount > 0 && (
                <div>
                    <SectionTitle title={'Active Projects'} />
                    <SimpleGrid cols={{ base: 1, sm: 2}}>
                        {Object.keys(activeProjects).map((key) => {
                            return (
                                <MBox key={key}>
                                    <Box
                                        key={key}
                                        name={key}
                                        branch={activeProjects[key]["branch"]}
                                        href={activeProjects[key]["url"]}
                                    />
                                </MBox>
                            );
                        })}
                    </SimpleGrid>
                </div>
            )}
            {inactiveCount > 0 && (
                <div>
                    <SectionTitle title={'Inactive Projects (No Commits in 90 Days)'} />
                    <div className="flex flex-wrap justify-center">
                        {Object.keys(inactiveProjects).map((key) => {
                            return (
                                <div className="w-screen h-fit sm:w-6/12" key={key}>
                                    <Box
                                        key={key}
                                        name={key}
                                        branch={inactiveProjects[key]["branch"]}
                                        href={inactiveProjects[key]["url"]}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}

export async function getStaticProps() {
    let activeCount = 0,
        inactiveCount = 0;

    const file = "repos.yaml";
    const fileContents = await fs.readFile(process.cwd() + "/" + file, "utf8");
    let projects = YAML.parse(fileContents) as YAMLResult;

    console.log(projects);

    const inactiveProjects = {} as YAMLResult;
    const activeProjects = {} as YAMLResult;

    // Find the date of each commit, and add it to the project
    for (const key in projects) {
        const url = projects[key]["url"];
        const branch = projects[key]["branch"];
        const repo = url.split("/")[4];
        const owner = url.split("/")[3];

        // Pull the date from the commit
        projects[key]['date'] = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits/${branch}`)
            .then((response) => response.json())
            .then((data) => data["commit"]["committer"]["date"])
            .catch(() => {
                console.log( "Odds are your query is being throttled. Try again in a few minutes.");
            });
        projects[key]['date'] = new Date(projects[key]['date']).toISOString();
    }

    // Sort the projects by date
    projects = Object.fromEntries(
        Object.entries(projects).sort(([, a], [, b]) => {
            return new Date(b["date"]).getTime() - new Date(a["date"]).getTime();
        }),
    );

    // if a project hasn't been updates in 3 months, move it to inactive
    for (const key in projects) {
        const date = new Date(projects[key]["date"]).getTime();
        const diffTime = Math.abs(new Date().getTime() - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 90) {
            inactiveProjects[key] = projects[key];
            // increase the count of inactive projects
            inactiveCount = inactiveCount + 1;
        } else {
            activeProjects[key] = projects[key];
            // increase the count of active projects
            activeCount = activeCount + 1;
        }
    }

    console.log("activeCount: " + activeCount);
    console.log("inactiveCount: " + inactiveCount);

    return {
        props: { activeProjects, inactiveProjects, activeCount, inactiveCount },
    };
}

function SectionTitle({title} : {title: string}) {
    return (
        <Container fluid={true} c={'greed'} m={4} p={2}>
            <Title>
                {title}
            </Title>
        </Container>
    );
}

type YAMLResult = {
    [key: string]: {
        url: string;
        branch: string;
        mentor_last_name: string;
        date : string;
    };
};
