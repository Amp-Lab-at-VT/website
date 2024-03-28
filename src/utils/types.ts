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
        url : string;                // url of the repository
        defaultBranchRef: {
            name: string;            // name if the default branch
            target: {
                history: {
                    nodes: {
                        committedDate: string; // date of the last commit
                    };
                };
                tree: {
                    entries: {
                        name: string; // name of the text file in root directory
                        object: {
                            text: string; // content of the file
                        };
                    }[];
                };
            };
        };
    };
};

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
