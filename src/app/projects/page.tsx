"use server"
import Project from "@/comps/ProjectBox";
import { SimpleGrid, Title } from "@mantine/core";
// import type { ComboboxItem, OptionsFilter } from "@mantine/core";

export default async function Projects() {
    const { activeProjects, inactiveProjects } = await getStaticProps()
    return <>
            <Title c={"green"} m={4} p={2}>Active Projects</Title>
            {/* <Autocomplete
                placeholder="Search..."
                data={Object.values(activeProjects).map(({ name }) => name)}
                filter={optionsFilter}
            /> */}

            <SimpleGrid cols={{ base: 1, sm: 2, xl: 3 }}>
                {Object.entries(activeProjects).map(([key, val]) =>
                    <Project key={key} project={val} />
                )}
            </SimpleGrid>

            <Title c={"green"} m={4} p={2}>
                Inactive Projects (No Commits in 90 Days)
            </Title>
            <SimpleGrid cols={{ base: 1, sm: 2, xl: 3 }}>
                {Object.entries(inactiveProjects).map(([key, val]) => (
                    <Project key={key} project={val} />
                ))}
            </SimpleGrid>
        </>
}

import { generateAPIRequest, separateActivity, sortByCommitDate } from "@/utils";

async function getStaticProps() {
    const data = await generateAPIRequest();

    console.log(data);

    // sort data by last commit date
    const sortedData = sortByCommitDate(data);

    // Separate projects into active and inactive
    const projects = separateActivity(sortedData);

    return projects;
}

// const optionsFilter: OptionsFilter = ({ options, search }) => {
//     const splittedSearch = search.toLowerCase().trim().split(" ");
//     return (options as ComboboxItem[]).filter((option) => {
//         const words = option.label.toLowerCase().trim().split(" ");
//         return splittedSearch.every((searchWord) =>
//             words.some((word) => word.includes(searchWord))
//         );
//     });
// };
