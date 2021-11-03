import data from '../../data/cookedData.json';

export const getNextAndPrePosts = (post, cookedData = data) => {
    const postIds = Object.keys(cookedData.postEntities);
    const postIndex = postIds.findIndex(
        (key) => String(key) === String(post.id)
    );
    const nextPost =
        cookedData.postEntities[postIds[postIndex + 1]] || null;
    const prePost =
        cookedData.postEntities[postIds[postIndex - 1]] || null;
    return {
        nextPost,
        prePost
    }
}
export const getRecommendationPosts = (post, cookedData = data) => {
    const categoryIds = post.categories?.edges.map(
        ({ node }) => node.slug
    );

    let recommendationPostIds = categoryIds
        ?.flatMap((slug) => cookedData.postsByCategory[slug])
        .filter((id) => id !== post.id);
    const postIndex1 = Math.floor(
        Math.random() * recommendationPostIds.length
    );
    const post1 =
        cookedData.postEntities[recommendationPostIds[postIndex1]];
    recommendationPostIds = recommendationPostIds.filter(
        (id) => id !== post1.id
    );
    const postIndex2 = Math.floor(
        Math.random() * recommendationPostIds.length
    );
    const post2 =
        cookedData.postEntities[recommendationPostIds[postIndex2]];
    return [post1, post2]
}