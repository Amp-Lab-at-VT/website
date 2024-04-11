// Function to generate the query part for a single repository
export function generateRepositoryQueryPart(alias : string, owner : string, name : string) {
    return `
      ${alias}: repository(owner: "${owner}", name: "${name}") {
        url
        name
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
