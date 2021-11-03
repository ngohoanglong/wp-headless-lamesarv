import fetcher from './fetcher';

export const recentCommentsApi = async () => {
    const data = await fetcher({
        query: `{
            comments {
              nodes {
                id
                author {
                  node {
                    name
                  }
                }
                approved
                commentedOn {
                  node {
                    link
                    slug
                    id
                    ... on Post {
                      id
                      title
                    }
                  }
                }
              }
            }
    }`
    });
    return {
        nodes: data?.comments
    };
};
