import fetcher from "./fetcher";
const campaignQuery = `query ($id:String){
  post(
    id: "get-cookin-rv-style-fill-your-van-with-the-scent-of-baked-apples-and-berries-this-fall"
    idType: SLUG
  ) {
    utmCampaign
    displayAdImage
  }
}
`
export const campaign = async (email, name) => {
    const { subscribe } = await fetcher({
        query: campaignQuery,
        variables: {
            email,
            name
        }
    });
    return subscribe
};
