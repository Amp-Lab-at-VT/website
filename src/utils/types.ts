// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StaticProps<T extends ((...args: any) => Promise<{ props: any }>)> = Awaited<ReturnType<T>>['props'];

export type YAMLResult = {
    [key: string]: {
        url: `https://github.com/${string}/${string}`;
        branch: string;
        mentor_last_name: string;
    };
};

export type GraphQLResult = {
    [key: string]: {
        url : string;
        defaultBranchRef: {
            name: string;
            target: {
                history: {
                    nodes: {
                        committedDate: string;
                    };
                };
                tree: {
                    entries: {
                        name: string;
                        object: {
                            text: string;
                        };
                    }[];
                } | null;
            };
        };
    };
};

// export type Project = GraphQLResult & {
//     [key: string]: {
//         mentor_last_name: string;
//     };
// };

// Function to generate the query part for a single repository
export function generateRepositoryQueryPart(alias : string, owner : string, name : string) {
    return `
      ${alias}: repository(owner: "${owner}", name: "${name}") {
        url
        defaultBranchRef {
          name
          target {
            ... on Commit {
              history(first: 1) {
                nodes {
                  committedDate
                }
              }
              tree {
                entries {
                  name
                  object {
                    ... on Blob {
                      text
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
}
