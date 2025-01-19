export function generateRepositoryQueryPart(
	alias: string,
	owner: string,
	name: string,
) {
	return `
		${alias}: repository(owner: "${owner}", name: "${name}") {
		  url
	  name
	  defaultBranchRef {
		name
	  }
		recentCommit: object(expression: "HEAD") {
		... on Commit {
		  committedDate
		}
	  }
	  file: object(expression: "HEAD:summary.md") {
		... on Blob {
		  text
		}
	  }
	}
	  `;
}

import projectslist from "@/../repos.json" with { type: "json" };
import { Graffle } from "graffle";
const GITHUB_TOKEN = process.env["GITHUB_TOKEN"];
export async function generateAPIRequest() {
	const query = "{" + Object.values(projectslist)
		.map((value, index) => {
			const [owner, repo] = value.github.split("/");
			return generateRepositoryQueryPart(`repo${index}`, owner!, repo!);
		})
		.join("") + "}";

	const data = await Graffle.create().transport({
        url: "https://api.github.com/graphql",
        headers: { Authorization: `bearer ${GITHUB_TOKEN}` },
    }).gql`${query}`.send();

    if (!data) {
        throw "GraphQL Failed";
    }

	return data as GraphQLResult;
}

export function sortByCommitDate(data : GraphQLResult) {
	return Object.fromEntries(
        Object.entries(data).sort(([, a], [, b]) => (
            new Date(b.recentCommit.committedDate).getTime() -
            new Date(a.recentCommit.committedDate).getTime()
        )),
    ) as GraphQLResult;
}

export function separateActivity(data : GraphQLResult) {
    return Object.entries(data).reduce((acc, [key, project]) => {
        const lastCommitDate = new Date(project.recentCommit.committedDate)
            .getTime();
        const diffDays = Math.ceil(
            (Date.now() - lastCommitDate) / (1000 * 60 * 60 * 24),
        );

        if (diffDays > 90) {
            acc.inactiveProjects[key] = project;
        } else {
            acc.activeProjects[key] = project;
        }

        return acc;
    }, {
        activeProjects: {} as GraphQLResult,
        inactiveProjects: {} as GraphQLResult,
    });
}

export type GraphQLResult = Record<string, Project>;
export type Project = {
	url: string;
	name: string;
	defaultBranchRef: {
		name: string;
	};
	recentCommit: {
		committedDate: string;
	};
	file: {
		text: string;
	} | null;
};
