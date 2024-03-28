import { promises as fs } from "fs";
import YAML from "yaml";
import Box from "@/comps/Box/Box";
import { type StaticProps, type GraphQLResult, type YAMLResult, generateRepositoryQueryPart } from "@/utils/types";
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
                                        branch={activeProjects[key]["defaultBranchRef"]['name']}
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
                                        branch={inactiveProjects[key]["defaultBranchRef"]['name']}
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


import { request, gql } from 'graphql-request';


const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function getStaticProps() {
    const fileContents = await fs.readFile(process.cwd() + "/repos.yaml", "utf8");
    const projects = YAML.parse(fileContents) as YAMLResult;

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
        url: GITHUB_GRAPHQL_API,
        document: gql`${query}` ,
        requestHeaders: {
            Authorization: `bearer ${GITHUB_TOKEN}`,
        },
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
    for (const key in sortedData) {
        const date = new Date(sortedData[key]['defaultBranchRef']['target']['history']['nodes']["committedDate"]).getTime();
        const diffTime = Math.abs(new Date().getTime() - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        sortedData[key].defaultBranchRef.target.tree = null;

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
        <Container fluid={true} c={'greed'} m={4} p={2}>
            <Title>
                {title}
            </Title>
        </Container>
    );
}
