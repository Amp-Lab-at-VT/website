import { promises as fs } from "fs";
import YAML from "yaml";
import Project from "@/comps/ProjectBox";
import type { StaticProps, GraphQLResult, YAMLResult } from "@/utils";
import { generateRepositoryQueryPart } from "@/utils";
import { Title, SimpleGrid, Group, Autocomplete } from "@mantine/core";
import type { ComboboxItem, OptionsFilter } from "@mantine/core";


export default function Projects({
    activeProjects,
    inactiveProjects,
} : StaticProps<typeof getStaticProps>) {

    return (
        <>
            {/* <Group justify="space-between"> */}
            <Title c={'green'} m={4} p={2}>
                {'Active Projects'}
            </Title>
            <Autocomplete
                placeholder='Search...'
                data={Object.values(activeProjects).map(({name}) => name)}
                filter={optionsFilter}
            />
            {/* </Group> */}

            <SimpleGrid cols={{ base: 1, sm: 2, xl : 3}}>
                {Object.keys(activeProjects).map((key) =>
                    <Project
                        name={key}
                        key={key}
                        project={activeProjects[key]}
                    />)}
            </SimpleGrid>

            <Title c={'green'} m={4} p={2}>
                {'Inactive Projects (No Commits in 90 Days)'}
            </Title>
            <SimpleGrid cols={{ base: 1, sm: 2, xl : 3}}>
                {Object.keys(inactiveProjects).map((key) =>
                    <Project
                        name={key}
                        key={key}
                        project={inactiveProjects[key]}
                    />)}
            </SimpleGrid>
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
        } else {
            activeProjects[key] = sortedData[key];
        }
    }

    return { props : { activeProjects, inactiveProjects }};
}

const optionsFilter: OptionsFilter = ({ options, search }) => {
    const splittedSearch = search.toLowerCase().trim().split(' ');
    return (options as ComboboxItem[]).filter((option) => {
        const words = option.label.toLowerCase().trim().split(' ');
        return splittedSearch.every((searchWord) => words.some((word) => word.includes(searchWord)));
    });
};
