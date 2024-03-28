import { promises as fs } from "fs";
import YAML from "yaml";
import Project from "@/comps/ProjectBox";
import { type StaticProps, type GraphQLResult, type YAMLResult, generateRepositoryQueryPart } from "@/utils/types";
import { Container, Title, SimpleGrid, Box } from "@mantine/core";

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
                                <Box key={key}>
                                    <Project
                                        name={key}
                                        key={key}
                                        project={activeProjects[key]}
                                    />
                                </Box>
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
                                    <Project
                                        name={key}
                                        key={key}
                                        project={activeProjects[key]}
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


import { request, gql } from 'graphql-request';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function getStaticProps() {
    const projects = YAML.parse(await fs.readFile(process.cwd() + "/repos.yaml", "utf8")) as YAMLResult;

    let query = '{';
    let index = 0; // Initialize a counter outside the loop


    for (const key in projects) {
        const url = projects[key]["url"].split("github.com/")[1];
        const repo = url.split("/")[1];
        const owner = url.split("/")[0];

        // console.log(owner, repo)

        query += generateRepositoryQueryPart(`repo${index + 1}`, owner, repo);
        index++; // Increment the counter at the end of each iteration
    }
    query += '}';

    const data = await request<GraphQLResult>({
        url: 'https://api.github.com/graphql',
        document: gql`${query}` ,
        requestHeaders: { Authorization: `bearer ${GITHUB_TOKEN}` },
    });

    // sort data by date
    const sortedData = Object.fromEntries(
        Object.entries(data).sort(([, a], [, b]) => {
            return new Date(b['defaultBranchRef']['target']['history']['nodes']["committedDate"]).getTime() - new Date(a['defaultBranchRef']['target']['history']['nodes']["committedDate"]).getTime();
        }),
    );

    const inactiveProjects = {} as GraphQLResult;
    const activeProjects = {} as GraphQLResult;

    let activeCount = 0, inactiveCount = 0;

    // if a project hasn't been updates in 3 months, move it to inactive
    // this seems broken, but I'm not sure why
    for (const key in sortedData) {
        const date = new Date(sortedData[key]['defaultBranchRef']['target']['history']['nodes']["committedDate"]).getTime();
        const diffTime = Math.abs(new Date().getTime() - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // @ts-expect-error weird error with the tree entries. had to remove it for now. uncomment when fixed
        sortedData[key].defaultBranchRef.target.tree.entries = null;

        if (diffDays > 90) {
            inactiveProjects[key] = sortedData[key];
            // increase the count of inactive projects
            inactiveCount++;
        } else {
            activeProjects[key] = sortedData[key];
            // increase the count of active projects
            activeCount++;
        }
    }

    const props = { activeProjects, inactiveProjects, activeCount, inactiveCount };

    console.log(props)

    return {
        props,
    };
}

function SectionTitle({title} : {title: string}) {
    return (
        <Container fluid={true} c={'green'} m={4} p={2}>
            <Title>
                {title}
            </Title>
        </Container>
    );
}
